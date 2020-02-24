'use strict'

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

module.exports = userController
