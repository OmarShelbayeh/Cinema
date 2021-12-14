const express = require("express");
const router = express.Router();
const stageController = require("../controllers").stageController;
const authentication = require("../config/authentication");

router.get(
  "/allStages",
  authentication.ensureAdmin,
  stageController.getAllStages
);
router.post("/newStage", authentication.ensureAdmin, stageController.newStage);
router.delete(
  "/deleteStage",
  authentication.ensureAdmin,
  stageController.deleteStage
);

module.exports = router;
