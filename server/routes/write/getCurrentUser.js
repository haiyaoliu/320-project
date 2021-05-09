const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Users");
const User = mongoose.model("Users");

router.post("/", (req, res, done) => {
    User.findOne({email: req.fields.email }, "employeeId firstName lastName positionTitle companyName startDate", function (err, users) {
        if (err) return console.error(err);
        res.send(users);
    });
});

module.exports = router;