const almacen = [
  { tipo: "lavadora", valor: 5000 },
  { tipo: "lavadora", valor: 650 },
  { tipo: "vaso", valor: 10 },
  { tipo: "armario", valor: 1200 },
  { tipo: "lavadora", valor: 77 },
];

let totalValorLavadoras = almacen
  .filter(
    (a) =>
      // Filtra cuando la funcion devuelve true
      a.tipo == "lavadora"
  )
  .reduce(
    (acum, item) =>
      // Va acumulando el valor
      acum + item.valor,
    0
  );

console.log(totalValorLavadoras);
