require("dotenv").config();
const usersRepository = require("../Repository").usersRepository;

module.exports = (passport) => {
  var JwtStrategy = require("passport-jwt").Strategy,
    ExtractJwt = require("passport-jwt").ExtractJwt;
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWTSECRETKEY,
  };

  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      let User = usersRepository.findUserById(jwt_payload.id);
      if (User) {
        return done(null, User);
      } else {
        return done(null, false);
      }
    })
  );
};
