import assert from 'node:assert/strict';
import {slotsUsed,canAdd,gearEntries,armorName,handType,stackable,focusName} from '../src/inventory-rules.js';
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
