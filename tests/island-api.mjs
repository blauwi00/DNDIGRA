import assert from 'node:assert/strict';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync, readdirSync} from 'node:fs';
import {IDBFactory, IDBObjectStore} from 'fake-indexeddb';
import {heroAPI} from '../src/hero-api.js';
import {worldAPI, canFinishWorld} from '../src/world-api.js';
import {createLocalAPI} from '../src/local-api.js';
import {generateScene} from '../src/worldgen/world.js';
import * as R from '../src/hero-rules.js';
import {defaultLook} from '../src/look-options.js';

const draft = {name:'Островная Мира',classId:'wizard',stats:R.preset('wizard'),appearance:defaultLook('wizard','female'),kit:0,background:R.background('wizard',()=>0)};
const initialStory = {v:1,intro:0,npcWarned:false,npcDeparted:false,clues:[],cleared:[],reachedSettlement:false,reported:false};
function serverFixture(){
  const db=new DatabaseSync(':memory:');
  for(const file of readdirSync(new URL('../drizzle/',import.meta.url)).filter(f=>f.endsWith('.sql')).sort())db.exec(readFileSync(new URL('../drizzle/'+file,import.meta.url),'utf8'));
  let failWrite=false;
  const DB={async batch(statements){db.exec('BEGIN');try{const results=[];for(const statement of statements)results.push(await statement.run());db.exec('COMMIT');return results;}catch(error){db.exec('ROLLBACK');throw error;}},prepare(sql){const statement=db.prepare(sql);return{bind(...args){return{all:async()=>({results:statement.all(...args)}),run:async()=>{if(failWrite&&sql.startsWith('UPDATE worlds SET snapshot')){failWrite=false;throw Error('Injected failed save');}return{meta:{changes:statement.run(...args).changes}};}};}};}};
  return {async call(path,method='GET',body,owner='island-owner'){
    const request=new Request('https://game.test/api/'+path,{method,headers:{Origin:'https://game.test','oai-authenticated-user-id':owner},body:body===undefined?undefined:JSON.stringify(body)});
    const response=await(path.startsWith('heroes')?heroAPI:worldAPI)(request,{DB});return{status:response.status,...await response.json()};
  },failNextSave(){failWrite=true;},async reopen(){},async close(){db.close();}};
}
function localFixture(){
  const indexedDB=new IDBFactory(),dbName=crypto.randomUUID();
  let api=createLocalAPI({indexedDB,dbName,baseURL:'https://game.test'}),restorePut;
  return {async call(path,method='GET',body){
    const response=await api.fetch('/api/'+path,{method,body:body===undefined?undefined:JSON.stringify(body)});return{status:response.status,...await response.json()};
  },failNextSave(){const put=IDBObjectStore.prototype.put;restorePut=()=>{IDBObjectStore.prototype.put=put;restorePut=null;};IDBObjectStore.prototype.put=function(...args){restorePut();throw Error('Injected failed save');};},async reopen(){await api.close();api=createLocalAPI({indexedDB,dbName,baseURL:'https://game.test'});},async close(){restorePut?.();await api.close();}};
}
async function create(f,size='small'){
  const heroResult=await f.call('heroes','POST',draft);assert.equal(heroResult.status,201,heroResult.error);
  const result=await f.call('worlds','POST',{heroId:heroResult.hero.id,generatorVersion:4,seed:'island-api-'+size,size});assert.equal(result.status,201,result.error);return result.world;
}
async function save(f,w,change){const snapshot=structuredClone(w.snapshot);change(snapshot);return f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot});}
function prepare(s){Object.assign(s.story,{intro:3,npcWarned:true,npcDeparted:true});}
function position(s,p){s.party[0].x=p.x;s.party[0].y=p.y;}
function nearProp(scene,p){for(const [dx,dy]of[[0,1],[1,0],[0,-1],[-1,0]])if(!scene.props.some(v=>v.x===p.x+dx&&v.y===p.y+dy&&v.solid!==false))return{x:p.x+dx,y:p.y+dy};throw Error('No interaction cell');}
function battle(s,scene,encounter){prepare(s);Object.assign(s,{combat:true,encounter:{id:encounter.id,scene:scene.id,name:encounter.name,tutorial:false,scriptedLoss:false,reward:encounter.reward},enemies:encounter.enemies.map(e=>({...e,hp:e.max,facing:0,move:6,conditions:[]}))});s.order=[s.active,...s.enemies.map(e=>e.id)];s.cursor=0;}

for(const [name,fixture]of[['server',serverFixture],['offline',localFixture]]){
  test(name+': a departed messenger leaves a walkable and saveable island cell',async()=>{
    const f=fixture();try{
      const w=await create(f),messenger=w.generated.scene.props.find(p=>p.storyRole==='messenger');
      const occupied=await save(f,w,s=>{Object.assign(s.story,{intro:3,npcWarned:true});position(s,messenger);});
      assert.equal(occupied.status,400,'A present messenger still occupies the cell');
      const departed=await save(f,w,s=>{prepare(s);position(s,messenger);});
      assert.equal(departed.status,200,departed.error);
      await f.reopen();
      const restored=(await f.call('worlds/'+w.id)).world.snapshot;
      assert.equal(restored.story.npcDeparted,true);
      assert.deepEqual([restored.party[0].x,restored.party[0].y],[messenger.x,messenger.y]);
    }finally{await f.close();}
  });
  test(name+': v4 returns a compact canonical island and resumable opening',async()=>{
    const f=fixture();try{
      for(const size of ['small','large']){
        const w=await create(f,size),scene=w.generated.scene;
        assert.equal(w.snapshot.world.gen.v,4);assert.equal(w.snapshot.scene,'island');assert.equal(scene.id,'island');assert.ok(scene.island);assert.equal(scene.tiles,undefined);assert.ok(JSON.stringify(scene).length<60000);assert.deepEqual(w.snapshot.story,initialStory);assert.equal(w.snapshot.encounter,null);assert.equal(w.snapshot.tutorial,undefined);assert.deepEqual((await f.call('worlds/'+w.id+'/scene?id=island')).scene,scene);assert.equal((await f.call('worlds/'+w.id+'/scene?id=__proto__')).status,404);assert.equal((await f.call('worlds/'+w.id+'/scene?id=other-island')).status,404);
        await f.reopen();assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
      }
    }finally{await f.close();}
  });
  test(name+': hero, encounter enemies and dropped items cannot occupy ocean',async()=>{
    const f=fixture();try{
      const w=await create(f),scene=w.generated.scene,encounter=scene.encounters[0];
      for(const change of [s=>position(s,{x:0,y:0}),s=>{battle(s,scene,encounter);s.enemies[0].x=0;s.enemies[0].y=0;},s=>{s.drops=[{id:'sea-item',name:'Верёвка',itemType:'gear',scene:'island',x:0,y:0}];},s=>{s.drops=[{id:'wrong-scene',name:'Верёвка',itemType:'gear',scene:'other-island',x:scene.spawns[0][0],y:scene.spawns[0][1]}];}])assert.equal((await save(f,w,change)).status,400);
      assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
    }finally{await f.close();}
  });
  test(name+': opened containers, clue and defeated encounters survive restart without reward duplication',async()=>{
    const f=fixture();try{
      let w=await create(f),scene=w.generated.scene;
      const chest=scene.props.find(p=>p.container&&p.loot.gold>0&&p.id!=='story-clue'),key='island:'+chest.id;
      let r=await save(f,w,s=>{prepare(s);position(s,nearProp(scene,chest));s.gen.opened={[key]:true};s.loot={[key]:true};s.gold+=chest.loot.gold;});assert.equal(r.status,200,r.error);w=r.world;
      const encounter=scene.encounters[0];r=await save(f,w,s=>battle(s,scene,encounter));assert.equal(r.status,200,r.error);w=r.world;
      r=await save(f,w,s=>{s.combat=false;s.encounter=null;s.enemies=[];s.order=[];s.cursor=0;s.story.cleared.push(encounter.id);s.gold+=encounter.reward.gold;s.xp+=encounter.reward.xp;});assert.equal(r.status,200,r.error);w=r.world;
      const clue=scene.props.find(p=>p.id===w.generated?.plan?.story?.clueProp||p.id==='story-clue');r=await save(f,w,s=>{position(s,nearProp(scene,clue));s.story.clues.push(clue.id);});assert.equal(r.status,200,r.error);w=r.world;
      await f.reopen();assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
      for(const change of [s=>s.gen.opened={},s=>s.loot={},s=>s.story.cleared=[],s=>s.story.clues=[],s=>s.story.intro=0,s=>s.story.npcDeparted=false,s=>s.gold+=chest.loot.gold,s=>s.xp+=encounter.reward.xp,s=>battle(s,scene,encounter)])assert.equal((await save(f,w,change)).status,400);
      assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
    }finally{await f.close();}
  });
  test(name+': island progress and encounter identities are scoped, monotonic and canonical',async()=>{
    const f=fixture();try{
      let w=await create(f),scene=w.generated.scene;
      for(const change of [s=>s.world.gen.seed='forged',s=>s.story.clues=['other-island:story-clue'],s=>s.story.cleared=['unknown'],s=>s.story.reported=true,s=>s.story.npcWarned=true,s=>s.story.npcDeparted=true,s=>s.story.extra=true,s=>s.story.reachedSettlement=true,s=>s.gen.opened={'other-island:starter-cache':true},s=>{battle(s,scene,scene.encounters[0]);s.encounter.reward.gold++;},s=>{battle(s,scene,scene.encounters[0]);s.enemies[0].id='other-island:foe';},s=>{battle(s,scene,scene.encounters[0]);s.enemies[0].visual='new-model';},s=>{s.story.clues=['story-clue'];prepare(s);}])assert.equal((await save(f,w,change)).status,400);
      const settlement=scene.landmarks.find(p=>p.id==='settlement');let r=await save(f,w,s=>{prepare(s);position(s,settlement);s.story.reachedSettlement=true;});assert.equal(r.status,200,r.error);w=r.world;
      assert.equal((await save(f,w,s=>s.story.reachedSettlement=false)).status,400);
    }finally{await f.close();}
  });
  test(name+': failed and stale saves preserve the authoritative hero and permanent environment',async()=>{
    const f=fixture();try{
      let w=await create(f),scene=w.generated.scene,chest=scene.props.find(p=>p.container&&p.loot.gold>0),key='island:'+chest.id;
      const base=w;f.failNextSave();let r=await save(f,w,s=>{prepare(s);position(s,nearProp(scene,chest));s.gen.opened={[key]:true};s.gold+=chest.loot.gold;s.party[0].inventory.push('Сохранённая верёвка');});assert.equal(r.status,503);assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
      r=await save(f,w,s=>{prepare(s);position(s,nearProp(scene,chest));s.gen.opened={[key]:true};s.gold+=chest.loot.gold;s.party[0].inventory.push('Сохранённая верёвка');});assert.equal(r.status,200,r.error);w=r.world;
      const stale=await save(f,base,s=>s.party[0].hp--);assert.equal(stale.status,409);assert.equal(stale.conflict,true);await f.reopen();assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);const heroes=(await f.call('heroes')).heroes;assert.deepEqual(heroes[0].inventory,w.snapshot.party[0].inventory);assert.equal(heroes[0].gold,w.snapshot.gold);
    }finally{await f.close();}
  });
  test(name+': simultaneous island saves commit one complete hero/environment checkpoint',async()=>{
    const f=fixture();try{
      const w=await create(f),scene=w.generated.scene,chest=scene.props.find(p=>p.container&&p.loot.gold>0),key='island:'+chest.id;
      const results=await Promise.all([
        save(f,w,s=>{prepare(s);position(s,nearProp(scene,chest));s.gen.opened={[key]:true};s.gold+=chest.loot.gold;}),
        save(f,w,s=>{s.party[0].hp--;s.logs.push('Другой checkpoint');}),
      ]);
      assert.deepEqual(results.map(r=>r.status).sort(),[200,409]);const winner=results.find(r=>r.status===200).world;
      await f.reopen();assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,winner.snapshot);assert.equal((await f.call('worlds/'+w.id)).world.revision,2);
    }finally{await f.close();}
  });
  test(name+': an unconscious hero retains unresolved island enemies across restart and recovery',async()=>{
    const f=fixture();try{
      let w=await create(f),scene=w.generated.scene,encounter=scene.encounters[0];
      let r=await save(f,w,s=>battle(s,scene,encounter));assert.equal(r.status,200,r.error);w=r.world;
      assert.equal((await save(f,w,s=>{s.combat=false;s.encounter=null;s.enemies=[];s.order=[];})).status,400,'An unfinished battle cannot disappear');
      r=await save(f,w,s=>{s.combat=false;s.party[0].hp=0;s.party[0].conditions=['unconscious'];s.party[0].death.stable=true;s.enemies[0].hp--;});assert.equal(r.status,200,r.error);w=r.world;
      await f.reopen();assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
      for(const change of [s=>s.enemies=[],s=>s.encounter=null,s=>s.party[0].hp=1])assert.equal((await save(f,w,change)).status,400);
      r=await save(f,w,s=>{s.party[0].hp=1;s.party[0].conditions=[];s.combat=true;});assert.equal(r.status,200,r.error);assert.deepEqual(r.world.snapshot.enemies,w.snapshot.enemies);assert.equal(r.world.snapshot.gold,0);assert.equal(r.world.snapshot.xp,0);assert.deepEqual(r.world.snapshot.story.cleared,[]);
    }finally{await f.close();}
  });
  test(name+': completing an island never turns the campaign into a readonly legacy archive',async()=>{
    const f=fixture();try{
      let w=await create(f),scene=w.generated.scene,clue=scene.props.find(p=>p.id==='story-clue'),elder=scene.props.find(p=>p.id==='elder'),encounter=scene.encounters.find(e=>e.id==='road-threat');
      assert.equal((await f.call('worlds/'+w.id+'/finish','POST',{revision:w.revision})).status,400);assert.equal(canFinishWorld(w.snapshot),false);
      let r=await save(f,w,s=>{prepare(s);position(s,nearProp(scene,clue));s.story.clues.push(clue.id);s.story.cleared.push(encounter.id);});assert.equal(r.status,200,r.error);w=r.world;
      r=await save(f,w,s=>{position(s,nearProp(scene,elder));s.story.reachedSettlement=true;s.story.reported=true;});assert.equal(r.status,200,r.error);w=r.world;
      assert.equal(canFinishWorld(w.snapshot),false);assert.equal((await f.call('worlds/'+w.id+'/finish','POST',{revision:w.revision})).status,400);r=await save(f,w,s=>s.party[0].hp--);assert.equal(r.status,200,r.error);assert.equal(r.world.status,'active');
      assert.equal((await save(f,r.world,s=>s.story.reported=false)).status,400);
    }finally{await f.close();}
  });
}

test('server and native canonical v4 payloads match for the same immutable generation identity',async()=>{
  const server=serverFixture(),local=localFixture();try{
    const a=await create(server),b=await create(local);assert.deepEqual(a.generated,b.generated);assert.deepEqual(a.snapshot.story,b.snapshot.story);assert.deepEqual(generateScene(a.generated.plan,'island'),a.generated.scene);
  }finally{await server.close();await local.close();}
});
