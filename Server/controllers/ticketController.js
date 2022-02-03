const ticket = require("../models").tickets;
const ticketRepository = require("../Repository").ticketRepository;
const db = require("../models");
const authentication = require("../config/authentication");

const history = (req, res) => {
  let user = authentication.getUserObjectFromToken(req);
  ticketRepository
    .history(user.id)
    .then((history) => {
      res.status(200).send(history);
    })
    .catch((error) => res.status(500).send());
};

const getTickets = (req, res) => {
  let user = authentication.getUserObjectFromToken(req);
  ticketRepository
    .showTickets(user.id)
    .then((tickets) => {
      res.status(200).send(tickets);
    })
    .catch((error) => res.status(500).send());
};

const buyTicket = (req, res) => {
  let payload = req.body;
  let user = authentication.getUserObjectFromToken(req);
  if (!payload.schedule_id || !payload.seat_id) {
    console.log(payload);
    res.status(500).send("MissingData");
  } else {
    ticketRepository
      .buyTicket(payload.schedule_id, payload.seat_id, user.id)
      .then(() => {
        res.status(200).send("Successfully bought tickets");
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  }
};

const ticketInfo = (req, res) => {
  let payload = req.body;
  let user = authentication.getUserObjectFromToken(req);
  if (!payload.id) {
    res.status(500).send("MissingData");
  } else {
    ticketRepository
      .ticketInfo(payload.id)
      .then((ticket) => {
        res.status(200).send(ticket);
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  }
};

const deleteTicket = (req, res) => {
  ticketRepository
    .deleteTicket(req.body.id)
    .then(() => res.status(200).send("Returned Ticket"))
    .catch((error) => {
      res.status(500).send("Couldn't delete ticket");
    });
};

const getAvailableSeats = (req, res) => {
  let payload = req.body;
  if (!payload.schedule_id) {
    res.status(500).send("Missing data");
  } else {
    ticketRepository
      .getAvailableSeats(payload.schedule_id)
      .then((seats) => {
        res.status(200).send(seats);
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  }
};

module.exports = {
  buyTicket,
  history,
  getTickets,
  ticketInfo,
  deleteTicket,
  getAvailableSeats,
};
