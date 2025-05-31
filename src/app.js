const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const BASE_URL = require("./utils/constant");

const app = express();

app.use(cors({ origin: BASE_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const connectionRouter = require("./routes/connection");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", connectionRouter);

connectDB()
  .then(() => {
    console.log("connection is done!");
    app.listen(2000, () => {
      console.log("server is running at 2000");
    });
  })
  .catch((err) => {
    console.log("error occurred!");
  });
