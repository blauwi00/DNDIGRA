/* A short authored episode using the existing map, characters and D&D combat. */
(() => {
  'use strict';
  const game=()=>window.gameDebug, rules=()=>window.PrologueRules;
  const key=()=> (window.NativeRuntime?.offline?'local-':'')+'dndigra.prologue.v1';
  let panel,hint,cardKey='',saveError='',starting=false;
  const active=()=>!!game()?.state.prologue;
  const state=()=>game().state.prologue;
  const locked=()=>active()&&(['ride','crash'].includes(state().phase)||state().phase==='ambush'&&!game().state.combat||!state().introSeen);
  function button(text,fn){const b=document.createElement('button');b.type='button';b.textContent=text;b.onclick=async()=>{b.disabled=true;try{await fn();}catch(e){game()?.tell(e.message);error(e.message);}finally{b.disabled=false;}};return b;}
  function error(message){const d=document.getElementById('modal');document.getElementById('modal-title').textContent='Начало пути';document.getElementById('modal-body').replaceChildren(Object.assign(document.createElement('p'),{textContent:message}));if(!d.open)d.showModal();}
  function read(){
    try{const s=JSON.parse(localStorage.getItem(key()));if(rules().valid(s?.prologue)&&s.party?.length===1&&s.party[0].confirmed&&s.world?.id?.startsWith('prologue-')&&['prologue-village','prologue-road'].includes(s.scene))return s;}catch{}
    return null;
  }
  function persist(){
    if(!active())return true;
    try{localStorage.setItem(key(),JSON.stringify(game().state));saveError='';return true;}
    catch{saveError='Не удалось сохранить на устройстве. Освободи место и попробуй снова.';return false;}
  }
  function install(snapshot){
    if(!snapshot.prologue)return;
    if(!rules().valid(snapshot.prologue))throw Error('Сохранение вступления не поддерживается.');
    for(const scene of Object.values(rules().scenes(snapshot.prologue))){World.compileCollisions(scene);World.scenes[scene.id]=scene;}
  }
  function prepare(snapshot){
    for(const f of ['story','tutorial','gen','procedural','episode','encounter'])delete snapshot[f];
    delete snapshot.world.gen;snapshot.world.id='prologue-'+window.LocalAPI.randomUUID();snapshot.world.title='Начало пути';snapshot.world.discovered=['prologue-village'];
    snapshot.scene='prologue-village';snapshot.prologue=rules().initial();
    snapshot.prologue.introSeen=false;
    snapshot.gold=0;snapshot.xp=0;snapshot.potions=3;snapshot.rulesStage=3;
    snapshot.settings={...snapshot.settings,ambient:.8};
    snapshot.logs=['Первый день. Через два утра ты отправишься с торговцами: им не хватает стражников.'];
    const a=snapshot.party[0];Object.assign(a,{x:6,y:8,hp:a.max,dead:false,conditions:[],slots:a.maxSlots,secondWind:a.maxSecondWind,move:a.speed,acted:false,bonusUsed:false});
    return snapshot;
  }
  function demoHero(){const appearance=HeroRules.applyLook({},'fighter','male');return HeroRules.sheet({name:'Бор',classId:'fighter',stats:HeroRules.preset('fighter'),appearance,kit:0,background:'Ты родился и вырос в этой деревне. Орен научил тебя обращаться с оружием. Завтра торговцам понадобится ещё один сопровождающий.'},'prologue-demo-fighter');}
  function open(){
    const d=document.getElementById('modal'),body=document.getElementById('modal-body'),saved=read();
    document.getElementById('modal-title').textContent='Начало пути';
    const note=document.createElement('p');note.textContent='Два мирных дня дома, первая работа в дороге и нападение на карету. Короткое законченное приключение. Прогресс сохраняется на этом устройстве отдельно от основного мира.';
    const launch=(hero,snapshot)=>async()=>{d.close();await Worlds.startPrologue(hero,snapshot);};
    const choose=()=>{body.replaceChildren(note);if(saved)body.append(button('Продолжить · '+saved.party[0].name,launch(saved.party[0],saved)));
      const newRun=()=>{body.replaceChildren(note);if(saved){const warn=document.createElement('p');warn.textContent='Новое прохождение заменит сохранение «Начала пути». Основное приключение сохранится.';body.append(warn);}
        if(game().active().confirmed)body.append(button('Начать · '+game().active().name,launch(game().active())));
        body.append(button('Начать с готовым воином',launch(demoHero())));if(saved)body.append(button('Назад',choose));};
      if(saved)body.append(button('Новое прохождение',newRun));else newRun();};
    choose();if(!d.open)d.showModal();
  }
  function init(){
    if(panel)return;
    panel=document.createElement('section');panel.id='prologue-card';panel.hidden=true;panel.setAttribute('aria-label','Начало пути · сцена');
    hint=document.createElement('button');hint.id='prologue-goal';hint.type='button';hint.hidden=true;hint.onclick=journal;
    document.getElementById('viewport').append(panel,hint);
  }
  function hide(){if(panel)panel.hidden=true;cardKey='';}
  function card(id,title,text,choices){
    init();if(cardKey===id&&!panel.hidden)return;cardKey=id;panel.replaceChildren();
    const head=document.createElement('div');head.className='prologue-speaker';head.append(Artwork.hero(game().active()));
    const copy=document.createElement('div'),eyebrow=document.createElement('small'),h=document.createElement('h2');eyebrow.textContent=game().active().name+' · Начало пути';h.textContent=title;copy.append(eyebrow,h);head.append(copy);
    const p=document.createElement('p');p.textContent=text;const actions=document.createElement('div');actions.className='prologue-choices';actions.append(...choices);panel.append(head,p,actions);panel.hidden=false;
  }
  function change(event,message){
    const g=game(),before=state(),after=rules().advance(before,event);
    g.state.prologue=after;
    if(after.phase!==before.phase){
      const road=!['day1','day2','departure'].includes(after.phase);g.state.scene=road?'prologue-road':'prologue-village';
      if(!g.state.world.discovered.includes(g.state.scene))g.state.world.discovered.push(g.state.scene);
      if(event==='sleep'){g.heal(g.active(),g.active().max);Object.assign(g.active(),{x:6,y:8});}
      if(event==='depart')Object.assign(g.active(),{x:10,y:12});
      if(event==='victory'){const a=g.active();a.hp=0;a.dead=false;a.conditions=['unconscious'];a.death={success:0,failure:0,stable:true};}
      if(event==='wake'){const a=g.active();a.hp=Math.max(1,Math.ceil(a.max*.6));a.dead=false;a.conditions=[];a.death={success:0,failure:0,stable:false};Object.assign(a,{x:12,y:11});}
      if(event==='return'&&before.phase==='aftermath'&&after.phase==='done'){g.state.gold+=after.preparation==='cargo'?15:8;g.state.xp+=25;}
      install(g.state);g.refreshSceneView();
    }
    window.closeDialogue?.();hide();if(message)g.tell(message);g.save();g.render();
  }
  const close=()=>window.closeDialogue();
  function talk(p,text,choices=[]){window.openGeneratedDialogue(p,text,[...choices,{label:'Закончить разговор',fn:close}]);}
  const option=(label,fn)=>({label,fn});
  function interact(p){
    if(!active()||!p.prologue)return false;
    const s=state(),g=game();
    if(p.id==='prologue-oren')talk(p,s.greeted?'Я не стану удерживать тебя у порога. Только не путай смелость со спешкой.':'Лиса спрашивала о тебе. Одному из её стражников пришлось остаться дома. Ты уже умеешь держать оружие — но за воротами придётся думать своей головой.',[option('Я договорился идти с торговцами',()=>change('greet','Орен пожелал тебе осторожности в дороге.'))]);
    else if(p.id==='home-supplies')talk(p,s.supplies?'Сундук пуст. Свёрток уже приготовлен.':'На крышке лежит записка: «Хлеб завёрнут отдельно. Не забудь рубаху».',[...(!s.supplies?[option('Забрать дорожный свёрток',()=>change('supplies','Ты забрал приготовленный дома свёрток. Отнеси его Лисе.'))]:[])]);
    else if(p.id==='home-bed'){
      const allowed=s.phase==='day1'?s.greeted&&s.delivered:s.phase==='day2'&&s.prepared;
      talk(p,allowed?'Дела закончены. Через открытое окно слышно, как затихает деревня.':s.phase==='departure'?'Уже утро отъезда. Карета ждёт во дворе.':'Перед сном осталось дело: '+rules().objective(s)+'.',allowed?[option('Лечь спать до утра',()=>change('sleep',s.phase==='day1'?'Второй день. Во дворе укладывают последние ящики.':'Третье утро. Настало время выходить в дорогу.'))]:[]);
    }else if(p.id==='prologue-lisa'){
      if(s.phase==='day1')talk(p,s.delivered?'Твой свёрток уложен. Завтра проверим груз и выйдем послезавтра утром.':'Дальняя дорога начинается с мелочей. Принеси свой свёрток — я положу его под сиденье.',s.supplies&&!s.delivered?[option('Передать дорожный свёрток',()=>change('deliver','Лиса убрала твой свёрток под сиденье кареты.'))]:[]);
      else if(s.phase==='day2')talk(p,s.prepared?'Всё готово. Хорошо выспись: утром придётся идти рядом с каретой.':s.preparation?'Ты выбрал подготовку. '+rules().objective(s)+'.':'До вечера успеем сделать одно дополнительное дело. Можно лучше закрепить ящики или взять у Теи перевязочный набор. Что возьмёшь на себя?',!s.preparation?[option('Закрепить груз — меньше потерь в дороге',()=>change('cargo','Ты решил дополнительно закрепить ящики. Нужна верёвка из мастерской.')),option('Взять перевязочный набор — помочь при ранениях',()=>change('medicine','Ты решил взять перевязочный набор. Тея ждёт в доме у мастерской.'))]:[]);
      else if(s.phase==='departure')talk(p,'Дарен пойдёт впереди, ты — рядом с каретой. Мы платим за сопровождение, а не за подвиги. Если станет опасно, держись людей.',[option('Отправиться в путь',depart)]);
      else if(s.phase==='aftermath')talk(p,'Ты очнулся! Воры ушли с частью вещей. Карету вытащим, Дарен жив. '+rules().consequence(s)+(s.recovered?' Это моя дорожная сумка?':' Они прихватили сумку с расчётной книгой. Следы уходят от обочины, но я не стану просить тебя рисковать жизнью.'),s.recovered?[option('Вернуть сумку торговке',()=>change('return','Лиса получила расчётную книгу. Работа закончена; награда выдана один раз.'))]:[option('Я осмотрю обочину',()=>{g.tell('Следы сапог видны у восточного края дороги. Осмотри обочину.');close();}),option('Я помог с защитой. Искать вещи не буду',()=>change('leave','Ты отказался искать украденное. Торговцы займутся потерями сами.'))]);
      else talk(p,endingText(s));
    }else if(p.id==='rope')talk(p,s.preparation==='cargo'&&!s.prepared?'Верёвка целая. Ты можешь связать ящики дополнительной петлёй.':'В мастерской всё на своих местах.',s.phase==='day2'&&s.preparation==='cargo'&&!s.prepared?[option('Взять верёвку и закрепить груз',()=>change('prepare','Ты закрепил груз дополнительной верёвкой.'))]:[]);
    else if(p.id==='prologue-teya')talk(p,s.preparation==='medicine'&&!s.prepared?'Возьми чистые полосы ткани и настой. Сначала останови кровь, потом помоги человеку добраться до лекаря.':'Не торопись в дороге. Иногда остановиться вовремя полезнее, чем быть первым.',s.phase==='day2'&&s.preparation==='medicine'&&!s.prepared?[option('Взять перевязочный набор',()=>change('prepare','Тея дала тебе перевязочный набор.'))]:[]);
    else if(p.id==='carriage')talk(p,s.phase==='departure'?'Колёса смазаны. Лиса пересчитывает ящики и ждёт тебя.':s.phase==='aftermath'||s.phase==='done'?'Обод расколот. Переднее колесо зацепило корень, когда лошади рванули от крика. Карету занесло в канаву.':'Ты договорился выйти с торговцами на третье утро.',s.phase==='departure'?[option('Отправиться в путь',depart)]:[]);
    else if(p.id==='prologue-guard')talk(p,['aftermath','done'].includes(s.phase)?rules().consequence(s)+' Дарен благодарит тебя за то, что ты прикрыл Лису.':'Если нападут, защищай человека рядом. Не гоняйся за тем, кто уже убегает.');
    else if(p.id==='trail')talk(p,s.tracks?'Следы ведут к кустам к северу от дороги.':'В мягкой земле отпечатались сапоги. На ветке висит лоскут от дорожной сумки.',s.phase==='aftermath'?[option('Прочитать следы · Внимательность СЛ 10',async()=>{const snapshot=g.state;const check=DND.skill(g.active(),'perception',10,g.state.level);g.report(check.text);close();await HUD.check(check,'Следы на обочине');if(g.state!==snapshot)return;change('tracks',check.success?'Ты быстро находишь след к северной тропе.':'Ты тратишь время на осмотр и замечаешь продолжение следа у кустов.');camera.center({x:24,y:7});})]:[]);
    else if(p.id==='stolen-bag')talk(p,s.recovered?'Сумка уже у тебя.':s.tracks?'Воры взяли монеты и бросили расчётную книгу с тяжёлой сумкой. Рядом никого нет.':'В кустах лежит сумка. Сначала проверь следы на обочине, чтобы убедиться, что рядом нет засады.',s.phase==='aftermath'&&s.tracks&&!s.recovered?[option('Забрать сумку с расчётной книгой',()=>change('recover','Ты нашёл расчётную книгу Лисы. Верни её у кареты.'))]:[]);
    else talk(p,p.description||rules().objective(s));
    return true;
  }
  function depart(){change('depart','Третье утро. Карета покидает деревню.');}
  async function startBattle(retry=false){
    if(starting||game().actionBusy||game().state.combat)return;starting=true;
    try{
      const g=game();
      if(retry&&g.state.prologueCombat){g.state.party=structuredClone(g.state.prologueCombat.party);g.state.potions=g.state.prologueCombat.potions;g.state.encounter=null;g.state.enemies=[];g.state.order=[];g.state.cursor=0;}
      if(!g.state.prologueCombat)g.state.prologueCombat={party:structuredClone(g.state.party),potions:g.state.potions};
      hide();await g.beginEncounter(g.scene.encounters[0]);
    }finally{starting=false;game().render();}
  }
  function victory(encounter){
    if(!active()||encounter?.id!=='prologue-thief')return false;
    const g=game();g.state.encounter=null;g.state.enemies=[];g.state.order=[];g.state.cursor=0;
    change('victory','Вор отступает. Резкий крик пугает лошадей; колесо цепляет корень. Карета опрокидывается. Удар — и всё темнеет.');return true;
  }
  function endingText(s){return rules().consequence(s)+' '+(s.ending==='helped'?'Ты вернул расчётную книгу. Лиса заплатила '+(s.preparation==='cargo'?15:8)+' монет и предложила тебе работу после ремонта.':'Лиса принимает твой отказ. Поиски вещей она поручит другим; выжившие собираются переждать ночь у дороги.')+' Ты вышел из дома и узнал цену своей первой работе. На этом короткое приключение завершено.';}
  function journal(){
    if(!active())return false;
    const d=document.getElementById('modal'),body=document.getElementById('modal-body');document.getElementById('modal-title').textContent='Начало пути';
    const goal=document.createElement('p');goal.textContent=rules().objective(state());const help=document.createElement('p');help.textContent=game().state.combat?'Нажми на врага и выбери атаку. После действия нажми «Завершить ход». Зелья и способности находятся в действиях героя.':'Нажми на предмет или человека на карте и выбери «Подойти» или «Поговорить». Меню открывает рюкзак, героя и камеру.';
    body.replaceChildren(goal,help);if(saveError){const p=document.createElement('p');p.textContent=saveError;body.append(p,button('Повторить сохранение',()=>{persist();journal();}));}
    body.append(button('Показать ближайшую цель',()=>{d.close();focusGoal();}));
    const logs=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Что произошло';logs.append(summary);for(const line of game().state.logs.slice(-10)){const p=document.createElement('p');p.textContent=line;logs.append(p);}body.append(logs);if(!d.open)d.showModal();return true;
  }
  function focusGoal(){const s=state();const id=s.phase==='day1'?(!s.greeted?'prologue-oren':!s.supplies?'home-supplies':!s.delivered?'prologue-lisa':'home-bed'):s.phase==='day2'?(!s.preparation?'prologue-lisa':!s.prepared?(s.preparation==='cargo'?'rope':'prologue-teya'):'home-bed'):s.phase==='aftermath'?(s.recovered?'prologue-lisa':s.tracks?'stolen-bag':'prologue-lisa'):'carriage';const p=game().props.find(p=>p.id===id);if(p)camera.center(p);}
  function render(){
    init();const visible=active()&&!Worlds.atMenu&&!window.CinematicMenu?.active&&!document.getElementById('map-view').hidden;
    hint.hidden=!visible;if(!visible){hide();return;}
    const s=state(),g=game();hint.textContent=(saveError?'Не сохранено · ':'')+rules().objective(s);hint.setAttribute('aria-label','Задание: '+rules().objective(s));
    if(g.actionBusy||window.HUD?.active){hide();return;}
    if(!s.introSeen)card('intro','Первый день дома','Ты знаешь каждый поворот этой деревни. Через два утра карета Лисы уйдёт к рынку. Стражников не хватает, и ты согласился сопровождать торговцев. Сегодня нужно собрать вещи и поговорить с Ореном.',[button('Выйти во двор',()=>{s.introSeen=true;g.save();hide();g.render();})]);
    else if(s.phase==='ride')card('ride','Третье утро · в дороге','Деревня остаётся за спиной. Ты идёшь рядом с каретой. У поворота из кустов выходят люди: один хватает вожжи, другой идёт к Лисе с коротким мечом. Дарен прикрывает возницу.',[button('Прикрыть торговку',async()=>{change('arrive','Ты встаёшь между торговкой и вором.');await startBattle();})]);
    else if(s.phase==='ambush'&&!g.state.combat)card('battle-'+(g.active().hp>0),'Нападение на дороге',g.active().hp>0?'Вор подходит к торговке. Останови его.':'Вор оказался сильнее. Можно повторить столкновение с состоянием героя перед нападением.',[button(g.active().hp>0?'Вступить в бой':'Повторить бой',()=>startBattle(g.active().hp<=0||g.active().dead))]);
    else if(s.phase==='crash')card('crash','Грохот колёс','Вор отступает. От резкого крика лошади рвутся в сторону; колесо цепляет корень. Карета падает, доска ударяет тебя. На несколько мгновений мир исчезает.',[button('Прийти в себя',()=>change('wake','Ты приходишь в себя возле повреждённой кареты. Лиса рядом, Дарен жив.'))]);
    else if(s.phase==='done'&&!s.endingSeen)card('ending','Первая дорога',endingText(s),[button('Осмотреться у кареты',()=>{s.endingSeen=true;g.save();hide();g.render();}),button('Сохранить и выйти',()=>Worlds.exitToMenu())]);
    else hide();
  }
  function restore(){cardKey='';saveError='';if(active()&&game().state.combat)queueMicrotask(()=>game().resumeEncounter());render();}
  window.Prologue={open,prepare,install,restore,persist,read,interact,victory,render,journal,get active(){return active();},get locked(){return locked();},get saveError(){return saveError;}};
})();
