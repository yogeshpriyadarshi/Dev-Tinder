const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    senderId : { type: mongoose.Schema.Types.ObjectId,ref: "user", required:true },
    text:{ type: String, required:true }
},{timestamps:true}
)

const chatSchema = new mongoose.Schema({
    participants: [ { type: mongoose.Schema.Types.ObjectId,ref:"user",required:true } ],
    message:[messageSchema]
})

const Chat = mongoose.model("chat", chatSchema);

module.exports = {Chat};