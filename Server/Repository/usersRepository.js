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
  return new users(User[0]);
};

getAllUsers = async () => {
  let allUsers;
  allUsers = await db.sequelize.query("SELECT * FROM users ;", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return allUsers;
};

findUserById = async (id) => {
  let User;
  User = await db.sequelize.query("SELECT * FROM users WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.SELECT,
  });
  return new users(User[0]);
};

getUserInfoByEmail = async (email) => {
  let User;
  User = await db.sequelize.query(
    "SELECT id, name, surname, email, role FROM users WHERE email = :email",
    {
      replacements: { email: email },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return new users(User[0]);
};

module.exports = {
  newUser,
  getAllUsers,
  findUserByEmail,
  findUserById,
  getUserInfoByEmail,
};
