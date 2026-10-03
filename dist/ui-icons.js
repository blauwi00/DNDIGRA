(() => {'use strict';
const paths={
check:'<path d="m11 25 9 9 19-19" fill="none" stroke="#fff5db" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>',
up:'<path d="M10 29 25 13 40 29H32V46H18V29Z" fill="url(#gold)"/>',left:'<path d="M32 8 14 26 32 44 39 37 28 26 39 15Z" fill="url(#gold)"/>',right:'<path d="M18 8 36 26 18 44 11 37 22 26 11 15Z" fill="url(#gold)"/>',rotate:'<path d="M9 29a17 17 0 1 1 9 13M7 18v13h13" stroke="#f0ce82" stroke-width="5"/>',armor:'<path d="m10 8 10-3 5 8 5-8 10 3 6 15-9 5v19H13V28l-9-5Z" fill="url(#steel)"/>',drop:'<path d="M8 32h34v13H8ZM17 6h16v14h8L25 32 9 20h8Z" fill="url(#gold)"/>',transfer:'<path d="M5 15h30V8l12 14-12 13v-8H5Z" fill="url(#gold)"/>',sword:'<path d="m8 38 5 5 22-24 5-13-13 5Z" fill="url(#steel)"/><path d="m27 15 5 4M10 34l11 10M8 42l-4 5 4 3 6-6"/>',
shield:'<path d="M25 5 7 12v16c0 12 18 20 18 20s18-8 18-20V12Z" fill="url(#steel)"/><path d="M25 11 13 16v11c0 8 12 15 12 15Z" fill="#75818a"/><path d="M25 11v31"/>',
map:'<path d="m4 11 14-5 15 6 13-5v35l-13 5-15-6-14 5Z" fill="url(#gold)"/><path d="M18 6v35m15-29v35M8 22l6-4m8 9 7 3m8-10 5-2"/>',
hero:'<path d="M10 28V18C10 2 40 2 40 18v10l-8 7-3 13h-8l-3-13Z" fill="url(#gold)"/><path d="m15 21 8 4-2 7-6-4Zm20 0-8 4 2 7 6-4Z" fill="#15211f"/><path d="M25 7v30"/>',
bag:'<path d="M17 12V9c0-7 16-7 16 0v3M10 16h30l4 29H6Z" fill="url(#gold)"/><path d="M10 16v13c0 6 30 6 30 0V16M22 27h6v10h-6Zm-12 9v7m30-7v7"/>',
dice:'<path d="M25 3 46 15v24L25 50 4 39V15Z" fill="url(#gold)"/><path d="m25 3-13 31h26Zm-21 12 34 19 8 5M46 15 12 34 4 39M12 34l13 16 13-16M4 15h42"/>',
potion:'<path d="M20 4h10v14l10 14c10 22-40 22-30 0l10-14Z" fill="url(#steel)"/><path d="M13 33h24c5 16-29 16-24 0Z" fill="#a82d4a"/><path d="M19 4h12v6H19Z" fill="#b08952"/><path d="m18 27-3 9" stroke="#ffe4d0"/>',
chat:'<path d="M6 8h38v28H24L13 46V36H6Z" fill="url(#gold)"/><circle cx="15" cy="22" r="2"/><circle cx="25" cy="22" r="2"/><circle cx="35" cy="22" r="2"/>',
steps:'<path d="m10 8 8-4 7 14-9 5Zm7 19 10-4 6 13-11 8Z" fill="url(#gold)"/><path d="m31 10 8 1 2 12-9 1Z" fill="#af9d64"/>',
book:'<path d="M25 12C19 6 9 5 4 7v34c10-2 17 0 21 5 4-5 11-7 21-5V7c-5-2-15-1-21 5Z" fill="url(#gold)"/><path d="M25 12v34M9 14l10 3m-10 6 10 3m12-9 10-3m-10 12 10-3"/>',
more:'<circle cx="10" cy="25" r="4" fill="url(#gold)"/><circle cx="25" cy="25" r="4" fill="url(#gold)"/><circle cx="40" cy="25" r="4" fill="url(#gold)"/>',
hourglass:'<path d="M10 5h30M10 45h30M14 6c0 14 11 12 11 19s-11 5-11 19h22c0-14-11-12-11-19s11-5 11-19Z" fill="url(#gold)"/><path d="m19 34 6-5 6 5Z" fill="#f3df9f"/>',
torch:'<path d="M23 24h5v23h-5Z" fill="#9b673d"/><path d="M17 25h17l-3-10H20Z" fill="url(#gold)"/><path d="M25 3c6 7 10 10 7 16-4 7-15 2-13-5Z" fill="#efa64a"/>',
bow:'<path d="M9 5c44 7 44 33 0 40L34 25Z" fill="#956032"/><path d="M9 5v40M8 25h36m-6-5 7 5-7 5"/>',
staff:'<path d="m12 47 20-32" stroke="#a77f46" stroke-width="5"/><path d="m34 2 9 10-11 9-7-11Z" fill="#6faed2"/>',
hand:'<path d="M13 29V16c0-5 6-5 6 0v9-15c0-5 6-5 6 0v14-12c0-5 6-5 6 0v15-9c0-4 6-4 6 0v14c0 13-21 18-26 5L5 28c-2-5 3-8 6-4Z" fill="url(#gold)"/>',
center:'<circle cx="25" cy="25" r="14"/><circle cx="25" cy="25" r="5" fill="url(#gold)"/><path d="M25 3v9m0 26v9M3 25h9m26 0h9"/>',
fit:'<path d="M6 19V6h13m12 0h13v13M6 31v13h13m12 0h13V31"/>',
plus:'<path d="M25 10v30M10 25h30"/>',minus:'<path d="M10 25h30"/>',close:'<path d="m13 13 24 24m0-24L13 37"/>',menu:'<path d="M8 13h34M8 25h34M8 37h34"/>'};
function svg(name){return '<svg class="ui-icon" viewBox="0 0 50 52" aria-hidden="true" focusable="false"><defs><linearGradient id="gold" x2=".8" y2="1"><stop stop-color="#ffe6a1"/><stop offset=".5" stop-color="#cda04e"/><stop offset="1" stop-color="#84602d"/></linearGradient><linearGradient id="steel" x2=".7" y2="1"><stop stop-color="#e7e9dd"/><stop offset=".5" stop-color="#9ba6ab"/><stop offset="1" stop-color="#546473"/></linearGradient></defs><g stroke="#5f482c" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round" fill="none">'+(paths[name]||paths.more)+'</g></svg>';}
function node(name){const span=document.createElement('span');span.className='icon-holder';span.innerHTML=window.UIIcons.svg(name);return span;}
function apply(el,name){if(!el)return;let holder=el.querySelector(':scope > .icon-holder');if(!holder){holder=node(name);el.prepend(holder);}else holder.innerHTML=window.UIIcons.svg(name);}
window.UIIcons={svg,node,apply};})();
