const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Write");
const Recognition = mongoose.model("Write");

router.get("/", async (req, res, done) => {
  try {
    const recognitions = await Recognition.find();
    res.send(recognitions);
  } catch (err) {
    return console.error(err);
  }
});

module.exports = router;