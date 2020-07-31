'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/snippetController')

router.get('/', controller.index)

router.get('/new', controller.new)
router.post('/new', controller.createNew)

router.get('/:snippet', controller.showSnippet)

module.exports = router
