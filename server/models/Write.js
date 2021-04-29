const mongoose = require("mongoose");

const { Schema } = mongoose;

const WriteSchema = new Schema({
    writerID: Number,
    writerName: String,
    recognizeeID: Number,
    recognizeeName: String,
    content: String,
    coreValue: Array,
    createdAt: Date,
    like: Number,
    celebrate: Number,
    support: Number,
    love: Number,
    insightful: Number,
    curious: Number,
    reported: Boolean,
    reportReason: Array
});

mongoose.model("Write", WriteSchema, "user_recognition");