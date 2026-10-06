// Каталог предметов и расстановка по комнатам. Поведение предметов (контейнеры, ловушки, замки) помечается gen:true
// и обрабатывается dist/worldgen-runtime.js. Игровые типы (chest, crate, barrel, chair, desk, books, altar...) сохранены.
import { rollLoot, lootText, rollTrap, KEY_NAMES } from './content.js';
import { DIRS } from './scene.js';

// type — как предмет понимает игра; model — внешний вид из src/props.js (если нет — старая модель по type)
const CAT = {
  table: { type: 'furniture', model: 'table', name: 'Стол', d: ['Крепкий стол с въевшимися пятнами и царапинами.', 'Стол накрыт выцветшей скатертью.', 'На столе остались круги от кружек.'] },
  stool: { type: 'furniture', model: 'stool', name: 'Табурет', d: ['Трёхногий табурет, отполированный до блеска.', 'Табурет слегка шатается.'] },
  bench: { type: 'furniture', model: 'bench', name: 'Скамья', d: ['Длинная деревянная скамья.', 'Скамья вытерта сотнями посетителей.'] },
  bed: { type: 'furniture', model: 'bed', name: 'Кровать', d: ['Узкая кровать со свежими простынями.', 'Одеяло смято, будто здесь недавно спали.', 'Кровать скрипит при малейшем движении.'] },
  cot: { type: 'furniture', model: 'cot', name: 'Лежанка', d: ['Голые доски с соломенным тюфяком.', 'Жёсткая лежанка, прикованная к стене.'] },
  hearth: { type: 'furniture', model: 'hearth', name: 'Очаг', d: ['В очаге тлеют угли, от них идёт ровное тепло.', 'Очаг выложен закопчённым камнем.'], light: true },
  wardrobe: { type: 'furniture', model: 'wardrobe', name: 'Шкаф', d: ['Тяжёлый шкаф с потёртой резьбой.'], container: true },
  counter: { type: 'furniture', model: 'counter', name: 'Прилавок', d: ['Широкий прилавок, на нём аккуратно разложены товары.', 'Дерево прилавка истёрто локтями.'] },
  shelf: { type: 'furniture', model: 'shelf', name: 'Полка', d: ['На полках банки, свёртки и мелкая утварь.', 'Полки забиты всякой всячиной.'], container: true },
  well: { type: 'furniture', model: 'well', name: 'Колодец', d: ['Каменный колодец. Вода внизу чёрная и холодная.', 'Ведро на цепи покачивается от ветра.'] },
  tree: { type: 'furniture', model: 'tree', name: 'Дерево', d: ['Старое дерево с густой кроной.', 'Ветви шумят над головой.'] },
  bush: { type: 'furniture', model: 'bush', name: 'Кустарник', d: ['Колючий кустарник.'] },
  stall: { type: 'furniture', model: 'stall', name: 'Торговый навес', d: ['Навес над прилавком, торговец собирает товар.', 'Полосатый тент хлопает на ветру.'] },
  anvil: { type: 'furniture', model: 'anvil', name: 'Наковальня', d: ['Наковальня в зарубках от тысяч ударов.'] },
  forge: { type: 'furniture', model: 'forge', name: 'Горн', d: ['Горн пышет жаром, угли светятся оранжевым.'], light: true },
  cauldron: { type: 'furniture', model: 'cauldron', name: 'Котёл', d: ['В котле что-то булькает и пахнет травами.', 'Чугунный котёл над огнём.'] },
  sarcophagus: { type: 'furniture', model: 'sarcophagus', name: 'Саркофаг', d: ['Крышка саркофага покрыта пылью и стёртыми рунами.', 'Каменный саркофаг. Тихо, слишком тихо.'] },
  gravestone: { type: 'furniture', model: 'gravestone', name: 'Надгробие', d: ['Имя на камне стёрлось, остались только даты.'] },
  bones: { type: 'furniture', model: 'bones', name: 'Кости', d: ['Кучка старых костей. Давно здесь лежат.'], solid: false },
  pillar: { type: 'cover', model: 'pillar', name: 'Колонна', d: ['Каменная колонна, исчерченная трещинами.'] },
  brazier: { type: 'furniture', model: 'brazier', name: 'Жаровня', d: ['Жаровня освещает всё вокруг красноватым светом.'], light: true },
  fountain: { type: 'furniture', model: 'fountain', name: 'Фонтан', d: ['Вода тихо журчит в каменной чаше.'] },
  signpost: { type: 'furniture', model: 'signpost', name: 'Указатель', d: ['Деревянный указатель с выцветшими надписями.'] },
  haystack: { type: 'furniture', model: 'haystack', name: 'Стог сена', d: ['Тёплый стог, пахнет летом.'] },
  cart: { type: 'furniture', model: 'cart', name: 'Телега', d: ['Телега с мешками и верёвкой.'] },
  barrel: { type: 'barrel', name: 'Бочка', d: ['Из бочки пахнет элем.', 'Бочка с водой, на крышке пыль.', 'Бочка опечатана клеймом бондаря.'], container: true },
  crate: { type: 'crate', name: 'Ящик', d: ['Ящик с отметками мелом.', 'Дощатый ящик, крышка прибита гвоздями.'], container: true },
  chair: { type: 'chair', name: 'Стул', d: ['Простой деревянный стул.'] },
  chest: { type: 'chest', name: 'Сундук', d: ['Окованный сундук.', 'Сундук с потёртым замком.'], container: true },
  planter: { type: 'planter', name: 'Кадка с растением', d: ['Растение давно просит воды.', 'В кадке растут душистые травы.'] },
  books: { type: 'books', name: 'Книжный шкаф', d: ['Тесно стоящие тома, большинство без названий.', 'Книги пахнут пылью и клеем.'], container: true },
  desk: { type: 'desk', name: 'Письменный стол', d: ['На столе чернильница и стопка бумаг.', 'Перо торчит из чернильницы, будто писавший вышел на минуту.'] },
  rack: { type: 'rack', name: 'Стойка с оружием', d: ['Оружие на стойке отполировано до блеска.'] },
  banner: { type: 'banner', name: 'Знамя', d: ['Знамя выцвело, но гербовый зверь ещё виден.'], solid: false },
  scrolls: { type: 'scrolls', name: 'Свитки', d: ['Свитки лежат аккуратной стопкой.'] },
  altar: { type: 'altar', name: 'Алтарь', d: ['Алтарь тёплый на ощупь, свечи горят ровно.'] },
};
export const CATALOG = CAT;
const dirRot = (dx, dy) => dy === 1 ? 0 : dx === -1 ? 3 : dy === -1 ? 2 : 1; // куда смотрит лицевая сторона: от стены, в комнату

export function mk(sb, key, extra = {}) {
  const c = CAT[key], p = { type: c.type, kind: 24, name: c.name, description: sb.rng.pick(c.d), ...extra };
  if (c.model) p.model = c.model; if (c.solid === false) p.solid = false; if (c.type === 'chest') p.kind = 17; if (c.type === 'altar') p.kind = 18; if (c.type === 'books') p.kind = 21; if (c.type === 'cover') p.kind = 19;
  p.cat = key; return p;
}

// ——— выбор клеток ———
const inRoom = (r, x, y) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;
export function roomCells(sb, r) { const out = []; for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) if (sb.isFloor(x, y)) out.push([x, y]); return out; }
// клетки у стены; возвращает {x,y,rot}
function wallCandidates(sb, r) {
  const out = [];
  for (const [x, y] of roomCells(sb, r)) for (const [dx, dy] of DIRS) if (!sb.isFloor(x + dx, y + dy)) { out.push({ x, y, rot: dirRot(-dx, -dy), wall: [dx, dy] }); break; }
  return sb.rng.shuffle(out);
}
function interior(sb, r) { return sb.rng.shuffle(roomCells(sb, r).filter(([x, y]) => DIRS.every(([dx, dy]) => sb.isFloor(x + dx, y + dy)))); }

export function atWall(sb, r, key, n = 1, extra = () => ({})) {
  let placed = 0; const out = [];
  for (const c of wallCandidates(sb, r)) { if (placed >= n) break; const p = sb.put(mk(sb, key, { rot: c.rot, ...extra(placed) }), c.x, c.y); if (p) { placed++; out.push(p); } }
  return out;
}
// Настенные предметы (знамёна) висят на самой стене, как в игре: клетка стены рядом с полом комнаты.
export function wallMount(sb, r, key, n = 1) {
  const out = [], cand = [];
  for (let y = r.y - 1; y <= r.y + r.h; y++) for (let x = r.x - 1; x <= r.x + r.w; x++) {
    if (!sb.isWall(x, y) || sb.isFloor(x, y)) continue;
    const fronts = DIRS.filter(([dx, dy]) => sb.isFloor(x + dx, y + dy) && inRoom(r, x + dx, y + dy) && !sb.occ.has((x + dx) + ',' + (y + dy)) && !sb.reserved.has((x + dx) + ',' + (y + dy)));
    if (fronts.length === 1) cand.push([x, y]);
  }
  for (const [x, y] of sb.rng.shuffle(cand)) {
    if (out.length >= n) break;
    if (sb.props.some(p => Math.abs(p.x - x) + Math.abs(p.y - y) < 2 && (p.solid === false || p.type === 'portal' || p.type === 'door'))) continue;
    const p = mk(sb, key); p.x = x; p.y = y; p.id = sb.nid('wall'); sb.props.push(p); out.push(p);
  }
  return out;
}
export function inside(sb, r, key, n = 1, extra = () => ({})) {
  let placed = 0; const out = [];
  for (const [x, y] of interior(sb, r)) { if (placed >= n) break; const p = sb.put(mk(sb, key, extra(placed)), x, y); if (p) { placed++; out.push(p); } }
  return out;
}
export function anywhere(sb, r, key, n = 1, extra = () => ({})) {
  let placed = 0; const out = [];
  for (const [x, y] of sb.rng.shuffle(roomCells(sb, r))) { if (placed >= n) break; const p = sb.put(mk(sb, key, extra(placed)), x, y); if (p) { placed++; out.push(p); } }
  return out;
}
// стол со стульями вокруг
export function tableSet(sb, r, chairs = 2) {
  for (const [x, y] of interior(sb, r)) {
    const t = sb.put(mk(sb, 'table'), x, y); if (!t) continue;
    let n = 0; for (const [dx, dy] of sb.rng.shuffle(DIRS)) { if (n >= chairs) break; if (sb.put(mk(sb, 'chair', { rot: dirRot(-dx, -dy) }), x + dx, y + dy)) n++; }
    return t;
  }
  return null;
}
export function rug(sb, r) {
  if (r.w < 4 || r.h < 4) return;
  const w = Math.min(3, r.w - 2), h = Math.min(2, r.h - 2), x = r.x + Math.floor((r.w - w) / 2), y = r.y + Math.floor((r.h - h) / 2);
  for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (!sb.free(i, j) || sb.reserved.has(i + ',' + j)) return;
  sb.decor.push({ kind: 'rug', x, y, w, h });
}

// ——— контейнеры с добычей, замками и ловушками ———
export function stock(sb, p, ctx, theme, opts = {}) {
  const depth = ctx.depth || 0, r = sb.rng;
  p.gen = true; p.container = true; p.loot = rollLoot(r, theme, depth + (opts.bonus || 0));
  // бочки, ящики и полки чаще пусты: добыча должна быть событием, а не рутиной
  if (p.type !== 'chest' && theme !== 'vault' && !opts.lockKey && r.chance(.45 - Math.min(.2, depth * .05))) p.loot = { gold: 0, potions: 0, torches: 0, gear: [] };
  else if (p.type !== 'chest') { p.loot.potions = r.chance(.06 + depth * .03) ? 1 : 0; p.loot.gold = Math.ceil(p.loot.gold / 2); }
  if (opts.lockKey) p.lock = { key: opts.lockKey, pickDc: 12 + depth, forceDc: 14 + depth };
  if (opts.trap) p.trap = rollTrap(r, depth, opts.trapKinds);
  if (opts.extraGear) p.loot.gear.push(...opts.extraGear);
  p.description = (p.description ? p.description + ' ' : '') + (p.lock ? 'Заперт.' : '');
  return p;
}
export function plainContainers(sb, r, ctx, theme, count, keys = ['chest', 'crate', 'barrel']) {
  const out = [];
  for (let i = 0; i < count; i++) { const key = sb.rng.pick(keys), found = atWall(sb, r, key, 1)[0] || inside(sb, r, key, 1)[0]; if (found) { stock(sb, found, ctx, theme, { trap: sb.rng.chance(ctx.trapChance ?? .08) }); out.push(found); } }
  return out;
}

// ——— роли комнат ———
export function furnish(sb, role, r, ctx) {
  const rng = sb.rng, area = r.w * r.h, depth = ctx.depth || 0, big = area >= 30;
  const fire = ps => { for (const p of ps) if (CAT[p.cat].light) sb.light(p.x + .5, p.y + .5, { radius: 3, power: .7 }); };
  switch (role) {
    case 'living': fire(atWall(sb, r, 'hearth', 1)); tableSet(sb, r, 2); if (big) tableSet(sb, r, 1); atWall(sb, r, 'bench', 1); atWall(sb, r, 'shelf', 1); if (rng.chance(.5)) atWall(sb, r, 'planter', 1); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'bedroom', { trap: rng.chance(.06) })); rug(sb, r); break;
    case 'bedroom': atWall(sb, r, 'bed', big ? 2 : 1); atWall(sb, r, 'wardrobe', 1).forEach(p => stock(sb, p, ctx, 'bedroom')); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'bedroom', { trap: rng.chance(.08) })); if (big) inside(sb, r, 'table', 1); if (rng.chance(.4)) rug(sb, r); break;
    case 'kitchen': fire(atWall(sb, r, 'hearth', 1)); atWall(sb, r, 'cauldron', 1); atWall(sb, r, 'counter', 2); inside(sb, r, 'table', 1); atWall(sb, r, 'barrel', 2).forEach(p => stock(sb, p, ctx, 'kitchen')); atWall(sb, r, 'crate', 2).forEach(p => stock(sb, p, ctx, 'kitchen')); atWall(sb, r, 'shelf', 1).forEach(p => stock(sb, p, ctx, 'kitchen')); break;
    case 'hall': { // общий зал таверны
      fire(atWall(sb, r, 'hearth', 1)); atWall(sb, r, 'counter', Math.min(4, Math.max(2, Math.floor(r.w / 3))));
      for (let i = 0; i < Math.min(5, Math.max(2, Math.floor(area / 14))); i++) tableSet(sb, r, 2);
      atWall(sb, r, 'barrel', 2).forEach(p => stock(sb, p, ctx, 'tavern')); atWall(sb, r, 'stool', 2); atWall(sb, r, 'bench', 1); wallMount(sb, r, 'banner', 1);
      if (area >= 36) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2)); rug(sb, r); break; }
    case 'storage': atWall(sb, r, 'crate', 2 + (big ? 2 : 0)).forEach(p => stock(sb, p, ctx, 'storage')); atWall(sb, r, 'barrel', 2).forEach(p => stock(sb, p, ctx, 'storage')); atWall(sb, r, 'shelf', 1).forEach(p => stock(sb, p, ctx, 'storage')); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'storage', { trap: rng.chance(.12 + depth * .05) })); if (big) inside(sb, r, 'crate', 1).forEach(p => stock(sb, p, ctx, 'storage')); break;
    case 'cellar': atWall(sb, r, 'barrel', 3).forEach(p => stock(sb, p, ctx, 'tavern')); atWall(sb, r, 'crate', 2).forEach(p => stock(sb, p, ctx, 'storage')); atWall(sb, r, 'shelf', 1).forEach(p => stock(sb, p, ctx, 'storage')); inside(sb, r, 'barrel', big ? 2 : 1).forEach(p => stock(sb, p, ctx, 'tavern')); break;
    case 'smithy': fire(atWall(sb, r, 'forge', 1)); atWall(sb, r, 'anvil', 1); atWall(sb, r, 'rack', 2); atWall(sb, r, 'counter', 2); atWall(sb, r, 'barrel', 1); atWall(sb, r, 'crate', 2).forEach(p => stock(sb, p, ctx, 'smith')); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'smith', { trap: rng.chance(.1) })); break;
    case 'alchemy': atWall(sb, r, 'shelf', 3).forEach(p => stock(sb, p, ctx, 'alchemy')); atWall(sb, r, 'cauldron', 1); atWall(sb, r, 'counter', 2); atWall(sb, r, 'planter', 2); inside(sb, r, 'table', 1); atWall(sb, r, 'crate', 1).forEach(p => stock(sb, p, ctx, 'alchemy')); break;
    case 'shop': atWall(sb, r, 'counter', Math.min(3, Math.max(2, Math.floor(r.w / 3)))); atWall(sb, r, 'shelf', 3).forEach(p => stock(sb, p, ctx, 'storage')); atWall(sb, r, 'barrel', 1); atWall(sb, r, 'crate', 2).forEach(p => stock(sb, p, ctx, 'storage')); inside(sb, r, 'crate', 1); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'storage', { trap: rng.chance(.1) })); rug(sb, r); break;
    case 'chapel': {
      const a = atWall(sb, r, 'altar', 1); if (a[0]) sb.lights.push({ id: 'altar', x: a[0].x + .5, y: a[0].y + .15, radius: 2.3, power: .55, phase: 4, intensity: 10, distance: 8, brightRadius: 4 });
      wallMount(sb, r, 'banner', 2); for (let i = 0; i < Math.min(4, Math.floor(area / 10) + 1); i++) inside(sb, r, 'bench', 1); atWall(sb, r, 'planter', 1);
      atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'chapel')); atWall(sb, r, 'books', 1).forEach(p => stock(sb, p, ctx, 'library')); rug(sb, r); if (area >= 30) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2)); break; }
    case 'guard': atWall(sb, r, 'desk', 1); atWall(sb, r, 'chair', 1); atWall(sb, r, 'rack', 2); wallMount(sb, r, 'banner', 1); tableSet(sb, r, 2); atWall(sb, r, 'barrel', 1); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'guard', { trap: rng.chance(.12) })); break;
    case 'cells': atWall(sb, r, 'cot', Math.max(1, Math.floor(area / 7))); atWall(sb, r, 'bones', 1); atWall(sb, r, 'barrel', 1); atWall(sb, r, 'crate', 1).forEach(p => stock(sb, p, ctx, 'guard')); break;
    case 'armory': atWall(sb, r, 'rack', Math.max(2, Math.floor(r.w / 2))); atWall(sb, r, 'chest', 2).forEach(p => stock(sb, p, ctx, 'guard', { trap: rng.chance(.2), bonus: 1 })); atWall(sb, r, 'crate', 2).forEach(p => stock(sb, p, ctx, 'guard')); break;
    case 'warehouse': { const n = Math.max(6, Math.floor(area / 3)); for (let i = 0; i < n; i++) { const p = (rng.chance(.5) ? atWall : anywhere)(sb, r, rng.pick(['crate', 'crate', 'barrel', 'chest']), 1)[0]; if (p) stock(sb, p, ctx, 'storage', { trap: p.type === 'chest' && rng.chance(.15) }); } if (big) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2)); break; }
    case 'library': atWall(sb, r, 'books', Math.max(2, Math.floor(r.w / 2))).forEach(p => stock(sb, p, ctx, 'library')); atWall(sb, r, 'desk', 1); atWall(sb, r, 'scrolls', 1); tableSet(sb, r, 2); atWall(sb, r, 'planter', 1); rug(sb, r); break;
    // подземные роли
    case 'crypt': for (let i = 0; i < Math.max(2, Math.floor(area / 9)); i++) (rng.chance(.7) ? inside : atWall)(sb, r, rng.chance(.7) ? 'sarcophagus' : 'gravestone', 1).forEach(p => { if (p.cat === 'sarcophagus' && rng.chance(.5)) stock(sb, p, ctx, 'crypt', { trap: rng.chance(.35), trapKinds: ['gas', 'fire', 'needle'] }); }); atWall(sb, r, 'bones', 2); fire(atWall(sb, r, 'brazier', 1)); atWall(sb, r, 'pillar', 2); break;
    case 'guardroom': tableSet(sb, r, 3); atWall(sb, r, 'rack', 1); atWall(sb, r, 'barrel', 2).forEach(p => stock(sb, p, ctx, 'guard')); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'guard', { trap: rng.chance(.25) })); atWall(sb, r, 'bones', 1); fire(atWall(sb, r, 'brazier', 1)); break;
    case 'treasure': atWall(sb, r, 'chest', Math.max(2, Math.floor(area / 10))).forEach((p, i) => stock(sb, p, ctx, 'vault', { trap: true, bonus: 1, lockKey: i === 0 ? ctx.vaultKey : undefined })); atWall(sb, r, 'pillar', 2); fire(atWall(sb, r, 'brazier', 2)); wallMount(sb, r, 'banner', 1); break;
    case 'shrine': { const a = atWall(sb, r, 'altar', 1); if (a[0]) sb.lights.push({ id: 'altar', x: a[0].x + .5, y: a[0].y + .15, radius: 2.3, power: .55, phase: 4, intensity: 10, distance: 8, brightRadius: 4 }); wallMount(sb, r, 'banner', 2); atWall(sb, r, 'pillar', 2); atWall(sb, r, 'bones', 1); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'chapel', { trap: rng.chance(.4) })); break; }
    case 'dungeonlib': atWall(sb, r, 'books', 2).forEach(p => stock(sb, p, ctx, 'library')); atWall(sb, r, 'desk', 1); atWall(sb, r, 'scrolls', 1); atWall(sb, r, 'bones', 1); atWall(sb, r, 'crate', 1).forEach(p => stock(sb, p, ctx, 'library', { trap: rng.chance(.2) })); break;
    case 'camp': fire(atWall(sb, r, 'brazier', 1)); inside(sb, r, 'crate', 2).forEach(p => stock(sb, p, ctx, 'camp')); inside(sb, r, 'barrel', 1).forEach(p => stock(sb, p, ctx, 'camp')); atWall(sb, r, 'bench', 2); break;
    case 'courtyard': atWall(sb, r, 'rack', 2); atWall(sb, r, 'barrel', 2).forEach(p => stock(sb, p, ctx, 'guard')); atWall(sb, r, 'crate', 3).forEach(p => stock(sb, p, ctx, 'guard')); inside(sb, r, 'well', 1); wallMount(sb, r, 'banner', 3); fire(atWall(sb, r, 'brazier', 3)); atWall(sb, r, 'cart', 1); inside(sb, r, 'haystack', 1); break;
    case 'greathall': wallMount(sb, r, 'banner', 3); fire(atWall(sb, r, 'hearth', 2)); for (let i = 0; i < Math.max(2, Math.floor(area / 16)); i++) tableSet(sb, r, 3); atWall(sb, r, 'pillar', 2); fire(atWall(sb, r, 'brazier', 2)); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'vault', { trap: rng.chance(.25) })); sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2)); rug(sb, r); break;
    case 'lord': atWall(sb, r, 'bed', 1); atWall(sb, r, 'wardrobe', 1).forEach(p => stock(sb, p, ctx, 'bedroom', { bonus: 1 })); atWall(sb, r, 'desk', 1); atWall(sb, r, 'chest', 1).forEach(p => stock(sb, p, ctx, 'vault', { trap: true, lockKey: ctx.vaultKey })); wallMount(sb, r, 'banner', 1); fire(atWall(sb, r, 'hearth', 1)); rug(sb, r); break;
    default: atWall(sb, r, 'crate', 1).forEach(p => stock(sb, p, ctx, 'storage'));
  }
}
