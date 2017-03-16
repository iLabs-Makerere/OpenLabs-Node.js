var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');

router.get('/title/:title', function(req, res){
    console.log(req.query);
    res.render('labs1', {output: req.params.title});
});

router.get('/stuff', function(req, res){
    console.log(req.query);
    //http://localhost:3000/lab/stuff?title=LOrna&name=lynn
    //{ title: 'LOrna', name: 'lynn' }
});

module.exports = router;