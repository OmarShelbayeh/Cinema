const order = require("../models").order;
const db = require("../models");

newOrder = async (who_id, product_id, number_of_pieces, status) => {
  return await order.create({
    who_id: who_id,
    product_id: product_id,
    number_of_pieces: number_of_pieces,
    status: status,
  });
};

getAllOrders = async () => {
  let allOrders;
  allOrders = await db.sequelize.query("SELECT * FROM orders ;", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return allOrders;
};

getAllOrdersForUser = async (id) => {
  let allOrders;
  allOrders = await db.sequelize.query(
    "SELECT o.id as id, o.number_of_pieces as num, p.name as product, m.name as movie FROM orders o INNER JOIN products p ON o.product_id = p.id INNER JOIN shops s ON p.shop_id = s.id INNER JOIN  movies m on s.movie_id = m.id WHERE o.who_id = :id ;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return allOrders;
};

getOrderOwner = async (id) => {
  let ownerId = await db.sequelize.query(
    "SELECT who_id FROM orders WHERE id = :id",
    {
      replacements: { id, id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return ownerId[0].who_id;
};

deleteOrder = async (id) => {
  await db.sequelize.query("DELETE FROM orders WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

getOrderById = async (id) => {
  let order = await db.sequelize.query("SELECT * FROM orders WHERE id = :id", {
    replacements: { id, id },
    type: db.sequelize.QueryTypes.SELECT,
  });
  return order[0];
};

module.exports = {
  newOrder,
  getAllOrders,
  getAllOrdersForUser,
  getOrderOwner,
  deleteOrder,
  getOrderById,
};
