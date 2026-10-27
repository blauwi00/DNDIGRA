// Real Chromium, local IndexedDB API and actual controls. Placement/battle
// fixtures are explicit; the test does not claim physical iPhone performance.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {configureBrowserPage} = require('./browser-harness.cjs');

(async () => {
  const client = path.resolve(__dirname, '../dist/client');
  const apiRequests = [];
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (pathname === '/favicon.ico') { res.writeHead(204); res.end(); return; }
    if (pathname.startsWith('/api/')) { apiRequests.push(pathname); res.writeHead(503); res.end(); return; }
    const file = path.resolve(client, '.' + (pathname === '/' ? '/index.html' : decodeURIComponent(pathname)));
    if (!file.startsWith(client + path.sep)) { res.writeHead(403); res.end(); return; }
    try {
      res.setHeader('Content-Type', {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.woff':'font/woff', '.ttf':'font/ttf'}[path.extname(file)] || 'application/octet-stream');
      res.setHeader('Cache-Control', 'no-store'); res.end(fs.readFileSync(file));
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const screenshots = process.env.REGION_QA_DIR || path.resolve(__dirname, '../qa/region');
  fs.mkdirSync(screenshots, {recursive:true});
  let browser;
  try {
    const rules = await import('../src/hero-rules.js');
    browser = await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE || '/usr/bin/chromium', args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader', ...JSON.parse(process.env.CHROMIUM_ARGS || '[]')]});
    const page = await browser.newPage({viewport:{width:390,height:844}, isMobile:true, hasTouch:true});
    await configureBrowserPage(page);
    const errors = []; page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.goto(origin + '/?offline=1', {waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => window.voxel?.ready && window.NativeRuntime?.offline);
    assert.equal(await page.evaluate(() => typeof Worlds.startRegionWalk), 'function', 'Published assets include isolated region walk');
    assert.equal(await page.evaluate(() => typeof voxel.regionStats), 'object', 'Renderer exposes streaming evidence');

    const draft = {name:'Путница региона',classId:'fighter',stats:rules.preset('fighter'),appearance:{...Object.fromEntries(Object.entries(rules.COLORS).map(([k,v])=>[k,v[0]])),gender:'female',hairStyle:'short'},kit:0,background:rules.background('fighter',()=>0)};
    const originalId = await page.evaluate(async draft => {
      async function post(route, body) { const r = await fetch('/api/' + route, {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}); const data = await r.json(); if (!r.ok) throw Error(data.error); return data; }
      const {hero} = await post('heroes', draft);
      const {world} = await post('worlds', {heroId:hero.id,seed:'region-original-adventure',size:'small'});
      document.querySelectorAll('dialog').forEach(d => d.close()); Worlds.attach(world);
      gameDebug.state.settings.animations = false; return world.id;
    }, draft);
    await page.getByRole('button', {name:'Далее',exact:true}).click();
    await page.getByRole('button', {name:'Далее',exact:true}).click();
    await page.getByRole('button', {name:'Начать путь',exact:true}).click();
    await page.getByRole('button', {name:'Я найду дорогу. Беги в поселение.',exact:true}).click();
    await page.waitForFunction(() => gameDebug.state.story.npcDeparted && !gameDebug.busy && !HUD.pending);
    const original = await page.evaluate(async () => {
      gameDebug.save(); if (!await Worlds.flush()) throw Error('Original save failed');
      return {state:JSON.stringify(gameDebug.state), revision:Worlds.current.revision, resume:localStorage.getItem(Worlds.resumeKey)};
    });
    await page.locator('#menu').click();
    await page.getByRole('button', {name:'Прогулка по окрестностям',exact:true}).click();
    await page.waitForFunction(() => Worlds.practiceKind === 'region' && gameDebug.state.scene === 'region-walk');
    async function settled() {
      await page.waitForFunction(() => voxel.regionStats.enabled && voxel.regionStats.idle && voxel.regionStats.ready > 0);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    }
    async function stats() { return page.evaluate(() => voxel.regionStats); }
    async function center(cell) { await page.evaluate(cell => camera.center(cell, true), cell); await settled(); }
    async function point(cell, height=.07) {
      return page.evaluate(({cell,height}) => { const v = voxel.camera.position.clone().set(cell.x+.5,height,cell.y+.5).project(voxel.camera), r = voxel.renderer.domElement.getBoundingClientRect(); return {x:r.x+(v.x+1)*r.width/2,y:r.y+(1-v.y)*r.height/2}; }, {cell,height});
    }
    async function boundsCheck() {
      const s = await stats();
      assert.ok(s.ready <= Math.max(s.maxChunks, s.demand.pinnedKeys.length), 'Ready chunk budget includes only explicit pins');
      assert.equal(s.errors, 0, 'All demanded chunks build successfully');
      assert.deepEqual(s.failedIds, [], 'No silently failed chunks');
      return s;
    }
    await settled();
    // Image readiness is independent of the chunk queue. The boundary walls
    // exercise the shared atlas before timing/resource snapshots are compared.
    await page.waitForFunction(()=>{
      let loaded=false;
      voxel.scene.traverse(m=>{const image=m.material?.map?.image;if(m.isInstancedMesh&&image?.src?.includes('terrain-materials.png')&&image.width>0)loaded=true;});
      return loaded;
    });
    const first = await boundsCheck();
    assert(first.ready < 24, 'Detailed render does not build the entire 96x64 scene');
    assert.equal(await page.evaluate(() => Tutorial.active), false, 'Walk does not start story/tutorial events');
    assert.equal(await page.evaluate(() => gameDebug.active().appearance.gender), 'female');
    await page.screenshot({path:path.join(screenshots,'walk-390.png')});
    console.log('REGION_FIRST', JSON.stringify(first));

    // Actual taps and move buttons cross several chunk boundaries. Camera
    // positioning is an explicit fixture; gameplay motion uses the real engine.
    for (const x of [16,32,48,64,80,88]) {
      const cell = {x,y:32}; await center(cell);
      const before = await page.evaluate(() => JSON.stringify(camera.state));
      const target = await point(cell); await page.touchscreen.tap(target.x,target.y);
      await page.locator('.object-prompt [data-action="move"]').click();
      await page.waitForFunction(cell => !gameDebug.busy && gameDebug.active().x===cell.x && gameDebug.active().y===cell.y, cell);
      await settled(); assert.equal(await page.evaluate(() => gameDebug.state.scene), 'region-walk');
      assert.equal(await page.evaluate(() => JSON.stringify(camera.state)), before, 'Chunk crossing does not recenter camera');
      await boundsCheck();
    }
    console.log('REGION_CROSSED', JSON.stringify(await stats()));

    await page.locator('#camera-fit').click(); await settled();
    assert.equal((await stats()).mode,'overview','Whole-region view uses lightweight overview');
    const overviewBefore = await page.evaluate(() => gameDebug.selected);
    const emptyPoint = await point({x:60,y:32}); await page.touchscreen.tap(emptyPoint.x,emptyPoint.y);
    assert.deepEqual(await page.evaluate(() => gameDebug.selected), overviewBefore, 'Overview cannot select hidden detailed objects');
    await page.locator('#camera-center').click(); await settled();
    assert.equal((await stats()).mode,'detail','Return to hero restores detailed render');

    // Explicit adjacent placement isolates chest state from a lengthy return walk.
    // Stand beside the chest, outside its projected silhouette: a hero directly
    // in front correctly receives a touch on that hero's visible model.
    await page.evaluate(() => {const a=gameDebug.active();a.x=17;a.y=28;gameDebug.render();camera.center({x:18,y:28});});
    await settled();
    const gold = await page.evaluate(() => gameDebug.state.gold);
    const chestPoint = await point({x:18,y:28},.45); await page.touchscreen.tap(chestPoint.x,chestPoint.y);
    assert.equal(await page.evaluate(() => gameDebug.selected?.id), 'walk-camp-chest', 'The visible chest receives the touch');
    await page.locator('.object-prompt [data-action="use"]').click();
    await page.waitForFunction(gold => !gameDebug.busy && gameDebug.state.gold>gold, gold);
    const looted = await page.evaluate(() => ({gold:gameDebug.state.gold,loot:JSON.stringify(gameDebug.state.loot)}));
    await page.evaluate(() => {closeDialogue();gameDebug.mapTap(null);});
    // Eviction requires the hero to leave too; camera panning alone deliberately
    // retains the hero's group and therefore its neighboring chest source.
    await page.evaluate(() => {const a=gameDebug.active();a.x=88;a.y=48;gameDebug.render();});
    await center({x:88,y:48});
    assert.equal(await page.evaluate(() => voxel.models.has('prop:walk-camp-chest')),false,'Distant chest model is unloaded');
    await page.evaluate(() => {const a=gameDebug.active();a.x=17;a.y=28;gameDebug.render();});
    await center({x:18,y:28});
    assert.deepEqual(await page.evaluate(() => ({gold:gameDebug.state.gold,loot:JSON.stringify(gameDebug.state.loot)})),looted,'Remount keeps the chest state');
    assert.equal(await page.evaluate(() => voxel.models.get('prop:walk-camp-chest')?.visible),false,'A remounted chest immediately reflects claimed loot');
    assert.equal(await page.evaluate(() => World.tile(gameDebug.scene,18,28)),'floor','Unloading does not change logical terrain');

    // Explicit combat fixture exercises actor pinning while looking far away.
    await page.evaluate(() => {const a=gameDebug.active();a.x=18;a.y=29;gameDebug.state.enemies=[{...structuredClone(a),id:'region-fixture-enemy',name:'Учебный противник',kind:3,x:20,y:29,hp:8,max:8,dead:false}];gameDebug.state.combat=true;gameDebug.render();camera.center({x:88,y:48});});
    await settled();await boundsCheck();
    assert(await page.evaluate(() => voxel.models.has(gameDebug.active().id) && voxel.models.has('region-fixture-enemy')),'Combat actors remain mounted');
    await page.evaluate(() => {gameDebug.state.combat=false;gameDebug.state.enemies=[];gameDebug.render();});

    // Warm all visited models/materials before checking repeated traversal plateau.
    const stops=[{x:8,y:32},{x:88,y:32},{x:48,y:12},{x:48,y:52},{x:18,y:28}];
    for(const stop of stops)await center(stop);
    const warm=await stats();
    for(let cycle=0;cycle<3;cycle++)for(const stop of stops){await center(stop);await boundsCheck();}
    const plateau=await stats();
    assert.equal(plateau.ready,warm.ready,'Loaded chunk count returns to its prior level');
    assert.deepEqual(plateau.resources,warm.resources,'Live group resources plateau after repeated traversal');
    assert.equal(plateau.gpu.geometries,warm.gpu.geometries,'Uploaded geometries plateau after repeated traversal');
    assert.equal(plateau.gpu.textures,warm.gpu.textures,'Uploaded textures plateau after repeated traversal');
    console.log('REGION_PLATEAU',JSON.stringify({warm,plateau}));
    await page.setViewportSize({width:320,height:568});await settled();
    assert(await page.evaluate(() => document.body.scrollWidth<=320),'No horizontal overflow at 320px');
    await page.screenshot({path:path.join(screenshots,'walk-320.png')});

    await page.locator('#menu').click();
    await page.getByRole('button',{name:'Вернуться в приключение',exact:true}).click();
    await page.waitForFunction(() => !Worlds.practice && gameDebug.state.scene==='glade');
    assert.deepEqual(await page.evaluate(() => ({state:JSON.stringify(gameDebug.state),revision:Worlds.current.revision,resume:localStorage.getItem(Worlds.resumeKey)})),original,'Leaving restores original state/revision/resume exactly');
    const stored=await page.evaluate(async id => {const r=await fetch('/api/worlds/'+id);if(!r.ok)throw Error('Saved original missing');return r.json();},originalId);
    assert.equal(stored.world.revision,original.revision,'Walk never writes account progress');
    assert.equal(await page.evaluate(() => voxel.regionStats.enabled),false,'Small original scene returns to normal renderer');
    assert.equal(await page.evaluate(() => Object.hasOwn(World.scenes,'region-walk')),false,'Temporary scene is removed');
    assert.deepEqual(apiRequests,[],'Local mode sends no API requests to server');
    assert.deepEqual(errors,[],'No browser errors');
    console.log('PASS region controls, boundaries, overview, loot, pins, resource plateau and exact original restore');
  } finally {if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
