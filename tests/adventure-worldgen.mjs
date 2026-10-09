import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { createWorld, generateScene, sceneIds, exits, validateScene, normalizeGen, gmBrief, npcBrief } from '../src/worldgen/world.js';
import * as Runtime from '../src/worldgen/runtime.js';

const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const key = ([x, y]) => `${x},${y}`;
const hash = value => createHash('sha256').update(JSON.stringify(value)).digest('hex');
const blocked = scene => new Set(scene.props.filter(p => p.solid !== false && !['door', 'portal', 'torch', 'chandelier', 'clue', 'trap'].includes(p.type)).map(p => key([p.x, p.y])));
const free = (scene, occupied, x, y) => scene.tiles[y]?.[x] === 'floor' && !occupied.has(`${x},${y}`);
function reachable(scene, start) {
  const occupied = blocked(scene), seen = new Set(), pending = [start];
  while (pending.length) {
    const [x, y] = pending.pop(), k = key([x, y]);
    if (seen.has(k) || !free(scene, occupied, x, y)) continue;
    seen.add(k);
    for (const [dx, dy] of dirs) pending.push([x + dx, y + dy]);
  }
  return seen;
}

test('new worlds start on a clearing and saved legacy versions remain explicit', () => {
  assert.equal(createWorld('adventure-default', 'small').v, 3);
  assert.equal(createWorld('adventure-default', 'small').start, 'glade');
  assert.equal(normalizeGen({ seed: 42 }).v, 3);
  assert.deepEqual(normalizeGen({ v: 2, seed: 42, size: 'small' }), { v: 2, seed: '42', size: 'small' });
  assert.throws(() => createWorld('invalid', 'small', 99));
});

test('thirty seeds have coherent crises, readable connected routes and reciprocal entrances', () => {
  const crises = new Set(), appearances = new Set(), layouts = new Set();
  for (let i = 0; i < 30; i++) {
    const plan = createWorld(`adventure-${i}`, ['small', 'medium', 'large'][i % 3]);
    assert.equal(plan.v, 3);
    const story = plan.story;
    crises.add(story.id);
    for (const field of ['title', 'problem', 'arrival', 'warning', 'objective', 'rescue', 'report', 'clue']) assert.ok(typeof story[field] === 'string' && story[field].length > 15, field);
    assert.equal(story.clueProp, 'story-clue');
    const ids = sceneIds(plan), scenes = Object.fromEntries(ids.map(id => [id, generateScene(plan, id)]));
    assert.ok(ids.length >= 4 && ids.length <= 5);
    assert.deepEqual(exits(scenes.glade), ['road']);
    assert.ok(exits(scenes.road).includes('glade') && exits(scenes.road).includes('settlement'));
    assert.deepEqual(exits(scenes.settlement), ['road']);
    assert.ok(ids.includes(story.clueScene));
    layouts.add(hash(ids.map(id => [scenes[id].tiles, scenes[id].props.map(p => [p.id, p.x, p.y])])));
    for (const scene of Object.values(scenes)) {
      assert.deepEqual(validateScene(scene), [], `${plan.seed}/${scene.id}`);
      assert.ok(scene.W <= 30 && scene.H <= 24, 'locations stay small enough to remember');
      assert.ok(scene.regions.length >= 1 && scene.landmarks.length >= 1);
      const occupied = blocked(scene), seen = reachable(scene, scene.spawns[0]);
      for (let y = 0; y < scene.H; y++) for (let x = 0; x < scene.W; x++) if (free(scene, occupied, x, y)) assert.ok(seen.has(`${x},${y}`), 'all free floor is connected');
      for (const route of scene.mainRoute) {
        assert.ok(route.width >= 3 && route.cells.length > 1);
        const [a, b] = route.cells, horizontal = a[1] === b[1];
        for (const [x, y] of route.cells) for (const offset of [-1, 0, 1]) assert.ok(free(scene, occupied, x + (horizontal ? 0 : offset), y + (horizontal ? offset : 0)), `${scene.id}/${route.id} keeps a three-cell wide path`);
      }
      for (const portal of scene.props.filter(p => p.type === 'portal')) {
        const destination = scenes[portal.destination], reciprocal = destination.props.find(p => p.id === portal.destinationEntry);
        assert.ok(reciprocal && reciprocal.destination === scene.id && reciprocal.destinationEntry === portal.id, 'portal pair is reciprocal');
        const arrivals = scene.arrivals[portal.id];
        assert.ok(Array.isArray(arrivals) && arrivals.length >= 3);
        for (const cell of arrivals) assert.ok(Array.isArray(cell) && cell.length === 2 && seen.has(key(cell)), 'arrival cells use existing free-floor array format');
        assert.equal(Math.abs(arrivals[0][0] - portal.x) + Math.abs(arrivals[0][1] - portal.y), 1, 'return starts at this entrance');
      }
      for (const npc of scene.props.filter(p => p.type === 'npc')) {
        assert.equal(npc.gen, true);
        assert.ok(npc.npc.look && npc.npc.classId && npc.npc.gender && npc.npc.lines.length);
        assert.equal(npcBrief(scene, npc).gender, npc.npc.gender);
        appearances.add(hash(npc.npc.look));
        assert.equal(npc.companion, undefined);
      }
      for (const encounter of scene.encounters) {
        assert.equal(encounter.trigger, 'approach');
        assert.ok(encounter.enemies.length >= 1 && encounter.radius > 0);
        for (const enemy of encounter.enemies) assert.ok(free(scene, occupied, enemy.x, enemy.y) && enemy.max > 0 && enemy.ac > 0);
        for (const arrivals of Object.values(scene.arrivals)) for (const [x, y] of arrivals) assert.ok(Math.abs(x - encounter.x) + Math.abs(y - encounter.y) > encounter.radius, 'arrival does not immediately trigger combat');
      }
    }
    const clue = scenes[story.clueScene].props.find(p => p.id === story.clueProp);
    assert.ok(clue?.gen && clue.container && clue.loot && clue.description.includes(story.clue));
    assert.deepEqual(clue.loot, {}, 'investigating a story clue offers journal information without inaccessible supplies');
    for (const scene of Object.values(scenes)) for (const cache of scene.props.filter(p => /^(cart|ruins)-cache$/.test(p.id))) {
      assert.equal(cache.loot.potions, 1, 'ordinary side-trip caches retain their potion');
      assert.ok(cache.loot.gold >= 2 && cache.loot.gold <= 6, 'ordinary side-trip caches retain their gold');
    }
    assert.ok(scenes.road.encounters.some(e => e.id === 'road-threat'));
    assert.ok(gmBrief(plan).publicFacts.includes(story.problem));
  }
  assert.deepEqual([...crises].sort(), ['missing', 'mist', 'seal']);
  assert.ok(layouts.size >= 15, 'seeds vary layouts and placements, not only names');
  assert.ok(appearances.size >= 30, 'NPCs use varied Characters editor appearances');
});

test('scene generation is deterministic across lazy order and a serialized plan', () => {
  for (const size of ['small', 'medium', 'large']) {
    const a = createWorld('order-proof', size), b = createWorld('order-proof', size), restored = JSON.parse(JSON.stringify(a));
    assert.equal(a.v, 3);
    const ids = sceneIds(a);
    ids.slice().reverse().forEach(id => generateScene(b, id));
    assert.deepEqual(a, b);
    for (const id of ids) {
      assert.deepEqual(generateScene(a, id), generateScene(b, id));
      assert.deepEqual(generateScene(a, id), generateScene(restored, id));
    }
    assert.throws(() => generateScene(a, 'unknown'));
  }
});

test('clustered border vegetation preserves an approach to every solid prop', () => {
  const plan = createWorld('review-seed-152', 'large', 3), scene = generateScene(plan, 'road');
  assert.deepEqual(validateScene(scene), []);
  const seen = reachable(scene, scene.spawns[0]);
  for (const prop of scene.props.filter(p => p.solid !== false)) {
    assert.ok(dirs.some(([dx, dy]) => seen.has(`${prop.x + dx},${prop.y + dy}`)), `reachable approach to ${prop.id}`);
  }
  const occupied = blocked(scene);
  for (const route of scene.mainRoute) {
    const horizontal = route.cells[0][1] === route.cells[1][1];
    for (const [x, y] of route.cells) for (const offset of [-1, 0, 1]) {
      assert.ok(free(scene, occupied, x + (horizontal ? 0 : offset), y + (horizontal ? offset : 0)), `${route.id} keeps its full width`);
    }
  }
});

test('missing travelers have a real tower scene mentioned by their clue even in a small world', () => {
  const plans = Array.from({ length: 30 }, (_, i) => createWorld(`adventure-${i}`, 'small'));
  const missing = plans.filter(plan => plan.story.id === 'missing');
  assert.ok(missing.length > 0);
  for (const plan of missing) assert.ok(sceneIds(plan).includes('cart') && sceneIds(plan).includes('ruins'), 'the clue refers to existing places');
});

test('clearing has a safe solo tutorial, nearby healer and real opening loot', () => {
  const plan = createWorld('tutorial-contract', 'medium'), scene = generateScene(plan, 'glade'), tutorial = plan.story.tutorial;
  const occupied = blocked(scene), [x, y] = tutorial.heroSpawn;
  assert.deepEqual(scene.spawns[0], tutorial.heroSpawn);
  const healer = scene.props.find(p => p.storyRole === 'healer'), messenger = scene.props.find(p => p.storyRole === 'messenger');
  assert.ok(healer && messenger);
  assert.ok(Math.abs(healer.x - x) + Math.abs(healer.y - y) <= 3);
  assert.ok(Array.isArray(messenger.departure) && reachable(scene, scene.spawns[0]).has(key(messenger.departure)));
  assert.equal(scene.encounters.length, 0, 'tutorial spawns are controlled by its state machine');
  for (const encounter of [tutorial.win, tutorial.loss]) {
    assert.deepEqual(encounter.reward, { xp: 0, gold: 0 });
    for (const enemy of encounter.enemies) assert.ok(free(scene, occupied, enemy.x, enemy.y));
  }
  const cache = scene.props.find(p => p.id === 'starter-cache');
  assert.ok(cache?.container && cache.loot);
  const received = [], host = { state: {}, mod: () => 0, gold: n => received.push(['gold', n]), potions: n => received.push(['potions', n]), torches: n => received.push(['torches', n]), give: name => received.push(['gear', name]), log: () => {} };
  assert.ok(Runtime.begin(host, scene.id, cache).options.some(o => o.id === 'open'));
  assert.equal(Runtime.choose(host, scene.id, cache, 'open').looted, true);
  const first = received.slice();
  Runtime.choose(host, scene.id, cache, 'open');
  assert.deepEqual(received, first, 'opening loot cannot be awarded twice');
  assert.ok(first.some(([type]) => type === 'potions'));
});

test('v1 layout fixture remains immutable through the dispatch', () => {
  const plan = createWorld('legacy-v1-regression', 'small', 1);
  assert.equal(hash(sceneIds(plan).map(id => generateScene(plan, id))), '18a1394fd61812f81a4ff61f458ac00fab7ecc6e1733dd2d4bde8bd100e54270');
  // Old v1 facts predate the ref schema; exercise its existing v2 adapter without
  // changing frozen facts or requiring a new compatibility migration here.
  const publicPlan = { ...plan, facts: [] };
  assert.doesNotThrow(() => gmBrief(publicPlan), 'legacy v1 keeps its existing metadata adapter');
  assert.equal(gmBrief(publicPlan).version, 1);
  const scene = sceneIds(plan).map(id => generateScene(plan, id)).find(s => s.props.some(p => p.npc));
  const npc = scene.props.find(p => p.npc);
  assert.doesNotThrow(() => npcBrief(scene, npc));
  assert.equal(npcBrief(scene, npc).gender, npc.npc.gender);
});

test('v2 layout, NPC and loot fixtures remain immutable through the dispatch', () => {
  for (const [size, expected] of Object.entries({ small: 'bee74999bfdcaa832e7e51a9ea03c8ff1b60a0009a90bf9c929781a692e94369', large: 'e4c647eed7d211c47c2dfee123314ad542a180c70bace3c05b256e79564fa92a' })) {
    const plan = createWorld('legacy-v1-regression', size, 2);
    assert.equal(hash(sceneIds(plan).map(id => generateScene(plan, id))), expected);
  }
});
