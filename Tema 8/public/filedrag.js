// getElementById
function $id(id) {
    return document.getElementById(id);
}

// output information
function output(msg) {
    var m = $id("messages");
    m.innerHTML = m.innerHTML+msg;
}

// file drag hover
function fileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    e.target.className = e.type == "dragover" ? "hover" : "";
}

// file selection
function fileSelectHandler(e) {
    // cancel event and hover styling
    fileDragHover(e);

    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;

    if (e.constructor.name != "DragEvent") {
        // process all File objects
        for (var i = 0, f; (f = files[i]); i++) {
            parseFile(f);
        }
    }

    // files can be added by drag&drop or clicking on form's button
    // if the later, append files to form files field
    var formFiles = $id("upload").fileselect;
    if (formFiles.files.length == 0) {
        formFiles.files = files;
    }
}

// output file information
function parseFile(file) {
    output(
        "<p>Datos del fichero: <strong>" +
            file.name +
            "</strong> Tipo: <strong>" +
            file.type +
            "</strong> Tamaño: <strong>" +
            file.size +
            "</strong> bytes</p>"
    );
}

function enviar() {
    // debes devolver una función que recoja los datos de submitform usando FormData y haga una
    // petición post (usando el Fetch API) con dichos datos a /pedido/add
    //  El resultado debes tratarlo como un objeto JSON y mostrarlo pantalla. En concreto la respuesta
    // JSON debe contener las rutas a los ficheros subidos al servidor (al hacer click sobre ellas deben
    // abrirse los ficheros) y los valores del resto de campos

    // 1. Vamos a mandar los datos en forma de JSON, por tanto vamos a "JSONEAR" todos los datos que se encuentran
    // en el formulario.

    let formData = new FormData();
    // Vamos a anadir datos del cliente
    let datosCliente = $id("datos");
    formData.append("nombre", datosCliente.name.value);
    formData.append("phone", datosCliente.phone.value);
    formData.append("mail", datosCliente.email.value);

    // Datos del pedido
    let datosPedido = $id("pedido");
    formData.append("libro", datosPedido.book.value);
    formData.append("cantidad", datosPedido.cantidad.value);
    var formFiles = $id("upload").fileselect;
    console.log("La longitud de los ficheros es "+formFiles.files.length);
    for (let i = 0; i < formFiles.files.length; i++) {
        console.log("Fichero",formFiles.files[i]);
        formData.append("fileselect", formFiles.files[i]);
    }

    fetch("http://localhost:3000/pedido/add", {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => gestionarErrrores(data));
}

function gestionarErrrores(data) {
    console.log(data)
    if (data["succes"] == true) mostrarResultados(data);
    else {
        output("");
        var error = document.getElementById("emailCorrect");
        error.innerHTML = "";
        error.innerHTML =
            '<p style="color:#FFA500">El correo insertado no es correcto</p>';
    }
}
function mostrarResultados(data) {
    var error = document.getElementById("emailCorrect");
    error.innerHTML = "";

    console.log("Mostrando resultados");
    output("");
    output(
        "<ul> <li>Nombre de usuario: " +
            data["nombre"] +
            "</li> <li>Numero de telefono: " +
            data["phone"] +
            "</li> <li>Email: " +
            data["mail"] +
            "</li> <li>Libro: " +
            data["libro"] +
            "</li><li>Cantidad: " +
            data["cantidad"] +
            "</li><li>Imagenes:</li></ul>"
    );
    for (let i = 0; i < data["images"].length; i++) {
        let unparsed_link = data["images"][i]
        let link = unparsed_link.split("public/")[1];
        console.log(link)
        output("<img src=" + link + ">");
    }
}

// initialize
function init() {
    var fileselect = $id("fileselect"),
        filedrag = $id("filedrag"),
        submitbutton = $id("enviar");

    //submitbutton.onclick = enviar($id("upload"));
    submitbutton.addEventListener("click", () => {
        enviar($id("upload"));
    });
    // file select
    fileselect.addEventListener("change", fileSelectHandler, false);

    // file drop
    filedrag.addEventListener("dragover", fileDragHover, false);
    filedrag.addEventListener("dragleave", fileDragHover, false);
    filedrag.addEventListener("drop", fileSelectHandler, false);
    filedrag.style.display = "block";
}

// call initialization file
if (window.File && window.FileList) {
    init();
}
