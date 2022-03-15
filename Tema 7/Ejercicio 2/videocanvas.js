var efecto = null;
var clip = "video/demovideo1"; // nombre del vídeo, sin extensión

window.onload = function () {
    var video = document.getElementById("video");
    var botonByN = document.getElementById("byn");
    botonByN.addEventListener("click", cambiarEfecto);

    // Boton normal
    var botonNormal = document.getElementById("normal");
    botonNormal.addEventListener("click", cambiarEfecto);

    // Boton pausa
    var botonPause = document.getElementById("pausa");
    botonPause.addEventListener("click", pausarVideo);

    // Boton scifi
    var botonCienciaFiccion = document.getElementById("scifi");
    botonCienciaFiccion.addEventListener("click", cambiarEfecto);

    // Boton rotar
    var botonRotar = document.getElementById("rotar");
    botonRotar.addEventListener("click", gestionarRotar);

    // Boton audio
    var botonAudio = document.getElementById("audio");
    botonAudio.addEventListener("click", manageAudio);

    // Boton pip
    var botonPip = document.getElementById("pip");
    botonPip.addEventListener("click", gestionarPip);

    video.addEventListener("play", procesarFrame, false);
    video.src = clip + getFormatExtension();
    video.load();
    video.play();
};

async function gestionarPip() {
    var video = document.getElementById("video");
    await video.requestPictureInPicture();
}

function pausarVideo() {
    // https://stackoverflow.com/questions/64788516/how-to-pause-and-unpause-a-video

    var video = document.getElementById("video");
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function cambiarEfecto(e) {
    var id = e.target.getAttribute("id");
    if (id == "byn") {
        efecto = byn;
    } else if (id == "scifi") {
        efecto = scifi;
    } else {
        efecto = null;
    }
}

function getFormatExtension() {
    var video = document.getElementById("video");
    if (video.canPlayType("video/mp4") != "") {
        return ".mp4";
    } else if (video.canPlayType("video/ogg") != "") {
        return ".ogv";
    } else if (video.canPlayType("video/webm") != "") {
        return ".webm";
    }
}
function gestionarRotar() {
    setInterval(rotate, 100);
}

function rotate() {
    var bufferCanvas = document.getElementById("buffer");
    var context = bufferCanvas.getContext("2d");

    // Move registration point to the center of the canvas
    context.translate(bufferCanvas.width / 2, bufferCanvas.height / 2);

    // Rotate 1 degree
    context.rotate(Math.PI / 180);

    // Move registration point back to the top left corner of canvas
    context.translate(-bufferCanvas.width / 2, -bufferCanvas.height / 2);
    /* Esto es para la caja
    context.fillStyle = "red";
    context.fillRect(
        canvasWidth / 4,
        canvasWidth / 4,
        canvasWidth / 2,
        canvasHeight / 4
    );
    context.fillStyle = "blue";
    context.fillRect(
        canvasWidth / 4,
        canvasWidth / 2,
        canvasWidth / 2,
        canvasHeight / 4
    )
    */
}

// Cargas de video
function procesarFrame(e) {
    var video = document.getElementById("video");

    if (video.paused || video.ended) {
        return;
    }

    var bufferCanvas = document.getElementById("buffer");
    var displayCanvas = document.getElementById("display");
    var buffer = bufferCanvas.getContext("2d");
    var display = displayCanvas.getContext("2d");

    buffer.drawImage(video, 0, 0, bufferCanvas.width, bufferCanvas.height);
    var frame = buffer.getImageData(
        0,
        0,
        bufferCanvas.width,
        bufferCanvas.height
    );
    var length = frame.data.length / 4;

    for (var i = 0; i < length; i++) {
        var r = frame.data[i * 4 + 0];
        var g = frame.data[i * 4 + 1];
        var b = frame.data[i * 4 + 2];
        if (efecto) {
            efecto(i, r, g, b, frame.data);
        }
    }
    display.putImageData(frame, 0, 0);

    setTimeout(procesarFrame, 0);
    // en los navegadores modernos, es mejor usar :
    // requestAnimationFrame(procesarFrame);
}

// Filtros para el video.
function byn(pos, r, g, b, data) {
    var gris = (r + g + b) / 3;

    data[pos * 4 + 0] = gris;
    data[pos * 4 + 1] = gris;
    data[pos * 4 + 2] = gris;
}

function scifi(pos, r, g, b, data) {
    var offset = pos * 4;
    data[offset] = Math.round(255 - r);
    data[offset + 1] = Math.round(255 - g);
    data[offset + 2] = Math.round(255 - b);
}

// Carga de audio
function manageAudio() {
    loadAudio("./audio/soundtrack.mp3").then((audio) => audio.play());
}
function loadAudio(url) {
    // Similar al ejercicio previamente hecho.
    return new Promise((resolve) => {
        let audio = new Audio();
        audio.addEventListener("canplaythrough", () => {
            resolve(audio);
        });
        audio.src = url; // Tambien se puede poner en el constructor
    });
}
