const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const app = express(); // create express app
const passport = require("passport");

require("./passport");
mongoose.connect(
  "mongodb+srv://longnguyen:CS320Project@cs320db.aiuni.mongodb.net/cs320?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
).catch(error => console.error(error));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/", require("./routes"));

app.use("/testing_only", passport.authenticate("jwt", { session: false }));

app.get("/authentication", (req, res) => {
  console.log(req.body);
  res.send("API Gateway for Authentication")
})



// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on localhost:5000");
});