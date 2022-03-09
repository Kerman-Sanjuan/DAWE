window.onload = () => {
  let canvas = document.getElementById("canvas");
  let x = 0;
  let y = 0;
  let imagen = new Image();
  imagen.src = "./sprites/spritesheet.png";

  let sprites = new Image();
  sprites.src = "./sprites/spritesheet.png";

  let context = canvas.getContext("2d");
  sprites.onload = update;

  function update() {
    context.drawImage(imagen, 0, 0);
    context.clearRect(500, 0, canvas.width, canvas.height);
    context.drawImage(sprites, x, y, 28, 36, 500, 0, 56, 72);
    context.beginPath();
    context.lineWidth = "2";
    context.strokeStyle = "red";
    context.rect(x, y, 28, 36);
    context.stroke();
  }

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowLeft":
        if (x != 0) {
          x--;
          update();
        }
        break;
      case "ArrowRight":
        if (x != 476 - 29) {
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
        if (y != 480 - 37) {
          y++;
          update();
        }
        break;
    }
  });
};
