const movies = require("../models/movies");
const movieRepository = require("../Repository").movieRepository;
const authentication = require("../config/authentication");

const getAllMovies = (req, res) => {
  movieRepository
    .getAllMovies()
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
          res.status(500).send();
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
  }
};

module.exports = {
  getAllMovies,
  newMovie,
  deleteMovie,
};
