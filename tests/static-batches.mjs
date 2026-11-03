import assert from 'node:assert/strict';
import * as T from 'three';
import {batchStaticModels} from '../src/static-batches.js';
const parent=new T.Group(),roots=[],geo=new T.BoxGeometry(),mat=new T.MeshStandardMaterial({color:0xabcdef});
for(let i=0;i<100;i++){
 const root=new T.Group();root.position.set(i,0,2);root.rotation.y=i%4*Math.PI/2;
 const mesh=new T.InstancedMesh(geo,mat,2);mesh.setMatrixAt(0,new T.Matrix4().makeTranslation(.4,0,0));mesh.setMatrixAt(1,new T.Matrix4().makeScale(.5,.5,.5));root.add(mesh);parent.add(root);roots.push(root);
}
const result=batchStaticModels(roots,parent);
assert.equal(result.meshes.length,1);assert.equal(result.meshes[0].count,200);
const matrix=new T.Matrix4();result.meshes[0].getMatrixAt(2,matrix);
const expected=roots[1].matrixWorld.clone().multiply(new T.Matrix4().makeTranslation(.4,0,0));
matrix.elements.forEach((n,i)=>assert.ok(Math.abs(n-expected.elements[i])<1e-6));
roots[1].position.y=.2;result.update(roots[1]);result.meshes[0].getMatrixAt(2,matrix);assert.ok(Math.abs(matrix.elements[13]-.2)<1e-6);
roots[1].visible=false;result.update(roots[1]);result.meshes[0].getMatrixAt(2,matrix);assert.equal(matrix.elements[0],0);
assert.equal(roots[0].children[0].layers.mask,2);assert.equal(result.meshes[0].layers.mask,1);
console.log('PASS scene-wide batching, transforms, animation updates, visibility and picking layer (100 meshes → 1)');
