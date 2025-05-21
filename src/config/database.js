const mongoose = require ('mongoose');

const connectDB = async ()=> {
mongoose.connect("mongodb+srv://yogeshpriyadarshi55:PUNE1barh@my-mongodb.ixscv0t.mongodb.net/devTinder")

}

module.exports = {connectDB}; 

