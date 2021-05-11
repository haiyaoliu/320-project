const router = require("express").Router();
const mongoose = require("mongoose");

require("../../models/Write");
const Write = mongoose.model("Write");
mongoose.set('useFindAndModify', false);

router.patch("/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $set: { "reported" : false, "reportReason" : "Report denied" } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully deny report");
        }
    );
});

module.exports = router;