const fs = require("fs");
const path = require("path");
const pathDB = path.join(
    __dirname,
    "..",
    "data",
    "users.json"
);
const users = JSON.parse(fs.readFileSync(pathDB));

function middlewareRedirect(req, res, next) {
    // if logged in, proceed to userAccount
    if (req.session.userId != undefined) {
        let loggedUser = users.find((user) => {
            // check user db for matches, else discard cookie
            return (
                req.cookies.userId == user.id || //find out which one later?
                req.session.userId == user.id
            );
        });
            next();
        } else {
            console.log("next didnt catch");
            res.clearCookie("userId");
            req.session.userId = null;
            res.render("login");
        }
    }
module.exports = middlewareRedirect;
