const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/CoreValues");
const CoreValues = mongoose.model("CoreValues");

router.post("/", (req, res, done) => {
  CoreValues.findOne(
    { companyName: req.fields.company },
    "values",
    function (err, coreValue) {
      if (err) return console.error(err);
      res.send(coreValue);
    }
  );
});

module.exports = router;
