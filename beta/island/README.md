# Island beta (prototype)

A standalone playable prototype of the island game loop, built outside the main
game to try ideas quickly. `island.html` is the built page (Three.js r128 from
cdnjs); it is also published as a private Claude artifact for the owner.

What it tries: a generated 300x220 island (seed `helga`) streamed in chunks, with
the hand-made district Заводь in the north-west (dock, village, forest, ruins),
a capital with the king's castle, villages rich and poor, a quarry, bandit
camps, wild beasts; a room inside every building; townsfolk who work by day and
sleep at home; shops; a main story told step by step (Raven); two-hand
inventory (each hand with its own pouch); hero editor with peoples and classes; real-time exploring
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
| `settle.js` | layout 2 of the settlements: grown streets, plots with yards, fences and barns, the walled capital with gates, castle, market, temple, port, mill and tannery, fields round every place (pure data; `main.js` draws it). A save made before layout 2 keeps the old grid layout. Layout 3 (every new world): a castle at real scale (thick walls, towers, a four-storey keep, chapel, kitchens, barracks, stables, well) and the capital round it; a layout 2 save keeps its towns |
| `kingdom.js` | guards at the castle's closed doors; reputation with the kingdom opens them (never the treasury); attacking a guard makes the crown an enemy (saved) |
| `interiors.js` | rooms of every building, their furniture and loot. Every building (Заводь's too, from layout 2) is entered by walking in: its roof and front wall lift away. Only attics, cellars and upper floors are rooms of their own (one map cell holds one floor). In layout 3 a dwelling is parted into rooms by plank walls with doorway gaps; nothing is placed where it would cut off a room, chest or ladder |
| `combat.js` | turn-based fights, companions, morale, experience and levels |
| `extras.js` | day and night, rendered sound effects, ambience |
| `ui.js`, `ui.html`, `ui.css` | wheels, menus, quest pointer, map, layout |
| `editor.js` | hero editor |
| `hands.js` | two hands, a pouch for each hand, chests, item icons |
| `villagers.js` | Заводь's villagers and their looks |
| `town.js` | townsfolk of the big island, the king's court, shops, homes at night, their talk |
| `story.js` | the big island's errands and the main story (Raven) |
| `social.js` | talk actions (persuade, deceive, intimidate, gift), Седой and his pack |
| `worldacts.js` | actions by a thing's properties: oil barrels, locked chests |
| `campaign.js` | the island's campaign: acts, chronicle of learned facts, ending (docs/CAMPAIGN.md) |
| `life.js` | weather, daily routine, talk bubbles, animals, road events |
| `people.js` | people cards: role, temper, topics, lines |
| `economy.js`, `legend.js` | gold, shops, side jobs; reputation, the chapel artifact |
| `intro.js`, `settings.js` | opening, tutorial, settings |
| `rig.js`, `models.js`, `tex.js`, `weapons.js`, `beasts.js` | models, held items, textures, weapons, beasts |
| `races.js`, `classes.js` | peoples and classes |

Not tested on a physical iPhone; checked in desktop Chromium (software GL).

Fonts (Cormorant Garamond, PT Sans; SIL Open Font License) are inlined from `src/fonts.css` so text renders offline. The game's `dist/characters.js` is inlined too; rebuild the island after it changes.

## Rule: each hand has its own pouch
Each hand holds one thing and has its own pouch (4 slots, a halfling 5). The
player decides what goes where: tap an item and then a slot, or drag it.
Tapping either palm opens both hands; opening a chest opens both hands inside
the chest window. Only what is in a hand can be used: a potion in a pouch must
first be taken into a hand («Взять в руку», a bonus action in a fight), and
attacks and staff sparks come only from held weapons. A two-handed item fills
both hands. Old saves with one shared bag are split on load: weapons to the
right pouch, potions and food to the left, the rest where there is room.

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
