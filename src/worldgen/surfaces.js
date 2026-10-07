// Поверхности пола и стили стен. Генератор говорит, КАКАЯ поверхность в каждой клетке, а цвет и рисунок выбирает отрисовка.
// Поверхности ничего не блокируют: это только внешний вид пола, проходимость решает scene.tiles и предметы.
import { hash32 } from './rng.js';

export const SURFACES = {
  cobble: { code: 'c', name: 'Брусчатка', colors: [0x7c776b, 0x716c62, 0x86806f, 0x68645b] },
  flagstone: { code: 'f', name: 'Каменные плиты', colors: [0x9a968a, 0x8f8b80, 0xa39f93, 0x878378] },
  dirt: { code: 'd', name: 'Утоптанная земля', colors: [0x7a5e43, 0x6e5339, 0x84674a, 0x654c35] },
  grass: { code: 'g', name: 'Трава', colors: [0x5f8a4a, 0x558040, 0x6a9552, 0x4f7a3d] },
  planks: { code: 'p', name: 'Дощатый пол', colors: [0x9a7248, 0x8e6840, 0xa57c50, 0x84603a] },
  planks_dark: { code: 'q', name: 'Тёмные доски', colors: [0x6e4e32, 0x654629, 0x775638, 0x5c4128] },
  tiles: { code: 't', name: 'Кафель', colors: [0xb4aa96, 0xa89e8a, 0xbdb3a0, 0x9e9482] },
  carpet: { code: 'r', name: 'Ковёр', colors: [0x8a3a3a, 0x7e3232, 0x964444, 0x742c2c] },
  straw: { code: 's', name: 'Солома', colors: [0xcaa95a, 0xbe9e50, 0xd4b464, 0xb4944a] },
  stone: { code: 'S', name: 'Камень', colors: [0x6f7176, 0x65676c, 0x797b80, 0x5d5f64] },
  stone_dark: { code: 'D', name: 'Тёмный камень', colors: [0x54565b, 0x4b4d52, 0x5d5f64, 0x44464a] },
  moss: { code: 'm', name: 'Мшистый камень', colors: [0x4f6a47, 0x47613f, 0x58744f, 0x405a38] },
  cracked: { code: 'k', name: 'Потрескавшийся камень', colors: [0x5a5c61, 0x515357, 0x62646a, 0x4a4c50] },
  sand: { code: 'a', name: 'Песок', colors: [0xcdb98a, 0xc2ae80, 0xd6c496, 0xb8a478] },
  leaves: { code: 'l', name: 'Опавшие листья', colors: [0x8a6a35, 0x7d5f30, 0x96753c, 0x6f542a] },
  gravel: { code: 'v', name: 'Гравий', colors: [0x8a867c, 0x7f7b72, 0x949086, 0x76726a] },
  wet: { code: 'w', name: 'Сырой камень', colors: [0x45555f, 0x3e4d57, 0x4c5d68, 0x384650] },
};
export const SURFACE_BY_CODE = Object.fromEntries(Object.entries(SURFACES).map(([id, s]) => [s.code, id]));
export const WALL_STYLES = {
  plaster: { name: 'Штукатурка', colors: [0xcbbf9f, 0xc2b693, 0xd3c8a9] },
  timber: { name: 'Фахверк', colors: [0xb59a6a, 0xa98e5f, 0xbfa475] },
  brick: { name: 'Кирпич', colors: [0x9a5a45, 0x8f5140, 0xa5654f] },
  stone: { name: 'Камень', colors: [0x7d7f84, 0x74767b, 0x86888d] },
  rough: { name: 'Грубый камень', colors: [0x5f6166, 0x56585d, 0x686a70] },
  cave: { name: 'Скала', colors: [0x5a5448, 0x504b40, 0x645e50] },
  castle: { name: 'Крепостная кладка', colors: [0x8a8c90, 0x808286, 0x93959a] },
};
// Детерминированный цвет клетки: одна и та же клетка всегда одного оттенка.
export const surfaceColor = (id, x, y) => { const s = SURFACES[id] || SURFACES.stone; return s.colors[((Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0) % s.colors.length]; };
export const wallColor = (id, x, y) => { const s = WALL_STYLES[id] || WALL_STYLES.stone; return s.colors[((Math.imul(x, 73856093) ^ Math.imul(y, 19349663)) >>> 0) % s.colors.length]; };

// Гладкий шум по зерну: пятна одной поверхности на другой выглядят естественно, а не «солью».
export function noise2(seed, x, y) {
  const x0 = Math.floor(x), y0 = Math.floor(y), fx = x - x0, fy = y - y0, v = (a, b) => (hash32(seed + ':' + a + ',' + b) & 1023) / 1023, s = t => t * t * (3 - 2 * t);
  const a = v(x0, y0), b = v(x0 + 1, y0), c = v(x0, y0 + 1), d = v(x0 + 1, y0 + 1);
  return (a + (b - a) * s(fx)) * (1 - s(fy)) + (c + (d - c) * s(fx)) * s(fy);
}
// Пятна другой поверхности на основной: [id пятна, порог шума снизу или сверху]. Применяется только к проходимому полу.
const PATCHES = {
  cobble: [['dirt', 'hi', .74], ['gravel', 'lo', .13]],
  grass: [['dirt', 'hi', .78], ['leaves', 'lo', .12]],
  planks: [['planks_dark', 'hi', .8]],
  planks_dark: [['planks', 'hi', .86]],
  stone: [['cracked', 'hi', .78], ['moss', 'lo', .12], ['wet', 'lo', .04]],
  stone_dark: [['cracked', 'hi', .84], ['moss', 'lo', .07]],
  flagstone: [['cracked', 'hi', .86]],
  tiles: [['cracked', 'hi', .92]],
  dirt: [['gravel', 'hi', .8], ['straw', 'lo', .08]],
  sand: [['gravel', 'hi', .85]],
};
export function varyFloor(id, seed, x, y) {
  const p = PATCHES[id]; if (!p) return id;
  const n = noise2(seed + id, x / 3.2, y / 3.2);
  for (const [to, side, t] of p) if (side === 'hi' ? n > t : n < t) return to;
  return id;
}

