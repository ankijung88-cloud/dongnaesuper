const jwt = require('jsonwebtoken');

// Secret key (In production, use .env)
const SECRET_KEY = 'supersecretkey';

const auth = (req, res, next) => {
    // Check for header
    const token = req.header('x-auth-token');

    // Check for token
    if (!token) {
        // If no token, assume 'Guest' or return 401 depending on route
        // For strict routes, return 401
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, SECRET_KEY);
        // Add user from payload
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
