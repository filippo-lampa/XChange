const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = function verifyToken (req, res, next){
    console.log(req.headers.token);
    const token = req.headers.token;
    if(!token){
        return res.status(403);
    }

    try{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    }catch(err){
        console.log("token wrong");
        return res.status(401);
    }

    return next();
};