const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const { isValidObjectId } = require('mongoose');
const bcrypt = require('bcrypt');
const verifyToken = require('../Middleware/verifyToken');
const verifyAdmin = require('../Middleware/verifyAdmin');
var router = express.Router();

var {User,User} = require('../Models/user');
var {Product,Product} = require('../Models/product');


router.get('/', (req,res) =>{
    User.find((err,docs)=>{
        if(!err){
            res.send(docs);
        }
        else
            console.log('Error in retrieving users: ' + JSON.stringify(err, undefined, 2));
    })
});

router.get('/:id', (req,res)=>{
    if(!isValidObjectId(req.params.id)){
        console.log('No record with given id');
    }
    else{
        User.findById(req.params.id, (err,docs)=>{
            if(!err)
                res.send(docs);
            else
                console.log('Error in retrieving user with the given id: ' + req.params.id);
        })
    }
});

router.post('/', (req,res)=>{
    bcrypt.genSalt(10).then( salt => {
        bcrypt.hash(req.body.password, salt).then(hash => {
            var user = new User({
                username: req.body.username,
                name : req.body.name,
                surname : req.body.surname,
                address : req.body.address,
                phone : req.body.phone,
                email : req.body.email,
                password : hash,
                role : 'USER',
                birthday: new Date(req.body.birthday),
                xChangedItems: 0,
                state: req.body.state,
                bio: req.body.bio,
                profilePicUrl: req.body.profilePicUrl
            });
            user.save((err,doc)=>{
                if(!err)
                    res.send(doc);
                else
                    console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
            });
        });
    });
});

router.put('/:id', verifyToken, (req,res)=>{
    if(!isValidObjectId(req.params.id))
        console.log('No record with given id');
    else{
        isUserOrAdmin(req.headers.userid, req.params.id).then( (value, err) => {
            console.log(value);
            if(!err){
                bcrypt.genSalt(10).then( salt => {
                    bcrypt.hash(req.body.password, salt).then(hash => {
                        var user = {
                            username: req.body.username,
                            name: req.body.name,
                            surname: req.body.surname,
                            address: req.body.address,
                            phone: req.body.phone,
                            email: req.body.email,
                            password: hash,
                            bio: req.body.bio,
                            state: req.body.state,
                            profilePicUrl: req.body.profilePicUrl
                        };
                        User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true}, (err,docs)=>{
                            if(!err)
                                res.send(docs);
                            else
                                console.log('Error in updating record with id: ' + req.params.id);
                        });
                });
            });
            }
        });
    }
});

router.delete('/:id', verifyToken, (req,res)=>{
    if(!isValidObjectId(req.params.id))
        console.log('No record with given id');
    else{        
        isUserOrAdmin(req.headers.userid, req.params.id).then( (value, err) => {
            console.log(value);
            if(!err){
                Product.find((err,docs)=>{
                    if(!err){
                        console.log(docs);
                        if(docs.length != 0){
                            for(const product of docs){
                                if(product.sellerId == req.params.id){
                                    Product.findByIdAndRemove(product.id, (err,productToRemove)=>{
                                        if(!err){
                                            console.log("removed item");
                                        }
                                        else
                                          console.log('Error in deleting product with given id: ' + product.id);
                                    });
                                }
                            }

                            User.findByIdAndRemove(req.params.id, (err,userToRemove)=>{
                                if(!err){
                                    console.log("dropped");
                                    res.send(userToRemove);
                                }
                                else
                                    console.log('Error in deleting user with given id: ' + req.params.id);
                            }); 
                        }
                        else{
                            User.findByIdAndRemove(req.params.id, (err,docs)=>{
                                if(!err)
                                    res.send(docs);
                                else
                                    console.log('Error in deleting user with given id: ' + req.params.id);
                            }); 
                        }
                    }
                    else
                        console.log('Error in retrieving products: ' + JSON.stringify(err, undefined, 2));
                });   
            }
            else{
                console.log(err);
            }
        }); 
    }
});


function isUserOrAdmin(userCalling, userToAffect){
    return new Promise(function(resolve,reject){
        if(userCalling == userToAffect){
            console.log("User calling is user to affect");
            resolve(true);
        }
        else{
            User.findById(userCalling, (err, docs) => {
                if(!err){
                    if(docs.role == "ADMIN"){
                        resolve(true);
                    }
                }
                else{
                    console.log("User to affect doesn't exists");
                    reject(false);
                }
            });
        }
    });
}

module.exports = router;