'use strict'

const mongoose = require('mongoose')

// Create the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: [10, 'The password must consist of a minimum of 10 characters.']
  }
}, {
  timestamps: true,
  versionKey: false
})

const user = mongoose.model('user', userSchema)

module.exports = user
