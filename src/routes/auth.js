const express = require("express");
const { validateSinupUpDate} = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");

authRouter.post("/singup", async (req, res) => {
  try {
    console.log(req.body);
    validateSinupUpDate(req,res);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.json({success:true, message:"sing up successfull!"});
  } catch (err) {
    console.log("err:",err);
    res.status(400).json({success:false, Error: err});
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user === 0) {
      throw new Error(" not valid crediential!");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      //             genrerate the token here!
      const token = await jwt.sign({ _id: user.id }, "something");
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error(" not valid credential!");
    }
  } catch (err) {
    res.status(400).send("Error: "+err.message);
  }
});

authRouter.post("/logout",async(req,res)=>{
res.cookie("token",null, {expires: new Date( Date.now())} );
res.send("logout successfully!");
})


module.exports = authRouter;