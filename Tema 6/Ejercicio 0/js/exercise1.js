import { Matrix } from "./math.js";

// Ejercicio 1 del apartado 5.2

var matrix = new Matrix();

for (var i = 0; i < 10; i++) {
  for (var j = 0; j < 10; j++) {
    matrix.set(i, j, i * 10 + j);
  }
}
console.log(matrix.grid);

matrix.forEach((valor, x, y) => console.log(valor + " " + x + " " + " " + y));
