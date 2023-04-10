var createError = require('http-errors');
var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const bcrypt = require('bcryptjs');
const LocalStrategy = require("passport-local").Strategy;

require('dotenv').config()

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');

const User = require('./models/User');

passport.use(
  new LocalStrategy(async(username, password, done) => {
      try {
          console.log('hello')
          const user = await User.findOne({ userName: username });
          console.log(user);
          if (!user) {
              return done(null, false, { message: "Incorrect username" });
          };
          bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                  console.log('match')
                  // passwords match! log user in
                  return done(null, user);
              } else {
                  console.log('doesnt match')
                  console.log(password, user.password);
                // passwords do not match!
                return done(null, false, { message: "Incorrect password" });
              }
          });
      } catch(err) {
          return done(err);
      };
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

var app = express();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const mongoUri = process.env.MONGO_URI;
const mongoDB = mongoUri;

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.use(logger('dev'));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  res.locals.title = 'Awesome Club';
  res.locals.currentUser = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/posts', postsRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
