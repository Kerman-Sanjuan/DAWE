import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";
import { createBackgroundLayer } from "./layers.js";

export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener("load", () => {
      resolve(image);
    });
    image.src = url;
  });
}

function loadJSON(url) {
  return fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Something went wrong");
    }
  });
}

function createTiles(level, backgrounds) {
  for (const i in backgrounds) {
    var obj = backgrounds[i];
    for (var range in obj["ranges"]) {
      var lst = obj["ranges"][range];
      var x_p = lst[0];
      var xMax = lst[1];
      var y_p = lst[2];
      var yMax = lst[3];
      for (var i_2 = 0; i_2 < xMax; i_2++) {
        for (var j = 0; j < yMax; j++) {
          level.tiles.set(x_p + i_2, y_p + j, obj["tile"]);
        }
      }
    }
  }
  console.log(level);
}

function loadSpriteSheet() {
  // Tengo que cambiar esta funcion.
  return loadJSON("/sprites/sprites.json")
    .then((sheetSpec) =>
      Promise.all([
        sheetSpec,
        loadImage(sheetSpec["imageURL"]), // cargar imágenes de un spritesheet como sprites
      ])
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(
        image,
        sheetSpec["tileW"],
        sheetSpec["tileH"]
      );
      for (var i = 0; i < 2; i++) {
        sprites.defineTile(
          sheetSpec["tiles"][i]["name"],
          sheetSpec["tiles"][i]["index"][0],
          sheetSpec["tiles"][i]["index"][1]
        );
      }
      return sprites;
    });
}
export function loadLevel() {
  return loadJSON("/levels/level.json")
    .then((levelSpec) => Promise.all([levelSpec, loadSpriteSheet()]))
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();
      createTiles(level, levelSpec.backgrounds);

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
      level.background = backgroundLayer;
      return level;
    });
}
