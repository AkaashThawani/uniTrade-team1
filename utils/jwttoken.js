const jwt = require('jsonwebtoken');
const config = require('../config.json');

const generateToken = (userId) => {
    return jwt.sign({ userId: userId }, config.token.secret, { expiresIn: '1h' });
}

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.token.secret);
        return decoded;
    } catch (ex) {
        return false;
    }
}

module.exports = {
    generateToken: generateToken,
    verifyToken: verifyToken
}