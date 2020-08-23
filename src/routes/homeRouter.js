/**
 * Home router.
 *
 * @author Johan Andersson
 * @version 1.0
 */

'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/homeController')

// Route index to controller
router.get('/', controller.index)

module.exports = router
