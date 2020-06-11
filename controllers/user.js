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
let users = JSON.parse(fs.readFileSync(pathDB));

const controller = {
    userReg: (req, res, next) => {
        // Register GET
        res.render("userRegister");
    },
    create: function (req, res, next) {
        //Creates a new user POST
        //  Load user DB
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
        let user = users.find((n) => {
            console.log(`
            user n. ${n.id}
            checking for ${req.cookies.userId}`);
            return (
                n.id == req.cookies.userId ||
                n.id == req.session.userId
            );
        });
        console.log(`
        user: ${user}
        cookies: ${req.cookies.userId}
        session: ${req.session.userId}`);
        // check user db for matches, else discard cookie
        if (user != undefined) {
            if (
                req.cookies.userId == user.id || //find out which one later?
                req.session.userId == user.id
            ) {
                console.log("Matched!");
                var loggedUser = user;
                res.render("userAccount", {
                    loggedUser: loggedUser,
                });
                console.log("Ending comm");
                res.end();
            }
        } else {
            console.log(
                "didn't match, defaulting to login"
            );
            res.render("login");
        }
    },
    checkin: (req, res, next) => {
        console.log("starting checkin");
            user = users.find((n) => {
                console.log(
                    "checkin user n. " +
                        n.id +
                        " " +
                        req.body.loginCreds
                );
                return (
                    (n.id == Number(req.body.loginCreds) ||
                        n.email == req.body.loginCreds) &&
                    n.password == req.body.password
                );
            });
            console.log(user);
            if (user) {
                console.log("got a user");
                // when checkbox is on, save a cookie. either way, proceed with user as param.
                if (req.body.remember == "remember") {
                    res.cookie("userId", user.id, {
                        maxAge: 60000000,
                    });
                }
                req.session.userId = user.id;
                const loggedUser = user;
                res.render("userAccount", {
                    loggedUser: loggedUser,
                });
                res.end();
            } else res.redirect("/user/registerFailed");
        ;
    },
    logout: (req, res, next) => {
        res.clearCookie("userId"); // maybe as a middleware?
        req.session.userId = null;
        res.render("login");
    },
    logEdit: (req, res, next) => {
        // load DB
        const userId = req.params.id;
        //Load user
        let user;
        users.forEach((userA) => {
            if (userA.id == userId) {
                user = userA;
            }
        });
        // handle POST form
        // name lastName email
        // check each field for existance
        // enact changes
        if (req.body.name != "") {
            console.log(
                "Llegamos! El usuario era ",
                user.first_name
            );
            user.first_name = req.body.name;
        }
        if (req.body.lastName != "") {
            user.last_name = req.body.lastName;
        }
        if (req.body.email != "") {
            user.email = req.body.email;
        }
        console.log("el req.body es ", req.body);
        // save to DB
        // user.id = users [users.length-1].id+1;
        users.push(user);
        let loggedUser = user;
        fs.writeFileSync(
            pathDB,
            JSON.stringify(users, null, 4)
        );
        return res.render("userAccount", {
            loggedUser: loggedUser,
        });
    },
    editor: function (req, res, next) {
        // get the logged user
        users.forEach((user) => {
            // check user db for matches, else discard cookie
            if (
                req.cookies.userId == user.id || //find out which one later?
                req.session.userId == user.id
            ) {
                let loggedUser = user;
                return res.render("userEdit", {
                    loggedUser: loggedUser,
                });
            }
        });
        // save to loggedUser
        // res.render("userEdit"); // add {loggedUser:loggedUser
    },
    cart: (req, res, next) => {
        res.render("cart", { title: "Express" }); // Needs DB
    },
};

module.exports = controller;
