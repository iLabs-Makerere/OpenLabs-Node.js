var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');

router.get('/title/:title', function(req, res){
    res.render('labs', {output: req.params.title});
});

module.exports = router;