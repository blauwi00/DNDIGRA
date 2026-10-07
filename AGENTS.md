# Current task: death screen · 2026-10-07
Owner requested a death screen and missing saving throws after an altar approach. Show trap saves through HUD, apply DND.damage, stop movement and interaction at zero HP. Zero HP is unconsciousness until DND rules confirm death. Preserve saves and heroes; never automatically finish/delete the world. Run death-browser, WorldGen and existing mobile/movement/API regressions. Owner subsequently authorized publishing; update TEST Site only, not main. Keep separate feat/worldgen-runtime GitHub branch. QA screenshots never go to GitHub.

# Previous task: updated WorldGen archive · 2026-10-07
Integrate WORLDGEN.md Updates and TEXTURE_PLAN.md section6. Apply per-model decal materials / polygonOffset / no frustum culling in src/voxel.js. Source changes in separate GitHub branch only; do not publish Sites for this task. Old generator is frozen in src/worldgen-v1, new worlds use v2 through src/worldgen/world.js version dispatch. Preserve flat faces and map actions. Rebuild bundles, run worldgen, worldgen-versions, static-batches, API and 390x844 browser checks. If character transparency remains, report the scene and screenshot. QA screenshots never go to GitHub.

# Previous task: map actions · 2026-10-07
Owner requested tap-select-act navigation and contextual actions next to map cells, replacing the bottom interaction button. Inspect must approach first; adjacent NPC/doors/containers offer use. Keep camera stationary during movement. Models deferred pending direction. This follow-up authorizes updating the existing test Site; do not change main Site. src/voxel.js is source, rebuild dist/voxel.js. Run tests/map-controls.cjs plus mobile, location and WorldGen browser regressions. QA screenshots are local evidence and must not be uploaded to GitHub.

# Current branch: WorldGen integration · 2026-10-06
Owner requested source changes in a separate GitHub branch only. Do not publish any Site for this task.
Read WORLDGEN.md. New server worlds use world.gen {v,seed,size}, lazy World.scenes and WorldGen.Runtime. Preserve legacy hub/crypt and procedural worlds. Keep src/worldgen-look-v1.js frozen: changing generator output requires a version migration, not silently changing existing seeds. Build worldgen/props/voxel bundles from src. Run tests/worldgen.mjs, tests/worldgen-api.mjs and tests/worldgen-browser.cjs (real Worker + SQLite + Chromium 390x844), plus repository checks below. Procedural NPCs use Characters.spec with actor.gen; only static NPC IDs must be registered.

# Instructions for coding agents

The owner requested a bounded procedural prototype in this test Site: street, tavern, cellar. Read PROCEDURAL_LOCATIONS.md. Keep generation pure and deterministic, validate before installing, retain bounded retries. Run tests/location-generator.mjs and tests/location-browser.cjs for generation, movement or transition changes. Generate dist/location-generator.js from src. Do not expand into a village, quests, schedules or server-backed procedural worlds without a new request.

Read AI_HANDOFF.md and CHARACTER_STYLE.md before editing. This checkout is a separate iPhone test Site. Owner authorized publishing this test copy with an FPS counter. Do not deploy or change the main game Site.

Use Node.js 24, npm ci and npm run build. Browser files in dist are partly authored source; do not delete dist wholesale. Generate dist/voxel.js, dist/hero-rules.js, dist/inventory-rules.js and dist/character-style.js from src, rather than patching bundles manually.

Owner explicitly chose the complete Claude editor on 2026-10-04, including pixel portraits. Human heroes/NPC use src/characters.js and look-options.js as the shared model/portrait source. Keep NPCS scene IDs registered. src/character-style.js remains only for skeletons/dummies and archived illustrated assets; do not route humans back through the old builder. Preserve saved appearance colors and validate new enums on the server.

Run tests/characters.mjs, tests/preview-frame.mjs and the inventory, hero API, world API, world client and silhouette tests. For visual changes, run tests/mobile-browser.cjs in real Chromium and inspect screenshots at 390x844. State when the browser or physical iPhone was not tested.

Prioritize portrait iPhone layout, readable text and image/SVG icons. No emoji or Unicode substitute icons. Keep credentials, player saves and secrets out of source and reports.

- Все воксельные модели (персонажи, враги, манекены, предметы, объекты карты) получают текселное затенение по CHARACTER_STYLE.md, раздел «Тексели». Плоская заливка крупных боксов одним цветом не допускается.
