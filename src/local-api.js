import {sheet, pointsUsed, POINT_BUDGET, CLASSES} from './hero-rules.js';
import {handType, focusName} from './inventory-rules.js';
import {initialWorld, validateWorldSnapshot, canFinishWorld} from './world-api.js';
import {createWorld, generateScene} from './worldgen/world.js';

// The native client is one local player. There is no server identity header,
// cloud account or automatic migration of another player's server records.
export {initialWorld};
export function randomUUID(cryptography = globalThis.crypto) {
  if (typeof cryptography?.randomUUID === 'function') return cryptography.randomUUID();
  const bytes = new Uint8Array(16);
  if (typeof cryptography?.getRandomValues !== 'function') throw Error('Secure random values are unavailable');
  cryptography.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
  return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
}
const json = (data, status = 200) => new Response(JSON.stringify(data), {status, headers: {'Content-Type': 'application/json', 'Cache-Control': 'no-store'}});
const result = (data, status = 200) => ({data, status});
const error = (message, status = 400, extra = {}) => result({error: message, ...extra}, status);
const latestWorld = (profile, heroId) => profile.worlds.filter(w => w.heroId === heroId).sort((a, b) => b.createdAt - a.createdAt)[0];
const freshProfile = () => ({v: 1, heroes: [], worlds: [], tutorialCompleted: false});

function generatedData(snapshot) {
  if (!snapshot.world?.gen) return {};
  const gen = snapshot.world.gen, plan = createWorld(gen.seed, gen.size, gen.v);
  return {generated: {plan, scene: generateScene(plan, snapshot.scene)}};
}

function carry(previous) {
  const s = previous.snapshot, a = structuredClone(s.party[0]), kit = CLASSES[a.classId].kits[a.kit];
  Object.assign(a, {level: s.level, xp: s.xp, gold: 0, torches: 0, torch: false});
  a.inventory = a.inventory.filter(v => v === kit.armor || v.startsWith(kit.armor) || a.hands.includes('sword') && handType(v) === 'sword' || a.hands.includes('shield') && handType(v) === 'shield' || a.hands.includes('staff') && (handType(v) === 'staff' || focusName(v)));
  a.hands = a.hands.map(v => v === 'torch' ? 'empty' : v);
  return a;
}

function route(profile, url, method, body, cryptography) {
  if (profile.v !== 1 || !Array.isArray(profile.heroes) || !Array.isArray(profile.worlds)) throw Error('Unsupported local save version');
  const parts = url.pathname.split('/').filter(Boolean);
  if (parts[0] !== 'api' || !['heroes', 'worlds'].includes(parts[1])) return error('Локальный путь не найден.', 404);
  const id = parts[2] ? decodeURIComponent(parts[2]) : null, action = parts[3];
  if (parts.length > 4) return error('Локальный путь не найден.', 404);
  if (parts[1] === 'heroes') {
    if (action) return error('Локальный путь не найден.', 404);
    if (method === 'GET' && !id) return result({heroes: profile.heroes.map(h => {
      const w = latestWorld(profile, h.id);
      if (!w) return h;
      const current = h.checkpointAt > w.updatedAt ? h : {...w.snapshot.party[0], level: w.snapshot.level, xp: w.snapshot.xp, gold: w.snapshot.gold};
      return {...current, worldStatus: w.status, activeWorldId: w.status === 'active' ? w.id : null};
    }), tutorialCompleted: !!profile.tutorialCompleted || profile.worlds.some(w => w.snapshot.tutorial?.mode === 'campaign' && w.snapshot.tutorial.completed === true)});
    if (method === 'POST' && !id) {
      let hero;
      try {
        hero = sheet(body, randomUUID(cryptography));
        if (pointsUsed(hero.stats) !== POINT_BUDGET) throw Error('Распределите все 27 очков характеристик.');
      } catch (e) { return error(e.message); }
      profile.heroes.push(hero);
      return result({hero}, 201);
    }
    if (method === 'DELETE' && id) {
      if (!profile.heroes.some(h => h.id === id)) return error('Герой не найден.', 404);
      profile.heroes = profile.heroes.filter(h => h.id !== id);
      profile.worlds = profile.worlds.filter(w => w.heroId !== id);
      return result({deleted: true});
    }
    return error('Метод недоступен.', 405);
  }

  const world = id ? profile.worlds.find(w => w.id === id) : null;
  if (method === 'GET') {
    if (id) {
      if (!world) return error('Мир не найден.', 404);
      if (action === 'scene') {
        const sid = url.searchParams.get('id'), gen = world.snapshot.world?.gen;
        if (!gen) return error('Этот мир не использует генератор.');
        const plan = createWorld(gen.seed, gen.size, gen.v);
        if (!sid || !Object.hasOwn(plan.scenes, sid)) return error('Место не найдено.', 404);
        return result({scene: generateScene(plan, sid)});
      }
      if (action) return error('Локальный путь не найден.', 404);
      return result({world: {...world, ...generatedData(world.snapshot)}});
    }
    const heroId = url.searchParams.get('hero_id');
    if (!heroId) return error('Выберите героя.');
    return result({worlds: profile.worlds.filter(w => w.heroId === heroId).sort((a, b) => b.createdAt - a.createdAt), tutorialCompleted: !!profile.tutorialCompleted || profile.worlds.some(w => w.snapshot.tutorial?.mode === 'campaign' && w.snapshot.tutorial.completed === true)});
  }

  if (method === 'POST' && !id) {
    const base = profile.heroes.find(h => h.id === body?.heroId);
    if (!base) return error('Герой не найден.', 404);
    const active = profile.worlds.find(w => w.heroId === base.id && w.status === 'active');
    if (active) return error('Герой уже проходит другой мир. Продолжите его историю.', 409, {world: active});
    const previous = latestWorld(profile, base.id), checkpointNewer = base.checkpointAt > (previous?.updatedAt || 0);
    if (previous && !checkpointNewer && previous.snapshot.gold > 0 && !body.leaveGold) return error('Можно пока оставить золото в архиве завершённого мира.', 409, {transferPending: true});
    const hero = checkpointNewer || !previous ? base : carry(previous);
    if (hero.dead || hero.hp <= 0) return error('Этот герой не может начать новый мир.', 409);
    const tutorialCompleted = !!profile.tutorialCompleted || profile.worlds.some(w => w.snapshot.tutorial?.mode === 'campaign' && w.snapshot.tutorial.completed === true);
    let snapshot;
    const worldId = randomUUID(cryptography);
    try { snapshot = initialWorld(hero, worldId, Math.max(previous?.snapshot.world.chapter || 0, hero.checkpointChapter || 0) + 1, {seed: body.seed, size: body.size, generatorVersion: body.generatorVersion, skipTutorial: body.skipTutorial, tutorialCompleted}); }
    catch (e) { return error(e.message); }
    const now = Date.now(), createdAt = Math.max(now, ...profile.worlds.map(w => w.createdAt + 1));
    const record = {id: worldId, heroId: hero.id, status: 'active', revision: 1, createdAt, updatedAt: now, snapshot};
    profile.worlds.push(record);
    return result({world: {...record, ...generatedData(snapshot)}}, 201);
  }

  if (id && method === 'DELETE' && !action) {
    if (!world) return error('Мир не найден.', 404);
    if (body?.revision !== world.revision) return error('Мир изменился. Обновите сохранение перед удалением.', 409, {conflict: true});
    const base = profile.heroes.find(h => h.id === world.heroId), s = world.snapshot;
    if (base && latestWorld(profile, base.id)?.id === world.id && !(base.checkpointAt > world.updatedAt)) {
      const checkpoint = {...s.party[0], level: s.level, xp: s.xp, gold: s.gold, checkpointAt: Math.max(Date.now(), world.updatedAt + 1), checkpointChapter: s.world.chapter};
      profile.heroes[profile.heroes.indexOf(base)] = checkpoint;
    }
    profile.worlds = profile.worlds.filter(w => w.id !== id);
    return result({deleted: true});
  }

  if (id && (method === 'PUT' && !action || method === 'POST' && action === 'finish')) {
    if (!world) return error('Мир не найден.', 404);
    if (world.status !== 'active') return error('Завершённый мир доступен только для просмотра.', 409);
    if (body?.revision !== world.revision) return error('Мир уже изменился. Загрузите последнее сохранение.', 409, {conflict: true});
    let snapshot;
    try { snapshot = method === 'PUT' ? validateWorldSnapshot(body.snapshot, world.snapshot) : world.snapshot; }
    catch (e) { return error(e.message); }
    if (action === 'finish' && !canFinishWorld(snapshot)) return error('Сначала завершите историю, обучение и бой.');
    Object.assign(world, {snapshot, revision: world.revision + 1, updatedAt: Date.now(), status: action === 'finish' ? 'completed' : 'active'});
    if (snapshot.tutorial?.mode === 'campaign' && snapshot.tutorial.completed === true) profile.tutorialCompleted = true;
    return result({world});
  }
  return error('Метод недоступен.', 405);
}

export function createLocalAPI({indexedDB = globalThis.indexedDB, dbName = 'dndigra-offline-v1', baseURL = globalThis.location?.href || 'http://localhost/', crypto: cryptography = globalThis.crypto} = {}) {
  let opening;
  function open() {
    if (!opening) opening = new Promise((resolve, reject) => {
      if (!indexedDB) return reject(Error('IndexedDB unavailable'));
      const request = indexedDB.open(dbName, 1);
      request.onupgradeneeded = () => { if (!request.result.objectStoreNames.contains('profiles')) request.result.createObjectStore('profiles'); };
      request.onerror = () => reject(request.error);
      request.onblocked = () => reject(Error('Local database upgrade is blocked'));
      request.onsuccess = () => { const db = request.result; db.onversionchange = () => { db.close(); opening = null; }; resolve(db); };
    });
    return opening;
  }
  async function transact(url, method, body) {
    const db = await open();
    // A single read/write transaction performs compare-and-set plus persistence.
    // IndexedDB serializes these transactions even across separate WebViews/tabs.
    return new Promise((resolve, reject) => {
      const transaction = db.transaction('profiles', method === 'GET' ? 'readonly' : 'readwrite');
      const store = transaction.objectStore('profiles'), request = store.get('player');
      let output;
      transaction.onerror = () => reject(transaction.error);
      transaction.onabort = () => reject(transaction.error || Error('Local transaction aborted'));
      transaction.oncomplete = () => resolve(output);
      request.onsuccess = () => {
        try {
          const profile = request.result || freshProfile();
          output = route(profile, url, method, body, cryptography);
          if (method !== 'GET' && output.status < 400) store.put(profile, 'player');
        } catch (e) { reject(e); transaction.abort(); }
      };
    });
  }
  return {
    async fetch(input, init) {
      let request, url, body;
      try {
        const address = input instanceof Request ? input : new URL(String(input), baseURL).href;
        request = new Request(address, init);
        url = new URL(request.url);
        const local = new URL(baseURL);
        if (url.protocol !== local.protocol || url.host !== local.host) return json({error: 'Внешний API недоступен в локальной игре.'}, 403);
        if (request.method !== 'GET') {
          const raw = await request.text(), maxSize = url.pathname === '/api/heroes' ? 10000 : 512000;
          if (raw.length > maxSize) return json({error: 'Сохранение слишком большое.'}, 413);
          try { body = raw ? JSON.parse(raw) : {}; } catch { return json({error: 'Некорректные данные.'}, 400); }
        }
      } catch { return json({error: 'Некорректный локальный запрос.'}, 400); }
      try { const r = await transact(url, request.method, body); return json(r.data, r.status); }
      catch { return json({error: 'Локальное хранилище недоступно. Не закрывайте игру до сохранения прогресса.'}, 503); }
    },
    async close() { if (opening) { try { (await opening).close(); } finally { opening = null; } } },
  };
}
