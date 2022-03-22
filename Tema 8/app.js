var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware para el parseo de req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var multer = require("multer");

const maxSize = 2 * 1024 * 1024; // 2MB

var storage = multer.diskStorage({
    // definir restricciones para que los ficheros subidos se guarden en la carpeta public/imgs/
    destination: function (req, file, cb) {
        cb(null, "./public/imgs");
    },
    // el nombre del fichero que se guarda debe coincidir con el que se envían
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    // tamaño máximo de los ficheros: 2MB
    limits: { fileSize: maxSize },
    filename: function(req, file, cb){
        if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)){
            req.fileValidationError = 'Only image files are allowed!';
            cb(new Error('Only image files are allowed!'), false);
        }else{
            return cb(null, file.originalname);
        }
    }

});
// filter function

var upload = multer({storage: storage});

var pedido = upload.array("fileselect");

app.post("/pedido/add", (req, res) => {
    // Por lo que veo, tenemos que hacer un request a esta URL y imprimir el resultado en cliente.
    pedido(req, res, (err) => {
        
        if (err instanceof multer.MulterError || err) {
            console.log("Ha habido un error");
            // en caso de error, devolver un objeto JSON
            let error = { sucess: false, error: err };
            // en caso de éxito, devolver un objeto JSON que contenga: success:true, la ruta a los ficheros
            // subidos y los valores recibidos en cada campo del formulario POST
            return res.json(error);
        } else {
            console.log(req.files)
            var feedback = gestionarErroresFormulario(req.body);
            if (!feedback["succes"]) {
                console.log("Succes: False, hay error en formulario");
                return res.json(feedback);
            } else {
                // No hay error en el formulario.
            
                req.body["succes"] = true;
                
                images = []
                for (let i = 0; i < req.files.length; i++) {
                    images[i] = req.files[i].path;
                }
                req.body["images"] = images;
                console.log(req.body);
                return res.json(req.body);
            }
        }
    });
});

function gestionarErroresFormulario(datos) {
    // Aquí debes comprobar que los datos recibidos en el formulario son correctos
    // Si no lo son, mostrar un error en la pantalla
    // Si lo son, mostrar un mensaje de éxito en la pantalla
    // Si no se envía ningún dato, mostrar un error en la pantalla
    let errores = { succes: true, mail: false, phone: false };
    let error = false;
    let correo = datos["mail"];
    let nombre = datos["nombre"];
    let telefono = datos["phone"];
    if (!validateEmail(correo)) {
        // Si hay error figurara como true
        console.log("Errores en el correo electronico");
        errores["mail"] = true;
        error = true;
    }
    if (!validatePhoneNumber(correo)) {
        // Si hay error figurara como true
        console.log("Errores en el numero de telefono");
        errores["phone"] = true;
        error = true;
    }
    errores["succes"] = !error;
    return errores;
}
function validatePhoneNumber(number) {
    return true; // Por razones de privacidad y por el caso de uso, no vamos a validarlo.
}

function gestionarImagenes() {}
function validateEmail(email) {
    // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}
app.listen(3000, function () {
    console.log("Servidor lanzado en el puerto 3000");
});
