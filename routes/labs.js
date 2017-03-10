var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');

router.get('/labs/:title', function(req, res, next){
	res.render('labs', {output: req.params.title});
	//console.log(req.query);
});

module.exports = router;