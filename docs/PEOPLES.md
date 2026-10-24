# Peoples of the islands · 2026-10-24

Owner rule: a people's trait is a real game mechanic, not just a number on the
sheet, and no two peoples share the same main trait. Each people has exactly
one **main trait** (unique) and one **signature** (unique). Code:
`beta/island/src/races.js` (data and `applyRace`), hooks in `combat.js`,
`main.js` (`sees`, `notices`), `classes.js`, `economy.js`, `hands.js`, `ui.js`.
Checked by `tests/island-beta-browser.cjs` («peoples» step).

| People | Main trait (what changes) | Signature (what changes) |
|---|---|---|
| Человек | Торговая жилка: shops sell 20% cheaper, buy 25% dearer (`priceNow`) | Свой среди своих: side jobs pay ×1.5 (`jobPayFor`) |
| Эльф | Меткий глаз: +2 to bow hits (`ranged`) | Якорь памяти: once per rest the next attack has advantage |
| Дворф | Плотное тело: +5 health | Резонанс камня: +1 AC in ruins, graveyard and indoors (`heroAC`) |
| Гоблин | Юркость: +3 Stealth and, while sneaking, enemies see 30% closer (`sees`) | Ускользнуть: once per rest a sighting is ignored; 5 s unseen, crouching (`notices`) |
| Приливный народ | Сила прилива: +3 Athletics (shove) | Дитя прибоя: +1 to hit by the sea (≤4 cells) or in rain |
| Панцирный народ | Природные пластины: +2 AC | Спрятаться в панцирь: once per rest damage halved |
| Народ-симбионт | Симбиоз: all healing +3 (potion, bread, healing word, lay on hands) | Живая ткань: +1 health every 20 s out of combat |
| Сумеречный народ | Глаза сумерек: at night enemies see you at half distance, Stealth +2 | Чтение движения: the first enemy attack each fight has disadvantage |
| Эхоносец | Резонанс: +2 to spells | Проявить фрагмент: once per rest a missed attack is rerolled automatically |
| Полурослик | Глубокие карманы: bag of 10 slots instead of 8 | Везение: natural 1 on d20 is rerolled |
| Гном | Быстрый ум: +5 initiative | Смекалка: stones heard twice as far (14 cells); a distracted foe loses two turns |
| Голиаф | Мощь: +2 melee damage | Каменная стойкость: once per rest a blow is softened by 1d12+2 |
| Орк | Натиск: +2 melee hit | Неукротимость: once per rest stays up at 1 health |
| Тифлинг | Адская прыть: +2 cells of movement per combat turn | Адский отпор: once per rest answers a blow with 2d6 fire |
| Драконорождённый | Чешуя: every blow taken is 1 weaker (min 1) | Дыхание дракона: once per rest 2d6 fire on an adjacent foe |

Free main-trait slot for future peoples: walking speed outside combat.
Proposals for new peoples (owner to choose) must use mechanics that exist;
jumping and swimming do not exist yet.
