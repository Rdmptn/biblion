var express = require('express');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var loginRouter =  require('./routes/login');
var logoutRouter = require('./routes/logout');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter(db));
app.use('/login', loginRouter(db));
app.use('/logout', logoutRouter);
app.use('/users', usersRouter);
app.use('/api/users', usersRouter(dbHelpers));


module.exports = app;
