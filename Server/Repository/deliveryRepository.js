const delivery = require("../models").delivery;
const db = require("../models");

newDelivery = async (order_id, storage_id, driver_id) => {
  await delivery.create({
    order_id: order_id,
    storage_id: storage_id,
    driver_id: driver_id,
  });
};

deleteDeliveryByOrderId = async (id) => {
  await db.sequelize.query("DELETE FROM deliveries WHERE order_id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  newDelivery,
  deleteDeliveryByOrderId,
};
