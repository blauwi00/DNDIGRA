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
    focusName: () => focusName,
    gearEntries: () => gearEntries,
    handType: () => handType,
    slotsUsed: () => slotsUsed,
    stackable: () => stackable
  });
  var word = (forms) => new RegExp("(?:^|[^\\p{L}\\p{N}])(?:" + forms.join("|") + ")(?![\\p{L}\\p{N}])", "iu");
  var ARMOR = word(["\u0431\u0440\u043E\u043D(?:\u044F|\u0438|\u044E|\u0435\u0439|\u0435)", "\u0434\u043E\u0441\u043F\u0435\u0445(?:\u0438|\u043E\u0432|\u0430|\u0430\u043C)?", "\u043A\u043E\u043B\u044C\u0447\u0443\u0433(?:\u0430|\u0438|\u0443|\u043E\u0439|\u0435)", "\u043A\u043E\u043B\u044C\u0447\u0443\u0436\u043D(?:\u0430\u044F|\u0443\u044E|\u043E\u0439) \u0440\u0443\u0431\u0430\u0445(?:\u0430|\u0438|\u0443|\u043E\u0439)"]);
  var SHIELD = word(["\u0449\u0438\u0442(?:\u0430|\u0443|\u043E\u043C|\u0435|\u044B|\u043E\u0432)?"]);
  var STAFF = word(["\u043F\u043E\u0441\u043E\u0445(?:\u0430|\u0443|\u043E\u043C|\u0435|\u0438|\u043E\u0432)?", "\u0431\u0443\u043B\u0430\u0432(?:\u0430|\u0443|\u043E\u0439|\u0435|\u044B)"]);
  var SWORD = word(["\u043C\u0435\u0447(?:\u0430|\u0443|\u043E\u043C|\u0435|\u0438|\u0435\u0439)?"]);
  var BOW = word(["\u043B\u0443\u043A(?:\u0430|\u0443|\u043E\u043C|\u0435|\u0438|\u043E\u0432)?"]);
  var STACK = word(["\u0435\u0434\u0430", "\u0435\u0434\u044B", "\u0435\u0434\u043E\u0439", "\u0440\u0430\u0446\u0438\u043E\u043D(?:\u044B|\u043E\u0432|\u0430)?", "\u0431\u0438\u043D\u0442(?:\u044B|\u043E\u0432|\u0430)?", "\u043C\u0435\u043B(?:\u0430|\u0443|\u043E\u043C)?", "\u0441\u0432\u0435\u0447(?:\u0430|\u0438|\u0435\u0439|\u0443|\u043E\u0439)?"]);
  var FOCUS = word(["\u0444\u043E\u043A\u0443\u0441(?:\u0430|\u0443|\u043E\u043C|\u044B)?", "\u0441\u0438\u043C\u0432\u043E\u043B(?:\u0430|\u0443|\u043E\u043C|\u044B)?"]);
  var CAPACITY = 20;
  var armorName = (name) => ARMOR.test(name);
  var handType = (name) => SHIELD.test(name) ? "shield" : STAFF.test(name) ? "staff" : SWORD.test(name) ? "sword" : BOW.test(name) ? "bow" : null;
  var stackable = (name) => STACK.test(name);
  var focusName = (name) => FOCUS.test(name);
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
