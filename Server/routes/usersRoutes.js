const express = require("express");
const router = express.Router();
const usersRepository = require("../Repository").usersRepository;
const usersController = require("../controllers").usersController;

router.get("/users", usersController.getAllUsers);

module.exports = router;
