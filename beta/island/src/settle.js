// ---------- settlements, layout version 2: grown, not drawn (docs/ISLAND_ROADMAP.md, kingdom layout note) ----------
// Every settlement starts from its heart (the castle hill, a green by the water, a quarry face, the edge of a bog),
// the island's roads come in and meet at a square, a few crooked lanes branch off, and plots are cut along the
// streets: a house with its door to the street (south, east or west, never north), a yard behind it with a garden,
// a fence, sometimes a barn. Roles follow the place: rich stone houses by the market, crafts on the street to a gate,
// dirty trades on the river below the town, shacks by and outside the wall, fields and pasture round it all.
// Pure and deterministic: it reads and writes grid codes through callbacks and returns plain data. No DOM, no THREE.
const Settle=(()=>{
  const mul=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  const N4=[[1,0],[-1,0],[0,1],[0,-1]];
  // which door sides a room type may have, and on which row (E/W) or column (S) the door sits, so the
  // furniture of that room never stands in the way in (interiors.js furnishes rooms by these offsets)
  function doorOpts(type,w,d,shop){const o=[],S=w>=6?Math.floor(w/2):-1;
    if(shop){if(S>=0)o.push(['S',S]);if(d>=6)o.push(['E',3],['W',3]);return o;}
    if(type==='house'){if(S>=0)o.push(['S',S]);o.push(['E',2]);if(d>=6)o.push(['W',3]);return o;}
    if(type==='poorhouse'){o.push(['S',Math.floor(w/2)],['W',2]);if(d>=6)o.push(['E',3]);return o;}
    o.push(['S',Math.floor(w/2)]);if(d>=5){o.push(['E',Math.floor(d/2)],['W',Math.floor(d/2)]);}return o;}
  const NAME={house:'Дом',poorhouse:'Лачуга',gbarn:'Амбар',temple:'Храм',inn:'Таверна',mill:'Мельница',tannery:'Кожевня',warehouse:'Склад',
    castle:'Королевский замок',kitchen:'Кухня',barracks:'Казарма',armory:'Оружейная',treasury:'Казна',chambers:'Покои короля'};

  function plan(o){const {W,OH,at,set,places,hgt}=o,K=(x,z)=>z*W+x,V=o.v||2; // V: layout version (3: the big castle, new worlds)
    const out={houses:[],castle:null,fences:[],palisade:[],walls:[],gates:[],wells:[],gardens:[],fields:[],graves:[],stalls:[],props:[],piers:[],ext:new Map(),heart:new Map()};
    const inb=(x,z)=>x>1&&z>1&&x<W-2&&z<OH-2;
    const res=new Uint8Array(W*OH); // 1 kept clear (square, green, lane), 2 yard, 3 thing standing (well, stall, grave, fence)
    const walk=c=>['G','A','B','D','C','S','K','P'].includes(c);
    const okC=(x,z)=>inb(x,z)&&['G','A','B','D','C'].includes(at(x,z));
    const bld=(x,z)=>inb(x,z)&&['G','A','B'].includes(at(x,z))&&!res[K(x,z)];
    const towns=places.filter(p=>['capital','village','works'].includes(p.type));
    const EXT=p=>p.type==='capital'?p.r+(V>=3?24:14):p.type==='works'?p.r+7:p.poorWhy?p.r+6:p.r+11+Math.min(3,p.wealth||0);
    // ground of a settlement: cells nearer (in its own measure) to it than to any other settlement, clear of wild places
    const own=new Int16Array(W*OH).fill(-1);
    towns.forEach((p,i)=>{const E=EXT(p);out.ext.set(p,E);for(let z=p.z-E;z<=p.z+E;z++)for(let x=p.x-E;x<=p.x+E;x++){if(!inb(x,z))continue;const d=Math.hypot(x-p.x,z-p.z);if(d>E)continue;
      if(places.some(q=>q!==p&&!towns.includes(q)&&Math.hypot(x-q.x,z-q.z)<=q.r+3))continue;
      const j=own[K(x,z)];if(j>=0&&Math.hypot(x-towns[j].x,z-towns[j].z)/EXT(towns[j])<=d/E)continue;own[K(x,z)]=i;}});
    const mine=(p,x,z)=>inb(x,z)&&towns[own[K(x,z)]]===p;out.own=own;out.towns=towns;out.res=res;
    // a path over walkable ground (not through buildings or things), the cheapest by plain steps
    function path(a,goal,ok,maxN=6000){const prev=new Map([[K(a[0],a[1]),-1]]),q=[a];
      for(let h=0;h<q.length&&prev.size<maxN;h++){const [x,z]=q[h];if(goal(x,z)){const p=[];for(let k=K(x,z);k>=0;k=prev.get(k))p.push([k%W,(k/W)|0]);return p.reverse();}
        for(const [dx,dz] of N4){const nx=x+dx,nz=z+dz,k=K(nx,nz);if(prev.has(k)||!ok(nx,nz))continue;prev.set(k,K(x,z));q.push([nx,nz]);}}return null;}
    // a street that bends: the cheapest way where every cell costs a little more or less by a smooth noise, so a
    // street swings round soft ground instead of running in a straight staircase
    const hsh=(x,z)=>{let h=(x*374761393+z*668265263)>>>0;h=Math.imul(h^(h>>>13),1274126177);return((h^(h>>>16))>>>0)/4294967296;};
    const vn=(x,z,sc)=>{const X=Math.floor(x/sc),Z=Math.floor(z/sc),fx=x/sc-X,fz=z/sc-Z,l=(a,b,t)=>a+(b-a)*t*t*(3-2*t);return l(l(hsh(X,Z),hsh(X+1,Z),fx),l(hsh(X,Z+1),hsh(X+1,Z+1),fx),fz);};
    function wpath(a,goal,ok,maxN=12000){const g=new Map([[K(a[0],a[1]),0]]),prev=new Map([[K(a[0],a[1]),-1]]),hp=[[0,a[0],a[1]]],done=new Set();
      const push=e=>{hp.push(e);let i=hp.length-1;while(i){const p=(i-1)>>1;if(hp[p][0]<=hp[i][0])break;[hp[p],hp[i]]=[hp[i],hp[p]];i=p;}};
      const pop=()=>{const t=hp[0],l=hp.pop();if(hp.length){hp[0]=l;let i=0;for(;;){const L=2*i+1,R=L+1;let m=i;if(L<hp.length&&hp[L][0]<hp[m][0])m=L;if(R<hp.length&&hp[R][0]<hp[m][0])m=R;if(m===i)break;[hp[m],hp[i]]=[hp[i],hp[m]];i=m;}}return t;};
      while(hp.length&&done.size<maxN){const [d,x,z]=pop(),k=K(x,z);if(done.has(k))continue;done.add(k);
        if(goal(x,z)){const p=[];for(let c=k;c>=0;c=prev.get(c))p.push([c%W,(c/W)|0]);return p.reverse();}
        for(const [dx,dz] of N4){const nx=x+dx,nz=z+dz,nk=K(nx,nz);if(done.has(nk)||!ok(nx,nz))continue;const nd=d+1+vn(nx,nz,6)*4+vn(nx+50,nz,2.5)*1.5;if(nd<(g.get(nk)??1e9)){g.set(nk,nd);prev.set(nk,k);push([nd,nx,nz]);}}}
      return null;}
    const pave=(x,z,c)=>{if(okC(x,z)&&at(x,z)!=='C'&&!(c==='D'&&at(x,z)==='C'))set(x,z,c);};
    // a winding lane from a point: walks on with a slow turn and stops at the edge of its ground
    function lane(p,x,z,ang,len,c,rnd,keep){const pts=[];let fx=x+.5,fz=z+.5;for(let s=0;s<len;s++){ang+=(rnd()-.5)*.55;fx+=Math.cos(ang);fz+=Math.sin(ang);
        const cx=Math.floor(fx),cz=Math.floor(fz);if(!mine(p,cx,cz)||!okC(cx,cz)||keep&&!keep(cx,cz))break;pts.push([cx,cz]);}
      // fill diagonal steps so the lane is walkable cell to cell
      let px=x,pz=z;for(const [cx,cz] of pts){if(cx!==px&&cz!==pz&&okC(cx,pz))pave(cx,pz,c);pave(cx,cz,c);res[K(cx,cz)]=res[K(cx,cz)]||1;px=cx;pz=cz;}return pts;}
    // can a building stand here? its cells free to build on, a cell of air round it (except where it leans on `lean`)
    function fits(p,x,z,w,d,lean,keep){for(let zz=z-1;zz<=z+d;zz++)for(let xx=x-1;xx<=x+w;xx++){const inside=xx>=x&&xx<x+w&&zz>=z&&zz<z+d;
        if(inside){if(!bld(xx,zz)||!mine(p,xx,zz)||keep&&!keep(xx,zz))return false;continue;}
        if(lean&&xx>=lean[0]&&xx<lean[0]+lean[2]&&zz>=lean[1]&&zz<lean[1]+lean[3])continue;
        const c=at(xx,zz);if(c==='W')continue;if(['H','~','R','M','N','X','F','E'].includes(c)||res[K(xx,zz)]===3)return false;}return true;}
    const houseAt=(x,z,w,d)=>{for(let zz=z;zz<z+d;zz++)for(let xx=x;xx<x+w;xx++)set(xx,zz,'H');};
    function put(p,s){houseAt(s.x,s.z,s.w,s.d);s.p=p;s.name=s.name||NAME[s.type]||'Дом';out.houses.push(s);return s;}
    // the door cell of a building and the cell the door opens onto
    const doorCell=s=>s.side==='S'?[s.x+s.off,s.z+s.d]:s.side==='E'?[s.x+s.w,s.z+s.off]:[s.x-1,s.z+s.off];
    // a house set against a street cell: the door opens onto the street; orientation by which side the street is on
    function againstStreet(p,sx,sz,type,w,d,rnd,keep,shop){const opts=doorOpts(type,w,d,shop),tries=[];
      // houses do not stand in a ruler line: each sits back from the street by its own little yard (0 to 2 cells)
      const sb=Math.floor(rnd()*3);
      for(const b of sb?[sb,0]:[0])for(const [side,off] of opts){if(side==='S')tries.push({side,off,x:sx-off,z:sz-d-b});if(side==='E')tries.push({side,off,x:sx-w-b,z:sz-off});if(side==='W')tries.push({side,off,x:sx+1+b,z:sz-off});}
      for(const [side,off] of opts){
        if(side==='E')tries.push({side,off,x:sx-w,z:sz+1});if(side==='W')tries.push({side,off,x:sx+1,z:sz+1});}
      for(let i=tries.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[tries[i],tries[j]]=[tries[j],tries[i]];}
      for(const t of tries)if(fits(p,t.x,t.z,w,d,null,keep))return Object.assign(t,{w,d,type});return null;}
    // behind a house (away from its door): its yard; a garden bed, a fence along the back and one side, a barn if it is a farm
    function yard(p,s,rnd,o2){const back=s.side==='S'?[0,-1]:s.side==='E'?[-1,0]:[1,0];const deep=o2.deep||3+Math.floor(rnd()*2);let cells=[];
      const span=s.side==='S'?[s.x,s.x+s.w-1]:[s.z,s.z+s.d-1];
      for(let k=1;k<=deep;k++)for(let t=span[0];t<=span[1];t++){const x=s.side==='S'?t:back[0]<0?s.x-k:s.x+s.w-1+k,z=s.side==='S'?s.z-k:t;if(!bld(x,z)||!mine(p,x,z))continue;cells.push([x,z,k,t]);}
      if(cells.length<4)return;for(const [x,z] of cells)res[K(x,z)]=2;
      const far=cells.filter(c=>c[2]===deep),side=cells.filter(c=>c[3]===(rnd()<.5?span[0]:span[1]));
      if(o2.fence){for(const c of far)if(c[3]!==span[0]+1)out.fences.push([c[0],c[1],s.side==='S'?'x':'z']),res[K(c[0],c[1])]=3;
        for(const c of side)if(c[2]>1&&c[2]<deep)out.fences.push([c[0],c[1],s.side==='S'?'z':'x']),res[K(c[0],c[1])]=3;}
      const bed=cells.filter(c=>c[2]>=1&&c[2]<deep&&res[K(c[0],c[1])]===2&&(c[3]+c[2])%3!==0);for(const c of bed.slice(0,o2.garden||6))out.gardens.push([c[0],c[1]]);
      if(o2.woodpile){const c=cells.find(c=>c[2]===1&&res[K(c[0],c[1])]===2);if(c){out.props.push({k:'woodpile',x:c[0],z:c[1]});res[K(c[0],c[1])]=3;}}}
    // the cell before a door must lead somewhere: a trodden path to the nearest street
    const streetC=c=>c==='C'||c==='D'||c==='S'||c==='P';
    function linkDoor(s){const [dx,dz]=doorCell(s);if(!['G','A','B','D','C','S'].includes(at(dx,dz)))return false;if(at(dx,dz)!=='C'&&at(dx,dz)!=='S')set(dx,dz,'D');
      const pth=path([dx,dz],(x,z)=>(x!==dx||z!==dz)&&streetC(at(x,z))&&res[K(x,z)]!==3,(x,z)=>inb(x,z)&&walk(at(x,z))&&res[K(x,z)]!==3,3000);
      if(pth)for(const [x,z] of pth)if(['G','A','B'].includes(at(x,z)))set(x,z,'D');return !!pth;}
    const variety=(s,rnd,rich,poor)=>{const R=['tiles','slate','shingle','thatch','turf'];
      s.roof=rich?(rnd()<.5?'tiles':'slate'):poor?(rnd()<.5?'thatch':'turf'):R[Math.floor(rnd()*3)+(rnd()<.3?2:0)];
      s.alongX=rnd()<.5;s.wall=s.wall||(rich?(rnd()<.6?'stone':'frame'):poor?(rnd()<.5?'log':'plank'):['frame','plank','log'][Math.floor(rnd()*3)]);
      const prev=out.houses[out.houses.length-1];if(prev&&prev.w===s.w&&prev.d===s.d&&prev.roof===s.roof&&prev.alongX===s.alongX)s.alongX=!s.alongX;};
    // streets of a settlement: its road cells and lanes, sorted from the heart outward with a little jitter
    // places where a door may open: the streets themselves and the ground up to three steps from them,
    // nearest the heart first with a little jitter (a short path is trodden to the street later)
    const streets=(p,hx,hz,rnd,max)=>{const E=out.ext.get(p)+8,sd=new Map(),q=[];
      for(let z=p.z-E;z<=p.z+E;z++)for(let x=p.x-E;x<=p.x+E;x++)if(mine(p,x,z)&&(at(x,z)==='C'||at(x,z)==='D')&&res[K(x,z)]!==3){sd.set(K(x,z),0);q.push([x,z]);}
      for(let h=0;h<q.length;h++){const [x,z]=q[h],d=sd.get(K(x,z));if(d>=3)continue;for(const [a,b] of N4){const nx=x+a,nz=z+b,k=K(nx,nz);if(sd.has(k)||!bld(nx,nz)||!mine(p,nx,nz))continue;sd.set(k,d+1);q.push([nx,nz]);}}
      const L=[];for(const [x,z] of q){const d=sd.get(K(x,z)),r=Math.hypot(x-hx,z-hz);if(r<=max)L.push([x,z,r+d*1.5+rnd()*2.5]);}
      return L.sort((a,b)=>a[2]-b[2]);};
    function well(x,z){out.wells.push([x,z]);res[K(x,z)]=3;}

    for(const p of towns){const rnd=mul((p.x*73856093)^(p.z*19349663)^0x5e771e);
      if(p.type==='capital')capital(p,rnd);else if(p.type==='works')works(p,rnd);else if(p.poorWhy)poorPlace(p,rnd);else village(p,rnd);}
    // fields and pasture round every settlement: long strips on flat meadow, not on roads
    for(const p of towns){if(p.type==='works')continue;const E=out.ext.get(p),R0=E-1,R1=E+(p.type==='capital'?7:5),strip=p.type==='capital'?3:2;
      for(let z=p.z-R1;z<=p.z+R1;z++)for(let x=p.x-R1;x<=p.x+R1;x++){if(!inb(x,z))continue;const d=Math.hypot(x-p.x,z-p.z);if(d<R0||d>R1||at(x,z)!=='G'||res[K(x,z)])continue;
        if(own[K(x,z)]>=0&&towns[own[K(x,z)]]!==p)continue;if(places.some(q=>q!==p&&Math.hypot(x-q.x,z-q.z)<=(towns.includes(q)?out.ext.get(q):q.r+3)))continue;
        if(hgt(x,z)>.42)continue;const a=Math.atan2(z-p.z,x-p.x),sector=Math.floor((a+Math.PI)/(Math.PI*2)*7);
        if(sector%3===2)continue; // pasture between the fields
        const band=Math.floor((sector%2?x:z)/strip);if(band%4===3)continue;out.fields.push([x,z,(band+sector)%3]);}}
    for(const [x,z] of out.fields)set(x,z,'K');
    for(const [x,z] of out.gardens)if(at(x,z)==='G'||at(x,z)==='A'||at(x,z)==='B')set(x,z,'K');
    return out;

    // ---------------- the capital ----------------
    function capital(p,rnd){const E=out.ext.get(p);
      // 1. the castle on the highest ground near the middle; its gate looks south at the market
      // Layout 3 (new worlds): a castle at the scale of a real one beside a 6 x 6 house: 40 x 32 cells inside thick walls.
      // Where the land will not hold it, the next size down is tried; layout 2 keeps its old 24 x 18 court.
      let CW=24,CD=18,best=null;
      for(const [cw,cd] of V>=3?[[40,30],[38,30],[36,30],[34,30],[32,30],[24,18]]:[[24,18]]){if(best)break;CW=cw;CD=cd;const big=V>=3?Math.floor((cw-24)/2):0;
      for(const loose of [0,1]){if(best)break;const R0=(loose?20:15)+big,ZA=(loose?18:12)+big,ZB=(loose?10:6)+big;
      for(let cz=p.z-ZA;cz<=p.z+ZB;cz++)for(let cx=p.x-R0;cx<=p.x+R0;cx++){const x0=cx-Math.floor(CW/2),z0=cz-Math.floor(CD/2);let ok=true,hs=0;
        for(let z=z0;z<z0+CD+8&&ok;z++)for(let x=x0;x<x0+CW;x++){if(z<z0+CD){if(!okC(x,z)||!loose&&!mine(p,x,z)||loose&&own[K(x,z)]>=0&&!mine(p,x,z)){ok=false;break;}hs+=hgt(x,z);}else if(!loose&&Math.abs(x-cx)<5&&!(okC(x,z)||at(x,z)==='R')){ok=false;break;}}
        if(!ok)continue;let room=0;for(let z=z0+CD;z<z0+CD+15;z++)for(let x=x0-5;x<x0+CW+5;x++)if(okC(x,z)&&mine(p,x,z))room++;const s=hs/(CW*CD)*12+room*.06-Math.hypot(cx-p.x,cz-(p.z-5))*.12;if(!best||s>best.s)best={x0,z0,s};}}}
      let cast=null;
      if(best){const {x0,z0}=best,x1=x0+CW-1,z1=z0+CD-1,gc=x0+Math.floor(CW/2);cast={x:x0,z:z0,w:CW,d:CD,gate:[gc-1,gc+1],p,thick:CW>=32?2:1};out.castle=cast;
        const th=cast.thick;
        for(let z=z0;z<=z1;z++)for(let x=x0;x<=x1;x++){const edge=x<x0+th||x>x1-th||z<z0+th||z>z1-th;set(x,z,edge&&!(z>z1-th&&x>=gc-1&&x<=gc+1)?'W':'C');res[K(x,z)]=1;}
        // the buildings of the court: the keep with the throne hall, the king's rooms, the treasury, barracks, armory
        const B=(type,dx,dz,w,d,side,off,extra)=>{for(let z=z0+dz;z<z0+dz+d;z++)for(let x=x0+dx;x<x0+dx+w;x++){set(x,z,'G');res[K(x,z)]=0;}
          const s=put(p,Object.assign({type,x:x0+dx,z:z0+dz,w,d,side,off,wall:'stone',roof:'slate',alongX:true,castle:true},extra||{}));
          const [ddx,ddz]=doorCell(s);res[K(ddx,ddz)]=1;return s;};
        if(CW>=32){// the big castle: the keep of four storeys at the back of the inner ward, the king's rooms and the treasury
          // at its sides; the chapel, the armory, the kitchens, the barracks and the stables round the bailey; a well in it.
          // Every lane between buildings is at least three cells wide, so no one standing in it closes the way.
          const kw=CW>=40?14:CW>=34?12:10,kd=12,kx=Math.floor((CW-kw)/2),e=CW-3; // e: the last inner column
          B('castle',kx,3,kw,kd,'S',Math.floor(kw/2),{storeys:4,name:'Донжон: тронный зал'});
          const sw=kx-7>=5?6:5;B('chambers',3,3,sw,6,'E',2,{storeys:2,guard:4,name:'Покои короля'});
          B('treasury',e-5,3,6,5,'W',2,{guard:99,name:'Казна'});
          B('armory',e-5,10,6,6,'W',3,{guard:3,name:'Оружейная'});
          B('temple',3,kd+1,7,6,'E',3,{name:'Часовня замка'});
          const by=CD-9;// the bailey's south row
          B('kitchen',e-5,17,6,5,'W',2,{name:'Замковая кухня'});
          B('barracks',3,by,9,6,'E',3,{guard:2,name:'Казарма'});
          B('gbarn',e-9,CD-7,10,5,'W',2,{wall:'stone',roof:'slate',name:'Конюшня'});
          const wx_=x0+kx-2,wz_=z0+by-2;if(at(wx_,wz_)==='C'){out.wells.push([wx_,wz_]);res[K(wx_,wz_)]=3;}
          for(const dx of [e-12,e-11])if(at(x0+dx,z0+CD-5)==='C'){out.props.push({k:'trough',x:x0+dx,z:z0+CD-5});res[K(x0+dx,z0+CD-5)]=3;}}
        else{
        B('castle',7,1,10,8,'S',5,{storeys:3,name:'Тронный зал'});
        B('chambers',1,1,5,5,'E',2,{storeys:2,guard:4,name:'Покои короля'});
        B('treasury',18,1,5,5,'W',2,{guard:99,name:'Казна'});
        B('barracks',1,11,7,5,'E',2,{guard:2,name:'Казарма'});
        B('armory',18,11,5,5,'W',2,{guard:3,name:'Оружейная'});
        for(const [dx,dz] of [[10,14],[14,14]])out.props.push({k:'trough',x:x0+dx,z:z0+dz}),res[K(x0+dx,z0+dz)]=3;}
        // the market square under the gate, a little crooked, a well in its middle
        const mz0=z1+1,mz1=z1+6;for(let z=mz0;z<=mz1;z++)for(let x=gc-4;x<=gc+4;x++){const corner=(x===gc-4||x===gc+4)&&(z===mz0||z===mz1);if(corner&&rnd()<.7)continue;if(okC(x,z)&&mine(p,x,z)){set(x,z,'C');res[K(x,z)]=1;}}
        p.heart={x:gc,z:mz0+3};well(gc,mz0+4);
        for(const [dx,dz] of [[-4,1],[4,1],[-4,5],[4,5]])if(at(gc+dx,mz0+dz)==='C'){out.stalls.push([gc+dx,mz0+dz,rnd()]);res[K(gc+dx,mz0+dz)]=3;}}
      else p.heart={x:p.x,z:p.z};
      const hx=p.heart.x,hz=p.heart.z;out.heart.set(p,p.heart);
      const inCastle=(x,z)=>cast&&x>=cast.x&&x<cast.x+cast.w&&z>=cast.z&&z<cast.z+cast.d;
      // 2. the wall: round the market and the castle, bent by the ground, a cell inside the capital's own land
      const ph=rnd()*6,Rw=a=>(cast&&cast.w>=32?27+Math.max(cast.w,cast.d)/2-12:27)+Math.sin(a*3+ph)*1.6+Math.sin(a*5+ph*2)*.8,wx=hx,wz=cast?cast.z+Math.floor(cast.d/2):hz,wd=(x,z)=>Math.hypot(x-wx,z-wz)-Rw(Math.atan2(z-wz,x-wx));
      const mask=new Uint8Array(W*OH);for(let z=wz-E-4;z<=wz+E+4;z++)for(let x=wx-E-4;x<=wx+E+4;x++){if(!inb(x,z))continue;const c=at(x,z);if(c==='~'||c==='M'||c==='N')continue;
        if(inCastle(x,z)||wd(x,z)<=0&&mine(p,x,z)&&!(cast&&z<cast.z+2))mask[K(x,z)]=1;}
      const inWall=(x,z)=>inb(x,z)&&mask[K(x,z)]===1;
      // 3. roads that come in from outside are led on to the market; the port road too, with a pier
      const port=p.port;
      if(port){let shore=null,bd=1e9;for(let z=port.z-4;z<=port.z+4;z++)for(let x=port.x-4;x<=port.x+4;x++)if(okC(x,z)&&N4.some(([a,b])=>at(x+a,z+b)==='~')){const d=Math.hypot(x-port.x,z-port.z);if(d<bd){bd=d;shore=[x,z];}}
        if(shore&&Math.hypot(shore[0]-hx,shore[1]-hz)<E+16){const pth=wpath(shore,(x,z)=>x===hx&&z===hz||inWall(x,z)&&at(x,z)==='C'&&res[K(x,z)]===1,(x,z)=>inb(x,z)&&(okC(x,z)||at(x,z)==='K')&&!inCastle(x,z)&&res[K(x,z)]!==3,20000);
          if(pth)for(const [x,z] of pth)pave(x,z,'D');
          // planks out over the water
          const dir=N4.find(([a,b])=>at(shore[0]+a,shore[1]+b)==='~');if(dir){for(let k=1;k<=6;k++){const x=shore[0]+dir[0]*k,z=shore[1]+dir[1]*k;if(at(x,z)!=='~')break;set(x,z,'P');out.piers.push([x,z]);}}
          p.portShore=shore;}}
      // wall cells: the edge of the mask; roads through it are gates, water passes under it
      const gates=[];
      for(let z=wz-E-4;z<=wz+E+4;z++)for(let x=wx-E-4;x<=wx+E+4;x++){if(!inWall(x,z)||inCastle(x,z))continue;if(!N4.some(([a,b])=>!inWall(x+a,z+b)))continue;
        const c=at(x,z);if(c==='R')continue;if(c==='D'||c==='C'){gates.push([x,z]);continue;}if(okC(x,z)){set(x,z,'W');out.walls.push([x,z]);res[K(x,z)]=3;}}
      // gates: neighbouring road cells through the wall make one gate
      const used=new Set();for(const g of gates){const k=K(g[0],g[1]);if(used.has(k))continue;const grp=[g];used.add(k);for(let i=0;i<grp.length;i++)for(const h of gates){const kk=K(h[0],h[1]);if(!used.has(kk)&&Math.abs(h[0]-grp[i][0])+Math.abs(h[1]-grp[i][1])===1){used.add(kk);grp.push(h);}}
        const cx=grp.reduce((s,c)=>s+c[0],0)/grp.length,cz=grp.reduce((s,c)=>s+c[1],0)/grp.length;
        const horiz=!inWall(Math.round(cx),Math.round(cz)-1)||!inWall(Math.round(cx),Math.round(cz)+1);out.gates.push({x:cx,z:cz,cells:grp,ns:horiz});}
      // every gate leads by a cobbled street to the market (the old road as it was, bent by the ground)
      const streetsTo=[];for(const g of out.gates){const s=g.cells[0];
        const pth=wpath(s,(x,z)=>at(x,z)==='C'&&res[K(x,z)]===1&&!inCastle(x,z)&&(x!==s[0]||z!==s[1]),(x,z)=>inWall(x,z)&&(okC(x,z))&&!inCastle(x,z)&&res[K(x,z)]!==3&&at(x,z)!=='W',8000);
        if(pth){for(const [x,z] of pth){pave(x,z,'C');res[K(x,z)]=res[K(x,z)]||1;}streetsTo.push({g,pth});
}}
      // inside the wall every old dirt road is paved
      for(let z=wz-E-4;z<=wz+E+4;z++)for(let x=wx-E-4;x<=wx+E+4;x++)if(inWall(x,z)&&at(x,z)==='D')set(x,z,'C');
      // 4. a ring lane round the town between the square and the wall, crooked lanes out from the square, and behind the castle
      const okL=(x,z)=>inWall(x,z)&&!inCastle(x,z)&&wd(x,z)<-2.5&&okC(x,z)&&res[K(x,z)]!==3;
      {let prev=null;for(let a=0;a<900;a++){const t=a/900*Math.PI*2,r=Rw(t)*.6,x=Math.round(wx+Math.cos(t)*r),z=Math.round(wz+Math.sin(t)*r);
        if(okL(x,z)){if(prev&&prev[0]!==x&&prev[1]!==z&&okL(x,prev[1]))pave(x,prev[1],'D');pave(x,z,'D');res[K(x,z)]=res[K(x,z)]||1;prev=[x,z];}else prev=null;}}
      for(let i=0;i<3;i++)lane(p,hx,hz,Math.PI*(.12+i*.38)+(rnd()-.5)*.3,24,'D',rnd,(x,z)=>okL(x,z)||at(x,z)==='C');
      if(cast)for(let i=0;i<3;i++)lane(p,cast.x+4+i*10,cast.z-1,-Math.PI/2+(i-1)*.7,20,'D',rnd,okL);
      // 5. the temple stands at the square's side, its graves behind it
      {const tw=8,td=7;let t=null;for(const sd of [1,-1])for(let k=0;k<5&&!t;k++){const x=sd>0?hx+6+k:hx-6-k-tw+1,z=hz-1+((k*3)%3)-1;
          const side=sd>0?'W':'E',off=Math.floor(td/2);if(fits(p,x,z,tw,td,null,inWall))t={type:'temple',x,z,w:tw,d:td,side,off,wall:'stone',roof:'slate',alongX:false,storeys:2};}
        if(t){put(p,t);for(let k=1;k<=4;k++)for(let j=0;j<td;j+=2){const x=t.side==='W'?t.x+t.w+k:t.x-1-k,z=t.z+j;if(bld(x,z)&&inWall(x,z)&&mine(p,x,z)&&k%2===0){out.graves.push([x,z]);res[K(x,z)]=3;}else if(bld(x,z))res[K(x,z)]=2;}}}
      // 6. plots along the streets: rich near the square, crafts by the gates, small and close by the wall
      const ring=d=>d<9?0:d<12?1:2;let n=0;
      for(const [sx,sz,dd] of streets(p,hx,hz,rnd,E+14)){if(n>=28)break;if(inCastle(sx,sz)||!inWall(sx,sz))continue;const r=ring(Math.hypot(sx-hx,sz-hz));
        const sizes=[[[6,7],[7,6],[6,6],[5,6]],[[6,6],[5,6],[6,5],[5,5]],[[5,5],[5,6],[6,5]]][r];
        const keep=(x,z)=>inWall(x,z)&&!inCastle(x,z);let s=null;const forShop=n<3;for(let k=0;k<5&&!s;k++){const [w,d]=forShop?[[6,6],[7,6],[6,7]][k%3]:sizes[Math.floor(rnd()*sizes.length)];s=againstStreet(p,sx,sz,'house',w,d,rnd,keep,forShop);}if(!s)continue;
        s.storeys=r===0||r===1&&rnd()<.3?2:1;variety(s,rnd,r===0,r===2);s.ring=r;put(p,s);n++;
        if(r>0&&rnd()<.6)yard(p,s,rnd,{fence:r===2,garden:4,woodpile:r===2});}
      // the blocks between the streets fill up too: a house wherever it fits, its door to the nearest way (a path is trodden)
      {const cells=[];for(let z=wz-E-4;z<=wz+E+4;z++)for(let x=wx-E-4;x<=wx+E+4;x++)if(inWall(x,z)&&!inCastle(x,z)&&bld(x,z))cells.push([x,z,Math.hypot(x-hx,z-hz)+rnd()*3]);
        cells.sort((a,b)=>a[2]-b[2]);
        for(const [x,z,dd] of cells){if(n>=28)break;const r=ring(dd);const sizes=[[[6,6],[6,7],[5,6]],[[6,6],[5,6],[6,5],[5,5]],[[5,5],[5,6],[6,5]]][r];const [w,d]=sizes[Math.floor(rnd()*sizes.length)];
          if(!fits(p,x,z,w,d,null,(a,b)=>inWall(a,b)&&!inCastle(a,b)))continue;
          const opts=doorOpts('house',w,d).filter(([side,off])=>{const [ddx,ddz]=doorCell({side,off,x,z,w,d});return inWall(ddx,ddz)&&(bld(ddx,ddz)||at(ddx,ddz)==='C'||at(ddx,ddz)==='D')&&res[K(ddx,ddz)]!==3;});
          if(!opts.length)continue;const [side,off]=opts[Math.floor(rnd()*opts.length)];const s={type:'house',x,z,w,d,side,off};
          s.storeys=r===0||r===1&&rnd()<.3?2:1;variety(s,rnd,r===0,r===2);s.ring=r;put(p,s);const [ddx,ddz]=doorCell(s);res[K(ddx,ddz)]=1;n++;}}
      // crafts: the smith by a gate, the baker and the store between the gate and the square
      const hs=out.houses.filter(s=>s.p===p&&s.type==='house'&&!s.castle&&doorOpts('house',s.w,s.d,true).some(o=>o[0]===s.side&&o[1]===s.off));
      const nearGate=s=>Math.min(...out.gates.map(g=>Math.hypot(g.x-s.x-s.w/2,g.z-s.z-s.d/2)),99);
      hs.sort((a,b)=>nearGate(a)-nearGate(b));const pick=hs.shift();if(pick){pick.shop='smith';pick.name='Кузница';pick.storeys=1;}
      hs.sort((a,b)=>Math.hypot(a.x-hx,a.z-hz)-Math.hypot(b.x-hx,b.z-hz));for(const k of ['baker','store']){const s=hs.shift();if(s){s.shop=k;s.name=k==='baker'?'Пекарня':'Лавка';s.storeys=1;}}
      // 7. by the port: a warehouse and a tavern for sailors, outside the wall
      if(p.portShore){const [px,pz]=p.portShore;let k=0;for(const [type,w,d] of [['warehouse',8,6],['inn',7,6]]){let s=null;
          const cand=[];for(let z=pz-8;z<=pz+8;z++)for(let x=px-8;x<=px+8;x++)if((at(x,z)==='D'||at(x,z)==='C')&&!inWall(x,z))cand.push([x,z,Math.hypot(x-px,z-pz)]);cand.sort((a,b)=>a[2]-b[2]);
          for(const [x,z] of cand){s=againstStreet(p,x,z,type,w,d,rnd,(xx,zz)=>!inWall(xx,zz));if(s)break;}
          if(s){variety(s,rnd,false,false);s.wall=type==='warehouse'?'plank':'frame';put(p,s);k++;}}}
      // 8. the mill and the tannery on the river below the town, where the dirty water goes out to sea
      {let rc=null,bh=1e9;for(let z=hz-E-6;z<=hz+E+6;z++)for(let x=hx-E-6;x<=hx+E+6;x++){if(!inb(x,z)||at(x,z)!=='R'||inWall(x,z))continue;const d=Math.hypot(x-hx,z-hz);if(wd(x,z)<2||d>E+8)continue;const h=hgt(x,z)+d*.001;if(h<bh){bh=h;rc=[x,z];}}
        if(rc)for(const [type,w,d] of [['mill',6,6],['tannery',6,5]]){let s=null;
          for(let r=1;r<8&&!s;r++)for(const [dx,dz] of [[r,0],[-r,0],[0,r],[0,-r],[r,r],[-r,r],[r,-r],[-r,-r]]){const x=rc[0]+dx,z=rc[1]+dz;if(inWall(x,z))continue;
            for(const [side,off] of doorOpts(type,w,d)){const t={type,side,off,w,d,x:side==='E'?x-w:side==='W'?x+1:x-off,z:side==='S'?z-d:z-off};const [ddx,ddz]=doorCell(t);if(!okC(ddx,ddz))continue;
              if(fits(p,t.x,t.z,w,d,null,(xx,zz)=>!inWall(xx,zz))){s=t;break;}}if(s)break;}
          if(s){variety(s,rnd,false,true);s.wall=type==='mill'?'stone':'plank';s.river=rc;put(p,s);}}}
      // 9. shacks by the gates, outside the wall, along the road
      {let k=0;for(const g of out.gates){if(k>=12)break;const cand=[];for(let z=Math.round(g.z)-10;z<=Math.round(g.z)+10;z++)for(let x=Math.round(g.x)-10;x<=Math.round(g.x)+10;x++)if((at(x,z)==='D')&&!inWall(x,z)&&mine(p,x,z))cand.push([x,z,Math.hypot(x-g.x,z-g.z)+rnd()]);
          cand.sort((a,b)=>a[2]-b[2]);let here=0;for(const [x,z] of cand){if(here>=3||k>=12)break;const s=againstStreet(p,x,z,'poorhouse',5+(rnd()<.4?1:0),5+(rnd()<.4?1:0),rnd,(xx,zz)=>!inWall(xx,zz)&&wd(xx,zz)>1.5);
            if(s){variety(s,rnd,false,true);s.name='Лачуга у стены';put(p,s);if(rnd()<.5)yard(p,s,rnd,{fence:true,garden:3});here++;k++;}}}}
      // 10. the suburb: plain houses along the roads outside the gates, on the capital's own land
      {let m=out.houses.filter(h=>h.p===p&&(h.type==='house'||h.type==='poorhouse')).length;
        for(const [sx,sz] of streets(p,hx,hz,rnd,E+10)){if(m>=16)break;if(inWall(sx,sz)||wd(sx,sz)<1)continue;let s=null;
          for(let k=0;k<3&&!s;k++){const [w,d]=[[5,6],[6,6],[6,5],[5,5]][Math.floor(rnd()*4)];s=againstStreet(p,sx,sz,'house',w,d,rnd,(x,z)=>!inWall(x,z)&&wd(x,z)>1);}
          if(!s)continue;s.storeys=1;variety(s,rnd,false,rnd()<.5);s.ring=2;s.name='Дом в посаде';put(p,s);m++;if(rnd()<.6)yard(p,s,rnd,{fence:true,garden:5,woodpile:rnd()<.5});}}
      for(const s of out.houses)if(s.p===p)linkDoor(s);}

    // ---------------- a village ----------------
    function village(p,rnd){const E=out.ext.get(p),rich=(p.wealth||0)>=3;
      let hx=p.x,hz=p.z;if(!okC(hx,hz)){outer:for(let r=1;r<6;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++)if(okC(p.x+dx,p.z+dz)&&mine(p,p.x+dx,p.z+dz)){hx=p.x+dx;hz=p.z+dz;break outer;}}
      p.heart={x:hx,z:hz};out.heart.set(p,p.heart);
      // the roads that come in: how many arms reach the heart decides a village round a green or along a street
      let arms=0;{const seen=[];for(let a=0;a<32;a++){const x=Math.round(hx+Math.cos(a/32*Math.PI*2)*5),z=Math.round(hz+Math.sin(a/32*Math.PI*2)*5);if(at(x,z)==='D'&&!seen.some(s=>Math.hypot(s[0]-x,s[1]-z)<4)){seen.push([x,z]);arms++;}}}
      const green=arms>=2||rnd()<.4;
      if(green){for(let z=hz-3;z<=hz+3;z++)for(let x=hx-4;x<=hx+4;x++)if(Math.hypot(x-hx,(z-hz)*1.3)<=3.6&&mine(p,x,z)&&inb(x,z))res[K(x,z)]=1;
        // a lane rings the green so every house on it has a way round
        for(let a=0;a<48;a++){const x=Math.round(hx+Math.cos(a/48*Math.PI*2)*4.6),z=Math.round(hz+Math.sin(a/48*Math.PI*2)*3.6);if(okC(x,z)&&mine(p,x,z)&&!res[K(x,z)]){pave(x,z,'D');res[K(x,z)]=1;}}}
      const wx=green?hx:hx+1,wz=green?hz:hz+1;if(okC(wx,wz)&&at(wx,wz)!=='D')well(wx,wz);else{let c=null;for(let r=1;r<6&&!c;r++)for(let dz=-r;dz<=r&&!c;dz++)for(let dx=-r;dx<=r;dx++)if(okC(hx+dx,hz+dz)&&at(hx+dx,hz+dz)!=='D'&&!res[K(hx+dx,hz+dz)]&&N4.some(([a,b])=>walk(at(hx+dx+a,hz+dz+b))&&at(hx+dx+a,hz+dz+b)!=='K')){c=[hx+dx,hz+dz];break;}if(c)well(...c);}
      // one or two lanes off the heart, where there is room
      const nl=arms>=3?1:2;for(let i=0;i<nl;i++)lane(p,hx,hz,rnd()*Math.PI*2,E-2,'D',rnd,(x,z)=>Math.hypot(x-hx,z-hz)<E-1.5);
      // a rich village keeps a sharpened-log palisade round its yards, with gates where the roads go through
      const fenceR=E-.5;const keepIn=(x,z)=>Math.hypot(x-hx,z-hz)<fenceR-1.2;
      if(rich){for(let a=0;a<360;a++){const t=a/360*Math.PI*2,x=Math.round(hx+Math.cos(t)*fenceR),z=Math.round(hz+Math.sin(t)*fenceR);if(!mine(p,x,z)||res[K(x,z)]===3)continue;
          const c=at(x,z);if(c==='D'||c==='C'){if(!out.gates.some(g=>g.pal&&Math.hypot(g.x-x,g.z-z)<2.5))out.gates.push({x,z,pal:true,cells:[[x,z]]});continue;}
          if(['G','A','B'].includes(c)){out.palisade.push([x,z]);res[K(x,z)]=3;}}}
      // yards: the plots along the streets; a farm has a barn you can walk into
      const want=4+Math.round((p.wealth||0)*1.3);let n=0,barns=0,special=[];
      if(rich)special.push(['inn',8,6]);special.push(rich?['temple',6,6]:null);if(rnd()<.6||rich)special.push(['smith',7,6]);
      special=special.filter(Boolean);
      for(const [sx,sz] of streets(p,hx,hz,rnd,E)){if(n>=want+special.length)break;
        let sp=special.length?special.shift():null,s=null,type='house';
        if(sp){type=sp[0]==='smith'?'house':sp[0];s=againstStreet(p,sx,sz,type,sp[1],sp[2],rnd,keepIn,sp[0]==='smith');if(!s){special.push(sp);sp=null;type='house';}}
        if(!s){const sizes=[[6,6],[7,6],[5,6],[6,7],[7,7],[5,5],[9,5],[5,7]];for(let k=0;k<5&&!s;k++){const [w,d]=sizes[Math.floor(rnd()*sizes.length)];s=againstStreet(p,sx,sz,'house',w,d,rnd,keepIn);}}
        if(!s)continue;
        s.storeys=type==='house'&&rich&&rnd()<.35?2:type==='inn'?2:1;variety(s,rnd,rich&&rnd()<.5,(p.wealth||0)<=1);
        if(sp&&sp[0]==='smith'){s.shop='smith';s.name='Кузница';}if(type==='temple'){s.name='Часовня';s.wall='stone';}
        put(p,s);n++;if(type!=='house'||s.shop)continue;
        // an annex under its own roof against the house side (the shape of an Г), or a barn across the yard
        const farm=rnd()<.55;if(farm&&barns<3){const bw=5+(rnd()<.4?1:0),bd=5;let b=null;
          if(s.side==='S'){for(const sg of rnd()<.5?[1,-1]:[-1,1]){const x=sg>0?s.x+s.w:s.x-bw,z=s.z+s.d-bd;const t={type:'gbarn',side:'S',off:Math.floor(bw/2),x,z,w:bw,d:bd};if(fits(p,x,z,bw,bd,[s.x,s.z,s.w,s.d],keepIn)){b=t;break;}}}
          else{const x=s.x+(s.w-bw>0?Math.floor((s.w-bw)/2):0),z=s.z-bd;for(const t of [{type:'gbarn',side:'E',off:2,x,z,w:bw,d:bd},{type:'gbarn',side:'W',off:2,x,z,w:bw,d:bd}])if(fits(p,t.x,t.z,bw,bd,[s.x,s.z,s.w,s.d],keepIn)){b=t;break;}}
          // no room for it under the same roof: a barn of its own across the yard, its door to the yard
          if(!b)outer:for(let r=1;r<=6;r++)for(let dz=-r-bd;dz<=s.d+r;dz++)for(let dx=-r-bw;dx<=s.w+r;dx++){if(Math.max(Math.abs(dx<0?dx+bw:dx-s.w),Math.abs(dz<0?dz+bd:dz-s.d))<1)continue;
            const x=s.x+dx,z=s.z+dz;for(const [side,off] of doorOpts('gbarn',bw,bd)){const t={type:'gbarn',side,off,x,z,w:bw,d:bd};const [ddx,ddz]=doorCell(t);if(!okC(ddx,ddz)||res[K(ddx,ddz)]===3)continue;if(fits(p,x,z,bw,bd,null,keepIn)){b=t;break outer;}}}
          if(b){variety(b,rnd,false,true);b.wall=rnd()<.5?'plank':'log';b.name=rnd()<.5?'Амбар':'Хлев';b.annexOf=s;put(p,b);barns++;continue;}}
        yard(p,s,rnd,{fence:true,garden:farm?8:5,woodpile:rnd()<.5});}
      // the mill stands on the water if water is near
      {let rc=null,bd=1e9;for(let z=hz-E-2;z<=hz+E+2;z++)for(let x=hx-E-2;x<=hx+E+2;x++){if(!inb(x,z)||at(x,z)!=='R')continue;const d=Math.hypot(x-hx,z-hz);if(d<bd&&d>4){bd=d;rc=[x,z];}}
        if(rc&&bd<E+2){let s=null;for(let r=1;r<6&&!s;r++)for(const [dx,dz] of [[r,0],[-r,0],[0,r],[0,-r]]){const x=rc[0]+dx,z=rc[1]+dz;
            for(const [side,off] of doorOpts('mill',6,6)){const t={type:'mill',side,off,w:6,d:6,x:side==='E'?x-6:side==='W'?x+1:x-off,z:side==='S'?z-6:z-off};const [ddx,ddz]=doorCell(t);if(!okC(ddx,ddz))continue;if(fits(p,t.x,t.z,6,6)){s=t;break;}}if(s)break;}
          if(s){variety(s,rnd,false,false);s.wall='stone';s.river=rc;put(p,s);}}}
      // a wayside cross at the edge of a village without a chapel
      if(!out.houses.some(s=>s.p===p&&s.type==='temple')){const a=rnd()*Math.PI*2;for(let r=4;r<E;r++){const x=Math.round(hx+Math.cos(a)*r),z=Math.round(hz+Math.sin(a)*r);if(bld(x,z)&&mine(p,x,z)&&N4.some(([dx,dz])=>at(x+dx,z+dz)==='D')){out.props.push({k:'cross',x,z});res[K(x,z)]=3;break;}}}
      for(const s of out.houses)if(s.p===p)linkDoor(s);}

    // ---------------- the quarry and its settlement ----------------
    function works(p,rnd){const E=out.ext.get(p);p.heart={x:p.x,z:p.z};out.heart.set(p,p.heart);
      for(let z=p.z-p.r;z<=p.z+p.r;z++)for(let x=p.x-p.r;x<=p.x+p.r;x++)if(Math.hypot(x-p.x,z-p.z)<=p.r&&['G','A','B','D'].includes(at(x,z))){set(x,z,'S');res[K(x,z)]=1;}
      // a wide broken track round the pit
      for(let a=0;a<64;a++){const x=Math.round(p.x+Math.cos(a/64*Math.PI*2)*(p.r+1)),z=Math.round(p.z+Math.sin(a/64*Math.PI*2)*(p.r+1));if(okC(x,z)&&mine(p,x,z))pave(x,z,'D');}
      // stone blocks, a crane, a cart and an open shed for cutting stone
      const pit=[];for(let z=p.z-p.r+1;z<p.z+p.r;z++)for(let x=p.x-p.r+1;x<p.x+p.r;x++)if(at(x,z)==='S'&&Math.hypot(x-p.x,z-p.z)>1.5&&Math.hypot(x-p.x,z-p.z)<p.r-1)pit.push([x,z]);
      const take=k=>{const c=pit.splice(Math.floor(rnd()*pit.length),1)[0];if(c){out.props.push({k,x:c[0],z:c[1]});res[K(c[0],c[1])]=3;for(let i=pit.length-1;i>=0;i--)if(Math.abs(pit[i][0]-c[0])<=1&&Math.abs(pit[i][1]-c[1])<=1)pit.splice(i,1);}};
      take('crane');for(let i=0;i<4;i++)take('blocks');take('cart');
      let n=0;for(const [sx,sz] of streets(p,p.x,p.z,rnd,E)){if(n>=3)break;const [type,w,d,name]=[['house',8,6,'Барак'],['house',6,6,'Дом десятника'],['house',6,5,'Дом каменотёса']][n];
        const s=againstStreet(p,sx,sz,type,w,d,rnd,(x,z)=>Math.hypot(x-p.x,z-p.z)>p.r+1.5);if(!s)continue;variety(s,rnd,n===1,n!==1);s.wall=n===1?'stone':'plank';s.name=name;put(p,s);n++;
        if(n===1)yard(p,s,rnd,{garden:0,woodpile:true});}
      {const a=rnd()*Math.PI*2;for(let r=p.r+2;r<E;r++){const x=Math.round(p.x+Math.cos(a)*r),z=Math.round(p.z+Math.sin(a)*r);if(bld(x,z)&&mine(p,x,z)){out.props.push({k:'shed',x,z});res[K(x,z)]=3;break;}}}
      {const c=[[p.x+p.r+2,p.z],[p.x-p.r-2,p.z],[p.x,p.z+p.r+2]].find(([x,z])=>bld(x,z));if(c)well(...c);}
      for(const s of out.houses)if(s.p===p)linkDoor(s);}

    // ---------------- the poor settlement on the bog's edge ----------------
    function poorPlace(p,rnd){const E=out.ext.get(p);p.heart={x:p.x,z:p.z};out.heart.set(p,p.heart);
      // shacks anyhow, each turned its own way; trodden paths, wattle, peat stacks; no well, the water is the bog's
      let n=0;for(let k=0;k<160&&n<4;k++){const a=rnd()*Math.PI*2,r=2+rnd()*(E-6),w=5+(rnd()<.3?1:0),d=5+(rnd()<.3?1:0);const x=Math.round(p.x+Math.cos(a)*r-w/2),z=Math.round(p.z+Math.sin(a)*r-d/2);
        const opts=doorOpts('poorhouse',w,d),[side,off]=opts[Math.floor(rnd()*opts.length)];if(!fits(p,x,z,w,d))continue;
        const s={type:'poorhouse',x,z,w,d,side,off,storeys:1};const [ddx,ddz]=doorCell(s);if(!okC(ddx,ddz))continue;variety(s,rnd,false,true);put(p,s);n++;
        if(rnd()<.6)yard(p,s,rnd,{fence:true,garden:3,deep:2});}
      if(okC(p.x,p.z)&&!res[K(p.x,p.z)])pave(p.x,p.z,'D');
      for(let i=0;i<3;i++){const a=rnd()*Math.PI*2,x=Math.round(p.x+Math.cos(a)*3),z=Math.round(p.z+Math.sin(a)*3);if(bld(x,z)){out.props.push({k:'peat',x,z});res[K(x,z)]=3;}}
      for(const s of out.houses)if(s.p===p)linkDoor(s);}
  }
  return {plan,doorOpts};})();
if(typeof module!=='undefined')module.exports=Settle;
