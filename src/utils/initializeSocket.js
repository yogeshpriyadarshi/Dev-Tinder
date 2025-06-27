const { Server } = require("socket.io");
const { Chat } = require("../models/chat");

const initializeSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("join", ({ firstName, userId, targetId }) => {
      const room = [userId, targetId].sort().join("_");
      console.log(firstName, "joined room:", room);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, userId, targetId, message }) => {
        try {
          let chat = await Chat.findOne({
            participants: { $all:[userId,targetId]}
          })

          if(!chat){
            chat = new Chat({
              participants: [userId, targetId],
              message: []
            })
          }

          chat.message.push({
            senderId: userId,
            text:message
          });
          await chat.save();
          const room = [userId, targetId].sort().join("_");
          io.to(room).emit("receiveMessage", { firstName, message });
          // save message
        } catch (err) {
          console.err(err);
        }
      }
    );

    socket.on("disconnected", () => {});
  });
};

module.exports = { initializeSocket };
