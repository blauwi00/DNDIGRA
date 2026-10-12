(() => {
 'use strict';
 // Performance tools are opt-in so their overlay never blocks game controls.
 if(new URLSearchParams(location.search).get('qa')!=='1')return;
 const panel=document.createElement('details');panel.id='iphone-test';
 panel.innerHTML='<summary>Тест · FPS <span id="test-fps">—</span></summary><div class="test-tools"><b>Тестовая копия с текселями</b><p>Здесь отдельные сохранения. Основная игра не меняется.</p><button id="test-start">Замер карты · 10 секунд</button><button id="test-locations">Таверна · генератор локаций</button><button id="test-editor">Проверить внешность</button><p id="test-result" role="status">Открой карту и запусти замер.</p><button id="test-copy" disabled>Скопировать результат</button><textarea id="test-report" aria-label="Результат проверки" readonly hidden></textarea></div>';
 document.body.append(panel);
 const style=document.createElement('style');style.textContent='#iphone-test{position:fixed;top:140px;right:12px;z-index:220;max-width:min(300px,calc(100vw - 24px));color:#f1e6c9;font:13px/1.4 system-ui;background:#261d15f2;border:1px solid #bf985c;border-radius:8px;box-shadow:0 3px 12px #0008}#iphone-test summary{padding:8px 12px;cursor:pointer;touch-action:manipulation;min-height:36px}#iphone-test[open]{max-height:calc(100dvh - 165px);overflow:auto}#iphone-test .test-tools{padding:0 12px 12px}#iphone-test p{margin:8px 0}#iphone-test button{display:block;min-height:40px;width:100%;margin:7px 0;border:1px solid #b59253;border-radius:5px;background:#513b25;padding:5px;color:#f1e6c9;font:inherit}#iphone-test textarea{width:100%;min-height:110px;font:12px/1.3 system-ui;color:#eee;background:#18130f}';document.head.append(style);
 let frames=0,previous=0,last=performance.now(),run=null,report='';
 const result=document.getElementById('test-result'),startButton=document.getElementById('test-start'),copyButton=document.getElementById('test-copy');
 function finish(cancelled=false){
  if(!run)return;clearTimeout(run.timer);const seconds=(performance.now()-run.started)/1000,fps=(frames-run.frames)/seconds;
  result.textContent=cancelled?'Замер прерван: страница была скрыта.':'Средний FPS карты: '+fps.toFixed(1)+' за '+seconds.toFixed(1)+' с.';
  report=cancelled?'':JSON.stringify({test:'locations-v1',seed:window.ProceduralLocations?.current?.seed,mapFps:Number(fps.toFixed(1)),seconds:Number(seconds.toFixed(1)),viewport:[innerWidth,innerHeight],devicePixelRatio:devicePixelRatio,userAgent:navigator.userAgent,scene:window.gameDebug?.scene?.id,time:new Date().toISOString()},null,2);
  document.getElementById('test-report').value=report;copyButton.disabled=cancelled;startButton.disabled=false;run=null;
 }
 function attach(){
  if(!window.voxel?.ready){setTimeout(attach,50);return;}
  const renderer=voxel.renderer,render=renderer.render;
  renderer.render=function(scene,...args){const value=render.call(this,scene,...args);if(scene===voxel.scene&&!document.hidden)frames++;return value;};
  setInterval(()=>{const now=performance.now(),visible=!document.hidden&&!document.getElementById('map-view').hidden;document.getElementById('test-fps').textContent=visible?((frames-previous)/((now-last)/1000)).toFixed(0):'пауза';previous=frames;last=now;},1000);
 }
 startButton.onclick=()=>{
  document.querySelectorAll('dialog').forEach(d=>d.close());window.closeDialogue?.();window.viewsDebug?.switchTab('map');
  panel.open=false;run={started:performance.now(),frames};startButton.disabled=true;copyButton.disabled=true;copyButton.textContent='Скопировать результат';result.textContent='Идёт замер. Двигайся по карте и не закрывай страницу.';run.timer=setTimeout(()=>finish(),10000);
 };
 document.getElementById('test-locations').onclick=()=>{panel.open=false;ProceduralLocations.open();};
 document.getElementById('test-editor').onclick=()=>{panel.open=false;Heroes.start();Heroes.open();document.querySelectorAll('.creation-steps button')[2]?.click();};
 copyButton.onclick=async()=>{try{await navigator.clipboard.writeText(report);copyButton.textContent='Результат скопирован';}catch{document.getElementById('test-report').hidden=false;document.getElementById('test-report').select();result.textContent='Выдели и скопируй результат ниже.';}};
 document.addEventListener('visibilitychange',()=>{if(document.hidden)finish(true);});attach();
})();
