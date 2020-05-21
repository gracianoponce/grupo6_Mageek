const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const controller = {
    userReg: (req, res, next) => {
        res.render("userRegister");
    },
    create: function (req, res, next) {
        //  POST
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
        let users = JSON.parse(
            fs.readFileSync(path.join(__dirname, "..", "data", "users.json"))
            );
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
            if (bcrypt.compareSync(req.body.pass2,user.password)) {

                // Success validating
                users.push(user);
                // Save new array
                fs.writeFileSync (path.join(__dirname,'..','data','users.json'),JSON.stringify(users,null,4));

                res.send("Éxito!");
            }
        } else {
            console.log("algo malio sal");
        }
        // if (!)
        // push
        // save database

        res.send(req.body);
    },
};
module.exports = controller;
