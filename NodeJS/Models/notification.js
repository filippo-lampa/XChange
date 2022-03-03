const mongoose = require('mongoose');

const Notification = mongoose.model('Notification', {
    sender: {type: String},
    receiver : {type: String},
    body : {type: String},
    date: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: 0
    }
}); 

module.exports = {Notification};