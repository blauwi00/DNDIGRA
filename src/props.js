// Модели предметов генерируемых миров: списки боксов [x,y,z,w,h,d,цвет,светится] в координатах клетки (центр, y — высота центра бокса).
// Лицевая сторона предмета смотрит в +z, поворот p.rot (0..3) — по 90° против часовой. Тексели: src/texel.js.
import { texelPass, shade } from './texel.js';

const WOODS = [0x8a5a34, 0x7b5030, 0x9a6a3c, 0x6a4a30], DARK = 0x4b3626, STONE = 0x8a8d92, STONE2 = 0x6f7378, IRON = 0x3d4248, STRAW = 0xd1ac55, LEAF = [0x4f8f48, 0x3f7a3f, 0x5f9a4a, 0x3a6f45], WATER = 0x3f78a8, FIRE = 0xff8a2a, CLOTH = [0xb0452f, 0x3d6a8a, 0x5d8a4a, 0xc8a24a, 0x8a4a9a, 0xe6dcc4];
const hash = s => { let h = 2166136261; for (let i = 0; i < String(s).length; i++) { h ^= String(s).charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; };

const MODELS = {
  table: (c, B) => { B(0, .44, 0, .88, .08, .7, c.wood); for (const [x, z] of [[-.37, -.28], [.37, -.28], [-.37, .28], [.37, .28]]) B(x, .2, z, .08, .4, .08, DARK); if (c.h % 3 === 0) B(.1, .52, .05, .22, .08, .14, 0xb8b0a0); if (c.h % 3 === 1) { B(-.2, .52, 0, .12, .1, .12, 0x9aa0a3); B(.15, .5, .1, .26, .05, .2, c.cloth); } },
  stool: (c, B) => { B(0, .3, 0, .36, .07, .36, c.wood); for (const [x, z] of [[-.13, -.13], [.13, -.13], [-.13, .13], [.13, .13]]) B(x, .13, z, .06, .26, .06, DARK); },
  bench: (c, B) => { B(0, .3, 0, .92, .08, .34, c.wood); for (const x of [-.38, .38]) B(x, .13, 0, .08, .26, .3, DARK); },
  bed: (c, B) => { B(0, .13, 0, .84, .2, .94, DARK); B(0, .27, .02, .76, .1, .86, 0xe9e2d0); B(0, .35, -.3, .5, .09, .22, 0xf4f0e6); B(0, .33, .18, .76, .07, .52, c.cloth); B(0, .45, -.45, .84, .42, .07, c.wood); B(0, .3, .45, .84, .22, .05, c.wood); },
  cot: (c, B) => { B(0, .1, 0, .7, .1, .92, DARK); B(0, .17, 0, .62, .06, .86, STRAW); B(0, .21, -.32, .4, .06, .2, 0xcfc8b0); },
  hearth: (c, B) => { B(0, .5, -.12, .92, 1.0, .66, STONE2); B(0, .3, .22, .52, .42, .1, 0x17110f); B(0, .22, .2, .36, .2, .1, FIRE, true); B(0, .74, .2, .52, .08, .12, STONE); B(0, 1.02, -.12, .98, .08, .72, STONE); B(.22, .12, .22, .14, .12, .12, 0x3a2a1c); },
  wardrobe: (c, B) => { B(0, .6, -.05, .82, 1.2, .5, c.wood); B(0, .6, .21, .03, 1.0, .02, DARK); for (const x of [-.08, .08]) B(x, .6, .23, .04, .08, .03, 0xc3a04c); B(0, 1.22, -.05, .88, .06, .56, DARK); },
  counter: (c, B) => { B(0, .4, 0, .94, .8, .5, c.wood); B(0, .83, 0, 1.0, .07, .62, DARK); if (c.h % 2) { B(-.25, .93, 0, .2, .13, .2, c.cloth); B(.2, .92, .05, .14, .11, .14, 0xb8b0a0); } else B(.1, .94, 0, .3, .14, .22, 0xc8a24a); },
  shelf: (c, B) => { B(0, .56, -.3, .92, 1.12, .3, c.wood); for (let i = 0; i < 3; i++) { B(0, .2 + i * .36, -.2, .86, .05, .34, DARK); for (let k = 0; k < 4; k++) B(-.3 + k * .2, .3 + i * .36, -.2, .12, .12 + ((k + i + c.h) % 3) * .04, .14, [0xb0452f, 0x3d6a8a, 0x5d8a4a, 0xc8a24a, 0xe6dcc4][(k + i + c.h) % 5]); } },
  well: (c, B) => { B(0, .24, 0, .92, .48, .92, STONE); B(0, .5, 0, .6, .04, .6, WATER); B(0, .5, 0, .78, .02, .78, STONE2); for (const x of [-.4, .4]) B(x, .9, 0, .07, .84, .07, c.wood); B(0, 1.34, 0, .96, .08, .12, DARK); B(0, 1.42, 0, .5, .06, .3, c.wood); B(.2, 1.1, .02, .12, .14, .12, c.wood); B(.2, 1.24, .02, .02, .22, .02, IRON); },
  tree: (c, B) => { B(0, .45, 0, .2, .9, .2, DARK); const g = c.leaf; B(0, 1.15, 0, .84, .5, .84, g); B(.08, 1.55, -.03, .64, .44, .64, shade(g, 1.08)); B(-.04, 1.9, .02, .4, .4, .4, shade(g, .94)); B(.3, 1.05, .22, .3, .3, .3, shade(g, .88)); },
  bush: (c, B) => { B(0, .24, 0, .74, .46, .7, c.leaf); B(-.2, .4, .1, .36, .3, .36, shade(c.leaf, 1.1)); B(.22, .34, -.1, .3, .3, .3, shade(c.leaf, .92)); },
  stall: (c, B) => { B(0, .36, .12, .94, .72, .5, c.wood); for (const x of [-.45, .45]) B(x, .8, -.28, .07, 1.6, .07, DARK); B(0, 1.62, -.06, 1.0, .08, .82, c.cloth); B(0, 1.54, .3, 1.0, .1, .06, shade(c.cloth, 1.3)); for (let k = 0; k < 4; k++) B(-.3 + k * .2, .8, .12, .14, .12 + (k % 2) * .06, .16, [0xc8a24a, 0xb0452f, 0x5d8a4a, 0xe6dcc4][(k + c.h) % 4]); },
  anvil: (c, B) => { B(0, .2, 0, .34, .4, .3, DARK); B(0, .46, 0, .66, .14, .32, IRON); B(.36, .46, 0, .16, .08, .16, IRON); B(0, .55, 0, .5, .03, .26, 0x6a7078); },
  forge: (c, B) => { B(0, .35, -.08, .92, .7, .74, STONE2); B(0, .74, -.02, .6, .08, .54, 0x1c1512); B(0, .8, -.02, .46, .08, .42, FIRE, true); B(0, 1.25, -.3, .46, 1.0, .3, STONE); B(.4, .35, .3, .16, .3, .22, c.wood); B(.4, .55, .3, .22, .1, .26, 0x8a6a46); },
  cauldron: (c, B) => { B(0, .1, 0, .54, .14, .54, 0x3a2a1c); B(0, .08, 0, .4, .1, .4, FIRE, true); B(0, .38, 0, .64, .5, .64, IRON); B(0, .66, 0, .72, .07, .72, 0x5a6068); B(0, .62, 0, .56, .04, .56, 0x4fb07a, true); },
  sarcophagus: (c, B) => { B(0, .3, 0, .64, .6, .92, STONE2); B(0, .68, 0, .72, .14, .98, STONE); B(0, .78, 0, .3, .06, .7, shade(STONE, 1.15)); B(0, .5, .46, .3, .3, .02, shade(STONE2, .8)); },
  gravestone: (c, B) => { B(0, .05, 0, .66, .1, .34, STONE2); B(0, .4, 0, .46, .7, .13, STONE); B(0, .78, 0, .34, .08, .13, STONE); B(0, .5, .075, .2, .03, .01, shade(STONE, .7)); B(0, .4, .075, .16, .03, .01, shade(STONE, .7)); },
  pillar: (c, B) => { B(0, .1, 0, .76, .2, .76, STONE2); B(0, .86, 0, .5, 1.32, .5, STONE); B(0, 1.2, .27, .08, .9, .04, shade(STONE, .8)); B(0, 1.58, 0, .74, .16, .74, STONE2); B(0, 1.7, 0, .6, .08, .6, STONE); },
  bones: (c, B) => { B(-.15, .03, .08, .3, .05, .08, 0xe2dccb); B(.12, .03, -.1, .22, .05, .07, 0xd8d2c0); B(.05, .05, .12, .18, .08, .18, 0xe6e0cf); B(-.2, .035, -.18, .09, .06, .09, 0xdad4c2); },
  brazier: (c, B) => { for (const [x, z] of [[-.16, -.16], [.16, -.16], [-.16, .16], [.16, .16]]) B(x, .22, z, .06, .44, .06, IRON); B(0, .5, 0, .5, .12, .5, 0x4a5058); B(0, .64, 0, .34, .22, .34, FIRE, true); B(0, .78, 0, .16, .14, .16, 0xffd070, true); },
  fountain: (c, B) => { B(0, .14, 0, .94, .28, .94, STONE); B(0, .3, 0, .78, .06, .78, WATER); B(0, .6, 0, .2, .66, .2, STONE2); B(0, .98, 0, .54, .1, .54, STONE); B(0, 1.04, 0, .42, .04, .42, WATER); },
  signpost: (c, B) => { B(0, .72, 0, .1, 1.44, .1, c.wood); B(.18, 1.22, .02, .46, .2, .05, shade(c.wood, 1.15)); B(-.16, .98, .02, .4, .18, .05, shade(c.wood, 1.05)); },
  haystack: (c, B) => { B(0, .26, 0, .92, .52, .92, STRAW); B(0, .68, 0, .64, .36, .64, shade(STRAW, 1.07)); B(0, .94, 0, .32, .2, .32, shade(STRAW, 1.14)); },
  cart: (c, B) => { B(0, .4, 0, .92, .12, .66, c.wood); for (const z of [-.3, .3]) B(0, .55, z, .92, .2, .05, c.wood); for (const x of [-.46, .46]) B(x, .24, 0, .06, .48, .48, DARK); B(0, .6, 0, .5, .24, .4, c.cloth); B(.1, .74, .05, .3, .12, .3, STRAW); B(-.55, .34, 0, .3, .05, .06, DARK); },
};
export const PROP_MODELS = Object.keys(MODELS);
const rot = (b, r) => { if (!r) return b; const [x, y, z, w, h, d, ...rest] = b; switch (r & 3) { case 1: return [z, y, -x, d, h, w, ...rest]; case 2: return [-x, y, -z, w, h, d, ...rest]; default: return [-z, y, x, d, h, w, ...rest]; } };
const role = c => LEAF.includes(c) || LEAF.some(l => [shade(l, 1.08), shade(l, .94), shade(l, .88), shade(l, 1.1), shade(l, .92)].includes(c)) ? 'hair' : STONE === c || STONE2 === c ? 'other' : WOODS.includes(c) ? 'cloth' : 'other';

export function build(p, opts = {}) {
  const make = MODELS[p.model]; if (!make) return null;
  const h = hash(p.id || p.x + ',' + p.y), ctx = { wood: WOODS[h % WOODS.length], leaf: LEAF[(h >>> 3) % LEAF.length], cloth: CLOTH[(h >>> 5) % CLOTH.length], h: h >>> 7 };
  const out = []; make(ctx, (x, y, z, w, hh, d, c, e = false) => out.push([x, y, z, w, hh, d, c, e]));
  const rotated = out.map(b => rot(b, p.rot || 0));
  if (opts.texel === false) return rotated;
  return rotated.concat(texelPass(rotated, role));
}
