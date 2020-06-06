const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
if (!loggedUser) var loggedUser = {}; // Instances loggedUser in case it wasn't already
const pathDB = path.join(
    __dirname,
    "..",
    "data",
    "users.json"
);
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
            fs.readFileSync(
                path.join(
                    __dirname,
                    "..",
                    "data",
                    "users.json"
                )
            )
        );
        let user = {
            //Load user
            id: users.length,
            first_name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            image: req.file.filename,
        };
        //   validate password, otherwise error
        const hash = function () {
            if (req.body.pass)
                return bcrypt.hashSync(req.body.pass, 10);
        };
        user.password = hash();
        if (req.body.pass2) {
            if (
                bcrypt.compareSync(
                    req.body.pass2,
                    user.password
                )
            ) {
                // Success validating
                users.push(user);
                // Save new array
                fs.writeFileSync(
                    path.join(
                        __dirname,
                        "..",
                        "data",
                        "users.json"
                    ),
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
        users.forEach((user) => {
        // check user db for matches, else discard cookie
        if (
            req.cookies.userId == user.id || //find out which one later?
            req.session.userId == user.id
        ) {
            var loggedUser = user;
            res.render("userAccount", {
                loggedUser: loggedUser,
            });
            res.end ();
        }});
        res.render("login");
    },
    checkin: (req, res, next) => {
        users.forEach((user) => {
            if (
                // Checks array for user match, else bounce HASH PASS LATER
                ((user.id == Number(req.body.loginCreds) ||
                    user.email == req.body.loginCreds)) &&
                user.password == req.body.password
            ) {
                // when checkbox is on, save a cookie. either way, proceed with user as param.
                if (req.body.remember == "remember") {
                    res.cookie("userId", user.id, {'maxAge':60000000});
                }
                console.log(req.session);
                req.session.userId = user.id;
                console.log(req.session);
                const loggedUser = user;
                res.render("userAccount", {
                    loggedUser: loggedUser,
                });
                next();
            }
        });
        res.redirect("registerFailed");
    },
    logout: (req,res,next) => {
        res.clearCookie ('userId'); // maybe as a middleware?
        req.session.userId = null;
        res.render('login');
    },
    cart: (req, res, next) => {
        res.render("cart", { title: "Express" }); // Needs DB
    },
};

module.exports = controller;
