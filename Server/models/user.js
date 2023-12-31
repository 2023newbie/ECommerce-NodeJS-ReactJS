const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  role: String
})

module.exports = mongoose.model('User', userSchema)