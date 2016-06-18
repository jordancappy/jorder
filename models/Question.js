import mongoose from 'mongoose'
var Schema = mongoose.Schema

var questionSchema = new Schema({
    name: String,
    type: String,
    order: Number,
    options: {
      required: Boolean, 
      conditional: Boolean
    },
    answers: [{name:String, value: String}]
})


module.exports = mongoose.model('Question', questionSchema, 'Question')