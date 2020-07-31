'use strict'

const Snippet = require('../models/snippet')

const tagController = {}

tagController.index = (req, res) => {
  res.render('..')
}

tagController.showTag = async (req, res) => {
  const snippets = await Snippet.getAllByTag(req.params.tag)

  console.log(snippets)
  const viewData = {
    snippets: snippets
  }

  res.render('tag/index', viewData)
}

module.exports = tagController
