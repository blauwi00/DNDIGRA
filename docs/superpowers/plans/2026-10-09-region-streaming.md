# Region streaming implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish a tested first stage of streamed outdoor rendering, with an isolated playable region walk, on the existing game Site.

**Architecture:** Keep the full bounded logical scene and existing coordinates/rules/saves. A pure planner and frame-scheduled lifecycle manager load visible terrain/prop groups; small scenes keep their present renderer. A separate temporary region walk reuses the existing practice save/restore lifecycle.

**Tech Stack:** Node.js 24, JavaScript, Three.js 0.186.1, esbuild, Chromium/Playwright, existing Cloudflare Worker and DB.

**Spec:** `docs/superpowers/specs/2026-10-09-region-streaming-design.md`

## Global constraints

- Preserve frozen generator outputs v1/v2/v3, stored seeds and IDs, DND and character appearance.
- Publish to `appgprj_6abd85e3189481919bbcd8003341cb45`; preserve existing audience, DB, all prior migrations and Site key `beyond-voxel-dnd-1`.
- No GitHub main merge, new product dependencies, AI, multiplayer or new story assignment.
- Three.js resource ownership must survive unloading and remounting; actor and portable-light state stays authoritative.
- Chunk dimensions/budgets are experimental defaults; measure them, do not claim physical iPhone validation.
- Keep QA outside Git and deployment archive. GPU browser runs are sequential; never build while serving a reload test.
- Owner requested direct Site publication after checks. Execute in this session, using bounded delegated tasks and one final integration review to limit repeated context.

## Review focus

- Free camera far from hero/combat: camera demand cannot evict pinned resources; overview avoids loading every detailed group.
- A touch on unready terrain cannot trigger an invisible prop through the ground-plane fallback.
- Rapid scene/practice transitions cancel scheduled work and clear silhouette/motion/light references.
- Returning to an unloaded chest/door does not restore loot or change collisions.
- Many repeated traversals plateau resource counts; shared materials remain valid and disposed owned resources do not grow.

## Task 1: Pure planning and lifecycle

Files: create `src/region-streaming.js`, `tests/region-streaming.mjs`.

Interfaces:
- `planRegionChunks({width,height,bounds,pins,chunkSize=16,maxChunks=12,margin=1,previousMode='detail'})` returns `{mode,chunks,visibleKeys,pinnedKeys,budgetOverflow}`. Bounds are global ground coordinates `{minX,minY,maxX,maxY}`; pins are `{x,y}`. Chunks are `{id,x,y,w,h,pinned}`. IDs use integer chunk coordinates, remain stable, and cover edge fragments exactly.
- `createChunkStream({build,release,schedule,onChange,onError})` returns `{update(plan),reset(),flush(limit=1),isReady(id),stats}`. `build(chunk)` synchronously returns a resource; `release(resource,chunk)` frees it; `schedule(callback)` returns an optional cancellation function. Default scheduling uses a new task. Only one chunk is built per scheduled flush. Stats expose ready IDs/count, queued count, built/released counts, generation, errors and last build duration.
- Priorities: pins, visible chunks, margin. If visible+pins exceed budget, overview contains pins only; hysteresis avoids oscillation. When pins alone exceed budget, only their explicitly counted overflow is allowed. Queue derives from this bounded desired set.

- [x] Add behavior tests for camera demand, boundaries, exact edge coverage, deterministic ordering, overview/return hysteresis, pin overflow and invalid inputs. Tests must first fail because the feature is absent.
- [x] Add lifecycle tests with real resources/counters for update reconciliation, one build per callback, reset cancellation, re-entrant reset, build failure/retry and repeated traversal plateau.
- [x] Implement the interfaces above without DOM/Three dependencies.
- [x] Run `node tests/region-streaming.mjs`; record red/green evidence, then review before renderer verification.

## Task 2: Outdoor renderer integration

Files: modify `src/voxel.js`, `src/static-batches.js` only if ownership/update support is necessary; create a focused helper module for terrain/group construction if needed.

Consumes Task 1 interfaces; produces `voxel.regionStats` for QA (no product-visible technical panel), ready-aware picking and preserved existing voxel methods.

- [x] Add tests/assertions for streamed counts and readiness before modifying the renderer; use pure resource tests where GPU is unnecessary.
- [x] Keep existing full renderer for small scenes/interiors; stream sufficiently large outdoor scenes using configurable experimental dimensions/budget. Preserve the whole-scene behavior of old small maps.
- [x] Split terrain/decor/props into independently owned groups; preserve world coordinates, layer1 picking, per-group batches and state-derived updates. Resource release cannot dispose shared resources still used by another group.
- [x] Reconcile demand on camera pan/zoom/resize and game movement. Pin current hero, active combat/interaction/motion/speaker targets and immediate movement area; actors/portable lights keep independent lifecycles. Never pin the entire long path.
- [x] Provide lightweight overview terrain/landmarks when demand exceeds budget. Preserve pan/zoom/return controls, meaningful model bounds and light influence margins. Loading groups does not recenter camera.
- [x] Guard unready/overview clicks before fallback ground selection. Clear stale prompt/silhouette links on unload, and handle construction failure without changing logical state.
- [x] Test reset/mount cycles and compatibility of `staticBatchStats`, then report exact changed files and verification commands. Do not run parallel GPU browsers.

## Task 3: Isolated region walk, verification and publication

Files: create `src/region-walk.js`, `tests/region-walk.mjs`, `tests/region-browser.cjs`; modify `build.mjs`, `dist/index.html`, `dist/worlds.js`, `dist/menu.js`, relevant practice regression tests, `tests/run-logic.mjs` and docs.

Interfaces:
- `createRegionWalk(seed)` returns a deterministic ordinary bounded outdoor scene with stable IDs, wide road, connected terrain, recognisable landmarks and a small number of ordinary interactions. Initial fixture size is experimental 96×64; no world-generation version/default changes. The bundled global is `RegionWalk.createRegionWalk`.
- `Worlds.startRegionWalk()` starts isolated practice using the confirmed current hero; `Worlds.endPractice()` restores the exact original snapshot/record/save bookkeeping. `Worlds.practiceKind` distinguishes tutorial and region for menu/label purposes. Existing zero-argument `startPractice()` stays valid.
- Product label: `Прогулка по окрестностям`; exit: `Вернуться в приключение`. The user is told that it is a temporary walk and finds do not transfer. Starting is blocked during action/combat/pending HUD or failed original save, as with tutorial practice.

- [x] Write failing generator/connectivity tests and practice isolation/restoration tests. Implement the map and minimal practice/menu integration, preserving prior tutorial behavior and preventing API writes during the walk.
- [x] Add bundle/script order and suites; preserve the Site-specific title and saved-state key at delivery. Verify no story/tutorial auto-events run in the region fixture.
- [x] Real Chromium: enter via menu, cross several group boundaries through controls, pan away/return, overview readiness, chest round-trip, combat pinning, rapid reset/cancellation, repeated traversal resource plateau and exact restoration of the original world. Record controllable fixtures explicitly.
- [x] Run `npm test`, relevant movement/mobile/WorldGen/adventure/practice browser regressions sequentially, inspect 390px and 320px screenshots and update the native resource copy.
- [x] Compare chunk configurations and full-render control on the same fixture; report generation/first-show/build times and resource/draw counts with software-GPU limits.
- [x] Review final feature diff and address material findings; document only verified outcomes.
- [ ] Copy reviewed source to the opened existing Site checkout, preserving Site-specific notes/key/title and immutable migrations. Build, package client/server/manifest/migrations, push exact source, save version, deploy with unchanged audience and confirm successful native status.

## Execution record

Owner accepted staged implementation and then requested direct website delivery.
The source worktree is already isolated on `feat/region-streaming`.
Baseline: `npm test` runs before implementation; results are in `/workspace/region-baseline-logic.log`.
Task reports/ledger stay outside the repository in `/workspace/dndigra-region-work/`.
Only the root agent performs Site operations and GPU verification.

Verification selection: the current 27-suite build, region touch/resource/restoration scenario, map controls, mobile editor/HUD, both legacy location routes, v2 WorldGen, death screen, full fighter tutorial with replay and native/offline reload were checked. The region scenario also starts the actual v3 intro. Previous all-class/full adventure campaign runs were not repeated because their rules are unchanged; the current report states this explicitly. Physical iPhone/Xcode validation remains outside this environment.
