const express = require('express');
const bodyParser = require('body-parser');
const res = require('express/lib/response');
var router = express.Router();
var {Category,Category} = require('../Models/category');
const { isValidObjectId } = require('mongoose');
const verifyToken = require('../Middleware/verifyToken');
const verifyAdmin = require('../Middleware/verifyAdmin');

router.get('/', (req,res) =>{
    Category.find((err,docs)=>{
        if(!err)
            res.send(docs);
        else
            console.log('Error in retrieving products: ' + JSON.stringify(err, undefined, 2));
    });
});

router.get('/:id', (req,res)=>{
    if(!isValidObjectId)
        console.log('No record with given id');
    else
        Category.findById(req.params.id, (err,docs)=>{
            if(!err)
                res.send(docs);
            else
                console.log('Error in retrieving category with the given id: ' + req.params.id);
        })
});

router.post('/', verifyToken, verifyAdmin, (req,res)=>{
    var category = new Category({
        name: req.body.name,
        imageUrl: req.body.imageUrl
    });
    category.save((err,doc)=>{
        if(!err)
            res.send(doc);
        else
            console.log('Error in category save: ' + JSON.stringify(err, undefined, 2));
    });
});

router.put('/:id', verifyToken, verifyAdmin, (req,res)=>{
    if(!isValidObjectId(req.params.id))
        console.log('No record with given id');
    else{
    var category = {
        name: req.body.name,
        imageUrl: req.body.imageUrl
    };
    Category.findByIdAndUpdate(req.params.id, {$set: category}, {new: true}, (err,docs)=>{
        if(!err)
            res.send(docs);
        else
            console.log('Error in updating record with id: ' + req.params.id);
    });
}
});

router.delete('/:id', verifyToken, verifyAdmin, (req,res)=>{
    if(!isValidObjectId(req.params.id))
        console.log('No record with given id');
    else{
        Category.findByIdAndRemove(req.params.id, (err,docs)=>{
            if(!err)
              res.send(docs);
            else
              console.log('Error in deleting category with given id: ' + req.params.id);
        });
    }
});

module.exports = router;