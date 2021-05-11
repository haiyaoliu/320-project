const { write } = require("fs");
const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Write");
require("../../models/Users");
require("../../models/CoreValues");

const Recognition = mongoose.model("Write");
const Users = mongoose.model("Users");
const CoreValues = mongoose.model("CoreValues");

router.post("/", async (req, res, done) => {
  const { userEmail } = req.fields;
  const user = await Users.findOne({ email: userEmail }).exec();
  if (user === null) {
    res.send([]);
  }
  
  await Users.find({}, 'firstName lastName positionTitle companyName employeeId', function (err, users) {
    if (err) return console.error(err);
    company = users[0].companyName
    CoreValues.findOne(
      { companyName: company },
      "values",
      function (err, coreValue) {
        if (err) return console.error(err);
        values = {}
        coreValue.get('values').map(val => {
          values[val] = 0
        })
      }
    );

    Recognition.find(
      { recognizeeID: user.employeeId },
      null,
      function (err, regs) {
        if (err) return console.error(err);
        regs.forEach(rec => {
          console.log(rec.createdAt)
          rec.coreValue.forEach(val => {
            if(val in values) {
              values[val] += 1  
            }
          })
        })
        res.json(values);
      }
    );
  });
  

  

  
});

module.exports = router;