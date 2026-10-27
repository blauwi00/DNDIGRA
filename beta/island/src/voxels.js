// ---------- detailed voxels (prototype): models as small 3D grids, meshed greedily ----------
// Switched on by ?vox=1 (remembered; ?vox=0 turns it off), default off so the live game is unchanged.
// A model is a grid of palette indices (0 = empty). The mesher drops every face hidden by a neighbour,
// merges coplanar faces of one colour and one corner shading into big quads (greedy meshing) and bakes
// ambient occlusion into vertex colours. LOD: the same grid downsampled 2x is meshed for far away.
const VOX=(()=>{
const on=(()=>{try{const q=new URLSearchParams(location.search).get('vox');if(q==='1'||q==='0')localStorage.setItem('helga-vox',q);return localStorage.getItem('helga-vox')!=='0';}catch(e){return true;}})();
// ---- palette: one list of colours for every voxel model; a material is a few shades of one colour ----
const PAL=[[0,0,0]],SH={};
function shades(name,hexes){SH[name]=hexes.map(h=>{const c=new THREE.Color(h);PAL.push([c.r,c.g,c.b]);return PAL.length-1;});return SH[name];}
shades('log',['#6a5038','#5c4430','#735840']);shades('logD',['#3a2a1c','#33251a']);shades('logEnd',['#8a7050','#6a5238']);
shades('plank',['#6e5a44','#625040','#77624a','#5a4838']);shades('gap',['#2a2018']);
shades('plaster',['#9c9382','#948b7a','#a29886']);shades('inner',['#3a2b20','#33261c','#403024']);shades('beam',['#3a281a','#33231a']);
shades('stone',['#6e6c66','#64625c','#787670','#5e5c58']);shades('mortar',['#3a3834']);shades('plinth',['#56544e','#4c4a46','#5e5c56']);
shades('tiles',['#8a3e2c','#7c3626','#94462f']);shades('tileD',['#4a2018']);
shades('slate',['#4e5666','#465060','#56606e']);shades('slateD',['#2a2e38']);
shades('shingle',['#6a4a32','#5e422c','#74523a']);shades('shingleD',['#33241a']);
shades('thatch',['#7a6436','#6e5a30','#84703e','#655230']);shades('thatchD',['#5a4826']);
shades('turf',['#4a6a34','#40602e','#54763a']);shades('turfD',['#3a2a1a']);
shades('trim',['#3a2618']);shades('ridge',['#2e2018']);shades('frame',['#4a3220','#3e2a1a']);shades('sill',['#5a3e26']);
shades('glass',['#c89a54','#b88a48','#d4a85e']);shades('chim',['#6a6660','#5e5a54','#74706a']);shades('chimD',['#2a2826']);
shades('bark',['#4a3828','#3e2e20','#544030']);shades('barkD',['#2c2018']);
shades('leaf',['#2e4a26','#28421f','#355428','#3c5c2c']);shades('leafL',['#4a6a34','#557a3a']);shades('leafD',['#1e3218','#22381c']);
shades('pine',['#22382a','#1e3224','#284030']);shades('pineL',['#34503a']);
shades('fence',['#6a5038','#5c4430','#735a40']);shades('fenceD',['#3a2a1c']);
shades('stave',['#6e4e30','#644628','#76563a']);shades('hoop',['#2e2e32','#3a3a40']);shades('crate',['#7a5c3e','#6e5236','#86664a']);shades('crateD',['#3e2c1c']);
shades('flowerR',['#b03a44']);shades('flowerY',['#c8a030']);shades('flowerW',['#d8d0e0']);
const AOK=[.5,.68,.85,1];
// a small deterministic hash; jitter and shapes never touch the island's seeded random
const hs=(a,b,c)=>{let h=(a*374761393+b*668265263+c*1274126177)>>>0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;};
const pickS=(name,a,b,c)=>{const s=SH[name];return s[Math.floor(hs(a,b,c)*s.length)%s.length];};
// ---- grid ----
class Grid{constructor(X,Y,Z){this.X=X;this.Y=Y;this.Z=Z;this.d=new Uint8Array(X*Y*Z);this.lo=[X,Y,Z];this.hi=[-1,-1,-1];}
  get(x,y,z){return x<0||y<0||z<0||x>=this.X||y>=this.Y||z>=this.Z?0:this.d[x+this.X*(y+this.Y*z)];}
  set(x,y,z,c){if(x<0||y<0||z<0||x>=this.X||y>=this.Y||z>=this.Z)return;this.d[x+this.X*(y+this.Y*z)]=c;if(c){const p=[x,y,z];for(let i=0;i<3;i++){if(p[i]<this.lo[i])this.lo[i]=p[i];if(p[i]>this.hi[i])this.hi[i]=p[i];}}}
  box(x0,y0,z0,x1,y1,z1,c){for(let z=z0;z<z1;z++)for(let y=y0;y<y1;y++)for(let x=x0;x<x1;x++)this.set(x,y,z,typeof c==='function'?c(x,y,z):c);}
  count(){let n=0;for(let i=0;i<this.d.length;i++)if(this.d[i])n++;return n;}}
// 2x (or f x) smaller: a block is solid when at least an eighth of it is, in its most common colour
function down(g,f=2){const o=new Grid(Math.ceil(g.X/f),Math.ceil(g.Y/f),Math.ceil(g.Z/f)),cnt=new Map(),need=Math.max(1,f*f*f/8);
  if(g.hi[0]<0)return o;
  for(let z=Math.floor(g.lo[2]/f);z<=Math.floor(g.hi[2]/f);z++)for(let y=Math.floor(g.lo[1]/f);y<=Math.floor(g.hi[1]/f);y++)for(let x=Math.floor(g.lo[0]/f);x<=Math.floor(g.hi[0]/f);x++){
    cnt.clear();let n=0;for(let c=0;c<f;c++)for(let b=0;b<f;b++)for(let a=0;a<f;a++){const v=g.get(x*f+a,y*f+b,z*f+c);if(v){n++;cnt.set(v,(cnt.get(v)||0)+1);}}
    if(n>=need){let best=0,bn=0;for(const [k,v] of cnt)if(v>bn){bn=v;best=k;}o.set(x,y,z,best);}}
  return o;}
// ---- greedy mesher with baked ambient occlusion ----
const ST={meshMs:0,quads:0,naive:0};
function mesh(g,size,opt={}){const t0=performance.now(),X=g.X,Y=g.Y,Z=g.Z,dims=[X,Y,Z],pos=[],col=[],nor=[],idx=[];let naive=0,quads=0;
  const geo=new THREE.BufferGeometry();
  if(g.hi[0]<0){geo.userData.vox={voxels:0,naive:0,naiveTris:0,quads:0,tris:0};return geo;}
  const solid=(p)=>g.get(p[0],p[1],p[2])!==0,q=[0,0,0],nb=[0,0,0],tmp=[0,0,0];
  for(let d=0;d<3;d++){const u=(d+1)%3,v=(d+2)%3,du=dims[u],dv=dims[v],mask=new Int32Array(du*dv);
    const ulo=g.lo[u],uhi=g.hi[u],vlo=g.lo[v],vhi=g.hi[v];
    for(const s of [1,-1]){
      for(let sl=g.lo[d];sl<=g.hi[d];sl++){let any=false;
        for(let j=vlo;j<=vhi;j++)for(let i=ulo;i<=uhi;i++){q[d]=sl;q[u]=i;q[v]=j;const c=g.get(q[0],q[1],q[2]);let key=0;
          if(c){nb[d]=sl+s;nb[u]=i;nb[v]=j;if(!g.get(nb[0],nb[1],nb[2])&&!(opt.noBottom&&d===1&&s<0&&sl===0)){naive++;
            // corner shading from the three neighbours in the layer in front of the face
            const S=(a,b)=>{tmp[d]=sl+s;tmp[u]=i+a;tmp[v]=j+b;return solid(tmp)?1:0;};
            const ao=(a,b)=>{const s1=S(a,0),s2=S(0,b),cr=S(a,b);return s1&&s2?0:3-(s1+s2+cr);};
            const a0=ao(-1,-1),a1=ao(1,-1),a2=ao(1,1),a3=ao(-1,1);key=c|(a0<<8)|(a1<<10)|(a2<<12)|(a3<<14);any=true;}}
          mask[i+j*du]=key;}
        if(!any)continue;
        for(let j=vlo;j<=vhi;j++)for(let i=ulo;i<=uhi;){const k=mask[i+j*du];if(!k){i++;continue;}
          let w=1;while(i+w<=uhi&&mask[i+w+j*du]===k)w++;
          let h=1;grow:while(j+h<=vhi){for(let a=0;a<w;a++)if(mask[i+a+(j+h)*du]!==k)break grow;h++;}
          for(let b=0;b<h;b++)for(let a=0;a<w;a++)mask[i+a+(j+b)*du]=0;
          const c=k&255,ao=[(k>>8)&3,(k>>10)&3,(k>>12)&3,(k>>14)&3],base=pos.length/3,dd=(sl+(s>0?1:0))*size;
          const corner=(a,b)=>{const p=[0,0,0];p[d]=dd;p[u]=a*size;p[v]=b*size;return p;};
          const cs=[corner(i,j),corner(i+w,j),corner(i+w,j+h),corner(i,j+h)],n=[0,0,0];n[d]=s;
          for(let e=0;e<4;e++){pos.push(cs[e][0],cs[e][1],cs[e][2]);nor.push(n[0],n[1],n[2]);const f=AOK[ao[e]],P=PAL[c];col.push(P[0]*f,P[1]*f,P[2]*f);}
          const flip=ao[0]+ao[2]<ao[1]+ao[3],tri=flip?[1,2,3,1,3,0]:[0,1,2,0,2,3];
          if(s<0)for(let e=0;e<6;e+=3){const t=tri[e+1];tri[e+1]=tri[e+2];tri[e+2]=t;}
          for(const t of tri)idx.push(base+t);quads++;i+=w;}}}}
  geo.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geo.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));geo.setAttribute('color',new THREE.Float32BufferAttribute(col,3));
  geo.setIndex(pos.length/3>65535?new THREE.Uint32BufferAttribute(idx,1):new THREE.Uint16BufferAttribute(idx,1));geo.computeBoundingSphere();geo.computeBoundingBox();
  const ms=performance.now()-t0;ST.meshMs+=ms;ST.quads+=quads;ST.naive+=naive;
  geo.userData.vox={voxels:g.count(),naive,naiveTris:naive*2,quads,tris:quads*2,ms};return geo;}
const MAT=new THREE.MeshLambertMaterial({vertexColors:true}),GLASS=new THREE.MeshLambertMaterial({vertexColors:true,emissive:0x5a3410,emissiveIntensity:.45});
MAT.userData.vox=GLASS.userData.vox=1;
// ---------- the dwelling ----------
// Local voxel space: N voxels per cell, P voxels of padding round the walls for eaves and sills; x along the
// house's width, z along its depth (the street side, z = D, is the front the camera sees), y up from its floor.
const N=8,P=4;
function house(o){const W=o.w*N,D=o.d*N,H1=Math.round(o.wh1*N),st=o.st||1,Hw=H1+(st-1)*10,alongX=o.alongX,kind=o.roof,wk=o.wall;
  const span=(alongX?D:W),L=(alongX?W:D),ov=3,slope=Math.tan(.44),rise=Math.ceil(span/2*slope),RT=kind==='thatch'||kind==='turf'?3:2;
  const X=W+2*P,Z=D+2*P,Y=Hw+rise+RT+12,G={front:new Grid(X,Y,Z),rest:new Grid(X,Y,Z),roof:new Grid(X,Y,Z),gfront:new Grid(X,Y,Z),grest:new Grid(X,Y,Z),groof:new Grid(X,Y,Z)};
  const partOf=(lx,ly,lz,glass)=>(glass?'g':'')+(ly>=H1?'roof':lz>=D-2?'front':'rest');
  const put=(lx,ly,lz,c,part)=>{const p=part||partOf(lx,ly,lz,c&&SH.glass.includes(c));for(const k of ['front','rest','roof','gfront','grest','groof'])if(k!==p&&G[k].get(lx+P,ly,lz+P))G[k].set(lx+P,ly,lz+P,0);G[p].set(lx+P,ly,lz+P,c);};
  const clear=(lx,ly,lz)=>{for(const k in G)G[k].set(lx+P,ly,lz+P,0);};
  // faces: a = voxel along the wall from its left end seen from outside, t = depth (0 outer layer, 1 inner, -1/-2 standing out)
  const FACES={S:{len:W,m:(a,t)=>[a,D-1-t]},N:{len:W,m:(a,t)=>[W-1-a,t]},W:{len:D,m:(a,t)=>[t,a]},E:{len:D,m:(a,t)=>[W-1-t,D-1-a]}};
  // the inner layer of every wall is dark planking, so a room is lit by its fire and lamps, not by bright plaster
  const wallCol=(f,a,y,t)=>{const hh=hs(a,y,f.charCodeAt(0));if(t===1&&wk!=='stone')return pickS('inner',a>>1,y>>3,12);
    if(wk==='log'){const r=y>>1;return y%2===0?pickS('logD',a>>2,r,1):hh<.08?pickS('logD',a,y,2):pickS('log',a>>3,r,f.charCodeAt(0));}
    if(wk==='plank'){const b=a>>1;return y===0||y===H1-1?SH.gap[0]:pickS('plank',b,y>>3,3);}
    if(wk==='frame'){const pa=a%16,mid=Math.round(H1*.55);if(pa<2||y<=1||y>=H1-1||y>=Hw-1||y===mid||(y>=H1&&(y-H1)%10===0))return pickS('beam',a,y,4);
      if(y<mid&&pa>=2&&Math.abs((pa-2)-(y-2)*13/Math.max(1,mid-2))<1.1&&(a>>4)%2===0)return pickS('beam',a,y,5);return hh<.15?pickS('plaster',a,y,6):SH.plaster[0];}
    const r=Math.floor(y/3),o=(r%2)*3;if(y%3===2||(a+o)%6===0)return SH.mortar[0];return pickS('stone',Math.floor((a+o)/6),r,7);};
  const wallTop=Hw;
  for(const [f,F] of Object.entries(FACES))for(let a=0;a<F.len;a++)for(let y=0;y<wallTop;y++)for(let t=0;t<2;t++){const [lx,lz]=F.m(a,t);put(lx,y,lz,wallCol(f,a,y,t));}
  // a beam between storeys, standing out a voxel
  if(st>1&&wk!=='stone')for(let k=1;k<st;k++)for(const [f,F] of Object.entries(FACES))for(let a=-1;a<=F.len;a++){const [lx,lz]=F.m(a,-1);put(lx,H1+(k-1)*10,lz,SH.beam[0]);}
  // log ends cross at the corners, every other log on each wall
  if(wk==='log')for(const [cx,cz,sx,sz] of [[0,0,-1,-1],[W-1,0,1,-1],[0,D-1,-1,1],[W-1,D-1,1,1]])for(let y=0;y<H1;y++){const r=y>>1,along=r%2===0;
    for(let e=1;e<=2;e++)for(let w2=0;w2<2;w2++){if(along)put(cx+sx*e,y,cz-sz*w2,e===2?SH.logEnd[y%2]:wallCol('S',0,y,0));else put(cx-sx*w2,y,cz+sz*e,e===2?SH.logEnd[y%2]:wallCol('W',0,y,0));}}
  // plinth: rough stone (a log sill on a poor house) two voxels high, standing out one
  for(const [f,F] of Object.entries(FACES))for(let a=-1;a<=F.len;a++)for(let y=0;y<2;y++)for(let t=-1;t<2;t++){const [lx,lz]=F.m(a,t);put(lx,y,lz,o.poor?pickS('logD',a,y,8):(y===1&&(a+(t+1))%4===0?SH.mortar[0]:pickS('plinth',a>>2,y,9)));}
  // windows: a dark frame standing out, a cross of mullion and transom, warm glass, a sill
  const win=(f,a0,y0,wv,hv)=>{const F=FACES[f];for(let a=a0;a<a0+wv;a++)for(let y=y0;y<y0+hv;y++)for(let t=-1;t<2;t++){const [lx,lz]=F.m(a,t);clear(lx,y,lz);}
    for(let a=a0-1;a<=a0+wv;a++)for(let y=y0-1;y<=y0+hv;y++){const edge=a<a0||a>=a0+wv||y<y0||y>=y0+hv;const [lx,lz]=F.m(a,-1);if(edge)put(lx,y,lz,pickS('frame',a,y,10));}
    const mc=a0+(wv>>1),tr=y0+Math.floor(hv*.55);
    for(let a=a0;a<a0+wv;a++)for(let y=y0;y<y0+hv;y++){const [lx,lz]=F.m(a,0);if(a===mc||y===tr)put(lx,y,lz,SH.frame[0]);else{const [gx,gz]=F.m(a,1);put(gx,y,gz,pickS('glass',a,y,11));}}
    for(let a=a0-1;a<=a0+wv;a++)for(const t of [-1,-2]){const [lx,lz]=F.m(a,t);put(lx,y0-1,lz,SH.sill[0]);}};
  const isWin=(i,n)=>!o.poor&&!o.blind&&i>0&&i<n-1&&i%2===0;
  for(const f of ['S','N'])for(let i=0;i<o.w;i++){const ci=f==='S'?i:o.w-1-i;if(isWin(ci,o.w)&&!(o.side==='S'&&f==='S'&&ci===o.door))win(f,i*N+(f==='S'?2:1),4,5,5);}
  for(const f of ['W','E']){const j=Math.floor(o.d/2);if(isWin(j,o.d)&&!(o.side===f&&j===o.door)){const a=f==='W'?j*N+2:(o.d-1-j)*N+1;win(f,a,4,5,5);}}
  for(let k=1;k<st;k++)for(const f of ['S','N'])for(let i=1;i<o.w-1;i++)if(!o.blind&&i%2===1)win(f,i*N+2,H1+(k-1)*10+3,5,4);
  // the doorway: a gap through the wall and the plinth, as wide as the cell; the door leaf is the game's own
  {const F=FACES[o.side],a0=o.side==='S'?o.door*N:o.side==='W'?o.door*N:(o.d-1-o.door)*N,dh=o.barn?11:9;
   for(let a=a0;a<a0+N;a++)for(let y=0;y<dh;y++)for(let t=-1;t<2;t++){const [lx,lz]=F.m(a,t);clear(lx,y,lz);}
   for(let a=a0-1;a<=a0+N;a++){const [lx,lz]=F.m(a,-1);put(lx,dh,lz,SH.beam[0]);}}
  // window boxes with flowers under the street windows
  if(o.flowers)for(let i=0;i<o.w;i++)if(isWin(i,o.w)&&!(o.side==='S'&&i===o.door)&&hs(i,o.w,o.d)<.7){const a0=i*N+1;for(let a=a0;a<a0+7;a++){put(a,2,D+1,SH.plank[1],'front');put(a,2,D+2,SH.plank[3],'front');if(a%2)put(a,3,D+1+(a%4===1?1:0),SH[['flowerR','flowerY','flowerW'][(a+i)%3]][0],'front');}}
  // ---- the roof: two slopes stepping down from the ridge in rows of tiles, eaves over every wall ----
  const toL=(p,q)=>alongX?[p,q]:[q,p],cw=kind==='tiles'?'tileD':kind+'D';
  for(let p=-ov;p<L+ov;p++)for(let q=-ov;q<span+ov;q++){const dist=Math.abs(q+.5-span/2),ys=Hw+Math.floor((span/2-dist)*slope+.5),row=Math.floor(dist/2);
    const gable=p===-ov||p===L+ov-1;
    for(let y=ys-RT+1;y<=ys;y++){let c;const top=y===ys;
      if(gable)c=SH.trim[0];else if(kind==='thatch'){c=top?pickS('thatch',p,row,12):SH.thatchD[0];if(dist>span/2+ov-1.5&&hs(p,q,13)<.35&&top){c=pickS('thatch',p,row,14);}}
      else if(kind==='turf')c=top?(hs(p,q,15)<.08?SH.turfD[0]:pickS('turf',p>>1,q>>1,16)):SH.turfD[0];
      else{const seam=kind==='slate'?4:kind==='tiles'?3:2;c=!top?SH[cw][0]:((p+(row%2)*Math.ceil(seam/2))%seam===0)?SH[cw][0]:pickS(kind,p,row,17);}
      if(dist>span/2+ov-1&&!top&&!gable)c=SH.trim[0];
      const [lx,lz]=toL(p,q);put(lx,y,lz,c,'roof');}
    // the gables are closed: wall fills the space under the slopes inside the walls
    if(p>=0&&p<L&&q>=0&&q<span)for(let y=wallTop;y<=ys-RT;y++){const [lx,lz]=toL(p,q);const end=p<2||p>=L-2;put(lx,y,lz,end?wallCol(alongX?'W':'S',q,y,0):SH.mortar[0],'roof');}}
  // the ridge
  for(let p=-ov;p<L+ov;p++)for(let q=Math.floor(span/2)-1;q<=Math.floor(span/2);q++){const ys=Hw+Math.floor((span/2-Math.abs(q+.5-span/2))*slope+.5);const [lx,lz]=toL(p,q);put(lx,ys+1,lz,SH.ridge[0],'roof');}
  // a small window up in each gable of a bigger house
  if(!o.poor&&span>=6*N)for(const p of [0,L-1]){const q0=Math.floor(span/2)-2,y0=Hw+Math.floor(rise*.25);for(let q=q0-1;q<=q0+4;q++)for(let y=y0-1;y<=y0+4;y++){const fr=q<q0||q>q0+3||y<y0||y>y0+3,out=p===0?-1:L;
    const [lx,lz]=toL(p,q),[ox,oz]=toL(out,q);if(fr)put(ox,y,oz,SH.frame[0],'roof');else{put(lx,y,lz,pickS('glass',q,y,18),'groof');const [ix,iz]=toL(p===0?1:L-2,q);clear(ix,y,iz);}}}
  // a chimney on the back slope, smoking
  let chim=null;if(o.chimney){const cx=Math.floor((alongX?o.w*.72:o.w*.3)*N),cz=Math.floor((alongX?o.d*.3:o.d/2)*N),topY=Hw+rise+4;
    for(let y=Hw-1;y<topY;y++)for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)put(cx+a,y,cz+b,pickS('chim',a+cx,y>>1,b+19),'roof');
    for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)put(cx+a,topY,cz+b,Math.abs(a)<2&&Math.abs(b)<2?SH.chimD[0]:SH.chim[1],'roof');
    chim=[(cx+.5)/N,(topY+1)/N,(cz+.5)/N];}
  return {G,chim,top:(Hw+rise)/N,pad:P/N};}
// ---------- trees ----------
function tree(variant,pine){const S=pine?{X:18,Y:30,Z:18}:{X:22,Y:24,Z:22},g=new Grid(S.X,S.Y,S.Z),cx=S.X>>1,cz=S.Z>>1,R=(k)=>hs(variant,k,pine?31:37);
  const blob=(x0,y0,z0,r,shade)=>{for(let z=Math.floor(z0-r);z<=z0+r;z++)for(let y=Math.floor(y0-r*.8);y<=y0+r*.8;y++)for(let x=Math.floor(x0-r);x<=x0+r;x++){
    const d=Math.hypot(x-x0,(y-y0)/.8,z-z0)+(hs(x,y,z+variant*97)-.5)*1.6;if(d<r){const top=y>y0+r*.3;g.set(x,y,z,d>r-1.2&&!top&&hs(x>>1,z>>1,y>>1)<.3?SH.leafD[0]:top&&hs(z>>1,x>>1,y>>1)<.45?pickS('leafL',x>>1,y>>1,z>>1):pickS(shade,x>>1,y>>1,z>>1));}}};
  if(!pine){const th=9+Math.floor(R(1)*3);
    for(let y=0;y<th;y++)for(let a=-1;a<=1;a++)for(let b=-1;b<=1;b++)if(!(Math.abs(a)+Math.abs(b)===2&&y>2))g.set(cx+a,y,cz+b,hs(a,y,b)<.2?SH.barkD[0]:pickS('bark',a,y>>1,b));
    for(const [a,b] of [[-2,0],[2,0],[0,-2],[0,2]])if(R(a*3+b)<.7)g.set(cx+a,0,cz+b,SH.bark[1]);
    // three to five branches climb out of the trunk, each ends in a clump of leaves
    const nb=3+Math.floor(R(2)*3),ends=[];for(let k=0;k<nb;k++){const ang=k/nb*Math.PI*2+R(k+3)*1.2,len=3+R(k+9)*3;let x=cx,y=th-2-Math.floor(R(k+5)*3),z=cz;
      for(let s=0;s<len;s++){x+=Math.cos(ang)*.9;z+=Math.sin(ang)*.9;y+=.7;g.set(Math.round(x),Math.round(y),Math.round(z),SH.bark[2]);}ends.push([x,y,z]);}
    blob(cx,th+4,cz,6.2,'leaf');for(const [x,y,z] of ends)blob(x,y+1,z,3.6+R(Math.floor(x*7))*1.4,'leaf');}
  else{const th=S.Y-2;for(let y=0;y<th;y++)for(let a=0;a<2;a++)for(let b=0;b<2;b++)g.set(cx-1+a,y,cz-1+b,pickS('bark',a,y>>1,b));
    // tiers of drooping branches, wide at the bottom, narrow at the top, each a little ragged
    for(let k=0;k<6;k++){const y0=5+k*4,r=7.6-k*1.15;for(let z=-8;z<=8;z++)for(let x=-8;x<=8;x++){const d=Math.hypot(x+.5,z+.5)+(hs(x,z,k+variant*13)-.5)*2.2;if(d>=r)continue;
      const droop=Math.floor(d/2.6);for(let t=0;t<2;t++){const y=y0-droop+t;g.set(cx+x,y,cz+z,t===1&&d<r*.7&&hs(x>>1,k,z>>1)<.4?SH.pineL[0]:pickS('pine',x>>1,y,z>>1));}}}
    for(let y=S.Y-6;y<S.Y;y++)g.set(cx-1,y,cz-1,SH.pine[0]);}
  return g;}
// ---------- a fence segment along x, a barrel, a crate (props are finer: 16 voxels per cell) ----------
function fence(){const g=new Grid(16,12,16);for(let y=0;y<11;y++)for(let a=7;a<9;a++)for(let b=7;b<9;b++)g.set(a,y,b,y===10?SH.fenceD[0]:pickS('fence',a,y>>2,b));
  for(const y0 of [4,8])for(let x=0;x<16;x++){g.set(x,y0,8,x%5===0?SH.fenceD[0]:pickS('fence',x>>2,y0,3));if(y0===8)g.set(x,y0,7,pickS('fence',x>>2,y0,5));}
  return g;}
function barrel(){const g=new Grid(10,11,10),c=4.5;for(let y=0;y<10;y++){const r=3.6+Math.sin(y/9*Math.PI)*.9;for(let z=0;z<10;z++)for(let x=0;x<10;x++){const d=Math.hypot(x-c,z-c);if(d>=r)continue;
    const edge=d>r-1.2,hoop=y===1||y===8,top=y===9;g.set(x,y,z,top?(edge?SH.stave[1]:SH.logEnd[1]):edge&&hoop?pickS('hoop',x,y,z):pickS('stave',Math.floor(Math.atan2(z-c,x-c)*3),0,0));}}return g;}
function crate(){const g=new Grid(8,8,8);g.box(0,0,0,8,8,8,(x,y,z)=>{const e=[x===0||x===7,y===0||y===7,z===0||z===7].filter(Boolean).length;if(e>=2)return SH.crateD[0];
  const fx=(x===0||x===7),fz=(z===0||z===7),fy=(y===0||y===7);if(fx&&y===z||fz&&(y===x)||fy&&(x===z))return SH.crateD[0];return pickS('crate',x>>1,y>>1,z>>1);});return g;}
// ---------- furniture (16 voxels per cell): a table on four legs, a stool, a bar counter, a bed ----------
shades('sheet',['#c8bea8','#d8d0bc']);shades('pillow',['#e4dccb']);shades('blanket',['#6a3a2a','#7a4632']);
const wd=(k,a,b)=>pickS('crate',a>>1,b>>1,k),wdD=SH.crateD[0];
function table(){const g=new Grid(16,9,14);g.box(0,7,0,16,9,14,(x,y,z)=>y===8&&(z===0||z===13||x===0||x===15)?wdD:z%4===0&&y===8?pickS('stave',x>>2,0,z):wd(1,x,z));
  for(const [x,z] of [[1,1],[13,1],[1,11],[13,11]])g.box(x,0,z,x+2,7,z+2,wdD);g.box(3,2,2,13,3,3,wdD);g.box(3,2,11,13,3,12,wdD);return g;}
function stool(){const g=new Grid(8,7,8);for(let z=0;z<8;z++)for(let x=0;x<8;x++)if(Math.hypot(x-3.5,z-3.5)<3.9){g.set(x,6,z,wd(2,x,z));if(Math.hypot(x-3.5,z-3.5)>2.9)g.set(x,5,z,wdD);}
  for(const [x,z] of [[1,1],[6,1],[1,6],[6,6]])g.box(x,0,z,x+1,6,z+1,wdD);g.box(1,2,1,7,3,2,wdD);return g;}
function counter(){const g=new Grid(16,15,10);g.box(0,0,1,16,13,9,(x,y,z)=>z===1||z===8?(x%4===0||y<1||y===12?wdD:pickS('stave',x>>2,y>>2,z)):wd(3,x,y));
  g.box(0,13,0,16,15,10,(x,y,z)=>y===14&&(z===0||z===9)?wdD:wd(4,x,z));for(let x=0;x<16;x++)g.set(x,2,9,SH.hoop[0]);return g;}
function bed(){const g=new Grid(14,10,28);g.box(0,0,0,14,4,28,(x,y,z)=>x===0||x===13||z===0||z===27?wdD:wd(5,x,z));
  g.box(0,4,0,14,10,2,(x,y,z)=>y===9||x===0||x===13?wdD:wd(6,x,y));g.box(1,4,2,13,6,27,(x,y,z)=>pickS('sheet',x>>2,y,z>>2));
  g.box(2,6,2,12,7,6,SH.pillow[0]);g.box(1,5,9,13,7,27,(x,y,z)=>SH.blanket[((x+z)>>2)%3===0?0:1]);return g;}
// ---------- a market stall under a striped awning, a well with a little roof (16 voxels per cell) ----------
shades('awnR',['#9a3a2c','#8e3428']);shades('awnW',['#d8ccb0','#ccc0a4']);shades('goods',['#a83a2a','#c89a3a','#6a8a3a','#b8783a']);shades('water',['#1e3440','#24404c']);
function stall(){const g=new Grid(16,24,12);g.box(1,0,3,15,10,10,(x,y,z)=>z===3||z===9?(x%3===0||y===9?wdD:pickS('stave',x>>1,y>>2,1)):wd(7,x,y));
  for(let x=2;x<14;x+=2)for(let z=4;z<9;z+=2)if(hs(x,z,3)<.8)g.box(x,10,z,x+2,10+(hs(z,x,5)<.5?2:1),z+2,pickS('goods',x>>1,z>>1,2));
  for(const [x,z] of [[1,2],[14,2],[1,10],[14,10]])g.box(x,0,z,x+1,z===2?20:17,z+1,wdD);
  for(let z=0;z<12;z++){const y=20-Math.round(z*.3);for(let x=0;x<16;x++)g.set(x,y,z,(x>>1)%2?pickS('awnW',x,z,1):pickS('awnR',x,z,1));}
  for(let x=0;x<16;x++)if(x%2===0)g.set(x,16,11,(x>>1)%2?SH.awnW[0]:SH.awnR[0]);return g;}
function well(){const g=new Grid(16,26,16);for(let z=0;z<16;z++)for(let x=0;x<16;x++){const d=Math.hypot(x-7.5,z-7.5);
    if(d<7.6&&d>=5.4)for(let y=0;y<8;y++)g.set(x,y,z,y%3===2?SH.mortar[0]:pickS('stone',(x+(y%6<3?0:2))>>2,y,z>>2));else if(d<5.4)g.set(x,5,z,pickS('water',x>>2,0,z>>2));}
  for(const x of [1,14])g.box(x,8,7,x+1,22,9,wdD);g.box(1,18,7,15,19,9,pickS('stave',0,0,0));g.box(7,12,7,9,15,9,SH.hoop[0]);for(let y=15;y<18;y++)g.set(8,y,8,SH.hoop[1]);
  for(let z=0;z<16;z++){const y=25-Math.round(Math.abs(z-7.5)*.55);for(let x=0;x<16;x++)g.set(x,y,z,pickS('shingle',x>>2,y,z>>1));}return g;}
// ---------- the game side: geometries per asset, cached; LOD swaps between near and far ----------
const cache=new Map();
function asset(key,build,size,f=2){let a=cache.get(key);if(a)return a;const t0=performance.now(),g=build(),near=mesh(g,size,{noBottom:true}),mid=mesh(down(g,f),size*f,{noBottom:true}),far=mesh(down(g,f*2),size*f*2,{noBottom:true});
  for(const q of [near,mid,far]){q.translate(-g.X*size/2,0,-g.Z*size/2);q.computeBoundingSphere();}
  a={near,mid,far,ms:performance.now()-t0,grid:g};cache.set(key,a);return a;}
const LIVE=[];// the screen reaches about 18 cells from the hero; everything up to 5 cells past its edge is at full detail
let LOD_NEAR=23,LOD_MID=50;
try{const q=new URLSearchParams(location.search).get('vlod');if(q){const [n,m]=q.split(',').map(Number);if(n>0&&m>0){LOD_NEAR=n;LOD_MID=m;}}}catch(e){}
// swap each live voxel mesh between its near and far geometry by its distance from the camera's focus
function tick(fx,fz){for(const o of LIVE){const it=o.userData.vlod,d=(it.b?Math.hypot(Math.max(it.b[0]-fx,0,fx-it.b[2]),Math.max(it.b[1]-fz,0,fz-it.b[3])):Math.hypot(it.x-fx,it.z-fz))/(it.k||1),lv=d>LOD_MID?2:d>LOD_NEAR?1:0;if(lv===it.lv)continue;it.lv=lv;for(const e of it.ms)e[0].geometry=e[1+Math.min(lv,e.length-2)];}}
// a mesh that shares a geometry's buffers but culls by its own sphere (a whole chunk of instances)
function wrap(src,sphere){const g=new THREE.BufferGeometry();for(const k in src.attributes)g.setAttribute(k,src.attributes[k]);g.setIndex(src.index);g.boundingSphere=sphere;return g;}
return {on,Grid,mesh,down,house,tree,fence,barrel,crate,table,stool,counter,bed,stall,well,asset,tick,LIVE,wrap,MAT,GLASS,PAL,SH,ST,N,LOD(n,m){LOD_NEAR=n;LOD_MID=m;for(const o of LIVE)o.userData.vlod.lv=-1;}};})();
