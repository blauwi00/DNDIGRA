(() => {
  'use strict';
  let panel,rolling=false,leaving=false;
  const game=()=>window.gameDebug;
  function init(){
    if(panel)return;
    panel=document.createElement('dialog');panel.id='death-screen';panel.setAttribute('aria-labelledby','death-title');
    panel.innerHTML='<div class="death-portrait"></div><p class="death-name"></p><h2 id="death-title"></h2><p class="death-status"></p><p class="death-cause"></p><details class="death-history"><summary>Хроника последних событий</summary><div></div></details><div class="death-actions"></div><p class="death-error" role="status"></p>';
    panel.addEventListener('cancel',e=>e.preventDefault());document.body.append(panel);
  }
  function close(){if(panel?.open)panel.close();}
  function button(label,fn){const b=document.createElement('button');b.type='button';b.textContent=label;b.onclick=fn;return b;}
  async function deathSave(){
    const g=game(),a=g.active();if(rolling||a.dead||a.hp>0||a.death.stable)return;
    rolling=true;close();
    try{
      const r=DND.death(a);if(!r)return;
      if(a.hp>0)a.conditions=a.conditions.filter(c=>c!=='unconscious');
      g.tell(r.text);g.save();
      await window.HUD?.check({...r,sides:20,total:r.natural,expression:'d20',outcome:a.dead?'Герой погиб':a.hp?'Вы пришли в сознание':a.death.stable?'Состояние стабильно':'Успехи '+a.death.success+'/3 · провалы '+a.death.failure+'/3'},'Спасбросок от смерти');
    }finally{rolling=false;g.render();}
  }
  async function exit(){
    if(leaving)return;leaving=true;
    const error=panel.querySelector('.death-error');error.textContent='Сохраняем мир…';
    try{await Worlds.exitToMenu();if(Worlds.atMenu)close();else error.textContent='Не удалось сохранить мир. Попробуйте ещё раз.';}
    catch{error.textContent='Не удалось сохранить мир. Попробуйте ещё раз.';}
    finally{leaving=false;}
  }
  function render(){
    const g=game();if(!g)return;const a=g.active(),alive=g.state.party.filter(p=>p.hp>0&&!p.dead);
    if(a.hp>0&&!a.dead||window.Worlds?.atMenu||window.CinematicMenu?.active||g.state.combat&&alive.length){close();return;}
    if(rolling||leaving||g.moving||g.busy&&!window.Worlds?.locked||window.HUD?.active)return;
    init();window.closeDialogue?.();
    const portrait=panel.querySelector('.death-portrait');portrait.replaceChildren(window.Artwork.hero(a));
    panel.querySelector('.death-name').textContent=a.name;
    panel.querySelector('#death-title').textContent=a.dead?'Вы погибли':'Без сознания';
    panel.querySelector('.death-status').textContent=a.dead?'Путь героя оборвался.':a.death?.stable?'0 HP · состояние стабильно. Герою нужна помощь.':'0 HP · исход ещё не решён.';
    const logs=g.state.logs.slice(-6);
    panel.querySelector('.death-cause').textContent=[...logs].reverse().find(t=>/урон|спасбросок|погиб/i.test(t))||'Герой больше не может действовать.';
    const history=panel.querySelector('.death-history div');history.replaceChildren(...logs.map(t=>{const p=document.createElement('p');p.textContent=t;return p;}));
    const actions=panel.querySelector('.death-actions');actions.replaceChildren();
    if(!a.dead&&!a.death?.stable)actions.append(button('Спасбросок от смерти',deathSave));
    if(alive.length)actions.append(button('Продолжить отрядом',()=>{g.state.active=alive[0].id;g.save();close();g.render();}));
    actions.append(button('В главное меню',exit));
    panel.querySelector('.death-error').textContent='';
    if(!panel.open)panel.showModal();
  }
  window.DeathScreen={render,close};
})();
