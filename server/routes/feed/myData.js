const { write } = require("fs");
const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Write");
require("../../models/Users");

const Recognition = mongoose.model("Write");
const Users = mongoose.model("Users");

router.post("/", async (req, res, done) => {
  const { userEmail } = req.fields;
  const user = await Users.findOne({ email: userEmail }).exec();
  if (user === null) {
    res.send([]);
  }
  
  Recognition.find(
    { writerID: user.employeeId },
    null,
    function (err, regs) {
      if (err) return console.error(err);
      
      values = {}
      regs.forEach(rec => {
        rec.coreValue.forEach(val => {
          if(val in values) {
            values[val] += 1
          } else {
            values[val] = 0
          }
        })
      })
      console.log(values)
      res.send(values);
    }
  );
});

module.exports = router;