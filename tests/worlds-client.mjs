import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
let modalOpens=0;
const elements=new Map();const node=()=>({classList:{toggle(){}},append(){},replaceChildren(){},after(){},showModal(){modalOpens++},close(){}});
const document={body:node(),getElementById(id){if(!elements.has(id))elements.set(id,node());return elements.get(id)},createElement:node,addEventListener(){}};
let stored={id:'world',status:'active',revision:1,snapshot:{world:{chapter:1,title:'Probe',discovered:['hub']},scene:'hub',party:[{hp:5}],episode:{stage:'investigate'}}};
let requests=0;
const game={state:structuredClone(stored.snapshot),loadWorld(s){this.state=structuredClone(s)},render(){},get busy(){return !!env.Worlds?.locked;}};
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

function worldRecord(id, gold = 10) {
  return {id, status: 'active', revision: 1, snapshot: {world: {id, chapter: 1, title: id, discovered: ['hub']}, scene: 'hub', party: [{hp: 5}], gold, potions: 2, combat: false}};
}
function delayedRequests() {
  const requests = [], queue = [], waiting = [];
  env.fetch = (path, options) => new Promise(resolve => {
    const request = {path, method: options.method, body: JSON.parse(options.body), reply(data, ok = true) {resolve({ok, json: async () => structuredClone(data)});}};
    requests.push(request);
    if (waiting.length) waiting.shift()(request); else queue.push(request);
  });
  return {requests, next() {return queue.length ? Promise.resolve(queue.shift()) : new Promise(resolve => waiting.push(resolve));}};
}

// Hold each actual network boundary so a lock cannot be deferred until after
// the first save, and pre-existing property changes must still reach the archive.
const finishA = worldRecord('finish-a');
env.Worlds.attach(structuredClone(finishA));
game.state.gold = 15;
game.state.potions = 3;
env.Worlds.capture();
let network = delayedRequests();
let finishing = env.Worlds.finish();
assert.equal(env.Worlds.locked, true, 'Finish locks actions before its first save drain');
assert.equal(game.busy, true, 'The existing game action guard observes the finish lock');
const saveRequest = await network.next();
assert.equal(saveRequest.method, 'PUT');
assert.equal(saveRequest.body.snapshot.gold, 15);
assert.equal(saveRequest.body.snapshot.potions, 3);
assert.ok(env.Worlds.pending, 'The finish lock must not block capture or discard pending changes');
saveRequest.reply({world: {...finishA, revision: 2, snapshot: saveRequest.body.snapshot}});
let finishRequest = await network.next();
assert.equal(finishRequest.path, '/api/worlds/finish-a/finish');
assert.equal(finishRequest.body.revision, 2);
assert.equal(env.Worlds.locked, true, 'Finish remains locked while the final response is pending');
await env.Worlds.finish();
assert.equal(network.requests.length, 2, 'Repeated finish input does not create a second request');
finishRequest.reply({world: {...finishA, status: 'completed', revision: 3, snapshot: saveRequest.body.snapshot}});
await finishing;
assert.equal(env.Worlds.current.status, 'completed');
assert.equal(env.Worlds.current.snapshot.gold, 15);
assert.equal(env.Worlds.current.snapshot.potions, 3);
assert.equal(game.state.gold, 15);
assert.equal(env.Worlds.pending, null);
env.Worlds.detach();

// A failed first save releases only this finish lock and retains the property
// change for the normal retry path.
env.Worlds.attach(worldRecord('finish-save-error'));
game.state.gold = 7;
env.Worlds.capture();
network = delayedRequests();
finishing = env.Worlds.finish();
const failedSave = await network.next();
failedSave.reply({error: 'Save unavailable'}, false);
await finishing;
assert.equal(env.Worlds.current.status, 'active');
assert.equal(env.Worlds.locked, false);
assert.equal(JSON.parse(env.Worlds.pending).gold, 7);
assert.equal(network.requests.length, 1, 'Failed save never submits finish');
env.Worlds.detach();

// A lifecycle change during the save drain cancels the old finish intent; it
// cannot use world B's ID or revision when the save for A finally returns.
const drainA = worldRecord('drain-a'), drainB = worldRecord('drain-b', 30);
env.Worlds.attach(drainA);
game.state.gold = 9;
env.Worlds.capture();
network = delayedRequests();
finishing = env.Worlds.finish();
const oldSave = await network.next();
env.Worlds.attach(drainB);
oldSave.reply({world: {...drainA, revision: 2, snapshot: oldSave.body.snapshot}});
await finishing;
assert.equal(network.requests.length, 1, 'Late save completion cannot finish the new world');
assert.equal(env.Worlds.current.id, drainB.id);
assert.equal(game.state.gold, 30);
assert.equal(env.Worlds.locked, false);
env.Worlds.detach();

// A completed response from A must leave B's unsaved inventory/resources,
// current record and UI alone.
env.Worlds.attach(worldRecord('late-a'));
network = delayedRequests();
finishing = env.Worlds.finish();
finishRequest = await network.next();
const lateB = worldRecord('late-b', 40);
env.Worlds.attach(lateB);
game.state.gold = 37;
game.state.potions = 1;
env.Worlds.capture();
const pendingB = env.Worlds.pending, beforeLateModal = modalOpens;
finishRequest.reply({world: {...worldRecord('late-a'), status: 'completed', revision: 2}});
await finishing;
assert.equal(env.Worlds.current.id, lateB.id);
assert.equal(env.Worlds.current.status, 'active');
assert.equal(game.state.gold, 37);
assert.equal(game.state.potions, 1);
assert.equal(env.Worlds.pending, pendingB);
assert.equal(env.Worlds.locked, false);
assert.equal(modalOpens, beforeLateModal, 'Stale finish cannot open results over the new world');
env.Worlds.detach();

// A's delayed error/finally must not release B's independently running finish.
env.Worlds.attach(worldRecord('ticket-a'));
network = delayedRequests();
const ticketA = env.Worlds.finish(), requestA = await network.next();
env.Worlds.attach(worldRecord('ticket-b'));
const ticketB = env.Worlds.finish(), requestB = await network.next();
const beforeOldError = modalOpens;
requestA.reply({error: 'Old finish failed'}, false);
await ticketA;
assert.equal(env.Worlds.current.id, 'ticket-b');
assert.equal(env.Worlds.locked, true, 'Old completion cannot unlock the new finish ticket');
assert.equal(modalOpens, beforeOldError, 'Stale errors cannot replace the new UI');
requestB.reply({error: 'Current finish failed'}, false);
await ticketB;
assert.equal(env.Worlds.current.status, 'active');
assert.equal(env.Worlds.locked, false, 'Current failure releases its own finish lock');
env.Worlds.detach();
console.log('PASS finish lock: pre-save capture/drain, duplicate input, retry, lifecycle changes and stale responses preserve hero property');
