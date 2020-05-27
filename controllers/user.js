const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
if (!loggedUser) var loggedUser = {}; // Instances loggedUser in case it wasn't already
const pathDB = path.join(__dirname,'..','data','users.json');
const users = JSON.parse(fs.readFileSync(pathDB));

const controller = {
    userReg: (req, res, next) => {
        // Register GET
        res.render("userRegister");
    },
    create: function (req, res, next) {
        //Creates a new user POST
        //  Load user DB
        let users = JSON.parse(
            fs.readFileSync(path.join(__dirname, "..", "data", "users.json"))
        );

        // const file = req.file;
        // const newUser = {};
        // "id": 1,
        // "first_name": "Fred",
        // "last_name": "Dupree",
        // "email": "fdupree0@slate.com",
        // "password": "GTutlrTVnIb",
        // "category": "user",
        // "image": "user_1.jpg"
        // res.send(xxxxxxxxxxxxxxxxx);
        // load database
        // create user object
        let user = {
            id: users.length,
            first_name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            image: req.file.filename,
        };
        //   validate password, otherwise error
        const hash = function () {
            if (req.body.pass) return bcrypt.hashSync(req.body.pass, 10);
        };
        user.password = hash();
        if (req.body.pass2) {
            if (bcrypt.compareSync(req.body.pass2, user.password)) {
                // Success validating
                users.push(user);
                // Save new array
                fs.writeFileSync(
                    path.join(__dirname, "..", "data", "users.json"),
                    JSON.stringify(users, null, 4)
                );

                res.send("Éxito!");
            }
        } else {
            console.log("algo malio sal");
        }
        res.send(req.body);
    },
    entry: (req, res, next) => {
        /* if (logged in) { */
        res.render("login");
    },
    checkin: (req, res, next) => {
            users.forEach((user) => {
            console.log(user.id + " " + req.body.loginCreds);
            console.log(user.password + " " + req.body.password);
            if (
                // Checks array for user match, HASH PASS LATER
                (user.id == Number(req.body.loginCreds) ||
                    user.email == req.body.loginCreds) &&
                user.password == req.body.password
            ) {
                // keep session alive somehow?
                const loggedUser = user;
                res.render("userAccount", { loggedUser: loggedUser });
                res.end();
            }
        });
        res.render("registerFailed");
    },
    cart: (req, res, next) => {
        res.render("cart", { title: "Express" }); // Needs DB
    },
};
module.exports = controller;
