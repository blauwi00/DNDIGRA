import * as T from 'three';
import {sampleScene} from './scene.js';
import {isLand} from './terrain.js';
import {stoneTile} from '../stone-atlas.js';
import {SURFACES} from '../worldgen/surfaces.js';
import {tileVariant} from './pixel-surfaces.js';

// Independent of dry area: only visible chunks and a fixed overview are sampled.
export const ISLAND_OVERVIEW_MAX_SIDE=256;
const MAX_CHUNK_SIDE=32;
const LAND_KEYS=new Set(['grass','moss']);
// Pixel ground textures are shared per family, so material kinds stay bounded.
const GROUND_FAMILY={grass:'grass',moss:'grass',leaves:'grass',sand:'sand',dirt:'dirt',straw:'dirt',gravel:'stone',stone:'stone'};

export function islandRenderConfig(config,scene){
  return scene.island?{...config,enabled:true,chunkSize:10,maxChunks:32}:config;
}

// Per-cell palette shades read as a checkerboard once the pixel texture adds its
// own detail, so ground tints are pulled two thirds of the way to the base shade.
function softTint(surface,rgb){
  const base=SURFACES[surface]?.colors?.[0];if(base===undefined)return rgb;
  const mix=shift=>Math.round(((base>>shift)&255)*.67+((rgb>>shift)&255)*.33);
  return (mix(16)<<16)|(mix(8)<<8)|mix(0);
}
const paleTint=rgb=>{const m=sh=>Math.round(255*.85+((rgb>>sh)&255)*.15);return (m(16)<<16)|(m(8)<<8)|m(0);};
function bounds(scene){
  if(!scene.island||!Number.isInteger(scene.W)||!Number.isInteger(scene.H)||scene.W<1||scene.H<1||scene.W>1040||scene.H>1040)throw new RangeError('Invalid island render bounds');
}
function chunkBounds(scene,rect){
  bounds(scene);
  if(!rect||!['x','y','w','h'].every(key=>Number.isInteger(rect[key]))||rect.x<0||rect.y<0||rect.w<1||rect.h<1||
    rect.w>MAX_CHUNK_SIDE||rect.h>MAX_CHUNK_SIDE||rect.x+rect.w>scene.W||rect.y+rect.h>scene.H)throw new RangeError('Island chunk exceeds the bounded render area');
}

export function prepareIslandOverview(scene,{sample=sampleScene,isCurrent=()=>true}={}){
  bounds(scene);if(!isCurrent())return null;
  const scale=Math.min(1,ISLAND_OVERVIEW_MAX_SIDE/Math.max(scene.W,scene.H));
  const width=Math.max(1,Math.round(scene.W*scale)),height=Math.max(1,Math.round(scene.H*scale));
  const pixels=new Uint8ClampedArray(width*height*4);let samples=0;
  for(let py=0;py<height;py++){
    if(!isCurrent())return null;
    const y=Math.min(scene.H-1,Math.floor((py+.5)*scene.H/height));
    for(let px=0;px<width;px++){
      const x=Math.min(scene.W-1,Math.floor((px+.5)*scene.W/width)),cell=sample(scene,x,y),offset=(py*width+px)*4;
      pixels[offset]=(cell.color>>>16)&255;pixels[offset+1]=(cell.color>>>8)&255;pixels[offset+2]=cell.color&255;
      pixels[offset+3]=cell.tile==='void'?0:255;samples++;
    }
  }
  return isCurrent()?{width,height,pixels,samples}:null;
}

/** Reuse current texture/material owners; continuous colors live on instances. */
export function buildIslandTerrain(scene,rect,{geometry,materialFor,sample=sampleScene}){
  chunkBounds(scene,rect);
  const buckets=new Map(),root=new T.Group();root.name='island-terrain';
  const block=(kind,x,y,z,w,h,d,color)=>{
    if(!buckets.has(kind))buckets.set(kind,[]);
    buckets.get(kind).push([x,y,z,w,h,d,color]);
  };
  for(let y=rect.y;y<rect.y+rect.h;y++)for(let x=rect.x;x<rect.x+rect.w;x++){
    const cell=sample(scene,x,y);if(cell.tile==='void')continue;
    if(cell.land){
      const tile=stoneTile({surface:cell.surface,outdoor:true},x,y);
      // Atlas stone already carries its own colour; tinting it again by the
      // surface colour multiplied twice and rendered roads almost black.
      // Painted tiles carry their own colour; a light tint keeps biome shifts.
      const family=GROUND_FAMILY[cell.surface]||'dirt',variant=tileVariant(family,cellHash(scene.island.detailSeed,x,y)>>>4);
      block(tile===null?'ground:'+family+'#'+variant:'stone:'+tile,x+.5,-.095,y+.5,1,.17,1,tile===null?paleTint(softTint(cell.surface,cell.color)):0xffffff);
    }else{
      // Water sits lower than before so the shoreline shows a raised earth edge.
      block('water',x+.5,-.2,y+.5,1,.17,1,paleTint(cell.color));
      // Foam belongs to sea cells, never to the logical dry floor. Fixed strips
      // meet the shoreline without allocating a global coast mask or new atlas.
      if(isLand(scene.island,x-1,y))block('foam',x+.08,-.11,y+.5,.16,.012,1,0x94bbc0);
      if(isLand(scene.island,x+1,y))block('foam',x+.92,-.11,y+.5,.16,.012,1,0x94bbc0);
      if(isLand(scene.island,x,y-1))block('foam',x+.5,-.11,y+.08,1,.012,.16,0x94bbc0);
      if(isLand(scene.island,x,y+1))block('foam',x+.5,-.11,y+.92,1,.012,.16,0x94bbc0);
    }
  }
  const matrix=new T.Matrix4(),position=new T.Vector3(),scale=new T.Vector3(),rotation=new T.Quaternion(),color=new T.Color();
  try{for(const [kind,data]of buckets){
    const mesh=new T.InstancedMesh(geometry,materialFor(kind==='foam'?'water':kind),data.length);
    mesh.userData.islandMaterial=kind;mesh.castShadow=false;mesh.receiveShadow=true;root.add(mesh);
    data.forEach(([x,y,z,w,h,d,rgb],i)=>{
      position.set(x,y,z);scale.set(w,h,d);matrix.compose(position,rotation,scale);mesh.setMatrixAt(i,matrix);
      // setHex already converts the source sRGB value into Three's working space.
      mesh.setColorAt(i,color.setHex(rgb));
    });
    mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;
  }}catch(error){
    // The caller cannot own a root that was never returned. Release its partial
    // instance buffers here; supplied geometry and materials keep their owner.
    root.traverse(mesh=>{if(mesh.isInstancedMesh)mesh.dispose();});root.clear();throw error;
  }
  return root;
}

function cellHash(seed,x,y){
  let value=(seed^Math.imul(x,73856093)^Math.imul(y,19349663))>>>0;
  value=Math.imul(value^(value>>>16),0x7feb352d);value=Math.imul(value^(value>>>15),0x846ca68b);
  return (value^(value>>>16))>>>0;
}

/** Visual foliage has no scene ID, interaction identity or collision changes. */
export function islandFoliage(scene,rect,{sample=sampleScene}={}){
  chunkBounds(scene,rect);const out=[],arrival=scene.island.landmarks.arrival,landmarks=scene.landmarks||[];
  const near=(x,y,pad)=>landmarks.some(p=>Math.hypot(x-p.x,y-p.y)<Math.min(8,p.radius||2)+pad)||
    (scene.props||[]).some(p=>Math.abs(p.x-x)<=pad&&Math.abs(p.y-y)<=pad);
  for(let y=rect.y;y<rect.y+rect.h;y++)for(let x=rect.x;x<rect.x+rect.w;x++){
    // Global coordinates ensure a remounted chunk recreates identical foliage.
    const cell=sample(scene,x,y);if(!cell.land||cell.road)continue;
    const hash=cellHash(scene.island.detailSeed,x,y),roll=hash/4294967296,rot=hash%4;
    // Sub-cell offsets break the grid; they stay inside the cell so nothing
    // spills onto roads, props or neighbouring interactive cells.
    const ox=((hash>>>12)%7-3)*.07,oz=((hash>>>16)%7-3)*.07,variant=(hash>>>8)%3;
    // Only a small ring around the landing spot stays open; the rest is wooded.
    const clearing=Math.hypot(x-arrival[0],y-arrival[1])<4;
    if(cell.surface==='sand'){
      if(roll<.025&&!near(x,y,1))out.push({x,y,ox,oz,model:'rock',type:'decor',solid:false,variant,rot});
      continue;
    }
    if(!LAND_KEYS.has(cell.surface))continue;
    if(x%2===0&&y%2===0&&!clearing&&roll<=cell.decoration*.55+.12&&!near(x,y,2)){
      out.push({x,y,ox,oz,model:hash%4===0?'bush':'tree',type:'decor',solid:false,variant,rot});continue;
    }
    if(near(x,y,1))continue;
    // Ground cover: dense, cheap, purely decorative, also in the arrival clearing.
    const cover=(hash>>>20)%100;
    if(cover<38)out.push({x,y,ox,oz,model:'grass',type:'decor',solid:false,variant,rot});
    else if(cover<43)out.push({x,y,ox,oz,model:'flowers',type:'decor',solid:false,variant,rot});
    else if(cover<46)out.push({x,y,ox,oz,model:'rock',type:'decor',solid:false,variant,rot});
    else if(cover<48&&cell.decoration>.3)out.push({x,y,ox,oz,model:'stump',type:'decor',solid:false,variant,rot});
    else if(cover<50&&cell.decoration>.3)out.push({x,y,ox,oz,model:'mushrooms',type:'decor',solid:false,variant,rot});
    else if(cover<54&&cell.surface==='moss')out.push({x,y,ox,oz,model:'reeds',type:'decor',solid:false,variant,rot});
  }
  return out;
}
