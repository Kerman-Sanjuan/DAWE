var paragraph;
function inicializarGestor() {
  paragraph = document.getElementById("p");

  document.addEventListener("keydown", logKey);
}

function logKey(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
}
  paragraph.textContent = "Se ha pulsado la tecla: " + ` ${e.key}`;
}

window.onload = inicializarGestor();
