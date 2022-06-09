const jwt = require('jsonwebtoken')
const dotenv = require("dotenv");

function verifyToken(req, res, next){
    const token = req.headers['x-access-token']
    if (!token){
        return res.status(401).json({
            auth: false,
            message: 'no token provided'
        })
    }
    const decoded = jwt.verify(token, process.env.SECRET_JWT)
    req.userId = decoded.id;
    next();
}

module.exports = verifyToken;