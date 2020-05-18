var express = require("express");
var router = express.Router();
const controller = require(__dirname + "/../controllers/product");

/* GET home page. */
router.get("/", controller.none);
router.get("/:id", controller.product);


module.exports = router;