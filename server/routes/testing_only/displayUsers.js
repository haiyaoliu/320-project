const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Users");
const User = mongoose.model("Users");

router.get("/", (req, res, done) => {
  User.find({}, function (err, users) {
    if (err) return console.error(err);
    res.send(users);
  });
});

module.exports = router;
