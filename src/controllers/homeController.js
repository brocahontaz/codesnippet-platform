/**
 * Home controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const Snippet = require('../models/snippet')

const homeController = {}

/**
 * Render the home page.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
homeController.index = async (req, res) => {
  const snippets = await Snippet.getAll()

  //console.log(snippets)
  const viewData = {
    snippets: snippets
  }

  res.render('home/index', viewData)
}

module.exports = homeController
