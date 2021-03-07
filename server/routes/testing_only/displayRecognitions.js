const mongoose = require("mongoose");
const router = require("express").Router();
//const faker = require('faker'); //fake data

//const randomParagraph = faker.lorem.paragraphs(); //fake recognition paragraph

mongoose.connect(
  "mongodb+srv://longnguyen:CS320Project@cs320db.aiuni.mongodb.net/cs320?retryWrites=true&w=majority"
);

require("../../models/Write");
const Recognitions = mongoose.model("Write");

router.get("/", (req, res, done) => {
  Recognitions.find({}, function(err, recognitions) {
    if (err) return console.error(err);
      res.send(recognitions); //send real data
  });
  //res.send(randomParagraph); //send fake data
});

module.exports = router;