var CharacterStyle = (() => {
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

  // src/character-style.js
  var character_style_exports = {};
  __export(character_style_exports, {
    NPCS: () => NPCS,
    ROLES: () => ROLES,
    STYLE: () => STYLE,
    STYLE_VERSION: () => STYLE_VERSION,
    characterParts: () => characterParts,
    characterProfile: () => characterProfile,
    npcActor: () => npcActor,
    npcDefinition: () => npcDefinition,
    tint: () => tint
  });
  var STYLE_VERSION = "approved-voxel-v1";
  var STYLE = { voxel: 0.07, height: 1.52, headWidth: 0.43, headHeight: 0.4, eyeHeight: 0.085, maxParts: 420, maxPalette: 32 };
  var ROLES = { fighter: { cloth: "#315e84", trim: "#c6a04f", hair: "#75462e", skin: "#efbc88" }, wizard: { cloth: "#62377e", trim: "#c6a04f", hair: "#c9c6d7", skin: "#efbc88" }, rogue: { cloth: "#487844", trim: "#c6a04f", hair: "#352b32", skin: "#efbc88" }, cleric: { cloth: "#8b3d46", trim: "#c6a04f", hair: "#734c32", skin: "#efbc88" }, skeleton: { cloth: "#813a36", trim: "#c6a04f", hair: "#352b32", skin: "#d9c9a5" }, dummy: { cloth: "#936c40", trim: "#c6a04f", hair: "#936c40", skin: "#936c40" } };
  var NPCS = Object.freeze({
    keeper: Object.freeze({ name: "\u042D\u043B\u043B\u0435\u043D", role: "\u0445\u0440\u0430\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u0438\u0446\u0430", classId: "cleric", appearance: Object.freeze({ gender: "female", hair: "#c9c6d7", hairStyle: "long", face: "soft" }), hood: true, hands: Object.freeze(["empty", "empty"]) }),
    novice: Object.freeze({ name: "\u041B\u0438\u043D", role: "\u043F\u043E\u0441\u043B\u0443\u0448\u043D\u0438\u043A", classId: "cleric", appearance: Object.freeze({ gender: "male", hair: "#75462e", hairStyle: "short", face: "soft" }), hood: false, hands: Object.freeze(["empty", "empty"]) })
  });
  var NPC_ALIASES = { ellen: "keeper", lin: "novice" };
  function npcDefinition(id) {
    const key = Object.hasOwn(NPC_ALIASES, id) ? NPC_ALIASES[id] : id;
    if (!Object.hasOwn(NPCS, key)) throw new Error("NPC must be registered in NPCS: " + id);
    return NPCS[key];
  }
  function npcActor(name) {
    const short = String(name || "").split(" \xB7 ")[0].trim(), id = Object.keys(NPCS).find((id2) => NPCS[id2].name === short);
    return id ? { name, kind: 5, npcId: id } : null;
  }
  function characterProfile(actor = {}, kind = actor.kind || 0) {
    const npcId = actor.npcId || (actor.type === "npc" ? actor.id : null), npc = npcId ? npcDefinition(npcId) : null;
    const role = npc?.classId || (actor.classId && Object.hasOwn(ROLES, actor.classId) ? actor.classId : ["rogue", "wizard", "fighter", "skeleton", "dummy", "cleric"][kind] || "cleric");
    const a = npc?.appearance || actor.appearance || {}, base = ROLES[role], gender = ["male", "female"].includes(a.gender) ? a.gender : !actor.appearance && kind === 1 ? "female" : "male", hex = (v, f) => /^#[a-f0-9]{6}$/i.test(v || "") ? v : f;
    return { style: STYLE_VERSION, role, gender, skin: hex(a.skin, base.skin), hair: hex(a.hair, gender === "female" && role === "cleric" ? "#c9c6d7" : gender === "female" && role === "fighter" ? "#d7a652" : base.hair), cloth: hex(a.cloth, base.cloth), trim: hex(a.trim, base.trim), hairStyle: ["short", "long", "bald"].includes(a.hairStyle) ? a.hairStyle : role === "cleric" && !npc && gender === "male" ? "bald" : gender === "female" && role !== "rogue" ? "long" : "short", face: ["soft", "stern", "beard"].includes(a.face) ? a.face : role === "cleric" && !npc && gender === "male" ? "beard" : "soft", hood: npc ? npc.hood : role === "cleric" && gender === "female", hands: npc?.hands || actor.hands || (role === "fighter" || role === "skeleton" ? ["sword", "shield"] : role === "wizard" || role === "cleric" ? ["staff", "empty"] : ["sword", "empty"]) };
  }
  function tint(hex, delta) {
    const n = parseInt(hex.slice(1), 16);
    return "#" + [n >> 16, n >> 8 & 255, n & 255].map((v) => Math.min(255, Math.max(0, v + delta)).toString(16).padStart(2, "0")).join("");
  }
  function characterParts(actor = {}, kind = actor.kind || 0) {
    const p = characterProfile(actor, kind), parts = [], B = (x, y, z, w, h, d, color, rz = 0) => parts.push({ x, y, z, w, h, d, color, rz }), female = p.gender === "female", cloth = p.cloth, gold = p.trim, leather = "#573b29", steel = "#9caeb9", skin = p.skin, light = tint(cloth, 17), dark = tint(cloth, -20), width = female ? 0.31 : 0.36;
    if (p.role === "dummy") {
      B(0, 0.6, 0, 0.1, 0.95, 0.1, leather);
      B(0, 0.85, 0, 0.65, 0.09, 0.1, "#a4814b");
      B(0, 1.15, 0, 0.39, 0.38, 0.34, "#b8955e");
      B(0, 1.15, 0.18, 0.28, 0.26, 0.015, "#843d32");
      B(0, 1.15, 0.196, 0.14, 0.13, 0.02, gold);
      return { profile: p, parts };
    }
    for (const x of [-0.115, 0.115]) {
      B(x, 0.22, 0.025, 0.17, 0.15, 0.26, leather);
      B(x, 0.29, 0.035, 0.18, 0.05, 0.23, tint(leather, 13));
      B(x, 0.405, 0, 0.145, 0.22, 0.18, "#343139");
      B(x, 0.335, 0.109, 0.145, 0.04, 0.025, gold);
      B(x, 0.22, 0.16, 0.15, 0.07, 0.025, tint(leather, -14));
    }
    B(0, 0.715, 0, width, 0.37, 0.26, cloth);
    B(0, 0.665, 0.139, width, 0.22, 0.018, dark);
    B(0, 0.87, 0.14, width, 0.045, 0.025, light);
    B(0, 0.535, 0, width + 0.045, 0.055, 0.295, leather);
    B(0, 0.535, 0.165, 0.09, 0.08, 0.04, gold);
    B(0, 0.535, 0.189, 0.043, 0.035, 0.014, leather);
    for (const x of [-(width / 2 + 0.065), width / 2 + 0.065]) {
      B(x, 0.79, 0, 0.13, 0.19, 0.21, cloth, x < 0 ? -0.13 : 0.13);
      B(x, 0.644, 0.035, 0.105, 0.12, 0.15, leather);
      B(x, 0.57, 0.05, 0.102, 0.09, 0.115, skin);
      B(x, 0.715, 0.11, 0.13, 0.035, 0.028, gold);
      B(x, 0.643, 0.12, 0.105, 0.025, 0.035, tint(leather, 18));
    }
    if (p.role === "fighter") {
      B(0, 0.74, 0.16, width + 0.01, 0.27, 0.07, dark);
      B(0, 0.75, 0.202, width - 0.035, 0.18, 0.025, light);
      B(0, 0.865, 0.193, width + 0.025, 0.045, 0.035, gold);
      B(0, 0.674, 0.202, width, 0.04, 0.03, gold);
      for (const x of [-0.25, 0.25]) {
        B(x, 0.9, 0, 0.2, 0.105, 0.265, cloth);
        B(x, 0.923, 0.02, 0.15, 0.045, 0.235, light);
        B(x, 0.858, 0.139, 0.205, 0.035, 0.025, gold);
        B(x, 0.75, 0.121, 0.12, 0.11, 0.04, steel);
        B(x, 0.717, 0.151, 0.12, 0.026, 0.02, "#c8d0d2");
      }
      for (const x of [-0.135, 0.135]) {
        B(x, 0.458, 0.045, 0.165, 0.11, 0.27, cloth);
        B(x, 0.422, 0.185, 0.165, 0.035, 0.02, gold);
        B(x, 0.47, 0.195, 0.07, 0.07, 0.012, light);
      }
      B(0, 0.765, 0.225, 0.035, 0.11, 0.015, gold);
      B(0, 0.485, 0.162, 0.075, 0.05, 0.018, "#c5a165");
    } else if (p.role === "wizard") {
      for (const x of [-0.11, 0.11]) {
        B(x, 0.457, 0, 0.13, female ? 0.3 : 0.22, 0.31, cloth);
        B(x, 0.34, 0.166, 0.13, 0.035, 0.025, gold);
        B(x, 0.65, 0.152, 0.028, 0.31, 0.025, gold);
        B(x, 0.47, 0.171, 0.045, 0.1, 0.02, light);
      }
      B(0, 0.73, 0.148, 0.09, 0.3, 0.028, "#343139");
      B(0, 0.871, 0.173, 0.05, 0.055, 0.03, gold);
      B(0, 0.873, 0.196, 0.022, 0.022, 0.017, "#63c6ed");
      for (const x of [-0.17, 0.17]) B(x, 0.874, 0.16, 0.07, 0.12, 0.09, light, x < 0 ? -0.22 : 0.22);
    } else if (p.role === "rogue") {
      B(0, 0.75, -0.17, 0.42, 0.38, 0.065, dark);
      B(0, 0.92, 0.02, 0.45, 0.09, 0.35, light);
      B(-0.17, 0.846, 0.129, 0.2, 0.07, 0.07, cloth, -0.3);
      B(0.12, 0.837, 0.152, 0.27, 0.07, 0.07, cloth, 0.22);
      B(0, 0.859, 0.196, 0.08, 0.06, 0.024, gold);
      B(-0.1, 0.725, 0.175, 0.05, 0.28, 0.035, leather, -0.6);
      B(0.085, 0.639, 0.175, 0.09, 0.07, 0.03, leather, -0.6);
      for (const x of [-0.16, 0.16]) {
        B(x, 0.496, 0.182, 0.1, 0.115, 0.06, leather);
        B(x, 0.529, 0.218, 0.1, 0.035, 0.025, tint(leather, 17));
        B(x, 0.509, 0.235, 0.025, 0.026, 0.014, gold);
      }
      for (const x of [-0.17, 0.17]) B(x, 0.428, -0.04, 0.075, 0.15, 0.27, cloth);
    } else if (p.role === "cleric") {
      for (const x of [-0.13, 0.13]) {
        B(x, 0.452, 0, 0.16, 0.3, 0.3, cloth);
        B(x, 0.316, 0.173, 0.16, 0.035, 0.025, "#dfcea6");
        B(x, 0.7, 0.163, 0.036, 0.3, 0.025, "#dfcea6");
      }
      B(0, 0.7, 0.168, 0.1, 0.3, 0.028, "#4d7541");
      for (const x of [-0.14, 0.14]) B(x, 0.904, 0.02, 0.2, 0.075, 0.32, "#dfcea6", x < 0 ? -0.18 : 0.18);
      B(0, 0.857, 0.176, 0.038, 0.14, 0.035, gold);
      B(0, 0.875, 0.18, 0.105, 0.032, 0.035, gold);
      for (const x of [-0.235, 0.235]) B(x, 0.73, 0.09, 0.13, 0.045, 0.22, "#dfcea6");
    }
    B(0, 1.145, 0.03, 0.43, 0.4, 0.35, skin);
    B(0, 0.955, 0.03, 0.13, 0.06, 0.14, skin);
    for (const x of [-0.239, 0.239]) B(x, 1.125, 0.045, 0.055, 0.11, 0.095, tint(skin, -9));
    B(0.205, 1.13, 0.06, 0.016, 0.33, 0.29, tint(skin, -15));
    B(-0.105, 1.319, 0.029, 0.2, 0.017, 0.32, tint(skin, 15));
    if (p.role === "skeleton") {
      B(0, 1.145, 0.03, 0.43, 0.4, 0.35, p.skin);
      for (const x of [-0.105, 0.105]) B(x, 1.15, 0.218, 0.094, 0.095, 0.028, "#292620");
      B(0, 1.075, 0.219, 0.049, 0.058, 0.022, "#292620");
      for (const x of [-0.12, -0.06, 0, 0.06, 0.12]) B(x, 1.01, 0.222, 0.035, 0.062, 0.026, tint(p.skin, 10));
      for (const x of [-0.15, 0.15]) B(x, 1.045, 0.2, 0.05, 0.09, 0.05, p.skin);
      B(0, 0.715, 0.169, 0.06, 0.13, 0.02, gold);
    } else {
      for (const x of [-0.1, 0.1]) {
        B(x, 1.135, 0.218, 0.038, 0.085, 0.015, "#251e1c");
        if (!female || p.face === "stern") B(x, 1.206, 0.216, 0.073, 0.018, 0.018, p.hair, x < 0 ? -0.1 : 0.1);
        else B(x - 0.01, 1.181, 0.217, 0.035, 0.012, 0.017, "#251e1c");
      }
      B(0, 1.025, 0.213, 0.056, 9e-3, 0.012, tint(skin, -55));
    }
    if (p.face === "beard" && p.role !== "skeleton") {
      for (const x of [-0.165, -0.11, 0.11, 0.165]) B(x, 1.036, 0.218, 0.06, 0.13, 0.035, p.hair);
      B(0, 0.994, 0.218, 0.27, 0.09, 0.04, p.hair);
      B(0, 1.022, 0.243, 0.105, 0.03, 0.025, tint(p.hair, 14));
    }
    if (p.hairStyle !== "bald" && p.role !== "skeleton") {
      const top = [[0, 1, 2, 1, 2, 1, 0], [1, 2, 2, 3, 2, 2, 1], [1, 2, 3, 2, 3, 2, 1], [1, 2, 2, 3, 2, 2, 1], [1, 2, 3, 2, 2, 1, 1], [0, 1, 2, 1, 2, 1, 0]];
      for (let z = 0; z < 6; z++) for (let x = 0; x < 7; x++) {
        const h = top[z][x];
        if (h) B((x - 3) * 0.07, 1.35 + (h - 1) * 0.025, (z - 2.5) * 0.07, 0.071, 0.055 + (h - 1) * 0.05, 0.071, tint(p.hair, [0, 14, -13, 7][(x + z) % 4]));
      }
      for (let i = 0; i < 7; i++) {
        const drops = [1, 2, 3, 1, 2, 1, 1][i];
        B((i - 3) * 0.067, 1.308 - drops * 0.021, 0.22, 0.072, 0.06 + drops * 0.042, 0.08, tint(p.hair, i % 2 ? 0 : 12));
      }
      for (const x of [-0.227, 0.227]) {
        B(x, 1.239, 0.02, 0.057, 0.14, 0.34, tint(p.hair, -12));
        B(x, 1.195, 0.135, 0.065, 0.13, 0.08, p.hair);
      }
      if (female && p.role === "rogue" && p.hairStyle === "short") {
        for (const x of [-0.239, 0.239]) B(x, 1.15, 0.01, 0.06, 0.23, 0.31, p.hair);
        B(0, 1.14, -0.175, 0.43, 0.25, 0.055, p.hair);
      }
      if (p.hairStyle === "long") {
        if (p.role === "fighter" && female) {
          B(0.11, 1.3, -0.234, 0.13, 0.15, 0.13, p.hair);
          B(0.12, 1.05, -0.23, 0.16, 0.38, 0.12, p.hair);
          B(0.12, 0.86, -0.224, 0.12, 0.075, 0.13, tint(p.hair, 14));
        } else {
          for (let i = 0; i < 6; i++) B((i - 2.5) * 0.072, 1.052, -0.17, 0.075, 0.39, 0.08, tint(p.hair, i % 2 ? 0 : 12));
          for (const x of [-0.245, 0.245]) {
            B(x, 1.06, 0.015, 0.07, 0.33, 0.26, p.hair);
            B(x, 0.89, 0.035, 0.075, 0.055, 0.23, tint(p.hair, 14));
          }
        }
      }
    }
    if (p.hood) {
      B(0, 1.437, -0.025, 0.5, 0.065, 0.44, "#dfcea6");
      for (const x of [-0.254, 0.254]) B(x, 1.236, -0.035, 0.055, 0.39, 0.43, "#dfcea6");
      B(0, 1.23, -0.23, 0.5, 0.4, 0.04, "#dfcea6");
      B(0, 1.474, -0.05, 0.26, 0.025, 0.3, p.cloth);
    }
    if (p.hands.includes("shield")) {
      const x = 0.36;
      B(x, 0.75, 0.2, 0.3, 0.39, 0.055, gold);
      B(x, 0.75, 0.238, 0.235, 0.32, 0.027, cloth);
      B(x, 0.75, 0.26, 0.03, 0.19, 0.015, gold);
      B(x, 0.78, 0.261, 0.145, 0.03, 0.017, gold);
      B(x, 0.528, 0.2, 0.16, 0.054, 0.06, gold);
    }
    if (p.hands.includes("sword")) {
      B(-0.345, 0.65, 0.16, 0.058, 0.38, 0.05, steel, -0.42);
      B(-0.418, 0.8, 0.16, 0.043, 0.14, 0.05, "#d6dcdf", -0.42);
      B(-0.264, 0.466, 0.16, 0.17, 0.035, 0.07, gold, -0.42);
      B(-0.234, 0.411, 0.16, 0.045, 0.1, 0.045, leather, -0.42);
    }
    if (p.hands.includes("staff")) {
      B(-0.34, 0.85, 0.05, 0.045, 0.96, 0.045, leather);
      if (p.role === "cleric") {
        B(-0.34, 1.25, 0.05, 0.15, 0.13, 0.15, steel);
        for (const x of [-0.435, -0.245]) B(x, 1.25, 0.05, 0.045, 0.12, 0.1, gold);
        B(-0.34, 1.35, 0.05, 0.055, 0.065, 0.055, gold);
      } else {
        B(-0.34, 1.35, 0.05, 0.16, 0.05, 0.16, gold);
        B(-0.34, 1.42, 0.05, 0.12, 0.12, 0.12, "#46bbed");
        B(-0.34, 1.5, 0.05, 0.06, 0.05, 0.06, "#7bd8f7");
      }
    }
    if (p.hands.includes("bow")) {
      for (let i = 0; i < 5; i++) B(-0.33 - 0.055 * Math.sin(i * Math.PI / 4), 0.55 + i * 0.1, 0.07, 0.043, 0.13, 0.04, "#936c40");
      B(-0.33, 0.75, 0.085, 0.01, 0.4, 0.01, "#cebfa0");
    }
    return { profile: p, parts };
  }
  return __toCommonJS(character_style_exports);
})();
