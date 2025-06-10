const mongoose = require("mongoose");

const connectionSchema = new mongoose.Schema({
    fromUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"user"
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    status:{
        type:String,
        enum: {values: ["ignored","interested","rejected","accepted","cancel"]}
    },
},
{
    timestamps:true,
}
)


const ConnectionModel = mongoose.model("connection",connectionSchema);

module.exports = ConnectionModel;