'use strict'

const User = require('../models/User')

const userController = {}

userController.index = (req, res) => {
  res.render('user/index')
}

userController.signin = (req, res) => {
  res.render('user/signin')
}

userController.register = (req, res) => {
  res.render('user/register')
}

userController.registerPost = async (req, res) => {
  console.log(req.body.username)
  console.log(req.body.email)
  /* try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    await user.save()

    req.session.flash = { type: 'success', text: 'New account successfully created!' }
    req.redirect('.')
  } catch (error) {
    req.session.flash = { type: 'danger', text: error.message }
    res.redirect('.')
  } */
}

module.exports = userController
