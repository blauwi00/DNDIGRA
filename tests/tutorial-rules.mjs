import assert from 'node:assert/strict';
import test from 'node:test';
let rules = {};
try { rules = await import('../src/tutorial-rules.js'); } catch (error) { if (error.code !== 'ERR_MODULE_NOT_FOUND') throw error; }
const { createTutorial, reduceTutorial, validateTutorial, tutorialRequirements, tutorialProfileKey } = rules;
const action = (type, detail = {}) => ({ type, success: true, ...detail });
const flow = classId => [action('selection', {kind:'tile'}), action('movement'), action('camera', {action:'center'}), action('camera', {action:'zoom'}), action('interaction'), action('loot'), action('tab',{tab:'hero'}), action('tab',{tab:'bag'}), action('equipment'), action('journal'), action('actions'), action('ability',{id:({fighter:'secondWind',wizard:'magearmor',rogue:'dash',cleric:'cure'})[classId]}), action('defense',{id:'dodge'}), action('turn'), action('potion'), action('attack'), action('victory',{encounterId:'tutorial-win'}), action('turn',{encounterId:'tutorial-loss'}), action('unconscious',{encounterId:'tutorial-loss'}), action('rescue',{encounterId:'tutorial-loss'})];
test('exports the pure tutorial state API', () => { assert.equal(typeof createTutorial, 'function'); assert.equal(typeof reduceTutorial, 'function'); assert.equal(typeof validateTutorial, 'function'); assert.equal(typeof tutorialRequirements, 'function'); });
test('first tutorial cannot skip and practice cannot become a skipped completion', () => { assert.equal(createTutorial({skip:true}).completed,false); assert.equal(createTutorial({skip:true,canSkip:true,mode:'practice'}).completed,false); const later=createTutorial({skip:true,canSkip:true});assert.equal(later.completed,true);assert.equal(later.skipped,true);assert.equal(validateTutorial(later,later),true); });
for (const classId of ['fighter','wizard','rogue','cleric']) test(`${classId} completes only after actual actions, one victory and rescue`, () => { let state=createTutorial({classId});for(const [i,event] of flow(classId).entries()){const next=reduceTutorial(state,event);assert.equal(next.step,i+1);assert.equal(validateTutorial(next,state),true);state=next;}assert.equal(state.completed,true);assert.equal(state.phase,'complete');assert.equal(state.checks['victory'],true);assert.equal(state.checks['unconscious'],true);assert.equal(state.checks['rescue'],true); });
test('failed actions and events out of order do not satisfy a prompt', () => { const state=createTutorial({classId:'wizard'});for(const event of [action('attack'),action('selection',{kind:'prop'}),action('selection',{kind:'tile',success:false}),action('rescue',{encounterId:'tutorial-loss'}),{type:'complete'}])assert.deepEqual(reduceTutorial(state,event),state); });
test('duplicate event IDs and reloading cannot jump a checkpoint', () => { let state=createTutorial({});state=reduceTutorial(state,action('selection',{kind:'tile',eventId:'click-1'}));const restored=JSON.parse(JSON.stringify(state));assert.deepEqual(reduceTutorial(restored,action('movement',{eventId:'click-1'})),restored);const moved=reduceTutorial(restored,action('movement',{eventId:'click-2'}));assert.equal(moved.step,2);assert.equal(restored.step,1);assert.equal(validateTutorial(moved,restored),true); });
test('both center and scale camera actions are required separately', () => { let state=createTutorial({});for(const e of flow('fighter').slice(0,2))state=reduceTutorial(state,e);assert.deepEqual(reduceTutorial(state,action('camera',{action:'fit'})),state);state=reduceTutorial(state,action('camera',{action:'center'}));state=reduceTutorial(state,action('camera',{action:'fit'}));assert.equal(state.step,4); });
test('ambush cannot finish before victory and survives unconscious save/reload', () => { let state=createTutorial({classId:'cleric'});for(const e of flow('cleric').slice(0,17))state=reduceTutorial(state,e);assert.equal(state.phase,'ambush');assert.deepEqual(reduceTutorial(state,action('unconscious',{encounterId:'tutorial-loss'})),state);state=reduceTutorial(state,flow('cleric')[17]);assert.equal(state.phase,'loss');state=reduceTutorial(state,flow('cleric')[18]);assert.equal(state.phase,'rescue');assert.equal(state.completed,false);const restored=JSON.parse(JSON.stringify(state));assert.equal(reduceTutorial(restored,flow('cleric')[19]).completed,true); });
test('validator rejects forged skip, completion, rollback, class and mode changes', () => { const state=createTutorial({classId:'rogue'}),selected=reduceTutorial(state,flow('rogue')[0]);for(const invalid of [{...state,skipped:true,completed:true},{...state,completed:true},{...selected,checks:{}},{...selected,step:20,phase:'complete',completed:true},{...selected,classId:'wizard'},{...selected,mode:'practice'},{...selected,phase:'rescue'},{...selected,unknown:true},null])assert.equal(validateTutorial(invalid,state),false);assert.equal(validateTutorial(state,selected),false); });
test('practice completion stays isolated in its original mode', () => { let state=createTutorial({classId:'fighter',mode:'practice'});for(const e of flow('fighter'))state=reduceTutorial(state,e);assert.equal(state.completed,true);assert.equal(state.mode,'practice');assert.equal(validateTutorial(state,state),true); });

test('local completion marker cannot enable server skip on the same origin', () => { assert.equal(typeof tutorialProfileKey,'function'); assert.equal(tutorialProfileKey(false),'dndigra.tutorial.completed.v1'); assert.equal(tutorialProfileKey(true),'dndigra-local-dndigra.tutorial.completed.v1'); assert.notEqual(tutorialProfileKey(true),tutorialProfileKey(false)); });

// Exercise the runtime's toolbar listener with browser callback checkpoints.
// The rest of the page is absent: this checks its public event ordering.
test('camera completion is emitted after the camera toolbar action succeeds', async () => {
  const {readFileSync}=await import('node:fs'),{default:vm}=await import('node:vm');
  const callbacks=[],zoom={disabled:false,addEventListener:(type,callback)=>callbacks.push(callback)},windowEvents=new EventTarget();
  let zoomValue=0,observed;
  const env={document:{getElementById:id=>id==='zoom-in'?zoom:null},camera:{},CustomEvent,queueMicrotask,setTimeout,addEventListener:windowEvents.addEventListener.bind(windowEvents),dispatchEvent:windowEvents.dispatchEvent.bind(windowEvents)};env.window=env;
  vm.runInNewContext(readFileSync(new URL('../dist/tutorial.js',import.meta.url),'utf8'),env);
  windowEvents.addEventListener('game-action',event=>{if(event.detail.type==='camera')observed=zoomValue;});
  // Trusted DOM dispatch can perform a microtask checkpoint after each callback.
  // A plain EventTarget.dispatchEvent hides this ordering bug in synthetic tests.
  callbacks.push(()=>{zoomValue=1;});
  for(const callback of callbacks){callback({currentTarget:zoom});await Promise.resolve();}
  await new Promise(resolve=>setTimeout(resolve,0));
  assert.equal(observed,1,'Actual camera update precedes completion event');
});
