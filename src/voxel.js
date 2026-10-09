import * as T from "three";
import {npcFacing,faceCell} from "./npc-facing.js";
import {batchStaticModels} from './static-batches.js';
import {planRegionChunks,createChunkStream} from './region-streaming.js';
import {regionConfig,regionChunkId,cameraGroundBounds,expandRegionBounds,collectRegionPins,canSelectRegionCell,disposeOwnedGroup,countGroupResources} from './region-rendering.js';
import { createMenuStage } from './menu-stage.js';
import { texelPass, TEXEL } from "./texel.js";
import { fitPreviewCamera } from "./preview-frame.js";
import { fillSilhouette } from "./silhouette.js";
import { characterParts, characterProfile } from "./character-style.js";
import { spec as characterSpec, build as characterBuild } from "./characters.js";
import { enemyModel } from './enemy-models.js';
import { bindPromptInput } from './prompt-input.js';
const viewport = document.getElementById("viewport"), canvas = document.createElement("canvas");
canvas.id = "voxel-canvas";
canvas.setAttribute("aria-label", "Объёмная карта: двигайте одним пальцем, приближайте двумя");
viewport.prepend(canvas);
const objectPrompt = document.createElement("div");
objectPrompt.setAttribute("role", "group");
objectPrompt.tabIndex = -1;
const promptInput = bindPromptInput(document,objectPrompt,()=>{
  const p=window.objectPrompt?.p;
  return JSON.stringify([g.state.world?.id,g.state.scene,p?.id||[p?.x,p?.y],objectPrompt.dataset.signature]);
});
objectPrompt.onclick = (e) => {
  e.stopPropagation();
  const prompt = window.objectPrompt;
  const button = e.target.closest("button[data-action]");
  // Selecting the map can create this popup under a finger before the browser
  // dispatches its follow-up click. An action requires its own press; keyboard
  // and assistive clicks (detail 0) still activate the focused control.
  if (!promptInput.accept(e,button)) return;
  const action = button && prompt?.actions?.find(a => a.id === button.dataset.action);
  if (action?.enabled) { g.dismissMapActions(); action.run?.(); }
};
objectPrompt.addEventListener("keydown", e => { if (e.key === "Escape") g.mapTap(null); });
objectPrompt.className = "object-prompt";
objectPrompt.hidden = true;
viewport.append(objectPrompt);
let renderer;
try {
  renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
} catch (error) {
  canvas.remove();
  viewport.insertAdjacentHTML("afterbegin", '<p class="webgl-note">Объёмная сцена недоступна на этом устройстве. Открыт плоский режим.</p>');
  throw error;
}
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = T.PCFShadowMap;
renderer.outputColorSpace = T.SRGBColorSpace;
renderer.toneMapping = T.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.25;
const scene = new T.Scene();
scene.background = new T.Color("#0b1919");
const camera = new T.OrthographicCamera(-4, 4, 6, -6, 0.1, 80), world = new T.Group(), actors = new T.Group(), markers = new T.Group();
scene.add(world, actors, markers);
const maskScene = new T.Scene(), maskMaterial = new T.MeshBasicMaterial({ color: 16777215, toneMapped: false, side: T.DoubleSide }), maskTarget = new T.WebGLRenderTarget(390, 520, { depthBuffer: true }), maskObjects = [];
maskScene.background = new T.Color(0);
let maskRoot = null, maskCacheKey = "", silhouetteTexture = null, maskPixels, maskExterior, maskQueue;
const contourScene = new T.Scene(), contourCamera = new T.OrthographicCamera(-1, 1, 1, -1, 0, 2), contourMaterial = new T.ShaderMaterial({ transparent: true, depthTest: false, depthWrite: false, toneMapped: false, uniforms: { mask: { value: maskTarget.texture }, texel: { value: new T.Vector2(1 / 390, 1 / 520) }, gold: { value: new T.Color(16764534) } }, vertexShader: "varying vec2 uvMask;void main(){uvMask=uv;gl_Position=vec4(position.xy,0.0,1.0);}", fragmentShader: "uniform sampler2D mask;uniform vec2 texel;uniform vec3 gold;varying vec2 uvMask;void main(){float center=texture2D(mask,uvMask).r;float edge=0.0;for(int x=-2;x<=2;x++){for(int y=-2;y<=2;y++){edge=max(edge,texture2D(mask,uvMask+vec2(float(x),float(y))*texel).r);}}float alpha=step(0.4,edge)*(1.0-step(0.4,center));gl_FragColor=vec4(gold,alpha*0.95);}" });
contourScene.add(new T.Mesh(new T.PlaneGeometry(2, 2), contourMaterial));
function setSelectionMask(chosen) {
  const root = chosen?.userData.hinge || chosen || null;
  if (root === maskRoot) return;
  for (const m of maskObjects) {
    maskScene.remove(m);
    if (m.isInstancedMesh) m.dispose();
  }
  maskObjects.length = 0;
  maskRoot = root;
  maskCacheKey = "";
  if (!root) return;
  root.updateWorldMatrix(true, true);
  root.traverse((source) => {
    if (!source.isMesh || source.userData.contactShadow) return;
    for (let node = source; node && node !== root.parent; node = node.parent) if (!node.visible) return;
    let clone;
    if (source.isInstancedMesh) {
      clone = new T.InstancedMesh(source.geometry, maskMaterial, source.count);
      for (let i = 0; i < source.count; i++) {
        const matrix = new T.Matrix4();
        source.getMatrixAt(i, matrix);
        clone.setMatrixAt(i, matrix);
      }
    } else clone = new T.Mesh(source.geometry, maskMaterial);
    clone.matrixAutoUpdate = false;
    clone.userData.source = source;
    maskScene.add(clone);
    maskObjects.push(clone);
  });
}
const ambient = new T.HemisphereLight(12507101, 3159078, 0.38);
scene.add(ambient);
const fill = new T.DirectionalLight(11912909, 0.5);
fill.position.set(3, 10, 5);
scene.add(fill);
const contactCanvas = document.createElement("canvas");
contactCanvas.width = contactCanvas.height = 64;
const contactContext = contactCanvas.getContext("2d"), contactGradient = contactContext.createRadialGradient(32, 32, 5, 32, 32, 31);
contactGradient.addColorStop(0, "rgba(12,18,20,.24)");
contactGradient.addColorStop(0.55, "rgba(12,18,20,.12)");
contactGradient.addColorStop(1, "rgba(12,18,20,0)");
contactContext.fillStyle = contactGradient;
contactContext.fillRect(0, 0, 64, 64);
const contactTexture = new T.CanvasTexture(contactCanvas), contactMaterial = new T.MeshBasicMaterial({ map: contactTexture, transparent: true, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1 });
function contact(group, w = 0.78, d = 0.65) {
  const m = new T.Mesh(new T.PlaneGeometry(w, d), contactMaterial);
  m.rotation.x = -Math.PI / 2;
  m.position.y = 0.012;
  m.userData.contactShadow = true;
  group.add(m);
}
const geo = new T.BoxGeometry(1, 1, 1), materials = /* @__PURE__ */ new Map(), models = /* @__PURE__ */ new Map(), motions = /* @__PURE__ */ new Map(), torches = [], effects = [], doors = /* @__PURE__ */ new Map();
renderer.shadowMap.autoUpdate = false;
let g, signature = "", selectedKey = "", half = 5.2, focus = { x: 5.5, z: 9.5 }, ready = false, last = 0, activeTab = "map", portraitRenderer, portraitCamera, portraitModel, portraitKind = -1, oldSize = "", walk = 0;
const material = (color, emissive = false) => {
  const key = color + ":" + emissive;
  if (!materials.has(key)) materials.set(key, emissive ? new T.MeshBasicMaterial({ color, toneMapped: false }) : new T.MeshStandardMaterial({ color, roughness: 0.92, metalness: color === 12820556 ? 0.35 : 0 }));
  return materials.get(key);
};
function box(group, x, y, z, w, h, d, color, emissive = false) {
  const m = new T.Mesh(geo, material(color, emissive));
  m.position.set(x, y, z);
  m.scale.set(w, h, d);
  m.castShadow = !emissive;
  m.receiveShadow = !emissive;
  group.add(m);
  return m;
}
function compact(group) {
  for (const child of group.children.filter((c) => c.isGroup)) compact(child);
  const decals = group.children.filter((c) => c.isMesh && !c.isInstancedMesh && c.userData.decal);
  if (decals.length) {
    const decalMaterial = new T.MeshStandardMaterial({ color: 0xffffff, roughness: 0.92, metalness: 0, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 });
    const sheet = new T.InstancedMesh(geo, decalMaterial, decals.length);
    sheet.frustumCulled = false;
    sheet.userData.disposeMaterial = true;
    decals.forEach((m, i) => {
      m.updateMatrix();
      sheet.setMatrixAt(i, m.matrix);
      sheet.setColorAt(i, m.material.color);
      group.remove(m);
    });
    sheet.userData.decal = true;
    sheet.castShadow = false;
    sheet.receiveShadow = true;
    sheet.instanceMatrix.needsUpdate = true;
    sheet.instanceColor.needsUpdate = true;
    group.add(sheet);
  }
  const buckets = /* @__PURE__ */ new Map();
  for (const m of group.children.filter((c) => c.isMesh && !c.isInstancedMesh && !c.userData.decal && c.geometry === geo)) {
    const key = m.material.uuid + ":" + m.castShadow + ":" + m.receiveShadow;
    if (!buckets.has(key)) buckets.set(key, []);
    buckets.get(key).push(m);
  }
  for (const list of buckets.values()) {
    if (list.length < 2) continue;
    const batch = new T.InstancedMesh(geo, list[0].material, list.length);
    list.forEach((m, i) => {
      m.updateMatrix();
      batch.setMatrixAt(i, m.matrix);
      group.remove(m);
    });
    batch.castShadow = list[0].castShadow;
    batch.receiveShadow = list[0].receiveShadow;
    group.add(batch);
  }
  return group;
}
const colorHex = (c) => new T.Color(c).getHex();
function colorRole(c) {
  const r = c >> 16 & 255, g2 = c >> 8 & 255, b = c & 255;
  if ([12820556, 3752007, 4278346, 12109511, 11782341, 10203059, 11581626, 5524279].includes(c)) return "metal";
  if ([7878449, 7880250, 8010038, 8735040, 5666672, 8797013, 11620717, 6895950].includes(c)) return "cloth";
  return Math.abs(r - g2) < 18 && Math.abs(g2 - b) < 18 ? "metal" : "other";
}
function decalBox(group, v) {
  const m = box(group, ...v.slice(0, 8));
  m.userData.decal = true;
  m.castShadow = false;
  m.userData.decalFace = v[8];
  return m;
}
function shadedBox(group, x, y, z, w, h, d, color, emissive = false) {
  const m = box(group, x, y, z, w, h, d, color, emissive);
  const data = [x, y, z, w, h, d, colorHex(color), emissive];
  for (const v of texelPass([data], colorRole, TEXEL.size, { minDepth: 8e-3 })) decalBox(group, v);
  return m;
}
const terrainTextures = /* @__PURE__ */ new Map(), terrainMaterials = /* @__PURE__ */ new Map();
function terrainMaterial(color, size = 8) {
  if (!terrainTextures.has(size)) {
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d");
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const v = y === 0 || x === 0 ? 255 : y === size - 1 || x === size - 1 ? 218 : (x * 31 + y * 17) % 11 === 0 ? 232 : 248;
      ctx.fillStyle = `rgb(${v},${v},${v})`;
      ctx.fillRect(x, y, 1, 1);
    }
    const terrainTexture = new T.CanvasTexture(c);
    terrainTexture.colorSpace = T.SRGBColorSpace;
    terrainTexture.magFilter = terrainTexture.minFilter = T.NearestFilter;
    terrainTexture.generateMipmaps = false;
    terrainTextures.set(size, terrainTexture);
  }
  const key = color + ":" + size;
  if (!terrainMaterials.has(key)) terrainMaterials.set(key, new T.MeshStandardMaterial({ color, map: terrainTextures.get(size), roughness: 1 }));
  return terrainMaterials.get(key);
}
function noSourceShadow(group) {
  group.traverse((m) => {
    if (m.isMesh) {
      m.castShadow = false;
      m.receiveShadow = false;
    }
  });
  return group;
}
function base(group) {
  const m = new T.Mesh(new T.CylinderGeometry(0.38, 0.4, 0.1, 24), material(3749436));
  m.position.y = 0.08;
  m.castShadow = true;
  m.receiveShadow = true;
  group.add(m);
  const rim = new T.Mesh(new T.CylinderGeometry(0.395, 0.4, 0.035, 24), material(5262419));
  rim.position.y = 0.035;
  group.add(rim);
}
function propDetail(o, p) {
  const wood = 6899502, gold = 12820556;
  if (["chest", "crate"].includes(p.type)) {
    const z = p.type === "chest" ? 0.263 : 0.305;
    for (const x of [-0.15, 0, 0.15]) shadedBox(o, x, 0.27, z, 0.012, 0.29, 7e-3, wood);
    if (p.type === "chest") {
      shadedBox(o, 0, 0.33, 0.278, 0.03, 0.04, 0.015, 3752007);
      for (const x of [-0.24, 0.24]) for (const y of [0.14, 0.43]) shadedBox(o, x, y, 0.263, 0.018, 0.018, 0.02, 12820556);
      for (const z2 of [-0.12, 0.04, 0.16]) shadedBox(o, 0, 0.553, z2, 0.52, 9e-3, 0.012, wood);
    }
  }
  if (p.type === "barrel") {
    for (let i = 0; i < 12; i++) {
      const angle = i * Math.PI / 6, mark = box(o, Math.sin(angle) * 0.259, 0.285, Math.cos(angle) * 0.259, 0.011, 0.5, 0.012, wood);
      mark.rotation.y = angle;
    }
    for (const x of [-0.12, 0, 0.12]) shadedBox(o, x, 0.571, 0, 9e-3, 8e-3, 0.33, wood);
  }
  if (p.type === "books") {
    for (let row = 0; row < 3; row++) for (let i = 0; i < 5; i++) {
      const x = -0.25 + i * 0.12, y = 0.4 + row * 0.38;
      for (const dy of [-0.075, 0.075]) shadedBox(o, x, y + dy, 0.233, 0.065, 0.016, 0.012, gold);
      if (i === 1 || i === 4) shadedBox(o, x, y, 0.239, 0.038, 0.035, 9e-3, 13482893);
    }
  }
  if (p.type === "desk") {
    for (const z of [-0.21, -0.06, 0.1, 0.23]) shadedBox(o, 0, 0.666, z, 0.76, 7e-3, 0.01, wood);
    shadedBox(o, 0.1, 0.71, 0.07, 0.011, 0.014, 0.23, 8088650);
    for (let i = 0; i < 3; i++) for (const x of [-0.02, 0.18]) shadedBox(o, x, 0.709, -4e-3 + i * 0.053, 0.06, 9e-3, 8e-3, 8088650);
    shadedBox(o, 0.3, 0.713, -0.2, 0.055, 0.1, 0.055, 3752007);
    shadedBox(o, 0.27, 0.76, -0.2, 0.015, 0.16, 0.015, 13482893);
  }
  if (p.type === "door" || p.type === "portal") {
    const hinge = o.userData.hinge;
    for (const x of [0.1, 0.21, 0.33, 0.44]) shadedBox(hinge, x, 0.51, 0.056, 0.01, 0.89, 0.011, wood);
    shadedBox(hinge, 0.28, 0.74, 0.06, 0.54, 0.055, 0.024, 3752007);
    for (const x of [0.08, 0.49]) for (const y of [0.38, 0.74]) shadedBox(hinge, x, y, 0.084, 0.025, 0.025, 0.02, gold);
  }
  if (p.type === "cover") {
    for (const x of [-0.21, 0.21]) shadedBox(o, x, 0.483, 0, 0.018, 8e-3, 0.29, 5859403);
    shadedBox(o, 0, 0.483, -0.14, 0.42, 8e-3, 0.015, 5859403);
  }
  if (p.type === "chair") {
    for (const x of [-0.14, 0.14]) shadedBox(o, x, 0.81, -0.144, 0.014, 0.14, 0.012, wood);
    shadedBox(o, 0, 0.49, 0, 0.3, 0.012, 0.013, 9125164);
  }
  if (p.type === "banner") {
    for (const x of [-0.23, 0.23]) shadedBox(o, x, 0.58, 0.043, 0.015, 0.54, 0.01, gold);
    shadedBox(o, 0, 0.29, 0.043, 0.48, 0.015, 0.01, gold);
  }
}
function figure(kind, actor, options = {}) {
  const p = new T.Group();
  if(options.base !== false) base(p);
  const storyEnemy = kind === 3 ? enemyModel(actor, { texel: options.texel ?? window.Characters?.RULES.texel ?? true }) : null;
  const spec = storyEnemy?.spec || (kind !== 3 && kind !== 4 ? characterSpec(kind, actor) : null);
  if (storyEnemy && !spec) {
    p.userData.enemyVisual = storyEnemy.visual;
    for (const v of storyEnemy.boxes) {
      if (v.length > 8) decalBox(p, v);
      else box(p, ...v);
    }
  } else if (spec) {
    p.userData.characterStyle = spec;
    let rig;
    if(options.articulated) {
      rig={};
      for(const [key,position] of Object.entries({head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]})) {
        const group=new T.Group();group.position.set(...position);p.add(group);rig[key]=group;
      }
      p.userData.rig=rig;
    }
    for (const source of storyEnemy?.boxes || characterBuild(spec,{texel:options.texel??window.Characters?.RULES.texel})) {
      const v=[...source];let target=p;
      if(rig){const [x,y]=v;const key=(Math.abs(x)>.29||(Math.abs(x)>.19&&y<.74))?(x<0?'armL':'armR'):y>=.74?'head':y<.4?(x<0?'legL':'legR'):'torso';target=rig[key];v[0]-=target.position.x;v[1]-=target.position.y;v[2]-=target.position.z;}
      if (v.length > 8) decalBox(target, v);
      else box(target, ...v);
    }
  } else {
    const { profile, parts } = characterParts(actor || {}, kind);
    p.userData.characterStyle = profile;
    const flat = [];
    for (const v of parts) {
      const m = box(p, v.x, v.y, v.z, v.w, v.h, v.d, v.color);
      m.rotation.z = v.rz;
      if (!v.rz) flat.push([v.x, v.y, v.z, v.w, v.h, v.d, colorHex(v.color), false]);
    }
    const bone = colorHex(profile.skin), wood = colorHex(profile.cloth);
    const role = (c) => kind === 3 && c === bone ? "skin" : kind === 4 && c === wood ? "other" : colorRole(c);
    for (const v of texelPass(flat, role)) decalBox(p, v);
  }
  return compact(p);
}
function torchModel() {
  const m = new T.Group();
  shadedBox(m, 0, 0.23, 0, 0.05, 0.43, 0.05, 5585186);
  shadedBox(m, 0, 0.44, 0, 0.09, 0.08, 0.09, 5391923);
  const flames = [];
  for (let i = 0; i < 3; i++) {
    const f = shadedBox(m, 0, 0.51 + i * 0.085, 0, 0.095 - i * 0.025, 0.12, 0.085 - i * 0.025, [15038244, 16758855, 16768133][i], true);
    f.userData.rest = f.position.clone();
    flames.push(f);
  }
  m.userData.flames = flames;
  return noSourceShadow(m);
}
function chandelierModel() {
  const m = new T.Group(), flames = [];
  const ring = new T.Mesh(new T.TorusGeometry(0.38, 0.028, 6, 24), material(5524279));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 1.58;
  m.add(ring);
  for (let i = 0; i < 6; i++) {
    const a = i * Math.PI / 3, x = Math.cos(a) * 0.38, z = Math.sin(a) * 0.38;
    shadedBox(m, x, 1.68, z, 0.055, 0.19, 0.055, 14534033);
    const f = shadedBox(m, x, 1.83, z, 0.045, 0.1, 0.045, 16764792, true);
    f.userData.rest = f.position.clone();
    flames.push(f);
  }
  m.userData.flames = flames;
  noSourceShadow(m);
  m.traverse((o) => {
    if (o.isMesh) {
      o.userData.disposeMaterial = true;
      o.material = new T.MeshBasicMaterial({ color: o.material.color.clone(), transparent: true, depthWrite: false, toneMapped: false });
    }
  });
  return m;
}
function configureShadow(light, portable = false) {
  light.castShadow = portable;
  light.shadow.autoUpdate = false;
  light.shadow.needsUpdate = portable;
  light.shadow.mapSize.set(128, 128);
  light.shadow.radius = 1.8;
  light.shadow.bias = -1e-3;
  light.shadow.normalBias = 0.035;
  light.shadow.camera.near = 0.06;
  light.shadow.camera.far = 12;
}
function kitModel(id) {
  const o = new T.Group(), wood = 7886126, gold = 12820556, linen = 13352345, steel = 10203059;
  if (id === 40) {
    shadedBox(o, 0, 0.55, 0, 0.58, 0.69, 0.15, 6895950);
    shadedBox(o, 0.02, 0.55, 0.09, 0.49, 0.58, 0.035, linen);
    shadedBox(o, -0.26, 0.55, 0.11, 0.07, 0.69, 0.04, 8408420);
    shadedBox(o, 0.14, 0.51, 0.13, 0.11, 0.13, 0.025, gold);
  } else if (id === 41) {
    const gem = new T.Mesh(new T.OctahedronGeometry(0.24), material(6530741));
    gem.position.y = 0.75;
    o.add(gem);
    shadedBox(o, 0, 0.4, 0, 0.13, 0.22, 0.13, gold);
    shadedBox(o, 0, 0.28, 0, 0.34, 0.08, 0.29, wood);
  } else if (id === 42) {
    shadedBox(o, 0, 0.55, 0, 0.57, 0.58, 0.25, 7953470);
    shadedBox(o, 0, 0.87, 0, 0.48, 0.09, 0.28, 9795409);
    shadedBox(o, 0, 0.46, 0.15, 0.35, 0.23, 0.07, 10453079);
    for (const x of [-0.18, 0.18]) {
      shadedBox(o, x, 0.64, 0.15, 0.045, 0.5, 0.035, 5192232);
      shadedBox(o, x, 0.67, 0.18, 0.07, 0.08, 0.025, gold);
    }
    shadedBox(o, 0, 0.96, 0, 0.23, 0.055, 0.08, wood);
  } else if (id === 43) {
    shadedBox(o, -0.15, 0.43, 0, 0.28, 0.27, 0.25, 3229524);
    shadedBox(o, -0.15, 0.62, 0, 0.16, 0.1, 0.15, steel);
    shadedBox(o, 0.18, 0.58, 0, 0.035, 0.61, 0.035, wood);
    for (let i = 0; i < 5; i++) shadedBox(o, 0.18 + i * 0.022, 0.75 + i * 0.045, 0, 0.08, 0.08, 0.035, linen);
  } else if (id === 44) {
    shadedBox(o, 0, 0.4, 0, 0.57, 0.2, 0.36, linen);
    shadedBox(o, 0.02, 0.59, 0, 0.41, 0.16, 0.29, 10056013);
    shadedBox(o, -0.15, 0.74, 0.06, 0.2, 0.1, 0.12, 12752737);
    shadedBox(o, 0.19, 0.72, 0, 0.1, 0.15, 0.12, 7685938);
    shadedBox(o, 0, 0.41, 0.19, 0.06, 0.23, 0.025, wood);
  } else if (id === 45) {
    shadedBox(o, 0, 0.62, 0, 0.59, 0.58, 0.1, steel);
    shadedBox(o, 0, 0.38, 0, 0.39, 0.18, 0.1, steel);
    shadedBox(o, 0, 0.6, 0.065, 0.48, 0.48, 0.03, 4745336);
    shadedBox(o, 0, 0.6, 0.095, 0.06, 0.5, 0.025, gold);
    shadedBox(o, 0, 0.6, 0.095, 0.42, 0.06, 0.025, gold);
  } else if (id === 46) {
    shadedBox(o, 0, 0.63, 0, 0.48, 0.53, 0.14, steel);
    for (const x of [-0.32, 0.32]) shadedBox(o, x, 0.81, 0, 0.19, 0.17, 0.18, steel);
    shadedBox(o, 0, 0.34, 0, 0.53, 0.1, 0.18, wood);
    for (let y = 0; y < 5; y++) for (let x = 0; x < 4; x++) shadedBox(o, -0.18 + x * 0.12, 0.43 + y * 0.09, 0.085, 0.04, 0.026, 0.012, 12634562);
  } else if (id === 47) {
    for (let i = 0; i < 4; i++) {
      const ring = new T.Mesh(new T.TorusGeometry(0.23, 0.035, 4, 16), terrainMaterial(12558699));
      ring.position.set(0, 0.58, (i - 1.5) * 0.055);
      o.add(ring);
    }
    shadedBox(o, 0.22, 0.32, 0, 0.04, 0.25, 0.04, 12558699);
  } else if (id === 48) {
    shadedBox(o, 0, 0.38, 0, 0.54, 0.23, 0.17, wood);
    for (let i = 0; i < 4; i++) {
      shadedBox(o, -0.18 + i * 0.12, 0.62, 0.02, 0.025, 0.39, 0.025, steel);
      shadedBox(o, -0.15 + i * 0.12, 0.81, 0.02, 0.08, 0.025, 0.025, steel);
    }
  } else if (id === 49) {
    shadedBox(o, 0, 0.57, 0, 0.59, 0.29, 0.25, 6518117);
    shadedBox(o, 0, 0.55, 0.15, 0.58, 0.2, 0.04, 8557956);
    for (const x of [-0.18, 0.18]) shadedBox(o, x, 0.57, 0, 0.035, 0.32, 0.29, wood);
  } else if (id === 50) {
    shadedBox(o, 0, 0.47, 0, 0.56, 0.24, 0.25, wood);
    shadedBox(o, -0.12, 0.64, 0, 0.24, 0.08, 0.16, steel);
    shadedBox(o, 0.15, 0.63, 0, 0.16, 0.13, 0.17, 6252658);
    shadedBox(o, 0, 0.34, 0.15, 0.38, 0.05, 0.035, gold);
  } else if (id === 51) {
    shadedBox(o, 0, 0.48, 0, 0.065, 0.7, 0.065, wood);
    shadedBox(o, 0, 0.88, 0, 0.3, 0.24, 0.25, steel);
    shadedBox(o, 0, 1.03, 0, 0.09, 0.06, 0.09, gold);
  } else if (id === 52) {
    shadedBox(o, 0, 0.6, 0, 0.09, 0.64, 0.07, gold);
    shadedBox(o, 0, 0.73, 0, 0.41, 0.085, 0.07, gold);
    shadedBox(o, 0, 0.29, 0, 0.27, 0.08, 0.15, wood);
  } else if (id === 53) {
    shadedBox(o, 0, 0.56, 0, 0.49, 0.31, 0.22, linen);
    for (let i = 0; i < 4; i++) shadedBox(o, 0, 0.44 + i * 0.07, 0.13, 0.45, 0.018, 0.02, 15787468);
    shadedBox(o, 0, 0.55, 0.15, 0.13, 0.13, 0.035, 11363932);
  } else {
    shadedBox(o, 0, 0.57, 0, 0.14, 0.53, 0.12, 14736841);
  }
  return compact(o);
}
function itemModel(id) {
  if (id >= 40) return kitModel(id);
  const o = new T.Group(), gold = 12820556, wood = 7886126;
  if (id === 37) return torchModel();
  if (id === 31) {
    for (let i = 0; i < 9; i++) {
      const y = 0.2 + i * 0.085, x = 0.15 * Math.sin(i / 8 * Math.PI);
      shadedBox(o, x, y, 0, 0.045, 0.11, 0.05, wood);
    }
    shadedBox(o, 0, 0.55, 0, 0.015, 0.7, 0.02, 14141844);
  } else if (id === 32) {
    shadedBox(o, 0, 0.72, 0, 0.07, 0.65, 0.045, 12109511);
    shadedBox(o, 0, 0.39, 0, 0.3, 0.055, 0.07, gold);
    shadedBox(o, 0, 0.25, 0, 0.07, 0.23, 0.07, wood);
  } else if (id === 33) {
    shadedBox(o, 0, 0.58, 0, 0.055, 0.91, 0.055, wood);
    const gem = new T.Mesh(new T.OctahedronGeometry(0.15), material(6539481, true));
    gem.position.y = 1.12;
    o.add(gem);
  } else if (id === 34) {
    shadedBox(o, 0, 0.46, 0, 0.32, 0.37, 0.3, 8797013);
    shadedBox(o, 0, 0.47, 0.17, 0.22, 0.23, 0.025, 11620717);
    shadedBox(o, 0, 0.74, 0, 0.15, 0.2, 0.14, 11782341);
    shadedBox(o, 0, 0.86, 0, 0.18, 0.07, 0.17, wood);
  } else if (id === 35) {
    for (let i = 0; i < 6; i++) {
      const m = new T.Mesh(new T.CylinderGeometry(0.21, 0.21, 0.05, 12), terrainMaterial(gold));
      m.position.set(i % 2 * 0.12 - 0.06, 0.3 + i * 0.055, i % 3 * 0.05);
      o.add(m);
    }
  } else if (id === 36) {
    shadedBox(o, 0, 0.47, 0, 0.52, 0.66, 0.025, 14140829);
    for (let i = 0; i < 5; i++) shadedBox(o, 0, 0.64 - i * 0.07, 0.022, 0.36 - i % 2 * 0.08, 0.012, 8e-3, 8088650);
    shadedBox(o, 0.12, 0.28, 0.025, 0.1, 0.1, 0.025, 9192504);
  } else {
    shadedBox(o, 0, 0.52, 0, 0.075, 0.66, 0.075, gold);
    shadedBox(o, 0, 0.2, 0, 0.18, 0.12, 0.18, gold);
  }
  return compact(o);
}
function propModel(p) {
  const o = new T.Group(), wood = 6899502, gold = 12820556, stone = 8094328;
  if(p.model&&window.Props){const list=window.Props.build(p);if(list){for(const b of list){if(b.length>8)decalBox(o,b);else box(o,...b);}return compact(o);}}
  if (p.portalKind) {
    shadedBox(o, 0, 0.035, 0, 0.86, 0.07, 0.88, 2304293);
    for (let i = 0; i < 4; i++) {
      const height = p.portalKind === "stairs-up" ? 0.16 + i * 0.16 : 0.08 + i * 0.035;
      shadedBox(o, 0, height / 2 + 0.07, 0.3 - i * 0.2, 0.63, height, 0.18, wood);
    }
    for (const x of [-0.4, 0.4]) shadedBox(o, x, 0.16, 0, 0.08, 0.24, 0.96, 9992270);
    return compact(o);
  }
  switch (p.type) {
    case 'tree': {
      shadedBox(o,0,.58,0,.22,1.16,.22,0x705037);
      const leaf=[0x487b3d,0x638348,0x39734b][p.variant||0];
      shadedBox(o,0,1.30,0,.90,.55,.88,leaf);
      shadedBox(o,-.12,1.70,.02,.68,.38,.65,leaf);
      shadedBox(o,.16,1.95,-.04,.42,.22,.42,leaf);
      return compact(o);
    }
    case 'shelf':
      for(const x of[-.38,.38])shadedBox(o,x,.58,-.26,.08,1.16,.12,wood);
      for(const y of[.16,.56,.96]) {
        shadedBox(o,0,y,0,.84,.07,.48,wood);
        for(let i=0;i<3;i++)shadedBox(o,-.26+i*.26,y+.14,0,.15,.21,.22,[0xb59865,0x78905c,0xa56e48][i]);
      }
      return compact(o);
    case 'stove':
      shadedBox(o,0,.32,0,.86,.64,.76,0x797268);
      shadedBox(o,0,.35,.39,.50,.35,.02,0x292622);
      shadedBox(o,0,.25,.405,.34,.09,.02,0xdf8135,true);
      shadedBox(o,0,.68,0,.94,.08,.84,0x494d48);
      shadedBox(o,0,.83,0,.35,.23,.35,0x393e3c);
      shadedBox(o,0,1.14,-.29,.30,.80,.24,0x777266);
      return compact(o);
    case 'cart':
      shadedBox(o,0,.39,0,.63,.12,.80,wood);
      for(const x of[-.30,.30])shadedBox(o,x,.60,0,.07,.36,.80,wood);
      shadedBox(o,0,.57,-.37,.63,.32,.06,wood);
      for(const x of[-.38,.38])for(const z of[-.25,.25])shadedBox(o,x,.24,z,.10,.30,.30,0x414740);
      shadedBox(o,-.12,.60,0,.25,.30,.34,0xac9971);
      shadedBox(o,.15,.58,.18,.22,.27,.26,0x968056);
      return compact(o);
    case "counter":
      shadedBox(o, 0, 0.35, 0, 0.96, 0.7, 0.66, wood);
      shadedBox(o, 0, 0.75, 0, 0.99, 0.1, 0.8, 9859915);
      shadedBox(o, 0, 0.36, 0.34, 0.72, 0.48, 0.03, 8608823);
      shadedBox(o, 0.23, 0.86, 0.1, 0.12, 0.13, 0.12, 13482893);
      break;
    case "table":
      for (const x of [-0.31, 0.31]) for (const z of [-0.26, 0.26]) shadedBox(o, x, 0.28, z, 0.08, 0.56, 0.08, wood);
      shadedBox(o, 0, 0.61, 0, 0.85, 0.12, 0.78, 9859915);
      shadedBox(o, -0.16, 0.71, 0.04, 0.24, 0.08, 0.17, 12491365);
      shadedBox(o, 0.2, 0.76, -0.16, 0.12, 0.18, 0.12, 13482893);
      break;
    case "lantern":
      shadedBox(o, 0, 0.06, 0, 0.5, 0.12, 0.5, stone);
      shadedBox(o, 0, 0.65, 0, 0.12, 1.22, 0.12, wood);
      shadedBox(o, 0, 1.4, 0, 0.3, 0.36, 0.3, 4278346);
      shadedBox(o, 0, 1.4, 0.16, 0.19, 0.24, 0.02, 16763254, true);
      shadedBox(o, 0, 1.62, 0, 0.4, 0.08, 0.4, wood);
      noSourceShadow(o);
      break;
    case "waymark":
      shadedBox(o, 0, 0.025, 0, 0.74, 0.04, 0.74, 9992270);
      shadedBox(o, 0, 0.051, 0, 0.52, 0.015, 0.06, gold);
      shadedBox(o, 0, 0.051, 0, 0.06, 0.015, 0.52, gold);
      break;
  }
  if (["counter", "table", "lantern", "waymark"].includes(p.type)) return compact(o);
  switch (p.type) {
    case "clue":
      for (let i = 0; i < 4; i++) {
        const mark = shadedBox(o, (i % 2 - 0.5) * 0.18, 0.014, (i - 1.5) * 0.13, 0.075, 0.014, 0.11, 8549474);
        mark.castShadow = false;
      }
      return compact(o);
    case "torch":
      return torchModel();
    case "chandelier":
      return chandelierModel();
    case "barrel": {
      const body = new T.Mesh(new T.CylinderGeometry(0.24, 0.26, 0.55, 12), terrainMaterial(7754290));
      body.position.y = 0.29;
      body.castShadow = true;
      body.receiveShadow = true;
      o.add(body);
      for (const y of [0.13, 0.44]) {
        const band = new T.Mesh(new T.CylinderGeometry(0.255, 0.255, 0.045, 12), material(4278346));
        band.position.y = y;
        o.add(band);
      }
      shadedBox(o, 0, 0.58, 0, 0.04, 0.012, 0.42, 5782566);
      break;
    }
    case "crate":
      shadedBox(o, 0, 0.28, 0, 0.61, 0.55, 0.55, 7886135);
      for (const x of [-0.24, 0.24]) {
        shadedBox(o, x, 0.28, 0.287, 0.055, 0.57, 0.025, 10517322);
        shadedBox(o, x, 0.57, 0, 0.055, 0.028, 0.56, 10517322);
      }
      for (const y of [0.06, 0.5]) shadedBox(o, 0, y, 0.29, 0.6, 0.045, 0.025, 10254407);
      break;
    case "chair":
      for (const x of [-0.2, 0.2]) for (const z of [-0.17, 0.17]) shadedBox(o, x, 0.2, z, 0.065, 0.4, 0.065, wood);
      shadedBox(o, 0, 0.41, 0, 0.5, 0.08, 0.44, 8411961);
      shadedBox(o, 0, 0.465, 0, 0.4, 0.04, 0.35, 7880250);
      for (const x of [-0.21, 0.21]) shadedBox(o, x, 0.64, -0.18, 0.065, 0.55, 0.065, wood);
      shadedBox(o, 0, 0.81, -0.18, 0.47, 0.22, 0.055, 8411961);
      break;
    case "planter": {
      const pot = new T.Mesh(new T.CylinderGeometry(0.22, 0.14, 0.3, 12), terrainMaterial(8540984));
      pot.position.y = 0.17;
      pot.castShadow = true;
      pot.receiveShadow = true;
      o.add(pot);
      for (let i = 0; i < 5; i++) {
        const x = (i % 3 - 1) * 0.09, z = (i % 2 - 0.5) * 0.15, y = 0.48 + i % 3 * 0.07;
        shadedBox(o, x, 0.4, z, 0.025, 0.35, 0.025, 5401661);
        shadedBox(o, x + 0.055, y, z, 0.13, 0.045, 0.055, 6587210);
        if (p.id === "lilies") {
          shadedBox(o, x, y + 0.11, z, 0.12, 0.035, 0.055, 14998957);
          shadedBox(o, x, y + 0.11, z, 0.055, 0.035, 0.12, 15656635);
          shadedBox(o, x, y + 0.13, z, 0.035, 0.035, 0.035, gold);
        }
      }
      break;
    }
    case "scrolls":
      shadedBox(o, 0, 0.3, 0, 0.61, 0.09, 0.45, 8411702);
      for (const x of [-0.24, 0.24]) shadedBox(o, x, 0.15, 0, 0.06, 0.29, 0.34, wood);
      for (let i = 0; i < 3; i++) {
        const roll = new T.Mesh(new T.CylinderGeometry(0.07, 0.07, 0.4, 10), terrainMaterial(13746588));
        roll.rotation.z = Math.PI / 2;
        roll.position.set(0, 0.43 + i * 0.07, (i - 1) * 0.1);
        roll.castShadow = true;
        o.add(roll);
      }
      break;
    case "rack":
      for (const x of [-0.3, 0.3]) shadedBox(o, x, 0.47, 0, 0.08, 0.9, 0.12, wood);
      shadedBox(o, 0, 0.69, 0, 0.69, 0.085, 0.12, 9135937);
      for (const x of [-0.18, 0.04]) {
        shadedBox(o, x, 0.52, 0.13, 0.055, 0.6, 0.045, 11581626);
        shadedBox(o, x, 0.8, 0.13, 0.19, 0.045, 0.075, gold);
        shadedBox(o, x, 0.88, 0.13, 0.045, 0.12, 0.05, wood);
      }
      shadedBox(o, 0.27, 0.4, 0.1, 0.22, 0.32, 0.07, 3957378);
      shadedBox(o, 0.27, 0.4, 0.145, 0.025, 0.23, 0.018, gold);
      break;
    case "banner":
      shadedBox(o, 0, 0.9, 0, 0.65, 0.055, 0.08, wood);
      shadedBox(o, 0, 0.58, 0.02, 0.52, 0.61, 0.035, 8010038);
      shadedBox(o, 0, 0.58, 0.043, 0.04, 0.33, 0.02, gold);
      shadedBox(o, 0, 0.64, 0.046, 0.21, 0.04, 0.022, gold);
      break;
    case "ground-item":
      shadedBox(o, 0, 0.12, 0, 0.34, 0.22, 0.29, 8807746);
      shadedBox(o, 0, 0.24, 0, 0.26, 0.04, 0.22, 11703654);
      shadedBox(o, 0, 0.25, 0, 0.05, 0.02, 0.2, 5587501);
      break;
    case "npc":
      return figure(5, { npcId: p.id, gen:p.npc });
    case "chest":
      shadedBox(o, 0, 0.25, 0, 0.64, 0.4, 0.45, wood);
      shadedBox(o, 0, 0.49, 0, 0.62, 0.12, 0.43, 8411193);
      for (const x of [-0.24, 0.24]) shadedBox(o, x, 0.3, 0.237, 0.05, 0.46, 0.035, gold);
      shadedBox(o, 0, 0.32, 0.25, 0.12, 0.13, 0.04, gold);
      break;
    case "cover":
      shadedBox(o, 0, 0.15, 0, 0.7, 0.26, 0.65, 4742496);
      shadedBox(o, 0, 0.36, 0, 0.64, 0.17, 0.57, stone);
      shadedBox(o, 0, 0.46, 0, 0.47, 0.035, 0.4, 9278855);
      break;
    case "altar":
      shadedBox(o, -0.3, 0.3, 0, 0.12, 0.5, 0.4, wood);
      shadedBox(o, 0.3, 0.3, 0, 0.12, 0.5, 0.4, wood);
      shadedBox(o, 0, 0.59, 0, 0.86, 0.12, 0.58, 11973019);
      shadedBox(o, 0, 0.36, 0.3, 0.35, 0.43, 0.022, 7878449);
      for (const x of [-0.22, 0, 0.22]) {
        const candle = shadedBox(o, x, 0.75, 0, 0.05, 0.22, 0.05, 14531961);
        candle.castShadow = false;
        candle.receiveShadow = false;
        shadedBox(o, x, 0.9, 0, 0.05, 0.1, 0.05, 16758594, true);
      }
      break;
    case "books":
      shadedBox(o, 0, 0.65, 0, 0.65, 1.25, 0.28, wood);
      for (let row = 0; row < 3; row++) {
        shadedBox(o, 0, 0.25 + row * 0.38, 0.2, 0.72, 0.065, 0.46, 8674872);
        for (let i = 0; i < 5; i++) shadedBox(o, -0.25 + i * 0.12, 0.4 + row * 0.38, 0.13, 0.08, 0.22 + i % 2 * 0.05, 0.19, [8735040, 5666672, 11772783][i % 3]);
      }
      break;
    case "desk":
      for (const x of [-0.32, 0.32]) for (const z of [-0.22, 0.22]) shadedBox(o, x, 0.32, z, 0.075, 0.56, 0.075, wood);
      shadedBox(o, 0, 0.61, 0, 0.86, 0.1, 0.64, 8805950);
      shadedBox(o, 0.1, 0.68, 0.07, 0.35, 0.04, 0.28, 13482893);
      const deskCandle = shadedBox(o, -0.28, 0.76, -0.14, 0.04, 0.24, 0.04, 14927999);
      deskCandle.castShadow = false;
      deskCandle.receiveShadow = false;
      break;
    case "door":
    case "portal":
      shadedBox(o, -0.37, 0.56, 0, 0.15, 1.12, 0.3, stone);
      shadedBox(o, 0.37, 0.56, 0, 0.15, 1.12, 0.3, stone);
      shadedBox(o, 0, 1.09, 0, 0.72, 0.15, 0.31, stone);
      const hinge = new T.Group();
      hinge.position.x = -0.28;
      shadedBox(hinge, 0.28, 0.52, 0, 0.56, 1.02, 0.1, wood);
      shadedBox(hinge, 0.28, 0.38, 0.06, 0.54, 0.06, 0.024, 3752007);
      shadedBox(hinge, 0.45, 0.57, 0.075, 0.06, 0.07, 0.035, gold);
      o.add(hinge);
      o.userData.hinge = hinge;
      o.userData.axis = p.axis;
      if (p.axis === "horizontal") o.rotation.y = Math.PI / 2;
      break;
    case "decor":
      shadedBox(o, 0, 0.52, 0, 0.55, 0.95, 0.17, stone);
      shadedBox(o, 0, 0.6, 0.1, 0.33, 0.67, 0.03, 4685194);
      shadedBox(o, 0, 0.58, 0.122, 0.025, 0.67, 0.024, 9812405);
      break;
  }
  propDetail(o, p);
  return compact(o);
}
let rugMaterial;
function patternedRug() {
  if (rugMaterial) return rugMaterial;
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 384;
  const x = c.getContext("2d");
  x.fillStyle = "#823c36";
  x.fillRect(0, 0, 256, 384);
  x.strokeStyle = "#c3a168";
  x.lineWidth = 4;
  x.strokeRect(12, 12, 232, 360);
  x.lineWidth = 2;
  x.strokeRect(22, 22, 212, 340);
  x.save();
  x.translate(128, 192);
  x.beginPath();
  x.arc(0, 0, 40, 0, Math.PI * 2);
  x.stroke();
  for (let i = 0; i < 12; i++) {
    x.save();
    x.rotate(i * Math.PI / 6);
    x.beginPath();
    x.moveTo(-6, -49);
    x.lineTo(0, -65);
    x.lineTo(6, -49);
    x.closePath();
    x.fillStyle = "#c3a168";
    x.fill();
    x.restore();
  }
  x.restore();
  for (const y of [63, 321]) {
    x.beginPath();
    x.moveTo(128, y - 22);
    x.lineTo(150, y);
    x.lineTo(128, y + 22);
    x.lineTo(106, y);
    x.closePath();
    x.stroke();
  }
  const t = new T.CanvasTexture(c);
  t.colorSpace = T.SRGBColorSpace;
  rugMaterial = new T.MeshStandardMaterial({ map: t, roughness: 1 });
  return rugMaterial;
}
let staticBatches, regionStream=null, regionPlan=null, regionOptions=null, regionBounds=null, regionDemandKey='', regionScene=null, regionPadding=1, regionGeneration=0, regionMounting=false;
const regionResources=new Map(),regionFailures=new Set();
const regionError=document.createElement('button');
regionError.className='webgl-note';regionError.hidden=true;regionError.type='button';
regionError.textContent='Не удалось подгрузить окружение. Повторить';viewport.append(regionError);
regionError.onclick=()=>{regionFailures.clear();regionError.hidden=true;reconcileRegions(true);};
function lightAnchor(S,l){const fixture=S.props.find(p=>p.id===(l.fixtureId||l.id));return fixture||{x:l.wallX??Math.floor(l.x),y:l.wallY??Math.floor(l.y)};}
function applyPropState(m,p){
  m.visible=!(p.type==='chest'&&g.state.loot[g.state.scene+':'+p.id]);
  if(p.type==='npc'){
    const speaker=window.viewsDebug?.speaker,talking=speaker&&(speaker.id?speaker.id===p.id:speaker.name===p.name);
    m.rotation.y=[0,Math.PI/2,Math.PI,-Math.PI/2][talking?faceCell(p,g.active()):m.userData.idleFacing??0];
  }
  if(m.userData.hinge){
    const goal=p.type==='door'&&g.isOpen(p)||g.departingNpc?.doorId===p.id?-Math.PI*.48:0;
    m.userData.hinge.userData.goal=goal;
    // New groups must reflect authoritative state immediately, without playing
    // an old door's opening animation again on remount.
    if(!m.parent||!g.animate())m.userData.hinge.rotation.y=goal;
  }
}
function buildEnvironment(S,rect){
  const terrainSeed=S.visualSeed??g.state.seed;
  const resource={root:new T.Group(),models:new Map(),doors:new Map(),torches:[],batches:null,chunk:rect};
  resource.root.name='region:'+rect.id;
  const belongs=p=>p.x>=rect.x&&p.x<rect.x+rect.w&&p.y>=rect.y&&p.y<rect.y+rect.h;
  try {
  const boxes = /* @__PURE__ */ new Map();
  function block(x, y, z, w, h, d, color) {
    if (!boxes.has(color)) boxes.set(color, []);
    boxes.get(color).push([x, y, z, w, h, d]);
  }
  for (let y = rect.y; y < rect.y + rect.h; y++) for (let x = rect.x; x < rect.x + rect.w; x++) {
    const type = World.tile(S, x, y), noise = (x * 113 + y * 71 + terrainSeed) % 11 / 100;
    if (type === "floor") {
      const grass=S.ground?.[y]?.[x]==='grass';
      const surface=window.WorldGen?.SURFACE_BY_CODE[S.surface?.[y]?.[x]];
      const col = new T.Color(surface ? WorldGen.surfaceColor(surface,x,y) : grass ? 0x527b3c : S.id === "proc-tavern" ? 6836539 : S.outdoor ? 0x978872 : 4544347);
      col.offsetHSL(0, -noise * 0.3, noise * 0.24);
      block(x + 0.5, -0.095, y + 0.5, 1, 0.17, 1, col.getHex());
      const pattern = (x * 37 + y * 61 + terrainSeed) % 17;
      if ((x * 7 + y * 13) % 19 === 0) block(x + 0.7, 5e-3, y + 0.24, 0.16, 7e-3, 0.18, 5859403);
    } else if (type === "wall") {
      if (S.props.some((p) => ["door", "portal"].includes(p.type) && p.x === x && p.y === y)) {
        block(x + 0.5, -0.095, y + 0.5, 1, 0.17, 1, 4544347);
        continue;
      }
      if (S.outdoor && y !== 1) {
        block(x + 0.5, 0.1, y + 0.5, 0.99, 0.2, 0.99, S.wallStyle ? WorldGen.wallColor(S.wallStyle,x,y) : 7501415);
        continue;
      }
      const front = World.tile(S, x, y - 1) === "floor" && !S.lights.some((l) => l.wallX === x && l.wallY === y), height = front ? 0.48 : 0.94;
      for (let row = 0; row < (front ? 2 : 4); row++) {
        const col = new T.Color(S.wallStyle ? WorldGen.wallColor(S.wallStyle,x,y) : 8486504);
        col.offsetHSL(0, -noise, 0.01 * (row % 2));
        if (row % 2) {
          block(x + 0.125, 0.12 + row * 0.235, y + 0.5, 0.22, 0.22, 0.97, col.getHex());
          block(x + 0.5, 0.12 + row * 0.235, y + 0.5, 0.47, 0.22, 0.97, col.getHex());
          block(x + 0.875, 0.12 + row * 0.235, y + 0.5, 0.22, 0.22, 0.97, col.getHex());
        } else {
          block(x + 0.25, 0.12 + row * 0.235, y + 0.5, 0.47, 0.22, 0.97, col.getHex());
          block(x + 0.75, 0.12 + row * 0.235, y + 0.5, 0.47, 0.22, 0.97, col.getHex());
        }
      }
      block(x + 0.5, height + 0.03, y + 0.5, 0.99, 0.06, 0.99, 9671035);
      const weather = (x * 19 + y * 43 + terrainSeed) % 13;
      if (weather === 7) block(x + 0.82, height + 0.064, y + 0.76, 0.11, 9e-3, 0.08, 7568982);
    }
  }
  for (const [color, data] of boxes) {
    const m = new T.InstancedMesh(geo, terrainMaterial(color, data.some((b) => b[1] > 0.05) ? 2 : 8), data.length), matrix = new T.Matrix4(), quat = new T.Quaternion();
    data.forEach(([x, y, z, w, h, d], i) => {
      matrix.compose(new T.Vector3(x, y, z), quat, new T.Vector3(w, h, d));
      m.setMatrixAt(i, matrix);
    });
    m.castShadow = data.some((a) => a[1] > 0.12);
    m.receiveShadow = true;
    resource.root.add(m);
  }
  const staticRoots=[],currentProps=new Map(g.props.map(p=>[p.id,p]));
  const sourceProps=[...S.props,...g.props.filter(p=>p.type==='ground-item'&&!S.props.some(source=>source.id===p.id))];
  for (const anchor of sourceProps.filter(belongs)) {
    const p=currentProps.get(anchor.id)||anchor;
    if (["torch", "chandelier"].includes(p.type)) continue;
    const m = propModel(p);
    m.position.set(p.x + 0.5, 0, p.y + 0.5);
    if(p.type==='npc')m.userData.idleFacing=npcFacing(S,p,g.state.world?.gen?.seed||g.state.procedural?.seed||g.state.world?.id||'');
    if (p.solid !== false && !["door", "portal", "decor", "banner"].includes(p.type)) contact(m, 0.88, 0.78);
    m.userData.p = p;
    applyPropState(m,p);
    m.visible &&= currentProps.has(p.id);
    resource.root.add(m);
    resource.models.set("prop:" + p.id, m);
    if (p.type === "door") resource.doors.set(p.id, m);
    if(!['npc','door','portal','chest','ground-item','torch','chandelier'].includes(p.type)&&!p.container)staticRoots.push(m);
  }
  resource.batches=batchStaticModels(staticRoots,resource.root);
  for(const root of staticRoots)root.userData.staticBatchOwner=resource.batches;
  for (const d of (S.decor || []).filter(belongs)) {
    if (d.kind === "bench") {
      const m = new T.Group();
      shadedBox(m, 0, 0.35, 0, 0.88, 0.13, 0.35, 7950386);
      shadedBox(m, 0, 0.56, -0.15, 0.88, 0.32, 0.07, 6833454);
      for (const x of [-0.32, 0.32]) shadedBox(m, x, 0.18, 0, 0.095, 0.3, 0.33, 5322275);
      compact(m);
      contact(m, 1, 0.55);
      m.position.set(d.x + 0.5, 0, d.y + 0.5);
      resource.root.add(m);
    } else {
      const m = new T.Group();
      const textile = new T.Mesh(new T.PlaneGeometry(d.w - 0.08, d.h - 0.08), patternedRug());
      textile.rotation.x = -Math.PI / 2;
      textile.position.y = 0.016;
      textile.receiveShadow = true;
      m.add(textile);
      for (const side of [-1, 1]) shadedBox(m, side * (d.w / 2 - 0.08), 0.017, 0, 0.025, 6e-3, d.h - 0.08, 10979920);
      m.position.set(d.x - 0.5 + d.w / 2, 0, d.y - 0.5 + d.h / 2);
      resource.root.add(m);
    }
  }
  for (const l of (S.lights || []).filter(l => belongs(lightAnchor(S,l)))) {
    const candle = l.id === "altar", chandelier = l.kind === "chandelier", m = l.kind === "fixture" ? new T.Group() : chandelier ? chandelierModel() : torchModel(), flames = m.userData.flames || [];
    if (l.kind === "wall") {
      m.position.set(l.x, 0.56, l.y);
      const holder = new T.Group();
      shadedBox(holder, -l.dx * 0.18, 0.26, -l.dy * 0.18, l.dx ? 0.045 : 0.15, 0.23, l.dy ? 0.045 : 0.15, 3752007);
      shadedBox(holder, -l.dx * 0.09, 0.11, -l.dy * 0.09, l.dx ? 0.24 : 0.045, 0.04, l.dy ? 0.24 : 0.045, 3752007);
      compact(holder);
      noSourceShadow(holder);
      const root = new T.Group();
      root.position.copy(m.position);
      m.position.set(0, 0, 0);
      root.add(holder, m);
      root.userData.p = S.props.find((p) => p.id === l.fixtureId);
      root.userData.lightSource = l.id;
      resource.root.add(root);
      resource.models.set("prop:" + l.fixtureId, root);
    } else {
      m.position.set(l.x, 0, l.y);
      m.userData.lightSource = l.id;
      if (chandelier) {
        m.userData.p = S.props.find((p) => p.id === l.id);
        resource.models.set("prop:" + l.id, m);
      }
      resource.root.add(m);
    }
    if (candle) m.visible = false;
    const light = new T.PointLight(16760192, l.intensity ?? (candle ? 2 : 12), l.distance ?? 8, 2);
    light.position.set(l.x, l.height ?? (candle ? 0.96 : 1.22), l.y);
    configureShadow(light);
    resource.root.add(light);
    resource.torches.push({ model: m, flames, light, source: l, chandelier });
  }

  return resource;
  }catch(error){disposeOwnedGroup(resource.root,{sharedGeometries:new Set([geo])});throw error;}
}
function installEnvironment(resource){
  world.add(resource.root);
  for(const [id,m]of resource.models){m.userData.regionOwner=resource.chunk.id;m.userData.regionAnchor={x:resource.chunk.x,y:resource.chunk.y};models.set(id,m);}
  for(const [id,m]of resource.doors)doors.set(id,m);
  torches.push(...resource.torches);
  renderer.shadowMap.needsUpdate=true;
  return resource;
}
function releaseEnvironment(resource){
  if(!resource)return;
  for(const [id,m]of resource.models){
    if(maskRoot===m||maskRoot===m.userData.hinge)setSelectionMask(null);
    motions.delete(id);motions.delete(m.userData.p?.id);
    delete m.userData.tap;delete m.userData.strike;
    if(models.get(id)===m)models.delete(id);
    if(doors.get(m.userData.p?.id)===m)doors.delete(m.userData.p.id);
  }
  for(const torch of resource.torches){const index=torches.indexOf(torch);if(index>=0)torches.splice(index,1);}
  const prompt=window.objectPrompt?.p;
  if(prompt&&resource.models.has('prop:'+prompt.id)){objectPrompt.hidden=true;promptInput.clear();}
  world.remove(resource.root);
  disposeOwnedGroup(resource.root,{sharedGeometries:new Set([geo])});
  resource.models.clear();resource.doors.clear();resource.torches.length=0;
  if(regionResources.get(resource.chunk.id)===resource)regionResources.delete(resource.chunk.id);
  renderer.shadowMap.needsUpdate=true;
}
function overviewEnvironment(S){
  const root=new T.Group(),map=document.createElement('canvas');map.width=S.W*2;map.height=S.H*2;
  const ctx=map.getContext('2d');
  for(let y=0;y<S.H;y++)for(let x=0;x<S.W;x++){
    const tile=World.tile(S,x,y);if(tile==='void')continue;
    const surface=window.WorldGen?.SURFACE_BY_CODE[S.surface?.[y]?.[x]];
    const color=tile==='wall'?0x77745f:surface?WorldGen.surfaceColor(surface,x,y):S.ground?.[y]?.[x]==='grass'?0x527b3c:0x978872;
    ctx.fillStyle='#'+new T.Color(color).getHexString();ctx.fillRect(x*2,y*2,2,2);
    ctx.fillStyle='rgba(0,0,0,.05)';ctx.fillRect(x*2+1,y*2+1,1,1);
  }
  // Landmarks live in the low-cost map texture; they carry no picking identity.
  for(const p of S.props){
    if(['tree','bush','bones'].includes(p.model)||['ground-item','npc','torch','chandelier'].includes(p.type))continue;
    ctx.fillStyle=['door','portal','waymark'].includes(p.type)?'#d6b370':'#69584a';ctx.fillRect(p.x*2,p.y*2,2,2);
  }
  const texture=new T.CanvasTexture(map);texture.colorSpace=T.SRGBColorSpace;texture.magFilter=texture.minFilter=T.NearestFilter;texture.generateMipmaps=false;
  const mat=new T.MeshStandardMaterial({map:texture,transparent:true,roughness:1}),mesh=new T.Mesh(new T.PlaneGeometry(S.W,S.H),mat);
  mesh.rotation.x=-Math.PI/2;mesh.position.set(S.W/2,-.018,S.H/2);mesh.receiveShadow=true;
  mesh.userData.disposeMaterial=true;mesh.userData.disposeTexture=true;root.add(mesh);root.name='region-overview';world.add(root);
  return root;
}
function scenePadding(S){
  let padding=2.25;
  for(const p of S.props){
    if(p.model&&window.Props){
      // Numeric model boxes avoid constructing any GPU model merely to find its
      // footprint. Height affects ground-projected visibility at this angle.
      for(const b of window.Props.build(p,{texel:false})||[])padding=Math.max(padding,Math.abs(b[0])+b[3]/2,Math.abs(b[2])+b[5]/2+(b[1]+b[4]/2)*.7);
    }
  }
  for(const d of S.decor||[])padding=Math.max(padding,d.w||1,d.h||1);
  return padding;
}
function reconcileRegions(force=false){
  if(!regionOptions?.enabled||!regionStream||!g||g.scene!==regionScene)return;
  regionBounds=expandRegionBounds(cameraGroundBounds(camera),{padding:regionPadding,lights:g.scene.lights||[]});
  const pins=collectRegionPins(g,motions,effects,window.viewsDebug?.speaker,window.objectPrompt,models);
  const plan=planRegionChunks({width:g.scene.W,height:g.scene.H,bounds:regionBounds,pins,...regionOptions,previousMode:regionPlan?.mode||'detail'});
  const key=plan.mode+':'+plan.chunks.map(c=>c.id+(c.pinned?'p':'')).join('|');
  regionPlan=plan;
  for(const id of regionFailures)if(id!=='scheduler'&&!plan.chunks.some(c=>c.id===id))regionFailures.delete(id);
  regionError.hidden=!regionFailures.size;
  if(key!==regionDemandKey||force){regionDemandKey=key;regionStream.update(plan);}
}
function addStatic(){
  const S=g.scene;regionGeneration++;regionMounting=true;
  signature=S.id+':'+(S.layoutKey||'')+':'+g.state.party.map(p=>p.id).join(',');
  setSelectionMask(null);objectPrompt.hidden=true;promptInput.clear();
  regionStream?.reset();regionStream=null;regionResources.clear();regionPlan=null;regionDemandKey='';regionScene=S;
  regionFailures.clear();regionError.hidden=true;
  for(const t of torches){scene.remove(t.light);if(t.portable)t.light.shadow.dispose();}
  clear(world);clear(actors);clearMarkers();models.clear();doors.clear();torches.length=0;motions.clear();staticBatches=null;
  for(const effect of effects){effect.el?.remove();if(effect.mesh){scene.remove(effect.mesh);disposeModel(effect.mesh);}}effects.length=0;
  regionOptions=regionConfig(S,window.location.search);
  if(regionOptions.enabled){
    regionPadding=scenePadding(S);overviewEnvironment(S);
    regionStream=createChunkStream({
      schedule:callback=>{const id=requestAnimationFrame(callback);return ()=>cancelAnimationFrame(id);},
      build:chunk=>{const resource=buildEnvironment(S,chunk);regionFailures.delete(chunk.id);regionResources.set(chunk.id,resource);return installEnvironment(resource);},
      release:releaseEnvironment,
      onChange:()=>{regionError.hidden=!regionFailures.size;if(!regionMounting&&g.scene===S){refreshSelectionMask();draw();}},
      onError:(error,chunk)=>{regionFailures.add(chunk?.id||'scheduler');regionError.hidden=false;console.error('Region loading failed',error);}
    });
    cameraUpdate();
    reconcileRegions();
    // One pinned group provides immediate nearby terrain; all other
    // detailed groups are frame-scheduled, never a full-scene blocking build.
    regionStream.flush(1);
  }else{
    const resource=installEnvironment(buildEnvironment(S,{id:'full',x:0,y:0,w:S.W,h:S.H}));staticBatches=resource.batches;
  }
  for(const a of g.state.party){
    const light=new T.PointLight(16760192,12,10,2);configureShadow(light,true);light.visible=false;scene.add(light);
    torches.push({light,portable:true,actorId:a.id,flames:[]});
  }
  renderer.shadowMap.needsUpdate=true;ready=true;regionMounting=false;document.body.classList.add('voxel-ready');resize();
}
function disposeModel(root){disposeOwnedGroup(root,{sharedGeometries:new Set([geo])});}
function clear(group){disposeModel(group);group.clear();}
function outline(x, z, color, size = 0.94) {
  const points = [[-size / 2, -size / 2], [size / 2, -size / 2], [size / 2, size / 2], [-size / 2, size / 2], [-size / 2, -size / 2]].map(([a, b]) => new T.Vector3(x + a, 0.025, z + b));
  const m = new T.Line(new T.BufferGeometry().setFromPoints(points), new T.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }));
  markers.add(m);
  return m;
}
function clearMarkers(){
  while (markers.children.length) {
    const m = markers.children[0];
    m.traverse((c) => {
      if (c.geometry && !c.userData.silhouette) c.geometry.dispose();
      if (c.material) c.material.dispose();
      if (c.isInstancedMesh) c.dispose();
    });
    markers.remove(m);
  }
}
function refreshSelectionMask(){
  const selectedProp=g.selected&&g.props.find(p=>p.x===g.selected.x&&p.y===g.selected.y);
  const selectedActor=g.selected&&g.all().find(p=>p.x===g.selected.x&&p.y===g.selected.y);
  const chosen=selectedProp?models.get('prop:'+selectedProp.id):selectedActor?models.get(selectedActor.id):null;
  setSelectionMask(chosen);return chosen;
}
function sync() {
  g = window.gameDebug;
  if (!g) return;
  if (regionScene !== g.scene || signature !== g.scene.id + ":" + (g.scene.layoutKey || "") + ":" + g.state.party.map((p) => p.id).join(",")) addStatic();
  const ground2 = g.props.filter((p) => p.type === "ground-item");
  for (const [id, m] of models) if (m.userData.p?.type === "ground-item" && !ground2.some((p) => "prop:" + p.id === id)) {
    if(maskRoot===m||maskRoot===m.userData.hinge)setSelectionMask(null);
    m.parent?.remove(m);
    disposeModel(m);
    models.delete(id);
    regionResources.get(m.userData.regionOwner)?.models.delete(id);
  }
  for (const p of ground2) if (!models.has("prop:" + p.id)) {
    const owner=regionOptions?.enabled?regionResources.get(regionChunkId(p.x,p.y,regionOptions.chunkSize)):null;
    if(regionOptions?.enabled&&!owner)continue;
    const m = propModel(p);
    m.position.set(p.x + 0.5, 0, p.y + 0.5);
    m.userData.p = p;
    (owner?.root||world).add(m);
    if(owner){owner.models.set('prop:'+p.id,m);m.userData.regionOwner=owner.chunk.id;m.userData.regionAnchor={x:owner.chunk.x,y:owner.chunk.y};}
    models.set("prop:" + p.id, m);
  }
  const entities = g.all(), ids = new Set(entities.map((p) => p.id));
  for (const p of entities) {
    let m = models.get(p.id);
    const loadout = JSON.stringify([p.hands || [], p.appearance || null, p.classId, p.visual || null, p.gen || null]);
    if (m && m.userData.loadout !== loadout) {
      if(maskRoot===m)setSelectionMask(null);
      actors.remove(m);
      disposeModel(m);
      models.delete(p.id);
      m = null;
    }
    if (!m) {
      m = figure(p.dummy ? 4 : p.kind, p);
      contact(m, 0.8, 0.68);
      m.userData.loadout = loadout;
      actors.add(m);
      models.set(p.id, m);
    }
    if (!motions.has(p.id)) {
      m.position.set(p.x + 0.5, 0, p.y + 0.5);
      m.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][p.facing || 0];
    }
    m.visible = !p.dead && (p.kind < 3 || p.dummy || window.visibility?.canSee(g.active(), p) !== false);
    m.userData.p = p;
    if (p.kind < 3) {
      if (!m.userData.torch) {
        const t2 = torchModel();
        t2.scale.setScalar(0.7);
        t2.position.set(p.hands?.indexOf("torch") === 0 ? -0.32 : 0.32, 0.37, 0.07);
        m.add(t2);
        m.userData.torch = t2;
      }
      const t = m.userData.torch;
      t.visible = !!p.hands?.includes("torch");
      t.userData.flames.forEach((f) => f.visible = !!p.torch);
    }
  }
  for (const [id, m] of models) if (!id.startsWith("prop:") && !ids.has(id)) {
    if(maskRoot===m)setSelectionMask(null);
    actors.remove(m);
    disposeModel(m);
    models.delete(id);
  }
  const currentProps=new Map(g.props.map(p=>[p.id,p]));
  for(const [id,m]of models)if(id.startsWith('prop:')){
    const p=currentProps.get(m.userData.p?.id);
    if(p){m.userData.p=p;applyPropState(m,p);}else m.visible=false;
    if(m.userData.staticBatched)m.userData.staticBatchOwner?.update(m);
  }
  clearMarkers();
  const chosen=refreshSelectionMask();
  const a = g.active();
  outline(a.x + 0.5, a.y + 0.5, 9481331, 0.74);
  if(g.state.world?.gen)for(const t of window.WorldGen.Runtime.knownTraps(window.GeneratedWorlds.host(),g.scene))outline(t.x+.5,t.y+.5,0xd87a38,.82);
  if (g.selected) {
    if (!chosen) outline(g.selected.x + 0.5, g.selected.y + 0.5, 14925430);
    const route = g.route || [];
    if (route.length) {
      const dots = new T.InstancedMesh(new T.BoxGeometry(0.06, 0.025, 0.06), new T.MeshBasicMaterial({ color: 13023111 }), route.length);
      route.forEach((p, i) => dots.setMatrixAt(i, new T.Matrix4().makeTranslation(p.x + 0.5, 0.027, p.y + 0.5)));
      markers.add(dots);
    }
    const end = route.at(-1);
    if (end) outline(end.x + 0.5, end.y + 0.5, 10337165, 0.68);
  }
  ambient.intensity = g.state.settings.lights ? 0.65 + g.state.settings.ambient * 0.45 : 0.85;
  fill.intensity = g.state.settings.lights ? 0.43 : 0.85;
  renderer.shadowMap.enabled = g.state.settings.lights;
  for (const t of torches) if (t.portable) t.light.shadow.needsUpdate = true;
  renderer.shadowMap.needsUpdate = true;
  reconcileRegions();
  draw();
}
function cameraUpdate() {
  const w = viewport.clientWidth || 390, h = viewport.clientHeight || 520, aspect = w / h;
  camera.left = -half * aspect;
  camera.right = half * aspect;
  camera.top = half;
  camera.bottom = -half;
  const elevation=regionOptions?.enabled?Math.max(12,half*1.4):12;
  camera.far=Math.max(80,elevation+half*4);
  camera.position.set(focus.x, elevation, focus.z + elevation*.7);
  camera.lookAt(focus.x, 0, focus.z);
  camera.updateProjectionMatrix();
  camera.updateMatrixWorld();
  reconcileRegions();
}
function resize() {
  const w = viewport.clientWidth || 390, h = viewport.clientHeight || 520;
  renderer.setSize(w, h, false);
  maskTarget.setSize(w, h);
  contourMaterial.uniforms.texel.value.set(1 / w, 1 / h);
  cameraUpdate();
  draw();
}
function center(p) {
  if(regionOptions?.enabled&&regionPlan?.mode==='overview')half=4.8;
  focus = { x: p.x + 0.5, z: p.y + 0.5 };
  cameraUpdate();
  draw();
}
function fit() {
  const S = g.scene, aspect = (viewport.clientWidth || 390) / (viewport.clientHeight || 520);
  half = Math.max(S.H * 0.5 * 0.819, S.W * 0.5 / aspect) + 0.5;
  focus = { x: S.W / 2, z: S.H / 2 };
  cameraUpdate();
  draw();
}
function reset() {
  half = 4.8;
  center(g.active());
}
function updateSilhouette() {
  const w = maskTarget.width, h = maskTarget.height;
  const key = [w, h, ...camera.matrixWorld.elements, ...camera.projectionMatrix.elements, ...maskObjects.flatMap((m) => m.matrix.elements)].join(",");
  if (key === maskCacheKey) return;
  if (!silhouetteTexture || silhouetteTexture.image.width !== w || silhouetteTexture.image.height !== h) {
    silhouetteTexture?.dispose();
    maskPixels = new Uint8Array(w * h * 4);
    maskExterior = new Uint8Array(w * h);
    maskQueue = new Int32Array(w * h);
    silhouetteTexture = new T.DataTexture(maskPixels, w, h, T.RGBAFormat);
    silhouetteTexture.minFilter = silhouetteTexture.magFilter = T.NearestFilter;
    contourMaterial.uniforms.mask.value = silhouetteTexture;
  }
  renderer.setRenderTarget(maskTarget);
  renderer.render(maskScene, camera);
  renderer.readRenderTargetPixels(maskTarget, 0, 0, w, h, maskPixels);
  fillSilhouette(maskPixels, w, h, maskExterior, maskQueue);
  silhouetteTexture.needsUpdate = true;
  maskCacheKey = key;
}
function draw() {
  if (!ready) return;
  if(window.CinematicMenu?.active){renderMenu(performance.now());return;}
  renderer.setRenderTarget(null);
  renderer.render(scene, camera);
  if (maskRoot && maskRoot.visible && maskObjects.length) {
    maskRoot.updateWorldMatrix(true, true);
    for (const m of maskObjects) m.matrix.copy(m.userData.source.matrixWorld);
    updateSilhouette();
    renderer.setRenderTarget(null);
    const auto = renderer.autoClear;
    renderer.autoClear = false;
    renderer.render(contourScene, contourCamera);
    renderer.autoClear = auto;
  }
}
const raycaster = new T.Raycaster(), plane = new T.Plane(new T.Vector3(0, 1, 0), 0);
function ground(x, y) {
  const r = viewport.getBoundingClientRect();
  raycaster.setFromCamera(new T.Vector2((x - r.left) / r.width * 2 - 1, -(y - r.top) / r.height * 2 + 1), camera);
  return raycaster.ray.intersectPlane(plane, new T.Vector3());
}
const pointers = /* @__PURE__ */ new Map();
raycaster.layers.enable(1);
let drag = false, start, panStart, pinchDist = 0, pinchHalf = 0;
canvas.addEventListener("pointerdown", (e) => {
  canvas.setPointerCapture(e.pointerId);
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 1) {
    start = { x: e.clientX, y: e.clientY };
    panStart = { ...focus };
    drag = false;
  }
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    pinchDist = Math.hypot(a.x - b.x, a.y - b.y);
    pinchHalf = half;
    drag = true;
  }
});
canvas.addEventListener("pointermove", (e) => {
  if (!pointers.has(e.pointerId)) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 2) {
    const [a, b] = [...pointers.values()];
    half = T.MathUtils.clamp(pinchHalf * pinchDist / Math.max(20, Math.hypot(a.x - b.x, a.y - b.y)), 2.8, 15);
  } else if (start) {
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.hypot(dx, dy) > 5) drag = true;
    if (drag) {
      focus.x = panStart.x - dx * 2 * half / (viewport.clientHeight || 520);
      focus.z = panStart.z - dy * 2 * half / (viewport.clientHeight || 520) / 0.819;
    }
  }
  cameraUpdate();
  draw();
});
canvas.addEventListener("pointerup", (e) => {
  if (!drag && pointers.size === 1) {
    const p = ground(e.clientX, e.clientY);
    const fixtures = [...models.values()].filter((m) => m.visible && m.userData.p && m.userData.p.type !== "chandelier");
    const hits = raycaster.intersectObjects(fixtures, true);
    if (regionPlan?.mode!=='overview' && hits.length) {
      let obj = hits[0].object;
      while (obj && !obj.userData.p) obj = obj.parent;
      if (obj) {
        const target = obj.userData.p;
        if(!canSelectRegionCell(regionOptions,regionPlan,regionStream,target.x,target.y)){g.mapTap(null);pointers.delete(e.pointerId);start=null;return;}
        g.mapTap(target);
        pointers.delete(e.pointerId);
        start = null;
        return;
      }
    }
    if (p && canSelectRegionCell(regionOptions,regionPlan,regionStream,Math.floor(p.x),Math.floor(p.z)) && World.tile(g.scene, Math.floor(p.x), Math.floor(p.z)) !== "void") g.mapTap({ x: Math.floor(p.x), y: Math.floor(p.z) });
    else g.mapTap(null);
  }
  pointers.delete(e.pointerId);
  start = null;
});
canvas.addEventListener("pointercancel", (e) => {
  pointers.delete(e.pointerId);
  start = null;
});
canvas.addEventListener("wheel", (e) => {
  e.preventDefault();
  half = T.MathUtils.clamp(half * Math.exp(e.deltaY * 1e-3), 2.8, 15);
  cameraUpdate();
  draw();
}, { passive: false });
for (const [id, fn] of Object.entries({ "zoom-in": () => {
  half = Math.max(2.8, half * 0.8);
  cameraUpdate();
  draw();
}, "zoom-out": () => {
  half = Math.min(15, half / 0.8);
  cameraUpdate();
  draw();
}, "camera-center": () => center(g.active()), "camera-fit": fit })) document.getElementById(id).onclick = fn;
function move(id, from, to, duration) {
  const m = models.get(id);
  if (!m) return;
  motions.set(id, { from: { x: from.x + 0.5, z: from.y + 0.5 }, to: { x: to.x + 0.5, z: to.y + 0.5 }, start: performance.now(), duration: Math.max(1, duration), m });
  m.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][m.userData.p?.facing || 0];
  reconcileRegions();
}
function impact(p, value, crit = false, animated = true, type = "damage") {
  const el = document.createElement("span");
  el.className = "voxel-damage " + (crit ? "critical " : "") + (type === "heal" ? "healing" : "");
  el.textContent = value === 0 ? "0" : String(value);
  viewport.append(el);
  effects.push({ el, p: { x: p.x + 0.5, y: 0.9, z: p.y + 0.5 }, start: performance.now(), life: 1100 });
  const m = models.get(p.id);
  if (m && type !== "heal") {
    m.userData.hit = performance.now();
  }
}
async function strike(a, b, animated) {
  const m = models.get(a.id);
  if (m) {
    m.rotation.y = [0, Math.PI / 2, Math.PI, -Math.PI / 2][a.facing || 0];
    m.userData.strike = { start: performance.now(), dx: Math.sign(b.x - a.x), dz: Math.sign(b.y - a.y) };
  }
  if (Math.abs(b.x - a.x) + Math.abs(b.y - a.y) > 1) {
    const shot = new T.Mesh(new T.BoxGeometry(0.07, 0.07, 0.19), material(a.kind === 1 ? 7651315 : 13676131, true));
    scene.add(shot);
    effects.push({ mesh: shot, from: { x: a.x + 0.5, z: a.y + 0.5 }, to: { x: b.x + 0.5, z: b.y + 0.5 }, start: performance.now(), life: 260 });
  }
  if (animated) await new Promise((r) => setTimeout(r, 260));
}
const portraits = /* @__PURE__ */ new Map();
function portrait(kind, object, actor, angle = 0) {
  const key = JSON.stringify([characterSpec(kind, actor) || characterProfile(actor || {}, kind), angle]) + kind + ":" + (object || "") + ":" + (actor?.portalKind || "") + ":" + (actor?.visual || "");
  if (!portraits.has(key)) {
    try {
      if (!portraitRenderer) {
        portraitRenderer = new T.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
        portraitRenderer.setSize(360, 450, false);
        portraitRenderer.setPixelRatio(1);
        portraitRenderer.outputColorSpace = T.SRGBColorSpace;
        portraitRenderer.toneMapping = T.ACESFilmicToneMapping;
        portraitRenderer.toneMappingExposure = 1.25;
      }
      const ps = new T.Scene();
      ps.add(new T.HemisphereLight(14937574, 6181693, 2));
      const light = new T.DirectionalLight(16769716, 2.8);
      light.position.set(-2, 4, 3);
      ps.add(light);
      const model = object === "item" ? itemModel(kind) : object ? propModel({ ...actor, type: object }) : figure(kind, actor);
      model.rotation.y = angle * Math.PI / 2;
      ps.add(model);
      const pc = new T.OrthographicCamera(-0.68, 0.68, 0.98, -0.72, 0.1, 20);
      pc.position.set(1.8, 1.6, 4);
      pc.lookAt(0, 0.67, 0);
      fitPreviewCamera(pc, model);
      portraitRenderer.render(ps, pc);
      const cache = document.createElement("canvas");
      cache.width = 360;
      cache.height = 450;
      cache.getContext("2d").drawImage(portraitRenderer.domElement, 0, 0);
      if (portraits.size > 80) portraits.delete(portraits.keys().next().value);
      portraits.set(key, cache);
      model.traverse((m) => {
        if (m.isInstancedMesh) m.dispose();
      });
    } catch {
      return null;
    }
  }
  const copy = document.createElement("canvas");
  copy.width = 360;
  copy.height = 450;
  copy.className = "sprite";
  copy.getContext("2d").drawImage(portraits.get(key), 0, 0);
  return copy;
}
function tap(p) {
  if (!p || !g?.animate()) return;
  const m = models.get("prop:" + p.id) || models.get(p.id);
  if (!m || p.type === "chandelier") return;
  m.userData.tap = { start: performance.now(), type: p.type || "actor", baseY: m.userData.tap?.baseY ?? m.position.y, baseZ: m.userData.tap?.baseZ ?? m.rotation.z };
}
function tick(time) {
  requestAnimationFrame(tick);
  if(window.CinematicMenu?.active && ready && !document.hidden){if(time-last>=30){last=time;renderMenu(time);}return;}
  if (document.hidden || document.getElementById("map-view").hidden || !ready) return;
  if (time - last < 30) return;
  last = time;
  const shadowDue = !tick.lastShadow || time - tick.lastShadow > 80;
  if (shadowDue) {
    tick.lastShadow = time;
  }
  const animate = g.animate(), a = g.active();
  reconcileRegions();
  for (const [id, v] of motions) {
    const t = Math.min(1, (time - v.start) / v.duration), ease = 1 - (1 - t) ** 3;
    v.m.position.set(T.MathUtils.lerp(v.from.x, v.to.x, ease), animate ? Math.sin(t * Math.PI) * 0.035 : 0, T.MathUtils.lerp(v.from.z, v.to.z, ease));
    if (t === 1) {
      v.m.position.set(v.to.x, 0, v.to.z);
      motions.delete(id);
    }
  }
  for (const m of models.values()) {
    if (m.userData.tap) {
      const t = m.userData.tap, u = (time - t.start) / 360;
      if (u < 1) {
        const beat = Math.sin(u * Math.PI) * Math.sin(u * Math.PI * 2);
        m.position.y = t.baseY + Math.sin(u * Math.PI) * (["npc", "actor"].includes(t.type) ? 0.045 : 0.022);
        m.rotation.z = t.baseZ + beat * (["door", "portal", "books", "barrel"].includes(t.type) ? 0.035 : 0.016);
      } else {
        m.position.y = t.baseY;
        m.rotation.z = t.baseZ;
        delete m.userData.tap;
      }
      if(m.userData.staticBatched)m.userData.staticBatchOwner?.update(m);
    }
    if (m.userData.strike) {
      const s = m.userData.strike, t = (time - s.start) / 280;
      if (t < 1) {
        m.position.x = m.userData.p.x + 0.5 + s.dx * Math.sin(t * Math.PI) * 0.1;
        m.position.z = m.userData.p.y + 0.5 + s.dz * Math.sin(t * Math.PI) * 0.1;
      } else {
        delete m.userData.strike;
        m.position.set(m.userData.p.x + 0.5, 0, m.userData.p.y + 0.5);
      }
    }
    if (m.userData.hinge) {
      const h = m.userData.hinge;
      h.rotation.y = T.MathUtils.lerp(h.rotation.y, h.userData.goal || 0, 0.22);
    }
  }
  const enabled = new Set(window.Torches.lightSources().map((l) => l.id));
  for (const t of torches) {
    const owner = t.portable ? g.state.party.find((p) => p.id === t.actorId) : null, l = t.source, phase = l?.phase || 2, isOn = !!g.state.settings.lights && (t.portable ? !!owner?.torch : enabled.has(l.id)), flicker = animate ? 1 + 0.035 * Math.sin(time * 5e-3 + phase) + 0.015 * Math.sin(time * 0.012 + phase) : 1;
    t.light.visible = isOn;
    t.light.intensity = isOn ? (l?.intensity ?? 12) * (t.portable ? 0.65 : l?.id === "altar" ? 0.22 : t.chandelier ? 0.3 : 0.45) * g.state.settings.intensity * flicker : 0;
    if (t.portable && isOn && shadowDue && (motions.size || effects.length || [...models.values()].some((m) => m.userData.strike || m.userData.hinge && Math.abs(m.userData.hinge.rotation.y - (m.userData.hinge.userData.goal || 0)) > 2e-3) || !t.lastPosition || t.light.position.distanceToSquared(t.lastPosition) > 1e-4)) {
      t.light.shadow.needsUpdate = true;
      renderer.shadowMap.needsUpdate = true;
      t.lastPosition = t.light.position.clone();
    }
    if (t.portable) {
      const m = models.get(owner?.id), hand = m?.userData.torch;
      if (hand) {
        hand.updateWorldMatrix(true, false);
        t.light.position.copy(hand.localToWorld(new T.Vector3(0, 0.64, 0)));
        hand.userData.flames.forEach((f, i) => {
          f.position.copy(f.userData.rest);
          if (animate) f.position.x += Math.sin(time * 9e-3 + i) * 0.015;
        });
      }
    } else {
      if (l.kind === "wall") {
        const present = window.Torches.fixture(l.fixtureId).present;
        t.model.visible = present;
        t.flames.forEach((f) => f.visible = isOn);
      }
      const shift = animate ? Math.sin(time * 8e-3 + phase) * 0.018 : 0;
      t.light.position.x = l.x + shift;
      t.light.position.z = l.y + shift * 0.6;
      t.flames.forEach((f, i) => {
        f.position.copy(f.userData.rest);
        if (animate) {
          f.position.x += shift * (i + 1) * 0.5;
          f.position.y += Math.sin(time * 9e-3 + phase + i) * 0.018;
        }
      });
      if (t.chandelier) {
        t.flames.forEach((f) => f.visible = isOn);
        const near = g.state.party.some((p) => Math.hypot(p.x + 0.5 - l.x, p.y + 0.5 - l.y) < 1.15);
        t.model.traverse((m) => {
          if (m.isMesh) m.material.opacity = T.MathUtils.lerp(m.material.opacity, near ? 0.28 : 1, 0.14);
        });
      }
    }
  }
  for (let i = effects.length - 1; i >= 0; i--) {
    const f = effects[i], t = (time - f.start) / f.life;
    if (t >= 1) {
      f.el?.remove();
      if (f.mesh) {
        scene.remove(f.mesh);
        f.mesh.geometry.dispose();
      }
      effects.splice(i, 1);
      continue;
    }
    if (f.el) {
      const p = new T.Vector3(f.p.x, f.p.y + t * 0.7, f.p.z).project(camera);
      f.el.style.left = (p.x + 1) * viewport.clientWidth / 2 + "px";
      f.el.style.top = (-p.y + 1) * viewport.clientHeight / 2 + "px";
      f.el.style.opacity = String(1 - Math.max(0, (t - 0.6) / 0.4));
    } else {
      f.mesh.position.set(T.MathUtils.lerp(f.from.x, f.to.x, t), 0.65, T.MathUtils.lerp(f.from.z, f.to.z, t));
      f.mesh.rotation.y = Math.atan2(f.to.x - f.from.x, f.to.z - f.from.z);
    }
  }
  const prompt = window.objectPrompt;
  objectPrompt.hidden = !prompt?.p || !canSelectRegionCell(regionOptions,regionPlan,regionStream,prompt?.p?.x,prompt?.p?.y) || !document.getElementById("dialogue").hidden || !!window.CinematicMenu?.active;
  if(objectPrompt.hidden)promptInput.clear();
  if (prompt?.p) {
    const p = prompt.p, point = new T.Vector3(p.x + 0.5, 0.45, p.y + 0.5).project(camera);
    const x = (point.x + 1) * viewport.clientWidth / 2, y = (-point.y + 1) * viewport.clientHeight / 2;
    const actions = prompt.actions || [], signature = JSON.stringify([p.name, actions.map(a=>[a.id,a.label,a.enabled])]);
    if (objectPrompt.dataset.signature !== signature) {
      promptInput.clear();
      objectPrompt.dataset.signature = signature;
      const title = document.createElement("strong"); title.textContent = p.name;
      const buttons = actions.map(a=>{ const b=document.createElement("button");b.type="button";b.dataset.action=a.id;b.textContent=a.label;b.disabled=!a.enabled;return b; });
      objectPrompt.replaceChildren(title,...buttons);
      objectPrompt.setAttribute("aria-label", "Действия · " + p.name);
    }
    const width = objectPrompt.offsetWidth || 190, height = objectPrompt.offsetHeight || 125;
    const vr = viewport.getBoundingClientRect(), dock = document.getElementById("play-dock")?.getBoundingClientRect();
    const bottom = Math.min(viewport.clientHeight - 6, dock && dock.height ? dock.top - vr.top - 6 : viewport.clientHeight - 6);
    let top = y - height - 24;
    if (top < 76) top = y + 24;
    top = Math.max(6, Math.min(bottom - height, top));
    objectPrompt.hidden ||= x < 0 || x > viewport.clientWidth || y < 0 || y > bottom || bottom < height;
    if(objectPrompt.hidden)promptInput.clear();
    objectPrompt.style.left = Math.max(width / 2 + 6, Math.min(viewport.clientWidth - width / 2 - 6, x)) + "px";
    objectPrompt.style.top = top + "px";
  }
  draw();
}
new ResizeObserver(resize).observe(viewport);
window.camera = { center, reset, fit, follow: (p) => {
  if (g.state.combat) center(p);
}, zoom: (scale) => {
  half = T.MathUtils.clamp(5 / scale, 2.8, 15);
  cameraUpdate();
}, allowClick: () => true, get state() {
  return { scale: 5 / half, focus };
} };
window.fx = { step: () => {
}, strike, impact, door: () => {
}, pulse: (p) => impact(p, "Отклик", false, true, "heal") };
let menuStage;
function renderMenu(time){menuStage ||= createMenuStage({figure,propModel,shadedBox,compact,terrainMaterial});renderer.setRenderTarget(null);menuStage.render(renderer,time,g.state.settings,window.CinematicMenu.editor);}
function regionSnapshot(){
  const stats=regionStream?.stats||{},resources=countGroupResources(world);
  return {enabled:!!regionOptions?.enabled,mode:regionOptions?.enabled?regionPlan?.mode||'detail':'full',
    chunkSize:regionOptions?.chunkSize,maxChunks:regionOptions?.maxChunks,budgetOverflow:regionPlan?.budgetOverflow||0,
    ready:stats.readyCount??(ready?1:0),readyIds:stats.readyIds||[],queued:stats.queuedCount||0,idle:!(stats.queuedCount||0),
    built:stats.builtCount||0,released:stats.releasedCount||0,generation:regionGeneration,streamGeneration:stats.generation||0,errors:stats.errors||0,lastError:stats.lastError||null,lastBuildMs:stats.lastBuildDuration||0,
    resources,actorResources:countGroupResources(actors),portableLights:torches.filter(t=>t.portable).length,
    groups:[...regionResources.values()].map(r=>({id:r.chunk.id,...countGroupResources(r.root)})),
    shared:{materials:materials.size+terrainMaterials.size,textures:terrainTextures.size+(rugMaterial?1:0)+1,geometries:1},
    gpu:{...renderer.info.memory,calls:renderer.info.render.calls,triangles:renderer.info.render.triangles},
    demand:{visibleKeys:regionPlan?.visibleKeys||[],pinnedKeys:regionPlan?.pinnedKeys||[],bounds:regionBounds},
    failedIds:[...regionFailures]};
}
function waitRegionIdle(timeout=10000){
  const started=performance.now();return new Promise((resolve,reject)=>{
    function check(){const stats=regionSnapshot();if(stats.idle)return resolve(stats);if(performance.now()-started>timeout)return reject(new Error('Region loading timed out'));requestAnimationFrame(check);}check();
  });
}
window.voxel = { resize, get staticBatchStats(){
  const batches=regionOptions?.enabled?[...regionResources.values()].map(r=>r.batches):staticBatches?[staticBatches]:[];
  return batches.length?batches.reduce((n,b)=>({props:n.props+b.roots.length,sourceMeshes:n.sourceMeshes+b.sourceMeshes,drawMeshes:n.drawMeshes+b.meshes.length}),{props:0,sourceMeshes:0,drawMeshes:0}):null;
}, get regionStats(){return regionSnapshot();}, regionReady:(x,y)=>canSelectRegionCell(regionOptions,regionPlan,regionStream,x,y), regionIdle:waitRegionIdle, turnHero:delta=>menuStage?.turn(delta), get menuDebug(){return menuStage?.debug;}, buildModel: (kind, actor, options) => figure(kind, actor, options), buildItem: itemModel, buildProp: propModel, compact, shadedBox, heroPortrait: (a, angle = 0) => portrait(a.kind, null, a, angle), portrait, sync, move, impact, tap, reset, fit, ground, get selectionMask() {
  return { root: maskRoot, objects: maskObjects, material: contourMaterial };
}, get ready() {
  return ready;
}, get scene() {
  return scene;
}, get camera() {
  return camera;
}, get models() {
  return models;
}, get renderer() {
  return renderer;
} };
window.initCamera = () => {
  sync();
  reset();
};
requestAnimationFrame(tick);
function boot() {
  if (window.gameDebug) {
    sync();
    reset();
    g.render();
    window.Heroes?.refreshPortraits();
  } else setTimeout(boot, 30);
}
boot();
