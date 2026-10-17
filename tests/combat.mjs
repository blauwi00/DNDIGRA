// Проверка боёвки: бестиарий, построение встреч, поведение ИИ врагов и симулированные бои на сгенерированных картах.
import assert from 'node:assert/strict';
import { MONSTERS, THRESH, MULT, DIFFICULTY, THEMES, buildEncounter, placeEncounter, adjustedXp } from '../src/combat/bestiary.js';
import { BEASTS, beastBoxes } from '../src/combat/beasts.js';
import { decide, reach } from '../src/combat/ai.js';
import * as Characters from '../src/characters.js';
import { createWorld, generateScene } from '../src/worldgen/world.js';
import { Rng } from '../src/worldgen/rng.js';
import { parseDiceTest } from './combat-helpers.mjs';

// ——— бестиарий ———
const XP = { .125: 25, .25: 50, 1: 200, 2: 450, 3: 700 };
for (const [kind, m] of Object.entries(MONSTERS)) {
  assert.ok(m.hp > 0 && m.ac >= 5 && m.ac <= 20 && m.speed >= 4 && m.speed <= 10, kind + ': характеристики');
  assert.equal(m.xp, XP[m.cr], kind + ': опыт не соответствует уровню опасности');
  assert.ok(m.attacks.length && m.attacks.every(a => a.name && a.bonus >= 0 && parseDiceTest(a.dice)), kind + ': атаки');
  assert.ok(m.attacks.every(a => a.ranged ? a.range >= 2 : a.reach >= 1), kind + ': дальность/досягаемость');
  assert.ok(['melee', 'ranged', 'skirmish', 'caster', 'boss', 'hunter', 'swarm', 'ambush'].includes(m.ai), kind + ': ИИ');
  assert.ok(!!m.look !== !!m.beast, kind + ': нужна либо внешность, либо модель зверя');
  if (m.look) { const sp = Characters.spec(Characters.CLASS_KIND[m.look.classId], { gen: m.look }), boxes = Characters.build(sp); assert.ok(boxes.length > 30 && boxes.every(b => b.length >= 8 && b.slice(0, 6).every(Number.isFinite)), kind + ': модель'); assert.equal(sp.skin, parseInt(m.look.look.skin.slice(1), 16), kind + ': цвет кожи не применился'); }
  if (m.beast) assert.ok(BEASTS.includes(m.beast) && beastBoxes(m.beast).length > 15, kind + ': зверь');
  if (m.boss) assert.ok(m.hp >= 50 && m.multiattack >= 2, kind + ': босс');
}
assert.equal(Object.keys(MONSTERS).length, 15);
for (const b of BEASTS) { const boxes = beastBoxes(b); assert.ok(boxes.every(x => x.slice(0, 6).every(Number.isFinite) && x[3] > 0 && x[4] > 0 && x[5] > 0), 'бокс зверя ' + b); assert.deepEqual(boxes, beastBoxes(b), 'зверь недетерминирован'); }

// ——— встречи ———
for (const theme of THEMES) for (const level of [1, 2, 3, 4, 5]) for (const size of [2, 4]) for (const d of DIFFICULTY) {
  const e = buildEncounter({ theme, level, size, difficulty: d, seed: theme + level + size + d }), budget = THRESH[level][DIFFICULTY.indexOf(d)] * size;
  assert.ok(e.kinds.length >= 1 && e.kinds.length <= 7 && e.kinds.every(k => MONSTERS[k]), 'встреча: состав');
  assert.ok(adjustedXp(e.kinds) <= budget * 1.1 + 1, `${theme}/${level}/${size}/${d}: слишком сильная встреча ${adjustedXp(e.kinds)} > ${budget}`);
  assert.deepEqual(e, buildEncounter({ theme, level, size, difficulty: d, seed: theme + level + size + d }), 'встреча недетерминирована');
}
{ let hit = 0, n = 0; for (const theme of THEMES) for (let s = 0; s < 6; s++) { const e = buildEncounter({ theme, level: 3, size: 4, difficulty: 'medium', seed: s }); n++; if (adjustedXp(e.kinds) >= 150 * 4 * .55) hit++; } assert.ok(hit / n >= .8, 'встречи средней сложности слишком слабые: ' + hit + '/' + n); }
assert.ok(new Set(THEMES.flatMap(t => buildEncounter({ theme: t, level: 3, difficulty: 'hard', seed: 1 }).kinds)).size >= 8, 'мало разнообразия врагов');

// ——— мир для тестов ———
const mkWorld = (w, h, walls = [], actors = []) => { const wall = new Set(walls.map(([x, y]) => x + ',' + y)); return { actors, passable: (x, y) => x >= 0 && y >= 0 && x < w && y < h && !wall.has(x + ',' + y) }; };
const actor = (id, team, x, y, kind, extra = {}) => { const m = MONSTERS[kind] || {}; return { id, team, x, y, hp: m.hp ?? 20, max: m.hp ?? 20, speed: m.speed ?? 6, attacks: m.attacks ?? [], ai: m.ai, traits: m.traits, spells: m.spells, boss: m.boss, multiattack: m.multiattack, undead: m.undead, ...extra }; };
const hero = (id, x, y, cls = 'fighter', extra = {}) => ({ id, team: 'party', x, y, hp: 20, max: 20, classId: cls, speed: 6, attacks: [], fearless: !!extra.ai, ...extra });
const D = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));

// законность намерения: путь по клеткам, не дальше скорости, не сквозь стены и врагов, цель достижима
function legal(me, intent, w, label) {
  let x = me.x, y = me.y; const speed = me.move ?? me.speed;
  assert.ok(intent && typeof intent.kind === 'string' && Array.isArray(intent.path), label + ': нет намерения');
  assert.ok(intent.path.length <= speed, label + ': путь длиннее скорости');
  const seen = new Set();
  for (const [nx, ny] of intent.path) {
    assert.equal(Math.max(Math.abs(nx - x), Math.abs(ny - y)), 1, label + ': шаг не в соседнюю клетку'); assert.ok(w.passable(nx, ny), label + ': шаг в стену');
    assert.ok(!w.actors.some(a => a.hp > 0 && a.id !== me.id && a.team !== me.team && a.x === nx && a.y === ny), label + ': шаг сквозь врага'); assert.ok(!seen.has(nx + ',' + ny), label + ': петля'); seen.add(nx + ',' + ny); x = nx; y = ny;
  }
  if (intent.path.length) assert.ok(!w.actors.some(a => a.hp > 0 && a.id !== me.id && a.x === x && a.y === y), label + ': остановка на занятой клетке');
  if (['attack', 'multiattack'].includes(intent.kind)) { const t = w.actors.find(a => a.id === intent.target), atk = me.attacks[intent.attack]; assert.ok(t && t.hp > 0 && t.team !== me.team, label + ': цель'); assert.ok(D({ x, y }, t) <= (atk.ranged ? atk.range : atk.reach), label + ': цель вне досягаемости'); }
  if (intent.kind === 'web') { const t = w.actors.find(a => a.id === intent.target); assert.ok(D(me, t) <= me.attacks[intent.attack].range, 'паутина далеко'); }
  return { x, y };
}

// ——— поведение ———
{ // ближний бой: идёт к ближайшему и бьёт, когда достаёт
  const w = mkWorld(14, 8), me = actor('g', 'foe', 1, 3, 'skeleton'), h1 = hero('h', 4, 3), h2 = hero('h2', 12, 6); w.actors.push(me, h1, h2);
  let i = decide(me, w); legal(me, i, w, 'melee'); assert.equal(i.kind, 'attack'); assert.equal(i.target, 'h'); assert.equal(i.path.length, 2);
  me.x = 9; i = decide(me, w); legal(me, i, w, 'melee далеко'); assert.ok(['attack', 'move'].includes(i.kind));
  const wz = mkWorld(16, 8), far = actor('z', 'foe', 0, 0, 'zombie', { move: 4 }); wz.actors.push(far, hero('h', 12, 5)); i = decide(far, wz); legal(far, i, wz, 'зомби медленный'); assert.equal(i.kind, 'move'); assert.equal(i.path.length, 4, 'зомби идёт на полную скорость'); i = { kind: 'move', path: [] };
}
{ // стрелок: держит дистанцию и отступает, если подошли вплотную
  const w = mkWorld(16, 8), me = actor('a', 'foe', 8, 3, 'goblin_archer'), h = hero('h', 12, 3); w.actors.push(me, h);
  let i = decide(me, w); legal(me, i, w, 'лучник'); assert.equal(i.kind, 'attack'); assert.equal(i.path.length, 0, 'в дальности — стоит и стреляет');
  h.x = 9; i = decide(me, w); const end = legal(me, i, w, 'лучник отходит'); assert.ok(i.retreat && D(end, h) >= 2, 'вплотную — отходит'); assert.equal(i.kind, 'attack');
  h.x = 15; h.y = 7; i = decide(me, w); legal(me, i, w, 'лучник далеко'); assert.ok(i.kind === 'attack' || i.kind === 'move');
}
{ // волк: слабейшая цель, предпочитает клетку рядом с союзником (тактика стаи)
  const w = mkWorld(14, 10), wolf = actor('w1', 'foe', 1, 5, 'wolf'), mate = actor('w2', 'foe', 6, 4, 'wolf'), strong = hero('s', 5, 7, 'fighter', { hp: 20 }), weak = hero('k', 7, 4, 'wizard', { hp: 4 });
  w.actors.push(wolf, mate, strong, weak); const i = decide(wolf, w); legal(wolf, i, w, 'волк'); assert.equal(i.target, 'k', 'волк выбирает слабейшего'); assert.ok(/стаей/.test(i.note));
}
{ // гоблин: бьёт и отскакивает
  const w = mkWorld(14, 8), g = actor('g', 'foe', 5, 3, 'goblin'), h = hero('h', 7, 3); w.actors.push(g, h); const i = decide(g, w); legal(g, i, w, 'гоблин'); assert.equal(i.kind, 'attack');
  if (i.retreat) { assert.ok(Math.min(...[D({ x: i.retreatTo[0], y: i.retreatTo[1] }, h)]) >= 2, 'отскок от героя'); }
}
{ // колдун: огонь по нескольким, иначе кайтинг
  const w = mkWorld(14, 8), m = actor('m', 'foe', 5, 3, 'dark_mage', { slots: { 1: 2 } }); w.actors.push(m, hero('a', 6, 3), hero('b', 7, 4)); let i = decide(m, w); assert.equal(i.kind, 'spell'); assert.equal(i.targets.length, 2); assert.ok(/всех/.test(i.note));
  const w2 = mkWorld(14, 8), m2 = actor('m', 'foe', 5, 3, 'dark_mage', { slots: { 1: 0 } }); w2.actors.push(m2, hero('a', 6, 3), hero('b', 7, 4)); i = decide(m2, w2); legal(m2, i, w2, 'маг без ячеек'); assert.equal(i.kind, 'attack'); assert.ok(i.retreat, 'без ячеек отходит');
}
{ // паук: сначала паутина, потом укус; не паутинит уже опутанного
  const w = mkWorld(14, 8), s = actor('s', 'foe', 2, 3, 'spider'), h = hero('h', 6, 3, 'wizard'); w.actors.push(s, h); let i = decide(s, w); assert.equal(i.kind, 'web'); assert.equal(i.target, 'h');
  h.conds = ['restrained']; i = decide(s, w); legal(s, i, w, 'паук'); assert.notEqual(i.kind, 'web'); assert.ok(['attack', 'move'].includes(i.kind));
}
{ // босс: тянется к заклинателю
  const w = mkWorld(16, 8), b = actor('b', 'foe', 2, 3, 'bandit_captain'), f = hero('f', 5, 3, 'fighter', { hp: 5 }), m = hero('m', 6, 5, 'wizard', { hp: 20 }); w.actors.push(b, f, m); const i = decide(b, w); legal(b, i, w, 'босс'); assert.equal(i.target, 'm', 'босс выбирает мага'); assert.equal(i.kind, 'multiattack');
}
{ // бегство: раненый бежит, босс и нежить стоят насмерть
  const w = mkWorld(16, 8), g = actor('g', 'foe', 5, 3, 'goblin', { hp: 1 }); w.actors.push(g, hero('h', 6, 3)); let i = decide(g, w); legal(g, i, w, 'бегство'); assert.equal(i.kind, 'flee'); assert.ok(i.path.length);
  const b = actor('bk', 'foe', 5, 3, 'bone_knight', { hp: 1 }); const w2 = mkWorld(16, 8); w2.actors.push(b, hero('h', 6, 3)); assert.notEqual(decide(b, w2).kind, 'flee');
  const z = actor('z', 'foe', 5, 3, 'skeleton', { hp: 1 }); const w3 = mkWorld(16, 8); w3.actors.push(z, hero('h', 6, 3)); assert.notEqual(decide(z, w3).kind, 'flee', 'нежить не бежит');
}
{ // стены и оглушение
  const walls = []; for (let y = 0; y < 8; y++) walls.push([5, y]); walls.splice(3, 1); // проход в (5,3)
  const w = mkWorld(12, 8, walls), me = actor('g', 'foe', 1, 3, 'goblin'), h = hero('h', 9, 3); w.actors.push(me, h); const i = decide(me, w); legal(me, i, w, 'через проход'); assert.ok(i.path.every(([x, y]) => w.passable(x, y)));
  me.conds = ['stunned']; assert.equal(decide(me, w).kind, 'wait'); me.conds = ['restrained']; const r = decide(me, w); assert.equal(r.path.length, 0, 'опутанный не двигается');
  const closed = mkWorld(12, 8, Array.from({ length: 8 }, (_, y) => [5, y])), a = actor('g', 'foe', 1, 3, 'skeleton'); closed.actors.push(a, hero('h', 9, 3)); const c = decide(a, closed); legal(a, c, closed, 'нет прохода'); assert.ok(['wait', 'move'].includes(c.kind));
}
{ // через союзников можно пройти, но не встать на них
  const w = mkWorld(8, 3, [[3, 0], [3, 2], [4, 0], [4, 2]]), me = actor('g', 'foe', 1, 1, 'skeleton'), ally = actor('a', 'foe', 3, 1, 'skeleton'), h = hero('h', 6, 1); w.actors.push(me, ally, h); const i = decide(me, w); legal(me, i, w, 'коридор с союзником'); assert.ok(!i.path.some(([x, y]) => x === 3 && y === 1 && i.path[i.path.length - 1][0] === 3), 'встал на союзника');
}

// ——— симуляция боёв на сгенерированных картах ———
const pass = scene => { const solid = new Set(scene.props.filter(p => p.solid !== false && !['portal', 'door', 'npc'].includes(p.type)).map(p => p.x + ',' + p.y)); return (x, y) => x >= 0 && y >= 0 && x < scene.W && y < scene.H && scene.tiles[y][x] === 'floor' && !solid.has(x + ',' + y); };
function simulate(seed, theme, level, difficulty = 'medium') {
  const rng = new Rng('sim/' + seed), plan = createWorld('бой' + seed, 'medium', 2), ids = Object.keys(plan.scenes).filter(i => ['dng', 'out', 'town'].some(p => i.startsWith(p) || i === 'out')), scene = generateScene(plan, rng.pick(ids)), passable = pass(scene);
  const spots = scene.spawns.filter(s => passable(s[0], s[1])).slice(0, 4); if (spots.length < 2) return null;
  const hpB = 20 + (level - 1) * 7, party = [hero('f', 0, 0, 'fighter', { hp: hpB + 8, max: hpB + 8, ac: 17, attacks: [{ name: 'Меч', bonus: 4 + level, dice: '1d8+3', reach: 1 }], ai: 'melee' }), hero('r', 0, 0, 'rogue', { hp: hpB, max: hpB, ac: 14, attacks: [{ name: 'Лук', bonus: 5, dice: '1d6+3', ranged: true, range: 8, reach: 0 }], ai: 'ranged' }), hero('w', 0, 0, 'wizard', { hp: hpB - 6, max: hpB - 6, ac: 12, attacks: [{ name: 'Огонь', bonus: 5, dice: '1d10', ranged: true, range: 10, reach: 0 }], ai: 'ranged' }), hero('c', 0, 0, 'cleric', { hp: hpB + 4, max: hpB + 4, ac: 16, attacks: [{ name: 'Булава', bonus: 4, dice: '1d6+2', reach: 1 }], ai: 'melee' })];
  const enc = buildEncounter({ theme, level, size: 4, difficulty, seed }), place = placeEncounter(scene, enc.kinds, spots.map(s => [s[0], s[1]]), seed); if (!place) return null;
  const taken = new Set(); party.forEach((p, i) => { let s = spots[i % spots.length]; for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [-1, -1]]) { const x = s[0] + dx, y = s[1] + dy; if (passable(x, y) && !taken.has(x + ',' + y) && !place.some(o => o.x === x && o.y === y)) { p.x = x; p.y = y; taken.add(x + ',' + y); break; } } });
  if (party.some(p => !taken.has(p.x + ',' + p.y))) return null;
  const foes = place.map((o, i) => actor('e' + i, 'foe', o.x, o.y, o.kind, { slots: o.kind === 'dark_mage' ? { 1: 3 } : undefined })), all = [...party, ...foes], world = { actors: all, passable, los: (a, b) => { const n = Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y)); for (let i = 1; i < n; i++) if (!passable(Math.round(a.x + (b.x - a.x) * i / n), Math.round(a.y + (b.y - a.y) * i / n))) return false; return true; } };
  const roll = (n, s) => { let t = 0; for (let i = 0; i < n; i++) t += rng.int(1, s); return t; }, dmg = d => { const m = /(\d+)d(\d+)(?:\+(\d+))?/.exec(d); return roll(+m[1], +m[2]) + (+m[3] || 0); };
  let rounds = 0, still = 0;
  for (; rounds < 40; rounds++) {
    const order = all.filter(a => a.hp > 0).sort((a, b) => rng.int(1, 20) - rng.int(1, 20));
    let acted = false;
    for (const me of order) {
      if (me.hp <= 0 || me.fled) continue; const side = all.filter(a => a.team !== me.team && a.hp > 0 && !a.fled); if (!side.length) break;
      const intent = decide(me, world), before = me.x + ',' + me.y + ',' + all.reduce((s, a) => s + a.hp, 0); legal(me, intent, world, `бой ${seed} ${me.id} ${intent.kind}`);
      if (intent.path.length) { const [x, y] = intent.path[intent.path.length - 1]; me.x = x; me.y = y; }
      if (intent.kind === 'flee' && Math.min(...side.map(f => D(me, f))) >= 8) me.fled = true;
      const t = all.find(a => a.id === intent.target);
      if (['attack', 'multiattack'].includes(intent.kind) && t) { const atks = me.multiattack ? me.attacks.slice(0, me.multiattack) : [me.attacks[intent.attack]]; for (const atk of atks) { if (t.hp <= 0) break; const r = rng.int(1, 20); if (r === 20 || (r !== 1 && r + atk.bonus >= (t.ac ?? 12))) { t.hp -= dmg(atk.dice) * (r === 20 ? 1.6 : 1) | 0; if (atk.onHit?.cond === 'prone') me.hp += 0; } } }
      if (intent.kind === 'web' && t) { if (rng.int(1, 20) + 5 >= (t.ac ?? 12)) t.conds = ['restrained']; }
      if (intent.kind === 'spell') for (const id of intent.targets) { const f = all.find(a => a.id === id); if (f && rng.int(1, 20) < 13) f.hp -= dmg('3d6'); else if (f) f.hp -= dmg('3d6') >> 1; }
      if (me.conds?.includes('restrained') && rng.chance(.4)) me.conds = [];
      if (before !== me.x + ',' + me.y + ',' + all.reduce((s, a) => s + a.hp, 0)) acted = true;
    }
    if (!foes.some(f => f.hp > 0 && !f.fled) || !party.some(p => p.hp > 0)) break;
    still = acted ? 0 : still + 1; assert.ok(still < 4, `бой ${seed}: зависание, никто ничего не делает: ` + all.filter(a => a.hp > 0).map(a => `${a.id}${a.team[0]}(${a.x},${a.y}) hp${a.hp}${a.fled ? ' бежал' : ''}${(a.conds || []).join('')} ${a.ai} ${decide(a, world).kind}/${decide(a, world).note}`).join('; '));
  }
  const win = foes.every(f => f.hp <= 0 || f.fled) ? 'party' : party.every(p => p.hp <= 0) ? 'foe' : 'draw';
  const maxHp = party.reduce((s, p) => s + p.max, 0), lost = party.reduce((s, p) => s + Math.min(p.max, p.max - p.hp), 0) / maxHp;
  return { rounds: rounds + 1, win, kinds: enc.kinds, lost, difficulty };
}
const results = [], byDiff = Object.fromEntries(DIFFICULTY.map(d => [d, []]));
for (const d of DIFFICULTY) for (let s = 0; s < 40; s++) { const r = simulate(s + DIFFICULTY.indexOf(d) * 1000, THEMES[s % THEMES.length], 1 + (s % 5), d); if (r) { results.push(r); byDiff[d].push(r); } }
assert.ok(results.length >= 100, 'симуляций слишком мало: ' + results.length);
const draws = results.filter(r => r.win === 'draw').length, wins = results.filter(r => r.win === 'party').length, avg = results.reduce((s, r) => s + r.rounds, 0) / results.length;
assert.ok(draws / results.length <= .05, 'слишком много боёв без итога: ' + draws);
const lost = Object.fromEntries(DIFFICULTY.map(d => [d, byDiff[d].reduce((s, r) => s + r.lost, 0) / Math.max(1, byDiff[d].length)]));
for (let i = 1; i < DIFFICULTY.length; i++) assert.ok(lost[DIFFICULTY[i]] > lost[DIFFICULTY[i - 1]], `потери не растут со сложностью: ${DIFFICULTY.map(d => d + ' ' + lost[d].toFixed(2)).join(', ')}`);
assert.ok(lost.deadly >= .35, 'смертельная встреча не опасна: потери ' + lost.deadly.toFixed(2));
assert.ok(lost.easy <= .3, 'лёгкая встреча слишком дорогая: потери ' + lost.easy.toFixed(2));
assert.ok(avg >= 2 && avg <= 20, 'средняя длина боя ' + avg.toFixed(1));
const seenKinds = new Set(results.flatMap(r => r.kinds)); assert.ok(seenKinds.size >= 12, 'в боях встретилось мало видов: ' + seenKinds.size);
globalThis.__balance = DIFFICULTY.map(d => `${d} ${(lost[d] * 100).toFixed(0)}%`).join(', ');

// ——— размещение врагов на картах ———
for (let s = 0; s < 30; s++) {
  const plan = createWorld('разм' + s, 'medium', 2), id = Object.keys(plan.scenes).find(i => i.startsWith('dng')), scene = generateScene(plan, id), p = pass(scene), spots = scene.spawns.map(s => [s[0], s[1]]);
  const place = placeEncounter(scene, ['skeleton', 'skeleton', 'ghoul', 'zombie'], spots, s); if (!place) continue;
  const keys = new Set(place.map(o => o.x + ',' + o.y)); assert.equal(keys.size, place.length, 'враги на одной клетке'); assert.ok(place.every(o => p(o.x, o.y)), 'враг в стене');
  const traps = new Set((scene.traps || []).map(t => t.x + ',' + t.y)); assert.ok(place.every(o => !traps.has(o.x + ',' + o.y)), 'враг на ловушке');
  const w = mkWorld(scene.W, scene.H); w.passable = p; const m = reach({ id: 'x', team: 'foe', x: place[0].x, y: place[0].y }, { actors: [], passable: p }, 200); assert.ok(spots.some(([x, y]) => m.has(x + ',' + y)), 'враги отрезаны от отряда');
  assert.deepEqual(place, placeEncounter(scene, ['skeleton', 'skeleton', 'ghoul', 'zombie'], spots, s), 'размещение недетерминировано');
}
console.log(`combat: ok (15 существ, ${results.length} боёв, победы отряда ${(wins / results.length * 100).toFixed(0)}%, в среднем ${avg.toFixed(1)} раунда; потери отряда по сложности: ${globalThis.__balance})`);
