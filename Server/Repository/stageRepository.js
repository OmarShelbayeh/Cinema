const stage = require("../models").stage;
const db = require("../models");

newStage = async (payload) => {
  await stage.create(payload);
};

getAllStages = async (order) => {
  let allStages;
  switch (order) {
    case "seats":
      allStages = await db.sequelize.query(
        "SELECT * FROM stages ORDER BY number_of_seats;",
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      allStages = await db.sequelize.query(
        "SELECT * FROM stages ORDER BY stage_name;",
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
  }
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

searchStageByName = async (name) => {
  let Stage;
  Stage = await db.sequelize.query(
    "SELECT * FROM stages WHERE stage_name = :name ;",
    {
      replacements: { name: name },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  console.log(Stage);
  return Stage;
};

module.exports = {
  newStage,
  getAllStages,
  findStageById,
  findStageByName,
  deleteStage,
  searchStageByName,
};
