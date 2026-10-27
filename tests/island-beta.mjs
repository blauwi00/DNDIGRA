import assert from 'node:assert/strict';
import {readFileSync,existsSync,statSync} from 'node:fs';

// The island mode ships inside the app: its page must load three.js locally (offline,
// native shell) and keep its own save key, and the title menu must reach it.
const page=readFileSync('dist/island/index.html','utf8');
assert.ok(!page.includes('cdnjs.cloudflare.com'),'island page must not load three.js from a CDN');
assert.ok(page.includes('src="three.min.js"'),'island page loads the bundled three.js');
assert.ok(existsSync('dist/island/three.min.js')&&statSync('dist/island/three.min.js').size>500000,'bundled three.js is present');
assert.ok(page.includes('window.ISLAND_IN_APP=true'),'in-app flag set so the island offers a way back');
assert.ok(page.includes("'helga-island-beta-1'"),'island keeps its own save key');
assert.ok(!page.includes('beyond-voxel-dnd-1'),'island never touches the campaign save key');
const menu=readFileSync('dist/cinematic-menu.js','utf8');
assert.ok(menu.includes("location.href='island/index.html'"),'new game offers the island');
assert.ok(menu.includes("button('Новая игра',newGame"),'title still has a single new game button');
console.log('island beta packaging ok');
