'use strict'

const Snippet = require('../models/snippet')

const homeController = {}

homeController.index = async (req, res) => {
  const snippets = await Snippet.getAll()

  console.log(snippets)
  const viewData = {
    snippets: snippets
  }

  res.render('home/index', viewData)
}

module.exports = homeController
