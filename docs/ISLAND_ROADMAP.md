# Island beta: from prototype to a large project · 2026-10-24

Owner asked to keep this. The island beta (`beta/island/`) grew fast as a
prototype; this records what will not scale and the agreed direction.
Nothing here is implemented yet; it is the plan to discuss and schedule.

## Owner decisions · 2026-10-24
- **Foundation**: the game starts on Helga's island for now; more islands come
  later, and this island may grow. Above all it must feel alive.
- **Peoples**: keep all 15 and add even more (the Notion note about only nine
  peoples is superseded by this).
- **First real release** (not beta): procedural islands, trade and a balanced
  gold economy; every island has its own big problem plus side jobs; more
  features to be invented along the way.
- **New peoples**: Claude proposes 5–8 new ones in the island world's spirit; the owner picks.
- **Paid peoples**: which stay free is decided later; for now all are open.
- **Now**: make the island more alive first — gold and trade, side jobs from
  villagers, more events — built as data a generator can later combine.
- **Money**: most likely paid peoples (races) as purchases. This needs a way to
  verify purchases (store receipts or accounts) before it ships.

## What does not scale today
- **Build**: ~20 source files are glued by text placeholders (`build.py`)
  into one ~800 KB page with a shared global scope. Name clashes and
  use-before-declare already happened (`wmat`, `W`, `tint`, `shadeC`).
- **Two games**: the main game (`src/`) and the island beta evolve apart;
  characters, weapons and rules are partly duplicated.
- **Content in code**: villager lines, weapons, peoples and classes live in
  JS instead of validated data that a generator can combine.
- **Checks**: browser test scripts live outside the repo and are run by
  hand; there is no CI for the island.
- **Process**: all work goes to one branch; version = number of island
  changes, not deliberate releases; decisions live in chat, not in issues.

## Target
1. Design document and staged plan (what is in the first release, what not).
2. One code base with modules and the existing esbuild pipeline.
3. Content as data (peoples, classes, weapons, villagers, quests, lines),
   validated and combined by the island generator (islands 10x larger,
   100+ villagers each).
4. Work tracked in GitHub Issues; each change on its own branch with a PR.
5. Island tests in the repo, run in CI on every change.
6. Releases: a stable build for players and a test build for the owner.

## Progress
- [x] Step 1 · 2026-10-24: island checks live in the repo and run on GitHub
  (`.github/workflows/island.yml`): `tests/island-beta.mjs`,
  `tests/island-build-fresh.mjs` (shipped pages match the sources) and
  `tests/island-beta-browser.cjs` (menu, settings, every look, two hands,
  kits, villager talks, tutorial).
- [ ] Step 2: content as data.
- [ ] Step 3: modules and the shared esbuild build.
- [ ] Step 4: decide how the island and the main game merge.

## Next steps (proposed)
- Move the island to modules and the shared build; keep behaviour identical.
- Move content to data files; keep the people-card format from `people.js`
  as the seed for generated villagers (role, temper, topics, lines).
- Bring the browser checks (tutorial, story, chaos, editor, all-looks,
  hair-on-arms, talk repeats) into `tests/` and CI.
- Decide with the owner how the island and the main game merge.
- AI villagers later: a server proxy with limits, the model only for the
  villager being talked to, people cards and short memories as context.

## Delivery today
- Shared site: Netlify publishes `site/island/` from branch
  `claude/affectionate-ritchie-sbvta3` on every push (see `netlify.toml`).
  A phone may show the old page until the tab is fully closed.
- Private Claude artifact for the owner; the repository is private.
