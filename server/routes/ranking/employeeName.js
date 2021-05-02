const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Users");
const User = mongoose.model("Users");
require("../../models/Write");
const Recongnition = mongoose.model("Write");

let sort = function(data) {
    let sorted = {}
    data.map(r => {
        r = JSON.parse(JSON.stringify(r))
        if(r.recognizeeName in sorted) {
            sorted[r.recognizeeName]++;
        } else {
            sorted[r.recognizeeName] = 1;
        }
    });
    return Object.entries(sorted).sort((a,b) => b[1] - a[1]);
}

router.get("/", async (req, res, done) => {
    let ids = sort(await Recongnition.find());
    res.json(ids)
});

module.exports = router;