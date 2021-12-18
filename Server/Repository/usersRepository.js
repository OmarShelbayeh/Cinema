const users = require("../models").users;
const db = require("../models");
var bcrypt = require("bcrypt-nodejs");

newUser = async (
  res,
  name,
  surname,
  password,
  email,
  role,
  active,
  disabled
) => {
  await users.create({
    name: name,
    surname: surname,
    password: password,
    email: email,
    role: role,
    active: active,
    disabled: disabled,
  });
};

makeActive = async (id, name, surname, password) => {
  await db.sequelize.query(
    "UPDATE users SET name = :name, surname = :surname, password = :password, active = true WHERE id = :id ;",
    {
      replacements: {
        id: id,
        name: name,
        surname: surname,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
      },
      type: db.sequelize.QueryTypes.UPDATE,
    }
  );
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

makeAdmin = async (id) => {
  await db.sequelize.query("UPDATE users SET role = 'ADMIN' WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.UPDATE,
  });
};

getAllAdmins = async () => {
  let allAdmins = await db.sequelize.query(
    "SELECT id, name, surname, email, active, disabled FROM users WHERE role = 'ADMIN' order by id;",
    {
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return allAdmins;
};

deleteAdmin = async (id) => {
  await db.sequelize.query("UPDATE users SET role = 'USER' WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.UPDATE,
  });
};

disableAccount = async (id) => {
  await db.sequelize.query(
    "UPDATE users SET disabled = true WHERE id = :id ;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.UPDATE,
    }
  );
};

enableAccount = async (id) => {
  await db.sequelize.query(
    "UPDATE users SET disabled = false WHERE id = :id ;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.UPDATE,
    }
  );
};

module.exports = {
  newUser,
  getAllUsers,
  findUserByEmail,
  findUserById,
  getUserInfoByEmail,
  makeAdmin,
  makeActive,
  getAllAdmins,
  deleteAdmin,
  disableAccount,
  enableAccount,
};
