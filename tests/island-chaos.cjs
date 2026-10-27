// A chaos tester for the island: plays like a reckless player for a while and reports what broke.
// It taps the screen anywhere, holds to walk, opens every wheel and dialog choice, the bag, the menu, the map and
// the chronicle, picks fights with whatever is near and keeps fighting, jumps across the island now and then to
// cover it, and watches for page errors, a hero who cannot move, a fight that never moves on and impossible states.
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-chaos.cjs <seed> <minutes> [report.json]
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const seed = +(process.argv[2] || 1), minutes = +(process.argv[3] || 5), reportFile = process.argv[4];
const root = path.resolve(__dirname, '..', 'site', 'island');
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'content-type': file.endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8'});
  fs.createReadStream(file).pipe(res);
});
let s = seed * 7919 + 13; const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647, pick = (a) => a[Math.floor(rnd() * a.length)];

(async () => {
  await new Promise((r) => server.listen(0, r));
  const browser = await chromium.launch({args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader']});
  const [w, h] = pick([[844, 390], [667, 375], [1280, 720], [932, 430]]);
  const p = await browser.newPage({viewport: {width: w, height: h}, hasTouch: true});
  const found = [], note = (kind, text) => { const k = kind + ': ' + String(text).slice(0, 300); if (!found.some((f) => f.k === k)) found.push({k, t: Date.now()}); };
  p.on('pageerror', (e) => note('error', e.message));
  p.on('console', (m) => { if (m.type() === 'error' && !/favicon|ERR_|net::/.test(m.text())) note('console', m.text()); });
  const cls = pick(['fighter', 'barbarian', 'rogue', 'mage', 'cleric', 'ranger', 'bard', 'paladin', 'druid', 'monk', 'warlock', 'sorcerer']);
  await p.addInitScript(([c, sd, vx]) => { localStorage.clear(); if (vx) localStorage.setItem('helga-vox', '1'); window.NOPV = 1; window.TEXT_DELAY = 0;
    localStorage.setItem('helga-hero', JSON.stringify({name: 'Бот' + sd, cls: c, race: 'human', kit: 0, look: {skin: 'e9bf90', hair: '493024', cloth: '284d6c', style: 'messy'}}));
    sessionStorage.setItem('helga-start', 'new'); }, [cls, seed, process.env.VOX === '1']);
  await p.goto('http://127.0.0.1:' + server.address().port + '/');
  await p.waitForFunction(() => typeof H0 !== 'undefined' && typeof ROOMS !== 'undefined', null, {timeout: 180000});
  await p.waitForTimeout(4000);
  await p.evaluate(() => { try { screen(null); } catch (e) {} });
  const end = Date.now() + minutes * 60000; let last = null, still = 0, fightKey = null, fightSince = 0, steps = 0;
  const box = await p.$('canvas');
  while (Date.now() < end) {
    steps++;
    try {
      const st = await p.evaluate(() => ({x: H0.x, z: H0.z, px: H0.px, pz: H0.pz, route: !!(H0.route && H0.route.length), hp: H0.hp, dead: H0.dead, cb: CB.on, turn: CB.on ? CB.i + '/' + CB.round : '', paused, busy,
        talk: !document.getElementById('talk').hidden, wheel: !!document.querySelector('.wheel:not([hidden]) button'), room: room ? room.name : '', nan: actors.some((a) => !isFinite(a.px) || !isFinite(a.pz))}));
      if (st.nan) note('state', 'an actor has a NaN position');
      if (!isFinite(st.px)) note('state', 'hero position NaN');
      // a hero with somewhere to go who does not move for long is stuck
      const key = st.x + ',' + st.z;
      if (st.route && !st.cb && !st.paused && key === last) { still++; if (still > 25) { note('stuck', 'hero cannot move at ' + key + (st.room ? ' in ' + st.room : '')); still = 0; await p.evaluate(() => { H0.route = null; }); } } else still = 0;
      last = key;
      // a fight that does not move on for a minute is stuck
      if (st.cb) { if (st.turn !== fightKey) { fightKey = st.turn; fightSince = Date.now(); } else if (Date.now() - fightSince > 120000) { const why = await p.evaluate(() => { const a = CB.order[CB.i]; return (a === H0 ? 'hero' : a ? a.name + (a.ally ? '(ally)' : '') + (a.dead ? ' dead' : '') + (a.down ? ' down' : '') : 'none') + ' busy=' + busy + ' acted=' + CB.acted + ' move=' + CB.move + ' anims=' + anims.length + ' talk=' + !document.getElementById('talk').hidden + ' paused=' + paused + ' foes=' + liveFoes().length + ' roll=' + !document.getElementById('roll').hidden; }); note('stuck', 'fight frozen: ' + why); fightSince = Date.now(); await p.evaluate(() => { if (heroTurn()) endHeroTurn(); }); } }
      if (st.dead || st.hp <= 0) await p.evaluate(() => { H0.dead = false; H0.hp = H0.max; hero.rotation.z = 0; setHP(); document.querySelectorAll('.screen').forEach((e) => { if (e.id === 'death' || /death|ko/.test(e.className)) e.hidden = true; }); });
      else if (st.hp < 6 && rnd() < .5) await p.evaluate(() => { H0.hp = H0.max; setHP(); });
      const r = rnd();
      if (st.talk) { const b = await p.$$('.talk .choices button'); if (b.length) await pick(b).click({force: true, timeout: 2000}).catch(() => {}); else await p.click('.talk', {force: true, timeout: 2000}).catch(() => {}); }
      else if (st.wheel && r < .7 && !st.cb) { const b = await p.$$('.wheel:not([hidden]) button:not([disabled])'); if (b.length) await pick(b).click({force: true, timeout: 2000}).catch(() => {}); }
      else if (st.paused && !st.cb) { await p.evaluate(() => { for (const id of ['mapClose', 'pResume']) { const e = document.getElementById(id); if (e && e.offsetParent) e.click(); } try { if (typeof closeShop === 'function') closeShop(); } catch (e) {} screen(null); }); }
      else if (st.cb) {
        // in a fight: on the hero's turn tap the nearest foe and take the first attack, or end the turn
        const acted = await p.evaluate(() => { if (!heroTurn() || busy) return 'wait'; const f = liveFoes().sort((a, b) => man(a, H0) - man(b, H0))[0]; if (!f || CB.acted || Math.random() < .25) { endHeroTurn(); return 'end'; } tapActor(f); return 'tap'; });
        if (acted === 'tap') { await p.waitForTimeout(300); const b = await p.$$('.wheel:not([hidden]) button:not([disabled])'); if (b.length) await b[0].click({force: true, timeout: 2000}).catch(() => {}); else await p.evaluate(() => { if (heroTurn() && !busy) endHeroTurn(); }); }
      } else if (r < .45) { const bb = await box.boundingBox(); await p.mouse.click(bb.x + rnd() * bb.width, bb.y + rnd() * bb.height); }
      else if (r < .55) { const bb = await box.boundingBox(), x = bb.x + rnd() * bb.width, y = bb.y + rnd() * bb.height; await p.mouse.move(x, y); await p.mouse.down(); await p.waitForTimeout(600 + rnd() * 1400); await p.mouse.up(); }
      else if (r < .63) await p.evaluate(() => { const ns = actors.filter((a) => a.npc && !a.hidden && !a.dead && a.o.visible).sort((a, b) => man(a, H0) - man(b, H0)); if (ns[0]) tapActor(ns[0]); });
      else if (r < .70) await p.evaluate(() => { const it = interact.filter((i) => Math.hypot(i.x - H0.x, i.z - H0.z) < 14)[0]; if (it) goDo(it.x, it.z, !!it.stand, () => it.use()); });
      else if (r < .76) await p.evaluate(() => { const e = enemies.filter((e) => !e.dead && !e.dormant && e.o.visible).sort((a, b) => man(a, H0) - man(b, H0))[0]; if (e) tapActor(e); });
      else if (r < .80) { const id = pick(['#palmL', '#palmR', '.menubtn', '.mini', '.quest .qhead']); await p.click(id, {force: true, timeout: 1500}).catch(() => {}); }
      else if (r < .83) await p.evaluate(() => { try { screen(pauseEl); } catch (e) {} const b = [...document.querySelectorAll('#pause button')]; const k = b[Math.floor(Math.random() * b.length)]; if (k && k.id !== 'pMain') k.click(); });
      else if (r < .86) await p.evaluate(() => { worldTime = Math.random(); });
      else if (r < .90) await p.evaluate(() => { // jump across the island (or into a building) to cover it
        const go = Math.random(); let x, z;
        if (go < .35) { const R = ROOMS[Math.floor(Math.random() * ROOMS.length)]; [x, z] = R.inPlace ? [R.exit[0], R.exit[1] - 1] : [R.door[0], R.door[1] + 1]; }
        else if (go < .7) { const P = GEN.places[Math.floor(Math.random() * GEN.places.length)]; [x, z] = nearFree(Math.round(P.x), Math.round(P.z) + 3, 6); }
        else { x = Math.floor(Math.random() * W); z = Math.floor(Math.random() * OUT_H); [x, z] = nearFree(x, z, 6); }
        if (!CB.on && !busy && free(x, z)) { H0.route = null; H0.x = x; H0.z = z; H0.px = x + .5; H0.pz = z + .5; focus.set(H0.px, 0, H0.pz); } });
      else if (r < .95) await p.evaluate(() => { // pick a fight with whatever is close
        const e = enemies.filter((e) => !e.dead && !e.dormant && e.o.visible && man(e, H0) < 20).sort((a, b) => man(a, H0) - man(b, H0))[0]; if (e && !CB.on && !busy) startCombat(e); });
      else await p.evaluate(() => { save(); });
    } catch (e) { note('bot', e.message); }
    await p.waitForTimeout(150 + rnd() * 350);
  }
  // the layout must still hold after all that
  const ov = await p.evaluate(() => { const els = ['.hp', '.gold', '.mini', '.menubtn', '.quest', '.title', '.palm'].flatMap((s) => [...document.querySelectorAll(s)]).filter((e) => e.offsetParent && getComputedStyle(e).visibility !== 'hidden');
    const out = []; for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) { const A = els[i].getBoundingClientRect(), B = els[j].getBoundingClientRect(); if (els[i].contains(els[j]) || els[j].contains(els[i])) continue; if (A.left < B.right - .5 && B.left < A.right - .5 && A.top < B.bottom - .5 && B.top < A.bottom - .5) out.push(els[i].className + ' x ' + els[j].className); } return out; });
  for (const o of ov) note('overlap', o);
  const rep = {seed, cls, viewport: [w, h], minutes, steps, found: found.map((f) => f.k)};
  console.log(JSON.stringify(rep, null, 1));
  if (reportFile) fs.writeFileSync(reportFile, JSON.stringify(rep, null, 1));
  await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
