const mongoose = require('mongoose');

var User = mongoose.model('User', {
    username: {type: String},
    name: {type: String},
    surname: {type: String},
    address: {type: String},
    phone : {type: Number},
    email : {type: String},
    password : {type : String},
});

module.exports = {User};