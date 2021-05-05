const router = require("express").Router();
const mongoose = require("mongoose");

require("../../models/Write");
const Write = mongoose.model("Write");
mongoose.set('useFindAndModify', false);

router.patch("/like/:postId", async (req, res, done) => {
    const already = await Write.find({
        _id: req.params.postId,
        like: { $in: [req.fields.reacterName] },
    }).countDocuments();
    if(already) {
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $pull: { "like" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "likeCount" : -1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully remove like");
            }
        );
    } else {
        Write.updateOne(
            { _id: req.params.postId },
            { $addToSet: { "like" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "likeCount" : 1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully add like");
            }
        );
    }
});

router.patch("/celebrate/:postId", async (req, res, done) => {
    const already = await Write.find({
        _id: req.params.postId,
        celebrate: { $in: [req.fields.reacterName] },
    }).countDocuments();
    if(already) {
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $pull: { "celebrate" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "celebrateCount" : -1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully remove celebrate");
            }
        );
    } else {
        Write.updateOne(
            { _id: req.params.postId },
            { $addToSet: { "celebrate" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "celebrateCount" : 1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully add celebrate");
            }
        );
    }
});

router.patch("/support/:postId", async (req, res, done) => {
    const already = await Write.find({
        _id: req.params.postId,
        support: { $in: [req.fields.reacterName] },
    }).countDocuments();
    if(already) {
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $pull: { "support" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "supportCount" : -1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully remove support");
            }
        );
    } else {
        Write.updateOne(
            { _id: req.params.postId },
            { $addToSet: { "support" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "supportCount" : 1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully add support");
            }
        );
    }
});

router.patch("/love/:postId", async (req, res, done) => {
    const already = await Write.find({
        _id: req.params.postId,
        love: { $in: [req.fields.reacterName] },
    }).countDocuments();
    if(already) {
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $pull: { "love" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "loveCount" : -1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully remove love");
            }
        );
    } else {
        Write.updateOne(
            { _id: req.params.postId },
            { $addToSet: { "love" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "loveCount" : 1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully add love");
            }
        );
    }
});

router.patch("/insightful/:postId", async (req, res, done) => {
    const already = await Write.find({
        _id: req.params.postId,
        insightful: { $in: [req.fields.reacterName] },
    }).countDocuments();
    if(already) {
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $pull: { "insightful" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "insightfulCount" : -1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully remove insightful");
            }
        );
    } else {
        Write.updateOne(
            { _id: req.params.postId },
            { $addToSet: { "insightful" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "insightfulCount" : 1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully add insightful");
            }
        );
    }
});

router.patch("/curious/:postId", async (req, res, done) => {
    const already = await Write.find({
        _id: req.params.postId,
        curious: { $in: [req.fields.reacterName] },
    }).countDocuments();
    if(already) {
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $pull: { "curious" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "curiousCount" : -1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully remove curious");
            }
        );
    } else {
        Write.updateOne(
            { _id: req.params.postId },
            { $addToSet: { "curious" : req.fields.reacterName } },
            function (err) {
                if (err) return console.error(err);
            }
        );
        Write.findOneAndUpdate(
            { _id: req.params.postId },
            { $inc: { "curiousCount" : 1 } },
            function (err) {
                if (err) return console.error(err);
                res.send("Successfully add curious");
            }
        );
    }
});

module.exports = router;