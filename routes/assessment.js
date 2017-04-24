/**
 * Created by ltumuhairwe on 3/25/17.
 */
var express = require('express');
var router = express.Router();

var Lab = require('../models/labs');
var Objective = require('../models/objectives');

// router.get('/', function (req, res, next) {
//     next();
// });

router.post('/addObjective', function(req, res, next){
    var solutions = [];
    solutions[0] = req.body.solution1;
    solutions[1] = req.body.solution2;
    solutions[2] = req.body.solution3;
    solutions[3] = req.body.solution4;

    var item = {
        question_ref: req.body.question,
        solution: solutions,    //solution is an array, you need to find a work around!!
        answer: req.body.answer
    };

    var question = new Objective(item); //instance of the model
    question.save();

    res.redirect('/');
});