// Repeatable software-GPU comparison; these timings are not an iPhone benchmark.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const {configureBrowserPage}=require('./browser-harness.cjs');
(async()=>{
  const root=path.resolve(__dirname,'../dist/client'),results=[];
  const server=http.createServer((req,res)=>{
    const pathname=new URL(req.url,'http://localhost').pathname;
    if(pathname==='/favicon.ico'){res.writeHead(204);res.end();return;}
    if(pathname.startsWith('/api/')){res.writeHead(503);res.end();return;}
    const file=path.resolve(root,'.'+(pathname==='/'?'/index.html':decodeURIComponent(pathname)));
    if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    try{res.setHeader('Content-Type',{'.js':'text/javascript','.css':'text/css','.html':'text/html','.svg':'image/svg+xml','.png':'image/png','.woff':'font/woff','.ttf':'font/ttf'}[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}
  });
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  let browser;
  try{
    const R=await import('../src/hero-rules.js');
    browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE||'/usr/bin/chromium',args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader',...JSON.parse(process.env.CHROMIUM_ARGS||'[]')]});
    for(const [label,query]of [['chunk16',''],['chunk12','&qa=1&regionChunk=12'],['chunk24','&qa=1&regionChunk=24'],['full','&qa=1&regionFull=1']]){
      const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];
      await configureBrowserPage(page);page.on('pageerror',e=>errors.push(e.message));
      await page.goto('http://127.0.0.1:'+server.address().port+'/?offline=1'+query,{waitUntil:'domcontentloaded'});
      await page.waitForFunction(()=>voxel?.ready&&NativeRuntime?.offline);
      const draft={name:'Путник сравнения',classId:'fighter',stats:R.preset('fighter'),appearance:Object.fromEntries(Object.entries(R.COLORS).map(([k,v])=>[k,v[0]])),kit:0,background:R.background('fighter',()=>0)};
      const timing=await page.evaluate(async draft=>{
        const response=await fetch('/api/heroes',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(draft)}),data=await response.json();if(!response.ok)throw Error(data.error);
        // Explicit benchmark identity keeps the scenery seed identical across
        // isolated pages; API-generated hero UUIDs otherwise change that seed.
        document.querySelectorAll('dialog').forEach(d=>d.close());Worlds.detach();CinematicMenu.play();gameDebug.loadHero({...data.hero,id:'region-benchmark-hero'});gameDebug.state.settings.animations=false;gameDebug.state.settings.lights=false;
        const began=performance.now();await Worlds.startRegionWalk();const startMs=performance.now()-began;
        await new Promise(requestAnimationFrame);const firstFrameMs=performance.now()-began;
        let maxBuildMs=voxel.regionStats.lastBuildMs;
        while(!voxel.regionStats.idle){await new Promise(requestAnimationFrame);maxBuildMs=Math.max(maxBuildMs,voxel.regionStats.lastBuildMs);if(performance.now()-began>90000)throw Error('Benchmark loading timeout');}
        await new Promise(requestAnimationFrame);
        return {startMs,firstFrameMs,settledMs:performance.now()-began,maxBuildMs,settings:structuredClone(gameDebug.state.settings),stats:voxel.regionStats};
      },draft);
      assert.equal(await page.evaluate(()=>gameDebug.state.scene),'region-walk');
      assert.equal(await page.evaluate(()=>gameDebug.scene.layoutKey),'region-walk:region-walk-region-benchmark-hero');
      assert(await page.locator('#viewport').isVisible(),'The benchmark renders the actual game view');
      assert.deepEqual(errors,[]);
      results.push({label,...timing});console.log('REGION_BENCHMARK',JSON.stringify(results.at(-1)));
      if(label==='chunk16'){
        await page.evaluate(async()=>{camera.fit();await voxel.regionIdle();await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));});
        assert(await page.locator('#viewport').isVisible(),'Overview keeps the game view visible');
        const qa=process.env.REGION_QA_DIR||'/workspace/dndigra-region-work/screenshots';fs.mkdirSync(qa,{recursive:true});
        await page.screenshot({path:path.join(qa,'walk-overview-390.png')});
      }
      await page.close();
    }
    const file=process.env.REGION_BENCHMARK_REPORT||'/workspace/dndigra-region-work/benchmark.json';fs.writeFileSync(file,JSON.stringify({environment:'Linux Chromium SwiftShader; one sample per configuration; actual practice settings recorded per sample',results},null,2)+'\n');
    console.log('PASS same-fixture region comparison; report '+file);
  }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
