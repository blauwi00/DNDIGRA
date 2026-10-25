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
  broom:[[0,.2,0,.04,.54,.04,0x8a6a40],[0,.52,0,.18,.16,.08,0xc8a858],[0,.61,0,.2,.04,.09,0xa88a40]],
  hoe:[[0,.26,0,.04,.66,.04,0x6a4426],[0,.6,.05,.12,.05,.12,0x8a8e94]],
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
function villagerBoxes(name,look,extra){const C=window.Characters;if(!C)return recolor(styleHair(MODELS['fighter-male'],look.style),look);
  const gender=FEMALE.test(name.split(' ').pop())||/Марта|Агна|Хильда/.test(name)?'female':'male',cls=['rogue','cleric','rogue','fighter'][Math.floor(hash2(name.length,name.charCodeAt(0))*4)];
  const ap=C.randomLook(cls,gender,()=>hash2(name.charCodeAt(1)||3,Math.random()*1e3));ap.cape='none';ap.outfit={rogue:['tunic','vest'],cleric:['monk','surplice'],fighter:['leather','tabard']}[cls][Math.random()<.5?0:1];
  if(ap.headgear==='helm'||ap.headgear==='crown'||ap.headgear==='wizhat')ap.headgear='none';if(extra)Object.assign(ap,extra);return C.build(C.spec('hero',{classId:cls,appearance:ap}));}
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

