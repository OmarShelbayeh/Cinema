const express = require("express");
const router = express.Router();
const productController = require("../controllers").productController;
const authentication = require("../config/authentication");


router.post(
  "/newProduct",
  authentication.ensureAdmin,
  productController.newProduct
);

router.get("/allProducts", productController.getAllProductsForMovie);

module.exports = router;
