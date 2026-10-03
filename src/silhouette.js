// Fill enclosed background regions so only the object's exterior is outlined.
// Pixels and queue are reused by the renderer; no per-frame allocation.
export function fillSilhouette(pixels, width, height, exterior, queue) {
  exterior.fill(0);
  let head = 0, tail = 0;
  const visit = i => {
    if (exterior[i] || pixels[i * 4] >= 128) return;
    exterior[i] = 1;
    queue[tail++] = i;
  };
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  while (head < tail) {
    const i = queue[head++], x = i % width;
    if (x) visit(i - 1);
    if (x < width - 1) visit(i + 1);
    if (i >= width) visit(i - width);
    if (i < width * (height - 1)) visit(i + width);
  }
  for (let i = 0; i < width * height; i++) {
    const value = exterior[i] ? 0 : 255;
    pixels[i * 4] = pixels[i * 4 + 1] = pixels[i * 4 + 2] = value;
    pixels[i * 4 + 3] = 255;
  }
}
