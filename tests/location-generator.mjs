import assert from 'node:assert/strict';
import fs from 'node:fs';import vm from 'node:vm';
import {generate,generateWithRetries,buildCandidate,validateWorld} from '../src/location-generator.js';
import {NPCS} from '../src/characters.js';
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../dist/world.js',import.meta.url),'utf8'),ctx);
function walk(s,start){const blocked=new Set(s.props.filter(p=>p.solid!==false&&p.type!=='door').map(p=>`${p.x},${p.y}`)),seen=new Set([start.join(',')]),q=[start];for(let i=0;i<q.length;i++){const[x,y]=q[i];for(const[dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const p=[x+dx,y+dy],k=p.join(',');if(s.tiles[p[1]]?.[p[0]]==='floor'&&!blocked.has(k)&&!seen.has(k)){seen.add(k);q.push(p);}}}return seen;}
const layouts=new Set();for(let i=0;i<1000;i++){const w=generate('qa-'+i);assert.ok(w.validation.valid);if(i<30)assert.deepEqual(w,generate('qa-'+i));layouts.add(JSON.stringify(w.locations.map(s=>s.tiles)));for(const s of w.locations){for(const start of[s.spawns[0],...Object.values(s.arrivals).map(a=>a[0])]){const seen=walk(s,start);for(const p of s.props.filter(p=>p.type!=='chandelier'))assert.ok([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen.has(`${p.x+dx},${p.y+dy}`)),s.id+'/'+p.id);}for(const p of s.props.filter(p=>p.type==='npc'))assert.ok(NPCS[p.id]);if(i<30)ctx.window.World.compileCollisions(structuredClone(s));}}
assert.ok(layouts.size>100);const base=generate('mutation');function rejects(fn,code){const w=structuredClone(base);fn(w);const r=validateWorld(w);assert.equal(r.valid,false);assert.ok(r.errors.some(e=>e.code===code),JSON.stringify(r.errors));}
rejects(w=>w.locations[0].props[0].destinationEntry='missing','transition-pair');
rejects(w=>{const p=w.locations[1].props.find(p=>p.type==='door');p.axis=p.axis==='horizontal'?'vertical':'horizontal';},'door-wall');
rejects(w=>{const s=w.locations[1],p=s.props.find(p=>p.type==='door');s.props.push({id:'bad',type:'crate',x:p.x,y:p.y});},'object-overlap');
rejects(w=>w.locations[2].origin.x++,'stairs-shaft');
rejects(w=>w.locations[1].props.find(p=>p.id==='innkeeper').roomId='kitchen','object-room');
rejects(w=>w.locations[0].spawns[1]=w.locations[0].spawns[0],'spawn-count');
rejects(w=>w.locations[1].rooms[1].y=1,'room-overlap');
rejects(w=>{const s=w.locations[2],p=s.props.find(p=>p.type==='door');s.tiles[p.y][p.x]='wall';},'unreachable-floor');
rejects(w=>w.locations[2].origin.x+=50,'basement-footprint');
const candidate=(seed,n)=>{const w=buildCandidate(seed,n);if(n<2)w.locations[0].props[0].destinationEntry='broken';return w;};const r=generateWithRetries('retry',candidate);assert.equal(r.attempt,2);assert.deepEqual(r,generateWithRetries('retry',candidate));assert.throws(()=>generateWithRetries('fail',()=>{throw Error('bad');},3),e=>e.rejected.length===3);assert.throws(()=>generate(''));
console.log(JSON.stringify({pass:true,seeds:1000,layouts:layouts.size,mutations:9,retries:true}));
