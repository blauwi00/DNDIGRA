import assert from 'node:assert/strict';
import {existsSync} from 'node:fs';
assert.ok(existsSync(new URL('../src/caravan-timeline.js',import.meta.url)),'The caravan needs a deterministic cinematic timeline');
const {duration,frame}=await import('../src/caravan-timeline.js');
for(const name of ['road','crash','wake']){
 assert.ok(duration(name)>0&&duration(name)<15000);
 for(let t=0;t<=duration(name)+1000;t+=100){
  const f=frame(name,t);assert.ok(f.black>=0&&f.black<=1);assert.ok(Number.isFinite(f.progress));
  assert.ok(f.caption&&f.title);assert.equal(f.done,t>=duration(name));
 }
 assert.equal(frame(name,-100).progress,0);assert.equal(frame(name,1e9).progress,1);
}
assert.ok(frame('crash',duration('crash')-100).black>.95,'Knockout ends in darkness');
assert.equal(frame('wake',duration('wake')).black,0,'Wake returns an unobscured playable view');
assert.equal(frame('crash',0).cartRoll,0);assert.equal(frame('crash',4000).cartRoll,1);assert.ok(frame('crash',2800).cartRoll>0&&frame('crash',2800).cartRoll<1);
assert.throws(()=>frame('unknown',0));
console.log('PASS cinematic timing, captions, bounded darkness and completed recovery');
