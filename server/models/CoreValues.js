const mongoose = require("mongoose");

const { Schema } = mongoose;

const CoreSchema = new Schema({
    companyID: Number,
    companyName: String,
    coreValue: Array,
});

mongoose.model("CoreValues", CoreSchema, "core_values");