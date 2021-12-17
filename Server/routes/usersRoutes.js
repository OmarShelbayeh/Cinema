const express = require("express");
const router = express.Router();
const usersController = require("../controllers").usersController;
const authentication = require("../config/authentication");

router.get("/info", usersController.getUserInfo);
router.get(
  "/allAdmins",
  authentication.ensureOwner,
  usersController.getAllAdmins
);
router.post(
  "/deleteAdmin",
  authentication.ensureOwner,
  usersController.deleteAdmin
);
router.post("/addAdmin", authentication.ensureOwner, usersController.addAdmin);

module.exports = router;
