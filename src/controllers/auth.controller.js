const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.json({ success: true, message: "signup successful!" });
  } catch (err) {
    console.log("err:", err);
    res.status(400).json({ success: false,  err });
  }
}

module.exports = { signup };