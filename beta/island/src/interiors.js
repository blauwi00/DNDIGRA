// ---------- house interiors ----------
// Rooms are drawn as plain meshes per room; only the room the hero is in is shown.
const interact=[]; // tappable things: {mesh,x,z,use()}
const floorMat=lam(T.p[3],{color:0xd8c0a0}),innerWall=lam(T.p[0],{color:0x9a8670}),beamMat=lam(T.bark),plaster=lam(T.wall,{color:0xb8aa98});
const rugMat=new THREE.MeshLambertMaterial({color:0x6a2a24}),clothMat=new THREE.MeshLambertMaterial({color:0x4a5a7a});
// whatever is built while INFO is set can be tapped and looked at
let INFO=null;const I=(n,t,loot)=>{INFO=n?{n,t,loot}:null;};
function part(g,mat,x,y,z,w,h,d){const m=new THREE.Mesh(BOX,mat);m.scale.set(w,h,d);m.position.set(x,y,z);m.castShadow=m.receiveShadow=true;g.add(m);
  if(INFO){if(!INFO.meshes){INFO.meshes=[];looks.push(INFO);}INFO.meshes.push(m);m.userData.look=INFO;}return m;}
const looks=[]; // {n,t,loot,meshes}
// a real item lying in the world, built from the same boxes as the one held in a hand
function itemProp(parent,x,y,z,id,n,name,text,lie){const grp=new THREE.Group();
  grp.add(heldGroup(id));
  grp.scale.setScalar(1.3);grp.position.set(x,y,z);if(lie!=null)grp.rotation.set(0,lie,Math.PI/2);parent.add(grp);
  const L={n:name,t:text,loot:[[id,n]],meshes:[],item:true,grp};grp.traverse(m=>{if(m.isMesh){L.meshes.push(m);m.userData.look=L;}});looks.push(L);return L;}
const LOOK={tavern:[T.p[3],0xd8c0a0,T.p[0],0x9a8670],forge:[T.stone,0x9a948c,T.wall,0x8a8078],home:[T.p[1],0xa8b0b8,T.p[0],0x8a94a0],hall:[T.cobble,0xc8b8a0,T.wall,0xb8a890],barn:[T.dirt,0xc8b090,T.p[1],0x7a6450],herb:[T.p[2],0xb8c8a0,T.p[0],0x8a9a70]};
function buildRoom(R){const g=new THREE.Group();g.visible=false;scene.add(g);R.group=g;const y=.3;const lk=LOOK[R.type],floorMat=lam(lk[0],{color:lk[1]}),innerWall=lam(lk[2],{color:lk[3]});
  const fl=part(g,floorMat,R.ox+R.iw/2,y/2,R.oz+R.id/2,R.iw-2,y,R.id-2);fl.userData.floor=true;pickable.push(fl);
  const ex=part(g,lam(T.stone),R.exit[0]+.5,y/2,R.exit[1]+.5,1,y,1);ex.userData.floor=true;pickable.push(ex);
  const dr=makeDoor();dr.g.position.set(R.exit[0]+.5,y,R.exit[1]+.55);dr.g.rotation.y=Math.PI;g.add(dr.g);R.inDoor=dr;
  const dm=[];dr.g.traverse(m=>m.isMesh&&dm.push(m));interact.push({mesh:dm[0],extra:dm.slice(1),x:R.exit[0],z:R.exit[1],stand:true,name:'Дверь',use(){leaveRoom();}});
  // back wall tall, side walls taper toward the camera, front wall is a low sill so the room stays readable
  part(g,innerWall,R.ox+R.iw/2,y+.9,R.oz+.5,R.iw,1.8,1);part(g,plaster,R.ox+R.iw/2,y+1.6,R.oz+1.02,R.iw-2,.08,.04);
  for(const x of [R.ox+.5,R.ox+R.iw-.5]){part(g,innerWall,x,y+.7,R.oz+R.id/2-.5,1,1.4,R.id-1);part(g,beamMat,x,y+.9,R.oz+1.5,1.04,1.8,.14);}
  for(let x=R.ox;x<R.ox+R.iw;x++)if(x!==R.exit[0])part(g,innerWall,x+.5,y+.15,R.oz+R.id-.5,1,.3,1);
  for(const x of [R.ox+1.5,R.ox+R.iw-1.5])part(g,beamMat,x,y+.9,R.oz+1.05,.14,1.8,.1);
  // a window on the back wall with moonlight
  I('Окно','За мутным стеклом шумит море. Вдалеке мигает огонёк — может, корабль, а может, нет.');part(g,new THREE.MeshBasicMaterial({color:0x5a7aa8}),R.ox+R.iw/2+1.6,y+1.05,R.oz+1.01,.5,.4,.02);I(null);
  const S=(dx,dz,w,h,d,mat,solid=true)=>{const m=part(g,mat,R.ox+dx+.5,y+h/2,R.oz+dz+.5,w,h,d);if(solid)blockCell(R.ox+dx,R.oz+dz);return m;};
  const chest=(dx,dz,items,label)=>{I(null);const c=S(dx,dz,.7,.4,.45,lam(T.crate,{color:0xa07850}));const hinge=new THREE.Group();hinge.position.set(c.position.x,y+.4,c.position.z-.25);g.add(hinge);const lid=part(hinge,lam(T.p[1]),0,.05,.25,.74,.1,.5);part(hinge,ironMat,0,.06,.47,.76,.04,.06);
    part(g,new THREE.MeshLambertMaterial({color:0xd0a94a}),c.position.x,y+.32,c.position.z+.23,.1,.1,.02);
    interact.push({mesh:c,extra:[lid],x:R.ox+dx,z:R.oz+dz,name:label||'Сундук',chest:true,items:items.map(([id,n])=>({id,n})),
      open(){this.opened=true;const f=hinge.rotation.x;tween(420,k=>hinge.rotation.x=f+(-1.25-f)*k);},close(){const f=hinge.rotation.x;tween(320,k=>hinge.rotation.x=f*(1-k)).then(()=>sfx('lidclose'));},
      use(){this.open();sfx('chest');heroPose('open',900);window.handsGesture&&window.handsGesture('chest');setTimeout(()=>window.handsOpenChest&&window.handsOpenChest(this),350);}});};
  const table=(dx,dz,w=1)=>{I('Стол','Потёртый дубовый стол. В щелях застряли крошки.');S(dx,dz,.9*w,.06,.8,lam(T.p[2])).position.y=y+.48;for(const sx of [-1,1])part(g,beamMat,R.ox+dx+.5+sx*.35*w,y+.24,R.oz+dz+.5,.08,.46,.6);if(w>1)blockCell(R.ox+dx+1,R.oz+dz);I(null);};
  const candle=(dx,dz)=>{I('Свеча','Воск стекает на стол, пламя дрожит от сквозняка.');part(g,new THREE.MeshLambertMaterial({color:0xe8dcc0}),R.ox+dx+.5,y+.57,R.oz+dz+.5,.06,.1,.06);part(g,new THREE.MeshBasicMaterial({color:0xffc86a}),R.ox+dx+.5,y+.65,R.oz+dz+.5,.04,.06,.04);I(null);};
  const stool=(dx,dz)=>{I('Табурет','Шатается, но держит.');S(dx,dz,.3,.28,.3,lam(T.p[1]),false);I(null);};
  const barrel=(dx,dz,loot)=>{I('Бочка','Пахнет элем и сыростью.',loot);S(dx,dz,.5,.62,.5,lam(T.p[1],{color:0x8a6a4a}));part(g,lam(T.wall,{color:0x666a70}),R.ox+dx+.5,y+.45,R.oz+dz+.5,.54,.05,.54);I(null);};
  const bed=(dx,dz)=>{I('Кровать','Жёсткий тюфяк, набитый сеном. Под подушкой ничего.');S(dx,dz,.8,.3,.95,lam(T.p[2]));blockCell(R.ox+dx,R.oz+dz+1);part(g,lam(T.p[2]),R.ox+dx+.5,y+.15,R.oz+dz+1.3,.8,.3,.7);
    part(g,clothMat,R.ox+dx+.5,y+.34,R.oz+dz+1.05,.74,.08,1.2);part(g,new THREE.MeshLambertMaterial({color:0xe8e0c8}),R.ox+dx+.5,y+.38,R.oz+dz+.3,.6,.1,.3);I(null);};
  const shelf=(dx,w,txt)=>{I('Полка с книгами',txt||'Корешки выцвели. Одна книга — «Сказание о Хельге, что ушла за грань моря и не вернулась».');part(g,lam(T.p[2]),R.ox+dx+w/2,y+1.1,R.oz+1.15,w,.06,.3);for(let i=0;i<w*3;i++)part(g,new THREE.MeshLambertMaterial({color:[0x7a4a2a,0x4a6a8a,0x8a3a2a,0xc0a060][i%4]}),R.ox+dx+.2+i*.3,y+1.23,R.oz+1.15,.12,.2,.12);I(null);};
  const rug=(dx,dz,w,d)=>{I(null);part(g,rugMat,R.ox+dx+w/2,y+.01,R.oz+dz+d/2,w,.02,d);}; // floor decor: taps go through to walking
  const M=c=>new THREE.MeshLambertMaterial({color:c}),glow=c=>new THREE.MeshBasicMaterial({color:c});
  const hearth=(dx)=>{I('Очаг','Тёплый огонь. В доме можно перевести дух: умения восстанавливаются, когда вы входите.');S(dx,1,.9,.7,.5,lam(T.wall));part(g,lam(T.wall,{color:0x6a6058}),R.ox+dx+.5,y+1.2,R.oz+1.2,.6,1,.3);torch(R.ox+dx,R.oz+1,true);I(null);};
  // each house has its own trade written into the room
  if(R.type==='tavern'){hearth(5);I('Стойка','Брам натирает её до блеска. Пахнет пивом и дымом.');part(g,lam(T.p[2]),R.ox+2.5,y+.5,R.oz+2.5,3,.1,.5);I(null);for(let x=1;x<4;x++)blockCell(R.ox+x,R.oz+2);S(1,2,.9,.9,.5,lam(T.p[1]));
    barrel(1,1,[['bread',1]]);barrel(2,1);table(4,4);itemProp(g,R.ox+4.45,y+.52,R.oz+4.5,'bread',1,'Хлеб','Свежая краюха, ещё тёплая.');stool(4,5);stool(5,4);table(6,3);stool(6,4);candle(4,4);candle(6,3);shelf(1,3);chest(6,5,[['bread',2],['torch',1]],'Ящик с припасами');
    I('Кружки','Четыре глиняные кружки, одна с отбитой ручкой.');for(let i=0;i<4;i++)part(g,M(0x8a6a4a),R.ox+1.3+i*.45,y+.62,R.oz+2.45,.12,.16,.12);I(null);
    for(const x of [2,6])part(g,glow(0xffc86a),R.ox+x+.5,y+1.5,R.oz+1.05,.1,.14,.06);}
  if(R.type==='forge'){hearth(2);part(g,glow(0xff6a20),R.ox+2.5,y+.75,R.oz+1.5,.6,.06,.2);
    I('Наковальня','Холодная и тяжёлая. На ней следы сотен ударов.');const anv=S(4,3,.5,.36,.3,M(0x5a5e66));part(g,M(0x3a3e46),anv.position.x,y+.42,anv.position.z,.78,.14,.3);part(g,M(0x6a4a2a),R.ox+4.5,y+.1,R.oz+3.5,.6,.2,.5);I(null);
    I('Корыто','Вода для закалки. На дне блестит что-то… просто окалина.');S(1,4,.7,.42,.9,M(0x4a3a2a));part(g,glow(0x3a5a7a),R.ox+1.5,y+.43,R.oz+4.5,.6,.02,.8); // quench trough
    I('Уголь','Чёрная куча, пачкает пальцы.');S(6,1,.8,.3,.6,M(0x1a1a1c));I(null);
    I('Стойка с мечами','Горан не продаёт их: «Сначала докажи, что достоин».');['sword_long','sword_scimitar','sword_rapier','morningstar','halberd'].forEach((w,i)=>{const it=heldGroup(w);it.scale.setScalar(1.25);it.position.set(R.ox+5.15+i*.36,y+.4,R.oz+1.08);g.add(it);});part(g,lam(T.p[2]),R.ox+6,y+.32,R.oz+1.1,1.9,.06,.14);
    part(g,lam(T.p[2]),R.ox+6.1,y+1.45,R.oz+1.1,1.8,.06,.12);I(null);chest(7,4,[['sword_short',1],['axe_hand',1],['potion',1]],'Сундук кузнеца');}
  if(R.type==='home'){hearth(5);bed(1,2);table(3,4);stool(2,4);candle(3,4);barrel(6,4);chest(6,3,[['bread',1],['stone',2],['trident',1]],'Сундук рыбака');
    I('Сеть','Старая сеть, вся в узлах и чешуе.');
    for(let i=0;i<6;i++)part(g,M(0x3a3a30),R.ox+1.2+i*.3,y+1.1,R.oz+1.08,.03,.9,.02);for(let j=0;j<4;j++)part(g,M(0x3a3a30),R.ox+1.95,y+.75+j*.22,R.oz+1.08,1.6,.03,.02); // net
    I('Вяленая рыба','Солёная и жёсткая. Вы отламываете кусок в дорогу.',[['bread',1]]);    for(let i=0;i<3;i++){part(g,M(0x9ab0b8),R.ox+3.1+i*.3,y+1.15,R.oz+1.12,.08,.26,.05);}part(g,lam(T.bark),R.ox+3.4,y+1.32,R.oz+1.12,.9,.04,.04); // drying fish
    I('Вёсла','Одно треснуло. Олав всё собирается починить.');    for(const k of [0,1]){const o=part(g,lam(T.p[1]),R.ox+6.7,y+.7,R.oz+5.6+k*.18,.08,1.3,.06);o.rotation.z=.25;}I(null);}
  if(R.type==='hall'){hearth(6);rug(2,2,5,3);I('Длинный стол','Здесь староста собирает совет. На столе карта острова с крестиком у руин.');for(let x=3;x<6;x++){S(x,3,1,.08,.9,lam(T.p[2])).position.y=y+.5;part(g,lam(T.bark),R.ox+x+.5,y+.24,R.oz+3.5,.1,.46,.6);stool(x,2);}
    for(let x=3;x<6;x++){const st=part(g,lam(T.p[1]),R.ox+x+.5,y+.14,R.oz+4.5,.3,.28,.3);}I(null);candle(3,3);candle(5,3);
    I('Кресло старосты','Высокая спинка, резные рыбы на подлокотниках.');S(2,3,.5,.32,.5,lam(T.p[1]));part(g,lam(T.p[1]),R.ox+2.3,y+.75,R.oz+3.5,.08,.8,.5); // the elder's chair
    I('Знамя острова','Золотая рыба на алом поле — герб Хельги.');    part(g,M(0x8a2a24),R.ox+4.5,y+1.15,R.oz+1.07,.9,1.1,.03);part(g,M(0xd0a94a),R.ox+4.5,y+1.2,R.oz+1.09,.3,.3,.02);part(g,lam(T.bark),R.ox+4.5,y+1.72,R.oz+1.1,1.1,.05,.05); // banner
    I('Книжный шкаф','Летопись острова: «В год, когда погас огонь часовни, мёртвые поднялись из земли…»');S(1,1,.9,1.5,.4,lam(T.p[2]));for(let j=0;j<3;j++)for(let i=0;i<5;i++)part(g,M([0x7a4a2a,0x4a5a8a,0x8a3a2a,0x5a6a3a][(i+j)%4]),R.ox+1.15+i*.17,y+.35+j*.45,R.oz+1.3,.12,.3,.2);
    I(null);chest(7,4,[['potion',1],['bread',2],['shield_kite',1]],'Сундук старосты');itemProp(g,R.ox+4.5,y+.55,R.oz+3.5,'potion',1,'Зелье лечения','Стоит на карте острова, как пресс-папье.');}
  if(R.type==='barn'){torch(R.ox+5,R.oz+5);I('Сено','Мягкое и колючее. Пахнет летом.');for(const [dx,dz,h] of [[1,1,.8],[2,1,.6],[1,2,.5]]){S(dx,dz,.95,h,.95,M(0xc8a858));part(g,M(0xd8b868),R.ox+dx+.5,y+h+.04,R.oz+dz+.5,.7,.08,.7);}
    I('Телега','Одно колесо скрипит.');S(4,3,1,.3,.8,lam(T.p[1]));for(const sx of [-1,1])part(g,M(0x4a3020),R.ox+4.5+sx*.52,y+.25,R.oz+3.5,.06,.5,.5); // cart
    I('Вилы','Острые. Не оружие, но в крайнем случае…');const f=part(g,lam(T.bark),R.ox+5.7,y+.75,R.oz+1.3,.05,1.4,.05);f.rotation.z=.2;I('Мешки','Мука с мельницы Тодора.');
    for(let i=0;i<3;i++)S(5-i%2,2+(i>1?0:0),.4,.45,.4,M(0xb8a070),false).position.set(R.ox+4.6+i*.35,y+.22,R.oz+1.6);blockCell(R.ox+4,R.oz+1);blockCell(R.ox+5,R.oz+1);
    I(null);chest(1,4,[['bread',3],['stone',2],['quarterstaff',1]],'Ларь с зерном');itemProp(g,R.ox+4.5,y+.4,R.oz+3.5,'bread',1,'Хлеб','Кто-то забыл обед на телеге.');}
  if(R.type==='herb'){hearth(4);bed(1,3);table(4,3);candle(4,3);chest(5,2,[['potion',2]],'Шкатулка травницы');
    I('Котёл','Зелье булькает зелёным. Лучше не трогать.');
    S(2,2,.6,.4,.6,M(0x1e1e22));part(g,glow(0x5adf7a),R.ox+2.5,y+.41,R.oz+2.5,.5,.02,.5); // cauldron
    I('Пучки трав','Мята, полынь, болотный зверобой.');    for(let i=0;i<7;i++)part(g,M([0x5a8a4a,0x7a9a3a,0x8a6a9a][i%3]),R.ox+1.3+i*.55,y+1.55,R.oz+1.1,.12,.28,.06);part(g,lam(T.bark),R.ox+3,y+1.72,R.oz+1.1,4,.04,.04);
    I('Склянки','Пустые пузырьки и банки с мутными настоями.');    part(g,lam(T.p[2]),R.ox+2,y+1.0,R.oz+1.15,1.6,.06,.3);for(let i=0;i<5;i++)if(i!==2)part(g,M([0x6a9ac8,0x9ad07a,0xc87a6a][i%3]),R.ox+1.4+i*.3,y+1.13,R.oz+1.15,.12,.2,.12);I(null);
    itemProp(g,R.ox+2,y+1.04,R.oz+1.12,'potion',1,'Зелье лечения','Красная склянка с печатью травницы.');itemProp(g,R.ox+4.6,y+.52,R.oz+3.4,'potion',1,'Зелье лечения','Ещё тёплое, пахнет мятой.');}}
ROOMS.forEach(buildRoom);
// doors are tappable from outside; the exit tile inside leads back out
let room=null;const roomLight=new THREE.PointLight(0xffc890,1.7,12,1.1);roomLight.visible=false;scene.add(roomLight);const fadeEl=document.getElementById('fade');
async function teleport(x,z,face){closeWheel();fadeEl.classList.add('on');await wait(260);H0.x=x;H0.z=z;H0.px=x+.5;H0.pz=z+.5;H0.face=face;H0.route=null;focus.set(H0.px,.15,H0.pz);await wait(60);fadeEl.classList.remove('on');}
// doors swing: the outer one opens with a creak, then the inner one shuts behind you
const outDoor=R=>houseMeshes[R.i].userData.door;
async function enterRoom(R){if(busy||CB.on)return;busy=true;rest();H0.face=Math.PI;sfx('door');heroPose('open',600);await swing(outDoor(R),true);await wait(150);
  await teleport(R.exit[0],R.exit[1]-1,Math.PI);setRoom(R);R.inDoor.pivot.rotation.y=1.45;swing(R.inDoor,false,380).then(()=>sfx('doorclose'));swing(outDoor(R),false,10);busy=false;}
async function leaveRoom(){if(!room||busy)return;const R=room;busy=true;H0.face=0;sfx('door');heroPose('open',600);await swing(R.inDoor,true);await wait(150);
  await teleport(R.door[0],R.door[1],0);setRoom(null);outDoor(R).pivot.rotation.y=1.45;swing(outDoor(R),false,380).then(()=>sfx('doorclose'));swing(R.inDoor,false,10);busy=false;}
function setRoom(R){if(room)room.group.visible=false;room=R;if(R)R.group.visible=true;sea.visible=!R;if(R){scene.fog.color.setHex(0x07090b);scene.background.setHex(0x07090b);scene.fog.density=.05;}
  hemi.intensity=R?.6:.75;moon.intensity=R?.12:.6;roomLight.visible=!!R;if(R)roomLight.position.set(R.ox+R.iw/2,2.6,R.oz+R.id/2);flies.forEach(f=>f.visible=!R);
  if(R){zoneEl.textContent=R.name;zoneEl.classList.remove('show');void zoneEl.offsetWidth;zoneEl.classList.add('show');zoneNow=R.name;}}
