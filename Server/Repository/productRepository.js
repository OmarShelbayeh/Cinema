const products = require("../models").products;
const db = require("../models");

newProduct = async (name, available_pcs, shop_id, price) => {
  await products.create({
    name: name,
    available_pcs: available_pcs,
    shop_id: shop_id,
    price: price,
  });
};

findProductByNameAndShopId = async (name, shop_id) => {
  let products = await db.sequelize.query(
    "SELECT * FROM products WHERE name = :name AND shop_id = :shop_id ;",
    {
      replacements: {
        name: name,
        shop_id: shop_id,
      },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return products;
};

productStorageId = async (id) => {
  let storage_id = await db.sequelize.query(
    "SELECT s.storage_id FROM products p INNER JOIN shops s ON p.shop_id = s.id WHERE p.id = :id ;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return storage_id[0].storage_id;
};

availableProductById = async (id) => {
  let available_pcs = await db.sequelize.query(
    "SELECT available_pcs FROM products WHERE id= :id ;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return available_pcs[0].available_pcs;
};

updateAvailableProductById = async (id, number_of_pieces) => {
  await db.sequelize.query(
    "UPDATE products SET available_pcs = ((SELECT available_pcs FROM products WHERE id = :id) - :number_of_pieces) WHERE id = :id;",
    {
      replacements: { id: id, number_of_pieces: number_of_pieces },
      type: db.sequelize.QueryTypes.UPDATE,
    }
  );
};

returnProduct = async (id, number_of_pieces) => {
  await db.sequelize.query(
    "UPDATE products SET available_pcs = ((SELECT available_pcs FROM products WHERE id = :id) + :number_of_pieces) WHERE id = :id;",
    {
      replacements: { id: id, number_of_pieces: number_of_pieces },
      type: db.sequelize.QueryTypes.UPDATE,
    }
  );
};

getAllProductsFromMovieId = async (id, order) => {
  let AllProducts;
  switch (order) {
    case "price":
      AllProducts = await db.sequelize.query(
        "SELECT p.id, p.name, p.available_pcs, p.shop_id, p.price FROM products p INNER JOIN shops s ON p.shop_id = s.id WHERE s.movie_id = :id ORDER BY p.price, p.name;",
        {
          replacements: { id: id },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "availablePcs":
      AllProducts = await db.sequelize.query(
        "SELECT p.id, p.name, p.available_pcs, p.shop_id, p.price FROM products p INNER JOIN shops s ON p.shop_id = s.id WHERE s.movie_id = :id ORDER BY p.available_pcs, p.name;",
        {
          replacements: { id: id },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      AllProducts = await db.sequelize.query(
        "SELECT p.id, p.name, p.available_pcs, p.shop_id, p.price FROM products p INNER JOIN shops s ON p.shop_id = s.id WHERE s.movie_id = :id ORDER BY p.name;",
        {
          replacements: { id: id },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
  }
  return AllProducts;
};

deleteProduct = async (id) => {
  await db.sequelize.query("DELETE FROM products WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  newProduct,
  productStorageId,
  availableProductById,
  updateAvailableProductById,
  returnProduct,
  getAllProductsFromMovieId,
  deleteProduct,
  findProductByNameAndShopId,
};
