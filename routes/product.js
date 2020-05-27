var express = require("express");
var router = express.Router();
const controller = require(__dirname + "/../controllers/product");

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


module.exports = router;