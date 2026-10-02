# Instructions for coding agents

Read AI_HANDOFF.md and CHARACTER_STYLE.md before editing. The owner has resumed implementation and authorized changes to the live game. Preserve the existing Site identity and audience.

Use Node.js 24, npm ci and npm run build. Browser files in dist are partly authored source; do not delete dist wholesale. Generate dist/voxel.js, dist/hero-rules.js, dist/inventory-rules.js and dist/character-style.js from src, rather than patching bundles manually.

Characters use src/character-style.js. Register every scene NPC in NPCS with its scene ID. Models and illustrated portraits must share characterProfile. Do not introduce a second character generator or replace the approved illustrated portraits with cube portraits. Add tests for new identities and preserve saved hero appearances.

Run tests/character-style.mjs and the inventory, hero API, world API, world client and silhouette tests. For visual changes, run tests/mobile-browser.cjs in real Chromium and inspect screenshots at 390x844. State when the browser or physical iPhone was not tested.

Prioritize portrait iPhone layout, readable text and image/SVG icons. No emoji or Unicode substitute icons. Keep credentials, player saves and secrets out of source and reports.
