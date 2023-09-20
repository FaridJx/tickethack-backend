var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./models/connexion')

var indexRouter = require('./routes/index');
var tripsRouter = require('./routes/trips');
var bookingRouter = require('./routes/booking');


var app = express();
const cors = require('cors')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/trips', tripsRouter);
app.use('/booking', bookingRouter);
app.use(cors())


module.exports = app;
