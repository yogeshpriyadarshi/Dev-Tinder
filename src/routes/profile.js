const express = require("express");
const { authuser } = require("../middleware/auth");
const User = require("../models/user");
const ConnectionModel = require("../models/connection");
const { upload } = require("../utils/upload");
const { default: cloudinary } = require("../config/cloudinary");

const profileRouter = express.Router();

profileRouter.get("/view", authuser, async (req, res) => {
  const profile = req.user;
  res.send(profile);
});


profileRouter.post("/upload/image", authuser, upload.single("image"), async (req, res) => {
  try {
    console.log("file is here", req.user);
    const id  = req.user._id;
     const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "my-app" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        stream.end(buffer);
      });
    };

    const result = await uploadToCloudinary(req.file.buffer);
    
     const photoUrl = result.secure_url;
     console.log("photo url is here", photoUrl);  
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { photoUrl },
      { returnDocument: "after", runValidators: true }
    );
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.patch("/update", authuser, async (req, res) => {
  try {
    const id = req.user._id;
    const ALLOWED_UPDATE = [
      "firstName",
      "lastName",
      "skill",
      "age",
      "gender",
      "about",
    ];

    const isUpdateAllowed = Object.keys(req.body).every((field) =>
      ALLOWED_UPDATE.includes(field)
    );
    if (!isUpdateAllowed) {
      throw new Error("Update request is not valid!!");
    }
    const upDate = await User.findByIdAndUpdate(id, req.body, {
      returnDocument: "after",
      runValidators: true,
    });
    res.send(upDate);
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

profileRouter.get("/feed", authuser, async (req, res) => {
  const loggedUser = req.user;
  const connectedToLoggedUser = await ConnectionModel.find({
    $or: [
      {
        fromUserId: loggedUser._id,
        status: { $in: ["ignored", "interested", "accepted"] },
      },
      {
        toUserId: loggedUser._id,
        status: { $in: ["ignored", "interested", "accepted"] },
      },
    ],
  }).select("fromUserId toUserId");

  const uniqueNotFetchId = new Set();
  connectedToLoggedUser.forEach((data) => {
    uniqueNotFetchId.add(data.fromUserId.toString());
    uniqueNotFetchId.add(data.toUserId.toString());
  });

  const user = await User.find({
    $and: [
      { _id: { $nin: Array.from(uniqueNotFetchId) } },
      { _id: { $ne: loggedUser._id } },
    ],
  });
  res.send(user);
});

module.exports = profileRouter;
