const router = require("express").Router();
const mongoose = require("mongoose");

require("../../models/Write");
const Write = mongoose.model("Write");

router.delete("/:postId", (req, res, done) => {
    Write.deleteOne(
        { _id: req.params.postId },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully approve report and delete post");
        }
    );
});

module.exports = router;