// ---------- foes grow with the hero and with the wilds; settlements defend themselves ----------
// A foe's tier is the area's danger (how far from Заводь and the pier, and whether a road is near)
// plus the hero's level. Each tier adds health, aim, armour and damage; from tier 2 the foe is a
// tougher kind (a wolf becomes a dire wolf). Bosses stand one tier above. Experience grows with the
// tier, so the encounter budget in startCombat still keeps crowds in check.
const FOE_TIER=[{hp:1,atk:0,ac:0,dmg:0,xp:1},{hp:1.3,atk:1,ac:0,dmg:0,xp:1.25},{hp:1.6,atk:1,ac:1,dmg:1,xp:1.5},{hp:2,atk:2,ac:1,dmg:2,xp:2},{hp:2.4,atk:3,ac:2,dmg:2,xp:2.5}];
const FOE_VET={bandit:'Бывалый разбойник',wolf:'Лютый волк',goblin:'Гоблин-вожак',skeleton:'Старый скелет',boar:'Матёрый кабан',bear:'Пещерный медведь'};
function roadNear(x,z,r){for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){const X=x+dx,Z2=z+dz;if(X<0||Z2<0||X>=W||Z2>=OUT_H)continue;if(GEN.road[Z2*W+X])return true;}return false;}
function dangerAt(x,z){const dh=Math.min(Math.hypot(x-Z.village[0],z-Z.village[1]),Math.hypot(x-Z.dock[0],z-Z.dock[1]));
  const base=dh<45?0:dh<90?1:dh<140?2:3;return Math.min(4,base+(base>0&&!roadNear(Math.round(x),Math.round(z),4)?1:0));}
function foeTier(e){const h=e.home||[e.x,e.z],t=dangerAt(h[0],h[1])+Math.round((LV.lv-1)*.75);return Math.max(0,Math.min(e.boss?2:4,e.boss?t+1:t));}
function scaleFoe(e){if(!e||e.dead||e.inFight||e.temp||!FOE[e.model]||(typeof CROWN_GUARDS!=='undefined'&&CROWN_GUARDS.includes(e)))return;
  if(!e.base)e.base={max:e.max,ac:e.ac,atk:e.atk,dmgB:e.dmgB||0,name:e.name};const t=foeTier(e);if(e.tier===t)return;
  const T=FOE_TIER[t],B0=e.base,frac=e.max?Math.max(0,e.hp)/e.max:1;e.tier=t;e.kind=B0.name;
  e.max=Math.round(B0.max*T.hp);e.hp=Math.max(1,Math.round(frac*e.max));e.ac=B0.ac+T.ac;e.atk=B0.atk+T.atk;e.dmgB=B0.dmgB+T.dmg;e.xpK=T.xp;
  e.name=t>=2&&!e.boss&&FOE_VET[e.model]?FOE_VET[e.model]:B0.name;}
function scaleNear(x,z,r){for(const e of enemies)if(!e.dead&&!e.inFight&&Math.hypot(e.x-x,e.z-z)<=r)scaleFoe(e);}

// a lair far from home keeps one rare thing: the dire pack leader's fang, the stolen watch shield
function lairDrop(e){if(typeof OBJS==='undefined'||dangerAt(e.home[0],e.home[1])<2)return;
  const kin=enemies.filter(o=>o!==e&&!o.dead&&o.model===e.model&&Math.hypot(o.home[0]-e.home[0],o.home[1]-e.home[1])<=8);if(kin.length)return;
  const drop=e.model==='wolf'?['drop_fang','dagger_fang','У вожака стаи крепкий клык. Из такого выйдет хороший нож.']:e.model==='bandit'?['drop_watch','shield_watch','В лагере лежит старый щит дозора Заводи. Разбойники когда-то отняли его.']:null;
  if(!drop||OBJS[drop[0]])return;OBJS[drop[0]]=1;setTimeout(()=>{window.handsGive&&window.handsGive([[drop[1],1]],'Добыча');toast(drop[2],4500);},900);}

// ---------- settlements ----------
const SETTLE_SPOTS=[{n:'Заводь',x:Z.village[0],z:Z.village[1],r:12,gate:'у ворот'},{n:'причал',x:Z.dock[0],z:Z.dock[1],r:6,gate:'у причала'},
  ...GEN.places.filter(p=>!p.stamp&&['capital','village','works'].includes(p.type)).map(p=>({n:p.n,x:p.x,z:p.z,r:p.r+2,place:p,gate:'у ворот'}))];
const ABLE=/Стражник|Пахарь|Пастух|Бондарь|Каменотёс|Десятник|Пасечник|Батрак|Торфяник|лесоруб|Кузнец|Мельник/;
const isGuard=a=>/Стражник/.test(a.npc||'')||a.role==='patrol';
function settleNear(x,z,pad){return SETTLE_SPOTS.find(s=>Math.hypot(x-s.x,z-s.z)<=s.r+pad);}
function townsfolkAt(s){return actors.filter(a=>a.npc&&!a.enemy&&!a.ally&&!a.dead&&!a.hidden&&!a.far&&a!==H0&&a.talkId!=='king'&&Math.hypot(a.x-s.x,a.z-s.z)<=s.r+10);}
const DEFENDERS=[];
function defenderJoin(a){if(CB.order.includes(a))return;const g=isGuard(a);
  Object.assign(a,{defender:true,inFight:true,route:null,keepName:a.name,name:a.name||a.npc,hp:g?16:10,max:g?16:10,ac:g?15:11,atk:g?4:2,dmg:g?8:6,dmgB:g?2:0,atkName:g?'Копьё':'Удар',speed:6});
  DEFENDERS.push(a);CB.order.push(a);floatText(g?'К оружию!':'Бей его!','#9fe0ff',a.o);renderOrder();}
function defenderFall(a){a.down=true;a.hp=0;a.route=null;floatText(a.name+' ранен','#ff9a6a',a.o);tween(500,k=>{a.o.rotation.z=k*1.3;a.sink=k*.1});renderOrder();}
function defendersReset(){for(const a of DEFENDERS.splice(0)){if(a.down){a.down=false;standUp(a);}a.defender=false;a.inFight=false;a.name=a.keepName;delete a.keepName;}}
function fleeFrom(a,e){const dx=Math.sign(a.x-e.x)||1,dz=Math.sign(a.z-e.z)||1;for(let k=8;k>=3;k--){const tx=a.x+dx*k,tz=a.z+dz*k;if(!free(tx,tz))continue;const p=path(a.x,a.z,tx,tz,a,false,400);if(p&&p.length){a.route=p;a.hold=performance.now()+9000;floatText('Спасайся!','#ffd27a',a.o);return;}}}
function alarm(e,s){const now=performance.now();if(e.alarmT>now)return;e.alarmT=now+20000;const who=e.kind||e.name;
  toast(who+' '+s.gate+'!',3000);const folk=townsfolkAt(s),able=folk.filter(a=>isGuard(a)||ABLE.test(a.npc||'')||a.tool==='axe'||a.tool==='halberd').sort((a,b)=>man(a,e)-man(b,e)).slice(0,3);
  for(const a of folk)if(!able.includes(a))fleeFrom(a,e);
  if(CB.on&&CB.order.includes(e)){for(const a of able)defenderJoin(a);if(able.length)toast((isGuard(able[0])?'Стража':'Люди')+' '+(s.n==='причал'?'с причала':'из деревни')+' бегут на помощь.',3000);return;}
  // outside a fight the folk drive it off with sticks and spears, and it runs back to its lair
  if(able.length){const hit=d(6)+1;e.hp=Math.max(1,e.hp-hit);floatText('-'+hit,'#ffd27a',e.o);toast(able[0].npc+' гонит прочь: '+who.toLowerCase()+' убегает.',3000);}
  e.aware=false;e.investigate=null;const p=path(e.x,e.z,e.home[0],e.home[1],e,false,1500);e.route=p&&p.length?p:null;}
let defI=0;
function defenseTick(){defI++;if(defI%8===0)for(const e of enemies)if(!e.dead&&!e.inFight&&!e.far)scaleFoe(e);
  for(const e of enemies){if(e.dead||e.hidden||!e.o.visible||(typeof CROWN_GUARDS!=='undefined'&&CROWN_GUARDS.includes(e))||e.temp)continue;
    if(!e.inFight&&!e.aware&&!e.investigate)continue;const s=settleNear(e.x,e.z,4);if(s)alarm(e,s);}}
