# За гранью — личный визуальный полигон

Статическая HTML/CSS/Canvas реализация. Четыре вкладки: карта, герой, рюкзак, тест. Изогнутое ателье 18 × 14 и отдельная крипта 13 × 12 соединены переходами. Камера поддерживает перетаскивание, pinch zoom, кнопки масштаба, центрирование и обзор всей карты. Выбор клетки показывает контур и маршрут; движение подтверждается кнопкой «Идти».

## Игровая геометрия
Позиции целочисленные. Центр подставки находится в `(x + .5, y + .5)`. BFS, атаки и повороты используют четыре направления. Слой предметов и фигур сортируется по строке. Враги также поворачиваются перед шагом и ударом. Маг и лук стреляют только по строке/столбцу с прямой видимостью.

## Личный тест
NPC находится в ателье с самого начала. Манекены не умирают; бой запускается отдельно. В «Тесте» доступны 19 кнопок и настройки освещения: переходы, NPC, манекены, бой, восстановление, переключение дверей, повторение урона/крита/промаха, сброс добычи, монеты, опыт, диалоги и полный сброс.

Сохранение локальное: `beyond-visual-lab-1`. Старые сохранения не подхватываются. Броски d20 используют crypto.getRandomValues с rejection sampling. Диалоги сценарные. ИИ-ведущий, Telegram, мультиплеер и генерация кампании не подключены.

## Визуал
Мягкие варианты сланцевого пола и известняковых стен. Грани стен определяются соседними клетками, включая внутренние углы. Освещение отдельно от тайлов: видимость ограничена архитектурой и закрытыми дверями; короткие мягкие тени предметов и персонажей меняются при движении. Свечение факелов небольшое. Живой свет обновляется примерно 12 раз в секунду и останавливается в скрытой вкладке. Внутренний объём нарисованных спрайтов остаётся статическим: это 2D приближение без normal maps.

Анимации: плавные шаги, поворот ракурса, выпад, снаряд, вспышка удара, цифры урона, крит, промах, лечение, искры и факелы. Учитываются reduced motion и переключатель анимаций. Предметы в герое и рюкзаке используют общий набор иллюстраций.

## Проверка
Синтаксис JS, git diff --check. Actual DOM (linkedom) + native Canvas: карты, двери, переходы, центры фигур, кардинальные ходы/атаки, NPC, все вкладки, предметы, манекены, бой и ход врагов, настройки теста, камера и сохранение. Рендер карт отдельно просмотрен. Настоящий браузер/CSS и iPhone жесты пока не проверены.

Источники и принятые решения: VISUAL_NOTES.md.

## Voxel + D&D revision

`src/voxel.js` generates actual 3D meshes; `npm run build` bundles Three.js 0.186.1 (MIT) into the static `dist/voxel.js`. Dependencies and lockfile are tracked; Three's license is served at `dist/THREE-LICENSE.txt`. Original box-based models are instanced by material; no external voxel art or Godot code was copied. Fixed overhead camera with slight tilt, raycast selection, pan/pinch, integer positions and base centers. Main map, hero/target portraits, NPC and item icons share these models, with the previous PNGs retained as WebGL/fallback assets.

Portrait layout compacts header/party, gives the map most of the first viewport, overlays the full last roll on the map, and puts dialogue in a bottom sheet. Four tabs and all earlier test tools remain. The Test tab adds three gradual rule stages and state toggles.

`dnd.js` isolates dice/checks/attack formulas, six abilities, proficiency, initiative, critical dice, healing and death saves. `game.js` owns individual turns, reactions, opportunity attacks, actions, bonus actions, selected class features/spells, concentration and rests. `visibility.js` calculates bright/dim/dark areas independently of presentation, uses wall/closed-door rays, portable torches and ranger darkvision. Light visuals use inverse-square attenuation, quantized flame/source motion and low-resolution soft shadow maps refreshed at ~10Hz; normal animation is capped at 25fps. Known walls remain visible. Light settings and reduced motion are respected.

New save key `beyond-voxel-dnd-1`. Rule scope, house rules and attribution are visible in `dist/rules.html`. SRD 5.2.1/CC BY 4.0 is the base, with cardinal movement/aim and a limited class/spell subset. NPC remains scripted; this update adds no LLM, multiplayer or Telegram backend.

QA: successful JS syntax checks, production bundle, native DOM integration and actual Three geometry/model/camera checks. Tests exercise all dice, advantage/disadvantage, attack vs AC, natural 1/20, doubled critical dice, death saves, cardinal moves, model base centers, door collision, portals, NPC, six abilities, level growth, tabs, visibility, initiative/turns, dummies, rests, healing, spells and persistence. A software projection of actual meshes was inspected for geometry. Browser/WebGL shader rendering and actual iPhone performance/touch QA are unavailable in this execution environment and are not claimed as tested.

### Torch artifact / small brightness adjustment
Flames and other luminous voxel effects now use unlit MeshBasicMaterial with toneMapped=false and neither receive nor cast shadows, including compacted instances. Point origins sit above the flame blocks. This removes a suspected near-source self-shading artifact reported as a moving black square; actual iPhone confirmation is pending. Ambient hemisphere base increased 0.18 → 0.22 and directional fill 0.23 → 0.25, applying also to existing saves without resetting settings or progress. Torch intensity/range and character occlusion remain unchanged.
