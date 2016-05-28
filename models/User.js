var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
	google: {
		id: String,
		token: String,
		name: String
	},
	username: {
		type: String,
		trim: true,
		unique: true
	},
	password: String
});

module.exports = mongoose.model('User', userSchema);