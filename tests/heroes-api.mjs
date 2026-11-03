import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';import {readFileSync,readdirSync} from 'node:fs';import worker from '../dist/server/index.js';
// Exercise the Worker against actual SQLite, including the generated migration.
const db=new DatabaseSync(':memory:');for(const f of readdirSync(new URL('../drizzle/',import.meta.url)).filter(f=>f.endsWith('.sql')).sort())db.exec(readFileSync(new URL('../drizzle/'+f,import.meta.url),'utf8'));
const DB={prepare(sql){const statement=db.prepare(sql);return{bind(...params){return{all:async()=>({results:statement.all(...params)}),run:async()=>statement.run(...params)}}}}};
const R=await import('../src/hero-rules.js');
const draft={name:'Тестовый герой',classId:'fighter',stats:R.preset('fighter'),appearance:Object.fromEntries(Object.entries(R.COLORS).map(([k,v])=>[k,v[0]])),kit:0,background:R.background('fighter',()=>0)};draft.appearance.hairStyle='short';draft.appearance.face='soft';
const req=(method,body,owner='player-a',origin='https://game.test')=>new Request('https://game.test/api/heroes',{method,headers:{...(owner?{'oai-authenticated-user-id':owner}:{}),Origin:origin},body:body?JSON.stringify(body):undefined});
assert.equal((await worker.fetch(req('GET',null,null),{DB})).status,401);
for(const id of Object.keys(R.CLASSES)){const response=await worker.fetch(req('POST',{...draft,classId:id,stats:R.preset(id),level:20,gold:100000,hp:999}),{DB});assert.equal(response.status,201);const {hero}=await response.json();assert.equal(hero.level,1);assert.equal(hero.gold,0);assert(hero.hp<20);assert(hero.confirmed);}
assert.equal((await (await worker.fetch(req('GET'),{DB})).json()).heroes.length,4);
assert.equal((await (await worker.fetch(req('GET',null,'player-b'),{DB})).json()).heroes.length,0);
assert.equal((await worker.fetch(req('POST',{...draft,stats:{str:15,dex:15,con:15,int:15,wis:15,cha:15}}),{DB})).status,400);
assert.equal((await worker.fetch(req('POST',draft,'player-a','https://evil.test'),{DB})).status,403);
assert.equal((await worker.fetch(req('PATCH',draft),{DB})).status,405);
const allocated=R.emptyStats();for(const key of ['str','dex','con'])for(let i=0;i<7;i++)assert(R.adjustStat(allocated,key,1));assert.equal(R.pointsUsed(allocated),27);assert.deepEqual(Object.values(allocated),[15,15,15,8,8,8]);assert.equal(R.adjustStat(allocated,'int',1),false);assert.equal(R.adjustStat(allocated,'str',1),false);assert(R.adjustStat(allocated,'str',-1));assert.equal(R.pointsUsed(allocated),25);assert(R.adjustStat(allocated,'int',1));assert(R.adjustStat(allocated,'int',1));assert.equal(R.pointsUsed(allocated),27);
assert.equal((await worker.fetch(req('POST',{...draft,stats:R.emptyStats()}),{DB})).status,400);
assert.equal((await worker.fetch(req('POST',{...draft,stats:{str:15,dex:15,con:15,int:15,wis:8,cha:8}}),{DB})).status,400);
assert.equal((await worker.fetch(req('POST',{...draft,stats:{str:'15',dex:14,con:13,int:12,wis:10,cha:8}}),{DB})).status,400);
assert.equal((await worker.fetch(req('POST',{...draft,stats:{str:15.1,dex:14,con:13,int:12,wis:10,cha:8}}),{DB})).status,400);
console.log('PASS: 27-point budget, three 15 scores exhaust budget, incremental costs, refunds, out-of-range/forged/unspent scores rejected.');
let path;await worker.fetch(new Request('https://game.test/'),{ASSETS:{fetch:async r=>{path=new URL(r.url).pathname;return new Response('ok')}}});assert.equal(path,'/');
console.log('PASS: real SQLite migration, four classes, immutable records, per-owner isolation, forged power rejected, origin validation and static serving.');

for(const gender of ["male","female"]){const response=await worker.fetch(req("POST",{...draft,appearance:{...draft.appearance,gender}},"gender-"+gender),{DB});assert.equal(response.status,201);const saved=await response.json();assert.equal(saved.hero.appearance.gender,gender);}
assert.equal((await worker.fetch(req("POST",{...draft,appearance:{...draft.appearance,gender:"invalid"}},"gender-invalid"),{DB})).status,400);
console.log("PASS male/female persistence and invalid gender rejection");

const colorful={...draft,appearance:{...draft.appearance,gender:'male',...Object.fromEntries(Object.entries(R.COLORS).map(([k,v])=>[k,v.at(-1)]))}};
const newColorResponse=await worker.fetch(req('POST',colorful,'new-colors'),{DB});assert.equal(newColorResponse.status,201);assert.deepEqual((await newColorResponse.json()).hero.appearance,colorful.appearance);
assert.deepEqual((await (await worker.fetch(req('GET',null,'new-colors'),{DB})).json()).heroes[0].appearance,colorful.appearance);
console.log('PASS expanded colors persist through create and reload');

const {defaultLook}=await import('../src/look-options.js');
const extended={...draft,classId:'wizard',stats:R.preset('wizard'),appearance:{...defaultLook('wizard','male'),headgear:'wizhat',hairStyle:'braid',beard:'long',marks:['scar','freckles'],accessories:['glasses','amulet'],cape:'long',hair2:'#e07aa8',outfit:'scholar'},kit:0};
const extendedPost=await worker.fetch(req('POST',extended,'full-editor'),{DB});assert.equal(extendedPost.status,201);assert.deepEqual((await extendedPost.json()).hero.appearance,extended.appearance);
assert.deepEqual((await (await worker.fetch(req('GET',null,'full-editor'),{DB})).json()).heroes[0].appearance,extended.appearance);
for(const patch of [{headgear:'invalid'},{hairStyle:'invalid'},{accessories:['glasses','glasses']},{outfit:'plate'},{power:99}])assert.equal((await worker.fetch(req('POST',{...extended,appearance:{...extended.appearance,...patch}},'forged-full'),{DB})).status,400);
console.log('PASS full appearance persists and forged accessories/outfits/styles rejected');
