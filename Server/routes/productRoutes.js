const express = require("express");
const router = express.Router();
const productController = require("../controllers").productController;
const authentication = require("../config/authentication");

router.post(
  "/newProduct",
  authentication.ensureAdmin,
  productController.newProduct
);

router.post(
  "/movieProducts",
  authentication.ensureUser,
  productController.getProductsByTicketId
);

router.post("/allProducts", productController.getAllProductsForMovie);
router.delete(
  "/deleteProduct",
  authentication.ensureAdmin,
  productController.deleteProduct
);
module.exports = router;
