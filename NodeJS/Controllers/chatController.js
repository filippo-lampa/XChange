const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

var router = express.Router();

var {ChatMessage,ChatMessage} = require('../Models/chatMessage');

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1356420",
  key: "0f35454c8019950992a7",
  secret: "678d4c3cbd40f2538a9e"
});

router.post('/pusher/auth/', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});

router.post('/messages/:senderId/:receiverId', (req,res)=>{
  var message = new ChatMessage({
    body: req.body.body,
    senderId: req.params.senderId,
    receiverId: req.params.receiverId,
  });
  message.save((err,doc)=>{
      if(!err)
          res.send(doc);
      else
          console.log('Error in category save: ' + JSON.stringify(err, undefined, 2));
  });
});

router.get('/messages/:senderId/:receiverId',(req,res)=>{
  ChatMessage.find(({$or: [{senderId: req.params.senderId, receiverId: req.params.receiverId},{senderId: req.params.receiverId, receiverId: req.params.senderId}]}),(err,docs)=>{
    if(!err)
        res.send(docs);
    else
        console.log('Error in retrieving products: ' + JSON.stringify(err, undefined, 2));
  });
})

module.exports = router;