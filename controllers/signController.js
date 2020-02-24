'use strict'

const signController = {}

signController.index = (req, res) => {
  console.log('test')
  res.render('signin/index')
}

module.exports = signController
