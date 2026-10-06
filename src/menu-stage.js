import * as T from 'three';
import {fitPreviewCamera} from './preview-frame.js';

// A presentation scene, independent of the installed world and its save data.
export function createMenuStage({figure, propModel, shadedBox, compact, terrainMaterial}) {
  const scene = new T.Scene(); scene.background = new T.Color('#26201a');
  const camera = new T.OrthographicCamera(-4,4,8,-8,.1,60);
  const room = new T.Group(); scene.add(room);
  const architecture = new T.Group(), fixtures=[], patrons=[], flames=[];
  const palette=[0x7c7a76,0x87847e,0x706e69,0x8c8981,0x797670];
  // Staggered stone masonry and individual warm floor tiles; no flat room-sized slab.
  for(let row=0;row<15;row++)for(let col=-5;col<=5;col++){
    const x=col*.84+(row%2)*.42;
    shadedBox(architecture,x,row*.47+.24,-4.5,.81,.44,.38,palette[(col+row*3+25)%palette.length]);
  }
  for(let row=0;row<15;row++)for(let col=0;col<16;col++)
    shadedBox(architecture,-4.65,row*.47+.24,-4.4+col*.82+(row%2)*.41,.38,.44,.79,palette[(col+row*3)%palette.length]);
  const floorGeometry=new T.BoxGeometry(.487,.06,.487),tileColors=[0x84603f,0x735236,0x906747,0x7f573a,0x795239],tileGroups=tileColors.map(()=>[]);
  for(let x=-12;x<=12;x++)for(let z=-10;z<=24;z++){const i=(x*7+z*3+160)%5;tileGroups[i].push([x*.5,-.044,z*.5]);}
  for(let i=0;i<5;i++){const mesh=new T.InstancedMesh(floorGeometry,terrainMaterial(tileColors[i],1),tileGroups[i].length),matrix=new T.Matrix4();tileGroups[i].forEach((p,n)=>{matrix.makeTranslation(...p);mesh.setMatrixAt(n,matrix);});mesh.receiveShadow=true;room.add(mesh);}
  for(const x of [-4.35,-1.5,2.4,4.4]){
    shadedBox(architecture,x,1.68,-4.24,.16,3.36,.20,0x402d20);
    shadedBox(architecture,x,.18,-4.16,.25,.34,.30,0x30251c);
  }
  for(const y of [.5,2.7,3.27])shadedBox(architecture,0,y,-4.21,9,.16,.22,0x483122);
  room.add(compact(architecture));
  const add=(type,x,z,rotation=0,id=type)=>{const m=propModel({type,id});m.position.set(x,0,z);m.rotation.y=rotation;room.add(m);fixtures.push(m);return m;};
  const addBox=(parent,x,y,z,w,h,d,color)=>shadedBox(parent,x,y,z,w,h,d,color);
  const candle=(parent,x,y,z)=>{
    const holder=new T.Group();holder.position.set(x,y,z);parent.add(holder);
    addBox(holder,0,.02,0,.16,.035,.16,0x765132);addBox(holder,0,.12,0,.07,.18,.07,0xf0d4a0);
    const fire=new T.Group();fire.position.y=.25;holder.add(fire);
    shadedBox(fire,0,0,0,.065,.13,.065,0xffa62e,true);shadedBox(fire,0,-.015,.002,.037,.08,.04,0xffdf82,true);
    flames.push({m:fire,phase:flames.length*.8});return holder;
  };
  // Shelves of distinct bottles and cups behind a long bar.
  function shelf(x,z){const g=new T.Group();g.position.set(x,0,z);room.add(g);
    for(const px of [-.67,.67])addBox(g,px,1.2,0,.09,2.4,.38,0x543923);
    for(let row=0;row<4;row++){
      const y=.36+row*.48;addBox(g,0,y,.04,1.46,.075,.48,0x704a2c);
      for(let i=0;i<6;i++){const px=-.55+i*.22,color=[0x4a6652,0x765935,0x846448,0x365a54,0x93764b,0x66372e][(i+row)%6],height=.19+(i%3)*.035;
        addBox(g,px,y+height/2+.06,.05,.12,height,.12,color);addBox(g,px,y+height+.07,.05,.055,.075,.06,color);addBox(g,px,y+height+.11,.05,.065,.022,.065,0xb28b55);
      }
    }compact(g);
  }
  shelf(-3.3,-4.02);shelf(-1.73,-4.02);
  for(let x=-3.55;x<.0;x+=.96)add('counter',x,-2.55);
  add('barrel',-4,-3.35);add('chair',-2.8,-1.55,Math.PI);
  const table=(x,z)=>{const g=new T.Group();g.position.set(x,0,z);room.add(g);
    for(const px of [-.58,.58])for(const pz of [-.39,.39])addBox(g,px,.32,pz,.12,.64,.12,0x634125);
    for(let i=0;i<4;i++)addBox(g,-.57+i*.38,.73,0,.37,.12,1.05,[0x8b5b32,0x82532e,0x986738,0x87592f][i]);
    addBox(g,0,.39,.22,1.3,.09,.07,0x50331f);
    addBox(g,.25,.87,-.24,.13,.18,.13,0x7e4e2a);addBox(g,.25,.966,-.24,.11,.015,.11,0xbaa77f);
    addBox(g,-.35,.845,.15,.27,.1,.20,0x9c784a);compact(g);candle(g,-.47,.79,-.24);return g;
  };
  table(.5,-.15);add('chair',.36,-1.13,0);add('chair',1.52,-.13,-Math.PI/2);
  table(.2,3.55);add('chair',.15,2.6,0);add('chair',1.23,3.55,-Math.PI/2);
  // A recessed hearth, rather than the cooking stove from the kitchen.
  const hearthModel=new T.Group();hearthModel.position.set(.85,0,-3.75);room.add(hearthModel);
  for(const x of [-.65,.65])for(let i=0;i<4;i++)addBox(hearthModel,x,.27+i*.38,0,.4,.36,.8,palette[i]);
  addBox(hearthModel,0,.09,.25,1.78,.17,1.32,0x625e55);addBox(hearthModel,0,1.64,0,1.77,.27,1.03,0x706b5f);for(let row=0;row<6;row++)for(let col=0;col<2;col++)addBox(hearthModel,(col-.5)*.65,1.88+row*.22,-.1,.63,.20,.69,palette[(row+col)%5]);
  addBox(hearthModel,0,.83,-.38,.95,1.18,.07,0x18130e);
  for(const x of [-.22,.18]){const log=addBox(hearthModel,x,.27,.26,.68,.13,.15,0x49301d);log.rotation.y=x*2;}
  compact(hearthModel);
  const fire=new T.Group();fire.position.set(.85,.4,-3.48);room.add(fire);
  for(let i=0;i<4;i++){const f=new T.Group();f.position.set((i-1.5)*.17,0,0);fire.add(f);shadedBox(f,0,.1,0,.19,.33,.12,0xf08721,true);shadedBox(f,0,.06,.025,.095,.22,.10,0xffd366,true);flames.push({m:f,phase:i*1.5});}
  for(const [x,z] of [[-4.39,-2.1],[.65,-4.18]]){const torch=add('torch',x,z);torch.position.y=1.25;}
  // Low, compact hanging candle holder, with a real chain.
  const chandelier=new T.Group();chandelier.position.set(-.18,0,-.85);room.add(chandelier);
  addBox(chandelier,0,2.75,0,.028,.75,.028,0x514334);addBox(chandelier,0,2.36,0,.82,.075,.65,0x70472b);
  for(const x of [-.31,.31])for(const z of [-.23,.23])candle(chandelier,x,2.4,z);compact(chandelier);
  candle(room,-3.5,.81,-2.45);
  const rugCanvas=document.createElement('canvas');rugCanvas.width=256;rugCanvas.height=384;const rc=rugCanvas.getContext('2d');
  rc.fillStyle='#6e2026';rc.fillRect(0,0,256,384);rc.strokeStyle='#b18c4a';rc.lineWidth=7;rc.strokeRect(14,14,228,356);rc.lineWidth=3;rc.strokeRect(26,26,204,332);
  for(let y=47;y<360;y+=32)for(let x=44;x<230;x+=34){rc.fillStyle=(x+y)%3?'#b18a43':'#8a3f32';rc.fillRect(x,y,9,5);}
  rc.save();rc.translate(128,192);rc.rotate(Math.PI/4);rc.strokeStyle='#b79850';rc.lineWidth=6;rc.strokeRect(-43,-43,86,86);rc.strokeRect(-27,-27,54,54);rc.restore();
  const rugTexture=new T.CanvasTexture(rugCanvas);rugTexture.magFilter=T.NearestFilter;rugTexture.colorSpace=T.SRGBColorSpace;const rug=new T.Mesh(new T.PlaneGeometry(3.15,5.2),new T.MeshStandardMaterial({map:rugTexture,roughness:1}));rug.rotation.x=-Math.PI/2;rug.position.set(-1.9,.006,1);rug.receiveShadow=true;room.add(rug);
  const actor=(kind,x,z,rotation,seated=false,npcId,look={})=>{
    const spec={kind,npcId,hands:['empty','empty']};if(!npcId)spec.appearance={...window.Characters.defaultLook({0:'rogue',1:'wizard',2:'fighter',5:'cleric'}[kind],'male'),...look};
    const m=figure(kind,spec,{articulated:true,base:false});m.position.set(x,seated?.20:0,z);m.rotation.y=rotation;m.scale.setScalar(1.08);scene.add(m);
    const rig=m.userData.rig;if(seated)rig.legL.rotation.x=rig.legR.rotation.x=-1.05;
    const mug=new T.Group();shadedBox(mug,0,0,0,.105,.12,.105,0x865d35);shadedBox(mug,.062,.01,0,.04,.07,.025,0xac8050);mug.position.set(.31,.53,.23);m.add(mug);
    patrons.push({m,rig,mug,phase:patrons.length*3.4,seated,baseY:m.position.y});return m;
  };
  actor(5,-2.2,-3.1,.30,false,'innkeeper');
  actor(2,.36,-1.13,.25,true,undefined,{hair:'#593321',hairStyle:'short'});
  actor(0,1.52,-.13,-Math.PI/2,true,undefined,{hair:'#392c22',cloth:'#6b674c'});
  actor(1,.15,2.6,.25,true,undefined,{headgear:'none',hair:'#c7c4bf',beard:'none',cloth:'#385168',hairStyle:'short'});
  const hemisphere=new T.HemisphereLight(0xe7e1d5,0x493628,.8);scene.add(hemisphere);
  const key=new T.DirectionalLight(0xffecd5,2.1);key.position.set(-2,7,5);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.camera.left=-8;key.shadow.camera.right=8;key.shadow.camera.top=8;key.shadow.camera.bottom=-8;key.shadow.normalBias=.02;scene.add(key);
  const hearth=new T.PointLight(0xff8d27,7,8,1.7);hearth.position.set(.85,.9,-3.03);scene.add(hearth);
  const candles=new T.PointLight(0xffb758,5,8,1.5);candles.position.set(-1.0,2.3,-1.8);scene.add(candles);
  const grid=new T.GridHelper(12,12,0xcdb07b,0x98724b);grid.position.y=.018;grid.material.transparent=true;grid.material.opacity=.16;scene.add(grid);
  const positions=new Float32Array(12*3), particleGeometry=new T.BufferGeometry();particleGeometry.setAttribute('position',new T.BufferAttribute(positions,3));
  const sparks=new T.Points(particleGeometry,new T.PointsMaterial({color:0xffd481,size:.035,transparent:true,opacity:.8,depthWrite:false}));scene.add(sparks);
  const smokeCanvas=document.createElement('canvas');smokeCanvas.width=smokeCanvas.height=32;const ctx=smokeCanvas.getContext('2d'),gradient=ctx.createRadialGradient(16,16,0,16,16,16);gradient.addColorStop(0,'rgba(130,119,100,.09)');gradient.addColorStop(1,'rgba(130,119,100,0)');ctx.fillStyle=gradient;ctx.fillRect(0,0,32,32);
  const smokeMaterial=new T.SpriteMaterial({map:new T.CanvasTexture(smokeCanvas),transparent:true,depthWrite:false});const smoke=Array.from({length:3},()=>{const m=new T.Sprite(smokeMaterial);scene.add(m);return m;});
  const preview=new T.Scene(), previewCamera=new T.OrthographicCamera(-1,1,1,-1,.1,20);preview.add(new T.HemisphereLight(0xffefcf,0x695866,2));const previewLight=new T.DirectionalLight(0xffffff,2.2);previewLight.position.set(-2,4,5);preview.add(previewLight);
  let hero=null, oldHero=null, heroKey='', changedAt=0, rotation=.22, velocity=0, pointer=null, lastTime=0, clock=0, cameraMix=0;
  function release(model){if(!model)return;preview.remove(model);model.traverse(m=>{if(m.isInstancedMesh)m.dispose();if(m.userData.menuMaterials)for(const mat of m.userData.menuMaterials)mat.dispose();});}
  function fade(model,opacity){model?.traverse(m=>{if(!m.isMesh)return;if(!m.userData.menuMaterials){const originals=Array.isArray(m.material)?m.material:[m.material];m.userData.menuMaterials=originals.map(v=>v.clone());m.material=Array.isArray(m.material)?m.userData.menuMaterials:m.userData.menuMaterials[0];}for(const mat of m.userData.menuMaterials){mat.transparent=opacity<1;mat.opacity=opacity;mat.depthWrite=opacity>=.99;}});}
  function setHero(spec){
    const k=JSON.stringify([spec.kind,spec.classId,spec.appearance,spec.hands]);if(k===heroKey)return;
    release(oldHero);oldHero=hero;hero=figure(spec.kind,spec,{articulated:true,base:false});preview.add(hero);heroKey=k;changedAt=clock;fade(hero,0);
  }
  function bindRotation(el){if(!el||el.dataset.liveRotation)return;el.dataset.liveRotation='true';el.style.touchAction='pan-y';
    el.onpointerdown=e=>{pointer={x:e.clientX,time:performance.now()};velocity=0;el.setPointerCapture(e.pointerId);};
    el.onpointermove=e=>{if(!pointer)return;const now=performance.now(),delta=(e.clientX-pointer.x)*.012*(window.CinematicMenu.controls?.sensitivity||1);rotation+=delta;velocity=T.MathUtils.clamp(delta/Math.max(.008,(now-pointer.time)/1000),-4,4);pointer={x:e.clientX,time:now};};
    el.onpointerup=el.onpointercancel=()=>{pointer=null;};el.onclick=null;
  }
  function render(renderer,time,settings,editor){
    const dt=Math.min(.05,Math.max(0,(time-lastTime)/1000));lastTime=time;
    const animated=settings.animations&&!matchMedia('(prefers-reduced-motion: reduce)').matches;if(animated)clock+=dt;
    const t=clock,w=renderer.domElement.clientWidth,h=renderer.domElement.clientHeight;
    cameraMix=animated?cameraMix+(Number(!!editor)-cameraMix)*Math.min(1,dt*3):Number(!!editor);
    const halfW=w>650?5.3:3.65;camera.left=-halfW;camera.right=halfW;camera.top=halfW*h/w;camera.bottom=-halfW*h/w;camera.position.set(7+Math.sin(t*.07)*.065-cameraMix*.2,10.8+Math.sin(t*.09)*.035,14-cameraMix*.3);camera.lookAt(-.05,0,1.25);camera.updateProjectionMatrix();
    hemisphere.intensity=.4+settings.ambient*1.8;key.intensity=settings.lights?1.7:.65;
    hearth.intensity=settings.lights?settings.intensity*(6+Math.sin(t*8)*.18+Math.sin(t*17)*.1):0;
    candles.intensity=settings.lights?settings.intensity*(4.3+Math.sin(t*5)*.1):0;grid.visible=settings.grid;
    for(const m of fixtures)for(const f of m.userData.flames||[]){f.userData.menuRestScaleY ??= f.scale.y;f.scale.y=f.userData.menuRestScaleY*(1+Math.sin(t*8+f.position.x*4)*.08);}
    for(const f of flames){f.m.scale.y=1+Math.sin(t*8+f.phase)*.09;}
    for(const p of patrons){const u=t+p.phase,cycle=(u%18),lift=cycle>9&&cycle<14?Math.sin((cycle-9)/5*Math.PI):0;
      p.m.position.y=p.baseY+Math.sin(u*1.4)*.008;p.rig.torso.scale.y=1+Math.sin(u*1.4)*.009;p.rig.head.rotation.y=Math.sin(u*.33)*.1;
      p.rig.armR.rotation.x=-lift*1.5;p.rig.armR.rotation.z=-lift*.25;
      p.mug.position.set(.31-lift*.11,.53+lift*.42,.23-lift*.16);p.mug.rotation.x=-lift*.4;
    }
    for(let i=0;i<12;i++){const u=(t*.17+i*.618)%1;positions[i*3]=.85+Math.sin(i*4.2+u*3)*.17;positions[i*3+1]=u<.16?.25+u*5:-100;positions[i*3+2]=-3.4+Math.sin(i*2.1)*.12;}
    sparks.visible=animated&&settings.lights;particleGeometry.attributes.position.needsUpdate=true;
    smoke.forEach((s,i)=>{const u=(t*.07+i*.2)%1;s.position.set(.85+Math.sin(u*5)*.1,.8+u*1.4,-3.4);s.scale.setScalar(.3+u*.45);s.visible=settings.lights;});
    renderer.shadowMap.needsUpdate=animated&&time-(render.lastShadow||0)>120;if(renderer.shadowMap.needsUpdate)render.lastShadow=time;renderer.setViewport(0,0,w,h);renderer.setScissorTest(false);renderer.autoClear=true;renderer.render(scene,camera);
    if(!editor?.actor||!editor.anchor?.isConnected)return;
    setHero(editor.actor);bindRotation(editor.anchor);
    if(!pointer){if(animated&&window.CinematicMenu.controls?.inertia!==false){rotation+=velocity*dt;velocity*=Math.exp(-dt*6);}else velocity=0;}
    hero.rotation.y=rotation;hero.position.y=Math.sin(t*1.6)*.008;hero.userData.rig.head.rotation.y=Math.sin(t*.55)*.025;hero.userData.rig.armR.rotation.z=Math.sin(t*1.2)*.025;
    const progress=animated?Math.min(1,(clock-changedAt)/.22):1;fade(hero,progress);if(oldHero){oldHero.rotation.y=rotation;fade(oldHero,1-progress);if(progress===1){release(oldHero);oldHero=null;}}
    const r=editor.anchor.getBoundingClientRect(),canvasRect=renderer.domElement.getBoundingClientRect(),x=r.left-canvasRect.left,y=h-(r.bottom-canvasRect.top);
    if(r.width<1||r.height<1)return;
    previewCamera.position.set(0,1.15,4);previewCamera.lookAt(0,.64,0);fitPreviewCamera(previewCamera,hero,r.width/r.height,1.15);
    renderer.setViewport(x,y,r.width,r.height);renderer.setScissor(Math.max(0,x),Math.max(0,y),r.width,Math.min(r.height,h-y));renderer.setScissorTest(true);renderer.autoClear=false;renderer.clearDepth();renderer.render(preview,previewCamera);renderer.autoClear=true;renderer.setScissorTest(false);renderer.setViewport(0,0,w,h);
  }
  return {render,turn:delta=>{rotation+=delta;velocity=0;},get debug(){return {clock,rotation,velocity,camera:[...camera.position],patrons:patrons.map(p=>({head:p.rig.head.rotation.y,arm:p.rig.armR.rotation.x})),drawCalls:scene.children.length};}};
}
