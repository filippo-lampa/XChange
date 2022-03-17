const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../Models/user');
require('dotenv').config;
var router = express.Router();

router.post('/', (req, res) => {
    let fetchedUser;

    User.findOne({email: req.body.email}).then(user => {
        if(user){
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        }
        else{
            console.log('Invalid email or password');
            return res.sendStatus(404);
        }
    }).then(result => {
        if(!result){
            console.log('Invalid email or password');
            return res.sendStatus(404);
        }         

        const token = jwt.sign(
            { email: fetchedUser.email, userId: fetchedUser._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });
    }).catch(err =>  {
        console.log("Generic Error " + err);
   });
}) 

module.exports = router;