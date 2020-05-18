var express = require('express');
var router = express.Router();
const controller = require(__dirname + "/../controllers/index");

/* GET home page. */
router.get('/', controller.index);

module.exports = router;
