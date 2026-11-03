import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {PROP_MODELS} from '../src/props-index.js';
assert.ok(existsSync(new URL('../src/region-walk.js',import.meta.url)), 'The bounded region walk fixture must exist');
const {createRegionWalk}=await import('../src/region-walk.js');
const env={};env.window=env;vm.createContext(env);vm.runInContext(readFileSync(new URL('../dist/world.js',import.meta.url),'utf8'),env);
for(const seed of ['walking','other',0]){
  const scene=createRegionWalk(seed);
  assert.deepEqual(scene,createRegionWalk(seed),'The same seed reproduces the whole fixture');
  assert.equal(scene.id,'region-walk');assert.equal(scene.W,96);assert.equal(scene.H,64);assert.equal(scene.outdoor,true);
  assert.ok(!scene.gen,'The fixture must not claim a frozen generator version');
  env.World.compileCollisions(scene);
  const blocked=new Set(scene.collisions.filter(c=>c.blocksMovement).map(c=>`${c.x},${c.y}`));
  const free=(x,y)=>scene.tiles[y]?.[x]==='floor'&&!blocked.has(`${x},${y}`);
  const queue=[scene.spawns[0]],seen=new Set([queue[0].join(',')]);
  for(let i=0;i<queue.length;i++){const[x,y]=queue[i];for(const[dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const a=x+dx,b=y+dy,key=`${a},${b}`;if(free(a,b)&&!seen.has(key)){seen.add(key);queue.push([a,b]);}}}
  let freeCount=0;for(let y=0;y<scene.H;y++)for(let x=0;x<scene.W;x++)if(free(x,y))freeCount++;
  assert.equal(seen.size,freeCount,'Every walkable floor cell remains connected after furniture placement');
  for(let x=2;x<94;x++)for(let y=30;y<=34;y++)assert.ok(free(x,y),'The wide main road stays clear');
  for(let y=2;y<62;y++)for(let x=46;x<=50;x++)assert.ok(free(x,y),'The wide crossing road stays clear');
  for(const[x,y]of [...scene.spawns,...scene.trainingSpawn,...scene.enemySpawn])assert.ok(seen.has(`${x},${y}`),'Actor spawns remain accessible');
  const ids=new Set();for(const p of scene.props){assert.ok(!ids.has(p.id),'Prop IDs are unique');ids.add(p.id);assert.ok(!['npc','portal'].includes(p.type),'No fake NPC or unfinished transitions');if(p.model)assert.ok(PROP_MODELS.includes(p.model),'Use existing visual models');assert.ok([[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen.has(`${p.x+dx},${p.y+dy}`)),'Every object has a reachable adjacent cell');}
  assert.ok(ids.has('walk-camp-chest'));assert.ok(ids.has('walk-ruins-chest'));assert.ok(scene.landmarks.length>=3);
}
assert.notDeepEqual(createRegionWalk('walking').surface,createRegionWalk('other').surface,'Seed varies the scenery without changing safe roads');
console.log('PASS deterministic bounded region roads, connectivity, models and interactions');
