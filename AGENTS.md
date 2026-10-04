# Instructions for coding agents

Read AI_HANDOFF.md and CHARACTER_STYLE.md before editing. Current authorization: source changes and a separate GitHub branch only. Do not deploy or change the running Site. Preserve the existing Site identity and audience.

Use Node.js 24, npm ci and npm run build. Browser files in dist are partly authored source; do not delete dist wholesale. Generate dist/voxel.js, dist/hero-rules.js, dist/inventory-rules.js and dist/character-style.js from src, rather than patching bundles manually.

Owner explicitly chose the complete Claude editor on 2026-10-04, including pixel portraits. Human heroes/NPC use src/characters.js and look-options.js as the shared model/portrait source. Keep NPCS scene IDs registered. src/character-style.js remains only for skeletons/dummies and archived illustrated assets; do not route humans back through the old builder. Preserve saved appearance colors and validate new enums on the server.

Run tests/characters.mjs, tests/preview-frame.mjs and the inventory, hero API, world API, world client and silhouette tests. For visual changes, run tests/mobile-browser.cjs in real Chromium and inspect screenshots at 390x844. State when the browser or physical iPhone was not tested.

Prioritize portrait iPhone layout, readable text and image/SVG icons. No emoji or Unicode substitute icons. Keep credentials, player saves and secrets out of source and reports.

- Все воксельные модели (персонажи, враги, манекены, предметы, объекты карты) получают текселное затенение по CHARACTER_STYLE.md, раздел «Тексели». Плоская заливка крупных боксов одним цветом не допускается.
