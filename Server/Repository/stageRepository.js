const stage = require("../models").stage;
const db = require("../models");

newStage = async (payload) => {
  await stage.create(payload);
};

getAllStages = async () => {
  let allStages;
  allStages = await db.sequelize.query("SELECT * FROM stages ORDER BY number_of_seats;", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return allStages;
};

findStageById = async (id) => {
  let Stage;
  Stage = await db.sequelize.query("SELECT * FROM stages WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.SELECT,
  });
  return new stage(Stage[0]);
};

findStageByName = async (name) => {
  let Stage;
  Stage = await db.sequelize.query(
    "SELECT * FROM stages WHERE stage_name = :name ;",
    {
      replacements: { name: name },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return new stage(Stage[0]);
};

deleteStage = async (id) => {
  await db.sequelize.query("DELETE FROM stages WHERE id = :id", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  newStage,
  getAllStages,
  findStageById,
  findStageByName,
  deleteStage,
};
