var Characters = (() => {
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

  // src/characters.js
  var characters_exports = {};
  __export(characters_exports, {
    CLASS_KIND: () => CLASS_KIND,
    COLOR_FIELDS: () => COLOR_FIELDS,
    GROUPS: () => GROUPS,
    NPCS: () => NPCS,
    NPC_BY_NAME: () => NPC_BY_NAME,
    OPTIONS: () => OPTIONS,
    OUTFITS: () => OUTFITS,
    PALETTE: () => PALETTE,
    PALETTES: () => PALETTES,
    PRESETS: () => PRESETS,
    RULES: () => RULES,
    TABS: () => TABS,
    TEXEL: () => TEXEL,
    VIEWS: () => VIEWS,
    build: () => build,
    defaultLook: () => defaultLook,
    modelStats: () => modelStats,
    normalize: () => normalize,
    npcPortrait: () => npcPortrait,
    portrait: () => portrait,
    presetLook: () => presetLook,
    randomLook: () => randomLook,
    shade: () => shade,
    spec: () => spec,
    validateAppearance: () => validateAppearance
  });

  // src/look-options.js
  var P = (list) => list.map(([hex, name]) => ({ hex, name }));
  var PALETTES = {
    skin: P([["#f6dcc3", "\u0424\u0430\u0440\u0444\u043E\u0440"], ["#f2d4b4", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F"], ["#e9bf90", "\u0422\u0451\u043F\u043B\u0430\u044F"], ["#e3bb8a", "\u041F\u0435\u0441\u043E\u0447\u043D\u0430\u044F"], ["#d9a577", "\u0417\u0430\u0433\u0430\u0440"], ["#c58d64", "\u041C\u0435\u0434\u043D\u0430\u044F"], ["#a8714d", "\u0411\u0440\u043E\u043D\u0437\u0430"], ["#8b5b42", "\u041A\u0430\u0448\u0442\u0430\u043D\u043E\u0432\u0430\u044F"], ["#6b4331", "\u0422\u0451\u043C\u043D\u0430\u044F"], ["#4a2f25", "\u042D\u0431\u0435\u043D\u043E\u0432\u0430\u044F"], ["#efbc88", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#f8dfca", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#eac2ad", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#d8a17a", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#b77a55", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#a26a48", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#70472f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#533827", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"]]),
    hair: P([["#1c1b20", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#26282e", "\u0413\u0440\u0430\u0444\u0438\u0442"], ["#3a2a22", "\u0428\u043E\u043A\u043E\u043B\u0430\u0434"], ["#493024", "\u041A\u0430\u0448\u0442\u0430\u043D"], ["#6a432c", "\u041E\u0440\u0435\u0445"], ["#8a5a34", "\u041C\u0435\u0434\u043E\u0432\u044B\u0439"], ["#a64f35", "\u0420\u044B\u0436\u0438\u0439"], ["#c4622f", "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439"], ["#b7803c", "\u0417\u043E\u043B\u043E\u0442\u0438\u0441\u0442\u044B\u0439"], ["#d9b45a", "\u0411\u043B\u043E\u043D\u0434"], ["#e6cf8a", "\u041B\u0451\u043D"], ["#c7c4bf", "\u0421\u0435\u0434\u043E\u0439"], ["#e8e6ee", "\u0411\u0435\u043B\u044B\u0439"], ["#8d8a99", "\u041F\u0435\u043F\u0435\u043B"], ["#4a7fd0", "\u041B\u0430\u0437\u0443\u0440\u044C"], ["#5a3fa8", "\u0418\u043D\u0434\u0438\u0433\u043E"], ["#c05a9a", "\u041C\u0430\u043B\u0438\u043D\u0430"], ["#e07aa8", "\u0420\u043E\u0437\u043E\u0432\u044B\u0439"], ["#3fa58a", "\u0411\u0438\u0440\u044E\u0437\u0430"], ["#5f9a45", "\u041C\u043E\u0445"], ["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#3b6a8a", "\u0421\u0442\u0430\u043B\u044C"], ["#75462e", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#c9c6d7", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#d7a652", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#352b32", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#734c32", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#17191f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#f0e9dc", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#e0b969", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"], ["#cb763f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"], ["#77352b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"], ["#596779", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"], ["#5d437c", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"], ["#395c57", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"], ["#8d526b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"], ["#ac86ba", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),
    eye: P([["#14141a", "\u0427\u0451\u0440\u043D\u044B\u0435"], ["#3a2418", "\u0422\u0451\u043C\u043D\u043E-\u043A\u0430\u0440\u0438\u0435"], ["#6a4a22", "\u041A\u0430\u0440\u0438\u0435"], ["#2f5fa8", "\u0421\u0438\u043D\u0438\u0435"], ["#2f7a5a", "\u0417\u0435\u043B\u0451\u043D\u044B\u0435"], ["#6a3fa0", "\u0424\u0438\u0430\u043B\u043A\u043E\u0432\u044B\u0435"], ["#c27a1c", "\u042F\u043D\u0442\u0430\u0440\u043D\u044B\u0435"], ["#8a8f9a", "\u0421\u0435\u0440\u044B\u0435"], ["#b02f3d", "\u0420\u0443\u0431\u0438\u043D\u043E\u0432\u044B\u0435"]]),
    cloth: P([["#24456b", "\u041D\u043E\u0447\u043D\u043E\u0439 \u0441\u0438\u043D\u0438\u0439"], ["#315e84", "\u0421\u0438\u043D\u0438\u0439"], ["#4a7fb0", "\u041D\u0435\u0431\u0435\u0441\u043D\u044B\u0439"], ["#2f7a7a", "\u041C\u043E\u0440\u0441\u043A\u0430\u044F \u0432\u043E\u043B\u043D\u0430"], ["#566d70", "\u0421\u043B\u0430\u043D\u0435\u0446"], ["#2d4f2c", "\u0425\u0432\u043E\u044F"], ["#3f6b3b", "\u0417\u0435\u043B\u0451\u043D\u044B\u0439"], ["#487844", "\u0422\u0440\u0430\u0432\u0430"], ["#7a9a4a", "\u041E\u043B\u0438\u0432\u0430"], ["#452361", "\u0418\u043D\u0434\u0438\u0433\u043E"], ["#5d2f7e", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"], ["#62377e", "\u0410\u043C\u0435\u0442\u0438\u0441\u0442"], ["#8a4a9a", "\u041E\u0440\u0445\u0438\u0434\u0435\u044F"], ["#c8688a", "\u0420\u043E\u0437\u0430"], ["#6a2330", "\u0411\u0443\u0440\u0433\u0443\u043D\u0434"], ["#8a2f3c", "\u0411\u043E\u0440\u0434\u043E\u0432\u044B\u0439"], ["#843f37", "\u041A\u0438\u0440\u043F\u0438\u0447"], ["#b0452f", "\u0422\u0435\u0440\u0440\u0430\u043A\u043E\u0442\u0430"], ["#c7792f", "\u042F\u043D\u0442\u0430\u0440\u044C"], ["#8a6a46", "\u041B\u0435\u043D"], ["#2a2a30", "\u0423\u0433\u043E\u043B\u044C"], ["#6c6c76", "\u0421\u0435\u0440\u044B\u0439"], ["#e6dcc4", "\u041A\u0440\u0435\u043C\u043E\u0432\u044B\u0439"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#8b3d46", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#172b48", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#386f9a", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#528b91", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#244b3b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#74914b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#b28439", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#bf6d36", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"], ["#714c38", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"], ["#302d38", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"], ["#aaa69b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"], ["#cfbda0", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"], ["#775b96", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 13"], ["#a9617b", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 14"], ["#484c74", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 15"]]),
    trim: P([["#d0a94a", "\u0417\u043E\u043B\u043E\u0442\u043E"], ["#c3a04c", "\u0421\u0442\u0430\u0440\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"], ["#e8c870", "\u0421\u0432\u0435\u0442\u043B\u043E\u0435 \u0437\u043E\u043B\u043E\u0442\u043E"], ["#b6bdc5", "\u0421\u0435\u0440\u0435\u0431\u0440\u043E"], ["#8fa0b0", "\u0421\u0442\u0430\u043B\u044C"], ["#c5b895", "\u0421\u043B\u043E\u043D\u043E\u0432\u0430\u044F \u043A\u043E\u0441\u0442\u044C"], ["#78552e", "\u0411\u0440\u043E\u043D\u0437\u0430"], ["#b87333", "\u041C\u0435\u0434\u044C"], ["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#3d8be8", "\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"], ["#4fb58a", "\u0418\u0437\u0443\u043C\u0440\u0443\u0434"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#2a2a30", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#c6a04f", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 1"], ["#e4c778", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 2"], ["#dbb787", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 3"], ["#ad7748", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 4"], ["#926749", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 5"], ["#d8dce1", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 6"], ["#82919d", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 7"], ["#526374", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 8"], ["#e9dfc7", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 9"], ["#b18bbf", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 10"], ["#699ca0", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 11"], ["#4c5b4c", "\u041E\u0442\u0442\u0435\u043D\u043E\u043A 12"]]),
    leather: P([["#4b3626", "\u0422\u0451\u043C\u043D\u0430\u044F \u043A\u043E\u0436\u0430"], ["#5a3d28", "\u041A\u043E\u0436\u0430"], ["#6a4a30", "\u0421\u0432\u0435\u0442\u043B\u0430\u044F \u043A\u043E\u0436\u0430"], ["#8a6a46", "\u0414\u0443\u0431\u043B\u0451\u043D\u0430\u044F"], ["#2a2a30", "\u0427\u0451\u0440\u043D\u0430\u044F"], ["#3a3a44", "\u0413\u0440\u0430\u0444\u0438\u0442\u043E\u0432\u0430\u044F"], ["#6a2330", "\u041A\u0440\u0430\u0441\u043D\u0430\u044F"], ["#2d4f2c", "\u0417\u0435\u043B\u0451\u043D\u0430\u044F"], ["#24456b", "\u0421\u0438\u043D\u044F\u044F"]]),
    paint: P([["#b02f3d", "\u0410\u043B\u044B\u0439"], ["#f0ece0", "\u0411\u0435\u043B\u044B\u0439"], ["#3d8be8", "\u041B\u0430\u0437\u0443\u0440\u043D\u044B\u0439"], ["#1a1a1f", "\u0427\u0451\u0440\u043D\u044B\u0439"], ["#3f9a5a", "\u0417\u0435\u043B\u0451\u043D\u044B\u0439"], ["#d0a94a", "\u0417\u043E\u043B\u043E\u0442\u043E\u0439"], ["#7a3fa8", "\u0424\u0438\u043E\u043B\u0435\u0442\u043E\u0432\u044B\u0439"], ["#e07a2f", "\u041E\u0440\u0430\u043D\u0436\u0435\u0432\u044B\u0439"]]),
    gem: P([["#4aa8f0", "\u0421\u0430\u043F\u0444\u0438\u0440"], ["#e0475a", "\u0420\u0443\u0431\u0438\u043D"], ["#4fd08a", "\u0418\u0437\u0443\u043C\u0440\u0443\u0434"], ["#a86bf0", "\u0410\u043C\u0435\u0442\u0438\u0441\u0442"], ["#f0c040", "\u0422\u043E\u043F\u0430\u0437"], ["#40e0d0", "\u0411\u0438\u0440\u044E\u0437\u0430"], ["#f0f0ff", "\u0410\u043B\u043C\u0430\u0437"], ["#f07ac0", "\u0420\u043E\u0437\u043E\u0432\u044B\u0439 \u043A\u0432\u0430\u0440\u0446"]])
  };
  var hexes = (key) => PALETTES[key].map((c) => c.hex);
  var L = (list) => list.map(([id, name]) => ({ id, name }));
  var OPTIONS = {
    gender: L([["male", "\u041C\u0443\u0436\u0441\u043A\u043E\u0439"], ["female", "\u0416\u0435\u043D\u0441\u043A\u0438\u0439"]]),
    ears: L([["round", "\u041E\u0431\u044B\u0447\u043D\u044B\u0435"], ["small", "\u041C\u0430\u043B\u0435\u043D\u044C\u043A\u0438\u0435"], ["pointed", "\u041E\u0441\u0442\u0440\u044B\u0435"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0435"]]),
    hairStyle: L([["bald", "\u0411\u0435\u0437 \u0432\u043E\u043B\u043E\u0441"], ["buzz", "\u0401\u0436\u0438\u043A"], ["short", "\u0412\u0437\u044A\u0435\u0440\u043E\u0448\u0435\u043D\u043D\u044B\u0435"], ["spiky", "\u0428\u0438\u043F\u044B"], ["mohawk", "\u0418\u0440\u043E\u043A\u0435\u0437"], ["sweep", "\u041A\u043E\u0441\u0430\u044F \u0447\u0451\u043B\u043A\u0430"], ["bob", "\u041A\u0430\u0440\u0435"], ["long", "\u0414\u043B\u0438\u043D\u043D\u044B\u0435"], ["wavy", "\u0412\u043E\u043B\u043D\u044B"], ["ponytail", "\u0425\u0432\u043E\u0441\u0442"], ["bun", "\u041F\u0443\u0447\u043E\u043A"], ["twin", "\u0414\u0432\u0430 \u0445\u0432\u043E\u0441\u0442\u0430"], ["braid", "\u041A\u043E\u0441\u0430"], ["curly", "\u041A\u0443\u0434\u0440\u0438"]]),
    brows: L([["soft", "\u041C\u044F\u0433\u043A\u0438\u0435"], ["straight", "\u0420\u043E\u0432\u043D\u044B\u0435"], ["angry", "\u0421\u0443\u0440\u043E\u0432\u044B\u0435"], ["raised", "\u041F\u0440\u0438\u043F\u043E\u0434\u043D\u044F\u0442\u044B\u0435"], ["thick", "\u0413\u0443\u0441\u0442\u044B\u0435"], ["thin", "\u0422\u043E\u043D\u043A\u0438\u0435"], ["sad", "\u041F\u0435\u0447\u0430\u043B\u044C\u043D\u044B\u0435"], ["none", "\u0411\u0435\u0437 \u0431\u0440\u043E\u0432\u0435\u0439"]]),
    eyes: L([["dot", "\u0422\u043E\u0447\u043A\u0438"], ["wide", "\u0428\u0438\u0440\u043E\u043A\u0438\u0435"], ["narrow", "\u0423\u0437\u043A\u0438\u0435"], ["happy", "\u0420\u0430\u0434\u043E\u0441\u0442\u043D\u044B\u0435"], ["sleepy", "\u0421\u043E\u043D\u043D\u044B\u0435"], ["sparkle", "\u0411\u043B\u0435\u0441\u0442\u044F\u0449\u0438\u0435"], ["big", "\u0411\u043E\u043B\u044C\u0448\u0438\u0435"]]),
    mouth: L([["smile", "\u0423\u043B\u044B\u0431\u043A\u0430"], ["neutral", "\u0421\u043F\u043E\u043A\u043E\u0439\u043D\u044B\u0439"], ["grin", "\u0423\u0445\u043C\u044B\u043B\u043A\u0430 \u0441 \u0437\u0443\u0431\u0430\u043C\u0438"], ["smirk", "\u0423\u0441\u043C\u0435\u0448\u043A\u0430"], ["open", "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0439"], ["cat", "\u041A\u043E\u0448\u0430\u0447\u0438\u0439"], ["frown", "\u0425\u043C\u0443\u0440\u044B\u0439"]]),
    beard: L([["none", "\u0411\u0435\u0437 \u0431\u043E\u0440\u043E\u0434\u044B"], ["stubble", "\u0429\u0435\u0442\u0438\u043D\u0430"], ["mustache", "\u0423\u0441\u044B"], ["goatee", "\u042D\u0441\u043F\u0430\u043D\u044C\u043E\u043B\u043A\u0430"], ["short", "\u041A\u043E\u0440\u043E\u0442\u043A\u0430\u044F"], ["full", "\u0413\u0443\u0441\u0442\u0430\u044F"], ["long", "\u0414\u043B\u0438\u043D\u043D\u0430\u044F"], ["sideburns", "\u0411\u0430\u043A\u0435\u043D\u0431\u0430\u0440\u0434\u044B"]]),
    marks: L([["freckles", "\u0412\u0435\u0441\u043D\u0443\u0448\u043A\u0438"], ["blush", "\u0420\u0443\u043C\u044F\u043D\u0435\u0446"], ["scar", "\u0428\u0440\u0430\u043C"], ["browscar", "\u0428\u0440\u0430\u043C \u043D\u0430 \u0431\u0440\u043E\u0432\u0438"], ["mole", "\u0420\u043E\u0434\u0438\u043D\u043A\u0430"], ["warpaint", "\u0411\u043E\u0435\u0432\u0430\u044F \u0440\u0430\u0441\u043A\u0440\u0430\u0441\u043A\u0430"], ["plaster", "\u041F\u043B\u0430\u0441\u0442\u044B\u0440\u044C"]]),
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
  var COLOR_FIELDS = { skin: "skin", hair: "hair", hair2: "hair", brow: "hair", eye: "eye", beardColor: "hair", cloth: "cloth", cloth2: "cloth", trim: "trim", leather: "leather", accent: "cloth", markColor: "paint", hat: "cloth", capeColor: "cloth", gem: "gem" };
  var NULLABLE = ["hair2", "brow", "beardColor", "cloth2", "accent", "markColor", "hat", "capeColor"];
  var ALLOWED_KEYS = /* @__PURE__ */ new Set(["gender", "ears", "hairStyle", "brows", "eyes", "mouth", "beard", "marks", "headgear", "cape", "accessories", "outfit", "face", "hood", ...Object.keys(COLOR_FIELDS)]);
  var BASE = { ears: "round", eyes: "dot", mouth: "smile", beard: "none", marks: [], headgear: "none", accessories: [], skin: "#e9bf90", hair2: null, brow: null, beardColor: null, cloth2: null, accent: null, hat: null, capeColor: null, eye: "#14141a", trim: "#d0a94a", gem: "#4aa8f0" };
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
  function normalize(ap, classId) {
    ap = ap || {};
    const gender = ap.gender === "female" ? "female" : "male", d = defaultLook(classId, gender), out = { ...d };
    for (const k of Object.keys(ap)) if (ap[k] !== void 0 && ALLOWED_KEYS.has(k)) out[k] = ap[k];
    const legacy = ap.brows === void 0 && ap.face !== void 0;
    if (legacy) {
      out.brows = ap.face === "soft" ? "soft" : "angry";
      if (ap.beard === void 0) out.beard = ap.face === "beard" ? "full" : "none";
      if (ap.headgear === void 0) out.headgear = ap.hood ? "hood" : "none";
    } else if (ap.hood && ap.headgear === void 0) out.headgear = "hood";
    if (legacy && ap.hairStyle === "short" && gender === "female") out.hairStyle = "bob";
    if (legacy && ap.hairStyle === "long" && gender === "male") out.hairStyle = "bun";
    if (!OUTFITS[classId]?.some((o) => o.id === out.outfit)) out.outfit = DEFAULT_OUTFIT[classId] || "plate";
    if (!Array.isArray(out.marks)) out.marks = [];
    if (!Array.isArray(out.accessories)) out.accessories = [];
    return out;
  }
  function validateAppearance(ap, classId) {
    if (!ap || typeof ap !== "object" || Array.isArray(ap)) throw Error("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434.");
    for (const k of Object.keys(ap)) if (!ALLOWED_KEYS.has(k)) throw Error("\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u0430\u044F \u0434\u0435\u0442\u0430\u043B\u044C \u0432\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u0438: " + k + ".");
    for (const [k, pal] of Object.entries(COLOR_FIELDS)) {
      const v = ap[k];
      if (v === void 0 || v === null && NULLABLE.includes(k)) continue;
      if (!hexes(pal).includes(v)) throw Error("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0446\u0432\u0435\u0442: " + k + ".");
    }
    for (const k of ["gender", "ears", "hairStyle", "brows", "eyes", "mouth", "beard", "headgear", "cape"]) if (ap[k] !== void 0 && !OPTIONS[k].some((o) => o.id === ap[k])) throw Error("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: " + k + ".");
    if (ap.outfit !== void 0 && !OUTFITS[classId]?.some((o) => o.id === ap.outfit)) throw Error("\u042D\u0442\u043E\u0442 \u043D\u0430\u0440\u044F\u0434 \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u043A\u043B\u0430\u0441\u0441\u0443.");
    for (const k of ["marks", "accessories"]) if (ap[k] !== void 0 && (!Array.isArray(ap[k]) || ap[k].length > OPTIONS[k].length || new Set(ap[k]).size !== ap[k].length || ap[k].some((v) => !OPTIONS[k].some((o) => o.id === v)))) throw Error("\u041D\u0435\u0434\u043E\u043F\u0443\u0441\u0442\u0438\u043C\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442: " + k + ".");
    if (ap.face !== void 0 && !["soft", "stern", "beard"].includes(ap.face)) throw Error("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043B\u0438\u0446\u043E.");
    if (ap.hood !== void 0 && typeof ap.hood !== "boolean") throw Error("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0433\u043E\u043B\u043E\u0432\u043D\u043E\u0439 \u0443\u0431\u043E\u0440.");
  }
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
    ap.marks = OPTIONS.marks.map((o) => o.id).filter(() => chance(0.18));
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
  var PRESETS = {
    fighter: [
      { name: "\u0421\u0442\u0440\u0430\u0436 \u0440\u0430\u0441\u0441\u0432\u0435\u0442\u0430", gender: "male", patch: {} },
      { name: "\u0417\u043E\u043B\u043E\u0442\u0430\u044F \u0432\u0430\u043B\u044C\u043A\u0438\u0440\u0438\u044F", gender: "female", patch: {} },
      { name: "\u0416\u0435\u043B\u0435\u0437\u043D\u044B\u0439 \u0432\u0435\u0442\u0435\u0440\u0430\u043D", gender: "male", patch: { outfit: "knight", headgear: "helm", beard: "full", marks: ["scar"], hair: "#c7c4bf", cape: "long", capeColor: "#6a2330", trim: "#b6bdc5" } },
      { name: "\u0420\u044B\u0436\u0430\u044F \u0440\u044B\u0446\u0430\u0440\u0448\u0430", gender: "female", patch: { hairStyle: "braid", hair: "#c4622f", outfit: "tabard", cloth: "#8a2f3c", marks: ["freckles"], cape: "mantle", eye: "#2f7a5a", eyes: "sparkle" } },
      { name: "\u0422\u0435\u043D\u044C \u043E\u0440\u0434\u0435\u043D\u0430", gender: "male", patch: { hairStyle: "mohawk", hair: "#1c1b20", cloth: "#2a2a30", trim: "#b6bdc5", outfit: "leather", accessories: ["eyepatch", "earring"], brows: "thick", skin: "#a8714d" } }
    ],
    wizard: [
      { name: "\u0417\u0432\u0451\u0437\u0434\u043E\u0447\u0451\u0442", gender: "male", patch: {} },
      { name: "\u041B\u0443\u043D\u043D\u0430\u044F \u0447\u0430\u0440\u043E\u0434\u0435\u0439\u043A\u0430", gender: "female", patch: {} },
      { name: "\u041E\u0433\u043D\u0435\u043D\u043D\u044B\u0439 \u0430\u0434\u0435\u043F\u0442", gender: "male", patch: { hairStyle: "spiky", hair: "#c4622f", cloth: "#b0452f", cloth2: "#6a2330", gem: "#e0475a", accessories: ["glasses"], mouth: "smirk", outfit: "scholar", eyes: "sparkle" } },
      { name: "\u041B\u0435\u0441\u043D\u0430\u044F \u0432\u0435\u0434\u0443\u043D\u044C\u044F", gender: "female", patch: { hairStyle: "braid", hair: "#5f9a45", cloth: "#2d4f2c", ears: "pointed", headgear: "circlet", gem: "#4fd08a", trim: "#c5b895", eye: "#2f7a5a", outfit: "mantle" } },
      { name: "\u0421\u0442\u0430\u0440\u044B\u0439 \u0430\u0440\u0445\u0438\u043C\u0430\u0433", gender: "male", patch: { hairStyle: "long", hair: "#e8e6ee", beard: "long", headgear: "wizhat", cloth: "#452361", outfit: "sash", brows: "thick", gem: "#a86bf0", eyes: "sleepy", skin: "#f2d4b4" } }
    ],
    rogue: [
      { name: "\u0421\u043B\u0435\u0434\u043E\u043F\u044B\u0442", gender: "male", patch: {} },
      { name: "\u0422\u0451\u043C\u043D\u0430\u044F \u043B\u0438\u0441\u0438\u0446\u0430", gender: "female", patch: {} },
      { name: "\u041D\u043E\u0447\u043D\u043E\u0439 \u043A\u043B\u0438\u043D\u043E\u043A", gender: "male", patch: { headgear: "hood", cloth: "#2a2a30", cape: "long", accessories: ["scarf"], accent: "#6a2330", eye: "#6a3fa0", hair: "#1c1b20", hairStyle: "sweep", trim: "#8fa0b0", brows: "angry" } },
      { name: "\u042F\u0440\u043C\u0430\u0440\u043E\u0447\u043D\u0430\u044F \u043F\u043B\u0443\u0442\u043E\u0432\u043A\u0430", gender: "female", patch: { hairStyle: "twin", hair: "#e07aa8", headgear: "cap", hat: "#b0452f", outfit: "vest", marks: ["freckles", "blush"], eyes: "happy", mouth: "grin", accessories: ["earring"], cape: "none" } },
      { name: "\u0421\u0442\u0430\u0440\u044B\u0439 \u0432\u043E\u0440", gender: "male", patch: { hairStyle: "buzz", hair: "#c7c4bf", beard: "goatee", outfit: "tunic", accessories: ["eyepatch"], marks: ["scar"], mouth: "smirk", cape: "none", skin: "#d9a577" } }
    ],
    cleric: [
      { name: "\u0411\u0440\u0430\u0442-\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C", gender: "male", patch: {} },
      { name: "\u0421\u0435\u0441\u0442\u0440\u0430 \u0441\u0432\u0435\u0442\u0430", gender: "female", patch: {} },
      { name: "\u0421\u0435\u0434\u043E\u0439 \u0438\u0441\u043F\u043E\u0432\u0435\u0434\u043D\u0438\u043A", gender: "male", patch: { hairStyle: "long", hair: "#e8e6ee", beard: "long", cloth: "#f0ece0", cloth2: "#e6dcc4", outfit: "surplice", headgear: "circlet", eye: "#c27a1c", brows: "thick", trim: "#d0a94a" } },
      { name: "\u0420\u044B\u0436\u0430\u044F \u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u0446\u0430", gender: "female", patch: { hairStyle: "ponytail", hair: "#a64f35", headgear: "headband", hat: "#e6dcc4", outfit: "surplice", cloth: "#e6dcc4", cloth2: "#8a2f3c", marks: ["freckles", "blush"], eyes: "sparkle", eye: "#2f7a5a" } },
      { name: "\u0412\u043E\u0438\u043D-\u043C\u043E\u043D\u0430\u0445", gender: "male", patch: { hairStyle: "bald", beard: "none", outfit: "monk", cloth: "#c7792f", cloth2: "#8a6a46", accessories: ["bracers"], marks: ["scar"], skin: "#8b5b42", brows: "thick", mouth: "neutral" } }
    ]
  };
  function presetLook(classId, preset) {
    const ap = { ...defaultLook(classId, preset.gender), ...structuredCopy(preset.patch) };
    return ap;
  }
  var TABS = [
    { id: "looks", name: "\u041E\u0431\u0440\u0430\u0437\u044B" },
    { id: "face", name: "\u041B\u0438\u0446\u043E" },
    { id: "hair", name: "\u0412\u043E\u043B\u043E\u0441\u044B" },
    { id: "outfit", name: "\u041E\u0434\u0435\u0436\u0434\u0430" },
    { id: "extras", name: "\u0414\u0435\u0442\u0430\u043B\u0438" }
  ];
  var GROUPS = {
    face: [
      { key: "skin", title: "\u0426\u0432\u0435\u0442 \u043A\u043E\u0436\u0438", type: "swatch" },
      { key: "eyes", title: "\u0413\u043B\u0430\u0437\u0430", type: "tiles", view: "face" },
      { key: "eye", title: "\u0426\u0432\u0435\u0442 \u0433\u043B\u0430\u0437", type: "swatch" },
      { key: "brows", title: "\u0411\u0440\u043E\u0432\u0438", type: "tiles", view: "face" },
      { key: "brow", title: "\u0426\u0432\u0435\u0442 \u0431\u0440\u043E\u0432\u0435\u0439", type: "swatch", follow: "\u043A\u0430\u043A \u0432\u043E\u043B\u043E\u0441\u044B" },
      { key: "mouth", title: "\u0420\u043E\u0442", type: "tiles", view: "face" },
      { key: "beard", title: "\u0411\u043E\u0440\u043E\u0434\u0430 \u0438 \u0443\u0441\u044B", type: "tiles", view: "face", maleFirst: true },
      { key: "beardColor", title: "\u0426\u0432\u0435\u0442 \u0431\u043E\u0440\u043E\u0434\u044B", type: "swatch", follow: "\u043A\u0430\u043A \u0432\u043E\u043B\u043E\u0441\u044B" },
      { key: "ears", title: "\u0423\u0448\u0438", type: "tiles", view: "head" },
      { key: "marks", title: "\u0417\u043D\u0430\u043A\u0438 \u043D\u0430 \u043B\u0438\u0446\u0435", type: "multi", view: "face" }
    ],
    hair: [
      { key: "hairStyle", title: "\u041F\u0440\u0438\u0447\u0451\u0441\u043A\u0430", type: "tiles", view: "head" },
      { key: "hair", title: "\u0426\u0432\u0435\u0442 \u0432\u043E\u043B\u043E\u0441", type: "swatch" },
      { key: "hair2", title: "\u041F\u0440\u044F\u0434\u044C \u0438 \u043A\u043E\u043D\u0447\u0438\u043A\u0438", type: "swatch", follow: "\u043D\u0435\u0442" }
    ],
    outfit: [
      { key: "outfit", title: "\u041D\u0430\u0440\u044F\u0434", type: "tiles", view: "body", byClass: true },
      { key: "cloth", title: "\u041E\u0441\u043D\u043E\u0432\u043D\u043E\u0439 \u0446\u0432\u0435\u0442", type: "swatch" },
      { key: "cloth2", title: "\u0414\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u044B\u0439 \u0446\u0432\u0435\u0442", type: "swatch", follow: "\u0430\u0432\u0442\u043E" },
      { key: "trim", title: "\u041E\u0442\u0434\u0435\u043B\u043A\u0430", type: "swatch" },
      { key: "leather", title: "\u041A\u043E\u0436\u0430, \u043F\u043E\u044F\u0441 \u0438 \u0441\u0430\u043F\u043E\u0433\u0438", type: "swatch" },
      { key: "gem", title: "\u0426\u0432\u0435\u0442 \u0441\u0430\u043C\u043E\u0446\u0432\u0435\u0442\u043E\u0432", type: "swatch" }
    ],
    extras: [
      { key: "headgear", title: "\u0413\u043E\u043B\u043E\u0432\u043D\u043E\u0439 \u0443\u0431\u043E\u0440", type: "tiles", view: "hat" },
      { key: "hat", title: "\u0426\u0432\u0435\u0442 \u0443\u0431\u043E\u0440\u0430", type: "swatch", follow: "\u0430\u0432\u0442\u043E" },
      { key: "cape", title: "\u041F\u043B\u0430\u0449", type: "tiles", view: "body", back: true },
      { key: "capeColor", title: "\u0426\u0432\u0435\u0442 \u043F\u043B\u0430\u0449\u0430", type: "swatch", follow: "\u0430\u0432\u0442\u043E" },
      { key: "accessories", title: "\u0423\u043A\u0440\u0430\u0448\u0435\u043D\u0438\u044F", type: "multi", view: "head" },
      { key: "accent", title: "\u0426\u0432\u0435\u0442 \u0430\u043A\u0446\u0435\u043D\u0442\u043E\u0432", type: "swatch", follow: "\u0430\u0432\u0442\u043E" }
    ]
  };

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
      const cfg = ROLES[role(c)] || ROLES.other;
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

  // src/characters.js
  var RULES = {
    headMinRatio: 0.34,
    headMaxRatio: 0.46,
    // доля головы от высоты фигуры
    maxBoxes: 200,
    // бюджет боксов фигуры без текселей
    maxWithTexels: 520,
    // бюджет вместе с текселями-наклейками (правило «тексели», src/texel.js)
    texel: true,
    defaultEye: 1315866,
    outline: "#1b1620",
    classes: ["fighter", "rogue", "wizard", "cleric"],
    genders: ["male", "female"]
  };
  var CLASS_KIND = { fighter: 2, wizard: 1, rogue: 0, cleric: 5 };
  var PALETTE = {
    fighter: { cloth: 3235460, dark: 2377067, trim: 13674826, boots: 4929062, belt: 5913896 },
    wizard: { cloth: 6107006, dark: 4531041, trim: 13674826, boots: 4929062, belt: 5913896, gem: 4033512 },
    rogue: { cloth: 4156219, dark: 2969388, trim: 12820556, boots: 4929062, belt: 6965808, leather: 6965808 },
    cleric: { cloth: 9056060, dark: 6955824, trim: 13674826, boots: 4929062, belt: 5913896, cream: 15392707, green: 4152127 }
  };
  var STEEL = 12963024;
  var MAIL = 9081498;
  var WOOD = 6965808;
  var IRON = 10133667;
  var CREAM = 15392707;
  var GREEN = 4152127;
  var LIP = 10181190;
  var MOUTH = 4857626;
  var TEETH = 16052454;
  var INK = 1710623;
  var WHITE = 16777215;
  var KIND_TO_CLASS = { 0: "rogue", 1: "wizard", 2: "fighter", 5: "cleric" };
  var KIND_GENDER = { 0: "male", 1: "female", 2: "male" };
  var DEFAULT_HANDS = { fighter: ["sword", "shield"], rogue: ["sword", "empty"], wizard: ["staff", "empty"], cleric: ["staff", "empty"] };
  var NPCS = {
    innkeeper: { name: "\u0411\u0440\u0430\u043C", role: "\u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A", classId: "fighter", gender: "male", look: { hair: "#6a432c", hairStyle: "short", beard: "none", cloth: "#843f37" }, hands: ["empty", "empty"] },
    "street-guard": { name: "\u0420\u0430\u0434\u0430", role: "\u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430", classId: "fighter", gender: "female", look: { hair: "#6a432c", hairStyle: "braid", cloth: "#315e84" }, hands: ["sword", "shield"] },
    keeper: { name: "\u042D\u043B\u043B\u0435\u043D", role: "\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430", classId: "cleric", gender: "female", look: { hair: "#c7c4bf", hairStyle: "long", brows: "soft", headgear: "hood" }, hands: ["empty", "empty"], book: true },
    novice: { name: "\u041B\u0438\u043D", role: "\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A", classId: "cleric", gender: "male", look: { hair: "#6a432c", hairStyle: "short", brows: "soft", beard: "none", cloth: "#843f37" }, hands: ["empty", "empty"] }
  };
  var NPC_BY_NAME = Object.fromEntries(Object.entries(NPCS).map(([id, n]) => [n.name, id]));
  var num = (v) => typeof v === "number" ? v : typeof v === "string" && /^#[0-9a-f]{6}$/i.test(v) ? parseInt(v.slice(1), 16) : void 0;
  var mix = (a, b, t) => shade(a, 1 - t) + shade(b, t) & 16777215;
  function spec(kind, actor) {
    const gen = actor?.gen && typeof actor.gen === "object" ? actor.gen : null;
    const rawNpcId = gen ? null : actor?.npc || actor?.npcId;
    const npcId = { ellen: "keeper", lin: "novice" }[rawNpcId] || rawNpcId || (actor && actor.id && NPCS[actor.id] && actor.type === "npc" ? actor.id : null);
    if (npcId && !Object.hasOwn(NPCS, npcId)) throw Error("NPC must be registered: " + npcId);
    const npc = gen || (npcId ? NPCS[npcId] : null);
    const classId = npc?.classId || (RULES.classes.includes(actor?.classId) ? actor.classId : KIND_TO_CLASS[kind]);
    if (!classId) return null;
    let ap;
    if (npc) ap = normalize({ ...defaultLook(classId, npc.gender), ...npc.look, gender: npc.gender }, classId);
    else if (actor?.appearance) ap = normalize(actor.appearance, classId);
    else ap = normalize({ gender: KIND_GENDER[kind] || "male" }, classId);
    const p = PALETTE[classId], cloth = num(ap.cloth) ?? p.cloth, leather = num(ap.leather) ?? p.belt, hair2 = num(ap.hair) ?? 4796452;
    return {
      classId,
      gender: ap.gender,
      npc: npcId,
      outfit: ap.outfit,
      hairStyle: ap.hairStyle,
      ears: ap.ears,
      brows: ap.brows,
      eyes: ap.eyes,
      mouth: ap.mouth,
      beard: ap.beard,
      marks: ap.marks,
      headgear: ap.headgear,
      cape: ap.cape,
      accessories: ap.accessories,
      skin: num(ap.skin) ?? 15318928,
      hair: hair2,
      hair2: num(ap.hair2) ?? null,
      brow: num(ap.brow) ?? shade(hair2, 0.85),
      eye: num(ap.eye) ?? RULES.defaultEye,
      beardC: num(ap.beardColor) ?? hair2,
      cloth,
      cloth2: num(ap.cloth2) ?? (cloth === p.cloth ? p.dark : shade(cloth, 0.78)),
      trim: num(ap.trim) ?? p.trim,
      leather,
      boots: shade(leather, 0.83),
      gem: num(ap.gem) ?? 4892912,
      accent: num(ap.accent) ?? null,
      markC: num(ap.markColor) ?? null,
      hat: num(ap.hat) ?? null,
      capeC: num(ap.capeColor) ?? shade(cloth, 0.86),
      hands: npc?.hands || actor?.hands || DEFAULT_HANDS[classId],
      book: !!npc?.book,
      p
    };
  }
  function build(s, opts = {}) {
    const out = [], B = (x, y, z, w, h, d, c, e = false) => out.push([x, y, z, w, h, d, c, e]);
    const female = s.gender === "female", robe = s.classId === "wizard" || s.classId === "cleric";
    const bw = female ? 0.29 : 0.41, arm = bw / 2 + (female ? 0.055 : 0.08), aw = female ? 0.1 : 0.14, o = s.outfit, cls = s.classId, trim = s.trim, cloth = s.cloth, c2 = s.cloth2;
    const sleeve = o === "vest" || o === "scholar" || o === "surplice" ? CREAM : o === "mail" || o === "tabard" ? MAIL : cloth;
    const torso = o === "mail" || o === "tabard" ? MAIL : o === "leather" || o === "studded" ? s.leather : o === "surplice" ? CREAM : cloth;
    if (robe) {
      const rw = female ? bw + 0.22 : bw + 0.06;
      B(0, 0.31, 0, rw, 0.3, 0.3, o === "surplice" ? CREAM : cloth);
      B(0, 0.17, 0, rw + 0.02, 0.045, 0.32, trim);
      for (const sx of [-1, 1]) B(sx * 0.1, 0.14, 0.07, 0.14, 0.06, 0.16, s.boots);
    } else {
      for (const sx of [-1, 1]) {
        B(sx * 0.1, 0.2, 0.03, 0.15, 0.13, 0.2, s.boots);
        B(sx * 0.1, 0.32, 0.02, 0.14, 0.1, 0.15, c2);
      }
      if (female) {
        B(0, 0.37, 0, 0.46, 0.12, 0.3, c2);
        B(0, 0.305, 0, 0.48, 0.028, 0.32, trim);
      }
    }
    B(0, 0.56, 0, bw, 0.26, 0.25, torso);
    B(0, 0.43, 0, bw + 0.02, 0.05, 0.27, o === "monk" ? 13154442 : s.leather);
    B(0, 0.43, 0.14, 0.08, 0.065, 0.03, cls === "wizard" ? s.gem : trim);
    for (const sx of [-1, 1]) {
      B(sx * arm, 0.55, 0, aw, 0.24, female ? 0.15 : 0.18, sleeve);
      B(sx * arm, 0.4, 0.02, aw - 0.02, 0.08, female ? 0.1 : 0.12, s.skin);
    }
    B(0, 0.9, 0.02, 0.46, 0.42, 0.4, s.skin);
    face(B, s);
    hair(B, s);
    ears(B, s);
    if (s.beard !== "none") beard(B, s);
    marks(B, s);
    OUTFIT[cls](B, s, bw, arm, o);
    if (s.cape !== "none") cape(B, s, bw);
    headgear(B, s);
    accessories(B, s, bw, arm);
    held(B, s, arm, trim);
    separateCoplanarFaces(out);
    if (opts.texel ?? RULES.texel) out.push(...texelPass(out, texelRole(s)));
    return out;
  }
  function separateCoplanarFaces(boxes) {
    const relief = 5e-4, layers = boxes.map(() => Array(6).fill(0));
    for (let j = 0; j < boxes.length; j++) for (let i = 0; i < j; i++) {
      const a = boxes[i], b = boxes[j];
      for (let axis = 0; axis < 3; axis++) {
        if (![0, 1, 2].filter((k) => k !== axis).every((k) => Math.min(a[k] + a[k + 3] / 2, b[k] + b[k + 3] / 2) - Math.max(a[k] - a[k + 3] / 2, b[k] - b[k + 3] / 2) > 1e-8)) continue;
        for (const sign of [-1, 1]) {
          const face2 = axis * 2 + (sign === 1 ? 1 : 0);
          if (Math.abs(a[axis] + sign * a[axis + 3] / 2 - b[axis] - sign * b[axis + 3] / 2) < 1e-8)
            layers[j][face2] = Math.max(layers[j][face2], layers[i][face2] + 1);
        }
      }
    }
    boxes.forEach((b, i) => {
      for (let axis = 0; axis < 3; axis++) {
        const lo = layers[i][axis * 2] * relief, hi = layers[i][axis * 2 + 1] * relief;
        b[axis] += (hi - lo) / 2;
        b[axis + 3] += hi + lo;
      }
    });
  }
  function texelRole(s) {
    const hair2 = [s.hair, s.hair2, s.beardC, s.brow], metal = [STEEL, MAIL, IRON, s.trim], cloth = [s.cloth, s.cloth2, s.capeC, s.hat, s.accent, CREAM, GREEN];
    return (c) => c === s.skin ? "skin" : hair2.includes(c) ? "hair" : metal.includes(c) ? "metal" : cloth.includes(c) ? "cloth" : "other";
  }
  function face(B, s) {
    const E = s.eye, dark = RULES.defaultEye, colored = E !== dark, patch = s.accessories.includes("eyepatch"), fem = s.gender === "female", lip = fem ? 13130346 : LIP;
    for (const sx of [-1, 1]) {
      if (patch && sx === -1) continue;
      const x = sx * 0.1;
      switch (s.eyes) {
        case "wide":
          B(x, 0.89, 0.226, 0.085, 0.075, 0.012, E);
          if (colored) B(x, 0.89, 0.232, 0.035, 0.045, 0.012, dark);
          break;
        case "narrow":
          B(x, 0.885, 0.226, 0.08, 0.04, 0.012, E);
          break;
        case "happy":
          B(x, 0.885, 0.226, 0.09, 0.025, 0.012, E);
          B(x - 0.045, 0.862, 0.226, 0.025, 0.025, 0.012, E);
          B(x + 0.045, 0.862, 0.226, 0.025, 0.025, 0.012, E);
          break;
        case "sleepy":
          B(x, 0.88, 0.226, 0.07, 0.055, 0.012, E);
          B(x, 0.915, 0.228, 0.085, 0.028, 0.012, shade(s.skin, 0.82));
          break;
        case "sparkle":
          B(x, 0.895, 0.226, 0.075, 0.1, 0.012, E);
          if (colored) B(x, 0.88, 0.232, 0.035, 0.05, 0.012, dark);
          B(x + 0.016, 0.92, 0.234, 0.022, 0.026, 0.012, WHITE);
          break;
        case "big":
          B(x, 0.885, 0.226, 0.09, 0.11, 0.012, E);
          if (colored) B(x, 0.875, 0.232, 0.04, 0.055, 0.012, dark);
          B(x + 0.018, 0.915, 0.234, 0.03, 0.03, 0.012, WHITE);
          break;
        default:
          B(x, 0.89, 0.226, 0.06, 0.085, 0.012, E);
      }
    }
    if (fem) for (const sx of [-1, 1]) {
      if (!(patch && sx === -1)) {
        B(sx * 0.155, 0.935, 0.227, 0.035, 0.03, 0.012, INK);
        if (s.eyes !== "happy") B(sx * 0.1, 0.942, 0.227, 0.09, 0.014, 0.012, INK);
      }
      B(sx * 0.15, 0.815, 0.226, 0.06, 0.035, 0.012, mix(s.skin, 15043210, 0.35));
    }
    if (patch) {
      B(-0.1, 0.89, 0.232, 0.13, 0.11, 0.014, INK);
      B(0, 0.985, 0.226, 0.47, 0.022, 0.014, INK);
    }
    const br = (x, y, w, h) => B(x, y, 0.226, w, h, 0.012, s.brow);
    for (const sx of [-1, 1]) {
      switch (s.brows) {
        case "soft":
          br(sx * 0.1, 0.955, 0.08, 0.018);
          break;
        case "straight":
          br(sx * 0.1, 0.955, 0.1, 0.03);
          break;
        case "angry":
          br(sx * 0.075, 0.94, 0.06, 0.03);
          br(sx * 0.14, 0.965, 0.06, 0.03);
          break;
        case "raised":
          br(sx * 0.1, 0.99, 0.09, 0.028);
          break;
        case "thick":
          br(sx * 0.1, 0.955, 0.11, 0.045);
          break;
        case "thin":
          br(sx * 0.1, 0.96, 0.1, 0.014);
          break;
        case "sad":
          br(sx * 0.075, 0.965, 0.06, 0.025);
          br(sx * 0.14, 0.945, 0.06, 0.025);
          break;
        default:
      }
    }
    const m = (x, y, w, h, c = lip, z = 0.236) => B(x, y + 0.015, z, w, h, 0.012, c);
    switch (s.mouth) {
      case "neutral":
        m(0, 0.785, 0.08, 0.02);
        break;
      case "grin":
        m(0, 0.78, 0.14, 0.04, MOUTH);
        m(0, 0.796, 0.12, 0.016, TEETH, 0.238);
        m(-0.075, 0.8, 0.022, 0.022);
        m(0.075, 0.8, 0.022, 0.022);
        break;
      case "smirk":
        m(-0.01, 0.78, 0.07, 0.02);
        m(0.05, 0.79, 0.04, 0.02);
        m(0.08, 0.806, 0.022, 0.022);
        break;
      case "open":
        m(0, 0.775, 0.06, 0.05, MOUTH);
        m(0, 0.762, 0.04, 0.018, 12603482, 0.238);
        break;
      case "cat":
        m(-0.035, 0.775, 0.045, 0.02);
        m(0.035, 0.775, 0.045, 0.02);
        m(0, 0.79, 0.025, 0.03);
        break;
      case "frown":
        m(0, 0.78, 0.08, 0.02);
        m(-0.05, 0.765, 0.022, 0.022);
        m(0.05, 0.765, 0.022, 0.022);
        break;
      default:
        m(0, 0.78, fem ? 0.105 : 0.09, fem ? 0.028 : 0.02);
        m(-0.055, 0.795, 0.022, 0.022);
        m(0.055, 0.795, 0.022, 0.022);
    }
  }
  function ears(B, s) {
    for (const sx of [-1, 1]) {
      if (s.ears === "small") B(sx * 0.235, 0.88, 0.02, 0.03, 0.07, 0.06, s.skin);
      else if (s.ears === "pointed") {
        B(sx * 0.255, 0.9, 0.02, 0.06, 0.1, 0.06, s.skin);
        B(sx * 0.285, 0.96, 0.02, 0.04, 0.07, 0.05, s.skin);
      } else if (s.ears === "long") {
        B(sx * 0.26, 0.9, 0.02, 0.07, 0.09, 0.06, s.skin);
        B(sx * 0.31, 0.97, 0.02, 0.05, 0.09, 0.05, s.skin);
        B(sx * 0.34, 1.04, 0.02, 0.04, 0.07, 0.05, s.skin);
      } else B(sx * 0.24, 0.88, 0.02, 0.04, 0.09, 0.07, s.skin);
    }
  }
  function beard(B, s) {
    const b = s.beardC, st = mix(s.skin, b, 0.3);
    const jaw = () => {
      B(0, 0.75, 0.205, 0.34, 0.15, 0.05, b);
      for (const sx of [-1, 1]) B(sx * 0.17, 0.83, 0.2, 0.05, 0.2, 0.05, b);
    };
    const cheeks = () => {
      for (const sx of [-1, 1]) B(sx * 0.21, 0.8, 0.12, 0.05, 0.26, 0.2, b);
      B(0, 0.818, 0.238, 0.18, 0.03, 0.04, b);
    };
    switch (s.beard) {
      case "stubble":
        B(0, 0.745, 0.221, 0.42, 0.1, 0.012, st);
        B(0, 0.815, 0.221, 0.3, 0.035, 0.012, st);
        break;
      case "mustache":
        B(0, 0.818, 0.238, 0.2, 0.04, 0.04, b);
        for (const sx of [-1, 1]) B(sx * 0.115, 0.8, 0.236, 0.04, 0.05, 0.04, b);
        break;
      case "goatee":
        B(0, 0.74, 0.228, 0.1, 0.12, 0.04, b);
        B(0, 0.818, 0.238, 0.14, 0.03, 0.04, b);
        break;
      case "short":
        jaw();
        break;
      case "full":
        jaw();
        cheeks();
        break;
      case "long":
        jaw();
        cheeks();
        B(0, 0.6, 0.2, 0.3, 0.2, 0.07, b);
        B(0, 0.48, 0.2, 0.2, 0.14, 0.06, b);
        break;
      case "sideburns":
        for (const sx of [-1, 1]) {
          B(sx * 0.225, 0.88, 0.19, 0.04, 0.22, 0.07, b);
          B(sx * 0.2, 0.82, 0.2, 0.05, 0.1, 0.05, b);
        }
        break;
      default:
    }
  }
  function marks(B, s) {
    const has = (k) => s.marks.includes(k), z = 0.229, P2 = 0.03;
    const px = (x, y, c, w = P2, h = P2) => B(x, y, z, w, h, 0.012, c);
    const scarC = s.markC ?? mix(s.skin, 11878463, 0.55), scarEdge = mix(s.skin, 16777215, 0.38);
    if (has("freckles")) for (const sx of [-1, 1]) for (const [x, y] of [[0.08, 0.835], [0.125, 0.84], [0.105, 0.815], [0.15, 0.82]]) px(sx * x, y, 10119750, 0.02, 0.02);
    if (has("blush")) for (const sx of [-1, 1]) B(sx * 0.15, 0.812, z, 0.07, 0.04, 0.012, 14715514);
    if (has("scar")) for (const [x, y] of [[-0.178, 0.812], [-0.158, 0.784], [-0.138, 0.756], [-0.118, 0.728]]) {
      px(x + 0.024, y, scarEdge, 0.014, P2);
      px(x, y, scarC);
    }
    if (has("browscar")) {
      for (const [x, y] of [[-0.13, 1.03], [-0.122, 1], [-0.114, 0.97]]) {
        px(x + 0.022, y, scarEdge, 0.012, P2);
        px(x, y, scarC, 0.026, P2);
      }
      px(-0.152, 0.985, scarC, 0.026, 0.014);
      px(-0.1, 0.985, scarC, 0.026, 0.014);
    }
    if (has("mole")) px(0.075, 0.775, 4861733, 0.022, 0.022);
    if (has("warpaint")) {
      const c = s.markC ?? 11546429;
      for (const sx of [-1, 1]) for (const off of [0, 0.045]) for (let i = 0; i < 3; i++) px(sx * (0.175 - off - i * 0.022), 0.812 - i * 0.03, c, 0.034, P2);
    }
    if (has("plaster")) {
      B(0, 0.835, z, 0.072, 0.03, 0.012, 15787212);
      B(0, 0.835, 0.23, 0.032, 0.075, 0.012, 15787212);
      B(0, 0.835, 0.232, 0.018, 0.018, 0.012, mix(15787212, 11901546, 0.5));
    }
  }
  function hair(B, s) {
    const h = s.hair, t = s.hair2 || h, st = s.hairStyle, hg = s.headgear;
    if (st === "bald" || hg === "hood") return;
    const top = [], front = [], low = [], H = (arr, x, y, z, w, hh, d, c = h) => arr.push([x, y, z, w, hh, d, c]);
    const cap = () => H(top, 0, 1.13, 0, 0.5, 0.1, 0.46);
    const fringe = () => {
      H(front, 0, 1.06, 0.21, 0.48, 0.07, 0.06);
      for (const sx of [-1, 1]) H(front, sx * 0.2, 1, 0.21, 0.08, 0.12, 0.06);
    };
    const sides = (hh = 0.24, y = 0.98) => {
      for (const sx of [-1, 1]) H(low, sx * 0.26, y, 0, 0.05, hh, 0.42);
    };
    let backZ = -0.255;
    switch (st) {
      case "buzz":
        H(top, 0, 1.125, 0, 0.48, 0.07, 0.43);
        H(front, 0, 1.07, 0.205, 0.46, 0.07, 0.04);
        for (const sx of [-1, 1]) H(low, sx * 0.245, 0.99, 0, 0.02, 0.16, 0.38);
        backZ = -0.2;
        break;
      case "short":
        cap();
        fringe();
        sides();
        H(low, 0, 0.93, -0.22, 0.5, 0.38, 0.07);
        H(top, -0.1, 1.2, 0.02, 0.16, 0.08, 0.22);
        H(top, 0.12, 1.21, -0.06, 0.16, 0.1, 0.16);
        H(top, 0, 1.19, 0.13, 0.2, 0.05, 0.1);
        break;
      case "spiky":
        cap();
        fringe();
        sides(0.2, 1);
        H(low, 0, 0.95, -0.22, 0.5, 0.32, 0.07);
        for (const [x, y, z, w, hh] of [[-0.18, 1.2, 0.06, 0.1, 0.14], [-0.06, 1.23, 0.08, 0.1, 0.2], [0.06, 1.23, 0, 0.1, 0.2], [0.18, 1.2, -0.04, 0.1, 0.14], [0, 1.2, -0.14, 0.12, 0.14]]) H(top, x, y, z, w, hh, 0.1);
        break;
      case "mohawk":
        H(top, 0, 1.22, 0, 0.12, 0.22, 0.42);
        H(top, 0, 1.35, -0.05, 0.12, 0.08, 0.26);
        H(top, 0, 1.12, 0, 0.3, 0.04, 0.44);
        H(low, 0, 0.98, -0.2, 0.12, 0.3, 0.05);
        for (const sx of [-1, 1]) H(low, sx * 0.245, 1.02, 0, 0.02, 0.1, 0.36, shade(h, 0.6));
        backZ = -0.225;
        break;
      case "sweep":
        cap();
        sides();
        H(low, 0, 0.93, -0.22, 0.5, 0.38, 0.07);
        H(top, -0.05, 1.19, 0, 0.34, 0.07, 0.3);
        H(front, 0.12, 1.1, 0.22, 0.2, 0.06, 0.05);
        H(front, 0, 1.06, 0.22, 0.2, 0.06, 0.05);
        H(front, -0.12, 1.02, 0.22, 0.2, 0.06, 0.05);
        H(front, -0.2, 0.95, 0.22, 0.07, 0.12, 0.05);
        break;
      case "bob":
        cap();
        H(front, 0, 1.04, 0.215, 0.48, 0.1, 0.05);
        for (const sx of [-1, 1]) H(low, sx * 0.27, 0.84, 0, 0.07, 0.34, 0.42);
        H(low, 0, 0.85, -0.22, 0.58, 0.4, 0.1);
        backZ = -0.272;
        break;
      case "long":
        cap();
        fringe();
        for (const sx of [-1, 1]) H(low, sx * 0.27, 0.8, 0, 0.07, 0.5, 0.38);
        H(low, 0, 0.76, -0.24, 0.54, 0.64, 0.1);
        H(top, 0, 1.2, -0.02, 0.3, 0.08, 0.3);
        backZ = -0.292;
        break;
      case "wavy":
        H(top, 0, 1.14, 0, 0.54, 0.12, 0.5);
        H(top, 0, 1.22, -0.02, 0.38, 0.06, 0.34);
        H(front, -0.12, 1.05, 0.215, 0.26, 0.08, 0.05);
        H(front, 0.14, 1.07, 0.215, 0.2, 0.06, 0.05);
        H(front, 0.24, 0.97, 0.2, 0.05, 0.14, 0.05);
        for (const sx of [-1, 1]) {
          H(low, sx * 0.29, 0.8, 0, 0.08, 0.5, 0.4);
          H(low, sx * 0.31, 0.56, 0.02, 0.07, 0.16, 0.34);
        }
        H(low, 0, 0.72, -0.25, 0.62, 0.76, 0.12);
        backZ = -0.312;
        break;
      case "ponytail":
        cap();
        fringe();
        sides(0.2, 1);
        H(low, 0, 0.95, -0.22, 0.5, 0.3, 0.07);
        H(top, 0, 1.17, -0.17, 0.14, 0.1, 0.1, s.trim);
        H(top, 0, 1.22, -0.26, 0.16, 0.16, 0.14);
        H(top, 0, 1.05, -0.31, 0.16, 0.38, 0.12);
        H(top, 0, 0.83, -0.31, 0.12, 0.14, 0.1, t);
        backZ = -0.32;
        break;
      case "bun":
        cap();
        fringe();
        sides();
        H(low, 0, 0.93, -0.22, 0.5, 0.34, 0.07);
        H(top, 0, 1.24, -0.02, 0.2, 0.12, 0.2);
        H(top, 0, 1.33, -0.02, 0.14, 0.08, 0.14);
        H(top, 0, 1.19, -0.02, 0.22, 0.03, 0.22, s.trim);
        break;
      case "twin":
        cap();
        fringe();
        sides(0.2, 1);
        H(low, 0, 0.95, -0.21, 0.5, 0.3, 0.06);
        for (const sx of [-1, 1]) {
          H(low, sx * 0.3, 0.96, -0.04, 0.1, 0.5, 0.14);
          H(low, sx * 0.3, 0.66, -0.04, 0.1, 0.1, 0.14, t);
          H(low, sx * 0.28, 1.1, -0.04, 0.12, 0.05, 0.14, s.trim);
        }
        break;
      case "braid":
        cap();
        fringe();
        sides(0.2, 1);
        H(low, 0, 0.93, -0.22, 0.5, 0.4, 0.07);
        H(low, 0.22, 0.88, 0.12, 0.1, 0.12, 0.1);
        H(low, 0.22, 0.76, 0.14, 0.09, 0.1, 0.1);
        H(low, 0.22, 0.64, 0.16, 0.1, 0.1, 0.1);
        H(low, 0.22, 0.55, 0.17, 0.09, 0.08, 0.09, t);
        H(low, 0.22, 0.5, 0.18, 0.1, 0.04, 0.1, s.trim);
        break;
      case "curly":
        H(top, 0, 1.2, 0, 0.62, 0.28, 0.56);
        for (const sx of [-1, 1]) {
          H(low, sx * 0.31, 1.04, 0, 0.1, 0.3, 0.5);
          H(front, sx * 0.16, 1.07, 0.23, 0.14, 0.08, 0.06);
        }
        H(low, 0, 1, -0.27, 0.6, 0.4, 0.12);
        backZ = -0.332;
        break;
      default:
        cap();
        fringe();
        sides();
        H(low, 0, 0.93, -0.22, 0.5, 0.38, 0.07);
    }
    if (s.hair2 && st !== "buzz") {
      front.push([-0.14, 0.985, 0.223, 0.06, 0.2, 0.04, s.hair2]);
      low.push([0.12, 0.93, backZ, 0.1, 0.3, 0.02, s.hair2]);
    }
    if (s.gender === "female" && !["buzz", "mohawk"].includes(st)) for (const sx of [-1, 1]) H(front, sx * 0.235, 0.86, 0.2, 0.055, 0.27, 0.06);
    const hide = hg === "helm" ? ["top", "front"] : hg === "wizhat" || hg === "cap" ? ["top"] : [];
    for (const [name, arr] of [["top", top], ["front", front], ["low", low]]) if (!hide.includes(name)) for (const b of arr) B(b[0], b[1], b[2], b[3], b[4], b[5], b[6]);
  }
  var OUTFIT = {
    fighter(B, s, bw, arm, o) {
      const { trim } = s;
      const paul = (w, hh) => {
        for (const sx of [-1, 1]) {
          B(sx * arm, 0.7, 0, w, 0.07, 0.2, trim);
          B(sx * arm, 0.66, 0, w, hh, 0.18, s.cloth2);
        }
      };
      if (o === "plate") {
        paul(0.17, 0.08);
        for (const sx of [-1, 1]) B(sx * 0.07, 0.62, 0.13, 0.03, 0.15, 0.012, trim);
        B(0, 0.685, 0.13, 0.16, 0.03, 0.012, trim);
        B(0, 0.71, -0.02, bw + 0.02, 0.03, 0.27, trim);
      }
      if (o === "tabard") {
        B(0, 0.4, 0.135, 0.22, 0.4, 0.012, s.cloth);
        B(0, 0.53, 0.145, 0.03, 0.15, 0.012, trim);
        B(0, 0.56, 0.145, 0.11, 0.03, 0.012, trim);
        B(0, 0.21, 0.136, 0.22, 0.03, 0.012, trim);
        B(0, 0.71, 0, bw + 0.02, 0.03, 0.27, trim);
      }
      if (o === "leather") {
        B(0, 0.56, 0.13, bw - 0.06, 0.25, 0.012, s.cloth);
        B(0, 0.56, 0.136, 0.02, 0.25, 0.012, shade(s.leather, 0.6));
        for (const sx of [-1, 1]) {
          B(sx * arm, 0.66, 0, 0.15, 0.06, 0.19, s.cloth);
          B(sx * 0.12, 0.56, 0.14, 0.05, 0.05, 0.012, trim);
        }
        B(0, 0.71, 0, bw + 0.02, 0.03, 0.27, trim);
      }
      if (o === "knight") {
        paul(0.2, 0.12);
        B(0, 0.72, 0, bw - 0.02, 0.06, 0.29, STEEL);
        B(0, 0.6, 0.13, bw - 0.04, 0.2, 0.012, STEEL);
        B(0, 0.6, 0.14, 0.03, 0.16, 0.012, trim);
        B(0, 0.63, 0.14, 0.12, 0.03, 0.012, trim);
        B(0, 0.385, 0.1, bw + 0.02, 0.08, 0.29, STEEL);
        B(0, 0.35, 0.1, bw + 0.02, 0.02, 0.29, trim);
      }
    },
    wizard(B, s, bw, arm, o) {
      const { trim } = s;
      for (const sx of [-1, 1]) B(sx * arm, 0.47, 0, 0.14, 0.04, 0.19, trim);
      if (o === "robe") {
        for (const sx of [-1, 1]) B(sx * 0.1, 0.57, 0.128, 0.045, 0.24, 0.012, trim);
        B(0, 0.71, 0, bw + 0.02, 0.04, 0.27, trim);
        B(0, 0.5, 0.128, 0.03, 0.1, 0.012, trim);
      }
      if (o === "mantle") {
        B(0, 0.72, 0, bw + 0.13, 0.09, 0.31, s.cloth2);
        B(0, 0.665, 0, bw + 0.15, 0.025, 0.33, trim);
        B(0, 0.78, -0.1, 0.3, 0.12, 0.08, s.cloth2);
        B(0, 0.72, 0.16, 0.05, 0.05, 0.02, s.gem);
      }
      if (o === "sash") {
        const sc = s.accent ?? s.cloth2;
        for (let i = 0; i < 5; i++) B(-0.12 + i * 0.06, 0.68 - i * 0.055, 0.13, 0.09, 0.07, 0.012, sc);
        B(0, 0.45, 0, bw + 0.04, 0.1, 0.27, sc);
        B(0.09, 0.34, 0.14, 0.06, 0.12, 0.02, sc);
        B(-0.02, 0.33, 0.14, 0.06, 0.1, 0.02, sc);
      }
      if (o === "scholar") {
        B(0, 0.56, 0.13, bw - 0.1, 0.25, 0.012, s.cloth2);
        B(0, 0.64, 0.14, 0.1, 0.1, 0.012, CREAM);
        B(0, 0.6, 0.145, 0.02, 0.2, 0.012, trim);
        B(0.19, 0.33, 0.12, 0.12, 0.12, 0.07, s.leather);
        B(0.19, 0.385, 0.12, 0.13, 0.03, 0.075, trim);
      }
    },
    rogue(B, s, bw, arm, o) {
      const { trim, leather } = s;
      if (o === "leathers") {
        for (let i = 0; i < 5; i++) B(-0.12 + i * 0.06, 0.67 - i * 0.06, 0.13, 0.075, 0.06, 0.02, leather);
        B(0.18, 0.33, 0.12, 0.12, 0.12, 0.07, leather);
        B(0.18, 0.385, 0.12, 0.13, 0.03, 0.075, trim);
      }
      if (o === "vest") {
        B(0, 0.56, 0.128, 0.06, 0.24, 0.012, CREAM);
        for (const sx of [-1, 1]) B(sx * 0.1, 0.56, 0.13, 0.1, 0.25, 0.012, leather);
        for (let i = 0; i < 3; i++) B(0, 0.64 - i * 0.07, 0.14, 0.09, 0.015, 0.012, trim);
      }
      if (o === "tunic") {
        B(0, 0.36, 0, bw + 0.02, 0.2, 0.28, s.cloth);
        B(0, 0.255, 0, bw + 0.04, 0.025, 0.3, trim);
        B(0, 0.43, 0, bw + 0.03, 0.05, 0.29, leather);
        B(0, 0.43, 0.15, 0.08, 0.065, 0.03, trim);
        B(0.14, 0.3, 0.15, 0.09, 0.09, 0.02, s.cloth2);
      }
      if (o === "studded") {
        for (let r = 0; r < 2; r++) for (let c = 0; c < 3; c++) B(-0.1 + c * 0.1, 0.64 - r * 0.1, 0.135, 0.035, 0.035, 0.02, STEEL);
        B(-0.2, 0.71, 0, 0.17, 0.07, 0.2, leather);
        B(-0.2, 0.74, 0, 0.12, 0.03, 0.15, trim);
        B(0.18, 0.33, 0.12, 0.12, 0.12, 0.07, leather);
      }
    },
    cleric(B, s, bw, arm, o) {
      const { trim } = s;
      if (o === "vestments") {
        B(0, 0.5, 0.128, 0.15, 0.36, 0.012, GREEN);
        B(0, 0.66, 0.12, bw - 0.02, 0.06, 0.26, CREAM);
        for (const sx of [-1, 1]) {
          B(sx * 0.13, 0.55, 0.13, 0.08, 0.26, 0.012, CREAM);
          B(sx * arm, 0.43, 0, 0.14, 0.04, 0.19, CREAM);
        }
        B(0, 0.59, 0.142, 0.03, 0.13, 0.012, trim);
        B(0, 0.615, 0.142, 0.095, 0.03, 0.012, trim);
        B(0, 0.3, 0.16, 0.24, 0.24, 0.012, GREEN);
        B(0, 0.3, 0.17, 0.03, 0.1, 0.012, trim);
      }
      if (o === "surplice") {
        for (const sx of [-1, 1]) {
          B(sx * 0.09, 0.5, 0.13, 0.04, 0.38, 0.012, s.cloth2);
          B(sx * arm, 0.43, 0, 0.14, 0.04, 0.19, s.cloth2);
        }
        B(0, 0.66, 0.12, bw - 0.02, 0.05, 0.26, s.cloth2);
        B(0, 0.59, 0.142, 0.03, 0.13, 0.012, trim);
        B(0, 0.615, 0.142, 0.095, 0.03, 0.012, trim);
        B(0, 0.17, 0, bw + 0.13, 0.03, 0.33, s.cloth2);
      }
      if (o === "mail") {
        for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if ((r + c) % 2 === 0) B(-0.12 + c * 0.08, 0.66 - r * 0.06, 0.13, 0.05, 0.03, 0.012, STEEL);
        B(0, 0.69, 0, bw, 0.05, 0.27, shade(MAIL, 1.15));
        B(0, 0.36, 0.135, 0.22, 0.34, 0.012, s.cloth);
        B(0, 0.45, 0.145, 0.03, 0.14, 0.012, trim);
        B(0, 0.48, 0.145, 0.1, 0.03, 0.012, trim);
        for (const sx of [-1, 1]) B(sx * arm, 0.43, 0, 0.14, 0.04, 0.19, trim);
      }
      if (o === "monk") {
        B(0, 0.66, 0, bw - 0.02, 0.05, 0.26, s.cloth2);
        B(0.06, 0.31, 0.145, 0.04, 0.18, 0.03, 13154442);
        B(0.06, 0.2, 0.145, 0.06, 0.04, 0.04, 13154442);
        for (let i = 0; i < 4; i++) B(-0.1 + i * 0.028, 0.6 - Math.abs(i - 1.5) * 0.02, 0.14, 0.03, 0.03, 0.012, WOOD);
        for (const sx of [-1, 1]) B(sx * arm, 0.43, 0, 0.14, 0.04, 0.19, s.cloth2);
      }
    }
  };
  function cape(B, s, bw) {
    const c = s.capeC, t = s.trim;
    if (s.cape === "short") {
      B(0, 0.72, 0, bw + 0.13, 0.09, 0.32, c);
      B(0, 0.56, -0.17, bw + 0.02, 0.42, 0.06, c);
    }
    if (s.cape === "long") {
      B(0, 0.72, 0, bw + 0.13, 0.09, 0.32, c);
      B(0, 0.42, -0.18, bw + 0.06, 0.66, 0.06, c);
      B(0, 0.095, -0.18, bw + 0.06, 0.03, 0.06, t);
      for (const sx of [-1, 1]) B(sx * (bw / 2 + 0.05), 0.55, -0.06, 0.05, 0.3, 0.2, c);
    }
    if (s.cape === "mantle") {
      B(0, 0.72, 0, bw + 0.17, 0.1, 0.34, c);
      B(0, 0.64, 0, bw + 0.19, 0.06, 0.32, c);
      B(0, 0.605, 0, bw + 0.2, 0.02, 0.33, t);
      B(0, 0.71, 0.17, 0.05, 0.05, 0.02, t);
      B(0, 0.62, -0.18, bw + 0.04, 0.25, 0.05, c);
    }
  }
  function headgear(B, s) {
    const hg = s.headgear, t = s.trim, hat = s.hat;
    if (hg === "hood") {
      const c = hat ?? (s.classId === "cleric" ? CREAM : s.cloth), r = s.classId === "cleric" && !hat ? s.cloth : s.trim;
      B(0, 1.14, 0, 0.56, 0.1, 0.5, c);
      B(0, 1.185, 0, 0.56, 0.03, 0.5, r);
      B(0, 0.92, -0.24, 0.56, 0.56, 0.1, c);
      B(0, 0.98, -0.295, 0.3, 0.4, 0.02, r);
      for (const sx of [-1, 1]) {
        B(sx * 0.29, 0.9, -0.02, 0.07, 0.5, 0.42, c);
        B(sx * 0.3, 1, 0, 0.02, 0.06, 0.42, r);
      }
      B(0, 1.05, 0.21, 0.46, 0.06, 0.05, c);
      if (s.hairStyle !== "bald") {
        B(0, 1, 0.205, 0.46, 0.07, 0.06, s.hair);
        for (const sx of [-1, 1]) B(sx * 0.2, 0.93, 0.205, 0.08, 0.14, 0.06, s.hair);
        if (s.hair2) B(-0.14, 0.96, 0.223, 0.06, 0.14, 0.04, s.hair2);
      }
    }
    if (hg === "wizhat") {
      const c = hat ?? s.cloth;
      B(0, 1.12, 0, 0.74, 0.05, 0.7, c);
      B(0, 1.2, 0, 0.46, 0.12, 0.44, c);
      B(0, 1.31, -0.02, 0.34, 0.1, 0.32, c);
      B(0, 1.41, -0.05, 0.22, 0.1, 0.2, c);
      B(0.02, 1.5, -0.09, 0.12, 0.1, 0.12, c);
      B(0, 1.15, 0, 0.5, 0.04, 0.48, t);
    }
    if (hg === "helm") {
      const c = hat ?? STEEL;
      B(0, 1.13, 0, 0.54, 0.14, 0.5, c);
      for (const sx of [-1, 1]) B(sx * 0.265, 0.99, 0, 0.04, 0.3, 0.44, c);
      B(0, 0.96, 0.235, 0.05, 0.2, 0.02, c);
      B(0, 0.95, -0.235, 0.5, 0.3, 0.05, c);
      B(0, 1.065, 0, 0.545, 0.025, 0.505, t);
      B(0, 1.24, 0, 0.06, 0.1, 0.3, t);
    }
    if (hg === "circlet") {
      B(0, 1.085, 0, 0.5, 0.03, 0.52, hat ?? t);
      B(0, 1.105, 0.262, 0.05, 0.07, 0.02, s.gem, true);
      B(0, 1.085, 0.262, 0.09, 0.02, 0.02, hat ?? t);
    }
    if (hg === "headband") {
      const c = hat ?? s.accent ?? s.cloth2;
      B(0, 1.05, 0, 0.5, 0.05, 0.52, c);
      B(0.26, 1.05, -0.04, 0.06, 0.1, 0.12, c);
      B(0.285, 0.97, -0.1, 0.04, 0.14, 0.06, c);
      B(0.285, 0.91, -0.12, 0.04, 0.08, 0.05, c);
    }
    if (hg === "cap") {
      const c = hat ?? s.cloth2;
      B(0, 1.15, 0, 0.52, 0.12, 0.48, c);
      B(0, 1.09, 0.25, 0.5, 0.035, 0.12, shade(c, 0.8));
      B(0.2, 1.23, -0.05, 0.04, 0.18, 0.06, t);
      B(0.22, 1.33, -0.07, 0.04, 0.1, 0.05, shade(t, 0.85));
    }
    if (hg === "crown") {
      B(0, 1.15, 0, 0.5, 0.07, 0.46, hat ?? t);
      for (const [x, hh] of [[-0.2, 0.06], [-0.1, 0.09], [0, 0.06], [0.1, 0.09], [0.2, 0.06]]) B(x, 1.185 + hh / 2, 0, 0.07, hh, 0.08, hat ?? t);
      B(0, 1.15, 0.232, 0.05, 0.05, 0.02, s.gem, true);
    }
  }
  function accessories(B, s, bw, arm) {
    const has = (k) => s.accessories.includes(k), t = s.trim;
    if (has("earring")) B(0.245, 0.81, 0.03, 0.03, 0.07, 0.035, t);
    if (has("glasses")) {
      for (const sx of [-1, 1]) {
        const x = sx * 0.1;
        B(x, 0.96, 0.238, 0.15, 0.02, 0.014, t);
        B(x, 0.82, 0.238, 0.15, 0.02, 0.014, t);
        B(x - 0.07, 0.89, 0.238, 0.02, 0.14, 0.014, t);
        B(x + 0.07, 0.89, 0.238, 0.02, 0.14, 0.014, t);
        B(sx * 0.245, 0.9, 0.03, 0.02, 0.02, 0.34, t);
      }
      B(0, 0.9, 0.238, 0.05, 0.02, 0.014, t);
    }
    if (has("scarf")) {
      const c = s.accent ?? s.cloth2;
      B(0, 0.7, 0, bw + 0.04, 0.07, 0.3, c);
      B(0.1, 0.58, 0.15, 0.1, 0.22, 0.03, c);
      B(0.1, 0.46, 0.15, 0.1, 0.03, 0.03, t);
    }
    if (has("amulet")) {
      B(0, 0.64, 0.135, 0.16, 0.02, 0.012, t);
      B(0, 0.5, 0.145, 0.05, 0.06, 0.02, s.gem, true);
      B(0, 0.56, 0.14, 0.02, 0.12, 0.012, t);
    }
    if (has("bracers")) for (const sx of [-1, 1]) {
      B(sx * arm, 0.47, 0, 0.145, 0.08, 0.195, s.leather);
      B(sx * arm, 0.515, 0, 0.15, 0.02, 0.2, t);
    }
  }
  function held(B, s, arm, trim) {
    const { classId: cls, hands } = s, has = (k) => hands.includes(k);
    if (has("sword")) {
      B(-0.34, 0.38, 0.09, 0.055, 0.1, 0.055, s.leather);
      B(-0.34, 0.45, 0.09, 0.17, 0.035, 0.075, trim);
      B(-0.34, 0.72, 0.09, 0.05, 0.5, 0.04, STEEL);
    }
    if (has("shield")) {
      const blue = cls === "fighter" ? s.cloth : s.p.cloth;
      B(0.33, 0.5, 0.17, 0.27, 0.38, 0.05, trim);
      B(0.33, 0.5, 0.2, 0.21, 0.32, 0.03, blue);
      B(0.33, 0.5, 0.222, 0.03, 0.18, 0.02, trim);
      B(0.33, 0.53, 0.222, 0.13, 0.03, 0.02, trim);
    }
    if (has("bow")) {
      for (let i = 0; i < 5; i++) B(-0.34 - Math.abs(i - 2) * -0.02, 0.36 + i * 0.12, 0.1, 0.06, 0.16, 0.05, 10648640);
      B(-0.4, 0.6, 0.1, 0.02, 0.6, 0.02, 12957841);
    }
    if (has("staff") && cls === "wizard") {
      B(-0.36, 0.62, 0.08, 0.05, 0.9, 0.05, WOOD);
      B(-0.36, 1.1, 0.08, 0.13, 0.06, 0.13, trim);
      B(-0.36, 1.2, 0.08, 0.09, 0.13, 0.09, s.gem, true);
    }
    if (has("staff") && cls !== "wizard") {
      B(-0.34, 0.58, 0.09, 0.05, 0.82, 0.05, WOOD);
      B(-0.34, 1.04, 0.09, 0.15, 0.15, 0.15, IRON);
      B(-0.34, 1.04, 0.09, 0.19, 0.04, 0.19, trim);
      B(-0.34, 1.04, 0.09, 0.04, 0.19, 0.19, trim);
    }
    if (s.book) B(-0.3, 0.45, 0.13, 0.13, 0.16, 0.045, 8007471);
  }
  var css = (c) => "#" + (c & 16777215).toString(16).padStart(6, "0");
  var VIEWS = { face: { y0: 0.66, y1: 1.14 }, head: { y0: 0.6, y1: 1.44 }, hat: { y0: 0.66, y1: 1.62 }, body: { y0: 0.1, y1: 1.36 }, full: { y0: 0.06, y1: 1.52 } };
  function portrait(kind, actor, opts = {}) {
    const s = spec(kind, actor);
    if (!s) return null;
    const boxes = build(s, { texel: opts.detail ?? RULES.texel }), W = opts.width || 168, H = opts.height || 192, px = opts.pixel || 3, back = !!opts.back, m = back ? -1 : 1;
    let top = 0;
    for (const b of boxes) top = Math.max(top, b[1] + b[4] / 2);
    const v = VIEWS[opts.view], y0 = v ? v.y0 : 0.5, y1 = v ? v.y1 : Math.min(1.7, Math.max(1.32, top + 0.03));
    const lw = Math.round(W / px), lh = Math.round(H / px), yspan = y1 - y0, xspan = yspan * W / H, x0 = -xspan / 2;
    const small = document.createElement("canvas");
    small.width = lw;
    small.height = lh;
    const c = small.getContext("2d");
    c.imageSmoothingEnabled = false;
    const sx = lw / xspan, sy = lh / yspan;
    const rect = (b) => {
      const l = Math.round((m * b[0] - b[3] / 2 - x0) * sx), r = Math.round((m * b[0] + b[3] / 2 - x0) * sx), t = Math.round((y1 - b[1] - b[4] / 2) * sy), bt = Math.round((y1 - b[1] + b[4] / 2) * sy);
      return [l, t, Math.max(b.length > 8 ? 0 : 1, r - l), Math.max(b.length > 8 ? 0 : 1, bt - t)];
    };
    const flat = boxes.filter((b) => b[8] !== "t"), order0 = flat;
    const order = order0.map((b, i) => [(b.length > 8 ? b[9] : b[2] + b[5] / 2) * m, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]).map((a) => order0[a[1]]);
    c.fillStyle = RULES.outline;
    for (const b of order) {
      if (b.length > 8 || b[4] < 0.05 && b[3] < 0.05) continue;
      const [l, t, w, h] = rect(b);
      c.fillRect(l - 1, t - 1, w + 2, h + 2);
    }
    for (const b of order) {
      const [l, t, w, h] = rect(b);
      c.fillStyle = css(b[6]);
      c.fillRect(l, t, w, h);
    }
    const big = document.createElement("canvas");
    big.width = W;
    big.height = H;
    big.className = "sprite character-portrait";
    const g = big.getContext("2d");
    g.imageSmoothingEnabled = false;
    g.drawImage(small, 0, 0, W, H);
    return big;
  }
  function npcPortrait(name, opts) {
    const id = NPC_BY_NAME[String(name || "").split(" \xB7 ")[0]];
    return id ? portrait(5, { npc: id }, opts) : null;
  }
  function modelStats(boxes) {
    let top = 0;
    for (const b of boxes) top = Math.max(top, b[1] + b[4] / 2);
    return { boxes: boxes.length, top };
  }
  return __toCommonJS(characters_exports);
})();
