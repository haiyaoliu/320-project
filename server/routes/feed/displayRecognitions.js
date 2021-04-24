const { write } = require("fs");
const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Write");
require("../../models/Users");

const Recognition = mongoose.model("Write");
const Users = mongoose.model("Users");

router.get("/", async (req, res, done) => {
  Recognition.find(
    {},
    null,
    { sort: { createdAt: "desc" } },
    function (err, regs) {
      if (err) return console.error(err);
      res.send(regs);
    }
  );
});

router.post("/myRecognition", async (req, res, done) => {
  const { userEmail } = req.fields;

  const user = await Users.findOne({ email: userEmail }).exec();
  if (user === null) {
    res.send([]);
  }
  
  Recognition.find(
    { writerID: user.employeeId },
    null,
    { sort: { createdAt: "desc" } },
    function (err, regs) {
      if (err) return console.error(err);
      res.send(regs);
    }
  );
});

router.get("/coreValues", async (req, res, done) => {
  const values = req.fields.values.split("&");

  Recognition.find(
    { coreValue: { $all: values } },
    null,
    { sort: { createdAt: "desc" } },
    function (err, regs) {
      if (err) return console.error(err);
      res.send(regs);
    }
  );
});

module.exports = router;
