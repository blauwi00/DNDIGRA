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

Size: 300×220 cells (the old beta map was 80×60).

## In the game (step 2)
The game builds seed `helga` with a **stamp**: the hand-made Заводь district (the old 80×60 map with the
pier, village, chapel ruins, graveyard, forest and camp) keeps its own coast in the north-west corner, and its
eastern and southern shores grow into the big island. The generator never puts rivers, lakes or other places
inside it, and enters it through a gate road at (78,44). All old coordinates, quests, the tutorial and saves
stay as they were; house rooms moved from row 96 to `ROOM_Z` (below the island), and old saves inside a room
are moved with them.

Codes outside the district: `R` river/lake (water, not walkable), `M` rock and `N` snow (solid, raised),
`B` bog, plus `D` roads, `P` bridges, `C` town streets, `S` quarry/fort floor, `W` fort walls, `H` houses.
Generated places get: the capital's grid of cobbled streets and houses, village squares with houses (lighter
walls when rich, shabby when poor), the quarry, bandit camps with tents, fires and two bandits each, a wolf
pack of three, and the old fort's broken walls. Houses outside Заводь are locked for now; their people,
the bear and the boars (no models yet) come next.

Rendering: chunk streaming as in Minecraft. The island stays in memory as data (cells, heights, props);
meshes exist only for 16×16 chunks near the camera (`CHUNKS`, `defer`, `streamTick` in `main.js`).
Chunks within 40 cells are built nearest first, three per frame (all at once on the first frame);
chunks beyond 58 cells are removed and their own geometry freed; shared materials and base geometry are
never disposed. Picking lists (`pickable`, rock meshes) only hold built meshes. Interiors, actors and the
Заводь houses are not streamed. Measured in software-rendered Chromium: ~330 scene objects instead of
~2300, page ready 3.3 s (old small island 2.9 s), JS heap 42 MB (18 MB), render 7.2 ms. Not measured on a
phone. Checked by the «big island» step of `tests/island-beta-browser.cjs`.

## Owner decision · 2026-10-24
Keep the pier start on the larger island for now: the hero arrives at Заводь's pier as today.
The home-village start with two peaceful days and the trade carriage (Notion plan) is not
applied to the island yet.

## Step 3 · people and beasts
- Townsfolk (`life.js`, `TOWN`): the capital has 10 (guards with spears, traders, a scribe, a priestess…),
  villages 3–5 by wealth, the quarry 3, the poor settlement 3. They wander their square and talk about their
  own place (`townLines`): why it is rich or poor, the nearest bandit camp and beast lair, the capital's
  quarters and taxes; a line is never repeated before all are told.
- Beasts (`beasts.js`): boar and bear models with texel shading; two boars on the boar hills, a bear at its den.
- Four-legged skeleton (`buildQuad`, `quadPose` in `rig.js`): body, head, tail and four legs swinging in
  diagonal pairs. The wolf used the human skeleton before, so its front and back legs moved together.
- Kingdom standing (`legend.js`): every bandit killed raises it (up to four times); capital folk greet by it.
- Actors more than 44 cells from the camera are neither drawn nor moved until the hero comes near.

## Step 4 · trade, work and quests
- Shops (`economy.js`): the first trader of each settlement (a merchant in the capital). Prices follow the place:
  the capital sells dear (×1.15) and pays well for goods (×1.1) and buys weapons; a rich village is a little
  cheaper; the poor settlement sells little and dear (×1.3) and pays little (×0.7). The crown's standing
  (`repPriceK('kingdom')`) moves all these prices.
- Side jobs: every village and the quarry send a parcel (`parcel`) to the capital's merchant, the poor
  settlement to its nearest village; pay grows with the distance (×1.3 rich, ×0.6 poor). A capital guard pays
  for a round of four crossings around the market.
- Quests (`life.js`): a capital guard — clear the robbers' camp nearest the capital; the village nearest the
  boar hills — two boars; the stonecutters — the bear. Kills count only within 14 cells of that place;
  rewards give gold and the crown's standing.

## Owner decisions · 2026-10-24
- Townsfolk, quest givers, traders and job offers speak plainly, like ordinary people; no lofty or
  bookish phrases. Lines were rewritten accordingly.
- The island map zooms (pinch, wheel, the − and + buttons) and pans by dragging. The closest zoom shows
  one map pixel per screen pixel (`MV.max` from the device pixel ratio), so the picture never goes soft.
  The map is drawn at 8 pixels per cell for that.
