class Punto {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  suma(P) {
    return new Punto(this.x + P.x, this.y + P.y);
  }
}

console.log(new Punto(1, 2).suma(new Punto(2, 1)));
