// Окрестности: органичная местность (клеточный автомат), дорога, поляны, лагерь. Вход в подземелья и крепость.
import { SceneBuilder, DIRS } from './scene.js';
import { Rng } from './rng.js';
import { mk, atWall, anywhere, stock, furnish } from './furnish.js';
import { person, dialogueFor } from './content.js';
import { makeNpc } from './npc.js';

const SIZES = { small: [44, 30], medium: [56, 38], large: [70, 46] };
const key = (x, y) => x + ',' + y;
function walk(sb, rng, x0, y0, x1, y1, th = 3) {
  let x = x0, y = y0; const stamp = (a, b) => { for (let j = 0; j < th; j++) for (let i = 0; i < th; i++) { const px = a + i - 1, py = b + j - 1; if (px >= 2 && py >= 2 && px < sb.W - 2 && py < sb.H - 2) sb.setFloor(px, py); } };
  stamp(x, y);
  for (let guard = 0; guard < 2000 && (x !== x1 || y !== y1); guard++) { const dx = x1 - x, dy = y1 - y, horiz = Math.abs(dx) > Math.abs(dy) ? rng.chance(.8) : rng.chance(.25); if (horiz && dx) x += Math.sign(dx); else if (dy) y += Math.sign(dy); else x += Math.sign(dx); if (rng.chance(.18)) y += rng.pick([-1, 1]); y = Math.max(3, Math.min(sb.H - 4, y)); stamp(x, y); }
}
export function genOutskirts(spec, plan) {
  const [W0, H0] = SIZES[plan.size], rngBase = new Rng(plan.seed + '/' + spec.id);
  for (let attempt = 0; attempt < 20; attempt++) {
    const rng = rngBase.fork('try' + attempt), W = W0 + rng.int(-4, 8), H = H0 + rng.int(-3, 6), sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: 'outskirts', seed: plan.seed });
    // клеточный автомат
    let g = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_, x) => x > 2 && y > 2 && x < W - 3 && y < H - 3 && rng.chance(.55) ? 1 : 0));
    for (let it = 0; it < 4; it++) g = g.map((row, y) => row.map((_, x) => { let n = 0; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (g[y + j]?.[x + i]) n++; return x > 2 && y > 2 && x < W - 3 && y < H - 3 && n >= 5 ? 1 : 0; }));
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x]) sb.setFloor(x, y);
    // площадки у входов и дорога между ними
    const pads = spec.links.map(l => { const px = l.side === 'west' ? 4 : l.side === 'east' ? W - 5 : Math.floor(W * l.at); const py = l.side === 'north' ? 4 : l.side === 'south' ? H - 5 : Math.floor(H * l.at); return { ...l, px, py }; });
    for (const p of pads) sb.rect(p.px - 1, p.py - 1, 3, 3);
    for (let i = 1; i < pads.length; i++) walk(sb, rng, pads[0].px, pads[0].py, pads[i].px, pads[i].py, 3);
    const mid = [Math.floor(W / 2) + rng.int(-6, 6), Math.floor(H / 2) + rng.int(-5, 5)];
    walk(sb, rng, pads[0].px, pads[0].py, mid[0], mid[1], 3); if (pads[1]) walk(sb, rng, mid[0], mid[1], pads[1].px, pads[1].py, 3);
    // оставляем наибольшую связную область
    const seen = new Set(), comps = []; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if (!sb.isFloor(x, y) || seen.has(key(x, y))) continue; const comp = [], st = [[x, y]]; while (st.length) { const [a, b] = st.pop(), k = key(a, b); if (seen.has(k) || !sb.isFloor(a, b)) continue; seen.add(k); comp.push([a, b]); for (const [dx, dy] of DIRS) st.push([a + dx, b + dy]); } comps.push(comp); }
    comps.sort((a, b) => b.length - a.length); for (const c of comps.slice(1)) for (const [x, y] of c) sb.setFloor(x, y, 0);
    if (comps[0].length < W * H * .22) continue;
    // порталы
    let ok = true; const spots = [];
    for (const p of pads) {
      const spot = sb.findPortalSpot(p.side === 'east' ? W - 1 : p.side === 'west' ? 0 : p.px, p.side === 'north' ? 0 : p.side === 'south' ? H - 1 : p.py, (x, y, s) => Math.hypot(x - p.px, y - p.py) < 6 && !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y)));
      if (!spot) { ok = false; break; } sb.addPortal(spot, p.dest, p.label, { id: 'to-' + p.dest.replace(/[^a-z0-9]/g, '-') }); spots.push(spot);
    }
    if (!ok) continue;
    sb.anchor = spots[0].front;
    // лагерь на поляне и святилище
    const cells = sb.floorCells(); const open = cells.filter(([x, y]) => { for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (!sb.isFloor(x + i, y + j)) return false; return true; });
    const far = (c, others) => others.every(o => Math.hypot(o[0] - c[0], o[1] - c[1]) > 10);
    const pick = rng.shuffle(open).filter(c => far(c, spots.map(s => s.front))); const camp = pick[0], shrine = pick.find(c => camp && Math.hypot(c[0] - camp[0], c[1] - camp[1]) > 10);
    const ctx = { depth: 0, trapChance: .1 };
    if (camp) { furnish(sb, 'camp', { x: camp[0] - 2, y: camp[1] - 2, w: 5, h: 5 }, ctx); sb.light(camp[0] + .5, camp[1] + .5, { radius: 3.6, power: .65, intensity: 11, distance: 9 }); const g1 = rng.pick(['male', 'female']), who = person(rng.fork('camper'), g1), n = makeNpc(sb, who, 'cottage', dialogueFor(rng.fork('c'), 'outskirts', who, plan.facts || []), { role: rng.pick(['путник', 'охотник', 'торговец', 'паломник']), classId: rng.pick(['rogue', 'fighter', 'cleric']) }); for (const [x, y] of sb.nearestFree(camp[0], camp[1] + 3, 12)) if (sb.put({ ...n, id: 'camper' }, x, y)) break; }
    if (shrine) furnish(sb, 'shrine', { x: shrine[0] - 2, y: shrine[1] - 2, w: 5, h: 5 }, ctx);
    // деревья и кусты
    const maxTrees = Math.floor(cells.length / 14); let t = 0;
    for (const [x, y] of rng.shuffle(cells)) { if (t >= maxTrees) break; if (sb.put(mk(sb, rng.chance(.78) ? 'tree' : 'bush'), x, y)) t++; }
    for (let i = 0; i < Math.floor(cells.length / 90); i++) { const [x, y] = rng.pick(cells); const k = rng.pick(['bones', 'crate', 'barrel', 'haystack']); const p = sb.put(mk(sb, k), x, y); if (p && (k === 'crate' || k === 'barrel')) stock(sb, p, ctx, 'camp', { trap: rng.chance(.1) }); }
    // фонари у входов
    for (const s of spots) sb.light(s.front[0] + .5, s.front[1] + .5, { radius: 3.4, power: .55, intensity: 9, distance: 8 });
    return sb.finish(spots[0].front);
  }
  throw new Error('Не удалось построить окрестности');
}

