require('babel-register');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

// mongo db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jorder', function (err) {
  if (err)
    console.info('Mongodb Error:', err);
  else
    console.log('mongodb connection successful');
});


var Page = require('./models/Page');
var Form = require('./models/Form');

require('./config/passport')(passport);

var app = express();

// view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware setup
app.use(session({secret:'jcaps is a big boy'}));
app.use(passport.initialize());
app.use(passport.session());

// app config
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// route setup 
var routes = require('./routes/index');
var forms = require('./routes/forms');
var create = require('./routes/create');
var users = require('./routes/user');
var pages = require('./routes/pages')
app.use('/', routes);
app.use('/create',create);
app.use('/api/forms',forms);
app.use('/api/pages',pages);
app.use('/api/users',users);

// event listening
app.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;