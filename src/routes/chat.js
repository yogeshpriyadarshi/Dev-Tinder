const express = require("express");
const { authuser } = require("../middleware/auth");
const { Chat } = require("../models/chat");
const chatRouter = express.Router();

chatRouter.get("/chat/:targetUserId", authuser, async (req, res) => {
  try {
    const userId = req.user?._id;
    const {targetUserId} = req.params;
    const chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: "message.senderId",
      select: "firstName lastName",
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        message: [],
      });
      await chat.save();
    }
    res.json(chat);
  } catch (err) {
    console.error(err);
  }
});

module.exports = chatRouter;
