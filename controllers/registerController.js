'use strict'

const registerController = {}

registerController.index = (req, res) => {
  res.render('register/index')
}

registerController.indexPost = (req, res) => {

}

module.exports = registerController
