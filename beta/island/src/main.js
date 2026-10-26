// ---------- renderer / scene ----------
const canvas=document.getElementById('c'),stage=document.getElementById('stage');
const renderer=new THREE.WebGLRenderer({canvas,antialias:false});
// ---------- a window to the hero: whatever stands between the camera and the hero, inside a circle
// around him on screen, crumbles away in pixel dots, for the eyes only (trees, roofs and walls stay solid
// for walking). Every lit or flat world material gets this in its shader; characters opt out.
const SEE={on:{value:0},c:{value:new THREE.Vector2()},r:{value:120},d:{value:1},y:{value:0},inOn:{value:0},inRect:{value:new THREE.Vector4()}};
THREE.Material.prototype.onBeforeCompile=function(sh){if(!(this.isMeshLambertMaterial||this.isMeshBasicMaterial||this.isMeshStandardMaterial||this.isMeshPhongMaterial))return;
  const mat=this;sh.uniforms.seeOn={get value(){return mat.userData.noSee?0:SEE.on.value;}};sh.uniforms.seeC=SEE.c;sh.uniforms.seeR=SEE.r;sh.uniforms.seeD=SEE.d;sh.uniforms.seeY=SEE.y;sh.uniforms.inOn=SEE.inOn;sh.uniforms.inRect=SEE.inRect;
  const wuv=!!(mat.userData.wuv&&mat.map);if(wuv){sh.uniforms.wuvK={value:mat.userData.wuv};sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWuvN;').replace('#include <project_vertex>','#include <project_vertex>\n{vec4 wn=vec4(normal,0.0);\n#ifdef USE_INSTANCING\nwn=instanceMatrix*wn;\n#endif\nvWuvN=(modelMatrix*wn).xyz;}');sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWuvN;uniform float wuvK;').replace('#include <map_fragment>','{vec3 an=abs(vWuvN);vec2 wq=an.x>an.y&&an.x>an.z?vec2(vSeeW.z,vSeeW.y):an.y>an.z?vec2(vSeeW.x,vSeeW.z):vec2(vSeeW.x,vSeeW.y);vec4 texelColor=texture2D(map,wq*wuvK+0.003,-1.5);texelColor=mapTexelToLinear(texelColor);diffuseColor*=texelColor;}');}
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vSeeW;').replace('#include <project_vertex>','#include <project_vertex>\n{vec4 sw=vec4(transformed,1.0);\n#ifdef USE_INSTANCING\nsw=instanceMatrix*sw;\n#endif\nvSeeW=(modelMatrix*sw).xyz;}');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vSeeW;uniform float seeOn,seeR,seeD,seeY,inOn;uniform vec2 seeC;uniform vec4 inRect;')
    .replace('#include <color_fragment>','#include <color_fragment>\n#if !defined(USE_MAP)&&!defined(USE_COLOR)\nif(!gl_FrontFacing){}else{vec3 gq=floor(vSeeW*10.0+0.013);float gh=fract(sin(dot(gq,vec3(12.99,78.23,37.71)))*43758.55);diffuseColor.rgb*=0.94+gh*0.09;}\n#endif').replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\nif(seeOn>0.5&&gl_FragCoord.z<seeD&&vSeeW.y>seeY){float r=length(gl_FragCoord.xy-seeC)/seeR;if(r<1.0){float n=fract(sin(dot(floor(gl_FragCoord.xy/4.0),vec2(12.9898,78.233)))*43758.5453);if(n>smoothstep(0.55,1.0,r))discard;}}').replace('#include <fog_fragment>','#include <fog_fragment>\nif(inOn>0.5&&(vSeeW.x<inRect.x||vSeeW.x>inRect.z||vSeeW.z<inRect.y||vSeeW.z>inRect.w)){if(vSeeW.z>inRect.w&&vSeeW.y>seeY&&vSeeW.x>inRect.x-4.0&&vSeeW.x<inRect.z+4.0)discard;float l=dot(gl_FragColor.rgb,vec3(.3,.59,.11));gl_FragColor.rgb=mix(vec3(l),gl_FragColor.rgb,.3)*.3;}');};
THREE.Material.prototype.customProgramCacheKey=function(){return this.userData&&this.userData.wuv&&this.map?'wuv'+this.userData.wuv:'';};
// building surfaces: their pixel textures are laid in world space at the island's 32 px per cell, whatever the box's size
function pixelMat(m){if(!m||!m.map||m.userData.wuv||m.userData.noWuv||m.map===WINDOW)return;const t=m.map;m.userData.wuv=32/(t.image&&t.image.width||32);if(t.wrapS!==THREE.RepeatWrapping){t.wrapS=t.wrapT=THREE.RepeatWrapping;t.needsUpdate=true;}m.needsUpdate=true;}
function worldUV(g){g.traverse(o=>{if(o.isMesh)pixelMat(o.material);});}
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
// settlement layout: a world saved before layout 2 keeps the old grid capital and ring villages (its rooms,
// chests and people are saved by number); a layout 2 world keeps its towns; every new world gets layout 3:
// the grown towns of settle.js with a castle at real scale and houses parted into rooms
const LAYOUT=(()=>{try{const d=JSON.parse(localStorage.getItem('helga-island-beta-1')||'null');if(d)return d.lay>=2?Math.min(3,d.lay):1;}catch(e){}return 3;})();
const GEN=IslandGen.make('helga',300,220,{v:Math.min(2,LAYOUT),stamp:{w:80,h:60,cx:40,cz:30,r:42,gate:[78,44],land:(x,z)=>OLD_D(x,z)<1,near:(x,z)=>(x>40||z>45)&&OLD_D(x,z)<2.4}});
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
// Layout 2: Заводь's houses are entered by walking in like every other building; their rooms are the houses themselves
// (a world saved before layout 2 keeps the rooms below the island, where its saved hero may stand)
if(LAYOUT>=2)ROOMS.forEach((R,i)=>{const [hx,hz,hw,hd]=HOUSES[i],ex=hx+Math.floor(hw/2),ez=hz+hd-1;Object.assign(R,{ox:hx,oz:hz,exit:[ex,ez],inside:[ex,ez-1],side:'S',inPlace:true,place:{type:'village',wealth:2,x:hx,z:hz},wealth:2});});
for(const R of ROOMS){for(let z=R.oz;z<R.oz+R.id;z++)for(let x=R.ox;x<R.ox+R.iw;x++)set(x,z,(x===R.ox||x===R.ox+R.iw-1||z===R.oz||z===R.oz+R.id-1)?'X':'F');set(...R.exit,'E');}
if(LAYOUT<2)for(const [hx,hz,hw,hd] of HOUSES)for(let z=hz;z<hz+hd;z++)for(let x=hx;x<hx+hw;x++)set(x,z,'H');
road([Z.dock[0]+3,Z.dock[1]],Z.village);road(Z.village,[Z.ruins[0]-2,Z.ruins[1]+3]);road(Z.village,[Z.camp[0]-3,Z.camp[1]]);road([Z.village[0]+8,Z.village[1]+4],Z.hunter);road([Z.camp[0]-3,Z.camp[1]],[78,44]); // on to the gate where the big island's road begins
// a path from every door to the square
for(const R of ROOMS){const[dx,dz]=R.door;if(at(dx,dz)!=='C')set(dx,dz,'D');road([dx,dz],Z.village);}
// ruin walls: broken rectangle
const RW=[];for(let x=Z.ruins[0]-5;x<=Z.ruins[0]+5;x++)for(const z of [Z.ruins[1]-4,Z.ruins[1]+4])if(hash2(x,z*3)<.7&&Math.abs(x-Z.ruins[0])>1)RW.push([x,z]);
for(let z=Z.ruins[1]-4;z<=Z.ruins[1]+4;z++)for(const x of [Z.ruins[0]-5,Z.ruins[0]+5])if(hash2(x*3,z)<.7)RW.push([x,z]);
for(const [x,z] of RW)if(at(x,z)!=='~')set(x,z,'W');
// ---------- generated places: squares, houses, the quarry, camps and the old fort ----------
const GPL=GEN.places.filter(p=>!p.stamp),GEN_HOUSES=[],PALACE=[];let SETTLE=null;
const genBusy=(x,z)=>GPL.some(p=>!['wolves','boars','bear'].includes(p.type)&&Math.hypot(x-p.x,z-p.z)<=(SETTLE&&SETTLE.ext.get(p)||p.r)+1);
{const okCell=(x,z)=>['G','A','B','D'].includes(at(x,z));
 const fits=(hx,hz,hw,hd)=>{for(let z=hz-1;z<=hz+hd;z++)for(let x=hx-1;x<=hx+hw;x++){const c=at(x,z),inside=x>=hx&&x<hx+hw&&z>=hz&&z<hz+hd;if(inside?!['G','A','B'].includes(c):['H','~','R','M','N','W'].includes(c))return false;}return true;};
 const house=(hx,hz,hw,hd,p)=>{for(let z=hz;z<hz+hd;z++)for(let x=hx;x<hx+hw;x++)set(x,z,'H');GEN_HOUSES.push([hx,hz,hw,hd,p]);};
 if(LAYOUT>=2){SETTLE=Settle.plan({v:LAYOUT,W,OH:OUT_H,at,set,places:GPL,hgt:(x,z)=>GEN.height[z*W+x]});for(const sp of SETTLE.houses)GEN_HOUSES.push(Object.assign([sp.x,sp.z,sp.w,sp.d,sp.p],{spec:sp}));}
 for(const p of GPL){const disc=(r,c)=>{for(let z=p.z-r;z<=p.z+r;z++)for(let x=p.x-r;x<=p.x+r;x++)if(Math.hypot(x-p.x,z-p.z)<=r&&okCell(x,z))set(x,z,c);};
   // the capital: cobbled streets every five cells, a market square in the middle, houses filling the blocks
   // the royal castle fills the north of the capital: a walled court 28 x 17 cells with a keep, the market below its gate
   if(SETTLE&&['capital','village','works'].includes(p.type))continue;
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
   if(LAYOUT===1?!['C','D','S'].includes(at(...R.door)):['G','A','B'].includes(at(...R.door)))set(...R.door,'D');return R;};
 for(const h of PALACE)h.room=alloc(h[0],h[1],h[2],h[3],'castle','Королевский замок',h.p);
 const nm={capital:'Дом горожанина',village:'Деревенский дом',works:'Дом каменотёса'};
 // every generated house is entered without a door to another place: its room is the house itself, walls on its border cells
 // every generated house is entered without a door to another place: its room is the house itself, walls on its border cells.
 // The door is on the south wall, or (layout 2) on the east or west wall at the row its spec names; never north.
 for(const h of GEN_HOUSES){const [hx,hz,hw,hd,p]=h,s=h.spec||{side:'S',off:Math.floor(hw/2)},side=s.side;
   const ex=side==='S'?hx+s.off:side==='E'?hx+hw-1:hx,ez=side==='S'?hz+hd-1:hz+s.off;
   const door=side==='S'?[ex,hz+hd]:side==='E'?[hx+hw,ez]:[hx-1,ez],inside=side==='S'?[ex,ez-1]:side==='E'?[ex-1,ez]:[ex+1,ez];
   const type=s.type||(p.poorWhy?'poorhouse':'house');
   const R={i:ROOMS.length,type,name:s.name&&s.name!=='Дом'?s.name:p.poorWhy?'Лачуга':(nm[p.type]||'Дом'),ox:hx,oz:hz,iw:hw,id:hd,
     door,exit:[ex,ez],inside,side,spec:h.spec||null,guard:s.guard||0,gen:true,inPlace:true,place:p,wealth:p.wealth||0};ROOMS.push(R);h.room=R;
   if(s.shop)R.shop=s.shop;
   for(let z=hz;z<hz+hd;z++)for(let x=hx;x<hx+hw;x++)set(x,z,(x===hx||x===hx+hw-1||z===hz||z===hz+hd-1)?'X':'F');set(ex,ez,'E');
   if(!['C','D','S','P'].includes(at(...R.door)))set(...R.door,'D');}
 // most houses have an attic up a ladder, richer ones a cellar under a hatch: rooms of their own, the house's size.
 // A house of two storeys (layout 2) has its upper floor up a stair instead of an attic, as big as the house.
 for(const h of GEN_HOUSES){const [hx,hz,hw,hd,p]=h,R=h.room,hh=hash2(hx*11,hz*13);if(R.type==='poorhouse')continue;
   if(h.spec){const s=h.spec;
     if(s.storeys>=2&&['house','inn','castle','chambers','temple'].includes(R.type)){const A=alloc(hx,hz,hw,hd,'upper',{castle:'Галерея тронного зала',temple:'Хоры храма',inn:'Комнаты для постояльцев',chambers:'Спальня короля'}[R.type]||'Верхний этаж',p);A.sub=true;A.parent=R;R.attic=A;}
     else if(R.type==='house'&&!R.shop&&hh<.6){const A=alloc(hx,hz,hw,hd,'attic','Чердак',p);A.sub=true;A.parent=R;R.attic=A;}
     if(R.type==='house'&&!R.shop&&(p.wealth>=3||p.type==='capital'?hh>.35:hh>.7)){const big=p.wealth>=3||p.type==='capital',cw=big?hw+2:Math.max(5,hw-1),cd=big?hd+1:Math.max(5,hd-1);const C=alloc(hx,hz,cw,cd,'cellar',big?'Погреб с кладовой':'Погребок',p);C.sub=true;C.parent=R;R.cellar=C;}
     continue;}
   if(hh<.75){const A=alloc(hx,hz,hw,hd,'attic','Чердак',p);A.sub=true;A.parent=R;R.attic=A;}
   // the attic is the house's own size; the cellar is dug under the ground: bigger than the house in a rich place, smaller elsewhere
   if(p.wealth>=3||p.type==='capital'||hh>.6){const big=p.wealth>=3||p.type==='capital',cw=big?hw+2:Math.max(5,hw-2),cd=big?hd+1:Math.max(5,hd-1);const C=alloc(hx,hz,cw,cd,'cellar',big?'Погреб с кладовой':'Погребок',p);C.sub=true;C.parent=R;R.cellar=C;}}
 // some houses are shops: the capital has a smithy, a bakery and a general store, a rich village one of them
 if(!SETTLE){const left=new Map();for(const h of GEN_HOUSES){const p=h[4],R=h.room;if(R.type!=='house')continue;
   if(!left.has(p))left.set(p,p.type==='capital'?['smith','baker','store']:p.type==='village'&&p.wealth>=3?[['baker','smith','store'][Math.floor(hash2(p.x,p.z)*3)]]:[]);
   const k=left.get(p).shift();if(k){R.shop=k;R.name={smith:'Кузница',baker:'Пекарня',store:'Лавка'}[k];}}}
 H=grid.length;}
for(let z=0;z<H;z++){height.push([]);for(let x=0;x<W;x++){const c=at(x,z);
  // outside the old district the land rises with the generated relief: hills, then rock and snow
  const gh=inStamp(x,z)||z>=OUT_H?0:Math.max(0,GEN.height[z*W+x]-.3)*1.6;
  height[z].push(c==='F'||c==='E'||c==='X'?.3:c==='~'||c==='R'?0:c==='A'?.24:c==='P'?.3:c==='D'?.27+gh*.5:c==='C'?.29:c==='S'?.3:c==='M'?.7+gh:c==='N'?1.1+gh:c==='B'?.26:.3+vnoise(x,z,5)*.08+gh);}}
for(const R of ROOMS)if(R.inPlace){let hb=0;for(let z=R.oz;z<R.oz+R.id;z++)for(let x=R.ox;x<R.ox+R.iw;x++){const gh=inStamp(x,z)?0:Math.max(0,GEN.height[z*W+x]-.3)*1.6;hb=Math.max(hb,.3+gh);}
  R.y=hb;for(let z=R.oz;z<R.oz+R.id;z++)for(let x=R.ox;x<R.ox+R.iw;x++)height[z][x]=hb;}
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
    if(o.isInstancedMesh){o.geometry.dispose();o.dispose&&o.dispose();}if(o.userData.own)for(const gm of o.userData.own)gm.dispose();}c.live=[];}
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
const SURF={M:{top:T.stone,side:T.stone},N:{top:T.stone,side:T.stone,tint:0xe8eef2},B:{top:T.moss,side:T.dirt},G:{top:T.grass,side:T.gside},A:{top:sand,side:sand},D:{top:T.dirt,side:T.dirt},C:{top:T.cobble,side:T.stone},S:{top:T.stone,side:T.stone},H:{top:T.dirt,side:T.dirt},W:{top:T.stone,side:T.stone},P:{top:T.p[0],side:T.p[1]},K:{top:T.dirt,side:T.dirt,tint:0x9a7a58}};
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
// layout 2: fences, palisades, wells, stalls and the things of yards and quarries stand in the way
if(SETTLE){for(const c of [...SETTLE.fences,...SETTLE.palisade,...SETTLE.wells,...SETTLE.stalls])blockCell(c[0],c[1]);for(const pr of SETTLE.props)if(pr.k!=='cross')blockCell(pr.x,pr.z);}
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
// a voxel crown is wider than its cell: next to a wall a tree grows smaller so its leaves never pass through the house
function wallDist(x,z){for(let r=1;r<3;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(Math.max(Math.abs(dx),Math.abs(dz))===r&&at(x+dx,z+dz)==='X')return r;return 9;}
if(VOX.on){const treeMat=sway(new THREE.MeshLambertMaterial({vertexColors:true}),.012,1);treeMat.userData.vox=1;
  voxInstanced(treeCells,([x,z])=>{const pine=hash2(x*5,z*3)<.35||GEN.biome[z*W+x]===GB.HILLS,v=Math.floor(hash2(z*3,x*7)*3);return VOX.asset((pine?'pine':'tree')+v,()=>VOX.tree(v,pine),1/VOX.N);},
    ([x,z],i,m)=>{let s=(.9+hash2(x,z)*.6)*(hash2(x*5,z*3)<.35||GEN.biome[z*W+x]===GB.HILLS?.62:.8);const wd=wallDist(x,z);if(wd<3)s=Math.min(s,Math.max(.32,(wd-.55)/1.4));m.compose(v1.set(x+.5,groundAt(x,z),z+.5),qY(hash2(z,x)*6.28),v2.set(s,s,s));},treeMat);}
else{instanced(BOX,lam(T.bark),treeCells,([x,z],i,m)=>{const s=.9+hash2(x,z)*.6;m.compose(v1.set(x+.5,groundAt(x,z)+.45*s,z+.5),q0,v2.set(.22*s,.9*s,.22*s))});
for(const [k,mat,y,sz] of [[0,leafA,1.05,.95],[1,leafB,1.45,.7],[2,pine,1.78,.42]])
  instanced(BOX,mat,treeCells,([x,z],i,m)=>{const s=.9+hash2(x,z)*.6;m.compose(v1.set(x+.5+(k-1)*.05,groundAt(x,z)+y*s,z+.5),qY(hash2(z,x)*3),v2.set(sz*s,sz*.8*s,sz*s))});}
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
if(LAYOUT<2)HOUSES.forEach(([hx,hz,hw,hd],hi)=>{const g=new THREE.Group(),y=.3,type=HOUSE_INFO[hi][0],S=HSTYLE[type],H_=S.h;g.userData.house=hi;houseMeshes.push(g);
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
  worldUV(g);scene.add(g);});
// generated houses: the same plank house, its door shut; a richer place gets lighter walls
const wallRich=lam(T.p[0],{color:0xe0d4bc}),wallPoor=lam(T.p[1],{color:0x8a7a64}),roofPoor=lam(T.p[2],{color:0x6a5040});
// roofs differ: red tiles, blue-grey slate, wooden shingles, golden thatch, mossy turf; ridges run either way.
// Rich houses get tiles or slate, poor ones thatch or turf. Every door opens onto the house's own room.
const ROOF={tiles:lam(T.cobble,{color:0xb8503a}),slate:lam(T.stone,{color:0x5a6478}),shingle:lam(T.p[2],{color:0x8a5a3a}),thatch:lam(T.leaves,{color:0xd8b860}),turf:lam(T.moss||T.leaves,{color:0x6a8a4a})};
function roofOn(g,mat,x0,z0,w,d,top,alongX){const B=(sx,sz,px,pz,rx,rz)=>{const r=new THREE.Mesh(BOX,mat);r.scale.set(sx,.12,sz);r.position.set(px,top,pz);r.rotation.set(rx,0,rz);r.castShadow=true;g.add(r);};
  if(alongX)for(const sg of[-1,1])B(w/2+.35,d+.3,x0+w/2+sg*w/4,z0+d/2,0,-sg*.55);else for(const sg of[-1,1])B(w+.3,d/2+.35,x0+w/2,z0+d/2+sg*d/4,sg*.55,0);}
// a house built in a streamed chunk joins the pickable houses while it stands
function liveHouse(g){houseMeshes.push(g);g.userData.lists=[houseMeshes];return g;}
// A generated house is hollow: walls on its border cells with a door and glass windows, a floor, its room
// furnished inside, and a gable roof that fits it, with eaves over every wall and stepped gables at the ends.
// Outside: window boxes with flowers, pots by the door, a lantern, bushes at the corners, a smoking chimney.
// The roof and the wall facing the camera are tagged, so they can be lifted away while the hero is inside.
const glassMat=new THREE.MeshLambertMaterial({color:0xa8c8e0,transparent:true,opacity:.28,depthWrite:false}),hFrameMat=lam(T.bark,{color:0x6a4a30});
const FLOWERS=[0xd84a5a,0xf0c040,0xe8e0f0,0x8a5ad0,0xf08a3a];
// An old window, drawn on a 32 px grid: a wooden frame, a cross of mullion and transom, and in each quarter small
// diamond panes of greenish glass held by lead. Its own little hash, so the island's seeded textures stay as they were.
const WINDOW=(()=>{const c=document.createElement('canvas');c.width=c.height=32;const g=c.getContext('2d'),P=(x,y,col,w=1,h=1)=>{g.fillStyle=col;g.fillRect(x,y,w,h);};
  const hs=(x,y)=>{let h=(x*374761393+y*668265263)>>>0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;};
  for(let y=0;y<32;y++)for(let x=0;x<32;x++){const r=hs(x,y);P(x,y,y<12&&x+y<26?(r<.5?'#7a98a0':'#6a8a94'):(r<.5?'#4a6670':r<.8?'#55727a':'#3e5a64'));}
  for(let y=0;y<32;y++)for(let x=0;x<32;x++)if((x+y)%6===0||(x-y+60)%6===0)P(x,y,'#2a2e30');
  const wood=['#5a3e26','#664629','#4e3520'];for(let k=0;k<32;k++){for(const t of [0,1,2,29,30,31])P(k,t,wood[(k+t)%3]),P(t,k,wood[(k*7+t)%3]);for(const t of [15,16])P(k,t,wood[(k+t)%3]),P(t,k,wood[(k+t+1)%3]);}
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestMipmapLinearFilter;return t;})();
const winMat=new THREE.MeshLambertMaterial({map:WINDOW,emissive:0x2a1a08,emissiveIntensity:.35}),sillMat=lam(T.bark,{color:0x5a3e26});
// Layout 2 houses differ by wealth and trade: stone, timber frame (white plaster, dark beams), planks or logs;
// one storey or two (the upper floor shows outside: a taller house with a second row of windows, reached inside by a stair);
// a door on the south, east or west wall; barns with wide doors and no windows; a temple with its bell tower,
// a mill with its wheel on the water, the castle's stone buildings with battlements.
const WALLS={stone:lam(T.wall,{color:0xc0b8aa}),frame:lam(T.p[0],{color:0xece4d0}),plank:lam(T.p[0],{color:0xc8b8a0}),log:lam(T.bark,{color:0xa08060})},beamDark=lam(T.bark,{color:0x4a3222});
[...Object.values(WALLS),...Object.values(ROOF),beamDark,wallMat,roofMat,wallRich,wallPoor,roofPoor].forEach(pixelMat);
const TALL={tavern:1.9,forge:1.5,home:1.3,hall:1.8,barn:1.7,herb:1.2,castle:3.1,temple:2.4,barracks:1.7,armory:1.7,kitchen:1.6,treasury:1.6,chambers:1.6,warehouse:1.8,mill:1.6,tannery:1.4,inn:1.5,gbarn:1.7};
function genHouse(h){const [hx,hz,hw,hd,p]=h,R=h.room,S=h.spec,g=new THREE.Group(),y=R.y,rich=p.type==='capital'||p.wealth>=3,poor=p.wealth<=1&&p.type!=='capital',hh=hash2(hx*3,hz*5);
  g.userData.house=R.i;const front=[],roofs=[],type=R.type,barn=type==='gbarn'||type==='barn',stoneB=S&&S.castle,vx=VOX.on&&!stoneB;
  const B=(m,x,yy,z,sx,sy,sz,list)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(x,yy,z);o.castShadow=o.receiveShadow=true;g.add(o);if(list)list.push(o);return o;};
  const st=S?Math.max(1,S.storeys||1):1,wh1=S&&TALL[type]||(rich?1.5:1.3),wh=wh1+(st-1)*1.25;
  const wall=S?(WALLS[S.wall]||wallMat):rich?wallRich:poor?wallPoor:wallMat,T_=.28,side=R.side||'S',ex=R.exit[0],ez=R.exit[1];
  // walls: one column per border cell, opened for the door and for windows (every other cell, never at a corner)
  const blind=barn||type==='treasury'||type==='warehouse';
  const isWin=(i,n)=>!poor&&!blind&&i>0&&i<n-1&&i%2===0;
  const seg=(x,z,sx,sz,kind,list)=>{ // kind: wall, win, door
    if(kind==='wall'){B(wall,x,y+wh1/2,z,sx,wh1,sz,list);return;}
    const lo=kind==='door'?0:.55,hi=kind==='door'?(barn?1.25:1.05):1.1;
    if(lo>0)B(wall,x,y+lo/2,z,sx,lo,sz,list);B(wall,x,y+(hi+wh1)/2,z,sx,wh1-hi,sz,list);
    if(kind==='win')oldWin(x,y+lo,z,sx>sz,hi-lo,list);};
  // an old window in a wall cell: wall jambs either side of a narrow frame, a sill under it outside and in
  const oldWin=(x,y0,z,gx,hgt,list)=>{const ww=rich?.62:.5,j=(1-ww)/2;for(const sg of [-1,1])B(wall,gx?x+sg*(ww/2+j/2):x,y0+hgt/2,gx?z:z+sg*(ww/2+j/2),gx?j:T_,hgt,gx?T_:j,list);
    B(winMat,x,y0+hgt/2,z,gx?ww:T_+.02,hgt,gx?T_+.02:ww,list).castShadow=false;B(sillMat,x,y0-.03,z,gx?ww+.12:T_+.16,.06,gx?T_+.16:ww+.12,list);};
  const sideKind=(j,isDoor)=>isDoor?'door':isWin(j,hd)&&j===Math.floor(hd/2)?'win':'wall';
  if(!vx){
  for(let i=0;i<hw;i++){const x=hx+i+.5;seg(x,hz+hd-T_/2,1,T_,side==='S'&&hx+i===ex?'door':isWin(i,hw)?'win':'wall',front);seg(x,hz+T_/2,1,T_,isWin(i,hw)?'win':'wall');}
  for(let j=1;j<hd-1;j++){const z=hz+j+.5;seg(hx+T_/2,z,T_,1,sideKind(j,side==='W'&&hz+j===ez));seg(hx+hw-T_/2,z,T_,1,sideKind(j,side==='E'&&hz+j===ez));}
  // the corners: the east and west walls meet the north and south rows, filled the whole height of the house
  // (a ground storey band and the upper band), so no slit opens where two walls or two storeys meet
  for(const x of [hx+T_/2,hx+hw-T_/2])for(const z of [hz+(1+T_)/2,hz+hd-(1+T_)/2]){B(wall,x,y+wh1/2,z,T_,wh1+.02,1-T_+.04);if(st>1)B(wall,x,y+wh1+(wh-wh1)/2,z,T_,wh-wh1+.04,1-T_+.04,roofs);}
  // the upper storeys show outside: a band of wall with its own row of windows, and the beam between floors
  if(st>1){const up=wh-wh1,yc=y+wh1+up/2,ring=[];for(let i=0;i<hw;i++)ring.push([hx+i+.5,hz+hd-T_/2,1,T_,i,hw],[hx+i+.5,hz+T_/2,1,T_,i,hw]);for(let j=1;j<hd-1;j++)ring.push([hx+T_/2,hz+j+.5,T_,1,j,hd],[hx+hw-T_/2,hz+j+.5,T_,1,j,hd]);
    for(const [x,z,sx,sz,i,n] of ring){const win=!blind&&i>0&&i<n-1&&i%2===1;
      if(!win){B(wall,x,yc,z,sx,up,sz,roofs);continue;}
      for(let k=1;k<st;k++){const y0=y+wh1+(k-1)*1.25;B(wall,x,y0+.2,z,sx,.4,sz,roofs);B(wall,x,y0+1.05,z,sx,.4,sz,roofs);oldWin(x,y0+.4,z,sx>sz,.45,roofs);}}
    for(let k=1;k<st;k++){const yb=y+wh1+(k-1)*1.25;for(const [x,z,sx,sz] of [[hx+hw/2,hz+hd-.02,hw,.14],[hx+hw/2,hz+.02,hw,.14],[hx+.02,hz+hd/2,.14,hd],[hx+hw-.02,hz+hd/2,.14,hd]])B(S.wall==='stone'?lam(T.wall,{color:0x8a847a}):beamDark,x,yb,z,sx+.06,.12,sz+.06,roofs);}}
  // timber frame: dark posts and braces over the white plaster
  if(S&&S.wall==='frame'){for(let i=0;i<=hw;i+=2)for(const z of [hz+hd+.005,hz-.005])B(beamDark,hx+Math.min(i,hw-.06)+.03,y+wh/2,z,.08,wh,.03,z>hz?front:null);
    B(beamDark,hx+hw/2,y+wh1*.55,hz+hd+.01,hw,.07,.03,front);}
  for(const[x,z]of[[hx+.1,hz+.1],[hx+hw-.1,hz+.1],[hx+.1,hz+hd-.1],[hx+hw-.1,hz+hd-.1]]){B(stoneB?lam(T.wall,{color:0x8a847a}):lam(T.bark),x,y+wh1/2,z,.18,wh1+.02,.18,z>hz+1?front:null);if(st>1)B(stoneB?lam(T.wall,{color:0x8a847a}):lam(T.bark),x,y+wh1+(wh-wh1)/2,z,.18,wh-wh1+.04,.18,roofs);}
  B(lam(T.bark),hx+hw/2,y+wh1-.06,hz+hd-.02,hw,.12,.12,front);
  // the house stands on a plinth of rough stone (a log sill in a poor place), broken only by the doorway
  if(!stoneB){const pm=poor?lam(T.bark,{color:0x5a4430}):lam(T.wall,{color:rich?0x8a847a:0x7a746c}),ph=rich?.26:.18,o=.05,run=(a0,a1,fixed,alongXs)=>{if(a1-a0<.05)return;
      if(alongXs)B(pm,(a0+a1)/2,y+ph/2-.02,fixed,a1-a0,ph,T_+o*2);else B(pm,fixed,y+ph/2-.02,(a0+a1)/2,T_+o*2,ph,a1-a0);};
    const dW=(barn?.95:.64)/2+.12;
    if(side==='S'){run(hx-o,ex+.5-dW,hz+hd-T_/2,true);run(ex+.5+dW,hx+hw+o,hz+hd-T_/2,true);}else run(hx-o,hx+hw+o,hz+hd-T_/2,true);
    run(hx-o,hx+hw+o,hz+T_/2,true);
    for(const [wx,sd] of [[hx+T_/2,'W'],[hx+hw-T_/2,'E']]){if(side===sd){run(hz+T_,ez+.5-dW,wx,false);run(ez+.5+dW,hz+hd-T_,wx,false);}else run(hz+T_,hz+hd-T_,wx,false);}}}
  let top=y+wh;const cx=hx+hw/2,cz=hz+hd/2;
  if(stoneB){ // castle buildings: a flat lead roof behind battlements; the keep has turrets at its corners
    B(lam(T.stone,{color:0x5a6478}),cx,y+wh+.06,cz,hw-.1,.12,hd-.1,roofs);
    for(let i=0;i<hw;i+=2)for(const z of [hz+.15,hz+hd-.15])B(WALLS.stone,hx+i+.5,y+wh+.3,z,.6,.5,.3,roofs);
    for(let j=1;j<hd-1;j+=2)for(const x of [hx+.15,hx+hw-.15])B(WALLS.stone,x,y+wh+.3,hz+j+.5,.3,.5,.6,roofs);
    if(type==='castle')for(const [x,z] of [[hx+.6,hz+.6],[hx+hw-.6,hz+.6],[hx+.6,hz+hd-.6],[hx+hw-.6,hz+hd-.6]]){B(WALLS.stone,x,y+(wh+1.6)/2,z,1.3,wh+1.6,1.3,roofs);B(lam(T.p[2],{color:0x34467a}),x,y+wh+2.1,z,1.5,.9,1.5,roofs);B(lam(T.p[2],{color:0x34467a}),x,y+wh+2.8,z,.8,.7,.8,roofs);}
    if(type==='castle'){B(lam(T.bark),cx,y+wh+2.2,cz,.1,4,.1,roofs);B(new THREE.MeshLambertMaterial({color:0x8e2a24}),cx+.5,y+wh+3.6,cz,.9,.6,.03,roofs);}
    top=y+wh+.5;}
  else if(!vx){
  // the roof: two slopes meeting at a ridge, wide enough to hang over the walls on every side
  const kind=S?S.roof:rich?(hh<.5?'tiles':'slate'):poor?(hh<.5?'thatch':'turf'):['shingle','tiles','thatch'][Math.floor(hh*3)],alongX=S?!!S.alongX:hash2(hz,hx)<.5,mat=ROOF[kind]||ROOF.shingle;
  const ov=.35,a=.44,span=alongX?hd:hw,len=(alongX?hw:hd)+ov*2,half=span/2+ov,rise=(span/2)*Math.tan(a);top=y+wh+rise;
  const RT=kind==='thatch'||kind==='turf'?.3:.2,trim=lam(T.bark,{color:0x4a3220});
  for(const sg of[-1,1]){const sl=new THREE.Mesh(BOX,mat),L=half/Math.cos(a);sl.scale.set(alongX?len:L,RT,alongX?L:len);
    const off=half/2,yy=top-(half/2)*Math.tan(a)+RT/2;sl.position.set(alongX?cx:cx+sg*off,yy,alongX?cz+sg*off:cz);sl.rotation.set(alongX?sg*a:0,0,alongX?0:-sg*a);sl.castShadow=true;g.add(sl);roofs.push(sl);
    // the eaves board along the low edge, and the barge boards up both gable edges
    const ey=top-half*Math.tan(a)+.02,ed=half-.02;B(trim,alongX?cx:cx+sg*ed,ey,alongX?cz+sg*ed:cz,alongX?len:.07,.16,alongX?.07:len,roofs);
    for(const e of [-1,1]){const bb=new THREE.Mesh(BOX,trim);bb.scale.set(alongX?.08:L+.04,.22,alongX?L+.04:.08);bb.position.set(alongX?cx+e*(len/2+.02):cx+sg*off,yy+.02,alongX?cz+sg*off:cz+e*(len/2+.02));bb.rotation.copy(sl.rotation);bb.castShadow=true;g.add(bb);roofs.push(bb);}}
  B(lam(T.bark,{color:0x5a3a24}),cx,top+.16,cz,alongX?len+.08:.3,.2,alongX?.3:len+.08,roofs);
  // the roof is solid: the space under the slopes is filled out to the gable walls, so no side shows a hollow
  {const n=5;for(let k=0;k<n;k++){const wdt=span*(1-(k+.5)/n)+.02,hgt=rise/n+.01,yy=y+wh+(rise/n)*(k+.5);
    if(alongX)B(wall,cx,yy,cz,hw,hgt,wdt,roofs);else B(wall,cx,yy,cz,wdt,hgt,hd,roofs);}}
  // a small old window up in the gable of a bigger house
  if(!poor&&span>=6){const gy0=y+wh+rise*.22;if(alongX)for(const sg of [-1,1])B(winMat,sg<0?hx-.01:hx+hw+.01,gy0+.2,cz,.04,.4,.34,roofs);else for(const sg of [-1,1])B(winMat,cx,gy0+.2,sg<0?hz-.01:hz+hd+.01,.34,.4,.04,roofs);}
  // dormers on the slope facing the street: a little gabled window with its flower box
  if(!poor&&alongX&&hw>=6&&hash2(hx*7,hz*3)<(rich?.7:.35)){const xs=hw>=9?[cx-hw/4,cx+hw/4]:[cx];
    for(const dx of xs){const zf=cz+span/4+.15,ys=top-(zf-cz)*Math.tan(a),dh=.62,db=zf-(cz+.25);
      B(wall,dx,ys+dh/2-.05,zf-db/2,.86,dh+.1,db,roofs);oldWin(dx,ys+.08,zf-.02,true,.4,roofs);
      for(const sg of [-1,1]){const dr2=new THREE.Mesh(BOX,mat);dr2.scale.set(.62,.12,db+.25);dr2.position.set(dx+sg*.25,ys+dh+.12,zf-db/2+.05);dr2.rotation.set(0,0,-sg*.62);dr2.castShadow=true;g.add(dr2);roofs.push(dr2);}
      B(lam(T.p[1],{color:0x7a5a3a}),dx,ys+.02,zf+.1,.5,.1,.14,roofs);for(let k=0;k<3;k++)B(new THREE.MeshLambertMaterial({color:FLOWERS[(k+Math.floor(hh*9))%FLOWERS.length]}),dx-.15+k*.15,ys+.1,zf+.1,.08,.08,.08,roofs);}}}
  // detailed voxels (?vox=1): walls, windows, gables, roof rows and chimney come from one voxel model, kept in
  // three parts (front wall, the rest, roof and upper storeys) so the roof and front still lift away inside
  let voxOwn=null;if(vx){const kind=S?S.roof:rich?(hh<.5?'tiles':'slate'):poor?(hh<.5?'thatch':'turf'):['shingle','tiles','thatch'][Math.floor(hh*3)],alongX=S?!!S.alongX:hash2(hz,hx)<.5;
    const V=VOX.house({w:hw,d:hd,wh1,st,roof:ROOF[kind]?kind:'shingle',wall:S&&WALLS[S.wall]?S.wall:rich?'frame':poor?'log':'plank',side,door:side==='S'?ex-hx:ez-hz,barn,blind,poor,alongX,chimney:!barn&&!blind&&type!=='temple'}),ms=[];voxOwn=[];
    for(const [k,list,mat] of [['front',front,VOX.MAT],['rest',null,VOX.MAT],['roof',roofs,VOX.MAT],['gfront',front,VOX.GLASS],['grest',null,VOX.GLASS],['groof',roofs,VOX.GLASS]]){const gr=V.G[k];if(gr.hi[0]<0)continue;
      const n=VOX.mesh(gr,1/VOX.N,{noBottom:true}),f=VOX.mesh(VOX.down(gr,2),2/VOX.N,{noBottom:true}),m=new THREE.Mesh(n,mat);m.position.set(hx-V.pad,y,hz-V.pad);m.castShadow=mat===VOX.MAT;m.receiveShadow=true;g.add(m);if(list)list.push(m);voxOwn.push(n,f);ms.push([m,n,f]);}
    top=y+V.top;if(V.chim)g.userData.chimney=new THREE.Vector3(hx-V.pad+V.chim[0],y+V.chim[1],hz-V.pad+V.chim[2]);g.userData.vlod={x:hx+hw/2,z:hz+hd/2,b:[hx,hz,hx+hw,hz+hd],ms,lv:0,k:1};}
  // the door, on its own wall
  const dw=barn?.95:.64,dhh=barn?1.2:.95,dr=makeDoor(dw,dhh),[dcx,dcz]=side==='S'?[ex+.5,hz+hd-.05]:side==='E'?[hx+hw-.05,ez+.5]:[hx+.05,ez+.5];
  dr.g.position.set(dcx,y,dcz);dr.g.rotation.y=side==='S'?0:side==='E'?Math.PI/2:-Math.PI/2;g.add(dr.g);g.userData.door=dr;
  const out=(a,b)=>side==='S'?[dcx+a,hz+hd+b]:side==='E'?[hx+hw+b,dcz-a]:[hx-b,dcz+a]; // a along the wall, b out from it
  {const [x,z]=out(0,.25);B(lam(T.stone),x,y+.02,z,side==='S'?.8:.4,.04,side==='S'?.4:.8);}
  // outside: window boxes with flowers, pots by the door, a lantern, a bench or a woodpile, bushes at the corners
  const fl=(x,yy,z,i)=>B(new THREE.MeshLambertMaterial({color:FLOWERS[(i+Math.floor(hh*9))%FLOWERS.length]}),x,yy,z,.09,.09,.09);
  if(!stoneB&&!barn)for(let i=1;i<hw-1;i++)if(isWin(i,hw)&&hash2(hx+i,hz*7)<(rich?.8:.5)){const x=hx+i+.5,z=hz+hd+.14;B(lam(T.p[1],{color:0x7a5a3a}),x,y+.47,z,.62,.14,.2);for(let k=0;k<3;k++){B(new THREE.MeshLambertMaterial({color:0x4a7a3a}),x-.2+k*.2,y+.57,z,.1,.08,.1);fl(x-.2+k*.2,y+.64,z,i+k);}}
  // a small wooden balcony on the upper floor of some two-storey houses, on brackets, with a railing
  if(st>1&&!stoneB&&!blind&&hh>.45){const i=[...Array(hw).keys()].filter(i=>i>0&&i<hw-1&&i%2===1).sort((a,b)=>Math.abs(a-hw/2)-Math.abs(b-hw/2))[0];
    if(i!=null){const bx=hx+i+.5,bz=hz+hd,by=y+wh1+.02,wd=lam(T.p[1],{color:0x7a5636});B(wd,bx,by,bz+.3,1.5,.08,.6,roofs);
      for(const sg of [-1,1]){const br=B(beamDark,bx+sg*.6,by-.22,bz+.18,.08,.42,.08,roofs);br.rotation.x=-.6;}
      for(let k=0;k<6;k++)B(wd,bx-.65+k*.26,by+.24,bz+.56,.05,.42,.05,roofs);B(wd,bx,by+.46,bz+.56,1.5,.06,.08,roofs);for(const sg of [-1,1])B(wd,bx+sg*.72,by+.46,bz+.3,.06,.06,.56,roofs);
      B(lam(T.p[1],{color:0x7a5a3a}),bx,by+.5,bz+.6,.6,.1,.12,roofs);for(let k=0;k<3;k++)fl(bx-.18+k*.18,by+.58,bz+.6,k+i).userData.r=1;}}
  if(!stoneB&&!barn)for(const sg of[-1,1]){const [x,z]=out(sg*.75,.3);B(lam(T.stone,{color:0xa8603a}),x,y+.12,z,.24,.24,.24);B(new THREE.MeshLambertMaterial({color:0x3e7a3a}),x,y+.32,z,.2,.18,.2);if(!poor)fl(x,y+.45,z,sg+2);}
  if(!poor&&!barn){const [lx,lz]=out((hh<.5?-1:1)*.45,.12);B(lam(T.bark),lx,y+1.15,lz,.06,.06,.06);B(new THREE.MeshBasicMaterial({color:0xffc86a}),lx,y+1.02,lz,.12,.16,.12);B(lam(T.stone,{color:0x2a2a2e}),lx,y+1.12,lz,.15,.04,.15);}
  if(!stoneB)for(const[x,z]of[[hx-.2,hz+hd-.4],[hx+hw+.2,hz+.6]])if(hash2(x*3,z)<.7&&!(side==='W'&&x<hx&&Math.abs(z-dcz)<1.5)&&!(side==='E'&&x>hx+hw&&Math.abs(z-dcz)<1.5)){const s=.3+hash2(z,x)*.1;B(new THREE.MeshLambertMaterial({color:0x3e6a32}),x,y+s/2,z,s,s,s);if(rich)fl(x,y+s+.04,z,3);}
  if(!poor&&!stoneB&&!barn&&side==='S'&&hash2(hz,hx*5)<(rich?.9:.45))for(let i=0;i<hw;i++)if(Math.abs(hx+i-ex)>1){const x=hx+i+.5,z=hz+hd+.2;B(lam(T.dirt,{color:0x5a4030}),x,y+.04,z,1,.08,.26);fl(x-.25,y+.12,z,i);fl(x+.15,y+.12,z,i+1);
    // a low border of stones round the bed, or a little picket fence in front of it
    if(hh<.5)B(lam(T.wall,{color:0x9a948a}),x,y+.06,z+.15,1,.1,.06);else for(let k=0;k<3;k++)B(lam(T.p[1],{color:0xb8a080}),x-.33+k*.33,y+.16,z+.15,.05,.3,.05);}
  else if(!poor&&hh>.4&&!stoneB&&side!=='E'){for(let k=0;k<3;k++)B(lam(T.bark,{color:0x8a6a44}),hx+hw+.25,y+.12+k*.2,hz+hd-1.5,.3,.18,1.2);}
  // a chimney on the back slope, smoking
  if(!vx&&!barn&&!blind&&!stoneB&&type!=='temple'){const alongX=S?!!S.alongX:hash2(hz,hx)<.5,chx=alongX?hx+hw*.72:hx+hw*.3,chz=alongX?hz+hd*.3:hz+hd/2,lo=y+wh-.1,hi=top+.45;B(lam(T.wall,{color:0x8a847a}),chx,(lo+hi)/2,chz,.42,hi-lo,.42,roofs);B(lam(T.wall,{color:0x6a645c}),chx,hi+.05,chz,.5,.1,.5,roofs);g.userData.chimney=new THREE.Vector3(chx,hi+.1,chz);}
  // a temple has a square bell tower at its back end with a pointed roof; a mill a wheel in the water
  if(type==='temple'){const tx=hx+hw/2,tz=hz+1.2,th=wh+2.6;B(WALLS.stone,tx,y+th/2,tz,1.8,th,1.8,roofs);B(lam(T.stone,{color:0x5a6478}),tx,y+th+.5,tz,2,.9,2,roofs);B(lam(T.stone,{color:0x5a6478}),tx,y+th+1.2,tz,1.1,.7,1.1,roofs);B(lam(T.stone,{color:0x5a6478}),tx,y+th+1.75,tz,.4,.6,.4,roofs);
    B(new THREE.MeshLambertMaterial({color:0xc8a040}),tx,y+th-.5,tz+.92,.4,.45,.05,roofs);}
  if(type==='mill'&&S.river){const [rx,rz]=S.river,wx=Math.min(Math.max(rx+.5,hx-.4),hx+hw+.4),wz=Math.min(Math.max(rz+.5,hz-.4),hz+hd+.4),gx=Math.abs(wx-(hx+hw/2))>Math.abs(wz-(hz+hd/2));
    const wheel=new THREE.Group();wheel.position.set(wx,y+.5,wz);if(!gx)wheel.rotation.y=Math.PI/2;g.add(wheel);for(let k=0;k<8;k++){const o=new THREE.Mesh(BOX,lam(T.p[1],{color:0x6a4a2a}));o.scale.set(.12,1.7,.4);o.rotation.x=k*Math.PI/8;wheel.add(o);}
    const hub=new THREE.Mesh(BOX,ironMat);hub.scale.set(.3,.3,.5);wheel.add(hub);g.userData.wheel=wheel;}
  if(type==='tannery'){for(let k=0;k<3;k++){const [x,z]=out(1.6+k*.8,.7);B(lam(T.p[1],{color:0x6a4a30}),x,y+.25,z,.6,.5,.6);B(new THREE.MeshLambertMaterial({color:[0x6a4a2a,0x8a3a2a,0x4a5a3a][k]}),x,y+.5,z,.5,.02,.5);}}
  if(type==='warehouse'){for(let k=0;k<3;k++){const [x,z]=out(-1.8-k*.7,.5);if(vx)g.add(voxProp('crate',x,y,z,k));else B(lam(T.crate),x,y+.3,z,.6,.6,.6);}}
  if(type==='inn'){const [x,z]=out(1.6,.5);B(lam(T.bark),x,y+1.1,z,.1,2.2,.1);B(lam(T.p[1],{color:0x6a4a2a}),x,y+1.75,z,.62,.5,.06);B(new THREE.MeshLambertMaterial({color:0xd8a040}),x,y+1.75,z+.035,.22,.26,.02);}
  if(barn){const [x,z]=out(1.4,.5);for(let k=0;k<2;k++)B(lam(T.p[1],{color:0xc8b070}),x,y+.2+k*.4,z,.7,.38,.6);}
  // a shop hangs a painted board by its door: an anvil, a loaf or a sack
  if(R.shop){const [sx,sz]=out(1.9,.15);B(lam(T.bark),sx,y+.9,sz,.1,1.8,.1);B(lam(T.bark),sx,y+1.72,sz,.1,.08,.6);B(lam(T.p[1],{color:0x8a6a4a}),sx,y+1.42,sz,side==='S'?.5:.05,.4,side==='S'?.05:.5);
    B(new THREE.MeshLambertMaterial({color:{smith:0x4a4e56,baker:0xc89048,store:0x9a7a4a}[R.shop]}),sx+(side==='S'?0:.03),y+1.42,sz+(side==='S'?.03:0),side==='S'?.3:.02,.2,side==='S'?.02:.3);}
  // Заводь's trades show outside, all against the wall so the street stays free: the tavern's sign on a bracket
  // and lanterns, the smith's furnace glow, the elder's banners, hay by the barn, herbs drying under the eaves
  if(S&&S.zavod){const Lm=c=>new THREE.MeshLambertMaterial({color:c}),wf=hz+hd;
    if(type==='tavern'){const sx=dcx+1.4;B(lam(T.bark),sx,y+1.9,wf+.35,.08,.08,.7);B(lam(T.p[1],{color:0x6a4a2a}),sx,y+1.6,wf+.6,.62,.5,.06);B(Lm(0xd8a040),sx,y+1.6,wf+.635,.22,.26,.02);B(Lm(0xf0e8d0),sx,y+1.75,wf+.64,.24,.06,.02);
      for(const sg of [-1,1])B(new THREE.MeshBasicMaterial({color:0xffc86a}),dcx+sg*.7,y+1.3,wf+.06,.12,.16,.1);for(const sg of [-1,1]){if(vx)g.add(voxProp('barrel',dcx+sg*2.6,y,wf+.25,sg));else B(lam(T.p[1],{color:0x8a6a4a}),dcx+sg*2.6,y+.25,wf+.25,.4,.5,.4);}}
    if(type==='forge')B(new THREE.MeshBasicMaterial({color:0xff7a2a}),hx+.8,y+.5,wf+.02,.6,.4,.04);
    if(type==='hall')for(const sg of [-1,1]){B(lam(T.bark),dcx+sg*1.4,y+1.2,wf+.05,.06,1.2,.06);B(Lm(0x2a4a8a),dcx+sg*1.4,y+1.35,wf+.08,.4,.8,.02);B(Lm(0xd8b04a),dcx+sg*1.4,y+1.4,wf+.095,.14,.14,.01);}
    if(type==='barn')for(let k=0;k<3;k++)B(lam(T.p[1],{color:0xc8b070}),hx+hw-.8,y+.2+k*.36,wf+.2,.7,.34,.36);
    if(type==='herb')for(let k=0;k<4;k++)B(Lm([0x5a8a3a,0x8a6a9a,0xb8a040,0x4a7a4a][k]),hx+1+k*.5,y+wh1-.25,wf+.12,.12,.3,.08);}
  worldUV(g);mergeHouse(g,front,roofs);g.userData.front=front;g.userData.roofs=roofs;scene.add(g);
  if(!R.group)buildRoom(R);R.group.visible=true;liveHouse(g);
  if(voxOwn){g.userData.own.push(...voxOwn);g.userData.lists.push(VOX.LIVE);VOX.LIVE.push(g);}return g;}
// a small voxel prop (barrel, crate) as its own mesh, centred on x,z, standing on y
function voxProp(name,x,y,z,ry=0){const a=VOX.asset(name,()=>VOX[name](),1/16),m=new THREE.Mesh(a.near,VOX.MAT);m.position.set(x,y,z);m.rotation.y=ry;m.castShadow=m.receiveShadow=true;return m;}
// voxel props of a chunk as instanced meshes, one per model; each shares its model's buffers but culls by the
// chunk's own sphere, and swaps to the model's far version away from the camera
function voxInstanced(list,pickA,place,mat=VOX.MAT){const out=[];if(!list.length)return out;
  for(const part of chunk(list))defer(chunkKey(Math.floor(part[0][0]),Math.floor(part[0][1])),()=>{const grp=new THREE.Group(),by=new Map(),ms=[];let x0=1e9,z0=1e9,x1=-1e9,z1=-1e9;
    for(const c of part){const a=pickA(c);(by.get(a)||by.set(a,[]).get(a)).push(c);x0=Math.min(x0,c[0]);z0=Math.min(z0,c[1]);x1=Math.max(x1,c[0]+1);z1=Math.max(z1,c[1]+1);}
    const sph=new THREE.Sphere(new THREE.Vector3((x0+x1)/2,2,(z0+z1)/2),Math.hypot(x1-x0,z1-z0)/2+4);
    for(const [a,cs] of by){const n=VOX.wrap(a.near,sph),md=VOX.wrap(a.mid,sph),f=VOX.wrap(a.far,sph),im=new THREE.InstancedMesh(n,mat,cs.length);
      cs.forEach((c,i)=>{place(c,i,m4);im.setMatrixAt(i,m4);const v=.86+hash2(c[0]*7,c[1]*3)*.24;im.setColorAt(i,tmpCol.setRGB(v,v,v*.97));});im.castShadow=im.receiveShadow=true;grp.add(im);ms.push([im,n,md,f]);}
    grp.userData.vlod={x:(x0+x1)/2,z:(z0+z1)/2,b:[x0,z0,x1,z1],ms,lv:0,k:1};grp.userData.lists=[out,VOX.LIVE];scene.add(grp);out.push(grp);VOX.LIVE.push(grp);return grp;});return out;}
// A house is drawn from about a hundred boxes; boxes of one look that hide together (the front wall, the roof, the
// rest) are merged into one mesh, so a street of houses costs a few draw calls each. The door, the mill wheel and
// anything that moves stay apart. The merged geometry is the house's own and is freed when its chunk goes.
function mergeHouse(g,front,roofs){const tag=new Map();front.forEach(m=>tag.set(m,'f'));roofs.forEach(m=>tag.set(m,'r'));const groups=new Map();
  for(const m of g.children){if(!m.isMesh||m.geometry!==BOX)continue;const t=m.material;
    const k=(t.map?t.map.uuid:'-')+'|'+t.color.getHex()+'|'+(t.emissive?t.emissive.getHex()+':'+t.emissiveIntensity:'')+'|'+t.type+'|'+!!t.transparent+'|'+(tag.get(m)||'')+'|'+m.castShadow;
    (groups.get(k)||groups.set(k,[]).get(k)).push(m);}
  const own=[],P=BOX.attributes.position.array,N=BOX.attributes.normal.array,U=BOX.attributes.uv.array,IX=BOX.index.array,nv=P.length/3,v=new THREE.Vector3(),nm=new THREE.Matrix3();
  for(const ms of groups.values()){if(ms.length<2)continue;
    const pos=new Float32Array(ms.length*P.length),nor=new Float32Array(ms.length*N.length),uv=new Float32Array(ms.length*U.length),idx=new (ms.length*nv>65535?Uint32Array:Uint16Array)(ms.length*IX.length);
    ms.forEach((m,j)=>{m.updateMatrix();nm.getNormalMatrix(m.matrix);for(let i=0;i<nv;i++){v.fromArray(P,i*3).applyMatrix4(m.matrix).toArray(pos,(j*nv+i)*3);v.fromArray(N,i*3).applyMatrix3(nm).normalize().toArray(nor,(j*nv+i)*3);}
      uv.set(U,j*U.length);for(let i=0;i<IX.length;i++)idx[j*IX.length+i]=IX[i]+j*nv;});
    const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pos,3));geo.setAttribute('normal',new THREE.BufferAttribute(nor,3));geo.setAttribute('uv',new THREE.BufferAttribute(uv,2));geo.setIndex(new THREE.BufferAttribute(idx,1));geo.computeBoundingSphere();
    const o=new THREE.Mesh(geo,ms[0].material);o.castShadow=ms[0].castShadow;o.receiveShadow=true;g.add(o);own.push(geo);
    const t=tag.get(ms[0]),L=t==='f'?front:t==='r'?roofs:null;for(const m of ms){g.remove(m);if(L)L.splice(L.indexOf(m),1);}if(L)L.push(o);}
  g.userData.own=own;}
for(const h of GEN_HOUSES)defer(chunkKey(h[0],h[1]),()=>genHouse(h));
// Заводь's six houses in layout 2: hollow like the rest, each in its own walls and roof, with the signs of its trade outside
const ZAVOD={tavern:{wall:'frame',roof:'tiles'},forge:{wall:'stone',roof:'slate',alongX:true},home:{wall:'log',roof:'thatch'},hall:{wall:'frame',roof:'slate'},barn:{wall:'plank',roof:'shingle',alongX:true},herb:{wall:'log',roof:'turf'}};
if(LAYOUT>=2)HOUSES.forEach(([hx,hz,hw,hd],i)=>{const R=ROOMS[i],h=Object.assign([hx,hz,hw,hd,R.place],{room:R,spec:Object.assign({side:'S',off:Math.floor(hw/2),storeys:1,zavod:true},ZAVOD[R.type])});defer(chunkKey(hx,hz),()=>genHouse(h));});
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
  g.userData.house=PALACE[0].room.i;worldUV(g);scene.add(g);return liveHouse(g);});
// ---------- layout 2: what stands between the houses: walls and gates, fences, wells, gardens, fields, graves ----------
if(SETTLE){const P=SETTLE,stoneM=lam(T.wall,{color:0xb8b0a4}),darkM=lam(T.wall,{color:0x8a847a}),roofB=lam(T.p[2],{color:0x34467a}),wood=lam(T.bark,{color:0x7a5a38}),woodL=lam(T.p[1],{color:0x9a7a50});[stoneM,darkM,roofB,wood,woodL].forEach(pixelMat);
 const gy=(x,z)=>groundAt(x,z),blocked=c=>solid.has(c[0]+','+c[1]);
 // the town wall: stone two and a half cells high, battlements on every other cell
 const castleCell=(x,z)=>P.castle&&x>=P.castle.x&&x<P.castle.x+P.castle.w&&z>=P.castle.z&&z<P.castle.z+P.castle.d;
 const tw=P.walls.filter(c=>!castleCell(c[0],c[1]));
 instanced(BOX,stoneM,tw,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+1.25,z+.5),q0,v2.set(1,2.5,1)));
 instanced(BOX,darkM,tw.filter(([x,z])=>(x+z)%2===0),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+2.75,z+.5),q0,v2.set(.8,.5,.8)));
 // the castle's curtain wall is higher, with round-topped towers at its corners and a gatehouse
 if(P.castle){const c=P.castle,cw=[];for(let z=c.z;z<c.z+c.d;z++)for(let x=c.x;x<c.x+c.w;x++)if(at(x,z)==='W')cw.push([x,z]);
   // the big castle (layout 3): walls two cells thick and higher, a walk along their top behind the battlements
   const thick=c.thick||1,CWH=thick>1?5:3.6,outer=([x,z])=>x===c.x||x===c.x+c.w-1||z===c.z||z===c.z+c.d-1;
   instanced(BOX,stoneM,cw,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+CWH/2,z+.5),q0,v2.set(1,CWH,1)));
   instanced(BOX,darkM,cw.filter(c2=>(thick<2||outer(c2))&&(c2[0]+c2[1])%2===0),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+CWH+.25,z+.5),q0,v2.set(.85,.5,.85)));
   const tower=(x,z,r,h)=>defer(chunkKey(x,z),()=>{const g=new THREE.Group(),y=gy(Math.floor(x),Math.floor(z));const B=(m,yy,s,hh)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(s,hh,s);o.position.set(x,y+yy,z);o.castShadow=o.receiveShadow=true;g.add(o);};
     B(stoneM,h/2,r,h);B(darkM,h+.2,r+.3,.4);B(roofB,h+.8,r+.2,.8);B(roofB,h+1.5,r*.65,.7);B(roofB,h+2.1,r*.3,.6);worldUV(g);scene.add(g);return g;});
   if(thick<2){for(const [x,z] of [[c.x+1,c.z+1],[c.x+c.w-1,c.z+1],[c.x+1,c.z+c.d-1],[c.x+c.w-1,c.z+c.d-1]])tower(x,z,2.4,5.2);
     for(const gx of [c.gate[0]-.5,c.gate[1]+1.5])tower(gx,c.z+c.d-.5,1.8,4.8);}
   else{// great round-topped towers at the corners and halfway along every wall, two tall ones flanking the gate
     for(const [x,z] of [[c.x+1.5,c.z+1.5],[c.x+c.w-1.5,c.z+1.5],[c.x+1.5,c.z+c.d-1.5],[c.x+c.w-1.5,c.z+c.d-1.5]])tower(x,z,3.6,7.6);
     for(const [x,z] of [[c.x+1,c.z+c.d/2],[c.x+c.w-1,c.z+c.d/2],[c.x+c.w*.27,c.z+1],[c.x+c.w*.73,c.z+1]])tower(x,z,2.6,6.6);
     for(const gx of [c.gate[0]-1,c.gate[1]+2])tower(gx,c.z+c.d-1,2.6,7.2);}
   defer(chunkKey(c.gate[0],c.z+c.d),()=>{const g=new THREE.Group(),y=gy(c.gate[0],c.z+c.d-1),mx=c.gate[0]+1.5,z=c.z+c.d-thick/2,big=thick>1;const B=(m,x,yy,zz,a,b,d)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(a,b,d);o.position.set(x,y+yy,zz);o.castShadow=true;g.add(o);};
     B(stoneM,mx,big?4.2:3.3,z,3.2,big?1.6:1.2,thick);if(big){B(darkM,mx,5.25,z,3.4,.5,thick+.1);for(let k=0;k<5;k++)B(ironMat,mx-1.2+k*.6,2.95,z+thick/2-.1,.06,1,.06);}B(darkM,mx,2.6,z+thick/2+.02,2.8,.2,.05);for(const sg of[-1,1]){B(wood,mx+sg*(big?2.5:2.4),3.2,z+(big?1.32:thick/2)+.1,.08,2.2,.08);B(new THREE.MeshLambertMaterial({color:0x8e2a24}),mx+sg*(big?2.5:2.4),3.3,z+(big?1.32:thick/2)+.15,.7,1.5,.03);B(new THREE.MeshLambertMaterial({color:0xd8b04a}),mx+sg*(big?2.5:2.4),3.5,z+(big?1.32:thick/2)+.17,.26,.26,.01);}
     worldUV(g);scene.add(g);return g;});}
 // gates through the town wall: a tower on each side of the road; through a palisade, two tall posts
 for(const gt of P.gates){const cells=gt.cells,ends=[];for(const [x,z] of cells)for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]])if((at(x+dx,z+dz)==='W'||P.palisade.some(p=>p[0]===x+dx&&p[1]===z+dz))&&!cells.some(c=>c[0]===x+dx&&c[1]===z+dz))ends.push([x+dx,z+dz]);
   for(const [x,z] of ends.slice(0,2))defer(chunkKey(x,z),()=>{const y=gy(x,z),o=new THREE.Mesh(BOX,gt.pal?wood:stoneM);o.scale.set(gt.pal?.35:1.4,gt.pal?2.6:3.6,gt.pal?.35:1.4);o.position.set(x+.5,y+(gt.pal?1.3:1.8),z+.5);o.castShadow=true;scene.add(o);
     const r=new THREE.Mesh(BOX,gt.pal?wood:roofB);r.scale.set(gt.pal?.5:1.6,gt.pal?.2:.9,gt.pal?.5:1.6);r.position.set(x+.5,y+(gt.pal?2.7:4),z+.5);r.castShadow=true;scene.add(r);return [o,r];});}
 // a palisade of sharpened logs round a rich village
 const pal=P.palisade.filter(blocked);
 instanced(BOX,lam(T.bark,{color:0x8a6a48}),pal,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.85,z+.5),qY(hash2(x,z)*.4),v2.set(.42,1.7,.42)));
 instanced(new THREE.ConeGeometry(.24,.4,4),lam(T.bark,{color:0xa08060}),pal,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+1.9,z+.5),qY(.78),v2.set(1,1,1)));
 // fences round yards: posts and two rails along the yard's edge
 const fen=P.fences.filter(blocked);
 if(VOX.on)voxInstanced(fen,()=>VOX.asset('fence',()=>VOX.fence(),1/16),([x,z,d],i,m)=>m.compose(v1.set(x+.5,gy(x,z),z+.5),qY(d==='x'?0:Math.PI/2),v2.set(1,1,1)));
 else instanced(BOX,wood,fen,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.35,z+.5),q0,v2.set(.12,.7,.12)));
 if(!VOX.on)for(const yy of [.3,.58])instanced(BOX,woodL,fen,([x,z,d],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+yy,z+.5),q0,v2.set(d==='x'?1:.06,.07,d==='x'?.06:1)),false);
 // wells: a stone ring, two posts, a little roof and a bucket; troughs in the castle court
 const wl=[...(VOX.on?[]:P.wells),...P.props.filter(p=>p.k==='trough').map(p=>[p.x,p.z,'t'])];
 instanced(BOX,stoneM,wl,([x,z,t],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+(t?.2:.3),z+.5),q0,v2.set(t?.9:.86,t?.4:.6,t?.5:.86)));
 instanced(BOX,lam(T.water),wl,([x,z,t],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+(t?.41:.61),z+.5),q0,v2.set(t?.75:.6,.02,t?.35:.6)),false);
 const wells=P.wells;
 if(!VOX.on)for(const sg of [-1,1])instanced(BOX,wood,wells,([x,z],i,m)=>m.compose(v1.set(x+.5+sg*.38,gy(x,z)+.85,z+.5),q0,v2.set(.08,1.1,.08)));
 if(!VOX.on)instanced(BOX,ROOF.shingle,wells,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+1.45,z+.5),q0,v2.set(1.1,.12,.9)));
 if(!VOX.on)instanced(BOX,lam(T.p[1],{color:0x6a4a2a}),wells,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+1.0,z+.5),q0,v2.set(.18,.2,.18)),false);
 // market stalls: a counter under a striped awning
 if(VOX.on){voxInstanced(P.stalls,()=>VOX.asset('stall',()=>VOX.stall(),1/16),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z),z+.5),q0,v2.set(1,1,1)));voxInstanced(P.wells,()=>VOX.asset('well',()=>VOX.well(),1/16),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z),z+.5),q0,v2.set(1,1,1)));}
 if(!VOX.on)instanced(BOX,lam(T.p[1],{color:0x8a6a44}),P.stalls,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.4,z+.5),q0,v2.set(.95,.8,.6)));
 if(!VOX.on)for(const [k,c] of [[0,0xb8503a],[1,0xe8dcc0]])instanced(BOX,new THREE.MeshLambertMaterial({color:c}),P.stalls,([x,z],i,m)=>m.compose(v1.set(x+.5+(k-.5)*.3,gy(x,z)+1.35,z+.5),q0,v2.set(.3,.08,1)),false);
 if(!VOX.on)instanced(BOX,new THREE.MeshLambertMaterial({color:0xc89048}),P.stalls,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.84,z+.5),q0,v2.set(.6,.08,.3)),false);
 // graves behind the temple
 instanced(BOX,lam(T.stone,{color:0x9a968c}),P.graves,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.25,z+.4),qY((hash2(x,z)-.5)*.3),v2.set(.45,.5,.12)));
 // gardens and fields: rows of crops on tilled soil; the fields ripen in three colours, strip by strip
 const crop=[0x6a9a3a,0xc8a848,0x8aa84a];
 instanced(BOX,new THREE.MeshLambertMaterial({color:0x4e8a3a}),P.gardens,([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.08,z+.5),q0,v2.set(.7,.16,.25)),false);
 crop.forEach((c,k)=>instanced(BOX,sway(new THREE.MeshLambertMaterial({color:c}),.03,1),P.fields.filter(f=>f[2]===k),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.14,z+.5),q0,v2.set(.92,.28,.7)),false));
 // small things of a yard and a quarry
 const PR=(k)=>P.props.filter(p=>p.k===k).map(p=>[p.x,p.z]);
 for(let j=0;j<3;j++)instanced(BOX,lam(T.bark,{color:0x8a6a44}),PR('woodpile'),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.15+j*.2,z+.5),q0,v2.set(.8,.18,.35)));
 instanced(BOX,wood,PR('cross'),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.7,z+.5),q0,v2.set(.12,1.4,.12)));
 instanced(BOX,wood,PR('cross'),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+1.05,z+.5),q0,v2.set(.6,.1,.1)),false);
 instanced(BOX,stoneM,PR('blocks'),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.3,z+.5),qY(hash2(x,z)),v2.set(.9,.6,.7)));
 instanced(BOX,lam(T.moss||T.dirt,{color:0x3a2a1e}),PR('peat'),([x,z],i,m)=>m.compose(v1.set(x+.5,gy(x,z)+.2,z+.5),qY(hash2(x,z)),v2.set(.8,.4,.6)));
 for(const pr of P.props.filter(p=>['crane','cart','shed'].includes(p.k)))defer(chunkKey(pr.x,pr.z),()=>{const g=new THREE.Group(),y=gy(pr.x,pr.z),x=pr.x+.5,z=pr.z+.5;const B=(m,a,b,c,sx,sy,sz,rz=0)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(sx,sy,sz);o.position.set(a,y+b,c);o.rotation.z=rz;o.castShadow=true;g.add(o);};
   if(pr.k==='crane'){B(wood,x,1.4,z,.2,2.8,.2);B(wood,x+.6,2.6,z,1.6,.14,.14,-.3);B(ironMat,x+1.3,1.9,z,.02,1.2,.02);B(stoneM,x+1.3,1.2,z,.4,.3,.3);}
   if(pr.k==='cart'){B(woodL,x,.45,z,1,.12,.6);for(const sg of[-1,1])B(lam(T.bark,{color:0x4a3020}),x+sg*.35,.25,z+.34,.5,.5,.06);B(stoneM,x,.65,z,.6,.3,.4);}
   if(pr.k==='shed'){for(const [a,c] of [[-.4,-.4],[.4,-.4],[-.4,.4],[.4,.4]])B(wood,x+a,.6,z+c,.08,1.2,.08);B(ROOF.shingle,x,1.25,z,1.2,.1,1.2);B(stoneM,x,.25,z,.6,.5,.5);}
   scene.add(g);return g;});
 // planks out over the water at the port, on posts
 instanced(BOX,lam(T.bark),P.piers,([x,z],i,m)=>m.compose(v1.set(x+.5,.2,z+.5),q0,v2.set(.14,.6,.14)));}
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
[[22,28],[22,29],[30,32],[17,31],[35,30]].forEach(([x,z],i)=>OUT.push([[VOX.on?(()=>{const m=voxProp('crate',x+.5,groundAt(x,z),z+.5,hash2(x,z)*.6);scene.add(m);blockCell(x,z);return m;})():solidBox(x,z,.45,.45,.45,lam(T.crate))],'Ящик',i===2?'Среди соломы — пара гладких камней.':'Пустой ящик из-под рыбы.',i===2?[['stone',2]]:null]));
// boat at the dock
{const g=new THREE.Group(),hull=lam(T.p[1],{color:0x8a6a4a});for(const [x,w] of [[0,1.6],[0,1.8]]){const m=new THREE.Mesh(BOX,hull);m.scale.set(w,.25,.8);m.position.set(1.6,.2,Z.dock[1]-1.2);g.add(m);}scene.add(g);}

// ---------- lights: moon + a few warm points ----------
const hemi=new THREE.HemisphereLight(0x6a7fa0,0x2a2018,.75);scene.add(hemi);
const moon=new THREE.DirectionalLight(0x9fb4d8,.6);moon.castShadow=true;moon.shadow.mapSize.set(1024,1024);moon.shadow.bias=-.0008;moon.shadow.normalBias=.035;Object.assign(moon.shadow.camera,{left:-11,right:11,top:11,bottom:-11});scene.add(moon,moon.target);
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
  goblin:{name:'Гоблин',hp:7,ac:15,atk:4,dmg:6,dmgB:2,atkName:'Короткий лук',range:6,long:10,speed:6,perc:9,dex:2,wis:-1,ath:-1,spd:2.6},
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
const occupied=(x,z,self)=>actors.some(a=>a!==self&&!a.dead&&!a.hidden&&a.x===x&&a.z===z&&!(self===H0&&!CB.on&&(!a.enemy||a.calm)));
function path(sx,sz,tx,tz,self,adjacent=false,limit=900){const key=(x,z)=>x+','+z,prev=new Map([[key(sx,sz),null]]),q=[[sx,sz]];let end=null;
  while(q.length&&prev.size<limit){const[x,z]=q.shift();if(adjacent?Math.abs(x-tx)+Math.abs(z-tz)===1:(x===tx&&z===tz)){end=[x,z];break;}
    for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!free(nx,nz)||occupied(nx,nz,self)||prev.has(key(nx,nz)))continue;prev.set(key(nx,nz),[x,z]);q.push([nx,nz])}}
  if(!end)return null;const out=[];let c=end;while(c){out.unshift(c);c=prev.get(key(c[0],c[1]))}return out.slice(1)}
const ray=new THREE.Raycaster(),mv=new THREE.Vector2();
const adj=(a,x,z)=>Math.abs(a.x-x)+Math.abs(a.z-z)===1;
// walk next to (or onto) a target cell, then run the action
function goDo(x,z,onto,fn){if(onto?(H0.x===x&&H0.z===z):adj(H0,x,z)){H0.route=null;fn();return;}
  const p=path(H0.x,H0.z,x,z,H0,!onto,3000);if(p&&p.length){H0.route=p;H0.dest=onto?[x,z]:p[p.length-1];H0.arrive=fn;}else hint.textContent='Не найти дорогу туда.';}
function tapActor(a){if(a===H0)return heroWheel();if(a.ally&&a.down&&a.state!=='grave')return allyWheel(a);if(a.enemy)return enemyWheel(a);if(a.npc)return npcWheel(a);}
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
  if(at(tx,tz)==='E'&&!inPlaceAt(tx,tz)){goDo(tx,tz,true,leaveRoom);return;}
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
  talkEl.onclick=()=>{if(i<chars.length){i=chars.length;all();}};
  talkPortrait(who,text,()=>i<chars.length);}
talkEl.addEventListener('pointerdown',e=>e.stopPropagation());
let questFocus=null;
const Q={fire:{state:0,left:1,title:'Разжечь огонь часовни в руинах'},dead:{state:0,need:'Скелет',left:3,title:'Упокоить мертвецов в руинах и на кладбище'},band:{state:0,need:'Разбойник',left:2,title:'Прогнать разбойников из леса'},wolf:{state:0,need:'Волк',left:2,title:'Убить волков, что режут сети'}};
function questUI(){if(tutUI())return;
  if(TUT.step>=0&&Q.dead.state===0&&!Object.values(Q).some(q=>q.state===1||q.state===2)){questEl.hidden=false;questEl.innerHTML='<div class="one">Цель: расспросить Брама о беде острова</div>';return;}const act=Object.values(Q).filter(q=>q.state===1||q.state===2).concat(jobQuests());questEl.hidden=!act.length;
  const rows=act.map(q=>'<div class="'+(q.state===2?'done':'')+'">'+q.title+(q.state===1?(q.job||q.need==='Атаман Ворон'||q===Q.ship?'':' · осталось '+q.left):(q.job?' · за платой':' · вернитесь за наградой'))+'</div>');
  // folded: one line with the first task and how many there are; tap opens the list
  questEl.innerHTML='<div class="qhead'+(qFolded()?' fold':'')+'" role="button" tabindex="0" aria-expanded="'+!qFolded()+'">Задания · '+act.length+CHEV+'</div>'+(qFolded()?rows.slice(0,1).join('').replace('<div class="','<div class="one '):rows.join(''));
  const h=questEl.querySelector('.qhead');if(h)h.onclick=qToggle;}
function questKill(e){repKill(e);for(const q of Object.values(Q))if(q.need===(e.kind||e.name)&&q.left>0&&(!q.at||Math.hypot(e.home[0]-q.at.x,e.home[1]-q.at.z)<14)){q.left--;if(q.left===0&&q.state===1)q.state=2;}questUI();}
function reward(q,items,line,who){q.state=3;gainXP(100);if(q.at)repAdd('kingdom',q.rep||1,'помощь королевству');else repAdd('village',2,'помощь деревне');{const k=Object.keys(Q).find(k=>Q[k]===q);const gg=q.gold||QUEST_GOLD[k];if(gg)setTimeout(()=>addGold(gg,'Награда'),600);}window.handsGive&&window.handsGive(items,'Награда');questUI();say(who,line+' Получено: '+items.map(([id,n])=>window.handsItemName(id).toLowerCase()+' ×'+n).join(', ')+'.');}
function offer(q,who,ask,ok,done,items){if(q.state===3)return say(who,done);
  if(q.state===2)return reward(q,items,ok,who);if(q.state===1)return say(who,'Ну что? '+q.title+' — ещё '+q.left+'.');
  if(q.left===0){q.state=2;return reward(q,items,ok,who);}
  say(who,ask,[['Берусь',()=>{q.state=1;questFocus=q;questUI();say(who,'Да хранит тебя море.');}]]);}
function talk(a){window.talkWho=a;a.face=Math.atan2(H0.px-a.px,H0.pz-a.pz);H0.face=Math.atan2(a.px-H0.px,a.pz-H0.pz);const n=a.npc;
  if(!tutOn()&&jobDeliverTo(a))return;
  // the tutorial's own lines first
  if(tutOn()){const s=TUT.step;
    if(a.talkId==='fisher'&&!TUT.flags.olav){TUT.flags.olav=1;window.handsGive([['fish',1]],'Подарок');return say(n,'Добро пожаловать на Хельгу! Я Олав. Будь другом, отнеси эту рыбу Браму в таверну — он ждёт с утра. Деревня прямо по дороге.');}
    if(a.talkId==='bram'&&s===5){if(window.handsCount('fish'))window.handsConsume('fish');TUT.flags.bram=1;window.handsGive([['bread',1]],'Спасибо');
      return say(n,'Рыба от Олава? Вот спасибо! Слушай, раз уж ты здесь: в амбаре через площадь завелась крыса размером с собаку. Прогонишь — расскажу, что творится на острове.');}
    if(a.talkId==='bram'&&s===7){TUT.flags.bram2=1;repAdd('village',1);window.handsGive([['potion',1]],'Награда');
      return say(n,'Крыса удрала? Значит, рука у тебя крепкая. А теперь о главном: по ночам из руин часовни встают мертвецы. Поговори со мной ещё раз, когда будешь готов.');}
    if(a.talkId==='bram')return say(n,s<5?'Заходи, путник! Кружка эля найдётся.':'Крыса в амбаре, через площадь. Не бойся, она больше шумит, чем кусает.');}
  {const b=a.talkId==='herb'&&ALLIES.find(x=>x.state==='dead'&&x.carried);if(b)return reviveOffer(b);}
  if(a.talkId==='herb'&&Q.herb.state<3)return herbTalk(n);
  if(a.talkId==='bram'&&Q.dead.state===3){const q=Q.fire;
    if(q.state===0)return say(n,'Мертвецы упокоены, но пока огонь часовни холоден, они вернутся. В моём ящике есть факел — возьми его в руку и разожги жаровню в руинах.',[['Разожгу',()=>{q.state=1;questFocus=q;questUI();}]]);
    if(q.state===1)return say(n,'Жаровня в руинах всё ещё холодная. Факел — в моём ящике с припасами.');
    if(q.state===2){q.state=3;window.handsGive([['potion',1]],'Награда');questUI();banner('Пролог пройден');repAdd('village',2,'огонь часовни');
      if(ART.fate==='kept')return say(n,'Огонь горит, но слабее, чем в старые времена. Что ж, мёртвые спят, и это главное. Держи зелье.');
      return say(n,'Огонь часовни видно даже отсюда! Спасибо тебе. Денег у нас немного, но зелье возьми. Заходи, когда захочешь.');}
    return say(n,'Огонь горит. Мёртвые спят. Выпей со мной, герой.');}
  if(a.talkId==='bram')return offer(Q.dead,n,'С тех пор как в часовне погас огонь, мёртвые встают из земли. Трое бродят в руинах и у кладбища. Упокой их — и зелья мои твои.','Тихо стало по ночам. Держи, заслужил: зелье и хлеб с моей кухни.','Пей, грейся. Мёртвые больше не тревожат.',[['potion',1],['bread',2]]);
  if(a.talkId==='miller')return offer(Q.band,n,'Разбойники в лесном лагере отбирают у меня муку. Двое их. Прогони — хлеба не пожалею.','Вот это дело! Хлеб свежий, бери.','Мельница снова мелет спокойно.',[['bread',3]]);
  if(a.talkId==='fisher')return offer(Q.wolf,n,'Волки из Тёмного леса спускаются к берегу и рвут сети. Двое самых наглых. Поможешь?','Сети целы! Возьми рыбы, это от всей пристани.','Море спокойно, рыба идёт.',[['fish',2]]);
  if(a.talkId==='villager')return personTalk(a,n);
  if(a.talkId==='king')return kingTalk(a,n);
  if(a.talkId==='captain')return captainTalk(a,n);
  if(a.talkId==='pack')return packTalk(a,n);
  if(a.talkId==='merc')return say(n,COMPANIONS?'Меч у меня острый, а кошель пустой. За '+a.hire+' монет пойду с тобой куда скажешь и буду драться рядом.':'Меч у меня острый, а кошель пустой. Жду, может, купцу охрана понадобится.');
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
// can this enemy see the hero? a cone in front: 5 cells by day, 3.5 at night, less while sneaking; very close and loud always counts
const sightR=e=>(H0.sneak?3*(HERO.sneakK||1):5)*(e.model==='bandit'&&repLevel('bandits')===0?1.3:1)*(1-(HERO.night?.5:.3)*nightness());
function inCone(e){let ang=Math.atan2(H0.px-e.px,H0.pz-e.pz)-e.face;ang=Math.atan2(Math.sin(ang),Math.cos(ang));return Math.abs(ang)<1.05;}
function sees(e){if(room||H0.dead)return false;const dist=Math.hypot(H0.px-e.px,H0.pz-e.pz);
  if(dist>sightR(e))return false;if(dist<1.6&&!H0.sneak)return true;return inCone(e);}
// a little farther (up to 8 cells by day) the enemy only grows suspicious and comes to look
function suspects(e){if(room||H0.dead||H0.sneak)return false;return Math.hypot(H0.px-e.px,H0.pz-e.pz)<=sightR(e)*1.6&&inCone(e);}
function notices(e){if(e.slipUntil>performance.now())return false;if(!sees(e)){e.checked=false;return false;}
  // a goblin slips away once per rest: five seconds unseen and already crouching
  const spotted=()=>{if(RACES[HERO.race]?.slip&&SP.slip){SP.slip=0;e.slipUntil=performance.now()+5000;H0.sneak=true;H0.spd=1.3;floatText('Ускользнул!','#9fe0a0',hero);toast('Гоблин успел скрыться — '+e.name+' вас не заметил. Вы крадётесь.');e.checked=true;return false;}return true;};
  if(!H0.sneak)return spotted();if(e.checked)return false;e.checked=true;
  const sb=HERO.stealth+(HERO.night&&nightness()>.5?2:0),r=d(20),tot=r+sb,ok=tot>=e.perc;dice.hidden=false;dice.innerHTML='Скрытность против '+e.name+': '+r+' + '+sb+' = <b>'+tot+'</b> против '+e.perc+' — '+(ok?'вас не заметили':'<b>замечены!</b>');return ok?false:spotted();}
function ai(){const now=performance.now();
  for(const a of actors){if(a===H0||a.dead)continue;if(a.far&&!a.inFight)continue; // far away the island rests
    if(a.enemy){if(a.inFight)continue;
      if(!a.aware&&!busy&&!a.calm&&notices(a)){a.aware=true;sfx('notice');floatText('!','#ff5a4a',a.o);if(CB.on)callIn(a);else startCombat(a);continue;}
      if(CB.on)continue;
      if(!a.aware&&!busy&&!a.calm&&!a.investigate&&!(a.susT>now)&&suspects(a)){a.susT=now+9000;a.investigate={x:H0.x,z:H0.z,t:0};a.route=null;floatText('?','#9fc3cf',a.o);continue;}
      if(a.investigate){const I=a.investigate;if(!I.t){if(!a.route){const p=path(a.x,a.z,I.x,I.z,a,true,800);if(p&&p.length>0&&Math.hypot(a.x-I.x,a.z-I.z)>1.5)a.route=p;else I.t=now;}}
        else{if(Math.random()<.4)a.face+=(Math.random()-.5)*2;if(now-I.t>7000){a.investigate=null;const p=path(a.x,a.z,a.home[0],a.home[1],a,false,800);a.route=p&&p.length?p:null;}}continue;}
      if(!a.route&&Math.random()<.12)a.face+=(Math.random()-.5)*2.4;} // idle enemies look around, giving chances to slip behind them
    if(a.villager||a.role==='trav'||a.hidden||a.ally)continue; // the daily routine moves them
    if(!a.route&&!(a.hold>now)&&!waitsForHero(a)&&Math.random()<.2){const tx=a.home[0]+Math.round((Math.random()-.5)*2*a.wander),tz=a.home[1]+Math.round((Math.random()-.5)*2*a.wander);
      if(free(tx,tz)){const p=path(a.x,a.z,tx,tz,a,false,300);a.route=p&&p.length?p:null;}}}}
// life when standing still: villagers work, enemies fidget, the hero gets restless
function idleLife(a,r,b,t){const p=a.ph;
  // anyone the hero speaks to turns to them and talks with light gestures (a seated guest just turns)
  if(a.npc&&!a.enemy&&!r.quad&&a.act!=='sit'&&a===window.talkWho&&!talkEl.hidden){a.hold=performance.now()+1500;talkPose(a,r,b,t,false);return;}if((a.talkId==='town'||a.talkId==='merc')&&!a.route&&a.workAct)a.act=a.workAct;if(a.villager||a.role==='trav'||a.talkId==='town'||a.talkId==='merc')workPose(a,r,b,t);
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
  // a strike: wind up, hit, come back; each kind of weapon moves the arms its own way
  if(T==='atk'){const st=a.pose.style,w=k<.4?Math.sin(k/.4*Math.PI/2):k<.58?1-(k-.4)/.18:0,h=k<.4?0:k<.58?(k-.4)/.18:Math.max(0,1-(k-.58)/.42),two=a.pose.two;
    // the weapon sits in the hero's right hand, which is the armL/foreL group (W); armR is the free hand (O).
    // For W a negative z swings the arm out to the side, a positive z across the front of the body.
    const W=r.armL,WF=r.foreL,O=r.armR,OF=r.foreR;
    if(st==='sword'||st==='axe'&&!two){W.rotation.set(-2.5*w-1.25*h,0,-.75*w+.55*h);WF.rotation.set(-.7*w-.15*h,0,0);O.rotation.set(-.4*w-.2*h,0,.15);
      b.rotation.y=-.5*w+.6*h;b.rotation.x+=-.08*w+.2*h;}
    else if(st==='dagger'){W.rotation.set(.55*w-1.6*h,0,-.1*w+.15*h);WF.rotation.set(-1.5*w-.05*h,0,0);O.rotation.set(-.7*w-.3*h,0,.2);OF.rotation.set(-1,0,0);
      b.rotation.y=-.3*w+.3*h;b.rotation.x+=.22*h;}
    else if(st==='spear'){const x=.5-.2*w+.05*h;r.armR.rotation.set(x,0,-.1);r.armL.rotation.set(x-.6,0,.35);b.rotation.y=-.3*w+.15*h;b.rotation.x+=-.12*w+.22*h;}
    else if(st==='mace'||st==='hammer'||st==='axe'){W.rotation.set(-3.05*w-.95*h,0,-.12*w+(two?.15:0));WF.rotation.set(-.6*w,0,0);
      if(two){O.rotation.set(-3.05*w-.95*h,0,.12*w-.15);OF.rotation.set(-.6*w,0,0);}else O.rotation.set(-.3*h,0,.15);
      b.rotation.x+=-.22*w+.4*h;a.crouch=.06*h;}
    else if(st==='staff'){W.rotation.set(-1.2-.3*w,0,-.5*w+.5*h);O.rotation.set(-1.2-.3*w,0,.2+.3*w-.3*h);WF.rotation.set(-.3,0,0);OF.rotation.set(-.5,0,0);
      b.rotation.y=-1*w+1.1*h;b.rotation.x+=.18*h;}
    else{W.rotation.set(.35*w-1.6*h,0,.1*h);WF.rotation.set(-1.7*w-.1*h,0,0);O.rotation.set(-.9,0,.25);OF.rotation.set(-1.5,0,0);
      b.rotation.y=-.4*w+.45*h;b.rotation.x+=.18*h;}}
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
  if(!room)smokeTick(dt,t);if(VOX.on)VOX.tick(focus.x,focus.z);
  {const r=H0.route,d=r&&r.length?r[r.length-1]:null;marker.visible=!!d;if(d){marker.position.set(d[0]+.5,groundAt(d[0],d[1])+.03,d[1]+.5);marker.scale.setScalar(1+Math.sin(now/180)*.12);}}
  if(!paused){aiT+=dt;if(aiT>.45){aiT=0;ai();markSeen();lifeTick();lifeTick();townTick();allyTick();defenseTick();}houseTick();}else if(inMenuBg()){aiT+=dt;if(aiT>.45){aiT=0;lifeTick();lifeTick();}}pointerTick();placeWheel();
  for(const a of actors){if(a.dead&&a!==H0)continue;
    // actors far from the camera are not drawn or moved; they wake as the hero comes near
    const far=a!==H0&&!a.inFight&&(Math.abs(a.px-focus.x)>44||Math.abs(a.pz-focus.z)>44);if(far!==!!a.far){a.far=far;a.o.visible=!far&&!a.hidden;}if(far)continue;
    // walking eases in and out: the stride keeps its phase and fades over a few frames, so stopping
    // between two cells or turning never snaps the legs back to standing
    const moving=(a!==H0||!H0.dead)&&step(a,dt);a.walkW=(a.walkW||0)+((moving?1:0)-(a.walkW||0))*Math.min(1,dt*(moving?9:6));
    if(moving)a.walkT=(a.walkT||0)+dt*a.spd*4.2;
    const o=a.o,b=o.userData.body,walk=a.walkW>.03?(a.walkT||.001):0;const sw=reduce?0:Math.sin(a.walkT||0)*a.walkW,breathe=reduce?0:Math.sin(t*2+a.ph);
    a.gy=(a.gy??groundAt(a.px,a.pz))+(groundAt(a.px,a.pz)-(a.gy??0))*Math.min(1,dt*12);o.position.set(a.px+(a.off?a.off[0]:0),a.gy+(walk?Math.abs(sw)*.03:0)-(a.sink||0)-(a.sneak?.07:0)-(a!==H0&&!a.inFight&&a.crouchS!=null?a.crouchS:(a.crouch||0)),a.pz+(a.off?a.off[1]:0));
    // the body turns towards where it goes instead of snapping round
    if(a!==H0||!H0.dead){let dr=a.face-o.rotation.y;dr=Math.atan2(Math.sin(dr),Math.cos(dr));o.rotation.y+=dr*Math.min(1,dt*12);}b.rotation.x=(a.lean||0)+(a.sneak?.3:0);b.rotation.y=0;b.rotation.z=walk?sw*.03:0;
    const r=o.userData.rig;if(r&&r.quad){quadPose(r,walk,sw,t,a.ph);if(!walk&&!a.off&&a.enemy&&!a.inFight)r.head.rotation.x=.25+Math.max(0,Math.sin(t*1.6+a.ph))*.35;}
    else if(r){r.legL.rotation.x=walk?sw*.7:0;r.legR.rotation.x=walk?-sw*.7:0;
      armPose(o,walk,sw,breathe);
      if(a===H0&&walk){const s=Math.sign(sw);if(s&&s!==a.lastSw)stepSound(at(Math.floor(a.px),Math.floor(a.pz)),a.sneak);a.lastSw=s;}
      // the head's quiet look-around comes first, so a work or talk pose can turn and nod it
      r.torso.scale.y=1+(walk?0:breathe*.012);r.head.rotation.set(0,walk?0:Math.sin(t*.5+a.ph)*.15,0);
      if(!walk&&!a.off)idleLife(a,r,b,t);
      if(a.pose)applyPose(a,r,b,now);else if(walk||!a.act)a.crouch=0;
      // townsfolk ease from one pose into the next instead of snapping (a stroke ends, a talk starts, they set off)
      if(a!==H0&&!a.inFight)smoothPose(a,r,b,dt);}}
  for(const e of enemies){const b=e.bar;b.g.visible=!e.dead&&e.o.visible&&(e.inFight||e.hp<e.max);if(!b.g.visible)continue;
    b.g.position.set(e.o.position.x,e.o.position.y+1.15*(e.scale||1),e.o.position.z);b.g.quaternion.copy(camera.quaternion);const k=Math.max(0,e.hp/e.max);b.fg.scale.x=k;b.fg.position.x=-.28*(1-k);}
  for(const a of ALLIES)saveMarks(a);
  if(!reduce){torches.forEach(T_=>{T_.f=.85+Math.sin(t*9+T_.ph)*.08+Math.sin(t*23+T_.ph*2)*.05;T_.fl.scale.y=(T_.fl.scale.x>.15?.28:.16)*(.9+T_.f*.2)});
    // each one lives at its own spot in the world and drifts around it; one left far behind settles at a new
    // spot around the hero, out of the way, instead of travelling with the screen
    flies.forEach(f=>{const u=f.userData;if(u.wx==null||Math.hypot(u.wx-focus.x,u.wz-focus.z)>15){const a=Math.random()*Math.PI*2,r=(u.wx==null?2+Math.random()*9:9+Math.random()*4);u.wx=focus.x+Math.cos(a)*r;u.wz=focus.z+Math.sin(a)*r;}
      f.position.set(u.wx+Math.sin(t*.4+u.ph)*.8,groundAt(u.wx,u.wz)+.6+Math.sin(t*1.3+u.ph)*.25,u.wz+Math.cos(t*.33+u.ph)*.8);const night=nightness()>.5;f.visible=!room&&(night?Math.sin(t*2+u.ph*3)>-.2:nightness()<.3);if(!night){f.material=BFLY[u.c];f.scale.set(2.4+Math.sin(t*22+u.ph)*1.6,.6,2.2);f.position.y+=.25;}else{f.material=FFLY;f.scale.set(1,1,1);}});
    spiderTick(t);if(typeof shipTick==='function')shipTick(t);T.water.offset.set(Math.sin(t*.2)*.02,t*.004);window.foam.material.opacity=.14+Math.max(0,Math.sin(t*1.4))*.16;}
  // the camera follows the hero, or an enemy while it takes its turn
  const FT=camFocus&&!camFocus.dead?camFocus:H0;focus.x+=(FT.px-focus.x)*Math.min(1,dt*3);focus.z+=(FT.pz-focus.z)*Math.min(1,dt*3);focus.y=groundAt(FT.px,FT.pz)*.5;holdTick();placeCam();if(inMenuBg())menuCam(dt);streamTick(firstStream);firstStream=false;
  if(shake>0){camera.position.x+=(Math.random()-.5)*shake;camera.position.y+=(Math.random()-.5)*shake;shake=Math.max(0,shake-dt*.9)}
  const nearest=[...torches].sort((a,b)=>a.pos.distanceToSquared(focus)-b.pos.distanceToSquared(focus));
  LIGHTS.forEach((L,i)=>{const T_=nearest[i];L.position.copy(T_.pos);L.distance=T_.dist;L.intensity=T_.base*(T_.f||1)*(room?1:.3+.7*nightness());});
  moon.target.position.copy(focus);
  if(!paused){worldTick(dt);weatherTick(dt);critterTick(dt,t);eventTick(now);}else if(inMenuBg()){critterTick(dt,t);}barkTick(now);tutTick();miniTick(now);zoneCheck();
  // at 30 frames a second every other frame is skipped, which keeps phones cooler
  if(window.SET&&SET.fps===30&&now-lastDraw<30){requestAnimationFrame(frame);return;}lastDraw=now;seeTick();SEE.inOn.value=SEE.inKeep||0;renderer.render(scene,camera);silhouettes();SEE.on.value=0;SEE.inOn.value=0;requestAnimationFrame(frame)}
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
function save(){if(resetting||!HEROSET)return;try{localStorage.setItem(SAVE,JSON.stringify({lay:LAYOUT,x:H0.x,z:H0.z,hp:H0.hp,room:room?room.i:-1,
  q:Object.fromEntries(Object.entries(Q).map(([k,q])=>[k,[q.state,q.left]])),rv:Q.raven?Q.raven.step:null,lv:[LV.xp,LV.lv],deals:DEALS,objs:OBJS,camp:campaignSave(),packAngry:PACK_ANGRY?1:0,allies:ALLIES.map(a=>[a.npc,a.hp,a.state||'ok',a.saves||[0,0],a.state==='hurt'?a.hurtTill:a.deadAt??null]),dead:enemies.filter(e=>!e.temp).map(e=>e.dead?1:0),wx:WX.target,fire:chapel.lit?1:0,tut:{step:TUT.step,flags:TUT.flags},seen:seenRLE(),chests:interact.filter(i=>i.chest&&!i.key).map(i=>({o:i.opened?1:0,items:i.items})),looted:looks.filter(l=>!l.key).map(l=>l.taken?1:0),gch:Object.assign(PEND.chests,Object.fromEntries(interact.filter(i=>i.key).map(i=>[i.key,{o:i.opened?1:0,items:i.items}]))),glt:Object.assign(PEND.looted,Object.fromEntries(looks.filter(l=>l.key&&l.taken).map(l=>[l.key,1]))),rocks:[...usedRocks],
  herb:actors.find(a=>a.talkId==='herb').gave||0,eco:ecoSave(),met:V.filter(v=>v.met).map(v=>[v.npc,v.met]),time:worldTime,leg:legendSave(),items:window.handsItems?window.handsItems():null}))}catch(e){}}
function load(){let d;try{d=JSON.parse(localStorage.getItem(SAVE)||'null')}catch(e){}if(!d)return;
  for(const [k,[st,left]] of Object.entries(d.q||{}))if(Q[k]){Q[k].state=st;Q[k].left=left;}
  ecoLoad(d.eco);legendLoad(d.leg);
  for(const [nm,k] of d.met||[]){const v=V.find(v=>v.npc===nm);if(v)v.met=k;}
  (d.dead||[]).forEach((v,i)=>{const e=enemies[i];if(v&&e){e.dead=true;e.o.visible=false;}});
  Object.assign(PEND.chests,d.gch||{});Object.assign(PEND.looted,d.glt||{});const cs=interact.filter(i=>i.chest&&!i.key);(d.chests||[]).forEach((c,i)=>{const it=cs[i];if(it&&c&&c.items){it.items=c.items;if(c.o)it.open();}});
  const lk=looks.filter(l=>!l.key);(d.looted||[]).forEach((v,i)=>{const L=lk[i];if(v&&L){L.taken=true;if(L.grp)L.grp.visible=false;}});(d.rocks||[]).forEach(k=>usedRocks.add(k));
  if(d.rv&&typeof ravenLoad==='function')ravenLoad(d.rv);if(Q.raven&&Q.raven.state===3&&typeof shipArrive==='function'){shipArrive(true);if(Q.ship&&d.q&&d.q.ship)Q.ship.state=d.q.ship[0];}
  dealsLoad(d.deals);objsLoad(d.objs);campaignLoad(d.camp);if(d.packAngry)packAnger();
  if(d.lv){LV.xp=d.lv[0];LV.lv=d.lv[1];if(HERO)H0.max=HERO.hp+lvHP();}
  // allies are [name, hp, state, saves, day]; old saves have only [name, hp] and load as standing
  for(const [nm,hp,st,sv,dy] of COMPANIONS?d.allies||[]:[]){const a=actors.find(o=>o.npc===nm);if(a&&!a.ally){a.ally=true;a.wander=0;a.talkId='ally';a.hp=Math.max(1,hp);a.hidden=false;a.o.visible=true;ALLIES.push(a);
    a.state=['hurt','dead','grave'].includes(st)?st:'ok';a.saves=sv||[0,0];if(st==='down'||st==='stable')a.hp=Math.max(1,Math.ceil(a.max/4));if(a.state==='hurt')a.hurtTill=dy??dayN;
    if(a.state==='dead'||a.state==='grave'){a.down=true;a.hp=0;a.deadAt=dy??dayN;a.o.rotation.z=1.3;a.sink=.1;if(a.state==='grave'){a.hidden=true;a.o.visible=false;}}}}
  if(d.tut){TUT.step=d.tut.step;TUT.flags=d.tut.flags||{};if(TUT.step===6)spawnRat();}if(d.fire)setChapel(true);if(d.seen)seenLoad(d.seen);
  actors.find(a=>a.talkId==='herb').gave=d.herb;if(typeof d.time==='number')worldTime=d.time;if(d.items&&window.handsLoad)window.handsLoad(d.items);
  H0.hp=Math.max(1,d.hp||H0.max);if(d.room>=0&&ROOMS[d.room]){const R=ROOMS[d.room],c=R.inside||[R.exit[0],R.exit[1]-1];d.x=c[0];d.z=c[1];} // rooms moved and grew: a saved hero indoors wakes by the door
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
