(() => {
const directions=[[0,-1],[1,0],[0,1],[-1,0]];
function build(id,name,W,H,areas,extras){const floors=new Set();for(const [x,y,w,h]of areas)for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++)floors.add(i+','+j);for(const key of extras.remove||[])floors.delete(key);const tiles=Array.from({length:H},()=>Array(W).fill('void'));for(const key of floors){const[x,y]=key.split(',').map(Number);tiles[y][x]='floor'}for(const key of floors){const[x,y]=key.split(',').map(Number);for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)if(tiles[y+dy]?.[x+dx]==='void')tiles[y+dy][x+dx]='wall'}return{id,name,W,H,tiles,...extras}}
const hub=build('hub','Ателье хранительницы',18,14,[[1,5,8,8],[4,1,8,7],[9,6,6,3],[13,3,4,8]],{
 remove:['12,6','12,8'],spawns:[[5,9],[4,10],[6,10]],
 props:[{id:'keeper',x:6,y:3,kind:20,name:'Эллен · хранительница',type:'npc'},{id:'chest',x:2,y:7,kind:17,name:'Дубовый сундук',type:'chest'},{id:'altar',x:9,y:2,kind:18,name:'Алтарь',type:'altar'},{id:'pillar1',x:2,y:10,kind:19,name:'Колонна',type:'cover'},{id:'books',x:10,y:3,kind:21,name:'Книжный шкаф',type:'books'},{id:'desk',x:5,y:2,kind:24,name:'Стол хранительницы',type:'desk'},{id:'door',x:12,y:7,kind:26,name:'Дверь в тренировочный зал',type:'door',axis:'horizontal'},{id:'portal',x:7,y:0,kind:26,name:'Спуск в крипту',type:'portal',destination:'crypt'},{id:'window1',x:3,y:3,kind:22,name:'Витраж',type:'decor',solid:false},{id:'window2',x:0,y:8,kind:22,name:'Витраж',type:'decor',solid:false}],
 decor:[{kind:'bench',x:3,y:11},{kind:'bench',x:6,y:11},{kind:'rug',x:5,y:8,w:2,h:3},{kind:'rug',x:7,y:4,w:2,h:2}],
 dummies:[{id:'dummy1',name:'Тренировочный манекен',kind:4,sprite:25,x:14,y:5,hp:99,max:99,facing:0,dummy:true,ac:12,stats:{dex:10},conditions:[],death:{success:0,failure:0,stable:false}},{id:'dummy2',name:'Манекен для заклинаний',kind:4,sprite:25,x:15,y:8,hp:99,max:99,facing:0,dummy:true,ac:12,stats:{dex:10},conditions:[],death:{success:0,failure:0,stable:false}}],
 lights:[{id:'west',x:1.35,y:6.6,radius:2.7,power:.7,phase:0},{id:'south',x:7.6,y:11.6,radius:2.6,power:.65,phase:1.8},{id:'library',x:4.5,y:1.8,radius:2.6,power:.65,phase:3},{id:'altar',x:9.5,y:2.15,radius:2.3,power:.55,phase:4},{id:'training',x:16.3,y:6.6,radius:2.7,power:.7,phase:5}],trainingSpawn:[[13,8],[14,9],[13,9]],enemySpawn:[[15,4],[14,7]]
});
const crypt=build('crypt','Крипта свечей',13,12,[[1,6,7,5],[4,2,7,6],[8,7,4,4]],{spawns:[[5,9],[4,10],[6,10]],props:[{id:'portal',x:2,y:11,kind:26,name:'Вернуться в ателье',type:'portal',destination:'hub'},{id:'chest',x:9,y:3,kind:17,name:'Старинный сундук',type:'chest'},{id:'altar',x:5,y:3,kind:18,name:'Свечной алтарь',type:'altar'},{id:'pillar1',x:7,y:5,kind:19,name:'Каменный пилон',type:'cover'},{id:'books',x:10,y:8,kind:21,name:'Архив',type:'books'}],decor:[{kind:'rug',x:5,y:7,w:2,h:3}],dummies:[{id:'dummy1',name:'Костяной манекен',kind:4,sprite:25,x:8,y:3,hp:99,max:99,facing:0,dummy:true,ac:12,stats:{dex:10},conditions:[],death:{success:0,failure:0,stable:false}}],lights:[{id:'west',x:1.4,y:7.4,radius:2.6,power:.7,phase:0},{id:'altar',x:5.5,y:3.15,radius:2.4,power:.6,phase:2},{id:'east',x:10.7,y:7.6,radius:2.8,power:.65,phase:4}],trainingSpawn:[[6,7],[5,8],[6,8]],enemySpawn:[[8,6],[9,7]]});
hub.props.push(
{id:'water-barrel',x:1,y:5,type:'barrel',kind:24,name:'Бочка с водой',description:'Прохладная вода для путников. На ободе вырезано клеймо местного бондаря.'},
{id:'supply-crate',x:1,y:11,type:'crate',kind:24,name:'Ящик припасов',description:'Полотняные мешочки, верёвка и запас свечей. Эллен поддерживает здесь порядок.'},
{id:'keeper-chair',x:5,y:1,type:'chair',kind:24,name:'Стул хранительницы',description:'Деревянный стул с потёртой красной подушкой.'},
{id:'lilies',x:8,y:3,type:'planter',kind:24,name:'Белые лилии',description:'Свежие лилии в глиняном горшке. Их аромат едва пробивается сквозь запах старых книг.'},
{id:'reading-books',x:4,y:6,type:'books',kind:21,name:'Шкаф летописей'},
{id:'scroll-case',x:10,y:5,type:'scrolls',kind:24,name:'Свитки и карты',description:'Планы старой часовни и записи о северных проходах. Рядом лежат чистые листы для заметок.'},
{id:'training-rack',x:16,y:9,type:'rack',kind:24,name:'Стойка с оружием',description:'Учебные мечи, щит и посох. Здесь проверяют стойку и точность удара.'},
{id:'south-crate',x:8,y:12,type:'crate',kind:24,name:'Дорожные припасы',description:'Запас ткани, масла и сухих трав для будущих путешествий.'},
{id:'west-pot',x:1,y:9,type:'planter',kind:24,name:'Папоротник',description:'Небольшой папоротник тянется к свету. Хранительница заботится даже об этом уголке.'},
{id:'chapel-banner',x:4,y:0,type:'banner',kind:24,name:'Знамя часовни',solid:false}
);
function tile(scene,x,y){return scene.tiles[y]?.[x]||'void'}
function faces(scene,x,y){return directions.reduce((m,[dx,dy],i)=>m|(tile(scene,x+dx,y+dy)==='floor'?1<<i:0),0)}

hub.props.push({id:'novice',x:7,y:4,type:'npc',kind:20,name:'Лин · послушник'});
hub.props.push({id:'episode-tracks',x:7,y:3,type:'clue',kind:24,solid:false,name:'Следы у лестницы'});crypt.props.push({id:'novice',x:10,y:5,type:'npc',kind:20,name:'Лин · послушник'});
hub.props.push({id:'trial-cache',x:16,y:3,type:'crate',kind:24,name:'Тёмная ниша · тайник',description:'За досками видна узкая щель. Проверьте её с переносным светом.'});
hub.lights.push(
{id:'entry-lantern',x:2.5,y:12.5,radius:2.6,power:.6,phase:2.3,intensity:6,distance:6,brightRadius:3},
{id:'reading-lantern',x:11.5,y:4.5,radius:2.5,power:.6,phase:4.7,intensity:6,distance:6,brightRadius:3},
{id:'practice-lantern',x:16.5,y:3.5,radius:2.5,power:.6,phase:1.2,intensity:6,distance:6,brightRadius:3}
);
crypt.lights.push(
{id:'north-lantern',x:4.5,y:2.5,radius:2.5,power:.6,phase:2.7,intensity:6,distance:6,brightRadius:3},
{id:'archive-lantern',x:11.5,y:9.5,radius:2.5,power:.6,phase:5.3,intensity:6,distance:6,brightRadius:3}
);
for(const l of hub.lights){if(l.id!=='altar'){l.intensity=12;l.distance=10;l.brightRadius=5;l.radius=4;}}

// Mount torches on unoccupied wall faces with a free adjacent access cell.
function mountLights(scene){const occupied=new Set(scene.props.map(p=>p.x+','+p.y)),floorItems=new Set([...scene.props.filter(p=>p.solid!==false),...scene.decor.filter(p=>p.kind==='bench')].map(p=>p.x+','+p.y));
 for(const l of scene.lights){if(l.id==='altar')continue;const candidates=[];for(let y=0;y<scene.H;y++)for(let x=0;x<scene.W;x++){if(tile(scene,x,y)!=='wall'||occupied.has(x+','+y))continue;for(const [dx,dy]of directions){const ax=x+dx,ay=y+dy;if(tile(scene,ax,ay)!=='floor'||floorItems.has(ax+','+ay))continue;candidates.push({x,y,dx,dy,ax,ay,d:Math.hypot(x+.5+dx*.58-l.x,y+.5+dy*.58-l.y)});}}candidates.sort((a,b)=>a.d-b.d||a.y-b.y||a.x-b.x);const q=candidates[0];if(!q)throw new Error('No free wall mount for '+l.id);occupied.add(q.x+','+q.y);Object.assign(l,{kind:'wall',wallX:q.x,wallY:q.y,dx:q.dx,dy:q.dy,x:q.x+.5+q.dx*.58,y:q.y+.5+q.dy*.58,height:1.22});const p={id:'sconce-'+l.id,x:q.x,y:q.y,kind:37,type:'torch',solid:false,name:'Настенный факел',lightId:l.id,access:{x:q.ax,y:q.ay}};l.fixtureId=p.id;scene.props.push(p);}
}
mountLights(hub);mountLights(crypt);
for(const [scene,positions]of [[hub,[[4,9],[7,5],[14,6]]],[crypt,[[6,6]]]])for(let i=0;i<positions.length;i++){const [x,y]=positions[i],id='chandelier-'+i;scene.lights.push({id,kind:'chandelier',x:x+.5,y:y+.5,height:1.9,intensity:26,distance:10,brightRadius:4,phase:1.3+i*2,radius:4});scene.props.push({id,x,y,type:'chandelier',kind:38,solid:false,name:'Свечная люстра'});}
// Explicit one-cell footprints. Rugs are walkable surfaces; mounted decorations
// do not occupy floor cells. An altar owns its candles rather than overlapping them.
function compileCollisions(scene){const occupied=new Map(),mounted=new Map(),entries=[];
 const place=(owner,x,y,blocksMovement,layer='floor')=>{const entry={owner,x,y,blocksMovement,layer,width:1,height:1};entries.push(entry);if(layer==='floor'){const key=x+','+y;if(occupied.has(key))throw new Error('Overlapping objects in '+scene.id+': '+occupied.get(key).owner.id+' / '+owner.id);if(tile(scene,x,y)!=='floor')throw new Error('Furniture outside floor: '+owner.id);occupied.set(key,entry);}if(layer==='wall'){const key=x+','+y;if(mounted.has(key))throw new Error('Overlapping wall objects: '+owner.id);mounted.set(key,entry);}owner.collision=entry;};
 for(const p of scene.props)place(p,p.x,p.y,p.solid!==false,['door','portal'].includes(p.type)?'doorway':p.type==='clue'?'surface':p.type==='chandelier'?'ceiling':p.solid===false?'wall':'floor');
 for(const d of scene.decor){if(d.kind==='rug'){d.collision={layer:'surface',blocksMovement:false,width:d.w,height:d.h};continue;}place(d,d.x,d.y,true);}
 for(const light of scene.lights){if(light.id==='altar'||light.kind==='wall'||light.kind==='chandelier'){light.attachedTo=light.fixtureId||(light.kind==='chandelier'?light.id:null)||scene.props.find(p=>p.type===(light.kind==='chandelier'?'chandelier':'altar'))?.id;light.collision={layer:'attachment',blocksMovement:false};continue;}place(light,Math.floor(light.x),Math.floor(light.y),true);}
 for(const a of [...scene.spawns,...scene.trainingSpawn,...scene.enemySpawn,...scene.dummies.map(p=>[p.x,p.y])]){const key=a.join(',');if(occupied.has(key))throw new Error('Actor spawn overlaps '+occupied.get(key).owner.id);}
 scene.collisions=entries;scene.occupied=occupied;return entries;
}
function collisionAt(scene,x,y){return scene.occupied.get(x+','+y)||null;}
function validateDoors(scene){for(const p of scene.props.filter(p=>['door','portal'].includes(p.type))){const flanks=p.axis==='horizontal'?[[0,-1],[0,1]]:[[-1,0],[1,0]];if(!flanks.every(([dx,dy])=>tile(scene,p.x+dx,p.y+dy)==='wall'))throw Error('Door must join wall flanks: '+p.id);if(!directions.some(([dx,dy])=>tile(scene,p.x+dx,p.y+dy)==='floor'))throw Error('Inaccessible doorway: '+p.id);}}
for(const scene of [hub,crypt]){validateDoors(scene);compileCollisions(scene);}

window.World={scenes:{hub,crypt},tile,faces,directions,collisionAt,compileCollisions};
})();
