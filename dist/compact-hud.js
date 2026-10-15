/* Presentation only: reuse the live game's controls, rules and save lifecycle. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const game = () => window.gameDebug;
  let ready = false, drawer, lastScene = '', toastTimer, lastSave = '';

  function iconButton(id, label, icon, fn) {
    const button = document.createElement('button');
    button.id = id;
    button.type = 'button';
    button.textContent = label;
    if (icon) window.UIIcons?.apply(button, icon);
    button.onclick = fn;
    return button;
  }

  function toast(text) {
    if (!text || !ready || window.CinematicMenu?.active || window.Worlds?.atMenu) return;
    const node = $('hud-toast');
    clearTimeout(toastTimer);
    node.textContent = text;
    node.hidden = false;
    toastTimer = setTimeout(() => { node.hidden = true; }, 3500);
  }

  function closeNavigation() { drawer?.close(); }
  function navigate(fn) {
    closeNavigation();
    fn();
  }

  function openNavigation() {
    if (!ready || drawer.open) return;
    game().dismissMapActions();
    $('hud-location').textContent = game().scene.name;
    drawer.showModal();
    $('menu').setAttribute('aria-expanded', 'true');
    window.Tutorial?.render();
  }

  function prepareAttacks() {
    const list = $('hud-target-actions'), g = game();
    list.replaceChildren();
    const targets = g.all().filter(target => target.hp > 0 && !target.dead && (target.kind === 3 || target.dummy));
    for (const target of targets) {
      const button = iconButton('', 'Атаковать: ' + target.name, 'sword', () => g.attack(target));
      button.disabled = g.busy || !g.canAttack(g.active(), target) || window.Tutorial?.allowsAction?.('attack') === false;
      list.append(button);
    }
    list.hidden = !targets.length;
  }

  function init() {
    if (ready) return;
    ready = true;
    document.body.classList.add('compact-hud');
    const tabletop = document.querySelector('.tabletop'), viewport = $('viewport');
    const menu = $('menu');
    tabletop.append(menu);
    menu.onclick = openNavigation;
    menu.setAttribute('aria-controls', 'hud-navigation');
    menu.setAttribute('aria-expanded', 'false');

    drawer = document.createElement('dialog');
    drawer.id = 'hud-navigation';
    drawer.setAttribute('aria-labelledby', 'hud-navigation-title');
    const head = document.createElement('div'); head.className = 'modal-head';
    const title = document.createElement('h2'); title.id = 'hud-navigation-title'; title.textContent = 'Путешествие';
    const close = iconButton('hud-navigation-close', '', 'close', closeNavigation);
    close.setAttribute('aria-label', 'Закрыть меню');
    head.append(title, close);
    const body = document.createElement('div'); body.id = 'hud-navigation-body';
    const location = document.createElement('p'); location.id = 'hud-location';
    body.append(location);
    const save = $('world-save'); if (save) body.append(save);
    const tabs = document.querySelector('.tabs');
    body.append(tabs);
    for (const button of tabs.querySelectorAll('button')) {
      // Keep the original click handler and its tutorial checkpoints.
      button.addEventListener('click', closeNavigation);
    }
    const route = $('generated-route'), routeButton = $('generated-route-open');
    if (route && routeButton) {
      const openRoute = routeButton.onclick;
      routeButton.onclick = event => navigate(() => openRoute.call(routeButton, event));
      body.append(route);
    }
    body.append(
      iconButton('hud-open-journal', 'Журнал заданий', 'book', () => navigate(() => {
        if (window.Adventure?.active) window.Adventure.journal();
        else window.HUD.openNotes();
      })),
      iconButton('hud-open-actions', 'Действия героя', 'more', () => navigate(() => window.GameMenu.actions())),
      iconButton('hud-open-log', 'Хроника бросков', 'dice', () => navigate(() => game().journal()))
    );
    const camera = document.querySelector('.map-toolbar');
    camera.querySelector('span').textContent = 'Камера';
    body.append(camera);
    for (const button of camera.querySelectorAll('button')) {
      button.title = button.getAttribute('aria-label') || button.textContent;
      button.addEventListener('click', closeNavigation);
    }
    body.append(iconButton('hud-open-settings', 'Настройки и выход', 'menu', () => navigate(() => window.GameMenu.open())));
    drawer.append(head, body);
    document.body.append(drawer);
    drawer.addEventListener('close', () => {
      menu.setAttribute('aria-expanded', 'false');
      render();
    });
    drawer.addEventListener('click', event => {
      const r = drawer.getBoundingClientRect();
      if (event.target === drawer && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) closeNavigation();
    });

    const back = iconButton('hud-back', 'К карте', 'left', () => $('tab-map').click());
    back.hidden = true;
    tabletop.append(back);
    viewport.append($('combat-tools-toggle'), $('end'));
    const state = document.createElement('div'); state.id = 'hud-turn-state';
    state.append($('turn-resources')); viewport.append(state);
    const notice = document.createElement('div'); notice.id = 'hud-toast'; notice.hidden = true;
    notice.setAttribute('role', 'status'); viewport.append(notice);
    const alert = iconButton('hud-alert', '', null, () => window.Worlds.open());
    alert.hidden = true; alert.setAttribute('role', 'alert'); viewport.append(alert);

    const actions = $('actions-panel'), tools = $('combat-tools');
    const attacks = document.createElement('div'); attacks.id = 'hud-target-actions'; attacks.className = 'quick-actions';
    tools.prepend(attacks);
    const extras = document.createElement('div'); extras.className = 'hud-action-extras';
    extras.append($('potion')); tools.append(extras);
    const originalActions = window.GameMenu.actions;
    window.GameMenu.actions = () => {
      closeNavigation();
      prepareAttacks();
      if (!actions.open) originalActions();
      $('combat-tools-toggle').setAttribute('aria-expanded', 'true');
    };
    $('combat-tools-toggle').onclick = window.GameMenu.actions;
    $('combat-tools-toggle').setAttribute('aria-controls', 'actions-panel');
    $('combat-tools-toggle').setAttribute('aria-haspopup', 'dialog');
    actions.addEventListener('close', () => $('combat-tools-toggle').setAttribute('aria-expanded', 'false'));
    // Close BEFORE the original action runs (it may open a different dialog).
    actions.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (button && !button.disabled && tools.contains(button)) actions.close();
    }, true);

    if (save) new MutationObserver(() => {
      const text = save.textContent;
      const failure = !save.hidden && save.classList.contains('save-error');
      alert.hidden = !failure;
      if (failure) alert.textContent = text + ' · Подробнее';
      if (text !== lastSave && text === 'Мир сохранён') toast(text);
      lastSave = text;
    }).observe(save, {childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ['hidden', 'class']});
    new MutationObserver(render).observe($('dialogue'), {attributes: true, attributeFilter: ['hidden']});
    new MutationObserver(render).observe(document.body, {attributes: true, attributeFilter: ['class']});
    render();
  }

  function render() {
    if (!ready || !game()) return;
    const g = game(), a = g.active(), onMap = !$('map-view').hidden;
    const obstructed = !$('dialogue').hidden || !!window.Adventure?.locked || !!window.CinematicMenu?.active || !!window.Worlds?.atMenu || a.hp <= 0;
    if (document.body.classList.contains('hud-obscured') !== obstructed) document.body.classList.toggle('hud-obscured', obstructed);
    $('hud-back').hidden = onMap;
    $('combat-tools-toggle').hidden = !onMap || (!g.state.combat && !window.Tutorial?.active);
    $('combat-tools-toggle').disabled = g.busy || !!window.HUD?.active || a.hp <= 0;
    $('end').hidden = !onMap || !g.state.combat;
    $('hud-turn-state').hidden = !onMap || !g.state.combat;
    $('turn-resources').textContent = `${a.move} кл. · ${a.acted ? 'действие потрачено' : 'действие доступно'}`;
    $('hud-health').setAttribute('aria-label', `${a.name}: здоровье ${a.hp} из ${a.max}. Открыть героя`);
    const scene = [g.state.world?.id || '', g.state.scene].join(':');
    if (onMap && !obstructed && lastScene !== scene) { lastScene = scene; toast(g.scene.name); }
  }

  window.CompactHUD = {init, render, openNavigation, closeNavigation};
})();
