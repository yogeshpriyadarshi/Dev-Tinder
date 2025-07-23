const jwt = require("jsonwebtoken");
const User = require("../models/user");


const authuser = async(req, res,next)=>{
    try{
const cookie = req.cookies;
const {DevToken} = cookie;
if(!DevToken){
    return res.status(401).send("please Login!");
}
decodedObj = await jwt.verify(DevToken,"something");
const {_id} = decodedObj;
const user = await User.findById(_id);
req.user=user;
next();
    }catch(err){
        res.status(401).send("Error:"+ err.message);
    }  
}

module.exports= {authuser};