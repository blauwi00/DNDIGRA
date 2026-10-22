const assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const {chromium}=require('playwright');const {configureBrowserPage}=require('./browser-harness.cjs');
const root=path.resolve(__dirname,'../dist'),out='/workspace/inventory-screenshots';
const server=http.createServer((q,r)=>{if(q.url.startsWith('/api')){r.setHeader('Content-Type','application/json');return r.end(JSON.stringify({heroes:[],worlds:[]}));}try{const f=path.join(root,q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);r.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',png:'image/png',svg:'image/svg+xml'})[f.split('.').pop()]||'application/octet-stream');r.end(fs.readFileSync(f));}catch{r.statusCode=404;r.end();}});
(async()=>{fs.mkdirSync(out,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;try{
 browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});await configureBrowserPage(page);const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port+'/?offline=1');await page.waitForFunction(()=>window.voxel?.ready&&window.Combat);

 await page.evaluate(()=>{
  CinematicMenu.play();Worlds.detach();document.querySelectorAll('dialog[open]').forEach(d=>d.close());gameDebug.test('reset');
  const s=gameDebug.state,a=gameDebug.active();delete s.tutorial;delete s.prologue;s.combat=false;s.settings.animations=false;
  a.inventory=['Меч','Щит','Кольчуга','Меч','Верёвка','Рационы · 5 дней','Рационы · 5 дней','Чернила и перо','Бинты','Кожаный пояс'];a.hands=['sword','shield'];a.armorEquipped=true;a.torches=2;s.potions=3;s.gold=125;
  gameDebug.render();viewsDebug.switchTab('bag');
 });
 const inventory=await page.evaluate(()=>JSON.stringify(gameDebug.active().inventory));
 await page.locator('#bag-search').fill('верев');assert.equal(await page.locator('#bag-items .bag-item').count(),1);
 assert.match(await page.locator('#item-detail h2').textContent(),/Верёвка/);
 await page.locator('#bag-search').fill('нет такой вещи');assert.equal(await page.locator('#bag-items .bag-item').count(),0);
 await page.getByRole('button',{name:'Показать все предметы'}).click();
 await page.locator('#bag-sort').selectOption('quantity');assert.equal(await page.evaluate(()=>JSON.stringify(gameDebug.active().inventory)),inventory);
 await page.locator('#bag-filters [data-group="supplies"]').click();assert.equal(await page.locator('#bag-items .bag-item').count(),4);
 await page.locator('#bag-filters [data-group="all"]').click();
 for(const size of [{width:390,height:844},{width:844,height:390},{width:320,height:568}]){
  await page.setViewportSize(size);await page.locator('#bag-items [data-item-id="potion"]').click();
  const bounds=await page.evaluate(()=>({width:document.documentElement.scrollWidth,detail:document.getElementById('item-detail').getBoundingClientRect().toJSON(),bag:document.getElementById('bag-view').getBoundingClientRect().toJSON()}));
  assert.ok(bounds.width<=size.width,'No horizontal overflow');assert.ok(bounds.detail.height>120,'Readable detail pane');assert.ok(bounds.bag.bottom<=size.height+1,'Bag fits screen');
  await page.screenshot({path:out+'/bag-'+size.width+'x'+size.height+'.png'});
 }
 await page.setViewportSize({width:390,height:844});
 await page.locator('#bag-items [data-item-id="gear3"]').click();assert.equal(await page.getByRole('button',{name:'Выбросить',exact:true}).isEnabled(),true,'Spare sword can be dropped while primary sword stays held');
 await page.getByRole('button',{name:'Выбросить',exact:true}).click();await page.locator('#modal').getByRole('button',{name:'Отмена',exact:true}).click();
 assert.equal(await page.evaluate(()=>JSON.stringify(gameDebug.active().inventory)),inventory,'Cancel preserves inventory');
 await page.getByRole('button',{name:'Выбросить',exact:true}).click();
 await page.evaluate(()=>gameDebug.active().inventory.unshift('Новая вещь'));
 await page.locator('#modal').getByRole('button',{name:'Выбросить',exact:true}).click();
 assert.equal(await page.evaluate(()=>gameDebug.active().inventory.filter(n=>n==='Меч').length),2,'Stale confirmation cannot drop a shifted item');
 await page.locator('#bag-search').fill('верев');await page.locator('#bag-items .bag-item').click();
 await page.getByRole('button',{name:'Выбросить',exact:true}).click();await page.locator('#modal').getByRole('button',{name:'Выбросить',exact:true}).click();
 assert.equal(await page.evaluate(()=>gameDebug.active().inventory.includes('Верёвка')),false);
 const drop=await page.evaluate(()=>gameDebug.state.drops.find(d=>d.name==='Верёвка'));assert.ok(drop);
 await page.evaluate(id=>Inventory.pickup(gameDebug.state.drops.find(d=>d.id===id)),drop.id);
 assert.equal(await page.evaluate(()=>gameDebug.active().inventory.filter(n=>n==='Верёвка').length),1);
 await page.locator('#bag-search').fill('');
 await page.evaluate(()=>{gameDebug.state.combat=true;gameDebug.render()});
 await page.locator('#bag-items [title="Кожаный пояс"]').click();assert.equal(await page.getByRole('button',{name:'Выбросить',exact:true}).isDisabled(),true);

 await page.evaluate(()=>{const a=gameDebug.active();gameDebug.state.combat=false;a.inventory=['Меч','Щит','Кольчуга',...Array.from({length:20},(_,i)=>'Находка '+i)];a.hands=['sword','shield'];a.armorEquipped=true;a.torches=0;gameDebug.state.potions=0;gameDebug.render();});
 assert.match(await page.locator('#bag-status').textContent(),/заполнен/);
 await page.locator('#bag-equipped [title="Кольчуга"]').click();await page.getByRole('button',{name:'Снять в рюкзак',exact:true}).click();
 assert.equal(await page.evaluate(()=>gameDebug.active().armorEquipped),true,'Full backpack cannot swallow equipped armor');
 await page.evaluate(()=>document.querySelectorAll('dialog[open]').forEach(d=>d.close()));
 await page.evaluate(()=>{gameDebug.active().hp=0;gameDebug.render();});
 await page.locator('#bag-items [title="Находка 0"]').click();assert.equal(await page.getByRole('button',{name:'Выбросить',exact:true}).isDisabled(),true);
 assert.deepEqual(errors,[]);console.log('PASS inventory browsing, portrait/landscape layouts, cancellation, stale confirmation, drop/pickup and combat guards');
 }finally{await browser?.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1});
