const { Server } = require("socket.io");

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
