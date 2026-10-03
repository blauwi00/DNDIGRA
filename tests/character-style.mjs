import assert from 'node:assert/strict';
import {STYLE,STYLE_VERSION,NPCS,npcActor,characterProfile,characterParts} from '../src/character-style.js';
for(const classId of ['fighter','wizard','rogue','cleric'])for(const gender of ['male','female'])for(const hairStyle of ['short','long','bald'])for(const face of ['soft','stern','beard']){const actor={classId,appearance:{gender,hairStyle,face},hands:['empty','empty']},result=characterParts(actor);assert.equal(result.profile.style,STYLE_VERSION);assert.ok(result.parts.length<STYLE.maxParts);assert.ok(new Set(result.parts.map(p=>p.color)).size<=STYLE.maxPalette);for(const p of result.parts){assert.ok([p.x,p.y,p.z,p.w,p.h,p.d,p.rz].every(Number.isFinite));assert.ok(p.w>0&&p.h>0&&p.d>0);assert.ok(p.y+p.h/2<=STYLE.height);}assert.deepEqual(result,characterParts(actor),'Deterministic geometry');if(hairStyle==='bald')assert.ok(!result.parts.some(p=>p.section==='hair'),'No hair shell on bald head');}
assert.equal(characterProfile({npcId:'ellen'},5).gender,'female');assert.equal(characterProfile({npcId:'ellen'},5).hood,true);assert.equal(characterProfile({npcId:'lin'},5).hood,false);
assert.notDeepEqual(characterParts({classId:'fighter',appearance:{gender:'male'}}).parts,characterParts({classId:'fighter',appearance:{gender:'female'}}).parts);
const bare=characterParts({classId:'fighter',hands:['empty','empty']}).parts,armed=characterParts({classId:'fighter',hands:['sword','shield']}).parts;assert.ok(armed.length>bare.length);
console.log('PASS 72 appearance variants, shared NPC style, bounded deterministic geometry, palette budget and actual held equipment');

// Claude's registry checks adapted to the approved renderer, including aliases and negative cases.
const {readFileSync}=await import('node:fs');
const world=readFileSync(new URL('../dist/world.js',import.meta.url),'utf8');
const npcIds=[...world.matchAll(/\{id:'([^']+)'[^{}]*?type:'npc'/g)].map(m=>m[1]);
assert.ok(npcIds.length>=2);
for(const id of npcIds){assert.ok(Object.hasOwn(NPCS,id),'Unregistered scene NPC: '+id);const n=NPCS[id];assert.ok(n.name&&n.role&&n.classId);assert.equal(npcActor(n.name+' · '+n.role).npcId,id);assert.deepEqual(characterProfile({npcId:id},5),characterProfile({type:'npc',id},5));}
assert.equal(npcActor('Незнакомец'),null,'Unknown NPC must not borrow Ellen portrait');
assert.throws(()=>characterProfile({npcId:'unknown'},5),/registered/);
assert.throws(()=>characterProfile({npcId:'toString'},5),/registered/);
assert.equal(characterProfile({},1).gender,'female','Mira has a female default');
assert.equal(characterProfile({appearance:{}},1).gender,'male','Legacy custom hero default stays male');
assert.notDeepEqual(characterProfile({npcId:'keeper'},5),characterProfile({npcId:'novice'},5));
console.log('PASS scene NPC registry, portrait identities, unknown NPC rejection and legacy defaults');

for(const role of ['fighter','wizard','rogue','cleric'])for(const gender of ['male','female']){const {parts}=characterParts({classId:role,appearance:{gender},hands:['empty','empty']});const skull=parts.find(p=>p.section==='head'&&p.w>.5&&p.h>.4);assert.ok(skull,'Large reference skull');const top=Math.max(...parts.map(p=>p.y+p.h/2));assert.ok(skull.h/top>=.32&&skull.h/top<=.40,'Chibi head ratio');assert.equal(parts.filter(p=>p.section==='head'&&p.color==='#251e1c'&&p.h>.05).length,2,'Two readable eyes');if(role==='cleric'&&gender==='female')assert.ok(!parts.some(p=>p.section==='hair'&&p.y+p.h/2>1.26),'Hair stays below hood band');}
console.log('PASS reference proportions, readable eyes and hood hair containment');
for(const hairStyle of ['short','long']){const {parts}=characterParts({classId:'cleric',appearance:{gender:'female',hairStyle}});for(const x of [-.15,0,.15])for(const y of [1.21,1.23,1.245])assert.ok(parts.some(p=>p.section==='hair'&&Math.abs(p.x-x)<=p.w/2&&Math.abs(p.y-y)<=p.h/2&&p.z+p.d/2>.27),'Hair fills opening under hood band');}
console.log('PASS continuous hair coverage under hood');

for(const classId of ['fighter','wizard','rogue','cleric'])for(const gender of ['male','female']){const geometry=(hairStyle,face)=>characterParts({classId,appearance:{gender,hairStyle,face}}).parts;assert.notDeepEqual(geometry('short','soft'),geometry('short','stern'),'Stern face changes actual geometry');assert.notDeepEqual(geometry('short','soft'),geometry('long','soft'),'Long hair changes actual geometry');}
console.log('PASS face and hairstyle changes affect model geometry across all classes/genders');
