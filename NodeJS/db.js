const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/PAWMProject', (err)=>{
    if(!err){
        console.log('DB Successfully connected');
    }
    else{
        console.log('Error connecting DB: ' + JSON.stringify(err, undefined, 2));
    }

});

module.exports = mongoose;