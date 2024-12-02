const mongoose = require("mongoose");


const ChatSchema = mongoose.Schema(
    {
        members: {
            type: Array,
        },
    },
    {
        timestamps: true,
    },
    
    
);

const ChatModel = mongoose.model("chats", ChatSchema);
module.exports = ChatModel;