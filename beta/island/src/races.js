// ---------- peoples of the world ----------
// The nine DNDIGRA peoples from the design plan (humans, elves, dwarves, goblins,
// tidal, shelled, symbiont, twilight and echo folk) plus the remaining rulebook
// ancestries. Each has one passive trait and one situational edge, its own build
// and look (height, ears, horns, tusks, scales, growths), and no locked class.
const RACES={
  human:{n:'Человек',group:'Народы мира',size:1,skins:null,mods:{stealth:1,athletics:1},
    passive:'Быстрое освоение: +1 к Скрытности и Атлетике.',edge:'Свой среди своих: жители охотнее делятся слухами.',pref:'любой класс'},
  elf:{n:'Эльф',group:'Народы мира',size:1,ears:'long',skins:['#f2d4b4','#e3bb8a','#c58d64'],mods:{stealth:2},
    passive:'Чуткий шаг: +2 к Скрытности.',edge:'Якорь памяти: раз до отдыха следующая атака с преимуществом.',pref:'следопыт, маг, бард',echo:true},
  dwarf:{n:'Дворф',group:'Народы мира',size:.82,wide:1.12,beard:'full',skins:['#e9bf90','#d9a577','#a8714d'],mods:{hp:3,athletics:1},
    passive:'Плотное тело: +3 к здоровью.',edge:'Резонанс камня: в руинах и подземельях +1 к КД.',pref:'воин, жрец, паладин'},
  goblin:{n:'Гоблин',group:'Народы мира',size:.72,ears:'long',skins:['#7a9a4a','#8aa85a','#6a8a5a'],mods:{stealth:2,speed:1},
    passive:'Юркость: +1 к скорости и +2 к Скрытности.',edge:'Нюх: замечает засады раньше, враги видят хуже.',pref:'плут, следопыт, бард'},
  tidal:{n:'Приливный народ',group:'Народы мира',size:1,skins:['#6a9aa8','#5a8a9a','#7aaab0'],fins:true,mods:{athletics:2},
    passive:'Двойное дыхание: +2 к Атлетике.',edge:'Дитя прибоя: у воды и на причале +1 к атаке.',pref:'воин, друид, следопыт'},
  shell:{n:'Панцирный народ',group:'Народы мира',size:1.02,shell:true,skins:['#a89a80','#8a7a62','#b8a888'],mods:{ac:1},
    passive:'Природные пластины: +1 к КД.',edge:'Спрятаться в панцирь: раз до отдыха урон по вам вдвое меньше.',pref:'воин, паладин, монах'},
  symbiont:{n:'Народ-симбионт',group:'Народы мира',size:1,sprouts:true,skins:['#c8b890','#a8b880','#d8c8a0'],mods:{},
    passive:'Биологическое чутьё: зелья и травы лечат на 3 больше.',edge:'Ответная адаптация: после отравления — стойкость к яду.',pref:'друид, жрец, следопыт'},
  twilight:{n:'Сумеречный народ',group:'Народы мира',size:.96,ears:'small',bigEyes:true,skins:['#c8c4d8','#a8a4c0','#d8d0e0'],mods:{stealth:1},
    passive:'Чтение движения: ночью враги видят вас хуже.',edge:'Глаза сумерек: ночью +2 к Скрытности.',pref:'плут, колдун, следопыт'},
  echo:{n:'Эхоносец',group:'Народы мира',size:1,motes:true,skins:['#e9bf90','#d8d0c8','#c8b8a8'],mods:{},
    passive:'Чувство резонанса: видит магические следы.',edge:'Проявить фрагмент: раз до отдыха следующая атака с преимуществом.',pref:'бард, колдун, чародей',echo:true},
  halfling:{n:'Полурослик',group:'Из книги правил',size:.7,skins:['#f2d4b4','#e9bf90','#c58d64'],mods:{stealth:2},
    passive:'Везение: выпавшую единицу на d20 можно перебросить.',edge:'Проворство: проходит мимо крупных врагов.',pref:'плут, бард, следопыт',lucky:true},
  gnome:{n:'Гном',group:'Из книги правил',size:.68,ears:'pointed',skins:['#f2d4b4','#e3bb8a','#c58d64'],mods:{stealth:2},
    passive:'Хитрость гнома: +2 к Скрытности.',edge:'Смекалка: заклинания этого героя на +1 точнее.',pref:'маг, бард, плут',spell:1},
  goliath:{n:'Голиаф',group:'Из книги правил',size:1.16,wide:1.08,marks:['warpaint'],skins:['#a8a4a0','#8a8680','#b8b0a8'],mods:{hp:2,athletics:2},
    passive:'Мощное сложение: +2 к здоровью и Атлетике.',edge:'Каменная стойкость: раз до отдыха удар слабее на 1к12+2.',pref:'варвар, воин, монах',stone:true},
  orc:{n:'Орк',group:'Из книги правил',size:1.06,tusks:true,skins:['#7a8a5a','#6a7a52','#8a9a6a','#9a8a7a'],mods:{athletics:2},
    passive:'Сила рывка: +2 к Атлетике.',edge:'Неукротимость: раз до отдыха остаётся на ногах с 1 здоровья.',pref:'варвар, воин, паладин',relentless:true},
  tiefling:{n:'Тифлинг',group:'Из книги правил',size:1,horns:true,tail:true,skins:['#b0453f','#8a3a5a','#a85a8a','#c86a5a'],mods:{},
    passive:'Адское наследие: отвечает огнём на удары (раз до отдыха 2к6).',edge:'Тёмное зрение: ночью видит дальше.',pref:'колдун, чародей, бард',rebuke:true},
  dragonborn:{n:'Драконорождённый',group:'Из книги правил',size:1.04,snout:true,horns:'ridge',tail:true,skins:['#b8862a','#3a8a5a','#a83a2a','#3a6aa8','#c8c8d0'],mods:{hp:1},
    passive:'Чешуя: +1 к здоровью.',edge:'Дыхание дракона: раз до отдыха 2к6 огня по врагу вблизи.',pref:'паладин, воин, чародей',breath:true}};
const RACE_ORDER=['human','elf','dwarf','goblin','tidal','shell','symbiont','twilight','echo','halfling','gnome','goliath','orc','tiefling','dragonborn'];
const hx=c=>parseInt(String(c).replace('#',''),16);
const shadeC=(c,k)=>{const r=(c>>16)&255,g=(c>>8)&255,b=c&255;return (Math.min(255,r*k)<<16)|(Math.min(255,g*k)<<8)|Math.min(255,b*k);};
// race appearance on top of an appearance object (editor and villagers)
function raceAppearance(race,ap){const R=RACES[race]||RACES.human,o=JSON.parse(JSON.stringify(ap));if(R.ears)o.ears=R.ears;if(R.beard&&o.gender!=='female'&&(!o.beard||o.beard==='none'))o.beard=R.beard;
  if(R.marks)o.marks=[...new Set([...(o.marks||[]),...R.marks])];if(R.skins&&!R.skins.includes(o.skin))o.skin=R.skins[0];if(R.bigEyes){o.eyes='big';o.eye=o.eye==='#14141a'?'#8a6af0':o.eye;}return o;}
// extra boxes for horns, tusks, fins, shells, growths and tails; then the build is scaled
function raceDecorate(race,boxes,ap){const R=RACES[race]||RACES.human,out=boxes.slice(),skin=hx(ap&&ap.skin||'#e9bf90'),B=(x,y,z,w,h,d,c,e)=>out.push([x,y,z,w,h,d,c,!!e]);
  if(R.horns===true){const c=0x3a2a2a;for(const s of [-1,1]){B(s*.15,1.27,.05,.07,.1,.07,c);B(s*.19,1.35,0,.06,.09,.06,c);B(s*.22,1.42,-.04,.05,.07,.05,shadeC(c,1.4));}}
  if(R.horns==='ridge'){for(let i=0;i<4;i++)B(0,1.27-i*.02,-.06-i*.07,.06,.08,.06,shadeC(skin,.7));for(const s of [-1,1])B(s*.17,1.24,-.12,.05,.07,.12,shadeC(skin,.6));}
  if(R.snout){B(0,.84,.29,.26,.14,.14,skin);B(0,.8,.37,.22,.08,.04,shadeC(skin,.85));for(const s of [-1,1])B(s*.06,.88,.36,.03,.02,.02,0x1a1410);}
  if(R.tusks)for(const s of [-1,1])B(s*.07,.79,.25,.03,.06,.03,0xf0ead8);
  if(R.fins)for(const s of [-1,1]){B(s*.27,1.02,-.04,.03,.18,.16,shadeC(skin,.8));B(s*.28,1.12,-.08,.02,.08,.1,shadeC(skin,.65));B(s*.23,.86,.12,.02,.07,.02,shadeC(skin,.6));}
  if(R.shell){const c=shadeC(skin,.75);B(0,.55,-.2,.4,.3,.08,c);B(0,.46,-.23,.32,.12,.06,shadeC(c,.85));for(const s of [-1,1])B(s*.24,.66,0,.12,.06,.26,c);}
  if(R.sprouts){const lf=0x4a8a3a;B(-.12,1.29,.02,.1,.04,.14,lf);B(.08,1.31,-.04,.08,.05,.1,0x6aaa4a);B(.15,1.28,.06,.06,.06,.06,0xc8a868);B(.15,1.32,.06,.12,.03,.12,0xb86a4a);
    for(const s of [-1,1])B(s*.22,.7,.05,.06,.04,.06,lf);B(-.1,.6,.15,.02,.14,.01,0x5a9a4a);}
  if(R.tail){const c=R.snout?skin:shadeC(skin,.8);B(0,.32,-.2,.06,.06,.16,c);B(0,.26,-.3,.05,.05,.12,c);B(0,.22,-.38,.04,.04,.1,R.snout?shadeC(skin,.7):0x2a1a1a);}
  if(R.motes)for(let i=0;i<4;i++){const a=i*1.57;B(Math.cos(a)*.38,.5+i*.18,Math.sin(a)*.3,.04,.04,.04,0x9ae0ff,true);}
  return out;}
// height and build are a scale on the finished model, so the skeleton split stays right
function raceScale(race,model){const R=RACES[race]||RACES.human,sy=R.size,sx=(R.wide||1)*(sy<1?Math.max(.82,sy+.08):sy);model.scale.set(sx,sy,sx);return model;}
// race numbers onto the hero sheet
function applyRace(H,race){const R=RACES[race]||RACES.human,m=R.mods||{};H.race=race;H.raceName=R.n;
  for(const k of ['hp','ac','stealth','athletics','speed'])if(m[k])H[k]=(H[k]||0)+m[k];if(R.spell)H.spell+=R.spell;return H;}
