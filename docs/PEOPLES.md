# Peoples of the islands · 2026-10-24

Owner rule (2026-10-24, replaces the earlier main-trait/signature table): a people
gives **no plus to any roll or to the sheet**. Health, defence, hit, damage, stealth,
athletics, speed and initiative come from the class alone. Each people instead has
exactly one **ability** of its own (no two share it) and at most a small natural
**perk** that is not a roll bonus. Strikes are 2d6 against a save DC 13 for every
class. Code: `beta/island/src/races.js` (`ab`, `perk`, ability flags, `applyRace`),
`combat.js` (`raceBlast`, `hurt`), `ui.js` wheels, `main.js` (`notices`), `economy.js`, `hands.js`.
Checked by `tests/island-beta-browser.cjs` («peoples» step).

| People | Ability (once per rest unless noted) | Perk |
|---|---|---|
| Человек | Собраться: bonus action, next attack with advantage | Торговая жилка: prices 20%/25% better, side jobs ×1.5 |
| Эльф | Эльфийская точность: a missed attack is rerolled automatically | — |
| Дворф | Каменная стойкость: a blow of 5+ is softened by 1d12+2 | — |
| Гоблин | Ускользнуть: a sighting is ignored; 5 s unseen, crouching | — |
| Приливный народ | Удар волны: action, 2d6 up to 3 cells and knocks prone; Str save halves, stays up | — |
| Панцирный народ | В панцирь: bonus action, the next blow is halved | — |
| Народ-симбионт | Живая ткань: bonus action, heals 2d4+2 | +1 health every 20 s out of combat |
| Сумеречный народ | Чтение движения: the first enemy attack each fight has disadvantage (every fight) | — |
| Эхоносец | Эхо-крик: action, 2d6 up to 5 cells; Wis save halves | — |
| Полурослик | Везение: a natural 1 on d20 is rerolled (always) | Глубокие карманы: bag of 10 slots |
| Гном | Смекалка: stones heard twice as far; a distracted foe loses two turns (always) | — |
| Голиаф | Сила великана: bonus action, next melee hit +1d8 | — |
| Орк | Неукротимость: stays up at 1 health | — |
| Тифлинг | Адский отпор: answers a blow with 2d6 fire | — |
| Драконорождённый | Огненный шар: action, 2d6 fire up to 4 cells; Dex save halves | Огнестойкость: fire damage taken is halved |

Proposals for new peoples (owner to choose) must use mechanics that exist;
jumping and swimming do not exist yet.

## Решение владельца 2026-10-26: ночное зрение
Ночное зрение у народа разрешено как его особенность, но оно ограничено (небольшой радиус вокруг героя) и заметно на экране: в этом радиусе ночь видна приглушённо и без цвета, за его краем — обычная тьма.
