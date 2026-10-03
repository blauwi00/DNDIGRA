(() => {'use strict';const atlas='assets/approved-cartoon-ui.png';
const regions={book:[783,653,133,104],ranger:[30,70,227,226],wizard:[277,70,226,226],keeper:[526,70,227,226],novice:[771,70,224,226],map:[48,1339,91,91],hero:[191,1341,77,88],bag:[328,1341,84,88],sword:[470,1341,79,88],shield:[608,1341,80,88],chat:[748,1341,80,88],dice:[886,1340,84,90],barrel:[34,635,139,186],chest:[187,652,174,170],books:[385,604,166,217],torch:[581,609,101,213],desk:[713,617,277,203],ration:[30,1110,188,164],ink:[281,1089,139,184],rope:[422,1116,190,149],letter:[644,1110,159,166],pack:[812,1100,190,174]};
function image(key,cls=''){const r=regions[key]||regions.ranger,s=document.createElementNS('http://www.w3.org/2000/svg','svg');s.setAttribute('viewBox',r.join(' '));s.setAttribute('class','painted-asset '+cls);s.setAttribute('aria-hidden','true');const i=document.createElementNS('http://www.w3.org/2000/svg','image');i.setAttribute('href',atlas);i.setAttribute('width','1024');i.setAttribute('height','1536');s.append(i);return s;}
// All portrait parts are built on the same canvas from the model's characterProfile.
function hero(actor){
 const p=CharacterStyle.characterProfile(actor),ns='http://www.w3.org/2000/svg',s=document.createElementNS(ns,'svg');
 s.setAttribute('viewBox','0 0 320 360');s.setAttribute('preserveAspectRatio','xMidYMid meet');
 s.setAttribute('class','painted-asset head-portrait custom-portrait');
 s.setAttribute('aria-label','Портрет '+(actor.name||'героя'));
 s.dataset.gender=p.gender;s.dataset.cloth=p.cloth;s.dataset.hairStyle=p.hairStyle;
 s.dataset.faceBase=p.gender;s.dataset.face=p.face;s.dataset.style=p.style;s.dataset.portraitSource='layered';
 const im=document.createElementNS(ns,'image');im.setAttribute('width',320);im.setAttribute('height',360);s.append(im);
 const paint=()=>{const c=PortraitRenderer.render(p);if(c){im.setAttribute('href',c.toDataURL());s.dataset.portraitReady='true';}};
 paint();if(!s.dataset.portraitReady)PortraitRenderer.ready.then(paint).catch(()=>s.dataset.portraitError='true');
 return s;
}

function npc(name){const actor=CharacterStyle.npcActor(name);return actor?hero(actor):null;}
const old=window.UIIcons.svg;window.UIIcons.svg=name=>regions[name]?image(name,'ui-icon').outerHTML:old(name);
window.Artwork={image,hero,npc,atlas};})();
