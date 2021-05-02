const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/CoreValues");
const CoreValues = mongoose.model("CoreValues");

require("../../models/Users");
const User = mongoose.model("Users");

router.post("/getCoreValue", (req, res, done) => {
    CoreValues.findOne(
        { companyName: req.fields.company },
        "values",
        function (err, coreValue) {
            if (err) return console.error(err);
            res.send(coreValue);
        }
    );
});


router.post("/getCurrentUser", (req, res, done) => {
    User.findOne({ email: req.fields.email }, "employeeId firstName lastName", function (err, users) {
        if (err) return console.error(err);
        res.send(users);
    });
});


router.get("/getPeerList", (req, res, done) => {
    User.find({}, 'firstName lastName positionTitle companyName employeeId legoCharacterUrl', function (err, users) {
        if (err) return console.error(err);
        res.send(users)
    });
});


module.exports = router;
