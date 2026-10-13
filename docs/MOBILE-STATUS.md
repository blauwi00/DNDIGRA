# Current mobile island integration · 2026-10-13

Base: existing published v64, `feat/region-streaming` at `509fdf7`.
The current models, textures, portraits, full editor, camera and D&D rules are
preserved. Capacitor bundles the game locally with no hosted server URL.

Implemented: landscape iPhone/iPad/Android configuration, landscape reflow of
existing controls, Android native project/build helper, full hero property
transfer/checkpoints, guarded asynchronous finishing and atomic server creation
against the current hero source. Earlier generator versions v1/v2/v3 and their
saves remain unchanged.

New-adventure UI now creates a playable v4 island in the existing game. Dry
bounds are 600–1000 cells, surrounded by ocean, with 10×10 render chunks and six
smooth biomes: forest, meadow, desert, mountain, snow and swamp. The shared
compact scene queries avoid allocating full million-cell terrain grids and
preserve current models, textures, editor, camera and D&D controls. New v4
adventures do not attach the old v3 scripted tutorial; its legacy saves and
isolated menu practice remain supported. The new contextual tutorial is pending.

Current verification:

- Full logic/API run: **35/35 suites passed**, including island generation,
  compact scenes, client/render contracts, server/offline validation and legacy
  regressions.
- Real Chromium at 852×393 verified the 600-cell island: current-model intro
  and messenger, bounded chunks, dry movement/ocean rejection, overview,
  once-only loot, complete hero resources on IndexedDB resume and a real d20
  victory whose reward and cleared encounter remain saved. Exploration and
  focused combat were checked separately; position fixtures shorten walks.
- Maximum-size and native/browser release checks are recorded with the
  delivered artifacts. APK/IPA must contain byte-identical current client
  files; the previous artifacts do not establish a new island release.

Previous mobile checkpoint, before the playable-island integration:

- Actual Chromium controls at 852×393, 740×360, 1280×720 and name entry at
  852×270: all editor categories/undo/reset, inventory, map, dialogue and rolls.
- Real IndexedDB creation/save/reload with the preserved appearance and no API
  or external-resource networking. Native-mode detection uses an explicit
  JavaScript fixture, not an Apple/Android bridge emulation claim.
- Signed Android debug APK: package `com.dndigra.game`, sensorLandscape/game
  category, min SDK24/target36 and exact local game assets.
- Real unsigned iOS `Release` arm64 compilation passed on Xcode 26.3 with
  SDK `iphoneos26.2`, Capacitor 8.5.3/SPM and minimum iOS 15.4:
  [Mac run 38321765622](https://github.com/blauwi00/DNDIGRA/actions/runs/38321765622),
  commit `c88813703e09e4f41adb4b138a43d27787c93825`. The resulting IPA was
  inspected for the expected local app/config, landscape and exact 89 game
  files. This was the previous mobile version, not the new island v4 release.
- Four unsigned-iOS helper fixture tests and five native configuration tests
  passed. Phone hardware, WKWebView and personal signing remain untested here.

Paid ship travel and revisits, trade/economy, the new contextual tutorial and
full-length branching adventures remain pending; this batch does not claim
those systems or a complete 60–120-minute story. See the
[playable-island integration plan](superpowers/plans/2026-10-12-playable-island-integration.md)
and the existing island transaction plan for the next stages.

Installation: [Android](ANDROID.md), [iOS](IOS.md),
[iPhone with Mac CI and occasional Windows](IOS-SIDESTORE.md).
