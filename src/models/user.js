'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRounds = 10

// Create the schema
const UserSchema = new mongoose.Schema({
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

UserSchema.pre('save', function(next){
  const user = this

  if(!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) {
      return next()
    }

    bcrypt.hash(user.password, salt, function(err, hash) {

      if (err) {
        return next()
      }

      user.password = hash
      next()
    })
  })
})

const User = mongoose.model('User', UserSchema)

module.exports = User
