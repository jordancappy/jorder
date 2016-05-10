var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var routes = require('./routes/index');
var forms = require('./routes/forms');
var Form = require('./models/Form');

var app = express();

// view setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// route setup 
//app.use('/api/forms',forms);
app.get('/api/forms',function(req,res){
    Form.find(function(err,forms){
        if(err)
            res.send(err);
        
        res.json(forms);
    })
});
app.use('/', routes);

// app config
app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// mongo db
mongoose.connect('mongodb://localhost/jorder');
mongoose.connection.on('error', function() {
  console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
});

// event listening
app.listen(app.get('port'),function(){
    console.log('Express server listening on port ' + app.get('port'));
});

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