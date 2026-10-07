const assert=require('node:assert/strict'),fs=require('fs'),http=require('http'),path=require('path');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
 const root=path.resolve(__dirname,'../dist'),errors=[],server=http.createServer((q,r)=>{
   if(q.url.startsWith('/api/')){r.setHeader('Content-Type','application/json');r.end(JSON.stringify({heroes:[],worlds:[]}));return;}
   const filename=root+(q.url.split('?')[0]==='/'?'/index.html':q.url.split('?')[0]);
   try{r.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',png:'image/png',svg:'image/svg+xml'})[filename.split('.').pop()]||'application/octet-stream');r.end(fs.readFileSync(filename));}catch{r.statusCode=404;r.end();}
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
 try{
 browser=await chromium.launch({...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{}),args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader',...JSON.parse(process.env.CHROMIUM_ARGS||'[]')]});
 const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.voxel?.ready&&window.voxel.menuDebug);
 fs.mkdirSync(path.resolve(__dirname,'../qa'),{recursive:true});await page.waitForTimeout(1200);
 await page.screenshot({path:root+'/../qa/menu-main-390.png'});
 assert.equal(await page.getByRole('navigation',{name:'Главное меню'}).getByRole('button').count(),5);
 const before=await page.evaluate(()=>({debug:voxel.menuDebug,world:JSON.stringify(gameDebug.state)}));await page.waitForTimeout(500);
 const after=await page.evaluate(()=>({debug:voxel.menuDebug,world:JSON.stringify(gameDebug.state)}));
 assert.notDeepEqual(after.debug.camera,before.debug.camera,'Camera moves');assert.notDeepEqual(after.debug.patrons,before.debug.patrons,'Patrons move');assert.equal(after.world,before.world,'Presentation cannot change world state');
 await page.getByRole('button',{name:'Настройки',exact:true}).click();await page.waitForTimeout(350);await page.screenshot({path:root+'/../qa/menu-settings-390.png'});
 await page.getByRole('switch',{name:'Анимации'}).click();await page.waitForTimeout(100);const paused=await page.evaluate(()=>voxel.menuDebug);await page.waitForTimeout(300);assert.deepEqual((await page.evaluate(()=>voxel.menuDebug)).patrons,paused.patrons,'Animations off freezes patrons');assert.equal((await page.evaluate(()=>voxel.menuDebug)).clock,paused.clock,'Animation clock frozen');
 await page.getByRole('switch',{name:'Анимации'}).click();await page.getByRole('switch',{name:'Показывать сетку'}).click();assert.equal(await page.evaluate(()=>gameDebug.state.settings.grid),true);
 await page.getByRole('slider',{name:'Общий свет',exact:true}).fill('0.65');assert.equal(await page.evaluate(()=>gameDebug.state.settings.ambient),.65);
 await page.getByRole('tab',{name:'Управление',exact:true}).click();await page.getByRole('switch',{name:'Инерция вращения'}).click();assert.equal(await page.evaluate(()=>CinematicMenu.controls.inertia),false);await page.getByRole('slider',{name:'Скорость поворота героя'}).fill('1.25');assert.equal(await page.evaluate(()=>CinematicMenu.controls.sensitivity),1.25);await page.getByRole('tab',{name:'Отображение',exact:true}).click();await page.getByRole('button',{name:'Сбросить настройки'}).click();assert.equal(await page.evaluate(()=>gameDebug.state.settings.ambient),.28);
 await page.getByRole('button',{name:'Назад',exact:true}).click();await page.getByRole('button',{name:'Новая игра',exact:true}).click();await page.waitForTimeout(700);
 await page.screenshot({path:root+'/../qa/menu-hero-base-390.png'});
 await page.getByRole('button',{name:'3 · Внешность',exact:true}).click();await page.waitForTimeout(500);await page.screenshot({path:root+'/../qa/menu-hero-look-390.png'});assert.ok(await page.evaluate(()=>document.querySelector('.hero-basics').getBoundingClientRect().bottom<=document.querySelector('.look-tabs').getBoundingClientRect().top),'Basics cannot overlap appearance panel');
 const model=page.locator('.look-model > .look-slot');const rect=await model.boundingBox();const rotation=await page.evaluate(()=>voxel.menuDebug.rotation);
 await page.mouse.move(rect.x+rect.width*.35,rect.y+rect.height*.5);await page.mouse.down();await page.mouse.move(rect.x+rect.width*.75,rect.y+rect.height*.5,{steps:8});await page.mouse.up();await page.waitForTimeout(120);
 assert.ok(Math.abs(await page.evaluate(()=>voxel.menuDebug.rotation)-rotation)>.3,'Continuous rotation changes angle');const released=await page.evaluate(()=>voxel.menuDebug.rotation);await page.waitForTimeout(120);assert.notEqual(await page.evaluate(()=>voxel.menuDebug.rotation),released,'Rotation continues with inertia');
 await page.getByRole('tab',{name:'Волосы',exact:true}).click();await page.getByRole('button',{name:'Причёска: Коса',exact:true}).click();await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>Heroes.draft.appearance.hairStyle),'braid');
 for(const size of [{width:320,height:480},{width:390,height:844},{width:900,height:900}]){await page.setViewportSize(size);await page.waitForTimeout(250);const r=await page.evaluate(()=>({footer:document.getElementById('heroes-footer').getBoundingClientRect().toJSON(),body:document.getElementById('heroes-body').getBoundingClientRect().toJSON(),width:document.body.scrollWidth,contentWidth:document.getElementById('heroes-body').scrollWidth,contentClient:document.getElementById('heroes-body').clientWidth}));assert.ok(r.contentWidth<=r.contentClient+1,'Dialog cannot scroll horizontally');await page.evaluate(()=>document.getElementById('heroes-body').scrollTop=0);assert.ok(r.footer.bottom<=size.height+1);assert.ok(r.body.height>100);assert.ok(r.width<=size.width);await page.screenshot({path:root+'/../qa/menu-editor-'+size.width+'.png'});}
 await page.setViewportSize({width:390,height:844});await page.locator('#heroes-close').click();await page.getByRole('button',{name:'Миры',exact:true}).click();await page.waitForFunction(()=>document.getElementById('heroes-title').textContent==='Миры');assert.equal(await page.locator('#heroes-title').innerText(),'Миры');await page.locator('#heroes-close').click();
 await page.reload();await page.waitForFunction(()=>window.voxel?.menuDebug);await page.getByRole('button',{name:'Новая игра',exact:true}).click();assert.equal(await page.evaluate(()=>Heroes.draft.appearance.hairStyle),'braid','Draft survives reload');
 assert.deepEqual(errors,[],'No browser errors');console.log('PASS live tavern, pause, settings, rotation inertia, appearance, draft, worlds entry and 320/390/900 layouts');
 }finally{await browser?.close();server.close();}
})().catch(e=>{console.error(e);process.exit(1)});
