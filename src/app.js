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

const allowedOrigins = [
  "http://localhost:1000",
  "http://34.100.168.31",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true
  })
);

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
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error occurred!");
  });
