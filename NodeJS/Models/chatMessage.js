const mongoose = require('mongoose');

const ChatMessage = mongoose.model('ChatMessage', {
    senderId: {type: String},
    receiverId : {type: String},
    body : {type: String},
    date: {
        type: Date,
        default: Date.now
    }
}); 

module.exports = {ChatMessage};