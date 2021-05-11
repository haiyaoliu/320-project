const { time } = require("console");
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

router.post("/dashboardFilter", async (req, res, done) => {
  const values = req.fields.values.split("&");
  const userEmail = req.fields.userEmail;
  let searchParams = {}

  let arr = values
  if(values.includes("myrecognitions")) {
    const user = await Users.findOne({ email: userEmail }).exec();
    if (user === null) {
      res.send([]);
    }
    searchParams["recognizeeID"] = user.employeeId
    arr = values.filter(item => item !== "myrecognitions")
  }

  let today = new Date()
  let timestamp = new Date(today)
  switch(arr[0]) {
    case "pastday":
      timestamp.setDate(timestamp.getDate() - 1)
      break
    case "pastweek":
      timestamp.setDate(timestamp.getDate() - 7)
      break
    case "pastmonth":
      timestamp.setDate(timestamp.getDate() - 31)
      break
    default:
      timestamp = new Date('August 19, 1975 23:15:30')  
  }
  searchParams["createdAt"] = {$gt: timestamp}

  Recognition.find(
    searchParams,
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
    { recognizeeID: user.employeeId },
    null,
    { sort: { createdAt: "desc" } },
    function (err, regs) {
      if (err) return console.error(err);
      res.send(regs);
    }
  );
});

router.post("/coreValues", async (req, res, done) => {
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
