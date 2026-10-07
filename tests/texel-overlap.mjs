import assert from 'node:assert/strict';
import {texelPass} from '../src/texel.js';
let count=0;
for(const role of ['skin','hair','cloth','metal','other']) for(let seed=0;seed<100;seed++) {
 const b=[seed*.017,.5,.1,.46,.42,.4,0x785634+seed,false];
 const decals=texelPass([b],()=>role);
 assert.deepEqual(decals,texelPass([b],()=>role),'Deterministic texture');
 for(let i=0;i<decals.length;i++) for(let j=i+1;j<decals.length;j++) {
  const a=decals[i],b=decals[j];if(a[8]!==b[8])continue;
  const axes=a[8]==='f'?[0,1]:[0,2];
  const overlaps=axes.every(k=>Math.min(a[k]+a[k+3]/2,b[k]+b[k+3]/2)-Math.max(a[k]-a[k+3]/2,b[k]-b[k+3]/2)>1e-9);
  assert.equal(overlaps,false,`${role} seed ${seed}: coplanar decals overlap`);
 }count++;
}
console.log(`PASS ${count} deterministic material textures without overlapping face decals`);

import {build,spec,defaultLook,CLASS_KIND} from '../src/characters.js';
let checked=0;
for(const cls of Object.keys(CLASS_KIND))for(const gender of ['male','female']){
 const boxes=build(spec(CLASS_KIND[cls],{classId:cls,appearance:defaultLook(cls,gender)}));
 for(const d of boxes.filter(b=>b.length>8))for(const b of boxes.filter(b=>b.length===8)){
  const axis=d[8]==='f'?2:1,surface=d[axis]-d[axis+3]/2;
  if(b[axis]+b[axis+3]/2<surface+1e-8)continue;
  assert.equal([0,1,2].every(k=>Math.min(d[k]+d[k+3]/2,b[k]+b[k+3]/2)-Math.max(d[k]-d[k+3]/2,b[k]-b[k+3]/2)>1e-8),false,`${cls} ${gender}: texel intersects a model detail`);
 }
 const base=boxes.filter(b=>b.length===8);
 for(let i=0;i<base.length;i++)for(let j=i+1;j<base.length;j++){
  const a=base[i],b=base[j];if(a[6]===b[6])continue;
  for(let axis=0;axis<3;axis++)for(const sign of [-1,1]){
   if(Math.abs(a[axis]+sign*a[axis+3]/2-b[axis]-sign*b[axis+3]/2)>1e-8)continue;
   assert.equal([0,1,2].filter(k=>k!==axis).every(k=>Math.min(a[k]+a[k+3]/2,b[k]+b[k+3]/2)-Math.max(a[k]-a[k+3]/2,b[k]-b[k+3]/2)>1e-8),false,`${cls} ${gender}: coincident colored model faces`);
  }
 }checked++;
}
console.log(`PASS ${checked} class/gender models: texels do not intersect face or outfit details`);
