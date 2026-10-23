import assert from 'node:assert/strict';
import test from 'node:test';
import * as T from 'three';
import {createIsland,isLand,sampleIsland} from '../src/islands/terrain.js';
import {islandRenderConfig,prepareIslandOverview,buildIslandTerrain,islandFoliage} from '../src/islands/render.js';
import {disposeOwnedGroup,countGroupResources,cameraGroundBounds,expandRegionBounds} from '../src/region-rendering.js';
import {planRegionChunks} from '../src/region-streaming.js';

const scene=size=>{const island=createIsland('render-budget-'+size,size);return {id:'island',island,W:island.W,H:island.H,props:[],landmarks:[]};};
const sample=(S,x,y)=>({...sampleIsland(S.island,x,y),tile:isLand(S.island,x,y)?'floor':'water'});

test('compact islands always use ten-cell streaming even with QA full-scene override',()=>{
  const legacy={enabled:false,chunkSize:32,maxChunks:12,margin:1};
  assert.equal(islandRenderConfig(legacy,{W:30,H:30}),legacy);
  assert.deepEqual(islandRenderConfig(legacy,scene(1000)),{...legacy,enabled:true,chunkSize:10,maxChunks:32});
});

test('minimum and maximum island overviews allocate and sample at most 256 squared',()=>{
  for(const size of [600,1000]){
    const S=scene(size);let calls=0;
    const result=prepareIslandOverview(S,{sample(S,x,y){calls++;assert.ok(x>=0&&x<S.W&&y>=0&&y<S.H);return sample(S,x,y);}});
    assert.equal(result.width,256);assert.equal(result.height,256);
    assert.equal(calls,256*256);assert.equal(result.samples,calls);
    assert.equal(result.pixels.byteLength,256*256*4);
    assert.ok(result.pixels.some((value,i)=>i%4!==3&&value>150),'dry and coast colors are visible');
    assert.ok(result.pixels.every((value,i)=>i%4!==3||value===255),'ocean also remains opaque');
  }
});

test('overview bound cannot be enlarged by caller and preserves aspect ratio',()=>{
  const S={...scene(1000),H:520};let calls=0;
  const result=prepareIslandOverview(S,{maxSide:Infinity,sample(...args){calls++;return sample(...args);}});
  assert.equal(result.width,256);assert.equal(result.height,128);assert.equal(calls,32768);
  for(const invalid of [0,-1,NaN,1.2])assert.throws(()=>prepareIslandOverview({...S,W:invalid}),/bounds/);
});

test('stale overview stops sampling before publishing any texture data',()=>{
  const S=scene(600);let current=true,calls=0;
  assert.equal(prepareIslandOverview(S,{isCurrent:()=>current,sample(...args){if(++calls===20)current=false;return sample(...args);}}),null);
  assert.ok(calls<=256,'at most one bounded row completes after invalidation');
  calls=0;assert.equal(prepareIslandOverview(S,{isCurrent:()=>false,sample(){calls++;}}),null);assert.equal(calls,0);
});

test('chunk builder rejects full-island geometry before sampling or GPU allocation',()=>{
  const S=scene(1000),geo=new T.BoxGeometry();let samples=0,materials=0;
  const options={geometry:geo,sample(){samples++;},materialFor(){materials++;}};
  for(const rect of [{x:0,y:0,w:S.W,h:S.H},{x:-1,y:0,w:10,h:10},{x:0,y:0,w:10.5,h:10},{x:S.W-5,y:0,w:10,h:10}]){
    assert.throws(()=>buildIslandTerrain(S,rect,options),/chunk/);
  }
  assert.equal(samples,0);assert.equal(materials,0);geo.dispose();
});

test('continuous biome colors use bounded shared materials and instance colors across traversals',()=>{
  const S=scene(1000),geo=new T.BoxGeometry(),materials=new Map(),counts=[];let samples=0;
  const materialFor=key=>{if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color:0xffffff}));return materials.get(key);};
  const current=(...args)=>{samples++;return sample(...args);};
  for(let lap=0;lap<3;lap++)for(let row=200;row<850;row+=100)for(let x=200;x<850;x+=100){
    const root=buildIslandTerrain(S,{x,y:row,w:10,h:10},{geometry:geo,materialFor,sample:current});
    const resources=countGroupResources(root);counts.push(resources.materials);
    assert.ok(resources.materials<=20);assert.equal(resources.geometries,1);
    root.traverse(mesh=>{if(!mesh.isInstancedMesh)return;assert.ok(mesh.instanceColor);assert.ok(mesh.count<=500);assert.equal(mesh.userData.disposeMaterial,undefined);});
    const retired=[...materials.values()].map(mat=>{let disposed=0;mat.addEventListener('dispose',()=>disposed++);return ()=>disposed;});
    disposeOwnedGroup(root,{sharedGeometries:new Set([geo])});assert.ok(retired.every(count=>count()===0),'shared material survives every unload');
  }
  assert.equal(samples,3*7*7*100);// 9 stone tiles + water + painted ground variants (grass 4, sand 3, dirt 3, stone 2).
  assert.ok(materials.size<=22,'all island travel shares a fixed set of material kinds');
  assert.ok(counts.some(count=>count>1));geo.dispose();for(const mat of materials.values())mat.dispose();
});

test('water, coast and dry land have visible opaque geometry without collision-height changes',()=>{
  const S=scene(600),[portX,portY]=S.island.landmarks.port,geo=new T.BoxGeometry(),materials=new Map();
  const materialFor=key=>{if(!materials.has(key))materials.set(key,new T.MeshStandardMaterial({color:0xffffff}));return materials.get(key);};
  const root=buildIslandTerrain(S,{x:portX-5,y:portY-5,w:10,h:10},{geometry:geo,materialFor,sample});
  const kinds=new Set(),matrix=new T.Matrix4();let floors=0;
  root.traverse(mesh=>{if(!mesh.isInstancedMesh)return;kinds.add(mesh.userData.islandMaterial);assert.equal(mesh.material.transparent,false);
    if(mesh.userData.islandMaterial==='water')return;
    if(mesh.userData.islandMaterial==='foam')return;
    for(let i=0;i<mesh.count;i++){mesh.getMatrixAt(i,matrix);const e=matrix.elements;assert.ok(Math.abs(e[13]+e[5]/2+.01)<1e-6,'land upper face stays at existing ground height');floors++;}
  });
  assert.ok(kinds.has('water'));assert.ok(kinds.has('foam'));assert.ok(floors>0);
  disposeOwnedGroup(root,{sharedGeometries:new Set([geo])});geo.dispose();for(const mat of materials.values())mat.dispose();
});

test('nearby foliage is deterministic nonsolid decoration, bounded and avoids routes, props and arrival',()=>{
  const S=scene(600),rect={x:200,y:200,w:10,h:10},rich=(S,x,y)=>({land:true,biome:'forest',surface:'grass',color:0x5f8a4a,decoration:1,height:.3});
  const TALL=['tree','bush'],COVER=['grass','flowers','rock','stump','mushrooms','reeds'];
  const first=islandFoliage(S,rect,{sample:rich});assert.deepEqual(islandFoliage(S,rect,{sample:rich}),first);
  const tall=first.filter(p=>TALL.includes(p.model));
  assert.ok(tall.length>0&&tall.length<=25,'trees stay on the sparse 2-cell lattice');
  assert.ok(first.length<=rect.w*rect.h,'at most one decoration per cell');
  assert.ok(first.some(p=>COVER.includes(p.model)),'ground cover fills the space between trees');
  assert.ok(first.every(p=>p.solid===false&&[...TALL,...COVER].includes(p.model)));
  assert.ok(first.every(p=>Math.abs(p.ox)<.5&&Math.abs(p.oz)<.5),'sub-cell offsets never leave the cell');
  assert.deepEqual(islandFoliage(S,rect,{sample:()=>({...rich(),road:true})}),[]);
  const props=tall.map(p=>({...p,type:'npc'})),occupied={...S,props};
  assert.ok(islandFoliage(occupied,rect,{sample:rich}).every(f=>props.every(p=>Math.abs(p.x-f.x)>1||Math.abs(p.y-f.y)>1)),'nothing grows on or beside props');
  const [x,y]=S.island.landmarks.arrival;
  assert.ok(islandFoliage(S,{x:x-5,y:y-5,w:10,h:10},{sample:rich}).every(p=>!TALL.includes(p.model)||Math.hypot(p.x-x,p.y-y)>=3),'the landing spot keeps a small open ring');
});

test('failed shared-material lookup releases partially built instance buffers and retains shared owners',()=>{
  const S=scene(600),geo=new T.BoxGeometry(),mat=new T.MeshStandardMaterial(),original=T.InstancedMesh.prototype.dispose;
  let meshesDisposed=0,geometryDisposed=0,materialDisposed=0,lookups=0;
  geo.addEventListener('dispose',()=>geometryDisposed++);mat.addEventListener('dispose',()=>materialDisposed++);
  T.InstancedMesh.prototype.dispose=function(){meshesDisposed++;return original.call(this);};
  try{
    assert.throws(()=>buildIslandTerrain(S,{x:100,y:100,w:2,h:1},{geometry:geo,
      sample(_S,x){return {land:true,tile:'floor',surface:x===100?'grass':'stone',color:0x789058};},
      materialFor(){if(++lookups>1)throw new Error('shared material fixture');return mat;}}),/shared material fixture/);
    assert.equal(meshesDisposed,1);assert.equal(geometryDisposed,0);assert.equal(materialDisposed,0);
  }finally{T.InstancedMesh.prototype.dispose=original;geo.dispose();mat.dispose();}
});


test('unchanged landscape camera stays playable at short map heights and returns from overview',()=>{
  const S=scene(1000),config=islandRenderConfig({enabled:true,chunkSize:10,maxChunks:12,margin:1},S);
  for(const [w,h] of [[852,303],[852,202]])for(const x of [85,89]){
    const half=4.8,aspect=w/h,camera=new T.OrthographicCamera(-half*aspect,half*aspect,half,-half,.1,80);
    camera.position.set(x+.5,12,315.5+12*.7);camera.lookAt(x+.5,0,315.5);camera.updateProjectionMatrix();camera.updateMatrixWorld();
    const demand={width:S.W,height:S.H,bounds:expandRegionBounds(cameraGroundBounds(camera),{padding:2.25}),pins:[{x,y:315}],...config};
    for(const previousMode of ['detail','overview']){
      const plan=planRegionChunks({...demand,previousMode});
      assert.equal(plan.mode,'detail',`${w}x${h} x${x} previous ${previousMode}`);
      assert.ok(plan.visibleKeys.length<=plan.chunks.length);assert.ok(plan.chunks.length<=32);
    }
  }
});
