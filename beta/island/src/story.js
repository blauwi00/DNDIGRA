// ---------- the big island's errands and its main story ----------
// big-island quests: the capital wants the nearest robbers' camp gone, a village near the boar hills its fields
// saved, the stonecutters the bear away from the quarry. Kills count only near that place.
{const near=(type,from)=>GEN.places.filter(q=>q.type===type).sort((x,y)=>Math.hypot(x.x-from.x,x.z-from.z)-Math.hypot(y.x-from.x,y.z-from.z))[0];
 const cap=GEN.places.find(p=>p.type==='capital'),G=(p,job)=>TOWN.find(a=>a.place===p&&(!job||a.job===job));
 const camp=near('bandits',cap),boars=GEN.places.find(p=>p.type==='boars'),bear=GEN.places.find(p=>p.type==='bear'),works=GEN.places.find(p=>p.type==='works');
 const vil=boars&&GEN.places.filter(p=>p.type==='village'&&!p.stamp).sort((x,y)=>Math.hypot(x.x-boars.x,x.z-boars.z)-Math.hypot(y.x-boars.x,y.z-boars.z))[0];
 const mk=(key,giver,at,need,left,title,ask,ok,done,items,gold,rep)=>{if(!giver||!at)return;Q[key]={state:0,need,left,title,at,giverA:giver,gold,rep};giver.qk=key;giver.qtext=[ask,ok,done,items];};
 mk('road',G(cap,'Стражник'),camp,'Разбойник',2,'Разгромить лагерь разбойников у тракта','На дороге грабят купцов. Их лагерь недалеко от тракта, там двое. Разгонишь — заплатят из казны.',
   'Разогнал? Молодец. Вот деньги, и копьё моё старое возьми.','Купцы теперь ездят спокойно. Спасибо.',[['potion',1],['spear',1]],30,3);
 {const far=GEN.places.filter(q=>q.type==='bandits'&&q!==camp).sort((x,y)=>Math.hypot(y.x-cap.x,y.z-cap.z)-Math.hypot(x.x-cap.x,x.z-cap.z))[0]||camp;
  if(KING)mk('crown',KING,far,'Разбойник',2,'Поручение короля: разогнать дальний лагерь','В глуши сидит ещё одна шайка. Оттуда они и ходят на мои дороги. Разгонишь её — получишь награду из казны и моё слово.',
   'Хорошая работа. Вот золото, и возьми щит из моей оружейной.','Дороги теперь спокойнее. Я этого не забуду.',[['potion',2],['shield_kite',1]],60,3);}
 mk('boars',vil&&G(vil),boars,'Кабан',2,'Отогнать кабанов с полей: '+(vil?vil.n:''),'Кабаны с холмов все поля нам перерыли. Двое здоровых. Поможешь?',
   'Ну наконец-то! Вот, хлеба возьми.','Кабанов больше не видно. Хорошо.',[['bread',3]],15,1);
 mk('bear',works&&G(works),bear,'Медведь',1,'Прогнать медведя от каменоломни','В горах медведь мула нашего задрал. Пока он там, работать никто не идёт. Сможешь прогнать?',
   'Ушёл медведь? Вот спасибо. Держи, это от всех нас.','Работаем спокойно, без оглядки.',[['potion',2]],25,2);}
// ---------- the island's trouble: the robbers' chief Raven ----------
// Told slowly, over an hour or more: the king trusts only a proven hero; the old woman in the poorest settlement
// talks for bread; the black feather of Raven's men lies in another camp; the carved stone in the ruins opens
// only at night to whoever holds the feather; and the man behind it all has his own story.
// steps: ask (old woman) -> feather -> stone -> lair; his gang sleeps out of sight until the stone opens.
HELD.feather=[[0,.1,.03,.03,.2,.02,0x14141a],[0,.13,.03,.08,.12,.012,0x22222a],[0,.0,.03,.015,.06,.015,0x5a4a3a]];
const GANG=[];
{const cap=GEN.places.find(p=>p.type==='capital'),ruins=GEN.places.filter(p=>p.type==='ruins'&&!p.stamp).sort((x,y)=>Math.hypot(y.x-cap.x,y.z-cap.z)-Math.hypot(x.x-cap.x,x.z-cap.z))[0]||GEN.places.filter(p=>p.type==='bandits').pop();
 const poor=TOWN.filter(a=>a.kind==='poor'),old=poor.find(a=>a.job==='Старуха')||poor[0]||TOWN.find(a=>a.kind==='village');
 const camps=GEN.places.filter(p=>p.type==='bandits'),fcamp=camps.find(c=>c!==(Q.crown&&Q.crown.at)&&c!==(Q.road&&Q.road.at))||camps.find(c=>c!==(Q.crown&&Q.crown.at))||camps[0];
 if(KING&&ruins&&old&&fcamp){Q.raven={state:0,step:'ask',need:'Атаман Ворон',left:1,title:'',at:ruins,giverA:KING,gold:150,rep:5,oldA:old,fcamp};
   const boss=foe('bandit',ruins.x,ruins.z,{name:'Атаман Ворон',hp:40,max:40,ac:15,atk:5,dmg:8,dmgB:3,atkName:'Тяжёлый меч',perc:13,wander:1,boss:true});setHeld(boss.o,'R','sword_long');GANG.push(boss);
   for(const [dx,dz] of [[2,1],[-2,1],[0,3]])GANG.push(foe('bandit',ruins.x+dx,ruins.z+dz,{wander:1,gang:true}));
   for(const e of GANG){addBar(e);e.dead=true;e.dormant=true;e.o.visible=false;}
   // the carved stone at the ruins' edge
   {const sx=ruins.x,sz=ruins.z+Math.max(3,(ruins.r||4)-1),[x,z]=nearFree(sx,sz,4),y=groundAt(x,z),g=new THREE.Group(),m=new THREE.Mesh(BOX,lam(T.stone,{color:0x8a8a90}));m.scale.set(.8,1.3,.5);m.position.set(x+.5,y+.65,z+.5);m.castShadow=true;g.add(m);
    const c=new THREE.Mesh(BOX,new THREE.MeshLambertMaterial({color:0x1a1a22}));c.scale.set(.36,.28,.02);c.position.set(x+.5,y+.9,z+.76);g.add(c);scene.add(g);blockCell(x,z);
    Q.raven.stone=[x,z];interact.push({mesh:m,extra:[c],x,z,name:'Камень с вороном',use(){ravenStone();}});}
   // the feather lies by the fire of another camp, there from the start, noticed once you know what it means
   {const [x,z]=nearFree(fcamp.x+1,fcamp.z-1,3),y=groundAt(x,z),grp=heldGroup('feather');grp.scale.setScalar(1.6);grp.position.set(x+.5,y+.04,z+.5);grp.rotation.set(0,.7,Math.PI/2);scene.add(grp);
    const ms=[];grp.traverse(o=>o.isMesh&&ms.push(o));const it={mesh:ms[0],extra:ms.slice(1),x,z,stand:true,name:'Чёрное перо',grp,use(){ravenFeather(this);}};interact.push(it);Q.raven.featherIt=it;Q.raven.feather=[x,z];}}}
const RV_TITLE={ask:'Узнать, кто такой атаман Ворон',feather:'Найти чёрное перо людей Ворона',stone:'Разгадать камень с вороном в руинах',lair:'Одолеть атамана Ворона'};
function ravenStep(st){const q=Q.raven;q.step=st;q.title=RV_TITLE[st];questFocus=q;questUI();actCheck();save();}
function ravenStart(){const q=Q.raven;if(!q||q.state)return;q.state=1;ravenStep('ask');
  learn('king');
  say('Король Хальвдан','Один из пленных заговорил. Все шайки на острове слушаются одного человека. Зовут его Ворон. Кто он и где сидит — не знаю. Говорят, старуха в посёлке '+q.oldA.place.n+' видела его людей. Начни с неё.');}
function ravenOld(n){const q=Q.raven;
  if(q.step==='ask'){if((window.handsCount?window.handsCount('bread'):0)<2)return say(n,'Ворон? Может, и слыхала. Только на пустой живот память плохая. Внуки второй день без хлеба. Принеси две краюхи — тогда поговорим.');
    window.handsConsume('bread');window.handsConsume('bread');repAdd('village',1,'накормил бедных');ravenStep('feather');learn('old');
    return say(n,'Спасибо, родной. Слушай. Люди Ворона ходят через наш посёлок по ночам, к старым руинам, '+q.at.n+'. Днём там пусто, сама ходила. А у каждого на шапке чёрное перо. Без пера, говорят, к Ворону не попасть. Перья эти у разбойников в лагерях. Поищи у костра.');}
  if(q.step==='feather')return say(n,'Чёрное перо ищи у разбойников, у костра в лагере. Не у тех, что у тракта, — у других.');
  if(q.step==='stone')return say(n,'В руинах камень стоит, а на нём ворон вырезан. Я к нему подходить боюсь. Говорят, ночью он гудит.');
  return say(n,'Будь осторожен. Ворон — не простой разбойник. Когда-то он служил королю.');}
function ravenFeather(it){const q=Q.raven;if(!q||!window.handsGive)return;
  if(q.state!==1||q.step==='ask')return say('Чёрное перо','Обычное воронье перо, только зачем-то перевязано красной ниткой. Кто-то обронил у костра.');
  if(!window.handsGive([['feather',1]],'Находка').length)return say('Чёрное перо','Руки и сумка заняты. Освободите место.');
  it.grp.visible=false;interact.splice(interact.indexOf(it),1);if(q.step==='feather')ravenStep('stone');learn('feather');
  say('Чёрное перо','Перо перевязано красной ниткой. Такое носят люди Ворона. Теперь — в руины, к камню с вороном.');}
function ravenStone(){const q=Q.raven;if(!q)return;const night=nightness()>.6,has=window.handsCount&&window.handsCount('feather')>0;
  const riddle='На камне вырезан ворон под луной, а ниже слова: «Днём я сплю, ночью летаю. Покажи мне моё перо — и я пущу тебя к хозяину».';
  learn('riddle');
  if(q.state!==1||q.step==='ask'||q.step==='feather')return say('Камень с вороном',riddle+' Камень холодный и молчит.');
  if(q.step==='lair'||q.state>1)return say('Камень с вороном','Камень отодвинут. Под ним — ступени вниз.');
  const force=['Сдвинуть силой · '+chance(HERO.athletics,18,0)+'%',async()=>{const r=await roll20('Атлетика → Камень с вороном',HERO.athletics,18);rollDone(2000);
    if(!r.ok)return say('Камень с вороном','Камень чуть качнулся и встал на место. Спина ноет.');ravenWake();ravenStep('lair');sfx('door');shake=.3;for(const e of GANG)e.aware=true;
    say('Атаман Ворон','Камень со скрежетом отъезжает. Снизу уже бегут — грохот услышали все. «Кто ломится ко мне без пера? Взять его!»',[['Драться',()=>{const b=GANG[0];if(b&&!b.dead)startCombat(b);}]]);}];
  if(!has)return say('Камень с вороном',riddle+' Нужно перо. Или можно попробовать сдвинуть камень силой — но тогда тихо не выйдет.',[force]);
  if(!night)return say('Камень с вороном',riddle+' Вы прикладываете перо, но ничего не происходит. Днём ворон спит.',[force]);
  ravenWake();ravenStep('lair');learn('ragnar');sfx('door');shake=.25;
  say('Атаман Ворон','Камень с гулом уходит в сторону, и из-под земли выходят люди с чёрными перьями. Последним выходит высокий человек в старом плаще королевской стражи. «Я Рагнар. Тут меня зовут Ворон. Двадцать лет я служил королю, пока он не велел мне выбить налог из голодного посёлка. Я отказался — и меня выгнали. Теперь я сам беру с короля. Уходи, пока цел. Или дерись».',[['Драться',()=>{const b=GANG[0];if(b&&!b.dead)startCombat(b);}],['Уговорить сдаться · '+chance(talkMod(0)+ravenSway(),15,0)+'%',()=>ravenPlead()]]);}
// the poor know what the hero did for them, and so does Raven: kindness to the village makes him listen
const ravenSway=()=>repLevel('village')>=3?2:0;
async function ravenPlead(){const q=Q.raven;const res=await roll20('Убеждение → Атаман Ворон',talkMod(0)+ravenSway(),15);rollDone(2200);
  if(!res.ok)return say('Атаман Ворон','«Красиво говоришь. Только король тебя прислал, а не совесть». Он поднимает меч.',[['Драться',()=>{const b=GANG[0];if(b&&!b.dead)startCombat(b);}]]);
  for(const e of GANG){e.dead=true;e.dormant=false;e.o.visible=false;}q.state=2;q.spared=true;gainXP(450);questUI();save();
  say('Атаман Ворон','Рагнар долго молчит. Потом бросает меч на камни. «Ладно. Пойду к королю сам. Но скажи ему про тот посёлок. Пусть хоть раз посмотрит, как там живут». Его люди расходятся в темноту.');}
function ravenWake(){for(const e of GANG)if(e.dormant){e.dormant=false;e.dead=false;e.hp=e.max;e.o.visible=true;e.aware=false;}}
function ravenEnd(n){const q=Q.raven;q.state=3;questUI();actCheck();setTimeout(()=>{if(talkEl.hidden)journalEnd();},9000);repAdd('kingdom',q.rep,'атаман Ворон повержен');repAdd('village',2,'на дорогах спокойно');setTimeout(()=>addGold(q.gold,'Награда короля'),600);
  gainXP(300);window.handsGive&&window.handsGive([['sword_rune',1],['potion',3]],'Награда');
  for(const e of enemies)if(!e.dead&&e.model==='bandit'&&!e.boss){e.dead=true;e.o.visible=false;}
  if(q.spared)return say(n,'Рагнар пришёл сам. Стоял тут, где ты стоишь, и рассказывал про тот посёлок. Я отменил налог. А Рагнара отправлю на дальний маяк — это лучше, чем петля. Ты сделал больше, чем просто победил. Возьми меч с рунами. Получено: рунный меч, зелье лечения ×3.');
  say(n,'Ворон повержен? Рагнар… Я помню его. Лучший капитан моей стражи. Может, он был прав насчёт того налога. Посёлку я пошлю зерно — пусть хоть это останется от него. А ты возьми меч с рунами из моей оружейной, он твой по праву. Получено: рунный меч, зелье лечения ×3.');}
function ravenLoad(st){const q=Q.raven;if(!q||!st)return;q.step=st;q.title=RV_TITLE[st];
  if(q.state===1&&st!=='ask'&&st!=='feather'&&q.featherIt&&interact.includes(q.featherIt)){q.featherIt.grp.visible=false;interact.splice(interact.indexOf(q.featherIt),1);}
  if(q.state===3&&q.featherIt&&interact.includes(q.featherIt)){q.featherIt.grp.visible=false;interact.splice(interact.indexOf(q.featherIt),1);}
  if(q.state===1&&st==='lair')ravenWake();}
function kingTalk(a,n){const kin=repName('kingdom'),q=Q.crown;
  if(kin==='враг')return say(n,'Мне доложили, кто ты такой. Говорить нам не о чем. Стража, проводите.');
  if(q&&q.state<3){if(Q.road&&Q.road.state<3&&repLevel('kingdom')<2)return say(n,'Я тебя не знаю. На тракте у столицы грабят купцов — помоги страже, тогда и поговорим.');
    const[ask,ok,done,items]=a.qtext;const was=q.state;const r=offer(q,n,ask,ok,done,items);if(was===2&&q.state===3)setTimeout(ravenStart,1800);return r;}
  const rv=Q.raven;if(rv&&rv.state===0&&q&&q.state===3)return ravenStart();
  if(rv&&rv.state===2)return ravenEnd(n);
  if(rv&&rv.state===1)return say(n,{ask:'Поговори со старухой в посёлке '+rv.oldA.place.n+'. Она видела его людей.',feather:'Чёрное перо, говоришь? Значит, его люди так друг друга узнают. Найди такое перо.',stone:'Камень с вороном в руинах? Я про такой не слышал. Будь там осторожен.',lair:'Ты видел Ворона? Возвращайся, когда с ним будет покончено.'}[rv.step]);
  return say(n,kin==='герой'?'Вся столица говорит о тебе. Двери замка для тебя всегда открыты.':kin==='друг'?'Рад тебя видеть. Если снова будет нужна помощь, я позову.':'Спасибо за службу. Королевство это помнит.');}

// the ending: once the king has spoken, the chronicle tells what became of the island
function journalEnd(){say('Летопись острова','«'+CAMPAIGN.title+'» окончена. '+epilogue());}
