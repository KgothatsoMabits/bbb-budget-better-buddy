const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = async () => {
  const mongourl = process.env.DATABASE;
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    await mongoose.connect(mongourl, mongoOptions);
    console.log("MongoDB connected");
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
