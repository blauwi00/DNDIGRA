import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
// The island generator follows the approved settlement model: every place has a cause,
// water, a road to the rest of the island, and no two places share ground.
const G=createRequire(import.meta.url)('../beta/island/src/islandgen.js');
const a=G.make('helga'),b=G.make('helga');
assert.equal(a.places.length,b.places.length,'same seed, same places');
assert.deepEqual(a.places.map(p=>[p.type,p.x,p.z]),b.places.map(p=>[p.type,p.x,p.z]),'same seed, same island');
assert.ok(Buffer.compare(Buffer.from(a.road),Buffer.from(b.road))===0,'same seed, same roads');
assert.notDeepEqual(G.make('другой').places.map(p=>[p.x,p.z]),a.places.map(p=>[p.x,p.z]),'another seed, another island');
let slow=0;
for(let k=0;k<24;k++){const t=Date.now(),g=G.make('seed-'+k);slow=Math.max(slow,Date.now()-t);
  assert.deepEqual(G.check(g),[],'seed-'+k+' passes the logic check');
  const cap=g.places.find(p=>p.type==='capital');assert.ok(cap.port,'the capital has a port');
  for(const p of g.places)if(p.type==='bandits')assert.ok(g.places.filter(v=>v.type==='village').every(v=>Math.hypot(v.x-p.x,v.z-p.z)>22),'camps stay out of village patrols');
  const poor=g.places.find(p=>p.poorWhy);assert.ok(poor.wealth<=1,'the poor settlement is poor');}
console.log('island generator ok · slowest island '+slow+' ms');
