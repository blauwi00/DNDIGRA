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
    function emit(decal, parent) {
      const axis = decal[8] === "f" ? 2 : 1, axes = axis === 2 ? [0, 1] : [0, 2];
      const surface = decal[axis] - decal[axis + 3] / 2;
      let pieces = [decal];
      boxes.forEach((b, j) => {
        if (j === parent || b.length > 8) return;
        const near = b[axis] - b[axis + 3] / 2, far = b[axis] + b[axis + 3] / 2;
        if (near >= surface + D - 1e-8 || far < surface - 1e-8 || Math.abs(far - surface) < 1e-8 && j < parent) return;
        const [u, v] = axes, l = b[u] - b[u + 3] / 2, r = b[u] + b[u + 3] / 2, t = b[v] - b[v + 3] / 2, bt = b[v] + b[v + 3] / 2;
        pieces = pieces.flatMap((d) => {
          const dl = d[u] - d[u + 3] / 2, dr = d[u] + d[u + 3] / 2, dt = d[v] - d[v + 3] / 2, db = d[v] + d[v + 3] / 2;
          const il = Math.max(dl, l), ir = Math.min(dr, r), it = Math.max(dt, t), ib = Math.min(db, bt);
          if (ir - il < 1e-8 || ib - it < 1e-8) return [d];
          return [[dl, il, dt, db], [ir, dr, dt, db], [il, ir, dt, it], [il, ir, ib, db]].filter(([l2, r2, t2, b2]) => r2 - l2 > 1e-8 && b2 - t2 > 1e-8).map(([l2, r2, t2, b2]) => {
            const next = [...d];
            next[u] = (l2 + r2) / 2;
            next[u + 3] = r2 - l2;
            next[v] = (t2 + b2) / 2;
            next[v + 3] = b2 - t2;
            return next;
          });
        });
      });
      out.push(...pieces);
    }
    boxes.forEach((b, i) => {
      if (b.length > 8 || b[7]) return;
      const [x, y, z, w, h, d, c] = b;
      if (w < TEXEL.minW || h < TEXEL.minH || d < minDepth) return;
      const cfg = ROLES[role2(c)] || ROLES.other;
      const n = Math.max(1, Math.round(w / size)), m = Math.max(1, Math.round(h / size)), cw = w / n, ch = h / m;
      const zf = z + d / 2 + D / 2, key = z + d / 2 + 1e-4;
      const R = rng(Math.round(x * 997) * 31 + Math.round(y * 991) * 17 + Math.round(z * 983) * 13 + (c & 65535) + i * 7);
      const cells = Array.from({ length: m }, () => Array(n).fill(null));
      const px = (col, row, color, cs = 1, rs = 1) => {
        if (color === c) return;
        for (let r = row; r < Math.min(m, row + rs); r++)
          for (let q = col; q < Math.min(n, col + cs); q++) cells[r][q] = color;
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
      for (let row = 0; row < m; row++) for (let col = 0; col < n; col++) {
        const color = cells[row][col];
        if (color === null) continue;
        let cs = 1, rs = 1;
        while (col + cs < n && cells[row][col + cs] === color) cs++;
        while (row + rs < m && cells[row + rs].slice(col, col + cs).every((v) => v === color)) rs++;
        for (let r = row; r < row + rs; r++) cells[r].fill(null, col, col + cs);
        emit([x - w / 2 + (col + cs / 2) * cw, y + h / 2 - (row + rs / 2) * ch, zf, cs * cw, rs * ch, D, color, false, "f", key], i);
      }
      if (w >= 0.18 && d >= 0.15) {
        const nd = Math.max(1, Math.round(d / size)), cd = d / nd, top = /* @__PURE__ */ new Map();
        for (let k = 0; k < 2; k++) {
          let f = (R() < 0.5 ? -1 : 1) * cfg.amp * (0.6 + R() * 0.5);
          if (Math.abs(f) < 0.04) f = f < 0 ? -0.04 : 0.04;
          const col = Math.floor(R() * n), r = Math.floor(R() * nd);
          top.set(r * n + col, [x - w / 2 + (col + 0.5) * cw, y + h / 2 + D / 2, z - d / 2 + (r + 0.5) * cd, cw, D, cd, tone(c, 1 + f), false, "t", key]);
        }
        for (const decal of top.values()) emit(decal, i);
      }
    });
    return out;
  }

  // src/props-more.js
  var FLAVORS = {
    kitchen: ["spoon", "knife", "bowl", "loaf", "cheese", "apple", "bottle", "mug", "herbs", "fork", "pie"],
    hall: ["tankard", "mug", "plate", "loaf", "cheese", "bottle", "candle", "dice", "coins", "fork", "goblet"],
    study: ["book", "openbook", "scroll", "quill", "candle", "keyring", "coins", "lantern"],
    alchemy: ["bottle", "flask", "mortar", "herbs", "book", "candle"],
    shop: ["coins", "pouch", "bottle", "loaf", "scroll", "keyring", "fruit"],
    living: ["mug", "plate", "candle", "book", "teapot", "fruit", "spoon", "bowl"],
    bedroom: ["candle", "book", "goblet", "mug", "flask"],
    smith: ["knife", "keyring", "mug", "coins", "lantern"],
    default: ["mug", "plate", "candle", "book", "bowl", "loaf"]
  };
  function more(K) {
    const { DARK: DARK2, STONE: STONE3, STONE2: STONE22, IRON: IRON2, STRAW: STRAW2, WATER: WATER2, CLOTH: CLOTH2, shade: shade2 } = K, BONE = 14867659, STEEL = 12963024, GOLD = 12820556, PAPER = 15788760, SACK = 13350538;
    const ITEMS = {
      mug: (B, x, y, z) => {
        B(x, y + 0.05, z, 0.09, 0.1, 0.09, 11569754);
        B(x + 0.06, y + 0.05, z, 0.03, 0.06, 0.03, 11569754);
      },
      tankard: (B, x, y, z) => {
        B(x, y + 0.07, z, 0.1, 0.14, 0.1, 9080210);
        B(x, y + 0.145, z, 0.1, 0.02, 0.1, STEEL);
        B(x + 0.07, y + 0.07, z, 0.03, 0.09, 0.03, 9080210);
      },
      plate: (B, x, y, z) => {
        B(x, y + 0.012, z, 0.2, 0.024, 0.2, 15130831);
        B(x, y + 0.035, z, 0.08, 0.02, 0.08, 11560266);
      },
      bowl: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.16, 0.08, 0.16, 13152384);
        B(x, y + 0.085, z, 0.12, 0.01, 0.12, 9067060);
      },
      spoon: (B, x, y, z) => {
        B(x, y + 0.012, z, 0.02, 0.02, 0.13, 12106944);
        B(x, y + 0.014, z + 0.08, 0.045, 0.015, 0.045, 12106944);
      },
      fork: (B, x, y, z) => {
        B(x, y + 0.012, z, 0.02, 0.02, 0.12, 12106944);
        B(x - 0.015, y + 0.012, z + 0.08, 0.01, 0.012, 0.05, 12106944);
        B(x + 0.015, y + 0.012, z + 0.08, 0.01, 0.012, 0.05, 12106944);
      },
      knife: (B, x, y, z) => {
        B(x, y + 0.015, z - 0.05, 0.03, 0.03, 0.07, 5913896);
        B(x, y + 0.012, z + 0.05, 0.02, 0.012, 0.1, STEEL);
      },
      loaf: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.2, 0.08, 0.11, 12618309);
        B(x, y + 0.09, z, 0.16, 0.03, 0.09, 13933141);
      },
      cheese: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.13, 0.08, 0.1, 15253584);
        B(x + 0.04, y + 0.055, z + 0.04, 0.05, 0.05, 0.04, 16046192);
      },
      apple: (B, x, y, z) => {
        B(x, y + 0.035, z, 0.07, 0.07, 0.07, 12597551);
        B(x, y + 0.08, z, 0.012, 0.03, 0.012, 5913896);
      },
      pie: (B, x, y, z) => {
        B(x, y + 0.03, z, 0.2, 0.06, 0.2, 13144136);
        B(x, y + 0.065, z, 0.16, 0.015, 0.16, 14198880);
      },
      bottle: (B, x, y, z) => {
        B(x, y + 0.08, z, 0.06, 0.16, 0.06, 4160074);
        B(x, y + 0.185, z, 0.03, 0.06, 0.03, 4160074);
        B(x, y + 0.22, z, 0.036, 0.02, 0.036, 11569754);
      },
      flask: (B, x, y, z) => {
        B(x, y + 0.06, z, 0.09, 0.12, 0.09, 6982312);
        B(x, y + 0.14, z, 0.04, 0.05, 0.04, 6982312);
      },
      goblet: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.03, 0.08, 0.03, GOLD);
        B(x, y + 0.1, z, 0.08, 0.06, 0.08, GOLD);
        B(x, y + 0.125, z, 0.06, 0.01, 0.06, 9056060);
      },
      candle: (B, x, y, z) => {
        B(x, y + 0.01, z, 0.07, 0.02, 0.07, IRON2);
        B(x, y + 0.08, z, 0.04, 0.14, 0.04, 15788232);
        B(x, y + 0.17, z, 0.025, 0.04, 0.025, 16765040, true);
      },
      candelabra: (B, x, y, z) => {
        B(x, y + 0.01, z, 0.16, 0.02, 0.08, GOLD);
        for (const o of [-0.06, 0, 0.06]) {
          B(x + o, y + 0.07, z, 0.025, 0.12, 0.025, 15788232);
          B(x + o, y + 0.14, z, 0.02, 0.03, 0.02, 16765040, true);
        }
      },
      book: (B, x, y, z, c) => {
        B(x, y + 0.03, z, 0.15, 0.06, 0.11, c.cloth);
        B(x + 5e-3, y + 0.03, z, 0.14, 0.045, 0.1, PAPER);
        B(x - 0.07, y + 0.03, z, 0.015, 0.06, 0.11, shade2(c.cloth, 0.8));
      },
      openbook: (B, x, y, z) => {
        B(x, y + 0.015, z, 0.2, 0.03, 0.13, PAPER);
        B(x, y + 0.02, z, 0.01, 0.035, 0.13, 6965808);
        B(x - 0.05, y + 0.034, z, 0.07, 4e-3, 0.09, 12433318);
      },
      scroll: (B, x, y, z) => {
        B(x, y + 0.03, z, 0.2, 0.05, 0.06, 15129796);
        B(x - 0.1, y + 0.03, z, 0.025, 0.06, 0.065, 9071174);
        B(x + 0.1, y + 0.03, z, 0.025, 0.06, 0.065, 9071174);
      },
      quill: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.05, 0.08, 0.05, 2763312);
        B(x + 0.04, y + 0.12, z, 0.015, 0.14, 0.015, 15130831);
      },
      dice: (B, x, y, z) => {
        B(x, y + 0.02, z, 0.04, 0.04, 0.04, 15789280);
        B(x + 0.06, y + 0.02, z + 0.02, 0.04, 0.04, 0.04, 15789280);
      },
      coins: (B, x, y, z) => {
        B(x, y + 0.01, z, 0.12, 0.02, 0.12, GOLD);
        B(x, y + 0.03, z, 0.08, 0.02, 0.08, GOLD);
        B(x + 0.1, y + 0.01, z + 0.03, 0.05, 0.02, 0.05, 12106944);
      },
      keyring: (B, x, y, z) => {
        B(x, y + 0.01, z, 0.1, 0.02, 0.1, IRON2);
        B(x, y + 0.015, z + 0.07, 0.02, 0.015, 0.06, GOLD);
        B(x + 0.04, y + 0.015, z + 0.06, 0.02, 0.015, 0.05, GOLD);
      },
      lantern: (B, x, y, z) => {
        B(x, y + 0.07, z, 0.09, 0.14, 0.09, IRON2);
        B(x, y + 0.07, z, 0.06, 0.1, 0.06, 16762976, true);
        B(x, y + 0.16, z, 0.07, 0.02, 0.07, IRON2);
      },
      mortar: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.12, 0.08, 0.12, STONE22);
        B(x, y + 0.075, z, 0.08, 0.02, 0.08, 4876866);
        B(x + 0.04, y + 0.1, z, 0.02, 0.1, 0.02, 12103840);
      },
      herbs: (B, x, y, z) => {
        B(x, y + 0.02, z, 0.14, 0.04, 0.1, 5214024);
        B(x + 0.03, y + 0.05, z, 0.08, 0.03, 0.08, 6265418);
      },
      teapot: (B, x, y, z) => {
        B(x, y + 0.06, z, 0.12, 0.1, 0.1, 11552047);
        B(x, y + 0.12, z, 0.05, 0.03, 0.05, 11552047);
        B(x + 0.08, y + 0.07, z, 0.04, 0.03, 0.03, 11552047);
      },
      pouch: (B, x, y, z) => {
        B(x, y + 0.04, z, 0.1, 0.08, 0.08, 6965808);
        B(x, y + 0.09, z, 0.06, 0.03, 0.06, 4929062);
      },
      fruit: (B, x, y, z) => {
        B(x, y + 0.03, z, 0.18, 0.06, 0.14, 9067060);
        B(x - 0.04, y + 0.075, z, 0.05, 0.05, 0.05, 12597551);
        B(x + 0.04, y + 0.075, z + 0.02, 0.05, 0.05, 0.05, 15253584);
      }
    };
    const clutter = (B, c, y, x0, x1, z0, z1, flavor) => {
      const pool = FLAVORS[flavor] || FLAVORS.default, slots = [];
      const nx = x1 - x0 > 0.6 ? 3 : 2, nz = z1 - z0 > 0.4 ? 2 : 1;
      for (let i = 0; i < nx; i++) for (let j = 0; j < nz; j++) slots.push([x0 + (i + 0.5) * (x1 - x0) / nx, z0 + (j + 0.5) * (z1 - z0) / nz]);
      const count = 2 + c.h % 3, order = slots.map((s, i) => [(c.h >>> i + 1) * 2654435761 >>> 0, s]).sort((a, b) => a[0] - b[0]).map((a) => a[1]);
      for (let k = 0; k < Math.min(count, order.length); k++) {
        const name = pool[((c.h >>> 3) + k * 5 + k * k) % pool.length];
        ITEMS[name]?.(B, order[k][0], y, order[k][1], c);
      }
    };
    const W = (c, k = 1) => shade2(c.wood, k);
    const M = {
      // ——— крупная мебель ———
      workbench: (c, B) => {
        B(0, 0.45, 0, 0.94, 0.08, 0.6, c.wood);
        for (const [x, z] of [[-0.4, -0.24], [0.4, -0.24], [-0.4, 0.24], [0.4, 0.24]]) B(x, 0.2, z, 0.08, 0.4, 0.08, DARK2);
        B(0.34, 0.54, 0.05, 0.12, 0.1, 0.12, IRON2);
        B(-0.2, 0.5, 0.05, 0.3, 0.03, 0.1, STEEL);
        B(0.05, 0.52, -0.12, 0.12, 0.06, 0.1, 5913896);
      },
      loom: (c, B) => {
        for (const x of [-0.4, 0.4]) B(x, 0.56, 0, 0.08, 1.12, 0.5, DARK2);
        B(0, 1.08, 0, 0.9, 0.08, 0.1, DARK2);
        B(0, 0.6, 0.08, 0.72, 0.8, 0.02, c.cloth);
        for (let i = 0; i < 5; i++) B(-0.3 + i * 0.15, 0.6, 0.1, 0.02, 0.8, 0.01, shade2(c.cloth, 1.3));
        B(0, 0.22, 0.32, 0.7, 0.06, 0.2, c.wood);
      },
      bathtub: (c, B) => {
        B(0, 0.24, 0, 0.8, 0.4, 0.92, 12103840);
        B(0, 0.42, 0, 0.62, 0.06, 0.74, WATER2);
        for (const [x, z] of [[-0.34, -0.4], [0.34, -0.4], [-0.34, 0.4], [0.34, 0.4]]) B(x, 0.03, z, 0.1, 0.06, 0.1, DARK2);
      },
      cradle: (c, B) => {
        B(0, 0.2, 0, 0.5, 0.18, 0.8, c.wood);
        B(0, 0.06, 0, 0.6, 0.04, 0.9, DARK2);
        B(0, 0.36, -0.2, 0.5, 0.22, 0.3, c.wood);
        B(0, 0.3, 0.12, 0.4, 0.04, 0.4, c.cloth);
      },
      sackpile: (c, B) => {
        B(-0.2, 0.2, -0.1, 0.4, 0.4, 0.4, SACK);
        B(0.2, 0.18, 0.02, 0.36, 0.36, 0.4, shade2(SACK, 0.94));
        B(0, 0.5, -0.05, 0.34, 0.3, 0.34, shade2(SACK, 1.06));
        B(-0.2, 0.42, -0.1, 0.16, 0.05, 0.16, DARK2);
      },
      haybale: (c, B) => {
        B(0, 0.28, 0, 0.9, 0.56, 0.7, STRAW2);
        B(0, 0.28, 0, 0.93, 0.04, 0.73, DARK2);
        B(0, 0.28, -0.2, 0.93, 0.56, 0.04, shade2(STRAW2, 0.9));
      },
      cratestack: (c, B) => {
        B(-0.2, 0.22, 0, 0.45, 0.44, 0.5, c.wood);
        B(0.25, 0.2, 0.06, 0.4, 0.4, 0.45, shade2(c.wood, 0.85));
        B(0, 0.64, 0, 0.46, 0.4, 0.5, shade2(c.wood, 1.1));
        B(-0.2, 0.22, 0.26, 0.4, 0.04, 0.02, DARK2);
      },
      barrelstack: (c, B) => {
        for (const x of [-0.26, 0.26]) {
          B(x, 0.3, 0, 0.4, 0.6, 0.4, c.wood);
          B(x, 0.12, 0, 0.43, 0.04, 0.43, DARK2);
          B(x, 0.48, 0, 0.43, 0.04, 0.43, DARK2);
        }
        B(0, 0.82, 0, 0.4, 0.6, 0.4, shade2(c.wood, 0.95));
        B(0, 0.7, 0, 0.43, 0.04, 0.43, DARK2);
        B(0, 0.94, 0, 0.43, 0.04, 0.43, DARK2);
      },
      statue: (c, B) => {
        B(0, 0.2, 0, 0.7, 0.4, 0.7, STONE22);
        B(0, 0.78, 0, 0.32, 0.76, 0.24, STONE3);
        B(0, 1.28, 0, 0.24, 0.24, 0.24, STONE3);
        B(-0.22, 0.8, 0, 0.1, 0.5, 0.12, STONE3);
        B(0.22, 0.8, 0, 0.1, 0.5, 0.12, STONE3);
      },
      pulpit: (c, B) => {
        B(0, 0.55, 0, 0.6, 1.1, 0.5, c.wood);
        B(0, 1.12, 0.1, 0.72, 0.08, 0.5, DARK2);
        B(0, 1.18, 0.1, 0.3, 0.05, 0.2, 15129796);
        B(0, 0.55, 0.26, 0.3, 0.6, 0.02, shade2(c.wood, 0.8));
      },
      font: (c, B) => {
        B(0, 0.35, 0, 0.3, 0.7, 0.3, STONE22);
        B(0, 0.78, 0, 0.62, 0.14, 0.62, STONE3);
        B(0, 0.86, 0, 0.5, 0.02, 0.5, WATER2);
      },
      coffin: (c, B) => {
        B(0, 0.22, 0, 0.5, 0.44, 0.94, c.wood);
        B(0, 0.47, 0, 0.54, 0.06, 0.98, shade2(c.wood, 0.82));
        B(0, 0.52, 0.1, 0.06, 0.02, 0.4, GOLD);
        B(0, 0.52, 0.2, 0.24, 0.02, 0.06, GOLD);
      },
      cage: (c, B) => {
        B(0, 0.05, 0, 0.9, 0.1, 0.9, DARK2);
        B(0, 1.14, 0, 0.9, 0.06, 0.9, IRON2);
        for (const x of [-0.42, -0.14, 0.14, 0.42]) for (const z of [-0.42, 0.42]) B(x, 0.6, z, 0.04, 1, 0.04, IRON2);
        for (const z of [-0.14, 0.14]) {
          B(-0.42, 0.6, z, 0.04, 1, 0.04, IRON2);
          B(0.42, 0.6, z, 0.04, 1, 0.04, IRON2);
        }
      },
      throne: (c, B) => {
        B(0, 0.25, 0, 0.62, 0.5, 0.62, c.wood);
        B(0, 0.95, -0.26, 0.62, 1.1, 0.1, c.wood);
        for (const x of [-0.31, 0.31]) B(x, 0.6, 0, 0.08, 0.24, 0.6, c.wood);
        B(0, 0.53, 0.02, 0.5, 0.06, 0.5, 9056060);
        B(0, 1.55, -0.26, 0.24, 0.12, 0.1, GOLD);
      },
      lamppost: (c, B) => {
        B(0, 0.06, 0, 0.3, 0.12, 0.3, STONE22);
        B(0, 0.86, 0, 0.08, 1.7, 0.08, IRON2);
        B(0, 1.7, 0, 0.3, 0.3, 0.3, IRON2);
        B(0, 1.7, 0, 0.22, 0.22, 0.22, 16762976, true);
        B(0, 1.88, 0, 0.34, 0.06, 0.34, DARK2);
      },
      // ——— напольные мелочи (проходимы) ———
      bucket: (c, B) => {
        B(0, 0.12, 0, 0.26, 0.24, 0.26, c.wood);
        B(0, 0.24, 0, 0.2, 0.02, 0.2, WATER2);
        B(0, 0.3, 0, 0.22, 0.02, 0.02, IRON2);
        B(0, 0.12, 0, 0.28, 0.03, 0.28, DARK2);
      },
      broom: (c, B) => {
        B(0, 0.5, 0, 0.05, 1, 0.05, c.wood);
        B(0, 0.1, 0, 0.2, 0.2, 0.14, STRAW2);
        B(0, 0.2, 0, 0.22, 0.03, 0.16, DARK2);
      },
      sack: (c, B) => {
        B(0, 0.15, 0, 0.3, 0.3, 0.28, SACK);
        B(0, 0.32, 0, 0.16, 0.06, 0.16, SACK);
        B(0, 0.3, 0, 0.18, 0.03, 0.18, DARK2);
      },
      basket: (c, B) => {
        B(0, 0.1, 0, 0.3, 0.2, 0.3, 11569744);
        B(0, 0.21, 0, 0.34, 0.03, 0.34, 10122816);
        B(0, 0.3, 0, 0.3, 0.02, 0.03, 10122816);
      },
      rope: (c, B) => {
        B(0, 0.03, 0, 0.3, 0.06, 0.3, 13150320);
        B(0, 0.075, 0, 0.22, 0.04, 0.22, 12097632);
        B(0.1, 0.03, 0.18, 0.2, 0.03, 0.05, 13150320);
      },
      boots: (c, B) => {
        B(-0.08, 0.07, 0, 0.1, 0.14, 0.2, 4929062);
        B(0.1, 0.07, 0.02, 0.1, 0.14, 0.2, shade2(4929062, 1.1));
        B(-0.08, 0.015, 0.06, 0.1, 0.03, 0.08, DARK2);
      },
      wheel: (c, B) => {
        B(0, 0.4, 0, 0.06, 0.1, 0.12, c.wood);
        for (const a of [0, 1]) B(0, 0.4, 0, 0.04, a ? 0.06 : 0.7, a ? 0.7 : 0.06, c.wood);
        for (const s of [-1, 1]) {
          B(0, 0.4 + s * 0.36, 0, 0.07, 0.06, 0.7, DARK2);
          B(0, 0.4, s * 0.36, 0.07, 0.7, 0.06, DARK2);
        }
      },
      puddle: (c, B) => {
        B(0, 0.01, 0, 0.5, 0.015, 0.4, WATER2);
        B(0.15, 0.012, -0.1, 0.3, 0.015, 0.3, shade2(WATER2, 1.12));
      },
      straw: (c, B) => {
        B(0, 0.012, 0, 0.6, 0.02, 0.5, STRAW2);
        B(-0.1, 0.03, 0.08, 0.3, 0.02, 0.2, shade2(STRAW2, 1.1));
        B(0.15, 0.025, -0.1, 0.2, 0.02, 0.15, shade2(STRAW2, 0.9));
      },
      rubble: (c, B) => {
        B(-0.1, 0.05, 0.05, 0.2, 0.1, 0.18, STONE22);
        B(0.12, 0.04, -0.08, 0.14, 0.08, 0.14, STONE3);
        B(0.02, 0.03, 0.18, 0.1, 0.06, 0.08, STONE22);
      },
      lantern_floor: (c, B) => {
        B(0, 0.1, 0, 0.16, 0.2, 0.16, IRON2);
        B(0, 0.1, 0, 0.1, 0.14, 0.1, 16762976, true);
        B(0, 0.22, 0, 0.12, 0.02, 0.12, IRON2);
      },
      pitchfork: (c, B) => {
        B(0, 0.6, 0, 0.04, 1.2, 0.04, c.wood);
        B(-0.07, 1.18, 0, 0.02, 0.16, 0.02, IRON2);
        B(0, 1.2, 0, 0.02, 0.2, 0.02, IRON2);
        B(0.07, 1.18, 0, 0.02, 0.16, 0.02, IRON2);
        B(0, 1.1, 0, 0.18, 0.02, 0.02, IRON2);
      },
      shovel: (c, B) => {
        B(0, 0.55, 0, 0.04, 1.1, 0.04, c.wood);
        B(0, 0.1, 0.02, 0.16, 0.2, 0.03, IRON2);
        B(0, 1.1, 0, 0.12, 0.03, 0.03, c.wood);
      },
      // ——— настенные (стена за спиной, лицо в +z) ———
      shield: (c, B) => {
        B(0, 1.1, 0.44, 0.34, 0.42, 0.05, c.cloth);
        B(0, 1.1, 0.47, 0.06, 0.36, 0.03, GOLD);
        B(0, 1.16, 0.47, 0.28, 0.06, 0.03, GOLD);
        B(0, 1.32, 0.44, 0.3, 0.06, 0.05, STEEL);
      },
      swords: (c, B) => {
        for (const x of [-0.1, 0.1]) {
          B(x, 1.1, 0.44, 0.05, 0.52, 0.03, STEEL);
          B(x, 0.86, 0.44, 0.2, 0.04, 0.04, GOLD);
          B(x, 0.82, 0.44, 0.05, 0.08, 0.04, 5913896);
        }
        B(0, 1.34, 0.44, 0.4, 0.05, 0.04, DARK2);
      },
      antlers: (c, B) => {
        B(0, 1.1, 0.44, 0.16, 0.14, 0.08, c.wood);
        for (const s of [-1, 1]) {
          B(s * 0.14, 1.2, 0.46, 0.2, 0.05, 0.05, BONE);
          B(s * 0.26, 1.3, 0.46, 0.05, 0.22, 0.05, BONE);
          B(s * 0.2, 1.26, 0.46, 0.05, 0.12, 0.05, BONE);
          B(s * 0.34, 1.42, 0.46, 0.04, 0.1, 0.04, BONE);
        }
      },
      painting: (c, B) => {
        B(0, 1.15, 0.45, 0.52, 0.4, 0.04, c.wood);
        B(0, 1.15, 0.47, 0.44, 0.32, 0.02, [6982312, 10127962, 8034922, 11042922][c.h % 4]);
        B(-0.08, 1.1, 0.485, 0.16, 0.1, 0.01, 6130250);
        B(0.12, 1.2, 0.485, 0.08, 0.08, 0.01, 15786144);
      },
      tapestry: (c, B) => {
        B(0, 1.1, 0.45, 0.6, 0.9, 0.03, c.cloth);
        B(0, 1.5, 0.46, 0.66, 0.05, 0.04, GOLD);
        for (let i = 0; i < 3; i++) B(0, 0.9 + i * 0.24, 0.47, 0.46, 0.06, 0.01, shade2(c.cloth, 1.4 - i * 0.2));
        B(0, 0.62, 0.46, 0.5, 0.04, 0.03, GOLD);
      },
      mirror: (c, B) => {
        B(0, 1.1, 0.45, 0.4, 0.56, 0.04, GOLD);
        B(0, 1.1, 0.47, 0.32, 0.48, 0.02, 11457760);
        B(-0.06, 1.2, 0.485, 0.06, 0.16, 0.01, 15267064);
      },
      clock: (c, B) => {
        B(0, 1.15, 0.45, 0.3, 0.3, 0.06, c.wood);
        B(0, 1.15, 0.49, 0.22, 0.22, 0.02, 15657168);
        B(0, 1.19, 0.5, 0.02, 0.1, 0.01, 2236962);
        B(0.04, 1.15, 0.5, 0.08, 0.02, 0.01, 2236962);
        B(0, 0.98, 0.45, 0.06, 0.12, 0.04, GOLD);
      },
      hooks: (c, B) => {
        B(0, 1.15, 0.46, 0.74, 0.1, 0.03, c.wood);
        for (const x of [-0.26, 0, 0.26]) B(x, 1.08, 0.49, 0.03, 0.06, 0.03, IRON2);
        B(-0.26, 0.86, 0.47, 0.2, 0.4, 0.04, c.cloth);
        B(0.26, 0.94, 0.47, 0.14, 0.26, 0.04, shade2(c.cloth, 0.8));
      },
      jars: (c, B) => {
        B(0, 1, 0.4, 0.72, 0.05, 0.14, c.wood);
        for (const [i, col] of [9091240, 13148746, 11560266, 6982312].entries()) B(-0.27 + i * 0.18, 1.1, 0.4, 0.1, 0.15, 0.1, col);
        B(0, 1.32, 0.4, 0.72, 0.05, 0.14, c.wood);
        B(-0.2, 1.4, 0.4, 0.1, 0.12, 0.1, 15129796);
        B(0.1, 1.4, 0.4, 0.12, 0.12, 0.1, 9091240);
      },
      map: (c, B) => {
        B(0, 1.1, 0.46, 0.56, 0.42, 0.02, 14733472);
        B(-0.12, 1.1, 0.48, 0.2, 0.02, 0.01, 9067060);
        B(0.08, 1.16, 0.48, 0.02, 0.16, 0.01, 4160074);
        B(0.12, 1.04, 0.48, 0.14, 0.1, 0.01, WATER2);
        B(0, 1.34, 0.46, 0.6, 0.03, 0.03, DARK2);
        B(0, 0.86, 0.46, 0.6, 0.03, 0.03, DARK2);
      },
      noticeboard: (c, B) => {
        B(0, 1.1, 0.45, 0.62, 0.5, 0.04, c.wood);
        B(0, 1.1, 0.47, 0.54, 0.42, 0.02, 11569754);
        for (const [x, y, col] of [[-0.16, 1.2, PAPER], [0.12, 1.16, 15129796], [-0.04, 1.02, 14208168], [0.18, 1.02, PAPER]]) B(x, y, 0.49, 0.14, 0.16, 0.01, col);
      },
      pans: (c, B) => {
        B(0, 1.4, 0.46, 0.74, 0.04, 0.04, IRON2);
        for (const [x, s] of [[-0.24, 0.2], [0, 0.24], [0.24, 0.18]]) {
          B(x, 1.2, 0.47, s, s, 0.04, IRON2);
          B(x, 1.36, 0.47, 0.02, 0.1, 0.03, IRON2);
          B(x, 1.2, 0.5, s - 0.06, s - 0.06, 0.01, 4869973);
        }
      },
      herbs_hang: (c, B) => {
        B(0, 1.45, 0.45, 0.66, 0.03, 0.03, DARK2);
        for (const [i, col] of [5933642, 8034890, 6982234, 9085018].entries()) {
          B(-0.24 + i * 0.16, 1.28, 0.46, 0.08, 0.28, 0.06, col);
          B(-0.24 + i * 0.16, 1.44, 0.46, 0.02, 0.04, 0.02, 12097632);
        }
      },
      tavernsign: (c, B) => {
        B(0.15, 1.45, 0.5, 0.5, 0.04, 0.04, IRON2);
        B(0.3, 1.28, 0.5, 0.32, 0.28, 0.04, c.wood);
        B(0.3, 1.28, 0.53, 0.22, 0.18, 0.02, c.cloth);
        B(0.3, 1.28, 0.545, 0.08, 0.08, 0.01, GOLD);
        B(0.12, 1.38, 0.5, 0.02, 0.1, 0.02, IRON2);
      },
      shutter: (c, B) => {
        B(0, 1.15, 0.44, 0.5, 0.5, 0.05, c.wood);
        B(0, 1.15, 0.47, 0.36, 0.36, 0.02, 10405596);
        B(0, 1.15, 0.485, 0.03, 0.36, 0.01, c.wood);
        B(0, 1.15, 0.485, 0.36, 0.03, 0.01, c.wood);
        for (const s of [-1, 1]) B(s * 0.31, 1.15, 0.46, 0.1, 0.5, 0.03, shade2(c.wood, 0.85));
      },
      keysboard: (c, B) => {
        B(0, 1.1, 0.46, 0.5, 0.34, 0.03, c.wood);
        for (let i = 0; i < 4; i++) {
          B(-0.18 + i * 0.12, 1.15, 0.49, 0.02, 0.02, 0.02, IRON2);
          B(-0.18 + i * 0.12, 1.06, 0.49, 0.03, 0.14, 0.015, GOLD);
        }
      },
      shackles: (c, B) => {
        for (const x of [-0.12, 0.12]) {
          B(x, 1.3, 0.46, 0.05, 0.05, 0.04, IRON2);
          for (let i = 0; i < 3; i++) B(x, 1.22 - i * 0.09, 0.47, 0.03, 0.06, 0.02, IRON2);
          B(x, 0.96, 0.47, 0.1, 0.07, 0.04, IRON2);
        }
      },
      horseshoe: (c, B) => {
        B(-0.07, 1.15, 0.46, 0.03, 0.14, 0.03, IRON2);
        B(0.07, 1.15, 0.46, 0.03, 0.14, 0.03, IRON2);
        B(-0.05, 1.08, 0.46, 0.03, 0.03, 0.03, IRON2);
        B(0.05, 1.08, 0.46, 0.03, 0.03, 0.03, IRON2);
        B(0, 1.06, 0.46, 0.08, 0.03, 0.03, IRON2);
      },
      net: (c, B) => {
        for (let i = 0; i < 5; i++) {
          B(-0.28 + i * 0.14, 1.1, 0.45, 0.015, 0.7, 0.015, 12097632);
          B(0, 0.86 + i * 0.14, 0.45, 0.62, 0.015, 0.015, 12097632);
        }
        B(0, 1.46, 0.45, 0.66, 0.03, 0.04, DARK2);
      }
    };
    return { models: M, items: ITEMS, clutter };
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
  var X;
  var MODELS = {
    table: (c, B) => {
      B(0, 0.44, 0, 0.88, 0.08, 0.7, c.wood);
      for (const [x, z] of [[-0.37, -0.28], [0.37, -0.28], [-0.37, 0.28], [0.37, 0.28]]) B(x, 0.2, z, 0.08, 0.4, 0.08, DARK);
      if (c.h % 4 === 3) B(0, 0.485, 0, 0.92, 0.01, 0.74, c.cloth);
      X.clutter(B, c, c.h % 4 === 3 ? 0.49 : 0.48, -0.36, 0.36, -0.24, 0.24, c.flavor);
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
      X.clutter(B, c, 0.865, -0.4, 0.4, -0.2, 0.2, c.flavor);
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
  var EXTRA = more({ DARK, STONE, STONE2, IRON, STRAW, WATER, CLOTH, shade });
  X = EXTRA;
  Object.assign(MODELS, EXTRA.models);
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
    ctx.flavor = p.flavor;
    const out = [];
    make(ctx, (x, y, z, w, hh, d, c, e = false) => out.push([x, y, z, w, hh, d, c, e]));
    const rotated = out.map((b) => rot(b, p.rot || 0));
    if (opts.texel === false) return rotated;
    return rotated.concat(texelPass(rotated, role));
  }
  return __toCommonJS(props_index_exports);
})();
