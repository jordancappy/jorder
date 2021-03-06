var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var formSchema = new Schema({
	name: String,
	meta: {color: String},
	pages:[{type: Schema.Types.ObjectId, ref: 'Page'}],
	created_at: Date,
	lastUpdated_at: Date
});

formSchema.pre('save', function(next){
	var currentDate = new Date();

	if (!meta.color) this.meta.color = "blue";
	
	this.lastUpdated_at = currentDate;
	
	if(!this.created_at)
		this.created_at = currentDate;
	
	next();
});

module.exports = mongoose.model('Form', formSchema);