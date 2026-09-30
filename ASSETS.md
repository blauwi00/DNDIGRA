# Графика 0.2 — детальная настольная D&D

Создано встроенным image_gen, без CLI/API-ключа. Изображения включены в проект, оригиналы сохранены. Карта и её точная геометрия рисуются кодом; нейросеть создала только художественные материалы. Атлас используется через source rectangles в Canvas, без изменения исходного PNG.

## Миниатюры и предметы

Файл: `/workspace/scratch/8a454c7988e7/lantern-table/dist/assets/miniatures-v2.png`

1254×1254, RGBA. Следопыт, маг, защитник, скелет, сундук и алтарь.

Промпт:

> Use case: stylized-concept. Asset type: production game sprite atlas for a detailed premium tabletop fantasy RPG on a phone. Create ONE transparent PNG sprite sheet, square, exactly 2 columns by 3 rows of equal square cells, no cell borders or labels. Each miniature fully isolated on alpha with ample transparent padding (occupy central 70% of its cell), no overlap. All viewed from overhead at roughly 75 degrees down, same camera and dramatic but readable miniature photography lighting. Highly detailed hand-painted resin miniatures, sculpted silhouette, subtle edge highlights and textured materials, NOT icons, NOT flat cartoons. Row 1 left: hooded woodland ranger with moss-green cloak, leather armor, longbow and quiver, standing on round dark stone display base. Row 1 right: female mage with aubergine-purple cloak, silver hair, wooden staff tipped with restrained pale cyan crystal, on matching round stone base. Row 2 left: stout heavily armored guard, blue-grey steel plate, broad shield, sword, matching round stone base. Row 2 right: sinister animated skeletal chapel guardian with tarnished bronze helmet, ivory bone skull, rusted blade, ragged oxblood tabard, matching round stone base. Row 3 left: closed detailed oak treasure chest with aged brass bands, no base. Row 3 right: small ancient pale carved limestone altar with a tiny silver bell clapper, two candles, no base. This is a sprite atlas, not a scenic composition. Consistent scale and orientation. No text, no UI, no scenery, no colored backdrop. Genuine transparent background. Save output as a project asset and make its local file path available.

## Камень

Файл: `/workspace/scratch/8a454c7988e7/lantern-table/dist/assets/limestone-v2.png`

1254×1254, RGB. Используется для пола, облицовки стен и приглушённой фоновой фактуры.

Промпт:

> Use case: stylized-concept. Asset type: high-quality 2D game environment material texture, for a premium painted tabletop fantasy chapel. A full-bleed square orthographic overhead view of an ancient limestone flagstone floor. Entire image filled with tightly fitted irregular rectangular flagstones, roughly 8 across and 8 down, variations in slab size, subtle chipped bevels, fine weathered porous stone grain, hairline cracks, small moss in a few seams, a few tiny dusty leaves. Restrained warm grey, desaturated sage, brown limestone, natural realistic painted resin tabletop material. Soft ambient light from upper left, no dramatic large shadows or vignette baked in; lighter readable middle values. Rich tactile detail, physically believable mortar seams, like a handcrafted high-end miniature dungeon floor photographed straight down. NO walls, NO room layout, NO furniture, NO figures, NO UI, NO typography, NO grid overlay, NO large patterns, NO black background. This is only a reusable surface material, not a map. Square seamless feel.
