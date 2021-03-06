/**
 * Snippet controller
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const Snippet = require('../models/snippet')

const snippetController = {}

/**
 * Snippet index, redirect back.
 *
 * @param {object} req the Express request object
 * @param {object} res the express response object
 */
snippetController.index = (req, res) => {
  res.redirect('..')
}

/**
 * Render the form for creating new snippet, if session has user.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
snippetController.new = (req, res) => {
  if (req.session.user) {
    res.render('snippet/new')
  } else {
    res.redirect('..')
  }
}

/**
 * Create new code snippet.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
snippetController.createNew = async (req, res) => {
  try {
    const snippet = new Snippet({
      username: req.session.user,
      name: req.body.name.trim(),
      snippet: req.body.snippet,
      tags: req.body.tags.split(',').map((tag) => { return tag.toLowerCase().trim() }).filter((tag) => { return tag.length > 0 && tag !== '' })
    })

    const snip = await snippet.save()

    req.session.flash = { type: 'success', text: 'New snippet created! :D' }
    res.redirect('/snippet/' + snip.id)
  } catch (err) {
    req.session.flash = { type: 'danger', text: err.message }
    req.session.data = { form: { snippet: req.body.snippet } }
    res.redirect('./new')
  }
}

/**
 * Show a code snippet.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 * @returns {object} forward error
 */
snippetController.showSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.getSnippet(req.params.snippet)
    if (!snippet) {
      const err = new Error('Not found :(')
      err.statusCode = 404
      next(err)
    } else {
      const viewData = {
        snippet: snippet
      }
      res.render('snippet/index', viewData)
    }
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

/**
 * Show form for editing a snippet.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 */
snippetController.editSnippet = async (req, res, next) => {
  try {
    const snippet = await Snippet.getSnippet(req.params.snippet)
    const viewData = {
      snippet: snippet
    }
    res.render('snippet/edit', viewData)
  } catch (err) {
    err.statusCode = 500
    next(err)
  }
}

/**
 * Update a snippet.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
snippetController.editSnippetPost = async (req, res) => {
  // check if name or snippet is empty
  if (req.body.name && req.body.snippet && req.body.name !== '' && req.body.snippet !== '') {
    try {
      const update = {
        name: req.body.name.trim(),
        snippet: req.body.snippet,
        tags: req.body.tags.split(',').map((tag) => { return tag.toLowerCase().trim() }).filter((tag) => { return tag.length > 0 && tag !== '' })
      }
      const snippet = await Snippet.updateSnippet(req.params.snippet, update)

      req.session.flash = { type: 'success', text: 'Snippet edited!' }
      res.redirect('/snippet/' + snippet.id)
    } catch (err) {
      req.session.flash = { type: 'danger', text: err.message }
      res.redirect('/snippet/' + req.params.snippet + '/edit')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'Name or snippet cannot be empty!' }
    res.redirect('/snippet/' + req.params.snippet + '/edit')
  }
}

/**
 * Delete a snippet.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 */
snippetController.deleteSnippet = async (req, res) => {
  req.session.confirm = { type: 'delete', text: 'Do you wanna delete snippet?!' }
  res.redirect('/snippet/' + req.params.snippet)
}

/**
 * Confirm deleting snippet.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 * @returns {object} forward error
 */
snippetController.deleteSnippetConfirm = async (req, res, next) => {
  try {
    const snippet = await Snippet.deleteSnippet(req.params.snippet)
    req.session.flash = { type: 'success', text: 'Snippet ' + snippet.name + ' deleted successfully!' }
    res.redirect('..')
  } catch (err) {
    err.statusCode = 500
    return next(err)
  }
}

/**
 * Authorization of users for resources.
 *
 * @param {object} req the Express request object
 * @param {object} res the Express response object
 * @param {object} next the Express forward object
 * @returns {object} forward error
 */
snippetController.authorizeUser = async (req, res, next) => {
  const snippet = await Snippet.getSnippet(req.params.snippet)
  if (!req.session.user || req.session.user !== snippet.username) {
    const err = new Error('Status code 403: Forbidden!')
    err.statusCode = 403
    return next(err)
  }
  next()
}

module.exports = snippetController
