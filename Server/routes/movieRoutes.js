const express = require("express");
const router = express.Router();
const movieController = require("../controllers").movieController;
const authentication = require("../config/authentication");

router.get("/allMovies", movieController.getAllMovies);
router.post("/newMovie", authentication.ensureAdmin, movieController.newMovie);
router.delete(
  "/deleteMovie",
  authentication.ensureAdmin,
  movieController.deleteMovie
);

router.post(
  "/editMovie",
  authentication.ensureAdmin,
  movieController.editMovie
);

module.exports = router;
