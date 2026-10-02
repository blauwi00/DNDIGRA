# Новые ассеты

`dist/assets/cartoon-atlas.png`: новые мультяшные фигурки в четырёх направлениях, плитка, сундук, алтарь и колонна. 4 столбца, 5 рядов, прозрачный фон. Создано встроенной генерацией изображений по предоставленному референсу; простые формы и тёмный контур, без реалистичной детализации.

`dist/assets/cartoon-decor.png`: отдельные каменные блоки, скамья, арочная дверь и свеча. 2 × 2, прозрачный фон. Та же стилистика референса.

Изображения используются как игровые ассеты, интерфейс написан отдельно. Фигурки выводятся с фиксированной точкой подставки в центре клетки. Положение интерактивных объектов не зашито в фон.

`dist/assets/terrain-varied.png`: 4 × 3 atlas, первые восемь квадратов — разные плиты, последние четыре — разные стены. Новый встроенный imagegen по референсу диалоговой сцены.

`dist/assets/keeper.png`: портрет Эллен и её миниатюра, 2 × 1, прозрачный фон. Стилистика и одежда следуют приложенному референсу.

`dist/assets/hero-chapel.png`: отдельный пустой интерьер часовни для фона вкладки героя. Фигурка, стрелки, показатели и кнопки накладываются кодом, не входят в картинку.

## Soft chapel revision
- `dist/assets/terrain-soft.png`: replacement 4 × 3 terrain atlas generated with the built-in image tool using the combat reference as a style reference. Prompt: flat diffuse grey-beige floor, matched brightness, sparse cracks and moss, no raised floor rims or cast shadows; four softly shaded wall blocks.
- Floor variants retain one orientation. Wall faces point into the room, with their side face limited to 24% of the cell. Wide candle gradients are applied to the room rather than random per-tile lighting.

## Unlit terrain for dynamic lights
- `dist/assets/terrain-albedo.png` generated with the built-in image tool by editing the soft atlas. Prompt: preserve exact 4 × 3 layout, upper eight flat stone tiles, lower four brick shapes; remove directional highlights, cast shadows and the dark side band; match top and side material brightness so runtime lights can shade them.
- `terrain-soft.png` remains as a previous asset and is no longer loaded.

## Distinct materials
- `dist/assets/terrain-materials.png`: built-in image tool edit of neutral albedo atlas. Prompt: exact 4 × 3 layout; upper eight tiles cool slate with mineral veins and sparse moss; lower four wall blocks warm-grey porous limestone; no baked directional shadows; very subtle fine pixel-art edges, preserving painterly transitions.

## Visual lab assets
- `terrain-lab.png`: built-in generator, 4 × 3 opaque atlas. Eight cool slate variants, four neutral limestone blocks, low noise, sparse wear, matched material brightness, no cast light/shadows.
- `interior-lab.png`: built-in generator, 3 × 2 transparent atlas. Bookshelf, window, closed/open door, desk and training dummy; cute tabletop illustrated style, restrained detail. Alpha cropped per item, dummy base anchor measured independently.
- `items-lab.png`: built-in generator, 3 × 2 transparent atlas. Bow, sword, staff, potion, coins and letter. Used across inventory and hero screens.
All three were inspected; transparency was checked numerically for the two cutout sheets. Runtime lighting is a separate layer.

## Voxel revision
`src/voxel.js`: original procedural 3D environment, miniatures, furniture, doors, flames and inventory models. No generated raster masquerades as voxel geometry. Boxes are instanced by material; bases retain a modest polygon count and the original tabletop silhouette. UI model previews use a cached secondary Three renderer. Existing generated PNGs are fallback imagery. Three.js is the only imported rendering library; its MIT notice is included.
