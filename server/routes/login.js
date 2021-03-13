const router = require("express").Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/", (req, res, next) => {
  req.body.email = req.fields.email;
  req.body.password = req.fields.password;

  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("An error occurred.");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, "TOP_SECRET", {
          expiresIn: process.env.expirationTime,
        });

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

module.exports = router;
