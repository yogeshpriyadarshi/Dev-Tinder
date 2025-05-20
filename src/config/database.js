const mongoose = require('mongoose');

const connectDB = async ()=> {
mongoose.connect("mongodb+srv://yogeshpriyadarshi55:PUNE1barh@my-mongodb.ixscv0t.mongodb.net/?retryWrites=true&w=majority&appName=My-mongoDB ")

}

module.exports = {connectDB}; 

