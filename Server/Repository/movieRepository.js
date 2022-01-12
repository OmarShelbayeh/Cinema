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
  await db.sequelize.query("DELETE FROM movies WHERE id = :id", {
    replacements: { id: id },
    type: db.sequelize.QueryTypes.DELETE,
  });
};

getMovieIdByTicketId = async (ticket_id) => {
  let movie_id = await db.sequelize.query(
    "SELECT s.movie_id FROM tickets t INNER JOIN schedules s ON t.schedule_id = s.id WHERE t.id = :id ;",
    {
      replacements: { id: ticket_id },
      type: db.sequelize.QueryTypes.SELECT,
    }
  );

  return movie_id[0].movie_id;
};

module.exports = {
  newMovie,
  getAllMovies,
  findMovieById,
  findMovieByName,
  deleteMovie,
  getMovieIdByTicketId,
};
