const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const { isValidObjectId } = require('mongoose');

var router = express.Router();
var {NotificationSub,NotificationSub} = require('../Models/notificationSub');


router.post('/notifications/:userId', (req,res)=>{ 
    var subsciptor = new NotificationSub({ 
        userId: req.params.userId,
        endpoint: req.body.endpoint,
        expirationTime : req.body.expirationTime,
        keys : {
            p256dh : req.body.keys.p256dh,
            auth : req.body.keys.auth
        }
    });
    subsciptor.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in subscriptor save: ' + JSON.stringify(err, undefined, 2));
    });
});

/*
router.post('/:newsletter', (req,res)=>{
    var product = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        views: req.body.views,
        uploadDate: req.body.uploadDate,
        interestedUsers: req.body.interestedUsers,
        imageUrl: req.body.imageUrl,
        sellerId: req.params.userId
    });
    product.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
    });
});
*/

module.exports = router;