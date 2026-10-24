import assert from 'node:assert/strict';
import { test } from 'node:test';
import { existsSync, readFileSync } from 'node:fs';
import vm from 'node:vm';
import { spec, build, RULES } from '../src/characters.js';
import { characterParts } from '../src/character-style.js';
import { createWorld, generateScene } from '../src/worldgen/world.js';

const modelPath = new URL('../src/enemy-models.js', import.meta.url);
const models = existsSync(modelPath) ? await import(modelPath.href) : {};

function checkBoxes(boxes) {
  const base = boxes.filter(b => b.length === 8), decals = boxes.filter(b => b.length === 10);
  assert.ok(base.length > 0 && base.length <= RULES.maxBoxes);
  assert.ok(boxes.length <= RULES.maxWithTexels);
  assert.ok(decals.length > 0, 'new enemies have texel shading');
  for (const box of boxes) assert.ok([8, 10].includes(box.length) && box.slice(0, 6).every(Number.isFinite) && box.slice(3, 6).every(v => v > 0) && Number.isInteger(box[6]));
  for (const decal of decals) assert.ok(['f', 't'].includes(decal[8]) && Number.isFinite(decal[9]));
}

test('story enemies use pure distinct models while legacy skeletons retain their old renderer', () => {
  assert.equal(typeof models.enemyModel, 'function', 'a pure enemy model API is available');
  assert.equal(models.enemyModel({ kind: 3 }), null);
  assert.equal(models.enemyModel(null), null, 'legacy renderer also accepts an absent actor');
  assert.equal(models.enemyModel({ kind: 3, visual: 'skeleton' }), null);
  assert.equal(models.enemyModel({ kind: 3, visual: 'unknown' }), null);
  for (const visual of ['beast', 'bandit', 'training']) {
    const actor = { kind: 3, visual }, model = models.enemyModel(actor);
    checkBoxes(model.boxes);
    assert.deepEqual(model, models.enemyModel(actor), 'rebuilding does not change geometry or texels');
  }
  assert.notDeepEqual(models.enemyModel({ visual: 'beast' }).boxes, models.enemyModel({ visual: 'training' }).boxes);
});

test('bandits are made by Characters from their saved generated appearance', () => {
  assert.equal(typeof models.enemyModel, 'function');
  const actor = { kind: 3, visual: 'bandit', gen: { classId: 'rogue', gender: 'male', look: { hairStyle: 'short', hair: '#6a432c' }, hands: ['sword', 'empty'] } };
  const model = models.enemyModel(actor), expected = spec(5, { gen: actor.gen });
  assert.deepEqual(model.spec, expected);
  assert.deepEqual(model.boxes, build(expected));
  checkBoxes(model.boxes);
  const female = models.enemyModel({ ...actor, gen: { ...actor.gen, gender: 'female' } });
  assert.notDeepEqual(female.boxes, model.boxes, 'shared male and female silhouettes stay distinct');
});

test('beast has four grounded legs and training reuses the established mannequin geometry', () => {
  assert.equal(typeof models.enemyModel, 'function');
  const beast = models.enemyModel({ visual: 'beast' }, { texel: false }).boxes;
  const legs = beast.filter(b => b[1] < .3 && b[4] >= .15 && b[3] < .2);
  assert.equal(legs.length, 4, 'quadruped silhouette has four legs');
  assert.ok(beast.some(b => b[1] > .6 && b[3] >= .35 && b[4] >= .3), 'head is large enough to read on a phone');
  const original = characterParts({}, 4).parts.map(p => [p.x, p.y, p.z, p.w, p.h, p.d, parseInt(p.color.slice(1), 16), false]);
  assert.deepEqual(models.enemyModel({ visual: 'training' }, { texel: false }).boxes, original);
});

test('canonical generated enemies carry the visual that matches their story', () => {
  const seen = new Set();
  for (let i = 0; i < 30; i++) {
    const plan = createWorld(`adventure-${i}`, 'medium'), foe = generateScene(plan, 'road').encounters[0].enemies[0];
    seen.add(plan.story.id);
    assert.equal(foe.kind, 3, 'DND enemy rules keep their existing actor kind');
    assert.equal(foe.visual, { mist: 'beast', missing: 'bandit', seal: 'skeleton' }[plan.story.id]);
    assert.equal(plan.story.tutorial.win.enemies[0].visual, 'training');
    assert.ok(plan.story.tutorial.loss.enemies.every(e => e.visual === 'bandit'));
    if (foe.visual === 'bandit') {
      assert.equal(foe.gen.classId, 'rogue');
      assert.equal(foe.gen.gender, 'male');
      assert.deepEqual(foe.gen.hands, ['sword', 'empty']);
      checkBoxes(models.enemyModel(foe).boxes);
    }
  }
  assert.equal(seen.size, 3);
});

test('DND attacks describe a beast bite and a safe training strike while keeping legacy swords', () => {
  const context = { window: {} };
  vm.runInNewContext(readFileSync(new URL('../dist/dnd.js', import.meta.url), 'utf8'), context);
  const DND = context.window.DND;
  assert.deepEqual({ ...DND.weapon({ kind: 3 }) }, { name: 'Короткий меч', range: 1, die: 6, damageBonus: 2, attackBonus: 4, type: 'Колющий' });
  const bite = DND.weapon({ kind: 3, visual: 'beast' });
  assert.equal(bite.name, 'Укус');
  assert.equal(bite.range, 1);
  assert.equal(bite.attackBonus, 4);
  const trainer = DND.weapon({ kind: 3, visual: 'training' });
  assert.equal(trainer.name, 'Тренировочный удар');
  assert.ok(trainer.die <= 4 && trainer.damageBonus === 0, 'training has a lighter weapon; tutorial handles knockout recovery');
  const attack = DND.attack({ name: 'Зверь', kind: 3, visual: 'beast' }, { name: 'Герой', ac: 10 }, 1, 0, sides => sides === 20 ? 12 : 3);
  assert.equal(attack.hit, true);
  assert.equal(attack.amount, 5);
  assert.ok(attack.text.includes('Укус'));
});
