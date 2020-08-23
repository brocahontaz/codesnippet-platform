/**
 * Mongoose schema/model for the users.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const saltRounds = 10

// User Mongoose schema
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
    minlength: 1,
    validate: { validator: validator.isEmail, msg: 'Email must be valid.' }
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

// Salt and hash password before saving in db, when creating new user
// Using bcrypt
UserSchema.pre('save', async function (next) {
  const user = this

  if (!user.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return next()
  } catch (err) {
    return next(err)
  }
})

/**
 * Authenticate user when logging in.
 *
 * @param {string} email the user email
 * @param {string} password the password
 * @returns {object} the user object
 */
UserSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email: email })
  if (!user || !await bcrypt.compare(password, user.password)) {
    throw new Error('Invalid credentials, please try again.')
  }
  return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User
