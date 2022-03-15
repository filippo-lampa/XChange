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

app.use(express.static(path.join(__dirname, '../Angular/dist/angular')))
var app = express();

app.use(mongoSanitize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({origin: ['http://localhost:4200', 'http://localhost:3000']}));
app.listen(3000, ()=>console.log("Server started on port 3000"));

app.use('/user',userController);
app.use('/products',productController);
app.use('/categories',categoryController);
app.use('/api',pushNotificationsController);
app.use('/api',notificationController);
app.use('/login',loginController);
app.use('/api',chatController);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../Angular/dist/angular/index.html'))
  })

