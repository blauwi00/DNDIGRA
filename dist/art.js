/* Detailed tabletop rendering. Gameplay geometry remains owned by game.js. */
window.createChapelArt = function(canvas) {
  'use strict';
  const ctx=canvas.getContext('2d'),atlas=new Image(),floor=new Image();
  const sprites={ranger:[75,0,535,450],mage:[695,0,470,451],guard:[75,450,550,420],enemy:[662,450,495,419],chest:[140,870,477,373],altar:[698,870,478,373]};
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let view=null,back=null,backKey='',px=42,scale=84,lastTime=0,raf=0,onscreen=true;
  const journeys=new Map(),dust=Array.from({length:18},(_,i)=>({x:(i*53%89)/10,y:(i*37%105)/10,phase:i*1.9}));
  function ready(){backKey='';portraits();paint(performance.now());schedule()}
  atlas.onload=ready;floor.onload=ready;atlas.onerror=ready;floor.onerror=ready;
  atlas.src='assets/miniatures-v2.png';floor.src='assets/limestone-v2.png';
  function noise(x,y,k=0){let n=Math.sin(x*127.1+y*311.7+k*19.3)*43758.5453;return n-Math.floor(n)}
  function sprite(c,kind,x,y,w,h){if(!atlas.complete||!atlas.naturalWidth)return false;const r=sprites[kind];c.drawImage(atlas,...r,x,y,w,h);return true}
  function ellipse(c,x,y,rx,ry,color){c.fillStyle=color;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill()}
  function text(c,str,x,y,size,color,spacing=false){c.save();c.translate(x,y);c.scale(.01,.01);c.font=`${size*100}px Georgia, serif`;c.textAlign='center';c.fillStyle=color;c.fillText(str,0,0);c.restore()}
  function floorTile(c,x,y){if(floor.complete&&floor.naturalWidth){const sx=Math.floor(noise(x,y)*850),sy=Math.floor(noise(y,x,2)*850);c.drawImage(floor,sx,sy,300,300,x,y,1,1)}else{c.fillStyle='#8c8771';c.fillRect(x,y,1,1)}}
  function stone(c,x,y){
    const n=noise(x,y),pillar=(x===3&&y===3)||(x===6&&y===7);
    c.save();c.shadowColor='#070c0ce6';c.shadowBlur=scale*.16;c.shadowOffsetX=scale*.11;c.shadowOffsetY=scale*.22;
    c.fillStyle='#262d2b';c.fillRect(x+.02,y-.11,.96,1.05);c.restore();
    c.fillStyle='#444b47';c.fillRect(x+.01,y+.08,.98,.94);
    const face=c.createLinearGradient(x,y+.65,x,y+1.04);face.addColorStop(0,'#6b7268');face.addColorStop(1,'#303b37');c.fillStyle=face;c.fillRect(x+.02,y+.62,.96,.42);
    c.save();c.beginPath();c.rect(x+.025,y-.1,.95,.83);c.clip();floorTile(c,x,y-.1);c.fillStyle='#33433b70';c.fillRect(x,y-.12,1,1);c.restore();
    c.strokeStyle='#b4b4a377';c.lineWidth=.022;c.strokeRect(x+.045,y-.075,.91,.78);
    c.strokeStyle='#1a2526';c.lineWidth=.038;c.beginPath();c.moveTo(x,y+.75);c.lineTo(x+1,y+.75);c.stroke();
    c.strokeStyle='#a5a38b55';c.lineWidth=.02;c.beginPath();c.moveTo(x+.07,y-.055);c.lineTo(x+.9,y-.055);c.stroke();
    for(let j=0;j<3;j++){c.strokeStyle='#1d292942';c.lineWidth=.017;c.beginPath();c.moveTo(x+.07,y+.79+j*.075);c.lineTo(x+.94,y+.79+j*.075);c.stroke()}
    if(pillar){c.fillStyle='#929889';c.fillRect(x+.12,y+.08,.76,.48);c.strokeStyle='#404d47';c.lineWidth=.05;c.strokeRect(x+.2,y+.14,.6,.35);ellipse(c,x+.5,y+.33,.23,.19,'#647568');ellipse(c,x+.48,y+.29,.17,.13,'#9caa97')}
    if(n>.5){c.strokeStyle='#23392d';c.lineWidth=.035;c.beginPath();c.moveTo(x+.7,y-.05);c.lineTo(x+.59,y+.1);c.lineTo(x+.67,y+.24);c.stroke()}
  }
  function bench(c,x,y){c.save();c.shadowColor='#0b1714';c.shadowBlur=scale*.05;c.shadowOffsetY=scale*.12;c.fillStyle='#3a2c1f';c.fillRect(x,y,1.22,.26);c.restore();const g=c.createLinearGradient(0,y,0,y+.25);g.addColorStop(0,'#ad8351');g.addColorStop(.3,'#826440');g.addColorStop(1,'#4b3827');c.fillStyle=g;c.fillRect(x,y,1.22,.23);c.fillStyle='#b39664';c.fillRect(x,y,.07,.23);c.fillRect(x+1.15,y,.07,.23);c.strokeStyle='#382c2088';c.lineWidth=.018;for(let i=1;i<4;i++){c.beginPath();c.moveTo(x+.09,y+i*.048);c.bezierCurveTo(x+.35,y+i*.05,x+.6,y+i*.045,x+1.11,y+i*.05);c.stroke()}for(const xx of[x+.11,x+1.05]){ellipse(c,xx,y+.09,.025,.025,'#ceb880')}}
  function door(c,opened){
    c.save();c.translate(4.04,5.095);if(opened){c.translate(.02,.08);c.rotate(Math.PI*.46)}
    c.shadowColor='#070b08';c.shadowBlur=scale*.06;c.shadowOffsetY=scale*.13;c.fillStyle='#30271b';c.fillRect(0,0,.91,.81);c.shadowBlur=0;c.shadowOffsetY=0;
    for(let i=0;i<5;i++){const g=c.createLinearGradient(i*.18,0,i*.18+.17,0);g.addColorStop(0,'#6b4d30');g.addColorStop(.35,'#aa8150');g.addColorStop(1,'#61452b');c.fillStyle=g;c.fillRect(.01+i*.18,.015,.16,.78);c.strokeStyle='#d6b87b55';c.lineWidth=.009;c.beginPath();c.moveTo(.04+i*.18,.1);c.lineTo(.06+i*.18,.72);c.stroke()}
    for(const y of[.16,.6]){c.fillStyle='#373f37';c.fillRect(.015,y,.87,.072);c.fillStyle='#b4aa80';for(const x of[.06,.26,.48,.68,.83]){ellipse(c,x,y+.035,.015,.015,'#b4aa80')}}c.strokeStyle='#d3b46e';c.lineWidth=.034;c.beginPath();c.arc(.7,.39,.067,0,7);c.stroke();c.restore();
  }
  function carpet(c){c.save();c.beginPath();c.rect(3.78,5.94,1.44,3.64);c.clip();c.fillStyle='#6d4038';c.fillRect(3.78,5.94,1.44,3.64);c.strokeStyle='#b39561';c.lineWidth=.025;c.strokeRect(3.88,6.03,1.24,3.4);c.strokeRect(3.96,6.07,1.08,3.32);for(let y=6.25;y<9.4;y+=.46){c.strokeStyle='#bba26a55';c.beginPath();c.moveTo(4.5,y);c.lineTo(4.78,y+.19);c.lineTo(4.5,y+.38);c.lineTo(4.22,y+.19);c.closePath();c.stroke()}for(let i=0;i<130;i++){c.fillStyle=`rgba(36,32,25,${noise(i,8)*.2})`;c.fillRect(3.78+noise(i,5)*1.44,5.94+noise(i,7)*3.64,.07,.025)}c.restore();c.strokeStyle='#b49966';c.lineWidth=.012;for(let i=0;i<22;i++){c.beginPath();c.moveTo(3.8+i*.065,9.58);c.lineTo(3.8+i*.065,9.66+noise(i,9)*.06);c.stroke()}}
  function scenery(){
    const s=view.state,key=[canvas.width,canvas.height,s.seed,s.door,s.chest,s.relic,atlas.naturalWidth,floor.naturalWidth].join(':');if(back&&backKey===key)return;backKey=key;
    back=document.createElement('canvas');back.width=canvas.width;back.height=canvas.height;const c=back.getContext('2d');c.setTransform(scale,0,0,scale,0,0);
    c.fillStyle='#222e2a';c.fillRect(0,0,9,11);if(floor.complete&&floor.naturalWidth)c.drawImage(floor,0,0,9,11);c.fillStyle='#263e364a';c.fillRect(0,0,9,11);
    // Edge occlusion makes walls feel like raised tabletop scenery.
    for(let y=1;y<10;y++)for(let x=1;x<8;x++){if(view.wall(x,y))continue;for(const [dx,dy]of[[-1,0],[0,-1],[1,0],[0,1]]){if(view.wall(x+dx,y+dy)){const g=c.createLinearGradient(x+.5,y+.5,x+.5+dx*.5,y+.5+dy*.5);g.addColorStop(0,'#15232100');g.addColorStop(1,'#13211da0');c.fillStyle=g;c.fillRect(x,y,1,1)}}}
    carpet(c);for(const y of[6.7,8.22])for(const x of[1.12,6.64])bench(c,x,y);
    // Faded solar mosaic, rubble and tiny leaves.
    c.strokeStyle='#c3bca770';c.lineWidth=.04;c.beginPath();c.arc(5.7,2.4,1.15,0,7);c.stroke();c.lineWidth=.025;c.beginPath();c.arc(5.7,2.4,.99,0,7);c.stroke();for(let i=0;i<12;i++){const a=i*Math.PI/6;c.beginPath();c.moveTo(5.7+Math.cos(a)*.61,2.4+Math.sin(a)*.61);c.lineTo(5.7+Math.cos(a)*.86,2.4+Math.sin(a)*.86);c.stroke()}
    for(let i=0;i<100;i++){const x=noise(i,s.seed)*7+1,y=noise(i,s.seed,3)*9+1;if(view.wall(Math.floor(x),Math.floor(y)))continue;c.fillStyle=i%4?'#272e2280':'#95805a';c.save();c.translate(x,y);c.rotate(i);c.fillRect(0,0,.035+noise(i,2)*.06,.025);c.restore()}
    // The exit marker is engraved into the floor.
    ellipse(c,4.5,9.5,.32,.32,'#253b3260');c.strokeStyle='#e5d4a3b3';c.lineWidth=.035;c.beginPath();c.moveTo(4.33,9.42);c.lineTo(4.5,9.62);c.lineTo(4.67,9.42);c.stroke();
    c.strokeStyle='#27382e55';c.lineWidth=.012;for(let y=1;y<10;y++)for(let x=1;x<8;x++)if(!view.wall(x,y))c.strokeRect(x,y,1,1);
    for(let y=0;y<11;y++)for(let x=0;x<9;x++)if(view.wall(x,y))stone(c,x,y);
    // Moonlight through narrow stained windows.
    for(const y of[6.2,8.65]){c.fillStyle='#15232a';c.fillRect(.24,y,.39,.77);const g=c.createLinearGradient(.32,y,4,y+1.6);g.addColorStop(0,'#a0cdd854');g.addColorStop(1,'#a0cdd800');c.fillStyle=g;c.beginPath();c.moveTo(.68,y+.07);c.lineTo(4.2,y+1.14);c.lineTo(4.2,y+1.77);c.lineTo(.68,y+.6);c.closePath();c.fill();c.fillStyle='#a9bfbe';c.fillRect(.28,y+.05,.26,.64);c.strokeStyle='#475756';c.lineWidth=.035;c.strokeRect(.28,y+.05,.26,.64);c.beginPath();c.moveTo(.41,y+.06);c.lineTo(.41,y+.68);c.moveTo(.28,y+.31);c.lineTo(.54,y+.31);c.stroke()}
    door(c,s.door);
    if(!s.chest){if(!sprite(c,'chest',1.98,2.07,1.06,.86)){c.fillStyle='#9b7549';c.fillRect(2.1,2.28,.8,.6)}}else{c.fillStyle='#52443155';c.fillRect(2.15,2.4,.7,.36)}
    if(!s.relic)sprite(c,'altar',5.98,1.06,1.08,.88);else{c.fillStyle='#9b9e8c';c.fillRect(6.1,1.28,.8,.55)}
    // Decorative brass corners along the table rim.
    c.strokeStyle='#ccae7066';c.lineWidth=.025;for(const [x,y,sx,sy]of[[.17,.17,1,1],[8.83,.17,-1,1],[.17,10.83,1,-1],[8.83,10.83,-1,-1]]){c.beginPath();c.moveTo(x,y+sy*.48);c.lineTo(x,y);c.lineTo(x+sx*.48,y);c.stroke()}
  }
  function figurine(e,now){let x=e.x,y=e.y;const j=journeys.get(e.id);if(j){const t=Math.min(1,(now-j.start)/j.duration),v=t*(j.path.length-1),i=Math.min(j.path.length-2,Math.floor(v)),u=v-i;x=j.path[i].x+(j.path[i+1].x-j.path[i].x)*u;y=j.path[i].y+(j.path[i+1].y-j.path[i].y)*u;if(t>=1)journeys.delete(e.id)}
    const enemy=e.kind==='enemy',gold=e.id==='hero';ctx.save();ctx.translate(x+.5,y+.35);
    const shadow=ctx.createRadialGradient(.055,.14,.06,.055,.14,.53);shadow.addColorStop(0,'#07110fd9');shadow.addColorStop(1,'#07110f00');ctx.fillStyle=shadow;ctx.fillRect(-.5,-.35,1.1,1);
    ctx.strokeStyle=gold?'#ffe1a0':enemy?'#ce7c65':'#a8c6d4';ctx.lineWidth=gold?.047:.025;ctx.beginPath();ctx.ellipse(0,.15,.38,.26,0,0,7);ctx.stroke();
    const turn={up:Math.PI,left:-Math.PI/2,right:Math.PI/2,down:0}[e.facing||'down'];ctx.save();ctx.rotate(turn);if(!sprite(ctx,e.kind,-.54,-.57,1.08,.94)){ellipse(ctx,0,0,.26,.26,enemy?'#9d6152':'#859370')}ctx.restore();
    ctx.fillStyle='#111e19';ctx.fillRect(-.31,.44,.62,.065);ctx.fillStyle=enemy?'#dd8d77':gold?'#ddc890':'#a7c8b0';ctx.fillRect(-.3,.455,.6*e.hp/e.max,.035);ctx.restore();
  }
  function light(x,y,t){const power=reduced?1:.95+Math.sin(t/240+x)*.04+Math.sin(t/101+y)*.02;const g=ctx.createRadialGradient(x,y,.03,x,y,1.85);g.addColorStop(0,`rgba(255,189,86,${.24*power})`);g.addColorStop(.3,`rgba(252,166,55,${.12*power})`);g.addColorStop(1,'#fca63700');ctx.save();ctx.globalCompositeOperation='screen';ctx.fillStyle=g;ctx.fillRect(x-1.85,y-1.85,3.7,3.7);ctx.restore();ellipse(ctx,x,y+.07,.1,.06,'#342e21');ctx.fillStyle='#8e7752';ctx.fillRect(x-.05,y-.02,.1,.13);ellipse(ctx,x,y-.04,.043,.1*power,'#ed9c39');ellipse(ctx,x,y-.035,.025,.064*power,'#fff0b8')}
  function fog(){ctx.save();ctx.fillStyle='#142322';ctx.fillRect(0,0,9,4.94);for(let i=0;i<12;i++){const x=noise(i,21)*9,y=noise(i,4)*5,g=ctx.createRadialGradient(x,y,.1,x,y,2.6);g.addColorStop(0,i%2?'#52706d22':'#050e162b');g.addColorStop(1,'#20353400');ctx.fillStyle=g;ctx.fillRect(0,0,9,5)}ctx.strokeStyle='#7f92844a';ctx.lineWidth=.018;ctx.beginPath();ctx.arc(4.5,2.02,.33,0,7);ctx.stroke();ctx.strokeStyle='#c2b68c';ctx.lineWidth=.025;ctx.strokeRect(4.38,1.98,.24,.2);ctx.beginPath();ctx.arc(4.5,1.98,.08,Math.PI,0);ctx.stroke();text(ctx,'НЕИЗВЕСТНОЕ КРЫЛО',4.5,2.72,.2,'#b5bbaa');text(ctx,'За дубовой дверью слышны шаги',4.5,3.04,.16,'#7b9589');ctx.restore()}
  function paint(now){if(!view)return;const size=canvas.clientWidth||360,dpr=Math.min(devicePixelRatio||1,2);px=size/9;scale=px*dpr;const width=Math.round(size*dpr),height=Math.round(size*11/9*dpr);if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;backKey=''}ctx.setTransform(1,0,0,1,0,0);scenery();ctx.drawImage(back,0,0);ctx.setTransform(scale,0,0,scale,0,0);
    const s=view.state;
    if(s.combat&&!s.defeated){ctx.fillStyle='#c6d6b71c';for(const p of view.reachable)ctx.fillRect(p.x+.025,p.y+.025,.95,.95)}
    if(view.path.length){ctx.strokeStyle='#edda99';ctx.lineWidth=.04;ctx.setLineDash([.075,.1]);ctx.beginPath();ctx.moveTo(s.hero.x+.5,s.hero.y+.5);for(const p of view.path)ctx.lineTo(p.x+.5,p.y+.5);ctx.stroke();ctx.setLineDash([]);for(const p of view.path)ellipse(ctx,p.x+.5,p.y+.5,.043,.043,'#ffdf96')}
    const ordered=[...s.allies,...s.enemies,s.hero].filter(e=>e.hp>0&&(s.door||e.y>=5)).sort((a,b)=>a.y-b.y);for(const e of ordered)figurine(e,now);
    light(1.15,4.34,now);light(7.78,6.34,now);light(1.18,8.25,now);if(!s.relic)light(6.5,1.3,now);
    if(!s.door)fog();
    const vignette=ctx.createRadialGradient(4.5,5.5,2.4,4.5,5.5,7);vignette.addColorStop(0,'#06121500');vignette.addColorStop(1,'#06121599');ctx.fillStyle=vignette;ctx.fillRect(0,0,9,11);
    for(const d of dust){const y=(d.y+(reduced?0:now/26000))%10.5;if(!s.door&&y<5)continue;ctx.globalAlpha=.12+(Math.sin(now/1700+d.phase)+1)*.12;ellipse(ctx,d.x,y,.012,.012,'#edd49a')}ctx.globalAlpha=1;
    if(view.selected){const {x,y}=view.selected;ctx.strokeStyle='#ffe6a9';ctx.lineWidth=.037;const k=.19;for(const [xx,yy,sx,sy]of[[x+.06,y+.06,1,1],[x+.94,y+.06,-1,1],[x+.06,y+.94,1,-1],[x+.94,y+.94,-1,-1]]){ctx.beginPath();ctx.moveTo(xx,yy+sy*k);ctx.lineTo(xx,yy);ctx.lineTo(xx+sx*k,yy);ctx.stroke()}}
  }
  function frame(t){raf=0;if(!onscreen||document.hidden)return;if(t-lastTime>40){paint(t);lastTime=t}schedule()}
  function schedule(){if(!raf&&!reduced&&onscreen&&!document.hidden)raf=requestAnimationFrame(frame)}
  function portraits(){if(!atlas.complete||!atlas.naturalWidth)return;document.querySelectorAll('canvas[data-portrait]').forEach(c=>{const kind=c.dataset.portrait,r=sprites[kind],cx=c.getContext('2d');c.width=180;c.height=180;cx.clearRect(0,0,180,180);const w=r[2],h=r[3];cx.drawImage(atlas,r[0]+w*.18,r[1],w*.64,h*.72,0,0,180,180)})}
  new IntersectionObserver(([entry])=>{onscreen=entry.isIntersecting;if(onscreen){paint(performance.now());schedule()}}).observe(canvas);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden){paint(performance.now());schedule()}});
  return {
    update(state,selected,path,wall,route,blocked,occupant){const reachable=[];if(state.combat&&!state.defeated)for(let y=1;y<10;y++)for(let x=1;x<8;x++){if(blocked(x,y)||occupant(x,y))continue;const r=route(state.hero,{x,y});if(r&&r.length<=state.move)reachable.push({x,y})}view={state,selected,path,wall,reachable};paint(performance.now());portraits();schedule()},
    travel(id,path){if(!reduced&&path.length>1)journeys.set(id,{path:path.map(p=>({x:p.x,y:p.y})),start:performance.now(),duration:Math.min(1000,(path.length-1)*140)})},
    portraits,
    characterArt(kind){return `<div class="character-art"><canvas data-portrait="${kind}" width="180" height="180"></canvas></div>`}
  };
};
