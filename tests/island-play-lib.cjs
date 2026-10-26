// Shared by the island playthrough and the completionist bots: a static server for site/island, page helpers
// (walk, talk, choose, fight) and the main story as steps.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');

const root = process.env.ISLAND_SITE ? path.resolve(process.env.ISLAND_SITE) : path.resolve(__dirname, '..', 'site', 'island');
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'content-type': file.endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8'});
  fs.createReadStream(file).pipe(res);
});

// helpers that live in the page: walking, talking, choosing, fighting
const HELPERS = () => {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const PT = window.PT = {log: [], notes: []};
  PT.note = (t) => { PT.notes.push(t); };
  PT.closeTalk = () => { const t = document.getElementById('talk'); if (!t.hidden) t.hidden = true; };
  // the text of the open dialog, and a click on the button whose label starts with the given words
  PT.text = () => { const t = document.getElementById('talk'); return t.hidden ? '' : t.querySelector('p').textContent; };
  PT.choose = async (label) => { for (let i = 0; i < 20; i++) { const t = document.getElementById('talk'); if (!t.hidden) { t.click(); const b = [...t.querySelectorAll('.choices button')].find((x) => x.textContent.startsWith(label)); if (b) { b.click(); await sleep(400); return true; } } await sleep(150); } return false; };
  PT.heal = () => { if (H0.hp < H0.max * .45) { if (window.handsCount('potion') > 0 && !CB.on) { window.handsToHand('potion'); heal('potion'); PT.note('drank a potion'); } else if (H0.hp < H0.max * .3) { H0.hp = H0.max; setHP(); PT.note('healed by the test (no potion)'); } } };
  // a fight to the end through the combat wheel
  PT.fight = async (limit = 240) => {
    for (let i = 0; i < limit && CB.on; i++) {
      PT.heal();
      if (H0.dead) { await sleep(3500); return 'knocked out'; }
      if (heroTurn() && !busy) {
        const f = liveFoes().sort((a, b) => man(a, H0) - man(b, H0))[0];
        if (!f) { await sleep(300); continue; }
        attackWheel(f); await sleep(250);
        const btn = [...document.querySelectorAll('.wheel:not([hidden]) button:not([disabled])')].find((b) => !/Назад/.test(b.textContent));
        if (btn) { btn.click(); await sleep(1200); }
        if (heroTurn() && !busy && (CB.acted || !btn)) { closeWheel(); if (!CB.acted && man(f, H0) > 1) { const p = path(H0.x, H0.z, f.x, f.z, H0, true, 2000); if (p && p.length) { const st = p.slice(0, CB.move); if (st.length) { await heroMove(...st[st.length - 1]); await sleep(600); } } } endHeroTurn(); }
      }
      await sleep(400);
    }
    return CB.on ? 'fight did not end' : 'won';
  };
  // walk to a cell (or next to it): a long road is skipped by a jump to a reachable cell near the goal
  PT.walk = async (x, z, near = true) => {
    for (let attempt = 0; attempt < 4; attempt++) {
      if (CB.on) await PT.fight();
      PT.closeTalk(); closeWheel();
      if (Math.hypot(x - H0.x, z - H0.z) > 18 && !(room && !room.inPlace)) {
        // find a free cell 6..12 steps from the goal from which the goal can be reached
        let best = null;
        for (let r = 6; r <= 14 && !best; r += 2) for (let k = 0; k < 16 && !best; k++) { const a = k / 16 * Math.PI * 2, cx = Math.round(x + Math.cos(a) * r), cz = Math.round(z + Math.sin(a) * r);
          if (!free(cx, cz) || occupied(cx, cz)) continue; const p = path(cx, cz, x, z, H0, near, 4000); if (p && (p.length || near)) best = [cx, cz]; }
        if (!best) return 'no way to ' + x + ',' + z;
        H0.route = null; H0.x = best[0]; H0.z = best[1]; H0.px = H0.x + .5; H0.pz = H0.z + .5; focus.set(H0.px, 0, H0.pz); await sleep(900);
      }
      const done = await new Promise((res) => { let ok = false; goDo(x, z, !near, () => { ok = true; res(true); }); setTimeout(() => res(ok), 45000); });
      for (let i = 0; i < 80 && H0.route && H0.route.length && !CB.on; i++) await sleep(250);
      if (CB.on) { const r = await PT.fight(); PT.note('fight on the way: ' + r); continue; }
      const d = Math.abs(H0.x - x) + Math.abs(H0.z - z);
      if (done || d <= 1) return 'ok';
    }
    return 'could not reach ' + x + ',' + z + ' (hero at ' + H0.x + ',' + H0.z + ')';
  };
  PT.talkTo = async (a) => { const r = await PT.walk(a.x, a.z, true); if (r !== 'ok') return r; talk(a); await sleep(500); return PT.text() ? 'ok' : 'nothing said'; };
  PT.enter = async (R) => { if (R.inPlace) return PT.walk(R.exit[0], R.exit[1] - 1, false); const r = await PT.walk(R.door[0], R.door[1], true); if (r !== 'ok') return r; await enterRoom(R); await sleep(600); return room === R ? 'ok' : 'did not enter ' + R.name; };
  PT.leave = async () => { if (room && !room.inPlace) { await leaveRoom(); await sleep(600); } return 'ok'; };
  PT.killAll = async (pred, what) => { let n = 0;
    for (let i = 0; i < 12; i++) { const e = enemies.filter((e) => !e.dead && !e.dormant && pred(e)).sort((a, b) => man(a, H0) - man(b, H0))[0]; if (!e) return n ? 'ok' : 'no ' + what + ' found';
      const r = await PT.walk(e.x, e.z, true); if (!CB.on && !e.dead) startCombat(e, false, true); const f = await PT.fight(); if (f !== 'won') return what + ': ' + f + (r !== 'ok' ? ' / ' + r : ''); n++; }
    return 'ok'; };
  PT.who = (id) => actors.find((a) => a.talkId === id || a.npc === id);
  PT.give = (id, n) => { window.handsGive([[id, n]], 'Тест'); };
  PT.hold = (id) => { if (!window.handsCount(id)) PT.give(id, 1); window.handsToHand(id, 'R'); };
};

const STEPS = [
  ['start: the hero stands on the pier', async () => (H0.x <= 8 ? 'ok' : 'hero at ' + H0.x)],
  ['tutorial: step off the pier', async () => { const r = await PT.walk(10, 31, false); return r; }],
  ['tutorial: talk to Olav', async () => { const r = await PT.talkTo(PT.who('fisher')); PT.closeTalk(); return TUT.flags.olav ? 'ok' : r; }],
  ['tutorial: open the hands', async () => { document.getElementById('palmR').click(); await new Promise((r) => setTimeout(r, 900)); const ok = window.handsIsOpen(); document.getElementById('palmR').click(); return ok ? 'ok' : 'bag did not open'; }],
  ['tutorial: pick up stones', async () => { const L = looks.filter((l) => l.loot && l.loot[0][0] === 'stone' && !l.taken).sort((a, b) => Math.hypot(a.meshes[0].position.x - H0.px, a.meshes[0].position.z - H0.pz) - Math.hypot(b.meshes[0].position.x - H0.px, b.meshes[0].position.z - H0.pz))[0];
    if (!L) return 'no stones'; const p = new THREE.Vector3(); L.meshes[0].getWorldPosition(p); inspect(L, Math.floor(p.x), Math.floor(p.z), true); for (let i = 0; i < 60 && !L.taken; i++) await new Promise((r) => setTimeout(r, 300)); PT.closeTalk(); return L.taken ? 'ok' : 'stones not taken'; }],
  ['tutorial: walk to Заводь', async () => PT.walk(Z.village[0], Z.village[1] + 3, false)],
  ['tutorial: fish to Bram in the tavern', async () => { const R = ROOMS.find((r) => r.type === 'tavern'); let r = await PT.enter(R); if (r !== 'ok') return r; r = await PT.talkTo(PT.who('bram')); PT.closeTalk(); await PT.leave(); return TUT.flags.bram ? 'ok' : r; }],
  ['tutorial: the rat in the barn', async () => { await new Promise((r) => setTimeout(r, 1500)); const R = ROOMS[4]; let r = await PT.enter(R); if (r !== 'ok') return r; r = await PT.killAll((e) => e.name === 'Крыса', 'rat'); await PT.leave(); return r; }],
  ['tutorial: back to Bram', async () => { const R = ROOMS.find((r) => r.type === 'tavern'); await PT.enter(R); const r = await PT.talkTo(PT.who('bram')); PT.closeTalk(); await PT.leave(); await new Promise((x) => setTimeout(x, 1500)); return !tutOn() ? 'ok' : 'tutorial still on at step ' + TUT.step + ' / ' + r; }],
  ['Заводь: Bram asks to lay the dead', async () => { const R = ROOMS.find((r) => r.type === 'tavern'); await PT.enter(R); await PT.talkTo(PT.who('bram')); await PT.choose('Берусь'); PT.closeTalk(); await PT.leave(); return Q.dead.state === 1 ? 'ok' : 'dead quest state ' + Q.dead.state; }],
  ['Заводь: three skeletons', async () => PT.killAll((e) => e.name === 'Скелет', 'skeletons')],
  ['Заводь: Bram rewards, asks for the fire', async () => { const R = ROOMS.find((r) => r.type === 'tavern'); await PT.enter(R); await PT.talkTo(PT.who('bram')); PT.closeTalk(); await new Promise((x) => setTimeout(x, 400)); talk(PT.who('bram')); await PT.choose('Разожгу'); PT.closeTalk(); await PT.leave(); return Q.dead.state === 3 && Q.fire.state === 1 ? 'ok' : 'dead ' + Q.dead.state + ' fire ' + Q.fire.state; }],
  ['Заводь: a torch from Bram\'s supplies, the chapel lit', async () => { const R = ROOMS.find((r) => r.type === 'tavern'); await PT.enter(R); const ch = interact.find((i) => i.chest && i.name === 'Ящик с припасами');
    if (ch) { await PT.walk(ch.x, ch.z, true); const t = ch.items.findIndex((x) => x && x.id === 'torch'); if (t >= 0) { ch.items.splice(t, 1); PT.give('torch', 1); } }
    await PT.leave(); if (!window.handsCount('torch')) return 'no torch in the supplies'; PT.hold('torch');
    const r = await PT.walk(Z.ruins[0], Z.ruins[1], true); if (r !== 'ok') return r; if (!hasTorch()) return 'torch not in hand';
    await lightChapel(); await new Promise((x) => setTimeout(x, 1500)); await PT.choose('Оставить в жаровне'); PT.closeTalk(); return chapel.lit && Q.fire.state === 2 ? 'ok' : 'lit ' + chapel.lit + ' fire ' + Q.fire.state; }],
  ['Заводь: the prologue reward', async () => { const R = ROOMS.find((r) => r.type === 'tavern'); await PT.enter(R); await PT.talkTo(PT.who('bram')); PT.closeTalk(); await PT.leave(); return Q.fire.state === 3 ? 'ok' : 'fire ' + Q.fire.state; }],
  ['Заводь: the miller\'s robbers', async () => { await PT.talkTo(PT.who('miller')); await PT.choose('Берусь'); PT.closeTalk(); let r = await PT.killAll((e) => e.name === 'Разбойник' && Math.hypot(e.home[0] - Z.camp[0], e.home[1] - Z.camp[1]) < 14, 'camp robbers'); if (r !== 'ok') return r;
    await PT.talkTo(PT.who('miller')); PT.closeTalk(); return Q.band.state === 3 ? 'ok' : 'band ' + Q.band.state; }],
  ['Заводь: Olav\'s wolves', async () => { await PT.talkTo(PT.who('fisher')); await PT.choose('Берусь'); PT.closeTalk(); let r = await PT.killAll((e) => e.name === 'Волк' && Math.hypot(e.home[0] - Z.forest[0], e.home[1] - Z.forest[1]) < 14, 'forest wolves'); if (r !== 'ok') return r;
    await PT.talkTo(PT.who('fisher')); PT.closeTalk(); return Q.wolf.state === 3 ? 'ok' : 'wolf ' + Q.wolf.state; }],
  ['big island: the road to the capital', async () => { const g = Q.road.giverA; return PT.talkTo(g).then((r) => { PT.closeTalk(); return r; }); }],
  ['big island: the camp by the road', async () => { const g = Q.road.giverA; talk(g); await PT.choose('Берусь'); PT.closeTalk(); const c = Q.road.at; const r = await PT.killAll((e) => e.name === 'Разбойник' && Math.hypot(e.home[0] - c.x, e.home[1] - c.z) < 14, 'road camp'); if (r !== 'ok') return r;
    await PT.talkTo(g); PT.closeTalk(); return Q.road.state === 3 ? 'ok' : 'road ' + Q.road.state; }],
  ['the king: into the castle, his errand', async () => { const R = ROOMS.find((r) => r.type === 'castle'); let r = await PT.enter(R); if (r !== 'ok') return r; const k = PT.who('king'); r = await PT.talkTo(k); await PT.choose('Берусь'); PT.closeTalk(); return Q.crown.state === 1 ? 'ok' : 'crown ' + Q.crown.state + ' / ' + r; }],
  ['the king\'s errand: the far camp', async () => { await PT.leave(); const c = Q.crown.at; return PT.killAll((e) => e.name === 'Разбойник' && Math.hypot(e.home[0] - c.x, e.home[1] - c.z) < 14, 'far camp'); }],
  ['the king rewards, sends for the Raven', async () => { const R = ROOMS.find((r) => r.type === 'castle'); await PT.enter(R); await PT.talkTo(PT.who('king')); PT.closeTalk(); await new Promise((x) => setTimeout(x, 2500)); PT.closeTalk(); return Q.raven.state === 1 && Q.raven.step === 'ask' ? 'ok' : 'raven ' + Q.raven.state + ' ' + Q.raven.step; }],
  ['the Raven: bread for the old woman', async () => { await PT.leave(); const o = Q.raven.oldA; if (window.handsCount('bread') < 2) PT.give('bread', 2 - window.handsCount('bread')); let r = await PT.talkTo(o); PT.closeTalk(); return Q.raven.step === 'feather' ? 'ok' : 'step ' + Q.raven.step + ' / ' + r; }],
  ['the Raven: the black feather', async () => { const it = Q.raven.featherIt; const r = await PT.walk(it.x, it.z, true); if (r !== 'ok') return r; it.use(); PT.closeTalk(); return Q.raven.step === 'stone' ? 'ok' : 'step ' + Q.raven.step; }],
  ['the Raven: the stone at night', async () => { const [x, z] = Q.raven.stone; const r = await PT.walk(x, z, true); if (r !== 'ok') return r; worldTime = 0.02; ravenStone(); await new Promise((x) => setTimeout(x, 600)); return Q.raven.step === 'lair' ? 'ok' : 'step ' + Q.raven.step; }],
  ['the Raven: the fight in the ruins', async () => { const won = await PT.choose('Драться'); await new Promise((x) => setTimeout(x, 1500)); const f = await PT.fight(400); if (CB.on) return 'fight: ' + f; const r = await PT.killAll((e) => GANG.includes(e), 'the gang'); return Q.raven.state === 2 ? 'ok' : 'raven ' + Q.raven.state + ' / ' + f + ' / ' + r; }],
  ['the king\'s last word', async () => { worldTime = .4; const R = ROOMS.find((r) => r.type === 'castle'); await PT.enter(R); await PT.talkTo(PT.who('king')); PT.closeTalk(); await PT.leave(); return Q.raven.state === 3 ? 'ok' : 'raven ' + Q.raven.state; }],
  ['the ship at the pier', async () => { await new Promise((x) => setTimeout(x, 2500)); if (!SHIP.on) return 'no ship'; const r = await PT.talkTo(SHIP.cap); return r; }],
  ['sail: the ending card', async () => { await PT.choose('Отплыть'); await new Promise((x) => setTimeout(x, 600)); document.querySelector('#confirm .yes').click(); await new Promise((x) => setTimeout(x, 2500)); const el = document.getElementById('ending'); return !el.hidden && /Продолжение следует/.test(el.textContent) ? 'ok' : 'no ending card'; }],
];
module.exports = {server, HELPERS, STEPS};
