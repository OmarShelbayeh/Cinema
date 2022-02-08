const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers").deliveryController;
const authentication = require("../config/authentication");

router.post(
  "/allDeliveries",
  authentication.ensureOwner,
  deliveryController.getAllDeliveries
);

module.exports = router;
