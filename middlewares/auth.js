const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {

    const token = req.headers.authorization?.split(' ')[1];
    const verified = jwt.verify(token, "hello123");
    req.verifiedUser = verified.user;
    next();
};

module.exports ={
    authenticate
}