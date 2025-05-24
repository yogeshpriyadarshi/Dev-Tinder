const express = require("express");
const {authuser} = require("../middleware/auth");
const User = require ("../models/user");

const userRouter = express.Router();

userRouter.get("/profile", authuser, async (req, res) => {
 const profile = req.user;
  res.send(profile);
});

userRouter.get("/user",authuser, async (req, res) => { 
  const userName = req.body.firstName;
  try {
    const user = await User.find({ firstName: userName });
    if (user.length === 0) {
      res.status(404).send("user is not found!");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

userRouter.patch("/user/:id",authuser ,async (req, res) => {
  const updateid = req.params.id;
  const data = req.body;
  try {
    const ALLOWED_UPDATE = ["skills", "age", "photural", "gender"];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATE.includes(k)
    );
    if (!isUpdateAllowed) {
      res.send("not update allowed");
    }

    const up = await User.findByIdAndUpdate(updateid, data, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(up);
  } catch (err) {
    res.status(400).send("something went wrong", err.message);
  }
});

userRouter.get("/feed",authuser, async (req, res) => {
  const user = await User.find({});
  res.send(user);
});



module.exports = userRouter;