const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId : { type: mongoose.Schema.Types.ObjectId,ref: "User", required:true },
    text:{ type: String, required:true }
})

const chatSchema = new mongoose.Schema({
    participants: [ { type: mongoose.Schema.Types.ObjectId,ref:"User",required:true } ],
    message:[messageSchema]
})

const chat = mongoose.model("chat", chatSchema);

module.exports = {chat};