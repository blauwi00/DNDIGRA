# Промты для текстур острова (GPT)

Как пользоваться: в начало **каждого** запроса вставь общий кусок «Стиль», потом строку конкретной текстуры из списка. Одна картинка — одна текстура. Готовые картинки присылай мне как есть: я сам уменьшу их до строгой сетки 32×32 и проверю, что они бесшовно стыкуются.

## Стиль (вставлять всегда)

```
Pixel art texture for a dark fantasy medieval video game. Exactly 32×32 pixels of art, upscaled with hard nearest-neighbor edges to 1024×1024 so that every art pixel is a clean square block of 32×32 screen pixels. Strict square pixel grid, no anti-aliasing, no blur, no gradients inside a pixel, no dithering noise smaller than one art pixel.
Seamless tileable texture: the left edge continues the right edge and the top edge continues the bottom edge with no visible seam.
Flat orthographic view straight onto the surface, no perspective, no vanishing point, no drop shadows, no strong baked lighting, no vignette; only gentle shading inside the material itself.
Limited muted palette of 6–10 colours, slightly desaturated, earthy, moody, like an old northern island at dusk. Readable at small size.
Fill the whole square with the material only: no frame, no border, no text, no logo, no objects, no people, no background.
```

## Крыши

- `Roof of overlapping red-brown clay tiles in neat rows, each tile 4 art pixels wide, slight colour variation, a few chipped tiles.`
- `Roof of dark blue-grey slate shingles, irregular rectangles in staggered rows, thin dark gaps between them, a few lighter worn slates.`
- `Roof of weathered wooden shingles, grey-brown, staggered rows, visible wood grain lines, a few darker wet shingles.`
- `Thatched straw roof, golden-yellow straw bundles in horizontal layers, darker straw ends, a few loose strands.`
- `Turf roof: short dense grass with patches of moss and small dark soil gaps, cool green.`

## Стены

- `Lime-plastered wall, off-white with faint stains and a few cracks, very subtle texture.`
- `Vertical wooden plank wall, dark brown planks 4 art pixels wide, visible gaps, knots and nail heads.`
- `Log cabin wall, horizontal round logs stacked, darker grooves between logs, bark texture on log ends not visible.`
- `Rough fieldstone masonry wall, irregular grey and brown stones with dark mortar joints.`
- `Castle wall of large cut grey ashlar blocks in regular courses, thin light mortar, weathering streaks and a little moss at joints.`
- `Red brick wall, bricks 8×4 art pixels in running bond, dark mortar, a few darker burnt bricks.`

## Земля и дороги

- `Short meadow grass, several greens, tiny flowers as single pixels very rarely.`
- `Packed dirt road with small pebbles and cart ruts running horizontally.`
- `Town cobblestone street, rounded grey stones of varied size with dark gaps and a little moss.`
- `Wet muddy ground with puddle highlights and footprints.`
- `Sandy beach with tiny shells and darker wet sand patches.`
- `Forest floor: dark soil, fallen needles and leaves, small twigs.`

## Полы внутри домов

- `Wooden floorboards, warm brown, boards running horizontally, plank ends staggered, nail dots.`
- `Stone flagstone floor, large irregular flat slabs, dark joints, worn smooth centres.`
- `Packed earth floor with scattered straw.`

## Другое

- `Dark water surface of a cold sea, deep blue-green with small light ripple pixels.`
- `Wooden fence boards, weathered grey-brown, vertical, with a horizontal rail.`
- `Old iron-banded wooden door planks, dark wood with black iron straps and rivets.`

## Если картинка вышла плохо

- Размыто или с плавными переходами — допиши: `Hard pixels only, absolutely no smoothing.`
- Видна перспектива или тени — допиши: `Perfectly flat, viewed straight on, no light direction.`
- Видны края или шов — допиши: `Must tile seamlessly in all four directions.`
- Слишком ярко — допиши: `More muted and darker, dusk mood.`
