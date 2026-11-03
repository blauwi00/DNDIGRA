(() => {'use strict';const atlas='assets/approved-cartoon-ui.png';
const regions={book:[783,653,133,104],ranger:[30,70,227,226],wizard:[277,70,226,226],keeper:[526,70,227,226],novice:[771,70,224,226],map:[48,1339,91,91],hero:[191,1341,77,88],bag:[328,1341,84,88],sword:[470,1341,79,88],shield:[608,1341,80,88],chat:[748,1341,80,88],dice:[886,1340,84,90],barrel:[34,635,139,186],chest:[187,652,174,170],books:[385,604,166,217],torch:[581,609,101,213],desk:[713,617,277,203],ration:[30,1110,188,164],ink:[281,1089,139,184],rope:[422,1116,190,149],letter:[644,1110,159,166],pack:[812,1100,190,174]};
function image(key,cls=''){const r=regions[key]||regions.ranger,s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox',r.join(' '));s.setAttribute('class','painted-asset '+cls);s.setAttribute('aria-hidden','true');const i=document.createElementNS('http://www.w3.org/2000/svg','image');i.setAttribute('href',atlas);i.setAttribute('width','1024');i.setAttribute('height','1536');s.append(i);return s;}
// All portrait parts are built on the same canvas from the model's characterProfile.
function hero(actor){
 const c=Characters.portrait(actor.kind||0,actor,{width:168,height:192,pixel:3});if(!c)return image('ranger');
 const ns='http://www.w3.org/2000/svg',s=document.createElementNS(ns,'svg');s.setAttribute('viewBox','0 0 168 192');s.setAttribute('class','painted-asset head-portrait pixel-portrait');s.setAttribute('aria-label','Портрет '+(actor.name||'героя'));s.dataset.portraitSource='character-boxes';const i=document.createElementNS(ns,'image');i.setAttribute('width',168);i.setAttribute('height',192);i.setAttribute('href',c.toDataURL());s.append(i);return s;
}
function npc(name){const id=Characters.NPC_BY_NAME[String(name||'').split(' · ')[0].trim()];return id?hero({kind:5,npc:id,name}):null;}
const old=window.UIIcons.svg;window.UIIcons.svg=name=>regions[name]?image(name,'ui-icon').outerHTML:old(name);
window.Artwork={image,hero,npc,atlas};})();
