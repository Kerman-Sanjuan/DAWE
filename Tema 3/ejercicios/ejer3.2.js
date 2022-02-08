class Locutor {
  constructor(nombre, verbo) {
    this.nombre = nombre;
    this.verbo = verbo || "dice";
  }

  dice(text) {
    console.log(this.nombre + " " + this.verbo + " '" + text + "'");
  }
}

class Feriante extends Locutor {
  constructor(nombre) {
    super(nombre, "grita");
  }
  dice(text) {
    super.dice(text.toUpperCase());
  }
}

new Feriante("Mr. Crecepelo").dice("Me lo quitan de las manos");
