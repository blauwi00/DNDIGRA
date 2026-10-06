export const GENERATOR_VERSION = 1;
export const DIRECTIONS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
export const LOCATION_IDS = ["proc-street", "proc-tavern", "proc-cellar"];
const key = (p) => `${p.x},${p.y}`, point = ([x, y]) => ({ x, y });
const near = (p) => DIRECTIONS.map(([dx, dy]) => ({ x: p.x + dx, y: p.y + dy }));
const tile = (s, p) => s.tiles[p.y]?.[p.x] ?? "void";
const inside = (r, p) => r && p.x >= r.x && p.y >= r.y && p.x < r.x + r.w && p.y < r.y + r.h;
const distance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
export function normalizeSeed(seed) {
  if (!["string", "number"].includes(typeof seed) || !String(seed).trim() || String(seed).trim().length > 64) throw Error("Seed: \u043E\u0442 1 \u0434\u043E 64 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432.");
  return String(seed).trim();
}
function hash(text) {
  let n = 2166136261;
  for (const c of text) {
    n ^= c.codePointAt(0);
    n = Math.imul(n, 16777619);
  }
  return n >>> 0;
}
function random(seed) {
  let n = hash(seed);
  const next = () => {
    n = n + 1831565813 | 0;
    let t = Math.imul(n ^ n >>> 15, 1 | n);
    t ^= t + Math.imul(t ^ t >>> 7, 61 | t);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  return { int: (a, b) => a + Math.floor(next() * (b - a + 1)), shuffle(items) {
    const a = [...items];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(next() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  } };
}
function cells(r) {
  const a = [];
  for (let y = r.y; y < r.y + r.h; y++) for (let x = r.x; x < r.x + r.w; x++) a.push({ x, y });
  return a;
}
function blockedCells(s) {
  return new Set([...s.props.filter((p) => p.solid !== false && p.type !== "door"), ...s.decor.filter((p) => p.kind === "bench")].map(key));
}
function flood(s, start, blocked = blockedCells(s)) {
  const seen = /* @__PURE__ */ new Set(), queue = [];
  if (tile(s, start) !== "floor" || blocked.has(key(start))) return { seen, queue };
  queue.push(start);
  seen.add(key(start));
  for (let i = 0; i < queue.length; i++) for (const p of near(queue[i])) if (tile(s, p) === "floor" && !blocked.has(key(p)) && !seen.has(key(p))) {
    seen.add(key(p));
    queue.push(p);
  }
  return { seen, queue };
}
function path(s, start, end) {
  const blocked = blockedCells(s);
  for (const ps of Object.values(s.furnitureSlots || {})) ps.forEach((p) => blocked.add(key(p)));
  const queue = [start], parents = /* @__PURE__ */ new Map([[key(start), null]]);
  for (let i = 0; i < queue.length; i++) {
    const p = queue[i];
    if (key(p) === key(end)) {
      const route = [];
      for (let q = p; q; q = parents.get(key(q))) route.unshift(q);
      return route;
    }
    for (const q of near(p)) if (tile(s, q) === "floor" && !blocked.has(key(q)) && !parents.has(key(q))) {
      parents.set(key(q), p);
      queue.push(q);
    }
  }
  throw Error("\u041D\u0435\u0442 \u043F\u0443\u0442\u0438: " + s.id + "/" + key(end));
}
const room = (id, x, y, w, h, anchor = { x: x + Math.floor(w / 2), y: y + Math.floor(h / 2) }) => ({ id, role: id, x, y, w, h, anchor, required: true });
export function logicalPlan() {
  return { locations: [{ id: "proc-street", rooms: ["street", "street-entry"], links: [["street-entry", "street", "opening"]] }, { id: "proc-tavern", rooms: ["entry", "hall", "bar", "kitchen"], links: [["entry", "hall", "door"], ["hall", "bar", "opening"], ["hall", "kitchen", "door"]] }, { id: "proc-cellar", rooms: ["cellar-main", "cellar-store"], links: [["cellar-main", "cellar-store", "door"]] }], transitions: [{ id: "front-door", a: "proc-street", b: "proc-tavern", kind: "door" }, { id: "cellar-stairs", a: "proc-tavern", b: "proc-cellar", kind: "stairs" }] };
}
function location(id, name, rooms, outdoor = false) {
  const W = Math.max(...rooms.map((r) => r.x + r.w)) + 1, H = Math.max(...rooms.map((r) => r.y + r.h)) + 1, s = { id, name, W, H, rooms, tiles: Array.from({ length: H }, () => Array(W).fill("void")), props: [], decor: [], lights: [], dummies: [], spawns: [], trainingSpawn: [], enemySpawn: [], connections: [], arrivals: {}, reserved: [], routes: [], generated: true, outdoor, origin: { x: 0, y: 0, level: 0 } };
  for (const r of rooms) for (const p of cells(r)) {
    if (tile(s, p) === "floor") throw Error("\u041F\u0435\u0440\u0435\u0441\u0435\u0447\u0435\u043D\u0438\u0435 \u043A\u043E\u043C\u043D\u0430\u0442");
    s.tiles[p.y][p.x] = "floor";
  }
  for (const r of rooms) for (const p of cells(r)) for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (s.tiles[p.y + dy]?.[p.x + dx] === "void") s.tiles[p.y + dy][p.x + dx] = "wall";
  return s;
}
const prop = (id, type, x, y, name, extra = {}) => ({ id, type, x, y, name, kind: type === "npc" ? 20 : type === "chest" ? 17 : ["portal", "door"].includes(type) ? 26 : 24, ...extra });
function connect(s, a, b, p) {
  s.tiles[p.y][p.x] = "floor";
  p.rooms = [a, b];
  s.props.push(p);
  s.connections.push({ a, b, kind: "door", doorId: p.id });
}
function accessibleWithParty(s, start, parked = []) {
  const blocked = blockedCells(s);
  parked.forEach((p) => blocked.add(key(p)));
  const seen = flood(s, start, blocked).seen;
  for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) if (tile(s, { x, y }) === "floor" && !blocked.has(`${x},${y}`) && !seen.has(`${x},${y}`)) return false;
  return s.props.every((p) => ["chandelier", "waymark"].includes(p.type) || (p.access ? seen.has(key(p.access)) : near(p).some((q) => seen.has(key(q)))));
}
function entrySlots(s, p) {
  const doors = new Set(s.props.filter((p2) => p2.type === "door").map(key)), candidates = flood(s, p.access).queue.filter((c) => !doors.has(key(c)) && key(c) !== key(p.access)), parked = [];
  for (const c of candidates) {
    if (accessibleWithParty(s, p.access, [...parked, c])) parked.push(c);
    if (parked.length === 2) break;
  }
  if (parked.length !== 2) throw Error("\u041D\u0435\u0442 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430 \u0434\u043B\u044F \u043E\u0442\u0440\u044F\u0434\u0430");
  return [p.access, ...parked].map((p2) => [p2.x, p2.y]);
}
function finalizeArrivals(s) {
  for (const p of s.props.filter((p2) => p2.type === "portal")) s.arrivals[p.id] = entrySlots(s, p);
  s.spawns = s.entryPoint ? entrySlots(s, { access: s.entryPoint }) : structuredClone(Object.values(s.arrivals)[0]);
  s.reserved = [.../* @__PURE__ */ new Set([...s.reserved, ...[s.spawns, ...Object.values(s.arrivals)].flat().map((c) => c.join(","))])].sort();
}
function reserve(s) {
  const reserved = /* @__PURE__ */ new Set();
  for (const p of s.props.filter((p2) => p2.type === "portal")) {
    s.arrivals[p.id] = entrySlots(s, p);
    s.arrivals[p.id].forEach((c) => reserved.add(c.join(",")));
  }
  s.spawns = s.entryPoint ? [[s.entryPoint.x, s.entryPoint.y], [s.entryPoint.x - 1, s.entryPoint.y], [s.entryPoint.x + 1, s.entryPoint.y]] : structuredClone(Object.values(s.arrivals)[0]);
  s.spawns.forEach((c) => reserved.add(c.join(",")));
  for (const r of s.rooms) {
    const route = path(s, point(s.spawns[0]), r.anchor);
    s.routes.push({ to: r.id, cells: route });
    route.forEach((p) => reserved.add(key(p)));
  }
  for (const p of s.props) for (const c of p.type === "portal" ? [p.access] : near(p).filter((c2) => tile(s, c2) === "floor")) path(s, point(s.spawns[0]), c).forEach((q) => reserved.add(key(q)));
  if (s.id === "proc-tavern") {
    const b = s.rooms.find((r) => r.id === "bar");
    path(s, point(s.spawns[0]), { x: b.x + b.w - 4, y: b.y + 1 }).forEach((p) => reserved.add(key(p)));
  }
  s.reserved = [...reserved].sort();
}
function place(s, p, candidates) {
  const reserved = new Set(s.reserved), occupied = new Set(s.props.map(key));
  for (const c of candidates) {
    if (tile(s, c) !== "floor" || reserved.has(key(c)) || occupied.has(key(c))) continue;
    const item = { ...p, ...c };
    s.props.push(item);
    if (accessibleWithParty(s, point(s.spawns[0]))) return item;
    s.props.pop();
  }
  throw Error("\u041D\u0435\u0442 \u0431\u0435\u0437\u043E\u043F\u0430\u0441\u043D\u043E\u0433\u043E \u043C\u0435\u0441\u0442\u0430: " + s.id + "/" + p.id);
}
function furnish(s, rng) {
  const get = (id) => s.rooms.find((r) => r.id === id), inRoom = (id) => {
    const r = get(id);
    return rng.shuffle(cells(r).filter((p) => p.x === r.x || p.x === r.x + r.w - 1 || p.y === r.y || p.y === r.y + r.h - 1));
  }, add = (id, type, roomId, name, description, candidates, extra = {}) => place(s, prop(id, type, 0, 0, name, { roomId, description, ...extra }), candidates || inRoom(roomId));
  if (s.id === "proc-tavern") {
    for (let i = 0; i < 2; i++) add("bar-counter-" + i, "counter", "bar", "\u0411\u0430\u0440\u043D\u0430\u044F \u0441\u0442\u043E\u0439\u043A\u0430", "\u0417\u0430 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u043E\u0439 \u0441\u0442\u043E\u0439\u043A\u043E\u0439 \u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A \u043F\u0440\u0438\u043D\u0438\u043C\u0430\u0435\u0442 \u0433\u043E\u0441\u0442\u0435\u0439.", [s.furnitureSlots.counter[i]]);
    add("innkeeper", "npc", "bar", "\u0411\u0440\u0430\u043C \xB7 \u0442\u0440\u0430\u043A\u0442\u0438\u0440\u0449\u0438\u043A", "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C \u0432 \xAB\u041C\u0435\u0434\u043D\u044B\u0439 \u0444\u043E\u043D\u0430\u0440\u044C\xBB. \u0417\u0430\u043B \u043F\u0435\u0440\u0435\u0434 \u0432\u0430\u043C\u0438, \u043A\u0443\u0445\u043D\u044F \u0437\u0430 \u0431\u043E\u043A\u043E\u0432\u043E\u0439 \u0434\u0432\u0435\u0440\u044C\u044E. \u041B\u044E\u043A \u0432 \u043A\u0443\u0445\u043D\u0435 \u0432\u0435\u0434\u0451\u0442 \u0432 \u043D\u0430\u0448 \u043F\u043E\u0434\u0432\u0430\u043B.", s.furnitureSlots.innkeeper, { role: "innkeeper" });
    add("hall-table", "table", "hall", "\u041E\u0431\u0435\u0434\u0435\u043D\u043D\u044B\u0439 \u0441\u0442\u043E\u043B", "\u041D\u0430 \u0441\u0442\u043E\u043B\u0435 \u0445\u043B\u0435\u0431 \u0438 \u043A\u0440\u0443\u0436\u043A\u0438. \u041F\u0440\u043E\u0445\u043E\u0434 \u043A \u0441\u0442\u043E\u0439\u043A\u0435 \u0441\u0432\u043E\u0431\u043E\u0434\u0435\u043D.");
    add("hall-chair", "chair", "hall", "\u0421\u0442\u0443\u043B \u043F\u043E\u0441\u0435\u0442\u0438\u0442\u0435\u043B\u044F", "\u041F\u0440\u043E\u0441\u0442\u043E\u0439 \u0434\u0435\u0440\u0435\u0432\u044F\u043D\u043D\u044B\u0439 \u0441\u0442\u0443\u043B.");
    add("kitchen-table", "table", "kitchen", "\u041A\u0443\u0445\u043E\u043D\u043D\u044B\u0439 \u0441\u0442\u043E\u043B", "\u0414\u043E\u0441\u043A\u0430 \u0438 \u0437\u0430\u043F\u0430\u0441\u044B \u0434\u043B\u044F \u0432\u0435\u0447\u0435\u0440\u043D\u0435\u0439 \u043F\u043E\u0445\u043B\u0451\u0431\u043A\u0438.");
    add("kitchen-barrel", "barrel", "kitchen", "\u0411\u043E\u0447\u043A\u0430 \u043F\u0440\u0438\u043F\u0430\u0441\u043E\u0432", "\u041F\u0440\u043E\u0434\u0443\u043A\u0442\u044B \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438.");
  } else if (s.id === "proc-street") {
    add("street-guard", "npc", "street", "\u0420\u0430\u0434\u0430 \xB7 \u0441\u0442\u0440\u0430\u0436\u043D\u0438\u0446\u0430", "\u0412\u0445\u043E\u0434 \u0432 \u0442\u0430\u0432\u0435\u0440\u043D\u0443 \u0437\u0434\u0435\u0441\u044C, \u0443 \u0444\u0430\u0441\u0430\u0434\u0430. \u0423\u043B\u0438\u0446\u0430 \u043F\u043E\u043A\u0430 \u0437\u0430\u043A\u0430\u043D\u0447\u0438\u0432\u0430\u0435\u0442\u0441\u044F \u0443 \u043E\u0442\u043C\u0435\u0442\u043A\u0438 \u043D\u0430\u0447\u0430\u043B\u0430 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430.", null, { role: "guard" });
    add("street-barrel", "barrel", "street", "\u0411\u043E\u0447\u043A\u0430 \u0443 \u0442\u0430\u0432\u0435\u0440\u043D\u044B", "\u0414\u043E\u0436\u0434\u0435\u0432\u0430\u044F \u0431\u043E\u0447\u043A\u0430 \u0443 \u043A\u0440\u0430\u044F \u0443\u043B\u0438\u0446\u044B.");
    add("street-crate", "crate", "street", "\u042F\u0449\u0438\u043A \u043F\u043E\u0441\u0442\u0430\u0432\u0449\u0438\u043A\u0430", "\u041F\u0440\u0438\u043F\u0430\u0441\u044B \u0434\u043B\u044F \u043A\u0443\u0445\u043D\u0438.");
    const r = get("street");
    const l = add("street-lantern", "lantern", "street", "\u0423\u043B\u0438\u0447\u043D\u044B\u0439 \u0444\u043E\u043D\u0430\u0440\u044C", "\u041E\u0441\u0432\u0435\u0449\u0430\u0435\u0442 \u043F\u043E\u0434\u0445\u043E\u0434 \u043A \u0442\u0430\u0432\u0435\u0440\u043D\u0435.", rng.shuffle(cells(r).filter((p) => p.y === r.y)));
    s.lights.push({ id: l.id, kind: "fixture", x: l.x + 0.5, y: l.y + 0.5, height: 1.5, intensity: 12, distance: 8, brightRadius: 5, radius: 5, phase: 0, fixtureId: l.id });
    s.props.push(prop("street-start", "waymark", s.entryPoint.x, s.entryPoint.y, "\u041D\u0430\u0447\u0430\u043B\u043E \u0443\u043B\u0438\u0446\u044B", { solid: false, roomId: "street-entry", description: "\u0422\u043E\u0447\u043A\u0430 \u043F\u0440\u0438\u0431\u044B\u0442\u0438\u044F. \u0414\u0430\u043B\u044C\u0448\u0435 \u044D\u0442\u043E\u0439 \u0441\u0432\u044F\u0437\u043A\u0438 \u043B\u043E\u043A\u0430\u0446\u0438\u0439 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430 \u043F\u043E\u043A\u0430 \u043D\u0435\u0442." }));
  } else {
    add("cellar-chest", "chest", "cellar-store", "\u0421\u0443\u043D\u0434\u0443\u043A \u0432 \u043F\u043E\u0434\u0432\u0430\u043B\u0435", "\u0421\u0443\u043D\u0434\u0443\u043A \u0441 \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u0437\u0430\u0449\u0451\u043B\u043A\u043E\u0439.");
    add("cellar-crate", "crate", "cellar-store", "\u042F\u0449\u0438\u043A\u0438 \u0432 \u043A\u043B\u0430\u0434\u043E\u0432\u043E\u0439", "\u041F\u0440\u0438\u043F\u0430\u0441\u044B \u0432\u0434\u043E\u043B\u044C \u0441\u0442\u0435\u043D\u044B.");
    add("cellar-barrel", "barrel", "cellar-main", "\u0421\u0442\u0430\u0440\u0430\u044F \u0431\u043E\u0447\u043A\u0430", "\u041D\u0430 \u043E\u0431\u043E\u0434\u0435 \u043A\u043B\u0435\u0439\u043C\u043E \u0442\u0430\u0432\u0435\u0440\u043D\u044B.");
    if (rng.int(0, 1)) add("cellar-crate-extra", "crate", "cellar-main", "\u0417\u0430\u043F\u0430\u0441\u043D\u044B\u0435 \u044F\u0449\u0438\u043A\u0438", "\u0417\u0430\u043F\u0430\u0441 \u043F\u043E\u0441\u0443\u0434\u044B.");
  }
  if (!s.outdoor) for (const r of s.rooms) {
    const p = r.anchor, id = "lamp-" + r.id;
    s.props.push(prop(id, "chandelier", p.x, p.y, "\u0421\u0432\u0435\u0447\u043D\u0430\u044F \u043B\u044E\u0441\u0442\u0440\u0430", { kind: 38, solid: false, roomId: r.id }));
    s.lights.push({ id, kind: "chandelier", x: p.x + 0.5, y: p.y + 0.5, height: 1.9, intensity: 22, distance: 10, brightRadius: 5, phase: rng.int(0, 50) / 10, radius: 5, fixtureId: id });
  }
}
function mirror(s) {
  s.tiles.forEach((r) => r.reverse());
  const flip = (p) => {
    p.x = s.W - 1 - p.x;
  };
  for (const r of s.rooms) {
    r.x = s.W - r.x - r.w;
    flip(r.anchor);
  }
  for (const p of s.props) {
    flip(p);
    if (p.access) flip(p.access);
  }
  for (const a of [s.spawns, ...Object.values(s.arrivals)]) for (const p of a) p[0] = s.W - 1 - p[0];
  s.reserved = s.reserved.map((k) => {
    const [x, y] = k.split(",").map(Number);
    return `${s.W - 1 - x},${y}`;
  }).sort();
  s.routes.forEach((r) => r.cells.forEach(flip));
  s.lights.forEach((l) => l.x = s.W - l.x);
  Object.values(s.furnitureSlots || {}).forEach((ps) => ps.forEach(flip));
  if (s.entryPoint) flip(s.entryPoint);
}
export function buildCandidate(seed, attempt = 0) {
  const rng = random(`${GENERATOR_VERSION}:${seed}:${attempt}:layout`), plan = logicalPlan(), width = rng.int(7, 9), hallHeight = rng.int(5, 6), kitchenWidth = rng.int(4, 5), entryY = 5 + hallHeight;
  const tavern = location("proc-tavern", "\u0422\u0430\u0432\u0435\u0440\u043D\u0430 \xAB\u041C\u0435\u0434\u043D\u044B\u0439 \u0444\u043E\u043D\u0430\u0440\u044C\xBB", [room("bar", 1, 1, width, 3, { x: 2, y: 2 }), room("hall", 1, 4, width, hallHeight), room("entry", 2, entryY, width - 2, 3), room("kitchen", width + 2, 4, kitchenWidth, hallHeight)]);
  tavern.furnitureSlots = { counter: [{ x: width - 2, y: 3 }, { x: width - 1, y: 3 }], innkeeper: [{ x: width - 1, y: 2 }] };
  tavern.connections.push({ a: "hall", b: "bar", kind: "opening" });
  const frontX = rng.int(3, width - 2);
  connect(tavern, "entry", "hall", prop("hall-door", "door", frontX, entryY - 1, "\u0414\u0432\u0435\u0440\u044C \u0432 \u043E\u0431\u0449\u0438\u0439 \u0437\u0430\u043B", { axis: "vertical" }));
  connect(tavern, "hall", "kitchen", prop("kitchen-door", "door", width + 1, rng.int(5, 4 + hallHeight - 2), "\u0414\u0432\u0435\u0440\u044C \u0432 \u043A\u0443\u0445\u043D\u044E", { axis: "horizontal" }));
  tavern.props.push(prop("to-street", "portal", frontX, tavern.H - 1, "\u0412\u044B\u0439\u0442\u0438 \u043D\u0430 \u0443\u043B\u0438\u0446\u0443", { axis: "vertical", destination: "proc-street", destinationEntry: "to-tavern", linkId: "front-door", access: { x: frontX, y: tavern.H - 2 } }));
  const down = prop("to-cellar", "portal", width + kitchenWidth, 4, "\u041B\u044E\u043A: \u0441\u043F\u0443\u0441\u0442\u0438\u0442\u044C\u0441\u044F \u0432 \u043F\u043E\u0434\u0432\u0430\u043B", { portalKind: "stairs-down", roomId: "kitchen", destination: "proc-cellar", destinationEntry: "to-tavern", linkId: "cellar-stairs", access: { x: width + kitchenWidth - 1, y: 4 } });
  tavern.props.push(down);
  const streetHeight = rng.int(6, 8), street = location("proc-street", "\u0423\u043B\u0438\u0446\u0430 \u0443 \u0442\u0430\u0432\u0435\u0440\u043D\u044B", [room("street", 1, 2, tavern.W - 2, streetHeight - 2), room("street-entry", 1, streetHeight, tavern.W - 2, 2)], true);
  street.connections.push({ a: "street-entry", b: "street", kind: "opening" });
  street.entryPoint = { x: Math.floor(street.W / 2), y: street.H - 2 };
  street.props.push(prop("to-tavern", "portal", frontX, 1, "\u0412\u043E\u0439\u0442\u0438 \u0432 \u0442\u0430\u0432\u0435\u0440\u043D\u0443", { axis: "vertical", destination: "proc-tavern", destinationEntry: "to-street", linkId: "front-door", access: { x: frontX, y: 2 } }));
  const storageWidth = rng.int(4, width), cellarHeight = hallHeight, cellar = location("proc-cellar", "\u041F\u043E\u0434\u0432\u0430\u043B \u0442\u0430\u0432\u0435\u0440\u043D\u044B", [room("cellar-main", width + 2, 1, kitchenWidth, cellarHeight), room("cellar-store", width - storageWidth + 1, 1, storageWidth, cellarHeight)]);
  connect(cellar, "cellar-main", "cellar-store", prop("store-door", "door", width + 1, rng.int(2, cellarHeight - 1), "\u0414\u0432\u0435\u0440\u044C \u0432 \u043A\u043B\u0430\u0434\u043E\u0432\u0443\u044E", { axis: "horizontal" }));
  const up = prop("to-tavern", "portal", down.x, 1, "\u041B\u0435\u0441\u0442\u043D\u0438\u0446\u0430: \u043F\u043E\u0434\u043D\u044F\u0442\u044C\u0441\u044F \u0432 \u0442\u0430\u0432\u0435\u0440\u043D\u0443", { portalKind: "stairs-up", roomId: "cellar-main", destination: "proc-tavern", destinationEntry: "to-cellar", linkId: "cellar-stairs", access: { x: down.x - 1, y: 1 } });
  cellar.props.push(up);
  const locations = [street, tavern, cellar];
  for (const s of locations) {
    s.visualSeed = hash(seed + ":" + s.id) % 1e5;
    reserve(s);
    furnish(s, random(`${GENERATOR_VERSION}:${seed}:${attempt}:${s.id}:furniture`));
    finalizeArrivals(s);
  }
  const mirrored = !!rng.int(0, 1);
  if (mirrored) locations.forEach(mirror);
  cellar.origin = { x: down.x - up.x, y: down.y - up.y, level: -1 };
  street.origin = { x: 0, y: tavern.H - 2, level: 0 };
  return { version: GENERATOR_VERSION, seed, attempt, plan, mirrored, locations, start: { location: street.id, ...street.entryPoint } };
}
export function validateLocation(s) {
  const errors = [], fail = (code, detail) => errors.push({ location: s.id, code, detail });
  if (!Number.isInteger(s.W) || !Number.isInteger(s.H) || s.W < 3 || s.H < 3 || s.W > 40 || s.H > 40 || s.tiles.length !== s.H || s.tiles.some((r) => r.length !== s.W)) return { valid: false, errors: [{ code: "grid", location: s.id }] };
  const occupied = /* @__PURE__ */ new Map(), roomCells = /* @__PURE__ */ new Map(), ids = /* @__PURE__ */ new Set();
  for (const r of s.rooms) {
    if (![r.x, r.y, r.w, r.h].every(Number.isInteger) || r.w < 2 || r.h < 2) fail("room-bounds", r.id);
    for (const p of cells(r)) {
      if (roomCells.has(key(p))) fail("room-overlap", r.id);
      roomCells.set(key(p), r.id);
      if (tile(s, p) !== "floor") fail("room-floor", r.id);
    }
  }
  for (const p of s.props) {
    if (ids.has(p.id)) fail("duplicate-id", p.id);
    ids.add(p.id);
    if (!Number.isInteger(p.x) || !Number.isInteger(p.y) || p.x < 0 || p.x >= s.W || p.y < 0 || p.y >= s.H) fail("off-grid", p.id);
    if (p.type === "chandelier") continue;
    if (occupied.has(key(p))) fail("object-overlap", p.id);
    occupied.set(key(p), p);
    const boundary = p.type === "portal" && !p.portalKind;
    if (tile(s, p) !== (boundary ? "wall" : "floor")) fail("object-tile", p.id);
    if (p.roomId && !inside(s.rooms.find((r) => r.id === p.roomId), p)) fail("object-room", p.id);
    if (p.type === "door" || boundary) {
      const flanks = p.axis === "horizontal" ? [[0, -1], [0, 1]] : [[-1, 0], [1, 0]], cross = p.axis === "horizontal" ? [[1, 0], [-1, 0]] : [[0, 1], [0, -1]], sides = cross.map(([dx, dy]) => ({ x: p.x + dx, y: p.y + dy }));
      if (!flanks.every(([dx, dy]) => tile(s, { x: p.x + dx, y: p.y + dy }) === "wall")) fail("door-wall", p.id);
      if (p.type === "door" && (!sides.every((c) => tile(s, c) === "floor") || new Set(sides.map((c) => roomCells.get(key(c)))).size !== 2 || !s.connections.some((c) => c.doorId === p.id && sides.every((q) => [c.a, c.b].includes(roomCells.get(key(q))))))) fail("door-link", p.id);
      if (boundary && (!p.access || !sides.some((c) => key(c) === key(p.access) && tile(s, c) === "floor"))) fail("portal-access", p.id);
    }
    if (p.type === "portal" && (!p.access || distance(p, p.access) !== 1)) fail("portal-access", p.id);
  }
  const base = blockedCells(s), doors = s.props.filter((p) => p.type === "door"), closed = new Set(doors.map(key)), start = point(s.spawns[0] || [-1, -1]);
  let seen = /* @__PURE__ */ new Set(), changed = true;
  while (changed) {
    changed = false;
    seen = flood(s, start, /* @__PURE__ */ new Set([...base, ...closed])).seen;
    for (const p of doors) if (closed.has(key(p)) && near(p).some((c) => seen.has(key(c)))) {
      closed.delete(key(p));
      changed = true;
    }
  }
  if (closed.size) fail("unopenable-door", [...closed].join(";"));
  let floorCount = 0;
  for (let y = 0; y < s.H; y++) for (let x = 0; x < s.W; x++) if (tile(s, { x, y }) === "floor" && !base.has(`${x},${y}`)) {
    floorCount++;
    if (!seen.has(`${x},${y}`)) fail("unreachable-floor", `${x},${y}`);
  }
  for (const r of s.rooms) if (!seen.has(key(r.anchor))) fail("unreachable-room", r.id);
  for (const p of s.props.filter((p2) => !["chandelier", "waymark"].includes(p2.type))) if (!(p.access ? seen.has(key(p.access)) : near(p).some((c) => seen.has(key(c))))) fail("unreachable-object", p.id);
  for (const slots of [s.spawns, ...Object.values(s.arrivals)]) {
    if (slots.length !== 3 || new Set(slots.map((c) => c.join(","))).size !== 3) fail("spawn-count", "Three distinct cells");
    if (slots.length === 3 && !accessibleWithParty(s, point(slots[0]), slots.slice(1).map(point))) fail("party-blocks-route", "Companions block access");
    for (const c of slots) if (!c.every(Number.isInteger) || !seen.has(c.join(",")) || occupied.has(c.join(",")) && occupied.get(c.join(",")).solid !== false) fail("spawn-blocked", c.join(","));
  }
  for (const p of s.props.filter((p2) => p2.type === "portal")) if (!s.arrivals[p.id] || distance(point(s.arrivals[p.id][0]), p) !== 1) fail("arrival-link", p.id);
  for (const k of s.reserved) if (base.has(k)) fail("critical-path-blocked", k);
  for (const c of s.connections) {
    const a = s.rooms.find((r) => r.id === c.a), b = s.rooms.find((r) => r.id === c.b);
    if (!a || !b) fail("unknown-room-link", c.a);
    else if (c.kind === "opening" && !cells(a).some((p) => near(p).some((q) => inside(b, q)))) fail("missing-opening", c.a);
  }
  return { valid: !errors.length, errors, walkableCells: floorCount, reachableCells: seen.size, openedDoors: doors.length - closed.size };
}
export function validateWorld(world) {
  const errors = [], reports = [], byId = new Map(world.locations.map((s) => [s.id, s])), fail = (code, detail) => errors.push({ code, detail });
  if (world.locations.length !== 3 || byId.size !== 3 || LOCATION_IDS.some((id) => !byId.has(id))) fail("location-set", "Exactly three locations");
  for (const s of world.locations) {
    const r = validateLocation(s);
    reports.push({ id: s.id, ...r });
    errors.push(...r.errors);
  }
  for (const e of logicalPlan().locations) {
    const s = byId.get(e.id);
    if (!s) continue;
    for (const id of e.rooms) if (!s.rooms.some((r) => r.id === id && r.role === id)) fail("required-room", id);
    for (const [a, b, kind] of e.links) if (!s.connections.some((c) => c.a === a && c.b === b && c.kind === kind)) fail("required-link", a + "/" + b);
  }
  const portals = world.locations.flatMap((s) => s.props.filter((p) => p.type === "portal").map((p) => ({ s, p })));
  if (portals.length !== 4) fail("transition-count", "Two reciprocal pairs");
  for (const l of logicalPlan().transitions) {
    const ends = portals.filter(({ p }) => p.linkId === l.id);
    if (ends.length !== 2 || !ends.some(({ s, p }) => s.id === l.a && p.destination === l.b) || !ends.some(({ s, p }) => s.id === l.b && p.destination === l.a) || ends.some(({ p }) => l.kind === "stairs" ? !p.portalKind : !!p.portalKind)) fail("required-transition", l.id);
  }
  for (const { s, p } of portals) {
    const other = byId.get(p.destination), back = other?.props.find((q) => q.id === p.destinationEntry && q.type === "portal");
    if (!back || back.destination !== s.id || back.destinationEntry !== p.id || back.linkId !== p.linkId) fail("transition-pair", s.id + "/" + p.id);
    if (back && p.portalKind && (s.origin.x + p.x !== other.origin.x + back.x || s.origin.y + p.y !== other.origin.y + back.y || Math.abs(s.origin.level - other.origin.level) !== 1 || p.portalKind === back.portalKind)) fail("stairs-shaft", p.id);
  }
  for (const [id, role, roomId] of [["proc-tavern", "innkeeper", "bar"], ["proc-street", "guard", "street"]]) {
    const s = byId.get(id), npc = s?.props.find((p) => p.type === "npc" && p.role === role && p.roomId === roomId);
    if (!npc) fail("required-npc", role);
    if (npc && role === "innkeeper" && !s.props.some((p) => p.type === "counter" && distance(p, npc) === 1)) fail("innkeeper-counter", npc.id);
  }
  const basement = byId.get("proc-cellar"), tavern = byId.get("proc-tavern");
  if (basement && tavern) {
    for (const r of basement.rooms) for (const p of cells(r)) if (tile(tavern, { x: p.x + basement.origin.x - tavern.origin.x, y: p.y + basement.origin.y - tavern.origin.y }) === "void") fail("basement-footprint", key(p));
  }
  if (!basement?.props.some((p) => p.type === "chest" && p.roomId === "cellar-store")) fail("cellar-interest", "Missing chest");
  if ((byId.get("proc-street")?.props.filter((p) => ["barrel", "crate", "lantern"].includes(p.type)).length || 0) < 2) fail("street-props", "Two objects required");
  if (world.start?.location !== "proc-street" || !byId.get("proc-street")?.spawns.some((p) => p[0] === world.start.x && p[1] === world.start.y)) fail("world-entry", "Invalid entry");
  return { valid: !errors.length, errors, locations: reports };
}
export function generateWithRetries(seed, candidateFactory = buildCandidate, maxAttempts = 8) {
  seed = normalizeSeed(seed);
  if (!Number.isInteger(maxAttempts) || maxAttempts < 1 || maxAttempts > 32) throw Error("\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E \u043F\u043E\u043F\u044B\u0442\u043E\u043A");
  const rejected = [];
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    try {
      const world = candidateFactory(seed, attempt), validation = validateWorld(world);
      if (validation.valid) return { ...world, validation, rejected };
      rejected.push({ attempt, errors: validation.errors });
    } catch (error2) {
      rejected.push({ attempt, errors: [{ code: "generation", detail: error2.message }] });
    }
  }
  const error = Error("\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0440\u043E\u0445\u043E\u0434\u0438\u043C\u0443\u044E \u043B\u043E\u043A\u0430\u0446\u0438\u044E. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 seed.");
  error.rejected = rejected;
  throw error;
}
export function generate(seed, options = {}) {
  return generateWithRetries(seed, buildCandidate, options.maxAttempts ?? 8);
}
