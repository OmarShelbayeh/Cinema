const stage = require("../models").stage;
const stageRepository = require("../Repository").stageRepository;
const db = require("../models");
const authentication = require("../config/authentication");
const scheduleRepository = require("../Repository").scheduleRepository;
const ticketRepository = require("../Repository").ticketRepository;

const getAllStages = (req, res) => {
  stageRepository
    .getAllStages()
    .then((stages) => {
      res.status(200).send(stages);
    })
    .catch((error) => res.status(500).send());
};

const newStage = async (req, res) => {
  let payload = req.body;
  if (payload.stage_name && payload.rows && payload.seats_in_row) {
    if (
      (await stageRepository.findStageByName(payload.stage_name)).id === null
    ) {
      payloadToSend = {
        stage_name: payload.stage_name,
        rows: payload.rows,
        seats_in_row: payload.seats_in_row,
        number_of_seats: payload.rows * payload.seats_in_row,
      };
      if (payloadToSend.number_of_seats < 1) {
        res.status(500).send("Number of seats cannot be less than 1");
      } else {
        stageRepository
          .newStage(payloadToSend)
          .then(() => {
            res.status(200).send();
          })
          .catch((error) => {
            res.status(500).send();
            console.log(error);
          });
      }
    } else {
      res.status(500).send("Stage Exists");
    }
  }
};

const deleteStage = (req, res) => {
  if (req.body.id) {
    stageRepository
      .deleteStage(req.body.id)
      .then(() => {
        let allSchedules = scheduleRepository.getScheculesByStageId(
          req.body.id
        );
        scheduleRepository.deleteScheduleByStage(req.body.id);
        return allSchedules;
      })
      .then((allSchedules) => {
        for (let i = 0; i < allSchedules.length; i++) {
          ticketRepository.deleteTicketByScheduleId(allSchedules[i].id);
        }
      })
      .then(() => res.status(200).send())
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  getAllStages,
  newStage,
  deleteStage,
};
