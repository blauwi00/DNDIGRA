// ---------- weather ----------
const WX={rain:0,target:0,next:0};
const rainGeo=new THREE.BufferGeometry(),RN=500,rp=new Float32Array(RN*6);rainGeo.setAttribute('position',new THREE.BufferAttribute(rp,3));
const rain=new THREE.LineSegments(rainGeo,new THREE.LineBasicMaterial({color:0x9ab0c8,transparent:true,opacity:.45}));rain.frustumCulled=false;scene.add(rain);
for(let i=0;i<RN;i++){rp[i*6]=(Math.random()-.5)*26;rp[i*6+1]=Math.random()*9;rp[i*6+2]=(Math.random()-.5)*22;}
function weatherTick(dt){if(performance.now()>WX.next){WX.next=performance.now()+(60+Math.random()*120)*1000;WX.target=Math.random()<.3?.6+Math.random()*.4:0;}if(window.SET&&!SET.weather)WX.target=0;
  WX.rain+=(WX.target-WX.rain)*Math.min(1,dt*.15);const on=WX.rain>.03&&!room;rain.visible=on;
  if(on){rain.material.opacity=.5*WX.rain;for(let i=0;i<RN;i++){let y=rp[i*6+1]-dt*14;if(y<0){y=7+Math.random()*2;rp[i*6]=(Math.random()-.5)*26;rp[i*6+2]=(Math.random()-.5)*22;}
      rp[i*6+1]=y;rp[i*6+3]=rp[i*6]+.05;rp[i*6+4]=y+.45;rp[i*6+5]=rp[i*6+2];}
    rainGeo.attributes.position.needsUpdate=true;rain.position.set(focus.x,focus.y,focus.z);
    if(!room){hemi.intensity*=1-.35*WX.rain;moon.intensity*=1-.5*WX.rain;scene.fog.density+=.025*WX.rain;}}
  if(AC&&AMB.rain)AMB.rain.gain.setTargetAtTime(muted?0:(room?.012:.06)*WX.rain,AC.currentTime,.5);}

// ---------- the daily routine ----------
function phaseNow(){const p=worldTime;if(p>=.88||p<.24)return 'home';if(p>=.74)return 'tavern';if(WX.target>0&&WX.rain>.3)return 'tavern';return 'work';}
function hideIn(a){a.hidden=true;a.o.visible=false;a.route=null;a.where='home';}
function appear(a,[x,z]){a.hidden=false;a.o.visible=true;[a.x,a.z]=nearFree(x,z,3);a.px=a.x+.5;a.pz=a.z+.5;a.where='out';}
function goTo(a,[x,z],then){const t=nearFree(x,z,3);const p=path(a.x,a.z,t[0],t[1],a,false,3200);if(p&&p.length){a.route=p;a.dest=t;a.arrive=then||null;}else if(then)then();}
let lifeI=0;
// Olav waits on the pier until the new hero has spoken to him: the tutorial sends the player to him
const waitsForHero=a=>a.talkId==='fisher'&&typeof TUT!=='undefined'&&TUT.step>=0&&TUT.step<=1&&!TUT.flags.olav;
function lifeTick(){if(!V.length)return;const a=V[lifeI++%V.length];if(a===window.talkWho&&!talkEl.hidden)return;if(a.dead||a.hold>performance.now()||waitsForHero(a)||CB.on)return;const ph=phaseNow();
  if(a.role==='patrol'&&ph!=='home'){if(a.hidden)appear(a,DOOR(a.house));if(!a.route){a.pi=((a.pi||0)+1)%SPOTS.patrol.length;goTo(a,SPOTS.patrol[a.pi]);}a.act=null;return;}
  if(a.route)return;
  if(ph==='home'){if(a.where==='home')return;if(a.where==='goingHome'&&a.route)return;if(a.where==='tavern'){leaveTavern(a);return;}a.act=null;a.tool&&setHeld(a.o,'R',null);a.where='goingHome';goTo(a,DOOR(a.house),()=>hideIn(a));return;}
  // evening: about half the village goes to the tavern (a different half each day), the rest go home
  if(ph==='tavern'&&!goesOut(a)){if(a.where==='home'||a.where==='goingHome')return;if(a.where==='tavern'){leaveTavern(a);return;}
    a.act=null;a.tool&&setHeld(a.o,'R',null);a.where='goingHome';goTo(a,DOOR(a.house),()=>hideIn(a));return;}
  if(ph==='tavern'){if(a.where==='tavern'||a.where==='toTavern')return;if(a.hidden)appear(a,DOOR(a.house));a.act=null;setHeld(a.o,'R',null);a.where='toTavern';
    // through the door: appear on the inner threshold and walk to a free stool, or stand at the bar with a mug
    const inside=()=>{a.x=TAV.exit[0];a.z=TAV.exit[1]-1;a.px=a.x+.5;a.pz=a.z+.5;a.where='tavern';
      const stools=(TAV.seats||[]).slice().sort(()=>Math.random()-.5).filter(([x,z])=>free(x,z)&&!V.some(v=>v!==a&&v.seat&&v.seat[0]===x&&v.seat[1]===z));
      const sit=stools.length>0,seat=sit?stools[0]:nearFree(TAV.ox+6,TAV.oz+4,2);a.seat=sit?seat:null;
      goTo(a,seat,()=>{a.act=sit?'sit':'drinkstand';setHeld(a.o,'R',sit&&Math.random()<.5?null:'mug');a.face=sit?Math.atan2(TAV.ox+6.5-a.px,TAV.oz+5-a.pz):Math.PI;});};
    if(a.z>=OUT_H)inside();else goTo(a,DOOR(0),inside);return;}
  // work
  if(a.where==='tavern'){leaveTavern(a);return;}if(a.hidden)appear(a,DOOR(a.house));
  const spot=SPOTS[a.role];if(Math.abs(a.x-spot[0])+Math.abs(a.z-spot[1])>2){a.act=null;goTo(a,spot);a.where='out';return;}
  if(a.act!==a.role){a.act=a.role;if(a.tool)setHeld(a.o,'R',a.tool);
    a.face=a.workFace={fish1:-Math.PI/2,fish2:-Math.PI/2,chop:Math.PI/2,sell:0,chat1:Math.PI/2,chat2:-Math.PI/2,sweep:Math.PI/2,field:0}[a.role]??a.face;}}
// who goes out tonight: decided per villager and per day
function goesOut(a){const d=typeof dayN==='number'?dayN:0;return hash2(V.indexOf(a)*7+3,d*13+1)<.5;}
function leaveTavern(a){a.act=null;a.seat=null;a.where='leaving';goTo(a,[TAV.exit[0],TAV.exit[1]-1],()=>{appear(a,DOOR(0));a.where='out';});}
// work and leisure motions, called from idleLife when a villager stands still
// Work motions use the whole body: both arms, the forearms, a lean of the trunk and bent knees, in a rhythm
// with a quick working stroke and a slower recovery. armL/foreL is the hand that holds the tool.
const ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;
// The arms' sideways angle: for the left-hand group (armL, at -x) a negative z swings the hand out, a positive z
// in across the body; armR is the mirror. Arms only cross inwards when they are lifted well forward, so a hand never
// passes through the chest or belly.
const bump=x=>{const s=Math.sin(x);return s>0?s*s:0;};
// talking to the hero: turned to face them, the tool lowered, the free hand moves with the words, small nods;
// someone who just called out to the hero lifts a hand in greeting
function talkPose(a,r,b,t,greet){const k=t+a.ph,sp=r.splay||0;a.face=Math.atan2(H0.px-a.px,H0.pz-a.pz);a.crouch=0;
  const tool=!!(r.foreL.userData.item||r.foreL.userData.two),g=bump(k*1.9),g2=bump(k*1.3+2.1);
  r.armL.rotation.set(tool?-.18:-.15-g2*.45,0,-sp-.04-(tool?0:g2*.12));r.foreL.rotation.set(tool?-.35:-.3-g2*.7,0,0);
  if(greet){const w=Math.sin(k*9)*.22;r.armR.rotation.set(-2.5,0,sp+.3+w);r.foreR.rotation.set(-.3,0,0);}
  else{r.armR.rotation.set(-.2-g*.6,0,sp+.06+g*.18);r.foreR.rotation.set(-.35-g*.75,0,0);}
  r.head.rotation.set(Math.sin(k*2.1)*.05+(greet?-.08:.02),0,Math.sin(k*.8)*.04);b.rotation.set(0,0,Math.sin(k*.6)*.02);}
function workPose(a,r,b,t){const p=a.ph,k=t+p,now=performance.now();
  if(a.act!=='sit'){if(a===window.talkWho&&!talkEl.hidden){a.hold=now+1500;return talkPose(a,r,b,t,false);}
    if(a.greetT>now)return talkPose(a,r,b,t,true);}
  if(a.workFace!=null&&a.act===a.role)a.face=a.workFace;
  switch(a.act){
  case 'fish1':case 'fish2':{ // rod held out in both hands, the tip bobbing; now and then a sharp tug
    const tug=Math.max(0,Math.sin(k*.45))>.97?1:0,bob=Math.sin(k*1.6)*.05;
    r.armL.rotation.set(-1.05+bob-tug*.5,0,.18);r.foreL.rotation.set(-.35-tug*.3,0,0);r.armR.rotation.set(-.85+bob,0,-.25);r.foreR.rotation.set(-.6,0,0);
    b.rotation.x=.06;r.head.rotation.x=.18;break;}
  case 'chop':{ // both hands lift the axe overhead, a fast stroke down, the body follows through and knees give
    const c=(k*.75)%1,up=c<.6?ease(c/.6):1-ease((c-.6)/.4*1.8>1?1:(c-.6)/.4*1.8);
    for(const[arm,fore,z]of[[r.armL,r.foreL,-.12],[r.armR,r.foreR,.12]]){arm.rotation.set(-.35-2.25*up,0,z);fore.rotation.set(-.2-.5*up,0,0);}
    b.rotation.x=.32*(1-up);a.crouch=.05*(1-up);if(c<a.ck&&up<.2&&!room&&man(a,H0)<9)sfx('chopw');a.ck=c;break;}
  case 'sweep':{ // broom low in both hands, long strokes left and right, shoulders turning with them
    const sw=Math.sin(k*2.2),sp=r.splay||0;r.armL.rotation.set(-.38,sw*.1,-sp+sw*.12);r.foreL.rotation.set(-.2,0,0);r.armR.rotation.set(-.62,0,.22+sw*.12);r.foreR.rotation.set(-.55,0,0);
    b.rotation.y=sw*.2;b.rotation.x=.14;r.head.rotation.x=.22;r.head.rotation.y=-sw*.12;break;}
  case 'field':{ // the hoe rises in both hands and bites the ground; the worker bends low on each stroke
    const c=(k*.6)%1,up=c<.55?ease(c/.55):1-ease(Math.min(1,(c-.55)/.25));
    r.armL.rotation.set(-.3-1.6*up,0,-(r.splay||0));r.foreL.rotation.set(-.2-.4*up,0,0);r.armR.rotation.set(-.55-1.5*up,0,.2);r.foreR.rotation.set(-.5-.3*up,0,0);
    b.rotation.x=.38*(1-up)+.08;a.crouch=.06*(1-up);break;}
  case 'sell':{ // calls to passers-by: one hand waves the goods, the other rests on the stall, weight shifting
    const w=bump(k*1.1),sp=r.splay||0;r.armR.rotation.set(-.35-w*1.5,0,sp+.08+w*.3);r.foreR.rotation.set(-.45-w*.4,0,0);r.armL.rotation.set(-.55,0,.12);r.foreL.rotation.set(-1,0,0);
    r.head.rotation.y=Math.sin(k*.5)*.5;b.rotation.z=Math.sin(k*.4)*.04;break;}
  case 'chat1':case 'chat2':{ // talking with hands: alternate gestures, nods and a shift of weight
    const g1=bump(k*1.7),g2=bump(k*1.7+2.4),sp=r.splay||0;r.armR.rotation.set(-.15-g1*.75,0,sp+.06+g1*.2);r.foreR.rotation.set(-.3-g1*.8,0,0);
    r.armL.rotation.set(-.12-g2*.6,0,-sp-.06-g2*.18);r.foreL.rotation.set(-.3-g2*.7,0,0);r.head.rotation.x=Math.sin(k*2.3)*.1;r.head.rotation.y=Math.sin(k*.7)*.2;b.rotation.z=Math.sin(k*.5)*.035;break;}
  case 'guard':{ // a guard stands straight, spear upright at his side, and looks the street up and down
    r.armL.rotation.set(-.25,0,.05);r.foreL.rotation.set(-.6,0,0);r.armR.rotation.set(0,0,-.08);r.head.rotation.y=Math.sin(k*.35)*.8;break;}
  case 'sit':{ // seated, forearms on the knees; now and then a sip from the mug
    a.crouch=.16;r.legL.rotation.x=-1.35;r.legR.rotation.x=-1.35;const sip=Math.max(0,Math.sin(k*.7))>.85?1:0;
    r.armL.rotation.set(-.75-sip*.9,0,.15);r.foreL.rotation.set(-.6-sip*1.2,0,0);r.armR.rotation.set(-.7,0,-.15);r.foreR.rotation.set(-.5,0,0);
    r.head.rotation.x=-sip*.3;r.head.rotation.y=sip?0:Math.sin(k*.5)*.4;break;}
  case 'drinkstand':{ // standing with a mug: lift, bend the elbow, tip the head back, lower it slowly
    const c=(k*.35)%1,up=c<.25?ease(c/.25):c<.45?1:1-ease(Math.min(1,(c-.45)/.3));
    r.armL.rotation.set(-.35-1.05*up,0,.2);r.foreL.rotation.set(-.4-1.3*up,0,0);r.armR.rotation.set(-.1,0,-.1);r.head.rotation.x=-up*.35;b.rotation.x=-up*.05;break;}
  case 'drink':a.act='sit';break;}}
// ---------- talk bubbles ----------
const bubbles=[];let lastLine='';
function speak(a,text){if(!a.o.visible)return;const el=document.createElement('div');el.className='bark';el.textContent=text;stage.append(el);bubbles.push({a,el,t:performance.now()});a.barkT=performance.now();}
function barkLines(a){const ph=phaseNow(),hurt=H0.hp<H0.max*.5,L=[];const tod=worldTime;
  if(WX.rain>.4)L.push('Ну и льёт…','Скорей бы под крышу.','Дождь — рыбе радость.');
  if(hurt)L.push('Ты весь в крови! Сходи к травнице.','Эй, держись на ногах!');
  if(chapel.lit)L.push('Огонь в часовне! Спасибо тебе.','Ночью снова можно спать спокойно.');
  else L.push('Говорят, в руинах опять кто-то бродит.','Не ходи ночью к кладбищу.');
  if(Q.band.state===3)L.push('Разбойников больше нет, слава морю.');
  if(ph==='tavern')L.push('Пойдём, выпьем у Брама!','Слышал новую песню Брама?');
  L.push(tod<.4?'Доброе утро!':tod<.72?'Добрый день.':'Доброго вечера.');
  const own={chop:['Дерево само себя не нарубит.'],sell:['Свежая рыба! Яблоки!','Подходи, не стесняйся!'],sweep:['Опять натоптали…'],patrol:['Порядок на острове.','Не балуй.'],
    fish1:['Клюёт плохо сегодня.'],fish2:['Тише, рыбу распугаешь.'],field:['Земля в этом году добрая.'],chat1:['А я ей и говорю…'],chat2:['Да ты что!']}[a.act||a.role]||[];
  return L.concat(own,own);}
function barkTick(now){for(let i=bubbles.length-1;i>=0;i--){const B=bubbles[i],age=now-B.t;if(age>3200||!B.a.o.visible||paused){B.el.remove();bubbles.splice(i,1);continue;}
    const v=B.a.o.position.clone();v.y+=1.45;v.project(camera);const r=canvas.getBoundingClientRect();B.el.style.left=(v.x+1)/2*r.width+'px';B.el.style.top=(1-v.y)/2*r.height+'px';B.el.style.opacity=age>2700?String((3200-age)/500):'1';}
  // one voice at a time, never over a conversation, no line twice in a row
  if(CB.on||paused||!talkEl.hidden||bubbles.length)return;
  for(const a of actors){if(!a.npc||a.hidden||!a.o.visible||a.barkT>now-22000)continue;const d=Math.hypot(a.px-H0.px,a.pz-H0.pz);
    if(d<3.2&&Math.random()<.02){speak(a,lastLine=PEOPLE[a.npc]?personBark(a):pickLine(a,'b',barkLines(a)));a.face=Math.atan2(H0.px-a.px,H0.pz-a.pz);if(!a.route)a.greetT=now+1600;break;}}
  // villagers chatting with each other nearby
  const pair=[V.find(v=>v.act==='chat1'),V.find(v=>v.act==='chat2')];if(pair[0]&&pair[1]&&Math.hypot(pair[0].px-H0.px,pair[0].pz-H0.pz)<9&&Math.random()<.006){const s=pair[Math.random()<.5?0:1];
    if(s.barkT<now-6000||!s.barkT){const L=['А рыбак-то, слышала, снова сети порвал!','Брам новое пиво сварил.','Травница говорит, скоро шторм.','Ох, мои колени к дождю…','Чужак-то наш, видать, не робкого десятка.'];speak(s,L[Math.floor(Math.random()*L.length)]);}}
  // a busy tavern hums
  if(AC&&AMB.crowd){const n=room===TAV?V.filter(v=>v.where==='tavern').length:0;AMB.crowd.gain.setTargetAtTime(muted?0:Math.min(.05,n*.008),AC.currentTime,.5);}}

// ---------- animals ----------
const critters=[];
function makeCritter(kind){const g=new THREE.Group(),C=(c,x,y,z,w,h,d,p=g)=>{const m=new THREE.Mesh(box(w,h,d),new THREE.MeshLambertMaterial({color:c}));m.position.set(x,y,z);m.castShadow=true;p.add(m);return m;};const parts={};
  if(kind==='deer'){C(0x8a5a34,0,.42,0,.22,.2,.5);for(const [x,z] of [[-.07,-.18],[.07,-.18],[-.07,.18],[.07,.18]])C(0x6a4428,x,.18,z,.05,.34,.05);parts.head=C(0x8a5a34,0,.62,.28,.14,.14,.16);C(0xe8dcc0,0,.4,-.25,.08,.08,.04);
    for(const s of [-1,1]){C(0xd8c8a0,s*.06,.76,.26,.02,.14,.02);C(0xd8c8a0,s*.09,.82,.24,.06,.02,.02);}}
  if(kind==='rabbit'){C(0x9a8a78,0,.09,0,.12,.1,.16);parts.head=C(0x9a8a78,0,.15,.09,.08,.08,.08);for(const s of [-1,1])C(0x9a8a78,s*.02,.23,.08,.02,.1,.02);C(0xf0f0f0,0,.1,-.09,.04,.04,.03);}
  if(kind==='chicken'){C(0xf0ece0,0,.12,0,.12,.12,.16);parts.head=C(0xf0ece0,0,.22,.07,.07,.08,.07);C(0xd83a2a,0,.27,.07,.02,.04,.05);C(0xe8a030,0,.21,.12,.03,.02,.04);for(const s of [-1,1])C(0xe8a030,s*.03,.03,0,.02,.06,.02);}
  if(kind==='crow'||kind==='gull'){const col=kind==='crow'?0x1e1e24:0xf0f0f4;C(col,0,.07,0,.08,.07,.16);parts.head=C(col,0,.11,.08,.06,.06,.06);C(kind==='crow'?0x2a2a2a:0xe8a030,0,.1,.12,.02,.02,.04);
    parts.wl=C(col,-.08,.09,0,.12,.015,.1);parts.wr=C(col,.08,.09,0,.12,.015,.1);if(kind==='gull'){parts.wl.material=parts.wr.material=new THREE.MeshLambertMaterial({color:0xc8ccd4});}}
  if(kind==='dog'){C(0x8a6a44,0,.2,0,.16,.14,.36);for(const [x,z] of [[-.05,-.12],[.05,-.12],[-.05,.12],[.05,.12]])C(0x6a4a2a,x,.07,z,.05,.14,.05);parts.head=C(0x8a6a44,0,.3,.22,.14,.12,.14);
    C(0x2a2a2a,0,.29,.3,.05,.04,.04);for(const s of [-1,1])C(0x6a4a2a,s*.05,.38,.2,.04,.06,.03);parts.tail=C(0x8a6a44,0,.28,-.2,.03,.03,.12);}
  scene.add(g);return {kind,g,parts};}
function spawnCritter(kind,area,r,o={}){const c=Object.assign(makeCritter(kind),{area,r,ph:Math.random()*9,state:'idle',t:0},o);const [x,z]=nearFree(area[0]+Math.round((Math.random()-.5)*r),area[1]+Math.round((Math.random()-.5)*r),4);
  c.x=x+.5;c.z=z+.5;c.tx=c.x;c.tz=c.z;c.y=0;critters.push(c);return c;}
for(let i=0;i<4;i++)spawnCritter('deer',[58,38],14);for(let i=0;i<5;i++)spawnCritter('rabbit',[40,46],18);for(let i=0;i<5;i++)spawnCritter('chicken',[22,33],6);
for(let i=0;i<4;i++)spawnCritter('crow',[52,12],10);for(let i=0;i<5;i++)spawnCritter('gull',[4,31],10,{fly:true,y:2.5});
const dog=spawnCritter('dog',[24,30],4,{dog:true});
function critterTick(dt,t){const hx=H0.px,hz=H0.pz,fx=focus.x,fz=focus.z;
  for(const c of critters){const far=Math.abs(c.x-fx)>18||Math.abs(c.z-fz)>16;c.g.visible=!room&&!far&&!(c.kind==='chicken'&&phaseNow()==='home');if(far||room)continue;
    const dh=Math.hypot(c.x-hx,c.z-hz),k=c.kind;
    if(k==='gull'){c.ang=(c.ang||c.ph)+dt*.5;const R=4+Math.sin(c.ph)*2;c.x=c.area[0]+Math.cos(c.ang)*R;c.z=c.area[1]+Math.sin(c.ang)*R;c.g.position.set(c.x,2.6+Math.sin(t+c.ph)*.3,c.z);c.g.rotation.y=-c.ang;
      const f=Math.sin(t*6+c.ph)*.5;c.parts.wl.rotation.z=f;c.parts.wr.rotation.z=-f;continue;}
    if(c.dog){const tgt=Math.hypot(hx-Z.village[0],hz-Z.village[1])<16&&!room?[hx-1,hz+1]:c.area;const dd=Math.hypot(tgt[0]-c.x,tgt[1]-c.z);
      if(dd>1.4&&free(Math.floor(c.x+(tgt[0]-c.x)/dd*.3),Math.floor(c.z+(tgt[1]-c.z)/dd*.3))){const s=Math.min(dd-1,dt*3.2);c.x+=(tgt[0]-c.x)/dd*s;c.z+=(tgt[1]-c.z)/dd*s;c.g.rotation.y=Math.atan2(tgt[0]-c.x,tgt[1]-c.z);c.moving=true;}else c.moving=false;
      c.parts.tail.rotation.y=Math.sin(t*14)*.6;c.g.position.set(c.x,groundAt(c.x,c.z)+(c.moving?Math.abs(Math.sin(t*14))*.04:0),c.z);if(c.moving&&Math.random()<dt*.15&&dh<5)sfx('bark');continue;}
    // flee from the hero (birds take off), otherwise wander and graze
    const spook=k==='deer'?(H0.sneak?2.5:5.5):k==='crow'?(H0.sneak?1.8:3.5):k==='rabbit'?(H0.sneak?1.5:3):1.2;
    if(dh<spook&&c.state!=='flee'){c.state='flee';c.t=0;if(k==='crow')sfx('flap');const ax=(c.x-hx)/dh,az=(c.z-hz)/dh;c.tx=c.x+ax*8;c.tz=c.z+az*8;}
    if(c.state==='flee'){c.t+=dt;const sp=k==='deer'?4.2:k==='rabbit'?3.6:k==='crow'?3:2;const dx=c.tx-c.x,dz=c.tz-c.z,d=Math.hypot(dx,dz);
      if(k==='crow'){c.y=Math.min(4,c.y+dt*2.2);c.x+=dx/d*sp*dt;c.z+=dz/d*sp*dt;const f=Math.sin(t*20)*.7;c.parts.wl.rotation.z=f;c.parts.wr.rotation.z=-f;}
      else if(d>.2&&free(Math.floor(c.x+dx/d*.4),Math.floor(c.z+dz/d*.4))){c.x+=dx/d*sp*dt;c.z+=dz/d*sp*dt;}else c.t=9;
      c.g.rotation.y=Math.atan2(dx,dz);if(c.t>(k==='crow'?4:3)){c.state='idle';if(k==='crow'){c.y=0;const [x,z]=nearFree(c.area[0]+Math.round((Math.random()-.5)*c.r),c.area[1]+Math.round((Math.random()-.5)*c.r));c.x=x+.5;c.z=z+.5;}c.tx=c.x;c.tz=c.z;}}
    else{c.t+=dt;if(c.t>2+Math.random()*4){c.t=0;const [x,z]=nearFree(Math.floor(c.x+(Math.random()-.5)*4),Math.floor(c.z+(Math.random()-.5)*4),1);if(Math.hypot(x-c.area[0],z-c.area[1])<c.r){c.tx=x+.5;c.tz=z+.5;}}
      const dx=c.tx-c.x,dz=c.tz-c.z,d=Math.hypot(dx,dz);if(d>.05){const sp=k==='deer'?.8:k==='rabbit'?1.4:.6;c.x+=dx/d*Math.min(d,sp*dt);c.z+=dz/d*Math.min(d,sp*dt);c.g.rotation.y=Math.atan2(dx,dz);c.moving=true;}else c.moving=false;
      if(c.parts.head)c.parts.head.rotation.x=c.moving?0:Math.max(0,Math.sin(t*(k==='chicken'?5:1.2)+c.ph))*(k==='chicken'?.8:.6);
      if(c.parts.wl){c.parts.wl.rotation.z=0;c.parts.wr.rotation.z=0;}}
    const hop=(k==='rabbit'&&(c.moving||c.state==='flee'))?Math.abs(Math.sin(t*12+c.ph))*.12:(k==='deer'&&c.state==='flee')?Math.abs(Math.sin(t*10))*.15:0;
    c.g.position.set(c.x,groundAt(c.x,c.z)+(c.y||0)+hop,c.z);}}

// ---------- events on the roads ----------
const ROADS=[];for(let z=0;z<OUT_H;z++)for(let x=0;x<W;x++)if(at(x,z)==='D'&&!solid.has(x+','+z))ROADS.push([x,z]);
let EV=null,evNext=performance.now()+90000;
function eventTick(now){if(CB.on||room||paused)return;
  if(EV){const tr=EV.trav,alive=EV.foes.filter(e=>!e.dead);
    if(!alive.length&&!EV.done){EV.done=true;tr.act=null;speak(tr,'Спасибо! Ты спас мне жизнь!');setTimeout(()=>{if(man(tr,H0)<6){window.handsGive([['potion',1],['bread',1]],'Благодарность путника');}
        goTo(tr,Z.village,()=>{tr.dead=true;tr.o.visible=false;});EV=null;evNext=now+150000+Math.random()*120000;},1200);}
    else if(!EV.done&&now-EV.t>150000){speak(tr,'Бегу!');goTo(tr,Z.village,()=>{tr.dead=true;tr.o.visible=false;});for(const e of alive){e.dead=true;e.o.visible=false;}EV=null;evNext=now+120000;}
    else if(!EV.done&&!EV.seen&&man(tr,H0)<14){EV.seen=true;speak(tr,'Помогите! Волки!');sfx('notice');}
    return;}
  if(now<evNext||phaseNow()==='home')return;
  const cand=ROADS.filter(([x,z])=>{const d=Math.hypot(x-H0.x,z-H0.z);return d>10&&d<16&&Math.hypot(x-Z.village[0],z-Z.village[1])>12;});if(!cand.length){evNext=now+20000;return;}
  const [x,z]=cand[Math.floor(Math.random()*cand.length)];const trav=villager('Путник',LOOKS2[Math.floor(Math.random()*LOOKS2.length)],{role:'trav',home:[x,z],house:0});trav.act='chat1';trav.villager=false;
  const foes=[];for(const [dx,dz] of [[2,1],[-2,1]]){const [fx,fz]=nearFree(x+dx,z+dz,3);const w=foe('wolf',fx,fz,{wander:0,temp:true});addBar(w);w.face=Math.atan2(trav.px-w.px,trav.pz-w.pz);foes.push(w);}
  EV={trav,foes,t:now};questFocus=null;}
