// Nothing the hero needs is out of reach: from the pier, walking over free cells, every house door,
// every person, every chest, barrel, ladder and quest place can be reached; inside every room every
// person and thing can be reached from its exit. Real Chromium, the shipped page (site/island).
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-reach.cjs
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = process.env.ISLAND_SITE ? path.resolve(process.env.ISLAND_SITE) : path.resolve(__dirname, '..', 'site', 'island');
const server = http.createServer((req, res) => {
  const file = path.join(root, decodeURIComponent(req.url.split('?')[0]).replace(/\/$/, '/index.html'));
  if (!file.startsWith(root) || !fs.existsSync(file)) { res.writeHead(404); return res.end(); }
  res.writeHead(200, {'content-type': file.endsWith('.js') ? 'text/javascript' : 'text/html; charset=utf-8'});
  fs.createReadStream(file).pipe(res);
});

(async () => {
  await new Promise((r) => server.listen(0, r));
  const browser = await chromium.launch({args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader']});
  try {
    const p = await browser.newPage({viewport: {width: 844, height: 390}});
    const errors = [];
    p.on('pageerror', (e) => errors.push(e.message));
    await p.addInitScript(() => { localStorage.clear(); window.NOPV = 1; });
    await p.goto('http://127.0.0.1:' + server.address().port + '/');
    await p.waitForFunction(() => typeof ROOMS !== 'undefined' && typeof free === 'function', null, {timeout: 120000});
    const bad = await p.evaluate(() => {
      for (const R of ROOMS) if (!R.group) buildRoom(R);
      // a room behind a crown guard is shut until the hero is known well enough (or the guard is dead): its door
      // must be reachable, and inside it everything must be reachable from its threshold once it opens
      if (typeof crownTick === 'function') crownTick();
      const locked = (R) => typeof crownLocked === 'function' && crownLocked(R);
      for (const R of ROOMS) if (locked(R)) solid.delete(R.exit[0] + ',' + R.exit[1]); // every room furnished, so its furniture blocks its cells
      const reach = (sx, sz) => { const seen = new Set([sx + ',' + sz]), q = [[sx, sz]];
        while (q.length) { const [x, z] = q.pop(); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (x + dx) + ',' + (z + dz); if (seen.has(k) || !free(x + dx, z + dz)) continue; seen.add(k); q.push([x + dx, z + dz]); } }
        return seen; };
      const near = (S, x, z) => S.has(x + ',' + z) || [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dz]) => S.has((x + dx) + ',' + (z + dz)));
      const out = [], world = reach(H0.x, H0.z), inRoom = (x, z) => ROOMS.find((R) => !R.inPlace && x >= R.ox && x < R.ox + R.iw && z >= R.oz && z < R.oz + R.id);
      const roomSets = new Map();const inside = (R) => R.inside || [R.exit[0], R.exit[1] - 1];
      const setOf = (R) => roomSets.get(R) || roomSets.set(R, reach(...inside(R))).get(R);
      const check = (x, z, what) => { const R = inRoom(x, z); if (!near(R ? setOf(R) : world, x, z)) out.push(what + ' at ' + x + ',' + z + (R ? ' in ' + R.name : '')); };
      for (const R of ROOMS) { if (R.sub) continue; check(...R.door, 'door of ' + R.name); if (R.inPlace) check(...inside(R), 'inside ' + R.name); }
      for (const a of actors) if (a !== H0 && a.npc && !a.hidden && !a.dead) check(a.x, a.z, a.npc);
      for (const it of interact) check(it.x, it.z, it.name || 'thing');
      for (const q of Object.values(Q)) if (q.at && q.state < 3) check(Math.round(q.at.x), Math.round(q.at.z), 'quest place ' + q.title);
      return [...new Set(out)];
    });
    console.log(bad.length ? 'unreachable:\n  ' + bad.join('\n  ') : 'everything reachable');
    // No trap: from inside every room and every attic, cellar and upper floor the hero gets back out to the
    // pier's ground, walking and taking the ways the game offers (a door of a room of its own, a ladder back down).
    // Guarded doors stay open for a hero who is already inside, and leaving never leaves the game busy.
    const trapped = await p.evaluate(async () => {
      if (typeof crownTick === 'function') crownTick();
      const N4 = [[1, 0], [-1, 0], [0, 1], [0, -1]], out = [];
      const flood = (sx, sz) => { const seen = new Set([sx + ',' + sz]), q = [[sx, sz]];
        while (q.length) { const [x, z] = q.pop(); for (const [dx, dz] of N4) { const k = (x + dx) + ',' + (z + dz); if (seen.has(k) || !free(x + dx, z + dz)) continue; seen.add(k); q.push([x + dx, z + dz]); } }
        return seen; };
      const pier = flood(H0.x, H0.z);
      const sep = (x, z) => ROOMS.find((R) => !R.inPlace && x >= R.ox && x < R.ox + R.iw && z >= R.oz && z < R.oz + R.id);
      // where a room of its own lets the hero out: before its door, or down the ladder beside it in the house
      const outOf = (R) => R.sub ? backCell(R.parent, R.ladder) : (free(...R.door) ? R.door : nearFree(R.door[0], R.door[1] + 1, 4));
      const escapes = (start) => { const done = new Set(); let todo = [start];
        for (let hop = 0; hop < 6 && todo.length; hop++) { const next = [];
          for (const [sx, sz] of todo) { if (pier.has(sx + ',' + sz)) return true; const S = flood(sx, sz); if ([...S].some((k) => pier.has(k))) return true;
            const R = sep(sx, sz); if (!R || done.has(R)) continue; done.add(R);
            const ex = R.exit; if (S.has(ex[0] + ',' + ex[1]) || N4.some(([dx, dz]) => S.has((ex[0] + dx) + ',' + (ex[1] + dz)))) next.push(outOf(R)); }
          todo = next; }
        return false; };
      const was0 = [H0.x, H0.z];
      for (const R of ROOMS) { if (!R.group) buildRoom(R);
        // the hero is inside: a guarded door behind him (or below his ladder) knows it
        const G = R.guard ? R : R.parent && R.parent.guard ? R.parent : null;
        if (G && G.inPlace) { [H0.x, H0.z] = G.inside; } else { [H0.x, H0.z] = was0; } crownTick();
        const st = R.inPlace ? (R.inside || [R.exit[0], R.exit[1] - 1]) : roomCell(R, [R.exit[0], R.exit[1] - 1]);
        if (!escapes(st)) out.push('no way out of ' + R.name + ' (room ' + R.i + ')'); }
      [H0.x, H0.z] = was0; crownTick();
      // a guard's door does not shut on a hero who is inside
      const was = [H0.x, H0.z];
      for (const R of ROOMS.filter((r) => r.guard && r.inPlace)) { const [x, z] = R.inside; H0.x = x; H0.z = z; crownTick();
        if (solid.has(R.exit[0] + ',' + R.exit[1])) out.push('guard shuts the hero in ' + R.name); }
      H0.x = was[0]; H0.z = was[1]; crownTick();
      // a calm guard standing in a narrow lane never walls the hero in: the hero steps past him
      for (const g of (typeof CROWN_GUARDS !== 'undefined' ? CROWN_GUARDS : [])) if (g.calm && occupied(g.x, g.z, H0)) out.push('calm guard blocks the way at ' + g.x + ',' + g.z);
      // walking out through the doorway of a house in the world, and down from an attic, end with the game free
      const cast = ROOMS.find((r) => r.inPlace && r.type === 'castle') || ROOMS.find((r) => r.inPlace);
      if (cast) { const [x, z] = cast.inside; H0.x = x; H0.z = z; H0.px = x + .5; H0.pz = z + .5; houseTick(); await leaveRoom();
        if (busy) out.push('busy after leaving ' + cast.name); if (!H0.route && !(H0.x === cast.door[0] && H0.z === cast.door[1])) out.push('no walk out of ' + cast.name); H0.route = null; }
      const sub = ROOMS.find((r) => r.sub && r.parent && r.parent.inPlace && r.ladder);
      if (sub) { await subGo(sub, false, ...sub.ladder); if (room !== sub) out.push('ladder up failed'); await subGo(sub, true, ...sub.ladder);
        if (busy || room === sub) out.push('ladder down failed'); else if (!roomReach(sub.parent).has(H0.x + ',' + H0.z)) out.push('ladder down lands outside the way out at ' + H0.x + ',' + H0.z); }
      H0.x = was[0]; H0.z = was[1]; H0.px = was[0] + .5; H0.pz = was[1] + .5; houseTick();
      return out;
    });
    console.log(trapped.length ? 'trapped:\n  ' + trapped.join('\n  ') : 'every room has a way out');
    assert.deepEqual(errors, []);
    assert.deepEqual(bad, []);
    assert.deepEqual(trapped, []);
    console.log('island reach ok');
  } finally { await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
