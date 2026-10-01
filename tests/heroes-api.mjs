import assert from 'node:assert/strict';import {DatabaseSync} from 'node:sqlite';import {readFileSync} from 'node:fs';import worker from '../dist/server/index.js';
// Exercise the Worker against actual SQLite, including the generated migration.
const db=new DatabaseSync(':memory:');db.exec(readFileSync(new URL('../drizzle/0000_cuddly_riptide.sql',import.meta.url),'utf8'));
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
let path;await worker.fetch(new Request('https://game.test/'),{ASSETS:{fetch:async r=>{path=new URL(r.url).pathname;return new Response('ok')}}});assert.equal(path,'/');
console.log('PASS: real SQLite migration, four classes, immutable records, per-owner isolation, forged power rejected, origin validation and static serving.');
