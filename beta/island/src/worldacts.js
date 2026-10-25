// ---------- things in the world have properties, and properties allow actions ----------
// No script per door: an oil barrel burns, a lock can be picked or broken, a heavy stone can be moved.
// The game offers what the thing allows and rolls d20 + the hero's skill against its difficulty,
// as a game master would. In a fight such an action costs the hero's action.
const OBJS={}; // by key: the saved state
const holds=id=>{const h=hero.userData.held||{};return h.L===id||h.R===id;};
const canFire=()=>holds('torch')||['mage','sorcerer','warlock'].includes(HERO.cls);
function objPut(key,x,z,build,name){const g=new THREE.Group();build(g,groundAt(x,z));scene.add(g);blockCell(x,z);const ms=[];g.traverse(m=>m.isMesh&&ms.push(m));
  const it={key,mesh:ms[0],extra:ms.slice(1),x,z,name,g};interact.push(it);return it;}
function objGone(it){it.g.visible=false;interact.splice(interact.indexOf(it),1);solid.delete(it.x+','+it.z);OBJS[it.key]=1;}
// ---- oil barrels by the robbers' fires: a torch thrown from a safe distance ----
function barrelBlast(it){const R=1.6,hit=enemies.filter(e=>!e.dead&&!e.dormant&&Math.hypot(e.x-it.x,e.z-it.z)<=R);objGone(it);sfx('spell');shake=.45;
  floatText('Взрыв!','#ff8a3a',{position:new THREE.Vector3(it.x+.5,groundAt(it.x,it.z),it.z+.5)});
  for(const e of hit){const dmg=d(6)+d(6);floatText('-'+dmg,'#ff8a3a',e.o);e.aware=true;hurt(e,dmg,H0,'fire');}
  if(Math.hypot(H0.x-it.x,H0.z-it.z)<=R){const dmg=d(6);floatText('-'+dmg,'#ff8a3a',hero);hurt(H0,dmg,null,'fire');}
  return hit.filter(e=>!e.dead);}
function barrelUse(it){const dist=Math.hypot(H0.x-it.x,H0.z-it.z);
  const ch=[];if(canFire())ch.push([holds('torch')?'Бросить факел':'Поджечь искрой',()=>{
    if(dist>6)return say(it.name,'Слишком далеко, не добросить. Подойдите на шесть шагов.');
    const run=()=>{if(holds('torch')&&window.handsConsume)window.handsConsume('torch');const left=barrelBlast(it);if(!CB.on&&left.length)startCombat(left[0],true,true);};
    if(CB.on)doVerb(null,async()=>run());else run();save();}]);
  say(it.name,'Бочка с маслом, рядом с костром. Разбойники держат её для фонарей. Если поджечь — рванёт так, что достанется всем вокруг.'+(canFire()?'':' Нужен огонь: факел в руке.'),ch);}
// ---- the robbers' locked chest: pick the lock quietly or break it loudly ----
function chestUse(it){if(it.open)return;
  const pick=HERO.stealth+(holds('dagger')||holds('dagger_curved')?2:0),brk=HERO.athletics;
  const ch=[['Вскрыть замок · '+chance(pick,13,0)+'%',async()=>{const r=await roll20('Взлом',pick,13);rollDone(2000);if(r.ok)return chestOpen(it);it.tries=(it.tries||0)+1;say(it.name,'Отмычка срывается. '+(it.tries<2?'Можно попробовать ещё раз.':'Замок заклинило — теперь только силой.'));}],
    ['Выбить крышку · '+chance(brk,15,0)+'%',async()=>{const r=await roll20('Атлетика',brk,15);rollDone(2000);campNoise(it);if(r.ok)return chestOpen(it);say(it.name,'Крышка трещит, но держится. Грохот слышно на весь лес.');}]];
  if(it.tries>=2)ch.shift();say(it.name,'Окованный сундук разбойников с тяжёлым замком.',ch);}
function chestOpen(it){it.open=true;OBJS[it.key]=1;sfx('chest');const loot=[['potion',1],[['dagger_curved','sword_scimitar','bow_short'][Math.floor(hash2(it.x,it.z)*3)],1]];
  window.handsGive&&window.handsGive(loot,'Сундук разбойников');addGold(15+Math.floor(hash2(it.z,it.x)*20),'Сундук разбойников');it.lid.rotation.x=-1.2;}
function campNoise(it){const near=enemies.filter(e=>!e.dead&&!e.dormant&&!e.calm&&Math.hypot(e.x-it.x,e.z-it.z)<=9);if(near.length&&!CB.on){for(const e of near)e.aware=true;startCombat(near[0]);}}
// every robbers' camp of the big island gets a barrel by its fire and a locked chest
for(const p of GPL.filter(p=>p.type==='bandits')){
  {const [x,z]=nearFree(p.x+3,p.z-1,3),key='barrel'+p.x+'_'+p.z;if(!OBJS[key]){const it=objPut(key,x,z,(g,y)=>{const B=(m,px,py,pz,w,h,d)=>{const b=new THREE.Mesh(BOX,m);b.scale.set(w,h,d);b.position.set(px,py,pz);b.castShadow=true;g.add(b);};
      const wood=lam(T.p[1],{color:0x7a4a2a}),iron=lam(T.stone,{color:0x3a3a40});B(wood,x+.5,y+.32,z+.5,.5,.64,.5);B(iron,x+.5,y+.12,z+.5,.54,.05,.54);B(iron,x+.5,y+.52,z+.5,.54,.05,.54);B(new THREE.MeshLambertMaterial({color:0xc8402a}),x+.5,y+.34,z+.76,.22,.16,.02);},'Бочка с маслом');it.use=()=>barrelUse(it);it.far=true;it.fight=true;}}
  {const [x,z]=nearFree(p.x-3,p.z-1,3),key='chest'+p.x+'_'+p.z;const it=objPut(key,x,z,(g,y)=>{const c=new THREE.Mesh(BOX,lam(T.crate,{color:0x6a4a2a}));c.scale.set(.7,.4,.45);c.position.set(x+.5,y+.2,z+.5);c.castShadow=true;g.add(c);
      const lid=new THREE.Group();lid.position.set(x+.5,y+.4,z+.28);const l=new THREE.Mesh(BOX,lam(T.p[1],{color:0x5a3a22}));l.scale.set(.74,.1,.5);l.position.set(0,.05,.22);lid.add(l);
      const lock=new THREE.Mesh(BOX,lam(T.stone,{color:0xd0a94a}));lock.scale.set(.12,.12,.03);lock.position.set(0,0,.48);lid.add(lock);g.add(lid);g.userData.lid=lid;},'Сундук разбойников');
    it.lid=it.g.userData.lid;it.use=()=>chestUse(it);}}
function objsLoad(d){for(const k of Object.keys(d||{})){OBJS[k]=1;const it=interact.find(i=>i.key===k);if(!it)continue;if(k.startsWith('barrel'))objGone(it);if(k.startsWith('chest')){it.open=true;it.lid.rotation.x=-1.2;}}}
