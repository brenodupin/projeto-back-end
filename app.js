var createError = require('http-errors');
var express = require('express');
var logger = require('morgan');
require("dotenv").config()

var installRouter = require('./routes/install').default;
var userRouter = require('./routes/user');
var loginRouter = require('./routes/login')
var dbRouter = require('./routes/db')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rotas
app.use('/install', installRouter);
app.use('/user', userRouter);
app.use('/login', loginRouter);
app.use('/db', dbRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(res.locals.error);
});

module.exports = app;
