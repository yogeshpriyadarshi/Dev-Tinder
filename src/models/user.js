const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
firstName: {
    type: String,
    required: true,
    trim:true,
},
lastName: {
    type:String,
    default: ""
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
    default:null,
    min:18,
    max:50
},
gender:{
    type:String,
    default:"",
    enum: { values :["male","female","others"]}
},
about:{
type:String,
default:""
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