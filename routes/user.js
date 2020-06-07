// Requirements
const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const controller = require(path.join(
    __dirname,
    "..",
    "controllers",
    "user"
));
const pController = require(path.join(
    __dirname,
    "..",
    "controllers",
    "product"
)); //is this controller really necessary?
const mwLoggedIn = require(path.join(
    __dirname,
    "..",
    "middlewares",
    "middlewareRedirect"
));

// SET STORAGE W/ MULTER
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "data/user_avatar");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });

// another middleware to check ADMIN privileges TO DO

/* /user */

// User register/logging handlers
router.get("/register", controller.userReg);
router.post(
    "/register",
    upload.single("file"),
    controller.create
);

// Logout
router.post("/logout", controller.logout);

// Landing page, redirects wether logged in

router.get("/login", controller.entry);
router.post("/login", controller.checkin);

// Cart page

router.get("/cart", controller.cart);

// add products

router.get("/add", mwLoggedIn, pController.create); // needs a new middleware, right now bounces guests
router.post(
    "/add",
    upload.single("file"),
    pController.save
);
router.get("/success", function (req, res, next) {
    res.end();
})

// Edit user
router.get("/edit", mwLoggedIn, function (req, res, next) {
    // get the logged user
    // save to loggedUser
    res.render ("userEdit"); // add {loggedUser:loggedUser}
});
router.put("/edit/:id", mwLoggedIn, controller.logEdit);


;
module.exports = router;
