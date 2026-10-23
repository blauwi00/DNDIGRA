// Pixel health bar: a stone slab drawn at 72x14 real pixels and scaled up
// without smoothing. As health drops the slab crumbles from the right, goes
// dark and grows moss, and the heart cracks (idea from the owner's reference,
// drawn from scratch). Deterministic per pixel, so it never flickers.
(() => {
  const W = 72, H = 14, HEART = 12;
  const hash = (x, y) => { let h = (x * 374761393 + y * 668265263) >>> 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
  const C = { ink: '#14100e', stone: '#7d8794', stoneHi: '#a9b3bf', stoneLo: '#545c68', void: '#0b0a0a', red: '#d23a30', redHi: '#f06a52', redLo: '#8e1f1a', moss: '#4f7a3a', mossHi: '#78a552', heart: '#e0453b', heartHi: '#ff8a72', crack: '#2a0d0b' };

  function heart(ctx, k) {
    // 9x8 heart at (2,3); cracks grow as k (health fraction) falls.
    const rows = ['.##...##.', '####.####', '#########', '#########', '.#######.', '..#####..', '...###...', '....#....'];
    rows.forEach((r, y) => [...r].forEach((c, x) => { if (c === '#') { ctx.fillStyle = y < 2 && x > 0 && x < 3 ? C.heartHi : C.heart; ctx.fillRect(2 + x, 3 + y, 1, 1); } }));
    ctx.fillStyle = C.ink; for (const [x, y] of [[1, 3], [1, 4], [1, 5], [10, 3], [10, 4], [10, 5], [5, 3], [2, 2], [3, 2], [7, 2], [8, 2], [2, 7], [9, 7], [3, 8], [8, 8], [4, 9], [7, 9], [5, 10], [6, 10]]) ctx.fillRect(x, y, 1, 1);
    ctx.fillStyle = C.crack;
    if (k < .66) for (const [x, y] of [[6, 4], [5, 5], [6, 6]]) ctx.fillRect(x, y, 1, 1);
    if (k < .4) for (const [x, y] of [[4, 6], [7, 5], [5, 7], [6, 8]]) ctx.fillRect(x, y, 1, 1);
    if (k < .15) { ctx.fillStyle = C.void; for (const [x, y] of [[3, 4], [4, 5], [7, 6], [8, 4], [6, 9]]) ctx.fillRect(x, y, 1, 1); }
  }

  function draw(canvas, hp, max) {
    const k = Math.max(0, Math.min(1, max ? hp / max : 0)), ctx = canvas.getContext('2d');
    canvas.width = W; canvas.height = H; ctx.clearRect(0, 0, W, H);
    const x0 = HEART, x1 = W - 1, fillTo = x0 + 1 + Math.round((x1 - x0 - 1) * k);
    // Damage front: the slab past the health level crumbles, more so when low.
    const ruin = x => x > fillTo ? Math.min(1, (x - fillTo) / 18 + (1 - k) * .5) : 0;
    for (let x = x0; x <= x1; x++) for (let y = 0; y < H; y++) {
      const r = ruin(x), n = hash(x, y), edge = y === 0 || y === H - 1 || x === x0 || x === x1;
      const notch = (y <= 1 || y >= H - 2) && n < .18 + r * .5; // jagged rim
      if (notch) continue;
      if (r > 0 && hash(x >> 1, y >> 1) < r * .5 && (y <= 2 || y >= H - 3)) continue; // chunks fall out in 2px bits // chunks fall out
      let c = edge ? C.ink : y <= 2 ? C.stoneHi : y >= H - 3 ? C.stoneLo : C.stone;
      if (!edge && y > 2 && y < H - 3) c = x < fillTo ? (y === 3 ? C.redHi : y === H - 4 ? C.redLo : C.red) : C.void;
      if (r > 0 && !edge && (y <= 2 || y >= H - 3)) c = hash(x >> 1, (y >> 1) + 3) < r * .6 ? C.void : C.stoneLo;
      // moss: chunky 2x2 clumps clinging to the broken rim, never inside the bar
      if (r > .25 && (y <= 3 || y >= H - 4) && hash((x >> 1) + 99, (y >> 1)) < r * .35) c = ((x + y) & 1) ? C.moss : C.mossHi;
      ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1);
    }
    // round heart socket that the bar grows out of
    for (let y = 1; y < H - 1; y++) for (let x = 0; x < HEART + 1; x++) {
      const d = Math.hypot(x - 6, y - 6.5); if (d > 6.6) continue;
      ctx.fillStyle = d > 5.8 ? C.ink : d > 4.8 ? (y < 6 ? C.stoneHi : C.stoneLo) : C.void; ctx.fillRect(x, y, 1, 1);
    }
    heart(ctx, k);
  }
  window.PixelHP = { draw, W, H };
})();
