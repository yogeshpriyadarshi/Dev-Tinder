require("dotenv").config();
const express = require("express");
const {createServer} = require("node:http");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const BASE_URL = require("./utils/constant");
const PORT = process.env.PORT;

const app = express();

const server = createServer(app);


// OR dynamically allow origin:
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:1000");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   next();
// });




app.use(cors({  origin: 'http://localhost:1000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const connectionRouter = require("./routes/connection");
const {  initializeSocket } = require("./utils/initializeSocket");
const chatRouter = require("./routes/chat");

app.use((req,res,next)=>{
  console.log("api is hit on server!!!/n req",req,{
    time: new Date().toISOString(),
    method: req.method
  });
next();
});

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", connectionRouter);
app.use("/",chatRouter);

initializeSocket(server)

connectDB()
  .then(() => {
    console.log("DB connection is done!");
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error occurred!");
  });
