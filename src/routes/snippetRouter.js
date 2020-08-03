'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetController')

router.get('/', controller.index)

router.get('/new', controller.new)
router.post('/new', controller.createNew)

router.get('/:snippet', controller.showSnippet)

router.get('/:snippet/edit', controller.authorizeUser, controller.editSnippet)
router.post('/:snippet/edit', controller.authorizeUser, controller.editSnippetPost)

router.get('/:snippet/delete', controller.authorizeUser, controller.deleteSnippet)
router.post('/:snippet/delete', controller.authorizeUser, controller.deleteSnippetConfirm)

module.exports = router
