// Подземелье: комнаты, коридоры, двери, ловушки на плитах, лестницы между уровнями.
import { SceneBuilder, DIRS } from './scene.js';
import { Rng } from './rng.js';
import { furnish, roomCells } from './furnish.js';
import { rollTrap } from './content.js';
import { hideKey } from './buildings.js';
import { makeNpc } from './npc.js';
import { person, dialogueFor } from './content.js';

const SIZES = { small: [38, 26, 5, 7], medium: [48, 32, 8, 11], large: [58, 38, 11, 15] };
const key = (x, y) => x + ',' + y;
const overlap = (a, b, m = 2) => a.x - m < b.x + b.w && a.x + a.w + m > b.x && a.y - m < b.y + b.h && a.y + a.h + m > b.y;
const cx = r => Math.floor(r.x + r.w / 2), cy = r => Math.floor(r.y + r.h / 2);
function corridor(sb, a, b, rng) {
  let x = cx(a), y = cy(a); const tx = cx(b), ty = cy(b), horizFirst = rng.chance(.5), cells = [];
  const stepX = () => { while (x !== tx) { x += Math.sign(tx - x); cells.push([x, y]); } }, stepY = () => { while (y !== ty) { y += Math.sign(ty - y); cells.push([x, y]); } };
  horizFirst ? (stepX(), stepY()) : (stepY(), stepX()); cells.forEach(([i, j]) => sb.setFloor(i, j)); return cells;
}
const ROLE_POOL = [['crypt', 3], ['guardroom', 3], ['shrine', 1.5], ['dungeonlib', 1.5], ['camp', 1], ['storage', 2], ['cells', 1.5]];

export function genDungeon(spec, plan) {
  const [W0, H0, n0, n1] = SIZES[plan.size], rngBase = new Rng(plan.seed + '/' + spec.id);
  for (let attempt = 0; attempt < 30; attempt++) {
    const rng = rngBase.fork('try' + attempt), W = W0 + rng.int(-4, 8), H = H0 + rng.int(-3, 6), sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: 'dungeon', level: spec.level, seed: plan.seed }), rooms = [];
    const target = rng.int(n0, n1) + (spec.level > 1 ? 1 : 0);
    for (let t = 0; t < 400 && rooms.length < target; t++) { const w = rng.int(4, 9), h = rng.int(4, 7), r = { x: rng.int(3, W - w - 3), y: rng.int(3, H - h - 3), w, h }; if (rooms.every(o => !overlap(r, o, 2))) rooms.push(r); }
    if (rooms.length < 3) continue;
    rooms.sort((a, b) => a.x - b.x); for (const r of rooms) sb.rect(r.x, r.y, r.w, r.h);
    const links = []; // дерево + петли
    for (let i = 1; i < rooms.length; i++) { const near = rooms.slice(0, i).sort((a, b) => Math.hypot(cx(a) - cx(rooms[i]), cy(a) - cy(rooms[i])) - Math.hypot(cx(b) - cx(rooms[i]), cy(b) - cy(rooms[i])))[0]; links.push([near, rooms[i], corridor(sb, near, rooms[i], rng)]); }
    for (let k = 0; k < Math.floor(rooms.length / 4); k++) { const a = rng.pick(rooms), b = rng.pick(rooms); if (a !== b) links.push([a, b, corridor(sb, a, b, rng)]); }
    // связный пол: все комнаты соединены, но коридоры могли слипнуться с комнатами — проверим связность
    const entryRoom = rooms[0], exitRoom = rooms.slice().sort((a, b) => Math.hypot(cx(b) - cx(entryRoom), cy(b) - cy(entryRoom)) - Math.hypot(cx(a) - cx(entryRoom), cy(a) - cy(entryRoom)))[0];
    // портал вверх
    const inR = (r, [x, y]) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h, oneSide = (x, y) => !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y));
    const up = sb.findPortalSpot(cx(entryRoom), entryRoom.y, (x, y, s) => inR(entryRoom, s.front) && oneSide(x, y)); if (!up) continue;
    sb.anchor = up.front; sb.addPortal(up, spec.up, spec.level === 1 ? 'Выход наружу' : 'Лестница наверх', { id: 'up' });
    let down = null;
    if (spec.down) { down = sb.findPortalSpot(cx(exitRoom), exitRoom.y + exitRoom.h, (x, y, s) => inR(exitRoom, s.front) && oneSide(x, y) && Math.hypot(x - up.x, y - up.y) > 5); if (!down) continue; sb.addPortal(down, spec.down, 'Лестница вниз', { id: 'down' }); }
    // двери там, где коридор входит в комнату
    for (const r of rooms) {
      const ring = []; for (let x = r.x; x < r.x + r.w; x++) { ring.push([x, r.y - 1, 'v']); ring.push([x, r.y + r.h, 'v']); } for (let y = r.y; y < r.y + r.h; y++) { ring.push([r.x - 1, y, 'h']); ring.push([r.x + r.w, y, 'h']); }
      for (const [x, y, o] of ring) {
        if (!sb.isFloor(x, y) || sb.props.some(p => p.x === x && p.y === y) || !rng.chance(.7)) continue;
        // дверь в проёме: по бокам стены, а вдоль прохода пол
        const sideA = o === 'v' ? [x - 1, y] : [x, y - 1], sideB = o === 'v' ? [x + 1, y] : [x, y + 1];
        if (sb.isFloor(...sideA) || sb.isFloor(...sideB)) continue;
        if (sb.props.some(p => Math.abs(p.x - x) + Math.abs(p.y - y) < 2 && p.type === 'door')) continue;
        const d = sb.addDoor(x, y, o === 'v' ? undefined : 'horizontal', 'Дверь'); d.lockable = true; if (rng.chance(.18 + spec.level * .04)) { d.lock = { pickDc: 12 + spec.level, forceDc: 14 + spec.level, key: null, gen: true }; d.name = 'Запертая дверь'; }
      }
    }
    // роли комнат
    const mid = rooms.filter(r => r !== entryRoom && r !== exitRoom), roles = new Map();
    const ctx = { depth: spec.level + (plan.depthBonus || 0), trapChance: .15 + spec.level * .05, vaultKey: spec.vaultKey };
    if (spec.vault) roles.set(exitRoom, 'treasure'); else if (spec.down) roles.set(exitRoom, 'shrine'); else roles.set(exitRoom, 'crypt');
    roles.set(entryRoom, spec.level === 1 ? 'camp' : 'guardroom');
    for (const r of mid) roles.set(r, rng.weighted(ROLE_POOL));
    for (const [r, role] of roles) { try { furnish(sb, role, r, ctx); } catch { /* пропускаем неудачную расстановку */ } }
    // огни: у входа и по комнатам
    for (const r of rooms) sb.light(cx(r) + .5, cy(r) + .5, { radius: 3.2, power: .5, intensity: 8, distance: 7 });
    // ловушки-плиты в коридорах
    sb.traps = []; const corrCells = rng.shuffle(links.flatMap(l => l[2])).filter(([x, y]) => !sb.occ.has(key(x, y)) && !sb.props.some(p => p.x === x && p.y === y) && !sb.reserved.has(key(x, y)) && !rooms.some(r => inR(r, [x, y])) && DIRS.filter(([dx, dy]) => sb.isFloor(x + dx, y + dy)).length === 2);
    const nTraps = Math.min(corrCells.length, rng.int(1, 2 + spec.level + (plan.size === 'large' ? 2 : 0)));
    for (const [x, y] of corrCells.slice(0, nTraps)) { const tr = rollTrap(rng, ctx.depth, ['dart', 'pit', 'fire', 'alarm', 'gas']); sb.traps.push({ id: 'plate' + sb.traps.length + '-' + x + '-' + y, x, y, trap: tr }); }
    // жители подземелья: отшельник или пленник
    if (rng.chance(.7)) { const g = rng.pick(['male', 'female']), who = person(rng.fork('hermit'), g), n = makeNpc(sb, who, 'house', dialogueFor(rng.fork('d'), 'dungeon', who, plan.facts || []), { role: rng.pick(['отшельник', 'искатель', 'пленник', 'бродяга']) }); const rr = rng.pick(mid.length ? mid : rooms); for (const [x, y] of rng.shuffle(roomCells(sb, rr))) if (sb.put({ ...n, id: 'dweller' }, x, y)) break; }
    for (const keyName of spec.keysHere || []) hideKey(sb, keyName);
    const scene = sb.finish(up.front); scene.traps = sb.traps; return scene;
  }
  throw new Error('Не удалось построить подземелье ' + spec.id);
}
