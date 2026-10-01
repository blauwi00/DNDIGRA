# Torch lighting update

Implementation retains original procedural Three.js models, inverse-square PointLights and filtered point shadows. Each party member has an independent portable source attached to the actual hand transform. Wall brackets stay when a torch is removed. Candle chandeliers use thin open rings and fade beside heroes. Sources do not cast or receive shadows.

References researched, not imported:
- Godot official 2D lights / shadows: https://docs.godotengine.org/en/stable/tutorials/2d/2d_lights_and_shadows.html
- MIT SDF Godot demo: https://github.com/greycheeked/SDF-2D-Lighting
- MIT Penumbra for MonoGame: https://github.com/discosultan/penumbra
- Godot Lit SDF shadows, Forward+ only (mobile renderer unsupported): https://github.com/shawndeprey/lit
- CC0 modular dungeon assets: https://kenney.nl/assets/modular-dungeon-kit
- CC0 furniture assets: https://kenney.nl/assets/furniture-kit
- Three.js PointLight: https://threejs.org/docs/pages/PointLight.html

The Godot/MonoGame libraries cannot directly plug into this Three.js browser game. Assets are references for modular silhouettes; no third-party asset pack or library has been imported.

House rules: held torch imposes attack disadvantage; equipment switching costs an action in combat; torch manipulation costs a bonus action. Shield AC and bow hand requirements remain separate from these simplifications. No advantage or disadvantage stacking.

Validation uses DOM gameplay integration and actual Three.js geometry with a stub renderer. Ownership, pickup, mounting, stowing, hand restrictions, combat resources and shadows flags checked. Mobile GPU appearance/performance remains to be checked on the user's phone.

## Smooth preset B
Stationary sources no longer render cubemap shadows. Warm falloff and flicker retained, low neutral ambient increased for readable rooms. Soft radial contact shadows ground figures and furniture. Only carried sources cast dynamic shadows, at 128 resolution, refreshed on state changes and moving geometry. Fixed drawing ratio 1 instead of 1.5 reduces pixel count by 56% on high-DPI phones; UI remains native resolution. Rendering ceiling changed from the 40ms gate to 30ms for a consistent ~30fps on 60Hz devices. GPU performance still requires phone verification.

## Soft source correction
Reduced stationary wall radiance from .8 to .45 multiplier; chandelier .3 and altar .22 prevent nearby wax/metal becoming overexposed. Room ambient remains unchanged. Portable radiance .65. Chandelier uses matte unlit colored materials, transparent depth writes disabled, smoother ring and no hanging vertical rods. This prevents self-illumination washout and depth-order stripe artifacts while retaining fade near heroes.

## Exploration update
Preview routes end on a free neighboring tile for interactions and beyond an open doorway for crossing. Stop finishes the current cardinal step, clears the remaining route, and cancels any pending automatic interaction. Combat deducts only completed steps; enemy movement does not expose the player stop control. Route markers share one instanced draw.

The optional scripted missing-novice episode offers persuasion, survival clues, and Dexterity/Strength lock entry. Failed survival adds ten minutes while still finding a key; failed lock entry allows another route. Attempts are tracked by character, rescue and evidence persist, and the first completion pays 25 gold / 40 XP once. This does not add an AI narrator.
