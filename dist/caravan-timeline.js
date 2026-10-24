var CaravanTimeline = (() => {
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

  // src/caravan-timeline.js
  var caravan_timeline_exports = {};
  __export(caravan_timeline_exports, {
    duration: () => duration,
    frame: () => frame
  });
  var scripts = {
    road: { duration: 11500, title: "\u041F\u0415\u0420\u0412\u0410\u042F \u0414\u041E\u0420\u041E\u0413\u0410", beats: [
      [0, "\u0422\u0440\u0435\u0442\u044C\u0435 \u0443\u0442\u0440\u043E. \u0414\u0435\u0440\u0435\u0432\u043D\u044F \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0437\u0430 \u0441\u043F\u0438\u043D\u043E\u0439.", "\u0422\u044B \u0432\u043F\u0435\u0440\u0432\u044B\u0435 \u0443\u0445\u043E\u0434\u0438\u0448\u044C \u0434\u0430\u043B\u044C\u0448\u0435 \u0437\u043D\u0430\u043A\u043E\u043C\u044B\u0445 \u043F\u043E\u043B\u0435\u0439.", 10, 12, 0.82],
      [3800, "\u2014 \u0414\u043E \u0440\u044B\u043D\u043A\u0430 \u0443\u0441\u043F\u0435\u0435\u043C \u0437\u0430\u0441\u0432\u0435\u0442\u043B\u043E, \u2014 \u0433\u043E\u0432\u043E\u0440\u0438\u0442 \u041B\u0438\u0441\u0430.", "\u0421\u043A\u0440\u0438\u043F\u044F\u0442 \u043A\u043E\u043B\u0451\u0441\u0430. \u0412\u0435\u0442\u0435\u0440 \u0448\u0435\u0432\u0435\u043B\u0438\u0442 \u043B\u0438\u0441\u0442\u0432\u0443.", 13, 10, 0.95],
      [7600, "\u0412\u043F\u0435\u0440\u0435\u0434\u0438 \u043F\u0435\u0440\u0435\u0441\u0442\u0430\u044E\u0442 \u043F\u0435\u0442\u044C \u043F\u0442\u0438\u0446\u044B.", "\u0418\u0437-\u0437\u0430 \u0434\u0435\u0440\u0435\u0432\u044C\u0435\u0432 \u0432\u044B\u0445\u043E\u0434\u044F\u0442 \u043B\u044E\u0434\u0438. \u041E\u0434\u0438\u043D \u0431\u0435\u0440\u0451\u0442\u0441\u044F \u0437\u0430 \u0432\u043E\u0436\u0436\u0438.", 15, 9, 1.08],
      [9500, "\u2014 \u041E\u0442\u043E\u0439\u0434\u0438 \u043E\u0442 \u043A\u0430\u0440\u0435\u0442\u044B. \u041C\u0435\u0434\u043B\u0435\u043D\u043D\u043E.", "\u0414\u0430\u0440\u0435\u043D \u043F\u0440\u0438\u043A\u0440\u044B\u0432\u0430\u0435\u0442 \u0432\u043E\u0437\u043D\u0438\u0446\u0443. \u0422\u043E\u0440\u0433\u043E\u0432\u043A\u0430 \u043E\u0441\u0442\u0430\u0451\u0442\u0441\u044F \u0440\u044F\u0434\u043E\u043C \u0441 \u0442\u043E\u0431\u043E\u0439.", 10, 12, 1.12]
    ] },
    crash: { duration: 7200, title: "\u041E\u0414\u041D\u041E \u041C\u0413\u041D\u041E\u0412\u0415\u041D\u0418\u0415", beats: [
      [0, "\u0412\u043E\u0440 \u043E\u0442\u0441\u0442\u0443\u043F\u0430\u0435\u0442. \u041D\u043E \u0441 \u0434\u043E\u0440\u043E\u0433\u0438 \u0434\u043E\u043D\u043E\u0441\u0438\u0442\u0441\u044F \u043A\u0440\u0438\u043A.", "\u041B\u043E\u0448\u0430\u0434\u0438 \u0440\u0432\u0443\u0442\u0441\u044F \u0432 \u0441\u0442\u043E\u0440\u043E\u043D\u0443.", 13, 10, 1],
      [2200, "\u041A\u043E\u043B\u0435\u0441\u043E \u0446\u0435\u043F\u043B\u044F\u0435\u0442 \u043A\u043E\u0440\u0435\u043D\u044C.", "\u0421\u043A\u0440\u0435\u0436\u0435\u0442 \u0434\u0435\u0440\u0435\u0432\u0430. \u041A\u0430\u0440\u0435\u0442\u0430 \u043F\u0430\u0434\u0430\u0435\u0442.", 13, 10, 1.18],
      [3900, "\u0422\u044B \u043D\u0435 \u0443\u0441\u043F\u0435\u0432\u0430\u0435\u0448\u044C \u043E\u0442\u0441\u043A\u043E\u0447\u0438\u0442\u044C.", "\u0423\u0434\u0430\u0440.", 10, 12, 1.24],
      [5100, "", "\u041D\u0438 \u0434\u043E\u0440\u043E\u0433\u0438. \u041D\u0438 \u0433\u043E\u043B\u043E\u0441\u043E\u0432. \u0422\u043E\u043B\u044C\u043A\u043E \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0435 \u0434\u044B\u0445\u0430\u043D\u0438\u0435.", 10, 12, 1.24]
    ] },
    wake: { duration: 8500, title: "\u0422\u042B \u0415\u0429\u0401 \u0417\u0414\u0415\u0421\u042C", beats: [
      [0, "\u2014 \u0421\u043B\u044B\u0448\u0438\u0448\u044C \u043C\u0435\u043D\u044F?", "\u0413\u043E\u043B\u043E\u0441 \u043F\u0440\u043E\u0431\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0441\u043A\u0432\u043E\u0437\u044C \u0448\u0443\u043C \u0432 \u0433\u043E\u043B\u043E\u0432\u0435.", 12, 11, 1.2],
      [3e3, "\u2014 \u041D\u0435 \u0432\u0441\u0442\u0430\u0432\u0430\u0439 \u0440\u0435\u0437\u043A\u043E. \u041C\u044B \u0436\u0438\u0432\u044B.", "\u0421\u044B\u0440\u0430\u044F \u0437\u0435\u043C\u043B\u044F \u043F\u043E\u0434 \u043B\u0430\u0434\u043E\u043D\u044C\u044E. \u0417\u0430\u043F\u0430\u0445 \u0442\u0440\u0430\u0432\u044B \u0438 \u0440\u0430\u0441\u0441\u044B\u043F\u0430\u043D\u043D\u043E\u0433\u043E \u0437\u0435\u0440\u043D\u0430.", 12, 11, 1.08],
      [5800, "\u041B\u0438\u0441\u0430 \u0441\u0438\u0434\u0438\u0442 \u0432\u043E\u0437\u043B\u0435 \u0440\u0430\u0437\u0431\u0438\u0442\u043E\u0439 \u043A\u0430\u0440\u0435\u0442\u044B.", "\u0414\u043E\u0440\u043E\u0433\u0430 \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u043A\u0430\u0436\u0435\u0442\u0441\u044F \u0437\u043D\u0430\u043A\u043E\u043C\u043E\u0439. \u041D\u043E \u0442\u0435\u043F\u0435\u0440\u044C \u044D\u0442\u043E \u0442\u0432\u043E\u0439 \u043F\u0443\u0442\u044C.", 13, 10, 0.9]
    ] }
  };
  var clamp = (v) => Math.max(0, Math.min(1, v));
  function duration(name) {
    if (!scripts[name]) throw Error("Unknown cinematic");
    return scripts[name].duration;
  }
  function frame(name, time) {
    const s = scripts[name];
    if (!s) throw Error("Unknown cinematic");
    const t = Math.max(0, time), i = s.beats.findLastIndex((b2) => t >= b2[0]), b = s.beats[i];
    return {
      title: s.title,
      caption: b[1] || "\u2026",
      detail: b[2],
      shot: i,
      x: b[3],
      y: b[4],
      zoom: b[5],
      progress: clamp(t / s.duration),
      done: t >= s.duration,
      black: name === "crash" ? clamp((t - 4e3) / 1100) : name === "wake" ? 1 - clamp((t - 1200) / 4200) : 0,
      cartRoll: name === "crash" ? clamp((t - 2100) / 1500) : 1,
      impact: name === "crash" && t >= 2200 && t < 4600,
      night: name === "wake" || name === "crash" || name === "road" && t > 7600
    };
  }
  return __toCommonJS(caravan_timeline_exports);
})();
