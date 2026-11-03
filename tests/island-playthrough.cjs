// A whole game, start to end, played by a script the way a player would: off the pier, the tutorial, every
// errand of Заводь, the big island's errands, the Raven's story step by step, the ship and the ending card.
// The hero walks for real (long roads are skipped by a jump close to the goal, the last stretch is walked), fights
// through the real combat wheel, talks through the real dialog buttons. Each step reports how it went; a step that
// cannot be done is a bug. Real Chromium, the shipped page (site/island).
// Run: PLAYWRIGHT_MODULE=/path/to/playwright node tests/island-playthrough.cjs [report.json]
const fs = require('node:fs');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {server, HELPERS, STEPS} = require('./island-play-lib.cjs');

(async () => {
  await new Promise((r) => server.listen(0, r));
  const browser = await chromium.launch({args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader']});
  const p = await browser.newPage({viewport: {width: 844, height: 390}, hasTouch: true});
  p.setDefaultTimeout(600000);
  const errors = [];
  p.on('pageerror', (e) => errors.push(e.message));
  await p.addInitScript(() => { localStorage.clear(); window.NOPV = 1; window.TEXT_DELAY = 0;
    localStorage.setItem('helga-hero', JSON.stringify({name: 'Проходчик', cls: 'fighter', race: 'human', kit: 0, look: {skin: 'e9bf90', hair: '493024', cloth: '284d6c', style: 'messy'}}));
    sessionStorage.setItem('helga-start', 'new'); });
  await p.goto('http://127.0.0.1:' + server.address().port + '/');
  await p.waitForFunction(() => typeof H0 !== 'undefined' && typeof ROOMS !== 'undefined' && typeof TUT !== 'undefined', null, {timeout: 180000});
  await p.waitForTimeout(5000);
  await p.evaluate(() => { try { screen(null); } catch (e) {} });
  await p.evaluate(HELPERS);
  const report = [], t0 = Date.now();
  for (const [name, fn] of STEPS) {
    const t = Date.now();
    let r;
    try { r = await p.evaluate(`(${fn.toString()})()`); } catch (e) { r = 'crash: ' + e.message.split('\n')[0]; }
    const notes = await p.evaluate(() => { const n = PT.notes; PT.notes = []; return n; }).catch(() => []);
    const line = {step: name, result: r, secs: Math.round((Date.now() - t) / 1000), notes, errors: errors.splice(0)};
    report.push(line); console.log((r === 'ok' ? 'ok   ' : 'FAIL ') + name + (r === 'ok' ? '' : ' — ' + r) + ' (' + line.secs + 's)' + (notes.length ? ' [' + notes.join('; ') + ']' : '') + (line.errors.length ? ' ERRORS: ' + line.errors.join(' | ') : ''));
  }
  const failed = report.filter((r) => r.result !== 'ok' || r.errors.length);
  console.log('playthrough: ' + (report.length - failed.length) + '/' + report.length + ' steps ok in ' + Math.round((Date.now() - t0) / 60000) + ' min');
  if (process.argv[2]) fs.writeFileSync(process.argv[2], JSON.stringify(report, null, 1));
  await browser.close(); server.close();
  process.exit(failed.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });
