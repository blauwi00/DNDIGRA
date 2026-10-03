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
    PORTRAIT_REGIONS: () => PORTRAIT_REGIONS,
    ROLES: () => ROLES,
    STYLE: () => STYLE,
    STYLE_VERSION: () => STYLE_VERSION,
    characterParts: () => characterParts,
    characterProfile: () => characterProfile,
    npcActor: () => npcActor,
    npcDefinition: () => npcDefinition,
    tint: () => tint
  });
  var STYLE_VERSION = "approved-voxel-v4";
  var PORTRAIT_REGIONS = {
    fighter: { male: [30, 130, 239, 272], female: [552, 129, 212, 273] },
    wizard: { male: [30, 498, 239, 264], female: [552, 498, 212, 264] },
    rogue: { male: [30, 870, 239, 262], female: [552, 870, 212, 262] },
    cleric: { male: [30, 1230, 239, 267], female: [552, 1230, 212, 267] }
  };
  var STYLE = { voxel: 0.105, height: 1.4, headWidth: 0.5332, headHeight: 0.44, eyeHeight: 0.0935, maxParts: 420, maxPalette: 32 };
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
    const p = characterProfile(actor, kind), parts = [];
    let section = "body";
    const B = (x, y, z, w, h, d, color, rz = 0) => {
      const head = ["head", "hair", "beard", "hood"].includes(section), sx = head ? 1.24 : 1.2, sy = head ? 1.1 : section === "equipment" ? 0.84 : 0.76, sz = head ? 1.2 : 1.12;
      parts.push({ x: x * sx, y: head ? 0.7494 + (y - 0.945) * sy : 0.13 + (y - 0.13) * sy, z: z * sz, w: w * sx, h: h * sy, d: d * sz, color, rz, section });
    }, female = p.gender === "female", cloth = p.cloth, gold = p.trim, leather = "#573b29", steel = "#9caeb9", skin = p.skin, light = tint(cloth, 17), dark = tint(cloth, -20), width = female ? 0.31 : 0.36;
    if (p.role === "dummy") {
      section = "equipment";
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
        B(x, 0.9, 0, 0.22, 0.13, 0.285, cloth);
        B(x, 0.923, 0.02, 0.17, 0.045, 0.25, light);
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
      B(0, 0.715, 0.165, width - 0.015, 0.285, 0.045, leather);
      B(-0.065, 0.7, 0.194, 0.13, 0.22, 0.018, tint(leather, 13));
      B(0.09, 0.7, 0.195, 0.1, 0.22, 0.02, tint(leather, -10));
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
    B(0, 0.537, -0.155, width + 0.045, 0.055, 0.025, leather);
    if (p.role === "fighter") {
      B(0, 0.75, -0.16, width - 0.035, 0.23, 0.05, dark);
      B(0, 0.87, -0.19, width, 0.035, 0.025, gold);
      B(0, 0.66, -0.19, width, 0.035, 0.025, gold);
    }
    if (p.role === "wizard" || p.role === "cleric") {
      for (const x of [-0.1, 0.1]) {
        B(x, 0.66, -0.158, 0.025, 0.34, 0.026, p.role === "cleric" ? "#dfcea6" : gold);
        B(x, 0.439, -0.17, 0.14, 0.18, 0.024, dark);
      }
    }
    if (p.role === "rogue") {
      for (const x of [-0.1, 0.1]) B(x, 0.75, -0.21, 0.1, 0.33, 0.02, tint(cloth, x < 0 ? 8 : -12));
      B(0, 0.575, -0.208, 0.38, 0.025, 0.025, tint(cloth, 15));
    }
    section = "head";
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
        B(x, 1.135, 0.218, 0.05, 0.085, 0.015, "#251e1c");
        if (p.face === "stern") B(x, 1.206, 0.216, 0.073, 0.025, 0.018, p.hair, x < 0 ? -0.22 : 0.22);
        else if (!female) B(x, 1.202, 0.216, 0.065, 0.014, 0.018, p.hair);
        else B(x - 0.01, 1.181, 0.217, 0.035, 0.012, 0.017, "#251e1c");
      }
      B(0, 1.025, 0.213, 0.056, 9e-3, 0.012, tint(skin, -55));
    }
    section = "beard";
    if (p.face === "beard" && p.role !== "skeleton") {
      for (const x of [-0.165, -0.11, 0.11, 0.165]) B(x, 1.036, 0.218, 0.06, 0.13, 0.035, p.hair);
      B(0, 0.994, 0.218, 0.27, 0.09, 0.04, p.hair);
      B(0, 1.022, 0.243, 0.105, 0.03, 0.025, tint(p.hair, 14));
    }
    section = "hair";
    if (p.hairStyle !== "bald" && p.role !== "skeleton") {
      if (!p.hood) B(0, 1.34, -5e-3, 0.47, 0.06, 0.405, tint(p.hair, -8));
      else {
        B(0, 1.352, 0.208, 0.395, 0.1, 0.072, tint(p.hair, -8));
        for (const side of [-1, 1]) B(side * 0.19, 1.29, 0.208, 0.055, 0.115, 0.06, p.hair);
      }
      const locks = [[1, 2, 3, 2, 1], [2, 3, 2, 4, 2], [2, 2, 4, 3, 2], [1, 3, 2, 2, 1]];
      if (!p.hood) for (let z = 0; z < 4; z++) for (let x = 0; x < 5; x++) {
        const level = locks[z][x], offset = z % 2 ? 0.014 : -0.012;
        B((x - 2) * 0.095 + offset, 1.325 + (level - 1) * 0.025, (z - 1.5) * 0.104, 0.101, 0.06 + (level - 1) * 0.05, 0.111, tint(p.hair, [4, 15, -9, 8][(x + z) % 4]));
      }
      const fringe = [{ x: -0.2, y: 1.295, h: 0.11 }, { x: -0.11, y: 1.255, h: 0.2 }, { x: 0, y: 1.3, h: 0.11 }, { x: 0.1, y: 1.265, h: 0.18 }, { x: 0.2, y: 1.285, h: 0.13 }];
      for (let i = 0; i < fringe.length; i++) {
        const f = fringe[i];
        B(f.x, f.y, 0.224, 0.104, f.h, 0.096, tint(p.hair, i % 2 ? 0 : 13));
      }
      for (const x of [-0.223, 0.223]) {
        B(x, 1.24, -0.035, 0.067, 0.16, 0.32, tint(p.hair, -9));
        B(x, 1.205, 0.135, 0.073, 0.13, 0.08, p.hair);
      }
      if (!p.hood) B(0, 1.225, -0.17, 0.45, 0.25, 0.068, tint(p.hair, -9));
      if (female && !p.hood && p.hairStyle === "short") {
        for (const x of [-0.239, 0.239]) {
          B(x, 1.11, 5e-3, 0.073, 0.23, 0.31, p.hair);
          B(x, 1.007, 0.015, 0.08, 0.07, 0.25, tint(p.hair, 10));
        }
        B(0, 1.08, -0.175, 0.46, 0.29, 0.075, p.hair);
      }
      if (p.hairStyle === "long" && p.hood) for (const x of [-0.218, 0.218]) B(x, 1.085, 0.225, 0.054, 0.15, 0.065, p.hair);
      if (p.hairStyle === "long" && !p.hood) {
        if (p.role === "fighter" && female) {
          B(0.105, 1.31, -0.25, 0.16, 0.15, 0.15, p.hair);
          B(0.11, 1.08, -0.25, 0.18, 0.36, 0.145, p.hair);
          B(0.11, 0.865, -0.24, 0.13, 0.09, 0.14, tint(p.hair, 14));
          B(0.105, 1.245, -0.273, 0.17, 0.035, 0.15, "#352b32");
        } else if (!female) {
          B(0, 1.43, -0.19, 0.19, 0.16, 0.18, p.hair);
          B(0.025, 1.26, -0.235, 0.2, 0.15, 0.16, p.hair);
          B(0.025, 1.335, -0.248, 0.2, 0.03, 0.16, "#251e1c");
        } else {
          for (let i = 0; i < 5; i++) B((i - 2) * 0.094, 1.035, -0.18, 0.098, 0.4, 0.088, tint(p.hair, i % 2 ? 0 : 12));
          for (const x of [-0.247, 0.247]) {
            B(x, 1.06, 0.015, 0.075, 0.34, 0.27, p.hair);
            B(x, 0.873, 0.035, 0.08, 0.085, 0.24, tint(p.hair, 14));
          }
        }
      }
    }
    section = "hood";
    if (p.hood) {
      const cream = "#dfcea6";
      B(0, 1.444, -0.025, 0.39, 0.065, 0.44, cream);
      B(0, 1.482, -0.025, 0.25, 0.03, 0.38, p.cloth);
      B(0, 1.23, -0.23, 0.49, 0.4, 0.055, cream);
      for (const side of [-1, 1]) {
        B(side * 0.217, 1.385, -0.035, 0.078, 0.105, 0.43, cream);
        B(side * 0.253, 1.19, -0.035, 0.064, 0.3, 0.43, cream);
        B(side * 0.24, 1.335, 0.2, 0.06, 0.07, 0.04, p.cloth);
        B(side * 0.266, 1.165, 0.2, 0.03, 0.23, 0.04, tint(cream, -16));
      }
      B(0, 1.409, 0.205, 0.34, 0.028, 0.025, p.cloth);
    }
    section = "equipment";
    if (p.hands.includes("shield")) {
      const x = 0.36;
      B(x, 0.75, 0.2, 0.3, 0.48, 0.055, gold);
      B(x, 0.75, 0.238, 0.235, 0.405, 0.027, cloth);
      B(x, 0.75, 0.26, 0.03, 0.19, 0.015, gold);
      B(x, 0.78, 0.261, 0.145, 0.03, 0.017, gold);
      B(x, 0.508, 0.2, 0.22, 0.045, 0.06, gold);
      B(x, 0.474, 0.2, 0.15, 0.038, 0.06, gold);
    }
    if (p.hands.includes("sword")) {
      B(-0.345, 0.65, 0.16, 0.085, 0.38, 0.05, steel, 0.42);
      B(-0.418, 0.8, 0.16, 0.065, 0.14, 0.05, "#d6dcdf", 0.42);
      B(-0.264, 0.466, 0.16, 0.17, 0.035, 0.07, gold, 0.42);
      B(-0.234, 0.411, 0.16, 0.045, 0.1, 0.045, leather, 0.42);
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
