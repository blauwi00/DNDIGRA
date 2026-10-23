const assert=require('node:assert/strict'),fs=require('node:fs'),http=require('node:http'),path=require('node:path');
const {chromium}=require('playwright');
const {configureBrowserPage}=require('./browser-harness.cjs');
const root=path.resolve(__dirname,'../dist'),artifacts='/tmp/dndigra-prologue-qa';
const server=http.createServer((req,res)=>{const url=new URL(req.url,'http://localhost');if(url.pathname==='/favicon.ico'){res.writeHead(204);return res.end();}try{const file=path.join(root,url.pathname==='/'?'index.html':url.pathname);res.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png'})[path.extname(file).slice(1)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
(async()=>{
 fs.mkdirSync(artifacts,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser,page;const errors=[];
 try{
  browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  page=await browser.newPage({viewport:{width:852,height:393},isMobile:true,hasTouch:true});await configureBrowserPage(page);page.setDefaultTimeout(120000);page.on('pageerror',e=>errors.push(e.message));
  const idle=()=>page.waitForFunction(()=>!gameDebug.busy&&!HUD.active,null,{timeout:60000});
  const phase=p=>page.waitForFunction(p=>gameDebug.state.prologue?.phase===p,p);
  async function choice(text){await page.locator('#dialogue-options button').filter({hasText:text}).click();await idle();}
  async function interact(id){
   console.log('INTERACT',id);
   await idle();await page.evaluate(id=>{closeDialogue();const p=gameDebug.props.find(p=>p.id===id);if(!p)throw Error('Missing '+id);camera.center(p,true);gameDebug.select(p);},id);
   const use=page.locator('.object-prompt [data-action="use"]');await use.waitFor({state:'visible'});assert.ok(await use.isEnabled(),'Object is reachable: '+id);await use.click();await idle();await page.locator('#dialogue').waitFor({state:'visible'});
   assert.equal(await page.evaluate(id=>{const a=gameDebug.active(),p=gameDebug.props.find(p=>p.id===id);return Math.abs(a.x-p.x)+Math.abs(a.y-p.y);},id),1,'Interaction walks to the object: '+id);
  }
  async function resume(){await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready&&window.CinematicMenu?.active);await page.evaluate(()=>window.Prologue.open());await page.getByRole('button',{name:'Продолжить · Бор',exact:true}).click();await idle();}
  await page.goto('http://127.0.0.1:'+server.address().port+'/?offline=1',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready&&window.CinematicMenu?.active);
  await page.evaluate(()=>window.Prologue.open());await page.getByRole('button',{name:'Начать с готовым воином',exact:true}).click();
  await phase('day1');await page.getByRole('button',{name:'Выйти во двор',exact:true}).click();
  await page.evaluate(()=>{gameDebug.state.settings.animations=false;gameDebug.render();});
  await page.screenshot({path:artifacts+'/day1.png'});
  await interact('carriage');assert.equal(await page.locator('#dialogue-options').getByText('Отправиться в путь').count(),0,'Cannot skip village days');await choice('Закончить');
  await interact('prologue-oren');await choice('Я договорился');
  await interact('home-supplies');await choice('Забрать дорожный');
  await interact('prologue-lisa');await choice('Передать дорожный');
  await interact('home-bed');await choice('Лечь спать');await phase('day2');console.log('PASS day 1: real movement, conversations, supplies and sleep');
  await interact('prologue-lisa');await choice('Закрепить груз');await interact('rope');await choice('Взять верёвку');
  await resume();await phase('day2');assert.equal(await page.evaluate(()=>gameDebug.state.prologue.prepared),true,'Preparation survives reload');
  await interact('home-bed');await choice('Лечь спать');await phase('departure');
  await interact('carriage');await choice('Отправиться в путь');await phase('ride');
  assert.equal(await page.locator('#cells .cell').count(),32*23,'Scene transition rebuilds the accessible map cells');
  await page.screenshot({path:artifacts+'/departure.png'});
  await page.getByRole('button',{name:'Прикрыть торговку',exact:true}).click();await idle();
  await resume();await phase('ambush');console.log('PASS day 2, choice, departure and combat reload');
  for(let i=0;i<60;i++){
   await idle();const s=await page.evaluate(()=>({phase:gameDebug.state.prologue.phase,combat:gameDebug.state.combat,hp:gameDebug.active().hp,max:gameDebug.active().max,acted:gameDebug.active().acted,potions:gameDebug.state.potions,bonus:gameDebug.active().bonusUsed}));
   if(s.phase==='crash')break;
   if(!s.combat){await page.getByRole('button',{name:s.hp>0?'Вступить в бой':'Повторить бой',exact:true}).click();continue;}
   if(s.hp<s.max-3&&s.potions&&!s.bonus){await page.locator('#combat-tools-toggle').click();await page.locator('#potion').click();continue;}
   if(s.acted){await page.locator('#end').click();continue;}
   await page.locator('#combat-tools-toggle').click();await page.locator('#hud-target-actions button:not(:disabled)').first().click();
  }
  await phase('crash');assert.equal(await page.evaluate(()=>gameDebug.active().hp),0);assert.equal(await page.locator('#death-screen[open]').count(),0,'Story knockout has its own recovery');
  await page.screenshot({path:artifacts+'/crash.png'});await resume();await phase('crash');
  await page.getByRole('button',{name:'Прийти в себя',exact:true}).click();await phase('aftermath');assert.ok(await page.evaluate(()=>gameDebug.active().hp>0));
  await interact('prologue-lisa');assert.match(await page.locator('#dialogue-text').innerText(),/Верёвки удержали/);await choice('Я осмотрю обочину');
  await interact('trail');await choice('Прочитать следы');await interact('stolen-bag');await choice('Забрать сумку');
  await interact('prologue-lisa');await choice('Вернуть сумку');await phase('done');assert.equal(await page.evaluate(()=>gameDebug.state.gold),15);await page.screenshot({path:artifacts+'/ending.png'});
  await resume();await phase('done');assert.equal(await page.evaluate(()=>gameDebug.state.gold),15,'Reward does not duplicate on reload');
  await page.getByRole('button',{name:'Осмотреться у кареты',exact:true}).click();await interact('prologue-lisa');assert.equal(await page.locator('#dialogue-options').getByText('Вернуть сумку').count(),0);await choice('Закончить');
  await page.setViewportSize({width:390,height:844});await page.locator('#prologue-goal').click();assert.ok(await page.locator('#modal').isVisible());await page.locator('#close').click();await page.screenshot({path:artifacts+'/portrait.png'});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No phone overflow');
  await page.locator('#menu').click();await page.locator('#hud-open-settings').click();await page.getByRole('button',{name:'Сохранить и выйти',exact:true}).click();await page.waitForFunction(()=>CinematicMenu.active&&!gameDebug.state.prologue);
  assert.equal(await page.evaluate(()=>localStorage.getItem(Worlds.resumeKey)),null,'Episode never overwrites main resume destination');
  assert.deepEqual(errors,[],'No runtime errors');console.log('PASS full caravan story, real D&D battle, aftermath, saved consequence, recovery, reward idempotency and exit');
 }catch(e){if(page){console.error('STATE',await page.evaluate(()=>({phase:window.gameDebug?.state.prologue,scene:window.gameDebug?.state.scene,active:window.gameDebug?.active(),errors:document.getElementById('cinema-status')?.textContent})).catch(()=>null));await page.screenshot({path:artifacts+'/failure.png'}).catch(()=>{});}throw e;}
 finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
