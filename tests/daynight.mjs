import test from 'node:test';
import assert from 'node:assert/strict';
import {advanceClock,clockParts,sunlight,outdoorLight,DAY_MINUTES,REAL_SECONDS_PER_DAY,START_MINUTE} from '../src/daynight.js';

test('a full day takes the configured real time and a new save starts in the morning',()=>{
  assert.equal(advanceClock(undefined,0),START_MINUTE);
  let t=0;for(let i=0;i<REAL_SECONDS_PER_DAY*10;i++)t=advanceClock(t,.1);
  assert.ok(Math.abs(t-DAY_MINUTES)<1e-6);
  assert.deepEqual(clockParts(DAY_MINUTES),{day:2,hour:0,minute:0,label:'00:00'});
});
test('long frames cannot skip large stretches of time',()=>{
  assert.ok(advanceClock(600,3600)-600<1);
  assert.equal(advanceClock(600,-5),600);
});
test('sunlight is dark at night, full at noon, gradual at dawn and dusk',()=>{
  assert.equal(sunlight(2*60),0);assert.equal(sunlight(12*60),1);assert.equal(sunlight(23*60),0);
  const dawn=sunlight(6*60),dusk=sunlight(20*60);assert.ok(dawn>0&&dawn<1);assert.ok(dusk>0&&dusk<1);
  assert.equal(sunlight(DAY_MINUTES*3+12*60),1,'later days repeat the cycle');
});
test('night lighting is dimmer and foggier than day',()=>{
  const day=outdoorLight(12*60),night=outdoorLight(0);
  assert.ok(night.ambient<day.ambient&&night.fill<day.fill&&night.fogDensity>day.fogDensity);
  assert.equal(night.night,1);assert.equal(day.night,0);
});
