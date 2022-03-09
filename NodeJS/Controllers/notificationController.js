const webpush = require('web-push');
const express = require('express');
const fs = require('fs');
require('dotenv').config()
const bodyParser = require('body-parser');

var {NotificationSub,NotificationSub} = require('../Models/notificationSub');
var {Notification,Notification} = require('../Models/notification');
var {User,User} = require('../Models/user');
var {Product,Product} = require('../Models/product');

const { isValidObjectId } = require('mongoose');
const { resolve } = require('path');

var router = express.Router();

const vapidKeys = {
    "publicKey": process.env.VAPID_PUBLIC_KEY,
    "privateKey": process.env.VAPID_PRIVATE_KEY
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
            const notificationPayload = req.body;
            var offeredProducts;
            var notification;

            if(req.body.notification.exchangeResult == 'true'){ 
                if(!isValidObjectId(req.body.notification.givenProductId))
                    console.log('No record with given id');
                else{
                    Product.findByIdAndUpdate(req.body.notification.givenProductId, { $set: { sellerId: req.params.receiverId }}, (err,docs)=>{
                    if(!err)
                      console.log("product owner changed");
                    else
                      console.log('Error in deleting product with given id: ' + req.body.notification.givenProductId);
                    });
                }

                req.body.notification.acceptedProducts.forEach(product => {
                    if(!isValidObjectId(product._id))
                        console.log('No record with given id');
                    else{  console.log(product._id) 
                        Product.findByIdAndUpdate(product._id, { $set: { sellerId: req.params.senderId }}, (err,docs)=>{
                            if(!err)
                              console.log("product owner changed");
                            else
                              console.log('Error in deleting product with given id: ' + req.body.notification.givenProductId);
                            });
                    }
                });
            }

            if(req.body.requested_product_id && req.body.offered_products){
                getProductAsync(req.body.requested_product_id).then((data)=>{
                    notification = new Notification({
                        sender: req.params.senderId,
                        receiver: req.params.receiverId,  
                        body: notificationPayload.notification.body,
                        offeredProducts: req.body.offered_products, 
                        requestedProduct: data
                    })
                    getSenderUsernameAsync(req.params.senderId).then((data)=>{notification.senderUsername = data; getReceiverUsernameAsync(req.params.receiverId, notification).then(()=>{    
                        notification.save((err,doc)=>{ 
                            if(err)
                            console.log('Error in notification save: ' + JSON.stringify(err, undefined, 2));
                        });
                    }   
                    )});
                }); 
            } else {     
                    notification = new Notification({
                    sender: req.params.senderId,
                    receiver: req.params.receiverId,  
                    body: notificationPayload.notification.body,
                });
                getSenderUsernameAsync(req.params.senderId).then(getReceiverUsernameAsync(req.params.receiverId, notification).then(()=>{    
                    notification.save((err,doc)=>{ 
                        if(err)
                        console.log('Error in notification save: ' + JSON.stringify(err, undefined, 2));
                    });
                }
            ));
            }

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

function getSenderUsernameAsync(senderId){
    return new Promise(function(resolve,reject){
        User.findById(senderId,(err,docs)=>{       
            if(!err){
                resolve(docs.username);
            }
            else{
                console.log("Error retrieving user from db: " + JSON.stringify(err))
                reject("rejected");
            }
        })
    });
};

function getProductAsync(productId){
    return new Promise(function(resolve,reject){
        Product.findById((productId),(err,docs)=>{
            if(!err){
                resolve(docs); 
            }
            else{
                console.log("Error retrieving product from db: " + JSON.stringify(err))
                reject("rejected");
            }
        })
    });
};

function getReceiverUsernameAsync(receiverId, notification){
    return new Promise(function(resolve,reject){
        User.findById(receiverId,(err,docs)=>{
            if(!err){
                notification.receiverUsername = docs.username; 
                resolve("resolved");
            }
            else{
                console.log("Error retrieving user from db: " + JSON.stringify(err));
                reject("rejected");
            }
        })
    });
};

router.get('/notificationcenter/:userId',(req,res)=>{
    Notification.find(({receiver: req.params.userId}), (err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else
            console.log('Error in retrieving notification for user with the given id: ' + req.params.userId);
    })
})
    
router.get('/notificationcenter/notification/:notificationId',(req,res)=>{
    Notification.findOne(({_id: req.params.notificationId}), (err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else
            console.log('Error in retrieving notification with the given id: ' + req.params.notificationId);
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