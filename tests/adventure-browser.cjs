const {configureBrowserPage}=require('./browser-harness.cjs');
// Real source Worker + SQLite + Chromium. Position fixtures only shorten walking;
// initiative, attacks, healing dice, clues, rewards and saved transitions are real.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
  const {default:worker}=await import('../src/server.js'),R=await import('../src/hero-rules.js');
  const db=new DatabaseSync(':memory:');
  for(const f of fs.readdirSync(path.join(__dirname,'../drizzle')).filter(f=>f.endsWith('.sql')).sort())db.exec(fs.readFileSync(path.join(__dirname,'../drizzle',f),'utf8'));
  // This test covers a subsequent adventure. Mandatory first-run training has
  // its own four-class browser test; eligibility comes from the database.
  db.prepare('INSERT INTO player_progress(owner,tutorial_version,updated_at) VALUES(?,?,?)').run('story-qa',1,Date.now());
  const DB={async batch(qs){db.exec('BEGIN');try{const out=[];for(const q of qs)out.push(await q.run());db.exec('COMMIT');return out;}catch(e){db.exec('ROLLBACK');throw e;}},prepare(sql){const q=db.prepare(sql);return{bind(...args){return{all:async()=>({results:q.all(...args)}),run:async()=>({meta:{changes:q.run(...args).changes}})}}}}};
  const server=http.createServer(async(q,r)=>{try{
    if(q.url.startsWith('/api/')){
      const chunks=[];if(!['GET','HEAD'].includes(q.method))for await(const c of q)chunks.push(c);
      const response=await worker.fetch(new Request('http://127.0.0.1:'+server.address().port+q.url,{method:q.method,headers:{...q.headers,'oai-authenticated-user-id':'story-qa'},body:['GET','HEAD'].includes(q.method)?undefined:Buffer.concat(chunks)}),{DB});
      r.writeHead(response.status,Object.fromEntries(response.headers));return r.end(Buffer.from(await response.arrayBuffer()));
    }
    const rel=q.url.split('?')[0],f=path.join(__dirname,'../dist',rel==='/'?'index.html':rel);
    r.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png'})[f.split('.').pop()]||'application/octet-stream');r.end(fs.readFileSync(f));
  }catch(e){r.statusCode=500;r.end(String(e));}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{
    const base='http://127.0.0.1:'+server.address().port;
    async function api(route,body){const response=await fetch(base+'/api/'+route,{method:body?'POST':'GET',headers:{'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});const out=await response.json();assert.ok(response.ok,out.error);return out;}
    const draft={name:'Арден',classId:'fighter',stats:R.preset('fighter'),appearance:{...Object.fromEntries(Object.entries(R.COLORS).map(([k,v])=>[k,v[0]])),hairStyle:'short',face:'soft'},kit:0,background:R.background('fighter',()=>0)};
    const {hero}=await api('heroes',draft),{world}=await api('worlds',{heroId:hero.id,seed:'adventure-browser-story',size:'medium',skipTutorial:true});
    browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader',...JSON.parse(process.env.CHROMIUM_ARGS||'[]')]});
    const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];
    await configureBrowserPage(page);page.on('pageerror',e=>errors.push(e.message));
    await page.goto(base,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready,{},{timeout:120000});
    await page.evaluate(world=>{document.querySelectorAll('dialog').forEach(d=>d.close());Worlds.attach(world);gameDebug.state.settings.animations=false;window.storyEvents=[];window.addEventListener('game-action',e=>storyEvents.push(e.detail));},world);
    assert.equal(await page.locator('#adventure-cinematic [data-portrait-source="character-boxes"]').count(),1,'The opening uses the hero model portrait');
    assert.deepEqual(await page.evaluate(()=>gameDebug.active().appearance),hero.appearance);
    await page.evaluate(()=>gameDebug.enterScene('road',true));assert.equal(await page.evaluate(()=>gameDebug.state.scene),'glade','Intro blocks portals');
    await page.getByRole('button',{name:'Далее',exact:true}).click();
    await page.evaluate(async()=>{gameDebug.save();if(!await Worlds.flush())throw Error('Intro checkpoint save failed');});
    await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready);await page.evaluate(id=>Worlds.resume(id),world.id);
    assert.equal(await page.evaluate(()=>gameDebug.state.story.intro),1,'Reload resumes the cinematic checkpoint');
    await page.evaluate(()=>{gameDebug.state.settings.animations=false;window.storyEvents=[];window.addEventListener('game-action',e=>storyEvents.push(e.detail));});
    await page.getByRole('button',{name:'Далее',exact:true}).click();await page.getByRole('button',{name:'Начать путь',exact:true}).click();
    await page.getByRole('button',{name:'Я найду дорогу. Беги в поселение.',exact:true}).waitFor();
    fs.mkdirSync(path.join(__dirname,'../qa'),{recursive:true});await page.screenshot({path:'qa/adventure-warning-390.png'});
    await page.setViewportSize({width:320,height:568});assert.equal(await page.evaluate(()=>document.body.scrollWidth<=320),true,'Opening fits 320px');await page.screenshot({path:'qa/adventure-warning-320.png'});
    await page.getByRole('button',{name:'Я найду дорогу. Беги в поселение.',exact:true}).click();
    await page.waitForFunction(()=>gameDebug.state.story.npcDeparted&&!gameDebug.busy);
    assert.equal(await page.evaluate(()=>gameDebug.props.some(p=>p.storyRole==='messenger')),false);
    await page.evaluate(async()=>{gameDebug.save();if(!await Worlds.flush())throw Error('Messenger checkpoint save failed');});
    await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready);await page.evaluate(id=>Worlds.resume(id),world.id);
    assert.equal(await page.evaluate(()=>gameDebug.props.some(p=>p.storyRole==='messenger')),false,'Reload preserves departure');
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(async()=>{gameDebug.state.settings.animations=false;window.storyEvents=[];window.addEventListener('game-action',e=>storyEvents.push(e.detail));for(const id of WorldGen.sceneIds(GeneratedWorlds.plan))await GeneratedWorlds.ensure(id);});
    // A real one-cell movement into the generated radius starts the encounter.
    await page.evaluate(()=>{gameDebug.enterScene('road');const e=gameDebug.scene.encounters.find(e=>e.id==='road-threat'),a=gameDebug.active();a.x=e.x-4;a.y=e.y;gameDebug.render();gameDebug.mapTap({x:e.x-3,y:e.y});const go=objectPrompt.actions.find(a=>a.id==='move');if(!go?.enabled)throw Error('No road movement');go.run();});
    await page.waitForFunction(()=>gameDebug.state.combat&&!gameDebug.busy&&!HUD.active);
    assert.equal(await page.evaluate(()=>gameDebug.state.encounter.id),'road-threat');
    assert.equal(await page.evaluate(()=>gameDebug.state.rolls.some(s=>s.includes('инициатива'))),true,'Initiative is actually rolled');
    await page.evaluate(()=>gameDebug.enterScene('settlement',true));assert.equal(await page.evaluate(()=>gameDebug.state.scene),'road','A portal cannot escape combat');
    // A defeat fixture verifies saving and subsequent recovery without faking
    // a death-save roll. The existing death tests cover the natural-20 roll.
    await page.evaluate(()=>{DND.damage(gameDebug.active(),gameDebug.active().hp);gameDebug.state.combat=false;gameDebug.render();});
    await page.waitForFunction(()=>document.getElementById('death-screen')?.open);
    await page.evaluate(async()=>{gameDebug.save();if(!await Worlds.flush())throw Error('Ordinary defeat checkpoint save failed');});
    assert.equal(JSON.parse(db.prepare('SELECT snapshot FROM worlds WHERE id=?').get(world.id).snapshot).combat,false);
    await page.evaluate(()=>{gameDebug.heal(gameDebug.active(),gameDebug.active().max);gameDebug.render();});
    await page.waitForFunction(()=>gameDebug.state.combat&&!gameDebug.busy&&!HUD.active);
    await page.setViewportSize({width:320,height:568});
    await page.evaluate(()=>{camera.center(gameDebug.active(),true);voxel.resize();});
    const toggle=page.locator('#adventure-combat .adventure-combat-toggle');
    assert.equal(await toggle.getAttribute('aria-expanded'),'false','Prepared actions begin collapsed');
    assert.equal(await page.locator('#adventure-battle-actions').isVisible(),false,'Choices do not obscure the map by default');
    const compact=await page.evaluate(()=>{
      const canvas=voxel.renderer.domElement.getBoundingClientRect(),panel=document.getElementById('adventure-combat').getBoundingClientRect();
      const point=voxel.models.get(gameDebug.active().id).position.clone();point.y+=.9;point.project(voxel.camera);
      return{canvas:canvas.toJSON(),panel:panel.toJSON(),hero:{x:canvas.left+(point.x+1)*canvas.width/2,y:canvas.top+(1-point.y)*canvas.height/2},width:document.body.scrollWidth};
    });
    assert.ok(compact.panel.height<compact.canvas.height*.4,'Collapsed actions leave most of the map visible');
    assert.ok(compact.hero.x>=compact.canvas.left&&compact.hero.x<=compact.canvas.right&&compact.hero.y>=compact.canvas.top&&compact.hero.y<compact.panel.top,'The hero remains visible above the collapsed actions');
    assert.ok(compact.width<=320,'Combat fits the narrow mobile screen');
    await page.screenshot({path:'qa/adventure-combat-collapsed-320.png'});
    const before=await page.evaluate(()=>({xp:gameDebug.state.xp,gold:gameDebug.state.gold}));
    // Subsequent damage and healing use the production D&D engine and controls.
    let preparedAttackPerformed=false;
    for(let i=0;i<30&&await page.evaluate(()=>gameDebug.state.combat);i++){
      const next=await page.evaluate(async()=>{
        const g=gameDebug,a=g.active();if(a.hp<=0){g.heal(a,a.max);g.render();return null;}
        const foe=g.state.enemies.find(e=>e.hp>0);if(!foe)return null;
        if(a.hp<=a.max/2&&a.secondWind){await g.special('secondWind');return null;}
        if(a.acted){await g.endTurn();return null;}
        if(!g.canAttack(a,foe)){g.mapTap({x:foe.x-1,y:foe.y});const go=objectPrompt.actions.find(a=>a.id==='move');if(go?.enabled){await go.run();return null;}throw Error('No route into attack range');}
        return{id:foe.id,name:foe.name,hero:a.name,attacks:storyEvents.filter(e=>e.type==='attack'&&e.success).length};
      });
      if(next){
        await toggle.click();assert.equal(await toggle.getAttribute('aria-expanded'),'true','Toggle reveals prepared actions');
        const attack=page.locator('#adventure-battle-actions').getByRole('button',{name:'Атаковать: '+next.name,exact:true});
        assert.equal(await attack.isEnabled(),true,'The real prepared attack is available in range');
        await attack.click();
        await page.waitForFunction(count=>storyEvents.filter(e=>e.type==='attack'&&e.success).length>count,next.attacks);
        assert.equal(await toggle.getAttribute('aria-expanded'),'false','Choosing an action collapses the panel');
        assert.equal(await page.locator('#adventure-battle-actions').isVisible(),false);
        assert.ok(await page.evaluate(({hero,name})=>gameDebug.state.rolls.some(s=>s.startsWith(hero+' → '+name)&&s.includes('d20')),next),'Prepared attack records a production D&D d20 roll');
        preparedAttackPerformed=true;
      }
      await page.waitForFunction(()=>!gameDebug.busy&&!HUD.active);
    }
    assert.equal(preparedAttackPerformed,true,'Ordinary combat uses the prepared attack controls');
    assert.equal(await page.evaluate(()=>gameDebug.state.combat),false,'The road combat finishes with actual attacks');
    assert.equal(await page.evaluate(()=>storyEvents.some(e=>e.type==='attack'&&e.success)),true);
    const after=await page.evaluate(()=>({xp:gameDebug.state.xp,gold:gameDebug.state.gold,cleared:gameDebug.state.story.cleared}));assert.equal(after.xp-before.xp,25);assert.equal(after.gold-before.gold,5);assert.deepEqual(after.cleared,['road-threat']);
    await page.evaluate(async()=>{gameDebug.enterScene('glade');gameDebug.enterScene('road');await Adventure.startEncounter(gameDebug.scene.encounters[0]);});assert.equal(await page.evaluate(()=>gameDebug.state.combat),false,'Cleared encounter cannot restart');
    await page.setViewportSize({width:390,height:844});
    await page.evaluate(async()=>{gameDebug.enterScene(GeneratedWorlds.plan.story.clueScene);const p=gameDebug.props.find(p=>p.id==='story-clue'),a=gameDebug.active(),cell=World.directions.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(c=>!gameDebug.blocked(c));a.x=cell.x;a.y=cell.y;gameDebug.render();await gameDebug.approachInteract(p);});
    await page.getByRole('button',{name:'Изучить находку · Расследование СЛ 10',exact:true}).click();await page.waitForFunction(()=>gameDebug.state.story.clues.includes('story-clue')&&!HUD.active);await page.getByRole('button',{name:'Записать и продолжить путь',exact:true}).click();
    await page.evaluate(async()=>{gameDebug.enterScene('settlement');const p=gameDebug.props.find(p=>p.storyRole==='elder'),a=gameDebug.active(),cell=World.directions.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(c=>!gameDebug.blocked(c));a.x=cell.x;a.y=cell.y;gameDebug.render();await gameDebug.approachInteract(p);});
    await page.getByRole('button',{name:'Передать найденные сведения',exact:true}).click();await page.getByRole('button',{name:'Завершить разговор',exact:true}).click();
    await page.evaluate(async()=>{gameDebug.journal();gameDebug.save();if(!await Worlds.flush())throw Error('Story save failed');});await page.screenshot({path:'qa/adventure-journal-390.png'});
    const saved=JSON.parse(db.prepare('SELECT snapshot FROM worlds WHERE id=?').get(world.id).snapshot);assert.equal(saved.story.reported,true);assert.deepEqual(saved.story.clues,['story-clue']);assert.equal(saved.xp,after.xp);assert.equal(saved.gold,after.gold);
    await page.evaluate(()=>document.getElementById('modal').close());await page.evaluate(()=>Worlds.finish());assert.equal(db.prepare('SELECT status FROM worlds WHERE id=?').get(world.id).status,'completed');
    assert.deepEqual(errors,[]);console.log('PASS adventure browser: saved intro and departure, 320/390 mobile, ordinary movement-triggered D&D combat, defeat save/recovery, portal block, once-only rewards, real clue roll, elder report, journal and finish.');
  }finally{await browser?.close();server.close();db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
