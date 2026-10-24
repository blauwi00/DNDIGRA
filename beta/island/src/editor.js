// ---------- hero editor ----------
// Built on the game's own character builder (Characters): every option the game
// has — gender, faces, hair, beards, outfits per class, hats, capes, accessories,
// palettes and presets — with small portraits on each tile and a live 3D hero that
// can be turned with a finger and zoomed to the face.
const C_=window.Characters,GAME2CLS={fighter:'fighter',rogue:'rogue',cleric:'cleric',wizard:'mage'};
const NAMES={male:['Эльдар','Бран','Торвин','Ларс','Арден','Рорик','Ивар','Кальдер','Сигурд','Мирон','Хакон','Эйрик'],female:['Мирра','Сигрид','Ильва','Астрид','Лейла','Руна','Фрея','Эйра','Ингрид','Сольвейг','Тора','Вера']};
const ED={name:'Эльдар',cls:'fighter',race:'human',kit:0,gender:'male',ap:null,tab:'race',view:'full',game:null};
const gidOf=k=>CLASSES[k].look.g,gid=()=>gidOf(ED.cls);
// a class's starting look: the builder's default for its base, the class patch, then the people's features
const baseLook=(k=ED.cls,race=ED.race,g=ED.gender)=>raceAppearance(race,Object.assign(C_.defaultLook(gidOf(k),g),JSON.parse(JSON.stringify(CLASSES[k].look.p))));
function edReset(keepName){ED.ap=baseLook();if(!keepName)ED.name=NAMES[ED.gender][0];ED.game=null;}
edReset();
const edState=()=>({classId:gid(),appearance:ED.ap});
// ---- 3D stage: drag to turn, face/full view, a breathing idle ----
let pv=null;
function preview(){const c=document.getElementById('edCanvas');
  if(!pv){const r=new THREE.WebGLRenderer({canvas:c,antialias:false,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));const s=new THREE.Scene(),cam=new THREE.PerspectiveCamera(28,1,.1,30);
    s.add(new THREE.HemisphereLight(0xdfe8ff,0x3a2a1a,.95));const key=new THREE.DirectionalLight(0xffe2b8,.9);key.position.set(2,3,3);s.add(key);const rim=new THREE.DirectionalLight(0x8ab0ff,.55);rim.position.set(-2.5,2,-2.5);s.add(rim);
    const ped=new THREE.Group();const st=lam(T.stone,{color:0xb8b0a4});for(const [rr,h,y] of [[.62,.1,-.05],[.52,.06,.03]]){const m=new THREE.Mesh(new THREE.CylinderGeometry(rr,rr+.04,h,16),st);m.position.y=y;m.receiveShadow=true;ped.add(m);}s.add(ped);
    pv={r,s,cam,m:null,t:0,yaw:.35,drag:null,zoom:1,zoomT:1,auto:false,pts:new Map()};
    // one finger turns the hero, two fingers pinch to zoom, the mouse wheel zooms too
    const pinch=()=>{const [a,b]=[...pv.pts.values()];return Math.hypot(a.x-b.x,a.y-b.y);};
    c.addEventListener('pointerdown',e=>{pv.pts.set(e.pointerId,{x:e.clientX,y:e.clientY});c.setPointerCapture(e.pointerId);setAuto(false);
      if(pv.pts.size===2){pv.drag=null;pv.pinch={d:pinch(),z:pv.zoomT};}else if(pv.pts.size===1)pv.drag={x:e.clientX,yaw:pv.yaw};});
    c.addEventListener('pointermove',e=>{if(!pv.pts.has(e.pointerId))return;pv.pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pv.pinch&&pv.pts.size===2)pv.zoomT=Math.max(0,Math.min(1,pv.pinch.z-(pinch()-pv.pinch.d)/220));else if(pv.drag)pv.yaw=pv.drag.yaw+(e.clientX-pv.drag.x)*.012;});
    const up=e=>{pv.pts.delete(e.pointerId);if(pv.pts.size<2)pv.pinch=null;pv.drag=null;};c.addEventListener('pointerup',up);c.addEventListener('pointercancel',up);
    c.addEventListener('wheel',e=>{e.preventDefault();pv.zoomT=Math.max(0,Math.min(1,pv.zoomT+e.deltaY*.0012));},{passive:false});
    const loop=()=>{if(edEl.hidden){pv.raf=0;return;}const w=c.clientWidth,h=c.clientHeight;if(c.width!==Math.round(w*r.getPixelRatio())||c.height!==Math.round(h*r.getPixelRatio())){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
      pv.t+=.016;pv.zoom+=(pv.zoomT-pv.zoom)*.12;if(pv.auto)pv.yaw+=.004;
      const face=pv.zoom,fit=Math.min(1,Math.max(.5,w/h*1.25)),F=pv.fitB||{d:4.4,y:.62},dist=(F.d-(F.d-2.7)*(1-face))/fit,ly=F.y+(.9*RACES[ED.race].size-F.y)*(1-face);cam.position.set(0,ly+.18*face,dist);cam.lookAt(0,ly,0);
      if(pv.m){pv.m.rotation.y=pv.yaw;const rg=pv.m.userData.rig,b=pv.m.userData.body,br=Math.sin(pv.t*1.8);if(rg){rg.torso.scale.y=1+br*.012;rg.head.rotation.y=Math.sin(pv.t*.6)*.12;
        if(pv.m.userData.twoHand&&kindOf(pv.m.userData.twoHand)!=='bow'){rg.armL.rotation.set(-.25,0,.05);rg.armR.rotation.set(-br*.04,0,0);}else if(pv.m.userData.twoHand){rg.armL.rotation.set(br*.04,0,0);rg.armR.rotation.set(-.12,0,.1);}else{rg.armL.rotation.set(br*.04,0,0);rg.armR.rotation.set(-br*.04,0,0);}}
        if(pv.pop>0){pv.pop-=.05;b.position.y=Math.sin(pv.pop*Math.PI)*.06;}}
      r.render(s,cam);pv.raf=requestAnimationFrame(loop);};pv.loop=loop;}
  if(pv.m)pv.s.remove(pv.m);pv.m=buildModel(raceDecorate(ED.race,C_.build(C_.spec('hero',edState())),ED.ap));raceScale(ED.race,pv.m);pv.pop=1;
  const kit=CLASSES[ED.cls].kits[ED.kit]||CLASSES[ED.cls].kits[0],L=kit.L,R=kit.R,two=TWO.has(L)?L:TWO.has(R)?R:null;if(two)setTwoHanded(pv.m,two);else{if(L)setHeld(pv.m,'L',L);if(R)setHeld(pv.m,'R',R);}
  // frame the whole hero with what they hold: long polearms and staves must fit in the shot
  pv.m.rotation.y=0;pv.m.updateMatrixWorld(true);const bb=new THREE.Box3().setFromObject(pv.m),top=Math.max(1.35,bb.max.y),bot=Math.min(-.05,bb.min.y),half=((top-bot)/2+.12)*1.2;
  pv.fitB={d:Math.max(4.4,half/Math.tan(THREE.MathUtils.degToRad(14))),y:Math.max(.62,(top+bot)/2+half*.16)};
  pv.s.add(pv.m);if(!pv.raf)pv.loop();}
// ---- small portraits for tiles, cached ----
const pCache=new Map();
function tilePortrait(ap,view,back){const k=gid()+'|'+view+'|'+(back?1:0)+'|'+JSON.stringify(ap);let cv=pCache.get(k);
  if(!cv){cv=C_.portrait('hero',{classId:gid(),appearance:ap},{view,width:64,height:64,pixel:2,back});if(pCache.size>400)pCache.clear();pCache.set(k,cv);}
  const out=document.createElement('canvas');out.width=cv.width;out.height=cv.height;const g=out.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(cv,0,0);return out;}
const clone=o=>JSON.parse(JSON.stringify(o));
// ---- 3D tiles: the real model with the people's horns, tusks, fins and growths ----
let tR=null;const tCache=new Map();
function tile3D(ap,race,view,cls){const k=(cls||ED.cls)+'|'+race+'|'+view+'|'+JSON.stringify(ap);let cv=tCache.get(k);
  if(!cv){if(!tR){const r=new THREE.WebGLRenderer({antialias:false,alpha:true,preserveDrawingBuffer:true});r.setSize(96,96);r.setPixelRatio(1);const s=new THREE.Scene();
      s.add(new THREE.HemisphereLight(0xdfe8ff,0x3a2a1a,1));const key=new THREE.DirectionalLight(0xffe2b8,.85);key.position.set(2,3,3);s.add(key);tR={r,s,cam:new THREE.PerspectiveCamera(26,1,.1,30)};}
    const m=buildModel(raceDecorate(race,C_.build(C_.spec('hero',{classId:gidOf(cls||ED.cls),appearance:ap})),ap));raceScale(race,m);m.rotation.y=.4;tR.s.add(m);
    const head=view==='head',y=head?1.0*RACES[race].size:.62;tR.cam.position.set(0,y+(head?.05:.12),head?1.9:3.05);tR.cam.lookAt(0,y,0);tR.r.render(tR.s,tR.cam);tR.s.remove(m);
    m.traverse(o=>{if(o.geometry)o.geometry.dispose();});cv=document.createElement('canvas');cv.width=cv.height=96;cv.getContext('2d').drawImage(tR.r.domElement,0,0);if(tCache.size>300)tCache.clear();tCache.set(k,cv);}
  const out=document.createElement('canvas');out.width=out.height=96;out.getContext('2d').drawImage(cv,0,0);return out;}
// ---- ready looks for every class and people: six faces in the class outfit ----
const PRESET_NAMES={fighter:['Страж ворот','Ветеран','Наёмница','Щитоносица','Капитан','Молодой рекрут'],barbarian:['Северянин','Буревестник','Дочь бури','Медвежья кровь','Вождь','Дикарка'],
  paladin:['Рыцарь зари','Хранитель клятвы','Белая дева','Мститель','Странствующий рыцарь','Знаменосица'],monk:['Тихий ученик','Мастер ветра','Сестра пути','Отшельник','Наставник','Странница'],
  ranger:['Охотник','Лесная тень','Следопытка','Страж границы','Зверолов','Разведчица'],rogue:['Карманник','Тень порта','Ловкачка','Взломщик','Контрабандист','Лиса'],
  bard:['Менестрель','Сказитель','Певица','Шут','Поэт','Танцовщица'],cleric:['Брат-хранитель','Целитель','Жрица света','Паломник','Отец-настоятель','Послушница'],
  druid:['Хранитель рощи','Старый дуб','Травница','Говорящий с волками','Шаман','Дочь леса'],sorcerer:['Наследник огня','Буйная кровь','Искра','Пламенный','Изгнанник','Ведьма грозы'],
  warlock:['Должник','Тёмный договор','Ведьма','Голос бездны','Книжник','Проклятая'],mage:['Звездочёт','Учёный','Чародейка','Архивариус','Старый маг','Ученица']};
const GENDERS=['male','male','female','male','male','female'];
function seeded(seed,fn){const old=Math.random;let x=seed>>>0||1;Math.random=()=>((x=Math.imul(x^x>>>15,2246822507)^Math.imul(x^x>>>13,3266489909),x=(x^x>>>16)>>>0)/4294967296);try{return fn();}finally{Math.random=old;}}
const FACE_KEYS=['hairStyle','hair','hair2','brows','brow','eyes','eye','mouth','beard','beardColor','marks','accessories'];
function lookPresets(cls,race){const names=PRESET_NAMES[cls]||PRESET_NAMES.fighter,h=[...(cls+race)].reduce((a,c)=>a*31+c.charCodeAt(0)|0,7);
  return names.map((n,i)=>{const g=GENDERS[i],base=baseLook(cls,race,g),rnd=seeded(h+i*977,()=>C_.randomLook(gidOf(cls),g)),ap=clone(base);
    for(const k of FACE_KEYS)if(rnd[k]!==undefined)ap[k]=rnd[k];if(i===4){ap.hair='#c7c4bf';if(g==='male'&&ap.beard==='none')ap.beard='full';}
    if(i%3===2&&rnd.headgear)ap.headgear=rnd.headgear;if(i===1&&rnd.cape)ap.cape=rnd.cape;
    return {name:n,gender:g,ap:raceAppearance(race,C_.normalize(ap,gidOf(cls)))};});}
function setAp(key,val){ED.ap=Object.assign(clone(ED.ap),{[key]:val});ED.game=null;sfx('click');openEditor(true);}
// ---- panel ----
const STATS=k=>{const c=CLASSES[k];return [['Здоровье',c.hp/20],['Защита',(c.ac-10)/6],['Ближний бой',c.melee/5],['Дальний бой',Math.max(c.ranged,c.spell)/5],['Скрытность',c.stealth/7]];};
const CLASS_ROLE={fighter:'щит и меч, держит удар',rogue:'кинжал и лук, бьёт из тени',cleric:'доспех и вера, лечит',mage:'посох и чары, бьёт издалека'};
function el(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text!=null)e.textContent=text;return e;}
function openEditor(keep){if(!keep){screen(edEl);}const body=document.getElementById('hcBody');const scroll=body.scrollTop;body.replaceChildren();
  document.querySelectorAll('#hcTabs button').forEach(b=>b.classList.toggle('on',b.dataset.tab===ED.tab));
  const nm=document.getElementById('edName');if(document.activeElement!==nm)nm.value=ED.name;
  document.getElementById('hcClassTag').textContent=RACES[ED.race].n+' · '+CLASSES[ED.cls].n+' · '+(ED.gender==='female'?'женщина':'мужчина');
  if(ED.tab==='race')raceTab(body);else if(ED.tab==='class')classTab(body);else if(ED.tab==='looks')looksTab(body);else groupTab(body,ED.tab);
  body.scrollTop=keep?scroll:0;renderGameHeroes();preview();}
function raceTab(body){const strip=el('div','hc-carousel');
  for(const k of RACE_ORDER){const R=RACES[k],b=el('button','hc-race'+(ED.race===k?' on':''));const ap=raceAppearance(k,C_.defaultLook(gid(),ED.gender));
    const pic=tile3D(ap,k,'head');pic.className='hc-pic';
    b.append(pic,el('b',null,R.n),el('small',null,R.group));b.onclick=()=>{if(ED.race===k)return;ED.race=k;ED.ap=baseLook();ED.game=null;sfx('click');openEditor(true);};strip.append(b);}
  body.append(el('div','hc-lab','Народ · проведите по ряду'),strip);const R=RACES[ED.race];
  const card=el('div','hc-racecard');card.append(el('b',null,R.n),el('p',null,R.passive),el('p',null,R.edge),el('small',null,'Чаще выбирают: '+R.pref+'. Любой класс доступен.'));body.append(card);
  strip.addEventListener('scroll',()=>{ED.raceScroll=strip.scrollLeft;},{passive:true});
  requestAnimationFrame(()=>{if(ED.raceScroll!=null){strip.scrollLeft=ED.raceScroll;return;}const on=strip.querySelector('.on');if(on)strip.scrollLeft=on.offsetLeft-strip.clientWidth/2+on.clientWidth/2;ED.raceScroll=strip.scrollLeft;});}
function classTab(body){const g=el('div','hc-classes');
  for(const k of CLASS_ORDER){const c=CLASSES[k],b=el('button','hc-class'+(ED.cls===k?' on':''));
    const pic=C_.portrait('hero',{classId:gidOf(k),appearance:k===ED.cls?ED.ap:baseLook(k)},{view:'body',width:60,height:60,pixel:2});pic.className='hc-pic';
    b.append(pic,el('b',null,c.n),el('small',null,c.role));b.onclick=()=>{if(ED.cls===k)return;ED.cls=k;ED.kit=0;ED.ap=baseLook();ED.game=null;sfx('click');openEditor(true);};g.append(b);}
  body.append(g);const kits=CLASSES[ED.cls].kits;
  {const row=el('div','hc-kits'),items=kt=>[kt.R,kt.L,...(kt.bag||[])].filter(Boolean);
    kits.forEach((kt,i)=>{const b=el('button',ED.kit===i?'on':'');const ic=el('span','hc-kit-ic');for(const id of items(kt)){const im=document.createElement('img');im.src=window.handsIconURL(id);im.alt='';ic.append(im);}
      b.append(ic,el('span',null,kt.n));b.onclick=()=>{if(ED.kit===i)return;ED.kit=i;sfx('click');openEditor(true);};row.append(b);});
    const cur=kits[ED.kit]||kits[0],info=el('div','hc-kit-info');for(const id of items(cur)){const V=WEAPONS[id];if(V)info.append(el('div',null,V.n+' — '+V.d));}
    body.append(el('div','hc-lab','Стартовое оружие'),row,info);}
  const sx=el('div','hc-gender');for(const [gv,label] of [['male','Мужчина'],['female','Женщина']]){const b=el('button',ED.gender===gv?'on':'',label);b.onclick=()=>{if(ED.gender===gv)return;ED.gender=gv;ED.ap=baseLook();ED.game=null;if(NAMES[gv==='male'?'female':'male'].includes(ED.name))ED.name=NAMES[gv][Math.floor(Math.random()*NAMES[gv].length)];sfx('click');openEditor(true);};sx.append(b);}
  body.append(el('div','hc-lab','Пол'),sx);
  const H=applyRace(Object.assign({},CLASSES[ED.cls]),ED.race),st=el('div','hc-stats');
  for(const [n,v] of [['Здоровье',H.hp/26],['Защита',(H.ac-10)/7],['Ближний бой',H.melee/6],['Дальний бой и магия',Math.max(H.ranged,H.spell)/6],['Скрытность',H.stealth/9]]){const r=el('div','hc-stat');r.append(el('span',null,n));const bar=el('i');bar.style.setProperty('--v',Math.max(.08,Math.min(1,v)));r.append(bar);st.append(r);}
  body.append(el('div','hc-lab','Сильные стороны · '+RACES[ED.race].n+' '+CLASSES[ED.cls].n.toLowerCase()),st,el('p','hc-about',CLASSES[ED.cls].about));}
function looksTab(body){const g=el('div','hc-tiles big');
  const rb=el('button','hc-wide');rb.append(el('span','hc-die','?'),document.createTextNode(' Случайный облик: '+RACES[ED.race].n.toLowerCase()+', '+CLASSES[ED.cls].n.toLowerCase()));rb.onclick=()=>randomHero(false);body.append(rb);
  for(const p of lookPresets(ED.cls,ED.race)){const b=el('button','hc-tile');b.append(tile3D(p.ap,ED.race,'full',ED.cls),el('small',null,p.name));
    b.onclick=()=>{if(ED.gender!==p.gender&&!NAMES[p.gender].includes(ED.name))ED.name=NAMES[p.gender][Math.floor(Math.random()*NAMES[p.gender].length)],document.getElementById('edName').value=ED.name;ED.gender=p.gender;ED.ap=clone(p.ap);ED.game=null;sfx('click');openEditor(true);};g.append(b);}
  body.append(el('div','hc-lab','Готовые образы · '+RACES[ED.race].n+' · '+CLASSES[ED.cls].n),g);}
function groupTab(body,tab){for(const G of C_.GROUPS[tab]){const key=G.key;
    if(G.type==='swatch'){const pal=C_.PALETTES[C_.COLOR_FIELDS[key]];const row=el('div','hc-swatches');
      if(G.follow){const b=el('button','hc-sw auto'+(ED.ap[key]==null?' on':''),'');b.title=G.follow;b.setAttribute('aria-label',G.title+': '+G.follow);b.onclick=()=>setAp(key,null);row.append(b);}
      for(const c of pal){const b=el('button','hc-sw'+(String(ED.ap[key]).toLowerCase()===c.hex.toLowerCase()?' on':''));b.style.background=c.hex;b.title=c.name;b.setAttribute('aria-label',G.title+': '+c.name);b.onclick=()=>setAp(key,c.hex);row.append(b);}
      const cur=pal.find(c=>String(ED.ap[key]).toLowerCase()===c.hex.toLowerCase());body.append(el('div','hc-lab',G.title+(cur?' · '+cur.name:ED.ap[key]==null&&G.follow?' · '+G.follow:'')),row);continue;}
    let opts=G.byClass?C_.OUTFITS[gid()]:C_.OPTIONS[key];if(G.maleFirst&&ED.gender==='female'&&key==='beard')opts=opts.filter(o=>o.id==='none').concat(opts.filter(o=>o.id!=='none'));
    const row=el('div','hc-tiles');
    for(const o of opts){const multi=G.type==='multi',on=multi?(ED.ap[key]||[]).includes(o.id):ED.ap[key]===o.id;const b=el('button','hc-tile'+(on?' on':''));
      const ap=clone(ED.ap);if(multi){ap[key]=on?ap[key]:[...(ap[key]||[]),o.id];}else ap[key]=o.id;
      b.append(tilePortrait(ap,G.view||'full',G.back),el('small',null,o.name));b.setAttribute('aria-pressed',on);
      b.onclick=()=>{if(multi){const cur=ED.ap[key]||[];setAp(key,on?cur.filter(x=>x!==o.id):[...cur,o.id]);}else setAp(key,o.id);if(G.view==='face'||G.view==='head'||G.view==='hat'){pv.zoomT=0;}};row.append(b);}
    body.append(el('div','hc-lab',G.title+(G.type==='multi'?' · можно несколько':'')),row);}}
function randomHero(full){const gv=full?(Math.random()<.5?'male':'female'):ED.gender;ED.gender=gv;if(full){ED.cls=CLASS_ORDER[Math.floor(Math.random()*CLASS_ORDER.length)];ED.race=RACE_ORDER[Math.floor(Math.random()*RACE_ORDER.length)];ED.kit=0;}
  ED.ap=raceAppearance(ED.race,Object.assign(C_.randomLook(gid(),gv),{outfit:baseLook().outfit}));ED.game=null;ED.name=NAMES[gv][Math.floor(Math.random()*NAMES[gv].length)];sfx('dice');openEditor(true);}
document.getElementById('hcTabs').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;ED.tab=b.dataset.tab;pv&&(pv.zoomT=['face','hair','race'].includes(ED.tab)?0:1);sfx('click');openEditor(true);});
document.getElementById('hcRandom').onclick=()=>randomHero(true);
document.getElementById('hcNameDie').onclick=()=>{ED.name=NAMES[ED.gender][Math.floor(Math.random()*NAMES[ED.gender].length)];document.getElementById('edName').value=ED.name;sfx('dice');};
document.getElementById('edName').oninput=e=>ED.name=e.target.value.slice(0,16);
document.getElementById('hcZoomIn').onclick=()=>{pv.zoomT=Math.max(0,pv.zoomT-.34);sfx('click');};
document.getElementById('hcZoomOut').onclick=()=>{pv.zoomT=Math.min(1,pv.zoomT+.34);sfx('click');};
function setAuto(on){if(!pv)return;pv.auto=on;const b=document.getElementById('hcTurn');b.classList.toggle('on',on);b.setAttribute('aria-pressed',on);b.setAttribute('aria-label',on?'Остановить вращение':'Включить вращение');}
document.getElementById('hcTurn').onclick=()=>{setAuto(!pv.auto);sfx('click');};
// heroes from the main game: offline profile in IndexedDB, or the Site's API when signed in
let gameHeroes=null;
async function loadGameHeroes(){if(gameHeroes)return gameHeroes;const list=[];
  try{const r=await fetch('../api/heroes',{credentials:'same-origin'});if(r.ok&&(r.headers.get('content-type')||'').includes('json')){const j=await r.json();if(Array.isArray(j.heroes))list.push(...j.heroes);}}catch(e){}
  if(!list.length&&window.indexedDB)try{list.push(...await new Promise(res=>{const q=indexedDB.open('dndigra-offline-v1');q.onerror=()=>res([]);q.onupgradeneeded=()=>{q.transaction.abort();res([]);};
    q.onsuccess=()=>{const db=q.result;if(!db.objectStoreNames.contains('profiles')){db.close();return res([]);}const g=db.transaction('profiles','readonly').objectStore('profiles').get('player');
      g.onsuccess=()=>{db.close();res((g.result&&g.result.heroes)||[]);};g.onerror=()=>{db.close();res([]);};};}));}catch(e){}
  return gameHeroes=list.filter(h=>h&&h.name&&h.classId&&GAME2CLS[h.classId]);}
async function renderGameHeroes(){const box=document.getElementById('edGame');const list=await loadGameHeroes();box.hidden=!list.length;if(!list.length)return;const row=box.querySelector('.gh-row');row.replaceChildren();
  for(const h of list){const b=el('button','gh'+(ED.game===h.id?' on':''));const pic=C_.portrait('hero',h,{view:'face',width:36,height:36,pixel:2});pic.className='gh-pic';b.append(pic,el('b',null,h.name));
    b.onclick=()=>{ED.game=h.id;ED.name=h.name.slice(0,16);ED.cls=GAME2CLS[h.classId];ED.race='human';ED.kit=0;ED.gender=(h.appearance&&h.appearance.gender)||'male';ED.ap=C_.normalize(h.appearance,h.classId);sfx('click');openEditor(true);};row.append(b);}}
document.getElementById('edBack').onclick=()=>mainMenu();
document.getElementById('edGo').onclick=()=>{const name=(ED.name||'').trim()||NAMES[ED.gender][0];const s={name,cls:ED.cls,race:ED.race,kit:ED.kit,game:{classId:gid(),appearance:ED.ap},look:null};
  resetting=true;try{localStorage.setItem('helga-hero',JSON.stringify(s));localStorage.removeItem(SAVE);sessionStorage.setItem('helga-start','new');}catch(e){}
  document.getElementById('loading').classList.remove('gone');setTimeout(()=>location.reload(),250);};
