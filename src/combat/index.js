// Боёвка DNDIGRA: бестиарий, встречи, ИИ врагов, модели зверей. Подключение: dist/combat.js (глобал Combat) + dist/combat-fx.js (эффекты).
export { MONSTERS, THEMES, THRESH, MULT, DIFFICULTY, buildEncounter, placeEncounter, adjustedXp, kindsList, mod } from './bestiary.js';
export { BEASTS, beastBoxes } from './beasts.js';
export { decide, reach } from './ai.js';
export {enemyDefinition,initializeEnemy,plannerActor,weaponFromAttack} from './runtime.js';
export {intentSummary} from './runtime.js';
export {opportunityThreats} from './runtime.js';
