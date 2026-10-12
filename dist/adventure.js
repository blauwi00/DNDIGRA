(() => {
  'use strict';
  const game=()=>window.gameDebug;
  const plan=()=>window.GeneratedWorlds?.plan?.story;
  const enabled=()=>game()?.state.world?.gen?.v===3&&!!plan();
  let panel=null,battle=null,frameKey='',departing=false,arriving=false,arrivalKey='',rescueFrame=0,rescueOpen=false,pendingEncounter=null,starting=false,combatExpanded=false,combatKey='';
  const emit=(type,detail={})=>window.dispatchEvent(new CustomEvent('game-action',{detail:{type,...detail}}));
  const story=()=>game()?.state.story;
  function init(){
    if(panel)return;
    const shell=document.querySelector('.map-shell');if(!shell)return;
    panel=document.createElement('section');panel.id='adventure-cinematic';panel.hidden=true;panel.setAttribute('aria-label','История путешествия');panel.setAttribute('aria-live','polite');
    battle=document.createElement('section');battle.id='adventure-combat';battle.hidden=true;battle.setAttribute('aria-label','Действия в бою');
    shell.append(panel);(document.getElementById('viewport')||shell).append(battle);
  }
  function button(label,fn,disabled=false){const b=document.createElement('button');b.type='button';b.textContent=label;b.disabled=disabled;b.onclick=fn;return b;}
  function card(title,text,actions,actor=game().active()){
    init();if(!panel)return;
    panel.replaceChildren();
    const head=document.createElement('div');head.className='adventure-speaker';const portrait=document.createElement('div');portrait.className='adventure-portrait';portrait.append(Artwork.hero(actor));
    const copy=document.createElement('div'),name=document.createElement('strong'),h=document.createElement('h2');name.textContent=actor.name||game().active().name;h.textContent=title;copy.append(name,h);head.append(portrait,copy);
    const p=document.createElement('p');p.className='adventure-copy';p.textContent=text;
    const choices=document.createElement('div');choices.className='adventure-choices';choices.append(...actions);
    panel.append(head,p,choices);panel.hidden=false;document.body.classList.add('adventure-cinematic-open');
  }
  function hideCard(){if(panel)panel.hidden=true;document.body.classList.remove('adventure-cinematic-open');frameKey='';}
  function focus(point,zoom){if(point)window.camera?.center(point);if(zoom)window.camera?.zoom(zoom);}
  function frames(){const p=plan(),a=game().active();return [
    {title:p.title,text:p.arrival+' '+(a.background||''),point:a,zoom:1.45},
    {title:'Что-то нарушило покой',text:p.problem,point:{x:a.x+2,y:a.y},zoom:1.05},
    {title:'Твой путь начинается здесь',text:p.objective,point:a,zoom:1.2}
  ];}
  function nextIntro(){if(!enabled()||story().intro>=3)return;story().intro++;game().save();frameKey='';render();}
  function actorFor(p){return p?.npc?{name:p.name,kind:5,gen:p.npc}:game().active();}
  function visibleProp(p,state=game()?.state){
    if(state?.world?.gen?.v!==3||!state.story)return true;
    if(p.storyRole==='messenger')return state.story.intro>=3&&!state.story.npcDeparted;
    if(p.storyRole==='healer')return state.tutorial?.phase==='rescue'||state.tutorial?.completed;
    return true;
  }
  async function departMessenger(p){
    if(departing||story()?.npcDeparted)return;
    departing=true;hideCard();window.closeDialogue?.();
    try{
      // npcWarned is persisted before the animation. Reload repeats only the
      // departure, never the warning or reward. Absence is saved afterwards.
      if(await game().departNpc(p)){story().npcDeparted=true;focus(game().active(),1.2);game().tell((p.name||'Путник').split(' · ')[0]+' спешит предупредить поселение.');game().save();emit('interaction',{success:true,propId:p.id,propType:'npc',storyRole:'messenger'});}
    }finally{departing=false;game().render();window.Tutorial?.render();}
  }
  function warning(p){
    if(!p)return;
    card('Испуганный путник',plan().warning,[button('Я найду дорогу. Беги в поселение.',()=>{story().npcWarned=true;game().tell(plan().warning);game().save();departMessenger(p);})],actorFor(p));
    focus(p,1.3);
  }
  function restore(state=game()?.state){
    pendingEncounter=null;starting=false;departing=false;arriving=false;arrivalKey='';frameKey='';rescueOpen=false;rescueFrame=0;combatExpanded=false;combatKey='';
    if(!enabled()){hideCard();if(battle)battle.hidden=true;return;}
    state.story||={v:1,intro:0,npcWarned:false,npcDeparted:false,clues:[],cleared:[],reachedSettlement:false,reported:false};
    render();
    if(state.combat&&state.encounter)queueMicrotask(()=>game().resumeEncounter?.());
  }
  function journal(){
    if(!enabled())return false;
    const s=story(),p=plan(),d=document.getElementById('modal'),body=document.getElementById('modal-body');
    document.getElementById('modal-title').textContent=p.title;body.replaceChildren();
    const goal=document.createElement('p');goal.textContent=s.reported?'Путешествие завершено. '+p.report:!s.npcDeparted?'Выслушай путника на опушке.':!s.clues.includes(p.clueProp)?p.objective:!s.cleared.includes('road-threat')?'Дорогу перекрыла угроза. Доберись до поселения и предупреди старосту.':!s.reachedSettlement?'Сведения собраны. Доберись до поселения.':'Поговори со старостой и передай найденные сведения.';body.append(goal);
    if(s.clues.includes(p.clueProp)){const clue=document.createElement('p');clue.className='adventure-clue';clue.textContent='Найдено: '+p.clue;body.append(clue);}
    const recent=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Последние события';recent.append(summary);for(const line of game().state.logs.slice(-12)){const copy=document.createElement('p');copy.textContent=line;recent.append(copy);}body.append(recent);d.showModal();emit('journal',{success:true});return true;
  }
  function interact(p){
    if(!enabled())return false;
    const s=story(),info=plan();
    if(p.storyRole==='messenger'){warning(p);return true;}
    if(p.id===info.clueProp){
      window.openGeneratedDialogue(p,s.clues.includes(p.id)?info.clue:'Следы связаны с бедой, о которой рассказал путник.',[
        ...(s.clues.includes(p.id)?[]:[{label:'Изучить находку · Расследование СЛ 10',fn:async()=>{
          const g=game(),check=DND.skill(g.active(),'investigation',10,g.state.level,g.state.advantage||0);g.report(check.text);await window.HUD?.check(check,'Изучить находку');
          if(!s.clues.includes(p.id)){s.clues.push(p.id);g.tell((check.success?'Ты сразу замечаешь важную деталь. ':'Осмотр занимает время, но находка становится понятна. ')+info.clue);g.save();emit('loot',{success:true,propId:p.id,scene:g.state.scene,clue:true});}
          window.openGeneratedDialogue(p,info.clue,[{label:'Записать и продолжить путь',fn:()=>{window.closeDialogue();g.render();}}]);
        }}]),{label:'Вернуться к дороге',fn:window.closeDialogue}
      ]);return true;
    }
    if(p.storyRole==='elder'){
      const ready=s.clues.includes(info.clueProp)&&s.cleared.includes('road-threat')&&s.reachedSettlement;
      window.openGeneratedDialogue(p,s.reported?info.report:ready?'Ты принёс сведения о беде? Расскажи, что произошло на дороге.':'Прежде чем действовать, нам нужны сведения с дороги. Найди след и устрани угрозу проходу.',[
        ...(ready&&!s.reported?[{label:'Передать найденные сведения',fn:()=>{s.reported=true;game().tell(info.report);game().save();window.openGeneratedDialogue(p,info.report,[{label:'Завершить разговор',fn:()=>{window.closeDialogue();game().render();}}]);emit('interaction',{success:true,propId:p.id,propType:'npc',storyRole:'elder',reported:true});}}]:[]),
        {label:'Закончить разговор',fn:window.closeDialogue}
      ]);return true;
    }
    if(p.storyRole==='healer'){window.openGeneratedDialogue(p,'Береги себя в пути. В поселении тебя ждут.',[{label:'Поблагодарить',fn:window.closeDialogue}]);return true;}
    return false;
  }
  async function startEncounter(spec,options={}){
    if(!enabled()||starting||game().state.combat||game().busy||!spec)return false;
    if(!options.tutorial&&story().cleared.includes(spec.id))return false;
    starting=true;hideCard();window.closeDialogue?.();
    try{return await game().beginEncounter(spec,options);}finally{starting=false;render();}
  }
  function step(scene,x,y){
    if(!enabled()||game().state.combat||window.Tutorial?.active||story().intro<3||!story().npcDeparted)return;
    const found=(scene.encounters||[]).find(e=>!story().cleared.includes(e.id)&&Math.abs(e.x-x)+Math.abs(e.y-y)<=(e.radius??2));
    if(found){pendingEncounter=found;return true;}
    return false;
  }
  function enterScene(){
    if(!enabled())return;
    if(game().state.scene==='settlement'&&!story().reachedSettlement){story().reachedSettlement=true;game().tell('Ты добрался до поселения. Найди старосту.');game().save();}
    step(game().scene,game().active().x,game().active().y);
    render();
  }
  function victory(encounter=game()?.state.encounter){
    if(!enabled()||!encounter)return false;
    const s=story(),g=game();
    if(!encounter.tutorial&&!s.cleared.includes(encounter.id)){
      // The scene descriptor, not a UI-supplied amount, owns the reward.
      const canonical=(g.scene.encounters||[]).find(e=>e.id===encounter.id);
      if(!canonical)return false;
      s.cleared.push(encounter.id);g.state.xp+=canonical.reward?.xp||0;g.state.gold+=canonical.reward?.gold||0;
      g.state.encounter=null;g.state.enemies=[];g.state.order=[];g.state.cursor=0;
      g.tell(canonical.name+' — путь свободен. +'+(canonical.reward?.xp||0)+' опыта · +'+(canonical.reward?.gold||0)+' монет.');
      window.HUD?.reward?.(canonical.reward?.gold||0,canonical.reward?.xp||0);
    }else if(encounter.tutorial){g.state.encounter=null;g.state.enemies=[];g.state.order=[];g.state.cursor=0;g.tell('Учебный бой завершён. Ты освоил настоящие действия и броски.');}
    g.state.encounter=null;g.state.enemies=[];g.state.order=[];g.state.cursor=0;g.save();return true;
  }
  function defeatRescue(){
    const g=game();if(!enabled()||!g.state.encounter?.tutorial||!g.state.encounter.scriptedLoss)return false;
    const id=g.state.encounter.id,a=g.active();
    if(a.hp===0&&!g.state.combat&&g.state.tutorial?.phase==='rescue')return true;
    if(a.hp>0)DND.damage(a,a.hp);
    a.hp=0;a.dead=false;a.conditions=[...new Set([...a.conditions,'unconscious'])];a.death={success:0,failure:0,stable:true};
    g.state.combat=false;g.state.enemies=[];g.state.order=[];g.state.cursor=0;
    g.tell('Нападение застало тебя врасплох. Ты теряешь сознание; это ещё не смерть.');g.save();emit('unconscious',{success:true,encounterId:id});g.render();return true;
  }
  function rescue(){
    const g=game();if(!enabled()||g.state.tutorial?.phase!=='rescue'||g.state.tutorial?.completed)return false;
    rescueOpen=true;renderRescue();return true;
  }
  function renderRescue(){
    const g=game(),info=plan(),healer=g.props.find(p=>p.storyRole==='healer');
    const a=healer?actorFor(healer):{kind:5,name:info.healer.full,gen:{classId:'cleric',gender:info.healer.gender,look:{cloth:'#843f37',hair:'#c7c4bf'},hands:['empty','empty']}};
    card(rescueFrame?'Снова в пути':'Чужие шаги рядом',rescueFrame?info.rescue:'Сквозь забытьё ты слышишь спокойный голос. Рядом остановился целитель.',[button(rescueFrame?'Прийти в себя и продолжить':'Далее',()=>{
      if(!rescueFrame){rescueFrame=1;renderRescue();return;}
      const id=g.state.encounter?.id||'tutorial-loss',hero=g.active();hero.dead=false;g.heal(hero,hero.max);hero.conditions=hero.conditions.filter(c=>c!=='unconscious');hero.slots=hero.maxSlots;hero.secondWind=hero.maxSecondWind;hero.acted=hero.bonusUsed=hero.reactionUsed=false;hero.move=hero.speed;
      g.state.encounter=null;rescueOpen=false;rescueFrame=0;hideCard();g.tell(info.rescue);g.save();emit('rescue',{success:true,encounterId:id});g.render();
    })],a);
    focus(healer||g.active(),1.4);
  }
  function classAction(a){return({fighter:['secondWind','Второе дыхание'],wizard:['magearmor','Доспехи мага'],cleric:['cure','Лечение ран'],rogue:['dash','Рывок']})[a.classId]||['dash','Рывок'];}
  function renderCombat(){
    if(!battle)return;const g=game(),s=g.state,a=g.active();
    battle.hidden=!enabled()||!s.combat||document.getElementById('map-view')?.hidden;
    if(battle.hidden){combatExpanded=false;combatKey='';return;}
    const key=[s.world.id,s.scene,s.encounter?.id].join(':');if(combatKey!==key){combatKey=key;combatExpanded=false;}
    battle.replaceChildren();const h=document.createElement('strong');h.textContent=a.name+' · ход '+s.round;const note=document.createElement('p');note.textContent=(a.acted?'Действие потрачено':'Действие доступно')+' · '+a.move+' клеток';note.hidden=!combatExpanded;
    const toggle=button(combatExpanded?'Свернуть действия':'Выбрать действие',()=>{combatExpanded=!combatExpanded;renderCombat();});toggle.className='adventure-combat-toggle';toggle.setAttribute('aria-expanded',String(combatExpanded));toggle.setAttribute('aria-controls','adventure-battle-actions');
    const actions=document.createElement('div');actions.id='adventure-battle-actions';actions.className='adventure-battle-actions';actions.hidden=!combatExpanded;const locked=g.busy||!!window.HUD?.active||window.Worlds?.locked;
    const choose=fn=>()=>{combatExpanded=false;const result=fn();renderCombat();return result;};
    for(const enemy of s.enemies.filter(e=>e.hp>0&&!e.dead))actions.append(button('Атаковать: '+enemy.name,choose(()=>g.attack(enemy)),locked||!g.canAttack(a,enemy)||window.Tutorial?.allowsAction?.('attack')===false));
    actions.append(button('Уклониться',choose(()=>g.special('dodge')),locked||a.acted),button('Отойти',choose(()=>g.special('disengage')),locked||a.acted));
    const [id,label]=classAction(a),needsSlot=['magearmor','cure'].includes(id);
    const abilityDisabled=locked||(id==='secondWind'?a.bonusUsed||!a.secondWind:a.acted||needsSlot&&(!a.slots||!a.hands.includes('empty')));
    actions.append(button(label,choose(()=>{if(id==='cure')g.select(a);return g.special(id);}),abilityDisabled));
    actions.append(button('Выпить зелье',choose(()=>g.potion()),locked||a.hp>=a.max||!s.potions||a.bonusUsed),button('Завершить ход',choose(()=>g.endTurn()),locked));battle.append(h,toggle,note,actions);
  }
  function render(){
    init();if(!enabled()||window.Worlds?.atMenu||window.CinematicMenu?.active){hideCard();if(battle)battle.hidden=true;return;}
    const g=game(),s=story();if(!s)return;
    if(s.intro<3){
      const frame=frames()[s.intro],key='intro:'+s.intro;if(frameKey!==key){frameKey=key;card(frame.title,frame.text,[button(s.intro===2?'Начать путь':'Далее',nextIntro)]);focus(frame.point,frame.zoom);}
    }else if(rescueOpen){renderRescue();}
    else if(!s.npcDeparted&&!g.state.combat){
      const messenger=g.props.find(p=>p.storyRole==='messenger');
      if(messenger&&s.npcWarned&&!departing&&!g.busy)departMessenger(messenger);
      else if(messenger&&!s.npcWarned&&!arriving){
        const key=g.state.world.id+':'+g.state.scene;if(arrivalKey!==key){arrivalKey=key;arriving=true;hideCard();Promise.resolve(g.arriveNpc?.(messenger)).finally(()=>{arriving=false;if(enabled()&&!story().npcWarned)warning(messenger);});}
        else if(!departing&&panel?.hidden)warning(messenger);
      }
    }else if(!rescueOpen)hideCard();
    renderCombat();
    if(pendingEncounter&&!starting&&!g.busy&&!window.HUD?.active&&!window.Tutorial?.active){const spec=pendingEncounter;pendingEncounter=null;queueMicrotask(()=>startEncounter(spec));}
  }
  function preparePractice(state){if(state.story)Object.assign(state.story,{intro:3,npcWarned:true,npcDeparted:true});return state;}
  window.Adventure={restore,render,interact,step,enterScene,visibleProp,journal,nextIntro,startEncounter,victory,defeatRescue,rescue,preparePractice,get introLength(){return 3},get introActive(){return enabled()&&story()?.intro<3},get active(){return enabled()},get blocksPortals(){return enabled()&&(story()?.intro<3||!story()?.npcDeparted||rescueOpen||window.Tutorial?.blocksPortals)},get locked(){return enabled()&&(story()?.intro<3||!story()?.npcDeparted||rescueOpen)},get trainingLoss(){return !!game()?.state.encounter?.tutorial&&!!game()?.state.encounter?.scriptedLoss}};
})();
