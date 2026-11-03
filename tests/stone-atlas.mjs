import assert from 'node:assert/strict';
import * as T from 'three';
import {stoneTile, atlasRegion, createStoneMaterials} from '../src/stone-atlas.js';

for(const surface of ['cobble','flagstone','stone','stone_dark','moss','cracked','wet']) {
  const tile=stoneTile({surface},3,7);
  assert.ok(tile>=0&&tile<8);
  assert.equal(tile,stoneTile({surface},3,7));
}
for(const surface of ['grass','dirt','planks','planks_dark','tiles','carpet','straw','sand','leaves','gravel'])
  assert.equal(stoneTile({surface},2,4),null);
assert.equal(stoneTile({grass:true},2,4),null);
assert.equal(stoneTile({outdoor:true},2,4),null);
assert.equal(stoneTile({id:'proc-tavern'},2,4),null);
assert.ok(stoneTile({},2,4)<8);
for(const wallStyle of ['stone','rough','cave','castle',undefined]) assert.ok(stoneTile({wall:true,wallStyle},2,4)>=8);
for(const wallStyle of ['timber','plaster','brick']) assert.equal(stoneTile({wall:true,wallStyle},2,4),null);
for(let i=0;i<12;i++) {
  const {x,y,w,h}=atlasRegion(i);
  assert.ok(x>(i%4)/4&&x+w<(i%4+1)/4);
  const row=Math.floor(i/4);
  assert.ok(y>1-(row+1)/3&&y+h<1-row/3);
}
let loaded,failed,loads=0;
const materials=createStoneMaterials({load(url,onLoad,onProgress,onError){
  assert.equal(url,'assets/terrain-materials.png'); loads++; loaded=onLoad; failed=onError;
}});
const material=materials(0);
assert.equal(material.isMeshStandardMaterial,true);
assert.equal(material.transparent,false);
assert.equal(material.map,null,'opaque fallback until image is ready');
assert.equal(material,materials(0));
failed();
assert.equal(material.map,null,'load failure keeps visible fallback');
loaded(new T.Texture({width:1448,height:1086}));
assert.equal(material.map.colorSpace,T.SRGBColorSpace);
assert.equal(material.color.getHex(),0xffffff,'do not multiply atlas by the old dark floor tint');
assert.ok(materials(11).map);
assert.equal(materials(11).map.source,material.map.source,'all variants share the image');
assert.equal(loads,1);
console.log('stone atlas: selection, bounded UVs, lighting, caching and load fallback passed');
