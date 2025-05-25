const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
    fromUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum: {values: ["ignored","interested","rejected","accepted"]}
    },
},
{
    timestamps:true,
}
)


const ConnectionModel = mongoose.model("connection",connectionSchema);

module.exports = ConnectionModel;