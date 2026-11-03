import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {existsSync} from 'node:fs';
import {test} from 'node:test';
import * as WorldGen from '../src/worldgen/index.js';
import {isLand} from '../src/islands/terrain.js';

const moduleUrl=new URL('../src/islands/scene.js',import.meta.url);
async function sampler(){assert.ok(existsSync(moduleUrl),'compact scene sampler is missing');return import(moduleUrl.href);}
const key=([x,y])=>`${x},${y}`;
const blocking=p=>p.solid!==false&&!['door','portal','torch','chandelier','clue','trap'].includes(p.type);
const directions=[[1,0],[-1,0],[0,1],[0,-1]];

test('shared sampler preserves legacy cells and material appearance',async()=>{
  const {tileAt,sampleScene}=await sampler();
  const legacy={W:3,H:2,tiles:[['floor','wall','void'],['floor','floor','void']],surface:['g  ','da ']};
  const before=JSON.stringify(legacy);
  assert.equal(tileAt(legacy,0,0),'floor');assert.equal(tileAt(legacy,1,0),'wall');assert.equal(tileAt(legacy,3,0),'void');
  assert.equal(tileAt(legacy,0.5,0),'void');assert.equal(sampleScene(legacy,0,1).surface,'dirt');
  assert.equal(sampleScene(legacy,1,1).surface,'sand');assert.equal(sampleScene(legacy,1,0).land,false);
  assert.equal(JSON.stringify(legacy),before);
});

test('v4 adds a single compact seeded island without changing default or archived v3',()=>{
  assert.ok(WorldGen.SUPPORTED_VERSIONS.includes(4));assert.equal(WorldGen.GEN_VERSION,3);
  assert.equal(WorldGen.createWorld('default','small').v,3);
  const old=WorldGen.createWorld('legacy-v3-regression','small',3);
  assert.equal(createHash('sha256').update(JSON.stringify(WorldGen.sceneIds(old).map(id=>WorldGen.generateScene(old,id)))).digest('hex'),'d412e51b4dd81d13ef8e2a35f6a25505c84c7562cb878291d09f321daf04ea5c');
  const plan=WorldGen.createWorld('Остров света','medium',4),scene=WorldGen.generateScene(plan,'island');
  assert.equal(plan.v,4);assert.equal(plan.start,'island');assert.deepEqual(WorldGen.sceneIds(plan),['island']);
  assert.equal(scene.island.landSize,800);assert.equal(scene.W,840);assert.equal(scene.H,840);
  assert.equal(scene.gen.planVersion,4);assert.equal(scene.outdoor,true);assert.equal(scene.regionStreaming.chunkSize,10);
  for(const field of ['tiles','surface','floor','materials'])assert.equal(Object.hasOwn(scene,field),false,field+' must not allocate a grid');
  assert.ok(Buffer.byteLength(JSON.stringify(scene))<180_000,'finite interactive scene budget');
  assert.ok(scene.props.length>=25&&scene.props.length<=120);
  assert.deepEqual(WorldGen.exits(scene),[],'unimplemented voyages cannot become free exits');
  assert.equal(WorldGen.isGeneratedId(plan,'island'),true);assert.equal(WorldGen.isGeneratedId(plan,'glade'),false);
  assert.throws(()=>WorldGen.generateScene(plan,'glade'),/сцен/i);
  const stored=JSON.parse(JSON.stringify(plan));
  assert.deepEqual(WorldGen.generateScene(stored,'island'),scene);
  assert.deepEqual(WorldGen.generateScene(WorldGen.createWorld('Остров света','medium',4),'island'),scene);
});

test('minimum and maximum scene bounds have water and safe shared appearance sampling',async()=>{
  const {tileAt,sampleScene}=await sampler();
  for(const [size,n] of [['small',600],['large',1000]]){
    const plan=WorldGen.createWorld('coast-'+size,size,4),scene=WorldGen.generateScene(plan,'island');
    assert.equal(scene.island.landSize,n);assert.deepEqual(WorldGen.validateScene(scene),[]);
    const [px,py]=scene.island.landmarks.port;
    assert.equal(tileAt(scene,px,py),'floor');assert.ok(directions.some(([dx,dy])=>tileAt(scene,px+dx,py+dy)==='water'));
    assert.equal(tileAt(scene,0,0),'water');assert.equal(tileAt(scene,-1,0),'void');assert.equal(tileAt(scene,scene.W,0),'void');
    assert.equal(tileAt(scene,NaN,0),'void');assert.equal(tileAt(scene,1.5,0),'void');
    const water=sampleScene(scene,0,0);assert.equal(water.land,false);assert.equal(water.surface,'water');assert.equal(water.tile,'water');
    for(const point of Object.values(scene.island.landmarks)){const cell=sampleScene(scene,...point);assert.equal(cell.land,true);assert.equal(cell.tile,'floor');assert.ok(Number.isInteger(cell.color));}
    const route=scene.mainRoute.find(route=>route.id==='arrival-settlement'),point=route.cells[Math.floor(route.cells.length/2)];
    assert.equal(sampleScene(scene,...point).road,true);assert.equal(sampleScene(scene,...point).decoration,0);
  }
});

test('protected routes, arrivals, NPC access and encounters remain free across shore seeds',()=>{
  for(const seed of [0,1,1941,87421,'winter','swamp']){
    const scene=WorldGen.generateScene(WorldGen.createWorld(seed,'small',4),'island'),solid=new Set(scene.props.filter(blocking).map(p=>key([p.x,p.y])));
    assert.deepEqual(WorldGen.validateScene(scene),[],String(seed));
    for(const route of scene.mainRoute){
      assert.ok(route.cells.length>0&&route.cells.length<=1501);
      for(let i=0;i<route.cells.length;i++){
        const cell=route.cells[i];assert.ok(isLand(scene.island,...cell));assert.equal(solid.has(key(cell)),false,route.id);
        if(i)assert.equal(Math.abs(cell[0]-route.cells[i-1][0])+Math.abs(cell[1]-route.cells[i-1][1]),1);
      }
    }
    for(const cell of [...scene.spawns,...Object.values(scene.arrivals).flat()]){assert.ok(isLand(scene.island,...cell));assert.equal(solid.has(key(cell)),false);}
    for(const p of scene.props){assert.ok(isLand(scene.island,p.x,p.y));assert.ok(directions.some(([dx,dy])=>isLand(scene.island,p.x+dx,p.y+dy)&&!solid.has(key([p.x+dx,p.y+dy]))),'approach '+p.id);}
    const messenger=scene.props.find(p=>p.id==='messenger');assert.equal(Math.abs(messenger.departure[0]-messenger.x)+Math.abs(messenger.departure[1]-messenger.y),6);
    for(let i=1;i<=6;i++)assert.equal(solid.has(key([messenger.x+i,messenger.y])),false,'messenger animation route');
    for(const encounter of scene.encounters)for(const foe of encounter.enemies){assert.ok(isLand(scene.island,foe.x,foe.y));assert.equal(solid.has(key([foe.x,foe.y])),false);}
  }
});

test('island stories use canonical clues, ordinary encounters and actual settlement geometry',()=>{
  const found=new Set();
  for(let seed=0;seed<24;seed++){
    const plan=WorldGen.createWorld('story-'+seed,'small',4),scene=WorldGen.generateScene(plan,'island');found.add(plan.story.id);
    for(const field of ['title','arrival','problem','objective','warning','clue','report'])assert.ok(typeof plan.story[field]==='string'&&plan.story[field].length>10,field);
    assert.equal(plan.story.tutorial,undefined);assert.equal(plan.story.clueProp,'story-clue');assert.equal(plan.story.reportNpc,'elder');
    assert.deepEqual(plan.story.requiredEncounterIds,['road-threat']);assert.deepEqual(plan.story.reportRequires,{clues:['story-clue'],cleared:['road-threat']});
    assert.ok(scene.landmarks.some(mark=>mark.id==='settlement'&&mark.radius===10));
    assert.ok(scene.props.some(p=>p.id===plan.story.clueProp&&p.storyRole==='clue'&&p.gen));
    for(const id of ['elder','healer','messenger','captain']){const p=scene.props.find(p=>p.id===id);assert.equal(p.type,'npc');assert.ok(p.npc.look);assert.ok(p.npc.lines.length>=2);}
    for(const encounter of scene.encounters){assert.equal(encounter.tutorial,false);assert.equal(encounter.scriptedLoss,false);assert.ok(encounter.reward.xp>0);}
  }
  assert.equal(found.size,3);
});

test('auto keeps seeded 600..1000 variation and rejects malformed scenes before use',()=>{
  const sizes=new Set();
  for(let seed=0;seed<20;seed++){const plan=WorldGen.createWorld('auto-'+seed,'auto',4);sizes.add(plan.island.landSize);assert.ok(plan.island.landSize>=600&&plan.island.landSize<=1000);}
  assert.ok(sizes.size>10);
  assert.deepEqual(WorldGen.normalizeGen({v:4,seed:7,size:'medium'}),{v:4,seed:'7',size:'medium'});
  const scene=WorldGen.generateScene(WorldGen.createWorld('invalid','small',4),'island');
  for(const changed of [{...scene,W:scene.W-1},{...scene,tiles:[]},{...scene,spawns:[[0,0]]},{...scene,props:[{...scene.props[0],x:0,y:0}]},{...scene,mainRoute:[{id:'bad',width:3,cells:[[0,0]],surface:'dirt'}]},
    {...scene,props:[null]},{...scene,mainRoute:[null]},{...scene,landmarks:[null]},{...scene,encounters:[null]},{...scene,arrivals:[]},{...scene,enemySpawn:[[0,0]]}])assert.ok(WorldGen.validateScene(changed).length>0);
});
