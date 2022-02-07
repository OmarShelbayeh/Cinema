const schedule = require("../models").schedule;
const scheduleRepository = require("../Repository").scheduleRepository;
const db = require("../models");
const authentication = require("../config/authentication");
const ticketRepository = require("../Repository").ticketRepository;

const getAllSchedules = (req, res) => {
  scheduleRepository
    .getAllSchedules(req.body.order)
    .then((schedules) => {
      res.status(200).send(schedules);
    })
    .catch((error) => res.status(500).send());
};

const newSchedule = async (req, res) => {
  let payload = req.body;
  if (
    payload.showing_at &&
    payload.price &&
    payload.movie_id &&
    payload.stage_id
  ) {
    if (payload.price <= 0) {
      res.status(500).send("Price cannot be less than or equal to 0");
    } else {
      if (
        (
          await scheduleRepository.findSpecificSchedule(
            payload.showing_at,
            payload.movie_id,
            payload.stage_id
          )
        ).id === null
      ) {
        scheduleRepository
          .getIfStageIsUsed(payload.showing_at, payload.stage_id)
          .then((schedules) => {
            if (schedules.length > 0) {
              res.status(500).send("Stage not available at that time");
            } else {
              scheduleRepository
                .newSchedule(payload)
                .then(() => {
                  res.status(200).send();
                })
                .catch((error) => {
                  res.status(500).send();
                  console.log(error);
                });
            }
          });
      } else {
        res.status(500).send("Shcedule Exists");
      }
    }
  }
};

const deleteSchedule = (req, res) => {
  if (req.body.id) {
    scheduleRepository
      .deleteSchedule(req.body.id)
      .then(() => {
        ticketRepository.deleteTicketByScheduleId(req.body.id);
      })
      .then(() => res.status(200).send())
      .catch((error) => {
        res.status(500).send(error);
      });
  } else {
    res.status(500).send("Something went wrong");
  }
};

const getSchudeleInfoForUser = (req, res) => {
  let payload = req.body;
  if (!payload.id) {
    return res.status(500).send("Missing Data");
  } else {
    scheduleRepository
      .getSchudeleInfoForUser(req.body.id)
      .then((info) => res.status(200).send(info))
      .catch((error) => {
        console.log(error);
        res.status(500).send();
      });
  }
};

const searchSchedules = async (req, res) => {
  let payload = req.body;
  if (payload.search.movieName && payload.search.date) {
    scheduleRepository
      .searchSchedulesByDateAndMovie(
        payload.search.movieName,
        payload.search.date,
        payload.order
      )
      .then((schedules) => {
        res.status(200).send(schedules);
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else if (payload.search.movieName && !payload.search.date) {
    scheduleRepository
      .searchSchedulesByMovie(payload.search.movieName, payload.order)
      .then((schedules) => {
        res.status(200).send(schedules);
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else if (payload.search.date && !payload.search.movieName) {
    scheduleRepository
      .searchSchedulesByDate(payload.search.date, payload.order)
      .then((schedules) => {
        res.status(200).send(schedules);
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  } else if (!payload.search.date && !payload.schedule.movieName) {
    res.status(500).send("Missing data");
  }
};

module.exports = {
  newSchedule,
  getAllSchedules,
  deleteSchedule,
  getSchudeleInfoForUser,
  searchSchedules,
};
