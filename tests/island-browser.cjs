// Real Chromium, the bundled LocalAPI and IndexedDB, and actual game controls.
// Explicit position fixtures shorten a 600/1000-cell walk; they do not alter
// terrain, rewards, dice, HP, enemy state or quest progression. A native-platform
// detector stub exercises automatic local mode, not a physical iPhone bridge.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {configureBrowserPage} = require('./browser-harness.cjs');

const root = path.resolve(__dirname, '..');
const client = path.resolve(process.env.ISLAND_CLIENT_DIR || path.join(root, 'dist/client'));
const screenshots = path.resolve(process.env.ISLAND_QA_DIR || path.join(root, 'qa/islands'));
const sizes = process.env.ISLAND_SIZES ? JSON.parse(process.env.ISLAND_SIZES) : [['small', 600], ['large', 1000]];

(async () => {
  const serverApiRequests = [];
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (/^\/api(?:\/|$)/.test(pathname)) {
      serverApiRequests.push({method: req.method, pathname});
      res.writeHead(503, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({error: 'This test has no API server.'}));
    }
    if (pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }
    const file = path.resolve(client, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(client + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
    const mime = {'.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.svg':'image/svg+xml', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.json':'application/json'};
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control', 'no-store');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  fs.mkdirSync(screenshots, {recursive: true});
  let browser, page;
  try {
    browser = await chromium.launch({executablePath: process.env.CHROME_EXECUTABLE || '/usr/bin/chromium',
      args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', ...JSON.parse(process.env.CHROMIUM_ARGS || '[]')]});
    for (const [size, drySize] of sizes) {
      const context = await browser.newContext({viewport: {width: 852, height: 393}, isMobile: true, hasTouch: true});
      await context.addInitScript(() => { window.Capacitor = {isNativePlatform: () => true}; });
      page = await context.newPage();
      await configureBrowserPage(page);
      const errors = [], networkApiRequests = [], externalRequests = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
      page.on('request', request => {
        const url = new URL(request.url());
        if (/^\/api(?:\/|$)/.test(url.pathname)) networkApiRequests.push(request.url());
        if (/^https?:$/.test(url.protocol) && url.origin !== origin) externalRequests.push(request.url());
      });
      console.log('RUN island native-local UI creation', size, drySize);
      await page.goto(origin, {waitUntil: 'domcontentloaded'});
      await page.waitForFunction(() => window.voxel?.ready && window.NativeRuntime?.api);
      const initialSharedMaterials=await page.evaluate(() => voxel.regionStats.shared.materials);
      assert.equal(await page.evaluate(() => NativeRuntime.offline), true, 'Native platform selection enables the real local API');
      assert.equal(await page.evaluate(() => new URL(location.href).searchParams.has('offline')), false, 'Native selection needs no offline query');
      assert.equal(await page.evaluate(() => Worlds.resumeKey), 'dndigra-local-last-world-id');
      const hero = await page.evaluate(async size => {
        const classId = 'fighter';
        const appearance = {...Characters.defaultLook(classId, 'female'), hairStyle: 'long', hair: '#c4622f', eyes: 'sparkle', eye: '#2f7a5a'};
        const response = await fetch('/api/heroes', {method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({
          name: 'Путница острова ' + size, classId, stats: HeroRules.preset(classId), appearance,
          kit: 0, background: HeroRules.background(classId, () => 0)
        })});
        const data = await response.json();
        if (!response.ok) throw Error(data.error);
        return data.hero;
      }, size);
      await page.evaluate(async hero => { document.querySelectorAll('dialog').forEach(dialog => dialog.close()); await Worlds.choose(hero); }, hero);
      await page.getByRole('button', {name: 'Начать остров', exact: true}).click();
      await page.locator('#world-seed').fill('island-browser-' + size);
      await page.locator('#world-size').selectOption(size);
      assert.equal(await page.locator('#skip-tutorial').count(), 0, 'Unfinished island tutorial is not offered as a new-game checkbox');
      await page.getByRole('button', {name: 'Создать остров', exact: true}).click();
      await page.waitForFunction(() => Worlds.current && gameDebug.state.world?.gen?.v === 4 && gameDebug.state.scene === 'island');
      assert.equal(await page.locator('#adventure-cinematic [data-portrait-source="character-boxes"]').count(), 1, 'The intro portrait uses the current character model');
      assert.deepEqual(await page.evaluate(() => gameDebug.active().appearance), hero.appearance);
      assert.equal(await page.evaluate(() => gameDebug.state.party.length), 1, 'No computer allies are introduced');
      assert.equal(await page.evaluate(() => Tutorial.active), false, 'The old tutorial is not silently activated on an island');

      async function flush(label) {
        return page.evaluate(async label => {
          gameDebug.save(); Worlds.capture();
          if (!await Worlds.flush()) throw Error(label + ': canonical IndexedDB save failed');
          const response = await fetch('/api/worlds/' + Worlds.current.id);
          const data = await response.json();
          if (!response.ok) throw Error(data.error);
          return data.world;
        }, label);
      }
      async function settled() {
        await page.waitForFunction(() => voxel.regionStats.enabled && voxel.regionStats.idle && voxel.regionStats.ready > 0);
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      }
      async function stats() { return page.evaluate(() => voxel.regionStats); }
      async function bounded(label) {
        await settled();
        const evidence = await page.evaluate(() => {
          const s = gameDebug.scene, v = voxel.regionStats;
          return {stats: v, W: s.W, H: s.H, drySize: s.island?.landSize, tiles: Object.hasOwn(s, 'tiles'),
            descriptorBytes: JSON.stringify(s.island).length, snapshotBytes: JSON.stringify(gameDebug.state).length,
            cells: document.querySelectorAll('#cells .cell').length, pieces: document.querySelectorAll('#pieces > *').length,
            objects: document.querySelectorAll('#objects > *').length, dom: document.querySelectorAll('*').length,
            canvases: [...document.querySelectorAll('canvas')].map(c => ({width:c.width,height:c.height})),
            viewport: voxel.renderer.domElement.getBoundingClientRect().toJSON(), overflow: document.body.scrollWidth > innerWidth};
        });
        assert.equal(evidence.drySize, drySize, label + ': requested dry size is canonical');
        assert.equal(evidence.W, drySize + 40, label + ': ocean is outside dry bounds');
        assert.equal(evidence.H, drySize + 40);
        assert.equal(evidence.tiles, false, label + ': no complete cell grid is allocated');
        assert(evidence.descriptorBytes < 20000, label + ': compact terrain metadata');
        assert(evidence.snapshotBytes < 200000, label + ': save size does not follow island area');
        assert.equal(evidence.cells, 0, label + ': no per-cell DOM buttons');
        assert.equal(evidence.pieces, 0, label + ': WebGL owns island actors');
        assert.equal(evidence.objects, 0, label + ': no full fallback object DOM');
        assert(evidence.dom < 2500, label + ': DOM remains bounded');
        assert(evidence.canvases.every(c => c.width <= 2048 && c.height <= 2048), label + ': no giant terrain canvas');
        assert.equal(evidence.overflow, false, label + ': landscape page fits the phone');
        assert(evidence.viewport.width >= 852 * .55 && evidence.viewport.height >= 200, label + ': playable map remains visible');
        assert.equal(evidence.stats.chunkSize, 10, label + ': ten-cell detail chunks');
        assert(evidence.stats.ready <= Math.max(evidence.stats.maxChunks, evidence.stats.demand.pinnedKeys.length), label + ': detail budget includes explicit pins');
        assert(evidence.stats.ready <= 32, label + ': whole island is not mounted');
        assert.equal(evidence.stats.errors, 0, label + ': chunks build without errors');
        assert.deepEqual(evidence.stats.failedIds, [], label + ': no failed chunk is hidden');
        assert(evidence.stats.shared.materials <= initialSharedMaterials+2048, label + ': terrain plus the finite current NPC/prop palette has a bounded shared material cache');
        assert(evidence.stats.resources.materials < 512, label + ': mounted material count remains bounded');
        console.log('ISLAND_BOUNDS', JSON.stringify({label,size,drySize,dom:evidence.dom,descriptorBytes:evidence.descriptorBytes,snapshotBytes:evidence.snapshotBytes,stats:evidence.stats}));
        return evidence.stats;
      }
      async function center(cell) { await page.evaluate(cell => camera.center(cell, true), cell); await settled(); }
      async function point(cell, height = .07) {
        return page.evaluate(({cell,height}) => {
          const v = voxel.camera.position.clone().set(cell.x + .5, height, cell.y + .5).project(voxel.camera);
          const r = voxel.renderer.domElement.getBoundingClientRect();
          return {x:r.x + (v.x + 1) * r.width / 2,y:r.y + (1 - v.y) * r.height / 2};
        }, {cell,height});
      }
      const property = () => page.evaluate(() => ({gold:gameDebug.state.gold,potions:gameDebug.state.potions,xp:gameDebug.state.xp,inventory:structuredClone(gameDebug.active().inventory),torches:gameDebug.active().torches}));
      // Only this helper changes actor coordinates. Every position fixture is
      // validated by the same save API before the behavior being tested starts.
      async function place(cell, label) {
        await page.evaluate(cell => {
          const s = structuredClone(gameDebug.state), a = s.party.find(a => a.id === s.active);
          a.x = cell.x; a.y = cell.y;
          gameDebug.loadWorld(s);
        }, cell);
        await flush(label + ' position fixture');
        await settled();
      }
      async function clickMove(cell) {
        await center(cell);
        const focus = await page.evaluate(() => JSON.stringify(camera.state));
        const before = await page.evaluate(() => ({x:gameDebug.active().x,y:gameDebug.active().y}));
        const tap = await point(cell);
        await page.touchscreen.tap(tap.x, tap.y);
        await page.waitForFunction(cell => gameDebug.selected?.x === cell.x && gameDebug.selected?.y === cell.y, cell);
        assert.deepEqual(await page.evaluate(() => ({x:gameDebug.active().x,y:gameDebug.active().y})), before, 'A map tap selects without moving');
        const action = page.locator('.object-prompt [data-action="move"]');
        await action.waitFor({state: 'visible'});
        assert.equal(await action.isEnabled(), true, 'A dry route exposes a real movement button');
        await action.click();
        await page.waitForFunction(cell => !gameDebug.busy && gameDebug.active().x === cell.x && gameDebug.active().y === cell.y, cell);
        assert.equal(await page.evaluate(() => JSON.stringify(camera.state)), focus, 'Actual movement does not recenter the camera');
        await settled();
      }
      async function resume(id) {
        await page.reload({waitUntil: 'domcontentloaded'});
        await page.waitForFunction(() => window.voxel?.ready && window.NativeRuntime?.api);
        await page.getByRole('button', {name:'Продолжить',exact:true}).click();
        await page.waitForFunction(id => Worlds.current?.id === id && gameDebug.state.world?.gen?.v === 4, id);
        await settled();
      }

      await bounded('opening');
      await page.screenshot({path:path.join(screenshots,'island-opening-' + drySize + '.png')});
      await page.getByRole('button', {name:'Далее',exact:true}).click();
      const intro = await flush('intro');
      assert.equal(intro.snapshot.story.intro, 1);
      if (process.env.ISLAND_COMBAT_ONLY !== '1') await resume(intro.id);
      assert.equal(await page.evaluate(() => gameDebug.state.story.intro), 1, 'Reload resumes the same appearance-bound cinematic frame');
      assert.deepEqual(await page.evaluate(() => gameDebug.active().appearance), hero.appearance);
      await page.getByRole('button', {name:'Далее',exact:true}).click();
      await page.getByRole('button', {name:'Начать путь',exact:true}).click();
      await page.getByRole('button', {name:'Я найду дорогу. Беги в поселение.',exact:true}).waitFor();
      await page.screenshot({path:path.join(screenshots,'island-messenger-' + drySize + '.png')});
      await page.getByRole('button', {name:'Я найду дорогу. Беги в поселение.',exact:true}).click();
      await page.waitForFunction(() => gameDebug.state.story.npcDeparted && !gameDebug.busy && !HUD.pending);
      assert.equal(await page.evaluate(() => gameDebug.props.some(p => p.storyRole === 'messenger')), false, 'The messenger leaves the playable scene');
      await flush('messenger');

      if (process.env.ISLAND_COMBAT_ONLY !== '1') {
      const boundary = await page.evaluate(() => {
        const a = gameDebug.active(), size = gameDebug.scene.island.chunkSize;
        const clear = p => !gameDebug.blocked(p) && !gameDebug.props.some(o => o.x === p.x && o.y === p.y) &&
          !(gameDebug.scene.encounters || []).some(e => Math.abs(e.x-p.x) + Math.abs(e.y-p.y) <= (e.radius ?? 2) + 3);
        for (let dy = 6; dy <= 24; dy++) for (let dx = 0; dx <= 25; dx++) {
          const edge = Math.ceil((a.x + dx) / size) * size, from = {x:edge-2,y:a.y+dy}, to = {x:edge+1,y:from.y};
          if ([0,1,2,3].every(i => clear({x:from.x+i,y:from.y}))) return {from,to};
        }
        throw Error('No safe chunk-boundary movement fixture');
      });
      await place(boundary.from, 'chunk boundary');
      await clickMove(boundary.to);
      assert.notEqual(Math.floor(boundary.from.x/10), Math.floor(boundary.to.x/10), 'Movement crosses a real chunk boundary');
      assert.equal(await page.evaluate(() => World.tile(gameDebug.scene,gameDebug.active().x,gameDebug.active().y)), 'floor');
      await bounded('chunk crossing');

      const coast = await page.evaluate(() => {
        const [x,y] = gameDebug.scene.island.landmarks.port;
        // The port is the western shore. Approach sideways so the hero does
        // not obscure the tapped ground north of it in the current camera.
        for (const [dx,dy] of [[-1,0], ...World.directions.filter(([dx,dy]) => dx !== -1 || dy !== 0)]) {
          const water = {x:x+dx,y:y+dy};
          if (World.tile(gameDebug.scene,water.x,water.y) !== 'water') continue;
          const from = {x:x-dx*2,y:y-dy*2}, dry = {x:x-dx,y:y-dy};
          if (!gameDebug.blocked(from) && !gameDebug.blocked(dry) && !gameDebug.props.some(p => [from,dry].some(c=>p.x===c.x&&p.y===c.y))) return {from,dry,water};
        }
        throw Error('No accessible dry/sea port fixture');
      });
      await place(coast.from, 'coast');
      await clickMove(coast.dry);
      await center(coast.water);
      const dryPosition = await page.evaluate(() => ({x:gameDebug.active().x,y:gameDebug.active().y}));
      assert.equal(await page.evaluate(p => World.tile(gameDebug.scene,p.x,p.y), coast.water), 'water');
      assert.equal(await page.evaluate(p => gameDebug.blocked(p), coast.water), true);
      assert.equal(await page.evaluate(p => gameDebug.pathTo(gameDebug.active(),p), coast.water), null, 'The movement planner rejects ocean');
      const oceanTap = await point(coast.water);
      await page.touchscreen.tap(oceanTap.x,oceanTap.y);
      assert.equal(await page.evaluate(() => objectPrompt.actions.some(a => a.id === 'move' && a.enabled)), false, 'A real sea tap never offers walking into water');
      assert.deepEqual(await page.evaluate(() => ({x:gameDebug.active().x,y:gameDebug.active().y})), dryPosition);
      await page.evaluate(() => gameDebug.mapTap(null));

      await page.locator('#camera-fit').click();
      await settled();
      const overview = await stats();
      assert.equal(overview.mode, 'overview', 'Fit island selects the lightweight overview');
      assert(overview.overview.width <= 512 && overview.overview.height <= 512 && overview.overview.samples <= 512*512, 'Overview sampling and texture dimensions have a fixed cap');
      const selected = await page.evaluate(() => gameDebug.selected);
      const overviewTap = await point({x:Math.floor((drySize+40)/2),y:Math.floor((drySize+40)/2)});
      await page.touchscreen.tap(overviewTap.x,overviewTap.y);
      assert.deepEqual(await page.evaluate(() => gameDebug.selected), selected, 'Overview cannot select unloaded detailed objects');
      await page.screenshot({path:path.join(screenshots,'island-overview-' + drySize + '.png')});
      await page.locator('#camera-center').click();
      await settled();
      assert.equal((await stats()).mode, 'detail', 'Return to hero restores detailed picking');

      const chest = await page.evaluate(() => {
        const p = gameDebug.props.find(p => p.container && p.loot && !p.trap && !p.lock && p.id !== GeneratedWorlds.plan.story.clueProp);
        if (!p) throw Error('Island has no safe canonical starting container');
        // Stand to one side, avoiding the hero silhouette over the chest.
        const from = World.directions.map(([dx,dy]) => ({x:p.x+dx,y:p.y+dy})).find(c => !gameDebug.blocked(c) && !gameDebug.all().some(a=>a.x===c.x&&a.y===c.y));
        if (!from) throw Error('Container has no legal adjacent access');
        return {id:p.id,x:p.x,y:p.y,from,loot:structuredClone(p.loot)};
      });
      await place(chest.from, 'container');
      await center(chest);
      const beforeLoot = await property();
      async function openContainer() {
        const tap = await point(chest,.45);
        await page.touchscreen.tap(tap.x,tap.y);
        await page.waitForFunction(id => gameDebug.selected?.id === id, chest.id);
        const use = page.locator('.object-prompt [data-action="use"]');
        await use.waitFor({state:'visible'});
        assert.equal(await use.isEnabled(),true,'The generated container uses real contextual interaction');
        await use.click();
        await page.locator('#dialogue').waitFor({state:'visible'});
      }
      await openContainer();
      await page.locator('#dialogue').getByRole('button',{name:'Открыть',exact:true}).click();
      await page.waitForFunction(id => gameDebug.state.gen?.opened?.['island:'+id] && !gameDebug.busy && !HUD.active, chest.id);
      const afterLoot = await property();
      assert.equal(afterLoot.gold-beforeLoot.gold, chest.loot.gold || 0, 'Container gold comes from canonical loot');
      assert.equal(afterLoot.potions-beforeLoot.potions, chest.loot.potions || 0);
      assert.equal(afterLoot.torches-beforeLoot.torches, chest.loot.torches || 0);
      assert.deepEqual(afterLoot.inventory,beforeLoot.inventory.concat(chest.loot.gear || []), 'Actual loot retains existing inventory');
      await page.evaluate(() => {closeDialogue();gameDebug.mapTap(null);});
      await openContainer();
      assert.equal(await page.locator('#dialogue').getByRole('button',{name:'Открыть',exact:true}).count(),0,'Claimed container offers no second reward');
      assert.deepEqual(await property(),afterLoot,'Second interaction does not duplicate property');
      await page.evaluate(() => {closeDialogue();gameDebug.mapTap(null);});
      const saved = await flush('looted container');
      assert.equal(saved.snapshot.gen.opened['island:'+chest.id],true);
      const resourceFields = ['id','hp','max','slots','maxSlots','secondWind','maxSecondWind','conditions','hands','inventory','torches','torch','armor','death','concentration','appearance'];
      const pickResources = actor => Object.fromEntries(resourceFields.filter(field => Object.hasOwn(actor,field)).map(field => [field,actor[field]]));
      const savedResources = pickResources(saved.snapshot.party[0]);
      await resume(saved.id);
      assert.equal(await page.evaluate(() => gameDebug.state.story.npcDeparted),true,'Departure remains saved');
      assert.deepEqual(await page.evaluate(() => gameDebug.active().appearance),hero.appearance,'Original appearance survives local resume');
      assert.deepEqual(await property(),afterLoot,'All actual container resources survive IndexedDB resume');
      assert.deepEqual(pickResources(await page.evaluate(() => structuredClone(gameDebug.active()))),savedResources,'HP, spell/class resources, conditions and equipped property survive resume');
      await center(chest);
      await openContainer();
      assert.equal(await page.locator('#dialogue').getByRole('button',{name:'Открыть',exact:true}).count(),0,'Reload does not repopulate a container');
      assert.deepEqual(await property(),afterLoot);
      await page.evaluate(() => {closeDialogue();gameDebug.mapTap(null);});

      // Visit distant detail groups without changing the canonical hero state.
      // A second pass must not create a material for each blended terrain color.
      const stops = await page.evaluate(() => {
        const i=gameDebug.scene.island,c=i.margin+Math.floor(i.landSize/2);
        return [{x:c,y:i.margin+Math.floor(i.landSize*.2)},{x:c,y:i.margin+Math.floor(i.landSize*.8)},
          {x:i.margin+Math.floor(i.landSize*.3),y:c},{x:i.margin+Math.floor(i.landSize*.7),y:c},
          {x:gameDebug.active().x,y:gameDebug.active().y}];
      });
      for (const stop of stops) await center(stop);
      const warm = await stats();
      for (let cycle=0;cycle<2;cycle++) for (const stop of stops) { await center(stop); await bounded('distant groups '+cycle); }
      const plateau = await stats();
      assert.equal(plateau.shared.materials,warm.shared.materials,'Shared materials plateau across repeated blended-biome visits');
      assert.equal(plateau.shared.textures,warm.shared.textures,'Shared textures plateau across repeated visits');
      assert.deepEqual(plateau.resources,warm.resources,'Live terrain resources return to their prior bounded level');
      console.log('ISLAND_PLATEAU',JSON.stringify({size,warm,plateau}));
      await page.screenshot({path:path.join(screenshots,'island-reload-' + drySize + '.png')});
      console.log('PASS island exploration',drySize);
      }

      if (size === 'small') {
        // One real step into the canonical radius starts actual D&D combat.
        const threat = await page.evaluate(() => {
          const e=gameDebug.scene.encounters.find(e=>e.id==='road-threat');
          if(!e)throw Error('No canonical island road encounter');
          for(const [dx,dy] of World.directions){
            const distance=(e.radius??2)+1,from={x:e.x+dx*distance,y:e.y+dy*distance},to={x:from.x-dx,y:from.y-dy};
            if(!gameDebug.blocked(from)&&!gameDebug.blocked(to)&&!gameDebug.props.some(p=>[from,to].some(c=>p.x===c.x&&p.y===c.y)))return{from,to,id:e.id,reward:structuredClone(e.reward)};
          }
          throw Error('No legal encounter-edge fixture');
        });
        await place(threat.from,'encounter');
        const combatBefore = await property();
        await center(threat.to);
        const tap = await point(threat.to);
        await page.touchscreen.tap(tap.x,tap.y);
        await page.locator('.object-prompt [data-action="move"]').click();
        await page.waitForFunction(() => gameDebug.state.combat && !gameDebug.busy && !HUD.active);
        assert.equal(await page.evaluate(() => gameDebug.state.encounter.id),threat.id);
        assert(await page.evaluate(() => gameDebug.state.rolls.some(r=>r.includes('инициатива'))),'Combat initiative is rolled by the D&D engine');
        const toggle = page.locator('#adventure-combat .adventure-combat-toggle');
        assert.equal(await toggle.getAttribute('aria-expanded'),'false','Prepared combat choices begin collapsed');
        let attacks=0;
        for(let turn=0;turn<40;turn++){
          await page.waitForFunction(() => !gameDebug.busy && !HUD.active);
          const next=await page.evaluate(() => {
            const g=gameDebug,a=g.active(),foe=g.state.enemies.find(e=>e.hp>0&&!e.dead);
            if(!g.state.combat||a.hp<=0||a.dead||!foe)return{done:true};
            if(a.hp<=a.max/2&&a.secondWind&&!a.bonusUsed)return{action:'Второе дыхание'};
            if(a.hp<=a.max/2&&g.state.potions&&!a.bonusUsed)return{action:'Выпить зелье'};
            if(a.acted)return{action:'Завершить ход'};
            if(g.canAttack(a,foe))return{action:'Атаковать: '+foe.name,attack:true,hero:a.name,foe:foe.name};
            // Approach from the side: the current enemy model obscures the
            // ground immediately north of its feet in this camera.
            const candidates=World.directions.map(([dx,dy])=>({x:foe.x+dx,y:foe.y+dy})).map(cell=>({cell,route:g.pathTo(a,cell)})).filter(x=>x.route!==null&&x.route.length<=a.move).sort((x,y)=>Number(x.cell.x===foe.x)-Number(y.cell.x===foe.x)||x.route.length-y.route.length);
            if(candidates[0])return{move:candidates[0].cell};
            return{action:'Завершить ход'};
          });
          console.log('COMBAT_TURN',turn,JSON.stringify(next),await page.evaluate(()=>({hero:{x:gameDebug.active().x,y:gameDebug.active().y,hp:gameDebug.active().hp},foes:gameDebug.state.enemies.map(e=>({x:e.x,y:e.y,hp:e.hp}))})));
          if(next.done)break;
          if(next.move){
            // Keep the tapped cell below the real initiative strip, rather
            // than attempting to tap through a disabled HUD button.
            await center({x:next.move.x,y:next.move.y-3});const p=await point(next.move);
            console.log('COMBAT_TAP',p,await page.evaluate(p=>({hit:document.elementFromPoint(p.x,p.y)?.outerHTML.slice(0,250),ready:voxel.regionStats.ready,mode:voxel.regionStats.mode}),p));
            await page.touchscreen.tap(p.x,p.y);
            console.log('COMBAT_SELECTION',await page.evaluate(()=>({selected:gameDebug.selected,actions:objectPrompt.actions.map(a=>({id:a.id,enabled:a.enabled})),busy:gameDebug.busy,combat:gameDebug.state.combat})));
            await page.waitForFunction(cell=>gameDebug.selected?.x===cell.x&&gameDebug.selected?.y===cell.y,next.move,{timeout:20000});
            await page.locator('.object-prompt [data-action="move"]').click();
          }
          else {
            await toggle.click();
            const choice=page.locator('#adventure-battle-actions').getByRole('button',{name:next.action,exact:true});
            assert.equal(await choice.isEnabled(),true,'Production prepared action is available: '+next.action);
            await choice.click();
            if(next.attack){attacks++;await page.waitForFunction(({hero,foe})=>gameDebug.state.rolls.some(r=>r.startsWith(hero+' → '+foe)&&r.includes('d20')),next);}
          }
        }
        await page.waitForFunction(() => !gameDebug.busy && !HUD.active && (!gameDebug.state.combat || gameDebug.active().hp<=0));
        assert(attacks>0,'At least one ordinary attack uses the prepared UI and real d20');
        const result=await flush('actual combat outcome');
        const won=result.snapshot.story.cleared.includes(threat.id);
        if(won){
          assert.equal(result.snapshot.xp-combatBefore.xp,threat.reward.xp||0);
          assert.equal(result.snapshot.gold-combatBefore.gold,threat.reward.gold||0);
          assert.equal(result.snapshot.encounter,null);
        } else {
          assert.equal(result.snapshot.party[0].hp,0,'Losing the ordinary encounter leaves the hero unconscious');
          assert.equal(result.snapshot.story.cleared.includes(threat.id),false,'Defeat never grants completion');
          assert.equal(result.snapshot.xp,combatBefore.xp);
          assert.equal(result.snapshot.gold,combatBefore.gold);
          assert.equal(await page.locator('#death-screen').isVisible(),true,'Actual defeat opens the existing unconsciousness screen');
        }
        await resume(result.id);
        assert.deepEqual(await page.evaluate(() => gameDebug.state.story.cleared),result.snapshot.story.cleared,'Cleared encounters do not respawn after reload');
        assert.equal(await page.evaluate(() => gameDebug.state.gold),result.snapshot.gold);
        assert.equal(await page.evaluate(() => gameDebug.state.xp),result.snapshot.xp);
        assert.equal(await page.evaluate(() => gameDebug.active().hp),result.snapshot.party[0].hp,'Combat wounds survive resume');
        if(won){
          assert.equal(await page.evaluate(async () => Adventure.startEncounter(gameDebug.scene.encounters.find(e=>e.id==='road-threat'))),false,'A cleared canonical encounter cannot grant a second reward');
          assert.equal(await page.evaluate(() => gameDebug.state.combat),false);
        }else assert.deepEqual(await page.evaluate(() => gameDebug.state.enemies.map(e=>({id:e.id,hp:e.hp}))),result.snapshot.enemies.map(e=>({id:e.id,hp:e.hp})),'Surviving foes retain damage after defeat');
        console.log('ISLAND_COMBAT',JSON.stringify({size,won,attacks,heroHp:result.snapshot.party[0].hp,cleared:result.snapshot.story.cleared}));
      }
      assert.deepEqual(networkApiRequests,[],'Native-local game calls never reach browser networking');
      assert.deepEqual(externalRequests,[],'Bundled gameplay needs no external resources');
      assert.deepEqual(errors,[],'No browser errors during island creation, movement and IndexedDB resume');
      console.log('PASS playable island',drySize,process.env.ISLAND_COMBAT_ONLY === '1' ? 'native-local UI, intro/messenger, actual combat and combat persistence' : 'native-local UI, intro/messenger, bounded rendering, chunk movement, ocean rejection, overview, once-only loot, resources and reload');
      await context.close();
      page=null;
    }
    assert.deepEqual(serverApiRequests,[],'The test server receives no API request');
    console.log('NOT TESTED: physical iPhone/Android or native bridge performance');
  } catch(error) {
    if(page&&!page.isClosed())await page.screenshot({path:path.join(screenshots,'island-failure.png')}).catch(()=>{});
    if(page&&!page.isClosed())console.error('ISLAND_STATUS',await page.evaluate(() => ({offline:window.NativeRuntime?.offline,
      scene:window.gameDebug?.state.scene,version:window.gameDebug?.state.world?.gen?.v,busy:window.gameDebug?.busy,
      story:window.gameDebug?.state.story,selected:window.gameDebug?.selected,stats:window.voxel?.regionStats,
      modal:document.getElementById('modal-body')?.textContent,dialogue:document.getElementById('dialogue-text')?.textContent})).catch(()=>null));
    throw error;
  } finally {
    await browser?.close();
    await new Promise(resolve=>server.close(resolve));
  }
})().catch(error=>{console.error(error);process.exitCode=1;});
