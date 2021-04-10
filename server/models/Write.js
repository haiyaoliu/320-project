const mongoose = require("mongoose");

const { Schema } = mongoose;

const WriteSchema = new Schema({
    writerID: Number,
    writerName: String,
    recognizeeID: Number,
    recognizeeName: String,
    content: String,
    coreValue: Array,
    createdAt: Date
});

mongoose.model("Write", WriteSchema, "user_recognition");