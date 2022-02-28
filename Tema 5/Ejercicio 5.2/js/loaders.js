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
    //Objektu bat ateratzeko
    var objektua = backgrounds[i];
    var tile = objektua["tile"];
    var zerLista = objektua["ranges"];
    for (var j in zerLista) {
      //Objektuak dituen zerrenda ateratzeko
      var lista = zerLista[j];
      var xPos = lista[0];
      var yPos = lista[2];
      var xMax = lista[1];
      var yMax = lista[3];
      for (var u = 0; u < xMax; u++) {
        for (var w = 0; w < yMax; w++) {
          level.tiles.set(u + xPos, w + yPos, tile);
        }
      }
    }
  }
  console.log(level);
}

function loadSpriteSheet() {
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
          sheetSpec["tiles"][0]["index"][1]
        );
      }
    });
  return sprites;
}
export function loadLevel() {
  return loadJSON("/levels/level.json") // qué tiles hay que poner y dónde dentro de este nivel
    .then((levelSpec) =>
      Promise.all([
        levelSpec,
        loadSpriteSheet(), // cargar imágenes de un spritesheet como sprites
      ])
    )
    .then(([levelSpec, backgroundSprites]) => {
      const level = new Level();
      createTiles(level, levelSpec.backgrounds); // desplegar tiles en la estrucura Matrix

      const backgroundLayer = createBackgroundLayer(level, backgroundSprites); // cargar canvas
      level.background = backgroundLayer; // canvas buffer
      return level;
    });
}
