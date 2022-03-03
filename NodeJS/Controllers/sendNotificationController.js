const webpush = require('web-push');
const express = require('express');

var {NotificationSub,NotificationSub} = require('../Models/notificationSub');
var {Notification,Notification} = require('../Models/notification');

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

router.post('/notificationcenter/:userId', (req,res)=>{

    NotificationSub.findOne(({userId: req.params.userId}), (err,docs)=>{
        console.log('prova');
        if(!err){

            const notificationPayload = {
                "notification": {
                    "title": "Exchange offer",
                    "body": "New exchange offer received!",
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
                receiver: req.params.userId,  
                body: notificationPayload.body,
            });
            
            
            notification.save((err,doc)=>{
                if(err)
                console.log('Error in notification save: ' + JSON.stringify(err, undefined, 2));
            });
            
            Promise.resolve(webpush.sendNotification(
                docs, JSON.stringify(notificationPayload)))
                .then(() => res.status(200).json({message: 'Notification sent successfully.'}))
                .catch(err => {
                    console.error("Error sending notification, reason: ", err);
                    res.sendStatus(500);
                });
        }

        else console.log('Error in retrieving product with the given id: ' + req.params.id);

    });

    
});

module.exports = router;