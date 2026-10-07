import assert from 'node:assert/strict';
import {npcFacing,faceCell} from '../src/npc-facing.js';
import {spec,build,defaultLook,CLASS_KIND} from '../src/characters.js';
const scene={id:'room',tiles:Array.from({length:20},()=>Array(20).fill('floor')),props:Array.from({length:8},(_,i)=>({id:'npc'+i,type:'npc',x:1+2*i,y:5}))};
const snapshot=JSON.stringify(scene),directions=scene.props.map(p=>npcFacing(scene,p,'seed'));
assert.equal(new Set(directions).size,4,'NPCs use all four directions in an open room');
assert.deepEqual(scene.props.map(p=>npcFacing(JSON.parse(snapshot),p,'seed')),directions,'Idle poses survive reload');
assert.equal(JSON.stringify(scene),snapshot,'No generator or saved-state mutation');
assert.equal(npcFacing(scene,{...scene.props[0],facing:3},'seed'),3);
const corner={id:'corner',props:[{id:'npc',type:'npc',x:1,y:1}],tiles:[['wall','wall','wall'],['wall','floor','floor'],['wall','wall','wall']]};
assert.equal(npcFacing(corner,corner.props[0],'seed'),1,'Faces the available floor, not a wall');
assert.deepEqual([[2,1],[1,2],[0,1],[1,0]].map(([x,y])=>faceCell({x:1,y:1},{x,y})),[1,0,3,2]);
for(const cls of Object.keys(CLASS_KIND))for(const gender of ['male','female']){
 const look={...defaultLook(cls,gender),headgear:'none',beard:'none',marks:[],accessories:[]};
 const boxes=build(spec(CLASS_KIND[cls],{classId:cls,appearance:look}),{texel:false});
 assert.equal(boxes.some(b=>Math.abs(b[0])<1e-8&&Math.abs(b[1]-.845)<1e-8&&Math.abs(b[2]-.226)<.001&&b[3]<.05&&b[4]<.06),false,'No nose geometry');
 assert.ok(boxes.some(b=>b[2]>.23&&b[1]<.84&&b[1]>.75),'Mouth remains expressive');
}
console.log('PASS flat faces, varied stable NPC poses, open-floor direction and four-way conversation facing');
