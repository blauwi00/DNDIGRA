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
{RACES}
{CLASSES}
const acOf=a=>a===H0?heroAC():a.ac;
function hostileNear(a){return a===H0?enemies.some(e=>!e.dead&&e.inFight&&man(e,H0)===1):man(a,H0)===1;}
function advantage(att,def,opt){let A=[],D=[];
  if(def.enemy&&!def.aware)A.push('из тени');if(def.distracted)A.push('цель отвлечена');
  if(def.prone)(opt.range>1?D:A).push('цель лежит');if(opt.range>1&&hostileNear(att))D.push('враг вплотную');
  return {v:A.length&&!D.length?1:D.length&&!A.length?-1:0,why:(A.length&&!D.length?A:D.length&&!A.length?D:[]).join(', ')};}
function chance(mod,dc,adv){const p=Math.min(.95,Math.max(.05,(21-(dc-mod))/20));return Math.round(100*(adv>0?1-(1-p)**2:adv<0?p*p:p));}

// ---------- dice: a slim strip at the top, the scene stays visible ----------
let rollHide=0;
async function roll20(label,mod,dc,adv=0,why='',lucky=false){clearTimeout(rollHide);sfx('dice');
  let a=d(20),b=adv?d(20):null;if(lucky){if(a===1)a=d(20);if(b===1)b=d(20);}const r=adv>0?Math.max(a,b):adv<0?Math.min(a,b):a;
  rollEl.hidden=false;rollEl.innerHTML='<span class="lbl"></span><span class="d20">20</span>'+(adv?'<span class="d20">20</span>':'')+'<span class="res"></span>';
  rollEl.querySelector('.lbl').textContent=label+(adv?(adv>0?' · преимущество':' · помеха'):'');rollEl.title=why;
  const ds=[...rollEl.querySelectorAll('.d20')],res=rollEl.querySelector('.res');
  ds.forEach(x=>x.classList.add('spin'));for(let k=0;k<(reduceM?1:9);k++){ds.forEach(x=>x.textContent=d(20));await wait(45+k*8);}
  ds.forEach(x=>x.classList.remove('spin'));ds[0].textContent=a;if(b!=null){ds[1].textContent=b;ds[(adv>0?a>=b:a<=b)?1:0].classList.add('drop');}
  const crit=r===20,fumble=r===1,total=r+mod,ok=crit||(!fumble&&total>=dc);if(crit)sfx('crit');
  ds.forEach(x=>{if(!x.classList.contains('drop'))x.classList.add(crit?'crit':ok?'ok':'no')});
  res.innerHTML=(mod>=0?'+':'−')+Math.abs(mod)+' = <b>'+total+'</b> / '+dc+' <b class="'+(ok?'ok':'no')+'">'+(crit?'крит!':fumble?'провал':ok?'успех':'мимо')+'</b>';
  await wait(reduceM?300:800);return {r,ok,crit,total};}
async function rollDamage(opt,crit,extra=[]){const n=opt.k*(crit?2:1);let s=opt.b;for(let i=0;i<n;i++)s+=d(opt.die);const notes=[];
  for(const [k,die,name] of extra){let v=0;for(let i=0;i<k*(crit?2:1);i++)v+=d(die);s+=v;notes.push(name+' +'+v);}
  const p=document.createElement('span');p.className='dmg';p.innerHTML='урон <b>'+Math.max(1,s)+'</b>'+(notes.length?' ('+notes.join(', ')+')':'');rollEl.append(p);await wait(reduceM?200:550);return Math.max(1,s);}
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
let opt0=null;async function projectile(a,b,kind){sfx(kind==='spell'?'spell':'bow');const spell=kind==='spell',m=new THREE.Mesh(spell?box(.16,.16,.16):box(.04,.04,.42),new THREE.MeshBasicMaterial({color:spell?(a===H0&&opt0&&WEAPONS[opt0.id]&&WEAPONS[opt0.id].m.gem||0xff8a2a):kind==='missile'?0xb08aff:0xe8e0c8}));scene.add(m);
  const y0=groundAt(a.x,a.z)+.65,y1=groundAt(b.x,b.z)+.6,ms=200+man(a,b)*55;
  await tween(ms,k=>{m.position.set(a.px+(b.px-a.px)*k,y0+(y1-y0)*k+Math.sin(k*Math.PI)*(spell?.2:.5),a.pz+(b.pz-a.pz)*k);m.lookAt(b.px,y1,b.pz);if(spell)m.rotation.z=k*9});scene.remove(m);}
function knock(def,att,dmg,col){sfx('hit');flash(def);shake=dmg>6?.2:.12;floatText('-'+dmg,col,def.o);const dx=def.px-att.px,dz=def.pz-att.pz,l=Math.hypot(dx,dz)||1;
  return tween(260,k=>{def.off=[dx/l*.22*Math.sin(k*Math.PI),dz/l*.22*Math.sin(k*Math.PI)]}).then(()=>def.off=null);}

// ---------- one attack, any attacker ----------
async function attack(att,def,opt){if(def.dead)return;CB.hitRound=CB.round;att.face=Math.atan2(def.px-att.px,def.pz-att.pz);
  const adv=advantage(att,def,opt),isHero=att===H0;
  // inspiration, an elf's memory or an echo fragment grant advantage on this attack
  if(isHero&&CB.boost){adv.v=adv.v<0?0:1;adv.why=(adv.why?adv.why+', ':'')+CB.boost;CB.boost=null;}
  // a rare weapon's own rule: the wolf fang strikes first with advantage
  const wr=isHero&&WEAPONS[opt.id];if(wr&&wr.first&&!CB.fangUsed){CB.fangUsed=true;adv.v=adv.v<0?0:1;adv.why=(adv.why?adv.why+', ':'')+wr.n.toLowerCase();}
  if(def===H0&&RACES[HERO.race]?.readMove&&!CB.readUsed){CB.readUsed=true;adv.v=adv.v>0?0:-1;adv.why=(adv.why?adv.why+', ':'')+'чтение движения';}
  if(isHero&&opt.save)return saveSpell(def,opt);
  let res=await roll20((isHero?opt.n:att.name+': '+opt.n)+' → '+(def===H0?'вы':def.name),opt.hit,acOf(def),adv.v,adv.why,isHero&&HERO.race==='halfling');
  if(isHero&&!res.ok&&RACES[HERO.race]?.reroll&&SP.frag){SP.frag=0;floatText('Эльфийская точность','#9ae0ff',hero);rollDone();await wait(350);
    res=await roll20(opt.n+' → '+def.name+' · переброс',opt.hit,acOf(def),adv.v,adv.why);}
  const ranged=opt.kind!=='melee'&&opt.range>1&&man(att,def)>1;let back=null;
  if(ranged){opt0=opt;await projectile(att,def,opt.kind);opt0=null;}else{const w=WEAPONS[opt.id]||(att!==H0&&att.o.userData.held&&WEAPONS[att.o.userData.held.R]);
    att.pose={type:'atk',style:w?w.kind:'fist',two:!!(w&&(w.two||w.kind==='spear'||w.kind==='staff')),t0:performance.now(),ms:820};back=await lunge(att,def);}
  // rogue: sneak attack once per turn when attacking with advantage
  const sneak=isHero&&HERO.cls==='rogue'&&adv.v>0&&!CB.sneakUsed&&opt.kind!=='spell'?2:0;if(sneak&&res.ok)CB.sneakUsed=true;
  // class riders: rage, smite, hunter's mark and hex
  const extra=[];if(isHero&&res.ok){if(sneak)extra.push([2,6,'скрытая']);if(opt.smite)extra.push([2,8,'кара']);if(CB.mark===def)extra.push([1,6,CB.markName]);if(CB.might&&opt.kind==='melee'){CB.might=false;extra.push([1,8,'сила великана']);}if(wr&&wr.vs&&def.name===wr.vs[0])extra.push([1,wr.vs[1],'упокоение']);if(wr&&wr.plus)extra.push([1,wr.plus,'руны']);}
  if(isHero&&CB.rage&&opt.kind==='melee')opt=Object.assign({},opt,{b:opt.b+2});
  let dmg=0;if(res.ok)dmg=await rollDamage(opt,res.crit,extra);
  if(dmg)await knock(def,att,dmg,isHero?'#ffd27a':'#ff7d6e');else{sfx('miss');floatText('Промах','#cfc6b4',def.o);}if(back)await back();
  if(def.enemy){def.aware=true;def.distracted=false;}
  if(dmg)hurt(def,dmg,att);rollDone();}
// damage taken by the hero passes through rage, shell, stone endurance; an orc stays up once; a tiefling burns back
function hurt(def,dmg,att,kind){if(CB.on&&dmg>0)CB.hitRound=CB.round;if(def===H0){const R=RACES[HERO.race]||{};if(R.fireRes&&kind==='fire'&&dmg>0){dmg=Math.floor(dmg/2);floatText('Огнестойкость','#ffb36a',hero);}
    {const h=hero.userData.held||{};if(CB.on&&dmg>0&&!CB.blockUsed&&[h.L,h.R].some(id=>WEAPONS[id]?.block)){CB.blockUsed=true;dmg=0;floatText('Щит дозора','#e8c27a',hero);}}
    if(CB.rage)dmg=Math.ceil(dmg/2);if(CB.shell){dmg=Math.ceil(dmg/2);CB.shell=false;floatText('Панцирь','#c8b890',hero);}
    if(R.stone&&SP.stone&&dmg>=5){SP.stone=0;const r=d(12)+2;dmg=Math.max(0,dmg-r);floatText('Каменная стойкость −'+r,'#c8c8d0',hero);}
    H0.hp-=dmg;if(H0.hp<=0&&R.relentless&&SP.relentless){SP.relentless=0;H0.hp=1;floatText('Неукротимость!','#ff9a6a',hero);}
    setHP();if(R.rebuke&&SP.rebuke&&att&&att!==H0&&!att.dead){SP.rebuke=0;const f=d(6)+d(6);setTimeout(()=>{floatText('Адский огонь -'+f,'#ff7a3a',att.o);sfx('spell');hurt(att,f,H0,'fire');},450);}
    if(H0.hp<=0)knockOut();}else if(def.ally){def.hp-=dmg;if(def.hp<=0)allyDown(def);}else{def.hp-=dmg;if(def.hp<=0)kill(def);else morale(def);}}
// cantrips that call for a saving throw: no attack roll, the target resists
async function saveSpell(def,opt){const ab={wis:def.wis||0,dex:def.dex||0,str:def.ath||0}[opt.save]||0,dc=8+HERO.spell+2;
  const res=await roll20(def.name+': спасбросок ('+({wis:'Мудрость',dex:'Ловкость',str:'Сила'})[opt.save]+') · '+opt.n,ab,dc);await projectile(H0,def,'spell');
  if(!res.ok){const dmg=await rollDamage(opt,false,[]);await knock(def,H0,dmg,'#ffd27a');if(opt.effect==='distract'){def.distracted=true;floatText('Сбит с толку','#9fc3cf',def.o);}def.aware=true;hurt(def,dmg,H0);}
  else{floatText('Устоял','#cfc6b4',def.o);def.aware=true;}rollDone();}
function setHP(){hpf.style.width=Math.max(0,H0.hp/H0.max*100)+'%';hpl.textContent=H0.name+' · '+HERO.n+(typeof LV!=='undefined'&&LV.lv>1?' '+LV.lv+' ур.':'')+' · '+Math.max(0,H0.hp)+' / '+H0.max;}
function kill(e){sfx('death');e.dead=true;e.route=null;questKill(e);gainXP(xpOf(e));if(e.boss&&CB.on)setTimeout(()=>liveFoes().forEach(flee),700);tween(600,k=>{e.o.rotation.z=k*1.4;e.sink=k*.12});setTimeout(()=>{e.o.visible=false},1800);
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
  if(!res.ok){def.distracted=RACES[HERO.race]?.clever?2:1;floatText(def.distracted>1?'Отвлечён надолго':'Отвлечён','#9fc3cf',def.o);}else floatText('Не повёлся','#cfc6b4',def.o);rollDone();}
// out of a fight: throw past the enemy, to its side; a Stealth check decides if it goes to look
function noiseCellNear(e){const sx=Math.sign(e.x-H0.x)||1,sz=Math.sign(e.z-H0.z)||1;
  for(const [dx,dz] of [[sz*3,-sx*3],[-sz*3,sx*3],[sx*3,sz*3],[sz*2,-sx*2],[-sz*2,sx*2]]){const x=e.x+dx,z=e.z+dz;if(free(x,z))return [x,z];}return [e.x+sx*2,e.z+sz*2];}
async function stoneNoise(x,z){busy=true;await stoneAt(x,z);const near=enemies.filter(e=>!e.dead&&!e.aware&&Math.hypot(e.x-x,e.z-z)<=(RACES[HERO.race]?.clever?14:7)&&!room);
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
function healingWord(){SP.word--;const heal=d(4)+3+(HERO.heal||0);sfx('heal');H0.hp=Math.min(H0.max,H0.hp+heal);setHP();floatText('+'+heal,'#ffe9a0',hero);toast('Лечащее слово: 1к4 + 3 = '+heal);}
function rageOn(){SP.rage--;CB.rage=true;floatText('Ярость!','#ff5a4a',hero);sfx('fight');shake=.2;}
function inspire(){SP.inspire--;CB.boost='вдохновение';floatText('Вдохновение','#f2c14e',hero);sfx('heal');}
function memory(){SP.echo=0;CB.boost='собраться';floatText('Собраться','#f2e0a0',hero);}
function giantMight(){SP.might=0;CB.might=true;floatText('Сила великана','#d8c8b0',hero);sfx('fight');}
function livingMend(){SP.mend=0;const v=d(4)+d(4)+2;sfx('heal');H0.hp=Math.min(H0.max,H0.hp+v);setHP();floatText('+'+v,'#7fe08a',hero);toast('Живая ткань: 2к4 + 2 = '+v);}
function shellUp(){SP.shellUp=0;CB.shell=true;floatText('В панцирь','#c8b890',hero);}
function layHands(){SP.hands=0;const heal=d(4)+d(4)+4+(HERO.heal||0);sfx('heal');H0.hp=Math.min(H0.max,H0.hp+heal);setHP();floatText('+'+heal,'#ffe9a0',hero);toast('Наложение рук: 2к4 + 4 = '+heal);}
function markTarget(e,name){CB.mark=e;CB.markName=name;floatText(name,'#c8a8ff',e.o);sfx('spell');}
async function entangle(e){SP.entangle=0;const res=await roll20(e.name+': спасбросок Силы · Опутывание',e.ath||0,8+HERO.spell+2);if(!res.ok){e.prone=true;e.lean=-1.3;floatText('Опутан','#6aaa4a',e.o);}else floatText('Вырвался','#cfc6b4',e.o);e.aware=true;rollDone();}
// a people's own strike: 2d6 at range, the foe's save halves it (DC 13 for everyone, the class adds nothing)
async function raceBlast(e,key,name,save,mod,col,kind,after){SP[key]=0;const res=await roll20(e.name+': спасбросок '+save+' · '+name,mod||0,13);await projectile(H0,e,'spell');
  let dmg=d(6)+d(6);if(res.ok)dmg=Math.floor(dmg/2);await knock(e,H0,dmg,col);e.aware=true;if(after&&!res.ok)after(e);hurt(e,dmg,H0,kind);rollDone();}
const dragonBreath=e=>raceBlast(e,'breath','Огненный шар','Ловкости',e.dex,'#ff9a3a','fire');
const tideWave=e=>raceBlast(e,'wave','Удар волны','Силы',e.ath,'#7ac8e8','water',e=>{e.prone=true;e.lean=-1.3;floatText('Сбит с ног','#7ac8e8',e.o);});
const echoScream=e=>raceBlast(e,'scream','Эхо-крик','Мудрости',e.wis,'#9ae0ff','psychic');
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
async function startCombat(trigger,surprise=false,heroFirst=false){if(CB.on||H0.dead)return;if(typeof onFightStart==='function')onFightStart(trigger);CB.on=true;H0.route=null;H0.arrive=null;H0.sneak=false;H0.spd=2.4;closeWheel();
  const foes=[trigger,...enemies.filter(e=>e!==trigger&&!e.dead&&e.o.visible&&Math.hypot(e.x-trigger.x,e.z-trigger.z)<=4).sort((a,b)=>man(a,trigger)-man(b,trigger)).slice(0,1)];
  const mates=ALLIES.filter(a=>!a.down&&man(a,H0)<=12);for(const a of mates){a.route=null;a.inFight=true;}
  for(const e of foes){e.route=null;e.investigate=null;e.inFight=true;if(!surprise||e!==trigger)e.aware=true;}
  const ini=[{a:H0,v:d(20)+HERO.dex+(HERO.init||0)},...mates.map(a=>({a,v:d(20)+(a.dex||0)})),...foes.map(e=>({a:e,v:d(20)+(e.dex||0)}))].sort((x,y)=>y.v-x.v);
  if(heroFirst){const k=ini.findIndex(o=>o.a===H0);ini.unshift(ini.splice(k,1)[0]);}
  if(surprise)trigger.surprised=true;
  CB.order=ini.map(o=>o.a);CB.round=1;CB.hitRound=1;CB.readUsed=false;CB.i=heroFirst?0:-1;CB.move=HERO.speed;CB.acted=false;CB.bonus=false;CB.sneakUsed=false;
  document.body.classList.add('fight');sfx('fight');banner(surprise?'Внезапная атака!':'Бой!');renderOrder();
  toast('Инициатива: '+ini.map(o=>(o.a===H0?'вы':o.a.name)+' '+o.v).join(', ')+(surprise?'. Враг застигнут врасплох.':''),3500);
  if(!heroFirst){await wait(1100);nextTurn();}}
function joinFight(e){if(CB.order.includes(e))return;e.inFight=true;e.aware=true;e.route=null;CB.order.push(e);floatText('!','#ff5a4a',e.o);renderOrder();}
function banner(t){const z=document.getElementById('zone');z.textContent=t;z.classList.remove('show');void z.offsetWidth;z.classList.add('show');}
function liveFoes(){return CB.order.filter(a=>a.enemy&&!a.dead);}
function endCombat(text){CB.fangUsed=false;CB.blockUsed=false;CB.rage=false;CB.might=false;CB.mark=null;CB.shell=false;CB.boost=null;CB.on=false;document.body.classList.remove('fight');CB.order=[];clearMoves();closeWheel();renderOrder();
  for(const e of enemies){e.inFight=false;e.surprised=false;e.distracted=false;if(e.prone){e.prone=false;e.lean=0;}}
  for(const a of ALLIES){a.inFight=false;if(a.down){a.down=false;a.hp=Math.ceil(a.max/2);a.o.rotation.z=0;a.sink=0;floatText(a.name+' встаёт','#9fe0a0',a.o);}}if(text){banner(text);toast(text);}}
const victory=()=>endCombat(enemies.every(x=>x.dead)?'Победа. Остров зачищен.':'Победа.');
async function nextTurn(){if(!CB.on||H0.dead)return;if(!liveFoes().length)return victory();
  CB.i++;if(CB.i>=CB.order.length){CB.i=0;CB.round++;
    // a fight where nobody has struck for three rounds (a foe across water or a wall) dies down by itself
    if(CB.round-(CB.hitRound||1)>=3&&!liveFoes().some(e=>man(e,H0)<=1)){for(const e of liveFoes()){e.aware=false;e.slipUntil=performance.now()+60000;}return endCombat('Враги не могут до вас добраться. Бой затих.');}}const a=CB.order[CB.i];if(a.dead)return nextTurn();
  if(a===H0){CB.move=HERO.speed;CB.acted=false;CB.bonus=false;CB.sneakUsed=false;renderOrder();showMoves();return;}
  renderOrder();clearMoves();await wait(450);
  if(a.surprised){a.surprised=false;floatText('Застигнут врасплох','#9fc3cf',a.o);await wait(900);return nextTurn();}
  if(a.ally){if(a.down)return nextTurn();await allyTurn(a);if(H0.dead||!CB.on)return;if(!liveFoes().length)return victory();await wait(300);return nextTurn();}
  await enemyTurn(a);if(H0.dead||!CB.on)return;await wait(350);nextTurn();}
function afterHeroAct(){if(!CB.on)return;if(!liveFoes().length)return victory();renderOrder();if(CB.move>0)showMoves();
  if(CB.acted&&CB.move<=0)setTimeout(()=>heroTurn()&&!busy&&endHeroTurn(),900);}
function endHeroTurn(){if(!heroTurn()||busy)return;clearMoves();closeWheel();
  if(liveFoes().every(e=>man(e,H0)>12)){for(const e of liveFoes())e.aware=false;return endCombat('Вы оторвались от погони.');}nextTurn();}
async function enemyTurn(e){if(man(e,H0)>3){camFocus=e;await wait(450);}try{await enemyTurnBody(e);}finally{await wait(250);camFocus=null;}}
async function enemyTurnBody(e){
  if(e.prone){e.prone=false;e.lean=0;floatText('Встаёт','#cfc6b4',e.o);await wait(600);}
  if(e.distracted){e.distracted=e.distracted>1?e.distracted-1:false;e.face+=Math.PI;floatText('Отвлёкся на шум','#9fc3cf',e.o);await wait(900);return;}
  const range=e.range||1,mv=e.speed||6,T=nearestOf(e,foeTargets());if(!T)return;
  if(man(e,T)>range){const p=path(e.x,e.z,T.x,T.z,e,true,2000);if(p&&p.length){let route=p.slice(0,mv);
    if(range>1){const k=p.findIndex(c=>Math.abs(c[0]-T.x)+Math.abs(c[1]-T.z)<=range);if(k>=0)route=p.slice(0,Math.min(mv,k+1));}await walk(e,route);}}
  if(man(e,T)<=range&&!H0.dead&&!T.down)await attack(e,T,{n:e.atkName||'Удар',hit:e.atk,die:e.dmg,k:e.dmgK||1,b:e.dmgB??1,range,kind:range>1?'bow':'melee'});}

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
  const many=CB.order.filter(a=>!a.dead&&!a.down).length>4;
  CB.order.forEach((a,i)=>{if(a.dead)return;const c=document.createElement('span');c.className='chip'+(i===CB.i?' now':'')+(a===H0||a.ally?' me':'');if(a.down)return;
    c.textContent=(a===H0?'Вы':many?a.name.split(' ').pop().slice(0,7):a.name)+(a!==H0?' '+Math.max(0,a.hp)+(many?'':'/'+a.max):'');orderEl.append(c);});
  if(heroTurn())cstat.innerHTML='Ваш ход · шаги <b>'+CB.move+'</b> · действие '+(CB.acted?'<s>есть</s>':'<b>есть</b>')+' · бонус '+(CB.bonus?'<s>есть</s>':'<b>есть</b>')+'<br><small>нажмите на себя — конец хода и особые умения</small>';}
function knockOut(){H0.dead=true;H0.route=null;endCombat();toast('Вы теряете сознание…');tween(500,k=>{hero.rotation.z=k*1.4});
  setTimeout(()=>{H0.dead=false;hero.rotation.z=0;H0.hp=H0.max;rest();setRoom(null);H0.x=Z.dock[0]+1;H0.z=Z.dock[1];H0.px=H0.x+.5;H0.pz=H0.z+.5;setHP();
    for(const e of enemies)if(!e.dead){e.aware=false;e.route=null;e.hp=e.max;e.x=e.home[0];e.z=e.home[1];e.px=e.x+.5;e.pz=e.z+.5;}toast('Рыбаки нашли вас и принесли на причал. Здоровье восстановлено.',4000);},2400);}

// ---------- companions, morale and experience ----------
// A lone hero against three is a lost fight in the rules too, so: a companion can be hired and fights on
// the hero's side, a fight starts with the foe that noticed you and at most one close mate, badly hurt foes
// may break and run (a fallen chief makes his men run), and every foe overcome gives experience.
const ALLIES=[];
const foeTargets=()=>[H0,...ALLIES.filter(a=>!a.down&&CB.order.includes(a))];
const nearestOf=(e,list)=>list.reduce((b,a)=>!b||man(e,a)<man(e,b)?a:b,null);
async function allyTurn(a){const t=nearestOf(a,liveFoes());if(!t)return;if(man(a,H0)>3){camFocus=a;await wait(400);}
  try{if(man(a,t)>1){const p=path(a.x,a.z,t.x,t.z,a,true,2000);if(p&&p.length)await walk(a,p.slice(0,a.speed||6));}
    if(man(a,t)<=1&&!t.dead)await attack(a,t,{n:a.atkName,hit:a.atk,die:a.dmg,k:1,b:a.dmgB,range:1,kind:'melee'});}finally{await wait(200);camFocus=null;}}
function allyDown(a){a.down=true;a.hp=0;a.route=null;sfx('death');floatText(a.name+' ранен и падает','#ff9a6a',a.o);tween(500,k=>{a.o.rotation.z=k*1.3;a.sink=k*.1});renderOrder();}
// a badly hurt foe that fails its nerve runs: it counts as overcome but leaves no body
function morale(e){if(!e.enemy||e.boss||e.dead||e.fled||e.temp)return;if(e.hp>e.max*.35)return;if(d(20)+(e.wis||0)>=11)return;flee(e);}
function flee(e){if(e.dead)return;e.fled=true;e.dead=true;e.route=null;e.inFight=false;questKill(e);gainXP(Math.ceil(xpOf(e)/2));floatText(e.model==='bandit'?'Бросает оружие и бежит':'Убегает','#cfc6b4',e.o);
  questKill(e);gainXP(Math.round(xpOf(e)*.7));const dx=Math.sign(e.x-H0.x)||1,dz=Math.sign(e.z-H0.z)||1,x0=e.o.position.x,z0=e.o.position.z;e.face=Math.atan2(dx,dz);
  tween(1200,k=>{e.o.position.x=x0+dx*5*k;e.o.position.z=z0+dz*5*k;}).then(()=>{e.o.visible=false;});renderOrder();}
const XPV={bandit:25,goblin:50,skeleton:50,wolf:50,boar:50,bear:100};
const xpOf=e=>e.temp?0:e.boss?450:XPV[e.model]||25;
const LV={xp:0,lv:1};const LV_AT=[0,300,900,2700,6500];
const lvHP=()=>(LV.lv-1)*Math.max(4,Math.round(HERO.hp*.3));
function gainXP(n){if(!n)return;LV.xp+=n;setTimeout(()=>floatText('+'+n+' опыта','#bfe0ff',hero),300);
  while(LV.lv<LV_AT.length&&LV.xp>=LV_AT[LV.lv]){LV.lv++;H0.max=HERO.hp+lvHP();H0.hp=H0.max;setHP();setTimeout(()=>{banner('Новый уровень: '+LV.lv);sfx('crit');toast('Уровень '+LV.lv+': здоровье '+H0.max+'. Раны затянулись.');},900);}}
// a hired companion walks behind the hero and is put back beside him after doors and long walks
function allyTick(){if(CB.on)return;for(const a of ALLIES){if(a.down||a.dead)continue;const dd=Math.hypot(a.px-H0.px,a.pz-H0.pz);
  if(dd>12||(a.z>=OUT_H)!==(H0.z>=OUT_H)){const [x,z]=nearFree(H0.x+1,H0.z+1,3);a.x=x;a.z=z;a.px=x+.5;a.pz=z+.5;a.route=null;}
  else if(dd>2.6&&!a.route&&!busy){const p=path(a.x,a.z,H0.x,H0.z,a,true,600);if(p&&p.length)a.route=p;}}}
function hireAlly(a,price){if(gold<price)return say(a.npc,'Плата вперёд, '+price+' монет. Нет денег — нет похода.');addGold(-price);a.ally=true;a.wander=0;a.talkId='ally';ALLIES.push(a);save();
  say(a.npc,a.hireLine||'Договорились. Иду за тобой. В драке держись рядом.');}
