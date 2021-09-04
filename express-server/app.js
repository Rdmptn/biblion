var express = require('express');
const bcrypt = require('bcrypt');
var cors = require('cors')
var path = require('path');
var cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')




var logger = require('morgan');
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var loginRouter =  require('./routes/login');
var userRouter = require('./routes/user');
var createPostRouter = require('./routes/create');
var userPostsRouter = require('./routes/userPosts');
var singlePostRouter = require('./routes/singlePost');
var singlePostCommentsRouter = require('./routes/singlePostComments');
var singlePostLikesRouter = require('./routes/singlePostLikes');
var createCommentRouter = require('./routes/createComment');
var createLikeRouter = require('./routes/createLike');
var searchResultsRouter = require('./routes/searchResults');
var profileRouter = require('./routes/profile');
var searchPostsByCategoryRouter = require('./routes/searchPostsByCategory');
var allPostsRouter = require('./routes/allPosts');
var updateBadgeRouter = require('./routes/updateBadge');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'session',
  keys: ["secret"],

  
  maxAge: 24 * 60 * 60 * 1000 //24 hours
}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', registerRouter(db));
app.use('/login', loginRouter(db));
app.use('/users', usersRouter);
app.use('/api/users', usersRouter(dbHelpers));
app.use('/user', userRouter(db));
app.use('/create', createPostRouter(db))
app.use('/userPosts', userPostsRouter(db));
app.use('/singlePost', singlePostRouter(db));
app.use('/singlePostComments', singlePostCommentsRouter(db));
app.use('/singlePostLikes', singlePostLikesRouter(db));
app.use('/createComment', createCommentRouter(db));
app.use('/createLike', createLikeRouter(db));
app.use('/searchResults', searchResultsRouter(db));
app.use('/allPosts', allPostsRouter(db));
app.use('/profile', profileRouter(db));
app.use('/searchPostsByCategory', searchPostsByCategoryRouter(db));
app.use('/updateBadge', updateBadgeRouter(db));

module.exports = app;
