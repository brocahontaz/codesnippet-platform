'use strict'

const Snippet = require('../models/snippet')

const tagController = {}

tagController.index = (req, res) => {
  res.redirect('..')
}

tagController.showTag = async (req, res, next) => {
  try {
    const snippets = await Snippet.getAllByTag(req.params.tag)
    if (!snippets) {
      const err = new Error('Not found :(')
      err.statusCode = 404
      next(err)
    } else {
      console.log(snippets)
      const viewData = {
        snippets: snippets
      }

      res.render('tag/index', viewData)
    }
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

module.exports = tagController
