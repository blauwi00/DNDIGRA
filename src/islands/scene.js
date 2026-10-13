// Shared logical/appearance queries for compact islands and frozen tile scenes.
// The sparse road cache is runtime-only: no W*H arrays are created or saved.
import {isLand,sampleIsland} from './terrain.js';
import {SURFACE_BY_CODE,surfaceColor,wallColor} from '../worldgen/surfaces.js';

const roads=new WeakMap();
const key=(x,y)=>`${x},${y}`;
const inBounds=(scene,x,y)=>!!scene&&Number.isInteger(x)&&Number.isInteger(y)&&x>=0&&y>=0&&x<scene.W&&y<scene.H;

export function tileAt(scene,x,y){
  if(!inBounds(scene,x,y))return 'void';
  if(scene.island)return isLand(scene.island,x,y)?'floor':'water';
  return scene.tiles?.[y]?.[x]||'void';
}

function roadSurface(scene,x,y){
  let cells=roads.get(scene);
  if(!cells){
    cells=new Map();
    for(const route of scene.mainRoute||[]){
      const radius=Math.floor((route.width||1)/2);
      for(const [x,y] of route.cells||[])for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++){
        if(isLand(scene.island,x+dx,y+dy))cells.set(key(x+dx,y+dy),route.surface||'dirt');
      }
    }
    roads.set(scene,cells);
  }
  return cells.get(key(x,y));
}

export function sampleScene(scene,x,y){
  const tile=tileAt(scene,x,y);
  if(tile==='void')return {tile,land:false,biome:'void',surface:'void',color:0,height:0,decoration:0,road:false};
  if(scene.island){
    const cell=sampleIsland(scene.island,x,y);
    if(!cell.land)return {...cell,tile,road:false};
    let surface=null;
    for(const region of scene.regions||[])if(region.surface&&x>=region.x&&y>=region.y&&x<region.x+region.w&&y<region.y+region.h)surface=region.surface;
    const road=roadSurface(scene,x,y);
    surface=road||surface;
    const arrival=scene.island.landmarks.arrival,clearing=Math.hypot(x-arrival[0],y-arrival[1])<=8;
    return {...cell,tile,road:!!road,...(surface?{surface,color:surfaceColor(surface,x,y)}:{}),
      decoration:surface||clearing?0:cell.decoration};
  }
  const surface=SURFACE_BY_CODE[scene.surface?.[y]?.[x]]||'stone';
  return {tile,land:tile==='floor',biome:null,surface:tile==='floor'?surface:tile,
    color:tile==='wall'?wallColor(scene.wallStyle,x,y):surfaceColor(surface,x,y),height:0,decoration:0,road:false};
}
