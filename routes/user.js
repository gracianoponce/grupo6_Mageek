const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const controller = require(path.join(__dirname,'..','controllers','user'));


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


/* /user */

// User register/logging handlers
router.get('/register', controller.userReg);
router.post('/register', upload.single('file'), controller.create)

module.exports = router;
