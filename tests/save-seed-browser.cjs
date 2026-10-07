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
    const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];page.on('pageerror',e=>{console.error('PAGEERROR',e.message);errors.push(e.message)});page.on('console',m=>console.log('BROWSER',m.text()));page.on('requestfailed',r=>console.error('FAILED',r.url(),r.failure()));
    await page.goto('http://127.0.0.1:'+server.address().port);await page.waitForFunction(()=>window.voxel?.ready);
    await page.evaluate(async()=>{
      document.querySelectorAll('dialog').forEach(d=>d.close());
      const draft={name:'Regression',classId:'fighter',stats:HeroRules.preset('fighter'),appearance:Characters.defaultLook('fighter','male'),kit:0,background:HeroRules.background('fighter',()=>0)};
      const {hero}=await (await fetch('/api/heroes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)})).json();
      const {world}=await (await fetch('/api/worlds',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({heroId:hero.id,seed:'sxq4hzc5',size:'auto'})})).json();
      Worlds.attach(world);gameDebug.state.settings.animations=false;
      for(const id of ['town',GeneratedWorlds.plan.buildings.find(b=>b.type==='tavern').id]){
        await GeneratedWorlds.ensure(id);
        closeDialogue();gameDebug.enterScene(id,true);gameDebug.save();if(!await Worlds.flush())throw Error(id+' entry: '+document.getElementById('world-save').textContent);
        for(const p of gameDebug.props.filter(p=>p.npc&&(id!=='town'||p.id==='npc3')).slice(0,1)){
          const a=gameDebug.active(),c=World.directions.map(([dx,dy])=>({x:p.x+dx,y:p.y+dy})).find(c=>!gameDebug.blocked(c));if(!c)continue;
          a.x=c.x;a.y=c.y;gameDebug.render();await gameDebug.approachInteract(p,'inspect');if(/можно поговорить|находясь рядом|подойти|визуальный полигон|вкладке «Тест»/i.test(document.getElementById('dialogue-text').textContent))throw Error('Instruction leaked into inspection');closeDialogue();await gameDebug.approachInteract(p);gameDebug.save();
          if(!await Worlds.flush())throw Error(id+' npc '+p.id+': '+document.getElementById('world-save').textContent+' cell '+JSON.stringify({x:a.x,y:a.y,props:gameDebug.props.filter(p=>p.x===a.x&&p.y===a.y).map(p=>({id:p.id,type:p.type,solid:p.solid}))}));
          while(document.querySelector('#dialogue-options button')?.textContent==='Дальше'){document.querySelector('#dialogue-options button').click();if(!await Worlds.flush())throw Error('next: '+document.getElementById('world-save').textContent);}
          closeDialogue();
        }
      }
    });
    await page.route('**/api/worlds/*',async route=>{
      if(route.request().method()==='PUT')await route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Временная ошибка сохранения'})});else await route.continue();
    });
    await page.evaluate(async()=>{
      openObjectDialogue({name:'Запись',description:'Страница дневника.'});
      gameDebug.tell('Проверка сохранения');
      if(await Worlds.flush())throw Error('Expected save failure');
      if(document.getElementById('modal').open)throw Error('Autosave opened a menu');
      if(document.getElementById('dialogue').hidden)throw Error('Autosave replaced the dialogue');
      if(Worlds.locked)throw Error('Transient failure locked play');
      if(!Worlds.pending)throw Error('Lost pending state');
    });
    await page.unroute('**/api/worlds/*');assert.equal(await page.evaluate(()=>Worlds.flush()),true);
    console.log('PASS screenshot seed: canonical scenes/NPC saves and background error preserves dialogue without opening a menu; retry succeeds');
  }finally{await browser?.close();server.close();db.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
