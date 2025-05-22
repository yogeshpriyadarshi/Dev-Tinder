const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
firstName: {
    type: String,
    required: true,
    trim:true,
},
lastName: {
    type:String
},
email:{
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase:true,
},
password:{
    type:String,
},
age:{
    type:Number,
    min:18,
    max:50
},
gender:{
    type:String,
    validate(value){
        if(!["male","female","others"].includes(value)){
            console.log("done");
        throw new Error("gender data is not valid!");
        }
    }
},
skills:{
    type:[String]
},
photoUrl:{
    type:String,
    default:"Ram"
}

})

const user = mongoose.model("user", userSchema)

module.exports = user;