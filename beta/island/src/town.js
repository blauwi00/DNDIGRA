// ---------- townsfolk of the big island ----------
// Each generated settlement gets people by its size and wealth; they walk about their square and talk
// about their own place: why it is rich or poor, the bandits on the road, the capital's quarters.
const TOWN=[];
{const MN=['Арвид','Бренн','Гуннар','Даг','Ивар','Кнуд','Лейф','Магнус','Олаф','Ренье','Сигурд','Торвальд','Эйрик','Ян','Бьорн','Готфрид'],
   FN=['Астрид','Бирта','Гудрун','Дагни','Ингрид','Кайса','Лив','Марит','Ранхильд','Сольвейг','Тора','Хельга','Эльса','Ютта','Сигне','Фрейя'],
   JOB={capital:['Стражник','Торговец','Писарь','Ремесленник','Горожанка','Жрица','Купчиха','Подмастерье','Глашатай','Нищий'],
     village:['Пахарь','Пастух','Мельничиха','Пасечник','Крестьянка','Бондарь'],works:['Каменотёс','Каменотёс','Десятник'],poor:['Торфяник','Сборщица клюквы','Старуха','Батрак']};
 let k=0;
 for(const p of GEN.places.filter(p=>!p.stamp&&['capital','village','works'].includes(p.type))){
   const kind=p.type==='capital'?'capital':p.type==='works'?'works':p.poorWhy?'poor':'village',n=kind==='capital'?10:kind==='works'?3:kind==='poor'?3:3+Math.round((p.wealth||0)*.6);
   for(let i=0;i<n;i++,k++){const job=JOB[kind][i%JOB[kind].length],fem=/а$|я$|Купчиха|Жрица|Горожанка|Мельничиха|Крестьянка|Старуха/.test(job),nm=(fem?FN:MN)[(k*7+i*3)%16];
     let npc=job+' '+nm;while(actors.some(o=>o.npc===npc))npc+=' '+['Младший','Старший','из '+(p.type==='capital'?'столицы':'посёлка')][TOWN.length%3];
     const look=LOOKS2[(k+i)%LOOKS2.length],a=actor('innkeeper',...nearFree(p.x+((i*5)%7)-3,p.z+((i*3)%5)-2,4),{wander:kind==='capital'?6:3,spd:1.2,npc,job,talkId:'town',place:p,kind,said:0});
     const m=buildModel(villagerBoxes((fem?'а':'')+nm,look));a.o.clear();[...m.children].forEach(c=>a.o.add(c));Object.assign(a.o.userData,m.userData);a.px=a.x+.5;a.pz=a.z+.5;
     if(job==='Стражник')setHeld(a.o,'R','spear');a.workAct={'Стражник':'guard','Торговец':'sell','Купчиха':'sell','Глашатай':'chat1','Пахарь':'field','Крестьянка':'field','Торфяник':'field','Каменотёс':'chop','Десятник':'chat1'}[job]||'chat1';TOWN.push(a);}}}
// ---------- the castle court, shopkeepers and people who sleep at home ----------
// The king holds court in the throne hall with two guards and a maid; a shopkeeper stands behind the counter
// of their own house; every other townsman owns a house of their place and goes there for the night.
function townsman(x,z,o,fem,nm,look,extra){const a=actor('innkeeper',x,z,Object.assign({spd:1.2,talkId:'town',said:0},o));
  const m=buildModel(villagerBoxes((fem?'а':'')+nm,look,extra));a.o.clear();[...m.children].forEach(c=>a.o.add(c));Object.assign(a.o.userData,m.userData);a.px=a.x+.5;a.pz=a.z+.5;a.home=[a.x,a.z];return a;}
const COURT=[];let KING=null;
{const R=ROOMS.find(r=>r.type==='castle');if(R){const cx=Math.floor(R.iw/2),cap=R.place;
   KING=townsman(R.ox+cx,R.oz+3,{wander:0,npc:'Король Хальвдан',talkId:'king',place:cap,kind:'castle',face:0},false,'Хальвдан',LOOKS2[3%LOOKS2.length],{headgear:'crown',cape:'long',capeColor:'#8e2a24',trim:'#d8b04a',outfit:'tabard',beard:'full'});KING.workAct='guard';setHeld(KING.o,'R','staff_moon');
   for(const [dx,nm] of [[-2,'Ульф'],[2,'Стейн']]){const g=townsman(R.ox+cx+dx,R.oz+3,{wander:0,npc:'Стражник '+nm,job:'Стражник',place:cap,kind:'castle',face:0},false,nm,LOOKS2[(dx+5)%LOOKS2.length]);g.workAct='guard';setHeld(g.o,'R','spear');COURT.push(g);}
   const m=townsman(R.ox+cx,R.oz+R.id-4,{wander:3,npc:'Служанка Агнета',job:'Служанка',place:cap,kind:'castle'},true,'Агнета',LOOKS2[7%LOOKS2.length]);m.workAct='sweep';COURT.push(m);}}
// a sellsword in Заводь's tavern: the first companion an island offers
{const T=ROOMS.find(r=>r.type==='tavern');if(T){const [x,z]=nearFree(T.ox+T.iw-3,T.oz+T.id-3,3);
  const m=townsman(x,z,{wander:1,npc:'Наёмник Сигвальд',talkId:'merc',job:'Наёмник',place:null,kind:'merc',hire:15,
    name:'Сигвальд',hp:16,max:16,ac:14,atk:4,dmg:8,dmgB:2,dex:1,speed:6,atkName:'Топор',hireLine:'Договорились. Иду за тобой. В драке держись рядом, вдвоём отобьёмся.'},false,'Сигвальд',LOOKS2[5%LOOKS2.length],{headgear:'helm'});
  setHeld(m.o,'R','axe_hand');m.workAct='drinkstand';}}
const KEEPERS=[];
{const N={smith:['Кузнец','Хокон',false],baker:['Пекарь','Эрленд',false],store:['Лавочница','Гретта',true]};let i=0;
 for(const R of ROOMS.filter(r=>r.shop)){const [job,nm,fem]=N[R.shop];let npc=job+' '+nm;while(actors.some(o=>o.npc===npc))npc+=' из '+(R.place.type==='capital'?'столицы':R.place.n);
   const a=townsman(R.ox+2,R.oz+1,{wander:0,npc,job,place:R.place,kind:'shop',shopKind:R.shop,houseRoom:R,face:0},fem,nm,LOOKS2[(i++*5+2)%LOOKS2.length]);a.workAct=R.shop==='smith'?'chat1':'sell';KEEPERS.push(a);}}
// owners: the townsfolk of a place take its houses in turn; a house left over stays empty
{const free_=new Map();for(const R of ROOMS)if(R.gen&&!R.shop&&(R.type==='house'||R.type==='poorhouse'))(free_.get(R.place)||free_.set(R.place,[]).get(R.place)).push(R);
 for(const a of TOWN){const L=free_.get(a.place);if(L&&L.length){a.houseRoom=L.shift();a.outHome=a.home||[a.x,a.z];a.where='out';}}}
const nightNow=()=>worldTime>=.9||worldTime<.24;
// a townsman walks to their door at night and spends it inside; at dawn they step out again.
// Far from the hero, where no one can see, they simply are where they should be.
let townI=0;
function townTick(){if(!TOWN.length||CB.on)return;for(let n=0;n<4;n++){const a=TOWN[townI++%TOWN.length],R=a.houseRoom;if(!R||a.dead||a.route&&a.where!=='goingHome'&&!a.far||waitsForHero(a))continue;
  const night=nightNow(),indoor=a.where==='home';
  const inside=()=>{const c=nearFree(R.ox+Math.floor(R.iw/2),R.oz+2,3);a.x=c[0];a.z=c[1];a.px=a.x+.5;a.pz=a.z+.5;a.home=[a.x,a.z];a.wander=1;a.where='home';a.workAct='sit';a.route=null;};
  const outside=()=>{const c=nearFree(R.door[0],R.door[1]+1,4);a.x=c[0];a.z=c[1];a.px=a.x+.5;a.pz=a.z+.5;a.home=a.outHome;a.wander=a.kind==='capital'?6:3;a.where='out';a.workAct=a.dayAct||a.workAct;a.route=null;};
  if(a.where==='goingHome'&&(a.far||!a.route)){inside();continue;}
  if(night&&!indoor&&a.where!=='goingHome'){a.dayAct=a.dayAct||a.workAct;if(a.far)inside();else{a.where='goingHome';goTo(a,[R.door[0],R.door[1]+1],inside);}}
  else if(!night&&indoor&&!(room===R&&Math.hypot(a.px-H0.px,a.pz-H0.pz)<3))outside();}}
function townLines(a){const p=a.place,L=[],kin=repName('kingdom');
  if(a.kind==='capital'){L.push(kin==='враг'?'Слушай, шёл бы ты отсюда. Стражники тебя уже искали.':kin==='знакомый'?'А, это ты. Слышал, ты на дороге разбойников погонял.':kin==='друг'||kin==='герой'?'Привет! Говорят, это ты разбойников с дороги прогнал. Спасибо тебе.':'Ты не местный, да? Держись людных улиц, тут всякие ходят.');
    L.push('Рынок там, посередине. Только цены кусаются.','В порт ночью не ходи, там ворьё.','Опять налоги подняли. А жить на что?');}
  if(a.kind==='village')L.push(p.wealth>=3?'Земля у нас хорошая, и до города возить недалеко. Не жалуемся.':'Как урожай будет, так и проживём.','Хорошо, что речка рядом. Без неё никак.');
  if(a.kind==='poor')L.push(p.poorWhy==='болото'?'Болото кругом, ничего не растёт. Клюкву собираем да торф режем.':'До рынка далеко, а дорога — одно название.','Лекаря у нас нет. Заболел — терпи.');
  if(a.kind==='castle')L.push('Король принимает в тронном зале. Говори коротко и по делу.','Тут всегда холодно, сколько ни топи.','В замке тихо, пока на дорогах спокойно.');
  if(a.kind==='shop')L.push({smith:'Железо везут из столицы. Дорого, а куда деваться.',baker:'Встаю затемно, тесто ждать не будет.',store:'У меня всё, что в дорогу надо. Заходи, смотри.'}[a.shopKind],'Торговля то идёт, то нет. Как разбойники на дороге, так никто не ездит.');
  if(a.where==='home')return ['Поздно уже. Спать ложусь, завтра поговорим.','Ночь на дворе, чего тебе?'];
  if(a.kind==='works')L.push('Мы камень ломаем. Его потом в город везут, на стены.','Пыльно тут, все кашляем. Зато платят вовремя.');
  const camp=GEN.places.filter(q=>q.type==='bandits').sort((x,y)=>Math.hypot(x.x-p.x,x.z-p.z)-Math.hypot(y.x-p.x,y.z-p.z))[0];
  if(a.kind==='village'||a.kind==='poor')L.push('В глухом лесу, говорят, старик со стаей живёт. Седой его кличут. Волки его слушаются.');
  if(Q.raven&&Q.raven.state<3&&(a.kind==='capital'||a.kind==='village'))L.push('Говорят, у разбойников теперь один главный. Ворон его кличут.');
  if(Q.raven&&Q.raven.state===3)L.push('Слыхал? Ворона больше нет. Купцы опять поехали.');
  if(camp&&Math.hypot(camp.x-p.x,camp.z-p.z)<70)L.push('На дороге опять грабят. Говорят, они сидят где-то '+(Math.abs(camp.x-p.x)>Math.abs(camp.z-p.z)?(camp.x>p.x?'на востоке':'на западе'):(camp.z>p.z?'на юге':'на севере'))+'.');
  const beast=GEN.places.filter(q=>['wolves','bear','boars'].includes(q.type)).sort((x,y)=>Math.hypot(x.x-p.x,x.z-p.z)-Math.hypot(y.x-p.x,y.z-p.z))[0];
  if(beast&&Math.hypot(beast.x-p.x,beast.z-p.z)<60)L.push({wolves:'Ночью волки воют. Скотину пораньше загоняем.',bear:'В горах медведь ходит. Туда лучше не соваться.',boars:'Кабаны на холмах все поля перерыли.'}[beast.type]);
  return L;}
// each talk says the next line, so a villager never repeats one before all are told
function townTalk(a,n){const rv=Q.raven;if(rv&&rv.state>=1&&a===rv.oldA&&rv.state<3)return ravenOld(n);if(a.qk&&Q[a.qk].state<3){const[ask,ok,done,items]=a.qtext;return offer(Q[a.qk],n,ask,ok,done,items);}
  const L=townLines(a);const line=L[a.said%L.length];a.said++;return say(n,line);}

