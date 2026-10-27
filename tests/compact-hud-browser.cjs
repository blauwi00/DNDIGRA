const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const os = require('node:os');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {configureBrowserPage} = require('./browser-harness.cjs');

// These checks fail if the old framing still consumes the screen, if moving
// controls into a drawer loses their handlers, or if a modal blocks a game action.
// Fixture setup uses the existing workshop; interactions use real DOM controls.
const root = path.resolve(__dirname, '../dist');
const artifacts = process.env.COMPACT_HUD_QA_DIR || path.join(os.tmpdir(), 'dndigra-compact-hud-qa');
const sizes = [{width:852,height:393},{width:390,height:844}];
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  if (url.pathname === '/favicon.ico') {res.writeHead(204);res.end();return;}
  if (url.pathname.startsWith('/api')) {
    res.setHeader('Content-Type','application/json');
    res.end(JSON.stringify({heroes:[],worlds:[]}));return;
  }
  const file = path.join(root,url.pathname === '/' ? 'index.html' : url.pathname);
  try {
    res.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png',woff:'font/woff'})[path.extname(file).slice(1)] || 'application/octet-stream');
    res.end(fs.readFileSync(file));
  } catch {res.writeHead(404);res.end();}
});

async function reachable(locator, label, minimum = 44) {
  assert.equal(await locator.isVisible(),true,label+' is visible');
  const box = await locator.evaluate(e => {
    const r=e.getBoundingClientRect(),hit=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
    return {x:r.x,y:r.y,right:r.right,bottom:r.bottom,width:r.width,height:r.height,
      vw:innerWidth,vh:innerHeight,uncovered:hit===e||e.contains(hit),
      hit:hit?.id||hit?.tagName};
  });
  assert.ok(box.x>=-1 && box.y>=-1 && box.right<=box.vw+1 && box.bottom<=box.vh+1,
    label+' fits the screen: '+JSON.stringify(box));
  assert.ok(box.width>=minimum-1 && box.height>=minimum-1,
    label+' has a '+minimum+'px touch target: '+JSON.stringify(box));
  assert.ok(box.uncovered,label+' is not covered: '+JSON.stringify(box));
}

async function noOverflow(page, size) {
  const width=await page.evaluate(()=>Math.max(document.body.scrollWidth,document.documentElement.scrollWidth));
  assert.ok(width<=size.width+1,'No horizontal page overflow: '+width+' / '+size.width);
}

async function fullMap(page, size) {
  const geometry=await page.evaluate(()=>({
    viewport:document.getElementById('viewport').getBoundingClientRect().toJSON(),
    canvas:voxel.renderer.domElement.getBoundingClientRect().toJSON()
  }));
  for(const [label,box] of Object.entries(geometry)) {
    assert.ok(box.width>=size.width*.95 && box.height>=size.height*.95,
      label+' fills at least 95% of each screen dimension: '+JSON.stringify(geometry));
    assert.ok(box.x>=-1 && box.y>=-1 && box.right<=size.width+1 && box.bottom<=size.height+1,
      label+' stays in the screen');
  }
  await noOverflow(page,size);
}

async function openNavigation(page) {
  await reachable(page.locator('#menu'),'Menu');
  await page.locator('#menu').click();
  await page.waitForFunction(()=>document.getElementById('hud-navigation')?.open);
  await reachable(page.locator('#hud-navigation-close'),'Close navigation');
}

async function openExplorationActions(page) {
  await openNavigation(page);
  const action=page.locator('#hud-open-actions');
  await action.scrollIntoViewIfNeeded();await reachable(action,'Exploration actions');await action.click();
  await page.waitForFunction(()=>document.getElementById('actions-panel')?.open);
  assert.equal(await page.locator('#hud-navigation').isVisible(),false,'Navigation closes before actions');
}

async function settleRoll(page) {
  await page.waitForFunction(()=>!window.HUD?.active && !gameDebug.busy);
}

async function resetMap(page) {
  await page.waitForFunction(()=>!window.HUD?.active && !gameDebug.actionBusy);
  await page.evaluate(()=>{
    document.querySelectorAll('dialog[open]').forEach(d=>d.close());
    CinematicMenu.play();Worlds.detach();gameDebug.test('reset');
    gameDebug.state.combat=false;gameDebug.state.settings.animations=false;
    gameDebug.state.rulesStage=3;viewsDebug.switchTab('map');closeDialogue();
    gameDebug.dismissMapActions();camera.center(gameDebug.active(),true);gameDebug.render();
  });
  await page.waitForFunction(()=>!CinematicMenu.active && document.body.classList.contains('map-active'));
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
}

(async()=>{
  fs.mkdirSync(artifacts,{recursive:true});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser,page;
  try {
    browser=await chromium.launch({...(process.env.CHROME_EXECUTABLE?{executablePath:process.env.CHROME_EXECUTABLE}:{}),
      args:[...JSON.parse(process.env.CHROMIUM_ARGS||'[]'),'--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    page=await browser.newPage({viewport:sizes[0],isMobile:true,hasTouch:true});
    await configureBrowserPage(page);
    const errors=[];page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>window.voxel?.ready && window.CinematicMenu?.active);
    await page.evaluate(()=>PortraitRenderer.ready);
    await page.evaluate(()=>{
      window.compactHudQAEvents=[];
      window.addEventListener('game-action',event=>compactHudQAEvents.push({
        ...event.detail,actionsOpen:!!document.getElementById('actions-panel')?.open,
        navigationOpen:!!document.getElementById('hud-navigation')?.open
      }));
    });
    for(const size of sizes) {
      const tag=size.width+'x'+size.height;
      console.log('COMPACT_HUD_STAGE',tag,'idle map');
      await page.setViewportSize(size);await resetMap(page);await fullMap(page,size);
      assert.equal(await page.locator('body').evaluate(e=>e.classList.contains('compact-hud')),true,'Compact HUD is active');
      for(const selector of ['.tabletop > header','#play-dock','.tabs','.map-toolbar','#map-hands','#end','#combat-tools-toggle'])
        assert.equal(await page.locator(selector).isVisible(),false,selector+' is absent from idle exploration');
      await reachable(page.locator('#menu'),'Persistent menu');
      await reachable(page.locator('#hud-health'),'Compact health');
      assert.equal(await page.locator('#hud-health .portrait').isVisible(),false,'Large portrait is hidden');
      assert.ok(await page.locator('#hud-health').getAttribute('aria-label'),'Health has an accessible label');
      assert.match(await page.locator('#hud-health').innerText(),/\d+\s*\/\s*\d+/,'Health amount remains readable');
      await page.screenshot({path:path.join(artifacts,'exploration-'+tag+'.png')});

      console.log('COMPACT_HUD_STAGE',tag,'navigation and camera');
      await openNavigation(page);
      for(const id of ['tab-map','tab-hero','tab-bag','zoom-out','zoom-in']) { // camera follows the hero; centre/fit buttons are hidden
        const control=page.locator('#'+id);await control.scrollIntoViewIfNeeded();await reachable(control,id);
      }
      const beforeZoom=await page.evaluate(()=>camera.state.scale);
      await page.locator('#zoom-in').click();
      assert.notEqual(await page.evaluate(()=>camera.state.scale),beforeZoom,'Camera zoom retains its handler inside drawer');
      assert.equal(await page.locator('#hud-navigation').isVisible(),false,'Camera action returns to map');
      await openNavigation(page);
      await page.locator('#hud-navigation-close').click();
      assert.equal(await page.locator('#hud-navigation').isVisible(),false,'Close dismisses navigation');
      await page.locator('#menu').focus();await page.keyboard.press('Enter');
      await page.waitForFunction(()=>document.getElementById('hud-navigation').open);
      await page.keyboard.press('Escape');
      await page.waitForFunction(()=>!document.getElementById('hud-navigation').open);
      assert.equal(await page.evaluate(()=>document.activeElement?.id),'menu','Escape returns focus to menu trigger');

      for(const tab of ['hero','bag']) {
        await openNavigation(page);
        await page.locator('#tab-'+tab).scrollIntoViewIfNeeded();await page.locator('#tab-'+tab).click();
        assert.equal(await page.locator('#'+tab+'-view').isVisible(),true,tab+' view opens');
        assert.equal(await page.locator('#hud-navigation').isVisible(),false,'Selecting '+tab+' closes drawer');
        await reachable(page.locator('#hud-back'),'Return from '+tab);
        if(tab==='bag') assert.equal(await page.locator('#bag-items > *').count(),20,'Inventory retains its 20 cells');
        await noOverflow(page,size);
        await page.screenshot({path:path.join(artifacts,tab+'-'+tag+'.png')});
        await page.locator('#hud-back').click();
        assert.equal(await page.locator('#map-view').isVisible(),true,'Back returns directly to map');
        assert.equal(await page.locator('#hud-navigation').isVisible(),false,'Back does not reopen drawer');
      }
      await fullMap(page,size);

      console.log('COMPACT_HUD_STAGE',tag,'real exploration actions');
      await openExplorationActions(page);
      for(const id of ['skills','rest-short','rest-long','potion']) {
        const control=page.locator('#'+id);await control.scrollIntoViewIfNeeded();await reachable(control,id);
      }
      const search=page.locator('#quick-actions').getByRole('button',{name:'Осмотреть',exact:true});
      await search.scrollIntoViewIfNeeded();await reachable(search,'Search');await search.click();
      await page.waitForFunction(()=>compactHudQAEvents.some(e=>e.type==='ability' && e.id==='search'));
      const searched=await page.evaluate(()=>compactHudQAEvents.filter(e=>e.type==='ability'&&e.id==='search').at(-1));
      assert.equal(searched.actionsOpen,false,'Search closes actions before invoking game rules');
      await settleRoll(page);
      const injured=await page.evaluate(()=>{
        const a=gameDebug.active();a.hp=Math.max(1,a.max-10);gameDebug.state.potions=3;gameDebug.render();
        return {hp:a.hp,potions:gameDebug.state.potions};
      });
      await openExplorationActions(page);
      await page.locator('#potion').scrollIntoViewIfNeeded();await reachable(page.locator('#potion'),'Potion');
      assert.equal(await page.locator('#potion').isEnabled(),true,'Injured hero can drink');
      await page.screenshot({path:path.join(artifacts,'actions-'+tag+'.png')});
      await page.locator('#potion').click();await settleRoll(page);
      const healed=await page.evaluate(()=>({hp:gameDebug.active().hp,potions:gameDebug.state.potions,
        event:compactHudQAEvents.filter(e=>e.type==='potion').at(-1)}));
      assert.ok(healed.hp>injured.hp,'Potion still heals the actual hero');
      assert.equal(healed.potions,injured.potions-1,'Potion is consumed once');
      assert.equal(healed.event.actionsOpen,false,'Potion closes actions before invoking game rules');

      console.log('COMPACT_HUD_STAGE',tag,'map hit testing after modals');
      const point=await page.evaluate(async()=>{
        const p=gameDebug.props.find(p=>p.id==='desk');camera.center(p,true);voxel.resize();
        await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
        const model=voxel.models.get('prop:'+p.id),v=model.position.clone();v.y=.45;v.project(voxel.camera);
        const r=voxel.renderer.domElement.getBoundingClientRect();
        return {x:r.x+(v.x+1)*r.width/2,y:r.y+(1-v.y)*r.height/2};
      });
      await page.touchscreen.tap(point.x,point.y);
      await page.waitForFunction(()=>window.objectPrompt?.p?.id==='desk');
      const approach=page.locator('.object-prompt [data-action=approach]');
      await reachable(approach,'Map approach');await approach.click();
      await page.waitForFunction(()=>!gameDebug.busy && Math.abs(gameDebug.active().x-5)+Math.abs(gameDebug.active().y-2)===1);
      assert.equal(await page.locator('#dialogue').isVisible(),false,'Approach remains distinct from inspect');

      console.log('COMPACT_HUD_STAGE',tag,'combat controls');
      await page.evaluate(()=>{gameDebug.dismissMapActions();gameDebug.test('fight');});
      await page.waitForFunction(()=>gameDebug.state.combat && !gameDebug.busy && !HUD.active);
      await reachable(page.locator('#combat-tools-toggle'),'Combat actions');
      await reachable(page.locator('#end'),'End turn');await fullMap(page,size);
      assert.equal(await page.locator('#play-dock').isVisible(),false,'Combat does not restore the old dock');
      await page.screenshot({path:path.join(artifacts,'combat-'+tag+'.png')});
      await page.locator('#combat-tools-toggle').focus();await page.keyboard.press('Enter');
      await page.waitForFunction(()=>document.getElementById('actions-panel').open);
      await page.keyboard.press('Escape');
      await page.waitForFunction(()=>!document.getElementById('actions-panel').open);
      assert.equal(await page.evaluate(()=>document.activeElement?.id),'combat-tools-toggle','Escape returns focus to combat actions');
      const turns=await page.evaluate(()=>compactHudQAEvents.filter(e=>e.type==='turn').length);
      await page.locator('#end').click();
      await page.waitForFunction(before=>compactHudQAEvents.filter(e=>e.type==='turn').length>before,turns);
      await settleRoll(page);await page.evaluate(()=>gameDebug.test('peace'));

      console.log('COMPACT_HUD_STAGE',tag,'long dialogue');
      await page.evaluate(()=>episodeDialogue('Длинный проверочный текст. '.repeat(80),[
        {label:'Ответить',fn:()=>episodeDialogue('Новый ответ',[{label:'Закрыть',fn:closeDialogue}])},
        ...Array.from({length:6},(_,i)=>({label:'Дополнительный ответ '+i,fn:()=>{}}))
      ]));
      await reachable(page.locator('#dialogue-close'),'Dialogue close');
      const last=page.locator('#dialogue-options button').last();await last.scrollIntoViewIfNeeded();await reachable(last,'Last dialogue reply');
      assert.ok(await page.locator('#dialogue-text').evaluate(e=>{e.scrollTop=100;return e.scrollTop;})>0,'Long dialogue text scrolls');
      await noOverflow(page,size);await page.screenshot({path:path.join(artifacts,'dialogue-'+tag+'.png')});
      const reply=page.locator('#dialogue-options button').first();await reply.scrollIntoViewIfNeeded();await reply.click();
      assert.equal(await page.locator('#dialogue-text').innerText(),'Новый ответ','Dialogue reply retains its handler');
      await page.locator('#dialogue-close').click();await reachable(page.locator('#menu'),'Menu after dialogue');
      assert.deepEqual(errors,[],'No browser errors');
      console.log('PASS compact HUD',tag);
    }
    console.log('PASS full-screen map, contextual actions, drawer navigation, camera, potion, combat, focus and dialogue; QA '+artifacts);
  } catch(error) {
    if(page) await page.screenshot({path:path.join(artifacts,'failure.png')}).catch(()=>{});
    throw error;
  } finally {await browser?.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
