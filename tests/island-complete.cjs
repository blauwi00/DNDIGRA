// A completionist bot: plays the whole island and then does everything else there is to do. It plays the main
// story to the Raven's end, then walks into every house, attic and cellar and uses every thing in it, loots every
// chest, picks up everything on the ground, talks to every person and tries every dialog choice, buys every ware
// and sells what it can in every shop, does every side job, fights every enemy left, and only then sails. Each
// bot plays another class and takes the side phases in another order. Everything that cannot be done is a bug.
// Real Chromium, the shipped page (site/island).
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-complete.cjs <bot 0..9> [report.json]
const fs = require('node:fs');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {server, HELPERS, STEPS} = require('./island-play-lib.cjs');

const bot = +(process.argv[2] || 0), reportFile = process.argv[3];
const CLASSES = ['fighter', 'barbarian', 'rogue', 'mage', 'cleric', 'ranger', 'bard', 'paladin', 'druid', 'monk', 'warlock', 'sorcerer'];
const cls = CLASSES[bot % CLASSES.length];

// helpers for doing everything, on top of the playthrough's
const MORE = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const C = window.CO = {done: {}, fail: []};
  C.count = (k) => { C.done[k] = (C.done[k] || 0) + 1; };
  C.bad = (t) => { if (C.fail.length < 400) C.fail.push(t); };
  C.empty = () => { window.handsLoad({L: null, R: null, bag: []}); };
  // answer whatever is open: a dialog takes its first real choice, a shop or chest is closed
  C.settle = async () => {
    for (let i = 0; i < 6; i++) {
      if (CB.on) await PT.fight(300);
      const t = document.getElementById('talk');
      if (!t.hidden) { t.click(); await sleep(200); const b = [...t.querySelectorAll('.choices button')].filter((x) => !/Отплыть|Назад/.test(x.textContent)); if (b.length && i < 3) { b[0].click(); await sleep(500); continue; } t.hidden = true; }
      const cf = document.getElementById('confirm'); if (cf && !cf.hidden) { const no = cf.querySelector('.no'); if (no) no.click(); else cf.hidden = true; }
      if (!document.getElementById('shop').hidden) closeShop();
      const cl = [...document.querySelectorAll('#chestui button')].find((b) => b.textContent === 'Закрыть'); if (cl && cl.offsetParent) cl.click();
      if (!document.getElementById('roll').hidden) await sleep(1500);
      closeWheel(); paused = false; busy = false; return;
    }
  };
  C.heal = () => { if (H0.dead) { H0.dead = false; hero.rotation.z = 0; } H0.hp = H0.max; setHP(); };
  // every house, attic and cellar: go in and use everything inside
  C.rooms = async () => {
    const order = [...ROOMS.filter((R) => !R.sub), ...ROOMS.filter((R) => R.sub)];
    for (const R of order) {
      await C.settle(); C.heal();
      if (R.sub) { const P = R.parent; if (!P) continue; let r = await PT.enter(P); if (r !== 'ok') { C.bad('room ' + P.name + ': ' + r); continue; }
        const way = interact.find((i) => /Лестница на чердак|Люк в подвал/.test(i.name) && ((R.attic || P.attic === R) ? /чердак/.test(i.name) : /подвал/.test(i.name)) && C.inR(i, P));
        if (!way) { C.bad('no way into ' + R.name + ' of ' + P.name); continue; }
        r = await PT.walk(way.x, way.z, true); if (r !== 'ok') { C.bad(R.name + ': ' + r); continue; } way.use(); await sleep(1500);
        if (room !== R) { C.bad('did not get into ' + R.name + ' of ' + P.name); continue; } }
      else { const r = await PT.enter(R); if (r !== 'ok') { C.bad('room ' + R.name + ': ' + r); continue; } }
      C.count('rooms');
      for (const it of interact.filter((i) => C.inR(i, room) && !/Дверь|Лестница|Люк/.test(i.name))) await C.use(it);
      for (const L of looks.filter((l) => l.loot && !l.taken && l.meshes && l.meshes[0] && C.inRxz(l.meshes[0].getWorldPosition(new THREE.Vector3()), room))) await C.look(L);
      if (room && room.sub) { const back = interact.find((i) => /Лестница вниз|Лестница наверх/.test(i.name) && C.inR(i, room)); if (back) { await PT.walk(back.x, back.z, true); back.use(); await sleep(1500); } else C.bad('no way back from ' + room.name); }
      await PT.leave(); if (room && !room.inPlace) { await PT.leave(); }
    }
  };
  C.inR = (it, R) => R && it.x >= R.ox - (R.inPlace ? 0 : 0) && it.x < R.ox + (R.iw || R.w || 0) && it.z >= R.oz && it.z < R.oz + (R.id || R.d || 0);
  C.inRxz = (p, R) => R && p.x >= R.ox && p.x < R.ox + (R.iw || R.w || 0) && p.z >= R.oz && p.z < R.oz + (R.id || R.d || 0);
  C.use = async (it) => {
    if (it.chest && it.opened && !it.items.some(Boolean)) return;
    C.empty(); const r = await PT.walk(it.x, it.z, true); if (r !== 'ok') { C.bad((it.name || 'thing') + ' at ' + it.x + ',' + it.z + ': ' + r); return; }
    try { it.use(); } catch (e) { C.bad((it.name || 'thing') + ' use: ' + e.message); return; }
    await sleep(900);
    if (it.chest) { const all = [...document.querySelectorAll('#chestui button')].find((b) => /Взять/.test(b.textContent)); if (all) { all.click(); await sleep(400); C.count('chests'); } else C.bad('chest ' + it.name + ' did not open'); }
    else C.count('things');
    await C.settle();
  };
  C.look = async (L) => { const p = new THREE.Vector3(); L.meshes[0].getWorldPosition(p); C.empty(); inspect(L, Math.floor(p.x), Math.floor(p.z), true);
    for (let i = 0; i < 40 && !L.taken; i++) await sleep(300); if (L.taken) C.count('pickups'); else C.bad('could not pick up ' + (L.n || 'a thing') + ' at ' + Math.floor(p.x) + ',' + Math.floor(p.z)); await C.settle(); };
  // every thing outside: barrels, locked chests, stones, things on the ground
  C.outside = async () => {
    await PT.leave();
    for (const it of interact.filter((i) => !ROOMS.some((R) => C.inR(i, R)) && !/Дверь|Лестница|Люк/.test(i.name)).slice()) { if (!interact.includes(it)) continue; C.heal(); await C.use(it); }
    for (const L of looks.filter((l) => l.loot && !l.taken && l.meshes && l.meshes[0] && !ROOMS.some((R) => C.inRxz(l.meshes[0].getWorldPosition(new THREE.Vector3()), R)))) await C.look(L);
  };
  // every person, every dialog choice to a depth of three
  C.talks = async () => {
    const ppl = actors.filter((a) => a !== H0 && a.npc && !a.hidden && !a.dead && !a.ally && a.talkId !== 'captain');
    for (const a of ppl) {
      if (a.dead || a.hidden) continue; C.heal();
      const R = ROOMS.find((R) => !R.inPlace && C.inR(a, R)); if (R && room !== R) { await PT.leave(); const r = await PT.enter(R); if (r !== 'ok') { C.bad(a.npc + ': ' + r); continue; } } else if (!R) await PT.leave();
      const tried = new Set(), queue = [[]]; let n = 0;
      while (queue.length && n < 20) {
        const way = queue.shift(); n++;
        const r = await PT.walk(a.x, a.z, true); if (r !== 'ok') { C.bad('talk ' + a.npc + ': ' + r); break; }
        PT.closeTalk(); try { talk(a); } catch (e) { C.bad('talk ' + a.npc + ': ' + e.message); break; } await sleep(500);
        let ok = true;
        for (const lab of way) { const t = document.getElementById('talk'); t.click(); await sleep(150); const b = [...t.querySelectorAll('.choices button')].find((x) => x.textContent === lab); if (!b) { ok = false; break; } b.click(); await sleep(600);
          if (CB.on) { await PT.fight(300); C.heal(); ok = false; break; } if (!document.getElementById('shop').hidden) { closeShop(); ok = false; break; } }
        const t = document.getElementById('talk');
        if (ok && !t.hidden && way.length < 3) { t.click(); await sleep(150);
          for (const b of t.querySelectorAll('.choices button')) { const lab = b.textContent; if (/Отплыть|Назад|Уйти|Пока/.test(lab)) continue; const k = [...way, lab].join(' > '); if (tried.has(k)) continue; tried.add(k); queue.push([...way, lab]); } }
        C.count('dialog paths'); await C.settle();
      }
      C.count('people');
    }
  };
  // every shop: buy one of each ware, sell everything it takes
  C.shops = async () => {
    for (const [npc, S] of Object.entries(SHOPS)) {
      const a = actors.find((x) => x.npc === npc); if (!a || a.hidden) { C.bad('shop keeper ' + npc + ' missing'); continue; }
      const R = ROOMS.find((R) => !R.inPlace && C.inR(a, R)); await PT.leave(); if (R) { const r = await PT.enter(R); if (r !== 'ok') { C.bad('shop ' + npc + ': ' + r); continue; } }
      const r = await PT.walk(a.x, a.z, true); if (r !== 'ok') { C.bad('shop ' + npc + ': ' + r); continue; }
      gold = 999; goldUI();
      for (const id of shopWares(S)) { C.empty(); openShop(a); await sleep(200); const was = window.handsCount(id); const b = [...shopEl.querySelectorAll('.sh-buy .sh-item')].find((x) => x.querySelector('span').textContent === window.handsItemName(id)); if (!b) { C.bad(npc + ': ware ' + id + ' not shown'); closeShop(); continue; }
        b.click(); await sleep(150); if (window.handsCount(id) !== was + 1) C.bad(npc + ': could not buy ' + id); else C.count('bought');
        // sell it back if the shop takes it
        renderShop(); const s = [...shopEl.querySelectorAll('.sh-sell .sh-item')][0]; if (s && !s.disabled) { s.click(); await sleep(150); C.count('sold'); }
        closeShop(); }
      C.count('shops');
    }
    C.empty();
  };
  // every side job, from offer to pay
  C.jobs = async () => {
    for (const j of JOBS) {
      C.heal(); await PT.leave(); const g = actors.find((a) => a.npc === j.giver); if (!g) { C.bad('job ' + j.title + ': no giver'); continue; }
      if (j.evening) worldTime = .8; else worldTime = .4;
      if (nightness() <= .2 && j.evening) { worldTime = .9; }
      const st = JOB[j.id]; st.day = -1; st.state = 0; C.empty();
      const gR = ROOMS.find((R) => !R.inPlace && C.inR(g, R)); if (gR) await PT.enter(gR);
      let r = await PT.walk(g.x, g.z, true); if (r !== 'ok') { C.bad('job ' + j.title + ': ' + r); continue; }
      jobOffer(g); await sleep(300); await PT.choose('Взяться'); PT.closeTalk(); if (st.state !== 1) { C.bad('job ' + j.title + ': could not take it'); continue; }
      await PT.leave();
      if (j.kind === 'patrol') { for (const p of j.points) { r = await PT.walk(p[0], p[1], false); if (r !== 'ok') C.bad('patrol ' + j.title + ': ' + r); await sleep(800); } }
      if (j.kind === 'fetch') PT.give(j.item, j.n);
      if (j.kind === 'work') { r = await PT.walk(st.spot[0], st.spot[1], false); if (r !== 'ok') C.bad('job ' + j.title + ': ' + r); for (let i = 0; i < 40 && st.state === 1; i++) await sleep(300); }
      if (j.kind === 'deliver') { const to = actors.find((a) => a.npc === j.to); const tR = to && ROOMS.find((R) => !R.inPlace && C.inR(to, R)); if (tR) await PT.enter(tR);
        r = to ? await PT.walk(to.x, to.z, true) : 'no receiver'; if (r !== 'ok') { C.bad('deliver ' + j.title + ': ' + r); continue; } talk(to); await sleep(500); PT.closeTalk();
        if (st.state === 0) { C.count('jobs'); continue; } C.bad('deliver ' + j.title + ': not taken by ' + j.to); continue; }
      if (st.state !== 2 && j.kind !== 'fetch') { C.bad('job ' + j.title + ': not finished (state ' + st.state + ')'); continue; }
      if (gR) await PT.enter(gR); await PT.walk(g.x, g.z, true); jobOffer(g); await sleep(400); PT.closeTalk();
      if (st.state === 0 && st.day === dayN) C.count('jobs'); else C.bad('job ' + j.title + ': no pay (state ' + st.state + ')');
    }
    worldTime = .4;
  };
  // every enemy left on the island
  C.foes = async () => {
    await PT.leave();
    for (let k = 0; k < 400; k++) {
      C.heal(); const e = enemies.filter((e) => !e.dead && !e.dormant && !e.tame).sort((a, b) => man(a, H0) - man(b, H0))[0]; if (!e) break;
      const r = await PT.walk(e.x, e.z, true); if (!CB.on && !e.dead) startCombat(e, false, true);
      const f = await PT.fight(400); if (f !== 'won' && !e.dead) { C.bad('fight ' + e.name + ' at ' + e.x + ',' + e.z + ': ' + f + (r !== 'ok' ? ' / ' + r : '')); e.dead = true; e.o.visible = false; } else C.count('fights');
    }
    C.done['foes left'] = enemies.filter((e) => !e.dead && !e.dormant).length;
  };
};

(async () => {
  await new Promise((r) => server.listen(0, r));
  const browser = await chromium.launch({args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader']});
  const vp = [[844, 390], [667, 375], [1280, 720], [932, 430]][bot % 4];
  // SHOTS=<dir> saves a picture every 20 s; VIDEO=<dir> records the whole run as a video
  const ctx = await browser.newContext({viewport: {width: vp[0], height: vp[1]}, hasTouch: true, ...(process.env.VIDEO ? {recordVideo: {dir: process.env.VIDEO, size: {width: vp[0], height: vp[1]}}} : {})});
  const p = await ctx.newPage();
  let shotN = 0; const shots = process.env.SHOTS && setInterval(() => { p.screenshot({path: process.env.SHOTS + '/bot' + bot + '-' + String(shotN++).padStart(4, '0') + '.jpg', type: 'jpeg', quality: 70}).catch(() => {}); }, 20000);
  p.setDefaultTimeout(3600000);
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  await p.addInitScript(([c, b]) => { localStorage.clear(); window.NOPV = 1; window.TEXT_DELAY = 0;
    localStorage.setItem('helga-hero', JSON.stringify({name: 'Бот' + b, cls: c, race: 'human', kit: 0, look: {skin: 'e9bf90', hair: '493024', cloth: '284d6c', style: 'messy'}}));
    sessionStorage.setItem('helga-start', 'new'); }, [cls, bot]);
  await p.goto('http://127.0.0.1:' + server.address().port + '/');
  await p.waitForFunction(() => typeof H0 !== 'undefined' && typeof ROOMS !== 'undefined' && typeof TUT !== 'undefined', null, {timeout: 600000});
  await p.waitForTimeout(5000);
  await p.evaluate(() => { try { screen(null); } catch (e) {} });
  await p.evaluate(HELPERS); await p.evaluate(MORE);
  const log = [], t0 = Date.now();
  const run = async (name, src) => { const t = Date.now(); let r;
    try { r = await Promise.race([p.evaluate(src), new Promise((res) => setTimeout(() => res('timeout after 15 min'), 900000))]);
      if (String(r).startsWith('timeout')) r += ' ' + await p.evaluate(() => JSON.stringify({x: H0.x, z: H0.z, room: room && room.name, cb: CB.on, busy, paused, route: H0.route && H0.route.length, talk: PT.text().slice(0, 80)})).catch(() => ''); } catch (e) { r = 'crash: ' + e.message.split('\n')[0]; }
    const line = {step: name, result: r === undefined ? 'ok' : r, secs: Math.round((Date.now() - t) / 1000), errors: errors.splice(0)};
    log.push(line); console.log('[bot ' + bot + '] ' + (line.result === 'ok' ? 'ok   ' : 'FAIL ') + name + (line.result === 'ok' ? '' : ' — ' + line.result) + ' (' + line.secs + 's)' + (line.errors.length ? ' ERRORS: ' + line.errors.join(' | ') : '')); };
  // the story up to the ship, then every side phase in this bot's order, then the ship
  const story = STEPS.slice(0, -2), sail = STEPS.slice(-2);
  for (const [name, fn] of story) await run(name, `(${fn.toString()})()`);
  const sides = [['rooms, attics, cellars', 'CO.rooms()'], ['things outside', 'CO.outside()'], ['every person, every choice', 'CO.talks()'], ['every shop', 'CO.shops()'], ['every side job', 'CO.jobs()'], ['every enemy', 'CO.foes()']];
  for (let i = 0; i < sides.length; i++) { const [name, src] = sides[(i + bot) % sides.length]; await run(name, `(async () => { await ${src}; return 'ok'; })()`); }
  for (const [name, fn] of sail) await run(name, `(${fn.toString()})()`);
  const co = await p.evaluate(() => ({done: CO.done, fail: CO.fail, rep: Object.fromEntries(Object.keys(FACTIONS).map((f) => [f, repName(f)])), lv: LV.lv, gold}));
  const rep = {bot, cls, viewport: vp, minutes: Math.round((Date.now() - t0) / 60000), steps: log, ...co};
  console.log('[bot ' + bot + '] done: ' + JSON.stringify(co.done) + ' rep ' + JSON.stringify(co.rep) + ' failures ' + co.fail.length);
  for (const f of co.fail) console.log('[bot ' + bot + ']   ' + f);
  if (reportFile) fs.writeFileSync(reportFile, JSON.stringify(rep, null, 1));
  if (shots) clearInterval(shots); await ctx.close(); await browser.close(); server.close();
})().catch((e) => { console.error(e); process.exit(1); });
