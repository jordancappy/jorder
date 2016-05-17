var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var pageSchema = new Schema({
	name: String,
	questions: [{
		name: String,
		type: String,
		order: Number,
		answers: [{name:String, value: String}]
	}],
	created_at: Date,
	lastUpdated_at: Date
});

pageSchema.pre('save', function(next){
	var currentDate = new Date();

	this.lastUpdated_at = currentDate;

	if(!this.created_at)
		this.created_at = currentDate;

	next();
});

module.exports = mongoose.model('Page', pageSchema, 'Page');