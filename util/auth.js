const jwt = require('jsonwebtoken');

const createJWTToken = user => {
    return jwt.sign({user}, 'hello123', {
        expiresIn: '1d'
        // expiresIn: '1h'
    })
}

module.exports = {createJWTToken}