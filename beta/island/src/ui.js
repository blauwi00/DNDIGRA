// ---------- toasts ----------
let toastT=0;function toast(text,ms=2600){dice.hidden=false;dice.textContent=text;clearTimeout(toastT);toastT=setTimeout(()=>dice.hidden=true,ms);}
const hint={set textContent(v){if(v)toast(v)}};

// ---------- action wheel ----------
// Tap a character (or a rock): a ring of verbs opens around it. "Атаковать" opens a
// second ring with what the hero holds in each hand. Everything the player can do to
// someone lives here; there are no screen buttons.
const wheelEl=document.getElementById('wheel');let wheelOf=null;
const ICONS={ // 16x16 pixel glyphs, drawn with currentColor
  attack:'M12 1h3v3l-8 8-2-2zM3 10l3 3-1 1 1 1-1 1-1-1-2 2-1-1 2-2-1-1 1-1z',
  shove:'M2 7h8V4l5 4-5 4V9H2z',
  stone:'M4 6l4-3 5 2 2 5-3 4H5l-3-3z',
  look:'M1 8c2-4 5-5 7-5s5 1 7 5c-2 4-5 5-7 5s-5-1-7-5zm7-3a3 3 0 100 6 3 3 0 000-6z',
  talk:'M2 2h12v9H7l-4 3v-3H2z',
  trade:'M3 4h10l-1 9H4zM6 4a2 2 0 014 0',
  job:'M2 6h12v8H2zM6 3h4v3H6z',
  potion:'M6 1h4v2H9v3l4 4v4H3v-4l4-4V3H6z',
  bread:'M2 8c0-3 3-5 6-5s6 2 6 5v4H2z',
  sneak:'M3 9h4v5H3zm6-6h4v5H9zM3 6h3v2H3zm6-5h3v1H9z',
  stand:'M7 1h2v2H7zM5 4h6v5H9v6H7V9H5z',
  end:'M3 1h10v2l-4 5 4 5v2H3v-2l4-5-4-5z',
  special:'M8 1l2 5h5l-4 3 2 6-5-4-5 4 2-6-4-3h5z',
  back:'M7 3L2 8l5 5V9h7V7H7z',
  pick:'M7 1h2v8l3-3 1 1-5 5-5-5 1-1 3 3z',
  close:'M3 2l5 5 5-5 1 1-5 5 5 5-1 1-5-5-5 5-1-1 5-5-5-5z'};
const svg=k=>'<svg viewBox="0 0 16 16" width="22" height="22" aria-hidden="true"><path fill="currentColor" d="'+ICONS[k]+'"/></svg>';
function closeWheel(){wheelEl.hidden=true;wheelEl.replaceChildren();wheelOf=null;}
wheelEl.addEventListener('pointerdown',e=>e.stopPropagation());
// items: {icon|img, label, sub, ok, run}
function showWheel(target,items,title){closeWheel();wheelOf=target;wheelEl.hidden=false;
  const n=items.length,R=n<=3?62:n<=5?70:78;
  const t=document.createElement('div');t.className='wtitle';t.textContent=title;wheelEl.append(t);
  items.forEach((it,i)=>{const a=-Math.PI/2+(n===1?0:(i/(n))*Math.PI*2),b=document.createElement('button');b.className='wbtn';b.disabled=it.ok===false;
    b.style.left=Math.cos(a)*R+'px';b.style.top=Math.sin(a)*R+'px';
    b.innerHTML='<span class="ring">'+(it.img?'<img alt="" src="'+it.img+'">':svg(it.icon))+'</span><span class="wl"></span>'+(it.sub?'<span class="ws"></span>':'');
    b.querySelector('.wl').textContent=it.label;if(it.sub)b.querySelector('.ws').textContent=it.sub;b.setAttribute('aria-label',it.label+(it.sub?', '+it.sub:''));
    b.onclick=ev=>{ev.stopPropagation();sfx('click');if(it.keep)it.run();else{closeWheel();it.run();}};
    b.style.transitionDelay=(i*25)+'ms';wheelEl.append(b);});
  const c=document.createElement('button');c.className='wclose';c.innerHTML=svg('close');c.setAttribute('aria-label','Закрыть');c.onclick=ev=>{ev.stopPropagation();closeWheel();};wheelEl.append(c);
  placeWheel();requestAnimationFrame(()=>wheelEl.classList.add('open'));}
function placeWheel(){if(!wheelOf)return;if(wheelOf.o&&(!wheelOf.o.visible||wheelOf.dead)||!document.getElementById('chestui').hidden)return closeWheel();const o=wheelOf.o||wheelOf.mesh||wheelOf,v=(wheelOf.pos||o.position).clone();v.y+=.6;v.project(camera);const r=canvas.getBoundingClientRect();
  const m=96;wheelEl.style.left=Math.min(r.width-m,Math.max(m,(v.x+1)/2*r.width))+'px';const top=Math.min(r.height-m,Math.max(m+20,(1-v.y)/2*r.height));wheelEl.style.top=top+'px';wheelEl.classList.toggle('tbelow',top<210);}
const count=id=>window.handsCount?window.handsCount(id):0;

function enemyWheel(e){const fight=CB.on,items=[];
  items.push({icon:'attack',label:'Атаковать',sub:fight&&CB.acted?'действие потрачено':'',ok:!(fight&&CB.acted),keep:true,run:()=>attackWheel(e)});
  items.push({icon:'shove',label:'Толкнуть',sub:'Атлетика +'+HERO.athletics,ok:reachable(e)&&!(fight&&CB.acted),run:()=>doVerb(e,()=>shove(e),{adj:man(e,H0)>1})});
  const st=count('stone');
  if(fight)items.push({icon:'stone',label:'Отвлечь камнем',sub:st?'камней: '+st:'нет камней',ok:st>0&&man(e,H0)<=6&&!CB.acted,run:()=>doVerb(e,()=>stoneFoe(e))});
  else if(!e.aware)items.push({icon:'stone',label:'Отвлечь камнем',sub:st?'бросить рядом · камней: '+st:'нет камней',ok:st>0,run:()=>{const [x,z]=noiseCellNear(e);if(Math.hypot(x-H0.x,z-H0.z)>9)return toast('Подойдите ближе, чтобы добросить камень.');stoneNoise(x,z);}});
  items.push({icon:'look',label:'Осмотреть',run:()=>toast(e.name+': здоровье '+Math.max(0,e.hp)+' из '+e.max+', КД '+e.ac+', '+(e.range>1?'стреляет на '+e.range+' клеток'+(e.long>e.range?', дальше до '+e.long+' с помехой':''):'бьёт вблизи')+(e.aware?'.':'. Вас не видит.'),4000)});
  showWheel(e,items,e.name+' · '+Math.max(0,e.hp)+'/'+e.max);}
function attackWheel(e){const C=HERO.cls,R=RACES[HERO.race]||{},items=[],near=man(e,H0)===1;
  const left=(k,n)=>SP[k]?n+' · '+SP[k]+' ост.':'нужен отдых',bonusOk=()=>!CB.on||heroTurn()&&!CB.bonus;
  for(const a of heroAttacks()){const A=advantage(H0,e,a),adv=A.v,inR=a.range>1?man(e,H0)<=(a.long||a.range):reachable(e);
    items.push({img:a.id?window.handsIconURL(a.id):null,icon:a.kind==='spell'?'special':'attack',label:a.n,sub:inR?(a.save?'спасбросок':chance(a.hit+A.pen,e.ac,adv)+'%'+(A.far?' · далеко':(adv>0?' ▲':adv<0?' ▼':'')+' · '+a.hand)):'не достать',ok:inR,
      run:()=>doVerb(e,()=>attack(H0,e,a),{adj:a.range===1&&man(e,H0)>1})});
    if(C==='paladin'&&a.kind==='melee'&&a.id)items.push({icon:'special',label:'Кара: '+a.n.toLowerCase(),sub:left('smite','+2к8'),ok:SP.smite>0&&inR,run:()=>doVerb(e,()=>{SP.smite--;return attack(H0,e,Object.assign({},a,{n:'Божественная кара',smite:true}));},{adj:man(e,H0)>1})});}
  if(C==='mage'||C==='sorcerer')items.push({icon:'special',label:'Маг. стрела',sub:left('missiles','без промаха'),ok:SP.missiles>0&&man(e,H0)<=8,run:()=>doVerb(e,()=>magicMissile(e))});
  if(C==='druid')items.push({icon:'special',label:'Опутывание',sub:left('entangle','валит с ног'),ok:SP.entangle>0&&man(e,H0)<=6,run:()=>doVerb(e,()=>entangle(e))});
  if(C==='monk')items.push({icon:'attack',label:'Шквал ударов',sub:left('flurry','бонус'),ok:SP.flurry>0&&near&&bonusOk(),run:()=>doVerb(e,()=>{SP.flurry--;return attack(H0,e,{n:'Шквал ударов',hit:HERO.melee,die:HERO.unarmed||4,k:1,b:HERO.mb,range:1,kind:'melee'});},{kind:'bonus'})});
  if(C==='ranger'&&CB.mark!==e)items.push({icon:'look',label:'Метка охотника',sub:'бонус · +1к6',ok:bonusOk(),run:()=>doVerb(e,()=>markTarget(e,'метка'),{kind:'bonus'})});
  if(C==='warlock'&&CB.mark!==e)items.push({icon:'special',label:'Порча',sub:'бонус · +1к6',ok:bonusOk(),run:()=>doVerb(e,()=>markTarget(e,'порча'),{kind:'bonus'})});
  // a people's own strike, once per rest
  const blast=(on,key,label,range,fn)=>on&&items.push({icon:'special',label,sub:SP[key]?'2к6 · до '+range+' кл.':'нужен отдых',ok:SP[key]>0&&man(e,H0)<=range,run:()=>doVerb(e,()=>fn(e))});
  blast(R.breath,'breath','Огненный шар',4,dragonBreath);blast(R.wave,'wave','Удар волны',3,tideWave);blast(R.scream,'scream','Эхо-крик',5,echoScream);
  items.push({icon:'back',label:'Назад',keep:true,run:()=>enemyWheel(e)});
  showWheel(e,items,'Чем атаковать');}
function npcWheel(a){const items=[{icon:'talk',label:'Говорить',ok:!CB.on,run:()=>{a.hold=performance.now()+9000;const go=n=>goDo(a.x,a.z,false,()=>adj(H0,a.x,a.z)||n>2?talk(a):go(n+1));go(0);}},
  {icon:'look',label:'Осмотреть',run:()=>toast(a.npc+(PEOPLE[a.npc]?'. '+PEOPLE[a.npc].role[0].toUpperCase()+PEOPLE[a.npc].role.slice(1)+', '+PEOPLE[a.npc].temper+'.':'. Житель острова.'))}];
  // shopkeepers trade; villagers with side jobs offer paid work
  if(COMPANIONS&&a.hire&&!a.ally)items.push({icon:'job',label:'Нанять',sub:a.hire+' золота',ok:!CB.on,run:()=>{const go=n=>goDo(a.x,a.z,false,()=>adj(H0,a.x,a.z)||n>2?hireAlly(a,a.hire):go(n+1));go(0);}});
  if(SHOPS[a.npc])items.push({icon:'trade',label:'Торговать',sub:'золото: '+gold,ok:!CB.on,run:()=>{const go=n=>goDo(a.x,a.z,false,()=>adj(H0,a.x,a.z)||n>2?openShop(a):go(n+1));go(0);}});
  const js=jobsOf(a);if(js.length){const st=JOB[js[0].id];items.push({icon:'job',label:'Работа',sub:st.state===2?'за платой':st.state===1?'в процессе':st.day===dayN?'завтра':'+'+js[0].pay+' золота',ok:!CB.on,run:()=>{const go=n=>goDo(a.x,a.z,false,()=>adj(H0,a.x,a.z)||n>2?jobOffer(a):go(n+1));go(0);}});}
  showWheel(a,items,a.npc);}
// a potion or bread is used only from a hand; one in a pouch has to be taken first
const inHand=id=>window.handsHeld?!!window.handsHeld(id):true,nm2=id=>id==='potion'?'зелье':'хлеб';
function takeInHand(id){const s=window.handsToHand&&window.handsToHand(id);toast(s?'Вы берёте '+nm2(id)+' в '+(s==='L'?'левую':'правую')+' руку.':'Не получается взять '+nm2(id)+' в руку.');return !!s;}
function heal(id){if(!inHand(id)){toast('Сначала возьмите '+nm2(id)+' в руку.');return false;}heroPose('drink',900);const v=id==='potion'?d(4)+d(4)+2+(HERO.heal||0):d(4)+(HERO.heal||0);sfx('heal');H0.hp=Math.min(H0.max,H0.hp+v);setHP();floatText('+'+v,'#7fe08a',hero);
  toast((id==='potion'?'Зелье лечения: 2к4 + 2 = ':'Хлеб: 1к4 = ')+v);window.handsConsume&&window.handsConsume(id);}
function heroWheel(){const f=CB.on,ht=heroTurn(),items=[],C=HERO.cls,R=RACES[HERO.race]||{};
  if(!f)items.push(H0.sneak?{icon:'stand',label:'Выпрямиться',run:()=>{H0.sneak=false;H0.spd=2.4;}}:{icon:'sneak',label:'Красться',sub:'Скрытность +'+HERO.stealth,run:()=>{H0.sneak=true;H0.spd=1.3;toast('Вы крадётесь: враги замечают только спереди и вблизи.');}});
  const p=count('potion'),b=count('bread'),full=H0.hp>=H0.max,bonus=(fn)=>f?doVerb(null,fn,{kind:'bonus'}):fn(),bOk=!f||ht&&!CB.bonus,fightBonus=f&&ht&&!CB.bonus;
  if(p&&!inHand('potion'))items.push({icon:'potion',label:'Взять в руку',sub:(f?'бонус · ':'')+'зелье из мешочка',ok:bOk,run:()=>bonus(()=>takeInHand('potion'))});
  else items.push({icon:'potion',label:'Выпить зелье',sub:p?(f?'бонус · ':'')+'2к4+2 · в руке '+window.handsHeldCount('potion'):'нет зелья',ok:p>0&&!full&&bOk,run:()=>bonus(()=>heal('potion'))});
  if(!f)items.push(b&&!inHand('bread')?{icon:'bread',label:'Взять хлеб',sub:'в руку',run:()=>takeInHand('bread')}:{icon:'bread',label:'Съесть хлеб',sub:b?'1к4 · в руке '+window.handsHeldCount('bread'):'нет хлеба',ok:b>0&&!full,run:()=>heal('bread')});
  const ab=(cond,label,sub,ok,run)=>cond&&items.push({icon:'special',label,sub,ok,run});
  ab(C==='fighter','Второе дыхание',SP.wind?'1к10+2':'нужен отдых',SP.wind>0&&!full&&bOk,()=>bonus(secondWind));
  ab(C==='cleric','Лечащее слово',SP.word?'1к4+3 · '+SP.word+' ост.':'нужен отдых',SP.word>0&&!full&&bOk,()=>bonus(healingWord));
  ab(C==='paladin','Наложение рук',SP.hands?'2к4+4 · действие':'нужен отдых',SP.hands>0&&!full&&(!f||ht&&!CB.acted),()=>f?doVerb(null,layHands):layHands());
  ab(C==='rogue'&&f,'Рывок','бонус · +6 клеток',fightBonus,()=>bonus(dash));
  ab(C==='monk'&&f,'Шаг ветра','бонус · +6 клеток',fightBonus,()=>bonus(dash));
  ab(C==='barbarian'&&f,'Ярость',SP.rage?'бонус · '+SP.rage+' ост.':'нужен отдых',fightBonus&&SP.rage>0&&!CB.rage,()=>bonus(rageOn));
  ab(C==='bard'&&f,'Вдохновение',SP.inspire?'бонус · преимущество':'нужен отдых',fightBonus&&SP.inspire>0&&!CB.boost,()=>bonus(inspire));
  ab(R.boost&&f,'Собраться',SP.echo?'бонус · преимущество':'нужен отдых',fightBonus&&SP.echo>0&&!CB.boost,()=>bonus(memory));
  ab(R.might&&f,'Сила великана',SP.might?'бонус · +1к8 к удару':'нужен отдых',fightBonus&&SP.might>0&&!CB.might,()=>bonus(giantMight));
  ab(R.mend,'Живая ткань',SP.mend?(f?'бонус · ':'')+'2к4+2':'нужен отдых',SP.mend>0&&!full&&bOk,()=>bonus(livingMend));
  ab(R.shellUp&&f,'В панцирь',SP.shellUp?'бонус · урон вдвое меньше':'нужен отдых',fightBonus&&SP.shellUp>0&&!CB.shell,()=>bonus(shellUp));
  legendWheel(items,f,ht,bonus,bOk);
  // leaving a foe's reach draws a blow; a disengage spends the action (a rogue's bonus action) to walk away clean
  if(f){const rg=C==='rogue';items.push({icon:'back',label:'Отступить',sub:(rg?'бонус':'действие')+' · без ударов',ok:ht&&!H0.diseng&&!(rg?CB.bonus:CB.acted),run:()=>doVerb(null,disengage,{kind:rg?'bonus':'action'})});
    items.push({icon:'sneak',label:'Бежать',sub:canFlee()?'уйти из боя':'враги близко',ok:ht&&canFlee(),run:runAway});}
  if(f)items.push({icon:'end',label:'Конец хода',ok:ht,run:endHeroTurn});
  showWheel(H0,items,H0.name+' · '+HERO.n);}
// a companion who is down: bandage, potion or healing spell; a dead one can be carried to the herbalist
function allyWheel(a){const f=CB.on,ht=heroTurn(),items=[],p=count('potion'),C=HERO.cls,actOk=!f||ht&&!CB.acted,who=a.name||a.npc,adj=()=>man(a,H0)>1;
  if(a.state==='dead')items.push({icon:'pick',label:'Отнести к травнице',sub:'вернуть за '+REVIVE+' монет',ok:!f&&!room,run:()=>carryBody(a)});
  else{items.push({icon:'potion',label:'Перевязать',sub:'Медицина +'+medOf()+' · СЛ 10',ok:actOk&&a.state==='down'&&reachable(a),run:()=>doVerb(a,()=>bandage(a),{adj:adj()})});
    items.push({icon:'potion',label:'Дать зелье',sub:!p?'нет':inHand('potion')?'2к4+2 · в руке':'сначала возьмите в руку',ok:p>0&&inHand('potion')&&actOk&&reachable(a),run:()=>doVerb(a,()=>potionAlly(a),{adj:adj()})});
    if(C==='cleric')items.push({icon:'special',label:'Лечащее слово',sub:SP.word?'бонус · '+SP.word+' ост.':'нужен отдых',ok:SP.word>0&&(!f||ht&&!CB.bonus)&&man(a,H0)<=6,run:()=>doVerb(a,()=>{SP.word--;healAlly(a,d(4)+3+(HERO.heal||0),'Лечащее слово');},{kind:'bonus'})});
    if(C==='paladin')items.push({icon:'special',label:'Наложение рук',sub:SP.hands?'2к4+4':'нужен отдых',ok:SP.hands>0&&actOk&&reachable(a),run:()=>doVerb(a,()=>{SP.hands=0;healAlly(a,d(4)+d(4)+4+(HERO.heal||0),'Наложение рук');},{adj:adj()})});}
  items.push({icon:'look',label:'Осмотреть',run:()=>toast(who+': '+({down:'при смерти, спасброски '+a.saves[0]+' из 3, провалы '+a.saves[1]+' из 3.',stable:'без сознания, но дышит ровно. Встанет после боя.',dead:'погиб. Травница Ивва ещё может помочь до конца завтрашнего дня.'})[a.state],4500)});
  showWheel(a,items,who);}
const usedRocks=new Set();
// anything with a description: look closely; some things give an item the first time
function lookWheel(L,mesh){const p=new THREE.Vector3();mesh.getWorldPosition(p);const x=Math.floor(p.x),z=Math.floor(p.z);
  const items=[{icon:'look',label:'Осмотреть',run:()=>inspect(L,x,z)}];
  if(L.loot&&!L.taken)items[L.item?'unshift':'push']({icon:'pick',label:'Взять',sub:L.loot.map(([id,n])=>window.handsItemName(id)+(n>1?' ×'+n:'')).join(', '),run:()=>inspect(L,x,z,true)});
  if(L.action){const A=L.action();if(A)items.unshift(A);}
  showWheel({pos:p},items,L.n);}
// look: the wheel is already gone, the camera leans in, the hero studies the thing; the text comes after, at the top
function inspect(L,x,z,grab){if(CB.on)return toast('Не время разглядывать.');if(L.n==='Список стражи')learn('list');goDo(x,z,false,async()=>{H0.face=Math.atan2(x+.5-H0.px,z+.5-H0.pz);zoomTarget=.62;
  heroPose(grab?'pickup':'look',grab?900:1500);window.handsGesture&&window.handsGesture(grab?'pickup':'inspect');await wait(grab?450:1400);
  if(L.loot&&!L.taken&&(grab||!L.item)){const got=window.handsGive(L.loot,'Найдено');if(got.length){L.taken=true;if(L.grp)L.grp.visible=false;}else toast('Больше не унести: '+window.handsItemName(L.loot[0][0])+'.');}
  if(!grab||!L.item)note(L.n,L.t);setTimeout(()=>zoomTarget=1,grab?500:2200);});}
const noteEl=document.getElementById('note');let noteT=0;
function note(t,x){noteEl.hidden=false;noteEl.innerHTML='<b></b><span></span>';noteEl.children[0].textContent=t;noteEl.children[1].textContent=x;noteEl.classList.remove('show');void noteEl.offsetWidth;noteEl.classList.add('show');
  clearTimeout(noteT);noteT=setTimeout(()=>noteEl.hidden=true,6500);}
noteEl.addEventListener('pointerdown',e=>{e.stopPropagation();noteEl.hidden=true;});
function houseWheel(R,mesh){const p=new THREE.Vector3(R.door[0]+.5,1,R.door[1]-.5);
  showWheel({pos:p},[{icon:'pick',label:'Войти',ok:!CB.on,run:()=>R.inPlace?(R.guard&&typeof crownLocked==='function'&&crownLocked(R)?crownRefuse(R):goDo(...(R.inside||[R.exit[0],R.exit[1]-1]),false,()=>{})):goDo(R.door[0],R.door[1],true,()=>enterRoom(R))},
    {icon:'look',label:'Осмотреть',run:()=>toast(R.name+'. '+({tavern:'Из окон доносится смех и запах жареной рыбы.',forge:'Труба дымит даже ночью.',home:'У двери сохнут сети.',hall:'Над дверью — резная золотая рыба.',barn:'Ворота подпёрты вилами.',house:'Обычный дом. Внутри кто-то гремит посудой.',poorhouse:'Покосившаяся лачуга. Дверь не запирается.',castle:'Ворота открыты днём. Стража провожает взглядом.',herb:'Пахнет мятой и чем-то горьким.',gbarn:'Широкие ворота, внутри сено.',temple:'Колокол на башне молчит.',inn:'Из двери тянет пивом.',mill:'Колесо шлёпает по воде.',tannery:'Воняет так, что глаза слезятся.',warehouse:'Двери на засове. Товар с кораблей.',barracks:'Тут живёт стража.',kitchen:'Из трубы тянет супом и дымом.',armory:'Оружие стражи. Без спроса не войдёшь.',treasury:'Казна. Туда пускают только казначея.',chambers:'Покои короля. Стража стоит у двери.'})[R.type]||'Дом.',4000)}],R.name);}
// chapel brazier: look at it, and relight it with a torch in hand
{const ms=[];chapel.g.traverse(m=>m.isMesh&&ms.push(m));const L={n:'Жаровня часовни',t:'Холодная жаровня в кольце камней. Когда-то её огонь отгонял мёртвых.',meshes:ms,
  action:()=>chapel.lit?(ART.fate?null:{icon:'special',label:'Сердце огня',sub:heartAwake()?'решить его судьбу':'спит под углями',ok:!CB.on,run:()=>goDo(Z.ruins[0],Z.ruins[1],false,artifactChoice)}):{icon:'special',label:'Разжечь',sub:hasTorch()?'факелом':'нужен факел в руке',ok:hasTorch()&&!CB.on,run:()=>goDo(Z.ruins[0],Z.ruins[1],false,lightChapel)}};
  looks.push(L);ms.forEach(m=>m.userData.look=L);}
function hasTorch(){const h=hero.userData.held||{};return h.L==='torch'||h.R==='torch';}
async function lightChapel(){if(chapel.lit)return;heroPose('open',900);await wait(500);sfx('spell');setChapel(true);shake=.25;
  banner('Огонь часовни горит');note('Жаровня часовни','Пламя вспыхивает белым, потом золотым. Над руинами разносится тихий звон — будто колокол, которого здесь давно нет.');
  if(Q.fire.state===1){Q.fire.state=2;questUI();}else if(Q.fire.state===0)Q.fire.state=2;
  if(heartAwake())setTimeout(artifactChoice,1600);}
for(const [ms,n,t,loot] of OUT){const L={n,t,loot,meshes:ms};looks.push(L);ms.forEach(m=>m.userData.look=L);}
// the tutorial stones lie in the open: nothing tall within two cells, so they are seen from every side
{const tall=new Set([...treeCells,...bushCells].map(([x,z])=>x+','+z)),clear=(x,z)=>{for(let dx=-2;dx<=2;dx++)for(let dz=-2;dz<=2;dz++){const k=(x+dx)+','+(z+dz);if(tall.has(k)||(Math.abs(dx)+Math.abs(dz)<=2&&solid.has(k)))return false;}return free(x,z);};
 let best=null;for(let r=0;r<8&&!best;r++)for(let dx=-r;dx<=r;dx++)for(let dz=-r;dz<=r;dz++){const x=Z.dock[0]+5+dx,z=Z.dock[1]+2+dz;if(!best&&clear(x,z)&&at(x,z)!=='P')best=[x,z];}
 const [sx,sz]=best||[Z.dock[0]+3,Z.dock[1]+2];window.__tutStones=[sx,sz];
 const L=itemProp(scene,sx+.5,groundAt(sx,sz)+.06,sz+.5,'stone',2,'Гладкие камни','Обкатанные морем голыши. Удобно бросать.',0);L.grp.scale.setScalar(3.4);}
function rockWheel(x,z){const k=x+','+z,pos=new THREE.Vector3(x+.5,groundAt(x,z),z+.5);
  showWheel({pos},[{icon:'pick',label:'Поднять камни',sub:usedRocks.has(k)?'уже пусто':'+2 камня',ok:!usedRocks.has(k)&&!CB.on,
    run:()=>goDo(x,z,false,()=>{heroPose('pickup',900);window.handsGesture&&window.handsGesture('pickup');setTimeout(()=>{if(window.handsAdd('stone',2))usedRocks.add(k);},450);})}],'Камни');}

// ---------- hero look: recolour the shared box model ----------
// hairstyles are rebuilt from the model's own hair boxes (brows stay)
const HAIR_C=new Set([0x493024,0x584136,0x402a20,0x5d463c,0x5b453a,0x553e32,0x665247]),BROW=0x3e291f;
const HAIRS={messy:'Растрёпанные',short:'Короткие',long:'Длинные',tail:'Хвост',bun:'Пучок',bald:'Бритая'};
function styleHair(boxes,st){const isH=b=>HAIR_C.has(b[6]),tag=b=>{const o=b.slice();o[8]='hair';return o;},H=0x493024;
  let out=boxes.map(b=>isH(b)||b[6]===BROW?tag(b):b);if(st==='messy'||!st)return out;
  const keepTop=b=>!isH(b)||b[1]>=1.05&&b[1]<1.18&&Math.abs(b[0])<.25&&b[2]<.2; // cap only: no tufts, no fringe
  if(st==='bald')return out.filter(b=>!isH(b));
  if(st==='short'||st==='tail'||st==='bun'){out=out.filter(keepTop);out.push(tag([-.26,1.04,0,.05,.12,.42,H]),tag([.26,1.04,0,.05,.12,.42,H]),tag([0,1.02,-.22,.5,.2,.07,H]),tag([0,1.1,.21,.46,.04,.05,H]));}
  if(st==='tail')out.push(tag([0,1.12,-.28,.14,.14,.1,H]),tag([.05,.98,-.33,.12,.22,.1,H]),tag([.1,.82,-.35,.1,.18,.09,H]),tag([.13,.7,-.35,.07,.1,.07,H]));
  if(st==='bun')out.push(tag([0,1.25,-.06,.26,.17,.24,H]),tag([0,1.35,-.06,.16,.07,.16,H]));
  if(st==='long')out.push(tag([0,.74,-.22,.5,.36,.07,H]),tag([-.26,.8,-.02,.06,.32,.36,H]),tag([.26,.8,-.02,.06,.32,.36,H]),tag([-.25,.7,.16,.09,.3,.08,H]),tag([.25,.7,.16,.09,.3,.08,H]));
  return out;}
const LOOKS={skin:['e9bf90','d9a27a','b9805a','8a5a3a','f2d2b0'],hair:['493024','1c1612','8a5a2a','c8a060','8a8a8a','6a2418'],cloth:['284d6c','6a2a24','3a5a2a','4a3a5a','6a5a3a','2a2a2a']};
const cH={},tmpC=new THREE.Color();
function recolor(boxes,look){const base={skin:new THREE.Color(0xe9bf90).getHSL({}),hair:new THREE.Color(0x493024).getHSL({}),cloth:new THREE.Color(0x284d6c).getHSL({})};
  const tgt={skin:new THREE.Color('#'+look.skin).getHSL({}),hair:new THREE.Color('#'+look.hair).getHSL({}),cloth:new THREE.Color('#'+look.cloth).getHSL({})};
  return boxes.map(b=>{const c=tmpC.setHex(b[6]).getHSL({}),hue=c.h*360;let g=null;
    if(c.l>.55&&hue>15&&hue<45&&c.s>.3&&c.s<.8)g='skin';else if(hue>190&&hue<235&&c.s>.2)g='cloth';else if(b[8]==='hair')g='hair';
    if(!g)return b;const t=tgt[g],k=c.l/base[g].l;const nc=new THREE.Color().setHSL(t.h,Math.min(1,t.s*(c.s/(base[g].s||1))),Math.min(.95,t.l*k));const out=b.slice();out[6]=nc.getHex();return out;});}
const heroBoxes=s=>s&&s.game&&window.Characters?raceDecorate(s.race,Characters.build(Characters.spec('hero',s.game)),s.game.appearance):recolor(styleHair(MODELS['fighter-male'],s.look.style),s.look);
function rebuildHero(look,s){const m=buildModel(heroBoxes(s||{look}));raceScale(s&&s.race,hero);const held=hero.userData.held;
  hero.clear();[...m.children].forEach(c=>hero.add(c));Object.assign(hero.userData,m.userData,{held});}
let HEROSET=null;try{HEROSET=JSON.parse(localStorage.getItem('helga-hero')||'null')}catch(e){}
// the hero's face by the health bar: the game's portrait for a hero brought from the game, otherwise the island model itself
function heroFace(s){const c=document.getElementById('hpFace');if(!c)return;const g=c.getContext('2d');g.imageSmoothingEnabled=false;g.clearRect(0,0,40,40);
  let p=s&&s.game&&window.Characters?Characters.portrait('hero',s.game,{view:'face',width:40,height:40,pixel:2}):null;
  if(p)g.drawImage(p,0,0);
  else{H0.pfc=null;let fr=null;try{fr=pfFrame(H0,'neutral',20);}catch(e){fr=null;}
    if(fr){const t=document.createElement('canvas');t.width=t.height=20;pfDraw(t,fr,'neutral',0,false);g.drawImage(t,0,0,40,40);p=t;}}
  c.hidden=!p;}
function applyHero(s){HEROSET=s;HERO=applyRace(Object.assign({cls:CLASSES[s.cls]?s.cls:'fighter'},CLASSES[s.cls]||CLASSES.fighter),s.race||'human');H0.name=s.name;H0.max=HERO.hp+(typeof lvHP==='function'?lvHP():0);if(H0.hp>H0.max||s.fresh)H0.hp=H0.max;rebuildHero(s.look,s);heroFace(s);setHP();}

// ---------- menus ----------
let paused=true;
const mainEl=document.getElementById('mainmenu'),pauseEl=document.getElementById('pause'),edEl=document.getElementById('editor');
function screen(el){for(const x of [mainEl,pauseEl,edEl])x.hidden=x!==el;paused=!!el;closeWheel();document.body.classList.toggle('inmenu',el===mainEl);}
function hasSave(){try{return !!localStorage.getItem(SAVE)&&!!HEROSET}catch(e){return false}}
function mainMenu(){screen(mainEl);const ok=hasSave(),c=document.getElementById('mContinue');c.disabled=!ok;c.classList.toggle('primary',ok);document.getElementById('mNew').classList.toggle('primary',!ok);
  document.getElementById('mContSub').textContent=ok?(HEROSET.name+' · '+(RACES[HEROSET.race]||RACES.human).n+' · '+(CLASSES[HEROSET.cls]||CLASSES.fighter).n):'нет сохранения';}
document.getElementById('mContinue').onclick=()=>screen(null);
if(window.ISLAND_IN_APP){const x=document.getElementById('mExit');x.hidden=false;x.onclick=()=>{save();location.href='../index.html';};}
document.getElementById('mNew').onclick=()=>{if(!hasSave())return openEditor();confirmBox('Начать новую игру?','Текущий прогресс на острове будет стёрт: герой, задания, сундуки.','Начать заново',()=>openEditor());};
function confirmBox(title,text,yes,fn){const box=document.getElementById('confirm');box.hidden=false;box.querySelector('b').textContent=title;box.querySelector('p').textContent=text;const y=box.querySelector('.yes');y.textContent=yes;
  y.onclick=()=>{box.hidden=true;fn();};box.querySelector('.no').onclick=()=>{box.hidden=true;};}
document.getElementById('mSettings').onclick=()=>{sfx('click');openSettings();};
document.getElementById('menuBtn').onclick=e=>{e.stopPropagation();screen(pauseEl);renderSheet();};
document.getElementById('pResume').onclick=()=>screen(null);
document.getElementById('pMain').onclick=()=>{save();mainMenu();};
document.getElementById('pSettings').onclick=()=>{sfx('click');openSettings();};
function renderSheet(){const h=HERO,el=document.getElementById('sheet');
  el.innerHTML='<b></b><span>'+h.n+' · здоровье '+Math.max(0,H0.hp)+' / '+H0.max+' · КД '+heroAC()+'</span><span>Ближний бой +'+h.melee+' · стрельба +'+h.ranged+' · магия +'+h.spell+'</span><span>Скрытность +'+h.stealth+' · Атлетика +'+h.athletics+'</span><span class="rep"></span><span class="uniq"></span><small></small>';
  el.querySelector('b').textContent=H0.name;el.querySelector('small').textContent=h.about;
  el.querySelector('.rep').textContent='Репутация: '+Object.keys(FACTIONS).map(f=>FACTIONS[f]+' — '+repName(f)).join(' · ');
  const u=[...(window.handsCount&&window.handsCount('heart')?['Пламенное сердце']:[]),...ART.powers.map(p=>p==='flamestep'?'Шаг пламени':p)];
  el.querySelector('.uniq').textContent='Особые силы '+uniqueCount()+' / '+UNIQUE_MAX+(u.length?': '+u.join(', '):'');}

// ---------- explored land, the island map and the quest pointer ----------
const MAPH=OUT_H,seen=new Uint8Array(W*MAPH);
function markSeen(){if(room)return;for(let z=H0.z-7;z<=H0.z+7;z++)for(let x=H0.x-9;x<=H0.x+9;x++)if(x>=0&&z>=0&&x<W&&z<MAPH&&(x-H0.x)**2/81+(z-H0.z)**2/49<=1)seen[z*W+x]=1;}
function seenRLE(){let out='',c=seen[0],n=0;for(const v of seen){if(v===c)n++;else{out+=c+':'+n+',';c=v;n=1;}}return out+c+':'+n;}
function seenLoad(s){let i=0;for(const part of s.split(',')){const [v,n]=part.split(':').map(Number);seen.fill(v,i,i+n);i+=n;}}
// where the current task points: the nearest foe it needs, the brazier, or whoever gives the reward
function questTarget(){const tt=tutTarget();if(tt||tutOn())return tt;
  if(TUT.step>=0&&Q.dead.state===0&&!Object.values(Q).some(q=>q.state===1||q.state===2)){const b=whoT('bram');return b&&Object.assign(b,{label:'Брам'});}const q=questFocus&&questFocus.state>0&&questFocus.state<3?questFocus:Object.values(Q).find(q=>q.state===1||q.state===2);if(!q)return jobTarget();
  const giver=q===Q.dead||q===Q.fire?'bram':q===Q.band?'miller':'fisher',who=q.giverA||actors.find(a=>a.talkId===giver);
  if(q.state===2){if(who.z>=OUT_H){const R=ROOMS.find(R=>who.x>=R.ox&&who.x<R.ox+R.iw);return {x:R.door[0],z:R.door[1],label:who.npc,inRoom:R};}return {x:who.x,z:who.z,label:who.npc};}
  if(q===Q.fire)return {x:Z.ruins[0],z:Z.ruins[1],label:'Жаровня часовни'};
  if(q===Q.ship&&q.state===1){const c=SHIP.cap;return {x:c.x,z:c.z,label:c.npc};}
  if(q===Q.raven&&q.state===1){if(q.step==='ask'){const o=q.oldA,R=o.where==='home'&&o.houseRoom;return R&&room!==R?{x:R.door[0],z:R.door[1],label:o.npc,inRoom:R}:{x:o.x,z:o.z,label:o.npc};}
    if(q.step==='feather')return {x:q.fcamp.x,z:q.fcamp.z,label:'Лагерь разбойников'};if(q.step==='stone')return {x:q.stone[0],z:q.stone[1],label:'Камень с вороном'};}
  if(q===Q.herb){if(window.handsCount('herb')>=3)return whoT('herb');const m=looks.filter(l=>l.item&&l.loot[0][0]==='herb'&&!l.taken).sort((a,b)=>Math.hypot(a.grp.position.x-H0.px,a.grp.position.z-H0.pz)-Math.hypot(b.grp.position.x-H0.px,b.grp.position.z-H0.pz))[0];return m?{x:Math.floor(m.grp.position.x),z:Math.floor(m.grp.position.z),label:'Мята'}:null;}
  const foes=enemies.filter(e=>!e.dead&&(e.kind||e.name)===q.need&&(!q.at||Math.hypot(e.home[0]-q.at.x,e.home[1]-q.at.z)<14)).sort((a,b)=>man(a,H0)-man(b,H0));return foes[0]?{x:foes[0].x,z:foes[0].z,label:q.need}:null;}
const ptrEl=document.getElementById('qptr');
function pointerTick(){const T=questTarget();if(!T||CB.on||paused){ptrEl.hidden=true;return;}
  let tx=T.x,tz=T.z;if(room&&T.z<OUT_H){tx=room.exit[0];tz=room.exit[1];}
  const v=new THREE.Vector3(tx+.5,groundAt(tx,tz)+1.3,tz+.5).project(camera),r=canvas.getBoundingClientRect();
  let sx=(v.x+1)/2*r.width,sy=(1-v.y)/2*r.height;const m=46,on=v.z<1&&sx>m&&sx<r.width-m&&sy>m&&sy<r.height-m;
  ptrEl.hidden=false;ptrEl.classList.toggle('edge',!on);
  if(!on){const cx=r.width/2,cy=r.height/2;let dx=sx-cx,dy=sy-cy;if(v.z>1){dx=-dx;dy=-dy;}const k=Math.min((cx-m)/Math.abs(dx||1),(cy-m)/Math.abs(dy||1));sx=cx+dx*k;sy=cy+dy*k;
    ptrEl.style.setProperty('--a',Math.atan2(dy,dx)+'rad');}
  ptrEl.classList.toggle('l',sx<110);ptrEl.classList.toggle('r',sx>r.width-110);ptrEl.style.left=sx+'px';ptrEl.style.top=sy+'px';ptrEl.dataset.label=room&&T.z<OUT_H?'Выход':T.label;}
// the map: drawn from the grid, unexplored land stays dark
const mapEl=document.getElementById('mapview'),MAPC={'~':'#123040','R':'#2f6a8a','M':'#7a7268','N':'#e8eef2','B':'#55603a','A':'#b8a37a','G':'#3d5e2e','D':'#7a6448','C':'#8a8476','S':'#6e6c66','P':'#8a6040','H':'#9a5a30','W':'#4a4a4a','X':'#9a5a30','F':'#b08a5a','E':'#b08a5a','K':'#8a7a3a'};
function openMap(){screen(null);paused=true;mapEl.hidden=false;const c=mapEl.querySelector('canvas'),k=8;c.width=W*k;c.height=MAPH*k;const g=c.getContext('2d');
  for(let z=0;z<MAPH;z++)for(let x=0;x<W;x++){const code=at(x,z);let col=MAPC[code]||'#3d5e2e';if(code==='G'&&solid.has(x+','+z))col='#24391e';g.fillStyle=col;g.fillRect(x*k,z*k,k,k);
    if(!seen[z*W+x]&&code!=='~'){g.fillStyle='rgba(8,10,12,.86)';g.fillRect(x*k,z*k,k,k);}}
  // the map is drawn large and shown small: labels are sized for the shrunken picture
  g.font='bold 44px "PT Sans",system-ui,sans-serif';g.textAlign='center';const label=(name,x,z)=>{g.fillStyle='#000c';g.fillText(name,x*k+k/2+3,z*k-8);g.fillStyle='#f3e2bd';g.fillText(name,x*k+k/2,z*k-11);};
  for(const [key,name] of ZONES){const [x,z]=Z[key];if(seen[z*W+x])label(name,x,z);}
  for(const p of GPL)if(seen[p.z*W+p.x])label(p.n,p.x,p.z-p.r);
  if(!chapel.lit&&seen[Z.ruins[1]*W+Z.ruins[0]]){}else if(chapel.lit){g.fillStyle='#ffb347';g.beginPath();g.arc(Z.ruins[0]*k+k/2,Z.ruins[1]*k+k/2,6,0,7);g.fill();}
  const T=questTarget();if(T){const x=T.x*k+k/2,z=T.z*k+k/2;g.strokeStyle='#ff5a4a';g.lineWidth=3;g.beginPath();g.arc(x,z,24,0,7);g.stroke();g.fillStyle='#ff5a4a';g.fillText('!',x,z+15);}
  const hx=(room?ROOMS[room.i].door[0]:H0.x)*k+k/2,hz=(room?ROOMS[room.i].door[1]:H0.z)*k+k/2;g.fillStyle='#f2c14e';g.strokeStyle='#000';g.lineWidth=2;g.beginPath();g.arc(hx,hz,16,0,7);g.fill();g.stroke();
  mapFit();
  const leg=mapEl.querySelector('.leg');leg.textContent=T?'Красный круг — цель: '+T.label+'. Жёлтая точка — вы.':'Жёлтая точка — вы. Тёмное — ещё не исследовано.';}
document.getElementById('mapClose').onclick=()=>{mapEl.hidden=true;paused=false;};
// zoom and pan: pinch, wheel or the buttons; drag to move. The closest zoom shows one map pixel per screen
// pixel, never more, so the picture never goes soft.
const MV={s:1,x:0,y:0,base:1,max:1,pts:new Map(),pinch:null};
function mapFit(){const c=mapEl.querySelector('canvas'),win=mapEl.querySelector('.mapwin'),aw=Math.min(innerWidth-36,900),ah=innerHeight-150;
  const b=Math.min(aw/c.width,ah/c.height);MV.base=b;win.style.width=Math.floor(c.width*b)+'px';win.style.height=Math.floor(c.height*b)+'px';
  c.style.width=c.width*b+'px';c.style.height=c.height*b+'px';MV.max=Math.max(1,1/(b*(window.devicePixelRatio||1)));MV.s=1;MV.x=0;MV.y=0;mapApply();}
function mapApply(){const win=mapEl.querySelector('.mapwin'),w=win.clientWidth,h=win.clientHeight;MV.s=Math.min(MV.max,Math.max(1,MV.s));
  MV.x=Math.min(0,Math.max(w-w*MV.s,MV.x));MV.y=Math.min(0,Math.max(h-h*MV.s,MV.y));mapEl.querySelector('canvas').style.transform='translate('+MV.x+'px,'+MV.y+'px) scale('+MV.s+')';
  document.getElementById('mapIn').disabled=MV.s>=MV.max-1e-3;document.getElementById('mapOut').disabled=MV.s<=1+1e-3;}
function mapZoom(f,cx,cy){const win=mapEl.querySelector('.mapwin');if(cx==null){cx=win.clientWidth/2;cy=win.clientHeight/2;}const s0=MV.s,s1=Math.min(MV.max,Math.max(1,s0*f));
  MV.x=cx-(cx-MV.x)*s1/s0;MV.y=cy-(cy-MV.y)*s1/s0;MV.s=s1;mapApply();}
document.getElementById('mapIn').onclick=()=>{sfx('click');mapZoom(1.6);};document.getElementById('mapOut').onclick=()=>{sfx('click');mapZoom(1/1.6);};
{const win=mapEl.querySelector('.mapwin'),rel=e=>{const r=win.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top];};
 win.addEventListener('wheel',e=>{e.preventDefault();mapZoom(e.deltaY<0?1.15:1/1.15,...rel(e));},{passive:false});
 win.addEventListener('pointerdown',e=>{win.setPointerCapture(e.pointerId);MV.pts.set(e.pointerId,rel(e));MV.pinch=null;});
 win.addEventListener('pointermove',e=>{if(!MV.pts.has(e.pointerId))return;const p=rel(e),old=MV.pts.get(e.pointerId);MV.pts.set(e.pointerId,p);
   if(MV.pts.size===2){const[a,b]=[...MV.pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]),m=[(a[0]+b[0])/2,(a[1]+b[1])/2];if(MV.pinch)mapZoom(d/MV.pinch,...m);MV.pinch=d;}
   else{MV.x+=p[0]-old[0];MV.y+=p[1]-old[1];mapApply();}});
 const up=e=>{MV.pts.delete(e.pointerId);MV.pinch=null;};win.addEventListener('pointerup',up);win.addEventListener('pointercancel',up);}
document.getElementById('pMap').onclick=()=>openMap();
document.getElementById('pJournal').onclick=()=>{screen(null);journal();};
// ---------- speaker portraits ----------
// The real model of whoever speaks, rendered head and shoulders into a tiny canvas (a strict pixel grid, shown at
// whole multiples). Each mood is one rendered frame with its own head tilt, cached per speaker; the mouth, blinks
// and brows are drawn on that grid while the line types. Things that are not people get no portrait.
const PF={r:null,s:null,cam:null,fail:false,timer:0};
const PF_N=32;
function pfInit(){if(PF.r||PF.fail)return !!PF.r;
  try{const r=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:true});r.setPixelRatio(1);r.setSize(PF_N,PF_N);
    const s=new THREE.Scene();s.add(new THREE.HemisphereLight(0xdfe8ff,0x3a2a1a,.75));const k=new THREE.DirectionalLight(0xffe2b8,.7);k.position.set(1.4,2.4,3);s.add(k);
    PF.r=r;PF.s=s;PF.cam=new THREE.OrthographicCamera(-1,1,1,-1,.1,20);}catch(e){PF.fail=true;}return !!PF.r;}
// head tilt per mood: [nod forward, roll to the side]
const PF_POSE={neutral:[0,0],smile:[-.04,.05],shout:[-.12,0],angry:[.08,0],doubt:[0,.16],sad:[.18,-.06]};
function pfMood(text){const t=String(text).trim(),end=t.slice(-1);
  if(/…|\.\.\.$/.test(t.slice(-3)))return 'sad';if(end==='?')return 'doubt';
  if(end==='!')return /прочь|вон|убир|не подходи|убью|назад/i.test(t)?'angry':'shout';
  if(/спасибо|добро пожаловать|рад|держи|заслужил|молодец|вот это дело/i.test(t))return 'smile';return 'neutral';}
function pfSpeaker(who){const w=window.talkWho;if(w&&w.npc===who&&w.o)return w;
  return actors.find(a=>a!==H0&&!a.dead&&a.o&&(a.npc===who||(a.boss&&a.name===who)))||null;}
// one frame: the model placed alone at the origin, a little turned, the camera on its head and shoulders
function pfFrame(a,mood,n=PF_N){const c=a.pfc||(a.pfc={}),key=mood+n;if(c[key])return c[key];if(!pfInit())return null;
  const o=a.o,rig=o.userData.rig,head=rig&&rig.head,body=o.userData.body,par=o.parent,vis=o.visible;
  const pos=o.position.clone(),rot=o.rotation.clone(),hr=head?head.rotation.clone():null,br=body?body.rotation.clone():null,bp=body?body.position.clone():null;
  const S=o.scale.y||1,P=PF_POSE[mood]||PF_POSE.neutral,quad=!!(rig&&rig.quad);
  o.position.set(0,0,0);o.rotation.set(0,quad?.9:.3,0);o.visible=true;
  if(body){body.rotation.set(0,0,0);body.position.y=0;}
  if(head&&!quad)head.rotation.set(P[0],0,P[1]);
  PF.s.add(o);o.updateMatrixWorld(true);
  const cy=(quad?.45:.84)*S,h=(quad?.5:.44)*S;
  PF.cam.left=-h;PF.cam.right=h;PF.cam.top=h;PF.cam.bottom=-h;PF.cam.position.set(0,cy+.4,6);PF.cam.lookAt(0,cy,0);PF.cam.updateProjectionMatrix();PF.cam.updateMatrixWorld(true);
  PF.r.setSize(n,n);PF.r.render(PF.s,PF.cam);
  // where the eyes and the mouth land on the grid: points on the face, carried by the head
  const pt=(x,y,z)=>{const v=head?head.localToWorld(new THREE.Vector3(x,y-.77,z)):o.localToWorld(new THREE.Vector3(x,y,z));v.project(PF.cam);return [Math.round((v.x+1)/2*n-.5),Math.round((1-v.y)/2*n-.5)];};
  const face=!quad&&head?{eL:pt(-.1,.89,.24),eR:pt(.1,.89,.24),m:pt(0,.81,.24),ck:pt(-.03,.85,.24)}:null;
  PF.s.remove(o);if(par)par.add(o);o.position.copy(pos);o.rotation.copy(rot);o.visible=vis;
  if(head)head.rotation.copy(hr);
  if(body){body.rotation.copy(br);body.position.copy(bp);}
  const cv=document.createElement('canvas');cv.width=cv.height=n;const g=cv.getContext('2d');g.drawImage(PF.r.domElement,0,0);
  if(face){const d=g.getImageData(Math.max(0,face.ck[0]),Math.max(0,face.ck[1]),1,1).data;face.skin='rgb('+d[0]+','+d[1]+','+d[2]+')';}
  c[key]={cv,face};return c[key];}
// draws a frame with the moving parts: mouth open or shut, eyes open or closed, brows for the mood
function pfDraw(cvs,fr,mood,mouth,blink){const g=cvs.getContext('2d');g.imageSmoothingEnabled=false;g.clearRect(0,0,cvs.width,cvs.height);g.drawImage(fr.cv,0,0);const f=fr.face;if(!f)return;
  const dark='#2a1410',px=(x,y,w=1,h=1,c=dark)=>{g.fillStyle=c;g.fillRect(x,y,w,h);};
  if(blink)for(const e of [f.eL,f.eR]){px(e[0]-1,e[1]-2,3,4,f.skin);px(e[0]-1,e[1]+1,3,1,'#4a2a1e');}
  const [mx,my]=f.m;
  if(mouth)px(mx-1,my,3,mood==='shout'||mood==='angry'||mouth>1?2:1,'#3a1010');
  else if(mood==='smile'){px(mx-1,my,3,1);px(mx-2,my-1);px(mx+2,my-1);}
  else if(mood==='sad'){px(mx-1,my,3,1);px(mx-2,my+1);px(mx+2,my+1);}
  else px(mx-1,my,3,1);
  const bc='#1d120c',bl=f.eL,br=f.eR;
  if(mood==='angry'){px(bl[0]-1,bl[1]-3,1,1,bc);px(bl[0],bl[1]-2,1,1,bc);px(br[0]+1,br[1]-3,1,1,bc);px(br[0],br[1]-2,1,1,bc);}
  else if(mood==='sad'){px(bl[0]-1,bl[1]-2,1,1,bc);px(bl[0],bl[1]-3,1,1,bc);px(br[0]+1,br[1]-2,1,1,bc);px(br[0],br[1]-3,1,1,bc);}
  else if(mood==='doubt'){px(bl[0]-1,bl[1]-2,2,1,bc);px(br[0],br[1]-4,2,1,bc);}
  else if(mood==='shout'){px(bl[0]-1,bl[1]-3,2,1,bc);px(br[0],br[1]-3,2,1,bc);}}
// the portrait beside a line: talking while letters still appear, a blink now and then
function talkPortrait(who,text,typing){clearInterval(PF.timer);const a=pfSpeaker(who),mood=pfMood(text);let fr=null;
  try{fr=a?pfFrame(a,mood):null;}catch(e){fr=null;}
  talkEl.classList.toggle('withface',!!fr);if(!fr)return;
  const cvs=document.createElement('canvas');cvs.className='talk-face';cvs.width=cvs.height=PF_N;cvs.setAttribute('aria-hidden','true');cvs.dataset.mood=mood;talkEl.prepend(cvs);
  let t=0,blinkAt=8+Math.random()*20|0;
  const step=()=>{if(talkEl.hidden||!cvs.isConnected){clearInterval(PF.timer);return;}t++;
    const mouth=typing()&&!reduceM?[1,2,0,1,0,2][t%6]:0,blink=t>=blinkAt&&t<blinkAt+2;
    if(t>=blinkAt+2)blinkAt=t+20+Math.random()*30|0;
    pfDraw(cvs,fr,mood,mouth,blink);};
  pfDraw(cvs,fr,mood,0,false);PF.timer=setInterval(step,110);}
window.talkPortrait=talkPortrait;
// the body knows when a dialog is open, so panels that would sit under a tall dialog can step aside
new MutationObserver(()=>document.body.classList.toggle('talking',!talkEl.hidden)).observe(talkEl,{attributes:true,attributeFilter:['hidden']});
