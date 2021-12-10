const users = require("../models").users;
const db = require("../models");

const signup = (req, res) => {
  console.log(req);
  if (
    req.body.name &&
    req.body.surname &&
    req.body.password &&
    req.body.email
  ) {
    users
      .create({
        name: req.body.name,
        surname: req.body.surname,
        password: req.body.password,
        email: req.body.email,
        role: "USER",
        CardNr: null,
      })
      .then((users) => res.status(201).send(users))
      .catch((error) => res.status(400).send(error));
  } else {
    res.status(500).send("missing data");
  }
};

const findUserById = async (req, res) => {
  let User;
  if (!req.body.userId) {
    res.status(500).send("Id needed");
    return null;
  } else {
    User = await db.sequelize.query('SELECT * FROM users WHERE id = "id" ;', {
      replacements: { id: req.body.userId },
      type: db.sequelize.QueryTypes.SELECT,
    });
    res.status(200).send(User);
    return User;
  }
};

module.exports = {
  signup,
  findUserById,
};
