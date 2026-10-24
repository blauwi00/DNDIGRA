#!/bin/bash
# Compile the existing, already-synced Capacitor game on a Mac. No Apple login.
set -euo pipefail

if [[ $# -gt 1 ]]; then
  printf 'Usage: bash scripts/ios-unsigned-build.sh [external-output.ipa]\n' >&2
  exit 1
fi
if [[ "$(uname -s)" != "Darwin" ]]; then
  printf 'An iOS device binary requires macOS and Xcode; Linux/Windows cannot compile this app.\n' >&2
  exit 1
fi

root="$(cd "$(dirname "$0")/.." && pwd -P)"
cd "$root"
output="${1:-${TMPDIR:-/tmp}/dndigra-ios-artifacts/DNDIGRA-unsigned.ipa}"
output="$(node -e 'process.stdout.write(require("node:path").resolve(process.argv[1]))' "$output")"
case "$output" in
  "$root"|"$root"/*) printf 'Keep the IPA outside the source checkout.\n' >&2; exit 1 ;;
  *.ipa) ;;
  *) printf 'Output must have an .ipa extension.\n' >&2; exit 1 ;;
esac

node --input-type=module <<'JS'
import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync} from 'node:fs';
import path from 'node:path';
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const config = read('capacitor.config.json');
const native = read('ios/App/App/capacitor.config.json');
assert.equal(config.appId, 'com.dndigra.game', 'Preserve the existing app and save identity');
assert.equal(config.webDir, 'dist/client');
assert.equal(config.server, undefined, 'Use the bundled local game, without server overrides');
assert.equal(native.appId, config.appId);
assert.equal(native.server, undefined, 'Re-sync the native config for the bundled local game');
assert(existsSync('ios/App/App.xcodeproj/project.pbxproj'), 'Existing Xcode project is missing');
assert(existsSync('dist/client/index.html'), 'Run npm run ios:sync before building');
assert(existsSync('ios/App/App/public/index.html'), 'Run npm run ios:sync before building');
function compare(relative = '') {
  for (const entry of readdirSync(path.join('dist/client', relative), {withFileTypes: true})) {
    const next = path.join(relative, entry.name);
    assert(!entry.isSymbolicLink(), 'Bundled assets must not be symlinks');
    if (entry.isDirectory()) compare(next);
    else {
      const copied = path.join('ios/App/App/public', next);
      assert(existsSync(copied), `Missing native asset ${next}; Re-sync with npm run ios:sync`);
      assert(readFileSync(copied).equals(readFileSync(path.join('dist/client', next))), `Stale native asset ${next}; Re-sync with npm run ios:sync`);
    }
  }
}
compare();
JS

xcode_version="$(xcodebuild -version)"
printf '%s\n' "$xcode_version"
major="$(printf '%s\n' "$xcode_version" | awk '/^Xcode / {split($2, parts, "."); print parts[1]; exit}')"
if [[ ! "$major" =~ ^[0-9]+$ ]] || [[ "$major" -lt 26 ]]; then
  printf 'Capacitor 8 requires Xcode 26 or newer. Select it with DEVELOPER_DIR.\n' >&2
  exit 1
fi

workdir="$(mktemp -d "${TMPDIR:-/tmp}/dndigra-ios-build.XXXXXX")"
trap 'rm -rf "$workdir"' EXIT
xcodebuild \
  -project "$root/ios/App/App.xcodeproj" \
  -scheme App \
  -configuration Release \
  -sdk iphoneos \
  -destination 'generic/platform=iOS' \
  -derivedDataPath "$workdir/DerivedData" \
  -clonedSourcePackagesDirPath "$workdir/SourcePackages" \
  CODE_SIGNING_ALLOWED=NO \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY= \
  DEVELOPMENT_TEAM= \
  build

app="$workdir/DerivedData/Build/Products/Release-iphoneos/App.app"
if [[ ! -f "$app/App" || ! -f "$app/Info.plist" || ! -f "$app/public/index.html" ]]; then
  printf 'Xcode did not produce the expected complete device App.app.\n' >&2
  exit 1
fi
mkdir -p "$workdir/package/Payload" "$(dirname "$output")"
ditto "$app" "$workdir/package/Payload/App.app"
(
  cd "$workdir/package"
  ditto -c -k --keepParent Payload "$workdir/DNDIGRA-unsigned.ipa"
)
mv "$workdir/DNDIGRA-unsigned.ipa" "$output"
shasum -a 256 "$output" > "$output.sha256"
printf 'Unsigned device IPA: %s\nIt still requires personal re-signing and an iPhone installation test.\n' "$output"
