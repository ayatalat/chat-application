var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, index: true, unique: true, required: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)