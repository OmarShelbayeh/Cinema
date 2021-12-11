const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
require("../config/passport")(passport);
const usersRepository = require("../Repository").usersRepository;

router.post("/register", async function signup(req, res) {
  if (
    req.body.name &&
    req.body.surname &&
    req.body.password &&
    req.body.email
  ) {
    if ((await usersRepository.findUserByEmail(req.body.email)).id === null) {
      await usersRepository.newUser(
        res,
        req.body.name,
        req.body.surname,
        req.body.password,
        req.body.email,
        "USER"
      );
    } else {
      res.status(500).send("User exists");
    }
  } else {
    res.status(500).send("missing data");
  }
});

router.post("/login", async function (req, res) {
  usersRepository
    .findUserByEmail(req.body.email)
    .then((user) => {
      if (!user.dataValues.id) {
        return res.status(401).send({
          message: "Authentication failed. User not found.",
        });
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          var token = jwt.sign(
            JSON.parse(JSON.stringify(user)),
            process.env.JWTSECRETKEY,
            { expiresIn: 86400 * 30 }
          );
          jwt.verify(token, process.env.JWTSECRETKEY);
          res.json({ success: true, token: "Bearer " + token });
        } else {
          res.status(401).send({
            success: false,
            msg: "Authentication failed. Wrong password.",
          });
        }
      });
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
