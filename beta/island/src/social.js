// ---------- talking your way through: persuade, deceive, intimidate, or a gift ----------
// As at the table: one goal, several ways to it. Each way is a d20 roll with the hero's skill against
// a difficulty set by what the other side wants; a failed lie or threat has consequences, a gift
// that is what they need simply works. Every way can be tried once.
// The skills come from the class (a people adds nothing to rolls): persuasion, deception, intimidation.
const TALK_MOD={fighter:[1,0,3],barbarian:[0,0,5],paladin:[4,0,3],monk:[2,0,1],ranger:[1,1,2],rogue:[2,5,2],bard:[5,5,3],cleric:[3,0,1],druid:[2,0,1],sorcerer:[4,3,2],warlock:[4,4,3],mage:[1,2,0]};
const TALK_N=['Убедить','Обмануть','Запугать'],TALK_SK=['Убеждение','Обман','Запугивание'];
const talkMod=k=>(TALK_MOD[HERO.cls]||[1,1,1])[k];
const DEALS={}; // by name, for the save: {tried, done}
// deal: {key, open(), dc:[persuade,deceive,intimidate] (null: not this way), bonus(k), gift:{id,n,label,no}|{gold,label,no}, win(how), fail(how,k), xp}
function dealWheel(a){const D=a.deal,ch=[];
  TALK_N.forEach((nm,k)=>{const dc=D.dc[k];if(dc==null||D.tried[k])return;const m=talkMod(k)+(D.bonus?D.bonus(k):0);ch.push([nm+' · '+chance(m,dc,0)+'%',()=>dealRoll(a,k,m,dc)]);});
  if(D.gift&&!D.tried.g)ch.push([D.gift.label,()=>dealGift(a)]);
  say(a.npc,D.open(),ch);}
async function dealRoll(a,k,m,dc){const D=a.deal;D.tried[k]=1;DEALS[D.key]={tried:D.tried,done:false};
  const res=await roll20(TALK_SK[k]+' → '+a.npc,m,dc);rollDone(2200);
  if(res.ok){D.done=true;DEALS[D.key].done=true;gainXP(D.xp||50);D.win(TALK_N[k]);}else D.fail(TALK_N[k],k);save();}
function dealGift(a){const D=a.deal,g=D.gift;
  if(g.id){if((window.handsCount?window.handsCount(g.id):0)<g.n)return say(a.npc,g.no);for(let i=0;i<g.n;i++)window.handsConsume(g.id);}
  else if(g.gold){if(gold<g.gold)return say(a.npc,g.no);addGold(-g.gold);}
  D.tried.g=1;D.done=true;DEALS[D.key]={tried:D.tried,done:true};gainXP(D.xp||50);D.win('Дар');save();}
function dealsLoad(d){for(const [k,v] of Object.entries(d||{})){const a=actors.find(o=>o.deal&&o.deal.key===k);if(!a)continue;a.deal.tried=v.tried||{};if(v.done){a.deal.done=true;a.deal.restore&&a.deal.restore();}}}

// ---------- Седой and his pack ----------
// In the deep forest lives an old man who is also the pack's leader. His wolves do not touch a guest
// while he is talking; a lie or a threat turns the pack on you. Win him over and a wolf walks with you.
const PACK=[];let SEDOY=null,KLYK=null;
{const p=GEN.places.find(q=>q.type==='wolves');if(p){
  PACK.push(...enemies.filter(e=>e.model==='wolf'&&Math.hypot(e.home[0]-p.x,e.home[1]-p.z)<8));for(const w of PACK)w.calm=true;
  const [x,z]=nearFree(p.x+1,p.z-2,3);
  SEDOY=townsman(x,z,{wander:2,npc:'Седой',job:'Вожак стаи',place:p,kind:'pack',talkId:'pack'},false,'Седой',LOOKS2[1],{beard:'long',hair:'#c8c4bc',outfit:'leather',cape:'mantle',capeColor:'#5a4a3a',eyes:'narrow'});
  const [kx,kz]=nearFree(p.x-2,p.z-1,3);
  KLYK=actor('wolf',kx,kz,{wander:0,spd:2.8,npc:'Волк Клык',talkId:'ally',name:'Клык',hp:11,max:11,ac:13,atk:4,dmg:4,dmgB:2,dex:2,speed:8,atkName:'Укус'});KLYK.hidden=true;KLYK.o.visible=false;
  SEDOY.deal={key:'sedoy',tried:{},xp:100,
    open:()=>'Люди сюда редко доходят. Ты пахнешь железом и дымом. Охотники с побережья ставят капканы в моём лесу, щенки гибнут. Скажи, почему я не должен отдать тебя стае?',
    dc:[13,15,17],bonus:k=>k===0&&repLevel('village')>=3?2:0,
    gift:{id:'fish',n:2,label:'Отдать рыбу ×2',no:'Рыбы у тебя нет. Не дразни голодных.'},
    win(how){packFriend();say('Седой',{Убедить:'Ты говоришь прямо. Ладно. Мои волки тебя не тронут. А если нужна будет пасть в драке — бери Клыка, он сам к тебе тянется.',Обмануть:'Значит, король прислал… Хорошо. Пусть так. Волки тебя не тронут, и Клык пойдёт с тобой — проследит, чтобы ты не врал.',Запугать:'Сильный… Стая уважает силу. Иди спокойно. Клык пойдёт с тобой, если позовёшь.',Дар:'Рыба. Давно стая так не ела. Ты нам друг. Возьми Клыка, он не подведёт.'}[how]);},
    fail(how,k){if(k===0)return say('Седой','Слова, слова. Люди всегда говорят красиво. Попробуй ещё раз — по-другому.');packAnger();say('Седой',k===1?'Врёшь. Я чую ложь, как кровь. Стая!':'Ты угрожаешь мне в моём лесу? Стая!',[['Драться',()=>{const w=PACK.find(w=>!w.dead);if(w)startCombat(w);}]]);},
    restore(){packFriend(true);}};}}
let PACK_ANGRY=false;
function packFriend(quiet){for(const w of PACK){w.calm=true;w.aware=false;}PACK_ANGRY=false;if(!quiet)repAdd('village',0);}
function packAnger(){PACK_ANGRY=true;for(const w of PACK){w.calm=false;w.aware=true;}if(SEDOY&&SEDOY.deal)SEDOY.deal.done=true;}
function packTalk(a,n){const D=a.deal;if(PACK_ANGRY)return say(n,'Уходи. Стая помнит тебя.');
  if(!D.done)return dealWheel(a);
  const ch=[];if(KLYK&&!KLYK.ally&&!KLYK.dead)ch.push(['Взять Клыка с собой',()=>takeKlyk()]);
  say(n,['Лес шумит спокойно. Это хорошо.','Капканов стало меньше. Твоя работа?','Луна скоро полная. В такие ночи я плохо помню, кто я.'][(a.said=(a.said||0)+1)%3],ch);}
function takeKlyk(){const a=KLYK;a.hidden=false;a.o.visible=true;const [x,z]=nearFree(H0.x+1,H0.z,3);a.x=x;a.z=z;a.px=x+.5;a.pz=z+.5;a.ally=true;ALLIES.push(a);save();toast('Клык идёт с вами.');}
// attacking a calm wolf of the pack ends the peace
function onFightStart(trigger){if(trigger&&trigger.calm&&PACK.includes(trigger))packAnger();}
