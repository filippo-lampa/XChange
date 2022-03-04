const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js'); 
var userController = require('./Controllers/userController');
var productController = require('./Controllers/productController');
var categoryController = require('./Controllers/categoryController');
var pushNotificationsController = require('./Controllers/pushNotificationsController');
var sendNotificationController = require('./Controllers/sendNotificationController');
var loginController = require('./Controllers/loginController');
var chatController = require('./Controllers/chatController');

var app = express();

app.use(bodyParser.json());
app.use(cors({origin: ['http://localhost:4200', 'http://localhost:8000/api/messages']}));
app.listen(3000, ()=>console.log("Server started on port 3000"));

app.use('/user',userController);
app.use('/products',productController);
app.use('/categories',categoryController);
app.use('/api',pushNotificationsController);
app.use('/api',sendNotificationController);
app.use('/api',chatController);
app.use('/login',loginController);


