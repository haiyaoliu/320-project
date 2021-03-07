const mongoose = require("mongoose");
const router = require("express").Router();

mongoose.connect(
  "mongodb+srv://longnguyen:CS320Project@cs320db.aiuni.mongodb.net/cs320?retryWrites=true&w=majority"
);

require("../../models/Users");
const User = mongoose.model("Users");

router.get("/", (req, res, done) => {
  User.find(function (err, users) {
    if (err) return console.error(err);
    res.send(users);
  });
});

module.exports = router;
