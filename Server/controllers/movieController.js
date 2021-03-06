const movies = require("../models/movies");
const movieRepository = require("../Repository").movieRepository;
const authentication = require("../config/authentication");
const scheduleRepository = require("../Repository").scheduleRepository;
const ticketRepository = require("../Repository").ticketRepository;

const getAllMovies = (req, res) => {
  movieRepository
    .getAllMovies(req.body.order)
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch((error) => res.status(500).send());
};

const newMovie = async (req, res) => {
  let payload = req.body;
  if (payload.name && payload.director && payload.owner) {
    if ((await movieRepository.findMovieByName(payload.name)).id === null) {
      movieRepository
        .newMovie(payload.name, payload.director, payload.owner, res)
        .then(() => {
          res.status(200).send();
        })
        .catch((error) => {
          res.status(500).send("Something went wrong");
          console.log(error);
        });
    } else {
      res.status(500).send("Movie Exists");
    }
  }
};

const deleteMovie = (req, res) => {
  if (req.body.id) {
    movieRepository
      .deleteMovie(req.body.id)
      .then(() => res.status(200).send())
      .catch((error) => {
        console.log(error);
        res.status(500).send(error);
      });
  } else {
    res.status(500).send();
  }
};

const editMovie = (req, res) => {
  let payload = req.body;
  if (payload.name && payload.director && payload.owner) {
    movieRepository
      .editMovieData(payload.id, payload.name, payload.owner, payload.director)
      .then(() => {
        res.status(200).send("Movie updated");
      })
      .catch((error) => {
        res.status(500).send("Something went wrong");
      });
  }
};

module.exports = {
  getAllMovies,
  newMovie,
  deleteMovie,
  editMovie,
};
