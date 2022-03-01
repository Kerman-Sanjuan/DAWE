import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";
import { createBackgroundLayer } from "./layers.js";

export function loadImage(url) {
  // código del ejercicio 3 No se si esto esta bien
  return fetch(url).then((response) => {
    if (response.ok) {
      const img = new Image();
      img.src = url;
    } else {
      throw new Error("Something went wrong");
    }
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
    var tile = obj["tile"];
    for (var range in obj["ranges"]) {
      var lst = obj["ranges"][range];
      var x_p = lst[0];
      var xMax = lst[1];
      var y_p = lst[2];
      var yMax = lst[3];
      for (var i_2 = 0; i_2 < xMax; i_2++) {
        for (var j = 0; j < yMax; j++) {
          level.tiles.set(x_p + i_2, y_p + j, tile);
        }
      }
    }
  }
  console.log(level);
}

function loadSpriteSheet() {
  return loadJSON("/sprites/sprites.json")
    .then((sheetSpec) =>
      Promise.all([sheetSpec, loadImage(sheetSpec["imageURL"])])
    )
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(
        image,
        sheetSpec["tileW"],
        sheetSpec["tileH"]
      );
      for (var i = 0; i <= 1; i++) {
        sprites.defineTile(
          sheetSpec["tiles"][i]["name"],
          sheetSpec["tiles"][i]["index"][0],
          sheetSpec["tiles"][0]["index"][1]
        );
      }
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
