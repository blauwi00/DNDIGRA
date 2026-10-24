var PrologueRules = (() => {
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

  // src/prologue-rules.js
  var prologue_rules_exports = {};
  __export(prologue_rules_exports, {
    VERSION: () => VERSION,
    advance: () => advance,
    consequence: () => consequence,
    initial: () => initial,
    objective: () => objective,
    scenes: () => scenes,
    valid: () => valid
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

  // src/prologue-rules.js
  var VERSION = 1;
  var PHASES = ["day1", "day2", "departure", "ride", "ambush", "crash", "aftermath", "done"];
  function initial() {
    return { v: VERSION, phase: "day1", greeted: false, supplies: false, delivered: false, preparation: null, prepared: false, tracks: false, recovered: false, ending: null };
  }
  function valid(s) {
    return !!s && s.v === VERSION && PHASES.includes(s.phase) && [null, "cargo", "medicine"].includes(s.preparation) && ["greeted", "supplies", "delivered", "prepared", "tracks", "recovered"].every((k) => typeof s[k] === "boolean") && [null, "helped", "left"].includes(s.ending);
  }
  function advance(s, event) {
    if (!valid(s)) throw Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0432\u0435\u0440\u0441\u0438\u044F \u0432\u0441\u0442\u0443\u043F\u043B\u0435\u043D\u0438\u044F.");
    const n = { ...s };
    if (s.phase === "day1") {
      if (event === "greet") n.greeted = true;
      if (event === "supplies") n.supplies = true;
      if (event === "deliver" && s.supplies) n.delivered = true;
      if (event === "sleep" && s.greeted && s.delivered) n.phase = "day2";
    } else if (s.phase === "day2") {
      if (["cargo", "medicine"].includes(event) && !s.preparation) n.preparation = event;
      if (event === "prepare" && s.preparation) n.prepared = true;
      if (event === "sleep" && s.prepared) n.phase = "departure";
    } else if (s.phase === "departure" && event === "depart") n.phase = "ride";
    else if (s.phase === "ride" && event === "arrive") n.phase = "ambush";
    else if (s.phase === "ambush" && event === "victory") n.phase = "crash";
    else if (s.phase === "crash" && event === "wake") n.phase = "aftermath";
    else if (s.phase === "aftermath") {
      if (event === "tracks") n.tracks = true;
      if (event === "recover" && s.tracks) n.recovered = true;
      if (event === "return" && s.recovered) {
        n.phase = "done";
        n.ending = "helped";
      }
      if (event === "leave") {
        n.phase = "done";
        n.ending = "left";
      }
    }
    return n;
  }
  function objective(s) {
    if (s.phase === "day1") return !s.greeted ? "\u041F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u0441 \u041E\u0440\u0435\u043D\u043E\u043C \u0443 \u0434\u043E\u043C\u0430" : !s.supplies ? "\u0417\u0430\u0431\u0440\u0430\u0442\u044C \u0434\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u0432\u0451\u0440\u0442\u043E\u043A \u0438\u0437 \u0441\u0443\u043D\u0434\u0443\u043A\u0430" : !s.delivered ? "\u041E\u0442\u043D\u0435\u0441\u0442\u0438 \u0441\u0432\u0451\u0440\u0442\u043E\u043A \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0435 \u0443 \u043A\u0430\u0440\u0435\u0442\u044B" : "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u0434\u043E\u043C\u043E\u0439 \u0438 \u043B\u0435\u0447\u044C \u0441\u043F\u0430\u0442\u044C";
    if (s.phase === "day2") return !s.preparation ? "\u041E\u0431\u0441\u0443\u0434\u0438\u0442\u044C \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0443 \u0441 \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u043E\u0439" : !s.prepared ? s.preparation === "cargo" ? "\u0412\u0437\u044F\u0442\u044C \u0432\u0435\u0440\u0451\u0432\u043A\u0443 \u0443 \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u043E\u0439" : "\u0412\u0437\u044F\u0442\u044C \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u043E\u0447\u043D\u044B\u0439 \u043D\u0430\u0431\u043E\u0440 \u0443 \u043B\u0435\u043A\u0430\u0440\u043A\u0438" : "\u041F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u043A\u0430 \u0437\u0430\u043A\u043E\u043D\u0447\u0435\u043D\u0430. \u041F\u0435\u0440\u0435\u043D\u043E\u0447\u0435\u0432\u0430\u0442\u044C \u0434\u043E\u043C\u0430";
    return { departure: "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C\u0441\u044F \u0441 \u0442\u043E\u0440\u0433\u043E\u0432\u043E\u0439 \u043A\u0430\u0440\u0435\u0442\u043E\u0439", ride: "\u041F\u043E \u0434\u043E\u0440\u043E\u0433\u0435 \u0438\u0437 \u0440\u043E\u0434\u043D\u043E\u0439 \u0434\u0435\u0440\u0435\u0432\u043D\u0438", ambush: "\u0417\u0430\u0449\u0438\u0442\u0438\u0442\u044C \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0443 \u043E\u0442 \u0432\u043E\u0440\u0430", crash: "\u0413\u0440\u043E\u0445\u043E\u0442 \u043A\u043E\u043B\u0451\u0441. \u0422\u0435\u043C\u043D\u043E\u0442\u0430\u2026", aftermath: s.recovered ? "\u0412\u0435\u0440\u043D\u0443\u0442\u044C \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0435 \u0434\u043E\u0440\u043E\u0436\u043D\u0443\u044E \u0441\u0443\u043C\u043A\u0443" : s.tracks ? "\u041F\u0440\u043E\u0432\u0435\u0440\u0438\u0442\u044C \u043A\u0443\u0441\u0442\u044B \u0443 \u0441\u0435\u0432\u0435\u0440\u043D\u043E\u0439 \u0442\u0440\u043E\u043F\u044B" : "\u041F\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u0442\u044C \u0441 \u0432\u044B\u0436\u0438\u0432\u0448\u0435\u0439 \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u043E\u0439", done: "\u041F\u0435\u0440\u0432\u0430\u044F \u0434\u043E\u0440\u043E\u0433\u0430 \u043F\u0440\u043E\u0439\u0434\u0435\u043D\u0430" }[s.phase];
  }
  function consequence(s) {
    return s.preparation === "cargo" ? "\u0412\u0435\u0440\u0451\u0432\u043A\u0438 \u0443\u0434\u0435\u0440\u0436\u0430\u043B\u0438 \u044F\u0449\u0438\u043A\u0438. \u0411\u043E\u043B\u044C\u0448\u0430\u044F \u0447\u0430\u0441\u0442\u044C \u0442\u043E\u0432\u0430\u0440\u0430 \u0443\u0446\u0435\u043B\u0435\u043B\u0430, \u043D\u043E \u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A\u0443 \u043F\u0440\u0438\u0448\u043B\u043E\u0441\u044C \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u044B\u0432\u0430\u0442\u044C \u0440\u0443\u043A\u0443 \u043F\u043E\u043B\u043E\u0441\u043E\u0439 \u043F\u043B\u0430\u0449\u0430." : "\u041F\u0435\u0440\u0435\u0432\u044F\u0437\u043E\u0447\u043D\u044B\u0439 \u043D\u0430\u0431\u043E\u0440 \u043F\u0440\u0438\u0433\u043E\u0434\u0438\u043B\u0441\u044F \u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A\u0443. \u041A\u0440\u043E\u0432\u043E\u0442\u0435\u0447\u0435\u043D\u0438\u0435 \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E; \u0447\u0430\u0441\u0442\u044C \u043F\u043B\u043E\u0445\u043E \u0437\u0430\u043A\u0440\u0435\u043F\u043B\u0451\u043D\u043D\u043E\u0433\u043E \u0442\u043E\u0432\u0430\u0440\u0430 \u0440\u0430\u0441\u0441\u044B\u043F\u0430\u043B\u0430\u0441\u044C \u043F\u043E \u043A\u0430\u043D\u0430\u0432\u0435.";
  }
  function base(id, name, W, H) {
    const tiles = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_2, x) => !x || !y || x === W - 1 || y === H - 1 ? "wall" : "floor"));
    const surface = tiles.map((row, y) => row.map((v, x) => v === "floor" ? SURFACES[varyFloor("grass", id, x, y)].code : " "));
    return { id, name, W, H, outdoor: true, tiles, surface, wallStyle: "timber", props: [], decor: [], lights: [], dummies: [], encounters: [], spawns: [[6, 11]], trainingSpawn: [[6, 11]], enemySpawn: [[7, 11]], layoutKey: id };
  }
  function prop(s, id, x, y, model, name, description, prologue) {
    s.props.push({ id, x, y, ...model === "chest" ? { kind: 17, type: "chest" } : { model: { crate: "cratestack", barrel: "barrelstack" }[model] || model, kind: 24, type: "furniture" }, name, description, prologue });
  }
  function npc(s, id, x, y, name, classId, gender, cloth) {
    s.props.push({ id, x, y, name, type: "npc", kind: 20, prologue: true, npc: { classId, gender, look: { cloth, hair: "#67452e" }, hands: ["empty", "empty"] } });
  }
  function room(s, x, y, w, h, door) {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) {
      s.tiles[yy][xx] = xx === x || xx === x + w - 1 || yy === y || yy === y + h - 1 ? "wall" : "floor";
      s.surface[yy][xx] = "p";
    }
    s.tiles[door[1]][door[0]] = "floor";
  }
  function finish(s) {
    s.surface = s.surface.map((row) => row.join(""));
    return s;
  }
  function scenes(st = initial()) {
    const village = base("prologue-village", "\u0420\u043E\u0434\u043D\u0430\u044F \u0434\u0435\u0440\u0435\u0432\u043D\u044F \xB7 " + (st.phase === "day1" ? "\u043F\u0435\u0440\u0432\u044B\u0439 \u0434\u0435\u043D\u044C" : st.phase === "day2" ? "\u0432\u0442\u043E\u0440\u043E\u0439 \u0434\u0435\u043D\u044C" : "\u0443\u0442\u0440\u043E \u043E\u0442\u044A\u0435\u0437\u0434\u0430"), 28, 24);
    for (let y = 1; y < 23; y++) for (let x = 1; x < 27; x++) if (y >= 13 && y <= 15 || x >= 13 && x <= 15) village.surface[y][x] = "d";
    room(village, 2, 3, 9, 8, [6, 10]);
    room(village, 18, 3, 8, 7, [21, 9]);
    prop(village, "home-bed", 8, 5, "bed", "\u0422\u0432\u043E\u044F \u043A\u0440\u043E\u0432\u0430\u0442\u044C", "\u0417\u043D\u0430\u043A\u043E\u043C\u044B\u0439 \u0441\u043A\u0440\u0438\u043F \u0434\u043E\u0441\u043E\u043A. \u0417\u0434\u0435\u0441\u044C \u043C\u043E\u0436\u043D\u043E \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u0442\u044C \u0434\u0435\u043D\u044C.", true);
    prop(village, "home-supplies", 4, 5, "chest", "\u0414\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A", "\u0421\u0432\u0451\u0440\u0442\u043E\u043A \u0441 \u0445\u043B\u0435\u0431\u043E\u043C \u0438 \u0447\u0438\u0441\u0442\u043E\u0439 \u0440\u0443\u0431\u0430\u0445\u043E\u0439 \u043F\u0440\u0438\u0433\u043E\u0442\u043E\u0432\u043B\u0435\u043D \u043A \u0434\u043E\u0440\u043E\u0433\u0435.", true);
    prop(village, "home-table", 5, 7, "table", "\u0414\u043E\u043C\u0430\u0448\u043D\u0438\u0439 \u0441\u0442\u043E\u043B", "\u041D\u0430 \u0434\u0435\u0440\u0435\u0432\u0435 \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0437\u0430\u0440\u0443\u0431\u043A\u0438, \u0441\u0434\u0435\u043B\u0430\u043D\u043D\u044B\u0435 \u0442\u043E\u0431\u043E\u0439 \u0432 \u0434\u0435\u0442\u0441\u0442\u0432\u0435.");
    npc(village, "prologue-oren", 6, 12, "\u041E\u0440\u0435\u043D \xB7 \u0441\u043E\u0441\u0435\u0434", "fighter", "male", "#695744");
    npc(village, "prologue-lisa", 18, 16, "\u041B\u0438\u0441\u0430 \xB7 \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0430", "rogue", "female", "#87583b");
    npc(village, "prologue-teya", 22, 6, "\u0422\u0435\u044F \xB7 \u043B\u0435\u043A\u0430\u0440\u043A\u0430", "cleric", "female", "#697c58");
    npc(village, "prologue-guard", 23, 19, "\u0414\u0430\u0440\u0435\u043D \xB7 \u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A", "fighter", "male", "#52677b");
    prop(village, "carriage", 21, 16, "cart", "\u0422\u043E\u0440\u0433\u043E\u0432\u0430\u044F \u043A\u0430\u0440\u0435\u0442\u0430", "\u041E\u0442\u044A\u0435\u0437\u0434 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D \u043D\u0430 \u0442\u0440\u0435\u0442\u044C\u0435 \u0443\u0442\u0440\u043E. \u0422\u043E\u0440\u0433\u043E\u0432\u0446\u0430\u043C \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u043E\u0445\u0440\u0430\u043D\u044B.", true);
    prop(village, "rope", 19, 6, "crate", "\u0412\u0435\u0440\u0451\u0432\u043A\u0430 \u0443 \u043C\u0430\u0441\u0442\u0435\u0440\u0441\u043A\u043E\u0439", "\u041F\u0440\u043E\u0447\u043D\u0430\u044F \u0432\u0435\u0440\u0451\u0432\u043A\u0430 \u0434\u043B\u044F \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F \u0433\u0440\u0443\u0437\u0430.", true);
    prop(village, "well", 14, 9, "well", "\u0414\u0435\u0440\u0435\u0432\u0435\u043D\u0441\u043A\u0438\u0439 \u043A\u043E\u043B\u043E\u0434\u0435\u0446", "\u0423 \u043A\u043E\u043B\u043E\u0434\u0446\u0430 \u043F\u0440\u043E\u0445\u043B\u0430\u0434\u043D\u043E \u0434\u0430\u0436\u0435 \u0432 \u043F\u043E\u043B\u0434\u0435\u043D\u044C.");
    prop(village, "gate-sign", 14, 21, "signpost", "\u0414\u043E\u0440\u043E\u0433\u0430 \u0438\u0437 \u0434\u0435\u0440\u0435\u0432\u043D\u0438", "\u0422\u044B \u0434\u043E\u0433\u043E\u0432\u043E\u0440\u0438\u043B\u0441\u044F \u0432\u044B\u0439\u0442\u0438 \u0432\u043C\u0435\u0441\u0442\u0435 \u0441 \u0442\u043E\u0440\u0433\u043E\u0432\u0446\u0430\u043C\u0438 \u043D\u0430 \u0442\u0440\u0435\u0442\u044C\u0435 \u0443\u0442\u0440\u043E.", true);
    for (const [x, y] of [[3, 17], [7, 20], [10, 17], [24, 12], [4, 1], [16, 2], [25, 21]]) prop(village, "tree-" + x + "-" + y, x, y, "tree", "\u0421\u0442\u0430\u0440\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E", "\u0422\u044B \u0437\u043D\u0430\u0435\u0448\u044C \u044D\u0442\u0438 \u0434\u0435\u0440\u0435\u0432\u044C\u044F \u0441 \u0434\u0435\u0442\u0441\u0442\u0432\u0430.");
    prop(village, "yard-crate", 20, 18, "crate", "\u042F\u0449\u0438\u043A \u0441 \u043F\u043E\u0441\u0443\u0434\u043E\u0439", "\u041F\u043E\u0441\u0443\u0434\u0430 \u043F\u0435\u0440\u0435\u043B\u043E\u0436\u0435\u043D\u0430 \u0441\u043E\u043B\u043E\u043C\u043E\u0439.");
    prop(village, "yard-barrel", 18, 19, "barrel", "\u0411\u043E\u0447\u043A\u0430", "\u0422\u043E\u0440\u0433\u043E\u0432\u0446\u044B \u043F\u0440\u043E\u0432\u0435\u0440\u0438\u043B\u0438 \u043E\u0431\u0440\u0443\u0447\u0438 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0435\u0437\u0434\u043A\u043E\u0439.");
    const road = base("prologue-road", "\u041B\u0435\u0441\u043D\u0430\u044F \u0434\u043E\u0440\u043E\u0433\u0430 \xB7 \u043C\u0435\u0441\u0442\u043E \u043D\u0430\u043F\u0430\u0434\u0435\u043D\u0438\u044F", 32, 23);
    road.wallStyle = "cave";
    road.spawns = [[10, 12]];
    road.trainingSpawn = [[10, 12]];
    road.enemySpawn = [[11, 12]];
    for (let y = 1; y < 22; y++) for (let x = 1; x < 31; x++) if (y >= 10 && y <= 12 || x >= 23 && x <= 24 && y >= 4 && y <= 12) road.surface[y][x] = "d";
    const crashed = ["crash", "aftermath", "done"].includes(st.phase);
    prop(road, "carriage", 13, 10, "cart", "\u041F\u043E\u0432\u0440\u0435\u0436\u0434\u0451\u043D\u043D\u0430\u044F \u043A\u0430\u0440\u0435\u0442\u0430", "\u041E\u0431\u043E\u0434 \u0440\u0430\u0441\u043A\u043E\u043B\u043E\u0442, \u043A\u043E\u043B\u0435\u0441\u043E \u0443\u0448\u043B\u043E \u0432 \u043A\u0430\u043D\u0430\u0432\u0443.", true);
    if (!crashed) road.props.at(-1).name = "\u0422\u043E\u0440\u0433\u043E\u0432\u0430\u044F \u043A\u0430\u0440\u0435\u0442\u0430";
    else road.props.at(-1).wrecked = true;
    npc(road, "prologue-lisa", 15, 9, "\u041B\u0438\u0441\u0430 \xB7 \u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0430", "rogue", "female", "#87583b");
    npc(road, "prologue-guard", 12, 14, "\u0414\u0430\u0440\u0435\u043D \xB7 \u0440\u0430\u043D\u0435\u043D\u044B\u0439 \u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A", "fighter", "male", "#52677b");
    prop(road, "spilled-crate", 15, 12, "crate", "\u0420\u0430\u0441\u0441\u044B\u043F\u0430\u0432\u0448\u0438\u0439\u0441\u044F \u0433\u0440\u0443\u0437", "\u0421\u0440\u0435\u0434\u0438 \u0434\u043E\u0441\u043E\u043A \u043E\u0441\u0442\u0430\u043B\u0430\u0441\u044C \u043E\u0431\u043E\u0440\u0432\u0430\u043D\u043D\u0430\u044F \u0437\u0430\u0432\u044F\u0437\u043A\u0430.", true);
    prop(road, "trail", 21, 10, "bones", "\u0421\u043B\u0435\u0434\u044B \u043D\u0430 \u043E\u0431\u043E\u0447\u0438\u043D\u0435", "\u0421\u043B\u0435\u0434\u044B \u0441\u0430\u043F\u043E\u0433 \u0443\u0445\u043E\u0434\u044F\u0442 \u043D\u0430 \u0441\u0435\u0432\u0435\u0440, \u043A \u043A\u0443\u0441\u0442\u0430\u043C.", true);
    prop(road, "stolen-bag", 24, 5, "chest", "\u0411\u0440\u043E\u0448\u0435\u043D\u043D\u0430\u044F \u0434\u043E\u0440\u043E\u0436\u043D\u0430\u044F \u0441\u0443\u043C\u043A\u0430", "\u0412\u043E\u0440\u044B \u0431\u0440\u043E\u0441\u0438\u043B\u0438 \u0442\u044F\u0436\u0451\u043B\u0443\u044E \u0441\u0443\u043C\u043A\u0443 \u0443 \u0437\u0430\u0440\u043E\u0441\u043B\u0435\u0439.", true);
    for (const [x, y] of [[3, 4], [7, 6], [12, 3], [17, 5], [27, 4], [28, 8], [4, 16], [8, 19], [18, 17], [24, 18], [28, 14], [20, 7]]) prop(road, "tree-" + x + "-" + y, x, y, "tree", "\u041F\u0440\u0438\u0434\u043E\u0440\u043E\u0436\u043D\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E", "\u041D\u0430 \u0432\u0435\u0442\u043A\u0430\u0445 \u0434\u0440\u043E\u0436\u0430\u0442 \u043B\u0438\u0441\u0442\u044C\u044F.");
    if (crashed) {
      prop(road, "broken-board", 14, 11, "bench", "\u0421\u043B\u043E\u043C\u0430\u043D\u043D\u0430\u044F \u0441\u043A\u0430\u043C\u044C\u044F", "\u0414\u043E\u0441\u043A\u0438 \u0432\u044B\u0440\u0432\u0430\u043B\u043E \u043F\u0440\u0438 \u043F\u0430\u0434\u0435\u043D\u0438\u0438 \u043A\u0430\u0440\u0435\u0442\u044B.");
      prop(road, "loose-barrel", 16, 14, "barrel", "\u041E\u0442\u043A\u0430\u0442\u0438\u0432\u0448\u0430\u044F\u0441\u044F \u0431\u043E\u0447\u043A\u0430", "\u0411\u043E\u0447\u043A\u0430 \u0443\u0446\u0435\u043B\u0435\u043B\u0430 \u0432 \u043C\u044F\u0433\u043A\u043E\u0439 \u0442\u0440\u0430\u0432\u0435.");
    }
    road.encounters = [{ id: "prologue-thief", name: "\u041D\u0430\u043F\u0430\u0434\u0435\u043D\u0438\u0435 \u043D\u0430 \u043A\u0430\u0440\u0435\u0442\u0443", reward: { xp: 0, gold: 0 }, enemies: [{ id: "road-thief", name: "\u0414\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0432\u043E\u0440", visual: "bandit", kind: 3, x: 11, y: 12, max: 7, ac: 10 }] }];
    return { [village.id]: finish(village), [road.id]: finish(road) };
  }
  return __toCommonJS(prologue_rules_exports);
})();
