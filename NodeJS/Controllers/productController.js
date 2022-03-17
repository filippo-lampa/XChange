const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
const { isValidObjectId } = require('mongoose');

var router = express.Router();
var {Product,Product} = require('../Models/product');
var {User,User} = require('../Models/user');
const verifyToken = require('../Middleware/verifyToken');

router.get('/', (req,res) =>{
    Product.find((err,docs)=>{
        if(!err)
            res.send(docs);
        else
            console.log('Error in retrieving products: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:productId', (req,res)=>{
    if(!isValidObjectId)
        console.log('No record with given id');
    else
        Product.findById(req.params.id, (err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else
                console.log('Error in retrieving product with the given id: ' + req.params.id);
        })
});

router.get('/:userId/alluserproducts', (req,res)=>{
        Product.find(({sellerId: req.params.userId}), (err,docs)=>{
            if(!err){
                res.send(docs);
            }
            else
                console.log('Error in retrieving product with the given id: ' + req.params.id);
        })
});

router.post('/:userId', verifyToken, (req,res)=>{
    var product = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        views: req.body.views,
        uploadDate: req.body.uploadDate,
        interestedUsers: req.body.interestedUsers,
        imageUrl: req.body.imageUrl,
        sellerId: req.params.userId
    });
    product.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
    });
});

router.put('/:userId/:productId', verifyToken ,(req,res)=>{
    if(!isValidObjectId(req.params.productId))
        console.log('No record with given id');
    else{
        isUserOrAdmin(req.params.productId, req.params.userId).then( (value, err) => {
            if(!err){
                var product = {
                    name: req.body.name,
                    category: req.body.category,
                    description: req.body.description,
                    views: req.body.views,
                    interestedUsers: req.body.interestedUsers,
                    imageUrl: req.body.imageUrl
                };if(Product.findById(req.params.productId))
                Product.findByIdAndUpdate(req.params.productId, {$set: product}, {new: true}, (err,docs)=>{
                    if(!err)
                        res.send(docs);
                    else
                        console.log('Error in updating record with id: ' + req.params.productId);
                });
            }
            else{
                console.log("error");
            }
        });
    }
});

router.delete('/:userId/:productId', verifyToken, (req,res)=>{
    if(!isValidObjectId(req.params.productId))
        console.log('No record with given id');
    else{
        isUserOrAdmin(req.params.productId, req.params.userId).then( (value, err) => {
            if(!err){
                Product.findByIdAndRemove(req.params.productId, (err,docs)=>{
                    if(!err)
                      res.send(docs);
                    else
                      console.log('Error in deleting product with given id: ' + req.params.productId);
                }); 
            }
            else{
                console.log(err);
            }
            
        })
    }
});


function isUserOrAdmin(productId, userId){
        return new Promise(function(resolve,reject){
            Product.findById(productId, (err,docs)=>{
                if(!err){
                    if(docs.sellerId == userId){
                        resolve(true);
                    }
                    else{
                        User.findById(userId, (err,userResponse)=>{
                            if(!err){
                                if(userResponse.role == "ADMIN"){
                                    resolve(true);
                                }
                            }
                            else{
                                console.log("Error use is not admin or seller");
                                reject(false);
                            }
                        })
                    }
                }
                else
                {
                    console.log('Error in retrieving product with the given id: ' + req.params.id);
                    reject(false);
                }
            })
        });
}


module.exports = router;