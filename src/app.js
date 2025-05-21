const express = require("express");
const {connectDB} = require("./config/database");
const User = require("./models/user")

const app = express();

app.use(express.json());
const {authuser} = require("./middleware/auth");

app.post( "/sinup", async(req,res)=>{

    console.log("done this data",req.body);

    try{
const user = new User(req.body);
await user.save();
     res.send("action one  is done!");
    }catch(err){
console.log("error");
    }
    
} 
);




connectDB()
.then( ()=> {console.log("connection is done!");
    app.listen(2000, ()=> { console.log("server is running at 2000")});
})
.catch((err)=> {console.log("error occurred!")});