const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');

var router = express.Router();

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

module.exports = router;