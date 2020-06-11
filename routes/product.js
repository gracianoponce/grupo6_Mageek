var express = require("express");
var router = express.Router();
const path = require ("path");
const fs = require ("fs");
const controller = require(__dirname + "/../controllers/product"); //reformat?
const mwLoggedIn = require(path.join(
    __dirname,
    "..",
    "middlewares",
    "middlewareRedirect"
));
// SET STORAGE
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/user_avatar');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+path.extname(file.originalname));
    }
})
var upload = multer({ storage: storage });

/* /product */
router.get("/", controller.none);
router.get("/:id", controller.product);

/* /add     product */
router.get("/add", mwLoggedIn, controller.create); // needs a new middleware, right now bounces guests
router.post(
    "/add",
    upload.single("file"),
    controller.save
);

module.exports = router;