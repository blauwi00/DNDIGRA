(() => {
  'use strict';
  let plan=null,metaKey='',revision=0,serverWorld=null;
  let canonical=new Set(),loading=new Map();
  const base=World.scenes, runtime=()=>WorldGen.Runtime, game=()=>window.gameDebug;
  const idle=fn=>(window.requestIdleCallback||((f)=>setTimeout(f,30)))(fn,{timeout:1200});
  function get(id){
    if(!plan||!Object.hasOwn(plan.scenes,id))return base[id];
    const s=WorldGen.generateScene(plan,id);
    if(!s.layoutKey){const errors=WorldGen.validateScene(s);if(errors.length)throw Error('Некорректная сцена: '+errors.join('; '));s.generated=true;s.outdoor=['town','outskirts','yard'].includes(s.gen.type);s.layoutKey=metaKey+':'+id+':'+(++revision);World.compileCollisions(s);}
    return s;
  }
  World.scenes=new Proxy(base,{get(target,id){return typeof id==='string'?get(id):target[id];}});
  function restore(state){
    const meta=state?.world?.gen;
    if(!meta){plan=null;metaKey='';serverWorld=null;canonical.clear();loading.clear();return;}
    if(!WorldGen.SUPPORTED_VERSIONS.includes(meta.v))throw Error('Версия генератора этого мира не поддерживается.');
    const key=JSON.stringify(meta);if(key!==metaKey){plan=WorldGen.createWorld(meta.seed,meta.size,meta.v);metaKey=key;serverWorld=null;canonical.clear();loading.clear();}
    get(state.scene);prefetch(state.scene);
  }
  function prime(record){
    if(!record.generated||!record.snapshot.world?.gen)return;
    metaKey=JSON.stringify(record.snapshot.world.gen);plan=record.generated.plan;
    Object.defineProperty(plan,'cache',{value:new Map(),enumerable:false});
    plan.cache.set(record.generated.scene.id,record.generated.scene);
    serverWorld=record.id;canonical=new Set([record.generated.scene.id]);loading=new Map();
  }
  async function ensure(id){
    if(!serverWorld||canonical.has(id))return get(id);
    if(loading.has(id))return loading.get(id);
    const activePlan=plan,world=serverWorld;
    const task=(async()=>{
      const response=await fetch('/api/worlds/'+encodeURIComponent(world)+'/scene?id='+encodeURIComponent(id));
      const data=await response.json();if(!response.ok)throw Error(data.error||'Не удалось загрузить место.');
      if(plan!==activePlan||world!==serverWorld)throw Error('Мир уже изменился.');
      if(data.scene?.id!==id||WorldGen.validateScene(data.scene).length)throw Error('Не удалось проверить место.');
      plan.cache.set(id,data.scene);canonical.add(id);return get(id);
    })();loading.set(id,task);
    try{return await task;}finally{if(plan===activePlan)loading.delete(id);}
  }
  function prefetch(id){if(!plan||!Object.hasOwn(plan.scenes,id))return;const activePlan=plan;for(const next of WorldGen.exits(get(id)))idle(()=>{if(plan===activePlan)ensure(next).catch(()=>{});});}
  function host(){const g=game(),s=g.state,a=g.active();return{state:s,roll:n=>g.roll(n,false),mod:key=>DND.mod(a.stats[key]),has:name=>s.party.some(p=>p.inventory.includes(name)),give:(name,n=1)=>{for(let i=0;i<n;i++)a.inventory.push(name);},gold:n=>s.gold+=n,potions:n=>s.potions+=n,torches:n=>a.torches+=n,hurt:(n,why)=>{a.hp=Math.max(0,a.hp-n);g.tell(why+': '+n+' урона.');return a.hp;},poison:()=>{if(!a.conditions.includes('poisoned'))a.conditions.push('poisoned');},log:t=>g.tell(t)};}
  // Award only when the complete loot fits. No partial rewards or lost keys.
  function fits(p){if(!p.container||!p.loot||opened(p))return true;const g=game(),a=structuredClone(g.active()),s={...g.state,potions:g.state.potions+(p.loot.potions||0)};a.inventory.push(...p.loot.gear);a.torches+=(p.loot.torches||0);return a.inventory.length<=100&&InventoryRules.slotsUsed(a,s)<=InventoryRules.CAPACITY;}
  function show(p,act){window.openGeneratedDialogue(p,act.text,(act.options||[]).map(o=>({label:o.label,fn:()=>{
    if(o.id==='open'&&!fits(p)){show(p,{text:'Рюкзак заполнен. Добыча остаётся здесь; освободите место.',options:[{id:'leave',label:'Отойти'}]});return;}
    const g=game(),result=runtime().choose(host(),g.state.scene,p,o.id);
    if(result.opened)g.state.doors[g.state.scene+':'+p.id]=true;
    if(result.text)g.tell(result.text);
    g.save();g.render();window.voxel?.sync();
    if(result.done){if(result.text)show(p,{text:result.text,options:[{id:'leave',label:'Закрыть'}]});else window.closeDialogue();}else show(p,result);
  }})));}
  function interact(p){const g=game();if(!g.state.world?.gen)return false;
    if(p.type==='portal'){const status=document.getElementById('worldgen-loading')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'worldgen-loading',className:'worldgen-loading',textContent:'Подготовка локации…'}));status.hidden=false;
      requestAnimationFrame(()=>requestAnimationFrame(async()=>{try{await ensure(p.destination);g.enterScene(p.destination,true,p.destinationEntry);}catch(e){g.tell(e.message);}finally{status.hidden=true;g.render();}}));return true;}
    const act=runtime().begin(host(),g.state.scene,p);if(!act)return false;g.save();show(p,act);return true;
  }
  function opened(p){return runtime().isOpened(host(),game().state.scene,p);}
  function step(scene,x,y){for(const event of runtime().step(host(),scene,x,y))game().tell(event.text||event.result.text);}
  window.GeneratedWorlds={prime,ensure,restore,prefetch,interact,opened,step,host,get plan(){return plan;}};
})();
