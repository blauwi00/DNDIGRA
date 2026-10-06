// Интерьеры зданий: комнаты по BSP, двери между ними, вход с улицы, лестницы в подвал и на второй этаж.
import { SceneBuilder, DIRS } from './scene.js';
import { furnish, roomCells } from './furnish.js';
import { Rng } from './rng.js';
import { dialogueFor, BUILDING_TYPES } from './content.js';
import { makeNpc } from './npc.js';

const SIZES = { keep: [16, 20, 11, 14], lordhall: [14, 18, 9, 11], house: [7, 10, 6, 8], cottage: [6, 7, 5, 6], tavern: [13, 16, 9, 11], smithy: [9, 11, 7, 8], alchemist: [8, 10, 6, 7], shop: [8, 10, 6, 8], chapel: [9, 12, 8, 10], guard: [10, 12, 7, 9], warehouse: [11, 14, 8, 10], library: [9, 12, 7, 8] };
const ROLES = { keep: ['greathall', 'guardroom', 'armory', 'kitchen', 'storage', 'library'], lordhall: ['lord', 'bedroom', 'treasure', 'library', 'bedroom'], house: ['living', 'bedroom', 'kitchen'], cottage: ['living', 'bedroom'], tavern: ['hall', 'kitchen', 'storage'], smithy: ['smithy', 'storage'], alchemist: ['alchemy', 'living'], shop: ['shop', 'storage'], chapel: ['chapel', 'storage'], guard: ['guard', 'cells', 'armory'], warehouse: ['warehouse', 'storage'], library: ['library', 'living'] };
export const sizeOf = type => SIZES[type] || SIZES.house;

// Делит прямоугольник на n комнат разделительными линиями в 1 клетку. Возвращает листья и разрезы.
export function partition(rng, rect, n, minW = 3, minH = 3) {
  const leaves = [{ ...rect }], splits = []; let guard = 0;
  while (leaves.length < n && guard++ < 80) {
    leaves.sort((a, b) => b.w * b.h - a.w * a.h);
    const L = leaves.find(l => l.w >= minW * 2 + 1 || l.h >= minH * 2 + 1); if (!L) break;
    const canV = L.w >= minW * 2 + 1, canH = L.h >= minH * 2 + 1, vertical = canV && (!canH || (L.w / L.h > 1 ? rng.chance(.8) : rng.chance(.25)));
    if (vertical) { const c = rng.int(minW, L.w - minW - 1); leaves.splice(leaves.indexOf(L), 1, { x: L.x, y: L.y, w: c, h: L.h }, { x: L.x + c + 1, y: L.y, w: L.w - c - 1, h: L.h }); splits.push({ vertical: true, g: L.x + c, a: L.y, b: L.y + L.h - 1 }); }
    else { const c = rng.int(minH, L.h - minH - 1); leaves.splice(leaves.indexOf(L), 1, { x: L.x, y: L.y, w: L.w, h: c }, { x: L.x, y: L.y + c + 1, w: L.w, h: L.h - c - 1 }); splits.push({ vertical: false, g: L.y + c, a: L.x, b: L.x + L.w - 1 }); }
  }
  return { leaves, splits };
}
// Прорезает двери в разрезах. Возвращает false, если где-то негде поставить дверь.
export function cutDoors(sb, splits, doorOpts = () => ({})) {
  const doors = [];
  for (const s of splits) {
    const cand = [];
    for (let t = s.a; t <= s.b; t++) {
      const [x, y] = s.vertical ? [s.g, t] : [t, s.g], f1 = s.vertical ? sb.isFloor(x - 1, y) : sb.isFloor(x, y - 1), f2 = s.vertical ? sb.isFloor(x + 1, y) : sb.isFloor(x, y + 1);
      const n1 = s.vertical ? sb.isFloor(x, y - 1) : sb.isFloor(x - 1, y), n2 = s.vertical ? sb.isFloor(x, y + 1) : sb.isFloor(x + 1, y);
      if (f1 && f2 && !n1 && !n2) cand.push([x, y]);
    }
    if (!cand.length) return null;
    const [x, y] = sb.rng.pick(cand); sb.setFloor(x, y); doors.push({ x, y, axis: s.vertical ? 'horizontal' : undefined });
  }
  return doors;
}
const oneSide = (sb, x, y) => !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y));
const inRect = (r, [x, y]) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;

function lightRooms(sb, rooms) { for (const r of rooms) { const a = r.w * r.h, n = a >= 36 ? 3 : a >= 20 ? 2 : 1; for (let i = 0; i < n; i++) sb.light(r.x + (i + 1) * r.w / (n + 1), r.y + (i % 2 ? .35 : .65) * r.h, { radius: 3.3, power: .55 }); } }

export function genBuilding(spec, plan) {
  const rngBase = new Rng(plan.seed + '/' + spec.id);
  for (let attempt = 0; attempt < 24; attempt++) {
    const rng = rngBase.fork('try' + attempt), [w0, w1, h0, h1] = spec.dims || sizeOf(spec.type), w = rng.int(w0, w1), h = rng.int(h0, h1), W = w + 2, H = h + 2;
    const sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: spec.type, building: spec.id, seed: plan.seed });
    const roles = spec.roles || ROLES[spec.type] || ['living'], { leaves, splits } = partition(rng, { x: 1, y: 1, w, h }, roles.length);
    for (const l of leaves) sb.rect(l.x, l.y, l.w, l.h);
    const doors = cutDoors(sb, splits); if (!doors) continue;
    // главная комната — самая большая из касающихся южной стены
    const south = leaves.filter(l => l.y + l.h === h + 1).sort((a, b) => b.w * b.h - a.w * a.h), main = south[0] || leaves[0];
    const rooms = new Map([[main, roles[0]]]); const rest = leaves.filter(l => l !== main).sort((a, b) => b.w * b.h - a.w * a.h); rest.forEach((l, i) => rooms.set(l, roles[i + 1] || 'storage'));
    // вход
    const xs = []; for (let x = main.x + (main.w > 2 ? 1 : 0); x < main.x + main.w - (main.w > 2 ? 1 : 0); x++) xs.push(x);
    let entry = null; for (const x of rng.shuffle(xs)) { const s = sb.doorSpot(x, H - 1); if (s) { entry = { x, y: H - 1, ...s }; break; } }
    if (!entry) continue;
    sb.anchor = entry.front;
    sb.addPortal(entry, spec.parent, spec.exitLabel || 'Выход на улицу', { id: 'exit' });
    for (const d of doors) { const dr = sb.addDoor(d.x, d.y, d.axis, 'Дверь'); dr.lockable = true; }
    // лестницы: подвал — в кухне/кладовой/главной, второй этаж — в главной
    const stairs = (dest, label, room, id) => {
      const spot = sb.findPortalSpot(room.x + room.w / 2, room.y + room.h / 2, (x, y, s) => inRect(room, s.front) && y !== H - 1 && oneSide(sb, x, y));
      if (!spot) return false; sb.addPortal(spot, dest, label, { id }); return true;
    };
    const roomOf = role => [...rooms].find(([, r]) => r === role)?.[0];
    if (spec.cellar && !stairs(spec.cellar, 'Лестница в подвал', roomOf('kitchen') || roomOf('storage') || roomOf('living') || main, 'stairs-down')) continue;
    if (spec.up && !stairs(spec.up, 'Лестница наверх', main, 'stairs-up')) continue;
    // дверь в «тайную» комнату запирают: отмычки/сила, ключ не обязателен
    if (spec.lockRoom) { const dd = sb.props.filter(p => p.type === 'door' && p.lockable); const d = dd[dd.length - 1]; if (d && dd.length > 1) d.lock = { pickDc: 12 + (plan.depthBonus || 0), forceDc: 14, key: spec.lockKey || null, gen: true }, d.name = 'Запертая дверь'; }
    const ctx = { depth: spec.depth || 0, trapChance: spec.trapChance ?? .08, vaultKey: spec.vaultKey };
    for (const [l, role] of rooms) furnish(sb, role, l, ctx);
    lightRooms(sb, rooms.keys());
    // жители
    const lines = dialogueFor(rng.fork('talk'), spec.type, spec.owner, spec.facts || [], spec.topic);
    const cells = roomCells(sb, main).filter(([x, y]) => Math.abs(x - entry.x) + Math.abs(y - entry.y) > 2);
    if (spec.owner) { const npcSpec = makeNpc(sb, spec.owner, spec.type, lines); for (const [x, y] of rng.shuffle(cells)) { if (sb.put({ ...npcSpec, id: 'owner' }, x, y)) break; } }
    for (let i = 0; i < (spec.extraNpcs || 0); i++) { const g = rng.pick(['male', 'female']), p = { first: 'Гость', genitive: 'Гостя', full: spec.guestNames?.[i] || 'Гость', gender: g }, n = makeNpc(sb, p, 'house', dialogueFor(rng.fork('g' + i), 'house', p, spec.facts || []), { role: 'посетитель' }); for (const [x, y] of rng.shuffle(cells)) if (sb.put({ ...n, id: 'guest' + i }, x, y)) break; }
    // ключи, спрятанные в контейнерах
    for (const key of spec.keysHere || []) hideKey(sb, key);
    // окна
    addWindows(sb, rng, Math.max(1, Math.floor((w + h) / 6)));
    return sb.finish([entry.front[0], entry.front[1]]);
  }
  throw new Error('Не удалось построить здание ' + spec.id);
}

export function hideKey(sb, key) {
  const cs = sb.props.filter(p => p.container && p.loot && !p.lock);
  const c = sb.rng.pick(cs.length ? cs : [null]);
  if (c) { c.loot.gear.push(key); return true; }
  for (const [x, y] of sb.rng.shuffle(sb.floorCells())) { const p = sb.put({ type: 'crate', kind: 24, name: 'Ящик', cat: 'crate', description: 'Ящик с отметками мелом.', gen: true, container: true, loot: { gold: 0, potions: 0, torches: 0, gear: [key] } }, x, y); if (p) return true; }
  return false;
}
export function addWindows(sb, rng, n) {
  const used = new Set(sb.props.map(p => p.x + ',' + p.y)); let placed = 0;
  const cand = []; for (let y = 0; y < sb.H; y++) for (let x = 0; x < sb.W; x++) if (sb.isWall(x, y) && !used.has(x + ',' + y) && (x === 0 || y === 0 || x === sb.W - 1 || y === sb.H - 1) && DIRS.some(([dx, dy]) => sb.isFloor(x + dx, y + dy) && !sb.occ.has((x + dx) + ',' + (y + dy)))) cand.push([x, y]);
  for (const [x, y] of rng.shuffle(cand)) { if (placed >= n) break; if (sb.props.some(p => p.solid === false && Math.abs(p.x - x) + Math.abs(p.y - y) < 3)) continue; sb.props.push({ id: sb.nid('window'), x, y, kind: 22, name: 'Окно', type: 'decor', solid: false }); placed++; }
}

// Подвал: 1–3 комнаты, лестница вверх, бочки, ящики, иногда тайник.
export function genCellar(spec, plan) {
  const rngBase = new Rng(plan.seed + '/' + spec.id);
  for (let attempt = 0; attempt < 24; attempt++) {
    const rng = rngBase.fork('try' + attempt), w = rng.int(8, 12), h = rng.int(6, 9), n = rng.int(1, 3), W = w + 2, H = h + 2;
    const sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: 'cellar', building: spec.parent, seed: plan.seed });
    const { leaves, splits } = partition(rng, { x: 1, y: 1, w, h }, n); for (const l of leaves) sb.rect(l.x, l.y, l.w, l.h);
    const doors = cutDoors(sb, splits); if (!doors) continue;
    const main = leaves.slice().sort((a, b) => b.w * b.h - a.w * a.h)[0];
    const spot = sb.findPortalSpot(main.x + main.w / 2, main.y, (x, y, s) => inRect(main, s.front) && oneSide(sb, x, y)); if (!spot) continue;
    sb.anchor = spot.front; sb.addPortal(spot, spec.parent, 'Лестница наверх', { id: 'stairs-up' });
    for (const d of doors) sb.addDoor(d.x, d.y, d.axis, 'Дверь');
    const ctx = { depth: 1, trapChance: .18, vaultKey: spec.vaultKey };
    leaves.forEach((l, i) => furnish(sb, i === 0 && spec.stash ? 'storage' : 'cellar', l, ctx));
    if (spec.stash) { // тайник: запертый сундук с хорошей добычей, ключ лежит в другом месте мира
      const room = leaves[leaves.length - 1], chest = sb.rng.chance(.5) ? null : null; void chest;
      const c = [...roomCells(sb, room)].sort(() => rng.next() - .5).map(([x, y]) => sb.put({ type: 'chest', kind: 17, name: 'Тайник', cat: 'chest', description: 'Сундук задвинут в самый тёмный угол.', rot: 0 }, x, y)).find(Boolean);
      if (c) { c.gen = true; c.container = true; c.loot = { gold: rng.int(30, 70), potions: 1, torches: 0, gear: [] }; c.lock = { pickDc: 14, forceDc: 16, key: spec.stash.key }; c.trap = { kind: 'needle', name: 'Ядовитая игла', save: 'con', dc: 13, detectDc: 13, disarmDc: 13, dice: 1, sides: 4, poison: true, alarm: false, text: 'Из замка выскакивает игла с ядом.', hint: 'Рядом с замочной скважиной виден крошечный прокол.' }; c.description += ' Заперт.'; }
    }
    lightRooms(sb, leaves);
    for (const key of spec.keysHere || []) hideKey(sb, key);
    return sb.finish(spot.front);
  }
  throw new Error('Не удалось построить подвал ' + spec.id);
}

// Второй этаж таверны: коридор и комнаты для постояльцев.
export function genUpper(spec, plan) {
  const rngBase = new Rng(plan.seed + '/' + spec.id);
  for (let attempt = 0; attempt < 24; attempt++) {
    const rng = rngBase.fork('try' + attempt), cols = rng.int(2, 4), cw = rng.int(4, 5), w = cols * (cw + 1) - 1, W = w + 2, H = 1 + 4 + 1 + 2 + 1 + 4 + 1;
    const sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: 'upper', building: spec.parent, seed: plan.seed });
    sb.rect(1, 6, w, 2); // коридор
    const rooms = [];
    for (let c = 0; c < cols; c++) { const x = 1 + c * (cw + 1); for (const [y, h] of [[1, 4], [9, 4]]) { if (!rng.chance(c === 0 || y === 1 ? .95 : .8)) continue; sb.rect(x, y, cw, h); rooms.push({ x, y, w: cw, h }); } }
    for (const r of rooms) { const dx = rng.int(r.x + 1, r.x + r.w - 2), dy = r.y < 6 ? 5 : 8; if (sb.isFloor(dx, dy - (r.y < 6 ? 0 : 0))) continue; sb.setFloor(dx, dy); if (!sb.isFloor(dx, dy + (r.y < 6 ? 1 : -1))) { sb.setFloor(dx, dy, 0); continue; } r.door = [dx, dy]; }
    const valid = rooms.filter(r => r.door); if (!valid.length) continue;
    const spot = sb.findPortalSpot(1, 6.5, (x, y, s) => x === 0 && s.front[0] === 1 && s.front[1] >= 6 && s.front[1] <= 7);
    if (!spot) continue; sb.anchor = spot.front; sb.addPortal(spot, spec.parent, 'Лестница вниз', { id: 'stairs-down' });
    for (const r of valid) sb.addDoor(r.door[0], r.door[1], undefined, 'Дверь комнаты', { lockable: true });
    for (const r of rooms.filter(r => !r.door)) for (let j = r.y; j < r.y + r.h; j++) for (let i = r.x; i < r.x + r.w; i++) sb.setFloor(i, j, 0);
    const ctx = { depth: 0, trapChance: .1 };
    for (const r of valid) { furnish(sb, 'bedroom', r, ctx); }
    sb.rect(0, 0, 0, 0); const cor = { x: 1, y: 6, w, h: 2 }; sb.put({ type: 'planter', kind: 24, name: 'Кадка с растением', description: 'Растение давно просит воды.', cat: 'planter' }, w, 6) || null; void cor;
    lightRooms(sb, [...valid, { x: 1, y: 6, w, h: 2 }]);
    const doors = sb.props.filter(p => p.type === 'door'); if (doors.length > 1 && spec.lockRoom) { const d = doors[rng.int(0, doors.length - 1)]; d.lock = { pickDc: 12, forceDc: 14, key: null, gen: true }; d.name = 'Запертая дверь'; }
    for (const key of spec.keysHere || []) hideKey(sb, key);
    return sb.finish(spot.front);
  }
  throw new Error('Не удалось построить этаж ' + spec.id);
}
