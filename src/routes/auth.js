const express = require("express");
const { validateSinupUpDate} = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/sinup", async (req, res) => {
  try {
    validateSinupUpDate(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordhash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordhash,
    });
    await user.save();
    res.send("user data is successfully uploaded!");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (user === 0) {
      throw new Error("not valid crediential!");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      //             genrerate the token here!
      const token = await jwt.sign({ _id: user.id }, "something");
      res.cookie("token", token);
      res.send(user.firstName + " successfully login");
    } else {
      throw new Error("not valid credential!");
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});


module.exports = authRouter;