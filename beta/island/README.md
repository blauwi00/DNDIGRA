# Island beta (prototype)

A standalone playable prototype of the island game loop, built outside the main
game to try ideas quickly. `island.html` is the built page (Three.js r128 from
cdnjs); it is also published as a private Claude artifact for the owner.

What it tries: an 80x60 island (dock, village, forest, bandit camp, hunter camp,
ruins, graveyard), enterable houses with distinct interiors, two-hand inventory
with a bag and per-item limits, chests, inspecting things, hero editor with
classes and hairstyles, real-time exploring with turn-based D&D 5e style fights
(initiative, action wheels, advantage, sneaking, shove, distracting stones),
quests, day/night, synthesised sound, local save.

Nothing here is wired into the game in `src/` yet; porting is a separate step.

## Build

    cd beta/island/src
    OUT=.. python3 build.py     # writes beta/island/island.html

Sources: `main.js` (world, walking, frame loop; placeholders `{RIG}`,
`{INTERIORS}`, `{COMBAT}`, `{EXTRAS}`, `{UI}` are filled by `build.py`),
`interiors.js`, `combat.js`, `extras.js` (day/night, sound), `ui.js` (wheels,
menus, editor), `hands.js` (inventory), `rig.js`, `tex.js`, `models.js`,
`head.html`/`stage.html`/`ui.html`/`ui.css`.

Not tested on a physical iPhone; checked in desktop Chromium (software GL).

Fonts (Cormorant Garamond, PT Sans; SIL Open Font License) are inlined from `src/fonts.css` so text renders offline. The game's `dist/characters.js` is inlined too; rebuild the island after it changes.
