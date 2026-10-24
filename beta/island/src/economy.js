// ---------- gold, shops and side jobs ----------
// Everything here is data first (prices, shops, jobs) so a generator can later build
// the same things for other islands; the code below only runs them.
// Prices: what a shop asks; it pays back two fifths. Weapons are priced by their numbers.
const PRICE={potion:14,bread:3,fish:5,herb:4,stone:1,flour:6,torch:3};
const priceOf=id=>{const w=WEAPONS[id];if(w){const k=RARITY[rarityOf(id)].k;if(w.kind==='shield')return (18+(id==='shield'?0:6))*k;return Math.round(w.die*3+(w.hb||0)*6+(w.db||0)*5+(w.two?4:0)+(w.spark?8:0))*k;}return PRICE[id]||2;};
// a unique item is not for sale at any price
const sellable=id=>rarityOf(id)!=='unique';
// the island's state moves prices: bread is dear while bandits rob the mill, fish while wolves tear the nets
function priceNow(id,buying,S){let p=priceOf(id);const tr=typeof HERO!=='undefined'&&HERO.trade;if(id==='bread'&&Q.band.state!==3)p=Math.ceil(p*1.5);if(id==='fish'&&Q.wolf.state!==3)p=Math.ceil(p*1.4);const rk=typeof repPriceK==='function'?repPriceK(S&&S.fac):1,bk=S&&S.k||1,sk=S&&S.sk||1;return buying?Math.max(1,Math.round(p*(tr?.8:1)*rk*bk)):Math.max(1,Math.floor(p*.4*(tr?1.25:1)*sk/rk));}
// shops: who trades, what they sell, what they buy and how much coin they hold
const SHOPS={
  'Торговка Марта':{title:'Лавка Марты',sells:['bread','fish','stone','torch'],buys:['fish','herb','bread','stone','flour'],coin:80,line:'Что берёшь, милый? У меня всё свежее.'},
  'Кузнец Горан':{title:'Кузница Горана',sells:['dagger','sword','sword_short','axe_hand','mace','spear','bow_short','shield','shield_round'],buys:'weapons',coin:160,line:'Сталь честная, цена тоже. Смотри.'},
  'Травница Ивва':{title:'Хижина травницы',sells:['potion'],buys:['herb'],coin:50,line:'Мята, зверобой, зелья. Травы приношу — покупаю.'},
  'Трактирщик Брам':{title:'Стойка Брама',sells:['bread'],buys:['fish','flour'],coin:60,line:'Хлеб есть. Рыбу и муку беру — кухня не ждёт.'}};
// side jobs: small paid work from villagers, repeatable once a day
// kinds: work (do something at a spot for a few seconds), deliver (carry an item to someone),
// fetch (bring items to the giver), patrol (walk past points)
const JOBS=[
  {id:'wood',who:'Свену',giver:'Свен-лесоруб',title:'Наколоть дров для Свена',kind:'work',spot:'chop',secs:4,pay:6,verb:'Колоть дрова',
    offer:'Руки есть? Колун у поленницы, наколи охапку — шесть монет твои.',done:'Ровно колешь! Держи, заработал.'},
  {id:'sweep',who:'Агне',giver:'Агна',title:'Подмести двор у таверны',kind:'work',spot:'sweep',secs:3,pay:3,verb:'Подметать',
    offer:'Ой… поможешь подмести у таверны? Брам дал мне три монеты, я отдам их тебе.',done:'Спасибо! Теперь Брам не заругается.'},
  {id:'fish',who:'Нильсу',giver:'Нильс',title:'Наловить 2 рыбы для Нильса',kind:'fetch',item:'fish',n:2,spot:'fish2',secs:5,pay:8,verb:'Рыбачить',
    offer:'Удочка лишняя есть. Поймай две рыбы у причала — заплачу восемь.',done:'Хороший улов. Держи монеты.'},
  {id:'flour',who:'Тодору',giver:'Мельник Тодор',title:'Отнести муку Браму',kind:'deliver',item:'flour',to:'Трактирщик Брам',pay:7,
    offer:'Мешок муки для таверны, а у меня ноги не те. Отнесёшь Браму — семь монет.',done:'Мука на месте? Брам доволен, держи плату.'},
  {id:'patrol',who:'Бьорну',giver:'Стражник Бьорн',title:'Обойти деревню дозором',kind:'patrol',points:[[26,33],[36,30],[50,22]],pay:10,evening:true,
    offer:'Вечером один не справляюсь. Пройди дозором: площадь, восточная дорога, развилка к руинам. Десять монет.',done:'Всё тихо? Хорошо. Держи жалованье.'}];
// ---------- the big island's trade and work, from its settlements ----------
// Each settlement's first trader opens a shop; prices follow the place's wealth and the crown's standing:
// the capital is dear but pays well, the poor settlement sells little, dear, and pays little for goods.
{const shopFor={capital:{title:'Лавка столичного купца',sells:['bread','potion','torch','sword_long','bow_long','shield_kite','spear','mace'],buys:'weapons',coin:260,k:1.15,sk:1.1,line:'Товар хороший, но и стоит недёшево.'},
   village:{title:'Деревенский прилавок',sells:['bread','fish','torch','herb'],buys:['fish','herb','bread','stone','flour'],coin:60,k:1,sk:1,line:'Что вырастили — то и продаём.'},
   works:{title:'Склад каменотёсов',sells:['bread','torch','stone'],buys:['bread','fish','potion'],coin:70,k:1,sk:1.1,line:'Хлеб к нам издалека везут, поэтому и дороже.'},
   poor:{title:'Чем богаты',sells:['herb','fish'],buys:['bread','potion','fish'],coin:25,k:1.3,sk:.7,line:'Много не продам, самим мало.'}};
 const traders=new Map();for(const a of TOWN)if(!traders.has(a.place)&&(a.kind!=='capital'||/Торговец|Купчиха/.test(a.job)))traders.set(a.place,a);
 for(const [p,a] of traders){const S=Object.assign({},shopFor[a.kind]);if(a.kind==='village'&&p.wealth>=3){S.k=.92;S.coin=110;S.sells=S.sells.concat(['potion']);}S.fac='kingdom';S.title+=' · '+p.n;SHOPS[a.npc]=S;}
 // work: rich and middling villages and the quarry send parcels to the capital; the poor settlement to its nearest village;
 // a capital guard pays for a round of the streets
 const cap=GEN.places.find(p=>p.type==='capital'),capT=TOWN.find(a=>a.place===cap&&/Торговец/.test(a.job)),guard=TOWN.find(a=>a.place===cap&&a.job==='Стражник');let n=0;
 for(const [p,a] of traders){if(p===cap)continue;const poor=a.kind==='poor',to=poor?[...traders].filter(([q])=>q!==p&&q!==cap).sort(([x],[y])=>Math.hypot(x.x-p.x,x.z-p.z)-Math.hypot(y.x-p.x,y.z-p.z))[0]?.[1]:capT;if(!to)continue;
   const d=Math.hypot(to.x-a.x,to.z-a.z),pay=Math.max(4,Math.round((d/12+3)*(poor?.6:p.wealth>=3?1.3:1)));
   JOBS.push({id:'gen'+(n++),who:a.npc,giver:a.npc,title:'Отнести свёрток: '+to.npc,kind:'deliver',item:'parcel',to:to.npc,pay,recv:'О, свёрток пришёл. Держи, вот твои деньги.',
     offer:poor?'Отнеси свёрток в соседнюю деревню, отдай '+to.npc+'. Много не дам, сам знаешь, как мы живём.':'Отнеси свёрток в столицу, отдай '+to.npc+'. Далеко, но я заплачу.',done:'Спасибо!'});}
 if(guard){const pts=[[cap.x-5,cap.z],[cap.x,cap.z-5],[cap.x+5,cap.z],[cap.x,cap.z+5]];JOBS.push({id:'gen'+(n++),who:guard.npc,giver:guard.npc,title:'Обойти улицы столицы',kind:'patrol',points:pts,pay:12,
   offer:'Стражников не хватает. Пройдись по улицам вокруг рынка, а я тебе двенадцать монет дам.',done:'Всё спокойно? Держи.'});}}
const jobPayFor=j=>HERO.trade?Math.round(j.pay*1.5):j.pay;
const GOLD_START=12,QUEST_GOLD={wolf:20,band:25,dead:30,fire:35,herb:8};
let gold=GOLD_START,dayN=0,lastT=null;const JOB={};for(const j of JOBS)JOB[j.id]={state:0,day:-1,step:0};
const goldEl=document.getElementById('gold');
function goldUI(){goldEl.querySelector('span').textContent=gold;}
function addGold(n,why){gold=Math.max(0,gold+n);goldUI();if(n>0){sfx('pickup');floatText('+'+n,'#f2c14e',hero);if(why)toast(why+': +'+n+' золота');}goldEl.classList.remove('pulse');void goldEl.offsetWidth;goldEl.classList.add('pulse');}
goldUI();
// a day passes when the clock wraps around midnight
// work progress counts real seconds, not timer calls, so a busy phone does not stretch it
let ecoLast=performance.now();
function ecoTick(){const now=performance.now(),dt=Math.min(.5,(now-ecoLast)/1000);ecoLast=now;if(lastT!=null&&worldTime<lastT-.5)dayN++;lastT=worldTime;jobTick(dt);}
setInterval(()=>{if(!paused)ecoTick();else ecoLast=performance.now();},250);

// ---------- shops ----------
const shopEl=document.getElementById('shop');let shopOf=null;
function shopWares(S){return S.sells.filter(id=>ITEMS_OK(id));}
const ITEMS_OK=id=>!!(window.handsItemName&&(()=>{try{return window.handsItemName(id)}catch(e){return null}})());
const buysIt=(S,id)=>sellable(id)&&(S.buys==='weapons'?!!WEAPONS[id]:S.buys.includes(id));
function openShop(a){const S=SHOPS[a.npc];if(!S)return;shopOf=a;S.left=S.left??S.coin;sfx('click');shopEl.hidden=false;paused=true;renderShop();}
function closeShop(){shopEl.hidden=true;shopOf=null;paused=false;}
function renderShop(){const a=shopOf,S=SHOPS[a.npc];shopEl.querySelector('h2').textContent=S.title;shopEl.querySelector('.sh-line').textContent=S.line;
  shopEl.querySelector('.sh-gold').textContent=gold;shopEl.querySelector('.sh-coin').textContent=S.left;
  const mk=(id,price,label,ok,fn)=>{const b=document.createElement('button');b.className='sh-item';b.disabled=!ok;const im=document.createElement('img');im.src=window.handsIconURL(id);im.alt='';
    const t=document.createElement('span');t.textContent=window.handsItemName(id);const p=document.createElement('b');p.textContent=label+' '+price;b.append(im,t,p);b.onclick=fn;return b;};
  const buy=shopEl.querySelector('.sh-buy'),sell=shopEl.querySelector('.sh-sell');buy.replaceChildren();sell.replaceChildren();
  for(const id of shopWares(S)){const p=priceNow(id,true,S);buy.append(mk(id,p,'',gold>=p,()=>{if(gold<p)return;const k=window.handsAdd(id,1,true);if(!k)return toast('Некуда положить: руки и сумка заняты.');gold-=p;S.left+=p;goldUI();sfx('pickup');renderShop();}));}
  const have=new Map();const it=window.handsItems();for(const x of [it.L,it.R,...it.bag])if(x)have.set(x.id,(have.get(x.id)||0)+x.n);
  for(const [id,n] of have)if(buysIt(S,id)){const p=priceNow(id,false,S);sell.append(mk(id,p,(n>1?'×'+n+' · ':''),S.left>=p,()=>{if(S.left<p)return toast('У торговца кончились монеты.');if(!window.handsConsume(id))return;gold+=p;S.left-=p;goldUI();sfx('pickup');renderShop();}));}
  if(!sell.children.length){const e=document.createElement('p');e.className='sh-empty';e.textContent='Этому торговцу нечего у вас купить.';sell.append(e);}}
document.getElementById('shopClose').onclick=()=>{sfx('click');closeShop();};

// ---------- jobs ----------
const giverOf=j=>actors.find(a=>a.npc===j.giver);
const jobsOf=a=>JOBS.filter(j=>j.giver===a.npc);
const jobOpen=j=>JOB[j.id].state===0&&JOB[j.id].day<dayN+1&&JOB[j.id].day!==dayN&&(!j.evening||nightness()>.2);
const spotOf=j=>{const s=SPOTS[j.spot];const [x,z]=Array.isArray(s[0])?s[0]:s;return nearFree(x+1,z,2);};
function jobOffer(a){const j=jobsOf(a).find(j=>JOB[j.id].state>0)||jobsOf(a)[0];if(!j)return say(a.npc,'Работы для тебя нет.');const st=JOB[j.id];
  if(st.state===2)return jobPay(j);
  if(st.state===1)return say(a.npc,j.kind==='fetch'?'Жду '+j.n+' шт. Пока у тебя '+window.handsCount(j.item)+'.':'Работа ждёт: '+j.title.toLowerCase()+'.');
  if(st.day===dayN)return say(a.npc,'На сегодня всё. Приходи завтра.');
  if(j.evening&&nightness()<=.2)return say(a.npc,'Днём я сам справляюсь. Приходи под вечер.');
  say(a.npc,j.offer+' Плата: '+jobPayFor(j)+' золота.',[['Взяться',()=>jobStart(j)]]);}
function jobStart(j){const st=JOB[j.id];st.state=1;st.step=0;if(j.kind==='deliver'&&!window.handsAdd(j.item,1)){st.state=0;return toast('Освободите руки или сумку для груза.');}
  if(j.kind==='work'||j.kind==='fetch')st.spot=spotOf(j);questUI();toast('Подработка: '+j.title);jobMarkers();}
function jobPay(j){const st=JOB[j.id];if(j.kind==='fetch'){for(let i=0;i<j.n;i++)window.handsConsume(j.item);}st.state=0;st.day=dayN;st.step=0;
  say(j.giver,j.done);addGold(jobPayFor(j),j.title);repJob();questUI();jobMarkers();}
// deliveries finish at the receiver; other kinds come back to the giver
function jobDeliverTo(a){const j=JOBS.find(j=>j.kind==='deliver'&&j.to===a.npc&&JOB[j.id].state===1&&window.handsCount(j.item)>0);if(!j)return false;
  window.handsConsume(j.item);const st=JOB[j.id];st.state=0;st.day=dayN;say(a.npc,j.recv||'Мука от Тодора? Вот спасибо. Тодор велел заплатить тебе.');addGold(jobPayFor(j),j.title);repJob();questUI();return true;}
// working at a spot: stand on the ring and the hero gets on with it
let workT=0,workJob=null;const barEl=document.getElementById('workbar');
function jobTick(dt){for(const j of JOBS){const st=JOB[j.id];if(st.state!==1)continue;
    if(j.kind==='patrol'){const p=j.points[st.step];if(Math.hypot(H0.px-p[0]-.5,H0.pz-p[1]-.5)<1.8){st.step++;sfx('pickup');toast('Дозор: '+st.step+' из '+j.points.length);if(st.step>=j.points.length){st.state=2;toast('Дозор пройден. Вернитесь к '+j.who+'.');}questUI();jobMarkers();}}
    if((j.kind==='work'||(j.kind==='fetch'&&window.handsCount(j.item)<j.n))&&st.spot){const near=Math.hypot(H0.px-st.spot[0]-.5,H0.pz-st.spot[1]-.5)<1.1&&!H0.route?.length&&!CB.on;
      if(near){if(workJob!==j){workJob=j;workT=0;}workT+=dt;barEl.hidden=false;barEl.querySelector('b').textContent=j.verb;barEl.querySelector('i').style.width=Math.min(100,workT/j.secs*100)+'%';
        if(Math.random()<.5)heroPose(j.spot==='chop'?'pickup':'shift',500);
        if(workT>=j.secs){workJob=null;barEl.hidden=true;sfx('pickup');if(j.kind==='work'){st.state=2;toast('Готово! Вернитесь к '+j.who+' за платой.');}
          else{window.handsAdd(j.item,1);if(window.handsCount(j.item)>=j.n){st.state=2;toast('Улов есть. Отнесите рыбу '+j.who+'.');}}questUI();jobMarkers();}}
      else if(workJob===j){workJob=null;barEl.hidden=true;}}
    if(j.kind==='fetch'&&st.state===1&&window.handsCount(j.item)>=j.n){st.state=2;questUI();}}}
// gold rings on the ground mark where the work is
const jobRings=[];const ringMat=new THREE.MeshBasicMaterial({color:0xf2c14e,transparent:true,opacity:.7,depthWrite:false});
function jobMarkers(){for(const r of jobRings)scene.remove(r);jobRings.length=0;for(const j of JOBS){const st=JOB[j.id];if(st.state!==1)continue;
  const pts=j.kind==='patrol'?[j.points[st.step]]:(j.kind==='work'||j.kind==='fetch')&&st.spot?[st.spot]:[];
  for(const [x,z] of pts){const m=new THREE.Mesh(new THREE.RingGeometry(.3,.45,24),ringMat);m.rotation.x=-Math.PI/2;m.position.set(x+.5,groundAt(x,z)+.04,z+.5);m.renderOrder=3;scene.add(m);jobRings.push(m);}}}
// active jobs join the goal list and the red pointer
function jobQuests(){return JOBS.filter(j=>JOB[j.id].state>0).map(j=>{const st=JOB[j.id];return {title:j.title,state:st.state,left:j.kind==='patrol'?j.points.length-st.step:j.kind==='fetch'?Math.max(0,j.n-window.handsCount(j.item)):1,job:true};});}
function jobTarget(){for(const j of JOBS){const st=JOB[j.id];if(st.state===2){if(j.kind==='deliver')continue;const g=giverOf(j);return g?personTarget(g):null;}
    if(st.state===1){if(j.kind==='deliver'){const t=actors.find(a=>a.npc===j.to);return t?personTarget(t):null;}if(j.kind==='patrol'){const p=j.points[st.step];return {x:p[0],z:p[1],label:'Дозор'};}if(st.spot)return {x:st.spot[0],z:st.spot[1],label:j.verb};}}return null;}
// save and load
function ecoSave(){return {gold,day:dayN,jobs:Object.fromEntries(Object.entries(JOB).map(([k,v])=>[k,[v.state,v.day,v.step,v.spot||null]])),shops:Object.fromEntries(Object.entries(SHOPS).map(([k,s])=>[k,s.left??s.coin]))};}
function ecoLoad(d){if(!d)return;gold=d.gold??GOLD_START;dayN=d.day||0;for(const [k,v] of Object.entries(d.jobs||{}))if(JOB[k])Object.assign(JOB[k],{state:v[0],day:v[1],step:v[2],spot:v[3]});
  for(const [k,c] of Object.entries(d.shops||{}))if(SHOPS[k])SHOPS[k].left=c;goldUI();jobMarkers();}
