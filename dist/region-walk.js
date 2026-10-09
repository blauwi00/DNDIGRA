var RegionWalk = (() => {
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

  // src/region-walk.js
  var region_walk_exports = {};
  __export(region_walk_exports, {
    createRegionWalk: () => createRegionWalk
  });

  // src/worldgen/rng.js
  function hash32(str, salt = 0) {
    let h = (1779033703 ^ str.length) + Math.imul(salt, 2654435761) | 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^ h >>> 16) >>> 0;
  }
  var Rng = class _Rng {
    constructor(seed) {
      this.path = String(seed);
      this.a = hash32(this.path, 1);
      this.b = hash32(this.path, 2);
      this.c = hash32(this.path, 3);
      this.d = hash32(this.path, 4);
      for (let i = 0; i < 15; i++) this.next();
    }
    next() {
      const t = (this.a + this.b | 0) + this.d | 0;
      this.d = this.d + 1 | 0;
      this.a = this.b ^ this.b >>> 9;
      this.b = this.c + (this.c << 3) | 0;
      this.c = this.c << 21 | this.c >>> 11;
      this.c = this.c + t | 0;
      return (t >>> 0) / 4294967296;
    }
    int(a, b) {
      return a + Math.floor(this.next() * (b - a + 1));
    }
    // включительно
    chance(p) {
      return this.next() < p;
    }
    pick(list) {
      return list[Math.floor(this.next() * list.length)];
    }
    shuffle(list) {
      const a = list.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(this.next() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
    weighted(pairs) {
      let total = 0;
      for (const [, w] of pairs) total += w;
      let r = this.next() * total;
      for (const [v, w] of pairs) {
        r -= w;
        if (r < 0) return v;
      }
      return pairs[pairs.length - 1][0];
    }
    fork(label) {
      return new _Rng(this.path + "/" + label);
    }
  };

  // src/worldgen/surfaces.js
  var SURFACES = {
    cobble: { code: "c", name: "\u0411\u0440\u0443\u0441\u0447\u0430\u0442\u043A\u0430", colors: [8157035, 7433314, 8814703, 6841435] },
    flagstone: { code: "f", name: "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0438\u0442\u044B", colors: [10131082, 9407360, 10723219, 8881016] },
    dirt: { code: "d", name: "\u0423\u0442\u043E\u043F\u0442\u0430\u043D\u043D\u0430\u044F \u0437\u0435\u043C\u043B\u044F", colors: [8019523, 7230265, 8677194, 6638645] },
    grass: { code: "g", name: "\u0422\u0440\u0430\u0432\u0430", colors: [6261322, 5603392, 6985042, 5208637] },
    planks: { code: "p", name: "\u0414\u043E\u0449\u0430\u0442\u044B\u0439 \u043F\u043E\u043B", colors: [10121800, 9332800, 10845264, 8675386] },
    planks_dark: { code: "q", name: "\u0422\u0451\u043C\u043D\u044B\u0435 \u0434\u043E\u0441\u043A\u0438", colors: [7228978, 6637097, 7820856, 6045992] },
    tiles: { code: "t", name: "\u041A\u0430\u0444\u0435\u043B\u044C", colors: [11840150, 11050634, 12432288, 10392706] },
    carpet: { code: "r", name: "\u041A\u043E\u0432\u0451\u0440", colors: [9058874, 8270386, 9847876, 7613484] },
    straw: { code: "s", name: "\u0421\u043E\u043B\u043E\u043C\u0430", colors: [13281626, 12492368, 13939812, 11834442] },
    stone: { code: "S", name: "\u041A\u0430\u043C\u0435\u043D\u044C", colors: [7303542, 6645612, 7961472, 6119268] },
    stone_dark: { code: "D", name: "\u0422\u0451\u043C\u043D\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u044C", colors: [5527131, 4934994, 6119268, 4474442] },
    moss: { code: "m", name: "\u041C\u0448\u0438\u0441\u0442\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u044C", colors: [5204551, 4677951, 5796943, 4217400] },
    cracked: { code: "k", name: "\u041F\u043E\u0442\u0440\u0435\u0441\u043A\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u043A\u0430\u043C\u0435\u043D\u044C", colors: [5921889, 5329751, 6448234, 4869200] },
    sand: { code: "a", name: "\u041F\u0435\u0441\u043E\u043A", colors: [13482378, 12758656, 14075030, 12100728] },
    leaves: { code: "l", name: "\u041E\u043F\u0430\u0432\u0448\u0438\u0435 \u043B\u0438\u0441\u0442\u044C\u044F", colors: [9071157, 8216368, 9860412, 7296042] },
    gravel: { code: "v", name: "\u0413\u0440\u0430\u0432\u0438\u0439", colors: [9078396, 8354674, 9736326, 7762538] },
    wet: { code: "w", name: "\u0421\u044B\u0440\u043E\u0439 \u043A\u0430\u043C\u0435\u043D\u044C", colors: [4543839, 4083031, 5004648, 3688016] }
  };
  var SURFACE_BY_CODE = Object.fromEntries(Object.entries(SURFACES).map(([id, s]) => [s.code, id]));
  function noise2(seed, x, y) {
    const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, v = (a2, b2) => (hash32(seed + ":" + a2 + "," + b2) & 1023) / 1023, s = (t) => t * t * (3 - 2 * t);
    const a = v(x0, y0), b = v(x0 + 1, y0), c = v(x0, y0 + 1), d = v(x0 + 1, y0 + 1);
    return (a + (b - a) * s(fx)) * (1 - s(fy)) + (c + (d - c) * s(fx)) * s(fy);
  }
  var PATCHES = {
    cobble: [["dirt", "hi", 0.74], ["gravel", "lo", 0.13]],
    grass: [["dirt", "hi", 0.78], ["leaves", "lo", 0.12]],
    planks: [["planks_dark", "hi", 0.8]],
    planks_dark: [["planks", "hi", 0.86]],
    stone: [["cracked", "hi", 0.78], ["moss", "lo", 0.12], ["wet", "lo", 0.04]],
    stone_dark: [["cracked", "hi", 0.84], ["moss", "lo", 0.07]],
    flagstone: [["cracked", "hi", 0.86]],
    tiles: [["cracked", "hi", 0.92]],
    dirt: [["gravel", "hi", 0.8], ["straw", "lo", 0.08]],
    sand: [["gravel", "hi", 0.85]]
  };
  function varyFloor(id, seed, x, y) {
    const p = PATCHES[id];
    if (!p) return id;
    const n = noise2(seed + id, x / 3.2, y / 3.2);
    for (const [to, side, t] of p) if (side === "hi" ? n > t : n < t) return to;
    return id;
  }

  // src/region-walk.js
  function createRegionWalk(seed = "region-walk") {
    const W = 96, H = 64, rng = new Rng(String(seed));
    const road = (x, y) => y >= 30 && y <= 34 || x >= 46 && x <= 50 || x >= 16 && x <= 20 && y >= 23 && y < 30 || x >= 75 && x <= 79 && y > 34 && y <= 46;
    const tiles = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_2, x) => x === 0 || y === 0 || x === W - 1 || y === H - 1 ? "void" : x === 1 || y === 1 || x === W - 2 || y === H - 2 ? "wall" : "floor"));
    const surface = tiles.map((row, y) => row.map((tile, x) => tile !== "floor" ? " " : road(x, y) ? "d" : SURFACES[varyFloor("grass", String(seed), x, y)].code).join(""));
    const props = [], occupied = /* @__PURE__ */ new Set();
    const place = (id, x, y, model, name, description, type = "furniture") => {
      occupied.add(`${x},${y}`);
      props.push({ id, x, y, kind: type === "chest" ? 17 : 24, ...type === "chest" ? {} : { model }, type, name, description });
    };
    place("walk-camp-cart", 14, 25, "cart", "\u041F\u043E\u0432\u043E\u0437\u043A\u0430 \u0443 \u043F\u0440\u0438\u0432\u0430\u043B\u0430", "\u041F\u043E\u0432\u043E\u0437\u043A\u0430 \u0441\u0442\u043E\u0438\u0442 \u0432 \u0442\u0435\u043D\u0438 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432. \u0414\u043E\u0440\u043E\u0433\u0430 \u0432\u0435\u0434\u0451\u0442 \u043A \u043A\u043E\u043B\u043E\u0434\u0446\u0443 \u0438 \u0441\u0442\u0430\u0440\u044B\u043C \u043A\u0430\u043C\u0435\u043D\u043D\u044B\u043C \u0441\u0442\u043E\u043B\u0431\u0430\u043C.");
    place("walk-camp-chest", 18, 28, "chest", "\u0414\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A", "\u0417\u0430\u0431\u044B\u0442\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A \u0443 \u043F\u0440\u0438\u0432\u0430\u043B\u0430. \u041D\u0430\u0445\u043E\u0434\u043A\u0438 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0432 \u044D\u0442\u043E\u0439 \u043F\u0440\u043E\u0433\u0443\u043B\u043A\u0435.", "chest");
    place("walk-road-sign", 26, 28, "signpost", "\u0423\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C \u043D\u0430 \u043F\u0435\u0440\u0435\u043A\u0440\u0451\u0441\u0442\u043E\u043A", "\u041D\u0430 \u0432\u043E\u0441\u0442\u043E\u043A \u2014 \u043A\u043E\u043B\u043E\u0434\u0435\u0446 \u0443 \u043F\u0435\u0440\u0435\u043A\u0440\u0451\u0441\u0442\u043A\u0430; \u0437\u0430 \u043D\u0438\u043C \u0442\u0440\u043E\u043F\u0430 \u043A \u0441\u0442\u0430\u0440\u044B\u043C \u043A\u0430\u043C\u043D\u044F\u043C.");
    place("walk-crossing-well", 43, 18, "well", "\u041A\u043E\u043B\u043E\u0434\u0435\u0446 \u0443 \u043F\u0435\u0440\u0435\u043A\u0440\u0451\u0441\u0442\u043A\u0430", "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043B\u043E\u0434\u0435\u0446 \u0441\u043B\u0443\u0436\u0438\u0442 \u043E\u0440\u0438\u0435\u043D\u0442\u0438\u0440\u043E\u043C \u0434\u043B\u044F \u043F\u0443\u0442\u043D\u0438\u043A\u043E\u0432. \u0412\u043E\u0434\u0430 \u0433\u043B\u0443\u0431\u043E\u043A\u043E \u0432\u043D\u0438\u0437\u0443.");
    place("walk-ruins-west", 73, 44, "pillar", "\u0421\u0442\u0430\u0440\u044B\u0435 \u043A\u0430\u043C\u043D\u0438 \xB7 \u0437\u0430\u043F\u0430\u0434\u043D\u044B\u0439 \u0441\u0442\u043E\u043B\u0431", "\u041E\u0442 \u0441\u0442\u0430\u0440\u043E\u0439 \u043E\u0433\u0440\u0430\u0434\u044B \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u043F\u043E\u043A\u0440\u044B\u0442\u044B\u0435 \u043C\u0445\u043E\u043C \u043A\u0430\u043C\u0435\u043D\u043D\u044B\u0435 \u0441\u0442\u043E\u043B\u0431\u044B.", "cover");
    place("walk-ruins-east", 81, 44, "pillar", "\u0421\u0442\u0430\u0440\u044B\u0435 \u043A\u0430\u043C\u043D\u0438 \xB7 \u0432\u043E\u0441\u0442\u043E\u0447\u043D\u044B\u0439 \u0441\u0442\u043E\u043B\u0431", "\u041D\u0430\u0434 \u043F\u043E\u043B\u044F\u043D\u043A\u043E\u0439 \u0448\u0443\u043C\u044F\u0442 \u0432\u0435\u0442\u0432\u0438; \u0448\u0438\u0440\u043E\u043A\u0430\u044F \u0442\u0440\u043E\u043F\u0430 \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442\u0441\u044F \u043A \u0433\u043B\u0430\u0432\u043D\u043E\u0439 \u0434\u043E\u0440\u043E\u0433\u0435.", "cover");
    place("walk-ruins-chest", 78, 39, "chest", "\u0421\u0443\u043D\u0434\u0443\u043A \u0443 \u0441\u0442\u0430\u0440\u044B\u0445 \u043A\u0430\u043C\u043D\u0435\u0439", "\u041D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0439 \u0441\u0443\u043D\u0434\u0443\u043A \u0443 \u043A\u0430\u043C\u0435\u043D\u043D\u043E\u0439 \u043E\u0433\u0440\u0430\u0434\u044B. \u041D\u0430\u0445\u043E\u0434\u043A\u0438 \u043D\u0435 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u044F\u0442\u0441\u044F \u0432 \u043F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435.", "chest");
    const nearRoad = (x, y) => {
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) if (road(x + dx, y + dy)) return true;
      return false;
    };
    for (let y = 6; y < H - 5; y += 5) for (let x = 6; x < W - 5; x += 5) {
      const px = x + rng.int(-1, 1), py = y + rng.int(-1, 1);
      if (nearRoad(px, py) || props.some((p) => Math.hypot(p.x - px, p.y - py) < 4) || rng.chance(0.28)) continue;
      const model = rng.chance(0.8) ? "tree" : "bush";
      place(`walk-${model}-${x}-${y}`, px, py, model, model === "tree" ? "\u041F\u0440\u0438\u0434\u043E\u0440\u043E\u0436\u043D\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E" : "\u041B\u0435\u0441\u043D\u043E\u0439 \u043A\u0443\u0441\u0442", model === "tree" ? "\u041A\u0440\u043E\u043D\u0430 \u0448\u0435\u043B\u0435\u0441\u0442\u0438\u0442 \u043D\u0430\u0434 \u0442\u0440\u0430\u0432\u044F\u043D\u0438\u0441\u0442\u043E\u0439 \u043F\u043E\u043B\u044F\u043D\u043E\u0439." : "\u041D\u0438\u0437\u043A\u0438\u0439 \u043A\u0443\u0441\u0442 \u0440\u0430\u0441\u0442\u0451\u0442 \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0435 \u043E\u0442 \u0434\u043E\u0440\u043E\u0433\u0438.");
    }
    return {
      id: "region-walk",
      name: "\u041F\u0440\u043E\u0433\u0443\u043B\u043A\u0430 \u043F\u043E \u043E\u043A\u0440\u0435\u0441\u0442\u043D\u043E\u0441\u0442\u044F\u043C",
      W,
      H,
      outdoor: true,
      tiles,
      surface,
      wallStyle: "cave",
      props,
      decor: [],
      lights: [],
      dummies: [],
      encounters: [],
      spawns: [[8, 32], [8, 31], [8, 33]],
      trainingSpawn: [[10, 32], [10, 31], [10, 33]],
      enemySpawn: [[12, 32], [12, 31], [12, 33]],
      landmarks: [{ id: "walk-camp", name: "\u0414\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u043F\u0440\u0438\u0432\u0430\u043B", x: 18, y: 26 }, { id: "walk-crossing", name: "\u041A\u043E\u043B\u043E\u0434\u0435\u0446 \u0443 \u043F\u0435\u0440\u0435\u043A\u0440\u0451\u0441\u0442\u043A\u0430", x: 43, y: 18 }, { id: "walk-ruins", name: "\u0421\u0442\u0430\u0440\u044B\u0435 \u043A\u0430\u043C\u043D\u0438", x: 77, y: 44 }],
      layoutKey: "region-walk:" + String(seed)
    };
  }
  return __toCommonJS(region_walk_exports);
})();
