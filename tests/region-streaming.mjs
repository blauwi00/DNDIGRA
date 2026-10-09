import assert from 'node:assert/strict';
import {test} from 'node:test';
import {planRegionChunks,createChunkStream} from '../src/region-streaming.js';

const defaults={width:96,height:64,bounds:{minX:32,minY:16,maxX:47,maxY:31}};
const ids=plan=>plan.chunks.map(chunk=>chunk.id);

test('camera demand loads camera chunks before margin and keeps distant pins first',()=>{
  const plan=planRegionChunks({...defaults,maxChunks:6,pins:[{x:1,y:1}]});
  assert.equal(plan.mode,'detail');
  assert.deepEqual(plan.visibleKeys,['2,1']);
  assert.deepEqual(plan.pinnedKeys,['0,0']);
  assert.deepEqual(ids(plan).slice(0,2),['0,0','2,1']);
  assert.equal(plan.chunks.length,6);
  assert.ok(plan.chunks[0].pinned);
  assert.ok(plan.chunks.slice(1).every(chunk=>!chunk.pinned));
  assert.deepEqual(plan,planRegionChunks({...defaults,maxChunks:6,pins:[{x:1,y:1}]}));
});

test('partial edge chunks cover cells exactly and clip camera demand to map',()=>{
  const plan=planRegionChunks({width:35,height:18,bounds:{minX:30,minY:-10,maxX:80,maxY:30},margin:0});
  assert.deepEqual(plan.visibleKeys,['1,0','2,0','1,1','2,1']);
  const chunks=Object.fromEntries(plan.chunks.map(chunk=>[chunk.id,chunk]));
  assert.deepEqual(chunks['2,1'],{id:'2,1',x:32,y:16,w:3,h:2,pinned:false});
  assert.deepEqual(chunks['1,0'],{id:'1,0',x:16,y:0,w:16,h:16,pinned:false});
  const full=planRegionChunks({width:35,height:18,bounds:{minX:0,minY:0,maxX:35,maxY:18},margin:0});
  const coverage=new Map();
  for(const chunk of full.chunks)for(let y=chunk.y;y<chunk.y+chunk.h;y++)for(let x=chunk.x;x<chunk.x+chunk.w;x++){
    const key=x+','+y;coverage.set(key,(coverage.get(key)||0)+1);
  }
  assert.equal(coverage.size,35*18);
  assert.ok([...coverage.values()].every(count=>count===1));
});

test('a camera on a chunk boundary conservatively includes both touching chunks',()=>{
  const plan=planRegionChunks({...defaults,bounds:{minX:15,minY:0,maxX:16,maxY:15},margin:0});
  assert.deepEqual(plan.visibleKeys,['0,0','1,0']);
  assert.equal(planRegionChunks({...defaults,bounds:{minX:96,minY:0,maxX:120,maxY:15}}).chunks.length,0);
});

test('overview removes distant detail and margin until demand clears hysteresis',()=>{
  const options={width:96,height:16,pins:[{x:0,y:0}],margin:1,maxChunks:4};
  const bounds=count=>({minX:16,minY:0,maxX:count*16+15,maxY:15});
  const detail=planRegionChunks({...options,bounds:bounds(3)});
  assert.equal(detail.mode,'detail');assert.equal(detail.chunks.length,4);
  const overflow=planRegionChunks({...options,bounds:bounds(4)});
  assert.equal(overflow.mode,'overview');assert.deepEqual(ids(overflow),['0,0']);
  const held=planRegionChunks({...options,bounds:bounds(3),previousMode:'overview'});
  assert.equal(held.mode,'overview');assert.deepEqual(ids(held),['0,0']);
  const returned=planRegionChunks({...options,bounds:bounds(2),previousMode:'overview'});
  assert.equal(returned.mode,'detail');assert.equal(returned.chunks.length,4);
});

test('only distinct in-map pins can exceed the ordinary budget',()=>{
  const plan=planRegionChunks({...defaults,maxChunks:2,pins:[{x:0,y:0},{x:16,y:0},{x:32,y:0},{x:0,y:0},{x:-1,y:0},{x:96,y:0}]});
  assert.equal(plan.mode,'overview');
  assert.deepEqual(ids(plan),['0,0','1,0','2,0']);
  assert.deepEqual(plan.pinnedKeys,ids(plan));
  assert.equal(plan.budgetOverflow,1);
  assert.ok(plan.chunks.every(chunk=>chunk.pinned));
  assert.ok(plan.chunks.length<=Math.max(2,plan.pinnedKeys.length));
});

test('margin is optional and cannot displace visible chunks',()=>{
  const plain=planRegionChunks({...defaults,margin:0,maxChunks:1});
  assert.deepEqual(ids(plain),['2,1']);
  const budget=planRegionChunks({...defaults,margin:9,maxChunks:2});
  assert.equal(budget.chunks.length,2);assert.equal(budget.chunks[0].id,'2,1');
  const offMap=planRegionChunks({...defaults,bounds:{minX:-30,minY:-30,maxX:-1,maxY:-1},pins:[{x:17,y:1}]});
  assert.deepEqual(offMap.visibleKeys,[]);assert.deepEqual(ids(offMap),['1,0']);
});

test('invalid planner inputs fail explicitly instead of scheduling unbounded demand',()=>{
  for(const value of [0,-1,1.5,NaN,Infinity]){
    for(const key of ['width','height','chunkSize','maxChunks'])assert.throws(()=>planRegionChunks({...defaults,[key]:value}),/positive integer/);
  }
  for(const value of [-1,0.5,Infinity])assert.throws(()=>planRegionChunks({...defaults,margin:value}),/non-negative integer/);
  assert.throws(()=>planRegionChunks({...defaults,bounds:{minX:4,minY:0,maxX:1,maxY:3}}),/bounds/);
  assert.throws(()=>planRegionChunks({...defaults,bounds:{minX:0,minY:0,maxX:NaN,maxY:3}}),/bounds/);
  assert.throws(()=>planRegionChunks({...defaults,pins:[{x:NaN,y:0}]}),/pin/);
  assert.throws(()=>planRegionChunks({...defaults,previousMode:'unknown'}),/previousMode/);
});

function scheduler(){
  const tasks=[];
  return {
    tasks,
    schedule(callback){const task={callback,cancelled:false};tasks.push(task);return ()=>{task.cancelled=true;};},
    run(){const task=tasks.find(task=>!task.cancelled&&!task.ran);if(task){task.ran=true;task.callback();}return Boolean(task);},
    get pending(){return tasks.filter(task=>!task.cancelled&&!task.ran).length;}
  };
}
const chunk=id=>({id,x:Number(id.split(',')[0])*16,y:0,w:16,h:16,pinned:false});
const demand=(...keys)=>({mode:'detail',chunks:keys.map(chunk)});
function resources(){
  const live=new Set(),built=[],released=[];
  return {live,built,released,
    build(chunk){const resource={id:chunk.id};live.add(resource);built.push(chunk.id);return resource;},
    release(resource,chunk){assert.ok(live.delete(resource),'resource released exactly once');released.push(chunk.id);}
  };
}

test('one chunk becomes ready per scheduled callback, in demand order',()=>{
  const tasks=scheduler(),owned=resources(),changes=[];
  const stream=createChunkStream({...owned,schedule:tasks.schedule,onChange:stats=>changes.push(stats)});
  stream.update(demand('0,0','1,0','2,0'));
  assert.equal(tasks.pending,1);assert.equal(stream.stats.queuedCount,3);assert.equal(stream.stats.readyCount,0);
  tasks.run();assert.deepEqual(stream.stats.readyIds,['0,0']);assert.equal(stream.stats.queuedCount,2);assert.equal(tasks.pending,1);
  tasks.run();assert.deepEqual(stream.stats.readyIds,['0,0','1,0']);assert.equal(tasks.pending,1);
  tasks.run();assert.equal(stream.stats.readyCount,3);assert.equal(tasks.pending,0);
  assert.ok(stream.isReady('2,0'));assert.ok(!stream.isReady('3,0'));
  assert.equal(stream.stats.builtCount,3);assert.equal(stream.stats.releasedCount,0);
  assert.ok(stream.stats.lastBuildDuration>=0);assert.ok(changes.some(stats=>stats.readyCount===3));
  const snapshot=stream.stats;snapshot.readyIds.push('foreign');assert.ok(!stream.isReady('foreign'));
});

test('updates retain ready resources, discard stale queue and release unwanted chunks before replacement',()=>{
  const tasks=scheduler(),owned=resources();
  const stream=createChunkStream({...owned,schedule:tasks.schedule});
  stream.update(demand('0,0','1,0','2,0'));tasks.run();tasks.run();
  const stale=tasks.tasks.at(-1);
  stream.update(demand('1,0','4,0'));
  assert.deepEqual(owned.released,['0,0']);assert.deepEqual(stream.stats.readyIds,['1,0']);assert.equal(stream.stats.queuedCount,1);
  stale.callback();assert.deepEqual(owned.built,['0,0','1,0']);
  tasks.run();assert.deepEqual(owned.built,['0,0','1,0','4,0']);assert.equal(owned.live.size,2);
  stream.update(demand('1,0','4,0'));assert.equal(tasks.pending,0);assert.equal(stream.stats.queuedCount,0);
});

test('reset releases all resources and invalidates an uncancellable scene callback',()=>{
  const tasks=[],owned=resources();
  const stream=createChunkStream({...owned,schedule:callback=>{tasks.push(callback);}});
  stream.update(demand('0,0','1,0'));tasks.shift()();
  const stale=tasks.shift();stream.reset();
  assert.equal(stream.stats.generation,1);assert.equal(owned.live.size,0);assert.equal(stream.stats.readyCount,0);assert.equal(stream.stats.queuedCount,0);
  stream.update(demand('4,0'));stale();assert.deepEqual(owned.built,['0,0']);
  tasks.shift()();assert.deepEqual(stream.stats.readyIds,['4,0']);
  stream.reset();assert.equal(stream.stats.releasedCount,2);assert.equal(stream.stats.generation,2);
});

test('manual flush uses its limit and cancels any old scheduled callback',()=>{
  const tasks=scheduler(),owned=resources(),stream=createChunkStream({...owned,schedule:tasks.schedule});
  stream.update(demand('0,0','1,0','2,0'));
  const stale=tasks.tasks[0];
  assert.equal(stream.flush(2),2);assert.equal(stream.stats.readyCount,2);assert.equal(stream.stats.queuedCount,1);
  stale.callback();assert.equal(stream.stats.readyCount,2);
  tasks.run();assert.equal(stream.stats.readyCount,3);assert.equal(tasks.pending,0);
});

test('reset during construction releases returned old-scene resource instead of publishing it',()=>{
  const tasks=scheduler(),owned=resources();let stream;
  stream=createChunkStream({...owned,schedule:tasks.schedule,build(chunk){const resource=owned.build(chunk);stream.reset();return resource;}});
  stream.update(demand('0,0','1,0'));tasks.run();
  assert.equal(stream.stats.readyCount,0);assert.equal(stream.stats.queuedCount,0);assert.equal(stream.stats.builtCount,1);assert.equal(stream.stats.releasedCount,1);
  assert.equal(owned.live.size,0);assert.equal(tasks.pending,0);
});

test('reentrant camera update cannot publish stale construction or lose the replacement queue',()=>{
  const tasks=scheduler(),owned=resources();let stream;
  stream=createChunkStream({...owned,schedule:tasks.schedule,build(chunk){const resource=owned.build(chunk);if(chunk.id==='0,0')stream.update(demand('4,0'));return resource;}});
  stream.update(demand('0,0','1,0'));tasks.run();
  assert.deepEqual(owned.released,['0,0']);assert.equal(stream.stats.readyCount,0);assert.equal(stream.stats.queuedCount,1);assert.equal(tasks.pending,1);
  tasks.run();assert.deepEqual(stream.stats.readyIds,['4,0']);assert.equal(owned.live.size,1);
});

test('failed construction stays unready, continues other chunks and retries on the next update',()=>{
  const tasks=scheduler(),owned=resources(),errors=[];let attempts=0;
  const stream=createChunkStream({...owned,schedule:tasks.schedule,onError:(error,chunk)=>errors.push([error.message,chunk.id]),build(chunk){if(chunk.id==='0,0'&&attempts++===0)throw new Error('fixture build failed');return owned.build(chunk);}});
  stream.update(demand('0,0','1,0'));tasks.run();
  assert.ok(!stream.isReady('0,0'));assert.equal(stream.stats.errors,1);assert.deepEqual(errors,[['fixture build failed','0,0']]);
  tasks.run();assert.deepEqual(stream.stats.readyIds,['1,0']);assert.equal(tasks.pending,0);
  stream.update(demand('0,0','1,0'));tasks.run();
  assert.ok(stream.isReady('0,0'));assert.equal(stream.stats.builtCount,2);assert.equal(stream.stats.errors,1);
});

test('reset during release clears all old resources exactly once',()=>{
  const tasks=scheduler(),owned=resources();let stream,reenter=true;
  stream=createChunkStream({...owned,schedule:tasks.schedule,release(resource,chunk){owned.release(resource,chunk);if(reenter){reenter=false;stream.reset();}}});
  stream.update(demand('0,0','1,0','2,0'));stream.flush(3);
  stream.update(demand('4,0'));
  assert.equal(owned.live.size,0);assert.equal(new Set(owned.released).size,3);assert.equal(stream.stats.queuedCount,0);assert.equal(tasks.pending,0);
});

test('repeated camera traversals plateau owned resources and queue within planner budget',()=>{
  const tasks=scheduler(),owned=resources(),stream=createChunkStream({...owned,schedule:tasks.schedule});
  let maxLive=0,maxQueue=0;
  for(let lap=0;lap<8;lap++)for(const x of [0,16,32,48,64,80,64,48,32,16,0]){
    const plan=planRegionChunks({...defaults,bounds:{minX:x,minY:16,maxX:x+15,maxY:31},pins:[{x:0,y:0}],maxChunks:5});
    stream.update(plan);maxQueue=Math.max(maxQueue,stream.stats.queuedCount);
    while(tasks.run())maxLive=Math.max(maxLive,owned.live.size);
    assert.ok(owned.live.size<=5);assert.ok(stream.stats.readyCount<=5);
  }
  assert.equal(maxLive,5);assert.ok(maxQueue<=5);assert.ok(stream.stats.builtCount>5);
  stream.reset();assert.equal(owned.live.size,0);assert.equal(stream.stats.builtCount,stream.stats.releasedCount);
});

test('stream validates callbacks, plans and manual flush limits before changing ownership',()=>{
  assert.throws(()=>createChunkStream({release(){}}),/build/);
  assert.throws(()=>createChunkStream({build(){}}),/release/);
  const tasks=scheduler(),owned=resources(),stream=createChunkStream({...owned,schedule:tasks.schedule});
  stream.update(demand('0,0'));tasks.run();
  assert.throws(()=>stream.update({chunks:[chunk('1,0'),chunk('1,0')]}),/duplicate/);
  assert.throws(()=>stream.update({}),/chunks/);
  for(const limit of [-1,0.5,Infinity])assert.throws(()=>stream.flush(limit),/non-negative integer/);
  assert.equal(stream.flush(0),0);assert.ok(stream.isReady('0,0'));
  stream.reset();assert.equal(owned.live.size,0);
});

test('identical frame demand retains the scheduled build instead of postponing loading',()=>{
  const tasks=scheduler(),owned=resources(),stream=createChunkStream({...owned,schedule:tasks.schedule});
  stream.update(demand('0,0','1,0'));
  const scheduled=tasks.tasks[0];
  for(let frame=0;frame<10;frame++)stream.update(demand('0,0','1,0'));
  assert.equal(tasks.tasks.length,1);assert.equal(scheduled.cancelled,false);
  scheduled.ran=true;scheduled.callback();assert.deepEqual(stream.stats.readyIds,['0,0']);
  tasks.run();assert.equal(stream.stats.readyCount,2);
});

test('identical demand during construction preserves the completed resource',()=>{
  const tasks=scheduler(),owned=resources();let stream;
  stream=createChunkStream({...owned,schedule:tasks.schedule,build(chunk){const resource=owned.build(chunk);stream.update(demand('0,0'));return resource;}});
  stream.update(demand('0,0'));tasks.run();
  assert.deepEqual(stream.stats.readyIds,['0,0']);assert.equal(owned.live.size,1);assert.equal(stream.stats.releasedCount,0);assert.equal(tasks.pending,0);
  stream.reset();
});

test('release failures report errors while remaining old resources are still released',()=>{
  const tasks=scheduler(),owned=resources(),errors=[];
  const stream=createChunkStream({...owned,schedule:tasks.schedule,onError:(error,chunk)=>errors.push(chunk.id),release(resource,chunk){owned.release(resource,chunk);if(chunk.id==='0,0')throw new Error('fixture cleanup error');}});
  stream.update(demand('0,0','1,0'));stream.flush(2);stream.reset();
  assert.equal(owned.live.size,0);assert.equal(stream.stats.readyCount,0);assert.equal(stream.stats.releasedCount,2);assert.equal(stream.stats.errors,1);
  assert.deepEqual(errors,['0,0']);
});

test('default scheduling defers construction to a new task',async()=>{
  const owned=resources(),stream=createChunkStream({...owned});
  stream.update(demand('0,0'));assert.equal(stream.stats.readyCount,0);
  await new Promise(resolve=>setTimeout(resolve,10));
  assert.equal(stream.stats.readyCount,1);stream.reset();assert.equal(owned.live.size,0);
});

test('an error observer throwing a non-Error value cannot interrupt reset cleanup',()=>{
  const tasks=scheduler(),owned=resources();
  const stream=createChunkStream({...owned,schedule:tasks.schedule,onError(){throw null;},release(resource,chunk){owned.release(resource,chunk);if(chunk.id==='0,0')throw new Error('cleanup fixture');}});
  stream.update(demand('0,0','1,0'));stream.flush(2);
  assert.doesNotThrow(()=>stream.reset());
  assert.equal(owned.live.size,0);assert.equal(stream.stats.releasedCount,2);assert.equal(stream.stats.errors,2);
});

test('changed geometry under a stable chunk ID releases and rebuilds the ready resource',()=>{
  for(const [key,value] of [['x',2],['y',3],['w',8],['h',9]]){
    const tasks=scheduler(),owned=resources(),builtGeometry=[];
    const stream=createChunkStream({...owned,schedule:tasks.schedule,build(chunk){builtGeometry.push([chunk.x,chunk.y,chunk.w,chunk.h]);return owned.build(chunk);}});
    stream.update(demand('0,0'));tasks.run();
    const changed={...chunk('0,0'),[key]:value};
    stream.update({chunks:[changed]});
    assert.equal(stream.isReady('0,0'),false,key+' change removes stale readiness');
    assert.equal(owned.live.size,0);assert.equal(stream.stats.releasedCount,1);assert.equal(stream.stats.queuedCount,1);
    tasks.run();assert.equal(stream.isReady('0,0'),true);assert.equal(stream.stats.builtCount,2);
    assert.deepEqual(builtGeometry.at(-1),[changed.x,changed.y,changed.w,changed.h]);
    stream.reset();assert.equal(owned.live.size,0);
  }
});

test('pin-only changes preserve the ready resource without rebuilding geometry',()=>{
  const tasks=scheduler(),owned=resources(),stream=createChunkStream({...owned,schedule:tasks.schedule});
  stream.update(demand('0,0'));tasks.run();
  stream.update({chunks:[{...chunk('0,0'),pinned:true}]});
  assert.equal(stream.isReady('0,0'),true);assert.equal(stream.stats.builtCount,1);assert.equal(stream.stats.releasedCount,0);assert.equal(tasks.pending,0);
  stream.update(demand('0,0'));
  assert.equal(stream.stats.builtCount,1);assert.equal(owned.live.size,1);stream.reset();
});
