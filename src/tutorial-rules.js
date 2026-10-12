/** Saved onboarding checkpoints. Only successful actions satisfy the current prompt. */
export const TUTORIAL_VERSION = 1;
export const TUTORIAL_PROFILE_KEY = 'dndigra.tutorial.completed.v1';
export const tutorialProfileKey = (offline = false) => (offline ? 'dndigra-local-' : '') + TUTORIAL_PROFILE_KEY;
const CLASS_IDS = ['fighter', 'wizard', 'rogue', 'cleric'];
export const CLASS_ABILITY = Object.freeze({ fighter: 'secondWind', wizard: 'magearmor', rogue: 'dash', cleric: 'cure' });
const STEPS = Object.freeze([
  ['selection', 'Выберите клетку', 'Нажмите свободную клетку на карте. Движение начинается отдельной кнопкой «Идти».', '#viewport'],
  ['movement', 'Сделайте первый шаг', 'Нажмите «Идти» возле выбранной клетки и дождитесь движения героя.', '.object-prompt'],
  ['camera-center', 'Верните камеру к герою', 'Нажмите «Центрировать на герое» над картой.', '#camera-center'],
  ['camera-scale', 'Измените масштаб', 'Нажмите «Увеличить», «Уменьшить» или «Показать всю карту».', '.map-toolbar'],
  ['interaction', 'Осмотрите припасы', 'Выберите дорожный сундук на опушке и нажмите «Открыть». Герой подойдёт к нему.', '#viewport'],
  ['loot', 'Заберите находку', 'Заберите припасы из дорожного сундука. При заполненном рюкзаке освободите ячейку: вещи останутся на месте.', '#viewport'],
  ['hero', 'Откройте героя', 'Нажмите вкладку «Герой»: здесь здоровье, характеристики и снаряжение рук.', '#tab-hero'],
  ['bag', 'Откройте рюкзак', 'Нажмите вкладку «Рюкзак», чтобы увидеть найденные вещи.', '#tab-bag'],
  ['equipment', 'Используйте снаряжение', 'Выберите надетую броню и снимите её, либо откройте «Герой» и смените снаряжение рук. Затем можно вернуть привычное снаряжение.', '#bag-equipped, #hero-hands'],
  ['journal', 'Откройте журнал', 'Вернитесь на карту и нажмите «Журнал»: он хранит цель путешествия и найденные сведения.', '#journal'],
  ['actions', 'Откройте действия', 'Нажмите «Действия», чтобы увидеть доступные приёмы героя.', '#combat-tools-toggle'],
  ['ability', 'Попробуйте приём героя', '', '#quick-actions'],
  ['dodge', 'Защититесь в бою', 'Начался учебный бой. В «Действиях» нажмите «Уклониться»: до следующего хода противнику труднее попасть.', '#combat-tools-toggle'],
  ['turn', 'Передайте ход', 'Закройте окно действий и нажмите «Конец хода». Дождитесь действий противника.', '#end'],
  ['potion', 'Восстановите здоровье', 'Нажмите «Зелье»: в бою оно тратит бонусное действие. Если здоровье полное, передайте ход и дождитесь ранения.', '#potion'],
  ['attack', 'Атакуйте противника', 'Выберите врага на карте и нажмите «Атаковать». Если он далеко, сначала подойдите; при потраченном действии передайте ход.', '#viewport'],
  ['victory', 'Одержите настоящую победу', 'Повторяйте атаки и передавайте ход, пока враг не будет побеждён. Этот бой использует обычные броски и ресурсы.', '#viewport'],
  ['ambush', 'Учебное нападение', 'Теперь показан исход опасной засады. Нажмите «Конец хода»: герой потеряет сознание, а целитель поможет ему.', '#end'],
  ['unconscious', 'Герой без сознания', 'Учебная засада закончилась потерей сознания. Это не смерть. Помощь уже близко.', '#viewport'],
  ['rescue', 'Помощь целителя', 'Целитель увёл героя в безопасное место. Дождитесь окончания сцены помощи — после неё путешествие продолжится.', '#viewport']
]);
const ABILITY_TEXT = {
  fighter: 'Нажмите «Второе дыхание»: воин восстанавливает здоровье своим ресурсом.',
  wizard: 'Нажмите «Доспехи мага»: заклинание тратит ячейку. Оставьте свободную руку через «Снаряжение рук».',
  rogue: 'Нажмите «Рывок»: плут получает дополнительное движение. Учимся доступному приёму этого героя.',
  cleric: 'Нажмите «Лечение ран»: жрец лечит себя, расходуя ячейку. Оставьте свободную руку через «Снаряжение рук».'
};
export function tutorialRequirements(classId = 'fighter') {
  const cls = CLASS_IDS.includes(classId) ? classId : 'fighter';
  return STEPS.map(([id, title, text, target]) => ({ id, title, text: id === 'ability' ? ABILITY_TEXT[cls] : text, target, ...(id === 'ability' ? { ability: CLASS_ABILITY[cls] } : {}) }));
}
function phaseFor(step) { return step >= STEPS.length ? 'complete' : step >= 19 ? 'rescue' : step >= 18 ? 'loss' : step >= 17 ? 'ambush' : step >= 12 ? 'combat' : 'controls'; }
export function createTutorial({ classId = 'fighter', skip = false, canSkip = false, mode = 'campaign' } = {}) {
  const skipped = mode !== 'practice' && !!skip && !!canSkip;
  return { v: TUTORIAL_VERSION, classId: CLASS_IDS.includes(classId) ? classId : 'fighter', mode: mode === 'practice' ? 'practice' : 'campaign', step: skipped ? STEPS.length : 0, phase: skipped ? 'complete' : 'controls', checks: {}, seen: [], completed: skipped, skipped };
}
function matches(step, event, state) {
  if (!event || event.success === false) return false;
  const type = event.type, id = event.id;
  switch (step) {
    case 'selection': return type === 'selection' && event.kind === 'tile';
    case 'movement': return type === 'movement';
    case 'camera-center': return type === 'camera' && event.action === 'center';
    case 'camera-scale': return type === 'camera' && ['zoom', 'fit'].includes(event.action);
    case 'hero': return type === 'tab' && event.tab === 'hero';
    case 'bag': return type === 'tab' && event.tab === 'bag';
    case 'ability': return ['ability', 'defense'].includes(type) && id === CLASS_ABILITY[state.classId];
    case 'dodge': return ['defense', 'dodge'].includes(type) && (id === 'dodge' || type === 'dodge');
    case 'victory': return type === 'victory' && event.encounterId === 'tutorial-win';
    case 'ambush': return type === 'turn' && event.encounterId === 'tutorial-loss';
    case 'unconscious': return type === 'unconscious' && event.encounterId === 'tutorial-loss';
    case 'rescue': return type === 'rescue' && event.encounterId === 'tutorial-loss';
    case 'turn': return type === 'turn' && event.encounterId !== 'tutorial-loss';
    default: return type === step;
  }
}
export function reduceTutorial(state, event) {
  if (!validateTutorial(state, state) || state.completed) return state;
  const eventId = typeof event?.eventId === 'string' ? event.eventId.slice(0, 120) : '';
  if (eventId && state.seen.includes(eventId)) return state;
  const requirement = STEPS[state.step]?.[0];
  if (!matches(requirement, event, state)) return state;
  const step = state.step + 1;
  return { ...state, step, phase: phaseFor(step), checks: { ...state.checks, [requirement]: true }, seen: eventId ? [...state.seen, eventId].slice(-100) : [...state.seen], completed: step === STEPS.length };
}
const KEYS = ['v', 'classId', 'mode', 'step', 'phase', 'checks', 'seen', 'completed', 'skipped'];
function wellFormed(state) {
  if (!state || typeof state !== 'object' || Array.isArray(state) || Object.keys(state).some(k => !KEYS.includes(k))) return false;
  if (state.v !== TUTORIAL_VERSION || !CLASS_IDS.includes(state.classId) || !['campaign', 'practice'].includes(state.mode)) return false;
  if (!Number.isInteger(state.step) || state.step < 0 || state.step > STEPS.length || typeof state.completed !== 'boolean' || typeof state.skipped !== 'boolean') return false;
  if (!state.checks || typeof state.checks !== 'object' || Array.isArray(state.checks) || !Array.isArray(state.seen) || state.seen.length > 100 || new Set(state.seen).size !== state.seen.length || state.seen.some(x => typeof x !== 'string' || !x.length || x.length > 120)) return false;
  if (state.skipped) return state.mode === 'campaign' && state.completed && state.step === STEPS.length && state.phase === 'complete' && Object.keys(state.checks).length === 0;
  if (state.phase !== phaseFor(state.step) || state.completed !== (state.step === STEPS.length)) return false;
  const expected = STEPS.slice(0, state.step).map(s => s[0]);
  return Object.keys(state.checks).length === expected.length && expected.every(id => state.checks[id] === true);
}
export function validateTutorial(next, previous = next) {
  if (!wellFormed(next) || !wellFormed(previous)) return false;
  return next.classId === previous.classId && next.mode === previous.mode && next.skipped === previous.skipped && next.step >= previous.step && (!previous.completed || next.completed) && Object.keys(previous.checks).every(k => next.checks[k] === true);
}
