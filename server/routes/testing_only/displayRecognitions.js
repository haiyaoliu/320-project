const mongoose = require("mongoose");
const router = require("express").Router();

mongoose.connect(
  "mongodb+srv://longnguyen:CS320Project@cs320db.aiuni.mongodb.net/cs320?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

require("../../models/Write");
const Recognitions = mongoose.model("Write");

router.get("/", (req, res, done) => {
  Recognitions.find({}, function(err, recognitions) {
    if (err) return console.error(err);
    res.send(recognitions);
  });
});

module.exports = router;