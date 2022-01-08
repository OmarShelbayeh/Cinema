const storage = require("../models").storage;
const db = require("../models");

newStorage = async (capacity) => {
  await storage.create({
    capacity: capacity,
  });
};

module.exports = {
  newStorage,
};
