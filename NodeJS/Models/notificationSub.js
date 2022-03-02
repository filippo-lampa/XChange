const mongoose = require('mongoose');

const NotificationSub = mongoose.model('NotificationSub', {
    endpoint: {type: String},
    expirationTime : {type: String},
    keys : {
        p256dh : {type: String},
        auth : {type: String}
    },

}); 

module.exports = {NotificationSub};
