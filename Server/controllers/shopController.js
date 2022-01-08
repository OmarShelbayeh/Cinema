const shopRepository = require("../Repository").shopRepository;
const authentication = require("../config/authentication");

newShop = (req, res) => {
  let payload = req.body;
  if (payload.movie_id && payload.storage_id) {
    shopRepository
      .newShop(payload.movie_id, payload.storage_id)
      .then(() => {
        res.status(200).send("Shop created");
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else {
    res.status(500).send("Missing data");
  }
};

module.exports = {
  newShop,
};
