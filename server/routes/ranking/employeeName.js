const mongoose = require("mongoose");
const router = require("express").Router();

require("../../models/Users");
const User = mongoose.model("Users");
require("../../models/Write");
const Recognition = mongoose.model("Write");

let sort = function(data) {
    let sorted = {}
    let coreValues = {}
    //console.log(data);
    data.map(r => {
	console.log(r.recognizeeName);
        if(r.recognizeeName in sorted) {
	    //console.log(r.recognizeeName);
            sorted[r.recognizeeName]++;
        } else {
            sorted[r.recognizeeName] = 1;
        }
    });
    let ranks = Object.entries(sorted);
    //console.log(ranks);
    ranks.sort((a,b) => b[1] - a[1]);
    data.map(r => {
	for(v of r.coreValue) {
	    if(v in coreValues) {
		if(r.recognizeeName in coreValues[v]) {
		    coreValues[v][r.recognizeeName]++;
		} else {
		    coreValues[v][r.recognizeeName] = 1;
		}
	    } else {
		coreValues[v] = {};
		coreValues[v][r.recognizeeName] = 1;
	    }
	}
    });
    let values = [];
    for(value in coreValues) {
	let temp = Object.entries(coreValues[value]).sort((a,b) => b[1] - a[1]);
	values.push([value,temp]);
    }

    return [ranks,values];
}

router.get("/", async (req, res, done) => {
    let ids = sort(await Recognition.find());
    res.json(ids)
});

module.exports = router;
