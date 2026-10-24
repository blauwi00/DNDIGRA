// ---------- island generator · step 1: land, water, roads and places ----------
// Follows the approved settlement model (Notion «DNDIGRA — подробный план разработки»,
// «Утверждённая модель расселения и зон», docs/ISLAND_GEN.md): relief, water and resources ->
// capital -> port, bridges and main roads -> supplying villages -> poor and working settlements ->
// wild and dangerous land -> camps and ruins -> zone check -> logic check of every place.
// Pure and deterministic: the same seed always gives the same island. No DOM, no THREE.
const IslandGen=(()=>{
  const VERSION=1;
  // ---- seeded randomness ----
  const hashStr=s=>{let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
  const mulberry=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
  function noise2(seed){const P=new Float32Array(4096),r=mulberry(seed);for(let i=0;i<4096;i++)P[i]=r();
    const at=(x,y)=>P[((x*73856093)^(y*19349663))&4095],sm=t=>t*t*(3-2*t);
    const v=(x,y)=>{const xi=Math.floor(x),yi=Math.floor(y),fx=sm(x-xi),fy=sm(y-yi);
      const a=at(xi,yi),b=at(xi+1,yi),c=at(xi,yi+1),d=at(xi+1,yi+1);return a+(b-a)*fx+(c-a)*fy+(a-b-c+d)*fx*fy;};
    return (x,y,oct=4)=>{let s=0,amp=1,f=1,n=0;for(let o=0;o<oct;o++){s+=v(x*f,y*f)*amp;n+=amp;amp*=.5;f*=2;}return s/n;};}

  // biomes as codes; the renderer and the game read these
  const B={SEA:0,BEACH:1,MEADOW:2,FIELD:3,FOREST:4,SWAMP:5,HILLS:6,MOUNTAIN:7,SNOW:8,LAKE:9};
  const BIOME_N=['море','берег','луг','пашня','лес','болото','холмы','горы','снега','озеро'];

  function generate(seed='helga',W=300,H=220,opt={}){const ST=opt.stamp||null;
    const s0=hashStr(seed),rnd=mulberry(s0),nH=noise2(s0^1),nM=noise2(s0^2),nW=noise2(s0^3);
    const N=W*H,I=(x,z)=>z*W+x,inb=(x,z)=>x>=0&&z>=0&&x<W&&z<H;
    const height=new Float32Array(N),moist=new Float32Array(N),biome=new Uint8Array(N);
    // ---- 1. relief: noise shaped by an irregular island mask, a mountain spine across the middle ----
    const ang=rnd()*Math.PI;
    for(let z=0;z<H;z++)for(let x=0;x<W;x++){
      const u=(x/W-.5)*2,v=(z/H-.5)*2,wx=u+(nW(x*.02,z*.02,3)-.5)*.5,wz=v+(nW(x*.02+40,z*.02,3)-.5)*.5;
      const d=Math.sqrt(wx*wx*1.05+wz*wz*1.2),mask=1-Math.pow(Math.min(1,d),2.2);
      const along=Math.abs(-Math.sin(ang)*wx+Math.cos(ang)*wz),spine=Math.max(0,.35-along)*1.1;
      height[I(x,z)]=mask*(.55*nH(x*.025,z*.025,5)+.45)+spine*mask-.42;
      moist[I(x,z)]=nM(x*.03,z*.03,4);}
    // an authored stamp (the hand-made Заводь district) sits in the north-west corner: its own coast
    // stays as drawn, and its eastern and southern shores grow into the big island
    if(ST)for(let z=0;z<H;z++)for(let x=0;x<W;x++){const i=I(x,z),inS=x<ST.w&&z<ST.h,own=ST.land(x,z),big=ST.near(x,z);
      if(inS)height[i]=own?Math.max(.05,Math.min(.2,height[i])):big?Math.max(height[i],.06):-.2;
      else if(big)height[i]=Math.max(height[i],.06);}
    // a 2-cell ring of sea always surrounds the island
    for(let z=0;z<H;z++)for(let x=0;x<W;x++)if(x<3||z<3||x>W-4||z>H-4)height[I(x,z)]=Math.min(height[I(x,z)],-.2);
    // keep only the largest landmass: one connected island
    {const seen=new Uint8Array(N);let best=null;
      for(let i=0;i<N;i++){if(seen[i]||height[i]<=0)continue;const q=[i],comp=[];seen[i]=1;
        while(q.length){const c=q.pop();comp.push(c);const x=c%W,z=(c/W)|0;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!inb(nx,nz))continue;const k=I(nx,nz);if(!seen[k]&&height[k]>0){seen[k]=1;q.push(k);}}}
        if(!best||comp.length>best.length)best=comp;}
      const keep=new Uint8Array(N);for(const c of best||[])keep[c]=1;for(let i=0;i<N;i++)if(!keep[i]&&height[i]>0)height[i]=-.05;}
    const land=i=>height[i]>0;
    // distance to the sea (cells), for coast, beaches and ports
    const seaD=new Int16Array(N).fill(-1);{const q=[];for(let i=0;i<N;i++)if(!land(i)){seaD[i]=0;q.push(i);}
      for(let h=0;h<q.length;h++){const c=q[h],x=c%W,z=(c/W)|0;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!inb(nx,nz))continue;const k=I(nx,nz);if(seaD[k]<0){seaD[k]=seaD[c]+1;q.push(k);}}}}

    // ---- water: rivers run downhill from the mountains to the sea, pits become lakes ----
    const river=new Uint8Array(N),lake=new Uint8Array(N);
    const tops=[];for(let z=4;z<H-4;z+=3)for(let x=4;x<W-4;x+=3){const i=I(x,z);if(height[i]>.36)tops.push(i);}
    tops.sort((a,b)=>height[b]-height[a]);const sources=[];
    for(const t of tops){if(sources.length>=7)break;const tx=t%W,tz=(t/W)|0;if(sources.every(s=>Math.hypot(s%W-tx,((s/W)|0)-tz)>W*.13))sources.push(t);}
    for(const s of sources){let c=s,steps=0;const path=[];
      while(land(c)&&steps++<W*3){path.push(c);const x=c%W,z=(c/W)|0;let nb=-1,nh=1e9;
        for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!inb(nx,nz))continue;const k=I(nx,nz);if(path.includes(k))continue;
          const hh=height[k]+(nM(nx*.2,nz*.2,1)-.5)*.004;if(hh<nh){nh=hh;nb=k;}}
        if(nb<0)break;if(height[nb]>=height[c]){ // a pit: fill a small lake and carve through its lowest rim
          const lx=c%W,lz=(c/W)|0;for(let dz=-2;dz<=2;dz++)for(let dx=-2;dx<=2;dx++)if(dx*dx+dz*dz<=5&&inb(lx+dx,lz+dz)&&!(ST&&lx+dx<ST.w&&lz+dz<ST.h))lake[I(lx+dx,lz+dz)]=1;
          height[nb]=height[c]-.0005;}
        c=nb;}
      if(path.length>12)for(const p of path)if(!ST||(p%W)>=ST.w||((p/W)|0)>=ST.h)river[p]=1;}

    // ---- biomes ----
    for(let i=0;i<N;i++){const h=height[i],m=moist[i],x=i%W,z=(i/W)|0,cold=1-z/H*.4;let b;
      if(!land(i))b=B.SEA;else if(lake[i])b=B.LAKE;else if(seaD[i]<=2&&h<.12)b=B.BEACH;
      else if(h>.62*cold+.1)b=B.SNOW;else if(h>.5)b=B.MOUNTAIN;else if(h>.36)b=B.HILLS;
      else if(m>.62&&h<.16)b=B.SWAMP;else if(m>.5)b=B.FOREST;else b=B.MEADOW;
      biome[i]=b;}
    const water=i=>river[i]||lake[i]||!land(i);
    const walkable=i=>land(i)&&!lake[i]&&biome[i]!==B.SNOW;
    // distance to fresh water (river or lake)
    const freshD=new Int16Array(N).fill(-1);{const q=[];for(let i=0;i<N;i++)if(river[i]||lake[i]){freshD[i]=0;q.push(i);}
      for(let h=0;h<q.length;h++){const c=q[h],x=c%W,z=(c/W)|0;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!inb(nx,nz))continue;const k=I(nx,nz);if(freshD[k]<0){freshD[k]=freshD[c]+1;q.push(k);}}}}
    // resources: fertile flat land near fresh water; stone in hills; ore in mountains; timber in forests; fish on the coast
    const fert=i=>walkable(i)&&(biome[i]===B.MEADOW||biome[i]===B.FIELD)?Math.max(0,1-Math.abs(height[i]-.18)*3)*(freshD[i]>=0?Math.max(.2,1-freshD[i]/25):.2)*(.6+moist[i]*.6):0;
    const around=(x,z,r,f)=>{let s=0,n=0;for(let dz=-r;dz<=r;dz+=2)for(let dx=-r;dx<=r;dx+=2){if(!inb(x+dx,z+dz))continue;s+=f(I(x+dx,z+dz));n++;}return n?s/n:0;};

    // ---- places ----
    const places=[];
    const clearOf=(x,z,r,g)=>places.every(p=>Math.hypot(p.x-x,p.z-z)>p.r+r+Math.max(p.g,g));
    const solidLand=(x,z,r)=>{for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(dx*dx+dz*dz>r*r)continue;if(!inb(x+dx,z+dz))return false;const i=I(x+dx,z+dz);if(!walkable(i)||river[i])return false;}return true;};
    const best=(score,r,g,step=3)=>{let bx=-1,bz=-1,bs=-1e8;for(let z=r+3;z<H-r-3;z+=step)for(let x=r+3;x<W-r-3;x+=step){if(!solidLand(x,z,Math.max(2,r-2))||!clearOf(x,z,r,g))continue;const s=score(x,z);if(s>bs){bs=s;bx=x;bz=z;}}return bx<0?null:{x:bx,z:bz,s:bs};};
    const add=(type,n,at,r,g,why,extra)=>{const p=Object.assign({type,n,x:at.x,z:at.z,r,g,why},extra||{});places.push(p);return p;};
    const home=ST?add('village','Заводь',{x:ST.cx,z:ST.cz},ST.r,0,'рыбный промысел у удобного берега; деревня, с которой всё начинается',{home:1,stamp:1}):null;
    // capital: a river mouth or a sheltered coast with fertile land around; a port on its shore
    const cap=best((x,z)=>{const i=I(x,z);return around(x,z,14,fert)*3+(freshD[i]>=0&&freshD[i]<8?1.5:freshD[i]>=0&&freshD[i]<=10?0:-1e9)+(seaD[i]<16&&seaD[i]>6?2:-1)-Math.abs(height[i]-.15)*2;},10,6,4);
    if(!cap)return null;
    const capital=add('capital','Столица королевства',cap,10,6,'устье реки у моря, плодородные поля вокруг',{wealth:4,districts:['дворец','рынок','ремесленники','порт','храм','жилые кварталы','бедный квартал']});
    // the port: nearest sea cell to the capital
    let port=null;{let bd=1e9;for(let z=0;z<H;z++)for(let x=0;x<W;x++){const i=I(x,z);if(land(i)||seaD[i]!==0)continue;let coast=false;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]])if(inb(x+dx,z+dz)&&land(I(x+dx,z+dz)))coast=true;if(!coast)continue;const d=Math.hypot(x-cap.x,z-cap.z);if(d<bd){bd=d;port={x,z};}}}
    capital.port=port;

    // ---- roads: cheapest paths; rivers crossed only at bridges, mountains avoided ----
    const road=new Uint8Array(N),bridge=new Uint8Array(N);
    // a small binary heap keeps path search fast on a large island
    function heap(){const a=[];return{push(f,k){a.push([f,k]);let i=a.length-1;while(i){const p=(i-1)>>1;if(a[p][0]<=a[i][0])break;[a[p],a[i]]=[a[i],a[p]];i=p;}},
      pop(){const top=a[0],last=a.pop();if(a.length){a[0]=last;let i=0;for(;;){const l=2*i+1,r=l+1;let m=i;if(l<a.length&&a[l][0]<a[m][0])m=l;if(r<a.length&&a[r][0]<a[m][0])m=r;if(m===i)break;[a[m],a[i]]=[a[i],a[m]];i=m;}}return top;},get size(){return a.length;}};}
    const stepCost=i=>{if(!land(i)||lake[i])return 1e9;const bm=biome[i];let c=road[i]?.3:1;if(river[i])c+=8;if(bm===B.SWAMP)c+=3;if(bm===B.FOREST)c+=.6;if(bm===B.HILLS)c+=1.5;if(bm===B.MOUNTAIN)c+=12;if(bm===B.SNOW)c+=40;return c;};
    function route(a,b){const g=new Float64Array(N).fill(1e9),from=new Int32Array(N).fill(-1),done=new Uint8Array(N),h=heap(),s=I(a.x,a.z),goal=I(b.x,b.z);g[s]=0;h.push(0,s);
      while(h.size){const c=h.pop()[1];if(done[c])continue;done[c]=1;if(c===goal)break;const x=c%W,z=(c/W)|0;
        for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!inb(nx,nz))continue;const k=I(nx,nz),st=stepCost(k);if(st>=1e9)continue;
          const ng=g[c]+st;if(ng<g[k]){g[k]=ng;from[k]=c;h.push(ng+(Math.abs(nx-b.x)+Math.abs(nz-b.z))*.3,k);}}}
      if(g[goal]>=1e9)return false;for(let c=goal;c>=0;c=from[c]){road[c]=1;if(river[c])bridge[c]=1;if(c===s)break;}return true;}
    // ---- supplying villages: fertile, watered, reachable; the richest stand close to the capital's market ----
    const roadD=()=>{const d=new Int16Array(N).fill(-1),q=[];for(let i=0;i<N;i++)if(road[i]){d[i]=0;q.push(i);}for(let h=0;h<q.length;h++){const c=q[h],x=c%W,z=(c/W)|0;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(!inb(nx,nz))continue;const k=I(nx,nz);if(d[k]<0){d[k]=d[c]+1;q.push(k);}}}return d;};
    const villages=[];
    for(let k=0;k<4;k++){const v=best((x,z)=>{const i=I(x,z),dc=Math.hypot(x-cap.x,z-cap.z);return around(x,z,8,fert)*4+(freshD[i]>=0&&freshD[i]<5?1.5:freshD[i]>=0&&freshD[i]<=10?0:-1e9)+(dc>26&&dc<90?1:-2)-villages.reduce((t,o)=>t+(Math.hypot(o.x-x,o.z-z)<34?3:0),0)+rnd()*.3;},5,8,3);
      if(!v)break;const p=add('village','Деревня',v,5,8,'плодородная земля и пресная вода');villages.push(p);route(cap,p);}
    // a fishing village on the coast: the hero's Заводь, with its pier
    const fish=ST?null:best((x,z)=>{const i=I(x,z);return (seaD[i]>=4&&seaD[i]<=7?3:-1e9)+(freshD[i]>=0&&freshD[i]<10?1:0)+Math.min(1,Math.hypot(x-cap.x,z-cap.z)/60)*2+rnd()*.3;},5,8,3);
    if(ST){villages.push(home);route(cap,{x:ST.gate[0],z:ST.gate[1]});}
    if(fish){const p=add('village','Заводь',fish,5,8,'рыбный промысел у удобного берега',{home:1});villages.push(p);route(cap,p);}
    // ---- working settlement: by a quarry in the hills, with water nearby ----
    const work=best((x,z)=>{const i=I(x,z);let hills=around(x,z,8,k=>biome[k]===B.HILLS||biome[k]===B.MOUNTAIN?1:0);return hills*4+(freshD[i]>=0&&freshD[i]<7?1:freshD[i]>=0&&freshD[i]<=10?0:-1e9)-(hills>.8?2:0);},4,8,3);
    if(work){const p=add('works','Посёлок каменотёсов',work,4,8,'каменоломня в холмах');route(cap,p);}
    // wealth from fertility, water, trade and safety, minus threats (set after dangers are placed)
    // ---- the poor settlement: needs a cause; here poor wet land far from the market ----
    const poor=best((x,z)=>{const i=I(x,z),sw=around(x,z,8,k=>biome[k]===B.SWAMP?1:0);return sw*5+(freshD[i]>=0&&freshD[i]<6?1:freshD[i]>=0&&freshD[i]<=10?0:-1e9)+Math.min(2,Math.hypot(x-cap.x,z-cap.z)/40)+rnd()*.2;},4,8,3);
    if(poor){const sw=around(poor.x,poor.z,8,k=>biome[k]===B.SWAMP?1:0);const p=add('village','Бедный посёлок',poor,4,8,sw>.15?'болотистая земля и долгий путь до рынка':'скудная земля и долгий путь до рынка',{poorWhy:sw>.15?'болото':'изоляция'});villages.push(p);route(cap,p);}
    // the authored district is entered at its gate, never through its middle
    const at=p=>p.stamp?{x:ST.gate[0],z:ST.gate[1]}:p;
    // join neighbouring villages so the network is not a star
    for(const v of villages){let o=null,bd=1e9;for(const w of villages)if(w!==v){const d=Math.hypot(w.x-v.x,w.z-v.z);if(d<bd){bd=d;o=w;}}if(o&&bd<70)route(at(v),at(o));}
    const rd=roadD();
    // ---- bandit camps: close to a road worth robbing, out of reach of patrols ----
    for(let k=0;k<2;k++){const c=best((x,z)=>{const i=I(x,z),d=rd[i];const safe=Math.hypot(x-cap.x,z-cap.z)>40&&villages.every(v=>Math.hypot(v.x-x,v.z-z)>22);
        return (d>=6&&d<=16?3:-4)+(safe?2:-6)+(biome[i]===B.FOREST||biome[i]===B.HILLS?1.5:0)+(freshD[i]>=0&&freshD[i]<16?1:-1e9)+rnd()*.3;},3,20,3);
      if(c)add('bandits','Лагерь разбойников',c,3,20,'рядом с торговой дорогой, вне патрулей');}
    // ---- wild land: a deep forest for wolves, hills for boars, the mountains for a bear ----
    const wild=(type,n,bio,r,why)=>{const w=best((x,z)=>{const i=I(x,z);return around(x,z,r,k=>bio.includes(biome[k])?1:0)*4+Math.min(3,(rd[i]<0?30:rd[i])/8)+rnd()*.3;},r,4,4);if(w)add(type,n,w,r,4,why);};
    wild('wolves','Логово волков',[B.FOREST],6,'глухой лес вдали от дорог');
    wild('boars','Кабаньи холмы',[B.HILLS,B.FOREST],5,'дубравы на холмах');
    wild('bear','Берлога',[B.MOUNTAIN,B.HILLS],4,'скалы у горного леса');
    // ---- ruins: an old hill fort, far from today's settlements ----
    const ruin=best((x,z)=>{const i=I(x,z);return (biome[i]===B.HILLS?3:0)+Math.min(3,places.filter(p=>p.type!=='wolves').reduce((m,p)=>Math.min(m,Math.hypot(p.x-x,p.z-z)),1e9)/20)+rnd()*.3;},4,6,4);
    if(ruin){const p=add('ruins','Руины старой крепости',ruin,4,6,'крепость на холме времён прежнего королевства');route(p,at(places.reduce((a,b)=>b.type==='village'&&Math.hypot(b.x-p.x,b.z-p.z)<Math.hypot(a.x-p.x,a.z-p.z)?b:a,capital)));}
    // ---- wealth: fertility, water, trade, safety and craft, minus threats ----
    const threats=places.filter(p=>['bandits','wolves','bear'].includes(p.type));
    for(const p of places.filter(p=>p.type==='village'||p.type==='works')){const i=I(p.x,p.z);
      const f=around(p.x,p.z,8,fert),trade=Math.max(0,1-Math.hypot(p.x-cap.x,p.z-cap.z)/120),danger=threats.reduce((t,d)=>t+(Math.hypot(d.x-p.x,d.z-p.z)<35?.6:0),0);
      const w=f*3+(freshD[i]<4?.6:0)+trade*2+(p.type==='works'?1:0)+(p.home?1:0)-danger;p.wealth=Math.max(0,Math.min(4,Math.round(w)));
      if(p.poorWhy)p.wealth=Math.min(p.wealth,1);}
    const vs=places.filter(p=>p.type==='village'&&!p.poorWhy&&!p.home).sort((a,b)=>b.wealth-a.wealth);
    if(vs[0]){vs[0].n='Богатая деревня';vs[0].why+=', близко к рынку столицы';vs[0].wealth=Math.max(vs[0].wealth,3);}
    const names=['Ольховка','Медвяный Брод','Ясень','Овсяная Поляна'];vs.slice(1).forEach((v,k)=>v.n='Деревня '+names[k%names.length]);
    for(const p of places){p.water=!!p.stamp||freshD[I(p.x,p.z)]>=0&&freshD[I(p.x,p.z)]<=16||!!p.home&&seaD[I(p.x,p.z)]<=8;}
    return {v:VERSION,seed:String(seed),W,H,height,biome,river,lake,road,bridge,seaD,freshD,places,B,BIOME_N};}

  // ---- the logic check of every place (also used by the tests) ----
  function check(g){const bad=[],{W,H,places,road}=g,I=(x,z)=>z*W+x;
    const has=(f,n=1)=>places.filter(f).length>=n;
    if(!has(p=>p.type==='capital'))bad.push('нет столицы');if(!has(p=>p.home))bad.push('нет Заводи');if(!has(p=>p.poorWhy))bad.push('нет бедного посёлка');
    if(!has(p=>p.type==='village',5))bad.push('мало деревень');if(!has(p=>p.type==='works'))bad.push('нет рабочего посёлка');if(!has(p=>p.type==='bandits'))bad.push('нет лагеря разбойников');
    if(!has(p=>['wolves','boars','bear'].includes(p.type),2))bad.push('мало диких мест');if(!has(p=>p.type==='ruins'))bad.push('нет руин');
    for(let a=0;a<places.length;a++)for(let b=a+1;b<places.length;b++){const p=places[a],q=places[b];
      if(Math.hypot(p.x-q.x,p.z-q.z)<=p.r+q.r)bad.push('зоны пересекаются: '+p.n+' и '+q.n);
      else if(Math.hypot(p.x-q.x,p.z-q.z)<=p.r+q.r+Math.max(p.g,q.g)&&!(p.type==='wolves'||q.type==='wolves'))bad.push('защитные зоны: '+p.n+' и '+q.n);}
    const settled=places.filter(p=>['capital','village','works','ruins'].includes(p.type));
    for(const p of places){if(!p.why)bad.push('нет причины: '+p.n);if(['capital','village','works','bandits'].includes(p.type)&&!p.water)bad.push('нет воды: '+p.n);}
    // every settlement touches the road network, and the network is connected
    const onRoad=p=>{for(let dz=-p.r-2;dz<=p.r+2;dz++)for(let dx=-p.r-2;dx<=p.r+2;dx++){const x=p.x+dx,z=p.z+dz;if(x>=0&&z>=0&&x<W&&z<H&&road[I(x,z)])return I(x,z);}return -1;};
    const starts=settled.map(onRoad);starts.forEach((s,k)=>{if(s<0)bad.push('нет дороги: '+settled[k].n);});
    if(starts.length&&starts[0]>=0){const seen=new Uint8Array(W*H),q=[starts[0]];seen[starts[0]]=1;for(let h=0;h<q.length;h++){const c=q[h],x=c%W,z=(c/W)|0;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz;if(nx<0||nz<0||nx>=W||nz>=H)continue;const k=I(nx,nz);if(road[k]&&!seen[k]){seen[k]=1;q.push(k);}}}
      starts.forEach((s,k)=>{if(s>=0&&!seen[s])bad.push('дорога не связана: '+settled[k].n);});}
    return bad;}
  // a place that fails its logic is rebuilt: the island is laid out again from a derived seed,
  // a bounded number of times, so the same seed still always gives the same island
  function make(seed='helga',W,H,opt){let last=null;for(let k=0;k<12;k++){const g=generate(k?seed+'#'+k:seed,W,H,opt);if(!g)continue;g.seed=String(seed);g.attempt=k;last=g;if(!check(g).length)return g;}return last;}
  // the island seen from above: biomes, rivers, roads, bridges, zones and names (any 2D canvas context)
  const BIOME_C=['#173a52','#d8c48a','#7aa04a','#c8b45a','#3f6a2e','#55603a','#8a8a5a','#7a7268','#eef2f4','#2f6a8a'];
  const ICON_C={capital:'#ffd36b',village:'#f2e0b0',works:'#c8b8a0',bandits:'#e0453b',wolves:'#9aa0ab',boars:'#a8784a',bear:'#6a4426',ruins:'#b8a8d8'};
  function drawMap(g,x,k=3){const{W,H,biome,river,lake,road,bridge,height,places}=g;
    for(let z=0;z<H;z++)for(let xx=0;xx<W;xx++){const i=z*W+xx;let c=BIOME_C[biome[i]];if(river[i])c='#3a7aa8';if(road[i])c=bridge[i]?'#8a5a2e':'#c8a878';
      x.fillStyle=c;x.fillRect(xx*k,z*k,k,k);
      if(!river[i]&&!road[i]&&biome[i]>1&&biome[i]<9){const sh=Math.max(-.25,Math.min(.25,(height[i]-(height[i+1]||0))*14));x.fillStyle=sh>0?'rgba(255,255,255,'+sh*.5+')':'rgba(0,0,0,'+(-sh)*.6+')';x.fillRect(xx*k,z*k,k,k);}}
    x.font='bold '+Math.max(10,k*4)+'px sans-serif';x.textAlign='center';
    for(const p of places){const cx=(p.x+.5)*k,cz=(p.z+.5)*k;
      x.strokeStyle='rgba(255,255,255,.25)';x.setLineDash([3,3]);x.beginPath();x.arc(cx,cz,(p.r+p.g)*k,0,7);x.stroke();x.setLineDash([]);
      x.fillStyle=ICON_C[p.type]+'55';x.strokeStyle=ICON_C[p.type];x.lineWidth=2;x.beginPath();x.arc(cx,cz,p.r*k,0,7);x.fill();x.stroke();
      x.fillStyle='#000a';x.fillText(p.n,cx+1,cz-p.r*k-5);x.fillStyle='#fff';x.fillText(p.n,cx,cz-p.r*k-6);}
    const c=places.find(p=>p.type==='capital');if(c&&c.port){x.fillStyle='#ffd36b';x.fillRect(c.port.x*k-k,c.port.z*k-k,k*3,k*3);}}
  return {generate,make,check,drawMap,VERSION};})();
if(typeof module!=='undefined')module.exports=IslandGen;
