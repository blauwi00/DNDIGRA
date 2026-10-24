// ---------- characters from the game's own box models ----------
// Limbs get their own pivot groups (same split as the game's menu rig) so legs
// and arms can swing; boxes held at the hands (|x|>.31) are dropped and real
// items are attached to the hands from the two-hand inventory instead.
const ELBOW=.52;const capeShade=(c,k)=>(Math.min(255,((c>>16)&255)*k|0)<<16)|(Math.min(255,((c>>8)&255)*k|0)<<8)|Math.min(255,(c&255)*k|0);const PIV={cape:[0,.72,-.17],head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]};
function buildModel(boxes){const g=new THREE.Group();const rig={},parts={};
  const minY=Math.min(...boxes.filter(b=>Math.abs(b[0])<=.31).map(b=>b[1]-b[4]/2));g.position.y=-minY; // feet on the ground
  for(const [k,p] of Object.entries(PIV)){rig[k]=new THREE.Group();rig[k].position.set(...p);g.add(rig[k]);parts[k]=[];}
  // forearms hang from an elbow joint inside each arm, so arms can bend
  for(const k of ['L','R']){const f=rig['fore'+k]=new THREE.Group();f.position.set(0,ELBOW-PIV['arm'+k][1],0);rig['arm'+k].add(f);parts['fore'+k]=[];}
  // boxes that share a face (a strand over the scalp, a beard over the chin) fight for the same depth and,
  // on phone GPUs, show holes: smaller boxes are grown by a hair so the detail always wins
  {const vol=b=>b[3]*b[4]*b[5],order=boxes.filter(b=>!b[8]).sort((a,b)=>vol(b)-vol(a));order.forEach((b,i)=>{const e=.0004+.0026*i/order.length;b._e=e;});
    boxes=boxes.map(b=>{if(!b._e)return b;const n=[b[0],b[1],b[2],b[3]+b._e,b[4]+b._e,b[5]+b._e,...b.slice(6)];n.part=b.part;return n;});}
  // the cape hangs from the shoulders on its own joint: its back panel, side flaps, hem and shading,
  // with folds drawn on the outside so it is not a flat board, and it swings when walking
  {const panel=boxes.find(b=>!b[8]&&b[3]>.4&&b[2]<-.16&&b[1]<.74&&b[4]>.2);
   if(panel){const cc=panel[6];for(const b of boxes){if(b[1]>=.74)continue;
       if((!b[8]&&b[6]===cc&&(b[2]<-.14||(Math.abs(b[0])>.22&&b[5]>=.15&&b[2]<0)))||(b[2]<-.16&&Math.abs(b[0])<.3)||(b[8]&&b[2]<-.135&&Math.abs(b[0])<.26))b.part='cape';}
     const back=panel[2]-panel[5]/2-.003,n=Math.round(panel[3]/.09);
     for(let i=0;i<n;i++){const x=-panel[3]/2+(i+.5)*panel[3]/n,f=[x,panel[1],back,.03,panel[4]*.96,.005,capeShade(cc,i%2?.78:1.14),false,'f'];f.part='cape';boxes.push(f);}
     const hem=[0,panel[1]-panel[4]/2+.02,back,panel[3],.03,.005,capeShade(cc,.7),false,'f'];hem.part='cape';boxes.push(hem);}}
  // hair that hangs past the shoulders (long, wavy, braids) must stay with the head, not swing with the arms:
  // hair colours are those on top of the head that never appear on the legs and belt
  {const low=new Set(boxes.filter(b=>!b[8]&&b[1]<.42&&Math.abs(b[0])<.15).map(b=>b[6])),skin=new Set(boxes.filter(b=>!b[8]&&Math.abs(b[0])<.12&&b[1]>.82&&b[1]<1.02&&b[2]>.15).map(b=>b[6])),hairC=new Set(boxes.filter(b=>!b[8]&&b[1]>.8).map(b=>b[6]).filter(c=>!low.has(c)&&!skin.has(c)));
   for(const b of boxes){if(b.part||b[8]||Math.abs(b[0])>.31||!(Math.abs(b[0])>.29||(Math.abs(b[0])>.19&&b[1]<.74)))continue;
     if(hairC.has(b[6]))b.part='head';else if(b[3]<.1&&b[1]+b[4]/2>.7)b.part='torso';}
   // shading decals follow the box they lie on
   const moved=boxes.filter(b=>!b[8]&&(b.part==='head'||b.part==='torso')),inside=(d,b)=>Math.abs(d[0]-b[0])<=b[3]/2+.012&&Math.abs(d[1]-b[1])<=b[4]/2+.012&&Math.abs(d[2]-b[2])<=b[5]/2+.012;
   for(const d of boxes)if(d[8]&&!d.part){const host=moved.find(b=>inside(d,b));if(host)d.part=host.part;}}
  for(const b of boxes){const[x,y]=b;if(Math.abs(x)>.31&&!b.part)continue;
    const k=b.part||((Math.abs(x)>.29||(Math.abs(x)>.19&&y<.74))?(x<0?'armL':'armR'):y>=.74?'head':y<.4?(x<0?'legL':'legR'):'torso');
    if(k[0]!=='a'){parts[k].push(b);continue;}
    // an arm box crossing the elbow is cut in two: the upper part stays, the lower part bends
    const lo=y-b[4]/2,hi=y+b[4]/2,f='fore'+k.slice(3);
    if(hi<=ELBOW)parts[f].push(b);else if(lo>=ELBOW)parts[k].push(b);
    else{parts[k].push([x,(ELBOW+hi)/2,b[2],b[3],hi-ELBOW,...b.slice(5)]);parts[f].push([x,(lo+ELBOW)/2,b[2],b[3],ELBOW-lo,...b.slice(5)]);}}
  // One merged, vertex-coloured mesh per limb instead of ~100 separate boxes.
  // thin decals (brows, mouth, beard edges, texel shading) lie on other faces: they get their own mesh drawn slightly in front,
  // as in the game's renderer, otherwise they flicker and leave holes
  const mat=new THREE.MeshLambertMaterial({vertexColors:true}),dmat=new THREE.MeshLambertMaterial({vertexColors:true,polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),col=new THREE.Color();
  for(const [k,all] of Object.entries(parts))for(const decal of [false,true]){const list=all.filter(b=>!!b[8]===decal);if(!list.length)continue;const t=rig[k],pos=[],nor=[],cols=[],idx=[],o=new THREE.Vector3();if(k.startsWith('fore'))o.copy(t.position).add(t.parent.position);else o.copy(t.position);
    for(const[x,y,z,w,h,d,c] of list){const gb=new THREE.BoxGeometry(w,h,d);gb.translate(x-o.x,y-o.y,z-o.z);col.setHex(c);
      const base=pos.length/3,P=gb.attributes.position.array,N=gb.attributes.normal.array;for(let i=0;i<P.length;i++){pos.push(P[i]);nor.push(N[i]);}
      for(let i=0;i<P.length/3;i++)cols.push(col.r,col.g,col.b);for(const i of gb.index.array)idx.push(base+i);gb.dispose();}
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));
    geo.setAttribute('color',new THREE.Float32BufferAttribute(cols,3));geo.setIndex(idx);const m=new THREE.Mesh(geo,decal?dmat:mat);m.castShadow=!decal;t.add(m);}
  // the hand is the lowest block of each forearm; items are put inside it, at its centre
  for(const k of ['L','R']){const list=parts['fore'+k],f=rig['fore'+k],o=f.position.clone().add(f.parent.position);
    if(!list.length){rig['hand'+k]=new THREE.Vector3(0,-.14,.02);continue;}const lo=Math.min(...list.map(b=>b[1]-b[4]/2)),hand=list.filter(b=>b[1]-b[4]/2<lo+.06),bb=new THREE.Box3();
    for(const [x,y,z,w,h,d] of hand)bb.union(new THREE.Box3(new THREE.Vector3(x-w/2,y-h/2,z-d/2),new THREE.Vector3(x+w/2,y+h/2,z+d/2)));
    rig['hand'+k]=bb.getCenter(new THREE.Vector3()).sub(o);}
  const holder=new THREE.Group();holder.add(g);holder.userData.body=g;holder.userData.rig=rig;holder.userData.mats=[mat,dmat];return holder}
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
function setHeld(holder,side,id){const arm=holder.userData.rig[side==='R'?'foreL':'foreR'];
  if(arm.userData.item){arm.remove(arm.userData.item);arm.userData.item=null;}if(!id)return;
  const grp=heldGroup(id),k=kindOf(id),h=holder.userData.rig[side==='R'?'handL':'handR'];grp.scale.setScalar(1.5);grp.position.copy(h);
  // the grip runs through the fist: blades point forward and up, a shield is strapped to the forearm, small things sit in the palm
  // a long one-handed weapon (spear, trident) is carried upright in a bent arm, like a staff
  const up=holder.userData.upright||(holder.userData.upright={});up[side]=k==='spear';
  up['shield'+side]=k==='shield';
  // a shield is strapped along the forearm, which is raised across the body; its face looks forward
  if(k==='shield'){grp.scale.setScalar(1.35);grp.position.y+=.05;const z=side==='R'?SHIELD.arm[2]:-SHIELD.arm[2],chain=new THREE.Quaternion().setFromEuler(new THREE.Euler(SHIELD.arm[0],0,z)).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(...SHIELD.fore)));
    grp.quaternion.copy(chain.invert());grp.position.x+=side==='R'?.02:-.02;}else if(up[side]){const z=side==='R'?-.12:.12,chain=new THREE.Quaternion().setFromEuler(new THREE.Euler(UPRIGHT.arm[0],0,z)).multiply(new THREE.Quaternion().setFromEuler(new THREE.Euler(...UPRIGHT.fore)));grp.quaternion.copy(chain.invert());}else if(isWeapon(id)||k==='torch')grp.rotation.x=k==='torch'?.6:1.9;
  arm.add(grp);arm.userData.item=grp;}
const UPRIGHT={arm:[-.05,0,0],fore:[-.75,0,0]},SHIELD={arm:[-.2,0,-.18],fore:[-1.15,0,0]};
// Two-handed items live in one real hand: a staff, polearm or great weapon in the right hand
// like a walking staff, a bow in the left; the other hand stays free. Only one copy exists.
const TWO={has:id=>!!(id&&WEAPONS[id]&&WEAPONS[id].two)};
// arm and forearm angles while carrying: the elbow bends so the hand comes forward to the shaft
const TWO_POSE={stand:{arm:[-.05,0,.05],fore:[-.75,0,0]},bow:{arm:[-.05,0,.1],fore:[-.35,0,0]}};
// one place for every arm pose: carrying a long item, or the free swing of walking and breathing
function armPose(o,walk,sw,breathe){const r=o.userData.rig,two=o.userData.twoHand,b=breathe*.03;
  const free=(arm,fore,s)=>{arm.rotation.set(walk?s*sw*.5:s*breathe*.04,0,0);fore.rotation.set(-.15-(walk?Math.max(0,-s*sw)*.35:0)+b*.5,0,0);};
  if(two){const P=o.userData.twoPose||TWO_POSE[kindOf(two)==='bow'?'bow':'stand'],[A,F,oA,oF,s]=kindOf(two)==='bow'?[r.armR,r.foreR,r.armL,r.foreL,-1]:[r.armL,r.foreL,r.armR,r.foreR,1];
    A.rotation.set(P.arm[0]+b,P.arm[1],P.arm[2]);F.rotation.set(P.fore[0]-b,0,0);free(oA,oF,s);}
  else{free(r.armL,r.foreL,-1);free(r.armR,r.foreR,1);}
  if(r.cape)r.cape.rotation.x=.06+(walk?Math.abs(sw)*.22:0)+breathe*.015;
  const up=o.userData.upright;if(up)for(const [s,A,F] of [['R',r.armL,r.foreL],['L',r.armR,r.foreR]])if(up['shield'+s]&&!two){A.rotation.set(SHIELD.arm[0]+b,0,A===r.armL?SHIELD.arm[2]:-SHIELD.arm[2]);F.rotation.set(SHIELD.fore[0]-b*.5,0,0);}
    else if(up[s]&&!(two&&o.userData.rig[s==='R'?'foreL':'foreR'].userData.two)){A.rotation.set(UPRIGHT.arm[0]+b,0,A===r.armL?-.12:.12);F.rotation.set(UPRIGHT.fore[0]-b,0,0);}}
function setTwoHanded(holder,id){const rig=holder.userData.rig;for(const k of ['foreL','foreR','armL','armR','torso']){const p=rig[k];if(p.userData.two){p.remove(p.userData.two);p.userData.two=null;}}
  holder.userData.twoHand=id||null;holder.userData.twoPose=null;if(!id)return;
  const grp=heldGroup(id),bow=kindOf(id)==='bow',side=bow?'R':'L',P=JSON.parse(JSON.stringify(TWO_POSE[bow?'bow':'stand']));
  grp.scale.setScalar(1.4);grp.position.copy(rig['hand'+side]);rig['fore'+side].add(grp);rig['fore'+side].userData.two=grp;holder.userData.twoPose=P;
  placeTwo(holder,grp,bow,P);clearBody(holder,grp,bow,P);}
// pose the carrying arm and turn the item so it stands upright with its grip inside the hand
function placeTwo(holder,grp,bow,P){const rig=holder.userData.rig,side=bow?'R':'L';rig['arm'+side].rotation.set(...P.arm);rig['fore'+side].rotation.set(...P.fore);
  // the wanted upright turn, expressed in the forearm's frame: undo the arm and forearm turns exactly
  const want=new THREE.Quaternion().setFromEuler(new THREE.Euler(0,bow?Math.PI/2:Math.PI,bow?.04:0));
  const chain=rig['arm'+side].quaternion.clone().multiply(rig['fore'+side].quaternion);grp.quaternion.copy(chain.invert().multiply(want));}
// keep a held item out of the body: test each of its boxes against the head and torso
// and lean it outward (or push a bow forward) until nothing overlaps
const _bA=new THREE.Box3(),_bB=new THREE.Box3();
function bodyBoxes(holder,skip){const out=[],rig=holder.userData.rig;holder.updateMatrixWorld(true);
  for(const part of [rig.head,rig.torso])if(part)part.traverse(o=>{if(o.isMesh&&!o.userData.isItem){let p=o.parent,inItem=false;while(p){if(p===skip)inItem=true;p=p.parent;}if(!inItem)out.push(new THREE.Box3().setFromObject(o).expandByScalar(-.004));}});return out;}
function hits(grp,body){grp.updateMatrixWorld(true);let n=0;grp.traverse(o=>{if(o.isMesh&&!(false)){_bA.setFromObject(o);for(const b of body)if(_bA.intersectsBox(b)){n++;break;}}});return n;}
// the arm swings out from the shoulder, taking the item with it, so it stays in the hand
function clearBody(holder,grp,bow,P){const body=bodyBoxes(holder,grp);for(let i=0;i<12&&hits(grp,body);i++){P.arm[2]+=bow?.04:-.04;placeTwo(holder,grp,bow,P);}}
window.equipHero=(L,R)=>{const two=TWO.has(L)?L:TWO.has(R)?R:null;
  setHeld(hero,'L',two?null:L);setHeld(hero,'R',two?null:R);setTwoHanded(hero,two);};
