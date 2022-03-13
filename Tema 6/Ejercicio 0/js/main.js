import { loadLevel } from "./loaders.js";

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

let offset = 0;

loadLevel().then((level) => {
	level.draw(context, offset);

	document.addEventListener(
		"keydown",
		(event) => {
			if (event.code == "ArrowLeft") offset = offset + 10;

			if (event.code == "ArrowRight") offset = offset - 10; // Se supone que un jugador se mueve a la derecha, el fondo se mueve a la izq.
			level.draw(context, offset);
		},
		false
	);
});
