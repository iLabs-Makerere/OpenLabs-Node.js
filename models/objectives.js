/**
 * Created by ltumuhairwe on 3/25/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var objectiveSchema = new Schema({
    question_ref: String,
    solutions: Array,
    answer: String
}, {collection: 'solutions'});

var Objective = module.exports = mongoose.model('Objective', objectiveSchema);