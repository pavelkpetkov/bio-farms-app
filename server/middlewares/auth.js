const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET, COOKIE_NAME } = require('../config');
const userService = require('../services/user');

module.exports = () => (req, res, next) => {
    const token = req.headers['x-authorization'];

    try {
        if (token) {
            const userData = jwt.verify(token, TOKEN_SECRET);
            req.user = userData;
        }
    } catch (err) {
        console.log(err.message);
        // res.status(401).json({ message: 'Invalid access token. Please sign in.' });
    }
    next();
};