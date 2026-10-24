import assert from 'node:assert/strict';
import {test} from 'node:test';
import {existsSync, readFileSync} from 'node:fs';
import vm from 'node:vm';
import {IDBFactory} from 'fake-indexeddb';
import * as R from '../src/hero-rules.js';
import {defaultLook} from '../src/look-options.js';
import {createWorld, generateScene, sceneIds} from '../src/worldgen/world.js';
import {reduceTutorial} from '../src/tutorial-rules.js';

// IndexedDB is emulated because Node has no browser database. Rules, Requests,
// Responses and the storage adapter are the actual production implementation.
let Local;
try { Local = await import('../src/local-api.js'); }
catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }
const draft = {
  name: 'Локальная Мира', classId: 'wizard', stats: R.preset('wizard'), kit: 0,
  appearance: {...defaultLook('wizard', 'female'), headgear: 'wizhat', hairStyle: 'braid', marks: ['scar'], accessories: ['glasses', 'amulet'], cape: 'long', hair2: '#e07aa8'},
  background: R.background('wizard', () => 0),
};
function fixture(indexedDB = new IDBFactory(), dbName = crypto.randomUUID()) {
  assert.equal(typeof Local?.createLocalAPI, 'function', 'local persistence adapter must exist');
  return {indexedDB, dbName, api: Local.createLocalAPI({indexedDB, dbName, baseURL: 'https://game.test'})};
}
async function call(api, path, method = 'GET', body) {
  const response = await api.fetch('/api/' + path, {method, headers: {'Content-Type': 'application/json'}, body: body === undefined ? undefined : JSON.stringify(body)});
  return {status: response.status, ...await response.json()};
}
async function create(api, options = {}) {
  const h = await call(api, 'heroes', 'POST', draft);
  assert.equal(h.status, 201);
  const w = await call(api, 'worlds', 'POST', {heroId: h.hero.id, seed: 'offline-proof', size: 'small', ...options});
  assert.equal(w.status, 201, w.error);
  return {hero: h.hero, world: w.world};
}

test('native local hero and world IDs use secure random bytes when randomUUID is unavailable', async () => {
  let randomBytesCalls = 0;
  const cryptography = {getRandomValues(bytes) { randomBytesCalls++; return crypto.getRandomValues(bytes); }};
  const api = Local.createLocalAPI({indexedDB: new IDBFactory(), dbName: 'native-uuid-fallback', baseURL: 'capacitor://localhost/', crypto: cryptography});
  const {hero, world} = await create(api);
  const uuidV4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  assert.match(hero.id, uuidV4);
  assert.match(world.id, uuidV4);
  assert.notEqual(hero.id, world.id);
  assert.equal(randomBytesCalls, 2, 'Both IDs use the available secure primitive');
  assert.equal(typeof Local.randomUUID, 'function', 'Practice can use the same native-compatible ID helper');
  await api.close();
});

test('native local responses work without the newer static Response.json method', async () => {
  const original = Response.json;
  Response.json = undefined;
  let api;
  try {
    api = fixture().api;
    const {world} = await create(api);
    const response = await api.fetch('/api/worlds/' + world.id);
    assert.equal(response.headers.get('Content-Type'), 'application/json');
    assert.equal(response.headers.get('Cache-Control'), 'no-store');
    assert.equal((await response.json()).world.id, world.id);
    const bridge = runtime({native: true, href: 'capacitor://localhost/', createLocalAPI: Local.createLocalAPI});
    assert.equal((await bridge.env.fetch('https://external.test/api/heroes')).status, 403);
    assert.equal(bridge.count(), 0);
    const missingAdapter = runtime({native: true, href: 'capacitor://localhost/', createLocalAPI: () => undefined});
    const unavailable = await missingAdapter.env.fetch('/api/heroes');
    assert.equal(unavailable.status, 503);
    assert.match((await unavailable.json()).error, /хранилище/);
    assert.equal(missingAdapter.count(), 0);
  } finally {
    Response.json = original;
    await api?.close();
  }
});

test('hero appearance and progress survive closing and reopening IndexedDB', async () => {
  const f = fixture();
  const {hero, world} = await create(f.api);
  assert.deepEqual(hero.appearance, draft.appearance);
  const snapshot = structuredClone(world.snapshot);
  snapshot.party[0].hp--;
  snapshot.logs.push('След от сохранения');
  const updated = await call(f.api, 'worlds/' + world.id, 'PUT', {revision: world.revision, snapshot});
  assert.equal(updated.status, 200, updated.error);
  assert.equal(updated.world.revision, 2);
  await f.api.close();
  const reopened = fixture(f.indexedDB, f.dbName);
  const loaded = await call(reopened.api, 'worlds/' + world.id);
  assert.deepEqual(loaded.world.snapshot, updated.world.snapshot);
  assert.deepEqual((await call(reopened.api, 'heroes')).heroes[0].appearance, draft.appearance);
  assert.equal((await call(reopened.api, 'heroes')).heroes[0].hp, snapshot.party[0].hp);
  assert.equal((await call(reopened.api, 'worlds?hero_id=' + hero.id)).worlds.length, 1);
  await reopened.api.close();
});

test('concurrent adapters atomically reject stale revisions without losing the winner', async () => {
  const f = fixture();
  const {world} = await create(f.api);
  const other = fixture(f.indexedDB, f.dbName);
  const first = structuredClone(world.snapshot), second = structuredClone(world.snapshot);
  first.party[0].hp--; second.party[0].hp -= 2;
  const results = await Promise.all([call(f.api, 'worlds/' + world.id, 'PUT', {revision: 1, snapshot: first}), call(other.api, 'worlds/' + world.id, 'PUT', {revision: 1, snapshot: second})]);
  assert.deepEqual(results.map(r => r.status).sort(), [200, 409]);
  assert.equal(results.find(r => r.status === 409).conflict, true);
  const winner = results.find(r => r.status === 200).world;
  assert.deepEqual((await call(f.api, 'worlds/' + world.id)).world.snapshot, winner.snapshot);
  assert.equal((await call(f.api, 'worlds/' + world.id)).world.revision, 2);
  await f.api.close(); await other.api.close();
});

test('generated scenes and stored v1/v2 worlds remain unchanged after an adapter restart', async () => {
  const f = fixture();
  for (const generatorVersion of [1, 2]) {
    const {world} = await create(f.api, {generatorVersion});
    assert.equal(world.snapshot.world.gen.v, generatorVersion);
    const plan = createWorld(world.snapshot.world.gen.seed, world.snapshot.world.gen.size, generatorVersion);
    assert.deepEqual(world.generated.plan, JSON.parse(JSON.stringify(plan)));
    const id = sceneIds(plan).at(-1);
    assert.deepEqual((await call(f.api, 'worlds/' + world.id + '/scene?id=' + encodeURIComponent(id))).scene, JSON.parse(JSON.stringify(generateScene(plan, id))));
    await f.api.close(); f.api = fixture(f.indexedDB, f.dbName).api;
    assert.deepEqual((await call(f.api, 'worlds/' + world.id)).world.snapshot, world.snapshot);
    assert.equal((await call(f.api, 'worlds/' + world.id + '/scene?id=__proto__')).status, 404);
  }
  await f.api.close();
});

test('shared validation protects confirmed appearance, generation and saved snapshots', async () => {
  const f = fixture(); const {world} = await create(f.api);
  for (const change of [s => s.world.gen.seed = 'forged', s => s.party[0].appearance.hairStyle = 'invalid', s => s.party[0].x = 999, s => s.party.push(s.party[0])]) {
    const snapshot = structuredClone(world.snapshot); change(snapshot);
    assert.equal((await call(f.api, 'worlds/' + world.id, 'PUT', {revision: 1, snapshot})).status, 400);
  }
  assert.deepEqual((await call(f.api, 'worlds/' + world.id)).world.snapshot, world.snapshot);
  assert.equal((await call(f.api, 'heroes', 'POST', {...draft, stats: R.emptyStats()})).status, 400);
  assert.equal((await call(f.api, 'heroes', 'POST', {...draft, appearance: {...draft.appearance, hairStyle: 'invalid'}})).status, 400);
  await f.api.close();
});

test('new v3 worlds cannot skip first training or finish before the story is complete', async () => {
  const f = fixture();
  const {hero} = await call(f.api, 'heroes', 'POST', draft);
  const skip = await call(f.api, 'worlds', 'POST', {heroId: hero.id, skipTutorial: true, tutorialCompleted: true, seed: 'skip-proof'});
  assert.equal(skip.status, 400, 'request body is not proof of tutorial completion');
  const created = await call(f.api, 'worlds', 'POST', {heroId: hero.id, seed: 'v3-proof', size: 'small'});
  assert.equal(created.status, 201, created.error);
  const {world} = created;
  assert.equal(world.snapshot.world.gen.v, 3);
  assert.equal(world.snapshot.scene, 'glade');
  assert.equal((await call(f.api, 'worlds/' + world.id + '/finish', 'POST', {revision: 1})).status, 400);
  assert.equal((await call(f.api, 'worlds', 'POST', {heroId: hero.id})).status, 409);
  await f.api.close();
});

test('finish, checkpoint and explicit deletion preserve the hero and archived state', async () => {
  const f = fixture(); const {hero, world} = await create(f.api, {generatorVersion: 2});
  const finished = await call(f.api, 'worlds/' + world.id + '/finish', 'POST', {revision: 1});
  assert.equal(finished.status, 200, finished.error);
  assert.equal(finished.world.status, 'completed');
  assert.equal((await call(f.api, 'worlds/' + world.id, 'PUT', {revision: 2, snapshot: world.snapshot})).status, 409);
  assert.equal((await call(f.api, 'worlds/' + world.id, 'DELETE', {revision: 1})).status, 409);
  assert.equal((await call(f.api, 'worlds/' + world.id, 'DELETE', {revision: 2})).status, 200);
  const savedHero = (await call(f.api, 'heroes')).heroes.find(h => h.id === hero.id);
  assert.deepEqual(savedHero.appearance, hero.appearance);
  assert.equal(savedHero.checkpointChapter, 1);
  assert.equal((await call(f.api, 'worlds/' + world.id)).status, 404);
  assert.equal((await call(f.api, 'heroes/' + hero.id, 'DELETE')).status, 200);
  assert.equal((await call(f.api, 'heroes')).heroes.length, 0);
  await f.api.close();
});

test('offline world transitions retain all hero property once across retry, archive deletion and restart', async () => {
  const f = fixture();
  const {hero, world} = await create(f.api, {generatorVersion: 2});
  const s = structuredClone(world.snapshot);
  Object.assign(s, {gold: 41, potions: 2, xp: 65});
  Object.assign(s.party[0], {gold: 1, potions: 99, hp: 2, slots: 1, torches: 1, hands: ['staff', 'torch'], torch: true,
    conditions: ['poisoned'], permanentEffects: [{id: 'blessing', bonus: 1}]});
  s.party[0].inventory.push('Подаренная верёвка');
  let r = await call(f.api, 'worlds/' + world.id, 'PUT', {revision: world.revision, snapshot: s});
  assert.equal(r.status, 200, r.error);
  r = await call(f.api, 'worlds/' + world.id + '/finish', 'POST', {revision: r.world.revision});
  assert.equal(r.status, 200, r.error);
  const archived = r.world;
  const other = fixture(f.indexedDB, f.dbName);
  const creation = {heroId: hero.id, generatorVersion: 2, startingGold: 9999, potions: 9999, hero: {...hero, gold: 9999}};
  const attempts = await Promise.all([call(f.api, 'worlds', 'POST', creation), call(other.api, 'worlds', 'POST', {...creation, leaveGold: true})]);
  assert.deepEqual(attempts.map(a => a.status).sort(), [201, 409]);
  const next = attempts.find(a => a.status === 201).world;
  const retry = attempts.find(a => a.status === 409);
  assert.equal(retry.transferPending, undefined, 'No transition defers or discards gold');
  assert.equal(retry.world.id, next.id);
  assert.deepEqual(retry.world.snapshot, next.snapshot);
  // A preserved prior profile can contain equal creation timestamps; do not
  // rewrite snapshots to repair its most-recent-world order.
  const db = await new Promise((resolve, reject) => { const r = f.indexedDB.open(f.dbName, 1); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
  await new Promise((resolve, reject) => {
    const tx = db.transaction('profiles', 'readwrite'), store = tx.objectStore('profiles'), request = store.get('player');
    request.onsuccess = () => { const profile = request.result; profile.worlds.find(w => w.id === next.id).createdAt = archived.createdAt; store.put(profile, 'player'); };
    tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
  });
  db.close();
  assert.deepEqual((await call(f.api, 'worlds?hero_id=' + hero.id)).worlds.map(w => w.id), [next.id, archived.id]);
  assert.equal(next.snapshot.gold, 41);
  assert.equal(next.snapshot.potions, 2);
  assert.equal(next.snapshot.xp, 65);
  assert.equal(next.snapshot.level, s.level);
  for (const key of ['inventory', 'hands', 'torches', 'torch', 'appearance', 'conditions', 'permanentEffects', 'hp', 'slots']) assert.deepEqual(next.snapshot.party[0][key], s.party[0][key], key);
  assert.deepEqual((await call(f.api, 'worlds/' + archived.id)).world.snapshot, archived.snapshot);
  assert.equal((await call(f.api, 'worlds?hero_id=' + hero.id)).worlds.length, 2);
  assert.equal((await call(f.api, 'heroes')).heroes[0].potions, 2);
  const modified = structuredClone(next.snapshot);
  modified.gold = 33;
  modified.potions = 1;
  modified.party[0].inventory.push('Ещё одна верёвка');
  r = await call(f.api, 'worlds/' + next.id, 'PUT', {revision: next.revision, snapshot: modified});
  assert.equal(r.status, 200, r.error);
  assert.equal((await call(f.api, 'worlds/' + next.id, 'DELETE', {revision: next.revision})).status, 409);
  assert.deepEqual((await call(f.api, 'worlds/' + next.id)).world.snapshot, r.world.snapshot);
  assert.equal((await call(f.api, 'worlds/' + next.id, 'DELETE', {revision: r.world.revision})).status, 200);
  assert.equal((await call(f.api, 'worlds/' + archived.id, 'DELETE', {revision: archived.revision})).status, 200);
  await f.api.close();
  await other.api.close();
  const reopened = fixture(f.indexedDB, f.dbName);
  const savedHero = (await call(reopened.api, 'heroes')).heroes[0];
  assert.equal(savedHero.gold, 33);
  assert.equal(savedHero.potions, 1);
  assert.deepEqual(savedHero.inventory, modified.party[0].inventory);
  const restarted = await call(reopened.api, 'worlds', 'POST', {...creation, seed: 'after-property-checkpoint'});
  assert.equal(restarted.status, 201, restarted.error);
  assert.equal(restarted.world.snapshot.gold, 33);
  assert.equal(restarted.world.snapshot.potions, 1);
  assert.equal(restarted.world.snapshot.world.chapter, 3);
  assert.deepEqual(restarted.world.snapshot.party[0].inventory, modified.party[0].inventory);
  await reopened.api.close();
});

test('offline same-ms restarted worlds supersede deletion checkpoints with their current resources', async () => {
  const originalNow = Date.now, fixed = originalNow(), f = fixture();
  Date.now = () => fixed;
  try {
    const {hero, world} = await create(f.api, {generatorVersion: 2});
    const old = structuredClone(world.snapshot);
    Object.assign(old, {gold: 11, potions: 2});
    let r = await call(f.api, 'worlds/' + world.id, 'PUT', {revision: world.revision, snapshot: old});
    assert.equal(r.status, 200, r.error);
    assert.equal((await call(f.api, 'worlds/' + world.id, 'DELETE', {revision: r.world.revision})).status, 200);
    r = await call(f.api, 'worlds', 'POST', {heroId: hero.id, generatorVersion: 2, seed: 'same-ms-restart', size: 'small'});
    assert.equal(r.status, 201, r.error);
    const live = structuredClone(r.world.snapshot);
    Object.assign(live, {gold: 7, potions: 1});
    r = await call(f.api, 'worlds/' + r.world.id, 'PUT', {revision: r.world.revision, snapshot: live});
    assert.equal(r.status, 200, r.error);
    const currentHero = (await call(f.api, 'heroes')).heroes[0];
    assert.equal(currentHero.gold, 7, 'The active snapshot supersedes its earlier checkpoint');
    assert.equal(currentHero.potions, 1);
  } finally { Date.now = originalNow; await f.api.close(); }
});

test('saved campaign training unlocks skip after world deletion and database restart', async () => {
  const f = fixture(); const {hero, world} = await create(f.api);
  assert.equal((await call(f.api, 'worlds?hero_id=' + hero.id)).tutorialCompleted, false);
  const snapshot = structuredClone(world.snapshot);
  const events = [
    {type: 'selection', kind: 'tile'}, {type: 'movement'}, {type: 'camera', action: 'center'}, {type: 'camera', action: 'zoom'},
    {type: 'interaction'}, {type: 'loot'}, {type: 'tab', tab: 'hero'}, {type: 'tab', tab: 'bag'}, {type: 'equipment'}, {type: 'journal'},
    {type: 'actions'}, {type: 'ability', id: 'magearmor'}, {type: 'dodge'}, {type: 'turn', encounterId: 'tutorial-win'},
    {type: 'potion'}, {type: 'attack'}, {type: 'victory', encounterId: 'tutorial-win'}, {type: 'turn', encounterId: 'tutorial-loss'},
    {type: 'unconscious', encounterId: 'tutorial-loss'}, {type: 'rescue', encounterId: 'tutorial-loss'},
  ];
  for (const event of events) snapshot.tutorial = reduceTutorial(snapshot.tutorial, event);
  assert.equal(snapshot.tutorial.completed, true);
  const saved = await call(f.api, 'worlds/' + world.id, 'PUT', {revision: 1, snapshot});
  assert.equal(saved.status, 200, saved.error);
  assert.equal((await call(f.api, 'worlds/' + world.id, 'DELETE', {revision: saved.world.revision})).status, 200);
  await f.api.close(); f.api = fixture(f.indexedDB, f.dbName).api;
  const list = await call(f.api, 'worlds?hero_id=' + hero.id);
  assert.equal(list.worlds.length, 0);
  assert.equal(list.tutorialCompleted, true);
  const next = await call(f.api, 'worlds', 'POST', {heroId: hero.id, seed: 'after-deletion', size: 'small', skipTutorial: true, tutorialCompleted: false});
  assert.equal(next.status, 201, next.error);
  assert.equal(next.world.snapshot.tutorial.skipped, true);
  await f.api.close();
});

test('a persisted practice snapshot does not grant campaign tutorial completion', async () => {
  const f = fixture(); const {hero, world} = await create(f.api);
  await f.api.close();
  // A preserved record from a prior client must not be accepted as campaign proof.
  const db = await new Promise((resolve, reject) => { const r = f.indexedDB.open(f.dbName, 1); r.onsuccess = () => resolve(r.result); r.onerror = () => reject(r.error); });
  await new Promise((resolve, reject) => {
    const tx = db.transaction('profiles', 'readwrite'), store = tx.objectStore('profiles'), request = store.get('player');
    request.onsuccess = () => { const profile = request.result; profile.worlds[0].snapshot.tutorial.mode = 'practice'; profile.worlds[0].snapshot.tutorial.completed = true; profile.worlds[0].status = 'completed'; store.put(profile, 'player'); };
    tx.oncomplete = resolve; tx.onerror = () => reject(tx.error);
  });
  db.close(); f.api = fixture(f.indexedDB, f.dbName).api;
  assert.equal((await call(f.api, 'worlds?hero_id=' + hero.id)).tutorialCompleted, false);
  assert.equal((await call(f.api, 'heroes')).tutorialCompleted, false);
  const next = await call(f.api, 'worlds', 'POST', {heroId: hero.id, seed: 'practice-is-not-campaign', size: 'small', skipTutorial: true});
  assert.equal(next.status, 400);
  assert.deepEqual((await call(f.api, 'worlds/' + world.id)).world.snapshot.tutorial, {...world.snapshot.tutorial, mode: 'practice', completed: true});
  await f.api.close();
});

function runtime({native = false, href = 'https://game.test/', createLocalAPI} = {}) {
  assert(existsSync(new URL('../dist/native-runtime.js', import.meta.url)), 'native/offline fetch bridge must exist');
  let network = 0;
  const originalFetch = async () => { network++; return new Response('asset'); };
  const env = {URL, Request, Response, Headers, location: new URL(href), indexedDB: new IDBFactory(), fetch: originalFetch, Capacitor: {isNativePlatform: () => native}, LocalAPI: {createLocalAPI}, console};
  env.window = env;
  vm.createContext(env); vm.runInContext(readFileSync(new URL('../dist/native-runtime.js', import.meta.url), 'utf8'), env);
  return {env, originalFetch, count: () => network};
}

test('native and explicit offline requests use actual local storage without fake auth or network', async () => {
  assert.equal(typeof Local?.createLocalAPI, 'function');
  for (const opts of [{native: true, href: 'capacitor://localhost/'}, {native: false, href: 'https://game.test/?offline=1'}]) {
    const r = runtime({...opts, createLocalAPI: Local.createLocalAPI});
    const created = await r.env.fetch('/api/heroes', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(draft)});
    assert.equal(created.status, 201);
    assert.equal((await (await r.env.fetch('/api/heroes')).json()).heroes.length, 1);
    assert.equal((await r.env.fetch('https://external.test/api/heroes')).status, 403);
    if (opts.native) assert.equal((await r.env.fetch('capacitor://external/api/heroes')).status, 403, 'opaque origins do not grant other native hosts local access');
    assert.equal((await r.env.fetch('/api/unknown')).status, 404);
    assert.equal(r.count(), 0);
    await r.env.fetch('/assets/local.png'); assert.equal(r.count(), 1);
    await r.env.NativeRuntime.api.close();
  }
});

test('ordinary browser mode keeps the original fetch and server authentication intact', async () => {
  const r = runtime({createLocalAPI: () => { throw Error('must not open offline storage'); }});
  assert.equal(r.env.fetch, r.originalFetch);
  await r.env.fetch('/api/heroes'); assert.equal(r.count(), 1);
});

test('missing IndexedDB fails closed without sending local API requests to a server', async () => {
  assert.equal(typeof Local?.createLocalAPI, 'function');
  const api = Local.createLocalAPI({indexedDB: null, baseURL: 'https://game.test'});
  const response = await api.fetch('/api/heroes');
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /хранилищ|сохранени/i);
});
