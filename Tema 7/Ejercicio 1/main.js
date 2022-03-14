window.onload = () => {
    var btn = document.getElementById("btn");
    btn.addEventListener("click", manageAudio);
};
function manageAudio(){
    loadAudio("./audio/soundtrack.mp3").then((audio) => audio.play());
}
function loadAudio(url) { // Similar al ejercicio previamente hecho.
    return new Promise((resolve) => {
        let audio = new Audio();
        audio.addEventListener("canplaythrough", () => {
            resolve(audio);
        });
        audio.src = url; // Tambien se puede poner en el constructor
    });
}
