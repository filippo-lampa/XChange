const webpush = require('web-push');
const express = require('express');

var {NotificationSub,NotificationSub} = require('../Models/notificationSub');
var {Notification,Notification} = require('../Models/notification');
const { isValidObjectId } = require('mongoose');

var router = express.Router();

const vapidKeys = {
    "publicKey":"BOzdHgXy8Zfg_aMFp-HMpEKMPzd_uPYmcYBq9Y30itAIsyP6WVF3IQXAeK7GYrE4BhMtfUrWoMNqiLCgUyRj90c",
    "privateKey":"AgYsDEDNIhJ8eIPNt-OgcxIhr-3ckeSg_iPQ__1fnbk"
};

webpush.setVapidDetails(
    'mailto:pippolampa@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

var app = express();

router.post('/notificationcenter/:senderId/:receiverId', (req,res)=>{

    NotificationSub.find(({userId: req.params.receiverId}), (err,docs)=>{
        if(!err){

            const notificationPayload = {
                "notification": {
                    "title": "Exchange offer",
                    "body": "New exchange offer received ",
                    "icon": "assets/main-page-logo-small-hat.png",
                    "vibrate": [100, 50, 100],
                    "data": {
                        "dateOfArrival": Date.now(),
                        "primaryKey": 1
                    },
                    "actions": [{
                        "action": "explore",
                        "title": "Go to the site"
                    }]
                }
            };
        
            var notification = new Notification({
                sender: req.params.senderId,
                receiver: req.params.receiverId,  
                body: notificationPayload.notification.body,
            });
            
            
            notification.save((err,doc)=>{
                if(err)
                console.log('Error in notification save: ' + JSON.stringify(err, undefined, 2));
            });
            
            Promise.all(docs.map(subDevice => webpush.sendNotification(
                subDevice, JSON.stringify(notificationPayload))))
                .then(() => res.status(200).json({message: 'Notification sent successfully.'}))
                .catch(err => {
                    console.error("Error sending notification, reason: ", err);
                    res.sendStatus(500);
                });
        }

        else console.log('Error in finding user with the given id: ' + req.params.receiverId);
    });

    
});

router.get('/notificationcenter/:userId',(req,res)=>{
    Notification.find(({receiver: req.params.userId}), (err,docs)=>{
        if(!err)
           res.send(docs);
        else
            console.log('Error in retrieving notification for user with the given id: ' + req.params.userId);
    })
})
    

router.put('/notificationcenter', (req,res)=>{ 
    if(!isValidObjectId(req.body._id))
        console.log('No record with given id');
    else{
        var notification = {
            id: req.body._id,
            sender: req.body.sender,
            receiver: req.body.receiver,
            body: req.body.body,
            read: req.body.read,
            date: req.body.date
        };
        Notification.findByIdAndUpdate(req.body._id, {$set: notification}, {new: true}, (err,docs)=>{
            if(!err)
                res.send(docs);
            else
                console.log('Error in updating notification with id: ' + req.params._id);
        });
    }
})

module.exports = router;