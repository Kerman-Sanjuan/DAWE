export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement("canvas");
  buffer.width = 600; // Solo he cambiado el numero.
  buffer.height = 600;
  const context = buffer.getContext("2d");

  level.tiles.forEach((v, x, y) => {
    sprites.drawTile(v, context, x, y);
  });
  return buffer;
}
