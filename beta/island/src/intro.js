// ---------- arrival, tutorial, first easy tasks, minimap ----------
// A new game opens at dawn on the pier: a short cinematic, then a guided path that
// teaches walking, the action wheel, the hands, picking things up, following the
// pointer, entering a house and one small fight. Each step has a clear goal card.
const TUT={step:-1,flags:{}};let rat=null;
const personTarget=a=>{if(!a||a.hidden)return null;if(a.z>=90){const R=ROOMS.find(R=>a.x>=R.ox&&a.x<R.ox+R.iw);return room===R?{x:a.x,z:a.z,label:a.npc}:{x:R.door[0],z:R.door[1],label:a.npc,inRoom:R};}return {x:a.x,z:a.z,label:a.npc};};
const whoT=id=>personTarget(actors.find(a=>a.talkId===id));
const stonesLook=()=>looks.find(l=>l.n==='Гладкие камни');
const TSTEPS=[
  {t:'Сойдите с причала',h:'Нажмите на доски впереди: герой пойдёт туда. Золотое кольцо — куда он идёт.',target:()=>({x:10,z:31,label:'Сюда'}),done:()=>H0.x>=9},
  {t:'Поговорите с рыбаком Олавом',h:'Нажмите на Олава — вокруг него появится колесо. Выберите «Говорить».',target:()=>whoT('fisher'),done:()=>TUT.flags.olav},
  {t:'Загляните в свои руки',h:'Ладони внизу — ваши руки и сумка. Нажмите на правую ладонь.',coach:'#palmR',done:()=>window.handsIsOpen&&window.handsIsOpen()},
  {t:'Подберите камни на берегу',h:'Нажмите на камни и выберите «Взять». Камнем можно отвлечь врага.',target:()=>{const L=stonesLook();return L&&!L.taken?{x:Math.floor(L.grp.position.x),z:Math.floor(L.grp.position.z),label:'Камни'}:null;},done:()=>{const L=stonesLook();return !L||L.taken;}},
  {t:'Дойдите до деревни Заводь',h:'Красная стрелка всегда ведёт к цели. Круглая карта в углу открывает большую.',target:()=>({x:Z.village[0],z:Z.village[1]+3,label:'Деревня'}),done:()=>Math.hypot(H0.x-Z.village[0],H0.z-Z.village[1])<7},
  {t:'Отнесите рыбу Браму',h:'Таверна — дом с вывеской. Нажмите на дом → «Войти», потом на Брама → «Говорить».',target:()=>whoT('bram'),done:()=>TUT.flags.bram},
  {t:'Прогоните крысу из амбара',h:'Бой идёт по ходам. Нажмите на крысу → «Атаковать» → оружие. Синие клетки — куда можно шагнуть. Нажмите на себя → «Конец хода».',
    target:()=>rat&&!rat.dead?personTarget(Object.assign({},rat,{npc:'Крыса'})):null,done:()=>rat&&rat.dead},
  {t:'Вернитесь к Браму',h:'Он ждёт в таверне.',target:()=>whoT('bram'),done:()=>TUT.flags.bram2}];
const tutOn=()=>TUT.step>=0&&TUT.step<TSTEPS.length;
function tutTarget(){return tutOn()?TSTEPS[TUT.step].target?.()||null:null;}
const coachEl=document.getElementById('coach');
function tutUI(){const q=document.getElementById('quest');if(!tutOn())return false;const S=TSTEPS[TUT.step];q.hidden=false;
  q.innerHTML='<div class="tut"><small>Обучение · '+(TUT.step+1)+' из '+TSTEPS.length+'</small><b></b><span></span><button id="tutSkip">Пропустить обучение</button></div>';
  q.querySelector('b').textContent=S.t;q.querySelector('span').textContent=S.h;q.querySelector('#tutSkip').onclick=e=>{e.stopPropagation();endTutorial(true);};return true;}
function tutTick(){if(!tutOn()||paused)return;const S=TSTEPS[TUT.step];
  if(S.coach){const el=document.querySelector(S.coach);const r=el&&el.getBoundingClientRect(),sr=stage.getBoundingClientRect();if(r){coachEl.hidden=false;coachEl.style.left=(r.left-sr.left+r.width/2)+'px';coachEl.style.top=(r.top-sr.top+r.height/2)+'px';}}else coachEl.hidden=true;
  if(S.done()){TUT.step++;sfx('pickup');if(TUT.step===6)spawnRat();if(!tutOn())return endTutorial(false);questUI();toast('Готово! Дальше: '+TSTEPS[TUT.step].t,3000);}}
function endTutorial(skipped){TUT.step=TSTEPS.length;coachEl.hidden=true;if(skipped&&rat&&!rat.dead){rat.dead=true;rat.o.visible=false;}questUI();
  banner(skipped?'Обучение пропущено':'Обучение пройдено');if(!skipped)note('Дальше — сами','Брам расскажет о беде острова. У жителей есть и простые просьбы — поговорите с ними.');}
function spawnRat(){if(rat&&!rat.dead)return;const R=ROOMS[4];const [x,z]=nearFree(R.ox+4,R.oz+4,3);
  rat=foe('wolf',x,z,{name:'Крыса',hp:5,max:5,ac:10,atk:2,dmg:3,dmgB:0,speed:4,perc:8,wander:0,temp:true,atkName:'Укус'});rat.o.scale.setScalar(.55);addBar(rat);}

// ---------- the first easy task: mint for the herbalist ----------
Q.herb={state:0,left:3,title:'Собрать 3 пучка мяты для травницы'};
{const R=ROOMS[5];for(const [x,z] of [[11,34],[13,36],[16,35],[10,37],[14,38],[17,37]]){const [fx,fz]=nearFree(x,z,2);itemProp(scene,fx+.5,groundAt(fx,fz)+.02,fz+.5,'herb',1,'Болотная мята','Пахнет так, что щиплет нос. Травница будет рада.');}}
function herbTalk(n){const q=Q.herb,have=window.handsCount('herb');
  if(q.state===0)return say(n,'Ты бледен, путник. Принеси мне три пучка мяты с луга за хижиной — сварю тебе отвар покрепче.',[['Принесу',()=>{q.state=1;questFocus=q;questUI();}]]);
  if(q.state===1&&have<3)return say(n,'Мне нужно три пучка, у тебя '+have+'. Мята растёт на лугу к югу, у самой воды.');
  if(q.state===1){for(let i=0;i<3;i++)window.handsConsume('herb');q.state=3;window.handsGive([['potion',2]],'Награда');questUI();return say(n,'Чудесная мята! Держи два отвара. Пей, когда будет худо — нажми на себя и выбери «Зелье».');}
  return say(n,'Травы любят тишину. Береги себя.');}

// ---------- arrival cinematic ----------
const cineEl=document.getElementById('cine');
async function caption(title,text,ms){cineEl.querySelector('b').textContent=title;cineEl.querySelector('p').textContent=text;cineEl.classList.remove('cap');void cineEl.offsetWidth;cineEl.classList.add('cap');await wait(ms);}
async function arrival(){busy=true;cineEl.hidden=false;document.body.classList.add('cinematic');worldTime=.255;WX.target=0;WX.rain=0;WX.next=performance.now()+8*60000;
  H0.x=1;H0.z=31;H0.px=1.5;H0.pz=31.5;H0.face=Math.PI/2;focus.set(1.5,0,31.5);camZoom=2.6;zoomTarget=2.6;const olav=actors.find(a=>a.talkId==='fisher');olav.hold=performance.now()+30000;
  await wait(400);await caption('Остров Хельги','Рыбацкая лодка высаживает тебя у причала. Солнце только встаёт над морем.',3800);
  zoomTarget=1;await caption('','Говорят, на острове неспокойно: по ночам из старых руин поднимаются мёртвые.',3800);
  cineEl.classList.remove('cap');document.body.classList.remove('cinematic');await wait(600);cineEl.hidden=true;busy=false;
  const [ox,oz]=nearFree(5,31,2);olav.route=path(olav.x,olav.z,ox,oz,olav,false,2000);olav.dest=[ox,oz];olav.arrive=()=>{olav.face=-Math.PI/2;speak(olav,'Эй, путник! Сюда, ко мне!');};
  TUT.step=0;TUT.flags={};questUI();}

// ---------- minimap: the land around the hero, tap for the big map ----------
const miniEl=document.getElementById('mini'),mg=miniEl.getContext('2d');let miniT=0;
function miniTick(now){if(now-miniT<250)return;miniT=now;const hide=room||paused||!document.getElementById('cine').hidden;miniEl.hidden=hide;if(hide)return;
  const R=12,k=miniEl.width/(R*2+1);mg.clearRect(0,0,miniEl.width,miniEl.height);
  for(let z=-R;z<=R;z++)for(let x=-R;x<=R;x++){const cx=H0.x+x,cz=H0.z+z;if(cz<0||cz>=MAPH||cx<0||cx>=W)continue;const code=at(cx,cz);let col=MAPC[code]||'#3d5e2e';if(code==='G'&&solid.has(cx+','+cz))col='#24391e';
    if(!seen[cz*W+cx]&&code!=='~')col='#0b0d0f';mg.fillStyle=col;mg.fillRect((x+R)*k,(z+R)*k,k+.5,k+.5);}
  const dot=(x,z,c,s=3)=>{const px=(x-H0.x+R+.5)*k,pz=(z-H0.z+R+.5)*k;if(px<0||pz<0||px>miniEl.width||pz>miniEl.height)return;mg.fillStyle=c;mg.fillRect(px-s/2,pz-s/2,s,s);};
  for(const a of actors)if(a!==H0&&!a.dead&&!a.hidden&&a.z<90)dot(a.x,a.z,a.enemy?'#ff5a4a':'#f0e2c2',a.enemy?4:3);
  const T=questTarget();if(T&&!T.inRoom||T&&T.inRoom){let tx=T.x-H0.x,tz=T.z-H0.z;const d=Math.hypot(tx,tz);if(d>R-1){tx=tx/d*(R-1);tz=tz/d*(R-1);}
    mg.fillStyle='#ff5a4a';mg.beginPath();mg.arc((tx+R+.5)*k,(tz+R+.5)*k,4,0,7);mg.fill();}
  mg.fillStyle='#f2c14e';mg.strokeStyle='#000';mg.beginPath();mg.arc((R+.5)*k,(R+.5)*k,4,0,7);mg.fill();mg.stroke();}
miniEl.addEventListener('pointerdown',e=>{e.stopPropagation();openMap();});
// try to keep phones sideways where the browser allows it
addEventListener('pointerdown',()=>{try{screen.orientation&&screen.orientation.lock&&screen.orientation.lock('landscape').catch(()=>{});}catch(e){}},{once:true,capture:true});
