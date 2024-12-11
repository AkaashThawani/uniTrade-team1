const constants = require("../utils/constants");
const jwt = require("../utils/jwttoken");

module.exports = function (app) {
    app.use(function (req, res, next) {
        if (constants.whiteListAPIs.indexOf(req.url) === -1) { 
            const token = req.header("Authorization");
            if (!token) {
                return res.status(403).send({
                    code: 4003,
                    messageKey: "Token Missing!",
                    data: ""
                });
            } else {
                const isTokenValid = jwt.verifyToken(token);
                if (!isTokenValid) {
                    return res.status(403).send({
                        code: 4004,
                        messageKey: "Invalid Token!",
                        data: ""
                    });
                } else {
                    next();
                }
            }
        } else {
            next();
        }
    });
}