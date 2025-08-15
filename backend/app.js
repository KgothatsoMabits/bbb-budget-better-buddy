const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
const compression = require("compression");
const connectDB = require("./database/config");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const goalsRouter = require('./routes/goals')

//Load Environment Variables
if (process.env.NODE_ENV !== "production") {
  try {
    dotenv.config();
    console.log("Environment variables loaded successfully.");
  } catch (error) {
    console.error("Error loading environment variables:", error);
  }
}

const app = express();

app.set('trust proxy', 1);

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}

const limiter = RateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

//Connect Database
connectDB();

app.use(helmet())
app.use(compression());
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goals',goalsRouter);

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
