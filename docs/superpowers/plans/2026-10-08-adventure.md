# Adventure Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development or superpowers:executing-plans. Steps use checkbox syntax.

**Goal:** Complete a solo procedural opening and replayable tutorial in the existing game.

**Architecture:** Versioned pure scene generation feeds server snapshots and browser presentation. Separate story and tutorial state machines consume actual game actions. Capacitor packages the same client with a local persistence adapter.

**Tech Stack:** Node.js 24, JavaScript, Three.js, esbuild, Cloudflare Worker/D1, Capacitor.

**Spec:** docs/superpowers/specs/2026-10-08-adventure-design.md

## Global Constraints

- Preserve generator v1/v2 output and existing saved appearance and worlds.
- One player hero; NPCs never become bot allies.
- All human models/portraits use Characters; retain texels.
- Three prepared compatible stories, no paid AI or free-text GM.
- Tutorial loss is unconsciousness followed by rescue, not death.
- First tutorial cannot be skipped; later skip and isolated replay are supported.
- Portrait mobile layouts: 390×844 and 320×568.
- Separate feature branch only; no site deployment or main updates; QA images stay local.

## Review Focus

- Reload during NPC departure or rescue must resume safely, without duplicates.
- A full bag must retain chest loot and allow tutorial recovery.
- All four classes must be able to finish using legal actions/resources.
- Replaying tutorial must preserve the original snapshot and rewards.
- Local/native mode must work without network authentication or lose saves on restart.

### Task 1: Versioned story world

Files: src/worldgen/world-v3.js, src/worldgen/world.js, src/worldgen/index.js, tests/adventure-worldgen.mjs.

Interfaces: consume SceneBuilder/Rng/makeNpc; produce existing WorldGen API and plan.story/scene.encounters from the spec.

- [x] Add failing tests for v3 start, three crises, deterministic scenes, reciprocal arrivals and broad connected routes.
- [x] Run `node tests/adventure-worldgen.mjs` and observe expected failure.
- [x] Implement semantic graph and prepared content; retain v1/v2 dispatch.
- [x] Run adventure-worldgen, worldgen-versions and existing worldgen tests.

### Task 2: Saved state and validation

Files: src/world-api.js, tests/adventure-api.mjs.

Interfaces: consume v3 plan and TutorialRules; produce persisted story/tutorial state on creation, validate on PUT, require reported story before finish.

- [x] Add failing tests for create/PUT/reload, malformed flags, monotonically claimed clues/rewards, pending rescue and legacy v2.
- [x] Implement initial v3 state and state validation while keeping existing API signatures.
- [x] Run adventure-api, heroes-api, worlds-api and worldgen-api.

### Task 3: Playable story and combat

Files: dist/adventure.js/css, dist/game.js, tests/adventure-browser.cjs.

Interfaces: consume plan.story, state.story and typed encounters; produce Adventure restore/render/interact/step hooks and successful game-action events.

- [x] Add browser assertions for own appearance, intro resume, NPC departure, combat and settlement report.
- [x] Implement cinematic framing, dialogue, journal and legal prepared combat choices.
- [x] Add single-award encounter completion and prevent scene escape in combat.
- [x] Run story browser checks with real Worker/SQLite; legacy movement/death checks remain in Task 6.

### Task 4: Mandatory tutorial and replay

Files: src/tutorial-rules.js, dist/tutorial.js/css, dist/menu.js, minimal hooks in dist/views.js/inventory.js, tests/tutorial-rules.mjs.

Interfaces: consume game-action and Adventure startEncounter hooks; produce Tutorial create/restore/render/handle and completed profile marker.

- [x] Add failing reducer tests for action requirements, all classes, duplicate events, reload and rescue checkpoints.
- [x] Implement highlighted sequential steps, actual victory, scripted unconsciousness and rescue.
- [x] Add separate replay with save/restore of original world; no farming.
- [x] Verify first-run skip rejection and subsequent skip.

### Task 5: Native/offline package

Files: capacitor.config.json, package.json/lock, src/local-api.js, dist/native-runtime.js, docs/IOS.md, tests/local-api.mjs.

Interfaces: local requests implement the existing heroes/worlds HTTP-shaped API using indexed local persistence and shared pure rules; native detection never fakes server owner auth.

- [x] Add failing tests for local hero/world create/load/save/conflict/restart and no network API requests.
- [x] Implement local persistence, versioned package configuration and instructions for Mac/Xcode.
- [x] Verify web resource build and local API behavior.

### Task 6: Integration and delivery

Files: build.mjs, dist/index.html, dist/worlds.js, AI_HANDOFF.md, docs/ADVENTURE.md.

- [x] Build bundles and connect script order, world creation, tutorial skip and replay lifecycle.
- [x] Run required logic/API/browser checks, inspect mobile screenshots and fix regressions.
- [x] Review feature diff independently and prepare delivery on separate feat/story-prologue; do not merge or deploy.

Verification evidence and limits are recorded in `docs/VERIFICATION.md`. GitHub delivery uses a draft PR targeting `feat/worldgen-runtime`; main and published sites remain outside this task.
