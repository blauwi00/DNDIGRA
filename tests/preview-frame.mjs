import assert from 'node:assert/strict';
import {Box3, BoxGeometry, Group, Mesh, MeshBasicMaterial, OrthographicCamera, Vector3} from 'three';
import {fitPreviewCamera} from '../src/preview-frame.js';
import {characterParts} from '../src/character-style.js';
const geometry = new BoxGeometry(1, 1, 1), material = new MeshBasicMaterial();
function check(model, angle) {
  model.rotation.y = angle;
  const camera = new OrthographicCamera(-.68, .68, .98, -.72, .1, 20);
  camera.position.set(1.8, 1.6, 4); camera.lookAt(0, .67, 0);
  fitPreviewCamera(camera, model);
  const b = new Box3().setFromObject(model);
  for (const x of [b.min.x, b.max.x]) for (const y of [b.min.y, b.max.y]) for (const z of [b.min.z, b.max.z]) {
    const p = new Vector3(x, y, z).project(camera);
    assert.ok(Math.abs(p.x) < .9 && Math.abs(p.y) < .9, 'Full rotated model has a safe frame margin');
    assert.ok(p.z >= -1 && p.z <= 1, 'Depth fits near/far planes');
  }
}
for (const classId of ['fighter', 'wizard', 'rogue', 'cleric']) for (const gender of ['male', 'female']) {
  const group = new Group();
  for (const p of characterParts({classId, appearance:{gender}}).parts) {
    const mesh = new Mesh(geometry, material); mesh.position.set(p.x,p.y,p.z); mesh.scale.set(p.w,p.h,p.d); mesh.rotation.z=p.rz; group.add(mesh);
  }
  for (let i=0;i<4;i++) check(group, i*Math.PI/2);
}
// Stress case for future tall headgear and long equipment, beyond current class silhouettes.
const tall = new Group(), hat = new Mesh(geometry,material), weapon = new Mesh(geometry,material);
hat.scale.set(.5,4,.5); hat.position.y=2; weapon.scale.set(4,.2,.2); weapon.position.set(1,1,.2); tall.add(hat,weapon);
for (let i=0;i<4;i++) check(tall,i*Math.PI/2);
console.log('PASS 32 class/gender rotations and oversized headgear/equipment framing');
