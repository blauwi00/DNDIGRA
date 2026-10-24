import {SURFACES,varyFloor} from './worldgen/surfaces.js';

export const VERSION=1;
const PHASES=['day1','day2','departure','ride','ambush','crash','aftermath','done'];
export function initial(){return {v:VERSION,phase:'day1',greeted:false,supplies:false,delivered:false,preparation:null,prepared:false,tracks:false,recovered:false,ending:null};}
export function valid(s){return !!s&&s.v===VERSION&&PHASES.includes(s.phase)&&[null,'cargo','medicine'].includes(s.preparation)&&['greeted','supplies','delivered','prepared','tracks','recovered'].every(k=>typeof s[k]==='boolean')&&[null,'helped','left'].includes(s.ending);}
export function advance(s,event){
 if(!valid(s))throw Error('Неизвестная версия вступления.');
 const n={...s};
 if(s.phase==='day1'){
  if(event==='greet')n.greeted=true;
  if(event==='supplies')n.supplies=true;
  if(event==='deliver'&&s.supplies)n.delivered=true;
  if(event==='sleep'&&s.greeted&&s.delivered)n.phase='day2';
 }else if(s.phase==='day2'){
  if(['cargo','medicine'].includes(event)&&!s.preparation)n.preparation=event;
  if(event==='prepare'&&s.preparation)n.prepared=true;
  if(event==='sleep'&&s.prepared)n.phase='departure';
 }else if(s.phase==='departure'&&event==='depart')n.phase='ride';
 else if(s.phase==='ride'&&event==='arrive')n.phase='ambush';
 else if(s.phase==='ambush'&&event==='victory')n.phase='crash';
 else if(s.phase==='crash'&&event==='wake')n.phase='aftermath';
 else if(s.phase==='aftermath'){
  if(event==='tracks')n.tracks=true;
  if(event==='recover'&&s.tracks)n.recovered=true;
  if(event==='return'&&s.recovered){n.phase='done';n.ending='helped';}
  if(event==='leave'){n.phase='done';n.ending='left';}
 }
 return n;
}
export function objective(s){
 if(s.phase==='day1')return !s.greeted?'Поговорить с Ореном у дома':!s.supplies?'Забрать дорожный свёрток из сундука':!s.delivered?'Отнести свёрток торговке у кареты':'Вернуться домой и лечь спать';
 if(s.phase==='day2')return !s.preparation?'Обсудить подготовку с торговкой':!s.prepared?(s.preparation==='cargo'?'Взять верёвку у мастерской':'Взять перевязочный набор у лекарки'):'Подготовка закончена. Переночевать дома';
 return {departure:'Отправиться с торговой каретой',ride:'По дороге из родной деревни',ambush:'Защитить торговку от вора',crash:'Грохот колёс. Темнота…',aftermath:s.recovered?'Вернуть торговке дорожную сумку':s.tracks?'Проверить кусты у северной тропы':'Поговорить с выжившей торговкой',done:'Первая дорога пройдена'}[s.phase];
}
export function consequence(s){return s.preparation==='cargo'?'Верёвки удержали ящики. Большая часть товара уцелела, но стражнику пришлось перевязывать руку полосой плаща.':'Перевязочный набор пригодился стражнику. Кровотечение остановлено; часть плохо закреплённого товара рассыпалась по канаве.';}

function base(id,name,W,H){
 const tiles=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>!x||!y||x===W-1||y===H-1?'wall':'floor'));
 const surface=tiles.map((row,y)=>row.map((v,x)=>v==='floor'?SURFACES[varyFloor('grass',id,x,y)].code:' '));
 return {id,name,W,H,outdoor:true,tiles,surface,wallStyle:'timber',props:[],decor:[],lights:[],dummies:[],encounters:[],spawns:[[6,11]],trainingSpawn:[[6,11]],enemySpawn:[[7,11]],layoutKey:id};
}
function prop(s,id,x,y,model,name,description,prologue){s.props.push({id,x,y,...(model==='chest'?{kind:17,type:'chest'}:{model:({crate:'cratestack',barrel:'barrelstack'})[model]||model,kind:24,type:'furniture'}),name,description,prologue});}
function npc(s,id,x,y,name,classId,gender,cloth){s.props.push({id,x,y,name,type:'npc',kind:20,prologue:true,npc:{classId,gender,look:{cloth,hair:'#67452e'},hands:['empty','empty']}});}
function room(s,x,y,w,h,door){for(let yy=y;yy<y+h;yy++)for(let xx=x;xx<x+w;xx++){s.tiles[yy][xx]=xx===x||xx===x+w-1||yy===y||yy===y+h-1?'wall':'floor';s.surface[yy][xx]='p';}s.tiles[door[1]][door[0]]='floor';}
function finish(s){s.surface=s.surface.map(row=>row.join(''));return s;}
export function scenes(st=initial()){
 const village=base('prologue-village','Родная деревня · '+(st.phase==='day1'?'первый день':st.phase==='day2'?'второй день':'утро отъезда'),28,24);
 for(let y=1;y<23;y++)for(let x=1;x<27;x++)if(y>=13&&y<=15||x>=13&&x<=15)village.surface[y][x]='d';
 room(village,2,3,9,8,[6,10]);room(village,18,3,8,7,[21,9]);
 prop(village,'home-bed',8,5,'bed','Твоя кровать','Знакомый скрип досок. Здесь можно закончить день.',true);
 prop(village,'home-supplies',4,5,'chest','Дорожный сундук','Свёрток с хлебом и чистой рубахой приготовлен к дороге.',true);
 prop(village,'home-table',5,7,'table','Домашний стол','На дереве остались зарубки, сделанные тобой в детстве.');
 npc(village,'prologue-oren',6,12,'Орен · сосед','fighter','male','#695744');
 npc(village,'prologue-lisa',18,16,'Лиса · торговка','rogue','female','#87583b');
 npc(village,'prologue-teya',22,6,'Тея · лекарка','cleric','female','#697c58');
 npc(village,'prologue-guard',23,19,'Дарен · стражник','fighter','male','#52677b');
 prop(village,'carriage',21,16,'cart','Торговая карета','Отъезд назначен на третье утро. Торговцам не хватает охраны.',true);
 prop(village,'rope',19,6,'crate','Верёвка у мастерской','Прочная верёвка для крепления груза.',true);
 prop(village,'well',14,9,'well','Деревенский колодец','У колодца прохладно даже в полдень.');
 prop(village,'gate-sign',14,21,'signpost','Дорога из деревни','Ты договорился выйти вместе с торговцами на третье утро.',true);
 for(const[x,y]of [[3,17],[7,20],[10,17],[24,12],[4,1],[16,2],[25,21]])prop(village,'tree-'+x+'-'+y,x,y,'tree','Старое дерево','Ты знаешь эти деревья с детства.');
 prop(village,'yard-crate',20,18,'crate','Ящик с посудой','Посуда переложена соломой.');
 prop(village,'yard-barrel',18,19,'barrel','Бочка','Торговцы проверили обручи перед поездкой.');
 const road=base('prologue-road','Лесная дорога · место нападения',32,23);road.wallStyle='cave';
 road.spawns=[[10,12]];road.trainingSpawn=[[10,12]];road.enemySpawn=[[11,12]];
 for(let y=1;y<22;y++)for(let x=1;x<31;x++)if(y>=10&&y<=12||x>=23&&x<=24&&y>=4&&y<=12)road.surface[y][x]='d';
 const crashed=['crash','aftermath','done'].includes(st.phase);
 prop(road,'carriage',13,10,'cart','Повреждённая карета','Обод расколот, колесо ушло в канаву.',true);
 if(!crashed)road.props.at(-1).name='Торговая карета';else road.props.at(-1).wrecked=true;
 npc(road,'prologue-lisa',15,9,'Лиса · торговка','rogue','female','#87583b');
 npc(road,'prologue-guard',12,14,'Дарен · раненый стражник','fighter','male','#52677b');
 prop(road,'spilled-crate',15,12,'crate','Рассыпавшийся груз','Среди досок осталась оборванная завязка.',true);
 prop(road,'trail',21,10,'bones','Следы на обочине','Следы сапог уходят на север, к кустам.',true);
 prop(road,'stolen-bag',24,5,'chest','Брошенная дорожная сумка','Воры бросили тяжёлую сумку у зарослей.',true);
 for(const[x,y]of [[3,4],[7,6],[12,3],[17,5],[27,4],[28,8],[4,16],[8,19],[18,17],[24,18],[28,14],[20,7]])prop(road,'tree-'+x+'-'+y,x,y,'tree','Придорожное дерево','На ветках дрожат листья.');
 if(crashed){prop(road,'broken-board',14,11,'bench','Сломанная скамья','Доски вырвало при падении кареты.');prop(road,'loose-barrel',16,14,'barrel','Откатившаяся бочка','Бочка уцелела в мягкой траве.');}
 road.encounters=[{id:'prologue-thief',name:'Нападение на карету',reward:{xp:0,gold:0},enemies:[{id:'road-thief',name:'Дорожный вор',visual:'bandit',kind:3,x:11,y:12,max:7,ac:10}]}];
 return {[village.id]:finish(village),[road.id]:finish(road)};
}
