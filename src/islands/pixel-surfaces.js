import * as T from 'three';

// Original pixel-art detail for island ground blocks, drawn in code. Textures are
// light greyscale so the generator's per-cell colour (instanceColor) still sets
// the hue; the texture only adds blades, pebbles, ripples and a grassy rim.
const SIZE=32;

function rng(seed){let s=seed>>>0||1;return()=>{s=Math.imul(s^(s>>>15),0x2c1b3c6d);s^=s+Math.imul(s^(s>>>7),0x297a2d39);return((s^(s>>>14))>>>0)/4294967296};}

function paint(createCanvas,seed,draw){
  const c=createCanvas();c.width=c.height=SIZE;
  const ctx=c.getContext('2d'),r=rng(seed);
  const px=(x,y,v,w=1,h=1)=>{ctx.fillStyle=`rgb(${v},${v},${v})`;ctx.fillRect(x,y,w,h);};
  draw(px,r);
  const t=new T.CanvasTexture(c);
  t.colorSpace=T.SRGBColorSpace;t.magFilter=t.minFilter=T.NearestFilter;t.generateMipmaps=false;
  return t;
}
const fill=(px,r,levels)=>{for(let y=0;y<SIZE;y++)for(let x=0;x<SIZE;x++)px(x,y,levels[Math.floor(r()*levels.length)]);};

const TOPS={
  grass:(px,r)=>{fill(px,r,[206,214,222,198]);
    for(let i=0;i<46;i++){const x=Math.floor(r()*SIZE),y=Math.floor(r()*(SIZE-2));px(x,y,255);px(x,y+1,236);px(x,y+2,180);}
    for(let i=0;i<10;i++)px(Math.floor(r()*SIZE),Math.floor(r()*SIZE),160,2,1);},
  sand:(px,r)=>{fill(px,r,[232,240,226,246]);
    for(let i=0;i<30;i++)px(Math.floor(r()*SIZE),Math.floor(r()*SIZE),205);
    for(let i=0;i<5;i++){const x=Math.floor(r()*28),y=Math.floor(r()*SIZE);px(x,y,214,4,1);}},
  dirt:(px,r)=>{fill(px,r,[214,204,222,196]);
    for(let i=0;i<16;i++){const x=Math.floor(r()*30),y=Math.floor(r()*30);px(x,y,252,2,1);px(x,y+1,150,2,1);}},
  stone:(px,r)=>{fill(px,r,[220,212,228]);
    for(let i=0;i<7;i++){const x=Math.floor(r()*24),y=Math.floor(r()*24),w=4+Math.floor(r()*6);px(x,y,250,w,1);px(x,y+3,160,w,1);}},
  water:(px,r)=>{fill(px,r,[226,232,220,238]);
    for(let i=0;i<12;i++){const x=Math.floor(r()*26),y=Math.floor(r()*SIZE);px(x,y,255,3+Math.floor(r()*4),1);}},
};


// Sides: a light band on top (takes the surface hue like the face above it),
// then darker soil so block edges read as raised earth instead of flat tiles.
function side(createCanvas,family,seed){
  return paint(createCanvas,seed,(px,r)=>{
    fill(px,r,[118,108,126,112]);
    if(family==='water')return;
    for(let x=0;x<SIZE;x++){const d=family==='grass'?4+Math.floor(r()*5):2+Math.floor(r()*2);
      for(let y=0;y<d;y++)px(x,y,family==='grass'?214:200);px(x,d,88);}
    for(let i=0;i<10;i++)px(Math.floor(r()*30),10+Math.floor(r()*20),150,2,1);
  });
}

// Hand-painted tiles (GPT sheets sliced to 64px, dist/assets/tiles). Each
// family has variants picked per cell; sides reuse the dirt tile, darkened.
export const TILE_SETS = {
  grass: ['grass', 'grass', 'grass-flowers', 'grass-dirt'],
  sand: ['sand', 'sand', 'sand-wet'],
  dirt: ['dirt', 'dirt', 'mud'],
  stone: ['gravel', 'cobble'],
  water: ['water-0'],
};
export function tileVariant(family, hash) {
  const set = TILE_SETS[family] || TILE_SETS.dirt;
  return Math.abs(hash) % set.length;
}

export function createPixelSurfaceMaterials({createCanvas=()=>document.createElement('canvas'),loadTexture=null}={}){
  const cache=new Map(),images=new Map();
  const tile=name=>{
    if(!images.has(name)){const t=loadTexture('assets/tiles/'+name+'.png');t.colorSpace=T.SRGBColorSpace;t.magFilter=T.NearestFilter;t.minFilter=T.NearestFilter;t.generateMipmaps=false;images.set(name,t);}
    return images.get(name);
  };
  return surface=>{
    const [name,v]=String(surface).split('#'),family=TOPS[name]?name:'dirt',variant=Number(v)||0,key=family+'#'+variant;
    if(!cache.has(key)){
      let top,edge;
      if(loadTexture){
        const set=TILE_SETS[family]||TILE_SETS.dirt;
        top=new T.MeshStandardMaterial({map:tile(set[variant%set.length]),roughness:1});
        edge=new T.MeshStandardMaterial({map:tile(family==='water'?'water-0':family==='sand'?'sand':'dirt'),color:0x8a8078,roughness:1});
      }else{
        const seed=[...family].reduce((a,c)=>a*31+c.charCodeAt(0),7);
        top=new T.MeshStandardMaterial({map:paint(createCanvas,seed,TOPS[family]),roughness:1});
        edge=new T.MeshStandardMaterial({map:side(createCanvas,family,seed+1),roughness:1});
      }
      // BoxGeometry face order: +x, -x, +y (top), -y, +z, -z.
      cache.set(key,[edge,edge,top,edge,edge,edge]);
    }
    return cache.get(key);
  };
}
