// План мира: из зерна и размера получается граф мест. Сами сцены строятся лениво, когда игрок идёт к двери.
// Один и тот же (seed, size, GEN_VERSION) всегда даёт один и тот же мир, поэтому сохранение хранит только зерно и изменения игрока.
import { Rng, randomSeed } from './rng.js';
export { randomSeed };
import { settlementName, person, buildingName, KEY_NAMES, BUILDING_TYPES } from './content.js';
import { genTown, TOWN_SIZES } from './town.js';
import { genBuilding, genCellar, genUpper } from './buildings.js';
import { genDungeon } from './dungeon.js';
import { genOutskirts } from './outskirts.js';
import { genYard } from './fortress.js';
import { validateScene } from './scene.js';
export { validateScene, TOWN_SIZES };

export const GEN_VERSION = 1;
export const SIZES = Object.keys(TOWN_SIZES);
const COUNTS = {
  small: { tavern: 1, chapel: 1, smithy: 1, shop: [1, 1], alchemist: [0, 1], guard: 1, warehouse: [0, 1], library: [0, 0], cottage: [1, 1], house: [2, 3] },
  medium: { tavern: 1, chapel: 1, smithy: 1, shop: [2, 2], alchemist: [1, 1], guard: 1, warehouse: [1, 2], library: [0, 1], cottage: [1, 2], house: [5, 7] },
  large: { tavern: 2, chapel: 1, smithy: 2, shop: [3, 4], alchemist: [1, 2], guard: 2, warehouse: [2, 3], library: [1, 1], cottage: [2, 3], house: [9, 12] },
};
const CELLAR_P = { tavern: 1, warehouse: .7, alchemist: .5, chapel: .6, guard: .5, shop: .4, house: .35, smithy: .3, library: .3, cottage: .1 };
const keyName = (rng, used) => { for (let i = 0; i < 20; i++) { const n = 'Ключ: ' + rng.pick(KEY_NAMES); if (!used.has(n)) { used.add(n); return n; } } const n = 'Ключ: Безымянный ' + used.size; used.add(n); return n; };

export function normalizeGen(gen = {}) { return { v: GEN_VERSION, seed: String(gen.seed ?? '0'), size: SIZES.includes(gen.size) ? gen.size : 'auto' }; }

export function createWorld(seed, size) {
  seed = String(seed); const rng = new Rng(seed + '/plan');
  const sizeResolved = SIZES.includes(size) ? size : rng.pick(['small', 'medium', 'medium', 'large']);
  const plan = { v: GEN_VERSION, seed, size: sizeResolved, name: settlementName(rng), gateDest: 'out', buildings: [], scenes: {}, keys: [], facts: [], start: 'town' };
  // состав города
  const C = COUNTS[sizeResolved], list = [];
  for (const [type, n] of Object.entries(C)) { const count = Array.isArray(n) ? rng.int(n[0], n[1]) : n; for (let i = 0; i < count; i++) list.push(type); }
  const tavernNames = new Set(); let idx = 0;
  for (const type of list) {
    const owner = person(rng.fork('owner' + idx)), id = 'b' + (++idx); let name = buildingName(rng.fork('name' + idx), type, owner);
    while (type === 'tavern' && tavernNames.has(name)) name = buildingName(rng.fork('nm' + idx + tavernNames.size), type, owner); tavernNames.add(name);
    const cellar = rng.chance(CELLAR_P[type] ?? .2) ? id + ':c' : null, up = type === 'tavern' ? id + ':u' : (['house', 'shop', 'alchemist'].includes(type) && sizeResolved !== 'small' && rng.chance(.25)) ? id + ':u' : null;
    plan.buildings.push({ id, type, name, owner, cellar, up, lockRoom: rng.chance(.3), extraNpcs: type === 'tavern' ? rng.int(1, 3) : 0, guestNames: [person(rng.fork('gn' + idx)).full, person(rng.fork('gm' + idx)).full, person(rng.fork('gk' + idx)).full] });
  }
  // раскладка улиц: повторяем, пока таверна и часовня не получили двери
  let town = null, tryIndex = 0;
  for (; tryIndex < 12; tryIndex++) {
    plan.buildings.forEach(b => delete b.door); town = genTown(plan, tryIndex);
    if (town && plan.buildings.some(b => b.type === 'tavern' && b.door) && plan.buildings.some(b => b.type === 'chapel' && b.door)) break;
  }
  if (!town || tryIndex >= 12) throw new Error('Не удалось разместить здания города');
  plan.townTry = tryIndex; plan.buildings = plan.buildings.filter(b => b.door);
  // внешний мир
  const dungeonLevels = { small: 1, medium: 2, large: 3 }[sizeResolved], fortress = sizeResolved === 'large' || (sizeResolved === 'medium' && rng.chance(.6)) || rng.chance(.15);
  const dungeonName = rng.pick(['Старая крипта', 'Забытые склепы', 'Рудник мертвецов', 'Катакомбы под холмом', 'Разрушенная усыпальница']), fortName = rng.pick(['Заброшенная крепость', 'Серая цитадель', 'Крепость на холме', 'Разорённый замок']);
  plan.dungeon = { name: dungeonName, levels: dungeonLevels }; plan.fortress = fortress ? { name: fortName } : null;
  // ключи: тайники в подвалах, сокровищница подземелья, покои лорда
  const usedKeys = new Set(), homes = plan.buildings.filter(b => b.type !== 'chapel').map(b => b.id), keysAt = new Map();
  const putKey = (name, notId) => { const holder = rng.pick(homes.filter(h => h !== notId).concat(homes.length > 1 ? [] : ['out'])); (keysAt.get(holder) || keysAt.set(holder, []).get(holder)).push(name); return holder; };
  const stashCellars = plan.buildings.filter(b => b.cellar && b.type !== 'tavern').slice(0, Math.max(1, Math.floor(plan.buildings.length / 8)));
  const stashKeys = new Map(stashCellars.map(b => { const k = keyName(rng, usedKeys); putKey(k, b.id); return [b.id, k]; }));
  const vaultKey = keyName(rng, usedKeys); plan.keys.push({ name: vaultKey, holder: putKey(vaultKey, null), opens: dungeonLevels ? 'dng:' + dungeonLevels : 'out' });
  const fortKey = fortress ? keyName(rng, usedKeys) : null; if (fortKey) plan.keys.push({ name: fortKey, holder: putKey(fortKey, null), opens: 'fort:up' });
  for (const [b, k] of stashKeys) plan.keys.push({ name: k, holder: [...keysAt].find(([, v]) => v.includes(k))?.[0], opens: b + ':c' });
  // слухи — только про то, что существует
  for (const b of plan.buildings) { if (b.type === 'tavern') plan.facts.push({ kind: 'tavern', place: b.name }); if (stashKeys.has(b.id)) plan.facts.push({ kind: 'cache', place: b.name }); if (b.lockRoom && b.type !== 'cottage') plan.facts.push({ kind: 'lock', where: b.name, keyWhere: 'каком-то из домов' }); }
  plan.facts.push({ kind: 'dungeon', place: dungeonName }, { kind: 'trap', where: dungeonName }); if (fortress) plan.facts.push({ kind: 'fortress', place: fortName });
  // реестр сцен
  const S = plan.scenes; S.town = { kind: 'town' };
  plan.buildings.forEach((b, i) => {
    const facts = rng.fork('facts' + i).shuffle(plan.facts.filter(f => f.place !== b.name)).slice(0, 3), keysHere = keysAt.get(b.id) || [];
    S[b.id] = { kind: 'building', spec: { id: b.id, type: b.type, name: b.name, parent: 'town', owner: b.owner, cellar: b.cellar, up: b.up, lockRoom: b.lockRoom, facts, extraNpcs: b.extraNpcs, guestNames: b.guestNames, keysHere, trapChance: .08 } };
    if (b.cellar) S[b.cellar] = { kind: 'cellar', spec: { id: b.cellar, name: 'Подвал: ' + b.name, parent: b.id, stash: stashKeys.has(b.id) ? { key: stashKeys.get(b.id) } : null } };
    if (b.up) S[b.up] = { kind: 'upper', spec: { id: b.up, name: 'Верхний этаж: ' + b.name, parent: b.id, lockRoom: b.type === 'tavern' } };
  });
  const links = [{ dest: 'town', side: 'west', at: .5, label: 'Дорога в город' }]; if (dungeonLevels) links.push({ dest: 'dng:1', side: 'east', at: .3 + rng.next() * .2, label: dungeonName });
  if (fortress) links.push({ dest: 'fort:yard', side: rng.pick(['north', 'south']), at: .45 + rng.next() * .2, label: fortName });
  S.out = { kind: 'outskirts', spec: { id: 'out', name: 'Дорога у города «' + plan.name + '»', links, keysHere: keysAt.get('out') || [] } };
  for (let l = 1; l <= dungeonLevels; l++) S['dng:' + l] = { kind: 'dungeon', spec: { id: 'dng:' + l, name: dungeonName + ', уровень ' + l, level: l, up: l === 1 ? 'out' : 'dng:' + (l - 1), down: l < dungeonLevels ? 'dng:' + (l + 1) : null, vault: l === dungeonLevels, vaultKey: l === dungeonLevels ? vaultKey : undefined } };
  if (fortress) {
    S['fort:yard'] = { kind: 'yard', spec: { id: 'fort:yard', name: fortName + ': двор', parent: 'out', keep: 'fort:keep' } };
    S['fort:keep'] = { kind: 'building', spec: { id: 'fort:keep', type: 'keep', name: fortName + ': донжон', parent: 'fort:yard', owner: person(rng.fork('castellan')), cellar: 'fort:dng', up: 'fort:up', depth: 1, facts: [], exitLabel: 'Выход во двор', trapChance: .12 } };
    S['fort:up'] = { kind: 'building', spec: { id: 'fort:up', type: 'lordhall', name: fortName + ': покои', parent: 'fort:keep', owner: person(rng.fork('chamberlain')), depth: 2, facts: [], exitLabel: 'Лестница вниз', vaultKey: fortKey, trapChance: .2 } };
    S['fort:dng'] = { kind: 'dungeon', spec: { id: 'fort:dng', name: fortName + ': темница', level: 2, up: 'fort:keep', down: null, vault: false } };
  }
  Object.defineProperty(plan, 'cache', { value: new Map(), enumerable: false });
  return plan;
}

export function generateScene(plan, id) {
  if (plan.cache?.has(id)) return plan.cache.get(id);
  const def = plan.scenes[id]; if (!def) throw new Error('Неизвестная сцена ' + id);
  const spec = def.spec; let scene;
  switch (def.kind) {
    case 'town': scene = genTown(plan, plan.townTry); if (!scene) throw new Error('Город не построился'); break;
    case 'building': scene = genBuilding(spec, plan); break;
    case 'cellar': scene = genCellar(spec, plan); break;
    case 'upper': scene = genUpper(spec, plan); break;
    case 'outskirts': scene = genOutskirts(spec, plan); break;
    case 'dungeon': scene = genDungeon(spec, plan); break;
    case 'yard': scene = genYard(spec, plan); break;
    default: throw new Error('Неизвестный тип сцены ' + def.kind);
  }
  scene.gen.planVersion = plan.v; plan.cache?.set(id, scene); return scene;
}
export const sceneIds = plan => Object.keys(plan.scenes);
export const isGeneratedId = (plan, id) => !!plan.scenes[id];

// Куда ведут выходы сцены. Игра вызывает это при входе в сцену и в свободное время (requestIdleCallback)
// строит соседние сцены заранее, чтобы к моменту, когда игрок подойдёт к двери, всё уже было готово.
export const exits = scene => [...new Set(scene.props.filter(p => p.type === 'portal').map(p => p.destination))];

