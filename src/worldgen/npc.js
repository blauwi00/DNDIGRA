// Житель: внешность из редактора персонажей (src/look-options.js), роль и реплики.
import { randomLook } from '../look-options.js';
import { BUILDING_TYPES } from './content.js';

const TRAITS = [['добродушный', 'добродушная'], ['ворчливый', 'ворчливая'], ['любопытный', 'любопытная'], ['осторожный', 'осторожная'], ['болтливый', 'болтливая'], ['суровый', 'суровая'], ['насмешливый', 'насмешливая'], ['набожный', 'набожная'], ['жадный', 'жадная'], ['щедрый', 'щедрая'], ['робкий', 'робкая'], ['гордый', 'гордая'], ['усталый', 'усталая'], ['мечтательный', 'мечтательная'], ['подозрительный', 'подозрительная'], ['весёлый', 'весёлая']];
const SPEECH = ['говорит коротко и по делу', 'любит поговорки', 'часто сбивается и переспрашивает', 'говорит медленно, подбирая слова', 'шутит даже о серьёзном', 'говорит вполголоса и оглядывается', 'вставляет словечки своего ремесла', 'вежлив до приторности', 'перебивает и торопится'];
const WANTS = ['чтобы в округе было спокойно', 'накопить денег на своё дело', 'найти пропавшую вещь', 'уехать из этих мест', 'узнать новости с дороги', 'расплатиться с долгами', 'дождаться вестей от родни', 'чтобы к нему относились с уважением', 'просто дожить спокойно до старости'];
const FEARS = ['пожара', 'долгов', 'ночных шорохов', 'стражи', 'одиночества', 'болезней', 'чужаков с оружием', 'что дело придёт в упадок'];
// Личность и знания жителя: из этого ИИ-мастер пишет живые реплики (генератор даёт факты и характер, не готовый текст).
export function makePersona(rng, gender, knows = [], extra = {}) {
  const traits = rng.shuffle(TRAITS).slice(0, 2).map(t => t[gender === 'female' ? 1 : 0]);
  return { traits, speech: rng.pick(SPEECH), wants: rng.pick(WANTS), fears: rng.pick(FEARS), mood: rng.pick(['спокойно', 'тревожно', 'приподнято', 'устало', 'настороженно']), knows, ...extra };
}
export function makeNpc(sb, owner, buildingType, lines, extra = {}) {
  const L = Array.isArray(lines) ? { lines, knows: [] } : lines, rng = sb.rng, t = BUILDING_TYPES[buildingType] || BUILDING_TYPES.house, classId = extra.classId || t.cls;
  const look = randomLook(classId, owner.gender, () => rng.next());
  look.beard = owner.gender === 'male' && look.beard !== 'none' && rng.chance(.5) ? look.beard : 'none';
  look.marks = look.marks.filter(m => m !== 'warpaint'); look.accessories = look.accessories.filter(a => a !== 'eyepatch' || rng.chance(.3)); look.markColor = null;
  const role = extra.role || t.role[owner.gender === 'female' ? 1 : 0];
  const hands = buildingType === 'guard' || classId === 'fighter' && rng.chance(.5) ? ['sword', 'empty'] : ['empty', 'empty'];
  return { type: 'npc', kind: 20, gen: true, name: `${owner.full} · ${role}`, npc: { classId, gender: owner.gender, look, hands, lines: L.lines, role, persona: makePersona(rng.fork('persona'), owner.gender, L.knows, { where: sb.name }) } };
}
