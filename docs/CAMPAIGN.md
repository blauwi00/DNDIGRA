# Island campaign format · 2026-10-25

Owner direction: one island is one full story, like one party of «Подземелья
Чикен Карри»; it takes 60–90 minutes; the player learns it step by step from
people, clues and riddles; no speedruns; several ways through every obstacle
(fight, talk, sneak, use the world); choices change the ending. No paid AI is
needed: stories are assembled from authored parts (see ISLAND_ROADMAP.md).

## Parts of a campaign

- **Secret** — what is really going on (here: the crown's tax starves the poor;
  the robbers' chief is the guard captain who refused to collect it).
- **Acts** — 1: the trouble in plain sight; 2: the truth behind it; 3: the
  confrontation and its choice; 4: after. The act is derived from story state
  (`actNow` in `beta/island/src/campaign.js`) and announced when it changes.
- **Roles** — given to the island's people by the generator: ruler, chief
  villain, witness who talks for a favour, keeper of a clue, a wild power that
  can become an ally. Here: king Хальвдан, Рагнар «Ворон», the old woman of the
  poorest settlement, the guard list in the castle, Седой and his pack.
- **Episodes** — chains of steps; each step needs something the player must
  find or earn (trust, bread, a feather, night, strength). Here: the crown's
  errand, the old woman, the feather, the stone, the lair (`story.js`).
- **Ways** — every obstacle has more than one: the stone opens with the
  feather at night or by force (loud); Рагнар can be fought or talked down;
  the pack can be fought, persuaded, deceived, threatened or fed
  (`social.js`); camps can be fought, blown up or robbed (`worldacts.js`).
- **Facts** — every clue the hero learns is written into the chronicle
  (pause menu, «Летопись»): `CAMPAIGN.facts`, `learn(key)`.
- **Ending** — assembled from state: Рагнар's fate, the pack, the chapel
  heart, reputation (`epilogue`).

## Adding another secret (next step)

A secret is data: its facts, its roles (which kind of person plays each), its
episodes (steps with what each needs and where it happens) and its ending
lines. The generator picks one per new game, casts roles from the island's
people, places episode items in reachable places and checks the chain can be
finished. The Raven chain is the first such secret, still partly in code.
