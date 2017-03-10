var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
    if (req.user && req.user.role==='student'){
            Lab.find().sort('-_id')
                .then(function (doc) {
                res.render('indexStudent', { name: req.user.name, items: doc});
        });

} else if (req.user && req.user.role==='teacher'){
            Lab.find().sort('-_id')
                    .then(function (doc) {
                    res.render('indexTeacher', { name: req.user.name, items: doc});
    }); 
}

else if (req.user && req.user.role==='admin'){
            Lab.find().sort('-_id')
                .then(function (doc) {
                res.render('indexAdmin', { name: req.user.name, items: doc, n: 0});
            });
    }
});

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated())
        return next();
    else{
        res.redirect('/users/login')
    }
}

module.exports = router;