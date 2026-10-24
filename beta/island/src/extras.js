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
  if(room)return;const p=worldTime;let i=0;while(SKY[i+1][0]<p)i++;const a=SKY[i],b=SKY[i+1],k=(p-a[0])/(b[0]-a[0]||1);
  const mix=(x,y)=>cA.setHex(x).lerp(cB.setHex(y),k);
  hemi.color.copy(mix(a[1],b[1]));hemi.groundColor.copy(mix(a[2],b[2]));hemi.intensity=a[3]+(b[3]-a[3])*k;
  moon.color.copy(mix(a[4],b[4]));moon.intensity=a[5]+(b[5]-a[5])*k;scene.fog.color.copy(mix(a[6],b[6]));scene.fog.density=a[7]+(b[7]-a[7])*k;scene.background.copy(scene.fog.color);
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
function impulse(sec,decay){const n=AC.sampleRate*sec,b=AC.createBuffer(2,n,AC.sampleRate);for(let c=0;c<2;c++){const d=b.getChannelData(c);for(let i=0;i<n;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/n,decay);}return b;}
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
function sfx(type){if(!audio()||muted)return;const t=AC.currentTime+.01,r=Math.random;
  switch(type){
    case 'step':burst(t,.07,.12,'lowpass',380+r()*200,.7,.002,.1);burst(t+.01,.03,.04,'highpass',3000,.5,.001,.05);break; // soft earth and grit
    case 'swing':{const s=AC.createBufferSource();s.buffer=noiseB(.4);const f=filt('bandpass',400,1.6);f.frequency.setValueAtTime(400,t);f.frequency.exponentialRampToValueAtTime(2600,t+.12);f.frequency.exponentialRampToValueAtTime(700,t+.26);
      out(chain(s,f),t,.06,.35,.22,.15);s.start(t);break;}
    case 'hit':burst(t,.16,.7,'lowpass',260,1,.001,.25);knockW(t,.35,120);burst(t,.05,.25,'bandpass',1800,2,.001,.2);break;
    case 'miss':{const s=AC.createBufferSource();s.buffer=noiseB(.4);const f=filt('bandpass',1600,3);f.frequency.exponentialRampToValueAtTime(500,t+.3);out(chain(s,f),t,.03,.18,.3,.2);s.start(t);break;}
    case 'dice':{let tt=t;for(let i=0;i<7;i++){knockW(tt,.12+r()*.08,700+r()*500);tt+=.05+r()*.07*(1+i*.25);}break;} // bone dice on a wooden table
    case 'crit':toneS(t,523,.9,.06,'sine');toneS(t+.08,784,1,.05,'sine');toneS(t+.16,1046,1.1,.04,'sine');break;
    case 'bow':{burst(t,.25,.25,'bandpass',220,8,.001,.2);burst(t,.08,.2,'highpass',2500,.7,.001,.1);const s=AC.createBufferSource();s.buffer=noiseB(.3);out(chain(s,filt('bandpass',3000,4)),t+.04,.02,.12,.18,.1);s.start(t+.04);break;}
    case 'spell':{const o=AC.createOscillator();o.type='sine';o.frequency.setValueAtTime(220,t);o.frequency.exponentialRampToValueAtTime(880,t+.35);out(o,t,.05,.07,.45,.6);o.start(t);o.stop(t+.6);
      const s=AC.createBufferSource();s.buffer=noiseB(.6);out(chain(s,filt('bandpass',1200,1.2)),t,.15,.18,.4,.5);s.start(t);break;} // fire whoosh
    case 'death':burst(t,.5,.6,'lowpass',160,1,.005,.3);knockW(t+.12,.3,90);knockW(t+.3,.18,110);break; // body falls
    case 'creak':creak(t,.9,.5,45,130);break;
    case 'door':creak(t,.85,.45,40,120);break;
    case 'doorclose':knockW(t,.6,140);burst(t,.15,.25,'lowpass',300,1,.001,.4);burst(t+.02,.04,.12,'bandpass',2600,3,.001,.2);break;
    case 'chest':creak(t,.55,.35,70,170,1.3);knockW(t+.5,.25,260);burst(t+.5,.04,.15,'bandpass',3200,4,.001,.2);break; // hinge, then the lid stops
    case 'lidclose':knockW(t,.5,220);burst(t,.06,.15,'bandpass',2800,4,.001,.2);break;
    case 'pickup':burst(t,.12,.18,'bandpass',1800,1.2,.01,.15);burst(t+.08,.1,.12,'bandpass',900,1,.01,.15);break; // cloth and pouch
    case 'heal':for(const [f,dl] of [[660,0],[990,.07],[1320,.14],[1760,.21]])toneS(t+dl,f*(1+(r()-.5)*.01),.9,.035,'sine',.7);break; // glass shimmer
    case 'notice':knockW(t,.5,90);burst(t,.3,.2,'lowpass',200,1,.005,.4);break; // a low drum thump
    case 'chopw':knockW(t,.35,140);burst(t,.05,.15,'bandpass',1200,2,.001,.3);break;
    case 'bark':for(const dl of [0,.22]){const o=AC.createOscillator();o.type='sawtooth';o.frequency.setValueAtTime(420,t+dl);o.frequency.exponentialRampToValueAtTime(260,t+dl+.08);out(chain(o,filt('lowpass',1400,1)),t+dl,.005,.06,.09,.2);o.start(t+dl);o.stop(t+dl+.15);}break;
    case 'flap':for(let i=0;i<5;i++)burst(t+i*.07,.05,.07,'bandpass',700+Math.random()*300,1.5,.005,.1);break;
    case 'click':knockW(t,.12,900);break;
    case 'clank':for(const [f,v] of [[1180,.06],[2950,.04],[4400,.02]]){const o=AC.createOscillator();o.frequency.value=f*(1+(r()-.5)*.02);out(o,t,.001,v,.35,.5);o.start(t);o.stop(t+.4);}burst(t,.03,.12,'highpass',2000,.7,.001,.3);break;
    case 'fight':for(let i=0;i<3;i++){knockW(t+i*.14,.5-i*.1,70);burst(t+i*.14,.25,.35,'lowpass',140,1,.003,.5);}break;}}
// ambience follows the hero: the sea only near water, wind outdoors, a crackling hearth indoors, crickets at night
const AMB={};
function ambient(){const loopN=(sec,rate=1)=>{const s=AC.createBufferSource();s.buffer=noiseB(sec);s.loop=true;s.playbackRate.value=rate;s.start();return s;};
  const mk=(src,f,g0)=>{const g=AC.createGain();g.gain.value=g0;src.connect(f).connect(g).connect(master);return g;};
  // sea: low rumble with slow swells
  AMB.sea=mk(loopN(6),filt('lowpass',420,.6),0);const lfo=AC.createOscillator(),lg=AC.createGain();lfo.frequency.value=.09;lg.gain.value=0;lfo.connect(lg).connect(AMB.sea.gain);lfo.start();AMB.seaL=lg;
  AMB.wind=mk(loopN(6,.7),filt('bandpass',800,.8),0);
  AMB.fire=mk(loopN(4,.5),filt('lowpass',160,.7),0);
  AMB.rain=mk(loopN(5,1),filt('bandpass',2400,.5),0);
  AMB.crowd=mk(loopN(5,.6),filt('bandpass',500,1.4),0);
  AMB.cr=0;}
function crackle(){const t=AC.currentTime;burst(t,.012+Math.random()*.02,.05+Math.random()*.08,'bandpass',1800+Math.random()*3500,3,.001,.2);}
function chirp(){const t=AC.currentTime,f=4300+Math.random()*400;for(let i=0;i<3;i++){const o=AC.createOscillator();o.frequency.value=f;out(o,t+i*.06,.004,.006,.035,.1);o.start(t+i*.06);o.stop(t+i*.06+.06);}}
let ambT=0;
function ambTick(dt,seaD){if(!AC||muted)return;const now=AC.currentTime,set=(g,v)=>g.gain.setTargetAtTime(v,now,.6);
  const out_=!room,near=Math.max(0,1-seaD/12);set(AMB.sea,out_?.07*near*near:0);AMB.seaL.gain.setTargetAtTime(out_?.05*near*near:0,now,.6);
  set(AMB.wind,out_?.008+.006*(1-nightness()):0);set(AMB.fire,room?.03:0);
  ambT+=dt;if(ambT>.08){ambT=0;if(room&&Math.random()<.35)crackle();if(out_&&nightness()>.6&&seaD>4&&Math.random()<.06)chirp();}}
// footsteps: one per foot, shaped by what is underfoot, quiet
function stepSound(code,soft){if(!audio()||muted)return;const t=AC.currentTime,r=Math.random,v=(soft?.45:1)*(.8+r()*.4);
  if(code==='G'){burst(t,.06,.05*v,'bandpass',900+r()*500,.8,.008,.05);burst(t,.04,.03*v,'lowpass',250,.7,.004,.05);}           // grass brush
  else if(code==='A'){for(let i=0;i<3;i++)burst(t+i*.012,.03,.035*v,'highpass',2500+r()*1500,.6,.002,.05);}                  // sand crunch
  else if(code==='C'||code==='S'||code==='W'){burst(t,.03,.06*v,'bandpass',1400+r()*600,2,.001,.15);burst(t,.05,.05*v,'lowpass',220,1,.002,.1);} // stone tap
  else if(code==='P'||code==='F'||code==='E'){knockW(t,.07*v,170+r()*60);}                                                  // boards
  else{burst(t,.07,.06*v,'lowpass',300+r()*120,.8,.003,.08);}}                                                              // packed earth
const sndBtn={};const sndUI=()=>{for(const id of ['mSound','pSound']){const b=document.getElementById(id);if(b)b.textContent=muted?'Звук: выкл':'Звук: вкл';}};sndUI();
let vol=.7;try{const v=parseFloat(localStorage.getItem('helga-vol'));if(v>=0&&v<=1)vol=v;}catch(e){}
const volEl=document.getElementById('mVol');if(volEl){volEl.value=vol;volEl.oninput=()=>{vol=+volEl.value;try{localStorage.setItem('helga-vol',vol)}catch(e){}if(audio()&&!muted)master.gain.value=vol;};}
sndBtn.onclick=()=>{muted=!muted;try{localStorage.setItem('helga-sound',muted?'off':'on')}catch(e){}if(audio())master.gain.value=muted?0:vol;sndUI();};
