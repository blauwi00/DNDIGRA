import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import {test} from 'node:test';

const source=new URL('../src/islands/terrain.js',import.meta.url);
async function kernel(){
  assert.ok(existsSync(source),'the additive pure island terrain kernel is missing');
  return import(source.href);
}
const directions=[[1,0],[-1,0],[0,1],[0,-1]];
const rgb=color=>[(color>>>16)&255,(color>>>8)&255,color&255];
const colorDistance=(a,b)=>Math.max(...rgb(a).map((value,i)=>Math.abs(value-rgb(b)[i])));

test('island kernel exposes the pure generation, sampling, validation and routing contract',async()=>{
  const api=await kernel();
  for(const name of ['createIsland','sampleIsland','validateIsland','isLand','findPath'])assert.equal(typeof api[name],'function',name);
  const meta=api.createIsland('контракт',600);
  assert.equal(meta.v,1);assert.equal(meta.landSize,600);assert.equal(meta.margin,20);
  assert.equal(meta.W,640);assert.equal(meta.H,640);assert.equal(meta.chunkSize,10);
  assert.deepEqual(api.validateIsland(meta),{ok:true,error:null});
  assert.ok(Buffer.byteLength(JSON.stringify(meta))<20_000,'metadata must remain a small JSON descriptor');
  assert.deepEqual(Object.keys(meta.landmarks).sort(),['arrival','clue','herbs','port','ruins','settlement']);
});

test('minimum and maximum islands have exact discrete dry bounds even for prior problem seeds',async()=>{
  const {createIsland,isLand}=await kernel();
  for(const seed of [0,1,1941,87421])for(const size of [600,1000]){
    const meta=createIsland(seed,size),low=20,high=20+size-1;
    let west=false,east=false,north=false,south=false;
    for(let n=low;n<=high;n++){
      west ||= isLand(meta,low,n);east ||= isLand(meta,high,n);
      north ||= isLand(meta,n,low);south ||= isLand(meta,n,high);
      for(let offset=1;offset<=20;offset++){
        assert.equal(isLand(meta,low-offset,n),false,`${seed}/${size}: west ocean`);
        assert.equal(isLand(meta,high+offset,n),false,`${seed}/${size}: east ocean`);
        assert.equal(isLand(meta,n,low-offset),false,`${seed}/${size}: north ocean`);
        assert.equal(isLand(meta,n,high+offset),false,`${seed}/${size}: south ocean`);
      }
    }
    assert.ok(west&&east&&north&&south,`${seed}/${size}: an actual dry edge is missing`);
  }
});

test('all dry cells form one four-connected irregular island at both size limits',async()=>{
  const {createIsland,isLand}=await kernel();
  for(const [seed,size] of [[0,600],[1941,1000]]){
    const meta=createIsland(seed,size),mask=new Uint8Array(meta.W*meta.H);
    let landCount=0,minX=Infinity,minY=Infinity,maxX=-1,maxY=-1;
    for(let y=0;y<meta.H;y++)for(let x=0;x<meta.W;x++)if(isLand(meta,x,y)){
      mask[y*meta.W+x]=1;landCount++;
      minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);
    }
    assert.deepEqual([minX,minY,maxX,maxY],[20,20,20+size-1,20+size-1]);
    assert.ok(landCount>size*size*.45&&landCount<size*size*.94,'shore must have large natural sea cutouts');
    const queue=new Uint32Array(landCount),start=meta.landmarks.arrival;
    let head=0,tail=1;queue[0]=start[1]*meta.W+start[0];mask[queue[0]]=2;
    while(head<tail){
      const index=queue[head++],x=index%meta.W,y=Math.floor(index/meta.W);
      for(const [dx,dy] of directions){
        const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=meta.W||ny>=meta.H)continue;
        const next=ny*meta.W+nx;if(mask[next]!==1)continue;
        mask[next]=2;queue[tail++]=next;
      }
    }
    assert.equal(tail,landCount,`${size}: detached dry cells are forbidden`);
  }
});

test('seeds reproduce sparse queries after JSON storage without cell arrays',async()=>{
  const {createIsland,sampleIsland,isLand,findPath}=await kernel();
  const first=createIsland('Солнечная бухта',800),stored=JSON.parse(JSON.stringify(first));
  assert.deepEqual(first,createIsland('Солнечная бухта',800));
  assert.deepEqual(createIsland(7,600),createIsland('7',600));
  const points=[[0,0],[19,400],[20,400],[400,400],[819,400],[839,839],...Object.values(first.landmarks)];
  for(let i=0;i<100;i++)points.push([(i*137)%first.W,(i*239)%first.H]);
  for(const [x,y] of points){
    assert.deepEqual(sampleIsland(first,x,y),sampleIsland(stored,x,y));
    assert.equal(isLand(first,x,y),isLand(stored,x,y));
  }
  assert.deepEqual(findPath(first,first.landmarks.arrival,first.landmarks.ruins),findPath(stored,stored.landmarks.arrival,stored.landmarks.ruins));
  assert.notDeepEqual(first.shape,createIsland('Другая бухта',800).shape);
  assert.notDeepEqual(first.biomes,createIsland('Другая бухта',800).biomes);
});

test('auto sizes vary within the strict range and malformed requests are explicit',async()=>{
  const {createIsland}=await kernel(),sizes=new Set();
  for(let seed=0;seed<30;seed++){
    const meta=createIsland(seed);sizes.add(meta.landSize);
    assert.ok(Number.isInteger(meta.landSize)&&meta.landSize>=600&&meta.landSize<=1000);
  }
  assert.ok(sizes.size>10,'auto must use seeded size variation');
  for(const size of [598,599,1001,600.5,NaN,Infinity,'huge'])assert.throws(()=>createIsland('bad',size),/size/i);
  for(const seed of [null,{},NaN,Infinity])assert.throws(()=>createIsland(seed,600),/seed/i);
});

test('sampling returns bounded appearance data and safe sea outside the world',async()=>{
  const {createIsland,sampleIsland,isLand}=await kernel(),meta=createIsland('sampling',600);
  for(const [x,y] of [[-1,100],[100,-1],[meta.W,100],[100,meta.H],[Infinity,0],[NaN,0],[20.5,300]]){
    assert.equal(isLand(meta,x,y),false);
    const cell=sampleIsland(meta,x,y);assert.equal(cell.land,false);assert.equal(cell.biome,'ocean');assert.equal(cell.surface,'water');
  }
  for(let y=20;y<meta.H-20;y+=13)for(let x=20;x<meta.W-20;x+=13){
    const cell=sampleIsland(meta,x,y);
    assert.equal(typeof cell.land,'boolean');assert.ok(Number.isInteger(cell.color)&&cell.color>=0&&cell.color<=0xffffff);
    assert.ok(Number.isFinite(cell.height)&&cell.height>=0&&cell.height<=1);
    assert.ok(Number.isFinite(cell.decoration)&&cell.decoration>=0&&cell.decoration<=1);
    if(cell.land)assert.ok(['meadow','forest','desert','mountain','snow','swamp'].includes(cell.biome));
  }
});

test('six seeded biomes blend gradually and do not force ten-cell tile borders',async()=>{
  const {createIsland,sampleIsland,isLand}=await kernel(),meta=createIsland('biome-continuity',800);
  const labels=new Set(),colors=new Set();let ordinaryGradient=0,ordinaryCount=0,borderGradient=0,borderCount=0;
  for(let y=30;y<meta.H-30;y+=9)for(let x=30;x<meta.W-30;x+=9){
    const cell=sampleIsland(meta,x,y);if(!cell.land)continue;
    labels.add(cell.biome);colors.add(cell.color);
  }
  assert.deepEqual([...labels].sort(),['desert','forest','meadow','mountain','snow','swamp']);
  assert.ok(colors.size>500,'continuous blends must contain intermediate colors');
  for(let y=80;y<meta.H-80;y+=17)for(let x=80;x<meta.W-80;x++){
    if(!isLand(meta,x,y)||!isLand(meta,x+1,y))continue;
    const gradient=colorDistance(sampleIsland(meta,x,y).color,sampleIsland(meta,x+1,y).color);
    assert.ok(gradient<=24,`abrupt neighboring land colors at ${x},${y}: ${gradient}`);
    if((x+1)%10===0){borderGradient+=gradient;borderCount++;}else{ordinaryGradient+=gradient;ordinaryCount++;}
  }
  assert.ok(borderGradient/borderCount<=ordinaryGradient/ordinaryCount*1.4+.25,'render chunk boundaries must not become color borders');
});

test('arrival has a clear meadow and the port touches actual coastal water',async()=>{
  const {createIsland,isLand,sampleIsland}=await kernel();
  for(const seed of [0,1,1941,87421,'winter','swamp']){
    const meta=createIsland(seed,600),{arrival,settlement,port}=meta.landmarks;
    assert.equal(sampleIsland(meta,...arrival).biome,'meadow');assert.equal(sampleIsland(meta,...arrival).surface,'grass');
    assert.equal(sampleIsland(meta,...settlement).biome,'meadow');
    for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)assert.ok(isLand(meta,arrival[0]+dx,arrival[1]+dy),'start clearing must have usable room');
    assert.ok(isLand(meta,...port));assert.ok(directions.some(([dx,dy])=>!isLand(meta,port[0]+dx,port[1]+dy)),'port must be coastal');
    assert.equal(sampleIsland(meta,...port).surface,'sand');
  }
});

test('mandatory anchors have short bounded four-direction dry routes in both directions',async()=>{
  const {createIsland,isLand,findPath}=await kernel();
  for(const seed of [0,1,1941,87421]){
    const meta=createIsland(seed,1000),start=meta.landmarks.arrival;
    for(const target of Object.values(meta.landmarks))for(const [from,to] of [[start,target],[target,start]]){
      const path=findPath(meta,from,to,1500);assert.ok(path.length>0&&path.length<=251,'kernel anchors must have direct local routes');
      assert.deepEqual(path[0],from);assert.deepEqual(path.at(-1),to);
      for(let i=0;i<path.length;i++){
        assert.ok(isLand(meta,...path[i]));
        if(i)assert.equal(Math.abs(path[i][0]-path[i-1][0])+Math.abs(path[i][1]-path[i-1][1]),1);
      }
    }
    assert.deepEqual(findPath(meta,start,meta.landmarks.ruins,2),[],'a path must respect the supplied step budget');
    assert.deepEqual(findPath(meta,start,start,0),[start]);
    assert.deepEqual(findPath(meta,[0,0],start),[]);assert.deepEqual(findPath(meta,[-1,0],start),[]);
    assert.deepEqual(findPath(meta,start,[NaN,0]),[]);assert.deepEqual(findPath(meta,start,start,-1),[]);
  }
});

test('validation rejects malformed descriptors, changed dry bounds and inland ports',async()=>{
  const {createIsland,validateIsland}=await kernel(),meta=createIsland('validation',600);
  const mutations=[null,{}, {...meta,landSize:598},{...meta,W:meta.W-1},{...meta,margin:19},{...meta,chunkSize:16},
    {...meta,shape:{...meta.shape,leftScale:meta.shape.leftScale*.9}},
    {...meta,landmarks:{...meta.landmarks,port:meta.landmarks.settlement}},
    {...meta,landmarks:{...meta.landmarks,clue:[0,0]}}];
  for(const changed of mutations){const result=validateIsland(changed);assert.equal(result.ok,false);assert.equal(typeof result.error,'string');assert.ok(result.error.length>0);}
});

test('validation rejects biome underflow, misplaced clearings and byte-budget overflow',async()=>{
  const {createIsland,validateIsland}=await kernel(),meta=createIsland('descriptor-integrity',600);
  const mutations=[
    {...meta,biomes:meta.biomes.map(region=>({...region,radius:Number.MIN_VALUE}))},
    {...meta,biomes:meta.biomes.map(region=>({...region,x:1e200}))},
    {...meta,clearing:{...meta.clearing,x:-10_000,y:-10_000}},
    {...meta,clearing:{...meta.clearing,radius:1e200}},
    {...meta,padding:'島'.repeat(7000)},
    {...meta,biomes:meta.biomes.map(region=>({...region,x:300,y:300,radius:100}))},
    {...meta,toJSON:()=>({v:1})},
  ];
  for(const changed of mutations)assert.equal(validateIsland(changed).ok,false,'unsafe descriptor must fail before terrain sampling');
});

test('validation returns an error for deeply nested data without exhausting the stack',async()=>{
  const {createIsland,validateIsland}=await kernel(),meta=createIsland('nested-data',600);
  let padding=null;for(let depth=0;depth<1000;depth++)padding=[padding];
  assert.deepEqual(validateIsland({...meta,padding}).ok,false);
});

test('validation rejects named array fields that JSON storage would discard',async()=>{
  const {createIsland,validateIsland}=await kernel(),meta=createIsland('array-data',600);
  assert.equal(validateIsland(Object.assign([],meta)).ok,false);
  assert.equal(validateIsland({...meta,shape:Object.assign([],meta.shape)}).ok,false);
});
