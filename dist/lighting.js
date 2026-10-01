(() => {
'use strict';
const W=10,H=8,canvas=document.getElementById('lighting'),ctx=canvas.getContext('2d'),pool=document.createElement('canvas'),px=pool.getContext('2d');
const lights=[{id:'west',x:1.24,y:3.36,radius:3.8,power:1,phase:0},{id:'east',x:8.76,y:4.55,radius:3.8,power:1,phase:1.8},{id:'altar',x:7.5,y:1.35,radius:3.4,power:.85,phase:4.2}];
const motions=new Map();let frameCount=0,lastFrame=-Infinity;
const clock=()=>window.performance?.now?.()??Date.now();
function position(p,time){const m=motions.get(p.id);if(!m)return p;const t=Math.max(0,Math.min(1,(time-m.start)/m.duration));if(t===1){motions.delete(p.id);return p}return{x:m.from.x+(m.to.x-m.from.x)*t,y:m.from.y+(m.to.y-m.from.y)*t}}
function rect(id,x,y,w,h){return{id,x:x-w/2,y:y-h/2,w,h}}
function occluders(time){const game=window.gameDebug;if(!game)return[];const s=game.state,a=[];
 for(const p of game.props){if(p.id==='chest'&&s.chest||p.id==='keeper'&&s.combat)continue;a.push(rect(p.id,p.x+.5,p.y+.5,p.id==='altar'?.78:.6,p.id==='altar'?.55:.5))}
 for(const y of[5,6])for(const x of[2,8])a.push(rect('bench'+x+y,x+.5,y+.5,1.45,.42));
 for(const p of[...s.party,...s.enemies])if(p.hp>0){const q=position(p,time);a.push(rect(p.id,q.x+.5,q.y+.5,.46,.3))}return a;
}
function edges(rectangles){const a=[[[0,0],[W,0]],[[W,0],[W,H]],[[W,H],[0,H]],[[0,H],[0,0]]];for(const r of rectangles){const x=r.x,y=r.y,b=x+r.w,d=y+r.h;a.push([[x,y],[b,y]],[[b,y],[b,d]],[[b,d],[x,d]],[[x,d],[x,y]])}return a}
function ray(light,angle,segments){const dx=Math.cos(angle),dy=Math.sin(angle);let nearest=20;
 for(const [a,b]of segments){const sx=b[0]-a[0],sy=b[1]-a[1],den=dx*sy-dy*sx;if(Math.abs(den)<1e-9)continue;const ax=a[0]-light.x,ay=a[1]-light.y,t=(ax*sy-ay*sx)/den,u=(ax*dy-ay*dx)/den;if(t>=0&&u>=0&&u<=1&&t<nearest)nearest=t}return{x:light.x+dx*nearest,y:light.y+dy*nearest,angle};
}
function visibility(light,objects){const blockers=objects.filter(r=>r.id!==light.id&&!(light.x>=r.x&&light.x<=r.x+r.w&&light.y>=r.y&&light.y<=r.y+r.h)),segments=edges(blockers),angles=[];
 for(let i=0;i<64;i++)angles.push(i*Math.PI*2/64-Math.PI);for(const [a,b]of segments)for(const point of[a,b]){const theta=Math.atan2(point[1]-light.y,point[0]-light.x);angles.push(theta-.0001,theta,theta+.0001)}return angles.map(a=>ray(light,a,segments)).sort((a,b)=>a.angle-b.angle);
}
function power(light,time){return light.power*(1+.035*Math.sin(time*.003+light.phase)+.018*Math.sin(time*.008+light.phase*2))}
function render(time=clock()){
 const board=document.getElementById('board'),size=Math.max(1,Math.min(480,Math.round(board.clientWidth)));if(canvas.width!==size||canvas.height!==Math.round(size*.8)){canvas.width=pool.width=size;canvas.height=pool.height=Math.round(size*.8)}const unit=size/W;
 ctx.setTransform(1,0,0,1,0,0);ctx.globalCompositeOperation='source-over';ctx.filter='none';ctx.fillStyle='#999c90';ctx.fillRect(0,0,size,canvas.height);
 const objects=occluders(time);
 for(const light of lights){if(light.power<=0)continue;const polygon=visibility(light,objects),strength=power(light,time);px.setTransform(1,0,0,1,0,0);px.clearRect(0,0,pool.width,pool.height);px.save();px.scale(unit,unit);px.beginPath();polygon.forEach((p,i)=>i?px.lineTo(p.x,p.y):px.moveTo(p.x,p.y));px.closePath();px.clip();const g=px.createRadialGradient(light.x,light.y,.04,light.x,light.y,light.radius);g.addColorStop(0,`rgba(106,80,43,${strength*.86})`);g.addColorStop(.25,`rgba(96,70,37,${strength*.65})`);g.addColorStop(.65,`rgba(88,63,32,${strength*.23})`);g.addColorStop(1,'rgba(88,63,32,0)');px.fillStyle=g;px.fillRect(0,0,W,H);px.restore();ctx.globalCompositeOperation='lighter';ctx.filter='blur(2px)';ctx.drawImage(pool,0,0);ctx.filter='none';}
 // Vertical faces have known normals; no directional shadow is baked into the atlas.
 ctx.globalCompositeOperation='source-over';ctx.setTransform(unit,0,0,unit,0,0);
 for(let y=0;y<H;y++)for(let x=0;x<W;x++)if(x===0||x===W-1||y===0||y===H-1){const nx=x===0?1:x===W-1?-1:0,ny=y===0?1:y===H-1?-1:0;let illumination=.62;
  for(const l of lights){const dx=l.x-x-.5,dy=l.y-y-.5,d=Math.hypot(dx,dy),dot=Math.max(0,(dx*nx+dy*ny)/Math.max(d,.1));illumination+=Math.max(0,1-d/l.radius)*dot*power(l,time)*.3}
  ctx.fillStyle=`rgba(25,27,24,${1-Math.min(.9,illumination)})`;if(y===0)ctx.fillRect(x,y+.76,1,.24);else if(y===H-1)ctx.fillRect(x,y,1,.24);else if(x===0)ctx.fillRect(x+.76,y,.24,1);else ctx.fillRect(x,y,.24,1);
 }
 frameCount++;
}
window.lightingMove=(id,from,to,duration)=>{if(duration<=0)motions.delete(id);else motions.set(id,{from,to,duration,start:clock()});render()};window.updateLighting=()=>render();
function tick(time){if(!document.hidden&&!document.getElementById('map-view').hidden&&time-lastFrame>=65){render(time);lastFrame=time}window.requestAnimationFrame(tick)}
if(window.requestAnimationFrame&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches)window.requestAnimationFrame(tick);
window.lightingDebug={render,visibility,occluders,lights,get frames(){return frameCount},power};
})();
