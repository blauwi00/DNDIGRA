// Правила взаимодействия с предметами генерируемых миров. Не зависит от версии игры: игра даёт «хост» с несколькими функциями,
// а эта логика возвращает описание того, что показать (текст и кнопки). Состояние (что открыто, что найдено) хранится в host.state.gen.
//
// host = {
//   state: { gen: {...} }           — сохраняемое состояние мира (объект, сам модуль добавляет поля)
//   roll(sides) → число 1..sides    — бросок кубика (в игре — её генератор, в тестах — подставной)
//   mod('str'|'dex'|'con'|'int'|'wis'|'cha') → модификатор способности активного героя
//   has(имя) → bool                 — есть ли предмет у отряда;  give(имя, n=1)  — выдать предмет
//   gold(n), potions(n), torches(n) — выдать монеты, зелья, факелы
//   hurt(n, why) → hp героя после урона;  poison() — отравление (если игра умеет)
//   log(text)                       — записать строку в журнал
// }
import { lootText } from './content.js';

const ABILITY = { dex: 'Ловкость', con: 'Телосложение', str: 'Сила', wis: 'Мудрость', int: 'Интеллект' };
const key = (sceneId, id) => sceneId + ':' + id;
export const gstate = host => { const g = host.state.gen || (host.state.gen = {}); for (const k of ['opened', 'unlocked', 'known', 'disarmed', 'fired', 'jammed', 'talk']) g[k] = g[k] || {}; return g; };
const d20 = (host, bonus) => { const r = host.roll(20); return { r, total: r + bonus }; };

export function passivePerception(host) { return 10 + host.mod('wis'); }

// Ловушка срабатывает: спасбросок против сложности, при провале урон.
export function fireTrap(host, trap) {
  const { r, total } = d20(host, host.mod(trap.save)), ok = total >= trap.dc;
  let text = trap.text + ` Спасбросок (${ABILITY[trap.save]}): ${r}${host.mod(trap.save) >= 0 ? '+' : ''}${host.mod(trap.save)} против сл. ${trap.dc}, `;
  if (ok) return { hit: false, text: text + 'успех, вы увернулись.' };
  let dmg = 0; for (let i = 0; i < trap.dice; i++) dmg += host.roll(trap.sides);
  if (trap.alarm) { host.state.gen && (gstate(host).alarm = true); return { hit: true, alarm: true, text: text + 'провал. Шум разнёсся по округе.' }; }
  host.hurt(dmg, trap.name); if (trap.poison) host.poison?.();
  return { hit: true, dmg, text: text + `провал, урон ${dmg}.` };
}

function lockOptions(host, p, g, k) {
  const o = [];
  if (p.lock.key && host.has(p.lock.key)) o.push({ id: 'key', label: 'Открыть ключом' });
  if (host.has('Отмычки') && !g.jammed[k]) o.push({ id: 'pick', label: 'Вскрыть отмычками' });
  o.push({ id: 'force', label: 'Взломать силой' });
  o.push({ id: 'leave', label: 'Отойти' });
  return o;
}

// Что показать при обращении к предмету. Возвращает { title, text, options } или null, если предмет обычный.
export function begin(host, sceneId, p) {
  const g = gstate(host), k = key(sceneId, p.id);
  if (p.type === 'npc' && p.npc) { g.talk[k] = 0; return { kind: 'npc', title: p.name, text: p.npc.lines[0], options: p.npc.lines.length > 1 ? [{ id: 'next', label: 'Дальше' }, { id: 'leave', label: 'Попрощаться' }] : [{ id: 'leave', label: 'Попрощаться' }], npc: p.npc }; }
  if (p.type === 'door' && p.lock && !g.unlocked[k]) return { kind: 'door', title: p.name, text: 'Дверь заперта' + (p.lock.key ? ', замок необычный.' : '.'), options: lockOptions(host, p, g, k) };
  if (!p.container || !p.loot) return null;
  if (g.opened[k]) return { kind: 'container', title: p.name, text: 'Здесь уже пусто.', options: [{ id: 'leave', label: 'Закрыть' }] };
  if (p.lock && !g.unlocked[k]) return { kind: 'container', title: p.name, text: (p.description || '') + ' Он заперт.', options: lockOptions(host, p, g, k) };
  return armedStep(host, p, g, k, p.description);
}
// Ловушка на контейнере: пассивная внимательность, затем выбор.
function armedStep(host, p, g, k, intro = '') {
  if (p.trap && !g.disarmed[k] && !g.fired[k]) {
    if (!g.known[k] && passivePerception(host) >= p.trap.detectDc) { g.known[k] = true; host.log(`Вы заметили ловушку: ${p.trap.name}.`); }
    if (g.known[k]) return { kind: 'container', title: p.name, text: `${intro} Вы заметили ловушку: ${p.trap.name}. ${p.trap.hint}`, options: [{ id: 'disarm', label: 'Обезвредить' }, { id: 'open', label: 'Открыть как есть' }, { id: 'leave', label: 'Отойти' }] };
  }
  return { kind: 'container', title: p.name, text: intro || 'Вы осматриваете находку.', options: [{ id: 'open', label: 'Открыть' }, { id: 'leave', label: 'Отойти' }] };
}
function takeLoot(host, p, g, k) {
  const l = p.loot; g.opened[k] = true;
  if (l.gold) host.gold(l.gold); if (l.potions) host.potions(l.potions); if (l.torches) host.torches(l.torches); for (const it of l.gear) host.give(it, 1);
  const t = `Внутри: ${lootText(l)}.`; host.log(t); return t;
}
const lockCheck = (host, p, g, k, how) => {
  const lock = p.lock, ab = how === 'force' ? 'str' : 'dex', dc = how === 'force' ? lock.forceDc : lock.pickDc, { r, total } = d20(host, host.mod(ab)), ok = total >= dc;
  const text = `${how === 'force' ? 'Взлом' : 'Отмычки'} (${ABILITY[ab]}): ${r}${host.mod(ab) >= 0 ? '+' : ''}${host.mod(ab)} против сл. ${dc}, ${ok ? 'успех' : 'провал'}.`;
  if (!ok && how === 'pick' && host.roll(4) === 1) { g.jammed[k] = true; return { ok, text: text + ' Отмычка сломалась в замке, теперь его можно только взломать.' }; }
  return { ok, text };
};

// Выбор игрока. Возвращает { text, options?, done, kind }. done: true — окно можно закрыть.
export function choose(host, sceneId, p, optionId) {
  const g = gstate(host), k = key(sceneId, p.id);
  if (optionId === 'leave') return { done: true, text: '' };
  if (p.type === 'npc' && optionId === 'next') { const i = (g.talk[k] || 0) + 1; g.talk[k] = i; const last = i >= p.npc.lines.length - 1; return { done: false, text: p.npc.lines[i], options: last ? [{ id: 'leave', label: 'Попрощаться' }] : [{ id: 'next', label: 'Дальше' }, { id: 'leave', label: 'Попрощаться' }] }; }
  if (p.lock && !g.unlocked[k] && ['key', 'pick', 'force'].includes(optionId)) {
    let ok = true, text = 'Замок щёлкает.';
    if (optionId !== 'key') { const r = lockCheck(host, p, g, k, optionId); ok = r.ok; text = r.text; }
    if (!ok) return { done: false, text, options: lockOptions(host, p, g, k) };
    g.unlocked[k] = true; host.log(`Открыто: ${p.name}.`);
    if (p.type === 'door') return { done: true, opened: true, text: text + ' Дверь открыта.' };
    const next = armedStep(host, p, g, k, text); return { done: false, ...next, text: next.text };
  }
  if (p.container && optionId === 'disarm') {
    const { r, total } = d20(host, host.mod('dex')), ok = total >= p.trap.disarmDc, text = `Обезвреживание (Ловкость): ${r}${host.mod('dex') >= 0 ? '+' : ''}${host.mod('dex')} против сл. ${p.trap.disarmDc}, ${ok ? 'успех' : 'провал'}.`;
    if (ok) { g.disarmed[k] = true; return { done: false, text: text + ' Ловушка обезврежена.', options: [{ id: 'open', label: 'Открыть' }, { id: 'leave', label: 'Отойти' }] }; }
    g.fired[k] = true; const t = fireTrap(host, p.trap); return { done: false, text: text + ' ' + t.text, options: [{ id: 'open', label: 'Открыть' }, { id: 'leave', label: 'Отойти' }], trap: t };
  }
  if (p.container && g.opened[k]) return { done: true, text: 'Здесь уже пусто.' }; // повторная команда не должна выдавать добычу второй раз
  if (p.container && p.lock && !g.unlocked[k] && ['open', 'disarm'].includes(optionId)) return { done: false, text: 'Сначала нужно открыть замок.', options: lockOptions(host, p, g, k) };
  if (p.container && optionId === 'open') {
    let pre = '', trap = null;
    if (p.trap && !g.disarmed[k] && !g.fired[k]) { g.fired[k] = true; trap = fireTrap(host, p.trap); pre = trap.text + ' '; }
    return { done: true, text: pre + takeLoot(host, p, g, k), trap, looted: true };
  }
  return { done: true, text: '' };
}

// Ловушки-плиты на полу (scene.traps): вызывать, когда фигура героя встала на клетку. Возвращает список событий.
export function step(host, scene, x, y) {
  const g = gstate(host), events = [];
  for (const t of scene.traps || []) {
    const k = key(scene.id, t.id), dist = Math.abs(t.x - x) + Math.abs(t.y - y);
    if (g.disarmed[k] || g.fired[k]) continue;
    if (dist === 0) { g.fired[k] = true; g.known[k] = true; events.push({ type: 'fired', trap: t, result: fireTrap(host, t.trap) }); }
    else if (dist <= 1 && !g.known[k]) { if (passivePerception(host) >= t.trap.detectDc) { g.known[k] = true; events.push({ type: 'found', trap: t, text: `Вы заметили ловушку на плите: ${t.trap.name}. ${t.trap.hint}` }); } }
  }
  return events;
}
// Известные ловушки сцены (для отметок на карте).
export function knownTraps(host, scene) { const g = gstate(host); return (scene.traps || []).filter(t => g.known[key(scene.id, t.id)] && !g.fired[key(scene.id, t.id)] && !g.disarmed[key(scene.id, t.id)]); }
// Состояние предмета для отрисовки: открыт ли контейнер, отперта ли дверь.
export function isOpened(host, sceneId, p) { const g = gstate(host), k = key(sceneId, p.id); return !!(g.opened[k] || g.unlocked[k]); }

