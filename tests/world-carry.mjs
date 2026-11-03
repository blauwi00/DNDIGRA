import assert from 'node:assert/strict';
import test from 'node:test';
import {initialWorld} from '../src/world-api.js';
import {sheet, preset, COLORS, background} from '../src/hero-rules.js';

function hero() {
  return {...sheet({name: 'Путник', classId: 'wizard', stats: preset('wizard'), kit: 0, background: background('wizard', () => 0), appearance: {...Object.fromEntries(Object.entries(COLORS).map(([k, v]) => [k, v[0]])), hairStyle: 'short', face: 'soft'}}, 'hero-transfer'),
    level: 2, xp: 350, gold: 73, potions: 3, torches: 2, hands: ['staff', 'torch'], torch: true,
    hp: 2, slots: 1, concentration: 'bless', death: {success: 1, failure: 1, stable: false}, conditions: ['poisoned'], permanentEffects: [{id: 'blessing', changes: {wis: 1}}]};
}

test('new v1/v2/v3 worlds retain all trusted hero property and current resources without mutation', () => {
  const current = hero();
  current.inventory.push('Подаренная верёвка');
  const before = structuredClone(current);
  for (const generatorVersion of [1, 2, 3]) {
    const next = initialWorld(current, 'world-' + generatorVersion, 2, {generatorVersion, seed: 'carry-policy', size: 'small', startingGold: 99999, potions: 99999});
    assert.equal(next.gold, current.gold, 'A new world must retain current gold');
    assert.equal(next.potions, current.potions, 'A new world must retain current potion count');
    assert.equal(next.xp, current.xp);
    assert.equal(next.level, current.level);
    const actor = next.party[0];
    for (const key of ['inventory', 'hands', 'torches', 'torch', 'appearance', 'hp', 'slots', 'concentration', 'death', 'conditions', 'permanentEffects']) assert.deepEqual(actor[key], current[key], key + ' must survive entry');
    actor.inventory.push('Changed destination');
    actor.permanentEffects[0].changes.wis++;
    assert.deepEqual(current, before, 'Destination changes cannot mutate the source hero');
  }
});

test('canonical snapshot resources replace stale actor copies without filtering or aliasing hero property', async () => {
  const {heroFromSnapshot} = await import('../src/world-carry.js');
  const actor = hero(), snapshot = {party: [actor], level: 3, xp: 950, gold: 29, potions: 1, loot: {'old:chest': true}};
  const before = structuredClone(snapshot), carried = heroFromSnapshot(snapshot);
  assert.deepEqual(carried, {...actor, level: 3, xp: 950, gold: 29, potions: 1});
  assert.equal(carried.loot, undefined, 'Environmental state stays with the old world');
  carried.inventory.push('Destination rope');
  carried.hands[1] = 'empty';
  carried.permanentEffects[0].changes.wis++;
  assert.deepEqual(snapshot, before);
});
