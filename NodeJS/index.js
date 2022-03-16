const path = require('path')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { mongoose } = require('./db.js'); 
const mongoSanitize = require('express-mongo-sanitize');

var userController = require('./Controllers/userController');
var productController = require('./Controllers/productController');
var categoryController = require('./Controllers/categoryController');
var pushNotificationsController = require('./Controllers/pushNotificationsController');
var notificationController = require('./Controllers/notificationController');
var loginController = require('./Controllers/loginController');
var chatController = require('./Controllers/chatController');

var app = express();
app.use(cors());

app.use(cors());
app.use(express.static(path.join(__dirname, '../Angular/dist/angular')))

app.use(mongoSanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || 8080);
app.use('/api/user',userController);
app.use('/api/products',productController);
app.use('/api/categories',categoryController);
app.use('/api',pushNotificationsController);
app.use('/api',notificationController);
app.use('/api/login',loginController);
app.use('/api',chatController);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../Angular/dist/angular/index.html'))
  })

