// ---------- seeded random ----------
let seed=7;const rnd=()=>{seed=(seed*16807)%2147483647;return (seed-1)/2147483646};
const pick=a=>a[Math.floor(rnd()*a.length)];

// ---------- original pixel textures, drawn in code ----------
function tex(size,paint){const c=document.createElement('canvas');c.width=c.height=size;const g=c.getContext('2d');paint(g,size);
  const t=new THREE.CanvasTexture(c);t.magFilter=THREE.NearestFilter;t.minFilter=THREE.NearestFilter;t.generateMipmaps=false;return t}
const px=(g,x,y,col,w=1,h=1)=>{g.fillStyle=col;g.fillRect(x,y,w,h)};
const noise=(g,s,cols,density=1)=>{for(let y=0;y<s;y++)for(let x=0;x<s;x++)if(rnd()<density)px(g,x,y,pick(cols))};

function planks(variant){return tex(32,(g,s)=>{
  const tones=[['#5b4636','#4f3d2f','#66503e'],['#574334','#4a392c','#61493a'],['#5e4838','#523f31','#6a5241'],['#544032','#47372b','#5f4a3a']];
  for(let p=0;p<4;p++){const t=tones[(p+variant)%4];for(let y=p*8;y<p*8+8;y++)for(let x=0;x<s;x++)px(g,x,y,pick(t));
    for(let k=0;k<3;k++){const y=p*8+1+Math.floor(rnd()*6),x=Math.floor(rnd()*24);px(g,x,y,'#7a604b',4+Math.floor(rnd()*6),1)}
    px(g,0,p*8+7,'#2a1f18',s,1);const j=(p*11+variant*7)%28+2;px(g,j,p*8,'#2a1f18',1,7)}
  for(let p=0;p<4;p++)for(const x of [2,29])if(rnd()<.8){px(g,x,p*8+3,'#8a8a8e');px(g,x,p*8+4,'#2a2622');}
  for(let i=0;i<6;i++){const y=Math.floor(rnd()*s),x=Math.floor(rnd()*20);px(g,x,y,'#3f3026',6+Math.floor(rnd()*6),1);}
  if(variant===2){for(let y=10;y<22;y++){const w=Math.max(0,8-Math.abs(y-16)*1.4+rnd()*2);px(g,20,y,'#1a1310',Math.floor(w),1)}}
  if(variant===3){for(let y=2;y<12;y++)px(g,4+(y>>1),y,'#3b2c22',2,1)}
  for(let i=0;i<14;i++)px(g,Math.floor(rnd()*s),Math.floor(rnd()*s),pick(['#4d6b34','#5d7d3c','#3f5a2c']))})}
function stoneFloor(){return tex(32,(g,s)=>{px(g,0,0,'#2c2f31',s,s);
  const blocks=[[0,0,13,9],[14,0,18,9],[0,10,8,10],[9,10,13,10],[23,10,9,10],[0,21,16,11],[17,21,15,11]];
  for(const[x,y,w,h]of blocks){const b=pick([['#6d6a62','#64625b','#77736a'],['#5f6260','#575a59','#6a6c69'],['#6b665c','#625d54','#746f64']]);
    for(let yy=y;yy<y+h-1;yy++)for(let xx=x;xx<x+w-1;xx++)px(g,xx,yy,pick(b));px(g,x,y,'#8a857a',w-1,1);px(g,x,y+h-2,'#46443f',w-1,1)}
  for(let i=0;i<18;i++)px(g,Math.floor(rnd()*s),Math.floor(rnd()*s),pick(['#4d6b34','#56763a']))})}
// grass: dithered base, darker clumps, blades catching light, rare clover and pebbles
function grass(){return tex(32,(g,s)=>{noise(g,s,['#2f4a26','#344f29','#2c4624','#36522b']);
  for(let i=0;i<9;i++){const cx=Math.floor(rnd()*s),cy=Math.floor(rnd()*s),r=2+Math.floor(rnd()*3);for(let y=-r;y<=r;y++)for(let x=-r;x<=r;x++)if(x*x+y*y<=r*r&&rnd()<.75)px(g,(cx+x+s)%s,(cy+y+s)%s,pick(['#28401f','#2a4321','#253c1d']));}
  for(let i=0;i<55;i++){const x=Math.floor(rnd()*s),y=Math.floor(rnd()*s),h=1+Math.floor(rnd()*3);for(let k=0;k<h;k++)px(g,x,(y+k)%s,k===0?'#5d8240':'#46683a');}
  for(let i=0;i<5;i++){const x=Math.floor(rnd()*30),y=Math.floor(rnd()*30);px(g,x,y,'#4f7a3a',2,2);px(g,x,y,'#6a9a4a');}
  for(let i=0;i<3;i++){const x=Math.floor(rnd()*31),y=Math.floor(rnd()*31);px(g,x,y,'#7a7468',2,1);px(g,x,y+1,'#3a3a32',2,1);}})}
// packed earth: two-tone ruts, shaded pebbles, a few roots
function dirt(){return tex(32,(g,s)=>{noise(g,s,['#4a3b2c','#45372a','#504031','#41342a']);
  for(let y=0;y<s;y+=8){const o=Math.floor(rnd()*4);for(let x=0;x<s;x++)if(rnd()<.6)px(g,x,(y+o+Math.floor(Math.sin(x*.4)*1.5)+s)%s,'#3a2e22');}
  for(let i=0;i<16;i++){const x=Math.floor(rnd()*30),y=Math.floor(rnd()*30),c=pick(['#7a6c58','#6b5d4c','#857560']);px(g,x,y,c,2,1);px(g,x,y+1,'#2e251c',2,1);px(g,x,y,'#9a8a72');}
  for(let i=0;i<2;i++){let x=Math.floor(rnd()*s),y=Math.floor(rnd()*s);for(let k=0;k<7;k++){px(g,x,y,'#5a3e28');x=(x+1)%s;if(rnd()<.4)y=(y+1)%s;}}})}
// cobbles: rounded stones with lit tops, dark mortar, moss in the seams
function cobble(){return tex(32,(g,s)=>{px(g,0,0,'#29241e',s,s);
  for(let y=0;y<s;y+=6)for(let x=((y/6)%2)*3-3;x<s;x+=7){const w=5+Math.floor(rnd()*2),c=pick([['#605a50','#6e685c','#4c4840'],['#686354','#787260','#525046'],['#57544c','#66625a','#45433d']]);
    for(let yy=1;yy<5;yy++)for(let xx=1;xx<w;xx++){if((yy===1||yy===4)&&(xx===1||xx===w-1))continue;px(g,(x+xx+s)%s,y+yy,yy===1?c[1]:yy===4?c[2]:c[0]);}
    if(rnd()<.3)px(g,(x+2+s)%s,y+2,'#7d776a');}
  for(let i=0;i<14;i++)px(g,Math.floor(rnd()*s),Math.floor(rnd()*s/6)*6,pick(['#3f5a2c','#4d6b34']));})}
// wall stone: staggered blocks with chipped edges, cracks, moss creeping up from the bottom
function wallStone(){return tex(32,(g,s)=>{px(g,0,0,'#202326',s,s);
  for(let r=0;r<4;r++){const off=r%2?6:0;for(let x=-off;x<s;x+=12){const c=pick([['#55585a','#4e5153','#626567'],['#5d5a54','#55524c','#6a6760'],['#4f5455','#484d4e','#5c6162']]);
    for(let yy=r*8+1;yy<r*8+7;yy++)for(let xx=Math.max(0,x+1);xx<Math.min(s,x+11);xx++)px(g,xx,yy,yy===r*8+1?c[2]:pick(c.slice(0,2)));
    if(rnd()<.5){const cx=Math.max(1,x+3+Math.floor(rnd()*5));for(let k=0;k<4;k++)px(g,Math.min(s-1,cx+(k>>1)),r*8+2+k,'#2a2c2e');}
    if(rnd()<.4)px(g,Math.max(0,x+1),r*8+1,'#202326',2,1);}}
  for(let i=0;i<30;i++){const x=Math.floor(rnd()*s),y=20+Math.floor(rnd()*12);if(rnd()<(y-18)/14)px(g,x,y,pick(['#3f5a2c','#4d6b34','#56763a']));}})}
function crate(){return tex(16,(g,s)=>{noise(g,s,['#6a4f37','#634a33','#70543a']);px(g,0,0,'#3a2a1d',s,1);px(g,0,15,'#3a2a1d',s,1);px(g,0,0,'#3a2a1d',1,s);px(g,15,0,'#3a2a1d',1,s);
  for(let i=1;i<15;i++){px(g,i,i,'#4a3726');px(g,i,15-i,'#4a3726')}px(g,0,7,'#3a2a1d',s,1)})}
function leaves(){return tex(16,(g,s)=>{noise(g,s,['#22381f','#27411f','#1d311b','#2e4a25','#355428']);for(let i=0;i<10;i++)px(g,Math.floor(rnd()*s),Math.floor(rnd()*s),'#46663a')})}
function bark(){return tex(16,(g,s)=>{for(let x=0;x<s;x++){const c=pick(['#3d2e22','#36281e','#45352a']);px(g,x,0,c,1,s)}for(let i=0;i<8;i++)px(g,Math.floor(rnd()*s),Math.floor(rnd()*s),'#251b14',1,3)})}
function grassSide(){return tex(32,(g,s)=>{noise(g,s,['#4a3b2c','#433526','#504031','#3e3124']);
  for(let x=0;x<s;x++){const d=4+Math.floor(rnd()*4);for(let y=0;y<d;y++)px(g,x,y,pick(['#2f4a26','#344f29','#3a5730']));px(g,x,d,'#24391e')}
  for(let i=0;i<8;i++)px(g,Math.floor(rnd()*s),10+Math.floor(rnd()*20),'#6b5d4c',2,1)})}
function moss(){return tex(16,(g,s)=>{noise(g,s,['#3c5a2c','#46663a','#2f4a26','#52753f'])})}
function blade(){const c=document.createElement('canvas');c.width=8;c.height=16;const g=c.getContext('2d');
  const cols=['#3f5c2e','#4f7038','#5d8240'];[[1,6],[3,1],[5,4],[6,8]].forEach(([x,top])=>{for(let y=top;y<16;y++)px(g,x,y,cols[(y+x)%3])});
  const t=new THREE.CanvasTexture(c);t.magFilter=t.minFilter=THREE.NearestFilter;return t}
function smokeTex(){const c=document.createElement('canvas');c.width=c.height=8;const g=c.getContext('2d');
  [[2,1,4,6],[1,2,6,4]].forEach(([x,y,w,h])=>px(g,x,y,'rgba(200,205,210,.55)',w,h));const t=new THREE.CanvasTexture(c);t.magFilter=t.minFilter=THREE.NearestFilter;return t}
function water(){return tex(32,(g,s)=>{noise(g,s,['#10232e','#0f202a','#132834','#0d1d26']);for(let i=0;i<10;i++){const x=Math.floor(rnd()*28),y=Math.floor(rnd()*s);px(g,x,y,'#2a4b5a',3+Math.floor(rnd()*3),1)}})}

