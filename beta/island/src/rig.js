// ---------- characters from the game's own box models ----------
// Limbs get their own pivot groups (same split as the game's menu rig) so legs
// and arms can swing; boxes held at the hands (|x|>.31) are dropped and real
// items are attached to the hands from the two-hand inventory instead.
const ELBOW=.52;const capeShade=(c,k)=>(Math.min(255,((c>>16)&255)*k|0)<<16)|(Math.min(255,((c>>8)&255)*k|0)<<8)|Math.min(255,(c&255)*k|0);const PIV={cape:[0,.72,-.17],head:[0,.77,0],torso:[0,.45,0],armL:[-.23,.66,0],armR:[.23,.66,0],legL:[-.1,.34,0],legR:[.1,.34,0]};
function buildModel(boxes){const g=new THREE.Group();const rig={},parts={};
  const minY=Math.min(...boxes.filter(b=>Math.abs(b[0])<=.31).map(b=>b[1]-b[4]/2));g.position.y=-minY; // feet on the ground
  // the model is one piece: a block that touches nothing (a leaf, a nose, a fin) is moved onto its nearest neighbour,
  // and a drawn mark that lies on no block is dropped, so nothing hovers beside the body
  {const gap=(a,b,i)=>Math.abs(a[i]-b[i])-(a[i+3]+b[i+3])/2,near=(a,b)=>Math.max(0,gap(a,b,0))+Math.max(0,gap(a,b,1))+Math.max(0,gap(a,b,2));
   const solid=boxes.filter(b=>!b[8]&&(b.part||Math.abs(b[0])<=.31));
   for(const b of solid){let best=null,bd=1e9;for(const c of solid){if(c===b)continue;const d=near(b,c);if(d<bd){bd=d;best=c;}}
     if(best&&bd>.004)for(let i=0;i<3;i++){const g=gap(b,best,i);if(g>-.004)b[i]+=Math.sign(best[i]-b[i])*(g+.008);}}
   // a mark belongs to the block it lies closest to: marks of a builder's held item (the shield rim) go with it
   const dist=(d,list)=>Math.min(1e9,...list.map(b=>near(d,b))),gone=boxes.filter(b=>!b[8]&&!solid.includes(b));
   const host=d=>{const s=dist(d,solid);return s<.012&&s<dist(d,gone);};
   boxes=boxes.filter(d=>!d[8]||host(d));}
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
  {const low=new Set(boxes.filter(b=>!b[8]&&b[1]<.42&&Math.abs(b[0])<.15).map(b=>b[6])),skin=new Set(boxes.filter(b=>!b[8]&&Math.abs(b[0])<.12&&b[1]>.82&&b[1]<1.02&&b[2]>.15).map(b=>b[6])),skull=boxes.filter(b=>!b[8]&&b[1]>.8&&b[1]<1.1&&Math.abs(b[0])<.1).sort((a,b)=>b[3]*b[4]*b[5]-a[3]*a[4]*a[5])[0],hairC=new Set(boxes.filter(b=>!b[8]&&b[1]>.8).map(b=>b[6]).filter(c=>!low.has(c)&&!skin.has(c)&&!(skull&&c===skull[6])));
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
  // legs reach up under the belt, so no gap shows between them and the body, even mid-stride
  {const solidT=parts.torso.filter(b=>!b[8]);if(solidT.length){const bot=Math.min(...solidT.map(b=>b[1]-b[4]/2))+.02;
    for(const k of ['legL','legR']){const own=parts[k].filter(b=>!b[8]);if(!own.length)continue;const top=Math.max(...own.map(b=>b[1]+b[4]/2));
      if(top>=bot)continue;parts[k]=parts[k].map(b=>{if(b[8]||b[1]+b[4]/2<top-.03)return b;const lo=b[1]-b[4]/2;return [b[0],(lo+bot)/2,b[2],b[3],bot-lo,...b.slice(5)];});}}}
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
    // only solid blocks on the arm's own axis count: a builder's held item or its decals would pull the hand forward
    const own=list.filter(b=>!b[8]&&Math.abs(b[2])<.1&&b[5]<.2);if(!own.length){rig['hand'+k]=new THREE.Vector3(0,-.14,.02);continue;}const lo=Math.min(...own.map(b=>b[1]-b[4]/2)),hand=own.filter(b=>b[1]-b[4]/2<lo+.06),bb=new THREE.Box3();
    for(const [x,y,z,w,h,d] of hand)bb.union(new THREE.Box3(new THREE.Vector3(x-w/2,y-h/2,z-d/2),new THREE.Vector3(x+w/2,y+h/2,z+d/2)));
    rig['hand'+k]=bb.getCenter(new THREE.Vector3()).sub(o);}
  const holder=new THREE.Group();holder.add(g);holder.userData.body=g;holder.userData.rig=rig;holder.userData.mats=[mat,dmat];holder.userData.parts=parts;return holder}
// Held item meshes, built around the grip point of a hand (0,0,0 = fist).
const IM=c=>new THREE.MeshLambertMaterial({color:c});
const HELD={
  torch:[[0,.12,0,.05,.4,.05,0x6a4426],[0,.35,0,.09,.09,.09,0xff9a2a,1],[0,.41,0,.05,.07,.05,0xffd36b,1]],
  potion:[[0,.05,.04,.13,.15,.13,0xd23a30],[0,.15,.04,.06,.06,.06,0xe8c27a]],
  bread:[[0,.03,.05,.22,.1,.13,0xd6a95a]],
  flour:[[0,.08,.06,.2,.24,.16,0xe8dcc0],[0,.22,.06,.12,.05,.1,0xc8b890],[0,.24,.06,.04,.04,.12,0x8a6a40]],
  fish:[[0,.04,.04,.07,.06,.22,0x7a9ab0],[0,.04,-.08,.03,.08,.06,0x5a7a90]],
  herb:[[0,.06,0,.03,.14,.03,0x3f6a2e],[.03,.13,0,.08,.06,.08,0x5a9a4a],[-.03,.11,.02,.07,.05,.07,0x6aaa5a]],
  stone:[[0,.03,0,.12,.08,.1,0x8a8e94],[.07,.025,.05,.08,.06,.07,0x9a9ea4],[-.05,.02,.06,.06,.05,.05,0x7a7e84]]};
// A hero has exactly two hands, the model's own: an item is put into the hand of the arm and
// never brings a hand of its own. 'R' is the hero's right hand, which is the armL group.
// Arms are never posed for an item: they hang and swing naturally, and every item lies in the
// hand horizontally, pointing forward. Long shafts are gripped near their balance point,
// a bow by the grip in the middle of its arc (never by the string), a shield by the strap
// on its back, face out along the outside of the arm.
const TWO={has:id=>!!(id&&WEAPONS[id]&&WEAPONS[id].two)};
const _c=new THREE.Vector3();
function holdItem(holder,side,id){const r=holder.userData.rig,fore=r[side==='R'?'foreL':'foreR'],h=r[side==='R'?'handL':'handR'],k=kindOf(id),out=side==='R'?-1:1;
  const inner=heldGroup(id),bb=new THREE.Box3().setFromObject(inner),hold=new THREE.Group();hold.add(inner);
  if(k==='shield'){bb.getCenter(_c);inner.position.set(-_c.x,-_c.y,-bb.min.z+.015);hold.scale.setScalar(1.35);hold.rotation.set(0,out*Math.PI/2,0);}
  else if(k==='bow'){inner.position.z=-WEAPONS[id].m.bend;hold.scale.setScalar(1.4);
    hold.quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),out*Math.PI/2).multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),Math.PI/2));}
  else{const len=bb.max.y-bb.min.y;if(len>.8)inner.position.y=-(bb.min.y+len*.38);hold.scale.setScalar(TWO.has(id)?1.4:1.5);hold.rotation.x=k==='torch'?.5:Math.PI/2;}
  hold.position.copy(h);fore.add(hold);return hold;}
function setHeld(holder,side,id){const fore=holder.userData.rig[side==='R'?'foreL':'foreR'];
  if(fore.userData.item){fore.remove(fore.userData.item);fore.userData.item=null;}if(!id)return;fore.userData.item=holdItem(holder,side,id);}
// a two-handed item sits in one hand like any other: great weapons and staves in the right, a bow in the left
function setTwoHanded(holder,id){const rig=holder.userData.rig;for(const k of ['foreL','foreR']){const p=rig[k];if(p.userData.two){p.remove(p.userData.two);p.userData.two=null;}}
  holder.userData.twoHand=id||null;if(!id)return;const side=kindOf(id)==='bow'?'L':'R';rig[side==='R'?'foreL':'foreR'].userData.two=holdItem(holder,side,id);}
// the free swing of walking and breathing, the same for everyone whatever they carry
function armPose(o,walk,sw,breathe){const r=o.userData.rig,b=breathe*.03;
  const free=(arm,fore,s)=>{arm.rotation.set(walk?s*sw*.5:s*breathe*.04,0,0);fore.rotation.set(-.15-(walk?Math.max(0,-s*sw)*.35:0)+b*.5,0,0);};
  free(r.armL,r.foreL,-1);free(r.armR,r.foreR,1);
  if(r.cape)r.cape.rotation.x=.06+(walk?Math.abs(sw)*.22:0)+breathe*.015;}
window.equipHero=(L,R)=>{const two=TWO.has(L)?L:TWO.has(R)?R:null;
  setHeld(hero,'L',two?null:L);setHeld(hero,'R',two?null:R);setTwoHanded(hero,two);};
