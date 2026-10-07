var WorldGen = (() => {
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
      for (let key10 of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key10) && key10 !== except)
          __defProp(to, key10, { get: () => from[key10], enumerable: !(desc = __getOwnPropDesc(from, key10)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/worldgen/index.js
  var index_exports = {};
  __export(index_exports, {
    CATALOG: () => CATALOG,
    GEN_VERSION: () => GEN_VERSION3,
    Runtime: () => runtime_exports,
    SIZES: () => SIZES11,
    SUPPORTED_VERSIONS: () => SUPPORTED_VERSIONS,
    SURFACES: () => SURFACES,
    SURFACE_BY_CODE: () => SURFACE_BY_CODE,
    TOWN_SIZES: () => TOWN_SIZES3,
    WALL_STYLES: () => WALL_STYLES,
    createWorld: () => createWorld3,
    exits: () => exits3,
    generateScene: () => generateScene3,
    gmBrief: () => gmBrief2,
    isGeneratedId: () => isGeneratedId3,
    lootSentence: () => lootSentence,
    lootText: () => lootText2,
    normalizeGen: () => normalizeGen3,
    npcBrief: () => npcBrief2,
    plural: () => plural,
    randomSeed: () => randomSeed3,
    rollLoot: () => rollLoot2,
    sceneIds: () => sceneIds3,
    surfaceColor: () => surfaceColor,
    validateScene: () => validateScene3,
    wallColor: () => wallColor
  });

  // src/worldgen-v1/world.js
  var world_exports = {};
  __export(world_exports, {
    GEN_VERSION: () => GEN_VERSION,
    SIZES: () => SIZES5,
    TOWN_SIZES: () => TOWN_SIZES,
    createWorld: () => createWorld,
    exits: () => exits,
    generateScene: () => generateScene,
    isGeneratedId: () => isGeneratedId,
    normalizeGen: () => normalizeGen,
    randomSeed: () => randomSeed,
    sceneIds: () => sceneIds,
    validateScene: () => validateScene
  });

  // src/worldgen-v1/rng.js
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
  function randomSeed() {
    const abc = "abcdefghjkmnpqrstuvwxyz23456789";
    let s = "";
    for (let i = 0; i < 10; i++) s += abc[Math.floor(Math.random() * abc.length)];
    return s;
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

  // src/worldgen-v1/content.js
  var G = (m, f, n, p) => ({ m, f, n, p });
  var ADJ = [G("\u0422\u0438\u0445\u0438\u0439", "\u0422\u0438\u0445\u0430\u044F", "\u0422\u0438\u0445\u043E\u0435", "\u0422\u0438\u0445\u0438\u0435"), G("\u0421\u0442\u0430\u0440\u044B\u0439", "\u0421\u0442\u0430\u0440\u0430\u044F", "\u0421\u0442\u0430\u0440\u043E\u0435", "\u0421\u0442\u0430\u0440\u044B\u0435"), G("\u0412\u043E\u0440\u043E\u043D\u0438\u0439", "\u0412\u043E\u0440\u043E\u044C\u044F", "\u0412\u043E\u0440\u043E\u043D\u044C\u0451", "\u0412\u043E\u0440\u043E\u043D\u044C\u0438"), G("\u0421\u0435\u0440\u044B\u0439", "\u0421\u0435\u0440\u0430\u044F", "\u0421\u0435\u0440\u043E\u0435", "\u0421\u0435\u0440\u044B\u0435"), G("\u0417\u0435\u043B\u0451\u043D\u044B\u0439", "\u0417\u0435\u043B\u0451\u043D\u0430\u044F", "\u0417\u0435\u043B\u0451\u043D\u043E\u0435", "\u0417\u0435\u043B\u0451\u043D\u044B\u0435"), G("\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439", "\u041A\u0430\u043C\u0435\u043D\u043D\u0430\u044F", "\u041A\u0430\u043C\u0435\u043D\u043D\u043E\u0435", "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0435"), G("\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0439", "\u0425\u043E\u043B\u043E\u0434\u043D\u0430\u044F", "\u0425\u043E\u043B\u043E\u0434\u043D\u043E\u0435", "\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0435"), G("\u0417\u043E\u043B\u043E\u0442\u043E\u0439", "\u0417\u043E\u043B\u043E\u0442\u0430\u044F", "\u0417\u043E\u043B\u043E\u0442\u043E\u0435", "\u0417\u043E\u043B\u043E\u0442\u044B\u0435"), G("\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0439", "\u0416\u0435\u043B\u0435\u0437\u043D\u0430\u044F", "\u0416\u0435\u043B\u0435\u0437\u043D\u043E\u0435", "\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0435"), G("\u041C\u0448\u0438\u0441\u0442\u044B\u0439", "\u041C\u0448\u0438\u0441\u0442\u0430\u044F", "\u041C\u0448\u0438\u0441\u0442\u043E\u0435", "\u041C\u0448\u0438\u0441\u0442\u044B\u0435"), G("\u0422\u0443\u043C\u0430\u043D\u043D\u044B\u0439", "\u0422\u0443\u043C\u0430\u043D\u043D\u0430\u044F", "\u0422\u0443\u043C\u0430\u043D\u043D\u043E\u0435", "\u0422\u0443\u043C\u0430\u043D\u043D\u044B\u0435"), G("\u0422\u0451\u043C\u043D\u044B\u0439", "\u0422\u0451\u043C\u043D\u0430\u044F", "\u0422\u0451\u043C\u043D\u043E\u0435", "\u0422\u0451\u043C\u043D\u044B\u0435"), G("\u0421\u0432\u0435\u0442\u043B\u044B\u0439", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F", "\u0421\u0432\u0435\u0442\u043B\u043E\u0435", "\u0421\u0432\u0435\u0442\u043B\u044B\u0435"), G("\u0411\u0443\u0440\u044B\u0439", "\u0411\u0443\u0440\u0430\u044F", "\u0411\u0443\u0440\u043E\u0435", "\u0411\u0443\u0440\u044B\u0435")];
  var PLACES = [["m", "\u0411\u0440\u043E\u0434"], ["m", "\u041B\u043E\u0433"], ["m", "\u042F\u0440"], ["m", "\u041C\u043E\u0441\u0442"], ["m", "\u0425\u043E\u043B\u043C"], ["p", "\u041A\u043B\u044E\u0447\u0438"], ["f", "\u0417\u0430\u0432\u043E\u0434\u044C"], ["f", "\u041F\u0430\u0434\u044C"], ["f", "\u0413\u0430\u0442\u044C"], ["f", "\u0420\u043E\u0449\u0430"], ["f", "\u041C\u0435\u043B\u044C\u043D\u0438\u0446\u0430"], ["f", "\u041F\u0440\u0438\u0441\u0442\u0430\u043D\u044C"], ["f", "\u0417\u0430\u0441\u0442\u0430\u0432\u0430"], ["f", "\u041F\u043E\u043B\u044F\u043D\u0430"], ["f", "\u0420\u0430\u0437\u0432\u0438\u043B\u043A\u0430"], ["m", "\u0418\u0441\u0442\u043E\u043A"], ["m", "\u041F\u0435\u0440\u0435\u043A\u0440\u0451\u0441\u0442\u043E\u043A"], ["m", "\u0423\u0442\u0451\u0441"], ["n", "\u0423\u0440\u043E\u0447\u0438\u0449\u0435"], ["n", "\u041F\u043E\u0434\u0432\u043E\u0440\u044C\u0435"]];
  var TAV_M = ["\u041A\u043E\u0442\u0451\u043B", "\u0413\u0440\u0438\u0444\u043E\u043D", "\u041A\u0430\u0431\u0430\u043D", "\u0412\u043E\u0440\u043E\u043D", "\u0414\u0440\u0430\u043A\u043E\u043D", "\u0411\u043E\u0447\u043E\u043D\u043E\u043A", "\u042F\u043A\u043E\u0440\u044C", "\u041C\u0435\u0434\u0432\u0435\u0434\u044C", "\u041E\u043B\u0435\u043D\u044C"];
  var TAV_F = ["\u041B\u0438\u0441\u0438\u0446\u0430", "\u041F\u043E\u0434\u043A\u043E\u0432\u0430", "\u041B\u044E\u0442\u043D\u044F", "\u0421\u043E\u0432\u0430", "\u041A\u0440\u0443\u0436\u043A\u0430", "\u0421\u0432\u0435\u0447\u0430", "\u0420\u044B\u0431\u0430", "\u041A\u043E\u0440\u043E\u043D\u0430"];
  var TAV_AM = ["\u0420\u0436\u0430\u0432\u044B\u0439", "\u041F\u044C\u044F\u043D\u044B\u0439", "\u0425\u0440\u043E\u043C\u043E\u0439", "\u0417\u043E\u043B\u043E\u0442\u043E\u0439", "\u0422\u0438\u0445\u0438\u0439", "\u0412\u0435\u0441\u0451\u043B\u044B\u0439", "\u041E\u0434\u043D\u043E\u0433\u043B\u0430\u0437\u044B\u0439", "\u0421\u043E\u043D\u043D\u044B\u0439", "\u0413\u043E\u0440\u0434\u044B\u0439"];
  var TAV_AF = ["\u0420\u0436\u0430\u0432\u0430\u044F", "\u041F\u044C\u044F\u043D\u0430\u044F", "\u0425\u0440\u043E\u043C\u0430\u044F", "\u0417\u043E\u043B\u043E\u0442\u0430\u044F", "\u0422\u0438\u0445\u0430\u044F", "\u0412\u0435\u0441\u0451\u043B\u0430\u044F", "\u041E\u0434\u043D\u043E\u0433\u043B\u0430\u0437\u0430\u044F", "\u0421\u043E\u043D\u043D\u0430\u044F", "\u041A\u0440\u0438\u0432\u0430\u044F"];
  var MALE = [["\u0411\u043E\u0440\u0433", "\u0411\u043E\u0440\u0433\u0430"], ["\u042D\u043B\u044C\u0434\u0430\u0440", "\u042D\u043B\u044C\u0434\u0430\u0440\u0430"], ["\u0422\u043E\u043C\u0430\u0441", "\u0422\u043E\u043C\u0430\u0441\u0430"], ["\u0413\u0430\u0440\u0440\u0438\u043A", "\u0413\u0430\u0440\u0440\u0438\u043A\u0430"], ["\u041E\u043B\u0430\u0444", "\u041E\u043B\u0430\u0444\u0430"], ["\u0412\u0430\u043B\u044C\u0434\u0435\u0440", "\u0412\u0430\u043B\u044C\u0434\u0435\u0440\u0430"], ["\u041A\u043E\u0440\u0432\u0438\u043D", "\u041A\u043E\u0440\u0432\u0438\u043D\u0430"], ["\u0419\u043E\u0440\u0433\u0435\u043D", "\u0419\u043E\u0440\u0433\u0435\u043D\u0430"], ["\u041C\u0438\u0440\u043E\u043D", "\u041C\u0438\u0440\u043E\u043D\u0430"], ["\u041B\u0443\u043A\u0430\u0441", "\u041B\u0443\u043A\u0430\u0441\u0430"], ["\u0414\u0430\u0440\u0435\u043D", "\u0414\u0430\u0440\u0435\u043D\u0430"], ["\u0424\u0430\u0440\u0438\u043A", "\u0424\u0430\u0440\u0438\u043A\u0430"], ["\u0425\u044C\u044E\u0433\u043E", "\u0425\u044C\u044E\u0433\u043E"], ["\u0411\u0440\u0430\u043D", "\u0411\u0440\u0430\u043D\u0430"]];
  var FEMALE = [["\u041C\u0438\u0440\u043D\u0430", "\u041C\u0438\u0440\u043D\u044B"], ["\u0414\u0430\u043B\u0438\u044F", "\u0414\u0430\u043B\u0438\u0438"], ["\u0420\u0430\u0434\u0430", "\u0420\u0430\u0434\u044B"], ["\u041E\u043B\u044C\u0433\u0430", "\u041E\u043B\u044C\u0433\u0438"], ["\u0422\u0438\u043B\u044C\u0434\u0430", "\u0422\u0438\u043B\u044C\u0434\u044B"], ["\u0411\u0440\u0438\u043D\u0430", "\u0411\u0440\u0438\u043D\u044B"], ["\u041B\u0438\u0434\u0438\u044F", "\u041B\u0438\u0434\u0438\u0438"], ["\u042F\u0441\u043D\u0430", "\u042F\u0441\u043D\u044B"], ["\u0425\u0435\u043B\u044C\u0433\u0430", "\u0425\u0435\u043B\u044C\u0433\u0438"], ["\u041D\u0435\u044F", "\u041D\u0435\u0438"], ["\u0418\u0432\u0435\u0442\u0430", "\u0418\u0432\u0435\u0442\u044B"], ["\u0421\u0430\u043D\u0430", "\u0421\u0430\u043D\u044B"]];
  var EPITHET = ["\u0420\u044B\u0436\u0438\u0439", "\u0425\u0440\u043E\u043C\u043E\u0439", "\u0421\u0435\u0434\u043E\u0439", "\u0412\u0435\u0441\u0451\u043B\u044B\u0439", "\u041C\u043E\u043B\u0447\u0430\u043B\u0438\u0432\u044B\u0439", "\u0421\u0442\u0430\u0440\u044B\u0439", "\u041C\u0435\u0442\u043A\u0438\u0439", "\u041A\u0440\u0435\u043F\u043A\u0438\u0439"];
  var EPITHET_F = ["\u0420\u044B\u0436\u0430\u044F", "\u0425\u0440\u043E\u043C\u0430\u044F", "\u0421\u0435\u0434\u0430\u044F", "\u0412\u0435\u0441\u0451\u043B\u0430\u044F", "\u041C\u043E\u043B\u0447\u0430\u043B\u0438\u0432\u0430\u044F", "\u0421\u0442\u0430\u0440\u0430\u044F", "\u041C\u0435\u0442\u043A\u0430\u044F", "\u041A\u0440\u0435\u043F\u043A\u0430\u044F"];
  var FIRST = [G("\u0412\u0435\u0440\u0445\u043D\u0438\u0439", "\u0412\u0435\u0440\u0445\u043D\u044F\u044F", "\u0412\u0435\u0440\u0445\u043D\u0435\u0435", "\u0412\u0435\u0440\u0445\u043D\u0438\u0435"), G("\u041D\u0438\u0436\u043D\u0438\u0439", "\u041D\u0438\u0436\u043D\u044F\u044F", "\u041D\u0438\u0436\u043D\u0435\u0435", "\u041D\u0438\u0436\u043D\u0438\u0435"), G("\u041D\u043E\u0432\u044B\u0439", "\u041D\u043E\u0432\u0430\u044F", "\u041D\u043E\u0432\u043E\u0435", "\u041D\u043E\u0432\u044B\u0435"), G("\u041C\u0430\u043B\u044B\u0439", "\u041C\u0430\u043B\u0430\u044F", "\u041C\u0430\u043B\u043E\u0435", "\u041C\u0430\u043B\u044B\u0435"), G("\u0414\u0430\u043B\u044C\u043D\u0438\u0439", "\u0414\u0430\u043B\u044C\u043D\u044F\u044F", "\u0414\u0430\u043B\u044C\u043D\u0435\u0435", "\u0414\u0430\u043B\u044C\u043D\u0438\u0435")];
  var SUFFIX = ["\u0443 \u0440\u0435\u043A\u0438", "\u043D\u0430 \u0445\u043E\u043B\u043C\u0430\u0445", "\u0443 \u0442\u0440\u0430\u043A\u0442\u0430", "\u0432 \u0434\u043E\u043B\u0438\u043D\u0435", "\u0443 \u0441\u0442\u0430\u0440\u043E\u0433\u043E \u043C\u043E\u0441\u0442\u0430", "\u043D\u0430 \u043E\u0442\u0448\u0438\u0431\u0435"];
  function settlementName(rng) {
    const [g, n] = rng.pick(PLACES), r = rng.next();
    if (r < 0.45) return `${rng.pick(ADJ)[g]} ${n}`;
    if (r < 0.7) {
      const who = rng.pick(rng.chance(0.5) ? MALE : FEMALE);
      return `${n} ${who[1]}`;
    }
    if (r < 0.85) return `${rng.pick(FIRST)[g]} ${n}`;
    return `${rng.pick(ADJ)[g]} ${n} ${rng.pick(SUFFIX)}`;
  }
  function tavernName(rng) {
    return rng.chance(0.5) ? `${rng.pick(TAV_AM)} ${rng.pick(TAV_M)}` : `${rng.pick(TAV_AF)} ${rng.pick(TAV_F)}`;
  }
  function person(rng, gender = rng.pick(["male", "female"])) {
    const [nom, gen] = rng.pick(gender === "female" ? FEMALE : MALE), epi = rng.chance(0.55) ? " " + rng.pick(gender === "female" ? EPITHET_F : EPITHET) : "";
    return { gender, first: nom, genitive: gen, full: nom + epi };
  }
  var BUILDING_TYPES = {
    house: { label: "\u0414\u043E\u043C", role: ["\u0436\u0438\u0442\u0435\u043B\u044C", "\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430"], cls: "fighter" },
    cottage: { label: "\u0425\u0438\u0436\u0438\u043D\u0430", role: ["\u0434\u0440\u043E\u0432\u043E\u0441\u0435\u043A", "\u0442\u0440\u0430\u0432\u043D\u0438\u0446\u0430"], cls: "rogue" },
    tavern: { label: "\u0422\u0430\u0432\u0435\u0440\u043D\u0430", role: ["\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A", "\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u0446\u0430"], cls: "rogue" },
    smithy: { label: "\u041A\u0443\u0437\u043D\u0438\u0446\u0430", role: ["\u043A\u0443\u0437\u043D\u0435\u0446", "\u043A\u0443\u0437\u043D\u0435\u0446"], cls: "fighter" },
    alchemist: { label: "\u041B\u0430\u0432\u043A\u0430 \u0437\u0435\u043B\u0438\u0439", role: ["\u0430\u043B\u0445\u0438\u043C\u0438\u043A", "\u0430\u043B\u0445\u0438\u043C\u0438\u043A"], cls: "wizard" },
    shop: { label: "\u041B\u0430\u0432\u043A\u0430", role: ["\u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446", "\u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0430"], cls: "rogue" },
    chapel: { label: "\u0427\u0430\u0441\u043E\u0432\u043D\u044F", role: ["\u0436\u0440\u0435\u0446", "\u0436\u0440\u0438\u0446\u0430"], cls: "cleric" },
    keep: { label: "\u0414\u043E\u043D\u0436\u043E\u043D", role: ["\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u043D\u0442", "\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u043D\u0442\u0448\u0430"], cls: "fighter" },
    lordhall: { label: "\u041F\u043E\u043A\u043E\u0438", role: ["\u043A\u0430\u043C\u0435\u0440\u0433\u0435\u0440", "\u043A\u0430\u043C\u0435\u0440\u0433\u0435\u0440"], cls: "wizard" },
    guard: { label: "\u041A\u0430\u0440\u0430\u0443\u043B\u043A\u0430", role: ["\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A", "\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430"], cls: "fighter" },
    warehouse: { label: "\u0421\u043A\u043B\u0430\u0434", role: ["\u043A\u043B\u0430\u0434\u043E\u0432\u0449\u0438\u043A", "\u043A\u043B\u0430\u0434\u043E\u0432\u0449\u0438\u0446\u0430"], cls: "fighter" },
    library: { label: "\u041A\u043D\u0438\u0436\u043D\u0430\u044F \u043B\u0430\u0432\u043A\u0430", role: ["\u043F\u0438\u0441\u0430\u0440\u044C", "\u043F\u0438\u0441\u0430\u0440\u044C"], cls: "wizard" }
  };
  function buildingName(rng, type, owner) {
    const t = BUILDING_TYPES[type];
    switch (type) {
      case "tavern":
        return `\u0422\u0430\u0432\u0435\u0440\u043D\u0430 \xAB${tavernName(rng)}\xBB`;
      case "smithy":
        return `\u041A\u0443\u0437\u043D\u0438\u0446\u0430 ${owner.genitive}`;
      case "alchemist":
        return `\u0417\u0435\u043B\u044C\u044F ${owner.genitive}`;
      case "shop":
        return `\u041B\u0430\u0432\u043A\u0430 ${owner.genitive}`;
      case "library":
        return `\u041A\u043D\u0438\u0433\u0438 ${owner.genitive}`;
      case "chapel":
        return rng.pick(["\u0427\u0430\u0441\u043E\u0432\u043D\u044F \u0442\u0438\u0445\u0438\u0445 \u0441\u0432\u0435\u0447\u0435\u0439", "\u0427\u0430\u0441\u043E\u0432\u043D\u044F \u0443 \u0434\u043E\u0440\u043E\u0433\u0438", "\u0421\u0442\u0430\u0440\u0430\u044F \u0447\u0430\u0441\u043E\u0432\u043D\u044F", "\u0427\u0430\u0441\u043E\u0432\u043D\u044F \u0441\u0442\u0440\u0430\u043D\u043D\u0438\u043A\u043E\u0432", "\u0427\u0430\u0441\u043E\u0432\u043D\u044F \u0441\u0435\u043C\u0438 \u043E\u0433\u043D\u0435\u0439"]);
      case "guard":
        return rng.pick(["\u041A\u0430\u0440\u0430\u0443\u043B\u043A\u0430 \u0443 \u0432\u043E\u0440\u043E\u0442", "\u0414\u043E\u0437\u043E\u0440\u043D\u0430\u044F", "\u0421\u0442\u043E\u0440\u043E\u0436\u043A\u0430 \u0441\u0442\u0440\u0430\u0436\u0438"]);
      case "warehouse":
        return rng.pick(["\u0421\u043A\u043B\u0430\u0434 \u043A\u0443\u043F\u0446\u043E\u0432", "\u041E\u0431\u0449\u0438\u043D\u043D\u044B\u0439 \u0441\u043A\u043B\u0430\u0434", "\u0421\u0442\u0430\u0440\u044B\u0439 \u0430\u043C\u0431\u0430\u0440", "\u041F\u043E\u0440\u0442\u043E\u0432\u044B\u0439 \u0441\u043A\u043B\u0430\u0434"]);
      case "cottage":
        return `\u0425\u0438\u0436\u0438\u043D\u0430 ${owner.genitive}`;
      default:
        return `\u0414\u043E\u043C ${owner.genitive}`;
    }
  }
  var GREET = {
    tavern: ["\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C! \u041F\u0440\u0438\u0441\u0430\u0436\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C, \u0443 \u043D\u0430\u0441 \u0442\u0435\u043F\u043B\u043E \u0438 \u043D\u0435\u0434\u043E\u0440\u043E\u0433\u043E.", "\u0417\u0430\u0445\u043E\u0434\u0438\u0442\u0435, \u043F\u0443\u0442\u043D\u0438\u043A\u0438. \u041E\u0433\u043E\u043D\u044C \u0432 \u043E\u0447\u0430\u0433\u0435 \u043D\u0435 \u0433\u0430\u0441\u043D\u0435\u0442 \u0441 \u0441\u0430\u043C\u043E\u0433\u043E \u0443\u0442\u0440\u0430.", "\u0427\u0435\u0433\u043E \u0436\u0435\u043B\u0430\u0435\u0442\u0435? \u042D\u043B\u044C, \u043F\u043E\u0445\u043B\u0451\u0431\u043A\u0430, \u043C\u0435\u0441\u0442\u043E \u0443 \u043E\u0433\u043D\u044F?"],
    smithy: ["\u041E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u0435\u0435 \u0441 \u0443\u0433\u043B\u044F\u043C\u0438. \u0415\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u0441\u043B\u043E\u043C\u0430\u043B\u043E\u0441\u044C \u2014 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u043E\u0432.", "\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043C\u0435\u0442\u0430\u043B\u043B \u043B\u044E\u0431\u0438\u0442 \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u0435. \u0427\u0442\u043E \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E?"],
    alchemist: ["\u041D\u0435 \u0442\u0440\u043E\u0433\u0430\u0439\u0442\u0435 \u0441\u043A\u043B\u044F\u043D\u043A\u0438 \u0431\u0435\u0437 \u0441\u043F\u0440\u043E\u0441\u0430, \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0438\u0437 \u043D\u0438\u0445 \u043A\u0443\u0441\u0430\u0435\u0442\u0441\u044F.", "\u0422\u0440\u0430\u0432\u044B, \u043D\u0430\u0441\u0442\u043E\u0439\u043A\u0438, \u043F\u043E\u0440\u043E\u0448\u043A\u0438... \u0421\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0438\u0445\u043E."],
    shop: ["\u0417\u0430\u0445\u043E\u0434\u0438\u0442\u0435, \u0433\u043B\u044F\u0434\u0438\u0442\u0435. \u0426\u0435\u043D\u044B \u0447\u0435\u0441\u0442\u043D\u044B\u0435, \u0442\u043E\u0432\u0430\u0440 \u043B\u0435\u0436\u0438\u0442 \u043D\u0430 \u0432\u0438\u0434\u0443.", "\u0412\u0441\u0451, \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0432 \u0434\u043E\u0440\u043E\u0433\u0435, \u043D\u0430\u0439\u0434\u0451\u0442\u0441\u044F \u043D\u0430 \u044D\u0442\u0438\u0445 \u043F\u043E\u043B\u043A\u0430\u0445."],
    chapel: ["\u041C\u0438\u0440 \u0432\u0430\u043C. \u0421\u0432\u0435\u0447\u0438 \u0437\u0434\u0435\u0441\u044C \u0433\u043E\u0440\u044F\u0442 \u0434\u043B\u044F \u0432\u0441\u0435\u0445, \u043A\u0442\u043E \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0441 \u043C\u0438\u0440\u043E\u043C.", "\u0422\u0438\u0445\u043E \u0443 \u043D\u0430\u0441, \u043D\u043E \u0434\u0432\u0435\u0440\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u044B."],
    guard: ["\u0421\u0442\u043E\u044F\u0442\u044C. \u0410\u0445, \u044D\u0442\u043E \u0432\u044B. \u041F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0431\u0435\u0437 \u0448\u0443\u043C\u0430.", "\u0421\u043B\u0443\u0436\u0431\u0443 \u043D\u0435\u0441\u0451\u043C \u043A\u0440\u0443\u0433\u043B\u044B\u0435 \u0441\u0443\u0442\u043A\u0438. \u0427\u0442\u043E-\u0442\u043E \u0441\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C?"],
    warehouse: ["\u0421\u043A\u043B\u0430\u0434 \u0437\u0430\u043A\u0440\u044B\u0442 \u0434\u043B\u044F \u043F\u043E\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445. \u0412\u043F\u0440\u043E\u0447\u0435\u043C, \u0440\u0430\u0437 \u0443\u0436 \u0432\u044B \u0437\u0434\u0435\u0441\u044C...", "\u0422\u0443\u0442 \u0432\u0441\u0451 \u043F\u0440\u043E\u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043E, \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0442\u0440\u043E\u0433\u0430\u0439\u0442\u0435."],
    library: ["\u0422\u0438\u0448\u0435. \u0411\u0443\u043C\u0430\u0433\u0430 \u043D\u0435 \u043B\u044E\u0431\u0438\u0442 \u0441\u043F\u0435\u0448\u043A\u0438.", "\u0425\u043E\u0442\u0438\u0442\u0435 \u0447\u0442\u043E-\u0442\u043E \u043F\u0440\u043E\u0447\u0435\u0441\u0442\u044C \u0438\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C?"],
    house: ["\u0414\u043E\u0431\u0440\u044B\u0439 \u0434\u0435\u043D\u044C. \u041D\u0435 \u0447\u0430\u0441\u0442\u043E \u043A \u043D\u0430\u043C \u0437\u0430\u0445\u043E\u0434\u044F\u0442 \u0433\u043E\u0441\u0442\u0438.", "\u041F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u043E\u0433\u0438 \u0432\u044B\u0442\u0440\u0438\u0442\u0435.", "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435. \u0427\u0442\u043E \u043F\u0440\u0438\u0432\u0435\u043B\u043E \u0432\u0430\u0441 \u0432 \u043D\u0430\u0448 \u0434\u043E\u043C?"],
    cottage: ["\u041B\u0435\u0441 \u0440\u044F\u0434\u043E\u043C, \u0432\u043E\u0442 \u0438 \u0436\u0438\u0432\u0451\u043C \u0442\u0438\u0445\u043E. \u0427\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?", "\u041D\u0435 \u0436\u0434\u0430\u043B\u0438 \u0433\u043E\u0441\u0442\u0435\u0439, \u043D\u043E \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u0435."],
    street: ["\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, \u043F\u0443\u0442\u043D\u0438\u043A\u0438.", "\u0414\u0430\u043B\u0435\u043A\u043E \u043B\u0438 \u043F\u0443\u0442\u044C \u0434\u0435\u0440\u0436\u0438\u0442\u0435?", "\u0414\u043E\u0431\u0440\u043E\u0433\u043E \u0434\u043D\u044F. \u041D\u043E\u0432\u044B\u0435 \u043B\u0438\u0446\u0430 \u0443 \u043D\u0430\u0441 \u0432 \u0434\u0438\u043A\u043E\u0432\u0438\u043D\u043A\u0443.", "\u0410, \u0447\u0443\u0436\u0430\u043A\u0438. \u041D\u0438\u0447\u0435\u0433\u043E, \u0443 \u043D\u0430\u0441 \u0442\u0443\u0442 \u043C\u0438\u0440\u043D\u043E... \u043F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435\u0433\u0434\u0430."],
    outskirts: ["\u0422\u0441\u0441. \u0413\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \u0442\u0438\u0448\u0435, \u0437\u0434\u0435\u0441\u044C \u043D\u0435\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E.", "\u041E\u0433\u043E\u043D\u044C \u0443 \u043C\u0435\u043D\u044F \u043E\u0431\u0449\u0438\u0439, \u0441\u0430\u0434\u0438\u0442\u0435\u0441\u044C."],
    keep: ["\u0421\u0442\u043E\u0439. \u041D\u0430\u0437\u043E\u0432\u0438 \u0441\u0435\u0431\u044F \u0438 \u0446\u0435\u043B\u044C \u043F\u0440\u0438\u0445\u043E\u0434\u0430.", "\u0417\u0434\u0435\u0441\u044C \u043D\u0443\u0436\u0435\u043D \u043F\u043E\u0440\u044F\u0434\u043E\u043A. \u0411\u0435\u0437 \u0433\u043B\u0443\u043F\u043E\u0441\u0442\u0435\u0439."],
    lordhall: ["\u041F\u043E\u043A\u043E\u0438 \u043B\u043E\u0440\u0434\u0430. \u0412\u0430\u043C \u0437\u0434\u0435\u0441\u044C \u043D\u0435 \u043C\u0435\u0441\u0442\u043E, \u043D\u043E \u0440\u0430\u0437 \u0432\u044B \u0434\u043E\u0448\u043B\u0438..."],
    fortress: ["\u0421\u0442\u043E\u0439. \u041D\u0430\u0437\u043E\u0432\u0438 \u0441\u0435\u0431\u044F \u0438 \u0446\u0435\u043B\u044C \u043F\u0440\u0438\u0445\u043E\u0434\u0430.", "\u0417\u0434\u0435\u0441\u044C \u043D\u0443\u0436\u0435\u043D \u043F\u043E\u0440\u044F\u0434\u043E\u043A. \u0411\u0435\u0437 \u0433\u043B\u0443\u043F\u043E\u0441\u0442\u0435\u0439."],
    dungeon: ["\u041D\u0435 \u043E\u0436\u0438\u0434\u0430\u043B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0436\u0438\u0432\u044B\u0445 \u0442\u0430\u043A \u0433\u043B\u0443\u0431\u043E\u043A\u043E.", "\u041B\u0443\u0447\u0448\u0435 \u0431\u044B \u0432\u0430\u043C \u0431\u044B\u043B\u043E \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u043D\u0430\u0432\u0435\u0440\u0445\u0443."]
  };
  var BYE = ["\u0423\u0434\u0430\u0447\u0438 \u0432\u0430\u043C.", "\u0411\u0435\u0440\u0435\u0433\u0438\u0442\u0435 \u0441\u0435\u0431\u044F.", "\u0417\u0430\u0445\u043E\u0434\u0438\u0442\u0435 \u0435\u0449\u0451.", "\u0414\u043E\u0431\u0440\u043E\u0439 \u0434\u043E\u0440\u043E\u0433\u0438.", "\u0415\u0441\u043B\u0438 \u0447\u0442\u043E \u2014 \u044F \u0437\u0434\u0435\u0441\u044C."];
  function rumorLines(rng, facts) {
    const out = [];
    for (const f of rng.shuffle(facts).slice(0, 3)) {
      switch (f.kind) {
        case "cache":
          out.push(`\u0413\u043E\u0432\u043E\u0440\u044F\u0442, \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435 \xAB${f.place}\xBB \u043A\u0442\u043E-\u0442\u043E \u043F\u0440\u0438\u043F\u0440\u044F\u0442\u0430\u043B \u0441\u0443\u043D\u0434\u0443\u043A. \u0422\u043E\u043B\u044C\u043A\u043E \u0432\u043E\u0442 \u043F\u0440\u043E\u0441\u0442\u043E \u0442\u0430\u043A \u0435\u0433\u043E \u043D\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u044C.`);
          break;
        case "trap":
          out.push(`\u041E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u0435\u0435 \u0432 ${f.where}: \u0442\u0430\u043C \u043F\u043E\u043B \u0441 \u043F\u043E\u0434\u0432\u043E\u0445\u043E\u043C. \u041E\u0434\u0438\u043D \u0431\u0440\u043E\u0434\u044F\u0433\u0430 \u043E\u0442\u0442\u0443\u0434\u0430 \u0445\u0440\u043E\u043C\u0430\u0435\u0442 \u0434\u043E \u0441\u0438\u0445 \u043F\u043E\u0440.`);
          break;
        case "lock":
          out.push(`${f.where} \u0437\u0430\u043F\u0435\u0440\u0442\u043E \u043D\u0430 \u0445\u043E\u0440\u043E\u0448\u0438\u0439 \u0437\u0430\u043C\u043E\u043A. \u041A\u043B\u044E\u0447, \u0433\u043E\u0432\u043E\u0440\u044F\u0442, \u043B\u0435\u0436\u0438\u0442 \u0433\u0434\u0435-\u0442\u043E \u0432 ${f.keyWhere}.`);
          break;
        case "dungeon":
          out.push(`\u0417\u0430 \u043E\u043A\u043E\u043B\u0438\u0446\u0435\u0439 \u0435\u0441\u0442\u044C ${f.place}. \u041E\u0442\u0442\u0443\u0434\u0430 \u043F\u043E \u043D\u043E\u0447\u0430\u043C \u0434\u043E\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u0433\u0443\u043B, \u0438 \u043C\u0435\u0441\u0442\u043D\u044B\u0435 \u0442\u0443\u0434\u0430 \u043D\u0435 \u0445\u043E\u0434\u044F\u0442.`);
          break;
        case "fortress":
          out.push(`${f.place} \u043D\u0430 \u0445\u043E\u043B\u043C\u0435 \u0434\u0430\u0432\u043D\u043E \u043D\u0435 \u0437\u043D\u0430\u043B\u043E \u0445\u043E\u0437\u044F\u0438\u043D\u0430. \u0421\u0442\u0440\u0430\u0436\u0430 \u0442\u0430\u043C, \u0432\u043F\u0440\u043E\u0447\u0435\u043C, \u0435\u0441\u0442\u044C, \u0438 \u043E\u0447\u0435\u043D\u044C \u0437\u043B\u0430\u044F.`);
          break;
        case "tavern":
          out.push(`\u041B\u0443\u0447\u0448\u0438\u0439 \u044D\u043B\u044C \u0432 \u043E\u043A\u0440\u0443\u0433\u0435 \u043D\u0430\u043B\u0438\u0432\u0430\u044E\u0442 \u0432 \xAB${f.place}\xBB. \u0421\u043F\u0440\u043E\u0441\u0438\u0442\u0435 \u0445\u043E\u0437\u044F\u0438\u043D\u0430 \u043F\u0440\u043E \u0441\u0442\u0430\u0440\u044B\u0435 \u0431\u043E\u0447\u043A\u0438 \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435.`);
          break;
        case "sewer":
          out.push(`\u041F\u043E\u0434 ${f.where} \u043F\u0440\u043E\u0445\u043E\u0434\u044F\u0442 \u0441\u0442\u0430\u0440\u044B\u0435 \u0445\u043E\u0434\u044B. \u0413\u043E\u0432\u043E\u0440\u044F\u0442, \u043E\u043D\u0438 \u0442\u044F\u043D\u0443\u0442\u0441\u044F \u0434\u043E \u0441\u0430\u043C\u043E\u0433\u043E ${f.to}.`);
          break;
        default:
      }
    }
    return out;
  }
  function dialogueFor(rng, building, owner, facts, extraTopic) {
    const kind = GREET[building] ? building : "house", lines = [rng.pick(GREET[kind])];
    const rumors = rumorLines(rng, facts);
    lines.push(...rumors);
    if (!rumors.length) lines.push(rng.pick(["\u041D\u043E\u0432\u043E\u0441\u0442\u0435\u0439 \u043C\u0430\u043B\u043E. \u0423\u0440\u043E\u0436\u0430\u0439, \u043F\u043E\u0433\u043E\u0434\u0430 \u0434\u0430 \u0434\u043E\u0440\u043E\u0433\u0430, \u0432\u0441\u0451 \u043A\u0430\u043A \u043E\u0431\u044B\u0447\u043D\u043E.", "\u0416\u0438\u0432\u0451\u043C \u043A\u0430\u043A \u0436\u0438\u0432\u0451\u043C. \u0421\u043A\u043E\u0440\u043E, \u0433\u043E\u0432\u043E\u0440\u044F\u0442, \u0431\u0443\u0434\u0443\u0442 \u0445\u043E\u043B\u043E\u0434\u0430."]));
    if (extraTopic) lines.push(extraTopic);
    lines.push(rng.pick(BYE));
    return lines;
  }
  var KEY_NAMES = ["\u041C\u0435\u0434\u043D\u044B\u0439", "\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0439", "\u0411\u0440\u043E\u043D\u0437\u043E\u0432\u044B\u0439", "\u0427\u0451\u0440\u043D\u044B\u0439", "\u0420\u0436\u0430\u0432\u044B\u0439", "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439", "\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439", "\u0412\u0438\u0442\u043E\u0439"];
  var THEME = {
    kitchen: { gold: [0, 6], gear: [["\u0420\u0430\u0446\u0438\u043E\u043D", 6], ["\u0424\u043B\u044F\u0433\u0430 \u0441 \u0433\u0440\u0430\u0432\u0438\u0440\u043E\u0432\u043A\u043E\u0439", 1], ["\u041C\u0435\u043B", 1]] },
    bedroom: { gold: [3, 16], gear: [["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 2], ["\u041C\u0435\u0434\u0430\u043B\u044C\u043E\u043D \u0441 \u043B\u043E\u043A\u043E\u043D\u043E\u043C", 1], ["\u041F\u0438\u0441\u044C\u043C\u043E \u0431\u0435\u0437 \u0430\u0434\u0440\u0435\u0441\u0430", 2], ["\u0418\u0433\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0441\u0442\u0438", 1]] },
    tavern: { gold: [4, 20], gear: [["\u0420\u0430\u0446\u0438\u043E\u043D", 3], ["\u0418\u0433\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0441\u0442\u0438", 2], ["\u0424\u043B\u044F\u0433\u0430 \u0441 \u0433\u0440\u0430\u0432\u0438\u0440\u043E\u0432\u043A\u043E\u0439", 2]] },
    smith: { gold: [5, 24], gear: [["\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043C\u0435\u0447", 2], ["\u0411\u0443\u043B\u0430\u0432\u0430", 1], ["\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0449\u0438\u0442", 1], ["\u041A\u043E\u043B\u044C\u0447\u0443\u0436\u043D\u0430\u044F \u0440\u0443\u0431\u0430\u0445\u0430", 1]] },
    alchemy: { gold: [4, 18], gear: [["\u0411\u0438\u043D\u0442\u044B", 4], ["\u042F\u043D\u0442\u0430\u0440\u043D\u0430\u044F \u0431\u0443\u0441\u0438\u043D\u0430", 1]], potions: 0.7 },
    chapel: { gold: [3, 14], gear: [["\u0411\u0438\u043D\u0442\u044B", 2], ["\u041C\u0435\u043B", 2], ["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 1]], potions: 0.5 },
    guard: { gold: [4, 20], gear: [["\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0449\u0438\u0442", 2], ["\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043C\u0435\u0447", 2], ["\u041A\u043E\u0436\u0430\u043D\u0430\u044F \u043A\u0443\u0440\u0442\u043A\u0430", 1], ["\u0412\u0435\u0440\u0451\u0432\u043A\u0430", 1]] },
    storage: { gold: [0, 10], gear: [["\u0412\u0435\u0440\u0451\u0432\u043A\u0430", 3], ["\u041A\u0440\u044E\u043A-\u043A\u043E\u0448\u043A\u0430", 1], ["\u041C\u0435\u043B", 2], ["\u041E\u0433\u043D\u0438\u0432\u043E", 2], ["\u0420\u0430\u0446\u0438\u043E\u043D", 2]] },
    library: { gold: [2, 12], gear: [["\u0421\u0442\u0430\u0440\u0430\u044F \u043A\u0430\u0440\u0442\u0430", 3], ["\u041F\u0438\u0441\u044C\u043C\u043E \u0431\u0435\u0437 \u0430\u0434\u0440\u0435\u0441\u0430", 3], ["\u041C\u0435\u043B", 1]] },
    crypt: { gold: [8, 36], gear: [["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 3], ["\u0422\u0451\u043C\u043D\u0430\u044F \u043C\u043E\u043D\u0435\u0442\u0430", 3], ["\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u0441\u0432\u0438\u0441\u0442\u043E\u043A", 1], ["\u0411\u0443\u043B\u0430\u0432\u0430", 1]] },
    vault: { gold: [25, 90], gear: [["\u041E\u0445\u043E\u0442\u043D\u0438\u0447\u0438\u0439 \u043B\u0443\u043A", 2], ["\u041A\u043E\u043B\u044C\u0447\u0443\u0436\u043D\u0430\u044F \u0440\u0443\u0431\u0430\u0445\u0430", 2], ["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 3], ["\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u043A\u0430\u0442\u0443\u043B\u043A\u0430", 2]], potions: 0.9 },
    camp: { gold: [2, 12], gear: [["\u0420\u0430\u0446\u0438\u043E\u043D", 3], ["\u041E\u0433\u043D\u0438\u0432\u043E", 2], ["\u0412\u0435\u0440\u0451\u0432\u043A\u0430", 2], ["\u041E\u0445\u043E\u0442\u043D\u0438\u0447\u0438\u0439 \u043B\u0443\u043A", 1]] }
  };
  function rollLoot(rng, theme, depth = 0) {
    const t = THEME[theme] || THEME.storage, gold = rng.int(t.gold[0], t.gold[1] + depth * 6);
    const loot = { gold, potions: rng.chance((t.potions ?? 0.22) + depth * 0.08) ? 1 : 0, torches: rng.chance(0.12) ? 1 : 0, gear: [] };
    if (rng.chance(0.55 + depth * 0.1)) loot.gear.push(rng.weighted(t.gear));
    if (depth >= 2 && rng.chance(0.35)) loot.gear.push(rng.weighted(THEME.vault.gear));
    return loot;
  }
  var TRAPS = [
    { kind: "dart", name: "\u0414\u0440\u043E\u0442\u0438\u043A\u043E\u0432\u0430\u044F \u043B\u043E\u0432\u0443\u0448\u043A\u0430", save: "dex", dmg: [1, 4], text: "\u0418\u0437 \u0441\u0442\u0435\u043D\u044B \u0432\u044B\u043B\u0435\u0442\u0430\u044E\u0442 \u0434\u0440\u043E\u0442\u0438\u043A\u0438.", hint: "\u0412 \u0449\u0435\u043B\u044F\u0445 \u0441\u0442\u0435\u043D\u044B \u043F\u043E\u0431\u043B\u0451\u0441\u043A\u0438\u0432\u0430\u044E\u0442 \u0442\u043E\u043D\u043A\u0438\u0435 \u043E\u0442\u0432\u0435\u0440\u0441\u0442\u0438\u044F." },
    { kind: "needle", name: "\u042F\u0434\u043E\u0432\u0438\u0442\u0430\u044F \u0438\u0433\u043B\u0430", save: "con", dmg: [1, 4], poison: true, text: "\u0418\u0437 \u0437\u0430\u043C\u043A\u0430 \u0432\u044B\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u0438\u0433\u043B\u0430 \u0441 \u044F\u0434\u043E\u043C.", hint: "\u0420\u044F\u0434\u043E\u043C \u0441 \u0437\u0430\u043C\u043E\u0447\u043D\u043E\u0439 \u0441\u043A\u0432\u0430\u0436\u0438\u043D\u043E\u0439 \u0432\u0438\u0434\u0435\u043D \u043A\u0440\u043E\u0448\u0435\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u043A\u043E\u043B." },
    { kind: "fire", name: "\u041E\u0433\u043D\u0435\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u0443\u044F", save: "dex", dmg: [2, 6], text: "\u0418\u0437-\u0437\u0430 \u043F\u043B\u0438\u0442\u044B \u0431\u044C\u0451\u0442 \u0441\u0442\u0440\u0443\u044F \u043F\u043B\u0430\u043C\u0435\u043D\u0438.", hint: "\u041F\u043B\u0438\u0442\u0430 \u0447\u0443\u0442\u044C \u0442\u0435\u043C\u043D\u0435\u0435 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0445 \u0438 \u043F\u0430\u0445\u043D\u0435\u0442 \u0433\u0430\u0440\u044C\u044E." },
    { kind: "pit", name: "\u042F\u043C\u0430-\u043B\u043E\u0432\u0443\u0448\u043A\u0430", save: "dex", dmg: [2, 6], text: "\u041F\u043E\u043B \u043F\u0440\u043E\u0432\u0430\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434 \u043D\u043E\u0433\u0430\u043C\u0438.", hint: "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0438\u0442\u044B \u043B\u0435\u0436\u0430\u0442 \u043D\u0435\u0440\u043E\u0432\u043D\u043E, \u0448\u0432\u044B \u0431\u0443\u0434\u0442\u043E \u043C\u0430\u0441\u043A\u0438\u0440\u0443\u044E\u0442 \u043F\u0443\u0441\u0442\u043E\u0442\u0443." },
    { kind: "alarm", name: "\u0421\u0438\u0433\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0451\u0432\u043A\u0430", save: "dex", dmg: [0, 0], alarm: true, text: "\u0413\u0434\u0435-\u0442\u043E \u0437\u0432\u0435\u043D\u0438\u0442 \u043A\u043E\u043B\u043E\u043A\u043E\u043B\u044C\u0447\u0438\u043A. \u0412\u0430\u0441 \u0443\u0441\u043B\u044B\u0448\u0430\u043B\u0438.", hint: "\u041D\u0430\u0434 \u043F\u043E\u0440\u043E\u0433\u043E\u043C \u0442\u044F\u043D\u0435\u0442\u0441\u044F \u0442\u043E\u043D\u043A\u0430\u044F \u043D\u0438\u0442\u044C." },
    { kind: "gas", name: "\u042F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0433\u0430\u0437", save: "con", dmg: [1, 6], poison: true, text: "\u0418\u0437 \u0449\u0435\u043B\u0438 \u0432\u044B\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u043B\u0430\u043A\u043E \u0435\u0434\u043A\u043E\u0433\u043E \u0433\u0430\u0437\u0430.", hint: "\u0412 \u0449\u0435\u043B\u0438 \u0443 \u043F\u043E\u043B\u0430 \u043E\u0441\u0435\u043B\u0430 \u0437\u0435\u043B\u0451\u043D\u0430\u044F \u043F\u044B\u043B\u044C." }
  ];
  function rollTrap(rng, depth = 0, kinds) {
    const pool = kinds ? TRAPS.filter((t2) => kinds.includes(t2.kind)) : TRAPS, t = rng.pick(pool);
    const n = t.dmg[1] ? Math.max(1, t.dmg[0] + Math.floor(depth / 2)) : 0;
    return { kind: t.kind, name: t.name, save: t.save, dc: 11 + depth + rng.int(0, 2), detectDc: 10 + depth + rng.int(0, 3), disarmDc: 11 + depth + rng.int(0, 2), dice: n, sides: t.dmg[1], poison: !!t.poison, alarm: !!t.alarm, text: t.text, hint: t.hint };
  }
  var TRAP_KINDS = TRAPS.map((t) => t.kind);

  // src/worldgen-v1/scene.js
  var DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  var NON_BLOCKING = /* @__PURE__ */ new Set(["door", "portal", "torch", "chandelier", "clue", "trap"]);
  var MAX_LIGHTS = 12;
  var key = (x, y) => x + "," + y;
  var SceneBuilder = class {
    constructor(id, name, W, H, rng, meta = {}) {
      Object.assign(this, { id, name, W, H, rng, meta });
      this.floor = new Uint8Array(W * H);
      this.props = [];
      this.decor = [];
      this.lights = [];
      this.encounters = [];
      this.occ = /* @__PURE__ */ new Map();
      this.reserved = /* @__PURE__ */ new Set();
      this.counter = 0;
      this.anchor = null;
      this._reach = null;
    }
    inb(x, y) {
      return x >= 0 && y >= 0 && x < this.W && y < this.H;
    }
    isFloor(x, y) {
      return this.inb(x, y) && this.floor[y * this.W + x] === 1;
    }
    setFloor(x, y, v = 1) {
      if (this.inb(x, y)) this.floor[y * this.W + x] = v;
      this._reach = null;
    }
    rect(x, y, w, h, v = 1) {
      for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.setFloor(i, j, v);
    }
    // стена — пустая клетка, соседняя с полом (в том числе по диагонали)
    isWall(x, y) {
      if (!this.inb(x, y) || this.isFloor(x, y)) return false;
      for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (this.isFloor(x + i, y + j)) return true;
      return false;
    }
    nid(prefix) {
      return prefix + ++this.counter;
    }
    free(x, y) {
      return this.isFloor(x, y) && !this.occ.has(key(x, y));
    }
    reserve(x, y) {
      this.reserved.add(key(x, y));
    }
    floorCells() {
      const out = [];
      for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) if (this.floor[y * this.W + x]) out.push([x, y]);
      return out;
    }
    // Достижимые свободные клетки от якоря (4 направления, как ходят фигуры).
    reachable(skip) {
      const start = this.anchor;
      if (!start) return null;
      const seen = /* @__PURE__ */ new Set(), stack = [start];
      const sk = skip ? key(skip[0], skip[1]) : null;
      while (stack.length) {
        const [x, y] = stack.pop(), k = key(x, y);
        if (seen.has(k) || k === sk || !this.free(x, y)) continue;
        seen.add(k);
        for (const [dx, dy] of DIRS) stack.push([x + dx, y + dy]);
      }
      return seen;
    }
    freeNeighbors(x, y, skip) {
      let n = 0;
      for (const [dx, dy] of DIRS) {
        const a = x + dx, b = y + dy;
        if (this.free(a, b) && !(skip && skip[0] === a && skip[1] === b)) n++;
      }
      return n;
    }
    // Можно ли поставить сплошной предмет в клетку: клетка свободна, не зарезервирована, проходы целы, у соседей остаётся доступ.
    canBlock(x, y) {
      if (!this.free(x, y) || this.reserved.has(key(x, y))) return false;
      if (this.freeNeighbors(x, y, [x, y]) < 1) return false;
      if (!this.anchor) return true;
      if (!this._reach) this._reach = this.reachable();
      if (!this._reach.has(key(x, y))) return false;
      for (const [dx, dy] of DIRS) {
        const a = x + dx, b = y + dy;
        if (this.occ.has(key(a, b)) && this.occ.get(key(a, b)).interactive !== false && this.freeNeighbors(a, b, [x, y]) < 1) return false;
      }
      const after = this.reachable([x, y]);
      return after.size === this._reach.size - 1;
    }
    // Добавляет предмет. Возвращает prop или null, если поставить нельзя.
    put(prop, x = prop.x, y = prop.y) {
      prop.x = x;
      prop.y = y;
      if (!prop.id) prop.id = this.nid(prop.type || "p");
      const solid = prop.solid !== false && !NON_BLOCKING.has(prop.type);
      if (!solid && !NON_BLOCKING.has(prop.type) && this.props.some((q) => q.x === x && q.y === y)) return null;
      if (solid) {
        if (!this.canBlock(x, y)) return null;
        this.occ.set(key(x, y), prop);
        this._reach = null;
      }
      this.props.push(prop);
      return prop;
    }
    // Дверь/портал в стене: пол с обеих сторон вдоль оси должен быть стеной, а с одной стороны — пол.
    doorSpot(x, y) {
      if (this.isFloor(x, y)) return null;
      const up = this.isFloor(x, y - 1), dn = this.isFloor(x, y + 1), lf = this.isFloor(x - 1, y), rt = this.isFloor(x + 1, y);
      if ((up || dn) && !lf && !rt && this.isWall(x - 1, y) && this.isWall(x + 1, y)) return { axis: void 0, front: dn ? [x, y + 1] : [x, y - 1] };
      if ((lf || rt) && !up && !dn && this.isWall(x, y - 1) && this.isWall(x, y + 1)) return { axis: "horizontal", front: rt ? [x + 1, y] : [x - 1, y] };
      return null;
    }
    // Ищет место для портала в стене ближе к (nx,ny).
    findPortalSpot(nx, ny, predicate = () => true) {
      let best = null;
      for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) {
        if (this.props.some((p) => p.x === x && p.y === y)) continue;
        const s = this.doorSpot(x, y);
        if (!s || !predicate(x, y, s)) continue;
        const [fx, fy] = s.front;
        if (!this.free(fx, fy) || this.reserved.has(key(fx, fy))) continue;
        const d = Math.hypot(x - nx, y - ny);
        if (!best || d < best.d) best = { x, y, axis: s.axis, front: s.front, d };
      }
      return best;
    }
    addPortal(spot, destination, name, extra = {}) {
      const p = { id: extra.id || this.nid("portal"), x: spot.x, y: spot.y, kind: 26, name, type: "portal", destination, ...extra };
      if (spot.axis) p.axis = spot.axis;
      this.props.push(p);
      this.reserve(spot.front[0], spot.front[1]);
      return p;
    }
    addDoor(x, y, axis, name = "\u0414\u0432\u0435\u0440\u044C", extra = {}) {
      const p = { id: this.nid("door"), x, y, kind: 26, name, type: "door", ...extra };
      if (axis) p.axis = axis;
      this.props.push(p);
      for (const [dx, dy] of DIRS) {
        if (this.isFloor(x + dx, y + dy)) this.reserve(x + dx, y + dy);
      }
      this.reserve(x, y);
      return p;
    }
    light(x, y, extra = {}) {
      this.lights.push({ id: this.nid("lamp"), x, y, radius: 3, power: 0.6, phase: this.rng.next() * 6, intensity: 9, distance: 8, brightRadius: 4, ...extra });
    }
    chandelier(x, y) {
      if (!this.free(x, y)) return;
      const id = this.nid("chandelier");
      this.lights.push({ id, kind: "chandelier", x: x + 0.5, y: y + 0.5, height: 1.9, intensity: 26, distance: 10, brightRadius: 4, phase: this.rng.next() * 6, radius: 4 });
      this.props.push({ id, x, y, type: "chandelier", kind: 38, solid: false, name: "\u0421\u0432\u0435\u0447\u043D\u0430\u044F \u043B\u044E\u0441\u0442\u0440\u0430" });
    }
    // Настенные факелы: каждый свет крепится к ближайшей свободной стене (как mountLights в игре).
    // Игра создаёт PointLight на каждый свет, поэтому в сцене их не больше MAX_LIGHTS. Выбираем равномерно: сначала люстры и алтари, потом самые далёкие друг от друга.
    capLights(max = MAX_LIGHTS) {
      if (this.lights.length <= max) return;
      const keep = this.lights.filter((l) => l.kind === "chandelier" || l.id === "altar"), rest = this.lights.filter((l) => !keep.includes(l));
      const near = (l, set) => set.length ? Math.min(...set.map((o) => Math.hypot(o.x - l.x, o.y - l.y))) : 99;
      const a = this.anchor || [0, 0];
      if (!keep.length && rest.length) {
        rest.sort((p, q) => Math.hypot(p.x - a[0], p.y - a[1]) - Math.hypot(q.x - a[0], q.y - a[1]));
        keep.push(rest.shift());
      }
      while (keep.length < max && rest.length) {
        let bi = 0, bd = -1;
        rest.forEach((l, i) => {
          const d = near(l, keep);
          if (d > bd) {
            bd = d;
            bi = i;
          }
        });
        keep.push(rest.splice(bi, 1)[0]);
      }
      this.lights = keep;
    }
    mountLights() {
      this.capLights();
      const used = new Set(this.props.map((p) => key(p.x, p.y)));
      const mounted = [];
      for (const l of this.lights) {
        if (l.id === "altar" || l.kind === "chandelier") {
          mounted.push(l);
          continue;
        }
        const cand = [];
        for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) {
          if (!this.isWall(x, y) || used.has(key(x, y))) continue;
          for (const [dx, dy] of DIRS) {
            const ax = x + dx, ay = y + dy;
            if (!this.isFloor(ax, ay) || this.occ.has(key(ax, ay))) continue;
            cand.push({ x, y, dx, dy, ax, ay, d: Math.hypot(x + 0.5 + dx * 0.58 - l.x, y + 0.5 + dy * 0.58 - l.y) });
          }
        }
        cand.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
        const q = cand[0];
        if (!q) continue;
        used.add(key(q.x, q.y));
        Object.assign(l, { kind: "wall", wallX: q.x, wallY: q.y, dx: q.dx, dy: q.dy, x: q.x + 0.5 + q.dx * 0.58, y: q.y + 0.5 + q.dy * 0.58, height: 1.22 });
        const p = { id: "sconce-" + l.id, x: q.x, y: q.y, kind: 37, type: "torch", solid: false, name: "\u041D\u0430\u0441\u0442\u0435\u043D\u043D\u044B\u0439 \u0444\u0430\u043A\u0435\u043B", lightId: l.id, access: { x: q.ax, y: q.ay } };
        l.fixtureId = p.id;
        this.props.push(p);
        mounted.push(l);
      }
      this.lights = mounted;
    }
    nearestFree(x, y, count, avoid = /* @__PURE__ */ new Set()) {
      const out = [], seen = /* @__PURE__ */ new Set([key(x, y)]), q = [[x, y]];
      while (q.length && out.length < count) {
        const [cx3, cy3] = q.shift();
        if (this.free(cx3, cy3) && !avoid.has(key(cx3, cy3))) out.push([cx3, cy3]);
        for (const [dx, dy] of DIRS) {
          const a = cx3 + dx, b = cy3 + dy, k = key(a, b);
          if (!seen.has(k) && this.isFloor(a, b)) {
            seen.add(k);
            q.push([a, b]);
          }
        }
      }
      return out;
    }
    finish(entry) {
      this.mountLights();
      const tiles = Array.from({ length: this.H }, (_, y) => Array.from({ length: this.W }, (_2, x) => this.isFloor(x, y) ? "floor" : this.isWall(x, y) ? "wall" : "void"));
      const start = entry || this.anchor || this.floorCells()[0];
      const taken = /* @__PURE__ */ new Set(), spawns = this.nearestFree(start[0], start[1], 3);
      spawns.forEach((c) => taken.add(key(c[0], c[1])));
      const training = this.nearestFree(start[0], start[1], 6, taken).slice(3, 6), farFirst = this.floorCells().filter(([x, y]) => this.free(x, y) && !taken.has(key(x, y))).sort((a, b) => Math.hypot(b[0] - start[0], b[1] - start[1]) - Math.hypot(a[0] - start[0], a[1] - start[1]));
      const enemySpawn = farFirst.slice(0, 3);
      return {
        id: this.id,
        name: this.name,
        W: this.W,
        H: this.H,
        tiles,
        props: this.props,
        decor: this.decor,
        dummies: [],
        lights: this.lights,
        spawns,
        trainingSpawn: training.length === 3 ? training : spawns.slice(),
        enemySpawn,
        encounters: this.encounters,
        gen: this.meta
      };
    }
  };
  function validateScene(scene) {
    const tile = (x, y) => scene.tiles[y]?.[x] || "void", errs = [], occupied = /* @__PURE__ */ new Map(), walls = /* @__PURE__ */ new Map();
    for (const p of scene.props) {
      const layer = ["door", "portal"].includes(p.type) ? "doorway" : p.type === "clue" ? "surface" : p.type === "chandelier" ? "ceiling" : p.solid === false ? "wall" : "floor", k = key(p.x, p.y);
      if (layer === "floor") {
        if (occupied.has(k)) errs.push("\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: " + occupied.get(k).id + " / " + p.id);
        if (tile(p.x, p.y) !== "floor") errs.push("\u041F\u0440\u0435\u0434\u043C\u0435\u0442 \u0432\u043D\u0435 \u043F\u043E\u043B\u0430: " + p.id);
        occupied.set(k, p);
      }
      if (layer === "wall") {
        if (walls.has(k)) errs.push("\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u0441\u0442\u0435\u043D\u0435: " + p.id);
        walls.set(k, p);
      }
    }
    for (const d of scene.decor) if (d.kind !== "rug") {
      const k = key(d.x, d.y);
      if (occupied.has(k)) errs.push("\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u043A\u043E\u0440\u0430: " + d.kind);
      occupied.set(k, d);
    }
    for (const l of scene.lights) if (!(l.id === "altar" || l.kind === "wall" || l.kind === "chandelier")) errs.push("\u0421\u0432\u0435\u0442 \u0431\u0435\u0437 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F: " + l.id);
    for (const a of [...scene.spawns, ...scene.trainingSpawn, ...scene.enemySpawn]) if (occupied.has(a.join(","))) errs.push("\u0421\u043F\u0430\u0432\u043D \u0432 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0435: " + occupied.get(a.join(",")).id);
    if (scene.spawns.length < 3) errs.push("\u041C\u0430\u043B\u043E \u0442\u043E\u0447\u0435\u043A \u043F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u044F");
    for (const p of scene.props.filter((p2) => ["door", "portal"].includes(p2.type))) {
      const flanks = p.axis === "horizontal" ? [[0, -1], [0, 1]] : [[-1, 0], [1, 0]];
      if (!flanks.every(([dx, dy]) => tile(p.x + dx, p.y + dy) === "wall")) errs.push("\u0414\u0432\u0435\u0440\u044C \u0431\u0435\u0437 \u0441\u0442\u0435\u043D \u043F\u043E \u0431\u043E\u043A\u0430\u043C: " + p.id);
      if (!DIRS.some(([dx, dy]) => tile(p.x + dx, p.y + dy) === "floor")) errs.push("\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0434\u0432\u0435\u0440\u044C: " + p.id);
    }
    const freeCells = [];
    for (let y = 0; y < scene.H; y++) for (let x = 0; x < scene.W; x++) if (tile(x, y) === "floor" && !occupied.has(key(x, y))) freeCells.push([x, y]);
    if (!freeCells.length) errs.push("\u041D\u0435\u0442 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u0430");
    else {
      const seen = /* @__PURE__ */ new Set([key(...scene.spawns[0])]), stack = [scene.spawns[0]];
      while (stack.length) {
        const [x, y] = stack.pop();
        for (const [dx, dy] of DIRS) {
          const a = x + dx, b = y + dy, k = key(a, b);
          if (!seen.has(k) && tile(a, b) === "floor" && !occupied.has(k)) {
            seen.add(k);
            stack.push([a, b]);
          }
        }
      }
      if (seen.size !== freeCells.length) errs.push("\u041F\u043E\u043B \u0440\u0430\u0437\u043E\u0440\u0432\u0430\u043D: \u0434\u043E\u0441\u0442\u0438\u0436\u0438\u043C\u043E " + seen.size + " \u0438\u0437 " + freeCells.length);
      for (const p of scene.props) {
        if (["torch", "chandelier"].includes(p.type) || p.solid === false && !["door", "portal"].includes(p.type)) continue;
        if (!DIRS.some(([dx, dy]) => seen.has(key(p.x + dx, p.y + dy)))) errs.push("\u041D\u0435\u0442 \u043F\u043E\u0434\u0445\u043E\u0434\u0430 \u043A: " + p.id + " (" + (p.model || p.type) + ")");
      }
    }
    const ids = /* @__PURE__ */ new Set();
    for (const p of scene.props) {
      if (ids.has(p.id)) errs.push("\u041F\u043E\u0432\u0442\u043E\u0440 id: " + p.id);
      ids.add(p.id);
    }
    return errs;
  }

  // src/worldgen-v1/furnish.js
  var CAT = {
    table: { type: "furniture", model: "table", name: "\u0421\u0442\u043E\u043B", d: ["\u041A\u0440\u0435\u043F\u043A\u0438\u0439 \u0441\u0442\u043E\u043B \u0441 \u0432\u044A\u0435\u0432\u0448\u0438\u043C\u0438\u0441\u044F \u043F\u044F\u0442\u043D\u0430\u043C\u0438 \u0438 \u0446\u0430\u0440\u0430\u043F\u0438\u043D\u0430\u043C\u0438.", "\u0421\u0442\u043E\u043B \u043D\u0430\u043A\u0440\u044B\u0442 \u0432\u044B\u0446\u0432\u0435\u0442\u0448\u0435\u0439 \u0441\u043A\u0430\u0442\u0435\u0440\u0442\u044C\u044E.", "\u041D\u0430 \u0441\u0442\u043E\u043B\u0435 \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u043A\u0440\u0443\u0433\u0438 \u043E\u0442 \u043A\u0440\u0443\u0436\u0435\u043A."] },
    stool: { type: "furniture", model: "stool", name: "\u0422\u0430\u0431\u0443\u0440\u0435\u0442", d: ["\u0422\u0440\u0451\u0445\u043D\u043E\u0433\u0438\u0439 \u0442\u0430\u0431\u0443\u0440\u0435\u0442, \u043E\u0442\u043F\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u043E \u0431\u043B\u0435\u0441\u043A\u0430.", "\u0422\u0430\u0431\u0443\u0440\u0435\u0442 \u0441\u043B\u0435\u0433\u043A\u0430 \u0448\u0430\u0442\u0430\u0435\u0442\u0441\u044F."] },
    bench: { type: "furniture", model: "bench", name: "\u0421\u043A\u0430\u043C\u044C\u044F", d: ["\u0414\u043B\u0438\u043D\u043D\u0430\u044F \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u0430\u044F \u0441\u043A\u0430\u043C\u044C\u044F.", "\u0421\u043A\u0430\u043C\u044C\u044F \u0432\u044B\u0442\u0435\u0440\u0442\u0430 \u0441\u043E\u0442\u043D\u044F\u043C\u0438 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439."] },
    bed: { type: "furniture", model: "bed", name: "\u041A\u0440\u043E\u0432\u0430\u0442\u044C", d: ["\u0423\u0437\u043A\u0430\u044F \u043A\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E \u0441\u0432\u0435\u0436\u0438\u043C\u0438 \u043F\u0440\u043E\u0441\u0442\u044B\u043D\u044F\u043C\u0438.", "\u041E\u0434\u0435\u044F\u043B\u043E \u0441\u043C\u044F\u0442\u043E, \u0431\u0443\u0434\u0442\u043E \u0437\u0434\u0435\u0441\u044C \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u0441\u043F\u0430\u043B\u0438.", "\u041A\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043A\u0440\u0438\u043F\u0438\u0442 \u043F\u0440\u0438 \u043C\u0430\u043B\u0435\u0439\u0448\u0435\u043C \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438."] },
    cot: { type: "furniture", model: "cot", name: "\u041B\u0435\u0436\u0430\u043D\u043A\u0430", d: ["\u0413\u043E\u043B\u044B\u0435 \u0434\u043E\u0441\u043A\u0438 \u0441 \u0441\u043E\u043B\u043E\u043C\u0435\u043D\u043D\u044B\u043C \u0442\u044E\u0444\u044F\u043A\u043E\u043C.", "\u0416\u0451\u0441\u0442\u043A\u0430\u044F \u043B\u0435\u0436\u0430\u043D\u043A\u0430, \u043F\u0440\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043A \u0441\u0442\u0435\u043D\u0435."] },
    hearth: { type: "furniture", model: "hearth", name: "\u041E\u0447\u0430\u0433", d: ["\u0412 \u043E\u0447\u0430\u0433\u0435 \u0442\u043B\u0435\u044E\u0442 \u0443\u0433\u043B\u0438, \u043E\u0442 \u043D\u0438\u0445 \u0438\u0434\u0451\u0442 \u0440\u043E\u0432\u043D\u043E\u0435 \u0442\u0435\u043F\u043B\u043E.", "\u041E\u0447\u0430\u0433 \u0432\u044B\u043B\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u043E\u043F\u0447\u0451\u043D\u043D\u044B\u043C \u043A\u0430\u043C\u043D\u0435\u043C."], light: true },
    wardrobe: { type: "furniture", model: "wardrobe", name: "\u0428\u043A\u0430\u0444", d: ["\u0422\u044F\u0436\u0451\u043B\u044B\u0439 \u0448\u043A\u0430\u0444 \u0441 \u043F\u043E\u0442\u0451\u0440\u0442\u043E\u0439 \u0440\u0435\u0437\u044C\u0431\u043E\u0439."], container: true },
    counter: { type: "furniture", model: "counter", name: "\u041F\u0440\u0438\u043B\u0430\u0432\u043E\u043A", d: ["\u0428\u0438\u0440\u043E\u043A\u0438\u0439 \u043F\u0440\u0438\u043B\u0430\u0432\u043E\u043A, \u043D\u0430 \u043D\u0451\u043C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0440\u0430\u0437\u043B\u043E\u0436\u0435\u043D\u044B \u0442\u043E\u0432\u0430\u0440\u044B.", "\u0414\u0435\u0440\u0435\u0432\u043E \u043F\u0440\u0438\u043B\u0430\u0432\u043A\u0430 \u0438\u0441\u0442\u0451\u0440\u0442\u043E \u043B\u043E\u043A\u0442\u044F\u043C\u0438."] },
    shelf: { type: "furniture", model: "shelf", name: "\u041F\u043E\u043B\u043A\u0430", d: ["\u041D\u0430 \u043F\u043E\u043B\u043A\u0430\u0445 \u0431\u0430\u043D\u043A\u0438, \u0441\u0432\u0451\u0440\u0442\u043A\u0438 \u0438 \u043C\u0435\u043B\u043A\u0430\u044F \u0443\u0442\u0432\u0430\u0440\u044C.", "\u041F\u043E\u043B\u043A\u0438 \u0437\u0430\u0431\u0438\u0442\u044B \u0432\u0441\u044F\u043A\u043E\u0439 \u0432\u0441\u044F\u0447\u0438\u043D\u043E\u0439."], container: true },
    well: { type: "furniture", model: "well", name: "\u041A\u043E\u043B\u043E\u0434\u0435\u0446", d: ["\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043B\u043E\u0434\u0435\u0446. \u0412\u043E\u0434\u0430 \u0432\u043D\u0438\u0437\u0443 \u0447\u0451\u0440\u043D\u0430\u044F \u0438 \u0445\u043E\u043B\u043E\u0434\u043D\u0430\u044F.", "\u0412\u0435\u0434\u0440\u043E \u043D\u0430 \u0446\u0435\u043F\u0438 \u043F\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0442 \u0432\u0435\u0442\u0440\u0430."] },
    tree: { type: "furniture", model: "tree", name: "\u0414\u0435\u0440\u0435\u0432\u043E", d: ["\u0421\u0442\u0430\u0440\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E \u0441 \u0433\u0443\u0441\u0442\u043E\u0439 \u043A\u0440\u043E\u043D\u043E\u0439.", "\u0412\u0435\u0442\u0432\u0438 \u0448\u0443\u043C\u044F\u0442 \u043D\u0430\u0434 \u0433\u043E\u043B\u043E\u0432\u043E\u0439."] },
    bush: { type: "furniture", model: "bush", name: "\u041A\u0443\u0441\u0442\u0430\u0440\u043D\u0438\u043A", d: ["\u041A\u043E\u043B\u044E\u0447\u0438\u0439 \u043A\u0443\u0441\u0442\u0430\u0440\u043D\u0438\u043A."] },
    stall: { type: "furniture", model: "stall", name: "\u0422\u043E\u0440\u0433\u043E\u0432\u044B\u0439 \u043D\u0430\u0432\u0435\u0441", d: ["\u041D\u0430\u0432\u0435\u0441 \u043D\u0430\u0434 \u043F\u0440\u0438\u043B\u0430\u0432\u043A\u043E\u043C, \u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0442\u043E\u0432\u0430\u0440.", "\u041F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0439 \u0442\u0435\u043D\u0442 \u0445\u043B\u043E\u043F\u0430\u0435\u0442 \u043D\u0430 \u0432\u0435\u0442\u0440\u0443."] },
    anvil: { type: "furniture", model: "anvil", name: "\u041D\u0430\u043A\u043E\u0432\u0430\u043B\u044C\u043D\u044F", d: ["\u041D\u0430\u043A\u043E\u0432\u0430\u043B\u044C\u043D\u044F \u0432 \u0437\u0430\u0440\u0443\u0431\u043A\u0430\u0445 \u043E\u0442 \u0442\u044B\u0441\u044F\u0447 \u0443\u0434\u0430\u0440\u043E\u0432."] },
    forge: { type: "furniture", model: "forge", name: "\u0413\u043E\u0440\u043D", d: ["\u0413\u043E\u0440\u043D \u043F\u044B\u0448\u0435\u0442 \u0436\u0430\u0440\u043E\u043C, \u0443\u0433\u043B\u0438 \u0441\u0432\u0435\u0442\u044F\u0442\u0441\u044F \u043E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u043C."], light: true },
    cauldron: { type: "furniture", model: "cauldron", name: "\u041A\u043E\u0442\u0451\u043B", d: ["\u0412 \u043A\u043E\u0442\u043B\u0435 \u0447\u0442\u043E-\u0442\u043E \u0431\u0443\u043B\u044C\u043A\u0430\u0435\u0442 \u0438 \u043F\u0430\u0445\u043D\u0435\u0442 \u0442\u0440\u0430\u0432\u0430\u043C\u0438.", "\u0427\u0443\u0433\u0443\u043D\u043D\u044B\u0439 \u043A\u043E\u0442\u0451\u043B \u043D\u0430\u0434 \u043E\u0433\u043D\u0451\u043C."] },
    sarcophagus: { type: "furniture", model: "sarcophagus", name: "\u0421\u0430\u0440\u043A\u043E\u0444\u0430\u0433", d: ["\u041A\u0440\u044B\u0448\u043A\u0430 \u0441\u0430\u0440\u043A\u043E\u0444\u0430\u0433\u0430 \u043F\u043E\u043A\u0440\u044B\u0442\u0430 \u043F\u044B\u043B\u044C\u044E \u0438 \u0441\u0442\u0451\u0440\u0442\u044B\u043C\u0438 \u0440\u0443\u043D\u0430\u043C\u0438.", "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0430\u0440\u043A\u043E\u0444\u0430\u0433. \u0422\u0438\u0445\u043E, \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0442\u0438\u0445\u043E."] },
    gravestone: { type: "furniture", model: "gravestone", name: "\u041D\u0430\u0434\u0433\u0440\u043E\u0431\u0438\u0435", d: ["\u0418\u043C\u044F \u043D\u0430 \u043A\u0430\u043C\u043D\u0435 \u0441\u0442\u0451\u0440\u043B\u043E\u0441\u044C, \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u0430\u0442\u044B."] },
    bones: { type: "furniture", model: "bones", name: "\u041A\u043E\u0441\u0442\u0438", d: ["\u041A\u0443\u0447\u043A\u0430 \u0441\u0442\u0430\u0440\u044B\u0445 \u043A\u043E\u0441\u0442\u0435\u0439. \u0414\u0430\u0432\u043D\u043E \u0437\u0434\u0435\u0441\u044C \u043B\u0435\u0436\u0430\u0442."], solid: false },
    pillar: { type: "cover", model: "pillar", name: "\u041A\u043E\u043B\u043E\u043D\u043D\u0430", d: ["\u041A\u0430\u043C\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043B\u043E\u043D\u043D\u0430, \u0438\u0441\u0447\u0435\u0440\u0447\u0435\u043D\u043D\u0430\u044F \u0442\u0440\u0435\u0449\u0438\u043D\u0430\u043C\u0438."] },
    brazier: { type: "furniture", model: "brazier", name: "\u0416\u0430\u0440\u043E\u0432\u043D\u044F", d: ["\u0416\u0430\u0440\u043E\u0432\u043D\u044F \u043E\u0441\u0432\u0435\u0449\u0430\u0435\u0442 \u0432\u0441\u0451 \u0432\u043E\u043A\u0440\u0443\u0433 \u043A\u0440\u0430\u0441\u043D\u043E\u0432\u0430\u0442\u044B\u043C \u0441\u0432\u0435\u0442\u043E\u043C."], light: true },
    fountain: { type: "furniture", model: "fountain", name: "\u0424\u043E\u043D\u0442\u0430\u043D", d: ["\u0412\u043E\u0434\u0430 \u0442\u0438\u0445\u043E \u0436\u0443\u0440\u0447\u0438\u0442 \u0432 \u043A\u0430\u043C\u0435\u043D\u043D\u043E\u0439 \u0447\u0430\u0448\u0435."] },
    signpost: { type: "furniture", model: "signpost", name: "\u0423\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C", d: ["\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0443\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C \u0441 \u0432\u044B\u0446\u0432\u0435\u0442\u0448\u0438\u043C\u0438 \u043D\u0430\u0434\u043F\u0438\u0441\u044F\u043C\u0438."] },
    haystack: { type: "furniture", model: "haystack", name: "\u0421\u0442\u043E\u0433 \u0441\u0435\u043D\u0430", d: ["\u0422\u0451\u043F\u043B\u044B\u0439 \u0441\u0442\u043E\u0433, \u043F\u0430\u0445\u043D\u0435\u0442 \u043B\u0435\u0442\u043E\u043C."] },
    cart: { type: "furniture", model: "cart", name: "\u0422\u0435\u043B\u0435\u0433\u0430", d: ["\u0422\u0435\u043B\u0435\u0433\u0430 \u0441 \u043C\u0435\u0448\u043A\u0430\u043C\u0438 \u0438 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439."] },
    barrel: { type: "barrel", name: "\u0411\u043E\u0447\u043A\u0430", d: ["\u0418\u0437 \u0431\u043E\u0447\u043A\u0438 \u043F\u0430\u0445\u043D\u0435\u0442 \u044D\u043B\u0435\u043C.", "\u0411\u043E\u0447\u043A\u0430 \u0441 \u0432\u043E\u0434\u043E\u0439, \u043D\u0430 \u043A\u0440\u044B\u0448\u043A\u0435 \u043F\u044B\u043B\u044C.", "\u0411\u043E\u0447\u043A\u0430 \u043E\u043F\u0435\u0447\u0430\u0442\u0430\u043D\u0430 \u043A\u043B\u0435\u0439\u043C\u043E\u043C \u0431\u043E\u043D\u0434\u0430\u0440\u044F."], container: true },
    crate: { type: "crate", name: "\u042F\u0449\u0438\u043A", d: ["\u042F\u0449\u0438\u043A \u0441 \u043E\u0442\u043C\u0435\u0442\u043A\u0430\u043C\u0438 \u043C\u0435\u043B\u043E\u043C.", "\u0414\u043E\u0449\u0430\u0442\u044B\u0439 \u044F\u0449\u0438\u043A, \u043A\u0440\u044B\u0448\u043A\u0430 \u043F\u0440\u0438\u0431\u0438\u0442\u0430 \u0433\u0432\u043E\u0437\u0434\u044F\u043C\u0438."], container: true },
    chair: { type: "chair", name: "\u0421\u0442\u0443\u043B", d: ["\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0441\u0442\u0443\u043B."] },
    chest: { type: "chest", name: "\u0421\u0443\u043D\u0434\u0443\u043A", d: ["\u041E\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A.", "\u0421\u0443\u043D\u0434\u0443\u043A \u0441 \u043F\u043E\u0442\u0451\u0440\u0442\u044B\u043C \u0437\u0430\u043C\u043A\u043E\u043C."], container: true },
    planter: { type: "planter", name: "\u041A\u0430\u0434\u043A\u0430 \u0441 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u0435\u043C", d: ["\u0420\u0430\u0441\u0442\u0435\u043D\u0438\u0435 \u0434\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0441\u0438\u0442 \u0432\u043E\u0434\u044B.", "\u0412 \u043A\u0430\u0434\u043A\u0435 \u0440\u0430\u0441\u0442\u0443\u0442 \u0434\u0443\u0448\u0438\u0441\u0442\u044B\u0435 \u0442\u0440\u0430\u0432\u044B."] },
    books: { type: "books", name: "\u041A\u043D\u0438\u0436\u043D\u044B\u0439 \u0448\u043A\u0430\u0444", d: ["\u0422\u0435\u0441\u043D\u043E \u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0442\u043E\u043C\u0430, \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0439.", "\u041A\u043D\u0438\u0433\u0438 \u043F\u0430\u0445\u043D\u0443\u0442 \u043F\u044B\u043B\u044C\u044E \u0438 \u043A\u043B\u0435\u0435\u043C."], container: true },
    desk: { type: "desk", name: "\u041F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u043E\u043B", d: ["\u041D\u0430 \u0441\u0442\u043E\u043B\u0435 \u0447\u0435\u0440\u043D\u0438\u043B\u044C\u043D\u0438\u0446\u0430 \u0438 \u0441\u0442\u043E\u043F\u043A\u0430 \u0431\u0443\u043C\u0430\u0433.", "\u041F\u0435\u0440\u043E \u0442\u043E\u0440\u0447\u0438\u0442 \u0438\u0437 \u0447\u0435\u0440\u043D\u0438\u043B\u044C\u043D\u0438\u0446\u044B, \u0431\u0443\u0434\u0442\u043E \u043F\u0438\u0441\u0430\u0432\u0448\u0438\u0439 \u0432\u044B\u0448\u0435\u043B \u043D\u0430 \u043C\u0438\u043D\u0443\u0442\u0443."] },
    rack: { type: "rack", name: "\u0421\u0442\u043E\u0439\u043A\u0430 \u0441 \u043E\u0440\u0443\u0436\u0438\u0435\u043C", d: ["\u041E\u0440\u0443\u0436\u0438\u0435 \u043D\u0430 \u0441\u0442\u043E\u0439\u043A\u0435 \u043E\u0442\u043F\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0434\u043E \u0431\u043B\u0435\u0441\u043A\u0430."] },
    banner: { type: "banner", name: "\u0417\u043D\u0430\u043C\u044F", d: ["\u0417\u043D\u0430\u043C\u044F \u0432\u044B\u0446\u0432\u0435\u043B\u043E, \u043D\u043E \u0433\u0435\u0440\u0431\u043E\u0432\u044B\u0439 \u0437\u0432\u0435\u0440\u044C \u0435\u0449\u0451 \u0432\u0438\u0434\u0435\u043D."], solid: false },
    scrolls: { type: "scrolls", name: "\u0421\u0432\u0438\u0442\u043A\u0438", d: ["\u0421\u0432\u0438\u0442\u043A\u0438 \u043B\u0435\u0436\u0430\u0442 \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0442\u043E\u043F\u043A\u043E\u0439."] },
    altar: { type: "altar", name: "\u0410\u043B\u0442\u0430\u0440\u044C", d: ["\u0410\u043B\u0442\u0430\u0440\u044C \u0442\u0451\u043F\u043B\u044B\u0439 \u043D\u0430 \u043E\u0449\u0443\u043F\u044C, \u0441\u0432\u0435\u0447\u0438 \u0433\u043E\u0440\u044F\u0442 \u0440\u043E\u0432\u043D\u043E."] }
  };
  var dirRot = (dx, dy) => dy === 1 ? 0 : dx === -1 ? 3 : dy === -1 ? 2 : 1;
  function mk(sb, key10, extra = {}) {
    const c = CAT[key10], p = { type: c.type, kind: 24, name: c.name, description: sb.rng.pick(c.d), ...extra };
    if (c.model) p.model = c.model;
    if (c.solid === false) p.solid = false;
    if (c.type === "chest") p.kind = 17;
    if (c.type === "altar") p.kind = 18;
    if (c.type === "books") p.kind = 21;
    if (c.type === "cover") p.kind = 19;
    p.cat = key10;
    return p;
  }
  var inRoom = (r, x, y) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;
  function roomCells(sb, r) {
    const out = [];
    for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) if (sb.isFloor(x, y)) out.push([x, y]);
    return out;
  }
  function wallCandidates(sb, r) {
    const out = [];
    for (const [x, y] of roomCells(sb, r)) for (const [dx, dy] of DIRS) if (!sb.isFloor(x + dx, y + dy)) {
      out.push({ x, y, rot: dirRot(-dx, -dy), wall: [dx, dy] });
      break;
    }
    return sb.rng.shuffle(out);
  }
  function interior(sb, r) {
    return sb.rng.shuffle(roomCells(sb, r).filter(([x, y]) => DIRS.every(([dx, dy]) => sb.isFloor(x + dx, y + dy))));
  }
  function atWall(sb, r, key10, n = 1, extra = () => ({})) {
    let placed = 0;
    const out = [];
    for (const c of wallCandidates(sb, r)) {
      if (placed >= n) break;
      const p = sb.put(mk(sb, key10, { rot: c.rot, ...extra(placed) }), c.x, c.y);
      if (p) {
        placed++;
        out.push(p);
      }
    }
    return out;
  }
  function wallMount(sb, r, key10, n = 1) {
    const out = [], cand = [];
    for (let y = r.y - 1; y <= r.y + r.h; y++) for (let x = r.x - 1; x <= r.x + r.w; x++) {
      if (!sb.isWall(x, y) || sb.isFloor(x, y)) continue;
      const fronts = DIRS.filter(([dx, dy]) => sb.isFloor(x + dx, y + dy) && inRoom(r, x + dx, y + dy) && !sb.occ.has(x + dx + "," + (y + dy)) && !sb.reserved.has(x + dx + "," + (y + dy)));
      if (fronts.length === 1) cand.push([x, y]);
    }
    for (const [x, y] of sb.rng.shuffle(cand)) {
      if (out.length >= n) break;
      if (sb.props.some((p2) => Math.abs(p2.x - x) + Math.abs(p2.y - y) < 2 && (p2.solid === false || p2.type === "portal" || p2.type === "door"))) continue;
      const p = mk(sb, key10);
      p.x = x;
      p.y = y;
      p.id = sb.nid("wall");
      sb.props.push(p);
      out.push(p);
    }
    return out;
  }
  function inside(sb, r, key10, n = 1, extra = () => ({})) {
    let placed = 0;
    const out = [];
    for (const [x, y] of interior(sb, r)) {
      if (placed >= n) break;
      const p = sb.put(mk(sb, key10, extra(placed)), x, y);
      if (p) {
        placed++;
        out.push(p);
      }
    }
    return out;
  }
  function anywhere(sb, r, key10, n = 1, extra = () => ({})) {
    let placed = 0;
    const out = [];
    for (const [x, y] of sb.rng.shuffle(roomCells(sb, r))) {
      if (placed >= n) break;
      const p = sb.put(mk(sb, key10, extra(placed)), x, y);
      if (p) {
        placed++;
        out.push(p);
      }
    }
    return out;
  }
  function tableSet(sb, r, chairs = 2) {
    for (const [x, y] of interior(sb, r)) {
      const t = sb.put(mk(sb, "table"), x, y);
      if (!t) continue;
      let n = 0;
      for (const [dx, dy] of sb.rng.shuffle(DIRS)) {
        if (n >= chairs) break;
        if (sb.put(mk(sb, "chair", { rot: dirRot(-dx, -dy) }), x + dx, y + dy)) n++;
      }
      return t;
    }
    return null;
  }
  function rug(sb, r) {
    if (r.w < 4 || r.h < 4) return;
    const w = Math.min(3, r.w - 2), h = Math.min(2, r.h - 2), x = r.x + Math.floor((r.w - w) / 2), y = r.y + Math.floor((r.h - h) / 2);
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (!sb.free(i, j) || sb.reserved.has(i + "," + j)) return;
    sb.decor.push({ kind: "rug", x, y, w, h });
  }
  function stock(sb, p, ctx, theme, opts = {}) {
    const depth = ctx.depth || 0, r = sb.rng;
    p.gen = true;
    p.container = true;
    p.loot = rollLoot(r, theme, depth + (opts.bonus || 0));
    if (p.type !== "chest" && theme !== "vault" && !opts.lockKey && r.chance(0.45 - Math.min(0.2, depth * 0.05))) p.loot = { gold: 0, potions: 0, torches: 0, gear: [] };
    else if (p.type !== "chest") {
      p.loot.potions = r.chance(0.06 + depth * 0.03) ? 1 : 0;
      p.loot.gold = Math.ceil(p.loot.gold / 2);
    }
    if (opts.lockKey) p.lock = { key: opts.lockKey, pickDc: 12 + depth, forceDc: 14 + depth };
    if (opts.trap) p.trap = rollTrap(r, depth, opts.trapKinds);
    if (opts.extraGear) p.loot.gear.push(...opts.extraGear);
    p.description = (p.description ? p.description + " " : "") + (p.lock ? "\u0417\u0430\u043F\u0435\u0440\u0442." : "");
    return p;
  }
  function furnish(sb, role, r, ctx) {
    const rng = sb.rng, area = r.w * r.h, depth = ctx.depth || 0, big = area >= 30;
    const fire = (ps) => {
      for (const p of ps) if (CAT[p.cat].light) sb.light(p.x + 0.5, p.y + 0.5, { radius: 3, power: 0.7 });
    };
    switch (role) {
      case "living":
        fire(atWall(sb, r, "hearth", 1));
        tableSet(sb, r, 2);
        if (big) tableSet(sb, r, 1);
        atWall(sb, r, "bench", 1);
        atWall(sb, r, "shelf", 1);
        if (rng.chance(0.5)) atWall(sb, r, "planter", 1);
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "bedroom", { trap: rng.chance(0.06) }));
        rug(sb, r);
        break;
      case "bedroom":
        atWall(sb, r, "bed", big ? 2 : 1);
        atWall(sb, r, "wardrobe", 1).forEach((p) => stock(sb, p, ctx, "bedroom"));
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "bedroom", { trap: rng.chance(0.08) }));
        if (big) inside(sb, r, "table", 1);
        if (rng.chance(0.4)) rug(sb, r);
        break;
      case "kitchen":
        fire(atWall(sb, r, "hearth", 1));
        atWall(sb, r, "cauldron", 1);
        atWall(sb, r, "counter", 2);
        inside(sb, r, "table", 1);
        atWall(sb, r, "barrel", 2).forEach((p) => stock(sb, p, ctx, "kitchen"));
        atWall(sb, r, "crate", 2).forEach((p) => stock(sb, p, ctx, "kitchen"));
        atWall(sb, r, "shelf", 1).forEach((p) => stock(sb, p, ctx, "kitchen"));
        break;
      case "hall": {
        fire(atWall(sb, r, "hearth", 1));
        atWall(sb, r, "counter", Math.min(4, Math.max(2, Math.floor(r.w / 3))));
        for (let i = 0; i < Math.min(5, Math.max(2, Math.floor(area / 14))); i++) tableSet(sb, r, 2);
        atWall(sb, r, "barrel", 2).forEach((p) => stock(sb, p, ctx, "tavern"));
        atWall(sb, r, "stool", 2);
        atWall(sb, r, "bench", 1);
        wallMount(sb, r, "banner", 1);
        if (area >= 36) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        rug(sb, r);
        break;
      }
      case "storage":
        atWall(sb, r, "crate", 2 + (big ? 2 : 0)).forEach((p) => stock(sb, p, ctx, "storage"));
        atWall(sb, r, "barrel", 2).forEach((p) => stock(sb, p, ctx, "storage"));
        atWall(sb, r, "shelf", 1).forEach((p) => stock(sb, p, ctx, "storage"));
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "storage", { trap: rng.chance(0.12 + depth * 0.05) }));
        if (big) inside(sb, r, "crate", 1).forEach((p) => stock(sb, p, ctx, "storage"));
        break;
      case "cellar":
        atWall(sb, r, "barrel", 3).forEach((p) => stock(sb, p, ctx, "tavern"));
        atWall(sb, r, "crate", 2).forEach((p) => stock(sb, p, ctx, "storage"));
        atWall(sb, r, "shelf", 1).forEach((p) => stock(sb, p, ctx, "storage"));
        inside(sb, r, "barrel", big ? 2 : 1).forEach((p) => stock(sb, p, ctx, "tavern"));
        break;
      case "smithy":
        fire(atWall(sb, r, "forge", 1));
        atWall(sb, r, "anvil", 1);
        atWall(sb, r, "rack", 2);
        atWall(sb, r, "counter", 2);
        atWall(sb, r, "barrel", 1);
        atWall(sb, r, "crate", 2).forEach((p) => stock(sb, p, ctx, "smith"));
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "smith", { trap: rng.chance(0.1) }));
        break;
      case "alchemy":
        atWall(sb, r, "shelf", 3).forEach((p) => stock(sb, p, ctx, "alchemy"));
        atWall(sb, r, "cauldron", 1);
        atWall(sb, r, "counter", 2);
        atWall(sb, r, "planter", 2);
        inside(sb, r, "table", 1);
        atWall(sb, r, "crate", 1).forEach((p) => stock(sb, p, ctx, "alchemy"));
        break;
      case "shop":
        atWall(sb, r, "counter", Math.min(3, Math.max(2, Math.floor(r.w / 3))));
        atWall(sb, r, "shelf", 3).forEach((p) => stock(sb, p, ctx, "storage"));
        atWall(sb, r, "barrel", 1);
        atWall(sb, r, "crate", 2).forEach((p) => stock(sb, p, ctx, "storage"));
        inside(sb, r, "crate", 1);
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "storage", { trap: rng.chance(0.1) }));
        rug(sb, r);
        break;
      case "chapel": {
        const a = atWall(sb, r, "altar", 1);
        if (a[0]) sb.lights.push({ id: "altar", x: a[0].x + 0.5, y: a[0].y + 0.15, radius: 2.3, power: 0.55, phase: 4, intensity: 10, distance: 8, brightRadius: 4 });
        wallMount(sb, r, "banner", 2);
        for (let i = 0; i < Math.min(4, Math.floor(area / 10) + 1); i++) inside(sb, r, "bench", 1);
        atWall(sb, r, "planter", 1);
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "chapel"));
        atWall(sb, r, "books", 1).forEach((p) => stock(sb, p, ctx, "library"));
        rug(sb, r);
        if (area >= 30) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        break;
      }
      case "guard":
        atWall(sb, r, "desk", 1);
        atWall(sb, r, "chair", 1);
        atWall(sb, r, "rack", 2);
        wallMount(sb, r, "banner", 1);
        tableSet(sb, r, 2);
        atWall(sb, r, "barrel", 1);
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "guard", { trap: rng.chance(0.12) }));
        break;
      case "cells":
        atWall(sb, r, "cot", Math.max(1, Math.floor(area / 7)));
        atWall(sb, r, "bones", 1);
        atWall(sb, r, "barrel", 1);
        atWall(sb, r, "crate", 1).forEach((p) => stock(sb, p, ctx, "guard"));
        break;
      case "armory":
        atWall(sb, r, "rack", Math.max(2, Math.floor(r.w / 2)));
        atWall(sb, r, "chest", 2).forEach((p) => stock(sb, p, ctx, "guard", { trap: rng.chance(0.2), bonus: 1 }));
        atWall(sb, r, "crate", 2).forEach((p) => stock(sb, p, ctx, "guard"));
        break;
      case "warehouse": {
        const n = Math.max(6, Math.floor(area / 3));
        for (let i = 0; i < n; i++) {
          const p = (rng.chance(0.5) ? atWall : anywhere)(sb, r, rng.pick(["crate", "crate", "barrel", "chest"]), 1)[0];
          if (p) stock(sb, p, ctx, "storage", { trap: p.type === "chest" && rng.chance(0.15) });
        }
        if (big) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        break;
      }
      case "library":
        atWall(sb, r, "books", Math.max(2, Math.floor(r.w / 2))).forEach((p) => stock(sb, p, ctx, "library"));
        atWall(sb, r, "desk", 1);
        atWall(sb, r, "scrolls", 1);
        tableSet(sb, r, 2);
        atWall(sb, r, "planter", 1);
        rug(sb, r);
        break;
      // подземные роли
      case "crypt":
        for (let i = 0; i < Math.max(2, Math.floor(area / 9)); i++) (rng.chance(0.7) ? inside : atWall)(sb, r, rng.chance(0.7) ? "sarcophagus" : "gravestone", 1).forEach((p) => {
          if (p.cat === "sarcophagus" && rng.chance(0.5)) stock(sb, p, ctx, "crypt", { trap: rng.chance(0.35), trapKinds: ["gas", "fire", "needle"] });
        });
        atWall(sb, r, "bones", 2);
        fire(atWall(sb, r, "brazier", 1));
        atWall(sb, r, "pillar", 2);
        break;
      case "guardroom":
        tableSet(sb, r, 3);
        atWall(sb, r, "rack", 1);
        atWall(sb, r, "barrel", 2).forEach((p) => stock(sb, p, ctx, "guard"));
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "guard", { trap: rng.chance(0.25) }));
        atWall(sb, r, "bones", 1);
        fire(atWall(sb, r, "brazier", 1));
        break;
      case "treasure":
        atWall(sb, r, "chest", Math.max(2, Math.floor(area / 10))).forEach((p, i) => stock(sb, p, ctx, "vault", { trap: true, bonus: 1, lockKey: i === 0 ? ctx.vaultKey : void 0 }));
        atWall(sb, r, "pillar", 2);
        fire(atWall(sb, r, "brazier", 2));
        wallMount(sb, r, "banner", 1);
        break;
      case "shrine": {
        const a = atWall(sb, r, "altar", 1);
        if (a[0]) sb.lights.push({ id: "altar", x: a[0].x + 0.5, y: a[0].y + 0.15, radius: 2.3, power: 0.55, phase: 4, intensity: 10, distance: 8, brightRadius: 4 });
        wallMount(sb, r, "banner", 2);
        atWall(sb, r, "pillar", 2);
        atWall(sb, r, "bones", 1);
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "chapel", { trap: rng.chance(0.4) }));
        break;
      }
      case "dungeonlib":
        atWall(sb, r, "books", 2).forEach((p) => stock(sb, p, ctx, "library"));
        atWall(sb, r, "desk", 1);
        atWall(sb, r, "scrolls", 1);
        atWall(sb, r, "bones", 1);
        atWall(sb, r, "crate", 1).forEach((p) => stock(sb, p, ctx, "library", { trap: rng.chance(0.2) }));
        break;
      case "camp":
        fire(atWall(sb, r, "brazier", 1));
        inside(sb, r, "crate", 2).forEach((p) => stock(sb, p, ctx, "camp"));
        inside(sb, r, "barrel", 1).forEach((p) => stock(sb, p, ctx, "camp"));
        atWall(sb, r, "bench", 2);
        break;
      case "courtyard":
        atWall(sb, r, "rack", 2);
        atWall(sb, r, "barrel", 2).forEach((p) => stock(sb, p, ctx, "guard"));
        atWall(sb, r, "crate", 3).forEach((p) => stock(sb, p, ctx, "guard"));
        inside(sb, r, "well", 1);
        wallMount(sb, r, "banner", 3);
        fire(atWall(sb, r, "brazier", 3));
        atWall(sb, r, "cart", 1);
        inside(sb, r, "haystack", 1);
        break;
      case "greathall":
        wallMount(sb, r, "banner", 3);
        fire(atWall(sb, r, "hearth", 2));
        for (let i = 0; i < Math.max(2, Math.floor(area / 16)); i++) tableSet(sb, r, 3);
        atWall(sb, r, "pillar", 2);
        fire(atWall(sb, r, "brazier", 2));
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "vault", { trap: rng.chance(0.25) }));
        sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        rug(sb, r);
        break;
      case "lord":
        atWall(sb, r, "bed", 1);
        atWall(sb, r, "wardrobe", 1).forEach((p) => stock(sb, p, ctx, "bedroom", { bonus: 1 }));
        atWall(sb, r, "desk", 1);
        atWall(sb, r, "chest", 1).forEach((p) => stock(sb, p, ctx, "vault", { trap: true, lockKey: ctx.vaultKey }));
        wallMount(sb, r, "banner", 1);
        fire(atWall(sb, r, "hearth", 1));
        rug(sb, r);
        break;
      default:
        atWall(sb, r, "crate", 1).forEach((p) => stock(sb, p, ctx, "storage"));
    }
  }

  // src/worldgen-look-v1.js
  var P = (list) => list.map(([hex, name]) => ({ hex, name }));
  var PALETTES = {
    skin: P([["#f6dcc3", "\u0424\u0430\u0440\u0444\u043E\u0440"], ["#f2d4b4", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F"], ["#e9bf90", "\u0422\u0451\u043F\u043B\u0430\u044F"], ["#e3bb8a", "\u041F\u0435\u0441\u043E\u0447\u043D\u0430\u044F"], ["#d9a577", "\u0417\u0430\u0433\u0430\u0440"], ["#c58d64", "\u041C\u0435\u0434\u043D\u0430\u044F"], ["#a8714d", "\u0411\u0440\u043E\u043D\u0437\u0430"], ["#8b5b42", "\u041A\u0430\u0448\u0442\u0430\u043D\u043E\u0432\u0430\u044F"], ["#6b4331", "\u0422\u0451\u043C\u043D\u0430\u044F"], ["#4a2f25", "\u042D\u0431\u0435\u043D\u043E\u0432\u0430\u044F"]]),
    hair: P([["#1c1b20", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#26282e", "\u0413\u0440\u0430\u0444\u0438\u0442"], ["#3a2a22", "\u0428\u043E\u043A\u043E\u043B\u0430\u0434"], ["#493024", "\u041A\u0430\u0448\u0442\u0430\u043D"], ["#6a432c", "\u041E\u0440\u0435\u0445"], ["#8a5a34", "\u041C\u0435\u0434\u043E\u0432\u044B\u0439"], ["#a64f35", "\u0420\u044B\u0436\u0438\u0439"], ["#c4622f", "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439"], ["#b7803c", "\u0417\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u0439"], ["#d9b45a", "\u0411\u043B\u043E\u043D\u0434"], ["#e6cf8a", "\u041B\u0451\u043D"], ["#c7c4bf", "\u0421\u0435\u0434\u043E\u0439"], ["#e8e6ee", "\u0411\u0435\u043B\u044B\u0439"], ["#8d8a99", "\u041F\u0435\u043F\u0435\u043B"], ["#4a7fd0", "\u041B\u0430\u0437\u0443\u0440\u044C"], ["#5a3fa8", "\u0418\u043D\u0434\u0438\u0433\u043E"], ["#c05a9a", "\u041C\u0430\u043B\u0438\u043D\u0430"], ["#e07aa8", "\u0420\u043E\u0437\u043E\u0432\u044B\u0439"], ["#3fa58a", "\u0411\u0438\u0440\u044E\u0437\u0430"], ["#5f9a45", "\u041C\u043E\u0445"], ["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#3b6a8a", "\u0421\u0442\u0430\u043B\u044C"]]),
    eye: P([["#14141a", "\u0427\u0451\u0440\u043D\u044B\u0435"], ["#3a2418", "\u0422\u0451\u043C\u043D\u043E-\u043A\u0430\u0440\u0438\u0435"], ["#6a4a22", "\u041A\u0430\u0440\u0438\u0435"], ["#2f5fa8", "\u0421\u0438\u043D\u0438\u0435"], ["#2f7a5a", "\u0417\u0435\u043B\u0451\u043D\u044B\u0435"], ["#6a3fa0", "\u0424\u0438\u0430\u043B\u043A\u043E\u0432\u044B\u0435"], ["#c27a1c", "\u042F\u043D\u0442\u0430\u0440\u043D\u044B\u0435"], ["#8a8f9a", "\u0421\u0435\u0440\u044B\u0435"], ["#b02f3d", "\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0435"]]),
    cloth: P([["#24456b", "\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439"], ["#315e84", "\u0421\u0438\u043D\u0438\u0439"], ["#4a7fb0", "\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439"], ["#2f7a7a", "\u041C\u043E\u0440\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430"], ["#566d70", "\u0421\u043B\u0430\u043D\u0435\u0446"], ["#2d4f2c", "\u0425\u0432\u043E\u044F"], ["#3f6b3b", "\u0417\u0435\u043B\u0451\u043D\u044B\u0439"], ["#487844", "\u0422\u0440\u0430\u0432\u0430"], ["#7a9a4a", "\u041E\u043B\u0438\u0432\u0430"], ["#452361", "\u0418\u043D\u0434\u0438\u0433\u043E"], ["#5d2f7e", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"], ["#62377e", "\u0410\u043C\u0435\u0442\u0438\u0441\u0442"], ["#8a4a9a", "\u041E\u0440\u0445\u0438\u0434\u0435\u044F"], ["#c8688a", "\u0420\u043E\u0437\u0430"], ["#6a2330", "\u0411\u0443\u0440\u0433\u0443\u043D\u0434"], ["#8a2f3c", "\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439"], ["#843f37", "\u041A\u0438\u0440\u043F\u0438\u0447"], ["#b0452f", "\u0422\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u0430"], ["#c7792f", "\u042F\u043D\u0442\u0430\u0440\u044C"], ["#8a6a46", "\u041B\u0435\u043D"], ["#2a2a30", "\u0423\u0433\u043E\u043B\u044C"], ["#6c6c76", "\u0421\u0435\u0440\u044B\u0439"], ["#e6dcc4", "\u041A\u0440\u0435\u043C\u043E\u0432\u044B\u0439"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"]]),
    trim: P([["#d0a94a", "\u0417\u043E\u043B\u043E\u0442\u043E"], ["#c3a04c", "\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"], ["#e8c870", "\u0421\u0432\u0435\u0442\u043B\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"], ["#b6bdc5", "\u0421\u0435\u0440\u0435\u0431\u0440\u043E"], ["#8fa0b0", "\u0421\u0442\u0430\u043B\u044C"], ["#c5b895", "\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C"], ["#78552e", "\u0411\u0440\u043E\u043D\u0437\u0430"], ["#b87333", "\u041C\u0435\u0434\u044C"], ["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#3d8be8", "\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"], ["#4fb58a", "\u0418\u0437\u0443\u043C\u0440\u0443\u0434"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#2a2a30", "\u0427\u0451\u0440\u043D\u044B\u0439"]]),
    leather: P([["#4b3626", "\u0422\u0451\u043C\u043D\u0430\u044F \u043A\u043E\u0436\u0430"], ["#5a3d28", "\u041A\u043E\u0436\u0430"], ["#6a4a30", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F \u043A\u043E\u0436\u0430"], ["#8a6a46", "\u0414\u0443\u0431\u043B\u0451\u043D\u0430\u044F"], ["#2a2a30", "\u0427\u0451\u0440\u043D\u0430\u044F"], ["#3a3a44", "\u0413\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u0430\u044F"], ["#6a2330", "\u041A\u0440\u0430\u0441\u043D\u0430\u044F"], ["#2d4f2c", "\u0417\u0435\u043B\u0451\u043D\u0430\u044F"], ["#24456b", "\u0421\u0438\u043D\u044F\u044F"]]),
    paint: P([["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#3d8be8", "\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"], ["#1a1a1f", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#3f9a5a", "\u0417\u0435\u043B\u0451\u043D\u044B\u0439"], ["#d0a94a", "\u0417\u043E\u043B\u043E\u0442\u043E\u0439"], ["#7a3fa8", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"], ["#e07a2f", "\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439"]]),
    gem: P([["#4aa8f0", "\u0421\u0430\u043F\u0444\u0438\u0440"], ["#e0475a", "\u0420\u0443\u0431\u0438\u043D"], ["#4fd08a", "\u0418\u0437\u0443\u043C\u0440\u0443\u0434"], ["#a86bf0", "\u0410\u043C\u0435\u0442\u0438\u0441\u0442"], ["#f0c040", "\u0422\u043E\u043F\u0430\u0437"], ["#40e0d0", "\u0411\u0438\u0440\u044E\u0437\u0430"], ["#f0f0ff", "\u0410\u043B\u043C\u0430\u0437"], ["#f07ac0", "\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u043A\u0432\u0430\u0440\u0446"]])
  };
  var hexes = (key10) => PALETTES[key10].map((c) => c.hex);
  var L = (list) => list.map(([id, name]) => ({ id, name }));
  var OPTIONS = {
    gender: L([["male", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"], ["female", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"]]),
    ears: L([["round", "\u041E\u0431\u044B\u0447\u043D\u044B\u0435"], ["small", "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435"], ["pointed", "\u041E\u0441\u0442\u0440\u044B\u0435"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0435"]]),
    hairStyle: L([["bald", "\u0411\u0435\u0437 \u0432\u043E\u043B\u043E\u0441"], ["buzz", "\u0401\u0436\u0438\u043A"], ["short", "\u0412\u0437\u044A\u0435\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435"], ["spiky", "\u0428\u0438\u043F\u044B"], ["mohawk", "\u0418\u0440\u043E\u043A\u0435\u0437"], ["sweep", "\u041A\u043E\u0441\u0430\u044F \u0447\u0451\u043B\u043A\u0430"], ["bob", "\u041A\u0430\u0440\u0435"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0435"], ["wavy", "\u0412\u043E\u043B\u043D\u044B"], ["ponytail", "\u0425\u0432\u043E\u0441\u0442"], ["bun", "\u041F\u0443\u0447\u043E\u043A"], ["twin", "\u0414\u0432\u0430 \u0445\u0432\u043E\u0441\u0442\u0430"], ["braid", "\u041A\u043E\u0441\u0430"], ["curly", "\u041A\u0443\u0434\u0440\u0438"]]),
    brows: L([["soft", "\u041C\u044F\u0433\u043A\u0438\u0435"], ["straight", "\u0420\u043E\u0432\u043D\u044B\u0435"], ["angry", "\u0421\u0443\u0440\u043E\u0432\u044B\u0435"], ["raised", "\u041F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435"], ["thick", "\u0413\u0443\u0441\u0442\u044B\u0435"], ["thin", "\u0422\u043E\u043D\u043A\u0438\u0435"], ["sad", "\u041F\u0435\u0447\u0430\u043B\u044C\u043D\u044B\u0435"], ["none", "\u0411\u0435\u0437 \u0431\u0440\u043E\u0432\u0435\u0439"]]),
    eyes: L([["dot", "\u0422\u043E\u0447\u043A\u0438"], ["wide", "\u0428\u0438\u0440\u043E\u043A\u0438\u0435"], ["narrow", "\u0423\u0437\u043A\u0438\u0435"], ["happy", "\u0420\u0430\u0434\u043E\u0441\u0442\u043D\u044B\u0435"], ["sleepy", "\u0421\u043E\u043D\u043D\u044B\u0435"], ["sparkle", "\u0411\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0435"], ["big", "\u0411\u043E\u043B\u044C\u0448\u0438\u0435"]]),
    mouth: L([["smile", "\u0423\u043B\u044B\u0431\u043A\u0430"], ["neutral", "\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439"], ["grin", "\u0423\u0445\u043C\u044B\u043B\u043A\u0430 \u0441 \u0437\u0443\u0431\u0430\u043C\u0438"], ["smirk", "\u0423\u0441\u043C\u0435\u0448\u043A\u0430"], ["open", "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439"], ["cat", "\u041A\u043E\u0448\u0430\u0447\u0438\u0439"], ["frown", "\u0425\u043C\u0443\u0440\u044B\u0439"]]),
    beard: L([["none", "\u0411\u0435\u0437 \u0431\u043E\u0440\u043E\u0434\u044B"], ["stubble", "\u0429\u0435\u0442\u0438\u043D\u0430"], ["mustache", "\u0423\u0441\u044B"], ["goatee", "\u042D\u0441\u043F\u0430\u043D\u044C\u043E\u043B\u043A\u0430"], ["short", "\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F"], ["full", "\u0413\u0443\u0441\u0442\u0430\u044F"], ["long", "\u0414\u043B\u0438\u043D\u043D\u0430\u044F"], ["sideburns", "\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u044B"]]),
    marks: L([["freckles", "\u0412\u0435\u0441\u043D\u0443\u0448\u043A\u0438"], ["blush", "\u0420\u0443\u043C\u044F\u043D\u0435\u0446"], ["scar", "\u0428\u0440\u0430\u043C \u043D\u0430 \u0449\u0435\u043A\u0435"], ["browscar", "\u0428\u0440\u0430\u043C \u043D\u0430 \u0431\u0440\u043E\u0432\u0438"], ["mole", "\u0420\u043E\u0434\u0438\u043D\u043A\u0430"], ["warpaint", "\u0411\u043E\u0435\u0432\u0430\u044F \u0440\u0430\u0441\u043A\u0440\u0430\u0441\u043A\u0430"], ["plaster", "\u041F\u043B\u0430\u0441\u0442\u044B\u0440\u044C \u043D\u0430 \u043D\u043E\u0441\u0443"]]),
    headgear: L([["none", "\u0411\u0435\u0437 \u0443\u0431\u043E\u0440\u0430"], ["hood", "\u041A\u0430\u043F\u044E\u0448\u043E\u043D"], ["wizhat", "\u0428\u043B\u044F\u043F\u0430 \u043C\u0430\u0433\u0430"], ["helm", "\u0428\u043B\u0435\u043C"], ["circlet", "\u0414\u0438\u0430\u0434\u0435\u043C\u0430"], ["headband", "\u041F\u043E\u0432\u044F\u0437\u043A\u0430"], ["cap", "\u0411\u0435\u0440\u0435\u0442 \u0441 \u043F\u0435\u0440\u043E\u043C"], ["crown", "\u041A\u043E\u0440\u043E\u043D\u0430"]]),
    cape: L([["none", "\u0411\u0435\u0437 \u043F\u043B\u0430\u0449\u0430"], ["short", "\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043F\u043B\u0430\u0449"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0449"], ["mantle", "\u041D\u0430\u043A\u0438\u0434\u043A\u0430"]]),
    accessories: L([["earring", "\u0421\u0435\u0440\u044C\u0433\u0430"], ["eyepatch", "\u041F\u043E\u0432\u044F\u0437\u043A\u0430 \u043D\u0430 \u0433\u043B\u0430\u0437"], ["glasses", "\u041E\u0447\u043A\u0438"], ["scarf", "\u0428\u0430\u0440\u0444"], ["amulet", "\u0410\u043C\u0443\u043B\u0435\u0442"], ["bracers", "\u041D\u0430\u0440\u0443\u0447\u0438"]])
  };
  var OUTFITS = {
    fighter: L([["plate", "\u041B\u0430\u0442\u044B"], ["tabard", "\u0421\u044E\u0440\u043A\u043E"], ["leather", "\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"], ["knight", "\u0422\u044F\u0436\u0451\u043B\u044B\u0435 \u043B\u0430\u0442\u044B"]]),
    wizard: L([["robe", "\u041C\u0430\u043D\u0442\u0438\u044F"], ["mantle", "\u0421 \u0432\u043E\u0440\u043E\u0442\u043D\u0438\u043A\u043E\u043C"], ["sash", "\u0421 \u043A\u0443\u0448\u0430\u043A\u043E\u043C"], ["scholar", "\u0423\u0447\u0451\u043D\u044B\u0439 \u0436\u0438\u043B\u0435\u0442"]]),
    rogue: L([["leathers", "\u041A\u043E\u0436\u0430 \u0441 \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u044C\u044E"], ["vest", "\u0416\u0438\u043B\u0435\u0442"], ["tunic", "\u0422\u0443\u043D\u0438\u043A\u0430"], ["studded", "\u041A\u043B\u0451\u043F\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"]]),
    cleric: L([["vestments", "\u041E\u0431\u043B\u0430\u0447\u0435\u043D\u0438\u0435"], ["surplice", "\u0421\u0442\u0438\u0445\u0430\u0440\u044C"], ["mail", "\u041A\u043E\u043B\u044C\u0447\u0443\u0433\u0430"], ["monk", "\u0420\u044F\u0441\u0430 \u0441 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439"]])
  };
  var DEFAULT_OUTFIT = { fighter: "plate", wizard: "robe", rogue: "leathers", cleric: "vestments" };
  var COLOR_FIELDS = { skin: "skin", hair: "hair", hair2: "hair", brow: "hair", eye: "eye", beardColor: "hair", cloth: "cloth", cloth2: "cloth", trim: "trim", leather: "leather", accent: "cloth", hat: "cloth", capeColor: "cloth", gem: "gem", markColor: "paint" };
  var ALLOWED_KEYS = /* @__PURE__ */ new Set(["gender", "ears", "hairStyle", "brows", "eyes", "mouth", "beard", "marks", "headgear", "cape", "accessories", "outfit", "face", "hood", ...Object.keys(COLOR_FIELDS)]);
  var BASE = { ears: "round", eyes: "dot", mouth: "smile", beard: "none", marks: [], headgear: "none", accessories: [], skin: "#e9bf90", hair2: null, brow: null, beardColor: null, cloth2: null, accent: null, hat: null, capeColor: null, markColor: null, eye: "#14141a", trim: "#d0a94a", gem: "#4aa8f0" };
  var CLASS_DEFAULT = {
    fighter: { cloth: "#315e84", leather: "#5a3d28", male: { hair: "#493024", hairStyle: "short", brows: "angry" }, female: { hair: "#d9b45a", hairStyle: "ponytail", brows: "soft" } },
    wizard: { cloth: "#5d2f7e", leather: "#5a3d28", male: { hair: "#c7c4bf", hairStyle: "short", brows: "angry" }, female: { hair: "#c7c4bf", hairStyle: "wavy", brows: "soft" } },
    rogue: { cloth: "#3f6b3b", leather: "#6a4a30", cape: "short", male: { hair: "#26282e", hairStyle: "bun", brows: "angry" }, female: { hair: "#6a432c", hairStyle: "bob", brows: "soft" } },
    cleric: { cloth: "#8a2f3c", leather: "#5a3d28", male: { hair: "#493024", hairStyle: "bald", brows: "angry", beard: "full" }, female: { hair: "#c7c4bf", hairStyle: "long", brows: "soft", headgear: "hood" } }
  };
  function defaultLook(classId, gender = "male") {
    const c = CLASS_DEFAULT[classId] || CLASS_DEFAULT.fighter, g = c[gender === "female" ? "female" : "male"];
    return { ...structuredCopy(BASE), gender: gender === "female" ? "female" : "male", cloth: c.cloth, leather: c.leather, cape: c.cape || "none", outfit: DEFAULT_OUTFIT[classId] || "plate", ...g };
  }
  var structuredCopy = (o) => JSON.parse(JSON.stringify(o));
  function randomLook(classId, gender, rnd = Math.random) {
    const pick = (list) => list[Math.floor(rnd() * list.length)], chance = (p) => rnd() < p;
    const ap = defaultLook(classId, gender), male = gender !== "female";
    ap.skin = pick(hexes("skin"));
    ap.ears = pick(OPTIONS.ears.map((o) => o.id).concat(["round", "round", "round"]));
    ap.hairStyle = pick(OPTIONS.hairStyle.filter((o) => male || o.id !== "bald").map((o) => o.id));
    ap.hair = pick(hexes("hair").slice(0, chance(0.75) ? 14 : 22));
    ap.hair2 = chance(0.18) ? pick(hexes("hair")) : null;
    ap.brows = pick(OPTIONS.brows.slice(0, 7).map((o) => o.id));
    ap.eyes = pick(OPTIONS.eyes.map((o) => o.id));
    ap.mouth = pick(OPTIONS.mouth.map((o) => o.id));
    ap.eye = chance(0.5) ? "#14141a" : pick(hexes("eye"));
    ap.beard = male && chance(0.55) ? pick(OPTIONS.beard.map((o) => o.id)) : "none";
    ap.marks = OPTIONS.marks.map((o) => o.id).filter(() => chance(0.15));
    ap.markColor = ap.marks.includes("warpaint") && chance(0.7) ? pick(hexes("paint")) : null;
    ap.cloth = chance(0.5) ? CLASS_DEFAULT[classId].cloth : pick(hexes("cloth"));
    ap.cloth2 = chance(0.3) ? pick(hexes("cloth")) : null;
    ap.trim = pick(hexes("trim"));
    ap.leather = pick(hexes("leather"));
    ap.gem = pick(hexes("gem"));
    ap.outfit = pick(OUTFITS[classId].map((o) => o.id));
    ap.headgear = chance(0.4) ? pick(OPTIONS.headgear.map((o) => o.id)) : "none";
    ap.hat = ap.headgear !== "none" && chance(0.4) ? pick(hexes("cloth")) : null;
    ap.cape = chance(0.4) ? pick(OPTIONS.cape.map((o) => o.id)) : "none";
    ap.capeColor = ap.cape !== "none" && chance(0.5) ? pick(hexes("cloth")) : null;
    ap.accessories = OPTIONS.accessories.map((o) => o.id).filter(() => chance(0.14)).slice(0, 3);
    ap.accent = chance(0.3) ? pick(hexes("cloth")) : null;
    return ap;
  }

  // src/worldgen-v1/npc.js
  function makeNpc(sb, owner, buildingType, lines, extra = {}) {
    const rng = sb.rng, t = BUILDING_TYPES[buildingType] || BUILDING_TYPES.house, classId = extra.classId || t.cls;
    const look = randomLook(classId, owner.gender, () => rng.next());
    look.beard = owner.gender === "male" && look.beard !== "none" && rng.chance(0.5) ? look.beard : "none";
    look.marks = look.marks.filter((m) => m !== "warpaint");
    look.accessories = look.accessories.filter((a) => a !== "eyepatch" || rng.chance(0.3));
    look.markColor = null;
    const role = extra.role || t.role[owner.gender === "female" ? 1 : 0];
    const hands = buildingType === "guard" || classId === "fighter" && rng.chance(0.5) ? ["sword", "empty"] : ["empty", "empty"];
    return { type: "npc", kind: 20, gen: true, name: `${owner.full} \xB7 ${role}`, npc: { classId, gender: owner.gender, look, hands, lines } };
  }

  // src/worldgen-v1/town.js
  var TOWN_SIZES = {
    small: { W: 40, H: 28, side: [2, 2], npcs: 4, parks: 1, cross: 0 },
    medium: { W: 54, H: 36, side: [3, 4], npcs: 8, parks: 2, cross: 1 },
    large: { W: 68, H: 46, side: [5, 6], npcs: 13, parks: 3, cross: 3 }
  };
  var key2 = (x, y) => x + "," + y;
  function carveStreets(sb, rng, P3) {
    const { W, H } = sb, tw = 3;
    const segs = rng.int(sb.W >= 54 ? 2 : 1, sb.W >= 54 ? 3 : 2), bounds = [1];
    for (let i = 1; i < segs; i++) bounds.push(Math.floor(1 + (W - 2) * i / segs) + rng.int(-3, 3));
    bounds.push(W - 1);
    let y = rng.int(Math.floor(H * 0.38), Math.floor(H * 0.52));
    const ys = [];
    for (let i = 0; i < segs; i++) {
      sb.rect(bounds[i], y, bounds[i + 1] - bounds[i], tw);
      ys.push(y);
      if (i < segs - 1) {
        const ny = Math.max(4, Math.min(H - 4 - tw, y + rng.pick([-1, 1]) * rng.int(3, 5)));
        const x = bounds[i + 1] - 1;
        sb.rect(x, Math.min(y, ny), tw, Math.abs(ny - y) + tw);
        y = ny;
      }
    }
    const mainRows = /* @__PURE__ */ new Set();
    for (let j = 1; j < H - 1; j++) for (let i = 1; i < W - 1; i++) if (sb.isFloor(i, j)) mainRows.add(key2(i, j));
    const n = rng.int(...P3.side), xs = [];
    let tries = 0;
    while (xs.length < n && tries++ < 80) {
      const x = rng.int(5, W - 8);
      if (xs.every((o) => Math.abs(o - x) >= 9)) xs.push(x);
    }
    const streets = [];
    for (const x of xs) {
      const sw = rng.chance(0.5) ? 3 : 2;
      const colRows = [];
      for (let j = 1; j < H - 1; j++) if (mainRows.has(key2(x, j)) && mainRows.has(key2(x + sw - 1, j))) colRows.push(j);
      if (!colRows.length) continue;
      const top = Math.min(...colRows), bot = Math.max(...colRows);
      const up = rng.chance(0.85), down = rng.chance(0.7) || !up;
      if (up) {
        const end = rng.int(2, Math.max(2, top - 4));
        sb.rect(x, end, sw, top - end + 1);
        streets.push({ x, y0: end, y1: top, sw, vertical: true });
      }
      if (down) {
        const end = rng.int(Math.min(H - 3, bot + 5), H - 3);
        sb.rect(x, bot, sw, end - bot + 1);
        streets.push({ x, y0: bot, y1: end, sw, vertical: true });
      }
    }
    for (let c = 0; c < P3.cross; c++) {
      const s = rng.pick(streets.filter((s2) => s2.y1 - s2.y0 >= 6));
      if (!s) continue;
      const yy = rng.int(s.y0 + 2, s.y1 - 3), dir = rng.chance(0.5) ? 1 : -1, len = rng.int(5, 9), x0 = dir > 0 ? s.x + s.sw : s.x - len;
      if (x0 < 2 || x0 + len > W - 2) continue;
      sb.rect(x0, yy, len, 2);
    }
    return { ys, streets, mainRows };
  }
  function centerOf(sb, rect) {
    return [rect.x + Math.floor(rect.w / 2), rect.y + Math.floor(rect.h / 2)];
  }
  function addPlaza(sb, rng, P3, ys) {
    const w = sb.W >= 54 ? rng.int(9, 11) : 8, h = sb.W >= 54 ? rng.int(7, 9) : 6, x = Math.floor(sb.W / 2) - Math.floor(w / 2) + rng.int(-4, 4), yMain = ys[Math.floor(ys.length / 2)];
    const y = yMain + 1 - Math.floor(h / 2);
    const rect = { x: Math.max(2, x), y: Math.max(2, Math.min(sb.H - h - 2, y)), w, h };
    sb.rect(rect.x, rect.y, rect.w, rect.h);
    return rect;
  }
  function addYards(sb, rng, P3, avoid) {
    const yards = [];
    for (let n = 0, tries = 0; n < P3.parks && tries < 60; tries++) {
      const w = rng.int(5, 7), h = rng.int(4, 5), x = rng.int(3, sb.W - w - 3), y = rng.int(3, sb.H - h - 3);
      let touches = 0, overlap3 = false;
      for (let j = y - 1; j <= y + h; j++) for (let i = x - 1; i <= x + w; i++) {
        const inner = i >= x && i < x + w && j >= y && j < y + h;
        if (inner && sb.isFloor(i, j)) overlap3 = true;
        if (!inner && sb.isFloor(i, j)) touches++;
      }
      if (overlap3 || touches < 3 || touches > w + h) continue;
      sb.rect(x, y, w, h);
      yards.push({ x, y, w, h, kind: n === 0 ? "park" : rng.pick(["graveyard", "farm", "park"]) });
      n++;
    }
    return yards;
  }
  function keepLargest(sb, anchor) {
    const seen = /* @__PURE__ */ new Set(), st = [anchor];
    while (st.length) {
      const [x, y] = st.pop(), k = key2(x, y);
      if (seen.has(k) || !sb.isFloor(x, y)) continue;
      seen.add(k);
      for (const [dx, dy] of DIRS) st.push([x + dx, y + dy]);
    }
    for (let y = 0; y < sb.H; y++) for (let x = 0; x < sb.W; x++) if (sb.isFloor(x, y) && !seen.has(key2(x, y))) sb.setFloor(x, y, 0);
  }
  function lotFree(sb, lots, x, y, dx, dy, depth = 4, half = 2) {
    const px = dy ? 1 : 0, py = dx ? 1 : 0, cells = [];
    for (let k = 0; k <= depth; k++) for (let s = -half; s <= half; s++) {
      const cx3 = x + dx * k + px * s, cy3 = y + dy * k + py * s;
      if (!sb.inb(cx3, cy3) || cx3 < 1 || cy3 < 1 || cx3 > sb.W - 2 || cy3 > sb.H - 2) return null;
      if (k > 0 && sb.isFloor(cx3, cy3)) return null;
      if (lots.has(key2(cx3, cy3))) return null;
      cells.push(key2(cx3, cy3));
    }
    return cells;
  }
  function genTown(plan, tryIndex = 0) {
    const P3 = TOWN_SIZES[plan.size], rng = new Rng(plan.seed + "/town").fork("try" + tryIndex), sb = new SceneBuilder("town", plan.name, P3.W + rng.int(-3, 6), P3.H + rng.int(-2, 4), rng, { type: "town", seed: plan.seed });
    const { ys, streets } = carveStreets(sb, rng, P3);
    const plaza = addPlaza(sb, rng, P3, ys), yards = addYards(sb, rng, P3);
    const mainY = ys[ys.length - 1];
    keepLargest(sb, [plaza.x + 1, plaza.y + 1]);
    sb.anchor = centerOf(sb, plaza);
    const [px, py] = sb.anchor;
    const gate = sb.findPortalSpot(sb.W - 1, mainY + 1, (x, y, s) => x === sb.W - 1 && s.front[0] === sb.W - 2);
    if (!gate) return null;
    sb.addPortal(gate, plan.gateDest, "\u0412\u043E\u0440\u043E\u0442\u0430 \u043D\u0430 \u0434\u043E\u0440\u043E\u0433\u0443", { id: "gate" });
    const lots = /* @__PURE__ */ new Set(), doors = [], placed = [];
    const sites = [];
    for (let y = 1; y < sb.H - 1; y++) for (let x = 1; x < sb.W - 1; x++) {
      const s = sb.doorSpot(x, y);
      if (!s) continue;
      const [fx, fy] = s.front, dx = x - fx, dy = y - fy;
      if (sb.reserved.has(key2(fx, fy))) continue;
      sites.push({ x, y, axis: s.axis, front: s.front, dx, dy });
    }
    const inPlaza = (x, y) => x >= plaza.x - 1 && y >= plaza.y - 1 && x < plaza.x + plaza.w + 1 && y < plaza.y + plaza.h + 1;
    const dest = (b) => b.type === "tavern" || b.type === "shop" || b.type === "alchemist" || b.type === "library" ? [px, py] : b.type === "cottage" || b.type === "guard" ? [sb.W - 3, mainY + 1] : b.type === "chapel" ? [px, py + 3] : [px + rng.int(-14, 14), py + rng.int(-8, 8)];
    for (const b of plan.buildings) {
      const want = dest(b), pool = rng.shuffle(sites).filter((s) => !doors.some((d) => Math.hypot(d.x - s.x, d.y - s.y) < 4.5) && !(b.type !== "tavern" && b.type !== "shop" && b.type !== "alchemist" && inPlaza(s.front[0], s.front[1]) && rng.chance(0.5)));
      pool.sort((a, c) => Math.hypot(a.x - want[0], a.y - want[1]) - Math.hypot(c.x - want[0], c.y - want[1]) + rng.int(-3, 3));
      for (const s of pool) {
        const cells = lotFree(sb, lots, s.x, s.y, s.dx, s.dy);
        if (!cells) continue;
        cells.forEach((c) => lots.add(c));
        const spot = { x: s.x, y: s.y, axis: s.axis, front: s.front };
        const p = sb.addPortal(spot, b.id, b.name, { id: "door-" + b.id, building: b.type });
        doors.push(p);
        placed.push(b.id);
        b.door = [s.x, s.y];
        break;
      }
    }
    for (const b of plan.buildings) if (b.door && ["tavern", "smithy", "alchemist", "shop", "library"].includes(b.type)) {
      const [x, y] = b.door, cand = (b.door && [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]).filter(([a, c]) => sb.isWall(a, c) && !sb.props.some((p) => p.x === a && p.y === c) && DIRS.some(([dx, dy]) => sb.isFloor(a + dx, c + dy) && !sb.reserved.has(key2(a + dx, c + dy))));
      if (cand.length) {
        const [a, c] = rng.pick(cand);
        sb.props.push({ id: "sign-" + b.id, x: a, y: c, type: "banner", kind: 24, solid: false, name: "\u0412\u044B\u0432\u0435\u0441\u043A\u0430: " + b.name, description: b.name });
      }
    }
    const pr = { x: plaza.x + 1, y: plaza.y + 1, w: plaza.w - 2, h: plaza.h - 2 };
    const center = sb.put(mk(sb, rng.chance(0.5) ? "well" : "fountain"), px, py);
    if (center) center.cat === "well" && (center.description = "\u041A\u043E\u043B\u043E\u0434\u0435\u0446 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435 \u043F\u043B\u043E\u0449\u0430\u0434\u0438. \u0412\u043E\u0434\u0430 \u0445\u043E\u043B\u043E\u0434\u043D\u0430\u044F \u0438 \u0447\u0438\u0441\u0442\u0430\u044F.");
    atWall(sb, plaza, "stall", plan.size === "small" ? 2 : 4);
    atWall(sb, plaza, "bench", 2);
    anywhere(sb, pr, "planter", 2);
    atWall(sb, plaza, "signpost", 1);
    atWall(sb, plaza, "barrel", 2).forEach((p) => stock(sb, p, { depth: 0 }, "storage"));
    atWall(sb, plaza, "crate", 2).forEach((p) => stock(sb, p, { depth: 0 }, "storage"));
    for (const y of yards) {
      if (y.kind === "park") {
        anywhere(sb, y, "tree", rng.int(3, 5));
        anywhere(sb, y, "bush", 2);
        atWall(sb, y, "bench", 1);
      }
      if (y.kind === "graveyard") {
        anywhere(sb, y, "gravestone", rng.int(4, 7));
        anywhere(sb, y, "tree", 1);
        atWall(sb, y, "bones", 1);
      }
      if (y.kind === "farm") {
        anywhere(sb, y, "haystack", 2);
        anywhere(sb, y, "cart", 1);
        atWall(sb, y, "barrel", 2).forEach((p) => stock(sb, p, { depth: 0 }, "camp"));
        anywhere(sb, y, "crate", 1).forEach((p) => stock(sb, p, { depth: 0 }, "camp"));
      }
    }
    const all = sb.floorCells();
    const edge = rng.shuffle(all.filter(([x, y]) => !inPlaza(x, y)));
    let cnt = 0;
    for (const [x, y] of edge) {
      if (cnt >= Math.floor(all.length / 55)) break;
      if (!DIRS.some(([dx, dy]) => !sb.isFloor(x + dx, y + dy))) continue;
      const k = rng.pick(["crate", "barrel", "barrel", "cart", "tree", "bush", "signpost"]);
      const p = sb.put(mk(sb, k), x, y);
      if (p) {
        if (p.container || k === "crate" || k === "barrel") stock(sb, p, { depth: 0, trapChance: 0.05 }, "storage", { trap: rng.chance(0.07) });
        cnt++;
      }
    }
    const lampCells = rng.shuffle(all.filter(([x, y]) => Math.hypot(x - px, y - py) > 0));
    const lamps = [];
    const maxL = plan.size === "small" ? 10 : plan.size === "medium" ? 16 : 22;
    for (const [x, y] of lampCells) {
      if (lamps.length >= maxL) break;
      if (lamps.every(([a, b]) => Math.hypot(a - x, b - y) > 7.5)) lamps.push([x, y]);
    }
    lamps.forEach(([x, y]) => sb.light(x + 0.5, y + 0.5, { radius: 3.4, power: 0.5, intensity: 10, distance: 9 }));
    sb.light(px + 0.5, py + 0.5, { radius: 4, power: 0.55, intensity: 12, distance: 10 });
    const classes = ["fighter", "rogue", "wizard", "cleric"];
    for (let i = 0; i < P3.npcs; i++) {
      const g = rng.pick(["male", "female"]), who = person(rng.fork("p" + i), g), kind = rng.pick(["street", "street", "street", "street"]);
      const lines = dialogueFor(rng.fork("t" + i), "street", who, plan.facts || []), n = makeNpc(sb, who, "house", lines, { classId: i < 2 ? "fighter" : classes[i % 4], role: i < 2 ? "\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A" : rng.pick(["\u043F\u0440\u043E\u0445\u043E\u0436\u0438\u0439", "\u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446", "\u043F\u0443\u0442\u043D\u0438\u043A", "\u0440\u0435\u043C\u0435\u0441\u043B\u0435\u043D\u043D\u0438\u043A", "\u0433\u043E\u0440\u043E\u0436\u0430\u043D\u0438\u043D"]) });
      if (i < 2) n.npc.hands = ["sword", "empty"];
      const cs = i < 2 ? [[sb.W - 3, mainY], [sb.W - 3, mainY + 2]] : rng.shuffle(all.filter(([x, y]) => !sb.reserved.has(key2(x, y))));
      for (const [x, y] of cs) {
        if (sb.put({ ...n, id: "npc" + i }, x, y)) break;
      }
    }
    const scene = sb.finish([px, py + (plaza.h > 4 ? 1 : 0)]);
    scene.gen.placed = placed;
    scene.gen.plaza = plaza;
    return scene;
  }

  // src/worldgen-v1/buildings.js
  var SIZES = { keep: [16, 20, 11, 14], lordhall: [14, 18, 9, 11], house: [7, 10, 6, 8], cottage: [6, 7, 5, 6], tavern: [13, 16, 9, 11], smithy: [9, 11, 7, 8], alchemist: [8, 10, 6, 7], shop: [8, 10, 6, 8], chapel: [9, 12, 8, 10], guard: [10, 12, 7, 9], warehouse: [11, 14, 8, 10], library: [9, 12, 7, 8] };
  var ROLES = { keep: ["greathall", "guardroom", "armory", "kitchen", "storage", "library"], lordhall: ["lord", "bedroom", "treasure", "library", "bedroom"], house: ["living", "bedroom", "kitchen"], cottage: ["living", "bedroom"], tavern: ["hall", "kitchen", "storage"], smithy: ["smithy", "storage"], alchemist: ["alchemy", "living"], shop: ["shop", "storage"], chapel: ["chapel", "storage"], guard: ["guard", "cells", "armory"], warehouse: ["warehouse", "storage"], library: ["library", "living"] };
  var sizeOf = (type) => SIZES[type] || SIZES.house;
  function partition(rng, rect, n, minW = 3, minH = 3) {
    const leaves = [{ ...rect }], splits = [];
    let guard = 0;
    while (leaves.length < n && guard++ < 80) {
      leaves.sort((a, b) => b.w * b.h - a.w * a.h);
      const L3 = leaves.find((l) => l.w >= minW * 2 + 1 || l.h >= minH * 2 + 1);
      if (!L3) break;
      const canV = L3.w >= minW * 2 + 1, canH = L3.h >= minH * 2 + 1, vertical = canV && (!canH || (L3.w / L3.h > 1 ? rng.chance(0.8) : rng.chance(0.25)));
      if (vertical) {
        const c = rng.int(minW, L3.w - minW - 1);
        leaves.splice(leaves.indexOf(L3), 1, { x: L3.x, y: L3.y, w: c, h: L3.h }, { x: L3.x + c + 1, y: L3.y, w: L3.w - c - 1, h: L3.h });
        splits.push({ vertical: true, g: L3.x + c, a: L3.y, b: L3.y + L3.h - 1 });
      } else {
        const c = rng.int(minH, L3.h - minH - 1);
        leaves.splice(leaves.indexOf(L3), 1, { x: L3.x, y: L3.y, w: L3.w, h: c }, { x: L3.x, y: L3.y + c + 1, w: L3.w, h: L3.h - c - 1 });
        splits.push({ vertical: false, g: L3.y + c, a: L3.x, b: L3.x + L3.w - 1 });
      }
    }
    return { leaves, splits };
  }
  function cutDoors(sb, splits, doorOpts = () => ({})) {
    const doors = [];
    for (const s of splits) {
      const cand = [];
      for (let t = s.a; t <= s.b; t++) {
        const [x2, y2] = s.vertical ? [s.g, t] : [t, s.g], f1 = s.vertical ? sb.isFloor(x2 - 1, y2) : sb.isFloor(x2, y2 - 1), f2 = s.vertical ? sb.isFloor(x2 + 1, y2) : sb.isFloor(x2, y2 + 1);
        const n1 = s.vertical ? sb.isFloor(x2, y2 - 1) : sb.isFloor(x2 - 1, y2), n2 = s.vertical ? sb.isFloor(x2, y2 + 1) : sb.isFloor(x2 + 1, y2);
        if (f1 && f2 && !n1 && !n2) cand.push([x2, y2]);
      }
      if (!cand.length) return null;
      const [x, y] = sb.rng.pick(cand);
      sb.setFloor(x, y);
      doors.push({ x, y, axis: s.vertical ? "horizontal" : void 0 });
    }
    return doors;
  }
  var oneSide = (sb, x, y) => !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y));
  var inRect = (r, [x, y]) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;
  function lightRooms(sb, rooms) {
    for (const r of rooms) {
      const a = r.w * r.h, n = a >= 36 ? 3 : a >= 20 ? 2 : 1;
      for (let i = 0; i < n; i++) sb.light(r.x + (i + 1) * r.w / (n + 1), r.y + (i % 2 ? 0.35 : 0.65) * r.h, { radius: 3.3, power: 0.55 });
    }
  }
  function genBuilding(spec, plan) {
    const rngBase = new Rng(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 24; attempt++) {
      const rng = rngBase.fork("try" + attempt), [w0, w1, h0, h1] = spec.dims || sizeOf(spec.type), w = rng.int(w0, w1), h = rng.int(h0, h1), W = w + 2, H = h + 2;
      const sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: spec.type, building: spec.id, seed: plan.seed });
      const roles = spec.roles || ROLES[spec.type] || ["living"], { leaves, splits } = partition(rng, { x: 1, y: 1, w, h }, roles.length);
      for (const l of leaves) sb.rect(l.x, l.y, l.w, l.h);
      const doors = cutDoors(sb, splits);
      if (!doors) continue;
      const south = leaves.filter((l) => l.y + l.h === h + 1).sort((a, b) => b.w * b.h - a.w * a.h), main = south[0] || leaves[0];
      const rooms = /* @__PURE__ */ new Map([[main, roles[0]]]);
      const rest = leaves.filter((l) => l !== main).sort((a, b) => b.w * b.h - a.w * a.h);
      rest.forEach((l, i) => rooms.set(l, roles[i + 1] || "storage"));
      const xs = [];
      for (let x = main.x + (main.w > 2 ? 1 : 0); x < main.x + main.w - (main.w > 2 ? 1 : 0); x++) xs.push(x);
      let entry = null;
      for (const x of rng.shuffle(xs)) {
        const s = sb.doorSpot(x, H - 1);
        if (s) {
          entry = { x, y: H - 1, ...s };
          break;
        }
      }
      if (!entry) continue;
      sb.anchor = entry.front;
      sb.addPortal(entry, spec.parent, spec.exitLabel || "\u0412\u044B\u0445\u043E\u0434 \u043D\u0430 \u0443\u043B\u0438\u0446\u0443", { id: "exit" });
      for (const d of doors) {
        const dr = sb.addDoor(d.x, d.y, d.axis, "\u0414\u0432\u0435\u0440\u044C");
        dr.lockable = true;
      }
      const stairs = (dest, label, room, id) => {
        const spot = sb.findPortalSpot(room.x + room.w / 2, room.y + room.h / 2, (x, y, s) => inRect(room, s.front) && y !== H - 1 && oneSide(sb, x, y));
        if (!spot) return false;
        sb.addPortal(spot, dest, label, { id });
        return true;
      };
      const roomOf = (role) => [...rooms].find(([, r]) => r === role)?.[0];
      if (spec.cellar && !stairs(spec.cellar, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432 \u043F\u043E\u0434\u0432\u0430\u043B", roomOf("kitchen") || roomOf("storage") || roomOf("living") || main, "stairs-down")) continue;
      if (spec.up && !stairs(spec.up, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445", main, "stairs-up")) continue;
      if (spec.lockRoom) {
        const dd = sb.props.filter((p) => p.type === "door" && p.lockable);
        const d = dd[dd.length - 1];
        if (d && dd.length > 1) d.lock = { pickDc: 12 + (plan.depthBonus || 0), forceDc: 14, key: spec.lockKey || null, gen: true }, d.name = "\u0417\u0430\u043F\u0435\u0440\u0442\u0430\u044F \u0434\u0432\u0435\u0440\u044C";
      }
      const ctx = { depth: spec.depth || 0, trapChance: spec.trapChance ?? 0.08, vaultKey: spec.vaultKey };
      for (const [l, role] of rooms) furnish(sb, role, l, ctx);
      lightRooms(sb, rooms.keys());
      const lines = dialogueFor(rng.fork("talk"), spec.type, spec.owner, spec.facts || [], spec.topic);
      const cells = roomCells(sb, main).filter(([x, y]) => Math.abs(x - entry.x) + Math.abs(y - entry.y) > 2);
      if (spec.owner) {
        const npcSpec = makeNpc(sb, spec.owner, spec.type, lines);
        for (const [x, y] of rng.shuffle(cells)) {
          if (sb.put({ ...npcSpec, id: "owner" }, x, y)) break;
        }
      }
      for (let i = 0; i < (spec.extraNpcs || 0); i++) {
        const g = rng.pick(["male", "female"]), p = { first: "\u0413\u043E\u0441\u0442\u044C", genitive: "\u0413\u043E\u0441\u0442\u044F", full: spec.guestNames?.[i] || "\u0413\u043E\u0441\u0442\u044C", gender: g }, n = makeNpc(sb, p, "house", dialogueFor(rng.fork("g" + i), "house", p, spec.facts || []), { role: "\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C" });
        for (const [x, y] of rng.shuffle(cells)) if (sb.put({ ...n, id: "guest" + i }, x, y)) break;
      }
      for (const key10 of spec.keysHere || []) hideKey(sb, key10);
      addWindows(sb, rng, Math.max(1, Math.floor((w + h) / 6)));
      return sb.finish([entry.front[0], entry.front[1]]);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0437\u0434\u0430\u043D\u0438\u0435 " + spec.id);
  }
  function hideKey(sb, key10) {
    const cs = sb.props.filter((p) => p.container && p.loot && !p.lock);
    const c = sb.rng.pick(cs.length ? cs : [null]);
    if (c) {
      c.loot.gear.push(key10);
      return true;
    }
    for (const [x, y] of sb.rng.shuffle(sb.floorCells())) {
      const p = sb.put({ type: "crate", kind: 24, name: "\u042F\u0449\u0438\u043A", cat: "crate", description: "\u042F\u0449\u0438\u043A \u0441 \u043E\u0442\u043C\u0435\u0442\u043A\u0430\u043C\u0438 \u043C\u0435\u043B\u043E\u043C.", gen: true, container: true, loot: { gold: 0, potions: 0, torches: 0, gear: [key10] } }, x, y);
      if (p) return true;
    }
    return false;
  }
  function addWindows(sb, rng, n) {
    const used = new Set(sb.props.map((p) => p.x + "," + p.y));
    let placed = 0;
    const cand = [];
    for (let y = 0; y < sb.H; y++) for (let x = 0; x < sb.W; x++) if (sb.isWall(x, y) && !used.has(x + "," + y) && (x === 0 || y === 0 || x === sb.W - 1 || y === sb.H - 1) && DIRS.some(([dx, dy]) => sb.isFloor(x + dx, y + dy) && !sb.occ.has(x + dx + "," + (y + dy)))) cand.push([x, y]);
    for (const [x, y] of rng.shuffle(cand)) {
      if (placed >= n) break;
      if (sb.props.some((p) => p.solid === false && Math.abs(p.x - x) + Math.abs(p.y - y) < 3)) continue;
      sb.props.push({ id: sb.nid("window"), x, y, kind: 22, name: "\u041E\u043A\u043D\u043E", type: "decor", solid: false });
      placed++;
    }
  }
  function genCellar(spec, plan) {
    const rngBase = new Rng(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 24; attempt++) {
      const rng = rngBase.fork("try" + attempt), w = rng.int(8, 12), h = rng.int(6, 9), n = rng.int(1, 3), W = w + 2, H = h + 2;
      const sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: "cellar", building: spec.parent, seed: plan.seed });
      const { leaves, splits } = partition(rng, { x: 1, y: 1, w, h }, n);
      for (const l of leaves) sb.rect(l.x, l.y, l.w, l.h);
      const doors = cutDoors(sb, splits);
      if (!doors) continue;
      const main = leaves.slice().sort((a, b) => b.w * b.h - a.w * a.h)[0];
      const spot = sb.findPortalSpot(main.x + main.w / 2, main.y, (x, y, s) => inRect(main, s.front) && oneSide(sb, x, y));
      if (!spot) continue;
      sb.anchor = spot.front;
      sb.addPortal(spot, spec.parent, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445", { id: "stairs-up" });
      for (const d of doors) sb.addDoor(d.x, d.y, d.axis, "\u0414\u0432\u0435\u0440\u044C");
      const ctx = { depth: 1, trapChance: 0.18, vaultKey: spec.vaultKey };
      leaves.forEach((l, i) => furnish(sb, i === 0 && spec.stash ? "storage" : "cellar", l, ctx));
      if (spec.stash) {
        const room = leaves[leaves.length - 1], chest = sb.rng.chance(0.5) ? null : null;
        void chest;
        const c = [...roomCells(sb, room)].sort(() => rng.next() - 0.5).map(([x, y]) => sb.put({ type: "chest", kind: 17, name: "\u0422\u0430\u0439\u043D\u0438\u043A", cat: "chest", description: "\u0421\u0443\u043D\u0434\u0443\u043A \u0437\u0430\u0434\u0432\u0438\u043D\u0443\u0442 \u0432 \u0441\u0430\u043C\u044B\u0439 \u0442\u0451\u043C\u043D\u044B\u0439 \u0443\u0433\u043E\u043B.", rot: 0 }, x, y)).find(Boolean);
        if (c) {
          c.gen = true;
          c.container = true;
          c.loot = { gold: rng.int(30, 70), potions: 1, torches: 0, gear: [] };
          c.lock = { pickDc: 14, forceDc: 16, key: spec.stash.key };
          c.trap = { kind: "needle", name: "\u042F\u0434\u043E\u0432\u0438\u0442\u0430\u044F \u0438\u0433\u043B\u0430", save: "con", dc: 13, detectDc: 13, disarmDc: 13, dice: 1, sides: 4, poison: true, alarm: false, text: "\u0418\u0437 \u0437\u0430\u043C\u043A\u0430 \u0432\u044B\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u0438\u0433\u043B\u0430 \u0441 \u044F\u0434\u043E\u043C.", hint: "\u0420\u044F\u0434\u043E\u043C \u0441 \u0437\u0430\u043C\u043E\u0447\u043D\u043E\u0439 \u0441\u043A\u0432\u0430\u0436\u0438\u043D\u043E\u0439 \u0432\u0438\u0434\u0435\u043D \u043A\u0440\u043E\u0448\u0435\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u043A\u043E\u043B." };
          c.description += " \u0417\u0430\u043F\u0435\u0440\u0442.";
        }
      }
      lightRooms(sb, leaves);
      for (const key10 of spec.keysHere || []) hideKey(sb, key10);
      return sb.finish(spot.front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u043E\u0434\u0432\u0430\u043B " + spec.id);
  }
  function genUpper(spec, plan) {
    const rngBase = new Rng(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 24; attempt++) {
      const rng = rngBase.fork("try" + attempt), cols = rng.int(2, 4), cw = rng.int(4, 5), w = cols * (cw + 1) - 1, W = w + 2, H = 1 + 4 + 1 + 2 + 1 + 4 + 1;
      const sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: "upper", building: spec.parent, seed: plan.seed });
      sb.rect(1, 6, w, 2);
      const rooms = [];
      for (let c = 0; c < cols; c++) {
        const x = 1 + c * (cw + 1);
        for (const [y, h] of [[1, 4], [9, 4]]) {
          if (!rng.chance(c === 0 || y === 1 ? 0.95 : 0.8)) continue;
          sb.rect(x, y, cw, h);
          rooms.push({ x, y, w: cw, h });
        }
      }
      for (const r of rooms) {
        const dx = rng.int(r.x + 1, r.x + r.w - 2), dy = r.y < 6 ? 5 : 8;
        if (sb.isFloor(dx, dy - (r.y < 6 ? 0 : 0))) continue;
        sb.setFloor(dx, dy);
        if (!sb.isFloor(dx, dy + (r.y < 6 ? 1 : -1))) {
          sb.setFloor(dx, dy, 0);
          continue;
        }
        r.door = [dx, dy];
      }
      const valid = rooms.filter((r) => r.door);
      if (!valid.length) continue;
      const spot = sb.findPortalSpot(1, 6.5, (x, y, s) => x === 0 && s.front[0] === 1 && s.front[1] >= 6 && s.front[1] <= 7);
      if (!spot) continue;
      sb.anchor = spot.front;
      sb.addPortal(spot, spec.parent, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u043D\u0438\u0437", { id: "stairs-down" });
      for (const r of valid) sb.addDoor(r.door[0], r.door[1], void 0, "\u0414\u0432\u0435\u0440\u044C \u043A\u043E\u043C\u043D\u0430\u0442\u044B", { lockable: true });
      for (const r of rooms.filter((r2) => !r2.door)) for (let j = r.y; j < r.y + r.h; j++) for (let i = r.x; i < r.x + r.w; i++) sb.setFloor(i, j, 0);
      const ctx = { depth: 0, trapChance: 0.1 };
      for (const r of valid) {
        furnish(sb, "bedroom", r, ctx);
      }
      sb.rect(0, 0, 0, 0);
      const cor = { x: 1, y: 6, w, h: 2 };
      sb.put({ type: "planter", kind: 24, name: "\u041A\u0430\u0434\u043A\u0430 \u0441 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u0435\u043C", description: "\u0420\u0430\u0441\u0442\u0435\u043D\u0438\u0435 \u0434\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0441\u0438\u0442 \u0432\u043E\u0434\u044B.", cat: "planter" }, w, 6) || null;
      void cor;
      lightRooms(sb, [...valid, { x: 1, y: 6, w, h: 2 }]);
      const doors = sb.props.filter((p) => p.type === "door");
      if (doors.length > 1 && spec.lockRoom) {
        const d = doors[rng.int(0, doors.length - 1)];
        d.lock = { pickDc: 12, forceDc: 14, key: null, gen: true };
        d.name = "\u0417\u0430\u043F\u0435\u0440\u0442\u0430\u044F \u0434\u0432\u0435\u0440\u044C";
      }
      for (const key10 of spec.keysHere || []) hideKey(sb, key10);
      return sb.finish(spot.front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044D\u0442\u0430\u0436 " + spec.id);
  }

  // src/worldgen-v1/dungeon.js
  var SIZES2 = { small: [38, 26, 5, 7], medium: [48, 32, 8, 11], large: [58, 38, 11, 15] };
  var key3 = (x, y) => x + "," + y;
  var overlap = (a, b, m = 2) => a.x - m < b.x + b.w && a.x + a.w + m > b.x && a.y - m < b.y + b.h && a.y + a.h + m > b.y;
  var cx = (r) => Math.floor(r.x + r.w / 2);
  var cy = (r) => Math.floor(r.y + r.h / 2);
  function corridor(sb, a, b, rng) {
    let x = cx(a), y = cy(a);
    const tx = cx(b), ty = cy(b), horizFirst = rng.chance(0.5), cells = [];
    const stepX = () => {
      while (x !== tx) {
        x += Math.sign(tx - x);
        cells.push([x, y]);
      }
    }, stepY = () => {
      while (y !== ty) {
        y += Math.sign(ty - y);
        cells.push([x, y]);
      }
    };
    horizFirst ? (stepX(), stepY()) : (stepY(), stepX());
    cells.forEach(([i, j]) => sb.setFloor(i, j));
    return cells;
  }
  var ROLE_POOL = [["crypt", 3], ["guardroom", 3], ["shrine", 1.5], ["dungeonlib", 1.5], ["camp", 1], ["storage", 2], ["cells", 1.5]];
  function genDungeon(spec, plan) {
    const [W0, H0, n0, n1] = SIZES2[plan.size], rngBase = new Rng(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 30; attempt++) {
      const rng = rngBase.fork("try" + attempt), W = W0 + rng.int(-4, 8), H = H0 + rng.int(-3, 6), sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: "dungeon", level: spec.level, seed: plan.seed }), rooms = [];
      const target = rng.int(n0, n1) + (spec.level > 1 ? 1 : 0);
      for (let t = 0; t < 400 && rooms.length < target; t++) {
        const w = rng.int(4, 9), h = rng.int(4, 7), r = { x: rng.int(3, W - w - 3), y: rng.int(3, H - h - 3), w, h };
        if (rooms.every((o) => !overlap(r, o, 2))) rooms.push(r);
      }
      if (rooms.length < 3) continue;
      rooms.sort((a, b) => a.x - b.x);
      for (const r of rooms) sb.rect(r.x, r.y, r.w, r.h);
      const links = [];
      for (let i = 1; i < rooms.length; i++) {
        const near = rooms.slice(0, i).sort((a, b) => Math.hypot(cx(a) - cx(rooms[i]), cy(a) - cy(rooms[i])) - Math.hypot(cx(b) - cx(rooms[i]), cy(b) - cy(rooms[i])))[0];
        links.push([near, rooms[i], corridor(sb, near, rooms[i], rng)]);
      }
      for (let k = 0; k < Math.floor(rooms.length / 4); k++) {
        const a = rng.pick(rooms), b = rng.pick(rooms);
        if (a !== b) links.push([a, b, corridor(sb, a, b, rng)]);
      }
      const entryRoom = rooms[0], exitRoom = rooms.slice().sort((a, b) => Math.hypot(cx(b) - cx(entryRoom), cy(b) - cy(entryRoom)) - Math.hypot(cx(a) - cx(entryRoom), cy(a) - cy(entryRoom)))[0];
      const inR = (r, [x, y]) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h, oneSide3 = (x, y) => !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y));
      const up = sb.findPortalSpot(cx(entryRoom), entryRoom.y, (x, y, s) => inR(entryRoom, s.front) && oneSide3(x, y));
      if (!up) continue;
      sb.anchor = up.front;
      sb.addPortal(up, spec.up, spec.level === 1 ? "\u0412\u044B\u0445\u043E\u0434 \u043D\u0430\u0440\u0443\u0436\u0443" : "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445", { id: "up" });
      let down = null;
      if (spec.down) {
        down = sb.findPortalSpot(cx(exitRoom), exitRoom.y + exitRoom.h, (x, y, s) => inR(exitRoom, s.front) && oneSide3(x, y) && Math.hypot(x - up.x, y - up.y) > 5);
        if (!down) continue;
        sb.addPortal(down, spec.down, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u043D\u0438\u0437", { id: "down" });
      }
      for (const r of rooms) {
        const ring = [];
        for (let x = r.x; x < r.x + r.w; x++) {
          ring.push([x, r.y - 1, "v"]);
          ring.push([x, r.y + r.h, "v"]);
        }
        for (let y = r.y; y < r.y + r.h; y++) {
          ring.push([r.x - 1, y, "h"]);
          ring.push([r.x + r.w, y, "h"]);
        }
        for (const [x, y, o] of ring) {
          if (!sb.isFloor(x, y) || sb.props.some((p) => p.x === x && p.y === y) || !rng.chance(0.7)) continue;
          const sideA = o === "v" ? [x - 1, y] : [x, y - 1], sideB = o === "v" ? [x + 1, y] : [x, y + 1];
          if (sb.isFloor(...sideA) || sb.isFloor(...sideB)) continue;
          if (sb.props.some((p) => Math.abs(p.x - x) + Math.abs(p.y - y) < 2 && p.type === "door")) continue;
          const d = sb.addDoor(x, y, o === "v" ? void 0 : "horizontal", "\u0414\u0432\u0435\u0440\u044C");
          d.lockable = true;
          if (rng.chance(0.18 + spec.level * 0.04)) {
            d.lock = { pickDc: 12 + spec.level, forceDc: 14 + spec.level, key: null, gen: true };
            d.name = "\u0417\u0430\u043F\u0435\u0440\u0442\u0430\u044F \u0434\u0432\u0435\u0440\u044C";
          }
        }
      }
      const mid = rooms.filter((r) => r !== entryRoom && r !== exitRoom), roles = /* @__PURE__ */ new Map();
      const ctx = { depth: spec.level + (plan.depthBonus || 0), trapChance: 0.15 + spec.level * 0.05, vaultKey: spec.vaultKey };
      if (spec.vault) roles.set(exitRoom, "treasure");
      else if (spec.down) roles.set(exitRoom, "shrine");
      else roles.set(exitRoom, "crypt");
      roles.set(entryRoom, spec.level === 1 ? "camp" : "guardroom");
      for (const r of mid) roles.set(r, rng.weighted(ROLE_POOL));
      for (const [r, role] of roles) {
        try {
          furnish(sb, role, r, ctx);
        } catch {
        }
      }
      for (const r of rooms) sb.light(cx(r) + 0.5, cy(r) + 0.5, { radius: 3.2, power: 0.5, intensity: 8, distance: 7 });
      sb.traps = [];
      const corrCells = rng.shuffle(links.flatMap((l) => l[2])).filter(([x, y]) => !sb.occ.has(key3(x, y)) && !sb.props.some((p) => p.x === x && p.y === y) && !sb.reserved.has(key3(x, y)) && !rooms.some((r) => inR(r, [x, y])) && DIRS.filter(([dx, dy]) => sb.isFloor(x + dx, y + dy)).length === 2);
      const nTraps = Math.min(corrCells.length, rng.int(1, 2 + spec.level + (plan.size === "large" ? 2 : 0)));
      for (const [x, y] of corrCells.slice(0, nTraps)) {
        const tr = rollTrap(rng, ctx.depth, ["dart", "pit", "fire", "alarm", "gas"]);
        sb.traps.push({ id: "plate" + sb.traps.length + "-" + x + "-" + y, x, y, trap: tr });
      }
      if (rng.chance(0.7)) {
        const g = rng.pick(["male", "female"]), who = person(rng.fork("hermit"), g), n = makeNpc(sb, who, "house", dialogueFor(rng.fork("d"), "dungeon", who, plan.facts || []), { role: rng.pick(["\u043E\u0442\u0448\u0435\u043B\u044C\u043D\u0438\u043A", "\u0438\u0441\u043A\u0430\u0442\u0435\u043B\u044C", "\u043F\u043B\u0435\u043D\u043D\u0438\u043A", "\u0431\u0440\u043E\u0434\u044F\u0433\u0430"]) });
        const rr = rng.pick(mid.length ? mid : rooms);
        for (const [x, y] of rng.shuffle(roomCells(sb, rr))) if (sb.put({ ...n, id: "dweller" }, x, y)) break;
      }
      for (const keyName3 of spec.keysHere || []) hideKey(sb, keyName3);
      const scene = sb.finish(up.front);
      scene.traps = sb.traps;
      return scene;
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u043E\u0434\u0437\u0435\u043C\u0435\u043B\u044C\u0435 " + spec.id);
  }

  // src/worldgen-v1/outskirts.js
  var SIZES3 = { small: [44, 30], medium: [56, 38], large: [70, 46] };
  var key4 = (x, y) => x + "," + y;
  function walk(sb, rng, x0, y0, x1, y1, th = 3) {
    let x = x0, y = y0;
    const stamp = (a, b) => {
      for (let j = 0; j < th; j++) for (let i = 0; i < th; i++) {
        const px = a + i - 1, py = b + j - 1;
        if (px >= 2 && py >= 2 && px < sb.W - 2 && py < sb.H - 2) sb.setFloor(px, py);
      }
    };
    stamp(x, y);
    for (let guard = 0; guard < 2e3 && (x !== x1 || y !== y1); guard++) {
      const dx = x1 - x, dy = y1 - y, horiz = Math.abs(dx) > Math.abs(dy) ? rng.chance(0.8) : rng.chance(0.25);
      if (horiz && dx) x += Math.sign(dx);
      else if (dy) y += Math.sign(dy);
      else x += Math.sign(dx);
      if (rng.chance(0.18)) y += rng.pick([-1, 1]);
      y = Math.max(3, Math.min(sb.H - 4, y));
      stamp(x, y);
    }
  }
  function genOutskirts(spec, plan) {
    const [W0, H0] = SIZES3[plan.size], rngBase = new Rng(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 20; attempt++) {
      const rng = rngBase.fork("try" + attempt), W = W0 + rng.int(-4, 8), H = H0 + rng.int(-3, 6), sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: "outskirts", seed: plan.seed });
      let g = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_2, x) => x > 2 && y > 2 && x < W - 3 && y < H - 3 && rng.chance(0.55) ? 1 : 0));
      for (let it = 0; it < 4; it++) g = g.map((row, y) => row.map((_, x) => {
        let n = 0;
        for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (g[y + j]?.[x + i]) n++;
        return x > 2 && y > 2 && x < W - 3 && y < H - 3 && n >= 5 ? 1 : 0;
      }));
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x]) sb.setFloor(x, y);
      const pads = spec.links.map((l) => {
        const px = l.side === "west" ? 4 : l.side === "east" ? W - 5 : Math.floor(W * l.at);
        const py = l.side === "north" ? 4 : l.side === "south" ? H - 5 : Math.floor(H * l.at);
        return { ...l, px, py };
      });
      for (const p of pads) sb.rect(p.px - 1, p.py - 1, 3, 3);
      for (let i = 1; i < pads.length; i++) walk(sb, rng, pads[0].px, pads[0].py, pads[i].px, pads[i].py, 3);
      const mid = [Math.floor(W / 2) + rng.int(-6, 6), Math.floor(H / 2) + rng.int(-5, 5)];
      walk(sb, rng, pads[0].px, pads[0].py, mid[0], mid[1], 3);
      if (pads[1]) walk(sb, rng, mid[0], mid[1], pads[1].px, pads[1].py, 3);
      const seen = /* @__PURE__ */ new Set(), comps = [];
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        if (!sb.isFloor(x, y) || seen.has(key4(x, y))) continue;
        const comp = [], st = [[x, y]];
        while (st.length) {
          const [a, b] = st.pop(), k = key4(a, b);
          if (seen.has(k) || !sb.isFloor(a, b)) continue;
          seen.add(k);
          comp.push([a, b]);
          for (const [dx, dy] of DIRS) st.push([a + dx, b + dy]);
        }
        comps.push(comp);
      }
      comps.sort((a, b) => b.length - a.length);
      for (const c of comps.slice(1)) for (const [x, y] of c) sb.setFloor(x, y, 0);
      if (comps[0].length < W * H * 0.22) continue;
      let ok = true;
      const spots = [];
      for (const p of pads) {
        const spot = sb.findPortalSpot(p.side === "east" ? W - 1 : p.side === "west" ? 0 : p.px, p.side === "north" ? 0 : p.side === "south" ? H - 1 : p.py, (x, y, s) => Math.hypot(x - p.px, y - p.py) < 6 && !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y)));
        if (!spot) {
          ok = false;
          break;
        }
        sb.addPortal(spot, p.dest, p.label, { id: "to-" + p.dest.replace(/[^a-z0-9]/g, "-") });
        spots.push(spot);
      }
      if (!ok) continue;
      sb.anchor = spots[0].front;
      const cells = sb.floorCells();
      const open = cells.filter(([x, y]) => {
        for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (!sb.isFloor(x + i, y + j)) return false;
        return true;
      });
      const far = (c, others) => others.every((o) => Math.hypot(o[0] - c[0], o[1] - c[1]) > 10);
      const pick = rng.shuffle(open).filter((c) => far(c, spots.map((s) => s.front)));
      const camp = pick[0], shrine = pick.find((c) => camp && Math.hypot(c[0] - camp[0], c[1] - camp[1]) > 10);
      const ctx = { depth: 0, trapChance: 0.1 };
      if (camp) {
        furnish(sb, "camp", { x: camp[0] - 2, y: camp[1] - 2, w: 5, h: 5 }, ctx);
        sb.light(camp[0] + 0.5, camp[1] + 0.5, { radius: 3.6, power: 0.65, intensity: 11, distance: 9 });
        const g1 = rng.pick(["male", "female"]), who = person(rng.fork("camper"), g1), n = makeNpc(sb, who, "cottage", dialogueFor(rng.fork("c"), "outskirts", who, plan.facts || []), { role: rng.pick(["\u043F\u0443\u0442\u043D\u0438\u043A", "\u043E\u0445\u043E\u0442\u043D\u0438\u043A", "\u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446", "\u043F\u0430\u043B\u043E\u043C\u043D\u0438\u043A"]), classId: rng.pick(["rogue", "fighter", "cleric"]) });
        for (const [x, y] of sb.nearestFree(camp[0], camp[1] + 3, 12)) if (sb.put({ ...n, id: "camper" }, x, y)) break;
      }
      if (shrine) furnish(sb, "shrine", { x: shrine[0] - 2, y: shrine[1] - 2, w: 5, h: 5 }, ctx);
      const maxTrees = Math.floor(cells.length / 14);
      let t = 0;
      for (const [x, y] of rng.shuffle(cells)) {
        if (t >= maxTrees) break;
        if (sb.put(mk(sb, rng.chance(0.78) ? "tree" : "bush"), x, y)) t++;
      }
      for (let i = 0; i < Math.floor(cells.length / 90); i++) {
        const [x, y] = rng.pick(cells);
        const k = rng.pick(["bones", "crate", "barrel", "haystack"]);
        const p = sb.put(mk(sb, k), x, y);
        if (p && (k === "crate" || k === "barrel")) stock(sb, p, ctx, "camp", { trap: rng.chance(0.1) });
      }
      for (const s of spots) sb.light(s.front[0] + 0.5, s.front[1] + 0.5, { radius: 3.4, power: 0.55, intensity: 9, distance: 8 });
      return sb.finish(spots[0].front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043E\u043A\u0440\u0435\u0441\u0442\u043D\u043E\u0441\u0442\u0438");
  }

  // src/worldgen-v1/fortress.js
  var SIZES4 = { small: [34, 24], medium: [40, 28], large: [48, 32] };
  function genYard(spec, plan) {
    const [W0, H0] = SIZES4[plan.size], rngBase = new Rng(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 10; attempt++) {
      const rng = rngBase.fork("try" + attempt), W = W0 + rng.int(-2, 6), H = H0 + rng.int(-1, 4), sb = new SceneBuilder(spec.id, spec.name, W, H, rng, { type: "fortress", seed: plan.seed });
      const yard = { x: 2, y: 7, w: W - 4, h: H - 9 }, towers = [{ x: 3, y: 2, w: 6, h: 4 }, { x: W - 9, y: 2, w: 6, h: 4 }];
      sb.rect(yard.x, yard.y, yard.w, yard.h);
      for (const t of towers) sb.rect(t.x, t.y, t.w, t.h);
      const blocks = [];
      for (let n = 0, tries = 0; n < rng.int(3, 5) && tries < 80; tries++) {
        const w = rng.int(6, 10), h = rng.int(3, 4), x = rng.int(yard.x + 4, yard.x + yard.w - w - 4), y = rng.int(yard.y + 3, yard.y + yard.h - h - 3);
        if (Math.abs(x + w / 2 - W / 2) < w / 2 + 3 && y < yard.y + 6) continue;
        if (blocks.every((b) => x + w + 3 <= b.x || b.x + b.w + 3 <= x || y + h + 3 <= b.y || b.y + b.h + 3 <= y)) {
          sb.rect(x, y, w, h, 0);
          blocks.push({ x, y, w, h });
          n++;
        }
      }
      const gx = Math.floor(W / 2), south = sb.findPortalSpot(gx, H - 1, (x, y, s) => y === H - 2 && s.front[1] === H - 3), keep = sb.findPortalSpot(gx, 6, (x, y, s) => y === 6 && s.front[1] === 7);
      if (!south || !keep) continue;
      sb.anchor = south.front;
      sb.addPortal(south, spec.parent, "\u0412\u043E\u0440\u043E\u0442\u0430 \u043D\u0430\u0440\u0443\u0436\u0443", { id: "gate" });
      sb.addPortal(keep, spec.keep, "\u0412\u0445\u043E\u0434 \u0432 \u0434\u043E\u043D\u0436\u043E\u043D", { id: "keep" });
      for (const t of towers) {
        const x = t.x + rng.int(1, t.w - 2);
        sb.setFloor(x, 6);
        sb.addDoor(x, 6, void 0, "\u0414\u0432\u0435\u0440\u044C \u0431\u0430\u0448\u043D\u0438");
      }
      const ctx = { depth: 1, trapChance: 0.12 };
      furnish(sb, "courtyard", yard, ctx);
      furnish(sb, "armory", towers[0], ctx);
      furnish(sb, "guardroom", towers[1], ctx);
      for (const s of [[8, 9], [W - 9, 9], [gx - 6, 12], [gx + 6, 12], [gx, H - 6], [10, H - 5], [W - 10, H - 5]]) sb.light(s[0] + 0.5, s[1] + 0.5, { radius: 3.6, power: 0.6, intensity: 10, distance: 9 });
      for (const t of towers) sb.light(t.x + t.w / 2, t.y + t.h / 2, { radius: 3, power: 0.5 });
      for (let i = 0; i < 3; i++) {
        const who = person(rng.fork("g" + i)), n = makeNpc(sb, who, "guard", dialogueFor(rng.fork("l" + i), "fortress", who, plan.facts || []), { role: i === 0 ? "\u043A\u0430\u043F\u0438\u0442\u0430\u043D \u0441\u0442\u0440\u0430\u0436\u0438" : "\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A" });
        for (const [x, y] of rng.shuffle(roomCells(sb, yard))) if (sb.put({ ...n, id: "guard" + i }, x, y)) break;
      }
      return sb.finish(south.front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0434\u0432\u043E\u0440 \u043A\u0440\u0435\u043F\u043E\u0441\u0442\u0438");
  }

  // src/worldgen-v1/world.js
  var GEN_VERSION = 1;
  var SIZES5 = Object.keys(TOWN_SIZES);
  var COUNTS = {
    small: { tavern: 1, chapel: 1, smithy: 1, shop: [1, 1], alchemist: [0, 1], guard: 1, warehouse: [0, 1], library: [0, 0], cottage: [1, 1], house: [2, 3] },
    medium: { tavern: 1, chapel: 1, smithy: 1, shop: [2, 2], alchemist: [1, 1], guard: 1, warehouse: [1, 2], library: [0, 1], cottage: [1, 2], house: [5, 7] },
    large: { tavern: 2, chapel: 1, smithy: 2, shop: [3, 4], alchemist: [1, 2], guard: 2, warehouse: [2, 3], library: [1, 1], cottage: [2, 3], house: [9, 12] }
  };
  var CELLAR_P = { tavern: 1, warehouse: 0.7, alchemist: 0.5, chapel: 0.6, guard: 0.5, shop: 0.4, house: 0.35, smithy: 0.3, library: 0.3, cottage: 0.1 };
  var keyName = (rng, used) => {
    for (let i = 0; i < 20; i++) {
      const n2 = "\u041A\u043B\u044E\u0447: " + rng.pick(KEY_NAMES);
      if (!used.has(n2)) {
        used.add(n2);
        return n2;
      }
    }
    const n = "\u041A\u043B\u044E\u0447: \u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439 " + used.size;
    used.add(n);
    return n;
  };
  function normalizeGen(gen = {}) {
    return { v: GEN_VERSION, seed: String(gen.seed ?? "0"), size: SIZES5.includes(gen.size) ? gen.size : "auto" };
  }
  function createWorld(seed, size) {
    seed = String(seed);
    const rng = new Rng(seed + "/plan");
    const sizeResolved = SIZES5.includes(size) ? size : rng.pick(["small", "medium", "medium", "large"]);
    const plan = { v: GEN_VERSION, seed, size: sizeResolved, name: settlementName(rng), gateDest: "out", buildings: [], scenes: {}, keys: [], facts: [], start: "town" };
    const C = COUNTS[sizeResolved], list = [];
    for (const [type, n] of Object.entries(C)) {
      const count = Array.isArray(n) ? rng.int(n[0], n[1]) : n;
      for (let i = 0; i < count; i++) list.push(type);
    }
    const tavernNames = /* @__PURE__ */ new Set();
    let idx = 0;
    for (const type of list) {
      const owner = person(rng.fork("owner" + idx)), id = "b" + ++idx;
      let name = buildingName(rng.fork("name" + idx), type, owner);
      while (type === "tavern" && tavernNames.has(name)) name = buildingName(rng.fork("nm" + idx + tavernNames.size), type, owner);
      tavernNames.add(name);
      const cellar = rng.chance(CELLAR_P[type] ?? 0.2) ? id + ":c" : null, up = type === "tavern" ? id + ":u" : ["house", "shop", "alchemist"].includes(type) && sizeResolved !== "small" && rng.chance(0.25) ? id + ":u" : null;
      plan.buildings.push({ id, type, name, owner, cellar, up, lockRoom: rng.chance(0.3), extraNpcs: type === "tavern" ? rng.int(1, 3) : 0, guestNames: [person(rng.fork("gn" + idx)).full, person(rng.fork("gm" + idx)).full, person(rng.fork("gk" + idx)).full] });
    }
    let town = null, tryIndex = 0;
    for (; tryIndex < 12; tryIndex++) {
      plan.buildings.forEach((b) => delete b.door);
      town = genTown(plan, tryIndex);
      if (town && plan.buildings.some((b) => b.type === "tavern" && b.door) && plan.buildings.some((b) => b.type === "chapel" && b.door)) break;
    }
    if (!town || tryIndex >= 12) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0437\u0434\u0430\u043D\u0438\u044F \u0433\u043E\u0440\u043E\u0434\u0430");
    plan.townTry = tryIndex;
    plan.buildings = plan.buildings.filter((b) => b.door);
    const dungeonLevels = { small: 1, medium: 2, large: 3 }[sizeResolved], fortress = sizeResolved === "large" || sizeResolved === "medium" && rng.chance(0.6) || rng.chance(0.15);
    const dungeonName = rng.pick(["\u0421\u0442\u0430\u0440\u0430\u044F \u043A\u0440\u0438\u043F\u0442\u0430", "\u0417\u0430\u0431\u044B\u0442\u044B\u0435 \u0441\u043A\u043B\u0435\u043F\u044B", "\u0420\u0443\u0434\u043D\u0438\u043A \u043C\u0435\u0440\u0442\u0432\u0435\u0446\u043E\u0432", "\u041A\u0430\u0442\u0430\u043A\u043E\u043C\u0431\u044B \u043F\u043E\u0434 \u0445\u043E\u043B\u043C\u043E\u043C", "\u0420\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u043D\u0430\u044F \u0443\u0441\u044B\u043F\u0430\u043B\u044C\u043D\u0438\u0446\u0430"]), fortName = rng.pick(["\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D\u043D\u0430\u044F \u043A\u0440\u0435\u043F\u043E\u0441\u0442\u044C", "\u0421\u0435\u0440\u0430\u044F \u0446\u0438\u0442\u0430\u0434\u0435\u043B\u044C", "\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u044C \u043D\u0430 \u0445\u043E\u043B\u043C\u0435", "\u0420\u0430\u0437\u043E\u0440\u0451\u043D\u043D\u044B\u0439 \u0437\u0430\u043C\u043E\u043A"]);
    plan.dungeon = { name: dungeonName, levels: dungeonLevels };
    plan.fortress = fortress ? { name: fortName } : null;
    const usedKeys = /* @__PURE__ */ new Set(), homes = plan.buildings.filter((b) => b.type !== "chapel").map((b) => b.id), keysAt = /* @__PURE__ */ new Map();
    const putKey = (name, notId) => {
      const holder = rng.pick(homes.filter((h) => h !== notId).concat(homes.length > 1 ? [] : ["out"]));
      (keysAt.get(holder) || keysAt.set(holder, []).get(holder)).push(name);
      return holder;
    };
    const stashCellars = plan.buildings.filter((b) => b.cellar && b.type !== "tavern").slice(0, Math.max(1, Math.floor(plan.buildings.length / 8)));
    const stashKeys = new Map(stashCellars.map((b) => {
      const k = keyName(rng, usedKeys);
      putKey(k, b.id);
      return [b.id, k];
    }));
    const vaultKey = keyName(rng, usedKeys);
    plan.keys.push({ name: vaultKey, holder: putKey(vaultKey, null), opens: dungeonLevels ? "dng:" + dungeonLevels : "out" });
    const fortKey = fortress ? keyName(rng, usedKeys) : null;
    if (fortKey) plan.keys.push({ name: fortKey, holder: putKey(fortKey, null), opens: "fort:up" });
    for (const [b, k] of stashKeys) plan.keys.push({ name: k, holder: [...keysAt].find(([, v]) => v.includes(k))?.[0], opens: b + ":c" });
    for (const b of plan.buildings) {
      if (b.type === "tavern") plan.facts.push({ kind: "tavern", place: b.name });
      if (stashKeys.has(b.id)) plan.facts.push({ kind: "cache", place: b.name });
      if (b.lockRoom && b.type !== "cottage") plan.facts.push({ kind: "lock", where: b.name, keyWhere: "\u043A\u0430\u043A\u043E\u043C-\u0442\u043E \u0438\u0437 \u0434\u043E\u043C\u043E\u0432" });
    }
    plan.facts.push({ kind: "dungeon", place: dungeonName }, { kind: "trap", where: dungeonName });
    if (fortress) plan.facts.push({ kind: "fortress", place: fortName });
    const S = plan.scenes;
    S.town = { kind: "town" };
    plan.buildings.forEach((b, i) => {
      const facts = rng.fork("facts" + i).shuffle(plan.facts.filter((f) => f.place !== b.name)).slice(0, 3), keysHere = keysAt.get(b.id) || [];
      S[b.id] = { kind: "building", spec: { id: b.id, type: b.type, name: b.name, parent: "town", owner: b.owner, cellar: b.cellar, up: b.up, lockRoom: b.lockRoom, facts, extraNpcs: b.extraNpcs, guestNames: b.guestNames, keysHere, trapChance: 0.08 } };
      if (b.cellar) S[b.cellar] = { kind: "cellar", spec: { id: b.cellar, name: "\u041F\u043E\u0434\u0432\u0430\u043B: " + b.name, parent: b.id, stash: stashKeys.has(b.id) ? { key: stashKeys.get(b.id) } : null } };
      if (b.up) S[b.up] = { kind: "upper", spec: { id: b.up, name: "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436: " + b.name, parent: b.id, lockRoom: b.type === "tavern" } };
    });
    const links = [{ dest: "town", side: "west", at: 0.5, label: "\u0414\u043E\u0440\u043E\u0433\u0430 \u0432 \u0433\u043E\u0440\u043E\u0434" }];
    if (dungeonLevels) links.push({ dest: "dng:1", side: "east", at: 0.3 + rng.next() * 0.2, label: dungeonName });
    if (fortress) links.push({ dest: "fort:yard", side: rng.pick(["north", "south"]), at: 0.45 + rng.next() * 0.2, label: fortName });
    S.out = { kind: "outskirts", spec: { id: "out", name: "\u0414\u043E\u0440\u043E\u0433\u0430 \u0443 \u0433\u043E\u0440\u043E\u0434\u0430 \xAB" + plan.name + "\xBB", links, keysHere: keysAt.get("out") || [] } };
    for (let l = 1; l <= dungeonLevels; l++) S["dng:" + l] = { kind: "dungeon", spec: { id: "dng:" + l, name: dungeonName + ", \u0443\u0440\u043E\u0432\u0435\u043D\u044C " + l, level: l, up: l === 1 ? "out" : "dng:" + (l - 1), down: l < dungeonLevels ? "dng:" + (l + 1) : null, vault: l === dungeonLevels, vaultKey: l === dungeonLevels ? vaultKey : void 0 } };
    if (fortress) {
      S["fort:yard"] = { kind: "yard", spec: { id: "fort:yard", name: fortName + ": \u0434\u0432\u043E\u0440", parent: "out", keep: "fort:keep" } };
      S["fort:keep"] = { kind: "building", spec: { id: "fort:keep", type: "keep", name: fortName + ": \u0434\u043E\u043D\u0436\u043E\u043D", parent: "fort:yard", owner: person(rng.fork("castellan")), cellar: "fort:dng", up: "fort:up", depth: 1, facts: [], exitLabel: "\u0412\u044B\u0445\u043E\u0434 \u0432\u043E \u0434\u0432\u043E\u0440", trapChance: 0.12 } };
      S["fort:up"] = { kind: "building", spec: { id: "fort:up", type: "lordhall", name: fortName + ": \u043F\u043E\u043A\u043E\u0438", parent: "fort:keep", owner: person(rng.fork("chamberlain")), depth: 2, facts: [], exitLabel: "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u043D\u0438\u0437", vaultKey: fortKey, trapChance: 0.2 } };
      S["fort:dng"] = { kind: "dungeon", spec: { id: "fort:dng", name: fortName + ": \u0442\u0435\u043C\u043D\u0438\u0446\u0430", level: 2, up: "fort:keep", down: null, vault: false } };
    }
    Object.defineProperty(plan, "cache", { value: /* @__PURE__ */ new Map(), enumerable: false });
    return plan;
  }
  function generateScene(plan, id) {
    if (plan.cache?.has(id)) return plan.cache.get(id);
    const def = plan.scenes[id];
    if (!def) throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0441\u0446\u0435\u043D\u0430 " + id);
    const spec = def.spec;
    let scene;
    switch (def.kind) {
      case "town":
        scene = genTown(plan, plan.townTry);
        if (!scene) throw new Error("\u0413\u043E\u0440\u043E\u0434 \u043D\u0435 \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u043B\u0441\u044F");
        break;
      case "building":
        scene = genBuilding(spec, plan);
        break;
      case "cellar":
        scene = genCellar(spec, plan);
        break;
      case "upper":
        scene = genUpper(spec, plan);
        break;
      case "outskirts":
        scene = genOutskirts(spec, plan);
        break;
      case "dungeon":
        scene = genDungeon(spec, plan);
        break;
      case "yard":
        scene = genYard(spec, plan);
        break;
      default:
        throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u0441\u0446\u0435\u043D\u044B " + def.kind);
    }
    scene.gen.planVersion = plan.v;
    plan.cache?.set(id, scene);
    return scene;
  }
  var sceneIds = (plan) => Object.keys(plan.scenes);
  var isGeneratedId = (plan, id) => !!plan.scenes[id];
  var exits = (scene) => [...new Set(scene.props.filter((p) => p.type === "portal").map((p) => p.destination))];

  // src/worldgen/world-v2.js
  var world_v2_exports = {};
  __export(world_v2_exports, {
    GEN_VERSION: () => GEN_VERSION2,
    SIZES: () => SIZES10,
    TOWN_SIZES: () => TOWN_SIZES2,
    createWorld: () => createWorld2,
    exits: () => exits2,
    generateScene: () => generateScene2,
    gmBrief: () => gmBrief,
    isGeneratedId: () => isGeneratedId2,
    normalizeGen: () => normalizeGen2,
    npcBrief: () => npcBrief,
    randomSeed: () => randomSeed2,
    sceneIds: () => sceneIds2,
    validateScene: () => validateScene2
  });

  // src/worldgen/rng.js
  function hash322(str, salt = 0) {
    let h = (1779033703 ^ str.length) + Math.imul(salt, 2654435761) | 0;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return (h ^ h >>> 16) >>> 0;
  }
  function randomSeed2() {
    const abc = "abcdefghjkmnpqrstuvwxyz23456789";
    let s = "";
    for (let i = 0; i < 10; i++) s += abc[Math.floor(Math.random() * abc.length)];
    return s;
  }
  var Rng2 = class _Rng {
    constructor(seed) {
      this.path = String(seed);
      this.a = hash322(this.path, 1);
      this.b = hash322(this.path, 2);
      this.c = hash322(this.path, 3);
      this.d = hash322(this.path, 4);
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

  // src/worldgen/content.js
  var G2 = (m, f, n, p) => ({ m, f, n, p });
  var ADJ2 = [G2("\u0422\u0438\u0445\u0438\u0439", "\u0422\u0438\u0445\u0430\u044F", "\u0422\u0438\u0445\u043E\u0435", "\u0422\u0438\u0445\u0438\u0435"), G2("\u0421\u0442\u0430\u0440\u044B\u0439", "\u0421\u0442\u0430\u0440\u0430\u044F", "\u0421\u0442\u0430\u0440\u043E\u0435", "\u0421\u0442\u0430\u0440\u044B\u0435"), G2("\u0412\u043E\u0440\u043E\u043D\u0438\u0439", "\u0412\u043E\u0440\u043E\u044C\u044F", "\u0412\u043E\u0440\u043E\u043D\u044C\u0451", "\u0412\u043E\u0440\u043E\u043D\u044C\u0438"), G2("\u0421\u0435\u0440\u044B\u0439", "\u0421\u0435\u0440\u0430\u044F", "\u0421\u0435\u0440\u043E\u0435", "\u0421\u0435\u0440\u044B\u0435"), G2("\u0417\u0435\u043B\u0451\u043D\u044B\u0439", "\u0417\u0435\u043B\u0451\u043D\u0430\u044F", "\u0417\u0435\u043B\u0451\u043D\u043E\u0435", "\u0417\u0435\u043B\u0451\u043D\u044B\u0435"), G2("\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439", "\u041A\u0430\u043C\u0435\u043D\u043D\u0430\u044F", "\u041A\u0430\u043C\u0435\u043D\u043D\u043E\u0435", "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0435"), G2("\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0439", "\u0425\u043E\u043B\u043E\u0434\u043D\u0430\u044F", "\u0425\u043E\u043B\u043E\u0434\u043D\u043E\u0435", "\u0425\u043E\u043B\u043E\u0434\u043D\u044B\u0435"), G2("\u0417\u043E\u043B\u043E\u0442\u043E\u0439", "\u0417\u043E\u043B\u043E\u0442\u0430\u044F", "\u0417\u043E\u043B\u043E\u0442\u043E\u0435", "\u0417\u043E\u043B\u043E\u0442\u044B\u0435"), G2("\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0439", "\u0416\u0435\u043B\u0435\u0437\u043D\u0430\u044F", "\u0416\u0435\u043B\u0435\u0437\u043D\u043E\u0435", "\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0435"), G2("\u041C\u0448\u0438\u0441\u0442\u044B\u0439", "\u041C\u0448\u0438\u0441\u0442\u0430\u044F", "\u041C\u0448\u0438\u0441\u0442\u043E\u0435", "\u041C\u0448\u0438\u0441\u0442\u044B\u0435"), G2("\u0422\u0443\u043C\u0430\u043D\u043D\u044B\u0439", "\u0422\u0443\u043C\u0430\u043D\u043D\u0430\u044F", "\u0422\u0443\u043C\u0430\u043D\u043D\u043E\u0435", "\u0422\u0443\u043C\u0430\u043D\u043D\u044B\u0435"), G2("\u0422\u0451\u043C\u043D\u044B\u0439", "\u0422\u0451\u043C\u043D\u0430\u044F", "\u0422\u0451\u043C\u043D\u043E\u0435", "\u0422\u0451\u043C\u043D\u044B\u0435"), G2("\u0421\u0432\u0435\u0442\u043B\u044B\u0439", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F", "\u0421\u0432\u0435\u0442\u043B\u043E\u0435", "\u0421\u0432\u0435\u0442\u043B\u044B\u0435"), G2("\u0411\u0443\u0440\u044B\u0439", "\u0411\u0443\u0440\u0430\u044F", "\u0411\u0443\u0440\u043E\u0435", "\u0411\u0443\u0440\u044B\u0435")];
  var PLACES2 = [["m", "\u0411\u0440\u043E\u0434"], ["m", "\u041B\u043E\u0433"], ["m", "\u042F\u0440"], ["m", "\u041C\u043E\u0441\u0442"], ["m", "\u0425\u043E\u043B\u043C"], ["p", "\u041A\u043B\u044E\u0447\u0438"], ["f", "\u0417\u0430\u0432\u043E\u0434\u044C"], ["f", "\u041F\u0430\u0434\u044C"], ["f", "\u0413\u0430\u0442\u044C"], ["f", "\u0420\u043E\u0449\u0430"], ["f", "\u041C\u0435\u043B\u044C\u043D\u0438\u0446\u0430"], ["f", "\u041F\u0440\u0438\u0441\u0442\u0430\u043D\u044C"], ["f", "\u0417\u0430\u0441\u0442\u0430\u0432\u0430"], ["f", "\u041F\u043E\u043B\u044F\u043D\u0430"], ["f", "\u0420\u0430\u0437\u0432\u0438\u043B\u043A\u0430"], ["m", "\u0418\u0441\u0442\u043E\u043A"], ["m", "\u041F\u0435\u0440\u0435\u043A\u0440\u0451\u0441\u0442\u043E\u043A"], ["m", "\u0423\u0442\u0451\u0441"], ["n", "\u0423\u0440\u043E\u0447\u0438\u0449\u0435"], ["n", "\u041F\u043E\u0434\u0432\u043E\u0440\u044C\u0435"]];
  var TAV_M2 = ["\u041A\u043E\u0442\u0451\u043B", "\u0413\u0440\u0438\u0444\u043E\u043D", "\u041A\u0430\u0431\u0430\u043D", "\u0412\u043E\u0440\u043E\u043D", "\u0414\u0440\u0430\u043A\u043E\u043D", "\u0411\u043E\u0447\u043E\u043D\u043E\u043A", "\u042F\u043A\u043E\u0440\u044C", "\u041C\u0435\u0434\u0432\u0435\u0434\u044C", "\u041E\u043B\u0435\u043D\u044C"];
  var TAV_F2 = ["\u041B\u0438\u0441\u0438\u0446\u0430", "\u041F\u043E\u0434\u043A\u043E\u0432\u0430", "\u041B\u044E\u0442\u043D\u044F", "\u0421\u043E\u0432\u0430", "\u041A\u0440\u0443\u0436\u043A\u0430", "\u0421\u0432\u0435\u0447\u0430", "\u0420\u044B\u0431\u0430", "\u041A\u043E\u0440\u043E\u043D\u0430"];
  var TAV_AM2 = ["\u0420\u0436\u0430\u0432\u044B\u0439", "\u041F\u044C\u044F\u043D\u044B\u0439", "\u0425\u0440\u043E\u043C\u043E\u0439", "\u0417\u043E\u043B\u043E\u0442\u043E\u0439", "\u0422\u0438\u0445\u0438\u0439", "\u0412\u0435\u0441\u0451\u043B\u044B\u0439", "\u041E\u0434\u043D\u043E\u0433\u043B\u0430\u0437\u044B\u0439", "\u0421\u043E\u043D\u043D\u044B\u0439", "\u0413\u043E\u0440\u0434\u044B\u0439"];
  var TAV_AF2 = ["\u0420\u0436\u0430\u0432\u0430\u044F", "\u041F\u044C\u044F\u043D\u0430\u044F", "\u0425\u0440\u043E\u043C\u0430\u044F", "\u0417\u043E\u043B\u043E\u0442\u0430\u044F", "\u0422\u0438\u0445\u0430\u044F", "\u0412\u0435\u0441\u0451\u043B\u0430\u044F", "\u041E\u0434\u043D\u043E\u0433\u043B\u0430\u0437\u0430\u044F", "\u0421\u043E\u043D\u043D\u0430\u044F", "\u041A\u0440\u0438\u0432\u0430\u044F"];
  var MALE2 = [["\u0411\u043E\u0440\u0433", "\u0411\u043E\u0440\u0433\u0430"], ["\u042D\u043B\u044C\u0434\u0430\u0440", "\u042D\u043B\u044C\u0434\u0430\u0440\u0430"], ["\u0422\u043E\u043C\u0430\u0441", "\u0422\u043E\u043C\u0430\u0441\u0430"], ["\u0413\u0430\u0440\u0440\u0438\u043A", "\u0413\u0430\u0440\u0440\u0438\u043A\u0430"], ["\u041E\u043B\u0430\u0444", "\u041E\u043B\u0430\u0444\u0430"], ["\u0412\u0430\u043B\u044C\u0434\u0435\u0440", "\u0412\u0430\u043B\u044C\u0434\u0435\u0440\u0430"], ["\u041A\u043E\u0440\u0432\u0438\u043D", "\u041A\u043E\u0440\u0432\u0438\u043D\u0430"], ["\u0419\u043E\u0440\u0433\u0435\u043D", "\u0419\u043E\u0440\u0433\u0435\u043D\u0430"], ["\u041C\u0438\u0440\u043E\u043D", "\u041C\u0438\u0440\u043E\u043D\u0430"], ["\u041B\u0443\u043A\u0430\u0441", "\u041B\u0443\u043A\u0430\u0441\u0430"], ["\u0414\u0430\u0440\u0435\u043D", "\u0414\u0430\u0440\u0435\u043D\u0430"], ["\u0424\u0430\u0440\u0438\u043A", "\u0424\u0430\u0440\u0438\u043A\u0430"], ["\u0425\u044C\u044E\u0433\u043E", "\u0425\u044C\u044E\u0433\u043E"], ["\u0411\u0440\u0430\u043D", "\u0411\u0440\u0430\u043D\u0430"]];
  var FEMALE2 = [["\u041C\u0438\u0440\u043D\u0430", "\u041C\u0438\u0440\u043D\u044B"], ["\u0414\u0430\u043B\u0438\u044F", "\u0414\u0430\u043B\u0438\u0438"], ["\u0420\u0430\u0434\u0430", "\u0420\u0430\u0434\u044B"], ["\u041E\u043B\u044C\u0433\u0430", "\u041E\u043B\u044C\u0433\u0438"], ["\u0422\u0438\u043B\u044C\u0434\u0430", "\u0422\u0438\u043B\u044C\u0434\u044B"], ["\u0411\u0440\u0438\u043D\u0430", "\u0411\u0440\u0438\u043D\u044B"], ["\u041B\u0438\u0434\u0438\u044F", "\u041B\u0438\u0434\u0438\u0438"], ["\u042F\u0441\u043D\u0430", "\u042F\u0441\u043D\u044B"], ["\u0425\u0435\u043B\u044C\u0433\u0430", "\u0425\u0435\u043B\u044C\u0433\u0438"], ["\u041D\u0435\u044F", "\u041D\u0435\u0438"], ["\u0418\u0432\u0435\u0442\u0430", "\u0418\u0432\u0435\u0442\u044B"], ["\u0421\u0430\u043D\u0430", "\u0421\u0430\u043D\u044B"]];
  var EPITHET2 = ["\u0420\u044B\u0436\u0438\u0439", "\u0425\u0440\u043E\u043C\u043E\u0439", "\u0421\u0435\u0434\u043E\u0439", "\u0412\u0435\u0441\u0451\u043B\u044B\u0439", "\u041C\u043E\u043B\u0447\u0430\u043B\u0438\u0432\u044B\u0439", "\u0421\u0442\u0430\u0440\u044B\u0439", "\u041C\u0435\u0442\u043A\u0438\u0439", "\u041A\u0440\u0435\u043F\u043A\u0438\u0439"];
  var EPITHET_F2 = ["\u0420\u044B\u0436\u0430\u044F", "\u0425\u0440\u043E\u043C\u0430\u044F", "\u0421\u0435\u0434\u0430\u044F", "\u0412\u0435\u0441\u0451\u043B\u0430\u044F", "\u041C\u043E\u043B\u0447\u0430\u043B\u0438\u0432\u0430\u044F", "\u0421\u0442\u0430\u0440\u0430\u044F", "\u041C\u0435\u0442\u043A\u0430\u044F", "\u041A\u0440\u0435\u043F\u043A\u0430\u044F"];
  var FIRST2 = [G2("\u0412\u0435\u0440\u0445\u043D\u0438\u0439", "\u0412\u0435\u0440\u0445\u043D\u044F\u044F", "\u0412\u0435\u0440\u0445\u043D\u0435\u0435", "\u0412\u0435\u0440\u0445\u043D\u0438\u0435"), G2("\u041D\u0438\u0436\u043D\u0438\u0439", "\u041D\u0438\u0436\u043D\u044F\u044F", "\u041D\u0438\u0436\u043D\u0435\u0435", "\u041D\u0438\u0436\u043D\u0438\u0435"), G2("\u041D\u043E\u0432\u044B\u0439", "\u041D\u043E\u0432\u0430\u044F", "\u041D\u043E\u0432\u043E\u0435", "\u041D\u043E\u0432\u044B\u0435"), G2("\u041C\u0430\u043B\u044B\u0439", "\u041C\u0430\u043B\u0430\u044F", "\u041C\u0430\u043B\u043E\u0435", "\u041C\u0430\u043B\u044B\u0435"), G2("\u0414\u0430\u043B\u044C\u043D\u0438\u0439", "\u0414\u0430\u043B\u044C\u043D\u044F\u044F", "\u0414\u0430\u043B\u044C\u043D\u0435\u0435", "\u0414\u0430\u043B\u044C\u043D\u0438\u0435")];
  var SUFFIX2 = ["\u0443 \u0440\u0435\u043A\u0438", "\u043D\u0430 \u0445\u043E\u043B\u043C\u0430\u0445", "\u0443 \u0442\u0440\u0430\u043A\u0442\u0430", "\u0432 \u0434\u043E\u043B\u0438\u043D\u0435", "\u0443 \u0441\u0442\u0430\u0440\u043E\u0433\u043E \u043C\u043E\u0441\u0442\u0430", "\u043D\u0430 \u043E\u0442\u0448\u0438\u0431\u0435"];
  function settlementName2(rng) {
    const [g, n] = rng.pick(PLACES2), r = rng.next();
    if (r < 0.45) return `${rng.pick(ADJ2)[g]} ${n}`;
    if (r < 0.7) {
      const who = rng.pick(rng.chance(0.5) ? MALE2 : FEMALE2);
      return `${n} ${who[1]}`;
    }
    if (r < 0.85) return `${rng.pick(FIRST2)[g]} ${n}`;
    return `${rng.pick(ADJ2)[g]} ${n} ${rng.pick(SUFFIX2)}`;
  }
  function tavernName2(rng) {
    return rng.chance(0.5) ? `${rng.pick(TAV_AM2)} ${rng.pick(TAV_M2)}` : `${rng.pick(TAV_AF2)} ${rng.pick(TAV_F2)}`;
  }
  function person2(rng, gender = rng.pick(["male", "female"])) {
    const [nom, gen] = rng.pick(gender === "female" ? FEMALE2 : MALE2), epi = rng.chance(0.55) ? " " + rng.pick(gender === "female" ? EPITHET_F2 : EPITHET2) : "";
    return { gender, first: nom, genitive: gen, full: nom + epi };
  }
  var BUILDING_TYPES2 = {
    house: { label: "\u0414\u043E\u043C", role: ["\u0436\u0438\u0442\u0435\u043B\u044C", "\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430"], cls: "fighter" },
    cottage: { label: "\u0425\u0438\u0436\u0438\u043D\u0430", role: ["\u0434\u0440\u043E\u0432\u043E\u0441\u0435\u043A", "\u0442\u0440\u0430\u0432\u043D\u0438\u0446\u0430"], cls: "rogue" },
    tavern: { label: "\u0422\u0430\u0432\u0435\u0440\u043D\u0430", role: ["\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A", "\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u0446\u0430"], cls: "rogue" },
    smithy: { label: "\u041A\u0443\u0437\u043D\u0438\u0446\u0430", role: ["\u043A\u0443\u0437\u043D\u0435\u0446", "\u043A\u0443\u0437\u043D\u0435\u0446"], cls: "fighter" },
    alchemist: { label: "\u041B\u0430\u0432\u043A\u0430 \u0437\u0435\u043B\u0438\u0439", role: ["\u0430\u043B\u0445\u0438\u043C\u0438\u043A", "\u0430\u043B\u0445\u0438\u043C\u0438\u043A"], cls: "wizard" },
    shop: { label: "\u041B\u0430\u0432\u043A\u0430", role: ["\u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446", "\u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0430"], cls: "rogue" },
    chapel: { label: "\u0427\u0430\u0441\u043E\u0432\u043D\u044F", role: ["\u0436\u0440\u0435\u0446", "\u0436\u0440\u0438\u0446\u0430"], cls: "cleric" },
    keep: { label: "\u0414\u043E\u043D\u0436\u043E\u043D", role: ["\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u043D\u0442", "\u043A\u043E\u043C\u0435\u043D\u0434\u0430\u043D\u0442\u0448\u0430"], cls: "fighter" },
    lordhall: { label: "\u041F\u043E\u043A\u043E\u0438", role: ["\u043A\u0430\u043C\u0435\u0440\u0433\u0435\u0440", "\u043A\u0430\u043C\u0435\u0440\u0433\u0435\u0440"], cls: "wizard" },
    guard: { label: "\u041A\u0430\u0440\u0430\u0443\u043B\u043A\u0430", role: ["\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A", "\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430"], cls: "fighter" },
    warehouse: { label: "\u0421\u043A\u043B\u0430\u0434", role: ["\u043A\u043B\u0430\u0434\u043E\u0432\u0449\u0438\u043A", "\u043A\u043B\u0430\u0434\u043E\u0432\u0449\u0438\u0446\u0430"], cls: "fighter" },
    library: { label: "\u041A\u043D\u0438\u0436\u043D\u0430\u044F \u043B\u0430\u0432\u043A\u0430", role: ["\u043F\u0438\u0441\u0430\u0440\u044C", "\u043F\u0438\u0441\u0430\u0440\u044C"], cls: "wizard" }
  };
  var TYPE_FORMS = {
    house: { word: "\u0414\u043E\u043C", nom: "\u0434\u043E\u043C", gen: "\u0434\u043E\u043C\u0430", loc: "\u0432 \u0434\u043E\u043C\u0435" },
    cottage: { word: "\u0425\u0438\u0436\u0438\u043D\u0430", nom: "\u0445\u0438\u0436\u0438\u043D\u0430", gen: "\u0445\u0438\u0436\u0438\u043D\u044B", loc: "\u0432 \u0445\u0438\u0436\u0438\u043D\u0435" },
    tavern: { word: "\u0422\u0430\u0432\u0435\u0440\u043D\u0430", nom: "\u0442\u0430\u0432\u0435\u0440\u043D\u0430", gen: "\u0442\u0430\u0432\u0435\u0440\u043D\u044B", loc: "\u0432 \u0442\u0430\u0432\u0435\u0440\u043D\u0435" },
    smithy: { word: "\u041A\u0443\u0437\u043D\u0438\u0446\u0430", nom: "\u043A\u0443\u0437\u043D\u0438\u0446\u0430", gen: "\u043A\u0443\u0437\u043D\u0438\u0446\u044B", loc: "\u0432 \u043A\u0443\u0437\u043D\u0438\u0446\u0435" },
    alchemist: { word: "\u041B\u0430\u0432\u043A\u0430 \u0437\u0435\u043B\u0438\u0439", nom: "\u043B\u0430\u0432\u043A\u0430 \u0437\u0435\u043B\u0438\u0439", gen: "\u043B\u0430\u0432\u043A\u0438 \u0437\u0435\u043B\u0438\u0439", loc: "\u0432 \u043B\u0430\u0432\u043A\u0435 \u0437\u0435\u043B\u0438\u0439" },
    shop: { word: "\u041B\u0430\u0432\u043A\u0430", nom: "\u043B\u0430\u0432\u043A\u0430", gen: "\u043B\u0430\u0432\u043A\u0438", loc: "\u0432 \u043B\u0430\u0432\u043A\u0435" },
    chapel: { word: "\u0427\u0430\u0441\u043E\u0432\u043D\u044F", nom: "\u0447\u0430\u0441\u043E\u0432\u043D\u044F", gen: "\u0447\u0430\u0441\u043E\u0432\u043D\u0438", loc: "\u0432 \u0447\u0430\u0441\u043E\u0432\u043D\u0435" },
    guard: { word: "\u041A\u0430\u0440\u0430\u0443\u043B\u043A\u0430", nom: "\u043A\u0430\u0440\u0430\u0443\u043B\u043A\u0430", gen: "\u043A\u0430\u0440\u0430\u0443\u043B\u043A\u0438", loc: "\u0432 \u043A\u0430\u0440\u0430\u0443\u043B\u043A\u0435" },
    warehouse: { word: "\u0421\u043A\u043B\u0430\u0434", nom: "\u0441\u043A\u043B\u0430\u0434", gen: "\u0441\u043A\u043B\u0430\u0434\u0430", loc: "\u043D\u0430 \u0441\u043A\u043B\u0430\u0434\u0435" },
    library: { word: "\u041A\u043D\u0438\u0436\u043D\u0430\u044F \u043B\u0430\u0432\u043A\u0430", nom: "\u043A\u043D\u0438\u0436\u043D\u0430\u044F \u043B\u0430\u0432\u043A\u0430", gen: "\u043A\u043D\u0438\u0436\u043D\u043E\u0439 \u043B\u0430\u0432\u043A\u0438", loc: "\u0432 \u043A\u043D\u0438\u0436\u043D\u043E\u0439 \u043B\u0430\u0432\u043A\u0435" }
  };
  function buildingRef(type, name) {
    const f = TYPE_FORMS[type];
    if (!f || !name.startsWith(f.word)) return { title: name, nom: name, gen: name, loc: "\u0432 " + name };
    const rest = name.slice(f.word.length).trim(), j = (s) => rest ? s + " " + rest : s;
    return { title: name, nom: j(f.nom), gen: j(f.gen), loc: j(f.loc) };
  }
  function buildingName2(rng, type, owner) {
    switch (type) {
      case "tavern":
        return `\u0422\u0430\u0432\u0435\u0440\u043D\u0430 \xAB${tavernName2(rng)}\xBB`;
      case "smithy":
        return `\u041A\u0443\u0437\u043D\u0438\u0446\u0430 ${owner.genitive}`;
      case "alchemist":
        return `\u041B\u0430\u0432\u043A\u0430 \u0437\u0435\u043B\u0438\u0439 ${owner.genitive}`;
      case "shop":
        return `\u041B\u0430\u0432\u043A\u0430 ${owner.genitive}`;
      case "library":
        return `\u041A\u043D\u0438\u0436\u043D\u0430\u044F \u043B\u0430\u0432\u043A\u0430 ${owner.genitive}`;
      case "chapel":
        return "\u0427\u0430\u0441\u043E\u0432\u043D\u044F " + rng.pick(["\u0442\u0438\u0445\u0438\u0445 \u0441\u0432\u0435\u0447\u0435\u0439", "\u0443 \u0434\u043E\u0440\u043E\u0433\u0438", "\u0441\u0442\u0440\u0430\u043D\u043D\u0438\u043A\u043E\u0432", "\u0441\u0435\u043C\u0438 \u043E\u0433\u043D\u0435\u0439", "\u0441\u0442\u0430\u0440\u043E\u0433\u043E \u043A\u043E\u043B\u043E\u0434\u0446\u0430"]);
      case "guard":
        return "\u041A\u0430\u0440\u0430\u0443\u043B\u043A\u0430 " + rng.pick(["\u0443 \u0432\u043E\u0440\u043E\u0442", "\u043D\u0430 \u043F\u043B\u043E\u0449\u0430\u0434\u0438", "\u0441\u0442\u0440\u0430\u0436\u0438"]);
      case "warehouse":
        return "\u0421\u043A\u043B\u0430\u0434 " + rng.pick(["\u043A\u0443\u043F\u0446\u043E\u0432", "\u043E\u0431\u0449\u0438\u043D\u044B", "\u0437\u0435\u0440\u043D\u0430", "\u0440\u0435\u0447\u043D\u043E\u0433\u043E \u0442\u043E\u0440\u0433\u0430"]);
      case "cottage":
        return `\u0425\u0438\u0436\u0438\u043D\u0430 ${owner.genitive}`;
      default:
        return `\u0414\u043E\u043C ${owner.genitive}`;
    }
  }
  var D = (nom, gen, loc) => ({ title: nom, nom, gen, loc });
  var DUNGEONS = [D("\u0421\u0442\u0430\u0440\u0430\u044F \u043A\u0440\u0438\u043F\u0442\u0430", "\u0421\u0442\u0430\u0440\u043E\u0439 \u043A\u0440\u0438\u043F\u0442\u044B", "\u0432 \u0421\u0442\u0430\u0440\u043E\u0439 \u043A\u0440\u0438\u043F\u0442\u0435"), D("\u0417\u0430\u0431\u044B\u0442\u044B\u0435 \u0441\u043A\u043B\u0435\u043F\u044B", "\u0417\u0430\u0431\u044B\u0442\u044B\u0445 \u0441\u043A\u043B\u0435\u043F\u043E\u0432", "\u0432 \u0417\u0430\u0431\u044B\u0442\u044B\u0445 \u0441\u043A\u043B\u0435\u043F\u0430\u0445"), D("\u0420\u0443\u0434\u043D\u0438\u043A \u043C\u0435\u0440\u0442\u0432\u0435\u0446\u043E\u0432", "\u0420\u0443\u0434\u043D\u0438\u043A\u0430 \u043C\u0435\u0440\u0442\u0432\u0435\u0446\u043E\u0432", "\u0432 \u0420\u0443\u0434\u043D\u0438\u043A\u0435 \u043C\u0435\u0440\u0442\u0432\u0435\u0446\u043E\u0432"), D("\u041A\u0430\u0442\u0430\u043A\u043E\u043C\u0431\u044B \u043F\u043E\u0434 \u0445\u043E\u043B\u043C\u043E\u043C", "\u041A\u0430\u0442\u0430\u043A\u043E\u043C\u0431 \u043F\u043E\u0434 \u0445\u043E\u043B\u043C\u043E\u043C", "\u0432 \u041A\u0430\u0442\u0430\u043A\u043E\u043C\u0431\u0430\u0445 \u043F\u043E\u0434 \u0445\u043E\u043B\u043C\u043E\u043C"), D("\u0420\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u043D\u0430\u044F \u0443\u0441\u044B\u043F\u0430\u043B\u044C\u043D\u0438\u0446\u0430", "\u0420\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u043D\u043E\u0439 \u0443\u0441\u044B\u043F\u0430\u043B\u044C\u043D\u0438\u0446\u044B", "\u0432 \u0420\u0430\u0437\u0440\u0443\u0448\u0435\u043D\u043D\u043E\u0439 \u0443\u0441\u044B\u043F\u0430\u043B\u044C\u043D\u0438\u0446\u0435")];
  var FORTS = [D("\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D\u043D\u0430\u044F \u043A\u0440\u0435\u043F\u043E\u0441\u0442\u044C", "\u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D\u043D\u043E\u0439 \u043A\u0440\u0435\u043F\u043E\u0441\u0442\u0438", "\u0432 \u0417\u0430\u0431\u0440\u043E\u0448\u0435\u043D\u043D\u043E\u0439 \u043A\u0440\u0435\u043F\u043E\u0441\u0442\u0438"), D("\u0421\u0435\u0440\u0430\u044F \u0446\u0438\u0442\u0430\u0434\u0435\u043B\u044C", "\u0421\u0435\u0440\u043E\u0439 \u0446\u0438\u0442\u0430\u0434\u0435\u043B\u0438", "\u0432 \u0421\u0435\u0440\u043E\u0439 \u0446\u0438\u0442\u0430\u0434\u0435\u043B\u0438"), D("\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u044C \u043D\u0430 \u0445\u043E\u043B\u043C\u0435", "\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u0438 \u043D\u0430 \u0445\u043E\u043B\u043C\u0435", "\u0432 \u041A\u0440\u0435\u043F\u043E\u0441\u0442\u0438 \u043D\u0430 \u0445\u043E\u043B\u043C\u0435"), D("\u0420\u0430\u0437\u043E\u0440\u0451\u043D\u043D\u044B\u0439 \u0437\u0430\u043C\u043E\u043A", "\u0420\u0430\u0437\u043E\u0440\u0451\u043D\u043D\u043E\u0433\u043E \u0437\u0430\u043C\u043A\u0430", "\u0432 \u0420\u0430\u0437\u043E\u0440\u0451\u043D\u043D\u043E\u043C \u0437\u0430\u043C\u043A\u0435")];
  var ROLE_GROUPS = {
    street: [["\u043F\u0440\u043E\u0445\u043E\u0436\u0438\u0439", "\u043F\u0440\u043E\u0445\u043E\u0436\u0430\u044F"], ["\u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446", "\u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0430"], ["\u043F\u0443\u0442\u043D\u0438\u043A", "\u043F\u0443\u0442\u043D\u0438\u0446\u0430"], ["\u0440\u0435\u043C\u0435\u0441\u043B\u0435\u043D\u043D\u0438\u043A", "\u0440\u0435\u043C\u0435\u0441\u043B\u0435\u043D\u043D\u0438\u0446\u0430"], ["\u0433\u043E\u0440\u043E\u0436\u0430\u043D\u0438\u043D", "\u0433\u043E\u0440\u043E\u0436\u0430\u043D\u043A\u0430"]],
    camp: [["\u043F\u0443\u0442\u043D\u0438\u043A", "\u043F\u0443\u0442\u043D\u0438\u0446\u0430"], ["\u043E\u0445\u043E\u0442\u043D\u0438\u043A", "\u043E\u0445\u043E\u0442\u043D\u0438\u0446\u0430"], ["\u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446", "\u0442\u043E\u0440\u0433\u043E\u0432\u043A\u0430"], ["\u043F\u0430\u043B\u043E\u043C\u043D\u0438\u043A", "\u043F\u0430\u043B\u043E\u043C\u043D\u0438\u0446\u0430"]],
    dungeon: [["\u043E\u0442\u0448\u0435\u043B\u044C\u043D\u0438\u043A", "\u043E\u0442\u0448\u0435\u043B\u044C\u043D\u0438\u0446\u0430"], ["\u0438\u0441\u043A\u0430\u0442\u0435\u043B\u044C", "\u0438\u0441\u043A\u0430\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430"], ["\u043F\u043B\u0435\u043D\u043D\u0438\u043A", "\u043F\u043B\u0435\u043D\u043D\u0438\u0446\u0430"], ["\u0431\u0440\u043E\u0434\u044F\u0433\u0430", "\u0431\u0440\u043E\u0434\u044F\u0433\u0430"]],
    guard: [["\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u043A", "\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430"]],
    guest: [["\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C", "\u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430"]]
  };
  var roleFor = (group, gender, rng) => {
    const list = ROLE_GROUPS[group], pair = rng && list.length > 1 ? rng.pick(list) : list[0];
    return pair[gender === "female" ? 1 : 0];
  };
  var plural = (n, [one, few, many]) => {
    const m = Math.abs(n) % 100, d = m % 10;
    return m > 10 && m < 20 ? many : d === 1 ? one : d >= 2 && d <= 4 ? few : many;
  };
  var GREET2 = {
    tavern: ["\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C! \u041F\u0440\u0438\u0441\u0430\u0436\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C, \u0443 \u043D\u0430\u0441 \u0442\u0435\u043F\u043B\u043E \u0438 \u043D\u0435\u0434\u043E\u0440\u043E\u0433\u043E.", "\u0417\u0430\u0445\u043E\u0434\u0438\u0442\u0435, \u043F\u0443\u0442\u043D\u0438\u043A\u0438. \u041E\u0433\u043E\u043D\u044C \u0432 \u043E\u0447\u0430\u0433\u0435 \u043D\u0435 \u0433\u0430\u0441\u043D\u0435\u0442 \u0441 \u0441\u0430\u043C\u043E\u0433\u043E \u0443\u0442\u0440\u0430.", "\u0427\u0435\u0433\u043E \u0436\u0435\u043B\u0430\u0435\u0442\u0435? \u042D\u043B\u044C, \u043F\u043E\u0445\u043B\u0451\u0431\u043A\u0430, \u043C\u0435\u0441\u0442\u043E \u0443 \u043E\u0433\u043D\u044F?"],
    smithy: ["\u041E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u0435\u0435 \u0441 \u0443\u0433\u043B\u044F\u043C\u0438. \u0415\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u0441\u043B\u043E\u043C\u0430\u043B\u043E\u0441\u044C \u2014 \u0437\u0430\u0439\u0434\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435, \u0441\u0435\u0439\u0447\u0430\u0441 \u043C\u043D\u043E\u0433\u043E \u0437\u0430\u043A\u0430\u0437\u043E\u0432.", "\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043C\u0435\u0442\u0430\u043B\u043B \u043B\u044E\u0431\u0438\u0442 \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u0435. \u0427\u0442\u043E \u0432\u0430\u043C \u043D\u0443\u0436\u043D\u043E?"],
    alchemist: ["\u041D\u0435 \u0442\u0440\u043E\u0433\u0430\u0439\u0442\u0435 \u0441\u043A\u043B\u044F\u043D\u043A\u0438 \u0431\u0435\u0437 \u0441\u043F\u0440\u043E\u0441\u0430, \u043F\u043E\u043B\u043E\u0432\u0438\u043D\u0430 \u0438\u0437 \u043D\u0438\u0445 \u043A\u0443\u0441\u0430\u0435\u0442\u0441\u044F.", "\u0422\u0440\u0430\u0432\u044B, \u043D\u0430\u0441\u0442\u043E\u0439\u043A\u0438, \u043F\u043E\u0440\u043E\u0448\u043A\u0438... \u0421\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0438\u0445\u043E."],
    shop: ["\u0417\u0430\u0445\u043E\u0434\u0438\u0442\u0435, \u0433\u043B\u044F\u0434\u0438\u0442\u0435. \u0426\u0435\u043D\u044B \u0447\u0435\u0441\u0442\u043D\u044B\u0435, \u0442\u043E\u0432\u0430\u0440 \u043B\u0435\u0436\u0438\u0442 \u043D\u0430 \u0432\u0438\u0434\u0443.", "\u0412\u0441\u0451, \u0447\u0442\u043E \u043D\u0443\u0436\u043D\u043E \u0432 \u0434\u043E\u0440\u043E\u0433\u0435, \u043D\u0430\u0439\u0434\u0451\u0442\u0441\u044F \u043D\u0430 \u044D\u0442\u0438\u0445 \u043F\u043E\u043B\u043A\u0430\u0445."],
    chapel: ["\u041C\u0438\u0440 \u0432\u0430\u043C. \u0421\u0432\u0435\u0447\u0438 \u0437\u0434\u0435\u0441\u044C \u0433\u043E\u0440\u044F\u0442 \u0434\u043B\u044F \u0432\u0441\u0435\u0445, \u043A\u0442\u043E \u043F\u0440\u0438\u0445\u043E\u0434\u0438\u0442 \u0441 \u043C\u0438\u0440\u043E\u043C.", "\u0422\u0438\u0445\u043E \u0443 \u043D\u0430\u0441, \u043D\u043E \u0434\u0432\u0435\u0440\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u043E\u0442\u043A\u0440\u044B\u0442\u044B."],
    guard: ["\u0421\u0442\u043E\u044F\u0442\u044C. \u0410\u0445, \u044D\u0442\u043E \u0432\u044B. \u041F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u0431\u0435\u0437 \u0448\u0443\u043C\u0430.", "\u0421\u043B\u0443\u0436\u0431\u0443 \u043D\u0435\u0441\u0451\u043C \u043A\u0440\u0443\u0433\u043B\u044B\u0435 \u0441\u0443\u0442\u043A\u0438. \u0427\u0442\u043E-\u0442\u043E \u0441\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C?"],
    warehouse: ["\u0421\u043A\u043B\u0430\u0434 \u0437\u0430\u043A\u0440\u044B\u0442 \u0434\u043B\u044F \u043F\u043E\u0441\u0442\u043E\u0440\u043E\u043D\u043D\u0438\u0445. \u0412\u043F\u0440\u043E\u0447\u0435\u043C, \u0440\u0430\u0437 \u0443\u0436 \u0432\u044B \u0437\u0434\u0435\u0441\u044C...", "\u0422\u0443\u0442 \u0432\u0441\u0451 \u043F\u0440\u043E\u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043E, \u043D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u0442\u0440\u043E\u0433\u0430\u0439\u0442\u0435."],
    library: ["\u0422\u0438\u0448\u0435. \u0411\u0443\u043C\u0430\u0433\u0430 \u043D\u0435 \u043B\u044E\u0431\u0438\u0442 \u0441\u043F\u0435\u0448\u043A\u0438.", "\u0425\u043E\u0442\u0438\u0442\u0435 \u0447\u0442\u043E-\u0442\u043E \u043F\u0440\u043E\u0447\u0435\u0441\u0442\u044C \u0438\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u0437\u0430\u043F\u0438\u0441\u0430\u0442\u044C?"],
    guest: ["\u041F\u0440\u0438\u0441\u0430\u0436\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C, \u043C\u0435\u0441\u0442\u0430 \u0445\u0432\u0430\u0442\u0438\u0442.", "\u042D\u043B\u044C \u0437\u0434\u0435\u0441\u044C \u043D\u0435\u043F\u043B\u043E\u0445\u043E\u0439, \u043D\u0435 \u0436\u0430\u043B\u0443\u0439\u0442\u0435\u0441\u044C.", "\u0422\u043E\u0436\u0435 \u0441 \u0434\u043E\u0440\u043E\u0433\u0438? \u0423\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u0439\u0442\u0435\u0441\u044C.", "\u0422\u0438\u0448\u0435, \u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043E\u0433\u0440\u0435\u043B\u0441\u044F \u0443 \u043E\u0433\u043D\u044F."],
    house: ["\u0414\u043E\u0431\u0440\u044B\u0439 \u0434\u0435\u043D\u044C. \u041D\u0435 \u0447\u0430\u0441\u0442\u043E \u043A \u043D\u0430\u043C \u0437\u0430\u0445\u043E\u0434\u044F\u0442 \u0433\u043E\u0441\u0442\u0438.", "\u041F\u0440\u043E\u0445\u043E\u0434\u0438\u0442\u0435, \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u043E\u0433\u0438 \u0432\u044B\u0442\u0440\u0438\u0442\u0435.", "\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435. \u0427\u0442\u043E \u043F\u0440\u0438\u0432\u0435\u043B\u043E \u0432\u0430\u0441 \u0432 \u043D\u0430\u0448 \u0434\u043E\u043C?"],
    cottage: ["\u041B\u0435\u0441 \u0440\u044F\u0434\u043E\u043C, \u0432\u043E\u0442 \u0438 \u0436\u0438\u0432\u0451\u043C \u0442\u0438\u0445\u043E. \u0427\u0435\u043C \u043C\u043E\u0433\u0443 \u043F\u043E\u043C\u043E\u0447\u044C?", "\u041D\u0435 \u0436\u0434\u0430\u043B\u0438 \u0433\u043E\u0441\u0442\u0435\u0439, \u043D\u043E \u0437\u0430\u0445\u043E\u0434\u0438\u0442\u0435."],
    street: ["\u0417\u0434\u0440\u0430\u0432\u0441\u0442\u0432\u0443\u0439\u0442\u0435, \u043F\u0443\u0442\u043D\u0438\u043A\u0438.", "\u0414\u0430\u043B\u0435\u043A\u043E \u043B\u0438 \u043F\u0443\u0442\u044C \u0434\u0435\u0440\u0436\u0438\u0442\u0435?", "\u0414\u043E\u0431\u0440\u043E\u0433\u043E \u0434\u043D\u044F. \u041D\u043E\u0432\u044B\u0435 \u043B\u0438\u0446\u0430 \u0443 \u043D\u0430\u0441 \u0432 \u0434\u0438\u043A\u043E\u0432\u0438\u043D\u043A\u0443.", "\u0410, \u0447\u0443\u0436\u0430\u043A\u0438. \u041D\u0438\u0447\u0435\u0433\u043E, \u0443 \u043D\u0430\u0441 \u0442\u0443\u0442 \u043C\u0438\u0440\u043D\u043E... \u043F\u043E\u0447\u0442\u0438 \u0432\u0441\u0435\u0433\u0434\u0430."],
    outskirts: ["\u0422\u0441\u0441. \u0413\u043E\u0432\u043E\u0440\u0438\u0442\u0435 \u0442\u0438\u0448\u0435, \u0437\u0434\u0435\u0441\u044C \u043D\u0435\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E.", "\u041E\u0433\u043E\u043D\u044C \u0443 \u043C\u0435\u043D\u044F \u043E\u0431\u0449\u0438\u0439, \u0441\u0430\u0434\u0438\u0442\u0435\u0441\u044C."],
    keep: ["\u0421\u0442\u043E\u0439. \u041D\u0430\u0437\u043E\u0432\u0438 \u0441\u0435\u0431\u044F \u0438 \u0446\u0435\u043B\u044C \u043F\u0440\u0438\u0445\u043E\u0434\u0430.", "\u0417\u0434\u0435\u0441\u044C \u043D\u0443\u0436\u0435\u043D \u043F\u043E\u0440\u044F\u0434\u043E\u043A. \u0411\u0435\u0437 \u0433\u043B\u0443\u043F\u043E\u0441\u0442\u0435\u0439."],
    lordhall: ["\u041F\u043E\u043A\u043E\u0438 \u043B\u043E\u0440\u0434\u0430. \u0412\u0430\u043C \u0437\u0434\u0435\u0441\u044C \u043D\u0435 \u043C\u0435\u0441\u0442\u043E, \u043D\u043E \u0440\u0430\u0437 \u0432\u044B \u0434\u043E\u0448\u043B\u0438..."],
    fortress: ["\u0421\u0442\u043E\u0439. \u041D\u0430\u0437\u043E\u0432\u0438 \u0441\u0435\u0431\u044F \u0438 \u0446\u0435\u043B\u044C \u043F\u0440\u0438\u0445\u043E\u0434\u0430.", "\u0417\u0434\u0435\u0441\u044C \u043D\u0443\u0436\u0435\u043D \u043F\u043E\u0440\u044F\u0434\u043E\u043A. \u0411\u0435\u0437 \u0433\u043B\u0443\u043F\u043E\u0441\u0442\u0435\u0439."],
    dungeon: ["\u0416\u0438\u0432\u044B\u0435? \u0422\u0430\u043A \u0433\u043B\u0443\u0431\u043E\u043A\u043E? \u0414\u0430\u0432\u043D\u043E \u0441\u044E\u0434\u0430 \u043D\u0438\u043A\u0442\u043E \u043D\u0435 \u0441\u043F\u0443\u0441\u043A\u0430\u043B\u0441\u044F.", "\u041B\u0443\u0447\u0448\u0435 \u0431\u044B \u0432\u0430\u043C \u0431\u044B\u043B\u043E \u043E\u0441\u0442\u0430\u0442\u044C\u0441\u044F \u043D\u0430\u0432\u0435\u0440\u0445\u0443."]
  };
  var BYE2 = ["\u0423\u0434\u0430\u0447\u0438 \u0432\u0430\u043C.", "\u0411\u0435\u0440\u0435\u0433\u0438\u0442\u0435 \u0441\u0435\u0431\u044F.", "\u0417\u0430\u0445\u043E\u0434\u0438\u0442\u0435 \u0435\u0449\u0451.", "\u0414\u043E\u0431\u0440\u043E\u0439 \u0434\u043E\u0440\u043E\u0433\u0438.", "\u0415\u0441\u043B\u0438 \u0447\u0442\u043E \u2014 \u044F \u0437\u0434\u0435\u0441\u044C."];
  function rumorLines2(rng, facts) {
    const out = [];
    for (const f of rng.shuffle(facts).slice(0, 3)) {
      const r = f.ref;
      switch (f.kind) {
        case "cache":
          out.push(`\u0413\u043E\u0432\u043E\u0440\u044F\u0442, \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435 ${r.gen} \u043A\u0442\u043E-\u0442\u043E \u043F\u0440\u0438\u043F\u0440\u044F\u0442\u0430\u043B \u0441\u0443\u043D\u0434\u0443\u043A. \u041F\u0440\u043E\u0441\u0442\u043E \u0442\u0430\u043A \u0435\u0433\u043E \u043D\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u044C.`);
          break;
        case "trap":
          out.push(`\u0411\u0443\u0434\u044C\u0442\u0435 \u043E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u044B ${r.loc}: \u043D\u0430 \u043F\u043E\u043B\u0443 \u0442\u0430\u043C \u0435\u0441\u0442\u044C \u043F\u043B\u0438\u0442\u044B \u0441 \u043F\u043E\u0434\u0432\u043E\u0445\u043E\u043C. \u041E\u0434\u0438\u043D \u0431\u0440\u043E\u0434\u044F\u0433\u0430 \u043E\u0442\u0442\u0443\u0434\u0430 \u0445\u0440\u043E\u043C\u0430\u0435\u0442 \u0434\u043E \u0441\u0438\u0445 \u043F\u043E\u0440.`);
          break;
        case "lock":
          out.push(`\u041E\u0434\u043D\u0430 \u0438\u0437 \u043A\u043E\u043C\u043D\u0430\u0442 ${r.gen} \u0437\u0430\u043F\u0435\u0440\u0442\u0430 \u043D\u0430 \u0445\u043E\u0440\u043E\u0448\u0438\u0439 \u0437\u0430\u043C\u043E\u043A. \u041A\u043B\u044E\u0447 \u043E\u0442 \u043D\u0435\u0451, \u0433\u043E\u0432\u043E\u0440\u044F\u0442, \u0441\u043F\u0440\u044F\u0442\u0430\u043D \u0433\u0434\u0435-\u0442\u043E \u043D\u0435\u043F\u043E\u0434\u0430\u043B\u0451\u043A\u0443.`);
          break;
        case "dungeon":
          out.push(`\u0417\u0430 \u0433\u043E\u0440\u043E\u0434\u043E\u043C, \u0443 \u0434\u043E\u0440\u043E\u0433\u0438, \u0435\u0441\u0442\u044C ${r.nom}. \u041E\u0442\u0442\u0443\u0434\u0430 \u043F\u043E \u043D\u043E\u0447\u0430\u043C \u0434\u043E\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u0433\u0443\u043B, \u0438 \u043C\u0435\u0441\u0442\u043D\u044B\u0435 \u0442\u0443\u0434\u0430 \u043D\u0435 \u0445\u043E\u0434\u044F\u0442.`);
          break;
        case "fortress":
          out.push(`\u0413\u043E\u0432\u043E\u0440\u044F\u0442, ${r.loc} \u0434\u0430\u0432\u043D\u043E \u043D\u0435\u0442 \u0445\u043E\u0437\u044F\u0438\u043D\u0430, \u043D\u043E \u0441\u0442\u0440\u0430\u0436\u0430 \u0442\u0430\u043C \u0432\u0441\u0451 \u0435\u0449\u0451 \u0441\u0442\u043E\u0438\u0442.`);
          break;
        case "tavern":
          out.push(`\u041B\u0443\u0447\u0448\u0438\u0439 \u044D\u043B\u044C \u0432 \u043E\u043A\u0440\u0443\u0433\u0435 \u043D\u0430\u043B\u0438\u0432\u0430\u044E\u0442 ${r.loc}. \u0421\u043F\u0440\u043E\u0441\u0438\u0442\u0435 \u0445\u043E\u0437\u044F\u0438\u043D\u0430 \u043F\u0440\u043E \u0441\u0442\u0430\u0440\u044B\u0435 \u0431\u043E\u0447\u043A\u0438 \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435.`);
          break;
        default:
      }
    }
    return out;
  }
  var TOPICS = {
    tavern: ["\u0421\u0435\u0433\u043E\u0434\u043D\u044F \u043F\u0440\u0438\u0432\u0435\u0437\u043B\u0438 \u0441\u0432\u0435\u0436\u0435\u0435 \u043F\u0438\u0432\u043E, \u043D\u043E \u0431\u043E\u0447\u043A\u0443 \u043B\u0443\u0447\u0448\u0435 \u0431\u0440\u0430\u0442\u044C \u0441 \u0443\u0442\u0440\u0430.", "\u041F\u043E\u0441\u0442\u043E\u044F\u043B\u044C\u0446\u044B \u043F\u0440\u0438\u0445\u043E\u0434\u044F\u0442 \u0438 \u0443\u0445\u043E\u0434\u044F\u0442, \u0430 \u043A\u043E\u0448\u0435\u043B\u0438 \u0443 \u0432\u0441\u0435\u0445 \u043B\u0451\u0433\u043A\u0438\u0435.", "\u041D\u0435 \u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435, \u0447\u0442\u043E \u0432 \u043F\u043E\u0445\u043B\u0451\u0431\u043A\u0435. \u0412\u043A\u0443\u0441\u043D\u043E, \u0438 \u043B\u0430\u0434\u043D\u043E.", "\u0415\u0441\u043B\u0438 \u043D\u0443\u0436\u043D\u0430 \u043A\u043E\u043C\u043D\u0430\u0442\u0430, \u043B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445 \u0437\u0430 \u0441\u0442\u043E\u0439\u043A\u043E\u0439."],
    smithy: ["\u0425\u043E\u0440\u043E\u0448\u0438\u0439 \u043A\u043B\u0438\u043D\u043E\u043A \u043D\u0435 \u043B\u044E\u0431\u0438\u0442 \u0441\u043F\u0435\u0448\u043A\u0438, \u0430 \u043F\u043B\u043E\u0445\u043E\u0439 \u043D\u0435 \u0441\u0442\u043E\u0438\u0442 \u0434\u0435\u043D\u0435\u0433.", "\u0416\u0435\u043B\u0435\u0437\u043E \u0434\u043E\u0440\u043E\u0436\u0430\u0435\u0442 \u0441 \u043A\u0430\u0436\u0434\u044B\u043C \u043C\u0435\u0441\u044F\u0446\u0435\u043C.", "\u041F\u043E\u0434\u043A\u043E\u0432\u0443 \u0441\u0434\u0435\u043B\u0430\u044E \u0431\u044B\u0441\u0442\u0440\u043E, \u043C\u0435\u0447 \u043F\u0440\u0438\u0434\u0451\u0442\u0441\u044F \u043F\u043E\u0434\u043E\u0436\u0434\u0430\u0442\u044C."],
    alchemist: ["\u042D\u0442\u0443 \u043D\u0430\u0441\u0442\u043E\u0439\u043A\u0443 \u043B\u0443\u0447\u0448\u0435 \u043D\u0435 \u043D\u044E\u0445\u0430\u0442\u044C. \u0421\u0435\u0440\u044C\u0451\u0437\u043D\u043E.", "\u0422\u0440\u0430\u0432\u044B \u043D\u044B\u043D\u0447\u0435 \u0431\u0435\u0440\u0443\u0442 \u0441 \u0431\u043E\u0435\u043C, \u0430 \u0441\u043E\u0431\u0438\u0440\u0430\u0442\u044C \u0438\u0445 \u043D\u0435\u043A\u043E\u043C\u0443.", "\u0417\u0435\u043B\u044C\u044F \u043D\u0435 \u043F\u0440\u043E\u0449\u0430\u044E\u0442 \u0441\u043F\u0435\u0448\u043A\u0438. \u041D\u0438 \u0432 \u0432\u0430\u0440\u043A\u0435, \u043D\u0438 \u0432 \u043F\u0438\u0442\u044C\u0435."],
    shop: ["\u0422\u043E\u0432\u0430\u0440 \u043F\u0440\u0438\u0432\u043E\u0437\u044F\u0442 \u0440\u0435\u0434\u043A\u043E, \u0442\u0430\u043A \u0447\u0442\u043E \u0432\u044B\u0431\u0438\u0440\u0430\u0439\u0442\u0435, \u043F\u043E\u043A\u0430 \u0435\u0441\u0442\u044C \u0438\u0437 \u0447\u0435\u0433\u043E.", "\u0422\u043E\u0440\u0433\u0443\u044E\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0441 \u0442\u0435\u043C\u0438, \u043A\u0442\u043E \u043D\u0435 \u0442\u043E\u0440\u0433\u0443\u0435\u0442\u0441\u044F \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0433\u0440\u043E\u043C\u043A\u043E.", "\u041C\u0435\u043B\u043E\u0447\u044C \u043C\u0435\u043D\u044F\u044E \u043E\u0445\u043E\u0442\u043D\u043E, \u0430 \u043A\u0440\u0443\u043F\u043D\u044B\u0435 \u0434\u0435\u043D\u044C\u0433\u0438 \u043B\u044E\u0431\u043B\u044E \u0432\u0438\u0434\u0435\u0442\u044C \u0437\u0430\u0440\u0430\u043D\u0435\u0435."],
    chapel: ["\u0421\u0432\u0435\u0447\u0438 \u0437\u0434\u0435\u0441\u044C \u0433\u043E\u0440\u044F\u0442 \u0437\u0430 \u0432\u0441\u0435\u0445, \u043A\u043E\u0433\u043E \u043D\u0435\u0442 \u0440\u044F\u0434\u043E\u043C.", "\u0415\u0441\u043B\u0438 \u043D\u0430 \u0441\u0435\u0440\u0434\u0446\u0435 \u0442\u044F\u0436\u0435\u043B\u043E, \u043F\u043E\u0441\u0438\u0434\u0438\u0442\u0435 \u0432 \u0442\u0438\u0448\u0438\u043D\u0435.", "\u041C\u0438\u043B\u043E\u0441\u0435\u0440\u0434\u0438\u0435 \u043D\u0435 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0438\u043C\u0451\u043D."],
    guard: ["\u041D\u043E\u0447\u044C\u044E \u043D\u0430 \u0443\u043B\u0438\u0446\u0430\u0445 \u0442\u0438\u0445\u043E. \u042D\u0442\u043E \u043C\u0435\u043D\u044F \u0438 \u0442\u0440\u0435\u0432\u043E\u0436\u0438\u0442.", "\u0412\u043E\u0440\u043E\u0442\u0430 \u0437\u0430\u043F\u0438\u0440\u0430\u0435\u043C \u043D\u0430 \u0437\u0430\u043A\u0430\u0442\u0435. \u041E\u043F\u043E\u0437\u0434\u0430\u0432\u0448\u0438\u043C \u043D\u043E\u0447\u0435\u0432\u0430\u0442\u044C \u043F\u043E\u0434 \u043D\u0435\u0431\u043E\u043C.", "\u0414\u0440\u0430\u043A\u0438 \u0432 \u0442\u0430\u0432\u0435\u0440\u043D\u0435 \u0441\u043B\u0443\u0447\u0430\u044E\u0442\u0441\u044F, \u043D\u043E \u0434\u043E \u043E\u0440\u0443\u0436\u0438\u044F \u0440\u0435\u0434\u043A\u043E \u0434\u043E\u0445\u043E\u0434\u0438\u0442."],
    warehouse: ["\u0412\u0441\u0451 \u043F\u043E\u0441\u0447\u0438\u0442\u0430\u043D\u043E, \u043E\u043F\u0435\u0447\u0430\u0442\u0430\u043D\u043E \u0438 \u0437\u0430\u043F\u0438\u0441\u0430\u043D\u043E. \u041D\u0435 \u0442\u0440\u043E\u0433\u0430\u0439\u0442\u0435.", "\u041A\u0440\u044B\u0441\u044B \u0442\u0443\u0442 \u043A\u0440\u0443\u043F\u043D\u0435\u0435, \u0447\u0435\u043C \u0445\u043E\u0442\u0435\u043B\u043E\u0441\u044C \u0431\u044B.", "\u0422\u043E\u0432\u0430\u0440 \u0438\u0434\u0451\u0442 \u0438 \u0432 \u0433\u043E\u0440\u043E\u0434, \u0438 \u0434\u0430\u043B\u044C\u0448\u0435 \u043F\u043E \u0434\u043E\u0440\u043E\u0433\u0435."],
    library: ["\u041A\u043D\u0438\u0433\u0438 \u0431\u0435\u0440\u0435\u0433\u0443, \u043A\u0430\u043A \u0443\u043C\u0435\u044E. \u041C\u044B\u0448\u0438 \u043C\u0435\u043D\u044F \u043F\u0435\u0440\u0435\u0438\u0433\u0440\u0430\u043B\u0438.", "\u0422\u0443\u0442 \u0435\u0441\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u0438 \u043D\u0430 \u043C\u043D\u043E\u0433\u043E \u043B\u0435\u0442 \u043D\u0430\u0437\u0430\u0434, \u0435\u0441\u043B\u0438 \u0432\u0430\u043C \u0438\u043D\u0442\u0435\u0440\u0435\u0441\u043D\u043E.", "\u0427\u0435\u0440\u043D\u0438\u043B \u0432\u0441\u0435\u0433\u0434\u0430 \u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442."],
    house: ["\u0425\u043E\u0437\u044F\u0439\u0441\u0442\u0432\u043E \u043D\u0435\u0431\u043E\u043B\u044C\u0448\u043E\u0435, \u043D\u043E \u0441\u0432\u043E\u0451.", "\u0414\u0435\u0442\u0438 \u0434\u0430\u0432\u043D\u043E \u0432\u044B\u0440\u043E\u0441\u043B\u0438, \u0434\u043E\u043C \u0441\u0442\u0430\u043B \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0442\u0438\u0445\u0438\u043C.", "\u041F\u0435\u0447\u044C \u0433\u0440\u0435\u0435\u0442 \u0445\u043E\u0440\u043E\u0448\u043E, \u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C\u0441\u044F \u0433\u0440\u0435\u0445.", "\u0421\u043E\u0441\u0435\u0434\u0438 \u0448\u0443\u043C\u043D\u044B\u0435, \u043D\u043E \u0441\u0432\u043E\u0438."],
    cottage: ["\u041B\u0435\u0441 \u043A\u043E\u0440\u043C\u0438\u0442, \u043F\u043E\u043A\u0430 \u0435\u0433\u043E \u043D\u0435 \u043E\u0431\u0438\u0436\u0430\u0435\u0448\u044C.", "\u0422\u0440\u043E\u043F\u044B \u0437\u0434\u0435\u0441\u044C \u043F\u0443\u0442\u0430\u043D\u044B\u0435, \u043F\u0440\u0438\u0448\u043B\u044B\u043C \u043B\u0443\u0447\u0448\u0435 \u0434\u0435\u0440\u0436\u0430\u0442\u044C\u0441\u044F \u0434\u043E\u0440\u043E\u0433\u0438.", "\u0417\u0438\u043C\u043E\u0439 \u0441\u044E\u0434\u0430 \u043D\u0435 \u0434\u043E\u0431\u0440\u0430\u0442\u044C\u0441\u044F \u0431\u0435\u0437 \u043B\u044B\u0436 \u0438 \u0442\u0435\u0440\u043F\u0435\u043D\u0438\u044F."],
    guest: ["\u041C\u043D\u0435 \u0431\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u044B\u0441\u043F\u0430\u0442\u044C\u0441\u044F \u0438 \u0434\u0430\u043B\u044C\u0448\u0435 \u0432 \u043F\u0443\u0442\u044C.", "\u0417\u0434\u0435\u0441\u044C, \u0433\u043E\u0432\u043E\u0440\u044F\u0442, \u0445\u043E\u0440\u043E\u0448\u043E \u043A\u043E\u0440\u043C\u044F\u0442.", "\u0414\u043E\u0440\u043E\u0433\u0430 \u0431\u044B\u043B\u0430 \u0434\u043E\u043B\u0433\u0430\u044F, \u043D\u043E\u0433\u0438 \u0433\u0443\u0434\u044F\u0442."],
    street: ["\u041F\u043E\u0433\u043E\u0434\u0430 \u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F, \u043D\u043E\u0433\u0438 \u043D\u043E\u044E\u0442 \u043A \u0434\u043E\u0436\u0434\u044E.", "\u041D\u0430 \u043F\u043B\u043E\u0449\u0430\u0434\u0438 \u0441\u0435\u0433\u043E\u0434\u043D\u044F \u043B\u044E\u0434\u043D\u043E, \u0443 \u043B\u043E\u0442\u043A\u043E\u0432 \u043D\u0435 \u043F\u0440\u043E\u0442\u043E\u043B\u043A\u043D\u0443\u0442\u044C\u0441\u044F.", "\u0423 \u043A\u043E\u043B\u043E\u0434\u0446\u0430 \u0432\u043E\u0434\u0430 \u0441\u043B\u0430\u0449\u0435, \u0447\u0435\u043C \u0432 \u0434\u0440\u0443\u0433\u0438\u0445 \u043C\u0435\u0441\u0442\u0430\u0445 \u0433\u043E\u0440\u043E\u0434\u0430.", "\u0413\u043E\u0432\u043E\u0440\u044F\u0442, \u043A\u0443\u043F\u0446\u044B \u0437\u0430\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u0434\u043E\u0440\u043E\u0433\u0435."],
    outskirts: ["\u041A\u043E\u0441\u0442\u0451\u0440 \u0443 \u043C\u0435\u043D\u044F \u043E\u0431\u0449\u0438\u0439, \u0434\u0440\u043E\u0432 \u0445\u0432\u0430\u0442\u0438\u0442 \u0434\u043E \u0443\u0442\u0440\u0430.", "\u0421 \u0434\u043E\u0440\u043E\u0433\u0438 \u0441\u044E\u0434\u0430 \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u044E\u0442 \u043D\u0435\u0447\u0430\u0441\u0442\u043E.", "\u0415\u0441\u043B\u0438 \u0441\u043B\u044B\u0448\u0438\u0442\u0435 \u0432\u043E\u0439, \u043D\u0435 \u043B\u0435\u0437\u044C\u0442\u0435 \u0432 \u043A\u0443\u0441\u0442\u044B."],
    dungeon: ["\u0417\u0434\u0435\u0441\u044C \u044D\u0445\u043E \u0438\u0433\u0440\u0430\u0435\u0442 \u0448\u0443\u0442\u043A\u0438, \u043D\u0435 \u0432\u0435\u0440\u044C\u0442\u0435 \u0435\u043C\u0443.", "\u041F\u043B\u0438\u0442\u044B \u0432 \u043A\u043E\u0440\u0438\u0434\u043E\u0440\u0430\u0445 \u043B\u0443\u0447\u0448\u0435 \u043E\u0431\u0445\u043E\u0434\u0438\u0442\u044C, \u044F \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u043B \u043D\u0430 \u0441\u0432\u043E\u0438\u0445 \u0431\u043E\u043A\u0430\u0445.", "\u0422\u0438\u0448\u0438\u043D\u0430 \u0442\u0443\u0442 \u043D\u0435 \u043A \u0434\u043E\u0431\u0440\u0443."],
    fortress: ["\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u044C \u0441\u0442\u0430\u0440\u0430\u044F, \u043D\u043E \u0441\u0442\u0435\u043D\u044B \u0435\u0449\u0451 \u0434\u0435\u0440\u0436\u0430\u0442.", "\u041B\u043E\u0440\u0434\u0430 \u0434\u0430\u0432\u043D\u043E \u043D\u0435 \u0432\u0438\u0434\u0435\u043B\u0438, \u043F\u0440\u0438\u043A\u0430\u0437\u044B \u0438\u0434\u0443\u0442 \u043E\u0442 \u043A\u0430\u043F\u0438\u0442\u0430\u043D\u0430."],
    keep: ["\u0412 \u0437\u0430\u043B\u0430\u0445 \u0441\u043A\u0432\u043E\u0437\u043D\u044F\u043A, \u0431\u0443\u0434\u0442\u043E \u0441\u0442\u0435\u043D\u044B \u0434\u044B\u0448\u0430\u0442.", "\u0415\u0441\u043B\u0438 \u0447\u0442\u043E-\u0442\u043E \u043D\u0443\u0436\u043D\u043E, \u043E\u0431\u0440\u0430\u0449\u0430\u0439\u0442\u0435\u0441\u044C \u043A \u043A\u043E\u043C\u0435\u043D\u0434\u0430\u043D\u0442\u0443."]
  };
  function talkFor(rng, building, owner, facts, extraTopic) {
    const kind = GREET2[building] ? building : "house", lines = [rng.pick(GREET2[kind])];
    const byKind = /* @__PURE__ */ new Map();
    for (const f of rng.shuffle(facts)) if (!byKind.has(f.kind)) byKind.set(f.kind, f);
    const rumors = rumorLines2(rng, [...byKind.values()]).slice(0, 2);
    const topic = TOPICS[building] || TOPICS.house;
    lines.push(rng.pick(topic));
    lines.push(...rumors);
    if (extraTopic) lines.push(extraTopic);
    lines.push(rng.pick(BYE2));
    return { lines, knows: rumors };
  }
  var KEY_NAMES2 = ["\u041C\u0435\u0434\u043D\u044B\u0439", "\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0439", "\u0411\u0440\u043E\u043D\u0437\u043E\u0432\u044B\u0439", "\u0427\u0451\u0440\u043D\u044B\u0439", "\u0420\u0436\u0430\u0432\u044B\u0439", "\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u044B\u0439", "\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439", "\u0412\u0438\u0442\u043E\u0439"];
  var THEME2 = {
    kitchen: { gold: [0, 6], gear: [["\u0420\u0430\u0446\u0438\u043E\u043D", 6], ["\u0424\u043B\u044F\u0433\u0430 \u0441 \u0433\u0440\u0430\u0432\u0438\u0440\u043E\u0432\u043A\u043E\u0439", 1], ["\u041C\u0435\u043B", 1]] },
    bedroom: { gold: [3, 16], gear: [["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 2], ["\u041C\u0435\u0434\u0430\u043B\u044C\u043E\u043D \u0441 \u043B\u043E\u043A\u043E\u043D\u043E\u043C", 1], ["\u041F\u0438\u0441\u044C\u043C\u043E \u0431\u0435\u0437 \u0430\u0434\u0440\u0435\u0441\u0430", 2], ["\u0418\u0433\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0441\u0442\u0438", 1]] },
    tavern: { gold: [4, 20], gear: [["\u0420\u0430\u0446\u0438\u043E\u043D", 3], ["\u0418\u0433\u0440\u0430\u043B\u044C\u043D\u044B\u0435 \u043A\u043E\u0441\u0442\u0438", 2], ["\u0424\u043B\u044F\u0433\u0430 \u0441 \u0433\u0440\u0430\u0432\u0438\u0440\u043E\u0432\u043A\u043E\u0439", 2]] },
    smith: { gold: [5, 24], gear: [["\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043C\u0435\u0447", 2], ["\u0411\u0443\u043B\u0430\u0432\u0430", 1], ["\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0449\u0438\u0442", 1], ["\u041A\u043E\u043B\u044C\u0447\u0443\u0436\u043D\u0430\u044F \u0440\u0443\u0431\u0430\u0445\u0430", 1]] },
    alchemy: { gold: [4, 18], gear: [["\u0411\u0438\u043D\u0442\u044B", 4], ["\u042F\u043D\u0442\u0430\u0440\u043D\u0430\u044F \u0431\u0443\u0441\u0438\u043D\u0430", 1]], potions: 0.7 },
    chapel: { gold: [3, 14], gear: [["\u0411\u0438\u043D\u0442\u044B", 2], ["\u041C\u0435\u043B", 2], ["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 1]], potions: 0.5 },
    guard: { gold: [4, 20], gear: [["\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0449\u0438\u0442", 2], ["\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043C\u0435\u0447", 2], ["\u041A\u043E\u0436\u0430\u043D\u0430\u044F \u043A\u0443\u0440\u0442\u043A\u0430", 1], ["\u0412\u0435\u0440\u0451\u0432\u043A\u0430", 1]] },
    storage: { gold: [0, 10], gear: [["\u0412\u0435\u0440\u0451\u0432\u043A\u0430", 3], ["\u041A\u0440\u044E\u043A-\u043A\u043E\u0448\u043A\u0430", 1], ["\u041C\u0435\u043B", 2], ["\u041E\u0433\u043D\u0438\u0432\u043E", 2], ["\u0420\u0430\u0446\u0438\u043E\u043D", 2]] },
    library: { gold: [2, 12], gear: [["\u0421\u0442\u0430\u0440\u0430\u044F \u043A\u0430\u0440\u0442\u0430", 3], ["\u041F\u0438\u0441\u044C\u043C\u043E \u0431\u0435\u0437 \u0430\u0434\u0440\u0435\u0441\u0430", 3], ["\u041C\u0435\u043B", 1]] },
    crypt: { gold: [8, 36], gear: [["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 3], ["\u0422\u0451\u043C\u043D\u0430\u044F \u043C\u043E\u043D\u0435\u0442\u0430", 3], ["\u041A\u043E\u0441\u0442\u044F\u043D\u043E\u0439 \u0441\u0432\u0438\u0441\u0442\u043E\u043A", 1], ["\u0411\u0443\u043B\u0430\u0432\u0430", 1]] },
    vault: { gold: [25, 90], gear: [["\u041E\u0445\u043E\u0442\u043D\u0438\u0447\u0438\u0439 \u043B\u0443\u043A", 2], ["\u041A\u043E\u043B\u044C\u0447\u0443\u0436\u043D\u0430\u044F \u0440\u0443\u0431\u0430\u0445\u0430", 2], ["\u0421\u0435\u0440\u0435\u0431\u0440\u044F\u043D\u043E\u0435 \u043A\u043E\u043B\u044C\u0446\u043E", 3], ["\u041C\u0443\u0437\u044B\u043A\u0430\u043B\u044C\u043D\u0430\u044F \u0448\u043A\u0430\u0442\u0443\u043B\u043A\u0430", 2]], potions: 0.9 },
    camp: { gold: [2, 12], gear: [["\u0420\u0430\u0446\u0438\u043E\u043D", 3], ["\u041E\u0433\u043D\u0438\u0432\u043E", 2], ["\u0412\u0435\u0440\u0451\u0432\u043A\u0430", 2], ["\u041E\u0445\u043E\u0442\u043D\u0438\u0447\u0438\u0439 \u043B\u0443\u043A", 1]] }
  };
  function rollLoot2(rng, theme, depth = 0) {
    const t = THEME2[theme] || THEME2.storage, gold = rng.int(t.gold[0], t.gold[1] + depth * 6);
    const loot = { gold, potions: rng.chance((t.potions ?? 0.22) + depth * 0.08) ? 1 : 0, torches: rng.chance(0.12) ? 1 : 0, gear: [] };
    if (rng.chance(0.55 + depth * 0.1)) loot.gear.push(rng.weighted(t.gear));
    if (depth >= 2 && rng.chance(0.35)) loot.gear.push(rng.weighted(THEME2.vault.gear));
    return loot;
  }
  var gearName = (g) => g.startsWith("\u041A\u043B\u044E\u0447: ") ? `\u043A\u043B\u044E\u0447 \xAB${g.slice(6)}\xBB` : g.charAt(0).toLowerCase() + g.slice(1);
  var lootSentence = (l) => {
    const parts = [];
    if (l.gold) parts.push(`${l.gold} ${plural(l.gold, ["\u043C\u043E\u043D\u0435\u0442\u0430", "\u043C\u043E\u043D\u0435\u0442\u044B", "\u043C\u043E\u043D\u0435\u0442"])}`);
    if (l.potions) parts.push(l.potions === 1 ? "\u043B\u0435\u0447\u0435\u0431\u043D\u043E\u0435 \u0437\u0435\u043B\u044C\u0435" : `${l.potions} ${plural(l.potions, ["\u043B\u0435\u0447\u0435\u0431\u043D\u043E\u0435 \u0437\u0435\u043B\u044C\u0435", "\u043B\u0435\u0447\u0435\u0431\u043D\u044B\u0445 \u0437\u0435\u043B\u044C\u044F", "\u043B\u0435\u0447\u0435\u0431\u043D\u044B\u0445 \u0437\u0435\u043B\u0438\u0439"])}`);
    if (l.torches) parts.push(l.torches === 1 ? "\u0444\u0430\u043A\u0435\u043B" : `${l.torches} ${plural(l.torches, ["\u0444\u0430\u043A\u0435\u043B", "\u0444\u0430\u043A\u0435\u043B\u0430", "\u0444\u0430\u043A\u0435\u043B\u043E\u0432"])}`);
    parts.push(...l.gear.map(gearName));
    return parts.length ? `\u0412\u043D\u0443\u0442\u0440\u0438: ${parts.join(", ")}.` : "\u0412\u043D\u0443\u0442\u0440\u0438 \u0442\u043E\u043B\u044C\u043A\u043E \u043F\u044B\u043B\u044C \u0438 \u043F\u0430\u0443\u0442\u0438\u043D\u0430.";
  };
  var lootText2 = (l) => lootSentence(l).replace(/^Внутри:? ?/, "").replace(/\.$/, "");
  var TRAPS2 = [
    { kind: "dart", name: "\u0414\u0440\u043E\u0442\u0438\u043A\u043E\u0432\u0430\u044F \u043B\u043E\u0432\u0443\u0448\u043A\u0430", save: "dex", dmg: [1, 4], text: "\u0418\u0437 \u0441\u0442\u0435\u043D\u044B \u0432\u044B\u043B\u0435\u0442\u0430\u044E\u0442 \u0434\u0440\u043E\u0442\u0438\u043A\u0438.", hint: "\u0412 \u0449\u0435\u043B\u044F\u0445 \u0441\u0442\u0435\u043D\u044B \u043F\u043E\u0431\u043B\u0451\u0441\u043A\u0438\u0432\u0430\u044E\u0442 \u0442\u043E\u043D\u043A\u0438\u0435 \u043E\u0442\u0432\u0435\u0440\u0441\u0442\u0438\u044F." },
    { kind: "needle", name: "\u042F\u0434\u043E\u0432\u0438\u0442\u0430\u044F \u0438\u0433\u043B\u0430", save: "con", dmg: [1, 4], poison: true, text: "\u0418\u0437 \u0437\u0430\u043C\u043A\u0430 \u0432\u044B\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u0438\u0433\u043B\u0430 \u0441 \u044F\u0434\u043E\u043C.", hint: "\u0420\u044F\u0434\u043E\u043C \u0441 \u0437\u0430\u043C\u043E\u0447\u043D\u043E\u0439 \u0441\u043A\u0432\u0430\u0436\u0438\u043D\u043E\u0439 \u0432\u0438\u0434\u0435\u043D \u043A\u0440\u043E\u0448\u0435\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u043A\u043E\u043B." },
    { kind: "fire", name: "\u041E\u0433\u043D\u0435\u043D\u043D\u0430\u044F \u0441\u0442\u0440\u0443\u044F", save: "dex", dmg: [2, 6], text: "\u0418\u0437-\u0437\u0430 \u043F\u043B\u0438\u0442\u044B \u0431\u044C\u0451\u0442 \u0441\u0442\u0440\u0443\u044F \u043F\u043B\u0430\u043C\u0435\u043D\u0438.", hint: "\u041F\u043B\u0438\u0442\u0430 \u0447\u0443\u0442\u044C \u0442\u0435\u043C\u043D\u0435\u0435 \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u044B\u0445 \u0438 \u043F\u0430\u0445\u043D\u0435\u0442 \u0433\u0430\u0440\u044C\u044E." },
    { kind: "pit", name: "\u042F\u043C\u0430-\u043B\u043E\u0432\u0443\u0448\u043A\u0430", save: "dex", dmg: [2, 6], text: "\u041F\u043E\u043B \u043F\u0440\u043E\u0432\u0430\u043B\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u043E\u0434 \u043D\u043E\u0433\u0430\u043C\u0438.", hint: "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0435 \u043F\u043B\u0438\u0442\u044B \u043B\u0435\u0436\u0430\u0442 \u043D\u0435\u0440\u043E\u0432\u043D\u043E, \u0448\u0432\u044B \u0431\u0443\u0434\u0442\u043E \u043C\u0430\u0441\u043A\u0438\u0440\u0443\u044E\u0442 \u043F\u0443\u0441\u0442\u043E\u0442\u0443." },
    { kind: "alarm", name: "\u0421\u0438\u0433\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u0432\u0435\u0440\u0451\u0432\u043A\u0430", save: "dex", dmg: [0, 0], alarm: true, text: "\u0413\u0434\u0435-\u0442\u043E \u0437\u0432\u0435\u043D\u0438\u0442 \u043A\u043E\u043B\u043E\u043A\u043E\u043B\u044C\u0447\u0438\u043A. \u0412\u0430\u0441 \u0443\u0441\u043B\u044B\u0448\u0430\u043B\u0438.", hint: "\u041D\u0430\u0434 \u043F\u043E\u0440\u043E\u0433\u043E\u043C \u0442\u044F\u043D\u0435\u0442\u0441\u044F \u0442\u043E\u043D\u043A\u0430\u044F \u043D\u0438\u0442\u044C." },
    { kind: "gas", name: "\u042F\u0434\u043E\u0432\u0438\u0442\u044B\u0439 \u0433\u0430\u0437", save: "con", dmg: [1, 6], poison: true, text: "\u0418\u0437 \u0449\u0435\u043B\u0438 \u0432\u044B\u0440\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0431\u043B\u0430\u043A\u043E \u0435\u0434\u043A\u043E\u0433\u043E \u0433\u0430\u0437\u0430.", hint: "\u0412 \u0449\u0435\u043B\u0438 \u0443 \u043F\u043E\u043B\u0430 \u043E\u0441\u0435\u043B\u0430 \u0437\u0435\u043B\u0451\u043D\u0430\u044F \u043F\u044B\u043B\u044C." }
  ];
  function rollTrap2(rng, depth = 0, kinds) {
    const pool = kinds ? TRAPS2.filter((t2) => kinds.includes(t2.kind)) : TRAPS2, t = rng.pick(pool);
    const n = t.dmg[1] ? Math.max(1, t.dmg[0] + Math.floor(depth / 2)) : 0;
    return { kind: t.kind, name: t.name, save: t.save, dc: 11 + depth + rng.int(0, 2), detectDc: 10 + depth + rng.int(0, 3), disarmDc: 11 + depth + rng.int(0, 2), dice: n, sides: t.dmg[1], poison: !!t.poison, alarm: !!t.alarm, text: t.text, hint: t.hint };
  }
  var TRAP_KINDS2 = TRAPS2.map((t) => t.kind);

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
  var WALL_STYLES = {
    plaster: { name: "\u0428\u0442\u0443\u043A\u0430\u0442\u0443\u0440\u043A\u0430", colors: [13352863, 12760723, 13879465] },
    timber: { name: "\u0424\u0430\u0445\u0432\u0435\u0440\u043A", colors: [11901546, 11112031, 12559477] },
    brick: { name: "\u041A\u0438\u0440\u043F\u0438\u0447", colors: [10115653, 9392448, 10839375] },
    stone: { name: "\u041A\u0430\u043C\u0435\u043D\u044C", colors: [8224644, 7632507, 8816781] },
    rough: { name: "\u0413\u0440\u0443\u0431\u044B\u0439 \u043A\u0430\u043C\u0435\u043D\u044C", colors: [6250854, 5658717, 6842992] },
    cave: { name: "\u0421\u043A\u0430\u043B\u0430", colors: [5919816, 5262144, 6577744] },
    castle: { name: "\u041A\u0440\u0435\u043F\u043E\u0441\u0442\u043D\u0430\u044F \u043A\u043B\u0430\u0434\u043A\u0430", colors: [9079952, 8422022, 9672090] }
  };
  var surfaceColor = (id, x, y) => {
    const s = SURFACES[id] || SURFACES.stone;
    return s.colors[((Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0) % s.colors.length];
  };
  var wallColor = (id, x, y) => {
    const s = WALL_STYLES[id] || WALL_STYLES.stone;
    return s.colors[((Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0) % s.colors.length];
  };
  function noise2(seed, x, y) {
    const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, v = (a2, b2) => (hash322(seed + ":" + a2 + "," + b2) & 1023) / 1023, s = (t) => t * t * (3 - 2 * t);
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

  // src/worldgen/scene.js
  var DIRS2 = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  var NON_BLOCKING2 = /* @__PURE__ */ new Set(["door", "portal", "torch", "chandelier", "clue", "trap"]);
  var MAX_LIGHTS2 = 12;
  var key5 = (x, y) => x + "," + y;
  var SceneBuilder2 = class {
    constructor(id, name, W, H, rng, meta = {}) {
      Object.assign(this, { id, name, W, H, rng, meta });
      this.floor = new Uint8Array(W * H);
      this.props = [];
      this.decor = [];
      this.lights = [];
      this.encounters = [];
      this.occ = /* @__PURE__ */ new Map();
      this.reserved = /* @__PURE__ */ new Set();
      this.counter = 0;
      this.anchor = null;
      this._reach = null;
      this.surf = new Array(W * H).fill(null);
      this.baseSurface = meta.base || "stone";
      this.wallStyle = meta.wall || "stone";
    }
    // Поверхность пола. Не влияет на проходимость.
    paint(x, y, w, h, id) {
      for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (this.inb(i, j)) this.surf[j * this.W + i] = id;
    }
    paintCells(cells, id) {
      for (const [x, y] of cells) if (this.inb(x, y)) this.surf[y * this.W + x] = id;
    }
    inb(x, y) {
      return x >= 0 && y >= 0 && x < this.W && y < this.H;
    }
    isFloor(x, y) {
      return this.inb(x, y) && this.floor[y * this.W + x] === 1;
    }
    setFloor(x, y, v = 1) {
      if (this.inb(x, y)) this.floor[y * this.W + x] = v;
      this._reach = null;
    }
    rect(x, y, w, h, v = 1) {
      for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.setFloor(i, j, v);
    }
    // стена — пустая клетка, соседняя с полом (в том числе по диагонали)
    isWall(x, y) {
      if (!this.inb(x, y) || this.isFloor(x, y)) return false;
      for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (this.isFloor(x + i, y + j)) return true;
      return false;
    }
    nid(prefix) {
      return prefix + ++this.counter;
    }
    free(x, y) {
      return this.isFloor(x, y) && !this.occ.has(key5(x, y));
    }
    reserve(x, y) {
      this.reserved.add(key5(x, y));
    }
    floorCells() {
      const out = [];
      for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) if (this.floor[y * this.W + x]) out.push([x, y]);
      return out;
    }
    // Достижимые свободные клетки от якоря (4 направления, как ходят фигуры).
    reachable(skip) {
      const start = this.anchor;
      if (!start) return null;
      const seen = /* @__PURE__ */ new Set(), stack = [start];
      const sk = skip ? key5(skip[0], skip[1]) : null;
      while (stack.length) {
        const [x, y] = stack.pop(), k = key5(x, y);
        if (seen.has(k) || k === sk || !this.free(x, y)) continue;
        seen.add(k);
        for (const [dx, dy] of DIRS2) stack.push([x + dx, y + dy]);
      }
      return seen;
    }
    freeNeighbors(x, y, skip) {
      let n = 0;
      for (const [dx, dy] of DIRS2) {
        const a = x + dx, b = y + dy;
        if (this.free(a, b) && !(skip && skip[0] === a && skip[1] === b)) n++;
      }
      return n;
    }
    // Можно ли поставить сплошной предмет в клетку: клетка свободна, не зарезервирована, проходы целы, у соседей остаётся доступ.
    canBlock(x, y) {
      if (!this.free(x, y) || this.reserved.has(key5(x, y))) return false;
      if (this.freeNeighbors(x, y, [x, y]) < 1) return false;
      if (!this.anchor) return true;
      if (!this._reach) this._reach = this.reachable();
      if (!this._reach.has(key5(x, y))) return false;
      for (const [dx, dy] of DIRS2) {
        const a = x + dx, b = y + dy;
        if (this.occ.has(key5(a, b)) && this.occ.get(key5(a, b)).interactive !== false && this.freeNeighbors(a, b, [x, y]) < 1) return false;
      }
      const after = this.reachable([x, y]);
      return after.size === this._reach.size - 1;
    }
    // Добавляет предмет. Возвращает prop или null, если поставить нельзя.
    put(prop, x = prop.x, y = prop.y) {
      prop.x = x;
      prop.y = y;
      if (!prop.id) prop.id = this.nid(prop.type || "p");
      const solid = prop.solid !== false && !NON_BLOCKING2.has(prop.type);
      if (!solid && !NON_BLOCKING2.has(prop.type) && (this.props.some((q) => q.x === x && q.y === y) || this.reserved.has(key5(x, y)) || !this.isFloor(x, y) || this.occ.has(key5(x, y)))) return null;
      if (solid) {
        if (!this.canBlock(x, y)) return null;
        this.occ.set(key5(x, y), prop);
        this._reach = null;
      }
      this.props.push(prop);
      return prop;
    }
    // Дверь/портал в стене: пол с обеих сторон вдоль оси должен быть стеной, а с одной стороны — пол.
    doorSpot(x, y) {
      if (this.isFloor(x, y)) return null;
      const up = this.isFloor(x, y - 1), dn = this.isFloor(x, y + 1), lf = this.isFloor(x - 1, y), rt = this.isFloor(x + 1, y);
      if ((up || dn) && !lf && !rt && this.isWall(x - 1, y) && this.isWall(x + 1, y)) return { axis: void 0, front: dn ? [x, y + 1] : [x, y - 1] };
      if ((lf || rt) && !up && !dn && this.isWall(x, y - 1) && this.isWall(x, y + 1)) return { axis: "horizontal", front: rt ? [x + 1, y] : [x - 1, y] };
      return null;
    }
    // Ищет место для портала в стене ближе к (nx,ny).
    findPortalSpot(nx, ny, predicate = () => true) {
      let best = null;
      for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) {
        if (this.props.some((p) => p.x === x && p.y === y)) continue;
        const s = this.doorSpot(x, y);
        if (!s || !predicate(x, y, s)) continue;
        const [fx, fy] = s.front;
        if (!this.free(fx, fy) || this.reserved.has(key5(fx, fy))) continue;
        const d = Math.hypot(x - nx, y - ny);
        if (!best || d < best.d) best = { x, y, axis: s.axis, front: s.front, d };
      }
      return best;
    }
    addPortal(spot, destination, name, extra = {}) {
      const p = { id: extra.id || this.nid("portal"), x: spot.x, y: spot.y, kind: 26, name, type: "portal", destination, ...extra };
      if (spot.axis) p.axis = spot.axis;
      this.props.push(p);
      this.reserve(spot.front[0], spot.front[1]);
      return p;
    }
    addDoor(x, y, axis, name = "\u0414\u0432\u0435\u0440\u044C", extra = {}) {
      const p = { id: this.nid("door"), x, y, kind: 26, name, type: "door", ...extra };
      if (axis) p.axis = axis;
      this.props.push(p);
      for (const [dx, dy] of DIRS2) {
        if (this.isFloor(x + dx, y + dy)) this.reserve(x + dx, y + dy);
      }
      this.reserve(x, y);
      return p;
    }
    light(x, y, extra = {}) {
      this.lights.push({ id: this.nid("lamp"), x, y, radius: 3, power: 0.6, phase: this.rng.next() * 6, intensity: 9, distance: 8, brightRadius: 4, ...extra });
    }
    chandelier(x, y) {
      if (!this.free(x, y)) return;
      const id = this.nid("chandelier");
      this.lights.push({ id, kind: "chandelier", x: x + 0.5, y: y + 0.5, height: 1.9, intensity: 26, distance: 10, brightRadius: 4, phase: this.rng.next() * 6, radius: 4 });
      this.props.push({ id, x, y, type: "chandelier", kind: 38, solid: false, name: "\u0421\u0432\u0435\u0447\u043D\u0430\u044F \u043B\u044E\u0441\u0442\u0440\u0430" });
    }
    // Настенные факелы: каждый свет крепится к ближайшей свободной стене (как mountLights в игре).
    // Игра создаёт PointLight на каждый свет, поэтому в сцене их не больше MAX_LIGHTS. Выбираем равномерно: сначала люстры и алтари, потом самые далёкие друг от друга.
    capLights(max = MAX_LIGHTS2) {
      if (this.lights.length <= max) return;
      const keep = this.lights.filter((l) => l.kind === "chandelier" || l.id === "altar"), rest = this.lights.filter((l) => !keep.includes(l));
      const near = (l, set) => set.length ? Math.min(...set.map((o) => Math.hypot(o.x - l.x, o.y - l.y))) : 99;
      const a = this.anchor || [0, 0];
      if (!keep.length && rest.length) {
        rest.sort((p, q) => Math.hypot(p.x - a[0], p.y - a[1]) - Math.hypot(q.x - a[0], q.y - a[1]));
        keep.push(rest.shift());
      }
      while (keep.length < max && rest.length) {
        let bi = 0, bd = -1;
        rest.forEach((l, i) => {
          const d = near(l, keep);
          if (d > bd) {
            bd = d;
            bi = i;
          }
        });
        keep.push(rest.splice(bi, 1)[0]);
      }
      this.lights = keep;
    }
    mountLights() {
      this.capLights();
      const used = new Set(this.props.map((p) => key5(p.x, p.y)));
      const mounted = [];
      for (const l of this.lights) {
        if (l.id === "altar" || l.kind === "chandelier") {
          mounted.push(l);
          continue;
        }
        const cand = [];
        for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) {
          if (!this.isWall(x, y) || used.has(key5(x, y))) continue;
          for (const [dx, dy] of DIRS2) {
            const ax = x + dx, ay = y + dy;
            if (!this.isFloor(ax, ay) || this.occ.has(key5(ax, ay))) continue;
            cand.push({ x, y, dx, dy, ax, ay, d: Math.hypot(x + 0.5 + dx * 0.58 - l.x, y + 0.5 + dy * 0.58 - l.y) });
          }
        }
        cand.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
        const q = cand[0];
        if (!q) continue;
        used.add(key5(q.x, q.y));
        Object.assign(l, { kind: "wall", wallX: q.x, wallY: q.y, dx: q.dx, dy: q.dy, x: q.x + 0.5 + q.dx * 0.58, y: q.y + 0.5 + q.dy * 0.58, height: 1.22 });
        const p = { id: "sconce-" + l.id, x: q.x, y: q.y, kind: 37, type: "torch", solid: false, name: "\u041D\u0430\u0441\u0442\u0435\u043D\u043D\u044B\u0439 \u0444\u0430\u043A\u0435\u043B", lightId: l.id, access: { x: q.ax, y: q.ay } };
        l.fixtureId = p.id;
        this.props.push(p);
        mounted.push(l);
      }
      this.lights = mounted;
    }
    nearestFree(x, y, count, avoid = /* @__PURE__ */ new Set()) {
      const out = [], seen = /* @__PURE__ */ new Set([key5(x, y)]), q = [[x, y]];
      while (q.length && out.length < count) {
        const [cx3, cy3] = q.shift();
        if (this.free(cx3, cy3) && !avoid.has(key5(cx3, cy3))) out.push([cx3, cy3]);
        for (const [dx, dy] of DIRS2) {
          const a = cx3 + dx, b = cy3 + dy, k = key5(a, b);
          if (!seen.has(k) && this.isFloor(a, b)) {
            seen.add(k);
            q.push([a, b]);
          }
        }
      }
      return out;
    }
    finish(entry) {
      this.mountLights();
      const tiles = Array.from({ length: this.H }, (_, y) => Array.from({ length: this.W }, (_2, x) => this.isFloor(x, y) ? "floor" : this.isWall(x, y) ? "wall" : "void"));
      const sid = this.meta.seed + "/" + this.id;
      const surface = Array.from({ length: this.H }, (_, y) => Array.from({ length: this.W }, (_2, x) => {
        if (!this.isFloor(x, y)) return " ";
        const base = this.surf[y * this.W + x] || this.baseSurface;
        return SURFACES[varyFloor(base, sid, x, y)].code;
      }).join(""));
      const start = entry || this.anchor || this.floorCells()[0];
      const taken = /* @__PURE__ */ new Set(), spawns = this.nearestFree(start[0], start[1], 3);
      spawns.forEach((c) => taken.add(key5(c[0], c[1])));
      const training = this.nearestFree(start[0], start[1], 6, taken).slice(3, 6), farFirst = this.floorCells().filter(([x, y]) => this.free(x, y) && !taken.has(key5(x, y))).sort((a, b) => Math.hypot(b[0] - start[0], b[1] - start[1]) - Math.hypot(a[0] - start[0], a[1] - start[1]));
      const enemySpawn = farFirst.slice(0, 3);
      return {
        id: this.id,
        name: this.name,
        W: this.W,
        H: this.H,
        tiles,
        props: this.props,
        decor: this.decor,
        dummies: [],
        lights: this.lights,
        spawns,
        trainingSpawn: training.length === 3 ? training : spawns.slice(),
        enemySpawn,
        encounters: this.encounters,
        gen: this.meta,
        surface,
        wallStyle: this.wallStyle
        // surface[y][x] — код поверхности (surfaces.js), ' ' вне пола
      };
    }
  };
  function validateScene2(scene) {
    const tile = (x, y) => scene.tiles[y]?.[x] || "void", errs = [], occupied = /* @__PURE__ */ new Map(), walls = /* @__PURE__ */ new Map();
    for (const p of scene.props) {
      const layer = ["door", "portal"].includes(p.type) ? "doorway" : p.type === "clue" ? "surface" : p.type === "chandelier" ? "ceiling" : p.solid === false ? "wall" : "floor", k = key5(p.x, p.y);
      if (layer === "floor") {
        if (occupied.has(k)) errs.push("\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435: " + occupied.get(k).id + " / " + p.id);
        if (tile(p.x, p.y) !== "floor") errs.push("\u041F\u0440\u0435\u0434\u043C\u0435\u0442 \u0432\u043D\u0435 \u043F\u043E\u043B\u0430: " + p.id);
        occupied.set(k, p);
      }
      if (layer === "wall") {
        if (walls.has(k)) errs.push("\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 \u0441\u0442\u0435\u043D\u0435: " + p.id);
        walls.set(k, p);
      }
    }
    for (const d of scene.decor) if (d.kind !== "rug") {
      const k = key5(d.x, d.y);
      if (occupied.has(k)) errs.push("\u041D\u0430\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0434\u0435\u043A\u043E\u0440\u0430: " + d.kind);
      occupied.set(k, d);
    }
    for (const l of scene.lights) if (!(l.id === "altar" || l.kind === "wall" || l.kind === "chandelier")) errs.push("\u0421\u0432\u0435\u0442 \u0431\u0435\u0437 \u043A\u0440\u0435\u043F\u043B\u0435\u043D\u0438\u044F: " + l.id);
    for (const a of [...scene.spawns, ...scene.trainingSpawn, ...scene.enemySpawn]) if (occupied.has(a.join(","))) errs.push("\u0421\u043F\u0430\u0432\u043D \u0432 \u043F\u0440\u0435\u0434\u043C\u0435\u0442\u0435: " + occupied.get(a.join(",")).id);
    if (scene.spawns.length < 3) errs.push("\u041C\u0430\u043B\u043E \u0442\u043E\u0447\u0435\u043A \u043F\u043E\u044F\u0432\u043B\u0435\u043D\u0438\u044F");
    for (const p of scene.props.filter((p2) => ["door", "portal"].includes(p2.type))) {
      const flanks = p.axis === "horizontal" ? [[0, -1], [0, 1]] : [[-1, 0], [1, 0]];
      if (!flanks.every(([dx, dy]) => tile(p.x + dx, p.y + dy) === "wall")) errs.push("\u0414\u0432\u0435\u0440\u044C \u0431\u0435\u0437 \u0441\u0442\u0435\u043D \u043F\u043E \u0431\u043E\u043A\u0430\u043C: " + p.id);
      if (!DIRS2.some(([dx, dy]) => tile(p.x + dx, p.y + dy) === "floor")) errs.push("\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u0434\u0432\u0435\u0440\u044C: " + p.id);
    }
    const freeCells = [];
    for (let y = 0; y < scene.H; y++) for (let x = 0; x < scene.W; x++) if (tile(x, y) === "floor" && !occupied.has(key5(x, y))) freeCells.push([x, y]);
    if (!freeCells.length) errs.push("\u041D\u0435\u0442 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0433\u043E \u043F\u043E\u043B\u0430");
    else {
      const seen = /* @__PURE__ */ new Set([key5(...scene.spawns[0])]), stack = [scene.spawns[0]];
      while (stack.length) {
        const [x, y] = stack.pop();
        for (const [dx, dy] of DIRS2) {
          const a = x + dx, b = y + dy, k = key5(a, b);
          if (!seen.has(k) && tile(a, b) === "floor" && !occupied.has(k)) {
            seen.add(k);
            stack.push([a, b]);
          }
        }
      }
      if (seen.size !== freeCells.length) errs.push("\u041F\u043E\u043B \u0440\u0430\u0437\u043E\u0440\u0432\u0430\u043D: \u0434\u043E\u0441\u0442\u0438\u0436\u0438\u043C\u043E " + seen.size + " \u0438\u0437 " + freeCells.length);
      for (const p of scene.props) {
        if (["torch", "chandelier"].includes(p.type) || p.solid === false && !["door", "portal"].includes(p.type)) continue;
        if (!DIRS2.some(([dx, dy]) => seen.has(key5(p.x + dx, p.y + dy)))) errs.push("\u041D\u0435\u0442 \u043F\u043E\u0434\u0445\u043E\u0434\u0430 \u043A: " + p.id + " (" + (p.model || p.type) + ")");
      }
    }
    const ids = /* @__PURE__ */ new Set();
    for (const p of scene.props) {
      if (ids.has(p.id)) errs.push("\u041F\u043E\u0432\u0442\u043E\u0440 id: " + p.id);
      ids.add(p.id);
    }
    return errs;
  }

  // src/worldgen/furnish.js
  var CAT2 = {
    table: { type: "furniture", model: "table", name: "\u0421\u0442\u043E\u043B", d: ["\u041A\u0440\u0435\u043F\u043A\u0438\u0439 \u0441\u0442\u043E\u043B \u0441 \u0432\u044A\u0435\u0432\u0448\u0438\u043C\u0438\u0441\u044F \u043F\u044F\u0442\u043D\u0430\u043C\u0438 \u0438 \u0446\u0430\u0440\u0430\u043F\u0438\u043D\u0430\u043C\u0438.", "\u0421\u0442\u043E\u043B \u043D\u0430\u043A\u0440\u044B\u0442 \u0432\u044B\u0446\u0432\u0435\u0442\u0448\u0435\u0439 \u0441\u043A\u0430\u0442\u0435\u0440\u0442\u044C\u044E.", "\u041D\u0430 \u0441\u0442\u043E\u043B\u0435 \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u043A\u0440\u0443\u0433\u0438 \u043E\u0442 \u043A\u0440\u0443\u0436\u0435\u043A."] },
    stool: { type: "furniture", model: "stool", name: "\u0422\u0430\u0431\u0443\u0440\u0435\u0442", d: ["\u0422\u0440\u0451\u0445\u043D\u043E\u0433\u0438\u0439 \u0442\u0430\u0431\u0443\u0440\u0435\u0442, \u043E\u0442\u043F\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0434\u043E \u0431\u043B\u0435\u0441\u043A\u0430.", "\u0422\u0430\u0431\u0443\u0440\u0435\u0442 \u0441\u043B\u0435\u0433\u043A\u0430 \u0448\u0430\u0442\u0430\u0435\u0442\u0441\u044F."] },
    bench: { type: "furniture", model: "bench", name: "\u0421\u043A\u0430\u043C\u044C\u044F", d: ["\u0414\u043B\u0438\u043D\u043D\u0430\u044F \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u0430\u044F \u0441\u043A\u0430\u043C\u044C\u044F.", "\u0421\u043A\u0430\u043C\u044C\u044F \u0432\u044B\u0442\u0435\u0440\u0442\u0430 \u0441\u043E\u0442\u043D\u044F\u043C\u0438 \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u0435\u0439."] },
    bed: { type: "furniture", model: "bed", name: "\u041A\u0440\u043E\u0432\u0430\u0442\u044C", d: ["\u0423\u0437\u043A\u0430\u044F \u043A\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043E \u0441\u0432\u0435\u0436\u0438\u043C\u0438 \u043F\u0440\u043E\u0441\u0442\u044B\u043D\u044F\u043C\u0438.", "\u041E\u0434\u0435\u044F\u043B\u043E \u0441\u043C\u044F\u0442\u043E, \u0431\u0443\u0434\u0442\u043E \u0437\u0434\u0435\u0441\u044C \u043D\u0435\u0434\u0430\u0432\u043D\u043E \u0441\u043F\u0430\u043B\u0438.", "\u041A\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u043A\u0440\u0438\u043F\u0438\u0442 \u043F\u0440\u0438 \u043C\u0430\u043B\u0435\u0439\u0448\u0435\u043C \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0438."] },
    cot: { type: "furniture", model: "cot", name: "\u041B\u0435\u0436\u0430\u043D\u043A\u0430", d: ["\u0413\u043E\u043B\u044B\u0435 \u0434\u043E\u0441\u043A\u0438 \u0441 \u0441\u043E\u043B\u043E\u043C\u0435\u043D\u043D\u044B\u043C \u0442\u044E\u0444\u044F\u043A\u043E\u043C.", "\u0416\u0451\u0441\u0442\u043A\u0430\u044F \u043B\u0435\u0436\u0430\u043D\u043A\u0430, \u043F\u0440\u0438\u043A\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u043A \u0441\u0442\u0435\u043D\u0435."] },
    hearth: { type: "furniture", model: "hearth", name: "\u041E\u0447\u0430\u0433", d: ["\u0412 \u043E\u0447\u0430\u0433\u0435 \u0442\u043B\u0435\u044E\u0442 \u0443\u0433\u043B\u0438, \u043E\u0442 \u043D\u0438\u0445 \u0438\u0434\u0451\u0442 \u0440\u043E\u0432\u043D\u043E\u0435 \u0442\u0435\u043F\u043B\u043E.", "\u041E\u0447\u0430\u0433 \u0432\u044B\u043B\u043E\u0436\u0435\u043D \u0437\u0430\u043A\u043E\u043F\u0447\u0451\u043D\u043D\u044B\u043C \u043A\u0430\u043C\u043D\u0435\u043C."], light: true },
    wardrobe: { type: "furniture", model: "wardrobe", name: "\u0428\u043A\u0430\u0444", d: ["\u0422\u044F\u0436\u0451\u043B\u044B\u0439 \u0448\u043A\u0430\u0444 \u0441 \u043F\u043E\u0442\u0451\u0440\u0442\u043E\u0439 \u0440\u0435\u0437\u044C\u0431\u043E\u0439."], container: true },
    counter: { type: "furniture", model: "counter", name: "\u041F\u0440\u0438\u043B\u0430\u0432\u043E\u043A", d: ["\u0428\u0438\u0440\u043E\u043A\u0438\u0439 \u043F\u0440\u0438\u043B\u0430\u0432\u043E\u043A, \u043D\u0430 \u043D\u0451\u043C \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0440\u0430\u0437\u043B\u043E\u0436\u0435\u043D\u044B \u0442\u043E\u0432\u0430\u0440\u044B.", "\u0414\u0435\u0440\u0435\u0432\u043E \u043F\u0440\u0438\u043B\u0430\u0432\u043A\u0430 \u0438\u0441\u0442\u0451\u0440\u0442\u043E \u043B\u043E\u043A\u0442\u044F\u043C\u0438."] },
    shelf: { type: "furniture", model: "shelf", name: "\u041F\u043E\u043B\u043A\u0430", d: ["\u041D\u0430 \u043F\u043E\u043B\u043A\u0430\u0445 \u0431\u0430\u043D\u043A\u0438, \u0441\u0432\u0451\u0440\u0442\u043A\u0438 \u0438 \u043C\u0435\u043B\u043A\u0430\u044F \u0443\u0442\u0432\u0430\u0440\u044C.", "\u041F\u043E\u043B\u043A\u0438 \u0437\u0430\u0431\u0438\u0442\u044B \u0432\u0441\u044F\u043A\u043E\u0439 \u0432\u0441\u044F\u0447\u0438\u043D\u043E\u0439."], container: true },
    well: { type: "furniture", model: "well", name: "\u041A\u043E\u043B\u043E\u0434\u0435\u0446", d: ["\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u043A\u043E\u043B\u043E\u0434\u0435\u0446. \u0412\u043E\u0434\u0430 \u0432\u043D\u0438\u0437\u0443 \u0447\u0451\u0440\u043D\u0430\u044F \u0438 \u0445\u043E\u043B\u043E\u0434\u043D\u0430\u044F.", "\u0412\u0435\u0434\u0440\u043E \u043D\u0430 \u0446\u0435\u043F\u0438 \u043F\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u043E\u0442 \u0432\u0435\u0442\u0440\u0430."] },
    tree: { type: "furniture", model: "tree", name: "\u0414\u0435\u0440\u0435\u0432\u043E", d: ["\u0421\u0442\u0430\u0440\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E \u0441 \u0433\u0443\u0441\u0442\u043E\u0439 \u043A\u0440\u043E\u043D\u043E\u0439.", "\u0412\u0435\u0442\u0432\u0438 \u0448\u0443\u043C\u044F\u0442 \u043D\u0430\u0434 \u0433\u043E\u043B\u043E\u0432\u043E\u0439."] },
    bush: { type: "furniture", model: "bush", name: "\u041A\u0443\u0441\u0442\u0430\u0440\u043D\u0438\u043A", d: ["\u041A\u043E\u043B\u044E\u0447\u0438\u0439 \u043A\u0443\u0441\u0442\u0430\u0440\u043D\u0438\u043A."] },
    stall: { type: "furniture", model: "stall", name: "\u0422\u043E\u0440\u0433\u043E\u0432\u044B\u0439 \u043D\u0430\u0432\u0435\u0441", d: ["\u041D\u0430\u0432\u0435\u0441 \u043D\u0430\u0434 \u043F\u0440\u0438\u043B\u0430\u0432\u043A\u043E\u043C, \u0442\u043E\u0440\u0433\u043E\u0432\u0435\u0446 \u0441\u043E\u0431\u0438\u0440\u0430\u0435\u0442 \u0442\u043E\u0432\u0430\u0440.", "\u041F\u043E\u043B\u043E\u0441\u0430\u0442\u044B\u0439 \u0442\u0435\u043D\u0442 \u0445\u043B\u043E\u043F\u0430\u0435\u0442 \u043D\u0430 \u0432\u0435\u0442\u0440\u0443."] },
    anvil: { type: "furniture", model: "anvil", name: "\u041D\u0430\u043A\u043E\u0432\u0430\u043B\u044C\u043D\u044F", d: ["\u041D\u0430\u043A\u043E\u0432\u0430\u043B\u044C\u043D\u044F \u0432 \u0437\u0430\u0440\u0443\u0431\u043A\u0430\u0445 \u043E\u0442 \u0442\u044B\u0441\u044F\u0447 \u0443\u0434\u0430\u0440\u043E\u0432."] },
    forge: { type: "furniture", model: "forge", name: "\u0413\u043E\u0440\u043D", d: ["\u0413\u043E\u0440\u043D \u043F\u044B\u0448\u0435\u0442 \u0436\u0430\u0440\u043E\u043C, \u0443\u0433\u043B\u0438 \u0441\u0432\u0435\u0442\u044F\u0442\u0441\u044F \u043E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u043C."], light: true },
    cauldron: { type: "furniture", model: "cauldron", name: "\u041A\u043E\u0442\u0451\u043B", d: ["\u0412 \u043A\u043E\u0442\u043B\u0435 \u0447\u0442\u043E-\u0442\u043E \u0431\u0443\u043B\u044C\u043A\u0430\u0435\u0442 \u0438 \u043F\u0430\u0445\u043D\u0435\u0442 \u0442\u0440\u0430\u0432\u0430\u043C\u0438.", "\u0427\u0443\u0433\u0443\u043D\u043D\u044B\u0439 \u043A\u043E\u0442\u0451\u043B \u043D\u0430\u0434 \u043E\u0433\u043D\u0451\u043C."] },
    sarcophagus: { type: "furniture", model: "sarcophagus", name: "\u0421\u0430\u0440\u043A\u043E\u0444\u0430\u0433", d: ["\u041A\u0440\u044B\u0448\u043A\u0430 \u0441\u0430\u0440\u043A\u043E\u0444\u0430\u0433\u0430 \u043F\u043E\u043A\u0440\u044B\u0442\u0430 \u043F\u044B\u043B\u044C\u044E \u0438 \u0441\u0442\u0451\u0440\u0442\u044B\u043C\u0438 \u0440\u0443\u043D\u0430\u043C\u0438.", "\u041A\u0430\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0430\u0440\u043A\u043E\u0444\u0430\u0433. \u0422\u0438\u0445\u043E, \u0441\u043B\u0438\u0448\u043A\u043E\u043C \u0442\u0438\u0445\u043E."] },
    gravestone: { type: "furniture", model: "gravestone", name: "\u041D\u0430\u0434\u0433\u0440\u043E\u0431\u0438\u0435", d: ["\u0418\u043C\u044F \u043D\u0430 \u043A\u0430\u043C\u043D\u0435 \u0441\u0442\u0451\u0440\u043B\u043E\u0441\u044C, \u043E\u0441\u0442\u0430\u043B\u0438\u0441\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u0434\u0430\u0442\u044B."] },
    bones: { type: "furniture", model: "bones", name: "\u041A\u043E\u0441\u0442\u0438", d: ["\u041A\u0443\u0447\u043A\u0430 \u0441\u0442\u0430\u0440\u044B\u0445 \u043A\u043E\u0441\u0442\u0435\u0439. \u0414\u0430\u0432\u043D\u043E \u0437\u0434\u0435\u0441\u044C \u043B\u0435\u0436\u0430\u0442."], solid: false },
    pillar: { type: "cover", model: "pillar", name: "\u041A\u043E\u043B\u043E\u043D\u043D\u0430", d: ["\u041A\u0430\u043C\u0435\u043D\u043D\u0430\u044F \u043A\u043E\u043B\u043E\u043D\u043D\u0430, \u0438\u0441\u0447\u0435\u0440\u0447\u0435\u043D\u043D\u0430\u044F \u0442\u0440\u0435\u0449\u0438\u043D\u0430\u043C\u0438."] },
    brazier: { type: "furniture", model: "brazier", name: "\u0416\u0430\u0440\u043E\u0432\u043D\u044F", d: ["\u0416\u0430\u0440\u043E\u0432\u043D\u044F \u043E\u0441\u0432\u0435\u0449\u0430\u0435\u0442 \u0432\u0441\u0451 \u0432\u043E\u043A\u0440\u0443\u0433 \u043A\u0440\u0430\u0441\u043D\u043E\u0432\u0430\u0442\u044B\u043C \u0441\u0432\u0435\u0442\u043E\u043C."], light: true },
    fountain: { type: "furniture", model: "fountain", name: "\u0424\u043E\u043D\u0442\u0430\u043D", d: ["\u0412\u043E\u0434\u0430 \u0442\u0438\u0445\u043E \u0436\u0443\u0440\u0447\u0438\u0442 \u0432 \u043A\u0430\u043C\u0435\u043D\u043D\u043E\u0439 \u0447\u0430\u0448\u0435."] },
    signpost: { type: "furniture", model: "signpost", name: "\u0423\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C", d: ["\u0414\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0443\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C \u0441 \u0432\u044B\u0446\u0432\u0435\u0442\u0448\u0438\u043C\u0438 \u043D\u0430\u0434\u043F\u0438\u0441\u044F\u043C\u0438."] },
    haystack: { type: "furniture", model: "haystack", name: "\u0421\u0442\u043E\u0433 \u0441\u0435\u043D\u0430", d: ["\u0422\u0451\u043F\u043B\u044B\u0439 \u0441\u0442\u043E\u0433, \u043F\u0430\u0445\u043D\u0435\u0442 \u043B\u0435\u0442\u043E\u043C."] },
    cart: { type: "furniture", model: "cart", name: "\u0422\u0435\u043B\u0435\u0433\u0430", d: ["\u0422\u0435\u043B\u0435\u0433\u0430 \u0441 \u043C\u0435\u0448\u043A\u0430\u043C\u0438 \u0438 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439."] },
    barrel: { type: "barrel", name: "\u0411\u043E\u0447\u043A\u0430", d: ["\u0418\u0437 \u0431\u043E\u0447\u043A\u0438 \u043F\u0430\u0445\u043D\u0435\u0442 \u044D\u043B\u0435\u043C.", "\u0411\u043E\u0447\u043A\u0430 \u0441 \u0432\u043E\u0434\u043E\u0439, \u043D\u0430 \u043A\u0440\u044B\u0448\u043A\u0435 \u043F\u044B\u043B\u044C.", "\u0411\u043E\u0447\u043A\u0430 \u043E\u043F\u0435\u0447\u0430\u0442\u0430\u043D\u0430 \u043A\u043B\u0435\u0439\u043C\u043E\u043C \u0431\u043E\u043D\u0434\u0430\u0440\u044F."], container: true },
    crate: { type: "crate", name: "\u042F\u0449\u0438\u043A", d: ["\u042F\u0449\u0438\u043A \u0441 \u043E\u0442\u043C\u0435\u0442\u043A\u0430\u043C\u0438 \u043C\u0435\u043B\u043E\u043C.", "\u0414\u043E\u0449\u0430\u0442\u044B\u0439 \u044F\u0449\u0438\u043A, \u043A\u0440\u044B\u0448\u043A\u0430 \u043F\u0440\u0438\u0431\u0438\u0442\u0430 \u0433\u0432\u043E\u0437\u0434\u044F\u043C\u0438."], container: true },
    chair: { type: "chair", name: "\u0421\u0442\u0443\u043B", d: ["\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0441\u0442\u0443\u043B."] },
    chest: { type: "chest", name: "\u0421\u0443\u043D\u0434\u0443\u043A", d: ["\u041E\u043A\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A.", "\u0421\u0443\u043D\u0434\u0443\u043A \u0441 \u043F\u043E\u0442\u0451\u0440\u0442\u044B\u043C \u0437\u0430\u043C\u043A\u043E\u043C."], container: true },
    planter: { type: "planter", name: "\u041A\u0430\u0434\u043A\u0430 \u0441 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u0435\u043C", d: ["\u0420\u0430\u0441\u0442\u0435\u043D\u0438\u0435 \u0434\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0441\u0438\u0442 \u0432\u043E\u0434\u044B.", "\u0412 \u043A\u0430\u0434\u043A\u0435 \u0440\u0430\u0441\u0442\u0443\u0442 \u0434\u0443\u0448\u0438\u0441\u0442\u044B\u0435 \u0442\u0440\u0430\u0432\u044B."] },
    books: { type: "books", name: "\u041A\u043D\u0438\u0436\u043D\u044B\u0439 \u0448\u043A\u0430\u0444", d: ["\u0422\u0435\u0441\u043D\u043E \u0441\u0442\u043E\u044F\u0449\u0438\u0435 \u0442\u043E\u043C\u0430, \u0431\u043E\u043B\u044C\u0448\u0438\u043D\u0441\u0442\u0432\u043E \u0431\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0439.", "\u041A\u043D\u0438\u0433\u0438 \u043F\u0430\u0445\u043D\u0443\u0442 \u043F\u044B\u043B\u044C\u044E \u0438 \u043A\u043B\u0435\u0435\u043C."], container: true },
    desk: { type: "desk", name: "\u041F\u0438\u0441\u044C\u043C\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u043E\u043B", d: ["\u041D\u0430 \u0441\u0442\u043E\u043B\u0435 \u0447\u0435\u0440\u043D\u0438\u043B\u044C\u043D\u0438\u0446\u0430 \u0438 \u0441\u0442\u043E\u043F\u043A\u0430 \u0431\u0443\u043C\u0430\u0433.", "\u041F\u0435\u0440\u043E \u0442\u043E\u0440\u0447\u0438\u0442 \u0438\u0437 \u0447\u0435\u0440\u043D\u0438\u043B\u044C\u043D\u0438\u0446\u044B, \u0431\u0443\u0434\u0442\u043E \u043F\u0438\u0441\u0430\u0432\u0448\u0438\u0439 \u0432\u044B\u0448\u0435\u043B \u043D\u0430 \u043C\u0438\u043D\u0443\u0442\u0443."] },
    rack: { type: "rack", name: "\u0421\u0442\u043E\u0439\u043A\u0430 \u0441 \u043E\u0440\u0443\u0436\u0438\u0435\u043C", d: ["\u041E\u0440\u0443\u0436\u0438\u0435 \u043D\u0430 \u0441\u0442\u043E\u0439\u043A\u0435 \u043E\u0442\u043F\u043E\u043B\u0438\u0440\u043E\u0432\u0430\u043D\u043E \u0434\u043E \u0431\u043B\u0435\u0441\u043A\u0430."] },
    banner: { type: "banner", name: "\u0417\u043D\u0430\u043C\u044F", d: ["\u0417\u043D\u0430\u043C\u044F \u0432\u044B\u0446\u0432\u0435\u043B\u043E, \u043D\u043E \u0433\u0435\u0440\u0431\u043E\u0432\u044B\u0439 \u0437\u0432\u0435\u0440\u044C \u0435\u0449\u0451 \u0432\u0438\u0434\u0435\u043D."], solid: false },
    scrolls: { type: "scrolls", name: "\u0421\u0432\u0438\u0442\u043A\u0438", d: ["\u0421\u0432\u0438\u0442\u043A\u0438 \u043B\u0435\u0436\u0430\u0442 \u0430\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E\u0439 \u0441\u0442\u043E\u043F\u043A\u043E\u0439."] },
    // ——— крупная мебель (занимает клетку, расставляется с проверкой проходов) ———
    workbench: { type: "furniture", model: "workbench", name: "\u0412\u0435\u0440\u0441\u0442\u0430\u043A", d: ["\u0412\u0435\u0440\u0441\u0442\u0430\u043A \u0432 \u0437\u0430\u0440\u0443\u0431\u043A\u0430\u0445 \u0438 \u043E\u043F\u0438\u043B\u043A\u0430\u0445.", "\u041D\u0430 \u0432\u0435\u0440\u0441\u0442\u0430\u043A\u0435 \u0440\u0430\u0437\u043B\u043E\u0436\u0435\u043D \u0438\u043D\u0441\u0442\u0440\u0443\u043C\u0435\u043D\u0442."] },
    loom: { type: "furniture", model: "loom", name: "\u0422\u043A\u0430\u0446\u043A\u0438\u0439 \u0441\u0442\u0430\u043D\u043E\u043A", d: ["\u0421\u0442\u0430\u043D\u043E\u043A \u0441 \u043D\u0430\u0442\u044F\u043D\u0443\u0442\u043E\u0439 \u043E\u0441\u043D\u043E\u0432\u043E\u0439, \u0440\u0430\u0431\u043E\u0442\u0430 \u0431\u0440\u043E\u0448\u0435\u043D\u0430 \u043D\u0430 \u043F\u043E\u043B\u043F\u0443\u0442\u0438."] },
    bathtub: { type: "furniture", model: "bathtub", name: "\u0412\u0430\u043D\u043D\u0430", d: ["\u041C\u0435\u0434\u043D\u0430\u044F \u0432\u0430\u043D\u043D\u0430 \u0441 \u043E\u0441\u0442\u044B\u0432\u0448\u0435\u0439 \u0432\u043E\u0434\u043E\u0439."] },
    cradle: { type: "furniture", model: "cradle", name: "\u041A\u043E\u043B\u044B\u0431\u0435\u043B\u044C", d: ["\u041F\u0443\u0441\u0442\u0430\u044F \u043A\u043E\u043B\u044B\u0431\u0435\u043B\u044C \u0441\u043B\u0435\u0433\u043A\u0430 \u043F\u043E\u043A\u0430\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F."] },
    sackpile: { type: "furniture", model: "sackpile", name: "\u041C\u0435\u0448\u043A\u0438", d: ["\u0421\u0442\u043E\u043F\u043A\u0430 \u043C\u0435\u0448\u043A\u043E\u0432 \u0441 \u0437\u0435\u0440\u043D\u043E\u043C.", "\u041C\u0435\u0448\u043A\u0438 \u0441\u043B\u043E\u0436\u0435\u043D\u044B \u043D\u0435\u0440\u043E\u0432\u043D\u043E, \u043D\u043E \u043D\u0430\u0434\u0451\u0436\u043D\u043E."] },
    haybale: { type: "furniture", model: "haybale", name: "\u0422\u044E\u043A \u0441\u0435\u043D\u0430", d: ["\u0421\u0443\u0445\u043E\u0439 \u0442\u044E\u043A \u0441\u0435\u043D\u0430 \u043F\u0430\u0445\u043D\u0435\u0442 \u043B\u0435\u0442\u043E\u043C."] },
    cratestack: { type: "furniture", model: "cratestack", name: "\u0421\u0442\u043E\u043F\u043A\u0430 \u044F\u0449\u0438\u043A\u043E\u0432", d: ["\u042F\u0449\u0438\u043A\u0438 \u0441\u043B\u043E\u0436\u0435\u043D\u044B \u0434\u0440\u0443\u0433 \u043D\u0430 \u0434\u0440\u0443\u0433\u0430 \u0438 \u043F\u0435\u0440\u0435\u0442\u044F\u043D\u0443\u0442\u044B \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439."] },
    barrelstack: { type: "furniture", model: "barrelstack", name: "\u041F\u0438\u0440\u0430\u043C\u0438\u0434\u0430 \u0431\u043E\u0447\u0435\u043A", d: ["\u0411\u043E\u0447\u043A\u0438 \u0441\u043B\u043E\u0436\u0435\u043D\u044B \u043F\u0438\u0440\u0430\u043C\u0438\u0434\u043E\u0439, \u0441\u043D\u0438\u0437\u0443 \u0441\u043E\u0447\u0438\u0442\u0441\u044F \u0432\u043B\u0430\u0433\u0430."] },
    statue: { type: "furniture", model: "statue", name: "\u0421\u0442\u0430\u0442\u0443\u044F", d: ["\u041A\u0430\u043C\u0435\u043D\u043D\u0430\u044F \u0444\u0438\u0433\u0443\u0440\u0430, \u043B\u0438\u0446\u043E \u0441\u0442\u0451\u0440\u0442\u043E \u0432\u0440\u0435\u043C\u0435\u043D\u0435\u043C.", "\u0423 \u043F\u043E\u0434\u043D\u043E\u0436\u0438\u044F \u0441\u0442\u0430\u0442\u0443\u0438 \u0441\u043B\u0435\u0434\u044B \u0441\u0432\u0435\u0447\u043D\u043E\u0433\u043E \u0432\u043E\u0441\u043A\u0430."] },
    pulpit: { type: "furniture", model: "pulpit", name: "\u041A\u0430\u0444\u0435\u0434\u0440\u0430", d: ["\u041A\u0430\u0444\u0435\u0434\u0440\u0430 \u0441\u043E \u0441\u0442\u0430\u0440\u043E\u0439 \u043A\u043D\u0438\u0433\u043E\u0439 \u043F\u0440\u043E\u043F\u043E\u0432\u0435\u0434\u0435\u0439."] },
    font: { type: "furniture", model: "font", name: "\u041A\u0443\u043F\u0435\u043B\u044C", d: ["\u0427\u0430\u0448\u0430 \u0441 \u0447\u0438\u0441\u0442\u043E\u0439 \u0432\u043E\u0434\u043E\u0439."] },
    coffin: { type: "furniture", model: "coffin", name: "\u0413\u0440\u043E\u0431", d: ["\u041A\u0440\u044B\u0448\u043A\u0430 \u043F\u043B\u043E\u0442\u043D\u043E \u043F\u0440\u0438\u0431\u0438\u0442\u0430.", "\u0413\u0440\u043E\u0431 \u0431\u0435\u0437 \u0438\u043C\u0435\u043D\u0438."] },
    cage: { type: "furniture", model: "cage", name: "\u041A\u043B\u0435\u0442\u043A\u0430", d: ["\u0416\u0435\u043B\u0435\u0437\u043D\u0430\u044F \u043A\u043B\u0435\u0442\u043A\u0430, \u0434\u0432\u0435\u0440\u0446\u0430 \u0437\u0430\u043F\u0435\u0440\u0442\u0430."] },
    throne: { type: "furniture", model: "throne", name: "\u0422\u0440\u043E\u043D", d: ["\u0420\u0435\u0437\u043D\u043E\u0439 \u0442\u0440\u043E\u043D \u0441 \u043A\u0440\u0430\u0441\u043D\u043E\u0439 \u043F\u043E\u0434\u0443\u0448\u043A\u043E\u0439."] },
    lamppost: { type: "furniture", model: "lamppost", name: "\u0424\u043E\u043D\u0430\u0440\u043D\u044B\u0439 \u0441\u0442\u043E\u043B\u0431", d: ["\u0424\u043E\u043D\u0430\u0440\u044C \u0433\u043E\u0440\u0438\u0442 \u0440\u043E\u0432\u043D\u044B\u043C \u0441\u0432\u0435\u0442\u043E\u043C."] },
    // ——— напольные мелочи (через них можно ходить) ———
    bucket: { type: "furniture", model: "bucket", name: "\u0412\u0435\u0434\u0440\u043E", d: ["\u0412\u0435\u0434\u0440\u043E \u0441 \u0432\u043E\u0434\u043E\u0439.", "\u041F\u0443\u0441\u0442\u043E\u0435 \u0432\u0435\u0434\u0440\u043E \u0441 \u0432\u043C\u044F\u0442\u0438\u043D\u043E\u0439."], solid: false },
    broom: { type: "furniture", model: "broom", name: "\u041C\u0435\u0442\u043B\u0430", d: ["\u041C\u0435\u0442\u043B\u0430 \u0441\u0442\u043E\u0438\u0442 \u0432 \u0443\u0433\u043B\u0443."], solid: false },
    sack: { type: "furniture", model: "sack", name: "\u041C\u0435\u0448\u043E\u043A", d: ["\u041C\u0435\u0448\u043E\u043A \u0441 \u0447\u0435\u043C-\u0442\u043E \u043C\u044F\u0433\u043A\u0438\u043C."], solid: false },
    basket: { type: "furniture", model: "basket", name: "\u041A\u043E\u0440\u0437\u0438\u043D\u0430", d: ["\u041F\u043B\u0435\u0442\u0451\u043D\u0430\u044F \u043A\u043E\u0440\u0437\u0438\u043D\u0430."], solid: false },
    rope: { type: "furniture", model: "rope", name: "\u0411\u0443\u0445\u0442\u0430 \u0432\u0435\u0440\u0451\u0432\u043A\u0438", d: ["\u0410\u043A\u043A\u0443\u0440\u0430\u0442\u043D\u043E \u0441\u0432\u0451\u0440\u043D\u0443\u0442\u0430\u044F \u0432\u0435\u0440\u0451\u0432\u043A\u0430."], solid: false },
    boots: { type: "furniture", model: "boots", name: "\u0421\u0430\u043F\u043E\u0433\u0438", d: ["\u0421\u0442\u043E\u043F\u0442\u0430\u043D\u043D\u044B\u0435 \u0441\u0430\u043F\u043E\u0433\u0438."], solid: false },
    wheel: { type: "furniture", model: "wheel", name: "\u041A\u043E\u043B\u0435\u0441\u043E \u043E\u0442 \u0442\u0435\u043B\u0435\u0433\u0438", d: ["\u041A\u043E\u043B\u0435\u0441\u043E \u043E\u0442 \u0442\u0435\u043B\u0435\u0433\u0438, \u043F\u0440\u0438\u0441\u043B\u043E\u043D\u0451\u043D\u043D\u043E\u0435 \u043A \u0441\u0442\u0435\u043D\u0435."], solid: false },
    puddle: { type: "furniture", model: "puddle", name: "\u041B\u0443\u0436\u0430", d: ["\u041B\u0443\u0436\u0430, \u0432 \u043A\u043E\u0442\u043E\u0440\u043E\u0439 \u043E\u0442\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044F \u0441\u0432\u0435\u0442."], solid: false },
    straw: { type: "furniture", model: "straw", name: "\u0421\u043E\u043B\u043E\u043C\u0430", d: ["\u0420\u0430\u0441\u0441\u044B\u043F\u0430\u043D\u043D\u0430\u044F \u0441\u043E\u043B\u043E\u043C\u0430."], solid: false },
    rubble: { type: "furniture", model: "rubble", name: "\u0413\u0440\u0443\u0434\u0430 \u043A\u0430\u043C\u043D\u0435\u0439", d: ["\u041E\u0431\u043B\u043E\u043C\u043A\u0438 \u043A\u0430\u043C\u0435\u043D\u043D\u043E\u0439 \u043A\u043B\u0430\u0434\u043A\u0438."], solid: false },
    lantern_floor: { type: "furniture", model: "lantern_floor", name: "\u0424\u043E\u043D\u0430\u0440\u044C", d: ["\u0424\u043E\u043D\u0430\u0440\u044C, \u043E\u0441\u0442\u0430\u0432\u043B\u0435\u043D\u043D\u044B\u0439 \u043D\u0430 \u043F\u043E\u043B\u0443."], solid: false },
    pitchfork: { type: "furniture", model: "pitchfork", name: "\u0412\u0438\u043B\u044B", d: ["\u0412\u0438\u043B\u044B \u0441 \u043E\u0431\u043B\u043E\u043C\u0430\u043D\u043D\u044B\u043C \u0437\u0443\u0431\u0446\u043E\u043C."], solid: false },
    shovel: { type: "furniture", model: "shovel", name: "\u041B\u043E\u043F\u0430\u0442\u0430", d: ["\u041B\u043E\u043F\u0430\u0442\u0430 \u0432 \u0437\u0430\u0441\u043E\u0445\u0448\u0435\u0439 \u0437\u0435\u043C\u043B\u0435."], solid: false },
    // ——— настенные детали (висят на стене, ничего не занимают) ———
    shield: { type: "decor", model: "shield", name: "\u0429\u0438\u0442 \u043D\u0430 \u0441\u0442\u0435\u043D\u0435", d: ["\u0429\u0438\u0442 \u0441 \u0433\u0435\u0440\u0431\u043E\u043C, \u043A\u0440\u0430\u0441\u043A\u0430 \u043E\u0431\u043B\u0443\u043F\u0438\u043B\u0430\u0441\u044C."], wall: true },
    swords: { type: "decor", model: "swords", name: "\u041C\u0435\u0447\u0438 \u043D\u0430 \u0441\u0442\u0435\u043D\u0435", d: ["\u0414\u0432\u0430 \u043C\u0435\u0447\u0430, \u0434\u0430\u0432\u043D\u043E \u043D\u0435 \u0431\u044B\u0432\u0448\u0438\u0435 \u0432 \u0434\u0435\u043B\u0435."], wall: true },
    antlers: { type: "decor", model: "antlers", name: "\u041E\u043B\u0435\u043D\u044C\u0438 \u0440\u043E\u0433\u0430", d: ["\u0420\u043E\u0433\u0430 \u0432\u0438\u0441\u044F\u0442 \u043D\u0430\u0434 \u0432\u0445\u043E\u0434\u043E\u043C \u043D\u0430 \u0441\u0447\u0430\u0441\u0442\u044C\u0435."], wall: true },
    painting: { type: "decor", model: "painting", name: "\u041A\u0430\u0440\u0442\u0438\u043D\u0430", d: ["\u041F\u0435\u0439\u0437\u0430\u0436 \u0432 \u043F\u043E\u0442\u0435\u043C\u043D\u0435\u0432\u0448\u0435\u0439 \u0440\u0430\u043C\u0435.", "\u041A\u0430\u0440\u0442\u0438\u043D\u0430 \u0441\u043B\u0435\u0433\u043A\u0430 \u0432\u0438\u0441\u0438\u0442 \u043D\u0430\u0431\u043E\u043A."], wall: true },
    tapestry: { type: "decor", model: "tapestry", name: "\u0413\u043E\u0431\u0435\u043B\u0435\u043D", d: ["\u0413\u043E\u0431\u0435\u043B\u0435\u043D \u0441 \u0432\u044B\u0446\u0432\u0435\u0442\u0448\u0438\u043C \u0443\u0437\u043E\u0440\u043E\u043C."], wall: true },
    mirror: { type: "decor", model: "mirror", name: "\u0417\u0435\u0440\u043A\u0430\u043B\u043E", d: ["\u0417\u0435\u0440\u043A\u0430\u043B\u043E \u0432 \u0437\u043E\u043B\u043E\u0447\u0451\u043D\u043E\u0439 \u0440\u0430\u043C\u0435."], wall: true },
    clock: { type: "decor", model: "clock", name: "\u0427\u0430\u0441\u044B", d: ["\u0427\u0430\u0441\u044B \u0441\u043F\u0435\u0448\u0430\u0442 \u043D\u0430 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044C \u0447\u0430\u0441\u0430.", "\u0427\u0430\u0441\u044B \u0442\u0438\u0445\u043E \u0442\u0438\u043A\u0430\u044E\u0442."], wall: true },
    hooks: { type: "decor", model: "hooks", name: "\u0412\u0435\u0448\u0430\u043B\u043A\u0430", d: ["\u041D\u0430 \u043A\u0440\u044E\u0447\u043A\u0430\u0445 \u043F\u043B\u0430\u0449\u0438 \u0438 \u0448\u0430\u043F\u043A\u0438."], wall: true },
    jars: { type: "decor", model: "jars", name: "\u041F\u043E\u043B\u043A\u0430 \u0441 \u0431\u0430\u043D\u043A\u0430\u043C\u0438", d: ["\u0411\u0430\u043D\u043A\u0438 \u0441 \u0437\u0430\u0441\u043E\u043B\u043A\u043E\u0439 \u0438 \u0441\u0443\u0448\u0451\u043D\u044B\u043C\u0438 \u0442\u0440\u0430\u0432\u0430\u043C\u0438."], wall: true },
    map: { type: "decor", model: "map", name: "\u041A\u0430\u0440\u0442\u0430", d: ["\u041A\u0430\u0440\u0442\u0430 \u043E\u043A\u0440\u0435\u0441\u0442\u043D\u043E\u0441\u0442\u0435\u0439, \u043D\u0430 \u043D\u0435\u0439 \u043F\u043E\u043C\u0435\u0442\u043A\u0438."], wall: true },
    noticeboard: { type: "decor", model: "noticeboard", name: "\u0414\u043E\u0441\u043A\u0430 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u0439", d: ["\u041D\u0430 \u0434\u043E\u0441\u043A\u0435 \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F \u043E \u043F\u0440\u043E\u043F\u0430\u0436\u0435 \u0438 \u043D\u0430\u0439\u043C\u0435."], wall: true },
    pans: { type: "decor", model: "pans", name: "\u0421\u043A\u043E\u0432\u043E\u0440\u043E\u0434\u044B", d: ["\u0421\u043A\u043E\u0432\u043E\u0440\u043E\u0434\u044B, \u043D\u0430\u0447\u0438\u0449\u0435\u043D\u043D\u044B\u0435 \u0434\u043E \u0431\u043B\u0435\u0441\u043A\u0430."], wall: true },
    herbs_hang: { type: "decor", model: "herbs_hang", name: "\u041F\u0443\u0447\u043A\u0438 \u0442\u0440\u0430\u0432", d: ["\u0422\u0440\u0430\u0432\u044B \u0441\u0443\u0448\u0430\u0442\u0441\u044F \u0432\u043D\u0438\u0437 \u0433\u043E\u043B\u043E\u0432\u043E\u0439 \u0438 \u043F\u0430\u0445\u043D\u0443\u0442 \u043B\u0443\u0433\u043E\u043C."], wall: true },
    tavernsign: { type: "decor", model: "tavernsign", name: "\u0412\u044B\u0432\u0435\u0441\u043A\u0430", d: ["\u0412\u044B\u0432\u0435\u0441\u043A\u0430 \u043F\u043E\u0441\u043A\u0440\u0438\u043F\u044B\u0432\u0430\u0435\u0442 \u043D\u0430 \u0432\u0435\u0442\u0440\u0443."], wall: true },
    shutter: { type: "decor", model: "shutter", name: "\u041E\u043A\u043D\u043E \u0441\u043E \u0441\u0442\u0430\u0432\u043D\u044F\u043C\u0438", d: ["\u0427\u0435\u0440\u0435\u0437 \u0441\u0442\u0435\u043A\u043B\u043E \u0435\u0434\u0432\u0430 \u043F\u0440\u043E\u0431\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0441\u0432\u0435\u0442."], wall: true },
    keysboard: { type: "decor", model: "keysboard", name: "\u0414\u043E\u0441\u043A\u0430 \u0441 \u043A\u043B\u044E\u0447\u0430\u043C\u0438", d: ["\u041A\u043B\u044E\u0447\u0438 \u0432\u0438\u0441\u044F\u0442 \u043F\u043E\u0434 \u043D\u043E\u043C\u0435\u0440\u0430\u043C\u0438."], wall: true },
    shackles: { type: "decor", model: "shackles", name: "\u041A\u0430\u043D\u0434\u0430\u043B\u044B", d: ["\u041A\u0430\u043D\u0434\u0430\u043B\u044B \u043D\u0430 \u0441\u0442\u0435\u043D\u0435, \u0437\u0432\u0435\u043D\u044C\u044F \u043F\u043E\u0442\u0451\u0440\u0442\u044B."], wall: true },
    horseshoe: { type: "decor", model: "horseshoe", name: "\u041F\u043E\u0434\u043A\u043E\u0432\u0430", d: ["\u041F\u043E\u0434\u043A\u043E\u0432\u0430 \u0432\u0438\u0441\u0438\u0442 \u043D\u0430 \u0441\u0447\u0430\u0441\u0442\u044C\u0435."], wall: true },
    net: { type: "decor", model: "net", name: "\u0420\u044B\u0431\u043E\u043B\u043E\u0432\u043D\u0430\u044F \u0441\u0435\u0442\u044C", d: ["\u0421\u0435\u0442\u044C \u043F\u0430\u0445\u043D\u0435\u0442 \u0440\u0435\u043A\u043E\u0439."], wall: true },
    altar: { type: "altar", name: "\u0410\u043B\u0442\u0430\u0440\u044C", d: ["\u0410\u043B\u0442\u0430\u0440\u044C \u0442\u0451\u043F\u043B\u044B\u0439 \u043D\u0430 \u043E\u0449\u0443\u043F\u044C, \u0441\u0432\u0435\u0447\u0438 \u0433\u043E\u0440\u044F\u0442 \u0440\u043E\u0432\u043D\u043E."] }
  };
  var CATALOG = CAT2;
  var dirRot2 = (dx, dy) => dy === 1 ? 0 : dx === -1 ? 3 : dy === -1 ? 2 : 1;
  function mk2(sb, key10, extra = {}) {
    const c = CAT2[key10], p = { type: c.type, kind: 24, name: c.name, description: sb.rng.pick(c.d), ...extra };
    if (c.model) p.model = c.model;
    if (c.solid === false) p.solid = false;
    if (c.wall) {
      p.kind = 22;
      p.solid = false;
    }
    if (c.type === "chest") p.kind = 17;
    if (c.type === "altar") p.kind = 18;
    if (c.type === "books") p.kind = 21;
    if (c.type === "cover") p.kind = 19;
    p.cat = key10;
    return p;
  }
  var inRoom2 = (r, x, y) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;
  function roomCells2(sb, r) {
    const out = [];
    for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) if (sb.isFloor(x, y)) out.push([x, y]);
    return out;
  }
  function wallCandidates2(sb, r) {
    const out = [];
    for (const [x, y] of roomCells2(sb, r)) for (const [dx, dy] of DIRS2) if (!sb.isFloor(x + dx, y + dy)) {
      out.push({ x, y, rot: dirRot2(-dx, -dy), wall: [dx, dy] });
      break;
    }
    return sb.rng.shuffle(out);
  }
  function interior2(sb, r) {
    return sb.rng.shuffle(roomCells2(sb, r).filter(([x, y]) => DIRS2.every(([dx, dy]) => sb.isFloor(x + dx, y + dy))));
  }
  function atWall2(sb, r, key10, n = 1, extra = () => ({})) {
    let placed = 0;
    const out = [];
    for (const c of wallCandidates2(sb, r)) {
      if (placed >= n) break;
      const p = sb.put(mk2(sb, key10, { rot: c.rot, ...extra(placed) }), c.x, c.y);
      if (p) {
        placed++;
        out.push(p);
      }
    }
    return out;
  }
  function wallMount2(sb, r, key10, n = 1) {
    const out = [], cand = [];
    for (let y = r.y - 1; y <= r.y + r.h; y++) for (let x = r.x - 1; x <= r.x + r.w; x++) {
      if (!sb.isWall(x, y) || sb.isFloor(x, y)) continue;
      const fronts = DIRS2.filter(([dx, dy]) => sb.isFloor(x + dx, y + dy) && inRoom2(r, x + dx, y + dy) && !sb.occ.has(x + dx + "," + (y + dy)) && !sb.reserved.has(x + dx + "," + (y + dy)));
      if (fronts.length === 1) cand.push([x, y, fronts[0]]);
    }
    for (const [x, y, [dx, dy]] of sb.rng.shuffle(cand)) {
      if (out.length >= n) break;
      if (sb.props.some((p2) => Math.abs(p2.x - x) + Math.abs(p2.y - y) < 2 && (p2.solid === false || p2.type === "portal" || p2.type === "door"))) continue;
      const p = mk2(sb, key10);
      p.x = x;
      p.y = y;
      p.id = sb.nid("wall");
      p.rot = dirRot2(dx, dy);
      p.gen = true;
      sb.props.push(p);
      out.push(p);
    }
    return out;
  }
  function inside2(sb, r, key10, n = 1, extra = () => ({})) {
    let placed = 0;
    const out = [];
    for (const [x, y] of interior2(sb, r)) {
      if (placed >= n) break;
      const p = sb.put(mk2(sb, key10, extra(placed)), x, y);
      if (p) {
        placed++;
        out.push(p);
      }
    }
    return out;
  }
  function anywhere2(sb, r, key10, n = 1, extra = () => ({})) {
    let placed = 0;
    const out = [];
    for (const [x, y] of sb.rng.shuffle(roomCells2(sb, r))) {
      if (placed >= n) break;
      const p = sb.put(mk2(sb, key10, extra(placed)), x, y);
      if (p) {
        placed++;
        out.push(p);
      }
    }
    return out;
  }
  function tableSet2(sb, r, chairs = 2) {
    for (const [x, y] of interior2(sb, r)) {
      const t = sb.put(mk2(sb, "table"), x, y);
      if (!t) continue;
      let n = 0;
      for (const [dx, dy] of sb.rng.shuffle(DIRS2)) {
        if (n >= chairs) break;
        if (sb.put(mk2(sb, "chair", { rot: dirRot2(-dx, -dy) }), x + dx, y + dy)) n++;
      }
      return t;
    }
    return null;
  }
  function rug2(sb, r) {
    if (r.w < 4 || r.h < 4) return;
    const w = Math.min(3, r.w - 2), h = Math.min(2, r.h - 2), x = r.x + Math.floor((r.w - w) / 2), y = r.y + Math.floor((r.h - h) / 2);
    for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) if (!sb.free(i, j) || sb.reserved.has(i + "," + j)) return;
    sb.decor.push({ kind: "rug", x, y, w, h });
  }
  function stock2(sb, p, ctx, theme, opts = {}) {
    const depth = ctx.depth || 0, r = sb.rng;
    p.gen = true;
    p.container = true;
    p.loot = rollLoot2(r, theme, depth + (opts.bonus || 0));
    if (p.type !== "chest" && theme !== "vault" && !opts.lockKey && r.chance(0.45 - Math.min(0.2, depth * 0.05))) p.loot = { gold: 0, potions: 0, torches: 0, gear: [] };
    else if (p.type !== "chest") {
      p.loot.potions = r.chance(0.06 + depth * 0.03) ? 1 : 0;
      p.loot.gold = Math.ceil(p.loot.gold / 2);
    }
    if (opts.lockKey) p.lock = { key: opts.lockKey, pickDc: 12 + depth, forceDc: 14 + depth };
    if (opts.trap) p.trap = rollTrap2(r, depth, opts.trapKinds);
    if (opts.extraGear) p.loot.gear.push(...opts.extraGear);
    return p;
  }
  var SURF_BY_ROLE = { living: "planks", bedroom: "planks", kitchen: "tiles", hall: "planks_dark", storage: "planks_dark", cellar: null, smithy: "stone_dark", alchemy: "planks", shop: "planks", chapel: "flagstone", guard: "stone", cells: "stone_dark", armory: "stone", warehouse: "planks_dark", library: "planks", crypt: "stone_dark", guardroom: "stone", treasure: "flagstone", shrine: "flagstone", dungeonlib: "stone", camp: "dirt", courtyard: "cobble", greathall: "flagstone", lord: "planks" };
  function furnishCore(sb, role, r, ctx) {
    const underground = sb.meta.type === "dungeon", surface = underground && ["storage", "library", "living", "bedroom"].includes(role) ? "stone" : SURF_BY_ROLE[role];
    if (surface) sb.paint(r.x, r.y, r.w, r.h, surface);
    else if (role === "cellar") sb.paint(r.x, r.y, r.w, r.h, sb.meta.cellarFloor || "stone");
    const rng = sb.rng, area = r.w * r.h, depth = ctx.depth || 0, big = area >= 30;
    const fire = (ps) => {
      for (const p of ps) if (CAT2[p.cat].light) sb.light(p.x + 0.5, p.y + 0.5, { radius: 3, power: 0.7 });
    };
    switch (role) {
      case "living":
        fire(atWall2(sb, r, "hearth", 1));
        tableSet2(sb, r, 2);
        if (big) tableSet2(sb, r, 1);
        atWall2(sb, r, "bench", 1);
        atWall2(sb, r, "shelf", 1);
        if (rng.chance(0.5)) atWall2(sb, r, "planter", 1);
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "bedroom", { trap: rng.chance(0.06) }));
        rug2(sb, r);
        break;
      case "bedroom":
        atWall2(sb, r, "bed", big ? 2 : 1);
        atWall2(sb, r, "wardrobe", 1).forEach((p) => stock2(sb, p, ctx, "bedroom"));
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "bedroom", { trap: rng.chance(0.08) }));
        if (big) inside2(sb, r, "table", 1);
        if (rng.chance(0.4)) rug2(sb, r);
        break;
      case "kitchen":
        fire(atWall2(sb, r, "hearth", 1));
        atWall2(sb, r, "cauldron", 1);
        atWall2(sb, r, "counter", 2);
        inside2(sb, r, "table", 1);
        atWall2(sb, r, "barrel", 2).forEach((p) => stock2(sb, p, ctx, "kitchen"));
        atWall2(sb, r, "crate", 2).forEach((p) => stock2(sb, p, ctx, "kitchen"));
        atWall2(sb, r, "shelf", 1).forEach((p) => stock2(sb, p, ctx, "kitchen"));
        break;
      case "hall": {
        fire(atWall2(sb, r, "hearth", 1));
        atWall2(sb, r, "counter", Math.min(4, Math.max(2, Math.floor(r.w / 3))));
        for (let i = 0; i < Math.min(5, Math.max(2, Math.floor(area / 14))); i++) tableSet2(sb, r, 2);
        atWall2(sb, r, "barrel", 2).forEach((p) => stock2(sb, p, ctx, "tavern"));
        atWall2(sb, r, "stool", 2);
        atWall2(sb, r, "bench", 1);
        wallMount2(sb, r, "banner", 1);
        if (area >= 36) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        rug2(sb, r);
        break;
      }
      case "storage":
        atWall2(sb, r, "crate", 2 + (big ? 2 : 0)).forEach((p) => stock2(sb, p, ctx, "storage"));
        atWall2(sb, r, "barrel", 2).forEach((p) => stock2(sb, p, ctx, "storage"));
        atWall2(sb, r, "shelf", 1).forEach((p) => stock2(sb, p, ctx, "storage"));
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "storage", { trap: rng.chance(0.12 + depth * 0.05) }));
        if (big) inside2(sb, r, "crate", 1).forEach((p) => stock2(sb, p, ctx, "storage"));
        break;
      case "cellar":
        atWall2(sb, r, "barrel", 3).forEach((p) => stock2(sb, p, ctx, "tavern"));
        atWall2(sb, r, "crate", 2).forEach((p) => stock2(sb, p, ctx, "storage"));
        atWall2(sb, r, "shelf", 1).forEach((p) => stock2(sb, p, ctx, "storage"));
        inside2(sb, r, "barrel", big ? 2 : 1).forEach((p) => stock2(sb, p, ctx, "tavern"));
        break;
      case "smithy":
        fire(atWall2(sb, r, "forge", 1));
        atWall2(sb, r, "anvil", 1);
        atWall2(sb, r, "rack", 2);
        atWall2(sb, r, "counter", 2);
        atWall2(sb, r, "barrel", 1);
        atWall2(sb, r, "crate", 2).forEach((p) => stock2(sb, p, ctx, "smith"));
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "smith", { trap: rng.chance(0.1) }));
        break;
      case "alchemy":
        atWall2(sb, r, "shelf", 3).forEach((p) => stock2(sb, p, ctx, "alchemy"));
        atWall2(sb, r, "cauldron", 1);
        atWall2(sb, r, "counter", 2);
        atWall2(sb, r, "planter", 2);
        inside2(sb, r, "table", 1);
        atWall2(sb, r, "crate", 1).forEach((p) => stock2(sb, p, ctx, "alchemy"));
        break;
      case "shop":
        atWall2(sb, r, "counter", Math.min(3, Math.max(2, Math.floor(r.w / 3))));
        atWall2(sb, r, "shelf", 3).forEach((p) => stock2(sb, p, ctx, "storage"));
        atWall2(sb, r, "barrel", 1);
        atWall2(sb, r, "crate", 2).forEach((p) => stock2(sb, p, ctx, "storage"));
        inside2(sb, r, "crate", 1);
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "storage", { trap: rng.chance(0.1) }));
        rug2(sb, r);
        break;
      case "chapel": {
        const a = atWall2(sb, r, "altar", 1);
        if (a[0]) sb.lights.push({ id: "altar", x: a[0].x + 0.5, y: a[0].y + 0.15, radius: 2.3, power: 0.55, phase: 4, intensity: 10, distance: 8, brightRadius: 4 });
        wallMount2(sb, r, "banner", 2);
        for (let i = 0; i < Math.min(4, Math.floor(area / 10) + 1); i++) inside2(sb, r, "bench", 1);
        atWall2(sb, r, "planter", 1);
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "chapel"));
        atWall2(sb, r, "books", 1).forEach((p) => stock2(sb, p, ctx, "library"));
        rug2(sb, r);
        if (area >= 30) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        break;
      }
      case "guard":
        atWall2(sb, r, "desk", 1);
        atWall2(sb, r, "chair", 1);
        atWall2(sb, r, "rack", 2);
        wallMount2(sb, r, "banner", 1);
        tableSet2(sb, r, 2);
        atWall2(sb, r, "barrel", 1);
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "guard", { trap: rng.chance(0.12) }));
        break;
      case "cells":
        atWall2(sb, r, "cot", Math.max(1, Math.floor(area / 7)));
        atWall2(sb, r, "bones", 1);
        atWall2(sb, r, "barrel", 1);
        atWall2(sb, r, "crate", 1).forEach((p) => stock2(sb, p, ctx, "guard"));
        break;
      case "armory":
        atWall2(sb, r, "rack", Math.max(2, Math.floor(r.w / 2)));
        atWall2(sb, r, "chest", 2).forEach((p) => stock2(sb, p, ctx, "guard", { trap: rng.chance(0.2), bonus: 1 }));
        atWall2(sb, r, "crate", 2).forEach((p) => stock2(sb, p, ctx, "guard"));
        break;
      case "warehouse": {
        const n = Math.max(6, Math.floor(area / 3));
        for (let i = 0; i < n; i++) {
          const p = (rng.chance(0.5) ? atWall2 : anywhere2)(sb, r, rng.pick(["crate", "crate", "barrel", "chest"]), 1)[0];
          if (p) stock2(sb, p, ctx, "storage", { trap: p.type === "chest" && rng.chance(0.15) });
        }
        if (big) sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        break;
      }
      case "library":
        atWall2(sb, r, "books", Math.max(2, Math.floor(r.w / 2))).forEach((p) => stock2(sb, p, ctx, "library"));
        atWall2(sb, r, "desk", 1);
        atWall2(sb, r, "scrolls", 1);
        tableSet2(sb, r, 2);
        atWall2(sb, r, "planter", 1);
        rug2(sb, r);
        break;
      // подземные роли
      case "crypt":
        for (let i = 0; i < Math.max(2, Math.floor(area / 9)); i++) (rng.chance(0.7) ? inside2 : atWall2)(sb, r, rng.chance(0.7) ? "sarcophagus" : "gravestone", 1).forEach((p) => {
          if (p.cat === "sarcophagus" && rng.chance(0.5)) stock2(sb, p, ctx, "crypt", { trap: rng.chance(0.35), trapKinds: ["gas", "fire", "needle"] });
        });
        atWall2(sb, r, "bones", 2);
        fire(atWall2(sb, r, "brazier", 1));
        atWall2(sb, r, "pillar", 2);
        break;
      case "guardroom":
        tableSet2(sb, r, 3);
        atWall2(sb, r, "rack", 1);
        atWall2(sb, r, "barrel", 2).forEach((p) => stock2(sb, p, ctx, "guard"));
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "guard", { trap: rng.chance(0.25) }));
        atWall2(sb, r, "bones", 1);
        fire(atWall2(sb, r, "brazier", 1));
        break;
      case "treasure":
        atWall2(sb, r, "chest", Math.max(2, Math.floor(area / 10))).forEach((p, i) => stock2(sb, p, ctx, "vault", { trap: true, bonus: 1, lockKey: i === 0 ? ctx.vaultKey : void 0 }));
        atWall2(sb, r, "pillar", 2);
        fire(atWall2(sb, r, "brazier", 2));
        wallMount2(sb, r, "banner", 1);
        break;
      case "shrine": {
        const a = atWall2(sb, r, "altar", 1);
        if (a[0]) sb.lights.push({ id: "altar", x: a[0].x + 0.5, y: a[0].y + 0.15, radius: 2.3, power: 0.55, phase: 4, intensity: 10, distance: 8, brightRadius: 4 });
        wallMount2(sb, r, "banner", 2);
        atWall2(sb, r, "pillar", 2);
        atWall2(sb, r, "bones", 1);
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "chapel", { trap: rng.chance(0.4) }));
        break;
      }
      case "dungeonlib":
        atWall2(sb, r, "books", 2).forEach((p) => stock2(sb, p, ctx, "library"));
        atWall2(sb, r, "desk", 1);
        atWall2(sb, r, "scrolls", 1);
        atWall2(sb, r, "bones", 1);
        atWall2(sb, r, "crate", 1).forEach((p) => stock2(sb, p, ctx, "library", { trap: rng.chance(0.2) }));
        break;
      case "camp":
        fire(atWall2(sb, r, "brazier", 1));
        inside2(sb, r, "crate", 2).forEach((p) => stock2(sb, p, ctx, "camp"));
        inside2(sb, r, "barrel", 1).forEach((p) => stock2(sb, p, ctx, "camp"));
        atWall2(sb, r, "bench", 2);
        break;
      case "courtyard":
        atWall2(sb, r, "rack", 2);
        atWall2(sb, r, "barrel", 2).forEach((p) => stock2(sb, p, ctx, "guard"));
        atWall2(sb, r, "crate", 3).forEach((p) => stock2(sb, p, ctx, "guard"));
        inside2(sb, r, "well", 1);
        wallMount2(sb, r, "banner", 3);
        fire(atWall2(sb, r, "brazier", 3));
        atWall2(sb, r, "cart", 1);
        inside2(sb, r, "haystack", 1);
        break;
      case "greathall":
        wallMount2(sb, r, "banner", 3);
        fire(atWall2(sb, r, "hearth", 2));
        for (let i = 0; i < Math.max(2, Math.floor(area / 16)); i++) tableSet2(sb, r, 3);
        atWall2(sb, r, "pillar", 2);
        fire(atWall2(sb, r, "brazier", 2));
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "vault", { trap: rng.chance(0.25) }));
        sb.chandelier(r.x + Math.floor(r.w / 2), r.y + Math.floor(r.h / 2));
        rug2(sb, r);
        break;
      case "lord":
        atWall2(sb, r, "bed", 1);
        atWall2(sb, r, "wardrobe", 1).forEach((p) => stock2(sb, p, ctx, "bedroom", { bonus: 1 }));
        atWall2(sb, r, "desk", 1);
        atWall2(sb, r, "chest", 1).forEach((p) => stock2(sb, p, ctx, "vault", { trap: true, lockKey: ctx.vaultKey }));
        wallMount2(sb, r, "banner", 1);
        fire(atWall2(sb, r, "hearth", 1));
        rug2(sb, r);
        break;
      default:
        atWall2(sb, r, "crate", 1).forEach((p) => stock2(sb, p, ctx, "storage"));
    }
  }
  var FLAVOR = { living: "living", kitchen: "kitchen", hall: "hall", alchemy: "alchemy", shop: "shop", library: "study", guard: "study", lord: "study", smithy: "smith", bedroom: "bedroom", greathall: "hall", guardroom: "hall" };
  var WALL_POOLS = {
    living: ["painting", "clock", "hooks", "tapestry", "mirror", "herbs_hang", "horseshoe"],
    bedroom: ["painting", "mirror", "tapestry", "hooks"],
    kitchen: ["pans", "herbs_hang", "jars", "hooks", "clock"],
    hall: ["antlers", "shield", "tapestry", "swords", "painting", "clock", "horseshoe"],
    storage: ["hooks", "net", "horseshoe", "keysboard"],
    cellar: ["net", "keysboard", "hooks"],
    smithy: ["swords", "shield", "horseshoe", "hooks"],
    alchemy: ["jars", "herbs_hang", "map", "clock"],
    shop: ["painting", "keysboard", "hooks", "map", "clock", "jars"],
    chapel: ["tapestry", "painting", "clock"],
    guard: ["shield", "swords", "map", "noticeboard", "keysboard"],
    cells: ["shackles", "net"],
    armory: ["shield", "swords", "antlers"],
    warehouse: ["net", "hooks", "keysboard", "noticeboard"],
    library: ["map", "painting", "clock", "jars"],
    crypt: ["shackles", "tapestry", "net"],
    guardroom: ["shield", "swords", "noticeboard"],
    treasure: ["tapestry", "shield", "swords"],
    shrine: ["tapestry", "shackles"],
    dungeonlib: ["map", "jars", "shackles"],
    greathall: ["tapestry", "shield", "swords", "antlers", "painting", "mirror"],
    lord: ["tapestry", "mirror", "painting", "clock", "shield"],
    courtyard: ["shield", "noticeboard", "horseshoe"],
    camp: ["net"]
  };
  var FLOOR_POOLS = {
    living: ["basket", "boots", "broom", "rope"],
    bedroom: ["boots", "basket"],
    kitchen: ["bucket", "sack", "basket", "broom", "rope"],
    hall: ["sack", "boots", "puddle", "bucket"],
    storage: ["sack", "rope", "bucket", "straw", "pitchfork", "basket"],
    cellar: ["straw", "puddle", "rope", "sack", "rubble", "bucket"],
    smithy: ["bucket", "rubble", "shovel", "sack"],
    alchemy: ["basket", "bucket", "sack"],
    shop: ["basket", "sack", "rope"],
    chapel: ["basket"],
    guard: ["boots", "bucket", "rope"],
    cells: ["straw", "bucket", "rubble", "puddle"],
    armory: ["boots", "rope"],
    warehouse: ["sack", "rope", "bucket", "straw", "basket", "wheel"],
    library: ["basket"],
    crypt: ["rubble", "puddle"],
    guardroom: ["boots", "bucket", "rubble"],
    treasure: ["rubble"],
    shrine: ["rubble"],
    dungeonlib: ["rubble", "straw"],
    courtyard: ["wheel", "bucket", "straw", "rope", "shovel", "pitchfork", "puddle"],
    camp: ["rope", "bucket", "lantern_floor", "boots", "sack"]
  };
  var SOLID_POOLS = {
    kitchen: [["workbench", "atWall", 0.5]],
    smithy: [["workbench", "atWall", 0.8], ["sackpile", "atWall", 0.4]],
    storage: [["sackpile", "atWall", 0.8], ["cratestack", "atWall", 0.6], ["barrelstack", "atWall", 0.5], ["haybale", "atWall", 0.3]],
    cellar: [["barrelstack", "atWall", 0.6], ["cratestack", "atWall", 0.5]],
    warehouse: [["cratestack", "atWall", 0.9], ["barrelstack", "atWall", 0.8], ["sackpile", "atWall", 0.8], ["haybale", "atWall", 0.5]],
    bedroom: [["cradle", "atWall", 0.18]],
    living: [["loom", "atWall", 0.18], ["bathtub", "atWall", 0.1]],
    chapel: [["pulpit", "atWall", 0.8], ["font", "atWall", 0.6], ["statue", "atWall", 0.5]],
    crypt: [["coffin", "atWall", 0.5], ["statue", "atWall", 0.4]],
    cells: [["cage", "atWall", 0.5]],
    greathall: [["throne", "atWall", 0.7], ["statue", "atWall", 0.5]],
    lord: [["statue", "atWall", 0.3]],
    treasure: [["statue", "atWall", 0.5]],
    shrine: [["statue", "atWall", 0.6]],
    courtyard: [["haybale", "atWall", 0.6], ["cratestack", "atWall", 0.6], ["barrelstack", "atWall", 0.5], ["statue", "inside", 0.3]],
    camp: [["haybale", "atWall", 0.4]]
  };
  function deco(sb, role, r) {
    const rng = sb.rng, area = r.w * r.h, place = { atWall: atWall2, inside: inside2, anywhere: anywhere2 };
    for (const p of sb.props) if (!p.flavor && (p.cat === "table" || p.cat === "counter") && p.x >= r.x && p.y >= r.y && p.x < r.x + r.w && p.y < r.y + r.h) p.flavor = FLAVOR[role] || "default";
    for (const [key10, how, chance] of SOLID_POOLS[role] || []) if (rng.chance(chance)) place[how](sb, r, key10, 1);
    const wp = WALL_POOLS[role];
    if (wp) {
      const n = Math.min(5, Math.max(1, Math.floor((r.w + r.h) / 5)));
      for (let i = 0; i < n; i++) wallMount2(sb, r, rng.pick(wp), 1);
    }
    const fp = FLOOR_POOLS[role];
    if (fp) {
      const n = Math.min(6, Math.floor(area / 14) + (rng.chance(0.5) ? 1 : 0));
      for (let i = 0; i < n; i++) anywhere2(sb, r, rng.pick(fp), 1);
    }
  }
  var COVER = { living: 0.26, bedroom: 0.26, kitchen: 0.3, hall: 0.27, storage: 0.36, cellar: 0.3, smithy: 0.28, alchemy: 0.28, shop: 0.28, chapel: 0.22, guard: 0.26, cells: 0.22, armory: 0.26, warehouse: 0.38, library: 0.3, crypt: 0.2, guardroom: 0.22, treasure: 0.24, shrine: 0.2, dungeonlib: 0.22, camp: 0.1, courtyard: 0.1, greathall: 0.22, lord: 0.26 };
  var DROP_ORDER = { chair: 0, stool: 0, bench: 1, planter: 1, barrel: 2, crate: 2, sackpile: 2, cratestack: 2, barrelstack: 2, haybale: 2, pillar: 3, rack: 3, scrolls: 3, bush: 3, tree: 3, signpost: 3, cart: 3, table: 4, wardrobe: 5, shelf: 5 };
  function thin(sb, r, maxCover) {
    const cells = roomCells2(sb, r).length, inR = (p) => p.x >= r.x && p.y >= r.y && p.x < r.x + r.w && p.y < r.y + r.h, kk = (p) => p.x + "," + p.y;
    let solid = sb.props.filter((p) => inR(p) && sb.occ.get(kk(p)) === p);
    if (solid.length / cells <= maxCover) return;
    const keep = (p) => p.type === "npc" || p.container && p.loot && (p.loot.gold || p.loot.potions || p.loot.gear.length || p.lock || p.trap);
    const drop = sb.rng.shuffle(solid.filter((p) => !keep(p) && DROP_ORDER[p.cat] !== void 0 && !(p.cat === "table" && sb.props.some((q) => q.cat === "chair" && Math.abs(q.x - p.x) + Math.abs(q.y - p.y) === 1)))).sort((a, b) => DROP_ORDER[a.cat] - DROP_ORDER[b.cat]);
    for (const p of drop) {
      if (solid.length / cells <= maxCover) break;
      sb.props.splice(sb.props.indexOf(p), 1);
      sb.occ.delete(kk(p));
      solid = solid.filter((q) => q !== p);
      sb._reach = null;
    }
  }
  function furnish2(sb, role, r, ctx) {
    furnishCore(sb, role, r, ctx);
    deco(sb, role, r);
    if (COVER[role]) thin(sb, r, COVER[role]);
  }

  // src/look-options.js
  var P2 = (list) => list.map(([hex, name]) => ({ hex, name }));
  var PALETTES2 = {
    skin: P2([["#f6dcc3", "\u0424\u0430\u0440\u0444\u043E\u0440"], ["#f2d4b4", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F"], ["#e9bf90", "\u0422\u0451\u043F\u043B\u0430\u044F"], ["#e3bb8a", "\u041F\u0435\u0441\u043E\u0447\u043D\u0430\u044F"], ["#d9a577", "\u0417\u0430\u0433\u0430\u0440"], ["#c58d64", "\u041C\u0435\u0434\u043D\u0430\u044F"], ["#a8714d", "\u0411\u0440\u043E\u043D\u0437\u0430"], ["#8b5b42", "\u041A\u0430\u0448\u0442\u0430\u043D\u043E\u0432\u0430\u044F"], ["#6b4331", "\u0422\u0451\u043C\u043D\u0430\u044F"], ["#4a2f25", "\u042D\u0431\u0435\u043D\u043E\u0432\u0430\u044F"], ["#efbc88", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#f8dfca", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#eac2ad", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#d8a17a", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#b77a55", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#a26a48", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#70472f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#533827", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"]]),
    hair: P2([["#1c1b20", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#26282e", "\u0413\u0440\u0430\u0444\u0438\u0442"], ["#3a2a22", "\u0428\u043E\u043A\u043E\u043B\u0430\u0434"], ["#493024", "\u041A\u0430\u0448\u0442\u0430\u043D"], ["#6a432c", "\u041E\u0440\u0435\u0445"], ["#8a5a34", "\u041C\u0435\u0434\u043E\u0432\u044B\u0439"], ["#a64f35", "\u0420\u044B\u0436\u0438\u0439"], ["#c4622f", "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439"], ["#b7803c", "\u0417\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u0439"], ["#d9b45a", "\u0411\u043B\u043E\u043D\u0434"], ["#e6cf8a", "\u041B\u0451\u043D"], ["#c7c4bf", "\u0421\u0435\u0434\u043E\u0439"], ["#e8e6ee", "\u0411\u0435\u043B\u044B\u0439"], ["#8d8a99", "\u041F\u0435\u043F\u0435\u043B"], ["#4a7fd0", "\u041B\u0430\u0437\u0443\u0440\u044C"], ["#5a3fa8", "\u0418\u043D\u0434\u0438\u0433\u043E"], ["#c05a9a", "\u041C\u0430\u043B\u0438\u043D\u0430"], ["#e07aa8", "\u0420\u043E\u0437\u043E\u0432\u044B\u0439"], ["#3fa58a", "\u0411\u0438\u0440\u044E\u0437\u0430"], ["#5f9a45", "\u041C\u043E\u0445"], ["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#3b6a8a", "\u0421\u0442\u0430\u043B\u044C"], ["#75462e", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#c9c6d7", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#d7a652", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#352b32", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#734c32", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#17191f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#f0e9dc", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#e0b969", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"], ["#cb763f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"], ["#77352b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"], ["#596779", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"], ["#5d437c", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"], ["#395c57", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"], ["#8d526b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"], ["#ac86ba", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),
    eye: P2([["#14141a", "\u0427\u0451\u0440\u043D\u044B\u0435"], ["#3a2418", "\u0422\u0451\u043C\u043D\u043E-\u043A\u0430\u0440\u0438\u0435"], ["#6a4a22", "\u041A\u0430\u0440\u0438\u0435"], ["#2f5fa8", "\u0421\u0438\u043D\u0438\u0435"], ["#2f7a5a", "\u0417\u0435\u043B\u0451\u043D\u044B\u0435"], ["#6a3fa0", "\u0424\u0438\u0430\u043B\u043A\u043E\u0432\u044B\u0435"], ["#c27a1c", "\u042F\u043D\u0442\u0430\u0440\u043D\u044B\u0435"], ["#8a8f9a", "\u0421\u0435\u0440\u044B\u0435"], ["#b02f3d", "\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0435"]]),
    cloth: P2([["#24456b", "\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439"], ["#315e84", "\u0421\u0438\u043D\u0438\u0439"], ["#4a7fb0", "\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439"], ["#2f7a7a", "\u041C\u043E\u0440\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430"], ["#566d70", "\u0421\u043B\u0430\u043D\u0435\u0446"], ["#2d4f2c", "\u0425\u0432\u043E\u044F"], ["#3f6b3b", "\u0417\u0435\u043B\u0451\u043D\u044B\u0439"], ["#487844", "\u0422\u0440\u0430\u0432\u0430"], ["#7a9a4a", "\u041E\u043B\u0438\u0432\u0430"], ["#452361", "\u0418\u043D\u0434\u0438\u0433\u043E"], ["#5d2f7e", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"], ["#62377e", "\u0410\u043C\u0435\u0442\u0438\u0441\u0442"], ["#8a4a9a", "\u041E\u0440\u0445\u0438\u0434\u0435\u044F"], ["#c8688a", "\u0420\u043E\u0437\u0430"], ["#6a2330", "\u0411\u0443\u0440\u0433\u0443\u043D\u0434"], ["#8a2f3c", "\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439"], ["#843f37", "\u041A\u0438\u0440\u043F\u0438\u0447"], ["#b0452f", "\u0422\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u0430"], ["#c7792f", "\u042F\u043D\u0442\u0430\u0440\u044C"], ["#8a6a46", "\u041B\u0435\u043D"], ["#2a2a30", "\u0423\u0433\u043E\u043B\u044C"], ["#6c6c76", "\u0421\u0435\u0440\u044B\u0439"], ["#e6dcc4", "\u041A\u0440\u0435\u043C\u043E\u0432\u044B\u0439"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#8b3d46", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#172b48", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#386f9a", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#528b91", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#244b3b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#74914b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#b28439", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#bf6d36", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"], ["#714c38", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"], ["#302d38", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"], ["#aaa69b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"], ["#cfbda0", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"], ["#775b96", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"], ["#a9617b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"], ["#484c74", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),
    trim: P2([["#d0a94a", "\u0417\u043E\u043B\u043E\u0442\u043E"], ["#c3a04c", "\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"], ["#e8c870", "\u0421\u0432\u0435\u0442\u043B\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"], ["#b6bdc5", "\u0421\u0435\u0440\u0435\u0431\u0440\u043E"], ["#8fa0b0", "\u0421\u0442\u0430\u043B\u044C"], ["#c5b895", "\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C"], ["#78552e", "\u0411\u0440\u043E\u043D\u0437\u0430"], ["#b87333", "\u041C\u0435\u0434\u044C"], ["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#3d8be8", "\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"], ["#4fb58a", "\u0418\u0437\u0443\u043C\u0440\u0443\u0434"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#2a2a30", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#c6a04f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#e4c778", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#dbb787", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#ad7748", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#926749", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#d8dce1", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#82919d", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#526374", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"], ["#e9dfc7", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"], ["#b18bbf", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"], ["#699ca0", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"], ["#4c5b4c", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"]]),
    leather: P2([["#4b3626", "\u0422\u0451\u043C\u043D\u0430\u044F \u043A\u043E\u0436\u0430"], ["#5a3d28", "\u041A\u043E\u0436\u0430"], ["#6a4a30", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F \u043A\u043E\u0436\u0430"], ["#8a6a46", "\u0414\u0443\u0431\u043B\u0451\u043D\u0430\u044F"], ["#2a2a30", "\u0427\u0451\u0440\u043D\u0430\u044F"], ["#3a3a44", "\u0413\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u0430\u044F"], ["#6a2330", "\u041A\u0440\u0430\u0441\u043D\u0430\u044F"], ["#2d4f2c", "\u0417\u0435\u043B\u0451\u043D\u0430\u044F"], ["#24456b", "\u0421\u0438\u043D\u044F\u044F"]]),
    paint: P2([["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#3d8be8", "\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"], ["#1a1a1f", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#3f9a5a", "\u0417\u0435\u043B\u0451\u043D\u044B\u0439"], ["#d0a94a", "\u0417\u043E\u043B\u043E\u0442\u043E\u0439"], ["#7a3fa8", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"], ["#e07a2f", "\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439"]]),
    gem: P2([["#4aa8f0", "\u0421\u0430\u043F\u0444\u0438\u0440"], ["#e0475a", "\u0420\u0443\u0431\u0438\u043D"], ["#4fd08a", "\u0418\u0437\u0443\u043C\u0440\u0443\u0434"], ["#a86bf0", "\u0410\u043C\u0435\u0442\u0438\u0441\u0442"], ["#f0c040", "\u0422\u043E\u043F\u0430\u0437"], ["#40e0d0", "\u0411\u0438\u0440\u044E\u0437\u0430"], ["#f0f0ff", "\u0410\u043B\u043C\u0430\u0437"], ["#f07ac0", "\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u043A\u0432\u0430\u0440\u0446"]])
  };
  var hexes2 = (key10) => PALETTES2[key10].map((c) => c.hex);
  var L2 = (list) => list.map(([id, name]) => ({ id, name }));
  var OPTIONS2 = {
    gender: L2([["male", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"], ["female", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"]]),
    ears: L2([["round", "\u041E\u0431\u044B\u0447\u043D\u044B\u0435"], ["small", "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435"], ["pointed", "\u041E\u0441\u0442\u0440\u044B\u0435"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0435"]]),
    hairStyle: L2([["bald", "\u0411\u0435\u0437 \u0432\u043E\u043B\u043E\u0441"], ["buzz", "\u0401\u0436\u0438\u043A"], ["short", "\u0412\u0437\u044A\u0435\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435"], ["spiky", "\u0428\u0438\u043F\u044B"], ["mohawk", "\u0418\u0440\u043E\u043A\u0435\u0437"], ["sweep", "\u041A\u043E\u0441\u0430\u044F \u0447\u0451\u043B\u043A\u0430"], ["bob", "\u041A\u0430\u0440\u0435"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0435"], ["wavy", "\u0412\u043E\u043B\u043D\u044B"], ["ponytail", "\u0425\u0432\u043E\u0441\u0442"], ["bun", "\u041F\u0443\u0447\u043E\u043A"], ["twin", "\u0414\u0432\u0430 \u0445\u0432\u043E\u0441\u0442\u0430"], ["braid", "\u041A\u043E\u0441\u0430"], ["curly", "\u041A\u0443\u0434\u0440\u0438"]]),
    brows: L2([["soft", "\u041C\u044F\u0433\u043A\u0438\u0435"], ["straight", "\u0420\u043E\u0432\u043D\u044B\u0435"], ["angry", "\u0421\u0443\u0440\u043E\u0432\u044B\u0435"], ["raised", "\u041F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435"], ["thick", "\u0413\u0443\u0441\u0442\u044B\u0435"], ["thin", "\u0422\u043E\u043D\u043A\u0438\u0435"], ["sad", "\u041F\u0435\u0447\u0430\u043B\u044C\u043D\u044B\u0435"], ["none", "\u0411\u0435\u0437 \u0431\u0440\u043E\u0432\u0435\u0439"]]),
    eyes: L2([["dot", "\u0422\u043E\u0447\u043A\u0438"], ["wide", "\u0428\u0438\u0440\u043E\u043A\u0438\u0435"], ["narrow", "\u0423\u0437\u043A\u0438\u0435"], ["happy", "\u0420\u0430\u0434\u043E\u0441\u0442\u043D\u044B\u0435"], ["sleepy", "\u0421\u043E\u043D\u043D\u044B\u0435"], ["sparkle", "\u0411\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0435"], ["big", "\u0411\u043E\u043B\u044C\u0448\u0438\u0435"]]),
    mouth: L2([["smile", "\u0423\u043B\u044B\u0431\u043A\u0430"], ["neutral", "\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439"], ["grin", "\u0423\u0445\u043C\u044B\u043B\u043A\u0430 \u0441 \u0437\u0443\u0431\u0430\u043C\u0438"], ["smirk", "\u0423\u0441\u043C\u0435\u0448\u043A\u0430"], ["open", "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439"], ["cat", "\u041A\u043E\u0448\u0430\u0447\u0438\u0439"], ["frown", "\u0425\u043C\u0443\u0440\u044B\u0439"]]),
    beard: L2([["none", "\u0411\u0435\u0437 \u0431\u043E\u0440\u043E\u0434\u044B"], ["stubble", "\u0429\u0435\u0442\u0438\u043D\u0430"], ["mustache", "\u0423\u0441\u044B"], ["goatee", "\u042D\u0441\u043F\u0430\u043D\u044C\u043E\u043B\u043A\u0430"], ["short", "\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F"], ["full", "\u0413\u0443\u0441\u0442\u0430\u044F"], ["long", "\u0414\u043B\u0438\u043D\u043D\u0430\u044F"], ["sideburns", "\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u044B"]]),
    marks: L2([["freckles", "\u0412\u0435\u0441\u043D\u0443\u0448\u043A\u0438"], ["blush", "\u0420\u0443\u043C\u044F\u043D\u0435\u0446"], ["scar", "\u0428\u0440\u0430\u043C"], ["browscar", "\u0428\u0440\u0430\u043C \u043D\u0430 \u0431\u0440\u043E\u0432\u0438"], ["mole", "\u0420\u043E\u0434\u0438\u043D\u043A\u0430"], ["warpaint", "\u0411\u043E\u0435\u0432\u0430\u044F \u0440\u0430\u0441\u043A\u0440\u0430\u0441\u043A\u0430"], ["plaster", "\u041F\u043B\u0430\u0441\u0442\u044B\u0440\u044C"]]),
    headgear: L2([["none", "\u0411\u0435\u0437 \u0443\u0431\u043E\u0440\u0430"], ["hood", "\u041A\u0430\u043F\u044E\u0448\u043E\u043D"], ["wizhat", "\u0428\u043B\u044F\u043F\u0430 \u043C\u0430\u0433\u0430"], ["helm", "\u0428\u043B\u0435\u043C"], ["circlet", "\u0414\u0438\u0430\u0434\u0435\u043C\u0430"], ["headband", "\u041F\u043E\u0432\u044F\u0437\u043A\u0430"], ["cap", "\u0411\u0435\u0440\u0435\u0442 \u0441 \u043F\u0435\u0440\u043E\u043C"], ["crown", "\u041A\u043E\u0440\u043E\u043D\u0430"]]),
    cape: L2([["none", "\u0411\u0435\u0437 \u043F\u043B\u0430\u0449\u0430"], ["short", "\u041A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043F\u043B\u0430\u0449"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0439 \u043F\u043B\u0430\u0449"], ["mantle", "\u041D\u0430\u043A\u0438\u0434\u043A\u0430"]]),
    accessories: L2([["earring", "\u0421\u0435\u0440\u044C\u0433\u0430"], ["eyepatch", "\u041F\u043E\u0432\u044F\u0437\u043A\u0430 \u043D\u0430 \u0433\u043B\u0430\u0437"], ["glasses", "\u041E\u0447\u043A\u0438"], ["scarf", "\u0428\u0430\u0440\u0444"], ["amulet", "\u0410\u043C\u0443\u043B\u0435\u0442"], ["bracers", "\u041D\u0430\u0440\u0443\u0447\u0438"]])
  };
  var OUTFITS2 = {
    fighter: L2([["plate", "\u041B\u0430\u0442\u044B"], ["tabard", "\u0421\u044E\u0440\u043A\u043E"], ["leather", "\u041A\u043E\u0436\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"], ["knight", "\u0422\u044F\u0436\u0451\u043B\u044B\u0435 \u043B\u0430\u0442\u044B"]]),
    wizard: L2([["robe", "\u041C\u0430\u043D\u0442\u0438\u044F"], ["mantle", "\u0421 \u0432\u043E\u0440\u043E\u0442\u043D\u0438\u043A\u043E\u043C"], ["sash", "\u0421 \u043A\u0443\u0448\u0430\u043A\u043E\u043C"], ["scholar", "\u0423\u0447\u0451\u043D\u044B\u0439 \u0436\u0438\u043B\u0435\u0442"]]),
    rogue: L2([["leathers", "\u041A\u043E\u0436\u0430 \u0441 \u043F\u0435\u0440\u0435\u0432\u044F\u0437\u044C\u044E"], ["vest", "\u0416\u0438\u043B\u0435\u0442"], ["tunic", "\u0422\u0443\u043D\u0438\u043A\u0430"], ["studded", "\u041A\u043B\u0451\u043F\u0430\u043D\u044B\u0439 \u0434\u043E\u0441\u043F\u0435\u0445"]]),
    cleric: L2([["vestments", "\u041E\u0431\u043B\u0430\u0447\u0435\u043D\u0438\u0435"], ["surplice", "\u0421\u0442\u0438\u0445\u0430\u0440\u044C"], ["mail", "\u041A\u043E\u043B\u044C\u0447\u0443\u0433\u0430"], ["monk", "\u0420\u044F\u0441\u0430 \u0441 \u0432\u0435\u0440\u0451\u0432\u043A\u043E\u0439"]])
  };
  var DEFAULT_OUTFIT2 = { fighter: "plate", wizard: "robe", rogue: "leathers", cleric: "vestments" };
  var COLOR_FIELDS2 = { skin: "skin", hair: "hair", hair2: "hair", brow: "hair", eye: "eye", beardColor: "hair", cloth: "cloth", cloth2: "cloth", trim: "trim", leather: "leather", accent: "cloth", markColor: "paint", hat: "cloth", capeColor: "cloth", gem: "gem" };
  var ALLOWED_KEYS2 = /* @__PURE__ */ new Set(["gender", "ears", "hairStyle", "brows", "eyes", "mouth", "beard", "marks", "headgear", "cape", "accessories", "outfit", "face", "hood", ...Object.keys(COLOR_FIELDS2)]);
  var BASE2 = { ears: "round", eyes: "dot", mouth: "smile", beard: "none", marks: [], headgear: "none", accessories: [], skin: "#e9bf90", hair2: null, brow: null, beardColor: null, cloth2: null, accent: null, hat: null, capeColor: null, eye: "#14141a", trim: "#d0a94a", gem: "#4aa8f0" };
  var CLASS_DEFAULT2 = {
    fighter: { cloth: "#315e84", leather: "#5a3d28", male: { hair: "#493024", hairStyle: "short", brows: "angry" }, female: { hair: "#d9b45a", hairStyle: "ponytail", brows: "soft" } },
    wizard: { cloth: "#5d2f7e", leather: "#5a3d28", male: { hair: "#c7c4bf", hairStyle: "short", brows: "angry" }, female: { hair: "#c7c4bf", hairStyle: "wavy", brows: "soft" } },
    rogue: { cloth: "#3f6b3b", leather: "#6a4a30", cape: "short", male: { hair: "#26282e", hairStyle: "bun", brows: "angry" }, female: { hair: "#6a432c", hairStyle: "bob", brows: "soft" } },
    cleric: { cloth: "#8a2f3c", leather: "#5a3d28", male: { hair: "#493024", hairStyle: "bald", brows: "angry", beard: "full" }, female: { hair: "#c7c4bf", hairStyle: "long", brows: "soft", headgear: "hood" } }
  };
  function defaultLook2(classId, gender = "male") {
    const c = CLASS_DEFAULT2[classId] || CLASS_DEFAULT2.fighter, g = c[gender === "female" ? "female" : "male"];
    return { ...structuredCopy2(BASE2), gender: gender === "female" ? "female" : "male", cloth: c.cloth, leather: c.leather, cape: c.cape || "none", outfit: DEFAULT_OUTFIT2[classId] || "plate", ...g };
  }
  var structuredCopy2 = (o) => JSON.parse(JSON.stringify(o));
  function randomLook2(classId, gender, rnd = Math.random) {
    const pick = (list) => list[Math.floor(rnd() * list.length)], chance = (p) => rnd() < p;
    const ap = defaultLook2(classId, gender), male = gender !== "female";
    ap.skin = pick(hexes2("skin"));
    ap.ears = pick(OPTIONS2.ears.map((o) => o.id).concat(["round", "round", "round"]));
    ap.hairStyle = pick(OPTIONS2.hairStyle.filter((o) => male || o.id !== "bald").map((o) => o.id));
    ap.hair = pick(hexes2("hair").slice(0, chance(0.75) ? 14 : 22));
    ap.hair2 = chance(0.18) ? pick(hexes2("hair")) : null;
    ap.brows = pick(OPTIONS2.brows.slice(0, 7).map((o) => o.id));
    ap.eyes = pick(OPTIONS2.eyes.map((o) => o.id));
    ap.mouth = pick(OPTIONS2.mouth.map((o) => o.id));
    ap.eye = chance(0.5) ? "#14141a" : pick(hexes2("eye"));
    ap.beard = male && chance(0.55) ? pick(OPTIONS2.beard.map((o) => o.id)) : "none";
    ap.marks = OPTIONS2.marks.map((o) => o.id).filter(() => chance(0.18));
    ap.cloth = chance(0.5) ? CLASS_DEFAULT2[classId].cloth : pick(hexes2("cloth"));
    ap.cloth2 = chance(0.3) ? pick(hexes2("cloth")) : null;
    ap.trim = pick(hexes2("trim"));
    ap.leather = pick(hexes2("leather"));
    ap.gem = pick(hexes2("gem"));
    ap.outfit = pick(OUTFITS2[classId].map((o) => o.id));
    ap.headgear = chance(0.4) ? pick(OPTIONS2.headgear.map((o) => o.id)) : "none";
    ap.hat = ap.headgear !== "none" && chance(0.4) ? pick(hexes2("cloth")) : null;
    ap.cape = chance(0.4) ? pick(OPTIONS2.cape.map((o) => o.id)) : "none";
    ap.capeColor = ap.cape !== "none" && chance(0.5) ? pick(hexes2("cloth")) : null;
    ap.accessories = OPTIONS2.accessories.map((o) => o.id).filter(() => chance(0.14)).slice(0, 3);
    ap.accent = chance(0.3) ? pick(hexes2("cloth")) : null;
    return ap;
  }

  // src/worldgen/npc.js
  var TRAITS = [["\u0434\u043E\u0431\u0440\u043E\u0434\u0443\u0448\u043D\u044B\u0439", "\u0434\u043E\u0431\u0440\u043E\u0434\u0443\u0448\u043D\u0430\u044F"], ["\u0432\u043E\u0440\u0447\u043B\u0438\u0432\u044B\u0439", "\u0432\u043E\u0440\u0447\u043B\u0438\u0432\u0430\u044F"], ["\u043B\u044E\u0431\u043E\u043F\u044B\u0442\u043D\u044B\u0439", "\u043B\u044E\u0431\u043E\u043F\u044B\u0442\u043D\u0430\u044F"], ["\u043E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u044B\u0439", "\u043E\u0441\u0442\u043E\u0440\u043E\u0436\u043D\u0430\u044F"], ["\u0431\u043E\u043B\u0442\u043B\u0438\u0432\u044B\u0439", "\u0431\u043E\u043B\u0442\u043B\u0438\u0432\u0430\u044F"], ["\u0441\u0443\u0440\u043E\u0432\u044B\u0439", "\u0441\u0443\u0440\u043E\u0432\u0430\u044F"], ["\u043D\u0430\u0441\u043C\u0435\u0448\u043B\u0438\u0432\u044B\u0439", "\u043D\u0430\u0441\u043C\u0435\u0448\u043B\u0438\u0432\u0430\u044F"], ["\u043D\u0430\u0431\u043E\u0436\u043D\u044B\u0439", "\u043D\u0430\u0431\u043E\u0436\u043D\u0430\u044F"], ["\u0436\u0430\u0434\u043D\u044B\u0439", "\u0436\u0430\u0434\u043D\u0430\u044F"], ["\u0449\u0435\u0434\u0440\u044B\u0439", "\u0449\u0435\u0434\u0440\u0430\u044F"], ["\u0440\u043E\u0431\u043A\u0438\u0439", "\u0440\u043E\u0431\u043A\u0430\u044F"], ["\u0433\u043E\u0440\u0434\u044B\u0439", "\u0433\u043E\u0440\u0434\u0430\u044F"], ["\u0443\u0441\u0442\u0430\u043B\u044B\u0439", "\u0443\u0441\u0442\u0430\u043B\u0430\u044F"], ["\u043C\u0435\u0447\u0442\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0439", "\u043C\u0435\u0447\u0442\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F"], ["\u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439", "\u043F\u043E\u0434\u043E\u0437\u0440\u0438\u0442\u0435\u043B\u044C\u043D\u0430\u044F"], ["\u0432\u0435\u0441\u0451\u043B\u044B\u0439", "\u0432\u0435\u0441\u0451\u043B\u0430\u044F"]];
  var SPEECH = ["\u0433\u043E\u0432\u043E\u0440\u0438\u0442 \u043A\u043E\u0440\u043E\u0442\u043A\u043E \u0438 \u043F\u043E \u0434\u0435\u043B\u0443", "\u043B\u044E\u0431\u0438\u0442 \u043F\u043E\u0433\u043E\u0432\u043E\u0440\u043A\u0438", "\u0447\u0430\u0441\u0442\u043E \u0441\u0431\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0438 \u043F\u0435\u0440\u0435\u0441\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0435\u0442", "\u0433\u043E\u0432\u043E\u0440\u0438\u0442 \u043C\u0435\u0434\u043B\u0435\u043D\u043D\u043E, \u043F\u043E\u0434\u0431\u0438\u0440\u0430\u044F \u0441\u043B\u043E\u0432\u0430", "\u0448\u0443\u0442\u0438\u0442 \u0434\u0430\u0436\u0435 \u043E \u0441\u0435\u0440\u044C\u0451\u0437\u043D\u043E\u043C", "\u0433\u043E\u0432\u043E\u0440\u0438\u0442 \u0432\u043F\u043E\u043B\u0433\u043E\u043B\u043E\u0441\u0430 \u0438 \u043E\u0433\u043B\u044F\u0434\u044B\u0432\u0430\u0435\u0442\u0441\u044F", "\u0432\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u043B\u043E\u0432\u0435\u0447\u043A\u0438 \u0441\u0432\u043E\u0435\u0433\u043E \u0440\u0435\u043C\u0435\u0441\u043B\u0430", "\u0432\u0435\u0436\u043B\u0438\u0432 \u0434\u043E \u043F\u0440\u0438\u0442\u043E\u0440\u043D\u043E\u0441\u0442\u0438", "\u043F\u0435\u0440\u0435\u0431\u0438\u0432\u0430\u0435\u0442 \u0438 \u0442\u043E\u0440\u043E\u043F\u0438\u0442\u0441\u044F"];
  var WANTS = ["\u0447\u0442\u043E\u0431\u044B \u0432 \u043E\u043A\u0440\u0443\u0433\u0435 \u0431\u044B\u043B\u043E \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E", "\u043D\u0430\u043A\u043E\u043F\u0438\u0442\u044C \u0434\u0435\u043D\u0435\u0433 \u043D\u0430 \u0441\u0432\u043E\u0451 \u0434\u0435\u043B\u043E", "\u043D\u0430\u0439\u0442\u0438 \u043F\u0440\u043E\u043F\u0430\u0432\u0448\u0443\u044E \u0432\u0435\u0449\u044C", "\u0443\u0435\u0445\u0430\u0442\u044C \u0438\u0437 \u044D\u0442\u0438\u0445 \u043C\u0435\u0441\u0442", "\u0443\u0437\u043D\u0430\u0442\u044C \u043D\u043E\u0432\u043E\u0441\u0442\u0438 \u0441 \u0434\u043E\u0440\u043E\u0433\u0438", "\u0440\u0430\u0441\u043F\u043B\u0430\u0442\u0438\u0442\u044C\u0441\u044F \u0441 \u0434\u043E\u043B\u0433\u0430\u043C\u0438", "\u0434\u043E\u0436\u0434\u0430\u0442\u044C\u0441\u044F \u0432\u0435\u0441\u0442\u0435\u0439 \u043E\u0442 \u0440\u043E\u0434\u043D\u0438", "\u0447\u0442\u043E\u0431\u044B \u043A \u043D\u0435\u043C\u0443 \u043E\u0442\u043D\u043E\u0441\u0438\u043B\u0438\u0441\u044C \u0441 \u0443\u0432\u0430\u0436\u0435\u043D\u0438\u0435\u043C", "\u043F\u0440\u043E\u0441\u0442\u043E \u0434\u043E\u0436\u0438\u0442\u044C \u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E \u0434\u043E \u0441\u0442\u0430\u0440\u043E\u0441\u0442\u0438"];
  var FEARS = ["\u043F\u043E\u0436\u0430\u0440\u0430", "\u0434\u043E\u043B\u0433\u043E\u0432", "\u043D\u043E\u0447\u043D\u044B\u0445 \u0448\u043E\u0440\u043E\u0445\u043E\u0432", "\u0441\u0442\u0440\u0430\u0436\u0438", "\u043E\u0434\u0438\u043D\u043E\u0447\u0435\u0441\u0442\u0432\u0430", "\u0431\u043E\u043B\u0435\u0437\u043D\u0435\u0439", "\u0447\u0443\u0436\u0430\u043A\u043E\u0432 \u0441 \u043E\u0440\u0443\u0436\u0438\u0435\u043C", "\u0447\u0442\u043E \u0434\u0435\u043B\u043E \u043F\u0440\u0438\u0434\u0451\u0442 \u0432 \u0443\u043F\u0430\u0434\u043E\u043A"];
  function makePersona(rng, gender, knows = [], extra = {}) {
    const traits = rng.shuffle(TRAITS).slice(0, 2).map((t) => t[gender === "female" ? 1 : 0]);
    return { traits, speech: rng.pick(SPEECH), wants: rng.pick(WANTS), fears: rng.pick(FEARS), mood: rng.pick(["\u0441\u043F\u043E\u043A\u043E\u0439\u043D\u043E", "\u0442\u0440\u0435\u0432\u043E\u0436\u043D\u043E", "\u043F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u043E", "\u0443\u0441\u0442\u0430\u043B\u043E", "\u043D\u0430\u0441\u0442\u043E\u0440\u043E\u0436\u0435\u043D\u043D\u043E"]), knows, ...extra };
  }
  function makeNpc2(sb, owner, buildingType, lines, extra = {}) {
    const L3 = Array.isArray(lines) ? { lines, knows: [] } : lines, rng = sb.rng, t = BUILDING_TYPES2[buildingType] || BUILDING_TYPES2.house, classId = extra.classId || t.cls;
    const look = randomLook2(classId, owner.gender, () => rng.next());
    look.beard = owner.gender === "male" && look.beard !== "none" && rng.chance(0.5) ? look.beard : "none";
    look.marks = look.marks.filter((m) => m !== "warpaint");
    look.accessories = look.accessories.filter((a) => a !== "eyepatch" || rng.chance(0.3));
    look.markColor = null;
    const role = extra.role || t.role[owner.gender === "female" ? 1 : 0];
    const hands = buildingType === "guard" || classId === "fighter" && rng.chance(0.5) ? ["sword", "empty"] : ["empty", "empty"];
    return { type: "npc", kind: 20, gen: true, name: `${owner.full} \xB7 ${role}`, npc: { classId, gender: owner.gender, look, hands, lines: L3.lines, role, persona: makePersona(rng.fork("persona"), owner.gender, L3.knows, { where: sb.name }) } };
  }

  // src/worldgen/town.js
  var TOWN_SIZES2 = {
    small: { W: 40, H: 28, side: [2, 2], npcs: 4, parks: 1, cross: 0 },
    medium: { W: 54, H: 36, side: [3, 4], npcs: 8, parks: 2, cross: 1 },
    large: { W: 68, H: 46, side: [5, 6], npcs: 13, parks: 3, cross: 3 }
  };
  var key6 = (x, y) => x + "," + y;
  function carveStreets2(sb, rng, P3) {
    const { W, H } = sb, tw = 3;
    const segs = rng.int(sb.W >= 54 ? 2 : 1, sb.W >= 54 ? 3 : 2), bounds = [1];
    for (let i = 1; i < segs; i++) bounds.push(Math.floor(1 + (W - 2) * i / segs) + rng.int(-3, 3));
    bounds.push(W - 1);
    let y = rng.int(Math.floor(H * 0.38), Math.floor(H * 0.52));
    const ys = [];
    for (let i = 0; i < segs; i++) {
      sb.rect(bounds[i], y, bounds[i + 1] - bounds[i], tw);
      ys.push(y);
      if (i < segs - 1) {
        const ny = Math.max(4, Math.min(H - 4 - tw, y + rng.pick([-1, 1]) * rng.int(3, 5)));
        const x = bounds[i + 1] - 1;
        sb.rect(x, Math.min(y, ny), tw, Math.abs(ny - y) + tw);
        y = ny;
      }
    }
    const mainRows = /* @__PURE__ */ new Set();
    for (let j = 1; j < H - 1; j++) for (let i = 1; i < W - 1; i++) if (sb.isFloor(i, j)) mainRows.add(key6(i, j));
    const n = rng.int(...P3.side), xs = [];
    let tries = 0;
    while (xs.length < n && tries++ < 80) {
      const x = rng.int(5, W - 8);
      if (xs.every((o) => Math.abs(o - x) >= 9)) xs.push(x);
    }
    const streets = [];
    for (const x of xs) {
      const sw = rng.chance(0.5) ? 3 : 2;
      const colRows = [];
      for (let j = 1; j < H - 1; j++) if (mainRows.has(key6(x, j)) && mainRows.has(key6(x + sw - 1, j))) colRows.push(j);
      if (!colRows.length) continue;
      const top = Math.min(...colRows), bot = Math.max(...colRows);
      const up = rng.chance(0.85), down = rng.chance(0.7) || !up;
      if (up) {
        const end = rng.int(2, Math.max(2, top - 4));
        sb.rect(x, end, sw, top - end + 1);
        streets.push({ x, y0: end, y1: top, sw, vertical: true });
      }
      if (down) {
        const end = rng.int(Math.min(H - 3, bot + 5), H - 3);
        sb.rect(x, bot, sw, end - bot + 1);
        streets.push({ x, y0: bot, y1: end, sw, vertical: true });
      }
    }
    for (let c = 0; c < P3.cross; c++) {
      const s = rng.pick(streets.filter((s2) => s2.y1 - s2.y0 >= 6));
      if (!s) continue;
      const yy = rng.int(s.y0 + 2, s.y1 - 3), dir = rng.chance(0.5) ? 1 : -1, len = rng.int(5, 9), x0 = dir > 0 ? s.x + s.sw : s.x - len;
      if (x0 < 2 || x0 + len > W - 2) continue;
      sb.rect(x0, yy, len, 2);
    }
    return { ys, streets, mainRows };
  }
  function centerOf2(sb, rect) {
    return [rect.x + Math.floor(rect.w / 2), rect.y + Math.floor(rect.h / 2)];
  }
  function addPlaza2(sb, rng, P3, ys) {
    const w = sb.W >= 54 ? rng.int(9, 11) : 8, h = sb.W >= 54 ? rng.int(7, 9) : 6, x = Math.floor(sb.W / 2) - Math.floor(w / 2) + rng.int(-4, 4), yMain = ys[Math.floor(ys.length / 2)];
    const y = yMain + 1 - Math.floor(h / 2);
    const rect = { x: Math.max(2, x), y: Math.max(2, Math.min(sb.H - h - 2, y)), w, h };
    sb.rect(rect.x, rect.y, rect.w, rect.h);
    return rect;
  }
  function addYards2(sb, rng, P3, avoid) {
    const yards = [];
    for (let n = 0, tries = 0; n < P3.parks && tries < 60; tries++) {
      const w = rng.int(5, 7), h = rng.int(4, 5), x = rng.int(3, sb.W - w - 3), y = rng.int(3, sb.H - h - 3);
      let touches = 0, overlap3 = false;
      for (let j = y - 1; j <= y + h; j++) for (let i = x - 1; i <= x + w; i++) {
        const inner = i >= x && i < x + w && j >= y && j < y + h;
        if (inner && sb.isFloor(i, j)) overlap3 = true;
        if (!inner && sb.isFloor(i, j)) touches++;
      }
      if (overlap3 || touches < 3 || touches > w + h) continue;
      sb.rect(x, y, w, h);
      yards.push({ x, y, w, h, kind: n === 0 ? "park" : rng.pick(["graveyard", "farm", "park"]) });
      n++;
    }
    return yards;
  }
  function keepLargest2(sb, anchor) {
    const seen = /* @__PURE__ */ new Set(), st = [anchor];
    while (st.length) {
      const [x, y] = st.pop(), k = key6(x, y);
      if (seen.has(k) || !sb.isFloor(x, y)) continue;
      seen.add(k);
      for (const [dx, dy] of DIRS2) st.push([x + dx, y + dy]);
    }
    for (let y = 0; y < sb.H; y++) for (let x = 0; x < sb.W; x++) if (sb.isFloor(x, y) && !seen.has(key6(x, y))) sb.setFloor(x, y, 0);
  }
  function lotFree2(sb, lots, x, y, dx, dy, depth = 4, half = 2) {
    const px = dy ? 1 : 0, py = dx ? 1 : 0, cells = [];
    for (let k = 0; k <= depth; k++) for (let s = -half; s <= half; s++) {
      const cx3 = x + dx * k + px * s, cy3 = y + dy * k + py * s;
      if (!sb.inb(cx3, cy3) || cx3 < 1 || cy3 < 1 || cx3 > sb.W - 2 || cy3 > sb.H - 2) return null;
      if (k > 0 && sb.isFloor(cx3, cy3)) return null;
      if (lots.has(key6(cx3, cy3))) return null;
      cells.push(key6(cx3, cy3));
    }
    return cells;
  }
  function genTown2(plan, tryIndex = 0) {
    const P3 = TOWN_SIZES2[plan.size], rng = new Rng2(plan.seed + "/town").fork("try" + tryIndex), sb = new SceneBuilder2("town", plan.name, P3.W + rng.int(-3, 6), P3.H + rng.int(-2, 4), rng, { type: "town", seed: plan.seed, base: "cobble", wall: rng.pick(["plaster", "brick", "timber", "stone"]) });
    const { ys, streets } = carveStreets2(sb, rng, P3);
    const plaza = addPlaza2(sb, rng, P3, ys), yards = addYards2(sb, rng, P3);
    const mainY = ys[ys.length - 1];
    keepLargest2(sb, [plaza.x + 1, plaza.y + 1]);
    sb.anchor = centerOf2(sb, plaza);
    const [px, py] = sb.anchor;
    const gate = sb.findPortalSpot(sb.W - 1, mainY + 1, (x, y, s) => x === sb.W - 1 && s.front[0] === sb.W - 2);
    if (!gate) return null;
    sb.addPortal(gate, plan.gateDest, "\u0412\u043E\u0440\u043E\u0442\u0430 \u043D\u0430 \u0434\u043E\u0440\u043E\u0433\u0443", { id: "gate" });
    const lots = /* @__PURE__ */ new Set(), doors = [], placed = [];
    const sites = [];
    for (let y = 1; y < sb.H - 1; y++) for (let x = 1; x < sb.W - 1; x++) {
      const s = sb.doorSpot(x, y);
      if (!s) continue;
      const [fx, fy] = s.front, dx = x - fx, dy = y - fy;
      if (sb.reserved.has(key6(fx, fy))) continue;
      sites.push({ x, y, axis: s.axis, front: s.front, dx, dy });
    }
    const inPlaza = (x, y) => x >= plaza.x - 1 && y >= plaza.y - 1 && x < plaza.x + plaza.w + 1 && y < plaza.y + plaza.h + 1;
    const dest = (b) => b.type === "tavern" || b.type === "shop" || b.type === "alchemist" || b.type === "library" ? [px, py] : b.type === "cottage" || b.type === "guard" ? [sb.W - 3, mainY + 1] : b.type === "chapel" ? [px, py + 3] : [px + rng.int(-14, 14), py + rng.int(-8, 8)];
    for (const b of plan.buildings) {
      const want = dest(b), pool = rng.shuffle(sites).filter((s) => !doors.some((d) => Math.hypot(d.x - s.x, d.y - s.y) < 4.5) && !(b.type !== "tavern" && b.type !== "shop" && b.type !== "alchemist" && inPlaza(s.front[0], s.front[1]) && rng.chance(0.5)));
      const score = new Map(pool.map((s) => [s, Math.hypot(s.x - want[0], s.y - want[1]) + rng.int(-3, 3)]));
      pool.sort((a, c) => score.get(a) - score.get(c) || a.y - c.y || a.x - c.x);
      for (const s of pool) {
        const cells = lotFree2(sb, lots, s.x, s.y, s.dx, s.dy);
        if (!cells) continue;
        cells.forEach((c) => lots.add(c));
        const spot = { x: s.x, y: s.y, axis: s.axis, front: s.front };
        const p = sb.addPortal(spot, b.id, b.name, { id: "door-" + b.id, building: b.type });
        doors.push(p);
        placed.push(b.id);
        b.door = [s.x, s.y];
        break;
      }
    }
    for (const b of plan.buildings) if (b.door && ["tavern", "smithy", "alchemist", "shop", "library"].includes(b.type)) {
      const [x, y] = b.door, cand = (b.door && [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]]).filter(([a, c]) => sb.isWall(a, c) && !sb.props.some((p) => p.x === a && p.y === c) && DIRS2.some(([dx, dy]) => sb.isFloor(a + dx, c + dy) && !sb.reserved.has(key6(a + dx, c + dy))));
      if (cand.length) {
        const [a, c] = rng.pick(cand);
        sb.props.push({ id: "sign-" + b.id, x: a, y: c, type: "banner", kind: 24, solid: false, name: "\u0412\u044B\u0432\u0435\u0441\u043A\u0430: " + b.name, description: b.name });
      }
    }
    sb.paint(plaza.x, plaza.y, plaza.w, plaza.h, "flagstone");
    const pr = { x: plaza.x + 1, y: plaza.y + 1, w: plaza.w - 2, h: plaza.h - 2 };
    const center = sb.put(mk2(sb, rng.chance(0.5) ? "well" : "fountain"), px, py);
    if (center) center.cat === "well" && (center.description = "\u041A\u043E\u043B\u043E\u0434\u0435\u0446 \u0432 \u0446\u0435\u043D\u0442\u0440\u0435 \u043F\u043B\u043E\u0449\u0430\u0434\u0438. \u0412\u043E\u0434\u0430 \u0445\u043E\u043B\u043E\u0434\u043D\u0430\u044F \u0438 \u0447\u0438\u0441\u0442\u0430\u044F.");
    atWall2(sb, plaza, "stall", plan.size === "small" ? 2 : 4);
    atWall2(sb, plaza, "bench", 2);
    anywhere2(sb, pr, "planter", 2);
    atWall2(sb, plaza, "signpost", 1);
    atWall2(sb, plaza, "barrel", 2).forEach((p) => stock2(sb, p, { depth: 0 }, "storage"));
    atWall2(sb, plaza, "crate", 2).forEach((p) => stock2(sb, p, { depth: 0 }, "storage"));
    for (const y of yards) {
      sb.paint(y.x, y.y, y.w, y.h, y.kind === "farm" ? "dirt" : "grass");
      if (y.kind === "park") {
        anywhere2(sb, y, "tree", rng.int(3, 5));
        anywhere2(sb, y, "bush", 2);
        atWall2(sb, y, "bench", 1);
      }
      if (y.kind === "graveyard") {
        anywhere2(sb, y, "gravestone", rng.int(4, 7));
        anywhere2(sb, y, "tree", 1);
        atWall2(sb, y, "bones", 1);
      }
      if (y.kind === "farm") {
        anywhere2(sb, y, "haystack", 2);
        anywhere2(sb, y, "cart", 1);
        atWall2(sb, y, "barrel", 2).forEach((p) => stock2(sb, p, { depth: 0 }, "camp"));
        anywhere2(sb, y, "crate", 1).forEach((p) => stock2(sb, p, { depth: 0 }, "camp"));
      }
    }
    const all = sb.floorCells();
    const edge = rng.shuffle(all.filter(([x, y]) => !inPlaza(x, y)));
    let cnt = 0;
    for (const [x, y] of edge) {
      if (cnt >= Math.floor(all.length / 55)) break;
      if (!DIRS2.some(([dx, dy]) => !sb.isFloor(x + dx, y + dy))) continue;
      const k = rng.pick(["crate", "barrel", "barrel", "cart", "tree", "bush", "signpost", "wheel", "bucket", "sackpile", "haybale", "cratestack", "barrelstack", "lamppost", "puddle", "straw", "rubble", "basket", "pitchfork"]);
      const p = sb.put(mk2(sb, k), x, y);
      if (p) {
        if (p.container || k === "crate" || k === "barrel") stock2(sb, p, { depth: 0, trapChance: 0.05 }, "storage", { trap: rng.chance(0.07) });
        cnt++;
      }
    }
    const lampCells = rng.shuffle(all.filter(([x, y]) => Math.hypot(x - px, y - py) > 0));
    const lamps = [];
    const maxL = plan.size === "small" ? 10 : plan.size === "medium" ? 16 : 22;
    for (const [x, y] of lampCells) {
      if (lamps.length >= maxL) break;
      if (lamps.every(([a, b]) => Math.hypot(a - x, b - y) > 7.5)) lamps.push([x, y]);
    }
    lamps.forEach(([x, y]) => sb.light(x + 0.5, y + 0.5, { radius: 3.4, power: 0.5, intensity: 10, distance: 9 }));
    sb.light(px + 0.5, py + 0.5, { radius: 4, power: 0.55, intensity: 12, distance: 10 });
    const classes = ["fighter", "rogue", "wizard", "cleric"];
    for (let i = 0; i < P3.npcs; i++) {
      const g = rng.pick(["male", "female"]), who = person2(rng.fork("p" + i), g), kind = rng.pick(["street", "street", "street", "street"]);
      const lines = talkFor(rng.fork("t" + i), "street", who, plan.facts || []), n = makeNpc2(sb, who, "house", lines, { classId: i < 2 ? "fighter" : classes[i % 4], role: i < 2 ? roleFor("guard", g) : roleFor("street", g, rng) });
      if (i < 2) n.npc.hands = ["sword", "empty"];
      const cs = i < 2 ? [[sb.W - 3, mainY], [sb.W - 3, mainY + 2]] : rng.shuffle(all.filter(([x, y]) => !sb.reserved.has(key6(x, y))));
      for (const [x, y] of cs) {
        if (sb.put({ ...n, id: "npc" + i }, x, y)) break;
      }
    }
    const scene = sb.finish([px, py + (plaza.h > 4 ? 1 : 0)]);
    scene.gen.placed = placed;
    scene.gen.plaza = plaza;
    return scene;
  }

  // src/worldgen/buildings.js
  var SIZES6 = { keep: [16, 20, 11, 14], lordhall: [14, 18, 9, 11], house: [7, 10, 6, 8], cottage: [6, 7, 5, 6], tavern: [13, 16, 9, 11], smithy: [9, 11, 7, 8], alchemist: [8, 10, 6, 7], shop: [8, 10, 6, 8], chapel: [9, 12, 8, 10], guard: [10, 12, 7, 9], warehouse: [11, 14, 8, 10], library: [9, 12, 7, 8] };
  var ROLES2 = { keep: ["greathall", "guardroom", "armory", "kitchen", "storage", "library"], lordhall: ["lord", "bedroom", "treasure", "library", "bedroom"], house: ["living", "bedroom", "kitchen"], cottage: ["living", "bedroom"], tavern: ["hall", "kitchen", "storage"], smithy: ["smithy", "storage"], alchemist: ["alchemy", "living"], shop: ["shop", "storage"], chapel: ["chapel", "storage"], guard: ["guard", "cells", "armory"], warehouse: ["warehouse", "storage"], library: ["library", "living"] };
  var WALL_BY_TYPE = { house: "timber", cottage: "timber", tavern: "timber", smithy: "stone", alchemist: "plaster", shop: "plaster", chapel: "stone", guard: "stone", warehouse: "timber", library: "plaster", keep: "castle", lordhall: "castle" };
  var sizeOf2 = (type) => SIZES6[type] || SIZES6.house;
  function partition2(rng, rect, n, minW = 3, minH = 3) {
    const leaves = [{ ...rect }], splits = [];
    let guard = 0;
    while (leaves.length < n && guard++ < 80) {
      leaves.sort((a, b) => b.w * b.h - a.w * a.h);
      const L3 = leaves.find((l) => l.w >= minW * 2 + 1 || l.h >= minH * 2 + 1);
      if (!L3) break;
      const canV = L3.w >= minW * 2 + 1, canH = L3.h >= minH * 2 + 1, vertical = canV && (!canH || (L3.w / L3.h > 1 ? rng.chance(0.8) : rng.chance(0.25)));
      if (vertical) {
        const c = rng.int(minW, L3.w - minW - 1);
        leaves.splice(leaves.indexOf(L3), 1, { x: L3.x, y: L3.y, w: c, h: L3.h }, { x: L3.x + c + 1, y: L3.y, w: L3.w - c - 1, h: L3.h });
        splits.push({ vertical: true, g: L3.x + c, a: L3.y, b: L3.y + L3.h - 1 });
      } else {
        const c = rng.int(minH, L3.h - minH - 1);
        leaves.splice(leaves.indexOf(L3), 1, { x: L3.x, y: L3.y, w: L3.w, h: c }, { x: L3.x, y: L3.y + c + 1, w: L3.w, h: L3.h - c - 1 });
        splits.push({ vertical: false, g: L3.y + c, a: L3.x, b: L3.x + L3.w - 1 });
      }
    }
    return { leaves, splits };
  }
  function cutDoors2(sb, splits, doorOpts = () => ({})) {
    const doors = [];
    for (const s of splits) {
      const cand = [];
      for (let t = s.a; t <= s.b; t++) {
        const [x2, y2] = s.vertical ? [s.g, t] : [t, s.g], f1 = s.vertical ? sb.isFloor(x2 - 1, y2) : sb.isFloor(x2, y2 - 1), f2 = s.vertical ? sb.isFloor(x2 + 1, y2) : sb.isFloor(x2, y2 + 1);
        const n1 = s.vertical ? sb.isFloor(x2, y2 - 1) : sb.isFloor(x2 - 1, y2), n2 = s.vertical ? sb.isFloor(x2, y2 + 1) : sb.isFloor(x2 + 1, y2);
        if (f1 && f2 && !n1 && !n2) cand.push([x2, y2]);
      }
      if (!cand.length) return null;
      const [x, y] = sb.rng.pick(cand);
      sb.setFloor(x, y);
      doors.push({ x, y, axis: s.vertical ? "horizontal" : void 0 });
    }
    return doors;
  }
  var oneSide2 = (sb, x, y) => !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y));
  var inRect2 = (r, [x, y]) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h;
  function lightRooms2(sb, rooms) {
    for (const r of rooms) {
      const a = r.w * r.h, n = a >= 36 ? 3 : a >= 20 ? 2 : 1;
      for (let i = 0; i < n; i++) sb.light(r.x + (i + 1) * r.w / (n + 1), r.y + (i % 2 ? 0.35 : 0.65) * r.h, { radius: 3.3, power: 0.55 });
    }
  }
  function genBuilding2(spec, plan) {
    const rngBase = new Rng2(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 24; attempt++) {
      const rng = rngBase.fork("try" + attempt), [w0, w1, h0, h1] = spec.dims || sizeOf2(spec.type), w = rng.int(w0, w1), h = rng.int(h0, h1), W = w + 2, H = h + 2;
      const sb = new SceneBuilder2(spec.id, spec.name, W, H, rng, { type: spec.type, building: spec.id, seed: plan.seed, base: "planks", wall: WALL_BY_TYPE[spec.type] || rng.pick(["timber", "plaster"]) });
      const roles = spec.roles || ROLES2[spec.type] || ["living"], { leaves, splits } = partition2(rng, { x: 1, y: 1, w, h }, roles.length);
      for (const l of leaves) sb.rect(l.x, l.y, l.w, l.h);
      const doors = cutDoors2(sb, splits);
      if (!doors) continue;
      const south = leaves.filter((l) => l.y + l.h === h + 1).sort((a, b) => b.w * b.h - a.w * a.h), main = south[0] || leaves[0];
      const rooms = /* @__PURE__ */ new Map([[main, roles[0]]]);
      const rest = leaves.filter((l) => l !== main).sort((a, b) => b.w * b.h - a.w * a.h);
      rest.forEach((l, i) => rooms.set(l, roles[i + 1] || "storage"));
      const xs = [];
      for (let x = main.x + (main.w > 2 ? 1 : 0); x < main.x + main.w - (main.w > 2 ? 1 : 0); x++) xs.push(x);
      let entry = null;
      for (const x of rng.shuffle(xs)) {
        const s = sb.doorSpot(x, H - 1);
        if (s) {
          entry = { x, y: H - 1, ...s };
          break;
        }
      }
      if (!entry) continue;
      sb.anchor = entry.front;
      sb.addPortal(entry, spec.parent, spec.exitLabel || "\u0412\u044B\u0445\u043E\u0434 \u043D\u0430 \u0443\u043B\u0438\u0446\u0443", { id: "exit" });
      for (const d of doors) {
        const dr = sb.addDoor(d.x, d.y, d.axis, "\u0414\u0432\u0435\u0440\u044C");
        dr.lockable = true;
      }
      const stairs = (dest, label, room, id) => {
        const spot = sb.findPortalSpot(room.x + room.w / 2, room.y + room.h / 2, (x, y, s) => inRect2(room, s.front) && y !== H - 1 && oneSide2(sb, x, y));
        if (!spot) return false;
        sb.addPortal(spot, dest, label, { id });
        return true;
      };
      const roomOf = (role) => [...rooms].find(([, r]) => r === role)?.[0];
      if (spec.cellar && !stairs(spec.cellar, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432 \u043F\u043E\u0434\u0432\u0430\u043B", roomOf("kitchen") || roomOf("storage") || roomOf("living") || main, "stairs-down")) continue;
      if (spec.up && !stairs(spec.up, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445", main, "stairs-up")) continue;
      if (spec.lockRoom) {
        const dd = sb.props.filter((p) => p.type === "door" && p.lockable);
        const d = dd[dd.length - 1];
        if (d) d.lock = { pickDc: 12 + (plan.depthBonus || 0), forceDc: 14, key: spec.lockKey || null, gen: true }, d.name = "\u0417\u0430\u043F\u0435\u0440\u0442\u0430\u044F \u0434\u0432\u0435\u0440\u044C";
      }
      const ctx = { depth: spec.depth || 0, trapChance: spec.trapChance ?? 0.08, vaultKey: spec.vaultKey };
      for (const [l, role] of rooms) furnish2(sb, role, l, ctx);
      lightRooms2(sb, rooms.keys());
      const lines = talkFor(rng.fork("talk"), spec.type, spec.owner, spec.facts || [], spec.topic);
      const cells = roomCells2(sb, main).filter(([x, y]) => Math.abs(x - entry.x) + Math.abs(y - entry.y) > 2);
      if (spec.owner) {
        const npcSpec = makeNpc2(sb, spec.owner, spec.type, lines);
        for (const [x, y] of rng.shuffle(cells)) {
          if (sb.put({ ...npcSpec, id: "owner" }, x, y)) break;
        }
      }
      for (let i = 0; i < (spec.extraNpcs || 0) && spec.guests?.[i]; i++) {
        const p = spec.guests[i], n = makeNpc2(sb, p, "house", talkFor(rng.fork("g" + i), "guest", p, spec.facts || []), { role: roleFor("guest", p.gender) });
        for (const [x, y] of rng.shuffle(cells)) if (sb.put({ ...n, id: "guest" + i }, x, y)) break;
      }
      for (const key10 of spec.keysHere || []) hideKey2(sb, key10);
      addWindows2(sb, rng, Math.max(1, Math.floor((w + h) / 6)));
      return sb.finish([entry.front[0], entry.front[1]]);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0437\u0434\u0430\u043D\u0438\u0435 " + spec.id);
  }
  function hideKey2(sb, key10) {
    const cs = sb.props.filter((p) => p.container && p.loot && !p.lock);
    const c = sb.rng.pick(cs.length ? cs : [null]);
    if (c) {
      c.loot.gear.push(key10);
      return true;
    }
    for (const [x, y] of sb.rng.shuffle(sb.floorCells())) {
      const p = sb.put({ type: "crate", kind: 24, name: "\u042F\u0449\u0438\u043A", cat: "crate", description: "\u042F\u0449\u0438\u043A \u0441 \u043E\u0442\u043C\u0435\u0442\u043A\u0430\u043C\u0438 \u043C\u0435\u043B\u043E\u043C.", gen: true, container: true, loot: { gold: 0, potions: 0, torches: 0, gear: [key10] } }, x, y);
      if (p) return true;
    }
    return false;
  }
  function addWindows2(sb, rng, n) {
    const used = new Set(sb.props.map((p) => p.x + "," + p.y));
    let placed = 0;
    const cand = [];
    for (let y = 0; y < sb.H; y++) for (let x = 0; x < sb.W; x++) if (sb.isWall(x, y) && !used.has(x + "," + y) && (x === 0 || y === 0 || x === sb.W - 1 || y === sb.H - 1) && DIRS2.some(([dx, dy]) => sb.isFloor(x + dx, y + dy) && !sb.occ.has(x + dx + "," + (y + dy)))) cand.push([x, y]);
    for (const [x, y] of rng.shuffle(cand)) {
      if (placed >= n) break;
      if (sb.props.some((p) => p.solid === false && Math.abs(p.x - x) + Math.abs(p.y - y) < 3)) continue;
      const fr = DIRS2.find(([dx, dy]) => sb.isFloor(x + dx, y + dy));
      sb.props.push(rng.chance(0.55) && fr ? { id: sb.nid("window"), x, y, kind: 22, name: "\u041E\u043A\u043D\u043E \u0441\u043E \u0441\u0442\u0430\u0432\u043D\u044F\u043C\u0438", type: "decor", solid: false, model: "shutter", rot: dirRot2(fr[0], fr[1]), description: "\u0427\u0435\u0440\u0435\u0437 \u0441\u0442\u0435\u043A\u043B\u043E \u0435\u0434\u0432\u0430 \u043F\u0440\u043E\u0431\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0441\u0432\u0435\u0442.", gen: true } : { id: sb.nid("window"), x, y, kind: 22, name: "\u041E\u043A\u043D\u043E", type: "decor", solid: false });
      placed++;
    }
  }
  function genCellar2(spec, plan) {
    const rngBase = new Rng2(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 24; attempt++) {
      const rng = rngBase.fork("try" + attempt), w = rng.int(8, 12), h = rng.int(6, 9), n = rng.int(1, 3), W = w + 2, H = h + 2;
      const sb = new SceneBuilder2(spec.id, spec.name, W, H, rng, { type: "cellar", building: spec.parent, seed: plan.seed, base: "stone", wall: "rough", cellarFloor: rng.pick(["stone", "dirt", "stone"]) });
      const { leaves, splits } = partition2(rng, { x: 1, y: 1, w, h }, n);
      for (const l of leaves) sb.rect(l.x, l.y, l.w, l.h);
      const doors = cutDoors2(sb, splits);
      if (!doors) continue;
      const main = leaves.slice().sort((a, b) => b.w * b.h - a.w * a.h)[0];
      const spot = sb.findPortalSpot(main.x + main.w / 2, main.y, (x, y, s) => inRect2(main, s.front) && oneSide2(sb, x, y));
      if (!spot) continue;
      sb.anchor = spot.front;
      sb.addPortal(spot, spec.parent, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445", { id: "stairs-up" });
      for (const d of doors) sb.addDoor(d.x, d.y, d.axis, "\u0414\u0432\u0435\u0440\u044C");
      const ctx = { depth: 1, trapChance: 0.18, vaultKey: spec.vaultKey };
      leaves.forEach((l, i) => furnish2(sb, i === 0 && spec.stash ? "storage" : "cellar", l, ctx));
      if (spec.stash) {
        const room = leaves[leaves.length - 1];
        let c = null;
        for (const [x, y] of rng.shuffle(roomCells2(sb, room))) {
          c = sb.put({ type: "chest", kind: 17, name: "\u0422\u0430\u0439\u043D\u0438\u043A", cat: "chest", description: "\u0421\u0443\u043D\u0434\u0443\u043A \u0437\u0430\u0434\u0432\u0438\u043D\u0443\u0442 \u0432 \u0441\u0430\u043C\u044B\u0439 \u0442\u0451\u043C\u043D\u044B\u0439 \u0443\u0433\u043E\u043B.", rot: 0 }, x, y);
          if (c) break;
        }
        if (c) {
          c.gen = true;
          c.container = true;
          c.loot = { gold: rng.int(30, 70), potions: 1, torches: 0, gear: [] };
          c.lock = { pickDc: 14, forceDc: 16, key: spec.stash.key };
          c.trap = { kind: "needle", name: "\u042F\u0434\u043E\u0432\u0438\u0442\u0430\u044F \u0438\u0433\u043B\u0430", save: "con", dc: 13, detectDc: 13, disarmDc: 13, dice: 1, sides: 4, poison: true, alarm: false, text: "\u0418\u0437 \u0437\u0430\u043C\u043A\u0430 \u0432\u044B\u0441\u043A\u0430\u043A\u0438\u0432\u0430\u0435\u0442 \u0438\u0433\u043B\u0430 \u0441 \u044F\u0434\u043E\u043C.", hint: "\u0420\u044F\u0434\u043E\u043C \u0441 \u0437\u0430\u043C\u043E\u0447\u043D\u043E\u0439 \u0441\u043A\u0432\u0430\u0436\u0438\u043D\u043E\u0439 \u0432\u0438\u0434\u0435\u043D \u043A\u0440\u043E\u0448\u0435\u0447\u043D\u044B\u0439 \u043F\u0440\u043E\u043A\u043E\u043B." };
        }
      }
      lightRooms2(sb, leaves);
      for (const key10 of spec.keysHere || []) hideKey2(sb, key10);
      return sb.finish(spot.front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u043E\u0434\u0432\u0430\u043B " + spec.id);
  }
  function genUpper2(spec, plan) {
    const rngBase = new Rng2(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 24; attempt++) {
      const rng = rngBase.fork("try" + attempt), cols = rng.int(2, 4), cw = rng.int(4, 5), w = cols * (cw + 1) - 1, W = w + 2, H = 1 + 4 + 1 + 2 + 1 + 4 + 1;
      const sb = new SceneBuilder2(spec.id, spec.name, W, H, rng, { type: "upper", building: spec.parent, seed: plan.seed, base: "planks", wall: "timber" });
      sb.rect(1, 6, w, 2);
      const rooms = [];
      for (let c = 0; c < cols; c++) {
        const x = 1 + c * (cw + 1);
        for (const [y, h] of [[1, 4], [9, 4]]) {
          if (!rng.chance(c === 0 || y === 1 ? 0.95 : 0.8)) continue;
          sb.rect(x, y, cw, h);
          rooms.push({ x, y, w: cw, h });
        }
      }
      for (const r of rooms) {
        const dx = rng.int(r.x + 1, r.x + r.w - 2), dy = r.y < 6 ? 5 : 8;
        if (sb.isFloor(dx, dy - (r.y < 6 ? 0 : 0))) continue;
        sb.setFloor(dx, dy);
        if (!sb.isFloor(dx, dy + (r.y < 6 ? 1 : -1))) {
          sb.setFloor(dx, dy, 0);
          continue;
        }
        r.door = [dx, dy];
      }
      const valid = rooms.filter((r) => r.door);
      if (!valid.length) continue;
      const spot = sb.findPortalSpot(1, 6.5, (x, y, s) => x === 0 && s.front[0] === 1 && s.front[1] >= 6 && s.front[1] <= 7);
      if (!spot) continue;
      sb.anchor = spot.front;
      sb.addPortal(spot, spec.parent, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u043D\u0438\u0437", { id: "stairs-down" });
      for (const r of valid) sb.addDoor(r.door[0], r.door[1], void 0, "\u0414\u0432\u0435\u0440\u044C \u043A\u043E\u043C\u043D\u0430\u0442\u044B", { lockable: true });
      for (const r of rooms.filter((r2) => !r2.door)) for (let j = r.y; j < r.y + r.h; j++) for (let i = r.x; i < r.x + r.w; i++) sb.setFloor(i, j, 0);
      const ctx = { depth: 0, trapChance: 0.1 };
      for (const r of valid) {
        furnish2(sb, "bedroom", r, ctx);
      }
      sb.rect(0, 0, 0, 0);
      const cor = { x: 1, y: 6, w, h: 2 };
      sb.put({ type: "planter", kind: 24, name: "\u041A\u0430\u0434\u043A\u0430 \u0441 \u0440\u0430\u0441\u0442\u0435\u043D\u0438\u0435\u043C", description: "\u0420\u0430\u0441\u0442\u0435\u043D\u0438\u0435 \u0434\u0430\u0432\u043D\u043E \u043F\u0440\u043E\u0441\u0438\u0442 \u0432\u043E\u0434\u044B.", cat: "planter" }, w, 6) || null;
      void cor;
      lightRooms2(sb, [...valid, { x: 1, y: 6, w, h: 2 }]);
      const doors = sb.props.filter((p) => p.type === "door");
      if (doors.length > 1 && spec.lockRoom) {
        const d = doors[rng.int(0, doors.length - 1)];
        d.lock = { pickDc: 12, forceDc: 14, key: null, gen: true };
        d.name = "\u0417\u0430\u043F\u0435\u0440\u0442\u0430\u044F \u0434\u0432\u0435\u0440\u044C";
      }
      for (const key10 of spec.keysHere || []) hideKey2(sb, key10);
      return sb.finish(spot.front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u044D\u0442\u0430\u0436 " + spec.id);
  }

  // src/worldgen/dungeon.js
  var SIZES7 = { small: [38, 26, 5, 7], medium: [48, 32, 8, 11], large: [58, 38, 11, 15] };
  var key7 = (x, y) => x + "," + y;
  var overlap2 = (a, b, m = 2) => a.x - m < b.x + b.w && a.x + a.w + m > b.x && a.y - m < b.y + b.h && a.y + a.h + m > b.y;
  var cx2 = (r) => Math.floor(r.x + r.w / 2);
  var cy2 = (r) => Math.floor(r.y + r.h / 2);
  function corridor2(sb, a, b, rng) {
    let x = cx2(a), y = cy2(a);
    const tx = cx2(b), ty = cy2(b), horizFirst = rng.chance(0.5), cells = [];
    const stepX = () => {
      while (x !== tx) {
        x += Math.sign(tx - x);
        cells.push([x, y]);
      }
    }, stepY = () => {
      while (y !== ty) {
        y += Math.sign(ty - y);
        cells.push([x, y]);
      }
    };
    horizFirst ? (stepX(), stepY()) : (stepY(), stepX());
    cells.forEach(([i, j]) => sb.setFloor(i, j));
    return cells;
  }
  var ROLE_POOL2 = [["crypt", 3], ["guardroom", 3], ["shrine", 1.5], ["dungeonlib", 1.5], ["camp", 1], ["storage", 2], ["cells", 1.5]];
  function genDungeon2(spec, plan) {
    const [W0, H0, n0, n1] = SIZES7[plan.size], rngBase = new Rng2(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 30; attempt++) {
      const rng = rngBase.fork("try" + attempt), W = W0 + rng.int(-4, 8), H = H0 + rng.int(-3, 6), sb = new SceneBuilder2(spec.id, spec.name, W, H, rng, { type: "dungeon", level: spec.level, seed: plan.seed, base: "stone", wall: spec.level > 1 ? "rough" : "stone" }), rooms = [];
      const target = rng.int(n0, n1) + (spec.level > 1 ? 1 : 0);
      for (let t = 0; t < 400 && rooms.length < target; t++) {
        const w = rng.int(4, 9), h = rng.int(4, 7), r = { x: rng.int(3, W - w - 3), y: rng.int(3, H - h - 3), w, h };
        if (rooms.every((o) => !overlap2(r, o, 2))) rooms.push(r);
      }
      if (rooms.length < 3) continue;
      rooms.sort((a, b) => a.x - b.x);
      for (const r of rooms) sb.rect(r.x, r.y, r.w, r.h);
      const links = [];
      for (let i = 1; i < rooms.length; i++) {
        const near = rooms.slice(0, i).sort((a, b) => Math.hypot(cx2(a) - cx2(rooms[i]), cy2(a) - cy2(rooms[i])) - Math.hypot(cx2(b) - cx2(rooms[i]), cy2(b) - cy2(rooms[i])))[0];
        links.push([near, rooms[i], corridor2(sb, near, rooms[i], rng)]);
      }
      for (let k = 0; k < Math.floor(rooms.length / 4); k++) {
        const a = rng.pick(rooms), b = rng.pick(rooms);
        if (a !== b) links.push([a, b, corridor2(sb, a, b, rng)]);
      }
      const entryRoom = rooms[0], exitRoom = rooms.slice().sort((a, b) => Math.hypot(cx2(b) - cx2(entryRoom), cy2(b) - cy2(entryRoom)) - Math.hypot(cx2(a) - cx2(entryRoom), cy2(a) - cy2(entryRoom)))[0];
      const inR = (r, [x, y]) => x >= r.x && y >= r.y && x < r.x + r.w && y < r.y + r.h, oneSide3 = (x, y) => !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y));
      const up = sb.findPortalSpot(cx2(entryRoom), entryRoom.y, (x, y, s) => inR(entryRoom, s.front) && oneSide3(x, y));
      if (!up) continue;
      sb.anchor = up.front;
      sb.addPortal(up, spec.up, spec.level === 1 ? "\u0412\u044B\u0445\u043E\u0434 \u043D\u0430\u0440\u0443\u0436\u0443" : "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u043D\u0430\u0432\u0435\u0440\u0445", { id: "up" });
      let down = null;
      if (spec.down) {
        down = sb.findPortalSpot(cx2(exitRoom), exitRoom.y + exitRoom.h, (x, y, s) => inR(exitRoom, s.front) && oneSide3(x, y) && Math.hypot(x - up.x, y - up.y) > 5);
        if (!down) continue;
        sb.addPortal(down, spec.down, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u043D\u0438\u0437", { id: "down" });
      }
      for (const r of rooms) {
        const ring = [];
        for (let x = r.x; x < r.x + r.w; x++) {
          ring.push([x, r.y - 1, "v"]);
          ring.push([x, r.y + r.h, "v"]);
        }
        for (let y = r.y; y < r.y + r.h; y++) {
          ring.push([r.x - 1, y, "h"]);
          ring.push([r.x + r.w, y, "h"]);
        }
        for (const [x, y, o] of ring) {
          if (!sb.isFloor(x, y) || sb.props.some((p) => p.x === x && p.y === y) || !rng.chance(0.7)) continue;
          const sideA = o === "v" ? [x - 1, y] : [x, y - 1], sideB = o === "v" ? [x + 1, y] : [x, y + 1];
          if (sb.isFloor(...sideA) || sb.isFloor(...sideB)) continue;
          if (sb.props.some((p) => Math.abs(p.x - x) + Math.abs(p.y - y) < 2 && p.type === "door")) continue;
          const d = sb.addDoor(x, y, o === "v" ? void 0 : "horizontal", "\u0414\u0432\u0435\u0440\u044C");
          d.lockable = true;
          if (rng.chance(0.18 + spec.level * 0.04)) {
            d.lock = { pickDc: 12 + spec.level, forceDc: 14 + spec.level, key: null, gen: true };
            d.name = "\u0417\u0430\u043F\u0435\u0440\u0442\u0430\u044F \u0434\u0432\u0435\u0440\u044C";
          }
        }
      }
      const mid = rooms.filter((r) => r !== entryRoom && r !== exitRoom), roles = /* @__PURE__ */ new Map();
      const ctx = { depth: spec.level + (plan.depthBonus || 0), trapChance: 0.15 + spec.level * 0.05, vaultKey: spec.vaultKey };
      if (spec.vault) roles.set(exitRoom, "treasure");
      else if (spec.down) roles.set(exitRoom, "shrine");
      else roles.set(exitRoom, "crypt");
      roles.set(entryRoom, spec.level === 1 ? "camp" : "guardroom");
      for (const r of mid) roles.set(r, rng.weighted(ROLE_POOL2));
      for (const [r, role] of roles) {
        try {
          furnish2(sb, role, r, ctx);
        } catch {
        }
      }
      for (const r of rooms) sb.light(cx2(r) + 0.5, cy2(r) + 0.5, { radius: 3.2, power: 0.5, intensity: 8, distance: 7 });
      sb.traps = [];
      const corrCells = rng.shuffle(links.flatMap((l) => l[2])).filter(([x, y]) => !sb.occ.has(key7(x, y)) && !sb.props.some((p) => p.x === x && p.y === y) && !sb.reserved.has(key7(x, y)) && !rooms.some((r) => inR(r, [x, y])) && DIRS2.filter(([dx, dy]) => sb.isFloor(x + dx, y + dy)).length === 2);
      const nTraps = Math.min(corrCells.length, rng.int(1, 2 + spec.level + (plan.size === "large" ? 2 : 0)));
      for (const [x, y] of corrCells.slice(0, nTraps)) {
        const tr = rollTrap2(rng, ctx.depth, ["dart", "pit", "fire", "alarm", "gas"]);
        sb.traps.push({ id: "plate" + sb.traps.length + "-" + x + "-" + y, x, y, trap: tr });
      }
      if (rng.chance(0.7)) {
        const g = rng.pick(["male", "female"]), who = person2(rng.fork("hermit"), g), n = makeNpc2(sb, who, "house", talkFor(rng.fork("d"), "dungeon", who, plan.facts || []), { role: roleFor("dungeon", g, rng) });
        const rr = rng.pick(mid.length ? mid : rooms);
        for (const [x, y] of rng.shuffle(roomCells2(sb, rr))) if (sb.put({ ...n, id: "dweller" }, x, y)) break;
      }
      {
        const trapTiles = new Set(sb.traps.map((t) => key7(t.x, t.y))), cc = rng.shuffle(links.flatMap((l) => l[2])).filter(([x, y]) => !trapTiles.has(key7(x, y)) && !rooms.some((r) => inR(r, [x, y])));
        for (const [x, y] of cc.slice(0, Math.floor(cc.length / 9))) sb.put((rng.chance(0.5) ? mk2 : mk2)(sb, rng.pick(["rubble", "puddle", "bones", "straw", "rubble"])), x, y);
      }
      for (const keyName3 of spec.keysHere || []) hideKey2(sb, keyName3);
      const scene = sb.finish(up.front);
      scene.traps = sb.traps;
      return scene;
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u043E\u0434\u0437\u0435\u043C\u0435\u043B\u044C\u0435 " + spec.id);
  }

  // src/worldgen/outskirts.js
  var SIZES8 = { small: [44, 30], medium: [56, 38], large: [70, 46] };
  var key8 = (x, y) => x + "," + y;
  function walk2(sb, rng, x0, y0, x1, y1, th = 3) {
    let x = x0, y = y0;
    const stamp = (a, b) => {
      for (let j = 0; j < th; j++) for (let i = 0; i < th; i++) {
        const px = a + i - 1, py = b + j - 1;
        if (px >= 2 && py >= 2 && px < sb.W - 2 && py < sb.H - 2) {
          sb.setFloor(px, py);
          sb.paint(px, py, 1, 1, "dirt");
        }
      }
    };
    stamp(x, y);
    for (let guard = 0; guard < 2e3 && (x !== x1 || y !== y1); guard++) {
      const dx = x1 - x, dy = y1 - y, horiz = Math.abs(dx) > Math.abs(dy) ? rng.chance(0.8) : rng.chance(0.25);
      if (horiz && dx) x += Math.sign(dx);
      else if (dy) y += Math.sign(dy);
      else x += Math.sign(dx);
      if (rng.chance(0.18)) y += rng.pick([-1, 1]);
      y = Math.max(3, Math.min(sb.H - 4, y));
      stamp(x, y);
    }
  }
  function genOutskirts2(spec, plan) {
    const [W0, H0] = SIZES8[plan.size], rngBase = new Rng2(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 20; attempt++) {
      const rng = rngBase.fork("try" + attempt), W = W0 + rng.int(-4, 8), H = H0 + rng.int(-3, 6), sb = new SceneBuilder2(spec.id, spec.name, W, H, rng, { type: "outskirts", seed: plan.seed, base: "grass", wall: "cave" });
      let g = Array.from({ length: H }, (_, y) => Array.from({ length: W }, (_2, x) => x > 2 && y > 2 && x < W - 3 && y < H - 3 && rng.chance(0.55) ? 1 : 0));
      for (let it = 0; it < 4; it++) g = g.map((row, y) => row.map((_, x) => {
        let n = 0;
        for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (g[y + j]?.[x + i]) n++;
        return x > 2 && y > 2 && x < W - 3 && y < H - 3 && n >= 5 ? 1 : 0;
      }));
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (g[y][x]) sb.setFloor(x, y);
      const pads = spec.links.map((l) => {
        const px = l.side === "west" ? 4 : l.side === "east" ? W - 5 : Math.floor(W * l.at);
        const py = l.side === "north" ? 4 : l.side === "south" ? H - 5 : Math.floor(H * l.at);
        return { ...l, px, py };
      });
      for (const p of pads) sb.rect(p.px - 1, p.py - 1, 3, 3);
      for (let i = 1; i < pads.length; i++) walk2(sb, rng, pads[0].px, pads[0].py, pads[i].px, pads[i].py, 3);
      const mid = [Math.floor(W / 2) + rng.int(-6, 6), Math.floor(H / 2) + rng.int(-5, 5)];
      walk2(sb, rng, pads[0].px, pads[0].py, mid[0], mid[1], 3);
      if (pads[1]) walk2(sb, rng, mid[0], mid[1], pads[1].px, pads[1].py, 3);
      const seen = /* @__PURE__ */ new Set(), comps = [];
      for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        if (!sb.isFloor(x, y) || seen.has(key8(x, y))) continue;
        const comp = [], st = [[x, y]];
        while (st.length) {
          const [a, b] = st.pop(), k = key8(a, b);
          if (seen.has(k) || !sb.isFloor(a, b)) continue;
          seen.add(k);
          comp.push([a, b]);
          for (const [dx, dy] of DIRS2) st.push([a + dx, b + dy]);
        }
        comps.push(comp);
      }
      comps.sort((a, b) => b.length - a.length);
      for (const c of comps.slice(1)) for (const [x, y] of c) sb.setFloor(x, y, 0);
      if (comps[0].length < W * H * 0.22) continue;
      let ok = true;
      const spots = [];
      for (const p of pads) {
        const spot = sb.findPortalSpot(p.side === "east" ? W - 1 : p.side === "west" ? 0 : p.px, p.side === "north" ? 0 : p.side === "south" ? H - 1 : p.py, (x, y, s) => Math.hypot(x - p.px, y - p.py) < 6 && !(sb.isFloor(x, y - 1) && sb.isFloor(x, y + 1)) && !(sb.isFloor(x - 1, y) && sb.isFloor(x + 1, y)));
        if (!spot) {
          ok = false;
          break;
        }
        sb.addPortal(spot, p.dest, p.label, { id: "to-" + p.dest.replace(/[^a-z0-9]/g, "-") });
        spots.push(spot);
      }
      if (!ok) continue;
      sb.anchor = spots[0].front;
      const cells = sb.floorCells();
      const open = cells.filter(([x, y]) => {
        for (let j = -2; j <= 2; j++) for (let i = -2; i <= 2; i++) if (!sb.isFloor(x + i, y + j)) return false;
        return true;
      });
      const far = (c, others) => others.every((o) => Math.hypot(o[0] - c[0], o[1] - c[1]) > 10);
      const pick = rng.shuffle(open).filter((c) => far(c, spots.map((s) => s.front)));
      const camp = pick[0], shrine = pick.find((c) => camp && Math.hypot(c[0] - camp[0], c[1] - camp[1]) > 10);
      const ctx = { depth: 0, trapChance: 0.1 };
      if (camp) {
        furnish2(sb, "camp", { x: camp[0] - 2, y: camp[1] - 2, w: 5, h: 5 }, ctx);
        sb.light(camp[0] + 0.5, camp[1] + 0.5, { radius: 3.6, power: 0.65, intensity: 11, distance: 9 });
        const g1 = rng.pick(["male", "female"]), who = person2(rng.fork("camper"), g1), n = makeNpc2(sb, who, "cottage", talkFor(rng.fork("c"), "outskirts", who, plan.facts || []), { role: roleFor("camp", g1, rng), classId: rng.pick(["rogue", "fighter", "cleric"]) });
        for (const [x, y] of sb.nearestFree(camp[0], camp[1] + 3, 12)) if (sb.put({ ...n, id: "camper" }, x, y)) break;
      }
      if (shrine) furnish2(sb, "shrine", { x: shrine[0] - 2, y: shrine[1] - 2, w: 5, h: 5 }, ctx);
      const maxTrees = Math.floor(cells.length / 14);
      let t = 0;
      for (const [x, y] of rng.shuffle(cells)) {
        if (t >= maxTrees) break;
        if (sb.put(mk2(sb, rng.chance(0.78) ? "tree" : "bush"), x, y)) t++;
      }
      for (let i = 0; i < Math.floor(cells.length / 90); i++) {
        const [x, y] = rng.pick(cells);
        const k = rng.pick(["bones", "crate", "barrel", "haystack"]);
        const p = sb.put(mk2(sb, k), x, y);
        if (p && (k === "crate" || k === "barrel")) stock2(sb, p, ctx, "camp", { trap: rng.chance(0.1) });
      }
      for (const s of spots) sb.light(s.front[0] + 0.5, s.front[1] + 0.5, { radius: 3.4, power: 0.55, intensity: 9, distance: 8 });
      return sb.finish(spots[0].front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043E\u043A\u0440\u0435\u0441\u0442\u043D\u043E\u0441\u0442\u0438");
  }

  // src/worldgen/fortress.js
  var SIZES9 = { small: [34, 24], medium: [40, 28], large: [48, 32] };
  function genYard2(spec, plan) {
    const [W0, H0] = SIZES9[plan.size], rngBase = new Rng2(plan.seed + "/" + spec.id);
    for (let attempt = 0; attempt < 10; attempt++) {
      const rng = rngBase.fork("try" + attempt), W = W0 + rng.int(-2, 6), H = H0 + rng.int(-1, 4), sb = new SceneBuilder2(spec.id, spec.name, W, H, rng, { type: "fortress", seed: plan.seed, base: "cobble", wall: "castle" });
      const yard = { x: 2, y: 7, w: W - 4, h: H - 9 }, towers = [{ x: 3, y: 2, w: 6, h: 4 }, { x: W - 9, y: 2, w: 6, h: 4 }];
      sb.rect(yard.x, yard.y, yard.w, yard.h);
      for (const t of towers) sb.rect(t.x, t.y, t.w, t.h);
      const blocks = [];
      for (let n = 0, tries = 0; n < rng.int(3, 5) && tries < 80; tries++) {
        const w = rng.int(6, 10), h = rng.int(3, 4), x = rng.int(yard.x + 4, yard.x + yard.w - w - 4), y = rng.int(yard.y + 3, yard.y + yard.h - h - 3);
        if (Math.abs(x + w / 2 - W / 2) < w / 2 + 3 && y < yard.y + 6) continue;
        if (blocks.every((b) => x + w + 3 <= b.x || b.x + b.w + 3 <= x || y + h + 3 <= b.y || b.y + b.h + 3 <= y)) {
          sb.rect(x, y, w, h, 0);
          blocks.push({ x, y, w, h });
          n++;
        }
      }
      const gx = Math.floor(W / 2), south = sb.findPortalSpot(gx, H - 1, (x, y, s) => y === H - 2 && s.front[1] === H - 3), keep = sb.findPortalSpot(gx, 6, (x, y, s) => y === 6 && s.front[1] === 7);
      if (!south || !keep) continue;
      sb.anchor = south.front;
      sb.addPortal(south, spec.parent, "\u0412\u043E\u0440\u043E\u0442\u0430 \u043D\u0430\u0440\u0443\u0436\u0443", { id: "gate" });
      sb.addPortal(keep, spec.keep, "\u0412\u0445\u043E\u0434 \u0432 \u0434\u043E\u043D\u0436\u043E\u043D", { id: "keep" });
      for (const t of towers) {
        const x = t.x + rng.int(1, t.w - 2);
        sb.setFloor(x, 6);
        sb.addDoor(x, 6, void 0, "\u0414\u0432\u0435\u0440\u044C \u0431\u0430\u0448\u043D\u0438");
      }
      const ctx = { depth: 1, trapChance: 0.12 };
      furnish2(sb, "courtyard", yard, ctx);
      furnish2(sb, "armory", towers[0], ctx);
      furnish2(sb, "guardroom", towers[1], ctx);
      for (const s of [[8, 9], [W - 9, 9], [gx - 6, 12], [gx + 6, 12], [gx, H - 6], [10, H - 5], [W - 10, H - 5]]) sb.light(s[0] + 0.5, s[1] + 0.5, { radius: 3.6, power: 0.6, intensity: 10, distance: 9 });
      for (const t of towers) sb.light(t.x + t.w / 2, t.y + t.h / 2, { radius: 3, power: 0.5 });
      for (let i = 0; i < 3; i++) {
        const who = person2(rng.fork("g" + i)), n = makeNpc2(sb, who, "guard", talkFor(rng.fork("l" + i), "fortress", who, plan.facts || []), { role: i === 0 ? "\u043A\u0430\u043F\u0438\u0442\u0430\u043D \u0441\u0442\u0440\u0430\u0436\u0438" : roleFor("guard", who.gender) });
        for (const [x, y] of rng.shuffle(roomCells2(sb, yard))) if (sb.put({ ...n, id: "guard" + i }, x, y)) break;
      }
      return sb.finish(south.front);
    }
    throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0434\u0432\u043E\u0440 \u043A\u0440\u0435\u043F\u043E\u0441\u0442\u0438");
  }

  // src/worldgen/world-v2.js
  var GEN_VERSION2 = 2;
  var SIZES10 = Object.keys(TOWN_SIZES2);
  var COUNTS2 = {
    small: { tavern: 1, chapel: 1, smithy: 1, shop: [1, 1], alchemist: [0, 1], guard: 1, warehouse: [0, 1], library: [0, 0], cottage: [1, 1], house: [2, 3] },
    medium: { tavern: 1, chapel: 1, smithy: 1, shop: [2, 2], alchemist: [1, 1], guard: 1, warehouse: [1, 2], library: [0, 1], cottage: [1, 2], house: [5, 7] },
    large: { tavern: 2, chapel: 1, smithy: 2, shop: [3, 4], alchemist: [1, 2], guard: 2, warehouse: [2, 3], library: [1, 1], cottage: [2, 3], house: [9, 12] }
  };
  var LOCKABLE = /* @__PURE__ */ new Set(["house", "tavern", "guard", "chapel", "shop", "smithy", "alchemist", "warehouse", "library"]);
  var CELLAR_P2 = { tavern: 1, warehouse: 0.7, alchemist: 0.5, chapel: 0.6, guard: 0.5, shop: 0.4, house: 0.35, smithy: 0.3, library: 0.3, cottage: 0.1 };
  var keyName2 = (rng, used) => {
    for (let i = 0; i < 20; i++) {
      const n2 = "\u041A\u043B\u044E\u0447: " + rng.pick(KEY_NAMES2);
      if (!used.has(n2)) {
        used.add(n2);
        return n2;
      }
    }
    const n = "\u041A\u043B\u044E\u0447: \u0411\u0435\u0437\u044B\u043C\u044F\u043D\u043D\u044B\u0439 " + used.size;
    used.add(n);
    return n;
  };
  function normalizeGen2(gen = {}) {
    return { v: GEN_VERSION2, seed: String(gen.seed ?? "0"), size: SIZES10.includes(gen.size) ? gen.size : "auto" };
  }
  function createWorld2(seed, size) {
    seed = String(seed);
    const rng = new Rng2(seed + "/plan");
    const sizeResolved = SIZES10.includes(size) ? size : rng.pick(["small", "medium", "medium", "large"]);
    const plan = { v: GEN_VERSION2, seed, size: sizeResolved, name: settlementName2(rng), gateDest: "out", buildings: [], scenes: {}, keys: [], facts: [], start: "town" };
    const C = COUNTS2[sizeResolved], list = [];
    for (const [type, n] of Object.entries(C)) {
      const count = Array.isArray(n) ? rng.int(n[0], n[1]) : n;
      for (let i = 0; i < count; i++) list.push(type);
    }
    const usedNames = /* @__PURE__ */ new Set();
    let idx = 0;
    for (const type of list) {
      const id = "b" + ++idx;
      let owner, name;
      for (let t = 0; t < 40; t++) {
        owner = person2(rng.fork("owner" + idx + "_" + t));
        name = buildingName2(rng.fork("name" + idx + "_" + t), type, owner);
        if (!usedNames.has(name)) break;
      }
      usedNames.add(name);
      const cellar = rng.chance(CELLAR_P2[type] ?? 0.2) ? id + ":c" : null, up = type === "tavern" ? id + ":u" : ["house", "shop", "alchemist"].includes(type) && sizeResolved !== "small" && rng.chance(0.25) ? id + ":u" : null;
      plan.buildings.push({ id, type, name, owner, cellar, up, lockRoom: rng.chance(0.3), extraNpcs: type === "tavern" ? rng.int(1, 3) : 0, guests: [person2(rng.fork("gn" + idx)), person2(rng.fork("gm" + idx)), person2(rng.fork("gk" + idx))] });
    }
    let town = null, tryIndex = 0;
    for (; tryIndex < 12; tryIndex++) {
      plan.buildings.forEach((b) => delete b.door);
      town = genTown2(plan, tryIndex);
      if (town && plan.buildings.some((b) => b.type === "tavern" && b.door) && plan.buildings.some((b) => b.type === "chapel" && b.door)) break;
    }
    if (!town || tryIndex >= 12) throw new Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0440\u0430\u0437\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0437\u0434\u0430\u043D\u0438\u044F \u0433\u043E\u0440\u043E\u0434\u0430");
    plan.townTry = tryIndex;
    plan.buildings = plan.buildings.filter((b) => b.door);
    const dungeonLevels = { small: 1, medium: 2, large: 3 }[sizeResolved], fortress = sizeResolved === "large" || sizeResolved === "medium" && rng.chance(0.6) || rng.chance(0.15);
    const dun = rng.pick(DUNGEONS), fort = rng.pick(FORTS), dungeonName = dun.nom, fortName = fort.nom;
    plan.dungeon = { name: dungeonName, levels: dungeonLevels, ref: dun };
    plan.fortress = fortress ? { name: fortName, ref: fort } : null;
    const usedKeys = /* @__PURE__ */ new Set(), homes = plan.buildings.filter((b) => b.type !== "chapel").map((b) => b.id), keysAt = /* @__PURE__ */ new Map();
    const putKey = (name, notId) => {
      const holder = rng.pick(homes.filter((h) => h !== notId).concat(homes.length > 1 ? [] : ["out"]));
      (keysAt.get(holder) || keysAt.set(holder, []).get(holder)).push(name);
      return holder;
    };
    const stashCellars = plan.buildings.filter((b) => b.cellar && b.type !== "tavern").slice(0, Math.max(1, Math.floor(plan.buildings.length / 8)));
    const stashKeys = new Map(stashCellars.map((b) => {
      const k = keyName2(rng, usedKeys);
      putKey(k, b.id);
      return [b.id, k];
    }));
    const vaultKey = keyName2(rng, usedKeys);
    plan.keys.push({ name: vaultKey, holder: putKey(vaultKey, null), opens: dungeonLevels ? "dng:" + dungeonLevels : "out" });
    const fortKey = fortress ? keyName2(rng, usedKeys) : null;
    if (fortKey) plan.keys.push({ name: fortKey, holder: putKey(fortKey, null), opens: "fort:up" });
    for (const [b, k] of stashKeys) plan.keys.push({ name: k, holder: [...keysAt].find(([, v]) => v.includes(k))?.[0], opens: b + ":c" });
    for (const b of plan.buildings) {
      const ref = buildingRef(b.type, b.name);
      if (b.type === "tavern") plan.facts.push({ kind: "tavern", ref });
      if (stashKeys.has(b.id)) plan.facts.push({ kind: "cache", ref });
      if (b.lockRoom && LOCKABLE.has(b.type)) plan.facts.push({ kind: "lock", ref });
    }
    plan.facts.push({ kind: "dungeon", ref: dun }, { kind: "trap", ref: dun });
    if (fortress) plan.facts.push({ kind: "fortress", ref: fort });
    const S = plan.scenes;
    S.town = { kind: "town" };
    plan.buildings.forEach((b, i) => {
      const facts = rng.fork("facts" + i).shuffle(plan.facts.filter((f) => f.ref?.title !== b.name)).slice(0, 3), keysHere = keysAt.get(b.id) || [];
      S[b.id] = { kind: "building", spec: { id: b.id, type: b.type, name: b.name, parent: "town", owner: b.owner, cellar: b.cellar, up: b.up, lockRoom: b.lockRoom, facts, extraNpcs: b.extraNpcs, guests: b.guests, keysHere, trapChance: 0.08 } };
      if (b.cellar) S[b.cellar] = { kind: "cellar", spec: { id: b.cellar, name: "\u041F\u043E\u0434\u0432\u0430\u043B: " + b.name, parent: b.id, stash: stashKeys.has(b.id) ? { key: stashKeys.get(b.id) } : null } };
      if (b.up) S[b.up] = { kind: "upper", spec: { id: b.up, name: "\u0412\u0435\u0440\u0445\u043D\u0438\u0439 \u044D\u0442\u0430\u0436: " + b.name, parent: b.id, lockRoom: b.type === "tavern" } };
    });
    const links = [{ dest: "town", side: "west", at: 0.5, label: "\u0414\u043E\u0440\u043E\u0433\u0430 \u0432 \u0433\u043E\u0440\u043E\u0434" }];
    if (dungeonLevels) links.push({ dest: "dng:1", side: "east", at: 0.3 + rng.next() * 0.2, label: dungeonName });
    if (fortress) links.push({ dest: "fort:yard", side: rng.pick(["north", "south"]), at: 0.45 + rng.next() * 0.2, label: fortName });
    S.out = { kind: "outskirts", spec: { id: "out", name: "\u0414\u043E\u0440\u043E\u0433\u0430 \u0443 \u0433\u043E\u0440\u043E\u0434\u0430 \xAB" + plan.name + "\xBB", links, keysHere: keysAt.get("out") || [] } };
    for (let l = 1; l <= dungeonLevels; l++) S["dng:" + l] = { kind: "dungeon", spec: { id: "dng:" + l, name: dungeonName + ", \u0443\u0440\u043E\u0432\u0435\u043D\u044C " + l, level: l, up: l === 1 ? "out" : "dng:" + (l - 1), down: l < dungeonLevels ? "dng:" + (l + 1) : null, vault: l === dungeonLevels, vaultKey: l === dungeonLevels ? vaultKey : void 0 } };
    if (fortress) {
      S["fort:yard"] = { kind: "yard", spec: { id: "fort:yard", name: fortName + ": \u0434\u0432\u043E\u0440", parent: "out", keep: "fort:keep" } };
      S["fort:keep"] = { kind: "building", spec: { id: "fort:keep", type: "keep", name: fortName + ": \u0434\u043E\u043D\u0436\u043E\u043D", parent: "fort:yard", owner: person2(rng.fork("castellan")), cellar: "fort:dng", up: "fort:up", depth: 1, facts: [], exitLabel: "\u0412\u044B\u0445\u043E\u0434 \u0432\u043E \u0434\u0432\u043E\u0440", trapChance: 0.12 } };
      S["fort:up"] = { kind: "building", spec: { id: "fort:up", type: "lordhall", name: fortName + ": \u043F\u043E\u043A\u043E\u0438", parent: "fort:keep", owner: person2(rng.fork("chamberlain")), depth: 2, facts: [], exitLabel: "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430 \u0432\u043D\u0438\u0437", vaultKey: fortKey, trapChance: 0.2 } };
      S["fort:dng"] = { kind: "dungeon", spec: { id: "fort:dng", name: fortName + ": \u0442\u0435\u043C\u043D\u0438\u0446\u0430", level: 2, up: "fort:keep", down: null, vault: false } };
    }
    Object.defineProperty(plan, "cache", { value: /* @__PURE__ */ new Map(), enumerable: false });
    return plan;
  }
  function generateScene2(plan, id) {
    if (plan.cache?.has(id)) return plan.cache.get(id);
    const def = plan.scenes[id];
    if (!def) throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0441\u0446\u0435\u043D\u0430 " + id);
    const spec = def.spec;
    let scene;
    switch (def.kind) {
      case "town":
        scene = genTown2(plan, plan.townTry);
        if (!scene) throw new Error("\u0413\u043E\u0440\u043E\u0434 \u043D\u0435 \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u043B\u0441\u044F");
        break;
      case "building":
        scene = genBuilding2(spec, plan);
        break;
      case "cellar":
        scene = genCellar2(spec, plan);
        break;
      case "upper":
        scene = genUpper2(spec, plan);
        break;
      case "outskirts":
        scene = genOutskirts2(spec, plan);
        break;
      case "dungeon":
        scene = genDungeon2(spec, plan);
        break;
      case "yard":
        scene = genYard2(spec, plan);
        break;
      default:
        throw new Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0442\u0438\u043F \u0441\u0446\u0435\u043D\u044B " + def.kind);
    }
    scene.gen.planVersion = plan.v;
    plan.cache?.set(id, scene);
    return scene;
  }
  var sceneIds2 = (plan) => Object.keys(plan.scenes);
  var isGeneratedId2 = (plan, id) => !!plan.scenes[id];
  var exits2 = (scene) => [...new Set(scene.props.filter((p) => p.type === "portal").map((p) => p.destination))];
  function gmBrief(plan) {
    const sentence = (f) => {
      const r = f.ref;
      return { cache: `\u0412 \u043F\u043E\u0434\u0432\u0430\u043B\u0435 ${r.gen} \u043A\u0442\u043E-\u0442\u043E \u043F\u0440\u0438\u043F\u0440\u044F\u0442\u0430\u043B \u0437\u0430\u043F\u0435\u0440\u0442\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A.`, lock: `\u041E\u0434\u043D\u0430 \u0438\u0437 \u043A\u043E\u043C\u043D\u0430\u0442 ${r.gen} \u0437\u0430\u043F\u0435\u0440\u0442\u0430.`, trap: `${r.title}: \u043D\u0430 \u043F\u043E\u043B\u0443 \u043A\u043E\u0440\u0438\u0434\u043E\u0440\u043E\u0432 \u0435\u0441\u0442\u044C \u043F\u043B\u0438\u0442\u044B-\u043B\u043E\u0432\u0443\u0448\u043A\u0438.`, dungeon: `\u0417\u0430 \u0433\u043E\u0440\u043E\u0434\u043E\u043C \u0435\u0441\u0442\u044C ${r.nom}.`, fortress: `${r.title}: \u0434\u0430\u0432\u043D\u043E \u043D\u0435\u0442 \u0445\u043E\u0437\u044F\u0438\u043D\u0430, \u0441\u0442\u0440\u0430\u0436\u0430 \u043D\u0430 \u043C\u0435\u0441\u0442\u0435.`, tavern: `\u0422\u0430\u0432\u0435\u0440\u043D\u0430 ${r.nom.replace(/^таверна /, "")}.` }[f.kind] || "";
    };
    return {
      version: plan.v,
      settlement: plan.name,
      size: plan.size,
      places: plan.buildings.map((b) => ({ id: b.id, type: b.type, name: b.name, owner: b.owner.full, hasCellar: !!b.cellar, hasUpperFloor: !!b.up })),
      outside: { road: "out", dungeon: plan.dungeon ? { name: plan.dungeon.name, levels: plan.dungeon.levels } : null, fortress: plan.fortress ? plan.fortress.name : null },
      publicFacts: plan.facts.map(sentence).filter(Boolean)
    };
  }
  function npcBrief(scene, prop) {
    const n = prop.npc;
    return { id: prop.id, scene: scene.id, place: scene.name, name: prop.name, role: n.role, gender: n.gender, class: n.classId, persona: n.persona, fallbackLines: n.lines };
  }

  // src/worldgen/world.js
  var GEN_VERSION3 = 2;
  var SUPPORTED_VERSIONS = [1, 2];
  var { randomSeed: randomSeed3, SIZES: SIZES11, TOWN_SIZES: TOWN_SIZES3, gmBrief: gmBrief2, npcBrief: npcBrief2 } = world_v2_exports;
  var engine = (v) => {
    if (v === 1) return world_exports;
    if (v === 2) return world_v2_exports;
    throw Error("\u0412\u0435\u0440\u0441\u0438\u044F \u0433\u0435\u043D\u0435\u0440\u0430\u0442\u043E\u0440\u0430 \u044D\u0442\u043E\u0433\u043E \u043C\u0438\u0440\u0430 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F.");
  };
  function normalizeGen3(gen = {}) {
    const v = gen.v ?? GEN_VERSION3;
    return { ...engine(v).normalizeGen(gen), v };
  }
  var createWorld3 = (seed, size, v = GEN_VERSION3) => engine(v).createWorld(seed, size);
  var generateScene3 = (plan, id) => engine(plan.v).generateScene(plan, id);
  var sceneIds3 = (plan) => engine(plan.v).sceneIds(plan);
  var isGeneratedId3 = (plan, id) => engine(plan.v).isGeneratedId(plan, id);
  var exits3 = (scene) => engine(scene.gen?.planVersion ?? GEN_VERSION3).exits(scene);
  var validateScene3 = (scene) => engine(scene.gen?.planVersion ?? GEN_VERSION3).validateScene(scene);

  // src/worldgen/runtime.js
  var runtime_exports = {};
  __export(runtime_exports, {
    begin: () => begin,
    choose: () => choose,
    fireTrap: () => fireTrap,
    gstate: () => gstate,
    isOpened: () => isOpened,
    knownTraps: () => knownTraps,
    passivePerception: () => passivePerception,
    step: () => step
  });
  var ABILITY = { dex: "\u041B\u043E\u0432\u043A\u043E\u0441\u0442\u044C", con: "\u0422\u0435\u043B\u043E\u0441\u043B\u043E\u0436\u0435\u043D\u0438\u0435", str: "\u0421\u0438\u043B\u0430", wis: "\u041C\u0443\u0434\u0440\u043E\u0441\u0442\u044C", int: "\u0418\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442" };
  var key9 = (sceneId, id) => sceneId + ":" + id;
  var gstate = (host) => {
    const g = host.state.gen || (host.state.gen = {});
    for (const k of ["opened", "unlocked", "known", "disarmed", "fired", "jammed", "talk"]) g[k] = g[k] || {};
    return g;
  };
  var d20 = (host, bonus) => {
    const r = host.roll(20);
    return { r, total: r + bonus };
  };
  function passivePerception(host) {
    return 10 + host.mod("wis");
  }
  function fireTrap(host, trap) {
    const bonus = host.mod(trap.save), { r, total } = d20(host, bonus), ok = total >= trap.dc;
    const check = { natural: r, values: [r], total, bonus, dc: trap.dc, success: ok, sides: 20 };
    let text = trap.text + ` \u0421\u043F\u0430\u0441\u0431\u0440\u043E\u0441\u043E\u043A (${ABILITY[trap.save]}): ${r}${host.mod(trap.save) >= 0 ? "+" : ""}${host.mod(trap.save)} \u043F\u0440\u043E\u0442\u0438\u0432 \u0441\u043B. ${trap.dc}, `;
    if (ok) return { hit: false, check, text: text + "\u0443\u0441\u043F\u0435\u0445, \u0432\u044B \u0443\u0432\u0435\u0440\u043D\u0443\u043B\u0438\u0441\u044C." };
    let dmg = 0;
    for (let i = 0; i < trap.dice; i++) dmg += host.roll(trap.sides);
    if (trap.alarm) {
      host.state.gen && (gstate(host).alarm = true);
      return { hit: true, check, alarm: true, text: text + "\u043F\u0440\u043E\u0432\u0430\u043B. \u0428\u0443\u043C \u0440\u0430\u0437\u043D\u0451\u0441\u0441\u044F \u043F\u043E \u043E\u043A\u0440\u0443\u0433\u0435." };
    }
    const hp = host.hurt(dmg, trap.name);
    if (trap.poison) host.poison?.();
    return { hit: true, check, dmg, hp, text: text + `\u043F\u0440\u043E\u0432\u0430\u043B, \u0443\u0440\u043E\u043D ${dmg}.` };
  }
  function lockOptions(host, p, g, k) {
    const o = [];
    if (p.lock.key && host.has(p.lock.key)) o.push({ id: "key", label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u043B\u044E\u0447\u043E\u043C" });
    if (host.has("\u041E\u0442\u043C\u044B\u0447\u043A\u0438") && !g.jammed[k]) o.push({ id: "pick", label: "\u0412\u0441\u043A\u0440\u044B\u0442\u044C \u043E\u0442\u043C\u044B\u0447\u043A\u0430\u043C\u0438" });
    o.push({ id: "force", label: "\u0412\u0437\u043B\u043E\u043C\u0430\u0442\u044C \u0441\u0438\u043B\u043E\u0439" });
    o.push({ id: "leave", label: "\u041E\u0442\u043E\u0439\u0442\u0438" });
    return o;
  }
  function begin(host, sceneId, p) {
    const g = gstate(host), k = key9(sceneId, p.id);
    if (p.type === "npc" && p.npc) {
      g.talk[k] = 0;
      return { kind: "npc", title: p.name, text: p.npc.lines[0], options: p.npc.lines.length > 1 ? [{ id: "next", label: "\u0414\u0430\u043B\u044C\u0448\u0435" }, { id: "leave", label: "\u041F\u043E\u043F\u0440\u043E\u0449\u0430\u0442\u044C\u0441\u044F" }] : [{ id: "leave", label: "\u041F\u043E\u043F\u0440\u043E\u0449\u0430\u0442\u044C\u0441\u044F" }], npc: p.npc };
    }
    if (p.type === "door" && p.lock && !g.unlocked[k]) return { kind: "door", title: p.name, text: "\u0414\u0432\u0435\u0440\u044C \u0437\u0430\u043F\u0435\u0440\u0442\u0430" + (p.lock.key ? ", \u0437\u0430\u043C\u043E\u043A \u043D\u0435\u043E\u0431\u044B\u0447\u043D\u044B\u0439." : "."), options: lockOptions(host, p, g, k) };
    if (!p.container || !p.loot) return null;
    if (g.opened[k]) return { kind: "container", title: p.name, text: "\u0417\u0434\u0435\u0441\u044C \u0443\u0436\u0435 \u043F\u0443\u0441\u0442\u043E.", options: [{ id: "leave", label: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C" }] };
    if (p.lock && !g.unlocked[k]) return { kind: "container", title: p.name, text: ((p.description || "") + " \u0417\u0430\u043C\u043E\u043A \u0437\u0430\u043A\u0440\u044B\u0442.").trim(), options: lockOptions(host, p, g, k) };
    return armedStep(host, p, g, k, p.description);
  }
  function armedStep(host, p, g, k, intro = "") {
    if (p.trap && !g.disarmed[k] && !g.fired[k]) {
      if (!g.known[k] && passivePerception(host) >= p.trap.detectDc) {
        g.known[k] = true;
        host.log(`\u0412\u044B \u0437\u0430\u043C\u0435\u0442\u0438\u043B\u0438 \u043B\u043E\u0432\u0443\u0448\u043A\u0443: ${p.trap.name}.`);
      }
      if (g.known[k]) return { kind: "container", title: p.name, text: `${intro} \u0412\u044B \u0437\u0430\u043C\u0435\u0442\u0438\u043B\u0438 \u043B\u043E\u0432\u0443\u0448\u043A\u0443: ${p.trap.name}. ${p.trap.hint}`, options: [{ id: "disarm", label: "\u041E\u0431\u0435\u0437\u0432\u0440\u0435\u0434\u0438\u0442\u044C" }, { id: "open", label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u043A \u0435\u0441\u0442\u044C" }, { id: "leave", label: "\u041E\u0442\u043E\u0439\u0442\u0438" }] };
    }
    return { kind: "container", title: p.name, text: intro || "\u0412\u044B \u043E\u0441\u043C\u0430\u0442\u0440\u0438\u0432\u0430\u0435\u0442\u0435 \u043D\u0430\u0445\u043E\u0434\u043A\u0443.", options: [{ id: "open", label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C" }, { id: "leave", label: "\u041E\u0442\u043E\u0439\u0442\u0438" }] };
  }
  function takeLoot(host, p, g, k) {
    const l = p.loot;
    g.opened[k] = true;
    if (l.gold) host.gold(l.gold);
    if (l.potions) host.potions(l.potions);
    if (l.torches) host.torches(l.torches);
    for (const it of l.gear) host.give(it, 1);
    const t = lootSentence(l);
    host.log(t);
    return t;
  }
  var lockCheck = (host, p, g, k, how) => {
    const lock = p.lock, ab = how === "force" ? "str" : "dex", dc = how === "force" ? lock.forceDc : lock.pickDc, { r, total } = d20(host, host.mod(ab)), ok = total >= dc;
    const text = `${how === "force" ? "\u0412\u0437\u043B\u043E\u043C" : "\u041E\u0442\u043C\u044B\u0447\u043A\u0438"} (${ABILITY[ab]}): ${r}${host.mod(ab) >= 0 ? "+" : ""}${host.mod(ab)} \u043F\u0440\u043E\u0442\u0438\u0432 \u0441\u043B. ${dc}, ${ok ? "\u0443\u0441\u043F\u0435\u0445" : "\u043F\u0440\u043E\u0432\u0430\u043B"}.`;
    if (!ok && how === "pick" && host.roll(4) === 1) {
      g.jammed[k] = true;
      return { ok, text: text + " \u041E\u0442\u043C\u044B\u0447\u043A\u0430 \u0441\u043B\u043E\u043C\u0430\u043B\u0430\u0441\u044C \u0432 \u0437\u0430\u043C\u043A\u0435, \u0442\u0435\u043F\u0435\u0440\u044C \u0435\u0433\u043E \u043C\u043E\u0436\u043D\u043E \u0442\u043E\u043B\u044C\u043A\u043E \u0432\u0437\u043B\u043E\u043C\u0430\u0442\u044C." };
    }
    return { ok, text };
  };
  function choose(host, sceneId, p, optionId) {
    const g = gstate(host), k = key9(sceneId, p.id);
    if (optionId === "leave") return { done: true, text: "" };
    if (p.type === "npc" && optionId === "next") {
      const i = (g.talk[k] || 0) + 1;
      g.talk[k] = i;
      const last = i >= p.npc.lines.length - 1;
      return { done: false, text: p.npc.lines[i], options: last ? [{ id: "leave", label: "\u041F\u043E\u043F\u0440\u043E\u0449\u0430\u0442\u044C\u0441\u044F" }] : [{ id: "next", label: "\u0414\u0430\u043B\u044C\u0448\u0435" }, { id: "leave", label: "\u041F\u043E\u043F\u0440\u043E\u0449\u0430\u0442\u044C\u0441\u044F" }] };
    }
    if (p.lock && !g.unlocked[k] && ["key", "pick", "force"].includes(optionId)) {
      let ok = true, text = "\u0417\u0430\u043C\u043E\u043A \u0449\u0451\u043B\u043A\u0430\u0435\u0442.";
      if (optionId !== "key") {
        const r = lockCheck(host, p, g, k, optionId);
        ok = r.ok;
        text = r.text;
      }
      if (!ok) return { done: false, text, options: lockOptions(host, p, g, k) };
      g.unlocked[k] = true;
      host.log(`\u041E\u0442\u043A\u0440\u044B\u0442\u043E: ${p.name}.`);
      if (p.type === "door") return { done: true, opened: true, text: text + " \u0414\u0432\u0435\u0440\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0430." };
      const next = armedStep(host, p, g, k, text);
      return { done: false, ...next, text: next.text };
    }
    if (p.container && optionId === "disarm") {
      const { r, total } = d20(host, host.mod("dex")), ok = total >= p.trap.disarmDc, text = `\u041E\u0431\u0435\u0437\u0432\u0440\u0435\u0436\u0438\u0432\u0430\u043D\u0438\u0435 (\u041B\u043E\u0432\u043A\u043E\u0441\u0442\u044C): ${r}${host.mod("dex") >= 0 ? "+" : ""}${host.mod("dex")} \u043F\u0440\u043E\u0442\u0438\u0432 \u0441\u043B. ${p.trap.disarmDc}, ${ok ? "\u0443\u0441\u043F\u0435\u0445" : "\u043F\u0440\u043E\u0432\u0430\u043B"}.`;
      if (ok) {
        g.disarmed[k] = true;
        return { done: false, text: text + " \u041B\u043E\u0432\u0443\u0448\u043A\u0430 \u043E\u0431\u0435\u0437\u0432\u0440\u0435\u0436\u0435\u043D\u0430.", options: [{ id: "open", label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C" }, { id: "leave", label: "\u041E\u0442\u043E\u0439\u0442\u0438" }] };
      }
      g.fired[k] = true;
      const t = fireTrap(host, p.trap);
      return { done: false, text: text + " " + t.text, options: [{ id: "open", label: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C" }, { id: "leave", label: "\u041E\u0442\u043E\u0439\u0442\u0438" }], trap: t };
    }
    if (p.container && g.opened[k]) return { done: true, text: "\u0417\u0434\u0435\u0441\u044C \u0443\u0436\u0435 \u043F\u0443\u0441\u0442\u043E." };
    if (p.container && p.lock && !g.unlocked[k] && ["open", "disarm"].includes(optionId)) return { done: false, text: "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u043D\u0443\u0436\u043D\u043E \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u043E\u043A.", options: lockOptions(host, p, g, k) };
    if (p.container && optionId === "open") {
      let pre = "", trap = null;
      if (p.trap && !g.disarmed[k] && !g.fired[k]) {
        g.fired[k] = true;
        trap = fireTrap(host, p.trap);
        pre = trap.text + " ";
      }
      if (trap?.hp === 0) return { done: true, text: pre.trim(), trap };
      return { done: true, text: pre + takeLoot(host, p, g, k), trap, looted: true };
    }
    return { done: true, text: "" };
  }
  function step(host, scene, x, y) {
    const g = gstate(host), events = [];
    for (const t of scene.traps || []) {
      const k = key9(scene.id, t.id), dist = Math.abs(t.x - x) + Math.abs(t.y - y);
      if (g.disarmed[k] || g.fired[k]) continue;
      if (dist === 0) {
        g.fired[k] = true;
        g.known[k] = true;
        events.push({ type: "fired", trap: t, result: fireTrap(host, t.trap) });
      } else if (dist <= 1 && !g.known[k]) {
        if (passivePerception(host) >= t.trap.detectDc) {
          g.known[k] = true;
          events.push({ type: "found", trap: t, text: `\u0412\u044B \u0437\u0430\u043C\u0435\u0442\u0438\u043B\u0438 \u043B\u043E\u0432\u0443\u0448\u043A\u0443 \u043D\u0430 \u043F\u043B\u0438\u0442\u0435: ${t.trap.name}. ${t.trap.hint}` });
        }
      }
    }
    return events;
  }
  function knownTraps(host, scene) {
    const g = gstate(host);
    return (scene.traps || []).filter((t) => g.known[key9(scene.id, t.id)] && !g.fired[key9(scene.id, t.id)] && !g.disarmed[key9(scene.id, t.id)]);
  }
  function isOpened(host, sceneId, p) {
    const g = gstate(host), k = key9(sceneId, p.id);
    return !!(g.opened[k] || g.unlocked[k]);
  }
  return __toCommonJS(index_exports);
})();
