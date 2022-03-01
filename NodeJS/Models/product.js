const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    name: {type: String},
    category: {type: String},
    description: {type: String},
    views: {type: Number},
    uploadDate: {
        type: Date,
        default: Date.now
    },
    interestedUsers: {type: Number},
    imageUrl: {type: String},
    sellerId: {type: String}
}); 

module.exports = {Product};