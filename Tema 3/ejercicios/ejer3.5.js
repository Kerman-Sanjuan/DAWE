const almacen = [
  { tipo: "lavadora", valor: 5000 },
  { tipo: "lavadora", valor: 650 },
  { tipo: "vaso", valor: 10 },
  { tipo: "armario", valor: 1200 },
  { tipo: "lavadora", valor: 77 },
];

let totalValorLavadoras = almacen
  .filter(function (a) {
    // Filtra cuando la funcion devuelve true
    return a.tipo == "lavadora";
  })
  .reduce(function (acum, item) {
    // Va acumulando el valor
    return acum + item.valor;
  }, 0);

console.log(totalValorLavadoras);
