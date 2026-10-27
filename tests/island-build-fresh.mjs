import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join,resolve} from 'node:path';

// The shipped island pages (in-app copy and the shared site) must be rebuilt from
// beta/island/src: a forgotten rebuild would publish stale code. The version label
// (change count and date) is the only part allowed to differ.
const root=resolve('.'),tmp=mkdtempSync(join(tmpdir(),'island-'));
try{
  const r=spawnSync('python3',['build.py'],{cwd:join(root,'beta/island/src'),encoding:'utf8',env:{...process.env,OUT:tmp,APP:join(tmp,'app'),SITE:join(tmp,'site')}});
  assert.equal(r.status,0,'island build failed\n'+r.stdout+r.stderr);
  const norm=s=>s.replace(/Бета 0\.\d+ · \d\d\.\d\d\.\d{4}/g,'Бета 0.N');
  for(const [built,shipped] of [[join(tmp,'app/index.html'),'dist/island/index.html'],[join(tmp,'site/index.html'),'site/island/index.html'],[join(tmp,'island.html'),'beta/island/island.html']])
    assert.ok(norm(readFileSync(built,'utf8'))===norm(readFileSync(shipped,'utf8')),shipped+' is stale: rebuild with OUT=.. APP=../../../dist/island SITE=../../../site/island python3 build.py');
  console.log('island builds are fresh');
}finally{rmSync(tmp,{recursive:true,force:true});}
