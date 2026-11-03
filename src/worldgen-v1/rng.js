// Детерминированная случайность по зерну. Зерно — любая строка или число (как в Майнкрафте): «hello», «12345», «Тихий Лог».
// Состояние 128 бит (sfc32), оно выводится из строки четырьмя независимыми хешами, поэтому разные зёрна почти наверняка дают разные миры:
// число миров не ограничено 32 битами, а определяется только длиной строки.
// fork(метка) строит независимый поток из пути «зерно/метка», не зависящий от того, сколько чисел уже взято:
// места генерируются лениво и в любом порядке, но всегда одинаково.
export function hash32(str, salt = 0) {
  let h = (1779033703 ^ str.length) + Math.imul(salt, 0x9E3779B1) | 0;
  for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; }
  h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909);
  return (h ^ h >>> 16) >>> 0;
}
export function randomSeed() { // новое случайное зерно для «Новый мир»
  const abc = 'abcdefghjkmnpqrstuvwxyz23456789'; let s = ''; for (let i = 0; i < 10; i++) s += abc[Math.floor(Math.random() * abc.length)]; return s;
}
export class Rng {
  constructor(seed) {
    this.path = String(seed);
    this.a = hash32(this.path, 1); this.b = hash32(this.path, 2); this.c = hash32(this.path, 3); this.d = hash32(this.path, 4);
    for (let i = 0; i < 15; i++) this.next();
  }
  next() { // sfc32
    const t = (this.a + this.b | 0) + this.d | 0; this.d = this.d + 1 | 0; this.a = this.b ^ this.b >>> 9; this.b = this.c + (this.c << 3) | 0; this.c = this.c << 21 | this.c >>> 11; this.c = this.c + t | 0; return (t >>> 0) / 4294967296;
  }
  int(a, b) { return a + Math.floor(this.next() * (b - a + 1)); }       // включительно
  chance(p) { return this.next() < p; }
  pick(list) { return list[Math.floor(this.next() * list.length)]; }
  shuffle(list) { const a = list.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(this.next() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  weighted(pairs) { let total = 0; for (const [, w] of pairs) total += w; let r = this.next() * total; for (const [v, w] of pairs) { r -= w; if (r < 0) return v; } return pairs[pairs.length - 1][0]; }
  fork(label) { return new Rng(this.path + '/' + label); }
}

