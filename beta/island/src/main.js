// ---------- renderer / scene ----------
const canvas=document.getElementById('c'),stage=document.getElementById('stage');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false});
// ---------- a window to the hero: whatever stands between the camera and the hero, inside a circle
// around him on screen, crumbles away in pixel dots, for the eyes only (trees, roofs and walls stay solid
// for walking). Every lit or flat world material gets this in its shader; characters opt out.
const SEE={on:{value:0},c:{value:new THREE.Vector2()},r:{value:120},d:{value:1},y:{value:0}};
THREE.Material.prototype.onBeforeCompile=function(sh){if(!(this.isMeshLambertMaterial||this.isMeshBasicMaterial||this.isMeshStandardMaterial||this.isMeshPhongMaterial))return;
  const mat=this;sh.uniforms.seeOn={get value(){return mat.userData.noSee?0:SEE.on.value;}};sh.uniforms.seeC=SEE.c;sh.uniforms.seeR=SEE.r;sh.uniforms.seeD=SEE.d;sh.uniforms.seeY=SEE.y;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying float vSeeY;').replace('#include <project_vertex>','#include <project_vertex>\n{vec4 sw=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nsw=instanceMatrix*sw;\n#endif\nvSeeY=(modelMatrix*sw).y;}');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vSeeY;uniform float seeOn,seeR,seeD,seeY;uniform vec2 seeC;')
    .replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(seeOn>0.5&&gl_FragCoord.z<seeD&&vSeeY>seeY){float r=length(gl_FragCoord.xy-seeC)/seeR;if(r<1.0){float n=fract(sin(dot(floor(gl_FragCoord.xy/4.0),vec2(12.9898,78.233)))*43758.5453);if(n>smoothstep(0.55,1.0,r))discard;}}');};
const seeV=new THREE.Vector3(),seeT=new THREE.Vector3(),seeS=new THREE.Vector2();
function seeTick(){if(room||typeof H0==='undefined'||(window.SET&&SET.seeThrough===false)){SEE.on.value=0;return;}renderer.getDrawingBufferSize(seeS);const w=seeS.x,h=seeS.y;
  const gy=groundAt(H0.px,H0.pz);seeV.set(H0.px,gy+.8,H0.pz).project(camera);SEE.c.value.set((seeV.x+1)/2*w,(seeV.y+1)/2*h);SEE.r.value=Math.min(w,h)*.22;
  seeT.set(H0.px,gy+.8,H0.pz).sub(camera.position).normalize().multiplyScalar(-.7).add(new THREE.Vector3(H0.px,gy+.8,H0.pz)).project(camera);SEE.d.value=seeT.z*.5+.5;SEE.y.value=gy+.35;SEE.on.value=1;}
renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
const scene=new THREE.Scene();
const camera=new THREE.PerspectiveCamera(38,1,.1,34); // fog hides everything beyond ~30
const focus=new THREE.Vector3(8,0,30);
let camZoom=1,zoomTarget=1,camFocus=null; // the camera leans in while the hero looks at something
// the camera works as in Don't Starve: pinch or scroll to zoom, and the closer it comes the lower it leans,
// from nearly top-down far away to a view over the hero's shoulder up close. VIEW 0 = closest, 1 = farthest.
let VIEW=(()=>{try{const v=parseFloat(localStorage.getItem('helga-view'));return isFinite(v)?Math.min(1,Math.max(0,v)):.45}catch(e){return .45}})(),viewTarget=VIEW;
function setView(v){viewTarget=Math.min(1,Math.max(0,v));try{localStorage.setItem('helga-view',viewTarget.toFixed(3))}catch(e){}}
function placeCam(){const k=camZoom*(window.CAM_SCALE||1),d=(4.6+VIEW*7.5)*k,a=.5+VIEW*.55; // 29° when close, 60° when far
  camera.position.set(focus.x,focus.y+Math.sin(a)*d,focus.z+Math.cos(a)*d);camera.lookAt(focus.x,focus.y+(1-VIEW)*.5,focus.z)}
const T={p:[0,1,2,3].map(planks),stone:stoneFloor(),grass:grass(),dirt:dirt(),cobble:cobble(),wall:wallStone(),crate:crate(),leaves:leaves(),bark:bark(),water:water(),gside:grassSide(),moss:moss(),blade:blade(),smoke:smokeTex()};
const sand=tex(32,(g,s)=>{noise(g,s,['#b8a37a','#c2ad84','#ad9870','#bfa97f']);for(let i=0;i<14;i++)px(g,Math.floor(rnd()*s),Math.floor(rnd()*s),pick(['#8f7d5c','#d8c79e']))});
const lam=(map,extra={})=>new THREE.MeshLambertMaterial(Object.assign({map},extra));
const box=(w,h,d)=>new THREE.BoxGeometry(w,h,d);
const BOX=box(1,1,1);

// ---------- the island: a generated 300 x 220 island with the hand-made Заводь district in its north-west ----------
// Codes: F room floor, X room wall (solid), E room exit; ~ sea, A sand, G grass, D dirt road, C cobble, S ruin floor, P planks (dock),
// H house (solid), W ruin wall (solid), M mountain rock (solid), N snow (solid), B bog (wet ground), K field
// Rooms lie south of the island (rows ROOM_Z+), beyond the camera's reach. The seed is fixed: saves rely on the same island.
const grid=[],height=[];
const hash2=(x,z)=>{let h=(x*374761393+z*668265263)>>>0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296};
const vnoise=(x,z,s)=>{const X=Math.floor(x/s),Z=Math.floor(z/s),fx=x/s-X,fz=z/s-Z,l=(a,b,t)=>a+(b-a)*t*t*(3-2*t);
  return l(l(hash2(X,Z),hash2(X+1,Z),fx),l(hash2(X,Z+1),hash2(X+1,Z+1),fx),fz)};
const OLD_D=(x,z)=>((x-40)/37)**2+((z-30)/27)**2+(vnoise(x,z,7)-.5)*.5+(vnoise(x,z,3)-.5)*.15;
const GEN=IslandGen.make('helga',300,220,{stamp:{w:80,h:60,cx:40,cz:30,r:42,gate:[78,44],land:(x,z)=>OLD_D(x,z)<1,near:(x,z)=>(x>40||z>45)&&OLD_D(x,z)<2.4}});
const W=GEN.W,OUT_H=GEN.H,ROOM_Z=OUT_H+6,GB=GEN.B;let H=ROOM_Z+12;
const inStamp=(x,z)=>x<80&&z<60&&OLD_D(x,z)<1;
const genCode=(x,z)=>{if(z>=OUT_H)return '~';const i=z*W+x,b=GEN.biome[i];
  if(GEN.road[i]&&!inStamp(x,z))return GEN.river[i]||b===GB.LAKE||b===GB.SEA?'P':'D';
  if(b===GB.SEA)return '~';if(GEN.river[i]||b===GB.LAKE)return 'R';
  return b===GB.BEACH?'A':b===GB.MOUNTAIN?'M':b===GB.SNOW?'N':b===GB.SWAMP?'B':'G';};
for(let z=0;z<H;z++){grid.push([]);for(let x=0;x<W;x++)grid[z].push(z>=OUT_H?'~':inStamp(x,z)?'G':x<80&&z<60&&OLD_D(x,z)<2.4&&!(x>40||z>45)?'~':genCode(x,z));}
const at=(x,z)=>(grid[z]||[])[x]||'~',set=(x,z,c)=>{if(grid[z]&&grid[z][x]!==undefined)grid[z][x]=c};
// beach ring
const near=(x,z,c,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(at(x+dx,z+dz)===c)return true;return false};
for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(at(x,z)==='G'&&near(x,z,'~',2))grid[z][x]='A';
// zones (centres)
const Z={dock:[6,31],village:[26,30],forest:[60,40],camp:[64,44],ruins:[60,13],grave:[52,10],hunter:[46,48]};
// roads: the shortest way that goes round houses, walls and water, reusing roads already laid
function road(a,b,c='D'){const K=(x,z)=>z*W+x,block=['~','H','W','X','R','M','N','E','F'],prev=new Map([[K(...a),-1]]),q=[a];let found=false;
  for(let h=0;h<q.length&&prev.size<20000;h++){const[x,z]=q[h];if(x===b[0]&&z===b[1]){found=true;break;}
    for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz,k=K(nx,nz);if(nx<0||nz<0||nx>=W||nz>=OUT_H||prev.has(k)||block.includes(at(nx,nz)))continue;prev.set(k,K(x,z));q.push([nx,nz]);}}
  if(!found)return;for(let k=K(...b);k>=0;k=prev.get(k)){const x=k%W,z=(k/W)|0;for(const[ox,oz]of[[0,0],[0,1]])if(['G','A','B','D'].includes(at(x+ox,z+oz)))set(x+ox,z+oz,c);}}
// village plaza
for(let z=Z.village[1]-3;z<=Z.village[1]+3;z++)for(let x=Z.village[0]-4;x<=Z.village[0]+4;x++)if(Math.hypot(x-Z.village[0],(z-Z.village[1])*1.3)<5)set(x,z,'C');
// dock: planks out over the sea
for(let x=0;x<=Z.dock[0]+3;x++)for(const z of [Z.dock[1],Z.dock[1]+1])set(x,z,'P');
// ruins floor
for(let z=Z.ruins[1]-5;z<=Z.ruins[1]+5;z++)for(let x=Z.ruins[0]-6;x<=Z.ruins[0]+6;x++)if(at(x,z)!=='~'&&hash2(x,z)<.85)set(x,z,'S');
// houses (footprints, solid) around the plaza
// every house is as big outside as its room inside (the tavern is the big hall of the village)
const HOUSES=[[9,18,13,10],[29,19,9,7],[17,35,8,7],[31,35,9,7],[40,22,7,7],[9,35,7,7]];
const HOUSE_INFO=[['tavern','Таверна «Пьяный угорь»'],['forge','Кузница'],['home','Дом рыбака'],['hall','Дом старосты'],['barn','Амбар'],['herb','Хижина травницы']];
// Each house has a room far south of the island (rows ROOM_Z+), beyond the camera's reach.
// rooms sit side by side below the island, each exactly the size of its house
let roomX=2;const ROOMS=HOUSES.map(([hx,hz,hw,hd],i)=>{const iw=hw,id=hd,ox=roomX,oz=ROOM_Z;roomX+=iw+4;
  return {i,type:HOUSE_INFO[i][0],name:HOUSE_INFO[i][1],ox,oz,iw,id,door:[hx+Math.floor(hw/2),hz+hd],exit:[ox+Math.floor(iw/2),oz+id-1]};});
for(const R of ROOMS){for(let z=R.oz;z<R.oz+R.id;z++)for(let x=R.ox;x<R.ox+R.iw;x++)set(x,z,(x===R.ox||x===R.ox+R.iw-1||z===R.oz||z===R.oz+R.id-1)?'X':'F');set(...R.exit,'E');}
for(const [hx,hz,hw,hd] of HOUSES)for(let z=hz;z<hz+hd;z++)for(let x=hx;x<hx+hw;x++)set(x,z,'H');
road([Z.dock[0]+3,Z.dock[1]],Z.village);road(Z.village,[Z.ruins[0]-2,Z.ruins[1]+3]);road(Z.village,[Z.camp[0]-3,Z.camp[1]]);road([Z.village[0]+8,Z.village[1]+4],Z.hunter);road([Z.camp[0]-3,Z.camp[1]],[78,44]); // on to the gate where the big island's road begins
// a path from every door to the square
for(const R of ROOMS){const[dx,dz]=R.door;if(at(dx,dz)!=='C')set(dx,dz,'D');road([dx,dz],Z.village);}
// ruin walls: broken rectangle
const RW=[];for(let x=Z.ruins[0]-5;x<=Z.ruins[0]+5;x++)for(const z of [Z.ruins[1]-4,Z.ruins[1]+4])if(hash2(x,z*3)<.7&&Math.abs(x-Z.ruins[0])>1)RW.push([x,z]);
for(let z=Z.ruins[1]-4;z<=Z.ruins[1]+4;z++)for(const x of [Z.ruins[0]-5,Z.ruins[0]+5])if(hash2(x*3,z)<.7)RW.push([x,z]);
for(const [x,z] of RW)if(at(x,z)!=='~')set(x,z,'W');
// ---------- generated places: squares, houses, the quarry, camps and the old fort ----------
const GPL=GEN.places.filter(p=>!p.stamp),GEN_HOUSES=[],PALACE=[];
const genBusy=(x,z)=>GPL.some(p=>!['wolves','boars','bear'].includes(p.type)&&Math.hypot(x-p.x,z-p.z)<=p.r+1);
{const okCell=(x,z)=>['G','A','B','D'].includes(at(x,z));
 const fits=(hx,hz,hw,hd)=>{for(let z=hz-1;z<=hz+hd;z++)for(let x=hx-1;x<=hx+hw;x++){const c=at(x,z),inside=x>=hx&&x<hx+hw&&z>=hz&&z<hz+hd;if(inside?!['G','A','B'].includes(c):['H','~','R','M','N','W'].includes(c))return false;}return true;};
 const house=(hx,hz,hw,hd,p)=>{for(let z=hz;z<hz+hd;z++)for(let x=hx;x<hx+hw;x++)set(x,z,'H');GEN_HOUSES.push([hx,hz,hw,hd,p]);};
 for(const p of GPL){const disc=(r,c)=>{for(let z=p.z-r;z<=p.z+r;z++)for(let x=p.x-r;x<=p.x+r;x++)if(Math.hypot(x-p.x,z-p.z)<=r&&okCell(x,z))set(x,z,c);};
   // the capital: cobbled streets every five cells, a market square in the middle, houses filling the blocks
   // the royal castle fills the north of the capital: a walled court 28 x 17 cells with a keep, the market below its gate
   if(p.type==='capital'){let pal=null,bestR=1e9;for(let ox=-5;ox<=5;ox++){const c=[p.x-14+ox,p.z-p.r+1,28,17];let r=0;for(let z=c[1];z<c[1]+c[3];z++)for(let x=c[0];x<c[0]+c[2];x++)if(!okCell(x,z)&&at(x,z)!=='C')r++;if(r<bestR){bestR=r;pal=c;}}
     PALACE.push(Object.assign(pal,{p}));
     for(let z=pal[1]-1;z<pal[1]+pal[3]+1;z++)for(let x=pal[0]-1;x<pal[0]+pal[2]+1;x++)if(okCell(x,z)||at(x,z)==='C')set(x,z,x>=pal[0]&&x<pal[0]+pal[2]&&z>=pal[1]&&z<pal[1]+pal[3]?'H':'C');
     for(let z=p.z-p.r;z<=p.z+p.r;z++)for(let x=p.x-p.r;x<=p.x+p.r;x++){if(Math.hypot(x-p.x,z-p.z)>p.r||!okCell(x,z))continue;
       if((x-p.x)%8===0||(z-p.z)%8===0)set(x,z,'C');}
     // blocks of 7 x 7 between streets; each gets a house big enough to live in (inside as big as outside)
     const b0=Math.floor(p.r/8)*8;for(let bz=p.z-b0;bz<p.z+p.r;bz+=8)for(let bx=p.x-b0;bx<p.x+p.r;bx+=8){if(bz===p.z&&bx===p.x)continue;for(const[hw,hd]of[[7,6],[6,6],[6,5]])if(fits(bx+1,bz+1,hw,hd)){house(bx+1,bz+1,hw,hd,p);break;}}
     {for(let z=p.z+1;z<=p.z+7;z++)for(let x=p.x+1;x<=p.x+7;x++)if(okCell(x,z))set(x,z,'C');}} // the market square
   if(p.type==='village'||p.type==='works'){disc(p.type==='capital'?4:2,p.type==='works'?'S':'C');
     // houses on a ring around the square, more and bigger in richer places
     const want=p.type==='works'?3:3+Math.round((p.wealth||0)*.8),big=p.type==='capital'||p.wealth>=3;let n=0;
     for(let k=0;k<80&&n<want;k++){const a=k*2.39996+hash2(p.x,p.z)*6,rr=5+(k%5)*2.2,hw=big?7:6,hd=big?6:5;
       const hx=Math.round(p.x+Math.cos(a)*rr-hw/2),hz=Math.round(p.z+Math.sin(a)*rr-hd/2);
       if(!fits(hx,hz,hw,hd))continue;house(hx,hz,hw,hd,p);n++;}}
   if(p.type==='works')disc(p.r,'S');
   if(p.type==='bandits')disc(2,'D');
   if(p.type==='ruins'){disc(p.r,'S');for(let k=0;k<26;k++){const a=k/26*Math.PI*2,x=Math.round(p.x+Math.cos(a)*p.r),z=Math.round(p.z+Math.sin(a)*p.r);if(hash2(x*5,z*7)<.7&&at(x,z)==='S')set(x,z,'W');}}}}
// every generated house and the castle get a room of the same size, laid out in rows below Заводь's rooms
{let rx=2,rz=ROOM_Z+14,rowH=0;const alloc=(hx,hz,hw,hd,type,name,p)=>{if(rx+hw>W-2){rx=2;rz+=rowH+4;rowH=0;}
   while(grid.length<rz+hd+2)grid.push(Array(W).fill('~'));const R={i:ROOMS.length,type,name,ox:rx,oz:rz,iw:hw,id:hd,door:[hx+Math.floor(hw/2),hz+hd],exit:[rx+Math.floor(hw/2),rz+hd-1],gen:true,place:p,wealth:p.wealth||0};
   rx+=hw+4;rowH=Math.max(rowH,hd);ROOMS.push(R);for(let z=R.oz;z<R.oz+R.id;z++)for(let x=R.ox;x<R.ox+R.iw;x++)set(x,z,(x===R.ox||x===R.ox+R.iw-1||z===R.oz||z===R.oz+R.id-1)?'X':'F');set(...R.exit,'E');
   if(!['C','D','S'].includes(at(...R.door)))set(...R.door,'D');return R;};
 for(const h of PALACE)h.room=alloc(h[0],h[1],h[2],h[3],'castle','Королевский замок',h.p);
 const nm={capital:'Дом горожанина',village:'Деревенский дом',works:'Дом каменотёса'};
 for(const h of GEN_HOUSES){const p=h[4];h.room=alloc(h[0],h[1],h[2],h[3],p.poorWhy?'poorhouse':'house',p.poorWhy?'Лачуга':(nm[p.type]||'Дом'),p);}
 // some houses are shops: the capital has a smithy, a bakery and a general store, a rich village one of them
 {const left=new Map();for(const h of GEN_HOUSES){const p=h[4],R=h.room;if(R.type!=='house')continue;
   if(!left.has(p))left.set(p,p.type==='capital'?['smith','baker','store']:p.type==='village'&&p.wealth>=3?[['baker','smith','store'][Math.floor(hash2(p.x,p.z)*3)]]:[]);
   const k=left.get(p).shift();if(k){R.shop=k;R.name={smith:'Кузница',baker:'Пекарня',store:'Лавка'}[k];}}}
 H=grid.length;}
for(let z=0;z<H;z++){height.push([]);for(let x=0;x<W;x++){const c=at(x,z);
  // outside the old district the land rises with the generated relief: hills, then rock and snow
  const gh=inStamp(x,z)||z>=OUT_H?0:Math.max(0,GEN.height[z*W+x]-.3)*1.6;
  height[z].push(c==='F'||c==='E'||c==='X'?.3:c==='~'||c==='R'?0:c==='A'?.24:c==='P'?.3:c==='D'?.27+gh*.5:c==='C'?.29:c==='S'?.3:c==='M'?.7+gh:c==='N'?1.1+gh:c==='B'?.26:.3+vnoise(x,z,5)*.08+gh);}}
// cells from each land cell to the nearest sea, so the surf is only heard near water
const seaDist=[];{const q=[];for(let z=0;z<OUT_H;z++){seaDist.push([]);for(let x=0;x<W;x++){const s=at(x,z)==='~';seaDist[z].push(s?0:99);if(s)q.push([x,z]);}}
  for(let i=0;i<q.length;i++){const[x,z]=q[i];for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,-1],[1,-1],[-1,1]]){const nx=x+dx,nz=z+dz;if(nz<0||nz>=OUT_H||nx<0||nx>=W)continue;if(seaDist[nz][nx]>seaDist[z][x]+1){seaDist[nz][nx]=seaDist[z][x]+1;q.push([nx,nz]);}}}}
const groundAt=(x,z)=>{x=Math.floor(x);z=Math.floor(z);const c=at(x,z);return c==='~'||c==='R'?.12:height[z][x]};

// ---------- chunking: the island is drawn in 16x16 pieces so off-screen ones are culled ----------
const CH=16;
function chunk(list){const m=new Map();for(const c of list){const k=Math.floor(c[0]/CH)+','+Math.floor(c[1]/CH);if(!m.has(k))m.set(k,[]);m.get(k).push(c);}return [...m.values()];}
// ---------- chunk streaming, as in Minecraft: the world is data, meshes exist only near the hero ----------
// Every 16x16 chunk keeps builders for its terrain and props. Chunks within LOAD_R of the camera are built
// (a few per frame, nearest first); chunks beyond UNLOAD_R are taken down and their own geometry freed.
// Shared materials and base geometries belong to the world and are never disposed here.
const CHUNKS=new Map(),LOAD_R=40,UNLOAD_R=58,BUILDS_PER_FRAME=3;
const chunkKey=(x,z)=>Math.floor(x/CH)+','+Math.floor(z/CH);
function defer(key,build){let c=CHUNKS.get(key);if(!c){const[a,b]=key.split(',').map(Number);c={cx:(a+.5)*CH,cz:(b+.5)*CH,builders:[],live:[],on:false};CHUNKS.set(key,c);}
  c.builders.push(build);if(c.on)c.live.push(...[].concat(build()));}
function chunkOn(c){c.on=true;for(const b of c.builders)c.live.push(...[].concat(b()));}
function chunkOff(c){c.on=false;for(const o of c.live){scene.remove(o);for(const L of o.userData.lists||[]){const k=L.indexOf(o);if(k>=0)L.splice(k,1);}
    if(o.isInstancedMesh){o.geometry.dispose();o.dispose&&o.dispose();}}c.live=[];}
let streamAt=null,streamQueue=[];
function streamTick(all){const fx=focus.x,fz=focus.z,k=Math.floor(fx/4)+','+Math.floor(fz/4);
  if(k!==streamAt){streamAt=k;streamQueue=[];
    for(const c of CHUNKS.values()){const d=Math.hypot(c.cx-fx,c.cz-fz);if(c.on&&d>UNLOAD_R)chunkOff(c);else if(!c.on&&d<=LOAD_R)streamQueue.push([d,c]);}
    streamQueue.sort((a,b)=>a[0]-b[0]);}
  let n=all?1e9:BUILDS_PER_FRAME;while(n-->0&&streamQueue.length){const c=streamQueue.shift()[1];if(!c.on)chunkOn(c);}}
const loadedChunks=()=>[...CHUNKS.values()].filter(c=>c.on).length;
function fitBounds(im,cells,top){let x0=1e9,z0=1e9,x1=-1e9,z1=-1e9;for(const [x,z] of cells){x0=Math.min(x0,x);z0=Math.min(z0,z);x1=Math.max(x1,x+1);z1=Math.max(z1,z+1);}
  im.geometry=im.geometry.clone();im.geometry.boundingSphere=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,top/2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0,top)/2+1);
  im.frustumCulled=true;im.matrixAutoUpdate=false;im.updateMatrix();
  // the chunk-wide sphere is for culling only; instance raycasts need the local one
  const g=im.geometry,cull=g.boundingSphere,loc=g.clone();loc.computeBoundingSphere();const local=loc.boundingSphere;loc.dispose();
  const rc=im.raycast;im.raycast=function(r,out){g.boundingSphere=local;try{rc.call(this,r,out)}finally{g.boundingSphere=cull}};}
// ---------- terrain: one instanced mesh per surface and chunk ----------
const SURF={M:{top:T.stone,side:T.stone},N:{top:T.stone,side:T.stone,tint:0xe8eef2},B:{top:T.moss,side:T.dirt},G:{top:T.grass,side:T.gside},A:{top:sand,side:sand},D:{top:T.dirt,side:T.dirt},C:{top:T.cobble,side:T.stone},S:{top:T.stone,side:T.stone},H:{top:T.dirt,side:T.dirt},W:{top:T.stone,side:T.stone},P:{top:T.p[0],side:T.p[1]}};
const pickable=[],tmpCol=new THREE.Color();const m4=new THREE.Matrix4(),q0=new THREE.Quaternion(),v1=new THREE.Vector3(),v2=new THREE.Vector3();
for(const [code,s] of Object.entries(SURF)){const cells=[];for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(at(x,z)===code)cells.push([x,z]);if(!cells.length)continue;
  const side=lam(s.side,code==='G'?{}:{color:s.tint||0xb8b0a8}),mats=[side,side,lam(s.top,s.tint?{color:s.tint}:{}),side,side,side];
  for(const part of chunk(cells))defer(chunkKey(...part[0]),()=>{const im=new THREE.InstancedMesh(BOX,mats,part.length);im.receiveShadow=true;
    part.forEach(([x,z],i)=>{const h=code==='P'?.08:height[z][x];m4.compose(v1.set(x+.5,code==='P'?h+.18:h/2,z+.5),q0,v2.set(1,h,1));im.setMatrixAt(i,m4);
      const v=.9+.14*vnoise(x,z,7)+(hash2(x*3,z*5)-.5)*.025,w=code==='G'?(vnoise(x+40,z,11)-.5)*.12:0;im.setColorAt(i,tmpCol.setRGB(v*(1+w*.4),v*(1+w),v*(1-w*.6)));});
    fitBounds(im,part,2);im.userData.cells=part;im.userData.lists=[pickable];scene.add(im);pickable.push(im);return im;});}
// dock posts
{const posts=[];for(let x=0;x<=Z.dock[0]+3;x+=2)for(const z of [Z.dock[1]-.05,Z.dock[1]+2.05])posts.push([x+.5,z]);
 const im=new THREE.InstancedMesh(BOX,lam(T.bark),posts.length);posts.forEach(([x,z],i)=>{m4.compose(v1.set(x,.2,z),q0,v2.set(.14,.6,.14));im.setMatrixAt(i,m4)});im.castShadow=true;scene.add(im);}
// sea
const wmat=lam(T.water,{transparent:true,opacity:.92});T.water.wrapS=T.water.wrapT=THREE.RepeatWrapping;T.water.repeat.set(70,55);
T.water.repeat.set(W*.9,OUT_H*.9);const sea=new THREE.Mesh(new THREE.PlaneGeometry(W+120,OUT_H+120),wmat);sea.rotation.x=-Math.PI/2;sea.position.set(W/2,.12,OUT_H/2);scene.add(sea);
// shore foam
{const f=[];for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(at(x,z)==='~'&&near(x,z,'A',1))f.push([x,z]);
 const im=new THREE.InstancedMesh(box(1,.02,1),new THREE.MeshBasicMaterial({color:0x9fc3cf,transparent:true,opacity:.22}),f.length);f.forEach(([x,z],i)=>{m4.compose(v1.set(x+.5,.14,z+.5),q0,v2.set(1,1,1));im.setMatrixAt(i,m4)});scene.add(im);window.foam=im;}

// ---------- props: instanced trees, rocks, grass; solid cells block walking ----------
const solid=new Set(),blockCell=(x,z)=>solid.add(Math.floor(x)+','+Math.floor(z)),free=(x,z)=>!solid.has(x+','+z)&&!['~','R','M','N','H','W','X'].includes(at(x,z));
for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(['H','W','X','M','N','R'].includes(at(x,z)))blockCell(x,z);
const nearZone=(x,z,name,r)=>Math.hypot(x-Z[name][0],z-Z[name][1])<r;
const treeCells=[],rockCells=[],bushCells=[],grassCells=[],mushCells=[];
for(let z=1;z<OUT_H-1;z++)for(let x=1;x<W-1;x++){if(at(x,z)!=='G'&&at(x,z)!=='B')continue;
  if(ROOMS.some(R=>Math.abs(x-R.door[0])<=2&&z-R.door[1]>=-1&&z-R.door[1]<=2))continue; /* keep doorways clear */const r=hash2(x*7,z*13),gb=GEN.biome[z*W+x],wild=!inStamp(x,z),dens=!wild?(x>44?.42:x>36?.18:.08):gb===GB.FOREST?.5:gb===GB.HILLS?.16:gb===GB.SWAMP?.05:.04;
  if(wild&&genBusy(x,z)){if(r<.05)grassCells.push([x,z]);continue;}
  if(nearZone(x,z,'village',9)||nearZone(x,z,'camp',3)||nearZone(x,z,'hunter',3)||nearZone(x,z,'grave',6)||nearZone(x,z,'ruins',7))
    {if(r<.06)grassCells.push([x,z]);continue;}
  if([[1,0],[-1,0],[0,1],[0,-1]].some(([a,b])=>['D','C','P'].includes(at(x+a,z+b)))){if(r<.12)bushCells.push([x,z]);else if(r<.5)grassCells.push([x,z]);continue;}
  if(r<dens)treeCells.push([x,z]);else if(r<dens+.04)rockCells.push([x,z]);else if(r<dens+.08)bushCells.push([x,z]);else if((x>44||wild&&(gb===GB.FOREST||gb===GB.SWAMP))&&r<dens+.1)mushCells.push([x,z]);else if(r<dens+.45)grassCells.push([x,z]);}
for(const c of [...treeCells,...rockCells,...bushCells])blockCell(...c);
// no sealed pockets: every open land cell must connect to the dock; cut the fewest props to link any that don't
{const K=(x,z)=>x+','+z,land=(x,z)=>z<OUT_H&&!['~','R','M','N','H','W','X'].includes(at(x,z)),seen=new Set();
 const flood=(x0,z0)=>{const q=[[x0,z0]];seen.add(K(x0,z0));while(q.length){const[x,z]=q.pop();for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(seen.has(K(nx,nz))||!free(nx,nz)||nz>=OUT_H)continue;seen.add(K(nx,nz));q.push([nx,nz]);}}};
 flood(Z.dock[0]+1,Z.dock[1]);const cut=new Set();
 for(let z=0;z<OUT_H;z++)for(let x=0;x<W;x++){if(!free(x,z)||seen.has(K(x,z)))continue;
   const prev=new Map([[K(x,z),null]]),dq=[[x,z]];let end=null;   // 0-1 BFS: open cells cost 0, props cost 1
   while(dq.length){const[cx,cz]=dq.shift();if(seen.has(K(cx,cz))){end=[cx,cz];break;}
     for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,nz=cz+dz;if(prev.has(K(nx,nz))||!land(nx,nz))continue;prev.set(K(nx,nz),[cx,cz]);free(nx,nz)?dq.unshift([nx,nz]):dq.push([nx,nz]);}}
   if(!end)continue;for(let c=end;c;c=prev.get(K(c[0],c[1])))if(!free(c[0],c[1])){solid.delete(K(c[0],c[1]));cut.add(K(c[0],c[1]));}
   flood(x,z);}
 for(const L of [treeCells,rockCells,bushCells])for(let i=L.length-1;i>=0;i--)if(cut.has(K(...L[i])))L.splice(i,1);}
// props stream with their chunk; the returned list is live: it holds only the meshes built right now
function instanced(geo,mat,list,place,shadow=true){const out=[];if(!list.length)return out;for(const part of chunk(list))defer(chunkKey(Math.floor(part[0][0]),Math.floor(part[0][1])),()=>{const im=new THREE.InstancedMesh(geo,mat,part.length);
  part.forEach((c,i)=>{place(c,i,m4);im.setMatrixAt(i,m4);const v=.82+hash2(c[0]*7,c[1]*3)*.3;im.setColorAt(i,tmpCol.setRGB(v,v*(.95+hash2(c[1],c[0])*.1),v*.95));});im.castShadow=shadow;im.receiveShadow=true;fitBounds(im,part,3);im.userData.cells=part;im.userData.lists=[out];scene.add(im);out.push(im);return im;});return out;}
const qY=a=>new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,1,0),a);
const WIND={value:0};
function sway(mat,amp,topOnly){const base=THREE.Material.prototype.onBeforeCompile;mat.onBeforeCompile=function(sh){base.call(this,sh);sh.uniforms.uWind=WIND;sh.vertexShader='uniform float uWind;\n'+sh.vertexShader.replace('#include <begin_vertex>',
  '#include <begin_vertex>\n#ifdef USE_INSTANCING\nvec4 wp=instanceMatrix*vec4(0.,0.,0.,1.);\n#else\nvec4 wp=vec4(0.);\n#endif\nfloat k='+(topOnly?'max(0.,position.y+.5)':'1.')+';\ntransformed.x+=sin(uWind*1.7+wp.x*.7+wp.z*.4)*'+amp+'*k;\ntransformed.z+=cos(uWind*1.3+wp.z*.6)*'+amp+'*.6*k;');};mat.customProgramCacheKey=()=>'sway'+amp+topOnly;return mat;}
const leafA=sway(lam(T.leaves),.05,1),leafB=sway(lam(T.leaves,{color:0xb8c9a0}),.06,1),pine=sway(lam(T.leaves,{color:0x8aa080}),.07,1);
instanced(BOX,lam(T.bark),treeCells,([x,z],i,m)=>{const s=.9+hash2(x,z)*.6;m.compose(v1.set(x+.5,groundAt(x,z)+.45*s,z+.5),q0,v2.set(.22*s,.9*s,.22*s))});
for(const [k,mat,y,sz] of [[0,leafA,1.05,.95],[1,leafB,1.45,.7],[2,pine,1.78,.42]])
  instanced(BOX,mat,treeCells,([x,z],i,m)=>{const s=.9+hash2(x,z)*.6;m.compose(v1.set(x+.5+(k-1)*.05,groundAt(x,z)+y*s,z+.5),qY(hash2(z,x)*3),v2.set(sz*s,sz*.8*s,sz*s))});
const rockMeshes=instanced(BOX,lam(T.stone),rockCells,([x,z],i,m)=>m.compose(v1.set(x+.5,groundAt(x,z)+.12,z+.5),qY(hash2(x,z)*3),v2.set(.5,.24,.4)));
instanced(BOX,lam(T.leaves,{color:0xa8c090}),bushCells,([x,z],i,m)=>m.compose(v1.set(x+.5,groundAt(x,z)+.22,z+.5),qY(hash2(x,z)*3),v2.set(.62,.44,.56)));
const bladeMat=sway(new THREE.MeshLambertMaterial({map:T.blade,transparent:true,alphaTest:.5,side:THREE.DoubleSide}),.07,1);
// meadow flowers: little petal clusters on stems, three colours
{const fl=[];for(let z=1;z<OUT_H-1;z++)for(let x=1;x<W-1;x++)if(at(x,z)==='G'&&!solid.has(x+','+z)&&hash2(x*11,z*17)<.09&&!nearZone(x,z,'grave',7)&&!nearZone(x,z,'ruins',8))fl.push([x,z]);
 const stem=new THREE.MeshLambertMaterial({color:0x3f6a2e});[0xe8d06a,0xd88ab0,0xe8e8f0].forEach((c,ci)=>{const list=fl.filter(([x,z])=>Math.floor(hash2(z,x)*3)===ci);
   instanced(box(.02,.16,.02),sway(stem,.04,1),list,([x,z],i,m)=>m.compose(v1.set(x+.25+hash2(x,z)*.5,groundAt(x,z)+.08,z+.3+hash2(z,x)*.4),q0,v2.set(1,1,1)),false);
   instanced(box(.08,.05,.08),sway(new THREE.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:.15}),.04,0),list,([x,z],i,m)=>m.compose(v1.set(x+.25+hash2(x,z)*.5,groundAt(x,z)+.17,z+.3+hash2(z,x)*.4),qY(hash2(x,z)*3),v2.set(1,1,1)),false);});}
for(const a of [0,Math.PI/2])instanced(new THREE.PlaneGeometry(.26,.44),bladeMat,grassCells,([x,z],i,m)=>m.compose(v1.set(x+.25+hash2(x,z)*.5,groundAt(x,z)+.22,z+.25+hash2(z,x)*.5),qY(a+hash2(x,z)),v2.set(1,1,1)),false);
instanced(BOX,new THREE.MeshLambertMaterial({color:0x9a3a2a}),mushCells,([x,z],i,m)=>m.compose(v1.set(x+.5,groundAt(x,z)+.1,z+.5),q0,v2.set(.14,.06,.14)),false);
// houses: plank walls, door, gabled roof
const roofMat=lam(T.p[2],{color:0x8a5a3a}),wallMat=lam(T.p[0],{color:0xc8b8a0}),doorMat=new THREE.MeshLambertMaterial({color:0x3a2416});
const houseMeshes=[];
// a plank door in a frame: the leaf hangs on a hinge pivot so it can swing open
const doorWood=[0x8a6040,0x7a5436,0x94683f].map(c=>lam(T.p[1],{color:c})),frameMat=lam(T.bark,{color:0x7a6450}),ironMat=new THREE.MeshLambertMaterial({color:0x2c2c30}),brass=new THREE.MeshLambertMaterial({color:0xc8a040});
function makeDoor(w=.64,h=.95){const g=new THREE.Group(),B=(m,x,y,z,sx,sy,sz,p=g)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o;};
  for(const s of [-1,1])B(frameMat,s*(w/2+.06),(h+.12)/2,0,.12,h+.12,.16);B(frameMat,0,h+.1,0,w+.36,.12,.18);B(lam(T.stone),0,.02,.08,w+.2,.04,.2);
  const pivot=new THREE.Group();pivot.position.set(-w/2,0,.02);g.add(pivot);
  for(let i=0;i<3;i++)B(doorWood[i],w/6+i*w/3,h/2,0,w/3-.012,h,.06,pivot);
  for(const y of [.2,h-.2]){B(ironMat,w/2,y,.035,w-.02,.05,.012,pivot);B(ironMat,.06,y,.04,.12,.08,.02,pivot);}
  B(brass,w-.1,h*.5,.05,.04,.1,.03,pivot);B(brass,w-.1,h*.5-.06,.06,.08,.03,.03,pivot);
  return {g,pivot};}
function swing(d,open,ms=420){const from=d.pivot.rotation.y,to=open?1.45:0;return tween(ms,k=>d.pivot.rotation.y=from+(to-from)*k);}
// each building has its own look: walls, roof, height and the signs of its trade
const HSTYLE={tavern:{wall:lam(T.p[0],{color:0xd8c0a0}),roof:lam(T.cobble,{color:0xb8503a}),h:1.9,base:true},forge:{wall:lam(T.wall,{color:0x9a948c}),roof:lam(T.stone,{color:0x5a6478}),h:1.5,alongX:true},
  home:{wall:lam(T.p[0],{color:0xc0b098}),roof:lam(T.leaves,{color:0xd8b860}),h:1.3},hall:{wall:lam(T.p[0],{color:0xe8dcc4}),roof:lam(T.stone,{color:0x3a4a6a}),h:1.8,base:true},
  barn:{wall:lam(T.p[1],{color:0x9a3a2a}),roof:lam(T.p[2],{color:0x6a4a30}),h:1.7,alongX:true},herb:{wall:lam(T.p[1],{color:0x8a7a5a}),roof:lam(T.moss||T.leaves,{color:0x6a8a4a}),h:1.2}};
HOUSES.forEach(([hx,hz,hw,hd],hi)=>{const g=new THREE.Group(),y=.3,type=HOUSE_INFO[hi][0],S=HSTYLE[type],H_=S.h;g.userData.house=hi;houseMeshes.push(g);
  const B=(m,x,yy,z,sx,sy,sz,rx=0)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(x,yy,z);o.rotation.x=rx;o.castShadow=o.receiveShadow=true;g.add(o);return o;};
  const cx=hx+hw/2,cz=hz+hd/2,front=hz+hd,dx=hx+Math.floor(hw/2)+.5;
  B(S.wall,cx,y+H_/2,cz,hw-.1,H_,hd-.1);
  if(S.base)B(lam(T.wall,{color:0x8a847c}),cx,y+.18,cz,hw+.04,.36,hd+.04); // a stone plinth for the big buildings
  roofOn(g,S.roof,hx,hz,hw,hd,y+H_+.32,!!S.alongX);
  // corner posts and a beam under the eaves give the walls a frame
  for(const[x,z]of[[hx+.1,hz+.1],[hx+hw-.1,hz+.1],[hx+.1,front-.1],[hx+hw-.1,front-.1]])B(lam(T.bark),x,y+H_/2,z,.16,H_,.16);
  B(lam(T.bark),cx,y+H_-.05,front-.02,hw-.1,.12,.1);
  const dr=makeDoor(type==='barn'?1.3:.64,type==='barn'?1.2:.95);dr.g.position.set(dx,y,front-.04);g.add(dr.g);g.userData.door=dr;
  B(lam(T.stone),dx,y+.03,front+.2,.8,.06,.4);
  const win=new THREE.MeshBasicMaterial({color:0xffc66a});for(let k=1;k<Math.floor(hw/2.5);k++)for(const sg of [-1,1]){const x=cx+sg*k*2.2;if(Math.abs(x-dx)<1||x<hx+.6||x>hx+hw-.6)continue;const o=new THREE.Mesh(BOX,win);o.scale.set(.4,.32,.05);o.position.set(x,y+H_*.62,front);g.add(o);}
  {const chx=hx+hw-1.2,chz=hz+hd*.3,tall=type==='forge'?1.5:.9;B(lam(T.wall,{color:0x9a948a}),chx,y+H_+.6+tall/2-.3,chz,type==='forge'?.7:.4,tall,type==='forge'?.7:.4);g.userData.chimney=new THREE.Vector3(chx,y+H_+.6+tall,chz);}
  if(type==='tavern'){ // a hanging sign with a painted mug, lanterns by the door, barrels outside
    const sx=dx+1.6;B(lam(T.bark),sx,y+1.1,front+.5,.1,2.2,.1);B(lam(T.bark),sx-.3,y+2.15,front+.5,.7,.08,.08);
    B(lam(T.p[1],{color:0x6a4a2a}),sx-.45,y+1.75,front+.5,.62,.5,.06);B(new THREE.MeshLambertMaterial({color:0xd8a040}),sx-.45,y+1.75,front+.535,.22,.26,.02);B(new THREE.MeshLambertMaterial({color:0xf0e8d0}),sx-.45,y+1.9,front+.54,.24,.06,.02);
    for(const sg of [-1,1])B(new THREE.MeshBasicMaterial({color:0xffc86a}),dx+sg*.7,y+1.3,front+.06,.12,.16,.1);
    for(const sg of [-1,1]){B(lam(T.p[1],{color:0x8a6a4a}),dx+sg*2.6,y+.3,front+.45,.5,.6,.5);}}
  if(type==='forge'){B(lam(T.wall,{color:0x3a3a3e}),dx+2.2,y+.25,front+.6,.5,.5,.35);B(lam(T.wall,{color:0x2a2a2e}),dx+2.2,y+.55,front+.6,.8,.12,.3); // anvil
    B(new THREE.MeshBasicMaterial({color:0xff7a2a}),hx+.8,y+.5,front+.05,.6,.4,.04);} // the glow of the furnace through a hatch
  if(type==='hall'){for(const sg of [-1,1]){B(lam(T.bark),dx+sg*1.4,y+1.2,front+.05,.06,1.2,.06);B(new THREE.MeshLambertMaterial({color:0x2a4a8a}),dx+sg*1.4,y+1.35,front+.08,.4,.8,.02);B(new THREE.MeshLambertMaterial({color:0xd8b04a}),dx+sg*1.4,y+1.4,front+.095,.14,.14,.01);}}
  if(type==='barn'){for(let k=0;k<3;k++)B(lam(T.p[1],{color:0xc8b070}),hx+hw-.8,y+.25+k*.42,front+.5,.7,.4,.6);} // hay bales
  if(type==='herb'){for(let k=0;k<4;k++)B(new THREE.MeshLambertMaterial({color:[0x5a8a3a,0x8a6a9a,0xb8a040,0x4a7a4a][k]}),hx+1+k*.5,y+H_-.25,front+.12,.12,.3,.08);} // bunches drying under the eaves
  scene.add(g);});
// generated houses: the same plank house, its door shut; a richer place gets lighter walls
const wallRich=lam(T.p[0],{color:0xe0d4bc}),wallPoor=lam(T.p[1],{color:0x8a7a64}),roofPoor=lam(T.p[2],{color:0x6a5040});
// roofs differ: red tiles, blue-grey slate, wooden shingles, golden thatch, mossy turf; ridges run either way.
// Rich houses get tiles or slate, poor ones thatch or turf. Every door opens onto the house's own room.
const ROOF={tiles:lam(T.cobble,{color:0xb8503a}),slate:lam(T.stone,{color:0x5a6478}),shingle:lam(T.p[2],{color:0x8a5a3a}),thatch:lam(T.leaves,{color:0xd8b860}),turf:lam(T.moss||T.leaves,{color:0x6a8a4a})};
function roofOn(g,mat,x0,z0,w,d,top,alongX){const B=(sx,sz,px,pz,rx,rz)=>{const r=new THREE.Mesh(BOX,mat);r.scale.set(sx,.12,sz);r.position.set(px,top,pz);r.rotation.set(rx,0,rz);r.castShadow=true;g.add(r);};
  if(alongX)for(const sg of[-1,1])B(w/2+.35,d+.3,x0+w/2+sg*w/4,z0+d/2,0,-sg*.55);else for(const sg of[-1,1])B(w+.3,d/2+.35,x0+w/2,z0+d/2+sg*d/4,sg*.55,0);}
// a house built in a streamed chunk joins the pickable houses while it stands
function liveHouse(g){houseMeshes.push(g);g.userData.lists=[houseMeshes];return g;}
for(const h of GEN_HOUSES){const [hx,hz,hw,hd,p]=h;defer(chunkKey(hx,hz),()=>{const g=new THREE.Group(),y=groundAt(hx,hz),rich=p.type==='capital'||p.wealth>=3,poor=p.wealth<=1&&p.type!=='capital',hh=hash2(hx*3,hz*5);
  g.userData.house=h.room.i;
  const wh=rich?1.6:1.3,w=new THREE.Mesh(BOX,rich?wallRich:poor?wallPoor:wallMat);w.scale.set(hw-.1,wh,hd-.1);w.position.set(hx+hw/2,y+wh/2,hz+hd/2);w.castShadow=w.receiveShadow=true;g.add(w);
  for(const[x,z]of[[hx+.1,hz+.1],[hx+hw-.1,hz+.1],[hx+.1,hz+hd-.1],[hx+hw-.1,hz+hd-.1]]){const c=new THREE.Mesh(BOX,lam(T.bark));c.scale.set(.16,wh,.16);c.position.set(x,y+wh/2,z);g.add(c);}
  const kind=rich?(hh<.5?'tiles':'slate'):poor?(hh<.5?'thatch':'turf'):['shingle','tiles','thatch'][Math.floor(hh*3)];roofOn(g,ROOF[kind],hx,hz,hw,hd,y+wh+.32,hash2(hz,hx)<.5);
  const dr=makeDoor();dr.g.position.set(hx+Math.floor(hw/2)+.5,y,hz+hd-.04);g.add(dr.g);g.userData.door=dr;
  // a shop hangs a painted board by its door: an anvil, a loaf or a sack
  if(h.room.shop){const sx=hx+Math.floor(hw/2)+1.4,sz=hz+hd+.05,P=(m,x,yy,z,w,hh,d)=>{const b=new THREE.Mesh(BOX,m);b.scale.set(w,hh,d);b.position.set(x,yy,z);b.castShadow=true;g.add(b);};
    P(lam(T.bark),sx,y+.9,sz,.1,1.8,.1);P(lam(T.bark),sx-.25,y+1.72,sz,.6,.08,.08);P(lam(T.p[1],{color:0x8a6a4a}),sx-.35,y+1.42,sz,.5,.4,.05);
    P(new THREE.MeshLambertMaterial({color:{smith:0x4a4e56,baker:0xc89048,store:0x9a7a4a}[h.room.shop]}),sx-.35,y+1.42,sz+.03,.3,.2,.02);}
  if(!poor)for(const sg of[-1,1]){const win=new THREE.Mesh(BOX,new THREE.MeshBasicMaterial({color:0xffc66a}));win.scale.set(.4,.32,.05);win.position.set(hx+hw/2+sg*(hw/2-1.1),y+wh*.62,hz+hd);g.add(win);}
  if(hash2(hx,hz*7)<.6){const ch=new THREE.Mesh(BOX,lam(T.wall,{color:0x9a948a}));ch.scale.set(.4,.9,.4);ch.position.set(hx+hw-1.2,y+wh+.9,hz+hd*.3);ch.castShadow=true;g.add(ch);}
  scene.add(g);return liveHouse(g);});}
// the royal castle: a curtain wall with battlements round a paved court, round corner towers, a gatehouse
// with two towers, and the great keep with its own towers, roofs, windows and banners
for(const [px,pz,pw,pd] of PALACE)defer(chunkKey(px+pw/2,pz+pd/2),()=>{const g=new THREE.Group(),y=groundAt(px+pw/2,pz+pd/2),stone=lam(T.wall,{color:0xc0baae}),dark=lam(T.wall,{color:0x8a847a}),roofM=lam(T.p[2],{color:0x34467a}),gold=new THREE.MeshLambertMaterial({color:0xd8b04a}),red=new THREE.MeshLambertMaterial({color:0x8e2a24}),glow=new THREE.MeshBasicMaterial({color:0xffc66a});
  const B=(m,x,yy,z,sx,sy,sz)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(x,yy,z);o.castShadow=o.receiveShadow=true;g.add(o);return o;};
  const wh=3.6,t=1.2,x0=px,x1=px+pw,z0=pz,z1=pz+pd,cx=(x0+x1)/2;
  B(lam(T.cobble),cx,y+.32,(z0+z1)/2,pw-2,.04,pd-2); // the court
  const wall=(ax,az,bx,bz)=>{const len=Math.hypot(bx-ax,bz-az),hor=az===bz;B(stone,(ax+bx)/2,y+wh/2,(az+bz)/2,hor?len:t,wh,hor?t:len);
    for(let k=.5;k<len;k+=1.2){const x=hor?ax+k:ax,z=hor?az:az+k;B(dark,x,y+wh+.25,z,hor?.6:t+.05,.5,hor?t+.05:.6);}};
  wall(x0+1,z0+.6,x1-1,z0+.6);wall(x0+.6,z0+1,x0+.6,z1-1);wall(x1-.6,z0+1,x1-.6,z1-1);wall(x0+1,z1-.6,cx-2.4,z1-.6);wall(cx+2.4,z1-.6,x1-1,z1-.6);
  const tower=(x,z,r,h)=>{B(stone,x,y+h/2,z,r,h,r);B(dark,x,y+h+.2,z,r+.3,.4,r+.3);B(roofM,x,y+h+.8,z,r+.2,.8,r+.2);B(roofM,x,y+h+1.5,z,r*.65,.7,r*.65);B(roofM,x,y+h+2.1,z,r*.3,.6,r*.3);
    B(glow,x,y+h*.7,z+r/2+.01,.3,.4,.02);};
  for(const[x,z]of[[x0+1,z0+1],[x1-1,z0+1],[x0+1,z1-1],[x1-1,z1-1]])tower(x,z,2.6,5.4);
  for(const sg of[-1,1])tower(cx+sg*2.6,z1-.8,2.2,5); // the gatehouse
  {const dr=makeDoor(1.4,2.2);dr.g.position.set(px+Math.floor(pw/2)+.5,y,z1-.5);g.add(dr.g);g.userData.door=dr;}B(dark,cx,y+2.8,z1-.55,3,.4,.6);
  // the keep at the back of the court
  const kz=z0+5.5;B(stone,cx,y+3.5,kz,12,7,7);B(roofM,cx,y+7.6,kz,12.6,1.2,7.6);B(roofM,cx,y+8.6,kz,9,1,5);
  for(const sg of[-1,1])tower(cx+sg*6.4,kz+.5,2.4,8.5);
  for(let k=-2;k<=2;k++)for(const yy of[2.2,4.6])B(glow,cx+k*2,y+yy,kz+3.51,.4,.6,.02);
  B(lam(T.bark),cx,y+1.3,kz+3.55,1.6,2.4,.12);
  for(const sg of[-1,1]){B(lam(T.bark),cx+sg*3.6,y+3.2,z1+.05,.08,2.2,.08);B(red,cx+sg*3.6,y+3.4,z1+.1,.7,1.6,.03);B(gold,cx+sg*3.6,y+3.6,z1+.12,.26,.26,.01);}
  B(lam(T.bark),cx,y+11.3,kz,.1,2.6,.1);B(red,cx+.5,y+12.2,kz,.9,.6,.03);
  g.userData.house=PALACE[0].room.i;scene.add(g);return liveHouse(g);});
// ruin walls of the old fort
instanced(BOX,lam(T.wall),(()=>{const o=[];for(const p of GPL)if(p.type==='ruins')for(let z=p.z-p.r-1;z<=p.z+p.r+1;z++)for(let x=p.x-p.r-1;x<=p.x+p.r+1;x++)if(at(x,z)==='W')o.push([x,z]);return o;})(),
  ([x,z],i,m)=>{const h=.5+hash2(x,z)*1.4;m.compose(v1.set(x+.5,groundAt(x,z)+h/2,z+.5),q0,v2.set(1,h,1))});
// bandit camps: two lean-to tents and a fire pit
for(const p of GPL.filter(p=>p.type==='bandits')){const tentM=lam(T.p[1],{color:0x6a5a44});
  for(const [dx,dz] of [[-2,-1],[2,-1]]){const x=p.x+dx,z=p.z+dz;if(!['D','G'].includes(at(x,z)))continue;blockCell(x,z);
    defer(chunkKey(x,z),()=>[-1,1].map(sg=>{const m=new THREE.Mesh(BOX,tentM);m.scale.set(1.3,.08,.8);m.position.set(x+.5,groundAt(x,z)+.42,z+.5+sg*.26);m.rotation.x=sg*.9;m.castShadow=true;scene.add(m);return m;}));}}
// ruin walls (varying heights) and gravestones
instanced(BOX,lam(T.wall),RW.filter(([x,z])=>at(x,z)==='W'),([x,z],i,m)=>{const h=.4+hash2(x,z)*1.2;m.compose(v1.set(x+.5,.3+h/2,z+.5),q0,v2.set(1,h,1))});
const graves=[];for(let z=Z.grave[1]-3;z<=Z.grave[1]+3;z+=2)for(let x=Z.grave[0]-4;x<=Z.grave[0]+4;x+=2)if(at(x,z)==='G'&&hash2(x,z)<.8){graves.push([x,z]);blockCell(x,z);}
instanced(BOX,lam(T.wall,{color:0xa0a4a8}),graves,([x,z],i,m)=>m.compose(v1.set(x+.5,groundAt(x,z)+.3,z+.5),qY((hash2(x,z)-.5)*.3),v2.set(.5,.6,.14)));
// village well, crates, barrels, market stall
function solidBox(x,z,w,h,d,mat,y0){const m=new THREE.Mesh(BOX,mat);m.scale.set(w,h,d);m.position.set(x+.5,(y0??groundAt(x,z))+h/2,z+.5);m.castShadow=m.receiveShadow=true;scene.add(m);blockCell(x,z);return m;}
const OUT=[];
// village well: a ring of stones round dark water, two posts, a little roof and a bucket on a rope
{const g=new THREE.Group(),[wx,wz]=Z.village,y0=groundAt(wx,wz),stoneM=lam(T.wall,{color:0xb0aaa0}),M=[];blockCell(wx,wz);
 const B=(m,x,y,z,sx,sy,sz,ry=0)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(x,y,z);o.rotation.y=ry;o.castShadow=o.receiveShadow=true;g.add(o);M.push(o);return o;};
 for(let i=0;i<10;i++){const a=i/10*Math.PI*2;B(stoneM,Math.cos(a)*.36,.21,Math.sin(a)*.36,.25,.42,.16,-a+Math.PI/2);}
 const wtr=new THREE.Mesh(new THREE.CircleGeometry(.3,12),new THREE.MeshBasicMaterial({color:0x16222c}));wtr.rotation.x=-Math.PI/2;wtr.position.y=.3;g.add(wtr);M.push(wtr);
 for(const s of [-1,1])B(lam(T.bark),s*.46,.6,0,.08,1.2,.08);B(lam(T.bark),0,1.1,0,1.02,.07,.07);
 for(const s of [-1,1]){const r=B(lam(T.p[1],{color:0x8a5a3a}),0,1.3,s*.17,1.2,.05,.44);r.rotation.x=s*.62;}
 B(new THREE.MeshLambertMaterial({color:0xc8b088}),0,.88,0,.015,.4,.015);const bk=B(lam(T.p[1],{color:0x6a4a30}),0,.62,0,.16,.14,.16);B(ironMat,0,.66,0,.17,.03,.17);
 g.position.set(wx+.5,y0,wz+.5);scene.add(g);OUT.push([M,'Колодец','Глубокий. Внизу блестит вода и, кажется, чья-то монетка.']);}
[[22,28],[22,29],[30,32],[17,31],[35,30]].forEach(([x,z],i)=>OUT.push([[solidBox(x,z,.45,.45,.45,lam(T.crate))],'Ящик',i===2?'Среди соломы — пара гладких камней.':'Пустой ящик из-под рыбы.',i===2?[['stone',2]]:null]));
// boat at the dock
{const g=new THREE.Group(),hull=lam(T.p[1],{color:0x8a6a4a});for(const [x,w] of [[0,1.6],[0,1.8]]){const m=new THREE.Mesh(BOX,hull);m.scale.set(w,.25,.8);m.position.set(1.6,.2,Z.dock[1]-1.2);g.add(m);}scene.add(g);}

// ---------- lights: moon + a few warm points ----------
const hemi=new THREE.HemisphereLight(0x6a7fa0,0x2a2018,.75);scene.add(hemi);
const moon=new THREE.DirectionalLight(0x9fb4d8,.6);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);Object.assign(moon.shadow.camera,{left:-11,right:11,top:11,bottom:-11});scene.add(moon,moon.target);
scene.fog=new THREE.FogExp2(0x0d1418,.05);scene.background=new THREE.Color(0x0d1418);
const torches=[];
function torch(x,z,fire=false){blockCell(x,z);const g=new THREE.Group(),y=groundAt(x,z);
  if(!fire){const post=new THREE.Mesh(BOX,lam(T.bark));post.scale.set(.08,.7,.08);post.position.y=.35;g.add(post);}
  else for(let i=0;i<6;i++){const a=i/6*6.28,s=new THREE.Mesh(BOX,lam(T.wall));s.scale.set(.14,.1,.12);s.position.set(Math.cos(a)*.27,.05,Math.sin(a)*.27);g.add(s);}
  const fl=new THREE.Mesh(BOX,new THREE.MeshBasicMaterial({color:0xffb347}));fl.scale.set(fire?.2:.12,fire?.28:.16,fire?.2:.12);fl.position.y=fire?.18:.78;g.add(fl);
  g.position.set(x+.5,y,z+.5);scene.add(g);const T_={fl,g,ph:hash2(x,z)*9,base:fire?3.2:2.4,dist:fire?8:6.5,pos:new THREE.Vector3(x+.5,y+(fire?.6:.95),z+.5)};torches.push(T_);return T_;}
// Only three real lights exist; each frame they move to the fires nearest the hero.
const LIGHTS=[0,1,2].map(()=>{const L=new THREE.PointLight(0xff9a40,0,6,1.6);scene.add(L);return L;});
torch(23,27);torch(30,33);torch(Z.dock[0]+3,Z.dock[1]-1);torch(Z.camp[0],Z.camp[1],true);torch(Z.hunter[0],Z.hunter[1],true);for(const p of GEN.places)if(p.type==='bandits')torch(p.x,p.z,true);
// the chapel brazier in the ruins starts cold: relighting it is the end of the prologue
const chapel=torch(Z.ruins[0],Z.ruins[1],true);chapel.lit=false;chapel.fl.visible=false;
function setChapel(lit){chapel.lit=lit;chapel.fl.visible=lit;chapel.base=lit?4:0;}
{const g=chapel.g,st=lam(T.wall,{color:0x8a8478});for(const [x,z,h] of [[-.55,-.35,.5],[.55,-.35,.5]]){const p=new THREE.Mesh(BOX,st);p.scale.set(.16,h,.16);p.position.set(x,h/2,z);g.add(p);}
  const lin=new THREE.Mesh(BOX,st);lin.scale.set(1.3,.12,.18);lin.position.set(0,.52,-.35);g.add(lin);}
// fireflies + mist follow the camera
// fireflies at night, butterflies by day (same pool, different look)
const FFLY=new THREE.MeshBasicMaterial({color:0xd8f59a}),BFLY=[0xe8c84a,0xf0f0f8,0xd88ab0,0x8ac0e8].map(c=>new THREE.MeshLambertMaterial({color:c,side:THREE.DoubleSide}));
// chimney smoke: a few soft puffs per house near the hero
const puffMat=new THREE.MeshBasicMaterial({map:T.smoke,transparent:true,depthWrite:false,opacity:.5}),puffs=[];
function smokeTick(dt,t){for(const g of houseMeshes){const c=g.userData.chimney;if(!c||c.distanceToSquared(focus)>400)continue;
  if(Math.random()<dt*2.2){let p=puffs.find(p=>!p.visible);if(!p&&puffs.length<60){p=new THREE.Mesh(new THREE.PlaneGeometry(.35,.35),puffMat.clone());scene.add(p);puffs.push(p);}
    if(p){p.visible=true;p.position.copy(c);p.userData={life:0,dx:(Math.random()-.5)*.2};}}}
  for(const p of puffs){if(!p.visible)continue;const u=p.userData;u.life+=dt;p.position.y+=dt*.45;p.position.x+=dt*(.25+u.dx);p.scale.setScalar(1+u.life*.9);p.quaternion.copy(camera.quaternion);
    p.material.opacity=.32*Math.max(0,1-u.life/3.2)*(1-.65*nightness());p.material.color.setScalar(1-.5*nightness());if(u.life>3.2)p.visible=false;}}
const flies=[];for(let i=0;i<22;i++){const f=new THREE.Mesh(box(.04,.04,.04),new THREE.MeshBasicMaterial({color:0xd8f59a}));f.userData={ox:(hash2(i,1)-.5)*16,oz:(hash2(i,2)-.5)*12,ph:hash2(i,3)*9,c:i%4};scene.add(f);flies.push(f);}
{RIG}
{INTERIORS}

// ---------- characters ----------
const hero=buildModel(MODELS['fighter-male']);scene.add(hero);setHeld(hero,'L','shield');setHeld(hero,'R','sword');
const actors=[],enemies=[];
function actor(model,x,z,o={}){for(let r=1;!free(x,z)&&r<5;r++){const c=[];for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(free(x+dx,z+dz))c.push([x+dx,z+dz]);if(c.length){[x,z]=c[0];if(o.home)o.home=[x,z];}}const m=(isQuad(MODELS[model])?buildQuad:buildModel)(MODELS[model]);o.model=model;if(o.scale)m.scale.setScalar(o.scale);scene.add(m);
  const a=Object.assign({o:m,x,z,px:x+.5,pz:z+.5,face:hash2(x,z)*6,ph:hash2(z,x)*9,spd:1.8,home:[x,z]},o);actors.push(a);return a;}
const H0={o:hero,x:Z.dock[0]+1,z:Z.dock[1],face:Math.PI/2,ph:0,spd:2.4,hp:20,max:20,ac:15,name:'Эльдар'};H0.px=H0.x+.5;H0.pz=H0.z+.5;actors.push(H0);
const tint=(a,c)=>{a.o.userData.mats.forEach(m=>m.color.setHex(c));return a;};
const RM=t=>ROOMS.find(r=>r.type===t);
actor('innkeeper',RM('tavern').ox+3,RM('tavern').oz+2,{wander:1,spd:1.2,npc:'Трактирщик Брам',talkId:'bram',act:'wipe',home:[RM('tavern').ox+3,RM('tavern').oz+2]});
tint(actor('innkeeper',RM('forge').ox+4,RM('forge').oz+4,{wander:0,spd:1.1,npc:'Кузнец Горан',talkId:'smith',act:'hammer',face:Math.PI}),0x9a8a80);
tint(actor('innkeeper',RM('herb').ox+3,RM('herb').oz+2,{wander:0,spd:1.1,npc:'Травница Ивва',talkId:'herb',act:'stir',face:-Math.PI/2}),0xa0c0a0);
actor('innkeeper',Z.village[0]-3,Z.village[1]+2,{wander:4,spd:1.3,npc:'Мельник Тодор',talkId:'miller'});
tint(actor('innkeeper',Z.dock[0]+2,Z.dock[1]+1,{wander:1,spd:1,npc:'Рыбак Олав',talkId:'fisher'}),0x90a8c0);
const FOE={
  bandit:{name:'Разбойник',hp:11,ac:12,atk:3,dmg:6,dmgB:1,atkName:'Сабля',speed:6,perc:10,dex:1,wis:0,ath:2},
  goblin:{name:'Гоблин',hp:7,ac:15,atk:4,dmg:6,dmgB:2,atkName:'Короткий лук',range:6,speed:6,perc:9,dex:2,wis:-1,ath:-1,spd:2.6},
  skeleton:{name:'Скелет',hp:13,ac:13,atk:4,dmg:6,dmgB:2,atkName:'Ржавый меч',speed:6,perc:9,dex:2,wis:-1,ath:0},
  boar:{name:'Кабан',hp:11,ac:11,atk:3,dmg:6,dmgK:1,dmgB:1,atkName:'Клыки',speed:8,perc:9,dex:0,wis:-1,ath:3,spd:2.4},
  bear:{name:'Медведь',hp:19,ac:11,atk:4,dmg:4,dmgK:2,dmgB:2,atkName:'Когти',speed:8,perc:13,dex:0,wis:1,ath:4,spd:2.2},
  wolf:{name:'Волк',hp:11,ac:13,atk:4,dmg:4,dmgK:2,dmgB:2,atkName:'Укус',speed:8,perc:13,dex:2,wis:1,ath:1,spd:2.8}};
function foe(model,x,z,o){o=Object.assign({},FOE[model],{max:FOE[model].hp},o);const a=actor(model,x,z,Object.assign({enemy:true,wander:3,spd:2.2,cd:0},o));enemies.push(a);
  if(model==='bandit')setHeld(a.o,'R',['dagger_curved','sword_scimitar','axe_hand'][enemies.length%3]);return a;}
foe('bandit',Z.camp[0]+1,Z.camp[1]-1);foe('bandit',Z.camp[0]-1,Z.camp[1]+1);
foe('goblin',Z.forest[0]-4,Z.forest[1]-6);foe('goblin',Z.hunter[0]+3,Z.hunter[1]-2);
foe('skeleton',Z.ruins[0]-2,Z.ruins[1]+1);foe('skeleton',Z.ruins[0]+2,Z.ruins[1]-1);foe('skeleton',Z.grave[0],Z.grave[1]+1);
foe('wolf',Z.forest[0]+3,Z.forest[1]-2,{wander:4});foe('wolf',Z.forest[0]+5,Z.forest[1]-1,{wander:4});
// the big island's camps and lairs (added after the old ones, so saved kills keep their places)
for(const p of GPL){if(p.type==='bandits'){foe('bandit',p.x+1,p.z+1);foe('bandit',p.x-1,p.z+1);}if(p.type==='boars'){foe('boar',p.x,p.z,{wander:4});foe('boar',p.x+2,p.z-1,{wander:4});}if(p.type==='bear')foe('bear',p.x,p.z,{wander:3});if(p.type==='wolves'){foe('wolf',p.x,p.z,{wander:5});foe('wolf',p.x+2,p.z+1,{wander:5});foe('wolf',p.x-1,p.z+2,{wander:5});}}
// enemy health bars: shown once a fight starts
const barBg=new THREE.MeshBasicMaterial({color:0x14100c,depthTest:false}),barFg=new THREE.MeshBasicMaterial({color:0xd23a30,depthTest:false});
function addBar(e){const g=new THREE.Group(),bg=new THREE.Mesh(box(.62,.1,.01),barBg),fg=new THREE.Mesh(box(.56,.06,.01),barFg);fg.position.z=.01;bg.renderOrder=fg.renderOrder=9;g.add(bg,fg);g.visible=false;scene.add(g);e.bar={g,fg};}
for(const e of enemies)addBar(e);
for(const a of actors){a.px=a.x+.5;a.pz=a.z+.5;}

// ---------- walking ----------
// outside a fight the hero slips past friendly folk, so a crowd can never shut him in; enemies always block
const occupied=(x,z,self)=>actors.some(a=>a!==self&&!a.dead&&!a.hidden&&a.x===x&&a.z===z&&!(self===H0&&!CB.on&&!a.enemy));
function path(sx,sz,tx,tz,self,adjacent=false,limit=900){const key=(x,z)=>x+','+z,prev=new Map([[key(sx,sz),null]]),q=[[sx,sz]];let end=null;
  while(q.length&&prev.size<limit){const[x,z]=q.shift();if(adjacent?Math.abs(x-tx)+Math.abs(z-tz)===1:(x===tx&&z===tz)){end=[x,z];break;}
    for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!free(nx,nz)||occupied(nx,nz,self)||prev.has(key(nx,nz)))continue;prev.set(key(nx,nz),[x,z]);q.push([nx,nz])}}
  if(!end)return null;const out=[];let c=end;while(c){out.unshift(c);c=prev.get(key(c[0],c[1]))}return out.slice(1)}
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();
const adj=(a,x,z)=>Math.abs(a.x-x)+Math.abs(a.z-z)===1;
// walk next to (or onto) a target cell, then run the action
function goDo(x,z,onto,fn){if(onto?(H0.x===x&&H0.z===z):adj(H0,x,z)){H0.route=null;fn();return;}
  const p=path(H0.x,H0.z,x,z,H0,!onto,3000);if(p&&p.length){H0.route=p;H0.dest=onto?[x,z]:p[p.length-1];H0.arrive=fn;}else hint.textContent='Не найти дорогу туда.';}
function tapActor(a){if(a===H0)return heroWheel();if(a.enemy)return enemyWheel(a);if(a.npc)return npcWheel(a);}
const marker=new THREE.Group();{const ringM=new THREE.MeshBasicMaterial({color:0xf2c14e,transparent:true,opacity:.85,depthWrite:false});
  const ring=new THREE.Mesh(new THREE.RingGeometry(.26,.36,20),ringM);ring.rotation.x=-Math.PI/2;marker.add(ring);
  const dot=new THREE.Mesh(new THREE.CircleGeometry(.08,10),ringM);dot.rotation.x=-Math.PI/2;marker.add(dot);marker.visible=false;marker.renderOrder=3;scene.add(marker);}
function ripple(p,bad){const m=new THREE.Mesh(new THREE.RingGeometry(.1,.16,20),new THREE.MeshBasicMaterial({color:bad?0xff5a4a:0xffffff,transparent:true,opacity:.9,depthWrite:false}));
  m.rotation.x=-Math.PI/2;m.position.set(p.x,p.y+.03,p.z);m.renderOrder=4;scene.add(m);tween(420,k=>{m.scale.setScalar(1+k*3);m.material.opacity=.9*(1-k)}).then(()=>{scene.remove(m);m.geometry.dispose();});}
const shown=m=>{let o=m;while(o){if(!o.visible)return false;o=o.parent;}return true;};
// two fingers zoom the view (the first finger's step is cancelled); the mouse wheel does the same
{const pts=new Map();let pinch=null;
 canvas.addEventListener('pointerdown',e=>{pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size===2){pinch=null;H0.route=null;closeWheel();}},true);
 canvas.addEventListener('pointermove',e=>{if(!pts.has(e.pointerId))return;pts.set(e.pointerId,[e.clientX,e.clientY]);if(pts.size!==2)return;const[a,b]=[...pts.values()],d=Math.hypot(a[0]-b[0],a[1]-b[1]);
   if(pinch)setView(viewTarget-(d-pinch)/300);pinch=d;});
 const up=e=>{pts.delete(e.pointerId);if(pts.size<2)pinch=null;};canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 canvas.addEventListener('wheel',e=>{e.preventDefault();setView(viewTarget+(e.deltaY>0?.08:-.08));},{passive:false});
 window.multiTouch=()=>pts.size>1;}
canvas.addEventListener('pointerdown',e=>{if(window.multiTouch&&multiTouch())return;if(!wheelEl.hidden){closeWheel();return;}if(H0.dead||busy||paused)return;const r=canvas.getBoundingClientRect();mv.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);
  ray.setFromCamera(mv,camera);H0.arrive=null;
  // characters: potion/bread in hand is used on them; enemies are approached and attacked; villagers talk
  for(const a of actors){if(a.dead||!a.o.visible)continue;if(ray.intersectObject(a.o,true).length){tapActor(a);return;}}
  const rk=room?null:ray.intersectObjects(rockMeshes)[0],gh=ray.intersectObjects(pickable)[0];
  if(rk&&(!gh||rk.distance<=gh.distance+.3)){const [x,z]=rk.object.userData.cells[rk.instanceId];rockWheel(x,z);return;}
  const hits=ray.intersectObjects([...interact.flatMap(i=>[i.mesh,...(i.extra||[])]),...looks.flatMap(l=>l.meshes).filter(shown),...(room?[]:houseMeshes.flatMap(g=>{const a=[];g.traverse(m=>m.isMesh&&a.push(m));return a;})).filter(m=>{let o=m;while(o){if(!o.visible)return false;o=o.parent;}return true;}),...pickable])[0];if(!hits)return;
  const it=interact.find(i=>i.mesh===hits.object||(i.extra&&i.extra.includes(hits.object)));if(it&&CB.on&&!it.fight){hint.textContent='Сначала закончите бой.';return;}if(it&&CB.on){if(!heroTurn())return toast('Сейчас ход противника.');if(CB.acted)return toast('Действие уже потрачено.');it.use();return;}if(it){if(it.far)return it.use();goDo(it.x,it.z,!!it.stand,()=>it.use());return;}
  if(hits.object.userData.look){lookWheel(hits.object.userData.look,hits.object);return;}
  {let o=hits.object;while(o&&o.userData.house==null)o=o.parent;if(o){houseWheel(ROOMS[o.userData.house],hits.object);return;}}
  const [tx,tz]=hits.instanceId!=null&&hits.object.userData.cells?hits.object.userData.cells[hits.instanceId]:[Math.floor(hits.point.x),Math.floor(hits.point.z)];
  const who=actors.find(a=>!a.dead&&a!==H0&&a.x===tx&&a.z===tz);if(who){tapActor(who);return;}
  if(CB.on){if(heroTurn())heroMove(tx,tz);else hint.textContent='Сейчас ход противника.';return;}
  groundTap=performance.now();
  ripple(hits.point,!free(tx,tz));if(!free(tx,tz)){hint.textContent='Туда не пройти.';return;}
  if(at(tx,tz)==='E'){goDo(tx,tz,true,leaveRoom);return;}
  const p=path(H0.x,H0.z,tx,tz,H0,false,3000);if(p&&p.length){H0.route=p;H0.dest=[tx,tz];}else hint.textContent='Не найти дорогу туда.';});
// hold to walk: keep a finger on the ground and the hero follows it; a tap still walks to the spot.
// Holding only steers when the press began on open ground (not on a person, door or chest).
let groundTap=0;const HOLD={id:null,x:0,y:0,t0:0,on:false,last:null,tp:0};
canvas.addEventListener('pointerdown',e=>{if(HOLD.id!=null)return;Object.assign(HOLD,{id:e.pointerId,x:e.clientX,y:e.clientY,t0:performance.now(),on:false,last:null});});
canvas.addEventListener('pointermove',e=>{if(e.pointerId===HOLD.id){HOLD.x=e.clientX;HOLD.y=e.clientY;}});
const holdEnd=e=>{if(e.pointerId===HOLD.id){HOLD.id=null;HOLD.on=false;}};canvas.addEventListener('pointerup',holdEnd);canvas.addEventListener('pointercancel',holdEnd);
function holdTick(){if(HOLD.id==null||CB.on||busy||paused||H0.dead||!wheelEl.hidden||(window.multiTouch&&multiTouch()))return;const now=performance.now();
  if(!HOLD.on){if(now-HOLD.t0<220||groundTap<HOLD.t0)return;HOLD.on=true;}
  const r=canvas.getBoundingClientRect();mv.set((HOLD.x-r.left)/r.width*2-1,-(HOLD.y-r.top)/r.height*2+1);ray.setFromCamera(mv,camera);const h=ray.intersectObjects(pickable)[0];if(!h)return;
  const[tx,tz]=h.instanceId!=null&&h.object.userData.cells?h.object.userData.cells[h.instanceId]:[Math.floor(h.point.x),Math.floor(h.point.z)];
  // the target follows the finger, but the way is re-planned only when it moved a little and not too often, so the walk stays smooth
  if(H0.route&&H0.route.length&&(now-HOLD.tp<350||HOLD.last&&Math.abs(HOLD.last[0]-tx)+Math.abs(HOLD.last[1]-tz)<2))return;HOLD.last=[tx,tz];HOLD.tp=now;if(!free(tx,tz)||tx===H0.x&&tz===H0.z)return;
  const p=path(H0.x,H0.z,tx,tz,H0,false,900);if(p&&p.length){if(H0.route&&H0.route[0]&&p[0]&&(H0.route[0][0]!==p[0][0]||H0.route[0][1]!==p[0][1])&&p.length>1&&p[1][0]===H0.route[0][0]&&p[1][1]===H0.route[0][1])p.shift();H0.route=p;H0.dest=[tx,tz];H0.arrive=null;}}

{COMBAT}
// potion / bread from the hands, used by tapping a character (D&D: potion 2d4+2)
function useConsumable(target){const h=hero.userData.held||{},id=['potion','bread'].find(x=>h.L===x||h.R===x);if(!id||target.enemy)return false;
  if(CB.on){if(!heroTurn()){hint.textContent='Сейчас ход противника.';return true;}if(CB.bonus){hint.textContent='Бонусное действие уже потрачено в этом ходу.';return true;}CB.bonus=true;setTimeout(updateBar,0);}
  if(target!==H0&&Math.abs(target.x-H0.x)+Math.abs(target.z-H0.z)>1){hint.textContent='Подойдите вплотную, чтобы дать предмет.';return true;}
  const heal=id==='potion'?d(4)+d(4)+2:d(4);sfx('heal');if(target===H0){H0.hp=Math.min(H0.max,H0.hp+heal);setHP();}
  floatText('+'+heal,'#7fe08a',target.o);dice.hidden=false;dice.innerHTML=(target===H0?'Вы ':'Вы даёте '+target.npc+' ')+(id==='potion'?'зелье лечения: 2d4+2 = <b>'+heal+'</b>':'хлеб: 1d4 = <b>'+heal+'</b>');
  window.handsConsume&&window.handsConsume(id);return true;}

// ---------- dialogue and quests ----------
const talkEl=document.getElementById('talk'),questEl=document.getElementById('quest');
let typeT=0;
function say(who,text,choices=[]){clearInterval(typeT);talkEl.hidden=false;talkEl.replaceChildren();const h=document.createElement('b');h.className='who';h.textContent=who;
  // every letter is laid out from the start and only fades in, so lines never jump while typing
  const p=document.createElement('p');const chars=[...text].map(c=>{const s=document.createElement('span');s.textContent=c;p.append(s);return s;});talkEl.append(h,p);
  const row=document.createElement('div');row.className='choices';for(const [label,fn] of [...choices,[choices.length?'Не сейчас':'Дальше',null]]){const b=document.createElement('button');b.textContent=label;b.onclick=ev=>{ev.stopPropagation();talkEl.hidden=true;clearInterval(typeT);fn&&fn();};row.append(b);}
  talkEl.append(row);let i=0;const all=()=>{clearInterval(typeT);chars.forEach(s=>s.classList.add('on'));row.classList.add('on');};
  if(reduceM)all();else if(window.TEXT_DELAY===0)all();else typeT=setInterval(()=>{for(let k=0;k<2&&i<chars.length;k++)chars[i++].classList.add('on');if(i>=chars.length)all();},window.TEXT_DELAY||22);
  talkEl.onclick=()=>{if(i<chars.length){i=chars.length;all();}};}
talkEl.addEventListener('pointerdown',e=>e.stopPropagation());
let questFocus=null;
const Q={fire:{state:0,left:1,title:'Разжечь огонь часовни в руинах'},dead:{state:0,need:'Скелет',left:3,title:'Упокоить мертвецов в руинах и на кладбище'},band:{state:0,need:'Разбойник',left:2,title:'Прогнать разбойников из леса'},wolf:{state:0,need:'Волк',left:2,title:'Убить волков, что режут сети'}};
function questUI(){if(tutUI())return;
  if(TUT.step>=0&&Q.dead.state===0&&!Object.values(Q).some(q=>q.state===1||q.state===2)){questEl.hidden=false;questEl.innerHTML='<div class="one">Цель: расспросить Брама о беде острова</div>';return;}const act=Object.values(Q).filter(q=>q.state===1||q.state===2).concat(jobQuests());questEl.hidden=!act.length;
  const rows=act.map(q=>'<div class="'+(q.state===2?'done':'')+'">'+q.title+(q.state===1?(q.job||q.need==='Атаман Ворон'?'':' · осталось '+q.left):(q.job?' · за платой':' · вернитесь за наградой'))+'</div>');
  // folded: one line with the first task and how many there are; tap opens the list
  questEl.innerHTML='<div class="qhead'+(qFolded()?' fold':'')+'" role="button" tabindex="0" aria-expanded="'+!qFolded()+'">Задания · '+act.length+CHEV+'</div>'+(qFolded()?rows.slice(0,1).join('').replace('<div class="','<div class="one '):rows.join(''));
  const h=questEl.querySelector('.qhead');if(h)h.onclick=qToggle;}
function questKill(e){repKill(e);for(const q of Object.values(Q))if(q.need===e.name&&q.left>0&&(!q.at||Math.hypot(e.home[0]-q.at.x,e.home[1]-q.at.z)<14)){q.left--;if(q.left===0&&q.state===1)q.state=2;}questUI();}
function reward(q,items,line,who){q.state=3;gainXP(100);if(q.at)repAdd('kingdom',q.rep||1,'помощь королевству');else repAdd('village',2,'помощь деревне');{const k=Object.keys(Q).find(k=>Q[k]===q);const gg=q.gold||QUEST_GOLD[k];if(gg)setTimeout(()=>addGold(gg,'Награда'),600);}window.handsGive&&window.handsGive(items,'Награда');questUI();say(who,line+' Получено: '+items.map(([id,n])=>window.handsItemName(id).toLowerCase()+' ×'+n).join(', ')+'.');}
function offer(q,who,ask,ok,done,items){if(q.state===3)return say(who,done);
  if(q.state===2)return reward(q,items,ok,who);if(q.state===1)return say(who,'Ну что? '+q.title+' — ещё '+q.left+'.');
  if(q.left===0){q.state=2;return reward(q,items,ok,who);}
  say(who,ask,[['Берусь',()=>{q.state=1;questFocus=q;questUI();say(who,'Да хранит тебя море.');}]]);}
function talk(a){a.face=Math.atan2(H0.px-a.px,H0.pz-a.pz);H0.face=Math.atan2(a.px-H0.px,a.pz-H0.pz);const n=a.npc;
  if(!tutOn()&&jobDeliverTo(a))return;
  // the tutorial's own lines first
  if(tutOn()){const s=TUT.step;
    if(a.talkId==='fisher'&&!TUT.flags.olav){TUT.flags.olav=1;window.handsGive([['fish',1]],'Подарок');return say(n,'Добро пожаловать на Хельгу! Я Олав. Будь другом, отнеси эту рыбу Браму в таверну — он ждёт с утра. Деревня прямо по дороге.');}
    if(a.talkId==='bram'&&s===5){if(window.handsCount('fish'))window.handsConsume('fish');TUT.flags.bram=1;window.handsGive([['bread',1]],'Спасибо');
      return say(n,'Рыба от Олава? Вот спасибо! Слушай, раз уж ты здесь: в амбаре через площадь завелась крыса размером с собаку. Прогонишь — расскажу, что творится на острове.');}
    if(a.talkId==='bram'&&s===7){TUT.flags.bram2=1;repAdd('village',1);window.handsGive([['potion',1]],'Награда');
      return say(n,'Крыса удрала? Значит, рука у тебя крепкая. А теперь о главном: по ночам из руин часовни встают мертвецы. Поговори со мной ещё раз, когда будешь готов.');}
    if(a.talkId==='bram')return say(n,s<5?'Заходи, путник! Кружка эля найдётся.':'Крыса в амбаре, через площадь. Не бойся, она больше шумит, чем кусает.');}
  if(a.talkId==='herb'&&Q.herb.state<3)return herbTalk(n);
  if(a.talkId==='bram'&&Q.dead.state===3){const q=Q.fire;
    if(q.state===0)return say(n,'Мертвецы упокоены, но пока огонь часовни холоден, они вернутся. В моём ящике есть факел — возьми его в руку и разожги жаровню в руинах.',[['Разожгу',()=>{q.state=1;questFocus=q;questUI();}]]);
    if(q.state===1)return say(n,'Жаровня в руинах всё ещё холодная. Факел — в моём ящике с припасами.');
    if(q.state===2){q.state=3;window.handsGive([['potion',2],['sword_rune',1]],'Награда');questUI();banner('Пролог пройден');repAdd('village',2,'огонь часовни');
      if(ART.fate==='kept')return say(n,'Огонь горит, но слабее, чем в старые времена… Что ж, мёртвые спят, и это главное. Держи, ты заслужил.');
      return say(n,'Огонь часовни виден даже отсюда! Хельга снова под защитой. Ты сделал больше, чем мы смели просить. Остров твой дом, путник — заходи, когда захочешь.');}
    return say(n,'Огонь горит. Мёртвые спят. Выпей со мной, герой.');}
  if(a.talkId==='bram')return offer(Q.dead,n,'С тех пор как в часовне погас огонь, мёртвые встают из земли. Трое бродят в руинах и у кладбища. Упокой их — и зелья мои твои.','Тихо стало по ночам. Держи, заслужил — эту булаву освятили ещё в часовне.','Пей, грейся. Мёртвые больше не тревожат.',[['potion',2],['mace_saint',1]]);
  if(a.talkId==='miller')return offer(Q.band,n,'Разбойники в лесном лагере отбирают у меня муку. Двое их. Прогони — хлеба не пожалею.','Вот это дело! Хлеб свежий, бери. И щит возьми — с ним ещё мой дед ходил в дозор.','Мельница снова мелет спокойно.',[['bread',3],['shield_watch',1]]);
  if(a.talkId==='fisher')return offer(Q.wolf,n,'Волки из Тёмного леса спускаются к берегу и рвут сети. Двое самых наглых. Поможешь?','Сети целы! Возьми, это от всей пристани. А из клыка вожака я вырезал тебе нож.','Море спокойно, рыба идёт.',[['potion',1],['dagger_fang',1]]);
  if(a.talkId==='villager')return personTalk(a,n);
  if(a.talkId==='king')return kingTalk(a,n);
  if(a.talkId==='pack')return packTalk(a,n);
  if(a.talkId==='merc')return say(n,'Меч у меня острый, а кошель пустой. За '+a.hire+' монет пойду с тобой куда скажешь и буду драться рядом.');
  if(a.talkId==='ally'&&a.model==='wolf')return say(n,['Клык нюхает воздух и тихо рычит в сторону леса.','Клык толкает вас носом в ладонь.','Клык садится рядом и ждёт.'][(a.said=(a.said||0)+1)%3]);
  if(a.talkId==='ally')return say(n,['Я рядом. Если что — зови.','Втроём на одного не лезь, лучше подманивай по одному.','Устал? Отдохни у костра, я посторожу.'][(a.said=(a.said||0)+1)%3]);
  if(a.talkId==='town')return townTalk(a,n);
  if(a.talkId==='smith')return say(n,'Меч у тебя добрый, но щит держи выше. Лук бьёт на шесть клеток, а с посохом и двумя руками — не до щита.');
  if(a.talkId==='herb'){if(!a.gave){a.gave=1;window.handsGive&&window.handsGive([['potion',1]],'Подарок');return say(n,'Ты бледен. Вот, отвар из болотной мяты — зелье лечения. Когда будет худо, нажми на себя и выбери «Зелье».');}
    return say(n,'Травы любят тишину. Береги себя.');}
  say(n,'Доброй ночи.');}

// ---------- zones ----------
const ZONES=[['dock','Причал',6],['village','Деревня Заводь',10],['ruins','Руины часовни',8],['grave','Старое кладбище',6],['camp','Лагерь разбойников',6],['hunter','Стоянка охотника',5],['forest','Тёмный лес',14]];
let zoneNow='';const zoneEl=document.getElementById('zone');
function zoneCheck(){if(room)return;const z=ZONES.find(([k,,r])=>nearZone(H0.x,H0.z,k,r));const n=z?z[1]:'';if(n&&n!==zoneNow){zoneEl.textContent=n;zoneEl.classList.remove('show');void zoneEl.offsetWidth;zoneEl.classList.add('show');}zoneNow=n;}

// ---------- loop ----------
function resize(){const w=stage.clientWidth,h=stage.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.fov=w/h<1?55:h<460?46:38;camera.updateProjectionMatrix()}
addEventListener('resize',resize);resize();
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;let last=performance.now(),aiT=0;
function step(a,dt){if(!a.route)return 0;
  // cut a corner when both side cells are open: two grid steps become one diagonal step
  if(a.route.length>1){const[n1x,n1z]=a.route[1];if(Math.abs(n1x-a.x)===1&&Math.abs(n1z-a.z)===1&&free(n1x,a.z)&&free(a.x,n1z)&&!occupied(n1x,n1z,a))a.route.shift();}
  const[nx,nz]=a.route[0];
  if(occupied(nx,nz,a)){ // someone stepped in the way: walk around them to the same destination
    const dest=a.dest,p=dest&&path(a.x,a.z,dest[0],dest[1],a,a.arrive&&!(at(dest[0],dest[1])==='E'),3000);a.route=p&&p.length?p:null;if(!a.route)a.arrive=null;return 0;}const tx=nx+.5,tz=nz+.5,dx=tx-a.px,dz=tz-a.pz,dd=Math.hypot(dx,dz);a.face=Math.atan2(dx,dz);
  const s=Math.min(dd,dt*a.spd);if(dd>1e-4){a.px+=dx/dd*s;a.pz+=dz/dd*s;}
  if(dd-s<.05){a.x=nx;a.z=nz;a.px=tx;a.pz=tz;a.route.shift();if(!a.route.length){a.route=null;if(a.arrive){const f=a.arrive;a.arrive=null;f();}}}return 1;}
// can this enemy see the hero? a cone in front, shorter while sneaking; very close and loud always counts
function sees(e){if(room||H0.dead)return false;const dx=H0.px-e.px,dz=H0.pz-e.pz,dist=Math.hypot(dx,dz);
  if(dist>(H0.sneak?3.6*(HERO.sneakK||1):6.5)*(e.model==='bandit'&&repLevel('bandits')===0?1.3:1)*(1-(HERO.night?.5:.25)*nightness()))return false;if(dist<1.6&&!H0.sneak)return true;let ang=Math.atan2(dx,dz)-e.face;ang=Math.atan2(Math.sin(ang),Math.cos(ang));return Math.abs(ang)<1.05;}
function notices(e){if(e.slipUntil>performance.now())return false;if(!sees(e)){e.checked=false;return false;}
  // a goblin slips away once per rest: five seconds unseen and already crouching
  const spotted=()=>{if(RACES[HERO.race]?.slip&&SP.slip){SP.slip=0;e.slipUntil=performance.now()+5000;H0.sneak=true;H0.spd=1.3;floatText('Ускользнул!','#9fe0a0',hero);toast('Гоблин успел скрыться — '+e.name+' вас не заметил. Вы крадётесь.');e.checked=true;return false;}return true;};
  if(!H0.sneak)return spotted();if(e.checked)return false;e.checked=true;
  const sb=HERO.stealth+(HERO.night&&nightness()>.5?2:0),r=d(20),tot=r+sb,ok=tot>=e.perc;dice.hidden=false;dice.innerHTML='Скрытность против '+e.name+': '+r+' + '+sb+' = <b>'+tot+'</b> против '+e.perc+' — '+(ok?'вас не заметили':'<b>замечены!</b>');return ok?false:spotted();}
function ai(){const now=performance.now();
  for(const a of actors){if(a===H0||a.dead)continue;if(a.far&&!a.inFight)continue; // far away the island rests
    if(a.enemy){if(a.inFight)continue;
      if(!a.aware&&!busy&&!a.calm&&notices(a)){a.aware=true;sfx('notice');floatText('!','#ff5a4a',a.o);if(CB.on)joinFight(a);else startCombat(a);continue;}
      if(CB.on)continue;
      if(a.investigate){const I=a.investigate;if(!I.t){if(!a.route){const p=path(a.x,a.z,I.x,I.z,a,true,800);if(p&&p.length>0&&Math.hypot(a.x-I.x,a.z-I.z)>1.5)a.route=p;else I.t=now;}}
        else{if(Math.random()<.4)a.face+=(Math.random()-.5)*2;if(now-I.t>7000){a.investigate=null;const p=path(a.x,a.z,a.home[0],a.home[1],a,false,800);a.route=p&&p.length?p:null;}}continue;}
      if(!a.route&&Math.random()<.12)a.face+=(Math.random()-.5)*2.4;} // idle enemies look around, giving chances to slip behind them
    if(a.villager||a.role==='trav'||a.hidden||a.ally)continue; // the daily routine moves them
    if(!a.route&&!(a.hold>now)&&!waitsForHero(a)&&Math.random()<.2){const tx=a.home[0]+Math.round((Math.random()-.5)*2*a.wander),tz=a.home[1]+Math.round((Math.random()-.5)*2*a.wander);
      if(free(tx,tz)){const p=path(a.x,a.z,tx,tz,a,false,300);a.route=p&&p.length?p:null;}}}}
// life when standing still: villagers work, enemies fidget, the hero gets restless
function idleLife(a,r,b,t){const p=a.ph;if((a.talkId==='town'||a.talkId==='merc')&&!a.route&&a.workAct)a.act=a.workAct;if(a.villager||a.role==='trav'||a.talkId==='town'||a.talkId==='merc')workPose(a,r,b,t);
  if(a.act==='wipe'){r.armL.rotation.set(-1.05,Math.sin(t*3+p)*.15,Math.sin(t*3+p)*.35);b.rotation.x=.12;}
  if(a.act==='hammer'&&!a.route){a.face=Math.PI;const k=(t*1.1+p)%1,up=k<.6?k/.6:1-(k-.6)/.4*1.0,hit=k>.94;r.armL.rotation.set(-.3-1.9*Math.max(0,up),0,.1);b.rotation.x=.1+.06*up;
    if(k<a.hk&&room&&room.type==='forge')sfx('clank');a.hk=k;}
  if(a.act==='stir'&&!a.route){a.face=-Math.PI/2;r.armL.rotation.set(-1.1+Math.sin(t*2.2+p)*.12,0,Math.cos(t*2.2+p)*.35);b.rotation.x=.18;b.rotation.z=Math.sin(t*2.2+p)*.03;}
  if(a.enemy&&!a.inFight){if(a.model==='skeleton'){b.rotation.z=Math.sin(t*9+p)*.02;r.head.rotation.z=Math.sin(t*1.3+p)*.15;}
    if(a.model==='wolf'){r.head.rotation.x=.25+Math.max(0,Math.sin(t*1.6+p))*.35;}
    if(a.model==='bandit'||a.model==='goblin'){r.head.rotation.y=Math.sin(t*.7+p)*.6;}}
  if(a===H0&&!CB.on&&!a.pose&&!a.dead){a.idleT=(a.idleT||0)+.016;if(a.idleT>7){a.idleT=0;heroPose(['stretch','around','shift'][Math.floor(Math.random()*3)],1800);}}
  else if(a===H0)a.idleT=0;}
// short body gestures: looking closely, picking up, opening a chest, drinking
function heroPose(type,ms=1000){H0.pose={type,t0:performance.now(),ms};}
function applyPose(a,r,b,now){const k=(now-a.pose.t0)/a.pose.ms;if(k>=1){a.pose=null;a.crouch=0;return;}const s=Math.sin(Math.min(1,k)*Math.PI),T=a.pose.type;
  if(T==='look'){r.head.rotation.x=.35*s;r.head.rotation.y=Math.sin(k*9)*.2*s;r.armR.rotation.set(-1.5*s,0,-.3*s);b.rotation.x=.15*s;}
  if(T==='pickup'){a.crouch=.14*s;r.legL.rotation.x=-.8*s;r.legR.rotation.x=.5*s;b.rotation.x=.45*s;r.armR.rotation.set(-1.1*s,0,0);r.head.rotation.x=.3*s;}
  if(T==='open'){a.crouch=.08*s;b.rotation.x=.3*s;r.armL.rotation.set(-1.3*s,0,.2*s);r.armR.rotation.set(-1.3*s,0,-.2*s);}
  if(T==='stretch'){r.armL.rotation.set(-2.6*s,0,.3*s);r.armR.rotation.set(-2.6*s,0,-.3*s);b.rotation.x=-.12*s;}
  if(T==='around'){r.head.rotation.y=Math.sin(k*Math.PI*2)*.9*s;}
  if(T==='shift'){b.rotation.z=Math.sin(k*Math.PI*2)*.06;r.legL.rotation.x=.15*s;}
  if(T==='drink'){r.armR.rotation.set(-2.2*s,0,-.4*s);r.head.rotation.x=-.4*s;}}
// a character behind a tree or a wall shows through it as a flat silhouette: foes red, the hero and
// companions blue. The actors are drawn once more with only the hidden parts passing the depth test.
// The characters mark their visible pixels in the stencil; a silhouette pixel is drawn only where none of
// them is visible and only once, so it is one even flat shape, never the parts of a body behind each other.
const silMat=c=>{const m=new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:.42,depthFunc:THREE.GreaterDepth,depthWrite:false,fog:false,
  stencilWrite:true,stencilRef:1,stencilFunc:THREE.NotEqualStencilFunc,stencilZPass:THREE.ReplaceStencilOp,stencilFail:THREE.KeepStencilOp,stencilZFail:THREE.KeepStencilOp});m.userData.noSee=true;return m;};
const SIL=[[1,silMat(0xff5a4a)],[2,silMat(0x7fd0ff)]];let silN=0;
function actorMats(a){a.o.traverse(m=>{if(!m.isMesh)return;for(const mt of [].concat(m.material)){if(mt.userData.actor)continue;mt.userData.actor=true;mt.userData.noSee=true;
  mt.stencilWrite=true;mt.stencilRef=1;mt.stencilFunc=THREE.AlwaysStencilFunc;mt.stencilZPass=THREE.ReplaceStencilOp;mt.needsUpdate=true;}});}
function silhouettes(){if(window.SET&&SET.silhouettes===false)return;if(paused||document.body.classList.contains('inmenu')||document.body.classList.contains('cinematic'))return;const mark=++silN%12===1;let any=false;
  for(const a of actors){if(a.dead||!a.o.visible||a.far||a.hidden)continue;const l=a.ally?2:a.enemy&&!a.calm?1:0;
    if(mark||a.silL!==l){actorMats(a);a.o.traverse(m=>{if(m.isMesh){m.layers.disable(1);m.layers.disable(2);if(l)m.layers.enable(l);}});a.silL=l;}if(l)any=true;}
  if(!any)return;const bg=scene.background,au=renderer.autoClear,su=renderer.shadowMap.autoUpdate;scene.background=null;renderer.autoClear=false;renderer.shadowMap.autoUpdate=false;
  for(const [l,mat] of SIL){camera.layers.set(l);scene.overrideMaterial=mat;renderer.render(scene,camera);}
  camera.layers.set(0);scene.overrideMaterial=null;scene.background=bg;renderer.autoClear=au;renderer.shadowMap.autoUpdate=su;}
function frame(now){const dt=Math.min(.12,(now-last)/1000);last=now;const t=now/1000;
  for(let i=anims.length-1;i>=0;i--){const a=anims[i],k=Math.min(1,(now-a.t0)/a.ms);a.fn(k<1?1-Math.pow(1-k,2):1);if(k>=1){anims.splice(i,1);a.res()}}
  camZoom+=(zoomTarget-camZoom)*Math.min(1,dt*3.5);VIEW+=(viewTarget-VIEW)*Math.min(1,dt*8);WIND.value=t;
  ambTick(dt,room?99:(seaDist[H0.z]||[])[H0.x]??99);
  if(!room)smokeTick(dt,t);
  {const r=H0.route,d=r&&r.length?r[r.length-1]:null;marker.visible=!!d;if(d){marker.position.set(d[0]+.5,groundAt(d[0],d[1])+.03,d[1]+.5);marker.scale.setScalar(1+Math.sin(now/180)*.12);}}
  if(!paused){aiT+=dt;if(aiT>.45){aiT=0;ai();markSeen();lifeTick();lifeTick();townTick();allyTick();}}else if(inMenuBg()){aiT+=dt;if(aiT>.45){aiT=0;lifeTick();lifeTick();}}pointerTick();placeWheel();
  for(const a of actors){if(a.dead&&a!==H0)continue;
    // actors far from the camera are not drawn or moved; they wake as the hero comes near
    const far=a!==H0&&!a.inFight&&(Math.abs(a.px-focus.x)>44||Math.abs(a.pz-focus.z)>44);if(far!==!!a.far){a.far=far;a.o.visible=!far&&!a.hidden;}if(far)continue;
    // walking eases in and out: the stride keeps its phase and fades over a few frames, so stopping
    // between two cells or turning never snaps the legs back to standing
    const moving=(a!==H0||!H0.dead)&&step(a,dt);a.walkW=(a.walkW||0)+((moving?1:0)-(a.walkW||0))*Math.min(1,dt*(moving?9:6));
    if(moving)a.walkT=(a.walkT||0)+dt*a.spd*4.2;
    const o=a.o,b=o.userData.body,walk=a.walkW>.03?(a.walkT||.001):0;const sw=reduce?0:Math.sin(a.walkT||0)*a.walkW,breathe=reduce?0:Math.sin(t*2+a.ph);
    a.gy=(a.gy??groundAt(a.px,a.pz))+(groundAt(a.px,a.pz)-(a.gy??0))*Math.min(1,dt*12);o.position.set(a.px+(a.off?a.off[0]:0),a.gy+(walk?Math.abs(sw)*.03:0)-(a.sink||0)-(a.sneak?.07:0)-(a.crouch||0),a.pz+(a.off?a.off[1]:0));
    // the body turns towards where it goes instead of snapping round
    if(a!==H0||!H0.dead){let dr=a.face-o.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));o.rotation.y+=dr*Math.min(1,dt*12);}b.rotation.x=(a.lean||0)+(a.sneak?.3:0);b.rotation.y=0;b.rotation.z=walk?sw*.03:0;
    const r=o.userData.rig;if(r&&r.quad){quadPose(r,walk,sw,t,a.ph);if(!walk&&!a.off&&a.enemy&&!a.inFight)r.head.rotation.x=.25+Math.max(0,Math.sin(t*1.6+a.ph))*.35;}
    else if(r){r.legL.rotation.x=walk?sw*.7:0;r.legR.rotation.x=walk?-sw*.7:0;
      armPose(o,walk,sw,breathe);
      if(a===H0&&walk){const s=Math.sign(sw);if(s&&s!==a.lastSw)stepSound(at(Math.floor(a.px),Math.floor(a.pz)),a.sneak);a.lastSw=s;}
      if(!walk&&!a.off)idleLife(a,r,b,t);
      r.torso.scale.y=1+(walk?0:breathe*.012);r.head.rotation.y=walk?0:Math.sin(t*.5+a.ph)*.15;r.head.rotation.x=0;
      if(a.pose)applyPose(a,r,b,now);else if(walk||!a.act)a.crouch=0;}}
  for(const e of enemies){const b=e.bar;b.g.visible=!e.dead&&e.o.visible&&(e.inFight||e.hp<e.max);if(!b.g.visible)continue;
    b.g.position.set(e.o.position.x,e.o.position.y+1.15*(e.scale||1),e.o.position.z);b.g.quaternion.copy(camera.quaternion);const k=Math.max(0,e.hp/e.max);b.fg.scale.x=k;b.fg.position.x=-.28*(1-k);}
  if(!reduce){torches.forEach(T_=>{T_.f=.85+Math.sin(t*9+T_.ph)*.08+Math.sin(t*23+T_.ph*2)*.05;T_.fl.scale.y=(T_.fl.scale.x>.15?.28:.16)*(.9+T_.f*.2)});
    flies.forEach(f=>{const u=f.userData;f.position.set(focus.x+u.ox+Math.sin(t*.4+u.ph)*.8,focus.y+.6+Math.sin(t*1.3+u.ph)*.25,focus.z+u.oz+Math.cos(t*.33+u.ph)*.8);const night=nightness()>.5;f.visible=!room&&(night?Math.sin(t*2+u.ph*3)>-.2:nightness()<.3);if(!night){f.material=BFLY[u.c];f.scale.set(2.4+Math.sin(t*22+u.ph)*1.6,.6,2.2);f.position.y+=.25;}else{f.material=FFLY;f.scale.set(1,1,1);}});
    T.water.offset.set(Math.sin(t*.2)*.02,t*.004);window.foam.material.opacity=.14+Math.max(0,Math.sin(t*1.4))*.16;}
  // the camera follows the hero, or an enemy while it takes its turn
  const FT=camFocus&&!camFocus.dead?camFocus:H0;focus.x+=(FT.px-focus.x)*Math.min(1,dt*3);focus.z+=(FT.pz-focus.z)*Math.min(1,dt*3);focus.y=groundAt(FT.px,FT.pz)*.5;holdTick();placeCam();if(inMenuBg())menuCam(dt);streamTick(firstStream);firstStream=false;
  if(shake>0){camera.position.x+=(Math.random()-.5)*shake;camera.position.y+=(Math.random()-.5)*shake;shake=Math.max(0,shake-dt*.9)}
  const nearest=[...torches].sort((a,b)=>a.pos.distanceToSquared(focus)-b.pos.distanceToSquared(focus));
  LIGHTS.forEach((L,i)=>{const T_=nearest[i];L.position.copy(T_.pos);L.distance=T_.dist;L.intensity=T_.base*(T_.f||1)*(room?1:.3+.7*nightness());});
  moon.target.position.copy(focus);
  if(!paused){worldTick(dt);weatherTick(dt);critterTick(dt,t);eventTick(now);}else if(inMenuBg()){critterTick(dt,t);}barkTick(now);tutTick();miniTick(now);zoneCheck();
  // at 30 frames a second every other frame is skipped, which keeps phones cooler
  if(window.SET&&SET.fps===30&&now-lastDraw<30){requestAnimationFrame(frame);return;}lastDraw=now;seeTick();renderer.render(scene,camera);silhouettes();requestAnimationFrame(frame)}
let lastDraw=0;
// ---------- the main menu backdrop: a slow flight over the living island ----------
const inMenuBg=()=>typeof mainEl!=='undefined'&&!mainEl.hidden&&!room;
let menuT=0,firstStream=true;const MENU_PATH=[[Z.dock[0]+4,Z.dock[1]],Z.village,[Z.village[0]+10,Z.village[1]+8],Z.hunter,Z.forest,Z.camp,Z.ruins,Z.grave,[Z.village[0]+6,Z.village[1]-8]];
function menuCam(dt){menuT+=dt;const seg=16,n=MENU_PATH.length,i=Math.floor(menuT/seg)%n,k=(menuT%seg)/seg,s=k*k*(3-2*k),A=MENU_PATH[i],B=MENU_PATH[(i+1)%n];
  const fx=A[0]+(B[0]-A[0])*s,fz=A[1]+(B[1]-A[1])*s,fy=groundAt(Math.round(fx),Math.round(fz))*.5,a=menuT*.06;
  focus.set(fx,fy,fz);camera.position.set(fx+Math.sin(a)*8.5,fy+6.2+Math.sin(menuT*.13)*.6,fz+Math.cos(a)*8.5);camera.lookAt(fx,fy+.4,fz);}
{EXTRAS}
// ---------- save: progress lives in this browser only ----------
const SAVE='helga-island-beta-1';
let resetting=false;
function save(){if(resetting||!HEROSET)return;try{localStorage.setItem(SAVE,JSON.stringify({x:H0.x,z:H0.z,hp:H0.hp,room:room?room.i:-1,
  q:Object.fromEntries(Object.entries(Q).map(([k,q])=>[k,[q.state,q.left]])),rv:Q.raven?Q.raven.step:null,lv:[LV.xp,LV.lv],deals:DEALS,objs:OBJS,camp:campaignSave(),packAngry:PACK_ANGRY?1:0,allies:ALLIES.map(a=>[a.npc,a.hp]),dead:enemies.filter(e=>!e.temp).map(e=>e.dead?1:0),wx:WX.target,fire:chapel.lit?1:0,tut:{step:TUT.step,flags:TUT.flags},seen:seenRLE(),chests:interact.filter(i=>i.chest&&!i.key).map(i=>({o:i.opened?1:0,items:i.items})),looted:looks.filter(l=>!l.key).map(l=>l.taken?1:0),gch:Object.assign(PEND.chests,Object.fromEntries(interact.filter(i=>i.key).map(i=>[i.key,{o:i.opened?1:0,items:i.items}]))),glt:Object.assign(PEND.looted,Object.fromEntries(looks.filter(l=>l.key&&l.taken).map(l=>[l.key,1]))),rocks:[...usedRocks],
  herb:actors.find(a=>a.talkId==='herb').gave||0,eco:ecoSave(),met:V.filter(v=>v.met).map(v=>[v.npc,v.met]),time:worldTime,leg:legendSave(),items:window.handsItems?window.handsItems():null}))}catch(e){}}
function load(){let d;try{d=JSON.parse(localStorage.getItem(SAVE)||'null')}catch(e){}if(!d)return;
  for(const [k,[st,left]] of Object.entries(d.q||{}))if(Q[k]){Q[k].state=st;Q[k].left=left;}
  ecoLoad(d.eco);legendLoad(d.leg);
  for(const [nm,k] of d.met||[]){const v=V.find(v=>v.npc===nm);if(v)v.met=k;}
  (d.dead||[]).forEach((v,i)=>{const e=enemies[i];if(v&&e){e.dead=true;e.o.visible=false;}});
  Object.assign(PEND.chests,d.gch||{});Object.assign(PEND.looted,d.glt||{});const cs=interact.filter(i=>i.chest&&!i.key);(d.chests||[]).forEach((c,i)=>{const it=cs[i];if(it&&c&&c.items){it.items=c.items;if(c.o)it.open();}});
  const lk=looks.filter(l=>!l.key);(d.looted||[]).forEach((v,i)=>{const L=lk[i];if(v&&L){L.taken=true;if(L.grp)L.grp.visible=false;}});(d.rocks||[]).forEach(k=>usedRocks.add(k));
  if(d.rv&&typeof ravenLoad==='function')ravenLoad(d.rv);
  dealsLoad(d.deals);objsLoad(d.objs);campaignLoad(d.camp);if(d.packAngry)packAnger();
  if(d.lv){LV.xp=d.lv[0];LV.lv=d.lv[1];if(HERO)H0.max=HERO.hp+lvHP();}
  for(const [nm,hp] of d.allies||[]){const a=actors.find(o=>o.npc===nm);if(a&&!a.ally){a.ally=true;a.wander=0;a.talkId='ally';a.hp=Math.max(1,hp);a.hidden=false;a.o.visible=true;ALLIES.push(a);}}
  if(d.tut){TUT.step=d.tut.step;TUT.flags=d.tut.flags||{};if(TUT.step===6)spawnRat();}if(d.fire)setChapel(true);if(d.seen)seenLoad(d.seen);
  actors.find(a=>a.talkId==='herb').gave=d.herb;if(typeof d.time==='number')worldTime=d.time;if(d.items&&window.handsLoad)window.handsLoad(d.items);
  H0.hp=Math.max(1,d.hp||H0.max);if(d.room>=0&&ROOMS[d.room]){d.x=ROOMS[d.room].exit[0];d.z=ROOMS[d.room].exit[1]-1;} // rooms moved and grew: a saved hero indoors wakes by the door
  if(d.room>=0){setRoom(ROOMS[d.room]);}if(free(d.x,d.z)){H0.x=d.x;H0.z=d.z;H0.px=d.x+.5;H0.pz=d.z+.5;focus.set(H0.px,0,H0.pz);}questUI();}
{UI}
{EDITOR}
{LIFE}
{INTRO}
// start: a fresh hero from the editor goes straight in; otherwise the main menu comes first
setTimeout(()=>{let fresh=false;try{fresh=sessionStorage.getItem('helga-start')==='new';sessionStorage.removeItem('helga-start');}catch(e){}
  if(HEROSET)applyHero(Object.assign({},HEROSET,{fresh}));
  if(fresh){setTimeout(arrival,50);const kit=CLASSES[HERO.cls].kits[HEROSET.kit||0]||CLASSES[HERO.cls].kits[0],L=kit.L,R=kit.R;const bag=[{id:'potion',n:1},{id:'bread',n:1},{id:'stone',n:3}];for(const id of kit.bag||[])bag.push({id,n:1});window.handsLoad&&window.handsLoad({L:L&&{id:L,n:1},R:R&&{id:R,n:1},bag});rest();screen(null);}
  else{load();mainMenu();}
  setHP();setInterval(save,3000);addEventListener('pagehide',save);setTimeout(()=>document.getElementById('loading').classList.add('gone'),300);},0);
setHP();requestAnimationFrame(frame);
window.__game={snd:{audio,REC,take:zTake,sfx,stepSound},V,critters,WX,phaseNow,lifeTick,get EV(){return EV},setEvNext:v=>evNext=v,chapel,setChapel,openMap,looks,lookWheel,houseWheel,heroPose,interact,enemyWheel,attackWheel,heroWheel,screen,applyHero,openEditor,get paused(){return paused},setTime:v=>worldTime=v,CB,startCombat,endHeroTurn,heroMove,stoneNoise,noiseCellNear,sees,notices,get busy(){return busy},tapActor,ROOMS,interact,enterRoom,leaveRoom,talk,Q,get room(){return room},H0,enemies,actors,free,path,at,Z,camera,useConsumable};
