'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
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
    minlength: 1,
    validate: {validator: validator.isEmail, msg: 'Email must be valid.'}
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

UserSchema.pre('save', async function(next){
  const user = this

  if(!user.isModified('password')) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return next()
  } catch(err) {
    return  next(err)
  }
})

UserSchema.statics.authenticate = async function(email, password) {
  //console.log(email, password)

  try {
    const user = await this.findOne({email: email })
    //console.log(user)
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Invalid credentials, please try again.')
    }
    return user
  } catch (err) {
    throw err
  }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
