'use strict'

const Snippet = require('../models/snippet')

const snippetController = {}

snippetController.index = (req, res) => {
  res.render('snippet/index')
}

snippetController.new = (req, res) => {
  if (req.session.user) {
    res.render('snippet/new')
  } else {
    res.redirect('/')
  }
}

snippetController.createNew = async (req, res) => {
  try {
    const snippet = new Snippet({
      username: req.body.username,
      name: req.body.name,
      snippet: req.body.snippet,
      tags: req.body.tags.split(',')
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

snippetController.showSnippet = async (req, res) => {
  console.log(req.params.snippet)
  const snippet = await Snippet.getSnippet(req.params.snippet)
  console.log('SNIP', snippet)
  const viewData = {
    snippet: snippet
  }
  res.render('snippet/index', viewData)
}

module.exports = snippetController
