var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");
var mongojs = require("mongojs");
var ObjectId = mongojs.ObjectId;
var db = mongojs("clientesapp", ["users"]);
var router = express.Router();

// middleware

// Middleware para el parseo del body
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

//declaración y definición de variables globales
router.use(function (req, res, next) {
    res.locals.errors = null;
    next();
});

router.use(
    expressValidator({
        errorFormatter: function (param, msg, value) {
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
        db.users.find(function (err, docs) {
            if (err) {
                console.log(err);
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
        res.end("<h1>Please login first.</h1>");
    }
});

router.post("/add", function (req, res) {
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

    db.users.insert(newUser, function (err) {
        if (err) {
            console.log(err);
        } else {
            db.users.insert(newUser);
        }
        res.redirect("/users");
    });
});

router.delete("/delete/:id", function (req, res) {
    db.users.remove({ _id: ObjectId(req.params.id) }, function (err) {
        if (err) {
            console.log(err);
        }
        res.redirect(303, "/users");
    });
});

router.get("/obtenerInfoUsuario/:id", function (req, res) {
    db.users.find({ _id: ObjectId(req.params.id) }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
});

router.post("/actualizarInfoUsuario/:id", function (req, res) {
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
        function (errors, result) {
            if (errors) {
                console.log(errors);
            } else {
                res.send(result);
            }
        }
    );
});

module.exports = router;
