// Названия предметов — русский текст, поэтому \b не работает (он видит только латиницу).
// Ищем ЦЕЛОЕ слово: перед ним не буква/цифра, после него — тоже. Так «Защитный амулет» не щит,
// «Мечта» не меч, «Кожаный пояс» не броня, «Подсвечник» не свеча. Без lookbehind: он есть не во всех iOS Safari.
const word=forms=>new RegExp('(?:^|[^\\p{L}\\p{N}])(?:'+forms.join('|')+')(?![\\p{L}\\p{N}])','iu');
const ARMOR=word(['брон(?:я|и|ю|ей|е)','доспех(?:и|ов|а|ам)?','кольчуг(?:а|и|у|ой|е)','кольчужн(?:ая|ую|ой) рубах(?:а|и|у|ой)']);
const SHIELD=word(['щит(?:а|у|ом|е|ы|ов)?']);
const STAFF=word(['посох(?:а|у|ом|е|и|ов)?','булав(?:а|у|ой|е|ы)']);
const SWORD=word(['меч(?:а|у|ом|е|и|ей)?']);
const BOW=word(['лук(?:а|у|ом|е|и|ов)?']);
const STACK=word(['еда','еды','едой','рацион(?:ы|ов|а)?','бинт(?:ы|ов|а)?','мел(?:а|у|ом)?','свеч(?:а|и|ей|у|ой)?']);
const FOCUS=word(['фокус(?:а|у|ом|ы)?','символ(?:а|у|ом|ы)?']);
export const CAPACITY=20;
export const armorName=name=>ARMOR.test(name);
export const handType=name=>SHIELD.test(name)?'shield':STAFF.test(name)?'staff':SWORD.test(name)?'sword':BOW.test(name)?'bow':null;
export const stackable=name=>STACK.test(name);
export const focusName=name=>FOCUS.test(name);
export function gearEntries(a){const hands=new Set(a.hands||[]);let armorTaken=false;const stacks=new Map(),out=[];for(const [i,name] of (a.inventory||[]).entries()){const hand=handType(name),equipped=armorName(name)?a.armorEquipped!==false&&!armorTaken:!!hand&&hands.has(hand);if(armorName(name)&&equipped)armorTaken=true;if(hand&&equipped)hands.delete(hand);const key=stackable(name)&&!equipped?name:null;if(key&&stacks.has(key)){const it=stacks.get(key);it.amount++;it.indices.push(i);continue;}const item={id:'gear'+i,name,amount:1,indices:[i],equipped};out.push(item);if(key)stacks.set(key,item);}return out;}
export function slotsUsed(a,s={}){return gearEntries(a).filter(i=>!i.equipped).length+((a.torches||0)-(a.hands?.includes('torch')?1:0)>0?1:0)+((s.potions||0)>0?1:0);}
export function canAdd(a,s,type,name){const copy={...a,inventory:[...(a.inventory||[])],hands:[...(a.hands||[])]},next={...s};if(type==='gear')copy.inventory.push(name);else if(type==='torch')copy.torches=(copy.torches||0)+1;else if(type==='potion')next.potions=(next.potions||0)+1;return slotsUsed(copy,next)<=CAPACITY;}
