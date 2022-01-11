const productRepository = require("../Repository").productRepository;
const movieRepository = require("../Repository").movieRepository;
const authentication = require("../config/authentication");

newProduct = (req, res) => {
  let payload = req.body;
  if (
    payload.name &&
    payload.available_pcs &&
    payload.shop_id &&
    payload.price
  ) {
    productRepository
      .newProduct(
        payload.name,
        payload.available_pcs,
        payload.shop_id,
        payload.price
      )
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

deleteProduct = (req, res) => {
  let payload = req.body;
  if (payload.product_id) {
    productRepository
      .deleteProduct(payload.product_id)
      .then(() => {
        res.status(200).send("Product deleted");
      })
      .catch((error) => {
        res.status(500).send("Couldn't delete product");
      });
  } else {
    res.status(500).send("Missing data");
  }
};

getProductsByTicketId = (req, res) => {
  let payload = req.body;
  if (payload.ticket_id) {
    movieRepository.getMovieIdByTicketId(payload.ticket_id).then((movie_id) => {
      productRepository
        .getAllProductsFromMovieId(movie_id)
        .then((products) => {
          res.status(200).send(products);
        })
        .catch(() => {
          res.status(500).send("Something went wrong");
        });
    });
  } else {
    res.status(500).send("Missing data");
  }
};

module.exports = {
  newProduct,
  getAllProductsForMovie,
  deleteProduct,
  getProductsByTicketId,
};
