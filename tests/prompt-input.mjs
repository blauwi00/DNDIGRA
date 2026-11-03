import test from 'node:test';
import assert from 'node:assert/strict';
import {bindPromptInput} from '../src/prompt-input.js';

function fixture(){
  const root=new EventTarget(),element=new EventTarget();let context='world:glade:cache';
  const guard=bindPromptInput(root,element,()=>context),button={closest(){return this}};
  const down=target=>{const event=new Event('pointerdown');Object.defineProperty(event,'target',{value:target});root.dispatchEvent(event);if(target?.closest)element.dispatchEvent(event);};
  return{guard,root,element,button,down,context(value){context=value}};
}
test('map press cannot activate a popup created under the same finger',()=>{
  const f=fixture();f.down({});assert.equal(f.guard.accept({detail:1},f.button),false);
});
test('a dedicated action press activates exactly once',()=>{
  const f=fixture();f.down(f.button);assert.equal(f.guard.accept({detail:1},f.button),true);assert.equal(f.guard.accept({detail:1},f.button),false);
});
test('another pointer gesture clears a cancelled or released action press',()=>{
  const f=fixture();f.down(f.button);f.down({});assert.equal(f.guard.accept({detail:1},f.button),false);
});
test('rebuilt buttons and a restored scene cannot inherit an old press',()=>{
  const f=fixture();f.down(f.button);assert.equal(f.guard.accept({detail:1},{closest(){return this}}),false);
  f.down(f.button);f.context('world:road:cache');assert.equal(f.guard.accept({detail:1},f.button),false);
});
test('hiding the popup or cancelling the pointer invalidates the press',()=>{
  const f=fixture();f.down(f.button);f.guard.clear();assert.equal(f.guard.accept({detail:1},f.button),false);
  f.down(f.button);f.element.dispatchEvent(new Event('pointercancel'));assert.equal(f.guard.accept({detail:1},f.button),false);
});
test('keyboard and assistive activation remain available without a pointer',()=>{
  const f=fixture();assert.equal(f.guard.accept({detail:0},f.button),true);
});
