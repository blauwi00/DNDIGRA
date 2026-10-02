import {build} from 'esbuild';import {mkdir,cp,readdir,rm} from 'node:fs/promises';
await build({entryPoints:['src/voxel.js'],bundle:true,minify:true,format:'iife',outfile:'dist/voxel.js'});
await build({entryPoints:['src/inventory-rules.js'],bundle:true,format:'iife',globalName:'InventoryRules',outfile:'dist/inventory-rules.js'});
await build({entryPoints:['src/hero-rules.js'],bundle:true,format:'iife',globalName:'HeroRules',outfile:'dist/hero-rules.js'});
await rm('dist/client',{recursive:true,force:true});await mkdir('dist/client',{recursive:true});
for(const f of await readdir('dist'))if(!['client','server','.openai','_appgen_meta'].includes(f))await cp('dist/'+f,'dist/client/'+f,{recursive:true});
await mkdir('dist/server',{recursive:true});await build({entryPoints:['src/server.js'],bundle:true,format:'esm',outfile:'dist/server/index.js'});
