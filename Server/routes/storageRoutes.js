const express = require("express");
const router = express.Router();
const storageController = require("../controllers").storageController;
const authentication = require("../config/authentication");

router.post(
  "/newStorage",
  authentication.ensureAdmin,
  storageController.newStorage
);

router.get(
  "/getAll",
  authentication.ensureAdmin,
  storageController.getAllStorage
);

module.exports = router;
