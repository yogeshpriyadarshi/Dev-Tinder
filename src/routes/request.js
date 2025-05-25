const { authuser } = require("../middleware/auth");

const express = require("express");
const User = require("../models/user");
const ConnectionModel = require("../models/connection");

const requestRouter = express.Router();

requestRouter.post("/request/sent/:status/:requestId",authuser,async(req,res) =>{
    try{
   const {status,requestId} = req.params;
   const toUserId = requestId;
   const fromUserId = req.user._id;

const AllowedStatus = ["interested","ignored"];

 if( !AllowedStatus.includes(status) ) {
throw new Error("Status is not defined!");
 }

 console.log("userid is ",requestId);

const user= await User.findById(requestId);

console.log("user send form back",user);
res.send("request sended"+user + req.user);
 
const connection = new ConnectionModel({
    fromUserId,
    toUserId,
    status
})
connection.save();

    }catch(err){
        res.send("ERROR:" + err.message);
    }
 





})



module.exports = requestRouter;