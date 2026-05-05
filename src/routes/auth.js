const express = require("express");
const bcrypt = require("bcrypt");
const authRouter = express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const google = require("./google");
const authController = require("../controllers/auth.controller");
const { validateSinupUp } = require("../middleware/auth");

authRouter.post("/signup",validateSinupUp, authController.signup);

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("email and password is here", email, password);
    const user = await User.findOne({ email: email });
    if (user === 0) {
      throw new Error(" not valid crediential!");
    }
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      //             genrerate the token here!
      const token = await jwt.sign({ _id: user.id }, "something");
res.cookie("DevToken", token, {
  httpOnly: true,      // prevents JS from reading the cookie
  secure: false,       // keep false until you enable HTTPS
  sameSite: "lax"     // allow cross-site cookie sending
});
      res.send(user);
    } else {
      throw new Error(" not valid credential!");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

authRouter.post("/google",google ,async(req, res)=>{
  console.log("code is here let us check it...");



});

authRouter.post("/logout", async (req, res) => {
  res.cookie("DevToken", null, { expires: new Date(Date.now()) });
  res.send("logout successfully!");
});

module.exports = authRouter;
