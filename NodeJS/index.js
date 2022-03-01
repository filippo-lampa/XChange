const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { mongoose } = require('./db.js'); 
var userController = require('./Controllers/userController');
var productController = require('./Controllers/productController');
var categoryController = require('./Controllers/categoryController');
var loginController = require('./Controllers/loginController');
var app = express();

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.listen(3000, ()=>console.log("Server started on port 3000"));

app.use('/user',userController);
app.use('/products',productController);
app.use('/categories',categoryController);
app.use('/login',loginController);


