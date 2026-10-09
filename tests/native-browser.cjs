// Real Chromium + IndexedDB, served from the same assets packaged for iOS.
// The native-platform detector fixture is a JavaScript stub, not an iPhone test.
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const assert = require('node:assert/strict');
const {createHash} = require('node:crypto');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

const root = path.join(__dirname, '..');
const client = path.join(root, 'dist/client');
const packaged = path.join(root, 'ios/App/App/public');
const hash = file => createHash('sha256').update(fs.readFileSync(file)).digest('hex');

function verifyNativeProject() {
  const config = JSON.parse(fs.readFileSync(path.join(root, 'capacitor.config.json'), 'utf8'));
  const nativeConfig = JSON.parse(fs.readFileSync(path.join(root, 'ios/App/App/capacitor.config.json'), 'utf8'));
  assert.equal(config.appId, 'com.dndigra.game');
  assert.equal(config.webDir, 'dist/client');
  assert.equal(config.server?.url, undefined, 'The app loads bundled assets');
  assert.equal(config.ios.preferredContentMode, 'mobile');
  assert.equal(nativeConfig.appId, config.appId);
  assert.equal(nativeConfig.server?.url, undefined);
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const version = pkg.dependencies['@capacitor/core'];
  assert.equal(pkg.dependencies['@capacitor/ios'], version);
  assert.equal(pkg.devDependencies['@capacitor/cli'], version);
  const spm = fs.readFileSync(path.join(root, 'ios/App/CapApp-SPM/Package.swift'), 'utf8');
  assert(spm.includes('exact: "' + version + '"'));
  assert(spm.includes('.iOS(.v15)'));
  const plist = fs.readFileSync(path.join(root, 'ios/App/App/Info.plist'), 'utf8');
  const phoneOrientations = plist.match(/<key>UISupportedInterfaceOrientations<\/key>\s*<array>([\s\S]*?)<\/array>/)?.[1];
  assert(phoneOrientations?.includes('UIInterfaceOrientationPortrait'));
  assert(!phoneOrientations.includes('Landscape'));
  const project = fs.readFileSync(path.join(root, 'ios/App/App.xcodeproj/project.pbxproj'), 'utf8');
  assert(project.includes('PRODUCT_BUNDLE_IDENTIFIER = ' + config.appId));
  const targets = [...project.matchAll(/IPHONEOS_DEPLOYMENT_TARGET = ([\d.]+);/g)].map(match => match[1]);
  assert(targets.length >= 2 && targets.every(version => version === '15.4'), 'Every app configuration requires iOS15.4 APIs');
  let copied = 0;
  function walk(directory, rel = '') {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
      const next = path.join(rel, entry.name);
      if (entry.isDirectory()) walk(path.join(directory, entry.name), next);
      else {
        const target = path.join(packaged, next);
        assert(fs.existsSync(target), 'Missing packaged asset: ' + next);
        assert.equal(hash(target), hash(path.join(directory, entry.name)), 'Re-copy changed asset: ' + next);
        copied++;
      }
    }
  }
  walk(client);
  assert(copied > 50, 'Game assets were actually copied');
  assert(!fs.existsSync(path.join(packaged, 'qa')), 'QA screenshots are excluded');
  console.log('PASS native project: matching Capacitor versions, SPM, bundled assets, portrait iPhone, ' + copied + ' copied files');
}

(async () => {
  verifyNativeProject();
  const apiRequests = [];
  const server = http.createServer((req, res) => {
    const pathname = new URL(req.url, 'http://localhost').pathname;
    if (/^\/api(?:\/|$)/.test(pathname)) {
      apiRequests.push({method: req.method, pathname});
      res.writeHead(503, {'Content-Type': 'application/json'});
      return res.end(JSON.stringify({error: 'This test has no API server.'}));
    }
    if (pathname === '/favicon.ico') { res.writeHead(204); return res.end(); }
    if (pathname === '/native-detector-fixture.html') {
      res.setHeader('Content-Type', 'text/html');
      return res.end('<!doctype html><html><head><script src="/local-api.js"></script><script src="/native-runtime.js"></script></head><body>Native platform detector fixture</body></html>');
    }
    const file = path.resolve(client, '.' + decodeURIComponent(pathname === '/' ? '/index.html' : pathname));
    if (!file.startsWith(client + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404); return res.end(); }
    const mime = {'.js': 'application/javascript', '.css': 'text/css', '.html': 'text/html', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff': 'font/woff', '.woff2': 'font/woff2', '.json': 'application/json'};
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    fs.createReadStream(file).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = 'http://127.0.0.1:' + server.address().port;
  let browser, page;
  try {
    browser = await chromium.launch({
      executablePath: process.env.CHROME_EXECUTABLE || '/usr/bin/chromium',
      args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', ...JSON.parse(process.env.CHROMIUM_ARGS || '[]')]
    });
    const context = await browser.newContext({viewport: {width: 390, height: 844}, isMobile: true, hasTouch: true});
    await context.addInitScript(() => {
      localStorage.setItem('beyond-menu-preferences-explicit', 'true');
      localStorage.setItem('beyond-menu-preferences', JSON.stringify({lights: false, animations: false, grid: false, ambient: .28, intensity: 1}));
      // Exercise the actual app with the APIs absent on older/custom-scheme
      // WebViews. This is a compatibility fixture, not native-device emulation.
      Object.defineProperty(crypto, 'randomUUID', {value: undefined, configurable: true});
      Response.json = undefined;
    });
    page = await context.newPage();
    page.setDefaultTimeout(60000);
    const errors = [], networkApiRequests = [], externalRequests = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {
      const url = new URL(request.url());
      if (/^\/api(?:\/|$)/.test(url.pathname)) networkApiRequests.push(request.url());
      if (/^https?:$/.test(url.protocol) && url.origin !== base) externalRequests.push(request.url());
    });
    console.log('RUN offline browser: local hero, UI world creation, intro checkpoint and reload');
    await page.goto(base + '/?offline=1', {waitUntil: 'domcontentloaded', timeout: 120000});
    await page.waitForFunction(() => window.voxel?.ready && window.NativeRuntime?.api, null, {timeout: 120000});
    assert.equal(await page.evaluate(() => NativeRuntime.offline), true);
    assert.equal(await page.evaluate(() => Worlds.resumeKey), 'dndigra-local-last-world-id');
    const hero = await page.evaluate(async () => {
      const classId = 'wizard';
      const appearance = {...Characters.defaultLook(classId, 'female'), hairStyle: 'long', hair: '#c4622f', eyes: 'sparkle', eye: '#2f7a5a'};
      // Creation passes the same hero validator as the server. World creation below uses the visible UI.
      const response = await fetch('/api/heroes', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({
        name: 'Локальная героиня', classId, stats: HeroRules.preset(classId), appearance,
        kit: 0, background: HeroRules.background(classId, () => 0)
      })});
      const data = await response.json();
      if (!response.ok) throw Error(data.error);
      return data.hero;
    });
    await page.evaluate(async hero => { document.querySelectorAll('dialog').forEach(dialog => dialog.close()); await Worlds.choose(hero); }, hero);
    await page.getByRole('button', {name: 'Начать мир', exact: true}).click();
    await page.locator('#world-seed').fill('native-browser-smoke');
    await page.locator('#world-size').selectOption('small');
    assert.equal(await page.locator('#skip-tutorial').isEnabled(), false);
    await page.getByRole('button', {name: 'Создать мир', exact: true}).click();
    await page.waitForFunction(() => Worlds.current && gameDebug.state.scene === 'glade', null, {timeout: 120000});
    assert.equal(await page.locator('#adventure-cinematic [data-portrait-source="character-boxes"]').count(), 1);
    assert.deepEqual(await page.evaluate(() => gameDebug.active().appearance), hero.appearance);
    assert.equal(await page.evaluate(() => gameDebug.state.party.length), 1);
    assert.equal(await page.evaluate(() => gameDebug.state.world.gen.v), 3);
    await page.locator('#adventure-cinematic .adventure-choices button').click();
    await page.waitForFunction(() => gameDebug.state.story.intro === 1);
    const before = await page.evaluate(async () => {
      gameDebug.save(); Worlds.capture();
      if (!await Worlds.flush()) throw Error('IndexedDB checkpoint save failed');
      const resources = ({hp, max, slots, maxSlots, secondWind, maxSecondWind, conditions, hands, inventory, appearance, id}) => ({hp, max, slots, maxSlots, secondWind, maxSecondWind, conditions, hands, inventory, appearance, id});
      const response = await fetch('/api/worlds/' + Worlds.current.id);
      const stored = await response.json();
      if (!response.ok) throw Error(stored.error);
      return {id: Worlds.current.id, revision: Worlds.current.revision, saved: stored.world.snapshot,
        resources: resources(gameDebug.active()), story: structuredClone(gameDebug.state.story), tutorial: structuredClone(gameDebug.state.tutorial)};
    });
    assert.equal(before.saved.story.intro, 1);
    assert.equal(before.saved.party[0].id, hero.id);
    assert.match(hero.id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.match(before.id, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.equal(await page.evaluate(() => localStorage.getItem('last-world-id')), null, 'Offline mode does not overwrite the server resume key');
    console.log('SAVED offline checkpoint revision', before.revision);
    await page.reload({waitUntil: 'domcontentloaded', timeout: 120000});
    await page.waitForFunction(() => window.voxel?.ready && window.NativeRuntime?.api, null, {timeout: 120000});
    await page.getByRole('button', {name: 'Продолжить', exact: true}).click();
    await page.waitForFunction(id => Worlds.current?.id === id && gameDebug.state.story?.intro === 1, before.id, {timeout: 120000});
    const after = await page.evaluate(async () => {
      const resources = ({hp, max, slots, maxSlots, secondWind, maxSecondWind, conditions, hands, inventory, appearance, id}) => ({hp, max, slots, maxSlots, secondWind, maxSecondWind, conditions, hands, inventory, appearance, id});
      const response = await fetch('/api/heroes'), heroes = await response.json();
      return {id: Worlds.current.id, revision: Worlds.current.revision, resources: resources(gameDebug.active()), story: structuredClone(gameDebug.state.story), tutorial: structuredClone(gameDebug.state.tutorial), heroes: heroes.heroes};
    });
    assert.equal(after.id, before.id);
    assert(after.revision >= before.revision);
    assert.deepEqual(after.resources, before.resources);
    assert.deepEqual(after.story, before.story);
    assert.deepEqual(after.tutorial, before.tutorial);
    assert.equal(after.heroes.length, 1);
    assert.equal(after.heroes[0].id, hero.id);
    assert.deepEqual(after.heroes[0].appearance, hero.appearance);
    assert.equal(await page.evaluate(() => document.body.scrollWidth <= innerWidth), true);
    fs.mkdirSync(path.join(root, 'qa'), {recursive: true});
    await page.screenshot({path: path.join(root, 'qa/native-offline-reload-390.png'), timeout: 60000});
    assert.deepEqual(networkApiRequests, [], 'Local calls never reach browser networking');
    assert.deepEqual(externalRequests, [], 'Bundled offline gameplay loads no external resources');
    assert.deepEqual(errors, [], 'No JavaScript errors in offline creation or resume');
    await context.close();

    // This fixture exercises automatic mode selection and real IndexedDB without
    // pretending that Chromium supplies Apple's native bridge.
    const detectorContext = await browser.newContext();
    await detectorContext.addInitScript(() => { window.Capacitor = {isNativePlatform: () => true}; });
    const detector = await detectorContext.newPage();
    await detector.goto(base + '/native-detector-fixture.html', {waitUntil: 'domcontentloaded'});
    const detection = await detector.evaluate(async () => {
      const response = await fetch('/api/heroes'), heroes = await response.json();
      const external = await fetch('https://unavailable.invalid/api/heroes');
      return {offline: NativeRuntime.offline, status: response.status, heroes: heroes.heroes, external: external.status, hasQuery: new URL(location.href).searchParams.has('offline')};
    });
    assert.deepEqual(detection, {offline: true, status: 200, heroes: [], external: 403, hasQuery: false});
    await detectorContext.close();
    assert.deepEqual(apiRequests, [], 'The test server never received an API request');
    console.log('PASS offline browser: validated local hero, actual world UI, shared-appearance intro, saved IndexedDB checkpoint and resume, isolated local profile and zero API network requests');
    console.log('PASS automatic local detector fixture: native platform stub enables local storage without an offline query; external API rejected locally');
    console.log('NOT TESTED: Xcode compilation, signing, WKWebView, physical iPhone or TestFlight');
  } catch (error) {
    if (page && !page.isClosed()) console.error('NATIVE_STATUS', await page.evaluate(() => ({offline: window.NativeRuntime?.offline, world: window.Worlds?.current?.id, story: window.gameDebug?.state.story, busy: window.gameDebug?.busy, modal: document.getElementById('modal-body')?.textContent})).catch(() => null));
    throw error;
  } finally {
    await browser?.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
