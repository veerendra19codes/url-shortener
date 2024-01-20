// import mongoose from "mongoose"
const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            unique: true,
            required: true,
        },
        redirectURL : {
            type: String,
            required: true,
        },
        visitHistory: [
            {
                timestamps: { type: Number}
            }
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }, 
    { timestamps: true}
);

// export default URL = mongoose.model('url', urlSchema);
const URL=  mongoose.model("url", urlSchema);

module.exports = URL;