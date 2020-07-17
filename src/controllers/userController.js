'use strict'

const User = require('../models/user')

const userController = {}

userController.index = (req, res) => {
  res.render('user/index')
}

userController.signin = (req, res) => {
  console.log('test')
  res.render('user/signin')
}

userController.signinPost = async (req, res) => {
  console.log('test2')
  console.log(req.body.email)
  console.log(req.body.password)
  res.redirect('/')
}

userController.register = (req, res) => {
  res.render('user/register')
}

userController.registerPost = async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.email)
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    await user.save()

    req.session.flash = { type: 'success', text: 'New account successfully created! Please sign in to start using the platform! :)' }
    res.redirect('./signin')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.render('user/register')
  }
}

module.exports = userController
