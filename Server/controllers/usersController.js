const users = require("../models").users;
const usersRepository = require("../Repository").usersRepository;
const db = require("../models");

const signup = async (req, res) => {
  if (
    req.body.name &&
    req.body.surname &&
    req.body.password &&
    req.body.email
  ) {
    if ((await usersRepository.findUserByEmail(req.body.email)).length === 0) {
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
};

module.exports = {
  signup,
};
