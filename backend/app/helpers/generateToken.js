const jwt = require('jsonwebtoken');

function generateAccessToken(user) { 

    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10s' })
}

function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '8h' })
}

module.exports = {
    generateAccessToken,
    generateRefreshToken
}
