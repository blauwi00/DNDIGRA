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
