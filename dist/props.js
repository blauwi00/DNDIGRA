var Props = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/props-index.js
  var props_index_exports = {};
  __export(props_index_exports, {
    PROP_MODELS: () => PROP_MODELS,
    build: () => build
  });

  // src/texel.js
  var TEXEL = {
    size: 0.058,
    // размер текселя ≈ 1/8 головы (как 8×8 пикселей головы скина)
    decalDepth: 8e-3,
    // насколько наклейка выступает над гранью
    minW: 0.09,
    minH: 0.09,
    minD: 0.05
    // меньшие боксы (глаза, брови, тонкие детали) не трогаем
  };
  function shade(c, k) {
    const r = Math.min(255, Math.round((c >> 16 & 255) * k)), g = Math.min(255, Math.round((c >> 8 & 255) * k)), b = Math.min(255, Math.round((c & 255) * k));
    return r << 16 | g << 8 | b;
  }
  function tone(c, k) {
    if (k <= 1) return shade(c, k);
    const t = Math.min(1, (k - 1) * 0.9), r = c >> 16 & 255, g = c >> 8 & 255, b = c & 255;
    return Math.round(r + (255 - r) * t) << 16 | Math.round(g + (255 - g) * t) << 8 | Math.round(b + (255 - b) * t);
  }
  function rng(seed) {
    let a = seed | 0;
    return () => {
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  var ROLES = {
    skin: { hi: 1.06, lo: 0.9, amp: 0.045, noise: 2 },
    hair: { hi: 1.18, lo: 0.8, amp: 0.11, strands: true },
    metal: { hi: 1.22, lo: 0.76, amp: 0.1, glint: true },
    cloth: { hi: 1.12, lo: 0.82, amp: 0.08, pleats: true },
    other: { hi: 1.1, lo: 0.84, amp: 0.07 }
  };
  function texelPass(boxes, role2 = () => "other", size = TEXEL.size, { minDepth = TEXEL.minD } = {}) {
    const out = [], D = TEXEL.decalDepth;
    boxes.forEach((b, i) => {
      if (b.length > 8 || b[7]) return;
      const [x, y, z, w, h, d, c] = b;
      if (w < TEXEL.minW || h < TEXEL.minH || d < minDepth) return;
      const cfg = ROLES[role2(c)] || ROLES.other;
      const n = Math.max(1, Math.round(w / size)), m = Math.max(1, Math.round(h / size)), cw = w / n, ch = h / m;
      const zf = z + d / 2 + D / 2, key = z + d / 2 + 1e-4;
      const R = rng(Math.round(x * 997) * 31 + Math.round(y * 991) * 17 + Math.round(z * 983) * 13 + (c & 65535) + i * 7);
      const px = (col, row, color, cs = 1, rs = 1) => {
        if (color !== c) out.push([x - w / 2 + (col + cs / 2) * cw, y + h / 2 - (row + rs / 2) * ch, zf, cs * cw, rs * ch, D, color, false, "f", key]);
      };
      if (m >= 3) {
        px(0, 0, tone(c, cfg.hi), n);
        px(0, m - 1, tone(c, cfg.lo), n);
      }
      if (n >= 4 && m >= 4 && w >= 0.2) {
        px(0, 1, tone(c, 1 + (cfg.hi - 1) * 0.5), 1, m - 2);
        px(n - 1, 1, tone(c, 1 - (1 - cfg.lo) * 0.6), 1, m - 2);
      }
      const cnt = Math.min(cfg.noise ?? 3, Math.floor(n * m / 8)), used = /* @__PURE__ */ new Set();
      for (let k = 0; k < cnt; k++) {
        const col = n > 2 ? 1 + Math.floor(R() * (n - 2)) : Math.floor(R() * n), row = m > 2 ? 1 + Math.floor(R() * (m - 2)) : Math.floor(R() * m), id = col * 64 + row;
        let f = (R() < 0.5 ? -1 : 1) * cfg.amp * (0.55 + R() * 0.6);
        if (Math.abs(f) < 0.04) f = f < 0 ? -0.04 : 0.04;
        if (!used.has(id)) {
          used.add(id);
          px(col, row, tone(c, 1 + f));
        }
      }
      if (cfg.strands && n >= 3 && m >= 3) {
        for (let k = 0; k < 2; k++) px(1 + Math.floor(R() * (n - 2 || 1)), 1, tone(c, 0.86), 1, Math.max(1, Math.min(m - 2, 2 + Math.floor(R() * (m - 2)))));
        px(Math.floor(R() * n), 1, tone(c, cfg.hi));
      }
      if (cfg.pleats && h >= 0.2 && w >= 0.2 && m >= 4) {
        for (const col of [Math.round(n / 3), Math.round(n * 2 / 3)]) if (col > 0 && col < n) px(col, 1, tone(c, 0.9), 1, m - 2);
      }
      if (cfg.glint && n >= 2 && m >= 2) px(Math.min(1, n - 1), Math.min(1, m - 1), tone(c, 1.36));
      if (w >= 0.18 && d >= 0.15) {
        const nd = Math.max(1, Math.round(d / size)), cd = d / nd;
        for (let k = 0; k < 2; k++) {
          let f = (R() < 0.5 ? -1 : 1) * cfg.amp * (0.6 + R() * 0.5);
          if (Math.abs(f) < 0.04) f = f < 0 ? -0.04 : 0.04;
          const col = Math.floor(R() * n), r = Math.floor(R() * nd);
          out.push([x - w / 2 + (col + 0.5) * cw, y + h / 2 + D / 2, z - d / 2 + (r + 0.5) * cd, cw, D, cd, tone(c, 1 + f), false, "t", key]);
        }
      }
    });
    return out;
  }

  // src/props.js
  var WOODS = [9067060, 8081456, 10119740, 6965808];
  var DARK = 4929062;
  var STONE = 9080210;
  var STONE2 = 7304056;
  var IRON = 4014664;
  var STRAW = 13741141;
  var LEAF = [5214024, 4160063, 6265418, 3829573];
  var WATER = 4159656;
  var FIRE = 16747050;
  var CLOTH = [11552047, 4024970, 6130250, 13148746, 9063066, 15129796];
  var hash = (s) => {
    let h = 2166136261;
    for (let i = 0; i < String(s).length; i++) {
      h ^= String(s).charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  var MODELS = {
    table: (c, B) => {
      B(0, 0.44, 0, 0.88, 0.08, 0.7, c.wood);
      for (const [x, z] of [[-0.37, -0.28], [0.37, -0.28], [-0.37, 0.28], [0.37, 0.28]]) B(x, 0.2, z, 0.08, 0.4, 0.08, DARK);
      if (c.h % 3 === 0) B(0.1, 0.52, 0.05, 0.22, 0.08, 0.14, 12103840);
      if (c.h % 3 === 1) {
        B(-0.2, 0.52, 0, 0.12, 0.1, 0.12, 10133667);
        B(0.15, 0.5, 0.1, 0.26, 0.05, 0.2, c.cloth);
      }
    },
    stool: (c, B) => {
      B(0, 0.3, 0, 0.36, 0.07, 0.36, c.wood);
      for (const [x, z] of [[-0.13, -0.13], [0.13, -0.13], [-0.13, 0.13], [0.13, 0.13]]) B(x, 0.13, z, 0.06, 0.26, 0.06, DARK);
    },
    bench: (c, B) => {
      B(0, 0.3, 0, 0.92, 0.08, 0.34, c.wood);
      for (const x of [-0.38, 0.38]) B(x, 0.13, 0, 0.08, 0.26, 0.3, DARK);
    },
    bed: (c, B) => {
      B(0, 0.13, 0, 0.84, 0.2, 0.94, DARK);
      B(0, 0.27, 0.02, 0.76, 0.1, 0.86, 15327952);
      B(0, 0.35, -0.3, 0.5, 0.09, 0.22, 16052454);
      B(0, 0.33, 0.18, 0.76, 0.07, 0.52, c.cloth);
      B(0, 0.45, -0.45, 0.84, 0.42, 0.07, c.wood);
      B(0, 0.3, 0.45, 0.84, 0.22, 0.05, c.wood);
    },
    cot: (c, B) => {
      B(0, 0.1, 0, 0.7, 0.1, 0.92, DARK);
      B(0, 0.17, 0, 0.62, 0.06, 0.86, STRAW);
      B(0, 0.21, -0.32, 0.4, 0.06, 0.2, 13617328);
    },
    hearth: (c, B) => {
      B(0, 0.5, -0.12, 0.92, 1, 0.66, STONE2);
      B(0, 0.3, 0.22, 0.52, 0.42, 0.1, 1511695);
      B(0, 0.22, 0.2, 0.36, 0.2, 0.1, FIRE, true);
      B(0, 0.74, 0.2, 0.52, 0.08, 0.12, STONE);
      B(0, 1.02, -0.12, 0.98, 0.08, 0.72, STONE);
      B(0.22, 0.12, 0.22, 0.14, 0.12, 0.12, 3811868);
    },
    wardrobe: (c, B) => {
      B(0, 0.6, -0.05, 0.82, 1.2, 0.5, c.wood);
      B(0, 0.6, 0.21, 0.03, 1, 0.02, DARK);
      for (const x of [-0.08, 0.08]) B(x, 0.6, 0.23, 0.04, 0.08, 0.03, 12820556);
      B(0, 1.22, -0.05, 0.88, 0.06, 0.56, DARK);
    },
    counter: (c, B) => {
      B(0, 0.4, 0, 0.94, 0.8, 0.5, c.wood);
      B(0, 0.83, 0, 1, 0.07, 0.62, DARK);
      if (c.h % 2) {
        B(-0.25, 0.93, 0, 0.2, 0.13, 0.2, c.cloth);
        B(0.2, 0.92, 0.05, 0.14, 0.11, 0.14, 12103840);
      } else B(0.1, 0.94, 0, 0.3, 0.14, 0.22, 13148746);
    },
    shelf: (c, B) => {
      B(0, 0.56, -0.3, 0.92, 1.12, 0.3, c.wood);
      for (let i = 0; i < 3; i++) {
        B(0, 0.2 + i * 0.36, -0.2, 0.86, 0.05, 0.34, DARK);
        for (let k = 0; k < 4; k++) B(-0.3 + k * 0.2, 0.3 + i * 0.36, -0.2, 0.12, 0.12 + (k + i + c.h) % 3 * 0.04, 0.14, [11552047, 4024970, 6130250, 13148746, 15129796][(k + i + c.h) % 5]);
      }
    },
    well: (c, B) => {
      B(0, 0.24, 0, 0.92, 0.48, 0.92, STONE);
      B(0, 0.5, 0, 0.6, 0.04, 0.6, WATER);
      B(0, 0.5, 0, 0.78, 0.02, 0.78, STONE2);
      for (const x of [-0.4, 0.4]) B(x, 0.9, 0, 0.07, 0.84, 0.07, c.wood);
      B(0, 1.34, 0, 0.96, 0.08, 0.12, DARK);
      B(0, 1.42, 0, 0.5, 0.06, 0.3, c.wood);
      B(0.2, 1.1, 0.02, 0.12, 0.14, 0.12, c.wood);
      B(0.2, 1.24, 0.02, 0.02, 0.22, 0.02, IRON);
    },
    tree: (c, B) => {
      B(0, 0.45, 0, 0.2, 0.9, 0.2, DARK);
      const g = c.leaf;
      B(0, 1.15, 0, 0.84, 0.5, 0.84, g);
      B(0.08, 1.55, -0.03, 0.64, 0.44, 0.64, shade(g, 1.08));
      B(-0.04, 1.9, 0.02, 0.4, 0.4, 0.4, shade(g, 0.94));
      B(0.3, 1.05, 0.22, 0.3, 0.3, 0.3, shade(g, 0.88));
    },
    bush: (c, B) => {
      B(0, 0.24, 0, 0.74, 0.46, 0.7, c.leaf);
      B(-0.2, 0.4, 0.1, 0.36, 0.3, 0.36, shade(c.leaf, 1.1));
      B(0.22, 0.34, -0.1, 0.3, 0.3, 0.3, shade(c.leaf, 0.92));
    },
    stall: (c, B) => {
      B(0, 0.36, 0.12, 0.94, 0.72, 0.5, c.wood);
      for (const x of [-0.45, 0.45]) B(x, 0.8, -0.28, 0.07, 1.6, 0.07, DARK);
      B(0, 1.62, -0.06, 1, 0.08, 0.82, c.cloth);
      B(0, 1.54, 0.3, 1, 0.1, 0.06, shade(c.cloth, 1.3));
      for (let k = 0; k < 4; k++) B(-0.3 + k * 0.2, 0.8, 0.12, 0.14, 0.12 + k % 2 * 0.06, 0.16, [13148746, 11552047, 6130250, 15129796][(k + c.h) % 4]);
    },
    anvil: (c, B) => {
      B(0, 0.2, 0, 0.34, 0.4, 0.3, DARK);
      B(0, 0.46, 0, 0.66, 0.14, 0.32, IRON);
      B(0.36, 0.46, 0, 0.16, 0.08, 0.16, IRON);
      B(0, 0.55, 0, 0.5, 0.03, 0.26, 6975608);
    },
    forge: (c, B) => {
      B(0, 0.35, -0.08, 0.92, 0.7, 0.74, STONE2);
      B(0, 0.74, -0.02, 0.6, 0.08, 0.54, 1840402);
      B(0, 0.8, -0.02, 0.46, 0.08, 0.42, FIRE, true);
      B(0, 1.25, -0.3, 0.46, 1, 0.3, STONE);
      B(0.4, 0.35, 0.3, 0.16, 0.3, 0.22, c.wood);
      B(0.4, 0.55, 0.3, 0.22, 0.1, 0.26, 9071174);
    },
    cauldron: (c, B) => {
      B(0, 0.1, 0, 0.54, 0.14, 0.54, 3811868);
      B(0, 0.08, 0, 0.4, 0.1, 0.4, FIRE, true);
      B(0, 0.38, 0, 0.64, 0.5, 0.64, IRON);
      B(0, 0.66, 0, 0.72, 0.07, 0.72, 5922920);
      B(0, 0.62, 0, 0.56, 0.04, 0.56, 5222522, true);
    },
    sarcophagus: (c, B) => {
      B(0, 0.3, 0, 0.64, 0.6, 0.92, STONE2);
      B(0, 0.68, 0, 0.72, 0.14, 0.98, STONE);
      B(0, 0.78, 0, 0.3, 0.06, 0.7, shade(STONE, 1.15));
      B(0, 0.5, 0.46, 0.3, 0.3, 0.02, shade(STONE2, 0.8));
    },
    gravestone: (c, B) => {
      B(0, 0.05, 0, 0.66, 0.1, 0.34, STONE2);
      B(0, 0.4, 0, 0.46, 0.7, 0.13, STONE);
      B(0, 0.78, 0, 0.34, 0.08, 0.13, STONE);
      B(0, 0.5, 0.075, 0.2, 0.03, 0.01, shade(STONE, 0.7));
      B(0, 0.4, 0.075, 0.16, 0.03, 0.01, shade(STONE, 0.7));
    },
    pillar: (c, B) => {
      B(0, 0.1, 0, 0.76, 0.2, 0.76, STONE2);
      B(0, 0.86, 0, 0.5, 1.32, 0.5, STONE);
      B(0, 1.2, 0.27, 0.08, 0.9, 0.04, shade(STONE, 0.8));
      B(0, 1.58, 0, 0.74, 0.16, 0.74, STONE2);
      B(0, 1.7, 0, 0.6, 0.08, 0.6, STONE);
    },
    bones: (c, B) => {
      B(-0.15, 0.03, 0.08, 0.3, 0.05, 0.08, 14867659);
      B(0.12, 0.03, -0.1, 0.22, 0.05, 0.07, 14209728);
      B(0.05, 0.05, 0.12, 0.18, 0.08, 0.18, 15130831);
      B(-0.2, 0.035, -0.18, 0.09, 0.06, 0.09, 14341314);
    },
    brazier: (c, B) => {
      for (const [x, z] of [[-0.16, -0.16], [0.16, -0.16], [-0.16, 0.16], [0.16, 0.16]]) B(x, 0.22, z, 0.06, 0.44, 0.06, IRON);
      B(0, 0.5, 0, 0.5, 0.12, 0.5, 4870232);
      B(0, 0.64, 0, 0.34, 0.22, 0.34, FIRE, true);
      B(0, 0.78, 0, 0.16, 0.14, 0.16, 16765040, true);
    },
    fountain: (c, B) => {
      B(0, 0.14, 0, 0.94, 0.28, 0.94, STONE);
      B(0, 0.3, 0, 0.78, 0.06, 0.78, WATER);
      B(0, 0.6, 0, 0.2, 0.66, 0.2, STONE2);
      B(0, 0.98, 0, 0.54, 0.1, 0.54, STONE);
      B(0, 1.04, 0, 0.42, 0.04, 0.42, WATER);
    },
    signpost: (c, B) => {
      B(0, 0.72, 0, 0.1, 1.44, 0.1, c.wood);
      B(0.18, 1.22, 0.02, 0.46, 0.2, 0.05, shade(c.wood, 1.15));
      B(-0.16, 0.98, 0.02, 0.4, 0.18, 0.05, shade(c.wood, 1.05));
    },
    haystack: (c, B) => {
      B(0, 0.26, 0, 0.92, 0.52, 0.92, STRAW);
      B(0, 0.68, 0, 0.64, 0.36, 0.64, shade(STRAW, 1.07));
      B(0, 0.94, 0, 0.32, 0.2, 0.32, shade(STRAW, 1.14));
    },
    cart: (c, B) => {
      B(0, 0.4, 0, 0.92, 0.12, 0.66, c.wood);
      for (const z of [-0.3, 0.3]) B(0, 0.55, z, 0.92, 0.2, 0.05, c.wood);
      for (const x of [-0.46, 0.46]) B(x, 0.24, 0, 0.06, 0.48, 0.48, DARK);
      B(0, 0.6, 0, 0.5, 0.24, 0.4, c.cloth);
      B(0.1, 0.74, 0.05, 0.3, 0.12, 0.3, STRAW);
      B(-0.55, 0.34, 0, 0.3, 0.05, 0.06, DARK);
    }
  };
  var PROP_MODELS = Object.keys(MODELS);
  var rot = (b, r) => {
    if (!r) return b;
    const [x, y, z, w, h, d, ...rest] = b;
    switch (r & 3) {
      case 1:
        return [z, y, -x, d, h, w, ...rest];
      case 2:
        return [-x, y, -z, w, h, d, ...rest];
      default:
        return [-z, y, x, d, h, w, ...rest];
    }
  };
  var role = (c) => LEAF.includes(c) || LEAF.some((l) => [shade(l, 1.08), shade(l, 0.94), shade(l, 0.88), shade(l, 1.1), shade(l, 0.92)].includes(c)) ? "hair" : STONE === c || STONE2 === c ? "other" : WOODS.includes(c) ? "cloth" : "other";
  function build(p, opts = {}) {
    const make = MODELS[p.model];
    if (!make) return null;
    const h = hash(p.id || p.x + "," + p.y), ctx = { wood: WOODS[h % WOODS.length], leaf: LEAF[(h >>> 3) % LEAF.length], cloth: CLOTH[(h >>> 5) % CLOTH.length], h: h >>> 7 };
    const out = [];
    make(ctx, (x, y, z, w, hh, d, c, e = false) => out.push([x, y, z, w, hh, d, c, e]));
    const rotated = out.map((b) => rot(b, p.rot || 0));
    if (opts.texel === false) return rotated;
    return rotated.concat(texelPass(rotated, role));
  }
  return __toCommonJS(props_index_exports);
})();
