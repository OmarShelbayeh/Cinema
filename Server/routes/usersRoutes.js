const express = require("express");
const router = express.Router();
const usersController = require("../controllers").usersController;
const authentication = require("../config/authentication");

router.get("/users", authentication.ensureAdmin, usersController.getAllUsers);

module.exports = router;
