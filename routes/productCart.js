var express = require("express");
var router = express.Router();
const controller = require (__dirname+"/../public/controllers/productCart");
/* GET home page. */
router.get("/cart", controller.cart);

module.exports = router;
