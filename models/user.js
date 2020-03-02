'use strict'

const mongoose = require('mongoose')

// Create the schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: [3, 'Username must be at least 3 characters long.']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 1
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

const User = mongoose.model('User', userSchema)

module.exports = User
