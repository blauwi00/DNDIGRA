# Island beta (prototype)

A standalone playable prototype of the island game loop, built outside the main
game to try ideas quickly. `island.html` is the built page (Three.js r128 from
cdnjs); it is also published as a private Claude artifact for the owner.

What it tries: a generated 300x220 island (seed `helga`) streamed in chunks, with
the hand-made district Заводь in the north-west (dock, village, forest, ruins),
a capital with the king's castle, villages rich and poor, a quarry, bandit
camps, wild beasts; a room inside every building; townsfolk who work by day and
sleep at home; shops; a main story told step by step (Raven); two-hand
inventory with a bag; hero editor with peoples and classes; real-time exploring
with turn-based D&D-style fights (initiative, advantage, sneaking, companions,
morale, levels); reputation; day/night; rendered sound; local save.

Nothing here is wired into the game in `src/` yet; porting is a separate step.

## Build

    cd beta/island/src
    OUT=.. python3 build.py     # writes beta/island/island.html

Sources (`build.py` glues them into one page; `main.js` has placeholders such as
`{RIG}`, `{INTERIORS}`, `{COMBAT}`, `{EXTRAS}`, `{UI}`, `{LIFE}`, `{INTRO}`):

| File | What it holds |
|---|---|
| `main.js` | world grid, generated island layout, houses, walking, camera, frame loop, save |
| `islandgen.js` | seeded island generator: relief, rivers, roads, places |
| `interiors.js` | rooms of every building, their furniture and loot |
| `combat.js` | turn-based fights, companions, morale, experience and levels |
| `extras.js` | day and night, rendered sound effects, ambience |
| `ui.js`, `ui.html`, `ui.css` | wheels, menus, quest pointer, map, layout |
| `editor.js` | hero editor |
| `hands.js` | two hands, bag, chests, item icons |
| `villagers.js` | Заводь's villagers and their looks |
| `town.js` | townsfolk of the big island, the king's court, shops, homes at night, their talk |
| `story.js` | the big island's errands and the main story (Raven) |
| `life.js` | weather, daily routine, talk bubbles, animals, road events |
| `people.js` | people cards: role, temper, topics, lines |
| `economy.js`, `legend.js` | gold, shops, side jobs; reputation, the chapel artifact |
| `intro.js`, `settings.js` | opening, tutorial, settings |
| `rig.js`, `models.js`, `tex.js`, `weapons.js`, `beasts.js` | models, held items, textures, weapons, beasts |
| `races.js`, `classes.js` | peoples and classes |

Not tested on a physical iPhone; checked in desktop Chromium (software GL).

Fonts (Cormorant Garamond, PT Sans; SIL Open Font License) are inlined from `src/fonts.css` so text renders offline. The game's `dist/characters.js` is inlined too; rebuild the island after it changes.

## Rule: a character has exactly two hands

Held items never bring hands of their own. The grip of an item sits inside the
model's own hand (found in `buildModel` on the arm's own axis). Arms are never
posed for an item: they hang and swing naturally. Every item lies in the hand
horizontally, pointing forward; long shafts are gripped near their balance
point, a bow by the grip in the middle of its arc (never by the string), a
shield by the strap on its back, face out along the outside of the arm
(`holdItem` in `rig.js`).

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
