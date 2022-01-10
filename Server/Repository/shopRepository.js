const shop = require("../models").shop;
const db = require("../models");

newShop = async (movie_id, storage_id) => {
  await shop.create({
    movie_id: movie_id,
    storage_id: storage_id,
  });
};

getShopByMovieId = async (id) => {
  let Shop = await db.sequelize.query(
    "SELECT * FROM shops WHERE movie_id = :id",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );

  return Shop[0];
};

module.exports = {
  newShop,
  getShopByMovieId,
};
