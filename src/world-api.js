import { slotsUsed, CAPACITY, handType, focusName } from "./inventory-rules.js";
import { CLASSES } from "./hero-rules.js";
import {generate} from './location-generator.js';
import {createWorld,generateScene,isGeneratedId,normalizeGen,SUPPORTED_VERSIONS,randomSeed,validateScene} from './worldgen/world.js';
import {createTutorial,validateTutorial} from './tutorial-rules.js';
const plans=new Map(),checkedScenes=new WeakSet();
function genMeta(raw){if(!raw||typeof raw!=='object'||Array.isArray(raw)||![undefined,...SUPPORTED_VERSIONS].includes(raw.v)||!['string','number'].includes(typeof raw.seed)||!String(raw.seed).length||String(raw.seed).length>128||!['auto','small','medium','large'].includes(raw.size))throw Error('Некорректное зерно, размер или версия генератора.');return normalizeGen(raw);}
function planFor(meta){const key=JSON.stringify(meta);if(!plans.has(key)){if(plans.size>=16)plans.delete(plans.keys().next().value);plans.set(key,createWorld(meta.seed,meta.size,meta.v));}return plans.get(key);}
const layouts = new Map();
function layout(meta) {
  const key = meta.version + ':' + meta.seed;
  if (!layouts.has(key)) {
    const world = generate(meta.seed, {version:meta.version});
    if (layouts.size >= 16) layouts.delete(layouts.keys().next().value);
    layouts.set(key, world);
  }
  return layouts.get(key);
}
const json = (v, status = 200) => Response.json(v, { status, headers: { "Cache-Control": "no-store" } }), xp = [0, 300, 900, 2700, 6500, 14e3, 23e3, 34e3, 48e3, 64e3, 85e3, 1e5, 12e4, 14e4, 165e3, 195e3, 225e3, 265e3, 305e3, 355e3];
const one = async (db, sql, ...args) => (await db.prepare(sql).bind(...args).all()).results[0];
async function tutorialCompleted(db, owner) {
  return !!await one(db,"SELECT owner FROM player_progress WHERE owner = ? AND tutorial_version >= 1 UNION ALL SELECT owner FROM worlds WHERE owner = ? AND json_extract(snapshot, '$.tutorial.completed') = 1 AND json_extract(snapshot, '$.tutorial.mode') = 'campaign' LIMIT 1",owner,owner);
}
const record = (r) => ({ id: r.id, heroId: r.hero_id, status: r.status, revision: r.revision, createdAt: r.created_at, updatedAt: r.updated_at, snapshot: JSON.parse(r.snapshot) });
function generatedData(snapshot) {
  if (!snapshot.world?.gen) return {};
  const plan = planFor(genMeta(snapshot.world.gen));
  return { generated: { plan, scene: generateScene(plan, snapshot.scene) } };
}
export function initialWorld(hero, id, chapter, options = {}) {
  if (options.skipTutorial !== undefined && typeof options.skipTutorial !== 'boolean') throw Error('Некорректный выбор обучения.');
  if (options.skipTutorial && !options.tutorialCompleted) throw Error('Сначала пройдите обучение — его можно пропустить в следующем приключении.');
  const a = structuredClone(hero);
  Object.assign(a, { x: 5, y: 9, facing: 2, move: a.speed, acted: false, bonusUsed: false, reactionUsed: false, concentration: null, conditions: [], death: { success: 0, failure: 0, stable: false } });
  const seed = new Uint32Array(1);
  crypto.getRandomValues(seed);
  const gen=genMeta({v:options.generatorVersion??3,seed:options.seed===undefined||options.seed===''?randomSeed():options.seed,size:options.size??'auto'}), plan=planFor(gen), startScene=generateScene(plan,plan.start);
  Object.assign(a,{x:startScene.spawns[0][0],y:startScene.spawns[0][1]});
  const title=plan.name;
  const snapshot = { world: { id, heroId: a.id, title, chapter, discovered: [plan.start], gen }, gen:{}, scene: plan.start, round: 1, combat: false, active: a.id, gold: 0, xp: a.xp, level: a.level, potions: 0, chest: false, relic: false, seed: seed[0], doors: {}, loot: {}, altarClaims: {}, lightFixtures: {}, settings: { lights: true, animations: true, grid: true, ambient: 0.28, intensity: 1 }, party: [a], enemies: [], rolls: [], advantage: 0, order: [], cursor: 0, autoShield: false, rulesStage: 3, logs: ['Новый мир: '+plan.name+'. Зерно: '+gen.seed+'.'] };
  if (gen.v === 3) {
    snapshot.story = {v:1,intro:0,npcWarned:false,npcDeparted:false,clues:[],cleared:[],reachedSettlement:false,reported:false};
    snapshot.tutorial = createTutorial({classId:a.classId,skip:options.skipTutorial,canSkip:!!options.tutorialCompleted});
    snapshot.encounter = null;
  }
  return snapshot;
}
function carry(previous) {
  const s = previous.snapshot, a = structuredClone(s.party[0]), c = CLASSES[a.classId], kit = c.kits[a.kit];
  a.level = s.level;
  a.xp = s.xp;
  a.gold = 0;
  a.inventory = a.inventory.filter((v) => v === kit.armor || v.startsWith(kit.armor) || a.hands.includes("sword") && handType(v) === "sword" || a.hands.includes("shield") && handType(v) === "shield" || a.hands.includes("staff") && (handType(v) === "staff" || focusName(v)));
  a.torches = 0;
  a.hands = a.hands.map((v) => v === "torch" ? "empty" : v);
  a.torch = false;
  return a;
}
const plain = value => !!value && typeof value === 'object' && !Array.isArray(value);
const uniqueKnown = (values, known) => Array.isArray(values) && values.length <= known.size && new Set(values).size === values.length && values.every(v=>typeof v==='string' && known.has(v));
function encounterDefinition(plan, scene, id) {
  const tutorial = plan.story?.tutorial;
  for (const name of ['win','loss']) if (tutorial?.[name]?.id === id && tutorial[name].scene === scene) return {...tutorial[name],tutorial:true,scriptedLoss:name==='loss'};
  return generateScene(plan,scene).encounters?.find(e=>e.id===id);
}
function validateEnemies(enemies, scene) {
  const ids=new Set();
  for(const enemy of enemies){
    if(!plain(enemy)||typeof enemy.id!=='string'||!enemy.id.length||enemy.id.length>80||ids.has(enemy.id)||typeof enemy.name!=='string'||!enemy.name.length||enemy.name.length>200||![3,4].includes(enemy.kind))throw Error('Некорректный противник.');
    ids.add(enemy.id);
    for(const key of ['x','y','hp','max','ac'])if(!Number.isSafeInteger(enemy[key])||enemy[key]<0)throw Error('Некорректные ресурсы противника.');
    if(enemy.max<1||enemy.hp>enemy.max||enemy.x>=scene.W||enemy.y>=scene.H||scene.tiles&&scene.tiles[enemy.y]?.[enemy.x]!=='floor')throw Error('Некорректное положение или здоровье противника.');
    for(const key of ['facing','move','slots','maxSlots','hitDice','maxHitDice'])if(enemy[key]!==undefined&&(!Number.isSafeInteger(enemy[key])||enemy[key]<0))throw Error('Некорректный лист противника.');
    if(enemy.facing!==undefined&&enemy.facing>3||enemy.conditions!==undefined&&(!Array.isArray(enemy.conditions)||enemy.conditions.length>20||enemy.conditions.some(c=>typeof c!=='string'||c.length>80)))throw Error('Некорректное состояние противника.');
    for(const key of ['dead','acted','bonusUsed','reactionUsed'])if(enemy[key]!==undefined&&typeof enemy[key]!=='boolean')throw Error('Некорректное состояние противника.');
  }
}
function validateAdventure(s, old, plan, sceneFor) {
  const story=s.story, before=old.story;
  const fields=['v','intro','npcWarned','npcDeparted','clues','cleared','reachedSettlement','reported'];
  if(!plain(story)||!plain(before)||Object.keys(story).length!==fields.length||Object.keys(story).some(k=>!fields.includes(k))||story.v!==1||!Number.isInteger(story.intro)||story.intro<0||story.intro>3||story.intro<before.intro)throw Error('Некорректное вступление истории.');
  for(const key of ['npcWarned','npcDeparted','reachedSettlement','reported'])if(typeof story[key]!=='boolean'||before[key]&&!story[key])throw Error('Нельзя сбросить историю приключения.');
  const encounters=new Map();
  for(const id of Object.keys(plan.scenes))for(const encounter of generateScene(plan,id).encounters||[])encounters.set(encounter.id,encounter);
  if(!uniqueKnown(story.clues,new Set([plan.story.clueProp]))||!uniqueKnown(story.cleared,new Set(encounters.keys()))||before.clues.some(c=>!story.clues.includes(c))||before.cleared.some(c=>!story.cleared.includes(c)))throw Error('Некорректные находки или завершённые встречи.');
  if(story.npcDeparted&&(!story.npcWarned||story.intro!==3)||story.reachedSettlement&&!before.reachedSettlement&&s.scene!=='settlement')throw Error('Некорректный этап путешествия.');
  if(story.reported&&(!story.reachedSettlement||!story.clues.includes(plan.story.clueProp)||!story.cleared.includes('road-threat')))throw Error('Сначала найдите сведения и доберитесь до поселения.');
  if(!validateTutorial(s.tutorial,old.tutorial)||s.tutorial.classId!==s.party[0].classId)throw Error('Некорректный этап обучения.');
  const completesOrdinaryEncounter=old.encounter?.tutorial===false&&old.encounter.scriptedLoss===false&&encounters.has(old.encounter.id)&&!before.cleared.includes(old.encounter.id)&&story.cleared.includes(old.encounter.id);
  if(typeof s.combat!=='boolean'||old.combat&&s.combat&&s.scene!==old.scene&&!completesOrdinaryEncounter)throw Error('Нельзя покинуть место незавершённого боя.');
  if(s.encounter!==null){
    const active=s.encounter, keys=['id','scene','name','tutorial','scriptedLoss','reward'];
    const rescueCheckpoint=plain(active)&&active.tutorial===true&&active.scriptedLoss===true&&['loss','rescue'].includes(s.tutorial.phase)&&s.party[0].hp===0&&s.enemies.length===0;
    const defeatCheckpoint=plain(active)&&active.tutorial===false&&active.scriptedLoss===false&&s.party[0].hp===0&&s.enemies.some(e=>e.hp>0);
    if(!plain(active)||Object.keys(active).length!==keys.length||Object.keys(active).some(k=>!keys.includes(k))||typeof active.id!=='string'||active.scene!==s.scene||!s.combat&&!rescueCheckpoint&&!defeatCheckpoint||typeof active.tutorial!=='boolean'||typeof active.scriptedLoss!=='boolean')throw Error('Некорректная встреча.');
    const canonical=encounterDefinition(plan,active.scene,active.id);
    if(!canonical||active.name!==canonical.name||active.tutorial!==!!canonical.tutorial||active.scriptedLoss!==!!canonical.scriptedLoss||!plain(active.reward)||Object.keys(active.reward).sort().join()!=='gold,xp'||active.reward.xp!==canonical.reward.xp||active.reward.gold!==canonical.reward.gold||story.cleared.includes(active.id))throw Error('Некорректный противник или награда встречи.');
    // A single debounced save can cover victory and the next encounter.
    // Tutorial progress or a newly cleared canonical ordinary encounter must
    // account for the encounter that was active in the saved checkpoint.
    const advancesTutorial=old.encounter?.id===plan.story.tutorial.win.id&&old.encounter.tutorial===true&&old.encounter.scriptedLoss===false&&active.id===plan.story.tutorial.loss.id&&active.tutorial===true&&active.scriptedLoss===true&&s.tutorial.step>=17&&s.tutorial.checks.victory===true;
    if(old.encounter&&old.encounter.id!==active.id&&!advancesTutorial&&!completesOrdinaryEncounter)throw Error('Сначала завершите текущую встречу.');
    const allowed=new Set(canonical.enemies.map(e=>e.id));
    if(s.enemies.some(e=>!allowed.has(e.id))||s.order.some(id=>id!==s.active&&!allowed.has(id)))throw Error('Неизвестный участник боя.');
    for(const enemy of s.enemies){const original=canonical.enemies.find(e=>e.id===enemy.id);if(enemy.visual!==original.visual||JSON.stringify(enemy.gen)!==JSON.stringify(original.gen))throw Error('Нельзя менять облик противника встречи.');}
  }else if(s.combat||s.enemies.length)throw Error('Бой не связан с текущей встречей.');
  let allowedXP=0,allowedGold=0;
  for(const id of story.cleared)if(!before.cleared.includes(id)){const reward=encounters.get(id).reward;allowedXP+=reward.xp;allowedGold+=reward.gold;}
  for(const [key,opened] of Object.entries(s.gen.opened||{}))if(opened&&!old.gen?.opened?.[key]){const i=key.lastIndexOf(':'),scene=sceneFor(key.slice(0,i)),prop=scene?.props.find(p=>p.id===key.slice(i+1));allowedGold+=prop?.loot?.gold||0;}
  if(s.xp-old.xp>allowedXP||s.gold-old.gold>allowedGold)throw Error('Награду приключения нельзя получить повторно.');
}
export function canFinishWorld(snapshot) {
  if(snapshot.combat||snapshot.party?.[0]?.dead||!(snapshot.party?.[0]?.hp>0))return false;
  if(snapshot.world?.gen?.v===3)return snapshot.story?.reported===true&&snapshot.tutorial?.completed===true&&validateTutorial(snapshot.tutorial,snapshot.tutorial);
  return !!snapshot.procedural||!!snapshot.world?.gen||snapshot.episode?.stage==='done';
}
export function validateWorldSnapshot(s, old) {
  if (JSON.stringify(s?.procedural) !== JSON.stringify(old.procedural)) throw Error('Нельзя менять seed или версию существующего мира.');
  if(JSON.stringify(s?.world?.gen)!==JSON.stringify(old.world?.gen))throw Error('Нельзя менять зерно, размер или версию существующего мира.');
  const plan=old.world?.gen?planFor(genMeta(old.world.gen)):null;
  const scenes = old.procedural ? layout(old.procedural).locations : [{id:'hub',W:18,H:14},{id:'crypt',W:13,H:12}];
  const sceneFor=id=>{if(!plan)return scenes.find(p=>p.id===id);if(typeof id!=='string'||!Object.hasOwn(plan.scenes,id)||!isGeneratedId(plan,id))return null;const z=generateScene(plan,id);if(!checkedScenes.has(z)){if(validateScene(z).length)throw Error('Сцена не прошла проверку генератора.');checkedScenes.add(z);}return z;};
  const scene = sceneFor(s?.scene);
  if (!s || typeof s !== "object" || !scene || !Array.isArray(s.party) || s.party.length !== 1 || s.party[0].id !== old.party[0].id || s.active !== old.active) throw Error("Некорректное состояние мира.");
  if(plan){
    const flags=['opened','unlocked','known','disarmed','fired','jammed','talk'];
    if(!s.gen||typeof s.gen!=='object'||Array.isArray(s.gen)||Object.keys(s.gen).some(k=>!flags.includes(k)&&k!=='alarm'))throw Error('Некорректное состояние генератора.');
    if(s.gen.alarm!==undefined&&typeof s.gen.alarm!=='boolean')throw Error('Некорректная тревога.');
    for(const field of flags){const map=s.gen[field]||{};if(!map||typeof map!=='object'||Array.isArray(map)||Object.keys(map).length>4000)throw Error('Слишком много изменений мира.');
      for(const [key,value] of Object.entries(map)){const split=key.lastIndexOf(':'),sid=key.slice(0,split),pid=key.slice(split+1),z=sceneFor(sid),p=z?.props.find(p=>p.id===pid),trap=z?.traps?.find(t=>t.id===pid);
        const valid=field==='talk'?p?.npc:field==='opened'?p?.container:field==='unlocked'||field==='jammed'?p?.lock:p?.trap||trap;
        if(!valid||(field==='talk'? !Number.isInteger(value)||value<0||value>=p.npc.lines.length:typeof value!=='boolean'))throw Error('Некорректное изменение предмета.');
      }
      if(field!=='talk')for(const [key,v]of Object.entries(old.gen?.[field]||{}))if(v&&!map[key])throw Error('Нельзя сбросить добычу, замок или ловушку.');
    }
    if(old.gen?.alarm&&!s.gen.alarm)throw Error('Нельзя сбросить тревогу.');
  }else if(s.gen!==undefined)throw Error('Состояние генератора недоступно в старом мире.');
  const a = s.party[0], prev = old.party[0];
  for (const key of ["name", "genitive", "classId", "className", "kind", "background", "appearance", "kit", "hitDie", "speed", "confirmed"]) if (JSON.stringify(a[key]) !== JSON.stringify(prev[key])) throw Error("Нельзя менять подтверждённого героя.");
  for (const k of ["level", "xp", "gold", "potions", "round", "cursor"]) if (!Number.isInteger(s[k]) || s[k] < 0) throw Error("Некорректные ресурсы мира.");
  if (s.level < old.level || s.level > Math.min(20, old.level + 1) || s.level < 1 || s.xp < old.xp || s.level > 1 && s.xp < xp[s.level - 1]) throw Error("Некорректная прокачка.");
  for (const k of ["hp", "max", "slots", "maxSlots", "secondWind", "maxSecondWind", "hitDice", "maxHitDice", "torches", "armorAC", "ac", "baseAC", "x", "y", "facing", "move"]) if (!Number.isInteger(a[k]) || a[k] < 0) throw Error("Некорректный лист героя.");
  if (a.hp > a.max || a.max < 1 || a.slots > a.maxSlots || a.hitDice > a.maxHitDice || a.secondWind > a.maxSecondWind || a.x >= scene.W || a.y >= scene.H || a.facing > 3 || a.move > a.speed * 2) throw Error("Некорректное положение или ресурсы героя.");
  if (scene.tiles && (scene.tiles[a.y]?.[a.x] !== 'floor' || scene.props.some(p=>p.x===a.x&&p.y===a.y&&p.solid!==false&&!(p.type==='door'&&(s.doors?.[scene.id+':'+p.id]||s.gen?.unlocked?.[scene.id+':'+p.id]))&&!(p.type==='chest'&&s.loot?.[scene.id+':'+p.id])))) throw Error('Герой не может находиться внутри стены или мебели.');
  if (Object.keys(a.stats || {}).sort().join() !== Object.keys(prev.stats).sort().join() || Object.values(a.stats).some((v) => !Number.isInteger(v) || v < 3 || v > 20)) throw Error("Некорректные характеристики.");
  if (!Array.isArray(a.inventory) || a.inventory.length > 100 || a.inventory.some((v) => typeof v !== "string" || v.length > 200) || !Array.isArray(a.hands) || a.hands.length !== 2 || a.hands.some((v) => !["sword", "shield", "staff", "bow", "torch", "empty"].includes(v))) throw Error("Некорректный инвентарь.");
  if (a.armorEquipped !== void 0 && typeof a.armorEquipped !== "boolean") throw Error("Некорректное состояние брони.");
  if (slotsUsed(a, s) > Math.max(CAPACITY, slotsUsed(prev, old))) throw Error("В рюкзаке только 20 ячеек.");
  for (const k of ["doors", "loot", "altarClaims", "lightFixtures"]) if (!s[k] || typeof s[k] !== "object" || Array.isArray(s[k]) || Object.keys(s[k]).length > (plan?4000:150)) throw Error("Некорректные предметы мира.");
  if(plan)for(const field of ['doors','loot','altarClaims','lightFixtures'])for(const [key,value]of Object.entries(s[field])){
    const i=key.lastIndexOf(':'),z=sceneFor(key.slice(0,i)),p=z?.props.find(p=>p.id===key.slice(i+1));
    if(!p)throw Error('Неизвестный предмет мира.');
    if(field==='doors'&&(p.type!=='door'||typeof value!=='boolean'||value&&p.lock&&!s.gen.unlocked?.[key]))throw Error('Запертая дверь не открыта.');
    if(field==='loot'&&(!p.container||typeof value!=='boolean'||value&&!s.gen.opened?.[key]))throw Error('Контейнер не открыт.');
    if(field==='altarClaims'&&p.type!=='altar')throw Error('Неизвестный алтарь.');
    if(field==='lightFixtures'&&p.type!=='torch')throw Error('Неизвестный факел.');
  }
  for (const k of ["loot", "altarClaims"]) for (const [id, claimed] of Object.entries(old[k] || {})) if (claimed && !s[k][id]) throw Error("Полученную добычу нельзя сбросить.");
  if (old.episodeRewarded && !s.episodeRewarded) throw Error("Награду нельзя получить повторно.");
  const stages = { investigate: 0, report: 1, done: 2 };
  if (old.episode) {
    if (!(s.episode?.stage in stages) || stages[s.episode.stage] < stages[old.episode.stage]) throw Error("Нельзя сбросить историю мира.");
    for (const [key, v] of Object.entries(old.episode.attempts)) if (v && !s.episode.attempts?.[key]) throw Error("Нельзя сбросить проверку.");
    if (old.episode.unlocked && !s.episode.unlocked) throw Error("Нельзя сбросить открытый проход.");
  } else delete s.episode;
  if (!Array.isArray(s.logs) || s.logs.length > 120 || s.logs.some((v) => typeof v !== "string" || v.length > 6e3) || !Array.isArray(s.rolls) || s.rolls.length > 40 || !Array.isArray(s.enemies) || s.enemies.length > 10 || !Array.isArray(s.order) || s.order.length > 12) throw Error("Некорректная хроника или бой.");
  validateEnemies(s.enemies,scene);
  if(plan?.v===3)validateAdventure(s,old,plan,sceneFor);
  if (s.drops !== void 0 && (!Array.isArray(s.drops) || s.drops.length > 100 || s.drops.some(d=>{const z=sceneFor(d?.scene);return !d||typeof d.id!=='string'||d.id.length>80||typeof d.name!=='string'||d.name.length>200||!['gear','torch','potion'].includes(d.itemType)||!z||!Number.isInteger(d.x)||!Number.isInteger(d.y)||d.x<0||d.y<0||d.x>=z.W||d.y>=z.H||z.tiles&&z.tiles[d.y]?.[d.x]!=='floor';}))) throw Error("Некорректная добыча на полу.");
  if (s.npcGifts !== void 0 && (!Array.isArray(s.npcGifts) || s.npcGifts.length > 200 || s.npcGifts.some((v) => typeof v !== "string" || v.length > 300))) throw Error("Некорректные передачи вещей.");
  s.world = { ...old.world, discovered: [.../* @__PURE__ */ new Set([...old.world.discovered, s.scene])] };
  delete s.heroTestId;
  delete s.trial;
  return s;
}
export async function worldAPI(request, env) {
  const owner = request.headers.get("oai-authenticated-user-id");
  if (!owner) return json({ error: "Войдите в игру, чтобы открыть мир." }, 401);
  const url = new URL(request.url), parts = url.pathname.split("/").filter(Boolean), id = parts[2];
  try {
    if (request.method !== "GET") {
      const origin = request.headers.get("Origin");
      if (origin && origin !== url.origin) return json({ error: "Недопустимый источник запроса." }, 403);
    }
    if (request.method === "GET") {
      if (id) {
        const row = await one(env.DB, "SELECT * FROM worlds WHERE id = ? AND owner = ?", id, owner);
        if (!row) return json({ error: "Мир не найден." }, 404);
        const world = record(row);
        if (parts[3] === 'scene') {
          const sid = url.searchParams.get('id'), meta = world.snapshot.world?.gen;
          if (!meta) return json({ error: 'Этот мир не использует генератор.' }, 400);
          const plan = planFor(genMeta(meta));
          if (!sid || !Object.hasOwn(plan.scenes, sid)) return json({ error: 'Место не найдено.' }, 404);
          return json({ scene: generateScene(plan, sid) });
        }
        return json({ world: { ...world, ...generatedData(world.snapshot) } });
      }
      const heroId = url.searchParams.get("hero_id");
      if (!heroId) return json({ error: "Выберите героя." }, 400);
      const rows = await env.DB.prepare("SELECT * FROM worlds WHERE owner = ? AND hero_id = ? ORDER BY created_at DESC").bind(owner, heroId).all();
      return json({ worlds: rows.results.map(record),tutorialCompleted:await tutorialCompleted(env.DB,owner) });
    }
    const raw = await request.text();
    if (raw.length > 512000) return json({ error: "Сохранение слишком большое." }, 413);
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return json({ error: "Некорректные данные." }, 400);
    }
    if(!plain(body))return json({error:'Некорректные данные.'},400);
    if (request.method === "DELETE" && id) {
      const row = await one(env.DB, "SELECT * FROM worlds WHERE id = ? AND owner = ?", id, owner);
      if (!row) return json({ error: "Мир не найден." }, 404);
      if (body.revision !== row.revision) return json({ error: "Мир изменился. Обновите сохранение перед удалением.", conflict: true }, 409);
      const snap = JSON.parse(row.snapshot), hero = { ...snap.party[0], level: snap.level, xp: snap.xp, gold: snap.gold, checkpointAt: Date.now(), checkpointChapter: snap.world.chapter };
      const result = await env.DB.batch([env.DB.prepare("UPDATE heroes SET sheet = ? WHERE id = ? AND owner = ? AND (json_extract(sheet, '$.checkpointAt') IS NULL OR json_extract(sheet, '$.checkpointAt') <= ?) AND EXISTS (SELECT 1 FROM worlds WHERE id = ? AND owner = ? AND revision = ?) AND NOT EXISTS (SELECT 1 FROM worlds WHERE hero_id = ? AND owner = ? AND created_at > ?)").bind(JSON.stringify(hero), row.hero_id, owner, row.updated_at, id, owner, row.revision, row.hero_id, owner, row.created_at), env.DB.prepare("DELETE FROM worlds WHERE id = ? AND owner = ? AND revision = ?").bind(id, owner, row.revision)]);
      if (!result[1].meta?.changes) return json({ error: "Мир изменился. Обновите список.", conflict: true }, 409);
      return json({ deleted: true });
    }
    if (request.method === "POST" && !id) {
      const h = await one(env.DB, "SELECT sheet FROM heroes WHERE id = ? AND owner = ?", body.heroId, owner);
      if (!h) return json({ error: "Герой не найден." }, 404);
      const active = await one(env.DB, "SELECT * FROM worlds WHERE hero_id = ? AND status = 'active'", body.heroId);
      if (active) return json({ error: "Герой уже проходит другой мир. Продолжите его историю.", world: record(active) }, 409);
      const latest = await one(env.DB, "SELECT * FROM worlds WHERE hero_id = ? AND owner = ? ORDER BY created_at DESC LIMIT 1", body.heroId, owner), previous = latest ? record(latest) : null;
      if (previous && !(JSON.parse(h.sheet).checkpointAt > previous.updatedAt) && previous.snapshot.gold > 0 && !body.leaveGold) return json({ error: "Лимит переноса золота ещё не настроен. Можно пока оставить всё золото в архиве завершённого мира.", transferPending: true }, 409);
      const base = JSON.parse(h.sheet), checkpointNewer = base.checkpointAt > (previous?.updatedAt || 0);
      const hero = checkpointNewer ? base : previous ? carry(previous) : base;
      if (hero.dead || hero.hp <= 0) return json({ error: "Этот герой не может начать новый мир." }, 409);
      const worldId=crypto.randomUUID();let snapshot;
      const completed=await tutorialCompleted(env.DB,owner);
      try{snapshot=initialWorld(hero,worldId,Math.max(previous?.snapshot.world.chapter||0,hero.checkpointChapter||0)+1,{...body,tutorialCompleted:!!completed});}catch(e){return json({error:e.message},400);}const now=Date.now();
      try {
        await env.DB.prepare("INSERT INTO worlds (id, hero_id, owner, status, snapshot, revision, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(worldId, body.heroId, owner, "active", JSON.stringify(snapshot), 1, now, now).run();
      } catch (e) {
        if (String(e).includes("UNIQUE")) return json({ error: "Мир уже создан. Обновите список." }, 409);
        throw e;
      }
      return json({ world: { id: worldId, heroId: body.heroId, status: "active", snapshot, revision: 1, createdAt: now, updatedAt: now, ...generatedData(snapshot) } }, 201);
    }
    if (id && (request.method === "PUT" || request.method === "POST" && parts[3] === "finish")) {
      const row = await one(env.DB, "SELECT * FROM worlds WHERE id = ? AND owner = ?", id, owner);
      if (!row) return json({ error: "Мир не найден." }, 404);
      if (row.status !== "active") return json({ error: "Завершённый мир доступен только для просмотра." }, 409);
      if (body.revision !== row.revision) return json({ error: "Мир уже изменился в другой вкладке. Загрузите последнее сохранение.", conflict: true }, 409);
      const old = JSON.parse(row.snapshot);
      let snapshot;
      try {
        snapshot = request.method === "PUT" ? validateWorldSnapshot(body.snapshot, old) : old;
      } catch (e) {
        return json({ error: e.message }, 400);
      }
      const finish = parts[3] === "finish";
      if (finish && !canFinishWorld(snapshot)) return json({ error: "Сначала завершите историю, обучение и бой." }, 400);
      const now=Date.now(),save=env.DB.prepare("UPDATE worlds SET snapshot = ?, revision = revision + 1, status = ?, updated_at = ? WHERE id = ? AND owner = ? AND revision = ? AND status = ?").bind(JSON.stringify(snapshot),finish?'completed':'active',now,id,owner,body.revision,'active');
      let result;
      if(snapshot.world?.gen?.v===3&&snapshot.tutorial?.completed&&snapshot.tutorial.mode==='campaign'){
        const progress=env.DB.prepare("INSERT INTO player_progress (owner, tutorial_version, updated_at) SELECT ?, 1, ? WHERE EXISTS (SELECT 1 FROM worlds WHERE id = ? AND owner = ? AND revision = ? AND json_extract(snapshot, '$.tutorial.completed') = 1 AND json_extract(snapshot, '$.tutorial.mode') = 'campaign') ON CONFLICT(owner) DO UPDATE SET tutorial_version = MAX(player_progress.tutorial_version, excluded.tutorial_version), updated_at = excluded.updated_at").bind(owner,now,id,owner,row.revision+1);
        [result]=await env.DB.batch([save,progress]);
      }else result=await save.run();
      if (!result.meta?.changes) return json({ error: "Сохранение изменилось. Загрузите последнюю версию.", conflict: true }, 409);
      return json({ world: { ...record(row), snapshot, status: finish ? "completed" : "active", revision: row.revision + 1, updatedAt: now } });
    }
    return json({ error: "Метод недоступен." }, 405);
  } catch (e) {
    console.error("World storage failed", e);
    return json({ error: "Не удалось сохранить мир. Прогресс в открытой игре сохранён; повторите попытку." }, 503);
  }
}
