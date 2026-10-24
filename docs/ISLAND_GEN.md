# Island generator · 2026-10-24

Source: `beta/island/src/islandgen.js` (pure, seeded, no DOM). Test: `tests/island-gen.mjs` (CI).
Follows the approved settlement model from Notion «DNDIGRA — подробный план разработки» →
«Утверждённая модель расселения и зон».

## Order (as approved)
1. Relief: noise on an irregular island mask with a mountain spine; one connected landmass.
2. Water: rivers from the mountains run downhill to the sea; pits become lakes.
3. Biomes: sea, beach, meadow, forest, swamp (low and wet), hills, mountains, snow (high, colder to the north), lakes.
4. Capital: fertile land around, fresh water, a sheltered coast; its port is the nearest shore.
5. Roads: cheapest paths; rivers crossed at bridges, mountains avoided, existing roads reused.
6. Supplying villages: fertile, by fresh water, 26–90 cells from the capital; the best becomes the rich village.
7. Заводь: a fishing village 4–7 cells from the shore.
8. Working settlement: stonecutters by a quarry in the hills, with water.
9. Poor settlement: needs a cause (swamp or isolation), wealth capped at 1.
10. Bandit camps: 6–16 cells from a road, more than 40 from the capital and 22 from any village, by water; protective zone 20 cells.
11. Wild land: wolves in deep forest, boars on wooded hills, a bear in the mountains, far from roads.
12. Ruins: an old hill fort far from today's settlements, joined to the nearest road.
13. Wealth 0–4: fertility, water, trade (distance to the capital), craft, minus nearby threats.
14. Check (`IslandGen.check`): no overlapping physical or protective zones, every place has a cause,
    settlements and camps have fresh water (Заводь may use the sea), every settlement reaches one
    connected road network, all required places exist. A failing island is laid out again from a
    derived seed (`seed#1`…), at most 12 times, so a seed always gives the same island.

Size: 300×220 cells by default (the beta map is 80×60). Not yet in the game: this step only
produces the layout and its map (`IslandGen.drawMap`). Next: stream the terrain into the game,
move Заводь's content onto its generated place, then fill each place with people and animals.

## Owner decision · 2026-10-24
Keep the pier start on the larger island for now: the hero arrives at Заводь's pier as today.
The home-village start with two peaceful days and the trade carriage (Notion plan) is not
applied to the island yet.
