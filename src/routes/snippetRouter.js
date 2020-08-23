/**
 * Snippet router
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetController')

// Route index
router.get('/', controller.index)

// Route new snippet
router.get('/new', controller.new)
router.post('/new', controller.createNew)

// Route show snippet
router.get('/:snippet', controller.showSnippet)

// Route snippet edit
router.get('/:snippet/edit', controller.authorizeUser, controller.editSnippet)
router.post('/:snippet/edit', controller.authorizeUser, controller.editSnippetPost)

// Route snippet delete
router.get('/:snippet/delete', controller.authorizeUser, controller.deleteSnippet)
router.post('/:snippet/delete', controller.authorizeUser, controller.deleteSnippetConfirm)

module.exports = router
