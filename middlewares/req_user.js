const jwt = require("../utils/jwttoken");

module.exports = function (app) {
    app.use(function (req, res, next) {
        const token = req.header("Authorization");
        if (token) {
            const decoded = jwt.verifyToken(token);
            if (decoded) {
                req.user = decoded;
            }
        }
        next();
    });
}