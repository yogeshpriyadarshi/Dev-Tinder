const express = require("express");
const { authuser } = require("../middleware/auth");
const ConnectionModel = require("../models/connection");

const connectionRouter = express.Router();

    const SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "about",
  "gender",
  "photoUrl",
];

connectionRouter.get("/connection",authuser, async(req , res)=>{
    const loggedUser = req.user;
    const AllConnection = await ConnectionModel.find(
        {$or:[{ fromUserId: loggedUser?._id,status:"accepted"}, {toUserId:loggedUser?._id,status:"accepted"}]
    }).populate("fromUserId",SAFE_DATA).populate("toUserId", SAFE_DATA);

res.send(AllConnection)
})



module.exports = connectionRouter;