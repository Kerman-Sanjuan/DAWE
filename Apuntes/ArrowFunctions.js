// Hay que asumir que en JS las funciones se pueden pasar como parametros.

function apply(num, f) {
  return f(num);
}

function siguiente(n) {
  return n + 1;
}
// Funcion definida previamente
console.log(apply(5, siguiente));

// Podemos pasar la misma funcion como parametro
console.log(
  apply(5, function (n) {
    return 2 * 5;
  })
);

// Aplicando funcion anonima, se hace sin el keyword y la flecha.
console.log(
  apply(5, (n) => {
    return 2 * 5;
  })
);

// En caso de ser una misma linea

console.log(apply(5, (n) => 2 * n));
prices = ["1","2"];
