// Бестиарий: 13 существ (числа в духе 5e), их внешность в воксельном стиле игры и построение встреч по сложности.
// Клетка = 5 футов; дальность и скорость в клетках, расстояние по Чебышёву (диагональ = 1).
import { Rng } from '../worldgen/rng.js';

export const mod = s => Math.floor((s - 10) / 2);
const A = (name, bonus, dice, type, o = {}) => ({ name, bonus, dice, type, reach: 1, ...o });
const SK = { skin: '#ddd6c2', hair: '#ddd6c2', brow: null, eye: '#c0392f', cloth: '#4a4038', cloth2: null, leather: '#3a3028', trim: '#8a8d92', hairStyle: 'bald', brows: 'none', eyes: 'big', mouth: 'grin', ears: 'small', beard: 'none', marks: [], accessories: [] };

// look — внешность гуманоидов (передаётся в Characters.spec как actor.gen); beast — id модели из beasts.js
export const MONSTERS = {
  rat: { name: 'Гигантская крыса', hp: 7, ac: 12, speed: 6, cr: .125, xp: 25, stats: { str: 7, dex: 15, con: 11, int: 2, wis: 10, cha: 4 }, attacks: [A('Укус', 4, '1d4+2', 'piercing')], ai: 'swarm', beast: 'rat' },
  skeleton: { name: 'Скелет', hp: 13, ac: 13, speed: 6, cr: .25, xp: 50, stats: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 }, attacks: [A('Ржавый меч', 4, '1d6+2', 'piercing')], vuln: ['bludgeoning'], immune: ['poison'], undead: true, ai: 'melee', look: { classId: 'fighter', gender: 'male', hands: ['sword', 'empty'], look: { ...SK, outfit: 'leather' } } },
  skeleton_archer: { name: 'Скелет-лучник', hp: 13, ac: 13, speed: 6, cr: .25, xp: 50, stats: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 }, attacks: [A('Костяной лук', 4, '1d6+2', 'piercing', { reach: 0, range: 8, ranged: true })], vuln: ['bludgeoning'], immune: ['poison'], undead: true, ai: 'ranged', look: { classId: 'rogue', gender: 'male', hands: ['bow', 'empty'], look: { ...SK, outfit: 'leather', cloth: '#3a342c' } } },
  zombie: { name: 'Зомби', hp: 22, ac: 8, speed: 4, cr: .25, xp: 50, stats: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 }, attacks: [A('Удар', 3, '1d6+1', 'bludgeoning')], immune: ['poison'], undead: true, ai: 'melee', traits: ['undeadFortitude'], look: { classId: 'fighter', gender: 'male', hands: ['empty', 'empty'], look: { skin: '#8aa070', hair: '#3a3a30', eye: '#d8d880', cloth: '#5a5048', leather: '#4a3a2c', hairStyle: 'short', brows: 'sad', eyes: 'sleepy', mouth: 'open', ears: 'round', beard: 'stubble', marks: ['scar'], outfit: 'tabard', accessories: [] } } },
  goblin: { name: 'Гоблин', hp: 7, ac: 15, speed: 6, cr: .25, xp: 50, stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 }, attacks: [A('Ятаган', 4, '1d6+2', 'slashing')], ai: 'skirmish', traits: ['nimbleEscape'], look: { classId: 'rogue', gender: 'male', hands: ['sword', 'empty'], look: { skin: '#7aa84a', hair: '#3a3020', eye: '#e8c830', cloth: '#6a4a30', leather: '#4a3a28', trim: '#a08a50', hairStyle: 'bald', brows: 'angry', eyes: 'narrow', mouth: 'grin', ears: 'long', beard: 'none', marks: [], outfit: 'leather', accessories: [] } } },
  goblin_archer: { name: 'Гоблин-лучник', hp: 7, ac: 13, speed: 6, cr: .25, xp: 50, stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 }, attacks: [A('Короткий лук', 4, '1d6+2', 'piercing', { reach: 0, range: 8, ranged: true })], ai: 'ranged', look: { classId: 'rogue', gender: 'male', hands: ['bow', 'empty'], look: { skin: '#86b050', hair: '#3a3020', eye: '#e8c830', cloth: '#5a6a3a', leather: '#4a3a28', trim: '#a08a50', hairStyle: 'bald', brows: 'angry', eyes: 'narrow', mouth: 'smirk', ears: 'long', beard: 'none', marks: [], outfit: 'leather', headgear: 'cap', accessories: [] } } },
  wolf: { name: 'Волк', hp: 11, ac: 13, speed: 8, cr: .25, xp: 50, stats: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 }, attacks: [A('Укус', 4, '2d4+2', 'piercing', { onHit: { save: 'str', dc: 11, cond: 'prone' } })], ai: 'hunter', traits: ['packTactics'], beast: 'wolf' },
  bandit: { name: 'Разбойник', hp: 11, ac: 12, speed: 6, cr: .125, xp: 25, stats: { str: 11, dex: 12, con: 12, int: 10, wis: 10, cha: 10 }, attacks: [A('Ятаган', 3, '1d6+1', 'slashing'), A('Арбалет', 3, '1d8+1', 'piercing', { reach: 0, range: 8, ranged: true })], ai: 'melee', look: { classId: 'rogue', gender: 'male', hands: ['sword', 'empty'], look: { skin: '#e0b890', hair: '#3a2a20', cloth: '#4a4a52', leather: '#3a2c20', trim: '#7a7a82', hairStyle: 'short', brows: 'thick', eyes: 'narrow', mouth: 'neutral', beard: 'stubble', marks: ['scar'], headgear: 'hood', outfit: 'leather', accessories: ['scarf'] } } },
  bandit_captain: { name: 'Главарь разбойников', hp: 65, ac: 15, speed: 6, cr: 2, xp: 450, stats: { str: 15, dex: 16, con: 14, int: 14, wis: 11, cha: 14 }, attacks: [A('Ятаган', 5, '1d6+3', 'slashing'), A('Ятаган', 5, '1d6+3', 'slashing')], multiattack: 2, ai: 'boss', boss: true, traits: ['parry'], look: { classId: 'fighter', gender: 'male', hands: ['sword', 'shield'], look: { skin: '#d8a880', hair: '#2a2018', cloth: '#7a2a2a', leather: '#3a2c20', trim: '#d0a94a', hairStyle: 'sweep', brows: 'angry', eyes: 'narrow', mouth: 'smirk', beard: 'full', marks: ['browscar'], headgear: 'helm', cape: 'short', capeColor: '#5a1c1c', outfit: 'knight', accessories: [] } } },
  cultist: { name: 'Культист', hp: 9, ac: 12, speed: 6, cr: .125, xp: 25, stats: { str: 11, dex: 12, con: 10, int: 10, wis: 11, cha: 10 }, attacks: [A('Жертвенный кинжал', 3, '1d4+1', 'piercing')], ai: 'melee', look: { classId: 'cleric', gender: 'female', hands: ['mace', 'empty'], look: { skin: '#e8cbb0', hair: '#201820', eye: '#c060ff', cloth: '#3a2a4a', cloth2: '#2a1e38', trim: '#a040c0', gem: '#c060ff', hairStyle: 'long', brows: 'straight', eyes: 'narrow', mouth: 'smirk', headgear: 'hood', marks: ['warpaint'], markColor: '#a040c0', outfit: 'robe', accessories: ['amulet'] } } },
  spider: { name: 'Гигантский паук', hp: 26, ac: 14, speed: 6, cr: 1, xp: 200, stats: { str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4 }, attacks: [A('Ядовитый укус', 5, '1d8+3', 'piercing', { onHit: { save: 'con', dc: 11, extra: '2d8', extraType: 'poison', half: true } }), A('Паутина', 5, '0d0', 'none', { reach: 0, range: 6, ranged: true, web: true })], ai: 'ambush', beast: 'spider' },
  ghoul: { name: 'Вурдалак', hp: 22, ac: 12, speed: 6, cr: 1, xp: 200, stats: { str: 13, dex: 15, con: 10, int: 7, wis: 10, cha: 6 }, attacks: [A('Когти', 4, '2d4+2', 'slashing', { onHit: { save: 'con', dc: 10, cond: 'stunned', turns: 1 } })], immune: ['poison'], undead: true, ai: 'hunter', look: { classId: 'rogue', gender: 'male', hands: ['empty', 'empty'], look: { skin: '#9aa090', hair: '#4a4a40', eye: '#e8e860', cloth: '#3a3a36', leather: '#2c2a28', hairStyle: 'wavy', brows: 'sad', eyes: 'wide', mouth: 'open', ears: 'pointed', beard: 'none', marks: [], outfit: 'leather', accessories: [] } } },
  dark_mage: { name: 'Тёмный маг', hp: 27, ac: 12, speed: 6, cr: 2, xp: 450, stats: { str: 9, dex: 14, con: 11, int: 17, wis: 12, cha: 11 }, attacks: [A('Огненный снаряд', 5, '1d10', 'fire', { reach: 0, range: 10, ranged: true })], spells: [{ id: 'burninghands', save: 'dex', dc: 13, dice: '3d6', type: 'fire', cone: 3, slots: 3 }], ai: 'caster', traits: ['shield'], look: { classId: 'wizard', gender: 'male', hands: ['staff', 'empty'], look: { skin: '#d8c0a8', hair: '#c8c8d0', eye: '#d060ff', cloth: '#2a1e3a', cloth2: '#1c1428', trim: '#c040a0', gem: '#d060ff', hairStyle: 'long', brows: 'angry', eyes: 'narrow', mouth: 'smirk', beard: 'goatee', headgear: 'wizhat', outfit: 'robe', accessories: [] } } },
  ogre: { name: 'Огр', hp: 59, ac: 11, speed: 6, cr: 2, xp: 450, stats: { str: 19, dex: 8, con: 16, int: 5, wis: 7, cha: 7 }, attacks: [A('Дубина', 6, '2d8+4', 'bludgeoning')], ai: 'melee', scale: 1.4, look: { classId: 'fighter', gender: 'male', hands: ['mace', 'empty'], look: { skin: '#b89a70', hair: '#3a2c20', eye: '#201810', cloth: '#6a4a30', leather: '#4a3a28', trim: '#8a7050', hairStyle: 'mohawk', brows: 'thick', eyes: 'dot', mouth: 'open', ears: 'round', beard: 'stubble', marks: ['scar'], outfit: 'leather', accessories: [] } } },
  bone_knight: { name: 'Костяной рыцарь', hp: 52, ac: 17, speed: 6, cr: 3, xp: 700, stats: { str: 17, dex: 11, con: 16, int: 8, wis: 10, cha: 8 }, attacks: [A('Двуручный меч', 6, '2d6+3', 'slashing'), A('Двуручный меч', 6, '2d6+3', 'slashing')], multiattack: 2, vuln: ['bludgeoning'], immune: ['poison'], undead: true, ai: 'boss', boss: true, look: { classId: 'fighter', gender: 'male', hands: ['sword', 'shield'], look: { ...SK, eye: '#40c0ff', cloth: '#2a2a3a', leather: '#2a2a2c', trim: '#8a8d92', headgear: 'helm', cape: 'long', capeColor: '#22223a', outfit: 'knight' } } },
};
export const kindsList = () => Object.keys(MONSTERS);

// Сложность встречи (5e): пороги опыта на одного героя [лёгкая, средняя, трудная, смертельная]; множитель за число врагов
export const THRESH = { 1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400], 4: [125, 250, 375, 500], 5: [250, 500, 750, 1100] };
export const MULT = n => n <= 1 ? 1 : n === 2 ? 1.5 : n <= 6 ? 2 : n <= 10 ? 2.5 : 3;
export const DIFFICULTY = ['easy', 'medium', 'hard', 'deadly'];
const POOLS = {
  crypt: ['skeleton', 'skeleton', 'skeleton_archer', 'zombie', 'ghoul', 'bone_knight'],
  cellar: ['rat', 'rat', 'rat', 'spider', 'cultist', 'bandit'],
  town: ['bandit', 'bandit', 'cultist', 'rat', 'bandit_captain'],
  forest: ['wolf', 'wolf', 'goblin', 'goblin', 'goblin_archer', 'bandit', 'spider', 'ogre', 'bandit_captain'],
  fortress: ['skeleton', 'bandit', 'cultist', 'dark_mage', 'ogre', 'bone_knight', 'skeleton_archer'],
  cave: ['spider', 'goblin', 'goblin_archer', 'rat', 'ogre', 'wolf'],
};
export const THEMES = Object.keys(POOLS);
export const adjustedXp = kinds => kinds.reduce((s, k) => s + MONSTERS[k].xp, 0) * MULT(kinds.length);

// buildEncounter: список видов для встречи. Детерминированно по зерну.
export function buildEncounter({ theme = 'forest', level = 1, size = 4, difficulty = 'medium', seed = 1 } = {}) {
  const rng = new Rng('enc/' + seed), pool = POOLS[theme] || POOLS.forest, budget = (THRESH[Math.min(5, Math.max(1, level))][Math.max(0, DIFFICULTY.indexOf(difficulty))] || 100) * size;
  let best = null;
  for (let t = 0; t < 60; t++) {
    const kinds = [], max = rng.int(1, 7);
    for (let i = 0; i < max; i++) { const k = rng.pick(pool); if (adjustedXp([...kinds, k]) <= budget * 1.1) kinds.push(k); }
    if (!kinds.length) continue;
    const x = adjustedXp(kinds), score = Math.abs(budget - x) + (kinds.length === 1 ? budget * .05 : 0);
    if (!best || score < best.score) best = { kinds, score, xp: x };
  }
  return best ? { kinds: best.kinds.sort(), xp: Math.round(best.xp), budget } : { kinds: [pool[0]], xp: MONSTERS[pool[0]].xp, budget };
}

// placeEncounter: где стоят враги. Свободные проходимые клетки на расстоянии 6–14 шагов от отряда, сгустком, без ловушек.
export function placeEncounter(scene, kinds, partySpots, seed = 1) {
  const rng = new Rng('place/' + seed), W = scene.W, H = scene.H, key = (x, y) => x + ',' + y;
  const blocked = new Set(scene.props.filter(p => p.solid !== false && !['portal', 'door', 'npc'].includes(p.type)).map(p => key(p.x, p.y)));
  const traps = new Set((scene.traps || []).map(t => key(t.x, t.y))), free = (x, y) => x >= 0 && y >= 0 && x < W && y < H && scene.tiles[y][x] === 'floor' && !blocked.has(key(x, y));
  const dist = new Map(), q = [];
  for (const [x, y] of partySpots) if (free(x, y)) { dist.set(key(x, y), 0); q.push([x, y]); }
  while (q.length) { const [x, y] = q.shift(), d = dist.get(key(x, y)); for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) { const nx = x + dx, ny = y + dy; if (free(nx, ny) && !dist.has(key(nx, ny))) { dist.set(key(nx, ny), d + 1); q.push([nx, ny]); } } }
  const maxD = Math.max(0, ...dist.values()), lo = Math.min(6, Math.max(2, Math.floor(maxD * .5))), hi = Math.min(14, Math.max(lo + 2, maxD));
  const cand = [...dist].filter(([k, d]) => d >= lo && d <= hi && !traps.has(k)).map(([k]) => k.split(',').map(Number));
  if (cand.length < kinds.length) return null;
  const centre = rng.pick(cand), sorted = cand.map(c => [Math.hypot(c[0] - centre[0], c[1] - centre[1]) + rng.next() * 1.5, c]).sort((a, b) => a[0] - b[0]).slice(0, kinds.length);
  return kinds.map((kind, i) => ({ kind, x: sorted[i][1][0], y: sorted[i][1][1] }));
}
