'use strict';
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const hbs = require('hbs');

const routes = require('./routes/index');
const api = require('./routes/api');

const helper = require('./util/registerHelper');
const api_dataContent = require('./routes/middleware/api_dataContent');
const api_widthToken = require('./routes/middleware/api_widthToken');
const api_callback = require('./routes/middleware/api_callback');

hbs.registerHelper('width', helper.width); 
hbs.registerHelper('orgType', helper.orgType); 
hbs.registerHelper('isEqual', helper.isEqual); 
hbs.registerHelper('isEqual2', helper.isEqual2); 
hbs.registerAsyncHelper('norender', helper.norender);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html')
app.engine('html', hbs.__express);
hbs.registerPartials(__dirname + '/views/include');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(session({
  secret: 'signature',
  name: 'signature',
  cookie: {maxAge: 12*60*60*1000},
  resave: false,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api', api);
app.use('/api', api_dataContent);
app.use('/api', api_widthToken);
app.use('/api', api_callback);

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
