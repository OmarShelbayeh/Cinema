const schedule = require("../models").schedule;
const db = require("../models");

newSchedule = async (payload) => {
  await schedule.create(payload);
};

getAllSchedules = async () => {
  let allSchedules;
  allSchedules = await db.sequelize.query("SELECT * FROM schedules ;", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return allSchedules;
};

findScheduleById = async (id) => {
  let Schedule;
  Schedule = await db.sequelize.query(
    "SELECT * FROM schedules WHERE id = :id ;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return new schedule(Schedule[0]);
};

findSpecificSchedule = async (date, movieId, stageId) => {
  let Schedule;
  Schedule = await db.sequelize.query(
    "SELECT * FROM stages WHERE date = :date and movie_id = :movieId and stage_id = :stageId ;",
    {
      replacements: { date: date, movieId: movieId, stageId, stageId },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return new schedule(Schedule[0]);
};

deleteSchedule = async (id) => {
  await db.sequelize.query("DELETE FROM schedules WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  newSchedule,
  getAllSchedules,
  findSpecificSchedule,
  findScheduleById,
  deleteSchedule,
};
