var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var formSchema = new Schema({
    name: String,
    created_at: Date,
    lastUpdated_at: Date
});

formSchema.pre('save', function(next){
    var currentDate = new Date();
    
    this.lastUpdated_at = currentDate;
    
    if(!this.created_at)
        this.created_at = currentDate;
    
    next();
});

module.exports = mongoose.model('Form', formSchema);