import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {createWorld,generateScene,sceneIds,normalizeGen} from '../src/worldgen/world.js';
const hashes={small:'18a1394fd61812f81a4ff61f458ac00fab7ecc6e1733dd2d4bde8bd100e54270',large:'d17273f15dbdafd325fabcc35c41bd954378cd40fc9eeeb5e6b6bf40c06ff98c'};
for(const [size,hash]of Object.entries(hashes)){
 const plan=createWorld('legacy-v1-regression',size,1);
 assert.equal(plan.v,1);
 assert.equal(createHash('sha256').update(JSON.stringify(sceneIds(plan).map(id=>generateScene(plan,id)))).digest('hex'),hash);
}
assert.equal(normalizeGen({v:1,seed:'old',size:'small'}).v,1);
assert.equal(createWorld('new','small').v,2);
assert.throws(()=>normalizeGen({v:99}));
console.log('PASS immutable v1 layouts/loot/NPCs and version dispatch');
