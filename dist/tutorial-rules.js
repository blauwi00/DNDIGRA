var TutorialRules = (() => {
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

  // src/tutorial-rules.js
  var tutorial_rules_exports = {};
  __export(tutorial_rules_exports, {
    CLASS_ABILITY: () => CLASS_ABILITY,
    TUTORIAL_PROFILE_KEY: () => TUTORIAL_PROFILE_KEY,
    TUTORIAL_VERSION: () => TUTORIAL_VERSION,
    createTutorial: () => createTutorial,
    reduceTutorial: () => reduceTutorial,
    tutorialProfileKey: () => tutorialProfileKey,
    tutorialRequirements: () => tutorialRequirements,
    validateTutorial: () => validateTutorial
  });
  var TUTORIAL_VERSION = 1;
  var TUTORIAL_PROFILE_KEY = "dndigra.tutorial.completed.v1";
  var tutorialProfileKey = (offline = false) => (offline ? "dndigra-local-" : "") + TUTORIAL_PROFILE_KEY;
  var CLASS_IDS = ["fighter", "wizard", "rogue", "cleric"];
  var CLASS_ABILITY = Object.freeze({ fighter: "secondWind", wizard: "magearmor", rogue: "dash", cleric: "cure" });
  var STEPS = Object.freeze([
    ["selection", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043A\u043B\u0435\u0442\u043A\u0443", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0443\u044E \u043A\u043B\u0435\u0442\u043A\u0443 \u043D\u0430 \u043A\u0430\u0440\u0442\u0435. \u0414\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u043D\u0430\u0447\u0438\u043D\u0430\u0435\u0442\u0441\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u043E\u0439 \u043A\u043D\u043E\u043F\u043A\u043E\u0439 \xAB\u0418\u0434\u0442\u0438\xBB.", "#viewport"],
    ["movement", "\u0421\u0434\u0435\u043B\u0430\u0439\u0442\u0435 \u043F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0433", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0418\u0434\u0442\u0438\xBB \u0432\u043E\u0437\u043B\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0439 \u043A\u043B\u0435\u0442\u043A\u0438 \u0438 \u0434\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u044F \u0433\u0435\u0440\u043E\u044F.", ".object-prompt"],
    ["camera-center", "\u0412\u0435\u0440\u043D\u0438\u0442\u0435 \u043A\u0430\u043C\u0435\u0440\u0443 \u043A \u0433\u0435\u0440\u043E\u044E", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0426\u0435\u043D\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043D\u0430 \u0433\u0435\u0440\u043E\u0435\xBB \u043D\u0430\u0434 \u043A\u0430\u0440\u0442\u043E\u0439.", "#camera-center"],
    ["camera-scale", "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u043C\u0430\u0441\u0448\u0442\u0430\u0431", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0423\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C\xBB, \xAB\u0423\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C\xBB \u0438\u043B\u0438 \xAB\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0432\u0441\u044E \u043A\u0430\u0440\u0442\u0443\xBB.", ".map-toolbar"],
    ["interaction", "\u041E\u0441\u043C\u043E\u0442\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043F\u0430\u0441\u044B", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u043E\u0440\u043E\u0436\u043D\u044B\u0439 \u0441\u0443\u043D\u0434\u0443\u043A \u043D\u0430 \u043E\u043F\u0443\u0448\u043A\u0435 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041E\u0442\u043A\u0440\u044B\u0442\u044C\xBB. \u0413\u0435\u0440\u043E\u0439 \u043F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u043A \u043D\u0435\u043C\u0443.", "#viewport"],
    ["loot", "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u0445\u043E\u0434\u043A\u0443", "\u0417\u0430\u0431\u0435\u0440\u0438\u0442\u0435 \u043F\u0440\u0438\u043F\u0430\u0441\u044B \u0438\u0437 \u0434\u043E\u0440\u043E\u0436\u043D\u043E\u0433\u043E \u0441\u0443\u043D\u0434\u0443\u043A\u0430. \u041F\u0440\u0438 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u043E\u043C \u0440\u044E\u043A\u0437\u0430\u043A\u0435 \u043E\u0441\u0432\u043E\u0431\u043E\u0434\u0438\u0442\u0435 \u044F\u0447\u0435\u0439\u043A\u0443: \u0432\u0435\u0449\u0438 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F \u043D\u0430 \u043C\u0435\u0441\u0442\u0435.", "#viewport"],
    ["hero", "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0433\u0435\u0440\u043E\u044F", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \xAB\u0413\u0435\u0440\u043E\u0439\xBB: \u0437\u0434\u0435\u0441\u044C \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435, \u0445\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0438 \u0438 \u0441\u043D\u0430\u0440\u044F\u0436\u0435\u043D\u0438\u0435 \u0440\u0443\u043A.", "#tab-hero"],
    ["bag", "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0440\u044E\u043A\u0437\u0430\u043A", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u0432\u043A\u043B\u0430\u0434\u043A\u0443 \xAB\u0420\u044E\u043A\u0437\u0430\u043A\xBB, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0432\u0435\u0449\u0438.", "#tab-bag"],
    ["equipment", "\u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0441\u043D\u0430\u0440\u044F\u0436\u0435\u043D\u0438\u0435", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043D\u0430\u0434\u0435\u0442\u0443\u044E \u0431\u0440\u043E\u043D\u044E \u0438 \u0441\u043D\u0438\u043C\u0438\u0442\u0435 \u0435\u0451, \u043B\u0438\u0431\u043E \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \xAB\u0413\u0435\u0440\u043E\u0439\xBB \u0438 \u0441\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u043D\u0430\u0440\u044F\u0436\u0435\u043D\u0438\u0435 \u0440\u0443\u043A. \u0417\u0430\u0442\u0435\u043C \u043C\u043E\u0436\u043D\u043E \u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043F\u0440\u0438\u0432\u044B\u0447\u043D\u043E\u0435 \u0441\u043D\u0430\u0440\u044F\u0436\u0435\u043D\u0438\u0435.", "#bag-equipped, #hero-hands"],
    ["journal", "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0436\u0443\u0440\u043D\u0430\u043B", "\u0412\u0435\u0440\u043D\u0438\u0442\u0435\u0441\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0443 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0416\u0443\u0440\u043D\u0430\u043B\xBB: \u043E\u043D \u0445\u0440\u0430\u043D\u0438\u0442 \u0446\u0435\u043B\u044C \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u044F \u0438 \u043D\u0430\u0439\u0434\u0435\u043D\u043D\u044B\u0435 \u0441\u0432\u0435\u0434\u0435\u043D\u0438\u044F.", "#journal"],
    ["actions", "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F\xBB, \u0447\u0442\u043E\u0431\u044B \u0443\u0432\u0438\u0434\u0435\u0442\u044C \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B\u0435 \u043F\u0440\u0438\u0451\u043C\u044B \u0433\u0435\u0440\u043E\u044F.", "#combat-tools-toggle"],
    ["ability", "\u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u043F\u0440\u0438\u0451\u043C \u0433\u0435\u0440\u043E\u044F", "", "#quick-actions"],
    ["dodge", "\u0417\u0430\u0449\u0438\u0442\u0438\u0442\u0435\u0441\u044C \u0432 \u0431\u043E\u044E", "\u041D\u0430\u0447\u0430\u043B\u0441\u044F \u0443\u0447\u0435\u0431\u043D\u044B\u0439 \u0431\u043E\u0439. \u0412 \xAB\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F\u0445\xBB \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0423\u043A\u043B\u043E\u043D\u0438\u0442\u044C\u0441\u044F\xBB: \u0434\u043E \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0445\u043E\u0434\u0430 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0443 \u0442\u0440\u0443\u0434\u043D\u0435\u0435 \u043F\u043E\u043F\u0430\u0441\u0442\u044C.", "#combat-tools-toggle"],
    ["turn", "\u041F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u0445\u043E\u0434", "\u0417\u0430\u043A\u0440\u043E\u0439\u0442\u0435 \u043E\u043A\u043D\u043E \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041A\u043E\u043D\u0435\u0446 \u0445\u043E\u0434\u0430\xBB. \u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0439 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0430.", "#end"],
    ["potion", "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0435 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435", "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0417\u0435\u043B\u044C\u0435\xBB: \u0432 \u0431\u043E\u044E \u043E\u043D\u043E \u0442\u0440\u0430\u0442\u0438\u0442 \u0431\u043E\u043D\u0443\u0441\u043D\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435. \u0415\u0441\u043B\u0438 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435 \u043F\u043E\u043B\u043D\u043E\u0435, \u043F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u0445\u043E\u0434 \u0438 \u0434\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0440\u0430\u043D\u0435\u043D\u0438\u044F.", "#potion"],
    ["attack", "\u0410\u0442\u0430\u043A\u0443\u0439\u0442\u0435 \u043F\u0440\u043E\u0442\u0438\u0432\u043D\u0438\u043A\u0430", "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0440\u0430\u0433\u0430 \u043D\u0430 \u043A\u0430\u0440\u0442\u0435 \u0438 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0410\u0442\u0430\u043A\u043E\u0432\u0430\u0442\u044C\xBB. \u0415\u0441\u043B\u0438 \u043E\u043D \u0434\u0430\u043B\u0435\u043A\u043E, \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u043F\u043E\u0434\u043E\u0439\u0434\u0438\u0442\u0435; \u043F\u0440\u0438 \u043F\u043E\u0442\u0440\u0430\u0447\u0435\u043D\u043D\u043E\u043C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 \u0445\u043E\u0434.", "#viewport"],
    ["victory", "\u041E\u0434\u0435\u0440\u0436\u0438\u0442\u0435 \u043D\u0430\u0441\u0442\u043E\u044F\u0449\u0443\u044E \u043F\u043E\u0431\u0435\u0434\u0443", "\u041F\u043E\u0432\u0442\u043E\u0440\u044F\u0439\u0442\u0435 \u0430\u0442\u0430\u043A\u0438 \u0438 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0439\u0442\u0435 \u0445\u043E\u0434, \u043F\u043E\u043A\u0430 \u0432\u0440\u0430\u0433 \u043D\u0435 \u0431\u0443\u0434\u0435\u0442 \u043F\u043E\u0431\u0435\u0436\u0434\u0451\u043D. \u042D\u0442\u043E\u0442 \u0431\u043E\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u0431\u0440\u043E\u0441\u043A\u0438 \u0438 \u0440\u0435\u0441\u0443\u0440\u0441\u044B.", "#viewport"],
    ["ambush", "\u0423\u0447\u0435\u0431\u043D\u043E\u0435 \u043D\u0430\u043F\u0430\u0434\u0435\u043D\u0438\u0435", "\u0422\u0435\u043F\u0435\u0440\u044C \u043F\u043E\u043A\u0430\u0437\u0430\u043D \u0438\u0441\u0445\u043E\u0434 \u043E\u043F\u0430\u0441\u043D\u043E\u0439 \u0437\u0430\u0441\u0430\u0434\u044B. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041A\u043E\u043D\u0435\u0446 \u0445\u043E\u0434\u0430\xBB: \u0433\u0435\u0440\u043E\u0439 \u043F\u043E\u0442\u0435\u0440\u044F\u0435\u0442 \u0441\u043E\u0437\u043D\u0430\u043D\u0438\u0435, \u0430 \u0446\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u043F\u043E\u043C\u043E\u0436\u0435\u0442 \u0435\u043C\u0443.", "#end"],
    ["unconscious", "\u0413\u0435\u0440\u043E\u0439 \u0431\u0435\u0437 \u0441\u043E\u0437\u043D\u0430\u043D\u0438\u044F", "\u0423\u0447\u0435\u0431\u043D\u0430\u044F \u0437\u0430\u0441\u0430\u0434\u0430 \u0437\u0430\u043A\u043E\u043D\u0447\u0438\u043B\u0430\u0441\u044C \u043F\u043E\u0442\u0435\u0440\u0435\u0439 \u0441\u043E\u0437\u043D\u0430\u043D\u0438\u044F. \u042D\u0442\u043E \u043D\u0435 \u0441\u043C\u0435\u0440\u0442\u044C. \u041F\u043E\u043C\u043E\u0449\u044C \u0443\u0436\u0435 \u0431\u043B\u0438\u0437\u043A\u043E.", "#viewport"],
    ["rescue", "\u041F\u043E\u043C\u043E\u0449\u044C \u0446\u0435\u043B\u0438\u0442\u0435\u043B\u044F", "\u0426\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u0443\u0432\u0451\u043B \u0433\u0435\u0440\u043E\u044F \u0432 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E. \u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F \u0441\u0446\u0435\u043D\u044B \u043F\u043E\u043C\u043E\u0449\u0438 \u2014 \u043F\u043E\u0441\u043B\u0435 \u043D\u0435\u0451 \u043F\u0443\u0442\u0435\u0448\u0435\u0441\u0442\u0432\u0438\u0435 \u043F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u0441\u044F.", "#viewport"]
  ]);
  var ABILITY_TEXT = {
    fighter: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0412\u0442\u043E\u0440\u043E\u0435 \u0434\u044B\u0445\u0430\u043D\u0438\u0435\xBB: \u0432\u043E\u0438\u043D \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u0437\u0434\u043E\u0440\u043E\u0432\u044C\u0435 \u0441\u0432\u043E\u0438\u043C \u0440\u0435\u0441\u0443\u0440\u0441\u043E\u043C.",
    wizard: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0414\u043E\u0441\u043F\u0435\u0445\u0438 \u043C\u0430\u0433\u0430\xBB: \u0437\u0430\u043A\u043B\u0438\u043D\u0430\u043D\u0438\u0435 \u0442\u0440\u0430\u0442\u0438\u0442 \u044F\u0447\u0435\u0439\u043A\u0443. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0443\u044E \u0440\u0443\u043A\u0443 \u0447\u0435\u0440\u0435\u0437 \xAB\u0421\u043D\u0430\u0440\u044F\u0436\u0435\u043D\u0438\u0435 \u0440\u0443\u043A\xBB.",
    rogue: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0420\u044B\u0432\u043E\u043A\xBB: \u043F\u043B\u0443\u0442 \u043F\u043E\u043B\u0443\u0447\u0430\u0435\u0442 \u0434\u043E\u043F\u043E\u043B\u043D\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435. \u0423\u0447\u0438\u043C\u0441\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E\u043C\u0443 \u043F\u0440\u0438\u0451\u043C\u0443 \u044D\u0442\u043E\u0433\u043E \u0433\u0435\u0440\u043E\u044F.",
    cleric: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u041B\u0435\u0447\u0435\u043D\u0438\u0435 \u0440\u0430\u043D\xBB: \u0436\u0440\u0435\u0446 \u043B\u0435\u0447\u0438\u0442 \u0441\u0435\u0431\u044F, \u0440\u0430\u0441\u0445\u043E\u0434\u0443\u044F \u044F\u0447\u0435\u0439\u043A\u0443. \u041E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u0443\u044E \u0440\u0443\u043A\u0443 \u0447\u0435\u0440\u0435\u0437 \xAB\u0421\u043D\u0430\u0440\u044F\u0436\u0435\u043D\u0438\u0435 \u0440\u0443\u043A\xBB."
  };
  function tutorialRequirements(classId = "fighter") {
    const cls = CLASS_IDS.includes(classId) ? classId : "fighter";
    return STEPS.map(([id, title, text, target]) => ({ id, title, text: id === "ability" ? ABILITY_TEXT[cls] : text, target, ...id === "ability" ? { ability: CLASS_ABILITY[cls] } : {} }));
  }
  function phaseFor(step) {
    return step >= STEPS.length ? "complete" : step >= 19 ? "rescue" : step >= 18 ? "loss" : step >= 17 ? "ambush" : step >= 12 ? "combat" : "controls";
  }
  function createTutorial({ classId = "fighter", skip = false, canSkip = false, mode = "campaign" } = {}) {
    const skipped = mode !== "practice" && !!skip && !!canSkip;
    return { v: TUTORIAL_VERSION, classId: CLASS_IDS.includes(classId) ? classId : "fighter", mode: mode === "practice" ? "practice" : "campaign", step: skipped ? STEPS.length : 0, phase: skipped ? "complete" : "controls", checks: {}, seen: [], completed: skipped, skipped };
  }
  function matches(step, event, state) {
    if (!event || event.success === false) return false;
    const type = event.type, id = event.id;
    switch (step) {
      case "selection":
        return type === "selection" && event.kind === "tile";
      case "movement":
        return type === "movement";
      case "camera-center":
        return type === "camera" && event.action === "center";
      case "camera-scale":
        return type === "camera" && ["zoom", "fit"].includes(event.action);
      case "hero":
        return type === "tab" && event.tab === "hero";
      case "bag":
        return type === "tab" && event.tab === "bag";
      case "ability":
        return ["ability", "defense"].includes(type) && id === CLASS_ABILITY[state.classId];
      case "dodge":
        return ["defense", "dodge"].includes(type) && (id === "dodge" || type === "dodge");
      case "victory":
        return type === "victory" && event.encounterId === "tutorial-win";
      case "ambush":
        return type === "turn" && event.encounterId === "tutorial-loss";
      case "unconscious":
        return type === "unconscious" && event.encounterId === "tutorial-loss";
      case "rescue":
        return type === "rescue" && event.encounterId === "tutorial-loss";
      case "turn":
        return type === "turn" && event.encounterId !== "tutorial-loss";
      default:
        return type === step;
    }
  }
  function reduceTutorial(state, event) {
    if (!validateTutorial(state, state) || state.completed) return state;
    const eventId = typeof event?.eventId === "string" ? event.eventId.slice(0, 120) : "";
    if (eventId && state.seen.includes(eventId)) return state;
    const requirement = STEPS[state.step]?.[0];
    if (!matches(requirement, event, state)) return state;
    const step = state.step + 1;
    return { ...state, step, phase: phaseFor(step), checks: { ...state.checks, [requirement]: true }, seen: eventId ? [...state.seen, eventId].slice(-100) : [...state.seen], completed: step === STEPS.length };
  }
  var KEYS = ["v", "classId", "mode", "step", "phase", "checks", "seen", "completed", "skipped"];
  function wellFormed(state) {
    if (!state || typeof state !== "object" || Array.isArray(state) || Object.keys(state).some((k) => !KEYS.includes(k))) return false;
    if (state.v !== TUTORIAL_VERSION || !CLASS_IDS.includes(state.classId) || !["campaign", "practice"].includes(state.mode)) return false;
    if (!Number.isInteger(state.step) || state.step < 0 || state.step > STEPS.length || typeof state.completed !== "boolean" || typeof state.skipped !== "boolean") return false;
    if (!state.checks || typeof state.checks !== "object" || Array.isArray(state.checks) || !Array.isArray(state.seen) || state.seen.length > 100 || new Set(state.seen).size !== state.seen.length || state.seen.some((x) => typeof x !== "string" || !x.length || x.length > 120)) return false;
    if (state.skipped) return state.mode === "campaign" && state.completed && state.step === STEPS.length && state.phase === "complete" && Object.keys(state.checks).length === 0;
    if (state.phase !== phaseFor(state.step) || state.completed !== (state.step === STEPS.length)) return false;
    const expected = STEPS.slice(0, state.step).map((s) => s[0]);
    return Object.keys(state.checks).length === expected.length && expected.every((id) => state.checks[id] === true);
  }
  function validateTutorial(next, previous = next) {
    if (!wellFormed(next) || !wellFormed(previous)) return false;
    return next.classId === previous.classId && next.mode === previous.mode && next.skipped === previous.skipped && next.step >= previous.step && (!previous.completed || next.completed) && Object.keys(previous.checks).every((k) => next.checks[k] === true);
  }
  return __toCommonJS(tutorial_rules_exports);
})();
