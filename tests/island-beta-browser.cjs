// The island beta in real Chromium, served exactly as players get it (site/island).
// It walks the menu and settings, the editor, every people x class x gender x look option,
// the two-hands rule, every starting kit's attacks, villager talks and the whole tutorial.
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-beta-browser.cjs
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = process.env.ISLAND_SITE ? path.resolve(process.env.ISLAND_SITE) : path.resolve(__dirname, '..', 'site', 'island');
const types = {'.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.txt': 'text/plain', '.md': 'text/plain'};
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'content-type': types[path.extname(file)] || 'application/octet-stream'});
  fs.createReadStream(file).pipe(res);
});
const step = (name) => console.log('· ' + name);
// visible boxes of these selectors must not overlap; parts hidden by a scrolling parent do not count
const overlaps = (sel) => {
  const els = [];
  for (const q of sel) for (const e of document.querySelectorAll(q)) {
    let o = e, vis = true;
    while (o && o !== document.body) { const cs = getComputedStyle(o); if (o.hidden || cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity < .05) { vis = false; break; } o = o.parentElement; }
    if (!vis) continue;
    const b = e.getBoundingClientRect(); const r = {left: b.left, top: b.top, right: b.right, bottom: b.bottom};
    for (let o = e.parentElement; o && o !== document.body; o = o.parentElement) { const cs = getComputedStyle(o); if (/(auto|scroll|hidden)/.test(cs.overflow + cs.overflowY + cs.overflowX)) { const c = o.getBoundingClientRect(); r.left = Math.max(r.left, c.left); r.top = Math.max(r.top, c.top); r.right = Math.min(r.right, c.right); r.bottom = Math.min(r.bottom, c.bottom); } }
    if (r.right - r.left >= 2 && r.bottom - r.top >= 2) els.push([q + (e.id ? '#' + e.id : ''), r, e]);
  }
  const out = [];
  for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) {
    const [a, A, ea] = els[i], [c, B, eb] = els[j];
    if (ea.contains(eb) || eb.contains(ea)) continue;
    if (A.left < B.right - .5 && B.left < A.right - .5 && A.top < B.bottom - .5 && B.top < A.bottom - .5) out.push(a + ' x ' + c);
  }
  return out;
};
const HUD = ['.hp', '.gold', '.mini', '.menubtn', '.quest', '.title', '.palm', '.held', '.talk', '.wheel', '.workbar', '.order', '.roll'];

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

    step('one piece: no block hovers, hands move with the forearms, legs meet the body');
    const piece = await p.evaluate(() => {
      const bad = [], touch = (a, b) => [0, 1, 2].every((i) => Math.abs(a[i] - b[i]) <= (a[i + 3] + b[i + 3]) / 2 + .012);
      for (const race of RACE_ORDER) for (const cls of CLASS_ORDER) for (const g of ['male', 'female']) {
        const ap = baseLook(cls, race, g), P = buildModel(raceDecorate(race, C_.build(C_.spec('hero', {classId: gidOf(cls), appearance: ap})), ap)).userData.parts;
        const all = Object.values(P).flat(), solid = all.filter((b) => !b[8]), id = race + ' ' + cls + ' ' + g;
        if (all.some((b) => !solid.some((c) => c !== b && touch(b, c)))) bad.push(id + ' floating block');
        const skin = new THREE.Color(ap.skin).getHex();
        if (P.head.some((b) => !b[8] && b[1] < .6 && b[6] === skin)) bad.push(id + ' hand on the head');
        const tb = Math.min(...P.torso.filter((b) => !b[8]).map((b) => b[1] - b[4] / 2));
        for (const k of ['legL', 'legR']) if (Math.max(...P[k].filter((b) => !b[8]).map((b) => b[1] + b[4] / 2)) < tb) bad.push(id + ' gap at ' + k);
      }
      return bad;
    });
    assert.deepEqual(piece, []);

    step('nothing passes through: arms, legs and hems clear each other at rest and mid-stride');
    const through = await p.evaluate(() => {
      const bad = new Set(), M = .015, v = new THREE.Vector3();
      const watch = /^(fore[LR]\/(torso|legL|legR|cape|head)|arm[LR]\/(legL|legR|cape)|legL\/legR)$/;
      for (const race of RACE_ORDER) for (const cls of CLASS_ORDER) for (const g of ['male', 'female']) {
        const ap = baseLook(cls, race, g), m = buildModel(raceDecorate(race, C_.build(C_.spec('hero', {classId: gidOf(cls), appearance: ap})), ap));
        const P = m.userData.parts, r = m.userData.rig, ks = Object.keys(P).filter((k) => P[k].length);
        const org = (k) => k.startsWith('fore') ? r[k].position.clone().add(r[k].parent.position) : r[k].position.clone();
        for (const [walk, sw] of [[0, 0], [1, 1], [1, -1]]) {
          armPose(m, walk, sw, 0); r.legL.rotation.x = sw * .5; r.legR.rotation.x = -sw * .5; m.updateMatrixWorld(true);
          for (const a of ks) for (const b of ks) {
            const pair = a + '/' + b; if (!watch.test(pair)) continue; const oa = org(a), ob = org(b), inv = r[b].matrixWorld.clone().invert();
            for (const A of P[a]) if (!A[8]) for (const fx of [-.5, 0, .5]) for (const fy of [-.5, 0, .5]) for (const fz of [-.5, 0, .5]) {
              v.set(A[0] + fx * A[3] - oa.x, A[1] + fy * A[4] - oa.y, A[2] + fz * A[5] - oa.z).applyMatrix4(r[a].matrixWorld).applyMatrix4(inv).add(ob);
              if (P[b].some((B) => !B[8] && Math.abs(v.x - B[0]) < B[3] / 2 - M && Math.abs(v.y - B[1]) < B[4] / 2 - M && Math.abs(v.z - B[2]) < B[5] / 2 - M)) bad.add(race + ' ' + cls + ' ' + g + ' ' + pair);
            }
          }
        }
      }
      return [...bad];
    });
    assert.deepEqual(through, []);

    step('peoples: no plus to rolls or sheet, one unique ability each that changes the game');
    const peoples = await p.evaluate(() => {
      const bad = [], FL = ['boost', 'reroll', 'stone', 'slip', 'wave', 'shellUp', 'mend', 'readMove', 'scream', 'lucky', 'clever', 'might', 'relentless', 'rebuke', 'breath'];
      const own = RACE_ORDER.map((r) => FL.filter((f) => RACES[r][f]));
      if (own.some((o) => o.length !== 1) || new Set(own.flat()).size !== RACE_ORDER.length) bad.push('abilities: ' + JSON.stringify(own));
      if (new Set(RACE_ORDER.map((r) => RACES[r].ab)).size !== RACE_ORDER.length) bad.push('ability texts repeat');
      const as = (race, cls = 'fighter') => { HERO = applyRace(Object.assign({cls}, CLASSES[cls]), race); rest(); return HERO; };
      const H = __game.H0;
      const foe = __game.enemies.find((e) => !e.dead) || __game.enemies[0];
      const look = (dist, sneak) => { __game.setTime(.5); H.sneak = sneak; H.px = foe.px + dist; H.pz = foe.pz; foe.face = Math.PI / 2; return __game.sees(foe); };
      // the sheet and every attack come from the class alone
      for (const cls of ['fighter', 'rogue', 'mage']) {
        as('human', cls); equipHero(null, null); const ref = JSON.stringify(heroAttacks().map((o) => [o.hit, o.b])), acRef = heroAC();
        for (const r of RACE_ORDER) {
          const h = as(r, cls);
          for (const k of ['hp', 'ac', 'melee', 'ranged', 'spell', 'stealth', 'athletics', 'speed', 'dex']) if (h[k] !== CLASSES[cls][k]) bad.push(r + ' ' + cls + ' ' + k);
          if (JSON.stringify(heroAttacks().map((o) => [o.hit, o.b])) !== ref || heroAC() !== acRef || h.init || h.mdmg || h.dr || h.heal) bad.push(r + ' ' + cls + ' bonus');
        }
      }
      // human: better prices and pay
      as('human'); const hp1 = priceNow('potion', true); HERO.trade = false; if (!(hp1 < priceNow('potion', true))) bad.push('human price');
      as('human'); if (jobPayFor(JOBS[0]) <= JOBS[0].pay) bad.push('human pay');
      // goblin slips away once
      as('human'); foe.slipUntil = 0; look(1.2, false); const humanSpotted = __game.notices(foe);
      as('goblin'); foe.slipUntil = 0; look(1.2, false); const slip1 = __game.notices(foe), slip2 = __game.notices(foe);
      if (!(humanSpotted && !slip1 && !slip2 && H.sneak)) bad.push('goblin slip ' + humanSpotted + slip1 + slip2);
      foe.slipUntil = 0; foe.aware = false; H.sneak = false;
      // dragonborn: fire hurts half, other blows in full
      as('dragonborn'); H.hp = 20; hurt(H, 6, null, 'fire'); hurt(H, 5, null); if (H.hp !== 12) bad.push('dragonborn fire ' + H.hp); H.hp = H.max;
      as('symbiont'); H.hp = 1; livingMend(); if (H.hp < 5 || SP.mend) bad.push('symbiont mend'); H.hp = H.max;
      as('goliath'); giantMight(); if (!CB.might) bad.push('goliath might'); CB.might = false;
      for (const f of [dragonBreath, tideWave, echoScream]) if (typeof f !== 'function') bad.push('strike missing');
      if (as('halfling').bag !== 2) bad.push('halfling bag');
      __game.setTime(.5); H.sneak = false; as('human');
      return bad;
    });
    assert.deepEqual(peoples, []);

    step('items and standing: rarity, the chapel heart, reputation and the three-power limit');
    const legend = await p.evaluate(() => {
      const bad = [], R = (id) => rarityOf(id);
      if (R('sword') !== 'common' || R('sword_long') !== 'uncommon' || R('dagger_fang') !== 'rare' || R('sword_rune') !== 'legendary' || R('heart') !== 'unique') bad.push('rarity');
      if (!(priceNow('dagger_fang', true) > priceNow('dagger', true) * 2)) bad.push('rare price');
      if (buysIt(SHOPS['Кузнец Горан'], 'heart')) bad.push('unique for sale');
      for (const id of ['dagger_fang', 'shield_watch', 'mace_saint', 'sword_rune', 'heart']) if (!ruleOf(id)) bad.push('no rule ' + id);
      const r0 = {...REP}, a0 = {fate: ART.fate, powers: ART.powers.slice()};
      REP.village = 0; if (repName('village') !== 'чужак' || repPriceK() !== 1) bad.push('start standing');
      REP.village = -3; if (repName('village') !== 'враг' || !(repPriceK() > 1)) bad.push('enemy prices');
      REP.village = 9; if (repName('village') !== 'герой' || !(repPriceK() < 1)) bad.push('hero prices');
      REP.village = 0; ART.fate = null; ART.powers = []; artifactPick('left'); if (repName('village') !== 'знакомый') bad.push('left ' + REP.village);
      REP.village = 0; ART.fate = null; artifactPick('absorbed'); if (!ART.powers.includes('flamestep') || uniqueCount() !== 1) bad.push('absorb');
      ART.powers = ['a', 'b', 'c']; ART.fate = null; artifactChoice(); const labels = [...document.querySelectorAll('.talk button')].map((b) => b.textContent);
      if (labels.includes('Поглотить') || labels.includes('Забрать себе') || !labels.includes('Разбить')) bad.push('limit ' + labels);
      Object.assign(REP, r0); ART.fate = a0.fate; ART.powers = a0.powers; document.querySelector('.talk').hidden = true;
      return bad;
    });
    assert.deepEqual(legend, []);

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
      return {bought, ready: JOB.sweep.state === 0 && JOB.sweep.day === dayN, paid: gold - g1 === jobPayFor(j)};
    });
    assert.deepEqual(eco, {bought: true, ready: true, paid: true});
    await p.close();

    // ---------- layout: nothing overlaps, icons sit in the centre of their buttons ----------
    for (const [w, h] of [[667, 375], [844, 390], [1280, 720]]) {
      step('layout ' + w + 'x' + h + ': no overlaps, centred icons');
      p = await open(w, h);
      const lay = await p.evaluate(([fn, hud]) => {
        const check = eval(fn), res = {menu: check(['.mm-logo', '.mmb', '.mm-ver', '.mm-copy', '.mm-exit'])};
        document.getElementById('mainmenu').hidden = true; document.body.classList.remove('inmenu');
        __game.talk(__game.actors.find((a) => a.npc === 'Рыбак Олав')); res.talk = check(hud);
        document.querySelector('#talk .choices button:last-child').click();
        openEditor(); res.editor = check(['.hc-stagebtns', '.hc-icon', '#hcNameDie', '#edName', '.hc-tabs', '.hc-foot', '#edGo', '#edBack', '#hcRandom', '.hc-racecard', '.hc-race']);
        res.icons = [...document.querySelectorAll('#menuBtn,.hc-icon,.st-x')].filter((b) => b.querySelector('svg,.hc-die')).map((b) => { const r = b.getBoundingClientRect(), q = b.querySelector('svg,.hc-die').getBoundingClientRect(); return [b.id, Math.abs(q.left + q.width / 2 - r.left - r.width / 2), Math.abs(q.top + q.height / 2 - r.top - r.height / 2)]; }).filter(([, dx, dy]) => dx > 1 || dy > 1);
        return res;
      }, [overlaps.toString(), HUD]);
      assert.deepEqual(lay, {menu: [], talk: [], editor: [], icons: []}, w + 'x' + h);
      await p.close();
    }

    // ---------- a new game: editor, then the whole tutorial ----------
    step('tutorial: first six steps, stones from anywhere count');
    p = await open();
    await p.click('#mNew');
    await p.waitForSelector('#edGo');
    step('editor: a new class changes clothes, never skin, hair or face');
    assert.deepEqual(await p.evaluate(async () => { const t0 = ED.tab, c0 = ED.cls; ED.tab = 'class'; openEditor(true); ED.ap.skin = '#3a2a1a'; ED.ap.hair = '#e0e0e0'; const before = [ED.ap.skin, ED.ap.hair, ED.ap.hairStyle, ED.ap.eyes];
      document.querySelector('.hc-class:not(.on)').click(); await new Promise((r) => setTimeout(r, 200)); const after = [ED.ap.skin, ED.ap.hair, ED.ap.hairStyle, ED.ap.eyes];
      [...document.querySelectorAll('.hc-class')].find((b, i) => CLASS_ORDER[i] === c0).click(); await new Promise((r) => setTimeout(r, 200)); ED.tab = t0; openEditor(true);
      return JSON.stringify(before) === JSON.stringify(after) && ED.cls === c0; }), true);
    step('editor: empty hands until a starting kit is chosen, and no setting out without one');
    assert.deepEqual(await p.evaluate(() => { const r = pv.m.userData.rig; return [ED.kit, !!(r.foreL.userData.item || r.foreR.userData.item || r.foreL.userData.two || r.foreR.userData.two)]; }), [null, false]);
    await p.click('#edGo');
    assert.equal(await p.evaluate(() => !document.getElementById('editor').hidden && ED.tab === 'class'), true);
    await p.locator('.hc-kits button').first().click();
    assert.equal(await p.evaluate(() => { const r = pv.m.userData.rig; return ED.kit === 0 && !!(r.foreL.userData.item || r.foreR.userData.item || r.foreL.userData.two || r.foreR.userData.two); }), true);
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
    step('big island: chunks load near the hero and unload behind, the road leads from the pier to the capital');
    const stream = await p.evaluate(async () => {
      const bad = [], frames = (n) => new Promise((r) => { const f = () => (--n > 0 ? requestAnimationFrame(f) : r()); requestAnimationFrame(f); });
      const cap = GEN.places.find((q) => q.type === 'capital'), g = __game, home = [g.H0.x, g.H0.z];
      if (!path(Z.dock[0] + 3, Z.dock[1], cap.x, cap.z + 3, H0, true, 200000) && !path(Z.dock[0] + 3, Z.dock[1], cap.x + 3, cap.z, H0, true, 200000)) bad.push('no way to the capital');
      const near = () => [...CHUNKS.values()].filter((c) => c.on).every((c) => Math.hypot(c.cx - focus.x, c.cz - focus.z) <= UNLOAD_R);
      const go = async (x, z) => { g.H0.x = x; g.H0.z = z; g.H0.px = x + .5; g.H0.pz = z + .5; focus.set(x + .5, 0, z + .5); await frames(90); };
      await go(cap.x, cap.z + 3);
      const under = pickable.some((m) => m.userData.cells && m.userData.cells.some(([x, z]) => Math.abs(x - cap.x) < 2 && Math.abs(z - cap.z - 3) < 2));
      if (!under) bad.push('no ground under the hero in the capital');
      if (!near()) bad.push('far chunks stay loaded');
      if (loadedChunks() > 40) bad.push('too many chunks: ' + loadedChunks());
      if (CHUNKS.size < 100) bad.push('world not split into chunks: ' + CHUNKS.size);
      await go(home[0], home[1]);
      if (!near()) bad.push('capital chunks stay after leaving');
      // animals walk on four legs in diagonal pairs; every settlement has its people; beasts live in their lairs
      const wolf = enemies.find((e) => e.model === 'wolf'), r = wolf.o.userData.rig;
      if (!r.quad) bad.push('wolf has no four-legged skeleton'); else { quadPose(r, 1, 1, 0, 0); if (!(r.FL.rotation.x === r.BR.rotation.x && r.FL.rotation.x === -r.FR.rotation.x && r.FL.rotation.x !== 0)) bad.push('wolf legs not in diagonal pairs'); }
      for (const m of ['boar', 'bear']) if (!enemies.some((e) => e.model === m && e.o.userData.rig.quad)) bad.push('no ' + m);
      for (const q of GEN.places.filter((q) => !q.stamp && ['capital', 'village', 'works'].includes(q.type))) if (!TOWN.some((t) => t.place === q)) bad.push('nobody lives in ' + q.n);
      // townsfolk talk through their own card (who they are, news, rumours, work); their news never repeats a line
      const t = TOWN.find((x) => !x.qk), P = PEOPLE[t.npc], L = townLines(t);
      if (!P || !P.who.length || !P.rumor.length || !P.work().length) bad.push('townsman has no talk card'); if (new Set(L).size !== L.length) bad.push('town line repeats');
      document.querySelector('.talk').hidden = true;
      if (!FACTIONS.kingdom) bad.push('no kingdom standing');
      // trade, work and quests of the big island
      const shops = Object.entries(SHOPS).filter(([, S]) => S.fac);
      if (shops.length < 5) bad.push('few shops: ' + shops.length);
      const capS = shops.find(([, S]) => S.title.includes('столичного'))[1], poorS = shops.find(([, S]) => S.title.includes('Чем богаты'))[1];
      if (!(priceNow('bread', true, poorS) >= priceNow('bread', true) && priceNow('fish', false, poorS) <= priceNow('fish', false))) bad.push('poor prices');
      if (!(priceNow('sword_long', false, capS) >= priceNow('sword_long', false))) bad.push('capital buys weapons dear');
      if (JOBS.filter((j) => j.id.startsWith('gen')).length < 4) bad.push('few jobs');
      for (const k of ['road', 'boars', 'bear']) if (!Q[k] || !Q[k].giverA || !Q[k].at) bad.push('no quest ' + k);
      const q = Q.road, st = q.state, left = q.left; q.state = 1;
      const far = enemies.find((e) => e.name === 'Разбойник' && Math.hypot(e.home[0] - q.at.x, e.home[1] - q.at.z) > 20);
      if (far) { questKill(far); if (q.left !== left) bad.push('a far bandit counted'); }
      q.state = st; q.left = left;
      return bad;
    });
    assert.deepEqual(stream, []);
    step('rooms: every building has a room as big as itself, and nothing stands between the hero and its door');
    const doorways = await p.evaluate(() => {
      const bad = [];
      for (const R of ROOMS) {
        if (!R.group) buildRoom(R);
        const [ex, ez] = R.exit;
        // the door may be on any side but north, and a guarded room is shut on purpose: two free steps inward from the threshold
        if (typeof crownLocked === 'function' && crownLocked(R)) continue;
        const inR = (x, z) => x > R.ox && x < R.ox + R.iw - 1 && z > R.oz && z < R.oz + R.id - 1, N = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const one = N.map(([dx, dz]) => [ex + dx, ez + dz]).filter(([x, z]) => inR(x, z) && free(x, z));
        if (!one.some(([x, z]) => N.some(([dx, dz]) => inR(x + dx, z + dz) && free(x + dx, z + dz) && !(x + dx === ex && z + dz === ez)))) bad.push(R.name + ' blocked at ' + ex + ',' + ez);
        R.group.traverse((o) => { if (!o.isMesh || o.userData.floor) return; const pp = new THREE.Vector3(); o.getWorldPosition(pp);
          if (Math.floor(pp.x) === ex && (Math.floor(pp.z) === ez - 1 || Math.floor(pp.z) === ez - 2) && pp.y < 1.2 && o.scale.y < 1.5) bad.push(R.name + ': something in the doorway at ' + pp.x.toFixed(1) + ',' + pp.z.toFixed(1)); });
      }
      for (const h of [...GEN_HOUSES, ...PALACE]) { const R = h.room; if (!R || R.iw !== h[2] || R.id !== h[3]) bad.push('room size differs from house at ' + h[0] + ',' + h[1]); }
      if (ROOMS.filter((R) => R.gen).length < 20) bad.push('few rooms on the big island');
      return [...new Set(bad)];
    });
    assert.deepEqual(doorways, []);
    step('court and shops: the king and his guards in the throne hall, keepers behind their counters, townsfolk asleep at home at night');
    const court = await p.evaluate(() => {
      const bad = [], g = __game, A = actors;
      const reach = (a, R) => { const c = [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dz]) => [a.x + dx, a.z + dz]).filter(([x, z]) => free(x, z));
        return c.some(([x, z]) => { const q = path(R.exit[0], R.exit[1] - 1, x, z, H0, false, 3000); return q && q.length || (x === R.exit[0] && z === R.exit[1] - 1); }); };
      const C = ROOMS.find((R) => R.type === 'castle'), king = A.find((a) => a.talkId === 'king');
      if (!king) bad.push('no king'); else { if (king.x < C.ox || king.x >= C.ox + C.iw || king.z < C.oz || king.z >= C.oz + C.id) bad.push('king outside the hall'); if (!reach(king, C)) bad.push('king out of reach'); }
      if (!Q.crown) bad.push('no royal errand');
      for (const R of ROOMS.filter((R) => R.shop)) { const k = A.find((a) => a.houseRoom === R && a.shopKind);
        if (!k) { bad.push('no keeper in ' + R.name); continue; } if (!SHOPS[k.npc]) bad.push('keeper does not trade: ' + k.npc); if (!R.group) buildRoom(R); if (!reach(k, R)) bad.push('keeper out of reach in ' + R.name + ' ' + R.i); }
      if (ROOMS.filter((R) => R.shop).length < 3) bad.push('few shops');
      const owners = A.filter((a) => a.talkId === 'town' && a.houseRoom && !a.shopKind);
      if (owners.length < 10) bad.push('few owners ' + owners.length);
      g.setTime(.95); for (const a of owners) a.far = true; for (let i = 0; i < owners.length * 2; i++) townTick();
      for (const a of owners) { const R = a.houseRoom; if (a.where !== 'home' || a.x < R.ox || a.x >= R.ox + R.iw || a.z < R.oz || a.z >= R.oz + R.id) bad.push('not home at night: ' + a.npc); }
      g.setTime(.4); for (let i = 0; i < owners.length * 2; i++) townTick();
      for (const a of owners) if (a.where !== 'out') bad.push('still home by day: ' + a.npc);
      return bad;
    });
    assert.deepEqual(court, []);
    step('fights: a hired companion is on the hero side, a fight starts with at most two foes, hurt foes may run, experience levels the hero');
    const fights = await p.evaluate(() => {
      const bad = [], m = actors.find((a) => a.npc === 'Наёмник Сигвальд'), close = () => { document.querySelector('.talk').hidden = true; };
      if (!m) return ['no sellsword in the tavern'];
      const g0 = gold; addGold(20); hireAlly(m, 15); close(); if (!m.ally || !ALLIES.includes(m) || gold !== g0 + 5) bad.push('hiring failed');
      const camp = enemies.filter((e) => e.model === 'bandit' && !e.dead && !e.dormant);
      const trio = enemies.find((e) => !e.dead && !e.dormant && !e.calm && enemies.filter((o) => o !== e && !o.dead && !o.dormant && !o.calm && Math.hypot(o.x - e.x, o.z - e.z) <= 4).length >= 2);
      if (trio) { const sv = [H0.x, H0.z, H0.px, H0.pz]; H0.x = trio.x; H0.z = trio.z + 3; m.x = H0.x + 1; m.z = H0.z; startCombat(trio, false, true);
        if (liveFoes().length > 2) bad.push('fight began with ' + liveFoes().length + ' foes'); if (!CB.order.includes(m)) bad.push('companion not in the fight');
        if (liveFoes().includes(m)) bad.push('companion counted as a foe'); endCombat(''); [H0.x, H0.z, H0.px, H0.pz] = sv; }
      const lv0 = LV.lv, max0 = H0.max; gainXP(300); if (LV.lv !== lv0 + 1 || H0.max <= max0 || H0.hp !== H0.max) bad.push('no level up');
      const wolf = enemies.find((e) => e.model === 'wolf' && !e.dead && !e.dormant); if (wolf) { flee(wolf); if (!wolf.dead || !wolf.fled) bad.push('flee failed'); }
      return bad;
    });
    assert.deepEqual(fights, []);
    step('talk your way: Седой can be won over with words or a gift, a failed threat turns the pack, Клык joins');
    const deals = await p.evaluate(async () => {
      const bad = [], close = () => { document.querySelector('.talk').hidden = true; };
      if (!SEDOY || !PACK.length) return ['no pack leader'];
      if (PACK.some((w) => !w.calm)) bad.push('pack not calm while he talks');
      const D = SEDOY.deal; packTalk(SEDOY, SEDOY.npc); const btns = [...document.querySelectorAll('.talk .choices button')].map((b) => b.textContent); close();
      if (btns.length !== 5 || !/%/.test(btns[0])) bad.push('approaches missing: ' + btns.join('|'));
      const keep = JSON.stringify(TALK_MOD[HERO.cls]); TALK_MOD[HERO.cls] = [-30, -30, -30];
      await dealRoll(SEDOY, 2, talkMod(2), D.dc[2]); close(); if (!PACK_ANGRY || PACK.some((w) => w.calm)) bad.push('failed threat did not turn the pack');
      PACK_ANGRY = false; packFriend(true); D.done = false; D.tried = {}; TALK_MOD[HERO.cls] = [30, 30, 30];
      for (let t = 0; t < 4 && !D.done; t++) { D.tried = {}; await dealRoll(SEDOY, 0, talkMod(0), D.dc[0]); close(); } TALK_MOD[HERO.cls] = JSON.parse(keep); // a natural 1 fails any roll
      if (!D.done || PACK.some((w) => !w.calm) || !DEALS.sedoy || !DEALS.sedoy.done) bad.push('persuasion did not win the pack');
      takeKlyk(); if (!KLYK.ally || !ALLIES.includes(KLYK) || KLYK.hidden) bad.push('Клык did not join');
      return bad;
    });
    assert.deepEqual(deals, []);
    step('things have properties: an oil barrel blows up the robbers by it, a locked chest opens by skill or force');
    const things = await p.evaluate(async () => {
      const bad = [], close = () => { document.querySelector('.talk').hidden = true; };
      const barrels = interact.filter((i) => i.key && i.key.startsWith('barrel')), chests = interact.filter((i) => i.key && i.key.startsWith('chest'));
      if (!barrels.length || barrels.length !== chests.length) return ['camps lack barrels or chests ' + barrels.length + '/' + chests.length];
      const b = barrels[0], near = enemies.filter((e) => !e.dead && !e.dormant && Math.hypot(e.x - b.x, e.z - b.z) <= 1.6);
      for (const e of near) e.hp = 1;
      const sv = [H0.x, H0.z]; H0.x = b.x; H0.z = b.z + 4; barrelBlast(b); [H0.x, H0.z] = sv;
      if (interact.includes(b) || !OBJS[b.key]) bad.push('barrel did not burst'); if (near.some((e) => !e.dead)) bad.push('robbers by the barrel unhurt');
      const c = chests[0], keep = HERO.stealth; HERO.stealth = 40; const g0 = gold; for (let t = 0; t < 4 && !c.open; t++) { c.tries = 0; chestUse(c); document.querySelector('.talk .choices button').click(); for (let w = 0; w < 40 && !c.open && document.querySelector('.talk').hidden; w++) await new Promise((r) => setTimeout(r, 300)); close(); } HERO.stealth = keep;
      if (!c.open || gold <= g0) bad.push('chest did not open by lockpicking');
      return bad;
    });
    assert.deepEqual(things, []);
    step('the island trouble, told slowly: king, bread for the old woman, the feather, the stone at night, the Raven');
    const raven = await p.evaluate(() => {
      const bad = [], q = Q.raven, king = actors.find((a) => a.talkId === 'king'), close = () => { document.querySelector('.talk').hidden = true; };
      if (!q) return ['no raven quest'];
      const boss = enemies.find((e) => e.name === 'Атаман Ворон'); if (!boss || !boss.bar || !boss.dead) bad.push('Raven should sleep out of sight until the stone opens');
      kingTalk(king, king.npc); close(); if (q.state !== 0) bad.push('king told of the Raven before the errands');
      ravenStone(); close(); if (boss.dormant !== true) bad.push('stone opened with no quest');
      Q.road.state = 3; Q.crown.state = 3; kingTalk(king, king.npc); close();
      if (q.state !== 1 || q.step !== 'ask') bad.push('king did not send for the Raven ' + q.state + q.step);
      const ts = TUT.step; TUT.step = -1; const t = questTarget(); TUT.step = ts; if (!t || t.label !== q.oldA.npc) bad.push('pointer does not lead to the old woman ' + JSON.stringify(t));
      while (handsCount('bread')) handsConsume('bread');
      townTalk(q.oldA, q.oldA.npc); close(); if (q.step !== 'ask') bad.push('old woman talked without bread');
      handsGive([['bread', 2]]); townTalk(q.oldA, q.oldA.npc); close(); if (q.step !== 'feather') bad.push('old woman took the bread but told nothing');
      q.featherIt.use(); close(); if (q.step !== 'stone' || !handsCount('feather')) bad.push('feather not taken');
      __game.setTime(.45); ravenStone(); close(); if (q.step !== 'stone' || boss.dormant !== true) bad.push('stone opened by day');
      __game.setTime(.0); ravenStone(); close(); if (q.step !== 'lair' || boss.dead) bad.push('stone did not open at night');
      if (CB.on) endCombat(''); __game.setTime(.4);
      boss.dead = true; questKill(boss); if (q.state !== 2) bad.push('Raven killed but errand not done');
      kingTalk(king, king.npc); close(); if (q.state !== 3) bad.push('king gave no reward');
      for (const k of ['king', 'old', 'feather', 'riddle', 'ragnar']) if (!KNOWN.has(k)) bad.push('chronicle lacks ' + k);
      if (actNow() !== 3) bad.push('act not final'); journal(); const pages = []; for (let i = 0; i < 9 && !document.querySelector('.talk').hidden; i++) { pages.push(document.querySelector('.talk p').textContent); const nb = [...document.querySelectorAll('.talk .choices button')].find((b) => b.textContent === 'Дальше'); if (!nb) break; nb.click(); } close();
      if (pages.length < 3 || !/Рагнар/.test(pages.join(' '))) bad.push('chronicle pages missing');
      if (enemies.some((e) => !e.dead && e.model === 'bandit')) bad.push('bands did not scatter');
      return bad;
    });
    assert.deepEqual(raven, []);
    step('layout in play: the HUD with the goal card and the hands');
    assert.deepEqual(await p.evaluate(([fn, hud]) => eval(fn)(hud), [overlaps.toString(), HUD]), []);
    for (const side of ['R', 'L']) {
      await p.click('#palm' + side, {force: true}); await p.waitForTimeout(700);
      assert.deepEqual(await p.evaluate(([fn, hud]) => eval(fn)(hud.concat(['.inv.open'])), [overlaps.toString(), HUD]), [], 'open bag ' + side);
      await p.click('#palm' + side, {force: true}); await p.waitForTimeout(400);
    }
    console.log('  reached: ' + await tut());
    assert.deepEqual(errors, []);
    console.log('island beta browser checks ok');
  } finally {
    await browser.close();
    server.close();
  }
})().catch((e) => { console.error(e); process.exitCode = 1; server.close(); });
