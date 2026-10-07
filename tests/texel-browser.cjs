const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {build} = require('esbuild');
(async () => {
 const project = path.resolve(__dirname,'..');
 const fixture = await build({stdin:{contents:"import * as T from 'three'; window.TexelQA={T};",resolveDir:project},bundle:true,write:false,format:'iife'});
 const roots = {current:path.join(project,'dist'),baseline:process.env.TEXEL_BASELINE_DIR};
 const server = http.createServer((q,r)=>{
  const parts=q.url.split('?')[0].split('/');const mode=parts[1];
  if(q.url.includes('/api/')){r.setHeader('Content-Type','application/json');r.end(JSON.stringify({heroes:[],worlds:[]}));return;}
  if(q.url==='/fixture.js'){r.setHeader('Content-Type','application/javascript');r.end(fixture.outputFiles[0].contents);return;}
  const root=roots[mode],file=root&&path.join(root,parts.slice(2).join('/')||'index.html');
  try{r.setHeader('Content-Type',({js:'application/javascript',css:'text/css',html:'text/html',png:'image/png',svg:'image/svg+xml',woff:'font/woff'})[file.split('.').pop()]||'application/octet-stream');r.end(fs.readFileSync(file));}catch{r.statusCode=404;r.end();}
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const browser=await chromium.launch({executablePath:process.env.CHROME_EXECUTABLE,args:[...JSON.parse(process.env.CHROMIUM_ARGS||'[]'),'--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
 const page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true});const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 const url='http://127.0.0.1:'+server.address().port;
 await page.goto(url+'/current/');await page.waitForFunction(()=>voxel.ready);await page.addScriptTag({url:url+'/fixture.js'});
 await page.evaluate(()=>{document.querySelectorAll('dialog').forEach(d=>d.close());CinematicMenu.play();Worlds.detach();gameDebug.test('reset');closeDialogue();gameDebug.state.combat=false;viewsDebug.switchTab('map');gameDebug.render();voxel.sync();});
 const checks=await page.evaluate(()=>{
  const {T}=TexelQA;
  const sheets=m=>{const out=[];m.traverse(n=>{if(n.userData.decal){if(!n.isInstancedMesh||n.castShadow)throw Error('Unbatched or shadow-casting decal');out.push(n)}});return out;};
  const party=gameDebug.state.party.map(a=>sheets(voxel.models.get(a.id)).length);
  if(party.some(n=>n!==1))throw Error('Party must have exactly three sheets: '+party);
  Characters.RULES.texel=false;
  if(sheets(voxel.buildModel(2,gameDebug.active())).length)throw Error('Documented texel diagnostic switch ignored by 3D bundle');
  Characters.RULES.texel=true;
  let colors=0,portraits=0;
  for(const classId of ['fighter','wizard','rogue','cleric'])for(const gender of ['male','female']){
   const a={classId,kind:2,appearance:{...Characters.defaultLook(classId,gender),headgear:'wizhat'}};
   const spec=Characters.spec(2,a),decals=Characters.build(spec).filter(b=>b.length>8),model=voxel.buildModel(2,a),sheet=sheets(model);
   if(sheet.length!==1||sheet[0].count!==decals.length)throw Error('Wrong figure decal count');
   decals.forEach((d,i)=>{const color=new T.Color();sheet[0].getColorAt(i,color);if(color.getHex()!==d[6])throw Error('sRGB mismatch '+d[6].toString(16)+' '+color.getHexString());colors++;});
   const canvas=Characters.portrait(2,a),pixels=canvas.getContext('2d').getImageData(0,0,canvas.width,canvas.height).data,set=new Set();
   for(let i=0;i<pixels.length;i+=4)if(pixels[i+3])set.add(pixels[i]<<16|pixels[i+1]<<8|pixels[i+2]);
   const shared=new Set(decals.filter(d=>d[8]==='f'&&set.has(d[6])).map(d=>d[6]));
   if(shared.size<12)throw Error('Texel palette missing from portrait: '+shared.size);portraits+=shared.size;
   const before=model.children.length;voxel.compact(model);if(model.children.length!==before||sheets(model).length!==1)throw Error('Compact must be idempotent');
  }
  const enemies=[3,4].map(k=>{const m=voxel.buildModel(k,{kind:k});const s=sheets(m);if(s.length!==1||s[0].count<5)throw Error('Missing enemy/dummy texels');return {kind:k,decals:s[0].count};});
  const objects=[];
  for(const type of ['crate','chair','rack','banner','chest','cover','altar','books','desk','door','portal','decor','ground-item']){
   const m=voxel.buildProp({type});const s=sheets(m);if(!s.length)throw Error('Missing object texels '+type);objects.push({type,sheets:s.length,decals:s.reduce((n,v)=>n+v.count,0)});
  }
  const items=[];for(let id=31;id<=53;id++){
   const m=voxel.buildItem(id),s=sheets(m);items.push({id,sheets:s.length,decals:s.reduce((n,v)=>n+v.count,0)});
  }
  // A rotated barrel slat stays a mesh and receives no axis-aligned decals.
  const barrel=voxel.buildProp({type:'barrel'});let rotated=0;barrel.traverse(m=>{if(m.isInstancedMesh&&!m.userData.decal){const matrix=new T.Matrix4(),p=new T.Vector3(),q=new T.Quaternion(),s=new T.Vector3();for(let i=0;i<m.count;i++){m.getMatrixAt(i,matrix);matrix.decompose(p,q,s);if(Math.abs(q.y)>.01)rotated++;}}});
  if(rotated<8)throw Error('Rotated slats changed');
  // Render identical standalone/instanced colors through the actual Three WebGL pipeline.
  const renderer=new T.WebGLRenderer({antialias:false,preserveDrawingBuffer:true});renderer.setSize(160,80);renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=voxel.renderer.toneMapping;renderer.toneMappingExposure=voxel.renderer.toneMappingExposure;
  const scene=new T.Scene(),cam=new T.OrthographicCamera(-2,2,1,-1,.1,10);cam.position.z=3;
  scene.add(new T.AmbientLight(0xffffff,2));
  const group=new T.Group(),reference=voxel.shadedBox(group,0,0,0,.4,.4,.3,0xe9bf90),decal=group.children.find(m=>m.userData.decal),color=decal.material.color.clone();
  const original=new T.Mesh(decal.geometry,decal.material);original.position.x=-1;original.scale.set(.9,.9,.05);scene.add(original);
  const sample=new T.Group();const m=new T.Mesh(decal.geometry,decal.material);m.position.x=1;m.scale.copy(original.scale);m.userData.decal=true;sample.add(m);voxel.compact(sample);scene.add(sample);
  renderer.render(scene,cam);const gl=renderer.getContext(),left=new Uint8Array(4),right=new Uint8Array(4);gl.readPixels(40,40,1,1,gl.RGBA,gl.UNSIGNED_BYTE,left);gl.readPixels(120,40,1,1,gl.RGBA,gl.UNSIGNED_BYTE,right);
  if(left.some((v,i)=>Math.abs(v-right[i])>1))throw Error('Instancing changes rendered colors '+left+' / '+right);
  const litPair={left:[...left],right:[...right]};
  renderer.toneMapping=T.NoToneMapping;original.material=new T.MeshBasicMaterial({color,toneMapped:false});sample.children[0].material=new T.MeshBasicMaterial({color:0xffffff,toneMapped:false});renderer.render(scene,cam);gl.readPixels(120,40,1,1,gl.RGBA,gl.UNSIGNED_BYTE,right);
  const hex=color.getHex(),expected=[hex>>16&255,hex>>8&255,hex&255];if(expected.some((v,i)=>Math.abs(v-right[i])>1))throw Error('Rendered sRGB differs from portrait');
  renderer.dispose();
  let terrain=0;voxel.scene.traverse(m=>{if(m.isInstancedMesh&&m.material.map&&m.material.map.image?.width===8){terrain++;if(m.material.map.magFilter!==T.NearestFilter)throw Error('Terrain texels filtered');}});
  if(!terrain)throw Error('No coarse terrain texture');
  return {partySheets:party.reduce((a,b)=>a+b),colorInstances:colors,portraitTexelColors:portraits,enemies,objects,items,rotatedSlats:rotated,terrainBatches:terrain,renderedColorPair:litPair,renderedSrgb:[...right]};
 });
 assert.equal(checks.partySheets,3);console.log('PASS three party sheets, one per figure; no decal shadows; '+checks.colorInstances+' colors and GPU color parity');
 console.log('ITEM_COVERAGE',checks.items);
 fs.mkdirSync(path.join(project,'qa'),{recursive:true});
 await page.evaluate(()=>{gameDebug.state.party.forEach(a=>a.facing=0);voxel.sync();camera.zoom(1.5);camera.center(gameDebug.active());});
 await page.screenshot({path:path.join(project,'qa/texels-map-front-390.png')});
 await page.screenshot({path:path.join(project,'qa/texels-map-390.png')});
 await page.evaluate(()=>{gameDebug.enterScene('crypt',true);voxel.sync();camera.center(gameDebug.active());});
 await page.waitForTimeout(150);await page.screenshot({path:path.join(project,'qa/texels-crypt-390.png')});
 await page.evaluate(()=>{Heroes.start();Heroes.open();Heroes.draft.classId='wizard';Heroes.draft.appearance=Characters.defaultLook('wizard','male');Heroes.draft.appearance.headgear='wizhat';});
 await page.getByRole('button',{name:'3 · Внешность',exact:true}).click();
 await page.screenshot({path:path.join(project,'qa/texels-editor-390.png')});
 const fps=[];
 for(const mode of roots.baseline?['baseline','current']:['current']){
  await page.goto(url+'/'+mode+'/');await page.waitForFunction(()=>voxel.ready);
  await page.evaluate(()=>{document.querySelectorAll('dialog').forEach(d=>d.close());CinematicMenu.play();Worlds.detach();gameDebug.test('reset');closeDialogue();viewsDebug.switchTab('map');gameDebug.render();voxel.sync();});
  await page.waitForTimeout(300);
  const result=await page.evaluate(()=>new Promise(resolve=>{
   const renderer=voxel.renderer,render=renderer.render;let draws=0;const costs=[];const start=performance.now();
   renderer.render=function(...args){const t=performance.now();const result=render.apply(this,args);draws++;costs.push(performance.now()-t);return result;};
   setTimeout(()=>{renderer.render=render;const seconds=(performance.now()-start)/1000;const sorted=costs.sort((a,b)=>a-b);resolve({seconds,renderFps:draws/seconds,meanRenderMs:costs.reduce((a,b)=>a+b,0)/costs.length,p95RenderMs:sorted[Math.floor(sorted.length*.95)],calls:renderer.info.render.calls,triangles:renderer.info.render.triangles,webgl:renderer.getContext().getParameter(renderer.getContext().VERSION)});},5000);
  }));fps.push({mode,...result});console.log('BENCHMARK',mode,result);
 }
 assert.deepEqual(errors,[],'No browser errors');
 fs.writeFileSync(path.join(project,'qa/texels-results.json'),JSON.stringify({checks,fps,environment:'Chromium SwiftShader software GPU; 390×844; not a physical iPhone',physicalIPhoneTested:false},null,2));
 await browser.close();server.close();console.log('PASS texel browser checks');
})().catch(e=>{console.error(e);process.exit(1)});
