// Проверка правил стиля персонажей (CHARACTER_STYLE.md): пропорции, бюджет боксов, глаза, палитра, реестр NPC,
// все варианты внешности редактора, пресеты, случайные образы, совместимость со старыми героями.
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {texelPass,TEXEL} from '../src/texel.js';
import {RULES,PALETTE,NPCS,OPTIONS,OUTFITS,PALETTES,PRESETS,spec,build,defaultLook,normalize,randomLook,presetLook,validateAppearance,CLASS_KIND} from '../src/characters.js';
import * as HeroRules from '../src/hero-rules.js';

function check(label,s){
  assert.ok(s,label+': нет спецификации');
  const boxes=build(s);
  const base=boxes.filter(b=>b.length===8),decals=boxes.filter(b=>b.length>8);
  assert.ok(base.length<=RULES.maxBoxes,label+': бюджет боксов '+base.length+' > '+RULES.maxBoxes);
  assert.ok(boxes.length<=RULES.maxWithTexels,label+': с текселями '+boxes.length+' > '+RULES.maxWithTexels);
  assert.ok(decals.length>0,label+': нет текселей');
  for(const d of decals)assert.ok(d.length===10&&(d[8]==='f'||d[8]==='t')&&(d[8]==='f'?d[5]:d[4])<=.011&&Number.isFinite(d[9])&&Number.isInteger(d[6]),label+': некорректная наклейка '+JSON.stringify(d));
  const eyes=boxes.filter(b=>b[6]===s.eye&&b[5]<=.02&&b[2]>=.22&&b[1]>=.83&&b[1]<=.94&&Math.abs(b[0])<=.15);
  assert.ok(eyes.length>=1&&eyes.length<=6,label+': глаза не найдены ('+eyes.length+')');
  const head=boxes.find(b=>b[3]>=.44&&b[4]>=.4&&b[5]>=.38&&b[6]===s.skin);
  assert.ok(head,label+': нет головы-куба');
  const ratio=head[4]/(head[1]+head[4]/2);
  assert.ok(ratio>=RULES.headMinRatio&&ratio<=RULES.headMaxRatio,label+': пропорция головы '+ratio.toFixed(2));
  assert.ok(boxes.some(b=>b[6]===s.trim),label+': нет отделки цвета trim');
  for(const b of boxes)assert.ok((b.length===8||b.length===10)&&b.slice(0,6).every(Number.isFinite)&&b[3]>0&&b[4]>0&&b[5]>0&&Number.isInteger(b[6]),label+': некорректный бокс '+JSON.stringify(b));
  return boxes;
}
const cases=[];
for(const classId of RULES.classes)for(const gender of RULES.genders)cases.push([classId+' '+gender,spec(CLASS_KIND[classId],{classId,appearance:defaultLook(classId,gender)})]);
for(const id of Object.keys(NPCS))cases.push(['npc '+id,spec(5,{npc:id})]);
for(const [kind,label] of [[0,'Эльдар'],[1,'Мира'],[2,'Бор']])cases.push(['party '+label,spec(kind,{})]);
// Каждый вариант каждой настройки отдельно, для каждого класса и пола
let variants=0;
for(const classId of RULES.classes)for(const gender of RULES.genders){
  const base=defaultLook(classId,gender);
  for(const key of ['ears','hairStyle','brows','eyes','mouth','beard','headgear','cape'])for(const o of OPTIONS[key]){variants++;cases.push([`${classId} ${gender} ${key}=${o.id}`,spec(CLASS_KIND[classId],{classId,appearance:{...base,[key]:o.id}})]);}
  for(const o of OUTFITS[classId]){variants++;cases.push([`${classId} ${gender} outfit=${o.id}`,spec(CLASS_KIND[classId],{classId,appearance:{...base,outfit:o.id}})]);}
  for(const key of ['marks','accessories'])for(const o of OPTIONS[key]){variants++;cases.push([`${classId} ${gender} ${key}+${o.id}`,spec(CLASS_KIND[classId],{classId,appearance:{...base,[key]:[o.id]}})]);}
  // Худший случай: всё сразу
  cases.push([classId+' '+gender+' максимум',spec(CLASS_KIND[classId],{classId,appearance:{...base,hairStyle:'wavy',beard:'long',headgear:'wizhat',cape:'long',marks:OPTIONS.marks.map(o=>o.id),accessories:OPTIONS.accessories.map(o=>o.id)}})]);
}
// Пресеты и случайные образы
for(const [classId,list] of Object.entries(PRESETS))for(const p of list){const ap=presetLook(classId,p);validateAppearance(ap,classId);cases.push(['пресет '+p.name,spec(CLASS_KIND[classId],{classId,appearance:ap})]);}
let seed=7;const rnd=()=>(seed=(seed*1664525+1013904223)%4294967296)/4294967296;
for(let i=0;i<400;i++){const classId=RULES.classes[i%4],gender=RULES.genders[(i>>2)&1],ap=randomLook(classId,gender,rnd);validateAppearance(ap,classId);cases.push(['случайный '+i,spec(CLASS_KIND[classId],{classId,appearance:ap})]);}
for(const [label,s] of cases)check(label,s);

// Палитра класса без собственных цветов, пол меняет силуэт
for(const classId of RULES.classes){
  assert.equal(spec(0,{classId}).cloth,PALETTE[classId].cloth,classId+': цвет одежды класса');
  const m=JSON.stringify(build(spec(0,{classId,appearance:{gender:'male'}}))),f=JSON.stringify(build(spec(0,{classId,appearance:{gender:'female'}})));
  assert.notEqual(m,f,classId+': пол не меняет модель');
}
// Каждый вариант действительно меняет модель (нет «мёртвых» кнопок в редакторе)
for(const key of ['ears','hairStyle','brows','eyes','mouth','beard','headgear','cape']){
  const seen=new Set();for(const o of OPTIONS[key])seen.add(JSON.stringify(build(spec(2,{classId:'fighter',appearance:{...defaultLook('fighter','male'),hairStyle:'short',[key]:o.id}}))));
  assert.ok(seen.size>=OPTIONS[key].length-1,key+': варианты не различаются ('+seen.size+'/'+OPTIONS[key].length+')');
}
for(const classId of RULES.classes){const seen=new Set(OUTFITS[classId].map(o=>JSON.stringify(build(spec(0,{classId,appearance:{...defaultLook(classId,'male'),outfit:o.id}}))))); assert.equal(seen.size,OUTFITS[classId].length,classId+': наряды не различаются');}
for(const key of ['skin','hair','cloth','trim','leather','gem','eye'])assert.ok(PALETTES[key].length>=7,key+': мало цветов');
// Старые герои (без новых полей) читаются и совпадают по смыслу
const legacy=spec(2,{classId:'fighter',appearance:{skin:'#e3bb8a',hair:'#493024',cloth:'#315e84',trim:'#c3a04c',hairStyle:'short',face:'beard'}});
assert.equal(legacy.beard,'full');assert.equal(legacy.hairStyle,'short');assert.equal(legacy.headgear,'none');check('legacy',legacy);
const bare=spec(2,{classId:'fighter',appearance:{skin:'#e3bb8a',hair:'#493024',cloth:'#315e84',trim:'#c3a04c'}});check('legacy-bare',bare);
// Валидация отвергает мусор
const bad=[{hairStyle:'dragon'},{eye:'#ff00ff'},{marks:['scar','scar']},{accessories:['sword']},{outfit:'robe'},{cape:'x'},{hat:'#123456'},{unknown:1},{marks:'scar'}];
for(const b of bad)assert.throws(()=>validateAppearance({...defaultLook('fighter','male'),...b},'fighter'),Error,'должно отвергаться: '+JSON.stringify(b));
validateAppearance({...defaultLook('wizard','female'),hair2:null,hat:null},'wizard');
// Все NPC в сценах зарегистрированы
const world=readFileSync(new URL('../dist/world.js',import.meta.url),'utf8');
const ids=[...world.matchAll(/\{id:'([^']+)'[^{}]*?type:'npc'/g)].map(m=>m[1]);
assert.ok(ids.length>=2,'не найдены NPC в world.js');
for(const id of ids)assert.ok(NPCS[id],'NPC «'+id+'» не описан в NPCS (src/characters.js)');
for(const [id,n] of Object.entries(NPCS))assert.ok(n.name&&n.role&&n.classId&&n.gender,'NPC '+id+': нужны name, role, classId, gender');
// Создание героя принимает новый облик и отвергает мусор
const ap=HeroRules.applyLook({skin:HeroRules.COLORS.skin[0]},'wizard','female');
const base={name:'Тест',classId:'wizard',stats:HeroRules.preset('wizard'),appearance:ap,kit:0,background:'x'.repeat(40)};
HeroRules.validate(base);
assert.throws(()=>HeroRules.validate({...base,appearance:{...base.appearance,gender:'robot'}}));
assert.throws(()=>HeroRules.validate({...base,appearance:{...base.appearance,outfit:'plate'}}));
const old={...base,appearance:{skin:HeroRules.COLORS.skin[0],hair:HeroRules.COLORS.hair[0],cloth:HeroRules.COLORS.cloth[0],trim:HeroRules.COLORS.trim[0],hairStyle:'short',face:'soft'}};HeroRules.validate(old);
// Правило «тексели»: наклейки детерминированы, отличаются от родителя, не лежат на глазах и отключаются
{const s=spec(2,{classId:'fighter',appearance:defaultLook('fighter','male')});
 const a=build(s),b=build(s),flat=build(s,{texel:false});
 assert.deepEqual(a,b,'тексели недетерминированы');assert.ok(flat.every(x=>x.length===8),'texel:false оставляет наклейки');assert.equal(a.filter(x=>x.length===8).length,flat.length);
 const decals=a.filter(x=>x.length>8);assert.ok(decals.length>=30&&decals.length<=420,'тексели: '+decals.length);
 assert.ok(decals.some(d=>d[8]==='t'),'нет текселей верхней грани');assert.ok(!decals.some(d=>d[6]===s.eye),'тексели на глазах');
 for(const d of decals)assert.ok(d[6]>=0&&d[6]<=0xffffff);
 assert.deepEqual(texelPass([[0,0,0,.02,.02,.02,0x808080,false]]),[],'мелкие боксы не затеняются');
 assert.deepEqual(texelPass([[0,0,0,.3,.3,.3,0x808080,true]]),[],'светящиеся боксы не затеняются');
 const one=texelPass([[0,.5,0,.4,.4,.3,0x808080,false]]);assert.ok(one.length>=4&&one.every(d=>d[6]!==0x808080),'бокс получает тексели другого оттенка');
 assert.ok(TEXEL.size>.04&&TEXEL.size<.08);}
// Знаки лица не должны ложиться на глаза (шрам «через глаз», полоски по глазам)
{const eyeStyles=OPTIONS.eyes.map(o=>o.id),bad=[];
 for(const eyes of eyeStyles)for(const gender of RULES.genders)for(const mark of ['scar','browscar','warpaint','plaster','mole']){
  const base={...defaultLook('fighter',gender),eyes,beard:'none',headgear:'none',accessories:[],markColor:'#3d8be8',eye:'#2f5fa8'};
  const s0=spec(2,{classId:'fighter',appearance:{...base,marks:[]}}),s1=spec(2,{classId:'fighter',appearance:{...base,marks:[mark]}});
  const a=new Set(build(s0,{texel:false}).map(b=>b.join(','))),mk=build(s1,{texel:false}).filter(b=>!a.has(b.join(',')));
  assert.ok(mk.length>0,mark+': знак не нарисован');
  const eyeBoxes=build(s1,{texel:false}).filter(b=>b[6]===s1.eye&&b[5]<=.02&&b[1]>=.83&&b[1]<=.94&&Math.abs(b[0])<=.15);
  for(const m of mk)for(const e of eyeBoxes)if(Math.abs(m[0]-e[0])<(m[3]+e[3])/2-.002&&Math.abs(m[1]-e[1])<(m[4]+e[4])/2-.002)bad.push(mark+' на глазах ('+eyes+', '+gender+')');}
 assert.deepEqual([...new Set(bad)],[],'знаки на глазах');
 for(const mark of ['scar','browscar','warpaint']){const s=spec(2,{classId:'fighter',appearance:{...defaultLook('fighter','male'),marks:[mark]}});assert.ok(build(s,{texel:false}).some(b=>b[6]!==undefined),mark);}
 // цвет знаков действует
 const red=build(spec(2,{classId:'fighter',appearance:{...defaultLook('fighter','male'),marks:['warpaint'],markColor:'#f0ece0'}}),{texel:false});assert.ok(red.filter(b=>b[6]===0xf0ece0).length>=12,'цвет раскраски не применяется');}
console.log('characters: ok ('+cases.length+' моделей, '+variants+' вариантов)');
