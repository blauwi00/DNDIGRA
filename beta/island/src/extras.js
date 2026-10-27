// ---------- day and night ----------
// One day lasts 20 real minutes, as in the game. The clock stops during fights and
// conversations and indoors the room keeps its own light.
const DAY_MS=20*60*1000;let worldTime=.86; // start late in the evening
const SKY=[ // phase, hemi sky, hemi ground, hemi power, sun colour, sun power, fog colour, fog density
  [0,0x6a7fa0,0x2a2018,.75,0x9fb4d8,.6,0x0d1418,.05],[.2,0x6a7fa0,0x2a2018,.75,0x9fb4d8,.6,0x0d1418,.05],
  [.27,0xc8a0a0,0x4a3828,.9,0xffb080,.8,0x5a5060,.04],[.35,0xbcd4ff,0x5a4a30,1.05,0xfff2d8,1,0x8aa8b8,.028],
  [.7,0xbcd4ff,0x5a4a30,1.05,0xfff2d8,1,0x8aa8b8,.028],[.78,0xc89080,0x4a3428,.85,0xff9060,.7,0x4a3a48,.04],
  [.86,0x6a7fa0,0x2a2018,.75,0x9fb4d8,.6,0x0d1418,.05],[1,0x6a7fa0,0x2a2018,.75,0x9fb4d8,.6,0x0d1418,.05]];
const cA=new THREE.Color(),cB=new THREE.Color(),titleEl=document.querySelector('.title h1');
const nightness=()=>{const p=worldTime;return p<.22||p>.82?1:p<.33?(.33-p)/.11:p>.72?(p-.72)/.1:0;};
const partOfDay=()=>{const p=worldTime;return p<.22||p>=.86?'ночь':p<.35?'утро':p<.72?'день':'вечер';};
let lastPart='';
function worldTick(dt){const talking=!document.getElementById('talk').hidden;if(!CB.on&&!talking)worldTime=(worldTime+dt*1000/DAY_MS)%1;
  const part=partOfDay();if(part!==lastPart){lastPart=part;titleEl.textContent='Остров Хельги · '+part;}
  if(room&&!room.inPlace)return;const p=worldTime;let i=0;while(SKY[i+1][0]<p)i++;const a=SKY[i],b=SKY[i+1],k=(p-a[0])/(b[0]-a[0]||1);
  const mix=(x,y)=>cA.setHex(x).lerp(cB.setHex(y),k);
  hemi.color.copy(mix(a[1],b[1]));hemi.groundColor.copy(mix(a[2],b[2]));hemi.intensity=a[3]+(b[3]-a[3])*k;
  moon.color.copy(mix(a[4],b[4]));moon.intensity=a[5]+(b[5]-a[5])*k;scene.fog.color.copy(mix(a[6],b[6]));scene.fog.density=(a[7]+(b[7]-a[7])*k)/(window.CAM_SCALE||1);scene.background.copy(scene.fog.color);
  const ang=p*Math.PI*2;moon.position.set(focus.x+Math.sin(ang)*8,14,focus.z-4+Math.cos(ang)*3);}

// ---------- sound: synthesised from physical models, no audio files ----------
// No beeps: creaks are stick-slip friction pulses through wood resonances, knocks are
// impulses into resonators, steps and swings are shaped noise. A short generated
// reverb gives rooms some air.
let AC=null,master=null,dry=null,verb=null,muted=false;try{muted=localStorage.getItem('helga-sound')==='off'}catch(e){}
function audio(){if(AC)return AC;try{AC=new (window.AudioContext||window.webkitAudioContext)();master=AC.createGain();master.gain.value=muted?0:vol;
  const comp=AC.createDynamicsCompressor();comp.threshold.value=-18;comp.ratio.value=3;master.connect(comp).connect(AC.destination);
  dry=AC.createGain();dry.connect(master);verb=AC.createConvolver();verb.buffer=impulse(1.6,2.6);const vg=AC.createGain();vg.gain.value=.22;verb.connect(vg).connect(master);ambient();}catch(e){AC=null}return AC;}
addEventListener('pointerdown',()=>{audio();if(AC&&AC.state==='suspended')AC.resume();},{capture:true});
function impulse(sec,decay){const sr=AC.sampleRate,n=sr*sec,b=AC.createBuffer(2,n,sr);for(let c=0;c<2;c++){const d=b.getChannelData(c);let y=0;
  for(let i=0;i<n;i++){const k=i/n,a=Math.exp(-2*Math.PI*(6000-5000*k)/sr);y=(1-a)*(Math.random()*2-1)+a*y;d[i]=y*Math.pow(1-k,decay)*2;}
  for(const [ms,g] of [[11,.5],[19,.35],[29,.28],[41,.2]]){const j=Math.floor(sr*ms/1000*(1+c*.07));d[j]+=g;}}return b;}
const nb={};function noiseB(sec){const k=Math.round(sec*10);if(nb[k])return nb[k];const b=AC.createBuffer(1,Math.max(1,AC.sampleRate*sec),AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1;return nb[k]=b;}
// route a source through a chain and an amplitude envelope; wet sends some to the reverb
function out(node,t,a,peak,rel,wet=.3){const g=AC.createGain();g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(peak,t+a);g.gain.exponentialRampToValueAtTime(.0001,t+a+rel);
  node.connect(g);g.connect(dry);const s=AC.createGain();s.gain.value=wet*(room?1.6:.6);g.connect(s).connect(verb);return g;}
function filt(type,f,q=1){const x=AC.createBiquadFilter();x.type=type;x.frequency.value=f;x.Q.value=q;return x;}
function chain(src,...fs){let n=src;for(const f of fs){n.connect(f);n=f;}return n;}
function burst(t,dur,vol,type,f,q,a=.003,wet=.3){const s=AC.createBufferSource();s.buffer=noiseB(dur+.1);const n=chain(s,filt(type,f,q));out(n,t,a,vol,dur,wet);s.start(t);s.stop(t+dur+.1);}
// wood knock: an impulse rung through two body resonances
function knockW(t,vol,f=180){for(const [m,q,v] of [[1,12,1],[2.7,9,.5],[5.1,6,.25]])burst(t,.12,vol*v,'bandpass',f*m,q,.001,.35);}
// stick-slip creak: irregular pulses whose rate glides, filtered by wooden formants
function creak(t,dur,vol,f0=55,f1=120,bright=1){const sr=AC.sampleRate,n=Math.floor(sr*dur),b=AC.createBuffer(1,n,sr),d=b.getChannelData(0);let ph=0;
  for(let i=0;i<n;i++){const k=i/n,rate=(f0+(f1-f0)*Math.sin(k*Math.PI*.9))*(1+.25*Math.sin(k*37)+(Math.random()-.5)*.3);ph+=rate/sr;if(ph>=1){ph-=1;d[i]=.8+Math.random()*.4;}else d[i]=0;
    d[i]*=Math.sin(Math.PI*Math.min(1,k*1.2));}
  const s=AC.createBufferSource();s.buffer=b;const mix=AC.createGain();mix.gain.value=1;
  for(const [f,q,v] of [[480*bright,9,1],[1150*bright,7,.6],[2300*bright,6,.3],[260,5,.5]]){const bp=filt('bandpass',f,q),g=AC.createGain();g.gain.value=v;s.connect(bp).connect(g).connect(mix);}
  out(mix,t,.02,vol,dur,.35);s.start(t);}
function toneS(t,f,dur,vol,type='sine',wet=.4){const o=AC.createOscillator();o.type=type;o.frequency.value=f;out(o,t,.004,vol,dur,wet);o.start(t);o.stop(t+dur+.05);}
// Every effect is rendered once into a buffer, like a recording, from small physical models:
// resonant modes for wood, bone and metal, grains for crunch and gravel, brown and pink noise
// for air and water. Each has a few takes so repeats never sound the same.
const SR=()=>AC.sampleRate,RND=Math.random;
function zRec(sec,fill){const n=Math.ceil(SR()*sec),b=AC.createBuffer(1,n,SR()),d=b.getChannelData(0);fill(d,SR());let m=0;for(let i=0;i<n;i++)m=Math.max(m,Math.abs(d[i]));if(m>0)for(let i=0;i<n;i++)d[i]/=m;
  const f=Math.min(n,Math.floor(SR()*.004));for(let i=0;i<f;i++)d[n-1-i]*=i/f;return b;}
// one-pole low and high pass, in place
function zLp(d,f,sr){const a=Math.exp(-2*Math.PI*f/sr);let y=0;for(let i=0;i<d.length;i++){y=(1-a)*d[i]+a*y;d[i]=y;}}
function zHp(d,f,sr){const a=Math.exp(-2*Math.PI*f/sr);let y=0;for(let i=0;i<d.length;i++){y=(1-a)*d[i]+a*y;d[i]-=y;}}
// state-variable band pass whose centre may move
function zBp(d,sr,fOf,q){let l=0,b=0;for(let i=0;i<d.length;i++){const f=2*Math.sin(Math.PI*Math.min(.45,fOf(i/d.length)/sr));const h=d[i]-l-b/q;b+=f*h;l+=f*b;d[i]=b;}}
// struck resonators: [freq, decay seconds, amp]
function zModes(d,sr,t0,list,amp,jit=.03){const i0=Math.floor(t0*sr);for(const [f0,dec,a] of list){const f=f0*(1+(RND()-.5)*jit),w=2*Math.PI*f/sr,k=Math.exp(-1/(dec*sr)),ph=RND()*6;let e=a*amp;
  for(let i=i0;i<d.length&&e>1e-4*amp;i++){const j=i-i0;d[i]+=Math.sin(w*j+ph)*e*Math.min(1,j/(sr*.0008));e*=k;}}}
// tiny clicks scattered in time: grit, gravel, straw, crackle
function zGrains(d,sr,t0,dur,n,fLo,fHi,amp,dec=.003){for(let g=0;g<n;g++){const t=t0+Math.pow(RND(),1.6)*dur;zModes(d,sr,t,[[fLo+RND()*(fHi-fLo),dec*(.5+RND()),1]],amp*(.3+RND()*.7),0);}}
// shaped noise: envelope(t 0..1)
function zNoise(d,sr,t0,dur,amp,env,col='w'){const i0=Math.floor(t0*sr),n=Math.floor(dur*sr);let br=0,b0=0,b1=0,b2=0;
  for(let j=0;j<n&&i0+j<d.length;j++){let w=RND()*2-1;if(col==='b'){br=(br+.02*w)/1.02;w=br*3.5;}else if(col==='p'){b0=.99765*b0+w*.099;b1=.963*b1+w*.2965;b2=.57*b2+w*1.0526;w=(b0+b1+b2+w*.1848)*.25;}d[i0+j]+=w*amp*env(j/n);}}
function zThud(d,sr,t0,f0,f1,dec,amp){const i0=Math.floor(t0*sr);let ph=0;for(let i=i0;i<d.length;i++){const t=(i-i0)/sr;if(t>dec*7)break;const f=f1+(f0-f1)*Math.exp(-t/(dec*.6));ph+=2*Math.PI*f/sr;d[i]+=Math.sin(ph)*amp*Math.exp(-t/dec)*Math.min(1,t/.002);}}
const zEnv={hit:k=>Math.exp(-k*8),swell:k=>Math.sin(Math.PI*k)**2,rise:k=>Math.min(1,k*6)*Math.exp(-k*3),flat:k=>Math.min(1,k*20,(1-k)*20)};
const WOOD=f=>[[f,.05,1],[f*2.3,.03,.55],[f*4.1,.018,.3],[f*6.7,.01,.15]];
const METAL=f=>[[f,.7,1],[f*2.76,.45,.6],[f*5.4,.28,.35],[f*8.93,.16,.2]];
// recipes: [length seconds, fill]
const REC={
  stepG:[.14,(d,s)=>{zNoise(d,s,0,.1,.5,zEnv.swell,'p');zHp(d,500,s);zGrains(d,s,.005,.08,22,2500,6500,.25,.0015);zThud(d,s,0,90,55,.02,.25);}],
  stepA:[.16,(d,s)=>{zGrains(d,s,0,.11,45,1500,4500,.35,.002);zNoise(d,s,0,.1,.25,zEnv.hit,'b');}],
  stepS:[.16,(d,s)=>{zModes(d,s,0,[[1100,.01,1],[2500,.007,.6],[4100,.004,.3]],.8,.2);zNoise(d,s,.004,.05,.25,zEnv.hit);zHp(d,300,s);zThud(d,s,0,120,60,.015,.5);zModes(d,s,.055,[[1300,.008,1],[2900,.005,.5]],.35,.2);}],
  stepW:[.2,(d,s)=>{zModes(d,s,0,WOOD(150+RND()*40),1,.1);zModes(d,s,.05,WOOD(190+RND()*40),.45,.1);zNoise(d,s,0,.02,.15,zEnv.hit);}],
  stepD:[.16,(d,s)=>{zThud(d,s,0,110,50,.025,.8);zNoise(d,s,0,.08,.4,zEnv.hit,'b');zGrains(d,s,.01,.07,8,700,2200,.15,.003);}],
  swing:[.36,(d,s)=>{zNoise(d,s,0,.34,1,k=>Math.sin(Math.PI*Math.min(1,k*1.3))**3,'p');zBp(d,s,k=>350+2600*Math.sin(Math.PI*Math.min(1,k*1.2)),1.4);}],
  miss:[.45,(d,s)=>{zNoise(d,s,0,.42,1,k=>Math.sin(Math.PI*k)**2,'p');zBp(d,s,k=>1800-1300*k,1.8);}],
  hit:[.4,(d,s)=>{zThud(d,s,0,130,42,.07,1);zNoise(d,s,0,.05,.6,zEnv.hit);zLp(d,2500,s);zGrains(d,s,.003,.05,10,600,2000,.25,.004);zModes(d,s,0,[[260,.04,1],[610,.025,.5]],.3,.2);}],
  clank:[.9,(d,s)=>{zModes(d,s,0,METAL(600+RND()*120),1,.02);zNoise(d,s,0,.015,.5,zEnv.hit);zHp(d,200,s);}],
  crit:[1.3,(d,s)=>{zModes(d,s,0,METAL(880),.7,.01);zModes(d,s,.04,METAL(1320),.4,.01);zThud(d,s,0,90,40,.2,.8);}],
  death:[.9,(d,s)=>{zNoise(d,s,0,.35,.25,zEnv.swell,'p');zBp(d,s,()=>1400,1);zThud(d,s,.12,100,40,.09,1);zThud(d,s,.32,90,45,.06,.6);zNoise(d,s,.12,.15,.3,zEnv.hit,'b');}],
  doorclose:[.6,(d,s)=>{zModes(d,s,0,WOOD(85),1,.05);zModes(d,s,0,[[210,.12,.5],[430,.07,.3]],1);zNoise(d,s,0,.05,.4,zEnv.hit,'b');zModes(d,s,.03,[[2400,.05,1],[5200,.03,.5]],.12);}],
  lidclose:[.4,(d,s)=>{zModes(d,s,0,WOOD(170),1,.08);zNoise(d,s,0,.03,.3,zEnv.hit,'b');zModes(d,s,.01,[[3100,.04,1]],.1);}],
  latch:[.25,(d,s)=>{zModes(d,s,0,[[2600,.03,1],[4800,.02,.6],[7100,.012,.3]],1,.1);zModes(d,s,.06,[[1900,.04,1],[3900,.02,.5]],.6,.1);}],
  pickup:[.35,(d,s)=>{zNoise(d,s,0,.18,.6,zEnv.swell,'p');zBp(d,s,()=>1600,.8);for(let i=0;i<3;i++)zModes(d,s,.08+i*.05+RND()*.03,[[3300+RND()*1800,.08,1],[7400+RND()*900,.04,.4]],.22,0);}],
  heal:[1.6,(d,s)=>{[523,784,1046,1318].forEach((f,i)=>zModes(d,s,i*.09,[[f,.9,1],[f*2.01,.5,.25],[f*3.02,.3,.1]],.35,.004));zNoise(d,s,0,1,.08,zEnv.swell);zHp(d,4000,s);}],
  spell:[.8,(d,s)=>{zNoise(d,s,0,.75,1,k=>Math.min(1,k*5)*(1-k),'b');zBp(d,s,k=>250+1400*k,1.1);zGrains(d,s,.1,.6,30,1500,5000,.2,.002);}],
  notice:[.8,(d,s)=>{zThud(d,s,0,85,48,.18,1);zNoise(d,s,0,.06,.3,zEnv.hit,'b');}],
  chopw:[.35,(d,s)=>{zModes(d,s,0,WOOD(170),1,.1);zNoise(d,s,0,.04,.6,zEnv.hit);zBp(d,s,()=>1500,1.2);zModes(d,s,0,WOOD(170),.8,.1);}],
  dice:[.75,(d,s)=>{let t=0;for(let i=0;i<7;i++){zModes(d,s,t,[[2300,.012,1],[3800,.008,.6],[5900,.005,.3]],1-i*.11,.25);zModes(d,s,t,WOOD(420),.25,.1);t+=.05+RND()*.06*(1+i*.3);}}],
  click:[.08,(d,s)=>{zModes(d,s,0,[[1500,.008,1],[3100,.005,.4]],1,.1);}],
  bow:[.5,(d,s)=>{const p=Math.floor(s/115);const buf=new Float32Array(p).map(()=>RND()*2-1);for(let i=0;i<d.length;i++){const j=i%p,v=buf[j];buf[j]=(v+buf[(j+1)%p])*.497;d[i]+=v*Math.exp(-i/s/.12);}zLp(d,1800,s);
    const w=new Float32Array(d.length);zNoise(w,s,.03,.25,.3,zEnv.swell,'p');zHp(w,2500,s);for(let i=0;i<d.length;i++)d[i]+=w[i];}],
  bark:[.55,(d,s)=>{for(const t0 of[0,.24]){const i0=Math.floor(t0*s),n=Math.floor(.13*s);let ph=0;const b=new Float32Array(n);
    for(let j=0;j<n;j++){const k=j/n,f=480-220*k;ph+=f/s;b[j]=((ph%1)*2-1)*Math.sin(Math.PI*k)**.6+(RND()-.5)*.4;}
    const a=b.slice(),c=b.slice();zBp(a,s,()=>750,4);zBp(c,s,()=>1700,5);for(let j=0;j<n&&i0+j<d.length;j++)d[i0+j]+=a[j]+c[j]*.6;}}],
  flap:[.45,(d,s)=>{for(let i=0;i<5;i++)zNoise(d,s,i*.075,.06,1-i*.12,zEnv.swell,'p');zLp(d,1100,s);}],
  fight:[1,(d,s)=>{for(let i=0;i<3;i++){zThud(d,s,i*.15,95,52,.12,1-i*.2);zNoise(d,s,i*.15,.05,.25,zEnv.hit,'b');}}]};
const TAKES={};
function zTake(name){const R=REC[name];if(!R)return null;const t=TAKES[name]||(TAKES[name]=[]);if(t.length<3){const b=zRec(R[0],R[1]);t.push(b);return b;}return t[Math.floor(RND()*t.length)];}
function zPlay(name,vol,wet=.25,dl=0,rate=1){const b=zTake(name);if(!b)return;const t=AC.currentTime+.01+dl,s=AC.createBufferSource();s.buffer=b;s.playbackRate.value=rate*(1+(RND()-.5)*.08);
  const g=AC.createGain();g.gain.value=vol;s.connect(g);g.connect(dry);const w=AC.createGain();w.gain.value=wet*(room?1.6:.6);g.connect(w).connect(verb);s.start(t);}
function sfx(type){if(!audio()||muted)return;const t=AC.currentTime+.01;
  switch(type){
    case 'step':zPlay('stepD',.15,.08);break;
    case 'creak':creak(t,.9,.45,45,130);break;
    case 'door':zPlay('latch',.25,.2);creak(t+.06,.85,.4,40,120);break;
    case 'chest':zPlay('latch',.2,.2);creak(t+.05,.55,.3,70,170,1.3);zPlay('lidclose',.3,.3,.52);break;
    case 'crit':zPlay('crit',.35,.45);break;
    case 'heal':zPlay('heal',.22,.6);break;
    case 'click':zPlay('click',.12,.05);break;
    case 'pickup':zPlay('pickup',.3,.15);break;
    case 'spell':zPlay('spell',.5,.5);break;
    case 'dice':zPlay('dice',.35,.25);break;
    case 'clank':zPlay('clank',.28,.4);break;
    case 'swing':zPlay('swing',.35,.12);break;
    case 'miss':zPlay('miss',.25,.15);break;
    case 'hit':zPlay('hit',.7,.25);break;
    default:if(REC[type])zPlay(type,.5,.3);}}
// ambience follows the hero: the sea only near water, wind outdoors, a crackling hearth indoors, crickets at night
const AMB={};
function ambient(){const loopB=b=>{const s=AC.createBufferSource();s.buffer=b;s.loop=true;s.start();return s;};
  const tile=(sec,fill)=>{const b=zRec(sec,fill),d=b.getChannelData(0),f=Math.floor(SR()*.5);for(let i=0;i<f;i++){const k=i/f;d[i]=d[i]*k+d[d.length-f+i]*(1-k);}return zRec(sec-.5,(o)=>o.set(d.subarray(0,o.length)));};
  const loopN=(sec,rate=1,col='p')=>{const s=loopB(tile(sec,(d,sr)=>zNoise(d,sr,0,sec,1,()=>1,col)));s.playbackRate.value=rate;return s;};
  const mk=(src,f,g0)=>{const g=AC.createGain();g.gain.value=g0;src.connect(f).connect(g).connect(master);return g;};
  // sea: low rumble with slow swells
  AMB.sea=mk(loopB(tile(12,(d,sr)=>{zNoise(d,sr,0,12,1,k=>.35+.65*Math.sin(Math.PI*((k*3)%1))**2,'b');const w=new Float32Array(d.length);for(let i=0;i<3;i++)zNoise(w,sr,i*4+1.2,2.2,.25,k=>Math.sin(Math.PI*k)**3,'p');zHp(w,1200,sr);for(let i=0;i<d.length;i++)d[i]+=w[i];})),filt('lowpass',1800,.5),0);const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=.09;lg.gain.value=0;lfo.connect(lg).connect(AMB.sea.gain);lfo.start();AMB.seaL=lg;
  AMB.wind=mk(loopB(tile(10,(d,sr)=>zNoise(d,sr,0,10,1,k=>.4+.6*Math.sin(Math.PI*((k*2)%1))**2,'p'))),filt('bandpass',600,.6),0);
  AMB.fire=mk(loopN(6,1,'b'),filt('lowpass',300,.7),0);
  AMB.rain=mk(loopN(6,1),filt('bandpass',2400,.5),0);
  AMB.crowd=mk(loopN(6,1,'b'),filt('bandpass',500,1.4),0);
  AMB.cr=0;}
function crackle(){const t=AC.currentTime;burst(t,.012+Math.random()*.02,.05+Math.random()*.08,'bandpass',1800+Math.random()*3500,3,.001,.2);}
function chirp(){const t=AC.currentTime,f=4300+Math.random()*400;for(let i=0;i<3;i++){const o=AC.createOscillator();o.frequency.value=f;out(o,t+i*.06,.004,.006,.035,.1);o.start(t+i*.06);o.stop(t+i*.06+.06);}}
let ambT=0;
function ambTick(dt,seaD){if(!AC||muted)return;const now=AC.currentTime,set=(g,v)=>g.gain.setTargetAtTime(v,now,.6);
  const out_=!room,near=Math.max(0,1-seaD/12);set(AMB.sea,out_?.07*near*near:0);AMB.seaL.gain.setTargetAtTime(out_?.05*near*near:0,now,.6);
  set(AMB.wind,out_?.008+.006*(1-nightness()):0);set(AMB.fire,room?.03:0);
  ambT+=dt;if(ambT>.08){ambT=0;if(room&&Math.random()<.35)crackle();if(out_&&nightness()>.6&&seaD>4&&Math.random()<.06)chirp();}}
// footsteps: one per foot, shaped by what is underfoot, quiet
function stepSound(code,soft){if(!audio()||muted)return;const v=(soft?.45:1)*(.85+Math.random()*.3);
  const k=code==='G'?'stepG':code==='A'?'stepA':'CSW'.includes(code)?'stepS':'PFE'.includes(code)?'stepW':'stepD';
  zPlay(k,{stepG:.09,stepA:.1,stepS:.12,stepW:.16,stepD:.13}[k]*v,k==='stepS'||k==='stepW'?.12:.05);}
const sndBtn={};const sndUI=()=>{for(const id of []){const b=document.getElementById(id);if(b)b.textContent=muted?'Звук: выкл':'Звук: вкл';}};sndUI();
let vol=.7;try{const v=parseFloat(localStorage.getItem('helga-vol'));if(v>=0&&v<=1)vol=v;}catch(e){}
const volEl=document.getElementById('mVol');if(volEl){volEl.value=vol;volEl.oninput=()=>{vol=+volEl.value;try{localStorage.setItem('helga-vol',vol)}catch(e){}if(audio()&&!muted)master.gain.value=vol;};}
sndBtn.onclick=()=>{muted=!muted;try{localStorage.setItem('helga-sound',muted?'off':'on')}catch(e){}if(audio())master.gain.value=muted?0:vol;sndUI();};
// the settings screen drives sound through this
window.snd={muted:()=>muted,setMuted(v){if(muted!==v)sndBtn.onclick();},vol:()=>vol,setVol(v){vol=v;try{localStorage.setItem('helga-vol',vol)}catch(e){}if(audio()&&!muted)master.gain.value=vol;}};
