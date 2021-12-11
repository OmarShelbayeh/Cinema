const auth = require("./auth");
const userRoutes = require("./usersRoutes");
const passport = require("passport");
require("../config/passport")(passport);

module.exports = (app) => {
  app.use(passport.initialize());
  app.use("/", auth);
  app.use(
    "/user",
    passport.authenticate("jwt", { session: false }),
    userRoutes
  );
};
