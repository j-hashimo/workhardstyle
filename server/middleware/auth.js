const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    console.log('Token received in backend:', token); // Log the received token

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error('Token verification error:', err.message); // Log any error during verification
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

module.exports = auth;
