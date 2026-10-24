// ---------- peoples of the world ----------
// The nine DNDIGRA peoples from the design plan (humans, elves, dwarves, goblins,
// tidal, shelled, symbiont, twilight and echo folk) plus the remaining rulebook
// ancestries. Each has one passive trait and one situational edge, its own build
// and look (height, ears, horns, tusks, scales, growths), and no locked class.
const RACES={
  human:{n:'Человек',group:'Народы мира',size:1,skins:null,main:{trade:1},
    passive:'Торговая жилка: торговцы продают на 20% дешевле и покупают на 25% дороже.',edge:'Свой среди своих: подработки у жителей платят в полтора раза больше.',pref:'любой класс'},
  elf:{n:'Эльф',group:'Народы мира',size:1.04,ears:'long',skins:['#f2d4b4','#e3bb8a','#c58d64'],main:{ranged:2},
    passive:'Меткий глаз: +2 к попаданию из лука.',edge:'Якорь памяти: раз до отдыха следующая атака с преимуществом.',pref:'следопыт, маг, бард',echo:true},
  dwarf:{n:'Дворф',group:'Народы мира',size:.82,wide:1.12,beard:'full',skins:['#e9bf90','#d9a577','#a8714d'],main:{hp:5},
    passive:'Плотное тело: +5 к здоровью.',edge:'Резонанс камня: в руинах, на кладбище и в домах +1 к защите.',pref:'воин, жрец, паладин'},
  goblin:{n:'Гоблин',group:'Народы мира',size:.72,ears:'long',skins:['#7a9a4a','#8aa85a','#6a8a5a'],main:{stealth:3,sneakK:.7},
    passive:'Юркость: +3 к Скрытности, а крадущегося гоблина враги видят на 30% ближе.',edge:'Ускользнуть: раз до отдыха, когда враг вас замечает, вы успеваете скрыться.',pref:'плут, следопыт, бард',slip:true},
  tidal:{n:'Приливный народ',group:'Народы мира',size:1,skins:['#6a9aa8','#5a8a9a','#7aaab0'],fins:true,main:{athletics:3},
    passive:'Сила прилива: +3 к Атлетике — толчок валит почти любого.',edge:'Дитя прибоя: у моря и под дождём +1 к попаданию.',pref:'воин, друид, следопыт',surf:true},
  shell:{n:'Панцирный народ',group:'Народы мира',size:1.02,shell:true,skins:['#a89a80','#8a7a62','#b8a888'],main:{ac:2},
    passive:'Природные пластины: +2 к защите.',edge:'Спрятаться в панцирь: раз до отдыха урон по вам вдвое меньше.',pref:'воин, паладин, монах'},
  symbiont:{n:'Народ-симбионт',group:'Народы мира',size:1,sprouts:true,skins:['#c8b890','#a8b880','#d8c8a0'],main:{heal:3},
    passive:'Симбиоз: любое лечение — зелья, хлеб, заклинания — даёт +3 здоровья.',edge:'Живая ткань: вне боя восстанавливает 1 здоровье каждые 20 секунд.',pref:'друид, жрец, следопыт',regen:true},
  twilight:{n:'Сумеречный народ',group:'Народы мира',size:.96,ears:'small',bigEyes:true,skins:['#c8c4d8','#a8a4c0','#d8d0e0'],main:{night:1},
    passive:'Глаза сумерек: ночью враги видят вас вдвое ближе, а Скрытность +2.',edge:'Чтение движения: первая атака врага по вам в каждом бою — с помехой.',pref:'плут, колдун, следопыт',readMove:true},
  echo:{n:'Эхоносец',group:'Народы мира',size:1,motes:true,skins:['#d8d0c8','#c8c0d0','#b8b0c0'],main:{spell:2},
    passive:'Резонанс: +2 к заклинаниям — точнее и труднее устоять.',edge:'Проявить фрагмент: раз до отдыха проваленная атака перебрасывается сама.',pref:'бард, колдун, чародей',reroll:true},
  halfling:{n:'Полурослик',group:'Из книги правил',size:.7,skins:['#f2d4b4','#e9bf90','#c58d64'],main:{bag:2},
    passive:'Глубокие карманы: в сумке 10 мест вместо 8.',edge:'Везение: выпавшая единица на d20 перебрасывается.',pref:'плут, бард, следопыт',lucky:true},
  gnome:{n:'Гном',group:'Из книги правил',size:.68,ears:'pointed',nose:true,skins:['#f2d4b4','#e3bb8a','#c58d64'],main:{init:5},
    passive:'Быстрый ум: +5 к инициативе — чаще ходит первым.',edge:'Смекалка: камень слышно вдвое дальше, а отвлечённый враг теряет два хода.',pref:'маг, бард, плут',clever:true},
  goliath:{n:'Голиаф',group:'Из книги правил',size:1.16,wide:1.08,stoneMarks:true,marks:['warpaint'],skins:['#a8a4a0','#8a8680','#b8b0a8'],main:{mdmg:2},
    passive:'Мощь: +2 к урону в ближнем бою.',edge:'Каменная стойкость: раз до отдыха удар слабее на 1к12 + 2.',pref:'варвар, воин, монах',stone:true},
  orc:{n:'Орк',group:'Из книги правил',size:1.06,tusks:true,skins:['#7a8a5a','#6a7a52','#8a9a6a','#9a8a7a'],main:{melee:2},
    passive:'Натиск: +2 к попаданию в ближнем бою.',edge:'Неукротимость: раз до отдыха остаётся на ногах с 1 здоровья.',pref:'варвар, воин, паладин',relentless:true},
  tiefling:{n:'Тифлинг',group:'Из книги правил',size:1,horns:true,tail:true,skins:['#b0453f','#8a3a5a','#a85a8a','#c86a5a'],main:{speed:2},
    passive:'Адская прыть: в бою на 2 клетки дальше за ход.',edge:'Адский отпор: раз до отдыха отвечает на удар огнём 2к6.',pref:'колдун, чародей, бард',rebuke:true},
  dragonborn:{n:'Драконорождённый',group:'Из книги правил',size:1.04,snout:true,horns:'ridge',tail:true,skins:['#b8862a','#3a8a5a','#a83a2a','#3a6aa8','#c8c8d0'],main:{dr:1},
    passive:'Чешуя: любой удар по вам на 1 слабее.',edge:'Дыхание дракона: раз до отдыха 2к6 огня по врагу рядом.',pref:'паладин, воин, чародей',breath:true}};
const RACE_ORDER=['human','elf','dwarf','goblin','tidal','shell','symbiont','twilight','echo','halfling','gnome','goliath','orc','tiefling','dragonborn'];
const hx=c=>parseInt(String(c).replace('#',''),16);
const shadeC=(c,k)=>{const r=(c>>16)&255,g=(c>>8)&255,b=c&255;return (Math.min(255,r*k)<<16)|(Math.min(255,g*k)<<8)|Math.min(255,b*k);};
// race appearance on top of an appearance object (editor and villagers)
function raceAppearance(race,ap){const R=RACES[race]||RACES.human,o=JSON.parse(JSON.stringify(ap));if(R.ears)o.ears=R.ears;if(R.beard&&o.gender!=='female'&&(!o.beard||o.beard==='none'))o.beard=R.beard;
  if(R.marks)o.marks=[...new Set([...(o.marks||[]),...R.marks])];if(R.skins&&!R.skins.includes(o.skin))o.skin=R.skins[0];if(R.bigEyes){o.eyes='big';o.eye=o.eye==='#14141a'?'#8a6af0':o.eye;}return o;}
// extra boxes for horns, tusks, fins, shells, growths and tails; then the build is scaled
function raceDecorate(race,boxes,ap){const R=RACES[race]||RACES.human,out=boxes.slice(),skin=hx(ap&&ap.skin||'#e9bf90'),B=(x,y,z,w,h,d,c,e)=>out.push([x,y,z,w,h,d,c,!!e]),D=(x,y,z,w,h,d,c,e)=>out.push([x,y,z,w,h,d,c,!!e,'f']);
  // features that stick out past the hair are pinned to the head, so they are never dropped or hidden
  const H=(x,y,z,w,h,d,c,e)=>{const b=[x,y,z,w,h,d,c,!!e];b.part='head';out.push(b);};
  if(R.horns===true){const c=0x3a2a2a;for(const s of [-1,1]){B(s*.15,1.27,.05,.07,.1,.07,c);B(s*.19,1.35,0,.06,.09,.06,c);B(s*.22,1.42,-.04,.05,.07,.05,shadeC(c,1.4));}}
  if(R.horns==='ridge'){for(let i=0;i<4;i++)B(0,1.27-i*.02,-.06-i*.07,.06,.08,.06,shadeC(skin,.7));for(const s of [-1,1])B(s*.17,1.24,-.12,.05,.07,.12,shadeC(skin,.6));}
  if(R.snout){B(0,.84,.29,.26,.14,.14,skin);B(0,.8,.37,.22,.08,.04,shadeC(skin,.85));for(const s of [-1,1])B(s*.06,.88,.36,.03,.02,.02,0x1a1410);}
  if(R.tusks)for(const s of [-1,1])B(s*.07,.79,.25,.03,.06,.03,0xf0ead8);
  if(R.fins)for(const s of [-1,1]){H(s*.31,1.0,-.04,.04,.2,.18,shadeC(skin,.8));H(s*.34,1.1,-.1,.03,.12,.12,shadeC(skin,.65));H(s*.36,.96,-.12,.025,.08,.08,shadeC(skin,.55));}
  if(R.shell){const c=shadeC(skin,.75);B(0,.55,-.2,.4,.3,.08,c);B(0,.46,-.23,.32,.12,.06,shadeC(c,.85));for(const s of [-1,1])B(s*.24,.66,0,.12,.06,.26,c);}
  if(R.sprouts){const lf=0x4a8a3a;B(-.12,1.29,.02,.1,.04,.14,lf);B(.08,1.31,-.04,.08,.05,.1,0x6aaa4a);B(.15,1.28,.06,.06,.06,.06,0xc8a868);B(.15,1.32,.06,.12,.03,.12,0xb86a4a);
    for(const s of [-1,1])B(s*.22,.7,.05,.06,.04,.06,lf);B(-.1,.6,.15,.02,.14,.01,0x5a9a4a);}
  if(R.tail){const c=R.snout?skin:shadeC(skin,.8);B(0,.32,-.2,.06,.06,.16,c);B(0,.26,-.3,.05,.05,.12,c);B(0,.22,-.38,.04,.04,.1,R.snout?shadeC(skin,.7):0x2a1a1a);}
  if(R.ears==='long')for(const s of [-1,1]){H(s*.3,.97,0,.05,.1,.07,skin);H(s*.345,1.03,-.02,.05,.09,.05,skin);H(s*.385,1.1,-.045,.04,.08,.04,shadeC(skin,.92));H(s*.415,1.16,-.06,.03,.06,.03,shadeC(skin,.85));}
  if(R.ears==='pointed')for(const s of [-1,1]){H(s*.3,.96,0,.05,.09,.06,skin);H(s*.34,1.01,-.02,.04,.07,.04,shadeC(skin,.9));}
  if(R.nose)B(0,.9,.27,.07,.07,.06,shadeC(skin,.92));
  if(R.fins){for(let i=0;i<5;i++)H(0,1.29+Math.sin(i/4*Math.PI)*.06,.12-i*.08,.03,.1,.07,shadeC(skin,.75+i*.03));for(const s of [-1,1])for(let i=0;i<3;i++)D(s*.2,.86+i*.03,.248,.06,.012,.006,shadeC(skin,.55));}
  if(R.shell){const c=shadeC(skin,.7);for(const s of [-1,1]){B(s*.26,.7,0,.12,.07,.3,c);B(s*.26,.75,0,.09,.03,.24,shadeC(c,1.2));}for(let i=0;i<3;i++)B(0,.74-i*.13,-.25,.34-i*.04,.11,.05,shadeC(c,1.1-i*.08));}
  if(R.stoneMarks)for(const [x,y] of [[-.17,1.02],[.15,.86],[-.12,.84],[.19,1.06]])D(x,y,.247,.06,.015,.006,shadeC(skin,.7));
  // echo-bearers carry glowing marks on the face, drawn on the skin: nothing hovers beside the body
  if(R.motes){const c=0x7fe8ff;
    for(const s of [-1,1]){D(s*.09,.95,.249,.06,.055,.006,0xaef4ff,true);D(s*.16,.86,.249,.016,.09,.006,c,true);D(s*.16,.81,.249,.04,.016,.006,c,true);}
    D(0,1.08,.249,.03,.05,.006,c,true);D(0,1.13,.249,.07,.015,.006,c,true);}
  return out;}
// height and build are a scale on the finished model, so the skeleton split stays right
function raceScale(race,model){const R=RACES[race]||RACES.human,sy=R.size,sx=(R.wide||1)*(sy<1?Math.max(.82,sy+.08):sy);model.scale.set(sx,sy,sx);return model;}
// race numbers onto the hero sheet
function applyRace(H,race){const R=RACES[race]||RACES.human,m=R.main||{};H.race=race;H.raceName=R.n;
  for(const k of ['hp','ac','melee','ranged','spell','stealth','athletics','speed'])if(m[k])H[k]=(H[k]||0)+m[k];
  // traits that are not plain sheet numbers live on the hero and are read by the systems that use them
  Object.assign(H,{mdmg:m.mdmg||0,dr:m.dr||0,heal:m.heal||0,init:m.init||0,trade:!!m.trade,night:!!m.night,sneakK:m.sneakK||1,bag:m.bag||0});return H;}
// symbiont: living tissue knits outside a fight, one health every 20 seconds
setInterval(()=>{if(typeof H0==='undefined'||paused||CB.on||H0.dead)return;if(RACES[HERO.race]?.regen&&H0.hp<H0.max){H0.hp++;setHP();floatText('+1','#7fe08a',hero);}},20000);
