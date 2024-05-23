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

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
// DIST de VUE Frontend
app.use(express.static(path.join(__dirname, '../Proyecto_Final_Antonio/dist')));

// general VUE
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../Proyecto_Final_Antonio/dist', 'index.html'));
});

module.exports = app;
