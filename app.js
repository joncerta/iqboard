var express = require('express');
var fs = require('fs');
var mv = require('mv');
var http = require('http');
var path = require('path');
var connect = require('connect');
var morgan = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var app = express();

// mongoose
var mongoose = require('mongoose');
var passport = require('passport');

// connect to de db
mongoose.connect('mongodb://localhost/news', function(err, res){
  if(err) console.log('NO SE  PUEDE CONECTAR A LA BASE DE DATOS - ERROR:   ' + err);
  else console.log('Conexión exitosa a la base de datos:');
});

require('./models/Posts');
require('./models/Comments');
require('./models/Cotizacion');
require('./models/Users');
require('./models/Cliente');
require('./models/Eventos');
require('./models/images');
require('./config/passport');

var routes = require('./routes/index');
var users = require('./routes/users');

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
app.use(passport.initialize());

app.use(connect.multipart());                   // required for file upload

app.use(methodOverride());              // simulate DELETE and PUT                   

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
