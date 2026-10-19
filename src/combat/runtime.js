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

// A forecast, never a reserved action: recomputed when positions or conditions change.
export function intentSummary(me, intent, actors) {
  if(!intent)return null;
  const target=actors.find(a=>a.id===intent.target);
  const ranged=me.attacks?.[intent.attack]?.ranged;
  let label={wait:'Выжидает',move:'Сближается',flee:'Отступает',web:'Готовит паутину',spell:'Готовит заклинание'}[intent.kind];
  if(intent.kind==='attack'||intent.kind==='multiattack'){
    label=ranged?(intent.path?.length?(intent.retreat?'Отойдёт и выстрелит':'Займёт позицию и выстрелит'):'Готовит выстрел'):(intent.path?.length?'Подойдёт и атакует':'Готовит удар');
    if(intent.kind==='multiattack')label+=' · атак: '+(me.multiattack||1);
  }
  return {kind:intent.kind,text:(label||'Выжидает')+(target&&intent.kind!=='wait'&&intent.kind!=='flee'?' → '+target.name:''),hint:'План может измениться после твоего хода.'};
}

// Same cardinal-grid reaction rule for preview and execution. Never mutates actors.
export function opportunityThreats(actor, steps, foes, weapon, combat=true) {
  if(!combat||actor.disengaged||actor.dead||actor.hp<=0)return [];
  const distance=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.y-b.y);
  const used=new Set(), threats=[];
  let from=actor;
  for(const to of steps){
    for(const foe of foes){
      if(used.has(foe.id)||foe.dead||foe.hp<=0||foe.reactionUsed||weapon(foe).range!==1)continue;
      if(distance(from,foe)===1&&distance(to,foe)>1){used.add(foe.id);threats.push(foe);}
    }
    from=to;
  }
  return threats;
}
