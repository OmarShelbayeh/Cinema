const express = require("express");
const router = express.Router();
const orderController = require("../controllers").orderController;
const authentication = require("../config/authentication");

router.get(
  "/allOrders",
  authentication.ensureUser,
  orderController.getAllOrdersForUser
);
router.post("/newOrder", authentication.ensureUser, orderController.newOrder);
router.delete(
  "/cancelOrder",
  authentication.ensureUser,
  orderController.cancelOrder
);

module.exports = router;
