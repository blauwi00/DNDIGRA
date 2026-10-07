import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
let modalOpens=0;
const elements=new Map();const node=()=>({classList:{toggle(){}},append(){},replaceChildren(){},after(){},showModal(){modalOpens++},close(){}});
const document={body:node(),getElementById(id){if(!elements.has(id))elements.set(id,node());return elements.get(id)},createElement:node,addEventListener(){}};
let stored={id:'world',status:'active',revision:1,snapshot:{world:{chapter:1,title:'Probe',discovered:['hub']},scene:'hub',party:[{hp:5}],episode:{stage:'investigate'}}};
let requests=0;
const game={state:structuredClone(stored.snapshot),loadWorld(s){this.state=structuredClone(s)},render(){}};
const env={document,structuredClone,localStorage:{setItem(){}},setTimeout,clearTimeout,gameDebug:game,viewsDebug:{switchTab(){}},fetch:async(path,opts)=>{requests++;await new Promise(r=>setTimeout(r,15));const body=JSON.parse(opts.body);if(body.revision!==stored.revision)return{ok:false,json:async()=>({conflict:true,error:'Conflict'})};stored={...stored,revision:stored.revision+1,snapshot:body.snapshot};return{ok:true,json:async()=>({world:structuredClone(stored)})}}};env.window=env;
vm.createContext(env);vm.runInContext(readFileSync(new URL('../dist/worlds.js',import.meta.url),'utf8'),env);
env.Worlds.attach(structuredClone(stored));game.state.party[0].hp=4;env.Worlds.capture();const first=env.Worlds.flush();game.state.party[0].hp=3;env.Worlds.capture();const second=env.Worlds.flush(),third=env.Worlds.flush();assert.deepEqual(await Promise.all([first,second,third]),[true,true,true]);assert.equal(requests,2);assert.equal(stored.snapshot.party[0].hp,3);assert.equal(env.Worlds.current.revision,3);assert.equal(env.Worlds.locked,false);assert.equal(env.Worlds.pending,null);env.Worlds.detach();console.log('PASS: overlapping autosaves share one ordered drain; newest state persists without false revision conflict or lost controls.');

// A background save failure must preserve the scene/dialogue and pending state.
env.Worlds.attach(structuredClone(stored));
env.fetch=async()=>({ok:false,json:async()=>({error:'Сервер временно недоступен'})});
game.state.party[0].hp=2;env.Worlds.capture();
assert.equal(await env.Worlds.flush(),false);
assert.equal(modalOpens,0,'Autosave never opens a menu');
assert.equal(env.Worlds.locked,false,'Transient errors do not lock movement');
assert.ok(env.Worlds.pending,'Unsaved changes remain pending');
env.fetch=async(path,opts)=>{const body=JSON.parse(opts.body);stored={...stored,revision:stored.revision+1,snapshot:body.snapshot};return{ok:true,json:async()=>({world:structuredClone(stored)})};};
assert.equal(await env.Worlds.flush(),true);assert.equal(stored.snapshot.party[0].hp,2);assert.equal(env.Worlds.pending,null);
env.fetch=async()=>({ok:false,json:async()=>({conflict:true,error:'Conflict'})});
game.state.party[0].hp=1;env.Worlds.capture();assert.equal(await env.Worlds.flush(),false);assert.equal(modalOpens,0);assert.equal(env.Worlds.locked,true,'Revision conflicts remain protected');env.Worlds.detach();
console.log('PASS background errors: no modal, retained changes, retry succeeds, revision conflict protected');
