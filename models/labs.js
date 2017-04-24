var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var labSchema = new Schema({
	title: String,
	category: String,
	url: String
}, {collection: 'labs_available'});

var Lab = module.exports = mongoose.model('Lab', labSchema);

/*module.exports.getAllLabs = function ({}, callback) {
    User.find({}, callback);
}*/