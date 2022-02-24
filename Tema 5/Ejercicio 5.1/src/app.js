document.getElementById("boton").addEventListener("click", apiCall);

function apiCall() {
  const isbn = document.getElementById("books").value;
  var url =
    "https://openlibrary.org/api/books?bibkeys=" +
    isbn +
    "&jscmd=details&format=json";

  fetch(url)
    .then((response) => response.json())
    .then((result) => retrieveData(result));
}

function retrieveData(result) {
  console.log(result);
  const titleContainer = document.getElementById("Title");
  const authorsContainer = document.getElementById("Authors");
  const imgContainer = document.getElementById("Img");
  titleContainer.innerHTML = "";
  authorsContainer.innerHTML = "";
  imgContainer.innerHTML = "";

  var titleDiv = document.createElement("div");
  titulo = result[document.getElementById("books").value]["details"]["title"];
  titleDiv.innerHTML = "Titulo: " + titulo;
  titleContainer.appendChild(titleDiv);

  i = 0;
  autores =
    result[document.getElementById("books").value]["details"]["authors"];
  autores.forEach((autor) => {
    var authorDiv = document.createElement("div");
    authorDiv.innerHTML = i + ". Autor : " + autor["name"];
    authorsContainer.appendChild(authorDiv);
    i++;
  });
  
  var img = new Image();
  img.src = result[document.getElementById("books").value][
    "thumbnail_url"
  ].replace("-S,jpg", "-L.jpg");
  imgContainer.appendChild(img);
}
