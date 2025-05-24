const jwt = require("jsonwebtoken");
const User = require("../models/user");


const authuser = async(req, res,next)=>{
    try{
const cookie = req.cookies;
console.log(cookie)
const {token} = cookie;
decodedObj = await jwt.verify(token,"something");
const {_id} = decodedObj;
const user = await User.findById(_id);
req.user=user;
next();
    }catch(err){
        res.status(400).send("Error:"+ err.message);
    }  
}

module.exports={authuser};