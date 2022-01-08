const productRepository = require("../Repository").productRepository;
const authentication = require("../config/authentication");

newProduct = (req, res) => {
  let payload = req.body;
  if (payload.name && payload.available_pcs && payload.shop_id) {
    productRepository
      .newProduct(payload.name, payload.available_pcs, payload.shop_id)
      .then(() => {
        res.status(200).send("Product added");
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else {
    res.status(500).send("Missing data");
  }
};

getAllProductsForMovie = (req, res) => {
  let payload = req.body;
  if (payload.id) {
    productRepository
      .getAllProductsFromMovieId(payload.id)
      .then((AllProducts) => res.status(200).send(AllProducts))
      .catch(() => {
        res.status(500).send("Something went wrong");
      });
  } else {
    res.status(500).send("Missing Data");
  }
};

module.exports = {
  newProduct,
  getAllProductsForMovie,
};
