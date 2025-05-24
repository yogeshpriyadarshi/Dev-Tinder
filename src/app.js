const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');

console.log(authRouter,userRouter);

 app.use("/",authRouter);
 app.use("/",userRouter);

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
