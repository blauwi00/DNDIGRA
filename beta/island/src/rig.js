// ---------- characters from the game's own box models ----------
// Limbs get their own pivot groups (same split as the game's menu rig) so legs
// and arms can swing; boxes held at the hands (|x|>.31) are dropped and real
// items are attached to the hands from the two-hand inventory instead.
const ELBOW=.52;const PIV={head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]};
function buildModel(boxes){const g=new THREE.Group();const rig={},parts={};
  const minY=Math.min(...boxes.filter(b=>Math.abs(b[0])<=.31).map(b=>b[1]-b[4]/2));g.position.y=-minY; // feet on the ground
  for(const [k,p] of Object.entries(PIV)){rig[k]=new THREE.Group();rig[k].position.set(...p);g.add(rig[k]);parts[k]=[];}
  // forearms hang from an elbow joint inside each arm, so arms can bend
  for(const k of ['L','R']){const f=rig['fore'+k]=new THREE.Group();f.position.set(0,ELBOW-PIV['arm'+k][1],0);rig['arm'+k].add(f);parts['fore'+k]=[];}
  for(const b of boxes){const[x,y]=b;if(Math.abs(x)>.31)continue;
    const k=(Math.abs(x)>.29||(Math.abs(x)>.19&&y<.74))?(x<0?'armL':'armR'):y>=.74?'head':y<.4?(x<0?'legL':'legR'):'torso';
    if(k[0]!=='a'){parts[k].push(b);continue;}
    // an arm box crossing the elbow is cut in two: the upper part stays, the lower part bends
    const lo=y-b[4]/2,hi=y+b[4]/2,f='fore'+k.slice(3);
    if(hi<=ELBOW)parts[f].push(b);else if(lo>=ELBOW)parts[k].push(b);
    else{parts[k].push([x,(ELBOW+hi)/2,b[2],b[3],hi-ELBOW,b[5],b[6]]);parts[f].push([x,(lo+ELBOW)/2,b[2],b[3],ELBOW-lo,b[5],b[6]]);}}
  // One merged, vertex-coloured mesh per limb instead of ~100 separate boxes.
  const mat=new THREE.MeshLambertMaterial({vertexColors:true}),col=new THREE.Color();
  for(const [k,list] of Object.entries(parts)){if(!list.length)continue;const t=rig[k],pos=[],nor=[],cols=[],idx=[],o=new THREE.Vector3();if(k.startsWith('fore'))o.copy(t.position).add(t.parent.position);else o.copy(t.position);
    for(const[x,y,z,w,h,d,c] of list){const gb=new THREE.BoxGeometry(w,h,d);gb.translate(x-o.x,y-o.y,z-o.z);col.setHex(c);
      const base=pos.length/3,P=gb.attributes.position.array,N=gb.attributes.normal.array;for(let i=0;i<P.length;i++){pos.push(P[i]);nor.push(N[i]);}
      for(let i=0;i<P.length/3;i++)cols.push(col.r,col.g,col.b);for(const i of gb.index.array)idx.push(base+i);gb.dispose();}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.setIndex(idx);const m=new THREE.Mesh(geo,mat);m.castShadow=true;t.add(m);}
  const holder=new THREE.Group();holder.add(g);holder.userData.body=g;holder.userData.rig=rig;holder.userData.mats=[mat];return holder}
// Held item meshes, built around the grip point of a hand (0,0,0 = fist).
const IM=c=>new THREE.MeshLambertMaterial({color:c});
const HELD={
  torch:[[0,.12,0,.05,.4,.05,0x6a4426],[0,.35,0,.09,.09,.09,0xff9a2a,1],[0,.41,0,.05,.07,.05,0xffd36b,1]],
  potion:[[0,.05,.04,.13,.15,.13,0xd23a30],[0,.15,.04,.06,.06,.06,0xe8c27a]],
  bread:[[0,.03,.05,.22,.1,.13,0xd6a95a]],
  fish:[[0,.04,.04,.07,.06,.22,0x7a9ab0],[0,.04,-.08,.03,.08,.06,0x5a7a90]],
  herb:[[0,.06,0,.03,.14,.03,0x3f6a2e],[.03,.13,0,.08,.06,.08,0x5a9a4a],[-.03,.11,.02,.07,.05,.07,0x6aaa5a]],
  stone:[[0,.03,0,.12,.08,.1,0x8a8e94],[.07,.025,.05,.08,.06,.07,0x9a9ea4],[-.05,.02,.06,.06,.05,.05,0x7a7e84]]};
// A hero has exactly two hands, the model's own: an item is attached to the arm at its hand
// and never brings a hand of its own. 'R' is the hero's right hand, which is the armL group.
const HAND={armL:[-.11,-.24-(ELBOW-.66),.12],armR:[.11,-.24-(ELBOW-.66),.12]};
function setHeld(holder,side,id){const arm=holder.userData.rig[side==='R'?'foreL':'foreR'];
  if(arm.userData.item){arm.remove(arm.userData.item);arm.userData.item=null;}if(!id)return;
  const grp=heldGroup(id);grp.scale.setScalar(1.5);grp.position.set(...HAND[side==='R'?'armL':'armR']);arm.add(grp);arm.userData.item=grp;}
// Two-handed items live in one real hand: a staff, polearm or great weapon in the right hand
// like a walking staff, a bow in the left; the other hand stays free. Only one copy exists.
const TWO={has:id=>!!(id&&WEAPONS[id]&&WEAPONS[id].two)};
// arm and forearm angles while carrying: the elbow bends so the hand comes forward to the shaft
const TWO_POSE={stand:{arm:[-.05,0,.05],fore:[-.75,0,0]},bow:{arm:[-.05,0,.1],fore:[-.35,0,0]}};
// one place for every arm pose: carrying a long item, or the free swing of walking and breathing
function armPose(o,walk,sw,breathe){const r=o.userData.rig,two=o.userData.twoHand,b=breathe*.03;
  const free=(arm,fore,s)=>{arm.rotation.set(walk?s*sw*.5:s*breathe*.04,0,0);fore.rotation.set(-.15-(walk?Math.max(0,-s*sw)*.35:0)+b*.5,0,0);};
  if(two){const P=TWO_POSE[kindOf(two)==='bow'?'bow':'stand'],[A,F,oA,oF,s]=kindOf(two)==='bow'?[r.armR,r.foreR,r.armL,r.foreL,-1]:[r.armL,r.foreL,r.armR,r.foreR,1];
    A.rotation.set(P.arm[0]+b,P.arm[1],P.arm[2]);F.rotation.set(P.fore[0]-b,0,0);free(oA,oF,s);}
  else{free(r.armL,r.foreL,-1);free(r.armR,r.foreR,1);}}
function setTwoHanded(holder,id){const rig=holder.userData.rig;for(const k of ['foreL','foreR','armL','armR','torso']){const p=rig[k];if(p.userData.two){p.remove(p.userData.two);p.userData.two=null;}}
  holder.userData.twoHand=id||null;if(!id)return;
  const grp=heldGroup(id),bow=kindOf(id)==='bow',arm=rig[bow?'foreR':'foreL'],P=TWO_POSE[bow?'bow':'stand'],pose=[P.arm[0]+P.fore[0],0,P.arm[2]];
  // the arm's own pose is undone on the item, so it stands upright beside the body
  rig[bow?'armR':'armL'].rotation.set(...P.arm);arm.rotation.set(...P.fore);grp.scale.setScalar(1.4);grp.position.set(...HAND[bow?'armR':'armL']);
  grp.rotation.set(-pose[0],bow?Math.PI/2:Math.PI,bow?.04-pose[2]:pose[2]);arm.add(grp);arm.userData.two=grp;clearBody(holder,grp,bow);}
// keep a held item out of the body: test each of its boxes against the head and torso
// and lean it outward (or push a bow forward) until nothing overlaps
const _bA=new THREE.Box3(),_bB=new THREE.Box3();
function bodyBoxes(holder,skip){const out=[],rig=holder.userData.rig;holder.updateMatrixWorld(true);
  for(const part of [rig.head,rig.torso])if(part)part.traverse(o=>{if(o.isMesh&&!o.userData.isItem){let p=o.parent,inItem=false;while(p){if(p===skip)inItem=true;p=p.parent;}if(!inItem)out.push(new THREE.Box3().setFromObject(o).expandByScalar(-.004));}});return out;}
function hits(grp,body){grp.updateMatrixWorld(true);let n=0;grp.traverse(o=>{if(o.isMesh&&!(false)){_bA.setFromObject(o);for(const b of body)if(_bA.intersectsBox(b)){n++;break;}}});return n;}
function clearBody(holder,grp,bow){const body=bodyBoxes(holder,grp);for(let i=0;i<12&&hits(grp,body);i++){const s=bow?1:-1;if(i<5)grp.position.x+=s*.02;else grp.rotation.z+=s*.03;}}
window.equipHero=(L,R)=>{const two=TWO.has(L)?L:TWO.has(R)?R:null;
  setHeld(hero,'L',two?null:L);setHeld(hero,'R',two?null:R);setTwoHanded(hero,two);};
