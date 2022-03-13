window.onload = () => {
	let canvas = document.getElementById("canvas");
	let imagen = new Image();
	imagen.src = "./sprites/spritesheet.png";

	let sprites = new Image();
	sprites.src = "./sprites/spritesheet.png";

	let context = canvas.getContext("2d");
	let x = 0;
	let y = 0;
	sprites.onload = update;

	document.addEventListener("keydown", (event) => {
		switch (event.key) {
			case "ArrowLeft":
				if (x != 0) {
					x--;
					update();
				}
				break;
			case "ArrowRight":
				if (x != 476 - 28) {
					x++;
					update();
				}
				break;
			case "ArrowUp":
				if (y != 0) {
					y--;
					update();
				}
				break;
			case "ArrowDown":
				if (y != 480 - 36) {
					y++;
					update();
				}
				break;
		}
	});

	function update() {
		context.drawImage(imagen, 0, 0);
		context.clearRect(500, 0, canvas.width, canvas.height);
		context.drawImage(sprites, x, y, 28, 36, 500, 0, 56, 72);
		context.beginPath();
		context.strokeStyle = "red";
		context.lineWidth = "2";
		context.rect(x, y, 28, 36);
		context.stroke();
	}

};
