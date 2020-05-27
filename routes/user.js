// Requirements
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const controller = require(path.join(__dirname,'..','controllers','user'));
const pController = require(path.join(__dirname,'..','controllers','product'));


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

// check log status middleware
function middleware(req, res, next) {
    // render userpage if so, else render register/login
    next();
}
// module.exports = middleware;

// another middleware to check ADMIN privileges

/* /user */

// User register/logging handlers
router.get('/register', controller.userReg);
router.post('/register', upload.single('file'), controller.create)

// Landing page, redirects wether logged in

router.get('/login', controller.entry);
router.post('/login', middleware, controller.checkin);

// Cart page

router.get("/cart", controller.cart);

// add products

router.get("/add", pController.create); // needs a new middleware
router.post("/add", upload.any('file'), pController.save);
router.get("/success", function (req,res,next) {
    res.end()
    }
);
module.exports = router;
