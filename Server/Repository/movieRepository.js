const movies = require("../models").movies;
const db = require("../models");

newMovie = async (name, director, owner, res) => {
  await movies.create({
    name: name,
    director: director,
    owner: owner,
  });
};

getAllMovies = async () => {
  let allMovies;
  allMovies = await db.sequelize.query("SELECT * FROM movies ;", {
    type: db.sequelize.QueryTypes.SELECT,
  });
  return allMovies;
};

findMovieById = async (id) => {
  let Movie;
  Movie = await db.sequelize.query("SELECT * FROM movies WHERE id = :id ;", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.SELECT,
  });
  return new movies(Movie[0]);
};

findMovieByName = async (name) => {
  let Movie;
  Movie = await db.sequelize.query(
    "SELECT * FROM movies WHERE name = :name ;",
    {
      replacements: { name: name },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );
  return new movies(Movie[0]);
};

deleteMovie = async (id) => {
  await db.sequelize.query("DELETE FROM MOVIES WHERE id = :id", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  newMovie,
  getAllMovies,
  findMovieById,
  findMovieByName,
  deleteMovie,
};
