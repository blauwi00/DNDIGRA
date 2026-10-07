// Real Worker API + SQLite + browser: no mocked world creation or saves.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
  const {default:worker}=await import('../dist/server/index.js');
  const db=new DatabaseSync(':memory:');
  for(const f of fs.readdirSync(path.join(__dirname,'../drizzle')).filter(f=>f.endsWith('.sql')).sort())db.exec(fs.readFileSync(path.join(__dirname,'../drizzle',f),'utf8'));
  const DB={async batch(qs){db.exec('BEGIN');try{const a=[];for(const q of qs)a.push(await q.run());db.exec('COMMIT');return a;}catch(e){db.exec('ROLLBACK');throw e;}},prepare(sql){const q=db.prepare(sql);return{bind(...args){return{all:async()=>({results:q.all(...args)}),run:async()=>({meta:{changes:q.run(...args).changes}})}}}}};
  const server=http.createServer(async(q,r)=>{try{
    if(q.url.startsWith('/api/')){
      const chunks=[];if(!['GET','HEAD'].includes(q.method))for await(const chunk of q)chunks.push(chunk);
      const response=await worker.fetch(new Request('http://127.0.0.1:'+server.address().port+q.url,{method:q.method,headers:{...q.headers,'oai-authenticated-user-id':'qa-owner'},body:['GET','HEAD'].includes(q.method)?undefined:Buffer.concat(chunks)}),{DB});
      r.writeHead(response.status,Object.fromEntries(response.headers));return r.end(Buffer.from(await response.arrayBuffer()));
    }
    const f=path.join(__dirname,'../dist',q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);
    r.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png'})[f.split('.').pop()]||'application/octet-stream');r.end(fs.readFileSync(f));
  }catch(e){r.statusCode=500;r.end(String(e));}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{
    browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.voxel?.ready);
    await page.evaluate(()=>{document.querySelectorAll('dialog').forEach(d=>d.close());Heroes.start(true);Heroes.open();});
    await page.getByRole('button',{name:'Подтвердить героя',exact:true}).click();await page.locator('#world-seed').fill('integration-large');await page.locator('#world-size').selectOption('large');await page.getByRole('button',{name:'Создать мир',exact:true}).click();
    await page.waitForFunction(()=>Worlds.current&&gameDebug.state.scene==='town');
    const deathRoll=await page.evaluate(async()=>{
      gameDebug.state.settings.animations=false;await GeneratedWorlds.ensure('dng:1');gameDebug.enterScene('dng:1');
      const a=gameDebug.active(),s=gameDebug.scene;const trap=s.traps.find(t=>World.directions.some(([dx,dy])=>!gameDebug.blocked({x:t.x+dx,y:t.y+dy})&&!gameDebug.blocked({x:t.x-dx,y:t.y-dy})));if(!trap)throw Error('No straight floor-trap route');
      const [dx,dy]=World.directions.find(([dx,dy])=>!gameDebug.blocked({x:trap.x+dx,y:trap.y+dy})&&!gameDebug.blocked({x:trap.x-dx,y:trap.y-dy}));
      a.x=trap.x+dx;a.y=trap.y+dy;a.hp=1;gameDebug.roll=n=>n===20?1:n;gameDebug.render();camera.center(a,true);
      const target={x:trap.x-dx,y:trap.y-dy};gameDebug.mapTap(target);const action=objectPrompt.actions.find(a=>a.id==='move');if(!action?.enabled)throw Error('No move action');gameDebug.dismissMapActions();action.run();return {x:trap.x,y:trap.y,target};
    });
    await page.waitForFunction(()=>HUD.active);assert.match(await page.locator('#check-title').innerText(),/Спасбросок от ловушки/);
    await page.waitForFunction(()=>document.getElementById('death-screen')?.open&&!gameDebug.busy);
    assert.deepEqual(await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y})),{x:deathRoll.x,y:deathRoll.y});
    assert.equal(await page.evaluate(()=>gameDebug.active().hp),0);assert.match(await page.locator('.death-cause').innerText(),/Спасбросок.*урон/);
    await page.screenshot({path:'qa/death-trap-390.png'});
    await page.keyboard.press('Escape');assert.equal(await page.locator('#death-screen').evaluate(d=>d.open),true);
    await page.evaluate(async()=>{gameDebug.save();Worlds.capture();if(!await Worlds.flush())throw Error('Death save failed');});const worldId=await page.evaluate(()=>Worlds.current.id);
    await page.getByRole('button',{name:'В главное меню',exact:true}).click();await page.waitForFunction(()=>CinematicMenu.active);
    await page.getByRole('button',{name:'Продолжить',exact:true}).click();await page.waitForFunction(()=>document.getElementById('death-screen')?.open);
    assert.equal(await page.evaluate(()=>Worlds.current.id),worldId);assert.equal(await page.evaluate(()=>gameDebug.active().hp),0);
    await page.reload();await page.waitForFunction(()=>voxel.ready);await page.getByRole('button',{name:'Продолжить',exact:true}).click();await page.waitForFunction(()=>document.getElementById('death-screen')?.open);
    assert.equal(await page.evaluate(()=>gameDebug.active().hp),0,'Reload must not resurrect');
    // Zero HP is unconsciousness, not irreversible death. Exercise normal DND saves.
    await page.evaluate(()=>{const a=gameDebug.active();a.dead=false;a.death={success:0,failure:0,stable:false};gameDebug.render();const original=DND.death;DND.death=p=>original(p,()=>1);});
    await page.getByRole('button',{name:'Спасбросок от смерти',exact:true}).click();await page.waitForFunction(()=>document.getElementById('death-screen')?.open);
    assert.equal(await page.evaluate(()=>gameDebug.active().death.failure),2);
    await page.getByRole('button',{name:'Спасбросок от смерти',exact:true}).click();await page.waitForFunction(()=>document.getElementById('death-title')?.textContent==='Вы погибли');
    assert.equal(await page.evaluate(()=>gameDebug.active().dead),true);assert.equal(await page.getByRole('button',{name:'Спасбросок от смерти',exact:true}).count(),0);
    await page.screenshot({path:'qa/death-final-390.png'});
    await page.setViewportSize({width:320,height:568});assert.equal(await page.evaluate(()=>document.body.scrollWidth<=320),true);
    await page.screenshot({path:'qa/death-final-320.png'});
    assert.deepEqual(errors,[]);console.log('PASS visible trap save, lethal movement stop, death/unconscious UI, Escape guard, persisted defeat, menu/reload and DND death saves at 390/320');
  }finally{await browser?.close();server.close();db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
