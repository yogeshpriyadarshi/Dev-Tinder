const express = require("express");
const {connectDB} = require("./config/database");
const User = require("./models/user")
const {validateSinupUpDate} = require("./utils/validation");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post( "/sinup", async(req,res)=>{
    console.log(req.body);
    try{
validateSinupUpDate(req);

const {firstName, lastName, email, password} = req.body;

const passwordhash = await bcrypt.hash(password,10);

const user = new User({
firstName,
lastName,
email,
password:passwordhash
});
await user.save();
     res.send("user data is successfully uploaded!");
    }catch(err){
        res.status(400).send(err.message);
    }
} 
);

app.post("/login", async(req,res)=> {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({email:email});
        if(user===0){
            throw new Error("not valid crediential!");
        }
        const isCorrectPassword = await bcrypt.compare(password,user.password);

        if(isCorrectPassword){
            res.send( user.firstName  + " successfully login")
        }else{
            throw new Error("not valid credential!");
        }
    }catch{
        res.status(400).send("invalid credential!");
    }
})

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

app.patch("/user/:id",async(req,res)=>{

    console.log("first",req.body);
    const updateid = req.params.id;
    console.log("first,",updateid);
    const data = req.body;

    try{
        const ALLOWED_UPDATE = ["skills","age","photural","gender"];

        const isUpdateAllowed = Object.keys(data).every( (k)=> ALLOWED_UPDATE.includes(k))
        if(!isUpdateAllowed){
            res.send("not update allowed");
        }


        const up = await User.findByIdAndUpdate( updateid, data, { returnDocument:'after', runValidators:true});       
        res.send(up);
    }catch(err){
        res.status(400).send("something went wrong",err.message);
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