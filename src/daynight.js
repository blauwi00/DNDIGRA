// Game clock and outdoor lighting by time of day. Pure functions: voxel.js
// advances the clock only while the player explores, and applies the light.
export const DAY_MINUTES=1440;
// One full day takes 20 real minutes, like Minecraft. Change only this number.
export const REAL_SECONDS_PER_DAY=1200;
export const START_MINUTE=8*60;

export function advanceClock(total,seconds){
  const base=Number.isFinite(total)&&total>=0?total:START_MINUTE;
  if(!(seconds>0))return base;
  // A long frame (tab sleep, debugger) never skips more than a few game minutes.
  return base+Math.min(seconds,.5)*DAY_MINUTES/REAL_SECONDS_PER_DAY;
}

export function clockParts(total){
  const t=Number.isFinite(total)&&total>=0?total:START_MINUTE,minute=Math.floor(t%DAY_MINUTES);
  return {day:Math.floor(t/DAY_MINUTES)+1,hour:Math.floor(minute/60),minute:minute%60,
    label:String(Math.floor(minute/60)).padStart(2,'0')+':'+String(minute%60).padStart(2,'0')};
}

const clamp=v=>Math.max(0,Math.min(1,v));
// 0 at night, 1 at full day. Dawn runs 5:00-7:30, dusk 18:30-21:00.
export function sunlight(total){
  const h=((Number.isFinite(total)?total:START_MINUTE)%DAY_MINUTES)/60;
  if(h<5||h>=21)return 0;
  if(h<7.5)return clamp((h-5)/2.5);
  if(h<18.5)return 1;
  return clamp(1-(h-18.5)/2.5);
}

const mix=(a,b,k)=>{
  const c=s=>Math.round(((a>>s)&255)+(((b>>s)&255)-((a>>s)&255))*k);
  return (c(16)<<16)|(c(8)<<8)|c(0);
};
// Warm tint near sunrise/sunset, cold blue moonlight at night.
export function outdoorLight(total){
  const sun=sunlight(total),golden=Math.max(0,1-Math.abs(sun-.5)*2)*(sun<1?1:0);
  const sky=mix(0x6a7fa0,0xbcd0dd,sun),ground=mix(0x2a2018,0x303426,sun);
  return {
    sun,night:1-sun,
    skyColor:golden>0?mix(sky,0xffb070,golden*.5):sky,groundColor:ground,
    ambient:.55+sun*.75,
    fillColor:golden>0?mix(mix(0x9fb4d8,0xfff1dc,sun),0xffa060,golden*.6):mix(0x9fb4d8,0xfff1dc,sun),
    fill:.28+sun*.8,
    background:mix(0x0d1418,0x2a3b44,sun),
    fogDensity:.012+(1-sun)*.03,
  };
}
