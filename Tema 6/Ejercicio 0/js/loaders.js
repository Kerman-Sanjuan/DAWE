import Level from "./Level.js";
import SpriteSheet from "./SpriteSheet.js";
import { createBackgroundLayer } from "./layers.js";

export function loadImage(url) {
	// https://stackoverflow.com/questions/52059596/loading-an-image-on-web-browser-using-promise
  return new Promise((resolve) => {
    let image = new Image();
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
  for (let i in backgrounds) {
    let obj = backgrounds[i];
    for (let range in obj["ranges"]) {
      let lst = obj["ranges"][range];
      for (let i_2 = 0; i_2 < lst[1]; i_2++) {
        for (let j = 0; j < lst[3]; j++) {
          level.tiles.set(lst[0] + i_2, lst[2] + j, obj["tile"]);
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
	    let tileWidth = sheetSpec["tileW"];
	    let tileHeight = sheetSpec["tileH"];
            const sprites = new SpriteSheet(image,tileWidth,tileHeight);
      for (let i = 0; i < 2; i++) {
	      let nombre = sheetSpec["tiles"][i]["name"];
	      let X = sheetSpec["tiles"][i]["index"][0];
	      let Y = sheetSpec["tiles"][i]["index"][1];
        sprites.defineTile(nombre,X,Y);
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
