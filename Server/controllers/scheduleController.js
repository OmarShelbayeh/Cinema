const schedule = require("../models").schedule;
const scheduleRepository = require("../Repository").scheduleRepository;
const db = require("../models");
const authentication = require("../config/authentication");

const getAllSchedules = (req, res) => {
  scheduleRepository
    .getAllSchedules()
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
        .newSchedule(payload)
        .then(() => {
          res.status(200).send();
        })
        .catch((error) => {
          res.status(500).send();
          console.log(error);
        });
    } else {
      res.status(500).send("Shcedule Exists");
    }
  }
};

const deleteSchedule = (req, res) => {
  if (req.body.id) {
    scheduleRepository
      .deleteSchedule(req.body.id)
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

module.exports = {
  newSchedule,
  getAllSchedules,
  deleteSchedule,
  getSchudeleInfoForUser,
};
