'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/tagController')

router.get('/', controller.index)

router.get('/:tag', controller.showTag)

module.exports = router
