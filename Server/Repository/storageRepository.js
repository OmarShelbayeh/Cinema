const storage = require("../models").storage;
const db = require("../models");

newStorage = async (capacity) => {
  await storage.create({
    capacity: capacity,
  });
};

getAllStorage = async () => {
  let all = await db.sequelize.query("SELECT * FROM storages ;", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  console.log(all);
  return all;
};

module.exports = {
  newStorage,
  getAllStorage,
};
