const router = require("express").Router();
const mongoose = require("mongoose");

require("../../models/Write");
const Write = mongoose.model("Write");

router.post("/", (req, res, done) => {
    const userpost = new Write(req.body);
    userpost.save(function (err) {
      if (err) return console.error(err);
      res.send("Successfully add write recognition");
    })
});
  

module.exports = router;