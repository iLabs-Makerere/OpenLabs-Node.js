var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res) {
    if (req.user && req.user.role==='student'){
            console.log(req.user.role);
            res.render('indexStudent');

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