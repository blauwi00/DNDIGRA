# За гранью — prototype 0.1

Mobile-first solo tactical RPG prototype, Russian UI. Static HTML/CSS/Canvas/JS, no dependencies or external requests.

Run: `python3 -m http.server 8000 --directory public`

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
Five movement cells per combat turn; one action for attack or potion. Four-neighbor movement, blocked/occupied cells excluded; walls block line of sight. Bow range five Manhattan cells. Adjacent wall gives target +2 ranged AC (deliberately simplified, not strict D&D). Companions act then enemies. Reload preserves resolved state; no network requests or credentials in client.
