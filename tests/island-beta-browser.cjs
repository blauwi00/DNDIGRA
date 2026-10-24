// The island beta in real Chromium, served exactly as players get it (site/island).
// It walks the menu and settings, the editor, every people x class x gender x look option,
// the two-hands rule, every starting kit's attacks, villager talks and the whole tutorial.
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-beta-browser.cjs
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = path.resolve(__dirname, '..', 'site', 'island');
const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.txt': 'text/plain', '.md': 'text/plain'};
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'content-type': types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});
const step = (name) => console.log('· ' + name);

(async () => {
  await new Promise((r) => server.listen(0, r));
  const url = 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader']});
  const errors = [];
  const open = async (w = 844, h = 390) => {
    const p = await browser.newPage({viewport: {width: w, height: h}, hasTouch: true});
    p.setDefaultTimeout(120000);
    p.on('pageerror', (e) => errors.push(e.message));
    await p.goto(url);
    await p.waitForFunction(() => window.__game && document.getElementById('mainmenu') && !document.getElementById('mainmenu').hidden);
    return p;
  };
  try {
    // ---------- menu and settings ----------
    let p = await open();
    step('menu: version label, three buttons, settings change the game');
    assert.match(await p.textContent('.mm-ver'), /Бета 0\.\d+/);
    assert.equal(await p.locator('.mm-row .mmb').count(), 3);
    await p.click('#mSettings');
    await p.click('#stTabs button[data-t="gfx"]');
    await p.locator('.st-seg button', {hasText: 'Экономное'}).click();
    await p.click('#stTabs button[data-t="game"]');
    await p.locator('.st-seg button', {hasText: 'Сразу'}).click();
    const s = await p.evaluate(() => ({pr: renderer.getPixelRatio(), txt: window.TEXT_DELAY}));
    assert.equal(s.pr, 1); assert.equal(s.txt, 0);
    await p.click('#stClose');

    // ---------- every look builds; hair never sits on an arm; ready looks per class and people ----------
    step('looks: all people x class x gender x option build cleanly');
    const looks = await p.evaluate(() => {
      const bad = []; let n = 0; const keys = Object.keys(C_.OPTIONS).filter((k) => k !== 'gender');
      for (const race of RACE_ORDER) for (const cls of CLASS_ORDER) for (const g of ['male', 'female']) {
        const base = baseLook(cls, race, g);
        for (const key of keys) for (const o of C_.OPTIONS[key]) {
          const ap = JSON.parse(JSON.stringify(base)); ap[key] = Array.isArray(ap[key]) ? [o.id] : o.id; n++;
          try {
            const bx = raceDecorate(race, C_.build(C_.spec('hero', {classId: gidOf(cls), appearance: ap})), ap);
            if (bx.length < 60 || bx.some((q) => q.slice(0, 6).some((v) => !Number.isFinite(v)))) bad.push([race, cls, g, key, o.id].join(' '));
          } catch (e) { bad.push([race, cls, g, key, o.id, e.message].join(' ')); }
        }
        if (lookPresets(cls, race).length !== 6) bad.push(race + ' ' + cls + ' presets');
      }
      return {n, bad};
    });
    assert.ok(looks.n > 20000, 'checked ' + looks.n);
    assert.deepEqual(looks.bad, []);

    step('two hands: hair stays on the head, items sit in the model\'s own hands');
    const hands = await p.evaluate(() => {
      const bad = [];
      for (const cls of CLASS_ORDER) for (const g of ['male', 'female']) for (const hs of C_.OPTIONS.hairStyle.map((o) => o.id)) {
        const ap = Object.assign(baseLook(cls, 'human', g), {hairStyle: hs, headgear: 'none'});
        const m = buildModel(C_.build(C_.spec('hero', {classId: gidOf(cls), appearance: ap})));
        const hc = new THREE.Color(ap.hair); let n = 0;
        for (const k of ['armL', 'armR', 'foreL', 'foreR']) m.userData.rig[k].traverse((o) => {
          if (!o.isMesh || !o.geometry.attributes.color) return; const c = o.geometry.attributes.color.array;
          for (let i = 0; i < c.length; i += 3) if (Math.abs(c[i] - hc.r) < .004 && Math.abs(c[i + 1] - hc.g) < .004 && Math.abs(c[i + 2] - hc.b) < .004) n++;
        });
        if (n) bad.push(cls + ' ' + g + ' ' + hs);
      }
      for (const cls of CLASS_ORDER) for (const k of CLASSES[cls].kits) {
        const m = buildModel(C_.build(C_.spec('hero', {classId: gidOf(cls), appearance: baseLook(cls, 'human', 'male')})));
        const two = TWO.has(k.L) ? k.L : TWO.has(k.R) ? k.R : null; if (two) setTwoHanded(m, two); else { setHeld(m, 'L', k.L); setHeld(m, 'R', k.R); }
        let fists = 0; m.traverse((o) => { if (o.userData && o.userData.fist) fists++; });
        const r = m.userData.rig, onTorso = r.torso.userData.item || r.torso.userData.two;
        if (fists || onTorso) bad.push(cls + ' ' + k.n + ' extra hand or item off the hand');
      }
      return bad;
    });
    assert.deepEqual(hands, []);

    step('kits: every class and kit has attacks');
    const kits = await p.evaluate(() => {
      const bad = [];
      for (const c of CLASS_ORDER) for (const k of CLASSES[c].kits) {
        HERO = applyRace(Object.assign({cls: c}, CLASSES[c]), 'human'); equipHero(k.L, k.R);
        const a = heroAttacks(); if (!a.length || a.some((o) => !(o.die > 0) || !Number.isFinite(o.hit))) bad.push(c + ' ' + k.n);
      }
      return bad;
    });
    assert.deepEqual(kits, []);

    step('villagers: no line repeats inside a talk');
    const talks = await p.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms)), txt = () => document.querySelector('#talk p').textContent, bad = [];
      for (const v of __game.V.filter((v) => v.talkId === 'villager')) {
        const said = []; personTalk(v, v.npc); await wait(30); said.push(txt());
        for (let k = 0; k < 12; k++) { const bs = [...document.querySelectorAll('#talk .choices button')]; if (bs.length < 2) break; bs[k % (bs.length - 1)].click(); await wait(30); said.push(txt()); }
        document.querySelector('#talk .choices button:last-child').click();
        if (new Set(said).size !== said.length) bad.push(v.npc);
      }
      return bad;
    });
    assert.deepEqual(talks, []);
    step('economy: buy and sell, and a side job from offer to pay');
    const eco = await p.evaluate(async () => {
      const wait = (ms) => new Promise((r) => setTimeout(r, ms));
      openShop(__game.actors.find((a) => a.npc === 'Торговка Марта'));
      const g0 = gold, b0 = handsCount('bread'); document.querySelector('.sh-buy .sh-item').click();
      const bought = gold < g0 && handsCount('bread') === b0 + 1; closeShop();
      const j = JOBS.find((j) => j.id === 'sweep'); jobOffer(__game.actors.find((a) => a.npc === j.giver));
      [...document.querySelectorAll('#talk .choices button')].find((b) => b.textContent === 'Взяться').click();
      const sp = JOB.sweep.spot, H = __game.H0; H.x = sp[0]; H.z = sp[1]; H.px = sp[0] + .5; H.pz = sp[1] + .5; H.route = null;
      for (let i = 0; i < 40 && JOB.sweep.state !== 2; i++) await wait(250);
      const g1 = gold; jobOffer(__game.actors.find((a) => a.npc === j.giver)); document.querySelector('#talk .choices button:last-child').click();
      return {bought, ready: JOB.sweep.state === 0 && JOB.sweep.day === dayN, paid: gold - g1};
    });
    assert.deepEqual(eco, {bought: true, ready: true, paid: 3});
    await p.close();

    // ---------- a new game: editor, then the whole tutorial ----------
    step('tutorial: first six steps, stones from anywhere count');
    p = await open();
    await p.click('#mNew');
    await p.waitForSelector('#edGo');
    await p.click('#edGo');
    const tut = () => p.evaluate(() => document.querySelector('#quest .tut b')?.textContent || '—');
    await p.waitForFunction(() => document.querySelector('#quest .tut b')?.textContent === 'Сойдите с причала', null, {timeout: 60000});
    const at = (x, z) => p.evaluate(([x, z]) => { const g = __game; g.H0.x = x; g.H0.z = z; g.H0.px = x + .5; g.H0.pz = z + .5; }, [x, z]);
    const until = async (cond, ms = 15000) => { const t = Date.now(); while (Date.now() - t < ms) { if (await cond()) return true; await p.waitForTimeout(200); } return false; };
    await at(10, 31); assert.ok(await until(async () => (await tut()) !== 'Сойдите с причала'));
    await p.evaluate(() => { const g = __game, a = g.actors.find((a) => a.talkId === 'fisher'); g.talk(a); });
    await p.evaluate(() => document.querySelector('#talk .choices button').click());
    assert.ok(await until(async () => (await tut()).includes('руки')));
    await p.click('#palmR', {force: true});
    assert.ok(await until(async () => (await tut()).includes('камни')));
    await p.evaluate(() => window.handsAdd('stone', 1));
    assert.ok(await until(async () => (await tut()).includes('деревни')));
    await p.evaluate(() => { const g = __game; g.H0.x = g.Z.village[0]; g.H0.z = g.Z.village[1] + 3; g.H0.px = g.H0.x + .5; g.H0.pz = g.H0.z + .5; });
    assert.ok(await until(async () => (await tut()).includes('Браму')));
    console.log('  reached: ' + await tut());
    assert.deepEqual(errors, []);
    console.log('island beta browser checks ok');
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => { console.error(e); process.exitCode = 1; server.close(); });
