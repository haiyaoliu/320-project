const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Write");
const Recognition = mongoose.model("Write");

router.get("/", async (req, res, done) => {
  await Recognition.find({}, function(err, recognitions) {
    if (err) return console.error(err);
    res.send(recognitions);
  });
});

module.exports = router;