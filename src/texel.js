// Правило «тексели» (как скин в Майнкрафте): поверх крупных боксов добавляются пиксели чуть другого оттенка —
// светлая кромка сверху и слева, тёмная снизу и справа, шум, пряди волос, складки ткани, блики металла.
// Чистая функция: список боксов [x,y,z,w,h,d,цвет,светится] → список «наклеек» (decals).
// Наклейка: [x,y,z,w,h,d,цвет,false,грань,ключ]. грань 'f' — на передней стороне (есть в 2D и 3D), 't' — на верхней (только 3D).
// ключ — порядок рисования в 2D-портрете (как у родительского бокса). Документ: CHARACTER_STYLE.md, раздел «Тексели».

export const TEXEL = {
  size: .058,        // размер текселя ≈ 1/8 головы (как 8×8 пикселей головы скина)
  decalDepth: .008,  // насколько наклейка выступает над гранью
  minW: .09, minH: .09, minD: .05, // меньшие боксы (глаза, брови, тонкие детали) не трогаем
};

export function shade(c, k) {
  const r = Math.min(255, Math.round((c >> 16 & 255) * k)), g = Math.min(255, Math.round((c >> 8 & 255) * k)), b = Math.min(255, Math.round((c & 255) * k));
  return r << 16 | g << 8 | b;
}

// Оттенок для текселя: k>1 — подмешивает белый (светлые цвета не «выгорают» в плоские белые пятна), k<1 — затемняет.
export function tone(c, k) {
  if (k <= 1) return shade(c, k);
  const t = Math.min(1, (k - 1) * .9), r = c >> 16 & 255, g = c >> 8 & 255, b = c & 255;
  return Math.round(r + (255 - r) * t) << 16 | Math.round(g + (255 - g) * t) << 8 | Math.round(b + (255 - b) * t);
}

// Детерминированный генератор: один и тот же бокс всегда даёт один и тот же узор (модель не «мерцает» между перерисовками).
function rng(seed) {
  let a = seed | 0;
  return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
}

// Сила эффекта по роли материала. hi/lo — множители яркости кромок, amp — размах шума.
const ROLES = {
  skin: { hi: 1.06, lo: .9, amp: .045, noise: 2 },
  hair: { hi: 1.18, lo: .8, amp: .11, strands: true },
  metal: { hi: 1.22, lo: .76, amp: .1, glint: true },
  cloth: { hi: 1.12, lo: .82, amp: .08, pleats: true },
  other: { hi: 1.1, lo: .84, amp: .07 },
};

// role: цвет → 'skin' | 'hair' | 'metal' | 'cloth' | 'other'. size: размер текселя.
export function texelPass(boxes, role = () => 'other', size = TEXEL.size, { minDepth = TEXEL.minD } = {}) {
  const out = [], D = TEXEL.decalDepth;
  // Clip raised texels against intersecting model details, including tiny eyes,
  // embroidery and trim which do not receive texels themselves.
  function emit(decal, parent) {
    const axis = decal[8] === 'f' ? 2 : 1, axes = axis === 2 ? [0, 1] : [0, 2];
    const surface = decal[axis] - decal[axis + 3] / 2;
    let pieces = [decal];
    boxes.forEach((b, j) => {
      if (j === parent || b.length > 8) return;
      const near = b[axis] - b[axis + 3] / 2, far = b[axis] + b[axis + 3] / 2;
      if (near >= surface + D - 1e-8 || far < surface - 1e-8 || Math.abs(far - surface) < 1e-8 && j < parent) return;
      const [u, v] = axes, l = b[u] - b[u + 3] / 2, r = b[u] + b[u + 3] / 2, t = b[v] - b[v + 3] / 2, bt = b[v] + b[v + 3] / 2;
      pieces = pieces.flatMap(d => {
        const dl = d[u] - d[u + 3] / 2, dr = d[u] + d[u + 3] / 2, dt = d[v] - d[v + 3] / 2, db = d[v] + d[v + 3] / 2;
        const il = Math.max(dl, l), ir = Math.min(dr, r), it = Math.max(dt, t), ib = Math.min(db, bt);
        if (ir - il < 1e-8 || ib - it < 1e-8) return [d];
        return [[dl, il, dt, db], [ir, dr, dt, db], [il, ir, dt, it], [il, ir, ib, db]].filter(([l,r,t,b]) => r-l > 1e-8 && b-t > 1e-8).map(([l,r,t,b]) => {
          const next = [...d]; next[u] = (l+r)/2; next[u+3] = r-l; next[v] = (t+b)/2; next[v+3] = b-t; return next;
        });
      });
    });
    out.push(...pieces);
  }
  boxes.forEach((b, i) => {
    if (b.length > 8 || b[7]) return; // наклейки и светящиеся боксы не затеняем
    const [x, y, z, w, h, d, c] = b;
    if (w < TEXEL.minW || h < TEXEL.minH || d < minDepth) return;
    const cfg = ROLES[role(c)] || ROLES.other;
    const n = Math.max(1, Math.round(w / size)), m = Math.max(1, Math.round(h / size)), cw = w / n, ch = h / m;
    const zf = z + d / 2 + D / 2, key = z + d / 2 + 1e-4;
    const R = rng(Math.round(x * 997) * 31 + Math.round(y * 991) * 17 + Math.round(z * 983) * 13 + (c & 0xffff) + i * 7);
    // col,row — клетка сверху слева; cs,rs — сколько клеток занимает наклейка
    const cells = Array.from({ length: m }, () => Array(n).fill(null));
    const px = (col, row, color, cs = 1, rs = 1) => {
      if (color === c) return;
      for (let r = row; r < Math.min(m, row + rs); r++)
        for (let q = col; q < Math.min(n, col + cs); q++) cells[r][q] = color;
    };
    // Свет сверху слева: светлая верхняя кромка, тёмная нижняя, у широких боксов — боковые.
    if (m >= 3) { px(0, 0, tone(c, cfg.hi), n); px(0, m - 1, tone(c, cfg.lo), n); }
    if (n >= 4 && m >= 4 && w >= .2) { px(0, 1, tone(c, 1 + (cfg.hi - 1) * .5), 1, m - 2); px(n - 1, 1, tone(c, 1 - (1 - cfg.lo) * .6), 1, m - 2); }
    // Шум: до трёх пикселей чуть другого оттенка, по одному на клетку.
    const cnt = Math.min(cfg.noise ?? 3, Math.floor(n * m / 8)), used = new Set();
    for (let k = 0; k < cnt; k++) {
      const col = n > 2 ? 1 + Math.floor(R() * (n - 2)) : Math.floor(R() * n), row = m > 2 ? 1 + Math.floor(R() * (m - 2)) : Math.floor(R() * m), id = col * 64 + row;
      let f = (R() < .5 ? -1 : 1) * cfg.amp * (.55 + R() * .6); if (Math.abs(f) < .04) f = f < 0 ? -.04 : .04;
      if (!used.has(id)) { used.add(id); px(col, row, tone(c, 1 + f)); }
    }
    if (cfg.strands && n >= 3 && m >= 3) { // пряди: тёмные полоски вдоль волос и светлый блик
      for (let k = 0; k < 2; k++) px(1 + Math.floor(R() * (n - 2 || 1)), 1, tone(c, .86), 1, Math.max(1, Math.min(m - 2, 2 + Math.floor(R() * (m - 2)))));
      px(Math.floor(R() * n), 1, tone(c, cfg.hi));
    }
    if (cfg.pleats && h >= .2 && w >= .2 && m >= 4) for (const col of [Math.round(n / 3), Math.round(n * 2 / 3)]) if (col > 0 && col < n) px(col, 1, tone(c, .9), 1, m - 2); // складки
    if (cfg.glint && n >= 2 && m >= 2) px(Math.min(1, n - 1), Math.min(1, m - 1), tone(c, 1.36)); // блик металла
    // Resolve layers before emitting geometry: each cell has exactly one color.
    // Merge equal rectangles so folds/noise never share a coplanar surface.
    for (let row = 0; row < m; row++) for (let col = 0; col < n; col++) {
      const color = cells[row][col];
      if (color === null) continue;
      let cs = 1, rs = 1;
      while (col + cs < n && cells[row][col + cs] === color) cs++;
      while (row + rs < m && cells[row + rs].slice(col, col + cs).every(v => v === color)) rs++;
      for (let r = row; r < row + rs; r++) cells[r].fill(null, col, col + cs);
      emit([x - w / 2 + (col + cs / 2) * cw, y + h / 2 - (row + rs / 2) * ch, zf, cs * cw, rs * ch, D, color, false, 'f', key], i);
    }
    // Верхняя грань (видна в 3D с камеры сверху): пара пикселей.
    if (w >= .18 && d >= .15) {
      const nd = Math.max(1, Math.round(d / size)), cd = d / nd, top = new Map();
      for (let k = 0; k < 2; k++) {
        let f = (R() < .5 ? -1 : 1) * cfg.amp * (.6 + R() * .5); if (Math.abs(f) < .04) f = f < 0 ? -.04 : .04;
        const col = Math.floor(R() * n), r = Math.floor(R() * nd);
        top.set(r * n + col, [x - w / 2 + (col + .5) * cw, y + h / 2 + D / 2, z - d / 2 + (r + .5) * cd, cw, D, cd, tone(c, 1 + f), false, 't', key]);
      }
      for (const decal of top.values()) emit(decal, i);
    }
  });
  return out;
}
