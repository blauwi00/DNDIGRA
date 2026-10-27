# Compact HUD · 2026-10-14

The owner requested removing persistent interface framing from the existing game and publishing the change to the current Site. Current characters, textures, camera, combat rules, island generators and save formats remain authoritative.

Exploration now uses the full viewport, a small health bar and a menu button. The menu contains the existing map/hero/inventory tabs, quest journal, action sheet, roll history, camera controls and settings/exit. Selecting a destination closes the menu. Hero and inventory screens have a direct return-to-map button.

Map-cell/object prompts still perform movement and interactions. Combat exposes actions, end turn and the existing movement/action state. The action sheet also contains the existing potion control and available enemy attacks; actions close the sheet before invoking their original handlers. No new warrior abilities, tempo resource or combat rules are implemented by this update.

Location and successful-save notices are transient. Save errors remain visible with a route to the existing world dialog. Dialogue, roll results and tutorial prompts overlay the map; tutorial text now points to controls in the menu. The original character editor and inventory layouts are retained.

`dist/compact-hud.js` and `dist/compact-hud.css` contain the presentation layer. `dist` also contains authored source; build only through the existing build script, never delete the directory.

Validation uses `npm test`, `tests/compact-hud-browser.cjs`, the existing mobile editor regression and the real tutorial replay/legacy-save regression. Browser artifacts stay outside tracked source. Linux Chromium checks do not establish physical iPhone performance.
