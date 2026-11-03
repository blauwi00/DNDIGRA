// Linux checks for helper command wiring and IPA packaging; Xcode is a fixture.
// These checks do not compile Swift, sign an app or test WKWebView/SideStore.
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'node:test';

const helper = fileURLToPath(new URL('./ios-unsigned-build.sh', import.meta.url));

function fixture(t) {
  assert(existsSync(helper), 'The unsigned iOS build helper must exist');
  const temporary = mkdtempSync(path.join(os.tmpdir(), 'dndigra-ios-helper-test-'));
  t.after(() => rmSync(temporary, {recursive: true, force: true}));
  const root = path.join(temporary, 'source checkout'), commands = path.join(temporary, 'commands');
  for (const dir of ['scripts', 'dist/client/assets', 'ios/App/App/public/assets', 'ios/App/App.xcodeproj']) mkdirSync(path.join(root, dir), {recursive: true});
  mkdirSync(commands);
  cpSync(helper, path.join(root, 'scripts/ios-unsigned-build.sh'));
  const config = JSON.stringify({appId: 'com.dndigra.game', webDir: 'dist/client'});
  writeFileSync(path.join(root, 'capacitor.config.json'), config);
  writeFileSync(path.join(root, 'ios/App/App/capacitor.config.json'), config);
  writeFileSync(path.join(root, 'ios/App/App.xcodeproj/project.pbxproj'), 'fixture');
  for (const directory of ['dist/client', 'ios/App/App/public']) {
    writeFileSync(path.join(root, directory, 'index.html'), '<html>existing game</html>');
    writeFileSync(path.join(root, directory, 'assets/hero.png'), 'preserved hero');
  }
  const command = (name, content) => writeFileSync(path.join(commands, name), content, {mode: 0o755});
  command('uname', '#!/bin/sh\nprintf "Darwin\\n"\n');
  command('xcodebuild', `#!/bin/bash
if [[ "$1" == "-version" ]]; then printf 'Xcode 26.3\\nBuild version fixture\\n'; exit 0; fi
printf '%s\\n' "$@" > "$FIXTURE_COMMAND_LOG"
if [[ "\${FIXTURE_BUILD_FAIL:-0}" == "1" ]]; then exit 9; fi
while [[ "$#" -gt 0 ]]; do
  if [[ "$1" == "-derivedDataPath" ]]; then derived="$2"; shift; fi
  shift
done
app="$derived/Build/Products/Release-iphoneos/App.app"
mkdir -p "$app/public"
cp -R "$FIXTURE_ROOT/ios/App/App/public/." "$app/public/"
printf 'fixture executable' > "$app/App"
printf 'fixture plist' > "$app/Info.plist"
`);
  command('ditto', `#!/usr/bin/env python3
import pathlib, shutil, sys, zipfile
if '-c' not in sys.argv:
    shutil.copytree(sys.argv[1], sys.argv[2])
else:
    source, target = pathlib.Path(sys.argv[-2]), pathlib.Path(sys.argv[-1])
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as archive:
        for entry in source.rglob('*'):
            if entry.is_file(): archive.write(entry, entry.relative_to(source.parent))
`);
  const output = path.join(temporary, 'Artifacts with spaces', 'Current game.ipa');
  const log = path.join(temporary, 'xcode-command.txt');
  const env = {...process.env, PATH: commands + path.delimiter + process.env.PATH, FIXTURE_ROOT: root, FIXTURE_COMMAND_LOG: log};
  return {root, output, log, env, run: extra => spawnSync('bash', [path.join(root, 'scripts/ios-unsigned-build.sh'), output], {env: {...env, ...extra}, encoding: 'utf8'})};
}

test('packages a device .app under Payload and requests unsigned iphoneos compilation', t => {
  const f = fixture(t), result = f.run();
  assert.equal(result.status, 0, result.stderr);
  const args = readFileSync(f.log, 'utf8').trim().split('\n');
  for (const value of ['-project', '-scheme', 'App', '-sdk', 'iphoneos', '-configuration', 'Release', 'generic/platform=iOS', 'CODE_SIGNING_ALLOWED=NO', 'CODE_SIGNING_REQUIRED=NO', 'CODE_SIGN_IDENTITY=']) assert(args.includes(value), value);
  assert(!args.includes('-allowProvisioningUpdates'), 'Build must not log into Apple or create profiles');
  const inspection = spawnSync('python3', ['-c', 'import sys,zipfile; z=zipfile.ZipFile(sys.argv[1]); print("\\n".join(z.namelist())); print(z.read("Payload/App.app/public/assets/hero.png").decode())', f.output], {encoding: 'utf8'});
  assert.equal(inspection.status, 0, inspection.stderr);
  assert.match(inspection.stdout, /Payload\/App\.app\/App/);
  assert.match(inspection.stdout, /Payload\/App\.app\/public\/index\.html/);
  assert.match(inspection.stdout, /preserved hero/);
  assert(!inspection.stdout.includes('source checkout'));
});

test('rejects stale copied game assets before calling Xcode', t => {
  const f = fixture(t);
  writeFileSync(path.join(f.root, 'ios/App/App/public/assets/hero.png'), 'stale hero');
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /stale|mismatch|Re-sync/i);
  assert(!existsSync(f.log));
  assert(!existsSync(f.output));
});

test('rejects a hosted native server without producing an IPA', t => {
  const f = fixture(t);
  writeFileSync(path.join(f.root, 'capacitor.config.json'), JSON.stringify({appId: 'com.dndigra.game', webDir: 'dist/client', server: {url: 'https://remote.test'}}));
  const result = f.run();
  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /local|server|bundled/i);
  assert(!existsSync(f.log));
  assert(!existsSync(f.output));
});

test('does not package a failed Xcode build', t => {
  const f = fixture(t), result = f.run({FIXTURE_BUILD_FAIL: '1'});
  assert.notEqual(result.status, 0);
  assert(!existsSync(f.output));
});
