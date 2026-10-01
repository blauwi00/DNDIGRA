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
