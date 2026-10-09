import * as T from 'three';

// Experimental render limits. Logical scenes, coordinates and saves are unchanged.
export function regionConfig(scene, search='') {
  const query=new URLSearchParams(search),qa=query.get('qa')==='1',options=scene.regionStreaming||{};
  const integer=(value,fallback,min,max)=>Number.isInteger(Number(value))&&Number(value)>=min&&Number(value)<=max?Number(value):fallback;
  return {enabled:!!scene.outdoor&&scene.W*scene.H>=1024&&options.enabled!==false&&!(qa&&query.get('regionFull')==='1'),
    chunkSize:integer(qa?query.get('regionChunk')??options.chunkSize:options.chunkSize,16,8,32),
    maxChunks:integer(qa?query.get('regionBudget')??options.maxChunks:options.maxChunks,12,4,32),margin:1};
}
export const regionChunkId=(x,y,size)=>`${Math.floor(x/size)},${Math.floor(y/size)}`;
export function canSelectRegionCell(config,plan,stream,x,y) {
  return !config?.enabled || plan?.mode==='detail' && !!stream?.isReady(regionChunkId(x,y,config.chunkSize));
}

// Extend the mathematical ray to the ground even if a wide ortho near plane
// starts below it. The camera's near/far distances must accommodate the view too.
export function cameraGroundBounds(camera) {
  const ray=new T.Raycaster(),points=[];
  for(const x of [-1,1])for(const y of [-1,1]){
    ray.setFromCamera(new T.Vector2(x,y),camera);
    if(Math.abs(ray.ray.direction.y)<1e-7)continue;
    points.push(ray.ray.origin.clone().addScaledVector(ray.ray.direction,-ray.ray.origin.y/ray.ray.direction.y));
  }
  if(!points.length)return {minX:0,minY:0,maxX:0,maxY:0};
  return {minX:Math.min(...points.map(p=>p.x)),minY:Math.min(...points.map(p=>p.z)),maxX:Math.max(...points.map(p=>p.x)),maxY:Math.max(...points.map(p=>p.z))};
}
export function expandRegionBounds(bounds,{padding=1,lights=[]}={}) {
  const result={minX:bounds.minX-padding,minY:bounds.minY-padding,maxX:bounds.maxX+padding,maxY:bounds.maxY+padding};
  for(const light of lights){
    const distance=light.distance??8;
    const dx=Math.max(bounds.minX-light.x,0,light.x-bounds.maxX),dy=Math.max(bounds.minY-light.y,0,light.y-bounds.maxY);
    if(Math.hypot(dx,dy)>distance)continue;
    const x=light.wallX??Math.floor(light.x),y=light.wallY??Math.floor(light.y);
    result.minX=Math.min(result.minX,x);result.maxX=Math.max(result.maxX,x+1);
    result.minY=Math.min(result.minY,y);result.maxY=Math.max(result.maxY,y+1);
  }
  return result;
}
export function collectRegionPins(game,motions=new Map(),effects=[],speaker=null,prompt=null,models=new Map()) {
  const pins=[],seen=new Set();
  const add=p=>{if(!p||!Number.isFinite(p.x)||!Number.isFinite(p.y))return;const key=`${p.x},${p.y}`;if(!seen.has(key)){seen.add(key);pins.push({x:p.x,y:p.y});}};
  const addOwner=model=>add(model?.userData.regionAnchor);
  const addPropOwner=p=>{
    if(!p)return;const prop=p.id?p:game.props.find(prop=>prop.x===p.x&&prop.y===p.y);
    if(prop)addOwner(models.get('prop:'+prop.id));
  };
  const hero=game.active();add(hero);
  // A one-cell halo guarantees the next step at a group edge. It cannot pin a
  // whole long route; only a few immediate cells and live motions are retained.
  if(hero)for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]])add({x:hero.x+dx,y:hero.y+dy});
  for(const actor of game.state.party||[])add(actor);
  if(game.state.combat)for(const actor of game.all())add(actor);
  add(game.selected);add(prompt?.p);add(game.departingNpc);
  addPropOwner(game.selected);addPropOwner(prompt?.p);addPropOwner(game.departingNpc);
  if(speaker){const prop=game.props.find(p=>speaker.id?p.id===speaker.id:p.name===speaker.name);add(prop);addPropOwner(prop);}
  for(const p of (game.route||[]).slice(0,3))add(p);
  for(const motion of motions.values()){
    addOwner(motion.m);
    add({x:motion.from.x-.5,y:motion.from.z-.5});add({x:motion.to.x-.5,y:motion.to.z-.5});
  }
  // Root taps/strikes retain their actual owners even when their visible
  // position has moved away from the immutable logical anchor.
  for(const model of models.values())if(model.userData.tap||model.userData.strike)addOwner(model);
  for(const effect of effects){
    if(effect.p)add({x:effect.p.x-.5,y:effect.p.z-.5});
    if(effect.from)add({x:effect.from.x-.5,y:effect.from.z-.5});
    if(effect.to)add({x:effect.to.x-.5,y:effect.to.z-.5});
  }
  return pins;
}

// Geometry can be aliased by the source picking model and its draw batch.
// Cached geometry/materials remain with their long-lived owner, while chunk
// resources are released once each. A group must own every non-shared geometry.
export function disposeOwnedGroup(root,{sharedGeometries=new Set()}={}) {
  const geometries=new Set(),materials=new Set(),textures=new Set();
  root.traverse(object=>{
    if(object.isInstancedMesh)object.dispose();
    if(object.isLight)object.shadow?.dispose();
    if(object.geometry&&!sharedGeometries.has(object.geometry))geometries.add(object.geometry);
    if(object.userData.disposeMaterial)for(const material of [].concat(object.material||[]))materials.add(material);
    if(object.userData.disposeTexture)for(const material of [].concat(object.material||[]))for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
  });
  for(const geometry of geometries)geometry.dispose();
  for(const material of materials)material.dispose();
  for(const texture of textures)texture.dispose();
}
export function countGroupResources(root) {
  const geometries=new Set(),materials=new Set(),textures=new Set();let meshes=0,lights=0;
  root.traverse(object=>{
    if(object.isMesh)meshes++;
    if(object.isLight)lights++;
    if(object.geometry)geometries.add(object.geometry);
    for(const material of [].concat(object.material||[])){
      materials.add(material);for(const value of Object.values(material))if(value?.isTexture)textures.add(value);
    }
  });
  return {meshes,geometries:geometries.size,materials:materials.size,textures:textures.size,lights};
}
