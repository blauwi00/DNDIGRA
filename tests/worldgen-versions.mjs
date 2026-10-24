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
const v2hashes={small:'2d7b1eca81244d3267f8c243d08c18c103519690180d40f485137d9b9237f3da',large:'65e7d40c41e2ed7a28769bfdef0253b22ee8863d9dcc546c90059b0b42e63537'};
for(const [size,hash]of Object.entries(v2hashes)){
 const plan=createWorld('legacy-v2-regression',size,2);
 assert.equal(plan.v,2);
 assert.equal(createHash('sha256').update(JSON.stringify(sceneIds(plan).map(id=>generateScene(plan,id)))).digest('hex'),hash);
}
assert.equal(createWorld('new','small').v,3);
assert.throws(()=>normalizeGen({v:99}));
console.log('PASS immutable v1/v2 layouts/loot/NPCs and v3 version dispatch');
