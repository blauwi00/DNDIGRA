(() => {
  "use strict";
  const $ = (id) => document.getElementById(id), KEY = "beyond-texels-iphone-test-1", DIRS = World.directions, atlas = new Image(), sprites = /* @__PURE__ */ new Map(), pieces = /* @__PURE__ */ new Map();
  let selected = null, path = [], busy = false, moving = false, stopRequested = false, diceTimer, cells = [], state, departingNpc = null;
  function random(n) {
    const a = new Uint32Array(1), limit = 4294967296 - 4294967296 % n;
    do {
      crypto.getRandomValues(a);
    } while (a[0] >= limit);
    return a[0] % n + 1;
  }
  function fresh() {
    return { scene: "hub", round: 1, combat: false, active: "eldar", gold: 75, xp: 0, level: 1, potions: 8, chest: false, relic: false, seed: random(99999), doors: {}, loot: {}, settings: { lights: true, animations: true, grid: true, ambient: 0.28, intensity: 1 }, party: [{ id: "eldar", name: "Эльдар", genitive: "Эльдара", kind: 0, x: 5, y: 9, hp: 24, max: 24, facing: 2, move: 4, acted: false, range: 1, attack: 4, damage: 8 }, { id: "mira", name: "Мира", genitive: "Миры", kind: 1, x: 4, y: 10, hp: 18, max: 18, facing: 2, move: 4, acted: false, range: 5, attack: 4, damage: 6 }, { id: "bor", name: "Бор", genitive: "Бора", kind: 2, x: 6, y: 10, hp: 28, max: 28, facing: 2, move: 3, acted: false, range: 1, attack: 3, damage: 8 }], enemies: [], logs: ["Эллен ждёт в библиотеке. Дверь справа ведёт к манекенам, северная — в крипту."] };
  }
  const seedFresh = fresh;
  fresh = () => {
    const s = seedFresh();
    s.party.forEach((p) => DND.init(p));
    s.rolls = [];
    s.advantage = 0;
    s.order = [];
    s.cursor = 0;
    s.autoShield = false;
    s.rulesStage = 1;
    return s;
  };
  try {
    state = JSON.parse(localStorage.getItem(KEY)) || fresh();
    window.ProceduralLocations?.restore(state);
    window.GeneratedWorlds?.restore(state);
    if (!World.scenes[state.scene] || state.world) state = fresh();
  } catch {
    state = fresh();
  }
  const scene = () => World.scenes[state.scene], props = () => scene().props.filter((p) => (p.id !== "novice" || (state.scene === "crypt" ? state.episode?.stage === "investigate" : ["report", "done"].includes(state.episode?.stage))) && window.Adventure?.visibleProp(p, state) !== false).map((p) => p.id === departingNpc?.id ? departingNpc : p).concat((state.drops || []).filter((p) => p.scene === state.scene).map((p) => ({ ...p, type: "ground-item", solid: false, kind: 42 }))), doorKey = (p) => state.scene + ":" + p.id, isOpen = (p) => !!state.doors[doorKey(p)] || !!(state.world?.gen && window.GeneratedWorlds?.opened(p));
  const emitGameAction = (type, detail = {}) => window.dispatchEvent(new CustomEvent('game-action', { detail: { type, ...detail } }));
  const actionAllowed = (type, id) => !window.Adventure?.locked && window.Tutorial?.allowsAction?.(type, id) !== false;
  function save() {
    if (state.world) {
      window.Worlds?.capture();
      return;
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
    }
  }
  function tell(s) {
    state.logs.push(s);
    if (state.logs.length > 120) state.logs.shift();
    save();
  }
  const active = () => state.party.find((p) => p.id === state.active), dist = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y), same = (a, b) => a.x === b.x && a.y === b.y;
  function all() {
    return [...state.party, ...state.enemies, ...state.world ? [] : scene().dummies].filter((p) => !p.dead && (p.kind < 3 || p.hp > 0));
  }
  const entity = (p) => all().find((e) => same(e, p)), prop = (p) => props().find((e) => same(e, p) && !(e.type === "chest" && state.loot[doorKey(e)]));
  function blocked(p) {
    if (World.tile(scene(), p.x, p.y) !== "floor") return true;
    const o = prop(p);
    if (o && o.solid !== false && !(o.type === "door" && isOpen(o))) return true;
    const hit = World.collisionAt(scene(), p.x, p.y);
    if (!hit || !hit.blocksMovement) return false;
    const owner = hit.owner;
    if (window.Adventure?.visibleProp(owner, state) === false) return false;
    if (owner.id === "novice" && !props().some((p2) => p2.id === "novice")) return false;
    if (owner.type === "door" && isOpen(owner) || owner.type === "chest" && state.loot[doorKey(owner)]) return false;
    return true;
  }
  function routeBlocked(p) {
    const o = prop(p);
    return scene().generated && !state.combat && o?.type === "door" && (!o.lock || isOpen(o)) ? false : blocked(p);
  }
  function pathTo(a, b) {
    if (routeBlocked(b) || entity(b)) return null;
    const q = [[{ x: a.x, y: a.y }]], seen = /* @__PURE__ */ new Set([a.x + "," + a.y]);
    while (q.length) {
      const r = q.shift(), last = r.at(-1);
      if (same(last, b)) return r.slice(1);
      for (const [dx, dy] of DIRS) {
        const n = { x: last.x + dx, y: last.y + dy }, k = n.x + "," + n.y;
        if (seen.has(k) || routeBlocked(n) || entity(n)) continue;
        seen.add(k);
        q.push([...r, n]);
      }
    }
    return null;
  }
  function line(a, b) {
    if (same(a, b) || a.x !== b.x && a.y !== b.y) return false;
    const dx = Math.sign(b.x - a.x), dy = Math.sign(b.y - a.y);
    for (let p = { x: a.x + dx, y: a.y + dy }; !same(p, b); p = { x: p.x + dx, y: p.y + dy }) if (blocked(p) || entity(p)) return false;
    return true;
  }
  const canAttack = (a, b) => window.Torches?.canAttack(a) !== false && a.hp > 0 && (!state.combat || !a.acted) && b.hp > 0 && dist(a, b) <= DND.weapon(a, state.level).range && line(a, b) && (b.dummy || window.visibility?.canSee(a, b) !== false);
  function face(a, b) {
    a.facing = b.x > a.x ? 1 : b.x < a.x ? 3 : b.y < a.y ? 2 : 0;
  }
  function roll(n = 20, show = true) {
    const result = random(n);
    if (show) {
      $("number").textContent = result;
      $("dice").hidden = false;
      clearTimeout(diceTimer);
      diceTimer = setTimeout(() => $("dice").hidden = true, 1400);
    }
    return result;
  }
  function cutAtlas() {
    const c = document.createElement("canvas");
    c.width = atlas.width;
    c.height = atlas.height;
    const x = c.getContext("2d", { willReadFrequently: true });
    x.drawImage(atlas, 0, 0);
    const sw = atlas.width / 4, rows = [0, 0.2153, 0.4115, 0.6061, 0.7974, 1], anchors = [0.1754, 0.3748, 0.575, 0.7663];
    for (let i = 0; i < 20; i++) {
      const row = Math.floor(i / 4), col = i % 4, sx = Math.round(col * sw), sy = Math.round(rows[row] * atlas.height), w = Math.floor(sw), h = Math.round((rows[row + 1] - rows[row]) * atlas.height), data = x.getImageData(sx, sy, w, h).data;
      let l = w, t = h, r = 0, b = 0;
      for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) if (data[(yy * w + xx) * 4 + 3] > 40) {
        l = Math.min(l, xx);
        t = Math.min(t, yy);
        r = Math.max(r, xx);
        b = Math.max(b, yy);
      }
      const s = { sx: sx + l, sy: sy + t, w: r - l + 1, h: b - t + 1, ax: (r - l + 1) / 2, ay: row < 4 ? anchors[row] * atlas.height - sy - t : (b - t + 1) / 2 };
      if (row < 4) {
        const baseRow = Math.round(anchors[row] * atlas.height - sy);
        let left = w, right = -1;
        for (let yy = Math.max(0, baseRow - 3); yy < Math.min(h, baseRow + 4); yy++) for (let xx = 0; xx < w; xx++) {
          const k = (yy * w + xx) * 4;
          if (data[k + 3] > 100 && data[k] > data[k + 1] * 1.12 && data[k + 1] > data[k + 2] * 1.05) {
            left = Math.min(left, xx);
            right = Math.max(right, xx);
          }
        }
        if (right > left) s.ax = (left + right) / 2 - l;
      }
      sprites.set(i, s);
    }
    render();
  }
  function sprite(c, i, mode = "portrait") {
    if (i === 20 && window.drawKeeper) {
      window.drawKeeper(c, mode);
      return;
    }
    if (i >= 21 && window.drawEnvironment) {
      window.drawEnvironment(c, i, mode);
      return;
    }
    const s = sprites.get(i), mini = mode === "figure" || mode === "prop";
    c.width = mini ? 128 : 256;
    c.height = mini ? 160 : 320;
    const cx = c.getContext("2d");
    cx.clearRect(0, 0, c.width, c.height);
    cx.setTransform(mini ? 0.5 : 1, 0, 0, mini ? 0.5 : 1, 0, 0);
    if (!s) return;
    const cropH = mode === "head" ? s.h * 0.66 : s.h, scale = mode === "figure" ? Math.min(184 / s.w, 270 / s.h) : mode === "prop" ? Math.min(215 / s.w, 268 / s.h) : Math.min(238 / s.w, 286 / cropH), w = s.w * scale, h = cropH * scale;
    cx.drawImage(atlas, s.sx, s.sy, s.w, cropH, mode === "figure" ? 128 - s.ax * scale : 128 - w / 2, mode === "figure" ? 320 / 1.45 - s.ay * scale : 160 - h / 2, w, h);
  }
  function art(i, mode = "portrait") {
    if (window.voxel?.ready && ["portrait", "head"].includes(mode)) {
      if (i >= 31 && i <= 54 || i === 18) {
        const item = window.voxel.portrait(i, "item");
        if (item) return item;
      }
      const kind = i < 16 ? Math.floor(i / 4) : i === 20 ? 5 : null;
      if (kind !== null) {
        const m = window.voxel.portrait(kind);
        if (m) return m;
      }
    }
    const c = document.createElement("canvas");
    c.className = "sprite";
    sprite(c, i, mode);
    return c;
  }
  function terrain() {
    if (window.voxel?.ready) {
      window.voxel.sync();
      return;
    }
    const S = scene(), floor = $("terrain"), c = floor.getContext("2d"), unit = 48;
    floor.width = S.W * unit;
    floor.height = S.H * unit;
    c.setTransform(unit, 0, 0, unit, 0, 0);
    c.fillStyle = "#0c1915";
    c.fillRect(0, 0, S.W, S.H);
    for (let y = 0; y < S.H; y++) for (let x = 0; x < S.W; x++) {
      const t = World.tile(S, x, y);
      if (t === "floor") {
        c.save();
        c.translate(x + 0.5, y + 0.5);
        window.drawTerrainTile?.(c, x, y, state.seed);
        c.restore();
        if (state.settings.grid) {
          c.strokeStyle = "#101c242d";
          c.lineWidth = 0.012;
          c.strokeRect(x + 8e-3, y + 8e-3, 0.984, 0.984);
        }
      }
      if (t === "wall") window.drawWallTile?.(c, x, y, state.seed, World.faces(S, x, y));
    }
    window.renderDecor?.(c, S);
    window.updateLighting?.();
  }
  function createCells() {
    const S = scene();
    $("board").style.setProperty("--cols", S.W);
    $("board").style.setProperty("--rows", S.H);
    $("board").style.width = S.W * 64 + "px";
    $("board").style.height = S.H * 64 + "px";
    $("cells").replaceChildren();
    cells = [];
    for (let y = 0; y < S.H; y++) for (let x = 0; x < S.W; x++) {
      const b = document.createElement("button");
      b.className = "cell";
      b.dataset.x = x;
      b.dataset.y = y;
      b.setAttribute("role", "gridcell");
      b.onclick = () => {
        if (window.camera?.allowClick() !== false) mapTap({ x, y });
      };
      $("cells").append(b);
      cells.push(b);
    }
  }
  function select(p) {
    if (prop(p)?.type === "chandelier") return;
    if (busy || window.HUD?.pending || window.Worlds?.locked || window.Adventure?.locked) return;
    selected = p;
    path = [];
    window.voxel?.tap(prop(p) || entity(p));
    const e = entity(p);
    if (e && e.kind < 3) {
      if (!state.combat) state.active = e.id;
      save();
    } else if (!e) {
      const o = prop(p);
      if (o && (interactionLabels[o.type] || o.type === "torch")) path = interactionRoute(active(), o) || [];
      else if (!blocked(p)) path = pathTo(active(), p) || [];
    }
    render();
    emitGameAction('selection', { kind: e ? 'actor' : prop(p) ? 'prop' : 'tile', x: p.x, y: p.y });
  }
  function mapTap(p) {
    if (moving) { stopRequested = true; return; }
    if (busy || window.HUD?.pending || window.Worlds?.locked || window.Adventure?.locked) return;
    if (!p) { selected = null; path = []; render(); return; }
    select(p);
  }
  function dismissMapActions() { selected = null; render(); }
  function renderPieces() {
    for (const e of all()) {
      let el = pieces.get(e.id);
      if (!el) {
        el = document.createElement("div");
        el.dataset.id = e.id;
        el.append(art(e.sprite ?? e.kind * 4 + e.facing, e.dummy ? "figure" : "figure"));
        $("pieces").append(el);
        pieces.set(e.id, el);
      }
      el.style.setProperty("--x", e.x);
      el.style.setProperty("--y", e.y);
      el.style.zIndex = String(20 + e.y);
      el.className = "piece " + (e.kind === 3 ? "enemy" : e.dummy ? "dummy" : "ally") + (e.id === state.active ? " active" : "") + (selected && same(e, selected) ? " targeted" : "");
      sprite(el.firstChild, e.sprite ?? e.kind * 4 + e.facing, "figure");
    }
    for (const [id, el] of pieces) if (!all().some((e) => e.id === id)) {
      el.remove();
      pieces.delete(id);
    }
  }
  function renderObjects() {
    $("objects").replaceChildren();
    for (const p of props()) {
      if (p.type === "chest" && state.loot[doorKey(p)]) continue;
      const el = document.createElement("div");
      el.className = "prop " + p.type;
      el.dataset.id = p.id;
      el.style.setProperty("--x", p.x);
      el.style.setProperty("--y", p.y);
      el.style.zIndex = String(20 + p.y);
      el.append(art(p.type === "door" && isOpen(p) ? 27 : p.kind, "prop"));
      $("objects").append(el);
    }
    window.renderTorches?.(scene());
  }
  function renderTarget() {
    const p = selected && (entity(selected) || prop(selected)) || active(), object = "type" in p;
    const preview = object && p.type === "npc" ? window.Artwork?.npc(p.name) : object && window.voxel?.ready ? window.voxel.portrait(p.kind, p.type, p) : null;
    $("target-art").replaceChildren((!object && p.appearance && window.voxel?.heroPortrait ? voxel.heroPortrait(p) : null) || preview || art(object ? p.kind : p.sprite ?? p.kind * 4 + (p.facing || 0), object ? "prop" : "portrait"));
    $("target-name").textContent = p.name;
    $("target-hp").textContent = object ? { torch: window.Torches?.fixture(p.id).present ? "Можно взять или погасить" : "Можно повесить факел", chandelier: "Потолочный свет", npc: "Житель", door: isOpen(p) ? "Открыта" : "Закрыта", portal: "Переход в другую локацию", chest: "Монеты и зелье", altar: "Реликвия", books: "Книги", desk: "Стол", cover: "Преграда" }[p.type] || "" : p.dummy ? "Бесконечное восстановление" : p.hp + " / " + p.max + " HP";
    $("target-bar").style.width = object ? "0%" : p.hp / p.max * 100 + "%";
    $("target-extra").textContent = object ? "" : p.dummy ? "Тест ближнего удара и заклинаний" : `КД ${p.ac} · ${DND.weapon(p, state.level).name} · ${DND.weapon(p, state.level).range} кл. · 4 стороны`;
    $("target-panel").classList.toggle("object-target", object);
    const handPanel = $("map-hands"), a = active();
    handPanel.replaceChildren();
    const name = document.createElement("span");
    name.textContent = a.name + " · руки";
    handPanel.append(name);
    a.hands.forEach((item, i) => {
      const b = document.createElement("button");
      b.textContent = ({ sword: "⚔ ", shield: "◇ ", torch: "♨ ", staff: "✦ ", bow: "⌁ ", empty: "○ " }[item] || "") + Torches.labels[item] + (item === "torch" ? a.torch ? " · горит" : " · погашен" : "");
      b.setAttribute("aria-label", "Рука " + (i + 1) + ": " + Torches.labels[item]);
      b.onclick = () => Torches.openHands();
      handPanel.append(b);
    });
    const action = object && selected ? objectAction(p) : null;
    const actions = [];
    if (!busy && object && selected && p.type !== "chandelier") {
      const route = approachPath(a, p), reachable = route !== null && (!state.combat || route.length <= a.move);
      const enabled = !busy && a.hp > 0 && reachable && !window.Worlds?.locked;
      if (dist(a, p) !== 1) actions.push({ id: "approach", label: "Подойти", enabled, run: () => approachInteract(p, "approach") });
      actions.push({ id: "inspect", label: "Осмотреть", enabled, run: () => approachInteract(p, "inspect") });
      if (action && action.label !== "Осмотреть") actions.push({ id: "use", label: p.type === "npc" ? "Поговорить" : action.label, enabled: action.enabled && !window.Worlds?.locked, run: action.fn });
    } else if (!busy && selected && !object && (p.kind === 3 || p.dummy)) {
      actions.push({ id: "attack", label: p.dummy ? "Пробный удар" : "Атаковать", enabled: !busy && canAttack(a, p) && !window.Worlds?.locked, run: () => attack(p) });
    } else if (!busy && selected && !entity(selected) && !prop(selected) && path.length) {
      actions.push({ id: "move", label: "Идти" + (state.combat ? " · " + path.length + " кл." : ""), enabled: a.hp > 0 && !window.Worlds?.locked && (!state.combat || path.length <= a.move), run: move });
    }
    const anchor = actions[0]?.id === "move" ? { ...selected, name: "Клетка " + (selected.x + 1) + ", " + (selected.y + 1) } : p;
    window.objectPrompt = { p: actions.length ? anchor : null, actions, text: action?.label || "", enabled: !!action?.enabled, run: action?.fn };
  }
  const interactionLabels = { "ground-item": "Подобрать", npc: "Говорить", door: "Открыть дверь", portal: "Перейти", chest: "Открыть сундук", altar: "Осмотреть", books: "Читать", desk: "Осмотреть", barrel: "Осмотреть", crate: "Осмотреть", chair: "Осмотреть", planter: "Осмотреть", scrolls: "Читать", rack: "Осмотреть", clue: "Изучить следы", counter: "Осмотреть", table: "Осмотреть", lantern: "Осмотреть", waymark: "Осмотреть" };
  function approachPath(a, p) {
    if (dist(a, p) === 1) return [];
    const routes = DIRS.map(([dx, dy]) => pathTo(a, { x: p.x + dx, y: p.y + dy })).filter((r) => r !== null);
    return routes.sort((a2, b) => a2.length - b.length)[0] ?? null;
  }
  function interactionRoute(a, p) {
    if (p.type === "door" && isOpen(p)) return pathTo(a, p.axis === "horizontal" ? { x: p.x + (a.x < p.x ? 1 : a.x > p.x ? -1 : a.facing === 3 ? -1 : 1), y: p.y } : { x: p.x, y: p.y + (a.y <= p.y ? 1 : -1) });
    return approachPath(a, p);
  }
  async function approachInteract(p, mode = "use") {
    const a = active(), id = state.scene;
    if (busy || a.hp <= 0 || window.Worlds?.locked || !actionAllowed('interaction') || state.combat && mode === "use" || !props().some((o) => o.id === p.id)) return;
    const through = mode === "use" && p.type === "door" && isOpen(p), route = mode === "use" ? interactionRoute(a, p) : approachPath(a, p);
    if (route === null) {
      tell("К этому предмету нет свободного прохода.");
      render();
      return;
    }
    if (state.combat && route.length > a.move) return;
    window.closeDialogue?.();
    busy = true;
    stopRequested = false;
    path = route;
    render();
    try {
      const completed = await travel(a, route);
      path = [];
      busy = false;
      if (a.hp>0 && !a.dead && completed === route.length && !stopRequested && state.scene === id && dist(a, p) === 1) {
        if (through) {
          selected = null;
        } else if (mode === "approach") {
          face(a, p);
        } else if (mode === "inspect") {
          face(a, p);
          window.openObjectDialogue?.({ ...p, description: p.description || ({ npc: "Перед вами " + p.name + ".", door: isOpen(p) ? "Дверь открыта." : "Дверь закрыта.", chest: "Закрытый сундук.", portal: "Переход в другую локацию." }[p.type] || "Вы внимательно осматриваете предмет: " + p.name + ".") });
        } else {
          face(a, p);
          await interact(p);
        }
      } else if(a.hp>0)tell(stopRequested ? "Движение остановлено." : "Подойти к предмету не удалось.");
    } finally {
      busy = false;
      path = [];
      save();
      render();
    }
  }
  function objectAction(p) {
    if (p.type === "chandelier") return null;
    const a = active(), label = p.id === "trial-cache" ? state.trial?.step === 3 ? "Взять письмо" : "Осмотреть нишу" : p.type === "torch" ? Torches.fixture(p.id).present ? "Факел · взять / погасить" : "Оставить факел" : p.type === "door" && isOpen(p) ? "Пройти через дверь" : p.container ? "Открыть" : p.type === "altar" ? "Исследовать алтарь" : interactionLabels[p.type] || (p.description ? 'Осмотреть' : null);
    if (!label) return null;
    return { label, enabled: !busy && a.hp > 0 && (state.combat ? p.type === "torch" && dist(a, p) === 1 && !a.bonusUsed : approachPath(a, p) !== null), fn: () => state.combat ? interact(p) : approachInteract(p) };
  }
  function primary() {
    if (moving) return { label: "Остановиться", enabled: true, fn: () => {
      stopRequested = true;
    } };
    const a = active(), e = selected && entity(selected), p = selected && prop(selected);
    if (a.hp <= 0) return { label: "Без сознания", enabled: false };
    if (e && (e.kind === 3 || e.dummy)) return { label: e.dummy ? "Пробный удар" : "Атака", enabled: canAttack(a, e), fn: () => attack(e) };
    if (p) {
      const action = objectAction(p);
      if (action) return action;
    }
    if (path.length) return { label: "Идти · " + path.length, enabled: !state.combat || path.length <= a.move, fn: move };
    return { label: "Идти", enabled: false };
  }
  function render() {
    // A natural 20 on the ordinary death save returns the hero to the same
    // unresolved encounter, with the surviving enemies and their saved HP.
    if (state.world?.gen?.v === 3 && state.encounter && !state.encounter.tutorial && !state.combat && state.party.some(p => p.hp > 0 && !p.dead)) {
      state.combat = true;
      queueMicrotask(() => resumeEncounter());
    }
    window.Torches?.ensure();
    document.body.classList.toggle("no-animations", !state.settings.animations);
    const a = active(), S = scene();
    $("title").textContent = state.combat ? "Бой · раунд " + state.round : "За гранью";
    $("scene-name").textContent = S.name;
    $("turn").textContent = state.combat ? "Ход " + a.genitive : "Исследование";
    $("party").replaceChildren();
    for (const p of state.party) {
      const b = document.createElement("button");
      b.className = "member " + (p.id === state.active ? "active" : "");
      b.disabled = busy || p.hp <= 0 || state.combat && p.id !== state.active;
      b.setAttribute("aria-label", p.name);
      const portrait = document.createElement("div");
      portrait.className = "portrait";
      portrait.append(window.voxel?.heroPortrait && p.appearance ? voxel.heroPortrait(p) : art(p.kind * 4, "head"));
      const n = document.createElement("b");
      n.textContent = p.name;
      const hp = document.createElement("small");
      hp.textContent = p.hp + "/" + p.max + " HP";
      const tr = document.createElement("div");
      tr.className = "hp-track";
      const fill = document.createElement("i");
      fill.style.width = p.hp / p.max * 100 + "%";
      tr.append(fill);
      b.append(portrait, n, hp, tr);
      b.onclick = () => {
        state.active = p.id;
        selected = null;
        path = [];
        save();
        render();
        window.camera?.center(p, true);
      };
      $("party").append(b);
    }
    const route = new Set(path.map((p) => p.x + "," + p.y));
    for (const b of cells) {
      const p = { x: +b.dataset.x, y: +b.dataset.y }, e = entity(p), o = prop(p);
      let cl = "cell";
      if (World.tile(S, p.x, p.y) !== "floor" && !["door", "portal", "torch"].includes(o?.type)) cl += " unavailable";
      if (selected && same(p, selected)) cl += " selected";
      if (route.has(p.x + "," + p.y)) cl += " route";
      if (o && ["npc", "door", "portal", "chest"].includes(o.type)) cl += " interactive";
      if (e && (e.kind === 3 || e.dummy) && canAttack(a, e)) cl += " attackable";
      b.className = cl;
      b.tabIndex = cl.includes("unavailable") ? -1 : 0;
      b.setAttribute("aria-label", e ? e.name : o ? o.name : "Клетка " + p.x + ", " + p.y);
    }
    renderObjects();
    renderPieces();
    renderTarget();
    const action = primary();
    $("action-label").textContent = action.label;
    $("action").disabled = !moving && (busy || !action.enabled);
    $("action").onclick = action.fn || (() => {
    });
    $("action").hidden = true;
    $("potion").disabled = busy || state.potions <= 0 || a.hp >= a.max || a.hp <= 0 || state.combat && a.bonusUsed;
    $("end").disabled = busy || !state.combat;
    $("narrative").textContent = state.logs.at(-1);
    $("hint").textContent = state.combat ? `${a.name}: ${a.move} кл. · ${a.acted ? "действие потрачено" : "1 действие"}` : "Выберите клетку или предмет, затем действие рядом с клеткой.";
    $("resources").textContent = "Ур. " + state.level + " · " + state.gold + " монет";
    terrain();
    window.renderViews?.();
    window.renderTests?.();
    window.renderRules?.();
    window.Scenario?.render();
    window.GameMenu?.render();
    window.Episode?.render();
    window.Worlds?.render();
    window.HUD?.render();
    window.Adventure?.render();
    window.Tutorial?.render();
    if (!state.encounter?.tutorial && state.tutorial?.phase !== 'rescue') window.DeathScreen?.render();
    window.ProceduralLocations?.render();
    if (window.Worlds?.locked) {
      $("action").disabled = true;
      $("potion").disabled = true;
      $("end").disabled = true;
    }
    const note = $("route-note");
    if (note) {
      note.hidden = !selected || !path.length || moving;
      note.textContent = path.length + " кл." + (state.combat ? " · движение " + path.length + " / " + a.move : " · остановка у цели");
      note.classList.toggle("over-budget", state.combat && path.length > a.move);
    }
  }
  const wait = (ms) => new Promise((r) => setTimeout(r, ms)), animate = () => state.settings.animations && !matchMedia("(prefers-reduced-motion: reduce)").matches;
  async function travel(e, steps) {
    let completed = 0;
    const controlled = e.kind < 3 && busy && e.id === state.active;
    moving = controlled;
    if (controlled) render();
    try {
      for (const p of steps) {
        if(e.hp<=0||e.dead)return completed;
        if (controlled && stopRequested) break;
        const duration = animate() ? 220 : 0;
        if (state.combat && !e.disengaged) {
          for (const foe of (e.kind === 3 ? state.party : state.enemies).filter((f) => f.hp > 0 && !f.reactionUsed && DND.weapon(f, state.level).range === 1 && dist(e, f) === 1 && dist(p, f) > 1)) {
            foe.reactionUsed = true;
            await strike(foe, e, foe.kind === 3, true);
            if (e.hp <= 0) return completed;
          }
        }
        if (scene().generated && !state.combat) {
          const door = prop(p);
          if (door?.type === "door" && !isOpen(door) && !door.lock) {
            state.doors[doorKey(door)] = true;
            window.voxel?.sync();
          }
        }
        const from = { x: e.x, y: e.y };
        face(e, p);
        e.x = p.x;
        e.y = p.y;
        if(e.id===state.active && state.world?.gen) await window.GeneratedWorlds.step(scene(),e.x,e.y);
        if (state.combat && controlled) e.move--;
        save();
        window.voxel?.move(e.id, from, p, duration);
        renderPieces();
        window.voxel?.sync();
        window.fx?.step(e, duration);
        await wait(duration);
        completed++;
        if (controlled) {
          emitGameAction('movement', { success: true, from, to: { x: e.x, y: e.y }, scene: state.scene });
          if (window.Adventure?.step(scene(), e.x, e.y)) return completed;
        }
        if(e.hp<=0||e.dead)return completed;
        if (controlled) path = steps.slice(completed);
      }
      return completed;
    } finally {
      if (controlled) moving = false;
    }
  }
  async function move() {
    if (window.Worlds?.locked || window.Adventure?.locked) return;
    const a = active(), r = path.slice();
    if (busy || !r.length || state.combat && r.length > a.move) return;
    busy = true;
    stopRequested = false;
    render();
    try {
      await travel(a, r);
      selected = null;
    } finally {
      path = [];
      busy = false;
      save();
      render();
    }
  }
  function report(text) {
    state.rolls.push(text);
    if (state.rolls.length > 40) state.rolls.shift();
    tell(text);
  }
  function freeRoll(expression) {
    if (state.world || document.getElementById("test-view").hidden) throw Error("Свободные броски доступны только в мастерской.");
    const r = DND.roll(expression);
    report(r.text);
    $("dice-panel").close();
    window.HUD?.showRoll(r, "Свободный бросок");
    $("dice-result").textContent = r.text;
    $("number").textContent = r.total;
    $("dice").hidden = false;
    setTimeout(() => $("dice").hidden = true, 1600);
    render();
    return r;
  }
  function heal(a, n) {
    a.hp = Math.min(a.max, a.hp + n);
    if (a.hp > 0) {
      a.conditions = a.conditions.filter((c) => c !== "unconscious");
      a.death = { success: 0, failure: 0, stable: false };
    }
  }
  async function strike(a, b, enemy = false, reaction = false) {
    face(a, b);
    renderPieces();
    window.voxel?.sync();
    const hasAdvantage = state.advantage > 0 || a.hidden || b.conditions?.includes("unconscious");
    const hasDisadvantage = state.advantage < 0 || a.hands?.includes("torch") || b.dodging && window.visibility?.canSee(b, a) || a.conditions.includes("poisoned") || DND.weapon(a, state.level).range > 1 && all().some((e) => e.kind !== a.kind && e.kind >= 3 !== a.kind >= 3 && !e.dummy && e.hp > 0 && dist(a, e) === 1);
    const advantage = hasAdvantage && hasDisadvantage ? 0 : hasAdvantage ? 1 : hasDisadvantage ? -1 : 0;
    const r = DND.attack(a, b, a.kind === 3 ? 1 : state.level, advantage);
    if (a.hands?.includes("torch")) r.text += "\nФакел в руке — источник помехи (правило игры).";
    if (r.hit && b.conditions?.includes("unconscious") && dist(a, b) === 1 && !r.critical) {
      r.critical = true;
      const w = r.weapon;
      r.damage = DND.roll(`${(w.count || 1) * 2}d${w.die}${w.damageBonus ? (w.damageBonus > 0 ? "+" : "") + w.damageBonus : ""}`);
      r.amount = r.damage.total;
      r.text += "\nБез сознания: критическое попадание вблизи · " + r.damage.text;
    }
    a.hidden = false;
    if (r.hit && b.kind === 1 && b.classId !== "cleric" && state.autoShield && b.slots > 0 && !b.reactionUsed && r.natural !== 20 && r.total < b.ac + 5) {
      b.slots--;
      b.reactionUsed = true;
      b.shielded = true;
      r.hit = false;
      r.amount = 0;
      r.text += "\nМира: реакция «Щит», КД +5. Удар отражён.";
    }
    if (r.hit && a.concentration?.id === "mark" && a.concentration.target === b.id) {
      const mark = DND.roll(`${r.critical ? 2 : 1}d6`);
      r.amount += mark.total;
      r.text += "\nМетка охотника · " + mark.text;
    }
    if (r.hit && a.classId === "rogue" && !a.sneakUsed && advantage >= 0 && (advantage > 0 || state.party.some((p) => p.id !== a.id && p.hp > 0 && dist(p, b) === 1))) {
      const sneak = DND.roll(Math.ceil(state.level / 2) * (r.critical ? 2 : 1) + "d6");
      r.amount += sneak.total;
      a.sneakUsed = true;
      r.text += "\nСкрытая атака · " + sneak.text;
    }
    await window.HUD?.check({ ...r, sides: 20, success: r.weapon.save ? r.success : r.hit, outcome: r.hit ? "Попадание" : "Промах" }, a.name + " · " + r.weapon.name);
    await window.fx?.strike(a, b, animate());
    if (enemy && state.encounter) a.acted = true;
    DND.damage(b, r.amount, r.critical);
    // Training uses the real attack and damage rolls, but never causes a
    // permanent death. A knockout is recovered separately from the lesson's
    // scripted ambush, without marking that rescue checkpoint complete.
    if (b.kind < 3 && state.encounter?.tutorial && b.hp <= 0) {
      b.dead = false;
      b.death = { success: 0, failure: 0, stable: true };
    }
    if (b.concentration && r.amount) {
      if (!b.hp) b.concentration = null;
      else {
        const check = DND.test(DND.mod(b.stats.con), Math.max(10, Math.floor(r.amount / 2)));
        r.text += "\nКонцентрация · " + check.text;
        if (!check.success) b.concentration = null;
      }
    }
    window.fx?.impact(b, r.hit ? r.amount : "Промах", r.critical, animate());
    report(r.text);
    if (r.hit && r.damage) window.HUD?.showRoll({ ...r.damage, outcome: r.amount + " " + r.weapon.type.toLowerCase() + " урона" }, "Урон · " + r.weapon.name);
    return r.amount;
  }
  function victory() {
    if (state.enemies.length && state.enemies.every((e) => e.hp <= 0)) {
      const encounter = state.encounter;
      state.combat = false;
      if (!window.Adventure?.victory(encounter)) {
        state.xp += 60;
        tell("Тренировочный бой завершён. +60 опыта.");
      }
      save();
      emitGameAction('victory', { success: true, encounterId: encounter?.id });
      return true;
    }
    return false;
  }
  async function attack(e) {
    if (window.Worlds?.locked || !actionAllowed('attack')) return;
    const a = active();
    if (busy || !canAttack(a, e)) return;
    busy = true;
    render();
    try {
      await strike(a, e);
      if (state.combat) a.acted = true;
      emitGameAction('attack', { success: true, targetId: e.id, encounterId: state.encounter?.id });
      victory();
    } catch (error) {
      console.error(error);
      tell("Не удалось завершить атаку. Управление восстановлено.");
    } finally {
      busy = false;
      save();
      render();
    }
  }
  function startTurn(p) {
    p.sneakUsed = false;
    p.move = p.speed;
    p.acted = false;
    p.bonusUsed = false;
    p.reactionUsed = false;
    p.dodging = false;
    p.disengaged = false;
    p.shielded = false;
    if (p.hp === 0 && !p.dead) {
      const r = DND.death(p);
      if (r) report(r.text);
      if (p.hp) p.conditions = p.conditions.filter((c) => c !== "unconscious");
    }
  }
  async function beginEncounter(spec, options = {}) {
    if (busy || state.combat || !state.world || active().hp <= 0 || active().dead) return false;
    const training = options.tutorial === true;
    const canonical = training ? window.GeneratedWorlds?.plan?.story?.tutorial?.[spec.id === 'tutorial-win' ? 'win' : spec.id === 'tutorial-loss' ? 'loss' : ''] : (scene().encounters || []).find(e => e.id === spec.id);
    if (!canonical || !canonical.enemies?.length || !training && state.story?.cleared.includes(canonical.id)) return false;
    const reward = training ? { xp: 0, gold: 0 } : { xp: canonical.reward?.xp || 0, gold: canonical.reward?.gold || 0 };
    state.encounter = { id: canonical.id, scene: state.scene, name: canonical.name, tutorial: training, scriptedLoss: training && options.scriptedLoss === true && canonical.id === 'tutorial-loss', reward };
    state.enemies = canonical.enemies.map(def => {
      const e = DND.init({ id: def.id, name: def.name, kind: def.kind ?? 3, x: def.x, y: def.y, facing: 2, visual: def.visual, gen: def.gen });
      e.hp = e.max = def.max; e.ac = e.baseAC = def.ac;
      e.className = ({ beast: 'Зверь', bandit: 'Налётчик', training: 'Учебный манекен' })[def.visual] || e.className;
      return e;
    });
    if (training) {
      const first = state.enemies[0], hero = active();
      const spawn = DIRS.map(([dx, dy]) => ({ x: first.x + dx, y: first.y + dy }))
        .filter(p => !blocked(p) && !state.enemies.some(e => same(e, p)))
        .sort((a, b) => dist(a, hero) - dist(b, hero))[0];
      if (spawn) { hero.x = spawn.x; hero.y = spawn.y; }
      // The class lesson has already spent its real resource. Renew it for
      // repeated training attempts, while retaining the wound for the potion.
      for (const p of state.party) { p.slots = p.maxSlots; p.secondWind = p.maxSecondWind; }
    }
    state.combat = true; state.round = 1; state.cursor = 0;
    selected = null; path = []; busy = true;
    try {
      const contenders = [...state.party, ...state.enemies].filter(p => !p.dead && p.hp > 0);
      for (const p of contenders) {
        const roll = DND.test(DND.mod(p.stats.dex), 0);
        p.initiative = roll.total;
        report(p.name + ' · инициатива · ' + roll.text);
        window.HUD?.showRoll(roll, p.name + ' · инициатива');
      }
      state.order = contenders.sort((a, b) => b.initiative - a.initiative || a.id.localeCompare(b.id)).map(p => p.id);
      save(); render(); window.voxel?.sync();
      await enemiesUntilPlayer(false);
      return true;
    } finally { busy = false; save(); render(); }
  }
  async function resumeEncounter() {
    if (busy || !state.combat || !state.encounter) return;
    if (state.encounter.id === 'tutorial-win' && state.party.every(p => p.hp <= 0)) { recoverTrainingWin(); render(); return; }
    const p = all().find(p => p.id === state.order[state.cursor]);
    if (p?.kind < 3 && p.hp > 0) { state.active = p.id; render(); return; }
    busy = true;
    try { await enemiesUntilPlayer(false, true); } finally { busy = false; save(); render(); }
  }
  function recoverTrainingWin() {
    if (!state.encounter?.tutorial || state.encounter.id !== 'tutorial-win') return false;
    for (const p of state.party) {
      p.dead = false; heal(p, p.max); p.conditions = []; p.slots = p.maxSlots; p.secondWind = p.maxSecondWind;
      p.move = p.speed; p.acted = p.bonusUsed = p.reactionUsed = false;
      if ([13, 14].includes(state.tutorial?.step)) DND.damage(p, Math.min(3, p.max - 1));
    }
    state.combat = false; state.encounter = null; state.enemies = []; state.order = []; state.cursor = 0;
    tell('Учебный противник останавливается. Целитель помогает тебе подняться; можно повторить бой без риска для жизни.');
    emitGameAction('training-retry', { success: true, encounterId: 'tutorial-win' });
    return true;
  }
  async function enemiesUntilPlayer(advance = true, resuming = false) {
    if (advance) {
      state.cursor++;
      if (state.cursor >= state.order.length) {
        state.cursor = 0;
        state.round++;
      }
    }
    let guard = 0;
    while (state.combat && guard++ < state.order.length * 2) {
      const id = state.order[state.cursor], p = [...state.party, ...state.enemies].find((p2) => p2.id === id);
      if (p && !p.dead) {
        const resumeSpentEnemy = resuming && state.encounter && p.kind === 3 && p.acted;
        if (!resumeSpentEnemy) {
        startTurn(p);
        if (p.kind < 3 && p.hp > 0) {
          state.active = p.id;
          window.camera?.center(p);
          break;
        }
        if (p.kind === 3 && p.hp > 0) {
          // Ambushers wait for the learner's first completed turn; initiative
          // is still rolled and saved with the ordinary D&D rules.
          if (state.encounter?.scriptedLoss && state.tutorial?.step === 17) {
            p.acted = true;
          } else {
          const t = state.party.filter((a) => a.hp > 0 && !a.dead).sort((a, b) => dist(p, a) - dist(p, b))[0];
          if (t) {
            if (dist(p, t) > 1) {
              const paths = DIRS.map(([dx, dy]) => pathTo(p, { x: t.x + dx, y: t.y + dy })).filter(Boolean).sort((a, b) => a.length - b.length);
              if (paths[0]) await travel(p, paths[0].slice(0, p.speed));
            }
            if (p.hp > 0 && dist(p, t) === 1) await strike(p, t, true);
          }
          }
          p.acted = true;
          save();
        }
        }
      }
      state.cursor++;
      resuming = false;
      if (state.cursor >= state.order.length) {
        state.cursor = 0;
        state.round++;
      }
      if (state.party.every((p2) => p2.hp <= 0)) {
        if (state.encounter?.tutorial) {
          if (!recoverTrainingWin()) window.Adventure?.defeatRescue();
          break;
        }
        state.combat = false;
        tell(state.world?.gen?.v === 3 ? "Ты потерял сознание. Броски спасения от смерти решат твою судьбу; угроза на дороге остаётся." : "Отряд выведен из боя. В «Тесте» можно восстановить героев.");
      }
      // On a new round enemies receive fresh actions; the saved acted flag
      // only suppresses a completed enemy action when resuming its checkpoint.
      if (state.cursor === 0) state.enemies.forEach(e => e.acted = false);
    }
    selected = null;
    path = [];
    busy = false;
    save();
    render();
  }
  async function endTurn() {
    if (window.Worlds?.locked || !actionAllowed('turn')) return;
    if (busy || !state.combat) return;
    busy = true;
    selected = null;
    path = [];
    render();
    emitGameAction('turn', { success: true, encounterId: state.encounter?.id });
    await enemiesUntilPlayer();
    if (state.encounter?.scriptedLoss) window.Adventure?.defeatRescue();
  }
  function potion() {
    if (!actionAllowed('potion')) return;
    if ($("potion").disabled) return;
    const a = active(), r = DND.roll("2d4+2"), before = a.hp;
    heal(a, r.total);
    state.potions--;
    if (state.combat) a.bonusUsed = true;
    window.fx?.impact(a, "+" + (a.hp - before), false, animate(), "heal");
    report(a.name + " · лечебное зелье · " + r.text + " HP; восстановлено " + (a.hp - before) + ".");
    window.HUD?.showRoll({ ...r, outcome: "Восстановлено " + (a.hp - before) + " HP" }, "Лечебное зелье");
    emitGameAction('potion', { success: true, amount: a.hp - before });
    render();
  }
  function target() {
    return selected && entity(selected);
  }
  async function special(id) {
    if (window.Worlds?.locked || !actionAllowed(['dodge', 'disengage'].includes(id) ? 'defense' : 'ability', id)) return;
    const a = active();
    if (busy || a.hp <= 0 || a.dead) return;
    const bonus = ["torch", "secondWind", "mark"].includes(id);
    if (state.combat && (bonus ? a.bonusUsed : a.acted) && !["skills"].includes(id)) return;
    if (["shortRest", "longRest"].includes(id)) {
      if (state.combat) return;
      for (const p of state.party) {
        if (p.dead) continue;
        if (id === "longRest") {
          heal(p, p.max);
          p.slots = p.maxSlots;
          p.secondWind = p.maxSecondWind;
          p.hitDice = Math.min(p.maxHitDice, p.hitDice + Math.max(1, Math.floor(state.level / 2)));
          p.concentration = null;
          if (p.mageArmor) {
            p.armorAC = p.baseAC - (p.hands.includes('shield') ? 2 : 0);
            delete p.mageArmor;
          }
          p.ac = p.baseAC;
        } else {
          if (p.hp < p.max && p.hitDice > 0) {
            const r = DND.roll(`1d${p.hitDie}+${DND.mod(p.stats.con)}`);
            heal(p, r.total);
            p.hitDice--;
            report(p.name + " · кость здоровья · " + r.text);
          }
          if (p.kind === 2) p.secondWind = Math.min(p.maxSecondWind, p.secondWind + 1);
        }
        p.acted = p.bonusUsed = p.reactionUsed = false;
        p.conditions = p.hp ? [] : p.conditions;
      }
      tell(id === "longRest" ? "Длительный отдых: прошло 8 часов. Ресурсы восстановлены." : "Короткий отдых: прошёл 1 час. Потрачены доступные кости здоровья.");
      render();
      return;
    }
    if (id === "skills") {
      modal("Проверки навыков", "Выберите навык для пробной проверки СЛ 12.");
      for (const [key, [ability, name]] of Object.entries(DND.skills)) {
        const b = document.createElement("button");
        b.textContent = name;
        b.onclick = () => {
          const adv = key === "perception" && window.visibility?.level(a) !== "bright" ? -1 : state.advantage || 0;
          const r = DND.skill(a, key, 12, state.level, adv);
          report(r.text);
          $("modal").close();
          window.HUD?.check(r, name);
          render();
        };
        $("modal-body").append(b);
      }
      return;
    }
    if (id === "cure") {
      if (a.classId !== "cleric" || !a.slots || !a.hands.includes("empty")) return;
      const t = target() || a;
      if (t.kind >= 3 || t.dead || dist(a, t) > 1 || t.hp >= t.max) {
        tell("Выберите раненого союзника на соседней клетке или лечите себя.");
        render();
        return;
      }
      a.slots--;
      const r = DND.roll("2d8" + (DND.mod(a.stats.wis) >= 0 ? "+" : "") + DND.mod(a.stats.wis));
      heal(t, Math.max(0, r.total));
      if (state.combat) a.acted = true;
      report(a.name + " · Лечение ран · " + r.text);
      window.HUD?.showRoll(r, "Лечение ран");
      emitGameAction('ability', { success: true, id });
      render();
      return;
    }
    if (id === "torch") {
      window.Torches.toggle();
      return;
    }
    if (id === "secondWind") {
      if (a.kind !== 2 || !a.secondWind) return;
      a.secondWind--;
      const r = DND.roll("1d10+" + state.level);
      heal(a, r.total);
      if (state.combat) a.bonusUsed = true;
      report(a.name + " · Второе дыхание · " + r.text);
      window.HUD?.showRoll(r, "Второе дыхание");
      emitGameAction('ability', { success: true, id });
      render();
      return;
    }
    if (id === "mark") {
      const b = target();
      if (a.kind !== 0 || !a.slots || !b || b.kind < 3 || !window.visibility.canSee(a, b)) {
        tell("Выберите видимую цель для метки.");
        render();
        return;
      }
      a.slots--;
      a.concentration = { id: "mark", target: b.id };
      if (state.combat) a.bonusUsed = true;
      tell(a.name + " накладывает Метку охотника: +1d6 к попаданиям оружием. Требует концентрации.");
      emitGameAction('ability', { success: true, id });
      render();
      return;
    }
    if (["missile", "burning", "magearmor"].includes(id)) {
      if (a.kind !== 1 || !a.slots) return;
      if (!a.hands?.includes("empty")) {
        tell("Для заклинания нужна свободная рука. Откройте выбор рук.");
        return;
      }
      if (id === "magearmor") {
        a.slots--;
        a.mageArmor = true;
        a.armorAC = 13 + DND.mod(a.stats.dex);
        a.ac = a.armorAC + (a.hands.includes('shield') ? 2 : 0);
        if (state.combat) a.acted = true;
        tell("Доспехи мага: КД " + a.ac + " на 8 часов.");
        emitGameAction('ability', { success: true, id });
        render();
        return;
      }
      const b = target();
      if (!b || b.kind < 3 || !line(a, b) || dist(a, b) > (id === "missile" ? 24 : 3) || !window.visibility.canSee(a, b)) {
        tell("Выберите видимую цель по прямой: " + (id === "missile" ? "до 24" : "до 3") + " клеток.");
        render();
        return;
      }
      busy = true;
      render();
      a.slots--;
      face(a, b);
      await window.fx?.strike(a, b, animate());
      if (id === "missile") {
        const r = DND.roll("3d4+3");
        DND.damage(b, r.total);
        report("Волшебная стрела: три дротика в выбранную цель. Автоматическое попадание · " + r.text);
        window.fx?.impact(b, r.total, false, animate());
      } else {
        const r = DND.roll("3d6"), dc = 8 + DND.pb(state.level) + DND.mod(a.stats.int), dx = Math.sign(b.x - a.x), dy = Math.sign(b.y - a.y);
        report("Огненные ладони · " + r.text + "; спасбросок Ловкости СЛ " + dc);
        for (const e of all().filter((p) => p.id !== a.id)) {
          const forward = (e.x - a.x) * dx + (e.y - a.y) * dy, side = Math.abs((e.x - a.x) * dy - (e.y - a.y) * dx);
          if (forward < 1 || forward > 3 || side > forward / 2 || !window.visibility.clearRay({ x: a.x + 0.5, y: a.y + 0.5 }, { x: e.x + 0.5, y: e.y + 0.5 })) continue;
          const check = DND.test(DND.mod(e.stats?.dex || 10), dc), amount = check.success ? Math.floor(r.total / 2) : r.total;
          DND.damage(e, amount);
          report(e.name + " · " + check.text + " · " + amount + " огненного урона");
          window.fx?.impact(e, amount, false, animate());
        }
      }
      if (state.combat) a.acted = true;
      emitGameAction('ability', { success: true, id });
      victory();
      busy = false;
      save();
      render();
      return;
    }
    if (id === "dodge") a.dodging = true;
    if (id === "disengage") a.disengaged = true;
    if (id === "dash") a.move += a.speed;
    if (id === "hide") {
      const shade = window.visibility.level(a);
      if (shade === "bright" && state.enemies.some((e) => e.hp > 0 && line(e, a))) {
        tell("Сначала зайдите в укрытие: вы на виду.");
        render();
        return;
      }
      const r = DND.skill(a, "stealth", 15, state.level, state.advantage || 0);
      a.hidden = r.success;
      report(r.text);
      window.HUD?.showRoll(r, "Скрытность");
    }
    if (id === "search") {
      const r = DND.skill(a, "perception", 12, state.level, window.visibility.level(a) === "bright" ? state.advantage || 0 : -1);
      report(r.text);
      window.HUD?.showRoll(r, "Восприятие");
    } else if (!["hide"].includes(id)) tell(a.name + ": " + ({ dodge: "уклонение до следующего хода", disengage: "отход без провоцированных атак", dash: "рывок · дополнительное движение" }[id] || id));
    if (state.combat) a.acted = true;
    emitGameAction(id === 'dodge' ? 'dodge' : 'ability', { success: true, id });
    render();
  }
  async function approachTransfer(p, onArrive) {
    if (busy || window.HUD?.pending || state.combat || window.Worlds?.locked) return false;
    const route = approachPath(active(), p);
    if (route === null) return false;
    busy = true;
    stopRequested = false;
    render();
    try {
      await travel(active(), route);
      if (stopRequested || dist(active(), p) !== 1) return false;
      face(active(), p);
      busy = false;
      onArrive();
      save();
      return true;
    } finally {
      busy = false;
      selected = null;
      path = [];
      render();
    }
  }
  async function departNpc(p) {
    if (busy || state.combat || window.Worlds?.locked) return false;
    const portal = props().find((p2) => p2.type === "portal");
    if (!portal) return false;
    const route = approachPath(p, portal);
    if (route === null) {
      tell((p.name || 'Путник').split(' · ')[0] + " ждёт: освободите проход к выходу.");
      render();
      return false;
    }
    busy = true;
    departingNpc = { ...p, doorId: portal.id };
    selected = null;
    path = [];
    render();
    try {
      for (const next of [...route, { x: portal.x, y: portal.y }]) {
        const from = { x: departingNpc.x, y: departingNpc.y };
        face(departingNpc, next);
        departingNpc.x = next.x;
        departingNpc.y = next.y;
        const m = window.voxel?.models.get("prop:" + p.id);
        if (m) m.userData.p = departingNpc;
        window.voxel?.move("prop:" + p.id, from, next, animate() ? 220 : 0);
        render();
        await wait(animate() ? 220 : 0);
      }
      return true;
    } finally {
      departingNpc = null;
      busy = false;
    }
  }
  async function arriveNpc(p) {
    if (busy || state.combat || window.Worlds?.locked) return false;
    const portal = props().find(p => p.type === 'portal');
    if (!portal) return false;
    const route = approachPath(p, portal);
    if (route === null) return false;
    const steps = [{ x: p.x, y: p.y }, ...route, { x: portal.x, y: portal.y }].reverse();
    busy = true; departingNpc = { ...p, ...steps[0] };
    selected = null; path = []; render(); window.voxel?.sync();
    try {
      for (const next of steps.slice(1)) {
        const from = { x: departingNpc.x, y: departingNpc.y };
        face(departingNpc, next); Object.assign(departingNpc, next);
        const model = window.voxel?.models.get('prop:' + p.id);
        if (model) model.userData.p = departingNpc;
        window.voxel?.move('prop:' + p.id, from, next, animate() ? 160 : 0);
        render(); await wait(animate() ? 160 : 0);
      }
      return true;
    } finally { departingNpc = null; busy = false; render(); }
  }
  function enterScene(id, throughDoor = false, entryId = null) {
    if (busy || state.combat || !World.scenes[id] || throughDoor && window.Adventure?.blocksPortals) return;
    window.GeneratedWorlds?.prefetch(id);
    const previousScene = state.scene;
    state.scene = id;
    state.combat = false;
    state.enemies = [];
    state.party.forEach((p, i) => {
      [p.x, p.y] = scene().spawns[i];
      p.facing = 2;
      p.acted = false;
      p.move = p.speed || 6;
    });
    if (scene().generated) {
      [active(), ...state.party.filter((p) => p.id !== state.active)].forEach((hero, i) => {
        [hero.x, hero.y] = scene().spawns[i];
      });
    }
    if (throughDoor) {
      const entry = scene().props.find((p) => p.type === "portal" && (entryId ? p.id === entryId : p.destination === previousScene));
      if (entry && scene().arrivals?.[entry.id]) {
        [active(), ...state.party.filter((p) => p.id !== state.active)].forEach((hero, i) => {
          [hero.x, hero.y] = scene().arrivals[entry.id][i];
          hero.facing = 2;
        });
      } else if (entry) {
        const claimed = /* @__PURE__ */ new Set();
        for (const hero of state.party) {
          const candidates = [];
          for (let y = 0; y < scene().H; y++) for (let x = 0; x < scene().W; x++) {
            const cell2 = { x, y };
            if (World.tile(scene(), x, y) === "floor" && !blocked(cell2) && !claimed.has(x + "," + y)) candidates.push(cell2);
          }
          candidates.sort((a, b) => dist(a, entry) - dist(b, entry) || a.y - b.y || a.x - b.x);
          const cell = candidates[0];
          if (cell) {
            hero.x = cell.x;
            hero.y = cell.y;
            hero.facing = cell.x > entry.x ? 1 : cell.x < entry.x ? 3 : cell.y > entry.y ? 0 : 2;
            claimed.add(cell.x + "," + cell.y);
          }
        }
      }
    }
    selected = null;
    path = [];
    window.closeDialogue?.();
    for (const el of pieces.values()) el.remove();
    pieces.clear();
    createCells();
    tell("Переход: " + scene().name + ".");
    if (state.world) {
      state.world.discovered = [...new Set([...(state.world.discovered || []), state.scene])];
      window.Worlds?.capture();
    }
    render();
    window.camera?.reset();
    window.Adventure?.enterScene();
    emitGameAction('scene', { success: true, from: previousScene, to: id });
    $("viewport").classList.remove("scene-enter");
    void $("viewport").offsetWidth;
    $("viewport").classList.add("scene-enter");
  }
  function interact(p) {
    if (window.Worlds?.locked) return;
    if (busy || !actionAllowed('interaction') || active().hp<=0 || active().dead || dist(active(), p) !== 1) return;
    if (p.type === 'portal' && (state.combat || window.Adventure?.blocksPortals || window.Tutorial?.blocksPortals)) return;
    if (!state.combat && window.Adventure?.interact(p)) {
      emitGameAction('interaction', { success: true, propId: p.id, propType: p.type });
      return;
    }
    if(state.world?.gen && !state.combat && window.GeneratedWorlds.interact(p)) {
      emitGameAction('interaction', { success: true, propId: p.id, propType: p.type });
      return;
    }
    if (p.type === "ground-item") {
      window.Inventory.pickup(p);
      return;
    }
    if (p.id === "episode-tracks") {
      return window.Episode.tracks();
    }
    if (p.id === "novice") {
      if (state.scene === "hub") return window.openObjectDialogue({ name: "Лин · послушник", description: "Спасибо, что помогли мне выбраться. Я останусь с Эллен. Записи из крипты теперь у вас." });
      return window.Episode.rescue(p);
    }
    if (p.type === "portal" && window.Episode?.portal(p)) return;
    if (p.id === "trial-cache") {
      window.Scenario.interact(p);
      window.openObjectDialogue?.({ ...p, description: state.logs.at(-1) });
      return;
    }
    if (p.type === "torch") {
      window.Torches.interact(p);
      return;
    }
    if (state.combat) return;
    if (p.type === "npc") {
      face(active(), p);
      renderPieces();
      if (scene().generated) window.openObjectDialogue?.(p);
      else window.openKeeperDialogue?.();
      return;
    }
    if (p.type === "portal") {
      enterScene(p.destination, true, p.destinationEntry);
      return;
    }
    if (p.type === "door") {
      state.doors[doorKey(p)] = true;
      setTimeout(() => window.fx?.door(p), 0);
      tell("Дверь открыта. Нажмите её на карте и выберите «Пройти через дверь».");
    } else if (p.type === "chest") {
      if (state.loot[doorKey(p)]) {
        window.openObjectDialogue?.({ ...p, description: "Сундук пуст. Вы уже забрали его содержимое." });
        return;
      }
      if (!window.Inventory.roomFor("potion")) {
        window.openObjectDialogue({ ...p, description: "Внутри монеты и зелье, но рюкзак заполнен. Освободите ячейку и откройте сундук снова." });
        return;
      }
      state.loot[doorKey(p)] = true;
      state.chest = true;
      state.gold += 15;
      state.potions++;
      window.fx?.impact(p, "+15 монет", false, animate(), "heal");
      tell(state.world ? "Сундук открыт: +15 монет и зелье. Добыча получена один раз." : "Сундук открыт: +15 монет и зелье. Сброс доступен во вкладке «Тест».");
      window.HUD?.reward(15, 0);
      window.openObjectDialogue?.({ ...p, description: "В сундуке вы нашли 15 монет и лечебное зелье. Они уже в рюкзаке." });
    } else if (p.type === "altar") {
      state.altarClaims ||= {};
      if (state.altarClaims[doorKey(p)]) {
        tell("Алтарь уже исследован.");
        render();
        return;
      }
      state.altarClaims[doorKey(p)] = true;
      state.relic = true;
      state.xp += 25;
      tell("Алтарь откликается тёплым светом. +25 опыта.");
      window.fx?.pulse(p);
    } else window.openObjectDialogue?.(p);
    save();
    render();
  }
  function modal(title, text) {
    $("modal-title").textContent = title;
    $("modal-body").textContent = text;
    $("modal").showModal();
  }
  function journal() {
    if (window.Adventure?.journal()) return;
    modal("Хроника", state.logs.slice(-20).join("\n\n"));
    emitGameAction('journal', { success: true });
  }
  function help() {
    modal("Как проверять полигон", "Нажмите свободную клетку, затем выберите «Идти» возле неё. Нажмите предмет — действия появятся возле его клетки. Осмотр требует подхода. Во время движения тап по карте останавливает героя. Движение и атаки — по четырём сторонам (домашнее правило). Инициатива задаёт очередь, действие и бонус расходуются отдельно. Факел сначала нужно снять с настенного крепления с соседней клетки. В «Герое» или «Действиях» выберите, что держать в двух руках; в «Рюкзаке» можно зажечь, погасить и убрать найденный факел. На пустое крепление его можно вернуть. Щит даёт +2 КД, лук занимает две руки. Домашние правила: факел в руке даёт помеху атакам; в бою смена снаряжения расходует действие, операции с факелом — бонусное действие. Преимущество и помеха взаимно отменяются. Откройте «Действия» для навыков и отдыха. Фигурки поворачиваются к шагу и цели. Приближайте карту двумя пальцами и двигайте одним. Предметы и NPC доступны с соседней клетки. Вкладка «Тест» восстанавливает предметы, запускает бой и позволяет менять свет. Диалоги сейчас сценарные; ИИ-ведущий ещё не подключён.");
  }
  function test(action, value) {
    if (state.world) {
      tell("Проверки доступны в отдельной тестовой комнате.");
      render();
      return;
    }
    if (busy) return;
    switch (action) {
      case "rules":
        state.rulesStage = +value;
        tell("Этап освоения правил: " + state.rulesStage + ".");
        break;
      case "poison":
        active().conditions = active().conditions.includes("poisoned") ? [] : ["poisoned"];
        tell("Состояние «Отравлен» переключено.");
        break;
      case "down":
        active().hp = 0;
        active().conditions = ["unconscious"];
        active().death = { success: 0, failure: 0, stable: false };
        tell("Герой без сознания. Восстановите его кнопкой теста.");
        break;
      case "heal":
        for (const p of state.party) {
          p.dead = false;
          heal(p, p.max);
          p.acted = p.bonusUsed = p.reactionUsed = false;
          p.move = p.speed || 6;
          p.slots = p.maxSlots;
          p.secondWind = p.maxSecondWind;
        }
        state.potions = 8;
        tell("Отряд и зелья восстановлены.");
        break;
      case "coins":
        state.gold += 50;
        tell("+50 тестовых монет.");
        break;
      case "xp":
        state.xp += 100;
        tell("+100 опыта.");
        break;
      case "loot":
        state.loot = {};
        state.chest = false;
        state.relic = false;
        tell("Сундуки и алтарь сброшены.");
        break;
      case "dialogue":
        state.persuasionAttempted = false;
        state.secretKnown = false;
        state.clues = [];
        window.openKeeperDialogue?.();
        break;
      case "npc":
        if (state.scene !== "hub") enterScene("hub");
        state.party[0].x = 6;
        state.party[0].y = 4;
        state.active = state.party[0].id;
        selected = { x: 6, y: 3 };
        window.camera?.center(active(), true);
        break;
      case "dummies":
        if (state.scene !== "hub") enterScene("hub");
        state.doors["hub:door"] = true;
        state.party.forEach((p, i) => {
          [p.x, p.y] = scene().trainingSpawn[i];
        });
        window.camera?.center(active(), true);
        break;
      case "fight":
        state.combat = true;
        state.round = 1;
        state.party.forEach((p, i) => {
          [p.x, p.y] = scene().trainingSpawn[i];
          p.dead = false;
          heal(p, p.max);
          p.acted = p.bonusUsed = p.reactionUsed = false;
          p.move = p.speed;
        });
        state.doors[state.scene + ":door"] = true;
        state.enemies = scene().enemySpawn.map(([x, y], i) => DND.init({ id: "e" + i, name: i ? "Костяной дозорный" : "Скелетный страж", kind: 3, x, y, facing: 3 }));
        for (const p of [...state.party, ...state.enemies]) {
          const r = DND.test(DND.mod(p.stats.dex), 0);
          p.initiative = r.total;
          report(p.name + " · инициатива · " + r.text.split(" против ")[0]);
        }
        state.order = [...state.party, ...state.enemies].sort((a, b) => b.initiative - a.initiative || DND.mod(b.stats.dex) - DND.mod(a.stats.dex) || a.id.localeCompare(b.id)).map((p) => p.id);
        state.cursor = 0;
        busy = true;
        tell("Тренировочный бой. Очередь определена инициативой.");
        render();
        enemiesUntilPlayer(false);
        return;
      case "peace":
        state.combat = false;
        state.enemies = [];
        tell("Свободное исследование.");
        break;
      case "scene":
        enterScene(value);
        return;
      case "doors":
        for (const p of props().filter((p2) => p2.type === "door")) if (!entity(p)) state.doors[doorKey(p)] = !isOpen(p);
        tell("Двери переключены.");
        break;
      case "damage":
        window.fx?.impact(active(), 8, false, animate());
        break;
      case "crit":
        window.fx?.impact(active(), 16, true, animate());
        break;
      case "miss":
        window.fx?.impact(active(), "Промах", false, animate());
        break;
      case "light":
        state.settings.lights = !state.settings.lights;
        break;
      case "grid":
        state.settings.grid = !state.settings.grid;
        break;
      case "animations":
        state.settings.animations = !state.settings.animations;
        break;
      case "ambient":
        state.settings.ambient = +value;
        break;
      case "intensity":
        state.settings.intensity = +value;
        break;
      case "reset":
        state = fresh();
        enterScene("hub");
        return;
    }
    save();
    render();
  }
  $("roll").onclick = () => {
  };
  document.getElementById("workshop-dice").onclick = () => {
    if (!state.world && !document.getElementById("test-view").hidden) $("dice-panel").showModal();
  };
  $("potion").onclick = potion;
  $("end").onclick = endTurn;
  $("journal").onclick = () => window.openNarratorDialogue?.();
  $("turn").onclick = help;
  $("close").onclick = () => $("modal").close();
  $("menu").onclick = () => window.GameMenu.open();
  $("target-toggle").onclick = () => {
    $("target-panel").classList.toggle("expanded");
    $("target-toggle").setAttribute("aria-expanded", String($("target-panel").classList.contains("expanded")));
  };
  function loadHero(h, fromMenu = false) {
    if (busy || state.combat && !fromMenu) return false;
    window.Worlds?.detach();
    const settings = { ...state.settings };
    state = fresh();
    state.settings = settings;
    state.heroTestId = h.id;
    const a = structuredClone(h);
    [a.x, a.y] = World.scenes.hub.spawns[0];
    state.party = [a];
    state.active = a.id;
    state.level = a.level;
    state.xp = a.xp;
    state.gold = a.gold;
    state.potions = 0;
    state.rulesStage = 3;
    state.logs = ["Тестовая комната · " + a.name + ". Здесь можно проверить созданного героя; испытания не меняют его сохранённый стартовый лист."];
    pieces.forEach((el) => el.remove());
    pieces.clear();
    selected = null;
    path = [];
    window.closeDialogue?.();
    window.Torches?.ensure();
    createCells();
    save();
    render();
    window.voxel?.reset();
    window.camera?.center(a);
    return true;
  }
  function startGenerated(world) {
    if (busy || state.world || state.combat) return false;
    window.Scenario?.stop(false);
    delete state.episode;
    delete state.trial;
    state.procedural = { version: world.version, seed: world.seed };
    for (const field of ["doors", "loot", "altarClaims", "lightFixtures"]) if (state[field]) {
      for (const k of Object.keys(state[field])) if (k.startsWith("proc-")) delete state[field][k];
    }
    state.drops = (state.drops || []).filter((p) => !p.scene.startsWith("proc-"));
    enterScene(world.start.location);
    tell("Вы у таверны «Медный фонарь». Войдите с улицы, найдите трактирщика и люк в кухне.");
    save();
    render();
    return true;
  }
  function loadWorld(snapshot) {
    window.ProceduralLocations?.restore(snapshot);
    window.GeneratedWorlds?.restore(snapshot);
    state = structuredClone(snapshot);
    state.altarClaims ||= {};
    if (state.world) state.world.discovered ||= ["hub"];
    selected = null;
    path = [];
    busy = moving = false;
    stopRequested = false;
    pieces.forEach((el) => el.remove());
    pieces.clear();
    window.closeDialogue?.();
    window.Torches?.ensure();
    createCells();
    render();
    window.voxel?.reset();
    window.camera?.center(active());
    window.Adventure?.restore(state);
    window.Tutorial?.restore();
    return true;
  }
  window.gameDebug = { startGenerated, loadWorld, loadHero, get state() {
    return state;
  }, get departingNpc() {
    return departingNpc;
  }, departNpc, arriveNpc, beginEncounter, resumeEncounter, endTurn, recoverTrainingWin, approachTransfer, get actionBusy() {
    return busy;
  }, get busy() {
    return busy || !!window.Worlds?.locked;
  }, get props() {
    return props();
  }, get scene() {
    return scene();
  }, get selected() {
    return selected;
  }, get route() {
    return path;
  }, get moving() {
    return moving;
  }, stop: () => {
    stopRequested = true;
  }, special, freeRoll, report, heal, all, isOpen, blocked, select, mapTap, dismissMapActions, attack, pathTo, line, canAttack, approachInteract, approachPath, center: (p) => ({ x: (p.x + 0.5) / scene().W, y: (p.y + 0.5) / scene().H }), render, art, active, save, tell, potion, journal, help, roll, test, enterScene, animate, getPiece: (id) => pieces.get(id) };
  window.Torches?.ensure();
  atlas.onload = cutAtlas;
  atlas.src = "assets/cartoon-atlas.png";
  createCells();
  new ResizeObserver(terrain).observe($("board"));
  render();
  window.initViews?.();
  window.initTests?.();
  window.initCamera?.();
  window.initRules?.();
  window.GameMenu?.init();
  window.Worlds?.init();
  window.Heroes?.init();
  window.HUD?.init();
  window.ProceduralLocations?.init();
  window.CinematicMenu?.init();
})();
