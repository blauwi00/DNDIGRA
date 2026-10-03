// Approved character sheet 2026-10-02. This is the sole source of character geometry.
export const STYLE_VERSION='approved-voxel-v4';
// Rectangles inside the original 1024x1536 reference, matching the approved local portraits.
export const PORTRAIT_REGIONS={
 fighter:{male:[30,130,239,272],female:[552,129,212,273]},
 wizard:{male:[30,498,239,264],female:[552,498,212,264]},
 rogue:{male:[30,870,239,262],female:[552,870,212,262]},
 cleric:{male:[30,1230,239,267],female:[552,1230,212,267]},
};
export const STYLE={voxel:.105,height:1.40,headWidth:.5332,headHeight:.44,eyeHeight:.0935,maxParts:420,maxPalette:32};
export const ROLES={fighter:{cloth:'#315e84',trim:'#c6a04f',hair:'#75462e',skin:'#efbc88'},wizard:{cloth:'#62377e',trim:'#c6a04f',hair:'#c9c6d7',skin:'#efbc88'},rogue:{cloth:'#487844',trim:'#c6a04f',hair:'#352b32',skin:'#efbc88'},cleric:{cloth:'#8b3d46',trim:'#c6a04f',hair:'#734c32',skin:'#efbc88'},skeleton:{cloth:'#813a36',trim:'#c6a04f',hair:'#352b32',skin:'#d9c9a5'},dummy:{cloth:'#936c40',trim:'#c6a04f',hair:'#936c40',skin:'#936c40'}};
// Adapted from Claude's NPCS registry. Keep scene IDs and identity independent of names.
export const NPCS=Object.freeze({
  keeper:Object.freeze({name:'Эллен',role:'хранительница',classId:'cleric',appearance:Object.freeze({gender:'female',hair:'#c9c6d7',hairStyle:'long',face:'soft'}),hood:true,hands:Object.freeze(['empty','empty'])}),
  novice:Object.freeze({name:'Лин',role:'послушник',classId:'cleric',appearance:Object.freeze({gender:'male',hair:'#75462e',hairStyle:'short',face:'soft'}),hood:false,hands:Object.freeze(['empty','empty'])})
});
const NPC_ALIASES={ellen:'keeper',lin:'novice'};
export function npcDefinition(id){const key=Object.hasOwn(NPC_ALIASES,id)?NPC_ALIASES[id]:id;if(!Object.hasOwn(NPCS,key))throw new Error('NPC must be registered in NPCS: '+id);return NPCS[key];}
export function npcActor(name){const short=String(name||'').split(' · ')[0].trim(),id=Object.keys(NPCS).find(id=>NPCS[id].name===short);return id?{name,kind:5,npcId:id}:null;}
export function characterProfile(actor={},kind=actor.kind||0){
  const npcId=actor.npcId||(actor.type==='npc'?actor.id:null),npc=npcId?npcDefinition(npcId):null;
  const role=npc?.classId||(actor.classId&&Object.hasOwn(ROLES,actor.classId)?actor.classId:['rogue','wizard','fighter','skeleton','dummy','cleric'][kind]||'cleric');
  const a=npc?.appearance||actor.appearance||{},base=ROLES[role],gender=['male','female'].includes(a.gender)?a.gender:(!actor.appearance&&kind===1?'female':'male'),hex=(v,f)=>/^#[a-f0-9]{6}$/i.test(v||'')?v:f;
  return {style:STYLE_VERSION,role,gender,skin:hex(a.skin,base.skin),hair:hex(a.hair,gender==='female'&&role==='cleric'?'#c9c6d7':gender==='female'&&role==='fighter'?'#d7a652':base.hair),cloth:hex(a.cloth,base.cloth),trim:hex(a.trim,base.trim),hairStyle:['short','long','bald'].includes(a.hairStyle)?a.hairStyle:role==='cleric'&&!npc&&gender==='male'?'bald':gender==='female'&&role!=='rogue'?'long':'short',face:['soft','stern','beard'].includes(a.face)?a.face:role==='cleric'&&!npc&&gender==='male'?'beard':'soft',hood:npc?npc.hood:role==='cleric'&&gender==='female',hands:npc?.hands||actor.hands||(role==='fighter'||role==='skeleton'?['sword','shield']:role==='wizard'||role==='cleric'?['staff','empty']:['sword','empty'])};
}
export function tint(hex,delta){const n=parseInt(hex.slice(1),16);return '#'+[n>>16,(n>>8)&255,n&255].map(v=>Math.min(255,Math.max(0,v+delta)).toString(16).padStart(2,'0')).join('');}
export function characterParts(actor={},kind=actor.kind||0){const p=characterProfile(actor,kind),parts=[];let section='body';const B=(x,y,z,w,h,d,color,rz=0)=>{const head=['head','hair','beard','hood'].includes(section),sx=head?1.24:1.20,sy=head?1.10:section==='equipment'?.84:.76,sz=head?1.20:1.12;parts.push({x:x*sx,y:head?.7494+(y-.945)*sy:.13+(y-.13)*sy,z:z*sz,w:w*sx,h:h*sy,d:d*sz,color,rz,section});},female=p.gender==='female',cloth=p.cloth,gold=p.trim,leather='#573b29',steel='#9caeb9',skin=p.skin,light=tint(cloth,17),dark=tint(cloth,-20),width=female?.31:.36;
if(p.role==='dummy'){section='equipment';B(0,.6,0,.1,.95,.1,leather);B(0,.85,0,.65,.09,.1,'#a4814b');B(0,1.15,0,.39,.38,.34,'#b8955e');B(0,1.15,.18,.28,.26,.015,'#843d32');B(0,1.15,.196,.14,.13,.02,gold);return {profile:p,parts};}
// Boots and trousers: visible silhouettes, no flat skirt covering both feet.
for(const x of[-.115,.115]){B(x,.22,.025,.17,.15,.26,leather);B(x,.29,.035,.18,.05,.23,tint(leather,13));B(x,.405,0,.145,.22,.18,'#343139');B(x,.335,.109,.145,.04,.025,gold);B(x,.22,.16,.15,.07,.025,tint(leather,-14));}
B(0,.715,0,width,.37,.26,cloth);B(0,.665,.139,width,.22,.018,dark);B(0,.87,.14,width,.045,.025,light);B(0,.535,0,width+.045,.055,.295,leather);B(0,.535,.165,.09,.08,.04,gold);B(0,.535,.189,.043,.035,.014,leather);
for(const x of[-(width/2+.065),width/2+.065]){B(x,.79,0,.13,.19,.21,cloth,x<0?-.13:.13);B(x,.644,.035,.105,.12,.15,leather);B(x,.57,.05,.102,.09,.115,skin);B(x,.715,.11,.13,.035,.028,gold);B(x,.643,.12,.105,.025,.035,tint(leather,18));}
if(p.role==='fighter'){
B(0,.74,.16,width+.01,.27,.07,dark);B(0,.75,.202,width-.035,.18,.025,light);B(0,.865,.193,width+.025,.045,.035,gold);B(0,.674,.202,width,.04,.03,gold);
for(const x of[-.25,.25]){B(x,.9,0,.22,.13,.285,cloth);B(x,.923,.02,.17,.045,.25,light);B(x,.858,.139,.205,.035,.025,gold);B(x,.75,.121,.12,.11,.04,steel);B(x,.717,.151,.12,.026,.02,'#c8d0d2');}
for(const x of[-.135,.135]){B(x,.458,.045,.165,.11,.27,cloth);B(x,.422,.185,.165,.035,.02,gold);B(x,.47,.195,.07,.07,.012,light);}
B(0,.765,.225,.035,.11,.015,gold);B(0,.485,.162,.075,.05,.018,'#c5a165');
}else if(p.role==='wizard'){
for(const x of[-.11,.11]){B(x,.457,0,.13,female?.30:.22,.31,cloth);B(x,.34,.166,.13,.035,.025,gold);B(x,.65,.152,.028,.31,.025,gold);B(x,.47,.171,.045,.10,.02,light);}
B(0,.73,.148,.09,.30,.028,'#343139');B(0,.871,.173,.05,.055,.03,gold);B(0,.873,.196,.022,.022,.017,'#63c6ed');for(const x of[-.17,.17])B(x,.874,.16,.07,.12,.09,light,x<0?-.22:.22);
}else if(p.role==='rogue'){
B(0,.715,.165,width-.015,.285,.045,leather);B(-.065,.70,.194,.13,.22,.018,tint(leather,13));B(.09,.70,.195,.10,.22,.02,tint(leather,-10));
B(0,.75,-.17,.42,.38,.065,dark);B(0,.92,.02,.45,.09,.35,light);B(-.17,.846,.129,.20,.07,.07,cloth,-.30);B(.12,.837,.152,.27,.07,.07,cloth,.22);B(0,.859,.196,.08,.06,.024,gold);B(-.1,.725,.175,.05,.28,.035,leather,-.60);B(.085,.639,.175,.09,.07,.03,leather,-.60);for(const x of[-.16,.16]){B(x,.496,.182,.10,.115,.06,leather);B(x,.529,.218,.10,.035,.025,tint(leather,17));B(x,.509,.235,.025,.026,.014,gold);}for(const x of[-.17,.17])B(x,.428,-.04,.075,.15,.27,cloth);
}else if(p.role==='cleric'){
for(const x of[-.13,.13]){B(x,.452,0,.16,.30,.30,cloth);B(x,.316,.173,.16,.035,.025,'#dfcea6');B(x,.7,.163,.036,.30,.025,'#dfcea6');}
B(0,.70,.168,.10,.30,.028,'#4d7541');for(const x of[-.14,.14])B(x,.904,.02,.20,.075,.32,'#dfcea6',x<0?-.18:.18);B(0,.857,.176,.038,.14,.035,gold);B(0,.875,.18,.105,.032,.035,gold);for(const x of[-.235,.235])B(x,.73,.09,.13,.045,.22,'#dfcea6');
}
B(0,.537,-.155,width+.045,.055,.025,leather);
if(p.role==='fighter'){B(0,.75,-.16,width-.035,.23,.05,dark);B(0,.87,-.19,width,.035,.025,gold);B(0,.66,-.19,width,.035,.025,gold);}
if(p.role==='wizard'||p.role==='cleric'){for(const x of[-.10,.10]){B(x,.66,-.158,.025,.34,.026,p.role==='cleric'?'#dfcea6':gold);B(x,.439,-.17,.14,.18,.024,dark);}}
if(p.role==='rogue'){for(const x of[-.10,.10])B(x,.75,-.21,.10,.33,.02,tint(cloth,x<0?8:-12));B(0,.575,-.208,.38,.025,.025,tint(cloth,15));}
// The skull is enlarged independently of the shorter body: reference chibi proportions.
section='head';
B(0,1.145,.03,.43,.40,.35,skin);B(0,.955,.03,.13,.06,.14,skin);for(const x of[-.239,.239])B(x,1.125,.045,.055,.11,.095,tint(skin,-9));B(.205,1.13,.06,.016,.33,.29,tint(skin,-15));B(-.105,1.319,.029,.20,.017,.32,tint(skin,15));
if(p.role==='skeleton'){B(0,1.145,.03,.43,.4,.35,p.skin);for(const x of[-.105,.105])B(x,1.15,.218,.094,.095,.028,'#292620');B(0,1.075,.219,.049,.058,.022,'#292620');for(const x of[-.12,-.06,0,.06,.12])B(x,1.01,.222,.035,.062,.026,tint(p.skin,10));for(const x of[-.15,.15])B(x,1.045,.20,.05,.09,.05,p.skin);B(0,.715,.169,.06,.13,.02,gold);
}else{for(const x of[-.10,.10]){B(x,1.135,.218,.050,.085,.015,'#251e1c');if(p.face==='stern')B(x,1.206,.216,.073,.025,.018,p.hair,x<0?-.22:.22);else if(!female)B(x,1.202,.216,.065,.014,.018,p.hair);else B(x-.01,1.181,.217,.035,.012,.017,'#251e1c');}B(0,1.025,.213,.056,.009,.012,tint(skin,-55));}
section='beard';
if(p.face==='beard'&&p.role!=='skeleton'){for(const x of[-.165,-.11,.11,.165])B(x,1.036,.218,.06,.13,.035,p.hair);B(0,.994,.218,.27,.09,.04,p.hair);B(0,1.022,.243,.105,.03,.025,tint(p.hair,14));}
section='hair';
if(p.hairStyle!=='bald'&&p.role!=='skeleton'){
// A solid scalp shell prevents bald gaps; larger irregular locks create a stepped silhouette.
if(!p.hood)B(0,1.34,-.005,.47,.06,.405,tint(p.hair,-8));
else {
 // Fill the visible opening behind the fringe up to the hood band.
 // This is inside the hood, never a shell protruding through its roof.
 B(0,1.352,.208,.395,.10,.072,tint(p.hair,-8));
 for(const side of[-1,1])B(side*.19,1.29,.208,.055,.115,.06,p.hair);
}
const locks=[[1,2,3,2,1],[2,3,2,4,2],[2,2,4,3,2],[1,3,2,2,1]];
if(!p.hood)for(let z=0;z<4;z++)for(let x=0;x<5;x++){const level=locks[z][x],offset=(z%2?.014:-.012);B((x-2)*.095+offset,1.325+(level-1)*.025,(z-1.5)*.104,.101,.06+(level-1)*.05,.111,tint(p.hair,[4,15,-9,8][(x+z)%4]));}
const fringe=[{x:-.20,y:1.295,h:.11},{x:-.11,y:1.255,h:.20},{x:0,y:1.30,h:.11},{x:.10,y:1.265,h:.18},{x:.20,y:1.285,h:.13}];
for(let i=0;i<fringe.length;i++){const f=fringe[i];B(f.x,f.y,.224,.104,f.h,.096,tint(p.hair,i%2?0:13));}
for(const x of[-.223,.223]){B(x,1.24,-.035,.067,.16,.32,tint(p.hair,-9));B(x,1.205,.135,.073,.13,.08,p.hair);}
if(!p.hood)B(0,1.225,-.17,.45,.25,.068,tint(p.hair,-9));
if(female&&!p.hood&&p.hairStyle==='short'){for(const x of[-.239,.239]){B(x,1.11,.005,.073,.23,.31,p.hair);B(x,1.007,.015,.08,.07,.25,tint(p.hair,10));}B(0,1.08,-.175,.46,.29,.075,p.hair);}
if(p.hairStyle==='long'&&p.hood)for(const x of[-.218,.218])B(x,1.085,.225,.054,.15,.065,p.hair);
if(p.hairStyle==='long'&&!p.hood){
 if(p.role==='fighter'&&female){B(.105,1.31,-.25,.16,.15,.15,p.hair);B(.11,1.08,-.25,.18,.36,.145,p.hair);B(.11,.865,-.24,.13,.09,.14,tint(p.hair,14));B(.105,1.245,-.273,.17,.035,.15,'#352b32');}
 else if(!female){B(0,1.43,-.19,.19,.16,.18,p.hair);B(.025,1.26,-.235,.20,.15,.16,p.hair);B(.025,1.335,-.248,.20,.03,.16,'#251e1c');}
 else {for(let i=0;i<5;i++)B((i-2)*.094,1.035,-.18,.098,.40,.088,tint(p.hair,i%2?0:12));for(const x of[-.247,.247]){B(x,1.06,.015,.075,.34,.27,p.hair);B(x,.873,.035,.08,.085,.24,tint(p.hair,14));}}
}
}
section='hood';
if(p.hood){const cream='#dfcea6';B(0,1.444,-.025,.39,.065,.44,cream);B(0,1.482,-.025,.25,.03,.38,p.cloth);B(0,1.23,-.23,.49,.40,.055,cream);for(const side of[-1,1]){B(side*.217,1.385,-.035,.078,.105,.43,cream);B(side*.253,1.19,-.035,.064,.30,.43,cream);B(side*.24,1.335,.2,.06,.07,.04,p.cloth);B(side*.266,1.165,.20,.03,.23,.04,tint(cream,-16));}B(0,1.409,.205,.34,.028,.025,p.cloth);}
// Hands reflect actual equipment, not merely the class illustration.
section='equipment';
if(p.hands.includes('shield')){const x=.36;B(x,.75,.20,.30,.48,.055,gold);B(x,.75,.238,.235,.405,.027,cloth);B(x,.75,.26,.03,.19,.015,gold);B(x,.78,.261,.145,.03,.017,gold);B(x,.508,.20,.22,.045,.06,gold);B(x,.474,.20,.15,.038,.06,gold);}
if(p.hands.includes('sword')){B(-.345,.65,.16,.085,.38,.05,steel,.42);B(-.418,.80,.16,.065,.14,.05,'#d6dcdf',.42);B(-.264,.466,.16,.17,.035,.07,gold,.42);B(-.234,.411,.16,.045,.1,.045,leather,.42);}
if(p.hands.includes('staff')){B(-.34,.85,.05,.045,.96,.045,leather);if(p.role==='cleric'){B(-.34,1.25,.05,.15,.13,.15,steel);for(const x of[-.435,-.245])B(x,1.25,.05,.045,.12,.1,gold);B(-.34,1.35,.05,.055,.065,.055,gold);}else{B(-.34,1.35,.05,.16,.05,.16,gold);B(-.34,1.42,.05,.12,.12,.12,'#46bbed');B(-.34,1.50,.05,.06,.05,.06,'#7bd8f7');}}
if(p.hands.includes('bow')){for(let i=0;i<5;i++)B(-.33-.055*Math.sin(i*Math.PI/4),.55+i*.10,.07,.043,.13,.04,'#936c40');B(-.33,.75,.085,.01,.40,.01,'#cebfa0');}
return {profile:p,parts};}
