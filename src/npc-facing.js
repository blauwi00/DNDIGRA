// Visual pose only: keep generator output and saved-world flags unchanged.
const DIRS = [[0,1],[1,0],[0,-1],[-1,0]];
function hash(text){let n=2166136261;for(const c of String(text))n=Math.imul(n^c.charCodeAt(0),16777619);return n>>>0;}
export function npcFacing(scene,p,seed=''){
  if(Number.isInteger(p.facing)&&p.facing>=0&&p.facing<4)return p.facing;
  const npcs=scene.props.filter(o=>o.type==='npc').slice().sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0);
  const rank=Math.max(0,npcs.findIndex(o=>o.id===p.id)),preferred=(hash(seed+':'+scene.id)+rank)%4;
  const open=DIRS.map(([dx,dy],i)=>({i,x:p.x+dx,y:p.y+dy})).filter(c=>scene.tiles[c.y]?.[c.x]==='floor'&&!scene.props.some(o=>o.x===c.x&&o.y===c.y&&o.solid!==false));
  return open.sort((a,b)=>(a.i-preferred+4)%4-(b.i-preferred+4)%4)[0]?.i??preferred;
}
export function faceCell(p,target){const dx=target.x-p.x,dy=target.y-p.y;return Math.abs(dx)>Math.abs(dy)?dx>0?1:3:dy<0?2:0;}
