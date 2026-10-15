const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const os = require('node:os');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {configureBrowserPage} = require('./browser-harness.cjs');

// LANDSCAPE_BASELINE=1 serves the unchanged v64 layout for the red run.
// The assertions measure actual controls and click existing handlers; no CSS snapshots.
const root = path.resolve(__dirname, '../dist');
const artifacts = process.env.LANDSCAPE_QA_DIR || path.join(os.tmpdir(), 'dndigra-landscape-qa');
// Optional focused rerun: LANDSCAPE_SIZES=740x360,1280x720 (or a JSON array).
const sizes = process.env.LANDSCAPE_SIZES
  ? (process.env.LANDSCAPE_SIZES.trim().startsWith('[')
      ? JSON.parse(process.env.LANDSCAPE_SIZES)
      : process.env.LANDSCAPE_SIZES.split(',').map(size => {
        const match = /^(\d+)x(\d+)$/.exec(size.trim());
        assert.ok(match,'LANDSCAPE_SIZES entries use WIDTHxHEIGHT');
        return {width:Number(match[1]),height:Number(match[2])};
      }))
  : [{width:852,height:393},{width:740,height:360},{width:1280,height:720}];
assert.ok(Array.isArray(sizes) && sizes.length>0 && sizes.every(size =>
  Number.isInteger(size.width) && Number.isInteger(size.height) && size.height>0 && size.width>size.height),
  'LANDSCAPE_SIZES contains positive landscape viewport dimensions');
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/favicon.ico') {res.writeHead(204);res.end();return;}
  if (url.pathname.startsWith('/api')) {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({heroes:[],worlds:[]}));return;
  }
  const file = path.join(root, url.pathname === '/' ? 'index.html' : url.pathname);
  try {
    res.setHeader('Content-Type', ({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png',woff:'font/woff'})[path.extname(file).slice(1)] || 'application/octet-stream');
    res.end(process.env.LANDSCAPE_BASELINE === '1' && url.pathname === '/landscape.css' ? '' : fs.readFileSync(file));
  } catch {res.writeHead(404);res.end();}
});

async function reachable(locator, label, minimum = 0) {
  assert.equal(await locator.isVisible(), true, label + ' is visible');
  const box = await locator.evaluate(e => {
    const r = e.getBoundingClientRect();
    const hit = document.elementFromPoint(r.x+r.width/2, r.y+r.height/2);
    return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height,
      vw:innerWidth,vh:innerHeight,uncovered:hit===e||e.contains(hit),
      control:e.id||e.title||e.getAttribute('aria-label')||e.className,
      hit:hit&&{tag:hit.tagName,id:hit.id,className:typeof hit.className==='string'?hit.className:hit.className?.baseVal}};
  });
  assert.ok(box.x >= -1 && box.y >= -1 && box.right <= box.vw+1 && box.bottom <= box.vh+1,
    label + ' fits the viewport: ' + JSON.stringify(box));
  if (!box.uncovered) {
    const diagnostic = await locator.evaluate(e => {
      const describe = n => {
        const r=n.getBoundingClientRect(),s=getComputedStyle(n);
        return {tag:n.tagName,id:n.id,className:typeof n.className==='string'?n.className:n.className?.baseVal,
          rect:r.toJSON(),display:s.display,position:s.position,gridColumn:s.gridColumn,gridRow:s.gridRow,
          transform:s.transform,pointerEvents:s.pointerEvents,zIndex:s.zIndex,
          overflowX:s.overflowX,overflowY:s.overflowY,scrollTop:n.scrollTop,scrollHeight:n.scrollHeight,clientHeight:n.clientHeight};
      };
      const r=e.getBoundingClientRect();
      return {body:document.body.className,target:describe(e),
        stack:document.elementsFromPoint(r.x+r.width/2,r.y+r.height/2).slice(0,6).map(describe),
        editorAncestors:['.look-tiles','.look-swatches','.look-group','.look-panel','.look-tabs'].map(q=>e.closest(q)).filter(Boolean).map(describe),
        layout:['#bag-view','#bag-items','#item-detail','#bag-equipped','.tabs','#heroes-panel'].map(q=>document.querySelector(q)).filter(Boolean).map(describe),
        dialogs:[...document.querySelectorAll('dialog[open]')].map(describe)};
    });
    console.log('HIT_TEST_DIAGNOSTIC',label,JSON.stringify(diagnostic));
    await locator.page().screenshot({path:path.join(artifacts,'hit-test-failure.png')});
  }
  assert.ok(box.uncovered, label + ' accepts a tap at its center: '+JSON.stringify(box));
  if (minimum) assert.ok(box.width >= minimum-1 && box.height >= minimum-1,
    label + ' has a ' + minimum + 'px touch target: ' + JSON.stringify(box));
}

async function noPageOverflow(page, size) {
  assert.ok(await page.evaluate(() => document.body.scrollWidth) <= size.width+1, 'No horizontal page overflow');
}

async function editorChecks(page, size, full) {
  console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'editor');
  await page.evaluate(() => CinematicMenu.open());
  await page.getByRole('button',{name:'Новая игра',exact:true}).click();
  await page.waitForFunction(() => CinematicMenu.route==='heroes' && document.getElementById('heroes-panel').open);
  await page.getByRole('button',{name:'Маг',exact:true}).click();
  await page.getByRole('button',{name:'3 · Внешность',exact:true}).click();
  const editor = page.locator('.look-editor');
  await reachable(page.locator('#heroes-close'), 'Editor back', 44);
  await reachable(page.locator('#heroes-footer button').last(), 'Editor next', 44);
  for (const label of ['Образы','Лицо','Волосы','Одежда','Детали']) {
    console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'editor category',label);
    const tab = editor.getByRole('tab',{name:label,exact:true});
    await tab.scrollIntoViewIfNeeded();await reachable(tab, 'Category '+label, 44);await tab.click();
    assert.ok(await editor.locator('.look-panel button').count() > 0, label+' retains its options');
    const last = editor.locator('.look-panel button').last();
    await last.scrollIntoViewIfNeeded();await reachable(last, label+' final option', 44);await last.click();
  }
  if (full) {
    console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'editor undo/reset');
    await editor.getByRole('tab',{name:'Детали',exact:true}).click();
    const hat = editor.getByRole('button',{name:'Головной убор: Шляпа мага',exact:true});
    await hat.scrollIntoViewIfNeeded();await hat.click();
    assert.equal(await page.evaluate(() => Heroes.draft.appearance.headgear), 'wizhat');
    await editor.getByRole('tab',{name:'Волосы',exact:true}).click();
    const braid = editor.getByRole('button',{name:'Причёска: Коса',exact:true});
    await braid.scrollIntoViewIfNeeded();await braid.click();
    assert.equal(await page.evaluate(() => Heroes.draft.appearance.hairStyle), 'braid');
    const before = await page.evaluate(() => JSON.stringify(Heroes.draft.appearance));
    const random = editor.getByRole('button',{name:'Случайно',exact:true});
    await random.scrollIntoViewIfNeeded();await reachable(random,'Random appearance',44);await random.click();
    await editor.getByRole('button',{name:'Отмена',exact:true}).click();
    assert.equal(await page.evaluate(() => JSON.stringify(Heroes.draft.appearance)), before, 'Undo restores all appearance fields');
    await editor.getByRole('button',{name:'Сброс',exact:true}).click();
    await editor.getByRole('button',{name:'Отмена',exact:true}).click();
    assert.equal(await page.evaluate(() => JSON.stringify(Heroes.draft.appearance)), before, 'Reset remains reversible');
  }
  await noPageOverflow(page,size);
  await page.screenshot({path:path.join(artifacts,'editor-'+size.width+'x'+size.height+'.png')});
}

(async () => {
  fs.mkdirSync(artifacts,{recursive:true});
  await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  let browser;
  try {
    browser = await chromium.launch({...(process.env.CHROME_EXECUTABLE ? {executablePath:process.env.CHROME_EXECUTABLE}:{}),
      args:[...JSON.parse(process.env.CHROMIUM_ARGS||'[]'),'--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    const page = await browser.newPage({viewport:sizes[0],isMobile:true,hasTouch:true});
    await configureBrowserPage(page);
    const errors = [];
    page.on('pageerror',e => errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(() => window.voxel?.ready && window.CinematicMenu?.active);
    await page.evaluate(() => PortraitRenderer.ready);
    for (const size of sizes) {
      console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'main menu');
      await page.setViewportSize(size);
      await page.evaluate(() => {document.querySelectorAll('dialog[open]').forEach(d=>d.close());CinematicMenu.open();});
      for (const button of await page.locator('.cinema-actions button').all()) await reachable(button,'Main menu action',44);
      await noPageOverflow(page,size);
      await page.screenshot({path:path.join(artifacts,'menu-'+size.width+'x'+size.height+'.png')});
      console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'settings');
      await page.getByRole('button',{name:'Настройки',exact:true}).click();
      const grid = page.getByRole('switch',{name:'Показывать сетку',exact:true});
      await grid.scrollIntoViewIfNeeded();await reachable(grid,'Grid setting',44);
      const previous = await grid.getAttribute('aria-checked');await grid.click();
      assert.notEqual(await grid.getAttribute('aria-checked'),previous,'Settings retain their handler');
      const reset = page.getByRole('button',{name:'Сбросить настройки',exact:true});
      await reset.scrollIntoViewIfNeeded();await reachable(reset,'Settings reset',44);
      await reachable(page.locator('.cinema-head button'),'Settings back',44);
      await editorChecks(page,size,size.width===852 && size.height===393);
      await page.locator('#heroes-close').click();
      console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'bag');
      await page.evaluate(() => {
        document.querySelectorAll('dialog[open]').forEach(d=>d.close());CinematicMenu.play();Worlds.detach();
        gameDebug.test('reset');gameDebug.state.combat=false;gameDebug.state.settings.animations=false;
        const a=gameDebug.active();a.inventory=['Длинный меч · 1d8','Щит · +2 КД','Кольчуга','Рюкзак','Верёвка · 15 м','Рационы · 5 дней','Чернила и перо'];
        a.hands=['sword','shield'];a.armorEquipped=true;gameDebug.state.potions=3;viewsDebug.switchTab('bag');
      });
      assert.equal(await page.locator('#heroes-panel').isVisible(),false,'Closed editor cannot cover game controls');
      const slots = page.locator('#bag-items > *');
      assert.equal(await slots.count(),20,'Exactly 20 inventory cells');
      for (const slot of await slots.all()) await reachable(slot,'Inventory cell',44);
      const rope = page.locator('#bag-items button[title="Верёвка · 15 м"]');
      await rope.click();
      for (const action of await page.locator('#item-actions button').all()) {
        await action.scrollIntoViewIfNeeded();await reachable(action,'Inventory action',44);
      }
      await reachable(page.locator('#hud-back'),'Map tab',44);
      await noPageOverflow(page,size);
      await page.screenshot({path:path.join(artifacts,'bag-'+size.width+'x'+size.height+'.png')});
      console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'map');
      await page.locator('#hud-back').click();
      await reachable(page.locator('#hud-health'),'Existing hero HUD',44);
      await page.locator('#menu').click();
      for (const control of await page.locator('.map-toolbar button').all()) { await control.scrollIntoViewIfNeeded(); await reachable(control,'Map camera control',44); }
      await page.locator('#hud-navigation-close').click();
      for (const control of await page.locator('#play-dock button:visible').all()) {
        await control.scrollIntoViewIfNeeded();await reachable(control,'Existing map action',44);
      }
      const canvas = await page.locator('#viewport').boundingBox();
      assert.ok(canvas.width >= size.width*.55 && canvas.height >= 150,'Map keeps most of landscape screen');
      await page.screenshot({path:path.join(artifacts,'map-'+size.width+'x'+size.height+'.png')});
      console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'dialogue');
      await page.evaluate(() => episodeDialogue('Длинный проверочный текст. '.repeat(80),[
        {label:'Ответить',fn:()=>episodeDialogue('Новый ответ',[{label:'Закрыть',fn:closeDialogue}])},
        ...Array.from({length:6},(_,i)=>({label:'Дополнительный ответ '+i,fn:()=>{}}))
      ]));
      await reachable(page.locator('#dialogue-close'),'Dialogue close',44);
      const lastReply = page.locator('#dialogue-options button').last();
      await lastReply.scrollIntoViewIfNeeded();await reachable(lastReply,'Final dialogue answer',44);
      assert.ok(await page.locator('#speaker-art svg').count()>0,'Original NPC portrait remains');
      const scroll = await page.locator('#dialogue-text').evaluate(e => {e.scrollTop=100;return e.scrollTop;});
      assert.ok(scroll>0,'Long dialogue text scrolls');
      assert.ok((await page.locator('#viewport').boundingBox()).width >= size.width*.55,'Dialogue leaves map visible');
      await page.screenshot({path:path.join(artifacts,'dialogue-'+size.width+'x'+size.height+'.png')});
      const answer = page.locator('#dialogue-options button').first();await answer.scrollIntoViewIfNeeded();await answer.click();
      assert.equal(await page.locator('#dialogue-text').innerText(),'Новый ответ','Reply replaces previous text');
      await page.locator('#dialogue-close').click();
      console.log('LANDSCAPE_STAGE',size.width+'x'+size.height,'menu dialog and roll');
      await page.locator('#menu').click();
      await page.locator('#hud-open-settings').click();
      await reachable(page.locator('#close'),'Menu dialog close',44);
      await page.locator('#close').click();
      // Observe the real HUD readiness and check/tap in one browser task. The
      // unchanged 2.4s dismissal timer cannot race several slow IPC round trips.
      const rollClosed = await page.evaluate(async () => {
        gameDebug.state.settings.animations=true;
        const panel=document.getElementById('roll-result'),next=document.getElementById('check-next');
        const settled=HUD.check({natural:15,total:17,values:[15],bonus:2,dc:12,success:true},'Проверка');
        await new Promise(resolve => {
          const ready=()=>{if(!panel.hidden&&!next.disabled){observer.disconnect();resolve();}};
          const observer=new MutationObserver(ready);
          observer.observe(panel,{attributes:true,attributeFilter:['hidden']});
          observer.observe(next,{attributes:true,attributeFilter:['disabled']});
          ready();
        });
        const r=next.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
        const geometry={x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height,
          vw:innerWidth,vh:innerHeight,uncovered:hit===next||next.contains(hit)};
        if(r.x< -1||r.y< -1||r.right>innerWidth+1||r.bottom>innerHeight+1||r.width<43||r.height<43||!geometry.uncovered)
          throw Error('Roll result close must be visible, uncovered and 44px: '+JSON.stringify(geometry));
        next.click();
        await settled;
        return {hidden:panel.hidden,active:HUD.active};
      });
      assert.deepEqual(rollClosed,{hidden:true,active:false},'Actual close handler settles and hides the roll');
      console.log('PASS landscape existing controls',size.width+'x'+size.height);
    }
    // A shortened landscape viewport models the space left by an on-screen keyboard.
    const keyboard = {width:852,height:270};await page.setViewportSize(keyboard);
    console.log('LANDSCAPE_STAGE','852x270','keyboard');
    await page.evaluate(() => CinematicMenu.open());
    await page.getByRole('button',{name:'Новая игра',exact:true}).click();
    const name = page.getByRole('textbox',{name:'Имя героя',exact:true});
    await name.scrollIntoViewIfNeeded();await reachable(name,'Name field with keyboard',44);await name.fill('Мира');
    await reachable(page.locator('#heroes-close'),'Editor close with keyboard',44);
    await reachable(page.locator('#heroes-footer button').last(),'Editor next with keyboard',44);
    assert.equal(await page.evaluate(() => Heroes.draft.name),'Мира');
    assert.deepEqual(errors,[],'No browser errors');
    console.log('PASS full editor, bag, dialogue, roll and short landscape regressions; QA '+artifacts);
  } finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error => {console.error(error);process.exitCode=1;});
