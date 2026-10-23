import assert from 'node:assert/strict';
import {npcFacing,faceCell} from '../src/npc-facing.js';
import {spec,build,defaultLook,CLASS_KIND} from '../src/characters.js';
import {createIsland} from '../src/islands/terrain.js';
import {tileAt} from '../src/islands/scene.js';
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
 assert.equal(boxes.some(b=>Math.abs(b[0])<1e-8&&Math.abs(b[1]-.92)<.02&&Math.abs(b[2]-.21)<.02&&b[3]<.05&&b[4]<.06),false,'No nose geometry');
 assert.ok(boxes.some(b=>b[2]>.2&&b[1]<.9&&b[1]>.8&&b[4]<.03),'Mouth remains expressive');
}
const island=createIsland('npc-compact-facing',600),[x,y]=island.landmarks.port;
const coastalNpc={id:'captain',type:'npc',x,y};
const compact={id:'island',W:island.W,H:island.H,island,props:[coastalNpc]};
const facing=npcFacing(compact,coastalNpc,'compact');
const [dx,dy]=[[0,1],[1,0],[0,-1],[-1,0]][facing];
assert.equal(tileAt(compact,x+dx,y+dy),'floor','An island NPC faces a dry approach without allocating a tile grid');
assert.equal(npcFacing(JSON.parse(JSON.stringify(compact)),coastalNpc,'compact'),facing,'Compact NPC pose survives serialization');
console.log('PASS flat faces, stable legacy/compact NPC poses, dry-floor direction and four-way conversation facing');
