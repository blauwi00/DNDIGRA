import {Rng} from './worldgen/rng.js';
import {SURFACES,varyFloor} from './worldgen/surfaces.js';

// A bounded practice fixture, independent of the saved world generator versions.
// Roads and landmarks are fixed; the seed only varies the surrounding scenery.
export function createRegionWalk(seed='region-walk') {
  const W=96,H=64,rng=new Rng(String(seed));
  const road=(x,y)=>(y>=30&&y<=34)||(x>=46&&x<=50)||
    (x>=16&&x<=20&&y>=23&&y<30)||(x>=75&&x<=79&&y>34&&y<=46);
  const tiles=Array.from({length:H},(_,y)=>Array.from({length:W},(_,x)=>x===0||y===0||x===W-1||y===H-1?'void':x===1||y===1||x===W-2||y===H-2?'wall':'floor'));
  const surface=tiles.map((row,y)=>row.map((tile,x)=>tile!=='floor'?' ':road(x,y)?'d':SURFACES[varyFloor('grass',String(seed),x,y)].code).join(''));
  const props=[],occupied=new Set();
  const place=(id,x,y,model,name,description,type='furniture')=>{occupied.add(`${x},${y}`);props.push({id,x,y,kind:type==='chest'?17:24,...(type==='chest'?{}:{model}),type,name,description});};
  place('walk-camp-cart',14,25,'cart','Повозка у привала','Повозка стоит в тени деревьев. Дорога ведёт к колодцу и старым каменным столбам.');
  place('walk-camp-chest',18,28,'chest','Дорожный сундук','Забытый сундук у привала. Находки останутся только в этой прогулке.','chest');
  place('walk-road-sign',26,28,'signpost','Указатель на перекрёсток','На восток — колодец у перекрёстка; за ним тропа к старым камням.');
  place('walk-crossing-well',43,18,'well','Колодец у перекрёстка','Каменный колодец служит ориентиром для путников. Вода глубоко внизу.');
  place('walk-ruins-west',73,44,'pillar','Старые камни · западный столб','От старой ограды остались покрытые мхом каменные столбы.','cover');
  place('walk-ruins-east',81,44,'pillar','Старые камни · восточный столб','Над полянкой шумят ветви; широкая тропа возвращается к главной дороге.','cover');
  place('walk-ruins-chest',78,39,'chest','Сундук у старых камней','Небольшой сундук у каменной ограды. Находки не переносятся в приключение.','chest');
  // Separated trees leave all grass connected and give the road a clear silhouette.
  const nearRoad=(x,y)=>{for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)if(road(x+dx,y+dy))return true;return false;};
  for(let y=6;y<H-5;y+=5)for(let x=6;x<W-5;x+=5){
    const px=x+rng.int(-1,1),py=y+rng.int(-1,1);
    if(nearRoad(px,py)||props.some(p=>Math.hypot(p.x-px,p.y-py)<4)||rng.chance(.28))continue;
    const model=rng.chance(.8)?'tree':'bush';place(`walk-${model}-${x}-${y}`,px,py,model,model==='tree'?'Придорожное дерево':'Лесной куст',model==='tree'?'Крона шелестит над травянистой поляной.':'Низкий куст растёт в стороне от дороги.');
  }
  return {id:'region-walk',name:'Прогулка по окрестностям',W,H,outdoor:true,tiles,surface,wallStyle:'cave',props,decor:[],lights:[],dummies:[],encounters:[],
    spawns:[[8,32],[8,31],[8,33]],trainingSpawn:[[10,32],[10,31],[10,33]],enemySpawn:[[12,32],[12,31],[12,33]],
    landmarks:[{id:'walk-camp',name:'Дорожный привал',x:18,y:26},{id:'walk-crossing',name:'Колодец у перекрёстка',x:43,y:18},{id:'walk-ruins',name:'Старые камни',x:77,y:44}],layoutKey:'region-walk:'+String(seed)};
}
