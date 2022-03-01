const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.CONNECTION, (err)=>{
    if(!err){
        console.log('DB Successfully connected');
    }
    else{
        console.log('Error connecting DB: ' + JSON.stringify(err, undefined, 2));
    }

});

module.exports = mongoose;