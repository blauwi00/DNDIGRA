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
  // ——— крупная мебель (занимает клетку, расставляется с проверкой проходов) ———
  workbench: { type: 'furniture', model: 'workbench', name: 'Верстак', d: ['Верстак в зарубках и опилках.', 'На верстаке разложен инструмент.'] },
  loom: { type: 'furniture', model: 'loom', name: 'Ткацкий станок', d: ['Станок с натянутой основой, работа брошена на полпути.'] },
  bathtub: { type: 'furniture', model: 'bathtub', name: 'Ванна', d: ['Медная ванна с остывшей водой.'] },
  cradle: { type: 'furniture', model: 'cradle', name: 'Колыбель', d: ['Пустая колыбель слегка покачивается.'] },
  sackpile: { type: 'furniture', model: 'sackpile', name: 'Мешки', d: ['Стопка мешков с зерном.', 'Мешки сложены неровно, но надёжно.'] },
  haybale: { type: 'furniture', model: 'haybale', name: 'Тюк сена', d: ['Сухой тюк сена пахнет летом.'] },
  cratestack: { type: 'furniture', model: 'cratestack', name: 'Стопка ящиков', d: ['Ящики сложены друг на друга и перетянуты верёвкой.'] },
  barrelstack: { type: 'furniture', model: 'barrelstack', name: 'Пирамида бочек', d: ['Бочки сложены пирамидой, снизу сочится влага.'] },
  statue: { type: 'furniture', model: 'statue', name: 'Статуя', d: ['Каменная фигура, лицо стёрто временем.', 'У подножия статуи следы свечного воска.'] },
  pulpit: { type: 'furniture', model: 'pulpit', name: 'Кафедра', d: ['Кафедра со старой книгой проповедей.'] },
  font: { type: 'furniture', model: 'font', name: 'Купель', d: ['Чаша с чистой водой.'] },
  coffin: { type: 'furniture', model: 'coffin', name: 'Гроб', d: ['Крышка плотно прибита.', 'Гроб без имени.'] },
  cage: { type: 'furniture', model: 'cage', name: 'Клетка', d: ['Железная клетка, дверца заперта.'] },
  throne: { type: 'furniture', model: 'throne', name: 'Трон', d: ['Резной трон с красной подушкой.'] },
  lamppost: { type: 'furniture', model: 'lamppost', name: 'Фонарный столб', d: ['Фонарь горит ровным светом.'] },
  // ——— напольные мелочи (через них можно ходить) ———
  bucket: { type: 'furniture', model: 'bucket', name: 'Ведро', d: ['Ведро с водой.', 'Пустое ведро с вмятиной.'], solid: false },
  broom: { type: 'furniture', model: 'broom', name: 'Метла', d: ['Метла стоит в углу.'], solid: false },
  sack: { type: 'furniture', model: 'sack', name: 'Мешок', d: ['Мешок с чем-то мягким.'], solid: false },
  basket: { type: 'furniture', model: 'basket', name: 'Корзина', d: ['Плетёная корзина.'], solid: false },
  rope: { type: 'furniture', model: 'rope', name: 'Бухта верёвки', d: ['Аккуратно свёрнутая верёвка.'], solid: false },
  boots: { type: 'furniture', model: 'boots', name: 'Сапоги', d: ['Стоптанные сапоги.'], solid: false },
  wheel: { type: 'furniture', model: 'wheel', name: 'Колесо от телеги', d: ['Колесо от телеги, прислонённое к стене.'], solid: false },
  puddle: { type: 'furniture', model: 'puddle', name: 'Лужа', d: ['Лужа, в которой отражается свет.'], solid: false },
  straw: { type: 'furniture', model: 'straw', name: 'Солома', d: ['Рассыпанная солома.'], solid: false },
  rubble: { type: 'furniture', model: 'rubble', name: 'Груда камней', d: ['Обломки каменной кладки.'], solid: false },
  lantern_floor: { type: 'furniture', model: 'lantern_floor', name: 'Фонарь', d: ['Фонарь, оставленный на полу.'], solid: false },
  pitchfork: { type: 'furniture', model: 'pitchfork', name: 'Вилы', d: ['Вилы с обломанным зубцом.'], solid: false },
  shovel: { type: 'furniture', model: 'shovel', name: 'Лопата', d: ['Лопата в засохшей земле.'], solid: false },
  // ——— настенные детали (висят на стене, ничего не занимают) ———
  shield: { type: 'decor', model: 'shield', name: 'Щит на стене', d: ['Щит с гербом, краска облупилась.'], wall: true },
  swords: { type: 'decor', model: 'swords', name: 'Мечи на стене', d: ['Два меча, давно не бывшие в деле.'], wall: true },
  antlers: { type: 'decor', model: 'antlers', name: 'Оленьи рога', d: ['Рога висят над входом на счастье.'], wall: true },
  painting: { type: 'decor', model: 'painting', name: 'Картина', d: ['Пейзаж в потемневшей раме.', 'Картина слегка висит набок.'], wall: true },
  tapestry: { type: 'decor', model: 'tapestry', name: 'Гобелен', d: ['Гобелен с выцветшим узором.'], wall: true },
  mirror: { type: 'decor', model: 'mirror', name: 'Зеркало', d: ['Зеркало в золочёной раме.'], wall: true },
  clock: { type: 'decor', model: 'clock', name: 'Часы', d: ['Часы спешат на четверть часа.', 'Часы тихо тикают.'], wall: true },
  hooks: { type: 'decor', model: 'hooks', name: 'Вешалка', d: ['На крючках плащи и шапки.'], wall: true },
  jars: { type: 'decor', model: 'jars', name: 'Полка с банками', d: ['Банки с засолкой и сушёными травами.'], wall: true },
  map: { type: 'decor', model: 'map', name: 'Карта', d: ['Карта окрестностей, на ней пометки.'], wall: true },
  noticeboard: { type: 'decor', model: 'noticeboard', name: 'Доска объявлений', d: ['На доске объявления о пропаже и найме.'], wall: true },
  pans: { type: 'decor', model: 'pans', name: 'Сковороды', d: ['Сковороды, начищенные до блеска.'], wall: true },
  herbs_hang: { type: 'decor', model: 'herbs_hang', name: 'Пучки трав', d: ['Травы сушатся вниз головой и пахнут лугом.'], wall: true },
  tavernsign: { type: 'decor', model: 'tavernsign', name: 'Вывеска', d: ['Вывеска поскрипывает на ветру.'], wall: true },
  shutter: { type: 'decor', model: 'shutter', name: 'Окно со ставнями', d: ['Через стекло едва пробивается свет.'], wall: true },
  keysboard: { type: 'decor', model: 'keysboard', name: 'Доска с ключами', d: ['Ключи висят под номерами.'], wall: true },
  shackles: { type: 'decor', model: 'shackles', name: 'Кандалы', d: ['Кандалы на стене, звенья потёрты.'], wall: true },
  horseshoe: { type: 'decor', model: 'horseshoe', name: 'Подкова', d: ['Подкова висит на счастье.'], wall: true },
  net: { type: 'decor', model: 'net', name: 'Рыболовная сеть', d: ['Сеть пахнет рекой.'], wall: true },
  altar: { type: 'altar', name: 'Алтарь', d: ['Алтарь тёплый на ощупь, свечи горят ровно.'] },
};
export const CATALOG = CAT;
export const dirRot = (dx, dy) => dy === 1 ? 0 : dx === -1 ? 3 : dy === -1 ? 2 : 1; // куда смотрит лицевая сторона: от стены, в комнату

export function mk(sb, key, extra = {}) {
  const c = CAT[key], p = { type: c.type, kind: 24, name: c.name, description: sb.rng.pick(c.d), ...extra };
  if (c.model) p.model = c.model; if (c.solid === false) p.solid = false; if (c.wall) { p.kind = 22; p.solid = false; } if (c.type === 'chest') p.kind = 17; if (c.type === 'altar') p.kind = 18; if (c.type === 'books') p.kind = 21; if (c.type === 'cover') p.kind = 19;
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
    if (fronts.length === 1) cand.push([x, y, fronts[0]]);
  }
  for (const [x, y, [dx, dy]] of sb.rng.shuffle(cand)) {
    if (out.length >= n) break;
    if (sb.props.some(p => Math.abs(p.x - x) + Math.abs(p.y - y) < 2 && (p.solid === false || p.type === 'portal' || p.type === 'door'))) continue;
    const p = mk(sb, key); p.x = x; p.y = y; p.id = sb.nid('wall'); p.rot = dirRot(dx, dy); p.gen = true; sb.props.push(p); out.push(p);
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
  return p;
}
export function plainContainers(sb, r, ctx, theme, count, keys = ['chest', 'crate', 'barrel']) {
  const out = [];
  for (let i = 0; i < count; i++) { const key = sb.rng.pick(keys), found = atWall(sb, r, key, 1)[0] || inside(sb, r, key, 1)[0]; if (found) { stock(sb, found, ctx, theme, { trap: sb.rng.chance(ctx.trapChance ?? .08) }); out.push(found); } }
  return out;
}

// ——— роли комнат ———
// Поверхность пола по роли комнаты (surfaces.js). Только внешний вид, на проходимость не влияет.
const SURF_BY_ROLE = { living: 'planks', bedroom: 'planks', kitchen: 'tiles', hall: 'planks_dark', storage: 'planks_dark', cellar: null, smithy: 'stone_dark', alchemy: 'planks', shop: 'planks', chapel: 'flagstone', guard: 'stone', cells: 'stone_dark', armory: 'stone', warehouse: 'planks_dark', library: 'planks', crypt: 'stone_dark', guardroom: 'stone', treasure: 'flagstone', shrine: 'flagstone', dungeonlib: 'stone', camp: 'dirt', courtyard: 'cobble', greathall: 'flagstone', lord: 'planks' };
function furnishCore(sb, role, r, ctx) {
  const underground = sb.meta.type === 'dungeon', surface = underground && ['storage', 'library', 'living', 'bedroom'].includes(role) ? 'stone' : SURF_BY_ROLE[role]; if (surface) sb.paint(r.x, r.y, r.w, r.h, surface); else if (role === 'cellar') sb.paint(r.x, r.y, r.w, r.h, sb.meta.cellarFloor || 'stone');
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

// ——— оформление комнаты: предметы на столах, настенные и напольные детали, крупные добавки ———
const FLAVOR = { living: 'living', kitchen: 'kitchen', hall: 'hall', alchemy: 'alchemy', shop: 'shop', library: 'study', guard: 'study', lord: 'study', smithy: 'smith', bedroom: 'bedroom', greathall: 'hall', guardroom: 'hall' };
const WALL_POOLS = {
  living: ['painting', 'clock', 'hooks', 'tapestry', 'mirror', 'herbs_hang', 'horseshoe'], bedroom: ['painting', 'mirror', 'tapestry', 'hooks'], kitchen: ['pans', 'herbs_hang', 'jars', 'hooks', 'clock'],
  hall: ['antlers', 'shield', 'tapestry', 'swords', 'painting', 'clock', 'horseshoe'], storage: ['hooks', 'net', 'horseshoe', 'keysboard'], cellar: ['net', 'keysboard', 'hooks'],
  smithy: ['swords', 'shield', 'horseshoe', 'hooks'], alchemy: ['jars', 'herbs_hang', 'map', 'clock'], shop: ['painting', 'keysboard', 'hooks', 'map', 'clock', 'jars'],
  chapel: ['tapestry', 'painting', 'clock'], guard: ['shield', 'swords', 'map', 'noticeboard', 'keysboard'], cells: ['shackles', 'net'], armory: ['shield', 'swords', 'antlers'],
  warehouse: ['net', 'hooks', 'keysboard', 'noticeboard'], library: ['map', 'painting', 'clock', 'jars'], crypt: ['shackles', 'tapestry', 'net'], guardroom: ['shield', 'swords', 'noticeboard'],
  treasure: ['tapestry', 'shield', 'swords'], shrine: ['tapestry', 'shackles'], dungeonlib: ['map', 'jars', 'shackles'], greathall: ['tapestry', 'shield', 'swords', 'antlers', 'painting', 'mirror'], lord: ['tapestry', 'mirror', 'painting', 'clock', 'shield'], courtyard: ['shield', 'noticeboard', 'horseshoe'], camp: ['net'],
};
const FLOOR_POOLS = {
  living: ['basket', 'boots', 'broom', 'rope'], bedroom: ['boots', 'basket'], kitchen: ['bucket', 'sack', 'basket', 'broom', 'rope'], hall: ['sack', 'boots', 'puddle', 'bucket'],
  storage: ['sack', 'rope', 'bucket', 'straw', 'pitchfork', 'basket'], cellar: ['straw', 'puddle', 'rope', 'sack', 'rubble', 'bucket'], smithy: ['bucket', 'rubble', 'shovel', 'sack'],
  alchemy: ['basket', 'bucket', 'sack'], shop: ['basket', 'sack', 'rope'], chapel: ['basket'], guard: ['boots', 'bucket', 'rope'], cells: ['straw', 'bucket', 'rubble', 'puddle'], armory: ['boots', 'rope'],
  warehouse: ['sack', 'rope', 'bucket', 'straw', 'basket', 'wheel'], library: ['basket'], crypt: ['rubble', 'puddle'], guardroom: ['boots', 'bucket', 'rubble'], treasure: ['rubble'],
  shrine: ['rubble'], dungeonlib: ['rubble', 'straw'], courtyard: ['wheel', 'bucket', 'straw', 'rope', 'shovel', 'pitchfork', 'puddle'], camp: ['rope', 'bucket', 'lantern_floor', 'boots', 'sack'],
};
const SOLID_POOLS = {
  kitchen: [['workbench', 'atWall', .5]], smithy: [['workbench', 'atWall', .8], ['sackpile', 'atWall', .4]], storage: [['sackpile', 'atWall', .8], ['cratestack', 'atWall', .6], ['barrelstack', 'atWall', .5], ['haybale', 'atWall', .3]],
  cellar: [['barrelstack', 'atWall', .6], ['cratestack', 'atWall', .5]], warehouse: [['cratestack', 'atWall', .9], ['barrelstack', 'atWall', .8], ['sackpile', 'atWall', .8], ['haybale', 'atWall', .5]],
  bedroom: [['cradle', 'atWall', .18]], living: [['loom', 'atWall', .18], ['bathtub', 'atWall', .1]], chapel: [['pulpit', 'atWall', .8], ['font', 'atWall', .6], ['statue', 'atWall', .5]],
  crypt: [['coffin', 'atWall', .5], ['statue', 'atWall', .4]], cells: [['cage', 'atWall', .5]], greathall: [['throne', 'atWall', .7], ['statue', 'atWall', .5]], lord: [['statue', 'atWall', .3]],
  treasure: [['statue', 'atWall', .5]], shrine: [['statue', 'atWall', .6]], courtyard: [['haybale', 'atWall', .6], ['cratestack', 'atWall', .6], ['barrelstack', 'atWall', .5], ['statue', 'inside', .3]], camp: [['haybale', 'atWall', .4]],
};
export function deco(sb, role, r) {
  const rng = sb.rng, area = r.w * r.h, place = { atWall, inside, anywhere };
  for (const p of sb.props) if (!p.flavor && (p.cat === 'table' || p.cat === 'counter') && p.x >= r.x && p.y >= r.y && p.x < r.x + r.w && p.y < r.y + r.h) p.flavor = FLAVOR[role] || 'default';
  for (const [key, how, chance] of SOLID_POOLS[role] || []) if (rng.chance(chance)) place[how](sb, r, key, 1);
  const wp = WALL_POOLS[role]; if (wp) { const n = Math.min(5, Math.max(1, Math.floor((r.w + r.h) / 5))); for (let i = 0; i < n; i++) wallMount(sb, r, rng.pick(wp), 1); }
  const fp = FLOOR_POOLS[role]; if (fp) { const n = Math.min(6, Math.floor(area / 14) + (rng.chance(.5) ? 1 : 0)); for (let i = 0; i < n; i++) anywhere(sb, r, rng.pick(fp), 1); }
}
// Предельная доля клеток комнаты, занятых крупными предметами. Больше — тесно: по комнате должен ходить отряд.
const COVER = { living: .26, bedroom: .26, kitchen: .3, hall: .27, storage: .36, cellar: .3, smithy: .28, alchemy: .28, shop: .28, chapel: .22, guard: .26, cells: .22, armory: .26, warehouse: .38, library: .3, crypt: .2, guardroom: .22, treasure: .24, shrine: .2, dungeonlib: .22, camp: .1, courtyard: .1, greathall: .22, lord: .26 };
// Что убирать в первую очередь (меньше число = убирается раньше). Не трогаем: жителей, алтари, очаги, кровати, прилавки, контейнеры с добычей, замками и ловушками.
const DROP_ORDER = { chair: 0, stool: 0, bench: 1, planter: 1, barrel: 2, crate: 2, sackpile: 2, cratestack: 2, barrelstack: 2, haybale: 2, pillar: 3, rack: 3, scrolls: 3, bush: 3, tree: 3, signpost: 3, cart: 3, table: 4, wardrobe: 5, shelf: 5 };
export function thin(sb, r, maxCover) {
  const cells = roomCells(sb, r).length, inR = p => p.x >= r.x && p.y >= r.y && p.x < r.x + r.w && p.y < r.y + r.h, kk = p => p.x + ',' + p.y;
  let solid = sb.props.filter(p => inR(p) && sb.occ.get(kk(p)) === p);
  if (solid.length / cells <= maxCover) return;
  const keep = p => p.type === 'npc' || (p.container && p.loot && (p.loot.gold || p.loot.potions || p.loot.gear.length || p.lock || p.trap));
  const drop = sb.rng.shuffle(solid.filter(p => !keep(p) && DROP_ORDER[p.cat] !== undefined && !(p.cat === 'table' && sb.props.some(q => q.cat === 'chair' && Math.abs(q.x - p.x) + Math.abs(q.y - p.y) === 1)))).sort((a, b) => DROP_ORDER[a.cat] - DROP_ORDER[b.cat]);
  for (const p of drop) { if (solid.length / cells <= maxCover) break; sb.props.splice(sb.props.indexOf(p), 1); sb.occ.delete(kk(p)); solid = solid.filter(q => q !== p); sb._reach = null; }
}
export function furnish(sb, role, r, ctx) { furnishCore(sb, role, r, ctx); deco(sb, role, r); if (COVER[role]) thin(sb, r, COVER[role]); }
