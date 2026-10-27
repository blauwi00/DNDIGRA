// ---------- settings: sound, graphics, play and saved data ----------
// Every option really changes the game and is kept in the browser (helga-settings).
const SET_KEY='helga-settings',SET_DEF={quality:'mid',shadows:true,weather:true,fps:60,text:'normal',fold:true,cam:'normal'};
const SET=Object.assign({},SET_DEF,(()=>{try{return JSON.parse(localStorage.getItem(SET_KEY))||{}}catch(e){return {}}})());
const TEXT_MS={slow:40,normal:22,fast:9,instant:0},CAM_K={near:1.23,normal:1.5,far:1.83};
function saveSettings(){try{localStorage.setItem(SET_KEY,JSON.stringify(SET))}catch(e){}}
function applySettings(){
  renderer.setPixelRatio(SET.quality==='low'?1:SET.quality==='mid'?Math.min(devicePixelRatio,1.5):Math.min(devicePixelRatio,2));
  if(renderer.shadowMap.enabled!==SET.shadows){renderer.shadowMap.enabled=SET.shadows;scene.traverse(o=>{if(o.material)[].concat(o.material).forEach(m=>m.needsUpdate=true);});}
  if(!SET.weather){WX.target=0;}
  QF.fold=SET.fold;try{localStorage.setItem('helga-qfold',SET.fold?'1':'0')}catch(e){}
  window.TEXT_DELAY=TEXT_MS[SET.text]??22;window.CAM_SCALE=CAM_K[SET.cam]||1;}
applySettings();
const setEl=document.getElementById('settings');let setTab='sound';
function openSettings(){setEl.hidden=false;renderSettings();}
document.getElementById('stClose').onclick=()=>{sfx('click');setEl.hidden=true;};
document.getElementById('stTabs').onclick=e=>{const b=e.target.closest('button');if(!b)return;setTab=b.dataset.t;sfx('click');renderSettings();};
function renderSettings(){for(const b of document.querySelectorAll('#stTabs button'))b.classList.toggle('on',b.dataset.t===setTab);
  const body=document.getElementById('stBody');body.replaceChildren();
  const row=(label,hint,ctl)=>{const r=document.createElement('div');r.className='st-row';const t=document.createElement('div');t.className='st-lab';const b=document.createElement('b');b.textContent=label;t.append(b);
    if(hint){const s=document.createElement('small');s.textContent=hint;t.append(s);}r.append(t,ctl);body.append(r);};
  const seg=(opts,cur,fn)=>{const g=document.createElement('div');g.className='st-seg';for(const [v,l] of opts){const b=document.createElement('button');b.textContent=l;b.className=v===cur?'on':'';b.onclick=()=>{fn(v);sfx('click');saveSettings();applySettings();renderSettings();};g.append(b);}return g;};
  const tog=(cur,fn)=>seg([[true,'Вкл'],[false,'Выкл']],cur,fn);
  if(setTab==='sound'){
    row('Звук','Все звуки игры',tog(!window.snd.muted(),v=>window.snd.setMuted(!v)));
    const r=document.createElement('input');r.type='range';r.min=0;r.max=1;r.step=.05;r.value=window.snd.vol();r.className='st-range';r.oninput=()=>window.snd.setVol(+r.value);r.onchange=()=>sfx('click');
    row('Громкость','Шаги, море, удары и голоса',r);}
  if(setTab==='gfx'){
    row('Качество','Чёткость картинки. «Экономное» бережёт батарею',seg([['low','Экономное'],['mid','Обычное'],['high','Высокое']],SET.quality,v=>SET.quality=v));
    row('Тени','Тени от героев, деревьев и домов',tog(SET.shadows,v=>SET.shadows=v));
    row('Погода','Дождь и туман на острове',tog(SET.weather,v=>SET.weather=v));
    row('Частота кадров','30 кадров меньше греет телефон',seg([[30,'30'],[60,'60']],SET.fps,v=>SET.fps=v));}
  if(setTab==='game'){
    row('Скорость текста','Как быстро печатаются реплики',seg([['slow','Медленно'],['normal','Обычно'],['fast','Быстро'],['instant','Сразу']],SET.text,v=>SET.text=v));
    row('Камера','Насколько далеко камера от героя',seg([['near','Ближе'],['normal','Обычно'],['far','Дальше']],SET.cam,v=>SET.cam=v));
    row('Плашка задания','Сворачивать в одну строку через несколько секунд',tog(SET.fold,v=>SET.fold=v));}
  if(setTab==='data'){
    const b1=document.createElement('button');b1.className='st-act';b1.textContent='Сбросить настройки';b1.onclick=()=>{Object.assign(SET,SET_DEF);saveSettings();applySettings();sfx('click');renderSettings();toast('Настройки сброшены');};
    row('Настройки','Вернуть всё как было по умолчанию',b1);
    const b2=document.createElement('button');b2.className='st-act danger';b2.textContent='Стереть прогресс';b2.onclick=()=>confirmBox('Стереть прогресс острова?','Герой, задания, сундуки и карта будут удалены. Это нельзя отменить.','Стереть',()=>{try{localStorage.removeItem(SAVE);localStorage.removeItem('helga-hero');}catch(e){}location.reload();});
    row('Прогресс','Герой, задания, сундуки и открытая карта',b2);
    const v=document.createElement('span');v.className='st-ver';v.textContent='Остров Хельги · бета';row('Версия',null,v);}}
