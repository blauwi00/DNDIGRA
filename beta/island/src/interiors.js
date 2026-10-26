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
const LOOK={attic:[T.p[1],0x9a8466,T.p[2],0x6a5440],cellar:[T.stone,0x7a7470,T.wall,0x6a6460],house:[T.p[1],0xc0a888,T.p[0],0x9a8670],poorhouse:[T.dirt,0xa89070,T.p[1],0x7a6a58],castle:[T.stone,0xd8d0c4,T.wall,0xb8b0a0],tavern:[T.p[3],0xd8c0a0,T.p[0],0x9a8670],forge:[T.stone,0x9a948c,T.wall,0x8a8078],home:[T.p[1],0xa8b0b8,T.p[0],0x8a94a0],hall:[T.cobble,0xc8b8a0,T.wall,0xb8a890],barn:[T.dirt,0xc8b090,T.p[1],0x7a6450],herb:[T.p[2],0xb8c8a0,T.p[0],0x8a9a70],
  upper:[T.p[1],0xb8a080,T.p[0],0x9a8670],gbarn:[T.dirt,0xc8b090,T.p[1],0x7a6450],temple:[T.stone,0xd8d0c4,T.wall,0xc0b8a8],inn:[T.p[3],0xd8c0a0,T.p[0],0x9a8670],mill:[T.p[1],0xd8d0b8,T.p[0],0x9a8670],
  tannery:[T.dirt,0x9a8060,T.p[1],0x7a6450],warehouse:[T.p[1],0xb8a080,T.p[1],0x7a6450],barracks:[T.stone,0xa8a098,T.wall,0x9a948c],armory:[T.stone,0x9a948c,T.wall,0x8a8078],treasury:[T.cobble,0xb8a890,T.wall,0x9a948c],chambers:[T.p[3],0xc8a888,T.wall,0xc8b8a0]};
function buildRoom(R){const g=new THREE.Group();g.visible=false;scene.add(g);R.group=g;const y=R.inPlace?R.y:.3;const lk=LOOK[R.type],floorMat=lam(lk[0],{color:lk[1]}),innerWall=lam(lk[2],{color:lk[3]});
  // a room in its own house: the house gives walls, door and windows, the room only a plank floor
  if(R.inPlace){const fl=part(g,floorMat,R.ox+R.iw/2,y+.02,R.oz+R.id/2,R.iw,.06,R.id);fl.userData.floor=true;pickable.push(fl);}
  else{
  const fl=part(g,floorMat,R.ox+R.iw/2,y/2,R.oz+R.id/2,R.iw-2,y,R.id-2);fl.userData.floor=true;pickable.push(fl);
  const ex=part(g,lam(T.stone),R.exit[0]+.5,y/2,R.exit[1]+.5,1,y,1);ex.userData.floor=true;pickable.push(ex);
  if(R.sub)subWay(g,R,y,R.exit[0],R.exit[1],true);else{const dr=makeDoor();dr.g.position.set(R.exit[0]+.5,y,R.exit[1]+.55);dr.g.rotation.y=Math.PI;g.add(dr.g);R.inDoor=dr;
  const dm=[];dr.g.traverse(m=>m.isMesh&&dm.push(m));interact.push({mesh:dm[0],extra:dm.slice(1),x:R.exit[0],z:R.exit[1],stand:true,name:'Дверь',use(){leaveRoom();}});}
  // back wall tall, side walls taper toward the camera, front wall is a low sill so the room stays readable
  part(g,innerWall,R.ox+R.iw/2,y+.9,R.oz+.5,R.iw,1.8,1);part(g,plaster,R.ox+R.iw/2,y+1.6,R.oz+1.02,R.iw-2,.08,.04);
  for(const x of [R.ox+.5,R.ox+R.iw-.5]){part(g,innerWall,x,y+.7,R.oz+R.id/2-.5,1,1.4,R.id-1);part(g,beamMat,x,y+.9,R.oz+1.5,1.04,1.8,.14);}
  for(let x=R.ox;x<R.ox+R.iw;x++)if(x!==R.exit[0])part(g,innerWall,x+.5,y+.15,R.oz+R.id-.5,1,.3,1);
  for(const x of [R.ox+1.5,R.ox+R.iw-1.5])part(g,beamMat,x,y+.9,R.oz+1.05,.14,1.8,.1);
  // a window on the back wall with moonlight
  if(R.type!=='cellar'){I('Окно','За мутным стеклом шумит море. Вдалеке мигает огонёк — может, корабль, а может, нет.');part(g,new THREE.MeshBasicMaterial({color:0x5a7aa8}),R.ox+R.iw/2+1.6,y+1.05,R.oz+1.01,.5,.4,.02);I(null);}
  }
  const S=(dx,dz,w,h,d,mat,solid=true)=>{const m=part(g,mat,R.ox+dx+.5,y+h/2,R.oz+dz+.5,w,h,d);if(solid)blockCell(R.ox+dx,R.oz+dz);return m;};
  const chest=(dx,dz,items,label)=>{I(null);const c=S(dx,dz,.7,.4,.45,lam(T.crate,{color:0xa07850}));const hinge=new THREE.Group();hinge.position.set(c.position.x,y+.4,c.position.z-.25);g.add(hinge);const lid=part(hinge,lam(T.p[1]),0,.05,.25,.74,.1,.5);part(hinge,ironMat,0,.06,.47,.76,.04,.06);
    part(g,new THREE.MeshLambertMaterial({color:0xd0a94a}),c.position.x,y+.32,c.position.z+.23,.1,.1,.02);
    interact.push({mesh:c,extra:[lid],x:R.ox+dx,z:R.oz+dz,name:label||'Сундук',chest:true,key:R.gen?R.i+':'+dx+':'+dz:null,items:items.map(([id,n])=>({id,n})),
      open(){this.opened=true;const f=hinge.rotation.x;tween(420,k=>hinge.rotation.x=f+(-1.25-f)*k);},close(){const f=hinge.rotation.x;tween(320,k=>hinge.rotation.x=f*(1-k)).then(()=>sfx('lidclose'));},
      use(){this.open();sfx('chest');heroPose('open',900);window.handsGesture&&window.handsGesture('chest');setTimeout(()=>window.handsOpenChest&&window.handsOpenChest(this),350);}});};
  const table=(dx,dz,w=1)=>{I('Стол','Потёртый дубовый стол. В щелях застряли крошки.');S(dx,dz,.9*w,.06,.8,lam(T.p[2])).position.y=y+.48;for(const sx of [-1,1])part(g,beamMat,R.ox+dx+.5+sx*.35*w,y+.24,R.oz+dz+.5,.08,.46,.6);if(w>1)blockCell(R.ox+dx+1,R.oz+dz);I(null);};
  const candle=(dx,dz)=>{I('Свеча','Воск стекает на стол, пламя дрожит от сквозняка.');part(g,new THREE.MeshLambertMaterial({color:0xe8dcc0}),R.ox+dx+.5,y+.57,R.oz+dz+.5,.06,.1,.06);part(g,new THREE.MeshBasicMaterial({color:0xffc86a}),R.ox+dx+.5,y+.65,R.oz+dz+.5,.04,.06,.04);I(null);};
  // the way to the door stays clear: nothing stands on the two cells in front of it
  const lane=(x,z)=>R.side==='E'?z===R.exit[1]&&x>=R.exit[0]-2&&x<=R.exit[0]:R.side==='W'?z===R.exit[1]&&x<=R.exit[0]+2&&x>=R.exit[0]:x===R.exit[0]&&z>=R.exit[1]-2;R.lane=lane;
  const doorway=(dx,dz)=>lane(R.ox+dx,R.oz+dz);
  const stool=(dx,dz)=>{if(doorway(dx,dz)){if(R.side==='E'||R.side==='W')dz+=dz>1?-1:1;else dx+=R.ox+dx-1>R.ox?-1:1;}I('Табурет','Шатается, но держит.');S(dx,dz,.3,.28,.3,lam(T.p[1]),false);I(null);};
  const barrel=(dx,dz,loot)=>{I('Бочка','Пахнет элем и сыростью.',loot);S(dx,dz,.5,.62,.5,lam(T.p[1],{color:0x8a6a4a}));part(g,lam(T.wall,{color:0x666a70}),R.ox+dx+.5,y+.45,R.oz+dz+.5,.54,.05,.54);I(null);};
  const bed=(dx,dz)=>{I('Кровать','Жёсткий тюфяк, набитый сеном. Под подушкой ничего.');S(dx,dz,.8,.3,.95,lam(T.p[2]));blockCell(R.ox+dx,R.oz+dz+1);part(g,lam(T.p[2]),R.ox+dx+.5,y+.15,R.oz+dz+1.3,.8,.3,.7);
    part(g,clothMat,R.ox+dx+.5,y+.34,R.oz+dz+1.05,.74,.08,1.2);part(g,new THREE.MeshLambertMaterial({color:0xe8e0c8}),R.ox+dx+.5,y+.38,R.oz+dz+.3,.6,.1,.3);I(null);};
  const shelf=(dx,w,txt)=>{I('Полка с книгами',txt||'Корешки выцвели. Одна книга — «Сказание о Хельге, что ушла за грань моря и не вернулась».');part(g,lam(T.p[2]),R.ox+dx+w/2,y+1.1,R.oz+1.15,w,.06,.3);for(let i=0;i<w*3;i++)part(g,new THREE.MeshLambertMaterial({color:[0x7a4a2a,0x4a6a8a,0x8a3a2a,0xc0a060][i%4]}),R.ox+dx+.2+i*.3,y+1.23,R.oz+1.15,.12,.2,.12);I(null);};
  const rug=(dx,dz,w,d)=>{I(null);part(g,rugMat,R.ox+dx+w/2,y+.01,R.oz+dz+d/2,w,.02,d).userData.floor=true;}; // floor decor: taps go through to walking
  const M=c=>new THREE.MeshLambertMaterial({color:c}),glow=c=>new THREE.MeshBasicMaterial({color:c});
  const hearth=(dx)=>{I('Очаг','Тёплый огонь. В доме можно перевести дух: умения восстанавливаются, когда вы входите.');S(dx,1,.9,.7,.5,lam(T.wall));part(g,lam(T.wall,{color:0x6a6058}),R.ox+dx+.5,y+1.2,R.oz+1.2,.6,1,.3);torch(R.ox+dx,R.oz+1,true);I(null);};
  // each house has its own trade written into the room
  // the tavern: a bar along the back left with kegs and a bottle shelf behind it, Bram's corner, a fireplace,
  // three tables with stools for patrons and stools at the bar; the lane to the door stays clear
  if(R.type==='tavern'){R.seats=[];const seat=(dx,dz)=>{stool(dx,dz);R.seats.push([R.ox+dx,R.oz+dz]);};
    hearth(9);barrel(1,1,[['bread',1]]);barrel(2,1);
    I('Бочонки с элем','Три бочонка с кранами. Из одного капает прямо на пол.');for(const dx of [3,4,5]){S(dx,1,.55,.55,.5,lam(T.p[1],{color:0x7a5a3a}));part(g,lam(T.wall,{color:0x666a70}),R.ox+dx+.5,y+.4,R.oz+1.5,.6,.05,.55);part(g,M(0xc8a040),R.ox+dx+.5,y+.32,R.oz+1.78,.06,.06,.08);}I(null);
    I('Полка с бутылками','Настойки, вино с юга и что-то мутное без этикетки.');part(g,lam(T.p[2]),R.ox+4,y+1.25,R.oz+1.1,3.2,.06,.3);
      for(let k=0;k<9;k++)part(g,M([0x3a6a3a,0x6a2a24,0x8a7a4a,0x2a4a6a][k%4]),R.ox+2.55+k*.36,y+1.4,R.oz+1.1,.1,.24,.1);I(null);
    I('Стойка','Брам натирает её до блеска. Пахнет пивом и дымом.');for(let dx=1;dx<=5;dx++){S(dx,3,1,.9,.6,lam(T.p[1]));part(g,lam(T.p[2]),R.ox+dx+.5,y+.95,R.oz+3.5,1.02,.08,.7);}I(null);
    I('Кружки','Глиняные кружки, одна с отбитой ручкой.');for(let k=0;k<5;k++)part(g,M(0x8a6a4a),R.ox+1.4+k*.9,y+1.07,R.oz+3.45,.12,.16,.12);I(null);
    for(const dx of [2,4])seat(dx,4);
    table(8,4);seat(7,4);seat(9,4);seat(8,5);candle(8,4);
    table(3,7);seat(2,7);seat(4,7);candle(3,7);itemProp(g,R.ox+3.45,y+.52,R.oz+7.5,'bread',1,'Хлеб','Свежая краюха, ещё тёплая.');
    table(9,7);seat(8,7);seat(10,7);
    rug(5,5,3,2);chest(11,2,[['bread',2],['torch',1]],'Ящик с припасами');
    for(const x of [2,6,10])part(g,glow(0xffc86a),R.ox+x+.5,y+1.5,R.oz+1.05,.1,.14,.06);}
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
    for(let x=3;x<6;x++)if(!doorway(x,4))part(g,lam(T.p[1]),R.ox+x+.5,y+.14,R.oz+4.5,.3,.28,.3);I(null);candle(3,3);candle(5,3);
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
    itemProp(g,R.ox+2,y+1.04,R.oz+1.12,'potion',1,'Зелье лечения','Красная склянка с печатью травницы.');itemProp(g,R.ox+4.6,y+.52,R.oz+3.4,'potion',1,'Зелье лечения','Ещё тёплое, пахнет мятой.');}
  // houses of the big island: furnished by their size and the wealth of their place; the loot is fixed by the room's number
  const lk0=looks.length;let rs=(R.i*2654435761>>>0)%2147483646+1;const rnd=()=>(rs=(rs*16807)%2147483647)/2147483647,pick=a=>a[Math.floor(rnd()*a.length)];
  // a shop: a counter across the left of the room with the keeper behind it, and the trade's own things
  if(R.shop){const w=R.iw,d=R.id;I('Прилавок','Тёртые доски, на них весы и мелочь.');for(let x=1;x<=2;x++)S(x,2,1,.7,.8,lam(T.p[1],{color:0x7a5a3a}));part(g,M(0xb8a060),R.ox+2,y+.74,R.oz+2.5,.3,.06,.2);I(null);
    if(R.shop==='smith'){I('Наковальня','Тяжёлая, в зарубках.');S(w-2,2,.5,.45,.35,M(0x3a3e44));part(g,M(0x4a4e56),R.ox+w-1.5,y+.5,R.oz+2.5,.7,.1,.3);
      I('Горн','Угли тлеют, мехи рядом.');S(w-2,1,.8,.6,.7,lam(T.stone,{color:0x6a6058}));part(g,glow(0xff7a2a),R.ox+w-1.5,y+.62,R.oz+1.5,.4,.06,.4);
      I('Стойка с оружием','Мечи и топоры, на продажу.');S(1,1,.9,1.2,.3,lam(T.bark));for(let i=0;i<3;i++)part(g,M(0xb8bcc4),R.ox+1.2+i*.3,y+.9,R.oz+1.4,.06,.9,.04);I(null);}
    if(R.shop==='baker'){I('Печь','Большая, глиняная. Пахнет так, что живот сводит.');S(w-2,1,1,1,.9,lam(T.wall,{color:0xa8886a}));part(g,glow(0xff9a3a),R.ox+w-1.5,y+.4,R.oz+1.96,.5,.3,.02);
      I('Полка с хлебом','Караваи и калачи, ещё тёплые.');S(1,1,1.6,1.1,.4,lam(T.p[2]));for(let i=0;i<4;i++)part(g,M(0xc89048),R.ox+1.2+i*.35,y+.86,R.oz+1.5,.26,.14,.2);
      I('Мешки с мукой','Тодорова мука, с мельницы.');S(w-2,d-2,.6,.5,.5,M(0xe0d8c0));I(null);}
    if(R.shop==='store'){I('Ящики с товаром','Факелы, верёвки, гвозди, свечи.');S(1,1,.8,.6,.6,lam(T.crate));S(w-2,1,.8,.6,.6,lam(T.crate));S(w-2,d-2,.7,.5,.6,lam(T.crate));
      I('Бочка','Солёная рыба.');S(1,d-2,.5,.62,.5,lam(T.p[1],{color:0x8a6a4a}));I(null);}
    I('Свеча','Огарок в глиняной плошке.');part(g,M(0xe8dcc0),R.ox+1.5,y+.75,R.oz+2.5,.06,.1,.06);part(g,new THREE.MeshBasicMaterial({color:0xffc86a}),R.ox+1.5,y+.83,R.oz+2.5,.04,.06,.04);I(null);}
  else if(R.type==='house'||R.type==='poorhouse'){const w=R.iw,d=R.id,rich=R.wealth>=3||R.place&&R.place.type==='capital',poor=R.type==='poorhouse';
    const common=['dagger','axe_hand','mace','spear','quarterstaff','shield_round','bow_short','sword'],fine=['sword_long','sword_rapier','dagger_curved','bow_long','trident','shield_kite','sword_scimitar'];
    const box=[];if(poor){if(rnd()<.6)box.push([pick(['bread','herb','stone','torch']),1]);if(rnd()<.25)box.push(['bread',1]);if(rnd()<.08)box.push([pick(common),1]);}
    else{box.push([pick(['bread','torch','herb']),1+Math.floor(rnd()*2)]);if(rnd()<.35)box.push(['potion',1]);if(rnd()<(rich?.35:.2))box.push([pick(common),1]);if(rich&&rnd()<.3)box.push([pick(fine),1]);}
    if(box.length)chest(w-2,poor?2:3,box,poor?'Старый ящик':rich?'Окованный сундук':'Сундук');
    if(!poor&&rnd()<.4)itemProp(g,R.ox+2.5,y+.55,R.oz+d-1.5,'bread',1,'Хлеб','Краюха на столе, ещё мягкая.');
    if(poor){I('Подстилка','Охапка соломы и латаное одеяло.');part(g,M(0xb8a060),R.ox+1.5,y+.06,R.oz+2,.9,.1,1.6);I('Очаг','Сложен из камней прямо на полу. Дымит.');S(w-2,1,.7,.25,.7,lam(T.wall,{color:0x6a6058}));part(g,glow(0xff8a3a),R.ox+w-1.5,y+.3,R.oz+1.5,.3,.1,.3);
      I('Ящик','Пара сушёных рыбин и пустой горшок.');S(w-2,d-2,.5,.4,.45,lam(T.crate));I(null);stool(2,d-2);}
    else{hearth(w-2);bed(1,1);table(2,d-2);stool(1,d-2);candle(2,d-2);barrel(w-2,d-2);
      shelf(2,Math.min(3,w-4),rich?'Книги в кожаных переплётах и подсвечник.':'Горшки, миски и моток бечёвки.');
      if(rich){rug(2,2,w-4,d-4);I('Картина','Корабль под парусами на закате. Подписано: «Б.».');part(g,M(0x6a4a2a),R.ox+w/2,y+1.25,R.oz+1.05,1.1,.7,.04);part(g,M(0x4a7aa8),R.ox+w/2,y+1.25,R.oz+1.08,.9,.5,.02);I(null);}}}
  // the royal castle: a pillared hall with a red carpet to the throne on its dais, banners, long feasting tables,
  // fireplaces and braziers
  if(R.type==='castle'){const w=R.iw,d=R.id,cx=Math.floor(w/2);
    I('Помост','Три ступени из белого камня.');part(g,lam(T.wall,{color:0xc8c0b0}),R.ox+cx,y+.12,R.oz+2.5,8,.24,3);I(null);
    I('Трон','Высокая спинка с позолотой. Пустует — король принимает только по делу.');S(cx,2,.9,.6,.8,lam(T.p[1],{color:0x8e2a24}));part(g,lam(T.p[1],{color:0x8e2a24}),R.ox+cx+.5,y+1.15,R.oz+1.85,.9,1.4,.15);part(g,M(0xd8b04a),R.ox+cx+.5,y+1.9,R.oz+1.85,.5,.25,.1);I(null);
    I('Список стражи','Длинный свиток на стене: имена стражников за двадцать лет. Одно имя вычеркнуто так, что прорвана бумага: «капитан Рагнар».');part(g,M(0xe8dcc0),R.ox+cx-5.5,y+1.3,R.oz+1.06,.6,.8,.03);part(g,M(0x8a6a40),R.ox+cx-5.5,y+1.72,R.oz+1.08,.7,.05,.04);I(null);
    rug(cx-1,4,2,d-6);
    I('Колонна','Гладкий камень. Наверху вырезаны волны и рыбы — знак острова.');for(let z=4;z<d-2;z+=3)for(const x of[cx-4,cx+3]){S(x,z,.7,2.6,.7,lam(T.wall,{color:0xc0baae}));}I(null);
    I('Знамя королевства','Красное полотно с золотой рыбой.');for(const x of[3,cx-3,cx+3,w-4])if(x!==cx){part(g,M(0x8e2a24),R.ox+x+.5,y+1.2,R.oz+1.08,.8,1.3,.03);part(g,M(0xd8b04a),R.ox+x+.5,y+1.35,R.oz+1.1,.3,.3,.02);}I(null);
    for(const[x0,x1]of[[3,cx-6],[cx+5,w-4]])for(let x=x0;x<=x1;x++){table(x,7);stool(x,6);stool(x,8);}
    chest(1,d-5,[['potion',2],['sword_long',1],['shield_kite',1]],'Сундук оружейной');chest(w-2,d-5,[['bread',3],['torch',1],['bow_long',1]],'Сундук кладовой');
    itemProp(g,R.ox+4.5,y+.55,R.oz+7.5,'bread',1,'Хлеб','Остался от вчерашнего пира.');
    hearth(2);hearth(w-3);
    I('Жаровня','Угли горят ровно, без дыма.');for(const[x,z]of[[1,d-3],[w-2,d-3]]){S(x,z,.5,.6,.5,M(0x3a3a3e));part(g,glow(0xff9a3a),R.ox+x+.5,y+.66,R.oz+z+.5,.36,.12,.36);}I(null);}
  // layout 2 buildings: barns, the temple, the port tavern, the mill, the tannery, the warehouse and the castle's rooms.
  // Each thing is put on the nearest free cell that is not on the way in from the door.
  const spot=(dx,dz)=>{for(let r=0;r<3;r++)for(let a=-r;a<=r;a++)for(const [ox,oz] of [[a,-r],[a,r],[-r,a],[r,a]]){const x=dx+ox,z=dz+oz;if(x<1||z<1||x>R.iw-2||z>R.id-2)continue;if(doorway(x,z)||!free(R.ox+x,R.oz+z))continue;return [x,z];}return null;};
  const at_=(dx,dz,f)=>{const c=spot(dx,dz);if(c)f(c[0],c[1]);};
  if(R.spec||R.type==='upper'){const w=R.iw,d=R.id,cx=Math.floor(w/2);
    if(R.type==='gbarn'){I('Сено','Сухое, колючее, пахнет летом.');for(const [dx,dz] of [[1,1],[2,1],[1,2]])at_(dx,dz,(x,z)=>{S(x,z,.95,.7,.95,M(0xc8a858));});
      at_(w-2,1,(x,z)=>{I('Мешки','Зерно нового урожая.');for(let k=0;k<2;k++)part(g,M(0xb8a070),R.ox+x+.3+k*.35,y+.22,R.oz+z+.5,.35,.44,.35);blockCell(R.ox+x,R.oz+z);});
      I('Вилы','Не оружие, но в крайнем случае…');at_(w-2,2,(x,z)=>{const f=part(g,lam(T.bark),R.ox+x+.5,y+.7,R.oz+z+.3,.05,1.4,.05);f.rotation.z=.2;});I(null);
      at_(1,d-2,(x,z)=>chest(x,z,[['bread',1+(rnd()<.5?1:0)]],'Ларь с зерном'));}
    if(R.type==='temple'){I('Алтарь','Белый камень, на нём свечи и чаша с водой.');S(cx,1,1.4,.8,.7,lam(T.wall,{color:0xe0d8c8}));for(const sg of[-1,1])candle(cx+sg,1);I(null);
      I('Скамья','Гладкая от тех, кто тут сидел.');for(let z=3;z<d-1;z+=2)for(let x=1;x<w-1;x++)if(Math.abs(x-cx)>0&&!doorway(x,z)&&free(R.ox+x,R.oz+z))S(x,z,.9,.35,.4,lam(T.p[2]));I(null);
      at_(w-2,1,(x,z)=>chest(x,z,[['potion',1],['herb',1]],'Ящик для пожертвований'));}
    if(R.type==='inn'){I('Стойка','Тут наливают. Пахнет пивом и дымом.');for(let x=1;x<=3;x++)if(!doorway(x,2))S(x,2,1,.9,.6,lam(T.p[1]));I(null);hearth(w-2);
      table(cx,d-3);at_(cx-1,d-3,(x,z)=>stool(x,z));at_(cx+1,d-3,(x,z)=>stool(x,z));at_(1,d-2,(x,z)=>barrel(x,z,[['bread',1]]));at_(w-2,3,(x,z)=>chest(x,z,[['bread',2],['torch',1]],'Ящик трактирщика'));}
    if(R.type==='mill'){I('Жернов','Тяжёлый камень, весь в муке.');at_(cx,2,(x,z)=>{S(x,z,1,.35,1,lam(T.stone,{color:0xa8a49c}));part(g,lam(T.stone,{color:0x8a867e}),R.ox+x+.5,y+.45,R.oz+z+.5,.6,.15,.6);});
      I('Мешки с мукой','Белая пыль на всём.');at_(1,1,(x,z)=>S(x,z,.6,.5,.5,M(0xe0d8c0)));at_(w-2,1,(x,z)=>S(x,z,.6,.5,.5,M(0xe0d8c0)));I(null);at_(1,d-2,(x,z)=>chest(x,z,[['bread',2]],'Ларь мельника'));}
    if(R.type==='tannery'){I('Чан','Вонючая жижа. Кожи мокнут тут неделями.');for(const [dx,dz] of [[1,1],[3,1]])at_(dx,dz,(x,z)=>{S(x,z,.8,.6,.8,lam(T.p[1],{color:0x6a4a30}));part(g,M(0x5a4a2a),R.ox+x+.5,y+.61,R.oz+z+.5,.7,.02,.7);});
      I('Шкуры','Растянуты на рамах сушиться.');at_(w-2,1,(x,z)=>{part(g,M(0x9a6a40),R.ox+x+.5,y+.8,R.oz+z+.2,.9,1,.04);blockCell(R.ox+x,R.oz+z);});I(null);at_(1,d-2,(x,z)=>chest(x,z,[['herb',1]],'Ящик кожевника'));}
    if(R.type==='warehouse'){I('Ящики','Товар с кораблей: ткань, гвозди, соль.');for(const [dx,dz] of [[1,1],[2,1],[w-2,1],[w-3,1],[1,d-2],[w-2,d-2]])at_(dx,dz,(x,z)=>S(x,z,.85,.7,.85,lam(T.crate)));I(null);
      at_(cx,1,(x,z)=>barrel(x,z,[['torch',1]]));at_(w-2,2,(x,z)=>chest(x,z,[['torch',1],['stone',2]],'Ящик с товаром'));}
    if(R.type==='barracks'){for(let x=1;x<w-1;x+=2)if(!doorway(x,1)&&!doorway(x,2))bed(x,1);
      I('Стойка с копьями','Копья стражи, наточены.');at_(w-2,d-2,(x,z)=>{S(x,z,.9,1.2,.3,lam(T.bark));for(let k=0;k<3;k++)part(g,M(0xb8bcc4),R.ox+x+.2+k*.3,y+.9,R.oz+z+.5,.05,1.1,.05);});I(null);
      at_(1,d-2,(x,z)=>chest(x,z,[['bread',2],['spear',1]],'Сундук стражи'));}
    if(R.type==='armory'){I('Стойка с оружием','Мечи, топоры и щиты королевской стражи.');for(const [dx,dz] of [[1,1],[2,1],[3,1]])at_(dx,dz,(x,z)=>{S(x,z,.9,1.2,.3,lam(T.bark));for(let k=0;k<3;k++)part(g,M(0xb8bcc4),R.ox+x+.2+k*.3,y+.9,R.oz+z+.5,.06,1,.04);});I(null);
      at_(1,d-2,(x,z)=>chest(x,z,[['sword_long',1],['shield_kite',1]],'Сундук оружейной'));at_(w-2,d-2,(x,z)=>chest(x,z,[['bow_long',1],['potion',1]],'Ящик с доспехами'));}
    if(R.type==='treasury'){I('Казна','Окованные сундуки. Ключи у казначея.');for(const [dx,dz] of [[1,1],[w-2,1]])at_(dx,dz,(x,z)=>chest(x,z,[['potion',2],['sword_rapier',1]],'Сундук казны'));
      at_(cx,d-2,(x,z)=>chest(x,z,[['shield_kite',1],['dagger_curved',1]],'Ларец казны'));I(null);}
    if(R.type==='chambers'){I('Ложе короля','Широкая кровать под красным пологом.');bed(1,1);part(g,M(0x8e2a24),R.ox+1.5,y+1.4,R.oz+2,.9,.06,2);I(null);rug(1,3,w-3,d-4);
      at_(w-2,1,(x,z)=>chest(x,z,[['potion',1],['dagger',1]],'Сундук короля'));at_(w-2,d-2,(x,z)=>candle(x,z));}
    if(R.type==='upper'){bed(1,1);at_(w-2,2,(x,z)=>chest(x,z,rnd()<.5?[['bread',1],['torch',1]]:[['herb',1]],'Сундук'));table(cx,d-3);candle(cx,d-3);rug(2,2,Math.max(1,w-4),Math.max(1,d-5));}}
  // the attic: the roof's slopes inside, hay, old chests and crates; the cellar: barrels, jars, a damp floor.
  // Both have cobwebs in the corners and a spider on its thread.
  if(R.type==='attic'||R.type==='cellar'){const w=R.iw,d=R.id,att=R.type==='attic';
    if(att){I('Скаты крыши','Изнутри видно, как положены доски: щели заткнуты мхом.');for(const sg of[-1,1]){const sl=part(g,lam(T.p[2],{color:0x5a4430}),R.ox+w/2+sg*(w/2-1.1),y+1.15,R.oz+d/2,2.4,.12,d-1);sl.rotation.z=-sg*.62;}I(null);
      I('Сено','Старое сено, кто-то тут спал.');part(g,M(0xc8b070),R.ox+2,y+.12,R.oz+2,1.4,.24,1.2);I(null);
      I('Ящик','Пыльный ящик с тряпьём.');S(w-2,2,.6,.45,.5,lam(T.crate));I(null);
      chest(w-2,d-3,[['torch',1],[['dagger','quarterstaff','bread'][Math.floor(rnd()*3)],1]],'Старый сундук');}
    else{I('Бочки','Капуста в рассоле и солонина.');S(1,1,.5,.62,.5,lam(T.p[1],{color:0x7a5a3a}));S(2,1,.5,.62,.5,lam(T.p[1],{color:0x6a4a30}));I(null);
      I('Полка с банками','Варенье, грибы, мутные настойки.');S(w-2,1,.9,1.1,.3,lam(T.bark));for(let i=0;i<3;i++)part(g,M([0xc85a3a,0x8a6a2a,0x6a9a5a][i]),R.ox+w-2.2+i*.25,y+.95,R.oz+1.5,.14,.18,.14);I(null);
      chest(1,d-3,[['potion',1],['bread',2]],'Ящик с припасами');}
    I('Паутина','Густая паутина в углу, в ней сухие мухи.');for(const[cx,cz,sx]of[[R.ox+1,R.oz+1,1],[R.ox+w-1,R.oz+1,-1]])for(let k=0;k<4;k++){const c=part(g,new THREE.MeshBasicMaterial({color:0xd8d8d8,transparent:true,opacity:.45}),cx+sx*(.25+k*.1),y+1.55-k*.1,cz+.25+k*.1,.5-k*.08,.01,.01);c.rotation.y=sx*.78;c.castShadow=false;}I(null);
    I('Паук','Чёрный паук спускается на нитке. Не трогай — он не трогает тебя.');{const sp=new THREE.Group(),bx=R.ox+w/2+.6,bz=R.oz+2.3;const body=new THREE.Mesh(BOX,M(0x141414));body.scale.set(.1,.07,.12);sp.add(body);
      for(const sg of[-1,1])for(let k=0;k<4;k++){const l=new THREE.Mesh(BOX,M(0x141414));l.scale.set(.12,.012,.012);l.position.set(sg*.1,-.01,-.045+k*.03);l.rotation.z=sg*.5;sp.add(l);}
      const th=new THREE.Mesh(BOX,new THREE.MeshBasicMaterial({color:0xe0e0e0,transparent:true,opacity:.5}));th.scale.set(.008,1,.008);sp.add(th);sp.position.set(bx,y+1.2,bz);g.add(sp);
      sp.traverse(m=>{if(m.isMesh&&INFO){if(!INFO.meshes){INFO.meshes=[];looks.push(INFO);}INFO.meshes.push(m);m.userData.look=INFO;}});SPIDERS.push({sp,th,y0:y+1.2,ph:rnd()*6});}I(null);}
  // in the house itself: the ladder to the attic against the back wall, the hatch to the cellar in the floor
  if(R.inPlace){const free_=(dx,dz)=>free(R.ox+dx,R.oz+dz)&&!lane(R.ox+dx,R.oz+dz)&&!(R.ox+dx===R.exit[0]&&R.oz+dz>=R.id-3);
    if(R.attic){for(let dx=1;dx<R.iw-1;dx++)if(free_(dx,1)&&free_(dx,2)){subWay(g,R.attic,y,R.ox+dx,R.oz+1,false);break;}}
    if(R.cellar){outer:for(let dz=2;dz<R.id-2;dz++)for(let dx=1;dx<R.iw-1;dx++)if(free_(dx,dz)&&free_(dx,dz+1)&&R.ox+dx!==R.exit[0]){subWay(g,R.cellar,y,R.ox+dx,R.oz+dz,false);break outer;}}}
  if(R.gen){looks.slice(lk0).forEach((L,j)=>L.key=R.i+'#'+j);roomState(R);}}
const SPIDERS=[];function spiderTick(t){for(const s of SPIDERS){if(!s.sp.parent||!s.sp.parent.visible)continue;const k=(Math.sin(t*.5+s.ph)+1)/2;s.sp.position.y=s.y0-k*.5;s.th.position.y=.5+k*.25;s.th.scale.y=.4+k*.5;}}
// a ladder up or a hatch down; in the attic or cellar the same way leads back into the house
function subWay(g,S,y,x,z,back){const up=S.type==='attic'||S.type==='upper',ms=[];const add=(m,px,py,pz,sx,sy,sz)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(px,py,pz);o.castShadow=true;g.add(o);ms.push(o);return o;};
  const wood=lam(T.bark,{color:0x7a5a38});
  if(up!==back){for(const sg of[-1,1])add(wood,x+.5+sg*.22,y+.85,z+.3,.07,1.7,.07);for(let k=0;k<6;k++)add(wood,x+.5,y+.2+k*.27,z+.3,.48,.05,.06);}
  else{add(lam(T.p[1],{color:0x5a3e26}),x+.5,y+.03,z+.5,.8,.05,.8);add(lam(T.stone,{color:0x3a3a40}),x+.5,y+.07,z+.7,.16,.03,.05);}
  blockCell(x,z);
  interact.push({mesh:ms[0],extra:ms.slice(1),x,z,name:back?(up?'Лестница вниз':'Лестница наверх'):(up?(S.type==='upper'?'Лестница наверх':'Лестница на чердак'):'Люк в подвал'),use(){subGo(S,back,x,z);}});}
async function subGo(S,back,x,z){if(busy||CB.on)return;busy=true;sfx('creak');
  if(!back){const P=S.parent;houseShow(P,true);SEE.inKeep=0;room=null;await teleport(S.exit[0],S.exit[1]-1,Math.PI);setRoom(S);S.home=[x,z];}
  else{const P=S.parent,[hx,hz]=S.home||[P.exit[0],P.exit[1]-1];setRoom(null);const [nx,nz]=nearFree(hx,hz+1,2);await teleport(nx,nz,0);}
  busy=false;}
// a generated room's chests and items remember their state by key, whenever the room gets built
const PEND={chests:{},looted:{}};
function roomState(R){for(const it of interact)if(it.key&&it.key.startsWith(R.i+':')&&PEND.chests[it.key]){const c=PEND.chests[it.key];it.items=c.items;if(c.o)it.open();}
  for(const L of looks)if(L.key&&L.key.startsWith(R.i+'#')&&PEND.looted[L.key]){L.taken=true;if(L.grp)L.grp.visible=false;}}
ROOMS.filter(R=>!R.gen).forEach(buildRoom); // the big island's rooms are built when first entered
// doors are tappable from outside; the exit tile inside leads back out
let room=null;const roomLight=new THREE.PointLight(0xffc890,1.7,12,1.1);roomLight.visible=false;scene.add(roomLight);const fadeEl=document.getElementById('fade');
async function teleport(x,z,face){closeWheel();fadeEl.classList.add('on');await wait(260);H0.x=x;H0.z=z;H0.px=x+.5;H0.pz=z+.5;H0.face=face;H0.route=null;focus.set(H0.px,.15,H0.pz);await wait(60);fadeEl.classList.remove('on');}
// doors swing: the outer one opens with a creak, then the inner one shuts behind you
// a house far away may not be built right now: its door is then a stand-in
const outDoor=R=>houseMeshes.find(g=>g.userData.house===R.i)?.userData.door||{pivot:{rotation:{y:0}}};
async function enterRoom(R){if(busy||CB.on)return;busy=true;rest();H0.face=Math.PI;sfx('door');heroPose('open',600);await swing(outDoor(R),true);await wait(150);
  await teleport(R.exit[0],R.exit[1]-1,Math.PI);setRoom(R);R.inDoor.pivot.rotation.y=1.45;swing(R.inDoor,false,380).then(()=>sfx('doorclose'));swing(outDoor(R),false,10);busy=false;}
async function leaveRoom(){if(!room||busy)return;const R=room;busy=true;H0.face=0;sfx('door');heroPose('open',600);await swing(R.inDoor,true);await wait(150);
  await teleport(R.door[0],R.door[1],0);setRoom(null);outDoor(R).pivot.rotation.y=1.45;swing(outDoor(R),false,380).then(()=>sfx('doorclose'));swing(R.inDoor,false,10);busy=false;}
// a house that stands in the world is entered by walking in: its roof and the wall facing the camera lift away,
// the room is lit and the street outside goes dark and grey, so the room comes first
const houseOf=R=>houseMeshes.find(g=>g.userData.house===R.i);
function inPlaceAt(x,z){return ROOMS.find(r=>r.inPlace&&(x>r.ox&&x<r.ox+r.iw-1&&z>r.oz&&z<r.oz+r.id-1||x===r.exit[0]&&z===r.exit[1]))||null;}
function houseShow(R,on){const g=houseOf(R);if(!g)return;for(const m of [...(g.userData.roofs||[]),...(g.userData.front||[])])m.visible=on;}
function houseTick(){if(room&&!room.inPlace)return;const R=inPlaceAt(H0.x,H0.z),cur=room&&room.inPlace?room:null;
  for(const g of houseMeshes){const d=g.userData.door,Rg=ROOMS[g.userData.house];if(!d||!Rg||!Rg.inPlace)continue;const near=Math.hypot(H0.x-Rg.exit[0],H0.z-Rg.exit[1])<1.6||actors.some(a=>a!==H0&&!a.dead&&!a.hidden&&Math.hypot(a.x-Rg.exit[0],a.z-Rg.exit[1])<1.1);
    if(near!==!!g.userData.doorOpen){g.userData.doorOpen=near;swing(d,near,380);if(Math.hypot(H0.x-Rg.exit[0],H0.z-Rg.exit[1])<6)sfx(near?'door':'doorclose');}}
  if(R===cur)return;if(cur)houseShow(cur,true);room=R;
  if(R){houseShow(R,false);if(!R.group)buildRoom(R);R.group.visible=true;SEE.inKeep=1;SEE.y.value=R.y+.45;SEE.inRect.value.set(R.ox+.02,R.oz+.02,R.ox+R.iw-.02,R.oz+R.id-.02);
    roomLight.visible=true;roomLight.position.set(R.ox+R.iw/2,R.y+2.2,R.oz+R.id/2);roomLight.distance=Math.max(9,R.iw*1.2);zoneEl.textContent=R.name;zoneEl.classList.remove('show');void zoneEl.offsetWidth;zoneEl.classList.add('show');zoneNow=R.name;}
  else{SEE.inKeep=0;roomLight.visible=false;}}
function setRoom(R){if(R&&R.inPlace||room&&room.inPlace&&!R){return;}if(R&&!R.group)buildRoom(R);if(room)room.group.visible=false;room=R;if(R)R.group.visible=true;sea.visible=!R;if(R){scene.fog.color.setHex(0x07090b);scene.background.setHex(0x07090b);scene.fog.density=.05;}
  hemi.intensity=R?(R.iw>15?1:.6):.75;moon.intensity=R?.12:.6;roomLight.visible=!!R;if(R){roomLight.position.set(R.ox+R.iw/2,R.iw>15?4.5:2.6,R.oz+R.id/2);roomLight.distance=Math.max(12,R.iw*1.1);}flies.forEach(f=>f.visible=!R);
  if(R){zoneEl.textContent=R.name;zoneEl.classList.remove('show');void zoneEl.offsetWidth;zoneEl.classList.add('show');zoneNow=R.name;}}
