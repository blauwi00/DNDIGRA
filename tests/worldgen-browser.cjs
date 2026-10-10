const {configureBrowserPage}=require('./browser-harness.cjs');
// Real Worker API + SQLite + browser: no mocked world creation or saves.
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict');
const {DatabaseSync}=require('node:sqlite');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
(async()=>{
  const {default:worker}=await import('../dist/server/index.js');
  const db=new DatabaseSync(':memory:');
  for(const f of fs.readdirSync(path.join(__dirname,'../drizzle')).filter(f=>f.endsWith('.sql')).sort())db.exec(fs.readFileSync(path.join(__dirname,'../drizzle',f),'utf8'));
  const DB={async batch(qs){db.exec('BEGIN');try{const a=[];for(const q of qs)a.push(await q.run());db.exec('COMMIT');return a;}catch(e){db.exec('ROLLBACK');throw e;}},prepare(sql){const q=db.prepare(sql);return{bind(...args){return{all:async()=>({results:q.all(...args)}),run:async()=>({meta:{changes:q.run(...args).changes}})}}}}};
  const server=http.createServer(async(q,r)=>{try{
    if(q.url.startsWith('/api/')){
      const chunks=[];if(!['GET','HEAD'].includes(q.method))for await(const chunk of q)chunks.push(chunk);
      const response=await worker.fetch(new Request('http://127.0.0.1:'+server.address().port+q.url,{method:q.method,headers:{...q.headers,'oai-authenticated-user-id':'qa-owner'},body:['GET','HEAD'].includes(q.method)?undefined:Buffer.concat(chunks)}),{DB});
      r.writeHead(response.status,Object.fromEntries(response.headers));return r.end(Buffer.from(await response.arrayBuffer()));
    }
    const f=path.join(__dirname,'../dist',q.url.split('?')[0]==='/'?'index.html':q.url.split('?')[0]);
    r.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',svg:'image/svg+xml',png:'image/png'})[f.split('.').pop()]||'application/octet-stream');r.end(fs.readFileSync(f));
  }catch(e){r.statusCode=500;r.end(String(e));}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;
  try{
    browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,args:[...JSON.parse(process.env.CHROMIUM_ARGS||'[]'),'--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
    const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];await configureBrowserPage(page);page.on('pageerror',e=>{console.error('PAGEERROR',e.message);errors.push(e.message)});page.on('console',m=>console.log('BROWSER',m.text()));page.on('requestfailed',r=>console.error('FAILED',r.url(),r.failure()));
    // Pin existing death/runtime regressions to their original v2 generator.
    await page.route('**/api/worlds', route => {const request=route.request();return request.method()==='POST'?route.continue({postData:JSON.stringify({...request.postDataJSON(),generatorVersion:2})}):route.continue();});
    await page.goto('http://127.0.0.1:'+server.address().port,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready);
    const worlds=[];
    await page.evaluate(()=>{document.querySelectorAll('dialog').forEach(d=>d.close());Heroes.start(true);Heroes.open();});
    await page.getByRole('button',{name:'Подтвердить героя',exact:true}).click();
    await page.locator('#world-seed').fill('integration-large');await page.locator('#world-size').selectOption('large');
    await page.waitForTimeout(450);await page.screenshot({path:'qa/worldgen-create-390.png'});
    await page.getByRole('button',{name:'Создать мир',exact:true}).click();
    await page.waitForFunction(()=>gameDebug.state.scene==='town'&&!!Worlds.current);
    await page.evaluate(()=>{gameDebug.state.settings.animations=false;gameDebug.save();});
    const meta=await page.evaluate(()=>gameDebug.state.world.gen);assert.deepEqual(meta,{v:2,seed:'integration-large',size:'large'});
    await page.evaluate(async()=>{for(const id of WorldGen.sceneIds(GeneratedWorlds.plan))await GeneratedWorlds.ensure(id);});
    async function rendererSettled(target=null){
      await page.evaluate(async()=>{await voxel.regionIdle(90000);await new Promise(resolve=>requestAnimationFrame(resolve));});
      const render=await page.evaluate(target=>({stats:voxel.regionStats,heroReady:voxel.regionReady(gameDebug.active().x,gameDebug.active().y),targetReady:!target||voxel.regionReady(target.x,target.y)}),target);
      assert.equal(render.stats.errors,0,'Generated scene groups build successfully');
      assert.equal(render.stats.idle,true,'Renderer demand settles before model checks');
      assert.equal(render.heroReady,true,'Current hero terrain is ready for interaction');
      assert.equal(render.targetReady,true,'Interaction target terrain is ready');
      if(render.stats.enabled){
        assert.equal(render.stats.mode,'detail','Ordinary hero camera retains detailed rendering');
        assert.ok(render.stats.ready<=Math.max(render.stats.maxChunks,render.stats.demand.pinnedKeys.length),'Generated outdoor detail obeys the group budget');
      }
    }
    async function assertStoneAtlas(label){
      await page.waitForFunction(()=>{
        let loaded=false;
        voxel.scene.traverse(m=>{const map=m.material?.map,image=map?.image;if(m.isInstancedMesh&&image?.src?.includes('terrain-materials.png')&&image.width>0&&image.height>0)loaded=true;});
        return loaded;
      });
      const atlas=await page.evaluate(()=>{
        const materials=new Set();
        voxel.scene.traverse(m=>{if(m.isInstancedMesh&&m.material?.map?.image?.src?.includes('terrain-materials.png'))materials.add(m.material);});
        return{variants:materials.size,valid:[...materials].every(m=>m.isMeshStandardMaterial&&!m.transparent&&m.color.getHex()===0xffffff&&m.map.source.data.width>0&&m.map.repeat.x>0&&m.map.repeat.x<.25&&m.map.repeat.y>0&&m.map.repeat.y<1/3),mode:voxel.regionStats.mode};
      });
      assert.ok(atlas.variants>0&&atlas.valid,'Loaded opaque lit stone atlas with bounded UVs '+label);
      console.log('ATLAS',label,atlas);
    }
    // Large v2 towns are streamed. Visit each real NPC's legal neighboring cell
    // instead of requiring every distant source model to exist simultaneously.
    const townStart=await page.evaluate(()=>({x:gameDebug.active().x,y:gameDebug.active().y}));
    const npcIds=await page.evaluate(()=>gameDebug.props.filter(p=>p.type==='npc').map(p=>p.id)),idle=[];
    assert.ok(npcIds.length>1,'Generated town has several NPCs to compare');
    for(const pid of npcIds){
      const target=await page.evaluate(pid=>{
        closeDialogue();const p=gameDebug.props.find(p=>p.id===pid),a=gameDebug.active();
        if(!p)throw Error('Missing generated NPC '+pid);
        const cell=World.directions.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(c=>!gameDebug.blocked(c)&&!gameDebug.all().some(actor=>actor.id!==a.id&&actor.x===c.x&&actor.y===c.y));
        if(!cell)throw Error('No legal adjacent NPC fixture '+pid);
        a.x=cell.x;a.y=cell.y;gameDebug.render();camera.center(a,true);return{x:p.x,y:p.y};
      },pid);
      await rendererSettled(target);
      const pose=await page.evaluate(pid=>{
        const model=voxel.models.get('prop:'+pid);
        if(!model||!model.isGroup||!model.children.length)throw Error('Missing ready NPC source model '+pid);
        return{id:pid,facing:model.userData.idleFacing,angle:model.rotation.y};
      },pid);
      assert.ok(Number.isInteger(pose.facing)&&pose.facing>=0&&pose.facing<4,'NPC has a valid idle facing '+pid);
      assert.equal(pose.angle,[0,Math.PI/2,Math.PI,-Math.PI/2][pose.facing],'Ready source model uses its idle facing '+pid);
      idle.push(pose);
    }
    assert.ok(new Set(idle.map(p=>p.angle)).size>1,'Map NPCs face different directions');
    await page.evaluate(cell=>{Object.assign(gameDebug.active(),cell);gameDebug.render();camera.center(gameDebug.active(),true);},townStart);
    await rendererSettled();
    await assertStoneAtlas('streamed town');
    const places=await page.evaluate(()=>{
      const p=GeneratedWorlds.plan;const types=[...new Set(p.buildings.map(b=>b.type))];return ['town',...types.map(type=>p.buildings.find(b=>b.type===type).id),p.buildings.find(b=>b.cellar).cellar,p.buildings.find(b=>b.up).up,'out','dng:1','fort:yard','fort:keep','fort:up','fort:dng'];
    });
    for(const id of places){
      await page.evaluate(id=>{closeDialogue();gameDebug.enterScene(id,true);camera.center(gameDebug.active(),true);gameDebug.save();},id);
      await rendererSettled();assert.equal(await page.evaluate(()=>gameDebug.scene.id),id);
      if(id==='dng:1')await assertStoneAtlas('small stone interior');
      const render=await page.evaluate(()=>({surface:!!gameDebug.scene.surface,wall:gameDebug.scene.wallStyle,batch:voxel.staticBatchStats}));
      assert.ok(render.surface&&render.wall,'v2 floor and wall styles '+id);
      assert.ok(render.batch&&render.batch.props>0&&render.batch.drawMeshes<render.batch.sourceMeshes,'Ready static batching '+id);
      await page.screenshot({path:'qa/worldgen-'+id.replaceAll(':','-')+'-390.png'});
      assert.equal(await page.evaluate(()=>document.body.scrollWidth<=390),true,'mobile viewport '+id);
      console.log('PLACE',id);
    }
    // Choose actual generated props. Position at a legal adjacent cell to isolate UI/runtime from long walking routes.
    async function prepare(kind){const target=await page.evaluate(kind=>{
      closeDialogue();const plan=GeneratedWorlds.plan;for(const id of WorldGen.sceneIds(plan)){
        const s=World.scenes[id],p=s.props.find(p=>kind==='npc'?!!p.npc:kind==='door'?p.type==='door'&&p.lock:!!p.container&&!!p.trap&&!p.lock);if(!p)continue;
        gameDebug.enterScene(id);const a=gameDebug.active();const cell=World.directions.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(c=>!gameDebug.blocked(c)&&!gameDebug.all().some(actor=>actor.id!==a.id&&actor.x===c.x&&actor.y===c.y));if(!cell)continue;
        a.x=cell.x;a.y=cell.y;gameDebug.render();camera.center(a,true);return{id,pid:p.id,x:p.x,y:p.y};
      }throw Error('Missing '+kind);
    },kind);await rendererSettled(target);assert.equal(await page.evaluate(pid=>!!voxel.models.get('prop:'+pid),target.pid),true,'Prepared interaction has a ready real source model');return target;}
    const npc=await prepare('npc');await page.evaluate(async pid=>{const p=gameDebug.props.find(p=>p.id===pid);gameDebug.select(p);await gameDebug.approachInteract(p);},npc.pid);
    assert.equal(await page.locator('#speaker-art canvas').count(),1);
    assert.equal(await page.evaluate(()=>{const sheets=[];for(const a of gameDebug.state.party){voxel.models.get(a.id).traverse(m=>{if(m.userData.decal)sheets.push(m);});}const ids=new Set(sheets.map(m=>m.material.uuid));return ids.size===sheets.length&&sheets.every(m=>m.isInstancedMesh&&!m.frustumCulled&&m.material.polygonOffset&&!m.material.transparent&&m.material.opacity===1);}),true,'Independent opaque decal materials without culling');
    assert.equal(await page.evaluate(pid=>{const p=gameDebug.props.find(p=>p.id===pid),a=gameDebug.active(),dx=a.x-p.x,dy=a.y-p.y,f=Math.abs(dx)>Math.abs(dy)?dx>0?1:3:dy<0?2:0;return voxel.models.get('prop:'+pid).rotation.y===[0,Math.PI/2,Math.PI,-Math.PI/2][f];},npc.pid),true,'Talking NPC faces the hero');await page.screenshot({path:'qa/worldgen-dialogue-390.png'});
    await page.getByRole('button',{name:'Дальше',exact:true}).click();await page.getByRole('button',{name:'Попрощаться',exact:true}).click();
    assert.equal(await page.evaluate(pid=>{const m=voxel.models.get('prop:'+pid);return m.rotation.y===[0,Math.PI/2,Math.PI,-Math.PI/2][m.userData.idleFacing];},npc.pid),true,'Closing conversation restores idle pose');
    const door=await prepare('door');await page.evaluate(async pid=>{const p=gameDebug.props.find(p=>p.id===pid);gameDebug.active().inventory.push(p.lock.key||'Отмычки');gameDebug.select(p);await gameDebug.approachInteract(p);},door.pid);
    await page.screenshot({path:'qa/worldgen-lock-390.png'});
    if(await page.getByRole('button',{name:'Открыть ключом',exact:true}).count())await page.getByRole('button',{name:'Открыть ключом',exact:true}).click();else{await page.evaluate(()=>{const h=GeneratedWorlds.host();h.roll=()=>20;const p=gameDebug.props.find(p=>p.id===gameDebug.selected.id)||gameDebug.props.find(p=>p.type==='door'&&p.lock);WorldGen.Runtime.choose(h,gameDebug.state.scene,p,'force');closeDialogue();gameDebug.render();});}
    assert.equal(await page.evaluate(pid=>gameDebug.isOpen(gameDebug.props.find(p=>p.id===pid)),door.pid),true);await page.evaluate(()=>closeDialogue());
    const chest=await prepare('chest');await page.evaluate(async pid=>{const p=gameDebug.props.find(p=>p.id===pid);gameDebug.select(p);await gameDebug.approachInteract(p);},chest.pid);
    await page.screenshot({path:'qa/worldgen-chest-390.png'});const beforeGold=await page.evaluate(()=>gameDebug.state.gold);
    const open=page.getByRole('button',{name:/^Открыть( как есть)?$/});await open.click();
    await page.waitForFunction(pid=>gameDebug.state.gen.fired[gameDebug.state.scene+':'+pid]&&!HUD.active,chest.pid);
    const chestOutcome=await page.evaluate(pid=>({hp:gameDebug.active().hp,gold:gameDebug.state.gold,opened:!!gameDebug.state.gen.opened[gameDebug.state.scene+':'+pid],text:document.getElementById('dialogue-text').textContent}),chest.pid);
    console.log('CHEST_OUTCOME',chestOutcome);
    // The actual 2d6 trap can knock out a full-health level-one fighter. Verify
    // that legitimate branch before recovering this interaction fixture; no
    // trap roll or damage is overridden and the fired trap stays fired.
    if(chestOutcome.hp<=0){
      await page.waitForFunction(()=>document.getElementById('death-screen')?.open);
      assert.equal(chestOutcome.opened,false,'A lethal chest trap leaves its loot inside');
      assert.equal(chestOutcome.gold,beforeGold,'A lethal chest trap grants no reward');
      await page.evaluate(async pid=>{gameDebug.heal(gameDebug.active(),gameDebug.active().max);gameDebug.render();await gameDebug.approachInteract(gameDebug.props.find(p=>p.id===pid));},chest.pid);
      await page.getByRole('button',{name:'Открыть',exact:true}).click();
    }
    await page.getByRole('button',{name:'Закрыть',exact:true}).click();
    assert.equal(await page.evaluate(pid=>GeneratedWorlds.opened(gameDebug.props.find(p=>p.id===pid)),chest.pid),true);
    const afterGold=await page.evaluate(()=>gameDebug.state.gold);assert(afterGold>=beforeGold);
    await page.evaluate(async pid=>{const p=gameDebug.props.find(p=>p.id===pid);await gameDebug.approachInteract(p);},chest.pid);assert.match(await page.locator('#dialogue-text').innerText(),/пусто/);await page.getByRole('button',{name:'Закрыть',exact:true}).click();assert.equal(await page.evaluate(()=>gameDebug.state.gold),afterGold);
    await page.evaluate(async()=>{
      gameDebug.enterScene('dng:1');const t=gameDebug.scene.traps[0],a=gameDebug.active(),c=World.directions.map(([dx,dy])=>({x:t.x+dx,y:t.y+dy})).find(c=>!gameDebug.blocked(c));a.hp=a.max;a.x=c.x;a.y=c.y;gameDebug.render();camera.center(a,true);await voxel.regionIdle(90000);gameDebug.mapTap({x:t.x,y:t.y});const action=objectPrompt.actions.find(a=>a.id==='move');if(!action?.enabled)throw Error('No floor-trap route');gameDebug.dismissMapActions();action.run();while(gameDebug.moving||gameDebug.busy)await new Promise(r=>setTimeout(r,20));
      if(!gameDebug.state.gen.fired['dng:1:'+t.id])throw Error('Floor trap did not fire');
      gameDebug.save();Worlds.capture();if(!await Worlds.flush())throw Error('Save failed');
    });
    const before=await page.evaluate(()=>JSON.stringify(gameDebug.state)),layout=await page.evaluate(()=>JSON.stringify({tiles:World.scenes.town.tiles,props:World.scenes.town.props.map(({collision,...p})=>p)})),worldId=await page.evaluate(()=>Worlds.current.id);
    await page.screenshot({path:'qa/worldgen-trap-390.png'});await page.reload({waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.voxel?.ready);
    await page.getByRole('button',{name:'Продолжить',exact:true}).click();await page.waitForFunction(id=>Worlds.current?.id===id,worldId);
    assert.equal(await page.evaluate(()=>JSON.stringify(gameDebug.state)),before);await page.evaluate(async()=>{await GeneratedWorlds.ensure('town');await GeneratedWorlds.ensure('out');});assert.equal(await page.evaluate(()=>JSON.stringify({tiles:World.scenes.town.tiles,props:World.scenes.town.props.map(({collision,...p})=>p)})),layout);
    // Real portal back to outdoors and reciprocal entrance.
    // The trap can kill the hero; portal coverage requires a living actor.
    await page.evaluate(()=>{gameDebug.active().hp=gameDebug.active().max;gameDebug.enterScene('out');});await rendererSettled();const dest=await page.evaluate(()=>gameDebug.props.find(p=>p.destination==='town').destination);
    const portal=await page.evaluate(()=>{const p=gameDebug.props.find(p=>p.destination==='town');const a=gameDebug.active(),c=World.directions.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(c=>!gameDebug.blocked(c));if(!c)throw Error('No legal reciprocal portal fixture');a.x=c.x;a.y=c.y;gameDebug.render();camera.center(a,true);return{x:p.x,y:p.y};});await rendererSettled(portal);
    await page.evaluate(async()=>{await gameDebug.approachInteract(gameDebug.props.find(p=>p.destination==='town'));});await page.waitForFunction(()=>gameDebug.state.scene==='town');await rendererSettled();
    assert.equal(dest,'town');await page.evaluate(async()=>{gameDebug.save();Worlds.capture();if(!await Worlds.flush())throw Error('Final save failed');});
    assert.deepEqual(errors,[]);console.log('PASS worldgen browser: creation fields, all generated building types and outdoor/underground/fortress places, NPC portrait/dialogue, lock, trapped chest once, floor trap, reciprocal portal, real SQLite save/reload.');
  }finally{await browser?.close();server.close();db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
