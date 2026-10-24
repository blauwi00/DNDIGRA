// ---------- a living island ----------
// Villagers keep a day: work outdoors in the morning and afternoon, fill the tavern in
// the evening, sleep at home at night, and run for cover in the rain. They greet the
// hero and talk among themselves. Animals roam and flee, gulls circle the dock, a dog
// tags along in the village, travellers get into trouble on the roads.
const nearFree=(x,z,r=4)=>{for(let k=0;k<=r;k++)for(let dz=-k;dz<=k;dz++)for(let dx=-k;dx<=k;dx++)if(free(x+dx,z+dz)&&!occupied(x+dx,z+dz))return [x+dx,z+dz];return [x,z];};
const DOOR=i=>ROOMS[i].door,TAV=ROOMS[0];
// held work tools, in the same box format as weapons
Object.assign(HELD,{
  rod:[[0,.2,0,.03,.8,.03,0x6a4426],[0,.62,0,.02,.12,.02,0x3a2416],[0,.4,.0,.006,.6,.006,0xe8e0c8]],
  axe:[[0,.14,0,.05,.46,.05,0x6a4426],[.07,.34,0,.14,.12,.03,0xa8adb5]],
  broom:[[0,.2,0,.04,.7,.04,0x8a6a40],[0,-.18,0,.16,.14,.06,0xc8a858]],
  hoe:[[0,.2,0,.04,.72,.04,0x6a4426],[.06,-.14,0,.14,.04,.05,0x8a8e94]],
  mug:[[0,.06,.04,.1,.12,.1,0x8a6a4a],[.07,.06,.04,.03,.07,.03,0x8a6a4a]],
  spear:[[0,.25,0,.04,1,.04,0x6a4426],[0,.78,0,.06,.14,.03,0xc8ccd2]]});
// work places around the village
const STALL=[29,28];{const g=new THREE.Group(),y=groundAt(...STALL);blockCell(...STALL);
  const P=(m,x,yy,z,sx,sy,sz)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(x,yy,z);o.castShadow=true;g.add(o);};
  P(lam(T.p[2]),0,.45,0,.95,.08,.6);for(const sx of [-1,1])for(const sz of [-1,1])P(lam(T.bark),sx*.42,.5,sz*.26,.06,1,.06);
  for(let i=0;i<5;i++){const o=new THREE.Mesh(BOX,new THREE.MeshLambertMaterial({color:i%2?0xb8352a:0xe8dcc0}));o.scale.set(.2,.04,.72);o.position.set(-.4+i*.2,1.02,0);o.rotation.x=.18;g.add(o);}
  for(const [c,x] of [[0xd8a040,-.25],[0x9a3a2a,0],[0x6a9a4a,.25]])P(new THREE.MeshLambertMaterial({color:c}),x,.54,0,.16,.1,.16);
  g.position.set(STALL[0]+.5,y,STALL[1]+.5);scene.add(g);}
const SPOTS={fish1:[2,31],fish2:[4,32],chop:[44,33],field:[24,42],sell:[29,29],sweep:[24,31],chat1:[25,29],chat2:[27,29],patrol:[[10,31],[26,33],[36,30],[50,22],[36,30],[26,33]]};
const LOOKS2=[{skin:'d9a27a',hair:'1c1612',cloth:'6a2a24',style:'short'},{skin:'f2d2b0',hair:'c8a060',cloth:'3a5a2a',style:'long'},{skin:'b9805a',hair:'1c1612',cloth:'4a3a5a',style:'bun'},
  {skin:'e9bf90',hair:'8a8a8a',cloth:'6a5a3a',style:'bald'},{skin:'e9bf90',hair:'6a2418',cloth:'284d6c',style:'tail'},{skin:'8a5a3a',hair:'1c1612',cloth:'2a2a2a',style:'short'},{skin:'f2d2b0',hair:'8a5a2a',cloth:'6a2a24',style:'long'}];
// villagers are built by the game's character builder in plain working clothes
const FEMALE=/а$|я$|Хильда|Агна|Марта/;
function villagerBoxes(name,look){const C=window.Characters;if(!C)return recolor(styleHair(MODELS['fighter-male'],look.style),look);
  const gender=FEMALE.test(name.split(' ').pop())||/Марта|Агна|Хильда/.test(name)?'female':'male',cls=['rogue','cleric','rogue','fighter'][Math.floor(hash2(name.length,name.charCodeAt(0))*4)];
  const ap=C.randomLook(cls,gender,()=>hash2(name.charCodeAt(1)||3,Math.random()*1e3));ap.cape='none';ap.outfit={rogue:['tunic','vest'],cleric:['monk','surplice'],fighter:['leather','tabard']}[cls][Math.random()<.5?0:1];
  if(ap.headgear==='helm'||ap.headgear==='crown'||ap.headgear==='wizhat')ap.headgear='none';return C.build(C.spec('hero',{classId:cls,appearance:ap}));}
function villager(name,look,o){const a=actor('innkeeper',...nearFree(...o.home),Object.assign({wander:0,spd:1.3,npc:name,talkId:'villager',villager:true},o));
  const m=buildModel(villagerBoxes(name,look));a.o.clear();[...m.children].forEach(c=>a.o.add(c));Object.assign(a.o.userData,m.userData);a.px=a.x+.5;a.pz=a.z+.5;return a;}
const V=[];
{const add=(name,look,role,house,tool,extra={})=>V.push(villager(name,look,Object.assign({role,house,tool,home:DOOR(house)},extra)));
 add('Свен-лесоруб',LOOKS2[0],'chop',3,'axe');add('Торговка Марта',LOOKS2[1],'sell',3,null);add('Агна',LOOKS2[2],'sweep',5,'broom');
 add('Старик Ульф',LOOKS2[3],'chat1',2,null);add('Хильда',LOOKS2[4],'chat2',2,null);add('Нильс',LOOKS2[5],'fish2',2,'rod');
 add('Стражник Бьорн',LOOKS2[6],'patrol',3,'halberd',{spd:1.5});}
// the old villagers join the routine too
{const f=actors.find(a=>a.talkId==='fisher');Object.assign(f,{villager:true,role:'fish1',house:2,tool:'rod'});V.push(f);
 const m=actors.find(a=>a.talkId==='miller');Object.assign(m,{villager:true,role:'field',house:4,tool:'hoe'});V.push(m);}

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
     if(job==='Стражник')setHeld(a.o,'R','spear');TOWN.push(a);}}}
// big-island quests: the capital wants the nearest robbers' camp gone, a village near the boar hills its fields
// saved, the stonecutters the bear away from the quarry. Kills count only near that place.
{const near=(type,from)=>GEN.places.filter(q=>q.type===type).sort((x,y)=>Math.hypot(x.x-from.x,x.z-from.z)-Math.hypot(y.x-from.x,y.z-from.z))[0];
 const cap=GEN.places.find(p=>p.type==='capital'),G=(p,job)=>TOWN.find(a=>a.place===p&&(!job||a.job===job));
 const camp=near('bandits',cap),boars=GEN.places.find(p=>p.type==='boars'),bear=GEN.places.find(p=>p.type==='bear'),works=GEN.places.find(p=>p.type==='works');
 const vil=boars&&GEN.places.filter(p=>p.type==='village'&&!p.stamp).sort((x,y)=>Math.hypot(x.x-boars.x,x.z-boars.z)-Math.hypot(y.x-boars.x,y.z-boars.z))[0];
 const mk=(key,giver,at,need,left,title,ask,ok,done,items,gold,rep)=>{if(!giver||!at)return;Q[key]={state:0,need,left,title,at,giverA:giver,gold,rep};giver.qk=key;giver.qtext=[ask,ok,done,items];};
 mk('road',G(cap,'Стражник'),camp,'Разбойник',2,'Разгромить лагерь разбойников у тракта','На дороге грабят купцов. Их лагерь недалеко от тракта, там двое. Разгонишь — заплатят из казны.',
   'Разогнал? Молодец. Вот деньги, и копьё моё старое возьми.','Купцы теперь ездят спокойно. Спасибо.',[['potion',1],['spear',1]],30,3);
 mk('boars',vil&&G(vil),boars,'Кабан',2,'Отогнать кабанов с полей: '+(vil?vil.n:''),'Кабаны с холмов все поля нам перерыли. Двое здоровых. Поможешь?',
   'Ну наконец-то! Вот, хлеба возьми.','Кабанов больше не видно. Хорошо.',[['bread',3]],15,1);
 mk('bear',works&&G(works),bear,'Медведь',1,'Прогнать медведя от каменоломни','В горах медведь мула нашего задрал. Пока он там, работать никто не идёт. Сможешь прогнать?',
   'Ушёл медведь? Вот спасибо. Держи, это от всех нас.','Работаем спокойно, без оглядки.',[['potion',2]],25,2);}
function townLines(a){const p=a.place,L=[],kin=repName('kingdom');
  if(a.kind==='capital'){L.push(kin==='враг'?'Слушай, шёл бы ты отсюда. Стражники тебя уже искали.':kin==='знакомый'?'А, это ты. Слышал, ты на дороге разбойников погонял.':kin==='друг'||kin==='герой'?'Привет! Говорят, это ты разбойников с дороги прогнал. Спасибо тебе.':'Ты не местный, да? Держись людных улиц, тут всякие ходят.');
    L.push('Рынок там, посередине. Только цены кусаются.','В порт ночью не ходи, там ворьё.','Опять налоги подняли. А жить на что?');}
  if(a.kind==='village')L.push(p.wealth>=3?'Земля у нас хорошая, и до города возить недалеко. Не жалуемся.':'Как урожай будет, так и проживём.','Хорошо, что речка рядом. Без неё никак.');
  if(a.kind==='poor')L.push(p.poorWhy==='болото'?'Болото кругом, ничего не растёт. Клюкву собираем да торф режем.':'До рынка далеко, а дорога — одно название.','Лекаря у нас нет. Заболел — терпи.');
  if(a.kind==='works')L.push('Мы камень ломаем. Его потом в город везут, на стены.','Пыльно тут, все кашляем. Зато платят вовремя.');
  const camp=GEN.places.filter(q=>q.type==='bandits').sort((x,y)=>Math.hypot(x.x-p.x,x.z-p.z)-Math.hypot(y.x-p.x,y.z-p.z))[0];
  if(camp&&Math.hypot(camp.x-p.x,camp.z-p.z)<70)L.push('На дороге опять грабят. Говорят, они сидят где-то '+(Math.abs(camp.x-p.x)>Math.abs(camp.z-p.z)?(camp.x>p.x?'на востоке':'на западе'):(camp.z>p.z?'на юге':'на севере'))+'.');
  const beast=GEN.places.filter(q=>['wolves','bear','boars'].includes(q.type)).sort((x,y)=>Math.hypot(x.x-p.x,x.z-p.z)-Math.hypot(y.x-p.x,y.z-p.z))[0];
  if(beast&&Math.hypot(beast.x-p.x,beast.z-p.z)<60)L.push({wolves:'Ночью волки воют. Скотину пораньше загоняем.',bear:'В горах медведь ходит. Туда лучше не соваться.',boars:'Кабаны на холмах все поля перерыли.'}[beast.type]);
  return L;}
// each talk says the next line, so a villager never repeats one before all are told
function townTalk(a,n){if(a.qk&&Q[a.qk].state<3){const[ask,ok,done,items]=a.qtext;return offer(Q[a.qk],n,ask,ok,done,items);}
  const L=townLines(a);const line=L[a.said%L.length];a.said++;return say(n,line);}

// ---------- weather ----------
const WX={rain:0,target:0,next:0};
const rainGeo=new THREE.BufferGeometry(),RN=500,rp=new Float32Array(RN*6);rainGeo.setAttribute('position',new THREE.BufferAttribute(rp,3));
const rain=new THREE.LineSegments(rainGeo,new THREE.LineBasicMaterial({color:0x9ab0c8,transparent:true,opacity:.45}));rain.frustumCulled=false;scene.add(rain);
for(let i=0;i<RN;i++){rp[i*6]=(Math.random()-.5)*26;rp[i*6+1]=Math.random()*9;rp[i*6+2]=(Math.random()-.5)*22;}
function weatherTick(dt){if(performance.now()>WX.next){WX.next=performance.now()+(60+Math.random()*120)*1000;WX.target=Math.random()<.3?.6+Math.random()*.4:0;}if(window.SET&&!SET.weather)WX.target=0;
  WX.rain+=(WX.target-WX.rain)*Math.min(1,dt*.15);const on=WX.rain>.03&&!room;rain.visible=on;
  if(on){rain.material.opacity=.5*WX.rain;for(let i=0;i<RN;i++){let y=rp[i*6+1]-dt*14;if(y<0){y=7+Math.random()*2;rp[i*6]=(Math.random()-.5)*26;rp[i*6+2]=(Math.random()-.5)*22;}
      rp[i*6+1]=y;rp[i*6+3]=rp[i*6]+.05;rp[i*6+4]=y+.45;rp[i*6+5]=rp[i*6+2];}
    rainGeo.attributes.position.needsUpdate=true;rain.position.set(focus.x,focus.y,focus.z);
    if(!room){hemi.intensity*=1-.35*WX.rain;moon.intensity*=1-.5*WX.rain;scene.fog.density+=.025*WX.rain;}}
  if(AC&&AMB.rain)AMB.rain.gain.setTargetAtTime(muted?0:(room?.012:.06)*WX.rain,AC.currentTime,.5);}

// ---------- the daily routine ----------
function phaseNow(){const p=worldTime;if(p>=.88||p<.24)return 'home';if(p>=.74)return 'tavern';if(WX.target>0&&WX.rain>.3)return 'tavern';return 'work';}
function hideIn(a){a.hidden=true;a.o.visible=false;a.route=null;a.where='home';}
function appear(a,[x,z]){a.hidden=false;a.o.visible=true;[a.x,a.z]=nearFree(x,z,3);a.px=a.x+.5;a.pz=a.z+.5;a.where='out';}
function goTo(a,[x,z],then){const t=nearFree(x,z,3);const p=path(a.x,a.z,t[0],t[1],a,false,3200);if(p&&p.length){a.route=p;a.dest=t;a.arrive=then||null;}else if(then)then();}
let lifeI=0;
// Olav waits on the pier until the new hero has spoken to him: the tutorial sends the player to him
const waitsForHero=a=>a.talkId==='fisher'&&typeof TUT!=='undefined'&&TUT.step>=0&&TUT.step<=1&&!TUT.flags.olav;
function lifeTick(){if(!V.length)return;const a=V[lifeI++%V.length];if(a.dead||a.hold>performance.now()||waitsForHero(a)||CB.on)return;const ph=phaseNow();
  if(a.role==='patrol'&&ph!=='home'){if(a.hidden)appear(a,DOOR(a.house));if(!a.route){a.pi=((a.pi||0)+1)%SPOTS.patrol.length;goTo(a,SPOTS.patrol[a.pi]);}a.act=null;return;}
  if(a.route)return;
  if(ph==='home'){if(a.where==='home')return;if(a.where==='tavern'){leaveTavern(a);return;}a.act=null;a.tool&&setHeld(a.o,'R',null);goTo(a,DOOR(a.house),()=>hideIn(a));a.where='going';return;}
  if(ph==='tavern'){if(a.where==='tavern')return;if(a.hidden)appear(a,DOOR(a.house));a.act=null;setHeld(a.o,'R',null);
    // through the door: appear on the inner threshold and walk to a stool, or stand at the bar with a mug
    goTo(a,DOOR(0),()=>{a.x=TAV.exit[0];a.z=TAV.exit[1]-1;a.px=a.x+.5;a.pz=a.z+.5;const stools=(TAV.seats||[]).slice().sort(()=>Math.random()-.5).filter(([x,z])=>free(x,z)&&!V.some(v=>v!==a&&v.seat&&v.seat[0]===x&&v.seat[1]===z));
      const sit=stools.length&&Math.random()<.75,seat=sit?stools[0]:nearFree(TAV.ox+6,TAV.oz+4,2);a.seat=sit?seat:null;a.where='tavern';
      goTo(a,seat,()=>{if(a.x===TAV.exit[0]&&a.z===TAV.exit[1]-1){[a.x,a.z]=nearFree(TAV.ox+2,TAV.oz+3,3);a.px=a.x+.5;a.pz=a.z+.5;} // never block the door
        a.act=sit?'sit':'drinkstand';setHeld(a.o,'R',sit&&Math.random()<.5?null:'mug');a.face=sit?Math.atan2(TAV.ox+6.5-a.px,TAV.oz+5-a.pz):Math.PI;});});a.where='going';return;}
  // work
  if(a.where==='tavern'){leaveTavern(a);return;}if(a.hidden)appear(a,DOOR(a.house));
  const spot=SPOTS[a.role];if(Math.abs(a.x-spot[0])+Math.abs(a.z-spot[1])>2){a.act=null;goTo(a,spot);a.where='out';return;}
  if(a.act!==a.role){a.act=a.role;if(a.tool)setHeld(a.o,'R',a.tool);
    a.face={fish1:-Math.PI/2,fish2:-Math.PI/2,chop:Math.PI/2,sell:0,chat1:Math.PI/2,chat2:-Math.PI/2}[a.role]??a.face;}}
function leaveTavern(a){a.act=null;a.seat=null;a.where='going';goTo(a,[TAV.exit[0],TAV.exit[1]-1],()=>{appear(a,DOOR(0));a.where='out';});}
// work and leisure motions, called from idleLife when a villager stands still
function workPose(a,r,b,t){const p=a.ph,k=t+p;switch(a.act){
  case 'fish1':case 'fish2':r.armL.rotation.set(-.9+Math.sin(k*.8)*.08,0,.1);break;
  case 'chop':{const c=(k*.9)%1,up=c<.55?c/.55:1-(c-.55)/.45;r.armL.rotation.set(-.2-2.2*up,0,-.2);b.rotation.x=.25*up;if(c<a.ck&&!room&&man(a,H0)<9)sfx('chopw');a.ck=c;break;}
  case 'sweep':r.armL.rotation.set(-.5,0,Math.sin(k*2.4)*.45);b.rotation.y=Math.sin(k*2.4)*.15;break;
  case 'field':{const c=(k*.7)%1;r.armL.rotation.set(-.4-1.3*Math.sin(c*Math.PI),0,0);b.rotation.x=.3*Math.sin(c*Math.PI);break;}
  case 'sell':r.armR.rotation.set(-.4-Math.max(0,Math.sin(k*1.3))*.9,0,-.3);r.head.rotation.y=Math.sin(k*.6)*.6;break;
  case 'chat1':case 'chat2':r.armR.rotation.set(-.5-Math.max(0,Math.sin(k*2.1))*.6,0,-.2);r.head.rotation.x=Math.sin(k*1.7)*.12;break;
  case 'sit':a.crouch=.16;r.legL.rotation.x=-1.3;r.legR.rotation.x=-1.3;r.head.rotation.y=Math.sin(k*.5)*.4;break;
  case 'drinkstand':r.armL.rotation.set(-.4-Math.max(0,Math.sin(k*.9))*1.4,0,.2);r.head.rotation.x=-Math.max(0,Math.sin(k*.9))*.3;break;
  case 'drink':a.crouch=.16;r.legL.rotation.x=-1.3;r.legR.rotation.x=-1.3;r.armL.rotation.set(-.6-Math.max(0,Math.sin(k*.9))*1.3,0,.2);break;}}

// ---------- talk bubbles ----------
const bubbles=[];let lastLine='';
function speak(a,text){if(!a.o.visible)return;const el=document.createElement('div');el.className='bark';el.textContent=text;stage.append(el);bubbles.push({a,el,t:performance.now()});a.barkT=performance.now();}
function barkLines(a){const ph=phaseNow(),hurt=H0.hp<H0.max*.5,L=[];const tod=worldTime;
  if(WX.rain>.4)L.push('Ну и льёт…','Скорей бы под крышу.','Дождь — рыбе радость.');
  if(hurt)L.push('Ты весь в крови! Сходи к травнице.','Эй, держись на ногах!');
  if(chapel.lit)L.push('Огонь в часовне! Спасибо тебе.','Ночью снова можно спать спокойно.');
  else L.push('Говорят, в руинах опять кто-то бродит.','Не ходи ночью к кладбищу.');
  if(Q.band.state===3)L.push('Разбойников больше нет, слава морю.');
  if(ph==='tavern')L.push('Пойдём, выпьем у Брама!','Слышал новую песню Брама?');
  L.push(tod<.4?'Доброе утро!':tod<.72?'Добрый день.':'Доброго вечера.');
  const own={chop:['Дерево само себя не нарубит.'],sell:['Свежая рыба! Яблоки!','Подходи, не стесняйся!'],sweep:['Опять натоптали…'],patrol:['Порядок на острове.','Не балуй.'],
    fish1:['Клюёт плохо сегодня.'],fish2:['Тише, рыбу распугаешь.'],field:['Земля в этом году добрая.'],chat1:['А я ей и говорю…'],chat2:['Да ты что!']}[a.act||a.role]||[];
  return L.concat(own,own);}
function barkTick(now){for(let i=bubbles.length-1;i>=0;i--){const B=bubbles[i],age=now-B.t;if(age>3200||!B.a.o.visible||paused){B.el.remove();bubbles.splice(i,1);continue;}
    const v=B.a.o.position.clone();v.y+=1.45;v.project(camera);const r=canvas.getBoundingClientRect();B.el.style.left=(v.x+1)/2*r.width+'px';B.el.style.top=(1-v.y)/2*r.height+'px';B.el.style.opacity=age>2700?String((3200-age)/500):'1';}
  // one voice at a time, never over a conversation, no line twice in a row
  if(CB.on||paused||!talkEl.hidden||bubbles.length)return;
  for(const a of actors){if(!a.npc||a.hidden||!a.o.visible||a.barkT>now-22000)continue;const d=Math.hypot(a.px-H0.px,a.pz-H0.pz);
    if(d<3.2&&Math.random()<.02){speak(a,lastLine=PEOPLE[a.npc]?personBark(a):pickLine(a,'b',barkLines(a)));a.face=Math.atan2(H0.px-a.px,H0.pz-a.pz);break;}}
  // villagers chatting with each other nearby
  const pair=[V.find(v=>v.act==='chat1'),V.find(v=>v.act==='chat2')];if(pair[0]&&pair[1]&&Math.hypot(pair[0].px-H0.px,pair[0].pz-H0.pz)<9&&Math.random()<.006){const s=pair[Math.random()<.5?0:1];
    if(s.barkT<now-6000||!s.barkT){const L=['А рыбак-то, слышала, снова сети порвал!','Брам новое пиво сварил.','Травница говорит, скоро шторм.','Ох, мои колени к дождю…','Чужак-то наш, видать, не робкого десятка.'];speak(s,L[Math.floor(Math.random()*L.length)]);}}
  // a busy tavern hums
  if(AC&&AMB.crowd){const n=room===TAV?V.filter(v=>v.where==='tavern').length:0;AMB.crowd.gain.setTargetAtTime(muted?0:Math.min(.05,n*.008),AC.currentTime,.5);}}

// ---------- animals ----------
const critters=[];
function makeCritter(kind){const g=new THREE.Group(),C=(c,x,y,z,w,h,d,p=g)=>{const m=new THREE.Mesh(box(w,h,d),new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m;};const parts={};
  if(kind==='deer'){C(0x8a5a34,0,.42,0,.22,.2,.5);for(const [x,z] of [[-.07,-.18],[.07,-.18],[-.07,.18],[.07,.18]])C(0x6a4428,x,.18,z,.05,.34,.05);parts.head=C(0x8a5a34,0,.62,.28,.14,.14,.16);C(0xe8dcc0,0,.4,-.25,.08,.08,.04);
    for(const s of [-1,1]){C(0xd8c8a0,s*.06,.76,.26,.02,.14,.02);C(0xd8c8a0,s*.09,.82,.24,.06,.02,.02);}}
  if(kind==='rabbit'){C(0x9a8a78,0,.09,0,.12,.1,.16);parts.head=C(0x9a8a78,0,.15,.09,.08,.08,.08);for(const s of [-1,1])C(0x9a8a78,s*.02,.23,.08,.02,.1,.02);C(0xf0f0f0,0,.1,-.09,.04,.04,.03);}
  if(kind==='chicken'){C(0xf0ece0,0,.12,0,.12,.12,.16);parts.head=C(0xf0ece0,0,.22,.07,.07,.08,.07);C(0xd83a2a,0,.27,.07,.02,.04,.05);C(0xe8a030,0,.21,.12,.03,.02,.04);for(const s of [-1,1])C(0xe8a030,s*.03,.03,0,.02,.06,.02);}
  if(kind==='crow'||kind==='gull'){const col=kind==='crow'?0x1e1e24:0xf0f0f4;C(col,0,.07,0,.08,.07,.16);parts.head=C(col,0,.11,.08,.06,.06,.06);C(kind==='crow'?0x2a2a2a:0xe8a030,0,.1,.12,.02,.02,.04);
    parts.wl=C(col,-.08,.09,0,.12,.015,.1);parts.wr=C(col,.08,.09,0,.12,.015,.1);if(kind==='gull'){parts.wl.material=parts.wr.material=new THREE.MeshLambertMaterial({color:0xc8ccd4});}}
  if(kind==='dog'){C(0x8a6a44,0,.2,0,.16,.14,.36);for(const [x,z] of [[-.05,-.12],[.05,-.12],[-.05,.12],[.05,.12]])C(0x6a4a2a,x,.07,z,.05,.14,.05);parts.head=C(0x8a6a44,0,.3,.22,.14,.12,.14);
    C(0x2a2a2a,0,.29,.3,.05,.04,.04);for(const s of [-1,1])C(0x6a4a2a,s*.05,.38,.2,.04,.06,.03);parts.tail=C(0x8a6a44,0,.28,-.2,.03,.03,.12);}
  scene.add(g);return {kind,g,parts};}
function spawnCritter(kind,area,r,o={}){const c=Object.assign(makeCritter(kind),{area,r,ph:Math.random()*9,state:'idle',t:0},o);const [x,z]=nearFree(area[0]+Math.round((Math.random()-.5)*r),area[1]+Math.round((Math.random()-.5)*r),4);
  c.x=x+.5;c.z=z+.5;c.tx=c.x;c.tz=c.z;c.y=0;critters.push(c);return c;}
for(let i=0;i<4;i++)spawnCritter('deer',[58,38],14);for(let i=0;i<5;i++)spawnCritter('rabbit',[40,46],18);for(let i=0;i<5;i++)spawnCritter('chicken',[22,33],6);
for(let i=0;i<4;i++)spawnCritter('crow',[52,12],10);for(let i=0;i<5;i++)spawnCritter('gull',[4,31],10,{fly:true,y:2.5});
const dog=spawnCritter('dog',[24,30],4,{dog:true});
function critterTick(dt,t){const hx=H0.px,hz=H0.pz,fx=focus.x,fz=focus.z;
  for(const c of critters){const far=Math.abs(c.x-fx)>18||Math.abs(c.z-fz)>16;c.g.visible=!room&&!far&&!(c.kind==='chicken'&&phaseNow()==='home');if(far||room)continue;
    const dh=Math.hypot(c.x-hx,c.z-hz),k=c.kind;
    if(k==='gull'){c.ang=(c.ang||c.ph)+dt*.5;const R=4+Math.sin(c.ph)*2;c.x=c.area[0]+Math.cos(c.ang)*R;c.z=c.area[1]+Math.sin(c.ang)*R;c.g.position.set(c.x,2.6+Math.sin(t+c.ph)*.3,c.z);c.g.rotation.y=-c.ang;
      const f=Math.sin(t*6+c.ph)*.5;c.parts.wl.rotation.z=f;c.parts.wr.rotation.z=-f;continue;}
    if(c.dog){const tgt=Math.hypot(hx-Z.village[0],hz-Z.village[1])<16&&!room?[hx-1,hz+1]:c.area;const dd=Math.hypot(tgt[0]-c.x,tgt[1]-c.z);
      if(dd>1.4&&free(Math.floor(c.x+(tgt[0]-c.x)/dd*.3),Math.floor(c.z+(tgt[1]-c.z)/dd*.3))){const s=Math.min(dd-1,dt*3.2);c.x+=(tgt[0]-c.x)/dd*s;c.z+=(tgt[1]-c.z)/dd*s;c.g.rotation.y=Math.atan2(tgt[0]-c.x,tgt[1]-c.z);c.moving=true;}else c.moving=false;
      c.parts.tail.rotation.y=Math.sin(t*14)*.6;c.g.position.set(c.x,groundAt(c.x,c.z)+(c.moving?Math.abs(Math.sin(t*14))*.04:0),c.z);if(c.moving&&Math.random()<dt*.15&&dh<5)sfx('bark');continue;}
    // flee from the hero (birds take off), otherwise wander and graze
    const spook=k==='deer'?(H0.sneak?2.5:5.5):k==='crow'?(H0.sneak?1.8:3.5):k==='rabbit'?(H0.sneak?1.5:3):1.2;
    if(dh<spook&&c.state!=='flee'){c.state='flee';c.t=0;if(k==='crow')sfx('flap');const ax=(c.x-hx)/dh,az=(c.z-hz)/dh;c.tx=c.x+ax*8;c.tz=c.z+az*8;}
    if(c.state==='flee'){c.t+=dt;const sp=k==='deer'?4.2:k==='rabbit'?3.6:k==='crow'?3:2;const dx=c.tx-c.x,dz=c.tz-c.z,d=Math.hypot(dx,dz);
      if(k==='crow'){c.y=Math.min(4,c.y+dt*2.2);c.x+=dx/d*sp*dt;c.z+=dz/d*sp*dt;const f=Math.sin(t*20)*.7;c.parts.wl.rotation.z=f;c.parts.wr.rotation.z=-f;}
      else if(d>.2&&free(Math.floor(c.x+dx/d*.4),Math.floor(c.z+dz/d*.4))){c.x+=dx/d*sp*dt;c.z+=dz/d*sp*dt;}else c.t=9;
      c.g.rotation.y=Math.atan2(dx,dz);if(c.t>(k==='crow'?4:3)){c.state='idle';if(k==='crow'){c.y=0;const [x,z]=nearFree(c.area[0]+Math.round((Math.random()-.5)*c.r),c.area[1]+Math.round((Math.random()-.5)*c.r));c.x=x+.5;c.z=z+.5;}c.tx=c.x;c.tz=c.z;}}
    else{c.t+=dt;if(c.t>2+Math.random()*4){c.t=0;const [x,z]=nearFree(Math.floor(c.x+(Math.random()-.5)*4),Math.floor(c.z+(Math.random()-.5)*4),1);if(Math.hypot(x-c.area[0],z-c.area[1])<c.r){c.tx=x+.5;c.tz=z+.5;}}
      const dx=c.tx-c.x,dz=c.tz-c.z,d=Math.hypot(dx,dz);if(d>.05){const sp=k==='deer'?.8:k==='rabbit'?1.4:.6;c.x+=dx/d*Math.min(d,sp*dt);c.z+=dz/d*Math.min(d,sp*dt);c.g.rotation.y=Math.atan2(dx,dz);c.moving=true;}else c.moving=false;
      if(c.parts.head)c.parts.head.rotation.x=c.moving?0:Math.max(0,Math.sin(t*(k==='chicken'?5:1.2)+c.ph))*(k==='chicken'?.8:.6);
      if(c.parts.wl){c.parts.wl.rotation.z=0;c.parts.wr.rotation.z=0;}}
    const hop=(k==='rabbit'&&(c.moving||c.state==='flee'))?Math.abs(Math.sin(t*12+c.ph))*.12:(k==='deer'&&c.state==='flee')?Math.abs(Math.sin(t*10))*.15:0;
    c.g.position.set(c.x,groundAt(c.x,c.z)+(c.y||0)+hop,c.z);}}

// ---------- events on the roads ----------
const ROADS=[];for(let z=0;z<OUT_H;z++)for(let x=0;x<W;x++)if(at(x,z)==='D'&&!solid.has(x+','+z))ROADS.push([x,z]);
let EV=null,evNext=performance.now()+90000;
function eventTick(now){if(CB.on||room||paused)return;
  if(EV){const tr=EV.trav,alive=EV.foes.filter(e=>!e.dead);
    if(!alive.length&&!EV.done){EV.done=true;tr.act=null;speak(tr,'Спасибо! Ты спас мне жизнь!');setTimeout(()=>{if(man(tr,H0)<6){window.handsGive([['potion',1],['bread',1]],'Благодарность путника');}
        goTo(tr,Z.village,()=>{tr.dead=true;tr.o.visible=false;});EV=null;evNext=now+150000+Math.random()*120000;},1200);}
    else if(!EV.done&&now-EV.t>150000){speak(tr,'Бегу!');goTo(tr,Z.village,()=>{tr.dead=true;tr.o.visible=false;});for(const e of alive){e.dead=true;e.o.visible=false;}EV=null;evNext=now+120000;}
    else if(!EV.done&&!EV.seen&&man(tr,H0)<14){EV.seen=true;speak(tr,'Помогите! Волки!');sfx('notice');}
    return;}
  if(now<evNext||phaseNow()==='home')return;
  const cand=ROADS.filter(([x,z])=>{const d=Math.hypot(x-H0.x,z-H0.z);return d>10&&d<16&&Math.hypot(x-Z.village[0],z-Z.village[1])>12;});if(!cand.length){evNext=now+20000;return;}
  const [x,z]=cand[Math.floor(Math.random()*cand.length)];const trav=villager('Путник',LOOKS2[Math.floor(Math.random()*LOOKS2.length)],{role:'trav',home:[x,z],house:0});trav.act='chat1';trav.villager=false;
  const foes=[];for(const [dx,dz] of [[2,1],[-2,1]]){const [fx,fz]=nearFree(x+dx,z+dz,3);const w=foe('wolf',fx,fz,{wander:0,temp:true});addBar(w);w.face=Math.atan2(trav.px-w.px,trav.pz-w.pz);foes.push(w);}
  EV={trav,foes,t:now};questFocus=null;}
