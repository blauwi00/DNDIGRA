(() => {
  'use strict';
  const game = () => window.gameDebug, rules = () => window.TutorialRules;
  let card, pending = '', preparationKey = '';
  function current() { return game()?.state.tutorial || null; }
  function active() { return !!current() && !current().completed; }
  function practice() { return current()?.mode === 'practice'; }
  function ready() {
    const g = game();
    return !!g?.state.world && !window.Worlds?.atMenu && !window.CinematicMenu?.active && (!g.state.story || g.state.story.intro >= 3 && g.state.story.npcDeparted) && !window.Adventure?.introActive;
  }
  function profileKey() { return (window.NativeRuntime?.offline ? 'dndigra-local-' : '') + (rules()?.TUTORIAL_PROFILE_KEY || 'dndigra.tutorial.completed.v1'); }
  function profileCompleted() {
    try { return localStorage.getItem(profileKey()) === '1'; } catch { return false; }
  }
  function markCompleted(state) {
    if (!state.completed || state.skipped || state.mode !== 'campaign') return;
    try { localStorage.setItem(profileKey(), String(state.v)); } catch { /* Saved world remains authoritative when storage is unavailable. */ }
  }
  function emit(type, detail = {}) { window.dispatchEvent(new CustomEvent('game-action', { detail: { type, success: true, ...detail } })); }
  function init() {
    if (!card) {
      card = document.createElement('section'); card.id = 'tutorial-card'; card.className = 'tutorial-card'; card.hidden = true;
      card.setAttribute('aria-label', 'Обучение управлению'); card.setAttribute('aria-live', 'polite');
      card.innerHTML = '<div class="tutorial-heading"><strong></strong><span></span></div><p></p><progress max="20" value="0" aria-label="Прогресс обучения"></progress>';
      document.querySelector('.tabletop > header')?.after(card);
    }

  }
  function clearHighlights() { document.querySelectorAll('.tutorial-target').forEach(el => el.classList.remove('tutorial-target')); }
  function highlight(requirement) {
    clearHighlights();
    for (const el of document.querySelectorAll(requirement.target)) if (el.getClientRects().length) el.classList.add('tutorial-target');
    const abilityLabel = { secondWind: 'Второе дыхание', magearmor: 'Доспехи мага', dash: 'Рывок', cure: 'Лечение ран' };
    if (requirement.id === 'ability' || requirement.id === 'dodge') {
      const label = requirement.id === 'dodge' ? 'Уклониться' : abilityLabel[requirement.ability];
      for (const button of document.querySelectorAll('#quick-actions button')) if (button.textContent.startsWith(label)) button.classList.add('tutorial-target');
    }
    const dialog = document.getElementById('actions-panel');
    if (dialog) {
      let hint = dialog.querySelector('.tutorial-dialog-hint');
      if (!hint) { hint = document.createElement('p'); hint.className = 'tutorial-dialog-hint'; dialog.querySelector('.modal-head')?.after(hint); }
      hint.hidden = !dialog.open || !['actions', 'ability', 'dodge'].includes(requirement.id);
      hint.textContent = requirement.text;
    }
  }
  function record(event) {
    const g = game(), before = current();
    if (!g || !before || !rules() || !ready()) return;
    const after = rules().reduceTutorial(before, event);
    if (after === before) return;
    g.state.tutorial = after;
    markCompleted(after);
    g.save();
    render();
  }
  function allowsAction(type, id) {
    const state = current();
    if (!active() || !ready()) return true;
    if (type === 'interaction' && state.step < 4) return false;
    if (type === 'attack' && state.step < 15) return false;
    if (type === 'potion' && state.step < 14) return false;
    if (type === 'turn' && state.step === 12) return false;
    if (['ability', 'defense'].includes(type)) {
      if (['torch', 'skills', 'shortRest', 'longRest'].includes(id)) return true;
      if (state.step < 11) return false;
      if (state.step === 11) return id === rules().CLASS_ABILITY[state.classId];
      if (state.step === 12) return id === 'dodge';
      if (state.step < 15 && ['missile', 'burning'].includes(id)) return false;
    }
    return true;
  }
  function prepare(state) {
    const g = game();
    // The prologue scrape is nonlethal and makes healing meaningful for every class.
    const key = (g.state.world?.id || g.state.world?.gen?.seed || '') + ':' + state.mode + ':' + state.step;
    if (![11, 12].includes(state.step) || preparationKey === key || g.busy) return;
    preparationKey = key;
    const hero = g.active();
    const message = state.step === 11 ? 'Ссадины после дороги напоминают о себе. Попробуйте приём героя.' : 'Начинается учебный бой. Под рукой есть лечебное зелье.';
    if (hero.hp === hero.max && hero.max > 1 && !g.state.logs.includes(message)) {
      DND.damage(hero, Math.min(3, hero.max - 1));
      g.tell(message);
      g.save();
    }
  }
  function checkpoint(state) {
    const g = game(), configs = window.GeneratedWorlds?.plan?.story?.tutorial;
    if (!g || g.busy || window.HUD?.pending || pending || !window.Adventure) return;
    const key = (g.state.world?.id || g.state.world?.gen?.seed || '') + ':' + state.mode + ':' + state.step;
    let task;
    if (state.step >= 12 && state.step <= 16 && !g.state.combat && configs?.win && !state.checks.victory) {
      task = () => { window.closeDialogue?.(); document.getElementById('actions-panel')?.close(); window.viewsDebug?.switchTab('map'); return window.Adventure.startEncounter(configs.win, { tutorial: true, reward: { xp: 0, gold: 0 } }); };
    } else if (state.step === 17 && !g.state.combat && configs?.loss) {
      task = () => { window.closeDialogue?.(); document.getElementById('actions-panel')?.close(); window.viewsDebug?.switchTab('map'); return window.Adventure.startEncounter(configs.loss, { tutorial: true, scriptedLoss: true, reward: { xp: 0, gold: 0 } }); };
    } else if (state.step === 18 && !g.state.combat && g.active().hp > 0) {
      task = () => window.Adventure.defeatRescue();
    } else if (state.step === 18 && g.active().hp === 0) {
      task = () => emit('unconscious', { encounterId: 'tutorial-loss' });
    } else if (state.step === 19) {
      task = () => window.Adventure.rescue();
    }
    if (!task) return;
    pending = key;
    Promise.resolve().then(task).catch(error => {
      console.error(error); card.querySelector('p').textContent = 'Не удалось продолжить учебную сцену. Откройте меню и вернитесь к миру, чтобы повторить.';
    }).finally(() => { pending = ''; });
  }
  function render() {
    if (!game() || !rules()) return;
    init();
    const state = current(), showing = active() && ready();
    card.hidden = !showing;
    document.body.classList.toggle('tutorial-active', showing);
    if (!showing) {
      clearHighlights();
      document.querySelectorAll('.tutorial-dialog-hint').forEach(el => { el.hidden = true; });
      if (state?.completed && !state.skipped) {
        if (practice()) {
          card.hidden = false; document.body.classList.add('tutorial-active');
          card.querySelector('strong').textContent = 'Практика завершена'; card.querySelector('span').textContent = '20 / 20';
          card.querySelector('p').textContent = 'Все действия освоены. В меню выберите «Вернуться из практики»: основной мир и его награды сохранены.';
          card.querySelector('progress').value = 20;
        }
      }
      return;
    }
    game().state.rulesStage = Math.max(3, game().state.rulesStage || 0);
    const requirements = rules().tutorialRequirements(state.classId), requirement = requirements[state.step];
    card.dataset.step = requirement.id;
    card.querySelector('strong').textContent = requirement.title;
    card.querySelector('span').textContent = (practice() ? 'Практика · ' : 'Обучение · ') + (state.step + 1) + ' / ' + requirements.length;
    card.querySelector('p').textContent = requirement.text;
    card.querySelector('progress').max = requirements.length; card.querySelector('progress').value = state.step;
    highlight(requirement); prepare(state); checkpoint(state);
  }
  async function replay() {
    if (!window.Worlds?.startPractice) return;
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
    await window.Worlds.startPractice(); pending = ''; preparationKey = ''; render();
  }
  async function exitPractice() {
    if (!practice() || !window.Worlds?.endPractice) return;
    document.querySelectorAll('dialog[open]').forEach(dialog => dialog.close());
    await window.Worlds.endPractice(); pending = ''; preparationKey = ''; render();
  }
  // These listeners run after the real camera toolbar handlers, never from a hint button.
  for (const [id, action] of [['camera-center', 'center'], ['camera-fit', 'fit'], ['zoom-in', 'zoom'], ['zoom-out', 'zoom']]) {
    // A trusted click can flush microtasks between listeners. A new task waits
    // for the later voxel onclick handler to finish changing the camera.
    document.getElementById(id)?.addEventListener('click', event => { const enabled = !event.currentTarget.disabled; setTimeout(() => { if (enabled && window.camera) emit('camera', { action }); }, 0); });
  }
  window.addEventListener('game-action', event => record(event.detail));
  window.Tutorial = { start: render, restore: render, render, handle: record, emit, replay, exitPractice, isActive: active, get active() { return active(); }, current, profileKey, profileCompleted, canSkip: profileCompleted, allowsAction, get blocksPortals() { return active(); }, get practicing() { return practice(); } };
})();
