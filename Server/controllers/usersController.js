const users = require("../models").users;
const usersRepository = require("../Repository").usersRepository;
const db = require("../models");

const getAllUsers = (req, res) => {
  usersRepository.getAllUsers().then((allUsers) => {
    res.status(200).send(allUsers);
  });
};

module.exports = {
  getAllUsers,
};
