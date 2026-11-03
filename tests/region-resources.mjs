import assert from 'node:assert/strict';
import * as T from 'three';
const path = new URL('../src/region-rendering.js', import.meta.url);
const api = await import(path).catch(error => error.code === 'ERR_MODULE_NOT_FOUND' ? {} : Promise.reject(error));
assert.equal(typeof api.disposeOwnedGroup, 'function', 'streamed renderer needs one ownership-aware release path');
const {disposeOwnedGroup,countGroupResources,regionConfig,regionChunkId,cameraGroundBounds,collectRegionPins,canSelectRegionCell,expandRegionBounds}=api;

// Source/batch aliases dispose once; resources owned outside a chunk survive it.
{
 const root=new T.Group(), shared=new T.BoxGeometry(), local=new T.CylinderGeometry(), common=new T.MeshStandardMaterial(), owned=new T.MeshStandardMaterial();
 const a=new T.Mesh(local,common), batch=new T.InstancedMesh(local,owned,2), b=new T.Mesh(shared,common);
 batch.userData.disposeMaterial=true; root.add(a,batch,b);
 let sharedDisposed=0,localDisposed=0,commonDisposed=0,ownedDisposed=0,batchDisposed=0;
 shared.addEventListener('dispose',()=>sharedDisposed++);local.addEventListener('dispose',()=>localDisposed++);
 common.addEventListener('dispose',()=>commonDisposed++);owned.addEventListener('dispose',()=>ownedDisposed++);batch.addEventListener('dispose',()=>batchDisposed++);
 assert.deepEqual(countGroupResources(root),{meshes:3,geometries:2,materials:2,textures:0,lights:0});
 disposeOwnedGroup(root,{sharedGeometries:new Set([shared])});
 assert.deepEqual([sharedDisposed,localDisposed,commonDisposed,ownedDisposed,batchDisposed],[0,1,0,1,1]);
 const neighbor=new T.Mesh(shared,common);assert.equal(neighbor.geometry,shared);assert.equal(neighbor.material,common);
}
// Owned overview texture and shadow map are freed as well.
{
 const root=new T.Group(),texture=new T.Texture(),mat=new T.MeshBasicMaterial({map:texture}),mesh=new T.Mesh(new T.PlaneGeometry(),mat),light=new T.PointLight();
 mesh.userData.disposeMaterial=true;mesh.userData.disposeTexture=true;root.add(mesh,light);
 let freed=0,shadows=0;texture.addEventListener('dispose',()=>freed++);light.shadow.dispose=()=>shadows++;
 disposeOwnedGroup(root);assert.equal(freed,1);assert.equal(shadows,1);
}
assert.equal(regionConfig({W:96,H:64,outdoor:true}).enabled,true);
assert.equal(regionConfig({W:20,H:20,outdoor:true}).enabled,false);
assert.equal(regionConfig({W:96,H:64,outdoor:false}).enabled,false);
assert.equal(regionConfig({W:96,H:64,outdoor:true},'?regionFull=1').enabled,true);
assert.equal(regionConfig({W:96,H:64,outdoor:true},'?qa=1&regionFull=1').enabled,false);
assert.equal(regionConfig({W:96,H:64,outdoor:true},'?qa=1&regionChunk=12&regionBudget=9').chunkSize,12);
assert.equal(regionChunkId(16,31,16),'1,1');assert.equal(regionChunkId(95,63,16),'5,3');
const config={enabled:true,chunkSize:16},stream={isReady:id=>id==='0,0'};
assert.equal(canSelectRegionCell(config,{mode:'detail'},stream,3,4),true);
assert.equal(canSelectRegionCell(config,{mode:'detail'},stream,30,4),false);
assert.equal(canSelectRegionCell(config,{mode:'overview'},stream,3,4),false);
assert.equal(canSelectRegionCell({enabled:false},{mode:'detail'},null,30,4),true);
{
 const camera=new T.OrthographicCamera(-5,5,6,-6,.1,200);camera.position.set(50,12,38.4);camera.lookAt(50,0,30);camera.updateProjectionMatrix();camera.updateMatrixWorld();
 const bounds=cameraGroundBounds(camera);assert.ok(bounds.minX<46&&bounds.maxX>54);assert.ok(bounds.minY<24&&bounds.maxY>36);
 // Large overview still computes plane intersections behind the near plane.
 camera.top=80;camera.bottom=-80;camera.updateProjectionMatrix();const wide=cameraGroundBounds(camera);assert.ok(wide.maxY-wide.minY>160);
 const extended=expandRegionBounds({minX:10,minY:10,maxX:20,maxY:20},{padding:1,lights:[{x:3,y:15,distance:8},{x:90,y:90,distance:8}]});
 assert.ok(extended.minX<=3);assert.ok(extended.maxX<90);
}
{
 const hero={id:'hero',x:1,y:1},target={id:'enemy',x:80,y:45},npc={id:'npc',x:32,y:15}, route=Array.from({length:70},(_,i)=>({x:i+2,y:1}));
 const game={active:()=>hero,all:()=>[hero,target],state:{party:[hero],combat:{turn:0}},selected:{x:65,y:14},route,props:[npc],departingNpc:{id:'depart',x:8,y:5}};
 const motion=new Map([['hero',{from:{x:1.5,z:1.5},to:{x:2.5,z:1.5}}]]);
 const pins=collectRegionPins(game,motion,[],{id:'npc'},{p:{x:45,y:20}});
 assert.ok(pins.some(p=>p.x===80&&p.y===45),'combat actors stay pinned away from camera');
 assert.ok(pins.some(p=>p.x===32&&p.y===15),'speaker stays pinned');
 assert.ok(pins.some(p=>p.x===65&&p.y===14),'selected target stays pinned');
 assert.ok(pins.length<25,'long movement routes pin only their immediate part');
 assert.equal(pins.some(p=>p.x===70&&p.y===1),false);
}
console.log('PASS region renderer resource ownership, ready-aware cells, configuration, camera/light demand and bounded gameplay pins');
