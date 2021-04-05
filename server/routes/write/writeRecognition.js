const router = require("express").Router();
const mongoose = require("mongoose");

require("../../models/Write");
const Write = mongoose.model("Write");

router.post("/", (req, res, done) => {
  req.body.writerID = req.fields.writerID
  req.body.writerName = req.fields.writerName
  req.body.recognizeeID = req.fields.recognizeeID
  req.body.recognizeeName = req.fields.recognizeeName
  req.body.content = req.fields.content
  req.body.coreValue = req.fields.coreValue
  req.body.createdAt = req.fields.createdAt
  const userpost = new Write(req.body);
  userpost.save(function (err) {
    if (err) return console.error(err);
    res.send("Successfully add write recognition");
  })
});
  

module.exports = router;