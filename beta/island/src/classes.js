// ---------- the twelve classes (SRD 5.2.1 names) ----------
// Each class: sheet numbers, a starting kit (the fighter chooses one of three, as in
// the design plan), the look it starts with (the game's builder class plus a patch),
// cantrips that are always available, and its once-or-twice-per-rest abilities.
const CLASSES={
  fighter:{n:'Воин',role:'тактик с оружием',hp:20,ac:13,speed:6,melee:5,mb:3,ranged:3,rb:1,spell:1,stealth:1,athletics:5,dex:1,
    kits:[{n:'Меч и щит',L:'shield',R:'sword'},{n:'Копьё',L:null,R:'spear'},{n:'Двуручный молот',L:'warhammer',R:null}],look:{g:'fighter',p:{}},
    about:'Мастер оружия. Второе дыхание: бонусом лечит 1к10 + 2 раз до отдыха. Толчком сбивает врагов с ног.'},
  barbarian:{n:'Варвар',role:'ярость и мощь',hp:24,ac:13,speed:6,melee:5,mb:3,ranged:2,rb:1,spell:0,stealth:0,athletics:6,dex:1,
    kits:[{n:'Секира',L:'greataxe',R:null}],look:{g:'fighter',p:{outfit:'leather',cape:'none',marks:['warpaint'],headgear:'none'}},
    about:'Ярость (бонус, 2 раза до отдыха): +2 к урону вблизи и вдвое меньше урона до конца боя.'},
  bard:{n:'Бард',role:'слово и песня',hp:16,ac:13,speed:6,melee:4,mb:2,ranged:4,rb:2,spell:5,stealth:3,athletics:1,dex:2,
    kits:[{n:'Кинжал',L:null,R:'dagger'}],look:{g:'rogue',p:{outfit:'vest',cape:'short',accessories:['earring'],headgear:'cap'}},
    cantrips:[{n:'Насмешка',die:6,range:6,save:'wis',effect:'distract'}],
    about:'Язвительная насмешка ранит словом и сбивает врага. Вдохновение (бонус, 2 раза): следующая атака с преимуществом.'},
  cleric:{n:'Жрец',role:'вера и свет',hp:18,ac:14,speed:6,melee:4,mb:2,ranged:2,rb:0,spell:4,stealth:0,athletics:3,dex:0,
    kits:[{n:'Булава и щит',L:'shield',R:'mace'}],look:{g:'cleric',p:{}},cantrips:[{n:'Священное пламя',die:8,range:6,save:'dex'}],
    about:'Священное пламя бьёт без броска атаки. Лечащее слово (бонус, 2 раза): 1к4 + 3.'},
  druid:{n:'Друид',role:'сила природы',hp:16,ac:12,speed:6,melee:3,mb:1,ranged:2,rb:0,spell:5,stealth:2,athletics:1,dex:1,
    kits:[{n:'Посох',L:'staff',R:null}],look:{g:'wizard',p:{outfit:'mantle',cloth:'#2d4f2c',headgear:'circlet',gem:'#4fd08a'}},
    about:'Посох бросает Искру. Опутывание (раз до отдыха): лозы валят врага, по нему бьют с преимуществом.'},
  monk:{n:'Монах',role:'кулак и дух',hp:16,ac:15,speed:7,melee:5,mb:3,ranged:3,rb:1,spell:1,stealth:4,athletics:4,dex:3,unarmed:6,
    kits:[{n:'Голые руки',L:null,R:null}],look:{g:'cleric',p:{outfit:'monk',hairStyle:'bald',accessories:['bracers']}},
    about:'Боевые искусства: удар рукой 1к6. Шквал ударов (бонус, 2 раза): ещё один удар. Быстрее всех на ногу.'},
  paladin:{n:'Паладин',role:'клятва и кара',hp:20,ac:14,speed:6,melee:5,mb:3,ranged:2,rb:0,spell:3,stealth:0,athletics:4,dex:0,
    kits:[{n:'Меч и щит',L:'shield',R:'sword'}],look:{g:'fighter',p:{outfit:'knight',cape:'long',capeColor:'#e6dcc4',trim:'#d0a94a'}},
    about:'Божественная кара (2 раза): удар с +2к8 света. Наложение рук (раз до отдыха): лечит 2к4 + 4.'},
  ranger:{n:'Следопыт',role:'след и лук',hp:18,ac:14,speed:6,melee:4,mb:2,ranged:5,rb:3,spell:1,stealth:5,athletics:3,dex:3,
    kits:[{n:'Лук',L:'bow',R:null,bag:['dagger']}],look:{g:'rogue',p:{outfit:'leathers',headgear:'hood',cape:'short',cloth:'#3f6b3b'}},
    about:'Меткий стрелок. Метка охотника (бонус, на бой): +1к6 к урону по отмеченной цели.'},
  rogue:{n:'Плут',role:'тень и клинок',hp:16,ac:14,speed:6,melee:5,mb:3,ranged:5,rb:3,spell:1,stealth:7,athletics:2,dex:3,
    kits:[{n:'Кинжал и лук',L:null,R:'dagger',bag:['bow']}],look:{g:'rogue',p:{}},
    about:'Скрытая атака: +2к6 урона при преимуществе. Рывок: бонусом ещё 6 клеток.'},
  sorcerer:{n:'Чародей',role:'магия в крови',hp:14,ac:12,speed:6,melee:2,mb:0,ranged:2,rb:0,spell:5,stealth:2,athletics:0,dex:2,
    kits:[{n:'Кинжал',L:null,R:'dagger'}],look:{g:'wizard',p:{outfit:'scholar',cloth:'#b0452f',cloth2:'#6a2330',gem:'#e0475a',eyes:'sparkle'}},
    cantrips:[{n:'Огненный снаряд',die:10,range:8}],
    about:'Огненный снаряд на 8 клеток. Волшебная стрела (2 раза): три снаряда без промаха.'},
  warlock:{n:'Колдун',role:'договор с силой',hp:16,ac:12,speed:6,melee:3,mb:1,ranged:2,rb:0,spell:5,stealth:3,athletics:1,dex:2,
    kits:[{n:'Кинжал',L:null,R:'dagger'}],look:{g:'wizard',p:{outfit:'robe',cloth:'#2a2a30',gem:'#a86bf0',headgear:'hood',eye:'#6a3fa0'}},
    cantrips:[{n:'Мистический заряд',die:10,range:8}],
    about:'Мистический заряд на 8 клеток. Порча (бонус, на бой): +1к6 к урону по проклятой цели.'},
  mage:{n:'Волшебник',role:'книга и посох',hp:14,ac:12,speed:6,melee:2,mb:0,ranged:2,rb:0,spell:5,stealth:2,athletics:0,dex:2,
    kits:[{n:'Посох',L:'staff',R:null}],look:{g:'wizard',p:{}},
    about:'Искра из посоха на 6 клеток. Магическая стрела (2 раза до отдыха): три снаряда без промаха.'}};
const CLASS_ORDER=['fighter','barbarian','paladin','monk','ranger','rogue','bard','cleric','druid','sorcerer','warlock','mage'];
for(const k in CLASSES)CLASSES[k].start=[CLASSES[k].kits[0].L,CLASSES[k].kits[0].R];
let HERO=Object.assign({cls:'fighter'},CLASSES.fighter);
// per-rest uses; refilled by entering any house
const SP={};const rest=()=>Object.assign(SP,{wind:1,missiles:2,word:2,rage:2,inspire:2,smite:2,flurry:2,hands:1,entangle:1,breath:1,echo:1,shellUp:1,stone:1,relentless:1,rebuke:1});rest();
const WEAP={sword:['Меч',8,1],dagger:['Кинжал',4,1],mace:['Булава',6,1],torch:['Факел',4,1],spear:['Копьё',8,2],greataxe:['Секира',12,1],warhammer:['Молот',10,1]};
// attack options: weapons in hand, then the class's cantrips
function heroAttacks(){const h=hero.userData.held||{},o=[],H=HERO;
  const add=(id,n,hit,die,k,b,range,kind,hand,extra)=>o.push(Object.assign({id,n,hit,die,k,b,range,kind,hand},extra||{}));
  if(h.two==='bow')add('bow','Лук',H.ranged,8,1,H.rb,8,'bow','обе руки');
  if(h.two==='staff'){add('staff','Искра',H.spell,10,1,0,6,'spell','посох');add('staff','Посох',H.melee,6,1,H.mb,1,'melee','обе руки');}
  if(h.two==='greataxe'||h.two==='warhammer'){const w=WEAP[h.two];add(h.two,w[0],H.melee,w[1],1,H.mb,1,'melee','обе руки');}
  for(const [side,id] of [['правая',h.R],['левая',h.L]]){const w=WEAP[id];if(w&&!['greataxe','warhammer'].includes(id))add(id,w[0],H.melee-(id==='torch'?1:0),w[1],1,H.mb,w[2],'melee',side);}
  if(!o.length&&(h.L==='shield'||h.R==='shield'))add('shield','Щит',H.melee-2,4,1,1,1,'melee','левая');
  if(!o.some(a=>a.kind==='melee'))add(null,H.unarmed?'Удар рукой':'Кулак',H.unarmed?H.melee:H.melee-2,H.unarmed||1,1,H.unarmed?H.mb:1,1,'melee','без оружия');
  for(const c of H.cantrips||[])add(null,c.n,H.spell,c.die,1,0,c.range,'spell','заклинание',c.save?{save:c.save,effect:c.effect}:null);
  return o;}
function heroAC(){const h=hero.userData.held||{};return HERO.ac+((h.L==='shield'||h.R==='shield')?2:0)+(HERO.race==='dwarf'&&room==null&&Math.hypot(H0.x-Z.ruins[0],H0.z-Z.ruins[1])<9?1:0);}
