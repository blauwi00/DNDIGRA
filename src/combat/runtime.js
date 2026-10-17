// Adapts the supplied tactical planner to the game's cardinal grid and existing DND rolls.
import {MONSTERS} from './bestiary.js';
export function enemyDefinition(def) {
  const m=MONSTERS[def.monsterKind];
  return m ? {...def, monsterKind:def.monsterKind, name:def.name||m.name, max:def.max??m.hp, ac:def.ac??m.ac} : def;
}
export function initializeEnemy(actor, def) {
  const m=MONSTERS[def.monsterKind];
  if(!m)return actor;
  actor.monsterKind=def.monsterKind;actor.stats={...m.stats};actor.speed=m.speed;actor.move=m.speed;
  actor.attacks=m.attacks.filter(a=>!a.web).map(a=>({...a}));
  actor.ai=m.ai==='caster'?'ranged':m.ai==='ambush'?'melee':m.ai;
  actor.undead=!!m.undead;actor.boss=!!m.boss;actor.multiattack=m.multiattack||1;
  actor.className=m.name;
  return actor;
}
export function plannerActor(actor, weapon) {
  const attacks=actor.attacks?.length?actor.attacks:[{name:weapon.name,bonus:weapon.attackBonus,dice:`${weapon.count||1}d${weapon.die}`,reach:1,range:weapon.range,ranged:weapon.range>1}];
  return {...actor, team:actor.kind===3?'enemy':'party',conds:actor.conditions||[], attacks, fearless:!actor.monsterKind||actor.fearless};
}
export function weaponFromAttack(attack) {
  const match=/^(\d+)d(\d+)([+-]\d+)?$/.exec(attack?.dice||'');
  if(!match||!Number(match[1])||!Number(match[2]))return null;
  const names={piercing:'Колющий',slashing:'Рубящий',bludgeoning:'Дробящий',fire:'Огонь',poison:'Яд'};
  return {name:attack.name,range:attack.ranged?attack.range:attack.reach||1,count:Number(match[1]),die:Number(match[2]),damageBonus:Number(match[3]||0),attackBonus:attack.bonus,type:names[attack.type]||attack.type||'Физический'};
}
