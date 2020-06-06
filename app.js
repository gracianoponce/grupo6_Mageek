var express = require('express');
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");
var multer = require("multer");
var session = require("express-session")

// Router
const indexRouter = require('./routes/index');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user')
const secret = 'Mageek secret code'

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: secret,
        name: "mageek_user_cookie",
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: "/",
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);
app.use(cookieParser(secret));
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/product', productRouter);
app.use('/user', userRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
