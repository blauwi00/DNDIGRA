// Проверка процедурной генерации миров (src/worldgen): корректность сцен, связность графа мест, ключи, детерминизм,
// разнообразие по зёрнам и правила взаимодействия (замки, ловушки, диалоги) на подставном хосте.
import assert from 'node:assert/strict';
import {createWorld,generateScene,sceneIds,validateScene,randomSeed,GEN_VERSION,normalizeGen,TOWN_SIZES} from '../src/worldgen/world.js';
import {Runtime} from '../src/worldgen/index.js';
import {hash32,Rng} from '../src/worldgen/rng.js';
import {MAX_LIGHTS} from '../src/worldgen/scene.js';
import {validateAppearance} from '../src/look-options.js';
import {PROP_MODELS,build as buildProp} from '../src/props.js';
import {CATALOG} from '../src/worldgen/furnish.js';

const fp=sc=>hash32(JSON.stringify([sc.tiles.map(r=>r.map(t=>t[0]).join('')),sc.props.map(p=>[p.type,p.cat||'',p.x,p.y])]));
const SIZES=['small','medium','large'],LIMITS={maxProps:420,maxW:96,maxH:64};
let scenes=0,worlds=0;

for(const size of SIZES)for(let i=0;i<5;i++){
  const seed=`тест-${size}-${i}`,plan=createWorld(seed,size);worlds++;
  assert.equal(plan.v,GEN_VERSION);assert.equal(plan.size,size);
  const ids=sceneIds(plan),all=new Map(ids.map(id=>[id,generateScene(plan,id)]));
  // 1. каждая сцена корректна и укладывается в бюджеты
  for(const [id,sc] of all){scenes++;
    const e=validateScene(sc);assert.deepEqual(e,[],`${seed}/${id}: ${e.slice(0,3).join('; ')}`);
    assert.ok(sc.props.length<=LIMITS.maxProps,`${seed}/${id}: предметов ${sc.props.length}`);
    assert.ok(sc.W<=LIMITS.maxW&&sc.H<=LIMITS.maxH,`${seed}/${id}: размер ${sc.W}×${sc.H}`);
    assert.ok(sc.lights.length<=MAX_LIGHTS,`${seed}/${id}: огней ${sc.lights.length}`);
    assert.ok(/^[a-z0-9:-]+$/.test(id)&&id.length<=40,'id сцены: '+id);
    for(const p of sc.props){assert.ok(Number.isInteger(p.x)&&Number.isInteger(p.y),`${id}/${p.id}: дробные координаты`);
      if(p.type==='npc'){assert.ok(p.npc&&p.npc.lines.length>=2&&p.name.includes(' · '),`${id}/${p.id}: житель`);validateAppearance({...p.npc.look},p.npc.classId);}
      if(p.container){assert.ok(p.loot&&Number.isInteger(p.loot.gold)&&Array.isArray(p.loot.gear),`${id}/${p.id}: добыча`);}
      if(p.model)assert.ok(PROP_MODELS.includes(p.model),`${id}/${p.id}: нет модели ${p.model}`);
      if(p.model)assert.ok(buildProp(p).length>0,'модель пустая '+p.model);
      if(p.trap)assert.ok(p.trap.dc>=10&&p.trap.dc<=22&&p.trap.sides>=0,'ловушка '+p.id);
    }}
  // 2. граф мест: все сцены достижимы из города, у каждого перехода есть обратный
  const dest=new Map();for(const [id,sc] of all)dest.set(id,sc.props.filter(p=>p.type==='portal').map(p=>p.destination));
  for(const [id,ds] of dest)for(const d of ds){assert.ok(all.has(d),`${seed}: портал ${id} → несуществующая сцена ${d}`);assert.ok(dest.get(d).includes(id),`${seed}: нет обратного перехода ${d} → ${id}`);}
  const seen=new Set(['town']),st=['town'];while(st.length){const id=st.pop();for(const d of dest.get(id))if(!seen.has(d)){seen.add(d);st.push(d);}}
  assert.equal(seen.size,all.size,`${seed}: недостижимы сцены: ${[...all.keys()].filter(k=>!seen.has(k)).join(',')}`);
  // 3. ключи действительно лежат в сценах-хозяевах, а замки без ключа вскрываются
  for(const k of plan.keys){const holder=all.get(k.holder);assert.ok(holder,`${seed}: хозяин ключа ${k.holder}`);
    assert.ok(holder.props.some(p=>p.loot?.gear?.includes(k.name)),`${seed}: ключ «${k.name}» не лежит в ${k.holder}`);
    assert.ok([...all.values()].some(sc=>sc.props.some(p=>p.lock?.key===k.name)),`${seed}: ключ «${k.name}» ничего не открывает`);}
  for(const sc of all.values())for(const p of sc.props)if(p.lock){assert.ok(p.lock.pickDc>=10&&p.lock.forceDc>=10,'сложность замка');}
  // 4. слухи ссылаются на существующие места
  const names=new Set(plan.buildings.map(b=>b.name));for(const f of plan.facts)if(f.kind==='tavern'||f.kind==='cache')assert.ok(names.has(f.place),'слух про несуществующее место');
  // 5. состав мира соответствует размеру
  assert.ok(plan.buildings.some(b=>b.type==='tavern')&&plan.buildings.some(b=>b.type==='chapel'));
  assert.equal(plan.dungeon.levels,{small:1,medium:2,large:3}[size]);
}

// детерминизм: то же зерно → то же самое, ленивая генерация в другом порядке даёт тот же результат
{const a=createWorld('детерминизм','medium'),b=createWorld('детерминизм','medium'),order=sceneIds(a);
 for(const id of order.slice().reverse())generateScene(a,id);for(const id of order)generateScene(b,id);
 for(const id of order)assert.equal(fp(generateScene(a,id)),fp(generateScene(b,id)),'недетерминированная сцена '+id);
 assert.deepEqual(JSON.parse(JSON.stringify(a)),JSON.parse(JSON.stringify(b)));}

// бесконечность зёрен: подряд идущие числа дают разные миры, соседние зёрна не похожи
{const seen=new Map();for(let i=1;i<=200;i++){const p=createWorld(String(i),'small'),f=hash32(JSON.stringify([p.name,p.buildings.map(b=>[b.type,b.name,b.door,b.owner.full]),Object.keys(p.scenes).length]),9);assert.ok(!seen.has(f),`зёрна ${seen.get(f)} и ${i} дали один мир`);seen.set(f,i);}
 const towns=new Set();for(let i=0;i<40;i++)towns.add(fp(generateScene(createWorld('вариант'+i,'medium'),'town')));assert.equal(towns.size,40,'планировки городов совпали');
 const a=createWorld('1000','medium'),b=createWorld('1001','medium');assert.equal(a.buildings.filter((x,i)=>b.buildings[i]&&x.name===b.buildings[i].name&&x.type===b.buildings[i].type&&x.door+''===b.buildings[i].door+'').length,0,'соседние зёрна слишком похожи');
 assert.notEqual(randomSeed(),randomSeed());assert.equal(normalizeGen({seed:7,size:'huge'}).size,'auto');
 // размеры одной категории не одинаковы
 const widths=new Set();for(let i=0;i<30;i++)widths.add(generateScene(createWorld('ш'+i,'medium'),'town').W);assert.ok(widths.size>=5,'размеры городов не варьируются');
 const sizes=new Set();for(let i=0;i<40;i++)sizes.add(createWorld('авто'+i,'auto').size);assert.equal(sizes.size,3,'авто-размер не выбирает все размеры');}

// ——— правила: подставной хост ———
const mkHost=(rolls,mods={},items=[])=>{const log=[],bag=new Set(items),given=[],state={},hp={v:20};let i=0;
  return {state,log,given,hp,roll:s=>{const v=rolls[i++%rolls.length];return Math.min(v,s);},mod:a=>mods[a]??0,has:n=>bag.has(n),give:n=>{bag.add(n);given.push(n)},gold:n=>given.push('gold'+n),potions:n=>given.push('potion'+n),torches:n=>given.push('torch'+n),hurt:n=>{hp.v-=n;return hp.v},poison:()=>given.push('poison'),log:t=>log.push(t)};};
const chest={id:'c1',type:'chest',container:true,gen:true,name:'Сундук',description:'Окованный сундук.',loot:{gold:12,potions:1,torches:0,gear:['Мел']}};
{ // обычный контейнер
  const h=mkHost([10]),o=Runtime.begin(h,'b1',chest);assert.equal(o.kind,'container');assert.deepEqual(o.options.map(x=>x.id),['open','leave']);
  const r=Runtime.choose(h,'b1',chest,'open');assert.ok(r.done&&r.looted);assert.deepEqual(h.given,['gold12','potion1','Мел']);
  assert.equal(Runtime.begin(h,'b1',chest).text,'Здесь уже пусто.');Runtime.choose(h,'b1',chest,'open');assert.equal(h.given.length,3,'добыча выдана дважды');
  assert.ok(Runtime.isOpened(h,'b1',chest));}
{ // скрытая ловушка срабатывает; успешный спасбросок — без урона
  const trap={kind:'dart',name:'Дротики',save:'dex',dc:13,detectDc:15,disarmDc:12,dice:1,sides:4,poison:false,alarm:false,text:'Дротики.',hint:'Щели.'},p={...chest,id:'c2',trap};
  const h=mkHost([5,3]),o=Runtime.begin(h,'b1',p);assert.deepEqual(o.options.map(x=>x.id),['open','leave'],'ловушка должна быть скрыта при низкой внимательности');
  const r=Runtime.choose(h,'b1',p,'open');assert.ok(r.trap.hit&&h.hp.v===17);
  const h2=mkHost([18]),r2=Runtime.choose(h2,'b1',{...p,id:'c3'},'open');assert.ok(!r2.trap.hit&&h2.hp.v===20);}
{ // замеченная ловушка: обезвредить
  const trap={kind:'fire',name:'Огонь',save:'dex',dc:14,detectDc:10,disarmDc:12,dice:2,sides:6,poison:false,alarm:false,text:'Пламя.',hint:'Гарь.'},p={...chest,id:'c4',trap};
  const h=mkHost([15],{wis:3}),o=Runtime.begin(h,'b1',p);assert.ok(o.options.some(x=>x.id==='disarm'),'ловушка не замечена');
  const r=Runtime.choose(h,'b1',p,'disarm');assert.ok(/обезврежена/.test(r.text));Runtime.choose(h,'b1',p,'open');assert.equal(h.hp.v,20);}
{ // замок: ключ, отмычки, взлом
  const lock={key:'Ключ: Медный',pickDc:12,forceDc:14},p={...chest,id:'c5',lock};
  let h=mkHost([10]),o=Runtime.begin(h,'b1',p);assert.deepEqual(o.options.map(x=>x.id),['force','leave']);
  assert.ok(!Runtime.choose(h,'b1',p,'force').done&&!Runtime.isOpened(h,'b1',p),'провал взлома открыл замок');
  h=mkHost([15],{str:2});assert.ok(/успех/.test(Runtime.choose(h,'b1',p,'force').text));assert.ok(Runtime.isOpened(h,'b1',p));
  h=mkHost([10],{},['Ключ: Медный']);o=Runtime.begin(h,'b1',p);assert.ok(o.options.some(x=>x.id==='key'));Runtime.choose(h,'b1',p,'key');assert.ok(Runtime.isOpened(h,'b1',p));
  h=mkHost([3,1],{dex:0},['Отмычки']);Runtime.choose(h,'b1',p,'pick');assert.ok(!Runtime.begin(h,'b1',p).options.some(x=>x.id==='pick'),'сломанная отмычка должна блокировать вскрытие');}
{ // дверь
  const door={id:'d1',type:'door',name:'Запертая дверь',lock:{pickDc:12,forceDc:14,key:null}};
  const h=mkHost([16],{str:0});assert.equal(Runtime.begin(h,'b1',door).kind,'door');const r=Runtime.choose(h,'b1',door,'force');assert.ok(r.opened&&Runtime.isOpened(h,'b1',door));
  assert.equal(Runtime.begin(mkHost([1]),'b1',{id:'d2',type:'door'}),null,'обычная дверь — не наше дело');}
{ // диалог
  const npc={id:'owner',type:'npc',name:'Борг · трактирщик',npc:{lines:['Привет.','Слух.','Пока.']}},h=mkHost([1]);
  let o=Runtime.begin(h,'b1',npc);assert.equal(o.text,'Привет.');o=Runtime.choose(h,'b1',npc,'next');assert.equal(o.text,'Слух.');o=Runtime.choose(h,'b1',npc,'next');assert.equal(o.text,'Пока.');assert.deepEqual(o.options.map(x=>x.id),['leave']);}
{ // плиты на полу
  const trap={kind:'pit',name:'Яма',save:'dex',dc:15,detectDc:12,disarmDc:12,dice:2,sides:6,poison:false,alarm:false,text:'Пол проваливается.',hint:'Швы.'},scene={id:'dng:1',traps:[{id:'p1',x:5,y:5,trap}]};
  let h=mkHost([3],{wis:0});assert.deepEqual(Runtime.step(h,scene,5,6),[],'не заметили');assert.equal(Runtime.step(h,scene,5,5)[0].type,'fired');assert.ok(h.hp.v<20);assert.deepEqual(Runtime.step(h,scene,5,5),[],'плита сработала дважды');
  h=mkHost([3],{wis:4});assert.equal(Runtime.step(h,scene,5,6)[0].type,'found');assert.equal(Runtime.knownTraps(h,scene).length,1);}

// каталог предметов: у каждой модели есть вид и описания
for(const [k,c] of Object.entries(CATALOG)){assert.ok(c.name&&c.d.length>0&&c.type,k);if(c.model)assert.ok(PROP_MODELS.includes(c.model),'нет модели '+c.model);}
console.log(`worldgen: ok (${worlds} миров, ${scenes} сцен)`);
