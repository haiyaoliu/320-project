const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const app = express(); // create express app
const passport = require("passport");
const bodyParser = require("body-parser");
require("./passport");

app.use(bodyParser.urlencoded({ extended: false }));
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
