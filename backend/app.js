const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require("dotenv");
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

//Connect Database
connectDB();

if (process.env.NODE_ENV === "production") {
  app.use(logger("combined"));
} else {
  app.use(logger("dev"));
}


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/goals',goalsRouter);


module.exports = app;
