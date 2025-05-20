const express = require("express");
const {connectDB} = require("./config/database");

const app = express();
const {authuser} = require("./middleware/auth");

app.use( "/user", authuser,
 (req,res)=>{
 console.log(" second router handler")
     res.send("action two  is done!");
} 


);


// app.use( "router name", ()=>{},  ()=>{}, ()=>{}       )




connectDB()
.then( ()=> {console.log("connection is done!");
    app.listen(2000, ()=> { console.log("server is running at 2000")});
})
.catch((err)=> {console.log("error occurred!")});