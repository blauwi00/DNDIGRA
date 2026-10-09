// Semantic first: a clearing, one road, a village square, and at most two short side trips.
// Independent random streams keep lazy scene order and serialized plans deterministic.
import { Rng, randomSeed } from './rng.js';
import { person, settlementName } from './content.js';
import { DIRS, SceneBuilder, validateScene as validateBase } from './scene.js';
import { makeNpc } from './npc.js';
import { mk } from './furnish.js';
import { STORY_IDS, storyContent } from './adventure-content.js';
export { randomSeed };

export const GEN_VERSION = 3;
export const SIZES = ['small', 'medium', 'large'];
export function normalizeGen(gen = {}) {
  return { v: GEN_VERSION, seed: String(gen.seed ?? '0'), size: SIZES.includes(gen.size) ? gen.size : 'auto' };
}

const cellKey = (x, y) => `${x},${y}`;
const owner = rng => { const p = person(rng); return { name: p.full, full: p.full, gender: p.gender }; };
function enemy(seed, id, name, x, y, max, ac, visual) {
  const foe = { id, name, kind: 3, x, y, max, ac, visual };
  if (visual === 'bandit') {
    const sb = { rng: new Rng(`${seed}/v3/enemies/${id}`), name: 'Дорога' };
    const n = makeNpc(sb, { full: name, gender: 'male' }, 'guard', [], { classId: 'rogue', role: 'налётчик' }).npc;
    foe.gen = { classId: n.classId, gender: n.gender, look: n.look, hands: ['sword', 'empty'] };
  }
  return foe;
}
const threatVisual = story => ({ mist: 'beast', missing: 'bandit', seal: 'skeleton' }[story.id]);
const sceneName = (id, name) => ({ glade: 'Светлая опушка', road: `Тракт к поселению «${name}»`, settlement: `Поселение «${name}»`, cart: 'Брошенная повозка', ruins: 'Двор старой башни' }[id]);

export function createWorld(seed, size) {
  seed = String(seed);
  const rng = new Rng(`${seed}/v3/plan`), resolved = SIZES.includes(size) ? size : rng.fork('size').pick(['small', 'medium', 'medium', 'large']);
  const name = settlementName(rng.fork('settlement')), crisis = rng.fork('story').pick(STORY_IDS);
  const dimensions = {
    glade: [22 + rng.fork('glade-size').int(0, 2), 18 + rng.fork('glade-height').int(0, 2)],
    road: [26 + rng.fork('road-size').int(0, 3), 18 + rng.fork('road-height').int(0, 2)],
    settlement: [22 + rng.fork('settlement-size').int(0, 3), 18 + rng.fork('settlement-height').int(0, 2)],
    cart: [18 + rng.fork('cart-size').int(0, 2), 16 + rng.fork('cart-height').int(0, 2)],
    ruins: [20 + rng.fork('ruins-size').int(0, 2), 18 + rng.fork('ruins-height').int(0, 2)],
  };
  const gy = Math.floor(dimensions.glade[1] / 2), heroSpawn = [5, gy], trainingSpawn = [8, gy], lossSpawn = [[10, gy - 1], [10, gy + 1]];
  const tutorial = {
    heroSpawn, trainingSpawn, lossSpawn,
    win: { id: 'tutorial-win', scene: 'glade', name: 'Учебный бой', enemies: [enemy(seed, 'tutorial-foe', 'Тренировочный манекен', ...trainingSpawn, 4, 8, 'training')], reward: { xp: 0, gold: 0 } },
    loss: { id: 'tutorial-loss', scene: 'glade', name: 'Нападение на опушке', scriptedLoss: true, enemies: lossSpawn.map(([x, y], i) => enemy(seed, `tutorial-loss-${i + 1}`, 'Налётчик на опушке', x, y, 20, 14, 'bandit')), reward: { xp: 0, gold: 0 } },
  };
  const people = Object.fromEntries(['messenger', 'healer', 'elder'].map(role => [role, owner(rng.fork(role))]));
  const story = storyContent(crisis, name, people, tutorial);
  // The missing-travelers clue names the tower: it must remain visitable at every size.
  const sides = resolved === 'small' && crisis !== 'missing' ? [story.clueScene] : ['cart', 'ruins'];
  const ids = ['glade', 'road', 'settlement', ...sides];
  const scenes = Object.fromEntries(ids.map(id => [id, { kind: id, name: sceneName(id, name), W: dimensions[id][0], H: dimensions[id][1] }]));
  const links = [{ from: 'glade', to: 'road', purpose: 'main' }, { from: 'road', to: 'settlement', purpose: 'main' }, ...ids.filter(id => ['cart', 'ruins'].includes(id)).map(to => ({ from: 'road', to, purpose: to === story.clueScene ? 'clue' : 'optional' }))];
  const plan = { v: GEN_VERSION, seed, size: resolved, name, start: 'glade', story, scenes, links, traveler: rng.fork('traveler-chance').chance(.6) ? owner(rng.fork('traveler')) : null };
  Object.defineProperty(plan, 'cache', { value: new Map(), enumerable: false });
  return plan;
}

function builder(plan, id) {
  const def = plan.scenes[id], rng = new Rng(`${plan.seed}/v3/scenes/${id}`);
  const sb = new SceneBuilder(id, def.name, def.W, def.H, rng, { type: id, seed: plan.seed, planVersion: GEN_VERSION, base: 'grass', wall: id === 'settlement' ? 'timber' : 'rough', storyId: plan.story.id });
  // Open ground with a simple silhouette; no corridor/room carving.
  sb.rect(2, 2, sb.W - 4, sb.H - 4);
  sb.routes = []; sb.regions = []; sb.landmarks = []; sb.arrivals = {};
  return sb;
}

function reserveRect(sb, x, y, w, h) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) sb.reserve(i, j); }

function route(sb, id, from, to, surface = 'dirt') {
  const horizontal = from[1] === to[1], vertical = from[0] === to[0];
  if (!horizontal && !vertical) throw new Error('Маршрут должен идти по прямой: ' + id);
  const cells = [], n = Math.abs(to[0] - from[0]) + Math.abs(to[1] - from[1]);
  for (let i = 0; i <= n; i++) {
    const x = from[0] + Math.sign(to[0] - from[0]) * i, y = from[1] + Math.sign(to[1] - from[1]) * i;
    cells.push([x, y]);
    for (const offset of [-1, 0, 1]) { const a = x + (horizontal ? 0 : offset), b = y + (horizontal ? offset : 0); sb.reserve(a, b); sb.paint(a, b, 1, 1, surface); }
  }
  sb.routes.push({ id, width: 3, cells });
}

function portal(sb, destination, x, y, label) {
  const spot = sb.doorSpot(x, y);
  if (!spot) throw new Error('Нельзя поставить выход ' + sb.id + ' → ' + destination);
  const id = `${sb.id}-to-${destination}`;
  sb.addPortal({ x, y, ...spot }, destination, label, { id, destinationEntry: `${destination}-to-${sb.id}` });
  const [fx, fy] = spot.front, horizontal = spot.axis === 'horizontal';
  const arrivals = [[fx, fy], [fx + (horizontal ? 0 : -1), fy + (horizontal ? -1 : 0)], [fx + (horizontal ? 0 : 1), fy + (horizontal ? 1 : 0)]];
  arrivals.forEach(([a, b]) => sb.reserve(a, b));
  sb.arrivals[id] = arrivals;
  return spot.front;
}

function place(sb, cat, id, x, y, extra = {}, landmark = false) {
  const p = sb.put(mk(sb, cat, { id, ...extra }), x, y);
  if (!p) throw new Error('Не удалось разместить ' + sb.id + '/' + id);
  if (landmark) sb.landmarks.push({ id, name: p.name, x, y });
  return p;
}

function npc(sb, who, storyRole, x, y, lines, extra = {}) {
  const gender = who.gender === 'female', role = { messenger: gender ? 'вестница' : 'вестник', healer: gender ? 'целительница' : 'целитель', elder: 'староста', traveler: gender ? 'путница' : 'путник' }[storyRole];
  const p = makeNpc(sb, who, storyRole === 'healer' ? 'chapel' : 'house', lines, { role, classId: storyRole === 'healer' ? 'cleric' : storyRole === 'messenger' ? 'rogue' : 'fighter' });
  if (!sb.put({ ...p, id: storyRole, storyRole, ...extra }, x, y)) throw new Error('Не удалось разместить NPC ' + storyRole);
}

function container(sb, cat, id, x, y, text, loot, extra = {}) {
  return place(sb, cat, id, x, y, { gen: true, container: true, description: text, loot: { gold: 0, potions: 0, torches: 0, gear: [], ...loot }, ...extra });
}

function borderTrees(sb, count) {
  const candidates = sb.rng.fork('vegetation').shuffle(sb.floorCells().filter(([x, y]) => x <= 3 || y <= 3 || x >= sb.W - 4 || y >= sb.H - 4));
  let placed = 0;
  for (const [x, y] of candidates) {
    if (placed >= count) break;
    // Scene validation requires access beside every solid prop, including
    // scenery. Do not let later vegetation surround a noninteractive tree.
    if (DIRS.some(([dx, dy]) => sb.occ.has(cellKey(x + dx, y + dy)) && sb.freeNeighbors(x + dx, y + dy, [x, y]) < 1)) continue;
    if (sb.put(mk(sb, sb.rng.chance(.8) ? 'tree' : 'bush', { id: 'vegetation-' + placed, interactive: false }), x, y)) placed++;
  }
}

function clearing(plan, sb) {
  const t = plan.story.tutorial, [x, y] = t.heroSpawn;
  sb.anchor = t.heroSpawn;
  reserveRect(sb, 3, y - 2, 10, 5);
  route(sb, 'to-road', [x, y], [sb.W - 3, y]);
  portal(sb, 'road', sb.W - 2, y, 'На тракт — к поселению');
  sb.regions.push({ id: 'training', name: 'Безопасная площадка', x: 3, y: y - 2, w: 10, h: 5 });
  sb.paint(3, y - 2, 10, 5, 'grass');
  routePaint(sb, sb.routes[0], 'dirt');
  npc(sb, plan.story.healer, 'healer', x, y + 3, ['Я собираю травы у опушки. Если станет плохо, здесь можно перевести дух.', plan.story.rescue]);
  npc(sb, plan.story.messenger, 'messenger', 9, y - 3, [plan.story.warning, plan.story.objective], { departure: [sb.W - 3, y] });
  container(sb, 'chest', 'starter-cache', 7, y + 3, 'Дорожный запас целителя. Возьмите зелье и факел: на тракте они могут пригодиться.', { potions: 1, torches: 1 }, { name: 'Дорожный запас' });
  place(sb, 'signpost', 'glade-sign', sb.W - 6, y + 3, { name: 'Указатель на поселение', description: `Тракт ведёт на восток к поселению «${plan.name}».` }, true);
  place(sb, 'tree', 'glade-old-tree', 4, 4, { name: 'Старая сосна', description: 'Отдельная высокая сосна отмечает опушку. От неё легко найти дорожный запас.' }, true);
  borderTrees(sb, 9);
}

function routePaint(sb, path, surface) {
  const horizontal = path.cells[0][1] === path.cells[1][1];
  for (const [x, y] of path.cells) for (const offset of [-1, 0, 1]) sb.paint(x + (horizontal ? 0 : offset), y + (horizontal ? offset : 0), 1, 1, surface);
}

function road(plan, sb) {
  const y = Math.floor(sb.H / 2), x = Math.floor(sb.W / 2);
  sb.anchor = [2, y];
  route(sb, 'main-road', [2, y], [sb.W - 3, y]);
  portal(sb, 'glade', 1, y, 'Назад на опушку');
  portal(sb, 'settlement', sb.W - 2, y, 'В поселение — дальше по тракту');
  if (plan.scenes.cart) { route(sb, 'cart-path', [8, 2], [8, y]); portal(sb, 'cart', 8, 1, 'К повозке — северная тропа'); }
  if (plan.scenes.ruins) { route(sb, 'ruins-path', [sb.W - 9, y], [sb.W - 9, sb.H - 3]); portal(sb, 'ruins', sb.W - 9, sb.H - 2, 'К старой башне — южная тропа'); }
  sb.regions.push({ id: 'road', name: 'Открытый тракт', x: 2, y: y - 2, w: sb.W - 4, h: 5 });
  place(sb, 'signpost', 'road-sign', 5, y - 3, { name: 'Развилка с указателем', description: `На восток: «${plan.name}». ${plan.scenes.cart ? 'На север: стоянка повозок. ' : ''}${plan.scenes.ruins ? 'На юг: старая башня.' : ''}` }, true);
  place(sb, 'tree', 'road-twin-tree', sb.W - 6, 4, { name: 'Дерево у ворот поселения' }, true);
  if (plan.traveler) npc(sb, plan.traveler, 'traveler', 6, y + 3, [plan.story.traveler, 'Я останусь ждать дозор у дороги. Вы идите к колодцу поселения.']);
  container(sb, 'crate', 'road-supplies', 5, y + 4, 'Ящик дорожного дозора. Небольшой запас оставлен путникам.', { gold: sb.rng.fork('loot').int(1, 3), torches: 1 });
  reserveRect(sb, x - 1, y - 1, 3, 3);
  sb.encounters.push({ id: 'road-threat', name: plan.story.roadThreat, x, y, radius: 3, trigger: 'approach', enemies: [enemy(plan.seed, 'road-foe', plan.story.roadEnemy, x, y, 8, 11, threatVisual(plan.story))], reward: { xp: 25, gold: 5 } });
  borderTrees(sb, 10);
}

function settlement(plan, sb) {
  const y = Math.floor(sb.H / 2), x = Math.floor(sb.W / 2);
  sb.anchor = [2, y];
  route(sb, 'village-road', [2, y], [sb.W - 3, y], 'cobble');
  portal(sb, 'road', 1, y, 'На тракт — к опушке');
  sb.regions.push({ id: 'square', name: 'Площадь у колодца', x: x - 3, y: y - 3, w: 7, h: 7 }, { id: 'market', name: 'Дорожный торг', x: 3, y: 3, w: 5, h: 4 });
  sb.paint(x - 3, y - 3, 7, 7, 'flagstone');
  routePaint(sb, sb.routes[0], 'cobble');
  place(sb, 'well', 'village-well', x, y - 3, { name: 'Колодец поселения', description: 'Центр поселения: здесь ждут вести с дороги и собирают дозор.' }, true);
  npc(sb, plan.story.elder, 'elder', x + 2, y - 3, [plan.story.problem, plan.story.objective, plan.story.report]);
  place(sb, 'stall', 'village-market', 5, 4, { name: 'Дорожный торг', description: 'Торговый навес у главной площади. На время тревоги товары убраны.' }, true);
  place(sb, 'hearth', 'village-hearth', sb.W - 6, y + 4, { name: 'Общий очаг', description: 'Жители поддерживают огонь для дозора и вернувшихся путников.' });
  place(sb, 'bench', 'village-bench', x - 3, y + 3);
  place(sb, 'signpost', 'village-sign', 4, y + 3, { name: 'Доска дорожного дозора', description: plan.story.objective });
  borderTrees(sb, 6);
}

function sidePlace(plan, sb) {
  const ruins = sb.id === 'ruins', x = Math.floor(sb.W / 2), y = Math.floor(sb.H / 2);
  sb.anchor = ruins ? [x, 2] : [x, sb.H - 3];
  route(sb, 'short-side-path', [x, 2], [x, sb.H - 3], ruins ? 'gravel' : 'dirt');
  portal(sb, 'road', x, ruins ? 1 : sb.H - 2, 'Назад на тракт');
  sb.regions.push({ id: ruins ? 'ruin-court' : 'cart-stop', name: ruins ? 'Открытый двор башни' : 'Стоянка у повозки', x: 3, y: 3, w: sb.W - 6, h: sb.H - 6 });
  if (ruins) {
    sb.paint(3, 3, sb.W - 6, sb.H - 6, 'moss');
    routePaint(sb, sb.routes[0], 'gravel');
    place(sb, 'statue', 'ruins-marker', x - 3, y, { name: 'Статуя у старой башни', description: plan.story.ruinsDescription }, true);
    place(sb, 'altar', 'broken-seal', x + 3, y - 2, { name: plan.story.id === 'seal' ? 'Разбитая печать' : 'Старая каменная чаша', description: plan.story.ruinsDescription }, true);
    if (plan.story.id !== 'seal') {
      const ey = sb.H - 5;
      reserveRect(sb, x - 1, ey - 1, 3, 3);
      sb.encounters.push({ id: 'ruins-threat', name: plan.story.ruinsThreat, x, y: ey, radius: 2, trigger: 'approach', enemies: [enemy(plan.seed, 'ruins-foe', plan.story.ruinsEnemy, x, ey, 6, 10, threatVisual(plan.story))], reward: { xp: 15, gold: 3 } });
    }
  } else {
    place(sb, 'cart', 'abandoned-cart', x - 3, y, { name: 'Брошенная повозка', description: plan.story.cartDescription }, true);
    place(sb, 'haystack', 'cart-hay', x + 3, y - 3);
  }
  const clue = plan.story.clueScene === sb.id;
  container(sb, 'chest', clue ? plan.story.clueProp : `${sb.id}-cache`, x + 3, y + 1, clue ? plan.story.clue : 'Небольшой запас, оставшийся у дороги.', { gold: sb.rng.fork('loot').int(2, 6), potions: 1 }, { name: clue ? plan.story.clueName : 'Дорожный тайник', ...(clue ? { storyRole: 'clue', storyId: plan.story.id, loot: {} } : {}) });
  borderTrees(sb, ruins ? 5 : 7);
}

export function generateScene(plan, id) {
  if (plan.cache?.has(id)) return plan.cache.get(id);
  if (!plan.scenes[id]) throw new Error('Неизвестная сцена ' + id);
  const sb = builder(plan, id);
  if (id === 'glade') clearing(plan, sb);
  else if (id === 'road') road(plan, sb);
  else if (id === 'settlement') settlement(plan, sb);
  else sidePlace(plan, sb);
  const scene = sb.finish(sb.anchor);
  Object.assign(scene, { outdoor: true, arrivals: sb.arrivals, regions: sb.regions, landmarks: sb.landmarks, mainRoute: sb.routes });
  if (id === 'glade') { scene.trainingSpawn = [plan.story.tutorial.trainingSpawn]; scene.enemySpawn = plan.story.tutorial.lossSpawn; }
  const errors = validateScene(scene);
  if (errors.length) throw new Error(`Сцена ${id}: ${errors.join('; ')}`);
  plan.cache?.set(id, scene);
  return scene;
}

export const sceneIds = plan => Object.keys(plan.scenes);
export const isGeneratedId = (plan, id) => Object.hasOwn(plan.scenes, id);
export const exits = scene => [...new Set(scene.props.filter(p => p.type === 'portal').map(p => p.destination))];
export function validateScene(scene) {
  const errors = validateBase(scene);
  const blocked = new Set(scene.props.filter(p => p.solid !== false && !['door', 'portal', 'torch', 'chandelier', 'clue', 'trap'].includes(p.type)).map(p => cellKey(p.x, p.y)));
  const free = (x, y) => scene.tiles[y]?.[x] === 'floor' && !blocked.has(cellKey(x, y));
  for (const [id, arrivals] of Object.entries(scene.arrivals || {})) {
    if (!scene.props.some(p => p.id === id && p.type === 'portal')) errors.push('Прибытие без выхода: ' + id);
    for (const cell of arrivals) if (!Array.isArray(cell) || cell.length !== 2 || !cell.every(Number.isInteger) || !free(...cell)) errors.push('Занятая точка прибытия: ' + id);
  }
  for (const encounter of scene.encounters || []) {
    for (const foe of encounter.enemies) if (!free(foe.x, foe.y)) errors.push('Враг вне свободного пола: ' + foe.id);
    for (const arrivals of Object.values(scene.arrivals || {})) for (const [x, y] of arrivals) if (Math.abs(x - encounter.x) + Math.abs(y - encounter.y) <= encounter.radius) errors.push('Бой на точке прибытия: ' + encounter.id);
  }
  return errors;
}

export function gmBrief(plan) {
  return { version: plan.v, settlement: plan.name, size: plan.size, places: sceneIds(plan).map(id => ({ id, type: plan.scenes[id].kind, name: plan.scenes[id].name })), outside: { road: 'road', dungeon: null, fortress: null }, publicFacts: [plan.story.problem, plan.story.objective] };
}
export function npcBrief(scene, prop) {
  const n = prop.npc;
  return { id: prop.id, scene: scene.id, place: scene.name, name: prop.name, role: n.role, gender: n.gender, class: n.classId, persona: n.persona, fallbackLines: n.lines };
}
