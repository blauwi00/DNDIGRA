(() => {
  "use strict";
  const $ = (id) => document.getElementById(id), g = () => window.gameDebug;
  const resumeKey = window.NativeRuntime?.offline ? 'dndigra-local-last-world-id' : 'last-world-id';
  let current = null, pending = null, inflight = null, timer = null, failed = false, conflict = false, leaving = false, lastSaved = "", serial = 0, atMenu = false;
  let practice = null;
  function button(text, fn, cls = "") {
    const b = document.createElement("button");
    b.textContent = text;
    b.className = cls;
    b.type = "button";
    b.onclick = fn;
    return b;
  }
  async function api(path = "", method = "GET", body) {
    const response = await fetch("/api/worlds" + path, { method, headers: body ? { "Content-Type": "application/json" } : {}, body: body ? JSON.stringify(body) : void 0, keepalive: method === "PUT" });
    let data;
    try {
      data = await response.json();
    } catch {
      throw Error("Сервер сохранений недоступен. Повторите попытку.");
    }
    if (!response.ok) {
      const e = Error(data.error || "Ошибка сохранения мира.");
      Object.assign(e, data);
      throw e;
    }
    return data;
  }
  function badge(text) {
    const b = $("world-save");
    if (!b) return;
    b.textContent = text;
    b.hidden = !current;
    b.classList.toggle("save-error", failed || conflict);
    b.onclick = open;
  }
  function capture() {
    if (practice) return;
    if (!current || current.status !== "active" || leaving) return;
    const snap = JSON.stringify(g().state);
    if (snap === lastSaved || snap === pending) return;
    pending = snap;
    badge("Мир · есть изменения");
    clearTimeout(timer);
    timer = setTimeout(() => flush(), 450);
  }
  async function flush() {
    if (practice) return true;
    clearTimeout(timer);
    if (inflight) return inflight;
    if (conflict) return false;
    if (!current || current.status !== "active" || !pending) return !failed;
    const epoch = serial;
    inflight = (async () => {
      while (current?.status === "active" && pending && epoch === serial) {
        const id = current.id, revision = current.revision, sent = pending;
        badge("Сохраняем мир…");
        try {
          const data = await api("/" + encodeURIComponent(id), "PUT", { revision, snapshot: JSON.parse(sent) });
          if (epoch !== serial) return true;
          current = data.world;
          lastSaved = sent;
          if (pending === sent) pending = null;
          failed = false;
          conflict = false;
          badge(pending ? "Мир · есть изменения" : "Мир сохранён");
        } catch (e) {
          if (epoch !== serial) return false;
          failed = true;
          conflict = !!e.conflict;
          badge(e.message);
          g().render();
          return false;
        }
      }
      return true;
    })();
    const task = inflight;
    try {
      return await task;
    } finally {
      if (inflight === task) inflight = null;
      g().render();
    }
  }
  async function exitToMenu() {
    if (practice) await endPractice();
    if (g().moving || g().busy && !window.Worlds.locked || window.HUD?.pending) {
      message("Дождитесь завершения текущего действия.");
      return;
    }
    if (current?.status === "active") {
      capture();
      if (!await flush()) return;
    }
    window.closeDialogue?.();
    document.querySelectorAll("dialog[open]").forEach((d) => d.close());
    atMenu = true;
    document.body.classList.toggle("at-main-menu", true);
    if(window.CinematicMenu) window.CinematicMenu.open();
    else await window.Heroes.open();
  }
  function detach() {
    serial++;
    clearTimeout(timer);
    current = null;
    pending = null;
    lastSaved = "";
    failed = conflict = false;
    badge("");
    render();
  }
  function attach(record) {
    practice = null;
    window.CinematicMenu?.play();
    atMenu = false;
    document.body.classList.toggle("at-main-menu", false);
    serial++;
    clearTimeout(timer);
    current = record;
    pending = null;
    failed = conflict = false;
    leaving = true;
    window.GeneratedWorlds?.prime(record);
    g().loadWorld(record.snapshot);
    window.CinematicMenu?.applyPreferences(true);
    leaving = false;
    lastSaved = JSON.stringify(g().state);
    badge(record.status === "completed" ? "Архив · мир завершён" : "Мир сохранён");
    render();
    try {
      localStorage.setItem(resumeKey, record.id);
    } catch {
    }
    window.viewsDebug.switchTab("map");
  }
  async function prepareLeave() {
    if (practice) {
      message("Сначала закончите практику или вернитесь из неё в своё приключение.");
      return false;
    }
    if (atMenu) return true;
    if (g().moving || g().busy && !window.Worlds.locked || g().state.combat) {
      message("Сначала завершите движение или бой. Мир можно закрыть и продолжить позже.");
      return false;
    }
    if (current?.status === "active") {
      capture();
      if (!await flush()) {
        open();
        return false;
      }
    }
    return true;
  }
  function message(text) {
    $("modal-title").textContent = "Миры";
    $("modal-body").textContent = text;
    $("modal").showModal();
  }
  async function enterTest(h) {
    if (!await prepareLeave()) return;
    const wasMenu = atMenu;
    atMenu = false;
    document.body.classList.toggle("at-main-menu", false);
    detach();
    g().loadHero(h, wasMenu);
    window.CinematicMenu?.play();
    window.ProceduralLocations.newWalk();
    $("heroes-panel").close();
    window.viewsDebug.switchTab("map");
  }
  async function choose(h) {
    if (!await prepareLeave()) return;
    const d = $("modal");
    $("modal-title").textContent = h.name + " · Миры";
    $("modal-body").textContent = "Загрузка…";
    $("heroes-panel").close();
    d.showModal();
    try {
      const { worlds, tutorialCompleted } = await api("?hero_id=" + encodeURIComponent(h.id));
      paintChoice(h, worlds, !!tutorialCompleted);
    } catch (e) {
      $("modal-body").textContent = e.message;
      $("modal-body").append(button("Повторить", () => choose(h)));
    }
  }
  function paintChoice(h, worlds, tutorialCompleted = false) {
    const body = $("modal-body");
    body.replaceChildren();
    const active = worlds.find((w) => w.status === "active"), p = document.createElement("p");
    p.textContent = active ? "Продолжение загрузит тот же мир и сохранённый прогресс." : "Новый путь начинается на опушке. История, жители и находки будут связаны одной проблемой.";
    body.append(p);
    if (active) {
      const b = button("Продолжить · " + active.snapshot.world.title, async () => {
        try {
          const data = await api("/" + active.id);
          attach(data.world);
          $("modal").close();
        } catch (e) {
          message(e.message);
        }
      }, "gold");
      body.append(b, button("Удалить этот мир", () => removeWorld(h, active), "danger"));
    } else body.append(button("Начать мир", () => newWorld(h, worlds, tutorialCompleted), "gold"));
    for (const w of worlds.filter((w2) => w2.status === "completed")) {
      const details = document.createElement("details"), summary = document.createElement("summary");
      summary.textContent = "Мир " + w.snapshot.world.chapter + " · " + w.snapshot.world.title + " · завершён";
      details.append(summary);
      const p2 = document.createElement("p");
      p2.textContent = "Уровень " + w.snapshot.level + " · " + w.snapshot.gold + " монет · посещено локаций: " + w.snapshot.world.discovered.length;
      details.append(p2, button("Посмотреть хронику", () => {
        const body2 = $("modal-body");
        $("modal-title").textContent = "Архив мира";
        body2.replaceChildren();
        for (const line of w.snapshot.logs) {
          const p3 = document.createElement("p");
          p3.textContent = line;
          body2.append(p3);
        }
        body2.append(button("Вернуться к мирам", () => {
          $("modal-title").textContent = h.name + " · Миры";
          paintChoice(h, worlds);
        }));
      }), button("Удалить мир из архива", () => removeWorld(h, w), "danger"));
      body.append(details);
    }
  }
  function removeWorld(h, w) {
    const body = $("modal-body");
    $("modal-title").textContent = "Удалить мир?";
    const p = document.createElement("p");
    p.textContent = "Мир «" + w.snapshot.world.title + "» будет удалён навсегда. Герой останется с текущими характеристиками и снаряжением.";
    body.replaceChildren(p, button("Отмена", () => choose(h)), button("Удалить мир", async () => {
      try {
        if (!await prepareLeave()) return;
        const record = current?.id === w.id ? current : w;
        await api("/" + record.id, "DELETE", { revision: record.revision });
        if (current?.id === w.id) {
          const checkpoint = { ...g().active(), level: g().state.level, xp: g().state.xp, gold: g().state.gold };
          detach();
          g().loadHero(checkpoint);
        }
        await window.Heroes.open();
        $("modal").close();
      } catch (e) {
        p.textContent = e.message;
      }
    }, "danger"));
  }
  function newWorld(h,worlds,tutorialCompleted=false){
    const body=$('modal-body');body.replaceChildren();$('modal-title').textContent='Новый мир';
    const form=document.createElement('div');form.className='world-gen-options';
    const label=document.createElement('label');label.textContent='Зерно';const seed=document.createElement('input');seed.id='world-seed';seed.maxLength=128;seed.placeholder='Пусто — случайный мир';label.append(seed);
    const sizeLabel=document.createElement('label');sizeLabel.textContent='Размер';const size=document.createElement('select');size.id='world-size';for(const [value,text]of [['auto','Авто'],['small','Малый'],['medium','Средний'],['large','Большой']])size.add(new Option(text,value));sizeLabel.append(size);
    const note=document.createElement('p');note.textContent='Три возможные истории: тревожный туман, пропавшие путники или повреждённая печать. Зерно определяет историю и облик мест.';
    const skipLabel=document.createElement('label'),skip=document.createElement('input');skip.type='checkbox';skip.id='skip-tutorial';
    const canSkip=tutorialCompleted||!!window.Tutorial?.canSkip?.()||worlds.some(w=>w.snapshot?.tutorial?.completed);skip.disabled=!canSkip;
    skipLabel.className='tutorial-skip';skipLabel.append(skip,document.createTextNode(canSkip?'Пропустить уже пройденное обучение':'Первое обучение обязательно; затем его можно пропускать'));
    form.append(label,sizeLabel,skipLabel);const launch=button('Создать мир',async()=>{launch.disabled=true;try{await create(h,worlds,false,{seed:seed.value.trim(),size:size.value,skipTutorial:skip.checked});}finally{launch.disabled=false;}},'gold');body.append(note,form,launch);if(!$('modal').open)$('modal').showModal();
  }
  async function create(h, worlds, leaveGold = false, options = {}) {
    const latest = worlds[0];
    if (latest?.status === "completed" && latest.snapshot.gold > 0 && !leaveGold) {
      const body = $("modal-body");
      body.replaceChildren();
      const p = document.createElement("p");
      p.textContent = "В новый мир перейдут надетая экипировка и предметы в руках. Золото и содержимое рюкзака останутся в архиве завершённого мира.";
      body.append(p, button("Начать без переноса золота", () => create(h, worlds, true, options), "gold"), button("Остаться пока здесь", () => paintChoice(h, worlds)));
      return;
    }
    try {
      const { world } = await api("", "POST", { heroId: h.id, leaveGold, ...options });
      attach(world);
      $("modal").close();
    } catch (e) {
      message(e.message);
    }
  }
  async function finish() {
    if (practice) return;
    if (!current || current.status !== "active" || g().busy || g().state.combat) return;
    capture();
    if (!await flush()) return;
    try {
      const { world } = await api("/" + current.id + "/finish", "POST", { revision: current.revision });
      current = world;
      pending = null;
      badge("Архив · мир завершён");
      g().render();
      message("История завершена. Мир сохранён в архиве, герой свободен для следующего приключения. Откройте «Мои герои» → «Миры».");
    } catch (e) {
      message(e.message);
    }
  }
  async function reload() {
    if (!current) return;
    try {
      const { world } = await api("/" + current.id);
      attach(world);
      $("modal").close();
    } catch (e) {
      message(e.message);
    }
  }
  function open() {
    if(practice){
      const body=$("modal-body");$("modal-title").textContent="Учебная практика";body.replaceChildren();
      const p=document.createElement('p');p.textContent='Вещи, здоровье и опыт основного приключения сохраняются отдельно.';
      body.append(p,button('Вернуться в приключение',async()=>{await endPractice();$('modal').close();}));$('modal').showModal();return;
    }
    if (!current) return window.Heroes.open();
    const body = $("modal-body");
    $("modal-title").textContent = current.snapshot.world.title;
    body.replaceChildren();
    const p = document.createElement("p");
    p.textContent = "Мир " + current.snapshot.world.chapter + " · " + (current.status === "completed" ? "завершён" : g().state.procedural ? "исследование" : g().state.episode?.stage === "done" ? "история завершена" : "история продолжается") + " · посещено " + g().state.world.discovered.length + " локаций";
    body.append(p, button("Хроника", () => {
      $("modal").close();
      g().journal();
    }));
    if (current.status === "active") {
      body.append(button("Сохранить сейчас", async () => {
        capture();
        await flush();
      }), button("Загрузить сохранение", reload));
      const b = button("Завершить мир", () => {
        $("modal").close();
        finish();
      }, "gold");
      b.disabled = !g().state.procedural && !g().state.world?.gen && g().state.episode?.stage !== "done" || g().state.world?.gen?.v===3&&!g().state.story?.reported || g().state.combat || g().busy;
      body.append(b);
    }
    if(g().state.world?.gen){const seed=document.createElement('p');seed.className='world-seed';seed.textContent='Зерно: '+g().state.world.gen.seed+' · Размер: '+g().state.world.gen.size;body.append(seed,button('Скопировать зерно',async()=>{try{await navigator.clipboard.writeText(g().state.world.gen.seed);}catch{g().tell('Зерно: '+g().state.world.gen.seed);}}));}
    if (failed || conflict) {
      const p2 = document.createElement("p");
      p2.className = "creation-warning";
      p2.textContent = conflict ? "Другая вкладка изменила мир. Загрузите сохранение, чтобы продолжить." : "Изменения ещё не дошли до сервера. Повторите сохранение перед выходом.";
      body.append(p2);
    }
    $("modal").showModal();
  }
  async function workshop() {
    if (!await prepareLeave()) return;
    atMenu = false;
    document.body.classList.toggle("at-main-menu", false);
    const a = structuredClone(g().active());
    detach();
    g().loadHero(a);
    window.CinematicMenu?.play();
    viewsDebug.switchTab("test");
  }
  function render() {
    document.body.classList.toggle("playing-world", !!current || !!practice);
    document.body.classList.toggle("world-locked", !practice && !!current && (current.status !== "active" || conflict));
    if(practice){if($("scene-name"))$("scene-name").textContent=g().scene.name+' · Учебная практика';if($("world-save"))$("world-save").hidden=true;return;}
    if (!current) return;
    const s = g().state;
    if (s.world && !s.world.discovered.includes(s.scene)) s.world.discovered.push(s.scene);
    if ($("scene-name")) $("scene-name").textContent = (s.procedural || s.world?.gen ? g().scene.name : s.scene === "hub" ? "Часовня" : "Крипта") + " · Мир " + s.world.chapter;
    const b = $("world-save");
    if (b) b.hidden = false;
  }
  function init() {
    const b = button("Мир сохранён", open);
    b.id = "world-save";
    b.hidden = true;
    b.className = "world-save";
    $("scene-name").after(b);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        capture();
        flush();
      }
    });
    window.addEventListener?.("pagehide", () => {
      capture();
      flush();
    });
  }
  async function resume(){
    if(current){atMenu=false;document.body.classList.remove('at-main-menu');window.CinematicMenu?.play();window.viewsDebug.switchTab('map');return;}
    const id=localStorage.getItem(resumeKey);if(!id)throw Error('Сначала создайте героя и мир.');
    const {world}=await api('/'+encodeURIComponent(id));attach(world);
  }
  async function startPractice(){
    if(practice)return true;
    if(g().moving||g().actionBusy||g().state.combat||window.HUD?.pending)throw Error('Дождитесь завершения действия или боя.');
    const hero=structuredClone(g().active());
    if(!hero.confirmed)throw Error('Создайте героя, чтобы пройти обучение с его классом и внешностью.');
    if(current?.status==='active'){capture();if(!await flush())throw Error('Сначала сохраните текущее приключение.');}
    if(practice)return true;
    if(g().moving||g().actionBusy||g().state.combat||window.HUD?.pending)throw Error('Дождитесь завершения действия или боя.');
    if(!window.LocalAPI?.initialWorld)throw Error('Обучение пока недоступно. Обновите игру.');
    const snapshot=window.LocalAPI.initialWorld(hero,'practice-'+window.LocalAPI.randomUUID(),1,{seed:'practice-'+hero.id,size:'small',generatorVersion:3,tutorialCompleted:false});
    snapshot.story.intro=3;snapshot.story.npcWarned=true;snapshot.story.npcDeparted=true;
    if(window.TutorialRules?.createTutorial)snapshot.tutorial=window.TutorialRules.createTutorial({classId:hero.classId,mode:'practice'});
    else snapshot.tutorial.mode='practice';
    const a=snapshot.party[0];a.hp=a.max;a.dead=false;a.slots=a.maxSlots;a.secondWind=a.maxSecondWind;
    practice={state:structuredClone(g().state),current,pending,lastSaved,failed,conflict,atMenu};
    clearTimeout(timer);atMenu=false;leaving=true;
    try{document.querySelectorAll('dialog[open]').forEach(d=>d.close());window.CinematicMenu?.play();document.body.classList.remove('at-main-menu');g().loadWorld(snapshot);window.viewsDebug.switchTab('map');}
    catch(e){const original=practice;practice=null;current=original.current;atMenu=original.atMenu;g().loadWorld(original.state);throw e;}
    finally{leaving=false;}
    render();return true;
  }
  async function endPractice(){
    if(!practice)return true;
    if(g().moving||g().actionBusy||window.HUD?.pending)throw Error('Дождитесь завершения действия.');
    const original=practice;practice=null;leaving=true;
    current=original.current;pending=original.pending;lastSaved=original.lastSaved;failed=original.failed;conflict=original.conflict;atMenu=original.atMenu;
    try{if(current)window.GeneratedWorlds?.prime(current);g().loadWorld(original.state);document.body.classList.toggle('at-main-menu',atMenu);if(atMenu)window.CinematicMenu?.open();else window.CinematicMenu?.play();window.viewsDebug.switchTab('map');}
    finally{leaving=false;}
    badge(current?'Мир сохранён':'');render();return true;
  }
  window.Worlds = { resume, resumeKey, startPractice, endPractice, begin: h=>newWorld(h,[]), init, choose, enterTest, workshop, open, capture, flush, detach, attach, reload, finish, render, prepareLeave, exitToMenu, get practice(){return !!practice;}, get atMenu() {
    return atMenu;
  }, get current() {
    return current;
  }, get locked() {
    return atMenu || !practice && !!current && (current.status !== "active" || conflict);
  }, get pending() {
    return pending;
  }, get saving() {
    return !!inflight;
  } };
})();
