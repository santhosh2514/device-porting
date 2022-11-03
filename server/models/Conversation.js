const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
    {
        userId : { type: String }, 
        conversation : [{
            from:  { type: String },
            body: { type: String },
            type: { type: String},
            dateTime: {type: Date},   
        }],
        createdAt : {type: Date}, 
        updatedBy : {type: Date},
    },
    {
        timestamps: true,
        collection: "conversations",
    },
);

module.exports = mongoose.wysa.model("Conversation", conversationSchema);
