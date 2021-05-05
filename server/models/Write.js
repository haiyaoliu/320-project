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
    reported: Boolean,
    reportReason: Array,
    like: Array,
    likeCount: Number,
    celebrate: Array,
    celebrateCount: Number,
    support: Array,
    supportCount: Number,
    love: Array,
    loveCount: Number,
    insightful: Array,
    insightfulCount: Number,
    curious: Array,
    curiousCount: Number

});

mongoose.model("Write", WriteSchema, "user_recognition");