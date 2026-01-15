const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Middleware to protect routes 
const protect = async (req, res, next) => {
    let TokenExpiredError;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            //Get token from header
            const token = req.headers.authorization.split(' ')[1];

            //Verify token 
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            //Get user from the token
            req.user = await User.findById(decoded.user.id).select('-password');  //Exclude password field
            
            if (!req.user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }
            
            next();
        } catch(err) {
            console.log("Token verification failed", err);
            return res.status(401).json({ message: "Not authorized, token failed"});
        }
    } else {
        return res.status(401).json ({ message: "Not authorized, no token" });
    }
}

//Middleware to chaeck if the user is an admin
const admin = (req, res, next) => {
    if(req.user && req.user.role === 'admin') {
        next();
    }
    else {
        res.status(401).json({ message: "Not authorized as an admin"});
    }
}

module.exports = { protect, admin };