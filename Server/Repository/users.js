const users = require("../models").users;
const db = require("../models");

newUser = async (res, name, surname, password, email, role) => {
  await users
    .create({
      name: name,
      surname: surname,
      password: password,
      email: email,
      role: role,
    })
    .then((users) => res.status(201).send(users))
    .catch((error) => res.status(400).send(error));
};

findUserByEmail = async (email) => {
  let User;
  User = await db.sequelize.query(
    "SELECT * FROM users WHERE email = :email ;",
    {
      replacements: { email: email },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return User;
};

module.exports = {
  newUser,
  findUserByEmail,
};
