const mongoose = require("mongoose");
const validator = require("validator");

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
    validate(value){
        if(!validator.isEmail(value)){
            throw new Error("email is not valid :"+ value);
        }
    }
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
    enum: { values :["male","female","others"]}
    // validate(value){
    //     if(!["male","female","others"].includes(value)){
    //         console.log("done");
    //     throw new Error("gender data is not valid!");
    //     }
    // }
},
about:{
type:String,
},
skills:{
    type:[String]
},

photoUrl:{
    type:String,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHnBIS8n-YyUuciFuAZSFHPiCEbbbuhdjBIA&s"
} },
{
    timestamps: true,
});

const User = mongoose.model("user", userSchema)

module.exports = User;