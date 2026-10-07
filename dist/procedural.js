(() => {
  "use strict";
  let current = null, revision = 0;
  const $ = (id) => document.getElementById(id), game = () => window.gameDebug;
  function install(world) {
    const report = LocationGenerator.validateWorld(world);
    if (!report.valid) throw Error("Локация не прошла проверку проходимости.");
    const scenes = structuredClone(world.locations);
    for (const s of scenes) {
      s.layoutKey = world.version + ":" + world.seed + ":" + world.attempt + ":" + ++revision;
      World.compileCollisions(s);
    }
    for (const s of scenes) World.scenes[s.id] = s;
    current = world;
    return world;
  }
  function restore(state) {
    if (!state?.procedural) return;
    install(LocationGenerator.generate(state.procedural.seed, {version:state.procedural.version}));
  }
  function newWalk(seed = crypto.randomUUID()) {
    if (game().state.world || game().busy || game().state.combat) throw Error('Сначала завершите текущее действие.');
    const world = LocationGenerator.generate(seed);
    install(world);
    if (!game().startGenerated(world)) throw Error('Не удалось войти в новую локацию.');
    return world;
  }
  function button(text, fn) {
    const b = document.createElement("button");
    b.type = "button";
    b.textContent = text;
    b.onclick = fn;
    return b;
  }
  function focus(p) {
    $("modal").close();
    viewsDebug.switchTab("map");
    game().select(p);
    window.camera?.center(p);
  }
  function open() {
    if(game()?.state.world?.gen){
      if(game().moving)return;
      $('modal-title').textContent=game().scene.name;const body=$('modal-body');body.replaceChildren();
      const seed=document.createElement('p');seed.className='world-seed';seed.textContent='Зерно: '+game().state.world.gen.seed;body.append(seed);
      for(const p of game().props.filter(p=>['portal','npc','chest'].includes(p.type)))body.append(button(p.name,()=>focus(p)));
      if(!$('modal').open)$('modal').showModal();return;
    }
    if (!game() || game().moving || game().state.combat) {
      game()?.tell("Сначала завершите движение или бой.");
      return;
    }
    $("modal-title").textContent = "Таверна и окрестности";
    const body = $("modal-body");
    body.replaceChildren();
    const label = document.createElement("label");
    label.textContent = "Seed раскладки";
    const input = document.createElement("input");
    input.id = "location-seed";
    input.maxLength = 64;
    input.value = '';
    input.placeholder = 'Автоматически';
    input.autocomplete = "off";
    input.spellcheck = false;
    label.append(input);
    const advanced=document.createElement('details'), summary=document.createElement('summary');
    summary.textContent='Для проверки конкретной карты';
    advanced.append(summary,label);
    if (!game().state.world) body.append(advanced);
    const hint = document.createElement("p");
    hint.textContent = game().state.world ? 'Этот мир сохранён за героем. Продолжение не меняет карту. Новый мир создаётся через меню героя после завершения текущего.' : 'Новая прогулка создаёт новую карту автоматически. Прогулка локальная; мир героя сохраняется через «Мои герои».';
    body.append(hint);
    const result = document.createElement("p");
    result.id = "generation-result";
    result.setAttribute("role", "status");
    input.addEventListener("input", () => result.textContent = "");
    if (current) result.textContent = "Проходимость проверена: 3 из 3 локаций. Попытка " + (current.attempt + 1) + ".";
    body.append(result);
    const generate = button("Новая прогулка", async () => {
      generate.disabled = true;
      try {
        const world = LocationGenerator.generate(input.value.trim() || crypto.randomUUID());
        if (game().busy && !Worlds.atMenu || game().state.combat) throw Error("Дождитесь завершения действия.");
        if (game().state.world || Worlds.atMenu) {
          await Worlds.workshop();
          if (game().state.world || Worlds.atMenu) throw Error("Сначала сохраните текущий мир.");
        }
        install(world);
        document.querySelectorAll("dialog[open]").forEach((d) => d.close());
        game().startGenerated(world);
        viewsDebug.switchTab("map");
      } catch (e) {
        result.textContent = e.message;
      } finally {
        generate.disabled = false;
      }
    });
    generate.id = "generate-locations";
    if (!game().state.world) body.append(generate);
    if (game().scene.generated) {
      body.append(button("Продолжить прогулку", () => {
        $("modal").close();
        viewsDebug.switchTab("map");
      }));
      const t = document.createElement("p");
      t.textContent = "Показать на карте:";
      body.append(t);
      for (const p of game().props.filter((p2) => ["portal", "npc", "chest"].includes(p2.type))) body.append(button(p.name, () => focus(p)));
    }
    if (!$("modal").open) $("modal").showModal();
  }
  function render() {
    if (!$("generated-route")) return;
    const s = game().scene;
    $("generated-route").hidden = !s.generated;
  }
  function init() {
    const section = document.createElement("section");
    section.id = "generated-route";
    section.className = "generated-route";
    section.hidden = true;
    const b = button("Маршрут", open);
    b.id = "generated-route-open";
    section.append(b);
    $("map-view").prepend(section);
    const launch = button("Таверна · генератор локаций", open);
    launch.id = "open-location-generator";
    launch.className = "test-card";
    $("test-view").prepend(launch);
    render();
  }
  window.ProceduralLocations = { newWalk, install, restore, open, render, init, get current() {
    return current;
  } };
})();
