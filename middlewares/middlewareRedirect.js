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
    console.log(req.session);
    users.forEach((user) => {
        // check user db for matches, else discard cookie
        if (req.cookies.userId == user.id  //find out which one later?
            || req.session.userId == user.id) {
            var loggedUser = user;
            next();
        }
    });
    res.clearCookie("userId");
    req.session.userId = null;
    res.render("login");
}
module.exports = middlewareRedirect;
