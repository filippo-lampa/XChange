const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

var router = express.Router();

const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1356420",
  key: "0f35454c8019950992a7",
  secret: "678d4c3cbd40f2538a9e",
  cluster: "eu",
  useTLS: true
});


router.post('/messages',(req,res)=>{
    pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
      });
    res.json([]);
})

module.exports = router;