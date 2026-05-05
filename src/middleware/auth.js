const jwt = require("jsonwebtoken");
const User = require("../models/user");
const validator = require("validator");

const validateSinupUp = (req,res,next)=>{
    try{
        const {firstName, lastName, email, password} = req.body;
        if(!firstName || !lastName){
            throw new Error("first name and last name are required!");
        }else if(firstName.length < 3 || firstName.length > 25){
            throw new Error("character of first name should be in between 3 and 25");
        }else if(!validator.isEmail(email)){
            throw new Error("Not valid Email Id!");
        }else if(!validator.isStrongPassword(password)){
            throw new Error("Not Strong Password");
        }
        next();
    }catch(err){
       return res.status(400).json({success: false, err: err.message});
    }   
}

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
        return res.status(401).send("Error:"+ err.message);
    }  
}

module.exports= {authuser, validateSinupUp};