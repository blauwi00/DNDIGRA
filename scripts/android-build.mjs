// Build already-synced local game assets. This command never rebuilds web source.
import {spawnSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, realpathSync, statSync, writeFileSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = realpathSync(fileURLToPath(new URL('../', import.meta.url)));
const windows = process.platform === 'win32';
const checkOnly = process.argv.includes('--check');
const fail = message => { throw new Error(message); };
const json = file => JSON.parse(readFileSync(file, 'utf8'));
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');

function run(command, args, options = {}) {
  let executable = command;
  let argumentsList = args;
  const batch = windows && /\.(bat|cmd)$/i.test(command);
  if (batch) {
    // cmd.exe expands special characters even in quoted batch arguments.
    // Refuse those unusual paths; spaces remain supported without a shell.
    if ([command, ...args].some(value => /[\r\n"%&|<>^!]/.test(value))) fail('Windows SDK/work paths must not contain command-shell special characters.');
    executable = process.env.ComSpec || 'cmd.exe';
    argumentsList = ['/d', '/s', '/c', '"' + [command, ...args].map(value => '"' + value + '"').join(' ') + '"'];
  }
  const result = spawnSync(executable, argumentsList, {cwd: root, encoding: 'utf8', ...options,
    windowsVerbatimArguments: batch});
  if (result.error) fail(`Cannot run ${path.basename(command)}: ${result.error.message}`);
  if (result.status !== 0) {
    if (result.stdout) process.stderr.write(result.stdout);
    if (result.stderr) process.stderr.write(result.stderr);
    fail(`${path.basename(command)} failed with exit code ${result.status ?? 'unknown'}`);
  }
  return (result.stdout || '') + (result.stderr || '');
}

function externalPath(value, description) {
  const target = path.resolve(value);
  let existing = target;
  while (!existsSync(existing)) {
    const parent = path.dirname(existing);
    if (parent === existing) fail(`${description} has no accessible filesystem root.`);
    existing = parent;
  }
  const resolved = path.resolve(realpathSync(existing), path.relative(existing, target));
  if (resolved === root || resolved.startsWith(root + path.sep)) {
    fail(`${description} must be outside the source checkout (keeps caches, APKs and signing keys out of source ZIPs).`);
  }
  return resolved;
}

function files(directory, relative = '') {
  return readdirSync(path.join(directory, relative), {withFileTypes: true}).flatMap(entry => {
    const next = path.join(relative, entry.name);
    if (entry.isSymbolicLink()) fail(`Bundled assets must not be symlinks: ${next}`);
    return entry.isDirectory() ? files(directory, next) : [next];
  });
}

function verifyAssets() {
  const client = path.join(root, 'dist/client');
  const bundled = path.join(root, 'android/app/src/main/assets/public');
  if (!existsSync(path.join(client, 'index.html'))) fail('Missing dist/client/index.html. Run npm run build, then npx cap sync android before this command.');
  if (!existsSync(path.join(bundled, 'index.html'))) fail('Missing Android game assets. Run npx cap sync android after npm run build.');
  const clientFiles = files(client);
  if (clientFiles.length <= 50) fail('The bundled game is incomplete: expected the full existing game and assets.');
  for (const relative of clientFiles) {
    const copied = path.join(bundled, relative);
    if (!existsSync(copied) || hash(copied) !== hash(path.join(client, relative))) {
      fail(`Stale/missing native asset: ${relative}. Run npx cap sync android after the final web build; do not rebuild while browser tests are running.`);
    }
    if (/(^|[/\\])(qa|server|node_modules)([/\\]|$)/.test(relative)) fail(`Unexpected development files in game assets: ${relative}`);
  }
  for (const relative of files(bundled)) {
    if (!clientFiles.includes(relative) && !['capacitor.js', 'capacitor.js.map', 'cordova.js', 'cordova_plugins.js'].includes(relative)) {
      fail(`Unexpected stale file in Android assets: ${relative}. Re-run npx cap sync android.`);
    }
  }
  const config = json(path.join(root, 'capacitor.config.json'));
  const copiedConfig = json(path.join(root, 'android/app/src/main/assets/capacitor.config.json'));
  if (config.appId !== 'com.dndigra.game' || config.webDir !== 'dist/client' || config.server !== undefined) {
    fail('Keep com.dndigra.game, dist/client and the default local native save origin; hosted server config is not allowed.');
  }
  if (copiedConfig.appId !== config.appId || copiedConfig.server !== undefined) fail('Android Capacitor configuration is stale or loads a hosted game. Re-sync android.');
  return clientFiles.length;
}

function proxyOptions() {
  // Gradle/JVM do not automatically read HTTP(S)_PROXY. Preserve the inherited
  // environment and CA trust, and route their downloads through the same proxy.
  const options = [];
  for (const scheme of ['http', 'https']) {
    const value = process.env[scheme.toUpperCase() + '_PROXY'] || process.env[scheme + '_proxy'];
    if (!value) continue;
    const url = new URL(value);
    if (url.username || url.password) fail('Authenticated proxy needs an existing Gradle/JVM proxy configuration; credentials are not copied into command logs.');
    options.push(`-D${scheme}.proxyHost=${url.hostname}`, `-D${scheme}.proxyPort=${url.port || (url.protocol === 'https:' ? '443' : '80')}`);
  }
  return options.join(' ');
}

try {
  if (process.argv.slice(2).some(argument => argument !== '--check')) fail('Usage: node scripts/android-build.mjs [--check]');
  if (Number(process.versions.node.split('.')[0]) < 24) fail('Node.js 24 or newer is required by Capacitor 8.');
  const sdkValue = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT;
  if (!sdkValue) fail('Set ANDROID_HOME (or ANDROID_SDK_ROOT) to an installed Android SDK with platform 36 and build-tools 36.0.0.');
  if (process.env.ANDROID_HOME && process.env.ANDROID_SDK_ROOT && path.resolve(process.env.ANDROID_HOME) !== path.resolve(process.env.ANDROID_SDK_ROOT)) {
    fail('ANDROID_HOME and ANDROID_SDK_ROOT point to different SDKs; choose one consistent external SDK.');
  }
  const sdk = externalPath(sdkValue, 'Android SDK');
  const sdkTools = path.join(sdk, 'build-tools/36.0.0');
  const apksigner = path.join(sdkTools, windows ? 'apksigner.bat' : 'apksigner');
  const aapt = path.join(sdkTools, windows ? 'aapt.exe' : 'aapt');
  for (const file of [path.join(sdk, 'platforms/android-36/android.jar'), apksigner, aapt]) {
    if (!existsSync(file)) fail(`Incomplete Android SDK: missing ${file}. Install platforms;android-36 and build-tools;36.0.0.`);
  }
  const java = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', windows ? 'java.exe' : 'java') : 'java';
  const javaVersion = run(java, ['-version']).match(/version "(\d+)/)?.[1];
  if (javaVersion !== '21') fail(`Use JDK 21 for this reproducible Android build (found ${javaVersion || 'unknown'}). Set JAVA_HOME and PATH.`);
  const javac = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', windows ? 'javac.exe' : 'javac') : 'javac';
  let compilerVersion;
  try {
    compilerVersion = run(javac, ['-version']).match(/javac (\d+)/)?.[1];
  } catch (error) {
    fail(`JDK21 compiler is required (a Java runtime alone cannot build Android). Install a full JDK21 and set JAVA_HOME/PATH. ${error.message}`);
  }
  if (compilerVersion !== '21') fail(`JDK21 compiler is required (found javac ${compilerVersion || 'unknown'}). Set JAVA_HOME/PATH to the full JDK21.`);
  const workdir = externalPath(process.env.DNDIGRA_NATIVE_WORKDIR || path.join(os.tmpdir(), 'dndigra-native-work'), 'DNDIGRA_NATIVE_WORKDIR');
  const outputDir = externalPath(process.env.DNDIGRA_APK_OUTPUT_DIR || path.join(workdir, 'artifacts'), 'DNDIGRA_APK_OUTPUT_DIR');
  const keystore = externalPath(process.env.DNDIGRA_DEBUG_KEYSTORE || path.join(workdir, 'keys/android-debug.keystore'), 'DNDIGRA_DEBUG_KEYSTORE');
  const gradleCache = externalPath(process.env.GRADLE_USER_HOME || path.join(workdir, 'gradle'), 'GRADLE_USER_HOME');
  const buildDir = path.join(workdir, 'build');
  const copiedFiles = verifyAssets();
  run(process.execPath, ['--test', 'tests/native-config.mjs'], {stdio: 'inherit'});
  console.log(`Native preflight passed: Java21+javac21, SDK36, ${copiedFiles} byte-matched local game files, landscape, unchanged app/save identity.`);
  if (!checkOnly) {
    for (const directory of [workdir, outputDir, path.dirname(keystore), gradleCache, buildDir]) mkdirSync(directory, {recursive: true});
    const keytool = process.env.JAVA_HOME ? path.join(process.env.JAVA_HOME, 'bin', windows ? 'keytool.exe' : 'keytool') : 'keytool';
    if (!existsSync(keystore)) run(keytool, ['-genkeypair', '-keystore', keystore, '-storepass', 'android', '-keypass', 'android',
      '-alias', 'androiddebugkey', '-dname', 'CN=Android Debug,O=Android,C=US', '-keyalg', 'RSA', '-keysize', '2048', '-validity', '10000']);
    run(keytool, ['-list', '-keystore', keystore, '-storepass', 'android', '-alias', 'androiddebugkey']);
    const environment = {...process.env, ANDROID_HOME: sdk, ANDROID_SDK_ROOT: sdk, GRADLE_USER_HOME: gradleCache,
      GRADLE_OPTS: [process.env.GRADLE_OPTS, proxyOptions()].filter(Boolean).join(' ')};
    run(path.join(root, 'android', windows ? 'gradlew.bat' : 'gradlew'), ['--no-daemon', '--console=plain', '--max-workers=2',
      `--project-cache-dir=${path.join(workdir, 'project-cache')}`, `-PdndigraBuildDir=${buildDir}`, `-PdndigraDebugKeystore=${keystore}`, 'assembleDebug'],
      {cwd: path.join(root, 'android'), env: environment, stdio: 'inherit'});
    const built = path.join(buildDir, 'app/outputs/apk/debug/app-debug.apk');
    if (!existsSync(built) || statSync(built).size < 1000000) fail('Gradle did not produce a complete game APK.');
    const signature = run(apksigner, ['verify', '--verbose', '--print-certs', built]);
    const manifest = run(aapt, ['dump', 'badging', built]);
    if (!manifest.includes("package: name='com.dndigra.game'")) fail('APK application ID differs from the existing game.');
    const manifestTree = run(aapt, ['dump', 'xmltree', built, 'AndroidManifest.xml']);
    if (!/android:screenOrientation[^\n]*\(type 0x10\)0x0*6\b/.test(manifestTree)) fail('Compiled APK did not retain sensorLandscape orientation.');
    if (!/android:appCategory[^\n]*\(type 0x10\)0x0+\b/.test(manifestTree)) fail('Compiled APK must remain a game so Android16 tablets honor landscape.');
    const packagedFiles = new Set(run(aapt, ['list', built]).split(/\r?\n/));
    for (const relative of files(path.join(root, 'dist/client'))) {
      if (!packagedFiles.has('assets/public/' + relative.split(path.sep).join('/'))) fail(`Game file missing from APK: ${relative}`);
    }
    const output = path.join(outputDir, 'dndigra-debug.apk');
    copyFileSync(built, output);
    const checksum = hash(output);
    writeFileSync(output + '.sha256', checksum + '  dndigra-debug.apk\n');
    writeFileSync(path.join(outputDir, 'android-verification.txt'),
      `Debug APK; physical device was not tested.\nSHA-256: ${checksum}\nBundled game files: ${copiedFiles}\n\n${signature}\n${manifest}\n${manifestTree}`);
    console.log(`Verified debug APK: ${output}\nSHA-256: ${checksum}\nKeystore retained externally; physical Android/iPhone was not tested.`);
  }
} catch (error) {
  console.error('Android build stopped: ' + error.message);
  process.exitCode = 1;
}
