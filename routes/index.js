var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
    if (req.user && req.user.role==='student'){
            Lab.find().sort('-_id')
                .then(function (doc) {
                res.render('indexStudent', { name: req.user.name, items: doc});
            //res.send(JSON.stringify(doc));
        });

} else if (req.user && req.user.role==='teacher'){
        res.render('indexTeacher');
        console.log(req.user.role);
    }

else if (req.user && req.user.role==='admin'){
    res.render('indexAdmin');
    console.log(req.user.role);
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