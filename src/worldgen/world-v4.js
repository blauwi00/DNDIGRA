// One explorable island, stored as a compact descriptor plus finite places.
// Frozen v1-v3 remain separate; only an explicit v4 identity uses this layout.
import {Rng,randomSeed} from './rng.js';
import {person,settlementName} from './content.js';
import {makeNpc} from './npc.js';
import {mk} from './furnish.js';
import {STORY_IDS,storyContent} from './adventure-content.js';
import {createIsland,isLand,findPath,validateIsland} from '../islands/terrain.js';
import {tileAt} from '../islands/scene.js';
export {randomSeed};
export const GEN_VERSION=4,SIZES=['small','medium','large'];
const DIRS=[[0,-1],[1,0],[0,1],[-1,0]];
const key=(x,y)=>`${x},${y}`;
const blocked=p=>p.solid!==false&&!['door','portal','torch','chandelier','clue','trap'].includes(p.type);

export function normalizeGen(gen={}){
  return {v:GEN_VERSION,seed:String(gen.seed??'0'),size:SIZES.includes(gen.size)?gen.size:'auto'};
}
const owner=rng=>{const p=person(rng);return {name:p.full,full:p.full,gender:p.gender};};

function islandStory(id,settlement,people){
  const story=storyContent(id,settlement,people);
  delete story.tutorial;
  const common={
    arrival:`Корабль оставил вас у берега острова. Вы поднимаетесь на светлую опушку: слева слышен прибой, впереди виден указатель к поселению «${settlement}».`,
    clueScene:'island',reportNpc:'elder',settlementLandmark:'settlement',requiredEncounterIds:['road-threat'],
    rescue:`${people.healer.full} помогает путникам на опушке у берега.`,
  };
  const texts={
    mist:{
      title:`Туман над островом · ${settlement}`,
      problem:'У лесной повозки лопнули бочки с едкой настойкой. Туман поднялся над тропами острова, а испуганные звери вышли на дорогу к поселению.',
      warning:'Не спускайтесь к повозке без осторожности! Там лопнули бочки, туман щиплет глаза, а звери вышли на дорогу. Я бегу предупредить поселение!',
      objective:'Осмотрите повозку по северной тропе, найдите запись о грузе и уберите угрозу с дороги. Передайте сведения старосте у колодца.',
      report:'Теперь мы знаем, чем засыпать разлитую настойку. Дорога свободна, и жители смогут безопасно добраться до повозки. Спасибо за помощь острову.',
    },
    missing:{
      title:`Пропавший обоз · ${settlement}`,
      problem:'Обоз с припасами не дошёл до поселения. Повозку бросили у северной тропы, налётчики заняли дорогу, а путники скрываются возле старой башни.',
      warning:'Обоз пропал! У повозки порванные ремни, а на дороге вооружённые люди. Я еле ушёл. Сначала найдите следы — я позову дозор из поселения!',
      objective:'Найдите дорожную запись у повозки по северной тропе, прогоните налётчика с дороги и передайте сведения старосте у колодца.',
      report:'Запись подтверждает: путники укрылись возле башни. Дорога свободна, и дозор сможет вывести раненого возницу. Припасы острова будут спасены.',
    },
    seal:{
      title:`Разбитая печать острова · ${settlement}`,
      problem:'Кладоискатели разбили охранную печать у старой башни. Костяные стражи проснулись, и один вышел на дорогу к поселению.',
      warning:'Печать у башни разбита! Камни светятся, и кости поднимаются с земли. Один страж вышел на дорогу. Я бегу за помощью — не трогайте осколки!',
      objective:'Пройдите по южной тропе к руинам, прочтите надпись на печати и остановите стража на дороге. Передайте сведения старосте у колодца.',
      report:'Вы нашли способ замкнуть печать и остановили стража на дороге. Хранитель отправится к башне с солью, а поиски клада прекращены.',
    },
  };
  return {...story,...common,...texts[id]};
}

export function createWorld(seed,size){
  const gen=normalizeGen({seed,size}),rng=new Rng(`${gen.seed}/v4/plan`),island=createIsland(gen.seed,gen.size);
  const settlement=settlementName(rng.fork('settlement'));
  const people=Object.fromEntries(['messenger','healer','elder','captain'].map(role=>[role,owner(rng.fork(role))]));
  const story=islandStory(rng.fork('story').pick(STORY_IDS),settlement,people),name=`Остров «${settlement}»`;
  const plan={v:GEN_VERSION,seed:gen.seed,size:gen.size,name,settlementName:settlement,start:'island',island,story,captain:people.captain,
    scenes:{island:{kind:'island',name,W:island.W,H:island.H}},links:[]};
  Object.defineProperty(plan,'cache',{value:new Map(),enumerable:false});
  return plan;
}

function enemy(seed,id,name,x,y,max,ac,visual){
  const foe={id,name,kind:3,x,y,max,ac,visual};
  if(visual==='bandit'){
    const npc=makeNpc({rng:new Rng(`${seed}/v4/enemies/${id}`),name:'Дорога'}, {full:name,gender:'male'},'guard',[],{classId:'rogue',role:'налётчик'}).npc;
    foe.gen={classId:npc.classId,gender:npc.gender,look:npc.look,hands:['sword','empty']};
  }
  return foe;
}

function buildScene(plan){
  const meta=plan.island,rng=new Rng(`${plan.seed}/v4/scene/island`),reserved=new Set(),occupied=new Set();
  const scene={id:'island',name:plan.name,W:meta.W,H:meta.H,island:meta,outdoor:true,
    gen:{type:'island',seed:plan.seed,planVersion:GEN_VERSION,base:'grass',wall:'rough',storyId:plan.story.id},
    props:[],decor:[],dummies:[],lights:[],spawns:[],trainingSpawn:[],enemySpawn:[],encounters:[],
    arrivals:{},regions:[],landmarks:[],mainRoute:[],regionStreaming:{chunkSize:10,maxChunks:32}};
  const reserve=(x,y)=>{if(isLand(meta,x,y))reserved.add(key(x,y));};
  const reserveArea=([x,y],radius)=>{for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++)reserve(x+dx,y+dy);};
  function route(id,from,to,surface='dirt'){
    const cells=findPath(meta,from,to,1500);
    if(!cells.length)throw Error('Нет сухого маршрута: '+id);
    for(const cell of cells)reserveArea(cell,1);
    scene.mainRoute.push({id,width:3,cells,surface});
  }
  const labels={arrival:'Опушка у берега',port:'Береговая пристань',settlement:`Поселение «${plan.settlementName}»`,clue:'Стоянка лесного обоза',ruins:'Старая башня',herbs:'Травяная поляна'};
  const radii={arrival:8,port:4,settlement:10,clue:5,ruins:8,herbs:5};
  for(const [id,[x,y]] of Object.entries(meta.landmarks)){
    scene.landmarks.push({id,name:labels[id],x,y,radius:radii[id]});reserveArea([x,y],id==='port'?1:2);
  }
  const {arrival,port,settlement,clue,ruins,herbs}=meta.landmarks;
  route('arrival-settlement',arrival,settlement);
  route('arrival-port',arrival,port,'cobble');
  route('settlement-clue',settlement,clue);
  route('settlement-ruins',settlement,ruins,'gravel');
  route('settlement-herbs',settlement,herbs);
  const biomeNames={meadow:'Луговой привал',forest:'Лесной дозор',desert:'Песчаная стоянка',mountain:'Горный знак',snow:'Снежный приют',swamp:'Болотная веха'};
  const biomePlaces=meta.biomes.map(biome=>{
    let point=[Math.round(biome.x),Math.round(biome.y)];
    if(!isLand(meta,...point))point=[meta.margin+meta.shape.centerX,point[1]];
    const id='biome-'+biome.id;reserveArea(point,1);
    route(id+'-path',settlement,point,'gravel');
    scene.landmarks.push({id,name:biomeNames[biome.id],x:point[0],y:point[1],radius:5});
    return {id,point,biome};
  });
  scene.spawns=[arrival,[arrival[0]+1,arrival[1]],[arrival[0],arrival[1]+1]].map(cell=>cell.slice());
  scene.arrivals={arrival:scene.spawns.map(cell=>cell.slice()),port:[[port[0]+1,port[1]],[port[0]+2,port[1]],[port[0]+2,port[1]+1]],
    settlement:[settlement,[settlement[0]+1,settlement[1]],[settlement[0],settlement[1]+1]].map(cell=>cell.slice())};
  for(const cells of Object.values(scene.arrivals))for(const cell of cells)reserveArea(cell,1);
  scene.regions.push({id:'square',name:'Площадь у колодца',x:settlement[0]-5,y:settlement[1]-5,w:11,h:11,surface:'flagstone'});

  // Find only a bounded nearby placement, never scan the island grid. Every
  // solid object retains its own connected dry approach, protected thereafter.
  function place(prop,target,maxRadius=12){
    for(let radius=0;radius<=maxRadius;radius++)for(let dy=-radius;dy<=radius;dy++)for(let dx=-radius;dx<=radius;dx++){
      if(Math.max(Math.abs(dx),Math.abs(dy))!==radius)continue;
      const x=target[0]+dx,y=target[1]+dy,k=key(x,y);
      if(!isLand(meta,x,y)||occupied.has(k)||reserved.has(k))continue;
      // A protected dry approach back to an anchor is cheap and proves access
      // even after subsequent props are added. Avoid crossing older props.
      let neighbor=null,path=null;
      for(const [a,b] of DIRS){
        const candidate=[x+a,y+b];
        if(!isLand(meta,...candidate)||occupied.has(key(...candidate)))continue;
        const cells=findPath(meta,arrival,candidate,1500);
        if(!cells.length||cells.some(([a,b])=>key(a,b)===k||occupied.has(key(a,b))))continue;
        neighbor=candidate;path=cells;break;
      }
      if(!neighbor)continue;
      const p={...prop,x,y,access:{x:neighbor[0],y:neighbor[1]}};
      scene.props.push(p);occupied.add(k);
      for(const [a,b] of path)reserve(a,b);
      return p;
    }
    throw Error('Не удалось разместить предмет: '+prop.id);
  }
  const offset=(point,dx,dy)=>[point[0]+dx,point[1]+dy];
  function prop(cat,id,target,extra={}){return place(mk({rng:rng.fork('props/'+id)},cat,{id,...extra}),target);}
  function container(cat,id,target,description,loot,extra={}){
    return prop(cat,id,target,{gen:true,container:true,description,loot:{gold:0,potions:0,torches:0,gear:[],...loot},...extra});
  }
  function npc(who,id,target,lines,role,classId,extra={}){
    return place({...makeNpc({rng:rng.fork('npc/'+id),name:scene.name},who,classId==='cleric'?'chapel':'house',lines,{role,classId}),id,storyRole:id,...extra},target);
  }
  // The messenger owns a six-cell clear approach/departure animation; no fake
  // portal or unfinished island voyage is introduced to move this NPC.
  const messengerTarget=offset(arrival,4,-3);
  const messenger=npc(plan.story.messenger,'messenger',messengerTarget,[plan.story.warning,plan.story.objective],plan.story.messenger.gender==='female'?'вестница':'вестник','rogue');
  messenger.departure=[messenger.x+6,messenger.y];
  for(let i=1;i<=6;i++)reserve(messenger.x+i,messenger.y);
  npc(plan.story.healer,'healer',offset(arrival,5,4),['Я собираю травы возле берега. На поляне южнее поселения остался мой запас для путников.','Берегите себя: обследуйте дорогу и передайте старосте то, что узнаете.'],plan.story.healer.gender==='female'?'целительница':'целитель','cleric');
  container('chest','starter-cache',offset(arrival,3,4),'Дорожный запас целителя: зелье и факел для первого пути.',{potions:1,torches:1},{name:'Дорожный запас'});
  prop('signpost','arrival-sign',offset(arrival,8,4),{name:'Указатель у опушки',description:'На восток — поселение. На запад — пристань. Северная тропа ведёт к повозке, южная — к старой башне.'});
  prop('tree','arrival-pine',offset(arrival,-4,-5),{name:'Сосна у берега',description:'Высокая сосна отмечает опушку над пристанью.',interactive:false});
  npc(plan.captain,'captain',offset(port,4,-3),['Морской переход оплачивают золотом. Но сейчас корабль стоит у причала: нужно привести в порядок такелаж.','Я пока не принимаю плату за переход. Останусь на пристани; дорога от берега ведёт к поселению.'],'капитан','fighter');
  prop('cart','port-cart',offset(port,6,4),{name:'Пристанская телега',description:'Телега для груза, который прибывает на остров морем.'});
  prop('barrel','port-water',offset(port,5,6),{container:false,name:'Запас воды у пристани'});
  prop('signpost','port-sign',offset(port,7,-5),{name:'Доска пристани',description:'Корабль на ремонте. Дорога в глубь острова ведёт к поселению.'});
  prop('well','village-well',offset(settlement,0,-4),{name:'Колодец поселения',description:'У колодца жители обсуждают вести с дороги.'});
  npc(plan.story.elder,'elder',offset(settlement,3,-4),[plan.story.problem,plan.story.objective,plan.story.report],'староста','fighter');
  prop('stall','village-market',offset(settlement,-5,-6),{name:'Островной торг',description:'Торговый навес возле площади. Записка на прилавке: «Торг закрыт до прибытия нового груза».'});
  prop('bench','village-bench',offset(settlement,-3,4));
  prop('hearth','village-hearth',offset(settlement,5,4),{name:'Очаг поселения'});
  prop('signpost','village-sign',offset(settlement,-5,4),{name:'Доска дорожного дозора',description:plan.story.objective});
  prop('anvil','village-anvil',offset(settlement,9,-3));
  prop('forge','village-forge',offset(settlement,10,-6),{name:'Кузница под открытым навесом'});
  prop('table','village-table',offset(settlement,7,7),{name:'Стол дорожного дозора'});
  prop('barrel','village-barrel',offset(settlement,10,5),{container:false});
  prop('haystack','village-hay',offset(settlement,-9,6));
  container('crate','road-supplies',offset(settlement,-12,4),'Запас дорожного дозора для путников.',{gold:rng.fork('loot/road').int(1,3),torches:1});
  prop('cart','abandoned-cart',offset(clue,-4,0),{name:'Брошенная повозка',description:plan.story.cartDescription});
  prop('haystack','cart-hay',offset(clue,4,-4));
  prop('barrel','cart-barrel',offset(clue,-5,-4),{container:false,name:'Бочка у повозки'});
  const cluePoint=plan.story.id==='seal'?ruins:clue;
  container('chest','story-clue',offset(cluePoint,4,1),plan.story.clue,{}, {name:plan.story.clueName,storyRole:'clue',storyId:plan.story.id});
  prop('statue','ruins-marker',offset(ruins,-4,0),{name:'Статуя у старой башни',description:plan.story.ruinsDescription});
  prop('altar','broken-seal',offset(ruins,4,-3),{type:'furniture',name:plan.story.id==='seal'?'Разбитая печать':'Старая каменная чаша',description:plan.story.ruinsDescription});
  prop('pillar','ruins-pillar',offset(ruins,-5,-4),{name:'Уцелевшая колонна'});
  prop('bones','ruins-bones',offset(ruins,5,5),{interactive:false});
  container('chest','ruins-cache',offset(ruins,5,3),'Запас, который дозор оставил у башни.',{gold:rng.fork('loot/ruins').int(2,6),potions:1});
  container('planter','herb-cache',offset(herbs,4,3),'Целитель оставил на травяной поляне готовое лечебное зелье для путника.',{potions:1},{name:'Травяной запас'});
  prop('bush','herb-bush',offset(herbs,-4,0),{name:'Душистые травы',description:'Цветущий куст отмечает травяную поляну.'});
  const road=scene.mainRoute.find(r=>r.id==='arrival-settlement'),roadPoint=road.cells[Math.floor(road.cells.length*.65)];
  const visual={mist:'beast',missing:'bandit',seal:'skeleton'}[plan.story.id];
  const encounter=(id,name,point,foeId,foeName,max,ac,reward)=>({id,scene:'island',name,x:point[0],y:point[1],radius:3,trigger:'approach',tutorial:false,scriptedLoss:false,
    enemies:[enemy(plan.seed,foeId,foeName,...point,max,ac,visual)],reward});
  scene.encounters.push(encounter('road-threat',plan.story.roadThreat,roadPoint,'road-foe',plan.story.roadEnemy,8,11,{xp:25,gold:5}));
  scene.encounters.push(encounter('ruins-threat',plan.story.ruinsThreat,ruins,'ruins-foe',plan.story.ruinsEnemy,6,10,{xp:15,gold:3}));
  for(const e of scene.encounters)for(const f of e.enemies)reserveArea([f.x,f.y],1);

  // Sparse landmarks throughout the six regions make the large island useful
  // to explore without storing forests as collision objects or full cell data.
  for(const {id,point,biome} of biomePlaces){
    prop('signpost',id+'-sign',offset(point,4,-3),{name:biomeNames[biome.id],description:'Веха местного дозора. Отсюда тропа возвращается к поселению.'});
    container('crate',id+'-cache',offset(point,4,3),'Небольшой дорожный запас. После открытия он не пополняется.',{gold:rng.fork('loot/'+id).int(1,4),torches:biome.id==='forest'?1:0});
  }
  return scene;
}

export function generateScene(plan,id){
  if(!isGeneratedId(plan,id))throw Error('Неизвестная сцена '+id);
  if(plan.cache?.has(id))return plan.cache.get(id);
  const scene=buildScene(plan),errors=validateScene(scene);
  if(errors.length)throw Error('Остров не прошёл проверку: '+errors.join('; '));
  plan.cache?.set(id,scene);return scene;
}
export const sceneIds=plan=>Object.keys(plan.scenes);
export const isGeneratedId=(plan,id)=>id==='island'&&Object.hasOwn(plan.scenes,id);
export const exits=()=>[];

export function validateScene(scene){
  const errors=[];
  if(!scene||scene.id!=='island'||scene.gen?.planVersion!==4||scene.outdoor!==true)return ['Некорректная островная сцена.'];
  const descriptor=validateIsland(scene.island);
  if(!descriptor.ok)return [descriptor.error];
  if(scene.W!==scene.island.W||scene.H!==scene.island.H||['tiles','surface','floor','materials'].some(field=>Object.hasOwn(scene,field)))errors.push('Неверные размеры или полная сетка острова.');
  for(const field of ['props','decor','dummies','lights','spawns','trainingSpawn','enemySpawn','encounters','landmarks','mainRoute'])if(!Array.isArray(scene[field]))errors.push('Нет списка: '+field);
  if(errors.length)return errors;
  if(scene.props.length>120||scene.encounters.length>12||scene.landmarks.length>32||scene.mainRoute.length>32)errors.push('Превышен бюджет содержимого острова.');
  const ids=new Set(),occupied=new Set(),dry=cell=>Array.isArray(cell)&&cell.length===2&&tileAt(scene,...cell)==='floor';
  for(const p of scene.props){
    if(!p||typeof p!=='object'){errors.push('Неверный предмет.');continue;}
    if(typeof p.id!=='string'||ids.has(p.id))errors.push('Повтор или отсутствие id предмета.');
    ids.add(p.id);
    if(tileAt(scene,p.x,p.y)!=='floor')errors.push('Предмет вне суши: '+p.id);
    if(blocked(p)){const k=key(p.x,p.y);if(occupied.has(k))errors.push('Наложение предметов: '+p.id);occupied.add(k);}
  }
  if(errors.length)return errors;
  const free=cell=>dry(cell)&&!occupied.has(key(...cell));
  if(scene.spawns.length!==3||scene.spawns.some(cell=>!free(cell)))errors.push('Неверные точки появления.');
  if([...scene.trainingSpawn,...scene.enemySpawn].some(cell=>!free(cell)))errors.push('Неверные резервные точки появления.');
  if(!scene.arrivals||typeof scene.arrivals!=='object'||Array.isArray(scene.arrivals))errors.push('Нет точек прибытия острова.');
  for(const cells of Object.values(scene.arrivals||{}))if(!Array.isArray(cells)||cells.length!==3||cells.some(cell=>!free(cell)))errors.push('Неверные точки прибытия.');
  for(const route of scene.mainRoute){
    if(!route||!Array.isArray(route.cells)||!route.cells.length||route.cells.length>1501||route.width!==3){errors.push('Неверный маршрут.');continue;}
    for(let i=0;i<route.cells.length;i++){
      const cell=route.cells[i];if(!free(cell)){errors.push('Перекрытый или мокрый маршрут: '+route.id);break;}
      if(i&&Math.abs(cell[0]-route.cells[i-1][0])+Math.abs(cell[1]-route.cells[i-1][1])!==1){errors.push('Разрыв маршрута: '+route.id);break;}
    }
  }
  for(const p of scene.props){
    if(!DIRS.some(([dx,dy])=>free([p.x+dx,p.y+dy])))errors.push('Нет подхода к предмету: '+p.id);
    if(p.access&&!free([p.access.x,p.access.y]))errors.push('Перекрыт подход: '+p.id);
    else if(p.access){
      const path=findPath(scene.island,scene.spawns[0],[p.access.x,p.access.y],1500);
      if(!path.length||path.some(cell=>!free(cell)))errors.push('Нет сухого пути к предмету: '+p.id);
    }
    if(p.departure&&!free(p.departure))errors.push('Перекрыт уход NPC: '+p.id);
  }
  for(const landmark of scene.landmarks)if(!landmark||!dry([landmark.x,landmark.y])||!Number.isInteger(landmark.radius)||landmark.radius<1)errors.push('Неверный ориентир: '+landmark?.id);
  for(const encounter of scene.encounters){
    if(!encounter||!free([encounter.x,encounter.y])||!Array.isArray(encounter.enemies)||!encounter.enemies.length||encounter.enemies.some(f=>!f||!free([f.x,f.y]))){errors.push('Встреча вне свободной суши: '+encounter?.id);continue;}
    if(encounter.tutorial!==false||encounter.scriptedLoss!==false)errors.push('Недопустимая учебная встреча.');
    for(const cell of scene.spawns)if(Math.abs(cell[0]-encounter.x)+Math.abs(cell[1]-encounter.y)<=encounter.radius)errors.push('Встреча на точке появления.');
  }
  return errors;
}

export function gmBrief(plan){
  return {version:plan.v,settlement:plan.settlementName,size:plan.size,places:sceneIds(plan).map(id=>({id,type:'island',name:plan.scenes[id].name})),
    outside:{road:'island',dungeon:null,fortress:null},publicFacts:[plan.story.problem,plan.story.objective]};
}
export function npcBrief(scene,prop){
  const n=prop.npc;return {id:prop.id,scene:scene.id,place:scene.name,name:prop.name,role:n.role,gender:n.gender,class:n.classId,persona:n.persona,fallbackLines:n.lines};
}
