// Боевые эффекты DNDIGRA. Подключается ПОСЛЕ effects.js и расширяет window.fx, не заменяя файл:
//   strike(a, b, animate)            — замах, рывок, дуга клинка или полёт стрелы со шлейфом
//   impact(p, amount, crit, animate, type) — отброс, вспышка, искры, число урона, «КРИТ!», тряска, падение при гибели
//   cast(a, b, spell, animate)       — заклинания: bolt | fireball | missile | holy | bless | cone | heal
//   banner(text, kind)               — крупные надписи: РАУНД, ХОД, КРИТ, ПОБЕДА
//   shake(power, ms)                 — тряска экрана
//   telegraph(cells, kind)           — подсветка клеток (движение / атака / область), возвращает функцию снятия
// Работает на Web Animations API поверх слоя #effects (клетка = 64 px), CSS-файл не нужен.
// Все функции безопасны: без слоя, без анимаций (window.gameDebug.animate() === false) или при prefers-reduced-motion только показывают число.
(() => {
  const TILE = 64, wait = ms => new Promise(r => setTimeout(r, ms));
  const layer = () => {
    if (!window.voxel) return document.getElementById('effects');
    let el=document.getElementById('combat-effects');
    if(!el){el=document.createElement('div');el.id='combat-effects';el.setAttribute('aria-hidden','true');el.style.cssText='position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:8';document.getElementById('viewport')?.append(el);}
    return el;
  };
  const reduced = () => window.gameDebug?.animate?.() === false || !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const centre = p => window.voxel?.projectActor(p) || ({ x: (p.x + .5) * TILE, y: (p.y + .5) * TILE });
  const piece = p => window.gameDebug?.getPiece?.(p.id);
  const sprite = p => window.voxel ? null : piece(p)?.firstChild;
  let base = window.fx || {};
  const COLORS = { damage: '#ff5a4a', heal: '#6fe08a', fire: '#ff8a2a', cold: '#a0d8ef', radiant: '#fff3a0', poison: '#7bd36a', force: '#9a9aff', slash: '#f2f2fa', pierce: '#ffffff', smash: '#d8c8a8' };

  function node(css, text) {
    const l = layer(); if (!l) return null;
    const n = document.createElement('div');
    n.style.cssText = 'position:absolute;pointer-events:none;will-change:transform,opacity;transform:translate(-50%,-50%);' + css;
    if (text !== undefined) n.textContent = text;
    l.append(n); return n;
  }
  function run(n, frames, opts = {}) {
    if (!n) return Promise.resolve();
    const a = n.animate(frames, { fill: 'forwards', easing: 'ease-out', ...opts });
    const done = () => n.remove();
    return a.finished.then(done, done);
  }
  const at = (n, pt) => { n.style.left = pt.x + 'px'; n.style.top = pt.y + 'px'; return n; };
  const rand = (a, b) => a + Math.random() * (b - a);

  // ——— тряска экрана ———
  function shake(power = 4, ms = 220) {
    if (reduced()) return;
    const el = window.voxel?.renderer.domElement || document.getElementById('map-view'); if (!el || !el.animate) return;
    const n = Math.max(4, Math.round(ms / 28)), frames = [];
    for (let i = 0; i < n; i++) { const k = 1 - i / n; frames.push({ transform: `translate(${rand(-power, power) * k}px,${rand(-power, power) * k}px)` }); }
    frames.push({ transform: 'translate(0,0)' });
    el.animate(frames, { duration: ms, easing: 'linear' });
  }

  // ——— крупные надписи ———
  const BANNER = { crit: ['#ffcf40', '#7a4a00'], turn: ['#eaf2ff', '#1c2a44'], round: ['#c8d8f0', '#1c2a44'], victory: ['#8fe8a0', '#0c3a1c'], defeat: ['#ff7a6a', '#4a0c08'], info: ['#f4d17b', '#3a2a08'] };
  function banner(text, kind = 'info') {
    const host = document.getElementById('viewport') || document.getElementById('map-view') || document.body, [fg, bg] = BANNER[kind] || BANNER.info;
    const n = document.createElement('div');
    n.setAttribute('role', 'status');
    n.style.cssText = `position:absolute;left:50%;top:26%;transform:translate(-50%,-50%);pointer-events:none;z-index:60;white-space:nowrap;font:900 ${kind === 'crit' ? 38 : 28}px/1 system-ui,sans-serif;letter-spacing:.14em;color:${fg};text-shadow:0 2px 0 ${bg},0 0 14px ${bg},2px 0 0 ${bg},-2px 0 0 ${bg};`;
    n.textContent = text; host.append(n);
    if (reduced()) { setTimeout(() => n.remove(), 900); return Promise.resolve(); }
    return n.animate([
      { opacity: 0, transform: 'translate(-50%,-50%) scale(1.7)' }, { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', offset: .16 },
      { opacity: 1, transform: 'translate(-50%,-50%) scale(1)', offset: .78 }, { opacity: 0, transform: 'translate(-50%,-62%) scale(.96)' },
    ], { duration: kind === 'crit' ? 900 : 1100, easing: 'cubic-bezier(.2,.8,.2,1)' }).finished.then(() => n.remove(), () => n.remove());
  }

  // ——— частицы ———
  function burst(pt, color, count = 8, spread = 34, size = 5, life = 460) {
    for (let i = 0; i < count; i++) {
      const a = rand(0, Math.PI * 2), d = rand(spread * .5, spread), s = rand(size * .6, size);
      const n = at(node(`width:${s}px;height:${s}px;background:${color};border-radius:${Math.random() < .5 ? '50%' : '1px'};box-shadow:0 0 6px ${color}`), pt);
      run(n, [{ transform: 'translate(-50%,-50%) scale(1)', opacity: 1 }, { transform: `translate(calc(-50% + ${Math.cos(a) * d}px),calc(-50% + ${Math.sin(a) * d + 10}px)) scale(.2)`, opacity: 0 }], { duration: life * rand(.8, 1.2) });
    }
  }
  function ring(pt, color, from = 10, to = 54, ms = 420, width = 3) {
    const n = at(node(`width:${from}px;height:${from}px;border:${width}px solid ${color};border-radius:50%;box-shadow:0 0 12px ${color}`), pt);
    run(n, [{ width: from + 'px', height: from + 'px', opacity: .95 }, { width: to + 'px', height: to + 'px', opacity: 0 }], { duration: ms });
  }
  function crosses(pt, color) {
    for (let i = 0; i < 5; i++) {
      const n = at(node(`font:900 ${rand(14, 20)}px system-ui;color:${color};text-shadow:0 0 6px ${color}`, '+'), { x: pt.x + rand(-20, 20), y: pt.y + rand(-2, 12) });
      run(n, [{ transform: 'translate(-50%,-50%)', opacity: 0 }, { opacity: 1, offset: .2 }, { transform: `translate(-50%,calc(-50% - ${rand(30, 52)}px))`, opacity: 0 }], { duration: 900, delay: i * 70 });
    }
  }
  function number(pt, text, color, size, crit, motion = true) {
    const n = at(node(`font:900 ${size}px/1 system-ui,sans-serif;color:${color};text-shadow:0 2px 0 #1a1a22,0 0 8px #1a1a22,2px 0 0 #1a1a22,-2px 0 0 #1a1a22;white-space:nowrap`, text), { x: pt.x, y: pt.y - 18 });
    if (crit) n.setAttribute('aria-label', 'Критический удар ' + text);
    if (!motion || reduced()) { setTimeout(() => n.remove(), 1000); return; }
    run(n, [{ transform: 'translate(-50%,-50%) scale(.4)', opacity: 0 }, { transform: 'translate(-50%,-70%) scale(1.35)', opacity: 1, offset: .18 }, { transform: 'translate(-50%,-90%) scale(1)', opacity: 1, offset: .55 }, { transform: 'translate(-50%,-150%) scale(.95)', opacity: 0 }], { duration: crit ? 1250 : 1000, easing: 'ease-out' });
  }

  // ——— ближняя атака и выстрел ———
  async function strike(a, b, animate = true) {
    if (!animate || reduced() || !layer()) return;
    if(window.voxel) void base.strike?.(a,b,true);
    base._last = { a, b }; fx._last = { a, b };
    const dx = b.x - a.x, dy = b.y - a.y, dist = Math.max(Math.abs(dx), Math.abs(dy)), len = Math.hypot(dx, dy) || 1, ux = dx / len, uy = dy / len;
    const s = sprite(a), pa = centre(a), pb = centre(b), kind = (a.classId === 'wizard' || a.attacks?.[0]?.type === 'fire') ? 'fire' : a.classId === 'cleric' ? 'radiant' : 'pierce';
    if (dist <= 1) {
      // замах назад, рывок вперёд, дуга клинка в точке удара, возврат
      if (s) { await s.animate([{ transform: 'translate(0,0) scale(1,1)' }, { transform: `translate(${-ux * 9}px,${-uy * 9}px) scale(1.06,.94)` }], { duration: 120, fill: 'forwards', easing: 'ease-out' }).finished.catch(() => {}); }
      if (s) s.animate([{ transform: `translate(${-ux * 9}px,${-uy * 9}px) scale(1.06,.94)` }, { transform: `translate(${ux * 28}px,${uy * 28}px) scale(.94,1.1)`, offset: .45 }, { transform: 'translate(0,0) scale(1,1)' }], { duration: 330, easing: 'cubic-bezier(.2,.9,.2,1)' });
      await wait(60);
      const ang = Math.atan2(pb.y-pa.y, pb.x-pa.x) * 180 / Math.PI, arc = at(node(`width:46px;height:46px;border:6px solid transparent;border-top-color:#f6f6ff;border-right-color:#f6f6ff88;border-radius:50%;filter:drop-shadow(0 0 5px #fff)`), { x: (pa.x + pb.x) / 2 + ux * 8, y: (pa.y + pb.y) / 2 + uy * 8 });
      run(arc, [{ transform: `translate(-50%,-50%) rotate(${ang - 130}deg) scale(.7)`, opacity: 0 }, { opacity: 1, offset: .25 }, { transform: `translate(-50%,-50%) rotate(${ang + 40}deg) scale(1.15)`, opacity: 0 }], { duration: 240 });
      await wait(95);
    } else {
      // выстрел: вспышка у стрелка, снаряд со шлейфом
      if (s) s.animate([{ transform: 'translate(0,0) scale(1)' }, { transform: `translate(${-ux * 5}px,${-uy * 5}px) scale(1.04,.96)`, offset: .4 }, { transform: 'translate(0,0) scale(1)' }], { duration: 220 });
      ring(pa, COLORS[kind], 8, 30, 220, 2);
      const col = COLORS[kind], ms = Math.round(110 + dist * 55), ang = Math.atan2(pb.y-pa.y, pb.x-pa.x) * 180 / Math.PI;
      const shot = at(node(kind === 'pierce' ? `width:30px;height:3px;background:linear-gradient(90deg,transparent,#d8c8a0 40%,#fff);transform-origin:50% 50%` : `width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#fff,${col} 60%,transparent);box-shadow:0 0 14px ${col}`), pa);
      const trail = setInterval(() => { const t = Math.min(1, (performance.now() - t0) / ms); burst({ x: pa.x + (pb.x - pa.x) * t, y: pa.y + (pb.y - pa.y) * t }, col, 1, 6, 4, 260); }, 45), t0 = performance.now();
      const flight = run(shot, [{ transform: `translate(-50%,-50%) rotate(${ang}deg)` }, { transform: `translate(calc(-50% + ${pb.x - pa.x}px),calc(-50% + ${pb.y - pa.y}px)) rotate(${ang}deg)` }], { duration: ms, easing: 'linear' });
      await wait(ms - 20); clearInterval(trail); await flight;
    }
  }

  // ——— попадание, промах, лечение, гибель ———
  function impact(p, amount, critical = false, animate = true, type = 'damage') {
    if (!layer()) return base.impact?.(p, amount, critical, animate, type);
    const pt = centre(p), isNum = typeof amount === 'number', heal = type === 'heal' || (typeof amount === 'string' && amount[0] === '+'), s = sprite(p);
    const text = isNum ? '−' + amount : amount, size = critical ? 34 : isNum ? Math.min(30, 17 + amount * .6) : 17;
    const color = heal ? COLORS.heal : !isNum ? '#c8d0e0' : critical ? '#ffcf40' : COLORS.damage;
    number(pt, text, color, size, critical, animate);
    if(window.voxel && animate && !reduced() && isNum && amount>0){const model=window.voxel.models.get(p.id);if(model)model.userData.hit=performance.now();}
    if (!animate || reduced()) return;
    if (heal) { ring(pt, COLORS.heal, 12, 58, 560); crosses(pt, COLORS.heal); if (s) s.animate([{ filter: 'brightness(1)' }, { filter: 'brightness(1.6) saturate(1.4) hue-rotate(60deg)', offset: .25 }, { filter: 'brightness(1)' }], { duration: 520 }); return; }
    if (!isNum) { // промах: цель уходит в сторону
      const last = fx._last, side = last && last.b === p ? Math.sign((last.a.y - p.y) || 1) : 1;
      if (s) s.animate([{ transform: 'translate(0,0)' }, { transform: `translate(${side * 13}px,${-side * 4}px) rotate(${side * 6}deg)`, offset: .35 }, { transform: 'translate(0,0)' }], { duration: 300, easing: 'ease-out' });
      return;
    }
    const last = fx._last, from = last && last.b === p ? last.a : null, kx = from ? Math.sign(p.x - from.x) : 0, ky = from ? Math.sign(p.y - from.y) : 0, push = critical ? 16 : 9;
    if (s) {
      s.animate([{ transform: 'translate(0,0) scale(1,1)', filter: 'brightness(1)' },
        { transform: `translate(${kx * push}px,${ky * push}px) scale(${critical ? '1.22,.8' : '1.12,.9'})`, filter: 'brightness(2.4) saturate(.2)', offset: .22 },
        { transform: `translate(${kx * push * .5}px,${ky * push * .5}px) scale(.96,1.04)`, filter: 'brightness(1.3)', offset: .55 }, { transform: 'translate(0,0) scale(1,1)', filter: 'brightness(1)' }], { duration: critical ? 480 : 340, easing: 'ease-out' });
    }
    burst(pt, critical ? '#ffcf40' : '#ff6a4a', critical ? 16 : 6 + Math.min(8, amount | 0), critical ? 52 : 36);
    ring(pt, critical ? '#ffcf40' : '#ffffff', 8, critical ? 74 : 46, 360, critical ? 4 : 2);
    if (critical) { banner('КРИТ!', 'crit'); shake(8, 340); } else if (amount >= 8) shake(3, 160);
    if (p.hp !== undefined && p.hp <= 0) setTimeout(() => fall(p), critical ? 380 : 260);
  }
  function fall(p) { // падение при гибели: заваливается набок, серый, оседает в пыль
    const s = sprite(p); if (!s || reduced()) return;
    burst(centre(p), '#b8b0a0', 10, 30, 6, 700); ring(centre(p), '#b8b0a066', 10, 50, 600, 2);
    s.animate([{ transform: 'rotate(0) translateY(0)', filter: 'none', opacity: 1 }, { transform: 'rotate(78deg) translate(6px,10px)', filter: 'grayscale(1) brightness(.8)', opacity: .55 }], { duration: 640, fill: 'forwards', easing: 'cubic-bezier(.3,.9,.4,1.2)' });
  }

  // ——— заклинания ———
  async function cast(a, b, spell = 'bolt', animate = true) {
    if (!animate || reduced() || !layer()) return;
    const kind = typeof spell === 'string' ? spell : spell.kind, pa = centre(a), pb = centre(b), dist = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)), ms = Math.round(160 + dist * 50), s = sprite(a);
    const col = { bolt: COLORS.fire, fireball: COLORS.fire, cone: COLORS.fire, missile: COLORS.force, holy: COLORS.radiant, bless: COLORS.radiant, heal: COLORS.heal, cold: COLORS.cold, poison: COLORS.poison }[kind] || COLORS.force;
    if (s) s.animate([{ transform: 'translateY(0) scale(1)', filter: 'brightness(1)' }, { transform: 'translateY(-6px) scale(1.06,1.1)', filter: `brightness(1.6) drop-shadow(0 0 8px ${col})`, offset: .4 }, { transform: 'translateY(0) scale(1)', filter: 'brightness(1)' }], { duration: 420 });
    ring(pa, col, 10, 44, 420, 2); burst(pa, col, 6, 26);
    await wait(180);
    if (kind === 'missile') {
      await Promise.all([0, 1, 2].map(async i => { await wait(i * 110); const o = at(node(`width:11px;height:11px;border-radius:50%;background:radial-gradient(circle,#fff,${col} 60%,transparent);box-shadow:0 0 12px ${col}`), pa), bend = (i - 1) * 46; await run(o, [{ transform: 'translate(-50%,-50%)' }, { transform: `translate(calc(-50% + ${(pb.x - pa.x) / 2 + bend}px),calc(-50% + ${(pb.y - pa.y) / 2 - 36}px))`, offset: .5 }, { transform: `translate(calc(-50% + ${pb.x - pa.x}px),calc(-50% + ${pb.y - pa.y}px))` }], { duration: ms + 80, easing: 'ease-in-out' }); burst(pb, col, 4, 22); }));
    } else if (kind === 'holy') {
      const col2 = at(node(`width:34px;height:200px;background:linear-gradient(180deg,transparent,${col}cc 60%,#fff);border-radius:17px;filter:blur(1px);box-shadow:0 0 24px ${col}`), { x: pb.x, y: pb.y - 80 });
      await run(col2, [{ transform: 'translate(-50%,-50%) scaleX(.2)', opacity: 0 }, { transform: 'translate(-50%,-50%) scaleX(1)', opacity: 1, offset: .3 }, { transform: 'translate(-50%,-50%) scaleX(.5)', opacity: 0 }], { duration: 560 }); burst(pb, col, 14, 40);
    } else if (kind === 'bless' || kind === 'heal') {
      ring(pb, col, 14, 70, 700, 3); crosses(pb, col); await wait(300);
    } else if (kind === 'cone') {
      const ang = Math.atan2(pb.y - pa.y, pb.x - pa.x) * 180 / Math.PI, f = at(node(`width:${TILE * 3}px;height:${TILE * 3}px;background:conic-gradient(from -45deg at 0% 50%,${col}cc 0deg,${col}00 90deg);transform-origin:0 50%;filter:blur(2px)`), pa);
      f.style.transform = `translate(0,-50%) rotate(${ang}deg)`;
      await run(f, [{ opacity: 0, transform: `translate(0,-50%) rotate(${ang}deg) scale(.2)` }, { opacity: 1, transform: `translate(0,-50%) rotate(${ang}deg) scale(1)`, offset: .45 }, { opacity: 0, transform: `translate(0,-50%) rotate(${ang}deg) scale(1.1)` }], { duration: 520 }); burst(pb, col, 12, 46);
    } else {
      const o = at(node(`width:18px;height:18px;border-radius:50%;background:radial-gradient(circle,#fff,${col} 55%,transparent);box-shadow:0 0 18px ${col}`), pa);
      const trail = setInterval(() => { const t = Math.min(1, (performance.now() - t0) / ms); burst({ x: pa.x + (pb.x - pa.x) * t, y: pa.y + (pb.y - pa.y) * t }, col, 2, 10, 5, 300); }, 40), t0 = performance.now();
      await run(o, [{ transform: 'translate(-50%,-50%)' }, { transform: `translate(calc(-50% + ${pb.x - pa.x}px),calc(-50% + ${pb.y - pa.y}px))` }], { duration: ms, easing: 'ease-in' }); clearInterval(trail);
      if (kind === 'fireball') { const r = (spell.radius || 3) * TILE; ring(pb, '#fff', 20, r * 2, 520, 5); ring(pb, col, 20, r * 1.7, 640, 8); burst(pb, col, 34, r * .9, 9, 760); shake(10, 420); const g = at(node(`width:${r * 2}px;height:${r * 2}px;border-radius:50%;background:radial-gradient(circle,#fff 0%,${col}cc 35%,${col}00 70%)`), pb); run(g, [{ opacity: 1, transform: 'translate(-50%,-50%) scale(.2)' }, { opacity: .9, transform: 'translate(-50%,-50%) scale(1)', offset: .35 }, { opacity: 0, transform: 'translate(-50%,-50%) scale(1.1)' }], { duration: 640 }); await wait(260); }
      else burst(pb, col, 12, 36);
    }
  }

  // ——— подсветка клеток ———
  function telegraph(cells, kind = 'move') {
    const c = { move: ['#4aa8ff', .28], attack: ['#ff4a4a', .32], aoe: ['#ff8a2a', .36], ally: ['#4ade80', .28] }[kind] || ['#ffffff', .25], nodes = [];
    for (const cell of cells) {
      const n = node(`width:${TILE - 4}px;height:${TILE - 4}px;background:${c[0]};opacity:${c[1]};border:2px solid ${c[0]};border-radius:6px;box-shadow:inset 0 0 14px ${c[0]}`);
      if (!n) continue; at(n, centre(cell));
      if (!reduced()) n.animate([{ opacity: c[1] * .6 }, { opacity: c[1] }, { opacity: c[1] * .6 }], { duration: 1100, iterations: Infinity });
      nodes.push(n);
    }
    return () => nodes.forEach(n => n.remove());
  }

  const fx = Object.assign({}, base, { strike, impact, cast, banner, shake, telegraph, fall, version: 2 });
  window.CombatFX={attach(rendererFX){base=rendererFX;window.fx=Object.assign({},rendererFX,fx,{step:rendererFX.step,door:rendererFX.door,pulse:p=>impact(p,'Отклик',false,!reduced(),'heal')});return window.fx;}};
  window.fx = fx;
})();
