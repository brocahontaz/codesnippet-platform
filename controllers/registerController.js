'use strict'

const registerController = {}

registerController.index = (req, res) => {
  res.render('register/index')
}

module.exports = registerController
