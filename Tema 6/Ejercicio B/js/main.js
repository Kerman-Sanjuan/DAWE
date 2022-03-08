import { loadLevel } from "./loaders.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;

loadLevel().then((level) => {
  level.draw(context, offset);

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.code == "ArrowRight") offset = offset + 15;
      if (event.code == "ArrowLeft") offset = offset - 15;

      level.draw(context, offset);
    },
    false
  );
});
