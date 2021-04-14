const router = require("express").Router();
const mongoose = require("mongoose");

require("../../models/Write");
const Write = mongoose.model("Write");
mongoose.set('useFindAndModify', false);

router.patch("/like/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $inc: { "like" : 1 } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully add like");
        }
    );
});

router.patch("/celebrate/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $inc: { "celebrate" : 1 } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully add celebrate");
        }
    );
});

router.patch("/support/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $inc: { "support" : 1 } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully add support");
        }
    );
});

router.patch("/love/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $inc: { "love" : 1 } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully add love");
        }
    );
});

router.patch("/insightful/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $inc: { "insightful" : 1 } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully add insightful");
        }
    );
});

router.patch("/curious/:postId", (req, res, done) => {
    Write.findOneAndUpdate(
        { _id: req.params.postId },
        { $inc: { "curious" : 1 } },
        function (err) {
            if (err) return console.error(err);
            res.send("Successfully add curious");
        }
    );
});

module.exports = router;