var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var fs = require('fs');
var bodyParser = require('body-parser');
var upload = multer({ dest: 'uploads/' });
//Passport dependencies
var passport = require('passport');
let session = require('express-session');
let localStrategy = require('passport-local').Strategy;

var index = require('./routes/index');
var users = require('./routes/users');
// add the controller
var campers = require('./routes/campers');
var camps = require('./routes/camps');

var app = express();

// mongodb connection
let mongoose = require('mongoose');
mongoose.Promise = Promise;
let config = require('./config/globals');
mongoose.connect(config.db);

let db = mongoose.connection;
db.once('open', function() {
  console.log('Connected to mongodb');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//passport config before controller reference
app.use(session({
  secret: 'some string value here',
    resave: true,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//use the staffAccount model to manage the staff members
let Account = require('./models/accountStaff');
passport.use(Account.createStrategy());

//store the staff info to mongoDB
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());



app.use('/', index);
app.use('/users', users);
//use campers controller
app.use('/', campers);
app.use('/', camps);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found', { title: 'Welcome to muskoka steamship and discoovery' });
  err.status = 404;
  next(err);
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', { title: 'Welcome to muskoka steamship and discoovery' });
});

module.exports = app;
