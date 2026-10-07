(() => {
  "use strict";
  const R = HeroRules, $ = (id) => document.getElementById(id), g = () => window.gameDebug;
  let heroes = [], draft = null, step = 0, angle = 0, saving = false, loaded = false;
  const pick = (n) => DND.die(n) - 1, esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  function button(text, fn, cls = "") {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    if (window.UIIcons && ["‹", "›", "+", "−", "×"].includes(text)) {
      b.replaceChildren(UIIcons.node({ "‹": "left", "›": "right", "+": "plus", "−": "minus", "×": "close" }[text]));
    }
    b.className = cls;
    b.onclick = fn;
    return b;
  }
  function appearanceDefaults(classId, gender = "male") {
    return Characters.defaultLook(classId, gender);
  }
  function makeDraft(id = "fighter") {
    return { name: ["Арден", "Рин", "Мира", "Бор"][pick(4)], classId: id, stats: R.preset(id), appearance: appearanceDefaults(id), kit: pick(2), background: R.background(id, pick) };
  }
  async function api(method = "GET", body, path = "") {
    const r = await fetch("/api/heroes" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : void 0 });
    let data;
    try {
      data = await r.json();
    } catch {
      throw Error("Сохранения недоступны. Попробуйте ещё раз.");
    }
    if (!r.ok) throw Error(data.error || "Ошибка сохранения.");
    return data;
  }
  function show() {
    const d = $("heroes-panel");
    if (!d.open) d.showModal();
  }
  function status(t) {
    $("heroes-error").textContent = t;
  }
  async function open() {
    show();
    if (draft) {
      editor();
      return;
    }
    await list();
  }
  async function list() {
    draft = null;
    step = 0;
    $("heroes-title").textContent = "Твои герои";
    $("heroes-body").replaceChildren();
    $("heroes-footer").replaceChildren();
    status("Загрузка героев…");
    try {
      const data = await api();
      heroes = data.heroes;
      loaded = true;
      status("");
      paintList();
    } catch (e) {
      status(e.message);
      paintList();
    }
  }
  function paintList() {
    window.CinematicMenu?.clearHero();
    $("heroes-panel").classList.remove('hero-creation');
    $("heroes-panel").classList.remove("appearance-editor", "look-editing");
    const body = $("heroes-body");
    body.replaceChildren();
    if (!heroes.length) {
      const p = document.createElement("p");
      p.className = "subtle";
      p.textContent = loaded ? "Создай первого героя. После подтверждения имя, внешность, класс и предыстория закрепятся." : "Список пока не загружен.";
      body.append(p);
    }
    for (const h of heroes) {
      const card = document.createElement("article");
      card.className = "saved-hero";
      const art = document.createElement("div");
      art.className = "saved-hero-art";
      if (window.voxel?.heroPortrait) art.append(voxel.heroPortrait(h));
      const info = document.createElement("div"), title2 = document.createElement("h3"), sub = document.createElement("p");
      title2.textContent = h.name;
      sub.textContent = R.CLASSES[h.classId].name + " · Человек · Уровень " + h.level + (h.activeWorldId ? " · в приключении" : "");
      info.append(title2, sub);
      card.append(art, info, button("Миры · начать или продолжить", () => window.Worlds.choose(h), "gold"), button("В тестовую комнату", () => window.Worlds.enterTest(h)));
      const details = document.createElement("details");
      details.innerHTML = "<summary>История и снаряжение</summary><p>" + esc(h.background) + "</p><p>" + h.inventory.map(esc).join(" · ") + "</p>";
      card.append(details, button("Удалить героя и его миры", () => removeHero(h), "danger"));
      body.append(card);
    }
    const f = $("heroes-footer");
    f.replaceChildren(button("Создать героя", () => start(false), "gold"), button("Быстрый старт", () => start(true)), button("Обновить список", list));
  }
  function removeHero(h) {
    const d = $("modal");
    $("modal-title").textContent = "Удалить героя?";
    const p = document.createElement("p");
    p.textContent = "Герой «" + h.name + "» и все его миры будут удалены навсегда. Вернуть их нельзя.";
    $("modal-body").replaceChildren(p, button("Отмена", () => d.close()), button("Удалить навсегда", async () => {
      try {
        if (!await window.Worlds.prepareLeave()) return;
        await api("DELETE", null, "/" + encodeURIComponent(h.id));
        if (g().state.party.some((p2) => p2.id === h.id)) {
          window.Worlds.detach();
          g().test("reset");
        }
        d.close();
        await list();
      } catch (e) {
        p.textContent = e.message;
      }
    }, "danger"));
    d.showModal();
  }
  function start(quick) {
    draft = makeDraft();
    if (!quick) draft.stats = R.emptyStats();
    try {
      const cached = JSON.parse(sessionStorage.getItem("hero-draft"));
      if (cached) {
        R.validate(cached);
        draft = cached;
      }
    } catch {
    }
    step = quick ? 3 : 0;
    angle = 0;
    editor();
  }
  function remember() {
    try {
      sessionStorage.setItem("hero-draft", JSON.stringify(draft));
    } catch {
    }
  }
  function updateBasics(patch) {
    if(patch.classId&&patch.classId!==draft.classId){draft.classId=patch.classId;draft.stats=R.preset(patch.classId);draft.kit=pick(2);draft.background=R.background(patch.classId,pick);draft.appearance=Characters.normalize(draft.appearance,patch.classId);}
    if(patch.gender)draft.appearance.gender=patch.gender;
    if(patch.name!==undefined)draft.name=patch.name;
    remember();editor();
  }
  function basicControls(){
    const card=document.createElement('section');card.className='hero-basics';
    const label=document.createElement('label');label.textContent='Имя';const nameRow=document.createElement('div');nameRow.className='hero-name-row';const input=document.createElement('input');input.value=draft.name;input.maxLength=24;input.setAttribute('aria-label','Имя героя');input.oninput=()=>{draft.name=input.value;remember();if(window.CinematicMenu?.editor)CinematicMenu.editor.actor.name=draft.name;};
    const dice=button('',()=>updateBasics({name:['Эльдар','Арден','Мира','Рин','Бор'][pick(5)]}));dice.setAttribute('aria-label','Случайное имя');dice.append(UIIcons.node('dice'));nameRow.append(input,dice);label.append(nameRow);card.append(label);
    card.append(title('Класс'));const classes=document.createElement('div');classes.className='class-choices cinema-classes';
    for(const [id,c]of Object.entries(R.CLASSES)){const b=button('',()=>updateBasics({classId:id}),draft.classId===id?'active':'');const caption=document.createElement('span');caption.className='choice-label';caption.textContent=c.name;b.append(caption);b.setAttribute('aria-pressed',String(draft.classId===id));b.prepend(UIIcons.node({fighter:'sword',wizard:'staff',rogue:'sword',cleric:'armor'}[id]));classes.append(b);}card.append(classes);
    card.append(title('Пол'));const genders=document.createElement('div');genders.className='class-choices cinema-genders';
    for(const [gender,text,path]of [['male','Мужской','<circle cx="9" cy="15" r="5"/><path d="m13 11 7-7M15 4h5v5"/>'],['female','Женский','<circle cx="12" cy="8" r="5"/><path d="M12 13v9M8 18h8"/>']]){const b=button(text,()=>updateBasics({gender}),draft.appearance.gender===gender?'active':'');b.setAttribute('aria-pressed',String(draft.appearance.gender===gender));const svg=document.createElement('span');svg.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">'+path+'</svg>';b.prepend(svg);genders.append(b);}card.append(genders);return card;
  }
  function title(t) {
    const h = document.createElement("h3");
    h.textContent = t;
    return h;
  }
  function editor() {
    const panel = $("heroes-panel"), scroll = panel.scrollTop, settingsScroll = $("appearance-settings")?.scrollTop || 0;
    panel.classList.toggle("look-editing", step === 2);
    panel.classList.add('hero-creation');
    panel.dataset.step=step;
    panel.classList.remove("appearance-editor");
    remember();
    status("");
    $("heroes-title").textContent = "Создание героя";
    const body = $("heroes-body");
    body.replaceChildren();
    const steps = document.createElement("div");
    steps.className = "creation-steps";
    ["Основа", "Характеристики", "Внешность", "История"].forEach((s, i) => {
      if(window.CinematicMenu?.active&&i===1)return;
      const b = button("", () => {
        step = i;
        editor();
      }, i === step || (window.CinematicMenu?.active&&i===0&&step===1) ? "active" : "");
      b.setAttribute("aria-label", i + 1 + " · " + s);
      b.setAttribute("aria-current", i === step ? "step" : "false");
      const n = document.createElement("small"), label = document.createElement("span");
      n.textContent = i + 1;
      label.textContent = ["Основа", "Очки", "Облик", "История"][i];
      b.append(n, label);
      steps.append(b);
    });
    body.append(steps);
    const preview = document.createElement("div");
    preview.className = "creation-preview" + (step === 2 ? " appearance-preview" : "");
    const figure = document.createElement("div");
    figure.id = "creation-figure";
    const portrait = document.createElement("div");
    portrait.id = "creation-portrait";
    preview.append(portrait);
    preview.append(figure);
    if (step === 2) {
      const hint = document.createElement("small");
      hint.className = "rotation-hint";
      hint.textContent = "Поверни модель пальцем";
      preview.append(hint);
    }
    let dragX = null;
    figure.onpointerdown = (e) => {
      dragX = e.clientX;
      figure.setPointerCapture(e.pointerId);
    };
    figure.onpointermove = (e) => {
      if (dragX !== null && Math.abs(e.clientX - dragX) > 24) {
        angle = (angle + (e.clientX > dragX ? 1 : 3)) % 4;
        dragX = e.clientX;
        paintPreview();
      }
    };
    figure.onpointerup = figure.onpointercancel = () => {
      dragX = null;
    };
    if (step !== 2) body.append(preview);
    if (step === 0) {
      body.append(title("Имя и класс"));
      const label = document.createElement("label");
      label.textContent = "Имя героя";
      const input = document.createElement("input");
      input.value = draft.name;
      input.maxLength = 24;
      input.autocomplete = "off";
      input.oninput = () => {
        draft.name = input.value;
        remember();
        paintPreview();
      };
      label.append(input);
      body.append(label);
      body.append(title("Пол"));
      const genderChoices = document.createElement("div");
      genderChoices.className = "class-choices";
      for (const [gender, text] of [["male", "Мужской"], ["female", "Женский"]]) {
        const b = button(text, () => {
          draft.appearance.gender = gender;
          editor();
        }, (draft.appearance.gender || "male") === gender ? "active" : "");
        b.setAttribute("aria-pressed", String((draft.appearance.gender || "male") === gender));
        genderChoices.append(b);
      }
      body.append(genderChoices);
      const grid = document.createElement("div");
      grid.className = "class-choices";
      for (const [id, c] of Object.entries(R.CLASSES)) grid.append(button(c.name, () => {
        draft.classId = id;
        draft.stats = R.preset(id);
        draft.kit = pick(2);
        draft.background = R.background(id, pick);
        draft.appearance = Characters.normalize(draft.appearance, id);
        editor();
      }, draft.classId === id ? "active" : ""));
      body.append(grid);
      const p = document.createElement("p");
      p.className = "subtle";
      p.textContent = "Человек · Уровень 1. " + R.CLASSES[draft.classId].hint;
      body.append(p);
    }
    if (step === 1) {
      body.append(title("Распредели 27 очков"));
      const used = R.pointsUsed(draft.stats), remaining = R.POINT_BUDGET - used;
      const budget = document.createElement("p");
      budget.className = "point-budget";
      budget.id = "point-budget";
      budget.textContent = "Осталось " + remaining + " из 27 · потрачено " + used;
      budget.setAttribute("role", "status");
      body.append(budget);
      const p = document.createElement("p");
      p.className = "subtle";
      p.textContent = "Все характеристики начинают с 8. Значения 9–13 стоят по одному очку за повышение; 14 и 15 — по два. Это базовые значения до бонусов предыстории. " + R.CLASSES[draft.classId].hint;
      body.append(p);
      const grid = document.createElement("div");
      grid.className = "point-stats";
      for (const [key, name] of Object.entries(R.LABELS)) {
        const row = document.createElement("div");
        row.className = "point-stat";
        const label = document.createElement("span");
        label.textContent = name;
        const value = document.createElement("strong");
        value.textContent = draft.stats[key];
        const modifier = document.createElement("small");
        const mod = DND.mod(draft.stats[key]);
        modifier.textContent = "Модификатор " + (mod >= 0 ? "+" : "") + mod + " · стоимость " + R.POINT_COSTS[draft.stats[key]];
        const minus = button("−", () => {
          if (R.adjustStat(draft.stats, key, -1)) editor();
        });
        minus.dataset.stat = key;
        minus.dataset.delta = "-1";
        minus.setAttribute("aria-label", "Уменьшить: " + name);
        minus.disabled = draft.stats[key] <= 8;
        const plus = button("+", () => {
          if (R.adjustStat(draft.stats, key, 1)) editor();
        });
        plus.dataset.stat = key;
        plus.dataset.delta = "1";
        plus.setAttribute("aria-label", "Увеличить: " + name);
        plus.disabled = draft.stats[key] >= 15 || R.POINT_COSTS[draft.stats[key] + 1] - R.POINT_COSTS[draft.stats[key]] > remaining;
        row.append(label, minus, value, plus, modifier);
        grid.append(row);
      }
      body.append(grid, button("Распределить под класс", () => {
        draft.stats = R.preset(draft.classId);
        editor();
      }), button("Сбросить до 8", () => {
        draft.stats = R.emptyStats();
        editor();
      }));
    }
    if (step === 2) body.append(LookEditor.create(draft, { remember, updateBasics }));
    if (step === 3) {
      body.append(title(draft.name + " · " + R.CLASSES[draft.classId].name));
      const p = document.createElement("p");
      p.textContent = draft.background;
      body.append(p, button("Новая предыстория", () => {
        draft.background = R.background(draft.classId, pick);
        editor();
      }));
      body.append(title("Обычное стартовое снаряжение"));
      const kit = R.CLASSES[draft.classId].kits[draft.kit], ul = document.createElement("ul");
      kit.items.forEach((t) => {
        const li = document.createElement("li");
        li.textContent = t;
        ul.append(li);
      });
      body.append(ul, button("Другой комплект", () => {
        draft.kit = (draft.kit + 1) % R.CLASSES[draft.classId].kits.length;
        editor();
      }));
      const h = R.sheet({ ...draft, name: draft.name.trim() || "Герой" }, "preview"), stats = document.createElement("p");
      stats.textContent = "Очки характеристик " + R.pointsUsed(draft.stats) + " / 27 · Здоровье " + h.max + " · КД " + h.ac + " · " + Object.entries(draft.stats).map(([k, v]) => R.LABELS[k] + " " + v).join(" · ");
      body.append(stats);
      const note = document.createElement("p");
      note.className = "creation-warning";
      note.textContent = "После подтверждения имя, внешность, класс, начальные характеристики и предыстория закрепятся. Прокачка и смена снаряжения останутся доступны.";
      body.append(note);
    }
    const f = $("heroes-footer");
    f.replaceChildren(button(step ? "Назад" : "К героям", () => {
      if (step) {
        step--;
        editor();
      } else {
        draft = null;
        $("heroes-title").textContent = "Твои герои";
        paintList();
      }
    }));
    if (step < 3) f.append(button("Далее", () => {
      if (!draft.name.trim()) {
        status("Введите имя героя.");
        return;
      }
      step++;
      editor();
    }, "gold"));
    else {
      const b = button(saving ? "Сохраняем…" : "Подтвердить героя", confirm, "gold");
      b.disabled = saving || !draft.name.trim();
      f.append(b);
    }
    if(step===0 && window.CinematicMenu?.active){
      const top=document.createElement('div');top.className='hero-creation-top';const basics=document.createElement('div');basics.className='hero-basics';
      for(const node of [...body.children])if(node!==steps&&node!==preview)basics.append(node);
      top.append(basicControls(),preview);body.append(top);
      const next=document.createElement('section');next.className='foundation-card';next.innerHTML='<h3>Характеристики</h3><p>Распредели 27 очков или выбери набор для своего класса.</p>';
      next.append(button('Распределить очки',()=>{step=1;editor();}),button('Готовый набор · '+R.CLASSES[draft.classId].name,()=>{draft.stats=R.preset(draft.classId);step=2;editor();},'gold'));body.append(next);
    }
    paintPreview();
    panel.scrollTop = scroll;
    if (saving) $("heroes-panel").querySelectorAll("button,input,select").forEach((el) => el.disabled = true);
  }
  function paintPreview() {
    const el = $("creation-figure");
    if (!el || !draft) return;
    el.replaceChildren();
    const h = R.sheet({ ...draft, name: draft.name.trim() || "Герой" }, "preview");
    const portrait = $("creation-portrait");
    if (portrait) {
      const name = document.createElement("b"), hp = document.createElement("span");
      name.textContent = h.name;
      hp.textContent = h.max + " / " + h.max;
      portrait.replaceChildren(Artwork.hero(h), name, hp);
    }
    if(window.CinematicMenu?.active){window.CinematicMenu.setHero(h,el);el.setAttribute('aria-label','Модель героя: вращайте пальцем');return;}
    if (window.voxel?.heroPortrait) {
      el.append(voxel.heroPortrait(h, angle));
    } else el.append(g().art(R.CLASSES[draft.classId].kind * 4));
  }
  async function confirm() {
    if (saving) return;
    try {
      R.validate(draft);
      if (R.pointsUsed(draft.stats) !== R.POINT_BUDGET) {
        step = 1;
        editor();
        status("Распределите оставшиеся " + (R.POINT_BUDGET - R.pointsUsed(draft.stats)) + " очков перед подтверждением.");
        return;
      }
      saving = true;
      editor();
      const { hero } = await api("POST", draft);
      heroes.unshift(hero);
      draft = null;
      $("heroes-title").textContent = "Твои герои";
      sessionStorage.removeItem("hero-draft");
      saving = false;
      status("Герой сохранён. Создаём новый мир…");
      paintList();
      $('heroes-panel').close();
      await window.Worlds.begin(hero);
    } catch (e) {
      saving = false;
      editor();
      status(e.message);
    }
  }
  function init() {
    const d = document.createElement("dialog");
    d.id = "heroes-panel";
    d.className = "heroes-panel";
    d.innerHTML = '<div class="modal-head"><h2 id="heroes-title">Твои герои</h2><button id="heroes-close" aria-label="Назад"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 4-8 8 8 8"/></svg></button></div><div id="heroes-body"></div><p id="heroes-error" role="status" aria-live="polite"></p><div id="heroes-footer"></div>';
    document.body.append(d);
    $("heroes-close").onclick = () => {
      if(!saving&&window.CinematicMenu?.active){d.close();window.CinematicMenu.closeScreen();return;}
      if (!saving && !window.Worlds.atMenu) d.close();
    };
    d.addEventListener("cancel", (e) => {
      if(window.CinematicMenu?.active){e.preventDefault();if(!saving){d.close();window.CinematicMenu.closeScreen();}return;}
      if (saving || window.Worlds.atMenu) e.preventDefault();
    });
    const b = button("Мои герои", open);
    b.id = "saved-heroes-open";
    $("hero-view").prepend(b);
    if(!window.CinematicMenu)open();
  }
  window.Heroes = { init, open, paintPreview, refreshPortraits: () => {
    if (draft) paintPreview();
    else if (loaded) paintList();
  }, get heroes() {
    return heroes;
  }, get draft() {
    return draft;
  }, basicControls, list:async()=>{show();await list();}, start, confirm };
})();
