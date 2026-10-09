import {randomUUID} from '../src/local-api.js';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as storageRules from '../src/world-api.js';
import {sheet,preset,background,applyLook} from '../src/hero-rules.js';

const elements=new Map();
const node=()=>({hidden:false,classList:{toggle(){},remove(){},add(){}},children:[],append(...children){this.children.push(...children);},replaceChildren(...children){this.children=children;},after(){},close(){},showModal(){},setAttribute(){}});
const document={body:node(),getElementById(id){if(!elements.has(id))elements.set(id,node());return elements.get(id);},createElement:node,querySelectorAll(){return[];},addEventListener(){}};
const hero=sheet({name:'Путник',classId:'fighter',stats:preset('fighter'),appearance:applyLook({},'fighter'),background:background('fighter',()=>0),kit:0},'practice-owner');
const original={id:'original',status:'active',revision:8,snapshot:{world:{id:'original',chapter:2,title:'Старый мир',discovered:['hub']},scene:'hub',party:[hero],active:hero.id,xp:180,gold:90,combat:false,settings:{animations:false},logs:['Исходная хроника'],loot:{claimed:true}}};
let actionBusy=false,loadFailureScene=null,apiOwner=null,allowWrites=false;
const game={state:structuredClone(original.snapshot),active(){return this.state.party[0];},loadWorld(s){env.GeneratedWorlds.restore(s);this.state=structuredClone(s);if(s.scene===loadFailureScene){loadFailureScene=null;throw Error('load failed');}if(s.scene==='region-walk')assert.ok(env.World.scenes[s.scene].collisions,'Register collisions before loading');},render(){},get scene(){return{name:'Практика'};},get moving(){return false;},get actionBusy(){return actionBusy;},get busy(){return actionBusy||env.Worlds.locked;}};
const saved=new Map();let requests=0;
const env={document,structuredClone,crypto,setTimeout,clearTimeout,localStorage:{setItem(k,v){saved.set(k,v);},getItem(k){return saved.get(k)||null;}},gameDebug:game,viewsDebug:{switchTab(){}},LocalAPI:{initialWorld:storageRules.initialWorld,randomUUID},GeneratedWorlds:{prime(r){apiOwner=r.id;},restore(s){apiOwner=s.world?.gen?s.world.id:null;}},CinematicMenu:{play(){},applyPreferences(){}},fetch:async(_url,options)=>{requests++;if(!allowWrites)throw Error('Practice must stay local');const body=JSON.parse(options.body);return{ok:true,json:async()=>({world:{...original,revision:body.revision+1,snapshot:body.snapshot}})};}};env.window=env;
vm.createContext(env);vm.runInContext(readFileSync(new URL('../dist/world.js',import.meta.url),'utf8'),env);vm.runInContext(readFileSync(new URL('../dist/worlds.js',import.meta.url),'utf8'),env);
assert.equal(typeof env.Worlds.startPractice,'function','Menu needs a real isolated practice lifecycle');
assert.equal(typeof env.Worlds.endPractice,'function');
env.Worlds.attach(structuredClone(original));
actionBusy=true;
await assert.rejects(env.Worlds.startPractice(),/Дождитесь/,'An unfinished action cannot enter a new snapshot');
assert.equal(JSON.stringify(game.state),JSON.stringify(original.snapshot));
actionBusy=false;
const entering=env.Worlds.startPractice();
actionBusy=true;
await assert.rejects(entering,/Дождитесь/,'Re-check actions after an awaited save before swapping snapshots');
assert.equal(env.Worlds.practice,false);
actionBusy=false;
await env.Worlds.startPractice();
assert.equal(env.Worlds.practice,true);
assert.notEqual(game.state.world.id,original.id);
assert.equal(game.state.party.length,1);
assert.equal(game.state.tutorial.mode,'practice');
assert.equal(game.state.story.npcDeparted,true);
assert.equal(saved.get('last-world-id'),original.id,'Practice cannot replace resume destination');
game.state.gold+=300;game.state.xp+=500;game.state.party[0].hp=1;
env.Worlds.capture();assert.equal(await env.Worlds.flush(),true);
assert.equal(requests,0,'Training loot and damage cannot reach the saved world');
// A delayed enemy/NPC action keeps the practice snapshot active until it ends.
actionBusy=true;
await assert.rejects(env.Worlds.endPractice(),/Дождитесь/);
assert.equal(env.Worlds.practice,true);
await Promise.resolve().then(()=>{game.state.gold+=1;actionBusy=false;});
await env.Worlds.endPractice();
assert.equal(env.Worlds.practice,false);
assert.equal(JSON.stringify(game.state),JSON.stringify(original.snapshot));
assert.equal(env.Worlds.current.revision,8);
assert.equal(saved.get('last-world-id'),original.id);
assert.equal(requests,0);
await Promise.all([env.Worlds.startPractice(),env.Worlds.startPractice()]);
await env.Worlds.endPractice();
assert.equal(JSON.stringify(game.state),JSON.stringify(original.snapshot),'Concurrent practice entries share the original checkpoint');
console.log('PASS isolated practice preserves hero, resources, world revision and resume destination');
assert.equal(typeof env.Worlds.startRegionWalk,'function','The region menu must use an isolated practice lifecycle');
assert.equal(env.Worlds.practiceKind,null);

const {createRegionWalk}=await import('../src/region-walk.js');env.RegionWalk={createRegionWalk};
for(const blocked of ['action','combat','hud']){
 actionBusy=blocked==='action';game.state.combat=blocked==='combat';env.HUD={pending:blocked==='hud'};
 await assert.rejects(env.Worlds.startRegionWalk(),/Дождитесь/);assert.equal(env.Worlds.practice,false);
}
actionBusy=false;game.state.combat=false;env.HUD.pending=false;
const before=JSON.stringify(game.state),record=env.Worlds.current;
await env.Worlds.startRegionWalk();assert.equal(env.Worlds.practiceKind,'region');
assert.equal(game.state.scene,'region-walk');assert.equal(game.state.party[0].id,hero.id);
for(const field of ['story','tutorial','gen','procedural','episode','encounter'])assert.ok(!Object.hasOwn(game.state,field),'No auto module metadata: '+field);
assert.ok(!game.state.world.gen);assert.equal(apiOwner,null,'Generated API owner is cleared for a static temporary region');
game.state.gold+=15;game.state.potions++;game.state.loot['region-walk:walk-camp-chest']=true;game.state.party[0].hp=1;
env.Worlds.capture();await env.Worlds.flush();assert.equal(requests,0);assert.equal(env.Worlds.pending,null);
const walk=JSON.stringify(game.state);loadFailureScene='hub';
await assert.rejects(env.Worlds.endPractice(),/load failed/);assert.equal(env.Worlds.practiceKind,'region');assert.equal(JSON.stringify(game.state),walk,'Failed return keeps the temporary snapshot recoverable');
await env.Worlds.endPractice();assert.equal(JSON.stringify(game.state),before);assert.equal(env.Worlds.current,record);assert.equal(env.Worlds.practiceKind,null);
assert.ok(!Object.hasOwn(env.World.scenes,'region-walk'),'Temporary scene registration is removed on return');
loadFailureScene='region-walk';await assert.rejects(env.Worlds.startRegionWalk(),/load failed/);
assert.equal(JSON.stringify(game.state),before);assert.equal(env.Worlds.current,record);assert.equal(env.Worlds.practice,false);assert.equal(env.Worlds.pending,null);
env.Worlds.capture();await env.Worlds.flush();assert.equal(requests,0,'Failed loading preserves saved bookkeeping');
// A failed original save blocks entry; a successful retry becomes the checkpoint.
game.state.gold++;env.Worlds.capture();await assert.rejects(env.Worlds.startRegionWalk(),/Сначала сохраните/);assert.equal(env.Worlds.practice,false);
assert.ok(env.Worlds.pending);assert.equal(requests,1);
allowWrites=true;await env.Worlds.startRegionWalk();const savedRecord=env.Worlds.current;
assert.equal(requests,2);game.state.gold+=300;await env.Worlds.endPractice();assert.equal(game.state.gold,original.snapshot.gold+1);assert.equal(env.Worlds.current,savedRecord);
env.Worlds.capture();await env.Worlds.flush();assert.equal(requests,2,'Temporary rewards never become an original save');
console.log('PASS region practice guards, metadata, collisions, failed loads, API ownership and save restoration');
// API-backed original worlds regain their canonical owner after either load path.
const generatedRecord={...original,id:'canonical-world',snapshot:{...original.snapshot,world:{...original.snapshot.world,id:'canonical-world',gen:{v:3,seed:'canonical',size:'small'}}}};
env.Worlds.attach(generatedRecord);assert.equal(apiOwner,'canonical-world');
const generatedBefore=JSON.stringify(game.state),catalogBefore=Object.keys(env.World.scenes).sort();
loadFailureScene='region-walk';await assert.rejects(env.Worlds.startRegionWalk(),/load failed/);
assert.equal(apiOwner,'canonical-world');assert.equal(JSON.stringify(game.state),generatedBefore);assert.deepEqual(Object.keys(env.World.scenes).sort(),catalogBefore);
await env.Worlds.startRegionWalk();assert.equal(apiOwner,null);await env.Worlds.endPractice();assert.equal(apiOwner,'canonical-world');assert.equal(JSON.stringify(game.state),generatedBefore);
assert.deepEqual(Object.keys(env.World.scenes).sort(),catalogBefore);assert.equal(saved.get('last-world-id'),'canonical-world');
// A confirmed hero outside an attached account world also has an exact checkpoint.
env.Worlds.detach();game.state=structuredClone(original.snapshot);delete game.state.world;
const unattachedBefore=JSON.stringify(game.state),resumeBefore=saved.get('last-world-id');
loadFailureScene='region-walk';await assert.rejects(env.Worlds.startRegionWalk(),/load failed/);assert.equal(JSON.stringify(game.state),unattachedBefore);assert.equal(env.Worlds.current,null);
await Promise.all([env.Worlds.startRegionWalk(),env.Worlds.startRegionWalk()]);assert.equal(env.Worlds.practiceKind,'region');await env.Worlds.endPractice();assert.equal(JSON.stringify(game.state),unattachedBefore);assert.equal(env.Worlds.current,null);
assert.equal(saved.get('last-world-id'),resumeBefore);assert.deepEqual(Object.keys(env.World.scenes).sort(),catalogBefore);
console.log('PASS canonical API owner, scene catalog and unattached hero checkpoint restoration');

vm.runInContext(readFileSync(new URL('../dist/menu.js',import.meta.url),'utf8'),env);
env.GameMenu.open();assert.ok(elements.get('modal-body').children.some(n=>n.textContent==='Прогулка по окрестностям'));
await env.Worlds.startRegionWalk();env.GameMenu.open();
const regionMenu=elements.get('modal-body').children;assert.ok(regionMenu.some(n=>n.textContent.includes('не переносятся')));
assert.ok(regionMenu.some(n=>n.textContent==='Вернуться в приключение'));
assert.ok(!regionMenu.some(n=>n.textContent==='Мои герои'),'Account mutation controls stay outside temporary practice');
await regionMenu.find(n=>n.textContent==='Вернуться в приключение').onclick();assert.equal(env.Worlds.practice,false);
await env.Worlds.startPractice();assert.equal(env.Worlds.practiceKind,'tutorial');env.GameMenu.open();assert.ok(elements.get('modal-body').children.some(n=>n.textContent==='Вернуться из практики'),'Existing tutorial controls remain compatible');await env.Worlds.endPractice();
console.log('PASS region menu explanation and return, tutorial menu compatibility');
// Real adapter integration: GET/create carries generated, successful PUT does not.
// Test the canonical request itself; a mock prime cannot prove this ownership.
const WorldGen=await import('../src/worldgen/index.js');
const adapterFailures=[];
for(const savedByPut of [false,true]){
 const meta={v:3,seed:'practice-real-adapter-'+savedByPut,size:'small'};
 const snapshot=storageRules.initialWorld(hero,'real-owner-'+savedByPut,1,{generatorVersion:3,seed:meta.seed,size:meta.size,skipTutorial:true,tutorialCompleted:true});
 const sourcePlan=WorldGen.createWorld(meta.seed,meta.size,meta.v),sourceScene=WorldGen.generateScene(sourcePlan,snapshot.scene);
 // The network JSON shape excludes the pure generator's non-enumerable cache.
 let stored={id:snapshot.world.id,status:'active',revision:1,snapshot:structuredClone(snapshot)};
 const getRecord={...structuredClone(stored),generated:JSON.parse(JSON.stringify({plan:sourcePlan,scene:sourceScene}))};
 const sceneRequests=[],writes=[],localKeys=new Map();let failureScene=null;
 const realGame={state:null,active(){return this.state.party[0];},loadWorld(s){realEnv.GeneratedWorlds.restore(s);this.state=structuredClone(s);if(s.scene===failureScene){failureScene=null;throw Error('real load failed');}},render(){},get scene(){return realEnv.World.scenes[this.state.scene];},get moving(){return false;},get actionBusy(){return false;}};
 const realEnv={window:null,document,structuredClone,crypto,setTimeout,clearTimeout,WorldGen,RegionWalk:{createRegionWalk},LocalAPI:{initialWorld:storageRules.initialWorld,randomUUID},gameDebug:realGame,viewsDebug:{switchTab(){}},CinematicMenu:{play(){},applyPreferences(){}},localStorage:{setItem(k,v){localKeys.set(k,v);},getItem(k){return localKeys.get(k)||null;}},requestIdleCallback(){},fetch:async(path,options)=>{
   if(options?.method==='PUT'){
     const body=JSON.parse(options.body);assert.equal(body.revision,stored.revision);storageRules.validateWorldSnapshot(body.snapshot,stored.snapshot);
     stored={...stored,snapshot:body.snapshot,revision:stored.revision+1};writes.push(path);
     return{ok:true,json:async()=>({world:structuredClone(stored)})};
   }
   sceneRequests.push(path);const id=new URL(path,'https://test.invalid').searchParams.get('id');
   return{ok:true,json:async()=>({scene:JSON.parse(JSON.stringify(WorldGen.generateScene(sourcePlan,id)))})};
 }};realEnv.window=realEnv;vm.createContext(realEnv);
 for(const file of ['world.js','worldgen-adapter.js','worlds.js'])vm.runInContext(readFileSync(new URL('../dist/'+file,import.meta.url),'utf8'),realEnv);
 try{
   realEnv.Worlds.attach(getRecord);
   if(savedByPut){realGame.state.party[0].x++;realEnv.Worlds.capture();assert.equal(await realEnv.Worlds.flush(),true);assert.equal(writes.length,1);assert.ok(!realEnv.Worlds.current.generated,'Use actual successful PUT response shape');}
   const originalText=JSON.stringify(realGame.state),currentRecord=realEnv.Worlds.current,originalPlan=realEnv.GeneratedWorlds.plan,originalCache=originalPlan.cache;
   await realEnv.Worlds.startRegionWalk();await realEnv.Worlds.endPractice();
   assert.equal(JSON.stringify(realGame.state),originalText);assert.equal(realEnv.Worlds.current,currentRecord);
   // Explicit ensure after return must use this original world's scene endpoint.
   const unvisited=Object.keys(sourcePlan.scenes).filter(id=>id!==snapshot.scene);
   await realEnv.GeneratedWorlds.ensure(unvisited[0]);
   assert.equal(sceneRequests.length,1,'Canonical ownership survives practice after '+(savedByPut?'PUT':'GET'));
   assert.equal(sceneRequests[0],'/api/worlds/'+encodeURIComponent(stored.id)+'/scene?id='+encodeURIComponent(unvisited[0]));
   assert.equal(realEnv.GeneratedWorlds.plan,originalPlan,'Restore the original cached plan context');assert.equal(originalPlan.cache,originalCache,'Keep the existing non-configurable cache Map');
   // Repeating entry must not redefine the cache, or fetch an already canonical scene.
   await realEnv.Worlds.startRegionWalk();await realEnv.Worlds.endPractice();await realEnv.GeneratedWorlds.ensure(unvisited[0]);assert.equal(sceneRequests.length,1);
   // A failed return restores the static temporary context; retry uses the same
   // original canonical checkpoint rather than depending on the current payload.
   await realEnv.Worlds.startRegionWalk();const temporaryText=JSON.stringify(realGame.state);
   failureScene=snapshot.scene;await assert.rejects(realEnv.Worlds.endPractice(),/real load failed/);
   assert.equal(realEnv.Worlds.practiceKind,'region');assert.equal(JSON.stringify(realGame.state),temporaryText);assert.equal(realEnv.GeneratedWorlds.plan,null);
   await realEnv.GeneratedWorlds.ensure('hub');assert.equal(sceneRequests.length,1,'Failed return clears temporary API ownership');
   await realEnv.Worlds.endPractice();assert.equal(JSON.stringify(realGame.state),originalText);assert.equal(realEnv.GeneratedWorlds.plan,originalPlan);
   failureScene='region-walk';await assert.rejects(realEnv.Worlds.startRegionWalk(),/real load failed/);assert.equal(realEnv.Worlds.practice,false);assert.equal(JSON.stringify(realGame.state),originalText);
   await realEnv.GeneratedWorlds.ensure(unvisited[1]);assert.equal(sceneRequests.length,2,'Failed entry restores original canonical owner');
   assert.equal(localKeys.get('last-world-id'),stored.id);assert.ok(!Object.hasOwn(realEnv.World.scenes,'region-walk'));
   // prime itself is also safe to repeat on an already installed generated record.
   realEnv.GeneratedWorlds.prime(getRecord);realEnv.GeneratedWorlds.prime(getRecord);assert.equal(getRecord.generated.plan.cache,originalCache);
   const adapterContext=realEnv.GeneratedWorlds.captureContext();
   realEnv.GeneratedWorlds.restoreContext(null);assert.equal(realEnv.GeneratedWorlds.captureContext(),null);assert.equal(realEnv.GeneratedWorlds.plan,null);
   await realEnv.GeneratedWorlds.ensure('hub');assert.equal(sceneRequests.length,2,'Null context safely clears canonical API ownership');
   realEnv.GeneratedWorlds.restoreContext(adapterContext);assert.equal(realEnv.GeneratedWorlds.plan,originalPlan);
 }catch(error){adapterFailures.push({savedByPut,error});}
}
for(const failure of adapterFailures)console.error('Real adapter '+(failure.savedByPut?'PUT':'GET')+': '+failure.error.stack);
assert.equal(adapterFailures.length,0,'Real adapter practice restores both generated GET records and autosaved PUT records');
console.log('PASS real adapter GET/PUT cache, canonical scene requests, repeat return and failed-entry restoration');
