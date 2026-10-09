// Pure geometry for new story enemies. A null result keeps the legacy skeleton path.
import { spec, build } from './characters.js';
import { characterParts } from './character-style.js';
import { texelPass } from './texel.js';

function beastBoxes() {
  const fur = 0x68645b, dark = 0x45453f, pale = 0xafa690, ink = 0x191b19;
  const boxes = [], B = (x, y, z, w, h, d, c) => boxes.push([x, y, z, w, h, d, c, false]);
  B(0, .46, -.07, .43, .34, .63, fur); // broad body and short, separate legs
  B(0, .56, .16, .37, .33, .28, fur);
  for (const x of [-.15, .15]) for (const z of [-.26, .17]) {
    B(x, .255, z, .13, .27, .14, fur);
    B(x, .13, z + .03, .16, .09, .19, dark);
  }
  B(0, .71, .32, .4, .36, .37, fur); // chibi head faces +z like other actors
  B(0, .6, .5, .24, .13, .2, pale);
  B(0, .64, .61, .09, .06, .04, ink);
  for (const x of [-.13, .13]) {
    B(x, .94, .28, .105, .16, .125, fur);
    B(x, .947, .348, .047, .082, .014, pale);
    B(x, .744, .514, .036, .044, .018, ink);
  }
  B(0, .55, -.49, .13, .13, .31, dark);
  return boxes;
}

export function enemyModel(actor = {}, { texel = true } = {}) {
  if (!actor) return null;
  if (actor.visual === 'bandit') {
    const gen = actor.gen || { classId: 'rogue', gender: 'male', look: {}, hands: ['sword', 'empty'] };
    const appearance = spec(5, { gen });
    return { visual: 'bandit', spec: appearance, boxes: build(appearance, { texel }) };
  }
  let boxes;
  if (actor.visual === 'beast') boxes = beastBoxes();
  else if (actor.visual === 'training') boxes = characterParts({}, 4).parts.map(p => [p.x, p.y, p.z, p.w, p.h, p.d, parseInt(p.color.slice(1), 16), false]);
  else return null;
  return { visual: actor.visual, boxes: texel ? [...boxes, ...texelPass(boxes, () => actor.visual === 'beast' ? 'hair' : 'other')] : boxes };
}
