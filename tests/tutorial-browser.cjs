// Real Worker, SQLite and Chromium. Tutorial progress comes only from actual controls.
// Hero fixtures use the real API; no completion flags, event injection or forced rolls.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
  const {default:worker}=await import('../dist/server/index.js');
  const db=new DatabaseSync(':memory:');
  for(const file of fs.readdirSync(path.join(__dirname,'../drizzle')).filter(f=>f.endsWith('.sql')).sort())db.exec(fs.readFileSync(path.join(__dirname,'../drizzle',file),'utf8'));
  const DB={async batch(qs){db.exec('BEGIN');try{const out=[];for(const q of qs)out.push(await q.run());db.exec('COMMIT');return out;}catch(e){db.exec('ROLLBACK');throw e;}},prepare(sql){const q=db.prepare(sql);return{bind(...args){return{all:async()=>({results:q.all(...args)}),run:async()=>({meta:{changes:q.run(...args).changes}})}}}}};
  const server=http.createServer(async(req,res)=>{try{
    if(req.url.startsWith('/api/')){
      const chunks=[];if(!['GET','HEAD'].includes(req.method))for await(const chunk of req)chunks.push(chunk);
      const response=await worker.fetch(new Request('http://127.0.0.1:'+server.address().port+req.url,{method:req.method,headers:{...req.headers,'oai-authenticated-user-id':req.headers['x-qa-owner']||'qa-tutorial'},body:['GET','HEAD'].includes(req.method)?undefined:Buffer.concat(chunks)}),{DB});
      res.writeHead(response.status,Object.fromEntries(response.headers));return res.end(Buffer.from(await response.arrayBuffer()));
    }
    if(req.url==='/favicon.ico'){res.statusCode=204;return res.end();}
    const file=path.join(__dirname,'../dist',req.url.split('?')[0]==='/'?'index.html':req.url.split('?')[0]);
    if(!fs.existsSync(file)){res.statusCode=404;return res.end();}
    res.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png',woff:'font/woff'})[file.split('.').pop()]||'application/octet-stream');res.end(fs.readFileSync(file));
  }catch(e){res.statusCode=500;res.end(String(e));}});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));let browser,activePage;
  const origin='http://127.0.0.1:'+server.address().port;
  fs.mkdirSync(path.join(__dirname,'../qa'),{recursive:true});
  try{
    browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,args:[...JSON.parse(process.env.CHROMIUM_ARGS||'[]'),'--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    async function idle(page){await page.waitForFunction(()=>!gameDebug.busy&&!HUD.active,null,{polling:100,timeout:60000});}
    async function step(page,wanted){await page.waitForFunction(n=>gameDebug.state.tutorial?.step===n,wanted,{timeout:30000});console.log('STEP',await page.evaluate(()=>gameDebug.active().classId),wanted);}
    async function flush(page){assert.equal(await page.evaluate(async()=>{gameDebug.save();Worlds.capture();return await Worlds.flush();}),true,'Actual world save succeeds');}
    async function reloadWorld(page,wanted){await flush(page);const id=await page.evaluate(()=>Worlds.current.id);await page.reload({waitUntil:'domcontentloaded',timeout:60000});await page.waitForFunction(()=>window.voxel?.ready);await page.getByRole('button',{name:'Продолжить',exact:true}).click();await page.waitForFunction(id=>Worlds.current?.id===id,id);await step(page,wanted);await idle(page);}
    async function point(page,cell,height=0){return page.evaluate(({cell,height})=>{const v=voxel.models.get(gameDebug.active().id).position.clone();v.set(cell.x+.5,height,cell.y+.5);v.project(voxel.camera);const r=document.getElementById('viewport').getBoundingClientRect();return{x:r.left+(v.x+1)*r.width/2,y:r.top+(1-v.y)*r.height/2};},{cell,height});}
    async function tapCell(page,cell,height=0){const p=await point(page,cell,height);const hit=await page.evaluate(p=>({id:document.elementFromPoint(p.x,p.y)?.id,tab:document.querySelector('.tabs [aria-selected=true]')?.id,viewport:document.getElementById('viewport').getBoundingClientRect().toJSON(),camera:camera.state}),p);console.log('TAP_CELL',cell,p,hit);assert.equal(hit.id,'voxel-canvas','The actual projected tap lands on the visible map canvas');await page.touchscreen.tap(p.x,p.y);}
    async function sizeCheck(page,classId,label){
      const size=page.viewportSize();assert.equal(await page.evaluate(()=>document.body.scrollWidth<=innerWidth),true,'No horizontal overflow '+classId+' '+label);
      const card=await page.locator('#tutorial-card').boundingBox(),tabs=await page.locator('.tabs').boundingBox();
      if(card)assert(card.y>=0&&card.x>=0&&card.x+card.width<=size.width&&card.y+card.height<tabs.y,'Instruction and navigation fit '+label);
      await page.screenshot({path:path.join(__dirname,'../qa/tutorial-'+classId+'-'+label+'-'+size.width+'.png')});
    }
    async function newHero(page,classId,name){return page.evaluate(async({classId,name})=>{
      const draft={name,classId,stats:HeroRules.preset(classId),appearance:Characters.defaultLook(classId,classId==='wizard'?'female':'male'),kit:0,background:HeroRules.background(classId,()=>0)};
      const response=await fetch('/api/heroes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)}),data=await response.json();if(!response.ok)throw Error(data.error);return data.hero;
    },{classId,name});}
    async function winBattle(page){
      for(let attempt=0;attempt<40;attempt++){
        await idle(page);const state=await page.evaluate(()=>({step:gameDebug.state.tutorial.step,combat:gameDebug.state.combat,acted:gameDebug.active().acted,hp:gameDebug.active().hp,enemy:gameDebug.state.enemies.find(e=>e.hp>0&&!e.dead),hero:{x:gameDebug.active().x,y:gameDebug.active().y},canAttack:gameDebug.state.enemies.some(e=>e.hp>0&&gameDebug.canAttack(gameDebug.active(),e))}));
        if(state.step>=17)return;
        assert(state.hp>0,'Training recovers unexpected knockouts without death');
        if(!state.combat){await page.waitForFunction(()=>gameDebug.state.combat);continue;}
        if(state.acted){await page.locator('#end').click();continue;}
        if(!state.canAttack){
          const move=await page.evaluate(()=>{const a=gameDebug.active(),e=gameDebug.state.enemies.find(e=>e.hp>0);return World.directions.map(([dx,dy])=>({x:e.x+dx,y:e.y+dy})).filter(c=>!gameDebug.blocked(c)&&!gameDebug.all().some(p=>p.hp>0&&p.x===c.x&&p.y===c.y)).map(c=>({c,route:gameDebug.pathTo(a,c)})).filter(x=>x.route&&x.route.length<=a.move).sort((a,b)=>a.route.length-b.route.length)[0]?.c;});
          if(!move){await page.locator('#end').click();continue;}
          await page.locator('#camera-center').click();await tapCell(page,move);await page.waitForFunction(c=>objectPrompt?.p?.x===c.x&&objectPrompt?.p?.y===c.y&&objectPrompt.actions.some(a=>a.id==='move'),move);
          await page.locator('.object-prompt [data-action=move]').click();await idle(page);continue;
        }
        // The visible prepared combat button uses the same real attack path.
        if(await page.locator('#adventure-combat .adventure-combat-toggle').getAttribute('aria-expanded')==='false')await page.locator('#adventure-combat .adventure-combat-toggle').click();
        await page.locator('#adventure-combat button:not(:disabled)').filter({hasText:/^Атаковать:/}).first().click();
      }
      throw Error('Training victory did not finish after 40 legal player actions');
    }
    for(const [classId,viewport]of [['fighter',{width:390,height:844}],['wizard',{width:320,height:568}],['rogue',{width:390,height:844}],['cleric',{width:320,height:568}]].filter(([id])=>!process.env.TUTORIAL_CLASSES||process.env.TUTORIAL_CLASSES.split(',').includes(id))){
      const context=await browser.newContext({viewport,isMobile:true,hasTouch:true,extraHTTPHeaders:{'x-qa-owner':'qa-tutorial-'+classId}});
      await context.addInitScript(()=>{localStorage.setItem('beyond-menu-preferences-explicit','true');localStorage.setItem('beyond-menu-preferences',JSON.stringify({lights:false,animations:false,grid:false,ambient:.28,intensity:1}));});
      const page=await context.newPage();activePage=page;page.setDefaultTimeout(30000);const errors=[],apiErrors=[];
      await page.addInitScript(()=>{window.qaPointerTrace=[];for(const type of ['pointerdown','pointerup','click'])window.addEventListener(type,event=>{qaPointerTrace.push({type,id:event.target?.id,x:event.clientX,y:event.clientY});qaPointerTrace=qaPointerTrace.slice(-12);},true);});
      page.on('pageerror',e=>{console.error('PAGEERROR',classId,e.stack||e.message);errors.push(e.message);});page.on('console',m=>{if(m.type()==='error'&&!(m.location().url===origin+'/api/worlds'&&m.text().includes('400')))errors.push(m.text());});page.on('response',r=>{if(r.url().includes('/api/')&&r.status()>=400&&!(r.status()===400&&r.request().method()==='POST'&&r.url().endsWith('/api/worlds')))apiErrors.push({url:r.url(),status:r.status()});});
      console.log('RUN tutorial',classId,viewport.width);await page.goto(origin,{waitUntil:'domcontentloaded',timeout:60000});await page.waitForFunction(()=>window.voxel?.ready,null,{timeout:60000});
      assert.equal(await page.evaluate(()=>typeof Tutorial?.render),'function','Tutorial runtime is integrated');
      assert.equal(await page.locator('#iphone-test').count(),0,'QA overlay is absent in the game and cannot cover camera controls');
      const hero=await newHero(page,classId,'Ученик '+classId);
      const skip=await page.evaluate(async heroId=>{const r=await fetch('/api/worlds',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({heroId,skipTutorial:true,seed:'forbidden-skip',size:'small'})});return r.status;},hero.id);assert.equal(skip,400,'First tutorial cannot skip through API');
      await page.evaluate(async hero=>{document.querySelectorAll('dialog').forEach(d=>d.close());await Worlds.choose(hero);},hero);
      await page.getByRole('button',{name:'Начать мир',exact:true}).click();await page.locator('#world-seed').fill('tutorial-'+classId);await page.locator('#world-size').selectOption('small');
      assert.equal(await page.locator('#skip-tutorial').isEnabled(),false,'First-world skip is disabled');
      await page.getByRole('button',{name:'Создать мир',exact:true}).click();await page.waitForFunction(()=>Worlds.current&&gameDebug.state.scene==='glade');
      await page.locator('#adventure-cinematic .adventure-choices button').click();
      if(classId==='fighter'){
        await flush(page);await page.reload({waitUntil:'domcontentloaded',timeout:60000});await page.waitForFunction(()=>window.voxel?.ready);await page.getByRole('button',{name:'Продолжить',exact:true}).click();await page.waitForFunction(()=>gameDebug.state.story?.intro===1);
      }
      await page.locator('#adventure-cinematic .adventure-choices button').click();await page.locator('#adventure-cinematic .adventure-choices button').click();
      console.log('INTRO_FINISHED',classId,await page.evaluate(()=>({story:gameDebug.state.story,busy:gameDebug.busy,panel:document.getElementById('adventure-cinematic')?.textContent})));await page.getByRole('button',{name:'Я найду дорогу. Беги в поселение.',exact:true}).click({timeout:90000});await page.waitForFunction(()=>gameDebug.state.story.npcDeparted&&Tutorial.active);await idle(page);await step(page,0);
      assert.equal(await page.evaluate(()=>gameDebug.state.party.length),1,'Solo hero only');assert.equal(await page.evaluate(()=>gameDebug.active().appearance.gender),hero.appearance.gender,'Chosen appearance preserved');
      await sizeCheck(page,classId,'start');
      const heroPoint=await point(page,await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y}))),mapBox=await page.locator('#viewport').boundingBox();
      assert(heroPoint.x>=mapBox.x&&heroPoint.x<=mapBox.x+mapBox.width&&heroPoint.y>=mapBox.y&&heroPoint.y<=mapBox.y+mapBox.height,'Hero is visible when the first tutorial prompt opens');
      await page.locator('#camera-center').click();
      const cell=await page.evaluate(()=>{const a=gameDebug.active(),r=document.getElementById('viewport').getBoundingClientRect();
        return [2,1].flatMap(distance=>World.directions.map(([dx,dy])=>({x:a.x+dx*distance,y:a.y+dy*distance}))).find(c=>{
          if(gameDebug.blocked(c)||gameDebug.props.some(p=>p.x===c.x&&p.y===c.y)||gameDebug.all().some(p=>p.x===c.x&&p.y===c.y))return false;
          const p=voxel.models.get(a.id).position.clone();p.set(c.x+.5,0,c.y+.5).project(voxel.camera);
          const px=r.left+(p.x+1)*r.width/2,py=r.top+(1-p.y)*r.height/2;
          const nearControl=[...document.querySelectorAll('#hud-health,.map-toolbar button,.tabs button,#episode-status,.object-prompt')].filter(el=>el.getClientRects().length).some(el=>{const b=el.getBoundingClientRect();return px>b.left-24&&px<b.right+24&&py>b.top-24&&py<b.bottom+24;});
          return !nearControl&&document.elementFromPoint(px,py)?.id==='voxel-canvas';
        });});
      assert(cell,'A visible free tile is available through the actual mobile viewport');
      await tapCell(page,cell);await step(page,1);const still=await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y}));assert.notDeepEqual(still,cell,'Select does not move');
      await page.locator('.object-prompt [data-action=move]').click();await step(page,2);await idle(page);assert.deepEqual(await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y})),cell);
      if(classId==='fighter')await reloadWorld(page,2);
      await page.locator('#camera-center').click();await step(page,3);await page.evaluate(()=>{window.qaCameraActions=[];window.addEventListener('game-action',event=>{if(event.detail.type==='camera')qaCameraActions.push(JSON.stringify(camera.state));});});await page.locator('#zoom-out').click();await step(page,4);assert.equal(await page.evaluate(()=>qaCameraActions.at(-1)),await page.evaluate(()=>JSON.stringify(camera.state)),'Camera event is emitted after the real zoom changes the camera');
      await page.locator('#camera-fit').click();
      const cache=await page.evaluate(()=>{const p=gameDebug.props.find(p=>p.id==='starter-cache');return{x:p.x,y:p.y};});await tapCell(page,cache,.45);await page.waitForFunction(()=>objectPrompt?.p?.id==='starter-cache');
      await idle(page);assert.equal(await page.evaluate(()=>gameDebug.state.tutorial.step),4,'Selecting a cache cannot activate a new popup action from the same touch');
      assert.equal(await page.evaluate(()=>objectPrompt?.p?.id),'starter-cache','The cache waits for a separate action press after touch selection');
      await page.locator('.object-prompt [data-action=use]').click();await step(page,5);await idle(page);
      await page.locator('#dialogue-options').getByRole('button',{name:/^Открыть/}).click();await step(page,6);await idle(page);assert.ok(await page.evaluate(()=>gameDebug.state.potions>0),'Actual supplies received');await page.locator('#dialogue-close').click();
      await page.locator('#tab-hero').click();await step(page,7);await page.locator('#tab-bag').click();await step(page,8);await sizeCheck(page,classId,'bag');
      if(classId==='fighter'){
        await page.locator('#bag-items button[title="Лечебное зелье"]').click();
        for(let disposal=0;disposal<20&&await page.evaluate(()=>gameDebug.state.potions>1);disposal++)await page.getByRole('button',{name:'Выбросить',exact:true}).click();
        assert.equal(await page.evaluate(()=>gameDebug.state.potions),1,'Actual UI disposal leaves one required potion');
        assert.equal(await page.getByRole('button',{name:'Выбросить',exact:true}).isEnabled(),false,'Last tutorial potion cannot be discarded');
        assert.match(await page.locator('.item-lock-note').textContent(),/обучен/,'The UI explains the reserved tutorial supply');
        await page.locator('#bag-equipped button[title="Кольчуга"]').click();await page.getByRole('button',{name:'Снять в рюкзак',exact:true}).click();await step(page,9);assert.equal(await page.evaluate(()=>gameDebug.active().armorEquipped),false);
        await page.locator('#bag-items button[title="Кольчуга"]').click();await page.getByRole('button',{name:'Надеть броню',exact:true}).click();
      }else{
        await page.locator('#tab-hero').click();const selected=classId==='rogue'?'Меч + факел':'Свободные руки';await page.locator('#hero-hands').getByRole('button',{name:selected,exact:true}).click();await step(page,9);
        const restore=classId==='wizard'?'Посох + свободная рука':classId==='cleric'?'Булава + свободная рука':'Меч + свободная рука';await page.locator('#hero-hands').getByRole('button',{name:restore,exact:true}).click();
      }
      await page.locator('#tab-map').click();await page.locator('#journal').click();await step(page,10);await page.locator('#close').click();
      await page.locator('#combat-tools-toggle').click();await step(page,11);
      const ability=({fighter:/^Второе дыхание/,wizard:/^Доспехи мага/,rogue:/^Рывок$/,cleric:/^Лечение ран/})[classId];await page.locator('#quick-actions').getByRole('button',{name:ability}).click();await step(page,12);await idle(page);
      await page.waitForFunction(()=>gameDebug.state.combat&&gameDebug.state.encounter?.id==='tutorial-win');await sizeCheck(page,classId,'combat');
      assert.equal(await page.locator('#adventure-combat .adventure-combat-toggle').getAttribute('aria-expanded'),'false','Prepared choices start collapsed so the hero remains visible');
      for(const id of ['combat-tools-toggle','end','potion']){
        const visibleControl=await page.locator('#'+id).evaluate(button=>{const r=button.getBoundingClientRect();return document.elementFromPoint(r.x+r.width/2,r.y+r.height/2)?.closest('button')===button;});
        assert.equal(visibleControl,true,'Prepared combat panel leaves required '+id+' control accessible');
      }
      await page.locator('#combat-tools-toggle').click();await page.locator('#quick-actions').getByRole('button',{name:'Уклониться',exact:true}).click();await step(page,13);await page.getByRole('button',{name:'Закрыть действия',exact:true}).click();
      await page.locator('#end').click();await step(page,14);await idle(page);
      for(let tries=0;tries<10&&!await page.locator('#potion').isEnabled();tries++){await page.locator('#end').click();await idle(page);}
      await page.locator('#potion').click();await step(page,15);await idle(page);
      await winBattle(page);await step(page,17);await idle(page);assert.equal(await page.evaluate(()=>gameDebug.state.encounter?.id),'tutorial-loss');
      assert.equal(await page.evaluate(()=>gameDebug.state.tutorial.completed),false,'Victory alone does not complete tutorial');assert.equal(await page.evaluate(()=>localStorage.getItem(TutorialRules.TUTORIAL_PROFILE_KEY)),null,'Marker is absent before rescue');
      await page.locator('#end').click();await step(page,19);await idle(page);assert.equal(await page.evaluate(()=>gameDebug.active().hp),0);assert.equal(await page.evaluate(()=>gameDebug.active().dead),false);
      if(classId==='fighter')await reloadWorld(page,19);
      await sizeCheck(page,classId,'rescue');await page.locator('#adventure-cinematic').getByRole('button',{name:'Далее',exact:true}).click();await page.locator('#adventure-cinematic').getByRole('button',{name:'Прийти в себя и продолжить',exact:true}).click();await step(page,20);await idle(page);
      assert.equal(await page.evaluate(()=>gameDebug.state.tutorial.completed),true);assert.equal(await page.evaluate(()=>Tutorial.active),false);assert.equal(await page.evaluate(()=>Tutorial.blocksPortals),false);assert.ok(await page.evaluate(()=>gameDebug.active().hp>0&&!gameDebug.active().dead));assert.equal(await page.evaluate(()=>localStorage.getItem(TutorialRules.TUTORIAL_PROFILE_KEY)),'1');
      assert.deepEqual(await page.evaluate(()=>Object.keys(gameDebug.state.tutorial.checks)),await page.evaluate(()=>TutorialRules.tutorialRequirements(gameDebug.active().classId).map(s=>s.id)));await flush(page);
      const recorded=db.prepare('SELECT snapshot FROM worlds WHERE id=?').get(await page.evaluate(()=>Worlds.current.id));assert.equal(JSON.parse(recorded.snapshot).tutorial.completed,true,'Completion persists through real Worker/SQLite');
      if(classId==='fighter'){
        const original=await page.evaluate(()=>({state:structuredClone(gameDebug.state),revision:Worlds.current.revision,id:Worlds.current.id}));
        await page.locator('#menu').click();await page.getByRole('button',{name:'Повторить обучение · отдельная практика',exact:true}).click();await page.waitForFunction(()=>Worlds.practice&&gameDebug.state.tutorial.mode==='practice');await step(page,0);
        await sizeCheck(page,classId,'practice');await page.locator('#menu').click();await page.getByRole('button',{name:'Вернуться из практики',exact:true}).click();await page.waitForFunction(()=>!Worlds.practice);
        assert.deepEqual(await page.evaluate(()=>structuredClone(gameDebug.state)),original.state,'Practice restores original snapshot exactly');assert.equal(await page.evaluate(()=>Worlds.current.id),original.id);assert.equal(await page.evaluate(()=>Worlds.current.revision),original.revision);
        await page.setViewportSize({width:320,height:568});await sizeCheck(page,classId,'complete');
      }
      assert.deepEqual(apiErrors,[],'No rejected saves '+classId);assert.deepEqual(errors,[],'No browser errors '+classId);
      console.log('PASS tutorial '+classId+': all 20 actual controls, legal class ability, ordinary-roll victory, unconscious rescue, profile completion '+viewport.width+'px');await context.close();
    }
    console.log('PASS tutorial browser: '+(process.env.TUTORIAL_CLASSES||'fighter,wizard,rogue,cleric')+'; actual controls, required class ability, victory/rescue and first-run skip protection');
  }catch(e){if(activePage&&!activePage.isClosed()){console.error('TUTORIAL_STATUS',await activePage.evaluate(()=>({tutorial:gameDebug.state.tutorial,story:gameDebug.state.story,busy:gameDebug.busy,hudActive:HUD.active,hudPending:HUD.pending,settings:gameDebug.state.settings,selected:gameDebug.selected,tab:viewsDebug.tab,qaPointerTrace:window.qaPointerTrace,cinematic:document.getElementById('adventure-cinematic')?.textContent,combat:gameDebug.state.combat,encounter:gameDebug.state.encounter,hp:gameDebug.active().hp,errors:document.getElementById('modal-body')?.textContent})).catch(()=>null));await activePage.screenshot({path:path.join(__dirname,'../qa/tutorial-failure.png')}).catch(()=>{});}throw e;}
  finally{await browser?.close();server.close();db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
