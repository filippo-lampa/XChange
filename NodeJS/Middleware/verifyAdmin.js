const { User } = require('../Models/user');
require('dotenv').config();

module.exports = function verifyAdmin (req, res, next){
    const userId = req.headers.userid;
    if(!userId){
        return res.status(403);
    }
    try{
        User.findById(userId, (err,docs) => {
            if(!err && docs.role == "ADMIN")
                return next();
            else
                console.log('Error in retrieving user with the given id: ' + req.params.id);
        })
    }catch(err){
        console.log("User isn't admin");
        return res.status(401);
    }
};