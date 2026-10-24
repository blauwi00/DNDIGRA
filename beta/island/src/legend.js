// ---------- reputation, the chapel artifact and powers that stay with the hero ----------
// Owner decisions 2026-10-24 (docs/ITEMS.md): reputation is a simple word scale, seen in the
// hero menu as a word only and felt through prices; it moves only for deeds a side could know of.
// The artifact's fate is the player's choice; keeping it makes the only item of its kind,
// absorbing it gives a power for good. A hero holds at most three unique items and powers.
const REP_NAMES=['враг','чужак','знакомый','друг','герой'];
const FACTIONS={village:'Заводь',bandits:'Разбойники'};
const REP={village:0,bandits:0,jobs:0};
// points: -3 and below враг, up to 1 чужак, 2-4 знакомый, 5-8 друг, 9 and more герой
function repLevel(f){const p=REP[f];return p<=-3?0:p<2?1:p<5?2:p<9?3:4;}
const repName=f=>REP_NAMES[repLevel(f)];
function repAdd(f,n,why){if(!n)return;const was=repName(f);REP[f]+=n;const now=repName(f);
  if(now!==was)setTimeout(()=>toast(FACTIONS[f]+': теперь вы — '+now+(why?' ('+why+')':'')),900);}
// what the village feels: the island's shops are all in Заводь
function repPriceK(){return [1.5,1,.95,.9,.8][repLevel('village')];}
// side jobs earn a little standing, up to three times
function repJob(){if(REP.jobs<3){REP.jobs++;repAdd('village',1,'подработки');}}
// a bandit learns of a killing only if another bandit saw it
function repKill(e){if(e.model!=='bandit')return;const seen=enemies.some(o=>o!==e&&!o.dead&&o.model==='bandit'&&Math.hypot(o.x-e.x,o.z-e.z)<=8);
  if(seen)repAdd('bandits',-2,'свидетели в лагере');}

// ---------- the chapel heart ----------
const ART={fate:null,powers:[]};const UNIQUE_MAX=3;
const uniqueCount=()=>(window.handsCount&&window.handsCount('heart')?1:0)+ART.powers.length;
function artifactChoice(){if(ART.fate)return;const room=uniqueCount()<UNIQUE_MAX;
  const ch=[['Оставить в жаровне',()=>artifactPick('left')],['Разбить',()=>artifactPick('broken')]];
  if(room)ch.push(['Забрать себе',()=>artifactPick('kept')],['Поглотить',()=>artifactPick('absorbed')]);
  say('Пламенное сердце','В глубине жаровни бьётся сгусток огня — сердце часовни. Оно тёплое, как живое, и будто ждёт решения.'+(room?'':' Вы уже несёте три особые силы: больше не унести.'),ch);}
function artifactPick(f){
  if(f==='kept'){const got=window.handsGive([['heart',1]],'Артефакт');if(!got.length)return say('Пламенное сердце','Руки и сумка заняты. Освободите место и вернитесь к жаровне.');}
  ART.fate=f;
  if(f==='left'){repAdd('village',3,'сердце хранит Заводь');return say('Пламенное сердце','Вы оставляете сердце в огне. Пламя часовни разгорается ровно и ярко — его увидят из каждой избы Заводи.');}
  if(f==='broken'){repAdd('village',1,'мёртвые больше не встанут');return say('Пламенное сердце','Сердце раскалывается с тихим звоном. Магия часовни уходит в землю, и мёртвые здесь больше не встанут. Огонь горит, но теперь — просто огонь.');}
  if(f==='kept'){repAdd('village',-2,'огонь часовни ослаб');return say('Пламенное сердце','Сердце ложится в ладонь. Такого больше нет во всём мире. Огонь часовни заметно тускнеет — в Заводи это увидят.');}
  ART.powers.push('flamestep');save();
  say('Пламенное сердце','Вы прижимаете сердце к груди, и оно уходит внутрь. Теперь в вас живёт пламя: раз до отдыха можно шагнуть сквозь огонь в случайное место рядом.');}
// powers and the heart in the hero's wheel
const holdsHeart=()=>{const h=hero.userData.held||{};return h.L==='heart'||h.R==='heart';};
function legendWheel(items,f,ht,bonus,bOk){
  if(f&&holdsHeart())items.push({icon:'special',label:'Огненная буря',sub:SP.storm?'действие · 3к6 рядом':'нужен отдых',ok:SP.storm>0&&ht&&!CB.acted,run:()=>doVerb(null,heartStorm)});
  if(ART.powers.includes('flamestep'))items.push({icon:'special',label:'Шаг пламени',sub:SP.step?(f?'бонус · ':'')+'в случайное место':'нужен отдых',ok:SP.step>0&&bOk,run:()=>bonus(flameStep)});}
async function heartStorm(){SP.storm=0;const foes=enemies.filter(e=>!e.dead&&man(e,H0)<=2);sfx('spell');shake=.3;floatText('Огненная буря','#ff7a2a',hero);
  for(const e of foes){const res=await roll20(e.name+': спасбросок Ловкости · Огненная буря',e.dex||0,14);let dmg=d(6)+d(6)+d(6);if(res.ok)dmg=Math.floor(dmg/2);
    await knock(e,H0,dmg,'#ff7a2a');e.aware=true;hurt(e,dmg,H0,'fire');rollDone();}
  if(!foes.length)toast('Пламя прокатилось вокруг, но рядом нет врагов.');}
function flameStep(){const c=[];for(let dz=-6;dz<=6;dz++)for(let dx=-6;dx<=6;dx++){const r=Math.hypot(dx,dz),x=H0.x+dx,z=H0.z+dz;if(r>=3&&r<=6&&free(x,z))c.push([x,z]);}
  if(!c.length)return toast('Пламени некуда шагнуть.');SP.step=0;const [x,z]=c[Math.floor(Math.random()*c.length)];
  H0.route=null;H0.x=x;H0.z=z;H0.px=x+.5;H0.pz=z+.5;focus.set(H0.px,0,H0.pz);floatText('Шаг пламени','#ff9a3a',hero);sfx('spell');shake=.15;if(CB.on)showMoves();}
function legendSave(){return {rep:REP,art:ART};}
function legendLoad(d){if(!d)return;Object.assign(REP,d.rep||{});if(d.art){ART.fate=d.art.fate||null;ART.powers=d.art.powers||[];}}
