// ИИ врагов. Чистая функция: decide(me, world) → намерение. Ничего не меняет и не зависит от игры, поэтому тестируется отдельно.
// Игра (в v43 функция enemiesUntilPlayer в game.js) вызывает decide, затем выполняет намерение своими средствами:
// идёт по intent.path, бьёт intent.target через свой strike(), применяет intent.spell и т. д.
//
// world = {
//   actors: [{id, team, x, y, hp, max, classId?, conds?: string[] }],   все существа, включая me
//   passable(x, y) → bool     клетка проходима (пол без непроходимых предметов), существа не учитываются
//   los?(a, b) → bool         есть ли линия видимости (по умолчанию true)
// }
// me: то же, плюс speed (клеток за ход), attacks[], ai, boss?, fearless? (не бежит), spells?[], slots?
// intent: { kind: 'attack'|'multiattack'|'spell'|'web'|'move'|'flee'|'wait', path: [[x,y],...], target, targets?, attack, spell?, retreat?, note }
const D = (world, a, b) => world.cardinal ? Math.abs(a.x-b.x)+Math.abs(a.y-b.y) : Math.max(Math.abs(a.x-b.x),Math.abs(a.y-b.y));
const K = (x, y) => x + ',' + y;
const STEPS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
const has = (a, c) => (a.conds || []).includes(c);

// Достижимые клетки: через союзников можно пройти, но нельзя встать; через врагов нельзя. Диагональ не срезает углы стен.
export function reach(me, world, maxCost) {
  const occupied = new Map(world.actors.filter(a => a.hp > 0 && a.id !== me.id).map(a => [K(a.x, a.y), a]));
  const best = new Map([[K(me.x, me.y), { cost: 0, from: null }]]), q = [[me.x, me.y]];
  while (q.length) {
    const [x, y] = q.shift(), c = best.get(K(x, y)).cost; if (c >= maxCost) continue;
    for (const [dx, dy] of (world.cardinal ? STEPS.slice(0,4) : STEPS)) {
      const nx = x + dx, ny = y + dy, k = K(nx, ny); if (best.has(k) || !world.passable(nx, ny)) continue;
      if (dx && dy && (!world.passable(x + dx, y) || !world.passable(x, y + dy))) continue;
      const o = occupied.get(k); if (o && o.team !== me.team) continue;
      best.set(k, { cost: c + 1, from: K(x, y), ally: !!o }); q.push([nx, ny]);
    }
  }
  return best;
}
const pathTo = (map, x, y) => { const out = []; let k = K(x, y); while (map.get(k) && map.get(k).from) { const [a, b] = k.split(',').map(Number); out.push([a, b]); k = map.get(k).from; } return out.reverse(); };
const canEnd = (map, me, world, x, y) => { const r = map.get(K(x, y)); return r && !r.ally && !world.actors.some(a => a.hp > 0 && a.id !== me.id && a.x === x && a.y === y); };

const meleeAtk = me => me.attacks.find(a => !a.ranged && !a.web) || me.attacks[0];
const rangedAtk = me => me.attacks.find(a => a.ranged && !a.web);
const webAtk = me => me.attacks.find(a => a.web);
const rangeOf = a => a.ranged ? a.range : (a.reach || 1);
const sees = (world, a, b) => !world.los || world.los(a, b);
function inReachOf(atk, tile, foe, world) { const d = D(world, tile, foe); return atk.ranged ? d <= atk.range && sees(world, tile, foe) : d <= (atk.reach || 1) && sees(world, tile, foe); }

// Клетки (из достижимых), с которых можно ударить цель; сортируем по стоимости
function attackTiles(me, map, atk, foe, world, speed) {
  const out = [];
  for (const [k, v] of map) { if (v.cost > speed) continue; const [x, y] = k.split(',').map(Number); if (!canEnd(map, me, world, x, y) && !(x === me.x && y === me.y)) continue; if (inReachOf(atk, { x, y }, foe, world)) out.push({ x, y, cost: v.cost }); }
  return out.sort((a, b) => a.cost - b.cost);
}
// Движение в сторону цели, если за этот ход не дойти: идём по кратчайшему пути, сколько хватает скорости
function approach(me, world, foe, atk, speed, note) {
  const full = reach(me, world, world.searchRadius ?? 99), goals = [];
  // путь обрезается по скорости и по последней клетке, где можно встать (не на союзнике и не на занятой)
  const clip = path => { const p = path.slice(0, speed); while (p.length && !canEnd(full, me, world, ...p[p.length - 1])) p.pop(); return p; };
  for (const [k, v] of full) { const [x, y] = k.split(',').map(Number); if (v.ally || (!(x === me.x && y === me.y) && world.actors.some(a => a.hp > 0 && a.id !== me.id && a.x === x && a.y === y))) continue; if (inReachOf(atk, { x, y }, foe, world)) goals.push({ x, y, cost: v.cost }); }
  goals.sort((a, b) => a.cost - b.cost); const g = goals[0];
  if (!g) {
    const near = [...full].map(([k, v]) => { const [x, y] = k.split(',').map(Number); return { x, y, v, d: D(world, { x, y }, foe) }; }).filter(t => !t.v.ally && canEnd(full, me, world, t.x, t.y)).sort((a, b) => a.d - b.d || a.v.cost - b.v.cost)[0];
    if (!near || (near.x === me.x && near.y === me.y)) return { kind: 'wait', path: [], target: foe.id, note: 'не может подобраться' };
    const path = clip(pathTo(full, near.x, near.y)); return path.length ? { kind: 'move', path, target: foe.id, note } : { kind: 'wait', path: [], target: foe.id, note: 'путь занят' };
  }
  const path = clip(pathTo(full, g.x, g.y));
  return path.length ? { kind: 'move', path, target: foe.id, note } : { kind: 'wait', path: [], target: foe.id, note: 'путь занят' };
}
const alive = (world, me) => world.actors.filter(a => a.team !== me.team && a.hp > 0 && !a.fled);
const ally = (world, me) => world.actors.filter(a => a.team === me.team && a.hp > 0 && a.id !== me.id);
const hpFrac = a => a.hp / (a.max || a.hp || 1);

export function decide(me, world) {
  const foes = alive(world, me); if (!foes.length || has(me, 'stunned') || has(me, 'unconscious')) return { kind: 'wait', path: [], target: null, note: 'ждёт' };
  const speed = has(me, 'restrained') ? 0 : (me.move ?? me.speed ?? 6), map = reach(me, world, speed), near = foes.slice().sort((a, b) => D(world, me, a) - D(world, me, b))[0];
  const ai = me.ai || 'melee', melee = meleeAtk(me), ranged = rangedAtk(me);

  // бегство: сильно ранен, не босс и не рой
  if (hpFrac(me) < .25 && !me.boss && !me.fearless && ai !== 'swarm' && !me.undead) {
    const here = D(world, me, near), spots = [...map].map(([k, v]) => { const [x, y] = k.split(',').map(Number); return { x, y, v, d: Math.min(...foes.map(f => D(world, { x, y }, f))) }; }).filter(t => canEnd(map, me, world, t.x, t.y) && t.d >= here + 2).sort((a, b) => b.d - a.d || a.v.cost - b.v.cost);
    if (spots[0]) return { kind: 'flee', path: pathTo(map, spots[0].x, spots[0].y), target: null, note: 'бежит, раненый' };
  }
  const strike = (foe, atk, note, extra = {}) => {
    const tiles = attackTiles(me, map, atk, foe, world, speed), stay = tiles.find(t => t.x === me.x && t.y === me.y), t = stay || tiles[0];
    if (!t) return null;
    return { kind: me.multiattack ? 'multiattack' : 'attack', path: stay ? [] : pathTo(map, t.x, t.y), target: foe.id, targets: foes.filter(f => inReachOf(atk, t, f, world)).map(f => f.id), attack: me.attacks.indexOf(atk), note, ...extra };
  };

  if (ai === 'ranged' || ai === 'caster') {
    const atk = ranged || melee, spell = (me.spells || [])[0];
    // колдун: огонь по нескольким врагам сразу
    if (ai === 'caster' && spell && (me.slots?.[1] ?? spell.slots ?? 0) > 0) {
      const cluster = foes.filter(f => D(world, me, f) <= (spell.cone || 3));
      if (cluster.length >= 2) return { kind: 'spell', path: [], target: cluster[0].id, targets: cluster.map(f => f.id), spell: spell.id, attack: -1, note: 'поджигает всех рядом' };
    }
    const adj = foes.filter(f => D(world, me, f) <= 1);
    // кайтинг: если подошли вплотную, отступаем на клетку, откуда ещё достаём
    if (adj.length) {
      const opts = [...map].map(([k, v]) => { const [x, y] = k.split(',').map(Number); const inR = foes.filter(f => inReachOf(atk, { x, y }, f, world)); return { x, y, v, inR, d: Math.min(...foes.map(f => D(world, { x, y }, f))) }; }).filter(t => canEnd(map, me, world, t.x, t.y) && t.inR.length && t.d >= 2).sort((a, b) => b.d - a.d || a.v.cost - b.v.cost);
      if (opts[0]) { const tgt = opts[0].inR.sort((a, b) => hpFrac(a) - hpFrac(b))[0]; return { kind: 'attack', path: pathTo(map, opts[0].x, opts[0].y), target: tgt.id, targets: [tgt.id], attack: me.attacks.indexOf(atk), retreat: true, note: 'отходит и стреляет' }; }
    }
    const inRange = foes.filter(f => inReachOf(atk, me, f, world)).sort((a, b) => hpFrac(a) - hpFrac(b));
    if (inRange.length) return { kind: 'attack', path: [], target: inRange[0].id, targets: inRange.map(f => f.id), attack: me.attacks.indexOf(atk), note: 'целится в самого слабого' };
    return approach(me, world, near, atk, speed, 'выходит на дистанцию выстрела');
  }

  if (ai === 'ambush') {
    const web = webAtk(me), free = foes.filter(f => !has(f, 'restrained') && D(world, me, f) > 1 && D(world, me, f) <= (web?.range || 6));
    if (web && free.length && !foes.some(f => D(world, me, f) <= 1)) { const f = free.sort((a, b) => (a.classId === 'wizard' || a.classId === 'cleric' ? 0 : 1) - (b.classId === 'wizard' || b.classId === 'cleric' ? 0 : 1) || D(world, me, a) - D(world, me, b))[0]; return { kind: 'web', path: [], target: f.id, targets: [f.id], attack: me.attacks.indexOf(web), note: 'опутывает паутиной' }; }
  }

  if (ai === 'boss') {
    const prio = f => (f.classId === 'wizard' || f.classId === 'cleric' ? 0 : 1);
    const cands = foes.map(f => ({ f, t: attackTiles(me, map, melee, f, world, speed) })).filter(c => c.t.length).sort((a, b) => prio(a.f) - prio(b.f) || hpFrac(a.f) - hpFrac(b.f) || a.t[0].cost - b.t[0].cost);
    if (cands[0]) return strike(cands[0].f, melee, prio(cands[0].f) === 0 ? 'рвётся к заклинателю' : 'добивает слабейшего');
    return approach(me, world, foes.slice().sort((a, b) => prio(a) - prio(b) || D(world, me, a) - D(world, me, b))[0], melee, speed, 'надвигается');
  }

  if (ai === 'hunter' || ai === 'skirmish') {
    const cands = foes.map(f => ({ f, t: attackTiles(me, map, melee, f, world, speed) })).filter(c => c.t.length);
    if (cands.length) {
      cands.sort((a, b) => hpFrac(a.f) - hpFrac(b.f) || a.t[0].cost - b.t[0].cost);
      const { f, t } = cands[0], mates = ally(world, me).filter(a => D(world, a, f) <= 1), pack = me.traits?.includes('packTactics') ? t.map(x => ({ ...x, score: x.cost - (mates.length ? 2 : 0) })).sort((a, b) => a.score - b.score) : t, tile = pack[0];
      let intent = { kind: 'attack', path: tile.x === me.x && tile.y === me.y ? [] : pathTo(map, tile.x, tile.y), target: f.id, targets: [f.id], attack: me.attacks.indexOf(melee), note: me.traits?.includes('packTactics') ? 'нападает на слабейшего вместе со стаей' : 'бросается на слабейшего' };
      if (ai === 'skirmish') { const left = speed - tile.cost; const back = [...map].map(([k, v]) => { const [x, y] = k.split(',').map(Number); return { x, y, v, d: Math.min(...foes.map(g => D(world, { x, y }, g))) }; }).filter(s => canEnd(map, me, world, s.x, s.y) && s.d >= 2 && s.v.cost - tile.cost <= left && s.v.cost > tile.cost).sort((a, b) => b.d - a.d)[0]; if (back) { intent.retreat = true; intent.retreatTo = [back.x, back.y]; intent.note = 'бьёт и отскакивает'; } }
      return intent;
    }
    return approach(me, world, near, melee, speed, 'подкрадывается');
  }

  // melee / swarm / по умолчанию: ближайший по пути
  const cands = foes.map(f => ({ f, t: attackTiles(me, map, melee, f, world, speed) })).filter(c => c.t.length).sort((a, b) => a.t[0].cost - b.t[0].cost || hpFrac(a.f) - hpFrac(b.f));
  if (cands.length) return strike(cands[0].f, melee, ai === 'swarm' ? 'набрасывается' : 'идёт в бой');
  return approach(me, world, near, melee, speed, 'приближается');
}
