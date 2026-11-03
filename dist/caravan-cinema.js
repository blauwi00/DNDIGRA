/* Direction over the current map. Never owns gameplay state or rewards. */
(() => {
 'use strict';
 let root,canvas,ctx,title,caption,detail,progress,shade,soundButton,run=null,raf=0,audio=null,wind=null,soundEnabled=false,pausedPreference=false;
 const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
 function init(){
  if(root)return;
  root=document.createElement('section');root.id='caravan-cinema';root.hidden=true;root.setAttribute('aria-label','Сцена на лесной дороге');
  root.innerHTML='<canvas class="caravan-dust" aria-hidden="true"></canvas><div class="caravan-rays" aria-hidden="true"></div><div class="caravan-vignette" aria-hidden="true"></div><div class="caravan-black" aria-hidden="true"></div><div class="caravan-top"><span>ЗА ГРАНЬЮ <i>/</i> НАЧАЛО ПУТИ</span><div><button type="button" class="caravan-sound" aria-pressed="false">Звук: выкл.</button><button type="button" class="caravan-pause" aria-pressed="false">Пауза</button><button type="button" class="caravan-skip">Пропустить сцену</button></div></div><div class="caravan-copy"><div class="caravan-rule"></div><h2></h2><p class="caravan-caption"></p><p class="caravan-detail"></p></div><div class="caravan-progress" aria-hidden="true"><i></i></div>';
  document.getElementById('viewport').append(root);
  canvas=root.querySelector('canvas');ctx=canvas.getContext('2d');title=root.querySelector('h2');caption=root.querySelector('.caravan-caption');detail=root.querySelector('.caravan-detail');progress=root.querySelector('.caravan-progress i');shade=root.querySelector('.caravan-black');soundButton=root.querySelector('.caravan-sound');
  root.querySelector('.caravan-skip').onclick=()=>finish(true);
  root.querySelector('.caravan-pause').onclick=()=>{if(!run)return;run.paused=!run.paused;pausedPreference=run.paused;run.last=null;root.classList.toggle('paused',run.paused);const b=root.querySelector('.caravan-pause');b.textContent=run.paused?'Продолжить':'Пауза';b.setAttribute('aria-pressed',String(run.paused));if(run.paused)silence();else if(soundEnabled)startAudio();};
  soundButton.onclick=async()=>{soundEnabled=!soundEnabled;if(soundEnabled)await startAudio();else silence();soundButton.textContent=soundEnabled?'Звук: вкл.':'Звук: выкл.';soundButton.setAttribute('aria-pressed',String(soundEnabled));};
  document.addEventListener('visibilitychange',()=>{if(run)run.last=null;if(document.hidden)silence();else if(run&&!run.paused&&soundEnabled)startAudio();});
 }
 async function startAudio(){
  try{
   audio ||= new (window.AudioContext||window.webkitAudioContext)();await audio.resume();if(!run||run.paused||!soundEnabled||document.hidden)return;
   if(wind)return;const noise=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();
   const buffer=audio.createBuffer(1,audio.sampleRate*2,audio.sampleRate),data=buffer.getChannelData(0);let last=0;
   for(let i=0;i<data.length;i++){last=(last+(Math.random()*2-1)*.02)/1.02;data[i]=last*3;}
   noise.buffer=buffer;noise.loop=true;filter.type='lowpass';filter.frequency.value=650;gain.gain.value=.12;
   noise.connect(filter).connect(gain).connect(audio.destination);noise.start();wind={noise,filter,gain};
  }catch{soundEnabled=false;}
 }
 function silence(){if(wind){wind.noise.stop();wind.noise.disconnect();wind.filter.disconnect();wind.gain.disconnect();wind=null;}}
 function hit(){if(!audio||!soundEnabled||document.hidden)return;const osc=audio.createOscillator(),gain=audio.createGain();osc.type='triangle';osc.frequency.setValueAtTime(90,audio.currentTime);osc.frequency.exponentialRampToValueAtTime(24,audio.currentTime+.5);gain.gain.setValueAtTime(.2,audio.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audio.currentTime+.65);osc.connect(gain).connect(audio.destination);osc.onended=()=>{osc.disconnect();gain.disconnect();};osc.start();osc.stop(audio.currentTime+.7);}
 function particles(t,night,impact){
  if(!ctx)return;const w=root.clientWidth,h=root.clientHeight;
  if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
  ctx.clearRect(0,0,w,h);if(reduced())return;
  ctx.fillStyle=night?'rgba(178,198,208,.35)':'rgba(255,223,153,.48)';
  for(let i=0;i<55;i++){const x=((i*157.7+t*(impact ? .08 : .012))%w+w)%w,y=(i*83.3+Math.sin(t*.00035+i)*18+t*.004)%h,size=i%7===0?3:1.4;ctx.globalAlpha=.2+(i%5)/7;ctx.fillRect(x,y,size,size);}
  ctx.globalAlpha=1;
 }
 function poseCarriage(current,f){
  if(current.kind!=='crash'||reduced())return;
  const model=window.voxel?.models.get('prop:carriage');if(!model?.userData.p?.wrecked)return;
  if(!current.cart||current.cart.model!==model)current.cart={model,position:model.position.clone(),rotation:model.rotation.clone()};
  const saved=current.cart,u=1-f.cartRoll;
  model.position.copy(saved.position);model.position.x-=u*.5;model.position.y+=u*.4;
  model.rotation.copy(saved.rotation);model.rotation.z-=u*Math.PI/2;delete model.userData.tap;
  model.userData.staticBatchOwner?.update(model);
 }
 function draw(time){
  if(!run)return;
  const current=run;
  if(window.gameDebug.state!==current.snapshot||window.CinematicMenu?.active||!window.Prologue?.active){stop();return;}
  const delta=current.last===null?0:Math.max(0,time-current.last);current.last=time;if(!document.hidden&&!current.paused)current.elapsed+=delta;
  const f=CaravanTimeline.frame(current.kind,current.elapsed);
  if(f.shot!==current.shot){current.shot=f.shot;title.textContent=f.title;caption.textContent=f.caption;detail.textContent=f.detail;root.dataset.shot=String(f.shot);if(!reduced()){camera.zoom(f.zoom);camera.center({x:f.x,y:f.y});}if(f.impact)hit();}
  poseCarriage(current,f);root.classList.toggle('night',f.night);root.classList.toggle('impact',f.impact&&!reduced());shade.style.opacity=String(f.black);progress.style.transform='scaleX('+f.progress+')';particles(current.elapsed,f.night,f.impact);
  if(f.done){finish(false);return;}raf=requestAnimationFrame(draw);
 }
 function play(kind,onComplete){
  stop();init();const snapshot=gameDebug.state;run={kind,snapshot,onComplete,elapsed:0,last:null,paused:pausedPreference,shot:-1,camera:structuredClone(camera.state)};
  root.hidden=false;root.classList.toggle('paused',pausedPreference);root.querySelector('.caravan-pause').textContent=pausedPreference?'Продолжить':'Пауза';root.querySelector('.caravan-pause').setAttribute('aria-pressed',String(pausedPreference));root.dataset.scene=kind;document.body.classList.add('caravan-playing');root.querySelector('.caravan-skip').focus({preventScroll:true});if(soundEnabled)startAudio();raf=requestAnimationFrame(draw);
 }
 function stop(){
  cancelAnimationFrame(raf);const previous=run;run=null;if(previous?.cart&&window.voxel?.models.get('prop:carriage')===previous.cart.model){const c=previous.cart;c.model.position.copy(c.position);c.model.rotation.copy(c.rotation);c.model.userData.staticBatchOwner?.update(c.model);}silence();document.body.classList.remove('caravan-playing');if(root)root.hidden=true;
  if(previous&&window.camera&&gameDebug.state===previous.snapshot){camera.zoom(previous.camera.scale);camera.center({x:previous.camera.focus.x-.5,y:previous.camera.focus.z-.5});}
 }
 function finish(skipped){const previous=run;if(!previous)return;stop();if(gameDebug.state===previous.snapshot)previous.onComplete({skipped});}
 window.CaravanCinema={play,stop,get active(){if(run&&run.snapshot!==window.gameDebug.state)stop();return !!run;},get kind(){return run?.kind||null;}};
})();
