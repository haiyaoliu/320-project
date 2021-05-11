const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Write");
const Recognition = mongoose.model("Write");

router.get("/", (req, res, done) => {
  Recognition.find({ "reported": true }, null, { sort: { createdAt: 'desc' } }, function (err, users) {
    if (err) return console.error(err);
    res.send(users)
  });
});

module.exports = router;