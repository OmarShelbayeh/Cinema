const usersController = require("../controllers").users;

module.exports = (app) => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "Welcome to the Todos API!",
    })
  );

  app.post("/signup", usersController.signup);
  app.post("/findUserById", usersController.findUserById);
};
