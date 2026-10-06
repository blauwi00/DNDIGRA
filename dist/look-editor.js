// Редактор внешности героя. Модель и портрет сверху всегда показывают текущий облик (оба строятся из Characters.build),
// плитки вариантов — живые миниатюры того же героя с подставленным вариантом. Данные и правила: src/look-options.js.
(() => {
  'use strict';
  const C = () => window.Characters, R = () => window.HeroRules;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
  const ICONS = {
    dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1.2" fill="currentColor"/><circle cx="15" cy="9" r="1.2" fill="currentColor"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/><circle cx="9" cy="15" r="1.2" fill="currentColor"/><circle cx="15" cy="15" r="1.2" fill="currentColor"/>',
    drop: '<path d="M12 3.5c3.6 4.2 5.6 7 5.6 9.6a5.6 5.6 0 0 1-11.2 0c0-2.6 2-5.4 5.6-9.6z"/>',
    undo: '<path d="M9 7 4.5 11.5 9 16"/><path d="M5 11.5h8.5a5.5 5.5 0 0 1 0 11" transform="translate(0 -4)"/>',
    reset: '<path d="M5 12a7 7 0 1 0 2.2-5.1"/><path d="M5 4.5v4.2h4.2"/>',
    left: '<path d="M15 5 8 12l7 7"/>', right: '<path d="m9 5 7 7-7 7"/>',
  };
  const icon = name => { const s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('width', '1em'); s.setAttribute('height', '1em'); s.setAttribute('fill', 'none'); s.setAttribute('stroke', 'currentColor'); s.setAttribute('stroke-width', '2.2'); s.setAttribute('stroke-linecap', 'round'); s.setAttribute('stroke-linejoin', 'round'); s.setAttribute('aria-hidden', 'true'); s.innerHTML = ICONS[name]; return s; };
  const COLOR_KEYS = ['hair', 'hair2', 'brow', 'eye', 'beardColor', 'cloth', 'cloth2', 'trim', 'leather', 'accent', 'hat', 'capeColor', 'gem'];
  let tab = 'looks', angle = 0;

  function create(draft, hooks = {}) {
    if(window.CinematicMenu?.active&&tab==='looks')tab='hair';
    const Ch = C(), ClassInfo = () => R().CLASSES[draft.classId];
    const fresh = Ch.normalize(draft.appearance, draft.classId); delete fresh.face; delete fresh.hood; draft.appearance = fresh;
    const ap = () => draft.appearance, hands = () => ClassInfo().kits[draft.kit]?.hands;
    const actor = (a = ap()) => ({ classId: draft.classId, appearance: a, hands: hands(), kind: ClassInfo().kind, name: draft.name });
    const history = [];
    let queued = false, updaters = [];

    const root = el('section', 'look-editor'), sticky = el('div', 'look-sticky'), stage = el('div', 'look-stage');
    const modelBox = el('div', 'look-model'), portraitBox = el('div', 'look-portrait'), tools = el('div', 'look-tools');
    const rotL = el('button', 'look-rot rot-l'), rotR = el('button', 'look-rot rot-r');
    rotL.append(icon('left')); rotR.append(icon('right')); rotL.type = rotR.type = 'button'; rotL.setAttribute('aria-label', 'Повернуть влево'); rotR.setAttribute('aria-label', 'Повернуть вправо');
    rotL.onclick = () => { if(window.CinematicMenu?.active){window.voxel?.turnHero(-Math.PI/2);return;} angle = (angle + 3) % 4; paintStage(); }; rotR.onclick = () => { if(window.CinematicMenu?.active){window.voxel?.turnHero(Math.PI/2);return;} angle = (angle + 1) % 4; paintStage(); };
    const modelSlot = el('div', 'look-slot'), modelCap = el('small', '', 'Модель'), portraitSlot = el('div', 'look-slot frame'), portraitCap = el('small', '', '');
    let dragX=null,dragged=false;
    modelSlot.style.touchAction='pan-y';
    modelSlot.onpointerdown=e=>{dragX=e.clientX;dragged=false;modelSlot.setPointerCapture(e.pointerId);};
    modelSlot.onpointermove=e=>{if(dragX!==null&&Math.abs(e.clientX-dragX)>24){dragged=true;angle=(angle+(e.clientX>dragX?1:3))%4;dragX=e.clientX;paintStage();}};
    modelSlot.onpointerup=modelSlot.onpointercancel=()=>{dragX=null;};
    modelSlot.onclick=()=>{if(!dragged){angle=(angle+1)%4;paintStage();}};
    modelBox.append(rotL, modelSlot, rotR, modelCap); portraitBox.append(portraitSlot, portraitCap);
    const toolBtn = (iconName, label, fn) => { const b = el('button', 'look-tool'); b.type = 'button'; const ic = el('span', 'ic'); ic.append(icon(iconName)); b.append(ic, el('span', 'tx', label)); b.setAttribute('aria-label', label); b.onclick = fn; return b; };
    const diceBtn = toolBtn('dice', 'Случайно', () => { diceBtn.classList.remove('roll'); void diceBtn.offsetWidth; diceBtn.classList.add('roll'); randomAll(); });
    const undoBtn = toolBtn('undo', 'Отмена', undo), resetBtn = toolBtn('reset', 'Сброс', resetClass);
    undoBtn.disabled = true;
    tools.append(diceBtn, undoBtn, resetBtn);
    if(window.CinematicMenu?.active){const basics=Heroes.basicControls();modelBox.append(portraitBox);stage.append(basics,modelBox);}else stage.append(modelBox, portraitBox, tools);
    const tabs = el('div', 'look-tabs'); tabs.setAttribute('role', 'tablist');
    const categories=window.CinematicMenu?.active?[...Ch.TABS].sort((a,b)=>['face','hair','outfit','looks','extras'].indexOf(a.id)-['face','hair','outfit','looks','extras'].indexOf(b.id)):Ch.TABS;
    const tabBtns = categories.map(t => { const b = el('button', 'look-tab', t.name); b.type = 'button'; b.setAttribute('role', 'tab'); b.onclick = () => { tab = t.id; paintTabs(); paintPanel(); }; tabs.append(b); return [t.id, b]; });
    sticky.append(stage, tabs);
    if(window.CinematicMenu?.active)tabs.append(tools);
    const panel = el('div', 'look-panel');
    const note = el('p', 'look-note', 'Все изменения видны сразу на модели и портрете. После подтверждения героя внешность закрепится.');
    root.append(sticky, panel, note);

    // ——— состояние ———
    function commit(mutator) {
      history.push(JSON.stringify(ap())); if (history.length > 50) history.shift();
      mutator(ap()); changed(true);
    }
    function undo() { const s = history.pop(); if (!s) return; draft.appearance = JSON.parse(s); changed(true); }
    function changed(pop) { hooks.remember?.(); undoBtn.disabled = !history.length; schedule(pop); }
    function schedule(pop) { if (pop) { portraitSlot.classList.remove('pop'); void portraitSlot.offsetWidth; portraitSlot.classList.add('pop'); } if (queued) return; queued = true; requestAnimationFrame(() => { queued = false; paintStage(); for (const u of updaters) u(); }); }
    const isDefault = () => { const strip = a => { const c = { ...a }; delete c.skin; delete c.gender; return JSON.stringify(c); }; return strip(ap()) === strip(Ch.defaultLook(draft.classId, ap().gender)); };
    function setGender(g) {
      commit(a => {
        if (isDefault()) { const keep = a.skin, d = Ch.defaultLook(draft.classId, g); for (const k of Object.keys(a)) delete a[k]; Object.assign(a, d, { skin: keep }); } else a.gender = g;
      });
    }
    function resetClass() { commit(a => { const keep = a.skin, d = Ch.defaultLook(draft.classId, a.gender); for (const k of Object.keys(a)) delete a[k]; Object.assign(a, d, { skin: keep }); }); }
    function randomAll() { const r = Ch.randomLook(draft.classId, ap().gender); commit(a => { for (const k of Object.keys(a)) delete a[k]; Object.assign(a, r); }); }
    function randomColors() { const r = Ch.randomLook(draft.classId, ap().gender); commit(a => { for (const k of COLOR_KEYS) a[k] = r[k]; a.skin = r.skin; }); }

    // ——— миниатюры ———
    function thumb(patch, view, back) {
      const cv = Ch.portrait(ClassInfo().kind, actor({ ...ap(), ...patch }), { view, back, width: 84, height: 84, pixel: 2 });
      cv.className = 'look-thumb'; return cv;
    }
    const valueName = (key, g) => { const v = ap()[key]; if (v === null || v === undefined) return g.follow || ''; const pal = Ch.PALETTES[Ch.COLOR_FIELDS[key]]; return pal.find(c => c.hex === v)?.name || ''; };

    function group(title) { const wrap = el('div', 'look-group'), head = el('h4', 'look-title', title + ' '), val = el('span', 'look-value'); head.append(val); wrap.append(head); return { wrap, val }; }

    function tilesGroup(g) {
      const { wrap, val } = group(g.title), opts = g.byClass ? Ch.OUTFITS[draft.classId] : Ch.OPTIONS[g.key], grid = el('div', 'look-tiles');
      const tiles = opts.map(o => { const b = el('button', 'look-tile'); b.type = 'button'; b.onclick = () => commit(a => { a[g.key] = o.id; }); b.setAttribute('aria-label', g.title + ': ' + o.name); grid.append(b); return { b, o }; });
      wrap.dataset.field=g.key;wrap.append(grid);
      const update = () => { val.textContent = '· ' + (opts.find(o => o.id === ap()[g.key])?.name || ''); for (const t of tiles) { t.b.replaceChildren(thumb({ [g.key]: t.o.id }, g.view, g.back), el('span', 'lab', t.o.name)); const on = ap()[g.key] === t.o.id; t.b.classList.toggle('active', on); t.b.setAttribute('aria-pressed', String(on)); } };
      updaters.push(update); update(); return wrap;
    }
    function multiGroup(g) {
      const { wrap, val } = group(g.title), opts = Ch.OPTIONS[g.key], grid = el('div', 'look-tiles');
      const tiles = opts.map(o => { const b = el('button', 'look-tile'); b.type = 'button'; b.onclick = () => commit(a => { const set = new Set(a[g.key]); set.has(o.id) ? set.delete(o.id) : set.add(o.id); a[g.key] = opts.map(x => x.id).filter(id => set.has(id)); }); b.setAttribute('aria-label', g.title + ': ' + o.name); grid.append(b); return { b, o }; });
      wrap.append(grid);
      const update = () => { const cur = ap()[g.key], names = opts.filter(o => cur.includes(o.id)).map(o => o.name); val.textContent = '· ' + (names.join(', ') || 'нет'); for (const t of tiles) { const on = cur.includes(t.o.id); t.b.replaceChildren(thumb({ [g.key]: [...new Set([...cur, t.o.id])] }, g.view), el('span', 'lab', t.o.name)); t.b.classList.toggle('active', on); t.b.setAttribute('aria-pressed', String(on)); } };
      updaters.push(update); update(); return wrap;
    }
    function swatchGroup(g) {
      const { wrap, val } = group(g.title), pal = Ch.PALETTES[Ch.COLOR_FIELDS[g.key]], row = el('div', 'look-swatches'), btns = [];
      if (g.follow) { const b = el('button', 'look-follow', g.follow); b.type = 'button'; b.onclick = () => commit(a => { a[g.key] = null; }); b.setAttribute('aria-label', g.title + ': ' + g.follow); row.append(b); btns.push([null, b]); }
      for (const c of pal) { const b = el('button', 'look-swatch'); b.type = 'button'; b.style.setProperty('--c', c.hex); b.title = c.name; b.setAttribute('aria-label', g.title + ': ' + c.name); b.onclick = () => commit(a => { a[g.key] = c.hex; }); row.append(b); btns.push([c.hex, b]); }
      wrap.append(row);
      const update = () => { val.textContent = '· ' + valueName(g.key, g); const cur = ap()[g.key] ?? null; for (const [v, b] of btns) { b.classList.toggle('active', v === cur); b.setAttribute('aria-pressed', String(v === cur)); } };
      updaters.push(update); update(); return wrap;
    }

    function looksTab() {
      const out = [];
      { // пол
        const { wrap, val } = group('Пол'), grid = el('div', 'look-tiles');
        const tiles = Ch.OPTIONS.gender.map(o => { const b = el('button', 'look-tile'); b.type = 'button'; b.onclick = () => { if (ap().gender !== o.id) setGender(o.id); }; b.setAttribute('aria-label', 'Пол: ' + o.name); grid.append(b); return { b, o }; });
        wrap.append(grid);
        const update = () => { val.textContent = '· ' + Ch.OPTIONS.gender.find(o => o.id === ap().gender).name; for (const t of tiles) { t.b.replaceChildren(thumb({ gender: t.o.id }, 'head'), el('span', 'lab', t.o.name)); const on = ap().gender === t.o.id; t.b.classList.toggle('active', on); t.b.setAttribute('aria-pressed', String(on)); } };
        updaters.push(update); update(); out.push(wrap);
      }
      { // готовые образы
        const { wrap, val } = group('Готовые образы'), grid = el('div', 'look-tiles');
        val.textContent = '· ' + R().CLASSES[draft.classId].name;
        for (const p of Ch.PRESETS[draft.classId]) {
          const look = Ch.presetLook(draft.classId, p), b = el('button', 'look-tile preset'); b.type = 'button'; b.setAttribute('aria-label', 'Образ: ' + p.name);
          const keep = ap().skin; b.append(Ch.portrait(ClassInfo().kind, actor(look), { width: 84, height: 84, pixel: 2, view: 'head' }), el('span', 'lab', p.name)); b.firstChild.className = 'look-thumb';
          b.onclick = () => commit(a => { const skin = p.patch.skin ? look.skin : keep; for (const k of Object.keys(a)) delete a[k]; Object.assign(a, look, { skin }); }); grid.append(b);
        }
        wrap.append(grid); out.push(wrap);
      }
      { // быстрые действия
        const { wrap } = group('Быстро'), row = el('div', 'look-quick');
        const q = (iconName, text, fn) => { const b = el('button', 'look-quick-btn'); b.type = 'button'; const ic = el('span', 'ic'); ic.append(icon(iconName)); b.append(ic, el('span', '', text)); b.onclick = fn; return b; };
        row.append(q('dice', 'Случайный образ', randomAll), q('drop', 'Случайные цвета', randomColors), q('reset', 'Классика класса', resetClass));
        wrap.append(row); out.push(wrap);
      }
      return out;
    }

    function paintTabs() { for (const [id, b] of tabBtns) { b.classList.toggle('active', id === tab); b.setAttribute('aria-selected', String(id === tab)); } }
    function paintPanel() {
      updaters = []; panel.replaceChildren();
      const nodes = tab === 'looks' ? looksTab() : Ch.GROUPS[tab].map(g => g.type === 'tiles' ? tilesGroup(g) : g.type === 'multi' ? multiGroup(g) : swatchGroup(g));
      panel.append(...nodes); panel.scrollTop = 0;if(window.CinematicMenu?.active)requestAnimationFrame(()=>{for(const row of panel.querySelectorAll('.look-tiles,.look-swatches')){const chosen=row.querySelector('.active');if(chosen)row.scrollLeft=Math.max(0,chosen.offsetLeft-row.offsetLeft-row.clientWidth/2+chosen.clientWidth/2);}});
    }
    function paintStage() {
      modelSlot.replaceChildren();
      if(window.CinematicMenu?.active){window.CinematicMenu.setHero(actor(),modelSlot);modelSlot.setAttribute('aria-label','Модель героя: вращайте пальцем');}
      try { const m = !window.CinematicMenu?.active && window.voxel?.heroPortrait?.(actor(), angle); if (m) { m.classList.add('look-canvas'); modelSlot.append(m); } } catch { /* 3D недоступно */ }
      if (!window.CinematicMenu?.active && !modelSlot.firstChild) { const f = Ch.portrait(ClassInfo().kind, actor(), { view: 'full', width: 120, height: 150, pixel: 2 }); f.className = 'look-canvas'; modelSlot.append(f); }
      const p = Ch.portrait(ClassInfo().kind, actor(), { width: 168, height: 192, pixel: 3 }); p.className = 'look-canvas'; p.setAttribute('aria-label', 'Портрет героя');
      portraitSlot.replaceChildren(p); portraitCap.textContent = (draft.name || 'Герой') + ' · ' + ClassInfo().name;
    }
    paintTabs(); paintPanel(); paintStage();
    return root;
  }
  window.LookEditor = { create };
})();
