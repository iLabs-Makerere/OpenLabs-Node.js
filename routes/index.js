var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, user) {
    if (user.role === "student"){
        res.render('index1');
    }
    else {
        res.render('index');
        console.log(user.role);
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