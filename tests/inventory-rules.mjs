import assert from 'node:assert/strict';
import {slotsUsed,canAdd,gearEntries} from '../src/inventory-rules.js';
const a={inventory:['Меч','Кольчуга',...Array.from({length:20},(_,i)=>'Предмет '+i)],hands:['sword','empty'],torches:0};
assert.equal(slotsUsed(a),20);assert.equal(canAdd(a,{},'gear','Верёвка'),false);assert.equal(gearEntries(a).filter(x=>x.equipped).length,2);
const full={...a,hands:['empty','empty']};assert.equal(slotsUsed(full),21);
const stack={inventory:['Рационы','Рационы','Рационы'],hands:['empty','empty']};assert.equal(slotsUsed(stack),1);assert.equal(gearEntries(stack)[0].amount,3);
assert.equal(slotsUsed({inventory:[],hands:['torch','empty'],torches:1},{potions:2}),1);
console.log('PASS: capacity, stack quantities, held and worn exclusions, manual unequip capacity.');
