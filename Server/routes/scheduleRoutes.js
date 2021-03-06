const express = require("express");
const router = express.Router();
const scheduleController = require("../controllers").scheduleController;
const authentication = require("../config/authentication");

router.post("/allSchedules", scheduleController.getAllSchedules);
router.post(
  "/newSchedule",
  authentication.ensureAdmin,
  scheduleController.newSchedule
);
router.delete(
  "/deleteSchedule",
  authentication.ensureAdmin,
  scheduleController.deleteSchedule
);

router.post("/getInfo", scheduleController.getSchudeleInfoForUser);
router.post("/search", scheduleController.searchSchedules);

module.exports = router;
