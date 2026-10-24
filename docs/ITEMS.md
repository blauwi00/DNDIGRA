# Items, artifacts and reputation · 2026-10-24

Owner decisions (island beta, `beta/island/src`):

## Rarity (`weapons.js`: `RARITY`, `rarityOf`, `ruleOf`)
Taken from D&D 5e, trimmed for a small island.

| Rarity | How it is found | What it gives |
|---|---|---|
| Обычный | shops, chests | plain gear, numbers of the class and weapon only |
| Необычный | smith, caches | a craftsman's +1 (any weapon with a hit or damage bonus) |
| Редкий | quests, dangerous places | one rule of its own |
| Легендарный | the end of a big story, 1–2 per world | a strong rule |
| Единственный | only from an artifact the hero kept | the only one in the universe, a very strong ability; never for sale |

Rare and legendary items prefer a rule to a number. Price is the weapon price × 3 (rare) or × 6 (legendary).
On the island: Клык вожака (wolves), Щит дозора Заводи (bandits), Булава упокоения (dead), Рунный клинок (prologue end, legendary).

## Artifacts
A story artifact is a state, not a rarity: the player decides its fate, and every outcome changes the world.
Chapel heart (`legend.js`), offered when the brazier is lit and again from the brazier until decided:
leave it (Заводь +3), break it (+1), keep it (becomes the unique «Пламенное сердце», Заводь −2: the fire is
visibly weaker), absorb it (power «Шаг пламени»: once per rest, a step to a random free cell 3–6 away).
Per docs/DEVELOPMENT_RULES.md, kept or absorbed artifacts may follow the hero into later stories.

## Limit
A hero holds at most **3** unique items and absorbed powers together (`UNIQUE_MAX`). At the limit the
keep/absorb choices are not offered.

## Reputation
Simple word scale per side: враг · чужак · знакомый · друг · герой (points ≤−3, −2…1, 2…4, 5…8, ≥9).
Shown only as a word in the hero menu; felt through village prices (×1.5 … ×0.8). It moves only for deeds
the side could know of: quests reported (+2), the prologue fire (+2), side jobs (+1, up to three),
a bandit killed in sight of another bandit (bandits −2). Bandits at «враг» spot the hero from farther.
Not decided yet: false rumours, guards, decay over time, other factions.
