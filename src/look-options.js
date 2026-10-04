// Все варианты внешности героя: палитры, причёски, лица, одежда, пресеты. Только данные и чистые функции.
// Используется и клиентом (редактор, модель, портрет), и сервером (validate в hero-rules.js).

const P = list => list.map(([hex, name]) => ({ hex, name }));

export const PALETTES = {
  skin: P([['#f6dcc3', 'Фарфор'], ['#f2d4b4', 'Светлая'], ['#e9bf90', 'Тёплая'], ['#e3bb8a', 'Песочная'], ['#d9a577', 'Загар'], ['#c58d64', 'Медная'], ['#a8714d', 'Бронза'], ['#8b5b42', 'Каштановая'], ['#6b4331', 'Тёмная'], ['#4a2f25', 'Эбеновая'],['#efbc88', 'Оттенок 1'],['#f8dfca', 'Оттенок 2'],['#eac2ad', 'Оттенок 3'],['#d8a17a', 'Оттенок 4'],['#b77a55', 'Оттенок 5'],['#a26a48', 'Оттенок 6'],['#70472f', 'Оттенок 7'],['#533827', 'Оттенок 8']]),
  hair: P([['#1c1b20', 'Чёрный'], ['#26282e', 'Графит'], ['#3a2a22', 'Шоколад'], ['#493024', 'Каштан'], ['#6a432c', 'Орех'], ['#8a5a34', 'Медовый'], ['#a64f35', 'Рыжий'], ['#c4622f', 'Огненный'], ['#b7803c', 'Золотистый'], ['#d9b45a', 'Блонд'], ['#e6cf8a', 'Лён'], ['#c7c4bf', 'Седой'], ['#e8e6ee', 'Белый'], ['#8d8a99', 'Пепел'], ['#4a7fd0', 'Лазурь'], ['#5a3fa8', 'Индиго'], ['#c05a9a', 'Малина'], ['#e07aa8', 'Розовый'], ['#3fa58a', 'Бирюза'], ['#5f9a45', 'Мох'], ['#b02f3d', 'Алый'], ['#3b6a8a', 'Сталь'],['#75462e', 'Оттенок 1'],['#c9c6d7', 'Оттенок 2'],['#d7a652', 'Оттенок 3'],['#352b32', 'Оттенок 4'],['#734c32', 'Оттенок 5'],['#17191f', 'Оттенок 6'],['#f0e9dc', 'Оттенок 7'],['#e0b969', 'Оттенок 8'],['#cb763f', 'Оттенок 9'],['#77352b', 'Оттенок 10'],['#596779', 'Оттенок 11'],['#5d437c', 'Оттенок 12'],['#395c57', 'Оттенок 13'],['#8d526b', 'Оттенок 14'],['#ac86ba', 'Оттенок 15']]),
  eye: P([['#14141a', 'Чёрные'], ['#3a2418', 'Тёмно-карие'], ['#6a4a22', 'Карие'], ['#2f5fa8', 'Синие'], ['#2f7a5a', 'Зелёные'], ['#6a3fa0', 'Фиалковые'], ['#c27a1c', 'Янтарные'], ['#8a8f9a', 'Серые'], ['#b02f3d', 'Рубиновые']]),
  cloth: P([['#24456b', 'Ночной синий'], ['#315e84', 'Синий'], ['#4a7fb0', 'Небесный'], ['#2f7a7a', 'Морская волна'], ['#566d70', 'Сланец'], ['#2d4f2c', 'Хвоя'], ['#3f6b3b', 'Зелёный'], ['#487844', 'Трава'], ['#7a9a4a', 'Олива'], ['#452361', 'Индиго'], ['#5d2f7e', 'Фиолетовый'], ['#62377e', 'Аметист'], ['#8a4a9a', 'Орхидея'], ['#c8688a', 'Роза'], ['#6a2330', 'Бургунд'], ['#8a2f3c', 'Бордовый'], ['#843f37', 'Кирпич'], ['#b0452f', 'Терракота'], ['#c7792f', 'Янтарь'], ['#8a6a46', 'Лен'], ['#2a2a30', 'Уголь'], ['#6c6c76', 'Серый'], ['#e6dcc4', 'Кремовый'], ['#f0ece0', 'Белый'],['#8b3d46', 'Оттенок 1'],['#172b48', 'Оттенок 2'],['#386f9a', 'Оттенок 3'],['#528b91', 'Оттенок 4'],['#244b3b', 'Оттенок 5'],['#74914b', 'Оттенок 6'],['#b28439', 'Оттенок 7'],['#bf6d36', 'Оттенок 8'],['#714c38', 'Оттенок 9'],['#302d38', 'Оттенок 10'],['#aaa69b', 'Оттенок 11'],['#cfbda0', 'Оттенок 12'],['#775b96', 'Оттенок 13'],['#a9617b', 'Оттенок 14'],['#484c74', 'Оттенок 15']]),
  trim: P([['#d0a94a', 'Золото'], ['#c3a04c', 'Старое золото'], ['#e8c870', 'Светлое золото'], ['#b6bdc5', 'Серебро'], ['#8fa0b0', 'Сталь'], ['#c5b895', 'Слоновая кость'], ['#78552e', 'Бронза'], ['#b87333', 'Медь'], ['#b02f3d', 'Алый'], ['#3d8be8', 'Лазурный'], ['#4fb58a', 'Изумруд'], ['#f0ece0', 'Белый'], ['#2a2a30', 'Чёрный'],['#c6a04f', 'Оттенок 1'],['#e4c778', 'Оттенок 2'],['#dbb787', 'Оттенок 3'],['#ad7748', 'Оттенок 4'],['#926749', 'Оттенок 5'],['#d8dce1', 'Оттенок 6'],['#82919d', 'Оттенок 7'],['#526374', 'Оттенок 8'],['#e9dfc7', 'Оттенок 9'],['#b18bbf', 'Оттенок 10'],['#699ca0', 'Оттенок 11'],['#4c5b4c', 'Оттенок 12']]),
  leather: P([['#4b3626', 'Тёмная кожа'], ['#5a3d28', 'Кожа'], ['#6a4a30', 'Светлая кожа'], ['#8a6a46', 'Дублёная'], ['#2a2a30', 'Чёрная'], ['#3a3a44', 'Графитовая'], ['#6a2330', 'Красная'], ['#2d4f2c', 'Зелёная'], ['#24456b', 'Синяя']]),
  gem: P([['#4aa8f0', 'Сапфир'], ['#e0475a', 'Рубин'], ['#4fd08a', 'Изумруд'], ['#a86bf0', 'Аметист'], ['#f0c040', 'Топаз'], ['#40e0d0', 'Бирюза'], ['#f0f0ff', 'Алмаз'], ['#f07ac0', 'Розовый кварц']]),
};
export const hexes = key => PALETTES[key].map(c => c.hex);

const L = list => list.map(([id, name]) => ({ id, name }));
export const OPTIONS = {
  gender: L([['male', 'Мужской'], ['female', 'Женский']]),
  ears: L([['round', 'Обычные'], ['small', 'Маленькие'], ['pointed', 'Острые'], ['long', 'Длинные']]),
  hairStyle: L([['bald', 'Без волос'], ['buzz', 'Ёжик'], ['short', 'Взъерошенные'], ['spiky', 'Шипы'], ['mohawk', 'Ирокез'], ['sweep', 'Косая чёлка'], ['bob', 'Каре'], ['long', 'Длинные'], ['wavy', 'Волны'], ['ponytail', 'Хвост'], ['bun', 'Пучок'], ['twin', 'Два хвоста'], ['braid', 'Коса'], ['curly', 'Кудри']]),
  brows: L([['soft', 'Мягкие'], ['straight', 'Ровные'], ['angry', 'Суровые'], ['raised', 'Приподнятые'], ['thick', 'Густые'], ['thin', 'Тонкие'], ['sad', 'Печальные'], ['none', 'Без бровей']]),
  eyes: L([['dot', 'Точки'], ['wide', 'Широкие'], ['narrow', 'Узкие'], ['happy', 'Радостные'], ['sleepy', 'Сонные'], ['sparkle', 'Блестящие'], ['big', 'Большие']]),
  mouth: L([['smile', 'Улыбка'], ['neutral', 'Спокойный'], ['grin', 'Ухмылка с зубами'], ['smirk', 'Усмешка'], ['open', 'Открытый'], ['cat', 'Кошачий'], ['frown', 'Хмурый']]),
  beard: L([['none', 'Без бороды'], ['stubble', 'Щетина'], ['mustache', 'Усы'], ['goatee', 'Эспаньолка'], ['short', 'Короткая'], ['full', 'Густая'], ['long', 'Длинная'], ['sideburns', 'Бакенбарды']]),
  marks: L([['freckles', 'Веснушки'], ['blush', 'Румянец'], ['scar', 'Шрам'], ['mole', 'Родинка'], ['warpaint', 'Боевая раскраска'], ['plaster', 'Пластырь']]),
  headgear: L([['none', 'Без убора'], ['hood', 'Капюшон'], ['wizhat', 'Шляпа мага'], ['helm', 'Шлем'], ['circlet', 'Диадема'], ['headband', 'Повязка'], ['cap', 'Берет с пером'], ['crown', 'Корона']]),
  cape: L([['none', 'Без плаща'], ['short', 'Короткий плащ'], ['long', 'Длинный плащ'], ['mantle', 'Накидка']]),
  accessories: L([['earring', 'Серьга'], ['eyepatch', 'Повязка на глаз'], ['glasses', 'Очки'], ['scarf', 'Шарф'], ['amulet', 'Амулет'], ['bracers', 'Наручи']]),
};
export const OUTFITS = {
  fighter: L([['plate', 'Латы'], ['tabard', 'Сюрко'], ['leather', 'Кожаный доспех'], ['knight', 'Тяжёлые латы']]),
  wizard: L([['robe', 'Мантия'], ['mantle', 'С воротником'], ['sash', 'С кушаком'], ['scholar', 'Учёный жилет']]),
  rogue: L([['leathers', 'Кожа с перевязью'], ['vest', 'Жилет'], ['tunic', 'Туника'], ['studded', 'Клёпаный доспех']]),
  cleric: L([['vestments', 'Облачение'], ['surplice', 'Стихарь'], ['mail', 'Кольчуга'], ['monk', 'Ряса с верёвкой']]),
};
export const DEFAULT_OUTFIT = { fighter: 'plate', wizard: 'robe', rogue: 'leathers', cleric: 'vestments' };
export const COLOR_FIELDS = { skin: 'skin', hair: 'hair', hair2: 'hair', brow: 'hair', eye: 'eye', beardColor: 'hair', cloth: 'cloth', cloth2: 'cloth', trim: 'trim', leather: 'leather', accent: 'cloth', hat: 'cloth', capeColor: 'cloth', gem: 'gem' };
export const NULLABLE = ['hair2', 'brow', 'beardColor', 'cloth2', 'accent', 'hat', 'capeColor'];
export const ALLOWED_KEYS = new Set(['gender', 'ears', 'hairStyle', 'brows', 'eyes', 'mouth', 'beard', 'marks', 'headgear', 'cape', 'accessories', 'outfit', 'face', 'hood', ...Object.keys(COLOR_FIELDS)]);

// Облик по умолчанию для класса и пола (из эталонного листа).
const BASE = { ears: 'round', eyes: 'dot', mouth: 'smile', beard: 'none', marks: [], headgear: 'none', accessories: [], skin: '#e9bf90', hair2: null, brow: null, beardColor: null, cloth2: null, accent: null, hat: null, capeColor: null, eye: '#14141a', trim: '#d0a94a', gem: '#4aa8f0' };
const CLASS_DEFAULT = {
  fighter: { cloth: '#315e84', leather: '#5a3d28', male: { hair: '#493024', hairStyle: 'short', brows: 'angry' }, female: { hair: '#d9b45a', hairStyle: 'ponytail', brows: 'soft' } },
  wizard: { cloth: '#5d2f7e', leather: '#5a3d28', male: { hair: '#c7c4bf', hairStyle: 'short', brows: 'angry' }, female: { hair: '#c7c4bf', hairStyle: 'wavy', brows: 'soft' } },
  rogue: { cloth: '#3f6b3b', leather: '#6a4a30', cape: 'short', male: { hair: '#26282e', hairStyle: 'bun', brows: 'angry' }, female: { hair: '#6a432c', hairStyle: 'bob', brows: 'soft' } },
  cleric: { cloth: '#8a2f3c', leather: '#5a3d28', male: { hair: '#493024', hairStyle: 'bald', brows: 'angry', beard: 'full' }, female: { hair: '#c7c4bf', hairStyle: 'long', brows: 'soft', headgear: 'hood' } },
};
export function defaultLook(classId, gender = 'male') {
  const c = CLASS_DEFAULT[classId] || CLASS_DEFAULT.fighter, g = c[gender === 'female' ? 'female' : 'male'];
  return { ...structuredCopy(BASE), gender: gender === 'female' ? 'female' : 'male', cloth: c.cloth, leather: c.leather, cape: c.cape || 'none', outfit: DEFAULT_OUTFIT[classId] || 'plate', ...g };
}
const structuredCopy = o => JSON.parse(JSON.stringify(o));

// Достраивает старые сохранения (face/hood/hairStyle) до полной внешности. Ничего не пишет в исходный объект.
export function normalize(ap, classId) {
  ap = ap || {};
  const gender = ap.gender === 'female' ? 'female' : 'male', d = defaultLook(classId, gender), out = { ...d };
  for (const k of Object.keys(ap)) if (ap[k] !== undefined && ALLOWED_KEYS.has(k)) out[k] = ap[k];
  const legacy = ap.brows === undefined && ap.face !== undefined;
  if (legacy) {
    out.brows = ap.face === 'soft' ? 'soft' : 'angry';
    if (ap.beard === undefined) out.beard = ap.face === 'beard' ? 'full' : 'none';
    if (ap.headgear === undefined) out.headgear = ap.hood ? 'hood' : 'none';
  } else if (ap.hood && ap.headgear === undefined) out.headgear = 'hood';
  if (legacy && ap.hairStyle === 'short' && gender === 'female') out.hairStyle = 'bob';
  if (legacy && ap.hairStyle === 'long' && gender === 'male') out.hairStyle = 'bun';
  if (!OUTFITS[classId]?.some(o => o.id === out.outfit)) out.outfit = DEFAULT_OUTFIT[classId] || 'plate';
  if (!Array.isArray(out.marks)) out.marks = [];
  if (!Array.isArray(out.accessories)) out.accessories = [];
  return out;
}

export function validateAppearance(ap, classId) {
  if (!ap || typeof ap !== 'object' || Array.isArray(ap)) throw Error('Выберите внешний вид.');
  for (const k of Object.keys(ap)) if (!ALLOWED_KEYS.has(k)) throw Error('Неизвестная деталь внешности: ' + k + '.');
  for (const [k, pal] of Object.entries(COLOR_FIELDS)) {
    const v = ap[k];
    if (v === undefined || (v === null && NULLABLE.includes(k))) continue;
    if (!hexes(pal).includes(v)) throw Error('Недопустимый цвет: ' + k + '.');
  }
  for (const k of ['gender', 'ears', 'hairStyle', 'brows', 'eyes', 'mouth', 'beard', 'headgear', 'cape']) if (ap[k] !== undefined && !OPTIONS[k].some(o => o.id === ap[k])) throw Error('Недопустимый вариант: ' + k + '.');
  if (ap.outfit !== undefined && !OUTFITS[classId]?.some(o => o.id === ap.outfit)) throw Error('Этот наряд не подходит классу.');
  for (const k of ['marks', 'accessories']) if (ap[k] !== undefined && (!Array.isArray(ap[k]) || ap[k].length > OPTIONS[k].length || new Set(ap[k]).size !== ap[k].length || ap[k].some(v => !OPTIONS[k].some(o => o.id === v)))) throw Error('Недопустимый вариант: ' + k + '.');
  if (ap.face !== undefined && !['soft', 'stern', 'beard'].includes(ap.face)) throw Error('Выберите лицо.');
  if (ap.hood !== undefined && typeof ap.hood !== 'boolean') throw Error('Выберите головной убор.');
}

export function randomLook(classId, gender, rnd = Math.random) {
  const pick = list => list[Math.floor(rnd() * list.length)], chance = p => rnd() < p;
  const ap = defaultLook(classId, gender), male = gender !== 'female';
  ap.skin = pick(hexes('skin')); ap.ears = pick(OPTIONS.ears.map(o => o.id).concat(['round', 'round', 'round']));
  ap.hairStyle = pick(OPTIONS.hairStyle.filter(o => male || o.id !== 'bald').map(o => o.id));
  ap.hair = pick(hexes('hair').slice(0, chance(.75) ? 14 : 22)); ap.hair2 = chance(.18) ? pick(hexes('hair')) : null;
  ap.brows = pick(OPTIONS.brows.slice(0, 7).map(o => o.id)); ap.eyes = pick(OPTIONS.eyes.map(o => o.id)); ap.mouth = pick(OPTIONS.mouth.map(o => o.id));
  ap.eye = chance(.5) ? '#14141a' : pick(hexes('eye'));
  ap.beard = male && chance(.55) ? pick(OPTIONS.beard.map(o => o.id)) : 'none';
  ap.marks = OPTIONS.marks.map(o => o.id).filter(() => chance(.18));
  ap.cloth = chance(.5) ? CLASS_DEFAULT[classId].cloth : pick(hexes('cloth')); ap.cloth2 = chance(.3) ? pick(hexes('cloth')) : null;
  ap.trim = pick(hexes('trim')); ap.leather = pick(hexes('leather')); ap.gem = pick(hexes('gem'));
  ap.outfit = pick(OUTFITS[classId].map(o => o.id));
  ap.headgear = chance(.4) ? pick(OPTIONS.headgear.map(o => o.id)) : 'none'; ap.hat = ap.headgear !== 'none' && chance(.4) ? pick(hexes('cloth')) : null;
  ap.cape = chance(.4) ? pick(OPTIONS.cape.map(o => o.id)) : 'none'; ap.capeColor = ap.cape !== 'none' && chance(.5) ? pick(hexes('cloth')) : null;
  ap.accessories = OPTIONS.accessories.map(o => o.id).filter(() => chance(.14)).slice(0, 3);
  ap.accent = chance(.3) ? pick(hexes('cloth')) : null;
  return ap;
}

// Готовые образы. Применяются поверх облика класса и пола.
export const PRESETS = {
  fighter: [
    { name: 'Страж рассвета', gender: 'male', patch: {} },
    { name: 'Золотая валькирия', gender: 'female', patch: {} },
    { name: 'Железный ветеран', gender: 'male', patch: { outfit: 'knight', headgear: 'helm', beard: 'full', marks: ['scar'], hair: '#c7c4bf', cape: 'long', capeColor: '#6a2330', trim: '#b6bdc5' } },
    { name: 'Рыжая рыцарша', gender: 'female', patch: { hairStyle: 'braid', hair: '#c4622f', outfit: 'tabard', cloth: '#8a2f3c', marks: ['freckles'], cape: 'mantle', eye: '#2f7a5a', eyes: 'sparkle' } },
    { name: 'Тень ордена', gender: 'male', patch: { hairStyle: 'mohawk', hair: '#1c1b20', cloth: '#2a2a30', trim: '#b6bdc5', outfit: 'leather', accessories: ['eyepatch', 'earring'], brows: 'thick', skin: '#a8714d' } },
  ],
  wizard: [
    { name: 'Звёздочёт', gender: 'male', patch: {} },
    { name: 'Лунная чародейка', gender: 'female', patch: {} },
    { name: 'Огненный адепт', gender: 'male', patch: { hairStyle: 'spiky', hair: '#c4622f', cloth: '#b0452f', cloth2: '#6a2330', gem: '#e0475a', accessories: ['glasses'], mouth: 'smirk', outfit: 'scholar', eyes: 'sparkle' } },
    { name: 'Лесная ведунья', gender: 'female', patch: { hairStyle: 'braid', hair: '#5f9a45', cloth: '#2d4f2c', ears: 'pointed', headgear: 'circlet', gem: '#4fd08a', trim: '#c5b895', eye: '#2f7a5a', outfit: 'mantle' } },
    { name: 'Старый архимаг', gender: 'male', patch: { hairStyle: 'long', hair: '#e8e6ee', beard: 'long', headgear: 'wizhat', cloth: '#452361', outfit: 'sash', brows: 'thick', gem: '#a86bf0', eyes: 'sleepy', skin: '#f2d4b4' } },
  ],
  rogue: [
    { name: 'Следопыт', gender: 'male', patch: {} },
    { name: 'Тёмная лисица', gender: 'female', patch: {} },
    { name: 'Ночной клинок', gender: 'male', patch: { headgear: 'hood', cloth: '#2a2a30', cape: 'long', accessories: ['scarf'], accent: '#6a2330', eye: '#6a3fa0', hair: '#1c1b20', hairStyle: 'sweep', trim: '#8fa0b0', brows: 'angry' } },
    { name: 'Ярмарочная плутовка', gender: 'female', patch: { hairStyle: 'twin', hair: '#e07aa8', headgear: 'cap', hat: '#b0452f', outfit: 'vest', marks: ['freckles', 'blush'], eyes: 'happy', mouth: 'grin', accessories: ['earring'], cape: 'none' } },
    { name: 'Старый вор', gender: 'male', patch: { hairStyle: 'buzz', hair: '#c7c4bf', beard: 'goatee', outfit: 'tunic', accessories: ['eyepatch'], marks: ['scar'], mouth: 'smirk', cape: 'none', skin: '#d9a577' } },
  ],
  cleric: [
    { name: 'Брат-хранитель', gender: 'male', patch: {} },
    { name: 'Сестра света', gender: 'female', patch: {} },
    { name: 'Седой исповедник', gender: 'male', patch: { hairStyle: 'long', hair: '#e8e6ee', beard: 'long', cloth: '#f0ece0', cloth2: '#e6dcc4', outfit: 'surplice', headgear: 'circlet', eye: '#c27a1c', brows: 'thick', trim: '#d0a94a' } },
    { name: 'Рыжая послушница', gender: 'female', patch: { hairStyle: 'ponytail', hair: '#a64f35', headgear: 'headband', hat: '#e6dcc4', outfit: 'surplice', cloth: '#e6dcc4', cloth2: '#8a2f3c', marks: ['freckles', 'blush'], eyes: 'sparkle', eye: '#2f7a5a' } },
    { name: 'Воин-монах', gender: 'male', patch: { hairStyle: 'bald', beard: 'none', outfit: 'monk', cloth: '#c7792f', cloth2: '#8a6a46', accessories: ['bracers'], marks: ['scar'], skin: '#8b5b42', brows: 'thick', mouth: 'neutral' } },
  ],
};
export function presetLook(classId, preset) {
  const ap = { ...defaultLook(classId, preset.gender), ...structuredCopy(preset.patch) };
  return ap;
}

// Вкладки редактора: что показывать и как.
export const TABS = [
  { id: 'looks', name: 'Образы' },
  { id: 'face', name: 'Лицо' },
  { id: 'hair', name: 'Волосы' },
  { id: 'outfit', name: 'Одежда' },
  { id: 'extras', name: 'Детали' },
];
export const GROUPS = {
  face: [
    { key: 'skin', title: 'Цвет кожи', type: 'swatch' },
    { key: 'eyes', title: 'Глаза', type: 'tiles', view: 'face' },
    { key: 'eye', title: 'Цвет глаз', type: 'swatch' },
    { key: 'brows', title: 'Брови', type: 'tiles', view: 'face' },
    { key: 'brow', title: 'Цвет бровей', type: 'swatch', follow: 'как волосы' },
    { key: 'mouth', title: 'Рот', type: 'tiles', view: 'face' },
    { key: 'beard', title: 'Борода и усы', type: 'tiles', view: 'face', maleFirst: true },
    { key: 'beardColor', title: 'Цвет бороды', type: 'swatch', follow: 'как волосы' },
    { key: 'ears', title: 'Уши', type: 'tiles', view: 'head' },
    { key: 'marks', title: 'Знаки на лице', type: 'multi', view: 'face' },
  ],
  hair: [
    { key: 'hairStyle', title: 'Причёска', type: 'tiles', view: 'head' },
    { key: 'hair', title: 'Цвет волос', type: 'swatch' },
    { key: 'hair2', title: 'Прядь и кончики', type: 'swatch', follow: 'нет' },
  ],
  outfit: [
    { key: 'outfit', title: 'Наряд', type: 'tiles', view: 'body', byClass: true },
    { key: 'cloth', title: 'Основной цвет', type: 'swatch' },
    { key: 'cloth2', title: 'Дополнительный цвет', type: 'swatch', follow: 'авто' },
    { key: 'trim', title: 'Отделка', type: 'swatch' },
    { key: 'leather', title: 'Кожа, пояс и сапоги', type: 'swatch' },
    { key: 'gem', title: 'Цвет самоцветов', type: 'swatch' },
  ],
  extras: [
    { key: 'headgear', title: 'Головной убор', type: 'tiles', view: 'hat' },
    { key: 'hat', title: 'Цвет убора', type: 'swatch', follow: 'авто' },
    { key: 'cape', title: 'Плащ', type: 'tiles', view: 'body', back: true },
    { key: 'capeColor', title: 'Цвет плаща', type: 'swatch', follow: 'авто' },
    { key: 'accessories', title: 'Украшения', type: 'multi', view: 'head' },
    { key: 'accent', title: 'Цвет акцентов', type: 'swatch', follow: 'авто' },
  ],
};
