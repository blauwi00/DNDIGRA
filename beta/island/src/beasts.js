// ---------- beasts of the wild land: boar and bear ----------
// Built like the wolf: boxes [x,y,z,w,h,d,colour,glow], nose towards +z, feet on y=0, and texel
// shading as thin patches on the big boxes (CHARACTER_STYLE.md, «Тексели»), never a flat fill.
(()=>{const sh=(c,k)=>{const r=(c>>16)&255,g=(c>>8)&255,b=c&255;return (Math.min(255,r*k|0)<<16)|(Math.min(255,g*k|0)<<8)|Math.min(255,b*k|0);};
  function texel(out,b,seed){const[x,y,z,w,h,d,c]=b;let s=seed;const r=()=>(s=(s*16807)%2147483647)/2147483647;
    // patches on the top and both sides, a little darker or lighter than the fur
    for(let i=0;i<Math.round(w*d*30)+2;i++){const px=x+(r()-.5)*(w-.06),pz=z+(r()-.5)*(d-.06),k=.8+r()*.35;out.push([px,y+h/2+.004,pz,.04+r()*.05,.008,.04+r()*.05,sh(c,k),false]);}
    for(const s2 of[-1,1])for(let i=0;i<Math.round(h*d*24)+1;i++){const py=y+(r()-.5)*(h-.06),pz=z+(r()-.5)*(d-.06),k=.78+r()*.3;out.push([x+s2*(w/2+.004),py,pz,.008,.04+r()*.04,.04+r()*.05,sh(c,k),false]);}}
  function beast(spec){const o=[],B=(x,y,z,w,h,d,c,e)=>{const b=[x,y,z,w,h,d,c,!!e];o.push(b);return b;};
    const{fur,dark,legH,bodyW,bodyH,bodyL,headS,snout,tusk,ears,tail,seed}=spec,y0=legH+bodyH/2;
    const body=B(0,y0,0,bodyW,bodyH,bodyL,fur);B(0,y0+bodyH/2+.03,-bodyL*.1,bodyW*.8,.06,bodyL*.6,sh(fur,.85)); // back ridge
    for(const sx of[-1,1])for(const sz of[-1,1]){const lx=sx*(bodyW/2-.07),lz=sz*(bodyL/2-.1);B(lx,legH/2,lz,.11,legH+.04,.12,dark);B(lx,.03,lz+.02,.12,.06,.14,sh(dark,.7));}
    const hz=bodyL/2+headS*.35,hy=y0+bodyH*.15;const head=B(0,hy,hz,headS*1.05,headS,headS,fur);
    B(0,hy-headS*.18,hz+headS/2+snout/2,headS*.62,headS*.5,snout,sh(fur,.9));B(0,hy-headS*.12,hz+headS/2+snout+.01,headS*.4,headS*.26,.02,0x1a1412);
    for(const sx of[-1,1]){B(sx*headS*.24,hy+headS*.12,hz+headS/2+.005,.05,.05,.02,0x16120e);B(sx*headS*.24+sx*.012,hy+headS*.14,hz+headS/2+.012,.015,.015,.01,0xf0e8d8,true);
      B(sx*headS*.36,hy+headS/2+ears/2,hz-headS*.15,.08,ears,.07,dark);
      if(tusk)B(sx*headS*.27,hy-headS*.12,hz+headS/2+snout*.7,.035,tusk,.035,0xf0e8d0);}
    B(0,y0+bodyH*.2,-bodyL/2-tail/2,.07,.07,tail,dark);
    texel(o,body,seed);texel(o,head,seed+7);return o;}
  MODELS.boar=beast({fur:0x6a4a34,dark:0x3e2a1c,legH:.22,bodyW:.42,bodyH:.36,bodyL:.86,headS:.3,snout:.16,tusk:.09,ears:.09,tail:.16,seed:11});
  MODELS.bear=beast({fur:0x4a3424,dark:0x2a1c12,legH:.3,bodyW:.62,bodyH:.56,bodyL:1.12,headS:.42,snout:.16,tusk:0,ears:.1,tail:.1,seed:23});})();
