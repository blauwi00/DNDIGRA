# Next stage: islands in the existing game

Status: implementation contract, not a released feature. The terrain kernel is
implemented in `src/islands/terrain.js`; the current game still uses frozen v3
scenes. Keep the current renderer, characters, editor and D&D controllers.

## One hero, many permanent island environments

Use one v4 campaign in the existing `worlds` row. Its current party and root
gold/potions/level/xp remain the sole authority for the hero. Keep the existing
one-active-world-per-hero index. An island quest concludes with an outcome and
an unlock; it must not mark the campaign completed, because completed legacy
worlds intentionally reject further saves.

Add small stores/tables for island descriptors and quest outcomes, sparse
10-cell chunk changes, and travel receipts. Never put hero resources or a hero
snapshot in an island, chunk or receipt. A revisit restores the island's
environment and overlays the current hero; it cannot restore an old inventory,
gold, potion count or combat reward.

Generator v4 remains additive. Versions 1/2/3 and their fixed-seed hashes stay
frozen. Keep immutable v4 campaign generation identity separate from mutable
current-island state. Store only descriptors and sparse changes, not a saved
600–1000-cell terrain grid or a copy of every rendered object.

## Paid ship travel

1. Prepare a canonical route and positive configurable fare. A new island
   requires the current island's logical quest outcome; visited islands remain
   reachable while another quest is unfinished. Reject combat, unconscious
   heroes and insufficient current gold.
2. Generate and validate the destination descriptor, port and initial chunks
   before charging. Stage rendering while the original campaign stays active.
   Use a short ship scene; no artificial readiness timer or sea events.
3. Commit against the observed campaign revision/current island and relevant
   environmental revisions. Save departure changes, charge the canonical fare,
   change arrival position and write a unique request receipt atomically.
4. Gate every D1 batch mutation on the same successful compare-and-swap token.
   A zero-row CAS does not itself roll back a D1 batch. In IndexedDB use one
   read/write transaction across campaign/environment/chunks/receipts, with
   generation and rendering outside the transaction.
5. A repeated request returns its receipt plus the current canonical campaign.
   Never replay an old receipt snapshot over newer hero property. Reusing the
   same request ID with different arguments is an error.

Every ship trip costs gold, including the first trip to a new island and every
return. Trade and side quests supply income; price balancing remains open.
Canonical, repeatable dock work can prevent an economic softlock without
respawning killed enemies or replenishing unique containers.

## Integration order and verification

First add v4 scene/sampling/collision contracts and water/coast rendering in the
existing detail and overview paths. Reserve terrain-kernel routes before
placing solid props. Then integrate canonical quest/trade commands and sparse
environment persistence, followed by two-phase travel and the current UI.
Finally improve the existing contextual tutorial and appearance-bound scenes.
Do not enable a partly integrated generator by default.

Verify preparation failure without payment, quest gates, unfinished-quest
revisits, permanent depletion, full hero property except the fare, concurrent
and repeated travel, changed receipt arguments, insufficient gold, stale
revisions, bounded UTF-8 payloads and legacy generator hashes. Real gameplay
content and device timing are necessary before claiming a 60–120-minute island
quest; a short path test or large empty map does not establish that duration.
