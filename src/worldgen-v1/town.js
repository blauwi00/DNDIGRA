// Город: улицы, площадь, дворы, участки под здания. Здания — «массивы» за стеной улицы; вход — портал в стене, внутрь ведёт отдельная сцена.
import { SceneBuilder, DIRS } from './scene.js';
import { Rng } from './rng.js';
import { mk, atWall, inside, anywhere, stock, roomCells } from './furnish.js';
import { person, dialogueFor, BUILDING_TYPES } from './content.js';
import { makeNpc } from './npc.js';

export const TOWN_SIZES = {
  small: { W: 40, H: 28, side: [2, 2], npcs: 4, parks: 1, cross: 0 },
  medium: { W: 54, H: 36, side: [3, 4], npcs: 8, parks: 2, cross: 1 },
  large: { W: 68, H: 46, side: [5, 6], npcs: 13, parks: 3, cross: 3 },
};
const key = (x, y) => x + ',' + y;

function carveStreets(sb, rng, P) {
  const { W, H } = sb, tw = 3;
  // главная улица: 2–3 участка на разной высоте, соединены вертикальными перемычками
  const segs = rng.int(sb.W >= 54 ? 2 : 1, sb.W >= 54 ? 3 : 2), bounds = [1]; for (let i = 1; i < segs; i++) bounds.push(Math.floor(1 + (W - 2) * i / segs) + rng.int(-3, 3)); bounds.push(W - 1);
  let y = rng.int(Math.floor(H * .38), Math.floor(H * .52)); const ys = [];
  for (let i = 0; i < segs; i++) {
    sb.rect(bounds[i], y, bounds[i + 1] - bounds[i], tw); ys.push(y);
    if (i < segs - 1) { const ny = Math.max(4, Math.min(H - 4 - tw, y + rng.pick([-1, 1]) * rng.int(3, 5))); const x = bounds[i + 1] - 1; sb.rect(x, Math.min(y, ny), tw, Math.abs(ny - y) + tw); y = ny; }
  }
  const mainRows = new Set(); for (let j = 1; j < H - 1; j++) for (let i = 1; i < W - 1; i++) if (sb.isFloor(i, j)) mainRows.add(key(i, j));
  // боковые улицы
  const n = rng.int(...P.side), xs = []; let tries = 0;
  while (xs.length < n && tries++ < 80) { const x = rng.int(5, W - 8); if (xs.every(o => Math.abs(o - x) >= 9)) xs.push(x); }
  const streets = [];
  for (const x of xs) {
    const sw = rng.chance(.5) ? 3 : 2;
    const colRows = []; for (let j = 1; j < H - 1; j++) if (mainRows.has(key(x, j)) && mainRows.has(key(x + sw - 1, j))) colRows.push(j); if (!colRows.length) continue;
    const top = Math.min(...colRows), bot = Math.max(...colRows);
    const up = rng.chance(.85), down = rng.chance(.7) || !up;
    if (up) { const end = rng.int(2, Math.max(2, top - 4)); sb.rect(x, end, sw, top - end + 1); streets.push({ x, y0: end, y1: top, sw, vertical: true }); }
    if (down) { const end = rng.int(Math.min(H - 3, bot + 5), H - 3); sb.rect(x, bot, sw, end - bot + 1); streets.push({ x, y0: bot, y1: end, sw, vertical: true }); }
  }
  // поперечные переулки между боковыми улицами
  for (let c = 0; c < P.cross; c++) {
    const s = rng.pick(streets.filter(s => s.y1 - s.y0 >= 6)); if (!s) continue;
    const yy = rng.int(s.y0 + 2, s.y1 - 3), dir = rng.chance(.5) ? 1 : -1, len = rng.int(5, 9), x0 = dir > 0 ? s.x + s.sw : s.x - len;
    if (x0 < 2 || x0 + len > W - 2) continue; sb.rect(x0, yy, len, 2);
  }
  return { ys, streets, mainRows };
}

function centerOf(sb, rect) { return [rect.x + Math.floor(rect.w / 2), rect.y + Math.floor(rect.h / 2)]; }

function addPlaza(sb, rng, P, ys) {
  const w = sb.W >= 54 ? rng.int(9, 11) : 8, h = sb.W >= 54 ? rng.int(7, 9) : 6, x = Math.floor(sb.W / 2) - Math.floor(w / 2) + rng.int(-4, 4), yMain = ys[Math.floor(ys.length / 2)];
  const y = yMain + 1 - Math.floor(h / 2); const rect = { x: Math.max(2, x), y: Math.max(2, Math.min(sb.H - h - 2, y)), w, h }; sb.rect(rect.x, rect.y, rect.w, rect.h); return rect;
}
function addYards(sb, rng, P, avoid) {
  const yards = [];
  for (let n = 0, tries = 0; n < P.parks && tries < 60; tries++) {
    const w = rng.int(5, 7), h = rng.int(4, 5), x = rng.int(3, sb.W - w - 3), y = rng.int(3, sb.H - h - 3);
    // двор должен примыкать к улице стороной и не накладываться на пол
    let touches = 0, overlap = false; for (let j = y - 1; j <= y + h; j++) for (let i = x - 1; i <= x + w; i++) { const inner = i >= x && i < x + w && j >= y && j < y + h; if (inner && sb.isFloor(i, j)) overlap = true; if (!inner && sb.isFloor(i, j)) touches++; }
    if (overlap || touches < 3 || touches > w + h) continue;
    sb.rect(x, y, w, h); yards.push({ x, y, w, h, kind: n === 0 ? 'park' : rng.pick(['graveyard', 'farm', 'park']) }); n++;
  }
  return yards;
}
function keepLargest(sb, anchor) {
  const seen = new Set(), st = [anchor];
  while (st.length) { const [x, y] = st.pop(), k = key(x, y); if (seen.has(k) || !sb.isFloor(x, y)) continue; seen.add(k); for (const [dx, dy] of DIRS) st.push([x + dx, y + dy]); }
  for (let y = 0; y < sb.H; y++) for (let x = 0; x < sb.W; x++) if (sb.isFloor(x, y) && !seen.has(key(x, y))) sb.setFloor(x, y, 0);
}
// Участок под здание: за дверью на depth клеток вглубь и по 2 в стороны не должно быть пола и чужих участков.
function lotFree(sb, lots, x, y, dx, dy, depth = 4, half = 2) {
  const px = dy ? 1 : 0, py = dx ? 1 : 0, cells = [];
  for (let k = 0; k <= depth; k++) for (let s = -half; s <= half; s++) {
    const cx = x + dx * k + px * s, cy = y + dy * k + py * s; if (!sb.inb(cx, cy) || cx < 1 || cy < 1 || cx > sb.W - 2 || cy > sb.H - 2) return null;
    if (k > 0 && sb.isFloor(cx, cy)) return null; if (lots.has(key(cx, cy))) return null; cells.push(key(cx, cy));
  }
  return cells;
}

export function genTown(plan, tryIndex = 0) {
  const P = TOWN_SIZES[plan.size], rng = new Rng(plan.seed + '/town').fork('try' + tryIndex), sb = new SceneBuilder('town', plan.name, P.W + rng.int(-3, 6), P.H + rng.int(-2, 4), rng, { type: 'town', seed: plan.seed }); // размер каждый раз немного другой
  const { ys, streets } = carveStreets(sb, rng, P);
  const plaza = addPlaza(sb, rng, P, ys), yards = addYards(sb, rng, P);
  const mainY = ys[ys.length - 1]; keepLargest(sb, [plaza.x + 1, plaza.y + 1]);
  sb.anchor = centerOf(sb, plaza);
  const [px, py] = sb.anchor;
  // ворота: восточный конец главной улицы
  const gate = sb.findPortalSpot(sb.W - 1, mainY + 1, (x, y, s) => x === sb.W - 1 && s.front[0] === sb.W - 2); if (!gate) return null;
  sb.addPortal(gate, plan.gateDest, 'Ворота на дорогу', { id: 'gate' });
  // участки и двери зданий
  const lots = new Set(), doors = [], placed = [];
  const sites = []; for (let y = 1; y < sb.H - 1; y++) for (let x = 1; x < sb.W - 1; x++) { const s = sb.doorSpot(x, y); if (!s) continue; const [fx, fy] = s.front, dx = x - fx, dy = y - fy; if (sb.reserved.has(key(fx, fy))) continue; sites.push({ x, y, axis: s.axis, front: s.front, dx, dy }); }
  const inPlaza = (x, y) => x >= plaza.x - 1 && y >= plaza.y - 1 && x < plaza.x + plaza.w + 1 && y < plaza.y + plaza.h + 1;
  const dest = b => b.type === 'tavern' || b.type === 'shop' || b.type === 'alchemist' || b.type === 'library' ? [px, py] : b.type === 'cottage' || b.type === 'guard' ? [sb.W - 3, mainY + 1] : b.type === 'chapel' ? [px, py + 3] : [px + rng.int(-14, 14), py + rng.int(-8, 8)];
  for (const b of plan.buildings) {
    const want = dest(b), pool = rng.shuffle(sites).filter(s => !doors.some(d => Math.hypot(d.x - s.x, d.y - s.y) < 4.5) && !(b.type !== 'tavern' && b.type !== 'shop' && b.type !== 'alchemist' && inPlaza(s.front[0], s.front[1]) && rng.chance(.5)));
    pool.sort((a, c) => Math.hypot(a.x - want[0], a.y - want[1]) - Math.hypot(c.x - want[0], c.y - want[1]) + rng.int(-3, 3));
    for (const s of pool) { const cells = lotFree(sb, lots, s.x, s.y, s.dx, s.dy); if (!cells) continue; cells.forEach(c => lots.add(c)); const spot = { x: s.x, y: s.y, axis: s.axis, front: s.front }; const p = sb.addPortal(spot, b.id, b.name, { id: 'door-' + b.id, building: b.type }); doors.push(p); placed.push(b.id); b.door = [s.x, s.y]; break; }
  }
  // вывески у дверей
  for (const b of plan.buildings) if (b.door && ['tavern', 'smithy', 'alchemist', 'shop', 'library'].includes(b.type)) {
    const [x, y] = b.door, cand = (b.door && [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]).filter(([a, c]) => sb.isWall(a, c) && !sb.props.some(p => p.x === a && p.y === c) && DIRS.some(([dx, dy]) => sb.isFloor(a + dx, c + dy) && !sb.reserved.has(key(a + dx, c + dy))));
    if (cand.length) { const [a, c] = rng.pick(cand); sb.props.push({ id: 'sign-' + b.id, x: a, y: c, type: 'banner', kind: 24, solid: false, name: 'Вывеска: ' + b.name, description: b.name }); }
  }
  // площадь: колодец или фонтан, лотки, лавки, деревья
  const pr = { x: plaza.x + 1, y: plaza.y + 1, w: plaza.w - 2, h: plaza.h - 2 };
  const center = sb.put(mk(sb, rng.chance(.5) ? 'well' : 'fountain'), px, py);
  if (center) center.cat === 'well' && (center.description = 'Колодец в центре площади. Вода холодная и чистая.');
  atWall(sb, plaza, 'stall', plan.size === 'small' ? 2 : 4); atWall(sb, plaza, 'bench', 2); anywhere(sb, pr, 'planter', 2); atWall(sb, plaza, 'signpost', 1);
  atWall(sb, plaza, 'barrel', 2).forEach(p => stock(sb, p, { depth: 0 }, 'storage')); atWall(sb, plaza, 'crate', 2).forEach(p => stock(sb, p, { depth: 0 }, 'storage'));
  // дворы
  for (const y of yards) {
    if (y.kind === 'park') { anywhere(sb, y, 'tree', rng.int(3, 5)); anywhere(sb, y, 'bush', 2); atWall(sb, y, 'bench', 1); }
    if (y.kind === 'graveyard') { anywhere(sb, y, 'gravestone', rng.int(4, 7)); anywhere(sb, y, 'tree', 1); atWall(sb, y, 'bones', 1); }
    if (y.kind === 'farm') { anywhere(sb, y, 'haystack', 2); anywhere(sb, y, 'cart', 1); atWall(sb, y, 'barrel', 2).forEach(p => stock(sb, p, { depth: 0 }, 'camp')); anywhere(sb, y, 'crate', 1).forEach(p => stock(sb, p, { depth: 0 }, 'camp')); }
  }
  // переулки: ящики, бочки, телеги, деревья у стен
  const all = sb.floorCells(); const edge = rng.shuffle(all.filter(([x, y]) => !inPlaza(x, y)));
  let cnt = 0; for (const [x, y] of edge) { if (cnt >= Math.floor(all.length / 55)) break; if (!DIRS.some(([dx, dy]) => !sb.isFloor(x + dx, y + dy))) continue; const k = rng.pick(['crate', 'barrel', 'barrel', 'cart', 'tree', 'bush', 'signpost']); const p = sb.put(mk(sb, k), x, y); if (p) { if (p.container || k === 'crate' || k === 'barrel') stock(sb, p, { depth: 0, trapChance: .05 }, 'storage', { trap: rng.chance(.07) }); cnt++; } }
  // фонари вдоль улиц
  const lampCells = rng.shuffle(all.filter(([x, y]) => Math.hypot(x - px, y - py) > 0)); const lamps = []; const maxL = plan.size === 'small' ? 10 : plan.size === 'medium' ? 16 : 22;
  for (const [x, y] of lampCells) { if (lamps.length >= maxL) break; if (lamps.every(([a, b]) => Math.hypot(a - x, b - y) > 7.5)) lamps.push([x, y]); }
  lamps.forEach(([x, y]) => sb.light(x + .5, y + .5, { radius: 3.4, power: .5, intensity: 10, distance: 9 }));
  sb.light(px + .5, py + .5, { radius: 4, power: .55, intensity: 12, distance: 10 });
  // жители
  const classes = ['fighter', 'rogue', 'wizard', 'cleric'];
  for (let i = 0; i < P.npcs; i++) {
    const g = rng.pick(['male', 'female']), who = person(rng.fork('p' + i), g), kind = rng.pick(['street', 'street', 'street', 'street']);
    const lines = dialogueFor(rng.fork('t' + i), 'street', who, plan.facts || []), n = makeNpc(sb, who, 'house', lines, { classId: i < 2 ? 'fighter' : classes[i % 4], role: i < 2 ? 'стражник' : rng.pick(['прохожий', 'торговец', 'путник', 'ремесленник', 'горожанин']) });
    if (i < 2) n.npc.hands = ['sword', 'empty'];
    const cs = i < 2 ? [[sb.W - 3, mainY], [sb.W - 3, mainY + 2]] : rng.shuffle(all.filter(([x, y]) => !sb.reserved.has(key(x, y))));
    for (const [x, y] of cs) { if (sb.put({ ...n, id: 'npc' + i }, x, y)) break; }
  }
  const scene = sb.finish([px, py + (plaza.h > 4 ? 1 : 0)]);
  scene.gen.placed = placed; scene.gen.plaza = plaza; return scene;
}

