const express = require("express");
const {authuser} = require("../middleware/auth");
const User = require ("../models/user");
const { connection } = require("mongoose");
const ConnectionModel = require("../models/connection");

const profileRouter = express.Router();

profileRouter.get("/profile/view", authuser, async (req, res) => {
 const profile = req.user;
  res.send(profile);
});

profileRouter.patch("/profile/edit",authuser ,async (req, res) => {
  try {
    const ALLOWED_UPDATE = ["firstName","lastName","skills", "age", "photural", "gender"];

    const isUpdateAllowed = Object.keys(req.body).every(field => ALLOWED_UPDATE.includes(field) );
    if (!isUpdateAllowed) {
      throw new Error("Update request is not valid!!");
    }
    const upDate = await User.findByIdAndUpdate(req.user._id, req.body, {
      returnDocument: "after", runValidators: true,
    });
    res.send(upDate);
  } catch (err) {
    res.status(400).send("ERROR:", err.message);
  }
});

profileRouter.get("/feed",authuser, async (req, res) => {
  const loggedUser = req.user;
 const connectedUser = await ConnectionModel.find({
    $or: [ {fromUserId:loggedUser}, {toUserId: loggedUser}  ]
  })
console.log("connectedUser:", co)
  res.send("done!");
  // const user = await User.find({});
  // res.send(user);

});



module.exports = profileRouter;