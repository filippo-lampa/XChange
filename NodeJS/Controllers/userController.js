const { json } = require('body-parser');
const bodyParser = require('body-parser');
const express = require('express');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const { isValidObjectId } = require('mongoose');
const bcrypt = require('bcrypt');

var router = express.Router();

var {User,User} = require('../Models/user');

//think it needs a token
router.get('/', (req,res) =>{
    User.find((err,docs)=>{
        if(!err)
            res.send(docs);
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
    bcrypt.hash(req.body.password, 10).then(hash => {
        var user = new User({
            username: req.body.username,
            name : req.body.name,
            surname : req.body.surname,
            address : req.body.address,
            phone : req.body.phone,
            email : req.body.email,
            password : hash
        });
        user.save((err,doc)=>{
            if(!err)
                res.send(doc);
            else
                console.log('Error in user save: ' + JSON.stringify(err, undefined, 2));
        });
    })
});


// Think it needs a token
router.put('/:id', (req,res)=>{
    if(!isValidObjectId(req.params.id))
        console.log('No record with given id');
    else{
        var user = {
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            phone: req.body.phone,
            email: req.body.email,
            password: req.body.password
        };
        User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true}, (err,docs)=>{
            if(!err)
                res.send(docs);
            else
                console.log('Error in updating record with id: ' + req.params.id);
        });
    }
});

// Think it needs a token
router.delete('/:id', (req,res)=>{
    if(!isValidObjectId(req.params.id))
        console.log('No record with given id');
    else{
        User.findByIdAndRemove(req.params.id, (err,docs)=>{
            if(!err)
                res.send(docs);
            else
                console.log('Error in deleting user with given id: ' + req.params.id);
        });
    }
});


module.exports = router;