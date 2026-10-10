import * as T from 'three';

const STONE=new Set(['cobble','flagstone','stone','stone_dark','moss','cracked','wet']);
const WALL=new Set(['stone','rough','cave','castle']);
export function stoneTile({surface,wall=false,wallStyle,grass=false,outdoor=false,id},x,y) {
  const n=(Math.imul(x,73856093)^Math.imul(y,19349663))>>>0;
  if(wall) return !wallStyle||WALL.has(wallStyle) ? 8+n%4 : null;
  if(surface&&!STONE.has(surface)) return null;
  if(!surface&&(grass||outdoor||id==='proc-tavern')) return null;
  if(surface==='moss') return n%2?3:5;
  if(surface==='cracked') return [0,2,4,6][n%4];
  return [0,1,2,4,6,7][n%6];
}

// Image rows run downwards; Three texture offsets run upwards. Inset each
// region to exclude neighbouring tiles. Wall crops use mineral grain inside
// the upper face, not the atlas's illustrated bevel / horizontal face seam.
export function atlasRegion(tile) {
  const row=Math.floor(tile/4),col=tile%4;
  const left=tile<8?.015:.08,top=tile<8?.015:.08;
  const w=tile<8?.97:.84,h=tile<8?.97:.40;
  return {x:(col+left)/4,y:1-(row+top+h)/3,w:w/4,h:h/3};
}

export function createStoneMaterials(loader=new T.TextureLoader()) {
  const cache=new Map(); let atlas,requested=false;
  function apply(material,tile) {
    const map=atlas.clone(),r=atlasRegion(tile);
    map.colorSpace=T.SRGBColorSpace;
    map.wrapS=map.wrapT=T.ClampToEdgeWrapping;
    map.magFilter=T.LinearFilter;
    // No whole-atlas mipmaps: distant texels must never sample other tiles.
    map.minFilter=T.LinearFilter; map.generateMipmaps=false;
    map.offset.set(r.x,r.y); map.repeat.set(r.w,r.h); map.needsUpdate=true;
    material.map=map; material.color.setHex(0xffffff); material.needsUpdate=true;
  }
  return tile=>{
    if(!cache.has(tile)) {
      const material=new T.MeshStandardMaterial({color:tile<8?0x71777b:0xb5aa93,roughness:1});
      cache.set(tile,material);
      if(atlas) apply(material,tile);
    }
    if(!requested) {
      requested=true;
      loader.load('assets/terrain-materials.png',texture=>{
        atlas=texture;
        for(const [index,material] of cache) apply(material,index);
      },undefined,()=>{ /* Keep the opaque fallback; terrain remains playable. */ });
    }
    return cache.get(tile);
  };
}
