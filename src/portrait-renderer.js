// Illustrated portrait compositor. Appearance is supplied by the shared characterProfile.
// Every hairstyle has a back layer and a front layer; the face never gets clipped away.
let images=null;
const tiles=new Map(),pictures=new Map();
export const ready=typeof Image==='undefined'?Promise.resolve():Promise.all(
 ['portrait-parts-custom-v7.png','portrait-outfits-custom-v7.png'].map(file=>new Promise((resolve,reject)=>{
  const img=new Image();img.onload=()=>resolve(img);img.onerror=()=>reject(Error('Portrait asset unavailable: '+file));img.src='assets/'+file;
 }))
).then(value=>{images=value;});
if(typeof Image!=='undefined')ready.catch(console.error);
const canvas=(w,h)=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
const rgb=hex=>[1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
const tone=(hex,f)=>'#'+rgb(hex).map(v=>Math.min(255,Math.round(v*f)).toString(16).padStart(2,'0')).join('');
function tile(which,col,row,mode,color,cloth){
 const key=[which,col,row,mode,color,cloth].join(':');if(tiles.has(key))return tiles.get(key);
 const img=images[which],rows=which===0?3:2,c=canvas(256,320),ctx=c.getContext('2d',{willReadFrequently:true});
 ctx.drawImage(img,col*img.width/4,row*img.height/rows,img.width/4,img.height/rows,0,0,256,320);
 if(which===1&&row===1)ctx.clearRect(0,0,256,20);
 const pixels=ctx.getImageData(0,0,256,320),d=pixels.data,target=rgb(color),fabric=rgb(cloth||color);
 const paint=(i,t,f)=>{for(let j=0;j<3;j++)d[i+j]=Math.min(255,t[j]*f);};
 for(let i=0;i<d.length;i+=4){
  if(d[i+3]<35){d[i+3]=0;continue;}
  const r=d[i],g=d[i+1],b=d[i+2],max=Math.max(r,g,b),min=Math.min(r,g,b);
  if(mode==='skin'){
   if(r>g*1.07&&g>b*1.05&&max>70)paint(i,target,(r*.45+g*.4+b*.15)/183);
  }else if(mode==='hair'){
   if(max-min<40&&max>48)paint(i,target,(r+g+b)/3/143);
  }else if(mode==='outfit'){
   if(r>g*1.02&&g>b*1.38&&r>125&&g>90)paint(i,target,(r+g+b)/3/165);
   else if(max>45&&((row===0&&col<2&&b>r*1.16&&b>g*1.07)||(row===0&&col>=2&&r>g*1.2&&b>g*1.22)||(row===1&&col<2&&g>r*1.1&&g>b*1.15)||(row===1&&col>=2&&r>g*1.55&&r>b*1.12)))
    paint(i,fabric,max/(row===0?(col<2?150:110):(col<2?95:125)));
  }
 }
 // Clear isolated specks from generated atlas boundaries, not facial features.
 const seen=new Uint8Array(256*320),queue=new Int32Array(256*320);
 for(let start=0;start<seen.length;start++){
  if(seen[start]||!d[start*4+3])continue;
  let head=0,tail=1;queue[0]=start;seen[start]=1;
  while(head<tail){const at=queue[head++],x=at%256,y=Math.floor(at/256);
   for(const [dx,dy]of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||nx>=256||ny<0||ny>=320)continue;const n=ny*256+nx;if(!seen[n]&&d[n*4+3]){seen[n]=1;queue[tail++]=n;}}
  }
  if(tail<(mode==='hair'?500:80))for(let i=0;i<tail;i++)d[queue[i]*4+3]=0;
 }
 ctx.putImageData(pixels,0,0);if(tiles.size>=100)tiles.delete(tiles.keys().next().value);tiles.set(key,c);return c;
}
function faceWindow(ctx){
 ctx.beginPath();ctx.moveTo(91,135);ctx.quadraticCurveTo(112,118,146,123);
 ctx.quadraticCurveTo(184,119,207,134);ctx.lineTo(216,171);
 ctx.quadraticCurveTo(214,195,185,207);ctx.quadraticCurveTo(161,220,129,209);
 ctx.quadraticCurveTo(97,197,91,180);ctx.lineTo(85,156);ctx.closePath();
}
function hair(p){
 if(p.hairStyle==='bald')return null;
 const female=p.gender==='female';let col,row;
 if(!female){col=p.hairStyle==='long'?1:0;row=1;}
 else if(p.hairStyle==='short'){col=2;row=1;}
 else if(p.role==='fighter'){col=0;row=2;}
 else {col=3;row=1;}
 const result=canvas(320,320),ctx=result.getContext('2d');
 if(row===2){
  // The ponytail crosses the atlas grid boundary: use its complete explicit bounds.
  const im=images[0],raw=canvas(256,320),rc=raw.getContext('2d');
  rc.drawImage(im,0,844*im.height/1214,377*im.width/1295,350*im.height/1214,0,0,256,320);
  const pix=rc.getImageData(0,0,256,320),d=pix.data,t=rgb(p.hair);
  for(let i=0;i<d.length;i+=4){const a=d[i],b=d[i+1],c=d[i+2],max=Math.max(a,b,c),min=Math.min(a,b,c);if(max-min<40&&max>48)for(let j=0;j<3;j++)d[i+j]=Math.min(255,t[j]*(a+b+c)/3/143);}
  rc.putImageData(pix,0,0);ctx.drawImage(raw,-18,6,298,277);
 }else if(female&&col===3){
  // Long tips continue below row 2; retain them instead of slicing them off.
  const h=tile(0,col,row,'hair',p.hair);ctx.drawImage(h,0,-55,256,320);
 }else ctx.drawImage(tile(0,col,row,'hair',p.hair),0,-55,256,320);
 return result;
}
function beard(ctx,p){
 // Use the illustrated beard asset, attached to the same jaw anchor as the head.
 ctx.save();ctx.beginPath();ctx.moveTo(83,173);ctx.lineTo(99,181);ctx.lineTo(118,188);ctx.lineTo(149,181);ctx.lineTo(179,187);ctx.lineTo(215,172);ctx.lineTo(215,206);ctx.lineTo(193,233);ctx.lineTo(163,244);ctx.lineTo(120,240);ctx.lineTo(96,223);ctx.lineTo(83,204);ctx.closePath();ctx.clip();
 ctx.drawImage(tile(0,2,0,'hair',p.hair),64,48,174,178);ctx.restore();
}
// All prepared layers share one resolution and anchor. Hood clipping is applied
// to every head layer before composition, never to the base face alone.
export function layers(p){
 if(!images)return null;
 const female=p.gender==='female',row=p.role==='rogue'||p.role==='cleric'?1:0;
 const col=p.role==='fighter'?(female?1:0):p.role==='wizard'?(female?3:2):p.role==='rogue'?(female?1:0):p.hood?3:2;
 const layer=name=>{const c=canvas(320,360),ctx=c.getContext('2d');ctx.translate(32,25);
  if(p.hood){ctx.beginPath();ctx.moveTo(80,61);ctx.quadraticCurveTo(128,38,172,61);ctx.lineTo(198,131);ctx.lineTo(168,171);ctx.lineTo(92,171);ctx.lineTo(65,134);ctx.closePath();ctx.clip();ctx.translate(20,-10);ctx.scale(.78,.78);}
  return {name,canvas:c,ctx};};
 const back=layer('back-hair'),base=layer('head'),features=layer('face'),front=layer('front-hair'),jaw=layer('beard');
 const h=hair(p);if(h){back.ctx.drawImage(h,0,0);const safe=canvas(320,320),f=safe.getContext('2d');f.drawImage(h,0,0);f.globalCompositeOperation='destination-out';faceWindow(f);f.fill();front.ctx.drawImage(safe,0,0);}
 base.ctx.drawImage(tile(0,female?1:0,0,'skin',p.skin),25.6,0,204.8,256);
 const ctx=features.ctx;ctx.strokeStyle=tone(p.hair,p.face==='stern'?.45:.55);ctx.lineWidth=p.face==='stern'?6:3;ctx.lineCap='round';
 for(const [x,d]of [[116,1],[181,-1]]){ctx.beginPath();if(p.face==='stern'){ctx.moveTo(x-10,139-d*3);ctx.lineTo(x+9,139+d*3);}else{ctx.moveTo(x-9,139);ctx.quadraticCurveTo(x,135,x+9,138);}ctx.stroke();}
 if(p.face==='beard')beard(jaw.ctx,p);
 const outfit={name:p.hood?'hood-and-outfit':'outfit',canvas:canvas(320,360)};const oc=outfit.canvas.getContext('2d');oc.translate(32,25);
 const costume=tile(1,col,row,'outfit',p.trim,p.cloth);
 oc.drawImage(costume,0,p.hood?0:row?87:32,256,320);
 if(p.hood){oc.clearRect(0,0,12,320);}
 return [back,base,features,front,jaw,outfit].map(({name,canvas})=>({name,canvas}));
}
export function render(p){
 if(!images)return null;
 const key=JSON.stringify([p.role,p.gender,p.skin,p.hair,p.hairStyle,p.face,p.cloth,p.trim,p.hood]);
 if(pictures.has(key))return pictures.get(key);
 const c=canvas(320,360),ctx=c.getContext('2d');
 for(const part of layers(p))ctx.drawImage(part.canvas,0,0);
 if(pictures.size>=100)pictures.delete(pictures.keys().next().value);pictures.set(key,c);return c;
}
