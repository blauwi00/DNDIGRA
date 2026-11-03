const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const {configureBrowserPage}=require('./browser-harness.cjs');
const root=path.resolve(__dirname,'../dist'),artifacts='/tmp/dndigra-cinema-qa';
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname==='/favicon.ico'){res.writeHead(204);return res.end();}try{const file=path.join(root,url.pathname==='/'?'index.html':url.pathname);res.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png'})[path.extname(file).slice(1)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
(async()=>{
 fs.mkdirSync(artifacts,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,page;const errors=[];
 try{
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  page=await browser.newPage({viewport:{width:852,height:393},isMobile:true,hasTouch:true});await configureBrowserPage(page);page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/?offline=1',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready&&window.CinematicMenu?.active);
  await page.evaluate(()=>localStorage.setItem('local-dndigra.prologue.v1','existing-episode-must-survive'));
  await page.evaluate(()=>{window.Prologue.preview();});
  for(const kind of ['road','crash','wake']){
   await page.waitForFunction(k=>CaravanCinema.kind===k,kind);if(await page.locator('.caravan-pause').getAttribute('aria-pressed')==='false')await page.locator('.caravan-pause').click();
   assert.equal(await page.locator('.caravan-pause').getAttribute('aria-pressed'),'true');
   assert.equal(await page.evaluate(()=>Prologue.locked),true,'Scene blocks map actions');
   const position=await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y}));
   await page.evaluate(()=>gameDebug.mapTap({x:11,y:12}));assert.deepEqual(await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y})),position);
   await page.screenshot({path:artifacts+'/'+kind+'.png'});console.log('PASS scene',kind);
   if(kind==='crash')assert.ok(await page.evaluate(()=>voxel.models.get('prop:carriage').rotation.z<-.5),'The cart starts upright before the visible overturn');
   if(kind==='road'){await page.locator('.caravan-sound').click();assert.equal(await page.locator('.caravan-sound').getAttribute('aria-pressed'),'true');await page.locator('.caravan-sound').click();}
   if(kind==='wake'){
    await page.setViewportSize({width:390,height:844});await page.screenshot({path:artifacts+'/phone.png'});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.locator('.caravan-pause').click();await page.waitForFunction(()=>gameDebug.state.prologue.previewFinished&&!CaravanCinema.active,null,{timeout:120000});
   }else await page.locator('.caravan-skip').click();
  }
  await page.getByRole('button',{name:'В главное меню',exact:true}).click();await page.waitForFunction(()=>CinematicMenu.active&&!Prologue.active);
  assert.equal(await page.evaluate(()=>localStorage.getItem('local-dndigra.prologue.v1')),'existing-episode-must-survive');assert.equal(await page.evaluate(()=>document.body.classList.contains('caravan-playing')),false);
  // Start at the road checkpoint to verify the ordinary (non-preview) lifecycle.
  await page.evaluate(()=>{window.Prologue.preview();});await page.waitForFunction(()=>CaravanCinema.kind==='road');
  await page.locator('.caravan-pause').click();
  await page.evaluate(()=>{CaravanCinema.stop();delete gameDebug.state.prologue.preview;gameDebug.save();gameDebug.render();});
  await page.waitForFunction(()=>CaravanCinema.kind==='road');await page.locator('.caravan-skip').click();
  assert.equal(await page.evaluate(()=>gameDebug.state.prologue.cinemaSeen.road),true);assert.equal(await page.evaluate(()=>gameDebug.state.prologue.phase),'ride');
  assert.ok(await page.getByRole('button',{name:'Прикрыть торговку',exact:true}).isVisible(),'Cinematic hands control to the real battle choice');
  await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready&&CinematicMenu.active);
  await page.evaluate(()=>window.Prologue.open());await page.getByRole('button',{name:'Продолжить · Бор',exact:true}).click();
  await page.waitForFunction(()=>gameDebug.state.prologue?.phase==='ride');assert.equal(await page.evaluate(()=>CaravanCinema.active),false,'Seen scene does not replay after reload');
  await page.getByRole('button',{name:'Прикрыть торговку',exact:true}).click();await page.waitForFunction(()=>gameDebug.state.combat&&!gameDebug.busy&&!HUD.active,null,{timeout:120000});
  assert.equal(await page.evaluate(()=>gameDebug.state.encounter.id),'prologue-thief');assert.deepEqual(errors,[]);
  console.log('PASS preview save isolation, pause/skip/natural end, portrait, ordinary checkpoint and battle handoff');
 }catch(e){console.error(e);console.error('STATE',await page?.evaluate(()=>({kind:CaravanCinema.kind,phase:gameDebug.state.prologue})));if(page)await page.screenshot({path:artifacts+'/failure.png'}).catch(()=>{});throw e;}
 finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
