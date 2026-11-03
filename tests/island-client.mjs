import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {test} from 'node:test';
import * as InventoryRules from '../src/inventory-rules.js';
import {initialWorld,validateWorldSnapshot} from '../src/world-api.js';
import {sheet,preset,background} from '../src/hero-rules.js';
import {defaultLook} from '../src/look-options.js';
import {createWorld,generateScene} from '../src/worldgen/world.js';
import {tileAt} from '../src/islands/scene.js';

const worldSource=readFileSync(new URL('../dist/world.js',import.meta.url),'utf8');
const gameSource=readFileSync(new URL('../dist/game.js',import.meta.url),'utf8');
const directions=[[0,-1],[1,0],[0,1],[-1,0]];
function worldEnvironment(){const env={};env.window=env;vm.createContext(env);vm.runInContext(worldSource,env);return env;}
function referencePath(s,start,end,passable){
  const q=[start],seen=new Map([[start.x+','+start.y,null]]);
  for(let i=0;i<q.length;i++){
    const p=q[i];if(p.x===end.x&&p.y===end.y){let key=p.x+','+p.y,n=0;while(seen.get(key)!==null){key=seen.get(key);n++;}return n;}
    for(const [dx,dy]of directions){const next={x:p.x+dx,y:p.y+dy},key=next.x+','+next.y;if(next.x<0||next.y<0||next.x>=s.W||next.y>=s.H||seen.has(key)||!passable(next))continue;seen.set(key,p.x+','+p.y);q.push(next);}
  }
  return null;
}

test('compact tiles use the shared sampler and fail closed until it loads',()=>{
  const env=worldEnvironment(),s={island:{},W:1040,H:1040};
  assert.equal(env.World.tile(s,80,80),'void');
  const calls=[];env.WorldGen={tileAt(scene,x,y){calls.push([scene,x,y]);return x===80?'floor':'water';}};
  assert.equal(env.World.tile(s,80,80),'floor');assert.equal(env.World.tile(s,81,80),'water');
  assert.equal(calls.length,2);assert.equal(calls[0][0],s);
  assert.equal(env.World.tile(env.World.scenes.hub,5,9),'floor','Legacy floor remains unchanged');
});

test('predecessor search returns shortest routes around obstacles and occupied cells',()=>{
  const {World}=worldEnvironment(),s={W:18,H:16};
  assert.equal(typeof World.shortestPath,'function');
  const solid=new Set();for(let y=0;y<13;y++)solid.add('8,'+y);for(let x=2;x<8;x++)solid.add(x+',8');solid.add('4,3');
  const passable=p=>!solid.has(p.x+','+p.y);
  for(const start of [{x:1,y:1},{x:14,y:2},{x:3,y:14}])for(const end of [{x:14,y:1},{x:2,y:12},{x:10,y:15}]){
    const route=World.shortestPath(s,start,end,passable,{maxVisited:512,maxSteps:300});
    assert.equal(route?.length,referencePath(s,start,end,passable));
    let previous=start;for(const p of route){assert.equal(Math.abs(p.x-previous.x)+Math.abs(p.y-previous.y),1);assert.ok(passable(p));previous=p;}
    assert.equal(previous.x,end.x);assert.equal(previous.y,end.y);
  }
  assert.equal(World.shortestPath(s,{x:1,y:1},{x:8,y:2},passable),null);
});

test('large-island search visits bounded state and does not sacrifice shortest combat routes',()=>{
  const {World}=worldEnvironment(),s={W:1040,H:1040};let probes=0;
  const passable=p=>{probes++;return !(p.x===500&&p.y<1039);};
  assert.equal(World.shortestPath(s,{x:495,y:20},{x:505,y:20},passable,{maxVisited:1024,maxSteps:2200}),null);
  assert.ok(probes<5000,'Failed search never floods a million-cell island');
  probes=0;
  const local=World.shortestPath(s,{x:600,y:600},{x:606,y:600},p=>{probes++;return true;});
  assert.equal(local.length,6);assert.ok(probes<40,'A six-cell combat route remains six cells');
  const far=World.shortestPath(s,{x:100,y:100},{x:900,y:900},()=>true);
  assert.equal(far.length,1600,'Ordinary long open routes do not allocate the whole island');
});

function gameEnvironment(){
  const env=worldEnvironment(),elements=new Map(),canvases=[];
  const noop=()=>{};
  function node(tag='div'){
    const queries=new Map();
    const item={tag,children:[],dataset:{},style:{setProperty:noop},classList:{add:noop,remove:noop,toggle:noop},hidden:false,offsetWidth:640,offsetHeight:360,textContent:'',setAttribute:noop,addEventListener:noop,showModal(){this.open=true;},close(){this.open=false;},querySelector(selector){if(!queries.has(selector))queries.set(selector,node());return queries.get(selector);},append(...children){this.children.push(...children);for(const child of children)child.parent=this;},replaceChildren(...children){this.children=children;},remove(){this.parent?.children.splice(this.parent.children.indexOf(this),1);},get firstChild(){return this.children[0];},getContext(){return new Proxy({},{get:(o,key)=>o[key]??noop,set:(o,key,value)=>(o[key]=value,true)});}};
    if(tag==='canvas')canvases.push(item);return item;
  }
  const document={body:node(),createElement:node,getElementById(id){if(!elements.has(id))elements.set(id,node(id==='terrain'?'canvas':'div'));return elements.get(id);}};
  for(const id of ['cells','objects','pieces','terrain','board'])document.getElementById(id);
  Object.assign(env,{document,Image:class{},localStorage:{getItem:()=>null,setItem:noop},crypto:{getRandomValues:a=>{a[0]=5;return a;}},structuredClone,queueMicrotask,CustomEvent:class{},dispatchEvent:noop,setTimeout,clearTimeout,ResizeObserver:class{observe(){}},matchMedia:()=>({matches:false}),DND:{init(p){p.hands=[];p.stats={};return p;},weapon:()=>({range:1,name:'Меч'})},Torches:{ensure:noop,canAttack:()=>true,labels:{},fixture:()=>({present:true})}});
  // Execute the real controller and exports. Browser boot is root's separate
  // check; this VM isolates resource allocation when loadWorld changes scenes.
  const boot=gameSource.lastIndexOf('  window.Torches?.ensure();');
  assert.ok(boot>0);vm.runInContext(gameSource.slice(0,boot)+'})();',env);
  return {env,elements,canvases};
}

test('loading a maximum compact island allocates no map DOM or area-sized fallback',()=>{
  const {env,elements}=gameEnvironment(),s={id:'island',name:'Остров',W:1040,H:1040,island:{},props:[{id:'rock',type:'cover',kind:19,name:'Камень',x:8,y:8}],decor:[],lights:[],spawns:[[5,5],[6,5],[5,6]],trainingSpawn:[],enemySpawn:[],dummies:[],occupied:new Map()};
  env.World.scenes.island=s;env.WorldGen={tileAt:(_s,x,y)=>x>0&&y>0&&x<1039&&y<1039?'floor':'water'};
  const snapshot=structuredClone(env.gameDebug.state);snapshot.scene='island';snapshot.party=snapshot.party.slice(0,1);snapshot.active=snapshot.party[0].id;snapshot.party[0].x=5;snapshot.party[0].y=5;
  let terrainProbes=0;env.drawTerrainTile=()=>terrainProbes++;
  env.gameDebug.loadWorld(snapshot);
  assert.equal(elements.get('cells').children.length,0);
  assert.equal(elements.get('objects').children.length,0);
  assert.equal(elements.get('pieces').children.length,0);
  assert.ok(elements.get('terrain').width<=1024&&elements.get('terrain').height<=512);
  assert.equal(terrainProbes,0,'The loading frame never traverses island terrain');
  assert.equal(env.gameDebug.pathTo(env.gameDebug.active(),{x:0,y:5}),null,'Ocean is blocked');
  assert.equal(env.gameDebug.pathTo(env.gameDebug.active(),{x:8,y:8}),null,'Solid props remain blocked');
  assert.equal(env.gameDebug.pathTo(env.gameDebug.active(),{x:9,y:5}).length,4);
  env.voxel={ready:true,sync(){},reset(){},portrait(){return null;}};env.gameDebug.render();
  assert.equal(elements.get('objects').children.length,0,'WebGL does not maintain hidden fallback props');
  assert.equal(elements.get('pieces').children.length,0,'WebGL does not maintain hidden fallback actors');
});

test('legacy scenes still create their keyboard/click grid',()=>{
  const {env,elements}=gameEnvironment();env.drawTerrainTile=()=>{};env.drawWallTile=()=>{};
  const snapshot=structuredClone(env.gameDebug.state);snapshot.party=snapshot.party.slice(0,1);snapshot.active=snapshot.party[0].id;
  env.gameDebug.loadWorld(snapshot);
  assert.equal(elements.get('cells').children.length,env.World.scenes.hub.W*env.World.scenes.hub.H);
  assert.ok(elements.get('objects').children.length>0);assert.equal(elements.get('pieces').children.length,env.gameDebug.all().length);
});

test('compact search retains solid furniture, loot, visibility and door combat rules',()=>{
  const {env}=gameEnvironment(),s={id:'island',name:'Остров',generated:true,W:1040,H:1040,island:{},props:[
    {id:'door',type:'door',kind:26,name:'Дверь',x:6,y:5},
    {id:'hidden',type:'cover',kind:19,name:'Исчезнувший след',x:7,y:5},
    {id:'chest',type:'chest',kind:17,name:'Сундук',x:8,y:5},
  ],decor:[{kind:'bench',x:7,y:6}],lights:[],spawns:[[5,5],[5,4],[4,5]],trainingSpawn:[],enemySpawn:[],dummies:[]};
  env.World.scenes.island=s;env.WorldGen={tileAt:(_s,x,y)=>x>0&&y>0&&x<1039&&y<1039?'floor':'water'};env.World.compileCollisions(s);
  env.Adventure={visibleProp:p=>p.id!=='hidden',render(){},restore(){}};
  const snapshot=structuredClone(env.gameDebug.state);snapshot.scene='island';snapshot.party=snapshot.party.slice(0,1);snapshot.active=snapshot.party[0].id;snapshot.party[0].x=5;snapshot.party[0].y=5;snapshot.loot={'island:chest':true};
  env.gameDebug.loadWorld(snapshot);
  const hero=env.gameDebug.active();assert.equal(env.gameDebug.pathTo(hero,{x:9,y:5}).length,4,'Hidden and looted props free their cells; unlocked door can open while exploring');
  assert.equal(env.gameDebug.pathTo(hero,{x:7,y:6}),null,'Solid decor remains impassable');
  env.gameDebug.state.combat=true;
  const route=env.gameDebug.pathTo(hero,{x:9,y:5});assert.equal(route.length,6);assert.ok(route.every(p=>p.x!==6||p.y!==5),'A closed door never opens automatically during combat');
  env.gameDebug.state.doors['island:door']=true;assert.equal(env.gameDebug.pathTo(hero,{x:9,y:5}).length,4,'An already open door remains walkable in combat');
  env.gameDebug.state.party.push({id:'ally',kind:0,hp:10,x:7,y:5});assert.equal(env.gameDebug.pathTo(hero,{x:7,y:5}),null,'Actors retain collision');
});

test('recovering consciousness on v4 resumes the same encounter without healing or respawning',async()=>{
  const {env}=gameEnvironment();
  for(const [version,hp,resumed]of [[4,1,true],[4,0,false],[3,1,true],[2,1,false]]){
    const snapshot=structuredClone(env.gameDebug.state);snapshot.scene='hub';snapshot.party=snapshot.party.slice(0,1);snapshot.party[0].hp=hp;snapshot.active=snapshot.party[0].id;
    snapshot.world={gen:{v:version}};snapshot.encounter={id:'ordinary-threat',scene:'hub',tutorial:false};snapshot.combat=false;snapshot.order=[snapshot.active];snapshot.cursor=0;
    snapshot.enemies=[{id:'saved-foe',kind:3,name:'Налётчик',hp:3,max:10,x:14,y:7,facing:2}];
    env.gameDebug.loadWorld(snapshot);await Promise.resolve();
    assert.equal(env.gameDebug.state.combat,resumed);assert.equal(env.gameDebug.active().hp,hp);assert.equal(env.gameDebug.state.enemies.length,1);assert.equal(env.gameDebug.state.enemies[0].hp,3);
  }
});

test('island messenger arrives and departs along real cells without a portal',async()=>{
  const {env}=gameEnvironment(),messenger={id:'messenger',type:'npc',kind:20,name:'Вестник',x:10,y:10,departure:[16,10]},s={id:'island',name:'Остров',W:1040,H:1040,island:{},props:[messenger],decor:[],lights:[],spawns:[[5,5],[6,5],[5,6]],trainingSpawn:[],enemySpawn:[],dummies:[]};
  env.World.scenes.island=s;env.WorldGen={tileAt:(_s,x,y)=>x>0&&y>0&&x<1039&&y<1039?'floor':'water'};env.World.compileCollisions(s);
  const snapshot=structuredClone(env.gameDebug.state);snapshot.scene='island';snapshot.party=snapshot.party.slice(0,1);snapshot.active=snapshot.party[0].id;snapshot.party[0].x=5;snapshot.party[0].y=5;snapshot.settings.animations=false;
  const moves=[];env.voxel={ready:true,models:new Map(),sync(){},reset(){},portrait(){return null;},move(id,from,to){moves.push({id,from,to:{...to}});}};
  env.gameDebug.loadWorld(snapshot);
  assert.equal(await env.gameDebug.departNpc(messenger),true);
  assert.equal(moves.length,6);assert.equal(moves.at(-1).to.x,16);assert.equal(moves.at(-1).to.y,10);
  for(const step of moves){assert.equal(step.id,'prop:messenger');assert.equal(Math.abs(step.from.x-step.to.x)+Math.abs(step.from.y-step.to.y),1);}
  moves.length=0;assert.equal(await env.gameDebug.arriveNpc(messenger),true);
  assert.equal(moves.length,6);assert.equal(moves[0].from.x,16);assert.equal(moves.at(-1).to.x,10);assert.equal(env.gameDebug.departingNpc,null);
});

test('compact scene entry uses explicit arrivals or safe spawns without a full-area search',()=>{
  const {env}=gameEnvironment(),entry={id:'entry',type:'portal',kind:26,name:'Вход',x:900,y:900,destination:'hub'},s={id:'island',name:'Остров',generated:true,W:1040,H:1040,island:{},props:[entry],decor:[],lights:[],spawns:[[5,5],[6,5],[5,6]],trainingSpawn:[],enemySpawn:[],dummies:[],occupied:new Map(),arrivals:{entry:[[900,901],[899,901],[901,901]]}};
  env.World.scenes.island=s;let probes=0;env.WorldGen={tileAt:()=>{probes++;return 'floor';}};
  env.gameDebug.enterScene('island',true,'entry');
  assert.equal(env.gameDebug.active().x,900);assert.equal(env.gameDebug.active().y,901);assert.ok(probes<100);
  env.gameDebug.enterScene('hub');delete s.arrivals;probes=0;env.gameDebug.enterScene('island',true,'entry');
  assert.equal(env.gameDebug.active().x,5);assert.equal(env.gameDebug.active().y,5);assert.ok(probes<100,'Missing entry never scans or sorts a million cells');
});

test('discarding an item searches only nearby cells with the existing tie order',()=>{
  for(const position of [{x:500,y:500},{x:0,y:0}]){
    const actor={...position,hands:[],inventory:[]},state={combat:false,potions:2,drops:[]},messages=[];let probes=0;
    const game={state,scene:{id:'island',island:{},W:1040,H:1040},active:()=>actor,props:[],all:()=>[actor],blocked(p){if(++probes>25)throw Error('Drop scanned beyond its local radius');return p.x===position.x&&p.y===position.y-1;},tell:s=>messages.push(s),save(){},render(){}};
    const env={gameDebug:game,InventoryRules,LocalAPI:{randomUUID:()=> 'fixed'},document:{getElementById:()=>null}};env.window=env;
    vm.runInNewContext(readFileSync(new URL('../dist/inventory.js',import.meta.url),'utf8'),env);
    env.Inventory.drop({id:'potion'});
    assert.equal(state.potions,1);assert.equal(state.drops.length,1);assert.ok(probes<=13);
    const expected=position.x===0?{x:1,y:0}:{x:499,y:500};assert.equal(state.drops[0].x,expected.x);assert.equal(state.drops[0].y,expected.y);
    assert.equal(messages.length,1);
  }
});

test('legacy lighting never scans compact island cells, including periodic redraws',()=>{
  const {env,elements}=gameEnvironment(),frames=[];env.requestAnimationFrame=f=>frames.push(f);
  vm.runInContext(readFileSync(new URL('../dist/lighting.js',import.meta.url),'utf8'),env);
  const legacy=env.World.scenes.hub;env.World.scenes.hub={id:'island',W:1040,H:1040,island:{},lights:[],decor:[],props:[]};let probes=0;
  env.World.tile=()=>{if(++probes>16)throw Error('Fallback lighting scanned island');return 'floor';};
  env.lightingDebug.render();frames.shift()(100);assert.equal(probes,0);assert.equal(elements.get('lighting').hidden,true);
  assert.equal(env.lightingDebug.wallSegments(env.gameDebug.scene).length,0);
  env.World.scenes.hub={...legacy,W:1,H:1,lights:[],props:[],decor:[]};probes=0;env.lightingDebug.render();
  assert.equal(elements.get('lighting').hidden,false,'Returning to legacy restores its lighting overlay');assert.ok(probes>0);
});

function islandPersistenceFixture({failWrites=0,defeated=false}={}){
  const {env,elements}=gameEnvironment(),hero=sheet({name:'Путник',classId:'wizard',stats:preset('wizard'),kit:0,background:background('wizard',()=>0),appearance:defaultLook('wizard')},'checkpoint-hero');
  const snapshot=initialWorld(hero,'checkpoint-world',1,{generatorVersion:4,seed:'island-api-small',size:'small'}),plan=createWorld(snapshot.world.gen.seed,'small',4),scene=generateScene(plan,'island');
  Object.assign(snapshot.story,{intro:3,npcWarned:true,npcDeparted:true,cleared:defeated?[]:['road-threat']});snapshot.settings.animations=false;
  const settlement=scene.landmarks.find(p=>p.id==='settlement');Object.assign(snapshot.party[0],{x:settlement.x-15,y:settlement.y});
  if(defeated){
    const encounter=scene.encounters.find(p=>p.id==='road-threat');snapshot.encounter={id:encounter.id,scene:scene.id,name:encounter.name,tutorial:false,scriptedLoss:false,reward:encounter.reward};
    snapshot.enemies=encounter.enemies.map(e=>({...e,hp:Math.max(1,e.max-2),facing:0,move:6,conditions:[]}));snapshot.order=[snapshot.active,...snapshot.enemies.map(e=>e.id)];snapshot.party[0].hp=0;snapshot.party[0].conditions=['unconscious'];
  }
  let stored={id:snapshot.world.id,status:'active',revision:1,snapshot:structuredClone(snapshot)};const requests=[];
  env.World.scenes.island=scene;env.WorldGen={tileAt};env.World.compileCollisions(scene);
  env.GeneratedWorlds={plan,restore(){},prime(){},prefetch(){},step:async()=>{},opened:()=>false};
  env.document.querySelector=()=>env.document.createElement('div');env.viewsDebug={switchTab(){}};env.Artwork={hero:()=>env.document.createElement('canvas')};
  env.Tutorial={active:false,restore(){},render(){}};
  env.fetch=async(_path,options)=>{
    const body=JSON.parse(options.body),entry={snapshot:structuredClone(body.snapshot)};requests.push(entry);
    try{validateWorldSnapshot(body.snapshot,stored.snapshot);if(failWrites>0){failWrites--;throw Error('Temporary checkpoint failure');}assert.equal(body.revision,stored.revision);}
    catch(error){entry.error=error.message;return{ok:false,json:async()=>({error:error.message})};}
    stored={...stored,revision:stored.revision+1,snapshot:structuredClone(body.snapshot)};return{ok:true,json:async()=>({world:structuredClone(stored)})};
  };
  vm.runInContext(readFileSync(new URL('../dist/adventure.js',import.meta.url),'utf8'),env);
  vm.runInContext(readFileSync(new URL('../dist/worlds.js',import.meta.url),'utf8'),env);env.Worlds.attach(structuredClone(stored));
  const moveTo=async p=>{env.gameDebug.mapTap(p);const action=env.objectPrompt.actions.find(a=>a.id==='move');assert.ok(action?.enabled,'Real map exposes a legal movement action');return action.run();};
  return {env,elements,requests,settlement,scene,plan,moveTo,get stored(){return stored;}};
}

test('crossing the settlement captures its validated milestone before leaving its radius',async()=>{
  const f=islandPersistenceFixture();try{
    const end={x:f.settlement.x+15,y:f.settlement.y};await f.moveTo(end);
    assert.equal(f.env.gameDebug.active().x,end.x);assert.equal(await f.env.Worlds.flush(),true);
    const milestone=f.requests.find(r=>r.snapshot.story.reachedSettlement);assert.ok(milestone);
    assert.ok(Math.abs(milestone.snapshot.party[0].x-f.settlement.x)<=f.settlement.radius,'First milestone checkpoint is inside the canonical settlement');
    assert.ok(f.requests.every(r=>!r.error));assert.equal(f.stored.snapshot.story.reachedSettlement,true);assert.equal(f.stored.snapshot.party[0].x,end.x);
  }finally{f.env.Worlds.detach();}
});

test('a failed settlement checkpoint stops locally and retries before subsequent movement',async()=>{
  const f=islandPersistenceFixture({failWrites:2});try{
    const end={x:f.settlement.x+15,y:f.settlement.y};await f.moveTo(end);
    const stopped={x:f.env.gameDebug.active().x,y:f.env.gameDebug.active().y};
    assert.ok(Math.abs(stopped.x-f.settlement.x)<=f.settlement.radius,'Failed checkpoint remains within the proof radius');
    assert.equal(f.stored.snapshot.story.reachedSettlement,false);assert.equal(JSON.parse(f.env.Worlds.pending).story.reachedSettlement,true);
    await f.moveTo(end);assert.equal(f.env.gameDebug.active().x,stopped.x,'Retry failure cannot advance even one cell');
    await f.moveTo(end);assert.equal(f.env.gameDebug.active().x,end.x);assert.equal(await f.env.Worlds.flush(),true);
    assert.equal(f.requests.filter(r=>r.error).length,2);assert.equal(f.stored.snapshot.story.reachedSettlement,true);
  }finally{f.env.Worlds.detach();}
});

test('ordinary transient autosave errors still allow movement without a pending location proof',async()=>{
  const f=islandPersistenceFixture({failWrites:1});try{
    f.env.gameDebug.tell('Обычная запись в журнале');assert.equal(await f.env.Worlds.flush(),false);
    const from={x:f.env.gameDebug.active().x,y:f.env.gameDebug.active().y},end={x:from.x+2,y:from.y};await f.moveTo(end);
    assert.equal(f.env.gameDebug.active().x,end.x);assert.equal(f.env.gameDebug.state.story.reachedSettlement,false);assert.equal(await f.env.Worlds.flush(),true);
  }finally{f.env.Worlds.detach();}
});

for(const milestone of ['clue','report'])test('failed '+milestone+' proof must retry before leaving its interaction cell',async()=>{
  const f=islandPersistenceFixture({failWrites:2});try{
    const initial={x:f.stored.snapshot.party[0].x,y:f.stored.snapshot.party[0].y};
    f.stored.snapshot.story.reachedSettlement=true;f.stored.snapshot.story.cleared=f.scene.encounters.map(e=>e.id);
    if(milestone==='report')f.stored.snapshot.story.clues=[f.plan.story.clueProp];
    f.env.Worlds.attach(structuredClone(f.stored));
    let dialogue;f.env.openGeneratedDialogue=(p,text,options)=>{dialogue={p,text,options};};f.env.closeDialogue=()=>{dialogue=null;};
    f.env.HUD={render(){},check:async()=>{}};f.env.DND.skill=()=>({success:true,natural:12,text:'Расследование · успех'});
    const prop=f.scene.props.find(p=>milestone==='clue'?p.id===f.plan.story.clueProp:p.storyRole==='elder');
    await f.env.gameDebug.approachInteract(prop);
    const choice=dialogue.options.find(o=>milestone==='clue'?/Изучить/.test(o.label):/Передать/.test(o.label));assert.ok(choice);await choice.fn();
    const stopped={x:f.env.gameDebug.active().x,y:f.env.gameDebug.active().y};
    assert.ok(f.env.Worlds.pending);assert.equal(f.stored.snapshot.story.reported,false);
    f.env.closeDialogue();await f.moveTo(initial);
    assert.equal(f.env.gameDebug.active().x,stopped.x);assert.equal(f.env.gameDebug.active().y,stopped.y,'Failed retry cannot leave the canonical proof cell');
    await f.moveTo(initial);assert.equal(f.env.gameDebug.active().x,initial.x);assert.equal(await f.env.Worlds.flush(),true);
    assert.equal(f.requests.filter(r=>r.error).length,2);assert.equal(f.stored.snapshot.story.reported,milestone==='report');assert.equal(f.stored.snapshot.story.clues.includes(f.plan.story.clueProp),true);
  }finally{f.env.Worlds.detach();}
});

test('natural20 recovery captures a valid unresolved encounter before and after the pending HUD',async()=>{
  const f=islandPersistenceFixture({defeated:true});let resolveHUD;try{
    f.env.HUD={pending:true,active:true,render(){},check:()=>new Promise(resolve=>{resolveHUD=()=>{f.env.HUD.pending=false;f.env.HUD.active=false;resolve();};})};
    f.env.DND.death=a=>{a.hp=1;a.death={success:0,failure:0,stable:false};return{natural:20,text:'Спасбросок20 · 1HP'};};
    vm.runInContext(readFileSync(new URL('../dist/death-screen.js',import.meta.url),'utf8').replace('window.DeathScreen={render,close};','window.DeathScreen={render,close,deathSave};'),f.env);
    const beforeEnemies=structuredClone(f.env.gameDebug.state.enemies),beforeGold=f.env.gameDebug.state.gold,beforeXP=f.env.gameDebug.state.xp;
    const roll=f.env.DeathScreen.deathSave();assert.equal(f.env.gameDebug.active().hp,1);assert.equal(f.env.HUD.pending,true);
    const during=JSON.parse(f.env.Worlds.pending);assert.equal(during.combat,true,'Recovery checkpoint resumes the existing fight while HUD remains pending');validateWorldSnapshot(during,f.stored.snapshot);
    resolveHUD();await roll;await Promise.resolve();const after=JSON.parse(f.env.Worlds.pending);
    assert.equal(after.combat,true);assert.equal(after.party[0].hp,1);assert.equal(after.party[0].conditions.includes('unconscious'),false);validateWorldSnapshot(after,f.stored.snapshot);
    assert.deepEqual(f.env.gameDebug.state.enemies,beforeEnemies);assert.equal(f.env.gameDebug.state.gold,beforeGold);assert.equal(f.env.gameDebug.state.xp,beforeXP);assert.equal(await f.env.Worlds.flush(),true);
  }finally{resolveHUD?.();f.env.Worlds.detach();}
});
