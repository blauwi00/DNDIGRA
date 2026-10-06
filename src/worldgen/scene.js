// Сборщик сцены в формате игры (dist/world.js): плитки void/floor/wall, props, decor, lights, spawns.
// Стены строятся как в игре: пустая клетка рядом (по 8 направлениям) с полом становится стеной.
// Все предметы ставятся с проверкой: проходы не перекрываются, у каждого предмета есть свободная соседняя клетка.
export const DIRS = [[0, -1], [1, 0], [0, 1], [-1, 0]];
const NON_BLOCKING = new Set(['door', 'portal', 'torch', 'chandelier', 'clue', 'trap']);
export const MAX_LIGHTS = 12;
const key = (x, y) => x + ',' + y;

export class SceneBuilder {
  constructor(id, name, W, H, rng, meta = {}) {
    Object.assign(this, { id, name, W, H, rng, meta });
    this.floor = new Uint8Array(W * H); this.props = []; this.decor = []; this.lights = []; this.encounters = [];
    this.occ = new Map(); this.reserved = new Set(); this.counter = 0; this.anchor = null; this._reach = null;
  }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.W && y < this.H; }
  isFloor(x, y) { return this.inb(x, y) && this.floor[y * this.W + x] === 1; }
  setFloor(x, y, v = 1) { if (this.inb(x, y)) this.floor[y * this.W + x] = v; this._reach = null; }
  rect(x, y, w, h, v = 1) { for (let j = y; j < y + h; j++) for (let i = x; i < x + w; i++) this.setFloor(i, j, v); }
  // стена — пустая клетка, соседняя с полом (в том числе по диагонали)
  isWall(x, y) { if (!this.inb(x, y) || this.isFloor(x, y)) return false; for (let j = -1; j <= 1; j++) for (let i = -1; i <= 1; i++) if (this.isFloor(x + i, y + j)) return true; return false; }
  nid(prefix) { return prefix + (++this.counter); }
  free(x, y) { return this.isFloor(x, y) && !this.occ.has(key(x, y)); }
  reserve(x, y) { this.reserved.add(key(x, y)); }
  floorCells() { const out = []; for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) if (this.floor[y * this.W + x]) out.push([x, y]); return out; }
  // Достижимые свободные клетки от якоря (4 направления, как ходят фигуры).
  reachable(skip) {
    const start = this.anchor; if (!start) return null;
    const seen = new Set(), stack = [start]; const sk = skip ? key(skip[0], skip[1]) : null;
    while (stack.length) {
      const [x, y] = stack.pop(), k = key(x, y);
      if (seen.has(k) || k === sk || !this.free(x, y)) continue; seen.add(k);
      for (const [dx, dy] of DIRS) stack.push([x + dx, y + dy]);
    }
    return seen;
  }
  freeNeighbors(x, y, skip) { let n = 0; for (const [dx, dy] of DIRS) { const a = x + dx, b = y + dy; if (this.free(a, b) && !(skip && skip[0] === a && skip[1] === b)) n++; } return n; }
  // Можно ли поставить сплошной предмет в клетку: клетка свободна, не зарезервирована, проходы целы, у соседей остаётся доступ.
  canBlock(x, y) {
    if (!this.free(x, y) || this.reserved.has(key(x, y))) return false;
    if (this.freeNeighbors(x, y, [x, y]) < 1) return false;
    if (!this.anchor) return true;
    if (!this._reach) this._reach = this.reachable();
    if (!this._reach.has(key(x, y))) return false;
    for (const [dx, dy] of DIRS) { const a = x + dx, b = y + dy; if (this.occ.has(key(a, b)) && this.occ.get(key(a, b)).interactive !== false && this.freeNeighbors(a, b, [x, y]) < 1) return false; }
    const after = this.reachable([x, y]);
    return after.size === this._reach.size - 1;
  }
  // Добавляет предмет. Возвращает prop или null, если поставить нельзя.
  put(prop, x = prop.x, y = prop.y) {
    prop.x = x; prop.y = y; if (!prop.id) prop.id = this.nid(prop.type || 'p');
    const solid = prop.solid !== false && !NON_BLOCKING.has(prop.type);
    if (!solid && !NON_BLOCKING.has(prop.type) && this.props.some(q => q.x === x && q.y === y)) return null; // не ставим один неблокирующий предмет на другой
    if (solid) { if (!this.canBlock(x, y)) return null; this.occ.set(key(x, y), prop); this._reach = null; }
    this.props.push(prop); return prop;
  }
  // Дверь/портал в стене: пол с обеих сторон вдоль оси должен быть стеной, а с одной стороны — пол.
  doorSpot(x, y) {
    if (this.isFloor(x, y)) return null;
    const up = this.isFloor(x, y - 1), dn = this.isFloor(x, y + 1), lf = this.isFloor(x - 1, y), rt = this.isFloor(x + 1, y);
    if ((up || dn) && !lf && !rt && this.isWall(x - 1, y) && this.isWall(x + 1, y)) return { axis: undefined, front: dn ? [x, y + 1] : [x, y - 1] }; // в горизонтальной стене
    if ((lf || rt) && !up && !dn && this.isWall(x, y - 1) && this.isWall(x, y + 1)) return { axis: 'horizontal', front: rt ? [x + 1, y] : [x - 1, y] }; // в вертикальной стене
    return null;
  }
  // Ищет место для портала в стене ближе к (nx,ny).
  findPortalSpot(nx, ny, predicate = () => true) {
    let best = null;
    for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) {
      if (this.props.some(p => p.x === x && p.y === y)) continue;
      const s = this.doorSpot(x, y); if (!s || !predicate(x, y, s)) continue;
      const [fx, fy] = s.front; if (!this.free(fx, fy) || this.reserved.has(key(fx, fy))) continue;
      const d = Math.hypot(x - nx, y - ny); if (!best || d < best.d) best = { x, y, axis: s.axis, front: s.front, d };
    }
    return best;
  }
  addPortal(spot, destination, name, extra = {}) {
    const p = { id: extra.id || this.nid('portal'), x: spot.x, y: spot.y, kind: 26, name, type: 'portal', destination, ...extra };
    if (spot.axis) p.axis = spot.axis; this.props.push(p); this.reserve(spot.front[0], spot.front[1]); return p;
  }
  addDoor(x, y, axis, name = 'Дверь', extra = {}) {
    const p = { id: this.nid('door'), x, y, kind: 26, name, type: 'door', ...extra }; if (axis) p.axis = axis;
    this.props.push(p); for (const [dx, dy] of DIRS) { if (this.isFloor(x + dx, y + dy)) this.reserve(x + dx, y + dy); } this.reserve(x, y); return p;
  }
  light(x, y, extra = {}) { this.lights.push({ id: this.nid('lamp'), x, y, radius: 3, power: .6, phase: this.rng.next() * 6, intensity: 9, distance: 8, brightRadius: 4, ...extra }); }
  chandelier(x, y) {
    if (!this.free(x, y)) return;
    const id = this.nid('chandelier');
    this.lights.push({ id, kind: 'chandelier', x: x + .5, y: y + .5, height: 1.9, intensity: 26, distance: 10, brightRadius: 4, phase: this.rng.next() * 6, radius: 4 });
    this.props.push({ id, x, y, type: 'chandelier', kind: 38, solid: false, name: 'Свечная люстра' });
  }
  // Настенные факелы: каждый свет крепится к ближайшей свободной стене (как mountLights в игре).
  // Игра создаёт PointLight на каждый свет, поэтому в сцене их не больше MAX_LIGHTS. Выбираем равномерно: сначала люстры и алтари, потом самые далёкие друг от друга.
  capLights(max = MAX_LIGHTS) {
    if (this.lights.length <= max) return;
    const keep = this.lights.filter(l => l.kind === 'chandelier' || l.id === 'altar'), rest = this.lights.filter(l => !keep.includes(l));
    const near = (l, set) => set.length ? Math.min(...set.map(o => Math.hypot(o.x - l.x, o.y - l.y))) : 99;
    const a = this.anchor || [0, 0]; if (!keep.length && rest.length) { rest.sort((p, q) => Math.hypot(p.x - a[0], p.y - a[1]) - Math.hypot(q.x - a[0], q.y - a[1])); keep.push(rest.shift()); }
    while (keep.length < max && rest.length) { let bi = 0, bd = -1; rest.forEach((l, i) => { const d = near(l, keep); if (d > bd) { bd = d; bi = i; } }); keep.push(rest.splice(bi, 1)[0]); }
    this.lights = keep;
  }
  mountLights() {
    this.capLights();
    const used = new Set(this.props.map(p => key(p.x, p.y)));
    const mounted = [];
    for (const l of this.lights) {
      if (l.id === 'altar' || l.kind === 'chandelier') { mounted.push(l); continue; }
      const cand = [];
      for (let y = 0; y < this.H; y++) for (let x = 0; x < this.W; x++) {
        if (!this.isWall(x, y) || used.has(key(x, y))) continue;
        for (const [dx, dy] of DIRS) {
          const ax = x + dx, ay = y + dy; if (!this.isFloor(ax, ay) || this.occ.has(key(ax, ay))) continue;
          cand.push({ x, y, dx, dy, ax, ay, d: Math.hypot(x + .5 + dx * .58 - l.x, y + .5 + dy * .58 - l.y) });
        }
      }
      cand.sort((a, b) => a.d - b.d || a.y - b.y || a.x - b.x);
      const q = cand[0]; if (!q) continue;
      used.add(key(q.x, q.y));
      Object.assign(l, { kind: 'wall', wallX: q.x, wallY: q.y, dx: q.dx, dy: q.dy, x: q.x + .5 + q.dx * .58, y: q.y + .5 + q.dy * .58, height: 1.22 });
      const p = { id: 'sconce-' + l.id, x: q.x, y: q.y, kind: 37, type: 'torch', solid: false, name: 'Настенный факел', lightId: l.id, access: { x: q.ax, y: q.ay } };
      l.fixtureId = p.id; this.props.push(p); mounted.push(l);
    }
    this.lights = mounted;
  }
  nearestFree(x, y, count, avoid = new Set()) {
    const out = [], seen = new Set([key(x, y)]), q = [[x, y]];
    while (q.length && out.length < count) {
      const [cx, cy] = q.shift();
      if (this.free(cx, cy) && !avoid.has(key(cx, cy))) out.push([cx, cy]);
      for (const [dx, dy] of DIRS) { const a = cx + dx, b = cy + dy, k = key(a, b); if (!seen.has(k) && this.isFloor(a, b)) { seen.add(k); q.push([a, b]); } }
    }
    return out;
  }
  finish(entry) {
    this.mountLights();
    const tiles = Array.from({ length: this.H }, (_, y) => Array.from({ length: this.W }, (_, x) => this.isFloor(x, y) ? 'floor' : this.isWall(x, y) ? 'wall' : 'void'));
    const start = entry || this.anchor || this.floorCells()[0];
    const taken = new Set(), spawns = this.nearestFree(start[0], start[1], 3); spawns.forEach(c => taken.add(key(c[0], c[1])));
    const training = this.nearestFree(start[0], start[1], 6, taken).slice(3, 6), farFirst = this.floorCells().filter(([x, y]) => this.free(x, y) && !taken.has(key(x, y))).sort((a, b) => Math.hypot(b[0] - start[0], b[1] - start[1]) - Math.hypot(a[0] - start[0], a[1] - start[1]));
    const enemySpawn = farFirst.slice(0, 3);
    return {
      id: this.id, name: this.name, W: this.W, H: this.H, tiles, props: this.props, decor: this.decor, dummies: [], lights: this.lights,
      spawns, trainingSpawn: training.length === 3 ? training : spawns.slice(), enemySpawn, encounters: this.encounters, gen: this.meta,
    };
  }
}

// Проверка сцены теми же правилами, что и в dist/world.js (двери, наложения, спавн), плюс связность.
export function validateScene(scene) {
  const tile = (x, y) => scene.tiles[y]?.[x] || 'void', errs = [], occupied = new Map(), walls = new Map();
  for (const p of scene.props) {
    const layer = ['door', 'portal'].includes(p.type) ? 'doorway' : p.type === 'clue' ? 'surface' : p.type === 'chandelier' ? 'ceiling' : p.solid === false ? 'wall' : 'floor', k = key(p.x, p.y);
    if (layer === 'floor') { if (occupied.has(k)) errs.push('Наложение: ' + occupied.get(k).id + ' / ' + p.id); if (tile(p.x, p.y) !== 'floor') errs.push('Предмет вне пола: ' + p.id); occupied.set(k, p); }
    if (layer === 'wall') { if (walls.has(k)) errs.push('Наложение на стене: ' + p.id); walls.set(k, p); }
  }
  for (const d of scene.decor) if (d.kind !== 'rug') { const k = key(d.x, d.y); if (occupied.has(k)) errs.push('Наложение декора: ' + d.kind); occupied.set(k, d); }
  for (const l of scene.lights) if (!(l.id === 'altar' || l.kind === 'wall' || l.kind === 'chandelier')) errs.push('Свет без крепления: ' + l.id);
  for (const a of [...scene.spawns, ...scene.trainingSpawn, ...scene.enemySpawn]) if (occupied.has(a.join(','))) errs.push('Спавн в предмете: ' + occupied.get(a.join(',')).id);
  if (scene.spawns.length < 3) errs.push('Мало точек появления');
  for (const p of scene.props.filter(p => ['door', 'portal'].includes(p.type))) {
    const flanks = p.axis === 'horizontal' ? [[0, -1], [0, 1]] : [[-1, 0], [1, 0]];
    if (!flanks.every(([dx, dy]) => tile(p.x + dx, p.y + dy) === 'wall')) errs.push('Дверь без стен по бокам: ' + p.id);
    if (!DIRS.some(([dx, dy]) => tile(p.x + dx, p.y + dy) === 'floor')) errs.push('Недоступная дверь: ' + p.id);
  }
  // связность свободного пола и доступ к каждому предмету
  const freeCells = []; for (let y = 0; y < scene.H; y++) for (let x = 0; x < scene.W; x++) if (tile(x, y) === 'floor' && !occupied.has(key(x, y))) freeCells.push([x, y]);
  if (!freeCells.length) errs.push('Нет свободного пола');
  else {
    const seen = new Set([key(...scene.spawns[0])]), stack = [scene.spawns[0]];
    while (stack.length) { const [x, y] = stack.pop(); for (const [dx, dy] of DIRS) { const a = x + dx, b = y + dy, k = key(a, b); if (!seen.has(k) && tile(a, b) === 'floor' && !occupied.has(k)) { seen.add(k); stack.push([a, b]); } } }
    if (seen.size !== freeCells.length) errs.push('Пол разорван: достижимо ' + seen.size + ' из ' + freeCells.length);
    for (const p of scene.props) { if (['torch', 'chandelier'].includes(p.type) || (p.solid === false && !['door', 'portal'].includes(p.type))) continue; if (!DIRS.some(([dx, dy]) => seen.has(key(p.x + dx, p.y + dy)))) errs.push('Нет подхода к: ' + p.id + ' (' + (p.model || p.type) + ')'); }
  }
  const ids = new Set(); for (const p of scene.props) { if (ids.has(p.id)) errs.push('Повтор id: ' + p.id); ids.add(p.id); }
  return errs;
}
