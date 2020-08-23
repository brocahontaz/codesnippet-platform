/**
 * Tag router.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/tagController')

// Route tag index
router.get('/', controller.index)

// Route show tag
router.get('/:tag', controller.showTag)

module.exports = router
