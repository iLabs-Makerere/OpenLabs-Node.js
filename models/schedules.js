/**
 * Created by tumuhairwe on 19/05/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var scheduleSchema = new Schema({
    title: String,
    user: String,
    date: String,
    time: String
}, {
    collection: 'schedules'});

var Schedule = module.exports = mongoose.model('Schedule', scheduleSchema);

/*module.exports.getAllLabs = function ({}, callback) {
 User.find({}, callback);
 }*/