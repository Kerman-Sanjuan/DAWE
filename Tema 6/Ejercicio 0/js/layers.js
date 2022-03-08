export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 300;
  buffer.height = 300;
  const context = buffer.getContext("2d");

  // ejercicio 8 (Tema 5: Canvas)

  level.tiles.forEach((v, x, y) => {
    sprites.drawTile(v, context, x, y);
  });
  return buffer;
}
