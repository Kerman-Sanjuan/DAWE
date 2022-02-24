// Call stacks
// 1. En cada momento debemos de estar dentro de una funcion, entonces, para eso esta el callstack.
// 2. Cuando se hace una llamda a la funcion, se llama al stack, y las funciones se apilan. Cuando ocurre un return, se desapila del call-stack.
//3. Cuando el callstack se ha vaciado, la ejecucion ha terminado. Esto es lo que falla, se imprime el callstack.
console.log("hola")
const e = 4

e