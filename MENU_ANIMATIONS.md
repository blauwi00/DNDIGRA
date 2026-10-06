# Cinematic menu — October 5, 2026

## Revision after the owner rejected version 5

The owner rejected the entire first implementation. Do not treat version 5 or its screenshots as approved. The current revision rebuilds the stone tavern, tiled floor, patterned rug, recessed hearth, bottle shelves and seated patrons around the approved three-screen concept. It replaces the previous stacked CSS overrides with one scoped menu theme. The editor has three visible progress nodes, compact name/class/gender controls to the left, the live hero to the right and horizontally scrollable appearance choices below. The 27-point allocation page is still part of the foundation step; all appearance categories and pixel portraits remain available.

Flame animation now multiplies the original mesh scale instead of replacing it. Decorative camera motion and rotation inertia are restrained; control preferences have their own browser-storage key and never add fields to world snapshots. Floor tiles use five instanced batches. Menu-specific tests cover display/control settings, live preview rotation, no overlap of editor panels and no horizontal scrolling of the dialog body. The existing at-main-menu visibility rule is explicitly overridden for the cinematic scene. The redesigned result still needs the owner’s visual assessment.


The owner approved all eight animation groups for the separate iPhone test Site.

- `dist/cinematic-menu.js` owns home, settings and editor presentation. The existing Heroes/Worlds APIs, 27-point allocation, immutable hero confirmation and ordered autosaves remain in use. Continue loads the remembered server world or resumes the in-memory world after a saved exit.
- `src/menu-stage.js` builds a small presentation tavern using the game's existing texel-shaded prop and character builders. It never installs or modifies a procedural location, NPC registry or player snapshot. The game and menu share one WebGL renderer and one animation loop. Hero previews render in a scissored viewport.
- Fire flicker, sparse sparks, soft smoke, breathing, head turns, mug lifting/drinking, slow camera movement, button arrival/press effects, panel arrival, editor idle/rotation inertia, appearance crossfades and animated settings controls are implemented. `prefers-reduced-motion` and the animation setting stop decorative motion. Finger rotation remains available.
- Humans still use `Characters.build`; optional articulated groups exist only for the presentation scene. The full Claude appearance editor and pixel portraits remain available. The live preview fits all rotated geometry, including hats and weapons, using the shared preview-frame helper.
- Menu settings update game settings directly, including saved worlds where the debug test commands are deliberately blocked. Explicit menu preferences persist across worlds; untouched defaults do not override a loaded world's settings.

Validation: characters, preview-frame, inventory-rules, heroes-api, worlds-api, worlds-client, silhouette, location-generator, location-browser, mobile-browser, generated-world-browser and menu-browser. The browser checks use real headless Chromium with SwiftShader at 390×844 and editor layout checks at 320×480 and 900×900. Physical iPhone performance has not been tested. Menu screenshots are in `qa/menu-*.png`.

Keep publishing this test Site only: `appgprj_6ac2b5e60af481919b957c96f784e286`. Do not deploy the main game Site.
