// Real Three scene graphs and source renderer lifecycle; only browser drawing
// and DOM are stubbed. GPU draw/memory checks belong to region-browser.cjs.
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import * as Three from 'three';
import {npcFacing,faceCell} from '../src/npc-facing.js';
import {batchStaticModels} from '../src/static-batches.js';
import {createMenuStage} from '../src/menu-stage.js';
import {texelPass,TEXEL} from '../src/texel.js';
import {fitPreviewCamera} from '../src/preview-frame.js';
import {fillSilhouette} from '../src/silhouette.js';
import {characterParts,characterProfile} from '../src/character-style.js';
import {spec as characterSpec,build as characterBuild} from '../src/characters.js';
import {enemyModel} from '../src/enemy-models.js';
import {bindPromptInput} from '../src/prompt-input.js';
import {planRegionChunks,createChunkStream} from '../src/region-streaming.js';
import * as regionHelpers from '../src/region-rendering.js';
import * as Props from '../src/props.js';
const noop=()=>{},frames=new Map(),elements=new Map();let nextFrame=0,time=0,tapped='unset';
const context=new Proxy({createRadialGradient:()=>({addColorStop:noop})},{get:(o,k)=>o[k]??noop,set:(o,k,v)=>(o[k]=v,true)});
function element(){return {hidden:false,dataset:{},clientWidth:390,clientHeight:520,children:[],events:new Map(),classList:{add:noop,remove:noop,toggle:noop},setAttribute:noop,prepend(...nodes){this.children.unshift(...nodes);},append(...nodes){this.children.push(...nodes);},addEventListener(name,fn){this.events.set(name,fn);},replaceChildren(...nodes){this.children=nodes;},remove:noop,setPointerCapture:noop,getContext:()=>context,getBoundingClientRect:()=>({left:0,top:0,width:390,height:520,bottom:520,height:520}),insertAdjacentHTML:noop};}
const document={body:element(),hidden:false,createElement:element,addEventListener:noop,getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);}};
class Renderer{constructor(){this.shadowMap={};this.info={memory:{geometries:0,textures:0},render:{calls:0,triangles:0}};}setPixelRatio(){}setSize(){}setRenderTarget(){}render(scene){scene.updateMatrixWorld(true);}readRenderTargetPixels(_t,_x,_y,_w,_h,pixels){pixels.fill(0);}}
const hero={id:'hero',kind:2,classId:'fighter',hp:10,x:8,y:8,hands:[],appearance:{}},hidden={id:'hidden',x:4,y:4,type:'chest',solid:true};
let departingNpc=null;
let scene={id:'small',W:20,H:20,outdoor:true,props:[hidden],decor:[],lights:[],tiles:Array.from({length:20},()=>Array(20).fill('floor'))},showHidden=false;
const state={scene:'small',party:[hero],active:'hero',seed:4,settings:{lights:false,animations:false,ambient:.5,intensity:1},loot:{},enemies:[],combat:false};
const game={state,get scene(){return scene;},get props(){return scene.props.filter(p=>p.id!=='hidden'||showHidden).map(p=>p.id===departingNpc?.id?departingNpc:p);},get departingNpc(){return departingNpc;},active:()=>hero,all:()=>[hero,...state.enemies],animate:()=>false,render:noop,isOpen:p=>!!state.doors?.[p.id],selected:null,route:[],mapTap:p=>{tapped=p;},dismissMapActions:noop};
const World={tile:(s,x,y)=>s.tiles[y]?.[x]||'void'};
const env={T:{...Three,WebGLRenderer:Renderer},npcFacing,faceCell,batchStaticModels,createMenuStage,texelPass,TEXEL,fitPreviewCamera,fillSilhouette,characterParts,characterProfile,characterSpec,characterBuild,enemyModel,bindPromptInput,planRegionChunks,createChunkStream,...regionHelpers,
 document,performance:{now:()=>time},requestAnimationFrame:fn=>{const id=++nextFrame;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),ResizeObserver:class{observe(){}},setTimeout:noop,console,World,Props,devicePixelRatio:1,location:{search:'?qa=1'},gameDebug:game,Torches:{lightSources:()=>[],fixture:()=>({present:true})}};env.window=env;env.document.getElementById('dialogue').hidden=true;
vm.createContext(env);vm.runInContext(readFileSync(new URL('../src/voxel.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),env);
const voxel=env.voxel;
assert.equal(voxel.regionStats.enabled,false);assert.ok(voxel.models.has('hero'));
showHidden=true;voxel.sync();
assert.ok(voxel.models.has('prop:hidden'),'A story prop becoming visible in the same scene needs its existing source model');

function loadLarge(){
 scene={id:'large',W:96,H:64,outdoor:true,visualSeed:4,props:[{id:'keeper',type:'npc',x:9,y:28,name:'Хранитель'}, {id:'open-door',type:'door',x:18,y:30}, {id:'camp',x:18,y:28,type:'chest'},{id:'far',x:78,y:39,type:'chest'},...Array.from({length:60},(_,i)=>({id:'tree'+i,x:3+i%20*4,y:3+Math.floor(i/20)*18,model:'tree',type:'decor',solid:false}))],decor:[],lights:[],tiles:Array.from({length:64},()=>Array(96).fill('floor'))};
 state.scene='large';state.doors={'open-door':true};hero.x=8;hero.y=32;game.selected=null;game.route=[];voxel.sync();env.camera.center(hero);
}
function drain(){for(let n=0;n<80&&voxel.regionStats.queued;n++){const callbacks=[...frames.entries()];frames.clear();time+=40;for(const [,fn]of callbacks)fn(time);}assert.equal(voxel.regionStats.queued,0);assert.equal(voxel.regionStats.errors,0);}
function visit(x,y){hero.x=x;hero.y=y;game.selected=null;voxel.sync();env.camera.center(hero);drain();}
loadLarge();assert.ok(voxel.regionStats.queued>0,'Only one group is built synchronously');assert.ok(voxel.regionStats.ready<=1);drain();
assert.equal(voxel.regionStats.enabled,true);assert.equal(voxel.regionReady(8,32),true);assert.ok(voxel.regionStats.ready<=12);assert.ok(voxel.staticBatchStats.props>0);
const actor=voxel.models.get('hero');
for(const x of [32,48,72,88])visit(x,32);
assert.equal(voxel.models.get('hero'),actor,'Static eviction cannot replace the actor model');
assert.ok(!voxel.models.has('prop:camp'),'Distant source models release with their owning group');
visit(18,29);assert.ok(voxel.models.has('prop:camp'));assert.ok(voxel.models.get('prop:open-door').userData.hinge.rotation.y< -1,'Remount immediately restores an open door');state.loot['large:camp']=true;voxel.sync();assert.equal(voxel.models.get('prop:camp').visible,false);
visit(88,32);visit(18,29);assert.equal(voxel.models.get('prop:camp').visible,false,'Remount reads authoritative loot instead of reviving a chest');
const stable=voxel.regionStats.resources;
for(let n=0;n<3;n++){visit(88,32);visit(18,29);assert.deepEqual(voxel.regionStats.resources,stable,'Repeated traversal returns to identical live source resources');}
// Motion endpoints move across chunks, but the NPC source stays owned by its
// original group. That actual owner must remain pinned throughout the motion.
const sourceNpc=scene.props.find(p=>p.id==='keeper'),npcModel=voxel.models.get('prop:keeper');
departingNpc={...sourceNpc,x:49,y:32};npcModel.userData.p=departingNpc;
voxel.move('prop:keeper',sourceNpc,departingNpc,1);
{const callbacks=[...frames.values()];frames.clear();time+=40;for(const fn of callbacks)fn(time);}drain();
departingNpc={...sourceNpc,x:88,y:32};npcModel.userData.p=departingNpc;
voxel.move('prop:keeper',{x:49,y:32},departingNpc,10000000);env.camera.center(departingNpc);drain();
assert.ok(voxel.models.get('prop:keeper')===npcModel,'Panning with an NPC cannot evict its original source-group owner during motion');
assert.ok(voxel.regionStats.demand.pinnedKeys.includes('0,1'),'Actual model owner stays pinned in addition to current/end positions');
voxel.move('prop:keeper',departingNpc,sourceNpc,1);departingNpc=null;
{const callbacks=[...frames.values()];frames.clear();time+=40;for(const fn of callbacks)fn(time);}voxel.sync();drain();
// Selected resources and a distant combat enemy remain pinned while panning.
game.selected={x:78,y:39};state.enemies=[{id:'enemy',kind:3,hp:4,x:90,y:50}];state.combat={turn:0};voxel.sync();env.camera.center({x:1,y:1});drain();
assert.ok(voxel.models.has('prop:far'));assert.ok(voxel.regionStats.demand.pinnedKeys.includes('5,3'));
assert.ok(voxel.regionStats.ready<=Math.max(12,voxel.regionStats.demand.pinnedKeys.length));
state.combat=false;state.enemies=[];game.selected=null;voxel.sync();voxel.fit();drain();
assert.equal(voxel.regionStats.mode,'overview');assert.equal(voxel.regionReady(hero.x,hero.y),false);
const canvas=elements.get('viewport').children.find(node=>node.id==='voxel-canvas');
function tapCell(x,y){const p=new Three.Vector3(x+.5,0,y+.5).project(voxel.camera),event={pointerId:1,clientX:(p.x+1)*195,clientY:(1-p.y)*260};canvas.events.get('pointerdown')(event);canvas.events.get('pointerup')(event);}
tapCell(78,39);assert.equal(tapped,null,'Overview fallback cannot invoke an invisible logical chest');
env.camera.center(hero);drain();assert.equal(voxel.regionStats.mode,'detail');
// Old scheduled callbacks cannot add groups after the next scene's mount.
env.camera.center({x:88,y:32});const oldCallbacks=[...frames.values()];
scene={id:'replacement',W:10,H:10,outdoor:false,props:[],decor:[],lights:[],tiles:Array.from({length:10},()=>Array(10).fill('floor'))};state.scene=scene.id;hero.x=4;hero.y=4;game.selected=null;voxel.sync();
for(const fn of oldCallbacks){time+=40;fn(time);}
assert.equal(voxel.regionStats.mode,'full');assert.ok(![...voxel.models.keys()].some(id=>id.startsWith('prop:')));assert.ok(!voxel.scene.children[0].children.some(node=>node.name.startsWith('region:')&&node.name!=='region:full'));
console.log('PASS source renderer full-scene compatibility, one-group first build, actor independence, stateful remount, live resource plateau, combat pins, overview picking and stale callback cancellation');
