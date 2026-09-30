# За гранью — prototype 0.1

Mobile-first solo tactical RPG prototype, Russian UI. Static HTML/CSS/Canvas/JS, no dependencies or external requests.

Run: `python3 -m http.server 8000 --directory dist`

## Agreed direction
- Replaces the earlier train-game project; do not modify that project's files.
- Top-down map, tabletop figurines, tactical grid combat with distance/cover.
- One player character plus automated companions; later human multiplayer via Telegram Mini App and group bot.
- AI game master with narrative continuity, procedural locations and illustrations, persistent characters, inventory, currency, leveling, character switching and contextual guidance.
- Story-dependent atmosphere; no voice in first release.
- User currently develops/tests from iPhone only.

## Implemented
Handcrafted chapel encounter, pathfinding, movement confirmation, locked door d20 checks, simplified cover/line of sight, hero and two rule-driven companions, two enemies, turn order, cryptographic browser dice using rejection sampling, chest/coins/potions, quest relic, exit, first level up, defeat/restart, event journal and localStorage persistence. Illustrations and figurines are code-drawn; no image model or procedural topology is implemented.

## Explicit limitations
No AI, server, Telegram integration, multiplayer, accounts, cloud persistence or anti-cheat yet. NPC companion turns are rules-based. Browser dice are not server-authoritative and state is editable on the device. Scenario text is scripted. Free-text action is saved as a draft only and never presented as an AI response. The map topology is fixed; a random seed changes tile texture only. Character name is seeded for the user's test. Follow-up must connect a real narrative model behind a server, canonical event store and rule validation, then procedural content and multiplayer. Do not claim these are already implemented.

## Design
Five movement cells per combat turn; one action for attack or potion. Four-neighbor movement, blocked cells excluded; friendly units can be traversed but cannot share destinations; walls block line of sight. Bow range five Manhattan cells. Adjacent wall gives target +2 ranged AC (deliberately simplified, not strict D&D). Companions act then enemies. Reload preserves resolved state; no network requests or credentials in client.

## Visual update 0.2
Detailed tabletop art with generated transparent miniature atlas and limestone texture, exact code-owned walls and collision grid, layered shadows, moonlight, torch flicker and dust, route-based hero animation, miniature portraits, a faceted d20 and warm metal framing. Animation stops offscreen, pauses in hidden tabs and respects reduced-motion preference. Original localStorage key and save schema are retained. Asset provenance and prompts: ASSETS.md.

Validation: Playwright at 390px and 320px widths, no horizontal overflow or runtime errors; existing full gameplay test covers movement, reload, door, combat, loot, relic, exit, level 2 and save restoration. Browser tests use controlled random values only inside the test page; production uses crypto.getRandomValues unchanged.
