const jwt = require("jsonwebtoken");

class authentication {
  ensureAdmin = (req, res, next) => {
    const jwt_payload = jwt.decode(req.headers.authorization.substring(7));
    if (jwt_payload.role === "ADMIN") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  };

  ensureUser = (req, res, next) => {
    const jwt_payload = jwt.decode(req.headers.authorization.substring(7));
    if (jwt_payload.role === "USER") {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  };

  getUserObjectFromToken = (req) => {
    return jwt.decode(req.headers.authorization.substring(7));
  };
}

module.exports = new authentication();
