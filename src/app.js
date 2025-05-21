const express = require("express");
const {connectDB} = require("./config/database");
const User = require("./models/user")

const app = express();

app.use(express.json());
const {authuser} = require("./middleware/auth");

app.post( "/sinup", async(req,res)=>{
    try{
const user = new User(req.body);
await user.save();
     res.send("action one  is done!");
    }catch(err){
console.log("error");
    }
} 
);

app.get("/user", async(req,res)=>{
const userName = req.body.firstName;
try{
const user= await User.find({firstName:userName});
if(user.length===0){
    res.status(404).send("user is not found!")
}else{
res.send(user);
}
}catch(err){
res.status(400).send("something went wrong!");
}
})

app.get("/feed", async(req,res)=>{
  const user = await User.find({});
  res.send(user);
})

app.delete("/delete", async(req,res)=> {
    try{
        console.log("first",req.body.id);
const del = await User.deleteOne({_id:req.body.id});
res.send(del);
    }catch(err){
res.status(400).send("something went wrong!");
    }
})




connectDB()
.then( ()=> {console.log("connection is done!");
    app.listen(2000, ()=> { console.log("server is running at 2000")});
})
.catch((err)=> {console.log("error occurred!")});