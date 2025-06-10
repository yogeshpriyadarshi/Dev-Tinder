const express = require("express");
const {authuser} = require("../middleware/auth");
const User = require ("../models/user");
const ConnectionModel = require("../models/connection");

const profileRouter = express.Router();

profileRouter.get("/profile/view", authuser, async (req, res) => {
 const profile = req.user;
  res.send(profile);
});

profileRouter.patch("/profile/edit/:id",authuser ,async (req, res) => {
  try {
    const ALLOWED_UPDATE = ["firstName","lastName","skill", "age", "photoUrl", "gender","about"];

    const isUpdateAllowed = Object.keys(req.body).every(field => ALLOWED_UPDATE.includes(field) );
    if (!isUpdateAllowed) {
      throw new Error("Update request is not valid!!");
    }
    const {id} = req.params;
    console.log(req.params);
    console.log(id);
    const upDate = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after", runValidators: true,
    });
    res.send(upDate);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.get("/feed",authuser, async (req, res) => {
  const loggedUser = req.user;
 const connectedToLoggedUser = await ConnectionModel.find({
    $or: [{fromUserId:loggedUser._id}, {toUserId: loggedUser._id}]
  }).select("fromUserId toUserId");

const uniqueNotFetchId = new Set();
connectedToLoggedUser.forEach((data)=> {  
  uniqueNotFetchId.add(data.fromUserId.toString());
  uniqueNotFetchId.add(data.toUserId.toString());
})

console.log(uniqueNotFetchId);
   const user = await User.find({
    $and:[
{_id: {$nin: Array.from(uniqueNotFetchId) } },
{_id: {$ne: loggedUser._id} }
    ] 
   });
   res.send(user);

});



module.exports = profileRouter;