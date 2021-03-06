const express = require("express");
const router = express.Router();
const usersController = require("../controllers").usersController;
const authentication = require("../config/authentication");

router.get("/info", usersController.getUserInfo);
router.post(
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
router.post(
  "/disableAccount",
  authentication.ensureOwner,
  usersController.disableAccount
);
router.post(
  "/enableAccount",
  authentication.ensureOwner,
  usersController.enableAccount
);

router.post("/changePassword", usersController.changePassword);

module.exports = router;
