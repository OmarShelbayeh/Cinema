const auth = require("./auth");
const userRoutes = require("./usersRoutes");
const movieRoutes = require("./movieRoutes");
const stageRoutes = require("./stageRoutes");
const scheduleRouter = require("./scheduleRoutes");
const ticketRoutes = require("./ticketRoutes");
const orderRoutes = require("./orderRoutes");
const storageRoutes = require("./storageRoutes");
const shopRoutes = require("./shopRoutes");
const productRoutes = require("./productRoutes");
const passport = require("passport");
require("../config/passport")(passport);
const cors = require("cors");

module.exports = (app) => {
  app.use(passport.initialize());
  app.use(cors());
  app.use("/", auth);
  app.use(
    "/user",
    passport.authenticate("jwt", { session: false }),
    userRoutes
  );
  app.use(
    "/movies",
    passport.authenticate("jwt", { session: false }),
    movieRoutes
  );
  app.use(
    "/stages",
    passport.authenticate("jwt", { session: false }),
    stageRoutes
  );
  app.use(
    "/schedules",
    passport.authenticate("jwt", { session: false }),
    scheduleRouter
  );
  app.use(
    "/tickets",
    passport.authenticate("jwt", { session: false }),
    ticketRoutes
  );
  app.use(
    "/orders",
    passport.authenticate("jwt", { session: false }),
    orderRoutes
  );
  app.use(
    "/storage",
    passport.authenticate("jwt", { session: false }),
    storageRoutes
  );
  app.use(
    "/shops",
    passport.authenticate("jwt", { session: false }),
    shopRoutes
  );
  app.use(
    "/products",
    passport.authenticate("jwt", { session: false }),
    productRoutes
  );
};
