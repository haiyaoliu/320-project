const mongoose = require("mongoose");

const { Schema } = mongoose;

const WriteSchema = new Schema({
    firstname: String,
    lastname: String,
    companyId: Number,
    content: String,
    upVote: Number,
    downVote: Number,
    tags: Array,
    createdAt: Date,
    updatedAt: Date,
});

mongoose.model("Write", WriteSchema, "UserPost");