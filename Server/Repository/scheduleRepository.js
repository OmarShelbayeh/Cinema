const schedule = require("../models").schedule;
const db = require("../models");

newSchedule = async (payload) => {
  await schedule.create(payload);
};

getAllSchedules = async () => {
  let allSchedules;
  allSchedules = await db.sequelize.query(
    "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= DATE(NOW()) order by s.showing_at;",
    {
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
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
    "SELECT * FROM schedules WHERE showing_at = :date and movie_id = :movieId and stage_id = :stageId ;",
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

getSchudeleInfoForUser = async (id) => {
  let Schedule = await db.sequelize.query(
    "SELECT s.id, s.price as price , st.stage_name as stage_name, m.name, st.rows as rows, st.seats_in_row as seats_in_row, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats, ARRAY(SELECT seat_id FROM tickets WHERE schedule_id = s.id) as seats FROM schedules s INNER JOIN stages st ON s.stage_id = st.id INNER JOIN movies m on s.movie_id = m.id WHERE s.id = :id;",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return Schedule;
};

module.exports = {
  newSchedule,
  getAllSchedules,
  findSpecificSchedule,
  findScheduleById,
  deleteSchedule,
  getSchudeleInfoForUser,
};
