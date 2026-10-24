var Combat = (() => {
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
  var __toCommonJS = (mod2) => __copyProps(__defProp({}, "__esModule", { value: true }), mod2);

  // src/combat/index.js
  var index_exports = {};
  __export(index_exports, {
    BEASTS: () => BEASTS,
    DIFFICULTY: () => DIFFICULTY,
    MONSTERS: () => MONSTERS,
    MULT: () => MULT,
    THEMES: () => THEMES,
    THRESH: () => THRESH,
    adjustedXp: () => adjustedXp,
    beastBoxes: () => beastBoxes,
    buildEncounter: () => buildEncounter,
    decide: () => decide,
    enemyDefinition: () => enemyDefinition,
    initializeEnemy: () => initializeEnemy,
    intentSummary: () => intentSummary,
    kindsList: () => kindsList,
    mod: () => mod,
    opportunityThreats: () => opportunityThreats,
    placeEncounter: () => placeEncounter,
    plannerActor: () => plannerActor,
    reach: () => reach,
    weaponFromAttack: () => weaponFromAttack
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

  // src/combat/bestiary.js
  var mod = (s) => Math.floor((s - 10) / 2);
  var A = (name, bonus, dice, type, o = {}) => ({ name, bonus, dice, type, reach: 1, ...o });
  var SK = { skin: "#ddd6c2", hair: "#ddd6c2", brow: null, eye: "#c0392f", cloth: "#4a4038", cloth2: null, leather: "#3a3028", trim: "#8a8d92", hairStyle: "bald", brows: "none", eyes: "big", mouth: "grin", ears: "small", beard: "none", marks: [], accessories: [] };
  var MONSTERS = {
    rat: { name: "\u0413\u0438\u0433\u0430\u043D\u0442\u0441\u043A\u0430\u044F \u043A\u0440\u044B\u0441\u0430", hp: 7, ac: 12, speed: 6, cr: 0.125, xp: 25, stats: { str: 7, dex: 15, con: 11, int: 2, wis: 10, cha: 4 }, attacks: [A("\u0423\u043A\u0443\u0441", 4, "1d4+2", "piercing")], ai: "swarm", beast: "rat" },
    skeleton: { name: "\u0421\u043A\u0435\u043B\u0435\u0442", hp: 13, ac: 13, speed: 6, cr: 0.25, xp: 50, stats: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 }, attacks: [A("\u0420\u0436\u0430\u0432\u044B\u0439 \u043C\u0435\u0447", 4, "1d6+2", "piercing")], vuln: ["bludgeoning"], immune: ["poison"], undead: true, ai: "melee", look: { classId: "fighter", gender: "male", hands: ["sword", "empty"], look: { ...SK, outfit: "leather" } } },
    skeleton_archer: { name: "\u0421\u043A\u0435\u043B\u0435\u0442-\u043B\u0443\u0447\u043D\u0438\u043A", hp: 13, ac: 13, speed: 6, cr: 0.25, xp: 50, stats: { str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5 }, attacks: [A("\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u043B\u0443\u043A", 4, "1d6+2", "piercing", { reach: 0, range: 8, ranged: true })], vuln: ["bludgeoning"], immune: ["poison"], undead: true, ai: "ranged", look: { classId: "rogue", gender: "male", hands: ["bow", "empty"], look: { ...SK, outfit: "leather", cloth: "#3a342c" } } },
    zombie: { name: "\u0417\u043E\u043C\u0431\u0438", hp: 22, ac: 8, speed: 4, cr: 0.25, xp: 50, stats: { str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5 }, attacks: [A("\u0423\u0434\u0430\u0440", 3, "1d6+1", "bludgeoning")], immune: ["poison"], undead: true, ai: "melee", traits: ["undeadFortitude"], look: { classId: "fighter", gender: "male", hands: ["empty", "empty"], look: { skin: "#8aa070", hair: "#3a3a30", eye: "#d8d880", cloth: "#5a5048", leather: "#4a3a2c", hairStyle: "short", brows: "sad", eyes: "sleepy", mouth: "open", ears: "round", beard: "stubble", marks: ["scar"], outfit: "tabard", accessories: [] } } },
    goblin: { name: "\u0413\u043E\u0431\u043B\u0438\u043D", hp: 7, ac: 15, speed: 6, cr: 0.25, xp: 50, stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 }, attacks: [A("\u042F\u0442\u0430\u0433\u0430\u043D", 4, "1d6+2", "slashing")], ai: "skirmish", traits: ["nimbleEscape"], look: { classId: "rogue", gender: "male", hands: ["sword", "empty"], look: { skin: "#7aa84a", hair: "#3a3020", eye: "#e8c830", cloth: "#6a4a30", leather: "#4a3a28", trim: "#a08a50", hairStyle: "bald", brows: "angry", eyes: "narrow", mouth: "grin", ears: "long", beard: "none", marks: [], outfit: "leather", accessories: [] } } },
    goblin_archer: { name: "\u0413\u043E\u0431\u043B\u0438\u043D-\u043B\u0443\u0447\u043D\u0438\u043A", hp: 7, ac: 13, speed: 6, cr: 0.25, xp: 50, stats: { str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8 }, attacks: [A("\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043B\u0443\u043A", 4, "1d6+2", "piercing", { reach: 0, range: 8, ranged: true })], ai: "ranged", look: { classId: "rogue", gender: "male", hands: ["bow", "empty"], look: { skin: "#86b050", hair: "#3a3020", eye: "#e8c830", cloth: "#5a6a3a", leather: "#4a3a28", trim: "#a08a50", hairStyle: "bald", brows: "angry", eyes: "narrow", mouth: "smirk", ears: "long", beard: "none", marks: [], outfit: "leather", headgear: "cap", accessories: [] } } },
    wolf: { name: "\u0412\u043E\u043B\u043A", hp: 11, ac: 13, speed: 8, cr: 0.25, xp: 50, stats: { str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6 }, attacks: [A("\u0423\u043A\u0443\u0441", 4, "2d4+2", "piercing", { onHit: { save: "str", dc: 11, cond: "prone" } })], ai: "hunter", traits: ["packTactics"], beast: "wolf" },
    bandit: { name: "\u0420\u0430\u0437\u0431\u043E\u0439\u043D\u0438\u043A", hp: 11, ac: 12, speed: 6, cr: 0.125, xp: 25, stats: { str: 11, dex: 12, con: 12, int: 10, wis: 10, cha: 10 }, attacks: [A("\u042F\u0442\u0430\u0433\u0430\u043D", 3, "1d6+1", "slashing"), A("\u0410\u0440\u0431\u0430\u043B\u0435\u0442", 3, "1d8+1", "piercing", { reach: 0, range: 8, ranged: true })], ai: "melee", look: { classId: "rogue", gender: "male", hands: ["sword", "empty"], look: { skin: "#e0b890", hair: "#3a2a20", cloth: "#4a4a52", leather: "#3a2c20", trim: "#7a7a82", hairStyle: "short", brows: "thick", eyes: "narrow", mouth: "neutral", beard: "stubble", marks: ["scar"], headgear: "hood", outfit: "leather", accessories: ["scarf"] } } },
    bandit_captain: { name: "\u0413\u043B\u0430\u0432\u0430\u0440\u044C \u0440\u0430\u0437\u0431\u043E\u0439\u043D\u0438\u043A\u043E\u0432", hp: 65, ac: 15, speed: 6, cr: 2, xp: 450, stats: { str: 15, dex: 16, con: 14, int: 14, wis: 11, cha: 14 }, attacks: [A("\u042F\u0442\u0430\u0433\u0430\u043D", 5, "1d6+3", "slashing"), A("\u042F\u0442\u0430\u0433\u0430\u043D", 5, "1d6+3", "slashing")], multiattack: 2, ai: "boss", boss: true, traits: ["parry"], look: { classId: "fighter", gender: "male", hands: ["sword", "shield"], look: { skin: "#d8a880", hair: "#2a2018", cloth: "#7a2a2a", leather: "#3a2c20", trim: "#d0a94a", hairStyle: "sweep", brows: "angry", eyes: "narrow", mouth: "smirk", beard: "full", marks: ["browscar"], headgear: "helm", cape: "short", capeColor: "#5a1c1c", outfit: "knight", accessories: [] } } },
    cultist: { name: "\u041A\u0443\u043B\u044C\u0442\u0438\u0441\u0442", hp: 9, ac: 12, speed: 6, cr: 0.125, xp: 25, stats: { str: 11, dex: 12, con: 10, int: 10, wis: 11, cha: 10 }, attacks: [A("\u0416\u0435\u0440\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u043A\u0438\u043D\u0436\u0430\u043B", 3, "1d4+1", "piercing")], ai: "melee", look: { classId: "cleric", gender: "female", hands: ["mace", "empty"], look: { skin: "#e8cbb0", hair: "#201820", eye: "#c060ff", cloth: "#3a2a4a", cloth2: "#2a1e38", trim: "#a040c0", gem: "#c060ff", hairStyle: "long", brows: "straight", eyes: "narrow", mouth: "smirk", headgear: "hood", marks: ["warpaint"], markColor: "#a040c0", outfit: "robe", accessories: ["amulet"] } } },
    spider: { name: "\u0413\u0438\u0433\u0430\u043D\u0442\u0441\u043A\u0438\u0439 \u043F\u0430\u0443\u043A", hp: 26, ac: 14, speed: 6, cr: 1, xp: 200, stats: { str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4 }, attacks: [A("\u042F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0443\u043A\u0443\u0441", 5, "1d8+3", "piercing", { onHit: { save: "con", dc: 11, extra: "2d8", extraType: "poison", half: true } }), A("\u041F\u0430\u0443\u0442\u0438\u043D\u0430", 5, "0d0", "none", { reach: 0, range: 6, ranged: true, web: true })], ai: "ambush", beast: "spider" },
    ghoul: { name: "\u0412\u0443\u0440\u0434\u0430\u043B\u0430\u043A", hp: 22, ac: 12, speed: 6, cr: 1, xp: 200, stats: { str: 13, dex: 15, con: 10, int: 7, wis: 10, cha: 6 }, attacks: [A("\u041A\u043E\u0433\u0442\u0438", 4, "2d4+2", "slashing", { onHit: { save: "con", dc: 10, cond: "stunned", turns: 1 } })], immune: ["poison"], undead: true, ai: "hunter", look: { classId: "rogue", gender: "male", hands: ["empty", "empty"], look: { skin: "#9aa090", hair: "#4a4a40", eye: "#e8e860", cloth: "#3a3a36", leather: "#2c2a28", hairStyle: "wavy", brows: "sad", eyes: "wide", mouth: "open", ears: "pointed", beard: "none", marks: [], outfit: "leather", accessories: [] } } },
    dark_mage: { name: "\u0422\u0451\u043C\u043D\u044B\u0439 \u043C\u0430\u0433", hp: 27, ac: 12, speed: 6, cr: 2, xp: 450, stats: { str: 9, dex: 14, con: 11, int: 17, wis: 12, cha: 11 }, attacks: [A("\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0441\u043D\u0430\u0440\u044F\u0434", 5, "1d10", "fire", { reach: 0, range: 10, ranged: true })], spells: [{ id: "burninghands", save: "dex", dc: 13, dice: "3d6", type: "fire", cone: 3, slots: 3 }], ai: "caster", traits: ["shield"], look: { classId: "wizard", gender: "male", hands: ["staff", "empty"], look: { skin: "#d8c0a8", hair: "#c8c8d0", eye: "#d060ff", cloth: "#2a1e3a", cloth2: "#1c1428", trim: "#c040a0", gem: "#d060ff", hairStyle: "long", brows: "angry", eyes: "narrow", mouth: "smirk", beard: "goatee", headgear: "wizhat", outfit: "robe", accessories: [] } } },
    ogre: { name: "\u041E\u0433\u0440", hp: 59, ac: 11, speed: 6, cr: 2, xp: 450, stats: { str: 19, dex: 8, con: 16, int: 5, wis: 7, cha: 7 }, attacks: [A("\u0414\u0443\u0431\u0438\u043D\u0430", 6, "2d8+4", "bludgeoning")], ai: "melee", scale: 1.4, look: { classId: "fighter", gender: "male", hands: ["mace", "empty"], look: { skin: "#b89a70", hair: "#3a2c20", eye: "#201810", cloth: "#6a4a30", leather: "#4a3a28", trim: "#8a7050", hairStyle: "mohawk", brows: "thick", eyes: "dot", mouth: "open", ears: "round", beard: "stubble", marks: ["scar"], outfit: "leather", accessories: [] } } },
    bone_knight: { name: "\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u0440\u044B\u0446\u0430\u0440\u044C", hp: 52, ac: 17, speed: 6, cr: 3, xp: 700, stats: { str: 17, dex: 11, con: 16, int: 8, wis: 10, cha: 8 }, attacks: [A("\u0414\u0432\u0443\u0440\u0443\u0447\u043D\u044B\u0439 \u043C\u0435\u0447", 6, "2d6+3", "slashing"), A("\u0414\u0432\u0443\u0440\u0443\u0447\u043D\u044B\u0439 \u043C\u0435\u0447", 6, "2d6+3", "slashing")], multiattack: 2, vuln: ["bludgeoning"], immune: ["poison"], undead: true, ai: "boss", boss: true, look: { classId: "fighter", gender: "male", hands: ["sword", "shield"], look: { ...SK, eye: "#40c0ff", cloth: "#2a2a3a", leather: "#2a2a2c", trim: "#8a8d92", headgear: "helm", cape: "long", capeColor: "#22223a", outfit: "knight" } } }
  };
  var kindsList = () => Object.keys(MONSTERS);
  var THRESH = { 1: [25, 50, 75, 100], 2: [50, 100, 150, 200], 3: [75, 150, 225, 400], 4: [125, 250, 375, 500], 5: [250, 500, 750, 1100] };
  var MULT = (n) => n <= 1 ? 1 : n === 2 ? 1.5 : n <= 6 ? 2 : n <= 10 ? 2.5 : 3;
  var DIFFICULTY = ["easy", "medium", "hard", "deadly"];
  var POOLS = {
    crypt: ["skeleton", "skeleton", "skeleton_archer", "zombie", "ghoul", "bone_knight"],
    cellar: ["rat", "rat", "rat", "spider", "cultist", "bandit"],
    town: ["bandit", "bandit", "cultist", "rat", "bandit_captain"],
    forest: ["wolf", "wolf", "goblin", "goblin", "goblin_archer", "bandit", "spider", "ogre", "bandit_captain"],
    fortress: ["skeleton", "bandit", "cultist", "dark_mage", "ogre", "bone_knight", "skeleton_archer"],
    cave: ["spider", "goblin", "goblin_archer", "rat", "ogre", "wolf"]
  };
  var THEMES = Object.keys(POOLS);
  var adjustedXp = (kinds) => kinds.reduce((s, k) => s + MONSTERS[k].xp, 0) * MULT(kinds.length);
  function buildEncounter({ theme = "forest", level = 1, size = 4, difficulty = "medium", seed = 1 } = {}) {
    const rng2 = new Rng("enc/" + seed), pool = POOLS[theme] || POOLS.forest, budget = (THRESH[Math.min(5, Math.max(1, level))][Math.max(0, DIFFICULTY.indexOf(difficulty))] || 100) * size;
    let best = null;
    for (let t = 0; t < 60; t++) {
      const kinds = [], max = rng2.int(1, 7);
      for (let i = 0; i < max; i++) {
        const k = rng2.pick(pool);
        if (adjustedXp([...kinds, k]) <= budget * 1.1) kinds.push(k);
      }
      if (!kinds.length) continue;
      const x = adjustedXp(kinds), score = Math.abs(budget - x) + (kinds.length === 1 ? budget * 0.05 : 0);
      if (!best || score < best.score) best = { kinds, score, xp: x };
    }
    return best ? { kinds: best.kinds.sort(), xp: Math.round(best.xp), budget } : { kinds: [pool[0]], xp: MONSTERS[pool[0]].xp, budget };
  }
  function placeEncounter(scene, kinds, partySpots, seed = 1) {
    const rng2 = new Rng("place/" + seed), W = scene.W, H = scene.H, key = (x, y) => x + "," + y;
    const blocked = new Set(scene.props.filter((p) => p.solid !== false && !["portal", "door", "npc"].includes(p.type)).map((p) => key(p.x, p.y)));
    const traps = new Set((scene.traps || []).map((t) => key(t.x, t.y))), free = (x, y) => x >= 0 && y >= 0 && x < W && y < H && scene.tiles[y][x] === "floor" && !blocked.has(key(x, y));
    const dist = /* @__PURE__ */ new Map(), q = [];
    for (const [x, y] of partySpots) if (free(x, y)) {
      dist.set(key(x, y), 0);
      q.push([x, y]);
    }
    while (q.length) {
      const [x, y] = q.shift(), d = dist.get(key(x, y));
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
        const nx = x + dx, ny = y + dy;
        if (free(nx, ny) && !dist.has(key(nx, ny))) {
          dist.set(key(nx, ny), d + 1);
          q.push([nx, ny]);
        }
      }
    }
    const maxD = Math.max(0, ...dist.values()), lo = Math.min(6, Math.max(2, Math.floor(maxD * 0.5))), hi = Math.min(14, Math.max(lo + 2, maxD));
    const cand = [...dist].filter(([k, d]) => d >= lo && d <= hi && !traps.has(k)).map(([k]) => k.split(",").map(Number));
    if (cand.length < kinds.length) return null;
    const centre = rng2.pick(cand), sorted = cand.map((c) => [Math.hypot(c[0] - centre[0], c[1] - centre[1]) + rng2.next() * 1.5, c]).sort((a, b) => a[0] - b[0]).slice(0, kinds.length);
    return kinds.map((kind, i) => ({ kind, x: sorted[i][1][0], y: sorted[i][1][1] }));
  }

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
  function texelPass(boxes, role = () => "other", size = TEXEL.size, { minDepth = TEXEL.minD } = {}) {
    const out = [], D2 = TEXEL.decalDepth;
    function emit(decal, parent) {
      const axis = decal[8] === "f" ? 2 : 1, axes = axis === 2 ? [0, 1] : [0, 2];
      const surface = decal[axis] - decal[axis + 3] / 2;
      let pieces = [decal];
      boxes.forEach((b, j) => {
        if (j === parent || b.length > 8) return;
        const near = b[axis] - b[axis + 3] / 2, far = b[axis] + b[axis + 3] / 2;
        if (near >= surface + D2 - 1e-8 || far < surface - 1e-8 || Math.abs(far - surface) < 1e-8 && j < parent) return;
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
      const cfg = ROLES[role(c)] || ROLES.other;
      const n = Math.max(1, Math.round(w / size)), m = Math.max(1, Math.round(h / size)), cw = w / n, ch = h / m;
      const zf = z + d / 2 + D2 / 2, key = z + d / 2 + 1e-4;
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
        emit([x - w / 2 + (col + cs / 2) * cw, y + h / 2 - (row + rs / 2) * ch, zf, cs * cw, rs * ch, D2, color, false, "f", key], i);
      }
      if (w >= 0.18 && d >= 0.15) {
        const nd = Math.max(1, Math.round(d / size)), cd = d / nd, top = /* @__PURE__ */ new Map();
        for (let k = 0; k < 2; k++) {
          let f = (R() < 0.5 ? -1 : 1) * cfg.amp * (0.6 + R() * 0.5);
          if (Math.abs(f) < 0.04) f = f < 0 ? -0.04 : 0.04;
          const col = Math.floor(R() * n), r = Math.floor(R() * nd);
          top.set(r * n + col, [x - w / 2 + (col + 0.5) * cw, y + h / 2 + D2 / 2, z - d / 2 + (r + 0.5) * cd, cw, D2, cd, tone(c, 1 + f), false, "t", key]);
        }
        for (const decal of top.values()) emit(decal, i);
      }
    });
    return out;
  }

  // src/combat/beasts.js
  var FUR = "hair";
  var M = {
    rat: (B) => {
      const f = 8022618;
      B(0, 0.12, 0, 0.22, 0.16, 0.42, f);
      B(0, 0.15, 0.26, 0.15, 0.13, 0.17, shade(f, 1.05));
      B(0, 0.12, 0.36, 0.06, 0.06, 0.06, 14721184);
      for (const s of [-1, 1]) {
        B(s * 0.07, 0.26, 0.24, 0.06, 0.08, 0.04, 15249584);
        B(s * 0.05, 0.17, 0.34, 0.03, 0.03, 0.02, 13639712, true);
        B(s * 0.09, 0.04, 0.12, 0.05, 0.08, 0.06, shade(f, 0.8));
        B(s * 0.09, 0.04, -0.14, 0.05, 0.08, 0.06, shade(f, 0.8));
      }
      B(0, 0.08, -0.34, 0.04, 0.04, 0.3, 14721184);
      B(0, 0.09, -0.58, 0.03, 0.03, 0.14, 13666440);
    },
    wolf: (B) => {
      const f = 6974066, d = shade(f, 0.72);
      B(0, 0.38, 0, 0.4, 0.34, 0.8, f);
      B(0, 0.34, 0.1, 0.42, 0.22, 0.5, shade(f, 1.12));
      B(0, 0.5, 0.52, 0.3, 0.3, 0.3, f);
      B(0, 0.43, 0.72, 0.17, 0.15, 0.2, d);
      B(0, 0.38, 0.82, 0.08, 0.05, 0.04, 1710618);
      for (const s of [-1, 1]) {
        B(s * 0.11, 0.72, 0.5, 0.08, 0.14, 0.06, d);
        B(s * 0.08, 0.53, 0.66, 0.05, 0.05, 0.03, 15777840, true);
        B(s * 0.14, 0.12, 0.28, 0.11, 0.26, 0.11, d);
        B(s * 0.14, 0.12, -0.26, 0.11, 0.26, 0.11, d);
        B(s * 0.04, 0.33, 0.8, 0.03, 0.06, 0.03, 15790320);
      }
      B(0, 0.56, -0.5, 0.11, 0.11, 0.34, f);
      B(0, 0.66, -0.74, 0.09, 0.09, 0.2, d);
      B(0, 0.5, 0.12, 0.2, 0.06, 0.5, shade(f, 1.2));
    },
    spider: (B) => {
      const k = 2761264, p = 4860506;
      B(0, 0.34, 0, 0.4, 0.3, 0.46, k);
      B(0, 0.34, 0.34, 0.28, 0.24, 0.22, shade(k, 1.3));
      B(0, 0.4, -0.4, 0.42, 0.38, 0.46, p);
      B(0, 0.52, -0.4, 0.12, 0.04, 0.26, 12593192);
      for (const [x, y] of [[-0.07, 0.4], [0.07, 0.4], [-0.04, 0.33], [0.04, 0.33]]) B(x, y, 0.46, 0.05, 0.05, 0.03, 14688288, true);
      for (const s of [-1, 1]) {
        B(s * 0.06, 0.24, 0.48, 0.04, 0.12, 0.04, 14209216);
        for (let i = 0; i < 4; i++) {
          const z = 0.26 - i * 0.2;
          B(s * 0.32, 0.46, z, 0.3, 0.05, 0.05, k);
          B(s * 0.5, 0.24, z + (i - 1.5) * 0.05, 0.05, 0.46, 0.05, shade(k, 1.2));
        }
      }
    }
  };
  var BEASTS = Object.keys(M);
  function beastBoxes(id) {
    const out = [];
    M[id]((x, y, z, w, h, d, c, e = false) => out.push([x, y, z, w, h, d, c, e]));
    return out.concat(texelPass(out, () => FUR));
  }

  // src/combat/ai.js
  var D = (world, a, b) => world.cardinal ? Math.abs(a.x - b.x) + Math.abs(a.y - b.y) : Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
  var K = (x, y) => x + "," + y;
  var STEPS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
  var has = (a, c) => (a.conds || []).includes(c);
  function reach(me, world, maxCost) {
    const occupied = new Map(world.actors.filter((a) => a.hp > 0 && a.id !== me.id).map((a) => [K(a.x, a.y), a]));
    const best = /* @__PURE__ */ new Map([[K(me.x, me.y), { cost: 0, from: null }]]), q = [[me.x, me.y]];
    while (q.length) {
      const [x, y] = q.shift(), c = best.get(K(x, y)).cost;
      if (c >= maxCost) continue;
      for (const [dx, dy] of world.cardinal ? STEPS.slice(0, 4) : STEPS) {
        const nx = x + dx, ny = y + dy, k = K(nx, ny);
        if (best.has(k) || !world.passable(nx, ny)) continue;
        if (dx && dy && (!world.passable(x + dx, y) || !world.passable(x, y + dy))) continue;
        const o = occupied.get(k);
        if (o && o.team !== me.team) continue;
        best.set(k, { cost: c + 1, from: K(x, y), ally: !!o });
        q.push([nx, ny]);
      }
    }
    return best;
  }
  var pathTo = (map, x, y) => {
    const out = [];
    let k = K(x, y);
    while (map.get(k) && map.get(k).from) {
      const [a, b] = k.split(",").map(Number);
      out.push([a, b]);
      k = map.get(k).from;
    }
    return out.reverse();
  };
  var canEnd = (map, me, world, x, y) => {
    const r = map.get(K(x, y));
    return r && !r.ally && !world.actors.some((a) => a.hp > 0 && a.id !== me.id && a.x === x && a.y === y);
  };
  var meleeAtk = (me) => me.attacks.find((a) => !a.ranged && !a.web) || me.attacks[0];
  var rangedAtk = (me) => me.attacks.find((a) => a.ranged && !a.web);
  var webAtk = (me) => me.attacks.find((a) => a.web);
  var sees = (world, a, b) => !world.los || world.los(a, b);
  function inReachOf(atk, tile, foe, world) {
    const d = D(world, tile, foe);
    return atk.ranged ? d <= atk.range && sees(world, tile, foe) : d <= (atk.reach || 1) && sees(world, tile, foe);
  }
  function attackTiles(me, map, atk, foe, world, speed) {
    const out = [];
    for (const [k, v] of map) {
      if (v.cost > speed) continue;
      const [x, y] = k.split(",").map(Number);
      if (!canEnd(map, me, world, x, y) && !(x === me.x && y === me.y)) continue;
      if (inReachOf(atk, { x, y }, foe, world)) out.push({ x, y, cost: v.cost });
    }
    return out.sort((a, b) => a.cost - b.cost);
  }
  function approach(me, world, foe, atk, speed, note) {
    const full = reach(me, world, world.searchRadius ?? 99), goals = [];
    const clip = (path2) => {
      const p = path2.slice(0, speed);
      while (p.length && !canEnd(full, me, world, ...p[p.length - 1])) p.pop();
      return p;
    };
    for (const [k, v] of full) {
      const [x, y] = k.split(",").map(Number);
      if (v.ally || !(x === me.x && y === me.y) && world.actors.some((a) => a.hp > 0 && a.id !== me.id && a.x === x && a.y === y)) continue;
      if (inReachOf(atk, { x, y }, foe, world)) goals.push({ x, y, cost: v.cost });
    }
    goals.sort((a, b) => a.cost - b.cost);
    const g = goals[0];
    if (!g) {
      const near = [...full].map(([k, v]) => {
        const [x, y] = k.split(",").map(Number);
        return { x, y, v, d: D(world, { x, y }, foe) };
      }).filter((t) => !t.v.ally && canEnd(full, me, world, t.x, t.y)).sort((a, b) => a.d - b.d || a.v.cost - b.v.cost)[0];
      if (!near || near.x === me.x && near.y === me.y) return { kind: "wait", path: [], target: foe.id, note: "\u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u043F\u043E\u0434\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F" };
      const path2 = clip(pathTo(full, near.x, near.y));
      return path2.length ? { kind: "move", path: path2, target: foe.id, note } : { kind: "wait", path: [], target: foe.id, note: "\u043F\u0443\u0442\u044C \u0437\u0430\u043D\u044F\u0442" };
    }
    const path = clip(pathTo(full, g.x, g.y));
    return path.length ? { kind: "move", path, target: foe.id, note } : { kind: "wait", path: [], target: foe.id, note: "\u043F\u0443\u0442\u044C \u0437\u0430\u043D\u044F\u0442" };
  }
  var alive = (world, me) => world.actors.filter((a) => a.team !== me.team && a.hp > 0 && !a.fled);
  var ally = (world, me) => world.actors.filter((a) => a.team === me.team && a.hp > 0 && a.id !== me.id);
  var hpFrac = (a) => a.hp / (a.max || a.hp || 1);
  function decide(me, world) {
    const foes = alive(world, me);
    if (!foes.length || has(me, "stunned") || has(me, "unconscious")) return { kind: "wait", path: [], target: null, note: "\u0436\u0434\u0451\u0442" };
    const speed = has(me, "restrained") ? 0 : me.move ?? me.speed ?? 6, map = reach(me, world, speed), near = foes.slice().sort((a, b) => D(world, me, a) - D(world, me, b))[0];
    const ai = me.ai || "melee", melee = meleeAtk(me), ranged = rangedAtk(me);
    if (hpFrac(me) < 0.25 && !me.boss && !me.fearless && ai !== "swarm" && !me.undead) {
      const here = D(world, me, near), spots = [...map].map(([k, v]) => {
        const [x, y] = k.split(",").map(Number);
        return { x, y, v, d: Math.min(...foes.map((f) => D(world, { x, y }, f))) };
      }).filter((t) => canEnd(map, me, world, t.x, t.y) && t.d >= here + 2).sort((a, b) => b.d - a.d || a.v.cost - b.v.cost);
      if (spots[0]) return { kind: "flee", path: pathTo(map, spots[0].x, spots[0].y), target: null, note: "\u0431\u0435\u0436\u0438\u0442, \u0440\u0430\u043D\u0435\u043D\u044B\u0439" };
    }
    const strike = (foe, atk, note, extra = {}) => {
      const tiles = attackTiles(me, map, atk, foe, world, speed), stay = tiles.find((t2) => t2.x === me.x && t2.y === me.y), t = stay || tiles[0];
      if (!t) return null;
      return { kind: me.multiattack ? "multiattack" : "attack", path: stay ? [] : pathTo(map, t.x, t.y), target: foe.id, targets: foes.filter((f) => inReachOf(atk, t, f, world)).map((f) => f.id), attack: me.attacks.indexOf(atk), note, ...extra };
    };
    if (ai === "ranged" || ai === "caster") {
      const atk = ranged || melee, spell = (me.spells || [])[0];
      if (ai === "caster" && spell && (me.slots?.[1] ?? spell.slots ?? 0) > 0) {
        const cluster = foes.filter((f) => D(world, me, f) <= (spell.cone || 3));
        if (cluster.length >= 2) return { kind: "spell", path: [], target: cluster[0].id, targets: cluster.map((f) => f.id), spell: spell.id, attack: -1, note: "\u043F\u043E\u0434\u0436\u0438\u0433\u0430\u0435\u0442 \u0432\u0441\u0435\u0445 \u0440\u044F\u0434\u043E\u043C" };
      }
      const adj = foes.filter((f) => D(world, me, f) <= 1);
      if (adj.length) {
        const opts = [...map].map(([k, v]) => {
          const [x, y] = k.split(",").map(Number);
          const inR = foes.filter((f) => inReachOf(atk, { x, y }, f, world));
          return { x, y, v, inR, d: Math.min(...foes.map((f) => D(world, { x, y }, f))) };
        }).filter((t) => canEnd(map, me, world, t.x, t.y) && t.inR.length && t.d >= 2).sort((a, b) => b.d - a.d || a.v.cost - b.v.cost);
        if (opts[0]) {
          const tgt = opts[0].inR.sort((a, b) => hpFrac(a) - hpFrac(b))[0];
          return { kind: "attack", path: pathTo(map, opts[0].x, opts[0].y), target: tgt.id, targets: [tgt.id], attack: me.attacks.indexOf(atk), retreat: true, note: "\u043E\u0442\u0445\u043E\u0434\u0438\u0442 \u0438 \u0441\u0442\u0440\u0435\u043B\u044F\u0435\u0442" };
        }
      }
      const inRange = foes.filter((f) => inReachOf(atk, me, f, world)).sort((a, b) => hpFrac(a) - hpFrac(b));
      if (inRange.length) return { kind: "attack", path: [], target: inRange[0].id, targets: inRange.map((f) => f.id), attack: me.attacks.indexOf(atk), note: "\u0446\u0435\u043B\u0438\u0442\u0441\u044F \u0432 \u0441\u0430\u043C\u043E\u0433\u043E \u0441\u043B\u0430\u0431\u043E\u0433\u043E" };
      return approach(me, world, near, atk, speed, "\u0432\u044B\u0445\u043E\u0434\u0438\u0442 \u043D\u0430 \u0434\u0438\u0441\u0442\u0430\u043D\u0446\u0438\u044E \u0432\u044B\u0441\u0442\u0440\u0435\u043B\u0430");
    }
    if (ai === "ambush") {
      const web = webAtk(me), free = foes.filter((f) => !has(f, "restrained") && D(world, me, f) > 1 && D(world, me, f) <= (web?.range || 6));
      if (web && free.length && !foes.some((f) => D(world, me, f) <= 1)) {
        const f = free.sort((a, b) => (a.classId === "wizard" || a.classId === "cleric" ? 0 : 1) - (b.classId === "wizard" || b.classId === "cleric" ? 0 : 1) || D(world, me, a) - D(world, me, b))[0];
        return { kind: "web", path: [], target: f.id, targets: [f.id], attack: me.attacks.indexOf(web), note: "\u043E\u043F\u0443\u0442\u044B\u0432\u0430\u0435\u0442 \u043F\u0430\u0443\u0442\u0438\u043D\u043E\u0439" };
      }
    }
    if (ai === "boss") {
      const prio = (f) => f.classId === "wizard" || f.classId === "cleric" ? 0 : 1;
      const cands2 = foes.map((f) => ({ f, t: attackTiles(me, map, melee, f, world, speed) })).filter((c) => c.t.length).sort((a, b) => prio(a.f) - prio(b.f) || hpFrac(a.f) - hpFrac(b.f) || a.t[0].cost - b.t[0].cost);
      if (cands2[0]) return strike(cands2[0].f, melee, prio(cands2[0].f) === 0 ? "\u0440\u0432\u0451\u0442\u0441\u044F \u043A \u0437\u0430\u043A\u043B\u0438\u043D\u0430\u0442\u0435\u043B\u044E" : "\u0434\u043E\u0431\u0438\u0432\u0430\u0435\u0442 \u0441\u043B\u0430\u0431\u0435\u0439\u0448\u0435\u0433\u043E");
      return approach(me, world, foes.slice().sort((a, b) => prio(a) - prio(b) || D(world, me, a) - D(world, me, b))[0], melee, speed, "\u043D\u0430\u0434\u0432\u0438\u0433\u0430\u0435\u0442\u0441\u044F");
    }
    if (ai === "hunter" || ai === "skirmish") {
      const cands2 = foes.map((f) => ({ f, t: attackTiles(me, map, melee, f, world, speed) })).filter((c) => c.t.length);
      if (cands2.length) {
        cands2.sort((a, b) => hpFrac(a.f) - hpFrac(b.f) || a.t[0].cost - b.t[0].cost);
        const { f, t } = cands2[0], mates = ally(world, me).filter((a) => D(world, a, f) <= 1), pack = me.traits?.includes("packTactics") ? t.map((x) => ({ ...x, score: x.cost - (mates.length ? 2 : 0) })).sort((a, b) => a.score - b.score) : t, tile = pack[0];
        let intent = { kind: "attack", path: tile.x === me.x && tile.y === me.y ? [] : pathTo(map, tile.x, tile.y), target: f.id, targets: [f.id], attack: me.attacks.indexOf(melee), note: me.traits?.includes("packTactics") ? "\u043D\u0430\u043F\u0430\u0434\u0430\u0435\u0442 \u043D\u0430 \u0441\u043B\u0430\u0431\u0435\u0439\u0448\u0435\u0433\u043E \u0432\u043C\u0435\u0441\u0442\u0435 \u0441\u043E \u0441\u0442\u0430\u0435\u0439" : "\u0431\u0440\u043E\u0441\u0430\u0435\u0442\u0441\u044F \u043D\u0430 \u0441\u043B\u0430\u0431\u0435\u0439\u0448\u0435\u0433\u043E" };
        if (ai === "skirmish") {
          const left = speed - tile.cost;
          const back = [...map].map(([k, v]) => {
            const [x, y] = k.split(",").map(Number);
            return { x, y, v, d: Math.min(...foes.map((g) => D(world, { x, y }, g))) };
          }).filter((s) => canEnd(map, me, world, s.x, s.y) && s.d >= 2 && s.v.cost - tile.cost <= left && s.v.cost > tile.cost).sort((a, b) => b.d - a.d)[0];
          if (back) {
            intent.retreat = true;
            intent.retreatTo = [back.x, back.y];
            intent.note = "\u0431\u044C\u0451\u0442 \u0438 \u043E\u0442\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442";
          }
        }
        return intent;
      }
      return approach(me, world, near, melee, speed, "\u043F\u043E\u0434\u043A\u0440\u0430\u0434\u044B\u0432\u0430\u0435\u0442\u0441\u044F");
    }
    const cands = foes.map((f) => ({ f, t: attackTiles(me, map, melee, f, world, speed) })).filter((c) => c.t.length).sort((a, b) => a.t[0].cost - b.t[0].cost || hpFrac(a.f) - hpFrac(b.f));
    if (cands.length) return strike(cands[0].f, melee, ai === "swarm" ? "\u043D\u0430\u0431\u0440\u0430\u0441\u044B\u0432\u0430\u0435\u0442\u0441\u044F" : "\u0438\u0434\u0451\u0442 \u0432 \u0431\u043E\u0439");
    return approach(me, world, near, melee, speed, "\u043F\u0440\u0438\u0431\u043B\u0438\u0436\u0430\u0435\u0442\u0441\u044F");
  }

  // src/combat/runtime.js
  function enemyDefinition(def) {
    const m = MONSTERS[def.monsterKind];
    return m ? { ...def, monsterKind: def.monsterKind, name: def.name || m.name, max: def.max ?? m.hp, ac: def.ac ?? m.ac } : def;
  }
  function initializeEnemy(actor, def) {
    const m = MONSTERS[def.monsterKind];
    if (!m) return actor;
    actor.monsterKind = def.monsterKind;
    actor.stats = { ...m.stats };
    actor.speed = m.speed;
    actor.move = m.speed;
    actor.attacks = m.attacks.filter((a) => !a.web).map((a) => ({ ...a }));
    actor.ai = m.ai === "caster" ? "ranged" : m.ai === "ambush" ? "melee" : m.ai;
    actor.undead = !!m.undead;
    actor.boss = !!m.boss;
    actor.multiattack = m.multiattack || 1;
    actor.className = m.name;
    return actor;
  }
  function plannerActor(actor, weapon) {
    const attacks = actor.attacks?.length ? actor.attacks : [{ name: weapon.name, bonus: weapon.attackBonus, dice: `${weapon.count || 1}d${weapon.die}`, reach: 1, range: weapon.range, ranged: weapon.range > 1 }];
    return { ...actor, team: actor.kind === 3 ? "enemy" : "party", conds: actor.conditions || [], attacks, fearless: !actor.monsterKind || actor.fearless };
  }
  function weaponFromAttack(attack) {
    const match = /^(\d+)d(\d+)([+-]\d+)?$/.exec(attack?.dice || "");
    if (!match || !Number(match[1]) || !Number(match[2])) return null;
    const names = { piercing: "\u041A\u043E\u043B\u044E\u0449\u0438\u0439", slashing: "\u0420\u0443\u0431\u044F\u0449\u0438\u0439", bludgeoning: "\u0414\u0440\u043E\u0431\u044F\u0449\u0438\u0439", fire: "\u041E\u0433\u043E\u043D\u044C", poison: "\u042F\u0434" };
    return { name: attack.name, range: attack.ranged ? attack.range : attack.reach || 1, count: Number(match[1]), die: Number(match[2]), damageBonus: Number(match[3] || 0), attackBonus: attack.bonus, type: names[attack.type] || attack.type || "\u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0439" };
  }
  function intentSummary(me, intent, actors) {
    if (!intent) return null;
    const target = actors.find((a) => a.id === intent.target);
    const ranged = me.attacks?.[intent.attack]?.ranged;
    let label = { wait: "\u0412\u044B\u0436\u0438\u0434\u0430\u0435\u0442", move: "\u0421\u0431\u043B\u0438\u0436\u0430\u0435\u0442\u0441\u044F", flee: "\u041E\u0442\u0441\u0442\u0443\u043F\u0430\u0435\u0442", web: "\u0413\u043E\u0442\u043E\u0432\u0438\u0442 \u043F\u0430\u0443\u0442\u0438\u043D\u0443", spell: "\u0413\u043E\u0442\u043E\u0432\u0438\u0442 \u0437\u0430\u043A\u043B\u0438\u043D\u0430\u043D\u0438\u0435" }[intent.kind];
    if (intent.kind === "attack" || intent.kind === "multiattack") {
      label = ranged ? intent.path?.length ? intent.retreat ? "\u041E\u0442\u043E\u0439\u0434\u0451\u0442 \u0438 \u0432\u044B\u0441\u0442\u0440\u0435\u043B\u0438\u0442" : "\u0417\u0430\u0439\u043C\u0451\u0442 \u043F\u043E\u0437\u0438\u0446\u0438\u044E \u0438 \u0432\u044B\u0441\u0442\u0440\u0435\u043B\u0438\u0442" : "\u0413\u043E\u0442\u043E\u0432\u0438\u0442 \u0432\u044B\u0441\u0442\u0440\u0435\u043B" : intent.path?.length ? "\u041F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u0438 \u0430\u0442\u0430\u043A\u0443\u0435\u0442" : "\u0413\u043E\u0442\u043E\u0432\u0438\u0442 \u0443\u0434\u0430\u0440";
      if (intent.kind === "multiattack") label += " \xB7 \u0430\u0442\u0430\u043A: " + (me.multiattack || 1);
    }
    return { kind: intent.kind, text: (label || "\u0412\u044B\u0436\u0438\u0434\u0430\u0435\u0442") + (target && intent.kind !== "wait" && intent.kind !== "flee" ? " \u2192 " + target.name : ""), hint: "\u041F\u043B\u0430\u043D \u043C\u043E\u0436\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0442\u0432\u043E\u0435\u0433\u043E \u0445\u043E\u0434\u0430." };
  }
  function opportunityThreats(actor, steps, foes, weapon, combat = true) {
    if (!combat || actor.disengaged || actor.dead || actor.hp <= 0) return [];
    const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
    const used = /* @__PURE__ */ new Set(), threats = [];
    let from = actor;
    for (const to of steps) {
      for (const foe of foes) {
        if (used.has(foe.id) || foe.dead || foe.hp <= 0 || foe.reactionUsed || weapon(foe).range !== 1) continue;
        if (distance(from, foe) === 1 && distance(to, foe) > 1) {
          used.add(foe.id);
          threats.push(foe);
        }
      }
      from = to;
    }
    return threats;
  }
  return __toCommonJS(index_exports);
})();
