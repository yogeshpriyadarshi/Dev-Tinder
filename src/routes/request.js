const { authuser } = require("../middleware/auth");

const express = require("express");
const User = require("../models/user");
const ConnectionModel = require("../models/connection");

const requestRouter = express.Router();
const SAFE_DATA = [
  "firstName",
  "lastName",
  "age",
  "about",
  "gender",
  "photoUrl",
];

requestRouter.post(
  "/request/sent/:status/:toRequestId",
  authuser,
  async (req, res) => {
    try {
      const { status, toRequestId } = req.params;
      const fromUserId = req.user._id;
      const toUserId = toRequestId;
      const AllowedStatus = ["interested", "ignored"];
      if (!AllowedStatus.includes(status)) {
        throw new Error("Status is not defined!");
      }
      const user = await User.findById(toUserId);
      if (!user) {
        throw new Error("request Id is not present!");
      }
      // check connectin is already exist!
      const connectionExist = await ConnectionModel.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (connectionExist) {
        throw new Error("connetion already exist");
      }
      const connection = new ConnectionModel({
        fromUserId,
        toUserId,
        status,
      });
      connection.save();
      res.json({ success: true });
    } catch (err) {
      res.send("ERROR:" + err.message);
    }
  }
);

requestRouter.patch("/request/cancel/:requestId",authuser, async(req, res)=>{
try{
const loggedUser = req.user;
const {requestId} = req.params;
const fromUserId = loggedUser?._id;
const toUserId = requestId;

  const connectionExist = await ConnectionModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
            status: "interested",
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
            status: "interested",
          },
        ],
      });

  const updateRequest = await ConnectionModel.findByIdAndUpdate(
        connectionExist?._id,
        {status:"cancel"},
        { returnDocument: "after", runValidators: true }
      );
      if(updateRequest){
      res.json({ success: true });
      }
}catch(err){
console.error(err);
}
})

requestRouter.patch(
  "/request/review/:status/:requestId",
  authuser,
  async (req, res) => {
    try {
      const loggedUser = req.user;
      const { status, requestId } = req.params;
      const fromUserId = requestId;
      const toUserId = loggedUser._id;
      const AllowedStatus = ["accepted", "declined"];
      if (!AllowedStatus.includes(status)) {
        throw new Error("Status is not defined!");
      }
      const connectionExist = await ConnectionModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
            status: "interested",
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
            status: "interested",
          },
        ],
      });
    
      const updateRequest = await ConnectionModel.findByIdAndUpdate(
        connectionExist?._id,
        req.body,
        { returnDocument: "after", runValidators: true }
      );
      if(updateRequest){
      res.json({ success: true });
      }
    } catch (err) {
      res.send("ERROR:" + err.message);
    }
  }
);
requestRouter.get("/request/sent/", authuser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requestUser = await ConnectionModel.find({
     fromUserId : loggedInUser._id,
      status: "interested",
    }).populate("toUserId", SAFE_DATA);
    res.send(requestUser);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

requestRouter.get("/request/view/", authuser, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const requestUser = await ConnectionModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", SAFE_DATA);
    res.send(requestUser);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

module.exports = requestRouter;
