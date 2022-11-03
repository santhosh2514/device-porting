const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name : { type: String }, 
        deviceDetails : { type: String }, 
        uniqueId: { type: String },
        portDetails: {
            status: {
                type : String,
                enum: ["available","expired", "ported"]
            },
            otp: { type : String },
        },
        createdAt : {type: Date}, 
        updatedBy : {type: Date},
    },
    {
        timestamps: true,
        collection: "users",
    },
);

module.exports = mongoose.wysa.model("User", userSchema);
