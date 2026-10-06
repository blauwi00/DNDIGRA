// Единый источник правды для внешнего вида персонажей: 3D-модель и 2D-портрет строятся из одного списка боксов.
// Правила стиля: CHARACTER_STYLE.md. Тест: tests/characters.mjs. Варианты внешности: src/look-options.js.
// Модель: [x, y, z, w, h, d, цвет, светится?]. Перед моделью +z, высота ~1.3, подставку рисует рендер.
import { PALETTES, OPTIONS, OUTFITS, GROUPS, TABS, PRESETS, COLOR_FIELDS, defaultLook, normalize, randomLook, presetLook, validateAppearance } from './look-options.js';
import { texelPass, shade, TEXEL } from './texel.js';
export { shade, TEXEL };
export { PALETTES, OPTIONS, OUTFITS, GROUPS, TABS, PRESETS, COLOR_FIELDS, defaultLook, normalize, randomLook, presetLook, validateAppearance };

export const RULES = {
  headMinRatio: .34, headMaxRatio: .46, // доля головы от высоты фигуры
  maxBoxes: 200,                        // бюджет боксов фигуры без текселей
  maxWithTexels: 520,                   // бюджет вместе с текселями-наклейками (правило «тексели», src/texel.js)
  texel: true,
  defaultEye: 0x14141a,
  outline: '#1b1620',
  classes: ['fighter', 'rogue', 'wizard', 'cleric'],
  genders: ['male', 'female'],
};
export const CLASS_KIND = { fighter: 2, wizard: 1, rogue: 0, cleric: 5 };

// Палитра по классам (из эталонного листа): воин — синий/золото, маг — фиолет/золото, плут — зелёный/коричневый, жрец — бордовый/кремовый.
export const PALETTE = {
  fighter: { cloth: 0x315e84, dark: 0x24456b, trim: 0xd0a94a, boots: 0x4b3626, belt: 0x5a3d28 },
  wizard: { cloth: 0x5d2f7e, dark: 0x452361, trim: 0xd0a94a, boots: 0x4b3626, belt: 0x5a3d28, gem: 0x3d8be8 },
  rogue: { cloth: 0x3f6b3b, dark: 0x2d4f2c, trim: 0xc3a04c, boots: 0x4b3626, belt: 0x6a4a30, leather: 0x6a4a30 },
  cleric: { cloth: 0x8a2f3c, dark: 0x6a2330, trim: 0xd0a94a, boots: 0x4b3626, belt: 0x5a3d28, cream: 0xeadfc3, green: 0x3f5b3f },
};
const STEEL = 0xc5ccd0, MAIL = 0x8a929a, WOOD = 0x6a4a30, IRON = 0x9aa0a3, CREAM = 0xeadfc3, GREEN = 0x3f5b3f, LIP = 0x9b5a46, MOUTH = 0x4a1f1a, TEETH = 0xf4f0e6, INK = 0x1a1a1f, WHITE = 0xffffff;

const KIND_TO_CLASS = { 0: 'rogue', 1: 'wizard', 2: 'fighter', 5: 'cleric' };
const KIND_GENDER = { 0: 'male', 1: 'female', 2: 'male' }; // стартовые Эльдар, Мира, Бор
const DEFAULT_HANDS = { fighter: ['sword', 'shield'], rogue: ['sword', 'empty'], wizard: ['staff', 'empty'], cleric: ['staff', 'empty'] };

// Реестр NPC. Новый NPC обязан быть здесь: тест tests/characters.mjs сверяет его с props сцен.
// look — любые поля внешности из look-options.js поверх облика класса и пола.
export const NPCS = {
 innkeeper: {name:'Брам',role:'трактирщик',classId:'fighter',gender:'male',look:{hair:'#6a432c',hairStyle:'short',beard:'none',cloth:'#843f37'},hands:['empty','empty']},
 'street-guard': {name:'Рада',role:'стражница',classId:'fighter',gender:'female',look:{hair:'#6a432c',hairStyle:'braid',cloth:'#315e84'},hands:['sword','shield']},
  keeper: { name: 'Эллен', role: 'хранительница', classId: 'cleric', gender: 'female', look: { hair: '#c7c4bf', hairStyle: 'long', brows: 'soft', headgear: 'hood' }, hands: ['empty', 'empty'], book: true },
  novice: { name: 'Лин', role: 'послушник', classId: 'cleric', gender: 'male', look: { hair: '#6a432c', hairStyle: 'short', brows: 'soft', beard: 'none', cloth: '#843f37' }, hands: ['empty', 'empty'] },
};
export const NPC_BY_NAME = Object.fromEntries(Object.entries(NPCS).map(([id, n]) => [n.name, id]));

const num = v => typeof v === 'number' ? v : (typeof v === 'string' && /^#[0-9a-f]{6}$/i.test(v) ? parseInt(v.slice(1), 16) : undefined);
const mix = (a, b, t) => (shade(a, 1 - t) + shade(b, t)) & 0xffffff;

// Нормализует героя, NPC или стартового члена отряда в спецификацию внешности. null — для врагов и манекенов.
export function spec(kind, actor) {
  const gen=actor?.gen && typeof actor.gen==='object'?actor.gen:null;
  const rawNpcId=gen?null:actor?.npc||actor?.npcId;const npcId = ({ellen:'keeper',lin:'novice'})[rawNpcId]||rawNpcId|| (actor && actor.id && NPCS[actor.id] && actor.type === 'npc' ? actor.id : null);
  if(npcId&&!Object.hasOwn(NPCS,npcId))throw Error('NPC must be registered: '+npcId);const npc = gen || (npcId ? NPCS[npcId] : null);
  const classId = npc?.classId || (RULES.classes.includes(actor?.classId) ? actor.classId : KIND_TO_CLASS[kind]);
  if (!classId) return null;
  let ap;
  if (npc) ap = normalize({ ...defaultLook(classId, npc.gender), ...npc.look, gender: npc.gender }, classId);
  else if (actor?.appearance) ap = normalize(actor.appearance, classId);
  else ap = normalize({ gender: KIND_GENDER[kind] || 'male' }, classId);
  const p = PALETTE[classId], cloth = num(ap.cloth) ?? p.cloth, leather = num(ap.leather) ?? p.belt, hair = num(ap.hair) ?? 0x493024;
  return {
    classId, gender: ap.gender, npc: npcId, outfit: ap.outfit, hairStyle: ap.hairStyle, ears: ap.ears, brows: ap.brows, eyes: ap.eyes, mouth: ap.mouth, beard: ap.beard,
    marks: ap.marks, headgear: ap.headgear, cape: ap.cape, accessories: ap.accessories,
    skin: num(ap.skin) ?? 0xe9bf90, hair, hair2: num(ap.hair2) ?? null, brow: num(ap.brow) ?? shade(hair, .85), eye: num(ap.eye) ?? RULES.defaultEye,
    beardC: num(ap.beardColor) ?? hair, cloth, cloth2: num(ap.cloth2) ?? (cloth === p.cloth ? p.dark : shade(cloth, .78)), trim: num(ap.trim) ?? p.trim,
    leather, boots: shade(leather, .83), gem: num(ap.gem) ?? 0x4aa8f0, accent: num(ap.accent) ?? null, markC: num(ap.markColor) ?? null, hat: num(ap.hat) ?? null, capeC: num(ap.capeColor) ?? shade(cloth, .86),
    hands: npc?.hands || actor?.hands || DEFAULT_HANDS[classId], book: !!npc?.book, p,
  };
}

// Строит список боксов фигуры. Чибимасштаб: большая голова (~40%), короткие конечности, плоское лицо.
export function build(s, opts = {}) {
  const out = [], B = (x, y, z, w, h, d, c, e = false) => out.push([x, y, z, w, h, d, c, e]);
  const female = s.gender === 'female', robe = s.classId === 'wizard' || s.classId === 'cleric';
  const bw = female ? .29 : .41, arm = bw / 2 + (female ? .055 : .08), aw = female ? .1 : .14, o = s.outfit, cls = s.classId, trim = s.trim, cloth = s.cloth, c2 = s.cloth2;
  const sleeve = o === 'vest' || o === 'scholar' || o === 'surplice' ? CREAM : o === 'mail' || o === 'tabard' ? MAIL : cloth;
  const torso = o === 'mail' || o === 'tabard' ? MAIL : o === 'leather' || o === 'studded' ? s.leather : o === 'surplice' ? CREAM : cloth;
  // Ноги, подол
  if (robe) {
    const rw = female ? bw + .22 : bw + .06;
    B(0, .31, 0, rw, .3, .3, o === 'surplice' ? CREAM : cloth); B(0, .17, 0, rw + .02, .045, .32, trim);
    for (const sx of [-1, 1]) B(sx * .1, .14, .07, .14, .06, .16, s.boots);
  } else {
    for (const sx of [-1, 1]) { B(sx * .1, .2, .03, .15, .13, .2, s.boots); B(sx * .1, .32, .02, .14, .1, .15, c2); }
    if (female) { B(0, .37, 0, .46, .12, .3, c2); B(0, .305, 0, .48, .028, .32, trim); } // юбка: женский силуэт читается сразу
  }
  // Торс, пояс, руки
  B(0, .56, 0, bw, .26, .25, torso);
  B(0, .43, 0, bw + .02, .05, .27, o === 'monk' ? 0xc8b88a : s.leather); B(0, .43, .14, .08, .065, .03, cls === 'wizard' ? s.gem : trim);
  for (const sx of [-1, 1]) { B(sx * arm, .55, 0, aw, .24, female ? .15 : .18, sleeve); B(sx * arm, .4, .02, aw - .02, .08, female ? .1 : .12, s.skin); }
  // Голова, уши, лицо
  B(0, .9, .02, .46, .42, .4, s.skin);
  face(B, s);
  hair(B, s);
  ears(B, s);
  if (s.beard !== 'none') beard(B, s);
  marks(B, s);
  // Наряд по классу, плащ, головной убор, украшения, предметы в руках
  OUTFIT[cls](B, s, bw, arm, o);
  if (s.cape !== 'none') cape(B, s, bw);
  headgear(B, s);
  accessories(B, s, bw, arm);
  held(B, s, arm, trim);
  if (opts.texel ?? RULES.texel) out.push(...texelPass(out, texelRole(s)));
  return out;
}

// Какой материал у цвета — от этого зависят пряди, складки и блики в src/texel.js.
function texelRole(s) {
  const hair = [s.hair, s.hair2, s.beardC, s.brow], metal = [STEEL, MAIL, IRON, s.trim], cloth = [s.cloth, s.cloth2, s.capeC, s.hat, s.accent, CREAM, GREEN];
  return c => c === s.skin ? 'skin' : hair.includes(c) ? 'hair' : metal.includes(c) ? 'metal' : cloth.includes(c) ? 'cloth' : 'other';
}

function face(B, s) {
  const E = s.eye, dark = RULES.defaultEye, colored = E !== dark, patch = s.accessories.includes('eyepatch'), fem = s.gender === 'female', lip = fem ? 0xc85a6a : LIP;
  for (const sx of [-1, 1]) {
    if (patch && sx === -1) continue;
    const x = sx * .1;
    switch (s.eyes) {
      case 'wide': B(x, .89, .226, .085, .075, .012, E); if (colored) B(x, .89, .232, .035, .045, .012, dark); break;
      case 'narrow': B(x, .885, .226, .08, .04, .012, E); break;
      case 'happy': B(x, .885, .226, .09, .025, .012, E); B(x - .045, .862, .226, .025, .025, .012, E); B(x + .045, .862, .226, .025, .025, .012, E); break;
      case 'sleepy': B(x, .88, .226, .07, .055, .012, E); B(x, .915, .228, .085, .028, .012, shade(s.skin, .82)); break;
      case 'sparkle': B(x, .895, .226, .075, .1, .012, E); if (colored) B(x, .88, .232, .035, .05, .012, dark); B(x + .016, .92, .234, .022, .026, .012, WHITE); break;
      case 'big': B(x, .885, .226, .09, .11, .012, E); if (colored) B(x, .875, .232, .04, .055, .012, dark); B(x + .018, .915, .234, .03, .03, .012, WHITE); break;
      default: B(x, .89, .226, .06, .085, .012, E);
    }
  }
  if (fem) for (const sx of [-1, 1]) { // ресницы, лёгкий румянец
    if (!(patch && sx === -1)) { B(sx * .155, .935, .227, .035, .03, .012, INK); if (s.eyes !== 'happy') B(sx * .1, .942, .227, .09, .014, .012, INK); }
    B(sx * .15, .815, .226, .06, .035, .012, mix(s.skin, 0xe58a8a, .35));
  }
  if (patch) { B(-.1, .89, .232, .13, .11, .014, INK); B(0, .985, .226, .47, .022, .014, INK); }
  B(0, .845, .226, .04, .05, .012, shade(s.skin, .9)); // нос
  const br = (x, y, w, h) => B(x, y, .226, w, h, .012, s.brow);
  for (const sx of [-1, 1]) {
    switch (s.brows) {
      case 'soft': br(sx * .1, .955, .08, .018); break;
      case 'straight': br(sx * .1, .955, .1, .03); break;
      case 'angry': br(sx * .075, .94, .06, .03); br(sx * .14, .965, .06, .03); break;
      case 'raised': br(sx * .1, .99, .09, .028); break;
      case 'thick': br(sx * .1, .955, .11, .045); break;
      case 'thin': br(sx * .1, .96, .1, .014); break;
      case 'sad': br(sx * .075, .965, .06, .025); br(sx * .14, .945, .06, .025); break;
      default:
    }
  }
  const m = (x, y, w, h, c = lip, z = .236) => B(x, y, z, w, h, .012, c);
  switch (s.mouth) {
    case 'neutral': m(0, .785, .08, .02); break;
    case 'grin': m(0, .78, .14, .04, MOUTH); m(0, .796, .12, .016, TEETH, .238); m(-.075, .8, .022, .022); m(.075, .8, .022, .022); break;
    case 'smirk': m(-.01, .78, .07, .02); m(.05, .79, .04, .02); m(.08, .806, .022, .022); break;
    case 'open': m(0, .775, .06, .05, MOUTH); m(0, .762, .04, .018, 0xc0505a, .238); break;
    case 'cat': m(-.035, .775, .045, .02); m(.035, .775, .045, .02); m(0, .79, .025, .03); break;
    case 'frown': m(0, .78, .08, .02); m(-.05, .765, .022, .022); m(.05, .765, .022, .022); break;
    default: m(0, .78, fem ? .105 : .09, fem ? .028 : .02); m(-.055, .795, .022, .022); m(.055, .795, .022, .022);
  }
}

function ears(B, s) {
  for (const sx of [-1, 1]) {
    if (s.ears === 'small') B(sx * .235, .88, .02, .03, .07, .06, s.skin);
    else if (s.ears === 'pointed') { B(sx * .255, .9, .02, .06, .1, .06, s.skin); B(sx * .285, .96, .02, .04, .07, .05, s.skin); }
    else if (s.ears === 'long') { B(sx * .26, .9, .02, .07, .09, .06, s.skin); B(sx * .31, .97, .02, .05, .09, .05, s.skin); B(sx * .34, 1.04, .02, .04, .07, .05, s.skin); }
    else B(sx * .24, .88, .02, .04, .09, .07, s.skin);
  }
}

function beard(B, s) {
  const b = s.beardC, st = mix(s.skin, b, .3);
  const jaw = () => { B(0, .75, .205, .34, .15, .05, b); for (const sx of [-1, 1]) B(sx * .17, .83, .2, .05, .2, .05, b); };
  const cheeks = () => { for (const sx of [-1, 1]) B(sx * .21, .8, .12, .05, .26, .2, b); B(0, .818, .238, .18, .03, .04, b); };
  switch (s.beard) {
    case 'stubble': B(0, .745, .221, .42, .1, .012, st); B(0, .815, .221, .3, .035, .012, st); break;
    case 'mustache': B(0, .818, .238, .2, .04, .04, b); for (const sx of [-1, 1]) B(sx * .115, .8, .236, .04, .05, .04, b); break;
    case 'goatee': B(0, .74, .228, .1, .12, .04, b); B(0, .818, .238, .14, .03, .04, b); break;
    case 'short': jaw(); break;
    case 'full': jaw(); cheeks(); break;
    case 'long': jaw(); cheeks(); B(0, .6, .2, .3, .2, .07, b); B(0, .48, .2, .2, .14, .06, b); break;
    case 'sideburns': for (const sx of [-1, 1]) { B(sx * .225, .88, .19, .04, .22, .07, b); B(sx * .2, .82, .2, .05, .1, .05, b); } break;
    default:
  }
}

function marks(B, s) {
  const has = k => s.marks.includes(k), z = .229, P = .03; // P — размер «пикселя» знака
  // Знаки не лезут на глаза: глаза занимают y .83–.94 и x .06–.15 с каждой стороны, поэтому знаки на щеках начинаются ниже .82, а на брови — выше .945.
  const px = (x, y, c, w = P, h = P) => B(x, y, z, w, h, .012, c);
  const scarC = s.markC ?? mix(s.skin, 0xb5403f, .55), scarEdge = mix(s.skin, 0xffffff, .38);
  if (has('freckles')) for (const sx of [-1, 1]) for (const [x, y] of [[.08, .835], [.125, .84], [.105, .815], [.15, .82]]) px(sx * x, y, 0x9a6a46, .02, .02);
  if (has('blush')) for (const sx of [-1, 1]) B(sx * .15, .812, z, .07, .04, .012, 0xe08a7a);
  if (has('scar')) for (const [x, y] of [[-.178, .812], [-.158, .784], [-.138, .756], [-.118, .728]]) { px(x + .024, y, scarEdge, .014, P); px(x, y, scarC); } // диагональный шрам на левой щеке
  if (has('browscar')) { for (const [x, y] of [[-.13, 1.03], [-.122, 1.0], [-.114, .97]]) { px(x + .022, y, scarEdge, .012, P); px(x, y, scarC, .026, P); } px(-.152, .985, scarC, .026, .014); px(-.1, .985, scarC, .026, .014); } // через левую бровь, выше глаза
  if (has('mole')) px(.075, .775, 0x4a2f25, .022, .022);
  if (has('warpaint')) { // «когти»: две диагональные полосы на каждой щеке
    const c = s.markC ?? 0xb02f3d;
    for (const sx of [-1, 1]) for (const off of [0, .045]) for (let i = 0; i < 3; i++) px(sx * (.175 - off - i * .022), .812 - i * .03, c, .034, P);
  }
  if (has('plaster')) { B(0, .835, z, .072, .03, .012, 0xf0e4cc); B(0, .835, .23, .032, .075, .012, 0xf0e4cc); B(0, .835, .232, .018, .018, .012, mix(0xf0e4cc, 0xb59a6a, .5)); }
}

// Причёски: top — макушка, front — чёлка, low — боковые и задние пряди. Под шлемом и капюшоном часть прячется.
function hair(B, s) {
  const h = s.hair, t = s.hair2 || h, st = s.hairStyle, hg = s.headgear;
  if (st === 'bald' || hg === 'hood') return;
  const top = [], front = [], low = [], H = (arr, x, y, z, w, hh, d, c = h) => arr.push([x, y, z, w, hh, d, c]);
  const cap = () => H(top, 0, 1.13, 0, .5, .1, .46);
  const fringe = () => { H(front, 0, 1.06, .21, .48, .07, .06); for (const sx of [-1, 1]) H(front, sx * .2, 1.0, .21, .08, .12, .06); };
  const sides = (hh = .24, y = .98) => { for (const sx of [-1, 1]) H(low, sx * .26, y, 0, .05, hh, .42); };
  let backZ = -.255;
  switch (st) {
    case 'buzz': H(top, 0, 1.125, 0, .48, .07, .43); H(front, 0, 1.07, .205, .46, .07, .04); for (const sx of [-1, 1]) H(low, sx * .245, .99, 0, .02, .16, .38); backZ = -.2; break;
    case 'short': cap(); fringe(); sides(); H(low, 0, .93, -.22, .5, .38, .07); H(top, -.1, 1.2, .02, .16, .08, .22); H(top, .12, 1.21, -.06, .16, .1, .16); H(top, 0, 1.19, .13, .2, .05, .1); break;
    case 'spiky': cap(); fringe(); sides(.2, 1.0); H(low, 0, .95, -.22, .5, .32, .07); for (const [x, y, z, w, hh] of [[-.18, 1.2, .06, .1, .14], [-.06, 1.23, .08, .1, .2], [.06, 1.23, 0, .1, .2], [.18, 1.2, -.04, .1, .14], [0, 1.2, -.14, .12, .14]]) H(top, x, y, z, w, hh, .1); break;
    case 'mohawk': H(top, 0, 1.22, 0, .12, .22, .42); H(top, 0, 1.35, -.05, .12, .08, .26); H(top, 0, 1.12, 0, .3, .04, .44); H(low, 0, .98, -.2, .12, .3, .05); for (const sx of [-1, 1]) H(low, sx * .245, 1.02, 0, .02, .1, .36, shade(h, .6)); backZ = -.225; break;
    case 'sweep': cap(); sides(); H(low, 0, .93, -.22, .5, .38, .07); H(top, -.05, 1.19, 0, .34, .07, .3); H(front, .12, 1.1, .22, .2, .06, .05); H(front, 0, 1.06, .22, .2, .06, .05); H(front, -.12, 1.02, .22, .2, .06, .05); H(front, -.2, .95, .22, .07, .12, .05); break;
    case 'bob': cap(); H(front, 0, 1.04, .215, .48, .1, .05); for (const sx of [-1, 1]) H(low, sx * .27, .84, 0, .07, .34, .42); H(low, 0, .85, -.22, .58, .4, .1); backZ = -.272; break;
    case 'long': cap(); fringe(); for (const sx of [-1, 1]) H(low, sx * .27, .8, 0, .07, .5, .38); H(low, 0, .76, -.24, .54, .64, .1); H(top, 0, 1.2, -.02, .3, .08, .3); backZ = -.292; break;
    case 'wavy': H(top, 0, 1.14, 0, .54, .12, .5); H(top, 0, 1.22, -.02, .38, .06, .34); H(front, -.12, 1.05, .215, .26, .08, .05); H(front, .14, 1.07, .215, .2, .06, .05); H(front, .24, .97, .2, .05, .14, .05); for (const sx of [-1, 1]) { H(low, sx * .29, .8, 0, .08, .5, .4); H(low, sx * .31, .56, .02, .07, .16, .34); } H(low, 0, .72, -.25, .62, .76, .12); backZ = -.312; break;
    case 'ponytail': cap(); fringe(); sides(.2, 1.0); H(low, 0, .95, -.22, .5, .3, .07); H(top, 0, 1.17, -.17, .14, .1, .1, s.trim); H(top, 0, 1.22, -.26, .16, .16, .14); H(top, 0, 1.05, -.31, .16, .38, .12); H(top, 0, .83, -.31, .12, .14, .1, t); backZ = -.32; break;
    case 'bun': cap(); fringe(); sides(); H(low, 0, .93, -.22, .5, .34, .07); H(top, 0, 1.24, -.02, .2, .12, .2); H(top, 0, 1.33, -.02, .14, .08, .14); H(top, 0, 1.19, -.02, .22, .03, .22, s.trim); break;
    case 'twin': cap(); fringe(); sides(.2, 1.0); H(low, 0, .95, -.21, .5, .3, .06); for (const sx of [-1, 1]) { H(low, sx * .3, .96, -.04, .1, .5, .14); H(low, sx * .3, .66, -.04, .1, .1, .14, t); H(low, sx * .28, 1.1, -.04, .12, .05, .14, s.trim); } break;
    case 'braid': cap(); fringe(); sides(.2, 1.0); H(low, 0, .93, -.22, .5, .4, .07); H(low, .22, .88, .12, .1, .12, .1); H(low, .22, .76, .14, .09, .1, .1); H(low, .22, .64, .16, .1, .1, .1); H(low, .22, .55, .17, .09, .08, .09, t); H(low, .22, .5, .18, .1, .04, .1, s.trim); break;
    case 'curly': H(top, 0, 1.2, 0, .62, .28, .56); for (const sx of [-1, 1]) { H(low, sx * .31, 1.04, 0, .1, .3, .5); H(front, sx * .16, 1.07, .23, .14, .08, .06); } H(low, 0, 1.0, -.27, .6, .4, .12); backZ = -.332; break;
    default: cap(); fringe(); sides(); H(low, 0, .93, -.22, .5, .38, .07);
  }
  if (s.hair2 && st !== 'buzz') { front.push([-.14, .985, .223, .06, .2, .04, s.hair2]); low.push([.12, .93, backZ, .1, .3, .02, s.hair2]); }
  if (s.gender === 'female' && !['buzz', 'mohawk'].includes(st)) for (const sx of [-1, 1]) H(front, sx * .235, .86, .2, .055, .27, .06); // пряди, обрамляющие лицо
  const hide = hg === 'helm' ? ['top', 'front'] : hg === 'wizhat' || hg === 'cap' ? ['top'] : [];
  for (const [name, arr] of [['top', top], ['front', front], ['low', low]]) if (!hide.includes(name)) for (const b of arr) B(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
}

const OUTFIT = {
  fighter(B, s, bw, arm, o) {
    const { trim } = s;
    const paul = (w, hh) => { for (const sx of [-1, 1]) { B(sx * arm, .7, 0, w, .07, .2, trim); B(sx * arm, .66, 0, w, hh, .18, s.cloth2); } };
    if (o === 'plate') { paul(.17, .08); for (const sx of [-1, 1]) B(sx * .07, .62, .13, .03, .15, .012, trim); B(0, .685, .13, .16, .03, .012, trim); B(0, .71, -.02, bw + .02, .03, .27, trim); }
    if (o === 'tabard') { B(0, .4, .135, .22, .4, .012, s.cloth); B(0, .53, .145, .03, .15, .012, trim); B(0, .56, .145, .11, .03, .012, trim); B(0, .21, .136, .22, .03, .012, trim); B(0, .71, 0, bw + .02, .03, .27, trim); }
    if (o === 'leather') { B(0, .56, .13, bw - .06, .25, .012, s.cloth); B(0, .56, .136, .02, .25, .012, shade(s.leather, .6)); for (const sx of [-1, 1]) { B(sx * arm, .66, 0, .15, .06, .19, s.cloth); B(sx * .12, .56, .14, .05, .05, .012, trim); } B(0, .71, 0, bw + .02, .03, .27, trim); }
    if (o === 'knight') { paul(.2, .12); B(0, .72, 0, bw - .02, .06, .29, STEEL); B(0, .6, .13, bw - .04, .2, .012, STEEL); B(0, .6, .14, .03, .16, .012, trim); B(0, .63, .14, .12, .03, .012, trim); B(0, .385, .1, bw + .02, .08, .29, STEEL); B(0, .35, .1, bw + .02, .02, .29, trim); }
  },
  wizard(B, s, bw, arm, o) {
    const { trim } = s;
    for (const sx of [-1, 1]) B(sx * arm, .47, 0, .14, .04, .19, trim);
    if (o === 'robe') { for (const sx of [-1, 1]) B(sx * .1, .57, .128, .045, .24, .012, trim); B(0, .71, 0, bw + .02, .04, .27, trim); B(0, .5, .128, .03, .1, .012, trim); }
    if (o === 'mantle') { B(0, .72, 0, bw + .13, .09, .31, s.cloth2); B(0, .665, 0, bw + .15, .025, .33, trim); B(0, .78, -.1, .3, .12, .08, s.cloth2); B(0, .72, .16, .05, .05, .02, s.gem); }
    if (o === 'sash') { const sc = s.accent ?? s.cloth2; for (let i = 0; i < 5; i++) B(-.12 + i * .06, .68 - i * .055, .13, .09, .07, .012, sc); B(0, .45, 0, bw + .04, .1, .27, sc); B(.09, .34, .14, .06, .12, .02, sc); B(-.02, .33, .14, .06, .1, .02, sc); }
    if (o === 'scholar') { B(0, .56, .13, bw - .1, .25, .012, s.cloth2); B(0, .64, .14, .1, .1, .012, CREAM); B(0, .6, .145, .02, .2, .012, trim); B(.19, .33, .12, .12, .12, .07, s.leather); B(.19, .385, .12, .13, .03, .075, trim); }
  },
  rogue(B, s, bw, arm, o) {
    const { trim, leather } = s;
    if (o === 'leathers') { for (let i = 0; i < 5; i++) B(-.12 + i * .06, .67 - i * .06, .13, .075, .06, .02, leather); B(.18, .33, .12, .12, .12, .07, leather); B(.18, .385, .12, .13, .03, .075, trim); }
    if (o === 'vest') { B(0, .56, .128, .06, .24, .012, CREAM); for (const sx of [-1, 1]) B(sx * .1, .56, .13, .1, .25, .012, leather); for (let i = 0; i < 3; i++) B(0, .64 - i * .07, .14, .09, .015, .012, trim); }
    if (o === 'tunic') { B(0, .36, 0, bw + .02, .2, .28, s.cloth); B(0, .255, 0, bw + .04, .025, .3, trim); B(0, .43, 0, bw + .03, .05, .29, leather); B(0, .43, .15, .08, .065, .03, trim); B(.14, .3, .15, .09, .09, .02, s.cloth2); }
    if (o === 'studded') { for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) B(-.1 + c * .1, .64 - r * .1, .135, .035, .035, .02, STEEL); B(-.2, .71, 0, .17, .07, .2, leather); B(-.2, .74, 0, .12, .03, .15, trim); B(.18, .33, .12, .12, .12, .07, leather); }
  },
  cleric(B, s, bw, arm, o) {
    const { trim } = s;
    if (o === 'vestments') { B(0, .5, .128, .15, .36, .012, GREEN); B(0, .66, .12, bw - .02, .06, .26, CREAM); for (const sx of [-1, 1]) { B(sx * .13, .55, .13, .08, .26, .012, CREAM); B(sx * arm, .43, 0, .14, .04, .19, CREAM); } B(0, .59, .142, .03, .13, .012, trim); B(0, .615, .142, .095, .03, .012, trim); B(0, .3, .16, .24, .24, .012, GREEN); B(0, .3, .17, .03, .1, .012, trim); }
    if (o === 'surplice') { for (const sx of [-1, 1]) { B(sx * .09, .5, .13, .04, .38, .012, s.cloth2); B(sx * arm, .43, 0, .14, .04, .19, s.cloth2); } B(0, .66, .12, bw - .02, .05, .26, s.cloth2); B(0, .59, .142, .03, .13, .012, trim); B(0, .615, .142, .095, .03, .012, trim); B(0, .17, 0, bw + .13, .03, .33, s.cloth2); }
    if (o === 'mail') { for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if ((r + c) % 2 === 0) B(-.12 + c * .08, .66 - r * .06, .13, .05, .03, .012, STEEL); B(0, .69, 0, bw, .05, .27, shade(MAIL, 1.15)); B(0, .36, .135, .22, .34, .012, s.cloth); B(0, .45, .145, .03, .14, .012, trim); B(0, .48, .145, .1, .03, .012, trim); for (const sx of [-1, 1]) B(sx * arm, .43, 0, .14, .04, .19, trim); }
    if (o === 'monk') { B(0, .66, 0, bw - .02, .05, .26, s.cloth2); B(.06, .31, .145, .04, .18, .03, 0xc8b88a); B(.06, .2, .145, .06, .04, .04, 0xc8b88a); for (let i = 0; i < 4; i++) B(-.1 + i * .028, .6 - Math.abs(i - 1.5) * .02, .14, .03, .03, .012, WOOD); for (const sx of [-1, 1]) B(sx * arm, .43, 0, .14, .04, .19, s.cloth2); }
  },
};

function cape(B, s, bw) {
  const c = s.capeC, t = s.trim;
  if (s.cape === 'short') { B(0, .72, 0, bw + .13, .09, .32, c); B(0, .56, -.17, bw + .02, .42, .06, c); }
  if (s.cape === 'long') { B(0, .72, 0, bw + .13, .09, .32, c); B(0, .42, -.18, bw + .06, .66, .06, c); B(0, .095, -.18, bw + .06, .03, .06, t); for (const sx of [-1, 1]) B(sx * (bw / 2 + .05), .55, -.06, .05, .3, .2, c); }
  if (s.cape === 'mantle') { B(0, .72, 0, bw + .17, .1, .34, c); B(0, .64, 0, bw + .19, .06, .32, c); B(0, .605, 0, bw + .2, .02, .33, t); B(0, .71, .17, .05, .05, .02, t); B(0, .62, -.18, bw + .04, .25, .05, c); }
}

function headgear(B, s) {
  const hg = s.headgear, t = s.trim, hat = s.hat;
  if (hg === 'hood') { // капюшон с подбоем и полосой
    const c = hat ?? (s.classId === 'cleric' ? CREAM : s.cloth), r = s.classId === 'cleric' && !hat ? s.cloth : s.trim;
    B(0, 1.14, 0, .56, .1, .5, c); B(0, 1.185, 0, .56, .03, .5, r);
    B(0, .92, -.24, .56, .56, .1, c); B(0, .98, -.295, .3, .4, .02, r);
    for (const sx of [-1, 1]) { B(sx * .29, .9, -.02, .07, .5, .42, c); B(sx * .3, 1.0, 0, .02, .06, .42, r); }
    B(0, 1.05, .21, .46, .06, .05, c);
    if (s.hairStyle !== 'bald') { B(0, 1.0, .205, .46, .07, .06, s.hair); for (const sx of [-1, 1]) B(sx * .2, .93, .205, .08, .14, .06, s.hair); if (s.hair2) B(-.14, .96, .223, .06, .14, .04, s.hair2); }
  }
  if (hg === 'wizhat') {
    const c = hat ?? s.cloth;
    B(0, 1.12, 0, .74, .05, .7, c); B(0, 1.2, 0, .46, .12, .44, c); B(0, 1.31, -.02, .34, .1, .32, c); B(0, 1.41, -.05, .22, .1, .2, c); B(.02, 1.5, -.09, .12, .1, .12, c); B(0, 1.15, 0, .5, .04, .48, t);
  }
  if (hg === 'helm') {
    const c = hat ?? STEEL;
    B(0, 1.13, 0, .54, .14, .5, c); for (const sx of [-1, 1]) B(sx * .265, .99, 0, .04, .3, .44, c); B(0, .96, .235, .05, .2, .02, c); B(0, .95, -.235, .5, .3, .05, c); B(0, 1.065, 0, .545, .025, .505, t); B(0, 1.24, 0, .06, .1, .3, t);
  }
  if (hg === 'circlet') { B(0, 1.085, 0, .5, .03, .52, hat ?? t); B(0, 1.105, .262, .05, .07, .02, s.gem, true); B(0, 1.085, .262, .09, .02, .02, hat ?? t); }
  if (hg === 'headband') { const c = hat ?? s.accent ?? s.cloth2; B(0, 1.05, 0, .5, .05, .52, c); B(.26, 1.05, -.04, .06, .1, .12, c); B(.285, .97, -.1, .04, .14, .06, c); B(.285, .91, -.12, .04, .08, .05, c); }
  if (hg === 'cap') { const c = hat ?? s.cloth2; B(0, 1.15, 0, .52, .12, .48, c); B(0, 1.09, .25, .5, .035, .12, shade(c, .8)); B(.2, 1.23, -.05, .04, .18, .06, t); B(.22, 1.33, -.07, .04, .1, .05, shade(t, .85)); }
  if (hg === 'crown') { B(0, 1.15, 0, .5, .07, .46, hat ?? t); for (const [x, hh] of [[-.2, .06], [-.1, .09], [0, .06], [.1, .09], [.2, .06]]) B(x, 1.185 + hh / 2, 0, .07, hh, .08, hat ?? t); B(0, 1.15, .232, .05, .05, .02, s.gem, true); }
}

function accessories(B, s, bw, arm) {
  const has = k => s.accessories.includes(k), t = s.trim;
  if (has('earring')) B(.245, .81, .03, .03, .07, .035, t);
  if (has('glasses')) {
    for (const sx of [-1, 1]) { const x = sx * .1; B(x, .96, .238, .15, .02, .014, t); B(x, .82, .238, .15, .02, .014, t); B(x - .07, .89, .238, .02, .14, .014, t); B(x + .07, .89, .238, .02, .14, .014, t); B(sx * .245, .9, .03, .02, .02, .34, t); }
    B(0, .9, .238, .05, .02, .014, t);
  }
  if (has('scarf')) { const c = s.accent ?? s.cloth2; B(0, .7, 0, bw + .04, .07, .3, c); B(.1, .58, .15, .1, .22, .03, c); B(.1, .46, .15, .1, .03, .03, t); }
  if (has('amulet')) { B(0, .64, .135, .16, .02, .012, t); B(0, .5, .145, .05, .06, .02, s.gem, true); B(0, .56, .14, .02, .12, .012, t); }
  if (has('bracers')) for (const sx of [-1, 1]) { B(sx * arm, .47, 0, .145, .08, .195, s.leather); B(sx * arm, .515, 0, .15, .02, .2, t); }
}

function held(B, s, arm, trim) {
  const { classId: cls, hands } = s, has = k => hands.includes(k);
  if (has('sword')) { B(-.34, .38, .09, .055, .1, .055, s.leather); B(-.34, .45, .09, .17, .035, .075, trim); B(-.34, .72, .09, .05, .5, .04, STEEL); }
  if (has('shield')) {
    const blue = cls === 'fighter' ? s.cloth : s.p.cloth;
    B(.33, .5, .17, .27, .38, .05, trim); B(.33, .5, .2, .21, .32, .03, blue); B(.33, .5, .222, .03, .18, .02, trim); B(.33, .53, .222, .13, .03, .02, trim);
  }
  if (has('bow')) { for (let i = 0; i < 5; i++) B(-.34 - Math.abs(i - 2) * -.02, .36 + i * .12, .1, .06, .16, .05, 0xa27c40); B(-.4, .6, .1, .02, .6, .02, 0xc5b891); }
  if (has('staff') && cls === 'wizard') { B(-.36, .62, .08, .05, .9, .05, WOOD); B(-.36, 1.1, .08, .13, .06, .13, trim); B(-.36, 1.2, .08, .09, .13, .09, s.gem, true); }
  if (has('staff') && cls !== 'wizard') { B(-.34, .58, .09, .05, .82, .05, WOOD); B(-.34, 1.04, .09, .15, .15, .15, IRON); B(-.34, 1.04, .09, .19, .04, .19, trim); B(-.34, 1.04, .09, .04, .19, .19, trim); }
  if (s.book) B(-.3, .45, .13, .13, .16, .045, 0x7a2f2f);
}

const css = c => '#' + (c & 0xffffff).toString(16).padStart(6, '0');
export const VIEWS = { face: { y0: .66, y1: 1.14 }, head: { y0: .6, y1: 1.44 }, hat: { y0: .66, y1: 1.62 }, body: { y0: .1, y1: 1.36 }, full: { y0: .06, y1: 1.52 } };

// 2D-портрет из тех же боксов. view: bust (по умолчанию), head, face, full; back — вид сзади (для плаща).
export function portrait(kind, actor, opts = {}) {
  const s = spec(kind, actor);
  if (!s) return null;
  const boxes = build(s, { texel: opts.detail ?? RULES.texel }), W = opts.width || 168, H = opts.height || 192, px = opts.pixel || 3, back = !!opts.back, m = back ? -1 : 1;
  let top = 0; for (const b of boxes) top = Math.max(top, b[1] + b[4] / 2);
  const v = VIEWS[opts.view], y0 = v ? v.y0 : .5, y1 = v ? v.y1 : Math.min(1.7, Math.max(1.32, top + .03));
  const lw = Math.round(W / px), lh = Math.round(H / px), yspan = y1 - y0, xspan = yspan * W / H, x0 = -xspan / 2;
  const small = document.createElement('canvas'); small.width = lw; small.height = lh;
  const c = small.getContext('2d'); c.imageSmoothingEnabled = false;
  const sx = lw / xspan, sy = lh / yspan;
  const rect = b => { const l = Math.round((m * b[0] - b[3] / 2 - x0) * sx), r = Math.round((m * b[0] + b[3] / 2 - x0) * sx), t = Math.round((y1 - b[1] - b[4] / 2) * sy), bt = Math.round((y1 - b[1] + b[4] / 2) * sy); return [l, t, Math.max(1, r - l), Math.max(1, bt - t)]; };
  const flat = boxes.filter(b => b[8] !== 't'), order0 = flat;
  const order = order0.map((b, i) => [(b.length > 8 ? b[9] : b[2] + b[5] / 2) * m, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map(a => order0[a[1]]);
  c.fillStyle = RULES.outline;
  for (const b of order) { if (b.length > 8 || (b[4] < .05 && b[3] < .05)) continue; const [l, t, w, h] = rect(b); c.fillRect(l - 1, t - 1, w + 2, h + 2); }
  for (const b of order) { const [l, t, w, h] = rect(b); c.fillStyle = css(b[6]); c.fillRect(l, t, w, h); }
  const big = document.createElement('canvas'); big.width = W; big.height = H; big.className = 'sprite character-portrait';
  const g = big.getContext('2d'); g.imageSmoothingEnabled = false; g.drawImage(small, 0, 0, W, H);
  return big;
}

// Портрет по имени для диалогов: «Эллен · хранительница» → реестр NPC.
export function npcPortrait(name, opts) {
  const id = NPC_BY_NAME[String(name || '').split(' · ')[0]];
  return id ? portrait(5, { npc: id }, opts) : null;
}
export function modelStats(boxes) {
  let top = 0;
  for (const b of boxes) top = Math.max(top, b[1] + b[4] / 2);
  return { boxes: boxes.length, top };
}
