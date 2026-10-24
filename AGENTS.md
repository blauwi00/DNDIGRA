# Island beta · 2026-10-23
Playable prototype lives in `beta/island/` (see its README). Owner iterates on it via a private artifact; it is not part of the shipped game until ported. Owner rule: no interface element (panel, card, button, badge, minimap, health bar) may overlap another, not even by a pixel, at any screen size; icons sit centred in their buttons (checked by tests/island-beta-browser.cjs). Owner rule: a people gives no plus to rolls or the sheet (those come from the class); each people has one unique ability and at most a small perk (docs/PEOPLES.md). Owner rule: every character has exactly two hands; held items attach to the model's own hands and never add extra hands or fists (see beta/island/README.md). Scaling plan and owner's direction for turning the prototype into a large project: docs/ISLAND_ROADMAP.md. Shared site: Netlify publishes site/island on every push; rebuild with SITE= (README).

# Claude visual pass · 2026-10-23
Branch `claude/affectionate-ritchie-sbvta3` (based on `feature/current-game-2026-10-22`). Owner approved the look of Claude's demo scene: dark fantasy, pixel textures on 3D blocks, night light. Done: island ground pixel textures (`src/islands/pixel-surfaces.js`), fix for near-black atlas stone roads, denser jittered foliage with new nature props, tavern menu patrons with individual routines, 3D combat body language (`combatPose` in `src/voxel.js`), and a day/night cycle (`src/daynight.js`): one day = 20 real minutes, clock saved in `state.worldTime`, paused in menus, dialogs and combat; outdoors only. Owner plans to supply GPT-generated pixel textures; downscale them to a strict 32px grid before use. Owner asked to publish this branch to the existing Site; Claude has no Site access.

# Current cinematic follow-up · 2026-10-17
Owner requested an immediate impressive addition in the existing game. Caravan cinematics use the current orthographic map, models and textures. Preserve the separate episode save: the menu preview never writes it. See docs/PROLOGUE.md and caravan-cinema tests. Existing game rules, generation and main campaign are unchanged.

# Current short prologue · 2026-10-16
Owner authorized a small playable episode in the existing game after narrowing scope. See `docs/PROLOGUE.md`: peaceful village days, caravan attack, knockout beside carriage, preparation consequences and optional recovery. Preserve existing assets, campaign saves and Site identity. The episode has its own local save and authored scenes; this is not the full procedural island or AI GM. Latest owner directions supersede older generator-only task notes below.

# Current compact HUD update · 2026-10-14
Owner requested a full game viewport with interface controls revealed on demand, then publication to the existing Site. Preserve current art, rules, saves, generators and Site identity/audience. `dist/compact-hud.js` / `.css` are authored presentation source; see `docs/COMPACT_HUD.md`. Navigation and camera controls now live inside `#hud-navigation`; combat/actions reuse real existing handlers. Update browser interactions to open the drawer first. New warrior abilities/tempo remain design proposals and are not implemented by this update.

# Current Site update ·2026-10-13
Owner explicitly requested the updated EXISTING game on this Site and in native apps. Preserve project/audience/DB/migrations/title/local save key. Newly started adventures explicitly use compact islandv4; older saved generators remain frozen. Source branch main belongs to the Site provider only; GitHub main is untouched. No player-data import.

# Mandatory project rules — read first

## Active continuation · 2026-10-12
Owner explicitly requested implementing island generation now and publishing the updated EXISTING game both to the existing Site and as native app builds. This supersedes the no-Site-publication note below, but does not authorize GitHub main changes, store publication or changing the Site audience. Preserve Site ID/audience/DB/migrations/title/local save key. Implement playable compact v4 island terrain and bounded rendering/UI in the current project; preserve v1/v2/v3 saves and current art/editor/camera/rules. Root owns integration, global builds, GPU/browser tests, Git, Site publication and native exports; workers own explicitly assigned files only. Read docs/superpowers/plans/2026-10-12-playable-island-integration.md for this batch's interface contract. No worker commits, pushes, builds bundles or publishes.

## Current owner correction · 2026-10-12
Work continues from latest existing v64 (feat/region-streaming509fdf7), not a replacement game. Preserve current approved characters, pixel textures, full editor, rules, equipment, icons/theme and recognized orthographic top-down view. Do not promote archived cartoon sprites or invent new models. Latest instructions override historical portrait/world rules: all screens landscape, islands600–1000drycells/10cellchunks, paid ships, entire hero property retained, no automatic enemy/resource respawn. Use existing Capacitor/local API to test installed game; do not publish Site/stores or merge main. Read docs/superpowers/specs/2026-10-12-existing-game-mobile-islands.md and plan. Root owns builds/GPU/Git/artifacts; workers only assigned paths. Rejected /workspace/DNDIGRA-godot is not the implementation base.

Before planning, editing, reviewing, testing, or deploying this game, **read [docs/DEVELOPMENT_RULES.md](docs/DEVELOPMENT_RULES.md)**. It records the owner's approved game architecture and progression/story rules, and clearly separates unresolved proposals. Do not confuse future requirements with implemented features. The owner's latest explicit instruction overrides conflicting documentation; flag any conflict before changing a confirmed rule. This documentation requirement applies to Codex, Claude, and other AI coding agents.

# Current task: streamed outdoor region · 2026-10-09
Owner approved the first small stage of combined renderer/world work and explicitly requested immediate publication to the existing Site. Work stays isolated on `feat/region-streaming`; preserve saved worlds and frozen generator versions. This supersedes earlier no-publication task notes. No GitHub main merge or audience change is authorized.

Read `docs/superpowers/specs/2026-10-09-region-streaming-design.md` and its implementation plan. Keep the full bounded logical scene; stream only terrain/prop rendering for large outdoor scenes. Small scenes and interiors retain the full renderer. `Прогулка по окрестностям` is an isolated temporary 96×64 practice region, with exact original-world restoration and no reward transfer. It is the first foundation for a larger hybrid world, not a replacement for existing adventures or a new generator version.

Renderer resources must have clear ownership: unloading a chunk cannot dispose shared resources or remove pinned live actors, motion targets, interactions or combatants. Use ready-aware picking and a lightweight overview. Experimental chunk sizes/budgets require measured evidence; Linux Chromium timings do not establish iPhone performance. Run logic/API suites and relevant real-browser region, tutorial, movement, world-generation and native checks sequentially; never rebuild served files during a test. Keep QA artifacts outside commits and deployment archives.

Publish to `.openai/hosting.json` project ID, preserving the existing custom audience, database and migrations. In the Site checkout preserve title `За гранью` and local save key `beyond-voxel-dnd-1`; the feature checkout's iPhone-test key must not replace the live key.

# Previous task: story prologue and native prototype · 2026-10-08
Owner authorized a solo opening in the current game: several prepared coherent stories, a readable clearing/road/settlement, appearance-bound camera/text intro, panic messenger, DND combat and mandatory replayable tutorial. Allies mean future human players; no bot party or multiplayer now. Tutorial defeat is unconsciousness followed by healer rescue. Paid AI GM/free-text adjudication is deferred. Keep work on separate `feat/story-prologue`, based on `feat/worldgen-runtime`; preserve existing project and saves. No Site publication or main update is part of this task.

New worlds default to WorldGen v3; frozen v1/v2 dispatch stays intact. Use `docs/ADVENTURE.md`, `docs/IOS.md` and `docs/superpowers/specs/2026-10-08-adventure-design.md`. Practice restores the original snapshot and never writes its rewards/progress into the saved world. Local/native UUIDs use `LocalAPI.randomUUID`; local JSON responses must work without static `Response.json`. The iOS app target is 15.4; its resources are generated with build/copy. A successful Linux copy is not an Xcode or physical-device test.

Run `npm test` and the relevant real-browser story/tutorial/native and legacy regressions. In software-rendered environments run GPU browser tests sequentially and do not rebuild files while a reload test serves them. Performance overlay is opt-in through `?qa=1`. Keep QA screenshots local, including modifications of already tracked legacy screenshots.

# Previous task: death screen · 2026-10-07
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

# Existing Site identity and publication history

# Instructions for coding agents

## Main promotion · 2026-10-07
Owner explicitly requested promoting TEST v14 into this MAIN project. This supersedes old test-only/no-main restrictions in imported historical notes. Preserve MAIN project ID appgprj_6abd85e3189481919bbcd8003341cb45, its audience, D1 DB, migrations and local key beyond-voxel-dnd-1. Do not import test player data. All tested WorldGen, UI, model and death-screen changes are promoted; test FPS panel is excluded. Build generated bundles from src, never edit dist/voxel.js manually.

Read AI_HANDOFF.md and CHARACTER_STYLE.md before editing. The owner has resumed implementation and authorized changes to the live game. Preserve the existing Site identity and audience.

Use Node.js 24, npm ci and npm run build. Browser files in dist are partly authored source; do not delete dist wholesale. Generate dist/voxel.js, dist/hero-rules.js, dist/inventory-rules.js and dist/character-style.js from src, rather than patching bundles manually.

Owner explicitly chose the complete Claude editor on 2026-10-04, including pixel portraits. Human heroes/NPC use src/characters.js and look-options.js as the shared model/portrait source. Keep NPCS scene IDs registered. src/character-style.js remains only for skeletons/dummies and archived illustrated assets; do not route humans back through the old builder. Preserve saved appearance colors and validate new enums on the server.

Run tests/characters.mjs, tests/preview-frame.mjs and the inventory, hero API, world API, world client and silhouette tests. For visual changes, run tests/mobile-browser.cjs in real Chromium and inspect screenshots at 390x844. State when the browser or physical iPhone was not tested.

Prioritize portrait iPhone layout, readable text and image/SVG icons. No emoji or Unicode substitute icons. Keep credentials, player saves and secrets out of source and reports.
