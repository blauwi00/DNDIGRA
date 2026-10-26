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
  tannery:[T.dirt,0x9a8060,T.p[1],0x7a6450],warehouse:[T.p[1],0xb8a080,T.p[1],0x7a6450],barracks:[T.stone,0xa8a098,T.wall,0x9a948c],kitchen:[T.stone,0xa89c8c,T.wall,0x9a8c7c],armory:[T.stone,0x9a948c,T.wall,0x8a8078],treasury:[T.cobble,0xb8a890,T.wall,0x9a948c],chambers:[T.p[3],0xc8a888,T.wall,0xc8b8a0]};
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
    part(g,lam(T.p[2]),R.ox+6.1,y+1.45,R.oz+1.1,1.8,.06,.12);I(null);chest(7,4,[['torch',1],['stone',3]],'Сундук кузнеца');}
  if(R.type==='home'){hearth(5);bed(1,2);table(3,4);stool(2,4);candle(3,4);barrel(6,4);chest(6,3,[['bread',1],['stone',2],['fish',1]],'Сундук рыбака');
    I('Сеть','Старая сеть, вся в узлах и чешуе.');
    for(let i=0;i<6;i++)part(g,M(0x3a3a30),R.ox+1.2+i*.3,y+1.1,R.oz+1.08,.03,.9,.02);for(let j=0;j<4;j++)part(g,M(0x3a3a30),R.ox+1.95,y+.75+j*.22,R.oz+1.08,1.6,.03,.02); // net
    I('Вяленая рыба','Солёная и жёсткая. Вы отламываете кусок в дорогу.',[['bread',1]]);    for(let i=0;i<3;i++){part(g,M(0x9ab0b8),R.ox+3.1+i*.3,y+1.15,R.oz+1.12,.08,.26,.05);}part(g,lam(T.bark),R.ox+3.4,y+1.32,R.oz+1.12,.9,.04,.04); // drying fish
    I('Вёсла','Одно треснуло. Олав всё собирается починить.');    for(const k of [0,1]){const o=part(g,lam(T.p[1]),R.ox+6.7,y+.7,R.oz+5.6+k*.18,.08,1.3,.06);o.rotation.z=.25;}I(null);}
  if(R.type==='hall'){hearth(6);rug(2,2,5,3);I('Длинный стол','Здесь староста собирает совет. На столе карта острова с крестиком у руин.');for(let x=3;x<6;x++){S(x,3,1,.08,.9,lam(T.p[2])).position.y=y+.5;part(g,lam(T.bark),R.ox+x+.5,y+.24,R.oz+3.5,.1,.46,.6);stool(x,2);}
    for(let x=3;x<6;x++)if(!doorway(x,4))part(g,lam(T.p[1]),R.ox+x+.5,y+.14,R.oz+4.5,.3,.28,.3);I(null);candle(3,3);candle(5,3);
    I('Кресло старосты','Высокая спинка, резные рыбы на подлокотниках.');S(2,3,.5,.32,.5,lam(T.p[1]));part(g,lam(T.p[1]),R.ox+2.3,y+.75,R.oz+3.5,.08,.8,.5); // the elder's chair
    I('Знамя острова','Золотая рыба на алом поле — герб Хельги.');    part(g,M(0x8a2a24),R.ox+4.5,y+1.15,R.oz+1.07,.9,1.1,.03);part(g,M(0xd0a94a),R.ox+4.5,y+1.2,R.oz+1.09,.3,.3,.02);part(g,lam(T.bark),R.ox+4.5,y+1.72,R.oz+1.1,1.1,.05,.05); // banner
    I('Книжный шкаф','Летопись острова: «В год, когда погас огонь часовни, мёртвые поднялись из земли…»');S(1,1,.9,1.5,.4,lam(T.p[2]));for(let j=0;j<3;j++)for(let i=0;i<5;i++)part(g,M([0x7a4a2a,0x4a5a8a,0x8a3a2a,0x5a6a3a][(i+j)%4]),R.ox+1.15+i*.17,y+.35+j*.45,R.oz+1.3,.12,.3,.2);
    I(null);chest(7,4,[['bread',2],['torch',1]],'Сундук старосты');itemProp(g,R.ox+4.5,y+.55,R.oz+3.5,'potion',1,'Зелье лечения','Стоит на карте острова, как пресс-папье.');}
  if(R.type==='barn'){torch(R.ox+5,R.oz+5);I('Сено','Мягкое и колючее. Пахнет летом.');for(const [dx,dz,h] of [[1,1,.8],[2,1,.6],[1,2,.5]]){S(dx,dz,.95,h,.95,M(0xc8a858));part(g,M(0xd8b868),R.ox+dx+.5,y+h+.04,R.oz+dz+.5,.7,.08,.7);}
    I('Телега','Одно колесо скрипит.');S(4,3,1,.3,.8,lam(T.p[1]));for(const sx of [-1,1])part(g,M(0x4a3020),R.ox+4.5+sx*.52,y+.25,R.oz+3.5,.06,.5,.5); // cart
    I('Вилы','Острые. Не оружие, но в крайнем случае…');const f=part(g,lam(T.bark),R.ox+5.7,y+.75,R.oz+1.3,.05,1.4,.05);f.rotation.z=.2;I('Мешки','Мука с мельницы Тодора.');
    for(let i=0;i<3;i++)S(5-i%2,2+(i>1?0:0),.4,.45,.4,M(0xb8a070),false).position.set(R.ox+4.6+i*.35,y+.22,R.oz+1.6);blockCell(R.ox+4,R.oz+1);blockCell(R.ox+5,R.oz+1);
    I(null);chest(1,4,[['bread',3],['stone',2]],'Ларь с зерном');itemProp(g,R.ox+4.5,y+.4,R.oz+3.5,'bread',1,'Хлеб','Кто-то забыл обед на телеге.');}
  if(R.type==='herb'){hearth(4);bed(1,3);table(4,3);candle(4,3);chest(5,2,[['potion',1],['herb',1]],'Шкатулка травницы');
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
  // Layout 3: a dwelling is parted into rooms by plank walls, each with a doorway gap. The hall with the hearth and
  // the table is where the outer door opens; behind the walls a bedroom, and in bigger houses a pantry and a second
  // bedroom (a rich house up to four rooms, a hut one or two). Nothing is put where it would cut a room off: every
  // wall and every piece of furniture is tried first, and kept only if every free cell can still be walked to.
  else if((R.type==='house'||R.type==='poorhouse')&&R.inPlace&&typeof LAYOUT!=='undefined'&&LAYOUT>=3){const w=R.iw,d=R.id,poor=R.type==='poorhouse',rich=!poor&&(R.wealth>=3||R.spec&&R.spec.ring===0);
    const K2=(x,z)=>x+','+z,ins=[R.inside[0]-R.ox,R.inside[1]-R.oz],keep=new Set(),acc=[],N4_=[[1,0],[-1,0],[0,1],[0,-1]];R.keepRel=keep;// acc: furniture that must stay reachable
    const fr=(x,z)=>x>=1&&z>=1&&x<=w-2&&z<=d-2&&free(R.ox+x,R.oz+z);
    const whole=()=>{let n=0;for(let z=1;z<=d-2;z++)for(let x=1;x<=w-2;x++)if(fr(x,z))n++;const S0=new Set([K2(...ins)]),q=[ins];
      while(q.length){const [x,z]=q.pop();for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const k=K2(x+a,z+b);if(S0.has(k)||!fr(x+a,z+b))continue;S0.add(k);q.push([x+a,z+b]);}}return S0.size===n;};
    const tryBlock=cells=>{const ks=cells.map(([x,z])=>(R.ox+x)+','+(R.oz+z));if(cells.some(([x,z])=>!fr(x,z)||keep.has(K2(x,z))||doorway(x,z)||x===ins[0]&&z===ins[1]))return false;
      ks.forEach(k=>solid.add(k));if(whole()&&acc.every(cs=>cs.some(([a,b])=>N4_.some(([p,q])=>fr(a+p,b+q)))))return true;ks.forEach(k=>solid.delete(k));return false;};
    const plank=lam(T.p[1],{color:rich?0xb8a488:0x8a7258}),beam=lam(T.bark,{color:0x5a3e28}),wh=1.25;
    const wallMesh=(x,z,vert)=>{part(g,plank,R.ox+x+.5,y+wh/2,R.oz+z+.5,vert?.24:1,wh,vert?1:.24);part(g,beam,R.ox+x+.5,y+wh+.04,R.oz+z+.5,vert?.3:1.02,.08,vert?1.02:.3);};
    const lintel=(x,z,vert)=>{part(g,beam,R.ox+x+.5,y+1.1,R.oz+z+.5,vert?.3:1.02,.12,vert?1.02:.3);part(g,plank,R.ox+x+.5,y+(1.16+wh)/2+.02,R.oz+z+.5,vert?.24:1,wh-1.16,vert?1:.24);};
    // one wall across a room: vertical at column c or horizontal at row r, over the room's span, with a gap
    const split=(rm,vert)=>{const lo=vert?rm.x0:rm.z0,hi=vert?rm.x1:rm.z1,cands=[];for(let p=lo+1;p<=hi-1;p++)cands.push(p);
      // a narrow room of one cell (an alcove for a box bed, a closet) only when nothing wider fits
      const sc=p=>Math.abs(p-(lo+hi)/2)+(Math.min(p-lo,hi-p)<2?3:0);cands.sort((a,b)=>sc(a)-sc(b));
      for(const p of cands){const A0=vert?{x0:rm.x0,x1:p-1,z0:rm.z0,z1:rm.z1}:{x0:rm.x0,x1:rm.x1,z0:rm.z0,z1:p-1},B0=vert?{x0:p+1,x1:rm.x1,z0:rm.z0,z1:rm.z1}:{x0:rm.x0,x1:rm.x1,z0:p+1,z1:rm.z1},H0_=has(A0,ins)?A0:has(B0,ins)?B0:null;
        if(H0_&&(H0_.x1-H0_.x0<1||H0_.z1-H0_.z0<1))continue;const line=[];for(let t=vert?rm.z0:rm.x0;t<=(vert?rm.z1:rm.x1);t++)line.push(vert?[p,t]:[t,p]);
        const gaps=line.slice(1,-1).length?line.slice(1,-1):line;gaps.sort((a,b)=>(vert?Math.abs(a[1]-ins[1]):Math.abs(a[0]-ins[0]))-(vert?Math.abs(b[1]-ins[1]):Math.abs(b[0]-ins[0])));
        for(const gp of gaps){const wall=line.filter(c=>c!==gp);if(!fr(...gp)||doorway(...gp))continue;if(!tryBlock(wall))continue;
          wall.forEach(([x,z])=>wallMesh(x,z,vert));lintel(gp[0],gp[1],vert);keep.add(K2(...gp));for(const [a,b] of vert?[[1,0],[-1,0]]:[[0,1],[0,-1]])keep.add(K2(gp[0]+a,gp[1]+b));
          const A=vert?{x0:rm.x0,x1:p-1,z0:rm.z0,z1:rm.z1}:{x0:rm.x0,x1:rm.x1,z0:rm.z0,z1:p-1},B2=vert?{x0:p+1,x1:rm.x1,z0:rm.z0,z1:rm.z1}:{x0:rm.x0,x1:rm.x1,z0:p+1,z1:rm.z1};return [A,B2];}}
      return null;};
    const has=(rm,[x,z])=>x>=rm.x0&&x<=rm.x1&&z>=rm.z0&&z<=rm.z1,area=rm=>(rm.x1-rm.x0+1)*(rm.z1-rm.z0+1);
    let rooms=[{x0:1,x1:w-2,z0:1,z1:d-2}];const want=poor?(area(rooms[0])>=9?1:0):rich?3:area(rooms[0])>=20?2:1;
    for(let n=0;n<want;n++){// split the biggest room that can be split; the hall keeps the outer door
      const order=rooms.slice().sort((a,b)=>area(b)-area(a));let done=false;
      for(const rm of order){const W_=rm.x1-rm.x0+1,D_=rm.z1-rm.z0+1;for(const vert of W_>=D_?[true,false]:[false,true]){if((vert?W_:D_)<3)continue;const r2=split(rm,vert);if(r2){rooms.splice(rooms.indexOf(rm),1,...r2);done=true;break;}}if(done)break;}
      if(!done)break;}
    R.parts=rooms.length;const hall=rooms.find(rm=>has(rm,ins)),others=rooms.filter(rm=>rm!==hall).sort((a,b)=>area(b)-area(a));
    const cellsOf=rm=>{const L=[];for(let z=rm.z0;z<=rm.z1;z++)for(let x=rm.x0;x<=rm.x1;x++)L.push([x,z]);return L;};
    // furniture goes on the best cell of a room where it cuts nothing off; `two` also takes the cell south of it
    const place=(rm,score,fn,two,solidIt=true)=>{for(const [x,z] of cellsOf(rm).sort((a,b)=>score(a)-score(b))){const cs=two?[[x,z],[x,z+1]]:[[x,z]];if(two&&!has(rm,[x,z+1]))continue;
        if(solidIt?!tryBlock(cs):cs.some(c=>!fr(...c)||keep.has(K2(...c))||doorway(...c)))continue;
        // whatever stands there must still be reached: a free cell beside it
        if(solidIt&&!cs.some(([a,b])=>[[1,0],[-1,0],[0,1],[0,-1]].some(([p,q])=>fr(a+p,b+q)))){cs.forEach(([a,b])=>solid.delete((R.ox+a)+','+(R.oz+b)));continue;}if(solidIt){cs.forEach(([a,b])=>solid.delete((R.ox+a)+','+(R.oz+b)));acc.push(cs);}fn(x,z);return [x,z];}return null;};
    const wallSide=rm=>([x,z])=>Math.min(z-rm.z0,rm.z1-z,x-rm.x0,rm.x1-x)+(z===1?-.5:0),far=([x,z])=>-(Math.abs(x-ins[0])+Math.abs(z-ins[1]));
    // a hearth anywhere along a wall, its fire lit
    const fire=(x,z)=>{I(poor?'Очаг':'Очаг','Тёплый огонь. В доме можно перевести дух: умения восстанавливаются, когда вы входите.');S(x,z,.9,poor?.3:.7,.6,lam(T.wall,{color:poor?0x6a6058:0x8a8278}));if(!poor)part(g,lam(T.wall,{color:0x6a6058}),R.ox+x+.5,y+1.15,R.oz+z+.5,.6,.9,.36);torch(R.ox+x,R.oz+z,true);I(null);};
    const box=[];if(poor){if(rnd()<.6)box.push([pick(['bread','herb','stone','torch']),1]);if(rnd()<.25)box.push(['bread',1]);if(rnd()<.08)box.push([pick(['dagger','axe_hand','mace','spear','quarterstaff']),1]);}
    else{box.push([pick(['bread','torch','herb']),1+Math.floor(rnd()*2)]);if(rnd()<.35)box.push(['potion',1]);if(rnd()<(rich?.35:.2))box.push([pick(['dagger','axe_hand','mace','spear','quarterstaff','shield_round','bow_short','sword']),1]);if(rich&&rnd()<.3)box.push([pick(['sword_long','sword_rapier','dagger_curved','bow_long','trident','shield_kite','sword_scimitar']),1]);}
    // the hall: hearth on a wall far from the door, the table with stools, a barrel by the door, a shelf
    place(hall,c=>wallSide(hall)(c)*3+far(c)*.2,fire);
    const t=place(hall,([x,z])=>Math.abs(x-(hall.x0+hall.x1)/2)+Math.abs(z-(hall.z0+hall.z1)/2)+(fr(x,z+1)?0:2),(x,z)=>{table(x,z);candle(x,z);});
    if(t){for(const [a,b] of [[0,1],[-1,0],[1,0]])if(has(hall,[t[0]+a,t[1]+b])&&fr(t[0]+a,t[1]+b)&&!doorway(t[0]+a,t[1]+b)&&!keep.has(K2(t[0]+a,t[1]+b))){stool(t[0]+a,t[1]+b);if(poor||!rich)break;}}
    if(!poor)place(hall,c=>wallSide(hall)(c)*2-far(c)*.3,(x,z)=>barrel(x,z,[['bread',1]]));
    if(!poor&&hall.z0===1)shelf(Math.max(hall.x0,1),Math.max(1,Math.min(3,hall.x1-hall.x0)),rich?'Книги в кожаных переплётах и подсвечник.':'Горшки, миски и моток бечёвки.');
    if(rich)rug(hall.x0+1,hall.z0+1,Math.max(1,hall.x1-hall.x0-1),Math.max(1,hall.z1-hall.z0-1));
    // the bedroom(s): a bed along a wall, the chest beside it; in a hut, straw on the floor
    const bedroom=(rm,main)=>{if(poor){I('Подстилка','Охапка соломы и латаное одеяло.');place(rm,wallSide(rm),(x,z)=>part(g,M(0xb8a060),R.ox+x+.5,y+.06,R.oz+z+.5,.9,.1,.9),false,false);I(null);}
      else place(rm,c=>wallSide(rm)(c)*2+(c[1]===rm.z0?-1:0),(x,z)=>bed(x,z),true);
      if(main&&box.length)place(rm,wallSide(rm),(x,z)=>chest(x,z,box,poor?'Старый ящик':rich?'Окованный сундук':'Сундук'));
      if(rich&&main){I('Картина','Корабль под парусами на закате. Подписано: «Б.».');part(g,M(0x6a4a2a),R.ox+(rm.x0+rm.x1)/2+.5,y+1.2,R.oz+rm.z0+.1,.9,.6,.04);I(null);}};
    const pantry=rm=>{I('Мешки','Мука, крупа, сушёный горох.');place(rm,wallSide(rm),(x,z)=>S(x,z,.6,.5,.5,M(0xe0d8c0)));I(null);place(rm,wallSide(rm),(x,z)=>barrel(x,z,[['bread',1]]));
      I('Полка с банками','Варенье, грибы, мутные настойки.');place(rm,wallSide(rm),(x,z)=>{S(x,z,.9,1.1,.3,lam(T.bark));for(let i=0;i<3;i++)part(g,M([0xc85a3a,0x8a6a2a,0x6a9a5a][i]),R.ox+x+.25+i*.25,y+.95,R.oz+z+.5,.14,.18,.14);});I(null);};
    if(!others.length){// one room: the bed in its far corner
      if(poor){I('Подстилка','Охапка соломы и латаное одеяло.');place(hall,c=>wallSide(hall)(c)+far(c)*.3,(x,z)=>part(g,M(0xb8a060),R.ox+x+.5,y+.06,R.oz+z+.5,.9,.1,.9),false,false);I(null);if(box.length)place(hall,c=>wallSide(hall)(c)+far(c)*.2,(x,z)=>chest(x,z,box,'Старый ящик'));}
      else{place(hall,c=>wallSide(hall)(c)+far(c)*.4,(x,z)=>bed(x,z),true);if(box.length)place(hall,c=>wallSide(hall)(c)+far(c)*.2,(x,z)=>chest(x,z,box,rich?'Окованный сундук':'Сундук'));}}
    others.forEach((rm,i)=>{if(i===0)bedroom(rm,true);else if(i===1&&!poor)pantry(rm);else bedroom(rm,false);});
    if(!poor&&rnd()<.4&&t)itemProp(g,R.ox+t[0]+.5,y+.55,R.oz+t[1]+.5,'bread',1,'Хлеб','Краюха на столе, ещё мягкая.');
    // the ladder to the attic and the hatch to the cellar: kept free now, so they always find their place
    const res2=()=>{for(const rm of [hall,...others]){const c=place(rm,c2=>wallSide(rm)(c2)*2-far(c2)*.2,(x,z)=>{keep.add(K2(x,z));keep.add(K2(x,z+1));},true);if(c){acc.pop();return c;}}return null;};
    if(R.attic){const c=res2();if(c)R.ladderAt=c;}if(R.cellar){const c=res2();if(c)R.hatchAt=c;}}
  else if(R.type==='house'||R.type==='poorhouse'){const w=R.iw,d=R.id,rich=R.wealth>=3||R.place&&R.place.type==='capital',poor=R.type==='poorhouse';
    const common=['dagger','axe_hand','mace','spear','quarterstaff','shield_round','bow_short','sword'],fine=['sword_long','sword_rapier','dagger_curved','bow_long','trident','shield_kite','sword_scimitar'];
    const box=[];if(poor){if(rnd()<.6)box.push([pick(['bread','herb','stone','torch']),1]);if(rnd()<.25)box.push(['bread',1]);if(rnd()<.08)box.push([pick(common),1]);}
    else{box.push([pick(['bread','torch','herb','stone']),1+Math.floor(rnd()*2)]);if(rnd()<.15)box.push(['potion',1]);if(rnd()<(rich?.12:.06))box.push([pick(common),1]);if(rich&&rnd()<.06)box.push([pick(fine),1]);}
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
    // the keep of the big castle (layout 3): two long feasting tables either side of the carpet, benches beside them
    if(w>=12&&d>=11)for(const tx of [cx-2,cx+2])for(const tz of [5,6,8]){table(tx,tz);stool(tx+(tx<cx?-1:1),tz);}
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
      at_(1,d-2,(x,z)=>chest(x,z,[['bread',1+(rnd()<.5?1:0)]],'Ларь с зерном'));
      // the castle's stables: horses in their stalls along the back wall, a plank between each
      if(R.name==='Конюшня')for(let k=0;k<3;k++)at_(3+k*2,1,(x,z)=>{I('Конь','Королевский конь. Косится на вас и фыркает.');const hc=[0x6a4428,0x2a2220,0xb8a080][k],hm=M(hc),X=R.ox+x+.5,Z=R.oz+z+.55;
        S(x,z,.36,.01,.9,hm);part(g,hm,X,y+.62,Z,.34,.34,.82);for(const [a,b] of [[-.11,-.3],[.11,-.3],[-.11,.3],[.11,.3]])part(g,M(0x2a1e16),X+a,y+.24,Z+b,.09,.48,.09);
        part(g,hm,X,y+.9,Z+.42,.2,.36,.2);part(g,hm,X,y+1.02,Z+.6,.16,.18,.3);part(g,M(0x1a1410),X,y+.9,Z-.44,.06,.4,.06);I(null);
        part(g,lam(T.p[1],{color:0x6a4a30}),R.ox+x+1.02,y+.45,R.oz+z+.6,.06,.9,1);});}
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
    if(R.type==='kitchen'){I('Очаг с вертелом','Над огнём крутится вертел, в котле булькает похлёбка для стражи.');S(w-2,1,.9,.8,.6,lam(T.wall));part(g,glow(0xff8a3a),R.ox+w-1.5,y+.35,R.oz+1.82,.5,.25,.02);part(g,M(0x2a2a2e),R.ox+w-1.5,y+.95,R.oz+1.6,.4,.3,.4);I(null);
      I('Медные котлы','Висят на крюках, начищены до блеска.');for(let k=0;k<3;k++)part(g,M(0xb87a40),R.ox+1.4+k*.4,y+1.25,R.oz+1.08,.24,.2,.06);I(null);
      at_(cx,d-2,(x,z)=>{table(x,z);at_(x,z-1,(a,b)=>stool(a,b));});at_(1,1,(x,z)=>barrel(x,z,[['bread',1]]));
      I('Мешки','Мука, лук, репа.');at_(w-2,d-2,(x,z)=>S(x,z,.6,.5,.5,M(0xe0d8c0)));I(null);at_(2,1,(x,z)=>chest(x,z,[['bread',2],['herb',1]],'Ларь с припасами'));}
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
  if(R.inPlace){const inn=new Set(),q=[R.inside||[R.exit[0],R.exit[1]-1]];inn.add(q[0][0]+','+q[0][1]); // cells one can walk to from the door
    while(q.length){const [x,z]=q.pop();for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const k=(x+a)+','+(z+b);if(inn.has(k)||x+a<=R.ox||z+b<=R.oz||x+a>=R.ox+R.iw-1||z+b>=R.oz+R.id-1||!free(x+a,z+b))continue;inn.add(k);q.push([x+a,z+b]);}}
    const free_=(dx,dz)=>!(R.keepRel&&R.keepRel.has(dx+','+dz))&&free(R.ox+dx,R.oz+dz)&&inn.has((R.ox+dx)+','+(R.oz+dz))&&!lane(R.ox+dx,R.oz+dz)&&!(R.ox+dx===R.exit[0]&&R.oz+dz>=R.id-3);
    // a ladder or hatch may not cut off a part of the room, nor the last free side of a chest or a ladder
    const mine_=it=>it.x>=R.ox&&it.x<R.ox+R.iw&&it.z>=R.oz&&it.z<R.oz+R.id;
    const cut=(dx,dz)=>{const k=(R.ox+dx)+','+(R.oz+dz);solid.add(k);const rs=roomReach(R),n=rs.size;solid.delete(k);
      return n<inn.size-1||interact.some(it=>mine_(it)&&!(it.x===R.ox+dx&&it.z===R.oz+dz)&&![[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>rs.has((it.x+a)+','+(it.z+b))));};
    const free2=(dx,dz)=>free_(dx,dz)&&!cut(dx,dz);
    if(R.attic){if(R.ladderAt){R.keepRel.delete(R.ladderAt.join(','));subWay(g,R.attic,y,R.ox+R.ladderAt[0],R.oz+R.ladderAt[1],false);}else for(let dx=1;dx<R.iw-1;dx++)if(free2(dx,1)&&free_(dx,2)){subWay(g,R.attic,y,R.ox+dx,R.oz+1,false);break;}}
    if(R.cellar){if(R.hatchAt){R.keepRel.delete(R.hatchAt.join(','));subWay(g,R.cellar,y,R.ox+R.hatchAt[0],R.oz+R.hatchAt[1],false);}else outer:for(let dz=2;dz<R.id-2;dz++)for(let dx=1;dx<R.iw-1;dx++)if(free2(dx,dz)&&free_(dx,dz+1)&&R.ox+dx!==R.exit[0]){subWay(g,R.cellar,y,R.ox+dx,R.oz+dz,false);break outer;}}}
  if(R.gen){looks.slice(lk0).forEach((L,j)=>L.key=R.i+'#'+j);roomState(R);}}
const SPIDERS=[];function spiderTick(t){for(const s of SPIDERS){if(!s.sp.parent||!s.sp.parent.visible)continue;const k=(Math.sin(t*.5+s.ph)+1)/2;s.sp.position.y=s.y0-k*.5;s.th.position.y=.5+k*.25;s.th.scale.y=.4+k*.5;}}
// a ladder up or a hatch down; in the attic or cellar the same way leads back into the house
function subWay(g,S,y,x,z,back){const up=S.type==='attic'||S.type==='upper',ms=[];const add=(m,px,py,pz,sx,sy,sz)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(px,py,pz);o.castShadow=true;g.add(o);ms.push(o);return o;};
  const wood=lam(T.bark,{color:0x7a5a38});
  if(up!==back){for(const sg of[-1,1])add(wood,x+.5+sg*.22,y+.85,z+.3,.07,1.7,.07);for(let k=0;k<6;k++)add(wood,x+.5,y+.2+k*.27,z+.3,.48,.05,.06);}
  else{add(lam(T.p[1],{color:0x5a3e26}),x+.5,y+.03,z+.5,.8,.05,.8);add(lam(T.stone,{color:0x3a3a40}),x+.5,y+.07,z+.7,.16,.03,.05);}
  blockCell(x,z);if(!back)S.ladder=[x,z];
  interact.push({mesh:ms[0],extra:ms.slice(1),x,z,name:back?(up?'Лестница вниз':'Лестница наверх'):(up?(S.type==='upper'?'Лестница наверх':'Лестница на чердак'):'Люк в подвал'),use(){subGo(S,back,x,z);}});}
async function subGo(S,back,x,z){if(busy||CB.on)return;busy=true;sfx('creak');
  try{if(!back){const P=S.parent;houseShow(P,true);SEE.inKeep=0;room=null;const [ax,az]=roomCell(S,[S.exit[0],S.exit[1]-1]);await teleport(ax,az,Math.PI);setRoom(S);S.home=[x,z];}
  else{const P=S.parent;setRoom(null);const [nx,nz]=backCell(P,S.home);await teleport(nx,nz,0);}}
  finally{busy=false;}}
// the cells of a room one can walk to from its threshold, never through its walls
function roomReach(R){const st=R.inside||[R.exit[0],R.exit[1]-1],seen=new Set([st[0]+','+st[1]]),q=[st];
  while(q.length){const [x,z]=q.pop();for(const [a,b] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+a,nz=z+b,k=nx+','+nz;if(seen.has(k)||nx<=R.ox||nz<=R.oz||nx>=R.ox+R.iw-1||nz>=R.oz+R.id-1||!free(nx,nz))continue;seen.add(k);q.push([nx,nz]);}}return seen;}
// a free cell of the room near a wanted one, from which the way out is open
function roomCell(R,want){const rs=roomReach(R);let best=null,bd=1e9;for(const k of rs){const [x,z]=k.split(',').map(Number);if(!free(x,z)||occupied(x,z))continue;const d=Math.abs(x-want[0])+Math.abs(z-want[1]);if(d<bd){bd=d;best=[x,z];}}
  return best||R.inside||[R.exit[0],R.exit[1]-1];}
// back down a ladder (or up from a cellar): beside the ladder in the house, on a cell that leads to the door
function backCell(P,home){return roomCell(P,home?[home[0],home[1]+1]:(P.inside||[P.exit[0],P.exit[1]-1]));}
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
async function enterRoom(R){if(busy||CB.on)return;if(R.inPlace){goDo(...(R.inside||[R.exit[0],R.exit[1]-1]),true,()=>{});return;}
  busy=true;try{rest();H0.face=Math.PI;sfx('door');heroPose('open',600);await swing(outDoor(R),true);await wait(150);
  const [ix,iz]=roomCell(R,[R.exit[0],R.exit[1]-1]);await teleport(ix,iz,Math.PI);setRoom(R);if(R.inDoor){R.inDoor.pivot.rotation.y=1.45;swing(R.inDoor,false,380).then(()=>sfx('doorclose'));}swing(outDoor(R),false,10);}
  finally{busy=false;}}
// out of a room: a house in the world is simply walked out of; a room of its own puts the hero before its door,
// or on the nearest free cell if someone or something stands there
async function leaveRoom(){if(!room||busy)return;const R=room;
  if(R.inPlace){const [x,z]=free(...R.door)?R.door:nearFree(R.door[0],R.door[1],3);goDo(x,z,true,()=>{});return;}
  busy=true;try{H0.face=0;sfx('door');heroPose('open',600);if(R.inDoor)await swing(R.inDoor,true);await wait(150);
  const [x,z]=free(...R.door)&&!occupied(...R.door)?R.door:nearFree(R.door[0],R.door[1]+1,4);await teleport(x,z,0);setRoom(null);outDoor(R).pivot.rotation.y=1.45;swing(outDoor(R),false,380).then(()=>sfx('doorclose'));if(R.inDoor)swing(R.inDoor,false,10);}
  finally{busy=false;}}
// a house that stands in the world is entered by walking in: its roof and the wall facing the camera lift away,
// the room is lit and the street outside goes dark and grey, so the room comes first
const houseOf=R=>houseMeshes.find(g=>g.userData.house===R.i);
function inPlaceAt(x,z){return ROOMS.find(r=>r.inPlace&&(x>r.ox&&x<r.ox+r.iw-1&&z>r.oz&&z<r.oz+r.id-1||x===r.exit[0]&&z===r.exit[1]))||null;}
function houseShow(R,on){const g=houseOf(R);if(!g)return;for(const m of [...(g.userData.roofs||[]),...(g.userData.front||[])])m.visible=on;}
function houseTick(){if(room&&!room.inPlace)return;const R=inPlaceAt(H0.x,H0.z),cur=room&&room.inPlace?room:null;
  for(const g of houseMeshes){const d=g.userData.door,Rg=ROOMS[g.userData.house];if(!d||!Rg||!Rg.inPlace)continue;const shut=Rg.guard&&typeof crownLocked==='function'&&crownLocked(Rg)&&R!==Rg;const near=!shut&&(Math.hypot(H0.x-Rg.exit[0],H0.z-Rg.exit[1])<1.6||actors.some(a=>a!==H0&&!a.dead&&!a.hidden&&Math.hypot(a.x-Rg.exit[0],a.z-Rg.exit[1])<1.1));
    if(near!==!!g.userData.doorOpen){g.userData.doorOpen=near;swing(d,near,380);if(Math.hypot(H0.x-Rg.exit[0],H0.z-Rg.exit[1])<6)sfx(near?'door':'doorclose');}}
  if(R===cur)return;if(cur)houseShow(cur,true);room=R;
  if(R){houseShow(R,false);if(!R.group)buildRoom(R);R.group.visible=true;SEE.inKeep=1;SEE.y.value=R.y+.45;SEE.inRect.value.set(R.ox+.02,R.oz+.02,R.ox+R.iw-.02,R.oz+R.id-.02);
    roomLight.visible=true;roomLight.position.set(R.ox+R.iw/2,R.y+2.2,R.oz+R.id/2);roomLight.distance=Math.max(9,R.iw*1.2);zoneEl.textContent=R.name;zoneEl.classList.remove('show');void zoneEl.offsetWidth;zoneEl.classList.add('show');zoneNow=R.name;}
  else{SEE.inKeep=0;roomLight.visible=false;}}
function setRoom(R){if(R&&R.inPlace||room&&room.inPlace&&!R){return;}if(R&&!R.group)buildRoom(R);if(room)room.group.visible=false;room=R;if(R)R.group.visible=true;sea.visible=!R;if(R){scene.fog.color.setHex(0x07090b);scene.background.setHex(0x07090b);scene.fog.density=.05;}
  hemi.intensity=R?(R.iw>15?1:.6):.75;moon.intensity=R?.12:.6;roomLight.visible=!!R;if(R){roomLight.position.set(R.ox+R.iw/2,R.iw>15?4.5:2.6,R.oz+R.id/2);roomLight.distance=Math.max(12,R.iw*1.1);}flies.forEach(f=>f.visible=!R);
  if(R){zoneEl.textContent=R.name;zoneEl.classList.remove('show');void zoneEl.offsetWidth;zoneEl.classList.add('show');zoneNow=R.name;}}
