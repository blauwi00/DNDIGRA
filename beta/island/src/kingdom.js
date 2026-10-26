// ---------- the crown's doors (layout 2) ----------
// Rooms of the castle where an ordinary person may not go (barracks, armory, the king's rooms, the treasury) have a
// guard at the door. The better the kingdom thinks of the hero, the more doors open: barracks for a «знакомый»,
// the armory for a «друг», the king's rooms for a «герой»; the treasury never. A guard can be killed and the door
// walked through, but then the crown is the hero's enemy: reputation drops to «враг», the castle guards attack on
// sight, the capital's shops and jobs close, and there is a price on the hero's head. It is kept in the save (REP.crown).
const CROWN_GUARDS=[];
{const NM=['Хальвар','Освальд','Рёрик','Бранд','Гисли'];let k=0;
 for(const R of ROOMS.filter(r=>r.guard)){const [x,z]=nearFree(R.door[0]+(R.side==='S'?1:0),R.door[1]+(R.side==='S'?0:1),3),nm=NM[k%NM.length];k++;
   const a=actor('innkeeper',x,z,{enemy:true,calm:true,wander:0,name:'Стражник '+nm,hp:14,max:14,ac:16,atk:4,dmg:8,dmgB:2,atkName:'Копьё',speed:6,perc:12,dex:1,wis:1,ath:2,spd:2.2,cd:0,crownGuard:true,post:R,face:0});
   const m=buildModel(villagerBoxes(nm,LOOKS2[(k*3+1)%LOOKS2.length],{headgear:'helm'}));a.o.clear();[...m.children].forEach(c=>a.o.add(c));Object.assign(a.o.userData,m.userData);
   setHeld(a.o,'R','spear');enemies.push(a);if(typeof addBar==='function')addBar(a);CROWN_GUARDS.push(a);}}
const crownGuardOf=R=>CROWN_GUARDS.find(g=>g.post===R);
function crownLocked(R){if(!R.guard)return false;const g=crownGuardOf(R);if(!g||g.dead)return false;if(REP.crown)return true;return repLevel('kingdom')<R.guard;}
function crownRefuse(R){const g=crownGuardOf(R);
  say(g?g.name:'Стражник',R.guard>=99?'Сюда никому нельзя. Это казна. Иди своей дорогой.':REP.crown?'Ещё шаг, и пожалеешь.':'Сюда нельзя. Вот станут тебя в королевстве знать получше, тогда пущу.');}
function crownAnger(why){if(REP.crown)return;REP.crown=1;REP.kingdom=Math.min(REP.kingdom,-9);
  toast('Королевство: теперь вы — враг ('+why+'). За вашу голову назначена награда.',4000);for(const g of CROWN_GUARDS)if(!g.dead){g.calm=false;g.wander=4;}}
// a locked door: its threshold inside is shut while its guard stands and does not let the hero in
function crownTick(){for(const g of CROWN_GUARDS){const R=g.post,k=R.exit[0]+','+R.exit[1];
  if(crownLocked(R))solid.add(k);else solid.delete(k);if(REP.crown&&!g.dead&&g.calm){g.calm=false;g.wander=4;}}}
setInterval(crownTick,400);setTimeout(crownTick,0);
// raising a hand against a guard of the crown turns the crown against the hero
{const was=onFightStart;onFightStart=function(t){was(t);if(t&&t.crownGuard)crownAnger('напали на стражу');};}
// the capital's shops are closed to an enemy of the crown (side jobs are given in Заводь only)
{const shop=openShop;openShop=function(a){if(REP.crown&&a.place&&a.place.type==='capital')return say(a.npc,'Не продам. Уходи, пока стражу не позвал.');return shop(a);};}
