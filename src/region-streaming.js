// Render demand only: this module never changes logical map cells or saves.
const chunkId=(x,y)=>`${x},${y}`;

function positiveInteger(value,name){
  if(!Number.isSafeInteger(value)||value<=0)throw new RangeError(`${name} must be a positive integer`);
}

/** Bounds are inclusive ground coordinates. Out-of-map pins are ignored. */
export function planRegionChunks({width,height,bounds,pins=[],chunkSize=16,maxChunks=12,margin=1,previousMode='detail'}={}){
  for(const [name,value] of Object.entries({width,height,chunkSize,maxChunks}))positiveInteger(value,name);
  if(!Number.isSafeInteger(margin)||margin<0)throw new RangeError('margin must be a non-negative integer');
  if(!bounds||!['minX','minY','maxX','maxY'].every(key=>Number.isFinite(bounds[key]))||bounds.minX>bounds.maxX||bounds.minY>bounds.maxY)throw new TypeError('bounds must contain finite ordered ground coordinates');
  if(!Array.isArray(pins))throw new TypeError('pins must be an array');
  if(previousMode!=='detail'&&previousMode!=='overview')throw new TypeError('previousMode must be detail or overview');
  const cols=Math.ceil(width/chunkSize),rows=Math.ceil(height/chunkSize);
  const makeChunk=(cx,cy,pinned=false)=>({id:chunkId(cx,cy),x:cx*chunkSize,y:cy*chunkSize,w:Math.min(chunkSize,width-cx*chunkSize),h:Math.min(chunkSize,height-cy*chunkSize),pinned});
  const pinned=new Map();
  for(const pin of pins){
    if(!pin||!Number.isFinite(pin.x)||!Number.isFinite(pin.y))throw new TypeError('each pin must contain finite x and y');
    if(pin.x<0||pin.y<0||pin.x>=width||pin.y>=height)continue;
    const cx=Math.floor(pin.x/chunkSize),cy=Math.floor(pin.y/chunkSize);
    pinned.set(chunkId(cx,cy),makeChunk(cx,cy,true));
  }
  const pinnedChunks=[...pinned.values()].sort((a,b)=>a.y-b.y||a.x-b.x);
  const visible=[];
  const intersects=bounds.maxX>=0&&bounds.maxY>=0&&bounds.minX<width&&bounds.minY<height;
  const minCX=Math.max(0,Math.floor(bounds.minX/chunkSize)),minCY=Math.max(0,Math.floor(bounds.minY/chunkSize));
  const maxCX=Math.min(cols-1,Math.floor(bounds.maxX/chunkSize)),maxCY=Math.min(rows-1,Math.floor(bounds.maxY/chunkSize));
  if(intersects)for(let cy=minCY;cy<=maxCY;cy++)for(let cx=minCX;cx<=maxCX;cx++)visible.push(makeChunk(cx,cy));
  const visibleKeys=visible.map(chunk=>chunk.id),pinnedKeys=pinnedChunks.map(chunk=>chunk.id);
  const demandCount=pinned.size+visible.reduce((count,chunk)=>count+Number(!pinned.has(chunk.id)),0);
  const returnBudget=Math.max(1,pinned.size,maxChunks-Math.max(1,Math.ceil(maxChunks*.2)));
  const mode=demandCount>maxChunks||(previousMode==='overview'&&demandCount>returnBudget)?'overview':'detail';
  const chunks=[...pinnedChunks],included=new Set(pinnedKeys);
  const add=chunk=>{
    if(chunks.length>=maxChunks||included.has(chunk.id))return;
    included.add(chunk.id);chunks.push(chunk);
  };
  if(mode==='detail'){
    visible.forEach(add);
    // Expand in rings so nearby margin wins when the budget cannot hold it all.
    const rings=Math.min(margin,Math.max(cols,rows));
    for(let ring=1;intersects&&ring<=rings&&chunks.length<maxChunks;ring++){
      const left=Math.max(0,minCX-ring),right=Math.min(cols-1,maxCX+ring);
      const top=Math.max(0,minCY-ring),bottom=Math.min(rows-1,maxCY+ring);
      for(let cy=top;cy<=bottom&&chunks.length<maxChunks;cy++)for(let cx=left;cx<=right&&chunks.length<maxChunks;cx++){
        if(cx>=minCX&&cx<=maxCX&&cy>=minCY&&cy<=maxCY)continue;
        if(Math.max(minCX-cx,cx-maxCX,minCY-cy,cy-maxCY)!==ring)continue;
        add(makeChunk(cx,cy));
      }
    }
  }
  return {mode,chunks,visibleKeys,pinnedKeys,budgetOverflow:Math.max(0,pinned.size-maxChunks)};
}

const defaultSchedule=callback=>{const timer=setTimeout(callback,0);return ()=>clearTimeout(timer);};
const now=()=>globalThis.performance?.now?.()??Date.now();

/**
 * Owns only completed resources. build is synchronous and must clean up its own
 * partial work if it throws. Failed chunks retry on update, never in a busy loop.
 * schedule(callback) may return a cancellation function; callbacks still check
 * their identity when cancellation is unavailable. onChange receives stats.
 */
export function createChunkStream({build,release,schedule=defaultSchedule,onChange,onError}={}){
  for(const [name,callback] of Object.entries({build,release,schedule}))if(typeof callback!=='function')throw new TypeError(`${name} must be a function`);
  for(const [name,callback] of Object.entries({onChange,onError}))if(callback!==undefined&&typeof callback!=='function')throw new TypeError(`${name} must be a function`);
  let desired=new Map(),queue=[],pending=null,flushing=false,revision=0;
  let generation=0,builtCount=0,releasedCount=0,errors=0,lastBuildDuration=0,lastError=null;
  const ready=new Map(),failed=new Set();
  const snapshot=()=>({readyIds:[...ready.keys()],readyCount:ready.size,queuedCount:queue.length,builtCount,releasedCount,generation,errors,lastBuildDuration,lastError});
  function reportError(error,chunk){
    errors++;lastError=error instanceof Error?error.message:String(error);
    // Observers cannot interrupt cleanup or make a completed resource leak.
    try{onError?.(error,chunk);}catch(observerError){errors++;lastError=String(observerError?.message??observerError);}
  }
  function changed(){try{onChange?.(snapshot());}catch(error){reportError(error,null);}}
  function dispose(entry){
    releasedCount++;
    try{release(entry.resource,entry.chunk);}catch(error){reportError(error,entry.chunk);}
  }
  function cancelScheduled(){
    const task=pending;pending=null;
    if(!task)return;
    task.active=false;
    try{task.cancel?.();}catch(error){reportError(error,null);}
  }
  function scheduleNext(){
    if(pending||flushing||!queue.length)return;
    const task={active:true,cancel:null};pending=task;
    let scheduling=true;
    const callback=()=>{
      // Accommodate an immediately invoking scheduler without recursive builds.
      if(scheduling){queueMicrotask(callback);return;}
      if(!task.active||pending!==task)return;
      task.active=false;pending=null;
      flush(1);
    };
    try{
      const cancellation=schedule(callback);
      if(typeof cancellation==='function')task.cancel=cancellation;
    }catch(error){
      if(pending===task)pending=null;
      task.active=false;reportError(error,null);changed();
    }finally{scheduling=false;}
  }
  function update(plan){
    if(!plan||!Array.isArray(plan.chunks))throw new TypeError('plan.chunks must be an array');
    const next=new Map();
    for(const chunk of plan.chunks){
      if(!chunk||typeof chunk.id!=='string'||!chunk.id)throw new TypeError('chunk.id must be a nonempty string');
      if(next.has(chunk.id))throw new TypeError(`duplicate chunk.id: ${chunk.id}`);
      next.set(chunk.id,chunk);
    }
    const previousChunks=[...desired.values()],nextChunks=[...next.values()];
    const sameDemand=nextChunks.length===previousChunks.length&&nextChunks.every((chunk,index)=>
      ['id','x','y','w','h','pinned'].every(key=>chunk[key]===previousChunks[index][key]));
    // Camera reconciliation can happen every frame. An unchanged desired set
    // must not perpetually cancel the build already waiting for the next frame.
    if(sameDemand&&!failed.size){scheduleNext();return;}
    const currentRevision=++revision;
    desired=next;queue=[];failed.clear();
    const obsolete=[];
    for(const [id,entry] of ready){
      const nextChunk=desired.get(id);
      if(!nextChunk||['x','y','w','h'].some(key=>entry.chunk[key]!==nextChunk[key])){
        ready.delete(id);obsolete.push(entry);
      }else entry.chunk=nextChunk; // Pin metadata can change without new geometry.
    }
    // Detach all obsolete entries before calling a release hook that may reset.
    cancelScheduled();obsolete.forEach(dispose);
    if(revision!==currentRevision)return;
    queue=[...desired.values()].filter(chunk=>!ready.has(chunk.id));
    changed();scheduleNext();
  }
  function reset(){
    revision++;generation++;
    desired=new Map();queue=[];failed.clear();
    const obsolete=[...ready.values()];ready.clear();
    cancelScheduled();obsolete.forEach(dispose);changed();
  }
  function flush(limit=1){
    if(!Number.isSafeInteger(limit)||limit<0)throw new RangeError('flush limit must be a non-negative integer');
    if(flushing||limit===0)return 0;
    cancelScheduled();flushing=true;
    const currentRevision=revision;
    let attempted=0;
    try{
      while(queue.length&&attempted<limit&&revision===currentRevision){
        const chunk=queue.shift();
        if(!desired.has(chunk.id)||ready.has(chunk.id))continue;
        attempted++;
        let resource;const start=now();
        try{resource=build(chunk);builtCount++;}
        catch(error){
          lastBuildDuration=Math.max(0,now()-start);
          if(revision===currentRevision)failed.add(chunk.id);
          reportError(error,chunk);changed();continue;
        }
        lastBuildDuration=Math.max(0,now()-start);
        const entry={resource,chunk};
        if(revision!==currentRevision||!desired.has(chunk.id))dispose(entry);
        else ready.set(chunk.id,entry);
        changed();
      }
    }finally{flushing=false;scheduleNext();}
    return attempted;
  }
  return {update,reset,flush,isReady:id=>ready.has(id),get stats(){return snapshot();}};
}
