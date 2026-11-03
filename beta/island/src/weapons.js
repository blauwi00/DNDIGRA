// ---------- weapons: variants, detailed models and icons ----------
// Every weapon belongs to a kind (sword, dagger, axe, mace, hammer, spear, staff, bow,
// shield). Rules look at the kind; the variant sets its numbers, its model and its icon.
// The old ids (sword, staff, bow…) stay as the plain variant of their kind, so saves keep working.
const MT={steel:0xc8ced6,edge:0xf0f3f7,fuller:0x8a929e,dark:0x5e636e,iron:0x7a7e86,bronze:0xb8823a,gold:0xd8b04a,silver:0xdfe4ea,
  leather:0x5a3d28,wrap:0x2e1e14,red:0x7a2420,wood:0x6a4426,oak:0x4a2e18,ash:0x9a7448,bone:0xe2d8bc,boneD:0xa89a78,blue:0x315e84,green:0x2f5a2c};
const WEAPONS={};
const WV=(id,kind,n,o)=>WEAPONS[id]=Object.assign({id,kind,n,die:6,hb:0,db:0,reach:1},o);
// swords
WV('sword','sword','Меч',{die:8,d:'обычный стальной меч, 1к8',m:{len:.48,w:.065,guard:'bar',gc:MT.gold,grip:MT.leather}});
WV('sword_long','sword','Длинный меч',{die:8,hb:1,d:'выкованный мастером, 1к8, +1 к попаданию',m:{len:.6,w:.06,guard:'cross',gc:MT.steel,grip:MT.wrap,wrap:MT.leather,pom:'disc'},
  pal:{g:'#c8ced6',G:'#7a808a',b:'#3a2618',B:'#1e140c'},icon:'longsword'});
WV('sword_short','sword','Короткий меч',{die:6,hb:1,d:'широкий и быстрый, 1к6, +1 к попаданию',m:{len:.34,w:.08,guard:'bar',gc:MT.bronze,grip:MT.leather,pom:'ball',taper:.5},
  pal:{g:'#c88a3a',G:'#7a5020'},icon:'shortsword'});
WV('sword_scimitar','sword','Ятаган',{die:6,hb:1,db:1,d:'изогнутый клинок южан, 1к6 + 1',m:{len:.46,w:.07,guard:'disc',gc:MT.gold,grip:MT.red,curve:.09,pom:'ball'},
  pal:{b:'#8a2a24',B:'#4a1410'},icon:'scimitar'});
WV('sword_rapier','sword','Рапира',{die:8,hb:2,d:'тонкий колющий клинок, 1к8, +2 к попаданию',m:{len:.58,w:.03,guard:'basket',gc:MT.silver,grip:MT.wrap,pom:'ball'},
  pal:{g:'#dfe4ea',G:'#8a9098',b:'#2e1e14',B:'#140c08'},icon:'rapier'});
WV('sword_rune','sword','Рунный клинок',{die:8,hb:1,db:2,d:'тёмная сталь с горящими рунами, 1к8 + 2',m:{len:.54,w:.07,blade:MT.dark,edge:0x9aa4b4,guard:'cross',gc:MT.dark,grip:MT.wrap,pom:'gem',gem:0x6ad0ff,runes:0x6ad0ff},
  pal:{s:'#7a8090',S:'#454a56',g:'#5e636e',G:'#30343c',c:'#7fe0ff'},icon:'runesword'});
// daggers
WV('dagger','dagger','Кинжал',{die:4,d:'лёгкий, 1к4, хорош для скрытой атаки',m:{len:.22,w:.05,guard:'bar',gc:MT.gold,grip:MT.leather}});
WV('dagger_curved','dagger','Кривой нож',{die:4,db:1,d:'нож разбойника, 1к4 + 1',m:{len:.24,w:.055,guard:'none',grip:MT.oak,curve:.05},pal:{g:'#6a4426',G:'#3e2614'},icon:'knife'});
WV('dagger_bone','dagger','Костяной кинжал',{die:4,hb:1,db:1,d:'вырезан из кости морского зверя, 1к4 + 1',m:{len:.22,w:.05,blade:MT.bone,edge:0xfaf4e2,fuller:MT.boneD,guard:'bar',gc:MT.boneD,grip:MT.wrap},
  pal:{s:'#efe6cc',S:'#b0a07a',g:'#b0a07a',G:'#7a6a4a'}});
// axes
WV('axe_hand','axe','Топорик',{die:6,d:'лёгкий топор, 1к6',m:{haft:.5,head:'beard'},icon:'handaxe'});
WV('greataxe','axe','Секира',{die:12,two:1,d:'обе руки, 1к12',m:{haft:.95,head:'broad'}});
WV('greataxe_double','axe','Двуликая секира',{die:12,db:1,two:1,d:'обе руки, два лезвия, 1к12 + 1',m:{haft:.95,head:'double',wrapC:MT.red},icon:'doubleaxe'});
// maces and hammers
WV('mace','mace','Булава',{die:6,d:'дробящая, 1к6',m:{head:'flanged'}});
WV('morningstar','mace','Моргенштерн',{die:8,d:'шипастый шар на рукояти, 1к8',m:{head:'spiked'},icon:'morningstar'});
WV('warhammer','hammer','Молот',{die:10,two:1,d:'обе руки, 1к10',m:{head:'block'}});
WV('maul_stone','hammer','Каменный молот',{die:12,hb:-1,two:1,d:'обе руки, глыба на древке, 1к12, −1 к попаданию',m:{head:'stone'},pal:{S:'#7a7268',s:'#a8a094'}});
// polearms
WV('spear','spear','Копьё',{die:8,reach:2,d:'1к8, достаёт на 2 клетки',m:{head:'leaf'}});
WV('trident','spear','Трезубец',{die:8,hb:1,reach:2,d:'оружие приливного народа, 1к8 на 2 клетки, +1',m:{head:'trident',shaft:MT.ash},icon:'trident'});
WV('halberd','spear','Алебарда',{die:10,reach:2,two:1,d:'обе руки, 1к10 на 2 клетки',m:{head:'halberd'},icon:'halberd'});
// staves: spark is the ranged spell, melee is the shaft
WV('staff','staff','Посох',{die:6,two:1,spark:['Искра',10,6,0],d:'обе руки, Искра 1к10 на 6 клеток',m:{top:'crystal',gem:0x7fd0ff}});
WV('staff_druid','staff','Посох друида',{die:8,two:1,spark:['Шип лозы',8,6,1],d:'живое дерево, Шип лозы 1к8 + 1, посох 1к8',m:{top:'leaves',gem:0x5ae08a,shaft:MT.oak,gnarl:1},
  pal:{c:'#6ae08a',C:'#2a8a4a',b:'#4a2e18',B:'#2a180c'},icon:'druidstaff'});
WV('staff_ember','staff','Посох углей',{die:6,two:1,spark:['Огненная искра',10,6,2],d:'железная клетка с вечным углём, 1к10 + 2',m:{top:'ember',gem:0xff7a2a,shaft:MT.dark},
  pal:{c:'#ffa04a',C:'#c8401a',b:'#5e636e',B:'#30343c'},icon:'emberstaff'});
WV('staff_moon','staff','Лунный посох',{die:6,two:1,spark:['Лунный луч',10,8,0],d:'серебро и лунный камень, луч 1к10 на 8 клеток',m:{top:'moon',gem:0xd8e8ff,shaft:MT.ash},
  pal:{c:'#e8f0ff',C:'#9ab0d8',b:'#9a7448',B:'#6a4a28',g:'#dfe4ea',G:'#8a9098'},icon:'moonstaff'});
WV('staff_bone','staff','Костяной посох',{die:6,hb:1,two:1,spark:['Мертвенный холод',8,6,1],d:'череп с зелёным огнём, холод 1к8 + 1, +1 к попаданию',m:{top:'skull',gem:0x7aff9a,shaft:MT.boneD},
  pal:{c:'#9aff9a',C:'#3aa85a',b:'#a89a78',B:'#6a5e44'},icon:'bonestaff'});
WV('quarterstaff','staff','Боевой шест',{die:8,two:1,d:'обе руки, окованный шест, 1к8',m:{top:'caps',shaft:MT.ash},pal:{b:'#9a7448',B:'#6a4a28'},icon:'quarterstaff'});
// bows
WV('bow','bow','Лук',{die:8,two:1,range:8,long:12,d:'обе руки, 1к8 на 8 клеток, дальше до 12 с помехой',m:{half:.36,bend:.13,c:0x8a5a2e,tip:MT.gold}});
WV('bow_long','bow','Длинный лук',{die:8,hb:1,two:1,range:10,long:14,d:'тисовый, 1к8 на 10 клеток (до 14 с помехой), +1',m:{half:.46,bend:.12,c:0x6a3e1c,tip:MT.bone,wrap:0x3a2416},pal:{w:'#8a5a2e',W:'#5a3418'},icon:'longbow'});
WV('bow_short','bow','Короткий лук',{die:6,hb:1,two:1,range:7,long:10,d:'лёгкий охотничий, 1к6 на 7 клеток (до 10 с помехой), +1',m:{half:.27,bend:.15,c:0xa87a48,tip:MT.leather},pal:{w:'#d0a468',W:'#9a7040'},icon:'shortbow'});
// shields: armour, not weapons, but held and drawn the same way
WV('shield','shield','Щит',{ac:2,d:'+2 к защите',m:{shape:'heater',face:MT.blue,rim:MT.gold}});
WV('shield_round','shield','Круглый щит',{ac:2,d:'дубовые доски и железный обод, +2 к защите',m:{shape:'round',face:0x8a5a2e,rim:MT.iron},icon:'roundshield'});
WV('shield_kite','shield','Каплевидный щит',{ac:2,d:'рыцарский, со знаком острова, +2 к защите',m:{shape:'kite',face:0xe6dcc4,rim:MT.steel,sign:0x8e2a24},
  pal:{o:'#e6dcc4',O:'#a89a80',d:'#c8ced6',g:'#a8302a'},icon:'kiteshield'});
// ---------- rarity (owner decision 2026-10-24, docs/ITEMS.md) ----------
// common: plain gear; uncommon: a craftsman's +1; rare: one rule of its own, from quests and dangerous places;
// legendary: a strong rule, one or two per world; unique: the only one in the universe, born of an artifact
const RARITY={common:{n:'Обычный',c:'#b8ab92',k:1},uncommon:{n:'Необычный',c:'#6ad06a',k:1},rare:{n:'Редкий',c:'#5aa8ff',k:3},legendary:{n:'Легендарный',c:'#ffa03a',k:6},unique:{n:'Единственный',c:'#ff5a7a',k:0}};
WV('dagger_fang','dagger','Клык вожака',{die:4,rar:'rare',first:1,rule:'Первая атака в каждом бою — с преимуществом.',d:'клык волчьего вожака на костяной рукояти, 1к4',
  m:{len:.24,w:.055,blade:MT.bone,edge:0xfaf4e2,fuller:MT.boneD,guard:'none',grip:MT.wrap,curve:.06},pal:{s:'#efe6cc',S:'#b0a07a',g:'#7a6a4a',G:'#4a3e2a'},icon:'knife'});
WV('shield_watch','shield','Щит дозора Заводи',{ac:2,rar:'rare',block:1,rule:'Раз за бой удар по вам не наносит урона.',d:'щит старого дозора, +2 к защите',
  m:{shape:'kite',face:0x2c4a6a,rim:MT.gold,sign:0xe8c27a},pal:{o:'#2c4a6a',O:'#1a3048',d:'#d8b04a',g:'#e8c27a'},icon:'kiteshield'});
WV('mace_saint','mace','Булава упокоения',{die:6,rar:'rare',vs:['Скелет',8],rule:'По нежити +1к8 урона.',d:'освящённая булава часовни, 1к6',m:{head:'flanged'},pal:{S:'#d8d0b0',s:'#f2ecd4'}});
WEAPONS.sword_rune.rar='legendary';WEAPONS.sword_rune.plus=6;WEAPONS.sword_rune.rule='Руны жгут: каждое попадание +1к6 урона.';
// a story item that became the only one of its kind; not a weapon, held in the hand
const SPECIAL={heart:{n:'Пламенное сердце',rar:'unique',max:1,d:'сердце огня часовни, тёплое, как живое',rule:'В руке: Огненная буря (действие, раз до отдыха) — 3к6 огня всем врагам в 2 клетках; спасбросок Ловкости — половина.'}};
const rarityOf=id=>{const W=WEAPONS[id];if(W)return W.rar||((W.hb||0)+(W.db||0)>0?'uncommon':'common');return SPECIAL[id]?.rar||'common';};
const ruleOf=id=>(WEAPONS[id]||SPECIAL[id]||{}).rule||'';
const kindOf=id=>id&&WEAPONS[id]?WEAPONS[id].kind:id;
const isWeapon=id=>!!(id&&WEAPONS[id]);

// ---------- texel materials ----------
// Each box gets a small pixel-noise texture tinted by its colour, so no face is a flat fill.
const TEXEL=(()=>{const c=document.createElement('canvas');c.width=c.height=8;const x=c.getContext('2d');let s=7;const r=()=>(s=(s*16807)%2147483647)/2147483647;
  for(let j=0;j<8;j++)for(let i=0;i<8;i++){const v=Math.round(205+r()*50-(i===0||j===0?18:0)+(i===7||j===7?10:0));x.fillStyle=`rgb(${v},${v},${v})`;x.fillRect(i,j,1,1);}
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;return t;})();
const WMAT={};const weaponMat=(c,e)=>WMAT[c+(e?'e':'')]||(WMAT[c+(e?'e':'')]=e?new THREE.MeshBasicMaterial({color:c}):new THREE.MeshLambertMaterial({color:c,map:TEXEL}));
const shadeW=(c,k)=>{const r=(c>>16)&255,g=(c>>8)&255,b=c&255;return (Math.min(255,r*k|0)<<16)|(Math.min(255,g*k|0)<<8)|Math.min(255,b*k|0);};

// ---------- models, built around the grip (0,0,0 = fist, +y along the handle) ----------
function weaponBoxes(id){const V=WEAPONS[id],m=V.m||{},o=[],B=(x,y,z,w,h,d,c,e)=>o.push([x,y,z,w,h,d,c,e?1:0]);
  const grip=(y0,len,c,wrap)=>{const n=Math.max(2,Math.round(len/.035));for(let i=0;i<n;i++)B(0,y0+len*(i+.5)/n,0,.05,len/n,.05,i%2&&wrap?wrap:(i%2?shadeW(c,.8):c));};
  const pommel=(y,kind,c,gem)=>{if(kind==='disc'){B(0,y,0,.075,.03,.075,c);B(0,y-.02,0,.05,.02,.05,shadeW(c,.8));}
    else if(kind==='gem'){B(0,y,0,.07,.05,.07,c);B(0,y-.01,.037,.03,.03,.01,gem,1);}else B(0,y,0,.065,.055,.065,c);};
  const shaft=(y0,len,c,gnarl)=>{const n=Math.round(len/.07);for(let i=0;i<n;i++){const t=i/n,x=gnarl?Math.sin(i*1.7)*.008:0;
    B(x,y0+len*(i+.5)/n,0,.048+(gnarl&&i%3===0?.01:0),len/n+.002,.048,i%2?c:shadeW(c,.86));}};
  const k=V.kind;
  if(k==='sword'||k==='dagger'){const len=m.len,w=m.w,bl=m.blade||MT.steel,ed=m.edge||MT.edge,fu=m.fuller||MT.fuller,gc=m.gc||MT.gold,gl=k==='dagger'?.08:.12;
    grip(-gl/2-.01,gl,m.grip||MT.leather,m.wrap);pommel(-gl/2-.03,m.pom,gc,m.gem);
    const g0=gl/2+.005;
    if(m.guard==='bar'){B(0,g0,0,w*2.6,.035,.075,gc);B(0,g0+.022,0,w*1.5,.015,.06,shadeW(gc,.8));}
    if(m.guard==='cross'){B(0,g0,0,w*3.6,.032,.06,gc);for(const s of [-1,1])B(s*w*1.85,g0+.012,0,.03,.055,.065,shadeW(gc,1.1));B(0,g0,.032,.03,.03,.01,m.gem||gc,!!m.gem);}
    if(m.guard==='disc'){B(0,g0,0,w*2,.03,w*2,gc);B(0,g0+.02,0,w*1.4,.012,w*1.4,shadeW(gc,.8));}
    if(m.guard==='basket'){B(0,g0,0,.13,.03,.11,gc);B(.06,g0-.06,0,.018,.12,.09,gc);B(.035,g0-.12,0,.05,.018,.07,gc);B(0,g0+.02,0,.04,.02,.04,shadeW(gc,.8));}
    const seg=Math.max(4,Math.round(len/.05)),y0=g0+.02,taper=m.taper??.35;
    for(let i=0;i<seg;i++){const t=i/seg,ww=w*(1-t*taper*(t>.75?2.2:1)),h=len/seg,y=y0+h*(i+.5),x=(m.curve||0)*t*t;
      B(x,y,0,ww,h+.002,.026,bl);B(x+ww*.42,y,0,ww*.2,h+.002,.018,ed);if(ww>.035&&t<.8)B(x-ww*.05,y,0,ww*.22,h,.03,m.runes&&i%2?m.runes:fu,m.runes&&i%2);}
    const tx=(m.curve||0);B(tx,y0+len+.012,0,w*.4,.03,.02,ed);}
  if(k==='axe'){const H=m.haft,two=V.two;shaft(-.12,H,m.shaft||MT.wood);B(0,-.13,0,.06,.03,.06,MT.iron);if(m.wrapC)for(const y of [.02,.06,.1])B(0,y,0,.056,.02,.056,m.wrapC);
    const top=-.12+H,hy=top-(two?.1:.07);B(0,hy,0,.07,two?.16:.11,.07,MT.iron);
    const blade=(s)=>{const W2=two?.24:.15,Hh=two?.26:.16;for(let i=0;i<4;i++){const t=i/3,x=s*(.05+W2*t*.8),hh=Hh*(.45+t*.55);B(x,hy-(m.head==='beard'?t*.03:0),0,W2*.27,hh,.028,i===3?MT.edge:shadeW(MT.steel,.85+t*.15));}};
    blade(1);if(m.head==='double')blade(-1);else B(-.06,hy,0,.06,.04,.04,MT.dark);B(0,top+.005,0,.05,.03,.05,MT.dark);}
  if(k==='mace'){shaft(-.1,.42,MT.wood);grip(-.1,.12,MT.leather,MT.wrap);B(0,-.12,0,.06,.03,.06,MT.iron);const hy=.36;
    if(m.head==='flanged'){B(0,hy,0,.13,.17,.13,MT.iron);for(let a=0;a<6;a++){const r=Math.PI*a/3;B(Math.cos(r)*.085,hy,Math.sin(r)*.085,.035,.2,.035,a%2?MT.steel:MT.edge);}B(0,hy+.11,0,.07,.04,.07,MT.dark);B(0,hy-.11,0,.08,.04,.08,MT.dark);}
    else{B(0,hy-.08,0,.04,.08,.04,MT.iron);B(0,hy,0,.17,.17,.17,MT.dark);for(const [x,y,z] of [[1,0,0],[-1,0,0],[0,1,0],[0,0,1],[0,0,-1],[.7,.7,0],[-.7,.7,0],[0,.7,.7],[0,.7,-.7],[.7,-.6,.4],[-.7,-.6,-.4]])B(x*.11,hy+y*.11,z*.11,.04,.04,.04,MT.edge);}}
  if(k==='hammer'){shaft(-.12,.95,MT.wood);grip(-.12,.16,MT.leather,MT.wrap);const hy=.74;
    if(m.head==='stone'){B(0,hy,0,.3,.18,.18,0x8a8276);B(.06,hy+.04,.03,.12,.08,.13,0xa8a094);B(-.09,hy-.05,-.02,.1,.07,.15,0x6e675c);for(const y of [-.05,.05])B(0,hy+y,0,.06,.025,.2,MT.leather);}
    else{B(0,hy,0,.26,.13,.13,MT.iron);for(const s of [-1,1])B(s*.135,hy,0,.03,.15,.15,MT.steel);B(0,hy+.08,0,.08,.04,.08,MT.dark);B(0,hy-.09,0,.06,.05,.06,MT.dark);B(0,hy+.12,0,.03,.08,.03,MT.edge);}}
  if(k==='spear'){shaft(-.3,1.18,m.shaft||MT.wood);const top=.88;B(0,top-.02,0,.055,.05,.055,MT.iron);B(0,.0,0,.056,.1,.056,MT.leather);
    if(m.head==='leaf'||m.head==='halberd'){for(let i=0;i<7;i++){const t=i/6,w=.025+Math.sin(Math.min(1,t*1.3)*Math.PI*.9)*.07;B(0,top+.03+i*.045,0,w,.047,.024,i===6?MT.edge:MT.steel);B(w*.4,top+.03+i*.045,0,w*.22,.045,.016,MT.edge);if(i>0&&i<6)B(0,top+.03+i*.045,0,.012,.045,.03,MT.fuller);}}
    if(m.head==='trident'){B(0,top+.02,0,.17,.03,.03,MT.bronze);for(const x of [-.075,0,.075]){B(x,top+.1,0,.025,.15,.022,MT.bronze);B(x,top+.19,0,.035,.035,.02,0xe8c27a);}}
    if(m.head==='halberd'){for(let i=0;i<3;i++)B(.06+i*.04,top-.05,0,.045,.2-i*.03,.024,i===2?MT.edge:MT.steel);B(-.07,top-.06,0,.08,.03,.02,MT.dark);B(-.11,top-.04,0,.02,.06,.02,MT.dark);}}
  if(k==='staff'){const sc=m.shaft||MT.wood;shaft(-.27,.92,sc,m.gnarl);B(0,-.28,0,.056,.03,.056,MT.iron);const top=.65,gm=m.gem;
    if(m.top==='crystal'){B(0,top,0,.12,.05,.12,MT.gold);for(const [x,z] of [[1,1],[-1,1],[1,-1],[-1,-1]])B(x*.05,top+.08,z*.05,.022,.12,.022,MT.gold);B(0,top+.1,0,.08,.12,.08,gm,1);B(0,top+.18,0,.04,.04,.04,0xffffff,1);}
    if(m.top==='leaves'){for(const [x,y,s] of [[-.05,.04,1],[.05,.08,-1],[-.04,.13,1]])B(x,top+y,0,.045,.07,.045,sc);B(0,top+.12,0,.07,.07,.07,gm,1);
      for(const [x,y,z,c] of [[.07,.02,.03,0x4a8a3a],[-.08,.08,-.02,0x6aaa4a],[.06,.15,-.03,0x3f7a32],[-.02,.2,.04,0x5a9a4a]])B(x,top+y,z,.07,.035,.05,c);}
    if(m.top==='ember'){B(0,top,0,.11,.04,.11,MT.dark);for(const [x,z] of [[1,0],[-1,0],[0,1],[0,-1]])B(x*.055,top+.1,z*.055,.02,.16,.02,MT.iron);B(0,top+.19,0,.13,.025,.13,MT.dark);
      B(0,top+.1,0,.07,.09,.07,gm,1);B(0,top+.11,0,.035,.05,.035,0xffe08a,1);B(.02,top+.25,0,.02,.02,.02,0xff9a2a,1);}
    if(m.top==='moon'){B(0,top,0,.08,.04,.08,MT.silver);for(let i=0;i<7;i++){const a=-1.3+i*.43;B(Math.sin(a)*.11,top+.14-Math.cos(a)*.11,0,.035,.035,.03,MT.silver);}B(0,top+.13,0,.07,.07,.07,gm,1);B(0,top+.13,0,.03,.03,.08,0xffffff,1);}
    if(m.top==='skull'){B(0,top+.08,0,.13,.12,.12,MT.bone);B(0,top,.01,.09,.05,.09,MT.boneD);for(const s of [-1,1])B(s*.032,top+.08,.062,.03,.03,.01,gm,1);B(0,top+.04,.062,.06,.012,.01,0x2a2418);B(0,top+.16,0,.08,.03,.08,shadeW(MT.bone,.9));}
    if(m.top==='caps'){B(0,top-.04,0,.06,.08,.06,MT.iron);B(0,.2,0,.054,.1,.054,MT.leather);}}
  // the limbs are many short segments, each turned along the curve, so the bow reads as one smooth arc
  if(k==='bow'){const h=m.half,bend=m.bend,n=17,zf=t=>bend*(1-t*t)+(m.recurve?Math.max(0,Math.abs(t)-.8)*-.3:0);for(let i=0;i<n;i++){const t=(i/(n-1))*2-1,y=t*h,z=zf(t),dz=(zf(Math.min(1,t+.01))-zf(Math.max(-1,t-.01)))/(.02*h);
      o.push([0,y,z,.055-Math.abs(t)*.015,h*2/(n-1)*1.15,.055-Math.abs(t)*.015,Math.abs(t)>.88?m.tip:(i%2?m.c:shadeW(m.c,.88)),0,Math.atan(dz)]);}
    B(0,0,bend+.005,.08,.13,.08,m.wrap||0x3a2416);B(0,0,bend+.045,.03,.03,.02,MT.gold);B(0,0,0,.014,h*2+.02,.014,0xe8e0c8);}
  if(k==='shield'){const f=m.face,r=m.rim,z=.1;
    if(m.shape==='heater'){B(.04,.06,z,.3,.36,.05,r);B(.04,.06,z+.025,.24,.3,.03,f);B(.04,.06,z+.045,.03,.18,.02,r);B(.04,.1,z+.045,.13,.03,.02,r);}
    if(m.shape==='round'){for(let i=0;i<5;i++){const x=-.12+i*.06+.04,hh=.34-Math.abs(i-2)*.07;B(x,.06,z+.02,.058,hh,.04,i%2?f:shadeW(f,.85));}
      for(const [x,y,w,h] of [[.04,.235,.2,.03],[.04,-.115,.2,.03],[-.135,.06,.03,.2],[.215,.06,.03,.2]])B(x,y,z+.03,w,h,.045,r);B(.04,.06,z+.05,.08,.08,.03,MT.steel);B(.04,.06,z+.065,.04,.04,.02,MT.edge);}
    if(m.shape==='kite'){for(let i=0;i<7;i++){const t=i/6,w=.3*(1-t*t*.85);B(.04,.24-t*.42,z,w,.07,.05,r);B(.04,.24-t*.42,z+.022,w-.04,.065,.03,f);}
      B(.04,.06,z+.042,.03,.36,.02,m.sign);B(.04,.15,z+.042,.18,.03,.02,m.sign);}}
  return o;}
const WBOX={};const heldBoxes=id=>WEAPONS[id]?(WBOX[id]||(WBOX[id]=weaponBoxes(id))):HELD[id];
function heldGroup(id){const grp=new THREE.Group();for(const [x,y,z,w,h,d,c,e,rx] of heldBoxes(id)){const m=new THREE.Mesh(box(w,h,d),weaponMat(c,e));m.position.set(x,y,z);if(rx)m.rotation.x=rx;m.castShadow=true;grp.add(m);}return grp;}

// ---------- 16x16 icons for the variant shapes; colours come from each variant's palette ----------
const WICON={
 longsword:['.............kk.','............ksk.','...........kssk.','..........kssk..','.........kssk...','........kssk....','.......kssk.....','......kssk......','.....kssk.......','.k..kssk........','.kkkSSk.........','..kgGkk.........','..kbkGk.........','.kbBk.kk........','kgGk............','.kk.............'],
 shortsword:['................','................','.........kkk....','........ksssk...','.......ksssk....','......ksssk.....','.....ksssk......','..k.ksssk.......','..kkkSSk........','...kggGk........','...kgGkk........','..kbbk.kk.......','.kbBk...........','kgGk............','.kk.............','................'],
 scimitar:['............k...','...........ksk..','...........ksk..','..........ksSk..','.........ksSk...','........ksSk....','.......ksSk.....','......ksSk......','..k..kssk.......','..kkkSSk........','...kggGk........','...kgGkk........','..kbbk.kk.......','.kbBk...........','kgGk............','.kk.............'],
 rapier:['..............k.','.............kk.','............ks..','...........ks...','..........ks....','.........ks.....','........ks......','.......ks.......','......ks........','..kkkkSk........','.kggGkk.........','.kg.kbk.........','..kkbBk.........','...kbk..........','..kgGk..........','...kk...........'],
 runesword:['............kk..','...........ksk..','..........kcSk..','.........kssk...','........kcSk....','.......kssk.....','......kcSk......','..k..kssk.......','..kkkSSk........','...kggGk........','...kgGkk........','..kbbk.kk.......','.kbBk...........','kcCk............','.kk.............','................'],
 knife:['................','................','..........kk....','.........ksk....','........kssk....','........ksSk....','.......kssk.....','......ksSk......','.....kSSk.......','....kkkk........','...kbBk.........','..kbBk..........','.kbBk...........','.kBk............','..k.............','................'],
 handaxe:['................','.....kkkk.......','....ksssSk......','...kssSSSk......','...ksSSkbk......','....kSk.kbk.....','.....k..kbBk....','.........kbk....','.........kbBk...','..........kbk...','..........kbBk..','...........kbk..','...........kBk..','............k...','................','................'],
 doubleaxe:['.kkk......kkk...','ksssk....ksssk..','kssSSk..kSSssk..','ksSSSkkkkSSSsk..','ksSSSkbbkSSSsk..','kssSSkkkkSSssk..','ksssk.kbk.ksssk.','.kkk..kbBk.kkk..','.......kbk......','.......krk......','.......kbBk.....','.......krk......','........kbk.....','........kBk.....','.........k......','................'],
 morningstar:['...k...k........','....kkk.........','.k.kSssk.k......','..kSsssSk.......','.kkSssSSkk......','..kSSSSSk.......','.k.kSSSk.k......','....kkk.........','...k.kbk.k......','......kbk.......','......kbBk......','.......kbk......','.......kbBk.....','........kgk.....','........kGk.....','.........k......'],
 trident:['k...k...k.......','kk.kk..kk.......','.kgk..kgk.......','.kgGkkgGk.......','..kgggGk........','...kgGk.........','....kbBk........','.....kbBk.......','......kbBk......','.......kbBk.....','........kbBk....','.........kbBk...','..........kbBk..','...........kbBk.','............kBk.','.............k..'],
 halberd:['.....k..........','....ksk.........','....ksk.........','..kkSSk.........','.kssSSbkk.......','.kssSSbBsk......','.ksSSkbBSk......','..kkk.kbBkk.....','.......kbBk.....','........kbBk....','.........kbBk...','..........kbBk..','...........kbBk.','............kbBk','.............kBk','..............k.'],
 druidstaff:['....kk.kk.......','...kgGkgGk......','....kkcCk.......','.kk.kcCCk.kk....','kgGkkbCkkkgGk...','.kkkbBk..kk.....','.....kbBk.......','......kbk.......','......kbBk......','.......kbk......','.......kbBk.....','........kbk.....','........kbBk....','.........kbk....','.........kBk....','..........k.....'],
 emberstaff:['.....k.k.k......','....kdkCkdk.....','....kdcccdk.....','....kdcCCdk.....','....kdkCkdk.....','.....kkdkk......','......kbk.......','......kbBk......','.......kbk......','.......kbBk.....','........kbk.....','........kbBk....','.........kbk....','.........kbBk...','..........kBk...','...........k....'],
 moonstaff:['....kkkk........','...kgk..kk......','..kgk..kcCk.....','..kgk.kcCCk.....','..kgk..kcCk.....','...kgk..kk......','....kgkk........','.....kbk........','......kbBk......','.......kbk......','.......kbBk.....','........kbk.....','........kbBk....','.........kbk....','.........kBk....','..........k.....'],
 bonestaff:['....kkkkk.......','...keeeeek......','...kecekcek.....','...keeeeeek.....','....kekekk......','.....kkkk.......','......kbk.......','......kbBk......','.......kbk......','.......kbBk.....','........kbk.....','........kbBk....','.........kbk....','.........kbBk...','..........kBk...','...........k....'],
 quarterstaff:['....kk..........','...kddk.........','....kbBk........','.....kbBk.......','......kbBk......','.......kbBk.....','.......kssBk....','........kbBk....','.........kbBk...','..........kbBk..','...........kbBk.','............kddk','.............kk.','................','................','................'],
 longbow:['.....kkk........','....kwWk.k......','...kwWk...k.....','...kwk....ke....','..kwWk....ke....','..kwk.....ke....','..kwk.....ke....','..kgk.....ke....','..kgk.....ke....','..kwk.....ke....','..kwk.....ke....','..kwWk....ke....','...kwk....ke....','...kwWk...k.....','....kwWk.k......','.....kkk........'],
 shortbow:['................','..kkk...........','.kWkwk.k........','...kwWk.k.......','....kwk..k......','....kwk..ke.....','....kgk..ke.....','....kgk..ke.....','....kwk..ke.....','....kwk..k......','...kwWk.k.......','.kWkwk.k........','..kkk...........','................','................','................'],
 roundshield:['................','.....kkkkkk.....','...kkddddddkk...','..kdwWwWwWwWdk..','..kdwWwWwWwWdk..','.kdwWwkkkWwWwdk.','.kdwWwksskWwWdk.','.kdwWwksSkWwWdk.','.kdwWwkkkWwWwdk.','..kdwWwWwWwWdk..','..kdwWwWwWwWdk..','...kkddddddkk...','.....kkkkkk.....','................','................','................'],
 kiteshield:['................','..kkkkkkkkkkkk..','..kddddddddddk..','..kdooooggooOdk.','..kdooooggooOdk.','..kdggggggggOdk.','..kdooooggoOOdk.','...kdoooggoOdk..','...kdoooggoOdk..','....kdooggOdk...','....kdooggOdk...','.....kdoOOdk....','......kddk......','.......kk.......','................','................']};
