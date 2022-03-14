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
    },
    senderUsername: {type: String},
    receiverUsername: {type: String},
    offeredProducts: {type: [mongoose.Schema.Types.Mixed]},
    requestedProduct: {type: mongoose.Schema.Types.Mixed},
    notificationType: {type: String}
}); 

module.exports = {Notification};