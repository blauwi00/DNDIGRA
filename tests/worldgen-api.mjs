import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFileSync, readdirSync } from "node:fs";
import worker from "../dist/server/index.js";
import * as R from "../src/hero-rules.js";
const db = new DatabaseSync(":memory:");
for (const f of readdirSync(new URL("../drizzle/", import.meta.url)).filter((f2) => f2.endsWith(".sql")).sort()) db.exec(readFileSync(new URL("../drizzle/" + f, import.meta.url), "utf8"));
const DB = { async batch(statements) {
  db.exec("BEGIN");
  try {
    const r2 = [];
    for (const q of statements) r2.push(await q.run());
    db.exec("COMMIT");
    return r2;
  } catch (e) {
    db.exec("ROLLBACK");
    throw e;
  }
}, prepare(sql) {
  const q = db.prepare(sql);
  return { bind(...args) {
    return { all: async () => ({ results: q.all(...args) }), run: async () => ({ meta: { changes: q.run(...args).changes } }) };
  } };
} };
const draft = { name: "Мировой герой", classId: "wizard", stats: R.preset("wizard"), appearance: Object.fromEntries(Object.entries(R.COLORS).map(([k, v]) => [k, v[0]])), kit: 0, background: R.background("wizard", () => 0) };
draft.appearance.hairStyle = "short";
draft.appearance.face = "soft";
async function call(path, method = "GET", body, owner = "owner-a") {
  const r2 = await worker.fetch(new Request("https://game.test/api/" + path, { method, headers: { Origin: "https://game.test", ...owner ? { "oai-authenticated-user-id": owner } : {} }, body: body ? JSON.stringify(body) : void 0 }), { DB });
  return { status: r2.status, ...await r2.json() };
}

const {createWorld,generateScene,sceneIds}=await import('../src/worldgen/index.js');
const {hero}=await call('heroes','POST',draft);
for(const gen of [{seed:'x',size:'huge'},{seed:'x'.repeat(129),size:'small'},{seed:{x:1},size:'small'}])assert.equal((await call('worlds','POST',{heroId:hero.id,...gen})).status,400);
let r=await call('worlds','POST',{heroId:hero.id,seed:'integration-large',size:'large'});assert.equal(r.status,201);let w=r.world;
const plan=createWorld(w.snapshot.world.gen.seed,w.snapshot.world.gen.size);
async function reject(change){const s=structuredClone(w.snapshot);change(s);assert.equal((await call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s})).status,400);}
await reject(s=>s.scene='b999');await reject(s=>s.scene='__proto__');await reject(s=>s.party[0].x=generateScene(plan,'town').W);await reject(s=>s.world.gen.size='small');await reject(s=>s.gen.opened={'b1:fake':true});await reject(s=>s.drops=[{id:'x',name:'Мел',itemType:'gear',scene:'dng:99',x:0,y:0}]);
for(const id of sceneIds(plan)){
 const z=generateScene(plan,id),s=structuredClone(w.snapshot);s.scene=id;[s.party[0].x,s.party[0].y]=z.spawns[0];
 r=await call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s});assert.equal(r.status,200,id);w=r.world;
}
const z=generateScene(plan,'dng:1'),trap=z.traps[0],s=structuredClone(w.snapshot);s.gen.fired={['dng:1:'+trap.id]:true};s.gen.known={['dng:1:'+trap.id]:true};
r=await call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:s});assert.equal(r.status,200);w=r.world;await reject(s=>s.gen.fired={});
const chestScene=sceneIds(plan).map(id=>generateScene(plan,id)).find(z=>z.props.some(p=>p.container)),chest=chestScene.props.find(p=>p.container),claimed=structuredClone(w.snapshot);claimed.gen.opened={[chestScene.id+':'+chest.id]:true};
r=await call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:claimed});assert.equal(r.status,200);w=r.world;await reject(s=>s.gen.opened={});
assert.deepEqual((await call('worlds/'+w.id)).world.snapshot,w.snapshot);
// Persisted bounded prototype remains accepted after adding WorldGen.
const {generate}=await import('../src/location-generator.js');const old=structuredClone(w.snapshot),legacy=generate('legacy-regression');delete old.world.gen;delete old.gen;old.procedural={version:legacy.version,seed:legacy.seed};old.scene=legacy.start.location;[old.party[0].x,old.party[0].y]=[legacy.start.x,legacy.start.y];db.prepare('UPDATE worlds SET snapshot=? WHERE id=?').run(JSON.stringify(old),w.id);
r=await call('worlds/'+w.id,'PUT',{revision:w.revision,snapshot:old});assert.equal(r.status,200);assert.deepEqual(r.world.snapshot.procedural,old.procedural);
console.log('PASS worldgen API: seed/size validation, all '+sceneIds(plan).length+' generated scenes, bounds, colon IDs, invalid drops/flags, immutable metadata, no chest/trap reset, load and legacy procedural saves.');db.close();
