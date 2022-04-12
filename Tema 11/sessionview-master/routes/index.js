var express = require("express");
var router = express.Router();
var session = require("express-session");
const MongoStore = require("connect-mongo");

var admin = require("firebase-admin");
var serviceAccount = require("/users/kerman/Desktop/DAWE/DAWE/Tema 11/sessionview-master/daweproyecto-firebase-adminsdk-at77d-2e1ee433b1.json");

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
});

// Use the session middleware
router.use(
    session({
        secret: "clavesecretaparaexpresss",
        saveUninitialized: true, // create session even if there is nothing stored
        resave: true, // save session even if unmodified
        cookie: { maxAge: 60 * 60 * 1000 },
        store: MongoStore.create({
            mongoUrl: "mongodb://127.0.0.1:27017/test-app",
        }),
    })
);

router.get("/", (req, res) => {
    if (req.session.email) {
        return res.redirect("/admin");
    }
    res.render("index", { title: "title" });
});

router.post("/login", (req, res) => {
    req.session.email = req.body.email;
    res.end("done");
});

router.get("/admin", (req, res) => {
    if (req.session.email) {
        res.write(`<h1>Hello ${req.session.email} </h1><br>`);
        res.end("<a href=" + "/logout" + ">Logout</a>");
    } else {
        res.write("<h1>Please login first.</h1>");
        res.end("<a href=" + "/" + ">Login</a>");
    }
});

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.log(err);
        }
        res.redirect("/email-password.html?logout"); // En el video se ve como se manda este parametro
    });
});

router.post("/getToken", (req, res) => {
    const idToken = req.body.idToken;

    admin
        .auth()
        .verifyIdToken(idToken)
        .then(function (decodedToken) {
            let uid = decodedToken.uid;
            admin
                .auth()
                .getUser(uid)
                .then(function (userRecord) {
                    // See the UserRecord reference doc for the contents of userRecord.
                    console.log(
                        "Successfully fetched user data:",
                        userRecord.toJSON()
                    );
                    req.session.email = userRecord.email;
                    req.session.emailVerified = userRecord.emailVerified;
                    res.send('{"status": "done"}');
                })
                .catch(function (error) {
                    console.log("Error fetching user data:", error);
                    res.send('{"status": "error"}');
                });
        })
        .catch(function (error) {
            // Handle error
            res.render("error", {
                error: error,
                message: "You must be signed-up",
            });
        });
});
module.exports = router;
