(() => {
  "use strict";
  const $ = (id) => document.getElementById(id), g = () => window.gameDebug;
  function close() {
    const d = $("modal");
    d.close();
  }
  function button(label, fn) {
    const b = document.createElement("button");
    b.textContent = label;
    b.onclick = async () => {
      close();
      try { await fn(); }
      catch (error) {
        const d = $("modal"), message = document.createElement("p");
        $("modal-title").textContent = "Действие пока недоступно";
        message.textContent = error?.message || "Не удалось выполнить действие. Попробуйте ещё раз.";
        const dismiss = document.createElement("button"); dismiss.textContent = "Закрыть"; dismiss.onclick = close;
        $("modal-body").replaceChildren(message, dismiss);
        if (!d.open) d.showModal();
      }
    };
    b.className = "menu-option";
    return b;
  }
  function actions() {
    const d = $("actions-panel");
    $("combat-tools").hidden = false;
    d.showModal();
    window.dispatchEvent(new CustomEvent('game-action', { detail: { type: 'actions', success: true } }));
    window.Tutorial?.render();
  }
  function menu() {
    const d = $("modal"), body = $("modal-body");
    $("modal-title").textContent = "Меню";
    if (window.Worlds?.practice) {
      const region = window.Worlds.practiceKind === 'region';
      const note = document.createElement('p');
      note.textContent = region ? 'Это временная прогулка. Найденные вещи, монеты и опыт не переносятся в приключение.' : 'Вещи, здоровье и опыт основного приключения сохраняются отдельно.';
      body.replaceChildren(note, button(region ? "Вернуться в приключение" : "Вернуться из практики", () => region ? window.Worlds.endPractice() : window.Tutorial.exitPractice()), button("Действия героя", actions), button("Журнал", () => g().journal()), button("Как играть", () => g().help()));
      d.showModal();
      return;
    }
    body.replaceChildren(button("Прогулка по окрестностям", () => window.Worlds.startRegionWalk()), button("Повторить обучение · отдельная практика", () => window.Tutorial?.replay()), button("Сохранить и выйти в меню героев", () => window.Worlds.exitToMenu()), button("Текущий мир", () => window.Worlds.open()), button("Мои герои", () => window.Heroes.open()), button("Таверна · генератор локаций", () => window.ProceduralLocations.open()), button("Эпизод · Пропавший послушник", () => window.Episode.open()), button("Действия героя", actions), button("Хроника", () => g().journal()), button("Как играть", () => g().help()), button("Правила и источники", () => {
      const d2 = $("modal");
      $("modal-title").textContent = "Правила и источники";
      const p = document.createElement("p");
      p.textContent = "Основа: SRD 5.2.1 · CC BY 4.0.";
      const a = document.createElement("a");
      a.href = "rules.html";
      a.textContent = "Открыть правила, источники и домашние изменения";
      $("modal-body").replaceChildren(p, a);
      d2.showModal();
    }), button("Мастерская · проверки и настройки", () => window.Worlds.workshop()));
    d.showModal();
  }
  function init() {
    const tools = $("combat-tools"), d = document.createElement("dialog");
    d.id = "actions-panel";
    const head = document.createElement("div");
    head.className = "modal-head";
    const title = document.createElement("h2");
    title.textContent = "Действия героя";
    const b = document.createElement("button");
    b.append(UIIcons.node("close"));
    b.setAttribute("aria-label", "Закрыть действия");
    b.onclick = () => d.close();
    head.append(title, b);
    d.append(head, tools);
    document.body.append(d);
    const toggle = $("combat-tools-toggle");
    toggle.innerHTML = "<span>···</span><b>Действия</b>";
    toggle.onclick = actions;
    $("end").before(toggle);
    $("menu").onclick = menu;
    $("tab-test").hidden = true;
    $("menu").textContent = "☰";
    $("menu").setAttribute("aria-label", "Меню");
    $("menu").setAttribute("aria-haspopup", "dialog");
    const ledger = $("roll-log").closest("details");
    ledger.removeAttribute("open");
    $("journal").after(ledger);
    $("camera-center").textContent = "◎";
    $("camera-center").setAttribute("aria-label", "Центрировать на герое");
    $("camera-fit").textContent = "⛶";
    $("camera-fit").setAttribute("aria-label", "Показать всю карту");
    render();
  }
  function render() {
    if (!g()) return;
    const s = g().state;
    document.body.classList.toggle("in-combat", s.combat);
    $("end").hidden = !s.combat;
    $("turn-resources").parentElement.hidden = !s.combat;
    $("learning-tip").hidden = true;
    $("light-state").hidden = true;
    $("rules-credit")?.classList.add("workshop-only");
  }
  window.GameMenu = { init, render, open: menu, actions };
})();
