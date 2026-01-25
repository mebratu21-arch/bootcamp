const jwt = require('jsonwebtoken');
const { isTokenRevoked } = require('../utils/revocation');

const verifyToken = (req, res, next) => {
    // Get token from cookie or header
    const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Revocation Check
    if (isTokenRevoked(token)) {
        return res.status(401).json({ message: 'Token has been revoked/logged out' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = verifyToken;
