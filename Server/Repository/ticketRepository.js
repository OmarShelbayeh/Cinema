const tickets = require("../models").tickets;
const db = require("../models");
var bcrypt = require("bcrypt-nodejs");

buyTicket = async (schedule_id, seat_id, who_id) => {
  await tickets.create({
    schedule_id: schedule_id,
    seat_id: seat_id,
    who_id: who_id,
  });
};

history = async (id, order) => {
  let History;
  let date = new Date();
  switch (order) {
    case "movie":
      History = await db.sequelize.query(
        "select m.name as name,  count(t.seat_id) as tickets, s.showing_at as date from tickets t INNER JOIN schedules s on t.schedule_id = s.id INNER JOIN movies m on s.movie_id = m.id WHERE who_id = :id and s.showing_at < :date GROUP BY m.name, s.showing_at ORDER BY m.name, s.showing_at DESC;",
        {
          replacements: { id: id, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      break;
    default:
      History = await db.sequelize.query(
        "select m.name as name,  count(t.seat_id) as tickets, s.showing_at as date from tickets t INNER JOIN schedules s on t.schedule_id = s.id INNER JOIN movies m on s.movie_id = m.id WHERE who_id = :id and s.showing_at < :date GROUP BY m.name, s.showing_at ORDER BY s.showing_at DESC;",
        {
          replacements: { id: id, date: date },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      break;
  }
  return History;
};

showTickets = async (id, order) => {
  let Tickets;
  switch (order) {
    case "movieName":
      Tickets = await db.sequelize.query(
        "select t.id,  m.name as name, t.seat_id as seat, s.showing_at as date from tickets t INNER JOIN schedules s on t.schedule_id = s.id INNER JOIN movies m on s.movie_id = m.id WHERE who_id = :id AND showing_at > :date ORDER BY m.name, s.showing_at ;",
        {
          replacements: { id: id, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
    default:
      Tickets = await db.sequelize.query(
        "select t.id,  m.name as name, t.seat_id as seat, s.showing_at as date from tickets t INNER JOIN schedules s on t.schedule_id = s.id INNER JOIN movies m on s.movie_id = m.id WHERE who_id = :id AND showing_at > :date ORDER BY s.showing_at ;",
        {
          replacements: { id: id, date: new Date() },
          type: db.sequelize.QueryTypes.SELECT,
        }
      );
      break;
  }
  return Tickets;
};

ticketInfo = async (id) => {
  let Ticket;
  Ticket = await db.sequelize.query(
    "SELECT t.id, t.seat_id, m.name, m.director, m.owner, st.stage_name, s.showing_at FROM tickets t INNER JOIN schedules s on t.schedule_id = s.id INNER JOIN movies m on s.movie_id = m.id INNER JOIN stages st on s.stage_id = st.id where t.id = :id;",
    {
      replacements: {
        id: id,
      },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return Ticket;
};

deleteTicket = async (id) => {
  await db.sequelize.query("DELETE FROM tickets WHERE id = :id ;", {
    replacements: {
      id: id,
    },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

deleteTicketByScheduleId = async (id) => {
  await db.sequelize.query("DELETE FROM tickets WHERE schedule_id = :id ;", {
    replacements: {
      id: id,
    },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

getAvailableSeats = async (schedule_id) => {
  let seats = await db.sequelize.query("SELECT available_seats(:id)", {
    replacements: {
      id: schedule_id,
    },
    type: db.sequelize.QueryTypes.DELETE,
  });
  return seats[0].available_seats;
};

module.exports = {
  buyTicket,
  history,
  showTickets,
  ticketInfo,
  deleteTicket,
  deleteTicketByScheduleId,
  getAvailableSeats,
};
