const mongoose = require('mongoose');

var User = mongoose.model('User', {
    username: {type: String, require: true},
    name: {type: String, require: true},
    surname: {type: String, require: true},
    address: {type: String, require: true},
    phone : {type: Number, require: true},
    email : {type: String, require: true},
    password : {type : String, require: true},
    role : { type: String },
    birthday: { type: Date , require: true},
    xChangedItems: { type: Number },
    state: { type: String },
    bio: {type: String},
    profilePicUrl: {type: String}
});

module.exports = {User};