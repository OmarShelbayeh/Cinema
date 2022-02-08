const delivery = require("../models").delivery;
const db = require("../models");

newDelivery = async (order_id, storage_id, driver_id) => {
  await delivery.create({
    order_id: order_id,
    storage_id: storage_id,
    driver_id: driver_id,
  });
};

getAllDeliveries = async (order) => {
  let allDeliveries = [];
  switch (order) {
    case "surname":
      allDeliveries = await db.sequelize.query(
        "SELECT d.id as delivery_id, d.storage_id as storage_id, u.name as user_name, u.surname as user_surname, u.email as user_email, p.name as product_name, m.name as movie_name, o.number_of_pieces as num_of_pcs FROM deliveries d INNER JOIN orders o ON d.order_id = o.id INNER JOIN users u ON o.who_id = u.id INNER JOIN products p on o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN movies m ON s.movie_id = m.id ORDER BY u.surname, d.id;",
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      );
      break;
    case "email":
      allDeliveries = await db.sequelize.query(
        "SELECT d.id as delivery_id, d.storage_id as storage_id, u.name as user_name, u.surname as user_surname, u.email as user_email, p.name as product_name, m.name as movie_name, o.number_of_pieces as num_of_pcs FROM deliveries d INNER JOIN orders o ON d.order_id = o.id INNER JOIN users u ON o.who_id = u.id INNER JOIN products p on o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN movies m ON s.movie_id = m.id ORDER BY u.email, d.id;",
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      );
      break;
    case "productName":
      allDeliveries = await db.sequelize.query(
        "SELECT d.id as delivery_id, d.storage_id as storage_id, u.name as user_name, u.surname as user_surname, u.email as user_email, p.name as product_name, m.name as movie_name, o.number_of_pieces as num_of_pcs FROM deliveries d INNER JOIN orders o ON d.order_id = o.id INNER JOIN users u ON o.who_id = u.id INNER JOIN products p on o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN movies m ON s.movie_id = m.id ORDER BY p.name, d.id;",
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      );
      break;
    case "movieName":
      allDeliveries = await db.sequelize.query(
        "SELECT d.id as delivery_id, d.storage_id as storage_id, u.name as user_name, u.surname as user_surname, u.email as user_email, p.name as product_name, m.name as movie_name, o.number_of_pieces as num_of_pcs FROM deliveries d INNER JOIN orders o ON d.order_id = o.id INNER JOIN users u ON o.who_id = u.id INNER JOIN products p on o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN movies m ON s.movie_id = m.id ORDER BY m.name, d.id;",
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      );
      break;
    case "numberOfPcs":
      allDeliveries = await db.sequelize.query(
        "SELECT d.id as delivery_id, d.storage_id as storage_id, u.name as user_name, u.surname as user_surname, u.email as user_email, p.name as product_name, m.name as movie_name, o.number_of_pieces as num_of_pcs FROM deliveries d INNER JOIN orders o ON d.order_id = o.id INNER JOIN users u ON o.who_id = u.id INNER JOIN products p on o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN movies m ON s.movie_id = m.id ORDER BY o.number_of_pieces, d.id;",
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      );
      break;
    default:
      allDeliveries = await db.sequelize.query(
        "SELECT d.id as delivery_id, d.storage_id as storage_id, u.name as user_name, u.surname as user_surname, u.email as user_email, p.name as product_name, m.name as movie_name, o.number_of_pieces as num_of_pcs FROM deliveries d INNER JOIN orders o ON d.order_id = o.id INNER JOIN users u ON o.who_id = u.id INNER JOIN products p on o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN movies m ON s.movie_id = m.id ORDER BY u.name, d.id;",
        {
          type: db.sequelize.QueryTypes.DELETE,
        }
      );
      break;
  }
  return allDeliveries;
};

deleteDeliveryByOrderId = async (id) => {
  await db.sequelize.query("DELETE FROM deliveries WHERE order_id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  newDelivery,
  getAllDeliveries,
  deleteDeliveryByOrderId,
};
