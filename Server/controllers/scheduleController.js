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

// const newSchedule = async (req, res) => {
//   let payload = req.body;
//   if (
//     payload.stage_name &&
//     payload.rows &&
//     payload.seats_in_row &&
//     payload.number_of_seats
//   ) {
//     if (
//       (await scheduleRepository.findScheduleByDate(payload.stage_name)).id === null
//     ) {
//       stageRepository
//         .newStage(payload)
//         .then(() => {
//           res.status(200).send();
//         })
//         .catch((error) => {
//           res.status(500).send();
//           console.log(error);
//         });
//     } else {
//       res.status(500).send("Stage Exists");
//     }
//   }
// };

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

module.exports = {
  getAllSchedules,
  deleteSchedule,
};
