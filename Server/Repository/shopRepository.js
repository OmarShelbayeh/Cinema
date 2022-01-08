const shop = require("../models").shop;
const db = require("../models");

newShop = async (movie_id, storage_id) => {
  await shop.create({
    movie_id: movie_id,
    storage_id: storage_id,
  });
};

module.exports = {
  newShop,
};
