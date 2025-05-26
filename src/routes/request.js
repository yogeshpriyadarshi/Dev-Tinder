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
if(!user){
    throw new Error("request Id is not present!");
}

// check connectin is already exist!

const connectionExist = await ConnectionModel.findOne({
$or:[
    {fromUserId,toUserId},
    { fromUserId:toUserId, toUserId:fromUserId }
]
});
if(connectionExist){
    throw new Error("connetion already exist")
}


 
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


requestRouter.post("/request/review/:status/:requestId",authuser,async(req,res) =>{
    try{
   const {status,requestId} = req.params;
   const toUserId = requestId;
   const fromUserId = req.user._id;

const AllowedStatus = ["accepted","rejected"];

 if( !AllowedStatus.includes(status) ) {
throw new Error("Status is not defined!");
 }

 console.log("userid is ",requestId);

const user= await User.findById(requestId);
if(!user){
    throw new Error("request Id is not present!");
}

// check connection is already exist and it's status is interested!

const connectionExist = await ConnectionModel.findOne({
fromUserId: requestId,
toUserId: req.user._id,
status:"interested"
});
if(!connectionExist){
    throw new Error("connetion is not  exist")
}
 


 
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

requestRouter.get("/request/view/", authuser,async(req,res)=>{
 const logedInUser = req.user;
 const requestUser = await ConnectionModel.find({ toUserId:logedInUser._id  })
res.send(requestUser);
})


module.exports = requestRouter;