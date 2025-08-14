const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.createUser = async (req, res) => {
  try {
    const { name, surname, cellphoneNumber, email, password, confirmPassword } =
      req.body;
    if (!name) {
      res.status(400).json({ error: "Invalid Request: Name Required" });
    }
    if (!surname) {
      res.status(400).json({ error: "Invalid Request: Surname Required" });
    }
    if (!cellphoneNumber) {
      res.status(400).json({ error: "Invalid Request: Cellphone Number Required" });
    }
    if (!email) {
      res.status(400).json({ error: "Invalid Request: Email Requried" });
    }
    if (!password) {
      res.status(400).json({ error: "Invalid Request: Password Required" });
    }
    if (!confirmPassword) {
      res
        .status(400)
        .json({ error: "Invalid Request: Password Confirmation Required" });
    }
    if (password != confirmPassword) {
      res
        .status(400)
        .json({ error: "Invalid Request: Passwords Not Matching" });
    }

    const hash = bcrypt.hashSync(password, saltRounds)
    const newUser = new User({
        name:name,
        surname:surname,
        cellphoneNumber:cellphoneNumber,
        email:email,
        password:hash
      })
    
    const user = await newUser.save();

    if(!user){
        res.status(400).json({error:"Error: User Creation Failed"})
    }

    res.status(201).json(user);

  } catch (error) {
    res.status(error.status).json({ error: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      res.status(400).json({ message: "Invalid Request: Email not found" });
    }

    const user = await User.find({ email: email });

    if (!user){
        res.status(404).json({ message: "User Not Found" });
    } 

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
