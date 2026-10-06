// Двор крепости: большой двор, две башни, ворота и вход в донжон.
import { SceneBuilder } from './scene.js';
import { Rng } from './rng.js';
import { furnish, roomCells } from './furnish.js';
import { person, dialogueFor } from './content.js';
import { makeNpc } from './npc.js';

const SIZES = { small: [34, 24], medium: [40, 28], large: [48, 32] };
export function genYard(spec, plan) {
  const [W0, H0] = SIZES[plan.size], rngBase = new Rng(plan.seed + '/' + spec.id);
  for (let attempt = 0; attempt < 10; attempt++) {
    const rng = rngBase.fork('try' + attempt), W = W0 + rng.int(-2, 6), H = H0 + rng.int(-1, 4), sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: 'fortress', seed: plan.seed });
    const yard = { x: 2, y: 7, w: W - 4, h: H - 9 }, towers = [{ x: 3, y: 2, w: 6, h: 4 }, { x: W - 9, y: 2, w: 6, h: 4 }];
    sb.rect(yard.x, yard.y, yard.w, yard.h); for (const t of towers) sb.rect(t.x, t.y, t.w, t.h);
    // внутренние постройки двора (конюшни, казармы, склады) — глухие блоки, оставляют проходы не уже 3 клеток
    const blocks = []; for (let n = 0, tries = 0; n < rng.int(3, 5) && tries < 80; tries++) {
      const w = rng.int(6, 10), h = rng.int(3, 4), x = rng.int(yard.x + 4, yard.x + yard.w - w - 4), y = rng.int(yard.y + 3, yard.y + yard.h - h - 3);
      if (Math.abs(x + w / 2 - W / 2) < w / 2 + 3 && y < yard.y + 6) continue; // не загораживаем вход в донжон
      if (blocks.every(b => x + w + 3 <= b.x || b.x + b.w + 3 <= x || y + h + 3 <= b.y || b.y + b.h + 3 <= y)) { sb.rect(x, y, w, h, 0); blocks.push({ x, y, w, h }); n++; }
    }
    const gx = Math.floor(W / 2), south = sb.findPortalSpot(gx, H - 1, (x, y, s) => y === H - 2 && s.front[1] === H - 3), keep = sb.findPortalSpot(gx, 6, (x, y, s) => y === 6 && s.front[1] === 7);
    if (!south || !keep) continue;
    sb.anchor = south.front; sb.addPortal(south, spec.parent, 'Ворота наружу', { id: 'gate' }); sb.addPortal(keep, spec.keep, 'Вход в донжон', { id: 'keep' });
    for (const t of towers) { const x = t.x + rng.int(1, t.w - 2); sb.setFloor(x, 6); sb.addDoor(x, 6, undefined, 'Дверь башни'); }
    const ctx = { depth: 1, trapChance: .12 }; furnish(sb, 'courtyard', yard, ctx); furnish(sb, 'armory', towers[0], ctx); furnish(sb, 'guardroom', towers[1], ctx);
    for (const s of [[8, 9], [W - 9, 9], [gx - 6, 12], [gx + 6, 12], [gx, H - 6], [10, H - 5], [W - 10, H - 5]]) sb.light(s[0] + .5, s[1] + .5, { radius: 3.6, power: .6, intensity: 10, distance: 9 });
    for (const t of towers) sb.light(t.x + t.w / 2, t.y + t.h / 2, { radius: 3, power: .5 });
    for (let i = 0; i < 3; i++) { const who = person(rng.fork('g' + i)), n = makeNpc(sb, who, 'guard', dialogueFor(rng.fork('l' + i), 'fortress', who, plan.facts || []), { role: i === 0 ? 'капитан стражи' : 'стражник' }); for (const [x, y] of rng.shuffle(roomCells(sb, yard))) if (sb.put({ ...n, id: 'guard' + i }, x, y)) break; }
    return sb.finish(south.front);
  }
  throw new Error('Не удалось построить двор крепости');
}
