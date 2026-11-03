import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync,readdirSync} from 'node:fs';
import test from 'node:test';
const {default:worker}=await import(process.env.DNDIGRA_WORKER_BUILD==='1'?'../dist/server/index.js':'../src/server.js');
import * as worldRules from '../src/world-api.js';
import * as R from '../src/hero-rules.js';
import {generateScene,sceneIds} from '../src/worldgen/world.js';
import {tutorialRequirements} from '../src/tutorial-rules.js';

function completeTutorial(tutorial){const requirements=tutorialRequirements(tutorial.classId);return{...tutorial,step:requirements.length,phase:'complete',checks:Object.fromEntries(requirements.map(r=>[r.id,true])),completed:true};}
function battleSnapshot(w,scene,encounter,{tutorial=false,scriptedLoss=false}={}){
  const s=structuredClone(w.snapshot);s.scene=scene.id;[s.party[0].x,s.party[0].y]=scene.spawns[0];Object.assign(s.story,{intro:3,npcWarned:true,npcDeparted:true});s.encounter={id:encounter.id,scene:scene.id,name:encounter.name,tutorial,scriptedLoss,reward:encounter.reward};s.combat=true;s.enemies=encounter.enemies.map(e=>({...e,hp:e.max,facing:0,move:6,conditions:[]}));s.order=[s.active,...s.enemies.map(e=>e.id)];s.cursor=0;return s;
}

function fixture(){
  const db=new DatabaseSync(':memory:');
  for(const f of readdirSync(new URL('../drizzle/',import.meta.url)).filter(f=>f.endsWith('.sql')).sort())db.exec(readFileSync(new URL('../drizzle/'+f,import.meta.url),'utf8'));
  let nextRead;
  function pauseNextRead(matches){
    let release, started;
    const gate=new Promise(resolve=>{release=resolve;}), observed=new Promise(resolve=>{started=resolve;});
    nextRead={matches,gate,started};
    return{observed,release};
  }
  const DB={async batch(statements){db.exec('BEGIN');try{const results=[];for(const q of statements)results.push(await q.run());db.exec('COMMIT');return results;}catch(e){db.exec('ROLLBACK');throw e;}},prepare(sql){const q=db.prepare(sql);return{bind(...args){return{all:async()=>{
    const results=q.all(...args), pause=nextRead;
    if(pause?.matches(sql)){nextRead=null;pause.started();await pause.gate;}
    return{results};
  },run:async()=>({meta:{changes:q.run(...args).changes}})}}}}};
  async function call(path,method='GET',body,owner='adventure-owner'){
    const response=await worker.fetch(new Request('https://game.test/api/'+path,{method,headers:{Origin:'https://game.test','oai-authenticated-user-id':owner},body:body===undefined?undefined:JSON.stringify(body)}),{DB});
    return{status:response.status,...await response.json()};
  }
  async function hero(owner='adventure-owner'){
    const draft={name:'Путник',classId:'fighter',stats:R.preset('fighter'),appearance:{...Object.fromEntries(Object.entries(R.COLORS).map(([k,v])=>[k,v[0]])),hairStyle:'short',face:'soft'},kit:0,background:R.background('fighter',()=>0)};
    const response=await call('heroes','POST',draft,owner);assert.equal(response.status,201);return response.hero;
  }
  async function adventure(owner='adventure-owner'){
    const h=await hero(owner),response=await call('worlds','POST',{heroId:h.id,seed:'adventure-api-test',size:'medium'},owner);
    assert.equal(response.status,201);assert.equal(response.world.snapshot.world.gen.v,3,'New worlds use story generator v3');
    return response.world;
  }
  return{db,call,hero,adventure,pauseNextRead};
}

test('first tutorial cannot be skipped through a request completion claim',async()=>{
  const f=fixture();try{const h=await f.hero();const r=await f.call('worlds','POST',{heroId:h.id,skipTutorial:true,tutorialCompleted:true,seed:'first-skip',size:'small'});assert.equal(r.status,400);assert.match(r.error,/обуч/i);}finally{f.db.close();}
});

test('world chooser exposes persisted tutorial eligibility without trusting request claims',async()=>{
  const f=fixture();try{const h=await f.hero();const r=await f.call('worlds?hero_id='+h.id);assert.equal(r.status,200);assert.equal(r.tutorialCompleted,false);}finally{f.db.close();}
});

test('new adventure initializes resumable intro, tutorial and encounter state',async()=>{
  const f=fixture();try{const w=await f.adventure();assert.equal(w.snapshot.scene,'glade');assert.deepEqual(w.snapshot.story,{v:1,intro:0,npcWarned:false,npcDeparted:false,clues:[],cleared:[],reachedSettlement:false,reported:false});assert.equal(w.snapshot.tutorial.v,1);assert.equal(w.snapshot.tutorial.completed,false);assert.equal(w.snapshot.tutorial.skipped,false);assert.equal(w.snapshot.encounter,null);assert.equal(typeof worldRules.initialWorld,'function');assert.equal(typeof worldRules.validateWorldSnapshot,'function');assert.equal(typeof worldRules.canFinishWorld,'function');assert.equal(worldRules.canFinishWorld(w.snapshot),false);}finally{f.db.close();}
});

test('same-millisecond server transitions keep the newest property through either archive deletion order', async () => {
  const originalNow = Date.now, sameMillisecond = originalNow();
  Date.now = () => sameMillisecond;
  try {
    for (const deletionOrder of ['old-first', 'new-first']) {
      const f = fixture();
      try {
        const h = await f.hero();
        f.db.prepare('UPDATE heroes SET sheet=? WHERE id=?').run(JSON.stringify({...h, gold: 9, potions: 1}), h.id);
        let r = await f.call('worlds', 'POST', {heroId: h.id, generatorVersion: 2, seed: 'clock-tie-old', size: 'small', startingGold: 9999, potions: 9999});
        assert.equal(r.status, 201, r.error);
        assert.equal(r.world.snapshot.gold, 9, 'Fresh worlds use the saved hero, never requested starting resources');
        assert.equal(r.world.snapshot.potions, 1);
        const s = structuredClone(r.world.snapshot);
        Object.assign(s, {gold: 21, potions: 2, xp: 65});
        s.party[0].conditions = ['poisoned'];
        s.party[0].permanentEffects = [{id: 'blessing', bonus: 1}];
        s.party[0].inventory.push('Подаренная верёвка');
        r = await f.call('worlds/' + r.world.id, 'PUT', {revision: r.world.revision, snapshot: s});
        assert.equal(r.status, 200, r.error);
        r = await f.call('worlds/' + r.world.id + '/finish', 'POST', {revision: r.world.revision});
        assert.equal(r.status, 200, r.error);
        const archive = r.world;
        r = await f.call('worlds', 'POST', {heroId: h.id, generatorVersion: 2, seed: 'clock-tie-new', size: 'small'});
        assert.equal(r.status, 201, r.error);
        assert.ok(r.world.createdAt > archive.createdAt, 'Same-ms worlds must have a stable newest order');
        assert.ok(r.world.updatedAt > archive.updatedAt, 'New worlds supersede the preceding saved checkpoint even without a first save');
        const newer = structuredClone(r.world.snapshot);
        Object.assign(newer, {gold: 17, potions: 1, xp: 125});
        newer.party[0].inventory.push('Вторая верёвка');
        r = await f.call('worlds/' + r.world.id, 'PUT', {revision: r.world.revision, snapshot: newer});
        assert.equal(r.status, 200, r.error);
        const current = r.world;
        // Existing v64 records can already share timestamps. Keep their
        // snapshots immutable and order the later chapter deterministically.
        f.db.prepare('UPDATE worlds SET created_at=? WHERE id=?').run(archive.createdAt, current.id);
        const listed = (await f.call('worlds?hero_id=' + h.id)).worlds;
        assert.deepEqual(listed.map(w => w.id), [current.id, archive.id]);
        assert.equal((await f.call('heroes')).heroes[0].activeWorldId, current.id);
        const order = deletionOrder === 'old-first' ? [archive, current] : [current, archive];
        for (const w of order) {
          assert.equal((await f.call('worlds/' + w.id, 'DELETE', {revision: w.revision})).status, 200);
          const saved = (await f.call('heroes')).heroes[0];
          assert.equal(saved.gold, 17, deletionOrder);
          assert.equal(saved.potions, 1, deletionOrder);
          assert.equal(saved.xp, 125, deletionOrder);
          assert.deepEqual(saved.inventory, newer.party[0].inventory, deletionOrder);
        }
        r = await f.call('worlds', 'POST', {heroId: h.id, generatorVersion: 2, seed: 'clock-tie-restart', size: 'small'});
        assert.equal(r.status, 201, r.error);
        assert.equal(r.world.snapshot.gold, 17);
        assert.equal(r.world.snapshot.potions, 1);
        assert.equal(r.world.snapshot.world.chapter, 3);
        assert.deepEqual(r.world.snapshot.party[0].conditions, ['poisoned']);
        assert.deepEqual(r.world.snapshot.party[0].permanentEffects, [{id: 'blessing', bonus: 1}]);
        const live = structuredClone(r.world.snapshot);
        Object.assign(live, {gold: 12, potions: 0});
        r = await f.call('worlds/' + r.world.id, 'PUT', {revision: r.world.revision, snapshot: live});
        assert.equal(r.status, 200, r.error);
        const currentHero = (await f.call('heroes')).heroes[0];
        assert.equal(currentHero.gold, 12, 'A saved new world supersedes its earlier deletion checkpoint');
        assert.equal(currentHero.potions, 0);
      } finally { f.db.close(); }
    }
  } finally { Date.now = originalNow; }
});

test('delayed creation rejects a completed source superseded by another finished world',async()=>{
  const f=fixture();let pending, pause;
  try{
    const h=await f.hero(), options={heroId:h.id,generatorVersion:2,size:'small'};
    let r=await f.call('worlds','POST',{...options,seed:'source-cas-old'});
    assert.equal(r.status,201,r.error);
    const old=structuredClone(r.world.snapshot);Object.assign(old,{gold:20,potions:2});
    r=await f.call('worlds/'+r.world.id,'PUT',{revision:r.world.revision,snapshot:old});assert.equal(r.status,200,r.error);
    r=await f.call('worlds/'+r.world.id+'/finish','POST',{revision:r.world.revision});assert.equal(r.status,200,r.error);
    const archive=r.world;
    pause=f.pauseNextRead(sql=>sql.startsWith('SELECT owner FROM player_progress'));
    pending=f.call('worlds','POST',{...options,seed:'source-cas-delayed'});await pause.observed;
    r=await f.call('worlds','POST',{...options,seed:'source-cas-new'});assert.equal(r.status,201,r.error);
    const spent=structuredClone(r.world.snapshot);Object.assign(spent,{gold:5,potions:1});
    r=await f.call('worlds/'+r.world.id,'PUT',{revision:r.world.revision,snapshot:spent});assert.equal(r.status,200,r.error);
    r=await f.call('worlds/'+r.world.id+'/finish','POST',{revision:r.world.revision});assert.equal(r.status,200,r.error);
    const newest=r.world;
    pause.release();const stale=await pending;
    assert.equal(stale.status,409,'A stale completed source cannot restore spent hero resources');
    assert.equal(stale.conflict,true);
    const worlds=(await f.call('worlds?hero_id='+h.id)).worlds;
    assert.deepEqual(worlds.map(w=>w.id),[newest.id,archive.id],'Rejected creation inserts no partial world');
    assert.deepEqual(worlds[0].snapshot,newest.snapshot);
    const current=(await f.call('heroes')).heroes[0];assert.equal(current.gold,5);assert.equal(current.potions,1);
  }finally{pause?.release();if(pending)await pending;f.db.close();}
});

test('delayed creation rejects a hero sheet changed by deleting its source before the latest-world read',async()=>{
  const f=fixture();let pending, pause;
  try{
    const h=await f.hero(), options={heroId:h.id,generatorVersion:2,size:'small'};
    let r=await f.call('worlds','POST',{...options,seed:'checkpoint-cas-source'});assert.equal(r.status,201,r.error);
    const earned=structuredClone(r.world.snapshot);Object.assign(earned,{gold:20,potions:2});earned.party[0].inventory.push('Сохранённая верёвка');
    r=await f.call('worlds/'+r.world.id,'PUT',{revision:r.world.revision,snapshot:earned});assert.equal(r.status,200,r.error);
    r=await f.call('worlds/'+r.world.id+'/finish','POST',{revision:r.world.revision});assert.equal(r.status,200,r.error);
    const archive=r.world;
    pause=f.pauseNextRead(sql=>sql.startsWith('SELECT sheet FROM heroes'));
    pending=f.call('worlds','POST',{...options,seed:'checkpoint-cas-delayed'});await pause.observed;
    r=await f.call('worlds/'+archive.id,'DELETE',{revision:archive.revision});assert.equal(r.status,200,r.error);
    const checkpoint=(await f.call('heroes')).heroes[0];
    pause.release();const stale=await pending;
    assert.equal(stale.status,409,'No remaining world must not make a stale starting sheet authoritative');
    assert.equal(stale.conflict,true);
    assert.deepEqual((await f.call('worlds?hero_id='+h.id)).worlds,[]);
    assert.deepEqual((await f.call('heroes')).heroes[0],checkpoint,'Rejected creation preserves the deletion checkpoint');
    r=await f.call('worlds','POST',{...options,seed:'checkpoint-cas-retry'});assert.equal(r.status,201,r.error);
    assert.equal(r.world.snapshot.gold,20);assert.equal(r.world.snapshot.potions,2);assert.deepEqual(r.world.snapshot.party[0].inventory,earned.party[0].inventory);
  }finally{pause?.release();if(pending)await pending;f.db.close();}
});

test('delayed creation with no previous world rejects a newer hero checkpoint even after that world is deleted',async()=>{
  const f=fixture();let pending, pause;
  try{
    const h=await f.hero(), options={heroId:h.id,generatorVersion:2,size:'small'};
    pause=f.pauseNextRead(sql=>sql.startsWith('SELECT owner FROM player_progress'));
    pending=f.call('worlds','POST',{...options,seed:'empty-source-delayed'});await pause.observed;
    let r=await f.call('worlds','POST',{...options,seed:'empty-source-new'});assert.equal(r.status,201,r.error);
    const earned=structuredClone(r.world.snapshot);Object.assign(earned,{gold:20,potions:2});
    r=await f.call('worlds/'+r.world.id,'PUT',{revision:r.world.revision,snapshot:earned});assert.equal(r.status,200,r.error);
    r=await f.call('worlds/'+r.world.id,'DELETE',{revision:r.world.revision});assert.equal(r.status,200,r.error);
    const checkpoint=(await f.call('heroes')).heroes[0];
    pause.release();const stale=await pending;
    assert.equal(stale.status,409,'An empty source set cannot bypass the observed hero-sheet identity');
    assert.equal(stale.conflict,true);
    assert.deepEqual((await f.call('worlds?hero_id='+h.id)).worlds,[]);
    assert.deepEqual((await f.call('heroes')).heroes[0],checkpoint);
  }finally{pause?.release();if(pending)await pending;f.db.close();}
});

test('only a persisted completion owned by the same player authorizes later skip',async()=>{
  const f=fixture();try{
    const previous=await f.adventure();const proof=structuredClone(previous.snapshot);proof.tutorial=completeTutorial(proof.tutorial);
    f.db.prepare('UPDATE worlds SET snapshot=?,status=? WHERE id=?').run(JSON.stringify(proof),'completed',previous.id);
    const another=await f.hero(),r=await f.call('worlds','POST',{heroId:another.id,skipTutorial:true,seed:'later-skip',size:'small'});assert.equal(r.status,201);assert.equal(r.world.snapshot.tutorial.skipped,true);assert.equal(r.world.snapshot.tutorial.completed,true);
    const other=await f.hero('different-owner');const denied=await f.call('worlds','POST',{heroId:other.id,skipTutorial:true,seed:'other-skip',size:'small'},'different-owner');assert.equal(denied.status,400);
  }finally{f.db.close();}
});

test('tutorial completion survives deleting its world and remains isolated from other players',async()=>{
  const f=fixture();try{
    let w=await f.adventure();const s=structuredClone(w.snapshot);s.tutorial=completeTutorial(s.tutorial);
    const saved=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s});assert.equal(saved.status,200,saved.error);w=saved.world;
    assert.equal(f.db.prepare('SELECT tutorial_version FROM player_progress WHERE owner=?').get('adventure-owner').tutorial_version,1);
    assert.equal((await f.call('worlds/'+w.id,'DELETE',{revision:w.revision})).status,200);
    const h=await f.hero();assert.equal((await f.call('worlds?hero_id='+h.id)).tutorialCompleted,true);
    const r=await f.call('worlds','POST',{heroId:h.id,skipTutorial:true,seed:'deleted-proof',size:'small'});assert.equal(r.status,201,r.error);assert.equal(r.world.snapshot.tutorial.skipped,true);
    const other=await f.hero('different-owner');assert.equal((await f.call('worlds?hero_id='+other.id,'GET',undefined,'different-owner')).tutorialCompleted,false);
  }finally{f.db.close();}
});

test('story progress resumes and cannot lose intro, clue or cleared encounter',async()=>{
  const f=fixture();try{
    let w=await f.adventure();let s=structuredClone(w.snapshot);Object.assign(s.story,{intro:3,npcWarned:true,npcDeparted:true,clues:['story-clue'],cleared:['road-threat']});
    let r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s});assert.equal(r.status,200,r.error);w=r.world;
    assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot.story,s.story);
    for(const change of [x=>x.story.intro=0,x=>x.story.npcWarned=false,x=>x.story.npcDeparted=false,x=>x.story.clues=[],x=>x.story.cleared=[],x=>x.story.clues=['unknown'],x=>x.story.cleared=['unknown'],x=>x.story.reported='yes']){
      const bad=structuredClone(w.snapshot);change(bad);r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:bad});assert.equal(r.status,400);
    }
  }finally{f.db.close();}
});

test('finishing requires tutorial completion and reporting the actual story',async()=>{
  const f=fixture();try{
    let w=await f.adventure();assert.equal((await f.call('worlds/'+w.id+'/finish','POST',{revision:w.revision})).status,400);
    const bad=structuredClone(w.snapshot);bad.story.reported=true;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:bad})).status,400);
    const forged=structuredClone(w.snapshot);forged.tutorial.completed=true;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:forged})).status,400);
    const complete=structuredClone(w.snapshot);Object.assign(complete.story,{intro:3,npcWarned:true,npcDeparted:true,clues:['story-clue'],cleared:['road-threat'],reachedSettlement:true,reported:true});complete.tutorial=completeTutorial(complete.tutorial);
    f.db.prepare('UPDATE worlds SET snapshot=? WHERE id=?').run(JSON.stringify(complete),w.id);
    assert.equal(worldRules.canFinishWorld(complete),true);assert.equal((await f.call('worlds/'+w.id+'/finish','POST',{revision:w.revision})).status,200);
  }finally{f.db.close();}
});

test('enemy null and malformed actor shapes cannot be stored',async()=>{
  const f=fixture();try{const w=await f.adventure();for(const enemies of [[null],[{}],[{id:'x',name:'Враг',kind:3,x:1,y:1,hp:4,max:4,ac:'bad'}]]){const s=structuredClone(w.snapshot);s.enemies=enemies;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s})).status,400);}}finally{f.db.close();}
});

test('unconscious tutorial loss and pending rescue survive save/load without ending the world',async()=>{
  const f=fixture();try{
    let w=await f.adventure();const s=structuredClone(w.snapshot),loss=w.generated.plan.story.tutorial.loss,requirements=tutorialRequirements(s.party[0].classId);
    Object.assign(s.story,{intro:3,npcWarned:true,npcDeparted:true});
    Object.assign(s.tutorial,{step:19,phase:'rescue',checks:Object.fromEntries(requirements.slice(0,19).map(r=>[r.id,true]))});
    s.party[0].hp=0;s.party[0].conditions=['unconscious'];s.party[0].death.stable=true;
    s.encounter={id:loss.id,scene:loss.scene,name:loss.name,tutorial:true,scriptedLoss:true,reward:loss.reward};
    let r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s});assert.equal(r.status,200,r.error);w=r.world;
    const restored=(await f.call('worlds/'+w.id)).world;assert.equal(restored.status,'active');assert.equal(restored.snapshot.tutorial.phase,'rescue');assert.equal(restored.snapshot.party[0].hp,0);assert.equal(restored.snapshot.encounter.id,'tutorial-loss');assert.equal((await f.call('worlds/'+w.id+'/finish','POST',{revision:w.revision})).status,400);
    const rescued=structuredClone(w.snapshot);rescued.tutorial=completeTutorial(rescued.tutorial);rescued.party[0].hp=rescued.party[0].max;rescued.party[0].conditions=[];rescued.encounter=null;
    r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:rescued});assert.equal(r.status,200,r.error);assert.equal(r.world.snapshot.tutorial.completed,true);assert.equal(r.world.snapshot.gold,0);assert.equal(r.world.snapshot.xp,0);
  }finally{f.db.close();}
});

test('ordinary encounter defeat persists unresolved enemies and resumes after recovery without a reward',async()=>{
  const f=fixture();try{
    let w=await f.adventure();const plan=w.generated.plan,road=generateScene(plan,'road'),encounter=road.encounters.find(e=>e.id==='road-threat');
    let r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:battleSnapshot(w,road,encounter)});assert.equal(r.status,200,r.error);w=r.world;
    const defeated=structuredClone(w.snapshot);defeated.combat=false;defeated.party[0].hp=0;defeated.party[0].conditions=['unconscious'];defeated.enemies[0].hp=Math.max(1,defeated.enemies[0].hp-1);
    r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:defeated});assert.equal(r.status,200,r.error);w=r.world;
    const restored=(await f.call('worlds/'+w.id)).world;assert.equal(restored.status,'active');assert.equal(restored.snapshot.party[0].hp,0);assert.deepEqual(restored.snapshot.enemies,defeated.enemies);assert.equal(restored.snapshot.encounter.id,'road-threat');assert.deepEqual(restored.snapshot.story.cleared,[]);assert.equal(restored.snapshot.xp,0);assert.equal(restored.snapshot.gold,0);
    const aliveOutsideCombat=structuredClone(w.snapshot);aliveOutsideCombat.party[0].hp=1;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:aliveOutsideCombat})).status,400,'A retained unresolved encounter cannot become peaceful while the hero is alive');
    const missingEnemies=structuredClone(w.snapshot);missingEnemies.enemies=[];assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:missingEnemies})).status,400,'Defeat cannot discard surviving enemies');
    const substituted=battleSnapshot(w,generateScene(plan,'glade'),plan.story.tutorial.loss,{tutorial:true,scriptedLoss:true}),requirements=tutorialRequirements(w.snapshot.tutorial.classId);
    Object.assign(substituted.tutorial,{step:17,phase:'ambush',checks:Object.fromEntries(requirements.slice(0,17).map(r=>[r.id,true]))});
    assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:substituted})).status,400,'A lost ordinary encounter remains unresolved after combat stops');
    const recovered=structuredClone(w.snapshot);recovered.party[0].hp=1;recovered.party[0].conditions=[];recovered.combat=true;
    r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:recovered});assert.equal(r.status,200,r.error);assert.deepEqual(r.world.snapshot.enemies,defeated.enemies);assert.equal(r.world.snapshot.xp,0);
  }finally{f.db.close();}
});

test('coalesced tutorial victory can advance directly to the scripted loss encounter',async()=>{
  const f=fixture();try{
    let w=await f.adventure();const plan=w.generated.plan,glade=generateScene(plan,'glade'),requirements=tutorialRequirements(w.snapshot.tutorial.classId);
    const win=battleSnapshot(w,glade,plan.story.tutorial.win,{tutorial:true});Object.assign(win.tutorial,{step:16,phase:'combat',checks:Object.fromEntries(requirements.slice(0,16).map(r=>[r.id,true]))});
    let r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:win});assert.equal(r.status,200,r.error);w=r.world;
    const loss=battleSnapshot(w,glade,plan.story.tutorial.loss,{tutorial:true,scriptedLoss:true});
    assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:loss})).status,400,'Switching before the recorded victory remains forbidden');
    Object.assign(loss.tutorial,{step:17,phase:'ambush',checks:Object.fromEntries(requirements.slice(0,17).map(r=>[r.id,true]))});
    const badReward=structuredClone(loss);badReward.encounter.reward.gold++;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:badReward})).status,400,'Progress does not authorize replacing the canonical tutorial reward');
    const badEnemy=structuredClone(loss);badEnemy.enemies[0].id='arbitrary-enemy';assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:badEnemy})).status,400,'Progress does not authorize unknown participants');
    r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:loss});assert.equal(r.status,200,r.error);assert.equal(r.world.snapshot.encounter.id,'tutorial-loss');assert.deepEqual(r.world.snapshot.story.cleared,[]);assert.equal(r.world.snapshot.xp,0);assert.equal(r.world.snapshot.gold,0);
  }finally{f.db.close();}
});

test('coalesced ordinary victory can continue into another canonical encounter',async()=>{
  const f=fixture();try{
    const h=await f.hero();let created=await f.call('worlds','POST',{heroId:h.id,seed:'adventure-0',size:'medium'});assert.equal(created.status,201,created.error);
    let w=created.world;const plan=w.generated.plan,road=generateScene(plan,'road'),ruins=generateScene(plan,'ruins'),roadThreat=road.encounters.find(e=>e.id==='road-threat'),ruinsThreat=ruins.encounters.find(e=>e.id==='ruins-threat');assert.ok(ruinsThreat);
    let r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:battleSnapshot(w,road,roadThreat)});assert.equal(r.status,200,r.error);w=r.world;
    const next=battleSnapshot(w,ruins,ruinsThreat);
    assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:next})).status,400,'An unfinished encounter cannot be left');
    next.story.cleared=['road-threat'];next.xp+=roadThreat.reward.xp;next.gold+=roadThreat.reward.gold;
    const wrongEncounter=structuredClone(next);wrongEncounter.encounter.id='road-threat';assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:wrongEncounter})).status,400,'The next encounter must belong to its actual scene');
    const excessReward=structuredClone(next);excessReward.gold++;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:excessReward})).status,400,'Completing the old encounter grants only its canonical reward');
    const forgedNewReward=structuredClone(next);forgedNewReward.encounter.reward.xp++;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:forgedNewReward})).status,400,'The new encounter reward is immutable');
    r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:next});assert.equal(r.status,200,r.error);w=r.world;
    assert.equal(w.snapshot.scene,'ruins');assert.equal(w.snapshot.encounter.id,'ruins-threat');assert.deepEqual(w.snapshot.story.cleared,['road-threat']);assert.equal(w.snapshot.xp,25);assert.equal(w.snapshot.gold,5);
    assert.deepEqual((await f.call('worlds/'+w.id)).world.snapshot,w.snapshot);
  }finally{f.db.close();}
});

test('active encounter has canonical reward and cannot escape scenes or receive duplicate rewards',async()=>{
  const f=fixture();try{
    let w=await f.adventure();const plan=w.generated.plan,scene=generateScene(plan,'road'),encounter=scene.encounters.find(e=>e.id==='road-threat');
    const s=structuredClone(w.snapshot);s.scene='road';[s.party[0].x,s.party[0].y]=scene.spawns[0];s.story.intro=3;s.story.npcWarned=true;s.story.npcDeparted=true;s.encounter={id:encounter.id,scene:scene.id,name:encounter.name,tutorial:false,scriptedLoss:false,reward:encounter.reward};s.combat=true;s.enemies=encounter.enemies.map(e=>({...e,hp:e.max,facing:0,move:6,conditions:[]}));s.order=[s.active,...s.enemies.map(e=>e.id)];s.cursor=0;
    let r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s});assert.equal(r.status,200,r.error);w=r.world;
    const badReward=structuredClone(w.snapshot);badReward.encounter.reward.gold++;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:badReward})).status,400);
    const badIdentity=structuredClone(w.snapshot);badIdentity.enemies[0].visual='unknown-foe';assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:badIdentity})).status,400);
    const escape=structuredClone(w.snapshot);escape.scene='glade';const glade=generateScene(plan,'glade');[escape.party[0].x,escape.party[0].y]=glade.spawns[0];assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:escape})).status,400);
    const won=structuredClone(w.snapshot);won.combat=false;won.enemies=[];won.order=[];won.cursor=0;won.encounter=null;won.story.cleared=['road-threat'];won.xp+=encounter.reward.xp;won.gold+=encounter.reward.gold;
    r=await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:won});assert.equal(r.status,200,r.error);w=r.world;
    const duplicate=structuredClone(w.snapshot);duplicate.xp+=encounter.reward.xp;duplicate.gold+=encounter.reward.gold;assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:duplicate})).status,400);
    const restart=structuredClone(w.snapshot);Object.assign(restart,{combat:true,encounter:s.encounter,enemies:s.enemies,order:s.order});assert.equal((await f.call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:restart})).status,400);
  }finally{f.db.close();}
});

test('explicit legacy v1 and v2 worlds retain their generator and unrestricted exploration finish',async()=>{
  const f=fixture();try{for(const generatorVersion of [1,2]){const h=await f.hero();const r=await f.call('worlds','POST',{heroId:h.id,generatorVersion,seed:'legacy-adventure-'+generatorVersion,size:'small'});assert.equal(r.status,201,r.error);assert.equal(r.world.snapshot.world.gen.v,generatorVersion);assert.equal(r.world.snapshot.scene,'town');assert.equal(r.world.snapshot.story,undefined);assert.equal(r.world.snapshot.tutorial,undefined);assert.equal((await f.call('worlds/'+r.world.id+'/finish','POST',{revision:r.world.revision})).status,200);}}finally{f.db.close();}
});
