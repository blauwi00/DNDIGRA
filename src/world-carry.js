// Hero resources live at the snapshot root during play. Materialize one
// independent hero from a trusted saved snapshot for transfer or checkpointing.
// Environmental deltas remain with that snapshot; all actor property travels.
export function heroFromSnapshot(snapshot) {
  return Object.assign(structuredClone(snapshot.party[0]), {
    level: snapshot.level,
    xp: snapshot.xp,
    gold: snapshot.gold,
    potions: snapshot.potions ?? 0,
  });
}
