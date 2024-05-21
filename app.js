const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// DIST de VUE Frontend
app.use(express.static(path.join(__dirname, '../Proyecto_Final_Antonio/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
