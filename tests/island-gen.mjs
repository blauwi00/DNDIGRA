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
// the game's island: the hand-made Заводь district stamped into the north-west corner
{const d=(x,z)=>((x-40)/37)**2+((z-30)/27)**2;
 const g=G.make('helga',300,220,{stamp:{w:80,h:60,cx:40,cz:30,r:42,gate:[78,44],land:(x,z)=>d(x,z)<1,near:(x,z)=>(x>40||z>45)&&d(x,z)<2.4}});
 assert.deepEqual(G.check(g),[],'the stamped island passes the logic check');
 for(let z=0;z<60;z++)for(let x=0;x<80;x++)if(d(x,z)<1)assert.ok(!g.river[z*g.W+x]&&!g.lake[z*g.W+x],'no river or lake inside Заводь');
 for(const p of g.places)if(!p.stamp)assert.ok(Math.hypot(p.x-40,p.z-30)>42,'no other place inside Заводь: '+p.n);
 console.log('stamped island ok');}
// version 1 is frozen: the land, roads and places of the game's island are exactly those of saved version-1 worlds
// (the settlements of a version-1 save are still laid out by the old grid in main.js)
{const {createHash}=await import('node:crypto');const d=(x,z)=>((x-40)/37)**2+((z-30)/27)**2;
 const opt={stamp:{w:80,h:60,cx:40,cz:30,r:42,gate:[78,44],land:(x,z)=>d(x,z)<1,near:(x,z)=>(x>40||z>45)&&d(x,z)<2.4}};
 const hash=g=>{const h=createHash('sha1');for(const k of ['biome','road','river','lake','bridge'])h.update(Buffer.from(g[k]));h.update(Buffer.from(g.height.buffer));h.update(JSON.stringify(g.places.map(p=>[p.type,p.n,p.x,p.z,p.r,p.wealth])));return h.digest('hex');};
 const v1=G.make('helga',300,220,Object.assign({v:1},opt)),v2=G.make('helga',300,220,opt);
 assert.equal(G.VERSION,2,'new worlds use version 2');assert.equal(v1.v,1);assert.equal(v2.v,2);assert.deepEqual(G.check(v2),[],'version 2 island passes the logic check');
 assert.equal(hash(v1),'a2b810cb15be5eabe6e45c1cdd0abe63afac9d30','version 1 island unchanged');
 assert.notEqual(hash(v2),hash(v1),'version 2 rivers meander and roads bend: a new world differs, a saved one does not');
 {let bends=0;for(let z=1;z<v2.H-1;z++)for(let x=1;x<v2.W-1;x++){const i=z*v2.W+x;if(v2.river[i]&&(v2.river[i+1]||v2.river[i-1])&&(v2.river[i+v2.W]||v2.river[i-v2.W]))bends++;}assert.ok(bends>40,'version 2 rivers bend ('+bends+' corners)');}
 // ---- version 2 settlements (settle.js), on a grid built the way main.js builds it ----
 const S=createRequire(import.meta.url)('../beta/island/src/settle.js');
 for(const seed of ['helga','seed-3','seed-7']){const g=seed==='helga'?v2:G.make(seed);const W=g.W,OH=g.H,B=g.B,stampD=seed==='helga'?d:()=>9;
   const grid=[];for(let z=0;z<OH;z++){const r=[];for(let x=0;x<W;x++){const i=z*W+x,b=g.biome[i];
     r.push(x<80&&z<60&&stampD(x,z)<1?'G':g.road[i]?(g.river[i]||b===B.LAKE||b===B.SEA?'P':'D'):b===B.SEA?'~':g.river[i]||b===B.LAKE?'R':b===B.BEACH?'A':b===B.MOUNTAIN?'M':b===B.SNOW?'N':b===B.SWAMP?'B':'G');}grid.push(r);}
   const at=(x,z)=>(grid[z]||[])[x]||'~',set=(x,z,c)=>{if(grid[z]&&grid[z][x]!==undefined)grid[z][x]=c;};
   const run=()=>{const gg=grid.map(r=>r.slice());return S.plan({W,OH,at:(x,z)=>(gg[z]||[])[x]||'~',set:(x,z,c)=>{if(gg[z]&&gg[z][x]!==undefined)gg[z][x]=c;},places:g.places.filter(p=>!p.stamp),hgt:(x,z)=>g.height[z*W+x]});};
   const P=run(),Q=run();
   assert.deepEqual(P.houses.map(h=>[h.type,h.x,h.z,h.w,h.d,h.side]),Q.houses.map(h=>[h.type,h.x,h.z,h.w,h.d,h.side]),seed+': same seed, same towns');
   const H=P.houses;
   for(let a=0;a<H.length;a++){const h=H[a];assert.ok(['S','E','W'].includes(h.side),seed+': no door on the north wall');assert.ok(h.w>=5&&h.d>=5,seed+': a room one can live in');
     for(let b=a+1;b<H.length;b++){const o=H[b],gap=h.annexOf===o||o.annexOf===h?0:1;
       assert.ok(h.x+h.w+gap<=o.x||o.x+o.w+gap<=h.x||h.z+h.d+gap<=o.z||o.z+o.d+gap<=h.z,seed+': buildings do not touch: '+h.name+' and '+o.name);}}
   // no two neighbouring houses exactly alike (size, turn of the ridge and roof together)
   for(let a=1;a<H.length;a++){const h=H[a],o=H[a-1];if(h.roof&&o.roof)assert.ok(!(h.w===o.w&&h.d===o.d&&h.roof===o.roof&&h.alongX===o.alongX&&h.side===o.side),seed+': neighbours differ');}
   const cap=g.places.find(p=>p.type==='capital');
   assert.ok(P.castle,seed+': the capital has its castle');assert.ok(P.walls.length>20,seed+': the capital has a wall');assert.ok(P.gates.filter(t=>!t.pal).length>=2,seed+': gates where roads leave');
   for(const t of ['castle','barracks','armory','treasury','chambers'])assert.ok(H.some(h=>h.type===t),seed+': castle has its '+t);
   const nh=H.filter(h=>h.p===cap&&h.type==='house').length;assert.ok(nh>=(seed==='helga'?4:1),seed+': townsfolk live in the capital ('+nh+')');
   for(const p of g.places.filter(p=>p.type==='village'&&!p.stamp&&!p.poorWhy))
     assert.ok(P.wells.some(w=>Math.hypot(w[0]-p.x,w[1]-p.z)<P.ext.get(p))||g.freshD[p.z*W+p.x]<=6,seed+': '+p.n+' has water');
   assert.ok(H.some(h=>h.type==='gbarn')||seed!=='helga',seed+': farms have barns');
   assert.ok(P.fields.length>200,seed+': fields round the settlements');}
 console.log('settlement layout v2 ok');}
