require("dotenv").config();
const path = require("path");
const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const formidable = require("express-formidable");
require("./passport");

const app = express(); // create express app

//packages
app.use(formidable());

//database
mongoose.connect(process.env.dblink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set("useCreateIndex", true);

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));

//React routes
app.use(express.static(path.join(__dirname, "..", "build")));

//APIs
app.use("/testing_only", passport.authenticate("jwt", { session: false }));
app.use("/", require("./routes"));

app.get("/authentication", (req, res) => {
  console.log(req.body);
  res.send("API Gateway for Authentication")
})



// start express server on port 5000
app.listen(process.env.PORT, () => {
  console.log(`server started on localhost:${process.env.PORT}`);
});
