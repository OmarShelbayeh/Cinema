const users = require("../models").users;
const usersRepository = require("../Repository").usersRepository;
const db = require("../models");
const authentication = require("../config/authentication");

const getAllUsers = (req, res) => {
  let user = authentication.getUserObjectFromToken(req);
  usersRepository.getAllUsers().then((allUsers) => {
    res.status(200).send(allUsers);
  });
};

module.exports = {
  getAllUsers,
};
