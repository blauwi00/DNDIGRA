import {Box3, Vector3} from 'three';

// Fit the complete rotated model, including weapons and future tall headgear.
export function fitPreviewCamera(camera, model, aspect = .8, padding = 1.14) {
  model.updateWorldMatrix(true, true);
  camera.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(model);
  if (bounds.isEmpty()) return;
  const view = new Box3();
  for (const x of [bounds.min.x, bounds.max.x])
    for (const y of [bounds.min.y, bounds.max.y])
      for (const z of [bounds.min.z, bounds.max.z])
        view.expandByPoint(new Vector3(x, y, z).applyMatrix4(camera.matrixWorldInverse));
  const center = view.getCenter(new Vector3()), size = view.getSize(new Vector3());
  const height = Math.max(size.y, size.x / aspect, .1) * padding;
  camera.left = center.x - height * aspect / 2;
  camera.right = center.x + height * aspect / 2;
  camera.top = center.y + height / 2;
  camera.bottom = center.y - height / 2;
  camera.near = Math.max(.01, -view.max.z - 1);
  camera.far = Math.max(camera.near + 1, -view.min.z + 1);
  camera.updateProjectionMatrix();
}
