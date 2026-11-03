import * as T from 'three';

// Keep source models on a picking-only layer. Selection and interaction still
// use those models; the camera draws scene-wide batches instead.
export function batchStaticModels(roots,parent){
  parent.updateWorldMatrix(true,true);
  const inverse=parent.matrixWorld.clone().invert(),buckets=new Map(),links=new Map();
  for(const root of roots){
    const entries=[];root.updateWorldMatrix(true,true);
    root.traverse(m=>{
      if(!m.isMesh||Array.isArray(m.material))return;
      const decal=!!m.userData.decal,mat=m.material;
      const shape=m.geometry.type+JSON.stringify(m.geometry.parameters||{});
      const key=shape+':'+(decal?'decal':mat.uuid)+':'+m.castShadow+':'+m.receiveShadow;
      if(!buckets.has(key))buckets.set(key,{geometry:m.geometry,material:mat,decal,cast:m.castShadow,receive:m.receiveShadow,entries:[]});
      const bucket=buckets.get(key),local=new T.Matrix4();
      for(let i=0;i<(m.isInstancedMesh?m.count:1);i++){
        if(m.isInstancedMesh)m.getMatrixAt(i,local);else local.identity();
        const color=new T.Color(0xffffff);if(decal&&m.instanceColor)m.getColorAt(i,color);
        const entry={root,source:m,local:local.clone(),color,index:bucket.entries.length};
        entries.push(entry);bucket.entries.push(entry);
      }
      m.layers.set(1);
    });
    links.set(root,entries);root.userData.staticBatched=true;
  }
  const meshes=[];
  for(const b of buckets.values()){
    const mat=b.decal?new T.MeshStandardMaterial({color:0xffffff,roughness:.92,metalness:0,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}):b.material;
    const mesh=new T.InstancedMesh(b.geometry,mat,b.entries.length);
    mesh.castShadow=b.cast;mesh.receiveShadow=b.receive;mesh.frustumCulled=false;
    mesh.userData.staticBatch=true;mesh.userData.decal=b.decal;mesh.userData.disposeMaterial=b.decal;
    for(const e of b.entries){e.batch=mesh;if(b.decal)mesh.setColorAt(e.index,e.color);}
    if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
    parent.add(mesh);meshes.push(mesh);
  }
  const matrix=new T.Matrix4(),hidden=new T.Matrix4().makeScale(0,0,0);
  function update(root){
    root.updateWorldMatrix(true,true);
    for(const e of links.get(root)||[]){
      let visible=true;for(let n=e.source;n&&n!==parent;n=n.parent)visible&&=n.visible;
      matrix.copy(inverse).multiply(e.source.matrixWorld).multiply(e.local);
      e.batch.setMatrixAt(e.index,visible?matrix:hidden);e.batch.instanceMatrix.needsUpdate=true;
    }
  }
  for(const root of roots)update(root);
  return {meshes,roots,update,sourceMeshes:roots.reduce((n,r)=>{r.traverse(m=>{if(m.isMesh)n++;});return n;},0)};
}
