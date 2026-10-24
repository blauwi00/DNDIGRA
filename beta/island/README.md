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

## Rule: a character has exactly two hands

Held items never bring hands of their own. The grip of an item sits inside the
model's own hand (the lowest block of the forearm, found in `buildModel`); a two-handed weapon sits in one real
hand (staff, polearm or great weapon in the right, bow in the left) and the
other hand stays free. Long items are tested box by box against the head and
torso and step aside, then lean, until nothing overlaps (`clearBody`). Weapon
variants, models and icons live in `weapons.js`.


## Shared site (Netlify)

`site/island/` is the standalone page for players who get a link: the built
game, `three.min.js`, `LICENSE.txt`, third-party notices and `robots.txt`.
Netlify is connected to this repository and publishes that folder on every
push (`netlify.toml`: no build step, noindex headers). Always rebuild with

    cd beta/island/src && OUT=.. APP=../../../dist/island SITE=../../../site/island python3 build.py

so the in-app copy and the shared site stay in step.

## Rule: nothing overlaps

No panel, card, button, badge, minimap or bar may overlap another, not even by
a pixel, on any screen size; icons sit in the centre of their buttons. The
layout block at the end of `src/ui.css` places the top-left (menu button,
title, goal card), top-right (health, minimap, gold) and bottom corners (palms
with their item badges beside them, the dialog between them).
`tests/island-beta-browser.cjs` checks menu, editor, dialog and play HUD at
667x375, 844x390 and 1280x720.
