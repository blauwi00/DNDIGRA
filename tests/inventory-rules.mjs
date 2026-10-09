import {randomUUID} from '../src/local-api.js';
import assert from 'node:assert/strict';
import {slotsUsed,canAdd,gearEntries,armorName,handType,stackable,focusName} from '../src/inventory-rules.js';
import * as InventoryRules from '../src/inventory-rules.js';
import {createTutorial} from '../src/tutorial-rules.js';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const a={inventory:['Меч','Кольчуга',...Array.from({length:20},(_,i)=>'Предмет '+i)],hands:['sword','empty'],torches:0};
assert.equal(slotsUsed(a),20);assert.equal(canAdd(a,{},'gear','Верёвка'),false);assert.equal(gearEntries(a).filter(x=>x.equipped).length,2);
const full={...a,hands:['empty','empty']};assert.equal(slotsUsed(full),21);
const stack={inventory:['Рационы','Рационы','Рационы'],hands:['empty','empty']};assert.equal(slotsUsed(stack),1);assert.equal(gearEntries(stack)[0].amount,3);
assert.equal(slotsUsed({inventory:[],hands:['torch','empty'],torches:1},{potions:2}),1);
console.log('PASS: capacity, stack quantities, held and worn exclusions, manual unequip capacity.');
// Тип предмета определяется по ЦЕЛОМУ слову, а не по подстроке (регрессия: «Защитный амулет» считался щитом).
for(const n of ['Кожаный пояс','Кожаный мешок','Кольчужные перчатки','Шлем'])assert.equal(armorName(n),false,n);
for(const n of ['Кольчуга','Кожаная броня','Кольчужная рубаха','Доспехи'])assert.equal(armorName(n),true,n);
for(const n of ['Защитный амулет','Мечта','Лукавая записка','Подсвечник'])assert.equal(handType(n),null,n);
assert.equal(handType('Щит · +2 КД'),'shield');assert.equal(handType('Длинный меч · 1d8'),'sword');assert.equal(handType('Булава · 1d6'),'staff');assert.equal(handType('Обычный посох · 1d6'),'staff');assert.equal(handType('Короткий лук'),'bow');
for(const n of ['Подсвечник','Мелкая монета','Умелая рука','Победа','Одеяло','Набор для разведения огня'])assert.equal(stackable(n),false,n);
for(const n of ['Рационы · 5 дней','Бинты','Мел','Свеча','Дорожная еда'])assert.equal(stackable(n),true,n);
assert.equal(focusName('Магический фокус'),true);assert.equal(focusName('Священный символ'),true);assert.equal(focusName('Фокусник'),false);
console.log('PASS: item types match whole words only.');
// Exercise the actual disposal path: keeping one potion prevents the mandatory
// combat prompt from becoming impossible after supplies were already collected.
for(const mode of ['campaign','practice']){
  const hero={x:1,y:1,hands:[],inventory:[]},messages=[];
  const state={combat:false,potions:2,tutorial:createTutorial({mode}),drops:[]};
  const game={state,active:()=>hero,scene:{id:'glade',W:3,H:3},props:[],all:()=>[hero],blocked:()=>false,tell:message=>messages.push(message),save(){},render(){}};
  const env={LocalAPI:{randomUUID},InventoryRules,crypto,document:{getElementById:()=>null},gameDebug:game};env.window=env;
  vm.runInNewContext(readFileSync(new URL('../dist/inventory.js',import.meta.url),'utf8'),env);
  env.Inventory.drop({id:'potion'});assert.equal(state.potions,1);assert.equal(state.drops.length,1);
  env.Inventory.drop({id:'potion'});assert.equal(state.potions,1,'Last required potion survives '+mode+' disposal');assert.equal(state.drops.length,1);
  assert.match(messages.at(-1),/обучен/,'The rejected actual action explains the requirement');
  state.tutorial=createTutorial({skip:true,canSkip:true});env.Inventory.drop({id:'potion'});assert.equal(state.potions,0,'Completed tutorials do not reserve ordinary supplies');
}
console.log('PASS: actual inventory disposal reserves the final tutorial potion and explains why.');
