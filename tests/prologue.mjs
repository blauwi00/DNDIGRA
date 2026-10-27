import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';
import vm from 'node:vm';
import {PROP_MODELS,build as buildProp} from '../src/props-index.js';
// Removing a gate would let the player skip the peaceful days; replaying a
// resolution must never award gold twice. These are gameplay/save contracts.
assert.ok(existsSync(new URL('../src/prologue-rules.js',import.meta.url)), 'The playable caravan episode needs its own saved progression');
const {initial,advance,objective,scenes,valid}=await import('../src/prologue-rules.js');
assert.notDeepEqual(buildProp({id:'carriage',model:'cart'}),buildProp({id:'carriage',model:'cart',wrecked:true}),'The overturned carriage must visibly differ from the intact one');
let s=initial();
assert.equal(s.phase,'day1');assert.equal(valid(s),true);
assert.deepEqual(advance(s,'depart'),s);assert.deepEqual(advance(s,'sleep'),s);
for(const event of ['greet','supplies','deliver','sleep'])s=advance(s,event);
assert.equal(s.phase,'day2');assert.deepEqual(advance(s,'sleep'),s);
const paths=[];
for(const choice of ['cargo','medicine']){
 let p=advance(s,choice);p=advance(p,'prepare');p=advance(p,'sleep');
 assert.equal(p.phase,'departure');p=advance(p,'depart');assert.equal(p.phase,'ride');
 p=advance(p,'arrive');assert.equal(p.phase,'ambush');p=advance(p,'victory');assert.equal(p.phase,'crash');
 p=advance(p,'wake');assert.equal(p.phase,'aftermath');
 assert.deepEqual(advance(p,'return'),p,'Cannot return an unfound bag');
 p=advance(p,'tracks');p=advance(p,'recover');p=advance(p,'return');
 assert.equal(p.phase,'done');assert.equal(p.ending,'helped');
 assert.deepEqual(advance(p,'return'),p,'A completed task is idempotent');
 assert.ok(objective(p));assert.equal(valid(JSON.parse(JSON.stringify(p))),true);paths.push(p);
}
assert.notEqual(paths[0].preparation,paths[1].preparation,'The preparation choice survives the entire story');
assert.equal(advance({...paths[0],phase:'aftermath',recovered:false},'leave').ending,'left');
assert.equal(valid({v:1,phase:'invented'}),false);
const env={};env.window=env;vm.createContext(env);vm.runInContext(readFileSync(new URL('../dist/world.js',import.meta.url),'utf8'),env);
for(const state of [initial(),s,...paths,{...paths[0],phase:'ambush'},{...paths[0],phase:'aftermath'}]){
 for(const scene of Object.values(scenes(state))){
  env.World.compileCollisions(scene);
  const free=p=>scene.tiles[p.y]?.[p.x]==='floor'&&!env.World.collisionAt(scene,p.x,p.y)?.blocksMovement;
  const from={x:scene.spawns[0][0],y:scene.spawns[0][1]};assert.ok(free(from));
  for(const p of scene.props){
   if(p.model)assert.ok(PROP_MODELS.includes(p.model),'Reuse a real model: '+p.model);
   if(!p.prologue)continue;
   assert.ok(env.World.directions.some(([dx,dy])=>{const to={x:p.x+dx,y:p.y+dy};return free(to)&&env.World.shortestPath(scene,from,to,free);}), 'Reachable interaction: '+p.id);
  }
  for(const e of scene.encounters.flatMap(e=>e.enemies))assert.ok(free(e),'Enemy spawn is not blocked');
 }
}
console.log('PASS peaceful days, gated departure, both consequences, recovery, replay and reachable scenes');
