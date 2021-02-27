const path = require("path");
const express = require("express");
const app = express(); // create express app
const passport = require("passport");
const bodyParser = require("body-parser");
require("./passport");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use("/", require("./routes"));

app.use("/testing_only", passport.authenticate("jwt", { session: false }));

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on localhost:5000");
});
