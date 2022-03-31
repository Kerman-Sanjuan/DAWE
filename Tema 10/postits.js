/* postits.js
 *
 */

window.onload = init;

function init() {
    var button = document.getElementById("add_button");
    button.onclick = createSticky;
    console.log(localStorage.length);
    Object.keys(localStorage).forEach((key) =>
        addStickyToDOM(localStorage.getItem(key))
    );

    // EJERCICIO A
    // cargar las notas postit de localStorage
    // cada nota se guarda como un par así: postit_X = texto_de_la_nota
    // donde X es el número de la nota
    // por cada una de ellas, llamar al método
    // addStickyToDOM(texto_de_la_nota);
    var remove_button = document.getElementById("remove_button");
    remove_button.onclick = clearStickyNotes;
    showStorage();
}

function createSticky() {
    // EJERCICIO B
    // crear la nota con nombre postit_X, donde X es un número entero
    // (postit_1, postit_2, ...)  y guardarla en el localStorage
    var value = document.getElementById("note_text").value;
    let startNumber = localStorage.length;
    console.log(`postit_${startNumber}`);
    localStorage.setItem(`postit_${startNumber}`, value);
    addStickyToDOM(value);
}

function addStickyToDOM(value) {
    var stickies = document.getElementById("stickies");
    var postit = document.createElement("li");
    var span = document.createElement("span");
    span.setAttribute("class", "postit");
    span.innerHTML = value;
    postit.appendChild(span);
    stickies.appendChild(postit);
    showStorage();
}

function clearStickyNotes() {
    // EJERCICIO C
    // Crear un nuevo botón en la ventana de postit notes que al pulsarlo,
    // elimine las notas de pantalla y de localStorage
    // Algoritmo:
    // obtener una referencia a la capa "stickies"
    // recorrer los hijos (childNodes) de esa referencia,
    // eliminándolos uno a uno (removeChild)

    var stickies = document.getElementById("stickies");
    var children = stickies.children;
    stickies.replaceChildren();
    Object.keys(localStorage).forEach((key) => {
        if (key.includes("postit_")) {
            localStorage.removeItem(key);
        }
    });
    showStorage();

}

//https://stackoverflow.com/questions/4391575/how-to-find-the-size-of-localstorage

function showStorage() {
    var _lsTotal = 0,
        _xLen,
        _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = (localStorage[_x].length + _x.length) * 2;
        _lsTotal += _xLen;
    }
    var espacioDisponible = document.getElementById("storage");
    espacioDisponible.innerHTML =
        "Current storage: " + (_lsTotal / 1024).toFixed(2) + " KB";
}
