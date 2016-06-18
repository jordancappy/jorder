var mongoose = require('mongoose');
import Question from './Question'
var Schema = mongoose.Schema;


var pageSchema = new Schema({
	name: String,
	questions: [{type: Schema.Types.ObjectId, ref: 'Question'}],
	created_at: Date,
	lastUpdated_at: Date
});

pageSchema.pre('save', function(next){
	var currentDate = new Date();

	this.lastUpdated_at = currentDate;

	if(!this.created_at)
		this.created_at = currentDate;

	console.log('pre saving')
	if(!this.questions || this.questions.length < 1){
		console.log('adding question')
		questions.push(new Question())
	}

	next();
});

module.exports = mongoose.model('Page', pageSchema, 'Page');