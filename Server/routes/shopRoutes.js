const express = require("express");
const router = express.Router();
const shopController = require("../controllers").shopController;
const authentication = require("../config/authentication");

router.post("/newShop", authentication.ensureAdmin, shopController.newShop);
router.post(
  "/getShop",
  authentication.ensureAdmin,
  shopController.getShopByMovieId
);

module.exports = router;
