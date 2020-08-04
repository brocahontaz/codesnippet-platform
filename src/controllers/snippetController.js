'use strict'

const Snippet = require('../models/snippet')

const snippetController = {}

snippetController.index = (req, res) => {
  res.redirect('..')
}

snippetController.new = (req, res) => {
  if (req.session.user) {
    res.render('snippet/new')
  } else {
    res.redirect('..')
  }
}

snippetController.createNew = async (req, res) => {
  try {
    const snippet = new Snippet({
      username: req.session.user,
      name: req.body.name.trim(),
      snippet: req.body.snippet,
      tags: req.body.tags.split(',').map((tag) => { return tag.toLowerCase().trim() }).filter((tag) => { return tag.length > 0 && tag !== '' })
    })

    const snip = await snippet.save()
    console.log(snip.id)
    req.session.flash = { type: 'success', text: 'New snippet created! :D' }
    res.redirect('/snippet/' + snip.id)
  } catch (err) {
    req.session.flash = { type: 'danger', text: err.message }
    req.session.data = { form: { snippet: req.body.snippet } }
    res.redirect('./new')
  }
}

snippetController.showSnippet = async (req, res, next) => {
  try {
    console.log(req.params.snippet)
    const snippet = await Snippet.getSnippet(req.params.snippet)
    if (!snippet) {
      const err = new Error('Not found :(')
      err.statusCode = 404
      next(err)
    } else {
      console.log('SNIP', snippet)
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

snippetController.editSnippetPost = async (req, res) => {
  if (req.body.name && req.body.snippet && req.body.name !== '' && req.body.snippet !== '') {
    try {
      const update = {
        name: req.body.name.trim(),
        snippet: req.body.snippet,
        tags: req.body.tags.split(',').map((tag) => { return tag.toLowerCase().trim() }).filter((tag) => { return tag.length > 0 && tag !== '' })
      }
      const snippet = await Snippet.updateSnippet(req.params.snippet, update)
      /* const viewData = {
      snippet: snippet
    } */
      req.session.flash = { type: 'success', text: 'Snippet edited!' }
      res.redirect('/snippet/' + snippet.id)
    // res.render('snippet/index', viewData)
    } catch (err) {
      req.session.flash = { type: 'danger', text: err.message }
      // req.session.data = { snippet: req.body.snippet }
      res.redirect('/snippet/' + req.params.snippet + '/edit')
    }
  } else {
    req.session.flash = { type: 'danger', text: 'Name or snippet cannot be empty!' }
    // req.session.data = { snippet: req.body.snippet }
    res.redirect('/snippet/' + req.params.snippet + '/edit')
  }
}

snippetController.deleteSnippet = async (req, res) => {
  req.session.confirm = { type: 'delete', text: 'Do you wanna delete snippet?!' }
  res.redirect('/snippet/' + req.params.snippet)
  /*
  try {
    const snippet = await Snippet.getSnippet(req.params.snippet)
    const viewData = {
      snippet: snippet
    }
    res.render('snippet/delete', viewData)
  } catch (err) {

  } */
}

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
