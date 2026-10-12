# Current mobile test checkpoint · 2026-10-12

Base: existing published v64, `feat/region-streaming` at `509fdf7`.
The current models, textures, portraits, full editor, camera and D&D rules are
preserved. Capacitor bundles the game locally with no hosted server URL.

Implemented: landscape iPhone/iPad/Android configuration, landscape reflow of
existing controls, Android native project/build helper, full hero property
transfer/checkpoints, guarded asynchronous finishing and atomic server creation
against the current hero source. Earlier generator versions remain unchanged.

Verified locally:

- 31 logic/API suites, including transfer, source races, legacy generation and
  persistence; updated native configuration/preflight tests also pass 5/5.
- Actual Chromium controls at 852×393, 740×360, 1280×720 and name entry at
  852×270: all editor categories/undo/reset, inventory, map, dialogue and rolls.
- Real IndexedDB creation/save/reload with the preserved appearance and no API
  or external-resource networking. Native-mode detection uses an explicit
  JavaScript fixture, not an Apple/Android bridge emulation claim.
- Signed Android debug APK: package `com.dndigra.game`, sensorLandscape/game
  category, min SDK24/target36, existing debug certificate, exact 89 bundled game
  files including the corrected landscape stylesheet.
- APK SHA256: `db9861f92fefcf5c2e763ca37dead1a7091e1afa6024c46f79d70ec6eca68400`.
- Four unsigned-iOS helper fixture tests; actual Xcode compilation is a separate
  Mac job. Phone hardware, WKWebView and personal signing remain untested here.

The 13-test island terrain kernel is ready in `src/islands/terrain.js`, with
600–1000 dry bounds, surrounding sea, 10-cell chunks and six smooth biomes.
It is not enabled in the game yet. Island scenes, persistent environmental
changes, paid ships/trade and the improved contextual tutorial are the next
integration stage; see the island transaction plan. Current play still uses v3.

Installation: [Android](ANDROID.md), [iOS](IOS.md),
[iPhone with Mac CI and occasional Windows](IOS-SIDESTORE.md).
