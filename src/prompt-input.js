/** A popup action needs its own press, even when it appears under a map touch. */
export function bindPromptInput(root,element,context){
  let press=null;
  const clear=()=>{press=null;};
  root.addEventListener('pointerdown',clear,true);
  element.addEventListener('pointerdown',event=>{
    const button=event.target.closest('button[data-action]');
    press=button?{button,context:context()}:null;
    event.stopPropagation();
  });
  element.addEventListener('pointercancel',clear);
  return{clear,accept(event,button){
    const allowed=event.detail===0||!!press&&press.button===button&&press.context===context();
    clear();return allowed;
  }};
}
