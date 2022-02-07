const schedule = require("../models").schedule;
const db = require("../models");

newSchedule = async (payload) => {
  await schedule.create(payload);
};

getAllSchedules = async (order) => {
  let allSchedules;
  switch (order) {
    case "movieName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by m.name, s.showing_at;",
        {
          replacements: {
            date: new Date(),
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "stageName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by st.stage_name, s.showing_at;",
        {
          replacements: {
            date: new Date(),
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "price":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by s.price, s.showing_at;",
        {
          replacements: {
            date: new Date(),
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "availableSeats":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)), s.showing_at;",
        {
          replacements: {
            date: new Date(),
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by s.showing_at;",
        {
          replacements: {
            date: new Date(),
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
  }

  return allSchedules;
};

getIfStageIsUsed = async (showing_at, stage_id) => {
  let dateBegin = await new Date(showing_at);
  await dateBegin.setHours(dateBegin.getHours() - 3);
  let dateEnd = await new Date(showing_at);
  let allSchedules = await db.sequelize.query(
    "SELECT * FROM schedules WHERE stage_id = :stage_id AND showing_at BETWEEN :dateBegin AND :dateEnd ;",
    {
      replacements: {
        stage_id: stage_id,
        dateBegin: dateBegin,
        dateEnd: dateEnd,
      },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return allSchedules;
};

getScheculesByMovieId = async (id) => {
  let allSchedules;
  allSchedules = await db.sequelize.query(
    "SELECT id FROM schedules WHERE movie_id = :id ",
    {
      replacements: { id: id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return allSchedules;
};

getScheculesByStageId = async (id) => {
  let allSchedules;
  allSchedules = await db.sequelize.query(
    "SELECT id FROM schedules WHERE stage_id = :id ",
    {
      replacements: { id: id },
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

deleteScheduleByMovie = async (id) => {
  await db.sequelize.query("DELETE FROM schedules WHERE movie_id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

deleteScheduleByStage = async (id) => {
  await db.sequelize.query("DELETE FROM schedules WHERE stage_id = :id ;", {
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

searchSchedulesByDate = async (date, order) => {
  let allSchedules;
  switch (order) {
    case "movieName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by m.name, s.showing_at;",
        {
          replacements: {
            date: date,
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "stageName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by st.stage_name, s.showing_at;",
        {
          replacements: {
            date: date,
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "price":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by s.price, s.showing_at;",
        {
          replacements: {
            date: date,
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "availableSeats":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)), s.showing_at;",
        {
          replacements: {
            date: date,
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where s.showing_at >= :date order by s.showing_at;",
        {
          replacements: {
            date: date,
          },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
  }

  return allSchedules;
};

searchSchedulesByMovie = async (movieName, order) => {
  let allSchedules;
  switch (order) {
    case "movieName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name s.showing_at >= :date order by m.name, s.showing_at;",
        {
          replacements: { movie_name: movieName, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "stageName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name s.showing_at >= :date order by st.stage_name, s.showing_at;",
        {
          replacements: { movie_name: movieName, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "price":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name s.showing_at >= :date order by s.price, s.showing_at;",
        {
          replacements: { movie_name: movieName, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "availableSeats":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name s.showing_at >= :date order by (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)), s.showing_at;",
        {
          replacements: { movie_name: movieName, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name s.showing_at >= :date order by s.showing_at;",
        {
          replacements: { movie_name: movieName, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
  }

  return allSchedules;
};

searchSchedulesByDateAndMovie = async (movieName, date, order) => {
  let allSchedules;
  switch (order) {
    case "movieName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name and s.showing_at >= :date order by m.name, s.showing_at;",
        {
          replacements: { movie_name: movieName, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "stageName":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name and s.showing_at >= :date order by st.stage_name, s.showing_at;",
        {
          replacements: { movie_name: movieName, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "price":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name and s.showing_at >= :date order by s.price, s.showing_at;",
        {
          replacements: { movie_name: movieName, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    case "availableSeats":
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name and s.showing_at >= :date order by (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)), s.showing_at;",
        {
          replacements: { movie_name: movieName, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      allSchedules = await db.sequelize.query(
        "SELECT s.id, s.showing_at as date, s.price as price, m.name as movieName, st.stage_name as stageName, (st.number_of_seats - (SELECT count(*) FROM tickets WHERE schedule_id = s.id)) as available_seats from schedules s inner join movies m on s.movie_id = m.id inner join stages st on s.stage_id = st.id where m.name = :movie_name and s.showing_at >= :date order by s.showing_at;",
        {
          replacements: { movie_name: movieName, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
  }

  return allSchedules;
};

module.exports = {
  newSchedule,
  getAllSchedules,
  findSpecificSchedule,
  findScheduleById,
  deleteSchedule,
  getSchudeleInfoForUser,
  deleteScheduleByMovie,
  getScheculesByMovieId,
  getScheculesByStageId,
  deleteScheduleByStage,
  getIfStageIsUsed,
  searchSchedulesByDate,
  searchSchedulesByMovie,
  searchSchedulesByDateAndMovie,
};
