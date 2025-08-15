const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const { name, surname, cellphoneNumber, email, password, confirmPassword } =
      req.body;
    if (!name) {
      return res.status(400).json({ error: "Invalid Request: Name Required" });
    }
    if (!surname) {
      return res.status(400).json({ error: "Invalid Request: Surname Required" });
    }
    if (!cellphoneNumber) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Cellphone Number Required" });
    }
    if (!email) {
      return res.status(400).json({ error: "Invalid Request: Email Requried" });
    }
    if (!password) {
      return res.status(400).json({ error: "Invalid Request: Password Required" });
    }
    if (!confirmPassword) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Password Confirmation Required" });
    }
    if (password != confirmPassword) {
      return res
        .status(400)
        .json({ error: "Invalid Request: Passwords Not Matching" });
    }

    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({
      name: name,
      surname: surname,
      cellphoneNumber: cellphoneNumber,
      email: email,
      password: hash,
    });

    const user = await newUser.save();

    if (!user) {
      return res.status(400).json({ error: "Error: User Creation Failed" });
    }
    const payLoad={
        _id:user.id,
        name:user.name,
        surname:user.surname,
        cellphoneNumber:user.cellphoneNumber,
        email:user.email
    }

    return res.status(201).json({message:"User Registered",data:payLoad});
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ message: "Invalid Request: Email not found" });
    }

    const user = await User.find({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      error:"An internal server error occurred.",
    });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Invalid Request: Email Requried" });
    }
    

    const user = await User.findOne({ email: email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials",isAuthenticated:false });
    }

    const payLoad={
        _id : user._id,
        name: user.name,
        email : user.email,

    }

    return res.status(200).json({ message: "Login Successful", data: payLoad, isAuthenticated: true });

  } catch (error) {
    console.error("Authentication Error:", error);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
};
