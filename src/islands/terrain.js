// Additive island terrain descriptor. No scenes, actors, renderer resources or
// saved cell grids live here. Terrain remains reproducible after a JSON save.
import {Rng,hash32} from '../worldgen/rng.js';
import {SURFACES} from '../worldgen/surfaces.js';

const MIN_SIZE=600,MAX_SIZE=1000,MARGIN=20,TAU=Math.PI*2;
const BIOME_IDS=['meadow','forest','desert','mountain','snow','swamp'];
const LANDMARK_IDS=['arrival','port','settlement','clue','ruins','herbs'];
const DIRECTIONS=[[1,0],[-1,0],[0,1],[0,-1]];
const clamp=(value,low,high)=>Math.max(low,Math.min(high,value));
const smooth=(low,high,value)=>{const t=clamp((value-low)/(high-low),0,1);return t*t*(3-2*t);};
const channels=color=>[(color>>>16)&255,(color>>>8)&255,color&255];
const pack=(red,green,blue)=>(clamp(Math.round(red),0,255)<<16)|(clamp(Math.round(green),0,255)<<8)|clamp(Math.round(blue),0,255);
const PALETTES={
  meadow:channels(SURFACES.grass.colors[0]),
  forest:channels(SURFACES.moss.colors[1]),
  desert:channels(SURFACES.sand.colors[0]),
  mountain:channels(SURFACES.stone.colors[0]),
  snow:channels(0xd6dad2),
  swamp:channels(SURFACES.moss.colors[0]),
};
const SURFACE={meadow:'grass',forest:'grass',desert:'sand',mountain:'stone',snow:'gravel',swamp:'moss'};
const HEIGHT={meadow:.12,forest:.19,desert:.16,mountain:.78,snow:.53,swamp:.07};
const FOLIAGE={meadow:.25,forest:.9,desert:.08,mountain:.12,snow:.05,swamp:.72};
const BEACH=channels(SURFACES.sand.colors[0]);

function isJsonDescriptor(value){
  const parents=new Set();let budget=4096;
  const visit=(item,depth=0)=>{
    if(--budget<0||depth>32)return false;
    if(item===null||typeof item==='string'||typeof item==='boolean')return true;
    if(typeof item==='number')return Number.isFinite(item);
    if(typeof item!=='object'||parents.has(item))return false;
    const prototype=Object.getPrototypeOf(item);
    if(!Array.isArray(item)&&prototype!==Object.prototype&&prototype!==null)return false;
    if(Array.isArray(item)&&Object.keys(item).some(key=>!/^(0|[1-9]\d*)$/.test(key)||Number(key)>=item.length))return false;
    parents.add(item);const ok=Object.values(item).every(child=>visit(child,depth+1));parents.delete(item);return ok;
  };
  return visit(value);
}

function normalizeSeed(seed){
  if(typeof seed!=='string'&&(typeof seed!=='number'||!Number.isFinite(seed)))throw new TypeError('Island seed must be a string or finite number');
  const result=String(seed);
  if(result.length>512)throw new RangeError('Island seed must contain at most 512 characters');
  return result;
}

function sideProfile(waves,row,size){
  const position=row/(size-1),q=position*2-1;
  let variation=1;
  for(const [frequency,amplitude,phase] of waves)variation+=amplitude*Math.sin(TAU*frequency*position+phase);
  return Math.sqrt(Math.max(0,1-q*q))*variation;
}

// Every discrete row contains centerX. Adjacent row intervals therefore
// overlap, proving four-connectivity without a flood fill or a stored mask.
function rowSpan(meta,worldY){
  const {landSize:size,margin,shape}=meta,row=worldY-margin;
  const left=shape.centerX-sideProfile(shape.left,row,size)*shape.leftScale;
  const right=shape.centerX+sideProfile(shape.right,row,size)*shape.rightScale;
  return [margin+clamp(Math.floor(left+1e-9),0,size-1),margin+clamp(Math.ceil(right-1e-9),0,size-1)];
}

/** Create a versioned, JSON-safe descriptor; auto size uses the supplied seed. */
export function createIsland(seed,size='auto'){
  seed=normalizeSeed(seed);
  const rng=new Rng(seed).fork('island-terrain-v1');
  if(size==='auto')size=rng.fork('size').int(MIN_SIZE,MAX_SIZE);
  else if(size==='small'||size==='medium'||size==='large')size={small:600,medium:800,large:1000}[size];
  if(!Number.isInteger(size)||size<MIN_SIZE||size>MAX_SIZE)throw new RangeError('Island size must be an integer from 600 to 1000, or auto');
  const shore=rng.fork('shore'),waves=()=>[
    [2,.09+shore.next()*.05,shore.next()*TAU],
    [4,.035+shore.next()*.03,shore.next()*TAU],
    [7,.01+shore.next()*.025,shore.next()*TAU],
  ];
  const shape={kind:'row-envelope',centerX:Math.floor((size-1)/2),left:waves(),right:waves(),leftScale:0,rightScale:0};
  let maxLeft=0,maxRight=0;
  // Normalize actual sampled rows, rather than continuous extrema that can
  // miss the outermost cell and silently turn a 600-cell island into 598.
  for(let row=0;row<size;row++){
    maxLeft=Math.max(maxLeft,sideProfile(shape.left,row,size));
    maxRight=Math.max(maxRight,sideProfile(shape.right,row,size));
  }
  shape.leftScale=shape.centerX/maxLeft;
  shape.rightScale=(size-1-shape.centerX)/maxRight;
  const meta={v:1,seed,landSize:size,W:size+MARGIN*2,H:size+MARGIN*2,margin:MARGIN,chunkSize:10,shape,
    detailSeed:hash32(seed+'/island-detail-v1'),biomes:[],clearing:null,landmarks:{}};
  const biomeRng=rng.fork('biomes'),labels=biomeRng.shuffle(BIOME_IDS),rotation=biomeRng.next()*TAU,center=MARGIN+(size-1)/2;
  meta.biomes=labels.map((id,index)=>{
    const angle=rotation+TAU*(index+.08*(biomeRng.next()-.5))/6,radius=size*(.275+biomeRng.next()*.025);
    return {id,x:center+Math.cos(angle)*radius,y:center+Math.sin(angle)*radius,radius:size*(.145+biomeRng.next()*.025)};
  });

  const anchorRng=rng.fork('anchors'),portY=MARGIN+Math.floor(size*(.46+anchorRng.next()*.08));
  const portX=rowSpan(meta,portY)[0];
  let safeX=portX+16;
  for(let y=portY-24;y<=portY+36;y++)safeX=Math.max(safeX,rowSpan(meta,y)[0]+16);
  meta.landmarks={port:[portX,portY],arrival:[portX+24,portY],settlement:[safeX+22,portY],
    clue:[safeX+36,portY-20],ruins:[safeX+66,portY+35],herbs:[safeX+42,portY+20]};
  // The first healer/settlement area is usable field even when the island's
  // randomly positioned snow or swamp biome reaches this part of the coast.
  meta.clearing={x:(meta.landmarks.arrival[0]+meta.landmarks.settlement[0])/2,y:portY,radius:58,blend:30};
  return meta;
}

/** Cheap dry-cell test. Coordinates are world cells, including the ocean margin. */
export function isLand(meta,x,y){
  if(!meta?.shape||!Number.isInteger(x)||!Number.isInteger(y))return false;
  const low=meta.margin,high=low+meta.landSize-1;
  if(x<low||y<low||x>high||y>high)return false;
  const [left,right]=rowSpan(meta,y);
  return x>=left&&x<=right;
}

function ocean(meta,x,y){
  const valid=Number.isFinite(x)&&Number.isFinite(y),phase=(meta?.detailSeed||0)/4294967296*TAU;
  const ripple=valid?Math.sin(x/47+phase)*Math.sin(y/61-phase)*3:0;
  return {land:false,biome:'ocean',color:pack(49+ripple,86+ripple,106+ripple),height:0,decoration:0,surface:'water'};
}

/** Appearance only: mountain height is visual and every dry cell is walkable. */
export function sampleIsland(meta,x,y){
  if(!isLand(meta,x,y))return ocean(meta,x,y);
  let total=0,red=0,green=0,blue=0,height=0,decoration=0,best=-1,biome='meadow';
  for(const region of meta.biomes){
    const distance=((x-region.x)**2+(y-region.y)**2)/(region.radius**2);
    const weight=Math.exp(-distance/2),color=PALETTES[region.id];
    total+=weight;red+=color[0]*weight;green+=color[1]*weight;blue+=color[2]*weight;
    height+=HEIGHT[region.id]*weight;decoration+=FOLIAGE[region.id]*weight;
    if(weight>best){best=weight;biome=region.id;}
  }
  red/=total;green/=total;blue/=total;height/=total;decoration/=total;
  const clearing=meta.clearing,field=1-smooth(clearing.radius,clearing.radius+clearing.blend,Math.hypot(x-clearing.x,y-clearing.y));
  red+=(PALETTES.meadow[0]-red)*field;green+=(PALETTES.meadow[1]-green)*field;blue+=(PALETTES.meadow[2]-blue)*field;
  height+=(HEIGHT.meadow-height)*field;decoration+=(FOLIAGE.meadow-decoration)*field;
  if(field>.5)biome='meadow';
  const [left,right]=rowSpan(meta,y),depth=Math.min(x-left,right-x,y-meta.margin,meta.margin+meta.landSize-1-y);
  const inland=smooth(0,16,depth);
  red=BEACH[0]+(red-BEACH[0])*inland;green=BEACH[1]+(green-BEACH[1])*inland;blue=BEACH[2]+(blue-BEACH[2])*inland;
  const phase=meta.detailSeed/4294967296*TAU;
  const tone=Math.sin(x/37+phase)*Math.cos(y/43-phase)*3;
  return {land:true,biome,color:pack(red+tone,green+tone,blue+tone),
    height:clamp(.015+height*inland,0,1),decoration:clamp(decoration*inland,0,1),surface:depth<6?'sand':SURFACE[biome]};
}

/**
 * A bounded four-direction dry route. Each adjacent pair of row spans shares
 * the dry spine, so routing needs only the traversed rows and output cells.
 * maxSteps counts movement edges; an over-budget or invalid route is [].
 */
export function findPath(meta,from,to,maxSteps=1500){
  if(!Array.isArray(from)||!Array.isArray(to)||from.length!==2||to.length!==2||
    !Number.isInteger(maxSteps)||maxSteps<0||!isLand(meta,...from)||!isLand(meta,...to))return [];
  const path=[[from[0],from[1]]];let [x,y]=from;
  const moveX=target=>{
    while(x!==target){if(path.length>maxSteps)return false;x+=Math.sign(target-x);path.push([x,y]);}
    return true;
  };
  const dy=Math.sign(to[1]-y);
  while(y!==to[1]){
    const current=rowSpan(meta,y),next=rowSpan(meta,y+dy);
    const target=clamp(x,Math.max(current[0],next[0]),Math.min(current[1],next[1]));
    if(!moveX(target)||path.length>maxSteps)return [];
    y+=dy;path.push([x,y]);
  }
  return moveX(to[0])?path:[];
}

/** Validate the finite descriptor and mandatory links without scanning a grid. */
export function validateIsland(meta){
  const fail=error=>({ok:false,error});
  if(!meta||typeof meta!=='object'||meta.v!==1)return fail('Unsupported island descriptor version');
  if(!isJsonDescriptor(meta))return fail('Island metadata must contain only bounded JSON values');
  try{normalizeSeed(meta.seed);}catch{return fail('Invalid island seed');}
  const size=meta.landSize;
  if(!Number.isInteger(size)||size<MIN_SIZE||size>MAX_SIZE)return fail('Island dry size must be 600..1000 cells');
  if(meta.margin!==MARGIN||meta.W!==size+MARGIN*2||meta.H!==size+MARGIN*2||meta.chunkSize!==10)return fail('Invalid island bounds, ocean margin or chunk size');
  const shape=meta.shape;
  if(!shape||shape.kind!=='row-envelope'||shape.centerX!==Math.floor((size-1)/2))return fail('Invalid island shoreline');
  for(const waves of [shape.left,shape.right]){
    if(!Array.isArray(waves)||waves.length!==3)return fail('Invalid shoreline harmonics');
    for(let i=0;i<waves.length;i++){
      const wave=waves[i];
      if(!Array.isArray(wave)||wave.length!==3||wave[0]!==[2,4,7][i]||!Number.isFinite(wave[1])||wave[1]<0||wave[1]>.15||!Number.isFinite(wave[2]))return fail('Invalid shoreline harmonics');
    }
  }
  if(!Number.isFinite(shape.leftScale)||!Number.isFinite(shape.rightScale)||shape.leftScale<=0||shape.rightScale<=0)return fail('Invalid shoreline scale');
  let maxLeft=0,maxRight=0,minX=Infinity,maxX=-1;
  for(let row=0;row<size;row++){
    maxLeft=Math.max(maxLeft,sideProfile(shape.left,row,size));maxRight=Math.max(maxRight,sideProfile(shape.right,row,size));
    const [left,right]=rowSpan(meta,row+MARGIN);minX=Math.min(minX,left);maxX=Math.max(maxX,right);
    if(left>MARGIN+shape.centerX||right<MARGIN+shape.centerX)return fail('Disconnected island shoreline');
  }
  if(minX!==MARGIN||maxX!==MARGIN+size-1||Math.abs(shape.leftScale-shape.centerX/maxLeft)>1e-8||Math.abs(shape.rightScale-(size-1-shape.centerX)/maxRight)>1e-8)return fail('Island dry bounds are not exact');
  if(!Number.isInteger(meta.detailSeed)||meta.detailSeed<0||meta.detailSeed>0xffffffff)return fail('Invalid island detail seed');
  if(!Array.isArray(meta.biomes)||meta.biomes.length!==6||new Set(meta.biomes.map(region=>region?.id)).size!==6)return fail('Island needs six distinct biome regions');
  for(const region of meta.biomes)if(!BIOME_IDS.includes(region?.id)||!Number.isFinite(region.x)||!Number.isFinite(region.y)||
    region.x<MARGIN||region.y<MARGIN||region.x>MARGIN+size-1||region.y>MARGIN+size-1||
    !Number.isFinite(region.radius)||region.radius<size*.1||region.radius>size*.3)return fail('Invalid island biome region');
  const clearing=meta.clearing;
  if(!clearing||![clearing.x,clearing.y,clearing.radius,clearing.blend].every(Number.isFinite)||
    !isLand(meta,Math.round(clearing.x),Math.round(clearing.y))||clearing.radius<4||clearing.radius>size/4||clearing.blend<1||clearing.blend>size/4)return fail('Invalid arrival clearing');
  for(const id of LANDMARK_IDS){
    const point=meta.landmarks?.[id];
    if(!Array.isArray(point)||point.length!==2||!isLand(meta,...point))return fail('Mandatory island landmark is not dry: '+id);
  }
  const port=meta.landmarks.port;
  if(!DIRECTIONS.some(([dx,dy])=>!isLand(meta,port[0]+dx,port[1]+dy)))return fail('Island port is not coastal');
  const arrival=sampleIsland(meta,...meta.landmarks.arrival),settlement=sampleIsland(meta,...meta.landmarks.settlement);
  if(arrival.biome!=='meadow'||arrival.surface!=='grass'||settlement.biome!=='meadow')return fail('Arrival and healer settlement need a clear meadow');
  for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)if(!isLand(meta,meta.landmarks.arrival[0]+dx,meta.landmarks.arrival[1]+dy))return fail('Island arrival needs a usable dry clearing');
  for(const id of LANDMARK_IDS)if(!findPath(meta,meta.landmarks.arrival,meta.landmarks[id]).length)return fail('Mandatory island landmark is unreachable: '+id);
  // Check actual dominance too: six IDs at coincident centers are not six
  // usable biome regions. This is a bounded sparse probe, never a cell grid.
  const visibleBiomes=new Set();
  for(let gy=0;gy<24&&visibleBiomes.size<6;gy++)for(let gx=0;gx<24;gx++){
    const x=MARGIN+Math.round((size-1)*(gx+.5)/24),y=MARGIN+Math.round((size-1)*(gy+.5)/24);
    const cell=sampleIsland(meta,x,y);if(cell.land)visibleBiomes.add(cell.biome);
  }
  if(visibleBiomes.size!==6)return fail('Island biome regions do not have six usable areas');
  try{if(new TextEncoder().encode(JSON.stringify(meta)).byteLength>=20_000)return fail('Island metadata exceeds its storage budget');}catch{return fail('Island metadata is not JSON serializable');}
  return {ok:true,error:null};
}
