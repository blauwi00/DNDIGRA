// Nothing the hero needs is out of reach: from the pier, walking over free cells, every house door,
// every person, every chest, barrel, ladder and quest place can be reached; inside every room every
// person and thing can be reached from its exit. Real Chromium, the shipped page (site/island).
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-reach.cjs
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = path.resolve(__dirname, '..', 'site', 'island');
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
      for (const R of ROOMS) if (!R.group) buildRoom(R); // every room furnished, so its furniture blocks its cells
      const reach = (sx, sz) => { const seen = new Set([sx + ',' + sz]), q = [[sx, sz]];
        while (q.length) { const [x, z] = q.pop(); for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (x + dx) + ',' + (z + dz); if (seen.has(k) || !free(x + dx, z + dz)) continue; seen.add(k); q.push([x + dx, z + dz]); } }
        return seen; };
      const near = (S, x, z) => S.has(x + ',' + z) || [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dz]) => S.has((x + dx) + ',' + (z + dz)));
      const out = [], world = reach(H0.x, H0.z), inRoom = (x, z) => ROOMS.find((R) => !R.inPlace && x >= R.ox && x < R.ox + R.iw && z >= R.oz && z < R.oz + R.id);
      const roomSets = new Map();const setOf = (R) => roomSets.get(R) || roomSets.set(R, reach(R.exit[0], R.exit[1] - 1)).get(R);
      const check = (x, z, what) => { const R = inRoom(x, z); if (!near(R ? setOf(R) : world, x, z)) out.push(what + ' at ' + x + ',' + z + (R ? ' in ' + R.name : '')); };
      for (const R of ROOMS) { if (R.sub) continue; check(...R.door, 'door of ' + R.name); if (R.inPlace) check(R.exit[0], R.exit[1] - 1, 'inside ' + R.name); }
      for (const a of actors) if (a !== H0 && a.npc && !a.hidden && !a.dead) check(a.x, a.z, a.npc);
      for (const it of interact) check(it.x, it.z, it.name || 'thing');
      for (const q of Object.values(Q)) if (q.at && q.state < 3) check(Math.round(q.at.x), Math.round(q.at.z), 'quest place ' + q.title);
      return [...new Set(out)];
    });
    console.log(bad.length ? 'unreachable:\n  ' + bad.join('\n  ') : 'everything reachable');
    assert.deepEqual(errors, []);
    assert.deepEqual(bad, []);
    console.log('island reach ok');
  } finally { await browser.close(); server.close(); }
})().catch((e) => { console.error(e); process.exit(1); });
