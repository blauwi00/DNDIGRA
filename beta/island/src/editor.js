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
    pv={r,s,cam,m:null,t:0,yaw:.35,drag:null,zoom:1,zoomT:1,auto:true};
    c.addEventListener('pointerdown',e=>{pv.drag={x:e.clientX,yaw:pv.yaw};pv.auto=false;c.setPointerCapture(e.pointerId);});
    c.addEventListener('pointermove',e=>{if(pv.drag)pv.yaw=pv.drag.yaw+(e.clientX-pv.drag.x)*.012;});
    c.addEventListener('pointerup',()=>{pv.drag=null;});c.addEventListener('pointercancel',()=>{pv.drag=null;});
    const loop=()=>{if(edEl.hidden){pv.raf=0;return;}const w=c.clientWidth,h=c.clientHeight;if(c.width!==Math.round(w*r.getPixelRatio())||c.height!==Math.round(h*r.getPixelRatio())){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();}
      pv.t+=.016;pv.zoom+=(pv.zoomT-pv.zoom)*.12;if(pv.auto)pv.yaw+=.004;
      const face=pv.zoom,fit=Math.min(1,Math.max(.5,w/h*1.25)),dist=(4.4-1.7*(1-face))/fit,ly=.62+.28*(1-face);cam.position.set(0,ly+.35*face,dist);cam.lookAt(0,ly,0);
      if(pv.m){pv.m.rotation.y=pv.yaw;const close=pv.zoom<.5;pv.m.traverse(o=>{if(o.userData&&o.userData.item)o.userData.item.visible=!close;});const rg=pv.m.userData.rig,b=pv.m.userData.body,br=Math.sin(pv.t*1.8);if(rg){rg.torso.scale.y=1+br*.012;rg.head.rotation.y=Math.sin(pv.t*.6)*.12;
        if(pv.m.userData.twoHand&&pv.m.userData.twoHand!=='bow'){rg.armL.rotation.set(-.55,0,.05);rg.armR.rotation.set(-1.05,0,-.75);}else if(pv.m.userData.twoHand){rg.armL.rotation.set(-1,0,.5);rg.armR.rotation.set(-1,0,-.5);}else{rg.armL.rotation.set(br*.04,0,0);rg.armR.rotation.set(-br*.04,0,0);}}
        if(pv.pop>0){pv.pop-=.05;b.position.y=Math.sin(pv.pop*Math.PI)*.06;}}
      r.render(s,cam);pv.raf=requestAnimationFrame(loop);};pv.loop=loop;}
  if(pv.m)pv.s.remove(pv.m);pv.m=buildModel(raceDecorate(ED.race,C_.build(C_.spec('hero',edState())),ED.ap));raceScale(ED.race,pv.m);pv.pop=1;
  const kit=CLASSES[ED.cls].kits[ED.kit]||CLASSES[ED.cls].kits[0],L=kit.L,R=kit.R,two=TWO.has(L)?L:TWO.has(R)?R:null;if(two)setTwoHanded(pv.m,two);else{if(L)setHeld(pv.m,'L',L);if(R)setHeld(pv.m,'R',R);}
  pv.s.add(pv.m);if(!pv.raf)pv.loop();}
// ---- small portraits for tiles, cached ----
const pCache=new Map();
function tilePortrait(ap,view,back){const k=gid()+'|'+view+'|'+(back?1:0)+'|'+JSON.stringify(ap);let cv=pCache.get(k);
  if(!cv){cv=C_.portrait('hero',{classId:gid(),appearance:ap},{view,width:64,height:64,pixel:2,back});if(pCache.size>400)pCache.clear();pCache.set(k,cv);}
  const out=document.createElement('canvas');out.width=cv.width;out.height=cv.height;const g=out.getContext('2d');g.imageSmoothingEnabled=false;g.drawImage(cv,0,0);return out;}
const clone=o=>JSON.parse(JSON.stringify(o));
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
    const pic=C_.portrait('hero',{classId:gid(),appearance:ap},{view:'head',width:64,height:64,pixel:2});pic.className='hc-pic';
    b.append(pic,el('b',null,R.n),el('small',null,R.group));b.onclick=()=>{if(ED.race===k)return;ED.race=k;ED.ap=baseLook();ED.game=null;sfx('click');openEditor(true);};strip.append(b);}
  body.append(el('div','hc-lab','Народ · проведите по ряду'),strip);const R=RACES[ED.race];
  const card=el('div','hc-racecard');card.append(el('b',null,R.n),el('p',null,R.passive),el('p',null,R.edge),el('small',null,'Чаще выбирают: '+R.pref+'. Любой класс доступен.'));body.append(card);
  requestAnimationFrame(()=>{const on=strip.querySelector('.on');if(on)strip.scrollLeft=on.offsetLeft-strip.clientWidth/2+on.clientWidth/2;});}
function classTab(body){const g=el('div','hc-classes');
  for(const k of CLASS_ORDER){const c=CLASSES[k],b=el('button','hc-class'+(ED.cls===k?' on':''));
    const pic=C_.portrait('hero',{classId:gidOf(k),appearance:k===ED.cls?ED.ap:baseLook(k)},{view:'body',width:60,height:60,pixel:2});pic.className='hc-pic';
    b.append(pic,el('b',null,c.n),el('small',null,c.role));b.onclick=()=>{if(ED.cls===k)return;ED.cls=k;ED.kit=0;ED.ap=baseLook();ED.game=null;sfx('click');openEditor(true);};g.append(b);}
  body.append(g);const kits=CLASSES[ED.cls].kits;
  if(kits.length>1){const row=el('div','hc-gender');kits.forEach((kt,i)=>{const b=el('button',ED.kit===i?'on':'',kt.n);b.onclick=()=>{ED.kit=i;sfx('click');openEditor(true);};row.append(b);});body.append(el('div','hc-lab','Стартовое оружие'),row);}
  const sx=el('div','hc-gender');for(const [gv,label] of [['male','Мужчина'],['female','Женщина']]){const b=el('button',ED.gender===gv?'on':'',label);b.onclick=()=>{if(ED.gender===gv)return;ED.gender=gv;ED.ap=baseLook();ED.game=null;if(NAMES[gv==='male'?'female':'male'].includes(ED.name))ED.name=NAMES[gv][Math.floor(Math.random()*NAMES[gv].length)];sfx('click');openEditor(true);};sx.append(b);}
  body.append(el('div','hc-lab','Пол'),sx);
  const H=applyRace(Object.assign({},CLASSES[ED.cls]),ED.race),st=el('div','hc-stats');
  for(const [n,v] of [['Здоровье',H.hp/26],['Защита',(H.ac-10)/7],['Ближний бой',H.melee/6],['Дальний бой и магия',Math.max(H.ranged,H.spell)/6],['Скрытность',H.stealth/9]]){const r=el('div','hc-stat');r.append(el('span',null,n));const bar=el('i');bar.style.setProperty('--v',Math.max(.08,Math.min(1,v)));r.append(bar);st.append(r);}
  body.append(el('div','hc-lab','Сильные стороны · '+RACES[ED.race].n+' '+CLASSES[ED.cls].n.toLowerCase()),st,el('p','hc-about',CLASSES[ED.cls].about));}
function looksTab(body){const g=el('div','hc-tiles big');
  const rb=el('button','hc-wide');rb.append(el('span','hc-die','?'),document.createTextNode(' Случайный облик для класса «'+CLASSES[ED.cls].n+'»'));rb.onclick=()=>randomHero(false);body.append(rb);
  for(const p of C_.PRESETS[gid()]){const ap=C_.presetLook(gid(),p),b=el('button','hc-tile');b.append(tilePortrait(ap,'full'),el('small',null,p.name));
    b.onclick=()=>{ED.gender=p.gender;ED.ap=ap;ED.game=null;sfx('click');openEditor(true);};g.append(b);}
  body.append(el('div','hc-lab','Готовые образы'),g);}
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
document.getElementById('hcZoom').onclick=()=>{pv.zoomT=pv.zoomT>.5?0:1;sfx('click');};
document.getElementById('hcTurn').onclick=()=>{pv.auto=!pv.auto;sfx('click');};
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
