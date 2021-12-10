const usersController = require("../controllers").usersController;

module.exports = (app) => {
  app.post("/signup", usersController.signup);
};
