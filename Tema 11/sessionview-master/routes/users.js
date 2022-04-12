/*
El codigo es muy similar al del laboratorio 9, que hice de forma conjunta con Alvaro Hernandez.
De todos modos, el original ha sido cambiado para que funcione con el nuevo formato.

 // App.js del ejercicio 9 (mas o menos)
*/

var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var mongojs = require("mongojs");
var ObjectId = mongojs.ObjectId;
var db = mongojs("clientesapp", ["users"]);
var router = express.Router();

// Middleware para el parseo del body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use((_req, res, next) => {
    res.locals.errors = null;
    next();
});

router.use(
    expressValidator({
        errorFormatter: (param, msg, value) => {
            var namespace = param.split("."),
                root = namespace.shift,
                formParam = root;

            while (namespace.length) {
                formParam += "[" + namespace.shift() + "]";
            }
            return {
                param: formParam,
                msg: msg,
                value: value,
            };
        },
    })
);

/* GET users listing. */
router.get("/", (req, res) => {
    if (req.session.emailVerified) {
        db.users.find((err, docs) => {
            if (err) {
                console.log("Error", err);
            } else {
                console.log(docs);
                res.render("users", {
                    usuario: req.session.email,
                    title: "Customers",
                    users: docs,
                });
            }
        });
    } else {
        res.end("<h1> Please login first</h1>");
    }
});

router.post("/add", (req, res) => {
    req.checkBody("first_name", "El nombre es obligatorio").notEmpty();
    req.checkBody("last_name", "El apellido es obligatorio").notEmpty();
    req.checkBody("email", "El email es obligatorio").notEmpty();

    var errors = req.validationErrors();
    if (errors) {
        res.render("users", {
            title: "costumers",
            users: users,
            errors: errors,
        });
    } else
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        };

    db.users.insert(newUser, (err) => {
        if (err) {
            console.log("Error, no se ha podido validar el usuario", err);
        } else db.users.insert(newUser);

        res.redirect("/users");
    });
});

router.delete("/delete/:id", (req, res) => {
    db.users.remove({ _id: ObjectId(req.params.id) }, (err) => {
        if (err) console.log(err);

        res.redirect(303, "/users");
    });
});

router.get("/obtenerInfoUsuario/:id", (req, res) => {
    db.users.find({ _id: ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            console.log(err);
        } else res.json(result);
    });
});

router.post("/actualizarInfoUsuario/:id", (req, res) => {
    var id = ObjectId(req.params.id);
    var name = req.body.first_name;
    var surname = req.body.last_name;
    var email = req.body.email;
    db.users.findAndModify(
        {
            query: { _id: id },
            update: {
                $set: { first_name: name, last_name: surname, email: email },
            },
        },
        (errors, result) => {
            if (errors) {
                console.log(errors);
            } else res.send(result);
        }
    );
});

module.exports = router;
