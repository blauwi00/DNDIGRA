// ---------- the end of the island: a ship to other islands ----------
// While robbers hold the roads no captain sails here. Once the Raven's story is over, a ship moors by the
// pier of Заводь with its captain at the gangway. Sailing ends this island: the chronicle's ending, the
// hero's road in numbers, and «to be continued». The hero may also stay and keep living on the island.
const SHIP={on:false,g:null,cap:null};
{const g=new THREE.Group(),x0=0,z0=0,wood=lam(T.p[1],{color:0x6a4a30}),dark=lam(T.p[1],{color:0x4a3220}),sail=new THREE.MeshLambertMaterial({color:0xe8e0cc,side:THREE.DoubleSide}),
   B=(m,x,y,z,w,h,d)=>{const o=new THREE.Mesh(BOX,m);o.scale.set(w,h,d);o.position.set(x,y,z);o.castShadow=true;g.add(o);return o;};
 // hull: a long body narrowing to the bow and stern, a deck, a rail, a cabin, a mast with a square sail and the island's emblem
 for(let i=0;i<9;i++){const t=i/8,w=1.5-Math.abs(t-.5)*1.4;B(i%2?wood:dark,x0-2.6+i*.65,.15,z0,.66,.5,w);}
 B(lam(T.p[3],{color:0xb8946a}),x0,.42,z0,5.4,.06,1.1);for(const sg of[-1,1])B(dark,x0,.55,z0+sg*.6,5.2,.18,.06);
 B(wood,x0+1.6,.8,z0,1.1,.7,.9);B(dark,x0+1.6,1.2,z0,1.2,.08,1);B(new THREE.MeshBasicMaterial({color:0xffc66a}),x0+1.05,.85,z0+.46,.18,.16,.02);
 B(dark,x0-.3,2.1,z0,.16,3.4,.16);B(dark,x0-.3,3.2,z0,.08,.08,2.2);B(dark,x0-.3,1.6,z0,.08,.08,2);
 const s=B(sail,x0-.3,2.4,z0,.03,1.55,2);s.castShadow=false;B(new THREE.MeshLambertMaterial({color:0x8e2a24}),x0-.33,2.45,z0,.02,.5,.5);
 B(dark,x0+2.9,.6,z0,.6,.12,.12); // bowsprit
 // moored west of the pier's end, along the shore, with a gangway onto the pier
 g.rotation.y=Math.PI/2;g.position.set(-2.5,0,Z.dock[1]+1);const gw=new THREE.Mesh(BOX,lam(T.bark));gw.scale.set(1.9,.06,.5);gw.position.set(-.85,.38,Z.dock[1]+1);gw.visible=false;scene.add(gw);SHIP.gw=gw;
 g.visible=false;scene.add(g);SHIP.g=g;}
{const [x,z]=nearFree(0,Z.dock[1]+1,2);SHIP.cap=townsman(x,z,{wander:0,npc:'Капитан Ингрид',talkId:'captain',job:'Капитан',kind:'ship',place:null,face:Math.PI},true,'Ингрид',LOOKS2[2%LOOKS2.length],{headgear:'none',outfit:'leather',cape:'short',capeColor:'#2a3a5a'});
 SHIP.cap.hidden=true;SHIP.cap.o.visible=false;}
function shipArrive(quiet){if(SHIP.on)return;SHIP.on=true;SHIP.g.visible=true;SHIP.gw.visible=true;const c=SHIP.cap;c.hidden=false;c.o.visible=!c.far;
  Q.ship=Q.ship||{state:1,title:'Корабль у причала Заводи',left:0,giverA:c,at:null};if(Q.ship.state===0)Q.ship.state=1;questUI();
  if(!quiet)setTimeout(()=>toast('С моря донёсся колокол: к причалу Заводи пришёл корабль.',5000),1500);}
function shipTick(t){if(!SHIP.on&&Q.raven&&Q.raven.state===3)shipArrive();if(SHIP.on){SHIP.g.position.y=Math.sin(t*.8)*.04;SHIP.g.rotation.z=Math.sin(t*.6)*.015;}}
function captainTalk(a,n){const rv=Q.raven;
  if(!SHIP.on)return say(n,'Пока на дорогах разбой, корабли сюда не ходят.');
  say(n,(rv&&rv.spared?'Так это после разговора с тобой Ворон сдался? В порту только о тебе и говорят. ':'Это ты разобрался с Вороном? Купцы на большой земле уже знают. ')+
    'Мы идём к другим островам, и место на борту есть. Только учти: обратно скоро не будет. Если остались дела — доделай.',
    [['Отплыть',()=>confirmBox('Отплыть с острова?','История острова Хельги закончится. Сохранение останется: можно вернуться и жить на острове дальше.','Отплыть',()=>sailAway())],
     ['Куда идёт корабль?',()=>say(n,'На восток, к Солёным островам. Там свои беды, говорят, похуже ваших. Но об этом в пути.')]]);}
async function sailAway(){busy=true;closeWheel();fadeEl.classList.add('on');sfx('creak');await wait(900);Q.ship.state=3;save();busy=false;endingScreen();fadeEl.classList.remove('on');}
function endingScreen(){const el=document.getElementById('ending'),q=Q.raven;
  el.querySelector('.en-text').textContent=(typeof epilogue==='function'&&q&&q.state===3?epilogue():'');
  const days=typeof dayN==='number'?dayN+1:1;
  el.querySelector('.en-stats').textContent='Уровень '+LV.lv+' · золото '+gold+' · дней на острове: '+days+' · записей в летописи: '+KNOWN.size;
  el.hidden=false;paused=true;}
document.getElementById('enStay').onclick=()=>{document.getElementById('ending').hidden=true;paused=false;toast('Корабль подождёт у причала, пока вы не решите снова.');};
document.getElementById('enMenu').onclick=()=>{document.getElementById('ending').hidden=true;mainMenu();};
