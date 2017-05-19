var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');
var Objective = require('../models/objectives');
var Sched = require('../models/schedules');
//var auth = require('./index.js').isAuth;

router.get('/title/:title', ensureAuthenticated, function(req, res){
    if (req.user){
        console.log(req.user);
        Objective.find().sort('-_id')
            .then(function (doc) {
                res.render('labsAdmin', { output: req.params.title, items: doc, user: req.user});
            });
        //res.render('labs1', {output: req.params.title}); //get the title passed in the parameter(:title)
        // to use it in the labs1.handlebars
    }

});

router.get('/stuff', function(req, res){
    console.log(req.query);
    //http://localhost:3000/lab/stuff?title=LOrna&name=lynn
    //{ title: 'LOrna', name: 'lynn' }
});

router.post('/addExperiment', ensureAuthenticated, function(req, res, next){
    if (req.user) {
        var item = {
            title: req.body.title,
            category: req.body.category,
            url: req.body.url
        };

        var lab = new Lab(item); //instance of the model
        lab.save();

        res.redirect('/');
    }
});

router.post('/delete', ensureAuthenticated, function(req, res, next){
    if (req.user) {
        var id = req.body.lab;
        Lab.findByIdAndRemove(id).exec();

        res.redirect('/');
    }
});

router.post('/details', function(req, res, next) {
    if (req.user) {

        var id = req.body.lab;
        //console.log(id);

        Lab.findById(id, function (err, doc) {
            if (err) {
                console.log('No entry found');
            } else {
                res.render('editExperiment', {doc: doc});
            }
        });
    }
});

router.post('/update', ensureAuthenticated, function(req, res, next) {
    if (req.user) {

        var id = req.body.lab;

        Lab.findById(id, function (err, doc) {
            if (err) {
                console.log('No entry found');
            }
            doc.title = req.body.title;
            doc.category = req.body.category;
            doc.url = req.body.url;
            doc.save();
        });
        res.redirect('/');
    }
});

router.post('/addSchedule', ensureAuthenticated, function(req, res, next){
    if (req.user) {
        var sched = {
            title: req.body.title,
            user: req.user.name,
            date: req.body.labdate,
            time: req.body.labtime
        };

        var schedule = new Sched(sched); //instance of the model
        schedule.save();

        res.redirect('/');
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