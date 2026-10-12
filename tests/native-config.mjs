import test from 'node:test';
import assert from 'node:assert/strict';
import {chmodSync, copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import os from 'node:os';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));

test('native packages preserve the local app identity and matched Capacitor release', () => {
  const config = json('capacitor.config.json');
  const pkg = json('package.json');
  const lock = json('package-lock.json');
  assert.equal(config.appId, 'com.dndigra.game');
  assert.equal(config.webDir, 'dist/client');
  assert.equal(config.server, undefined, 'Do not change the existing native save origins or load a hosted game');
  for (const name of ['core', 'ios', 'android']) {
    assert.equal(pkg.dependencies['@capacitor/' + name], '8.5.3');
    assert.equal(lock.packages['node_modules/@capacitor/' + name].version, '8.5.3');
  }
  assert.equal(pkg.devDependencies['@capacitor/cli'], '8.5.3');
});

test('iPhone and iPad both allow only the two landscape orientations', () => {
  const plist = read('ios/App/App/Info.plist');
  assert(/<key>UIRequiresFullScreen<\/key>\s*<true\s*\/>/.test(plist), 'Landscape-only iPad runs full screen');
  for (const key of ['UISupportedInterfaceOrientations', 'UISupportedInterfaceOrientations~ipad']) {
    const values = plist.match(new RegExp('<key>' + key + '</key>\\s*<array>([\\s\\S]*?)</array>'))?.[1];
    assert(values, 'Missing orientation array: ' + key);
    const orientations = [...values.matchAll(/<string>([^<]+)<\/string>/g)].map(match => match[1]);
    assert.deepEqual(orientations.sort(), ['UIInterfaceOrientationLandscapeLeft', 'UIInterfaceOrientationLandscapeRight']);
  }
  const project = read('ios/App/App.xcodeproj/project.pbxproj');
  assert(project.includes('PRODUCT_BUNDLE_IDENTIFIER = com.dndigra.game'));
  const targets = [...project.matchAll(/IPHONEOS_DEPLOYMENT_TARGET = ([\d.]+);/g)].map(match => match[1]);
  assert(targets.length >= 2 && targets.every(version => version === '15.4'));
});

test('Android preflight rejects an absent SDK before generating build files', () => {
  const env = {...process.env};
  delete env.ANDROID_HOME;
  delete env.ANDROID_SDK_ROOT;
  const result = spawnSync(process.execPath, ['scripts/android-build.mjs', '--check'], {cwd: root, env, encoding: 'utf8'});
  assert.equal(result.status, 1);
  assert(result.stderr.includes('Set ANDROID_HOME (or ANDROID_SDK_ROOT)'));
});

test('Android preflight rejects a Java21 runtime that has no compiler', {skip: process.platform === 'win32'}, () => {
  const temporary = mkdtempSync(path.join(os.tmpdir(), 'dndigra-jre-check-'));
  try {
    const project = path.join(temporary, 'project');
    const sdk = path.join(temporary, 'sdk');
    const jre = path.join(temporary, 'jre');
    mkdirSync(path.join(project, 'scripts'), {recursive: true});
    copyFileSync(path.join(root, 'scripts/android-build.mjs'), path.join(project, 'scripts/android-build.mjs'));
    mkdirSync(path.join(jre, 'bin'), {recursive: true});
    const java = path.join(jre, 'bin/java');
    writeFileSync(java, '#!/bin/sh\nprintf \'openjdk version "21.0.0"\\n\' >&2\n');
    chmodSync(java, 0o755);
    // Marker files satisfy SDK presence checks; no SDK tools or build run.
    for (const file of ['platforms/android-36/android.jar', 'build-tools/36.0.0/apksigner', 'build-tools/36.0.0/aapt']) {
      mkdirSync(path.dirname(path.join(sdk, file)), {recursive: true});
      writeFileSync(path.join(sdk, file), 'fixture');
    }
    const env = {...process.env, JAVA_HOME: jre, ANDROID_HOME: sdk, ANDROID_SDK_ROOT: sdk};
    const result = spawnSync(process.execPath, ['scripts/android-build.mjs', '--check'], {cwd: project, env, encoding: 'utf8'});
    assert.equal(result.status, 1);
    assert(result.stderr.includes('JDK21 compiler'), 'A Java21 JRE must fail before assets/Gradle: ' + result.stderr);
  } finally {
    rmSync(temporary, {recursive: true, force: true});
  }
});

test('Android launches the same installed game in landscape on phones and tablets', () => {
  assert(existsSync(path.join(root, 'android/app/src/main/AndroidManifest.xml')), 'Android scaffold is required');
  const manifest = read('android/app/src/main/AndroidManifest.xml');
  assert(manifest.includes('android:appCategory="game"'), 'Android16 large-screen games retain their orientation restrictions');
  const activity = manifest.match(/<activity\b[\s\S]*?>/)?.[0];
  assert(activity?.includes('android:screenOrientation="sensorLandscape"'), 'Use both landscape directions without portrait');
  assert(activity.includes('android:exported="true"'));
  assert(manifest.includes('android.intent.category.LAUNCHER'));
  assert(!manifest.includes('android.permission.WRITE_EXTERNAL_STORAGE'), 'Saves stay in app-local IndexedDB');
  const gradle = read('android/app/build.gradle');
  assert(/applicationId\s+["']com\.dndigra\.game["']/.test(gradle));
  assert(/namespace\s*=\s*["']com\.dndigra\.game["']/.test(gradle));
  const variables = read('android/variables.gradle');
  assert(variables.includes('compileSdkVersion = 36'));
  assert(variables.includes('targetSdkVersion = 36'));
});
