var mongoose = require('mongoose')
var Schema = mongoose.Schema

var messageSchema = new Schema({
  message: { type: String},
  from: { type: String, required: true},
  to: { type: String, required: true},
  created_at: { type: Date, default: Date.now }
})


module.exports = mongoose.model('Message', messageSchema)
