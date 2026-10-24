// ---------- characters from the game's own box models ----------
// Limbs get their own pivot groups (same split as the game's menu rig) so legs
// and arms can swing; boxes held at the hands (|x|>.31) are dropped and real
// items are attached to the hands from the two-hand inventory instead.
const PIV={head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]};
function buildModel(boxes){const g=new THREE.Group();const rig={},parts={};
  const minY=Math.min(...boxes.filter(b=>Math.abs(b[0])<=.31).map(b=>b[1]-b[4]/2));g.position.y=-minY; // feet on the ground
  for(const [k,p] of Object.entries(PIV)){rig[k]=new THREE.Group();rig[k].position.set(...p);g.add(rig[k]);parts[k]=[];}
  for(const b of boxes){const[x,y]=b;if(Math.abs(x)>.31)continue;
    parts[(Math.abs(x)>.29||(Math.abs(x)>.19&&y<.74))?(x<0?'armL':'armR'):y>=.74?'head':y<.4?(x<0?'legL':'legR'):'torso'].push(b);}
  // One merged, vertex-coloured mesh per limb instead of ~100 separate boxes.
  const mat=new THREE.MeshLambertMaterial({vertexColors:true}),col=new THREE.Color();
  for(const [k,list] of Object.entries(parts)){if(!list.length)continue;const t=rig[k],pos=[],nor=[],cols=[],idx=[];
    for(const[x,y,z,w,h,d,c] of list){const gb=new THREE.BoxGeometry(w,h,d);gb.translate(x-t.position.x,y-t.position.y,z-t.position.z);col.setHex(c);
      const base=pos.length/3,P=gb.attributes.position.array,N=gb.attributes.normal.array;for(let i=0;i<P.length;i++){pos.push(P[i]);nor.push(N[i]);}
      for(let i=0;i<P.length/3;i++)cols.push(col.r,col.g,col.b);for(const i of gb.index.array)idx.push(base+i);gb.dispose();}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.setIndex(idx);const m=new THREE.Mesh(geo,mat);m.castShadow=true;t.add(m);}
  const holder=new THREE.Group();holder.add(g);holder.userData.body=g;holder.userData.rig=rig;holder.userData.mats=[mat];return holder}
// Held item meshes, built around the grip point of a hand (0,0,0 = fist).
const IM=c=>new THREE.MeshLambertMaterial({color:c});
const HELD={
  sword:[[0,0,0,.06,.1,.06,0x5a3d28],[0,.07,0,.2,.04,.08,0xd0a94a],[0,.33,0,.06,.48,.035,0xd8dde4]],
  dagger:[[0,0,0,.05,.08,.05,0x5a3d28],[0,.05,0,.14,.03,.06,0xd0a94a],[0,.17,0,.05,.22,.03,0xd8dde4]],
  shield:[[.04,.06,.1,.3,.36,.05,0xd0a94a],[.04,.06,.125,.24,.3,.03,0x315e84],[.04,.06,.145,.03,.18,.02,0xd0a94a],[.04,.1,.145,.13,.03,.02,0xd0a94a]],
  torch:[[0,.12,0,.05,.4,.05,0x6a4426],[0,.35,0,.09,.09,.09,0xff9a2a,1],[0,.41,0,.05,.07,.05,0xffd36b,1]],
  bow:[[0,-0.360,0.020,.07,0.10,.07,0x5e3a1c],[0,-0.270,0.068,.07,0.10,.07,0x8a5a2e],[0,-0.180,0.103,.07,0.10,.07,0x8a5a2e],[0,-0.090,0.123,.07,0.10,.07,0x8a5a2e],[0,0.000,0.130,.07,0.10,.07,0x8a5a2e],[0,0.090,0.123,.07,0.10,.07,0x8a5a2e],[0,0.180,0.103,.07,0.10,.07,0x8a5a2e],[0,0.270,0.068,.07,0.10,.07,0x8a5a2e],[0,0.360,0.020,.07,0.10,.07,0x5e3a1c],[0,0,.13,.085,.12,.085,0x3a2416],[0,0,-.0,.014,.74,.014,0xe8e0c8],[0,.37,.02,.05,.04,.05,0xd0a94a],[0,-.37,.02,.05,.04,.05,0xd0a94a]],
  staff:[[0,.18,0,.05,.9,.05,0x6a4426],[0,.65,0,.12,.05,.12,0xd0a94a],[0,.74,0,.09,.12,.09,0x7fd0ff,1]],
  potion:[[0,.05,.04,.13,.15,.13,0xd23a30],[0,.15,.04,.06,.06,.06,0xe8c27a]],
  bread:[[0,.03,.05,.22,.1,.13,0xd6a95a]],
  spear:[[0,.3,0,.04,1.1,.04,0x6a4426],[0,.9,0,.07,.16,.03,0xc8ccd2]],
  mace:[[0,.08,0,.05,.32,.05,0x6a4426],[0,.28,0,.13,.12,.13,0x8a8e94],[0,.28,0,.16,.04,.04,0x8a8e94]],
  greataxe:[[0,.25,0,.05,.95,.05,0x6a4426],[.1,.66,0,.2,.22,.03,0xa8adb5],[.2,.66,0,.04,.26,.03,0xd8dde4]],
  warhammer:[[0,.25,0,.05,.95,.05,0x6a4426],[0,.7,0,.24,.13,.13,0x7a7e86]],
  fish:[[0,.04,.04,.07,.06,.22,0x7a9ab0],[0,.04,-.08,.03,.08,.06,0x5a7a90]],
  herb:[[0,.06,0,.03,.14,.03,0x3f6a2e],[.03,.13,0,.08,.06,.08,0x5a9a4a],[-.03,.11,.02,.07,.05,.07,0x6aaa5a]],
  stone:[[0,.03,0,.12,.08,.1,0x8a8e94],[.07,.025,.05,.08,.06,.07,0x9a9ea4],[-.05,.02,.06,.06,.05,.05,0x7a7e84]]};
function setHeld(holder,side,id){const arm=holder.userData.rig[side==='R'?'armL':'armR'];
  if(arm.userData.item){arm.remove(arm.userData.item);arm.userData.item=null;}if(!id)return;
  const grp=new THREE.Group();for(const[x,y,z,w,h,d,c,e]of HELD[id]){const m=new THREE.Mesh(box(w,h,d),e?new THREE.MeshBasicMaterial({color:c}):IM(c));m.position.set(x,y,z);m.castShadow=true;grp.add(m);}
  grp.add(fist());grp.scale.setScalar(1.5);grp.position.set((side==='R'?-.34:.34)-arm.position.x,.42-arm.position.y,.12);arm.add(grp);arm.userData.item=grp;}
// Two-handed items (bow, staff) are one object held in front of the chest;
// both arms reach forward to it instead of each hand getting a copy.
const TWO=new Set(['bow','staff','greataxe','warhammer']);
// a small fist wrapped around the handle so the item reads as gripped, not glued
const FIST_MAT=new THREE.MeshLambertMaterial({color:0xd9a27a}),FIST_DARK=new THREE.MeshLambertMaterial({color:0xb07a58});
function fist(){const g=new THREE.Group(),m=new THREE.Mesh(box(.085,.08,.085),FIST_MAT),k=new THREE.Mesh(box(.09,.02,.03),FIST_DARK);k.position.set(0,.01,.045);g.add(m,k);return g;}
function setTwoHanded(holder,id){const t=holder.userData.rig.torso;if(t.userData.item){t.remove(t.userData.item);t.userData.item=null;}holder.userData.twoHand=id||null;if(!id)return;
  const grp=new THREE.Group();for(const[x,y,z,w,h,d,c,e]of HELD[id]){const m=new THREE.Mesh(box(w,h,d),e?new THREE.MeshBasicMaterial({color:c}):IM(c));m.position.set(x,y,z);m.castShadow=true;grp.add(m);}
  // two fists close on the handle: one at the grip, one a little higher (staff) or on the string (bow)
  const f1=fist(),f2=fist();if(id==='bow'){f2.position.set(0,0,-.02);}else{f1.position.y=.05;f2.position.y=.32;}grp.add(f1,f2);
  grp.scale.setScalar(1.4);grp.position.set(0,.02-t.position.y+.45,.3);if(id==='bow')grp.rotation.z=.15;
  // the staff stands at the right side like a walking staff, clear of the face
  if(id!=='bow'){grp.position.set(-.24,.02-t.position.y+.3,.16);grp.rotation.z=-.08;}t.add(grp);t.userData.item=grp;}
window.equipHero=(L,R)=>{const two=TWO.has(L)?L:TWO.has(R)?R:null;
  setHeld(hero,'L',two?null:L);setHeld(hero,'R',two?null:R);setTwoHanded(hero,two);};
