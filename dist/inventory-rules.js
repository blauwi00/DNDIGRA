var InventoryRules = (() => {
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

  // src/inventory-rules.js
  var inventory_rules_exports = {};
  __export(inventory_rules_exports, {
    CAPACITY: () => CAPACITY,
    armorName: () => armorName,
    canAdd: () => canAdd,
    gearEntries: () => gearEntries,
    handType: () => handType,
    slotsUsed: () => slotsUsed,
    stackable: () => stackable
  });
  var CAPACITY = 20;
  var armorName = (name) => /броня|кольч|доспех|кожан/i.test(name);
  var handType = (name) => /щит/i.test(name) ? "shield" : /посох|булава/i.test(name) ? "staff" : /меч/i.test(name) ? "sword" : /лук/i.test(name) ? "bow" : null;
  var stackable = (name) => /еда|рацион|бинты|мел|свеч/i.test(name);
  function gearEntries(a) {
    const hands = new Set(a.hands || []);
    let armorTaken = false;
    const stacks = /* @__PURE__ */ new Map(), out = [];
    for (const [i, name] of (a.inventory || []).entries()) {
      const hand = handType(name), equipped = armorName(name) ? a.armorEquipped !== false && !armorTaken : !!hand && hands.has(hand);
      if (armorName(name) && equipped) armorTaken = true;
      if (hand && equipped) hands.delete(hand);
      const key = stackable(name) && !equipped ? name : null;
      if (key && stacks.has(key)) {
        const it = stacks.get(key);
        it.amount++;
        it.indices.push(i);
        continue;
      }
      const item = { id: "gear" + i, name, amount: 1, indices: [i], equipped };
      out.push(item);
      if (key) stacks.set(key, item);
    }
    return out;
  }
  function slotsUsed(a, s = {}) {
    return gearEntries(a).filter((i) => !i.equipped).length + ((a.torches || 0) - (a.hands?.includes("torch") ? 1 : 0) > 0 ? 1 : 0) + ((s.potions || 0) > 0 ? 1 : 0);
  }
  function canAdd(a, s, type, name) {
    const copy = { ...a, inventory: [...a.inventory || []], hands: [...a.hands || []] }, next = { ...s };
    if (type === "gear") copy.inventory.push(name);
    else if (type === "torch") copy.torches = (copy.torches || 0) + 1;
    else if (type === "potion") next.potions = (next.potions || 0) + 1;
    return slotsUsed(copy, next) <= CAPACITY;
  }
  return __toCommonJS(inventory_rules_exports);
})();
