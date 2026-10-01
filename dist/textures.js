(() => {
const texture=new Image();let ready=false;
function draw(c,i,x,y,w,h){const sw=texture.width/4,sh=texture.height/3;c.drawImage(texture,i%4*sw,Math.floor(i/4)*sh,sw,sh,x,y,w,h)}
window.drawTerrainTile=(c,x,y,seed)=>{if(!ready)return false;const code=((x*73856093)^(y*19349663)^seed)>>>0;const variants=[0,1,2,7,0,1,2,7,3,5,6,4];draw(c,variants[code%variants.length],-.5,-.5,1,1);return true};
window.drawWallTile=(c,x,y,seed,faces=4)=>{if(!ready)return false;const sw=texture.width/4,sh=texture.height/3,i=((x*347)^(y*113)^seed)>>>0,sx=i%4*sw,sy=2*sh;c.drawImage(texture,sx,sy,sw,sh*.56,x,y,1,1);for(let d=0;d<4;d++)if(faces&(1<<d)){c.save();c.translate(x+.5,y+.5);c.rotate([Math.PI,-Math.PI/2,0,Math.PI/2][d]);c.drawImage(texture,sx,sy+sh*.56,sw,sh*.44,-.5,.28,1,.22);c.restore()}return true};
texture.onload=()=>{ready=true;window.gameDebug?.render()};texture.src='assets/terrain-lab.png';
})();
