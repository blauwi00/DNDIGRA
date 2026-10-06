// Житель: внешность из редактора персонажей (src/look-options.js), роль и реплики.
import { randomLook } from '../worldgen-look-v1.js';
import { BUILDING_TYPES } from './content.js';

export function makeNpc(sb, owner, buildingType, lines, extra = {}) {
  const rng = sb.rng, t = BUILDING_TYPES[buildingType] || BUILDING_TYPES.house, classId = extra.classId || t.cls;
  const look = randomLook(classId, owner.gender, () => rng.next());
  look.beard = owner.gender === 'male' && look.beard !== 'none' && rng.chance(.5) ? look.beard : 'none';
  look.marks = look.marks.filter(m => m !== 'warpaint'); look.accessories = look.accessories.filter(a => a !== 'eyepatch' || rng.chance(.3)); look.markColor = null;
  const role = extra.role || t.role[owner.gender === 'female' ? 1 : 0];
  const hands = buildingType === 'guard' || classId === 'fighter' && rng.chance(.5) ? ['sword', 'empty'] : ['empty', 'empty'];
  return { type: 'npc', kind: 20, gen: true, name: `${owner.full} · ${role}`, npc: { classId, gender: owner.gender, look, hands, lines } };
}
