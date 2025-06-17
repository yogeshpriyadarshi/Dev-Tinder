
const {Server} = require("socket.io")


const initializeSocket = (server)=> {
const io = new Server(server, {cors :
  {origin:"*"}}
);

io.on("connection", (socket)=>{

socket.on("join", ({firstName,userId,targetId})=>{ 
const room = [userId, targetId].sort().join("_");
console.log(firstName,"joined room:",room);
socket.join(room);
})

socket.on("sendMessage", ( {firstName, userId, targetId, message } )=>{
console.log("message",message);
const room = [userId,targetId].sort().join("_");
io.to(room).emit("receiveMessage",  {firstName, message });

    }  );

socket.on("disconnected", ()=>{   })


})

}

module.exports = {initializeSocket};
