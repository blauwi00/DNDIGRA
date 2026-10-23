// ---------- combat: explore in real time, fight in turns (D&D 5e flavour) ----------
// Outside a fight the hero walks freely. An enemy that sees the hero starts a
// fight: initiative is rolled and everyone acts in turn. On the hero's turn there
// are 6 cells of movement, one action and one bonus action. Every verb lives on a
// wheel that opens around the tapped character; there are no screen buttons.
const hpf=document.getElementById('hpf'),hpl=document.getElementById('hpl'),dice=document.getElementById('dice');
const rollEl=document.getElementById('roll'),orderEl=document.getElementById('order'),cstat=document.getElementById('cstat');
const d=n=>1+Math.floor(Math.random()*n),wait=ms=>new Promise(r=>setTimeout(r,ms));
const reduceM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const man=(a,b)=>Math.abs(a.x-b.x)+Math.abs(a.z-b.z);
let busy=false,shake=0;
const CB={on:false,order:[],i:-1,round:0,move:0,acted:false,bonus:false,sneakUsed:false};
// class sheets; the editor picks one. melee/ranged/spell are to-hit bonuses, *b are damage bonuses
const CLASSES={
  fighter:{n:'Воин',hp:20,ac:13,speed:6,melee:5,mb:3,ranged:3,rb:1,spell:1,stealth:1,athletics:5,dex:1,start:['shield','sword'],
    about:'Крепкий и надёжный. Второе дыхание: бонусным действием лечит 1к10 + 2 раз до отдыха.'},
  rogue:{n:'Плут',hp:16,ac:14,speed:6,melee:5,mb:3,ranged:5,rb:3,spell:1,stealth:7,athletics:2,dex:3,start:[null,'dagger'],
    about:'Тихий и точный. Скрытая атака: +2к6 урона при преимуществе. Рывок: бонусным действием ещё 6 клеток.'},
  mage:{n:'Маг',hp:14,ac:12,speed:6,melee:2,mb:0,ranged:2,rb:0,spell:5,stealth:2,athletics:0,dex:2,start:['staff',null],
    about:'Хрупкий, но опасный издалека. Искра 1к10 на 6 клеток. Магическая стрела: три снаряда без промаха, 2 раза до отдыха.'}};
let HERO=Object.assign({cls:'fighter'},CLASSES.fighter);
const SP={wind:1,missiles:2};const rest=()=>{SP.wind=1;SP.missiles=2;};
// attack options from what the hero holds in each hand
function heroAttacks(){const h=hero.userData.held||{},o=[],H=HERO;
  const add=(id,n,hit,die,k,b,range,kind,hand)=>o.push({id,n,hit,die,k,b,range,kind,hand});
  if(h.two==='bow')add('bow','Лук',H.ranged,8,1,H.rb,8,'bow','обе руки');
  if(h.two==='staff'){add('staff','Искра',H.spell,10,1,0,6,'spell','посох');add('staff','Посох',H.melee,6,1,H.mb,1,'melee','обе руки');}
  for(const [side,id] of [['правая',h.R],['левая',h.L]]){if(id==='sword')add(id,'Меч',H.melee,8,1,H.mb,1,'melee',side);if(id==='dagger')add(id,'Кинжал',H.melee,4,1,H.mb,1,'melee',side);
    if(id==='torch')add(id,'Факел',H.melee-1,4,1,H.mb,1,'melee',side);if(id==='shield'&&!o.length&&!(h.R==='sword'||h.R==='dagger'||h.R==='torch'))add(id,'Щит',H.melee-2,4,1,1,1,'melee',side);}
  if(!o.length)add(null,'Кулак',H.melee-2,1,1,1,1,'melee','без оружия');
  return o;}
function heroAC(){const h=hero.userData.held||{};return HERO.ac+((h.L==='shield'||h.R==='shield')?2:0);}
const acOf=a=>a===H0?heroAC():a.ac;
function hostileNear(a){return a===H0?enemies.some(e=>!e.dead&&e.inFight&&man(e,H0)===1):man(a,H0)===1;}
function advantage(att,def,opt){let A=[],D=[];
  if(def.enemy&&!def.aware)A.push('из тени');if(def.distracted)A.push('цель отвлечена');
  if(def.prone)(opt.range>1?D:A).push('цель лежит');if(opt.range>1&&hostileNear(att))D.push('враг вплотную');
  return {v:A.length&&!D.length?1:D.length&&!A.length?-1:0,why:(A.length&&!D.length?A:D.length&&!A.length?D:[]).join(', ')};}
function chance(mod,dc,adv){const p=Math.min(.95,Math.max(.05,(21-(dc-mod))/20));return Math.round(100*(adv>0?1-(1-p)**2:adv<0?p*p:p));}

// ---------- dice: a slim strip at the top, the scene stays visible ----------
let rollHide=0;
async function roll20(label,mod,dc,adv=0,why=''){clearTimeout(rollHide);sfx('dice');
  const a=d(20),b=adv?d(20):null,r=adv>0?Math.max(a,b):adv<0?Math.min(a,b):a;
  rollEl.hidden=false;rollEl.innerHTML='<span class="lbl"></span><span class="d20">20</span>'+(adv?'<span class="d20">20</span>':'')+'<span class="res"></span>';
  rollEl.querySelector('.lbl').textContent=label+(adv?(adv>0?' · преимущество':' · помеха'):'');rollEl.title=why;
  const ds=[...rollEl.querySelectorAll('.d20')],res=rollEl.querySelector('.res');
  ds.forEach(x=>x.classList.add('spin'));for(let k=0;k<(reduceM?1:9);k++){ds.forEach(x=>x.textContent=d(20));await wait(45+k*8);}
  ds.forEach(x=>x.classList.remove('spin'));ds[0].textContent=a;if(b!=null){ds[1].textContent=b;ds[(adv>0?a>=b:a<=b)?1:0].classList.add('drop');}
  const crit=r===20,fumble=r===1,total=r+mod,ok=crit||(!fumble&&total>=dc);if(crit)sfx('crit');
  ds.forEach(x=>{if(!x.classList.contains('drop'))x.classList.add(crit?'crit':ok?'ok':'no')});
  res.innerHTML=(mod>=0?'+':'−')+Math.abs(mod)+' = <b>'+total+'</b> / '+dc+' <b class="'+(ok?'ok':'no')+'">'+(crit?'крит!':fumble?'провал':ok?'успех':'мимо')+'</b>';
  await wait(reduceM?300:800);return {r,ok,crit,total};}
async function rollDamage(opt,crit,extra=0){const n=opt.k*(crit?2:1);let s=opt.b;for(let i=0;i<n;i++)s+=d(opt.die);let ex=0;for(let i=0;i<extra*(crit?2:1);i++)ex+=d(6);s+=ex;
  const p=document.createElement('span');p.className='dmg';p.innerHTML='урон <b>'+Math.max(1,s)+'</b>'+(ex?' (скрытая +'+ex+')':'');rollEl.append(p);await wait(reduceM?200:550);return Math.max(1,s);}
function rollDone(ms=1600){clearTimeout(rollHide);rollHide=setTimeout(()=>rollEl.hidden=true,ms);}

// ---------- animation helpers ----------
function floatText(text,color,obj){const v=obj.position.clone();v.y+=1.2;v.project(camera);const r=canvas.getBoundingClientRect();
  const el=document.createElement('div');el.className='float';el.textContent=text;el.style.color=color;el.style.left=((v.x+1)/2*r.width)+'px';el.style.top=((1-v.y)/2*r.height)+'px';
  stage.appendChild(el);requestAnimationFrame(()=>{el.style.transform='translate(-50%,-140%)';el.style.opacity='0'});setTimeout(()=>el.remove(),950)}
const anims=[];function tween(ms,fn){return new Promise(res=>anims.push({t0:performance.now(),ms,fn,res}))}
const flash=(a,c=0xffffff)=>{a.o.userData.mats.forEach(m=>m.emissive&&m.emissive.setHex(c));setTimeout(()=>a.o.userData.mats.forEach(m=>m.emissive&&m.emissive.setHex(0)),140);};
async function lunge(att,def){const dx=def.px-att.px,dz=def.pz-att.pz,len=Math.hypot(dx,dz)||1,reach=Math.min(.45,len-.4);
  att.face=Math.atan2(dx,dz);await tween(320,k=>{att.off=[-dx/len*.14*k,-dz/len*.14*k];att.lean=-.2*k});sfx('swing');
  await tween(150,k=>{att.off=[dx/len*(reach*k-.14*(1-k)),dz/len*(reach*k-.14*(1-k))];att.lean=.35*k});return ()=>tween(300,k=>{att.off=[dx/len*reach*(1-k),dz/len*reach*(1-k)];att.lean=.35*(1-k)}).then(()=>{att.off=null;att.lean=0});}
async function projectile(a,b,kind){sfx(kind==='spell'?'spell':'bow');const spell=kind==='spell',m=new THREE.Mesh(spell?box(.16,.16,.16):box(.04,.04,.42),new THREE.MeshBasicMaterial({color:spell?0xff8a2a:kind==='missile'?0xb08aff:0xe8e0c8}));scene.add(m);
  const y0=groundAt(a.x,a.z)+.65,y1=groundAt(b.x,b.z)+.6,ms=200+man(a,b)*55;
  await tween(ms,k=>{m.position.set(a.px+(b.px-a.px)*k,y0+(y1-y0)*k+Math.sin(k*Math.PI)*(spell?.2:.5),a.pz+(b.pz-a.pz)*k);m.lookAt(b.px,y1,b.pz);if(spell)m.rotation.z=k*9});scene.remove(m);}
function knock(def,att,dmg,col){sfx('hit');flash(def);shake=dmg>6?.2:.12;floatText('-'+dmg,col,def.o);const dx=def.px-att.px,dz=def.pz-att.pz,l=Math.hypot(dx,dz)||1;
  return tween(260,k=>{def.off=[dx/l*.22*Math.sin(k*Math.PI),dz/l*.22*Math.sin(k*Math.PI)]}).then(()=>def.off=null);}

// ---------- one attack, any attacker ----------
async function attack(att,def,opt){if(def.dead)return;att.face=Math.atan2(def.px-att.px,def.pz-att.pz);
  const adv=advantage(att,def,opt),isHero=att===H0;
  const res=await roll20((isHero?opt.n:att.name+': '+opt.n)+' → '+(def===H0?'вы':def.name),opt.hit,acOf(def),adv.v,adv.why);
  const ranged=opt.range>1&&man(att,def)>1;let back=null;
  if(ranged)await projectile(att,def,opt.kind);else back=await lunge(att,def);
  // rogue: sneak attack once per turn when attacking with advantage
  const sneak=isHero&&HERO.cls==='rogue'&&adv.v>0&&!CB.sneakUsed&&opt.kind!=='spell'?2:0;if(sneak&&res.ok)CB.sneakUsed=true;
  let dmg=0;if(res.ok)dmg=await rollDamage(opt,res.crit,sneak);
  if(dmg)await knock(def,att,dmg,isHero?'#ffd27a':'#ff7d6e');else{sfx('miss');floatText('Промах','#cfc6b4',def.o);}if(back)await back();
  if(def.enemy){def.aware=true;def.distracted=false;}
  if(dmg)hurt(def,dmg);rollDone();}
function hurt(def,dmg){def.hp-=dmg;if(def===H0){setHP();if(H0.hp<=0)knockOut();}else if(def.hp<=0)kill(def);}
function setHP(){hpf.style.width=Math.max(0,H0.hp/H0.max*100)+'%';hpl.textContent=H0.name+' · '+HERO.n+' · '+Math.max(0,H0.hp)+' / '+H0.max;}
function kill(e){sfx('death');e.dead=true;e.route=null;questKill(e);tween(600,k=>{e.o.rotation.z=k*1.4;e.sink=k*.12});setTimeout(()=>{e.o.visible=false},1800);
  floatText(e.name+' повержен','#f2c14e',e.o);}

// ---------- tricks ----------
async function shove(def){const r2=d(20)+(def.ath||2);const res=await roll20('Толчок: Атлетика',HERO.athletics,r2);
  const back=await lunge(H0,def);
  if(res.ok){const dx=Math.sign(def.x-H0.x),dz=Math.sign(def.z-H0.z),nx=def.x+dx,nz=def.z+dz;
    if(free(nx,nz)&&!occupied(nx,nz,def)){await tween(220,k=>{def.px=def.x+.5+dx*k;def.pz=def.z+.5+dz*k});def.x=nx;def.z=nz;}
    def.prone=true;def.lean=-1.3;floatText('Сбит с ног','#f2c14e',def.o);def.aware=true;}
  else floatText('Устоял','#cfc6b4',def.o);await back();rollDone();}
const stones=()=>window.handsCount?window.handsCount('stone'):0;
async function stoneAt(x,z){window.handsConsume&&window.handsConsume('stone');const s=new THREE.Mesh(box(.1,.1,.1),lam(T.stone));scene.add(s);const y0=groundAt(H0.x,H0.z)+.8,y1=groundAt(x,z)+.1;
  H0.face=Math.atan2(x+.5-H0.px,z+.5-H0.pz);const ms=300+Math.hypot(x-H0.x,z-H0.z)*60;
  await tween(ms,k=>s.position.set(H0.px+(x+.5-H0.px)*k,y0+(y1-y0)*k+Math.sin(k*Math.PI)*1.2,H0.pz+(z+.5-H0.pz)*k));setTimeout(()=>scene.remove(s),1500);}
// in a fight: a Wisdom save or the target loses its next move and the next hit on it has advantage
async function stoneFoe(def){await stoneAt(def.x,def.z);const res=await roll20(def.name+': спасбросок Мудрости',def.wis||0,12);
  if(!res.ok){def.distracted=true;floatText('Отвлечён','#9fc3cf',def.o);}else floatText('Не повёлся','#cfc6b4',def.o);rollDone();}
// out of a fight: throw past the enemy, to its side; a Stealth check decides if it goes to look
function noiseCellNear(e){const sx=Math.sign(e.x-H0.x)||1,sz=Math.sign(e.z-H0.z)||1;
  for(const [dx,dz] of [[sz*3,-sx*3],[-sz*3,sx*3],[sx*3,sz*3],[sz*2,-sx*2],[-sz*2,sx*2]]){const x=e.x+dx,z=e.z+dz;if(free(x,z))return [x,z];}return [e.x+sx*2,e.z+sz*2];}
async function stoneNoise(x,z){busy=true;await stoneAt(x,z);const near=enemies.filter(e=>!e.dead&&!e.aware&&Math.hypot(e.x-x,e.z-z)<=7&&!room);
  const dc=near.length?Math.max(...near.map(e=>e.perc)):10;const res=await roll20('Бросок камня: Скрытность',HERO.stealth,dc);busy=false;rollDone();
  if(!near.length){toast('Камень упал. Рядом никого.');return;}
  if(res.ok){for(const e of near){e.investigate={x,z,t:0};e.route=null;floatText('?','#9fc3cf',e.o);}toast('Враги идут проверить шум. Зайдите со спины.');}
  else{floatText('!','#ff5a4a',near[0].o);startCombat(near[0]);}}
// class specials
async function magicMissile(def){SP.missiles--;floatText('Магическая стрела','#c8a8ff',hero);let tot=0;
  for(let i=0;i<3;i++){await projectile(H0,def,'missile');const v=d(4)+1;tot+=v;flash(def,0x8a5aff);floatText('-'+v,'#c8a8ff',def.o);await wait(120);}
  rollEl.hidden=false;rollEl.innerHTML='<span class="lbl">Магическая стрела → '+def.name+'</span><span class="res">3 × (1к4 + 1) = <b>'+tot+'</b> без промаха</span>';
  def.aware=true;hurt(def,tot);rollDone();}
function secondWind(){SP.wind=0;const heal=d(10)+2;sfx('heal');H0.hp=Math.min(H0.max,H0.hp+heal);setHP();floatText('+'+heal,'#7fe08a',hero);toast('Второе дыхание: 1к10 + 2 = '+heal);}
function dash(){CB.move+=6;floatText('Рывок','#9fe0ff',hero);showMoves();}

// ---------- doing a chosen verb (from the wheel) ----------
async function approach(e){const p=path(H0.x,H0.z,e.x,e.z,H0,true,3000);if(!p)return false;if(!p.length)return true;
  if(CB.on){if(p.length>CB.move)return false;CB.move-=p.length;}
  await walk(H0,p);return man(H0,e)===1;}
function walk(a,route){a.route=route.slice();a.dest=route[route.length-1];return new Promise(res=>{const t=setInterval(()=>{if(!a.route||a.dead){clearInterval(t);res();}},40)});}
// kind: 'action' spends the action, 'bonus' the bonus action; adj: walk next to the target first
async function doVerb(e,run,{adj=false,kind='action'}={}){if(busy)return;
  if(CB.on&&!heroTurn())return toast('Сейчас ход противника.');
  if(CB.on&&kind==='action'&&CB.acted)return toast('Действие уже потрачено. Двигайтесь или закончите ход.');
  if(CB.on&&kind==='bonus'&&CB.bonus)return toast('Бонусное действие уже потрачено.');
  busy=true;clearMoves();
  if(adj&&!(await approach(e))){busy=false;toast('Не дойти до цели.');if(CB.on)showMoves();return;}
  if(!CB.on&&e&&e.enemy)await startCombat(e,!e.aware,true);
  await run();if(CB.on){if(kind==='action')CB.acted=true;if(kind==='bonus')CB.bonus=true;}busy=false;afterHeroAct();}
const reachable=e=>man(e,H0)===1||(CB.on?moveCells().some(c=>Math.abs(c[0]-e.x)+Math.abs(c[1]-e.z)===1):true);

// ---------- turns ----------
const heroTurn=()=>CB.on&&CB.order[CB.i]===H0;
async function startCombat(trigger,surprise=false,heroFirst=false){if(CB.on||H0.dead)return;CB.on=true;H0.route=null;H0.arrive=null;H0.sneak=false;H0.spd=2.4;closeWheel();
  const foes=enemies.filter(e=>!e.dead&&e.o.visible&&(e===trigger||Math.hypot(e.x-trigger.x,e.z-trigger.z)<=5));
  for(const e of foes){e.route=null;e.investigate=null;e.inFight=true;if(!surprise||e!==trigger)e.aware=true;}
  const ini=[{a:H0,v:d(20)+HERO.dex},...foes.map(e=>({a:e,v:d(20)+(e.dex||0)}))].sort((x,y)=>y.v-x.v);
  if(heroFirst){const k=ini.findIndex(o=>o.a===H0);ini.unshift(ini.splice(k,1)[0]);}
  if(surprise)trigger.surprised=true;
  CB.order=ini.map(o=>o.a);CB.round=1;CB.i=heroFirst?0:-1;CB.move=HERO.speed;CB.acted=false;CB.bonus=false;CB.sneakUsed=false;
  sfx('fight');banner(surprise?'Внезапная атака!':'Бой!');renderOrder();
  toast('Инициатива: '+ini.map(o=>(o.a===H0?'вы':o.a.name)+' '+o.v).join(', ')+(surprise?'. Враг застигнут врасплох.':''),3500);
  if(!heroFirst){await wait(1100);nextTurn();}}
function joinFight(e){if(CB.order.includes(e))return;e.inFight=true;e.aware=true;e.route=null;CB.order.push(e);floatText('!','#ff5a4a',e.o);renderOrder();}
function banner(t){const z=document.getElementById('zone');z.textContent=t;z.classList.remove('show');void z.offsetWidth;z.classList.add('show');}
function liveFoes(){return CB.order.filter(a=>a!==H0&&!a.dead);}
function endCombat(text){CB.on=false;CB.order=[];clearMoves();closeWheel();renderOrder();
  for(const e of enemies){e.inFight=false;e.surprised=false;e.distracted=false;if(e.prone){e.prone=false;e.lean=0;}}if(text){banner(text);toast(text);}}
const victory=()=>endCombat(enemies.every(x=>x.dead)?'Победа. Остров зачищен.':'Победа.');
async function nextTurn(){if(!CB.on||H0.dead)return;if(!liveFoes().length)return victory();
  CB.i++;if(CB.i>=CB.order.length){CB.i=0;CB.round++;}const a=CB.order[CB.i];if(a.dead)return nextTurn();
  if(a===H0){CB.move=HERO.speed;CB.acted=false;CB.bonus=false;CB.sneakUsed=false;renderOrder();showMoves();return;}
  renderOrder();clearMoves();await wait(450);
  if(a.surprised){a.surprised=false;floatText('Застигнут врасплох','#9fc3cf',a.o);await wait(900);return nextTurn();}
  await enemyTurn(a);if(H0.dead||!CB.on)return;await wait(350);nextTurn();}
function afterHeroAct(){if(!CB.on)return;if(!liveFoes().length)return victory();renderOrder();if(CB.move>0)showMoves();
  if(CB.acted&&CB.move<=0)setTimeout(()=>heroTurn()&&!busy&&endHeroTurn(),900);}
function endHeroTurn(){if(!heroTurn()||busy)return;clearMoves();closeWheel();
  if(liveFoes().every(e=>man(e,H0)>12)){for(const e of liveFoes())e.aware=false;return endCombat('Вы оторвались от погони.');}nextTurn();}
async function enemyTurn(e){
  if(e.prone){e.prone=false;e.lean=0;floatText('Встаёт','#cfc6b4',e.o);await wait(600);}
  if(e.distracted){e.distracted=false;e.face+=Math.PI;floatText('Отвлёкся на шум','#9fc3cf',e.o);await wait(900);return;}
  const range=e.range||1,mv=e.speed||6;
  if(man(e,H0)>range){const p=path(e.x,e.z,H0.x,H0.z,e,true,2000);if(p&&p.length){let route=p.slice(0,mv);
    if(range>1){const k=p.findIndex(c=>Math.abs(c[0]-H0.x)+Math.abs(c[1]-H0.z)<=range);if(k>=0)route=p.slice(0,Math.min(mv,k+1));}await walk(e,route);}}
  if(man(e,H0)<=range&&!H0.dead)await attack(e,H0,{n:e.atkName||'Удар',hit:e.atk,die:e.dmg,k:e.dmgK||1,b:e.dmgB??1,range,kind:range>1?'bow':'melee'});}

// ---------- movement tiles on the hero's turn ----------
const tilePool=[],tileMat=new THREE.MeshBasicMaterial({color:0x7fd0ff,transparent:true,opacity:.22,depthWrite:false});
function moveCells(){const out=[],seen=new Set([H0.x+','+H0.z]),q=[[H0.x,H0.z,0]];
  while(q.length){const[x,z,n]=q.shift();if(n)out.push([x,z,n]);if(n>=CB.move)continue;for(const[dx,dz]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,nz=z+dz,k=nx+','+nz;
    if(seen.has(k)||!free(nx,nz)||occupied(nx,nz,H0))continue;seen.add(k);q.push([nx,nz,n+1]);}}return out;}
function showMoves(){clearMoves();if(!heroTurn()||CB.move<=0)return;moveCells().forEach(([x,z],i)=>{let m=tilePool[i];if(!m){m=new THREE.Mesh(new THREE.PlaneGeometry(.9,.9),tileMat);m.rotation.x=-Math.PI/2;m.renderOrder=2;scene.add(m);tilePool.push(m);}
  m.position.set(x+.5,groundAt(x,z)+.02,z+.5);m.visible=true;});}
function clearMoves(){tilePool.forEach(m=>m.visible=false);}
async function heroMove(tx,tz){const c=moveCells().find(c=>c[0]===tx&&c[1]===tz);if(!c){toast('Так далеко за ход не дойти: осталось '+CB.move+' кл.');return;}
  const p=path(H0.x,H0.z,tx,tz,H0,false,2000);if(!p)return;busy=true;clearMoves();CB.move-=p.length;renderOrder();await walk(H0,p);busy=false;afterHeroAct();}

// ---------- turn order and hero status, top of the screen ----------
function renderOrder(){orderEl.hidden=!CB.on;cstat.hidden=!heroTurn();if(!CB.on)return;orderEl.replaceChildren();
  const r=document.createElement('span');r.className='round';r.textContent='Раунд '+CB.round;orderEl.append(r);
  CB.order.forEach((a,i)=>{if(a.dead)return;const c=document.createElement('span');c.className='chip'+(i===CB.i?' now':'')+(a===H0?' me':'');
    c.textContent=(a===H0?'Вы':a.name)+(a!==H0?' '+Math.max(0,a.hp)+'/'+a.max:'');orderEl.append(c);});
  if(heroTurn())cstat.innerHTML='Ваш ход · шаги <b>'+CB.move+'</b> · действие '+(CB.acted?'<s>есть</s>':'<b>есть</b>')+' · бонус '+(CB.bonus?'<s>есть</s>':'<b>есть</b>')+'<br><small>нажмите на себя — конец хода и особые умения</small>';}
function knockOut(){H0.dead=true;H0.route=null;endCombat();toast('Вы теряете сознание…');tween(500,k=>{hero.rotation.z=k*1.4});
  setTimeout(()=>{H0.dead=false;hero.rotation.z=0;H0.hp=H0.max;rest();setRoom(null);H0.x=Z.dock[0]+1;H0.z=Z.dock[1];H0.px=H0.x+.5;H0.pz=H0.z+.5;setHP();
    for(const e of enemies)if(!e.dead){e.aware=false;e.route=null;e.hp=e.max;e.x=e.home[0];e.z=e.home[1];e.px=e.x+.5;e.pz=e.z+.5;}toast('Рыбаки нашли вас и принесли на причал. Здоровье восстановлено.',4000);},2400);}
