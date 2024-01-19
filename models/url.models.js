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
        ]
    }, 
    { timestamps: true}
);

// export default URL = mongoose.model('url', urlSchema);
const URL=  mongoose.model("url", urlSchema);

module.exports = URL;