const expressJwt = require("express-jwt");
const dotenv = require("dotenv");

dotenv.config();

function authenticateUser(req, res, next) {
  expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256", "RS256", "sha1"], // Specify the algorithms
    userProperty: "authorization",
  })(req, res, (err) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    next();
  });
}

module.exports = { authenticateUser };
