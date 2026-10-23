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
import {stoneTile,createStoneMaterials} from '../src/stone-atlas.js';
import {createPixelSurfaceMaterials} from '../src/islands/pixel-surfaces.js';
import {advanceClock,clockParts,outdoorLight} from '../src/daynight.js';
import {SURFACE_BY_CODE,surfaceColor,wallColor} from '../src/worldgen/surfaces.js';
import * as regionHelpers from '../src/region-rendering.js';
import * as Props from '../src/props.js';
import * as islandRenderHelpers from '../src/islands/render.js';
import {createIsland} from '../src/islands/terrain.js';
import {tileAt} from '../src/islands/scene.js';
const noop=()=>{},frames=new Map(),elements=new Map();let nextFrame=0,time=0,tapped='unset';
// Keep the real atlas/material cache; stub only the browser image request.
const stoneMaterials=new Map();let atlasLoaded,atlasFailed,atlasLoads=0;
function createTestStoneMaterials(){
 const lookup=createStoneMaterials({load(url,onLoad,_progress,onError){
  assert.equal(url,'assets/terrain-materials.png');atlasLoads++;atlasLoaded=onLoad;atlasFailed=onError;
 }});
 return tile=>{const material=lookup(tile);stoneMaterials.set(tile,material);return material;};
}
const context=new Proxy({createRadialGradient:()=>({addColorStop:noop}),createImageData:(w,h)=>({data:new Uint8ClampedArray(w*h*4)})},{get:(o,k)=>o[k]??noop,set:(o,k,v)=>(o[k]=v,true)});
function element(){return {hidden:false,dataset:{},style:{},clientWidth:390,clientHeight:520,children:[],events:new Map(),classList:{add:noop,remove:noop,toggle:noop},setAttribute:noop,prepend(...nodes){this.children.unshift(...nodes);},append(...nodes){this.children.push(...nodes);},addEventListener(name,fn){this.events.set(name,fn);},replaceChildren(...nodes){this.children=nodes;},remove:noop,setPointerCapture:noop,getContext:()=>context,getBoundingClientRect:()=>({left:0,top:0,width:390,height:520,bottom:520,height:520}),insertAdjacentHTML:noop};}
const document={body:element(),hidden:false,createElement:element,addEventListener:noop,getElementById(id){if(!elements.has(id))elements.set(id,element());return elements.get(id);}};
class Renderer{constructor(){this.shadowMap={};this.info={memory:{geometries:0,textures:0},render:{calls:0,triangles:0}};}setPixelRatio(){}setSize(){}setRenderTarget(){}render(scene){scene.updateMatrixWorld(true);}readRenderTargetPixels(_t,_x,_y,_w,_h,pixels){pixels.fill(0);}}
const hero={id:'hero',kind:2,classId:'fighter',hp:10,x:8,y:8,hands:[],appearance:{}},hidden={id:'hidden',x:4,y:4,type:'chest',solid:true};
let departingNpc=null;
let scene={id:'small',W:20,H:20,outdoor:false,props:[hidden],decor:[],lights:[],tiles:Array.from({length:20},()=>Array(20).fill('floor'))},showHidden=false;
const state={scene:'small',party:[hero],active:'hero',seed:4,settings:{lights:false,animations:false,ambient:.5,intensity:1},loot:{},enemies:[],combat:false};
const game={state,get scene(){return scene;},get props(){return scene.props.filter(p=>p.id!=='hidden'||showHidden).map(p=>p.id===departingNpc?.id?departingNpc:p);},get departingNpc(){return departingNpc;},active:()=>hero,all:()=>[hero,...state.enemies],animate:()=>false,render:noop,isOpen:p=>!!state.doors?.[p.id],selected:null,route:[],mapTap:p=>{tapped=p;},dismissMapActions:noop};
const World={tile:tileAt};
const env={T:{...Three,WebGLRenderer:Renderer},stoneTile,createStoneMaterials:createTestStoneMaterials,createPixelSurfaceMaterials,advanceClock,clockParts,outdoorLight,WorldGen:{SURFACE_BY_CODE,surfaceColor,wallColor},npcFacing,faceCell,batchStaticModels,createMenuStage,texelPass,TEXEL,fitPreviewCamera,fillSilhouette,characterParts,characterProfile,characterSpec,characterBuild,enemyModel,bindPromptInput,planRegionChunks,createChunkStream,...regionHelpers,...islandRenderHelpers,
 document,performance:{now:()=>time},requestAnimationFrame:fn=>{const id=++nextFrame;frames.set(id,fn);return id;},cancelAnimationFrame:id=>frames.delete(id),ResizeObserver:class{observe(){}},setTimeout:noop,console,World,Props,devicePixelRatio:1,location:{search:'?qa=1'},gameDebug:game,Torches:{lightSources:()=>[],fixture:()=>({present:true})}};env.window=env;env.document.getElementById('dialogue').hidden=true;
vm.createContext(env);vm.runInContext(readFileSync(new URL('../src/voxel.js',import.meta.url),'utf8').replace(/^import .*;\n/gm,''),env);
const voxel=env.voxel;
assert.equal(voxel.regionStats.enabled,false);assert.ok(voxel.models.has('hero'));
function environment(id){let root;voxel.scene.traverse(node=>{if(node.name==='region:'+id)root=node;});return root;}
function floorMesh(root,x,y){
 const matrix=new Three.Matrix4();
 return root.children.find(mesh=>mesh.isInstancedMesh&&Array.from({length:mesh.count},(_,i)=>i).some(i=>{
  mesh.getMatrixAt(i,matrix);const e=matrix.elements;return Math.abs(e[12]-(x+.5))<1e-6&&Math.abs(e[13]+.095)<1e-6&&Math.abs(e[14]-(y+.5))<1e-6;
 }));
}
const interiorFloor=floorMesh(environment('full'),8,8);
assert.equal(interiorFloor.material,stoneMaterials.get(stoneTile({},8,8)),'Small interior uses the actual cached stone fallback');
assert.equal(interiorFloor.material.map,null,'Small interior remains visible before the atlas is loaded');
assert.equal(interiorFloor.material.transparent,false);assert.equal(interiorFloor.material.opacity,1);
atlasFailed();assert.equal(interiorFloor.material.map,null,'Image failure leaves the interior fallback opaque');
showHidden=true;voxel.sync();
assert.ok(voxel.models.has('prop:hidden'),'A story prop becoming visible in the same scene needs its existing source model');

// Exercise the real frame placement and the existing dedicated-press handler.
// Landscape HUD rectangles may sit beside the viewport rather than below it.
const promptViewport=elements.get('viewport'),promptDock=document.getElementById('play-dock');
const promptElement=promptViewport.children.find(node=>node.className==='object-prompt');
const originalViewportRect=promptViewport.getBoundingClientRect,originalDockRect=promptDock.getBoundingClientRect;
promptElement.offsetWidth=190;promptElement.offsetHeight=125;
let promptActions=0;
function promptFixture({width,height,left=0,top=0,dock,target={x:hero.x,y:hero.y}}){
 promptViewport.clientWidth=width;promptViewport.clientHeight=height;
 promptViewport.getBoundingClientRect=()=>({left,top,width,height,right:left+width,bottom:top+height});
 promptDock.getBoundingClientRect=()=>({...dock,right:dock.left+dock.width,bottom:dock.top+dock.height});
 env.objectPrompt={p:{...target,name:'Клетка'},actions:[{id:'move',label:'Идти сюда',enabled:true,run:()=>promptActions++}]};
 env.camera.reset();env.tick(time+=40);
 return {left:left+parseFloat(promptElement.style.left)-promptElement.offsetWidth/2,top:top+parseFloat(promptElement.style.top),width:promptElement.offsetWidth,height:promptElement.offsetHeight};
}
function assertPromptFits(rect,viewport,dock){
 assert.equal(promptElement.hidden,false,'Visible target offers its prepared movement action');
 assert.ok(rect.left>=viewport.left+6&&rect.left+rect.width<=viewport.left+viewport.width-6);
 assert.ok(rect.top>=viewport.top+6&&rect.top+rect.height<=viewport.top+viewport.height-6);
 assert.ok(rect.left+rect.width<=dock.left||rect.left>=dock.left+dock.width||rect.top+rect.height<=dock.top||rect.top>=dock.top+dock.height,'Whole popup remains outside the HUD hit region');
 const button=promptElement.children.find(node=>node.dataset?.action==='move');assert.ok(button&&!button.disabled);
 const buttonRect={left:rect.left+7,top:rect.top+31,width:rect.width-14,height:44};
 assert.ok(buttonRect.width>=44&&buttonRect.height>=44&&buttonRect.top+buttonRect.height<=rect.top+rect.height);
 const before=promptActions,target={closest:()=>button};
 promptElement.onclick({detail:1,target,stopPropagation:noop});assert.equal(promptActions,before,'A map compatibility click still cannot trigger the action');
 promptElement.events.get('pointerdown')({target,stopPropagation:noop});
 promptElement.onclick({detail:1,target,stopPropagation:noop});assert.equal(promptActions,before+1,'Dedicated press reaches the actual prepared action');
}
{
 const viewport={width:632,height:303,left:220,top:50},dock={left:4,top:50,width:210,height:303};
 assertPromptFits(promptFixture({...viewport,dock}),viewport,dock);
}
{
 const viewport={width:852,height:303,left:0,top:50},dock={left:0,top:50,width:176,height:303};
 assertPromptFits(promptFixture({...viewport,dock}),viewport,dock);
}
{
 const viewport={width:390,height:520,left:0,top:0},dock={left:0,top:420,width:390,height:100};
 assertPromptFits(promptFixture({...viewport,dock}),viewport,dock);
 promptFixture({...viewport,dock,target:{x:hero.x,y:hero.y+4}});assert.equal(promptElement.hidden,true,'A target behind the portrait bottom dock stays unavailable');
}
// Restore the original lifecycle fixture after bounded placement checks.
env.objectPrompt=null;promptViewport.clientWidth=390;promptViewport.clientHeight=520;
promptViewport.getBoundingClientRect=originalViewportRect;promptDock.getBoundingClientRect=originalDockRect;
env.camera.reset();env.tick(time+=40);
console.log('PASS real popup placement and press guards with landscape side HUD and portrait bottom HUD');

function loadLarge(){
 scene={id:'large',W:96,H:64,outdoor:true,visualSeed:4,surface:Array.from({length:64},()=>Array(96).fill('c')),props:[{id:'keeper',type:'npc',x:9,y:28,name:'Хранитель'}, {id:'open-door',type:'door',x:18,y:30}, {id:'camp',x:18,y:28,type:'chest'},{id:'far',x:78,y:39,type:'chest'},...Array.from({length:60},(_,i)=>({id:'tree'+i,x:3+i%20*4,y:3+Math.floor(i/20)*18,model:'tree',type:'decor',solid:false}))],decor:[],lights:[],tiles:Array.from({length:64},()=>Array(96).fill('floor'))};
 state.scene='large';state.doors={'open-door':true};hero.x=8;hero.y=32;game.selected=null;game.route=[];voxel.sync();env.camera.center(hero);
}
function drain(){for(let n=0;n<80&&voxel.regionStats.queued;n++){const callbacks=[...frames.entries()];frames.clear();time+=40;for(const [,fn]of callbacks)fn(time);}assert.equal(voxel.regionStats.queued,0);assert.equal(voxel.regionStats.errors,0);}
function visit(x,y){hero.x=x;hero.y=y;game.selected=null;voxel.sync();env.camera.center(hero);drain();}
loadLarge();assert.ok(voxel.regionStats.queued>0,'Only one group is built synchronously');assert.ok(voxel.regionStats.ready<=1);drain();
assert.equal(voxel.regionStats.enabled,true);assert.equal(voxel.regionReady(8,32),true);assert.ok(voxel.regionStats.ready<=12);assert.ok(voxel.staticBatchStats.props>0);
const firstStoneGroup=environment('0,2'),firstStoneFloor=floorMesh(firstStoneGroup,8,32);
const sharedStoneMaterial=stoneMaterials.get(stoneTile({surface:'cobble'},8,32));
assert.equal(firstStoneFloor.material,sharedStoneMaterial,'Streamed cobble variants use global cell coordinates');
const sharedBeforeAtlas=voxel.regionStats.shared;
atlasLoaded(new Three.Texture({width:1448,height:1086}));
const sharedStoneMap=sharedStoneMaterial.map;
assert.ok(sharedStoneMap?.isTexture,'Real atlas callback updates an already mounted chunk material');
assert.equal(voxel.regionStats.shared.textures-sharedBeforeAtlas.textures,stoneMaterials.size,'Shared-resource statistics include the atlas maps');
let stoneMaterialDisposed=0,stoneMapDisposed=0,stoneMeshDisposed=0;
sharedStoneMaterial.addEventListener('dispose',()=>stoneMaterialDisposed++);
sharedStoneMap.addEventListener('dispose',()=>stoneMapDisposed++);
firstStoneFloor.addEventListener('dispose',()=>stoneMeshDisposed++);
visit(88,32);
assert.equal(environment('0,2'),undefined,'Distant cobble group really unloads');
assert.equal(firstStoneGroup.parent,null);assert.equal(stoneMeshDisposed,1,'Eviction releases the owned instanced mesh');
assert.equal(stoneMaterialDisposed,0,'Eviction keeps the material used by neighboring chunks');
assert.equal(stoneMapDisposed,0,'Eviction keeps the shared atlas map');
visit(8,32);
const remountedStoneGroup=environment('0,2'),remountedStoneFloor=floorMesh(remountedStoneGroup,8,32);
assert.notEqual(remountedStoneGroup,firstStoneGroup,'Returning creates a new chunk group');
assert.equal(remountedStoneFloor.material,sharedStoneMaterial,'Remount reuses the cached material');
assert.equal(remountedStoneFloor.material.map,sharedStoneMap,'Remount reuses the same live atlas map');
assert.equal(atlasLoads,1,'Chunk traversal does not request another atlas image');
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
assert.equal(floorMesh(environment('full'),4,4).material,stoneMaterials.get(stoneTile({},4,4)),'A later small interior retains the common material cache');
assert.equal(stoneMaterialDisposed,0);assert.equal(stoneMapDisposed,0);assert.equal(atlasLoads,1);
console.log('PASS source renderer full-scene compatibility, opaque interior fallback, shared stone material/map retention, one-group first build, actor independence, stateful remount, live resource plateau, combat pins, overview picking and stale callback cancellation');

// Run the same source renderer against compact metadata, without any cell grids.
const island=createIsland('renderer-lifecycle',1000),[portX,portY]=island.landmarks.port;
scene={id:'island',layoutKey:'renderer-island-v1',W:island.W,H:island.H,island,outdoor:true,regionStreaming:{chunkSize:10,maxChunks:32},
 props:[{id:'island-chest',x:portX+8,y:portY+4,type:'chest'}],landmarks:[],decor:[],lights:[]};
state.scene=scene.id;state.loot={};hero.x=island.landmarks.arrival[0];hero.y=island.landmarks.arrival[1];
env.location.search='?qa=1&regionFull=1';voxel.sync();env.camera.center(hero);drain();
assert.equal(voxel.regionStats.enabled,true,'Compact islands never allocate a full-scene mesh, even with QA full override');
assert.equal(voxel.regionStats.chunkSize,10);
assert.deepEqual({...voxel.regionStats.overview},{width:256,height:256,samples:65536});
const islandOverview=voxel.scene.children[0].children.find(node=>node.name==='region-overview').children[0];
assert.ok(islandOverview.position.y<-.045,'Overview is below detailed ocean so it cannot cover shoreline foam');
assert.equal(islandOverview.material.transparent,false,'Island overview ocean remains visible');
const islandActor=voxel.models.get('hero');
visit(portX+3,portY);
let waterMeshes=0,foamMeshes=0;
for(const resource of voxel.scene.children[0].children)resource.traverse(mesh=>{
 if(mesh.userData.islandMaterial==='water')waterMeshes++;
 if(mesh.userData.islandMaterial==='foam')foamMeshes++;
});
assert.ok(waterMeshes>0&&foamMeshes>0,'Coast demand mounts current-style sea and shoreline');
tapCell(portX-1,portY);assert.equal(tapped,null,'Visible ready ocean is not a walkable map selection');
tapCell(portX+1,portY);assert.equal(tapped.x,portX+1);assert.equal(tapped.y,portY,'Ready dry coast remains selectable');
for(const center of island.biomes)visit(Math.round(center.x),Math.round(center.y));
visit(portX+3,portY);const islandShared={...voxel.regionStats.shared},islandLive={...voxel.regionStats.resources};
for(let lap=0;lap<3;lap++){
 for(const center of island.biomes)visit(Math.round(center.x),Math.round(center.y));
 visit(portX+3,portY);assert.deepEqual({...voxel.regionStats.shared},islandShared,'Continuous sampler colors cannot grow shared cache across remounts');
 assert.deepEqual({...voxel.regionStats.resources},islandLive,'Repeated visits return to the same owned resource count');
 assert.ok(voxel.regionStats.ready<=32);
 assert.equal(voxel.models.get('hero'),islandActor,'Island chunk eviction retains the live actor');
}
assert.ok([...voxel.models.keys()].every(id=>!id.startsWith('prop:')||id==='prop:island-chest'),'Visual foliage never becomes an interactive/collision prop');
voxel.fit();drain();assert.equal(voxel.regionStats.mode,'overview');assert.deepEqual({...voxel.regionStats.overview},{width:256,height:256,samples:65536});
tapCell(portX+8,portY+4);assert.equal(tapped,null,'Island overview cannot select an unloaded logical chest');
console.log('PASS compact island source renderer: bounded ten-cell groups/256² overview, opaque sea/foam, dry-only ready picking, actor ownership and shared material/live resource plateau');
