const users = require("../models").users;
const usersRepository = require("../Repository").usersRepository;
const db = require("../models");
const authentication = require("../config/authentication");

const getAllUsers = (req, res) => {
  usersRepository.getAllUsers().then((allUsers) => {
    res.status(200).send(allUsers);
  });
};

const getAllAdmins = (req, res) => {
  usersRepository
    .getAllAdmins(req.body.order)
    .then((allAdmins) => res.status(200).send(allAdmins));
};

const getUserInfo = (req, res) => {
  let user = authentication.getUserObjectFromToken(req);
  usersRepository
    .getUserInfoByEmail(user.email)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((error) => res.status(500).send("User not found"));
};

const addAdmin = async (req, res) => {
  let payload = req.body;
  let user = await usersRepository.getUserInfoByEmail(payload.email);
  if (user.id === null) {
    usersRepository
      .newUser(res, null, null, null, payload.email, "ADMIN", false, false)
      .then(() =>
        res.status(200).send("Added new email " + payload.email + " as Admin!")
      )
      .catch(() => res.status(500).send("Couldn't add a new user as admin;"));
  } else {
    if (user.role === "ADMIN") {
      res.status(500).send("User " + payload.email + " is already an Admin");
    } else {
      usersRepository
        .makeAdmin(user.id)
        .then(() =>
          res.status(200).send("Made user " + payload.email + " Admin!")
        )
        .catch(() => {
          res
            .status(500)
            .send("Couldn't make user " + payload.email + " Admin");
        });
    }
  }
};

const deleteAdmin = async (req, res) => {
  let payload = req.body;
  if (!payload.id || !payload.email) {
    res.status(500).send("Missing data");
  } else {
    usersRepository
      .deleteAdmin(payload.id)
      .then(() =>
        res.status(200).send("Set role user to email " + payload.email)
      )
      .catch(() => res.status(500).send("Couldn't change user's role"));
  }
};

const disableAccount = async (req, res) => {
  let payload = req.body;
  if (!payload.id || !payload.email) {
    res.status(500).send("Missing data");
  } else {
    usersRepository
      .disableAccount(payload.id)
      .then(() => res.status(200).send(payload.email + " disabled!"))
      .catch(() => res.status(500).send("Couldn't disable account"));
  }
};

const enableAccount = async (req, res) => {
  let payload = req.body;
  if (!payload.id || !payload.email) {
    res.status(500).send("Missing data");
  } else {
    usersRepository
      .enableAccount(payload.id)
      .then(() => res.status(200).send(payload.email + " enabled!"))
      .catch(() => res.status(500).send("Couldn't enable account"));
  }
};

changePassword = async (req, res) => {
  let user = authentication.getUserObjectFromToken(req);
  let payload = req.body;
  if (!payload.oldPassword || !payload.password || !payload.passwordrpt) {
    res.status(500).send("Missing data");
  } else {
    if (payload.password !== payload.passwordrpt) {
      res.status(401).send("Passwords don't match");
    } else {
      user = new users(user);
      user.comparePassword(payload.oldPassword, (err, isMatch) => {
        if (isMatch && !err) {
          usersRepository.changePassword(user.id, payload.password).then(() => {
            res.status(200).send("Password changed successfully");
          });
        } else {
          res.status(401).send("Wrong Password");
        }
      });
    }
  }
};

module.exports = {
  getAllAdmins,
  getAllUsers,
  getUserInfo,
  addAdmin,
  deleteAdmin,
  disableAccount,
  enableAccount,
  changePassword,
};
