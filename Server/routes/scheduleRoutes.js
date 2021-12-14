const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers").scheduleController;
const authentication = require("../config/authentication");

router.get(
  "/allSchedules",
  authentication.ensureAdmin,
  scheduleController.getAllSchedules
);
// router.post(
//   "/newSchedule",
//   authentication.ensureAdmin,
//   scheduleController.newStage
// );
router.delete(
  "/deleteSchedule",
  authentication.ensureAdmin,
  scheduleController.deleteSchedule
);

module.exports = router;
