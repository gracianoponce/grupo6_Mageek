var express = require("express");
var router = express.Router();
const controller = require (__dirname+"/../public/controllers/productCart");
/* GET product page. */

router.get("/", controller.cart);


module.exports = router;
