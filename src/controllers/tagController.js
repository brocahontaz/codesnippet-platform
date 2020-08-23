/**
 * Tag controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const Snippet = require('../models/snippet')

const tagController = {}

/**
 * Tag index, redirect back.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
tagController.index = (req, res) => {
  res.redirect('..')
}

/**
 * Show all snippets under a tag.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 * @returns {object} forward error
 */
tagController.showTag = async (req, res, next) => {
  try {
    const snippets = await Snippet.getAllByTag(req.params.tag)
    if (!snippets) {
      const err = new Error('Not found :(')
      err.statusCode = 404
      next(err)
    } else {
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
