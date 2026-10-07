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
