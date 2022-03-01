const mongoose = require('mongoose');

const Category = mongoose.model('Category', {
    name: {type: String},
    imageUrl : {type: String}
}); 

module.exports = {Category};