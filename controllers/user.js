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
            id: users.length, // new code required: check last user's id, then increase by 1
            first_name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            // image: req.file.filename,
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
                res.end();
            }
        });
        res.render("login");
    },
    checkin: (req, res, next) => {
        users.forEach((user) => {
            if (
                // Checks array for user match, else bounce HASH PASS LATER
                (user.id == Number(req.body.loginCreds) ||
                    user.email == req.body.loginCreds) &&
                user.password == req.body.password
            ) {
                // when checkbox is on, save a cookie. either way, proceed with user as param.
                if (req.body.remember == "remember") {
                    res.cookie("userId", user.id, {
                        maxAge: 60000000,
                    });
                }
                req.session.userId = user.id;
                const loggedUser = user;
                return res.render("userAccount", {
                    loggedUser: loggedUser,
                });
            }
        });
        // res.redirect("registerFailed");
    },
    logout: (req, res, next) => {
        res.clearCookie("userId"); // maybe as a middleware?
        req.session.userId = null;
        res.render("login");
    },
    logEdit: (req, res, next) => {
        // load DB
        const userId = req.params.id;
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
        //Load user
        let user = users[userId];
        // handle POST form
        // name lastName email
        if (req.body.name != "") {
            user.name = req.body.name;
        }if (req.body.lastName != "") {
            user.lastName = req.body.lastName;
        }if (req.body.email != "") {
            user.email = req.body.email;
        }
        // check each field for existance
        console.log("el req.body es ", req.body);
        let user = {
            id: users.length,
            first_name: req.body.name,
            last_name: req.body.lastName,
            email: req.body.email,
            image: req.file.filename,
        };
        // enact changes
        // save to DB
        res.render("login");
    },
    cart: (req, res, next) => {
        res.render("cart", { title: "Express" }); // Needs DB
    },
};

module.exports = controller;
