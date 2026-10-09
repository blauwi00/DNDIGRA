import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';

// Browser/device checks are explicit separate commands; these suites exercise
// deterministic generation, rules, persistence and Worker ownership contracts.
const suites=[
  'character-style','characters','preview-frame','inventory-rules','silhouette',
  'npc-facing','static-batches','texel-overlap','location-generator',
  'worldgen-versions','worldgen','heroes-api','worlds-api','worlds-client','worldgen-api',
  'adventure-worldgen','adventure-api','adventure-client','tutorial-rules',
  'region-streaming','region-resources','region-renderer','region-walk','worlds-practice','local-api','enemy-models','prompt-input'
];
const cwd=fileURLToPath(new URL('..',import.meta.url));
let failed=0;
for(const name of suites){
  const result=spawnSync(process.execPath,['tests/'+name+'.mjs'],{cwd,encoding:'utf8',maxBuffer:4*1024*1024});
  if(result.status===0)console.log('PASS '+name);
  else{failed++;console.error('FAIL '+name+'\n'+(result.stdout||'')+(result.stderr||'')+(result.error||''));}
}
console.log(`${suites.length-failed}/${suites.length} logic/API suites passed`);
process.exitCode=failed?1:0;
