const validator = require("validator");

const validateSinupUpDate = (req)=>{
    const { firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName){
        throw new Error("name is not valid");
    }else if( firstName.length<3 || firstName.length>20){
        throw new Error("first name should be between 3 character to 20 character!");
    }else if(!validator.isEmail(email)){
           throw new Error("not valid email id");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("password is not strong!")
    }
}

module.exports = {validateSinupUpDate}