# Визуальные ориентиры

Просмотрены готовые наборы и первичная документация:

| Источник | Что использовано как ориентир |
| --- | --- |
| [Kenney Tiny Dungeon](https://kenney.nl/assets/tiny-dungeon), CC0 | Читаемые силуэты, умеренная детализация |
| [Kenney Roguelike/RPG](https://kenney.nl/assets/roguelike-rpg-pack), CC0 | Общая система материалов и предметов |
| [0x72 DungeonTileset II](https://0x72.itch.io/dungeontileset-ii), CC0 | Разделение пола, стен, объектов, небольшие анимации огня |
| [lighting-2d](https://github.com/basementuniverse/lighting-2d), MIT | Отдельная light map, короткие тени предметов, мягкое затухание |
| [Tiled terrains](https://docs.mapeditor.org/en/stable/manual/terrain/) | Соседи определяют грани стен и углы |
| [Phaser tweens](https://docs.phaser.io/phaser/concepts/tweens) | Плавное easing, короткие последовательности эффектов |

Код библиотек и готовые ассеты этих авторов не включены в проект. Реализация освещения и анимаций собственная, изображения созданы встроенным генератором по выбранному пользователем стилю. Phaser не установлен.

Исправлены основные несогласованности: однотипные шумные тайлы, неизменная тень с одной стороны стен, тяжёлый блок цели, отсутствие NPC в свободной комнате, разные стили предметов в интерфейсе. Слои пола/стен/предметов/героев/освещения отделены. UI сохраняет изумрудную палитру и тёплое золото.

Дальнейшие полезные улучшения после визуальной проверки: проверки навыков d20 с последствиями, укрытия и преимущество/помеха, карточки состояний, журнал причин бросков. Сначала имеет смысл утвердить читаемость карты на телефоне. ИИ должен предлагать историю, а правила и состояние должны проверяться детерминированным движком.

## Voxel references and adopted dependency
- [Three.js](https://github.com/mrdoob/three.js), MIT: actual adopted dependency, pinned 0.186.1. Orthographic camera, raycast selection, instancing, point lights with distance decay, PCF shadows.
- [Godot Tactical RPG](https://github.com/ramaureirac/godot-tactical-rpg), MIT: camera/grid/module reference; code not ported.
- [Project Tactics](https://github.com/Project-Tactics/Project-Tactics), MIT: tactical framework reference; no code included.
- [Veloren](https://veloren.net/), GPLv3: visual reference for block-based volume. Models/code not copied.
- [SRD 5.2.1](https://media.dndbeyond.com/compendium-images/srd/5.2/SRD_CC_v5.2.1.pdf), CC BY 4.0: rules source. Attribution and adapted scope are in rules.html.
